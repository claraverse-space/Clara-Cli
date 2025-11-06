import chalk from 'chalk';

// Sakura pink color palette
const sakura = chalk.hex('#FFB7C5'); // Light sakura pink
const sakuraDark = chalk.hex('#FF69B4'); // Hot pink
const sakuraLight = chalk.hex('#FFE4E1'); // Misty rose

export const CLARA_ASCII_ART = sakura(`
   ╭━━━╮╱╱╱╱╱╱╱╱╱╱╭╮
   ┃╭━╮┃╱╱╱╱╱╱╱╱╱╱┃┃
   ┃┃╱╰╋╮╭┳━┳━━┳━╮┃┃
   ┃┃╱╭┫┃┃┃╭┫╭╮┃╭╮┫┃
   ┃╰━╯┃╰╯┃┃┃╭╮┃┃┃┃╰╮
   ╰━━━┻━━┻╯╰╯╰┻╯╰┻━╯
`);

export const CLARA_ASCII_SMALL = sakura(`
   ╔═╗┬  ┌─┐┬─┐┌─┐
   ║  │  ├─┤├┬┘├─┤
   ╚═╝┴─┘┴ ┴┴└─┴ ┴
`);

export const SAKURA_FLOWER = sakura('🌸');

export function printWelcome() {
  console.log(CLARA_ASCII_ART);
  console.log(sakuraLight('   Your AI Terminal Assistant ') + SAKURA_FLOWER + '\n');
}

export function printWelcomeSmall() {
  console.log(CLARA_ASCII_SMALL + ' ' + SAKURA_FLOWER);
}

export function printSetupWelcome() {
  console.log(CLARA_ASCII_ART);
  console.log(sakuraDark('   🔧 First Time Setup!\n'));
  console.log(sakuraLight('   Let\'s get you configured...\n'));
}

export function printDivider() {
  console.log(sakura('   ─'.repeat(40)));
}

export function printSuccess(message: string) {
  console.log(chalk.green('   ✓ ') + sakuraLight(message));
}

export function printError(message: string) {
  console.log(chalk.red('   ✗ ') + chalk.white(message));
}

export function printWarning(message: string) {
  console.log(chalk.yellow('   ⚠️  ') + chalk.white(message));
}

export function printInfo(message: string) {
  console.log(sakura('   ℹ ') + chalk.white(message));
}

export function printCommand(command: string) {
  console.log(chalk.cyan('   $ ') + chalk.white(command));
}

export function printSection(title: string) {
  console.log('\n' + sakuraDark('   ' + title));
}
