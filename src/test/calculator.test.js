import { describe, expect, it } from '@jest/globals';
import { calculate } from '../calculator';

describe('calculate', () => {
  it('calculate a array', () => {
    const input =[10, 3, -4, 1, 8, 0];

    const stats = calculate(input);
    expect(stats).toStrictEqual({
    'Frávik': 22.667,
    'Hæsta gild': 10,
    'Meðaltal': 3,
    'Miðgildi': 2,
    'Minnsta gildi': -4,
    'Staðalfrávik': 4.761,
    'Summa': 18,
    'Svið': 14
    }
    );
  });
  it('calculate a one value array', () => {
    const input =[3];

    const stats = calculate(input);
    expect(stats).toStrictEqual({
    'Frávik': 0,
    'Hæsta gild': 3,
    'Meðaltal': 3,
    'Miðgildi': 3,
    'Minnsta gildi': 3,
    'Staðalfrávik': 0,
    'Summa': 3,
    'Svið': 0
    }
    );
  });
});
