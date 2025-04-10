# Creating A PLaywright Framework From Scratch

Follow these steps to create a robust playwright from

## Installation

```
npm init playwright@latest
```

## Folder Structure

```
my-app/
├─ node_modules/
├─ tests/
├─ pages/
├─ pages/
├─ data/
├─ .gitignore
├─ package.json
├─ playwright.config.js
├─ README.md
```

## Create common scripts

```
    "test": "npx playwright test",
    "test-on-chrome": "npx playwright test --project=chromium",
    "test-on-firefox": "npx playwright test --project=firefox",
    "test-on-webkit": "npx playwright test --project=webkit",
    "test-on-chrome-debug": "npx playwright test --project=chromium --debug",
    "headed-mode": "npx playwright test --headed",
    "code-gen": "npx playwright codegen"
```

## Modify your config file

```
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [['list'], ['html', { open: 'never' }], ['json', { outputFile: 'report.json' }]],

  use: {
    actionTimeout: 0,
    baseURL: process.env.BASE_URL || 'https://your-staging-url.com',
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshotOnFailure: true,
  },
```
