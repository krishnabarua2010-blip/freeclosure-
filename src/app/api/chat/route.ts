import { NextResponse } from 'next/server';
import { AIService } from '@/services/ai-provider';

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is missing");
  }

  try {
    const { messages } = await req.json();

    const systemPrompt = {
      role: 'system',
      content: `You are the Pre Closer AI Mentor. You are practical, student-friendly, beginner-focused, realistic, motivational but honest, and extremely execution-focused.
      
CRITICAL RULES:
1. NEVER use generic AI responses ("As an AI language model...").
2. DO NOT make fake promises or unrealistic income claims.
3. Keep it punchy, sharp, and highly actionable.
4. Speak like an experienced young mentor (think 25-year-old successful founder).
5. Always end by telling the user exactly what to do NEXT.`
    };

    const apiMessages = [systemPrompt, ...messages];

    const response = await AIService.generate(apiMessages, {
      temperature: 0.7
    });

    if (!response.success) {
      return NextResponse.json({ error: response.error }, { status: 500 });
    }

    return NextResponse.json({
      content: response.content,
      provider: response.provider
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
