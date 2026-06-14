import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Increase request size limits to support editing high-resolution base64 images
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Initialize GoogleGenAI client with standard guidelines
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// API endpoint for image editing via gemini image editing models
app.post("/api/edit-image", async (req, res) => {
  try {
    const { image, prompt, model, aspectRatio, imageSize } = req.body;

    if (!image) {
      return res.status(400).json({ error: "No source image provided" });
    }
    if (!prompt || typeof prompt !== "string" || prompt.trim() === "") {
      return res.status(400).json({ error: "Missing prompt or description of changes" });
    }

    const activeModel = model || "gemini-3.1-flash-image";

    // Parse the data URI to extract bare base64 data and mime type
    let mimeType = "image/png";
    let base64Data = image;

    if (image.startsWith("data:")) {
      const parts = image.split(",");
      if (parts.length > 1) {
        const metadata = parts[0];
        base64Data = parts[1];
        const mimeMatch = metadata.match(/data:([^;]+);/);
        if (mimeMatch) {
          mimeType = mimeMatch[1];
        }
      }
    }

    console.log(`Editing image with model: ${activeModel}, MimeType: ${mimeType}, Size of base64: ${base64Data.length}`);

    // Call the correct Gemini API
    const response = await ai.models.generateContent({
      model: activeModel,
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio || "1:1",
          ...(activeModel === "gemini-3.1-flash-image" && imageSize ? { imageSize } : {}),
        },
      },
    });

    let editedImageBase64 = "";
    let explanationText = "";

    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData?.data) {
          editedImageBase64 = `data:${part.inlineData.mimeType || "image/png"};base64,${part.inlineData.data}`;
        } else if (part.text) {
          explanationText += part.text;
        }
      }
    }

    if (!editedImageBase64) {
      // In case the model responds with text only instead of returning an image (e.g. Refusal or safety block)
      return res.status(422).json({
        error: "The model did not generate an edited image. It might have declined due to content filters or safety guidelines.",
        details: explanationText || "No image part returned in model response.",
      });
    }

    return res.json({
      success: true,
      editedImage: editedImageBase64,
      explanation: explanationText || null,
    });
  } catch (error: any) {
    console.error("Error editing image via Gemini:", error);
    return res.status(500).json({
      error: "Failed to edit image.",
      details: error?.message || "An unexpected error occurred on the server.",
    });
  }
});

// Configure Vite integration
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Setting up Express in development mode with Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Setting up Express in production mode serving built static files...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running and listening on http://0.0.0.0:${PORT}`);
  });
}

setupVite().catch((err) => {
  console.error("Vite server initialization error:", err);
});
