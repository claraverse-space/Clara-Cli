import chalk from 'chalk';
import { CommandPlan, ExecutionResult } from '../types';
import { SAKURA_FLOWER } from './ascii';

const sakura = chalk.hex('#FFB7C5');
const sakuraDark = chalk.hex('#FF69B4');

export class OutputFormatter {
  static formatCommandPlan(plan: CommandPlan): string {
    let output = '\n';

    // Header
    output += sakura('   🤖 Clara\'s Plan:\n\n');

    // Explanation
    output += chalk.white('   ') + plan.explanation + '\n\n';

    // Command
    output += sakuraDark('   🔧 Command to execute:\n');
    output += chalk.cyan('   $ ') + chalk.white(plan.command) + '\n\n';

    // Reasoning
    if (plan.reasoning) {
      output += sakura('   💭 Reasoning:\n');
      output += chalk.white('   ') + plan.reasoning + '\n\n';
    }

    // Risks & Safety Info
    if (plan.risks.length > 0 || plan.isDestructive) {
      output += chalk.yellow('   ⚠️  Safety Information:\n');

      if (plan.isDestructive) {
        output += chalk.red('   ⚡ This command is DESTRUCTIVE\n');
        output += chalk.white('   It may modify or delete files/data\n');
      }

      if (plan.risks.length > 0) {
        plan.risks.forEach((risk) => {
          output += chalk.yellow('   • ') + chalk.white(risk) + '\n';
        });
      }
      output += '\n';
    } else {
      output += chalk.green('   ✓ Read-only operation (safe)\n\n');
    }

    // Estimated time
    const timeEmoji = plan.estimatedTime === 'instant' ? '⚡' : plan.estimatedTime === 'seconds' ? '⏱️' : '⏳';
    output += chalk.gray(`   ${timeEmoji} Estimated time: ${plan.estimatedTime}\n`);

    return output;
  }

  static formatExecutionResult(result: ExecutionResult): string {
    let output = '\n';

    if (result.success) {
      output += chalk.green('   ✓ Executed successfully!\n\n');

      if (result.output.trim()) {
        output += sakura('   📋 Output:\n');
        output += this.indentOutput(result.output);
      } else {
        output += chalk.gray('   (no output)\n');
      }
    } else {
      output += chalk.red('   ✗ Command failed ') + chalk.gray(`(exit code ${result.exitCode})\n\n`);

      if (result.output.trim()) {
        output += sakura('   📋 Output:\n');
        output += this.indentOutput(result.output);
      }

      if (result.error && result.error.trim()) {
        output += chalk.red('   ❌ Error:\n');
        output += this.indentOutput(result.error);
      }
    }

    return output;
  }

  static formatModelList(models: { id: string; name?: string }[], currentModel?: string): string {
    let output = '\n';
    output += sakura('   Available models:\n\n');

    models.forEach((model, index) => {
      const isCurrent = currentModel && model.id === currentModel;
      const prefix = isCurrent ? sakuraDark('   → ') : '     ';
      const name = model.name || model.id;

      output += prefix + chalk.white(`${index + 1}. ${name}`);
      if (isCurrent) {
        output += sakura(' (current)');
      }
      output += '\n';
    });

    return output;
  }

  static needAnythingElse(): string {
    return '\n' + sakura('   💬 Need anything else? ') + chalk.gray('(or Ctrl+C to exit)\n');
  }

  private static indentOutput(text: string): string {
    return text
      .split('\n')
      .map((line) => chalk.gray('   │ ') + chalk.white(line))
      .join('\n') + '\n';
  }

  static formatError(error: string): string {
    return chalk.red('   ✗ ') + chalk.white(error) + '\n';
  }

  static thinking(): string {
    return sakura('   🤖 Clara thinking...');
  }

  static analyzing(): string {
    return sakura('   🔍 Analyzing your request...');
  }

  static generating(): string {
    return sakuraDark('   ⚡ Generating command...');
  }
}
