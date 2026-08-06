import { describe, expect, it } from 'vitest';
import { classNames } from './classNames';

describe('classNames', () => {
  it('returns an empty string for no arguments', () => {
    expect(classNames()).toBe('');
  });

  it('joins string arguments', () => {
    expect(classNames('a', 'b', 'c')).toBe('a b c');
  });

  it('filters falsy values including zero and NaN', () => {
    expect(classNames('a', false, undefined, null, 0, NaN, 'b')).toBe('a b');
  });

  it('includes object keys whose value is truthy', () => {
    expect(classNames('btn', { 'btn--active': true, 'btn--disabled': false })).toBe(
      'btn btn--active',
    );
  });

  it('handles nested arrays', () => {
    expect(classNames(['a', ['b', ['c']]], 'd')).toBe('a b c d');
  });

  it('trims surrounding whitespace of the final result', () => {
    expect(classNames('  a  ')).toBe('a');
    expect(classNames(' a ', ' b ')).toBe('a   b');
  });
});
