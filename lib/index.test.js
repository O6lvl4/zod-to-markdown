"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const index_1 = require("./index");
describe('zodSchemaToMarkdown', () => {
    it('should convert a simple object schema to markdown', () => {
        const schema = zod_1.z.object({
            name: zod_1.z.string(),
            age: zod_1.z.number(),
        });
        const expected = `- name
  - String
- age
  - Number
`;
        expect((0, index_1.zodSchemaToMarkdown)(schema)).toBe(expected);
    });
    it('should convert an array schema to markdown', () => {
        const schema = zod_1.z.array(zod_1.z.string());
        const expected = `- Array
  - String
`;
        expect((0, index_1.zodSchemaToMarkdown)(schema)).toBe(expected);
    });
    it('should convert a union schema to markdown', () => {
        const schema = zod_1.z.union([zod_1.z.string(), zod_1.z.number()]);
        const expected = `- Union
  - String
  |
  - Number
`;
        expect((0, index_1.zodSchemaToMarkdown)(schema)).toBe(expected);
    });
});
