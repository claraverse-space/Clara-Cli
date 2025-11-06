import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Config, ShellType } from './types';

const CONFIG_DIR = path.join(os.homedir(), '.clara');
const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json');

export class ConfigManager {
  private static instance: ConfigManager;
  private config: Config | null = null;

  private constructor() {}

  static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  async load(): Promise<Config | null> {
    try {
      if (fs.existsSync(CONFIG_FILE)) {
        const data = fs.readFileSync(CONFIG_FILE, 'utf-8');
        this.config = JSON.parse(data);
        return this.config;
      }
    } catch (error) {
      console.error('Error loading config:', error);
    }
    return null;
  }

  async save(config: Config): Promise<void> {
    try {
      // Create config directory if it doesn't exist
      if (!fs.existsSync(CONFIG_DIR)) {
        fs.mkdirSync(CONFIG_DIR, { recursive: true });
      }

      fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), 'utf-8');
      this.config = config;
    } catch (error) {
      throw new Error(`Failed to save config: ${error}`);
    }
  }

  get(): Config | null {
    return this.config;
  }

  exists(): boolean {
    return fs.existsSync(CONFIG_FILE);
  }

  async update(partial: Partial<Config>): Promise<void> {
    if (!this.config) {
      throw new Error('Config not loaded');
    }

    this.config = { ...this.config, ...partial };
    await this.save(this.config);
  }

  getConfigPath(): string {
    return CONFIG_FILE;
  }
}

export function detectShell(): ShellType {
  const shell = process.env.SHELL || '';

  if (shell.includes('bash')) return 'bash';
  if (shell.includes('zsh')) return 'zsh';
  if (process.platform === 'win32') return 'powershell';
  if (shell.includes('sh')) return 'sh';

  return 'bash'; // default fallback
}
