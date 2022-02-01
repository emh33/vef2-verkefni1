import { describe, expect, it } from '@jest/globals';
import { parse } from '../parser';

describe('parser', () => {
  it('parses a number', () => {
    const input ='123';

    const parsed = parse(input);
    expect(parsed).toStrictEqual([123]);
  });
  it('parses a negative number', () => {
    const input ='-123';

    const parsed = parse(input);
    expect(parsed).toStrictEqual([-123]);
  });
  it('parses a real number', () => {
    const input ='123,456';

    const parsed = parse(input);
    expect(parsed).toStrictEqual([123.456]);
  });
  it('parses a thousand separator', () => {
    const input ='1.000.000,123';

    const parsed = parse(input);
    expect(parsed).toStrictEqual([1000000.123]);
  });
  it('parses a letter w. number in end', () => {
    const input ='a100';

    const parsed = parse(input);
    expect(parsed).toStrictEqual([]);
  });
  it('parses a letter w. number in start ', () => {
    const input ='100a';

    const parsed = parse(input);
    expect(parsed).toStrictEqual([]);
  });
  it('parses with scientific notation', () => {
    const input ='6.4e3';

    const parsed = parse(input);
    expect(parsed).toStrictEqual([64000]);
  });
  it('parses with space', () => {
    const input =`


    `;

    const parsed = parse(input);
    expect(parsed).toStrictEqual([]);
  });

});
