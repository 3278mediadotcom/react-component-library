import { useEffect, useState } from 'react';
import { ThemeProvider } from './providers/ThemeProvider';
import { useTheme } from './hooks/useTheme';
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
import { Skeleton } from './components/Skeleton';
import { Avatar } from './components/Avatar';
import { AvatarGroup } from './components/AvatarGroup';
import { Progress } from './components/Progress';
import { EmptyState } from './components/EmptyState';
import { Accordion } from './components/Accordion';
import { DataTable, type DataTableProps } from './components/DataTable';
import { Table, TableHeaderCell, TableCell } from './components/Table';
import { Divider } from './components/Divider';
import { Stack } from './components/Stack';
import { Grid } from './components/Grid';

const FRUITS = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
];

const SECTION_CLASS = 'mt-16';
const HEADING_CLASS = 'text-2xl font-bold';

type TextFormat = 'bold' | 'italic' | 'underline';

const QUICK_ACTIONS: { label: string; format: TextFormat }[] = [
  { label: 'Bold', format: 'bold' },
  { label: 'Italic', format: 'italic' },
  { label: 'Underline', format: 'underline' },
];

interface TeamMember {
  id: number;
  name: string;
  role: string;
  location: string;
}

const TEAM: TeamMember[] = [
  { id: 1, name: 'Ada Lovelace', role: 'Analyst', location: 'London' },
  { id: 2, name: 'Grace Hopper', role: 'Engineer', location: 'New York' },
  { id: 3, name: 'Katherine Johnson', role: 'Mathematician', location: 'Hampton' },
];

const TEAM_COLUMNS: DataTableProps<TeamMember>['columns'] = [
  { key: 'id', header: 'ID', width: '48px' },
  { key: 'name', header: 'Name' },
  { key: 'role', header: 'Role' },
  { key: 'location', header: 'Location' },
];

const EXTRA_DEMO_ITEMS = [
  {
    value: 'what',
    header: 'What is this?',
    content:
      'These components were not present on the page before you clicked "Load additional components".',
  },
  {
    value: 'spinner',
    header: 'Why does loading show a spinner?',
    content:
      'The Spinner renders while the simulated async import is pending, then these components mount.',
  },
  {
    value: 'source',
    header: 'Can I see the source?',
    content: 'Each component ships with tests, a Storybook story, and a README in src/components.',
  },
];

/** Components rendered after the simulated "load additional components" action. */
function ExtraComponentsDemo() {
  const [phase, setPhase] = useState<'loading' | 'ready'>('loading');

  useEffect(() => {
    const timer = window.setTimeout(() => setPhase('ready'), 1400);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="mt-8 space-y-8" aria-label="Additional components loaded" aria-busy={phase === 'loading'}>
      <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
        {phase === 'loading'
          ? 'Loading the additional components…'
          : 'Additional components from the library:'}
      </p>

      {phase === 'loading' ? (
        /* Skeleton placeholders shown while the content "loads", then replaced. */
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <Skeleton variant="button" />
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="80%" />
          </div>
          <div className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <Skeleton variant="avatar" />
            <div className="flex-1 space-y-2">
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="40%" />
            </div>
          </div>
          <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <Skeleton variant="card" />
          </div>
          <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <Skeleton variant="text" width="50%" />
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="90%" />
            <Skeleton variant="text" width="70%" />
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Avatar</p>
              <Avatar initials="AL" status="online" label="Ada Lovelace" />
              <Avatar initials="GH" status="away" label="Grace Hopper" />
              <AvatarGroup
                items={[
                  { initials: 'AL', name: 'Ada Lovelace' },
                  { initials: 'GH', name: 'Grace Hopper' },
                  { initials: 'KJ', name: 'Katherine Johnson' },
                ]}
              />
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <p className="mb-3 text-sm font-semibold text-slate-900 dark:text-slate-100">Progress</p>
              <Progress value={65} showValue label="Uploading assets" />
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <p className="mb-3 text-sm font-semibold text-slate-900 dark:text-slate-100">EmptyState</p>
              <EmptyState
                title="No results yet"
                description="Create your first record to see it here."
                layout="horizontal"
                action={<Button size="sm">Create record</Button>}
              />
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <p className="mb-3 text-sm font-semibold text-slate-900 dark:text-slate-100">Accordion</p>
              <Accordion items={EXTRA_DEMO_ITEMS} type="single" />
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <p className="mb-3 text-sm font-semibold text-slate-900 dark:text-slate-100">DataTable</p>
            <DataTable columns={TEAM_COLUMNS} rows={TEAM} label="Team" size="sm" />
          </div>
        </div>
      )}
    </div>
  );
}

function FeedbackDemo() {
  const toast = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeFormats, setActiveFormats] = useState<Record<TextFormat, boolean>>({
    bold: false,
    italic: false,
    underline: false,
  });

  const toggleFormat = (format: TextFormat) => {
    setActiveFormats((prev) => {
      const next = { ...prev, [format]: !prev[format] };
      toast.info({
        title: `Quick action: ${format}`,
        content: next[format] ? 'Formatting enabled.' : 'Formatting disabled.',
      });
      return next;
    });
  };

  const previewStyle: React.CSSProperties = {
    fontWeight: activeFormats.bold ? 700 : 400,
    fontStyle: activeFormats.italic ? 'italic' : 'normal',
    textDecoration: activeFormats.underline ? 'underline' : 'none',
  };

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
          closeOnItemClick
          content={
            <div className="flex w-44 flex-col gap-1">
              {QUICK_ACTIONS.map(({ label, format }) => (
                <button
                  key={format}
                  type="button"
                  onClick={() => toggleFormat(format)}
                  className="rounded px-3 py-1.5 text-left text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  {label}
                </button>
              ))}
            </div>
          }
        >
          <Button variant="outline">Quick actions</Button>
        </Popover>
        <p
          aria-label="Formatted text preview"
          className="w-full max-w-md rounded-md border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
          style={previewStyle}
        >
          Select a quick action to apply formatting to this text.
        </p>
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
        <Showcase />
      </ToastProvider>
    </ThemeProvider>
  );
}

