# DemoQA BookStore - Automation Test Framework

<div align="center">

![Cypress](https://img.shields.io/badge/Cypress-15.11.0-00BCD4?style=flat-square&logo=cypress)
![Node.js](https://img.shields.io/badge/Node.js->=18-339933?style=flat-square&logo=node.js)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)
![Status](https://img.shields.io/badge/Status-Active-success?style=flat-square)

**End-to-End and API Automation Framework for DemoQA BookStore**

[Overview](#overview) • [Features](#features) • [Quick Start](#quick-start) • [Architecture](#architecture) • [Testing](#testing) • [Documentation](#documentation)

</div>

---

## Overview

This is a **professional-grade automation testing framework** built with **Cypress** for the DemoQA BookStore application. The project demonstrates industry-standard QA automation practices including:

- ✅ **Comprehensive Test Coverage**: API and UI automation tests
- ✅ **Clean Architecture**: Page Object Model (POM) pattern implementation
- ✅ **Production-Ready**: CI/CD integration, reporting, and code quality tools
- ✅ **Scalable Framework**: Custom commands, utilities, and reusable components
- ✅ **Multi-Environment**: Support for QA and Staging environments

Developed as a professional submission for **QA Automation Engineer** position, showcasing best practices in test automation, code organization, and quality assurance.

---

## Features

### 🧪 Test Coverage

| Category           | Tests          | Coverage                                   |
| ------------------ | -------------- | ------------------------------------------ |
| **API Tests**      | 5 test cases   | BookStore REST API validation              |
| **UI Tests**       | 10+ test cases | Authentication, search, profile management |
| **Smoke Tests**    | Included       | Critical user flows                        |
| **Negative Tests** | Included       | Error handling and edge cases              |

### 🏗️ Architecture & Quality

- **Page Object Model (POM)**: Maintainable and scalable test structure
- **Custom Commands**: Reusable Cypress commands for API and UI interactions
- **Environment Management**: Configurable environments (QA, Staging)
- **Code Quality**: ESLint, Prettier, and Husky pre-commit hooks
- **Test Reporting**: Mochawesome HTML reports with merge capabilities
- **CI-Ready**: GitHub Actions workflow for automated testing

### 📊 Test Types

- **Unit API Tests**: Direct REST API validation
- **End-to-End UI Tests**: Complete user journey automation
- **Data-Driven Tests**: Fixture-based test data management
- **Negative & Edge Cases**: Error scenario coverage

---

## Quick Start

### Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x
- **Git**

### Installation

```bash
# Clone the repository
git clone https://github.com/mhondar/abb-demoqa-cypress-marisleydihondar.git

# Navigate to project directory
cd abb-demoqa-cypress-marisleydihondar

# Install dependencies
npm install

# Install Cypress browsers (if needed)
npx cypress install
```

### Running Tests

```bash
# Open Cypress Test Runner (Interactive Mode)
npm run cy:open

# Run all tests (Headless Mode)
npm run cy:run

# Environment-Specific Tests
npm run cy:run:qa        # Run tests against QA environment
npm run cy:run:staging   # Run tests against Staging environment

# Run with Browser Visibility
npm run cy:run:qa:headed       # Run with visible browser (QA)
npm run cy:run:staging:headed  # Run with visible browser (Staging)

# Generate Test Reports
npm run test:report      # Run tests + merge reports + generate HTML report
npm run report:generate  # Generate HTML report from existing results
```

### Development Commands

```bash
# Code Quality
npm run lint             # Run ESLint
npm run format           # Format code with Prettier
npm run format:check     # Check formatting without changes

# Git Hooks
npm run prepare          # Setup Husky pre-commit hooks
```

---

## Architecture

### Directory Structure

```
cypress/
├── e2e/                          # End-to-end test specs
│   ├── api/                      # API test cases
│   │   ├── books.get.cy.js       # GET Books endpoint tests
│   │   └── books.negative.cy.js  # Negative API tests
│   └── ui/                       # UI test cases
│       ├── auth.login.cy.js      # Login flow tests
│       ├── auth.negative.cy.js   # Negative auth scenarios
│       ├── auth.profile.cy.js    # Profile management tests
│       ├── books-search.cy.js    # Book search functionality
│       └── smoke.cy.js           # Critical flow smoke tests
│
├── pages/                        # Page Object Models
│   ├── login.page.js             # Login page objects
│   ├── profile.page.js           # Profile page objects
│   ├── books.page.js             # Books page objects
│   └── navigation.page.js        # Navigation components
│
├── support/                      # Test support files
│   ├── e2e.js                    # Global Cypress configuration
│   └── commands/                 # Custom Cypress commands
│       ├── api.commands.js       # API request commands
│       ├── auth.commands.js      # Authentication commands
│       └── ui.commands.js        # UI interaction commands
│
├── fixtures/                     # Test data
│   ├── books/                    # Book-related test data
│   └── users/                    # User test data
│
├── utils/                        # Utility functions
│   ├── assertions.js             # Custom assertions
│   ├── data.utils.js             # Data handling utilities
│   └── selectors.js              # CSS/DOM selectors
│
├── config/                       # Environment configurations
│   ├── qa.config.js              # QA environment config
│   └── staging.config.js         # Staging environment config
│
└── artifacts/                    # Test execution artifacts
    ├── screenshots/              # Failed test screenshots
    └── videos/                   # Test execution videos

cypress.config.js                 # Cypress configuration
package.json                      # Dependencies and scripts
eslint.config.js                  # ESLint configuration
```

### Key Design Patterns

#### 1. **Page Object Model (POM)**

```javascript
// Example: pages/login.page.js
class LoginPage {
  visit() {
    cy.visit('/login');
  }

  fillUsername(username) {
    cy.get('[id="userName"]').type(username);
  }

  fillPassword(password) {
    cy.get('[id="password"]').type(password);
  }

  clickLoginButton() {
    cy.get('#login').click();
  }
}
```

#### 2. **Custom Commands**

```javascript
// Example: support/commands/api.commands.js
cy.getBooks(); // API request wrapper
cy.authenticateUser(); // Authentication command
cy.fillLoginForm(); // Common UI operations
```

#### 3. **Test Data Management**

```javascript
// Using fixtures for data-driven tests
cy.fixture('users/user.json').then((user) => {
  // Test logic using loaded fixture data
});
```

---

## Testing

### Test Case Categories

#### API Tests (`cypress/e2e/api/`)

- ✅ **TC-API-01**: Get all books returns 200
- ✅ **TC-API-02**: Response contains expected number of books
- ✅ **TC-API-03**: Book schema validation
- ✅ **TC-API-04**: Response performance validation
- ✅ Negative tests for error scenarios

#### UI Tests - Authentication (`cypress/e2e/ui/`)

- ✅ **TC-AUTH-01**: Login with valid credentials
- ✅ **TC-AUTH-02**: Login with invalid password
- ✅ **TC-AUTH-03**: Login with empty fields
- ✅ **TC-AUTH-04**: Logout functionality
- ✅ **TC-PROFILE-01**: View user profile
- ✅ **TC-PROFILE-02**: Manage user books

#### UI Tests - Book Search (`cypress/e2e/ui/`)

- ✅ **TC-SEARCH-01**: Search books by keyword
- ✅ **TC-SEARCH-02**: Filter by author
- ✅ **TC-SEARCH-03**: Handle empty search results
- ✅ **TC-SMOKE**: Critical business flows

### Running Specific Test Categories

```bash
# Run only API tests
npm run cy:run -- --spec "cypress/e2e/api/**/*.cy.js"

# Run only UI tests
npm run cy:run -- --spec "cypress/e2e/ui/**/*.cy.js"

# Run specific test file
npm run cy:run -- --spec "cypress/e2e/ui/auth.login.cy.js"

# Run with tag filter (requires custom integration)
npm run cy:run -- --env tags="@smoke"
```

---

## Test Reports

### Generate HTML Reports

```bash
# Complete test run with reporting
npm run test:report

# View report
open cypress/reports/report.html
```

### Report Features

- 📊 Test execution summary
- 📈 Pass/fail statistics
- ⏱️ Execution time metrics
- 📸 Screenshots for failed tests
- 🎥 Video recordings of test runs
- 📋 Detailed test case logs

---

## Configuration

### Environment Setup

#### QA Environment (`cypress/config/qa.config.js`)

```javascript
module.exports = {
  baseUrl: 'https://demoqa.com',
  apiUrl: 'https://demoqa.com/BookStore/v1',
  timeout: 5000,
};
```

#### Staging Environment (`cypress/config/staging.config.js`)

```javascript
module.exports = {
  baseUrl: 'https://staging.demoqa.com',
  apiUrl: 'https://staging.demoqa.com/BookStore/v1',
  timeout: 5000,
};
```

### Cypress Configuration (`cypress.config.js`)

```javascript
{
  // Viewport
  viewportWidth: 1280,
  viewportHeight: 720,

  // Timeouts
  requestTimeout: 10000,
  responseTimeout: 10000,

  // Reporting
  reporter: 'mochawesome',

  // Screenshots & Videos
  screenshotOnRunFailure: true,
  video: true,
}
```

---

## CI/CD Integration

### GitHub Actions

The project includes a GitHub Actions workflow (`.github/workflows/cypress.yml`) that:

- ✅ Runs tests automatically on push and pull requests
- ✅ Tests against multiple environments
- ✅ Generates and publishes test reports
- ✅ Provides detailed failure notifications

**Workflow Status Badge**: [![Cypress Tests](https://github.com/mhondar/abb-demoqa-cypress-marisleydihondar/actions/workflows/cypress.yml/badge.svg)](https://github.com/mhondar/abb-demoqa-cypress-marisleydihondar/actions)

---

## Code Quality

### Quality Assurance Tools

- **ESLint**: JavaScript code linting
- **Prettier**: Code formatting
- **Husky**: Git pre-commit hooks
- **Lint-staged**: Run linters on staged files

### Running Quality Checks

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint -- --fix

# Format code
npm run format

# Check formatting
npm run format:check
```

---

## Documentation

### Included Documentation

- [Test Cases](./docs/test-cases.md) - Detailed test case specifications
- [Known Issues](./docs/known-issues.md) - Known limitations and issues
- [Refinement Notes](./docs/refinement-notes.md) - Architecture decisions and notes

### Additional Resources

- [Cypress Official Documentation](https://docs.cypress.io)
- [DemoQA Application](https://demoqa.com)
- [Page Object Model Pattern](https://www.cypress.io/blog/2019/12/02/stop-using-page-objects-and-start-using-app-actions/)

---

## Best Practices Implemented

### 🎯 Test Organization

- Clear test naming convention (TC-CATEGORY-##)
- Logical test grouping by feature
- Isolated test cases with proper setup/teardown
- Meaningful assertions with descriptive messages

### 🔧 Code Maintainability

- DRY principle with custom commands
- Centralized selector management
- Fixture-based test data
- Reusable utility functions
- Clear separation of concerns

### 📈 Scalability

- Environment-agnostic configuration
- Parameterized test data
- Modular page objects
- Extensible command framework

### 🚀 CI/CD Ready

- GitHub Actions integration
- Automated test execution
- Report generation and distribution
- Multi-environment support

---

## Troubleshooting

### Common Issues

#### Tests not connecting to API

- Verify `apiUrl` in environment config matches the target URL
- Check network connectivity
- Review CORS settings if running locally

#### Screenshots/Videos not captured

- Ensure `screenshotOnRunFailure: true` in cypress.config.js
- Check disk space availability
- Verify artifacts folder permissions

#### Timeout errors

- Increase timeout values in cypress.config.js
- Check application performance
- Review network latency

### Debug Mode

```bash
# Run with debug logging
DEBUG=cypress:* npm run cy:run

# Open Cypress with DevTools
npm run cy:open
# Then use browser DevTools (F12) for debugging
```

---

## Performance Metrics

### Typical Execution Times

- **Full Test Suite**: ~2-3 minutes (headless)
- **API Tests Only**: ~30 seconds
- **UI Tests Only**: ~90 seconds
- **Single Test Case**: ~10-20 seconds

### Environment Requirements

- **Minimum Node.js**: 18.x
- **RAM**: 2GB
- **Disk Space**: 500MB (including node_modules)
- **Network**: Stable connection for API tests

---

## Contributing

### Development Workflow

1. Create a feature branch
2. Write tests following the existing patterns
3. Run `npm run lint` and `npm run format`
4. Commit with meaningful messages
5. Push and create a Pull Request

### Adding New Tests

```javascript
// Template: cypress/e2e/ui/feature.cy.js
const page = require('../../pages/feature.page');
const { loadFixture } = require('../../utils/data.utils');

describe('Feature Category', () => {
  before(() => {
    // Load test data
  });

  beforeEach(() => {
    // Setup before each test
  });

  it('TC-CATEGORY-XX — Test description', () => {
    // Test implementation
    cy.visit('/path');
    page.interaction();
    cy.get('selector').should('have.text', 'expected');
  });
});
```

---

## Author

**Marisleydi Hondar Martinez**  
QA Automation Engineer | Test Automation Specialist

- 📧 Email: [contact information]
- 🔗 LinkedIn: [profile]
- 💼 Portfolio: [GitHub profile](https://github.com/mhondar)

---

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- DemoQA for providing the test application
- Cypress team for the excellent testing framework
- Open-source community for various tools and utilities

---

<div align="center">

**Made with ❤️ for Quality Assurance Excellence**

[⬆ back to top](#demoqa-bookstore---automation-test-framework)

</div>
