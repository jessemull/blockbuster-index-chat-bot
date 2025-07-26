import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

interface ChatRequest {
  message: string;
  userId?: string;
}

interface ChatResponse {
  message: string;
  timestamp: string;
  requestId: string;
}

export const handler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  // Log the incoming request for debugging...

  console.log("Received event:", JSON.stringify(event, null, 2));

  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Content-Type": "application/json",
  };

  // Handle OPTIONS request for CORS preflight...

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

    // Handle GET request (health check)...

    if (event.httpMethod === "GET") {
      const response: ChatResponse = {
        message:
          "Blockbuster Index Chat Bot is running! Send a POST request with a message to start chatting.",
        timestamp,
        requestId,
      };

      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify(response),
      };
    }

    // Handle POST request (chat)...

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

      // TODO: Implement chat bot here...

      const botResponse = `Hello! You said: "${chatRequest.message}". This is the Blockbuster Index Chat Bot. I'm here to help you explore data about consumer buying habits and retail behavior shifts across the United States.`;

      const response: ChatResponse = {
        message: botResponse,
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
    console.error("Error processing request:", error);

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
