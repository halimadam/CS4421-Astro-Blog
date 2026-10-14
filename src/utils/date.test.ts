import { describe, it, expect } from 'vitest';
import { formatDate } from './date';

describe('date utilities', () => {
  it('formats a date with numeric day, abbreviated month, and year in Irish format', () => {
    expect(formatDate(new Date('2022-07-08T12:00:00Z'))).toBe('8 Jul 2022');
  });

  it('formats leap days correctly', () => {
    expect(formatDate(new Date('2024-02-29T12:00:00Z'))).toBe('29 Feb 2024');
  });

  it('uses the UTC calendar date regardless of the local timezone', () => {
    expect(formatDate(new Date('2022-07-08T00:30:00Z'))).toBe('8 Jul 2022');
  });
});