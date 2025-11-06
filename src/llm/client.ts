import axios, { AxiosInstance } from 'axios';
import { CommandPlan, Model } from '../types';
import { buildSystemPrompt, buildUserPrompt } from './prompt';
import { COMMAND_PLAN_SCHEMA } from './schema';

export class LLMClient {
  private client: AxiosInstance;
  private apiUrl: string;
  private apiKey: string;
  private model: string;

  constructor(apiUrl: string, apiKey: string, model: string) {
    this.apiUrl = apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;
    this.apiKey = apiKey;
    this.model = model;

    this.client = axios.create({
      baseURL: this.apiUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      timeout: 60000, // 60 second timeout
    });
  }

  /**
   * List available models from the API endpoint
   */
  async listModels(): Promise<Model[]> {
    try {
      const response = await this.client.get('/models');

      if (response.data && response.data.data) {
        return response.data.data.map((model: any) => ({
          id: model.id,
          name: model.name || model.id,
          created: model.created,
          owned_by: model.owned_by,
        }));
      }

      // Some APIs return models differently
      if (response.data && Array.isArray(response.data)) {
        return response.data.map((model: any) => ({
          id: model.id || model.name,
          name: model.name || model.id,
        }));
      }

      return [];
    } catch (error: any) {
      // If endpoint doesn't support /models, return empty array
      if (error.response?.status === 404) {
        return [];
      }
      throw new Error(`Failed to list models: ${error.message}`);
    }
  }

  /**
   * Generate a command plan based on user request
   */
  async generateCommandPlan(
    userRequest: string,
    shell: string,
    cwd: string,
    platform: string
  ): Promise<CommandPlan> {
    try {
      const systemPrompt = buildSystemPrompt(shell as any, cwd, platform);
      const userPrompt = buildUserPrompt(userRequest);

      const requestBody: any = {
        model: this.model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
      };

      // Try with structured output first (OpenAI-style)
      try {
        requestBody.response_format = {
          type: 'json_schema',
          json_schema: {
            name: 'command_plan',
            strict: true,
            schema: COMMAND_PLAN_SCHEMA,
          },
        };

        const response = await this.client.post('/chat/completions', requestBody);
        const content = response.data.choices[0].message.content;
        return JSON.parse(content);
      } catch (error: any) {
        // If structured output fails, try with json_object mode
        if (error.response?.status === 400) {
          requestBody.response_format = { type: 'json_object' };

          // Add schema to system prompt
          requestBody.messages[0].content += `\n\nYou must respond with a valid JSON object matching this schema:\n${JSON.stringify(COMMAND_PLAN_SCHEMA, null, 2)}`;

          const response = await this.client.post('/chat/completions', requestBody);
          const content = response.data.choices[0].message.content;
          return JSON.parse(content);
        }
        throw error;
      }
    } catch (error: any) {
      if (error.response) {
        throw new Error(`API error: ${error.response.data?.error?.message || error.message}`);
      }
      throw new Error(`Failed to generate command: ${error.message}`);
    }
  }

  /**
   * Set the model to use
   */
  setModel(model: string): void {
    this.model = model;
  }

  /**
   * Get current model
   */
  getModel(): string {
    return this.model;
  }
}
