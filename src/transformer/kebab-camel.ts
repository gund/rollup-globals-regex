import { GlobalsRegexTransformer } from '../types';

/**
 * Transform kebab-case to camelCase transformer.
 * Use with {@see transform()} function.
 */
export const fromKebabToCamelCase: GlobalsRegexTransformer =
  val => val.replace(/\-(.{1})/g, (_, w) => w.toUpperCase());
