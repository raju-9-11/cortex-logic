(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports'], factory);
  else if (typeof exports === 'object')
    factory(module.exports);
  else
    globalThis['ktor-ktor-shared-ktor-sse'] = factory(typeof globalThis['ktor-ktor-shared-ktor-sse'] === 'undefined' ? {} : globalThis['ktor-ktor-shared-ktor-sse']);
}(function (_) {
  'use strict';
  //region block: pre-declaration
  //endregion
  return _;
}));

//# sourceMappingURL=ktor-ktor-shared-ktor-sse.js.map
