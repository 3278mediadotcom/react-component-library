import { useState } from 'react';
import { ThemeProvider } from './providers/ThemeProvider';
import { Button } from './components/Button';
import { Input } from './components/Input';
import { Card } from './components/Card';
import { Badge } from './components/Badge';
import { Spinner } from './components/Spinner';
import { Checkbox } from './components/Checkbox';
import { Switch } from './components/Switch';
import { RadioGroup } from './components/RadioGroup';
import { Breadcrumb } from './components/Breadcrumb';
import { Pagination } from './components/Pagination';
import { Tabs } from './components/Tabs';
import { Select } from './components/Select';
import { Alert } from './components/Alert';
import { ToastProvider, useToast } from './components/Toast';
import { Modal } from './components/Modal';
import { Drawer } from './components/Drawer';
import { Tooltip } from './components/Tooltip';
import { Popover } from './components/Popover';

const FRUITS = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
];

const SECTION_CLASS = 'mt-16';
const HEADING_CLASS = 'text-2xl font-bold';

function FeedbackDemo() {
  const toast = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <Button
          variant="success"
          onClick={() => toast.success({ title: 'Saved', content: 'Changes saved successfully.' })}
        >
          Success toast
        </Button>
        <Button
          variant="danger"
          onClick={() => toast.error({ title: 'Failed', content: 'Something went wrong.' })}
        >
          Error toast
        </Button>
        <Button onClick={() => setModalOpen(true)}>Open modal</Button>
        <Button variant="outline" onClick={() => setDrawerOpen(true)}>
          Open drawer
        </Button>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-6">
        <Tooltip content="Deletes permanently" placement="top">
          <Button variant="danger">Hover me</Button>
        </Tooltip>
        <Popover
          placement="bottom"
          aria-label="Quick actions"
          content={
            <div className="flex w-44 flex-col gap-1">
              {['Bold', 'Italic', 'Underline'].map((item) => (
                <button
                  key={item}
                  className="rounded px-3 py-1.5 text-left text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  {item}
                </button>
              ))}
            </div>
          }
        >
          <Button variant="outline">Quick actions</Button>
        </Popover>
      </div>

      <div className="mt-6 space-y-3">
        <Alert variant="info" title="Heads up">
          This is an informational alert.
        </Alert>
        <Alert variant="success" title="Saved">
          Your profile was updated.
        </Alert>
        <Alert variant="warning" title="Almost there">
          You have unsaved changes.
        </Alert>
        <Alert variant="danger" title="Deletion failed" dismissible onDismiss={() => undefined}>
          Try again.
        </Alert>
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Settings"
        description="Manage your preferences."
      >
        <div className="text-sm text-slate-600 dark:text-slate-300">
          <p>
            Modal content demonstrates portals, focus traps, scroll lock, and Escape/backdrop
            dismissal.
          </p>
          <div className="mt-4 flex gap-3">
            <Button onClick={() => setModalOpen(false)}>Close</Button>
            <Button variant="secondary">Save</Button>
          </div>
        </div>
      </Modal>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} placement="right" title="Cart">
        <div className="text-sm text-slate-600 dark:text-slate-300">
          <p>Drawer content with focus management and slide-in animation.</p>
          <Button className="mt-4" onClick={() => setDrawerOpen(false)}>
            Close drawer
          </Button>
        </div>
      </Drawer>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <div className="min-h-screen bg-slate-50 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100">
          <main className="mx-auto w-full max-w-5xl px-6 py-16">
            {/* Hero */}
            <section className="text-center">
              <Badge variant="primary" pill className="mb-6">
                18 production components · v0.3
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                React Component Library
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                Accessible, tested React components built with TypeScript, Tailwind CSS, and modern
                frontend engineering practices.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button onClick={() => go('feedback')}>Overlays</Button>
                <Button variant="outline" onClick={() => go('navigation')}>
                  Navigation
                </Button>
              </div>
            </section>

            {/* Feedback */}
            <section id="feedback" className={SECTION_CLASS}>
              <h2 className={HEADING_CLASS}>Feedback & Overlays</h2>
              <div className="mt-6">
                <FeedbackDemo />
              </div>
            </section>

            {/* Navigation */}
            <section id="navigation" className={SECTION_CLASS}>
              <h2 className={HEADING_CLASS}>Navigation</h2>
              <div className="mt-6">
                <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Components' }]} />
              </div>
              <div className="mt-6">
                <Tabs
                  label="Showcase tabs"
                  items={[
                    {
                      value: 'overview',
                      label: 'Overview',
                      content: (
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          Tab one content.
                        </p>
                      ),
                    },
                    {
                      value: 'activity',
                      label: 'Activity',
                      content: (
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          Tab two content with more detail.
                        </p>
                      ),
                    },
                    {
                      value: 'settings',
                      label: 'Settings',
                      content: (
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          Tab three content.
                        </p>
                      ),
                    },
                  ]}
                />
              </div>
              <div className="mt-6">
                <Pagination pageCount={15} defaultPage={8} />
              </div>
            </section>

            {/* Forms */}
            <section id="forms" className={SECTION_CLASS}>
              <h2 className={HEADING_CLASS}>Forms</h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <Input label="Email" type="email" placeholder="ada@analytical.engine" />
                <Select
                  options={FRUITS}
                  label="Favorite fruit"
                  required
                  placeholder="Select a fruit"
                  clearable
                />
              </div>
              <div className="mt-6 flex flex-wrap items-start gap-8">
                <RadioGroup
                  name="plan"
                  label="Billing plan"
                  options={[
                    { value: 'starter', label: 'Starter' },
                    { value: 'pro', label: 'Pro' },
                    { value: 'enterprise', label: 'Enterprise', disabled: true },
                  ]}
                  defaultValue="pro"
                />
                <div className="flex flex-col gap-3">
                  <Checkbox label="Accept terms of service" />
                  <Checkbox label="Subscribe to newsletter" defaultChecked />
                  <Switch label="Dark mode" defaultChecked />
                </div>
              </div>
            </section>

            {/* Status */}
            <section id="status" className={SECTION_CLASS}>
              <h2 className={HEADING_CLASS}>Status</h2>
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
              <div className="mt-6 flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                <Spinner size="sm" />
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  Loading additional components…
                </span>
              </div>
            </section>

            {/* Cards */}
            <section className={SECTION_CLASS}>
              <h2 className={HEADING_CLASS}>Layout</h2>
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
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Last 30 days
                      </p>
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
            </section>

            <footer className="mt-20 border-t border-slate-200 pt-8 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
              Built with React, TypeScript, Tailwind CSS, and Storybook.
            </footer>
          </main>
        </div>
      </ToastProvider>
    </ThemeProvider>
  );

  function go(target: string) {
    const el = document.getElementById(target);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
}
