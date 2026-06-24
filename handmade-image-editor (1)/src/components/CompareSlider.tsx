import React, { useState, useRef, useEffect } from "react";

interface CompareSliderProps {
  original: string;
  edited: string;
  originalLabel?: string;
  editedLabel?: string;
}

export default function CompareSlider({
  original,
  edited,
  originalLabel = "Raw Stencil / Drawing",
  editedLabel = "Gemini Edited Output",
}: CompareSliderProps) {
  const [sliderPosition, setSliderPosition] = useState<number>(50); // 0 to 100
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const onMouseDown = () => {
    isDragging.current = true;
  };

  const onMouseUp = () => {
    isDragging.current = false;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 0) return;
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      isDragging.current = false;
    };
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
      onTouchStart={onMouseDown}
      className="relative w-full aspect-square rounded-2xl overflow-hidden select-none border border-slate-800 bg-[#090a0d] shadow-lg cursor-ew-resize"
      id="comparison-slider-container"
    >
      {/* Before Image (Left/Bottom) */}
      <img
        src={original}
        alt="Original hand-made source"
        className="absolute inset-0 w-full h-full object-contain bg-white"
        referrerPolicy="no-referrer"
      />
      <div className="absolute bottom-3 left-3 bg-slate-950/90 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-1 rounded-md font-mono tracking-wider shadow-md pointer-events-none border border-slate-800">
        {originalLabel}
      </div>

      {/* After Image (Right/Top) */}
      <div
        className="absolute inset-y-0 right-0 overflow-hidden pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        <img
          src={edited}
          alt="AI edited illustration"
          className="absolute inset-y-0 right-0 h-full object-contain bg-white pointer-events-none"
          style={{ width: containerRef.current?.getBoundingClientRect().width }}
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="absolute bottom-3 right-3 bg-indigo-600/90 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-1 rounded-md font-mono tracking-wider shadow-md pointer-events-none">
        {editedLabel}
      </div>

      {/* Vertical Slider Handle line */}
      <div
        className="absolute inset-y-0 w-1 bg-indigo-500 shadow-xl flex items-center justify-center transition-all cursor-ew-resize group"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={onMouseDown}
      >
        <div className="w-8 h-8 rounded-full bg-slate-950 text-indigo-400 shadow-2xl flex items-center justify-center border border-indigo-500 hover:text-white hover:scale-105 active:scale-95 transition-all text-sm font-bold pointer-events-none">
          ↔
        </div>
      </div>
    </div>
  );
}
