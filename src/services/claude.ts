import Anthropic from "@anthropic-ai/sdk";
import { CLAUDE_MODEL, MAX_TOKENS, TAPEY_SYSTEM_PROMPT } from "../constants";
import { ClaudeApiResponse, ChatMessage } from "../types";
import { convertToClaudeFormat } from "./history";

// Always pass apiKey so the SDK skips async default-credential discovery
// (avoids Jest teardown races when ANTHROPIC_API_KEY is unset in unit tests).
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "unset",
});

export async function getTapeyResponse(
  userMessage: string,
  history: ChatMessage[] = [],
): Promise<ClaudeApiResponse> {
  try {
    const claudeHistory = convertToClaudeFormat(history);

    const response = await anthropic.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: MAX_TOKENS,
      system: TAPEY_SYSTEM_PROMPT,
      messages: [
        ...claudeHistory,
        {
          role: "user",
          content: userMessage,
        },
      ],
    });

    const firstBlock = response.content[0];
    const botResponse =
      firstBlock?.type === "text"
        ? firstBlock.text
        : "Sorry dude, I'm having trouble processing that right now!";

    return { message: botResponse };
  } catch (error) {
    const status =
      error && typeof error === "object" && "status" in error
        ? (error as { status?: unknown }).status
        : undefined;
    console.error("Error calling Claude API", {
      name: error instanceof Error ? error.name : undefined,
      message: error instanceof Error ? error.message : "Unknown error",
      status,
    });
    return {
      message:
        "Sorry dude, I'm having some technical difficulties right now! Try again in a bit!",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
