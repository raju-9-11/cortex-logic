(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports'], factory);
  else if (typeof exports === 'object')
    factory(module.exports);
  else
    globalThis['sqldelight-runtime'] = factory(typeof globalThis['sqldelight-runtime'] === 'undefined' ? {} : globalThis['sqldelight-runtime']);
}(function (_) {
  'use strict';
  //region block: pre-declaration
  //endregion
  return _;
}));

//# sourceMappingURL=sqldelight-runtime.js.map
