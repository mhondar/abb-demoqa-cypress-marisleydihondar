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
```

### Running Tests via GitHub Actions

The project includes two CI/CD pipelines for automated testing:

#### 1. **Manual Workflow Dispatch** (`demoqa-e2e.yml`)

Trigger custom test runs with specific configurations:

1. Go to **Actions** tab in GitHub
2. Select **🧪 DemoQA E2E Tests** workflow
3. Click **Run workflow**
4. Configure:
   - **Environment**: qa | staging
   - **Test Type**: all | api | ui | smoke | spec
   - **Browser**: chrome | firefox | edge (optional)
   - **Debug Mode**: Enable for detailed debugging
5. Click **Run workflow**

```bash
# Alternative: Trigger via CLI
gh workflow run demoqa-e2e.yml \
  -f environment=qa \
  -f run_target=smoke \
  -f browser=chrome
```

#### 2. **Automated CI/CD Pipeline** (`cypress.yml`)

Runs automatically on:

- **Push** to: main, develop, staging branches
- **Pull Requests** against: main, develop, staging
- **On-demand** via workflow dispatch

The pipeline executes:

- ✅ Code quality checks (ESLint, Prettier)
- ✅ API tests
- ✅ Smoke tests
- ✅ Full UI test suite
- ✅ Report generation

**Example: Automatic PR Checks**

```
📝 Commit to feature branch
    ↓
🔄 Push to GitHub
    ↓
✅ CI/CD Pipeline Triggers
    ├─ ESLint & Prettier validation
    ├─ API tests run
    ├─ Smoke tests run
    ├─ UI tests run
    └─ Reports generated
    ↓
💬 Results commented on PR
    ↓
🔀 Ready to merge!
```

### GitHub Actions Configuration

#### Required Secrets

Add these GitHub Secrets for authentication:

1. Go to **Settings > Secrets and variables > Actions**
2. Add the following secrets:
   - `CYPRESS_USERNAME`: DemoQA login username
   - `CYPRESS_PASSWORD`: DemoQA login password

```bash
# Add secrets via GitHub CLI
gh secret set CYPRESS_USERNAME --body "your_username"
gh secret set CYPRESS_PASSWORD --body "your_password"
```

#### Monitoring Test Runs

1. Navigate to **Actions** tab
2. Click on a workflow run to see details
3. View real-time logs for each job
4. Download artifacts (screenshots, videos, reports)
5. Check PR comments for test results summary

#### Downloading Test Reports

After a workflow completes:

1. Go to the workflow run details
2. Scroll to **Artifacts** section
3. Download:
   - `html-report-*`: Detailed HTML test report
   - `cypress-artifacts-*`: Screenshots and videos
   - `test-report-html`: Mochawesome report

---

## Development Commands

```bash
# Code Quality
npm run lint             # Run ESLint
npm run format           # Format code with Prettier
npm run format:check     # Check formatting without changes

# Git Hooks
npm run prepare          # Setup Husky pre-commit hooks
```

---

## Generate Test Reports

```bash
# Complete test run with reporting
npm run test:report

# View report
open cypress/reports/report.html
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

### 🤖 GitHub Actions Workflows

The project includes **two powerful CI/CD pipelines** for automated testing:

#### Pipeline 1: **Automated CI/CD** (`cypress.yml`)

**Auto-triggers on:**

- 🔄 Push to main, develop, staging branches
- 🔀 Pull Requests to main, develop, staging
- 🚀 Manual trigger (workflow_dispatch)

**What it does:**

```
1. Setup & Validate
   ├─ Setup Node.js environment
   └─ Validate dependencies

2. Code Quality
   ├─ ESLint validation
   └─ Prettier format check

3. Test Execution (Parallel)
   ├─ API Tests (5 test cases)
   ├─ Smoke Tests (Critical flows)
   └─ UI Tests (Full test suite)

4. Report Generation
   └─ Mochawesome HTML reports with charts

5. Artifacts & Notifications
   ├─ Upload screenshots & videos
   ├─ Publish test reports (30-day retention)
   └─ Comment on PRs with results summary
```

#### Pipeline 2: **Manual Test Runner** (`demoqa-e2e.yml`)

**Trigger manually with:**

- 🌍 Environment selection (QA / Staging)
- 🎯 Test type selection (all / api / ui / smoke / spec)
- 🌐 Browser selection (Chrome / Firefox / Edge)
- 🐛 Debug mode toggle

**How to trigger:**

1. Go to **GitHub > Actions** tab
2. Select **🧪 DemoQA E2E Tests**
3. Click **Run workflow**
4. Configure options:
   ```
   Environment: qa | staging
   Test Type: all | api | ui | smoke | spec
   Browser: chrome | firefox | edge (optional)
   Debug Mode: true | false
   ```
5. Click **Run workflow**

**Command line alternative:**

```bash
gh workflow run demoqa-e2e.yml \
  -f environment=qa \
  -f run_target=smoke \
  -f browser=chrome
```

### 🔐 GitHub Secrets Setup

Required for test authentication:

```bash
# Via GitHub CLI
gh secret set CYPRESS_USERNAME --body "your_demoqa_username"
gh secret set CYPRESS_PASSWORD --body "your_demoqa_password"
```

Or manually via GitHub UI:

1. Settings → Secrets and variables → Actions
2. New repository secret
3. Add: `CYPRESS_USERNAME` and `CYPRESS_PASSWORD`

### 📊 Monitoring & Artifacts

#### Real-time Monitoring

1. Go to **Actions** tab
2. Click running workflow
3. Watch live logs for each job
4. Check individual step output

#### Download Test Reports

After workflow completion:

1. Scroll to **Artifacts** section
2. Download available artifacts:
   - `html-report-*`: Detailed Mochawesome report
   - `cypress-artifacts-*`: Screenshots & videos
   - `test-report-html`: Merged test report

#### Pull Request Integration

- Automatic comments with test results
- ✅/❌ status badges
- Links to detailed reports
- Screenshots of failures

### 🔄 Workflow Concurrency

Workflows use **concurrency control** to prevent resource waste:

- Cancels in-progress workflows when new push occurs
- Groups by PR number or branch name
- Ensures only latest workflow runs for each branch

### 📈 Performance & Resource Usage

| Metric              | Value              |
| ------------------- | ------------------ |
| Setup time          | ~15s               |
| API tests           | ~30s               |
| Smoke tests         | ~45s               |
| UI tests            | ~90s               |
| Report generation   | ~20s               |
| **Total runtime**   | **~3 minutes**     |
| Parallel jobs       | 3 (API, Smoke, UI) |
| Storage (artifacts) | 30-day retention   |

### ✅ Status Badges

Add these to your project README:

```markdown
![Cypress Tests](https://github.com/mhondar/abb-demoqa-cypress-marisleydihondar/actions/workflows/cypress.yml/badge.svg)

![DemoQA E2E Tests](https://github.com/mhondar/abb-demoqa-cypress-marisleydihondar/actions/workflows/demoqa-e2e.yml/badge.svg)
```

**Current Status:**

[![Cypress Tests](https://github.com/mhondar/abb-demoqa-cypress-marisleydihondar/actions/workflows/cypress.yml/badge.svg)](https://github.com/mhondar/abb-demoqa-cypress-marisleydihondar/actions)

[![DemoQA E2E Tests](https://github.com/mhondar/abb-demoqa-cypress-marisleydihondar/actions/workflows/demoqa-e2e.yml/badge.svg)](https://github.com/mhondar/abb-demoqa-cypress-marisleydihondar/actions)

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
