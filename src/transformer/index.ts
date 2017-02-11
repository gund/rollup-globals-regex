import { GlobalsRegexNode, GlobalsRegexTransformer } from '../types';

export * from './kebab-camel';

/**
 * Apply transformers on result of regex.
 * Transformers can be composed and order of execution is from left to right.
 *
 * @example As simple function:
 * ```ts
 * transformer(/^Hello (.+)/, val => val.toUpperCase())
 * ```
 * Ex: On string 'Hello world' will transform group 'world' => 'WORLD'
 *
 * @example Transformers can be composed:
 * ```ts
 * transformer(/^Hello (.+)/, val => 'beautiful-' + val, fromKebabToCamelCase)
 * ```
 * Ex: On string 'Hello world' will transform group 'world' => 'beautifulWorld'
 * NOTE: Order matters here to get this result
 *
 * @example And you can conditianally apply transformers to some groups by index:
 * ```ts
 * transformer(/^(.+) (.+)/,
 *   (val, i) => i === 0 ? 'Hey! ' + val : val,
 *   (val, i) => i > 0 ? 'beautiful-' + val : val,
 *   fromKebabToCamelCase)
 * ```
 * Ex: On string 'Hello world' will transform group 'Hello' => 'Hey! Hello'
 * and group 'world' => 'beautifulWorld'
 */
export function transformer(regex: GlobalsRegexNode,
  ...transformers: GlobalsRegexTransformer[]) {
  if (transformers && transformers.length > 0) {
    regex.transform = (val, i) => transformers.reduce((v, fn) => fn(v, i), val);
  }

  return regex;
}
