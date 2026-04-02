import { GoogleGenAI } from "@google/genai";
import { useState, useEffect } from 'react';

let aiInstance: GoogleGenAI | null = null;

function getAi() {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not defined. Image generation will be disabled.");
      return null;
    }
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
}

export function useSondieImage(prompt: string) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function generate() {
      const ai = getAi();
      if (!ai) {
        setLoading(false);
        return;
      }

      try {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [
              {
                text: prompt + " The image MUST clearly include the brand name 'Sondié' in the UI or as a logo.",
              },
            ],
          },
          config: {
            imageConfig: {
              aspectRatio: "16:9",
            },
          },
        });

        if (response.candidates?.[0]?.content?.parts) {
          for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
              setImageUrl(`data:image/png;base64,${part.inlineData.data}`);
              break;
            }
          }
        }
      } catch (error) {
        console.error("Error generating image:", error);
      } finally {
        setLoading(false);
      }
    }

    generate();
  }, [prompt]);

  return { imageUrl, loading };
}
