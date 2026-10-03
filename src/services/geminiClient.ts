export interface GeminiGenerateOptions {
  apiKey: string;
  model?: string;
  systemInstruction?: string;
  prompt: string;
  temperature?: number;
}

export class GeminiService {
  public static async testApiKey(apiKey: string): Promise<boolean> {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: 'Hello, respond with OK.' }] }],
          }),
        }
      );
      return response.ok;
    } catch {
      return false;
    }
  }

  public static async generateAgentResponse(options: GeminiGenerateOptions): Promise<string> {
    const model = options.model || 'gemini-2.5-flash';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${options.apiKey}`;

    const body: Record<string, any> = {
      contents: [{ parts: [{ text: options.prompt }] }],
      generationConfig: {
        temperature: options.temperature ?? 0.2,
      },
    };

    if (options.systemInstruction) {
      body.systemInstruction = {
        parts: [{ text: options.systemInstruction }],
      };
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Gemini API error (${response.status}): ${errText}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  }
}
