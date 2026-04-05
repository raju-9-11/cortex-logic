(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports'], factory);
  else if (typeof exports === 'object')
    factory(module.exports);
  else
    globalThis['kotlinx-io-kotlinx-io-bytestring'] = factory(typeof globalThis['kotlinx-io-kotlinx-io-bytestring'] === 'undefined' ? {} : globalThis['kotlinx-io-kotlinx-io-bytestring']);
}(function (_) {
  'use strict';
  //region block: pre-declaration
  //endregion
  return _;
}));

//# sourceMappingURL=kotlinx-io-kotlinx-io-bytestring.js.map
