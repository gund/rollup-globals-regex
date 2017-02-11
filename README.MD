# rollup-globals-regex

> Configurable globals with RegExp for Rollup

[![Npm](https://img.shields.io/npm/v/rollup-globals-regex.svg?maxAge=2592000)](https://badge.fury.io/js/rollup-globals-regex)
[![Npm Downloads](https://img.shields.io/npm/dt/rollup-globals-regex.svg?maxAge=2592000)](https://www.npmjs.com/package/rollup-globals-regex)
[![Licence](https://img.shields.io/npm/l/rollup-globals-regex.svg?maxAge=2592000)](https://github.com/gund/rollup-globals-regex/blob/master/LICENSE)

## Installation

```bash
$ npm install rollup-globals-regex --save
```

## Example

Convert your `globals` from something like this:
```js
export default {
  ...
  globals: {
    'tslib': 'tslib'
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
    '@angular/http': 'ng.http',
    '@angular/platform-browser': 'ng.platformBrowser',
    '@angular/platform-browser-dynamic': 'ng.platformBrowserDynamic',
    'rxjs/Observable': 'Rx',
    'rxjs/add/observable/of': 'Rx.Observable',
    'rxjs/add/observable/empty': 'Rx.Observable',
    'rxjs/add/operator/switchMap': 'Rx.Observable.prototype',
    'rxjs/add/operator/mergeMap': 'Rx.Observable.prototype',
    'rxjs/add/operator/publishLast': 'Rx.Observable.prototype',
    'rxjs/add/operator/catch': 'Rx.Observable.prototype',
  }
  ...
}
```

To awesome extensible config like this:
```js
import { globalsRegex, GLOBAL } from 'rollup-globals-regex';

export default {
  ...
  globals: globalsRegex({
    'tslib': 'tslib',
    [GLOBAL.NG2]: GLOBAL.NG2.TPL,
    [GLOBAL.RX]: GLOBAL.RX.TPL,
    [GLOBAL.RX_OBSERVABLE]: GLOBAL.RX_OBSERVABLE.TPL,
    [GLOBAL.RX_OPERATOR]: GLOBAL.RX_OPERATOR.TPL,
  })
  ...
};
```

NOTE: `GLOBAL` is just a set of predefined regular expressions for common used globals like Angular.
It looks internally something like this:
```js
NG2: {
  toString() {
    return 'ng.$1';
  },
  TPL: transformer(/^\@angular\/(.+)/, fromKebabToCamelCase)
}
```
So you can very easily define yours or better create a PR to extend `GLOBALS` object =)

Also you can add transformers on your RegExp's to achive something like converting kebab-case to cameCase,
which is useful for global like '@angular/platform-browser' to conver to 'ng.platformBrowser'.

There are some predefined transformers but you can always create your own one - it's a simple function
of type `GlobalsRegexTransformer` - it gets value and index of group in match and returns new string.

PR's with more transformers are very welcomed as well =)

## License

MIT © [Alex Malkevich](malkevich.alex@gmail.com)
