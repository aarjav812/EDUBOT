import OpenAI from 'openai';
import { GoogleGenAI } from '@google/genai';

interface AIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface AIResponse {
  content: string;
  tokens?: number;
  model: string;
}

class AIService {
  private openai: OpenAI | null = null;
  private gemini: GoogleGenAI | null = null;
  private provider: 'openai' | 'gemini';

  constructor() {
    this.provider = (process.env.AI_PROVIDER as 'openai' | 'gemini') || 'gemini';
    
    if (this.provider === 'openai' && process.env.OPENAI_API_KEY) {
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
    } else if (this.provider === 'gemini') {
      // GoogleGenAI uses GOOGLE_API_KEY from environment automatically
      this.gemini = new GoogleGenAI({});
    }
  }

  private getSystemPrompt(): string {
    return `You are EduBot, an intelligent and helpful educational assistant for university students. Your role is to:

1. **Academic Support**: Help students with course information, syllabus queries, assignment deadlines, and exam schedules.
2. **Campus Information**: Provide information about campus events, facilities, clubs, and resources.
3. **Study Assistance**: Offer study tips, time management advice, and organizational strategies.
4. **Reminder Management**: Help students set and manage reminders for assignments, exams, and events.
5. **Personalized Guidance**: Provide context-aware, personalized responses based on the student's information.

Guidelines:
- Be friendly, supportive, and encouraging
- Provide concise yet comprehensive answers
- Use emojis appropriately to make conversations engaging
- When discussing deadlines or dates, always clarify the timeframe
- If you don't know something, admit it honestly and suggest alternatives
- Encourage good study habits and time management
- Be empathetic to student stress and workload concerns

When a student asks about setting reminders, extract the following information:
- Title/Subject of the reminder
- Type (assignment, exam, event, deadline)
- Due date and time
- Priority level

Current date and time: ${new Date().toISOString()}`;
  }

  async chat(messages: AIMessage[], userContext?: {
    name?: string;
    university?: string;
    course?: string;
  }): Promise<AIResponse> {
    try {
      let systemPrompt = this.getSystemPrompt();
      
      if (userContext) {
        systemPrompt += `\n\nStudent Information:
- Name: ${userContext.name || 'Not provided'}
- University: ${userContext.university || 'Not provided'}
- Course: ${userContext.course || 'Not provided'}`;
      }

      if (this.provider === 'openai' && this.openai) {
        return await this.chatWithOpenAI(messages, systemPrompt);
      } else if (this.provider === 'gemini' && this.gemini) {
        return await this.chatWithGemini(messages, systemPrompt);
      } else {
        throw new Error('No AI provider configured. Please set up OpenAI or Gemini API key.');
      }
    } catch (error: any) {
      console.error('AI Chat Error:', error);
      throw new Error(`AI service error: ${error.message}`);
    }
  }

  private async chatWithOpenAI(messages: AIMessage[], systemPrompt: string): Promise<AIResponse> {
    if (!this.openai) {
      throw new Error('OpenAI not initialized');
    }

    const completion = await this.openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages.map(msg => ({
          role: msg.role,
          content: msg.content,
        })),
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return {
      content: completion.choices[0].message.content || 'No response generated',
      tokens: completion.usage?.total_tokens,
      model: completion.model,
    };
  }

  private async chatWithGemini(messages: AIMessage[], systemPrompt: string): Promise<AIResponse> {
    if (!this.gemini) {
      throw new Error('Gemini not initialized');
    }

    // Combine system prompt with conversation
    const conversationText = messages.map(msg => {
      const prefix = msg.role === 'user' ? 'Student:' : 'EduBot:';
      return `${prefix} ${msg.content}`;
    }).join('\n\n');

    const prompt = `${systemPrompt}\n\n${conversationText}\n\nEduBot:`;

    const response = await this.gemini.models.generateContent({
      model: process.env.GEMINI_MODEL || 'gemini-2.0-flash-exp',
      contents: prompt,
    });

    return {
      content: response.text || 'No response generated',
      model: process.env.GEMINI_MODEL || 'gemini-2.0-flash-exp',
    };
  }

  // Extract intent from user message for better routing
  async extractIntent(message: string): Promise<{
    intent: string;
    entities?: any;
  }> {
    const lowerMessage = message.toLowerCase();

    // Simple intent detection (can be enhanced with ML)
    if (lowerMessage.includes('remind') || lowerMessage.includes('reminder')) {
      return { intent: 'create_reminder' };
    }
    if (lowerMessage.includes('deadline') || lowerMessage.includes('due')) {
      return { intent: 'check_deadlines' };
    }
    if (lowerMessage.includes('event') || lowerMessage.includes('calendar')) {
      return { intent: 'check_events' };
    }
    if (lowerMessage.includes('syllabus') || lowerMessage.includes('course')) {
      return { intent: 'course_info' };
    }
    if (lowerMessage.includes('exam') || lowerMessage.includes('test')) {
      return { intent: 'exam_info' };
    }

    return { intent: 'general_chat' };
  }
}

export default new AIService();
