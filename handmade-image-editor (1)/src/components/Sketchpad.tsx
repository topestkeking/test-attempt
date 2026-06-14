import React, { useRef, useState, useEffect } from "react";
import { CanvasTool } from "../types";
import { 
  Paintbrush, 
  Eraser, 
  Trash2, 
  RotateCcw, 
  Square,
  Upload,
  Sparkles,
  Download
} from "lucide-react";

interface SketchpadProps {
  onSave: (base64Image: string) => void;
  initialImage?: string; // Option to seed from upload
}

const PRESET_COLORS = [
  "#000000", // Velvet Black
  "#4b5563", // Slate Gray
  "#ef4444", // Crimson Red
  "#3b82f6", // Vibrant Blue
  "#10b981", // Forest Green
  "#f59e0b", // Warm Amber
  "#8b5cf6", // Royal Purple
  "#ec4899", // Electric Pink
];

export default function Sketchpad({ onSave, initialImage }: SketchpadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [tool, setTool] = useState<CanvasTool>("brush");
  const [color, setColor] = useState<string>("#000000");
  const [lineWidth, setLineWidth] = useState<number>(6);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [history, setHistory] = useState<string[]>([]);
  const [hasDrawings, setHasDrawings] = useState<boolean>(false);

  // Initialize canvas with white background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions (fixed high resolution for pristine exports)
    canvas.width = 800;
    canvas.height = 800;

    // Fill white background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Save initial blank state
    setHistory([canvas.toDataURL()]);
  }, []);

  // Handle loading initial uploaded image onto canvas
  useEffect(() => {
    if (!initialImage) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      // Clear
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw aspect-ratio preserved image onto the 800x800 canvas
      const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
      const x = (canvas.width - img.width * scale) / 2;
      const y = (canvas.height - img.height * scale) / 2;
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

      // Save to drawing history
      const nextState = canvas.toDataURL();
      setHistory((prev) => [...prev, nextState]);
      setHasDrawings(true);
    };
    img.src = initialImage;
  }, [initialImage]);

  // Push new state to history
  const pushHistory = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const nextState = canvas.toDataURL();
    setHistory((prev) => [...prev, nextState]);
    setHasDrawings(true);
  };

  // Undo last action
  const handleUndo = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx || history.length <= 1) return;

    const nextHistory = [...history];
    nextHistory.pop(); // Remove current state
    const prevState = nextHistory[nextHistory.length - 1];

    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      setHistory(nextHistory);
      if (nextHistory.length === 1) {
        setHasDrawings(false);
      }
    };
    img.src = prevState;
  };

  // Clear drawing canvas back to pristine state
  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Reset history to only initial blank state
    const nextState = canvas.toDataURL();
    setHistory([nextState]);
    setHasDrawings(false);
  };

  // Get mouse or touch coordinates relative to canvas
  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;

    if ("touches" in e) {
      if (e.touches.length === 0) return null;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    // Map client size to 800x800 internal size
    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;
    return { x, y };
  };

  // Start Drawing
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const coords = getCoordinates(e);
    if (!coords) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
    
    // Set styles
    ctx.strokeStyle = tool === "eraser" ? "#ffffff" : color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    setIsDrawing(true);
  };

  // Drawing
  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();

    const coords = getCoordinates(e);
    if (!coords) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
  };

  // End Drawing
  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      pushHistory();
    }
  };

  // Trigger save callback with current canvas state
  const handleExport = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    onSave(canvas.toDataURL("image/png"));
  };

  return (
    <div className="flex flex-col h-full bg-[#0f1115] border border-slate-800 rounded-2xl overflow-hidden shadow-sm" id="drawing-sketchpad">
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 bg-[#16191f] border-b border-slate-800/80">
        <div className="flex items-center gap-4">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
            Sketchpad Canvas
          </span>
          <div className="flex items-center bg-[#0f1115] rounded-lg p-0.5 border border-slate-800">
            <button
               id="tool-brush"
               onClick={() => setTool("brush")}
               className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer transition-all ${
                 tool === "brush"
                   ? "bg-slate-800 text-white shadow-xs"
                   : "text-slate-400 hover:text-slate-200"
               }`}
               title="Paintbrush Tool"
             >
              <Paintbrush className="w-3.5 h-3.5" />
              Brush
            </button>
            <button
               id="tool-eraser"
               onClick={() => setTool("eraser")}
               className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer transition-all ${
                 tool === "eraser"
                   ? "bg-slate-800 text-white shadow-xs"
                   : "text-slate-400 hover:text-slate-200"
               }`}
               title="Eraser Tool"
             >
              <Eraser className="w-3.5 h-3.5" />
              Eraser
            </button>
          </div>
        </div>
 
        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          <button
            id="btn-undo"
            onClick={handleUndo}
            disabled={history.length <= 1}
            className="p-1.5 rounded-lg border border-slate-850 bg-[#16191f] hover:bg-slate-900 text-slate-300 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all"
            title="Undo stroke"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            id="btn-clear"
            onClick={handleClear}
            className="p-1.5 rounded-lg border border-slate-850 bg-[#16191f] hover:bg-red-950/40 hover:border-red-900/40 text-slate-300 hover:text-red-400 transition-all cursor-pointer"
            title="Clear canvas"
          >
            <Trash2 className="w-4 h-4" />
          </button>
 
          <button
            id="btn-use-sketch"
            onClick={handleExport}
            className="flex items-center gap-1.5 ml-2 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-750 text-white text-xs font-bold shadow-md shadow-indigo-900/20 transition-all cursor-pointer"
            title="Use this sketch for visual editing"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Set as Source
          </button>
        </div>
      </div>
 
      {/* Canvas Area */}
      <div 
        ref={containerRef} 
        className="flex-1 min-h-0 flex items-center justify-center p-6 bg-[#090a0d] overflow-auto relative group"
      >
        <div className="w-full max-w-[420px] aspect-square relative shadow-lg rounded-xl overflow-hidden border border-slate-900 bg-white">
          <canvas
            id="drawing-surface"
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="w-full h-full block touch-none cursor-crosshair select-none"
          />
          
          {!hasDrawings && !initialImage && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 pointer-events-none p-4 text-center">
              <Square className="w-8 h-8 opacity-40 mb-2 border-dashed stroke-1 text-slate-500" />
              <p className="text-sm font-semibold text-slate-500">Draw a sketch or outline</p>
              <p className="text-xs text-slate-400 mt-1">Changes you make here will act as the stencil</p>
            </div>
          )}
        </div>
      </div>
 
      {/* Brush Settings Bottom Toolbar */}
      <div className="bg-[#16191f] border-t border-slate-800/80 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          {/* Colors Selection */}
          {tool === "brush" && (
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                Brush Color
              </label>
              <div className="flex flex-wrap items-center gap-2">
                {PRESET_COLORS.map((hex) => (
                  <button
                    key={hex}
                    onClick={() => {
                      setColor(hex);
                      setTool("brush");
                    }}
                    className={`w-6 h-6 rounded-full cursor-pointer relative transition-transform hover:scale-110 active:scale-95 ${
                      color === hex && tool === "brush" ? "ring-2 ring-indigo-500 ring-offset-2 ring-offset-[#16191f]" : "border border-slate-800"
                    }`}
                    style={{ backgroundColor: hex }}
                    title={hex}
                  />
                ))}
                {/* Custom Color Input */}
                <span className="relative flex items-center justify-center w-6 h-6 rounded-full overflow-hidden border border-slate-800 bg-[#0f1115]">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => {
                      setColor(e.target.value);
                      setTool("brush");
                    }}
                    className="absolute w-10 h-10 -m-2 p-0 border-0 cursor-pointer"
                    title="Custom color picker"
                  />
                </span>
              </div>
            </div>
          )}
 
          {tool === "eraser" && (
            <div className="flex items-center text-slate-400 text-xs gap-2 py-2 font-medium">
              <Eraser className="w-4 h-4 text-slate-500" />
              <span>Eraser active. Draws white to clear sketch details.</span>
            </div>
          )}
 
          {/* Stroke Size Slider */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                Brush Size
              </label>
              <span className="text-xs font-mono font-bold text-slate-300">{lineWidth}px</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-slate-500 font-mono">Min</span>
              <input
                type="range"
                min="2"
                max="40"
                value={lineWidth}
                onChange={(e) => setLineWidth(Number(e.target.value))}
                className="flex-1 accent-indigo-500 h-1 bg-[#0f1115] rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-[10px] text-slate-500 font-mono">Max</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
