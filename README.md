## Project Structure
```
.
├── config/
│   └── appConfig.ts         # central constants (ui_origin, api_base_url)
│
├── controllers/
│   ├── BaseApi.ts           # base class for API logic
│   └── ApiController.ts     # endpoints for JSONPlaceholder
│
├── builders/
│   └── PostBuilder.ts       # builder pattern for PostRequest creation
│
├── pages/
│   ├── BasePage.ts          # base page methods
│   └── TodoPage.ts          # TodoMVC page object
│
├── tests/
│   ├── api/posts.spec.ts    # API test suite
│   └── ui/todo.spec.ts      # UI test suite
│
├── playwright.config.ts     # Playwright configuration
├── package.json
├── tsconfig.json
└── README.md
```

---

## Installation
```bash
npm install
npx playwright install
```

---

## Run Tests

### UI (TodoMVC)
```bash
npm run test:ui
```

### API (JSONPlaceholder)
```bash
npm run test:api
```

### Run all tests
```bash
npm run test
```

### Open HTML report
```bash
npm run report