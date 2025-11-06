#!/usr/bin/env node

import { Command } from 'commander';
import ora from 'ora';
import { ConfigManager, detectShell } from './config';
import { LLMClient } from './llm/client';
import { ShellDetector } from './shell/detector';
import { CommandExecutor } from './shell/executor';
import { CommandValidator } from './shell/validator';
import { InteractivePrompt } from './ui/prompt';
import { OutputFormatter } from './ui/formatter';
import {
  printWelcome,
  printSetupWelcome,
  printSuccess,
  printError,
  printDivider,
  printSection,
  SAKURA_FLOWER,
} from './ui/ascii';
import { Config } from './types';

const program = new Command();
const configManager = ConfigManager.getInstance();

async function setupFirstTime(): Promise<Config> {
  printSetupWelcome();

  // Get API URL
  const apiUrl = await InteractivePrompt.getApiUrl();

  // Get API Key
  const apiKey = await InteractivePrompt.getApiKey();

  // Try to fetch models automatically
  let defaultModel: string | undefined;
  const spinner = ora(OutputFormatter.analyzing()).start();

  try {
    // Create temporary client to fetch models
    const tempClient = new LLMClient(apiUrl, apiKey, 'gpt-4'); // temporary model
    const models = await tempClient.listModels();

    spinner.stop();

    if (models.length > 0) {
      printSuccess('Found ' + models.length + ' available models!');
      console.log(OutputFormatter.formatModelList(models));

      defaultModel = await InteractivePrompt.selectModel(models);
    } else {
      printError('Could not fetch models from API endpoint');
      defaultModel = await InteractivePrompt.selectModel([], 'gpt-4');
    }
  } catch (error: any) {
    spinner.stop();
    printError('Could not fetch models: ' + error.message);
    defaultModel = await InteractivePrompt.selectModel([], 'gpt-4');
  }

  // Detect shell
  const shell = detectShell();

  const config: Config = {
    apiUrl,
    apiKey,
    defaultModel,
    shell,
    confirmByDefault: true,
    historyEnabled: true,
  };

  // Show config summary
  console.log('\n');
  printSection('Configuration Summary:');
  console.log('   API URL: ' + config.apiUrl);
  console.log('   Model: ' + config.defaultModel);
  console.log('   Shell: ' + config.shell);
  console.log('\n');

  const confirmed = await InteractivePrompt.confirmSetupComplete();

  if (!confirmed) {
    printError('Setup cancelled');
    process.exit(0);
  }

  await configManager.save(config);
  printSuccess('Setup complete! Configuration saved to ' + configManager.getConfigPath());

  return config;
}

async function handleCommandRequest(request: string, config: Config) {
  const shellInfo = ShellDetector.getShellInfo();

  // Create LLM client
  const llmClient = new LLMClient(config.apiUrl, config.apiKey, config.defaultModel || 'gpt-4');

  // Generate command plan
  const spinner = ora(OutputFormatter.generating()).start();

  try {
    const plan = await llmClient.generateCommandPlan(
      request,
      shellInfo.type,
      shellInfo.cwd,
      shellInfo.platform
    );

    spinner.stop();

    // Display plan
    console.log(OutputFormatter.formatCommandPlan(plan));

    // Validate command
    const validation = CommandValidator.validate(plan.command);

    // Get user action
    let shouldExecute = false;
    let commandToExecute = plan.command;

    if (validation.requiresExplicitConfirm || plan.isDestructive) {
      shouldExecute = await InteractivePrompt.confirmExecution(true);
    } else if (plan.requiresConfirmation || config.confirmByDefault) {
      const action = await InteractivePrompt.getCommandAction();

      switch (action) {
        case 'execute':
          shouldExecute = true;
          break;
        case 'edit':
          commandToExecute = await InteractivePrompt.editCommand(plan.command);
          shouldExecute = await InteractivePrompt.confirmExecution(plan.isDestructive);
          break;
        case 'feedback':
          const feedback = await InteractivePrompt.getFeedback();
          // Regenerate with feedback
          await handleCommandRequest(`${request}\n\nFeedback: ${feedback}`, config);
          return;
        case 'cancel':
          printError('Cancelled');
          return;
      }
    } else {
      shouldExecute = true;
    }

    if (!shouldExecute) {
      printError('Execution cancelled');
      return;
    }

    // Execute command
    const execSpinner = ora('Executing...').start();

    const result = await CommandExecutor.execute(commandToExecute);

    execSpinner.stop();

    // Display result
    console.log(OutputFormatter.formatExecutionResult(result));
  } catch (error: any) {
    spinner.stop();
    printError('Error: ' + error.message);
  }
}

