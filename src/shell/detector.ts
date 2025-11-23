import { ShellType } from '../types';
import * as shell from 'shelljs';

export class ShellDetector {
  static detect(): ShellType {
    const shellEnv = process.env.SHELL || '';

    // Check SHELL environment variable first (works on Unix and Git Bash on Windows)
    if (shellEnv.includes('bash')) return 'bash';
    if (shellEnv.includes('zsh')) return 'zsh';
    if (shellEnv.includes('sh')) return 'sh';

    // Windows-specific detection
    if (process.platform === 'win32') {
      // Check if running in WSL (Windows Subsystem for Linux)
      if (process.env.WSL_DISTRO_NAME) return 'bash';

      // Check for Git Bash or MSYS
      if (process.env.MSYSTEM) return 'bash';

      // Default to PowerShell on Windows
      return 'powershell';
    }

    return 'bash'; // default fallback for Unix systems
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
