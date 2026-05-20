import { OpenAI } from 'openai';
import * as weave from 'weave';

export type AIProvider = 'WANDB' | 'MISTRAL' | 'OPENAI';

export interface AIResponse {
  success: boolean;
  provider: AIProvider;
  model: string;
  content: string;
  usage?: any;
  latency: number;
  error?: string;
}

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

// Initialize Weave if WandB project is configured
if (process.env.WANDB_PROJECT) {
  try {
    weave.init(process.env.WANDB_PROJECT);
  } catch (err) {
    console.error('Failed to initialize Weave:', err);
  }
}

// We will initialize clients inside the generate method to avoid Next.js build-time errors.

export class AIService {
  static async generate(
    messages: Message[],
    options?: { temperature?: number; preferredModel?: string }
  ): Promise<AIResponse> {
    const startTime = Date.now();
    let client: OpenAI;
    let provider: AIProvider;
    let model: string;

    // AI routing priority: 1. W&B, 2. Mistral, 3. OpenAI
    if (process.env.WANDB_API_KEY && process.env.WANDB_API_KEY !== 'your_wandb_api_key_here') {
      client = new OpenAI({
        apiKey: process.env.WANDB_API_KEY,
        baseURL: process.env.WANDB_BASE_URL || 'https://api.inference.wandb.ai/v1',
      });
      provider = 'WANDB';
      model = process.env.WANDB_MODEL || 'Qwen/Qwen3-Coder-480B-A35B-Instruct';
    } else if (process.env.MISTRAL_API_KEY || process.env.NGC_API_KEY) {
      client = new OpenAI({
        apiKey: process.env.MISTRAL_API_KEY || process.env.NGC_API_KEY || 'nvapi-dummy',
        baseURL: process.env.MISTRAL_BASE_URL || 'http://localhost:8000/v1',
      });
      provider = 'MISTRAL';
      model = 'mistralai/mistral-medium-3.5-128b';
    } else {
      if (!process.env.OPENAI_API_KEY) {
        throw new Error("OPENAI_API_KEY is missing");
      }
      client = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
      provider = 'OPENAI';
      model = options?.preferredModel || 'gpt-4o-mini';
    }

    try {
      const response = await client.chat.completions.create({
        model,
        messages,
        temperature: options?.temperature ?? 0.7,
      });

      const latency = Date.now() - startTime;

      return {
        success: true,
        provider,
        model,
        content: response.choices[0]?.message?.content || '',
        usage: response.usage,
        latency,
      };
    } catch (error: any) {
      console.error(`[AI Service Error - ${provider}]:`, error.message);
      
      // Fallback logic if a primary provider fails
      if (provider === 'WANDB' && (process.env.MISTRAL_API_KEY || process.env.OPENAI_API_KEY)) {
        console.log('Falling back to next available provider...');
        // Temporarily mask WANDB to force fallback
        const tempKey = process.env.WANDB_API_KEY;
        process.env.WANDB_API_KEY = '';
        const fallbackResponse = await this.generate(messages, options);
        process.env.WANDB_API_KEY = tempKey;
        return fallbackResponse;
      }
      
      if (provider === 'MISTRAL' && process.env.OPENAI_API_KEY) {
         console.log('Falling back to OpenAI...');
         const tempKey = process.env.MISTRAL_API_KEY;
         const tempNgc = process.env.NGC_API_KEY;
         process.env.MISTRAL_API_KEY = '';
         process.env.NGC_API_KEY = '';
         const fallbackResponse = await this.generate(messages, options);
         process.env.MISTRAL_API_KEY = tempKey;
         process.env.NGC_API_KEY = tempNgc;
         return fallbackResponse;
      }

      return {
        success: false,
        provider,
        model,
        content: '',
        latency: Date.now() - startTime,
        error: error.message,
      };
    }
  }
}