async function handleModelCommand(modelName?: string) {
  const config = await configManager.load();

  if (!config) {
    printError('Configuration not found. Please run setup first.');
    return;
  }

  const llmClient = new LLMClient(config.apiUrl, config.apiKey, config.defaultModel || 'gpt-4');

  if (modelName) {
    // Quick switch to specified model
    await configManager.update({ defaultModel: modelName });
    printSuccess('Switched to ' + modelName);
    return;
  }

  // List and select model
  const spinner = ora('Fetching models...').start();

  try {
    const models = await llmClient.listModels();
    spinner.stop();

    if (models.length === 0) {
      printError('No models available from API endpoint');
      const newModel = await InteractivePrompt.selectModel([], config.defaultModel);
      await configManager.update({ defaultModel: newModel });
      printSuccess('Switched to ' + newModel);
      return;
    }

    console.log(OutputFormatter.formatModelList(models, config.defaultModel));

    const selectedModel = await InteractivePrompt.selectModel(models, config.defaultModel);
    await configManager.update({ defaultModel: selectedModel });
    printSuccess('Switched to ' + selectedModel);
  } catch (error: any) {
    spinner.stop();
    printError('Error fetching models: ' + error.message);
  }
}

async function main() {
  program
    .name('clara')
    .description('Clara CLI - Your AI Terminal Assistant ' + SAKURA_FLOWER)
    .version('1.0.0');

  // Main command - natural language request
  program
    .argument('[request...]', 'Natural language command request')
    .action(async (requestParts: string[]) => {
      if (requestParts.length === 0) {
        printWelcome();
        program.help();
        return;
      }

      const request = requestParts.join(' ');

      // Check if config exists
      let config = await configManager.load();

      if (!config) {
        config = await setupFirstTime();
      }

      await handleCommandRequest(request, config);

      // Ask for next request
      console.log(OutputFormatter.needAnythingElse());
    });

  // Model management command
  program
    .command('model [name]')
    .description('List or switch models')
    .action(async (name?: string) => {
      await handleModelCommand(name);
    });

  // Setup command
  program
    .command('setup')
    .description('Run setup wizard')
    .action(async () => {
      await setupFirstTime();
    });

  // Config command
  program
    .command('config')
    .description('Show current configuration')
    .action(async () => {
      const config = await configManager.load();

      if (!config) {
        printError('Configuration not found. Run: clara setup');
        return;
      }

      printSection('Current Configuration:');
      console.log('   API URL: ' + config.apiUrl);
      console.log('   Model: ' + config.defaultModel);
      console.log('   Shell: ' + config.shell);
      console.log('   Confirm by default: ' + config.confirmByDefault);
      console.log('   Config file: ' + configManager.getConfigPath());
      console.log('\n');
    });

  await program.parseAsync(process.argv);
}

// Handle errors gracefully
process.on('uncaughtException', (error) => {
  printError('Unexpected error: ' + error.message);
  process.exit(1);
});

process.on('unhandledRejection', (error: any) => {
  printError('Unexpected error: ' + error?.message || error);
  process.exit(1);
});

// Handle Ctrl+C gracefully
process.on('SIGINT', () => {
  console.log('\n');
  printSuccess('Goodbye! ' + SAKURA_FLOWER);
  process.exit(0);
});

main().catch((error) => {
  printError('Error: ' + error.message);
  process.exit(1);
});
