import { describe, expect, it } from 'vitest';
import { filterRows, getCellValue, toCsv } from './dataTableUtils';
import type { DataTableColumn } from './DataTable.types';

interface User {
  id: number;
  name: string;
  age: number;
  active: boolean;
}

const COLUMNS: DataTableColumn<User>[] = [
  { key: 'id', header: 'ID' },
  { key: 'name', header: 'Name' },
  { key: 'age', header: 'Age' },
  { key: 'active', header: 'Active' },
];

const ROWS: User[] = [
  { id: 1, name: 'Alice', age: 34, active: true },
  { id: 2, name: 'Bob', age: 25, active: false },
  { id: 3, name: 'Carol', age: 41, active: true },
];

describe('dataTableUtils', () => {
  describe('getCellValue', () => {
    it('returns the raw row value when no renderer is provided', () => {
      expect(getCellValue(ROWS[0], COLUMNS[0])).toBe(1);
    });

    it('uses the renderer when provided', () => {
      const column: DataTableColumn<User> = {
        key: 'name',
        header: 'Name',
        render: (row) => row.name.toUpperCase(),
      };
      expect(getCellValue(ROWS[0], column)).toBe('ALICE');
    });
  });

  describe('filterRows', () => {
    it('returns all rows when no filters or search are active', () => {
      expect(filterRows(ROWS, COLUMNS, {}, '')).toHaveLength(3);
    });

    it('filters by a per-column value (case-insensitive)', () => {
      const result = filterRows(ROWS, COLUMNS, { name: 'alice' }, '');
      expect(result).toEqual([ROWS[0]]);
    });

    it('applies multiple column filters as AND', () => {
      const result = filterRows(ROWS, COLUMNS, { active: 'true', age: '34' }, '');
      expect(result).toEqual([ROWS[0]]);
    });

    it('matches the global search across columns', () => {
      const result = filterRows(ROWS, COLUMNS, {}, 'carol');
      expect(result).toEqual([ROWS[2]]);
    });

    it('applies global search AND column filters together', () => {
      const result = filterRows(ROWS, COLUMNS, { active: 'true' }, 'alice');
      expect(result).toEqual([ROWS[0]]);
    });

    it('ignores blank filter values', () => {
      const result = filterRows(ROWS, COLUMNS, { name: '  ', age: '' }, '');
      expect(result).toHaveLength(3);
    });

    it('returns an empty array when nothing matches', () => {
      const result = filterRows(ROWS, COLUMNS, { name: 'zebra' }, '');
      expect(result).toEqual([]);
    });
  });

  describe('toCsv', () => {
    it('writes a header row from column keys', () => {
      const csv = toCsv(COLUMNS, ROWS);
      const [header] = csv.split('\n');
      expect(header).toBe('id,name,age,active');
    });

    it('writes one line per row', () => {
      const csv = toCsv(COLUMNS, ROWS);
      expect(csv.split('\n')).toHaveLength(4);
    });

    it('quotes cells containing commas', () => {
      const column: DataTableColumn<{ name: string }>[] = [{ key: 'name', header: 'Name' }];
      const csv = toCsv(column, [{ name: 'Doe, Jane' }]);
      expect(csv).toBe('name\n"Doe, Jane"');
    });

    it('quotes cells containing double quotes', () => {
      const column: DataTableColumn<{ name: string }>[] = [{ key: 'name', header: 'Name' }];
      const csv = toCsv(column, [{ name: 'Say "hi"' }]);
      expect(csv).toBe('name\n"Say ""hi"""');
    });

    it('omits excluded columns', () => {
      const csv = toCsv(COLUMNS, ROWS, ['age']);
      const [header] = csv.split('\n');
      expect(header).toBe('id,name,active');
    });
  });
});
