import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateImages() {
  const prompts = [
    {
      name: "hero-dashboard",
      prompt: "A high-quality professional software mockup showing a desktop dashboard in the background with a calendar agenda, and a modern smartphone in the foreground displaying a booking page for a business named 'Sondié'. The mobile app shows service options like 'Corte de Cabelo' with prices in Euros. Clean, modern UI, indigo and white color palette. Similar to a SaaS landing page hero image."
    },
    {
      name: "mobile-dashboard",
      prompt: "A high-quality professional software mockup of a smartphone screen displaying a business management dashboard for an app named 'Sondié'. It shows a welcome message 'Olá, Sondié!', statistics like '148 Clientes' and '12 Agendamentos', and a list of today's appointments with names and times. Clean, minimalist design, emerald green and indigo accents."
    }
  ];

  for (const p of prompts) {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: p.prompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
        },
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        console.log(`IMAGE_DATA:${p.name}:${part.inlineData.data}`);
      }
    }
  }
}

generateImages();
