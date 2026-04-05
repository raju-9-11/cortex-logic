(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports'], factory);
  else if (typeof exports === 'object')
    factory(module.exports);
  else
    globalThis['kotlinx-serialization-kotlinx-serialization-json-io'] = factory(typeof globalThis['kotlinx-serialization-kotlinx-serialization-json-io'] === 'undefined' ? {} : globalThis['kotlinx-serialization-kotlinx-serialization-json-io']);
}(function (_) {
  'use strict';
  //region block: pre-declaration
  //endregion
  return _;
}));

//# sourceMappingURL=kotlinx-serialization-kotlinx-serialization-json-io.js.map
