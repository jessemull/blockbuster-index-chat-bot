import { APIGatewayProxyEvent } from "aws-lambda";
import { handler } from "./handler";

jest.mock("@anthropic-ai/sdk", () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    messages: {
      create: jest.fn().mockResolvedValue({
        content: [
          {
            type: "text",
            text: "Hey there, dude! That's totally awesome! The Blockbuster Index is this rad project that tracks consumer spending patterns and retail behavior across the United States. It's like having a crystal ball for understanding how people are shopping and how stores are doing! Pretty cool, right?",
          },
        ],
      }),
    },
  })),
}));

const getMockEvent = (
  httpMethod = "GET",
  body?: string,
): APIGatewayProxyEvent => ({
  httpMethod,
  path: "/",
  headers: {},
  multiValueHeaders: {},
  queryStringParameters: null,
  multiValueQueryStringParameters: null,
  pathParameters: null,
  stageVariables: null,
  requestContext: {
    accountId: "123456789012",
    apiId: "api-id",
    authorizer: {},
    httpMethod,
    identity: {
      accessKey: null,
      accountId: null,
      apiKey: null,
      apiKeyId: null,
      caller: null,
      clientCert: null,
      cognitoAuthenticationProvider: null,
      cognitoAuthenticationType: null,
      cognitoIdentityId: null,
      cognitoIdentityPoolId: null,
      principalOrgId: null,
      sourceIp: "127.0.0.1",
      user: null,
      userAgent: null,
      userArn: null,
    },
    path: "/",
    protocol: "HTTP/1.1",
    requestId: "test-request-id",
    requestTime: "12/Mar/2020:19:03:58 +0000",
    requestTimeEpoch: 1583348638390,
    resourceId: "resource-id",
    resourcePath: "/",
    stage: "dev",
  },
  resource: "/",
  body: body || null,
  isBase64Encoded: false,
});

describe("Blockbuster Index Chat Bot Handler", () => {
  let originalConsoleError: typeof console.error;
  let originalConsoleLog: typeof console.log;

  beforeEach(() => {
    jest.clearAllMocks();
    originalConsoleError = console.error;
    originalConsoleLog = console.log;
    console.error = jest.fn();
    console.log = jest.fn();
  });

  afterEach(() => {
    console.error = originalConsoleError;
    console.log = originalConsoleLog;
  });

  it("should handle OPTIONS request for CORS preflight", async () => {
    const event = getMockEvent("OPTIONS");
    const result = await handler(event);

    expect(result.statusCode).toBe(200);
    expect(result.headers).toEqual({
      "Access-Control-Allow-Origin": "https://www.blockbusterindex.com",
      "Access-Control-Allow-Headers":
        "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Content-Type": "application/json",
    });
    expect(result.body).toBe("");
  });

  it("should return a 200 response with health check message for GET request", async () => {
    const event = getMockEvent("GET");
    const result = await handler(event);

    expect(result.statusCode).toBe(200);
    expect(result.headers).toEqual({
      "Access-Control-Allow-Origin": "https://www.blockbusterindex.com",
      "Access-Control-Allow-Headers":
        "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Content-Type": "application/json",
    });

    const responseBody = JSON.parse(result.body!);
    expect(responseBody.message).toContain(
      "Blockbuster Index Chat Bot is running!",
    );
    expect(responseBody.timestamp).toBeDefined();
    expect(responseBody.requestId).toBe("test-request-id");
  });

  it("should handle POST request with valid message", async () => {
    const event = getMockEvent(
      "POST",
      JSON.stringify({ message: "Hello bot!" }),
    );
    const result = await handler(event);

    expect(result.statusCode).toBe(200);
    expect(result.headers).toEqual({
      "Access-Control-Allow-Origin": "https://www.blockbusterindex.com",
      "Access-Control-Allow-Headers":
        "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Content-Type": "application/json",
    });

    const responseBody = JSON.parse(result.body!);
    expect(responseBody.message).toContain("Hey there, dude!");
    expect(responseBody.message).toContain("Blockbuster Index");
    expect(responseBody.timestamp).toBeDefined();
    expect(responseBody.requestId).toBe("test-request-id");
  });

  it("should return 400 for POST request with empty message", async () => {
    const event = getMockEvent("POST", JSON.stringify({ message: "" }));
    const result = await handler(event);

    expect(result.statusCode).toBe(400);
    const responseBody = JSON.parse(result.body!);
    expect(responseBody.error).toBe("Message is required");
  });

  it("should return 400 for POST request with invalid JSON", async () => {
    const event = getMockEvent("POST", "invalid json");
    const result = await handler(event);

    expect(result.statusCode).toBe(400);
    const responseBody = JSON.parse(result.body!);
    expect(responseBody.error).toBe("Invalid JSON in request body");
  });

  it("should return 405 for unsupported HTTP method", async () => {
    const event = getMockEvent("PUT");
    const result = await handler(event);

    expect(result.statusCode).toBe(405);
    const responseBody = JSON.parse(result.body!);
    expect(responseBody.error).toBe("Method not allowed");
  });
});
