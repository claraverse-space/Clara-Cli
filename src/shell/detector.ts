import { ShellType } from '../types';
import * as shell from 'shelljs';

export class ShellDetector {
  static detect(): ShellType {
    const shellEnv = process.env.SHELL || '';

    if (shellEnv.includes('bash')) return 'bash';
    if (shellEnv.includes('zsh')) return 'zsh';
    if (process.platform === 'win32') return 'powershell';
    if (shellEnv.includes('sh')) return 'sh';

    return 'bash'; // default fallback
  }

  static getShellPath(): string {
    return process.env.SHELL || '/bin/bash';
  }

  static checkCommandAvailable(command: string): boolean {
    return shell.which(command) !== null;
  }

  static getShellInfo(): {
    type: ShellType;
    path: string;
    platform: string;
    cwd: string;
  } {
    return {
      type: this.detect(),
      path: this.getShellPath(),
      platform: process.platform,
      cwd: process.cwd(),
    };
  }
}
