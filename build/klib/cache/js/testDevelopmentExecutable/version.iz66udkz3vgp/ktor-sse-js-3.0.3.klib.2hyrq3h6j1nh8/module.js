(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'));
  else {
    if (typeof globalThis['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'ktor-ktor-shared-ktor-sse'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'ktor-ktor-shared-ktor-sse'.");
    }
    globalThis['ktor-ktor-shared-ktor-sse'] = factory(typeof globalThis['ktor-ktor-shared-ktor-sse'] === 'undefined' ? {} : globalThis['ktor-ktor-shared-ktor-sse'], globalThis['kotlin-kotlin-stdlib']);
  }
}(function (_, kotlin_kotlin) {
  'use strict';
  //region block: imports
  var VOID = kotlin_kotlin.$_$.h;
  var protoOf = kotlin_kotlin.$_$.be;
  var StringBuilder_init_$Create$ = kotlin_kotlin.$_$.n1;
  var Unit_getInstance = kotlin_kotlin.$_$.f6;
  var initMetadataForClass = kotlin_kotlin.$_$.xc;
  var toString = kotlin_kotlin.$_$.fe;
  var Regex_init_$Create$ = kotlin_kotlin.$_$.k1;
  //endregion
  //region block: pre-declaration
  initMetadataForClass(ServerSentEvent, 'ServerSentEvent', ServerSentEvent);
  //endregion
  function get_END_OF_LINE_VARIANTS() {
    _init_properties_ServerSentEvent_kt__rkyey5();
    return END_OF_LINE_VARIANTS;
  }
  var END_OF_LINE_VARIANTS;
  function ServerSentEvent(data, event, id, retry, comments) {
    data = data === VOID ? null : data;
    event = event === VOID ? null : event;
    id = id === VOID ? null : id;
    retry = retry === VOID ? null : retry;
    comments = comments === VOID ? null : comments;
    this.data_1 = data;
    this.event_1 = event;
    this.id_1 = id;
    this.retry_1 = retry;
    this.comments_1 = comments;
  }
  protoOf(ServerSentEvent).get_data_wokkxf_k$ = function () {
    return this.data_1;
  };
  protoOf(ServerSentEvent).get_event_ir25pt_k$ = function () {
    return this.event_1;
  };
  protoOf(ServerSentEvent).get_id_kntnx8_k$ = function () {
    return this.id_1;
  };
  protoOf(ServerSentEvent).get_retry_ixwxvj_k$ = function () {
    return this.retry_1;
  };
  protoOf(ServerSentEvent).get_comments_t9igfx_k$ = function () {
    return this.comments_1;
  };
  protoOf(ServerSentEvent).toString = function () {
    // Inline function 'kotlin.text.buildString' call
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$();
    appendField(this_0, 'data', this.data_1);
    appendField(this_0, 'event', this.event_1);
    appendField(this_0, 'id', this.id_1);
    appendField(this_0, 'retry', this.retry_1);
    appendField(this_0, '', this.comments_1);
    return this_0.toString();
  };
  function appendField(_this__u8e3s4, name, value) {
    _init_properties_ServerSentEvent_kt__rkyey5();
    if (!(value == null)) {
      var tmp0 = toString(value);
      // Inline function 'kotlin.text.split' call
      var values = get_END_OF_LINE_VARIANTS().split_p7ck23_k$(tmp0, 0);
      // Inline function 'kotlin.collections.forEach' call
      var _iterator__ex2g4s = values.iterator_jk1svi_k$();
      while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
        var element = _iterator__ex2g4s.next_20eer_k$();
        _this__u8e3s4.append_22ad7x_k$(name + ': ' + element + '\r\n');
      }
    }
  }
  var properties_initialized_ServerSentEvent_kt_x8r4bz;
  function _init_properties_ServerSentEvent_kt__rkyey5() {
    if (!properties_initialized_ServerSentEvent_kt_x8r4bz) {
      properties_initialized_ServerSentEvent_kt_x8r4bz = true;
      END_OF_LINE_VARIANTS = Regex_init_$Create$('\r\n|\r|\n');
    }
  }
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = ServerSentEvent;
  //endregion
  return _;
}));
