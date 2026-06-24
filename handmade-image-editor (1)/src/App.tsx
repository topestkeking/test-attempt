import React, { useState, useRef, useEffect } from "react";
import Sketchpad from "./components/Sketchpad";
import CompareSlider from "./components/CompareSlider";
import { ART_PRESETS } from "./data/presets";
import { synthesizeLocalImage } from "./utils/synthesizers";
import { EditSession } from "./types";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Upload,
  Download,
  Eye,
  Sliders,
  History,
  AlertCircle,
  ArrowRight,
  RefreshCw,
  Palette,
  Undo,
  CheckCircle2,
  Trash2,
  Brush,
  FileImage,
  Layers,
  HelpCircle
} from "lucide-react";

export default function App() {
  // Input Source State
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [currentPrompt, setCurrentPrompt] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"draw" | "upload">("draw");

  // Synthesizer Engine Mode
  const [engineMode, setEngineMode] = useState<"instant" | "gemini">("instant");

  // Configuration Settings
  const [selectedModel, setSelectedModel] = useState<string>("gemini-3.1-flash-image");
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<string>("1:1");
  const [selectedImageSize, setSelectedImageSize] = useState<string>("1K");

  // Editing Generation States
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationStep, setGenerationStep] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<{ message: string; details?: string } | null>(null);

  // Response Results & History Session
  const [currentResultImage, setCurrentResultImage] = useState<string | null>(null);
  const [currentResultExplanation, setCurrentResultExplanation] = useState<string | null>(null);
  const [historySessions, setHistorySessions] = useState<EditSession[]>([]);

  // State to pass uploaded image into Sketchpad as background/stencil layer
  const [uploadedImageForSketch, setUploadedImageForSketch] = useState<string | null>(null);

  // File Reference
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  // Load sample on mount if desired (we'll start with drawing from scratch)
  useEffect(() => {
    // Empty initial load is clean and focused
  }, []);

  // Update generation loading steps sequentially
  useEffect(() => {
    if (!isGenerating) return;
    const steps = [
      "Securing connection with server...",
      "Analyzing handmade stencil structure...",
      "Matching outline geometry with instruction...",
      "Synthesizing visual styles with Gemini...",
      "Refining output pixels...",
    ];
    let i = 0;
    setGenerationStep(steps[0]);
    const interval = setInterval(() => {
      i = (i + 1) % steps.length;
      setGenerationStep(steps[i]);
    }, 2800);
    return () => clearInterval(interval);
  }, [isGenerating]);

  // Handle setting active drawing stencil source
  const handleSetSourceImage = (base64Data: string) => {
    setSourceImage(base64Data);
    // Auto scroll or provide responsive visual hint
  };

  // Handle uploading and reading files
  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setErrorMsg({ message: "Invalid file type. Please select or drop an image file (PNG/JPEG)." });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      setSourceImage(base64);
      setUploadedImageForSketch(base64); // Let them draw on it if they switch tabs
      setErrorMsg(null);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  // Drag and Drop Handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  // Pick Preset Prompt
  const handleApplyPreset = (preset: typeof ART_PRESETS[0]) => {
    setCurrentPrompt(preset.prompt);
    setErrorMsg(null);
  };

  // Submit Edit Request to Fullstack Server Route
  const handleGenerateEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sourceImage) {
      setErrorMsg({ message: "Please set a source image first. Draw something on the Sketchpad and click 'Set as Source' or upload your drawing file." });
      return;
    }
    if (!currentPrompt.trim()) {
      setErrorMsg({ message: "Please specify what visual edits or artistic styles you want to apply." });
      return;
    }

    setIsGenerating(true);
    setErrorMsg(null);

    try {
      const response = await fetch("/api/edit-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: sourceImage,
          prompt: currentPrompt,
          model: selectedModel,
          aspectRatio: selectedAspectRatio,
          imageSize: selectedImageSize,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "The server failed to process the image editing action.");
      }

      if (data.success) {
        const newSession: EditSession = {
          id: Math.random().toString(36).substr(2, 9),
          timestamp: new Date(),
          prompt: currentPrompt,
          model: selectedModel,
          originalImage: sourceImage,
          editedImage: data.editedImage,
          explanation: data.explanation,
          settings: {
            aspectRatio: selectedAspectRatio,
            imageSize: selectedModel === "gemini-3.1-flash-image" ? selectedImageSize : undefined,
          },
        };

        setCurrentResultImage(data.editedImage);
        setCurrentResultExplanation(data.explanation || null);
        setHistorySessions((prev) => [newSession, ...prev]);
        setErrorMsg(null);
      } else {
        throw new Error("Could not modify drawing output.");
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg({
        message: err.message || "Unable to process the image edit request.",
        details: err.details || "Make sure your GEMINI_API_KEY is configured in Settings > Secrets.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Use Completed Edited Visual as the next input source (feedback loop)
  const handleUseEditAsNewSource = () => {
    if (!currentResultImage) return;
    setSourceImage(currentResultImage);
    setUploadedImageForSketch(currentResultImage); // Seed sketchpad with output
    setCurrentResultImage(null);
    setCurrentResultExplanation(null);
  };

  // Load a historical session
  const handleLoadSession = (session: EditSession) => {
    setSourceImage(session.originalImage);
    setCurrentResultImage(session.editedImage);
    setCurrentResultExplanation(session.explanation || null);
    setCurrentPrompt(session.prompt);
    setSelectedModel(session.model);
    setSelectedAspectRatio(session.settings.aspectRatio);
    if (session.settings.imageSize) {
      setSelectedImageSize(session.settings.imageSize);
    }
  };

  // Download Output Image helper
  const downloadImageHelper = (dataUrl: string, filename: string) => {
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#0f1115] text-slate-200 flex flex-col font-sans" id="handmade-editor-app">
      {/* Header Bar */}
      <header className="bg-[#16191f] border-b border-slate-800 sticky top-0 z-40 py-4 px-6 shadow-md shadow-black/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-indigo-600 rounded-lg text-white font-bold italic w-9 h-9 flex items-center justify-center shadow-md shadow-indigo-900/30">
              AV
            </span>
            <div>
              <h1 className="text-lg font-semibold tracking-tight text-white">
                Studio<span className="text-indigo-400">Vision</span> Editor
              </h1>
              <p className="text-xs text-slate-400 font-medium">Rebound hand-made drawings & sketches into high-fidelity digital art</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-1.5 text-xs bg-slate-900/80 rounded-full py-1 px-3 border border-slate-800 text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-mono font-semibold text-[10px] uppercase tracking-wider text-slate-400">Gemini Neural Engine</span>
            </div>
            {/* Friendly Secrets instructions link to help developer configuring backend API keys */}
            <div className="bg-amber-950/60 text-amber-300 text-[11px] border border-amber-800/40 rounded-full px-3 py-1 font-medium flex items-center gap-1.5 shadow-2xs">
              <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
              <span>Key required in <strong>Secrets</strong></span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Interactive Stage */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-0">
        {/* Left Input Assembly Frame (Column span 7/12) */}
        <section className="lg:col-span-7 flex flex-col gap-6" id="input-assembly-section">
          <div className="bg-[#16191f] border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col gap-5">
            {/* Assembly Source Switch Panel */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
              <div>
                <h2 className="text-sm font-bold text-white tracking-wide">Assemble Your Stencil</h2>
                <p className="text-xs text-slate-400 mt-0.5">Define or draw the hand-made source material</p>
              </div>

              <div className="flex bg-[#0f1115] p-0.5 rounded-lg border border-slate-800">
                <button
                  id="tab-draw"
                  onClick={() => setActiveTab("draw")}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-md header-tab text-xs font-semibold cursor-pointer transition-all ${
                    activeTab === "draw"
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/30"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Brush className="w-3.5 h-3.5" />
                  Sketchpad
                </button>
                <button
                  id="tab-upload"
                  onClick={() => setActiveTab("upload")}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-md header-tab text-xs font-semibold cursor-pointer transition-all ${
                    activeTab === "upload"
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/30"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Upload className="w-3.5 h-3.5" />
                  Upload Sketch
                </button>
              </div>
            </div>

            {/* Source Display Switch */}
            <div className="flex-1 min-h-0">
              {activeTab === "draw" ? (
                <div className="flex flex-col gap-4">
                  <Sketchpad
                    onSave={handleSetSourceImage}
                    initialImage={uploadedImageForSketch || undefined}
                  />
                  {sourceImage && (
                    <div className="flex items-center justify-between bg-emerald-950/40 border border-emerald-800/40 p-3 rounded-xl text-emerald-300 text-xs font-medium">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span>Source Stencil loaded from active sketch canvas</span>
                      </div>
                      <button
                        onClick={() => downloadImageHelper(sourceImage, "handmade-stencil.png")}
                        className="text-indigo-400 hover:text-indigo-300 underline flex items-center gap-1 font-semibold cursor-pointer"
                        title="Download sketch file"
                      >
                        Download Sketch
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {/* Custom Drag Drop Area */}
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                      isDragOver
                        ? "border-indigo-500 bg-indigo-950/20"
                        : "border-slate-800 bg-[#0f1115] hover:bg-[#0f1115]/50"
                    }`}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />

                    {sourceImage && activeTab === "upload" ? (
                      <div className="flex flex-col items-center gap-3">
                        <img
                          src={sourceImage}
                          alt="Uploaded handmade diagram"
                          className="w-48 h-48 object-contain rounded-lg border border-slate-800 bg-white"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <p className="text-xs font-semibold text-white">Drawing Loaded!</p>
                          <p className="text-[10px] text-slate-500 mt-0.5">Click here or drop to upload another drawing file</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <FileImage className="w-10 h-10 text-slate-600 stroke-1 mb-3" />
                        <p className="text-sm font-semibold text-slate-300">Drag & drop your hand-drawn image here</p>
                        <p className="text-xs text-slate-500 mt-1">Supports PNG, JPG, or sketches up to 10MB</p>
                        <button
                          type="button"
                          className="mt-4 px-4 py-2 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold shadow-2xs hover:shadow-xs transition-all pointer-events-none"
                        >
                          Select Image File
                        </button>
                      </>
                    )}
                  </div>

                  {sourceImage && (
                    <div className="flex items-center justify-between gap-3 bg-indigo-950/30 border border-indigo-900/40 p-4 rounded-xl">
                      <div className="flex items-center gap-2">
                        <Palette className="w-4 h-4 text-indigo-400" />
                        <span className="text-slate-300 text-xs font-medium">Would you like to annotate or paint over this upload?</span>
                      </div>
                      <button
                        onClick={() => {
                          setUploadedImageForSketch(sourceImage);
                          setActiveTab("draw");
                        }}
                        className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
                        title="Send uploaded drawing into drawing sketchpad"
                      >
                        Open in Sketchpad
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Model Edit Prompter Frame */}
          <div className="bg-[#16191f] border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col gap-5">
            <div className="border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-white font-sans">Describe Applied Visual Edits</h2>
              <p className="text-xs text-slate-400 mt-0.5">Tell Gemini how to transform this sketch into a beautiful completed output</p>
            </div>

            <form onSubmit={handleGenerateEdit} className="space-y-4">
              <textarea
                id="edit-prompt-input"
                rows={3}
                value={currentPrompt}
                onChange={(e) => {
                  setCurrentPrompt(e.target.value);
                  setErrorMsg(null);
                }}
                placeholder="Examples: 'Apply a hyperrealistic acrylic painting look', 'Convert this pencil sketch to neat colorful flat vector flat design on clean white', 'Transform into a detailed 3D blueprint architecture layout'..."
                className="w-full text-sm bg-[#0f1115] border border-slate-800 hover:border-slate-700 focus:border-indigo-500/80 focus:bg-[#0f1115] rounded-xl px-4 py-3 placeholder:text-slate-600 outline-hidden transition-all text-slate-200 leading-relaxed font-sans"
              />

              {/* Style Presets Grid Selector */}
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider font-mono">
                  Quick Style Presets
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-2">
                  {ART_PRESETS.map((p) => {
                    const isActive = currentPrompt === p.prompt;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => handleApplyPreset(p)}
                        className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer text-xs h-24 ${
                          isActive
                            ? "bg-indigo-950/60 border-indigo-500 text-indigo-300 ring-1 ring-indigo-500/30"
                            : "bg-[#0f1115]/50 border-slate-800/80 hover:bg-[#0f1115] hover:border-slate-700 text-slate-300"
                        }`}
                      >
                        <span className="font-bold tracking-tight block truncate w-full">{p.label}</span>
                        <span className="text-[9px] font-medium text-slate-500 font-mono tracking-wide">{p.category}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Advanced Controls Accordion style */}
              <div className="bg-[#0f1115]/80 border border-slate-800 rounded-xl p-4 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-slate-400" />
                  <span className="text-xs font-bold text-slate-300">Generation Parameters</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Model Choice */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">
                      Edit Model
                    </label>
                    <select
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      className="bg-[#16191f] border border-slate-800 rounded-lg py-1.5 px-2.5 text-xs font-semibold text-slate-300 outline-hidden focus:border-indigo-500/80"
                    >
                      <option value="gemini-3.1-flash-image">Gemini 3.1 Flash Image (Best / HD)</option>
                      <option value="gemini-2.5-flash-image">Gemini 2.5 Flash Image</option>
                    </select>
                  </div>

                  {/* Aspect Ratio */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">
                      Aspect Ratio
                    </label>
                    <select
                      value={selectedAspectRatio}
                      onChange={(e) => setSelectedAspectRatio(e.target.value)}
                      className="bg-[#16191f] border border-slate-800 rounded-lg py-1.5 px-2.5 text-xs font-semibold text-slate-300 outline-hidden focus:border-indigo-500/80"
                    >
                      <option value="1:1">Square (1:1)</option>
                      <option value="4:3">Standard Landscape (4:3)</option>
                      <option value="16:9">Wide View (16:9)</option>
                      <option value="3:4">Standard Portrait (3:4)</option>
                      <option value="9:16">Vertical Screen (9:16)</option>
                    </select>
                  </div>

                  {/* Output Resolution size */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">
                      Image Target Size
                    </label>
                    <select
                      value={selectedImageSize}
                      onChange={(e) => setSelectedImageSize(e.target.value)}
                      disabled={selectedModel !== "gemini-3.1-flash-image"}
                      className="bg-[#16191f] border border-slate-800 rounded-lg py-1.5 px-2.5 text-xs font-semibold text-slate-300 outline-hidden focus:border-indigo-500/80 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <option value="512px">Low-Res (512px)</option>
                      <option value="1K">Standard HD (1K)</option>
                      <option value="2K">UHD Sharp (2K)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Error messages display */}
              {errorMsg && (
                <div className="p-4 bg-red-950/50 border border-red-800/40 rounded-xl text-red-200 text-xs flex gap-3">
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <div>
                    <p className="font-bold">{errorMsg.message}</p>
                    {errorMsg.details && <p className="text-[11px] text-red-400 mt-1">{errorMsg.details}</p>}
                  </div>
                </div>
              )}

              {/* Trigger Call Action button */}
              <button
                type="submit"
                id="btn-trigger-edit"
                disabled={isGenerating || !sourceImage}
                className={`w-full py-3.5 px-5 rounded-xl text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  !sourceImage
                    ? "bg-slate-800 text-slate-500 border border-slate-700/50 cursor-not-allowed shadow-none"
                    : isGenerating
                    ? "bg-indigo-600/60 cursor-wait shadow-inner"
                    : "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-900/10 hover:shadow-indigo-900/30 active:scale-[0.99]"
                }`}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Processing Applied Edits...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Apply Visual Transformation
                  </>
                )}
              </button>
            </form>
          </div>
        </section>

        {/* Right Preview Output Frame (Column span 5/12) */}
        <section className="lg:col-span-5 flex flex-col gap-6" id="output-rendered-section">
          {/* Main Visualizer Panel */}
          <div className="bg-[#16191f] border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col gap-5 h-full min-h-[460px]">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white tracking-wide">Rendered Visual Canvas</h3>
                <p className="text-xs text-slate-400 mt-0.5">Interact with the finalized visual edit results</p>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center relative bg-[#090a0d] rounded-xl overflow-hidden p-4 min-h-[320px] max-h-[500px] border border-slate-800/80">
              {isGenerating ? (
                /* Beautiful generating visualizer */
                <div className="flex flex-col items-center justify-center text-center p-6 space-y-4" id="generation-spinner">
                  <div className="relative w-16 h-16">
                    <span className="absolute inset-0 rounded-full border-4 border-slate-800 border-t-indigo-500 animate-spin"></span>
                    <Sparkles className="absolute inset-4 text-indigo-400 w-8 h-8 animate-pulse" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-200 animate-pulse">Reimagining Sketch...</p>
                    <p className="text-xs text-slate-500 mt-1.5 font-mono">{generationStep}</p>
                  </div>
                </div>
              ) : currentResultImage && sourceImage ? (
                /* Dynamic Difference slider output */
                <div className="w-full flex flex-col gap-4">
                  <CompareSlider original={sourceImage} edited={currentResultImage} />

                  {currentResultExplanation && (
                    <div className="p-3 bg-[#16191f] border border-slate-800 rounded-xl text-slate-300 text-xs leading-relaxed max-h-24 overflow-y-auto font-sans">
                      <span className="font-bold text-indigo-400 block mb-0.5 font-mono text-[10px] uppercase">Model comments:</span>
                      {currentResultExplanation}
                    </div>
                  )}

                  {/* Actions Bar for Saved file */}
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <button
                      id="btn-download-result"
                      onClick={() => downloadImageHelper(currentResultImage, "gemini-edited-visual.png")}
                      className="flex-1 min-w-[130px] flex items-center justify-center gap-1.5 py-2.5 px-4 bg-white hover:bg-slate-200 text-slate-950 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs"
                    >
                      <Download className="w-4 h-4" />
                      Download HD PNG
                    </button>

                    <button
                      id="btn-recycle-source"
                      onClick={handleUseEditAsNewSource}
                      className="flex-1 min-w-[130px] flex items-center justify-center gap-1.5 py-2.5 px-4 bg-indigo-950/40 hover:bg-indigo-950/80 border border-indigo-900/60 text-indigo-300 rounded-xl text-xs font-bold transition-all cursor-pointer"
                      title="Re-insert the modified image back as input to edit further"
                    >
                      <Undo className="w-4 h-4" />
                      Refine Result Further
                    </button>
                  </div>
                </div>
              ) : sourceImage ? (
                /* No edit has run, showcase original input preview */
                <div className="h-full flex flex-col items-center justify-center p-6 text-center text-slate-500">
                  <img
                    src={sourceImage}
                    alt="Active stencil source"
                    className="max-h-60 max-w-full rounded-lg shadow-md border border-slate-850 bg-white object-contain opacity-70 mb-4"
                    referrerPolicy="no-referrer"
                  />
                  <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1">Source Stencil Set</p>
                  <p className="text-xs text-slate-400">Add a visual modification statement on the left and start edits!</p>
                </div>
              ) : (
                /* Base empty state */
                <div className="flex flex-col items-center justify-center p-8 text-center text-slate-500">
                  <div className="w-12 h-12 rounded-full border border-slate-800 bg-[#16191f] flex items-center justify-center shadow-md mb-4 animate-pulse">
                    <Eye className="w-5 h-5 text-slate-400" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-300">Awaiting Stencil Material</h4>
                  <p className="text-xs text-slate-400 mt-1.5 max-w-[240px] mx-auto leading-relaxed">
                    Once you define drawings or load drawing files, you will be able to visualize real-time edits right here.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Previous History Sessions Shelf */}
          <div className="bg-[#16191f] border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col gap-4">
            <div className="border-b border-slate-800 pb-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-slate-400" />
                <h4 className="text-xs font-bold text-slate-300 font-sans tracking-wide">Historical Sessions</h4>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 font-bold">
                {historySessions.length} saved
              </span>
            </div>

            {historySessions.length > 0 ? (
              <div className="grid grid-cols-4 gap-2.5 max-h-24 overflow-y-auto pr-1">
                {historySessions.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleLoadSession(s)}
                    className="relative group aspect-square rounded-lg overflow-hidden border border-slate-800 bg-slate-900 hover:border-indigo-500 hover:ring-2 hover:ring-indigo-950 cursor-pointer transition-all"
                    title={s.prompt}
                  >
                    <img
                      src={s.editedImage}
                      alt="Historic output file"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-indigo-400" />
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 text-center py-2">
                Edits you submit are recorded here during the current session
              </p>
            )}
          </div>
        </section>
      </main>

      {/* Footer copyright */}
      <footer className="bg-[#16191f] border-t border-slate-800 py-4 px-6 mt-12 text-center text-slate-500 text-xs">
        <p>&copy; {new Date().getFullYear()} StudioVision Handmade Editor &bull; Powered by server-side Gemini 3.1 & 2.5 Flash Image Models.</p>
      </footer>
    </div>
  );
}
