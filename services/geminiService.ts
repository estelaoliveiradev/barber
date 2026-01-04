
import { GoogleGenAI } from "@google/genai";

// Initialize the Google GenAI client following strict guidelines
// ALWAYS use process.env.API_KEY directly in the named parameter object
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getStyleAdvice = async (userPrompt: string) => {
  try {
    // Correct usage of generateContent with model name and contents
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: `Você é o assistente virtual da Barbearia Garagem, liderada pela Verena Esídio. 
        Seu tom é profissional, direto e moderno, refletindo o ambiente de uma oficina de carros clássicos. 
        Ajude os clientes a entenderem os serviços: Cabelo, Cabelo e Barba, e Pezinho.
        Mencione que a Verena é focada em cortes de alta precisão e acabamento detalhado. 
        Mantenha as respostas curtas e evite termos técnicos complexos como visagismo.`,
      },
    });
    // Use .text property directly to extract generated content as per guidelines
    return response.text || "Desculpe, o motor deu uma falha. Pode repetir?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Opa, deu um problema no motor aqui. Pode repetir a pergunta?";
  }
};
