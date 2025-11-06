import { exec } from 'child_process';
import { promisify } from 'util';
import { ExecutionResult } from '../types';

const execAsync = promisify(exec);

export class CommandExecutor {
  /**
   * Execute a shell command
   */
  static async execute(command: string, cwd?: string): Promise<ExecutionResult> {
    try {
      const { stdout, stderr } = await execAsync(command, {
        cwd: cwd || process.cwd(),
        shell: process.env.SHELL || '/bin/bash',
        maxBuffer: 1024 * 1024 * 10, // 10MB buffer
      });

      return {
        success: true,
        output: stdout || stderr,
        exitCode: 0,
      };
    } catch (error: any) {
      return {
        success: false,
        output: error.stdout || '',
        error: error.stderr || error.message,
        exitCode: error.code || 1,
      };
    }
  }

  /**
   * Execute a command with streaming output (for long-running commands)
   */
  static executeStream(
    command: string,
    onData: (data: string) => void,
    onError: (error: string) => void,
    cwd?: string
  ): Promise<ExecutionResult> {
    return new Promise((resolve) => {
      const childProcess = exec(
        command,
        {
          cwd: cwd || process.cwd(),
          shell: process.env.SHELL || '/bin/bash',
        }
      );

      let output = '';
      let errorOutput = '';

      if (childProcess.stdout) {
        childProcess.stdout.on('data', (data) => {
          const text = data.toString();
          output += text;
          onData(text);
        });
      }

      if (childProcess.stderr) {
        childProcess.stderr.on('data', (data) => {
          const text = data.toString();
          errorOutput += text;
          onError(text);
        });
      }

      childProcess.on('close', (code) => {
        resolve({
          success: code === 0,
          output,
          error: errorOutput,
          exitCode: code || 0,
        });
      });

      childProcess.on('error', (error) => {
        resolve({
          success: false,
          output,
          error: error.message,
          exitCode: 1,
        });
      });
    });
  }
}
