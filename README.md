# zod-to-markdown

A utility function to convert Zod schemas to Markdown documentation.

## Installation

Install the package using npm:

```bash
npm install zod-to-markdown
```

## Usage

Import the `zodSchemaToMarkdown` function from the package:

```typescript
import { zodSchemaToMarkdown } from 'zod-to-markdown';
```

Use the function to convert a Zod schema to Markdown:

```typescript
import { z } from 'zod';

const mySchema = z.object({
  name: z.string(),
  age: z.number(),
  email: z.string().email(),
});

const markdown = zodSchemaToMarkdown(mySchema);
console.log(markdown);
```

Output:

```markdown
- name: String
- age: Number
- email: String (email)
```

The `zodSchemaToMarkdown` function takes a Zod schema as input and returns a string representing the schema in Markdown format.

## Supported Zod Types

The following Zod types are supported by `zodSchemaToMarkdown`:

- `ZodObject`
- `ZodArray`
- `ZodString`
- `ZodNumber`
- `ZodEnum`
- `ZodUnion`
- `ZodBoolean`
- `ZodDefault`
- `ZodOptional`
- `ZodNullable`

## Options

The `zodSchemaToMarkdown` function accepts an optional second parameter `indentLevel` to specify the initial indentation level. By default, it is set to 0.

```typescript
const markdown = zodSchemaToMarkdown(mySchema, 2);
```

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, please open an issue or submit a pull request on the [GitHub repository](https://github.com/O6lvl4/zod-to-markdown).

## License

This package is open source and available under the [MIT License](https://opensource.org/licenses/MIT).
