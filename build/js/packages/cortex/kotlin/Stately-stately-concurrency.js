(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports'], factory);
  else if (typeof exports === 'object')
    factory(module.exports);
  else
    globalThis['Stately-stately-concurrency'] = factory(typeof globalThis['Stately-stately-concurrency'] === 'undefined' ? {} : globalThis['Stately-stately-concurrency']);
}(function (_) {
  'use strict';
  //region block: pre-declaration
  //endregion
  return _;
}));

//# sourceMappingURL=Stately-stately-concurrency.js.map
