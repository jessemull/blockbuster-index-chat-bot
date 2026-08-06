import { ChatMessage } from "../types";
import { MAX_HISTORY_LENGTH, MAX_MESSAGE_LENGTH } from "../constants";

const VALID_ROLES = new Set(["user", "assistant"]);

export function limitHistoryLength(history: ChatMessage[] = []): ChatMessage[] {
  return history.slice(-MAX_HISTORY_LENGTH);
}

/** Drop leading assistant turns so the sequence can start with user. */
export function trimToUserStart(history: ChatMessage[]): ChatMessage[] {
  const trimmed = [...history];
  while (trimmed.length > 0 && trimmed[0].role !== "user") {
    trimmed.shift();
  }
  return trimmed;
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

/** Claude requires user/assistant alternation starting with user. */
function isAlternatingUserFirst(history: ChatMessage[]): boolean {
  for (let i = 0; i < history.length; i++) {
    const expected = i % 2 === 0 ? "user" : "assistant";
    if (history[i].role !== expected) {
      return false;
    }
  }
  return true;
}

/**
 * After length limiting, drop a leading assistant (odd max length) so the
 * sequence can start with user, then require strict alternation ending on
 * assistant (or empty) before the handler appends the next user turn.
 */
function normalizeForClaude(history: ChatMessage[]): {
  history: ChatMessage[];
  error?: string;
} {
  const normalized = trimToUserStart(history);

  if (!isAlternatingUserFirst(normalized)) {
    return {
      history: [],
      error:
        "History must alternate user/assistant roles and start with a user message",
    };
  }

  if (
    normalized.length > 0 &&
    normalized[normalized.length - 1].role !== "assistant"
  ) {
    return {
      history: [],
      error:
        "History must end with an assistant message before a new user turn",
    };
  }

  return { history: normalized };
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

  return normalizeForClaude(limitHistoryLength(history));
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
  // Keep outbound history Claude-safe for the next client round-trip.
  return trimToUserStart(limitHistoryLength(updatedHistory));
}

export function convertToClaudeFormat(
  history: ChatMessage[] = [],
): Array<{ role: "user" | "assistant"; content: string }> {
  return history.map((msg) => ({
    role: msg.role,
    content: msg.content,
  }));
}
