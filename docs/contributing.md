# Contributing

Thanks for contributing to the React Component Library! This guide will help
you get up and running.

## Prerequisites

- Node.js 18+ (the project is developed against Node 20/22)
- npm 9+

## Getting started

```bash
npm install
npm run dev
```

## Development workflow

1. **Create a branch** for your change:

   ```bash
   git checkout -b feat/my-component
   ```

2. **Add a component** by copying the structure of an existing one:

   ```text
   src/components/MyComponent/
     MyComponent.tsx        # Implementation
     MyComponent.types.ts   # Props interface
     MyComponent.test.tsx   # Unit tests
     MyComponent.stories.tsx # Storybook stories
     index.ts               # Public entry
   ```

3. **Write tests first** for the behavior you're adding. All tests must pass:

   ```bash
   npm run test
   ```

4. **Add stories** so the component is documented visually and can be
   exercised in the browser:

   ```bash
   npm run storybook
   ```

5. **Keep it lint clean**:

   ```bash
   npm run lint
   npm run format
   ```

6. **Verify the build**:

   ```bash
   npm run build
   ```

## Code standards

- TypeScript strict mode is enabled; the build runs `tsc -b` so type errors
  fail the build.
- Components extend native HTML props for the underlying element.
- Prefer `classNames` over template-string className composition.
- Keep component APIs small. If a prop can be derived, derive it.
- Accessibility: components must be operable by keyboard, expose correct
  ARIA, and never fail the Storybook a11y addon.
- Design tokens belong in `src/constants/`; do not hardcode colors or spacing
  inside component files.

## Commit messages

Use descriptive, imperative commit messages:

```text
feat(button): add size variants and loading state
fix(input): announce aria-invalid when error is present
docs: expand theming documentation
```

## Pull requests

Before opening a PR:

- [ ] `npm run lint` passes
- [ ] `npm run test` passes
- [ ] `npm run build` passes
- [ ] `npm run build-storybook` passes (CI runs all four)
- [ ] The new component has tests, stories, and an `index.ts`

CI runs automatically on every PR; a green CI is required to merge.
