import { describe, expect, it } from 'vitest';
import { formatearPrecio } from './formatearPrecio';

describe('formatearPrecio', () => {
  it('formatea 4500 como "$ 4.500"', () => {
    expect(formatearPrecio(4500)).toBe('$ 4.500');
  });

  it('formatea números de más de seis cifras', () => {
    expect(formatearPrecio(1234567)).toBe('$ 1.234.567');
  });

  it('formatea cero', () => {
    expect(formatearPrecio(0)).toBe('$ 0');
  });
});
