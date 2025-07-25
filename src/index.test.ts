import { APIGatewayProxyEvent } from "aws-lambda";
import { handler } from "./index";

const getMockEvent = (): APIGatewayProxyEvent => ({
  httpMethod: "GET",
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
    httpMethod: "GET",
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
    requestId: "request-id",
    requestTime: "12/Mar/2020:19:03:58 +0000",
    requestTimeEpoch: 1583348638390,
    resourceId: "resource-id",
    resourcePath: "/",
    stage: "dev",
  },
  resource: "/",
  body: null,
  isBase64Encoded: false,
});

describe("Blockbuster Index Chat Bot Handler", () => {
  let originalConsoleError: typeof console.error;

  beforeEach(() => {
    jest.clearAllMocks();
    originalConsoleError = console.error;
    console.error = jest.fn();
  });

  afterEach(() => {
    console.error = originalConsoleError;
  });

  it("should return a 200 response with hello message", async () => {
    const event = getMockEvent();
    const result = await handler(event);

    expect(result.statusCode).toBe(200);
    expect(result.headers).toEqual({
      "Content-Type": "application/json",
    });
    expect(JSON.parse(result.body!)).toEqual({
      message: "Hello from Blockbuster Index Chat Bot!",
    });
  });
});
