# Repository Guidelines

## Project Structure & Module Organization
The Vite + React TypeScript app lives in `src/`.
`src/App.tsx` wires ChakraProvider and React Query around `components/Main.tsx`, which owns the page layout and parses the pasted `requirements.txt`.
`components/PackageInfo.tsx` is the only network-aware module and renders fetched metadata inside Chakra cards.
Static artefacts belong in `public/` and vector assets (currently `react.svg`) go under `src/assets/`.
Update shared config in the root files (`tsconfig*.json`, `vite.config.ts`) so the tooling stays consistent.

## Build, Test, and Development Commands
- `yarn install` ensures dependencies in `package.json` are synced.
- `yarn dev` launches the Vite dev server with hot reload at `http://localhost:5173`.
- `yarn build` runs `tsc` for type-checking then creates a production bundle in `dist/`.
- `yarn preview` serves the built bundle locally; run it whenever you touch routing or environment config.

## Coding Style & Naming Conventions
Use TypeScript, 2-space indentation, and `const` + arrow functions for components and helpers.
Components stay in PascalCase files (`Main.tsx`, `PackageInfo.tsx`) and hooks/functions in camelCase (`getPackageNames`, `handlePasteNew`).
Strive for small, focused components that lean on Chakra props for styling instead of custom CSS.
Data fetching should continue to go through React Query so caching, retries, and loading states remain uniform.

## Testing Guidelines
Automated tests are not yet configured; when adding behavior, create deterministic helpers (e.g., refactor parsing utilities) so they can be unit-tested with Vitest/React Testing Library once introduced.
Until a test runner lands, manually verify flows by exercising `yarn dev`, submitting multiple package lists, and simulating error states (typos, empty values) to cover the Chakra UI branches.
Document any new testing commands in `package.json`.

## Commit & Pull Request Guidelines
Match the existing short, imperative commits (`readme`, `error handle and stuff`, `style edit`); keep scope small and focused on one change.
Reference issues in the commit body or PR description, describe the user-facing impact, and include screenshots or terminal logs when UI or CLI output changes.
Every PR should mention how it was tested (commands run or scenarios covered) and call out any follow-up work.

## API & Configuration Notes
`PackageInfo` hits the public PyPI JSON API via axios; throttle requests by reusing React Query keys and keep network logic in that component or dedicated hooks.
Do not commit secrets; there are currently no env vars, so add `VITE_`-prefixed entries to `.env` and update `.gitignore` if configuration needs expand.
