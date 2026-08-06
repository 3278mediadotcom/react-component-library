/**
 * Shared, framework-agnostic types used across the component library.
 */
import type * as React from 'react';

/** Standard HTML element props are extended by every component. */
export type PolymorphicRef<Element extends React.ElementType> =
  React.ComponentPropsWithRef<Element>['ref'];

/** Base props every component in the library accepts. */
export interface BaseProps {
  /** Additional CSS class names applied to the root element. */
  className?: string;
}

/** All standard SVG presentation attributes. */
export type SvgProps = React.SVGProps<SVGSVGElement>;

/** Value for the standard `data-testid` attribute. */
export type TestId = string;

/** A standard mouse/keyboard/pointer event handler. */
export type EventHandler<E extends React.SyntheticEvent> = (event: E) => void;
