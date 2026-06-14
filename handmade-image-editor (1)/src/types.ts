export interface EditSession {
  id: string;
  timestamp: Date;
  prompt: string;
  model: string;
  originalImage: string; // base64 / data URL
  editedImage: string; // base64 / data URL
  explanation?: string;
  settings: {
    aspectRatio: string;
    imageSize?: string;
  };
}

export interface ArtPreset {
  id: string;
  label: string;
  prompt: string;
  icon: string;
  category: "Style" | "Correction" | "Artistic" | "Background";
}

export type CanvasTool = "brush" | "eraser";
