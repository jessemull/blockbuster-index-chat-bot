import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { ChatRequest, ChatResponse } from "./types";
import { MAX_MESSAGE_LENGTH } from "./constants";
import { getCorsHeaders } from "./utils/cors";
import { getTapeyResponse } from "./services/claude";
import { buildConversationHistory, sanitizeHistory } from "./services/history";

export const handler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  const origin = event.headers.Origin || event.headers.origin;
  const referer = event.headers.Referer || event.headers.referer;

  let requestOrigin = origin;
  if (!requestOrigin && referer) {
    const match = referer.match(/^(https?:\/\/[^/]+)/);
    if (match) {
      requestOrigin = match[1];
    } else {
      requestOrigin = referer;
    }
  }

  console.log("Request received", {
    requestId: event.requestContext.requestId,
    method: event.httpMethod,
    path: event.path,
    origin: requestOrigin,
  });

  const corsHeaders = getCorsHeaders(requestOrigin);

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: "",
    };
  }

  try {
    const requestId = event.requestContext.requestId;
    const timestamp = new Date().toISOString();

    if (event.httpMethod === "GET") {
      const response: ChatResponse = {
        message:
          "Blockbuster Index Chat Bot is running! Send a POST request with a message to start chatting.",
        history: [],
        timestamp,
        requestId,
      };

      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify(response),
      };
    }

    if (event.httpMethod === "POST") {
      let chatRequest: ChatRequest;

      try {
        chatRequest = event.body ? JSON.parse(event.body) : { message: "" };
      } catch {
        return {
          statusCode: 400,
          headers: corsHeaders,
          body: JSON.stringify({
            error: "Invalid JSON in request body",
            timestamp,
            requestId,
          }),
        };
      }

      if (!chatRequest.message || chatRequest.message.trim() === "") {
        return {
          statusCode: 400,
          headers: corsHeaders,
          body: JSON.stringify({
            error: "Message is required",
            timestamp,
            requestId,
          }),
        };
      }

      if (chatRequest.message.length > MAX_MESSAGE_LENGTH) {
        return {
          statusCode: 400,
          headers: corsHeaders,
          body: JSON.stringify({
            error: `Message exceeds maximum length of ${MAX_MESSAGE_LENGTH} characters`,
            timestamp,
            requestId,
          }),
        };
      }

      const { history, error: historyError } = sanitizeHistory(
        chatRequest.history || [],
      );

      if (historyError) {
        return {
          statusCode: 400,
          headers: corsHeaders,
          body: JSON.stringify({
            error: historyError,
            timestamp,
            requestId,
          }),
        };
      }

      const tapeyResponse = await getTapeyResponse(
        chatRequest.message,
        history,
      );

      if (tapeyResponse.error) {
        return {
          statusCode: 502,
          headers: corsHeaders,
          body: JSON.stringify({
            error: tapeyResponse.message,
            timestamp,
            requestId,
          }),
        };
      }

      const updatedHistory = buildConversationHistory(
        history,
        chatRequest.message,
        tapeyResponse.message,
      );

      const response: ChatResponse = {
        message: tapeyResponse.message,
        history: updatedHistory,
        timestamp,
        requestId,
      };

      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify(response),
      };
    }

    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({
        error: "Method not allowed",
        timestamp,
        requestId,
      }),
    };
  } catch (error) {
    console.error("Error processing request", {
      name: error instanceof Error ? error.name : undefined,
      message: error instanceof Error ? error.message : "Unknown error",
      requestId: event.requestContext.requestId,
    });

    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        error: "Internal server error",
        timestamp: new Date().toISOString(),
        requestId: event.requestContext.requestId,
      }),
    };
  }
};
