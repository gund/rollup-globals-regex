# rollup-globals-regex

> Configurable globals with RegExp for Rollup

## Example

Convert your `globals` from something like this:
```js
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
```

To awesome extensible config like this:
```js
globals: {
  'tslib': 'tslib',
  [GLOBAL.NG2]: GLOBAL.NG2.TPL,
  [GLOBAL.RX]: GLOBAL.RX.TPL,
  [GLOBAL.RX_OBSERVABLE]: GLOBAL.RX_OBSERVABLE.TPL,
  [GLOBAL.RX_OPERATOR]: GLOBAL.RX_OPERATOR.TPL,
}
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

## License

MIT © [Alex Malkevich](malkevich.alex@gmail.com)
