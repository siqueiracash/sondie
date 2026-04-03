import { GoogleGenAI } from "@google/genai";
import { useState, useEffect } from 'react';

let aiInstance: GoogleGenAI | null = null;

function getAi() {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey || apiKey === 'undefined' || apiKey === '') {
      console.warn("GEMINI_API_KEY is not defined or empty. Image generation will be disabled.");
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
    let isMounted = true;

async function generate() {
      setLoading(true);
      
      const timeoutId = setTimeout(() => {
        if (isMounted) setLoading(false);
      }, 20000); // 20 seconds timeout

      const ai = getAi();
      if (!ai) {
        clearTimeout(timeoutId);
        if (isMounted) setLoading(false);
        return;
      }

      const modelsToTry = ['gemini-3.1-flash-image-preview', 'gemini-2.5-flash-image'];
      let success = false;

      for (const modelName of modelsToTry) {
        if (success) break;
        
        try {
          const response = await ai.models.generateContent({
            model: modelName,
            contents: {
              parts: [
                {
                  text: prompt + " The image MUST clearly include the brand name 'Sondié' in the UI or as a logo. Professional commercial photography style.",
                },
              ],
            },
            config: {
              imageConfig: {
                aspectRatio: "16:9",
                ...(modelName.includes('3.1') ? { imageSize: "1K" } : {})
              },
            },
          });

          if (isMounted && response.candidates?.[0]?.content?.parts) {
            for (const part of response.candidates[0].content.parts) {
              if (part.inlineData) {
                setImageUrl(`data:image/png;base64,${part.inlineData.data}`);
                success = true;
                break;
              }
            }
          }
        } catch (error) {
          console.error(`Error generating image with ${modelName}:`, error);
          // Continue to next model
        }
      }

      clearTimeout(timeoutId);
      if (isMounted) setLoading(false);
    }

    generate();
    return () => { isMounted = false; };
  }, [prompt]);

  return { imageUrl, loading };
}
