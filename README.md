# python-requirements-info

A small frontend app for parsing, inspecting, and visualizing Python `requirements.txt` files. Built with Vite + React + TypeScript, this project helps you review dependency lists, see pinned versions, and fetch package metadata from PyPI.

---

## Quick Overview

- Purpose: Quickly parse and inspect dependency lists supplied in `requirements.txt`-style format. Useful for code reviews, quick checks, and dependency audits.
- Stack: Vite, React, TypeScript, Chakra UI, Axios, React Query.
- Main features: parsing packages (name + version), showing PyPI metadata, and presenting the information in a card-based UI.

## Features

- Parse `requirements.txt`-style input (name==version, name>=version, name, etc.)
- Display package name and version (if pinned) and other metadata
- Lightweight UI using Chakra UI with accessible components
- Fetch metadata via PyPI JSON API using `axios` and `react-query`

## Quick start

Prerequisites: Node.js (v16+ recommended) and your preferred package manager (npm, pnpm, or yarn).

Install dependencies:

```powershell
npm install
```

Run the dev server (Hot Reload with Vite):

```powershell
npm run dev
```

Build for production:

```powershell
npm run build
```

Preview a production build locally:

```powershell
npm run preview
```

If you use yarn or pnpm, replace `npm` with your package manager's commands (e.g. `yarn dev`, `pnpm dev`).

## How to use

1. Start the dev server.
2. Open the app in your browser (Vite will usually show `http://localhost:5173`).
3. Paste a `requirements.txt`-style list into the input on the main screen.
4. The UI parses package names and versions and displays a card for each package. The app fetches PyPI JSON metadata and shows package details.

## Project structure

- `index.html` — Vite entry
- `package.json` — project metadata and scripts
- `src/` — source code
  - `App.tsx` — top-level application wiring
  - `main.tsx` — mounts the app
  - `components/` — UI and logic components
    - `Main.tsx` — primary view and input parsing
    - `PackageInfo.tsx` — package detail card that fetches metadata
  - `assets/` — static assets such as images

Refer to `AGENTS.md` for repository guidelines on structure and development workflow.

## Dev notes & Implementation details

- Network requests for PyPI metadata are done in `PackageInfo.tsx` using `axios` and `react-query`; maintain throttling/caching via query keys.
- The parsing logic is in `Main.tsx` (or a parsing helper). Keep the parser small and deterministic to make it testable.
- UI styling primarily uses Chakra UI props for consistent design and accessibility.

## Testing

No tests are included yet. Recommended additions:

- Unit tests for parsing logic with Vitest or Jest + React Testing Library
- Snapshot tests for rendering complex package info cards
- Integration tests for network calls (mock PyPI responses for deterministic tests)

## Contributing

Contributions are welcome. If you want to contribute:

1. Fork the repository.
2. Create a branch for a single concern (feature, bugfix).
3. Write tests for new behaviour.
4. Open a PR with a clear description and a short test plan.

Please follow existing TypeScript + React code conventions (2-space indentation, PascalCase for components, `const` where appropriate).

## Open next steps (optional tasks I can do for you)

- Add a `requirements.txt` sample and an importer UI
- Create unit tests for parsing and package UI components
- Add a basic CI workflow (GitHub Actions) and a test runner
- Add an `MIT` license file and a `CONTRIBUTING.md` template

---

If you'd like, I can implement one of the optional tasks above—tell me which and I’ll proceed.
