# 🌐 API Provider Configuration Guide

Clara CLI works with any OpenAI-compatible API endpoint. This guide will help you set up Clara with popular LLM providers.

---

## 🤖 OpenAI

### Setup

1. Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Run `clara setup` or provide when prompted:

```
API URL: https://api.openai.com/v1
API Key: sk-proj-...
```

### Available Models
- `gpt-4-turbo`
- `gpt-4`
- `gpt-3.5-turbo`
- `gpt-4-turbo-preview`

Clara will automatically detect and list all available models from your account.

### Notes
- Requires active OpenAI account with credits
- Rate limits apply based on your tier
- Best for: Production use, high-quality responses

---

## 🧠 Anthropic (Claude)

### Setup

1. Get your API key from [Anthropic Console](https://console.anthropic.com/)
2. Configure Clara:

```
API URL: https://api.anthropic.com/v1
API Key: sk-ant-...
```

### Available Models
- `claude-3-opus-20240229`
- `claude-3-sonnet-20240229`
- `claude-3-haiku-20240307`
- `claude-sonnet-4.5`

### Notes
- Excellent for complex reasoning and code generation
- Longer context windows available
- Best for: Code analysis, detailed explanations

---

## 🏠 Ollama (Local Models)

### Setup

1. Install Ollama from [ollama.ai](https://ollama.ai/)
2. Pull a model:
   ```bash
   ollama pull llama2
   ollama pull codellama
   ollama pull mistral
   ```
3. Start Ollama (usually runs automatically)
4. Configure Clara:

```
API URL: http://localhost:11434/v1
API Key: ollama
```

### Popular Models
- `llama2` - General purpose
- `codellama` - Code generation
- `mistral` - Fast and efficient
- `phi` - Small but capable
- `deepseek-coder` - Code-focused

### Notes
- Completely free and private
- Runs on your machine (no internet required)
- Performance depends on your hardware
- Best for: Privacy, offline use, experimentation

---

## 🎮 LM Studio

### Setup

1. Download [LM Studio](https://lmstudio.ai/)
2. Load a model in LM Studio
3. Start the local server (Server tab → Start Server)
4. Configure Clara:

```
API URL: http://localhost:1234/v1
API Key: (leave blank or type 'lm-studio')
```

### Notes
- User-friendly GUI for model management
- Great model discovery and downloads
- Easy to switch between models
- Best for: Beginners to local LLMs, testing different models

---

## 🔓 OpenRouter

### Setup

1. Get API key from [OpenRouter](https://openrouter.ai/)
2. Configure Clara:

```
API URL: https://openrouter.ai/api/v1
API Key: sk-or-...
```

### Available Models
Access to multiple providers through one API:
- OpenAI models
- Anthropic models
- Google models
- Meta models
- And many more!

### Notes
- Pay-as-you-go pricing
- Access to latest models
- No separate accounts needed
- Best for: Model variety, trying different LLMs

---

## 🌟 Together AI

### Setup

1. Sign up at [Together AI](https://together.ai/)
2. Get your API key
3. Configure Clara:

```
API URL: https://api.together.xyz/v1
API Key: ...
```

### Features
- Fast inference
- Multiple open-source models
- Competitive pricing
- Best for: Open-source model enthusiasts

---

## 🧪 Azure OpenAI

### Setup

1. Deploy OpenAI models in Azure
2. Get your endpoint and key from Azure Portal
3. Configure Clara:

```
API URL: https://<your-resource>.openai.azure.com/openai/deployments/<deployment-name>
API Key: <azure-api-key>
```

### Notes
- Enterprise-grade security
- Azure integration
- Compliance certifications
- Best for: Enterprise environments

---

## 🔧 Custom API Endpoints

Clara works with any OpenAI-compatible API! If you're running your own LLM server:

### Requirements
Your endpoint must support:
- `POST /chat/completions` endpoint
- OpenAI-compatible request/response format
- (Optional) `GET /models` endpoint for model listing

### Setup
```
API URL: https://your-custom-endpoint.com/v1
API Key: your-api-key
```

### Testing Your Endpoint

Test if your endpoint is compatible:

```bash
curl https://your-endpoint.com/v1/models \
  -H "Authorization: Bearer your-api-key"
```

Should return a list of models in OpenAI format.

---

## 📊 Comparison Table

| Provider | Cost | Privacy | Speed | Model Variety | Ease of Setup |
|----------|------|---------|-------|---------------|---------------|
| OpenAI | 💰💰💰 | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Anthropic | 💰💰💰 | ⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| Ollama | Free | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| LM Studio | Free | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| OpenRouter | 💰💰 | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |

---

## 🆘 Troubleshooting

### "Failed to connect to API"
- Check your internet connection
- Verify API URL is correct (include `/v1` at the end)
- Ensure API key is valid

### "Model not found"
- Run `clara model` to see available models
- Model might not be available in your account/tier
- Try a different model name

### "Rate limit exceeded"
- You've hit your API rate limit
- Wait a few moments and try again
- Consider upgrading your API tier

### "Invalid API key"
- Double-check your API key
- Key might have expired
- Run `clara setup` to reconfigure

---

## 💡 Tips

1. **Start Local**: Try Ollama or LM Studio first to test Clara without costs
2. **Model Selection**: Bigger models aren't always better - start with smaller, faster models
3. **API Keys**: Keep your API keys secure, never commit them to git
4. **Rate Limits**: Be aware of rate limits on paid APIs
5. **Context**: Some models have better command generation capabilities

---

## 🔄 Switching Providers

You can easily switch between providers:

```bash
# Switch provider
clara setup

# Quick model switch (same provider)
clara model
```

---

## 🤝 Need Help?

- Check [Clara CLI GitHub](https://github.com/yourusername/clara-cli)
- Open an issue for provider-specific problems
- Join our discussions for tips and tricks

---

Made with 🌸 by Clara
