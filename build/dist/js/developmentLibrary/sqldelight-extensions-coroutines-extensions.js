(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports'], factory);
  else if (typeof exports === 'object')
    factory(module.exports);
  else
    globalThis['sqldelight-extensions-coroutines-extensions'] = factory(typeof globalThis['sqldelight-extensions-coroutines-extensions'] === 'undefined' ? {} : globalThis['sqldelight-extensions-coroutines-extensions']);
}(function (_) {
  'use strict';
  //region block: pre-declaration
  //endregion
  return _;
}));

//# sourceMappingURL=sqldelight-extensions-coroutines-extensions.js.map
