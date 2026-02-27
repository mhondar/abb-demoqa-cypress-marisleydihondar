# 🚀 Quick Reference - GitHub Actions Workflows

## 📌 At a Glance

| Workflow              | File             | Trigger                           | Use Case                                     |
| --------------------- | ---------------- | --------------------------------- | -------------------------------------------- |
| **Automated CI/CD**   | `cypress.yml`    | Push/PR on main, develop, staging | Automatic test execution on code changes     |
| **Manual E2E Runner** | `demoqa-e2e.yml` | Manual dispatch                   | Custom test runs with specific configuration |

---

## ⚡ Quick Start

### Setup (One-time)

```bash
# 1. Set authentication secrets
gh secret set CYPRESS_USERNAME --body "your_username"
gh secret set CYPRESS_PASSWORD --body "your_password"

# 2. Verify secrets are set
gh secret list
```

### Run Tests Locally (No GitHub needed)

```bash
# Interactive mode
npm run cy:open

# Headless mode
npm run cy:run

# Specific environment
npm run cy:run:qa
npm run cy:run:staging
```

### Run Tests via GitHub Actions

#### Option 1: Automatic (Push to GitHub)

```bash
git add .
git commit -m "Fix: update tests"
git push origin feature-branch
# ✅ Tests run automatically
```

#### Option 2: Manual Workflow Dispatch

```bash
# Via CLI
gh workflow run demoqa-e2e.yml \
  -f environment=qa \
  -f run_target=smoke

# Via GitHub UI
# Actions → DemoQA E2E Tests → Run workflow
```

---

## 🎯 Common Workflows

### API Tests Only

```bash
gh workflow run demoqa-e2e.yml \
  -f environment=qa \
  -f run_target=api
```

### UI Tests Only

```bash
gh workflow run demoqa-e2e.yml \
  -f environment=qa \
  -f run_target=ui
```

### Smoke Tests (Fast)

```bash
gh workflow run demoqa-e2e.yml \
  -f environment=qa \
  -f run_target=smoke
```

### All Tests (Full Suite)

```bash
gh workflow run demoqa-e2e.yml \
  -f environment=qa \
  -f run_target=all
```

### Single Test File

```bash
gh workflow run demoqa-e2e.yml \
  -f environment=qa \
  -f run_target=spec \
  -f spec_file=cypress/e2e/ui/auth.login.cy.js
```

### With Firefox Browser

```bash
gh workflow run demoqa-e2e.yml \
  -f environment=qa \
  -f run_target=all \
  -f browser=firefox
```

### Debug Mode (Headless off)

```bash
gh workflow run demoqa-e2e.yml \
  -f environment=qa \
  -f run_target=smoke \
  -f debug_mode=true
```

### Staging Environment

```bash
gh workflow run demoqa-e2e.yml \
  -f environment=staging \
  -f run_target=all
```

---

## 🔍 Monitoring

```bash
# View recent runs
gh run list --workflow=demoqa-e2e.yml

# Watch latest run (live)
gh run watch $(gh run list --workflow=demoqa-e2e.yml --limit 1 --json databaseId --jq .[0].databaseId)

# View detailed logs
gh run view <RUN_ID> --log

# Download artifacts
gh run download <RUN_ID> --dir ./test-results
```

---

## 📊 What Gets Tested

### Automatic CI/CD (On Every Push/PR)

- ✅ Code quality (ESLint, Prettier)
- ✅ API tests (all 5 test cases)
- ✅ Smoke tests (critical flows)
- ✅ UI tests (complete suite)
- ✅ Report generation

### Manual Dispatch

- ✅ Configurable test selection
- ✅ Environment selection
- ✅ Browser selection
- ✅ Debug mode support

---

## 🔐 Secrets Reference

Required secrets in GitHub repository:

```
Repository → Settings → Secrets and variables → Actions

CYPRESS_USERNAME = your_demoqa_username
CYPRESS_PASSWORD = your_demoqa_password
```

---

## 📈 Typical Runtimes

| Test Type                 | Duration   |
| ------------------------- | ---------- |
| API Tests                 | ~30s       |
| Smoke Tests               | ~45s       |
| UI Tests                  | ~90s       |
| Code Quality              | ~15s       |
| Report Generation         | ~20s       |
| **Full Suite (Parallel)** | **~3 min** |

---

## ✅ Success Indicators

### Workflow Succeeded ✅

- All jobs show green checkmark
- PR gets "ready to merge" status
- Artifacts are available for download
- PR comment shows all tests passed

### Workflow Failed ❌

- Red X on failed job
- Check job logs for error details
- PR is blocked from merging (if required)
- Review failure screenshots in artifacts

---

## 🐛 Common Issues

| Issue                    | Solution                                                      |
| ------------------------ | ------------------------------------------------------------- |
| `Secrets not found`      | Run `gh secret set` for CYPRESS_USERNAME and CYPRESS_PASSWORD |
| `Tests timeout`          | Reduce test scope or check application performance            |
| `Auth failures`          | Verify credentials in secrets are correct                     |
| `No artifacts`           | Check if tests actually ran and results were captured         |
| `Workflow won't trigger` | Verify branch name and file changes match trigger rules       |

---

## 📚 Full Documentation

See [GitHub Actions Guide](./github-actions-guide.md) for:

- Detailed setup instructions
- Troubleshooting guide
- Performance optimization
- Advanced configuration

---

## 🔗 Useful Links

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Cypress GitHub Action](https://github.com/cypress-io/github-action)
- [Repository](https://github.com/mhondar/abb-demoqa-cypress-marisleydihondar)
- [DemoQA Application](https://demoqa.com)
