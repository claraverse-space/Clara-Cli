import inquirer from 'inquirer';
import chalk from 'chalk';
import { Model } from '../types';

const sakura = chalk.hex('#FFB7C5');

export class InteractivePrompt {
  static async getApiUrl(defaultValue?: string): Promise<string> {
    const { apiUrl } = await inquirer.prompt([
      {
        type: 'input',
        name: 'apiUrl',
        message: sakura('API URL:'),
        default: defaultValue || 'https://api.openai.com/v1',
        validate: (input: string) => {
          if (!input.trim()) {
            return 'API URL is required';
          }
          try {
            new URL(input);
            return true;
          } catch {
            return 'Please enter a valid URL';
          }
        },
      },
    ]);
    return apiUrl;
  }

  static async getApiKey(defaultValue?: string): Promise<string> {
    const { apiKey } = await inquirer.prompt([
      {
        type: 'password',
        name: 'apiKey',
        message: sakura('API Key:'),
        mask: '*',
        default: defaultValue,
        validate: (input: string) => {
          if (!input.trim()) {
            return 'API Key is required';
          }
          return true;
        },
      },
    ]);
    return apiKey;
  }

  static async selectModel(models: Model[], currentModel?: string): Promise<string> {
    if (models.length === 0) {
      const { modelName } = await inquirer.prompt([
        {
          type: 'input',
          name: 'modelName',
          message: sakura('Model name:'),
          default: currentModel || 'gpt-4',
          validate: (input: string) => {
            if (!input.trim()) {
              return 'Model name is required';
            }
            return true;
          },
        },
      ]);
      return modelName;
    }

    const choices = models.map((model, index) => ({
      name: model.name || model.id,
      value: model.id,
      short: model.id,
    }));

    const { model } = await inquirer.prompt([
      {
        type: 'list',
        name: 'model',
        message: sakura('Select a model:'),
        choices,
        default: currentModel,
        pageSize: 15,
      },
    ]);

    return model;
  }

  static async confirmExecution(isDestructive: boolean = false): Promise<boolean> {
    const message = isDestructive
      ? chalk.red('⚠️  Execute this DESTRUCTIVE command?')
      : sakura('Run this command?');

    const { confirm } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message,
        default: !isDestructive,
      },
    ]);

    return confirm;
  }

  static async getCommandAction(): Promise<'execute' | 'edit' | 'cancel' | 'feedback'> {
    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: sakura('What would you like to do?'),
        choices: [
          { name: '✓ Execute the command', value: 'execute' },
          { name: '✏️  Edit the command', value: 'edit' },
          { name: '💬 Provide feedback and regenerate', value: 'feedback' },
          { name: '✗ Cancel', value: 'cancel' },
        ],
      },
    ]);

    return action;
  }

  static async editCommand(currentCommand: string): Promise<string> {
    const { command } = await inquirer.prompt([
      {
        type: 'input',
        name: 'command',
        message: sakura('Edit command:'),
        default: currentCommand,
      },
    ]);

    return command;
  }

  static async getFeedback(): Promise<string> {
    const { feedback } = await inquirer.prompt([
      {
        type: 'input',
        name: 'feedback',
        message: sakura('What would you like to change?'),
        validate: (input: string) => {
          if (!input.trim()) {
            return 'Please provide some feedback';
          }
          return true;
        },
      },
    ]);

    return feedback;
  }

  static async getNextRequest(): Promise<string | null> {
    const { request } = await inquirer.prompt([
      {
        type: 'input',
        name: 'request',
        message: sakura('What would you like to do next?'),
      },
    ]);

    return request.trim() || null;
  }

  static async confirmSetupComplete(): Promise<boolean> {
    const { confirm } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: sakura('Configuration looks good?'),
        default: true,
      },
    ]);

    return confirm;
  }
}
