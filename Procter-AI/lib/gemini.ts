import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

export async function analyzeFaceMovement(movements: string[]) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `Analyze the following face movements for potential suspicious behavior during an exam. Movements: ${movements.join(', ')}. 
  Provide a risk assessment (low, medium, high) and explanation. Format as JSON with fields: riskLevel, explanation`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return JSON.parse(response.text());
}

export async function analyzeTabSwitching(switches: number, duration: number) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `Analyze tab switching behavior during an exam. Number of switches: ${switches}, Duration: ${duration} seconds.
  Assess if this behavior is suspicious. Format as JSON with fields: isSuspicious, explanation`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return JSON.parse(response.text());
}