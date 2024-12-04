import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = ''; // Add your Gemini API key here
const genAI = new GoogleGenerativeAI(API_KEY);

export async function generateEmailReply(emailContent: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const prompt = `
    You are a professional email assistant. Please analyze the following email and generate a polite, 
    professional, and contextually appropriate response. The response should:
    - Maintain a professional yet friendly tone
    - Address the key points from the original email
    - Be concise and clear
    - Use appropriate greetings and sign-offs
    
    Original email:
    "${emailContent}"
    `;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating reply:', error);
    throw new Error('Failed to generate reply');
  }
}