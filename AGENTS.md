# AGENTS.md - Agentic Coding Guidelines

Repository-specific guidance for coding agents. Based on research showing that minimal, high-signal guidance is most effective.

## Commands

```bash
npm run build              # Build all workspaces
npm test -- <path>        # Run single test file (e.g., importer/src/formats.test.ts)
npm run lint              # Check linting issues
```

## Tools & Setup

- **Package Manager**: npm (workspaces: importer, templates)
- **Test Runner**: Jest (finds `**/*.test.ts`)
- **Type Checking**: TypeScript with strict mode enabled
- **Code Formatter**: Prettier (120 char line width, single quotes)

## Naming Conventions

- **Functions**: camelCase - `diveExitTime`, `normalizeVisibility`
- **Constants**: UPPER_SNAKE_CASE - `VISIBILITY_POOR`
- **Files**: kebab-case - `dive-exit-time.ts`
- **Directories**: kebab-case or atomic design pattern - `atoms/`, `molecules/`, `neutrons/`

## Known Pitfalls

- **Monorepo**: Two workspaces (importer, templates). Use `-ws` flag: `npm run build -ws`
- **Strict TypeScript**: No implicit any allowed. All functions need type annotations.
- **Pre-commit Hooks**: Husky + lint-staged run before commits. Tests must pass.
- **Test Coverage**: Generated tests should pass on patched code and fail on base code.

## Config Files (Source of Truth)

- `.prettierrc` - Import ordering, quotes, line width
- `tsconfig.json` - Strict mode, target ES2018, CommonJS modules
- `jest.config.js` - Test patterns and environment
- `eslint.config.js` - TypeScript rules and prettier integration

## Key References

- Commit conventions: See `.github/copilot-instructions.md`
- For code examples of conventions: Check `importer/src/dive.ts` and `templates/src/neutrons/`
