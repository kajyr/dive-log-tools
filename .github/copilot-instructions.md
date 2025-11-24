# GitHub Copilot Instructions

## Commit Message Convention

**Always use conventional commits** when creating commit messages. Follow the format:

```
<type>(<optional scope>): <description>

[optional body]

[optional footer]
```

### Commit Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (formatting, missing semicolons, etc.)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `build`: Changes that affect the build system or external dependencies
- `ci`: Changes to CI configuration files and scripts
- `chore`: Other changes that don't modify src or test files

### Examples

```
feat: add support for new dive computer format
fix: correct depth calculation in samples
docs: update README with installation instructions
chore: release v1.2.3
```

## Code Style

- This project uses TypeScript with strict type checking
- Follow the existing code formatting enforced by Prettier
- Use ESLint for code quality checks
- Run `npm run lint` to check for linting issues
- Run `npm test` to execute the test suite

## Project Structure

- This is a monorepo with workspaces:
  - `importer`: Dive log import functionality
  - `templates`: Template generation functionality
- Always run `npm run build` before testing to compile TypeScript
- Ensure all tests pass before committing (`npm test`)
