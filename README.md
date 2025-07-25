# Blockbuster Index Chat Bot

The **Blockbuster Index Chat Bot** is an AI-powered chatbot that provides information and insights about the Blockbuster Index Project. This Lambda function serves as the backend for a conversational interface that helps users explore data about consumer buying habits and retail behavior shifts across the United States.

## Overview

The **Blockbuster Index** is an AI-powered exploration of how consumer buying habits have shifted from traditional brick-and-mortar stores to digital purchases across the United States. Inspired by the nostalgic decline of physical video rental stores like Blockbuster, this project creates a unique index that scores each state based on various signals reflecting the balance of online versus in-person purchases.

This chat bot provides an interactive way for users to query and explore this data through natural language conversations.

## Features

- **Conversational Interface**: Natural language processing to understand user queries
- **Data Insights**: Access to Blockbuster Index data and trends
- **Geographic Analysis**: State-by-state retail behavior comparisons
- **Real-time Responses**: Fast API responses for seamless user experience
- **Scalable Architecture**: Built on AWS Lambda for cost-effective scaling
- **Custom Domain**: Accessible at `https://www.blockbusterindex.com/api/chat`

## Architecture

This project implements an **AWS Lambda** function that serves as a chat bot backend, providing:

- **API Gateway Integration**: RESTful API endpoints for chat interactions
- **Custom Domain**: Clean URL at `https://www.blockbusterindex.com/api/chat`
- **CORS Support**: Configured for cross-origin requests from your Next.js frontend
- **Natural Language Processing**: Understanding and responding to user queries
- **Data Access**: Integration with Blockbuster Index data sources
- **Scalable Computing**: Serverless execution with automatic scaling
- **Cost Optimization**: Pay-per-request pricing model

## Technology Stack

- **AWS Lambda**: Serverless compute for handling chat requests
- **API Gateway**: RESTful API management and routing
- **TypeScript**: Type-safe development with modern JavaScript features
- **Jest**: Comprehensive testing framework
- **Webpack**: Module bundling and optimization
- **CloudFormation**: Infrastructure as Code for AWS resources
- **GitHub Actions**: Automated CI/CD pipeline

## Prerequisites

- Node.js 20.x or higher
- AWS CLI configured with appropriate permissions
- AWS account with access to Lambda, API Gateway, and CloudFormation
- SSL certificate for your custom domain (if using custom domain)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/jessemull/blockbuster-index-chat-bot.git
```

2. Navigate to the project directory:

```bash
cd blockbuster-index-chat-bot
```

3. Install dependencies:

```bash
npm install
```

## Development

### Local Development

1. Run tests:

```bash
npm test
```

2. Run tests in watch mode:

```bash
npm run test:watch
```

3. Lint code:

```bash
npm run lint
```

4. Fix linting issues:

```bash
npm run lint:fix
```

5. Format code:

```bash
npm run format
```

### Building

1. Build the Lambda package:

```bash
npm run build
```

2. Create deployment package:

```bash
npm run package
```

## Deployment

### Manual Deployment

#### Step 1: Deploy Infrastructure (One-time setup)

1. Deploy the IAM role:
```bash
aws cloudformation deploy \
  --template-file cloudformation/blockbuster-index-chat-bot-role.yaml \
  --stack-name blockbuster-index-chat-bot-role-stack-dev \
  --parameter-overrides Environment=dev \
  --capabilities CAPABILITY_NAMED_IAM \
  --region us-east-1
```

2. Deploy the S3 bucket:
```bash
aws cloudformation deploy \
  --template-file cloudformation/blockbuster-index-chat-bot-s3.yaml \
  --stack-name blockbuster-index-chat-bot-s3-stack-dev \
  --parameter-overrides Environment=dev \
  --region us-east-1
```

3. Deploy the API Gateway (requires SSL certificate):
```bash
aws cloudformation deploy \
  --template-file cloudformation/blockbuster-index-chat-bot-api.yaml \
  --stack-name blockbuster-index-chat-bot-api-stack-dev \
  --parameter-overrides \
    Environment=dev \
    DomainName=www.blockbusterindex.com \
    CertificateArn=arn:aws:acm:us-east-1:YOUR-ACCOUNT-ID:certificate/YOUR-CERTIFICATE-ID \
    LambdaFunctionArn=arn:aws:lambda:us-east-1:YOUR-ACCOUNT-ID:function:blockbuster-index-chat-bot-dev \
  --capabilities CAPABILITY_NAMED_IAM \
  --region us-east-1
