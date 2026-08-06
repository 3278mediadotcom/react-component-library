import { ThemeProvider } from './providers/ThemeProvider';

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-slate-50 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100">
        <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center px-6 py-16 text-center">
          <p className="mb-4 rounded-full border border-slate-200 bg-white px-4 py-1 text-sm font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
            Phase 0 — Foundation complete
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">react-component-library</h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            Production-ready React components built with TypeScript, accessibility, testing,
            Storybook, and modern frontend engineering practices.
          </p>

          <nav
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
            aria-label="Resources"
          >
            <a
              href="http://localhost:6006"
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Storybook
            </a>
            <a
              href="/docs/architecture.md"
              className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Architecture
            </a>
            <a
              href="https://github.com/3278mediadotcom/react-component-library"
              className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              GitHub
            </a>
          </nav>

          <footer className="mt-16 text-sm text-slate-500 dark:text-slate-400">
            Components land in Phase 1.
          </footer>
        </main>
      </div>
    </ThemeProvider>
  );
}
