# GitHub Actions - Workflows Guide

## 📋 Table of Contents

- [Available Workflows](#available-workflows)
- [Setting Up Secrets](#setting-up-secrets)
- [Manual Workflow Dispatch](#manual-workflow-dispatch)
- [Automated CI/CD Pipeline](#automated-cicd-pipeline)
- [Monitoring Runs](#monitoring-runs)
- [Troubleshooting](#troubleshooting)

---

## Available Workflows

### 1. **Automated CI/CD Pipeline** (`cypress.yml`)

**File**: `.github/workflows/cypress.yml`

**Purpose**: Automatically runs tests on every push and pull request with code quality checks.

**Triggers**:

- ✅ Push to: `main`, `develop`, `staging` branches
- ✅ Pull Requests to: `main`, `develop`, `staging` branches
- ✅ Manual trigger via workflow dispatch
- ✅ Only runs on changes to: `cypress/**`, `package*.json`, `.github/workflows/cypress.yml`

**Jobs Included**:

1. **Setup & Validate**: Node.js configuration and dependency validation
2. **Lint & Format**: ESLint and Prettier checks
3. **API Tests**: Runs API test suite
4. **Smoke Tests**: Runs critical path tests
5. **UI Tests**: Runs full UI test suite
6. **Generate Reports**: Creates Mochawesome reports
7. **Pipeline Status**: Final status check with PR comments

**Expected Runtime**: ~3 minutes (parallel execution)

---

### 2. **Manual E2E Test Runner** (`demoqa-e2e.yml`)

**File**: `.github/workflows/demoqa-e2e.yml`

**Purpose**: Manually trigger custom test runs with flexible configuration.

**Triggers**:

- 🚀 Manual trigger via GitHub Actions UI
- 🚀 Manual trigger via GitHub CLI
- 🔄 Can also run on push/PR for all branches

**Jobs Included**:

1. **Validate**: Configuration validation
2. **Cypress Tests**: Main test execution job with matrix strategy
3. **Notify**: Results notification and PR comments

**Customizable Options**:

- Environment: `qa` or `staging`
- Test Type: `all`, `api`, `ui`, `smoke`, or `spec`
- Browser: `chrome`, `firefox`, or `edge`
- Debug Mode: `true` or `false`
- Specific Spec File: Path when using `spec` type

**Expected Runtime**: 1-3 minutes depending on test type

---

## Setting Up Secrets

### Required Secrets

Before running tests via GitHub Actions, configure authentication credentials:

#### Method 1: GitHub UI

1. Navigate to your repository
2. Go to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add the following secrets:

| Secret Name        | Value                 | Example       |
| ------------------ | --------------------- | ------------- |
| `CYPRESS_USERNAME` | DemoQA login username | `student`     |
| `CYPRESS_PASSWORD` | DemoQA login password | `Password123` |

#### Method 2: GitHub CLI

```bash
# Set username secret
gh secret set CYPRESS_USERNAME --body "your_username"

# Set password secret
gh secret set CYPRESS_PASSWORD --body "your_password"

# Verify secrets are set
gh secret list
```

#### Method 3: Check Existing Secrets

```bash
# List all secrets
gh secret list

# Delete a secret if needed
gh secret delete CYPRESS_USERNAME
```

---

## Manual Workflow Dispatch

### Via GitHub UI

1. **Navigate to Actions**
   - Go to your repository
   - Click **Actions** tab

2. **Select Workflow**
   - Click **🧪 DemoQA E2E Tests**

3. **Run Workflow**
   - Click **Run workflow** button

4. **Configure Options**
   - **Environment**: Select `qa` or `staging`
   - **Test Type**: Select `all`, `api`, `ui`, `smoke`, or `spec`
   - **Browser**: Select `chrome`, `firefox`, or `edge` (optional)
   - **Debug Mode**: Toggle `true` or `false`
   - **Spec File**: Enter path if using `spec` type (e.g., `cypress/e2e/ui/auth.login.cy.js`)

5. **Start Workflow**
   - Click **Run workflow**
   - Wait for job to appear in the Actions list
   - Click to view real-time logs

### Via GitHub CLI

```bash
# Basic run (QA environment, all tests)
gh workflow run demoqa-e2e.yml \
  -f environment=qa \
  -f run_target=all

# API tests only on QA
gh workflow run demoqa-e2e.yml \
  -f environment=qa \
  -f run_target=api

# Smoke tests with Firefox
gh workflow run demoqa-e2e.yml \
  -f environment=qa \
  -f run_target=smoke \
  -f browser=firefox

# Single spec file with debug mode
gh workflow run demoqa-e2e.yml \
  -f environment=qa \
  -f run_target=spec \
  -f spec_file=cypress/e2e/ui/auth.login.cy.js \
  -f debug_mode=true

# Staging environment full test
gh workflow run demoqa-e2e.yml \
  -f environment=staging \
  -f run_target=all \
  -f browser=chrome
```

---

## Automated CI/CD Pipeline

### How It Works

```
Developer pushes code to feature branch
        ↓
Opens Pull Request to main/develop/staging
        ↓
Workflow Triggers Automatically
        ↓
┌─────────────────────────────────────┐
│ Job 1: Setup & Validate             │
│ - Node.js installation              │
│ - Dependency check                  │
└─────────────────────────────────────┘
        ↓
┌──────────────────┬─────────────────┬──────────────────┐
│ Job 2: Lint      │ Job 3: API      │ Job 4: Smoke     │
│ - ESLint check   │ - Run API tests │ - Run smoke      │
│ - Prettier check │                 │   tests (fast)   │
└──────────────────┴─────────────────┴──────────────────┘
        ↓
┌─────────────────────────────────────┐
│ Job 5: UI Tests                     │
│ - Full UI test suite                │
└─────────────────────────────────────┘
        ↓
┌─────────────────────────────────────┐
│ Job 6: Generate Reports             │
│ - Merge test results                │
│ - Generate HTML report              │
└─────────────────────────────────────┘
        ↓
┌─────────────────────────────────────┐
│ Job 7: Pipeline Status              │
│ - Summary check                     │
│ - PR comment with results           │
└─────────────────────────────────────┘
        ↓
Results Commented on PR
✅ All Tests Passed → Ready to Merge
❌ Tests Failed → Review Failures
```

### Branch-Specific Behavior

| Branch    | Behavior                               |
| --------- | -------------------------------------- |
| `main`    | Tests both QA and Staging environments |
| `develop` | Tests QA environment only              |
| `staging` | Tests Staging environment only         |
| Other     | Tests QA environment only (on push)    |

---

## Monitoring Runs

### View Workflow Runs

1. Go to **Actions** tab
2. Filter by workflow name if needed
3. Click on a run to see details

### Real-time Monitoring

1. Click on the workflow run you want to monitor
2. View **Jobs** section
3. Click on a job to expand
4. Watch live logs as they appear
5. Expand individual steps to see detailed output

### Check Job Results

Each job shows:

- ✅ **Success**: Job completed without errors
- ❌ **Failure**: Job failed (scroll to see error)
- ⏭️ **Skipped**: Job was skipped (usually due to conditional)

### View Artifacts

After workflow completes:

1. Scroll down to **Artifacts** section
2. Available artifacts depend on test results:
   - `html-report-*`: Detailed Mochawesome HTML report
   - `cypress-artifacts-*`: Screenshots and video recordings
   - `test-report-html`: Merged test report

3. Click artifact name to download (zip file)

### Pull Request Integration

When running in a PR context:

1. Workflow comments on PR with summary
2. Shows test status for each category
3. Links to detailed reports
4. Required status checks block merging if tests fail

---

## Troubleshooting

### Workflow Won't Trigger

**Problem**: Workflow doesn't run on push/PR

**Solutions**:

1. Verify workflow file syntax is valid (YAML format)
2. Check branch name matches trigger rules
3. Verify file paths in `paths` filter are correct
4. Check GitHub Actions is enabled (Settings → Actions)
5. Wait 1-2 minutes; sometimes there's a delay

### Tests Fail with Authentication Errors

**Problem**: Tests fail with "Invalid username/password"

**Solutions**:

1. Verify secrets are set correctly: `gh secret list`
2. Check credentials are correct for DemoQA
3. Ensure secrets are using correct secret names (exact case)
4. Note: Secrets must be set in the repository, not organization level
5. If credentials changed, update secrets immediately

### Workflow Times Out

**Problem**: Workflow exceeds 30-minute timeout (GitHub limit)

**Solutions**:

1. Run tests in parallel (already implemented)
2. Split tests into smaller batches
3. Check for hanging network requests
4. Review individual test timeout values
5. Consider running UI tests separately

### Node Modules Installation Fails

**Problem**: `npm ci` fails in workflow

**Solutions**:

1. Check `package-lock.json` is committed
2. Verify Node.js version matches `.nvmrc` (if present)
3. Clear npm cache and retry
4. Check for network/registry issues
5. Review recent `package.json` changes

### Reports Not Generated

**Problem**: Test reports not created

**Solutions**:

1. Verify Mochawesome dependency is installed
2. Check `cypress/reports` directory exists
3. Ensure `npm run report:merge` and `npm run report:generate` complete successfully
4. Review script definitions in `package.json`

### Artifacts Not Uploading

**Problem**: Screenshots/videos missing from artifacts

**Solutions**:

1. Verify `screenshotOnRunFailure: true` in cypress.config.js
2. Check artifact paths in workflow match actual paths
3. Ensure tests actually fail (screenshots only on failure)
4. Verify disk space isn't full
5. Check workflow has `if: always()` to run even on failure

### PR Comment Not Posted

**Problem**: Workflow results not commented on PR

**Solutions**:

1. Verify GitHub token has permissions (auto-provided by GitHub)
2. Check `github.event_name` is `pull_request`
3. Ensure `github.event.pull_request.number` is available
4. Check branch is created from a fork (may have token limitations)
5. Review script for syntax errors

---

## Performance Optimization Tips

1. **Use Concurrency Control**
   - Prevents duplicate runs
   - Saves GitHub Actions minutes

2. **Cache Dependencies**
   - Already implemented with `cache: npm`
   - Speeds up installation significantly

3. **Run Tests in Parallel**
   - API, Smoke, and UI tests run simultaneously
   - ~3 minutes total vs ~5 minutes sequential

4. **Conditional Job Execution**
   - Some jobs skip on certain conditions
   - Reduces unnecessary executions

5. **Artifact Retention**
   - Set to 30 days to save storage
   - Delete old artifacts as needed

---

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Cypress GitHub Action](https://github.com/cypress-io/github-action)
- [GitHub Secrets Documentation](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions)
- [YAML Syntax Reference](https://yaml.org/)

---

## Support & Questions

For issues or questions:

1. Check [Troubleshooting](#troubleshooting) section
2. Review workflow files in `.github/workflows/`
3. Check GitHub Actions logs for specific errors
4. Consult project documentation
5. Open an issue on GitHub with detailed information
