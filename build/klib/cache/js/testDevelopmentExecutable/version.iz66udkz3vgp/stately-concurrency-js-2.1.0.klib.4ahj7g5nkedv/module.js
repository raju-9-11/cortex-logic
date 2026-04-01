(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'));
  else {
    if (typeof globalThis['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'Stately-stately-concurrency'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'Stately-stately-concurrency'.");
    }
    globalThis['Stately-stately-concurrency'] = factory(typeof globalThis['Stately-stately-concurrency'] === 'undefined' ? {} : globalThis['Stately-stately-concurrency'], globalThis['kotlin-kotlin-stdlib']);
  }
}(function (_, kotlin_kotlin) {
  'use strict';
  //region block: imports
  var protoOf = kotlin_kotlin.$_$.be;
  var initMetadataForClass = kotlin_kotlin.$_$.xc;
  //endregion
  //region block: pre-declaration
  initMetadataForClass(ThreadLocalRef, 'ThreadLocalRef', ThreadLocalRef);
  //endregion
  function set_value(_this__u8e3s4, value) {
    _this__u8e3s4.set_bjwkek_k$(value);
  }
  function get_value(_this__u8e3s4) {
    return _this__u8e3s4.get_26vq_k$();
  }
  function synchronize(_this__u8e3s4, block) {
    return block();
  }
  function _set_localValue__8fhs41($this, _set____db54di) {
    $this.localValue_1 = _set____db54di;
  }
  function _get_localValue__6mqt17($this) {
    return $this.localValue_1;
  }
  function ThreadLocalRef() {
    this.localValue_1 = null;
  }
  protoOf(ThreadLocalRef).remove_ldkf9o_k$ = function () {
    set_value(this, null);
  };
  protoOf(ThreadLocalRef).get_26vq_k$ = function () {
    return this.localValue_1;
  };
  protoOf(ThreadLocalRef).set_bjwkek_k$ = function (value) {
    this.localValue_1 = value;
  };
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = ThreadLocalRef;
  //endregion
  return _;
}));
