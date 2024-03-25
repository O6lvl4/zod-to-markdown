import { z } from 'zod';
import { zodSchemaToMarkdown } from './index';

describe('zodSchemaToMarkdown', () => {
  it('should convert a simple object schema to markdown', () => {
    const schema = z.object({
      name: z.string(),
      age: z.number(),
    });

    const expected = `- name
  - String
- age
  - Number
`;

    expect(zodSchemaToMarkdown(schema)).toBe(expected);
  });

  it('should convert an array schema to markdown', () => {
    const schema = z.array(z.string());

    const expected = `- Array
  - String
`;

    expect(zodSchemaToMarkdown(schema)).toBe(expected);
  });

  it('should convert a union schema to markdown', () => {
    const schema = z.union([z.string(), z.number()]);

    const expected = `- Union
  - String
  |
  - Number
`;

    expect(zodSchemaToMarkdown(schema)).toBe(expected);
  });
});