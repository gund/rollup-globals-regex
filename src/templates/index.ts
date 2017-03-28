import { fromKebabToCamelCase, transformer } from '../transformer/index';
import { GlobalTemplate } from '../types';

/**
 * Preset of useful teplates for globals
 *
 * @example Use in config like this:
 * ```ts
 * globals: {
 *   [GLOBAL.NG2]: GLOBAL.NG2.TPL,
 *   [GLOBAL.RX]: GLOBAL.RX.TPL,
 *   ...
 * }
 * ```
 */
export const GLOBAL: {[k: string]: GlobalTemplate} = {
  NG2: {
    toString() {
      return 'ng.$1';
    },
    TPL: transformer(/^\@angular\/(.+)/, fromKebabToCamelCase)
  },
  RX: {
    toString() {
      return 'Rx';
    },
    TPL: /^rxjs\/[^/]+$/
  },
  RX_OBSERVABLE: {
    toString() {
      return 'Rx.Observable';
    },
    TPL: /^rxjs\/(add\/)?observable\/[^/]+$/
  },
  RX_OPERATOR: {
    toString() {
      return 'Rx.Observable.prototype';
    },
    TPL: /^rxjs\/(add\/)?operator\/[^/]+$/
  },
};
