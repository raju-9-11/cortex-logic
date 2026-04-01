(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports'], factory);
  else if (typeof exports === 'object')
    factory(module.exports);
  else
    globalThis['sqldelight-extensions-async-extensions'] = factory(typeof globalThis['sqldelight-extensions-async-extensions'] === 'undefined' ? {} : globalThis['sqldelight-extensions-async-extensions']);
}(function (_) {
  'use strict';
  //region block: pre-declaration
  //endregion
  return _;
}));

//# sourceMappingURL=sqldelight-extensions-async-extensions.js.map
