import { GlobalsRegexConfig, RollupGlobalsFn } from './types';

/**
 * Higher order function which gets configuration for rollup globals
 * and returns function for rollup to properly resolve globals.
 *
 * @example Parameter `config` is object where keys are global which will be set
 * and value is module Id as a string or RegExp that matches it:
 * ```ts
 * {
 *   'ng.core': '@angular/core'
 * }
 * ```
 * This config will set global 'ng.core' for '@angular/core'.
 *
 * @example  If value is RegExp - you can use matched groups in key with '$[indexOfMatch]' sign:
 * ```ts
 * {
 *   'ng.$1': '^@angular/(.*)'
 * }
 * ```
 * This config will set for every '@angular/*' a global 'ng.*'
 * (ex. '@angular/http' => 'ng.http' and so on).
 * NOTE: $0 - group points to whole string same as String.prototype.match result.
 *
 * @example You can also apply transformers on globals ({@see transform()}):
 * ```ts
 * {
 *   '$1': transform('^@angular/(.*)', val => 'ng.' + val)
 * }
 * ```
 * This example will do the same as above one.
 * There are some built-in transformers like {@see fromKebabToCamelCase()} which
 * are often useful with modules like @angular
 * (ex. '@angular/platform-browser' => 'ng.platformBrowser').
 */
export function globalsRegex(config: GlobalsRegexConfig): RollupGlobalsFn  {
  return _globalsRegex.bind(null, config);
}

function _globalsRegex(config: GlobalsRegexConfig, moduleId: string): string {
  let global = '';

  const isGlobalResolved = Object.keys(config)
    .some(pattern => {
      const globMatcher = config[pattern];

      if (typeof globMatcher === 'string' && moduleId === globMatcher) {
        global = pattern;
        return true;
      } else if (globMatcher instanceof RegExp) {
        const matches = moduleId.match(globMatcher);

        if (matches) {
          global = matches.reduce((p, match, i) => {
            if (typeof globMatcher.transform === 'function') {
              match = globMatcher.transform(match, i);
            }

            return p.replace(`$${i}`, match);
          }, pattern);

          return true;
        }
      }

      return false;
    });

  if (!isGlobalResolved) {
    console.warn(`Global not resolved for module '${moduleId}'`);
  }

  return global;
}
