/**
 * Shared component-level types.
 *
 * These describe common visual variants and sizes so every component
 * stays consistent (extend them per-component as needed).
 */

export type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

export type Size = 'sm' | 'md' | 'lg';

/** Semantic tone used by surface components (Badge, Card, Alert). */
export type Tone = 'neutral' | 'info' | 'success' | 'warning' | 'danger';