function Showcase() {
  const { mode, setMode } = useTheme();
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadedSections, setLoadedSections] = useState(false);

  const loadMore = () => {
    if (loadingMore) return;
    setLoadingMore(true);
    window.setTimeout(() => {
      setLoadingMore(false);
      setLoadedSections(true);
    }, 1600);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100">
          <main className="mx-auto w-full max-w-5xl px-6 py-16">
            {/* Hero */}
            <section className="text-center">
              <Badge variant="primary" pill className="mb-6">
                29 production components · v1.0
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
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                              Current plan
                            </p>
                            <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">
                              Pro
                            </p>
                            <div className="mt-3 flex items-center gap-2">
                              <Badge variant="success" dot>
                                Active
                              </Badge>
                              <Badge variant="secondary">Renews Aug 28</Badge>
                            </div>
                          </div>
                          <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                              Team
                            </p>
                            <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">
                              8 members
                            </p>
                            <div className="mt-3 flex items-center gap-2">
                              <Badge variant="info" pill>
                                3 admins
                              </Badge>
                              <Badge variant="secondary">5 editors</Badge>
                            </div>
                          </div>
                        </div>
                      ),
                    },
                    {
                      value: 'activity',
                      label: 'Activity',
                      content: (
                        <ul className="space-y-3">
                          {[
                            {
                              who: 'Ada Lovelace',
                              what: 'updated the billing details',
                              when: '2 hours ago',
                            },
                            {
                              who: 'Grace Hopper',
                              what: 'deployed a new component version',
                              when: 'yesterday',
                            },
                            {
                              who: 'Katherine Johnson',
                              what: 'invited Marie to the team',
                              when: '3 days ago',
                            },
                          ].map((item) => (
                            <li
                              key={item.when}
                              className="flex items-start justify-between gap-4 rounded-lg border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900"
                            >
                              <p className="text-sm text-slate-900 dark:text-slate-100">
                                <span className="font-semibold">{item.who}</span> {item.what}
                              </p>
                              <span className="shrink-0 text-xs text-slate-400 dark:text-slate-500">
                                {item.when}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ),
                    },
                    {
                      value: 'settings',
                      label: 'Settings',
                      content: (
                        <div className="grid gap-4 sm:grid-cols-2">
                          <Select
                            options={FRUITS}
                            label="Language"
                            defaultValue="cherry"
                            aria-label="Language"
                          />
                          <Input label="Display name" placeholder="Ada Lovelace" />
                          <div className="flex flex-col gap-3 sm:col-span-2">
                            <Switch label="Email notifications" defaultChecked />
                            <Switch label="Weekly digest" />
                          </div>
                        </div>
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
                  <Switch
                    label="Dark mode"
                    checked={mode === 'dark'}
                    onCheckedChange={(checked) => setMode(checked ? 'dark' : 'light')}
                  />
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
              <div className="mt-6 flex flex-wrap items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                {loadingMore ? (
                  <>
                    <Spinner size="sm" />
                    <span className="text-sm text-slate-600 dark:text-slate-300">
                      Loading additional components…
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-sm text-slate-600 dark:text-slate-300">
                      {loadedSections
                        ? 'Loaded. See the additional components below.'
                        : 'Load the remaining components from the library to see them below.'}
                    </span>
                    {loadedSections ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setLoadedSections(false);
                          const status = document.getElementById('status');
                          if (status) status.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        Reset
                      </Button>
                    ) : (
                      <Button size="sm" onClick={loadMore}>
                        Load additional components
                      </Button>
                    )}
                  </>
                )}
              </div>

              {loadedSections && <ExtraComponentsDemo />}
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

              {/* Stack, Grid, Divider, and the base Table (distinct from DataTable). */}
              <div className="mt-6">
                <Stack direction="row" spacing="sm" wrap>
                  <Badge variant="primary">Stack row</Badge>
                  <Badge variant="secondary">spacing sm</Badge>
                  <Badge variant="info">wrap</Badge>
                  <Badge variant="success">renders flex</Badge>
                </Stack>

                <div className="mt-6">
                  <Divider>Divider with label</Divider>
                </div>

                <Grid columns={3} gap="md" className="mt-6">
                  <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                    Grid column 1
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                    Grid column 2
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                    Grid column 3
                  </div>
                </Grid>

                <div className="mt-6 rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
                  <Table striped hover>
                    <caption className="sr-only">Team roster</caption>
                    <thead>
                      <tr>
                        <TableHeaderCell>Name</TableHeaderCell>
                        <TableHeaderCell>Role</TableHeaderCell>
                        <TableHeaderCell>Status</TableHeaderCell>
                      </tr>
                    </thead>
                    <tbody>
                      {TEAM.map((member) => (
                        <tr key={member.id}>
                          <TableCell>{member.name}</TableCell>
                          <TableCell>{member.role}</TableCell>
                          <TableCell>{member.location}</TableCell>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            </section>

            <footer className="mt-20 border-t border-slate-200 pt-8 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
              Built with React, TypeScript, Tailwind CSS, and Storybook.
            </footer>
          </main>
        </div>
  );

  function go(target: string) {
    const el = document.getElementById(target);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
}