```

#### Step 2: Deploy Lambda Function (Frequent deployments)

1. Build and package the application:
```bash
npm run build
npm run package
```

2. Deploy the Lambda function:
```bash
aws cloudformation deploy \
  --template-file template.yaml \
  --stack-name blockbuster-index-chat-bot-stack-dev \
  --parameter-overrides \
    Environment=dev \
    S3Key=blockbuster-index-chat-bot/YOUR-ARTIFACT-NAME.zip \
  --capabilities CAPABILITY_NAMED_IAM \
  --region us-east-1
```

### Automated Deployment

The project includes GitHub Actions workflows for automated deployment:

1. Navigate to the GitHub repository
2. Go to Actions tab
3. Select "Deploy" workflow
4. Click "Run workflow"
5. Choose environment (dev/prod)
6. Monitor the deployment process

## Infrastructure

The project uses AWS CloudFormation templates for infrastructure management:

- **Role Template** (`cloudformation/blockbuster-index-chat-bot-role.yaml`): IAM roles and policies
- **S3 Template** (`cloudformation/blockbuster-index-chat-bot-s3.yaml`): S3 bucket for deployment artifacts
- **Lambda Template** (`template.yaml`): Lambda function configuration (used for frequent deployments)
- **API Gateway Template** (`cloudformation/blockbuster-index-chat-bot-api.yaml`): API Gateway with custom domain (one-time setup)

## API Endpoints

The chat bot exposes the following endpoints:

- `GET /api/chat`: Health check endpoint
- `POST /api/chat`: Main chat endpoint for processing user messages
- `OPTIONS /api/chat`: CORS preflight endpoint

### API Usage Examples

#### Health Check

```bash
curl https://www.blockbusterindex.com/api/chat
```

#### Send a Chat Message

```bash
curl -X POST https://www.blockbusterindex.com/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Tell me about the Blockbuster Index"}'
```

## Frontend Integration (Next.js)

### Basic Integration

Here's how to integrate the chat bot with your Next.js frontend:

```typescript
// lib/chatBot.ts
interface ChatMessage {
  message: string;
  userId?: string;
}

interface ChatResponse {
  message: string;
  timestamp: string;
  requestId: string;
}

export async function sendChatMessage(message: string): Promise<ChatResponse> {
  const response = await fetch("https://www.blockbusterindex.com/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error(`Chat API error: ${response.status}`);
  }

  return response.json();
}
```

### React Component Example

```tsx
// components/ChatBot.tsx
"use client";

import { useState } from "react";
import { sendChatMessage } from "@/lib/chatBot";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await sendChatMessage(input);

      const botMessage: Message = {
        id: response.requestId,
        text: response.message,
        isUser: false,
        timestamp: response.timestamp,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Failed to send message:", error);
      // Handle error (show toast, etc.)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Blockbuster Index Chat</h2>

        <div className="space-y-2 mb-4 max-h-96 overflow-y-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`p-2 rounded ${
                message.isUser ? "bg-blue-100 ml-8" : "bg-gray-100 mr-8"
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(message.timestamp).toLocaleTimeString()}
              </p>
            </div>
          ))}
          {isLoading && (
            <div className="text-center text-gray-500">
              <p>Bot is typing...</p>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Ask about the Blockbuster Index..."
            className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
```

### Environment Variables

Add to your Next.js `.env.local`:

```bash
NEXT_PUBLIC_CHAT_API_URL=https://www.blockbusterindex.com/api/chat
```

## Testing

The project includes comprehensive tests:

- **Unit Tests**: Test individual functions and components
- **Integration Tests**: Test API endpoints and Lambda handler
- **Coverage Reports**: Detailed code coverage analysis

Run tests with:

```bash
npm test
```

View coverage report:

```bash
npm run coverage:open
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For questions or issues, please open an issue on the GitHub repository or contact the development team.
