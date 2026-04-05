(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js', './ktor-ktor-http.js', './ktor-ktor-shared-ktor-serialization.js', './ktor-ktor-io.js', './ktor-ktor-client-ktor-client-core.js', './ktor-ktor-utils.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'), require('./ktor-ktor-http.js'), require('./ktor-ktor-shared-ktor-serialization.js'), require('./ktor-ktor-io.js'), require('./ktor-ktor-client-ktor-client-core.js'), require('./ktor-ktor-utils.js'));
  else {
    if (typeof globalThis['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'ktor-ktor-client-ktor-client-plugins-ktor-client-content-negotiation'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'ktor-ktor-client-ktor-client-plugins-ktor-client-content-negotiation'.");
    }
    if (typeof globalThis['ktor-ktor-http'] === 'undefined') {
      throw new Error("Error loading module 'ktor-ktor-client-ktor-client-plugins-ktor-client-content-negotiation'. Its dependency 'ktor-ktor-http' was not found. Please, check whether 'ktor-ktor-http' is loaded prior to 'ktor-ktor-client-ktor-client-plugins-ktor-client-content-negotiation'.");
    }
    if (typeof globalThis['ktor-ktor-shared-ktor-serialization'] === 'undefined') {
      throw new Error("Error loading module 'ktor-ktor-client-ktor-client-plugins-ktor-client-content-negotiation'. Its dependency 'ktor-ktor-shared-ktor-serialization' was not found. Please, check whether 'ktor-ktor-shared-ktor-serialization' is loaded prior to 'ktor-ktor-client-ktor-client-plugins-ktor-client-content-negotiation'.");
    }
    if (typeof globalThis['ktor-ktor-io'] === 'undefined') {
      throw new Error("Error loading module 'ktor-ktor-client-ktor-client-plugins-ktor-client-content-negotiation'. Its dependency 'ktor-ktor-io' was not found. Please, check whether 'ktor-ktor-io' is loaded prior to 'ktor-ktor-client-ktor-client-plugins-ktor-client-content-negotiation'.");
    }
    if (typeof globalThis['ktor-ktor-client-ktor-client-core'] === 'undefined') {
      throw new Error("Error loading module 'ktor-ktor-client-ktor-client-plugins-ktor-client-content-negotiation'. Its dependency 'ktor-ktor-client-ktor-client-core' was not found. Please, check whether 'ktor-ktor-client-ktor-client-core' is loaded prior to 'ktor-ktor-client-ktor-client-plugins-ktor-client-content-negotiation'.");
    }
    if (typeof globalThis['ktor-ktor-utils'] === 'undefined') {
      throw new Error("Error loading module 'ktor-ktor-client-ktor-client-plugins-ktor-client-content-negotiation'. Its dependency 'ktor-ktor-utils' was not found. Please, check whether 'ktor-ktor-utils' is loaded prior to 'ktor-ktor-client-ktor-client-plugins-ktor-client-content-negotiation'.");
    }
    globalThis['ktor-ktor-client-ktor-client-plugins-ktor-client-content-negotiation'] = factory(typeof globalThis['ktor-ktor-client-ktor-client-plugins-ktor-client-content-negotiation'] === 'undefined' ? {} : globalThis['ktor-ktor-client-ktor-client-plugins-ktor-client-content-negotiation'], globalThis['kotlin-kotlin-stdlib'], globalThis['ktor-ktor-http'], globalThis['ktor-ktor-shared-ktor-serialization'], globalThis['ktor-ktor-io'], globalThis['ktor-ktor-client-ktor-client-core'], globalThis['ktor-ktor-utils']);
  }
}(function (_, kotlin_kotlin, kotlin_io_ktor_ktor_http, kotlin_io_ktor_ktor_serialization, kotlin_io_ktor_ktor_io, kotlin_io_ktor_ktor_client_core, kotlin_io_ktor_ktor_utils) {
  'use strict';
  //region block: imports
  var protoOf = kotlin_kotlin.$_$.fe;
  var initMetadataForClass = kotlin_kotlin.$_$.bd;
  var ContentTypeMatcher = kotlin_io_ktor_ktor_http.$_$.s;
  var VOID = kotlin_kotlin.$_$.i;
  var plus = kotlin_kotlin.$_$.r9;
  var toMutableSet = kotlin_kotlin.$_$.xa;
  var ArrayList_init_$Create$ = kotlin_kotlin.$_$.u;
  var Application_getInstance = kotlin_io_ktor_ktor_http.$_$.b;
  var register$default = kotlin_io_ktor_ktor_serialization.$_$.b;
  var Configuration = kotlin_io_ktor_ktor_serialization.$_$.c;
  var Exception = kotlin_kotlin.$_$.fj;
  var Exception_init_$Init$ = kotlin_kotlin.$_$.v1;
  var captureStack = kotlin_kotlin.$_$.mc;
  var Unit_getInstance = kotlin_kotlin.$_$.f6;
  var Charsets_getInstance = kotlin_io_ktor_ktor_io.$_$.m;
  var CoroutineImpl = kotlin_kotlin.$_$.yb;
  var THROW_CCE = kotlin_kotlin.$_$.nj;
  var TransformRequestBodyContext = kotlin_io_ktor_ktor_client_core.$_$.i;
  var HttpRequestBuilder = kotlin_io_ktor_ktor_client_core.$_$.m;
  var TypeInfo = kotlin_io_ktor_ktor_utils.$_$.j;
  var get_COROUTINE_SUSPENDED = kotlin_kotlin.$_$.hb;
  var initMetadataForLambda = kotlin_kotlin.$_$.gd;
  var TransformResponseBodyContext = kotlin_io_ktor_ktor_client_core.$_$.j;
  var HttpResponse = kotlin_io_ktor_ktor_client_core.$_$.r;
  var ByteReadChannel = kotlin_io_ktor_ktor_io.$_$.i1;
  var isInterface = kotlin_kotlin.$_$.qd;
  var contentType = kotlin_io_ktor_ktor_http.$_$.i1;
  var get_request = kotlin_io_ktor_ktor_client_core.$_$.t;
  var suitableCharset = kotlin_io_ktor_ktor_serialization.$_$.d;
  var toString = kotlin_kotlin.$_$.je;
  var HttpHeaders_getInstance = kotlin_io_ktor_ktor_http.$_$.f;
  var accept = kotlin_io_ktor_ktor_client_core.$_$.n;
  var Collection = kotlin_kotlin.$_$.h6;
  var OutgoingContent = kotlin_io_ktor_ktor_http.$_$.q;
  var getKClassFromExpression = kotlin_kotlin.$_$.e;
  var contentType_0 = kotlin_io_ktor_ktor_http.$_$.g1;
  var EmptyContent_getInstance = kotlin_io_ktor_ktor_client_core.$_$.f;
  var Unit = kotlin_kotlin.$_$.yj;
  var charset = kotlin_io_ktor_ktor_http.$_$.e1;
  var ensureNotNull = kotlin_kotlin.$_$.fk;
  var NullBody_getInstance = kotlin_io_ktor_ktor_http.$_$.a;
  var equals = kotlin_kotlin.$_$.uc;
  var joinToString = kotlin_kotlin.$_$.y8;
  var initMetadataForCoroutine = kotlin_kotlin.$_$.dd;
  var collectionSizeOrDefault = kotlin_kotlin.$_$.q7;
  var ArrayList_init_$Create$_0 = kotlin_kotlin.$_$.t;
  var deserialize = kotlin_io_ktor_ktor_serialization.$_$.a;
  var KtorSimpleLogger = kotlin_io_ktor_ktor_utils.$_$.f;
  var PrimitiveClasses_getInstance = kotlin_kotlin.$_$.t5;
  var HttpStatusCode = kotlin_io_ktor_ktor_http.$_$.w;
  var getKClass = kotlin_kotlin.$_$.f;
  var setOf = kotlin_kotlin.$_$.ea;
  var createClientPlugin = kotlin_io_ktor_ktor_client_core.$_$.k;
  var SuspendFunction4 = kotlin_kotlin.$_$.dc;
  var startsWith = kotlin_kotlin.$_$.hh;
  var endsWith = kotlin_kotlin.$_$.cg;
  var initMetadataForObject = kotlin_kotlin.$_$.hd;
  var LinkedHashSet_init_$Create$ = kotlin_kotlin.$_$.f1;
  //endregion
  //region block: pre-declaration
  initMetadataForClass(ConverterRegistration, 'ConverterRegistration');
  initMetadataForClass(ContentNegotiationConfig$defaultMatcher$1, VOID, VOID, VOID, [ContentTypeMatcher]);
  initMetadataForClass(ContentNegotiationConfig, 'ContentNegotiationConfig', ContentNegotiationConfig, VOID, [Configuration]);
  initMetadataForClass(ContentConverterException, 'ContentConverterException', VOID, Exception);
  initMetadataForLambda(ContentNegotiation$lambda$slambda, CoroutineImpl, [CoroutineImpl], [4]);
  initMetadataForLambda(ContentNegotiation$lambda$slambda_1, CoroutineImpl, [CoroutineImpl], [4]);
  initMetadataForCoroutine($invoke$convertRequestCOROUTINE$0, CoroutineImpl);
  initMetadataForCoroutine($invoke$convertResponseCOROUTINE$1, CoroutineImpl);
  initMetadataForObject(JsonContentTypeMatcher, 'JsonContentTypeMatcher', VOID, VOID, [ContentTypeMatcher]);
  //endregion
  function get_LOGGER() {
    _init_properties_ContentNegotiation_kt__o183go();
    return LOGGER;
  }
  var LOGGER;
  function get_DefaultCommonIgnoredTypes() {
    _init_properties_ContentNegotiation_kt__o183go();
    return DefaultCommonIgnoredTypes;
  }
  var DefaultCommonIgnoredTypes;
  function get_ContentNegotiation() {
    _init_properties_ContentNegotiation_kt__o183go();
    return ContentNegotiation;
  }
  var ContentNegotiation;
  function ConverterRegistration(converter, contentTypeToSend, contentTypeMatcher) {
    this.converter_1 = converter;
    this.contentTypeToSend_1 = contentTypeToSend;
    this.contentTypeMatcher_1 = contentTypeMatcher;
  }
  protoOf(ConverterRegistration).get_converter_2qavhz_k$ = function () {
    return this.converter_1;
  };
  protoOf(ConverterRegistration).get_contentTypeToSend_v7r6xf_k$ = function () {
    return this.contentTypeToSend_1;
  };
  protoOf(ConverterRegistration).get_contentTypeMatcher_b310yg_k$ = function () {
    return this.contentTypeMatcher_1;
  };
  function defaultMatcher($this, pattern) {
    return new ContentNegotiationConfig$defaultMatcher$1(pattern);
  }
  function ContentNegotiationConfig$defaultMatcher$1($pattern) {
    this.$pattern_1 = $pattern;
  }
  protoOf(ContentNegotiationConfig$defaultMatcher$1).contains_eqyxob_k$ = function (contentType) {
    return contentType.match_syvve3_k$(this.$pattern_1);
  };
  function ContentNegotiationConfig() {
    this.ignoredTypes_1 = toMutableSet(plus(get_DefaultIgnoredTypes(), get_DefaultCommonIgnoredTypes()));
    var tmp = this;
    // Inline function 'kotlin.collections.mutableListOf' call
    tmp.registrations_1 = ArrayList_init_$Create$();
  }
  protoOf(ContentNegotiationConfig).get_ignoredTypes_65xo7h_k$ = function () {
    return this.ignoredTypes_1;
  };
  protoOf(ContentNegotiationConfig).get_registrations_yr9o38_k$ = function () {
    return this.registrations_1;
  };
  protoOf(ContentNegotiationConfig).register_48t3rv_k$ = function (contentType, converter, configuration) {
    var matcher = contentType.equals(Application_getInstance().get_Json_wo4ci9_k$()) ? JsonContentTypeMatcher_getInstance() : defaultMatcher(this, contentType);
    this.register_rs9lpt_k$(contentType, converter, matcher, configuration);
  };
  protoOf(ContentNegotiationConfig).register_rs9lpt_k$ = function (contentTypeToSend, converter, contentTypeMatcher, configuration) {
    // Inline function 'kotlin.apply' call
    configuration(converter);
    var registration = new ConverterRegistration(converter, contentTypeToSend, contentTypeMatcher);
    this.registrations_1.add_utx5q5_k$(registration);
  };
  protoOf(ContentNegotiationConfig).removeIgnoredType_lfss1y_k$ = function (type) {
    this.ignoredTypes_1.remove_cedx0m_k$(type);
  };
  protoOf(ContentNegotiationConfig).ignoreType_eznety_k$ = function (type) {
    this.ignoredTypes_1.add_utx5q5_k$(type);
  };
  protoOf(ContentNegotiationConfig).clearIgnoredTypes_8dwsnw_k$ = function () {
    this.ignoredTypes_1.clear_j9egeb_k$();
  };
  function ContentConverterException(message) {
    Exception_init_$Init$(message, this);
    captureStack(this, ContentConverterException);
  }
  function ContentNegotiationConfig$_init_$ref_1ne3ob() {
    var l = function () {
      return new ContentNegotiationConfig();
    };
    l.callableName = '<init>';
    return l;
  }
  function ContentNegotiation$lambda($this$createClientPlugin) {
    _init_properties_ContentNegotiation_kt__o183go();
    var registrations = $this$createClientPlugin.get_pluginConfig_p50bdq_k$().registrations_1;
    var ignoredTypes = $this$createClientPlugin.get_pluginConfig_p50bdq_k$().ignoredTypes_1;
    $this$createClientPlugin.transformRequestBody_immy9t_k$(ContentNegotiation$lambda$slambda_0(registrations, ignoredTypes, $this$createClientPlugin, null));
    $this$createClientPlugin.transformResponseBody_ee7rr5_k$(ContentNegotiation$lambda$slambda_2(ignoredTypes, registrations, $this$createClientPlugin, null));
    return Unit_getInstance();
  }
  function invoke$convertRequest(registrations, ignoredTypes, $this_createClientPlugin, request, body, $completion) {
    var tmp = new $invoke$convertRequestCOROUTINE$0(registrations, ignoredTypes, $this_createClientPlugin, request, body, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  }
  function invoke$convertResponse(ignoredTypes, registrations, $this_createClientPlugin, requestUrl, info, body, responseContentType, charset, $completion) {
    charset = charset === VOID ? Charsets_getInstance().get_UTF_8_ihn39z_k$() : charset;
    var tmp = new $invoke$convertResponseCOROUTINE$1(ignoredTypes, registrations, $this_createClientPlugin, requestUrl, info, body, responseContentType, charset, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  }
  function ContentNegotiation$lambda$slambda($registrations, $ignoredTypes, $this_createClientPlugin, resultContinuation) {
    this.$registrations_1 = $registrations;
    this.$ignoredTypes_1 = $ignoredTypes;
    this.$this_createClientPlugin_1 = $this_createClientPlugin;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(ContentNegotiation$lambda$slambda).invoke_7k9dla_k$ = function ($this$transformRequestBody, request, body, _unused_var__etf5q3, $completion) {
    var tmp = this.create_lx5dax_k$($this$transformRequestBody, request, body, _unused_var__etf5q3, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(ContentNegotiation$lambda$slambda).invoke_k6wp4t_k$ = function (p1, p2, p3, p4, $completion) {
    var tmp = p1 instanceof TransformRequestBodyContext ? p1 : THROW_CCE();
    var tmp_0 = p2 instanceof HttpRequestBuilder ? p2 : THROW_CCE();
    var tmp_1 = !(p3 == null) ? p3 : THROW_CCE();
    return this.invoke_7k9dla_k$(tmp, tmp_0, tmp_1, (p4 == null ? true : p4 instanceof TypeInfo) ? p4 : THROW_CCE(), $completion);
  };
  protoOf(ContentNegotiation$lambda$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = invoke$convertRequest(this.$registrations_1, this.$ignoredTypes_1, this.$this_createClientPlugin_1, this.request_1, this.body_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            return suspendResult;
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
  protoOf(ContentNegotiation$lambda$slambda).create_lx5dax_k$ = function ($this$transformRequestBody, request, body, _unused_var__etf5q3, completion) {
    var i = new ContentNegotiation$lambda$slambda(this.$registrations_1, this.$ignoredTypes_1, this.$this_createClientPlugin_1, completion);
    i.$this$transformRequestBody_1 = $this$transformRequestBody;
    i.request_1 = request;
    i.body_1 = body;
    i._unused_var__etf5q3__1 = _unused_var__etf5q3;
    return i;
  };
  function ContentNegotiation$lambda$slambda_0($registrations, $ignoredTypes, $this_createClientPlugin, resultContinuation) {
    var i = new ContentNegotiation$lambda$slambda($registrations, $ignoredTypes, $this_createClientPlugin, resultContinuation);
    var l = function ($this$transformRequestBody, request, body, _unused_var__etf5q3, $completion) {
      return i.invoke_7k9dla_k$($this$transformRequestBody, request, body, _unused_var__etf5q3, $completion);
    };
    l.$arity = 4;
    return l;
  }
  function ContentNegotiation$lambda$slambda_1($ignoredTypes, $registrations, $this_createClientPlugin, resultContinuation) {
    this.$ignoredTypes_1 = $ignoredTypes;
    this.$registrations_1 = $registrations;
    this.$this_createClientPlugin_1 = $this_createClientPlugin;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(ContentNegotiation$lambda$slambda_1).invoke_nybta2_k$ = function ($this$transformResponseBody, response, body, info, $completion) {
    var tmp = this.create_sqry20_k$($this$transformResponseBody, response, body, info, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(ContentNegotiation$lambda$slambda_1).invoke_k6wp4t_k$ = function (p1, p2, p3, p4, $completion) {
    var tmp = p1 instanceof TransformResponseBodyContext ? p1 : THROW_CCE();
    var tmp_0 = p2 instanceof HttpResponse ? p2 : THROW_CCE();
    var tmp_1 = (!(p3 == null) ? isInterface(p3, ByteReadChannel) : false) ? p3 : THROW_CCE();
    return this.invoke_nybta2_k$(tmp, tmp_0, tmp_1, p4 instanceof TypeInfo ? p4 : THROW_CCE(), $completion);
  };
  protoOf(ContentNegotiation$lambda$slambda_1).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            var tmp_0 = this;
            var tmp0_elvis_lhs = contentType(this.response_1);
            var tmp_1;
            if (tmp0_elvis_lhs == null) {
              return null;
            } else {
              tmp_1 = tmp0_elvis_lhs;
            }

            tmp_0.contentType0__1 = tmp_1;
            this.charset1__1 = suitableCharset(get_request(this.response_1).get_headers_ef25jx_k$());
            this.set_state_rjd8d0_k$(1);
            suspendResult = invoke$convertResponse(this.$ignoredTypes_1, this.$registrations_1, this.$this_createClientPlugin_1, get_request(this.response_1).get_url_18iuii_k$(), this.info_1, this.body_1, this.contentType0__1, this.charset1__1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            return suspendResult;
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
  protoOf(ContentNegotiation$lambda$slambda_1).create_sqry20_k$ = function ($this$transformResponseBody, response, body, info, completion) {
    var i = new ContentNegotiation$lambda$slambda_1(this.$ignoredTypes_1, this.$registrations_1, this.$this_createClientPlugin_1, completion);
    i.$this$transformResponseBody_1 = $this$transformResponseBody;
    i.response_1 = response;
    i.body_1 = body;
    i.info_1 = info;
    return i;
  };
  function ContentNegotiation$lambda$slambda_2($ignoredTypes, $registrations, $this_createClientPlugin, resultContinuation) {
    var i = new ContentNegotiation$lambda$slambda_1($ignoredTypes, $registrations, $this_createClientPlugin, resultContinuation);
    var l = function ($this$transformResponseBody, response, body, info, $completion) {
      return i.invoke_nybta2_k$($this$transformResponseBody, response, body, info, $completion);
    };
    l.$arity = 4;
    return l;
  }
  function ContentNegotiation$lambda$convertRequest$lambda(it) {
    _init_properties_ContentNegotiation_kt__o183go();
    return toString(it.converter_1);
  }
  function $invoke$convertRequestCOROUTINE$0(registrations, ignoredTypes, $this_createClientPlugin, request, body, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.registrations_1 = registrations;
    this.ignoredTypes_1 = ignoredTypes;
    this.$this_createClientPlugin_1 = $this_createClientPlugin;
    this.request_1 = request;
    this.body_1 = body;
  }
  protoOf($invoke$convertRequestCOROUTINE$0).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(7);
            var _iterator__ex2g4s = this.registrations_1.iterator_jk1svi_k$();
            while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
              var element = _iterator__ex2g4s.next_20eer_k$();
              l$ret$1: do {
                get_LOGGER().trace_fti9bv_k$('Adding Accept=' + element.contentTypeToSend_1.get_contentType_7git4a_k$() + ' header for ' + this.request_1.get_url_18iuii_k$().toString());
                if (this.request_1.get_headers_ef25jx_k$().contains_7gmd9b_k$(HttpHeaders_getInstance().get_Accept_4a5gpb_k$(), element.contentTypeToSend_1.toString())) {
                  break l$ret$1;
                }
                accept(this.request_1, element.contentTypeToSend_1);
              }
               while (false);
            }

            var tmp_0;
            var tmp_1 = this.body_1;
            if (tmp_1 instanceof OutgoingContent) {
              tmp_0 = true;
            } else {
              var tmp2 = this.ignoredTypes_1;
              var tmp$ret$2;
              l$ret$3: do {
                var tmp_2;
                if (isInterface(tmp2, Collection)) {
                  tmp_2 = tmp2.isEmpty_y1axqb_k$();
                } else {
                  tmp_2 = false;
                }
                if (tmp_2) {
                  tmp$ret$2 = false;
                  break l$ret$3;
                }
                var _iterator__ex2g4s_0 = tmp2.iterator_jk1svi_k$();
                while (_iterator__ex2g4s_0.hasNext_bitz1p_k$()) {
                  var element_0 = _iterator__ex2g4s_0.next_20eer_k$();
                  if (element_0.isInstance_6tn68w_k$(this.body_1)) {
                    tmp$ret$2 = true;
                    break l$ret$3;
                  }
                }
                tmp$ret$2 = false;
              }
               while (false);
              tmp_0 = tmp$ret$2;
            }

            if (tmp_0) {
              get_LOGGER().trace_fti9bv_k$('Body type ' + toString(getKClassFromExpression(this.body_1)) + ' is in ignored types. ' + ('Skipping ContentNegotiation for ' + this.request_1.get_url_18iuii_k$().toString() + '.'));
              return null;
            }

            var tmp_3 = this;
            var tmp0_elvis_lhs = contentType_0(this.request_1);
            var tmp_4;
            if (tmp0_elvis_lhs == null) {
              this.$this_createClientPlugin_1;
              get_LOGGER().trace_fti9bv_k$("Request doesn't have Content-Type header. Skipping ContentNegotiation for " + this.request_1.get_url_18iuii_k$().toString() + '.');
              return null;
            } else {
              tmp_4 = tmp0_elvis_lhs;
            }

            tmp_3.contentType0__1 = tmp_4;
            var tmp_5 = this.body_1;
            if (tmp_5 instanceof Unit) {
              get_LOGGER().trace_fti9bv_k$('Sending empty body for ' + this.request_1.get_url_18iuii_k$().toString());
              this.request_1.get_headers_ef25jx_k$().remove_6241ba_k$(HttpHeaders_getInstance().get_ContentType_z1j0sq_k$());
              return EmptyContent_getInstance();
            }

            var tmp_6 = this;
            var tmp0 = this.registrations_1;
            var destination = ArrayList_init_$Create$();
            var _iterator__ex2g4s_1 = tmp0.iterator_jk1svi_k$();
            while (_iterator__ex2g4s_1.hasNext_bitz1p_k$()) {
              var element_1 = _iterator__ex2g4s_1.next_20eer_k$();
              if (element_1.contentTypeMatcher_1.contains_eqyxob_k$(this.contentType0__1)) {
                destination.add_utx5q5_k$(element_1);
              }
            }

            var tmp_7;
            if (!destination.isEmpty_y1axqb_k$()) {
              tmp_7 = destination;
            } else {
              tmp_7 = null;
            }

            var tmp1_elvis_lhs = tmp_7;
            var tmp_8;
            if (tmp1_elvis_lhs == null) {
              this.$this_createClientPlugin_1;
              get_LOGGER().trace_fti9bv_k$('None of the registered converters match request Content-Type=' + this.contentType0__1.toString() + '. ' + ('Skipping ContentNegotiation for ' + this.request_1.get_url_18iuii_k$().toString() + '.'));
              return null;
            } else {
              tmp_8 = tmp1_elvis_lhs;
            }

            tmp_6.matchingRegistrations1__1 = tmp_8;
            if (this.request_1.get_bodyType_3n7prv_k$() == null) {
              get_LOGGER().trace_fti9bv_k$('Request has unknown body type. Skipping ContentNegotiation for ' + this.request_1.get_url_18iuii_k$().toString() + '.');
              return null;
            }

            this.request_1.get_headers_ef25jx_k$().remove_6241ba_k$(HttpHeaders_getInstance().get_ContentType_z1j0sq_k$());
            var tmp_9 = this;
            tmp_9.tmp122__1 = this.matchingRegistrations1__1;
            this.set_state_rjd8d0_k$(1);
            continue $sm;
          case 1:
            this.this4__1 = this.tmp122__1;
            this._iterator_5_yqohr5__1 = this.this4__1.iterator_jk1svi_k$();
            this.set_state_rjd8d0_k$(2);
            continue $sm;
          case 2:
            if (!this._iterator_5_yqohr5__1.hasNext_bitz1p_k$()) {
              this.set_state_rjd8d0_k$(5);
              continue $sm;
            }

            this.element6__1 = this._iterator_5_yqohr5__1.next_20eer_k$();
            var tmp_10 = this;
            tmp_10.tmp137__1 = this.element6__1;
            this.registration8__1 = this.tmp137__1;
            this.set_state_rjd8d0_k$(3);
            var tmp0_elvis_lhs_0 = charset(this.contentType0__1);
            var tmp_11 = tmp0_elvis_lhs_0 == null ? Charsets_getInstance().get_UTF_8_ihn39z_k$() : tmp0_elvis_lhs_0;
            var tmp_12 = ensureNotNull(this.request_1.get_bodyType_3n7prv_k$());
            var this_0 = this.body_1;
            var tmp_13;
            if (!equals(this_0, NullBody_getInstance())) {
              tmp_13 = this_0;
            } else {
              tmp_13 = null;
            }

            suspendResult = this.registration8__1.converter_1.serialize_vlmgdn_k$(this.contentType0__1, tmp_11, tmp_12, tmp_13, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 3:
            var result = suspendResult;
            if (!(result == null)) {
              get_LOGGER().trace_fti9bv_k$('Converted request body using ' + toString(this.registration8__1.converter_1) + ' for ' + this.request_1.get_url_18iuii_k$().toString());
            }

            var result_0 = result;
            if (!(result_0 == null)) {
              this.tmp$ret$43__1 = result_0;
              this.set_state_rjd8d0_k$(6);
              continue $sm;
            } else {
              this.set_state_rjd8d0_k$(4);
              continue $sm;
            }

          case 4:
            this.set_state_rjd8d0_k$(2);
            continue $sm;
          case 5:
            this.tmp$ret$43__1 = null;
            if (false) {
              this.set_state_rjd8d0_k$(1);
              continue $sm;
            }

            this.set_state_rjd8d0_k$(6);
            continue $sm;
          case 6:
            var tmp2_elvis_lhs = this.tmp$ret$43__1;
            var tmp_14;
            if (tmp2_elvis_lhs == null) {
              var tmp_15 = "Can't convert " + toString(this.body_1) + ' with contentType ' + this.contentType0__1.toString() + ' using converters ';
              throw new ContentConverterException(tmp_15 + joinToString(this.matchingRegistrations1__1, VOID, VOID, VOID, VOID, VOID, ContentNegotiation$lambda$convertRequest$lambda));
            } else {
              tmp_14 = tmp2_elvis_lhs;
            }

            var serializedContent = tmp_14;
            return serializedContent;
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
  function $invoke$convertResponseCOROUTINE$1(ignoredTypes, registrations, $this_createClientPlugin, requestUrl, info, body, responseContentType, charset, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.ignoredTypes_1 = ignoredTypes;
    this.registrations_1 = registrations;
    this.$this_createClientPlugin_1 = $this_createClientPlugin;
    this.requestUrl_1 = requestUrl;
    this.info_1 = info;
    this.body_1 = body;
    this.responseContentType_1 = responseContentType;
    this.charset_1 = charset;
  }
  protoOf($invoke$convertResponseCOROUTINE$1).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            var tmp_0 = this.body_1;
            if (!isInterface(tmp_0, ByteReadChannel)) {
              get_LOGGER().trace_fti9bv_k$('Response body is already transformed. Skipping ContentNegotiation for ' + this.requestUrl_1.toString() + '.');
              return null;
            }

            if (this.ignoredTypes_1.contains_aljjnj_k$(this.info_1.get_type_wovaf7_k$())) {
              get_LOGGER().trace_fti9bv_k$('Response body type ' + toString(this.info_1.get_type_wovaf7_k$()) + ' is in ignored types. ' + ('Skipping ContentNegotiation for ' + this.requestUrl_1.toString() + '.'));
              return null;
            }

            var tmp_1 = this;
            var tmp0 = this.registrations_1;
            var destination = ArrayList_init_$Create$();
            var _iterator__ex2g4s = tmp0.iterator_jk1svi_k$();
            while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
              var element = _iterator__ex2g4s.next_20eer_k$();
              if (element.contentTypeMatcher_1.contains_eqyxob_k$(this.responseContentType_1)) {
                destination.add_utx5q5_k$(element);
              }
            }

            var destination_0 = ArrayList_init_$Create$_0(collectionSizeOrDefault(destination, 10));
            var _iterator__ex2g4s_0 = destination.iterator_jk1svi_k$();
            while (_iterator__ex2g4s_0.hasNext_bitz1p_k$()) {
              var item = _iterator__ex2g4s_0.next_20eer_k$();
              destination_0.add_utx5q5_k$(item.converter_1);
            }

            var tmp_2;
            if (!destination_0.isEmpty_y1axqb_k$()) {
              tmp_2 = destination_0;
            } else {
              tmp_2 = null;
            }

            var tmp0_elvis_lhs = tmp_2;
            var tmp_3;
            if (tmp0_elvis_lhs == null) {
              this.$this_createClientPlugin_1;
              get_LOGGER().trace_fti9bv_k$('None of the registered converters match response with Content-Type=' + this.responseContentType_1.toString() + '. ' + ('Skipping ContentNegotiation for ' + this.requestUrl_1.toString() + '.'));
              return null;
            } else {
              tmp_3 = tmp0_elvis_lhs;
            }

            tmp_1.suitableConverters0__1 = tmp_3;
            this.set_state_rjd8d0_k$(1);
            suspendResult = deserialize(this.suitableConverters0__1, this.body_1, this.info_1, this.charset_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var result = suspendResult;
            if (!isInterface(result, ByteReadChannel)) {
              get_LOGGER().trace_fti9bv_k$('Response body was converted to ' + toString(getKClassFromExpression(result)) + ' for ' + this.requestUrl_1.toString() + '.');
            }

            return result;
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
  var properties_initialized_ContentNegotiation_kt_1ayduy;
  function _init_properties_ContentNegotiation_kt__o183go() {
    if (!properties_initialized_ContentNegotiation_kt_1ayduy) {
      properties_initialized_ContentNegotiation_kt_1ayduy = true;
      LOGGER = KtorSimpleLogger('io.ktor.client.plugins.contentnegotiation.ContentNegotiation');
      DefaultCommonIgnoredTypes = setOf([PrimitiveClasses_getInstance().get_byteArrayClass_57my8g_k$(), PrimitiveClasses_getInstance().get_stringClass_bik2gy_k$(), getKClass(HttpStatusCode), getKClass(ByteReadChannel), getKClass(OutgoingContent)]);
      var tmp = ContentNegotiationConfig$_init_$ref_1ne3ob();
      ContentNegotiation = createClientPlugin('ContentNegotiation', tmp, ContentNegotiation$lambda);
    }
  }
  function JsonContentTypeMatcher() {
    JsonContentTypeMatcher_instance = this;
  }
  protoOf(JsonContentTypeMatcher).contains_eqyxob_k$ = function (contentType) {
    if (contentType.match_syvve3_k$(Application_getInstance().get_Json_wo4ci9_k$())) {
      return true;
    }
    var value = contentType.withoutParameters_wrqe36_k$().toString();
    return startsWith(value, 'application/', true) && endsWith(value, '+json', true);
  };
  var JsonContentTypeMatcher_instance;
  function JsonContentTypeMatcher_getInstance() {
    if (JsonContentTypeMatcher_instance == null)
      new JsonContentTypeMatcher();
    return JsonContentTypeMatcher_instance;
  }
  function get_DefaultIgnoredTypes() {
    _init_properties_DefaultIgnoredTypesJs_kt__rjtdk1();
    return DefaultIgnoredTypes;
  }
  var DefaultIgnoredTypes;
  var properties_initialized_DefaultIgnoredTypesJs_kt_65g2xt;
  function _init_properties_DefaultIgnoredTypesJs_kt__rjtdk1() {
    if (!properties_initialized_DefaultIgnoredTypesJs_kt_65g2xt) {
      properties_initialized_DefaultIgnoredTypesJs_kt_65g2xt = true;
      // Inline function 'kotlin.collections.mutableSetOf' call
      DefaultIgnoredTypes = LinkedHashSet_init_$Create$();
    }
  }
  //region block: post-declaration
  protoOf(ContentNegotiationConfig).register$default_yp0q2f_k$ = register$default;
  //endregion
  return _;
}));

//# sourceMappingURL=ktor-ktor-client-ktor-client-plugins-ktor-client-content-negotiation.js.map
