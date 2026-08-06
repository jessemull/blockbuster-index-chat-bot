import Anthropic from "@anthropic-ai/sdk";
import { CLAUDE_MODEL, MAX_TOKENS, TAPEY_SYSTEM_PROMPT } from "../constants";
import { ClaudeApiResponse, ChatMessage } from "../types";
import { convertToClaudeFormat } from "./history";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
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
    console.error("Error calling Claude API:", error);
    return {
      message:
        "Sorry dude, I'm having some technical difficulties right now! Try again in a bit!",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
