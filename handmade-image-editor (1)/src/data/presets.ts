import { ArtPreset } from "../types";

export const ART_PRESETS: ArtPreset[] = [
  {
    id: "style-cleanup",
    label: "Clean Inked Lineart",
    prompt: "Refine and cleanup this rough drawing. Convert it into clean, crisp black and white inked line art, professional illustrator style, minimalist vector, high contrast, smooth curves.",
    icon: "Sparkles",
    category: "Correction",
  },
  {
    id: "style-watercolor",
    label: "Vibrant Watercolor",
    prompt: "A beautiful, premium digital watercolor painting based on this hand-drawn stencil. Splattered ink details, soft pastel color washes, rich textures, exquisite watercolor gradients on textured paper.",
    icon: "Palette",
    category: "Artistic",
  },
  {
    id: "style-neon",
    label: "Cyberpunk Neon",
    prompt: "Reimagine this diagram/sketch as ultra-modern, high-tech cyberpunk visual art. Use glowing vibrant pink, cyan, and teal neon laser lines on an elegant dark obsidian background, futuristic interface, dramatic synthwave lighting.",
    icon: "Zap",
    category: "Style",
  },
  {
    id: "style-clay",
    label: "3D Claymation",
    prompt: "Recreate this picture in a gorgeous, glossy 3D clay or claymation render. Playful round toy shapes, smooth organic clay textures, subtle fingerprint details, soft studio layout, beautiful ambient occlusion shadows.",
    icon: "Smile",
    category: "Artistic",
  },
  {
    id: "style-anime",
    label: "Modern Anime",
    prompt: "A professionally polished, vibrant modern Japanese anime / manga keyframe based on this sketch. Highly detailed characters or background rendering, gorgeous sunset lighting, cinematic bloom, studio Kyoto Animation style.",
    icon: "Image",
    category: "Style",
  },
  {
    id: "style-photo",
    label: "Photorealistic Film",
    prompt: "Transform this stencil draft into a stunning, ultra-detailed 35mm film photograph. Rich realism, deep textures, authentic lighting, moody shadows, crisp focus, photorealistic depth, professional lens shot.",
    icon: "Camera",
    category: "Artistic",
  },
  {
    id: "style-flat",
    label: "Flat Design Vector",
    prompt: "A perfectly clean, neat minimalist flat design vector icon / illustration matching this layout. Crisp shapes, highly coordinated pastel color palette, professional modern tech corporate illustration.",
    icon: "Layers",
    category: "Style",
  },
  {
    id: "style-chalk",
    label: "Vintage Chalkboard",
    prompt: "Render this hand drawing in an elegant chalkboard illustration style. Crisp white and pastel chalk dust strokes on a dusty green, authentic vintage slate chalkboard, highly detailed hand-drawn chalk textures.",
    icon: "PenTool",
    category: "Artistic",
  },
];
