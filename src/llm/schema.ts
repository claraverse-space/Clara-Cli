export const COMMAND_PLAN_SCHEMA = {
  type: "object",
  properties: {
    command: {
      type: "string",
      description: "The shell command to execute"
    },
    explanation: {
      type: "string",
      description: "What this command does"
    },
    reasoning: {
      type: "string",
      description: "Why this approach was chosen"
    },
    risks: {
      type: "array",
      items: {
        type: "string"
      },
      description: "Potential issues or risks"
    },
    isDestructive: {
      type: "boolean",
      description: "Whether this command modifies or deletes files/data"
    },
    estimatedTime: {
      type: "string",
      enum: ["instant", "seconds", "minutes"],
      description: "Estimated execution time"
    },
    requiresConfirmation: {
      type: "boolean",
      description: "Whether user confirmation is required"
    }
  },
  required: ["command", "explanation", "reasoning", "risks", "isDestructive", "estimatedTime", "requiresConfirmation"],
  additionalProperties: false
};
