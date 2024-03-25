"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zodSchemaToMarkdown = void 0;
const zod_1 = require("zod");
function zodSchemaToMarkdown(schema, indentLevel = 0) {
    let markdown = "";
    const indent = "  ".repeat(indentLevel);
    if (schema instanceof zod_1.z.ZodObject) {
        const shape = schema.shape;
        Object.keys(shape).forEach((key) => {
            const subSchema = shape[key];
            const description = subSchema.description ? `: ${subSchema.description}` : "";
            markdown += `${indent}- ${key}${description}\n`;
            markdown += zodSchemaToMarkdown(subSchema, indentLevel + 1);
        });
    }
    else if (schema instanceof zod_1.z.ZodArray) {
        markdown += `${indent}- Array\n`;
        markdown += zodSchemaToMarkdown(schema.element, indentLevel + 1);
    }
    else if (schema instanceof zod_1.z.ZodString) {
        markdown += `${indent}- String`;
        if (schema.minLength !== null) {
            markdown += ` (minLength: ${schema.minLength})`;
        }
        if (schema.maxLength !== null) {
            markdown += ` (maxLength: ${schema.maxLength})`;
        }
        markdown += "\n";
    }
    else if (schema instanceof zod_1.z.ZodNumber) {
        markdown += `${indent}- Number`;
        if (schema.minValue !== null) {
            markdown += ` (minValue: ${schema.minValue})`;
        }
        if (schema.maxValue !== null) {
            markdown += ` (maxValue: ${schema.maxValue})`;
        }
        markdown += "\n";
    }
    else if (schema instanceof zod_1.z.ZodEnum) {
        const values = schema.options.join(", ");
        markdown += `${indent}- Enum: ${values}\n`;
    }
    else if (schema instanceof zod_1.z.ZodUnion) {
        markdown += `${indent}- Union\n`;
        schema.options.forEach((option, index) => {
            markdown += zodSchemaToMarkdown(option, indentLevel + 1);
            if (index < schema.options.length - 1) {
                markdown += `${indent}  |\n`;
            }
        });
    }
    else if (schema instanceof zod_1.z.ZodBoolean) {
        markdown += `${indent}- Boolean\n`;
    }
    else if (schema instanceof zod_1.z.ZodDefault) {
        markdown += `${indent}- Default: ${JSON.stringify(schema._def.defaultValue())}\n`;
        markdown += zodSchemaToMarkdown(schema.removeDefault(), indentLevel);
    }
    else if (schema instanceof zod_1.z.ZodOptional) {
        markdown += `${indent}- Optional\n`;
        markdown += zodSchemaToMarkdown(schema.unwrap(), indentLevel + 1);
    }
    else if (schema instanceof zod_1.z.ZodNullable) {
        markdown += `${indent}- Nullable\n`;
        markdown += zodSchemaToMarkdown(schema.unwrap(), indentLevel + 1);
    }
    else {
        markdown += `${indent}- Type: ${schema.constructor.name}\n`;
    }
    return markdown;
}
exports.zodSchemaToMarkdown = zodSchemaToMarkdown;
