(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js', './kotlinx-coroutines-core.js', './kotlinx-atomicfu.js', './ktor-ktor-http.js', './ktor-ktor-utils.js', './ktor-ktor-client-ktor-client-core.js', './ktor-ktor-io.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'), require('./kotlinx-coroutines-core.js'), require('./kotlinx-atomicfu.js'), require('./ktor-ktor-http.js'), require('./ktor-ktor-utils.js'), require('./ktor-ktor-client-ktor-client-core.js'), require('./ktor-ktor-io.js'));
  else {
    if (typeof globalThis['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'ktor-ktor-client-ktor-client-plugins-ktor-client-logging'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'ktor-ktor-client-ktor-client-plugins-ktor-client-logging'.");
    }
    if (typeof globalThis['kotlinx-coroutines-core'] === 'undefined') {
      throw new Error("Error loading module 'ktor-ktor-client-ktor-client-plugins-ktor-client-logging'. Its dependency 'kotlinx-coroutines-core' was not found. Please, check whether 'kotlinx-coroutines-core' is loaded prior to 'ktor-ktor-client-ktor-client-plugins-ktor-client-logging'.");
    }
    if (typeof globalThis['kotlinx-atomicfu'] === 'undefined') {
      throw new Error("Error loading module 'ktor-ktor-client-ktor-client-plugins-ktor-client-logging'. Its dependency 'kotlinx-atomicfu' was not found. Please, check whether 'kotlinx-atomicfu' is loaded prior to 'ktor-ktor-client-ktor-client-plugins-ktor-client-logging'.");
    }
    if (typeof globalThis['ktor-ktor-http'] === 'undefined') {
      throw new Error("Error loading module 'ktor-ktor-client-ktor-client-plugins-ktor-client-logging'. Its dependency 'ktor-ktor-http' was not found. Please, check whether 'ktor-ktor-http' is loaded prior to 'ktor-ktor-client-ktor-client-plugins-ktor-client-logging'.");
    }
    if (typeof globalThis['ktor-ktor-utils'] === 'undefined') {
      throw new Error("Error loading module 'ktor-ktor-client-ktor-client-plugins-ktor-client-logging'. Its dependency 'ktor-ktor-utils' was not found. Please, check whether 'ktor-ktor-utils' is loaded prior to 'ktor-ktor-client-ktor-client-plugins-ktor-client-logging'.");
    }
    if (typeof globalThis['ktor-ktor-client-ktor-client-core'] === 'undefined') {
      throw new Error("Error loading module 'ktor-ktor-client-ktor-client-plugins-ktor-client-logging'. Its dependency 'ktor-ktor-client-ktor-client-core' was not found. Please, check whether 'ktor-ktor-client-ktor-client-core' is loaded prior to 'ktor-ktor-client-ktor-client-plugins-ktor-client-logging'.");
    }
    if (typeof globalThis['ktor-ktor-io'] === 'undefined') {
      throw new Error("Error loading module 'ktor-ktor-client-ktor-client-plugins-ktor-client-logging'. Its dependency 'ktor-ktor-io' was not found. Please, check whether 'ktor-ktor-io' is loaded prior to 'ktor-ktor-client-ktor-client-plugins-ktor-client-logging'.");
    }
    globalThis['ktor-ktor-client-ktor-client-plugins-ktor-client-logging'] = factory(typeof globalThis['ktor-ktor-client-ktor-client-plugins-ktor-client-logging'] === 'undefined' ? {} : globalThis['ktor-ktor-client-ktor-client-plugins-ktor-client-logging'], globalThis['kotlin-kotlin-stdlib'], globalThis['kotlinx-coroutines-core'], globalThis['kotlinx-atomicfu'], globalThis['ktor-ktor-http'], globalThis['ktor-ktor-utils'], globalThis['ktor-ktor-client-ktor-client-core'], globalThis['ktor-ktor-io']);
  }
}(function (_, kotlin_kotlin, kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core, kotlin_org_jetbrains_kotlinx_atomicfu, kotlin_io_ktor_ktor_http, kotlin_io_ktor_ktor_utils, kotlin_io_ktor_ktor_client_core, kotlin_io_ktor_ktor_io) {
  'use strict';
  //region block: imports
  var CoroutineImpl = kotlin_kotlin.$_$.yb;
  var get_COROUTINE_SUSPENDED = kotlin_kotlin.$_$.hb;
  var THROW_CCE = kotlin_kotlin.$_$.nj;
  var isCharSequence = kotlin_kotlin.$_$.md;
  var trim = kotlin_kotlin.$_$.mi;
  var toString = kotlin_kotlin.$_$.je;
  var Unit_getInstance = kotlin_kotlin.$_$.f6;
  var protoOf = kotlin_kotlin.$_$.fe;
  var initMetadataForCoroutine = kotlin_kotlin.$_$.dd;
  var charSequenceLength = kotlin_kotlin.$_$.qc;
  var StringBuilder_init_$Create$ = kotlin_kotlin.$_$.o1;
  var Job = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.p1;
  var atomic$boolean$1 = kotlin_org_jetbrains_kotlinx_atomicfu.$_$.b;
  var _Char___init__impl__6a9atx = kotlin_kotlin.$_$.n3;
  var initMetadataForClass = kotlin_kotlin.$_$.bd;
  var VOID = kotlin_kotlin.$_$.i;
  var THROW_IAE = kotlin_kotlin.$_$.oj;
  var enumEntries = kotlin_kotlin.$_$.fc;
  var Enum = kotlin_kotlin.$_$.dj;
  var ReadChannelContent = kotlin_io_ktor_ktor_http.$_$.o;
  var initMetadataForCompanion = kotlin_kotlin.$_$.cd;
  var initMetadataForInterface = kotlin_kotlin.$_$.fd;
  var println = kotlin_kotlin.$_$.hc;
  var ArrayList_init_$Create$ = kotlin_kotlin.$_$.u;
  var PipelineContext = kotlin_io_ktor_ktor_utils.$_$.g;
  var initMetadataForLambda = kotlin_kotlin.$_$.gd;
  var Phases_getInstance = kotlin_io_ktor_ktor_client_core.$_$.c;
  var isSuspendFunction = kotlin_kotlin.$_$.ud;
  var ClientHook = kotlin_io_ktor_ktor_client_core.$_$.h;
  var initMetadataForObject = kotlin_kotlin.$_$.hd;
  var HttpResponse = kotlin_io_ktor_ktor_client_core.$_$.r;
  var Phases_getInstance_0 = kotlin_io_ktor_ktor_client_core.$_$.d;
  var HttpResponseContainer = kotlin_io_ktor_ktor_client_core.$_$.q;
  var Phases_getInstance_1 = kotlin_io_ktor_ktor_client_core.$_$.e;
  var get_ResponseObserver = kotlin_io_ktor_ktor_client_core.$_$.l;
  var Collection = kotlin_kotlin.$_$.h6;
  var isInterface = kotlin_kotlin.$_$.qd;
  var toString_0 = kotlin_kotlin.$_$.rk;
  var charset = kotlin_io_ktor_ktor_http.$_$.e1;
  var Charsets_getInstance = kotlin_io_ktor_ktor_io.$_$.m;
  var ByteChannel = kotlin_io_ktor_ktor_io.$_$.g1;
  var GlobalScope_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.j;
  var Dispatchers_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.i;
  var launch = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.x1;
  var Url = kotlin_io_ktor_ktor_http.$_$.z;
  var OutgoingContent = kotlin_io_ktor_ktor_http.$_$.q;
  var HttpHeaders_getInstance = kotlin_io_ktor_ktor_http.$_$.f;
  var HttpRequestBuilder = kotlin_io_ktor_ktor_client_core.$_$.m;
  var HttpClientCall = kotlin_io_ktor_ktor_client_core.$_$.g;
  var contentType = kotlin_io_ktor_ktor_http.$_$.i1;
  var CoroutineScope = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.n1;
  var readRemaining = kotlin_io_ktor_ktor_io.$_$.g;
  var readText = kotlin_io_ktor_ktor_io.$_$.z;
  var getKClass = kotlin_kotlin.$_$.f;
  var arrayOf = kotlin_kotlin.$_$.bk;
  var createKType = kotlin_kotlin.$_$.c;
  var TypeInfo = kotlin_io_ktor_ktor_utils.$_$.j;
  var AttributeKey = kotlin_io_ktor_ktor_utils.$_$.l;
  var Unit = kotlin_kotlin.$_$.yj;
  var createClientPlugin = kotlin_io_ktor_ktor_client_core.$_$.k;
  var SuspendFunction2 = kotlin_kotlin.$_$.bc;
  var SuspendFunction1 = kotlin_kotlin.$_$.ac;
  var toList = kotlin_kotlin.$_$.ra;
  var sortedWith = kotlin_kotlin.$_$.ia;
  var joinToString = kotlin_kotlin.$_$.y8;
  var equals = kotlin_kotlin.$_$.uc;
  var FunctionAdapter = kotlin_kotlin.$_$.ic;
  var Comparator = kotlin_kotlin.$_$.aj;
  var hashCode = kotlin_kotlin.$_$.ad;
  var compareValues = kotlin_kotlin.$_$.fb;
  var writer = kotlin_io_ktor_ktor_io.$_$.q1;
  var WriterScope = kotlin_io_ktor_ktor_io.$_$.j1;
  var ProtocolUpgrade = kotlin_io_ktor_ktor_http.$_$.n;
  var NoContent = kotlin_io_ktor_ktor_http.$_$.m;
  var noWhenBranchMatchedException = kotlin_kotlin.$_$.mk;
  var ContentWrapper = kotlin_io_ktor_ktor_http.$_$.l;
  var copyToBoth = kotlin_io_ktor_ktor_utils.$_$.z;
  var WriteChannelContent = kotlin_io_ktor_ktor_http.$_$.p;
  var writeFully = kotlin_io_ktor_ktor_io.$_$.k;
  var ByteArrayContent = kotlin_io_ktor_ktor_http.$_$.k;
  var Key = kotlin_kotlin.$_$.wb;
  var get = kotlin_kotlin.$_$.tb;
  var fold = kotlin_kotlin.$_$.sb;
  var minusKey = kotlin_kotlin.$_$.ub;
  var plus = kotlin_kotlin.$_$.xb;
  var Element = kotlin_kotlin.$_$.vb;
  //endregion
  //region block: pre-declaration
  initMetadataForCoroutine($logResponseExceptionCOROUTINE$0, CoroutineImpl);
  initMetadataForCoroutine($logResponseBodyCOROUTINE$1, CoroutineImpl);
  initMetadataForCoroutine($closeResponseLogCOROUTINE$2, CoroutineImpl);
  initMetadataForClass(HttpClientCallLogger, 'HttpClientCallLogger', VOID, VOID, VOID, [1, 0]);
  initMetadataForClass(LogLevel, 'LogLevel', VOID, Enum);
  initMetadataForClass(LoggedContent, 'LoggedContent', VOID, ReadChannelContent);
  initMetadataForCompanion(Companion);
  initMetadataForInterface(Logger, 'Logger');
  initMetadataForClass(SimpleLogger, 'SimpleLogger', SimpleLogger, VOID, [Logger]);
  initMetadataForClass(LoggingConfig, 'LoggingConfig', LoggingConfig);
  initMetadataForClass(SanitizedHeader, 'SanitizedHeader');
  initMetadataForClass(Context, 'Context', VOID, VOID, VOID, [1]);
  initMetadataForLambda(SendHook$install$slambda, CoroutineImpl, [CoroutineImpl], [2]);
  initMetadataForObject(SendHook, 'SendHook', VOID, VOID, [ClientHook]);
  initMetadataForClass(Context_0, 'Context', VOID, VOID, VOID, [0]);
  initMetadataForLambda(ResponseHook$install$slambda, CoroutineImpl, [CoroutineImpl], [2]);
  initMetadataForObject(ResponseHook, 'ResponseHook', VOID, VOID, [ClientHook]);
  initMetadataForClass(Context_1, 'Context', VOID, VOID, VOID, [0]);
  initMetadataForLambda(ReceiveHook$install$slambda, CoroutineImpl, [CoroutineImpl], [2]);
  initMetadataForObject(ReceiveHook, 'ReceiveHook', VOID, VOID, [ClientHook]);
  initMetadataForLambda(Logging$lambda$slambda, CoroutineImpl, [CoroutineImpl], [2]);
  initMetadataForLambda(Logging$lambda$slambda_1, CoroutineImpl, [CoroutineImpl], [2]);
  initMetadataForLambda(Logging$lambda$slambda_3, CoroutineImpl, [CoroutineImpl], [2]);
  initMetadataForLambda(Logging$lambda$slambda_5, CoroutineImpl, [CoroutineImpl], [1]);
  initMetadataForLambda(Logging$lambda$logRequestBody$slambda, CoroutineImpl, [CoroutineImpl], [1]);
  initMetadataForClass(sam$kotlin_Comparator$0, 'sam$kotlin_Comparator$0', VOID, VOID, [Comparator, FunctionAdapter]);
  initMetadataForCoroutine($tryReadTextCOROUTINE$3, CoroutineImpl);
  initMetadataForCoroutine($logResponseBodyCOROUTINE$4, CoroutineImpl);
  initMetadataForLambda(toReadChannel$slambda, CoroutineImpl, [CoroutineImpl], [1]);
  initMetadataForCoroutine($observeCOROUTINE$5, CoroutineImpl);
  initMetadataForObject(MDCContextKey, 'MDCContextKey', VOID, VOID, [Key]);
  initMetadataForObject(MDCContextElement, 'MDCContextElement', VOID, VOID, [Element]);
  //endregion
  function _get_logger__rkp4sl($this) {
    return $this.logger_1;
  }
  function _get_requestLog__c6gr2i($this) {
    return $this.requestLog_1;
  }
  function _get_responseLog__jviqfm($this) {
    return $this.responseLog_1;
  }
  function _get_requestLoggedMonitor__z9q4e6($this) {
    return $this.requestLoggedMonitor_1;
  }
  function _get_responseHeaderMonitor__d9ndad($this) {
    return $this.responseHeaderMonitor_1;
  }
  function _get_requestLogged__gck45c($this) {
    return $this.requestLogged_1;
  }
  function _get_responseLogged__nl5c8($this) {
    return $this.responseLogged_1;
  }
  function $logResponseExceptionCOROUTINE$0(_this__u8e3s4, message, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.message_1 = message;
  }
  protoOf($logResponseExceptionCOROUTINE$0).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = this._this__u8e3s4__1.requestLoggedMonitor_1.join_o20dar_k$(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var this_0 = this.message_1;
            this._this__u8e3s4__1.logger_1.log_bt7sva_k$(toString(trim(isCharSequence(this_0) ? this_0 : THROW_CCE())));
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
  function $logResponseBodyCOROUTINE$1(_this__u8e3s4, message, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.message_1 = message;
  }
  protoOf($logResponseBodyCOROUTINE$1).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = this._this__u8e3s4__1.responseHeaderMonitor_1.join_o20dar_k$(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this._this__u8e3s4__1.responseLog_1.append_22ad7x_k$(this.message_1);
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
  function $closeResponseLogCOROUTINE$2(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
  }
  protoOf($closeResponseLogCOROUTINE$2).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            if (!this._this__u8e3s4__1.responseLogged_1.atomicfu$compareAndSet(false, true))
              return Unit_getInstance();
            this.set_state_rjd8d0_k$(1);
            suspendResult = this._this__u8e3s4__1.requestLoggedMonitor_1.join_o20dar_k$(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var message = toString(trim(this._this__u8e3s4__1.responseLog_1));
            if (charSequenceLength(message) > 0) {
              this._this__u8e3s4__1.logger_1.log_bt7sva_k$(message);
            }

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
  function HttpClientCallLogger(logger) {
    this.logger_1 = logger;
    this.requestLog_1 = StringBuilder_init_$Create$();
    this.responseLog_1 = StringBuilder_init_$Create$();
    this.requestLoggedMonitor_1 = Job();
    this.responseHeaderMonitor_1 = Job();
    this.requestLogged_1 = atomic$boolean$1(false);
    this.responseLogged_1 = atomic$boolean$1(false);
  }
  protoOf(HttpClientCallLogger).logRequest_bwijmp_k$ = function (message) {
    var tmp1 = this.requestLog_1;
    // Inline function 'kotlin.text.trim' call
    // Inline function 'kotlin.text.appendLine' call
    var value = toString(trim(isCharSequence(message) ? message : THROW_CCE()));
    // Inline function 'kotlin.text.appendLine' call
    tmp1.append_22ad7x_k$(value).append_am5a4z_k$(_Char___init__impl__6a9atx(10));
  };
  protoOf(HttpClientCallLogger).logResponseHeader_ssafxk_k$ = function (message) {
    var tmp1 = this.responseLog_1;
    // Inline function 'kotlin.text.trim' call
    // Inline function 'kotlin.text.appendLine' call
    var value = toString(trim(isCharSequence(message) ? message : THROW_CCE()));
    // Inline function 'kotlin.text.appendLine' call
    tmp1.append_22ad7x_k$(value).append_am5a4z_k$(_Char___init__impl__6a9atx(10));
    this.responseHeaderMonitor_1.complete_9ww6vb_k$();
  };
  protoOf(HttpClientCallLogger).logResponseException_uuzfgn_k$ = function (message, $completion) {
    var tmp = new $logResponseExceptionCOROUTINE$0(this, message, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(HttpClientCallLogger).logResponseBody_smpta4_k$ = function (message, $completion) {
    var tmp = new $logResponseBodyCOROUTINE$1(this, message, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(HttpClientCallLogger).closeRequestLog_fulj7_k$ = function () {
    if (!this.requestLogged_1.atomicfu$compareAndSet(false, true))
      return Unit_getInstance();
    try {
      var message = toString(trim(this.requestLog_1));
      // Inline function 'kotlin.text.isNotEmpty' call
      if (charSequenceLength(message) > 0) {
        this.logger_1.log_bt7sva_k$(message);
      }
    }finally {
      this.requestLoggedMonitor_1.complete_9ww6vb_k$();
    }
  };
  protoOf(HttpClientCallLogger).closeResponseLog_y90az0_k$ = function ($completion) {
    var tmp = new $closeResponseLogCOROUTINE$2(this, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  var LogLevel_ALL_instance;
  var LogLevel_HEADERS_instance;
  var LogLevel_BODY_instance;
  var LogLevel_INFO_instance;
  var LogLevel_NONE_instance;
  function values() {
    return [LogLevel_ALL_getInstance(), LogLevel_HEADERS_getInstance(), LogLevel_BODY_getInstance(), LogLevel_INFO_getInstance(), LogLevel_NONE_getInstance()];
  }
  function valueOf(value) {
    switch (value) {
      case 'ALL':
        return LogLevel_ALL_getInstance();
      case 'HEADERS':
        return LogLevel_HEADERS_getInstance();
      case 'BODY':
        return LogLevel_BODY_getInstance();
      case 'INFO':
        return LogLevel_INFO_getInstance();
      case 'NONE':
        return LogLevel_NONE_getInstance();
      default:
        LogLevel_initEntries();
        THROW_IAE('No enum constant value.');
        break;
    }
  }
  function get_entries() {
    if ($ENTRIES == null)
      $ENTRIES = enumEntries(values());
    return $ENTRIES;
  }
  var LogLevel_entriesInitialized;
  function LogLevel_initEntries() {
    if (LogLevel_entriesInitialized)
      return Unit_getInstance();
    LogLevel_entriesInitialized = true;
    LogLevel_ALL_instance = new LogLevel('ALL', 0, true, true, true);
    LogLevel_HEADERS_instance = new LogLevel('HEADERS', 1, true, true, false);
    LogLevel_BODY_instance = new LogLevel('BODY', 2, true, false, true);
    LogLevel_INFO_instance = new LogLevel('INFO', 3, true, false, false);
    LogLevel_NONE_instance = new LogLevel('NONE', 4, false, false, false);
  }
  var $ENTRIES;
  function LogLevel(name, ordinal, info, headers, body) {
    Enum.call(this, name, ordinal);
    this.info_1 = info;
    this.headers_1 = headers;
    this.body_1 = body;
  }
  protoOf(LogLevel).get_info_woo16f_k$ = function () {
    return this.info_1;
  };
  protoOf(LogLevel).get_headers_ef25jx_k$ = function () {
    return this.headers_1;
  };
  protoOf(LogLevel).get_body_wojkyz_k$ = function () {
    return this.body_1;
  };
  function LogLevel_ALL_getInstance() {
    LogLevel_initEntries();
    return LogLevel_ALL_instance;
  }
  function LogLevel_HEADERS_getInstance() {
    LogLevel_initEntries();
    return LogLevel_HEADERS_instance;
  }
  function LogLevel_BODY_getInstance() {
    LogLevel_initEntries();
    return LogLevel_BODY_instance;
  }
  function LogLevel_INFO_getInstance() {
    LogLevel_initEntries();
    return LogLevel_INFO_instance;
  }
  function LogLevel_NONE_getInstance() {
    LogLevel_initEntries();
    return LogLevel_NONE_instance;
  }
  function _get_originalContent__6kaai1($this) {
    return $this.originalContent_1;
  }
  function _get_channel__c6e3yq($this) {
    return $this.channel_1;
  }
  function LoggedContent(originalContent, channel) {
    ReadChannelContent.call(this);
    this.originalContent_1 = originalContent;
    this.channel_1 = channel;
    this.contentType_1 = this.originalContent_1.get_contentType_7git4a_k$();
    this.contentLength_1 = this.originalContent_1.get_contentLength_a5o8yy_k$();
    this.status_1 = this.originalContent_1.get_status_jnf6d7_k$();
    this.headers_1 = this.originalContent_1.get_headers_ef25jx_k$();
  }
  protoOf(LoggedContent).get_contentType_7git4a_k$ = function () {
    return this.contentType_1;
  };
  protoOf(LoggedContent).get_contentLength_a5o8yy_k$ = function () {
    return this.contentLength_1;
  };
  protoOf(LoggedContent).get_status_jnf6d7_k$ = function () {
    return this.status_1;
  };
  protoOf(LoggedContent).get_headers_ef25jx_k$ = function () {
    return this.headers_1;
  };
  protoOf(LoggedContent).getProperty_d9zgf6_k$ = function (key) {
    return this.originalContent_1.getProperty_d9zgf6_k$(key);
  };
  protoOf(LoggedContent).setProperty_79nh7x_k$ = function (key, value) {
    return this.originalContent_1.setProperty_79nh7x_k$(key, value);
  };
  protoOf(LoggedContent).readFrom_ecr4ww_k$ = function () {
    return this.channel_1;
  };
  function Companion() {
    Companion_instance = this;
  }
  var Companion_instance;
  function Companion_getInstance() {
    if (Companion_instance == null)
      new Companion();
    return Companion_instance;
  }
  function Logger() {
  }
  function get_SIMPLE(_this__u8e3s4) {
    return new SimpleLogger();
  }
  function SimpleLogger() {
  }
  protoOf(SimpleLogger).log_bt7sva_k$ = function (message) {
    println('HttpClient: ' + message);
  };
  function get_ClientCallLogger() {
    _init_properties_Logging_kt__66pui5();
    return ClientCallLogger;
  }
  var ClientCallLogger;
  function get_DisableLogging() {
    _init_properties_Logging_kt__66pui5();
    return DisableLogging;
  }
  var DisableLogging;
  function get_Logging() {
    _init_properties_Logging_kt__66pui5();
    return Logging;
  }
  var Logging;
  function _set__logger__yep5me($this, _set____db54di) {
    $this._logger_1 = _set____db54di;
  }
  function _get__logger__8sgv9e($this) {
    return $this._logger_1;
  }
  function LoggingConfig() {
    var tmp = this;
    // Inline function 'kotlin.collections.mutableListOf' call
    tmp.filters_1 = ArrayList_init_$Create$();
    var tmp_0 = this;
    // Inline function 'kotlin.collections.mutableListOf' call
    tmp_0.sanitizedHeaders_1 = ArrayList_init_$Create$();
    this._logger_1 = null;
    this.level_1 = LogLevel_HEADERS_getInstance();
  }
  protoOf(LoggingConfig).set_filters_bozhp0_k$ = function (_set____db54di) {
    this.filters_1 = _set____db54di;
  };
  protoOf(LoggingConfig).get_filters_u7c1vr_k$ = function () {
    return this.filters_1;
  };
  protoOf(LoggingConfig).get_sanitizedHeaders_31pvxl_k$ = function () {
    return this.sanitizedHeaders_1;
  };
  protoOf(LoggingConfig).set_logger_u15qrw_k$ = function (value) {
    this._logger_1 = value;
  };
  protoOf(LoggingConfig).get_logger_g9gejd_k$ = function () {
    var tmp0_elvis_lhs = this._logger_1;
    return tmp0_elvis_lhs == null ? get_DEFAULT(Companion_getInstance()) : tmp0_elvis_lhs;
  };
  protoOf(LoggingConfig).set_level_cpdxdn_k$ = function (_set____db54di) {
    this.level_1 = _set____db54di;
  };
  protoOf(LoggingConfig).get_level_ium7h7_k$ = function () {
    return this.level_1;
  };
  protoOf(LoggingConfig).filter_k1w7e4_k$ = function (predicate) {
    this.filters_1.add_utx5q5_k$(predicate);
  };
  protoOf(LoggingConfig).sanitizeHeader_b9nkag_k$ = function (placeholder, predicate) {
    this.sanitizedHeaders_1.add_utx5q5_k$(new SanitizedHeader(placeholder, predicate));
  };
  protoOf(LoggingConfig).sanitizeHeader$default_8x7pzj_k$ = function (placeholder, predicate, $super) {
    placeholder = placeholder === VOID ? '***' : placeholder;
    var tmp;
    if ($super === VOID) {
      this.sanitizeHeader_b9nkag_k$(placeholder, predicate);
      tmp = Unit_getInstance();
    } else {
      tmp = $super.sanitizeHeader_b9nkag_k$.call(this, placeholder, predicate);
    }
    return tmp;
  };
  function SanitizedHeader(placeholder, predicate) {
    this.placeholder_1 = placeholder;
    this.predicate_1 = predicate;
  }
  protoOf(SanitizedHeader).get_placeholder_nsdr0q_k$ = function () {
    return this.placeholder_1;
  };
  protoOf(SanitizedHeader).get_predicate_ds2702_k$ = function () {
    return this.predicate_1;
  };
  function _get_context__ps0bpe($this) {
    return $this.context_1;
  }
  function Context(context) {
    this.context_1 = context;
  }
  protoOf(Context).proceedWith_ogl1da_k$ = function (content, $completion) {
    return this.context_1.proceedWith_i5skhv_k$(content, $completion);
  };
  function SendHook$install$slambda($handler, resultContinuation) {
    this.$handler_1 = $handler;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(SendHook$install$slambda).invoke_wpcgmu_k$ = function ($this$intercept, it, $completion) {
    var tmp = this.create_l3tkcm_k$($this$intercept, it, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(SendHook$install$slambda).invoke_4tzzq6_k$ = function (p1, p2, $completion) {
    var tmp = p1 instanceof PipelineContext ? p1 : THROW_CCE();
    return this.invoke_wpcgmu_k$(tmp, !(p2 == null) ? p2 : THROW_CCE(), $completion);
  };
  protoOf(SendHook$install$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = this.$handler_1(new Context(this.$this$intercept_1), this.$this$intercept_1.get_context_h02k06_k$(), this);
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
  protoOf(SendHook$install$slambda).create_l3tkcm_k$ = function ($this$intercept, it, completion) {
    var i = new SendHook$install$slambda(this.$handler_1, completion);
    i.$this$intercept_1 = $this$intercept;
    i.it_1 = it;
    return i;
  };
  function SendHook$install$slambda_0($handler, resultContinuation) {
    var i = new SendHook$install$slambda($handler, resultContinuation);
    var l = function ($this$intercept, it, $completion) {
      return i.invoke_wpcgmu_k$($this$intercept, it, $completion);
    };
    l.$arity = 2;
    return l;
  }
  function SendHook() {
    SendHook_instance = this;
  }
  protoOf(SendHook).install_n8mx69_k$ = function (client, handler) {
    var tmp = client.get_sendPipeline_5dhg2b_k$();
    var tmp_0 = Phases_getInstance().get_Monitoring_rltjwv_k$();
    tmp.intercept_k21bv3_k$(tmp_0, SendHook$install$slambda_0(handler, null));
  };
  protoOf(SendHook).install_o8nink_k$ = function (client, handler) {
    return this.install_n8mx69_k$(client, (!(handler == null) ? isSuspendFunction(handler, 2) : false) ? handler : THROW_CCE());
  };
  var SendHook_instance;
  function SendHook_getInstance() {
    if (SendHook_instance == null)
      new SendHook();
    return SendHook_instance;
  }
  function _get_context__ps0bpe_0($this) {
    return $this.context_1;
  }
  function Context_0(context) {
    this.context_1 = context;
  }
  protoOf(Context_0).proceed_huayui_k$ = function ($completion) {
    return this.context_1.proceed_tynop7_k$($completion);
  };
  function ResponseHook$install$slambda($handler, resultContinuation) {
    this.$handler_1 = $handler;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(ResponseHook$install$slambda).invoke_djztfu_k$ = function ($this$intercept, it, $completion) {
    var tmp = this.create_sxpl8e_k$($this$intercept, it, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(ResponseHook$install$slambda).invoke_4tzzq6_k$ = function (p1, p2, $completion) {
    var tmp = p1 instanceof PipelineContext ? p1 : THROW_CCE();
    return this.invoke_djztfu_k$(tmp, p2 instanceof HttpResponse ? p2 : THROW_CCE(), $completion);
  };
  protoOf(ResponseHook$install$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = this.$handler_1(new Context_0(this.$this$intercept_1), this.$this$intercept_1.get_subject_tmjbgd_k$(), this);
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
  protoOf(ResponseHook$install$slambda).create_sxpl8e_k$ = function ($this$intercept, it, completion) {
    var i = new ResponseHook$install$slambda(this.$handler_1, completion);
    i.$this$intercept_1 = $this$intercept;
    i.it_1 = it;
    return i;
  };
  function ResponseHook$install$slambda_0($handler, resultContinuation) {
    var i = new ResponseHook$install$slambda($handler, resultContinuation);
    var l = function ($this$intercept, it, $completion) {
      return i.invoke_djztfu_k$($this$intercept, it, $completion);
    };
    l.$arity = 2;
    return l;
  }
  function ResponseHook() {
    ResponseHook_instance = this;
  }
  protoOf(ResponseHook).install_evj2rl_k$ = function (client, handler) {
    var tmp = client.get_receivePipeline_3qwhq4_k$();
    var tmp_0 = Phases_getInstance_0().get_State_ih4i88_k$();
    tmp.intercept_k21bv3_k$(tmp_0, ResponseHook$install$slambda_0(handler, null));
  };
  protoOf(ResponseHook).install_o8nink_k$ = function (client, handler) {
    return this.install_evj2rl_k$(client, (!(handler == null) ? isSuspendFunction(handler, 2) : false) ? handler : THROW_CCE());
  };
  var ResponseHook_instance;
  function ResponseHook_getInstance() {
    if (ResponseHook_instance == null)
      new ResponseHook();
    return ResponseHook_instance;
  }
  function _get_context__ps0bpe_1($this) {
    return $this.context_1;
  }
  function Context_1(context) {
    this.context_1 = context;
  }
  protoOf(Context_1).proceed_d3z1r5_k$ = function ($completion) {
    return this.context_1.proceed_tynop7_k$($completion);
  };
  function ReceiveHook$install$slambda($handler, resultContinuation) {
    this.$handler_1 = $handler;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(ReceiveHook$install$slambda).invoke_b1ivo5_k$ = function ($this$intercept, it, $completion) {
    var tmp = this.create_aalyq9_k$($this$intercept, it, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(ReceiveHook$install$slambda).invoke_4tzzq6_k$ = function (p1, p2, $completion) {
    var tmp = p1 instanceof PipelineContext ? p1 : THROW_CCE();
    return this.invoke_b1ivo5_k$(tmp, p2 instanceof HttpResponseContainer ? p2 : THROW_CCE(), $completion);
  };
  protoOf(ReceiveHook$install$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = this.$handler_1(new Context_1(this.$this$intercept_1), this.$this$intercept_1.get_context_h02k06_k$(), this);
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
  protoOf(ReceiveHook$install$slambda).create_aalyq9_k$ = function ($this$intercept, it, completion) {
    var i = new ReceiveHook$install$slambda(this.$handler_1, completion);
    i.$this$intercept_1 = $this$intercept;
    i.it_1 = it;
    return i;
  };
  function ReceiveHook$install$slambda_0($handler, resultContinuation) {
    var i = new ReceiveHook$install$slambda($handler, resultContinuation);
    var l = function ($this$intercept, it, $completion) {
      return i.invoke_b1ivo5_k$($this$intercept, it, $completion);
    };
    l.$arity = 2;
    return l;
  }
  function ReceiveHook() {
    ReceiveHook_instance = this;
  }
  protoOf(ReceiveHook).install_4bvd74_k$ = function (client, handler) {
    var tmp = client.get_responsePipeline_xbi790_k$();
    var tmp_0 = Phases_getInstance_1().get_Receive_oc3k86_k$();
    tmp.intercept_k21bv3_k$(tmp_0, ReceiveHook$install$slambda_0(handler, null));
  };
  protoOf(ReceiveHook).install_o8nink_k$ = function (client, handler) {
    return this.install_4bvd74_k$(client, (!(handler == null) ? isSuspendFunction(handler, 2) : false) ? handler : THROW_CCE());
  };
  var ReceiveHook_instance;
  function ReceiveHook_getInstance() {
    if (ReceiveHook_instance == null)
      new ReceiveHook();
    return ReceiveHook_instance;
  }
  function LoggingConfig$_init_$ref_f1nb0k() {
    var l = function () {
      return new LoggingConfig();
    };
    l.callableName = '<init>';
    return l;
  }
  function Logging$lambda($this$createClientPlugin) {
    _init_properties_Logging_kt__66pui5();
    var logger = $this$createClientPlugin.get_pluginConfig_p50bdq_k$().get_logger_g9gejd_k$();
    var level = $this$createClientPlugin.get_pluginConfig_p50bdq_k$().level_1;
    var filters = $this$createClientPlugin.get_pluginConfig_p50bdq_k$().filters_1;
    var sanitizedHeaders = $this$createClientPlugin.get_pluginConfig_p50bdq_k$().sanitizedHeaders_1;
    var tmp = SendHook_getInstance();
    $this$createClientPlugin.on_z1oiz_k$(tmp, Logging$lambda$slambda_0(filters, logger, level, sanitizedHeaders, null));
    var tmp_0 = ResponseHook_getInstance();
    $this$createClientPlugin.on_z1oiz_k$(tmp_0, Logging$lambda$slambda_2(level, sanitizedHeaders, null));
    var tmp_1 = ReceiveHook_getInstance();
    $this$createClientPlugin.on_z1oiz_k$(tmp_1, Logging$lambda$slambda_4(level, null));
    if (!level.get_body_wojkyz_k$())
      return Unit_getInstance();
    var observer = Logging$lambda$slambda_6(level, null);
    var tmp_2 = get_ResponseObserver();
    var tmp_3 = get_ResponseObserver();
    tmp_2.install_kxaehd_k$(tmp_3.prepare_t1xtpw_k$(Logging$lambda$lambda(observer)), $this$createClientPlugin.get_client_byfnx0_k$());
    return Unit_getInstance();
  }
  function invoke$shouldBeLogged(filters, request) {
    var tmp;
    if (filters.isEmpty_y1axqb_k$()) {
      tmp = true;
    } else {
      var tmp$ret$0;
      $l$block_0: {
        // Inline function 'kotlin.collections.any' call
        var tmp_0;
        if (isInterface(filters, Collection)) {
          tmp_0 = filters.isEmpty_y1axqb_k$();
        } else {
          tmp_0 = false;
        }
        if (tmp_0) {
          tmp$ret$0 = false;
          break $l$block_0;
        }
        var _iterator__ex2g4s = filters.iterator_jk1svi_k$();
        while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
          var element = _iterator__ex2g4s.next_20eer_k$();
          if (element(request)) {
            tmp$ret$0 = true;
            break $l$block_0;
          }
        }
        tmp$ret$0 = false;
      }
      tmp = tmp$ret$0;
    }
    return tmp;
  }
  function invoke$logRequestBody(content, logger, $completion) {
    var requestLog = StringBuilder_init_$Create$();
    // Inline function 'kotlin.text.appendLine' call
    var value = 'BODY Content-Type: ' + toString_0(content.get_contentType_7git4a_k$());
    // Inline function 'kotlin.text.appendLine' call
    requestLog.append_22ad7x_k$(value).append_am5a4z_k$(_Char___init__impl__6a9atx(10));
    var tmp0_safe_receiver = content.get_contentType_7git4a_k$();
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : charset(tmp0_safe_receiver);
    var charset_0 = tmp1_elvis_lhs == null ? Charsets_getInstance().get_UTF_8_ihn39z_k$() : tmp1_elvis_lhs;
    var channel = new ByteChannel();
    var tmp = GlobalScope_getInstance();
    var tmp_0 = Dispatchers_getInstance().get_Default_goqax4_k$().plus_s13ygv_k$(MDCContext());
    launch(tmp, tmp_0, VOID, Logging$lambda$logRequestBody$slambda_0(channel, charset_0, requestLog, logger, null));
    return observe(content, channel, $completion);
  }
  function invoke$logRequestException(level, logger, context, cause) {
    if (level.get_info_woo16f_k$()) {
      logger.log_bt7sva_k$('REQUEST ' + Url(context.get_url_18iuii_k$()).toString() + ' failed with exception: ' + cause.toString());
    }
  }
  function invoke$logRequest(logger, level, sanitizedHeaders, request, $completion) {
    var tmp = request.get_body_wojkyz_k$();
    var content = tmp instanceof OutgoingContent ? tmp : THROW_CCE();
    var callLogger = new HttpClientCallLogger(logger);
    request.get_attributes_dgqof4_k$().put_gkntno_k$(get_ClientCallLogger(), callLogger);
    // Inline function 'kotlin.text.buildString' call
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$();
    if (level.get_info_woo16f_k$()) {
      // Inline function 'kotlin.text.appendLine' call
      var value = 'REQUEST: ' + Url(request.get_url_18iuii_k$()).toString();
      // Inline function 'kotlin.text.appendLine' call
      this_0.append_22ad7x_k$(value).append_am5a4z_k$(_Char___init__impl__6a9atx(10));
      // Inline function 'kotlin.text.appendLine' call
      var value_0 = 'METHOD: ' + request.get_method_gl8esq_k$().toString();
      // Inline function 'kotlin.text.appendLine' call
      this_0.append_22ad7x_k$(value_0).append_am5a4z_k$(_Char___init__impl__6a9atx(10));
    }
    if (level.get_headers_ef25jx_k$()) {
      // Inline function 'kotlin.text.appendLine' call
      var value_1 = 'COMMON HEADERS';
      // Inline function 'kotlin.text.appendLine' call
      this_0.append_22ad7x_k$(value_1).append_am5a4z_k$(_Char___init__impl__6a9atx(10));
      logHeaders(this_0, request.get_headers_ef25jx_k$().entries_qbkxv4_k$(), sanitizedHeaders);
      // Inline function 'kotlin.text.appendLine' call
      var value_2 = 'CONTENT HEADERS';
      // Inline function 'kotlin.text.appendLine' call
      this_0.append_22ad7x_k$(value_2).append_am5a4z_k$(_Char___init__impl__6a9atx(10));
      var tmp$ret$9;
      $l$block: {
        // Inline function 'kotlin.collections.firstOrNull' call
        var _iterator__ex2g4s = sanitizedHeaders.iterator_jk1svi_k$();
        while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
          var element = _iterator__ex2g4s.next_20eer_k$();
          if (element.predicate_1(HttpHeaders_getInstance().get_ContentLength_3209rq_k$())) {
            tmp$ret$9 = element;
            break $l$block;
          }
        }
        tmp$ret$9 = null;
      }
      var tmp0_safe_receiver = tmp$ret$9;
      var contentLengthPlaceholder = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.placeholder_1;
      var tmp$ret$11;
      $l$block_0: {
        // Inline function 'kotlin.collections.firstOrNull' call
        var _iterator__ex2g4s_0 = sanitizedHeaders.iterator_jk1svi_k$();
        while (_iterator__ex2g4s_0.hasNext_bitz1p_k$()) {
          var element_0 = _iterator__ex2g4s_0.next_20eer_k$();
          if (element_0.predicate_1(HttpHeaders_getInstance().get_ContentType_z1j0sq_k$())) {
            tmp$ret$11 = element_0;
            break $l$block_0;
          }
        }
        tmp$ret$11 = null;
      }
      var tmp1_safe_receiver = tmp$ret$11;
      var contentTypePlaceholder = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.placeholder_1;
      var tmp2_safe_receiver = content.get_contentLength_a5o8yy_k$();
      if (tmp2_safe_receiver == null)
        null;
      else {
        // Inline function 'kotlin.let' call
        var tmp_0 = HttpHeaders_getInstance().get_ContentLength_3209rq_k$();
        logHeader(this_0, tmp_0, contentLengthPlaceholder == null ? tmp2_safe_receiver.toString() : contentLengthPlaceholder);
      }
      var tmp3_safe_receiver = content.get_contentType_7git4a_k$();
      if (tmp3_safe_receiver == null)
        null;
      else {
        // Inline function 'kotlin.let' call
        var tmp_1 = HttpHeaders_getInstance().get_ContentType_z1j0sq_k$();
        logHeader(this_0, tmp_1, contentTypePlaceholder == null ? tmp3_safe_receiver.toString() : contentTypePlaceholder);
      }
      logHeaders(this_0, content.get_headers_ef25jx_k$().entries_qbkxv4_k$(), sanitizedHeaders);
    }
    var message = this_0.toString();
    // Inline function 'kotlin.text.isNotEmpty' call
    if (charSequenceLength(message) > 0) {
      callLogger.logRequest_bwijmp_k$(message);
    }
    var tmp_2;
    // Inline function 'kotlin.text.isEmpty' call
    if (charSequenceLength(message) === 0) {
      tmp_2 = true;
    } else {
      tmp_2 = !level.get_body_wojkyz_k$();
    }
    if (tmp_2) {
      callLogger.closeRequestLog_fulj7_k$();
      return null;
    }
    return invoke$logRequestBody(content, callLogger, $completion);
  }
  function invoke$logResponseException(level, log, request, cause) {
    if (!level.get_info_woo16f_k$())
      return Unit_getInstance();
    log.append_22ad7x_k$('RESPONSE ' + request.get_url_18iuii_k$().toString() + ' failed with exception: ' + cause.toString());
  }
  function Logging$lambda$slambda($filters, $logger, $level, $sanitizedHeaders, resultContinuation) {
    this.$filters_1 = $filters;
    this.$logger_1 = $logger;
    this.$level_1 = $level;
    this.$sanitizedHeaders_1 = $sanitizedHeaders;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(Logging$lambda$slambda).invoke_4qvc8y_k$ = function ($this$on, request, $completion) {
    var tmp = this.create_d01hve_k$($this$on, request, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(Logging$lambda$slambda).invoke_4tzzq6_k$ = function (p1, p2, $completion) {
    var tmp = p1 instanceof Context ? p1 : THROW_CCE();
    return this.invoke_4qvc8y_k$(tmp, p2 instanceof HttpRequestBuilder ? p2 : THROW_CCE(), $completion);
  };
  protoOf(Logging$lambda$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(8);
            if (!invoke$shouldBeLogged(this.$filters_1, this.request_1)) {
              this.request_1.get_attributes_dgqof4_k$().put_gkntno_k$(get_DisableLogging(), Unit_getInstance());
              return Unit_getInstance();
            }

            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = invoke$logRequest(this.$logger_1, this.$level_1, this.$sanitizedHeaders_1, this.request_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.TRY_RESULT0__1 = suspendResult;
            this.set_exceptionState_fex74n_k$(8);
            this.set_state_rjd8d0_k$(3);
            continue $sm;
          case 2:
            this.set_exceptionState_fex74n_k$(8);
            var tmp_0 = this.get_exception_x0n6w6_k$();
            if (tmp_0 instanceof Error) {
              this._unused_var_1_x5dlkk_1 = this.get_exception_x0n6w6_k$();
              var tmp_1 = this;
              tmp_1.TRY_RESULT0__1 = null;
              this.set_state_rjd8d0_k$(3);
              continue $sm;
            } else {
              throw this.get_exception_x0n6w6_k$();
            }

          case 3:
            this.set_exceptionState_fex74n_k$(8);
            this.loggedRequest2__1 = this.TRY_RESULT0__1;
            this.tmp$ret$03__1 = Unit_getInstance();
            this.set_state_rjd8d0_k$(4);
            continue $sm;
          case 4:
            this.set_exceptionState_fex74n_k$(7);
            this.set_exceptionState_fex74n_k$(6);
            this.set_state_rjd8d0_k$(5);
            var tmp0_elvis_lhs = this.loggedRequest2__1;
            suspendResult = this.$this$on_1.proceedWith_ogl1da_k$(tmp0_elvis_lhs == null ? this.request_1.get_body_wojkyz_k$() : tmp0_elvis_lhs, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 5:
            this.tmp$ret$03__1 = suspendResult;
            this.set_exceptionState_fex74n_k$(8);
            this.set_state_rjd8d0_k$(9);
            continue $sm;
          case 6:
            this.set_exceptionState_fex74n_k$(7);
            var tmp_2 = this.get_exception_x0n6w6_k$();
            if (tmp_2 instanceof Error) {
              var cause = this.get_exception_x0n6w6_k$();
              var tmp_3 = this;
              invoke$logRequestException(this.$level_1, this.$logger_1, this.request_1, cause);
              throw cause;
            } else {
              throw this.get_exception_x0n6w6_k$();
            }

          case 7:
            this.set_exceptionState_fex74n_k$(8);
            var t = this.get_exception_x0n6w6_k$();
            throw t;
          case 8:
            throw this.get_exception_x0n6w6_k$();
          case 9:
            this.tmp$ret$03__1;
            this.set_exceptionState_fex74n_k$(8);
            return Unit_getInstance();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 8) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  protoOf(Logging$lambda$slambda).create_d01hve_k$ = function ($this$on, request, completion) {
    var i = new Logging$lambda$slambda(this.$filters_1, this.$logger_1, this.$level_1, this.$sanitizedHeaders_1, completion);
    i.$this$on_1 = $this$on;
    i.request_1 = request;
    return i;
  };
  function Logging$lambda$slambda_0($filters, $logger, $level, $sanitizedHeaders, resultContinuation) {
    var i = new Logging$lambda$slambda($filters, $logger, $level, $sanitizedHeaders, resultContinuation);
    var l = function ($this$on, request, $completion) {
      return i.invoke_4qvc8y_k$($this$on, request, $completion);
    };
    l.$arity = 2;
    return l;
  }
  function Logging$lambda$slambda_1($level, $sanitizedHeaders, resultContinuation) {
    this.$level_1 = $level;
    this.$sanitizedHeaders_1 = $sanitizedHeaders;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(Logging$lambda$slambda_1).invoke_uzch8d_k$ = function ($this$on, response, $completion) {
    var tmp = this.create_ve2s4x_k$($this$on, response, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(Logging$lambda$slambda_1).invoke_4tzzq6_k$ = function (p1, p2, $completion) {
    var tmp = p1 instanceof Context_0 ? p1 : THROW_CCE();
    return this.invoke_uzch8d_k$(tmp, p2 instanceof HttpResponse ? p2 : THROW_CCE(), $completion);
  };
  protoOf(Logging$lambda$slambda_1).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(10);
            if (this.$level_1.equals(LogLevel_NONE_getInstance()) || this.response_1.get_call_wojxrb_k$().get_attributes_dgqof4_k$().contains_du0289_k$(get_DisableLogging()))
              return Unit_getInstance();
            this.callLogger0__1 = this.response_1.get_call_wojxrb_k$().get_attributes_dgqof4_k$().get_r696p5_k$(get_ClientCallLogger());
            this.header1__1 = StringBuilder_init_$Create$();
            this.failed2__1 = false;
            this.set_state_rjd8d0_k$(1);
            continue $sm;
          case 1:
            this.set_exceptionState_fex74n_k$(4);
            this.set_exceptionState_fex74n_k$(3);
            logResponseHeader(this.header1__1, this.response_1.get_call_wojxrb_k$().get_response_xlk07e_k$(), this.$level_1, this.$sanitizedHeaders_1);
            this.set_state_rjd8d0_k$(2);
            suspendResult = this.$this$on_1.proceed_huayui_k$(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            this.tmp$ret$03__1 = suspendResult;
            this.set_exceptionState_fex74n_k$(10);
            this.set_state_rjd8d0_k$(7);
            continue $sm;
          case 3:
            this.set_exceptionState_fex74n_k$(4);
            var tmp_0 = this.get_exception_x0n6w6_k$();
            if (tmp_0 instanceof Error) {
              this.cause4__1 = this.get_exception_x0n6w6_k$();
              var tmp_1 = this;
              invoke$logResponseException(this.$level_1, this.header1__1, this.response_1.get_call_wojxrb_k$().get_request_jdwg4m_k$(), this.cause4__1);
              this.failed2__1 = true;
              throw this.cause4__1;
            } else {
              throw this.get_exception_x0n6w6_k$();
            }

          case 4:
            this.set_exceptionState_fex74n_k$(10);
            this.t5__1 = this.get_exception_x0n6w6_k$();
            this.callLogger0__1.logResponseHeader_ssafxk_k$(this.header1__1.toString());
            if (this.failed2__1 || !this.$level_1.get_body_wojkyz_k$()) {
              this.set_state_rjd8d0_k$(5);
              suspendResult = this.callLogger0__1.closeResponseLog_y90az0_k$(this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.set_state_rjd8d0_k$(6);
              continue $sm;
            }

          case 5:
            this.set_state_rjd8d0_k$(6);
            continue $sm;
          case 6:
            throw this.t5__1;
          case 7:
            this.tmp6__1 = this.tmp$ret$03__1;
            this.set_exceptionState_fex74n_k$(10);
            this.callLogger0__1.logResponseHeader_ssafxk_k$(this.header1__1.toString());
            if (this.failed2__1 || !this.$level_1.get_body_wojkyz_k$()) {
              this.set_state_rjd8d0_k$(8);
              suspendResult = this.callLogger0__1.closeResponseLog_y90az0_k$(this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.set_state_rjd8d0_k$(9);
              continue $sm;
            }

          case 8:
            this.set_state_rjd8d0_k$(9);
            continue $sm;
          case 9:
            return Unit_getInstance();
          case 10:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 10) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  protoOf(Logging$lambda$slambda_1).create_ve2s4x_k$ = function ($this$on, response, completion) {
    var i = new Logging$lambda$slambda_1(this.$level_1, this.$sanitizedHeaders_1, completion);
    i.$this$on_1 = $this$on;
    i.response_1 = response;
    return i;
  };
  function Logging$lambda$slambda_2($level, $sanitizedHeaders, resultContinuation) {
    var i = new Logging$lambda$slambda_1($level, $sanitizedHeaders, resultContinuation);
    var l = function ($this$on, response, $completion) {
      return i.invoke_uzch8d_k$($this$on, response, $completion);
    };
    l.$arity = 2;
    return l;
  }
  function Logging$lambda$slambda_3($level, resultContinuation) {
    this.$level_1 = $level;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(Logging$lambda$slambda_3).invoke_17tspi_k$ = function ($this$on, call, $completion) {
    var tmp = this.create_vhgufu_k$($this$on, call, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(Logging$lambda$slambda_3).invoke_4tzzq6_k$ = function (p1, p2, $completion) {
    var tmp = p1 instanceof Context_1 ? p1 : THROW_CCE();
    return this.invoke_17tspi_k$(tmp, p2 instanceof HttpClientCall ? p2 : THROW_CCE(), $completion);
  };
  protoOf(Logging$lambda$slambda_3).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(6);
            if (this.$level_1.equals(LogLevel_NONE_getInstance()) || this.call_1.get_attributes_dgqof4_k$().contains_du0289_k$(get_DisableLogging())) {
              return Unit_getInstance();
            }

            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = this.$this$on_1.proceed_d3z1r5_k$(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.TRY_RESULT0__1 = suspendResult;
            this.set_exceptionState_fex74n_k$(6);
            this.set_state_rjd8d0_k$(5);
            continue $sm;
          case 2:
            this.set_exceptionState_fex74n_k$(6);
            var tmp_0 = this.get_exception_x0n6w6_k$();
            if (tmp_0 instanceof Error) {
              this.cause1__1 = this.get_exception_x0n6w6_k$();
              this.log2__1 = StringBuilder_init_$Create$();
              this.callLogger3__1 = this.call_1.get_attributes_dgqof4_k$().get_r696p5_k$(get_ClientCallLogger());
              invoke$logResponseException(this.$level_1, this.log2__1, this.call_1.get_request_jdwg4m_k$(), this.cause1__1);
              this.set_state_rjd8d0_k$(3);
              suspendResult = this.callLogger3__1.logResponseException_uuzfgn_k$(this.log2__1.toString(), this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              throw this.get_exception_x0n6w6_k$();
            }

          case 3:
            this.set_state_rjd8d0_k$(4);
            suspendResult = this.callLogger3__1.closeResponseLog_y90az0_k$(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 4:
            var tmp_1 = this;
            throw this.cause1__1;
          case 5:
            this.set_exceptionState_fex74n_k$(6);
            return Unit_getInstance();
          case 6:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 6) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  protoOf(Logging$lambda$slambda_3).create_vhgufu_k$ = function ($this$on, call, completion) {
    var i = new Logging$lambda$slambda_3(this.$level_1, completion);
    i.$this$on_1 = $this$on;
    i.call_1 = call;
    return i;
  };
  function Logging$lambda$slambda_4($level, resultContinuation) {
    var i = new Logging$lambda$slambda_3($level, resultContinuation);
    var l = function ($this$on, call, $completion) {
      return i.invoke_17tspi_k$($this$on, call, $completion);
    };
    l.$arity = 2;
    return l;
  }
  function Logging$lambda$slambda_5($level, resultContinuation) {
    this.$level_1 = $level;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(Logging$lambda$slambda_5).invoke_5qztuh_k$ = function (it, $completion) {
    var tmp = this.create_bkvwgl_k$(it, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(Logging$lambda$slambda_5).invoke_qns8j1_k$ = function (p1, $completion) {
    return this.invoke_5qztuh_k$(p1 instanceof HttpResponse ? p1 : THROW_CCE(), $completion);
  };
  protoOf(Logging$lambda$slambda_5).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(10);
            if (this.$level_1.equals(LogLevel_NONE_getInstance()) || this.it_1.get_call_wojxrb_k$().get_attributes_dgqof4_k$().contains_du0289_k$(get_DisableLogging())) {
              return Unit_getInstance();
            }

            this.callLogger0__1 = this.it_1.get_call_wojxrb_k$().get_attributes_dgqof4_k$().get_r696p5_k$(get_ClientCallLogger());
            this.log1__1 = StringBuilder_init_$Create$();
            this.set_state_rjd8d0_k$(1);
            continue $sm;
          case 1:
            this.set_exceptionState_fex74n_k$(4);
            this.set_exceptionState_fex74n_k$(3);
            this.set_state_rjd8d0_k$(2);
            suspendResult = logResponseBody(this.log1__1, contentType(this.it_1), this.it_1.get_rawContent_u3f8li_k$(), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            this.tmp$ret$02__1 = suspendResult;
            this.set_exceptionState_fex74n_k$(10);
            this.set_state_rjd8d0_k$(7);
            continue $sm;
          case 3:
            this.set_exceptionState_fex74n_k$(4);
            var tmp_0 = this.get_exception_x0n6w6_k$();
            if (tmp_0 instanceof Error) {
              this._unused_var_3_x5dlki_1 = this.get_exception_x0n6w6_k$();
              var tmp_1 = this;
              tmp_1.tmp$ret$02__1 = Unit_getInstance();
              this.set_exceptionState_fex74n_k$(10);
              this.set_state_rjd8d0_k$(7);
              continue $sm;
            } else {
              throw this.get_exception_x0n6w6_k$();
            }

          case 4:
            this.set_exceptionState_fex74n_k$(10);
            this.t4__1 = this.get_exception_x0n6w6_k$();
            this.set_state_rjd8d0_k$(5);
            var this_0 = this.log1__1.toString();
            suspendResult = this.callLogger0__1.logResponseBody_smpta4_k$(toString(trim(isCharSequence(this_0) ? this_0 : THROW_CCE())), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 5:
            this.set_state_rjd8d0_k$(6);
            suspendResult = this.callLogger0__1.closeResponseLog_y90az0_k$(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 6:
            throw this.t4__1;
          case 7:
            this.set_exceptionState_fex74n_k$(10);
            this.set_state_rjd8d0_k$(8);
            var this_1 = this.log1__1.toString();
            suspendResult = this.callLogger0__1.logResponseBody_smpta4_k$(toString(trim(isCharSequence(this_1) ? this_1 : THROW_CCE())), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 8:
            this.set_state_rjd8d0_k$(9);
            suspendResult = this.callLogger0__1.closeResponseLog_y90az0_k$(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 9:
            return Unit_getInstance();
          case 10:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 10) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  protoOf(Logging$lambda$slambda_5).create_bkvwgl_k$ = function (it, completion) {
    var i = new Logging$lambda$slambda_5(this.$level_1, completion);
    i.it_1 = it;
    return i;
  };
  protoOf(Logging$lambda$slambda_5).create_wyq9v6_k$ = function (value, completion) {
    return this.create_bkvwgl_k$(value instanceof HttpResponse ? value : THROW_CCE(), completion);
  };
  function Logging$lambda$slambda_6($level, resultContinuation) {
    var i = new Logging$lambda$slambda_5($level, resultContinuation);
    var l = function (it, $completion) {
      return i.invoke_5qztuh_k$(it, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function Logging$lambda$lambda($observer) {
    return function ($this$prepare) {
      $this$prepare.onResponse_psf88o_k$($observer);
      return Unit_getInstance();
    };
  }
  function Logging$lambda$logRequestBody$slambda($channel, $charset, $requestLog, $logger, resultContinuation) {
    this.$channel_1 = $channel;
    this.$charset_1 = $charset;
    this.$requestLog_1 = $requestLog;
    this.$logger_1 = $logger;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(Logging$lambda$logRequestBody$slambda).invoke_d9fzmj_k$ = function ($this$launch, $completion) {
    var tmp = this.create_rcuf4x_k$($this$launch, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(Logging$lambda$logRequestBody$slambda).invoke_qns8j1_k$ = function (p1, $completion) {
    return this.invoke_d9fzmj_k$((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(Logging$lambda$logRequestBody$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(7);
            this.set_state_rjd8d0_k$(1);
            continue $sm;
          case 1:
            this.set_exceptionState_fex74n_k$(6);
            var tmp_0 = this;
            tmp_0.tmp01__1 = this.$channel_1;
            var tmp_1 = this;
            tmp_1.tmp12__1 = this.$charset_1;
            this.this3__1 = this.tmp01__1;
            this.charset4__1 = this.tmp12__1;
            this.set_exceptionState_fex74n_k$(3);
            this.set_state_rjd8d0_k$(2);
            suspendResult = readRemaining(this.this3__1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            var ARGUMENT = suspendResult;
            this.TRY_RESULT5__1 = readText(ARGUMENT, this.charset4__1);
            this.set_exceptionState_fex74n_k$(6);
            this.set_state_rjd8d0_k$(4);
            continue $sm;
          case 3:
            this.set_exceptionState_fex74n_k$(6);
            var tmp_2 = this.get_exception_x0n6w6_k$();
            if (tmp_2 instanceof Error) {
              var cause = this.get_exception_x0n6w6_k$();
              var tmp_3 = this;
              tmp_3.TRY_RESULT5__1 = null;
              this.set_state_rjd8d0_k$(4);
              continue $sm;
            } else {
              throw this.get_exception_x0n6w6_k$();
            }

          case 4:
            this.set_exceptionState_fex74n_k$(6);
            var tmp0_elvis_lhs = this.TRY_RESULT5__1;
            var text = tmp0_elvis_lhs == null ? '[request body omitted]' : tmp0_elvis_lhs;
            var tmp2 = this.$requestLog_1;
            var value = 'BODY START';
            tmp2.append_22ad7x_k$(value).append_am5a4z_k$(_Char___init__impl__6a9atx(10));
            this.$requestLog_1.append_22ad7x_k$(text).append_am5a4z_k$(_Char___init__impl__6a9atx(10));
            this.tmp$ret$00__1 = this.$requestLog_1.append_22ad7x_k$('BODY END');
            this.set_exceptionState_fex74n_k$(7);
            this.set_state_rjd8d0_k$(5);
            continue $sm;
          case 5:
            this.tmp$ret$00__1;
            this.set_exceptionState_fex74n_k$(7);
            this.$logger_1.logRequest_bwijmp_k$(this.$requestLog_1.toString());
            this.$logger_1.closeRequestLog_fulj7_k$();
            return Unit_getInstance();
          case 6:
            this.set_exceptionState_fex74n_k$(7);
            var t = this.get_exception_x0n6w6_k$();
            this.$logger_1.logRequest_bwijmp_k$(this.$requestLog_1.toString());
            this.$logger_1.closeRequestLog_fulj7_k$();
            throw t;
          case 7:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 7) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  protoOf(Logging$lambda$logRequestBody$slambda).create_rcuf4x_k$ = function ($this$launch, completion) {
    var i = new Logging$lambda$logRequestBody$slambda(this.$channel_1, this.$charset_1, this.$requestLog_1, this.$logger_1, completion);
    i.$this$launch_1 = $this$launch;
    return i;
  };
  protoOf(Logging$lambda$logRequestBody$slambda).create_wyq9v6_k$ = function (value, completion) {
    return this.create_rcuf4x_k$((!(value == null) ? isInterface(value, CoroutineScope) : false) ? value : THROW_CCE(), completion);
  };
  function Logging$lambda$logRequestBody$slambda_0($channel, $charset, $requestLog, $logger, resultContinuation) {
    var i = new Logging$lambda$logRequestBody$slambda($channel, $charset, $requestLog, $logger, resultContinuation);
    var l = function ($this$launch, $completion) {
      return i.invoke_d9fzmj_k$($this$launch, $completion);
    };
    l.$arity = 1;
    return l;
  }
  var properties_initialized_Logging_kt_588vu7;
  function _init_properties_Logging_kt__66pui5() {
    if (!properties_initialized_Logging_kt_588vu7) {
      properties_initialized_Logging_kt_588vu7 = true;
      // Inline function 'io.ktor.util.AttributeKey' call
      var name = 'CallLogger';
      // Inline function 'io.ktor.util.reflect.typeInfo' call
      var tmp = getKClass(HttpClientCallLogger);
      // Inline function 'io.ktor.util.reflect.typeOfOrNull' call
      var tmp_0;
      try {
        tmp_0 = createKType(getKClass(HttpClientCallLogger), arrayOf([]), false);
      } catch ($p) {
        var tmp_1;
        if ($p instanceof Error) {
          var _unused_var__etf5q3 = $p;
          tmp_1 = null;
        } else {
          throw $p;
        }
        tmp_0 = tmp_1;
      }
      var tmp$ret$0 = tmp_0;
      var tmp$ret$1 = new TypeInfo(tmp, tmp$ret$0);
      ClientCallLogger = new AttributeKey(name, tmp$ret$1);
      // Inline function 'io.ktor.util.AttributeKey' call
      var name_0 = 'DisableLogging';
      // Inline function 'io.ktor.util.reflect.typeInfo' call
      var tmp_2 = getKClass(Unit);
      // Inline function 'io.ktor.util.reflect.typeOfOrNull' call
      var tmp_3;
      try {
        tmp_3 = createKType(getKClass(Unit), arrayOf([]), false);
      } catch ($p) {
        var tmp_4;
        if ($p instanceof Error) {
          var _unused_var__etf5q3_0 = $p;
          tmp_4 = null;
        } else {
          throw $p;
        }
        tmp_3 = tmp_4;
      }
      var tmp$ret$0_0 = tmp_3;
      var tmp$ret$1_0 = new TypeInfo(tmp_2, tmp$ret$0_0);
      DisableLogging = new AttributeKey(name_0, tmp$ret$1_0);
      var tmp_5 = LoggingConfig$_init_$ref_f1nb0k();
      Logging = createClientPlugin('Logging', tmp_5, Logging$lambda);
    }
  }
  function tryReadText(_this__u8e3s4, charset, $completion) {
    var tmp = new $tryReadTextCOROUTINE$3(_this__u8e3s4, charset, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  }
  function logHeaders(_this__u8e3s4, headers, sanitizedHeaders) {
    // Inline function 'kotlin.collections.sortedBy' call
    var this_0 = toList(headers);
    // Inline function 'kotlin.comparisons.compareBy' call
    var tmp = logHeaders$lambda;
    var tmp$ret$0 = new sam$kotlin_Comparator$0(tmp);
    var sortedHeaders = sortedWith(this_0, tmp$ret$0);
    // Inline function 'kotlin.collections.forEach' call
    var _iterator__ex2g4s = sortedHeaders.iterator_jk1svi_k$();
    while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
      var element = _iterator__ex2g4s.next_20eer_k$();
      // Inline function 'kotlin.collections.component1' call
      var key = element.get_key_18j28a_k$();
      // Inline function 'kotlin.collections.component2' call
      var values = element.get_value_j01efc_k$();
      var tmp$ret$5;
      $l$block: {
        // Inline function 'kotlin.collections.firstOrNull' call
        var _iterator__ex2g4s_0 = sanitizedHeaders.iterator_jk1svi_k$();
        while (_iterator__ex2g4s_0.hasNext_bitz1p_k$()) {
          var element_0 = _iterator__ex2g4s_0.next_20eer_k$();
          if (element_0.get_predicate_ds2702_k$()(key)) {
            tmp$ret$5 = element_0;
            break $l$block;
          }
        }
        tmp$ret$5 = null;
      }
      var tmp0_safe_receiver = tmp$ret$5;
      var placeholder = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.get_placeholder_nsdr0q_k$();
      logHeader(_this__u8e3s4, key, placeholder == null ? joinToString(values, '; ') : placeholder);
    }
  }
  function logHeader(_this__u8e3s4, key, value) {
    // Inline function 'kotlin.text.appendLine' call
    var value_0 = '-> ' + key + ': ' + value;
    // Inline function 'kotlin.text.appendLine' call
    _this__u8e3s4.append_jgojdo_k$(value_0).append_am5a4z_k$(_Char___init__impl__6a9atx(10));
  }
  function logResponseHeader(log, response, level, sanitizedHeaders) {
    // Inline function 'kotlin.with' call
    if (level.get_info_woo16f_k$()) {
      // Inline function 'kotlin.text.appendLine' call
      var value = 'RESPONSE: ' + response.get_status_jnf6d7_k$().toString();
      // Inline function 'kotlin.text.appendLine' call
      log.append_22ad7x_k$(value).append_am5a4z_k$(_Char___init__impl__6a9atx(10));
      // Inline function 'kotlin.text.appendLine' call
      var value_0 = 'METHOD: ' + response.get_call_wojxrb_k$().get_request_jdwg4m_k$().get_method_gl8esq_k$().toString();
      // Inline function 'kotlin.text.appendLine' call
      log.append_22ad7x_k$(value_0).append_am5a4z_k$(_Char___init__impl__6a9atx(10));
      // Inline function 'kotlin.text.appendLine' call
      var value_1 = 'FROM: ' + response.get_call_wojxrb_k$().get_request_jdwg4m_k$().get_url_18iuii_k$().toString();
      // Inline function 'kotlin.text.appendLine' call
      log.append_22ad7x_k$(value_1).append_am5a4z_k$(_Char___init__impl__6a9atx(10));
    }
    if (level.get_headers_ef25jx_k$()) {
      // Inline function 'kotlin.text.appendLine' call
      var value_2 = 'COMMON HEADERS';
      // Inline function 'kotlin.text.appendLine' call
      log.append_22ad7x_k$(value_2).append_am5a4z_k$(_Char___init__impl__6a9atx(10));
      logHeaders(log, response.get_headers_ef25jx_k$().entries_qbkxv4_k$(), sanitizedHeaders);
    }
  }
  function logResponseBody(log, contentType, content, $completion) {
    var tmp = new $logResponseBodyCOROUTINE$4(log, contentType, content, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  }
  function sam$kotlin_Comparator$0(function_0) {
    this.function_1 = function_0;
  }
  protoOf(sam$kotlin_Comparator$0).compare_bczr_k$ = function (a, b) {
    return this.function_1(a, b);
  };
  protoOf(sam$kotlin_Comparator$0).compare = function (a, b) {
    return this.compare_bczr_k$(a, b);
  };
  protoOf(sam$kotlin_Comparator$0).getFunctionDelegate_jtodtf_k$ = function () {
    return this.function_1;
  };
  protoOf(sam$kotlin_Comparator$0).equals = function (other) {
    var tmp;
    if (!(other == null) ? isInterface(other, Comparator) : false) {
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
  protoOf(sam$kotlin_Comparator$0).hashCode = function () {
    return hashCode(this.getFunctionDelegate_jtodtf_k$());
  };
  function logHeaders$lambda(a, b) {
    // Inline function 'kotlin.comparisons.compareValuesBy' call
    var tmp = a.get_key_18j28a_k$();
    var tmp$ret$1 = b.get_key_18j28a_k$();
    return compareValues(tmp, tmp$ret$1);
  }
  function $tryReadTextCOROUTINE$3(_this__u8e3s4, charset, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.charset_1 = charset;
  }
  protoOf($tryReadTextCOROUTINE$3).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(3);
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = readRemaining(this._this__u8e3s4__1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var ARGUMENT = suspendResult;
            this.TRY_RESULT0__1 = readText(ARGUMENT, this.charset_1);
            this.set_exceptionState_fex74n_k$(3);
            this.set_state_rjd8d0_k$(4);
            continue $sm;
          case 2:
            this.set_exceptionState_fex74n_k$(3);
            var tmp_0 = this.get_exception_x0n6w6_k$();
            if (tmp_0 instanceof Error) {
              var cause = this.get_exception_x0n6w6_k$();
              var tmp_1 = this;
              tmp_1.TRY_RESULT0__1 = null;
              this.set_state_rjd8d0_k$(4);
              continue $sm;
            } else {
              throw this.get_exception_x0n6w6_k$();
            }

          case 3:
            throw this.get_exception_x0n6w6_k$();
          case 4:
            this.set_exceptionState_fex74n_k$(3);
            return this.TRY_RESULT0__1;
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
  function $logResponseBodyCOROUTINE$4(log, contentType, content, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.log_1 = log;
    this.contentType_1 = contentType;
    this.content_1 = content;
  }
  protoOf($logResponseBodyCOROUTINE$4).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(3);
            var tmp_0 = this;
            tmp_0.tmp00__1 = this.log_1;
            this.receiver1__1 = this.tmp00__1;
            var tmp_1 = this;
            tmp_1.tmp12__1 = this.receiver1__1;
            this.$this$with3__1 = this.tmp12__1;
            var tmp0 = this.$this$with3__1;
            var value = 'BODY Content-Type: ' + toString_0(this.contentType_1);
            tmp0.append_22ad7x_k$(value).append_am5a4z_k$(_Char___init__impl__6a9atx(10));
            var tmp2 = this.$this$with3__1;
            var value_0 = 'BODY START';
            tmp2.append_22ad7x_k$(value_0).append_am5a4z_k$(_Char___init__impl__6a9atx(10));
            var tmp_2 = this;
            tmp_2.tmp44__1 = this.content_1;
            var tmp_3 = this;
            var tmp0_safe_receiver = this.contentType_1;
            var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : charset(tmp0_safe_receiver);
            tmp_3.tmp55__1 = tmp1_elvis_lhs == null ? Charsets_getInstance().get_UTF_8_ihn39z_k$() : tmp1_elvis_lhs;
            this.this6__1 = this.tmp44__1;
            this.charset7__1 = this.tmp55__1;
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = readRemaining(this.this6__1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var ARGUMENT = suspendResult;
            this.TRY_RESULT8__1 = readText(ARGUMENT, this.charset7__1);
            this.set_exceptionState_fex74n_k$(3);
            this.set_state_rjd8d0_k$(4);
            continue $sm;
          case 2:
            this.set_exceptionState_fex74n_k$(3);
            var tmp_4 = this.get_exception_x0n6w6_k$();
            if (tmp_4 instanceof Error) {
              var cause = this.get_exception_x0n6w6_k$();
              var tmp_5 = this;
              tmp_5.TRY_RESULT8__1 = null;
              this.set_state_rjd8d0_k$(4);
              continue $sm;
            } else {
              throw this.get_exception_x0n6w6_k$();
            }

          case 3:
            throw this.get_exception_x0n6w6_k$();
          case 4:
            this.set_exceptionState_fex74n_k$(3);
            var tmp2_elvis_lhs = this.TRY_RESULT8__1;
            var message = tmp2_elvis_lhs == null ? '[response body omitted]' : tmp2_elvis_lhs;
            this.$this$with3__1.append_22ad7x_k$(message).append_am5a4z_k$(_Char___init__impl__6a9atx(10));
            this.$this$with3__1.append_22ad7x_k$('BODY END');
            return Unit_getInstance();
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
  function observe(_this__u8e3s4, log, $completion) {
    var tmp = new $observeCOROUTINE$5(_this__u8e3s4, log, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  }
  function toReadChannel(_this__u8e3s4) {
    var tmp = GlobalScope_getInstance();
    var tmp_0 = Dispatchers_getInstance().get_Default_goqax4_k$();
    return writer(tmp, tmp_0, VOID, toReadChannel$slambda_0(_this__u8e3s4, null)).get_channel_dhi7tm_k$();
  }
  function toReadChannel$slambda($this_toReadChannel, resultContinuation) {
    this.$this_toReadChannel_1 = $this_toReadChannel;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(toReadChannel$slambda).invoke_86bb4c_k$ = function ($this$writer, $completion) {
    var tmp = this.create_fmjhmg_k$($this$writer, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(toReadChannel$slambda).invoke_qns8j1_k$ = function (p1, $completion) {
    return this.invoke_86bb4c_k$(p1 instanceof WriterScope ? p1 : THROW_CCE(), $completion);
  };
  protoOf(toReadChannel$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = this.$this_toReadChannel_1.writeTo_vfpsb0_k$(this.$this$writer_1.get_channel_dhi7tm_k$(), this);
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
  protoOf(toReadChannel$slambda).create_fmjhmg_k$ = function ($this$writer, completion) {
    var i = new toReadChannel$slambda(this.$this_toReadChannel_1, completion);
    i.$this$writer_1 = $this$writer;
    return i;
  };
  protoOf(toReadChannel$slambda).create_wyq9v6_k$ = function (value, completion) {
    return this.create_fmjhmg_k$(value instanceof WriterScope ? value : THROW_CCE(), completion);
  };
  function toReadChannel$slambda_0($this_toReadChannel, resultContinuation) {
    var i = new toReadChannel$slambda($this_toReadChannel, resultContinuation);
    var l = function ($this$writer, $completion) {
      return i.invoke_86bb4c_k$($this$writer, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function $observeCOROUTINE$5(_this__u8e3s4, log, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.log_1 = log;
  }
  protoOf($observeCOROUTINE$5).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(6);
            this.tmp0_subject0__1 = this._this__u8e3s4__1;
            var tmp_0 = this.tmp0_subject0__1;
            if (tmp_0 instanceof ByteArrayContent) {
              this.set_state_rjd8d0_k$(3);
              suspendResult = writeFully(this.log_1, this._this__u8e3s4__1.bytes_1k3k2z_k$(), VOID, VOID, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              var tmp_1 = this.tmp0_subject0__1;
              if (tmp_1 instanceof ReadChannelContent) {
                var tmp_2 = this;
                var responseChannel = new ByteChannel();
                var content = this._this__u8e3s4__1.readFrom_ecr4ww_k$();
                copyToBoth(content, this.log_1, responseChannel);
                tmp_2.WHEN_RESULT1__1 = new LoggedContent(this._this__u8e3s4__1, responseChannel);
                this.set_state_rjd8d0_k$(5);
                continue $sm;
              } else {
                var tmp_3 = this.tmp0_subject0__1;
                if (tmp_3 instanceof WriteChannelContent) {
                  var tmp_4 = this;
                  var responseChannel_0 = new ByteChannel();
                  var content_0 = toReadChannel(this._this__u8e3s4__1);
                  copyToBoth(content_0, this.log_1, responseChannel_0);
                  tmp_4.WHEN_RESULT1__1 = new LoggedContent(this._this__u8e3s4__1, responseChannel_0);
                  this.set_state_rjd8d0_k$(5);
                  continue $sm;
                } else {
                  var tmp_5 = this.tmp0_subject0__1;
                  if (tmp_5 instanceof ContentWrapper) {
                    this.ARGUMENT2__1 = this._this__u8e3s4__1;
                    this.set_state_rjd8d0_k$(2);
                    suspendResult = observe(this._this__u8e3s4__1.delegate_djsx39_k$(), this.log_1, this);
                    if (suspendResult === get_COROUTINE_SUSPENDED()) {
                      return suspendResult;
                    }
                    continue $sm;
                  } else {
                    var tmp_6;
                    var tmp_7 = this.tmp0_subject0__1;
                    if (tmp_7 instanceof NoContent) {
                      tmp_6 = true;
                    } else {
                      var tmp_8 = this.tmp0_subject0__1;
                      tmp_6 = tmp_8 instanceof ProtocolUpgrade;
                    }
                    if (tmp_6) {
                      this.set_state_rjd8d0_k$(1);
                      suspendResult = this.log_1.flushAndClose_3zd2q_k$(this);
                      if (suspendResult === get_COROUTINE_SUSPENDED()) {
                        return suspendResult;
                      }
                      continue $sm;
                    } else {
                      var tmp_9 = this;
                      noWhenBranchMatchedException();
                    }
                  }
                }
              }
            }

            break;
          case 1:
            this.WHEN_RESULT1__1 = this._this__u8e3s4__1;
            this.set_state_rjd8d0_k$(5);
            continue $sm;
          case 2:
            this.ARGUMENT3__1 = suspendResult;
            this.WHEN_RESULT1__1 = this.ARGUMENT2__1.copy_ff4g1d_k$(this.ARGUMENT3__1);
            this.set_state_rjd8d0_k$(5);
            continue $sm;
          case 3:
            this.set_state_rjd8d0_k$(4);
            suspendResult = this.log_1.flushAndClose_3zd2q_k$(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 4:
            this.WHEN_RESULT1__1 = this._this__u8e3s4__1;
            this.set_state_rjd8d0_k$(5);
            continue $sm;
          case 5:
            return this.WHEN_RESULT1__1;
          case 6:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 6) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  function MDCContext() {
    return MDCContextElement_getInstance();
  }
  function MDCContextKey() {
    MDCContextKey_instance = this;
  }
  var MDCContextKey_instance;
  function MDCContextKey_getInstance() {
    if (MDCContextKey_instance == null)
      new MDCContextKey();
    return MDCContextKey_instance;
  }
  function MDCContextElement() {
    MDCContextElement_instance = this;
  }
  protoOf(MDCContextElement).get_key_18j28a_k$ = function () {
    return MDCContextKey_getInstance();
  };
  protoOf(MDCContextElement).toString = function () {
    return 'MDCContext';
  };
  var MDCContextElement_instance;
  function MDCContextElement_getInstance() {
    if (MDCContextElement_instance == null)
      new MDCContextElement();
    return MDCContextElement_instance;
  }
  function get_DEFAULT(_this__u8e3s4) {
    return get_SIMPLE(_this__u8e3s4);
  }
  //region block: post-declaration
  protoOf(MDCContextElement).get_y2st91_k$ = get;
  protoOf(MDCContextElement).fold_j2vaxd_k$ = fold;
  protoOf(MDCContextElement).minusKey_9i5ggf_k$ = minusKey;
  protoOf(MDCContextElement).plus_s13ygv_k$ = plus;
  //endregion
  return _;
}));

//# sourceMappingURL=ktor-ktor-client-ktor-client-plugins-ktor-client-logging.js.map
