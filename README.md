# Blockbuster Index Chat Bot

The **Blockbuster Index Chat Bot** is a fun 90s-style AI-powered chat bot that provides information about the **Blockbuster Index** project. Built with AWS Lambda and Claude AI, the bot uses 90s vernacular and includes movie quotes while answering questions about retail data, consumer spending patterns, and the Blockbuster Index project.

The chat bot, affectionately named **Tapey**, serves as an interactive interface for users to learn about the **Blockbuster Index** - an AI-powered exploration of how consumer buying habits have shifted across the United States from traditional brick-and-mortar retail to online commerce. Inspired by the cultural decline of physical video rental stores like Blockbuster, this project builds a unique state-by-state index using signals that reflect the tension between digital and analog purchasing behavior.

This chat bot is part of the **Blockbuster Index Project** which includes the following repositories:

- **[Blockbuster Index Chat Bot](https://github.com/jessemull/blockbuster-index-chat-bot)**: The AI-powered chat bot (this repository).
- **[Blockbuster Index Project Client](https://github.com/jessemull/blockbuster-index)**: The **Blockbuster Index** NextJS client.
- **[Blockbuster Index MCP Server](https://github.com/jessemull/blockbuster-index-mcp-server)**: The **Blockbuster Index** calculation server.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture Overview](#architecture-overview)
3. [AI Model](#ai-model)
4. [Cost Management](#cost-management)
5. [API Endpoints](#api-endpoints)
6. [Environments](#environments)
7. [Tech Stack](#tech-stack)
8. [Setup Instructions](#setup-instructions)
9. [Development Workflow](#development-workflow)
10. [Commits & Commitizen](#commits--commitizen)
    - [Making a Commit](#making-a-commit)
11. [Linting & Formatting](#linting--formatting)
    - [Linting Commands](#linting-commands)
    - [Formatting Commands](#formatting-commands)
    - [Pre-Commit Hook](#pre-commit-hook)
12. [Unit Tests & Code Coverage](#unit-tests--code-coverage)
    - [Unit Tests](#unit-tests)
    - [Code Coverage](#code-coverage)
13. [Error & Performance Monitoring](#error--performance-monitoring)
    - [Configuration](#configuration)
    - [CloudWatch Logging](#cloudwatch-logging)
14. [Environment Variables](#environment-variables)
15. [Build & Deployment](#build--deployment)
    - [Build Process](#build-process)
    - [Lambda Package](#lambda-package)
    - [GitHub Workflows](#github-workflows)
    - [Infrastructure](#infrastructure)
16. [License](#license)

## Project Overview

The **Blockbuster Index Chat Bot** provides an engaging way for users to interact with and learn about the **Blockbuster Index** project. The bot, named **Tapey**, uses a 90s personality with movie quotes and retro language to make data exploration fun and accessible.

### Key Features

- **90s Personality**: Tapey uses 90s vernacular and includes movie quotes in responses.
- **Conversation History**: Maintains context across multiple messages (limited to 5 messages for cost control).
- **CORS Support**: Full CORS support for web integration.
- **Health Check**: Built-in health check endpoint for monitoring.
- **Error Handling**: Comprehensive error handling with structured responses.
- **Request Validation**: API Gateway models ensure proper request/response validation.

### Conversation Flow

1. **User Input**: Users send messages via POST requests to the `/api/chat` endpoint.
2. **Context Building**: The system builds conversation history from previous messages.
3. **AI Processing**: Claude AI processes the request with the 90s personality system prompt.
4. **Response Generation**: Tapey responds with information about the Blockbuster Index, retail data, and consumer spending patterns.
5. **History Management**: Conversation history is updated and returned to the client.

## Architecture Overview

The **Blockbuster Index Chat Bot** employs a **serverless architecture** built on AWS Lambda with API Gateway, providing scalability, cost-effectiveness, and ease of maintenance.

### Serverless Architecture

- **AWS Lambda**: Serverless compute for handling chat requests without managing servers.
- **API Gateway**: RESTful API interface with custom domain support and request validation.
- **CloudFormation**: Infrastructure as Code (IaC) for defining and provisioning AWS resources.
- **S3**: Storage for Lambda deployment packages and versioning.
- **CloudWatch**: Logging and monitoring for performance and error tracking.

### Request Flow

1. **API Gateway**: Receives HTTP requests and validates against defined models.
2. **Lambda Function**: Processes requests with conversation history and context.
3. **Claude AI**: Generates responses using the 90s personality system prompt.
4. **Response**: Returns structured JSON with message, history, and metadata.
5. **CORS**: Handles cross-origin requests for web integration.

### Data Models

The API uses comprehensive data models for request/response validation:

- **ChatMessage**: Individual messages with role, content, and timestamp.
- **ChatRequest**: Incoming requests with message and optional history.
- **ChatResponse**: Bot responses with message, updated history, and metadata.
- **ErrorResponse**: Structured error responses with context.

## AI Model

The chat bot uses **Anthropic's Claude 3 Haiku** model for natural language processing and response generation.

### Model Configuration

- **Model**: `claude-3-haiku-20240307`
- **Max Tokens**: 1000 (configurable for cost control)
- **Temperature**: Default (balanced creativity and consistency)

### Conversation Management

- **History Limit**: Maximum 5 messages to control costs and maintain performance.
- **Context Preservation**: Previous conversation context is maintained across requests.
- **Role-based Messages**: Clear distinction between user and assistant messages.
- **Timestamp Tracking**: All messages include ISO 8601 timestamps for tracking.

## Cost Management

The chat bot implements several strategies to manage costs effectively while maintaining quality service.

### Token Management

- **Max Tokens**: Limited to 1000 tokens per response to control API costs.
- **History Truncation**: Conversation history limited to 5 messages maximum.
- **Efficient Prompting**: Optimized system prompt to reduce token usage.
- **Response Length**: Balanced responses that are informative but concise.

### Infrastructure Optimization

- **Lambda Timeout**: 30-second timeout to prevent runaway costs.
- **Memory Allocation**: 256MB memory allocation optimized for performance.
- **Cold Start Management**: Efficient code structure to minimize cold start impact.
- **Request Validation**: API Gateway models prevent invalid requests from reaching Lambda.

### Monitoring & Alerts

- **Usage Tracking**: CloudWatch metrics for request volume and costs.
- **Error Monitoring**: Structured logging for cost-related issues.
- **Performance Metrics**: Response time and token usage monitoring.
- **Budget Alerts**: CloudWatch alarms for cost thresholds.

## API Endpoints

The chat bot provides a RESTful API with comprehensive endpoint coverage and proper HTTP status codes. For complete API documentation including all endpoints, request/response models, and examples, see the [api.yaml](api.yaml) file.

### Base URL

- **Development**: `https://api-dev.blockbusterindex.com`
- **Production**: `https://api.blockbusterindex.com`

### Key Endpoints

- **GET `/api/chat`**: Health check endpoint.
- **POST `/api/chat`**: Main chat endpoint for sending messages to Tapey.
- **OPTIONS `/api/chat`**: CORS preflight endpoint for web integration.

### Data Models

The API uses comprehensive data models for request/response validation:

- **ChatMessage**: Individual messages with role, content, and timestamp.
- **ChatRequest**: Incoming requests with message and optional history.
- **ChatResponse**: Bot responses with message, updated history, and metadata.
- **ErrorResponse**: Structured error responses with context.

For detailed model specifications and examples, refer to the [api.yaml](api.yaml) file.

## Environments

The **Blockbuster Index Chat Bot** operates in multiple environments to ensure smooth development, testing, and production workflows.

### Environment Configuration

- **Development**: `dev` environment with testing domain and relaxed rate limits.
- **Production**: `prod` environment with production domain and optimized settings.

### Environment-Specific Settings

- **Custom Domains**: Environment-specific API Gateway domains.
- **SSL Certificates**: Separate certificates for each environment.
- **Rate Limiting**: Environment-specific usage plans and throttling.
- **Logging Levels**: Different logging verbosity per environment.

## Tech Stack

The **Blockbuster Index Chat Bot** is built using modern serverless technologies to ensure reliability, scalability, and cost-effectiveness.

- **AWS Lambda**: Serverless compute platform that automatically scales and charges only for actual usage.

- **AWS API Gateway**: Managed API service that handles HTTP requests, authentication, and request validation with custom domain support.

- **AWS CloudFormation**: Infrastructure as Code (IaC) used to define and provision AWS resources like Lambda functions, API Gateway, and IAM roles.

- **AWS S3**: Object storage for Lambda deployment packages with versioning and lifecycle management.

- **AWS CloudWatch**: Provides logging and monitoring capabilities with structured JSON logging and performance metrics.

- **Anthropic Claude AI**: Advanced language model for natural conversation and response generation with 90s personality.

- **TypeScript**: Provides type safety and enhanced developer experience for the Lambda function codebase.

- **Node.js**: Runtime environment for executing the Lambda function.

- **Webpack**: Bundles the TypeScript code for production deployment with optimization and minification.

- **Jest**: JavaScript testing framework used for unit and integration testing, ensuring code reliability and preventing regressions.

- **ESLint & Prettier**: Linting and formatting tools that enforce code consistency, reduce syntax errors, and improve maintainability.

- **Commitizen**: A tool for enforcing a standardized commit message format, improving version control history and making collaboration more structured.

- **Husky & Lint-Staged**: Git hooks that ensure code quality by running linting and formatting before commits.

- **AWS SDK v3**: Modern AWS SDK for JavaScript that provides type-safe access to AWS services.

This tech stack ensures that the **Blockbuster Index Chat Bot** remains performant, secure, and easily maintainable while leveraging serverless infrastructure for scalability and cost-effectiveness.

## Setup Instructions

To clone the repository, install dependencies, and run the project locally follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/jessemull/blockbuster-index-chat-bot.git
   ```

2. Navigate into the project directory:

   ```bash
   cd blockbuster-index-chat-bot
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables. Please see the [Environment Variables](#environment-variables) section.

5. Build the project:

   ```bash
   npm run build
   ```

6. Run tests to ensure everything is working:

   ```bash
   npm test
   ```

## Development Workflow

The **Blockbuster Index Chat Bot** follows a structured development workflow that ensures code quality, testing, and proper deployment practices.

### Development Process

1. **Feature Development**: Create feature branches from main for new functionality.
2. **Local Testing**: Run tests locally using the provided npm scripts.
3. **Code Quality**: Ensure all linting and formatting standards are met.
4. **Unit Testing**: Write and run comprehensive unit tests with 80% coverage.
5. **Pull Request**: Submit PR with proper commitizen-formatted commits.
6. **CI/CD Pipeline**: Automated testing and quality checks via GitHub Actions.
7. **Deployment**: Use GitHub workflows for targeted deployment.

### Local Development

For local development and testing:

1. **Environment Setup**: Configure environment variables for local development.
2. **Build Process**: Use `npm run build` to compile TypeScript.
3. **Testing**: Use `npm test` for unit tests and `npm run test:watch` for development.
4. **Linting**: Use `npm run lint` and `npm run lint:fix` for code quality.
5. **Packaging**: Use `npm run package` to create Lambda deployment package.

### Code Standards

- **TypeScript**: All code must be written in TypeScript with proper type definitions.
- **ESLint**: Code must pass all linting rules without warnings.
- **Prettier**: Code must be properly formatted using Prettier.
- **Jest**: All new code must include comprehensive unit tests.
- **Coverage**: Maintain > 80% minimum code coverage across all metrics.

## Commits & Commitizen

This project uses **Commitizen** to ensure commit messages follow a structured format and versioning is consistent. Commit linting is enforced via a pre-commit husky hook.

### Making a Commit

To make a commit in the correct format, run the following command. Commitzen will walk the user through the creation of a structured commit message and versioning:

```bash
npm run commit
```

## Linting & Formatting

This project uses **ESLint** and **Prettier** for code quality enforcement. Linting is enforced during every CI/CD pipeline to ensure consistent standards.

### Linting Commands

Run linting:

```bash
npm run lint
```

Fix linting issues automatically:

```bash
npm run lint:fix
```

### Formatting Commands

Format using prettier:

```bash
npm run format
```

Check formatting:

```bash
npm run format:check
```

### Pre-Commit Hook

**Lint-staged** is configured to run linting before each commit. The commit will be blocked if linting fails, ensuring code quality at the commit level.

## Unit Tests & Code Coverage

### Unit Tests

This project uses **Jest** for testing. Code coverage is enforced during every CI/CD pipeline. The build will fail if any tests fail or coverage drops below **80%**.

Run tests:

```bash
npm run test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Open coverage report:

```bash
npm run coverage:open
```

### Code Coverage

Coverage thresholds are enforced at **80%** for all metrics. The build will fail if coverage drops below this threshold.

## Error & Performance Monitoring

This project uses **AWS CloudWatch** for server-side error and performance monitoring with structured logging.

### Configuration

CloudWatch logging is configured with environment-specific settings. Logs are sent to CloudWatch with structured JSON formatting for better parsing and analysis.

### CloudWatch Logging

The Lambda function uses structured logging with the following features:

- **JSON-formatted logs** for better parsing and analysis.
- **Performance metrics** for tracking response times and token usage.
- **Request context** for debugging and monitoring.
- **Error context** for debugging and monitoring.
- **CloudWatch integration** for centralized log management.

## Environment Variables

The following environment variables are used by the Blockbuster Index Chat Bot:

| Variable            | Description                            | Required | Default |
| ------------------- | -------------------------------------- | -------- | ------- |
| `ENVIRONMENT`       | The deployment environment (dev/prod)  | Yes      | -       |
| `ANTHROPIC_API_KEY` | Anthropic API key for Claude AI access | Yes      | -       |

### Environment-Specific Configuration

- **Development**: Uses `dev` environment with testing configurations
- **Production**: Uses `prod` environment with production configurations

## Build & Deployment

The **Blockbuster Index Chat Bot** uses a sophisticated CI/CD pipeline with GitHub Actions to enable automated deployment and testing.

### Build Process

The Lambda function is built using webpack with TypeScript compilation:

```bash
npm run build
```

This process:

1. **TypeScript Compilation**: Compiles TypeScript to JavaScript
2. **Webpack Bundling**: Bundles code and dependencies
3. **Optimization**: Minifies and optimizes for production
4. **Output**: Creates optimized bundle for Lambda deployment

### Lambda Package

The application is packaged for AWS Lambda deployment:

```bash
npm run package
```

This process:

1. **Dependency Installation**: Installs production dependencies
2. **Bundle Creation**: Creates deployment package with all required files
3. **Compression**: Creates optimized ZIP file for Lambda upload
4. **Versioning**: Includes version and commit information

### GitHub Workflows

The project includes GitHub Actions workflows that enable automated deployment and testing.

#### Deploy Workflow

Deploy the chat bot to AWS Lambda with full CI/CD pipeline. Triggered manually from GitHub Actions UI with parameter selection.

**Process**:

1. **Code Quality Checks**: Runs linting and unit tests with 80% coverage threshold.
2. **Build Process**: Compiles TypeScript and creates optimized bundle.
3. **Package Creation**: Creates Lambda deployment package with versioning.
4. **S3 Upload**: Uploads package to S3 with versioned filename.
5. **CloudFormation Deployment**: Updates Lambda function with new deployment package.
6. **Verification**: Ensures deployment completes successfully.

#### Rollback Workflow

Quickly rollback to a previous deployment version. Triggered manually when issues are detected with a recent deployment.

**Process**:

1. **CloudFormation Update**: Deploys Lambda function with previous deployment package.
2. **Verification**: Ensures rollback completes successfully.

#### Pull Request Workflow

Automated quality gates for all pull requests. Automatically triggered on all pull requests to main branch.

**Process**:

1. **Build Verification**: Ensures code compiles correctly.
2. **Linting**: Enforces code style and quality standards.
3. **Unit Testing**: Runs comprehensive test suite with coverage reporting.
4. **Coverage Threshold**: Enforces 80% minimum coverage requirement.

### Infrastructure

#### CloudFormation Templates

Infrastructure is managed using AWS CloudFormation templates with environment-specific parameterization:

- **`blockbuster-index-chat-bot-api.yaml`**: Defines API Gateway, Lambda function, and related resources with comprehensive model validation.
- **`blockbuster-index-chat-bot-role.yaml`**: Defines IAM roles and permissions for Lambda execution.
- **`blockbuster-index-chat-bot-s3.yaml`**: Defines S3 buckets for Lambda deployment packages.

#### API Gateway Configuration

The API Gateway is configured with comprehensive features:

- **Custom Domain**: Environment-specific custom domains with SSL certificates
- **Request Validation**: API Gateway models ensure proper request/response validation
- **CORS Support**: Full CORS configuration for web integration
- **Usage Plans**: Rate limiting and quota management
- **Method Configuration**: GET, POST, and OPTIONS methods with proper integration

#### Lambda Function Configuration

The Lambda function is optimized for performance and cost:

- **Runtime**: Node.js 20.x for optimal performance
- **Memory**: 256MB allocation balanced for performance and cost
- **Timeout**: 30 seconds to prevent runaway costs
- **Environment Variables**: Secure configuration management
- **Logging**: Structured CloudWatch logging for monitoring

#### Environment Parameterization

All infrastructure components use environment-specific naming and configuration:

- **Resource Naming**: All AWS resources include environment prefix (e.g., `blockbuster-index-chat-bot-dev`)
- **Configuration Mapping**: Environment-specific settings for logging levels and API endpoints
- **Security Groups**: Environment-specific network security configurations
- **Custom Domains**: Environment-specific API Gateway domains

## License

    Apache License
    Version 2.0, January 2004
    http://www.apache.org/licenses/

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

---
