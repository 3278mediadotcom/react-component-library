import { ThemeProvider } from './providers/ThemeProvider';
import { Button } from './components/Button';
import { Input } from './components/Input';
import { Card } from './components/Card';
import { Badge } from './components/Badge';
import { Spinner } from './components/Spinner';

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-slate-50 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100">
        <main className="mx-auto w-full max-w-5xl px-6 py-16">
          {/* Hero */}
          <section className="text-center">
            <Badge variant="primary" pill className="mb-6">
              Foundation components · v0.1
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              React Component Library
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              Production-ready React components built with TypeScript, accessibility, and testing.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button
                onClick={() => go('input')}
                leftIcon={
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                }
              >
                Get started
              </Button>
              <Button variant="outline" onClick={() => go('badges')}>
                Browse components
              </Button>
            </div>
          </section>

          {/* Input example */}
          <section id="input" className="mt-20">
            <h2 className="text-2xl font-bold">Input</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <Input label="Name" placeholder="Ada Lovelace" helperText="Your display name." />
              <Input
                label="Email"
                type="email"
                required
                defaultValue="ada@analytical.engine"
                error="Please enter a valid email address."
              />
            </div>
          </section>

          {/* Badge examples */}
          <section id="badges" className="mt-20">
            <h2 className="text-2xl font-bold">Badges</h2>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Badge variant="primary">Primary</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="success" dot>
                Live
              </Badge>
              <Badge variant="warning">Pending</Badge>
              <Badge variant="danger">Failed</Badge>
              <Badge variant="info" pill>
                Info
              </Badge>
            </div>
          </section>

          {/* Card + Spinner examples */}
          <section className="mt-20">
            <h2 className="text-2xl font-bold">Cards & Spinner</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <Card
                title="Pro plan"
                subtitle="For growing teams"
                footer={<Button fullWidth>Upgrade</Button>}
              >
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Unlimited projects, team collaboration, and priority support.
                </p>
              </Card>
              <Card variant="elevated" hoverable>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                      Revenue
                    </h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Last 30 days</p>
                  </div>
                  <Badge variant="success" dot>
                    +12.5%
                  </Badge>
                </div>
                <p className="mt-6 text-3xl font-bold text-slate-900 dark:text-slate-100">
                  $48,290
                </p>
              </Card>
            </div>
            <div className="mt-6 flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <Spinner size="sm" />
              <span className="text-sm text-slate-600 dark:text-slate-300">
                Loading component examples…
              </span>
            </div>
          </section>

          <footer className="mt-20 border-t border-slate-200 pt-8 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
            Built with React, TypeScript, Tailwind CSS, and Storybook.
          </footer>
        </main>
      </div>
    </ThemeProvider>
  );

  function go(target: string) {
    const el = document.getElementById(target);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
}
