# 🌸 Clara CLI - Your AI Terminal Assistant

<div align="center">

```
             _______  ___      _______  ______    _______    _______  ___      ___  
            |       ||   |    |   _   ||    _ |  |   _   |  |       ||   |    |   | 
            |       ||   |    |  |_|  ||   | ||  |  |_|  |  |       ||   |    |   | 
            |       ||   |    |       ||   |_||_ |       |  |       ||   |    |   | 
            |      _||   |___ |       ||    __  ||       |  |      _||   |___ |   | 
            |     |_ |       ||   _   ||   |  | ||   _   |  |     |_ |       ||   | 
            |_______||_______||__| |__||___|  |_||__| |__|  |_______||_______||___| 
```

**A terminal-based AI agent that executes commands through natural language**

[![npm version](https://badge.fury.io/js/clara-cli.svg)](https://www.npmjs.com/package/clara-cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-pink.svg)](https://opensource.org/licenses/MIT)

</div>

---

## ✨ What is Clara CLI?

Clara is your intelligent terminal companion that understands natural language and helps you execute shell commands safely and efficiently. No more memorizing complex command syntax or searching through man pages!

### 🎯 Key Features

- 🤖 **Natural Language Commands** - Just describe what you want to do
- 🔒 **Safety First** - Preview commands before execution with built-in validation
- 🌐 **Universal API Support** - Works with any OpenAI-compatible API (OpenAI, Anthropic, local models)
- 🎨 **Beautiful Interface** - Gorgeous sakura-themed UI with ASCII art
- 🔄 **Auto Model Detection** - Automatically fetches and lists available models from your API
- 🛡️ **Smart Validation** - Detects and warns about destructive operations
- 🐚 **Shell Agnostic** - Supports bash, zsh, and PowerShell

---

## 🚀 Quick Start

### Installation

```bash
npm install -g clara-cli
```

### First Run

```bash
clara "list files"
```

On first run, Clara will guide you through setup:
1. Enter your API URL (e.g., `https://api.openai.com/v1`)
2. Enter your API key
3. Select your preferred model from the auto-detected list

That's it! 🎉

---

## 💡 Usage Examples

### File Operations
```bash
clara "find all Python files modified in the last 24 hours"
clara "create a gitignore for a Node.js project"
clara "count lines of code in the src directory"
```

### Git Operations
```bash
clara "show me commits from last week"
clara "create a new branch called feature/auth"
clara "undo last commit but keep changes"
```

### System Operations
```bash
clara "check disk space"
clara "find process using port 3000"
clara "show my IP address"
```

### Complex Tasks
```bash
clara "backup all .env files to a zip"
clara "replace 'oldname' with 'newname' in all Python files"
clara "set up a Python virtual environment"
```

---

## 🎨 Command Flow

When you make a request, Clara:

1. **🤖 Analyzes** your request and generates an appropriate command
2. **📋 Presents** a detailed plan including:
   - The command to execute
   - Explanation of what it does
   - Reasoning behind the approach
   - Potential risks and safety warnings
   - Estimated execution time
3. **🔍 Validates** the command for safety
4. **⚡ Executes** with your confirmation
5. **📊 Shows** results in a clean, formatted output

### Example Output

```
   🤖 Clara's Plan:

   Search for Python files modified in the last 24 hours

   🔧 Command to execute:
   $ find . -name "*.py" -type f -mtime -1

   💭 Reasoning:
   Using find with -mtime -1 to locate files modified within last day

   ✓ Read-only operation (safe)

   ⚡ Estimated time: seconds

   What would you like to do?
   ❯ ✓ Execute the command
     ✏️  Edit the command
     💬 Provide feedback and regenerate
     ✗ Cancel
```

---

## 🎛️ Commands

### Basic Usage
```bash
clara "your request in natural language"
```

### Model Management
```bash
# List available models and select one
clara model

# Quick switch to a specific model
clara model gpt-4-turbo
```

### Configuration
```bash
# Show current configuration
clara config

# Re-run setup wizard
clara setup
```

---

## ⚙️ Configuration

Configuration is stored in `~/.clara/config.json`:

```json
{
  "apiUrl": "https://api.openai.com/v1",
  "apiKey": "sk-...",
  "defaultModel": "gpt-4",
  "shell": "bash",
  "confirmByDefault": true,
  "historyEnabled": true
}
```

You can manually edit this file or use `clara setup` to reconfigure.

---

## 🔒 Safety Features

Clara includes multiple safety layers:

### 🛡️ Destructive Command Detection
- Flags operations that modify or delete files
- Requires explicit confirmation for dangerous operations
- Warns about system-level changes

### ⚠️ Built-in Validations
- Detects potentially harmful patterns (e.g., `rm -rf /`)
- Identifies commands requiring sudo
- Warns about security risks (e.g., piping curl to bash)

### 📝 Command Preview
- Always shows commands before execution
- Allows editing before running
- Option to provide feedback and regenerate

---

## 🌐 API Provider Setup

### OpenAI
```
API URL: https://api.openai.com/v1
API Key: sk-...
```

### Anthropic (Claude)
```
API URL: https://api.anthropic.com/v1
API Key: sk-ant-...
```

### Local Models (Ollama)
```
API URL: http://localhost:11434/v1
API Key: (leave blank or use 'ollama')
```

### LM Studio
```
API URL: http://localhost:1234/v1
API Key: (leave blank)
```

Clara works with any OpenAI-compatible API endpoint!

---

## 🛠️ Development

### Setup
```bash
git clone https://github.com/yourusername/clara-cli.git
cd clara-cli
npm install
```

### Build
```bash
npm run build
```

### Development Mode
```bash
npm run dev
```

### Testing Locally
```bash
npm link
clara "test command"
```

---

## 📋 Requirements

- Node.js 18 or higher
- An API key for your chosen LLM provider
- bash, zsh, or PowerShell

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details

---

## 🙏 Acknowledgments

- Built with ❤️ and 🌸 by Clara
- Inspired by the need for a more human way to interact with terminals
- Thanks to all the amazing LLM providers making this possible

---

## 📞 Support & Feedback

- 🐛 **Issues**: [GitHub Issues](https://github.com/yourusername/clara-cli/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/yourusername/clara-cli/discussions)
- 📧 **Email**: claraverse.space@gmail.com

---

<div align="center">

**Made with 🌸 by Clara**

*Let's make terminals more human!*

</div>
