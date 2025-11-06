export interface Config {
  apiUrl: string;
  apiKey: string;
  defaultModel?: string;
  shell: ShellType;
  confirmByDefault: boolean;
  historyEnabled: boolean;
}

export type ShellType = 'bash' | 'zsh' | 'powershell' | 'sh';

export interface CommandPlan {
  command: string;
  explanation: string;
  reasoning: string;
  risks: string[];
  isDestructive: boolean;
  estimatedTime: 'instant' | 'seconds' | 'minutes';
  requiresConfirmation: boolean;
}

export interface Model {
  id: string;
  name?: string;
  created?: number;
  owned_by?: string;
}

export interface ValidationResult {
  safe: boolean;
  reason?: string;
  requiresExplicitConfirm?: boolean;
}

export interface ExecutionResult {
  success: boolean;
  output: string;
  error?: string;
  exitCode: number;
}
