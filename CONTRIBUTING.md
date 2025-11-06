# 🤝 Contributing to Clara CLI

First off, thank you for considering contributing to Clara CLI! 🌸 It's people like you that make Clara such a great tool.

---

## 🌟 How Can I Contribute?

### 🐛 Reporting Bugs

Found a bug? Help us fix it!

**Before submitting:**
- Check if the issue already exists
- Make sure you're using the latest version
- Collect information about your environment

**Submit a bug report:**
1. Go to [Issues](https://github.com/yourusername/clara-cli/issues)
2. Click "New Issue"
3. Use the bug report template
4. Include:
   - Clara version (`clara --version`)
   - Node.js version (`node --version`)
   - Operating system
   - Shell type
   - Steps to reproduce
   - Expected vs actual behavior
   - Error messages/logs

### 💡 Suggesting Features

Have an idea? We'd love to hear it!

**Before suggesting:**
- Check existing feature requests
- Make sure it aligns with Clara's goals
- Consider if it benefits most users

**Submit a feature request:**
1. Open a new issue with the "Feature Request" label
2. Describe the feature and why it's useful
3. Provide examples of how it would work
4. (Optional) Suggest implementation approaches

### 📝 Improving Documentation

Documentation improvements are always welcome:
- Fix typos or clarify existing docs
- Add examples
- Improve API provider guides
- Translate documentation

### 🔧 Code Contributions

Ready to write some code? Awesome!

---

## 🛠️ Development Setup

### Prerequisites
- Node.js 18 or higher
- npm or yarn
- Git
- An API key for testing (OpenAI, Anthropic, or local Ollama)

### Setup Steps

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/clara-cli.git
   cd clara-cli
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the project**
   ```bash
   npm run build
   ```

4. **Link for local testing**
   ```bash
   npm link
   ```

5. **Test your changes**
   ```bash
   clara "test command"
   ```

6. **Run in development mode**
   ```bash
   npm run dev
   # In another terminal:
   node dist/cli.js "your test command"
   ```

---

## 📂 Project Structure

```
clara-cli/
├── src/
│   ├── cli.ts              # Main CLI entry point
│   ├── config.ts           # Config management
│   ├── types.ts            # TypeScript types
│   ├── llm/
│   │   ├── client.ts       # LLM API client
│   │   ├── prompt.ts       # Prompt templates
│   │   └── schema.ts       # JSON schemas
│   ├── shell/
│   │   ├── detector.ts     # Shell detection
│   │   ├── executor.ts     # Command execution
│   │   └── validator.ts    # Safety validation
│   └── ui/
│       ├── ascii.ts        # ASCII art & branding
│       ├── formatter.ts    # Output formatting
│       └── prompt.ts       # Interactive prompts
├── dist/                   # Compiled output (generated)
├── package.json
├── tsconfig.json
└── README.md
```

---

## 💻 Coding Guidelines

### Style Guide

- **Language**: TypeScript
- **Formatting**: 2 spaces, no tabs
- **Quotes**: Single quotes for strings
- **Semicolons**: Yes, always
- **Line length**: 100 characters max

### Best Practices

1. **Type Safety**
   - Always use TypeScript types
   - Avoid `any` when possible
   - Define interfaces for complex objects

2. **Error Handling**
   - Use try-catch blocks
   - Provide helpful error messages
   - Never let the CLI crash ungracefully

3. **User Experience**
   - Keep sakura color theme consistent
   - Provide clear feedback
   - Make prompts intuitive
   - Consider accessibility

4. **Security**
   - Validate all user input
   - Be careful with command execution
   - Never log API keys
   - Add safety checks for destructive operations

### Code Example

```typescript
// Good ✅
async function listModels(client: LLMClient): Promise<Model[]> {
  try {
    const models = await client.listModels();
    return models.filter(m => m.id.length > 0);
  } catch (error: any) {
    throw new Error(`Failed to list models: ${error.message}`);
  }
}

// Bad ❌
async function listModels(client: any): Promise<any> {
  const models = await client.listModels();
  return models;
}
```

---

## 🧪 Testing

### Manual Testing Checklist

Before submitting a PR, test:

- [ ] First-time setup flow
- [ ] Model listing and selection
- [ ] Command generation and execution
- [ ] Safety warnings for destructive commands
- [ ] Error handling (invalid API key, network errors)
- [ ] Different shell types (if possible)
- [ ] Edge cases (empty input, very long commands)

### Test Commands

```bash
# Setup
clara setup

# Basic command
clara "list files"

# Model management
clara model

# Destructive command (should warn)
clara "delete all txt files"

# Invalid request
clara "askdfjlaksdjf"

# Config
clara config
```

---

## 📋 Pull Request Process

### Before Submitting

1. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make your changes**
   - Write clean, documented code
   - Follow the coding guidelines
   - Test thoroughly

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

   **Commit message format:**
   - `feat:` New feature
   - `fix:` Bug fix
   - `docs:` Documentation changes
   - `style:` Code style changes (formatting)
   - `refactor:` Code refactoring
   - `test:` Adding tests
   - `chore:` Maintenance tasks

4. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

### Submitting the PR

1. Go to the original repository
2. Click "New Pull Request"
3. Select your branch
4. Fill out the PR template:
   - **Description**: What does this PR do?
   - **Motivation**: Why is this change needed?
   - **Testing**: How did you test it?
   - **Screenshots**: (if UI changes)

### PR Review Process

1. Maintainers will review your code
2. Address any feedback
3. Make requested changes
4. Once approved, your PR will be merged! 🎉

---

## 🎨 Design Principles

When contributing, keep these principles in mind:

1. **Simplicity**: Clara should be easy to use
2. **Safety**: Never execute destructive commands without confirmation
3. **Beauty**: Maintain the sakura aesthetic 🌸
4. **Reliability**: Handle errors gracefully
5. **Performance**: Keep responses fast
6. **Universality**: Work with any OpenAI-compatible API

---

## 📚 Resources

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Commander.js](https://github.com/tj/commander.js/)
- [Inquirer.js](https://github.com/SBoudrias/Inquirer.js/)
- [Chalk](https://github.com/chalk/chalk)

---

## 🌸 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all.

### Our Standards

**Positive behavior:**
- Being respectful and inclusive
- Accepting constructive criticism
- Focusing on what's best for the community
- Showing empathy

**Unacceptable behavior:**
- Harassment or discrimination
- Trolling or insulting comments
- Publishing others' private information
- Unprofessional conduct

### Enforcement

Violations may result in temporary or permanent ban from the project.

Report issues to: claraverse.space@gmail.com

---

## ❓ Questions?

- 💬 Open a [Discussion](https://github.com/yourusername/clara-cli/discussions)
- 📧 Email: claraverse.space@gmail.com
- 🐛 File an [Issue](https://github.com/yourusername/clara-cli/issues)

---

## 🎉 Recognition

Contributors will be:
- Listed in our README
- Mentioned in release notes
- Forever appreciated! 🌸

---

Thank you for contributing to Clara CLI! Together, we're making terminals more human. 💖

<div align="center">

**Made with 🌸 by Clara and amazing contributors like you!**

</div>
