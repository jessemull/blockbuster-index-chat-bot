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

## Architecture

This project implements an **AWS Lambda** function that serves as a chat bot backend, providing:

- **API Gateway Integration**: RESTful API endpoints for chat interactions
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

1. Build and package the application:

```bash
npm run build
npm run package
```

2. Deploy using AWS CLI or CloudFormation console with the provided templates.

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
- **Main Template** (`template.yaml`): Lambda function and API Gateway configuration

## API Endpoints

The chat bot exposes the following endpoints:

- `GET /`: Health check endpoint
- `POST /chat`: Main chat endpoint for processing user messages

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
