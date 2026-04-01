(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports'], factory);
  else if (typeof exports === 'object')
    factory(module.exports);
  else
    globalThis['sqldelight-drivers-web-worker-driver'] = factory(typeof globalThis['sqldelight-drivers-web-worker-driver'] === 'undefined' ? {} : globalThis['sqldelight-drivers-web-worker-driver']);
}(function (_) {
  'use strict';
  //region block: pre-declaration
  //endregion
  return _;
}));

//# sourceMappingURL=sqldelight-drivers-web-worker-driver.js.map
