import { ValidationResult } from '../types';

const DESTRUCTIVE_PATTERNS = [
  { pattern: /rm\s+-rf\s+\//, reason: 'Attempting to recursively delete from root directory' },
  { pattern: /rm\s+-rf\s+\*/, reason: 'Attempting to recursively delete all files' },
  { pattern: /dd\s+if=.*of=\/dev\/sd/, reason: 'Attempting to write directly to disk device' },
  { pattern: /mkfs/, reason: 'Attempting to format a filesystem' },
  { pattern: /:()\s*{\s*:\|:&\s*};:/, reason: 'Fork bomb detected' },
  { pattern: /chmod\s+-R\s+777/, reason: 'Setting dangerous permissions recursively' },
  { pattern: />.*\/dev\/sd[a-z]/, reason: 'Attempting to write to disk device' },
  { pattern: /curl.*\|\s*bash/, reason: 'Piping remote content directly to bash (security risk)' },
  { pattern: /wget.*\|\s*sh/, reason: 'Piping remote content directly to shell (security risk)' },
];

const REQUIRES_SUDO_PATTERNS = [
  /sudo/,
  /apt-get/,
  /yum/,
  /dnf/,
  /pacman/,
  /systemctl/,
];

const SAFE_READ_ONLY_COMMANDS = [
  'ls', 'cat', 'grep', 'find', 'head', 'tail', 'less', 'more',
  'pwd', 'echo', 'which', 'whereis', 'file', 'stat', 'df', 'du',
  'ps', 'top', 'htop', 'free', 'uname', 'date', 'cal', 'wc',
  'diff', 'cmp', 'sort', 'uniq', 'cut', 'awk', 'sed -n', 'tr',
  'git status', 'git log', 'git diff', 'git show', 'git branch',
];

export class CommandValidator {
  static validate(command: string): ValidationResult {
    const trimmedCommand = command.trim();

    // Check for destructive patterns
    for (const { pattern, reason } of DESTRUCTIVE_PATTERNS) {
      if (pattern.test(trimmedCommand)) {
        return {
          safe: false,
          reason,
          requiresExplicitConfirm: true,
        };
      }
    }

    // Check for sudo commands
    for (const pattern of REQUIRES_SUDO_PATTERNS) {
      if (pattern.test(trimmedCommand)) {
        return {
          safe: false,
          reason: 'Command requires elevated privileges',
          requiresExplicitConfirm: true,
        };
      }
    }

    // Check if it's a safe read-only command
    const isSafeReadOnly = SAFE_READ_ONLY_COMMANDS.some(
      (safeCmd) => trimmedCommand.startsWith(safeCmd)
    );

    if (isSafeReadOnly) {
      return {
        safe: true,
      };
    }

    // Default: requires confirmation for unknown commands
    return {
      safe: true,
    };
  }

  static isReadOnly(command: string): boolean {
    const trimmedCommand = command.trim();
    return SAFE_READ_ONLY_COMMANDS.some(
      (safeCmd) => trimmedCommand.startsWith(safeCmd)
    );
  }

  static requiresElevatedPrivileges(command: string): boolean {
    return REQUIRES_SUDO_PATTERNS.some((pattern) => pattern.test(command));
  }
}
