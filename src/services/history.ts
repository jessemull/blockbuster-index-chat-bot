import { ChatMessage } from "../types";
import { MAX_HISTORY_LENGTH, MAX_MESSAGE_LENGTH } from "../constants";

const VALID_ROLES = new Set(["user", "assistant"]);

export function limitHistoryLength(history: ChatMessage[] = []): ChatMessage[] {
  return history.slice(-MAX_HISTORY_LENGTH);
}

export function isValidHistoryMessage(
  message: unknown,
): message is ChatMessage {
  if (!message || typeof message !== "object") {
    return false;
  }

  const candidate = message as ChatMessage;
  return (
    VALID_ROLES.has(candidate.role) &&
    typeof candidate.content === "string" &&
    candidate.content.length > 0 &&
    candidate.content.length <= MAX_MESSAGE_LENGTH
  );
}

export function sanitizeHistory(history: ChatMessage[] = []): {
  history: ChatMessage[];
  error?: string;
} {
  if (!Array.isArray(history)) {
    return { history: [], error: "History must be an array" };
  }

  for (const message of history) {
    if (!isValidHistoryMessage(message)) {
      return {
        history: [],
        error: `Each history message must have a valid role and content up to ${MAX_MESSAGE_LENGTH} characters`,
      };
    }
  }

  return { history: limitHistoryLength(history) };
}

export function buildConversationHistory(
  existingHistory: ChatMessage[] = [],
  userMessage: string,
  assistantMessage: string,
): ChatMessage[] {
  const userMessageObj: ChatMessage = {
    role: "user",
    content: userMessage,
    timestamp: new Date().toISOString(),
  };

  const assistantMessageObj: ChatMessage = {
    role: "assistant",
    content: assistantMessage,
    timestamp: new Date().toISOString(),
  };

  const updatedHistory = [
    ...existingHistory,
    userMessageObj,
    assistantMessageObj,
  ];
  return limitHistoryLength(updatedHistory);
}

export function convertToClaudeFormat(
  history: ChatMessage[] = [],
): Array<{ role: "user" | "assistant"; content: string }> {
  return history.map((msg) => ({
    role: msg.role,
    content: msg.content,
  }));
}
