import axios from 'axios';
import { SUMMARY_SYSTEM_PROMPT } from '@/utils/prompts';

export const generateSummaryFromOllama = async (pdfText: string) => {
  try {
    // Combine system prompt and user prompt into a single string for Ollama
    const prompt = `
${SUMMARY_SYSTEM_PROMPT}

Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:

${pdfText}
    `.trim();

    // Make request to Ollama's REST API
    const response = await axios.post('http://localhost:11434/api/generate', {
      model: 'llama3:latest',
      prompt: prompt,
      stream: false,
      options: {
        num_ctx: 8192, // LLaMA 3's context length
        temperature: 0.7, 
      },
    });

    // Extract the summary from the response
    const summary = response.data.response;
    if (!summary) {
      throw new Error('Empty response from Ollama');
    }

    return summary;
  } catch (error: any) {
    console.error('Ollama API Error:', error.message);
    if (error.message.includes('connection refused')) {
      throw new Error('Ollama server not running. Please run "ollama serve" in a terminal.');
    }
    if (error.message.includes('model not found')) {
      throw new Error('LLaMA 3 model not found. Please run "ollama pull llama3:latest" to download.');
    }
    throw new Error(`Failed to generate summary: ${error.message}`);
  }
};