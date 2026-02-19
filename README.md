# Jonathan Arteaga Portfolio

Personal portfolio site built with React, TypeScript, Vite, and Tailwind CSS.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Lenis
- Lucide React

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open `http://localhost:3000`.

## Scripts

- `npm run dev`: start Vite dev server
- `npm run build`: type-check and build production bundle
- `npm run preview`: preview the built app
- `npm run lint`: run ESLint with zero warnings allowed
- `npm run type-check`: run TypeScript without emit
- `npm run test`: run Vitest test suite
- `npm run test:coverage`: run Vitest with coverage thresholds
- `npm run knip`: detect unused files, exports, and dependencies

## Quality and CI

GitHub Actions workflows live in `.github/workflows`:

- `quality.yml`: lint, type-check, build, knip, tests + coverage
- `codeql.yml`: static security analysis
- `dependency-review.yml`: dependency risk gate on PRs
- `gitleaks.yml`: secret scanning
- `lighthouse-ci.yml`: performance/accessibility/SEO assertions

## Project Structure

```text
components/   UI components
config/       site constants and metadata
contexts/     React providers (theme, Lenis)
hooks/        reusable hooks
public/       static assets
tests/        Vitest suites
```

## Links

- LinkedIn: https://www.linkedin.com/in/arteagajonathan
- GitHub: https://github.com/jonathan-arteaga
