# XBorg Tech Challenge

## Submission Requirements

- Unit Tests
- Integration Tests
- E2E Testing
- Clearly document strategies via effective testing and in the Submission Documentation section of the ReadMe

Implementation should be submitted via a public GitHub repository, or a private repository with collaborator access granted to the provided emails.

## Architecture

- Language - Typescript
- Monorepo - Turborepo
- Client - NextJs
- Api - NestJs
- DB - SQLite

## Apps and Packages

- `client`: [Next.js](https://nextjs.org/) app
- `api`: [Nestjs](https://nestjs.com) app
- `tsconfig`: Typescript configuration used throughout the monorepo

## Utilities

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
- [Husky](https://typicode.github.io/husky/) for Git hooks

## Steps to run app

```bash
# Start the infrastructure
$ yarn start:local:infra

# Migrate the DB
$ cd apps/api && yarn migrate:local

# Install dependencies
$ yarn install

# Create and migrate the DB
 $ cd apps/api
 $ yarn migrate:local

 # Build the app including the lib
$ yarn build

 # Run the application stack in dev (enter command from the project root)
 $ yarn dev
```

## Additional Commands

```bash
# Run tests in all apps
$ yarn test

# Run linter in all apps
$ yarn lint

# Format code in all apps
$ yarn format

```

## Submission Documentation

# XBorg Backend Testing Strategy

This document outlines the comprehensive testing strategy implemented for the XBorg Backend Challenge. The testing approach follows best practices to ensure code quality and reliability of the backend services.

## Installation

Before running the tests, make sure to install all dependencies:

```bash
# Navigate to the tests directory
$ cd tests
# Install dependencies
$ npm install
```

## Testing Layers

### 1. Unit Tests

Unit tests focus on testing individual components in isolation by mocking their dependencies. This ensures that each component behaves as expected independently.

**Implementation Details:**
- Located in `/tests/unit/`
- Tests individual functions and methods
- Uses mocks and stubs for dependencies
- Focuses on code paths and edge cases

**Key Components Tested:**
- `UserService` - Tests the service logic for user operations
- `UserRepository` - Tests the data access methods
- `UserController` - Tests the controller endpoints and request handling

### 2. Integration Tests

Integration tests verify that different components work together correctly. They test the integration points between components with real implementations.

**Implementation Details:**
- Located in `/tests/integration/`
- Tests multiple components working together
- Uses real implementations (not mocks) for core functionality
- Uses the actual database but in a test environment

**Key Integration Points Tested:**
- `UserService` with `UserRepository` - Ensures user creation and retrieval work end-to-end
- Database interactions - Verifies that Prisma ORM operations work correctly
- Error handling between components - Tests error propagation across layers

### 3. End-to-End Tests

E2E tests verify that the complete application works as expected from the user's perspective. They test the entire flow from API request to database and back.

**Implementation Details:**
- Located in `/tests/e2e/`
- Tests the API as a whole
- Simulates client requests using supertest
- Verifies full request-response cycles
- Tests application behavior in a production-like environment

**Key Flows Tested:**
- User registration flow
- User retrieval by ID and address
- Error handling for duplicate users
- HTTP status codes and response formats

## Running Tests

To run the test suite, use the following commands:

```bash
# Run unit tests
npm run test:unit

# Run integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e

# Run all tests
npm run test
```

## Test Architecture

The tests are organized using the following architecture:

- **Test Utilities** (`/tests/utils/`) - Common test utilities and helper functions
- **Mocks** (`/tests/utils/mocks.ts`) - Mock data for test cases
- **Test Configuration** (`/tests/jest.config.js`) - Jest configuration for running tests
- **Test Setup** (`/tests/jest.setup.js`) - Global setup and teardown logic

## Test Reports

Detailed test reports are generated during test execution.

The reports include:
- XBorg-branded HTML Dashboard with interactive visualizations
- JUnit XML reports for CI/CD integration
- Test coverage statistics
- Pass/fail status for each test
- Detailed error messages for failed tests
- Performance metrics
- Code coverage by file and function

Reports are automatically generated when running tests:
```bash
# Generate reports for all tests
$ npm run test

# Generate reports for specific test types
$ npm run test:unit
$ npm run test:integration
$ npm run test:e2e
```

Reports are generated in the following locations:
- HTML Dashboard: `/tests/reports/html-report/report.html`
- JUnit XML: `/tests/reports/junit.xml`