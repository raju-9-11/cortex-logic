(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js', './ktor-ktor-io.js', './ktor-ktor-http.js', './kotlinx-coroutines-core.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'), require('./ktor-ktor-io.js'), require('./ktor-ktor-http.js'), require('./kotlinx-coroutines-core.js'));
  else {
    if (typeof globalThis['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'ktor-ktor-shared-ktor-serialization'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'ktor-ktor-shared-ktor-serialization'.");
    }
    if (typeof globalThis['ktor-ktor-io'] === 'undefined') {
      throw new Error("Error loading module 'ktor-ktor-shared-ktor-serialization'. Its dependency 'ktor-ktor-io' was not found. Please, check whether 'ktor-ktor-io' is loaded prior to 'ktor-ktor-shared-ktor-serialization'.");
    }
    if (typeof globalThis['ktor-ktor-http'] === 'undefined') {
      throw new Error("Error loading module 'ktor-ktor-shared-ktor-serialization'. Its dependency 'ktor-ktor-http' was not found. Please, check whether 'ktor-ktor-http' is loaded prior to 'ktor-ktor-shared-ktor-serialization'.");
    }
    if (typeof globalThis['kotlinx-coroutines-core'] === 'undefined') {
      throw new Error("Error loading module 'ktor-ktor-shared-ktor-serialization'. Its dependency 'kotlinx-coroutines-core' was not found. Please, check whether 'kotlinx-coroutines-core' is loaded prior to 'ktor-ktor-shared-ktor-serialization'.");
    }
    globalThis['ktor-ktor-shared-ktor-serialization'] = factory(typeof globalThis['ktor-ktor-shared-ktor-serialization'] === 'undefined' ? {} : globalThis['ktor-ktor-shared-ktor-serialization'], globalThis['kotlin-kotlin-stdlib'], globalThis['ktor-ktor-io'], globalThis['ktor-ktor-http'], globalThis['kotlinx-coroutines-core']);
  }
}(function (_, kotlin_kotlin, kotlin_io_ktor_ktor_io, kotlin_io_ktor_ktor_http, kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core) {
  'use strict';
  //region block: imports
  var Exception = kotlin_kotlin.$_$.fj;
  var VOID = kotlin_kotlin.$_$.i;
  var Exception_init_$Init$ = kotlin_kotlin.$_$.x1;
  var captureStack = kotlin_kotlin.$_$.mc;
  var protoOf = kotlin_kotlin.$_$.fe;
  var initMetadataForClass = kotlin_kotlin.$_$.bd;
  var initMetadataForInterface = kotlin_kotlin.$_$.fd;
  var Unit_getInstance = kotlin_kotlin.$_$.f6;
  var Charsets_getInstance = kotlin_io_ktor_ktor_io.$_$.m;
  var HttpHeaders_getInstance = kotlin_io_ktor_ktor_http.$_$.f;
  var parseAndSortHeader = kotlin_io_ktor_ktor_http.$_$.l1;
  var forName = kotlin_io_ktor_ktor_io.$_$.r;
  var isSupported = kotlin_io_ktor_ktor_io.$_$.s;
  var equals = kotlin_kotlin.$_$.uc;
  var FunctionAdapter = kotlin_kotlin.$_$.ic;
  var isInterface = kotlin_kotlin.$_$.qd;
  var FlowCollector = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.o;
  var hashCode = kotlin_kotlin.$_$.ad;
  var CoroutineImpl = kotlin_kotlin.$_$.yb;
  var THROW_CCE = kotlin_kotlin.$_$.nj;
  var get_COROUTINE_SUSPENDED = kotlin_kotlin.$_$.hb;
  var initMetadataForLambda = kotlin_kotlin.$_$.gd;
  var initMetadataForCoroutine = kotlin_kotlin.$_$.dd;
  var Flow = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.p;
  var asFlow = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.s;
  var firstOrNull = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.b;
  var NullBody_getInstance = kotlin_io_ktor_ktor_http.$_$.a;
  var SuspendFunction1 = kotlin_kotlin.$_$.ac;
  //endregion
  //region block: pre-declaration
  initMetadataForClass(ContentConvertException, 'ContentConvertException', VOID, Exception);
  initMetadataForInterface(ContentConverter, 'ContentConverter', VOID, VOID, VOID, [4, 3]);
  function register$default(contentType, converter, configuration, $super) {
    var tmp;
    if (configuration === VOID) {
      tmp = Configuration$register$lambda;
    } else {
      tmp = configuration;
    }
    configuration = tmp;
    var tmp_0;
    if ($super === VOID) {
      this.register_48t3rv_k$(contentType, converter, configuration);
      tmp_0 = Unit_getInstance();
    } else {
      tmp_0 = $super.register_48t3rv_k$.call(this, contentType, converter, configuration);
    }
    return tmp_0;
  }
  initMetadataForInterface(Configuration, 'Configuration');
  initMetadataForClass(sam$kotlinx_coroutines_flow_FlowCollector$0, 'sam$kotlinx_coroutines_flow_FlowCollector$0', VOID, VOID, [FlowCollector, FunctionAdapter], [1]);
  initMetadataForLambda(deserialize$o$collect$slambda, CoroutineImpl, [CoroutineImpl], [1]);
  initMetadataForCoroutine($collectCOROUTINE$1, CoroutineImpl);
  initMetadataForClass(deserialize$$inlined$map$1, VOID, VOID, VOID, [Flow], [1]);
  initMetadataForLambda(deserialize$slambda, CoroutineImpl, [CoroutineImpl], [1]);
  initMetadataForCoroutine($deserializeCOROUTINE$0, CoroutineImpl);
  //endregion
  function ContentConvertException(message, cause) {
    cause = cause === VOID ? null : cause;
    Exception_init_$Init$(message, cause, this);
    captureStack(this, ContentConvertException);
  }
  function ContentConverter() {
  }
  function deserialize(_this__u8e3s4, body, typeInfo, charset, $completion) {
    var tmp = new $deserializeCOROUTINE$0(_this__u8e3s4, body, typeInfo, charset, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  }
  function suitableCharset(_this__u8e3s4, defaultCharset) {
    defaultCharset = defaultCharset === VOID ? Charsets_getInstance().get_UTF_8_ihn39z_k$() : defaultCharset;
    var tmp0_elvis_lhs = suitableCharsetOrNull(_this__u8e3s4, defaultCharset);
    return tmp0_elvis_lhs == null ? defaultCharset : tmp0_elvis_lhs;
  }
  function Configuration$register$lambda(_this__u8e3s4) {
    return Unit_getInstance();
  }
  function Configuration() {
  }
  function suitableCharsetOrNull(_this__u8e3s4, defaultCharset) {
    defaultCharset = defaultCharset === VOID ? Charsets_getInstance().get_UTF_8_ihn39z_k$() : defaultCharset;
    var _iterator__ex2g4s = parseAndSortHeader(_this__u8e3s4.get_6bo4tg_k$(HttpHeaders_getInstance().get_AcceptCharset_1vf6lh_k$())).iterator_jk1svi_k$();
    while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
      var charset = _iterator__ex2g4s.next_20eer_k$().component1_7eebsc_k$();
      if (charset === '*')
        return defaultCharset;
      else if (isSupported(Charsets_getInstance(), charset))
        return forName(Charsets_getInstance(), charset);
    }
    return null;
  }
  function sam$kotlinx_coroutines_flow_FlowCollector$0(function_0) {
    this.function_1 = function_0;
  }
  protoOf(sam$kotlinx_coroutines_flow_FlowCollector$0).emit_t92u1f_k$ = function (value, $completion) {
    return this.function_1(value, $completion);
  };
  protoOf(sam$kotlinx_coroutines_flow_FlowCollector$0).getFunctionDelegate_jtodtf_k$ = function () {
    return this.function_1;
  };
  protoOf(sam$kotlinx_coroutines_flow_FlowCollector$0).equals = function (other) {
    var tmp;
    if (!(other == null) ? isInterface(other, FlowCollector) : false) {
      var tmp_0;
      if (!(other == null) ? isInterface(other, FunctionAdapter) : false) {
        tmp_0 = equals(this.getFunctionDelegate_jtodtf_k$(), other.getFunctionDelegate_jtodtf_k$());
      } else {
        tmp_0 = false;
      }
      tmp = tmp_0;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(sam$kotlinx_coroutines_flow_FlowCollector$0).hashCode = function () {
    return hashCode(this.getFunctionDelegate_jtodtf_k$());
  };
  function deserialize$o$collect$slambda($$this$unsafeFlow, $charset, $typeInfo, $body, resultContinuation) {
    this.$$this$unsafeFlow_1 = $$this$unsafeFlow;
    this.$charset_1 = $charset;
    this.$typeInfo_1 = $typeInfo;
    this.$body_1 = $body;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(deserialize$o$collect$slambda).invoke_e0ttvm_k$ = function (value, $completion) {
    var tmp = this.create_wyq9v6_k$(value, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(deserialize$o$collect$slambda).invoke_qns8j1_k$ = function (p1, $completion) {
    return this.invoke_e0ttvm_k$((p1 == null ? true : !(p1 == null)) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(deserialize$o$collect$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(3);
            var tmp_0 = this;
            tmp_0.tmp10__1 = this.$$this$unsafeFlow_1;
            var tmp_1 = this;
            tmp_1.tmp21__1 = this.value_1;
            this.$this$transform2__1 = this.tmp10__1;
            this.value3__1 = this.tmp21__1;
            var tmp_2 = this;
            tmp_2.tmp14__1 = this.value3__1;
            this.converter5__1 = this.tmp14__1;
            this.set_state_rjd8d0_k$(1);
            suspendResult = this.converter5__1.deserialize_4o4t3i_k$(this.$charset_1, this.$typeInfo_1, this.$body_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.ARGUMENT6__1 = suspendResult;
            this.set_state_rjd8d0_k$(2);
            suspendResult = this.$this$transform2__1.emit_t92u1f_k$(this.ARGUMENT6__1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            return Unit_getInstance();
          case 3:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 3) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  protoOf(deserialize$o$collect$slambda).create_wyq9v6_k$ = function (value, completion) {
    var i = new deserialize$o$collect$slambda(this.$$this$unsafeFlow_1, this.$charset_1, this.$typeInfo_1, this.$body_1, completion);
    i.value_1 = value;
    return i;
  };
  function deserialize$o$collect$slambda_0($$this$unsafeFlow, $charset, $typeInfo, $body, resultContinuation) {
    var i = new deserialize$o$collect$slambda($$this$unsafeFlow, $charset, $typeInfo, $body, resultContinuation);
    var l = function (value, $completion) {
      return i.invoke_e0ttvm_k$(value, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function $collectCOROUTINE$1(_this__u8e3s4, collector, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.collector_1 = collector;
  }
  protoOf($collectCOROUTINE$1).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            var tmp_0 = this;
            tmp_0.tmp00__1 = this.collector_1;
            this.$this$unsafeFlow1__1 = this.tmp00__1;
            this.set_state_rjd8d0_k$(1);
            var tmp_1 = deserialize$o$collect$slambda_0(this.$this$unsafeFlow1__1, this._this__u8e3s4__1.$charset_1, this._this__u8e3s4__1.$typeInfo_1, this._this__u8e3s4__1.$body_1, null);
            suspendResult = this._this__u8e3s4__1.$this_1.collect_aksokr_k$(new sam$kotlinx_coroutines_flow_FlowCollector$0(tmp_1), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            return Unit_getInstance();
          case 2:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 2) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  function deserialize$$inlined$map$1($this, $charset, $typeInfo, $body) {
    this.$this_1 = $this;
    this.$charset_1 = $charset;
    this.$typeInfo_1 = $typeInfo;
    this.$body_1 = $body;
  }
  protoOf(deserialize$$inlined$map$1).collect_ooju95_k$ = function (collector, $completion) {
    var tmp = new $collectCOROUTINE$1(this, collector, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(deserialize$$inlined$map$1).collect_aksokr_k$ = function (collector, $completion) {
    return this.collect_ooju95_k$(collector, $completion);
  };
  function deserialize$slambda($body, resultContinuation) {
    this.$body_1 = $body;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(deserialize$slambda).invoke_s5f16h_k$ = function (it, $completion) {
    var tmp = this.create_wyq9v6_k$(it, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(deserialize$slambda).invoke_qns8j1_k$ = function (p1, $completion) {
    return this.invoke_s5f16h_k$((p1 == null ? true : !(p1 == null)) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(deserialize$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        if (tmp === 0) {
          this.set_exceptionState_fex74n_k$(1);
          return !(this.it_1 == null) || this.$body_1.get_isClosedForRead_ajcc1s_k$();
        } else if (tmp === 1) {
          throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        throw e;
      }
     while (true);
  };
  protoOf(deserialize$slambda).create_wyq9v6_k$ = function (it, completion) {
    var i = new deserialize$slambda(this.$body_1, completion);
    i.it_1 = it;
    return i;
  };
  function deserialize$slambda_0($body, resultContinuation) {
    var i = new deserialize$slambda($body, resultContinuation);
    var l = function (it, $completion) {
      return i.invoke_s5f16h_k$(it, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function $deserializeCOROUTINE$0(_this__u8e3s4, body, typeInfo, charset, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.body_1 = body;
    this.typeInfo_1 = typeInfo;
    this.charset_1 = charset;
  }
  protoOf($deserializeCOROUTINE$0).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            var this_0 = asFlow(this._this__u8e3s4__1);
            var tmp_0 = new deserialize$$inlined$map$1(this_0, this.charset_1, this.typeInfo_1, this.body_1);
            suspendResult = firstOrNull(tmp_0, deserialize$slambda_0(this.body_1, null), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var result = suspendResult;
            var tmp_1;
            if (!(result == null)) {
              tmp_1 = result;
            } else {
              if (!this.body_1.get_isClosedForRead_ajcc1s_k$()) {
                tmp_1 = this.body_1;
              } else {
                var tmp0_safe_receiver = this.typeInfo_1.get_kotlinType_flgmsk_k$();
                if ((tmp0_safe_receiver == null ? null : tmp0_safe_receiver.get_isMarkedNullable_4el8ow_k$()) === true) {
                  tmp_1 = NullBody_getInstance();
                } else {
                  throw new ContentConvertException('No suitable converter found for ' + this.typeInfo_1.toString());
                }
              }
            }

            return tmp_1;
          case 2:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 2) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = deserialize;
  _.$_$.b = register$default;
  _.$_$.c = Configuration;
  _.$_$.d = suitableCharset;
  //endregion
  return _;
}));

//# sourceMappingURL=ktor-ktor-shared-ktor-serialization.js.map
