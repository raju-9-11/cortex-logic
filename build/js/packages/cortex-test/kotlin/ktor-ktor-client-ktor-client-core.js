(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js', './kotlinx-coroutines-core.js', './ktor-ktor-utils.js', './kotlinx-atomicfu.js', './ktor-ktor-shared-ktor-events.js', './ktor-ktor-io.js', './ktor-ktor-http.js', './kotlinx-io-kotlinx-io-core.js', './ktor-ktor-shared-ktor-sse.js', './ktor-ktor-shared-ktor-websockets.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'), require('./kotlinx-coroutines-core.js'), require('./ktor-ktor-utils.js'), require('./kotlinx-atomicfu.js'), require('./ktor-ktor-shared-ktor-events.js'), require('./ktor-ktor-io.js'), require('./ktor-ktor-http.js'), require('./kotlinx-io-kotlinx-io-core.js'), require('./ktor-ktor-shared-ktor-sse.js'), require('./ktor-ktor-shared-ktor-websockets.js'));
  else {
    if (typeof globalThis['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'ktor-ktor-client-ktor-client-core'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'ktor-ktor-client-ktor-client-core'.");
    }
    if (typeof globalThis['kotlinx-coroutines-core'] === 'undefined') {
      throw new Error("Error loading module 'ktor-ktor-client-ktor-client-core'. Its dependency 'kotlinx-coroutines-core' was not found. Please, check whether 'kotlinx-coroutines-core' is loaded prior to 'ktor-ktor-client-ktor-client-core'.");
    }
    if (typeof globalThis['ktor-ktor-utils'] === 'undefined') {
      throw new Error("Error loading module 'ktor-ktor-client-ktor-client-core'. Its dependency 'ktor-ktor-utils' was not found. Please, check whether 'ktor-ktor-utils' is loaded prior to 'ktor-ktor-client-ktor-client-core'.");
    }
    if (typeof globalThis['kotlinx-atomicfu'] === 'undefined') {
      throw new Error("Error loading module 'ktor-ktor-client-ktor-client-core'. Its dependency 'kotlinx-atomicfu' was not found. Please, check whether 'kotlinx-atomicfu' is loaded prior to 'ktor-ktor-client-ktor-client-core'.");
    }
    if (typeof globalThis['ktor-ktor-shared-ktor-events'] === 'undefined') {
      throw new Error("Error loading module 'ktor-ktor-client-ktor-client-core'. Its dependency 'ktor-ktor-shared-ktor-events' was not found. Please, check whether 'ktor-ktor-shared-ktor-events' is loaded prior to 'ktor-ktor-client-ktor-client-core'.");
    }
    if (typeof globalThis['ktor-ktor-io'] === 'undefined') {
      throw new Error("Error loading module 'ktor-ktor-client-ktor-client-core'. Its dependency 'ktor-ktor-io' was not found. Please, check whether 'ktor-ktor-io' is loaded prior to 'ktor-ktor-client-ktor-client-core'.");
    }
    if (typeof globalThis['ktor-ktor-http'] === 'undefined') {
      throw new Error("Error loading module 'ktor-ktor-client-ktor-client-core'. Its dependency 'ktor-ktor-http' was not found. Please, check whether 'ktor-ktor-http' is loaded prior to 'ktor-ktor-client-ktor-client-core'.");
    }
    if (typeof globalThis['kotlinx-io-kotlinx-io-core'] === 'undefined') {
      throw new Error("Error loading module 'ktor-ktor-client-ktor-client-core'. Its dependency 'kotlinx-io-kotlinx-io-core' was not found. Please, check whether 'kotlinx-io-kotlinx-io-core' is loaded prior to 'ktor-ktor-client-ktor-client-core'.");
    }
    if (typeof globalThis['ktor-ktor-shared-ktor-sse'] === 'undefined') {
      throw new Error("Error loading module 'ktor-ktor-client-ktor-client-core'. Its dependency 'ktor-ktor-shared-ktor-sse' was not found. Please, check whether 'ktor-ktor-shared-ktor-sse' is loaded prior to 'ktor-ktor-client-ktor-client-core'.");
    }
    if (typeof globalThis['ktor-ktor-shared-ktor-websockets'] === 'undefined') {
      throw new Error("Error loading module 'ktor-ktor-client-ktor-client-core'. Its dependency 'ktor-ktor-shared-ktor-websockets' was not found. Please, check whether 'ktor-ktor-shared-ktor-websockets' is loaded prior to 'ktor-ktor-client-ktor-client-core'.");
    }
    globalThis['ktor-ktor-client-ktor-client-core'] = factory(typeof globalThis['ktor-ktor-client-ktor-client-core'] === 'undefined' ? {} : globalThis['ktor-ktor-client-ktor-client-core'], globalThis['kotlin-kotlin-stdlib'], globalThis['kotlinx-coroutines-core'], globalThis['ktor-ktor-utils'], globalThis['kotlinx-atomicfu'], globalThis['ktor-ktor-shared-ktor-events'], globalThis['ktor-ktor-io'], globalThis['ktor-ktor-http'], globalThis['kotlinx-io-kotlinx-io-core'], globalThis['ktor-ktor-shared-ktor-sse'], globalThis['ktor-ktor-shared-ktor-websockets']);
  }
}(function (_, kotlin_kotlin, kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core, kotlin_io_ktor_ktor_utils, kotlin_org_jetbrains_kotlinx_atomicfu, kotlin_io_ktor_ktor_events, kotlin_io_ktor_ktor_io, kotlin_io_ktor_ktor_http, kotlin_org_jetbrains_kotlinx_kotlinx_io_core, kotlin_io_ktor_ktor_sse, kotlin_io_ktor_ktor_websockets) {
  'use strict';
  //region block: imports
  var imul = Math.imul;
  var protoOf = kotlin_kotlin.$_$.be;
  var objectCreate = kotlin_kotlin.$_$.ae;
  var cancel = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.n2;
  var Unit_getInstance = kotlin_kotlin.$_$.f6;
  var CoroutineImpl = kotlin_kotlin.$_$.vb;
  var THROW_CCE = kotlin_kotlin.$_$.jj;
  var PipelineContext = kotlin_io_ktor_ktor_utils.$_$.g;
  var toString = kotlin_kotlin.$_$.fe;
  var getKClassFromExpression = kotlin_kotlin.$_$.e;
  var IllegalStateException_init_$Create$ = kotlin_kotlin.$_$.i2;
  var get_COROUTINE_SUSPENDED = kotlin_kotlin.$_$.eb;
  var initMetadataForLambda = kotlin_kotlin.$_$.cd;
  var initMetadataForCoroutine = kotlin_kotlin.$_$.zc;
  var VOID = kotlin_kotlin.$_$.h;
  var atomic$boolean$1 = kotlin_org_jetbrains_kotlinx_atomicfu.$_$.b;
  var Key_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.p;
  var Job = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.g2;
  var AttributesJsFn = kotlin_io_ktor_ktor_utils.$_$.m;
  var Events = kotlin_io_ktor_ktor_events.$_$.b;
  var AttributeKey = kotlin_io_ktor_ktor_utils.$_$.l;
  var Closeable = kotlin_io_ktor_ktor_io.$_$.v;
  var isInterface = kotlin_kotlin.$_$.md;
  var CoroutineScope = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.a2;
  var initMetadataForClass = kotlin_kotlin.$_$.xc;
  var ensureNotNull = kotlin_kotlin.$_$.bk;
  var SuspendFunction2 = kotlin_kotlin.$_$.yb;
  var LinkedHashMap_init_$Create$ = kotlin_kotlin.$_$.c1;
  var PlatformUtils_getInstance = kotlin_io_ktor_ktor_utils.$_$.a;
  var ByteReadChannel = kotlin_io_ktor_ktor_io.$_$.i1;
  var PrimitiveClasses_getInstance = kotlin_kotlin.$_$.t5;
  var arrayOf = kotlin_kotlin.$_$.xj;
  var createKType = kotlin_kotlin.$_$.c;
  var TypeInfo = kotlin_io_ktor_ktor_utils.$_$.j;
  var initMetadataForCompanion = kotlin_kotlin.$_$.yc;
  var instanceOf = kotlin_io_ktor_ktor_utils.$_$.k;
  var NullBody_getInstance = kotlin_io_ktor_ktor_http.$_$.a;
  var equals = kotlin_kotlin.$_$.qc;
  var cancel_0 = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.p2;
  var throwUninitializedPropertyAccessException = kotlin_kotlin.$_$.nk;
  var IllegalStateException = kotlin_kotlin.$_$.dj;
  var IllegalStateException_init_$Init$ = kotlin_kotlin.$_$.g2;
  var captureStack = kotlin_kotlin.$_$.ic;
  var defineProp = kotlin_kotlin.$_$.pc;
  var UnsupportedOperationException = kotlin_kotlin.$_$.vj;
  var UnsupportedOperationException_init_$Init$ = kotlin_kotlin.$_$.w2;
  var HttpHeaders_getInstance = kotlin_io_ktor_ktor_http.$_$.f;
  var trimIndent = kotlin_kotlin.$_$.ci;
  var contentLength = kotlin_io_ktor_ktor_http.$_$.f1;
  var toLong = kotlin_kotlin.$_$.de;
  var ByteReadChannel_0 = kotlin_io_ktor_ktor_io.$_$.h1;
  var readRemaining = kotlin_io_ktor_ktor_io.$_$.g;
  var readByteArray = kotlin_org_jetbrains_kotlinx_kotlinx_io_core.$_$.k;
  var IllegalStateException_init_$Init$_0 = kotlin_kotlin.$_$.h2;
  var Long = kotlin_kotlin.$_$.ej;
  var Companion_getInstance = kotlin_io_ktor_ktor_http.$_$.g;
  var toString_0 = kotlin_kotlin.$_$.pk;
  var initMetadataForInterface = kotlin_kotlin.$_$.bd;
  var noWhenBranchMatchedException = kotlin_kotlin.$_$.ik;
  var GlobalScope_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.o;
  var writer = kotlin_io_ktor_ktor_io.$_$.q1;
  var WriteChannelContent = kotlin_io_ktor_ktor_http.$_$.p;
  var ReadChannelContent = kotlin_io_ktor_ktor_http.$_$.o;
  var Companion_getInstance_0 = kotlin_io_ktor_ktor_io.$_$.n;
  var NoContent = kotlin_io_ktor_ktor_http.$_$.m;
  var ProtocolUpgrade = kotlin_io_ktor_ktor_http.$_$.n;
  var ByteArrayContent = kotlin_io_ktor_ktor_http.$_$.k;
  var ContentWrapper = kotlin_io_ktor_ktor_http.$_$.l;
  var WriterScope = kotlin_io_ktor_ktor_io.$_$.j1;
  var SuspendFunction1 = kotlin_kotlin.$_$.xb;
  var IllegalArgumentException_init_$Create$ = kotlin_kotlin.$_$.d2;
  var OutgoingContent = kotlin_io_ktor_ktor_http.$_$.q;
  var get_job = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.u2;
  var async = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.m2;
  var emptySet = kotlin_kotlin.$_$.k8;
  var ArrayList_init_$Create$ = kotlin_kotlin.$_$.t;
  var UnsafeHeaderException = kotlin_io_ktor_ktor_http.$_$.y;
  var CancellationException_init_$Create$ = kotlin_kotlin.$_$.h1;
  var CoroutineName = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.y1;
  var getKClass = kotlin_kotlin.$_$.f;
  var getStarKTypeProjection = kotlin_kotlin.$_$.g;
  var SilentSupervisor = kotlin_io_ktor_ktor_utils.$_$.o;
  var lazy = kotlin_kotlin.$_$.hk;
  var CompletableJob = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.u1;
  var KProperty1 = kotlin_kotlin.$_$.bf;
  var getPropertyCallableRef = kotlin_kotlin.$_$.uc;
  var KtMutableMap = kotlin_kotlin.$_$.y6;
  var createInvariantKTypeProjection = kotlin_kotlin.$_$.a;
  var setOf = kotlin_kotlin.$_$.aa;
  var Key = kotlin_kotlin.$_$.tb;
  var get = kotlin_kotlin.$_$.qb;
  var fold = kotlin_kotlin.$_$.pb;
  var minusKey = kotlin_kotlin.$_$.rb;
  var plus = kotlin_kotlin.$_$.ub;
  var Element = kotlin_kotlin.$_$.sb;
  var joinToString = kotlin_kotlin.$_$.x8;
  var setOf_0 = kotlin_kotlin.$_$.ba;
  var PipelinePhase = kotlin_io_ktor_ktor_utils.$_$.h;
  var isSuspendFunction = kotlin_kotlin.$_$.qd;
  var initMetadataForObject = kotlin_kotlin.$_$.dd;
  var KtorSimpleLogger = kotlin_io_ktor_ktor_utils.$_$.f;
  var MalformedInputException = kotlin_io_ktor_ktor_io.$_$.o;
  var Unit = kotlin_kotlin.$_$.uj;
  var Application_getInstance = kotlin_io_ktor_ktor_http.$_$.b;
  var toLong_0 = kotlin_kotlin.$_$.th;
  var contentType = kotlin_io_ktor_ktor_http.$_$.g1;
  var isByteArray = kotlin_kotlin.$_$.gd;
  var Text_getInstance = kotlin_io_ktor_ktor_http.$_$.d;
  var TextContent = kotlin_io_ktor_ktor_http.$_$.r;
  var copyTo = kotlin_io_ktor_ktor_io.$_$.b;
  var CancellationException = kotlin_kotlin.$_$.db;
  var cancel_1 = kotlin_io_ktor_ktor_io.$_$.l1;
  var HttpStatusCode = kotlin_io_ktor_ktor_http.$_$.w;
  var invokeOnCompletion = kotlin_io_ktor_ktor_io.$_$.n1;
  var toByteArray = kotlin_io_ktor_ktor_io.$_$.j;
  var Source = kotlin_org_jetbrains_kotlinx_kotlinx_io_core.$_$.i;
  var readText = kotlin_io_ktor_ktor_io.$_$.p1;
  var toInt = kotlin_kotlin.$_$.qh;
  var reversed = kotlin_kotlin.$_$.z9;
  var Attributes = kotlin_io_ktor_ktor_utils.$_$.n;
  var LinkedHashSet_init_$Create$ = kotlin_kotlin.$_$.e1;
  var Charsets_getInstance = kotlin_io_ktor_ktor_io.$_$.m;
  var toList = kotlin_kotlin.$_$.ma;
  var sortedWith = kotlin_kotlin.$_$.fa;
  var StringBuilder_init_$Create$ = kotlin_kotlin.$_$.n1;
  var charSequenceLength = kotlin_kotlin.$_$.mc;
  var get_name = kotlin_io_ktor_ktor_io.$_$.t;
  var roundToInt = kotlin_kotlin.$_$.he;
  var firstOrNull = kotlin_kotlin.$_$.m8;
  var FunctionAdapter = kotlin_kotlin.$_$.ec;
  var Comparator = kotlin_kotlin.$_$.wi;
  var hashCode = kotlin_kotlin.$_$.wc;
  var charset = kotlin_io_ktor_ktor_http.$_$.e1;
  var withCharset = kotlin_io_ktor_ktor_http.$_$.o1;
  var charset_0 = kotlin_io_ktor_ktor_http.$_$.d1;
  var readText_0 = kotlin_io_ktor_ktor_io.$_$.z;
  var compareValues = kotlin_kotlin.$_$.cb;
  var SuspendFunction4 = kotlin_kotlin.$_$.ac;
  var Companion_getInstance_1 = kotlin_io_ktor_ktor_http.$_$.i;
  var get_authority = kotlin_io_ktor_ktor_http.$_$.c1;
  var takeFrom = kotlin_io_ktor_ktor_http.$_$.n1;
  var isSecure = kotlin_io_ktor_ktor_http.$_$.j1;
  var get_authority_0 = kotlin_io_ktor_ktor_http.$_$.b1;
  var EventDefinition = kotlin_io_ktor_ktor_events.$_$.a;
  var initMetadataForFunctionReference = kotlin_kotlin.$_$.ad;
  var SupervisorJob = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.k2;
  var cancel_2 = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.q2;
  var SuspendFunction0 = kotlin_kotlin.$_$.wb;
  var Default_getInstance = kotlin_kotlin.$_$.s5;
  var delay = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.i;
  var toLongOrNull = kotlin_kotlin.$_$.sh;
  var numberToLong = kotlin_kotlin.$_$.zd;
  var trimMargin = kotlin_kotlin.$_$.di;
  var IOException = kotlin_org_jetbrains_kotlinx_kotlinx_io_core.$_$.h;
  var IOException_init_$Init$ = kotlin_org_jetbrains_kotlinx_kotlinx_io_core.$_$.e;
  var CopyableThrowable = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.v1;
  var isWebsocket = kotlin_io_ktor_ktor_http.$_$.k1;
  var launch = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.v2;
  var SuspendFunction3 = kotlin_kotlin.$_$.zb;
  var createKTypeParameter = kotlin_kotlin.$_$.b;
  var NullBody = kotlin_io_ktor_ktor_http.$_$.j;
  var BytePacketBuilder = kotlin_io_ktor_ktor_io.$_$.u;
  var get_availableForRead = kotlin_io_ktor_ktor_io.$_$.k1;
  var readPacket = kotlin_io_ktor_ktor_io.$_$.f;
  var writePacket = kotlin_io_ktor_ktor_io.$_$.l;
  var Exception = kotlin_kotlin.$_$.bj;
  var writePacket_0 = kotlin_io_ktor_ktor_io.$_$.d1;
  var build = kotlin_io_ktor_ktor_io.$_$.w;
  var CompletableDeferred = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.t1;
  var Dispatchers_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.n;
  var get_isCompleted = kotlin_io_ktor_ktor_io.$_$.o1;
  var writeFully = kotlin_io_ktor_ktor_io.$_$.k;
  var atomic$ref$1 = kotlin_org_jetbrains_kotlinx_atomicfu.$_$.d;
  var RuntimeException = kotlin_kotlin.$_$.ij;
  var RuntimeException_init_$Init$ = kotlin_kotlin.$_$.s2;
  var Companion_getInstance_2 = kotlin_kotlin.$_$.a6;
  var _Result___init__impl__xyqfz8 = kotlin_kotlin.$_$.v3;
  var createFailure = kotlin_kotlin.$_$.ak;
  var discard = kotlin_io_ktor_ktor_io.$_$.c;
  var split = kotlin_io_ktor_ktor_utils.$_$.c1;
  var removePrefix = kotlin_kotlin.$_$.tg;
  var removeSuffix = kotlin_kotlin.$_$.ug;
  var ProducerScope = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.s;
  var readUTF8Line = kotlin_io_ktor_ktor_io.$_$.i;
  var isBlank = kotlin_kotlin.$_$.eg;
  var substringBefore = kotlin_kotlin.$_$.ih;
  var substringAfter = kotlin_kotlin.$_$.hh;
  var contains = kotlin_kotlin.$_$.pf;
  var startsWith = kotlin_kotlin.$_$.ch;
  var ServerSentEvent = kotlin_io_ktor_ktor_sse.$_$.a;
  var _Duration___get_inWholeMilliseconds__impl__msfiry = kotlin_kotlin.$_$.c3;
  var channelFlow = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.b1;
  var contentType_0 = kotlin_io_ktor_ktor_http.$_$.h1;
  var Duration = kotlin_kotlin.$_$.ji;
  var contentType_1 = kotlin_io_ktor_ktor_http.$_$.i1;
  var HeadersBuilder = kotlin_io_ktor_ktor_http.$_$.t;
  var append = kotlin_io_ktor_ktor_http.$_$.a1;
  var Companion_getInstance_3 = kotlin_kotlin.$_$.v5;
  var DurationUnit_MILLISECONDS_getInstance = kotlin_kotlin.$_$.k;
  var toDuration = kotlin_kotlin.$_$.oi;
  var IllegalStateException_init_$Init$_1 = kotlin_kotlin.$_$.j2;
  var KtList = kotlin_kotlin.$_$.p6;
  var WebSocketExtension = kotlin_io_ktor_ktor_websockets.$_$.k;
  var ByteChannel = kotlin_io_ktor_ktor_io.$_$.g1;
  var copyAndClose = kotlin_io_ktor_ktor_io.$_$.a;
  var URLBuilder = kotlin_io_ktor_ktor_http.$_$.x;
  var takeFrom_0 = kotlin_io_ktor_ktor_http.$_$.m1;
  var appendAll = kotlin_io_ktor_ktor_utils.$_$.x;
  var putAll = kotlin_io_ktor_ktor_utils.$_$.b1;
  var HttpMessageBuilder = kotlin_io_ktor_ktor_http.$_$.u;
  var HttpMessage = kotlin_io_ktor_ktor_http.$_$.v;
  var Companion_getInstance_4 = kotlin_io_ktor_ktor_http.$_$.c;
  var GMTDate = kotlin_io_ktor_ktor_utils.$_$.c;
  var Pipeline = kotlin_io_ktor_ktor_utils.$_$.i;
  var toByteArray_0 = kotlin_io_ktor_ktor_io.$_$.b1;
  var decode = kotlin_io_ktor_ktor_io.$_$.p;
  var readFully = kotlin_io_ktor_ktor_io.$_$.e;
  var get_ByteArrayPool = kotlin_io_ktor_ktor_io.$_$.f1;
  var readAvailable = kotlin_io_ktor_ktor_io.$_$.d;
  var close = kotlin_io_ktor_ktor_io.$_$.m1;
  var KtMutableList = kotlin_kotlin.$_$.v6;
  var Companion_getInstance_5 = kotlin_io_ktor_ktor_http.$_$.h;
  var CoroutineScope_0 = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.z1;
  var equals_0 = kotlin_kotlin.$_$.yf;
  var flatten = kotlin_kotlin.$_$.p8;
  var copyToArray = kotlin_kotlin.$_$.e8;
  var await_0 = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.g;
  var CancellationException_0 = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.s1;
  var cancel_3 = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.o2;
  var Companion_getInstance_6 = kotlin_io_ktor_ktor_http.$_$.e;
  var intercepted = kotlin_kotlin.$_$.hb;
  var CancellableContinuationImpl = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.r1;
  var toTypedArray = kotlin_kotlin.$_$.wa;
  var Error_init_$Create$ = kotlin_kotlin.$_$.s1;
  var Companion_getInstance_7 = kotlin_io_ktor_ktor_websockets.$_$.h;
  var Codes_CLOSED_ABNORMALLY_getInstance = kotlin_io_ktor_ktor_websockets.$_$.a;
  var Text_init_$Create$ = kotlin_io_ktor_ktor_websockets.$_$.g;
  var Binary_init_$Create$ = kotlin_io_ktor_ktor_websockets.$_$.e;
  var CloseReason = kotlin_io_ktor_ktor_websockets.$_$.i;
  var Close_init_$Create$ = kotlin_io_ktor_ktor_websockets.$_$.f;
  var decodeToString = kotlin_kotlin.$_$.sf;
  var Buffer = kotlin_org_jetbrains_kotlinx_kotlinx_io_core.$_$.g;
  var writeFully_0 = kotlin_io_ktor_ktor_io.$_$.c1;
  var cancelConsumed = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.t;
  var Codes_NORMAL_getInstance = kotlin_io_ktor_ktor_websockets.$_$.b;
  var Channel = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.r;
  var emptyList = kotlin_kotlin.$_$.i8;
  var start$default = kotlin_io_ktor_ktor_websockets.$_$.d;
  var send = kotlin_io_ktor_ktor_websockets.$_$.c;
  var DefaultWebSocketSession = kotlin_io_ktor_ktor_websockets.$_$.j;
  var IOException_init_$Init$_0 = kotlin_org_jetbrains_kotlinx_kotlinx_io_core.$_$.b;
  var EmptyCoroutineContext_getInstance = kotlin_kotlin.$_$.k5;
  //endregion
  //region block: pre-declaration
  initMetadataForLambda(HttpClient$slambda, CoroutineImpl, [CoroutineImpl], [2]);
  initMetadataForLambda(HttpClient$slambda_1, CoroutineImpl, [CoroutineImpl], [2]);
  initMetadataForCoroutine($executeCOROUTINE$0, CoroutineImpl);
  initMetadataForClass(HttpClient, 'HttpClient', VOID, VOID, [CoroutineScope, Closeable], [1]);
  initMetadataForClass(HttpClientConfig, 'HttpClientConfig', HttpClientConfig);
  initMetadataForCompanion(Companion);
  initMetadataForCoroutine($bodyNullableCOROUTINE$1, CoroutineImpl);
  initMetadataForCoroutine($bodyCOROUTINE$2, CoroutineImpl);
  initMetadataForClass(HttpClientCall, 'HttpClientCall', VOID, VOID, [CoroutineScope], [0, 1]);
  initMetadataForClass(DoubleReceiveException, 'DoubleReceiveException', VOID, IllegalStateException);
  initMetadataForClass(NoTransformationFoundException, 'NoTransformationFoundException', VOID, UnsupportedOperationException);
  initMetadataForClass(SavedHttpCall, 'SavedHttpCall', VOID, HttpClientCall, VOID, [0, 1]);
  function get_coroutineContext() {
    return this.get_call_wojxrb_k$().get_coroutineContext_115oqo_k$();
  }
  initMetadataForInterface(HttpRequest_0, 'HttpRequest', VOID, VOID, [HttpMessage, CoroutineScope]);
  initMetadataForClass(SavedHttpRequest, 'SavedHttpRequest', VOID, VOID, [HttpRequest_0]);
  initMetadataForClass(HttpResponse, 'HttpResponse', VOID, VOID, [HttpMessage, CoroutineScope]);
  initMetadataForClass(SavedHttpResponse, 'SavedHttpResponse', VOID, HttpResponse);
  initMetadataForCoroutine($saveCOROUTINE$3, CoroutineImpl);
  initMetadataForClass(UnsupportedContentTypeException, 'UnsupportedContentTypeException', VOID, IllegalStateException);
  initMetadataForInterface(ProgressListener, 'ProgressListener', VOID, VOID, VOID, [2]);
  initMetadataForLambda(ObservableContent$getContent$slambda, CoroutineImpl, [CoroutineImpl], [1]);
  initMetadataForClass(ObservableContent, 'ObservableContent', VOID, ReadChannelContent);
  initMetadataForLambda(HttpClientEngine$install$slambda, CoroutineImpl, [CoroutineImpl], [2]);
  initMetadataForLambda(HttpClientEngine$executeWithinCallContext$slambda, CoroutineImpl, [CoroutineImpl], [1]);
  initMetadataForCoroutine($executeWithinCallContextCOROUTINE$4, CoroutineImpl);
  function get_supportedCapabilities() {
    return emptySet();
  }
  function install(client) {
    var tmp = client.get_sendPipeline_5dhg2b_k$();
    var tmp_0 = Phases_getInstance_0().get_Engine_27ulqt_k$();
    tmp.intercept_k21bv3_k$(tmp_0, HttpClientEngine$install$slambda_0(client, this, null));
  }
  initMetadataForInterface(HttpClientEngine, 'HttpClientEngine', VOID, VOID, [CoroutineScope, Closeable], [1]);
  initMetadataForClass(ClientEngineClosedException, 'ClientEngineClosedException', ClientEngineClosedException, IllegalStateException);
  initMetadataForClass(HttpClientEngineBase, 'HttpClientEngineBase', VOID, VOID, [HttpClientEngine], [1]);
  initMetadataForInterface(HttpClientEngineCapability, 'HttpClientEngineCapability');
  initMetadataForClass(HttpClientEngineConfig, 'HttpClientEngineConfig', HttpClientEngineConfig);
  function create$default(block, $super) {
    var tmp;
    if (block === VOID) {
      tmp = HttpClientEngineFactory$create$lambda;
    } else {
      tmp = block;
    }
    block = tmp;
    return $super === VOID ? this.create_kry9d7_k$(block) : $super.create_kry9d7_k$.call(this, block);
  }
  initMetadataForInterface(HttpClientEngineFactory, 'HttpClientEngineFactory');
  initMetadataForCompanion(Companion_0, VOID, [Key]);
  initMetadataForClass(KtorCallContextElement, 'KtorCallContextElement', VOID, VOID, [Element]);
  initMetadataForLambda(AfterRenderHook$install$slambda, CoroutineImpl, [CoroutineImpl], [2]);
  initMetadataForInterface(ClientHook, 'ClientHook');
  initMetadataForObject(AfterRenderHook, 'AfterRenderHook', VOID, VOID, [ClientHook]);
  initMetadataForLambda(AfterReceiveHook$install$slambda, CoroutineImpl, [CoroutineImpl], [2]);
  initMetadataForObject(AfterReceiveHook, 'AfterReceiveHook', VOID, VOID, [ClientHook]);
  initMetadataForLambda(BodyProgress$lambda$slambda, CoroutineImpl, [CoroutineImpl], [2]);
  initMetadataForLambda(BodyProgress$lambda$slambda_1, CoroutineImpl, [CoroutineImpl], [1]);
  initMetadataForClass(ResponseException, 'ResponseException', VOID, IllegalStateException);
  initMetadataForClass(RedirectResponseException, 'RedirectResponseException', VOID, ResponseException);
  initMetadataForClass(ClientRequestException, 'ClientRequestException', VOID, ResponseException);
  initMetadataForClass(ServerResponseException, 'ServerResponseException', VOID, ResponseException);
  initMetadataForLambda(addDefaultResponseValidation$lambda$slambda, CoroutineImpl, [CoroutineImpl], [1]);
  initMetadataForClass(defaultTransformers$1$content$1, VOID, VOID, ByteArrayContent);
  initMetadataForClass(defaultTransformers$1$content$2, VOID, VOID, ReadChannelContent);
  initMetadataForLambda(defaultTransformers$slambda, CoroutineImpl, [CoroutineImpl], [2]);
  initMetadataForLambda(defaultTransformers$slambda$slambda, CoroutineImpl, [CoroutineImpl], [1]);
  initMetadataForLambda(defaultTransformers$slambda_1, CoroutineImpl, [CoroutineImpl], [2]);
  initMetadataForClass(SaveBodyPluginConfig, 'SaveBodyPluginConfig', SaveBodyPluginConfig);
  initMetadataForLambda(SaveBodyPlugin$lambda$slambda, CoroutineImpl, [CoroutineImpl], [2]);
  initMetadataForClass(HttpCallValidatorConfig, 'HttpCallValidatorConfig', HttpCallValidatorConfig);
  initMetadataForInterface(HandlerWrapper, 'HandlerWrapper');
  initMetadataForClass(ExceptionHandlerWrapper, 'ExceptionHandlerWrapper', VOID, VOID, [HandlerWrapper]);
  initMetadataForClass(RequestExceptionHandlerWrapper, 'RequestExceptionHandlerWrapper', VOID, VOID, [HandlerWrapper]);
  initMetadataForLambda(RequestError$install$slambda, CoroutineImpl, [CoroutineImpl], [2]);
  initMetadataForObject(RequestError, 'RequestError', VOID, VOID, [ClientHook]);
  initMetadataForLambda(ReceiveError$install$slambda, CoroutineImpl, [CoroutineImpl], [2]);
  initMetadataForObject(ReceiveError, 'ReceiveError', VOID, VOID, [ClientHook]);
  initMetadataForLambda(HttpCallValidator$lambda$slambda, CoroutineImpl, [CoroutineImpl], [1]);
  initMetadataForLambda(HttpCallValidator$lambda$slambda_1, CoroutineImpl, [CoroutineImpl], [2]);
  initMetadataForLambda(HttpCallValidator$lambda$slambda_3, CoroutineImpl, [CoroutineImpl], [2]);
  initMetadataForLambda(HttpCallValidator$lambda$slambda_5, CoroutineImpl, [CoroutineImpl], [2]);
  initMetadataForCoroutine($invoke$validateResponseCOROUTINE$5, CoroutineImpl);
  initMetadataForCoroutine($invoke$processExceptionCOROUTINE$6, CoroutineImpl);
  initMetadataForClass(HttpRequest$1, VOID, VOID, VOID, [HttpRequest_0]);
  function prepare$default(block, $super) {
    var tmp;
    if (block === VOID) {
      tmp = HttpClientPlugin$prepare$lambda;
    } else {
      tmp = block;
    }
    block = tmp;
    return $super === VOID ? this.prepare_t1xtpw_k$(block) : $super.prepare_t1xtpw_k$.call(this, block);
  }
  initMetadataForInterface(HttpClientPlugin, 'HttpClientPlugin');
  initMetadataForClass(HttpPlainTextConfig, 'HttpPlainTextConfig', HttpPlainTextConfig);
  initMetadataForLambda(RenderRequestHook$install$slambda, CoroutineImpl, [CoroutineImpl], [2]);
  initMetadataForObject(RenderRequestHook, 'RenderRequestHook', VOID, VOID, [ClientHook]);
  initMetadataForClass(sam$kotlin_Comparator$0, 'sam$kotlin_Comparator$0', VOID, VOID, [Comparator, FunctionAdapter]);
  initMetadataForLambda(HttpPlainText$lambda$slambda, CoroutineImpl, [CoroutineImpl], [2]);
  initMetadataForLambda(HttpPlainText$lambda$slambda_1, CoroutineImpl, [CoroutineImpl], [4]);
  initMetadataForClass(HttpRedirectConfig, 'HttpRedirectConfig', HttpRedirectConfig);
  initMetadataForLambda(HttpRedirect$lambda$slambda, CoroutineImpl, [CoroutineImpl], [2]);
  initMetadataForCoroutine($invoke$handleCallCOROUTINE$7, CoroutineImpl);
  initMetadataForFunctionReference(SetupRequestContext$install$slambda$proceed$ref, VOID, VOID, [0]);
  initMetadataForCoroutine($invoke$proceedCOROUTINE$8, CoroutineImpl);
  initMetadataForLambda(SetupRequestContext$install$slambda, CoroutineImpl, [CoroutineImpl], [2, 0]);
  initMetadataForObject(SetupRequestContext, 'SetupRequestContext', VOID, VOID, [ClientHook]);
  initMetadataForLambda(HttpRequestLifecycle$lambda$slambda, CoroutineImpl, [CoroutineImpl], [2]);
  initMetadataForClass(HttpRetryEventData, 'HttpRetryEventData');
  initMetadataForLambda(HttpRequestRetryConfig$delay$slambda, CoroutineImpl, [CoroutineImpl], [1]);
  initMetadataForClass(HttpRequestRetryConfig, 'HttpRequestRetryConfig', HttpRequestRetryConfig);
  initMetadataForClass(HttpRetryShouldRetryContext, 'HttpRetryShouldRetryContext');
  initMetadataForClass(HttpRetryDelayContext, 'HttpRetryDelayContext');
  initMetadataForClass(HttpRetryModifyRequestContext, 'HttpRetryModifyRequestContext');
  initMetadataForLambda(HttpRequestRetry$lambda$slambda, CoroutineImpl, [CoroutineImpl], [2]);
  initMetadataForInterface(Sender, 'Sender', VOID, VOID, VOID, [1]);
  initMetadataForLambda(HttpSend$Plugin$install$slambda, CoroutineImpl, [CoroutineImpl], [2]);
  initMetadataForCoroutine($executeCOROUTINE$9, CoroutineImpl);
  initMetadataForClass(Config, 'Config', Config);
  initMetadataForObject(Plugin, 'Plugin', VOID, VOID, [HttpClientPlugin]);
  initMetadataForClass(InterceptedSender, 'InterceptedSender', VOID, VOID, [Sender], [1]);
  initMetadataForClass(DefaultSender, 'DefaultSender', VOID, VOID, [Sender], [1]);
  initMetadataForClass(HttpSend, 'HttpSend');
  initMetadataForClass(SendCountExceedException, 'SendCountExceedException', VOID, IllegalStateException);
  initMetadataForObject(HttpTimeoutCapability, 'HttpTimeoutCapability', VOID, VOID, [HttpClientEngineCapability]);
  initMetadataForClass(HttpRequestTimeoutException, 'HttpRequestTimeoutException', VOID, IOException, [IOException, CopyableThrowable]);
  initMetadataForCompanion(Companion_1);
  initMetadataForClass(HttpTimeoutConfig, 'HttpTimeoutConfig', HttpTimeoutConfig_init_$Create$);
  initMetadataForLambda(HttpTimeout$lambda$slambda$slambda, CoroutineImpl, [CoroutineImpl], [1]);
  initMetadataForLambda(HttpTimeout$lambda$slambda, CoroutineImpl, [CoroutineImpl], [2]);
  initMetadataForClass(UserAgentConfig, 'UserAgentConfig', UserAgentConfig);
  initMetadataForLambda(UserAgent$lambda$slambda, CoroutineImpl, [CoroutineImpl], [3]);
  initMetadataForClass(HookHandler, 'HookHandler');
  initMetadataForClass(ClientPluginBuilder, 'ClientPluginBuilder');
  initMetadataForClass(ClientPluginInstance, 'ClientPluginInstance', VOID, VOID, [Closeable]);
  initMetadataForLambda(SetupRequest$install$slambda, CoroutineImpl, [CoroutineImpl], [2]);
  initMetadataForObject(SetupRequest, 'SetupRequest', VOID, VOID, [ClientHook]);
  initMetadataForClass(Sender_0, 'Sender', VOID, VOID, [CoroutineScope], [1]);
  initMetadataForLambda(Send$install$slambda, CoroutineImpl, [CoroutineImpl], [2]);
  initMetadataForObject(Send, 'Send', VOID, VOID, [ClientHook]);
  initMetadataForInterface(ClientPlugin, 'ClientPlugin', VOID, VOID, [HttpClientPlugin]);
  initMetadataForClass(ClientPluginImpl, 'ClientPluginImpl', VOID, VOID, [ClientPlugin]);
  initMetadataForClass(TransformResponseBodyContext, 'TransformResponseBodyContext');
  initMetadataForClass(OnRequestContext, 'OnRequestContext');
  initMetadataForLambda(RequestHook$install$slambda, CoroutineImpl, [CoroutineImpl], [2]);
  initMetadataForObject(RequestHook, 'RequestHook', VOID, VOID, [ClientHook]);
  initMetadataForClass(OnResponseContext, 'OnResponseContext');
  initMetadataForLambda(ResponseHook$install$slambda, CoroutineImpl, [CoroutineImpl], [2]);
  initMetadataForObject(ResponseHook, 'ResponseHook', VOID, VOID, [ClientHook]);
  initMetadataForClass(TransformRequestBodyContext, 'TransformRequestBodyContext');
  initMetadataForLambda(TransformRequestBodyHook$install$slambda, CoroutineImpl, [CoroutineImpl], [2]);
  initMetadataForObject(TransformRequestBodyHook, 'TransformRequestBodyHook', VOID, VOID, [ClientHook]);
  initMetadataForLambda(TransformResponseBodyHook$install$slambda, CoroutineImpl, [CoroutineImpl], [2]);
  initMetadataForObject(TransformResponseBodyHook, 'TransformResponseBodyHook', VOID, VOID, [ClientHook]);
  initMetadataForLambda(ByteChannelReplay$CopyFromSourceTask$receiveBody$slambda, CoroutineImpl, [CoroutineImpl], [1]);
  initMetadataForClass(CopyFromSourceTask, 'CopyFromSourceTask', VOID, VOID, VOID, [0]);
  initMetadataForLambda(ByteChannelReplay$replay$slambda, CoroutineImpl, [CoroutineImpl], [1]);
  initMetadataForClass(ByteChannelReplay, 'ByteChannelReplay');
  initMetadataForClass(SaveBodyAbandonedReadException, 'SaveBodyAbandonedReadException', SaveBodyAbandonedReadException, RuntimeException);
  initMetadataForClass(DelegatedCall, 'DelegatedCall', VOID, HttpClientCall, VOID, [0, 1]);
  initMetadataForClass(DelegatedRequest, 'DelegatedRequest', VOID, VOID, [HttpRequest_0]);
  initMetadataForClass(DelegatedResponse, 'DelegatedResponse', VOID, HttpResponse);
  initMetadataForLambda(ResponseObserverConfig$responseHandler$slambda, CoroutineImpl, [CoroutineImpl], [1]);
  initMetadataForClass(ResponseObserverConfig, 'ResponseObserverConfig', ResponseObserverConfig);
  initMetadataForClass(Context, 'Context', VOID, VOID, VOID, [1]);
  initMetadataForLambda(AfterReceiveHook$install$slambda_1, CoroutineImpl, [CoroutineImpl], [2]);
  initMetadataForObject(AfterReceiveHook_0, 'AfterReceiveHook', VOID, VOID, [ClientHook]);
  initMetadataForLambda(ResponseObserver$lambda$slambda$slambda, CoroutineImpl, [CoroutineImpl], [1]);
  initMetadataForLambda(ResponseObserver$lambda$slambda, CoroutineImpl, [CoroutineImpl], [2]);
  initMetadataForInterface(SSESession, 'SSESession', VOID, VOID, [CoroutineScope]);
  initMetadataForClass(ClientSSESession, 'ClientSSESession', VOID, VOID, [SSESession]);
  initMetadataForLambda(DefaultClientSSESession$_incoming$slambda, CoroutineImpl, [CoroutineImpl], [1]);
  initMetadataForCoroutine($parseEventCOROUTINE$10, CoroutineImpl);
  initMetadataForClass(DefaultClientSSESession, 'DefaultClientSSESession', VOID, VOID, [SSESession], [0]);
  initMetadataForLambda(AfterRender$install$slambda, CoroutineImpl, [CoroutineImpl], [2]);
  initMetadataForObject(AfterRender, 'AfterRender', VOID, VOID, [ClientHook]);
  initMetadataForObject(SSECapability, 'SSECapability', VOID, VOID, [HttpClientEngineCapability]);
  initMetadataForClass(SSEClientException, 'SSEClientException', SSEClientException, IllegalStateException);
  initMetadataForLambda(SSE$lambda$slambda, CoroutineImpl, [CoroutineImpl], [2]);
  initMetadataForLambda(SSE$lambda$slambda_1, CoroutineImpl, [CoroutineImpl], [2]);
  initMetadataForClass(SSEClientContent, 'SSEClientContent', VOID, ContentWrapper);
  initMetadataForClass(SSEConfig, 'SSEConfig', SSEConfig);
  initMetadataForObject(WebSocketCapability, 'WebSocketCapability', VOID, VOID, [HttpClientEngineCapability]);
  initMetadataForClass(WebSocketException, 'WebSocketException', VOID, IllegalStateException);
  initMetadataForCoroutine($pipeToCOROUTINE$11, CoroutineImpl);
  initMetadataForClass(ClientUpgradeContent, 'ClientUpgradeContent', VOID, NoContent, VOID, [1]);
  initMetadataForClass(DefaultHttpRequest, 'DefaultHttpRequest', VOID, VOID, [HttpRequest_0]);
  initMetadataForCompanion(Companion_2);
  initMetadataForClass(HttpRequestBuilder, 'HttpRequestBuilder', HttpRequestBuilder, VOID, [HttpMessageBuilder]);
  initMetadataForClass(HttpRequestData, 'HttpRequestData');
  initMetadataForInterface(ResponseAdapter, 'ResponseAdapter');
  initMetadataForClass(SSEClientResponseAdapter, 'SSEClientResponseAdapter', SSEClientResponseAdapter, VOID, [ResponseAdapter]);
  initMetadataForClass(HttpResponseData, 'HttpResponseData');
  initMetadataForObject(Phases, 'Phases');
  initMetadataForClass(HttpRequestPipeline, 'HttpRequestPipeline', HttpRequestPipeline, Pipeline, VOID, [2]);
  initMetadataForObject(Phases_0, 'Phases');
  initMetadataForClass(HttpSendPipeline, 'HttpSendPipeline', HttpSendPipeline, Pipeline, VOID, [2]);
  initMetadataForClass(DefaultHttpResponse, 'DefaultHttpResponse', VOID, HttpResponse);
  initMetadataForCoroutine($bodyAsTextCOROUTINE$12, CoroutineImpl);
  initMetadataForCoroutine($bodyAsChannelCOROUTINE$13, CoroutineImpl);
  initMetadataForObject(Phases_1, 'Phases');
  initMetadataForClass(HttpReceivePipeline, 'HttpReceivePipeline', HttpReceivePipeline, Pipeline, VOID, [2]);
  initMetadataForObject(Phases_2, 'Phases');
  initMetadataForClass(HttpResponsePipeline, 'HttpResponsePipeline', HttpResponsePipeline, Pipeline, VOID, [2]);
  initMetadataForClass(HttpResponseContainer, 'HttpResponseContainer');
  initMetadataForCoroutine($executeCOROUTINE$14, CoroutineImpl);
  initMetadataForCoroutine($fetchStreamingResponseCOROUTINE$15, CoroutineImpl);
  initMetadataForCoroutine($fetchResponseCOROUTINE$16, CoroutineImpl);
  initMetadataForCoroutine($cleanupCOROUTINE$17, CoroutineImpl);
  initMetadataForClass(HttpStatement, 'HttpStatement', VOID, VOID, VOID, [1, 0]);
  initMetadataForCoroutine($readBytesCOROUTINE$18, CoroutineImpl);
  initMetadataForLambda(observable$slambda, CoroutineImpl, [CoroutineImpl], [1]);
  initMetadataForClass(HttpResponseReceiveFail, 'HttpResponseReceiveFail');
  initMetadataForObject(EmptyContent, 'EmptyContent', VOID, NoContent);
  initMetadataForObject(Js, 'Js', VOID, VOID, [HttpClientEngineFactory]);
  initMetadataForClass(JsClientEngineConfig, 'JsClientEngineConfig', JsClientEngineConfig, HttpClientEngineConfig);
  initMetadataForClass(JsClientEngine$createWebSocket$headers_capturingHack$1);
  initMetadataForCoroutine($executeCOROUTINE$19, CoroutineImpl);
  initMetadataForCoroutine($createWebSocketCOROUTINE$20, CoroutineImpl);
  initMetadataForCoroutine($executeWebSocketRequestCOROUTINE$21, CoroutineImpl);
  initMetadataForClass(JsClientEngine, 'JsClientEngine', VOID, HttpClientEngineBase, VOID, [1, 2]);
  initMetadataForLambda(getBodyBytes$slambda, CoroutineImpl, [CoroutineImpl], [1]);
  initMetadataForCoroutine($toRawCOROUTINE$22, CoroutineImpl);
  initMetadataForCoroutine($getBodyBytesCOROUTINE$23, CoroutineImpl);
  initMetadataForLambda(channelFromStream$slambda, CoroutineImpl, [CoroutineImpl], [1]);
  initMetadataForLambda(JsWebSocketSession$slambda, CoroutineImpl, [CoroutineImpl], [1]);
  initMetadataForClass(JsWebSocketSession, 'JsWebSocketSession', VOID, VOID, [DefaultWebSocketSession], [0, 1]);
  initMetadataForClass(ProxyConfig, 'ProxyConfig', ProxyConfig);
  initMetadataForClass(ConnectTimeoutException, 'ConnectTimeoutException', VOID, IOException);
  initMetadataForClass(InterruptedIOException, 'InterruptedIOException', InterruptedIOException, IOException);
  initMetadataForClass(SocketTimeoutException, 'SocketTimeoutException', VOID, InterruptedIOException);
  //endregion
  function _get_userConfig__kgib42($this) {
    return $this.userConfig_1;
  }
  function _set_manageEngine__r3e33k($this, _set____db54di) {
    $this.manageEngine_1 = _set____db54di;
  }
  function _get_manageEngine__sdz8bg($this) {
    return $this.manageEngine_1;
  }
  function HttpClient_init_$Init$(engine, userConfig, manageEngine, $this) {
    HttpClient.call($this, engine, userConfig);
    $this.manageEngine_1 = manageEngine;
    return $this;
  }
  function HttpClient_init_$Create$(engine, userConfig, manageEngine) {
    return HttpClient_init_$Init$(engine, userConfig, manageEngine, objectCreate(protoOf(HttpClient)));
  }
  function _get_closed__iwkfs1($this) {
    return $this.closed_1;
  }
  function _get_clientJob__3efckh($this) {
    return $this.clientJob_1;
  }
  function HttpClient$lambda(this$0) {
    return function (it) {
      var tmp;
      if (!(it == null)) {
        cancel(this$0.engine_1);
        tmp = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function HttpClient$slambda(this$0, resultContinuation) {
    this.this$0__1 = this$0;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(HttpClient$slambda).invoke_wpcgmu_k$ = function ($this$intercept, call, $completion) {
    var tmp = this.create_l3tkcm_k$($this$intercept, call, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(HttpClient$slambda).invoke_4tzzq6_k$ = function (p1, p2, $completion) {
    var tmp = p1 instanceof PipelineContext ? p1 : THROW_CCE();
    return this.invoke_wpcgmu_k$(tmp, !(p2 == null) ? p2 : THROW_CCE(), $completion);
  };
  protoOf(HttpClient$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(3);
            var tmp_0 = this.call_1;
            if (!(tmp_0 instanceof HttpClientCall)) {
              var message = 'Error: HttpClientCall expected, but found ' + toString(this.call_1) + '(' + toString(getKClassFromExpression(this.call_1)) + ').';
              throw IllegalStateException_init_$Create$(toString(message));
            }

            this.set_state_rjd8d0_k$(1);
            suspendResult = this.this$0__1.receivePipeline_1.execute_qsx0hz_k$(Unit_getInstance(), this.call_1.get_response_xlk07e_k$(), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.response0__1 = suspendResult;
            this.call_1.setResponse_d09yq8_k$(this.response0__1);
            this.set_state_rjd8d0_k$(2);
            suspendResult = this.$this$intercept_1.proceedWith_i5skhv_k$(this.call_1, this);
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
  protoOf(HttpClient$slambda).create_l3tkcm_k$ = function ($this$intercept, call, completion) {
    var i = new HttpClient$slambda(this.this$0__1, completion);
    i.$this$intercept_1 = $this$intercept;
    i.call_1 = call;
    return i;
  };
  function HttpClient$slambda_0(this$0, resultContinuation) {
    var i = new HttpClient$slambda(this$0, resultContinuation);
    var l = function ($this$intercept, call, $completion) {
      return i.invoke_wpcgmu_k$($this$intercept, call, $completion);
    };
    l.$arity = 2;
    return l;
  }
  function HttpClient$lambda_0($this$install) {
    defaultTransformers($this$install);
    return Unit_getInstance();
  }
  function HttpClient$slambda_1(this$0, resultContinuation) {
    this.this$0__1 = this$0;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(HttpClient$slambda_1).invoke_b1ivo5_k$ = function ($this$intercept, it, $completion) {
    var tmp = this.create_aalyq9_k$($this$intercept, it, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(HttpClient$slambda_1).invoke_4tzzq6_k$ = function (p1, p2, $completion) {
    var tmp = p1 instanceof PipelineContext ? p1 : THROW_CCE();
    return this.invoke_b1ivo5_k$(tmp, p2 instanceof HttpResponseContainer ? p2 : THROW_CCE(), $completion);
  };
  protoOf(HttpClient$slambda_1).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(3);
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = this.$this$intercept_1.proceed_tynop7_k$(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.TRY_RESULT0__1 = suspendResult;
            this.set_exceptionState_fex74n_k$(3);
            this.set_state_rjd8d0_k$(4);
            continue $sm;
          case 2:
            this.set_exceptionState_fex74n_k$(3);
            var tmp_0 = this.get_exception_x0n6w6_k$();
            if (tmp_0 instanceof Error) {
              var cause = this.get_exception_x0n6w6_k$();
              var tmp_1 = this;
              this.this$0__1.monitor_1.raise_3e7w7u_k$(get_HttpResponseReceiveFailed(), new HttpResponseReceiveFail(this.$this$intercept_1.get_context_h02k06_k$().get_response_xlk07e_k$(), cause));
              throw cause;
            } else {
              throw this.get_exception_x0n6w6_k$();
            }

          case 3:
            throw this.get_exception_x0n6w6_k$();
          case 4:
            this.set_exceptionState_fex74n_k$(3);
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
  protoOf(HttpClient$slambda_1).create_aalyq9_k$ = function ($this$intercept, it, completion) {
    var i = new HttpClient$slambda_1(this.this$0__1, completion);
    i.$this$intercept_1 = $this$intercept;
    i.it_1 = it;
    return i;
  };
  function HttpClient$slambda_2(this$0, resultContinuation) {
    var i = new HttpClient$slambda_1(this$0, resultContinuation);
    var l = function ($this$intercept, it, $completion) {
      return i.invoke_b1ivo5_k$($this$intercept, it, $completion);
    };
    l.$arity = 2;
    return l;
  }
  function $executeCOROUTINE$0(_this__u8e3s4, builder, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.builder_1 = builder;
  }
  protoOf($executeCOROUTINE$0).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this._this__u8e3s4__1.monitor_1.raise_3e7w7u_k$(get_HttpRequestCreated(), this.builder_1);
            this.set_state_rjd8d0_k$(1);
            suspendResult = this._this__u8e3s4__1.requestPipeline_1.execute_qsx0hz_k$(this.builder_1, this.builder_1.get_body_wojkyz_k$(), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            return suspendResult instanceof HttpClientCall ? suspendResult : THROW_CCE();
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
  function HttpClient(engine, userConfig) {
    userConfig = userConfig === VOID ? new HttpClientConfig() : userConfig;
    this.engine_1 = engine;
    this.userConfig_1 = userConfig;
    this.manageEngine_1 = false;
    this.closed_1 = atomic$boolean$1(false);
    this.clientJob_1 = Job(this.engine_1.get_coroutineContext_115oqo_k$().get_y2st91_k$(Key_getInstance()));
    this.coroutineContext_1 = this.engine_1.get_coroutineContext_115oqo_k$().plus_s13ygv_k$(this.clientJob_1);
    this.requestPipeline_1 = new HttpRequestPipeline();
    this.responsePipeline_1 = new HttpResponsePipeline();
    this.sendPipeline_1 = new HttpSendPipeline();
    this.receivePipeline_1 = new HttpReceivePipeline();
    this.attributes_1 = AttributesJsFn(true);
    this.engineConfig_1 = this.engine_1.get_config_c0698r_k$();
    this.monitor_1 = new Events();
    this.config_1 = new HttpClientConfig();
    if (this.manageEngine_1) {
      this.clientJob_1.invokeOnCompletion_n6cffu_k$(HttpClient$lambda(this));
    }
    this.engine_1.install_ve6kwc_k$(this);
    var tmp = Phases_getInstance_0().get_Receive_oc3k86_k$();
    this.sendPipeline_1.intercept_k21bv3_k$(tmp, HttpClient$slambda_0(this, null));
    // Inline function 'kotlin.with' call
    var $this$with = this.userConfig_1;
    this.config_1.install$default_lc5jjj_k$(get_HttpRequestLifecycle());
    this.config_1.install$default_lc5jjj_k$(get_BodyProgress());
    this.config_1.install$default_lc5jjj_k$(get_SaveBodyPlugin());
    if ($this$with.get_useDefaultTransformers_1tuc9v_k$()) {
      this.config_1.install_vucysr_k$('DefaultTransformers', HttpClient$lambda_0);
    }
    this.config_1.install$default_lc5jjj_k$(Plugin_getInstance());
    this.config_1.install$default_lc5jjj_k$(get_HttpCallValidator());
    if ($this$with.get_followRedirects_a62ikd_k$()) {
      this.config_1.install$default_lc5jjj_k$(get_HttpRedirect());
    }
    this.config_1.plusAssign_xm1izo_k$($this$with);
    if ($this$with.get_useDefaultTransformers_1tuc9v_k$()) {
      this.config_1.install$default_lc5jjj_k$(get_HttpPlainText());
    }
    addDefaultResponseValidation(this.config_1);
    this.config_1.install_ve6kwc_k$(this);
    var tmp_0 = Phases_getInstance_2().get_Receive_oc3k86_k$();
    this.responsePipeline_1.intercept_k21bv3_k$(tmp_0, HttpClient$slambda_2(this, null));
  }
  protoOf(HttpClient).get_engine_cxlavf_k$ = function () {
    return this.engine_1;
  };
  protoOf(HttpClient).get_coroutineContext_115oqo_k$ = function () {
    return this.coroutineContext_1;
  };
  protoOf(HttpClient).get_requestPipeline_5d9z6w_k$ = function () {
    return this.requestPipeline_1;
  };
  protoOf(HttpClient).get_responsePipeline_xbi790_k$ = function () {
    return this.responsePipeline_1;
  };
  protoOf(HttpClient).get_sendPipeline_5dhg2b_k$ = function () {
    return this.sendPipeline_1;
  };
  protoOf(HttpClient).get_receivePipeline_3qwhq4_k$ = function () {
    return this.receivePipeline_1;
  };
  protoOf(HttpClient).get_attributes_dgqof4_k$ = function () {
    return this.attributes_1;
  };
  protoOf(HttpClient).get_engineConfig_azc9kd_k$ = function () {
    return this.engineConfig_1;
  };
  protoOf(HttpClient).get_monitor_lpmkc1_k$ = function () {
    return this.monitor_1;
  };
  protoOf(HttpClient).get_config_r1z0ce_k$ = function () {
    return this.config_1;
  };
  protoOf(HttpClient).execute_1mk68n_k$ = function (builder, $completion) {
    var tmp = new $executeCOROUTINE$0(this, builder, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(HttpClient).isSupported_jlio8y_k$ = function (capability) {
    return this.engine_1.get_supportedCapabilities_gwz15x_k$().contains_aljjnj_k$(capability);
  };
  protoOf(HttpClient).config_4gcyjw_k$ = function (block) {
    // Inline function 'kotlin.apply' call
    var this_0 = new HttpClientConfig();
    this_0.plusAssign_xm1izo_k$(this.userConfig_1);
    block(this_0);
    return HttpClient_init_$Create$(this.engine_1, this_0, this.manageEngine_1);
  };
  protoOf(HttpClient).close_yn9xrc_k$ = function () {
    var success = this.closed_1.atomicfu$compareAndSet(false, true);
    if (!success)
      return Unit_getInstance();
    var installedFeatures = this.attributes_1.get_r696p5_k$(get_PLUGIN_INSTALLED_LIST());
    // Inline function 'kotlin.collections.forEach' call
    var _iterator__ex2g4s = installedFeatures.get_allKeys_dton90_k$().iterator_jk1svi_k$();
    while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
      var element = _iterator__ex2g4s.next_20eer_k$();
      var plugin = installedFeatures.get_r696p5_k$(element instanceof AttributeKey ? element : THROW_CCE());
      if (isInterface(plugin, Closeable)) {
        plugin.close_yn9xrc_k$();
      }
    }
    this.clientJob_1.complete_9ww6vb_k$();
    if (this.manageEngine_1) {
      this.engine_1.close_yn9xrc_k$();
    }
  };
  protoOf(HttpClient).toString = function () {
    return 'HttpClient[' + toString(this.engine_1) + ']';
  };
  function HttpClient_0(engineFactory, block) {
    var tmp;
    if (block === VOID) {
      tmp = HttpClient$lambda_1;
    } else {
      tmp = block;
    }
    block = tmp;
    // Inline function 'kotlin.apply' call
    var this_0 = new HttpClientConfig();
    block(this_0);
    var config = this_0;
    var engine = engineFactory.create_kry9d7_k$(config.get_engineConfig_wnnzs0_k$());
    var client = HttpClient_init_$Create$(engine, config, true);
    var tmp_0 = ensureNotNull(client.coroutineContext_1.get_y2st91_k$(Key_getInstance()));
    tmp_0.invokeOnCompletion_n6cffu_k$(HttpClient$lambda_2(engine));
    return client;
  }
  function HttpClient$lambda_1(_this__u8e3s4) {
    return Unit_getInstance();
  }
  function HttpClient$lambda_2($engine) {
    return function (it) {
      $engine.close_yn9xrc_k$();
      return Unit_getInstance();
    };
  }
  function _get_plugins__4elqi9($this) {
    return $this.plugins_1;
  }
  function _get_pluginConfigurations__abgoat($this) {
    return $this.pluginConfigurations_1;
  }
  function _get_customInterceptors__qan0x8($this) {
    return $this.customInterceptors_1;
  }
  function HttpClientConfig$engineConfig$lambda(_this__u8e3s4) {
    return Unit_getInstance();
  }
  function HttpClientConfig$engine$lambda($oldConfig, $block) {
    return function (_this__u8e3s4) {
      $oldConfig(_this__u8e3s4);
      $block(_this__u8e3s4);
      return Unit_getInstance();
    };
  }
  function HttpClientConfig$install$lambda(_this__u8e3s4) {
    return Unit_getInstance();
  }
  function HttpClientConfig$install$lambda_0($previousConfigBlock, $configure) {
    return function (_this__u8e3s4) {
      var tmp0_safe_receiver = $previousConfigBlock;
      if (tmp0_safe_receiver == null)
        null;
      else
        tmp0_safe_receiver(_this__u8e3s4);
      $configure(!(_this__u8e3s4 == null) ? _this__u8e3s4 : THROW_CCE());
      return Unit_getInstance();
    };
  }
  function HttpClientConfig$install$lambda$lambda() {
    return AttributesJsFn(true);
  }
  function HttpClientConfig$install$lambda_1($plugin) {
    return function (scope) {
      var tmp = scope.get_attributes_dgqof4_k$();
      var tmp_0 = get_PLUGIN_INSTALLED_LIST();
      var attributes = tmp.computeIfAbsent_c4qp5i_k$(tmp_0, HttpClientConfig$install$lambda$lambda);
      var config = ensureNotNull(scope.get_config_r1z0ce_k$().pluginConfigurations_1.get_wei43m_k$($plugin.get_key_18j28a_k$()));
      var pluginData = $plugin.prepare_t1xtpw_k$(config);
      $plugin.install_kxaehd_k$(pluginData, scope);
      attributes.put_gkntno_k$($plugin.get_key_18j28a_k$(), pluginData);
      return Unit_getInstance();
    };
  }
  function HttpClientConfig() {
    var tmp = this;
    // Inline function 'kotlin.collections.mutableMapOf' call
    tmp.plugins_1 = LinkedHashMap_init_$Create$();
    var tmp_0 = this;
    // Inline function 'kotlin.collections.mutableMapOf' call
    tmp_0.pluginConfigurations_1 = LinkedHashMap_init_$Create$();
    var tmp_1 = this;
    // Inline function 'kotlin.collections.mutableMapOf' call
    tmp_1.customInterceptors_1 = LinkedHashMap_init_$Create$();
    var tmp_2 = this;
    tmp_2.engineConfig_1 = HttpClientConfig$engineConfig$lambda;
    this.followRedirects_1 = true;
    this.useDefaultTransformers_1 = true;
    this.expectSuccess_1 = false;
    this.developmentMode_1 = PlatformUtils_getInstance().get_IS_DEVELOPMENT_MODE_4qw7yr_k$();
  }
  protoOf(HttpClientConfig).set_engineConfig_lx3anh_k$ = function (_set____db54di) {
    this.engineConfig_1 = _set____db54di;
  };
  protoOf(HttpClientConfig).get_engineConfig_wnnzs0_k$ = function () {
    return this.engineConfig_1;
  };
  protoOf(HttpClientConfig).engine_24osvz_k$ = function (block) {
    var oldConfig = this.engineConfig_1;
    var tmp = this;
    tmp.engineConfig_1 = HttpClientConfig$engine$lambda(oldConfig, block);
  };
  protoOf(HttpClientConfig).set_followRedirects_im56s4_k$ = function (_set____db54di) {
    this.followRedirects_1 = _set____db54di;
  };
  protoOf(HttpClientConfig).get_followRedirects_a62ikd_k$ = function () {
    return this.followRedirects_1;
  };
  protoOf(HttpClientConfig).set_useDefaultTransformers_rbgj6s_k$ = function (_set____db54di) {
    this.useDefaultTransformers_1 = _set____db54di;
  };
  protoOf(HttpClientConfig).get_useDefaultTransformers_1tuc9v_k$ = function () {
    return this.useDefaultTransformers_1;
  };
  protoOf(HttpClientConfig).set_expectSuccess_qjm120_k$ = function (_set____db54di) {
    this.expectSuccess_1 = _set____db54di;
  };
  protoOf(HttpClientConfig).get_expectSuccess_uic3pb_k$ = function () {
    return this.expectSuccess_1;
  };
  protoOf(HttpClientConfig).set_developmentMode_brt3dg_k$ = function (_set____db54di) {
    this.developmentMode_1 = _set____db54di;
  };
  protoOf(HttpClientConfig).get_developmentMode_eqiro5_k$ = function () {
    return this.developmentMode_1;
  };
  protoOf(HttpClientConfig).install_6m4asv_k$ = function (plugin, configure) {
    var previousConfigBlock = this.pluginConfigurations_1.get_wei43m_k$(plugin.get_key_18j28a_k$());
    var tmp0 = this.pluginConfigurations_1;
    var tmp1 = plugin.get_key_18j28a_k$();
    // Inline function 'kotlin.collections.set' call
    var value = HttpClientConfig$install$lambda_0(previousConfigBlock, configure);
    tmp0.put_4fpzoq_k$(tmp1, value);
    if (this.plugins_1.containsKey_aw81wo_k$(plugin.get_key_18j28a_k$()))
      return Unit_getInstance();
    var tmp3 = this.plugins_1;
    var tmp4 = plugin.get_key_18j28a_k$();
    // Inline function 'kotlin.collections.set' call
    var value_0 = HttpClientConfig$install$lambda_1(plugin);
    tmp3.put_4fpzoq_k$(tmp4, value_0);
  };
  protoOf(HttpClientConfig).install$default_lc5jjj_k$ = function (plugin, configure, $super) {
    var tmp;
    if (configure === VOID) {
      tmp = HttpClientConfig$install$lambda;
    } else {
      tmp = configure;
    }
    configure = tmp;
    var tmp_0;
    if ($super === VOID) {
      this.install_6m4asv_k$(plugin, configure);
      tmp_0 = Unit_getInstance();
    } else {
      tmp_0 = $super.install_6m4asv_k$.call(this, plugin, configure);
    }
    return tmp_0;
  };
  protoOf(HttpClientConfig).install_vucysr_k$ = function (key, block) {
    // Inline function 'kotlin.collections.set' call
    this.customInterceptors_1.put_4fpzoq_k$(key, block);
  };
  protoOf(HttpClientConfig).install_ve6kwc_k$ = function (client) {
    // Inline function 'kotlin.collections.forEach' call
    var _iterator__ex2g4s = this.plugins_1.get_values_ksazhn_k$().iterator_jk1svi_k$();
    while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
      var element = _iterator__ex2g4s.next_20eer_k$();
      // Inline function 'kotlin.apply' call
      element(client);
    }
    // Inline function 'kotlin.collections.forEach' call
    var _iterator__ex2g4s_0 = this.customInterceptors_1.get_values_ksazhn_k$().iterator_jk1svi_k$();
    while (_iterator__ex2g4s_0.hasNext_bitz1p_k$()) {
      var element_0 = _iterator__ex2g4s_0.next_20eer_k$();
      // Inline function 'kotlin.apply' call
      element_0(client);
    }
  };
  protoOf(HttpClientConfig).clone_1keycd_k$ = function () {
    var result = new HttpClientConfig();
    result.plusAssign_xm1izo_k$(this);
    return result;
  };
  protoOf(HttpClientConfig).plusAssign_xm1izo_k$ = function (other) {
    this.followRedirects_1 = other.followRedirects_1;
    this.useDefaultTransformers_1 = other.useDefaultTransformers_1;
    this.expectSuccess_1 = other.expectSuccess_1;
    var tmp0 = this.plugins_1;
    // Inline function 'kotlin.collections.plusAssign' call
    var map = other.plugins_1;
    tmp0.putAll_wgg6cj_k$(map);
    var tmp2 = this.pluginConfigurations_1;
    // Inline function 'kotlin.collections.plusAssign' call
    var map_0 = other.pluginConfigurations_1;
    tmp2.putAll_wgg6cj_k$(map_0);
    var tmp4 = this.customInterceptors_1;
    // Inline function 'kotlin.collections.plusAssign' call
    var map_1 = other.customInterceptors_1;
    tmp4.putAll_wgg6cj_k$(map_1);
  };
  function _get_CustomResponse__hsuzdz($this) {
    return $this.CustomResponse_1;
  }
  function _get_received__yyerqu($this) {
    return $this.received_1;
  }
  function HttpClientCall_init_$Init$(client, requestData, responseData, $this) {
    HttpClientCall.call($this, client);
    $this.request_1 = new DefaultHttpRequest($this, requestData);
    $this.response_1 = new DefaultHttpResponse($this, responseData);
    var tmp = responseData.get_body_wojkyz_k$();
    if (!isInterface(tmp, ByteReadChannel)) {
      $this.get_attributes_dgqof4_k$().put_gkntno_k$(Companion_getInstance_8().CustomResponse_1, responseData.get_body_wojkyz_k$());
    }
    return $this;
  }
  function HttpClientCall_init_$Create$(client, requestData, responseData) {
    return HttpClientCall_init_$Init$(client, requestData, responseData, objectCreate(protoOf(HttpClientCall)));
  }
  function Companion() {
    Companion_instance = this;
    var tmp = this;
    // Inline function 'io.ktor.util.AttributeKey' call
    var name = 'CustomResponse';
    // Inline function 'io.ktor.util.reflect.typeInfo' call
    var tmp_0 = PrimitiveClasses_getInstance().get_anyClass_x0jl4l_k$();
    // Inline function 'io.ktor.util.reflect.typeOfOrNull' call
    var tmp_1;
    try {
      tmp_1 = createKType(PrimitiveClasses_getInstance().get_anyClass_x0jl4l_k$(), arrayOf([]), false);
    } catch ($p) {
      var tmp_2;
      if ($p instanceof Error) {
        var _unused_var__etf5q3 = $p;
        tmp_2 = null;
      } else {
        throw $p;
      }
      tmp_1 = tmp_2;
    }
    var tmp$ret$0 = tmp_1;
    var tmp$ret$1 = new TypeInfo(tmp_0, tmp$ret$0);
    tmp.CustomResponse_1 = new AttributeKey(name, tmp$ret$1);
  }
  var Companion_instance;
  function Companion_getInstance_8() {
    if (Companion_instance == null)
      new Companion();
    return Companion_instance;
  }
  function $bodyNullableCOROUTINE$1(_this__u8e3s4, info, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.info_1 = info;
  }
  protoOf($bodyNullableCOROUTINE$1).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(5);
            this.set_exceptionState_fex74n_k$(4);
            if (instanceOf(this._this__u8e3s4__1.get_response_xlk07e_k$(), this.info_1.get_type_wovaf7_k$()))
              return this._this__u8e3s4__1.get_response_xlk07e_k$();
            if (!this._this__u8e3s4__1.get_allowDoubleReceive_um1gnm_k$() && !get_isSaved(this._this__u8e3s4__1.get_response_xlk07e_k$()) && !this._this__u8e3s4__1.received_1.atomicfu$compareAndSet(false, true)) {
              throw new DoubleReceiveException(this._this__u8e3s4__1);
            }

            this.tmp0_elvis_lhs0__1 = this._this__u8e3s4__1.get_attributes_dgqof4_k$().getOrNull_6mjt1v_k$(Companion_getInstance_8().CustomResponse_1);
            if (this.tmp0_elvis_lhs0__1 == null) {
              this.set_state_rjd8d0_k$(1);
              suspendResult = this._this__u8e3s4__1.getResponseContent_9qb5np_k$(this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.WHEN_RESULT1__1 = this.tmp0_elvis_lhs0__1;
              this.set_state_rjd8d0_k$(2);
              continue $sm;
            }

          case 1:
            this.WHEN_RESULT1__1 = suspendResult;
            this.set_state_rjd8d0_k$(2);
            continue $sm;
          case 2:
            this.responseData2__1 = this.WHEN_RESULT1__1;
            this.subject3__1 = new HttpResponseContainer(this.info_1, this.responseData2__1);
            this.set_state_rjd8d0_k$(3);
            suspendResult = this._this__u8e3s4__1.client_1.get_responsePipeline_xbi790_k$().execute_qsx0hz_k$(this._this__u8e3s4__1, this.subject3__1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 3:
            var ARGUMENT = suspendResult;
            var this_0 = ARGUMENT.get_response_xlk07e_k$();
            var tmp_0;
            if (!equals(this_0, NullBody_getInstance())) {
              tmp_0 = this_0;
            } else {
              tmp_0 = null;
            }

            var result = tmp_0;
            if (!(result == null) && !instanceOf(result, this.info_1.get_type_wovaf7_k$())) {
              var from = getKClassFromExpression(result);
              var to = this.info_1.get_type_wovaf7_k$();
              throw new NoTransformationFoundException(this._this__u8e3s4__1.get_response_xlk07e_k$(), from, to);
            }

            return result;
          case 4:
            this.set_exceptionState_fex74n_k$(5);
            var tmp_1 = this.get_exception_x0n6w6_k$();
            if (tmp_1 instanceof Error) {
              var cause = this.get_exception_x0n6w6_k$();
              cancel_0(this._this__u8e3s4__1.get_response_xlk07e_k$(), 'Receive failed', cause);
              throw cause;
            } else {
              throw this.get_exception_x0n6w6_k$();
            }

          case 5:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 5) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  function $bodyCOROUTINE$2(_this__u8e3s4, info, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.info_1 = info;
  }
  protoOf($bodyCOROUTINE$2).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = this._this__u8e3s4__1.bodyNullable_wn8z59_k$(this.info_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var ARGUMENT = suspendResult;
            return ensureNotNull(ARGUMENT);
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
  function HttpClientCall(client) {
    Companion_getInstance_8();
    this.client_1 = client;
    this.received_1 = atomic$boolean$1(false);
    this.allowDoubleReceive_1 = false;
  }
  protoOf(HttpClientCall).get_client_byfnx0_k$ = function () {
    return this.client_1;
  };
  protoOf(HttpClientCall).get_coroutineContext_115oqo_k$ = function () {
    return this.get_response_xlk07e_k$().get_coroutineContext_115oqo_k$();
  };
  protoOf(HttpClientCall).get_attributes_dgqof4_k$ = function () {
    return this.get_request_jdwg4m_k$().get_attributes_dgqof4_k$();
  };
  protoOf(HttpClientCall).set_request_fptzio_k$ = function (_set____db54di) {
    this.request_1 = _set____db54di;
  };
  protoOf(HttpClientCall).get_request_jdwg4m_k$ = function () {
    var tmp = this.request_1;
    if (!(tmp == null))
      return tmp;
    else {
      throwUninitializedPropertyAccessException('request');
    }
  };
  protoOf(HttpClientCall).set_response_6wynhk_k$ = function (_set____db54di) {
    this.response_1 = _set____db54di;
  };
  protoOf(HttpClientCall).get_response_xlk07e_k$ = function () {
    var tmp = this.response_1;
    if (!(tmp == null))
      return tmp;
    else {
      throwUninitializedPropertyAccessException('response');
    }
  };
  protoOf(HttpClientCall).get_allowDoubleReceive_um1gnm_k$ = function () {
    return this.allowDoubleReceive_1;
  };
  protoOf(HttpClientCall).getResponseContent_9qb5np_k$ = function ($completion) {
    return this.get_response_xlk07e_k$().get_rawContent_u3f8li_k$();
  };
  protoOf(HttpClientCall).bodyNullable_wn8z59_k$ = function (info, $completion) {
    var tmp = new $bodyNullableCOROUTINE$1(this, info, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(HttpClientCall).body_3ijhx3_k$ = function (info, $completion) {
    var tmp = new $bodyCOROUTINE$2(this, info, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(HttpClientCall).toString = function () {
    return 'HttpClientCall[' + this.get_request_jdwg4m_k$().get_url_18iuii_k$().toString() + ', ' + this.get_response_xlk07e_k$().get_status_jnf6d7_k$().toString() + ']';
  };
  protoOf(HttpClientCall).setResponse_d09yq8_k$ = function (response) {
    this.response_1 = response;
  };
  protoOf(HttpClientCall).setRequest_pi7k1q_k$ = function (request) {
    this.request_1 = request;
  };
  function DoubleReceiveException(call) {
    IllegalStateException_init_$Init$(this);
    captureStack(this, DoubleReceiveException);
    this.message_1 = 'Response already received: ' + call.toString();
  }
  protoOf(DoubleReceiveException).get_message_h23axq_k$ = function () {
    return this.message_1;
  };
  function NoTransformationFoundException(response, from, to) {
    UnsupportedOperationException_init_$Init$(this);
    captureStack(this, NoTransformationFoundException);
    this.message_1 = trimIndent("\n        Expected response body of the type '" + toString(to) + "' but was '" + toString(from) + "'\n        In response from `" + get_request(response).get_url_18iuii_k$().toString() + '`\n        Response status `' + response.get_status_jnf6d7_k$().toString() + '`\n        Response header `ContentType: ' + response.get_headers_ef25jx_k$().get_6bo4tg_k$(HttpHeaders_getInstance().get_ContentType_z1j0sq_k$()) + '` \n        Request header `Accept: ' + get_request(response).get_headers_ef25jx_k$().get_6bo4tg_k$(HttpHeaders_getInstance().get_Accept_4a5gpb_k$()) + '`\n        \n        You can read how to resolve NoTransformationFoundException at FAQ: \n        https://ktor.io/docs/faq.html#no-transformation-found-exception\n    ');
  }
  protoOf(NoTransformationFoundException).get_message_h23axq_k$ = function () {
    return this.message_1;
  };
  function save(_this__u8e3s4, $completion) {
    var tmp = new $saveCOROUTINE$3(_this__u8e3s4, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  }
  function _get_responseBody__mzdrmw($this) {
    return $this.responseBody_1;
  }
  function SavedHttpCall(client, request, response, responseBody) {
    HttpClientCall.call(this, client);
    this.responseBody_1 = responseBody;
    this.set_request_fptzio_k$(new SavedHttpRequest(this, request));
    this.set_response_6wynhk_k$(new SavedHttpResponse(this, this.responseBody_1, response));
    checkContentLength(contentLength(response), toLong(this.responseBody_1.length), request.get_method_gl8esq_k$());
    this.allowDoubleReceive_2 = true;
  }
  protoOf(SavedHttpCall).getResponseContent_9qb5np_k$ = function ($completion) {
    return ByteReadChannel_0(this.responseBody_1);
  };
  protoOf(SavedHttpCall).get_allowDoubleReceive_um1gnm_k$ = function () {
    return this.allowDoubleReceive_2;
  };
  function SavedHttpRequest(call, origin) {
    this.$$delegate_0__1 = origin;
    this.call_1 = call;
  }
  protoOf(SavedHttpRequest).get_call_wojxrb_k$ = function () {
    return this.call_1;
  };
  protoOf(SavedHttpRequest).get_coroutineContext_115oqo_k$ = function () {
    return this.$$delegate_0__1.get_coroutineContext_115oqo_k$();
  };
  protoOf(SavedHttpRequest).get_method_gl8esq_k$ = function () {
    return this.$$delegate_0__1.get_method_gl8esq_k$();
  };
  protoOf(SavedHttpRequest).get_url_18iuii_k$ = function () {
    return this.$$delegate_0__1.get_url_18iuii_k$();
  };
  protoOf(SavedHttpRequest).get_attributes_dgqof4_k$ = function () {
    return this.$$delegate_0__1.get_attributes_dgqof4_k$();
  };
  protoOf(SavedHttpRequest).get_content_h02jrk_k$ = function () {
    return this.$$delegate_0__1.get_content_h02jrk_k$();
  };
  protoOf(SavedHttpRequest).get_headers_ef25jx_k$ = function () {
    return this.$$delegate_0__1.get_headers_ef25jx_k$();
  };
  function _get_body__d4fd9l($this) {
    return $this.body_1;
  }
  function SavedHttpResponse(call, body, origin) {
    HttpResponse.call(this);
    this.call_1 = call;
    this.body_1 = body;
    this.status_1 = origin.get_status_jnf6d7_k$();
    this.version_1 = origin.get_version_72w4j3_k$();
    this.requestTime_1 = origin.get_requestTime_wwxhg3_k$();
    this.responseTime_1 = origin.get_responseTime_scfvg7_k$();
    this.headers_1 = origin.get_headers_ef25jx_k$();
    this.coroutineContext_1 = origin.get_coroutineContext_115oqo_k$();
  }
  protoOf(SavedHttpResponse).get_call_wojxrb_k$ = function () {
    return this.call_1;
  };
  protoOf(SavedHttpResponse).get_status_jnf6d7_k$ = function () {
    return this.status_1;
  };
  protoOf(SavedHttpResponse).get_version_72w4j3_k$ = function () {
    return this.version_1;
  };
  protoOf(SavedHttpResponse).get_requestTime_wwxhg3_k$ = function () {
    return this.requestTime_1;
  };
  protoOf(SavedHttpResponse).get_responseTime_scfvg7_k$ = function () {
    return this.responseTime_1;
  };
  protoOf(SavedHttpResponse).get_headers_ef25jx_k$ = function () {
    return this.headers_1;
  };
  protoOf(SavedHttpResponse).get_coroutineContext_115oqo_k$ = function () {
    return this.coroutineContext_1;
  };
  protoOf(SavedHttpResponse).get_rawContent_u3f8li_k$ = function () {
    return ByteReadChannel_0(this.body_1);
  };
  function $saveCOROUTINE$3(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
  }
  protoOf($saveCOROUTINE$3).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = readRemaining(this._this__u8e3s4__1.get_response_xlk07e_k$().get_rawContent_u3f8li_k$(), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var ARGUMENT = suspendResult;
            var responseBody = readByteArray(ARGUMENT);
            return new SavedHttpCall(this._this__u8e3s4__1.get_client_byfnx0_k$(), this._this__u8e3s4__1.get_request_jdwg4m_k$(), this._this__u8e3s4__1.get_response_xlk07e_k$(), responseBody);
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
  function UnsupportedContentTypeException(content) {
    IllegalStateException_init_$Init$_0('Failed to write body: ' + toString(getKClassFromExpression(content)), this);
    captureStack(this, UnsupportedContentTypeException);
  }
  function checkContentLength(contentLength, bodySize, method) {
    if (contentLength == null || contentLength.compareTo_9jj042_k$(new Long(0, 0)) < 0 || method.equals(Companion_getInstance().get_Head_wo2rt5_k$()))
      return Unit_getInstance();
    if (!equals(contentLength, bodySize)) {
      throw IllegalStateException_init_$Create$('Content-Length mismatch: expected ' + toString_0(contentLength) + ' bytes, but received ' + bodySize.toString() + ' bytes');
    }
  }
  function ProgressListener() {
  }
  function _get_delegate__idh0py($this) {
    return $this.delegate_1;
  }
  function _get_callContext__j3nl8g($this) {
    return $this.callContext_1;
  }
  function _get_listener__4cngyf($this) {
    return $this.listener_1;
  }
  function _get_content__ps04ag($this) {
    return $this.content_1;
  }
  function getContent($this, delegate) {
    var tmp;
    if (delegate instanceof ContentWrapper) {
      tmp = getContent($this, delegate.delegate_djsx39_k$());
    } else {
      if (delegate instanceof ByteArrayContent) {
        tmp = ByteReadChannel_0(delegate.bytes_1k3k2z_k$());
      } else {
        if (delegate instanceof ProtocolUpgrade) {
          throw new UnsupportedContentTypeException(delegate);
        } else {
          if (delegate instanceof NoContent) {
            tmp = Companion_getInstance_0().get_Empty_i9b85g_k$();
          } else {
            if (delegate instanceof ReadChannelContent) {
              tmp = delegate.readFrom_ecr4ww_k$();
            } else {
              if (delegate instanceof WriteChannelContent) {
                var tmp_0 = GlobalScope_getInstance();
                tmp = writer(tmp_0, $this.callContext_1, true, ObservableContent$getContent$slambda_0(delegate, null)).get_channel_dhi7tm_k$();
              } else {
                noWhenBranchMatchedException();
              }
            }
          }
        }
      }
    }
    return tmp;
  }
  function ObservableContent$getContent$slambda($delegate, resultContinuation) {
    this.$delegate_1 = $delegate;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(ObservableContent$getContent$slambda).invoke_86bb4c_k$ = function ($this$writer, $completion) {
    var tmp = this.create_fmjhmg_k$($this$writer, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(ObservableContent$getContent$slambda).invoke_qns8j1_k$ = function (p1, $completion) {
    return this.invoke_86bb4c_k$(p1 instanceof WriterScope ? p1 : THROW_CCE(), $completion);
  };
  protoOf(ObservableContent$getContent$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = this.$delegate_1.writeTo_vfpsb0_k$(this.$this$writer_1.get_channel_dhi7tm_k$(), this);
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
  protoOf(ObservableContent$getContent$slambda).create_fmjhmg_k$ = function ($this$writer, completion) {
    var i = new ObservableContent$getContent$slambda(this.$delegate_1, completion);
    i.$this$writer_1 = $this$writer;
    return i;
  };
  protoOf(ObservableContent$getContent$slambda).create_wyq9v6_k$ = function (value, completion) {
    return this.create_fmjhmg_k$(value instanceof WriterScope ? value : THROW_CCE(), completion);
  };
  function ObservableContent$getContent$slambda_0($delegate, resultContinuation) {
    var i = new ObservableContent$getContent$slambda($delegate, resultContinuation);
    var l = function ($this$writer, $completion) {
      return i.invoke_86bb4c_k$($this$writer, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function ObservableContent(delegate, callContext, listener) {
    ReadChannelContent.call(this);
    this.delegate_1 = delegate;
    this.callContext_1 = callContext;
    this.listener_1 = listener;
    this.content_1 = getContent(this, this.delegate_1);
  }
  protoOf(ObservableContent).get_contentType_7git4a_k$ = function () {
    return this.delegate_1.get_contentType_7git4a_k$();
  };
  protoOf(ObservableContent).get_contentLength_a5o8yy_k$ = function () {
    return this.delegate_1.get_contentLength_a5o8yy_k$();
  };
  protoOf(ObservableContent).get_status_jnf6d7_k$ = function () {
    return this.delegate_1.get_status_jnf6d7_k$();
  };
  protoOf(ObservableContent).get_headers_ef25jx_k$ = function () {
    return this.delegate_1.get_headers_ef25jx_k$();
  };
  protoOf(ObservableContent).getProperty_d9zgf6_k$ = function (key) {
    return this.delegate_1.getProperty_d9zgf6_k$(key);
  };
  protoOf(ObservableContent).setProperty_79nh7x_k$ = function (key, value) {
    return this.delegate_1.setProperty_79nh7x_k$(key, value);
  };
  protoOf(ObservableContent).readFrom_ecr4ww_k$ = function () {
    return observable(this.content_1, this.callContext_1, this.get_contentLength_a5o8yy_k$(), this.listener_1);
  };
  function get_CALL_COROUTINE() {
    _init_properties_HttpClientEngine_kt__h91z5h();
    return CALL_COROUTINE;
  }
  var CALL_COROUTINE;
  function get_CLIENT_CONFIG() {
    _init_properties_HttpClientEngine_kt__h91z5h();
    return CLIENT_CONFIG;
  }
  var CLIENT_CONFIG;
  function HttpClientEngine$install$slambda$lambda($client, $response) {
    return function (it) {
      var tmp;
      if (!(it == null)) {
        $client.get_monitor_lpmkc1_k$().raise_3e7w7u_k$(get_HttpResponseCancelled(), $response);
        tmp = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function _get_closed__iwkfs1_0($this) {
    var tmp0_safe_receiver = $this.get_coroutineContext_115oqo_k$().get_y2st91_k$(Key_getInstance());
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.get_isActive_quafmh_k$();
    return !(tmp1_elvis_lhs == null ? false : tmp1_elvis_lhs);
  }
  function executeWithinCallContext($this, requestData, $completion) {
    var tmp = new $executeWithinCallContextCOROUTINE$4($this, requestData, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  }
  function checkExtensions($this, requestData) {
    var _iterator__ex2g4s = requestData.get_requiredCapabilities_2lys3z_k$().iterator_jk1svi_k$();
    while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
      var requestedExtension = _iterator__ex2g4s.next_20eer_k$();
      // Inline function 'kotlin.require' call
      if (!$this.get_supportedCapabilities_gwz15x_k$().contains_aljjnj_k$(requestedExtension)) {
        var message = "Engine doesn't support " + toString(requestedExtension);
        throw IllegalArgumentException_init_$Create$(toString(message));
      }
    }
  }
  function HttpClientEngine$install$slambda($client, this$0, resultContinuation) {
    this.$client_1 = $client;
    this.this$0__1 = this$0;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(HttpClientEngine$install$slambda).invoke_wpcgmu_k$ = function ($this$intercept, content, $completion) {
    var tmp = this.create_l3tkcm_k$($this$intercept, content, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(HttpClientEngine$install$slambda).invoke_4tzzq6_k$ = function (p1, p2, $completion) {
    var tmp = p1 instanceof PipelineContext ? p1 : THROW_CCE();
    return this.invoke_wpcgmu_k$(tmp, !(p2 == null) ? p2 : THROW_CCE(), $completion);
  };
  protoOf(HttpClientEngine$install$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(3);
            var tmp_0 = this;
            var this_0 = new HttpRequestBuilder();
            this_0.takeFromWithExecutionContext_9qmqoi_k$(this.$this$intercept_1.get_context_h02k06_k$());
            var body = this.content_1;
            if (body == null) {
              this_0.set_body_slfhxt_k$(NullBody_getInstance());
              var tmp_1 = PrimitiveClasses_getInstance().get_anyClass_x0jl4l_k$();
              var tmp_2;
              try {
                tmp_2 = createKType(PrimitiveClasses_getInstance().get_anyClass_x0jl4l_k$(), arrayOf([]), false);
              } catch ($p) {
                var tmp_3;
                if ($p instanceof Error) {
                  var _unused_var__etf5q3 = $p;
                  tmp_3 = null;
                } else {
                  throw $p;
                }
                tmp_2 = tmp_3;
              }
              this_0.set_bodyType_8pgqkl_k$(new TypeInfo(tmp_1, tmp_2));
            } else {
              if (body instanceof OutgoingContent) {
                this_0.set_body_slfhxt_k$(body);
                this_0.set_bodyType_8pgqkl_k$(null);
              } else {
                this_0.set_body_slfhxt_k$(body);
                var tmp_4 = PrimitiveClasses_getInstance().get_anyClass_x0jl4l_k$();
                var tmp_5;
                try {
                  tmp_5 = createKType(PrimitiveClasses_getInstance().get_anyClass_x0jl4l_k$(), arrayOf([]), false);
                } catch ($p) {
                  var tmp_6;
                  if ($p instanceof Error) {
                    var _unused_var__etf5q3_0 = $p;
                    tmp_6 = null;
                  } else {
                    throw $p;
                  }
                  tmp_5 = tmp_6;
                }
                this_0.set_bodyType_8pgqkl_k$(new TypeInfo(tmp_4, tmp_5));
              }
            }

            tmp_0.builder0__1 = this_0;
            this.$client_1.get_monitor_lpmkc1_k$().raise_3e7w7u_k$(get_HttpRequestIsReadyForSending(), this.builder0__1);
            var tmp_7 = this;
            var this_1 = this.builder0__1.build_1k0s4u_k$();
            this_1.get_attributes_dgqof4_k$().put_gkntno_k$(get_CLIENT_CONFIG(), this.$client_1.get_config_r1z0ce_k$());
            tmp_7.requestData1__1 = this_1;
            validateHeaders(this.requestData1__1);
            checkExtensions(this.this$0__1, this.requestData1__1);
            this.set_state_rjd8d0_k$(1);
            suspendResult = executeWithinCallContext(this.this$0__1, this.requestData1__1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.responseData2__1 = suspendResult;
            this.call3__1 = HttpClientCall_init_$Create$(this.$client_1, this.requestData1__1, this.responseData2__1);
            this.response4__1 = this.call3__1.get_response_xlk07e_k$();
            this.$client_1.get_monitor_lpmkc1_k$().raise_3e7w7u_k$(get_HttpResponseReceived(), this.response4__1);
            var tmp_8 = get_job(this.response4__1.get_coroutineContext_115oqo_k$());
            tmp_8.invokeOnCompletion_n6cffu_k$(HttpClientEngine$install$slambda$lambda(this.$client_1, this.response4__1));
            this.set_state_rjd8d0_k$(2);
            suspendResult = this.$this$intercept_1.proceedWith_i5skhv_k$(this.call3__1, this);
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
  protoOf(HttpClientEngine$install$slambda).create_l3tkcm_k$ = function ($this$intercept, content, completion) {
    var i = new HttpClientEngine$install$slambda(this.$client_1, this.this$0__1, completion);
    i.$this$intercept_1 = $this$intercept;
    i.content_1 = content;
    return i;
  };
  function HttpClientEngine$install$slambda_0($client, this$0, resultContinuation) {
    var i = new HttpClientEngine$install$slambda($client, this$0, resultContinuation);
    var l = function ($this$intercept, content, $completion) {
      return i.invoke_wpcgmu_k$($this$intercept, content, $completion);
    };
    l.$arity = 2;
    return l;
  }
  function HttpClientEngine$executeWithinCallContext$slambda(this$0, $requestData, resultContinuation) {
    this.this$0__1 = this$0;
    this.$requestData_1 = $requestData;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(HttpClientEngine$executeWithinCallContext$slambda).invoke_hvk5sg_k$ = function ($this$async, $completion) {
    var tmp = this.create_rcuf4x_k$($this$async, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(HttpClientEngine$executeWithinCallContext$slambda).invoke_qns8j1_k$ = function (p1, $completion) {
    return this.invoke_hvk5sg_k$((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(HttpClientEngine$executeWithinCallContext$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            if (_get_closed__iwkfs1_0(this.this$0__1)) {
              throw new ClientEngineClosedException();
            }

            this.set_state_rjd8d0_k$(1);
            suspendResult = this.this$0__1.execute_bvjlbk_k$(this.$requestData_1, this);
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
  protoOf(HttpClientEngine$executeWithinCallContext$slambda).create_rcuf4x_k$ = function ($this$async, completion) {
    var i = new HttpClientEngine$executeWithinCallContext$slambda(this.this$0__1, this.$requestData_1, completion);
    i.$this$async_1 = $this$async;
    return i;
  };
  protoOf(HttpClientEngine$executeWithinCallContext$slambda).create_wyq9v6_k$ = function (value, completion) {
    return this.create_rcuf4x_k$((!(value == null) ? isInterface(value, CoroutineScope) : false) ? value : THROW_CCE(), completion);
  };
  function HttpClientEngine$executeWithinCallContext$slambda_0(this$0, $requestData, resultContinuation) {
    var i = new HttpClientEngine$executeWithinCallContext$slambda(this$0, $requestData, resultContinuation);
    var l = function ($this$async, $completion) {
      return i.invoke_hvk5sg_k$($this$async, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function $executeWithinCallContextCOROUTINE$4(_this__u8e3s4, requestData, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.requestData_1 = requestData;
  }
  protoOf($executeWithinCallContextCOROUTINE$4).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(3);
            this.set_state_rjd8d0_k$(1);
            suspendResult = createCallContext(this._this__u8e3s4__1, this.requestData_1.get_executionContext_yb2vgg_k$(), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.callContext0__1 = suspendResult;
            this.context1__1 = this.callContext0__1.plus_s13ygv_k$(new KtorCallContextElement(this.callContext0__1));
            this.set_state_rjd8d0_k$(2);
            suspendResult = async(this._this__u8e3s4__1, this.context1__1, VOID, HttpClientEngine$executeWithinCallContext$slambda_0(this._this__u8e3s4__1, this.requestData_1, null)).await_4rdzbx_k$(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            return suspendResult;
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
  function HttpClientEngine() {
  }
  function validateHeaders(request) {
    _init_properties_HttpClientEngine_kt__h91z5h();
    var requestHeaders = request.get_headers_ef25jx_k$();
    // Inline function 'kotlin.collections.filter' call
    var tmp0 = requestHeaders.names_1q9mbs_k$();
    // Inline function 'kotlin.collections.filterTo' call
    var destination = ArrayList_init_$Create$();
    var _iterator__ex2g4s = tmp0.iterator_jk1svi_k$();
    while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
      var element = _iterator__ex2g4s.next_20eer_k$();
      if (HttpHeaders_getInstance().get_UnsafeHeadersList_16nuob_k$().contains_aljjnj_k$(element)) {
        destination.add_utx5q5_k$(element);
      }
    }
    var unsafeRequestHeaders = destination;
    // Inline function 'kotlin.collections.isNotEmpty' call
    if (!unsafeRequestHeaders.isEmpty_y1axqb_k$()) {
      throw new UnsafeHeaderException(toString(unsafeRequestHeaders));
    }
  }
  function createCallContext(_this__u8e3s4, parentJob, $completion) {
    var callJob = Job(parentJob);
    var callContext = _this__u8e3s4.get_coroutineContext_115oqo_k$().plus_s13ygv_k$(callJob).plus_s13ygv_k$(get_CALL_COROUTINE());
    $l$block: {
      // Inline function 'io.ktor.client.engine.attachToUserJob' call
      // Inline function 'kotlin.js.getCoroutineContext' call
      var tmp0_elvis_lhs = $completion.get_context_h02k06_k$().get_y2st91_k$(Key_getInstance());
      var tmp;
      if (tmp0_elvis_lhs == null) {
        break $l$block;
      } else {
        tmp = tmp0_elvis_lhs;
      }
      var userJob = tmp;
      var cleanupHandler = userJob.invokeOnCompletion$default_1v3utx_k$(true, VOID, createCallContext$lambda(callJob));
      callJob.invokeOnCompletion_n6cffu_k$(createCallContext$lambda_0(cleanupHandler));
    }
    return callContext;
  }
  function createCallContext$lambda($callJob) {
    return function (cause) {
      if (cause == null)
        return Unit_getInstance();
      $callJob.cancel_hkmm2i_k$(CancellationException_init_$Create$(cause.message));
      return Unit_getInstance();
    };
  }
  function createCallContext$lambda_0($cleanupHandler) {
    return function (it) {
      $cleanupHandler.dispose_3nnxhr_k$();
      return Unit_getInstance();
    };
  }
  var properties_initialized_HttpClientEngine_kt_5uiebb;
  function _init_properties_HttpClientEngine_kt__h91z5h() {
    if (!properties_initialized_HttpClientEngine_kt_5uiebb) {
      properties_initialized_HttpClientEngine_kt_5uiebb = true;
      CALL_COROUTINE = new CoroutineName('call-context');
      // Inline function 'io.ktor.util.AttributeKey' call
      var name = 'client-config';
      // Inline function 'io.ktor.util.reflect.typeInfo' call
      var tmp = getKClass(HttpClientConfig);
      // Inline function 'io.ktor.util.reflect.typeOfOrNull' call
      var tmp_0;
      try {
        tmp_0 = createKType(getKClass(HttpClientConfig), arrayOf([getStarKTypeProjection()]), false);
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
      CLIENT_CONFIG = new AttributeKey(name, tmp$ret$1);
    }
  }
  function ClientEngineClosedException(cause) {
    cause = cause === VOID ? null : cause;
    IllegalStateException_init_$Init$_0('Client already closed', this);
    captureStack(this, ClientEngineClosedException);
    this.cause_1 = cause;
  }
  protoOf(ClientEngineClosedException).get_cause_iplhs0_k$ = function () {
    return this.cause_1;
  };
  function _get_engineName__3bxgoy($this) {
    return $this.engineName_1;
  }
  function _get_closed__iwkfs1_1($this) {
    return $this.closed_1;
  }
  function HttpClientEngineBase$dispatcher$delegate$lambda(this$0) {
    return function () {
      var tmp0_elvis_lhs = this$0.get_config_c0698r_k$().get_dispatcher_usy1bk_k$();
      return tmp0_elvis_lhs == null ? ioDispatcher() : tmp0_elvis_lhs;
    };
  }
  function HttpClientEngineBase$coroutineContext$delegate$lambda(this$0) {
    return function () {
      return SilentSupervisor().plus_s13ygv_k$(this$0.get_dispatcher_usy1bk_k$()).plus_s13ygv_k$(new CoroutineName(this$0.engineName_1 + '-context'));
    };
  }
  function HttpClientEngineBase(engineName) {
    this.engineName_1 = engineName;
    this.closed_1 = atomic$boolean$1(false);
    var tmp = this;
    tmp.dispatcher$delegate_1 = lazy(HttpClientEngineBase$dispatcher$delegate$lambda(this));
    var tmp_0 = this;
    tmp_0.coroutineContext$delegate_1 = lazy(HttpClientEngineBase$coroutineContext$delegate$lambda(this));
  }
  protoOf(HttpClientEngineBase).get_dispatcher_usy1bk_k$ = function () {
    var tmp0 = this.dispatcher$delegate_1;
    // Inline function 'kotlin.getValue' call
    dispatcher$factory();
    return tmp0.get_value_j01efc_k$();
  };
  protoOf(HttpClientEngineBase).get_coroutineContext_115oqo_k$ = function () {
    var tmp0 = this.coroutineContext$delegate_1;
    // Inline function 'kotlin.getValue' call
    coroutineContext$factory();
    return tmp0.get_value_j01efc_k$();
  };
  protoOf(HttpClientEngineBase).close_yn9xrc_k$ = function () {
    if (!this.closed_1.atomicfu$compareAndSet(false, true))
      return Unit_getInstance();
    var tmp = this.get_coroutineContext_115oqo_k$().get_y2st91_k$(Key_getInstance());
    var tmp0_elvis_lhs = (!(tmp == null) ? isInterface(tmp, CompletableJob) : false) ? tmp : null;
    var tmp_0;
    if (tmp0_elvis_lhs == null) {
      return Unit_getInstance();
    } else {
      tmp_0 = tmp0_elvis_lhs;
    }
    var requestJob = tmp_0;
    requestJob.complete_9ww6vb_k$();
  };
  function dispatcher$factory() {
    return getPropertyCallableRef('dispatcher', 1, KProperty1, function (receiver) {
      return receiver.get_dispatcher_usy1bk_k$();
    }, null);
  }
  function coroutineContext$factory() {
    return getPropertyCallableRef('coroutineContext', 1, KProperty1, function (receiver) {
      return receiver.get_coroutineContext_115oqo_k$();
    }, null);
  }
  function get_ENGINE_CAPABILITIES_KEY() {
    _init_properties_HttpClientEngineCapability_kt__ifvyst();
    return ENGINE_CAPABILITIES_KEY;
  }
  var ENGINE_CAPABILITIES_KEY;
  function get_DEFAULT_CAPABILITIES() {
    _init_properties_HttpClientEngineCapability_kt__ifvyst();
    return DEFAULT_CAPABILITIES;
  }
  var DEFAULT_CAPABILITIES;
  function HttpClientEngineCapability() {
  }
  var properties_initialized_HttpClientEngineCapability_kt_qarzcf;
  function _init_properties_HttpClientEngineCapability_kt__ifvyst() {
    if (!properties_initialized_HttpClientEngineCapability_kt_qarzcf) {
      properties_initialized_HttpClientEngineCapability_kt_qarzcf = true;
      // Inline function 'io.ktor.util.AttributeKey' call
      var name = 'EngineCapabilities';
      // Inline function 'io.ktor.util.reflect.typeInfo' call
      var tmp = getKClass(KtMutableMap);
      // Inline function 'io.ktor.util.reflect.typeOfOrNull' call
      var tmp_0;
      try {
        tmp_0 = createKType(getKClass(KtMutableMap), arrayOf([createInvariantKTypeProjection(createKType(getKClass(HttpClientEngineCapability), arrayOf([getStarKTypeProjection()]), false)), createInvariantKTypeProjection(createKType(PrimitiveClasses_getInstance().get_anyClass_x0jl4l_k$(), arrayOf([]), false))]), false);
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
      ENGINE_CAPABILITIES_KEY = new AttributeKey(name, tmp$ret$1);
      DEFAULT_CAPABILITIES = setOf(HttpTimeoutCapability_getInstance());
    }
  }
  function HttpClientEngineConfig() {
    this.threadsCount_1 = 4;
    this.dispatcher_1 = null;
    this.pipelining_1 = false;
    this.proxy_1 = null;
  }
  protoOf(HttpClientEngineConfig).set_threadsCount_jeoh39_k$ = function (_set____db54di) {
    this.threadsCount_1 = _set____db54di;
  };
  protoOf(HttpClientEngineConfig).get_threadsCount_8ubz8v_k$ = function () {
    return this.threadsCount_1;
  };
  protoOf(HttpClientEngineConfig).set_dispatcher_vfftce_k$ = function (_set____db54di) {
    this.dispatcher_1 = _set____db54di;
  };
  protoOf(HttpClientEngineConfig).get_dispatcher_usy1bk_k$ = function () {
    return this.dispatcher_1;
  };
  protoOf(HttpClientEngineConfig).set_pipelining_wh23y1_k$ = function (_set____db54di) {
    this.pipelining_1 = _set____db54di;
  };
  protoOf(HttpClientEngineConfig).get_pipelining_x1t9pk_k$ = function () {
    return this.pipelining_1;
  };
  protoOf(HttpClientEngineConfig).set_proxy_6o7pub_k$ = function (_set____db54di) {
    this.proxy_1 = _set____db54di;
  };
  protoOf(HttpClientEngineConfig).get_proxy_ix1jyd_k$ = function () {
    return this.proxy_1;
  };
  function HttpClientEngineFactory$create$lambda(_this__u8e3s4) {
    return Unit_getInstance();
  }
  function HttpClientEngineFactory() {
  }
  function get_KTOR_DEFAULT_USER_AGENT() {
    _init_properties_Utils_kt__jo07cx();
    return KTOR_DEFAULT_USER_AGENT;
  }
  var KTOR_DEFAULT_USER_AGENT;
  function get_DATE_HEADERS() {
    _init_properties_Utils_kt__jo07cx();
    return DATE_HEADERS;
  }
  var DATE_HEADERS;
  function Companion_0() {
    Companion_instance_0 = this;
  }
  var Companion_instance_0;
  function Companion_getInstance_9() {
    if (Companion_instance_0 == null)
      new Companion_0();
    return Companion_instance_0;
  }
  function KtorCallContextElement(callContext) {
    Companion_getInstance_9();
    this.callContext_1 = callContext;
  }
  protoOf(KtorCallContextElement).get_callContext_mskb9k_k$ = function () {
    return this.callContext_1;
  };
  protoOf(KtorCallContextElement).get_key_18j28a_k$ = function () {
    return Companion_getInstance_9();
  };
  function attachToUserJob(callJob, $completion) {
    // Inline function 'kotlin.js.getCoroutineContext' call
    var tmp0_elvis_lhs = $completion.get_context_h02k06_k$().get_y2st91_k$(Key_getInstance());
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return Unit_getInstance();
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var userJob = tmp;
    var cleanupHandler = userJob.invokeOnCompletion$default_1v3utx_k$(true, VOID, attachToUserJob$lambda(callJob));
    callJob.invokeOnCompletion_n6cffu_k$(attachToUserJob$lambda_0(cleanupHandler));
    return Unit_getInstance();
  }
  function callContext($completion) {
    // Inline function 'kotlin.js.getCoroutineContext' call
    var tmp$ret$0 = $completion.get_context_h02k06_k$();
    return ensureNotNull(tmp$ret$0.get_y2st91_k$(Companion_getInstance_9())).callContext_1;
  }
  function mergeHeaders(requestHeaders, content, block) {
    _init_properties_Utils_kt__jo07cx();
    var tmp = buildHeaders(mergeHeaders$lambda(requestHeaders, content));
    tmp.forEach_jocloe_k$(mergeHeaders$lambda_0(block));
    var missingAgent = requestHeaders.get_6bo4tg_k$(HttpHeaders_getInstance().get_UserAgent_o827rj_k$()) == null && content.get_headers_ef25jx_k$().get_6bo4tg_k$(HttpHeaders_getInstance().get_UserAgent_o827rj_k$()) == null;
    if (missingAgent && needUserAgent()) {
      block(HttpHeaders_getInstance().get_UserAgent_o827rj_k$(), get_KTOR_DEFAULT_USER_AGENT());
    }
    var tmp0_safe_receiver = content.get_contentType_7git4a_k$();
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.toString();
    var tmp2_elvis_lhs = tmp1_elvis_lhs == null ? content.get_headers_ef25jx_k$().get_6bo4tg_k$(HttpHeaders_getInstance().get_ContentType_z1j0sq_k$()) : tmp1_elvis_lhs;
    var type = tmp2_elvis_lhs == null ? requestHeaders.get_6bo4tg_k$(HttpHeaders_getInstance().get_ContentType_z1j0sq_k$()) : tmp2_elvis_lhs;
    var tmp3_safe_receiver = content.get_contentLength_a5o8yy_k$();
    var tmp4_elvis_lhs = tmp3_safe_receiver == null ? null : tmp3_safe_receiver.toString();
    var tmp5_elvis_lhs = tmp4_elvis_lhs == null ? content.get_headers_ef25jx_k$().get_6bo4tg_k$(HttpHeaders_getInstance().get_ContentLength_3209rq_k$()) : tmp4_elvis_lhs;
    var length = tmp5_elvis_lhs == null ? requestHeaders.get_6bo4tg_k$(HttpHeaders_getInstance().get_ContentLength_3209rq_k$()) : tmp5_elvis_lhs;
    if (type == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      block(HttpHeaders_getInstance().get_ContentType_z1j0sq_k$(), type);
    }
    if (length == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      block(HttpHeaders_getInstance().get_ContentLength_3209rq_k$(), length);
    }
  }
  function needUserAgent() {
    _init_properties_Utils_kt__jo07cx();
    return !PlatformUtils_getInstance().get_IS_BROWSER_e36mbg_k$();
  }
  function attachToUserJob$lambda($callJob) {
    return function (cause) {
      if (cause == null)
        return Unit_getInstance();
      $callJob.cancel_hkmm2i_k$(CancellationException_init_$Create$(cause.message));
      return Unit_getInstance();
    };
  }
  function attachToUserJob$lambda_0($cleanupHandler) {
    return function (it) {
      $cleanupHandler.dispose_3nnxhr_k$();
      return Unit_getInstance();
    };
  }
  function mergeHeaders$lambda($requestHeaders, $content) {
    return function ($this$buildHeaders) {
      $this$buildHeaders.appendAll_k8dlt1_k$($requestHeaders);
      $this$buildHeaders.appendAll_k8dlt1_k$($content.get_headers_ef25jx_k$());
      return Unit_getInstance();
    };
  }
  function mergeHeaders$lambda_0($block) {
    return function (key, values) {
      var tmp;
      if (HttpHeaders_getInstance().get_ContentLength_3209rq_k$() === key) {
        return Unit_getInstance();
      }
      var tmp_0;
      if (HttpHeaders_getInstance().get_ContentType_z1j0sq_k$() === key) {
        return Unit_getInstance();
      }
      var tmp_1;
      if (get_DATE_HEADERS().contains_aljjnj_k$(key)) {
        // Inline function 'kotlin.collections.forEach' call
        var _iterator__ex2g4s = values.iterator_jk1svi_k$();
        while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
          var element = _iterator__ex2g4s.next_20eer_k$();
          $block(key, element);
        }
        tmp_1 = Unit_getInstance();
      } else {
        var separator = HttpHeaders_getInstance().get_Cookie_358woj_k$() === key ? '; ' : ',';
        tmp_1 = $block(key, joinToString(values, separator));
      }
      return Unit_getInstance();
    };
  }
  var properties_initialized_Utils_kt_xvi83j;
  function _init_properties_Utils_kt__jo07cx() {
    if (!properties_initialized_Utils_kt_xvi83j) {
      properties_initialized_Utils_kt_xvi83j = true;
      KTOR_DEFAULT_USER_AGENT = 'ktor-client';
      DATE_HEADERS = setOf_0([HttpHeaders_getInstance().get_Date_wo05cn_k$(), HttpHeaders_getInstance().get_Expires_755s8b_k$(), HttpHeaders_getInstance().get_LastModified_vddkig_k$(), HttpHeaders_getInstance().get_IfModifiedSince_aujsxh_k$(), HttpHeaders_getInstance().get_IfUnmodifiedSince_b7s52m_k$()]);
    }
  }
  function get_UploadProgressListenerAttributeKey() {
    _init_properties_BodyProgress_kt__s0v569();
    return UploadProgressListenerAttributeKey;
  }
  var UploadProgressListenerAttributeKey;
  function get_DownloadProgressListenerAttributeKey() {
    _init_properties_BodyProgress_kt__s0v569();
    return DownloadProgressListenerAttributeKey;
  }
  var DownloadProgressListenerAttributeKey;
  function get_BodyProgress() {
    _init_properties_BodyProgress_kt__s0v569();
    return BodyProgress;
  }
  var BodyProgress;
  function AfterRenderHook$install$slambda($handler, resultContinuation) {
    this.$handler_1 = $handler;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(AfterRenderHook$install$slambda).invoke_wpcgmu_k$ = function ($this$intercept, content, $completion) {
    var tmp = this.create_l3tkcm_k$($this$intercept, content, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(AfterRenderHook$install$slambda).invoke_4tzzq6_k$ = function (p1, p2, $completion) {
    var tmp = p1 instanceof PipelineContext ? p1 : THROW_CCE();
    return this.invoke_wpcgmu_k$(tmp, !(p2 == null) ? p2 : THROW_CCE(), $completion);
  };
  protoOf(AfterRenderHook$install$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(3);
            var tmp_0 = this.content_1;
            if (!(tmp_0 instanceof OutgoingContent))
              return Unit_getInstance();
            this.set_state_rjd8d0_k$(1);
            suspendResult = this.$handler_1(this.$this$intercept_1.get_context_h02k06_k$(), this.content_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.tmp0_elvis_lhs0__1 = suspendResult;
            var tmp_1 = this;
            var tmp_2;
            if (this.tmp0_elvis_lhs0__1 == null) {
              return Unit_getInstance();
            } else {
              tmp_2 = this.tmp0_elvis_lhs0__1;
            }

            tmp_1.newContent1__1 = tmp_2;
            this.set_state_rjd8d0_k$(2);
            suspendResult = this.$this$intercept_1.proceedWith_i5skhv_k$(this.newContent1__1, this);
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
  protoOf(AfterRenderHook$install$slambda).create_l3tkcm_k$ = function ($this$intercept, content, completion) {
    var i = new AfterRenderHook$install$slambda(this.$handler_1, completion);
    i.$this$intercept_1 = $this$intercept;
    i.content_1 = content;
    return i;
  };
  function AfterRenderHook$install$slambda_0($handler, resultContinuation) {
    var i = new AfterRenderHook$install$slambda($handler, resultContinuation);
    var l = function ($this$intercept, content, $completion) {
      return i.invoke_wpcgmu_k$($this$intercept, content, $completion);
    };
    l.$arity = 2;
    return l;
  }
  function AfterRenderHook() {
    AfterRenderHook_instance = this;
  }
  protoOf(AfterRenderHook).install_3444oh_k$ = function (client, handler) {
    var observableContentPhase = new PipelinePhase('ObservableContent');
    client.get_requestPipeline_5d9z6w_k$().insertPhaseAfter_gfhxiu_k$(Phases_getInstance().get_Render_3swp1b_k$(), observableContentPhase);
    var tmp = client.get_requestPipeline_5d9z6w_k$();
    tmp.intercept_k21bv3_k$(observableContentPhase, AfterRenderHook$install$slambda_0(handler, null));
  };
  protoOf(AfterRenderHook).install_o8nink_k$ = function (client, handler) {
    return this.install_3444oh_k$(client, (!(handler == null) ? isSuspendFunction(handler, 2) : false) ? handler : THROW_CCE());
  };
  var AfterRenderHook_instance;
  function AfterRenderHook_getInstance() {
    if (AfterRenderHook_instance == null)
      new AfterRenderHook();
    return AfterRenderHook_instance;
  }
  function AfterReceiveHook$install$slambda($handler, resultContinuation) {
    this.$handler_1 = $handler;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(AfterReceiveHook$install$slambda).invoke_djztfu_k$ = function ($this$intercept, response, $completion) {
    var tmp = this.create_sxpl8e_k$($this$intercept, response, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(AfterReceiveHook$install$slambda).invoke_4tzzq6_k$ = function (p1, p2, $completion) {
    var tmp = p1 instanceof PipelineContext ? p1 : THROW_CCE();
    return this.invoke_djztfu_k$(tmp, p2 instanceof HttpResponse ? p2 : THROW_CCE(), $completion);
  };
  protoOf(AfterReceiveHook$install$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(4);
            this.set_state_rjd8d0_k$(1);
            suspendResult = this.$handler_1(this.response_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.newResponse0__1 = suspendResult;
            if (!(this.newResponse0__1 == null)) {
              this.set_state_rjd8d0_k$(2);
              suspendResult = this.$this$intercept_1.proceedWith_i5skhv_k$(this.newResponse0__1, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.set_state_rjd8d0_k$(3);
              continue $sm;
            }

          case 2:
            this.set_state_rjd8d0_k$(3);
            continue $sm;
          case 3:
            return Unit_getInstance();
          case 4:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 4) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  protoOf(AfterReceiveHook$install$slambda).create_sxpl8e_k$ = function ($this$intercept, response, completion) {
    var i = new AfterReceiveHook$install$slambda(this.$handler_1, completion);
    i.$this$intercept_1 = $this$intercept;
    i.response_1 = response;
    return i;
  };
  function AfterReceiveHook$install$slambda_0($handler, resultContinuation) {
    var i = new AfterReceiveHook$install$slambda($handler, resultContinuation);
    var l = function ($this$intercept, response, $completion) {
      return i.invoke_djztfu_k$($this$intercept, response, $completion);
    };
    l.$arity = 2;
    return l;
  }
  function AfterReceiveHook() {
    AfterReceiveHook_instance = this;
  }
  protoOf(AfterReceiveHook).install_c852gc_k$ = function (client, handler) {
    var tmp = client.get_receivePipeline_3qwhq4_k$();
    var tmp_0 = Phases_getInstance_1().get_After_i6zngz_k$();
    tmp.intercept_k21bv3_k$(tmp_0, AfterReceiveHook$install$slambda_0(handler, null));
  };
  protoOf(AfterReceiveHook).install_o8nink_k$ = function (client, handler) {
    return this.install_c852gc_k$(client, (!(handler == null) ? isSuspendFunction(handler, 1) : false) ? handler : THROW_CCE());
  };
  var AfterReceiveHook_instance;
  function AfterReceiveHook_getInstance() {
    if (AfterReceiveHook_instance == null)
      new AfterReceiveHook();
    return AfterReceiveHook_instance;
  }
  function withObservableDownload(_this__u8e3s4, listener) {
    _init_properties_BodyProgress_kt__s0v569();
    var observableByteChannel = observable(_this__u8e3s4.get_rawContent_u3f8li_k$(), _this__u8e3s4.get_coroutineContext_115oqo_k$(), contentLength(_this__u8e3s4), listener);
    return wrapWithContent(_this__u8e3s4.get_call_wojxrb_k$(), observableByteChannel).get_response_xlk07e_k$();
  }
  function BodyProgress$lambda($this$createClientPlugin) {
    _init_properties_BodyProgress_kt__s0v569();
    var tmp = AfterRenderHook_getInstance();
    $this$createClientPlugin.on_z1oiz_k$(tmp, BodyProgress$lambda$slambda_0(null));
    var tmp_0 = AfterReceiveHook_getInstance();
    $this$createClientPlugin.on_z1oiz_k$(tmp_0, BodyProgress$lambda$slambda_2(null));
    return Unit_getInstance();
  }
  function BodyProgress$lambda$slambda(resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(BodyProgress$lambda$slambda).invoke_jn8q1o_k$ = function (request, content, $completion) {
    var tmp = this.create_gs58mt_k$(request, content, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(BodyProgress$lambda$slambda).invoke_4tzzq6_k$ = function (p1, p2, $completion) {
    var tmp = p1 instanceof HttpRequestBuilder ? p1 : THROW_CCE();
    return this.invoke_jn8q1o_k$(tmp, p2 instanceof OutgoingContent ? p2 : THROW_CCE(), $completion);
  };
  protoOf(BodyProgress$lambda$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        if (tmp === 0) {
          this.set_exceptionState_fex74n_k$(1);
          var tmp0_elvis_lhs = this.request_1.get_attributes_dgqof4_k$().getOrNull_6mjt1v_k$(get_UploadProgressListenerAttributeKey());
          var tmp_0;
          if (tmp0_elvis_lhs == null) {
            return null;
          } else {
            tmp_0 = tmp0_elvis_lhs;
          }
          var listener = tmp_0;
          return new ObservableContent(this.content_1, this.request_1.get_executionContext_yb2vgg_k$(), listener);
        } else if (tmp === 1) {
          throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        throw e;
      }
     while (true);
  };
  protoOf(BodyProgress$lambda$slambda).create_gs58mt_k$ = function (request, content, completion) {
    var i = new BodyProgress$lambda$slambda(completion);
    i.request_1 = request;
    i.content_1 = content;
    return i;
  };
  function BodyProgress$lambda$slambda_0(resultContinuation) {
    var i = new BodyProgress$lambda$slambda(resultContinuation);
    var l = function (request, content, $completion) {
      return i.invoke_jn8q1o_k$(request, content, $completion);
    };
    l.$arity = 2;
    return l;
  }
  function BodyProgress$lambda$slambda_1(resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(BodyProgress$lambda$slambda_1).invoke_p5e8c1_k$ = function (response, $completion) {
    var tmp = this.create_bkvwgl_k$(response, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(BodyProgress$lambda$slambda_1).invoke_qns8j1_k$ = function (p1, $completion) {
    return this.invoke_p5e8c1_k$(p1 instanceof HttpResponse ? p1 : THROW_CCE(), $completion);
  };
  protoOf(BodyProgress$lambda$slambda_1).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        if (tmp === 0) {
          this.set_exceptionState_fex74n_k$(1);
          var tmp0_elvis_lhs = this.response_1.get_call_wojxrb_k$().get_request_jdwg4m_k$().get_attributes_dgqof4_k$().getOrNull_6mjt1v_k$(get_DownloadProgressListenerAttributeKey());
          var tmp_0;
          if (tmp0_elvis_lhs == null) {
            return null;
          } else {
            tmp_0 = tmp0_elvis_lhs;
          }
          var listener = tmp_0;
          return withObservableDownload(this.response_1, listener);
        } else if (tmp === 1) {
          throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        throw e;
      }
     while (true);
  };
  protoOf(BodyProgress$lambda$slambda_1).create_bkvwgl_k$ = function (response, completion) {
    var i = new BodyProgress$lambda$slambda_1(completion);
    i.response_1 = response;
    return i;
  };
  protoOf(BodyProgress$lambda$slambda_1).create_wyq9v6_k$ = function (value, completion) {
    return this.create_bkvwgl_k$(value instanceof HttpResponse ? value : THROW_CCE(), completion);
  };
  function BodyProgress$lambda$slambda_2(resultContinuation) {
    var i = new BodyProgress$lambda$slambda_1(resultContinuation);
    var l = function (response, $completion) {
      return i.invoke_p5e8c1_k$(response, $completion);
    };
    l.$arity = 1;
    return l;
  }
  var properties_initialized_BodyProgress_kt_pmfrhr;
  function _init_properties_BodyProgress_kt__s0v569() {
    if (!properties_initialized_BodyProgress_kt_pmfrhr) {
      properties_initialized_BodyProgress_kt_pmfrhr = true;
      // Inline function 'io.ktor.util.AttributeKey' call
      var name = 'UploadProgressListenerAttributeKey';
      // Inline function 'io.ktor.util.reflect.typeInfo' call
      var tmp = getKClass(ProgressListener);
      // Inline function 'io.ktor.util.reflect.typeOfOrNull' call
      var tmp_0;
      try {
        tmp_0 = createKType(getKClass(ProgressListener), arrayOf([]), false);
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
      UploadProgressListenerAttributeKey = new AttributeKey(name, tmp$ret$1);
      // Inline function 'io.ktor.util.AttributeKey' call
      var name_0 = 'DownloadProgressListenerAttributeKey';
      // Inline function 'io.ktor.util.reflect.typeInfo' call
      var tmp_2 = getKClass(ProgressListener);
      // Inline function 'io.ktor.util.reflect.typeOfOrNull' call
      var tmp_3;
      try {
        tmp_3 = createKType(getKClass(ProgressListener), arrayOf([]), false);
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
      DownloadProgressListenerAttributeKey = new AttributeKey(name_0, tmp$ret$1_0);
      BodyProgress = createClientPlugin('BodyProgress', BodyProgress$lambda);
    }
  }
  function get_LOGGER() {
    _init_properties_DefaultRequest_kt__yzsodq();
    return LOGGER;
  }
  var LOGGER;
  var properties_initialized_DefaultRequest_kt_au5efk;
  function _init_properties_DefaultRequest_kt__yzsodq() {
    if (!properties_initialized_DefaultRequest_kt_au5efk) {
      properties_initialized_DefaultRequest_kt_au5efk = true;
      LOGGER = KtorSimpleLogger('io.ktor.client.plugins.DefaultRequest');
    }
  }
  function get_ValidateMark() {
    _init_properties_DefaultResponseValidation_kt__wcn8vr();
    return ValidateMark;
  }
  var ValidateMark;
  function get_LOGGER_0() {
    _init_properties_DefaultResponseValidation_kt__wcn8vr();
    return LOGGER_0;
  }
  var LOGGER_0;
  function addDefaultResponseValidation(_this__u8e3s4) {
    _init_properties_DefaultResponseValidation_kt__wcn8vr();
    HttpResponseValidator(_this__u8e3s4, addDefaultResponseValidation$lambda(_this__u8e3s4));
  }
  function ResponseException(response, cachedResponseText) {
    IllegalStateException_init_$Init$_0('Bad response: ' + response.toString() + '. Text: "' + cachedResponseText + '"', this);
    captureStack(this, ResponseException);
    this.response_1 = response;
  }
  protoOf(ResponseException).get_response_xlk07e_k$ = function () {
    return this.response_1;
  };
  function RedirectResponseException(response, cachedResponseText) {
    ResponseException.call(this, response, cachedResponseText);
    captureStack(this, RedirectResponseException);
    this.message_1 = 'Unhandled redirect: ' + response.get_call_wojxrb_k$().get_request_jdwg4m_k$().get_method_gl8esq_k$().get_value_j01efc_k$() + ' ' + response.get_call_wojxrb_k$().get_request_jdwg4m_k$().get_url_18iuii_k$().toString() + '. ' + ('Status: ' + response.get_status_jnf6d7_k$().toString() + '. Text: "' + cachedResponseText + '"');
  }
  protoOf(RedirectResponseException).get_message_h23axq_k$ = function () {
    return this.message_1;
  };
  function ClientRequestException(response, cachedResponseText) {
    ResponseException.call(this, response, cachedResponseText);
    captureStack(this, ClientRequestException);
    this.message_1 = 'Client request(' + response.get_call_wojxrb_k$().get_request_jdwg4m_k$().get_method_gl8esq_k$().get_value_j01efc_k$() + ' ' + response.get_call_wojxrb_k$().get_request_jdwg4m_k$().get_url_18iuii_k$().toString() + ') ' + ('invalid: ' + response.get_status_jnf6d7_k$().toString() + '. Text: "' + cachedResponseText + '"');
  }
  protoOf(ClientRequestException).get_message_h23axq_k$ = function () {
    return this.message_1;
  };
  function ServerResponseException(response, cachedResponseText) {
    ResponseException.call(this, response, cachedResponseText);
    captureStack(this, ServerResponseException);
    this.message_1 = 'Server error(' + response.get_call_wojxrb_k$().get_request_jdwg4m_k$().get_method_gl8esq_k$().get_value_j01efc_k$() + ' ' + response.get_call_wojxrb_k$().get_request_jdwg4m_k$().get_url_18iuii_k$().toString() + ': ' + (response.get_status_jnf6d7_k$().toString() + '. Text: "' + cachedResponseText + '"');
  }
  protoOf(ServerResponseException).get_message_h23axq_k$ = function () {
    return this.message_1;
  };
  function addDefaultResponseValidation$lambda$slambda(resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(addDefaultResponseValidation$lambda$slambda).invoke_5qztuh_k$ = function (response, $completion) {
    var tmp = this.create_bkvwgl_k$(response, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(addDefaultResponseValidation$lambda$slambda).invoke_qns8j1_k$ = function (p1, $completion) {
    return this.invoke_5qztuh_k$(p1 instanceof HttpResponse ? p1 : THROW_CCE(), $completion);
  };
  protoOf(addDefaultResponseValidation$lambda$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(5);
            this.expectSuccess0__1 = this.response_1.get_call_wojxrb_k$().get_attributes_dgqof4_k$().get_r696p5_k$(get_ExpectSuccessAttributeKey());
            if (!this.expectSuccess0__1) {
              get_LOGGER_0().trace_fti9bv_k$('Skipping default response validation for ' + this.response_1.get_call_wojxrb_k$().get_request_jdwg4m_k$().get_url_18iuii_k$().toString());
              return Unit_getInstance();
            }

            this.statusCode1__1 = this.response_1.get_status_jnf6d7_k$().get_value_j01efc_k$();
            this.originCall2__1 = this.response_1.get_call_wojxrb_k$();
            if (this.statusCode1__1 < 300 || this.originCall2__1.get_attributes_dgqof4_k$().contains_du0289_k$(get_ValidateMark())) {
              return Unit_getInstance();
            }

            this.set_state_rjd8d0_k$(1);
            suspendResult = save(this.originCall2__1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.tmp03__1 = suspendResult;
            var tmp_0 = this;
            var this_0 = this.tmp03__1;
            this_0.get_attributes_dgqof4_k$().put_gkntno_k$(get_ValidateMark(), Unit_getInstance());
            tmp_0.exceptionCall4__1 = this_0;
            this.exceptionResponse5__1 = this.exceptionCall4__1.get_response_xlk07e_k$();
            this.set_exceptionState_fex74n_k$(3);
            this.set_state_rjd8d0_k$(2);
            suspendResult = bodyAsText(this.exceptionResponse5__1, VOID, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            this.TRY_RESULT6__1 = suspendResult;
            this.set_exceptionState_fex74n_k$(5);
            this.set_state_rjd8d0_k$(4);
            continue $sm;
          case 3:
            this.set_exceptionState_fex74n_k$(5);
            var tmp_1 = this.get_exception_x0n6w6_k$();
            if (tmp_1 instanceof MalformedInputException) {
              var _unused_var__etf5q3 = this.get_exception_x0n6w6_k$();
              var tmp_2 = this;
              tmp_2.TRY_RESULT6__1 = '<body failed decoding>';
              this.set_state_rjd8d0_k$(4);
              continue $sm;
            } else {
              throw this.get_exception_x0n6w6_k$();
            }

          case 4:
            this.set_exceptionState_fex74n_k$(5);
            var exceptionResponseText = this.TRY_RESULT6__1;
            var tmp0_subject = this.statusCode1__1;
            var exception = (300 <= tmp0_subject ? tmp0_subject <= 399 : false) ? new RedirectResponseException(this.exceptionResponse5__1, exceptionResponseText) : (400 <= tmp0_subject ? tmp0_subject <= 499 : false) ? new ClientRequestException(this.exceptionResponse5__1, exceptionResponseText) : (500 <= tmp0_subject ? tmp0_subject <= 599 : false) ? new ServerResponseException(this.exceptionResponse5__1, exceptionResponseText) : new ResponseException(this.exceptionResponse5__1, exceptionResponseText);
            get_LOGGER_0().trace_fti9bv_k$('Default response validation for ' + this.response_1.get_call_wojxrb_k$().get_request_jdwg4m_k$().get_url_18iuii_k$().toString() + ' failed with ' + exception.toString());
            throw exception;
          case 5:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 5) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  protoOf(addDefaultResponseValidation$lambda$slambda).create_bkvwgl_k$ = function (response, completion) {
    var i = new addDefaultResponseValidation$lambda$slambda(completion);
    i.response_1 = response;
    return i;
  };
  protoOf(addDefaultResponseValidation$lambda$slambda).create_wyq9v6_k$ = function (value, completion) {
    return this.create_bkvwgl_k$(value instanceof HttpResponse ? value : THROW_CCE(), completion);
  };
  function addDefaultResponseValidation$lambda$slambda_0(resultContinuation) {
    var i = new addDefaultResponseValidation$lambda$slambda(resultContinuation);
    var l = function (response, $completion) {
      return i.invoke_5qztuh_k$(response, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function addDefaultResponseValidation$lambda($this_addDefaultResponseValidation) {
    return function ($this$HttpResponseValidator) {
      $this$HttpResponseValidator.set_expectSuccess_avm9m3_k$($this_addDefaultResponseValidation.get_expectSuccess_uic3pb_k$());
      $this$HttpResponseValidator.validateResponse_cfyktb_k$(addDefaultResponseValidation$lambda$slambda_0(null));
      return Unit_getInstance();
    };
  }
  var properties_initialized_DefaultResponseValidation_kt_akvzqt;
  function _init_properties_DefaultResponseValidation_kt__wcn8vr() {
    if (!properties_initialized_DefaultResponseValidation_kt_akvzqt) {
      properties_initialized_DefaultResponseValidation_kt_akvzqt = true;
      // Inline function 'io.ktor.util.AttributeKey' call
      var name = 'ValidateMark';
      // Inline function 'io.ktor.util.reflect.typeInfo' call
      var tmp = getKClass(Unit);
      // Inline function 'io.ktor.util.reflect.typeOfOrNull' call
      var tmp_0;
      try {
        tmp_0 = createKType(getKClass(Unit), arrayOf([]), false);
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
      ValidateMark = new AttributeKey(name, tmp$ret$1);
      LOGGER_0 = KtorSimpleLogger('io.ktor.client.plugins.DefaultResponseValidation');
    }
  }
  function get_LOGGER_1() {
    _init_properties_DefaultTransform_kt__20knxx();
    return LOGGER_1;
  }
  var LOGGER_1;
  function defaultTransformers(_this__u8e3s4) {
    _init_properties_DefaultTransform_kt__20knxx();
    var tmp = _this__u8e3s4.get_requestPipeline_5d9z6w_k$();
    var tmp_0 = Phases_getInstance().get_Render_3swp1b_k$();
    tmp.intercept_k21bv3_k$(tmp_0, defaultTransformers$slambda_0(null));
    var tmp_1 = _this__u8e3s4.get_responsePipeline_xbi790_k$();
    var tmp_2 = Phases_getInstance_2().get_Parse_if5ca2_k$();
    tmp_1.intercept_k21bv3_k$(tmp_2, defaultTransformers$slambda_2(_this__u8e3s4, null));
    platformResponseDefaultTransformers(_this__u8e3s4);
  }
  function checkContentLength_0(contentLength, bytes) {
    _init_properties_DefaultTransform_kt__20knxx();
    // Inline function 'kotlin.check' call
    if (!(contentLength == null || equals(contentLength, bytes))) {
      var message = 'Content-Length mismatch: expected ' + toString_0(contentLength) + ' bytes, but received ' + bytes.toString() + ' bytes';
      throw IllegalStateException_init_$Create$(toString(message));
    }
  }
  function defaultTransformers$1$content$1($contentType, $body) {
    this.$body_1 = $body;
    ByteArrayContent.call(this);
    var tmp = this;
    tmp.contentType_1 = $contentType == null ? Application_getInstance().get_OctetStream_nfka06_k$() : $contentType;
    this.contentLength_1 = toLong($body.length);
  }
  protoOf(defaultTransformers$1$content$1).get_contentType_7git4a_k$ = function () {
    return this.contentType_1;
  };
  protoOf(defaultTransformers$1$content$1).get_contentLength_a5o8yy_k$ = function () {
    return this.contentLength_1;
  };
  protoOf(defaultTransformers$1$content$1).bytes_1k3k2z_k$ = function () {
    return this.$body_1;
  };
  function defaultTransformers$1$content$2($this_intercept, $contentType, $body) {
    this.$body_1 = $body;
    ReadChannelContent.call(this);
    var tmp = this;
    var tmp0_safe_receiver = $this_intercept.get_context_h02k06_k$().get_headers_ef25jx_k$().get_6bo4tg_k$(HttpHeaders_getInstance().get_ContentLength_3209rq_k$());
    tmp.contentLength_1 = tmp0_safe_receiver == null ? null : toLong_0(tmp0_safe_receiver);
    var tmp_0 = this;
    tmp_0.contentType_1 = $contentType == null ? Application_getInstance().get_OctetStream_nfka06_k$() : $contentType;
  }
  protoOf(defaultTransformers$1$content$2).get_contentLength_a5o8yy_k$ = function () {
    return this.contentLength_1;
  };
  protoOf(defaultTransformers$1$content$2).get_contentType_7git4a_k$ = function () {
    return this.contentType_1;
  };
  protoOf(defaultTransformers$1$content$2).readFrom_ecr4ww_k$ = function () {
    return this.$body_1;
  };
  function defaultTransformers$slambda(resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(defaultTransformers$slambda).invoke_wpcgmu_k$ = function ($this$intercept, body, $completion) {
    var tmp = this.create_l3tkcm_k$($this$intercept, body, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(defaultTransformers$slambda).invoke_4tzzq6_k$ = function (p1, p2, $completion) {
    var tmp = p1 instanceof PipelineContext ? p1 : THROW_CCE();
    return this.invoke_wpcgmu_k$(tmp, !(p2 == null) ? p2 : THROW_CCE(), $completion);
  };
  protoOf(defaultTransformers$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(3);
            if (this.$this$intercept_1.get_context_h02k06_k$().get_headers_ef25jx_k$().get_6bo4tg_k$(HttpHeaders_getInstance().get_Accept_4a5gpb_k$()) == null) {
              this.$this$intercept_1.get_context_h02k06_k$().get_headers_ef25jx_k$().append_rhug0a_k$(HttpHeaders_getInstance().get_Accept_4a5gpb_k$(), '*/*');
            }

            this.contentType0__1 = contentType(this.$this$intercept_1.get_context_h02k06_k$());
            var tmp_0 = this;
            var tmp0_subject = this.body_1;
            var tmp_1;
            if (typeof tmp0_subject === 'string') {
              var tmp1_elvis_lhs = this.contentType0__1;
              tmp_1 = new TextContent(this.body_1, tmp1_elvis_lhs == null ? Text_getInstance().get_Plain_ifc0ap_k$() : tmp1_elvis_lhs);
            } else {
              if (isByteArray(tmp0_subject)) {
                tmp_1 = new defaultTransformers$1$content$1(this.contentType0__1, this.body_1);
              } else {
                if (isInterface(tmp0_subject, ByteReadChannel)) {
                  tmp_1 = new defaultTransformers$1$content$2(this.$this$intercept_1, this.contentType0__1, this.body_1);
                } else {
                  if (tmp0_subject instanceof OutgoingContent) {
                    tmp_1 = this.body_1;
                  } else {
                    tmp_1 = platformRequestDefaultTransform(this.contentType0__1, this.$this$intercept_1.get_context_h02k06_k$(), this.body_1);
                  }
                }
              }
            }

            tmp_0.content1__1 = tmp_1;
            var tmp2_safe_receiver = this.content1__1;
            if (!((tmp2_safe_receiver == null ? null : tmp2_safe_receiver.get_contentType_7git4a_k$()) == null)) {
              this.$this$intercept_1.get_context_h02k06_k$().get_headers_ef25jx_k$().remove_6241ba_k$(HttpHeaders_getInstance().get_ContentType_z1j0sq_k$());
              get_LOGGER_1().trace_fti9bv_k$('Transformed with default transformers request body for ' + this.$this$intercept_1.get_context_h02k06_k$().get_url_18iuii_k$().toString() + ' from ' + toString(getKClassFromExpression(this.body_1)));
              this.set_state_rjd8d0_k$(1);
              suspendResult = this.$this$intercept_1.proceedWith_i5skhv_k$(this.content1__1, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.set_state_rjd8d0_k$(2);
              continue $sm;
            }

          case 1:
            this.set_state_rjd8d0_k$(2);
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
  protoOf(defaultTransformers$slambda).create_l3tkcm_k$ = function ($this$intercept, body, completion) {
    var i = new defaultTransformers$slambda(completion);
    i.$this$intercept_1 = $this$intercept;
    i.body_1 = body;
    return i;
  };
  function defaultTransformers$slambda_0(resultContinuation) {
    var i = new defaultTransformers$slambda(resultContinuation);
    var l = function ($this$intercept, body, $completion) {
      return i.invoke_wpcgmu_k$($this$intercept, body, $completion);
    };
    l.$arity = 2;
    return l;
  }
  function defaultTransformers$slambda$slambda($body, $response, resultContinuation) {
    this.$body_1 = $body;
    this.$response_1 = $response;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(defaultTransformers$slambda$slambda).invoke_86bb4c_k$ = function ($this$writer, $completion) {
    var tmp = this.create_fmjhmg_k$($this$writer, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(defaultTransformers$slambda$slambda).invoke_qns8j1_k$ = function (p1, $completion) {
    return this.invoke_86bb4c_k$(p1 instanceof WriterScope ? p1 : THROW_CCE(), $completion);
  };
  protoOf(defaultTransformers$slambda$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(3);
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = copyTo(this.$body_1, this.$this$writer_1.get_channel_dhi7tm_k$(), new Long(-1, 2147483647), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.TRY_RESULT0__1 = suspendResult;
            this.set_exceptionState_fex74n_k$(3);
            this.set_state_rjd8d0_k$(4);
            continue $sm;
          case 2:
            this.set_exceptionState_fex74n_k$(3);
            var tmp_0 = this.get_exception_x0n6w6_k$();
            if (tmp_0 instanceof CancellationException) {
              var cause = this.get_exception_x0n6w6_k$();
              var tmp_1 = this;
              cancel(this.$response_1, cause);
              throw cause;
            } else {
              var tmp_2 = this.get_exception_x0n6w6_k$();
              if (tmp_2 instanceof Error) {
                var cause_0 = this.get_exception_x0n6w6_k$();
                var tmp_3 = this;
                cancel_0(this.$response_1, 'Receive failed', cause_0);
                throw cause_0;
              } else {
                throw this.get_exception_x0n6w6_k$();
              }
            }

          case 3:
            throw this.get_exception_x0n6w6_k$();
          case 4:
            this.set_exceptionState_fex74n_k$(3);
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
  protoOf(defaultTransformers$slambda$slambda).create_fmjhmg_k$ = function ($this$writer, completion) {
    var i = new defaultTransformers$slambda$slambda(this.$body_1, this.$response_1, completion);
    i.$this$writer_1 = $this$writer;
    return i;
  };
  protoOf(defaultTransformers$slambda$slambda).create_wyq9v6_k$ = function (value, completion) {
    return this.create_fmjhmg_k$(value instanceof WriterScope ? value : THROW_CCE(), completion);
  };
  function defaultTransformers$slambda$slambda_0($body, $response, resultContinuation) {
    var i = new defaultTransformers$slambda$slambda($body, $response, resultContinuation);
    var l = function ($this$writer, $completion) {
      return i.invoke_86bb4c_k$($this$writer, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function defaultTransformers$slambda$lambda($responseJobHolder) {
    return function () {
      $responseJobHolder.complete_9ww6vb_k$();
      return Unit_getInstance();
    };
  }
  function defaultTransformers$slambda_1($this_defaultTransformers, resultContinuation) {
    this.$this_defaultTransformers_1 = $this_defaultTransformers;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(defaultTransformers$slambda_1).invoke_b1ivo5_k$ = function ($this$intercept, _destruct__k2r9zo, $completion) {
    var tmp = this.create_aalyq9_k$($this$intercept, _destruct__k2r9zo, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(defaultTransformers$slambda_1).invoke_4tzzq6_k$ = function (p1, p2, $completion) {
    var tmp = p1 instanceof PipelineContext ? p1 : THROW_CCE();
    return this.invoke_b1ivo5_k$(tmp, p2 instanceof HttpResponseContainer ? p2 : THROW_CCE(), $completion);
  };
  protoOf(defaultTransformers$slambda_1).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(11);
            this.info0__1 = this._destruct__k2r9zo_1.component1_7eebsc_k$();
            this.body1__1 = this._destruct__k2r9zo_1.component2_7eebsb_k$();
            var tmp_0 = this.body1__1;
            if (!isInterface(tmp_0, ByteReadChannel))
              return Unit_getInstance();
            this.response2__1 = this.$this$intercept_1.get_context_h02k06_k$().get_response_xlk07e_k$();
            this.tmp0_subject3__1 = this.info0__1.get_type_wovaf7_k$();
            if (this.tmp0_subject3__1.equals(getKClass(Unit))) {
              cancel_1(this.body1__1);
              this.set_state_rjd8d0_k$(9);
              suspendResult = this.$this$intercept_1.proceedWith_i5skhv_k$(new HttpResponseContainer(this.info0__1, Unit_getInstance()), this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              if (this.tmp0_subject3__1.equals(PrimitiveClasses_getInstance().get_intClass_mw4y9a_k$())) {
                this.set_state_rjd8d0_k$(7);
                suspendResult = readRemaining(this.body1__1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }
                continue $sm;
              } else {
                if (this.tmp0_subject3__1.equals(getKClass(Source)) || this.tmp0_subject3__1.equals(getKClass(Source))) {
                  this.set_state_rjd8d0_k$(5);
                  suspendResult = readRemaining(this.body1__1, this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  if (this.tmp0_subject3__1.equals(PrimitiveClasses_getInstance().get_byteArrayClass_57my8g_k$())) {
                    this.set_state_rjd8d0_k$(3);
                    suspendResult = toByteArray(this.body1__1, this);
                    if (suspendResult === get_COROUTINE_SUSPENDED()) {
                      return suspendResult;
                    }
                    continue $sm;
                  } else {
                    if (this.tmp0_subject3__1.equals(getKClass(ByteReadChannel))) {
                      this.responseJobHolder5__1 = Job(this.response2__1.get_coroutineContext_115oqo_k$().get_y2st91_k$(Key_getInstance()));
                      var tmp_1 = this;
                      var tmp_2 = this.$this_defaultTransformers_1.get_coroutineContext_115oqo_k$();
                      var this_0 = writer(this.$this$intercept_1, tmp_2, VOID, defaultTransformers$slambda$slambda_0(this.body1__1, this.response2__1, null));
                      invokeOnCompletion(this_0, defaultTransformers$slambda$lambda(this.responseJobHolder5__1));
                      tmp_1.channel6__1 = this_0.get_channel_dhi7tm_k$();
                      this.set_state_rjd8d0_k$(2);
                      suspendResult = this.$this$intercept_1.proceedWith_i5skhv_k$(new HttpResponseContainer(this.info0__1, this.channel6__1), this);
                      if (suspendResult === get_COROUTINE_SUSPENDED()) {
                        return suspendResult;
                      }
                      continue $sm;
                    } else {
                      if (this.tmp0_subject3__1.equals(getKClass(HttpStatusCode))) {
                        cancel_1(this.body1__1);
                        this.set_state_rjd8d0_k$(1);
                        suspendResult = this.$this$intercept_1.proceedWith_i5skhv_k$(new HttpResponseContainer(this.info0__1, this.response2__1.get_status_jnf6d7_k$()), this);
                        if (suspendResult === get_COROUTINE_SUSPENDED()) {
                          return suspendResult;
                        }
                        continue $sm;
                      } else {
                        this.WHEN_RESULT4__1 = null;
                        this.set_state_rjd8d0_k$(10);
                        continue $sm;
                      }
                    }
                  }
                }
              }
            }

          case 1:
            this.WHEN_RESULT4__1 = suspendResult;
            this.set_state_rjd8d0_k$(10);
            continue $sm;
          case 2:
            this.WHEN_RESULT4__1 = suspendResult;
            this.set_state_rjd8d0_k$(10);
            continue $sm;
          case 3:
            this.bytes7__1 = suspendResult;
            this.contentLength8__1 = contentLength(this.$this$intercept_1.get_context_h02k06_k$().get_response_xlk07e_k$());
            if (!this.$this$intercept_1.get_context_h02k06_k$().get_request_jdwg4m_k$().get_method_gl8esq_k$().equals(Companion_getInstance().get_Head_wo2rt5_k$())) {
              checkContentLength_0(this.contentLength8__1, toLong(this.bytes7__1.length));
            }

            this.set_state_rjd8d0_k$(4);
            suspendResult = this.$this$intercept_1.proceedWith_i5skhv_k$(new HttpResponseContainer(this.info0__1, this.bytes7__1), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 4:
            this.WHEN_RESULT4__1 = suspendResult;
            this.set_state_rjd8d0_k$(10);
            continue $sm;
          case 5:
            this.ARGUMENT9__1 = suspendResult;
            this.ARGUMENT10__1 = new HttpResponseContainer(this.info0__1, this.ARGUMENT9__1);
            this.set_state_rjd8d0_k$(6);
            suspendResult = this.$this$intercept_1.proceedWith_i5skhv_k$(this.ARGUMENT10__1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 6:
            this.WHEN_RESULT4__1 = suspendResult;
            this.set_state_rjd8d0_k$(10);
            continue $sm;
          case 7:
            this.ARGUMENT11__1 = suspendResult;
            this.ARGUMENT12__1 = readText(this.ARGUMENT11__1);
            this.ARGUMENT13__1 = toInt(this.ARGUMENT12__1);
            this.ARGUMENT14__1 = new HttpResponseContainer(this.info0__1, this.ARGUMENT13__1);
            this.set_state_rjd8d0_k$(8);
            suspendResult = this.$this$intercept_1.proceedWith_i5skhv_k$(this.ARGUMENT14__1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 8:
            this.WHEN_RESULT4__1 = suspendResult;
            this.set_state_rjd8d0_k$(10);
            continue $sm;
          case 9:
            this.WHEN_RESULT4__1 = suspendResult;
            this.set_state_rjd8d0_k$(10);
            continue $sm;
          case 10:
            var result = this.WHEN_RESULT4__1;
            if (!(result == null)) {
              get_LOGGER_1().trace_fti9bv_k$('Transformed with default transformers response body ' + ('for ' + this.$this$intercept_1.get_context_h02k06_k$().get_request_jdwg4m_k$().get_url_18iuii_k$().toString() + ' to ' + toString(this.info0__1.get_type_wovaf7_k$())));
            }

            return Unit_getInstance();
          case 11:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 11) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  protoOf(defaultTransformers$slambda_1).create_aalyq9_k$ = function ($this$intercept, _destruct__k2r9zo, completion) {
    var i = new defaultTransformers$slambda_1(this.$this_defaultTransformers_1, completion);
    i.$this$intercept_1 = $this$intercept;
    i._destruct__k2r9zo_1 = _destruct__k2r9zo;
    return i;
  };
  function defaultTransformers$slambda_2($this_defaultTransformers, resultContinuation) {
    var i = new defaultTransformers$slambda_1($this_defaultTransformers, resultContinuation);
    var l = function ($this$intercept, _destruct__k2r9zo, $completion) {
      return i.invoke_b1ivo5_k$($this$intercept, _destruct__k2r9zo, $completion);
    };
    l.$arity = 2;
    return l;
  }
  var properties_initialized_DefaultTransform_kt_ossax9;
  function _init_properties_DefaultTransform_kt__20knxx() {
    if (!properties_initialized_DefaultTransform_kt_ossax9) {
      properties_initialized_DefaultTransform_kt_ossax9 = true;
      LOGGER_1 = KtorSimpleLogger('io.ktor.client.plugins.defaultTransformers');
    }
  }
  function get_SKIP_SAVE_BODY() {
    _init_properties_DoubleReceivePlugin_kt__8jv4hf();
    return SKIP_SAVE_BODY;
  }
  var SKIP_SAVE_BODY;
  function get_RESPONSE_BODY_SAVED() {
    _init_properties_DoubleReceivePlugin_kt__8jv4hf();
    return RESPONSE_BODY_SAVED;
  }
  var RESPONSE_BODY_SAVED;
  function get_SaveBodyPlugin() {
    _init_properties_DoubleReceivePlugin_kt__8jv4hf();
    return SaveBodyPlugin;
  }
  var SaveBodyPlugin;
  function SaveBodyPluginConfig() {
    this.disabled_1 = false;
  }
  protoOf(SaveBodyPluginConfig).set_disabled_rhu918_k$ = function (_set____db54di) {
    this.disabled_1 = _set____db54di;
  };
  protoOf(SaveBodyPluginConfig).get_disabled_rbmjej_k$ = function () {
    return this.disabled_1;
  };
  function get_isSaved(_this__u8e3s4) {
    _init_properties_DoubleReceivePlugin_kt__8jv4hf();
    return _this__u8e3s4.get_call_wojxrb_k$().get_attributes_dgqof4_k$().contains_du0289_k$(get_RESPONSE_BODY_SAVED());
  }
  function skipSavingBody(_this__u8e3s4) {
    _init_properties_DoubleReceivePlugin_kt__8jv4hf();
    _this__u8e3s4.get_attributes_dgqof4_k$().put_gkntno_k$(get_SKIP_SAVE_BODY(), Unit_getInstance());
  }
  function SaveBodyPluginConfig$_init_$ref_lwjaof() {
    var l = function () {
      return new SaveBodyPluginConfig();
    };
    l.callableName = '<init>';
    return l;
  }
  function SaveBodyPlugin$lambda($this$createClientPlugin) {
    _init_properties_DoubleReceivePlugin_kt__8jv4hf();
    var disabled = $this$createClientPlugin.get_pluginConfig_p50bdq_k$().disabled_1;
    var tmp = $this$createClientPlugin.get_client_byfnx0_k$().get_receivePipeline_3qwhq4_k$();
    var tmp_0 = Phases_getInstance_1().get_Before_3ry4pk_k$();
    tmp.intercept_k21bv3_k$(tmp_0, SaveBodyPlugin$lambda$slambda_0(disabled, null));
    return Unit_getInstance();
  }
  function SaveBodyPlugin$lambda$slambda$lambda($bodyReplay) {
    return function () {
      return $bodyReplay.replay_fge42h_k$();
    };
  }
  function SaveBodyPlugin$lambda$slambda($disabled, resultContinuation) {
    this.$disabled_1 = $disabled;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(SaveBodyPlugin$lambda$slambda).invoke_djztfu_k$ = function ($this$intercept, response, $completion) {
    var tmp = this.create_sxpl8e_k$($this$intercept, response, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(SaveBodyPlugin$lambda$slambda).invoke_4tzzq6_k$ = function (p1, p2, $completion) {
    var tmp = p1 instanceof PipelineContext ? p1 : THROW_CCE();
    return this.invoke_djztfu_k$(tmp, p2 instanceof HttpResponse ? p2 : THROW_CCE(), $completion);
  };
  protoOf(SaveBodyPlugin$lambda$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            if (this.$disabled_1)
              return Unit_getInstance();
            this.attributes0__1 = this.response_1.get_call_wojxrb_k$().get_attributes_dgqof4_k$();
            if (this.attributes0__1.contains_du0289_k$(get_SKIP_SAVE_BODY()))
              return Unit_getInstance();
            this.bodyReplay1__1 = new ByteChannelReplay(this.response_1.get_rawContent_u3f8li_k$());
            var tmp_0 = this;
            var tmp_1 = this.response_1.get_call_wojxrb_k$();
            tmp_0.call2__1 = wrapWithContent_0(tmp_1, SaveBodyPlugin$lambda$slambda$lambda(this.bodyReplay1__1));
            this.call2__1.get_attributes_dgqof4_k$().put_gkntno_k$(get_RESPONSE_BODY_SAVED(), Unit_getInstance());
            this.set_state_rjd8d0_k$(1);
            suspendResult = this.$this$intercept_1.proceedWith_i5skhv_k$(this.call2__1.get_response_xlk07e_k$(), this);
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
  protoOf(SaveBodyPlugin$lambda$slambda).create_sxpl8e_k$ = function ($this$intercept, response, completion) {
    var i = new SaveBodyPlugin$lambda$slambda(this.$disabled_1, completion);
    i.$this$intercept_1 = $this$intercept;
    i.response_1 = response;
    return i;
  };
  function SaveBodyPlugin$lambda$slambda_0($disabled, resultContinuation) {
    var i = new SaveBodyPlugin$lambda$slambda($disabled, resultContinuation);
    var l = function ($this$intercept, response, $completion) {
      return i.invoke_djztfu_k$($this$intercept, response, $completion);
    };
    l.$arity = 2;
    return l;
  }
  var properties_initialized_DoubleReceivePlugin_kt_p63y2z;
  function _init_properties_DoubleReceivePlugin_kt__8jv4hf() {
    if (!properties_initialized_DoubleReceivePlugin_kt_p63y2z) {
      properties_initialized_DoubleReceivePlugin_kt_p63y2z = true;
      // Inline function 'io.ktor.util.AttributeKey' call
      var name = 'SkipSaveBody';
      // Inline function 'io.ktor.util.reflect.typeInfo' call
      var tmp = getKClass(Unit);
      // Inline function 'io.ktor.util.reflect.typeOfOrNull' call
      var tmp_0;
      try {
        tmp_0 = createKType(getKClass(Unit), arrayOf([]), false);
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
      SKIP_SAVE_BODY = new AttributeKey(name, tmp$ret$1);
      // Inline function 'io.ktor.util.AttributeKey' call
      var name_0 = 'ResponseBodySaved';
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
      RESPONSE_BODY_SAVED = new AttributeKey(name_0, tmp$ret$1_0);
      var tmp_5 = SaveBodyPluginConfig$_init_$ref_lwjaof();
      SaveBodyPlugin = createClientPlugin_0('DoubleReceivePlugin', tmp_5, SaveBodyPlugin$lambda);
    }
  }
  function get_LOGGER_2() {
    _init_properties_HttpCallValidator_kt__r6yh2y();
    return LOGGER_2;
  }
  var LOGGER_2;
  function get_HttpCallValidator() {
    _init_properties_HttpCallValidator_kt__r6yh2y();
    return HttpCallValidator;
  }
  var HttpCallValidator;
  function get_ExpectSuccessAttributeKey() {
    _init_properties_HttpCallValidator_kt__r6yh2y();
    return ExpectSuccessAttributeKey;
  }
  var ExpectSuccessAttributeKey;
  function HttpCallValidatorConfig() {
    var tmp = this;
    // Inline function 'kotlin.collections.mutableListOf' call
    tmp.responseValidators_1 = ArrayList_init_$Create$();
    var tmp_0 = this;
    // Inline function 'kotlin.collections.mutableListOf' call
    tmp_0.responseExceptionHandlers_1 = ArrayList_init_$Create$();
    this.expectSuccess_1 = true;
  }
  protoOf(HttpCallValidatorConfig).get_responseValidators_4amegy_k$ = function () {
    return this.responseValidators_1;
  };
  protoOf(HttpCallValidatorConfig).get_responseExceptionHandlers_n6abq9_k$ = function () {
    return this.responseExceptionHandlers_1;
  };
  protoOf(HttpCallValidatorConfig).set_expectSuccess_avm9m3_k$ = function (_set____db54di) {
    this.expectSuccess_1 = _set____db54di;
  };
  protoOf(HttpCallValidatorConfig).get_expectSuccess_1iuktw_k$ = function () {
    return this.expectSuccess_1;
  };
  protoOf(HttpCallValidatorConfig).handleResponseException_g897fa_k$ = function (block) {
    var tmp0 = this.responseExceptionHandlers_1;
    // Inline function 'kotlin.collections.plusAssign' call
    var element = new RequestExceptionHandlerWrapper(block);
    tmp0.add_utx5q5_k$(element);
  };
  protoOf(HttpCallValidatorConfig).handleResponseExceptionWithRequest_fvh9yx_k$ = function (block) {
    var tmp0 = this.responseExceptionHandlers_1;
    // Inline function 'kotlin.collections.plusAssign' call
    var element = new RequestExceptionHandlerWrapper(block);
    tmp0.add_utx5q5_k$(element);
  };
  protoOf(HttpCallValidatorConfig).validateResponse_cfyktb_k$ = function (block) {
    // Inline function 'kotlin.collections.plusAssign' call
    this.responseValidators_1.add_utx5q5_k$(block);
  };
  function HandlerWrapper() {
  }
  function ExceptionHandlerWrapper(handler) {
    this.handler_1 = handler;
  }
  protoOf(ExceptionHandlerWrapper).get_handler_cq14kh_k$ = function () {
    return this.handler_1;
  };
  function RequestExceptionHandlerWrapper(handler) {
    this.handler_1 = handler;
  }
  protoOf(RequestExceptionHandlerWrapper).get_handler_cq14kh_k$ = function () {
    return this.handler_1;
  };
  function RequestError$install$slambda($handler, resultContinuation) {
    this.$handler_1 = $handler;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(RequestError$install$slambda).invoke_wpcgmu_k$ = function ($this$intercept, it, $completion) {
    var tmp = this.create_l3tkcm_k$($this$intercept, it, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(RequestError$install$slambda).invoke_4tzzq6_k$ = function (p1, p2, $completion) {
    var tmp = p1 instanceof PipelineContext ? p1 : THROW_CCE();
    return this.invoke_wpcgmu_k$(tmp, !(p2 == null) ? p2 : THROW_CCE(), $completion);
  };
  protoOf(RequestError$install$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(5);
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = this.$this$intercept_1.proceed_tynop7_k$(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.TRY_RESULT0__1 = suspendResult;
            this.set_exceptionState_fex74n_k$(5);
            this.set_state_rjd8d0_k$(4);
            continue $sm;
          case 2:
            this.set_exceptionState_fex74n_k$(5);
            var tmp_0 = this.get_exception_x0n6w6_k$();
            if (tmp_0 instanceof Error) {
              this.cause1__1 = this.get_exception_x0n6w6_k$();
              this.set_state_rjd8d0_k$(3);
              suspendResult = this.$handler_1(HttpRequest(this.$this$intercept_1.get_context_h02k06_k$()), this.cause1__1, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              throw this.get_exception_x0n6w6_k$();
            }

          case 3:
            var error = suspendResult;
            var tmp_1 = this;
            if (!(error == null))
              throw error;
            tmp_1.TRY_RESULT0__1 = Unit_getInstance();
            this.set_state_rjd8d0_k$(4);
            continue $sm;
          case 4:
            this.set_exceptionState_fex74n_k$(5);
            return Unit_getInstance();
          case 5:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 5) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  protoOf(RequestError$install$slambda).create_l3tkcm_k$ = function ($this$intercept, it, completion) {
    var i = new RequestError$install$slambda(this.$handler_1, completion);
    i.$this$intercept_1 = $this$intercept;
    i.it_1 = it;
    return i;
  };
  function RequestError$install$slambda_0($handler, resultContinuation) {
    var i = new RequestError$install$slambda($handler, resultContinuation);
    var l = function ($this$intercept, it, $completion) {
      return i.invoke_wpcgmu_k$($this$intercept, it, $completion);
    };
    l.$arity = 2;
    return l;
  }
  function RequestError() {
    RequestError_instance = this;
  }
  protoOf(RequestError).install_pd6zl2_k$ = function (client, handler) {
    var tmp = client.get_requestPipeline_5d9z6w_k$();
    var tmp_0 = Phases_getInstance().get_Before_3ry4pk_k$();
    tmp.intercept_k21bv3_k$(tmp_0, RequestError$install$slambda_0(handler, null));
  };
  protoOf(RequestError).install_o8nink_k$ = function (client, handler) {
    return this.install_pd6zl2_k$(client, (!(handler == null) ? isSuspendFunction(handler, 2) : false) ? handler : THROW_CCE());
  };
  var RequestError_instance;
  function RequestError_getInstance() {
    if (RequestError_instance == null)
      new RequestError();
    return RequestError_instance;
  }
  function ReceiveError$install$slambda($handler, resultContinuation) {
    this.$handler_1 = $handler;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(ReceiveError$install$slambda).invoke_b1ivo5_k$ = function ($this$intercept, it, $completion) {
    var tmp = this.create_aalyq9_k$($this$intercept, it, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(ReceiveError$install$slambda).invoke_4tzzq6_k$ = function (p1, p2, $completion) {
    var tmp = p1 instanceof PipelineContext ? p1 : THROW_CCE();
    return this.invoke_b1ivo5_k$(tmp, p2 instanceof HttpResponseContainer ? p2 : THROW_CCE(), $completion);
  };
  protoOf(ReceiveError$install$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(5);
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = this.$this$intercept_1.proceed_tynop7_k$(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.TRY_RESULT0__1 = suspendResult;
            this.set_exceptionState_fex74n_k$(5);
            this.set_state_rjd8d0_k$(4);
            continue $sm;
          case 2:
            this.set_exceptionState_fex74n_k$(5);
            var tmp_0 = this.get_exception_x0n6w6_k$();
            if (tmp_0 instanceof Error) {
              this.cause1__1 = this.get_exception_x0n6w6_k$();
              this.set_state_rjd8d0_k$(3);
              suspendResult = this.$handler_1(this.$this$intercept_1.get_context_h02k06_k$().get_request_jdwg4m_k$(), this.cause1__1, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              throw this.get_exception_x0n6w6_k$();
            }

          case 3:
            var error = suspendResult;
            var tmp_1 = this;
            if (!(error == null))
              throw error;
            tmp_1.TRY_RESULT0__1 = Unit_getInstance();
            this.set_state_rjd8d0_k$(4);
            continue $sm;
          case 4:
            this.set_exceptionState_fex74n_k$(5);
            return Unit_getInstance();
          case 5:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 5) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  protoOf(ReceiveError$install$slambda).create_aalyq9_k$ = function ($this$intercept, it, completion) {
    var i = new ReceiveError$install$slambda(this.$handler_1, completion);
    i.$this$intercept_1 = $this$intercept;
    i.it_1 = it;
    return i;
  };
  function ReceiveError$install$slambda_0($handler, resultContinuation) {
    var i = new ReceiveError$install$slambda($handler, resultContinuation);
    var l = function ($this$intercept, it, $completion) {
      return i.invoke_b1ivo5_k$($this$intercept, it, $completion);
    };
    l.$arity = 2;
    return l;
  }
  function ReceiveError() {
    ReceiveError_instance = this;
  }
  protoOf(ReceiveError).install_pd6zl2_k$ = function (client, handler) {
    var BeforeReceive = new PipelinePhase('BeforeReceive');
    client.get_responsePipeline_xbi790_k$().insertPhaseBefore_rj4han_k$(Phases_getInstance_2().get_Receive_oc3k86_k$(), BeforeReceive);
    var tmp = client.get_responsePipeline_xbi790_k$();
    tmp.intercept_k21bv3_k$(BeforeReceive, ReceiveError$install$slambda_0(handler, null));
  };
  protoOf(ReceiveError).install_o8nink_k$ = function (client, handler) {
    return this.install_pd6zl2_k$(client, (!(handler == null) ? isSuspendFunction(handler, 2) : false) ? handler : THROW_CCE());
  };
  var ReceiveError_instance;
  function ReceiveError_getInstance() {
    if (ReceiveError_instance == null)
      new ReceiveError();
    return ReceiveError_instance;
  }
  function HttpRequest(builder) {
    _init_properties_HttpCallValidator_kt__r6yh2y();
    return new HttpRequest$1(builder);
  }
  function HttpResponseValidator(_this__u8e3s4, block) {
    _init_properties_HttpCallValidator_kt__r6yh2y();
    _this__u8e3s4.install_6m4asv_k$(get_HttpCallValidator(), block);
  }
  function HttpCallValidatorConfig$_init_$ref_m1o2g9() {
    var l = function () {
      return new HttpCallValidatorConfig();
    };
    l.callableName = '<init>';
    return l;
  }
  function HttpCallValidator$lambda($this$createClientPlugin) {
    _init_properties_HttpCallValidator_kt__r6yh2y();
    var responseValidators = reversed($this$createClientPlugin.get_pluginConfig_p50bdq_k$().responseValidators_1);
    var callExceptionHandlers = reversed($this$createClientPlugin.get_pluginConfig_p50bdq_k$().responseExceptionHandlers_1);
    var expectSuccess = $this$createClientPlugin.get_pluginConfig_p50bdq_k$().expectSuccess_1;
    var tmp = SetupRequest_getInstance();
    $this$createClientPlugin.on_z1oiz_k$(tmp, HttpCallValidator$lambda$slambda_0(expectSuccess, null));
    var tmp_0 = Send_getInstance();
    $this$createClientPlugin.on_z1oiz_k$(tmp_0, HttpCallValidator$lambda$slambda_2(responseValidators, null));
    var tmp_1 = RequestError_getInstance();
    $this$createClientPlugin.on_z1oiz_k$(tmp_1, HttpCallValidator$lambda$slambda_4(callExceptionHandlers, null));
    var tmp_2 = ReceiveError_getInstance();
    $this$createClientPlugin.on_z1oiz_k$(tmp_2, HttpCallValidator$lambda$slambda_6(callExceptionHandlers, null));
    return Unit_getInstance();
  }
  function invoke$validateResponse(responseValidators, response, $completion) {
    var tmp = new $invoke$validateResponseCOROUTINE$5(responseValidators, response, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  }
  function invoke$processException(callExceptionHandlers, cause, request, $completion) {
    var tmp = new $invoke$processExceptionCOROUTINE$6(callExceptionHandlers, cause, request, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  }
  function HttpCallValidator$lambda$slambda$lambda($expectSuccess) {
    return function () {
      return $expectSuccess;
    };
  }
  function HttpCallValidator$lambda$slambda($expectSuccess, resultContinuation) {
    this.$expectSuccess_1 = $expectSuccess;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(HttpCallValidator$lambda$slambda).invoke_njiaed_k$ = function (request, $completion) {
    var tmp = this.create_lj8f7z_k$(request, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(HttpCallValidator$lambda$slambda).invoke_qns8j1_k$ = function (p1, $completion) {
    return this.invoke_njiaed_k$(p1 instanceof HttpRequestBuilder ? p1 : THROW_CCE(), $completion);
  };
  protoOf(HttpCallValidator$lambda$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        if (tmp === 0) {
          this.set_exceptionState_fex74n_k$(1);
          var tmp_0 = this.request_1.get_attributes_dgqof4_k$();
          var tmp_1 = get_ExpectSuccessAttributeKey();
          tmp_0.computeIfAbsent_c4qp5i_k$(tmp_1, HttpCallValidator$lambda$slambda$lambda(this.$expectSuccess_1));
          return Unit_getInstance();
        } else if (tmp === 1) {
          throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        throw e;
      }
     while (true);
  };
  protoOf(HttpCallValidator$lambda$slambda).create_lj8f7z_k$ = function (request, completion) {
    var i = new HttpCallValidator$lambda$slambda(this.$expectSuccess_1, completion);
    i.request_1 = request;
    return i;
  };
  protoOf(HttpCallValidator$lambda$slambda).create_wyq9v6_k$ = function (value, completion) {
    return this.create_lj8f7z_k$(value instanceof HttpRequestBuilder ? value : THROW_CCE(), completion);
  };
  function HttpCallValidator$lambda$slambda_0($expectSuccess, resultContinuation) {
    var i = new HttpCallValidator$lambda$slambda($expectSuccess, resultContinuation);
    var l = function (request, $completion) {
      return i.invoke_njiaed_k$(request, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function HttpCallValidator$lambda$slambda_1($responseValidators, resultContinuation) {
    this.$responseValidators_1 = $responseValidators;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(HttpCallValidator$lambda$slambda_1).invoke_utn3hl_k$ = function ($this$on, request, $completion) {
    var tmp = this.create_xzj40p_k$($this$on, request, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(HttpCallValidator$lambda$slambda_1).invoke_4tzzq6_k$ = function (p1, p2, $completion) {
    var tmp = p1 instanceof Sender_0 ? p1 : THROW_CCE();
    return this.invoke_utn3hl_k$(tmp, p2 instanceof HttpRequestBuilder ? p2 : THROW_CCE(), $completion);
  };
  protoOf(HttpCallValidator$lambda$slambda_1).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(3);
            this.set_state_rjd8d0_k$(1);
            suspendResult = this.$this$on_1.proceed_xu9ptb_k$(this.request_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.call0__1 = suspendResult;
            this.set_state_rjd8d0_k$(2);
            suspendResult = invoke$validateResponse(this.$responseValidators_1, this.call0__1.get_response_xlk07e_k$(), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            return this.call0__1;
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
  protoOf(HttpCallValidator$lambda$slambda_1).create_xzj40p_k$ = function ($this$on, request, completion) {
    var i = new HttpCallValidator$lambda$slambda_1(this.$responseValidators_1, completion);
    i.$this$on_1 = $this$on;
    i.request_1 = request;
    return i;
  };
  function HttpCallValidator$lambda$slambda_2($responseValidators, resultContinuation) {
    var i = new HttpCallValidator$lambda$slambda_1($responseValidators, resultContinuation);
    var l = function ($this$on, request, $completion) {
      return i.invoke_utn3hl_k$($this$on, request, $completion);
    };
    l.$arity = 2;
    return l;
  }
  function HttpCallValidator$lambda$slambda_3($callExceptionHandlers, resultContinuation) {
    this.$callExceptionHandlers_1 = $callExceptionHandlers;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(HttpCallValidator$lambda$slambda_3).invoke_q680u2_k$ = function (request, cause, $completion) {
    var tmp = this.create_kqynkc_k$(request, cause, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(HttpCallValidator$lambda$slambda_3).invoke_4tzzq6_k$ = function (p1, p2, $completion) {
    var tmp = (!(p1 == null) ? isInterface(p1, HttpRequest_0) : false) ? p1 : THROW_CCE();
    return this.invoke_q680u2_k$(tmp, p2 instanceof Error ? p2 : THROW_CCE(), $completion);
  };
  protoOf(HttpCallValidator$lambda$slambda_3).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.unwrappedCause0__1 = unwrapCancellationException(this.cause_1);
            this.set_state_rjd8d0_k$(1);
            suspendResult = invoke$processException(this.$callExceptionHandlers_1, this.unwrappedCause0__1, this.request_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            return this.unwrappedCause0__1;
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
  protoOf(HttpCallValidator$lambda$slambda_3).create_kqynkc_k$ = function (request, cause, completion) {
    var i = new HttpCallValidator$lambda$slambda_3(this.$callExceptionHandlers_1, completion);
    i.request_1 = request;
    i.cause_1 = cause;
    return i;
  };
  function HttpCallValidator$lambda$slambda_4($callExceptionHandlers, resultContinuation) {
    var i = new HttpCallValidator$lambda$slambda_3($callExceptionHandlers, resultContinuation);
    var l = function (request, cause, $completion) {
      return i.invoke_q680u2_k$(request, cause, $completion);
    };
    l.$arity = 2;
    return l;
  }
  function HttpCallValidator$lambda$slambda_5($callExceptionHandlers, resultContinuation) {
    this.$callExceptionHandlers_1 = $callExceptionHandlers;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(HttpCallValidator$lambda$slambda_5).invoke_q680u2_k$ = function (request, cause, $completion) {
    var tmp = this.create_kqynkc_k$(request, cause, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(HttpCallValidator$lambda$slambda_5).invoke_4tzzq6_k$ = function (p1, p2, $completion) {
    var tmp = (!(p1 == null) ? isInterface(p1, HttpRequest_0) : false) ? p1 : THROW_CCE();
    return this.invoke_q680u2_k$(tmp, p2 instanceof Error ? p2 : THROW_CCE(), $completion);
  };
  protoOf(HttpCallValidator$lambda$slambda_5).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.unwrappedCause0__1 = unwrapCancellationException(this.cause_1);
            this.set_state_rjd8d0_k$(1);
            suspendResult = invoke$processException(this.$callExceptionHandlers_1, this.unwrappedCause0__1, this.request_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            return this.unwrappedCause0__1;
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
  protoOf(HttpCallValidator$lambda$slambda_5).create_kqynkc_k$ = function (request, cause, completion) {
    var i = new HttpCallValidator$lambda$slambda_5(this.$callExceptionHandlers_1, completion);
    i.request_1 = request;
    i.cause_1 = cause;
    return i;
  };
  function HttpCallValidator$lambda$slambda_6($callExceptionHandlers, resultContinuation) {
    var i = new HttpCallValidator$lambda$slambda_5($callExceptionHandlers, resultContinuation);
    var l = function (request, cause, $completion) {
      return i.invoke_q680u2_k$(request, cause, $completion);
    };
    l.$arity = 2;
    return l;
  }
  function $invoke$validateResponseCOROUTINE$5(responseValidators, response, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.responseValidators_1 = responseValidators;
    this.response_1 = response;
  }
  protoOf($invoke$validateResponseCOROUTINE$5).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(4);
            get_LOGGER_2().trace_fti9bv_k$('Validating response for request ' + this.response_1.get_call_wojxrb_k$().get_request_jdwg4m_k$().get_url_18iuii_k$().toString());
            var tmp_0 = this;
            tmp_0.tmp00__1 = this.responseValidators_1;
            this.this1__1 = this.tmp00__1;
            this._iterator_2_yqohr2__1 = this.this1__1.iterator_jk1svi_k$();
            this.set_state_rjd8d0_k$(1);
            continue $sm;
          case 1:
            if (!this._iterator_2_yqohr2__1.hasNext_bitz1p_k$()) {
              this.set_state_rjd8d0_k$(3);
              continue $sm;
            }

            this.element3__1 = this._iterator_2_yqohr2__1.next_20eer_k$();
            var tmp_1 = this;
            tmp_1.tmp14__1 = this.element3__1;
            this.it5__1 = this.tmp14__1;
            this.set_state_rjd8d0_k$(2);
            suspendResult = this.it5__1(this.response_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            this.set_state_rjd8d0_k$(1);
            continue $sm;
          case 3:
            return Unit_getInstance();
          case 4:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 4) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  function $invoke$processExceptionCOROUTINE$6(callExceptionHandlers, cause, request, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.callExceptionHandlers_1 = callExceptionHandlers;
    this.cause_1 = cause;
    this.request_1 = request;
  }
  protoOf($invoke$processExceptionCOROUTINE$6).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(6);
            get_LOGGER_2().trace_fti9bv_k$('Processing exception ' + this.cause_1.toString() + ' for request ' + this.request_1.get_url_18iuii_k$().toString());
            var tmp_0 = this;
            tmp_0.tmp00__1 = this.callExceptionHandlers_1;
            this.this1__1 = this.tmp00__1;
            this._iterator_2_yqohr2__1 = this.this1__1.iterator_jk1svi_k$();
            this.set_state_rjd8d0_k$(1);
            continue $sm;
          case 1:
            if (!this._iterator_2_yqohr2__1.hasNext_bitz1p_k$()) {
              this.set_state_rjd8d0_k$(5);
              continue $sm;
            }

            this.element3__1 = this._iterator_2_yqohr2__1.next_20eer_k$();
            var tmp_1 = this;
            tmp_1.tmp14__1 = this.element3__1;
            this.it5__1 = this.tmp14__1;
            this.tmp0_subject6__1 = this.it5__1;
            var tmp_2 = this.tmp0_subject6__1;
            if (tmp_2 instanceof ExceptionHandlerWrapper) {
              this.set_state_rjd8d0_k$(3);
              suspendResult = this.it5__1.handler_1(this.cause_1, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              var tmp_3 = this.tmp0_subject6__1;
              if (tmp_3 instanceof RequestExceptionHandlerWrapper) {
                this.set_state_rjd8d0_k$(2);
                suspendResult = this.it5__1.handler_1(this.cause_1, this.request_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }
                continue $sm;
              } else {
                noWhenBranchMatchedException();
              }
            }

            break;
          case 2:
            this.set_state_rjd8d0_k$(4);
            continue $sm;
          case 3:
            this.set_state_rjd8d0_k$(4);
            continue $sm;
          case 4:
            this.set_state_rjd8d0_k$(1);
            continue $sm;
          case 5:
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
  function HttpRequest$1($builder) {
    this.$builder_1 = $builder;
    this.method_1 = $builder.get_method_gl8esq_k$();
    this.url_1 = $builder.get_url_18iuii_k$().build_1k0s4u_k$();
    this.attributes_1 = $builder.get_attributes_dgqof4_k$();
    this.headers_1 = $builder.get_headers_ef25jx_k$().build_1k0s4u_k$();
  }
  protoOf(HttpRequest$1).get_call_wojxrb_k$ = function () {
    var message = 'Call is not initialized';
    throw IllegalStateException_init_$Create$(toString(message));
  };
  protoOf(HttpRequest$1).get_method_gl8esq_k$ = function () {
    return this.method_1;
  };
  protoOf(HttpRequest$1).get_url_18iuii_k$ = function () {
    return this.url_1;
  };
  protoOf(HttpRequest$1).get_attributes_dgqof4_k$ = function () {
    return this.attributes_1;
  };
  protoOf(HttpRequest$1).get_headers_ef25jx_k$ = function () {
    return this.headers_1;
  };
  protoOf(HttpRequest$1).get_content_h02jrk_k$ = function () {
    var tmp = this.$builder_1.get_body_wojkyz_k$();
    var tmp0_elvis_lhs = tmp instanceof OutgoingContent ? tmp : null;
    var tmp_0;
    if (tmp0_elvis_lhs == null) {
      var message = 'Content was not transformed to OutgoingContent yet. Current body is ' + toString(this.$builder_1.get_body_wojkyz_k$());
      throw IllegalStateException_init_$Create$(toString(message));
    } else {
      tmp_0 = tmp0_elvis_lhs;
    }
    return tmp_0;
  };
  var properties_initialized_HttpCallValidator_kt_xrx49w;
  function _init_properties_HttpCallValidator_kt__r6yh2y() {
    if (!properties_initialized_HttpCallValidator_kt_xrx49w) {
      properties_initialized_HttpCallValidator_kt_xrx49w = true;
      LOGGER_2 = KtorSimpleLogger('io.ktor.client.plugins.HttpCallValidator');
      var tmp = HttpCallValidatorConfig$_init_$ref_m1o2g9();
      HttpCallValidator = createClientPlugin_0('HttpResponseValidator', tmp, HttpCallValidator$lambda);
      // Inline function 'io.ktor.util.AttributeKey' call
      var name = 'ExpectSuccessAttributeKey';
      // Inline function 'io.ktor.util.reflect.typeInfo' call
      var tmp_0 = PrimitiveClasses_getInstance().get_booleanClass_d285fr_k$();
      // Inline function 'io.ktor.util.reflect.typeOfOrNull' call
      var tmp_1;
      try {
        tmp_1 = createKType(PrimitiveClasses_getInstance().get_booleanClass_d285fr_k$(), arrayOf([]), false);
      } catch ($p) {
        var tmp_2;
        if ($p instanceof Error) {
          var _unused_var__etf5q3 = $p;
          tmp_2 = null;
        } else {
          throw $p;
        }
        tmp_1 = tmp_2;
      }
      var tmp$ret$0 = tmp_1;
      var tmp$ret$1 = new TypeInfo(tmp_0, tmp$ret$0);
      ExpectSuccessAttributeKey = new AttributeKey(name, tmp$ret$1);
    }
  }
  function get_PLUGIN_INSTALLED_LIST() {
    _init_properties_HttpClientPlugin_kt__cypu1m();
    return PLUGIN_INSTALLED_LIST;
  }
  var PLUGIN_INSTALLED_LIST;
  function plugin(_this__u8e3s4, plugin) {
    _init_properties_HttpClientPlugin_kt__cypu1m();
    var tmp0_elvis_lhs = pluginOrNull(_this__u8e3s4, plugin);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throw IllegalStateException_init_$Create$('Plugin ' + toString(plugin) + ' is not installed. Consider using `install(' + plugin.get_key_18j28a_k$().toString() + ')` in client config first.');
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function HttpClientPlugin$prepare$lambda(_this__u8e3s4) {
    return Unit_getInstance();
  }
  function HttpClientPlugin() {
  }
  function pluginOrNull(_this__u8e3s4, plugin) {
    _init_properties_HttpClientPlugin_kt__cypu1m();
    var tmp0_safe_receiver = _this__u8e3s4.get_attributes_dgqof4_k$().getOrNull_6mjt1v_k$(get_PLUGIN_INSTALLED_LIST());
    return tmp0_safe_receiver == null ? null : tmp0_safe_receiver.getOrNull_6mjt1v_k$(plugin.get_key_18j28a_k$());
  }
  var properties_initialized_HttpClientPlugin_kt_p98320;
  function _init_properties_HttpClientPlugin_kt__cypu1m() {
    if (!properties_initialized_HttpClientPlugin_kt_p98320) {
      properties_initialized_HttpClientPlugin_kt_p98320 = true;
      // Inline function 'io.ktor.util.AttributeKey' call
      var name = 'ApplicationPluginRegistry';
      // Inline function 'io.ktor.util.reflect.typeInfo' call
      var tmp = getKClass(Attributes);
      // Inline function 'io.ktor.util.reflect.typeOfOrNull' call
      var tmp_0;
      try {
        tmp_0 = createKType(getKClass(Attributes), arrayOf([]), false);
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
      PLUGIN_INSTALLED_LIST = new AttributeKey(name, tmp$ret$1);
    }
  }
  function get_LOGGER_3() {
    _init_properties_HttpPlainText_kt__iy89z1();
    return LOGGER_3;
  }
  var LOGGER_3;
  function get_HttpPlainText() {
    _init_properties_HttpPlainText_kt__iy89z1();
    return HttpPlainText;
  }
  var HttpPlainText;
  function HttpPlainTextConfig() {
    var tmp = this;
    // Inline function 'kotlin.collections.mutableSetOf' call
    tmp.charsets_1 = LinkedHashSet_init_$Create$();
    var tmp_0 = this;
    // Inline function 'kotlin.collections.mutableMapOf' call
    tmp_0.charsetQuality_1 = LinkedHashMap_init_$Create$();
    this.sendCharset_1 = null;
    this.responseCharsetFallback_1 = Charsets_getInstance().get_UTF_8_ihn39z_k$();
  }
  protoOf(HttpPlainTextConfig).get_charsets_rph999_k$ = function () {
    return this.charsets_1;
  };
  protoOf(HttpPlainTextConfig).get_charsetQuality_fm3s7j_k$ = function () {
    return this.charsetQuality_1;
  };
  protoOf(HttpPlainTextConfig).register_vw4qhh_k$ = function (charset, quality) {
    if (quality == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.check' call
      if (!(0.0 <= quality ? quality <= 1.0 : false)) {
        throw IllegalStateException_init_$Create$('Check failed.');
      }
    }
    this.charsets_1.add_utx5q5_k$(charset);
    if (quality == null) {
      this.charsetQuality_1.remove_gppy8k_k$(charset);
    } else {
      // Inline function 'kotlin.collections.set' call
      this.charsetQuality_1.put_4fpzoq_k$(charset, quality);
    }
  };
  protoOf(HttpPlainTextConfig).register$default_u7cy4s_k$ = function (charset, quality, $super) {
    quality = quality === VOID ? null : quality;
    var tmp;
    if ($super === VOID) {
      this.register_vw4qhh_k$(charset, quality);
      tmp = Unit_getInstance();
    } else {
      tmp = $super.register_vw4qhh_k$.call(this, charset, quality);
    }
    return tmp;
  };
  protoOf(HttpPlainTextConfig).set_sendCharset_x5kz8v_k$ = function (_set____db54di) {
    this.sendCharset_1 = _set____db54di;
  };
  protoOf(HttpPlainTextConfig).get_sendCharset_lrd2kb_k$ = function () {
    return this.sendCharset_1;
  };
  protoOf(HttpPlainTextConfig).set_responseCharsetFallback_6qekr1_k$ = function (_set____db54di) {
    this.responseCharsetFallback_1 = _set____db54di;
  };
  protoOf(HttpPlainTextConfig).get_responseCharsetFallback_6zf8kc_k$ = function () {
    return this.responseCharsetFallback_1;
  };
  function RenderRequestHook$install$slambda($handler, resultContinuation) {
    this.$handler_1 = $handler;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(RenderRequestHook$install$slambda).invoke_wpcgmu_k$ = function ($this$intercept, content, $completion) {
    var tmp = this.create_l3tkcm_k$($this$intercept, content, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(RenderRequestHook$install$slambda).invoke_4tzzq6_k$ = function (p1, p2, $completion) {
    var tmp = p1 instanceof PipelineContext ? p1 : THROW_CCE();
    return this.invoke_wpcgmu_k$(tmp, !(p2 == null) ? p2 : THROW_CCE(), $completion);
  };
  protoOf(RenderRequestHook$install$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(4);
            this.set_state_rjd8d0_k$(1);
            suspendResult = this.$handler_1(this.$this$intercept_1.get_context_h02k06_k$(), this.content_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.result0__1 = suspendResult;
            if (!(this.result0__1 == null)) {
              this.set_state_rjd8d0_k$(2);
              suspendResult = this.$this$intercept_1.proceedWith_i5skhv_k$(this.result0__1, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.set_state_rjd8d0_k$(3);
              continue $sm;
            }

          case 2:
            this.set_state_rjd8d0_k$(3);
            continue $sm;
          case 3:
            return Unit_getInstance();
          case 4:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 4) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  protoOf(RenderRequestHook$install$slambda).create_l3tkcm_k$ = function ($this$intercept, content, completion) {
    var i = new RenderRequestHook$install$slambda(this.$handler_1, completion);
    i.$this$intercept_1 = $this$intercept;
    i.content_1 = content;
    return i;
  };
  function RenderRequestHook$install$slambda_0($handler, resultContinuation) {
    var i = new RenderRequestHook$install$slambda($handler, resultContinuation);
    var l = function ($this$intercept, content, $completion) {
      return i.invoke_wpcgmu_k$($this$intercept, content, $completion);
    };
    l.$arity = 2;
    return l;
  }
  function RenderRequestHook() {
    RenderRequestHook_instance = this;
  }
  protoOf(RenderRequestHook).install_qm9ric_k$ = function (client, handler) {
    var tmp = client.get_requestPipeline_5d9z6w_k$();
    var tmp_0 = Phases_getInstance().get_Render_3swp1b_k$();
    tmp.intercept_k21bv3_k$(tmp_0, RenderRequestHook$install$slambda_0(handler, null));
  };
  protoOf(RenderRequestHook).install_o8nink_k$ = function (client, handler) {
    return this.install_qm9ric_k$(client, (!(handler == null) ? isSuspendFunction(handler, 2) : false) ? handler : THROW_CCE());
  };
  var RenderRequestHook_instance;
  function RenderRequestHook_getInstance() {
    if (RenderRequestHook_instance == null)
      new RenderRequestHook();
    return RenderRequestHook_instance;
  }
  function HttpPlainTextConfig$_init_$ref_isjudo() {
    var l = function () {
      return new HttpPlainTextConfig();
    };
    l.callableName = '<init>';
    return l;
  }
  function HttpPlainText$lambda($this$createClientPlugin) {
    _init_properties_HttpPlainText_kt__iy89z1();
    // Inline function 'kotlin.collections.sortedByDescending' call
    var this_0 = toList($this$createClientPlugin.get_pluginConfig_p50bdq_k$().charsetQuality_1);
    // Inline function 'kotlin.comparisons.compareByDescending' call
    var tmp = HttpPlainText$lambda$lambda;
    var tmp$ret$0 = new sam$kotlin_Comparator$0(tmp);
    var withQuality = sortedWith(this_0, tmp$ret$0);
    var responseCharsetFallback = $this$createClientPlugin.get_pluginConfig_p50bdq_k$().responseCharsetFallback_1;
    // Inline function 'kotlin.collections.filter' call
    var tmp0 = $this$createClientPlugin.get_pluginConfig_p50bdq_k$().charsets_1;
    // Inline function 'kotlin.collections.filterTo' call
    var destination = ArrayList_init_$Create$();
    var _iterator__ex2g4s = tmp0.iterator_jk1svi_k$();
    while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
      var element = _iterator__ex2g4s.next_20eer_k$();
      if (!$this$createClientPlugin.get_pluginConfig_p50bdq_k$().charsetQuality_1.containsKey_aw81wo_k$(element)) {
        destination.add_utx5q5_k$(element);
      }
    }
    // Inline function 'kotlin.collections.sortedBy' call
    // Inline function 'kotlin.comparisons.compareBy' call
    var tmp_0 = HttpPlainText$lambda$lambda_0;
    var tmp$ret$5 = new sam$kotlin_Comparator$0(tmp_0);
    var withoutQuality = sortedWith(destination, tmp$ret$5);
    // Inline function 'kotlin.text.buildString' call
    // Inline function 'kotlin.apply' call
    var this_1 = StringBuilder_init_$Create$();
    // Inline function 'kotlin.collections.forEach' call
    var _iterator__ex2g4s_0 = withoutQuality.iterator_jk1svi_k$();
    while (_iterator__ex2g4s_0.hasNext_bitz1p_k$()) {
      var element_0 = _iterator__ex2g4s_0.next_20eer_k$();
      // Inline function 'kotlin.text.isNotEmpty' call
      if (charSequenceLength(this_1) > 0) {
        this_1.append_22ad7x_k$(',');
      }
      this_1.append_22ad7x_k$(get_name(element_0));
    }
    // Inline function 'kotlin.collections.forEach' call
    var _iterator__ex2g4s_1 = withQuality.iterator_jk1svi_k$();
    while (_iterator__ex2g4s_1.hasNext_bitz1p_k$()) {
      var element_1 = _iterator__ex2g4s_1.next_20eer_k$();
      var charset = element_1.component1_7eebsc_k$();
      var quality = element_1.component2_7eebsb_k$();
      // Inline function 'kotlin.text.isNotEmpty' call
      if (charSequenceLength(this_1) > 0) {
        this_1.append_22ad7x_k$(',');
      }
      // Inline function 'kotlin.check' call
      if (!(0.0 <= quality ? quality <= 1.0 : false)) {
        throw IllegalStateException_init_$Create$('Check failed.');
      }
      // Inline function 'kotlin.math.roundToInt' call
      var this_2 = 100 * quality;
      var truncatedQuality = roundToInt(this_2) / 100.0;
      this_1.append_22ad7x_k$(get_name(charset) + ';q=' + truncatedQuality);
    }
    // Inline function 'kotlin.text.isEmpty' call
    if (charSequenceLength(this_1) === 0) {
      this_1.append_22ad7x_k$(get_name(responseCharsetFallback));
    }
    var acceptCharsetHeader = this_1.toString();
    var tmp0_elvis_lhs = $this$createClientPlugin.get_pluginConfig_p50bdq_k$().sendCharset_1;
    var tmp1_elvis_lhs = tmp0_elvis_lhs == null ? firstOrNull(withoutQuality) : tmp0_elvis_lhs;
    var tmp_1;
    if (tmp1_elvis_lhs == null) {
      var tmp2_safe_receiver = firstOrNull(withQuality);
      tmp_1 = tmp2_safe_receiver == null ? null : tmp2_safe_receiver.get_first_irdx8n_k$();
    } else {
      tmp_1 = tmp1_elvis_lhs;
    }
    var tmp3_elvis_lhs = tmp_1;
    var requestCharset = tmp3_elvis_lhs == null ? Charsets_getInstance().get_UTF_8_ihn39z_k$() : tmp3_elvis_lhs;
    var tmp_2 = RenderRequestHook_getInstance();
    $this$createClientPlugin.on_z1oiz_k$(tmp_2, HttpPlainText$lambda$slambda_0(acceptCharsetHeader, requestCharset, null));
    $this$createClientPlugin.transformResponseBody_ee7rr5_k$(HttpPlainText$lambda$slambda_2(responseCharsetFallback, null));
    return Unit_getInstance();
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
  function invoke$wrapContent(requestCharset, request, content, requestContentType) {
    var contentType = requestContentType == null ? Text_getInstance().get_Plain_ifc0ap_k$() : requestContentType;
    var tmp2_elvis_lhs = requestContentType == null ? null : charset(requestContentType);
    var charset_0 = tmp2_elvis_lhs == null ? requestCharset : tmp2_elvis_lhs;
    get_LOGGER_3().trace_fti9bv_k$('Sending request body to ' + request.get_url_18iuii_k$().toString() + ' as text/plain with charset ' + charset_0.toString());
    return new TextContent(content, withCharset(contentType, charset_0));
  }
  function invoke$read(responseCharsetFallback, call, body) {
    var tmp0_elvis_lhs = charset_0(call.get_response_xlk07e_k$());
    var actualCharset = tmp0_elvis_lhs == null ? responseCharsetFallback : tmp0_elvis_lhs;
    get_LOGGER_3().trace_fti9bv_k$('Reading response body for ' + call.get_request_jdwg4m_k$().get_url_18iuii_k$().toString() + ' as String with charset ' + actualCharset.toString());
    return readText_0(body, actualCharset);
  }
  function invoke$addCharsetHeaders(acceptCharsetHeader, context) {
    if (!(context.get_headers_ef25jx_k$().get_6bo4tg_k$(HttpHeaders_getInstance().get_AcceptCharset_1vf6lh_k$()) == null))
      return Unit_getInstance();
    get_LOGGER_3().trace_fti9bv_k$('Adding Accept-Charset=' + acceptCharsetHeader + ' to ' + context.get_url_18iuii_k$().toString());
    context.get_headers_ef25jx_k$().set_j87cuq_k$(HttpHeaders_getInstance().get_AcceptCharset_1vf6lh_k$(), acceptCharsetHeader);
  }
  function HttpPlainText$lambda$lambda(a, b) {
    _init_properties_HttpPlainText_kt__iy89z1();
    // Inline function 'kotlin.comparisons.compareValuesBy' call
    var tmp = b.get_second_jf7fjx_k$();
    var tmp$ret$1 = a.get_second_jf7fjx_k$();
    return compareValues(tmp, tmp$ret$1);
  }
  function HttpPlainText$lambda$lambda_0(a, b) {
    _init_properties_HttpPlainText_kt__iy89z1();
    // Inline function 'kotlin.comparisons.compareValuesBy' call
    var tmp = get_name(a);
    var tmp$ret$1 = get_name(b);
    return compareValues(tmp, tmp$ret$1);
  }
  function HttpPlainText$lambda$slambda($acceptCharsetHeader, $requestCharset, resultContinuation) {
    this.$acceptCharsetHeader_1 = $acceptCharsetHeader;
    this.$requestCharset_1 = $requestCharset;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(HttpPlainText$lambda$slambda).invoke_69zz7s_k$ = function (request, content, $completion) {
    var tmp = this.create_o0b8hb_k$(request, content, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(HttpPlainText$lambda$slambda).invoke_4tzzq6_k$ = function (p1, p2, $completion) {
    var tmp = p1 instanceof HttpRequestBuilder ? p1 : THROW_CCE();
    return this.invoke_69zz7s_k$(tmp, !(p2 == null) ? p2 : THROW_CCE(), $completion);
  };
  protoOf(HttpPlainText$lambda$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        if (tmp === 0) {
          this.set_exceptionState_fex74n_k$(1);
          invoke$addCharsetHeaders(this.$acceptCharsetHeader_1, this.request_1);
          var tmp_0 = this.content_1;
          if (!(typeof tmp_0 === 'string'))
            return null;
          var contentType_0 = contentType(this.request_1);
          if (!(contentType_0 == null) && !(contentType_0.get_contentType_7git4a_k$() === Text_getInstance().get_Plain_ifc0ap_k$().get_contentType_7git4a_k$())) {
            return null;
          }
          return invoke$wrapContent(this.$requestCharset_1, this.request_1, this.content_1, contentType_0);
        } else if (tmp === 1) {
          throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        throw e;
      }
     while (true);
  };
  protoOf(HttpPlainText$lambda$slambda).create_o0b8hb_k$ = function (request, content, completion) {
    var i = new HttpPlainText$lambda$slambda(this.$acceptCharsetHeader_1, this.$requestCharset_1, completion);
    i.request_1 = request;
    i.content_1 = content;
    return i;
  };
  function HttpPlainText$lambda$slambda_0($acceptCharsetHeader, $requestCharset, resultContinuation) {
    var i = new HttpPlainText$lambda$slambda($acceptCharsetHeader, $requestCharset, resultContinuation);
    var l = function (request, content, $completion) {
      return i.invoke_69zz7s_k$(request, content, $completion);
    };
    l.$arity = 2;
    return l;
  }
  function HttpPlainText$lambda$slambda_1($responseCharsetFallback, resultContinuation) {
    this.$responseCharsetFallback_1 = $responseCharsetFallback;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(HttpPlainText$lambda$slambda_1).invoke_nybta2_k$ = function ($this$transformResponseBody, response, content, requestedType, $completion) {
    var tmp = this.create_sqry20_k$($this$transformResponseBody, response, content, requestedType, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(HttpPlainText$lambda$slambda_1).invoke_k6wp4t_k$ = function (p1, p2, p3, p4, $completion) {
    var tmp = p1 instanceof TransformResponseBodyContext ? p1 : THROW_CCE();
    var tmp_0 = p2 instanceof HttpResponse ? p2 : THROW_CCE();
    var tmp_1 = (!(p3 == null) ? isInterface(p3, ByteReadChannel) : false) ? p3 : THROW_CCE();
    return this.invoke_nybta2_k$(tmp, tmp_0, tmp_1, p4 instanceof TypeInfo ? p4 : THROW_CCE(), $completion);
  };
  protoOf(HttpPlainText$lambda$slambda_1).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            if (!this.requestedType_1.get_type_wovaf7_k$().equals(PrimitiveClasses_getInstance().get_stringClass_bik2gy_k$()))
              return null;
            this.set_state_rjd8d0_k$(1);
            suspendResult = readRemaining(this.content_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var bodyBytes = suspendResult;
            return invoke$read(this.$responseCharsetFallback_1, this.response_1.get_call_wojxrb_k$(), bodyBytes);
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
  protoOf(HttpPlainText$lambda$slambda_1).create_sqry20_k$ = function ($this$transformResponseBody, response, content, requestedType, completion) {
    var i = new HttpPlainText$lambda$slambda_1(this.$responseCharsetFallback_1, completion);
    i.$this$transformResponseBody_1 = $this$transformResponseBody;
    i.response_1 = response;
    i.content_1 = content;
    i.requestedType_1 = requestedType;
    return i;
  };
  function HttpPlainText$lambda$slambda_2($responseCharsetFallback, resultContinuation) {
    var i = new HttpPlainText$lambda$slambda_1($responseCharsetFallback, resultContinuation);
    var l = function ($this$transformResponseBody, response, content, requestedType, $completion) {
      return i.invoke_nybta2_k$($this$transformResponseBody, response, content, requestedType, $completion);
    };
    l.$arity = 4;
    return l;
  }
  var properties_initialized_HttpPlainText_kt_2nx4ox;
  function _init_properties_HttpPlainText_kt__iy89z1() {
    if (!properties_initialized_HttpPlainText_kt_2nx4ox) {
      properties_initialized_HttpPlainText_kt_2nx4ox = true;
      LOGGER_3 = KtorSimpleLogger('io.ktor.client.plugins.HttpPlainText');
      var tmp = HttpPlainTextConfig$_init_$ref_isjudo();
      HttpPlainText = createClientPlugin_0('HttpPlainText', tmp, HttpPlainText$lambda);
    }
  }
  function get_ALLOWED_FOR_REDIRECT() {
    _init_properties_HttpRedirect_kt__ure7fo();
    return ALLOWED_FOR_REDIRECT;
  }
  var ALLOWED_FOR_REDIRECT;
  function get_LOGGER_4() {
    _init_properties_HttpRedirect_kt__ure7fo();
    return LOGGER_4;
  }
  var LOGGER_4;
  function get_HttpResponseRedirectEvent() {
    _init_properties_HttpRedirect_kt__ure7fo();
    return HttpResponseRedirectEvent;
  }
  var HttpResponseRedirectEvent;
  function get_HttpRedirect() {
    _init_properties_HttpRedirect_kt__ure7fo();
    return HttpRedirect;
  }
  var HttpRedirect;
  function HttpRedirectConfig() {
    this.checkHttpMethod_1 = true;
    this.allowHttpsDowngrade_1 = false;
  }
  protoOf(HttpRedirectConfig).set_checkHttpMethod_4itv9b_k$ = function (_set____db54di) {
    this.checkHttpMethod_1 = _set____db54di;
  };
  protoOf(HttpRedirectConfig).get_checkHttpMethod_11ale0_k$ = function () {
    return this.checkHttpMethod_1;
  };
  protoOf(HttpRedirectConfig).set_allowHttpsDowngrade_dn64qp_k$ = function (_set____db54di) {
    this.allowHttpsDowngrade_1 = _set____db54di;
  };
  protoOf(HttpRedirectConfig).get_allowHttpsDowngrade_f1e586_k$ = function () {
    return this.allowHttpsDowngrade_1;
  };
  function isRedirect(_this__u8e3s4) {
    _init_properties_HttpRedirect_kt__ure7fo();
    var tmp0_subject = _this__u8e3s4.get_value_j01efc_k$();
    return tmp0_subject === Companion_getInstance_1().get_MovedPermanently_ne29rl_k$().get_value_j01efc_k$() || tmp0_subject === Companion_getInstance_1().get_Found_i9we9l_k$().get_value_j01efc_k$() || (tmp0_subject === Companion_getInstance_1().get_TemporaryRedirect_6andz8_k$().get_value_j01efc_k$() || (tmp0_subject === Companion_getInstance_1().get_PermanentRedirect_rfldcx_k$().get_value_j01efc_k$() || tmp0_subject === Companion_getInstance_1().get_SeeOther_eo4vx6_k$().get_value_j01efc_k$())) ? true : false;
  }
  function HttpRedirectConfig$_init_$ref_rhym9t() {
    var l = function () {
      return new HttpRedirectConfig();
    };
    l.callableName = '<init>';
    return l;
  }
  function HttpRedirect$lambda($this$createClientPlugin) {
    _init_properties_HttpRedirect_kt__ure7fo();
    var checkHttpMethod = $this$createClientPlugin.get_pluginConfig_p50bdq_k$().checkHttpMethod_1;
    var allowHttpsDowngrade = $this$createClientPlugin.get_pluginConfig_p50bdq_k$().allowHttpsDowngrade_1;
    var tmp = Send_getInstance();
    $this$createClientPlugin.on_z1oiz_k$(tmp, HttpRedirect$lambda$slambda_0(checkHttpMethod, allowHttpsDowngrade, $this$createClientPlugin, null));
    return Unit_getInstance();
  }
  function invoke$handleCall(_this__u8e3s4, context, origin, allowHttpsDowngrade, client, $completion) {
    var tmp = new $invoke$handleCallCOROUTINE$7(_this__u8e3s4, context, origin, allowHttpsDowngrade, client, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  }
  function HttpRedirect$lambda$slambda($checkHttpMethod, $allowHttpsDowngrade, $this_createClientPlugin, resultContinuation) {
    this.$checkHttpMethod_1 = $checkHttpMethod;
    this.$allowHttpsDowngrade_1 = $allowHttpsDowngrade;
    this.$this_createClientPlugin_1 = $this_createClientPlugin;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(HttpRedirect$lambda$slambda).invoke_utn3hl_k$ = function ($this$on, request, $completion) {
    var tmp = this.create_xzj40p_k$($this$on, request, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(HttpRedirect$lambda$slambda).invoke_4tzzq6_k$ = function (p1, p2, $completion) {
    var tmp = p1 instanceof Sender_0 ? p1 : THROW_CCE();
    return this.invoke_utn3hl_k$(tmp, p2 instanceof HttpRequestBuilder ? p2 : THROW_CCE(), $completion);
  };
  protoOf(HttpRedirect$lambda$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(3);
            this.set_state_rjd8d0_k$(1);
            suspendResult = this.$this$on_1.proceed_xu9ptb_k$(this.request_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.origin0__1 = suspendResult;
            if (this.$checkHttpMethod_1 && !get_ALLOWED_FOR_REDIRECT().contains_aljjnj_k$(this.origin0__1.get_request_jdwg4m_k$().get_method_gl8esq_k$())) {
              return this.origin0__1;
            }

            this.set_state_rjd8d0_k$(2);
            suspendResult = invoke$handleCall(this.$this$on_1, this.request_1, this.origin0__1, this.$allowHttpsDowngrade_1, this.$this_createClientPlugin_1.get_client_byfnx0_k$(), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            return suspendResult;
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
  protoOf(HttpRedirect$lambda$slambda).create_xzj40p_k$ = function ($this$on, request, completion) {
    var i = new HttpRedirect$lambda$slambda(this.$checkHttpMethod_1, this.$allowHttpsDowngrade_1, this.$this_createClientPlugin_1, completion);
    i.$this$on_1 = $this$on;
    i.request_1 = request;
    return i;
  };
  function HttpRedirect$lambda$slambda_0($checkHttpMethod, $allowHttpsDowngrade, $this_createClientPlugin, resultContinuation) {
    var i = new HttpRedirect$lambda$slambda($checkHttpMethod, $allowHttpsDowngrade, $this_createClientPlugin, resultContinuation);
    var l = function ($this$on, request, $completion) {
      return i.invoke_utn3hl_k$($this$on, request, $completion);
    };
    l.$arity = 2;
    return l;
  }
  function $invoke$handleCallCOROUTINE$7(_this__u8e3s4, context, origin, allowHttpsDowngrade, client, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.context_1 = context;
    this.origin_1 = origin;
    this.allowHttpsDowngrade_1 = allowHttpsDowngrade;
    this.client_1 = client;
  }
  protoOf($invoke$handleCallCOROUTINE$7).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(3);
            if (!isRedirect(this.origin_1.get_response_xlk07e_k$().get_status_jnf6d7_k$()))
              return this.origin_1;
            this.call0__1 = this.origin_1;
            this.requestBuilder1__1 = this.context_1;
            this.originProtocol2__1 = this.origin_1.get_request_jdwg4m_k$().get_url_18iuii_k$().get_protocol_mv93kx_k$();
            this.originAuthority3__1 = get_authority(this.origin_1.get_request_jdwg4m_k$().get_url_18iuii_k$());
            this.set_state_rjd8d0_k$(1);
            continue $sm;
          case 1:
            if (!true) {
              this.set_state_rjd8d0_k$(4);
              continue $sm;
            }

            this.client_1.get_monitor_lpmkc1_k$().raise_3e7w7u_k$(get_HttpResponseRedirectEvent(), this.call0__1.get_response_xlk07e_k$());
            this.location4__1 = this.call0__1.get_response_xlk07e_k$().get_headers_ef25jx_k$().get_6bo4tg_k$(HttpHeaders_getInstance().get_Location_pdrq6_k$());
            get_LOGGER_4().trace_fti9bv_k$('Received redirect response to ' + this.location4__1 + ' for request ' + this.context_1.get_url_18iuii_k$().toString());
            var tmp_0 = this;
            var this_0 = new HttpRequestBuilder();
            this_0.takeFromWithExecutionContext_9qmqoi_k$(this.requestBuilder1__1);
            this_0.get_url_18iuii_k$().get_parameters_cl4rkd_k$().clear_j9egeb_k$();
            var tmp0_safe_receiver = this.location4__1;
            if (tmp0_safe_receiver == null)
              null;
            else {
              takeFrom(this_0.get_url_18iuii_k$(), tmp0_safe_receiver);
            }

            if (!this.allowHttpsDowngrade_1 && isSecure(this.originProtocol2__1) && !isSecure(this_0.get_url_18iuii_k$().get_protocol_mv93kx_k$())) {
              get_LOGGER_4().trace_fti9bv_k$('Can not redirect ' + this.context_1.get_url_18iuii_k$().toString() + ' because of security downgrade');
              return this.call0__1;
            }

            if (!(this.originAuthority3__1 === get_authority_0(this_0.get_url_18iuii_k$()))) {
              this_0.get_headers_ef25jx_k$().remove_6241ba_k$(HttpHeaders_getInstance().get_Authorization_awzxlc_k$());
              get_LOGGER_4().trace_fti9bv_k$('Removing Authorization header from redirect for ' + this.context_1.get_url_18iuii_k$().toString());
            }

            tmp_0.requestBuilder1__1 = this_0;
            this.set_state_rjd8d0_k$(2);
            suspendResult = this._this__u8e3s4__1.proceed_xu9ptb_k$(this.requestBuilder1__1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            this.call0__1 = suspendResult;
            if (!isRedirect(this.call0__1.get_response_xlk07e_k$().get_status_jnf6d7_k$()))
              return this.call0__1;
            this.set_state_rjd8d0_k$(1);
            continue $sm;
          case 3:
            throw this.get_exception_x0n6w6_k$();
          case 4:
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
  var properties_initialized_HttpRedirect_kt_klj746;
  function _init_properties_HttpRedirect_kt__ure7fo() {
    if (!properties_initialized_HttpRedirect_kt_klj746) {
      properties_initialized_HttpRedirect_kt_klj746 = true;
      ALLOWED_FOR_REDIRECT = setOf_0([Companion_getInstance().get_Get_18jsxf_k$(), Companion_getInstance().get_Head_wo2rt5_k$()]);
      LOGGER_4 = KtorSimpleLogger('io.ktor.client.plugins.HttpRedirect');
      HttpResponseRedirectEvent = new EventDefinition();
      var tmp = HttpRedirectConfig$_init_$ref_rhym9t();
      HttpRedirect = createClientPlugin_0('HttpRedirect', tmp, HttpRedirect$lambda);
    }
  }
  function get_LOGGER_5() {
    _init_properties_HttpRequestLifecycle_kt__jgkmfx();
    return LOGGER_5;
  }
  var LOGGER_5;
  function get_HttpRequestLifecycle() {
    _init_properties_HttpRequestLifecycle_kt__jgkmfx();
    return HttpRequestLifecycle;
  }
  var HttpRequestLifecycle;
  function invoke$proceed(receiver, $completion) {
    var tmp = new $invoke$proceedCOROUTINE$8(receiver, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  }
  function SetupRequestContext$install$slambda$proceed$ref($boundThis) {
    this.$boundThis_1 = $boundThis;
  }
  protoOf(SetupRequestContext$install$slambda$proceed$ref).invoke_h7udsx_k$ = function ($completion) {
    return invoke$proceed(this.$boundThis_1, $completion);
  };
  protoOf(SetupRequestContext$install$slambda$proceed$ref).invoke_ib42db_k$ = function ($completion) {
    return this.invoke_h7udsx_k$($completion);
  };
  function SetupRequestContext$install$slambda$proceed$ref_0($boundThis) {
    var i = new SetupRequestContext$install$slambda$proceed$ref($boundThis);
    var l = function ($completion) {
      return i.invoke_h7udsx_k$($completion);
    };
    l.$arity = 0;
    return l;
  }
  function $invoke$proceedCOROUTINE$8(receiver, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.receiver_1 = receiver;
  }
  protoOf($invoke$proceedCOROUTINE$8).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = this.receiver_1.proceed_tynop7_k$(this);
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
  function SetupRequestContext$install$slambda($handler, resultContinuation) {
    this.$handler_1 = $handler;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(SetupRequestContext$install$slambda).invoke_wpcgmu_k$ = function ($this$intercept, it, $completion) {
    var tmp = this.create_l3tkcm_k$($this$intercept, it, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(SetupRequestContext$install$slambda).invoke_4tzzq6_k$ = function (p1, p2, $completion) {
    var tmp = p1 instanceof PipelineContext ? p1 : THROW_CCE();
    return this.invoke_wpcgmu_k$(tmp, !(p2 == null) ? p2 : THROW_CCE(), $completion);
  };
  protoOf(SetupRequestContext$install$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            var tmp_0 = this.$this$intercept_1.get_context_h02k06_k$();
            suspendResult = this.$handler_1(tmp_0, SetupRequestContext$install$slambda$proceed$ref_0(this.$this$intercept_1), this);
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
  protoOf(SetupRequestContext$install$slambda).create_l3tkcm_k$ = function ($this$intercept, it, completion) {
    var i = new SetupRequestContext$install$slambda(this.$handler_1, completion);
    i.$this$intercept_1 = $this$intercept;
    i.it_1 = it;
    return i;
  };
  function SetupRequestContext$install$slambda_0($handler, resultContinuation) {
    var i = new SetupRequestContext$install$slambda($handler, resultContinuation);
    var l = function ($this$intercept, it, $completion) {
      return i.invoke_wpcgmu_k$($this$intercept, it, $completion);
    };
    l.$arity = 2;
    return l;
  }
  function SetupRequestContext() {
    SetupRequestContext_instance = this;
  }
  protoOf(SetupRequestContext).install_fgrwri_k$ = function (client, handler) {
    var tmp = client.get_requestPipeline_5d9z6w_k$();
    var tmp_0 = Phases_getInstance().get_Before_3ry4pk_k$();
    tmp.intercept_k21bv3_k$(tmp_0, SetupRequestContext$install$slambda_0(handler, null));
  };
  protoOf(SetupRequestContext).install_o8nink_k$ = function (client, handler) {
    return this.install_fgrwri_k$(client, (!(handler == null) ? isSuspendFunction(handler, 2) : false) ? handler : THROW_CCE());
  };
  var SetupRequestContext_instance;
  function SetupRequestContext_getInstance() {
    if (SetupRequestContext_instance == null)
      new SetupRequestContext();
    return SetupRequestContext_instance;
  }
  function attachToClientEngineJob(requestJob, clientEngineJob) {
    _init_properties_HttpRequestLifecycle_kt__jgkmfx();
    var handler = clientEngineJob.invokeOnCompletion_n6cffu_k$(attachToClientEngineJob$lambda(requestJob));
    requestJob.invokeOnCompletion_n6cffu_k$(attachToClientEngineJob$lambda_0(handler));
  }
  function HttpRequestLifecycle$lambda($this$createClientPlugin) {
    _init_properties_HttpRequestLifecycle_kt__jgkmfx();
    var tmp = SetupRequestContext_getInstance();
    $this$createClientPlugin.on_z1oiz_k$(tmp, HttpRequestLifecycle$lambda$slambda_0($this$createClientPlugin, null));
    return Unit_getInstance();
  }
  function HttpRequestLifecycle$lambda$slambda($this_createClientPlugin, resultContinuation) {
    this.$this_createClientPlugin_1 = $this_createClientPlugin;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(HttpRequestLifecycle$lambda$slambda).invoke_kyl5xv_k$ = function (request, proceed, $completion) {
    var tmp = this.create_7ewmj3_k$(request, proceed, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(HttpRequestLifecycle$lambda$slambda).invoke_4tzzq6_k$ = function (p1, p2, $completion) {
    var tmp = p1 instanceof HttpRequestBuilder ? p1 : THROW_CCE();
    return this.invoke_kyl5xv_k$(tmp, (!(p2 == null) ? isSuspendFunction(p2, 0) : false) ? p2 : THROW_CCE(), $completion);
  };
  protoOf(HttpRequestLifecycle$lambda$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(6);
            this.executionContext0__1 = SupervisorJob(this.request_1.get_executionContext_yb2vgg_k$());
            attachToClientEngineJob(this.executionContext0__1, ensureNotNull(this.$this_createClientPlugin_1.get_client_byfnx0_k$().get_coroutineContext_115oqo_k$().get_y2st91_k$(Key_getInstance())));
            this.set_state_rjd8d0_k$(1);
            continue $sm;
          case 1:
            this.set_exceptionState_fex74n_k$(4);
            this.set_exceptionState_fex74n_k$(3);
            this.request_1.set_executionContext_pbxehy_k$(this.executionContext0__1);
            this.set_state_rjd8d0_k$(2);
            suspendResult = this.proceed_1(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            this.tmp$ret$01__1 = suspendResult;
            this.set_exceptionState_fex74n_k$(6);
            this.set_state_rjd8d0_k$(5);
            continue $sm;
          case 3:
            this.set_exceptionState_fex74n_k$(4);
            var tmp_0 = this.get_exception_x0n6w6_k$();
            if (tmp_0 instanceof Error) {
              var cause = this.get_exception_x0n6w6_k$();
              var tmp_1 = this;
              this.executionContext0__1.completeExceptionally_xyzekf_k$(cause);
              throw cause;
            } else {
              throw this.get_exception_x0n6w6_k$();
            }

          case 4:
            this.set_exceptionState_fex74n_k$(6);
            var t = this.get_exception_x0n6w6_k$();
            this.executionContext0__1.complete_9ww6vb_k$();
            throw t;
          case 5:
            this.set_exceptionState_fex74n_k$(6);
            this.executionContext0__1.complete_9ww6vb_k$();
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
  protoOf(HttpRequestLifecycle$lambda$slambda).create_7ewmj3_k$ = function (request, proceed, completion) {
    var i = new HttpRequestLifecycle$lambda$slambda(this.$this_createClientPlugin_1, completion);
    i.request_1 = request;
    i.proceed_1 = proceed;
    return i;
  };
  function HttpRequestLifecycle$lambda$slambda_0($this_createClientPlugin, resultContinuation) {
    var i = new HttpRequestLifecycle$lambda$slambda($this_createClientPlugin, resultContinuation);
    var l = function (request, proceed, $completion) {
      return i.invoke_kyl5xv_k$(request, proceed, $completion);
    };
    l.$arity = 2;
    return l;
  }
  function attachToClientEngineJob$lambda($requestJob) {
    return function (cause) {
      if (!(cause == null)) {
        get_LOGGER_5().trace_fti9bv_k$('Cancelling request because engine Job failed with error: ' + toString_0(cause));
        cancel_2($requestJob, 'Engine failed', cause);
      } else {
        get_LOGGER_5().trace_fti9bv_k$('Cancelling request because engine Job completed');
        $requestJob.complete_9ww6vb_k$();
      }
      return Unit_getInstance();
    };
  }
  function attachToClientEngineJob$lambda_0($handler) {
    return function (it) {
      $handler.dispose_3nnxhr_k$();
      return Unit_getInstance();
    };
  }
  var properties_initialized_HttpRequestLifecycle_kt_3hmcrf;
  function _init_properties_HttpRequestLifecycle_kt__jgkmfx() {
    if (!properties_initialized_HttpRequestLifecycle_kt_3hmcrf) {
      properties_initialized_HttpRequestLifecycle_kt_3hmcrf = true;
      LOGGER_5 = KtorSimpleLogger('io.ktor.client.plugins.HttpRequestLifecycle');
      HttpRequestLifecycle = createClientPlugin('RequestLifecycle', HttpRequestLifecycle$lambda);
    }
  }
  function get_LOGGER_6() {
    _init_properties_HttpRequestRetry_kt__h4xjtt();
    return LOGGER_6;
  }
  var LOGGER_6;
  function get_HttpRequestRetryEvent() {
    _init_properties_HttpRequestRetry_kt__h4xjtt();
    return HttpRequestRetryEvent;
  }
  var HttpRequestRetryEvent;
  function get_HttpRequestRetry() {
    _init_properties_HttpRequestRetry_kt__h4xjtt();
    return HttpRequestRetry;
  }
  var HttpRequestRetry;
  function get_MaxRetriesPerRequestAttributeKey() {
    _init_properties_HttpRequestRetry_kt__h4xjtt();
    return MaxRetriesPerRequestAttributeKey;
  }
  var MaxRetriesPerRequestAttributeKey;
  function get_ShouldRetryPerRequestAttributeKey() {
    _init_properties_HttpRequestRetry_kt__h4xjtt();
    return ShouldRetryPerRequestAttributeKey;
  }
  var ShouldRetryPerRequestAttributeKey;
  function get_ShouldRetryOnExceptionPerRequestAttributeKey() {
    _init_properties_HttpRequestRetry_kt__h4xjtt();
    return ShouldRetryOnExceptionPerRequestAttributeKey;
  }
  var ShouldRetryOnExceptionPerRequestAttributeKey;
  function get_ModifyRequestPerRequestAttributeKey() {
    _init_properties_HttpRequestRetry_kt__h4xjtt();
    return ModifyRequestPerRequestAttributeKey;
  }
  var ModifyRequestPerRequestAttributeKey;
  function get_RetryDelayPerRequestAttributeKey() {
    _init_properties_HttpRequestRetry_kt__h4xjtt();
    return RetryDelayPerRequestAttributeKey;
  }
  var RetryDelayPerRequestAttributeKey;
  function HttpRetryEventData(request, retryCount, response, cause) {
    this.request_1 = request;
    this.retryCount_1 = retryCount;
    this.response_1 = response;
    this.cause_1 = cause;
  }
  protoOf(HttpRetryEventData).get_request_jdwg4m_k$ = function () {
    return this.request_1;
  };
  protoOf(HttpRetryEventData).get_retryCount_vlyh1s_k$ = function () {
    return this.retryCount_1;
  };
  protoOf(HttpRetryEventData).get_response_xlk07e_k$ = function () {
    return this.response_1;
  };
  protoOf(HttpRetryEventData).get_cause_iplhs0_k$ = function () {
    return this.cause_1;
  };
  function randomMs($this, randomizationMs) {
    return randomizationMs.equals(new Long(0, 0)) ? new Long(0, 0) : Default_getInstance().nextLong_x1xvj_k$(randomizationMs);
  }
  function HttpRequestRetryConfig$modifyRequest$lambda(_this__u8e3s4, it) {
    return Unit_getInstance();
  }
  function HttpRequestRetryConfig$delay$slambda(resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(HttpRequestRetryConfig$delay$slambda).invoke_gc8owv_k$ = function (it, $completion) {
    var tmp = this.create_65p97n_k$(it, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(HttpRequestRetryConfig$delay$slambda).invoke_qns8j1_k$ = function (p1, $completion) {
    return this.invoke_gc8owv_k$(p1 instanceof Long ? p1 : THROW_CCE(), $completion);
  };
  protoOf(HttpRequestRetryConfig$delay$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = delay(this.it_1, this);
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
  protoOf(HttpRequestRetryConfig$delay$slambda).create_65p97n_k$ = function (it, completion) {
    var i = new HttpRequestRetryConfig$delay$slambda(completion);
    i.it_1 = it;
    return i;
  };
  protoOf(HttpRequestRetryConfig$delay$slambda).create_wyq9v6_k$ = function (value, completion) {
    return this.create_65p97n_k$(value instanceof Long ? value : THROW_CCE(), completion);
  };
  function HttpRequestRetryConfig$delay$slambda_0(resultContinuation) {
    var i = new HttpRequestRetryConfig$delay$slambda(resultContinuation);
    var l = function (it, $completion) {
      return i.invoke_gc8owv_k$(it, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function HttpRequestRetryConfig$noRetry$lambda(_this__u8e3s4, _unused_var__etf5q3, _unused_var__etf5q3_0) {
    return false;
  }
  function HttpRequestRetryConfig$noRetry$lambda_0(_this__u8e3s4, _unused_var__etf5q3, _unused_var__etf5q3_0) {
    return false;
  }
  function HttpRequestRetryConfig$retryOnException$lambda($retryOnTimeout) {
    return function ($this$retryOnExceptionIf, _unused_var__etf5q3, cause) {
      var tmp;
      if (isTimeoutException(cause)) {
        tmp = $retryOnTimeout;
      } else {
        if (cause instanceof CancellationException) {
          tmp = false;
        } else {
          tmp = true;
        }
      }
      return tmp;
    };
  }
  function HttpRequestRetryConfig$retryOnServerErrors$lambda($this$retryIf, _unused_var__etf5q3, response) {
    // Inline function 'kotlin.let' call
    var it = response.get_status_jnf6d7_k$().get_value_j01efc_k$();
    return 500 <= it ? it <= 599 : false;
  }
  function HttpRequestRetryConfig$delayMillis$lambda($respectRetryAfterHeader, $block) {
    return function (_this__u8e3s4, it) {
      var tmp;
      if ($respectRetryAfterHeader) {
        var tmp0_safe_receiver = _this__u8e3s4.response_1;
        var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.get_headers_ef25jx_k$();
        var tmp2_safe_receiver = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.get_6bo4tg_k$(HttpHeaders_getInstance().get_RetryAfter_6hk2mb_k$());
        var tmp3_safe_receiver = tmp2_safe_receiver == null ? null : toLongOrNull(tmp2_safe_receiver);
        var tmp_0;
        if (tmp3_safe_receiver == null) {
          tmp_0 = null;
        } else {
          // Inline function 'kotlin.Long.times' call
          tmp_0 = tmp3_safe_receiver.times_nfzjiw_k$(toLong(1000));
        }
        var retryAfter = tmp_0;
        var tmp2 = $block(_this__u8e3s4, it);
        // Inline function 'kotlin.comparisons.maxOf' call
        var b = retryAfter == null ? new Long(0, 0) : retryAfter;
        tmp = tmp2.compareTo_9jj042_k$(b) >= 0 ? tmp2 : b;
      } else {
        tmp = $block(_this__u8e3s4, it);
      }
      return tmp;
    };
  }
  function HttpRequestRetryConfig$constantDelay$lambda($millis, this$0, $randomizationMs) {
    return function ($this$delayMillis, it) {
      return $millis.plus_r93sks_k$(randomMs(this$0, $randomizationMs));
    };
  }
  function HttpRequestRetryConfig$exponentialDelay$lambda($base, $baseDelayMs, $maxDelayMs, this$0, $randomizationMs) {
    return function ($this$delayMillis, retry) {
      var tmp0 = $base;
      // Inline function 'kotlin.math.pow' call
      var n = retry - 1 | 0;
      var tmp$ret$0 = Math.pow(tmp0, n);
      var tmp2 = numberToLong(tmp$ret$0 * $baseDelayMs.toDouble_ygsx0s_k$());
      // Inline function 'kotlin.comparisons.minOf' call
      var b = $maxDelayMs;
      var delay = tmp2.compareTo_9jj042_k$(b) <= 0 ? tmp2 : b;
      return delay.plus_r93sks_k$(randomMs(this$0, $randomizationMs));
    };
  }
  function HttpRequestRetryConfig() {
    var tmp = this;
    tmp.modifyRequest_1 = HttpRequestRetryConfig$modifyRequest$lambda;
    var tmp_0 = this;
    tmp_0.delay_1 = HttpRequestRetryConfig$delay$slambda_0(null);
    this.maxRetries_1 = 0;
    this.retryOnExceptionOrServerErrors_vs25gx_k$(3);
    this.exponentialDelay$default_c49pfy_k$();
  }
  protoOf(HttpRequestRetryConfig).set_shouldRetry_bo4lrg_k$ = function (_set____db54di) {
    this.shouldRetry_1 = _set____db54di;
  };
  protoOf(HttpRequestRetryConfig).get_shouldRetry_o4gxfl_k$ = function () {
    var tmp = this.shouldRetry_1;
    if (!(tmp == null))
      return tmp;
    else {
      throwUninitializedPropertyAccessException('shouldRetry');
    }
  };
  protoOf(HttpRequestRetryConfig).set_shouldRetryOnException_a8dltb_k$ = function (_set____db54di) {
    this.shouldRetryOnException_1 = _set____db54di;
  };
  protoOf(HttpRequestRetryConfig).get_shouldRetryOnException_5ctz93_k$ = function () {
    var tmp = this.shouldRetryOnException_1;
    if (!(tmp == null))
      return tmp;
    else {
      throwUninitializedPropertyAccessException('shouldRetryOnException');
    }
  };
  protoOf(HttpRequestRetryConfig).set_delayMillis_m56fia_k$ = function (_set____db54di) {
    this.delayMillis_1 = _set____db54di;
  };
  protoOf(HttpRequestRetryConfig).get_delayMillis_llob4d_k$ = function () {
    var tmp = this.delayMillis_1;
    if (!(tmp == null))
      return tmp;
    else {
      throwUninitializedPropertyAccessException('delayMillis');
    }
  };
  protoOf(HttpRequestRetryConfig).set_modifyRequest_60zqge_k$ = function (_set____db54di) {
    this.modifyRequest_1 = _set____db54di;
  };
  protoOf(HttpRequestRetryConfig).get_modifyRequest_rhd0zl_k$ = function () {
    return this.modifyRequest_1;
  };
  protoOf(HttpRequestRetryConfig).set_delay_h5rlva_k$ = function (_set____db54di) {
    this.delay_1 = _set____db54di;
  };
  protoOf(HttpRequestRetryConfig).get_delay_t5vyyb_k$ = function () {
    return this.delay_1;
  };
  protoOf(HttpRequestRetryConfig).set_maxRetries_1nbslz_k$ = function (_set____db54di) {
    this.maxRetries_1 = _set____db54di;
  };
  protoOf(HttpRequestRetryConfig).get_maxRetries_hemi8b_k$ = function () {
    return this.maxRetries_1;
  };
  protoOf(HttpRequestRetryConfig).noRetry_5fvtsn_k$ = function () {
    this.maxRetries_1 = 0;
    var tmp = this;
    tmp.shouldRetry_1 = HttpRequestRetryConfig$noRetry$lambda;
    var tmp_0 = this;
    tmp_0.shouldRetryOnException_1 = HttpRequestRetryConfig$noRetry$lambda_0;
  };
  protoOf(HttpRequestRetryConfig).modifyRequest_6qlpaw_k$ = function (block) {
    this.modifyRequest_1 = block;
  };
  protoOf(HttpRequestRetryConfig).retryIf_sig7v0_k$ = function (maxRetries, block) {
    if (!(maxRetries === -1))
      this.maxRetries_1 = maxRetries;
    this.shouldRetry_1 = block;
  };
  protoOf(HttpRequestRetryConfig).retryIf$default_3heunp_k$ = function (maxRetries, block, $super) {
    maxRetries = maxRetries === VOID ? -1 : maxRetries;
    var tmp;
    if ($super === VOID) {
      this.retryIf_sig7v0_k$(maxRetries, block);
      tmp = Unit_getInstance();
    } else {
      tmp = $super.retryIf_sig7v0_k$.call(this, maxRetries, block);
    }
    return tmp;
  };
  protoOf(HttpRequestRetryConfig).retryOnExceptionIf_wpc295_k$ = function (maxRetries, block) {
    if (!(maxRetries === -1))
      this.maxRetries_1 = maxRetries;
    this.shouldRetryOnException_1 = block;
  };
  protoOf(HttpRequestRetryConfig).retryOnExceptionIf$default_s26x3m_k$ = function (maxRetries, block, $super) {
    maxRetries = maxRetries === VOID ? -1 : maxRetries;
    var tmp;
    if ($super === VOID) {
      this.retryOnExceptionIf_wpc295_k$(maxRetries, block);
      tmp = Unit_getInstance();
    } else {
      tmp = $super.retryOnExceptionIf_wpc295_k$.call(this, maxRetries, block);
    }
    return tmp;
  };
  protoOf(HttpRequestRetryConfig).retryOnException_34fdi3_k$ = function (maxRetries, retryOnTimeout) {
    this.retryOnExceptionIf_wpc295_k$(maxRetries, HttpRequestRetryConfig$retryOnException$lambda(retryOnTimeout));
  };
  protoOf(HttpRequestRetryConfig).retryOnException$default_fu1qg9_k$ = function (maxRetries, retryOnTimeout, $super) {
    maxRetries = maxRetries === VOID ? -1 : maxRetries;
    retryOnTimeout = retryOnTimeout === VOID ? false : retryOnTimeout;
    var tmp;
    if ($super === VOID) {
      this.retryOnException_34fdi3_k$(maxRetries, retryOnTimeout);
      tmp = Unit_getInstance();
    } else {
      tmp = $super.retryOnException_34fdi3_k$.call(this, maxRetries, retryOnTimeout);
    }
    return tmp;
  };
  protoOf(HttpRequestRetryConfig).retryOnServerErrors_n8g6l_k$ = function (maxRetries) {
    this.retryIf_sig7v0_k$(maxRetries, HttpRequestRetryConfig$retryOnServerErrors$lambda);
  };
  protoOf(HttpRequestRetryConfig).retryOnServerErrors$default_766jee_k$ = function (maxRetries, $super) {
    maxRetries = maxRetries === VOID ? -1 : maxRetries;
    var tmp;
    if ($super === VOID) {
      this.retryOnServerErrors_n8g6l_k$(maxRetries);
      tmp = Unit_getInstance();
    } else {
      tmp = $super.retryOnServerErrors_n8g6l_k$.call(this, maxRetries);
    }
    return tmp;
  };
  protoOf(HttpRequestRetryConfig).retryOnExceptionOrServerErrors_vs25gx_k$ = function (maxRetries) {
    this.retryOnServerErrors_n8g6l_k$(maxRetries);
    this.retryOnException$default_fu1qg9_k$(maxRetries);
  };
  protoOf(HttpRequestRetryConfig).retryOnExceptionOrServerErrors$default_s2eqz2_k$ = function (maxRetries, $super) {
    maxRetries = maxRetries === VOID ? -1 : maxRetries;
    var tmp;
    if ($super === VOID) {
      this.retryOnExceptionOrServerErrors_vs25gx_k$(maxRetries);
      tmp = Unit_getInstance();
    } else {
      tmp = $super.retryOnExceptionOrServerErrors_vs25gx_k$.call(this, maxRetries);
    }
    return tmp;
  };
  protoOf(HttpRequestRetryConfig).delayMillis_83rww5_k$ = function (respectRetryAfterHeader, block) {
    var tmp = this;
    tmp.delayMillis_1 = HttpRequestRetryConfig$delayMillis$lambda(respectRetryAfterHeader, block);
  };
  protoOf(HttpRequestRetryConfig).delayMillis$default_nsymjm_k$ = function (respectRetryAfterHeader, block, $super) {
    respectRetryAfterHeader = respectRetryAfterHeader === VOID ? true : respectRetryAfterHeader;
    var tmp;
    if ($super === VOID) {
      this.delayMillis_83rww5_k$(respectRetryAfterHeader, block);
      tmp = Unit_getInstance();
    } else {
      tmp = $super.delayMillis_83rww5_k$.call(this, respectRetryAfterHeader, block);
    }
    return tmp;
  };
  protoOf(HttpRequestRetryConfig).constantDelay_pue7au_k$ = function (millis, randomizationMs, respectRetryAfterHeader) {
    // Inline function 'kotlin.check' call
    if (!(millis.compareTo_9jj042_k$(new Long(0, 0)) > 0)) {
      throw IllegalStateException_init_$Create$('Check failed.');
    }
    // Inline function 'kotlin.check' call
    if (!(randomizationMs.compareTo_9jj042_k$(new Long(0, 0)) >= 0)) {
      throw IllegalStateException_init_$Create$('Check failed.');
    }
    this.delayMillis_83rww5_k$(respectRetryAfterHeader, HttpRequestRetryConfig$constantDelay$lambda(millis, this, randomizationMs));
  };
  protoOf(HttpRequestRetryConfig).constantDelay$default_5jryy1_k$ = function (millis, randomizationMs, respectRetryAfterHeader, $super) {
    millis = millis === VOID ? new Long(1000, 0) : millis;
    randomizationMs = randomizationMs === VOID ? new Long(1000, 0) : randomizationMs;
    respectRetryAfterHeader = respectRetryAfterHeader === VOID ? true : respectRetryAfterHeader;
    var tmp;
    if ($super === VOID) {
      this.constantDelay_pue7au_k$(millis, randomizationMs, respectRetryAfterHeader);
      tmp = Unit_getInstance();
    } else {
      tmp = $super.constantDelay_pue7au_k$.call(this, millis, randomizationMs, respectRetryAfterHeader);
    }
    return tmp;
  };
  protoOf(HttpRequestRetryConfig).exponentialDelay_ue1izz_k$ = function (base, baseDelayMs, maxDelayMs, randomizationMs, respectRetryAfterHeader) {
    // Inline function 'kotlin.check' call
    if (!(base > 0)) {
      throw IllegalStateException_init_$Create$('Check failed.');
    }
    // Inline function 'kotlin.check' call
    if (!(baseDelayMs.compareTo_9jj042_k$(new Long(0, 0)) > 0)) {
      throw IllegalStateException_init_$Create$('Check failed.');
    }
    // Inline function 'kotlin.check' call
    if (!(maxDelayMs.compareTo_9jj042_k$(new Long(0, 0)) > 0)) {
      throw IllegalStateException_init_$Create$('Check failed.');
    }
    // Inline function 'kotlin.check' call
    if (!(randomizationMs.compareTo_9jj042_k$(new Long(0, 0)) >= 0)) {
      throw IllegalStateException_init_$Create$('Check failed.');
    }
    this.delayMillis_83rww5_k$(respectRetryAfterHeader, HttpRequestRetryConfig$exponentialDelay$lambda(base, baseDelayMs, maxDelayMs, this, randomizationMs));
  };
  protoOf(HttpRequestRetryConfig).exponentialDelay$default_c49pfy_k$ = function (base, baseDelayMs, maxDelayMs, randomizationMs, respectRetryAfterHeader, $super) {
    base = base === VOID ? 2.0 : base;
    baseDelayMs = baseDelayMs === VOID ? new Long(1000, 0) : baseDelayMs;
    maxDelayMs = maxDelayMs === VOID ? new Long(60000, 0) : maxDelayMs;
    randomizationMs = randomizationMs === VOID ? new Long(1000, 0) : randomizationMs;
    respectRetryAfterHeader = respectRetryAfterHeader === VOID ? true : respectRetryAfterHeader;
    var tmp;
    if ($super === VOID) {
      this.exponentialDelay_ue1izz_k$(base, baseDelayMs, maxDelayMs, randomizationMs, respectRetryAfterHeader);
      tmp = Unit_getInstance();
    } else {
      tmp = $super.exponentialDelay_ue1izz_k$.call(this, base, baseDelayMs, maxDelayMs, randomizationMs, respectRetryAfterHeader);
    }
    return tmp;
  };
  protoOf(HttpRequestRetryConfig).delay_cu0gs4_k$ = function (block) {
    this.delay_1 = block;
  };
  function HttpRetryShouldRetryContext(retryCount) {
    this.retryCount_1 = retryCount;
  }
  protoOf(HttpRetryShouldRetryContext).get_retryCount_vlyh1s_k$ = function () {
    return this.retryCount_1;
  };
  function HttpRetryDelayContext(request, response, cause) {
    this.request_1 = request;
    this.response_1 = response;
    this.cause_1 = cause;
  }
  protoOf(HttpRetryDelayContext).get_request_jdwg4m_k$ = function () {
    return this.request_1;
  };
  protoOf(HttpRetryDelayContext).get_response_xlk07e_k$ = function () {
    return this.response_1;
  };
  protoOf(HttpRetryDelayContext).get_cause_iplhs0_k$ = function () {
    return this.cause_1;
  };
  function HttpRetryModifyRequestContext(request, response, cause, retryCount) {
    this.request_1 = request;
    this.response_1 = response;
    this.cause_1 = cause;
    this.retryCount_1 = retryCount;
  }
  protoOf(HttpRetryModifyRequestContext).get_request_jdwg4m_k$ = function () {
    return this.request_1;
  };
  protoOf(HttpRetryModifyRequestContext).get_response_xlk07e_k$ = function () {
    return this.response_1;
  };
  protoOf(HttpRetryModifyRequestContext).get_cause_iplhs0_k$ = function () {
    return this.cause_1;
  };
  protoOf(HttpRetryModifyRequestContext).get_retryCount_vlyh1s_k$ = function () {
    return this.retryCount_1;
  };
  function isTimeoutException(_this__u8e3s4) {
    _init_properties_HttpRequestRetry_kt__h4xjtt();
    var exception = unwrapCancellationException(_this__u8e3s4);
    var tmp;
    var tmp_0;
    if (exception instanceof HttpRequestTimeoutException) {
      tmp_0 = true;
    } else {
      tmp_0 = exception instanceof ConnectTimeoutException;
    }
    if (tmp_0) {
      tmp = true;
    } else {
      tmp = exception instanceof SocketTimeoutException;
    }
    return tmp;
  }
  function HttpRequestRetryConfig$_init_$ref_mqbboi() {
    var l = function () {
      return new HttpRequestRetryConfig();
    };
    l.callableName = '<init>';
    return l;
  }
  function HttpRequestRetry$lambda($this$createClientPlugin) {
    _init_properties_HttpRequestRetry_kt__h4xjtt();
    var shouldRetry = $this$createClientPlugin.get_pluginConfig_p50bdq_k$().get_shouldRetry_o4gxfl_k$();
    var shouldRetryOnException = $this$createClientPlugin.get_pluginConfig_p50bdq_k$().get_shouldRetryOnException_5ctz93_k$();
    var delayMillis = $this$createClientPlugin.get_pluginConfig_p50bdq_k$().get_delayMillis_llob4d_k$();
    var delay = $this$createClientPlugin.get_pluginConfig_p50bdq_k$().delay_1;
    var maxRetries = $this$createClientPlugin.get_pluginConfig_p50bdq_k$().maxRetries_1;
    var modifyRequest = $this$createClientPlugin.get_pluginConfig_p50bdq_k$().modifyRequest_1;
    var tmp = Send_getInstance();
    $this$createClientPlugin.on_z1oiz_k$(tmp, HttpRequestRetry$lambda$slambda_0(shouldRetry, shouldRetryOnException, maxRetries, delayMillis, modifyRequest, $this$createClientPlugin, delay, null));
    return Unit_getInstance();
  }
  function invoke$shouldRetry(retryCount, maxRetries, shouldRetry, call) {
    return retryCount < maxRetries && shouldRetry(new HttpRetryShouldRetryContext(retryCount + 1 | 0), call.get_request_jdwg4m_k$(), call.get_response_xlk07e_k$());
  }
  function invoke$shouldRetryOnException(retryCount, maxRetries, shouldRetry, subRequest, cause) {
    return retryCount < maxRetries && shouldRetry(new HttpRetryShouldRetryContext(retryCount + 1 | 0), subRequest, cause);
  }
  function invoke$prepareRequest(request) {
    var subRequest = (new HttpRequestBuilder()).takeFrom_wuijvv_k$(request);
    var tmp = request.get_executionContext_yb2vgg_k$();
    tmp.invokeOnCompletion_n6cffu_k$(HttpRequestRetry$lambda$prepareRequest$lambda(subRequest));
    return subRequest;
  }
  function HttpRequestRetry$lambda$slambda($shouldRetry, $shouldRetryOnException, $maxRetries, $delayMillis, $modifyRequest, $this_createClientPlugin, $delay, resultContinuation) {
    this.$shouldRetry_1 = $shouldRetry;
    this.$shouldRetryOnException_1 = $shouldRetryOnException;
    this.$maxRetries_1 = $maxRetries;
    this.$delayMillis_1 = $delayMillis;
    this.$modifyRequest_1 = $modifyRequest;
    this.$this_createClientPlugin_1 = $this_createClientPlugin;
    this.$delay_1 = $delay;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(HttpRequestRetry$lambda$slambda).invoke_utn3hl_k$ = function ($this$on, request, $completion) {
    var tmp = this.create_xzj40p_k$($this$on, request, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(HttpRequestRetry$lambda$slambda).invoke_4tzzq6_k$ = function (p1, p2, $completion) {
    var tmp = p1 instanceof Sender_0 ? p1 : THROW_CCE();
    return this.invoke_utn3hl_k$(tmp, p2 instanceof HttpRequestBuilder ? p2 : THROW_CCE(), $completion);
  };
  protoOf(HttpRequestRetry$lambda$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(9);
            this.retryCount0__1 = 0;
            var tmp_0 = this;
            var tmp0_elvis_lhs = this.request_1.get_attributes_dgqof4_k$().getOrNull_6mjt1v_k$(get_ShouldRetryPerRequestAttributeKey());
            tmp_0.shouldRetry1__1 = tmp0_elvis_lhs == null ? this.$shouldRetry_1 : tmp0_elvis_lhs;
            var tmp_1 = this;
            var tmp1_elvis_lhs = this.request_1.get_attributes_dgqof4_k$().getOrNull_6mjt1v_k$(get_ShouldRetryOnExceptionPerRequestAttributeKey());
            tmp_1.shouldRetryOnException2__1 = tmp1_elvis_lhs == null ? this.$shouldRetryOnException_1 : tmp1_elvis_lhs;
            var tmp_2 = this;
            var tmp2_elvis_lhs = this.request_1.get_attributes_dgqof4_k$().getOrNull_6mjt1v_k$(get_MaxRetriesPerRequestAttributeKey());
            tmp_2.maxRetries3__1 = tmp2_elvis_lhs == null ? this.$maxRetries_1 : tmp2_elvis_lhs;
            var tmp_3 = this;
            var tmp3_elvis_lhs = this.request_1.get_attributes_dgqof4_k$().getOrNull_6mjt1v_k$(get_RetryDelayPerRequestAttributeKey());
            tmp_3.delayMillis4__1 = tmp3_elvis_lhs == null ? this.$delayMillis_1 : tmp3_elvis_lhs;
            var tmp_4 = this;
            var tmp4_elvis_lhs = this.request_1.get_attributes_dgqof4_k$().getOrNull_6mjt1v_k$(get_ModifyRequestPerRequestAttributeKey());
            tmp_4.modifyRequest5__1 = tmp4_elvis_lhs == null ? this.$modifyRequest_1 : tmp4_elvis_lhs;
            this.lastRetryData7__1 = null;
            this.set_state_rjd8d0_k$(1);
            continue $sm;
          case 1:
            if (!true) {
              this.set_state_rjd8d0_k$(10);
              continue $sm;
            }

            this.subRequest8__1 = invoke$prepareRequest(this.request_1);
            this.set_exceptionState_fex74n_k$(6);
            if (!(this.lastRetryData7__1 == null)) {
              var modifyRequestContext = new HttpRetryModifyRequestContext(this.request_1, this.lastRetryData7__1.response_1, this.lastRetryData7__1.cause_1, this.lastRetryData7__1.retryCount_1);
              this.modifyRequest5__1(modifyRequestContext, this.subRequest8__1);
            }

            this.set_state_rjd8d0_k$(2);
            suspendResult = this.$this$on_1.proceed_xu9ptb_k$(this.subRequest8__1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            this.call6__1 = suspendResult;
            if (!invoke$shouldRetry(this.retryCount0__1, this.maxRetries3__1, this.shouldRetry1__1, this.call6__1)) {
              if (get_isSaved(this.call6__1.get_response_xlk07e_k$()) && !this.call6__1.get_response_xlk07e_k$().get_rawContent_u3f8li_k$().get_isClosedForRead_ajcc1s_k$()) {
                this.set_state_rjd8d0_k$(4);
                suspendResult = readBytes(this.call6__1.get_response_xlk07e_k$(), 0, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }
                continue $sm;
              } else {
                this.set_state_rjd8d0_k$(5);
                continue $sm;
              }
            } else {
              this.set_state_rjd8d0_k$(3);
              continue $sm;
            }

          case 3:
            var tmp_5 = this;
            this.retryCount0__1 = this.retryCount0__1 + 1 | 0;
            tmp_5.TRY_RESULT9__1 = new HttpRetryEventData(this.subRequest8__1, this.retryCount0__1, this.call6__1.get_response_xlk07e_k$(), null);
            this.set_exceptionState_fex74n_k$(9);
            this.set_state_rjd8d0_k$(7);
            continue $sm;
          case 4:
            this.set_state_rjd8d0_k$(5);
            continue $sm;
          case 5:
            this.set_exceptionState_fex74n_k$(9);
            this.set_state_rjd8d0_k$(10);
            continue $sm;
          case 6:
            this.set_exceptionState_fex74n_k$(9);
            var tmp_6 = this.get_exception_x0n6w6_k$();
            if (tmp_6 instanceof Error) {
              this.cause10__1 = this.get_exception_x0n6w6_k$();
              var tmp_7 = this;
              if (!invoke$shouldRetryOnException(this.retryCount0__1, this.maxRetries3__1, this.shouldRetryOnException2__1, this.subRequest8__1, this.cause10__1)) {
                throw this.cause10__1;
              }
              this.retryCount0__1 = this.retryCount0__1 + 1 | 0;
              tmp_7.TRY_RESULT9__1 = new HttpRetryEventData(this.subRequest8__1, this.retryCount0__1, null, this.cause10__1);
              this.set_state_rjd8d0_k$(7);
              continue $sm;
            } else {
              throw this.get_exception_x0n6w6_k$();
            }

          case 7:
            this.set_exceptionState_fex74n_k$(9);
            this.retryData11__1 = this.TRY_RESULT9__1;
            this.lastRetryData7__1 = this.retryData11__1;
            this.$this_createClientPlugin_1.get_client_byfnx0_k$().get_monitor_lpmkc1_k$().raise_3e7w7u_k$(get_HttpRequestRetryEvent(), this.lastRetryData7__1);
            this.delayContext12__1 = new HttpRetryDelayContext(this.lastRetryData7__1.request_1, this.lastRetryData7__1.response_1, this.lastRetryData7__1.cause_1);
            this.set_state_rjd8d0_k$(8);
            suspendResult = this.$delay_1(this.delayMillis4__1(this.delayContext12__1, this.retryCount0__1), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 8:
            get_LOGGER_6().trace_fti9bv_k$('Retrying request ' + this.request_1.get_url_18iuii_k$().toString() + ' attempt: ' + this.retryCount0__1);
            this.set_state_rjd8d0_k$(1);
            continue $sm;
          case 9:
            throw this.get_exception_x0n6w6_k$();
          case 10:
            return this.call6__1;
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 9) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  protoOf(HttpRequestRetry$lambda$slambda).create_xzj40p_k$ = function ($this$on, request, completion) {
    var i = new HttpRequestRetry$lambda$slambda(this.$shouldRetry_1, this.$shouldRetryOnException_1, this.$maxRetries_1, this.$delayMillis_1, this.$modifyRequest_1, this.$this_createClientPlugin_1, this.$delay_1, completion);
    i.$this$on_1 = $this$on;
    i.request_1 = request;
    return i;
  };
  function HttpRequestRetry$lambda$slambda_0($shouldRetry, $shouldRetryOnException, $maxRetries, $delayMillis, $modifyRequest, $this_createClientPlugin, $delay, resultContinuation) {
    var i = new HttpRequestRetry$lambda$slambda($shouldRetry, $shouldRetryOnException, $maxRetries, $delayMillis, $modifyRequest, $this_createClientPlugin, $delay, resultContinuation);
    var l = function ($this$on, request, $completion) {
      return i.invoke_utn3hl_k$($this$on, request, $completion);
    };
    l.$arity = 2;
    return l;
  }
  function HttpRequestRetry$lambda$prepareRequest$lambda($subRequest) {
    return function (cause) {
      var tmp = $subRequest.get_executionContext_yb2vgg_k$();
      var subRequestJob = isInterface(tmp, CompletableJob) ? tmp : THROW_CCE();
      if (cause == null) {
        subRequestJob.complete_9ww6vb_k$();
      } else {
        subRequestJob.completeExceptionally_xyzekf_k$(cause);
      }
      return Unit_getInstance();
    };
  }
  var properties_initialized_HttpRequestRetry_kt_jcpv6l;
  function _init_properties_HttpRequestRetry_kt__h4xjtt() {
    if (!properties_initialized_HttpRequestRetry_kt_jcpv6l) {
      properties_initialized_HttpRequestRetry_kt_jcpv6l = true;
      LOGGER_6 = KtorSimpleLogger('io.ktor.client.plugins.HttpRequestRetry');
      HttpRequestRetryEvent = new EventDefinition();
      var tmp = HttpRequestRetryConfig$_init_$ref_mqbboi();
      HttpRequestRetry = createClientPlugin_0('RetryFeature', tmp, HttpRequestRetry$lambda);
      // Inline function 'io.ktor.util.AttributeKey' call
      var name = 'MaxRetriesPerRequestAttributeKey';
      // Inline function 'io.ktor.util.reflect.typeInfo' call
      var tmp_0 = PrimitiveClasses_getInstance().get_intClass_mw4y9a_k$();
      // Inline function 'io.ktor.util.reflect.typeOfOrNull' call
      var tmp_1;
      try {
        tmp_1 = createKType(PrimitiveClasses_getInstance().get_intClass_mw4y9a_k$(), arrayOf([]), false);
      } catch ($p) {
        var tmp_2;
        if ($p instanceof Error) {
          var _unused_var__etf5q3 = $p;
          tmp_2 = null;
        } else {
          throw $p;
        }
        tmp_1 = tmp_2;
      }
      var tmp$ret$0 = tmp_1;
      var tmp$ret$1 = new TypeInfo(tmp_0, tmp$ret$0);
      MaxRetriesPerRequestAttributeKey = new AttributeKey(name, tmp$ret$1);
      // Inline function 'io.ktor.util.AttributeKey' call
      var name_0 = 'ShouldRetryPerRequestAttributeKey';
      // Inline function 'io.ktor.util.reflect.typeInfo' call
      var tmp_3 = PrimitiveClasses_getInstance().functionClass(3);
      // Inline function 'io.ktor.util.reflect.typeOfOrNull' call
      var tmp_4;
      try {
        tmp_4 = createKType(PrimitiveClasses_getInstance().functionClass(3), arrayOf([createInvariantKTypeProjection(createKType(getKClass(HttpRetryShouldRetryContext), arrayOf([]), false)), createInvariantKTypeProjection(createKType(getKClass(HttpRequest_0), arrayOf([]), false)), createInvariantKTypeProjection(createKType(getKClass(HttpResponse), arrayOf([]), false)), createInvariantKTypeProjection(createKType(PrimitiveClasses_getInstance().get_booleanClass_d285fr_k$(), arrayOf([]), false))]), false);
      } catch ($p) {
        var tmp_5;
        if ($p instanceof Error) {
          var _unused_var__etf5q3_0 = $p;
          tmp_5 = null;
        } else {
          throw $p;
        }
        tmp_4 = tmp_5;
      }
      var tmp$ret$0_0 = tmp_4;
      var tmp$ret$1_0 = new TypeInfo(tmp_3, tmp$ret$0_0);
      ShouldRetryPerRequestAttributeKey = new AttributeKey(name_0, tmp$ret$1_0);
      // Inline function 'io.ktor.util.AttributeKey' call
      var name_1 = 'ShouldRetryOnExceptionPerRequestAttributeKey';
      // Inline function 'io.ktor.util.reflect.typeInfo' call
      var tmp_6 = PrimitiveClasses_getInstance().functionClass(3);
      // Inline function 'io.ktor.util.reflect.typeOfOrNull' call
      var tmp_7;
      try {
        tmp_7 = createKType(PrimitiveClasses_getInstance().functionClass(3), arrayOf([createInvariantKTypeProjection(createKType(getKClass(HttpRetryShouldRetryContext), arrayOf([]), false)), createInvariantKTypeProjection(createKType(getKClass(HttpRequestBuilder), arrayOf([]), false)), createInvariantKTypeProjection(createKType(PrimitiveClasses_getInstance().get_throwableClass_ee1a8x_k$(), arrayOf([]), false)), createInvariantKTypeProjection(createKType(PrimitiveClasses_getInstance().get_booleanClass_d285fr_k$(), arrayOf([]), false))]), false);
      } catch ($p) {
        var tmp_8;
        if ($p instanceof Error) {
          var _unused_var__etf5q3_1 = $p;
          tmp_8 = null;
        } else {
          throw $p;
        }
        tmp_7 = tmp_8;
      }
      var tmp$ret$0_1 = tmp_7;
      var tmp$ret$1_1 = new TypeInfo(tmp_6, tmp$ret$0_1);
      ShouldRetryOnExceptionPerRequestAttributeKey = new AttributeKey(name_1, tmp$ret$1_1);
      // Inline function 'io.ktor.util.AttributeKey' call
      var name_2 = 'ModifyRequestPerRequestAttributeKey';
      // Inline function 'io.ktor.util.reflect.typeInfo' call
      var tmp_9 = PrimitiveClasses_getInstance().functionClass(2);
      // Inline function 'io.ktor.util.reflect.typeOfOrNull' call
      var tmp_10;
      try {
        tmp_10 = createKType(PrimitiveClasses_getInstance().functionClass(2), arrayOf([createInvariantKTypeProjection(createKType(getKClass(HttpRetryModifyRequestContext), arrayOf([]), false)), createInvariantKTypeProjection(createKType(getKClass(HttpRequestBuilder), arrayOf([]), false)), createInvariantKTypeProjection(createKType(getKClass(Unit), arrayOf([]), false))]), false);
      } catch ($p) {
        var tmp_11;
        if ($p instanceof Error) {
          var _unused_var__etf5q3_2 = $p;
          tmp_11 = null;
        } else {
          throw $p;
        }
        tmp_10 = tmp_11;
      }
      var tmp$ret$0_2 = tmp_10;
      var tmp$ret$1_2 = new TypeInfo(tmp_9, tmp$ret$0_2);
      ModifyRequestPerRequestAttributeKey = new AttributeKey(name_2, tmp$ret$1_2);
      // Inline function 'io.ktor.util.AttributeKey' call
      var name_3 = 'RetryDelayPerRequestAttributeKey';
      // Inline function 'io.ktor.util.reflect.typeInfo' call
      var tmp_12 = PrimitiveClasses_getInstance().functionClass(2);
      // Inline function 'io.ktor.util.reflect.typeOfOrNull' call
      var tmp_13;
      try {
        tmp_13 = createKType(PrimitiveClasses_getInstance().functionClass(2), arrayOf([createInvariantKTypeProjection(createKType(getKClass(HttpRetryDelayContext), arrayOf([]), false)), createInvariantKTypeProjection(createKType(PrimitiveClasses_getInstance().get_intClass_mw4y9a_k$(), arrayOf([]), false)), createInvariantKTypeProjection(createKType(getKClass(Long), arrayOf([]), false))]), false);
      } catch ($p) {
        var tmp_14;
        if ($p instanceof Error) {
          var _unused_var__etf5q3_3 = $p;
          tmp_14 = null;
        } else {
          throw $p;
        }
        tmp_13 = tmp_14;
      }
      var tmp$ret$0_3 = tmp_13;
      var tmp$ret$1_3 = new TypeInfo(tmp_12, tmp$ret$0_3);
      RetryDelayPerRequestAttributeKey = new AttributeKey(name_3, tmp$ret$1_3);
    }
  }
  function Sender() {
  }
  function HttpSend$Plugin$install$slambda($plugin, $scope, resultContinuation) {
    this.$plugin_1 = $plugin;
    this.$scope_1 = $scope;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(HttpSend$Plugin$install$slambda).invoke_wpcgmu_k$ = function ($this$intercept, content, $completion) {
    var tmp = this.create_l3tkcm_k$($this$intercept, content, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(HttpSend$Plugin$install$slambda).invoke_4tzzq6_k$ = function (p1, p2, $completion) {
    var tmp = p1 instanceof PipelineContext ? p1 : THROW_CCE();
    return this.invoke_wpcgmu_k$(tmp, !(p2 == null) ? p2 : THROW_CCE(), $completion);
  };
  protoOf(HttpSend$Plugin$install$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(3);
            var tmp_0 = this.content_1;
            if (!(tmp_0 instanceof OutgoingContent)) {
              var message = trimMargin('\n|Fail to prepare request body for sending. \n|The body type is: ' + toString(getKClassFromExpression(this.content_1)) + ', with Content-Type: ' + toString_0(contentType(this.$this$intercept_1.get_context_h02k06_k$())) + '.\n|\n|If you expect serialized body, please check that you have installed the corresponding plugin(like `ContentNegotiation`) and set `Content-Type` header.');
              throw IllegalStateException_init_$Create$(toString(message));
            }

            var tmp1 = this.$this$intercept_1.get_context_h02k06_k$();
            var body = this.content_1;
            if (body == null) {
              tmp1.set_body_slfhxt_k$(NullBody_getInstance());
              var tmp_1 = getKClass(OutgoingContent);
              var tmp_2;
              try {
                tmp_2 = createKType(getKClass(OutgoingContent), arrayOf([]), false);
              } catch ($p) {
                var tmp_3;
                if ($p instanceof Error) {
                  var _unused_var__etf5q3 = $p;
                  tmp_3 = null;
                } else {
                  throw $p;
                }
                tmp_2 = tmp_3;
              }
              tmp1.set_bodyType_8pgqkl_k$(new TypeInfo(tmp_1, tmp_2));
            } else {
              if (body instanceof OutgoingContent) {
                tmp1.set_body_slfhxt_k$(body);
                tmp1.set_bodyType_8pgqkl_k$(null);
              } else {
                tmp1.set_body_slfhxt_k$(body);
                var tmp_4 = getKClass(OutgoingContent);
                var tmp_5;
                try {
                  tmp_5 = createKType(getKClass(OutgoingContent), arrayOf([]), false);
                } catch ($p) {
                  var tmp_6;
                  if ($p instanceof Error) {
                    var _unused_var__etf5q3_0 = $p;
                    tmp_6 = null;
                  } else {
                    throw $p;
                  }
                  tmp_5 = tmp_6;
                }
                tmp1.set_bodyType_8pgqkl_k$(new TypeInfo(tmp_4, tmp_5));
              }
            }

            this.realSender0__1 = new DefaultSender(this.$plugin_1.maxSendCount_1, this.$scope_1);
            this.interceptedSender1__1 = this.realSender0__1;
            var _iterator__ex2g4s = reversed(this.$plugin_1.interceptors_1).iterator_jk1svi_k$();
            while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
              var interceptor = _iterator__ex2g4s.next_20eer_k$();
              this.interceptedSender1__1 = new InterceptedSender(interceptor, this.interceptedSender1__1);
            }

            this.set_state_rjd8d0_k$(1);
            suspendResult = this.interceptedSender1__1.execute_o54lze_k$(this.$this$intercept_1.get_context_h02k06_k$(), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.call2__1 = suspendResult;
            this.set_state_rjd8d0_k$(2);
            suspendResult = this.$this$intercept_1.proceedWith_i5skhv_k$(this.call2__1, this);
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
  protoOf(HttpSend$Plugin$install$slambda).create_l3tkcm_k$ = function ($this$intercept, content, completion) {
    var i = new HttpSend$Plugin$install$slambda(this.$plugin_1, this.$scope_1, completion);
    i.$this$intercept_1 = $this$intercept;
    i.content_1 = content;
    return i;
  };
  function HttpSend$Plugin$install$slambda_0($plugin, $scope, resultContinuation) {
    var i = new HttpSend$Plugin$install$slambda($plugin, $scope, resultContinuation);
    var l = function ($this$intercept, content, $completion) {
      return i.invoke_wpcgmu_k$($this$intercept, content, $completion);
    };
    l.$arity = 2;
    return l;
  }
  function _get_interceptor__8m2498($this) {
    return $this.interceptor_1;
  }
  function _get_nextSender__nwl3sz($this) {
    return $this.nextSender_1;
  }
  function _get_maxSendCount__nbjqgo($this) {
    return $this.maxSendCount_1;
  }
  function _get_client__j03y3k($this) {
    return $this.client_1;
  }
  function _set_sentCount__st452q($this, _set____db54di) {
    $this.sentCount_1 = _set____db54di;
  }
  function _get_sentCount__hqbbu($this) {
    return $this.sentCount_1;
  }
  function _set_currentCall__kxa4q6($this, _set____db54di) {
    $this.currentCall_1 = _set____db54di;
  }
  function _get_currentCall__jtfqx2($this) {
    return $this.currentCall_1;
  }
  function $executeCOROUTINE$9(_this__u8e3s4, requestBuilder, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.requestBuilder_1 = requestBuilder;
  }
  protoOf($executeCOROUTINE$9).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            var tmp0_safe_receiver = this._this__u8e3s4__1.currentCall_1;
            if (tmp0_safe_receiver == null)
              null;
            else {
              cancel(tmp0_safe_receiver);
            }

            if (this._this__u8e3s4__1.sentCount_1 >= this._this__u8e3s4__1.maxSendCount_1) {
              throw new SendCountExceedException('Max send count ' + this._this__u8e3s4__1.maxSendCount_1 + ' exceeded. Consider increasing the property ' + 'maxSendCount if more is required.');
            }

            var _unary__edvuaz = this._this__u8e3s4__1.sentCount_1;
            this._this__u8e3s4__1.sentCount_1 = _unary__edvuaz + 1 | 0;
            this.set_state_rjd8d0_k$(1);
            suspendResult = this._this__u8e3s4__1.client_1.get_sendPipeline_5dhg2b_k$().execute_qsx0hz_k$(this.requestBuilder_1, this.requestBuilder_1.get_body_wojkyz_k$(), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var sendResult = suspendResult;
            var tmp1_elvis_lhs = sendResult instanceof HttpClientCall ? sendResult : null;
            var tmp_0;
            if (tmp1_elvis_lhs == null) {
              var message = 'Failed to execute send pipeline. Expected [HttpClientCall], but received ' + toString(sendResult);
              throw IllegalStateException_init_$Create$(toString(message));
            } else {
              tmp_0 = tmp1_elvis_lhs;
            }

            var call = tmp_0;
            this._this__u8e3s4__1.currentCall_1 = call;
            return call;
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
  function _get_maxSendCount__nbjqgo_0($this) {
    return $this.maxSendCount_1;
  }
  function Config() {
    this.maxSendCount_1 = 20;
  }
  protoOf(Config).set_maxSendCount_81z1wo_k$ = function (_set____db54di) {
    this.maxSendCount_1 = _set____db54di;
  };
  protoOf(Config).get_maxSendCount_izeams_k$ = function () {
    return this.maxSendCount_1;
  };
  function _get_interceptors__h4min7($this) {
    return $this.interceptors_1;
  }
  function Plugin() {
    Plugin_instance = this;
    var tmp = this;
    // Inline function 'io.ktor.util.AttributeKey' call
    var name = 'HttpSend';
    // Inline function 'io.ktor.util.reflect.typeInfo' call
    var tmp_0 = getKClass(HttpSend);
    // Inline function 'io.ktor.util.reflect.typeOfOrNull' call
    var tmp_1;
    try {
      tmp_1 = createKType(getKClass(HttpSend), arrayOf([]), false);
    } catch ($p) {
      var tmp_2;
      if ($p instanceof Error) {
        var _unused_var__etf5q3 = $p;
        tmp_2 = null;
      } else {
        throw $p;
      }
      tmp_1 = tmp_2;
    }
    var tmp$ret$0 = tmp_1;
    var tmp$ret$1 = new TypeInfo(tmp_0, tmp$ret$0);
    tmp.key_1 = new AttributeKey(name, tmp$ret$1);
  }
  protoOf(Plugin).get_key_18j28a_k$ = function () {
    return this.key_1;
  };
  protoOf(Plugin).prepare_dfz635_k$ = function (block) {
    // Inline function 'kotlin.apply' call
    var this_0 = new Config();
    block(this_0);
    var config = this_0;
    return new HttpSend(config.maxSendCount_1);
  };
  protoOf(Plugin).prepare_t1xtpw_k$ = function (block) {
    return this.prepare_dfz635_k$(block);
  };
  protoOf(Plugin).install_oova29_k$ = function (plugin, scope) {
    var tmp = scope.get_requestPipeline_5d9z6w_k$();
    var tmp_0 = Phases_getInstance().get_Send_wo9sz5_k$();
    tmp.intercept_k21bv3_k$(tmp_0, HttpSend$Plugin$install$slambda_0(plugin, scope, null));
  };
  protoOf(Plugin).install_kxaehd_k$ = function (plugin, scope) {
    return this.install_oova29_k$(plugin instanceof HttpSend ? plugin : THROW_CCE(), scope);
  };
  var Plugin_instance;
  function Plugin_getInstance() {
    if (Plugin_instance == null)
      new Plugin();
    return Plugin_instance;
  }
  function InterceptedSender(interceptor, nextSender) {
    this.interceptor_1 = interceptor;
    this.nextSender_1 = nextSender;
  }
  protoOf(InterceptedSender).execute_o54lze_k$ = function (requestBuilder, $completion) {
    return this.interceptor_1(this.nextSender_1, requestBuilder, $completion);
  };
  function DefaultSender(maxSendCount, client) {
    this.maxSendCount_1 = maxSendCount;
    this.client_1 = client;
    this.sentCount_1 = 0;
    this.currentCall_1 = null;
  }
  protoOf(DefaultSender).execute_o54lze_k$ = function (requestBuilder, $completion) {
    var tmp = new $executeCOROUTINE$9(this, requestBuilder, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  function HttpSend(maxSendCount) {
    Plugin_getInstance();
    maxSendCount = maxSendCount === VOID ? 20 : maxSendCount;
    this.maxSendCount_1 = maxSendCount;
    var tmp = this;
    // Inline function 'kotlin.collections.mutableListOf' call
    tmp.interceptors_1 = ArrayList_init_$Create$();
  }
  protoOf(HttpSend).intercept_abqmrc_k$ = function (block) {
    // Inline function 'kotlin.collections.plusAssign' call
    this.interceptors_1.add_utx5q5_k$(block);
  };
  function SendCountExceedException(message) {
    IllegalStateException_init_$Init$_0(message, this);
    captureStack(this, SendCountExceedException);
  }
  function get_LOGGER_7() {
    _init_properties_HttpTimeout_kt__pucqrr();
    return LOGGER_7;
  }
  var LOGGER_7;
  function get_HttpTimeout() {
    _init_properties_HttpTimeout_kt__pucqrr();
    return HttpTimeout;
  }
  var HttpTimeout;
  function HttpTimeoutCapability() {
    HttpTimeoutCapability_instance = this;
  }
  protoOf(HttpTimeoutCapability).toString = function () {
    return 'HttpTimeoutCapability';
  };
  protoOf(HttpTimeoutCapability).hashCode = function () {
    return 2058496954;
  };
  protoOf(HttpTimeoutCapability).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof HttpTimeoutCapability))
      return false;
    other instanceof HttpTimeoutCapability || THROW_CCE();
    return true;
  };
  var HttpTimeoutCapability_instance;
  function HttpTimeoutCapability_getInstance() {
    if (HttpTimeoutCapability_instance == null)
      new HttpTimeoutCapability();
    return HttpTimeoutCapability_instance;
  }
  function _get_url__e6i4g2($this) {
    return $this.url_1;
  }
  function _get_timeoutMillis__l1rx3q($this) {
    return $this.timeoutMillis_1;
  }
  function HttpRequestTimeoutException_init_$Init$(request, $this) {
    var tmp = request.get_url_18iuii_k$().buildString_xr87oh_k$();
    var tmp0_safe_receiver = request.getCapabilityOrNull_welm9h_k$(HttpTimeoutCapability_getInstance());
    HttpRequestTimeoutException.call($this, tmp, tmp0_safe_receiver == null ? null : tmp0_safe_receiver.get_requestTimeoutMillis_rgkxdt_k$());
    return $this;
  }
  function HttpRequestTimeoutException_init_$Create$(request) {
    var tmp = HttpRequestTimeoutException_init_$Init$(request, objectCreate(protoOf(HttpRequestTimeoutException)));
    captureStack(tmp, HttpRequestTimeoutException_init_$Create$);
    return tmp;
  }
  function HttpRequestTimeoutException_init_$Init$_0(request, $this) {
    var tmp = request.get_url_18iuii_k$().toString();
    var tmp0_safe_receiver = request.getCapabilityOrNull_xl2bq4_k$(HttpTimeoutCapability_getInstance());
    HttpRequestTimeoutException.call($this, tmp, tmp0_safe_receiver == null ? null : tmp0_safe_receiver.get_requestTimeoutMillis_rgkxdt_k$());
    return $this;
  }
  function HttpRequestTimeoutException_init_$Create$_0(request) {
    var tmp = HttpRequestTimeoutException_init_$Init$_0(request, objectCreate(protoOf(HttpRequestTimeoutException)));
    captureStack(tmp, HttpRequestTimeoutException_init_$Create$_0);
    return tmp;
  }
  function HttpRequestTimeoutException(url, timeoutMillis, cause) {
    cause = cause === VOID ? null : cause;
    IOException_init_$Init$('Request timeout has expired [url=' + url + ', request_timeout=' + toString(timeoutMillis == null ? 'unknown' : timeoutMillis) + ' ms]', cause, this);
    captureStack(this, HttpRequestTimeoutException);
    this.url_1 = url;
    this.timeoutMillis_1 = timeoutMillis;
  }
  protoOf(HttpRequestTimeoutException).createCopy_mmw9ld_k$ = function () {
    return new HttpRequestTimeoutException(this.url_1, this.timeoutMillis_1, this.cause);
  };
  function _set__requestTimeoutMillis__sraopa($this, _set____db54di) {
    $this._requestTimeoutMillis_1 = _set____db54di;
  }
  function _get__requestTimeoutMillis__mloc9m($this) {
    return $this._requestTimeoutMillis_1;
  }
  function _set__connectTimeoutMillis__byh7iv($this, _set____db54di) {
    $this._connectTimeoutMillis_1 = _set____db54di;
  }
  function _get__connectTimeoutMillis__i43jyj($this) {
    return $this._connectTimeoutMillis_1;
  }
  function _set__socketTimeoutMillis__e5zq02($this, _set____db54di) {
    $this._socketTimeoutMillis_1 = _set____db54di;
  }
  function _get__socketTimeoutMillis__7x1zq($this) {
    return $this._socketTimeoutMillis_1;
  }
  function HttpTimeoutConfig_init_$Init$(requestTimeoutMillis, connectTimeoutMillis, socketTimeoutMillis, $this) {
    requestTimeoutMillis = requestTimeoutMillis === VOID ? null : requestTimeoutMillis;
    connectTimeoutMillis = connectTimeoutMillis === VOID ? null : connectTimeoutMillis;
    socketTimeoutMillis = socketTimeoutMillis === VOID ? null : socketTimeoutMillis;
    HttpTimeoutConfig.call($this);
    $this.set_requestTimeoutMillis_xyy1t6_k$(requestTimeoutMillis);
    $this.set_connectTimeoutMillis_lkrilr_k$(connectTimeoutMillis);
    $this.set_socketTimeoutMillis_wmp1zo_k$(socketTimeoutMillis);
    return $this;
  }
  function HttpTimeoutConfig_init_$Create$(requestTimeoutMillis, connectTimeoutMillis, socketTimeoutMillis) {
    return HttpTimeoutConfig_init_$Init$(requestTimeoutMillis, connectTimeoutMillis, socketTimeoutMillis, objectCreate(protoOf(HttpTimeoutConfig)));
  }
  function checkTimeoutValue($this, value) {
    // Inline function 'kotlin.require' call
    if (!(value == null || value.compareTo_9jj042_k$(new Long(0, 0)) > 0)) {
      var message = 'Only positive timeout values are allowed, for infinite timeout use HttpTimeout.INFINITE_TIMEOUT_MS';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return value;
  }
  function Companion_1() {
    Companion_instance_1 = this;
    this.INFINITE_TIMEOUT_MS_1 = new Long(-1, 2147483647);
    var tmp = this;
    // Inline function 'io.ktor.util.AttributeKey' call
    var name = 'TimeoutConfiguration';
    // Inline function 'io.ktor.util.reflect.typeInfo' call
    var tmp_0 = getKClass(HttpTimeoutConfig);
    // Inline function 'io.ktor.util.reflect.typeOfOrNull' call
    var tmp_1;
    try {
      tmp_1 = createKType(getKClass(HttpTimeoutConfig), arrayOf([]), false);
    } catch ($p) {
      var tmp_2;
      if ($p instanceof Error) {
        var _unused_var__etf5q3 = $p;
        tmp_2 = null;
      } else {
        throw $p;
      }
      tmp_1 = tmp_2;
    }
    var tmp$ret$0 = tmp_1;
    var tmp$ret$1 = new TypeInfo(tmp_0, tmp$ret$0);
    tmp.key_1 = new AttributeKey(name, tmp$ret$1);
  }
  protoOf(Companion_1).get_INFINITE_TIMEOUT_MS_q3atc6_k$ = function () {
    return this.INFINITE_TIMEOUT_MS_1;
  };
  protoOf(Companion_1).get_key_18j28a_k$ = function () {
    return this.key_1;
  };
  var Companion_instance_1;
  function Companion_getInstance_10() {
    if (Companion_instance_1 == null)
      new Companion_1();
    return Companion_instance_1;
  }
  protoOf(HttpTimeoutConfig).set_requestTimeoutMillis_xyy1t6_k$ = function (value) {
    this._requestTimeoutMillis_1 = checkTimeoutValue(this, value);
  };
  protoOf(HttpTimeoutConfig).get_requestTimeoutMillis_rgkxdt_k$ = function () {
    return this._requestTimeoutMillis_1;
  };
  protoOf(HttpTimeoutConfig).set_connectTimeoutMillis_lkrilr_k$ = function (value) {
    this._connectTimeoutMillis_1 = checkTimeoutValue(this, value);
  };
  protoOf(HttpTimeoutConfig).get_connectTimeoutMillis_jog9kq_k$ = function () {
    return this._connectTimeoutMillis_1;
  };
  protoOf(HttpTimeoutConfig).set_socketTimeoutMillis_wmp1zo_k$ = function (value) {
    this._socketTimeoutMillis_1 = checkTimeoutValue(this, value);
  };
  protoOf(HttpTimeoutConfig).get_socketTimeoutMillis_3uzxud_k$ = function () {
    return this._socketTimeoutMillis_1;
  };
  protoOf(HttpTimeoutConfig).equals = function (other) {
    if (this === other)
      return true;
    if (other == null || !getKClassFromExpression(this).equals(getKClassFromExpression(other)))
      return false;
    if (!(other instanceof HttpTimeoutConfig))
      THROW_CCE();
    if (!equals(this._requestTimeoutMillis_1, other._requestTimeoutMillis_1))
      return false;
    if (!equals(this._connectTimeoutMillis_1, other._connectTimeoutMillis_1))
      return false;
    if (!equals(this._socketTimeoutMillis_1, other._socketTimeoutMillis_1))
      return false;
    return true;
  };
  protoOf(HttpTimeoutConfig).hashCode = function () {
    var tmp0_safe_receiver = this._requestTimeoutMillis_1;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.hashCode();
    var result = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
    var tmp = imul(31, result);
    var tmp2_safe_receiver = this._connectTimeoutMillis_1;
    var tmp3_elvis_lhs = tmp2_safe_receiver == null ? null : tmp2_safe_receiver.hashCode();
    result = tmp + (tmp3_elvis_lhs == null ? 0 : tmp3_elvis_lhs) | 0;
    var tmp_0 = imul(31, result);
    var tmp4_safe_receiver = this._socketTimeoutMillis_1;
    var tmp5_elvis_lhs = tmp4_safe_receiver == null ? null : tmp4_safe_receiver.hashCode();
    result = tmp_0 + (tmp5_elvis_lhs == null ? 0 : tmp5_elvis_lhs) | 0;
    return result;
  };
  function HttpTimeoutConfig() {
    Companion_getInstance_10();
    this._requestTimeoutMillis_1 = new Long(0, 0);
    this._connectTimeoutMillis_1 = new Long(0, 0);
    this._socketTimeoutMillis_1 = new Long(0, 0);
  }
  function unwrapRequestTimeoutException(block) {
    _init_properties_HttpTimeout_kt__pucqrr();
    try {
      return block();
    } catch ($p) {
      if ($p instanceof CancellationException) {
        var cause = $p;
        throw unwrapCancellationException(cause);
      } else {
        throw $p;
      }
    }
  }
  function HttpTimeout$lambda() {
    return HttpTimeoutConfig_init_$Create$();
  }
  function HttpTimeout$_init_$ref_7xs6ks() {
    return function () {
      return HttpTimeout$lambda();
    };
  }
  function HttpTimeout$lambda_0($this$createClientPlugin) {
    _init_properties_HttpTimeout_kt__pucqrr();
    var requestTimeoutMillis = $this$createClientPlugin.get_pluginConfig_p50bdq_k$().get_requestTimeoutMillis_rgkxdt_k$();
    var connectTimeoutMillis = $this$createClientPlugin.get_pluginConfig_p50bdq_k$().get_connectTimeoutMillis_jog9kq_k$();
    var socketTimeoutMillis = $this$createClientPlugin.get_pluginConfig_p50bdq_k$().get_socketTimeoutMillis_3uzxud_k$();
    var tmp = Send_getInstance();
    $this$createClientPlugin.on_z1oiz_k$(tmp, HttpTimeout$lambda$slambda_0(connectTimeoutMillis, socketTimeoutMillis, requestTimeoutMillis, null));
    return Unit_getInstance();
  }
  function invoke$hasNotNullTimeouts(requestTimeoutMillis, connectTimeoutMillis, socketTimeoutMillis) {
    return !(requestTimeoutMillis == null) || !(connectTimeoutMillis == null) || !(socketTimeoutMillis == null);
  }
  function HttpTimeout$lambda$slambda$slambda($requestTimeout, $request, $executionContext, resultContinuation) {
    this.$requestTimeout_1 = $requestTimeout;
    this.$request_1 = $request;
    this.$executionContext_1 = $executionContext;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(HttpTimeout$lambda$slambda$slambda).invoke_d9fzmj_k$ = function ($this$launch, $completion) {
    var tmp = this.create_rcuf4x_k$($this$launch, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(HttpTimeout$lambda$slambda$slambda).invoke_qns8j1_k$ = function (p1, $completion) {
    return this.invoke_d9fzmj_k$((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(HttpTimeout$lambda$slambda$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = delay(this.$requestTimeout_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var cause = HttpRequestTimeoutException_init_$Create$(this.$request_1);
            get_LOGGER_7().trace_fti9bv_k$('Request timeout: ' + this.$request_1.get_url_18iuii_k$().toString());
            cancel_2(this.$executionContext_1, ensureNotNull(cause.message), cause);
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
  protoOf(HttpTimeout$lambda$slambda$slambda).create_rcuf4x_k$ = function ($this$launch, completion) {
    var i = new HttpTimeout$lambda$slambda$slambda(this.$requestTimeout_1, this.$request_1, this.$executionContext_1, completion);
    i.$this$launch_1 = $this$launch;
    return i;
  };
  protoOf(HttpTimeout$lambda$slambda$slambda).create_wyq9v6_k$ = function (value, completion) {
    return this.create_rcuf4x_k$((!(value == null) ? isInterface(value, CoroutineScope) : false) ? value : THROW_CCE(), completion);
  };
  function HttpTimeout$lambda$slambda$slambda_0($requestTimeout, $request, $executionContext, resultContinuation) {
    var i = new HttpTimeout$lambda$slambda$slambda($requestTimeout, $request, $executionContext, resultContinuation);
    var l = function ($this$launch, $completion) {
      return i.invoke_d9fzmj_k$($this$launch, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function HttpTimeout$lambda$slambda$lambda($killer) {
    return function (it) {
      $killer.cancel$default_8haxne_k$();
      return Unit_getInstance();
    };
  }
  function HttpTimeout$lambda$slambda($connectTimeoutMillis, $socketTimeoutMillis, $requestTimeoutMillis, resultContinuation) {
    this.$connectTimeoutMillis_1 = $connectTimeoutMillis;
    this.$socketTimeoutMillis_1 = $socketTimeoutMillis;
    this.$requestTimeoutMillis_1 = $requestTimeoutMillis;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(HttpTimeout$lambda$slambda).invoke_utn3hl_k$ = function ($this$on, request, $completion) {
    var tmp = this.create_xzj40p_k$($this$on, request, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(HttpTimeout$lambda$slambda).invoke_4tzzq6_k$ = function (p1, p2, $completion) {
    var tmp = p1 instanceof Sender_0 ? p1 : THROW_CCE();
    return this.invoke_utn3hl_k$(tmp, p2 instanceof HttpRequestBuilder ? p2 : THROW_CCE(), $completion);
  };
  protoOf(HttpTimeout$lambda$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(4);
            this.isWebSocket0__1 = isWebsocket(this.request_1.get_url_18iuii_k$().get_protocol_mv93kx_k$());
            var tmp_0;
            var tmp_1;
            if (this.isWebSocket0__1) {
              tmp_1 = true;
            } else {
              var tmp_2 = this.request_1.get_body_wojkyz_k$();
              tmp_1 = tmp_2 instanceof ClientUpgradeContent;
            }

            if (tmp_1) {
              tmp_0 = true;
            } else {
              var tmp_3 = this.request_1.get_body_wojkyz_k$();
              tmp_0 = tmp_3 instanceof SSEClientContent;
            }

            if (tmp_0) {
              this.set_state_rjd8d0_k$(3);
              suspendResult = this.$this$on_1.proceed_xu9ptb_k$(this.request_1, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.set_state_rjd8d0_k$(1);
              continue $sm;
            }

          case 1:
            this.configuration1__1 = this.request_1.getCapabilityOrNull_welm9h_k$(HttpTimeoutCapability_getInstance());
            if (this.configuration1__1 == null && invoke$hasNotNullTimeouts(this.$requestTimeoutMillis_1, this.$connectTimeoutMillis_1, this.$socketTimeoutMillis_1)) {
              this.configuration1__1 = HttpTimeoutConfig_init_$Create$();
              this.request_1.setCapability_di4fgr_k$(HttpTimeoutCapability_getInstance(), this.configuration1__1);
            }

            var tmp0_safe_receiver = this.configuration1__1;
            if (tmp0_safe_receiver == null)
              null;
            else {
              l$ret$1: do {
                var tmp0_elvis_lhs = tmp0_safe_receiver.get_connectTimeoutMillis_jog9kq_k$();
                tmp0_safe_receiver.set_connectTimeoutMillis_lkrilr_k$(tmp0_elvis_lhs == null ? this.$connectTimeoutMillis_1 : tmp0_elvis_lhs);
                var tmp1_elvis_lhs = tmp0_safe_receiver.get_socketTimeoutMillis_3uzxud_k$();
                tmp0_safe_receiver.set_socketTimeoutMillis_wmp1zo_k$(tmp1_elvis_lhs == null ? this.$socketTimeoutMillis_1 : tmp1_elvis_lhs);
                var tmp2_elvis_lhs = tmp0_safe_receiver.get_requestTimeoutMillis_rgkxdt_k$();
                tmp0_safe_receiver.set_requestTimeoutMillis_xyy1t6_k$(tmp2_elvis_lhs == null ? this.$requestTimeoutMillis_1 : tmp2_elvis_lhs);
                var requestTimeout = tmp0_safe_receiver.get_requestTimeoutMillis_rgkxdt_k$();
                if (requestTimeout == null || equals(requestTimeout, new Long(-1, 2147483647))) {
                  break l$ret$1;
                }
                var executionContext = this.request_1.get_executionContext_yb2vgg_k$();
                var killer = launch(this.$this$on_1, VOID, VOID, HttpTimeout$lambda$slambda$slambda_0(requestTimeout, this.request_1, executionContext, null));
                var tmp_4 = this.request_1.get_executionContext_yb2vgg_k$();
                tmp_4.invokeOnCompletion_n6cffu_k$(HttpTimeout$lambda$slambda$lambda(killer));
              }
               while (false);
            }

            this.set_state_rjd8d0_k$(2);
            suspendResult = this.$this$on_1.proceed_xu9ptb_k$(this.request_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            return suspendResult;
          case 3:
            return suspendResult;
          case 4:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 4) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  protoOf(HttpTimeout$lambda$slambda).create_xzj40p_k$ = function ($this$on, request, completion) {
    var i = new HttpTimeout$lambda$slambda(this.$connectTimeoutMillis_1, this.$socketTimeoutMillis_1, this.$requestTimeoutMillis_1, completion);
    i.$this$on_1 = $this$on;
    i.request_1 = request;
    return i;
  };
  function HttpTimeout$lambda$slambda_0($connectTimeoutMillis, $socketTimeoutMillis, $requestTimeoutMillis, resultContinuation) {
    var i = new HttpTimeout$lambda$slambda($connectTimeoutMillis, $socketTimeoutMillis, $requestTimeoutMillis, resultContinuation);
    var l = function ($this$on, request, $completion) {
      return i.invoke_utn3hl_k$($this$on, request, $completion);
    };
    l.$arity = 2;
    return l;
  }
  var properties_initialized_HttpTimeout_kt_9oyjbd;
  function _init_properties_HttpTimeout_kt__pucqrr() {
    if (!properties_initialized_HttpTimeout_kt_9oyjbd) {
      properties_initialized_HttpTimeout_kt_9oyjbd = true;
      LOGGER_7 = KtorSimpleLogger('io.ktor.client.plugins.HttpTimeout');
      var tmp = HttpTimeout$_init_$ref_7xs6ks();
      HttpTimeout = createClientPlugin_0('HttpTimeout', tmp, HttpTimeout$lambda_0);
    }
  }
  function get_LOGGER_8() {
    _init_properties_UserAgent_kt__w65p14();
    return LOGGER_8;
  }
  var LOGGER_8;
  function get_UserAgent() {
    _init_properties_UserAgent_kt__w65p14();
    return UserAgent;
  }
  var UserAgent;
  function UserAgentConfig(agent) {
    agent = agent === VOID ? 'Ktor http-client' : agent;
    this.agent_1 = agent;
  }
  protoOf(UserAgentConfig).set_agent_v0vghq_k$ = function (_set____db54di) {
    this.agent_1 = _set____db54di;
  };
  protoOf(UserAgentConfig).get_agent_iolejg_k$ = function () {
    return this.agent_1;
  };
  function UserAgent$lambda() {
    return new UserAgentConfig();
  }
  function UserAgent$_init_$ref_swa1yj() {
    return function () {
      return UserAgent$lambda();
    };
  }
  function UserAgent$lambda_0($this$createClientPlugin) {
    _init_properties_UserAgent_kt__w65p14();
    var agent = $this$createClientPlugin.get_pluginConfig_p50bdq_k$().agent_1;
    $this$createClientPlugin.onRequest_fk8bil_k$(UserAgent$lambda$slambda_0(agent, null));
    return Unit_getInstance();
  }
  function UserAgent$lambda$slambda($agent, resultContinuation) {
    this.$agent_1 = $agent;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(UserAgent$lambda$slambda).invoke_kmyxfe_k$ = function ($this$onRequest, request, _unused_var__etf5q3, $completion) {
    var tmp = this.create_8y4bpu_k$($this$onRequest, request, _unused_var__etf5q3, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(UserAgent$lambda$slambda).invoke_ihdh7y_k$ = function (p1, p2, p3, $completion) {
    var tmp = p1 instanceof OnRequestContext ? p1 : THROW_CCE();
    var tmp_0 = p2 instanceof HttpRequestBuilder ? p2 : THROW_CCE();
    return this.invoke_kmyxfe_k$(tmp, tmp_0, !(p3 == null) ? p3 : THROW_CCE(), $completion);
  };
  protoOf(UserAgent$lambda$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        if (tmp === 0) {
          this.set_exceptionState_fex74n_k$(1);
          get_LOGGER_8().trace_fti9bv_k$('Adding User-Agent header: agent for ' + this.request_1.get_url_18iuii_k$().toString());
          header(this.request_1, HttpHeaders_getInstance().get_UserAgent_o827rj_k$(), this.$agent_1);
          return Unit_getInstance();
        } else if (tmp === 1) {
          throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        throw e;
      }
     while (true);
  };
  protoOf(UserAgent$lambda$slambda).create_8y4bpu_k$ = function ($this$onRequest, request, _unused_var__etf5q3, completion) {
    var i = new UserAgent$lambda$slambda(this.$agent_1, completion);
    i.$this$onRequest_1 = $this$onRequest;
    i.request_1 = request;
    i._unused_var__etf5q3__1 = _unused_var__etf5q3;
    return i;
  };
  function UserAgent$lambda$slambda_0($agent, resultContinuation) {
    var i = new UserAgent$lambda$slambda($agent, resultContinuation);
    var l = function ($this$onRequest, request, _unused_var__etf5q3, $completion) {
      return i.invoke_kmyxfe_k$($this$onRequest, request, _unused_var__etf5q3, $completion);
    };
    l.$arity = 3;
    return l;
  }
  var properties_initialized_UserAgent_kt_pu3g16;
  function _init_properties_UserAgent_kt__w65p14() {
    if (!properties_initialized_UserAgent_kt_pu3g16) {
      properties_initialized_UserAgent_kt_pu3g16 = true;
      LOGGER_8 = KtorSimpleLogger('io.ktor.client.plugins.UserAgent');
      var tmp = UserAgent$_init_$ref_swa1yj();
      UserAgent = createClientPlugin_0('UserAgent', tmp, UserAgent$lambda_0);
    }
  }
  function ClientHook() {
  }
  function _get_hook__d7qcnc($this) {
    return $this.hook_1;
  }
  function _get_handler__z70553($this) {
    return $this.handler_1;
  }
  function HookHandler(hook, handler) {
    this.hook_1 = hook;
    this.handler_1 = handler;
  }
  protoOf(HookHandler).install_ve6kwc_k$ = function (client) {
    this.hook_1.install_o8nink_k$(client, this.handler_1);
  };
  function ClientPluginBuilder$onClose$lambda() {
    return Unit_getInstance();
  }
  function ClientPluginBuilder(key, client, pluginConfig) {
    this.key_1 = key;
    this.client_1 = client;
    this.pluginConfig_1 = pluginConfig;
    var tmp = this;
    // Inline function 'kotlin.collections.mutableListOf' call
    tmp.hooks_1 = ArrayList_init_$Create$();
    var tmp_0 = this;
    tmp_0.onClose_1 = ClientPluginBuilder$onClose$lambda;
  }
  protoOf(ClientPluginBuilder).get_key_mv8c2f_k$ = function () {
    return this.key_1;
  };
  protoOf(ClientPluginBuilder).get_client_byfnx0_k$ = function () {
    return this.client_1;
  };
  protoOf(ClientPluginBuilder).get_pluginConfig_p50bdq_k$ = function () {
    return this.pluginConfig_1;
  };
  protoOf(ClientPluginBuilder).get_hooks_7wwls6_k$ = function () {
    return this.hooks_1;
  };
  protoOf(ClientPluginBuilder).set_onClose_zgvgxj_k$ = function (_set____db54di) {
    this.onClose_1 = _set____db54di;
  };
  protoOf(ClientPluginBuilder).get_onClose_jlpb8d_k$ = function () {
    return this.onClose_1;
  };
  protoOf(ClientPluginBuilder).onRequest_fk8bil_k$ = function (block) {
    this.on_z1oiz_k$(RequestHook_getInstance(), block);
  };
  protoOf(ClientPluginBuilder).onResponse_koh080_k$ = function (block) {
    this.on_z1oiz_k$(ResponseHook_getInstance(), block);
  };
  protoOf(ClientPluginBuilder).transformRequestBody_immy9t_k$ = function (block) {
    this.on_z1oiz_k$(TransformRequestBodyHook_getInstance(), block);
  };
  protoOf(ClientPluginBuilder).transformResponseBody_ee7rr5_k$ = function (block) {
    this.on_z1oiz_k$(TransformResponseBodyHook_getInstance(), block);
  };
  protoOf(ClientPluginBuilder).onClose_mlm2qn_k$ = function (block) {
    this.onClose_1 = block;
  };
  protoOf(ClientPluginBuilder).on_z1oiz_k$ = function (hook, handler) {
    this.hooks_1.add_utx5q5_k$(new HookHandler(hook, handler));
  };
  function _get_key__e6bh8y($this) {
    return $this.key_1;
  }
  function _get_config__hi7kzb($this) {
    return $this.config_1;
  }
  function _get_body__d4fd9l_0($this) {
    return $this.body_1;
  }
  function _set_onClose__6ylwss($this, _set____db54di) {
    $this.onClose_1 = _set____db54di;
  }
  function _get_onClose__inmdk8($this) {
    return $this.onClose_1;
  }
  function ClientPluginInstance$onClose$lambda() {
    return Unit_getInstance();
  }
  function ClientPluginInstance(key, config, body) {
    this.key_1 = key;
    this.config_1 = config;
    this.body_1 = body;
    var tmp = this;
    tmp.onClose_1 = ClientPluginInstance$onClose$lambda;
  }
  protoOf(ClientPluginInstance).install_ve6kwc_k$ = function (scope) {
    var tmp0 = new ClientPluginBuilder(this.key_1, scope, this.config_1);
    // Inline function 'kotlin.apply' call
    this.body_1(tmp0);
    var pluginBuilder = tmp0;
    this.onClose_1 = pluginBuilder.get_onClose_jlpb8d_k$();
    // Inline function 'kotlin.collections.forEach' call
    var _iterator__ex2g4s = pluginBuilder.get_hooks_7wwls6_k$().iterator_jk1svi_k$();
    while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
      var element = _iterator__ex2g4s.next_20eer_k$();
      element.install_ve6kwc_k$(scope);
    }
  };
  protoOf(ClientPluginInstance).close_yn9xrc_k$ = function () {
    this.onClose_1();
  };
  function SetupRequest$install$slambda($handler, resultContinuation) {
    this.$handler_1 = $handler;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(SetupRequest$install$slambda).invoke_wpcgmu_k$ = function ($this$intercept, it, $completion) {
    var tmp = this.create_l3tkcm_k$($this$intercept, it, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(SetupRequest$install$slambda).invoke_4tzzq6_k$ = function (p1, p2, $completion) {
    var tmp = p1 instanceof PipelineContext ? p1 : THROW_CCE();
    return this.invoke_wpcgmu_k$(tmp, !(p2 == null) ? p2 : THROW_CCE(), $completion);
  };
  protoOf(SetupRequest$install$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = this.$handler_1(this.$this$intercept_1.get_context_h02k06_k$(), this);
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
  protoOf(SetupRequest$install$slambda).create_l3tkcm_k$ = function ($this$intercept, it, completion) {
    var i = new SetupRequest$install$slambda(this.$handler_1, completion);
    i.$this$intercept_1 = $this$intercept;
    i.it_1 = it;
    return i;
  };
  function SetupRequest$install$slambda_0($handler, resultContinuation) {
    var i = new SetupRequest$install$slambda($handler, resultContinuation);
    var l = function ($this$intercept, it, $completion) {
      return i.invoke_wpcgmu_k$($this$intercept, it, $completion);
    };
    l.$arity = 2;
    return l;
  }
  function SetupRequest() {
    SetupRequest_instance = this;
  }
  protoOf(SetupRequest).install_no68ft_k$ = function (client, handler) {
    var tmp = client.get_requestPipeline_5d9z6w_k$();
    var tmp_0 = Phases_getInstance().get_Before_3ry4pk_k$();
    tmp.intercept_k21bv3_k$(tmp_0, SetupRequest$install$slambda_0(handler, null));
  };
  protoOf(SetupRequest).install_o8nink_k$ = function (client, handler) {
    return this.install_no68ft_k$(client, (!(handler == null) ? isSuspendFunction(handler, 1) : false) ? handler : THROW_CCE());
  };
  var SetupRequest_instance;
  function SetupRequest_getInstance() {
    if (SetupRequest_instance == null)
      new SetupRequest();
    return SetupRequest_instance;
  }
  function _get_httpSendSender__94nsgq($this) {
    return $this.httpSendSender_1;
  }
  function Sender_0(httpSendSender, coroutineContext) {
    this.httpSendSender_1 = httpSendSender;
    this.coroutineContext_1 = coroutineContext;
  }
  protoOf(Sender_0).get_coroutineContext_115oqo_k$ = function () {
    return this.coroutineContext_1;
  };
  protoOf(Sender_0).proceed_xu9ptb_k$ = function (requestBuilder, $completion) {
    return this.httpSendSender_1.execute_o54lze_k$(requestBuilder, $completion);
  };
  function Send$install$slambda($handler, $client, resultContinuation) {
    this.$handler_1 = $handler;
    this.$client_1 = $client;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(Send$install$slambda).invoke_3oljyb_k$ = function ($this$intercept, request, $completion) {
    var tmp = this.create_pd045v_k$($this$intercept, request, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(Send$install$slambda).invoke_4tzzq6_k$ = function (p1, p2, $completion) {
    var tmp = (!(p1 == null) ? isInterface(p1, Sender) : false) ? p1 : THROW_CCE();
    return this.invoke_3oljyb_k$(tmp, p2 instanceof HttpRequestBuilder ? p2 : THROW_CCE(), $completion);
  };
  protoOf(Send$install$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = this.$handler_1(new Sender_0(this.$this$intercept_1, this.$client_1.get_coroutineContext_115oqo_k$()), this.request_1, this);
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
  protoOf(Send$install$slambda).create_pd045v_k$ = function ($this$intercept, request, completion) {
    var i = new Send$install$slambda(this.$handler_1, this.$client_1, completion);
    i.$this$intercept_1 = $this$intercept;
    i.request_1 = request;
    return i;
  };
  function Send$install$slambda_0($handler, $client, resultContinuation) {
    var i = new Send$install$slambda($handler, $client, resultContinuation);
    var l = function ($this$intercept, request, $completion) {
      return i.invoke_3oljyb_k$($this$intercept, request, $completion);
    };
    l.$arity = 2;
    return l;
  }
  function Send() {
    Send_instance = this;
  }
  protoOf(Send).install_v0czh3_k$ = function (client, handler) {
    var tmp = plugin(client, Plugin_getInstance());
    tmp.intercept_abqmrc_k$(Send$install$slambda_0(handler, client, null));
  };
  protoOf(Send).install_o8nink_k$ = function (client, handler) {
    return this.install_v0czh3_k$(client, (!(handler == null) ? isSuspendFunction(handler, 2) : false) ? handler : THROW_CCE());
  };
  var Send_instance;
  function Send_getInstance() {
    if (Send_instance == null)
      new Send();
    return Send_instance;
  }
  function ClientPlugin() {
  }
  function createClientPlugin(name, body) {
    return createClientPlugin_0(name, createClientPlugin$lambda, body);
  }
  function createClientPlugin_0(name, createConfiguration, body) {
    return new ClientPluginImpl(name, createConfiguration, body);
  }
  function _get_createConfiguration__xq3ddj($this) {
    return $this.createConfiguration_1;
  }
  function _get_body__d4fd9l_1($this) {
    return $this.body_1;
  }
  function ClientPluginImpl(name, createConfiguration, body) {
    this.createConfiguration_1 = createConfiguration;
    this.body_1 = body;
    var tmp = this;
    // Inline function 'io.ktor.util.AttributeKey' call
    // Inline function 'io.ktor.util.reflect.typeInfo' call
    var tmp_0 = getKClass(ClientPluginInstance);
    // Inline function 'io.ktor.util.reflect.typeOfOrNull' call
    var tmp_1;
    try {
      tmp_1 = createKType(getKClass(ClientPluginInstance), arrayOf([createInvariantKTypeProjection(createKType(createKTypeParameter('PluginConfigT', arrayOf([createKType(PrimitiveClasses_getInstance().get_anyClass_x0jl4l_k$(), arrayOf([]), false)]), 'invariant', false), arrayOf([]), false))]), false);
    } catch ($p) {
      var tmp_2;
      if ($p instanceof Error) {
        var _unused_var__etf5q3 = $p;
        tmp_2 = null;
      } else {
        throw $p;
      }
      tmp_1 = tmp_2;
    }
    var tmp$ret$0 = tmp_1;
    var tmp$ret$1 = new TypeInfo(tmp_0, tmp$ret$0);
    tmp.key_1 = new AttributeKey(name, tmp$ret$1);
  }
  protoOf(ClientPluginImpl).get_key_18j28a_k$ = function () {
    return this.key_1;
  };
  protoOf(ClientPluginImpl).prepare_virsx7_k$ = function (block) {
    // Inline function 'kotlin.apply' call
    var this_0 = this.createConfiguration_1();
    block(this_0);
    var config = this_0;
    return new ClientPluginInstance(this.key_1, config, this.body_1);
  };
  protoOf(ClientPluginImpl).prepare_t1xtpw_k$ = function (block) {
    return this.prepare_virsx7_k$(block);
  };
  protoOf(ClientPluginImpl).install_kp4phe_k$ = function (plugin, scope) {
    plugin.install_ve6kwc_k$(scope);
  };
  protoOf(ClientPluginImpl).install_kxaehd_k$ = function (plugin, scope) {
    return this.install_kp4phe_k$(plugin instanceof ClientPluginInstance ? plugin : THROW_CCE(), scope);
  };
  function createClientPlugin$lambda() {
    return Unit_getInstance();
  }
  function TransformResponseBodyContext() {
  }
  function OnRequestContext() {
  }
  function RequestHook$install$slambda($handler, resultContinuation) {
    this.$handler_1 = $handler;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(RequestHook$install$slambda).invoke_wpcgmu_k$ = function ($this$intercept, it, $completion) {
    var tmp = this.create_l3tkcm_k$($this$intercept, it, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(RequestHook$install$slambda).invoke_4tzzq6_k$ = function (p1, p2, $completion) {
    var tmp = p1 instanceof PipelineContext ? p1 : THROW_CCE();
    return this.invoke_wpcgmu_k$(tmp, !(p2 == null) ? p2 : THROW_CCE(), $completion);
  };
  protoOf(RequestHook$install$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = this.$handler_1(new OnRequestContext(), this.$this$intercept_1.get_context_h02k06_k$(), this.$this$intercept_1.get_subject_tmjbgd_k$(), this);
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
  protoOf(RequestHook$install$slambda).create_l3tkcm_k$ = function ($this$intercept, it, completion) {
    var i = new RequestHook$install$slambda(this.$handler_1, completion);
    i.$this$intercept_1 = $this$intercept;
    i.it_1 = it;
    return i;
  };
  function RequestHook$install$slambda_0($handler, resultContinuation) {
    var i = new RequestHook$install$slambda($handler, resultContinuation);
    var l = function ($this$intercept, it, $completion) {
      return i.invoke_wpcgmu_k$($this$intercept, it, $completion);
    };
    l.$arity = 2;
    return l;
  }
  function RequestHook() {
    RequestHook_instance = this;
  }
  protoOf(RequestHook).install_9jg74v_k$ = function (client, handler) {
    var tmp = client.get_requestPipeline_5d9z6w_k$();
    var tmp_0 = Phases_getInstance().get_State_ih4i88_k$();
    tmp.intercept_k21bv3_k$(tmp_0, RequestHook$install$slambda_0(handler, null));
  };
  protoOf(RequestHook).install_o8nink_k$ = function (client, handler) {
    return this.install_9jg74v_k$(client, (!(handler == null) ? isSuspendFunction(handler, 3) : false) ? handler : THROW_CCE());
  };
  var RequestHook_instance;
  function RequestHook_getInstance() {
    if (RequestHook_instance == null)
      new RequestHook();
    return RequestHook_instance;
  }
  function OnResponseContext() {
  }
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
            suspendResult = this.$handler_1(new OnResponseContext(), this.$this$intercept_1.get_subject_tmjbgd_k$(), this);
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
  protoOf(ResponseHook).install_mug9tw_k$ = function (client, handler) {
    var tmp = client.get_receivePipeline_3qwhq4_k$();
    var tmp_0 = Phases_getInstance_1().get_State_ih4i88_k$();
    tmp.intercept_k21bv3_k$(tmp_0, ResponseHook$install$slambda_0(handler, null));
  };
  protoOf(ResponseHook).install_o8nink_k$ = function (client, handler) {
    return this.install_mug9tw_k$(client, (!(handler == null) ? isSuspendFunction(handler, 2) : false) ? handler : THROW_CCE());
  };
  var ResponseHook_instance;
  function ResponseHook_getInstance() {
    if (ResponseHook_instance == null)
      new ResponseHook();
    return ResponseHook_instance;
  }
  function TransformRequestBodyContext() {
  }
  function TransformRequestBodyHook$install$slambda($handler, resultContinuation) {
    this.$handler_1 = $handler;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(TransformRequestBodyHook$install$slambda).invoke_wpcgmu_k$ = function ($this$intercept, it, $completion) {
    var tmp = this.create_l3tkcm_k$($this$intercept, it, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(TransformRequestBodyHook$install$slambda).invoke_4tzzq6_k$ = function (p1, p2, $completion) {
    var tmp = p1 instanceof PipelineContext ? p1 : THROW_CCE();
    return this.invoke_wpcgmu_k$(tmp, !(p2 == null) ? p2 : THROW_CCE(), $completion);
  };
  protoOf(TransformRequestBodyHook$install$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(4);
            this.set_state_rjd8d0_k$(1);
            suspendResult = this.$handler_1(new TransformRequestBodyContext(), this.$this$intercept_1.get_context_h02k06_k$(), this.$this$intercept_1.get_subject_tmjbgd_k$(), this.$this$intercept_1.get_context_h02k06_k$().get_bodyType_3n7prv_k$(), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.newContent0__1 = suspendResult;
            if (!(this.newContent0__1 == null)) {
              this.set_state_rjd8d0_k$(2);
              suspendResult = this.$this$intercept_1.proceedWith_i5skhv_k$(this.newContent0__1, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.set_state_rjd8d0_k$(3);
              continue $sm;
            }

          case 2:
            this.set_state_rjd8d0_k$(3);
            continue $sm;
          case 3:
            return Unit_getInstance();
          case 4:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 4) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  protoOf(TransformRequestBodyHook$install$slambda).create_l3tkcm_k$ = function ($this$intercept, it, completion) {
    var i = new TransformRequestBodyHook$install$slambda(this.$handler_1, completion);
    i.$this$intercept_1 = $this$intercept;
    i.it_1 = it;
    return i;
  };
  function TransformRequestBodyHook$install$slambda_0($handler, resultContinuation) {
    var i = new TransformRequestBodyHook$install$slambda($handler, resultContinuation);
    var l = function ($this$intercept, it, $completion) {
      return i.invoke_wpcgmu_k$($this$intercept, it, $completion);
    };
    l.$arity = 2;
    return l;
  }
  function TransformRequestBodyHook() {
    TransformRequestBodyHook_instance = this;
  }
  protoOf(TransformRequestBodyHook).install_ltktd6_k$ = function (client, handler) {
    var tmp = client.get_requestPipeline_5d9z6w_k$();
    var tmp_0 = Phases_getInstance().get_Transform_byqycd_k$();
    tmp.intercept_k21bv3_k$(tmp_0, TransformRequestBodyHook$install$slambda_0(handler, null));
  };
  protoOf(TransformRequestBodyHook).install_o8nink_k$ = function (client, handler) {
    return this.install_ltktd6_k$(client, (!(handler == null) ? isSuspendFunction(handler, 4) : false) ? handler : THROW_CCE());
  };
  var TransformRequestBodyHook_instance;
  function TransformRequestBodyHook_getInstance() {
    if (TransformRequestBodyHook_instance == null)
      new TransformRequestBodyHook();
    return TransformRequestBodyHook_instance;
  }
  function TransformResponseBodyHook$install$slambda($handler, resultContinuation) {
    this.$handler_1 = $handler;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(TransformResponseBodyHook$install$slambda).invoke_b1ivo5_k$ = function ($this$intercept, it, $completion) {
    var tmp = this.create_aalyq9_k$($this$intercept, it, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(TransformResponseBodyHook$install$slambda).invoke_4tzzq6_k$ = function (p1, p2, $completion) {
    var tmp = p1 instanceof PipelineContext ? p1 : THROW_CCE();
    return this.invoke_b1ivo5_k$(tmp, p2 instanceof HttpResponseContainer ? p2 : THROW_CCE(), $completion);
  };
  protoOf(TransformResponseBodyHook$install$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(3);
            this._destruct_0_gwiw3o_1 = this.$this$intercept_1.get_subject_tmjbgd_k$();
            this.typeInfo1__1 = this._destruct_0_gwiw3o_1.component1_7eebsc_k$();
            this.content2__1 = this._destruct_0_gwiw3o_1.component2_7eebsb_k$();
            var tmp_0 = this.content2__1;
            if (!isInterface(tmp_0, ByteReadChannel))
              return Unit_getInstance();
            this.set_state_rjd8d0_k$(1);
            suspendResult = this.$handler_1(new TransformResponseBodyContext(), this.$this$intercept_1.get_context_h02k06_k$().get_response_xlk07e_k$(), this.content2__1, this.typeInfo1__1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.tmp0_elvis_lhs3__1 = suspendResult;
            var tmp_1 = this;
            var tmp_2;
            if (this.tmp0_elvis_lhs3__1 == null) {
              return Unit_getInstance();
            } else {
              tmp_2 = this.tmp0_elvis_lhs3__1;
            }

            tmp_1.newContent4__1 = tmp_2;
            var tmp_3;
            var tmp_4 = this.newContent4__1;
            if (!(tmp_4 instanceof NullBody)) {
              tmp_3 = !this.typeInfo1__1.get_type_wovaf7_k$().isInstance_6tn68w_k$(this.newContent4__1);
            } else {
              tmp_3 = false;
            }

            if (tmp_3) {
              throw IllegalStateException_init_$Create$('transformResponseBody returned ' + toString(this.newContent4__1) + ' but expected value of type ' + this.typeInfo1__1.toString());
            }

            this.set_state_rjd8d0_k$(2);
            suspendResult = this.$this$intercept_1.proceedWith_i5skhv_k$(new HttpResponseContainer(this.typeInfo1__1, this.newContent4__1), this);
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
  protoOf(TransformResponseBodyHook$install$slambda).create_aalyq9_k$ = function ($this$intercept, it, completion) {
    var i = new TransformResponseBodyHook$install$slambda(this.$handler_1, completion);
    i.$this$intercept_1 = $this$intercept;
    i.it_1 = it;
    return i;
  };
  function TransformResponseBodyHook$install$slambda_0($handler, resultContinuation) {
    var i = new TransformResponseBodyHook$install$slambda($handler, resultContinuation);
    var l = function ($this$intercept, it, $completion) {
      return i.invoke_b1ivo5_k$($this$intercept, it, $completion);
    };
    l.$arity = 2;
    return l;
  }
  function TransformResponseBodyHook() {
    TransformResponseBodyHook_instance = this;
  }
  protoOf(TransformResponseBodyHook).install_ttpvsk_k$ = function (client, handler) {
    var tmp = client.get_responsePipeline_xbi790_k$();
    var tmp_0 = Phases_getInstance_2().get_Transform_byqycd_k$();
    tmp.intercept_k21bv3_k$(tmp_0, TransformResponseBodyHook$install$slambda_0(handler, null));
  };
  protoOf(TransformResponseBodyHook).install_o8nink_k$ = function (client, handler) {
    return this.install_ttpvsk_k$(client, (!(handler == null) ? isSuspendFunction(handler, 4) : false) ? handler : THROW_CCE());
  };
  var TransformResponseBodyHook_instance;
  function TransformResponseBodyHook_getInstance() {
    if (TransformResponseBodyHook_instance == null)
      new TransformResponseBodyHook();
    return TransformResponseBodyHook_instance;
  }
  function get_LOGGER_9() {
    _init_properties_HttpCache_kt__w3juvs();
    return LOGGER_9;
  }
  var LOGGER_9;
  var properties_initialized_HttpCache_kt_wph2h6;
  function _init_properties_HttpCache_kt__w3juvs() {
    if (!properties_initialized_HttpCache_kt_wph2h6) {
      properties_initialized_HttpCache_kt_wph2h6 = true;
      LOGGER_9 = KtorSimpleLogger('io.ktor.client.plugins.HttpCache');
    }
  }
  function get_LOGGER_10() {
    _init_properties_HttpCookies_kt__vu19yt();
    return LOGGER_10;
  }
  var LOGGER_10;
  var properties_initialized_HttpCookies_kt_8twc09;
  function _init_properties_HttpCookies_kt__vu19yt() {
    if (!properties_initialized_HttpCookies_kt_8twc09) {
      properties_initialized_HttpCookies_kt_8twc09 = true;
      LOGGER_10 = KtorSimpleLogger('io.ktor.client.plugins.HttpCookies');
    }
  }
  function ByteChannelReplay$CopyFromSourceTask$receiveBody$slambda(this$0, this$1, resultContinuation) {
    this.this$0__1 = this$0;
    this.this$1__1 = this$1;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(ByteChannelReplay$CopyFromSourceTask$receiveBody$slambda).invoke_86bb4c_k$ = function ($this$writer, $completion) {
    var tmp = this.create_fmjhmg_k$($this$writer, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(ByteChannelReplay$CopyFromSourceTask$receiveBody$slambda).invoke_qns8j1_k$ = function (p1, $completion) {
    return this.invoke_86bb4c_k$(p1 instanceof WriterScope ? p1 : THROW_CCE(), $completion);
  };
  protoOf(ByteChannelReplay$CopyFromSourceTask$receiveBody$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(12);
            this.body0__1 = BytePacketBuilder();
            this.set_exceptionState_fex74n_k$(11);
            this.set_state_rjd8d0_k$(1);
            continue $sm;
          case 1:
            if (!!this.this$0__1.origin_1.get_isClosedForRead_ajcc1s_k$()) {
              this.set_state_rjd8d0_k$(10);
              continue $sm;
            }

            if (get_availableForRead(this.this$0__1.origin_1) === 0) {
              this.set_state_rjd8d0_k$(2);
              suspendResult = this.this$0__1.origin_1.awaitContent$default_rxihsg_k$(VOID, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.set_state_rjd8d0_k$(3);
              continue $sm;
            }

          case 2:
            this.set_state_rjd8d0_k$(3);
            continue $sm;
          case 3:
            this.set_state_rjd8d0_k$(4);
            suspendResult = readPacket(this.this$0__1.origin_1, get_availableForRead(this.this$0__1.origin_1), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 4:
            this.packet2__1 = suspendResult;
            this.set_exceptionState_fex74n_k$(8);
            if (!this.$this$writer_1.get_channel_dhi7tm_k$().get_isClosedForWrite_seyg5n_k$()) {
              this.set_state_rjd8d0_k$(5);
              suspendResult = writePacket(this.$this$writer_1.get_channel_dhi7tm_k$(), this.packet2__1.peek_21nx7_k$(), this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.set_state_rjd8d0_k$(7);
              continue $sm;
            }

          case 5:
            this.set_state_rjd8d0_k$(6);
            suspendResult = this.$this$writer_1.get_channel_dhi7tm_k$().flush_4wsz1p_k$(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 6:
            this.set_state_rjd8d0_k$(7);
            continue $sm;
          case 7:
            this.set_exceptionState_fex74n_k$(11);
            this.set_state_rjd8d0_k$(9);
            continue $sm;
          case 8:
            this.set_exceptionState_fex74n_k$(11);
            var tmp_0 = this.get_exception_x0n6w6_k$();
            if (tmp_0 instanceof Exception) {
              var _unused_var__etf5q3 = this.get_exception_x0n6w6_k$();
              this.set_state_rjd8d0_k$(9);
              continue $sm;
            } else {
              throw this.get_exception_x0n6w6_k$();
            }

          case 9:
            this.set_exceptionState_fex74n_k$(11);
            writePacket_0(this.body0__1, this.packet2__1);
            this.set_state_rjd8d0_k$(1);
            continue $sm;
          case 10:
            var tmp0_safe_receiver = this.this$0__1.origin_1.get_closedCause_o1qcj8_k$();
            if (tmp0_safe_receiver == null)
              null;
            else {
              throw tmp0_safe_receiver;
            }

            this.TRY_RESULT1__1 = this.this$1__1.savedResponse_1.complete_ixf84q_k$(readByteArray(build(this.body0__1)));
            this.set_exceptionState_fex74n_k$(12);
            this.set_state_rjd8d0_k$(13);
            continue $sm;
          case 11:
            this.set_exceptionState_fex74n_k$(12);
            var tmp_1 = this.get_exception_x0n6w6_k$();
            if (tmp_1 instanceof Error) {
              var cause = this.get_exception_x0n6w6_k$();
              var tmp_2 = this;
              this.body0__1.close_yn9xrc_k$();
              this.this$1__1.savedResponse_1.completeExceptionally_xyzekf_k$(cause);
              throw cause;
            } else {
              throw this.get_exception_x0n6w6_k$();
            }

          case 12:
            throw this.get_exception_x0n6w6_k$();
          case 13:
            this.set_exceptionState_fex74n_k$(12);
            return Unit_getInstance();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 12) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  protoOf(ByteChannelReplay$CopyFromSourceTask$receiveBody$slambda).create_fmjhmg_k$ = function ($this$writer, completion) {
    var i = new ByteChannelReplay$CopyFromSourceTask$receiveBody$slambda(this.this$0__1, this.this$1__1, completion);
    i.$this$writer_1 = $this$writer;
    return i;
  };
  protoOf(ByteChannelReplay$CopyFromSourceTask$receiveBody$slambda).create_wyq9v6_k$ = function (value, completion) {
    return this.create_fmjhmg_k$(value instanceof WriterScope ? value : THROW_CCE(), completion);
  };
  function ByteChannelReplay$CopyFromSourceTask$receiveBody$slambda_0(this$0, this$1, resultContinuation) {
    var i = new ByteChannelReplay$CopyFromSourceTask$receiveBody$slambda(this$0, this$1, resultContinuation);
    var l = function ($this$writer, $completion) {
      return i.invoke_86bb4c_k$($this$writer, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function _get_origin__hwq945($this) {
    return $this.origin_1;
  }
  function _get_content__ps04ag_0($this) {
    return $this.content_1;
  }
  function CopyFromSourceTask($outer, savedResponse) {
    savedResponse = savedResponse === VOID ? CompletableDeferred() : savedResponse;
    this.$this_1 = $outer;
    this.savedResponse_1 = savedResponse;
  }
  protoOf(CopyFromSourceTask).get_savedResponse_6swpj5_k$ = function () {
    return this.savedResponse_1;
  };
  protoOf(CopyFromSourceTask).set_writerJob_28k5dq_k$ = function (_set____db54di) {
    this.writerJob_1 = _set____db54di;
  };
  protoOf(CopyFromSourceTask).get_writerJob_eq984f_k$ = function () {
    var tmp = this.writerJob_1;
    if (!(tmp == null))
      return tmp;
    else {
      throwUninitializedPropertyAccessException('writerJob');
    }
  };
  protoOf(CopyFromSourceTask).start_1tchgi_k$ = function () {
    this.writerJob_1 = this.receiveBody_ysndnf_k$();
    return this.get_writerJob_eq984f_k$().get_channel_dhi7tm_k$();
  };
  protoOf(CopyFromSourceTask).receiveBody_ysndnf_k$ = function () {
    var tmp = GlobalScope_getInstance();
    var tmp_0 = Dispatchers_getInstance().get_Unconfined_sfvx0q_k$();
    return writer(tmp, tmp_0, VOID, ByteChannelReplay$CopyFromSourceTask$receiveBody$slambda_0(this.$this_1, this, null));
  };
  protoOf(CopyFromSourceTask).awaitImpatiently_hrteip_k$ = function ($completion) {
    if (!get_isCompleted(this.get_writerJob_eq984f_k$())) {
      this.get_writerJob_eq984f_k$().get_channel_dhi7tm_k$().cancel_9i2dv0_k$(new SaveBodyAbandonedReadException());
    }
    return this.savedResponse_1.await_4rdzbx_k$($completion);
  };
  function ByteChannelReplay$replay$slambda($copyTask, resultContinuation) {
    this.$copyTask_1 = $copyTask;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(ByteChannelReplay$replay$slambda).invoke_86bb4c_k$ = function ($this$writer, $completion) {
    var tmp = this.create_fmjhmg_k$($this$writer, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(ByteChannelReplay$replay$slambda).invoke_qns8j1_k$ = function (p1, $completion) {
    return this.invoke_86bb4c_k$(p1 instanceof WriterScope ? p1 : THROW_CCE(), $completion);
  };
  protoOf(ByteChannelReplay$replay$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(3);
            this.set_state_rjd8d0_k$(1);
            suspendResult = ensureNotNull(this.$copyTask_1._v).awaitImpatiently_hrteip_k$(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.body0__1 = suspendResult;
            this.set_state_rjd8d0_k$(2);
            suspendResult = writeFully(this.$this$writer_1.get_channel_dhi7tm_k$(), this.body0__1, VOID, VOID, this);
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
  protoOf(ByteChannelReplay$replay$slambda).create_fmjhmg_k$ = function ($this$writer, completion) {
    var i = new ByteChannelReplay$replay$slambda(this.$copyTask_1, completion);
    i.$this$writer_1 = $this$writer;
    return i;
  };
  protoOf(ByteChannelReplay$replay$slambda).create_wyq9v6_k$ = function (value, completion) {
    return this.create_fmjhmg_k$(value instanceof WriterScope ? value : THROW_CCE(), completion);
  };
  function ByteChannelReplay$replay$slambda_0($copyTask, resultContinuation) {
    var i = new ByteChannelReplay$replay$slambda($copyTask, resultContinuation);
    var l = function ($this$writer, $completion) {
      return i.invoke_86bb4c_k$($this$writer, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function ByteChannelReplay(origin) {
    this.origin_1 = origin;
    this.content_1 = atomic$ref$1(null);
  }
  protoOf(ByteChannelReplay).replay_fge42h_k$ = function () {
    if (!(this.origin_1.get_closedCause_o1qcj8_k$() == null)) {
      throw ensureNotNull(this.origin_1.get_closedCause_o1qcj8_k$());
    }
    var copyTask = {_v: this.content_1.get_kotlinx$atomicfu$value_vi2am5_k$()};
    if (copyTask._v == null) {
      copyTask._v = new CopyFromSourceTask(this);
      if (!this.content_1.atomicfu$compareAndSet(null, copyTask._v)) {
        copyTask._v = this.content_1.get_kotlinx$atomicfu$value_vi2am5_k$();
      } else {
        return copyTask._v.start_1tchgi_k$();
      }
    }
    var tmp = GlobalScope_getInstance();
    return writer(tmp, VOID, VOID, ByteChannelReplay$replay$slambda_0(copyTask, null)).get_channel_dhi7tm_k$();
  };
  function SaveBodyAbandonedReadException() {
    RuntimeException_init_$Init$('Save body abandoned', this);
    captureStack(this, SaveBodyAbandonedReadException);
  }
  function wrapWithContent(_this__u8e3s4, content) {
    return DelegatedCall_init_$Create$(_this__u8e3s4.get_client_byfnx0_k$(), content, _this__u8e3s4);
  }
  function wrapWithContent_0(_this__u8e3s4, block) {
    return new DelegatedCall(_this__u8e3s4.get_client_byfnx0_k$(), block, _this__u8e3s4);
  }
  function DelegatedCall_init_$Init$(client, content, originCall, responseHeaders, $this) {
    responseHeaders = responseHeaders === VOID ? originCall.get_response_xlk07e_k$().get_headers_ef25jx_k$() : responseHeaders;
    DelegatedCall.call($this, client, DelegatedCall$_init_$lambda_8e37y(content), originCall, responseHeaders);
    return $this;
  }
  function DelegatedCall_init_$Create$(client, content, originCall, responseHeaders) {
    return DelegatedCall_init_$Init$(client, content, originCall, responseHeaders, objectCreate(protoOf(DelegatedCall)));
  }
  function DelegatedCall$_init_$lambda_8e37y($content) {
    return function () {
      return $content;
    };
  }
  function DelegatedCall(client, block, originCall, responseHeaders) {
    responseHeaders = responseHeaders === VOID ? originCall.get_response_xlk07e_k$().get_headers_ef25jx_k$() : responseHeaders;
    HttpClientCall.call(this, client);
    this.set_request_fptzio_k$(new DelegatedRequest(this, originCall.get_request_jdwg4m_k$()));
    this.set_response_6wynhk_k$(new DelegatedResponse(this, block, originCall.get_response_xlk07e_k$(), responseHeaders));
  }
  function DelegatedRequest(call, origin) {
    this.$$delegate_0__1 = origin;
    this.call_1 = call;
  }
  protoOf(DelegatedRequest).get_call_wojxrb_k$ = function () {
    return this.call_1;
  };
  protoOf(DelegatedRequest).get_coroutineContext_115oqo_k$ = function () {
    return this.$$delegate_0__1.get_coroutineContext_115oqo_k$();
  };
  protoOf(DelegatedRequest).get_method_gl8esq_k$ = function () {
    return this.$$delegate_0__1.get_method_gl8esq_k$();
  };
  protoOf(DelegatedRequest).get_url_18iuii_k$ = function () {
    return this.$$delegate_0__1.get_url_18iuii_k$();
  };
  protoOf(DelegatedRequest).get_attributes_dgqof4_k$ = function () {
    return this.$$delegate_0__1.get_attributes_dgqof4_k$();
  };
  protoOf(DelegatedRequest).get_content_h02jrk_k$ = function () {
    return this.$$delegate_0__1.get_content_h02jrk_k$();
  };
  protoOf(DelegatedRequest).get_headers_ef25jx_k$ = function () {
    return this.$$delegate_0__1.get_headers_ef25jx_k$();
  };
  function _get_block__jewopo($this) {
    return $this.block_1;
  }
  function _get_origin__hwq945_0($this) {
    return $this.origin_1;
  }
  function DelegatedResponse_init_$Init$(call, content, origin, headers, $this) {
    headers = headers === VOID ? origin.get_headers_ef25jx_k$() : headers;
    DelegatedResponse.call($this, call, DelegatedResponse$_init_$lambda_s4iz6z(content), origin, headers);
    return $this;
  }
  function DelegatedResponse_init_$Create$(call, content, origin, headers) {
    return DelegatedResponse_init_$Init$(call, content, origin, headers, objectCreate(protoOf(DelegatedResponse)));
  }
  function DelegatedResponse$_init_$lambda_s4iz6z($content) {
    return function () {
      return $content;
    };
  }
  function DelegatedResponse(call, block, origin, headers) {
    headers = headers === VOID ? origin.get_headers_ef25jx_k$() : headers;
    HttpResponse.call(this);
    this.call_1 = call;
    this.block_1 = block;
    this.origin_1 = origin;
    this.headers_1 = headers;
    this.coroutineContext_1 = this.origin_1.get_coroutineContext_115oqo_k$();
  }
  protoOf(DelegatedResponse).get_call_wojxrb_k$ = function () {
    return this.call_1;
  };
  protoOf(DelegatedResponse).get_headers_ef25jx_k$ = function () {
    return this.headers_1;
  };
  protoOf(DelegatedResponse).get_rawContent_u3f8li_k$ = function () {
    return this.block_1();
  };
  protoOf(DelegatedResponse).get_coroutineContext_115oqo_k$ = function () {
    return this.coroutineContext_1;
  };
  protoOf(DelegatedResponse).get_status_jnf6d7_k$ = function () {
    return this.origin_1.get_status_jnf6d7_k$();
  };
  protoOf(DelegatedResponse).get_version_72w4j3_k$ = function () {
    return this.origin_1.get_version_72w4j3_k$();
  };
  protoOf(DelegatedResponse).get_requestTime_wwxhg3_k$ = function () {
    return this.origin_1.get_requestTime_wwxhg3_k$();
  };
  protoOf(DelegatedResponse).get_responseTime_scfvg7_k$ = function () {
    return this.origin_1.get_responseTime_scfvg7_k$();
  };
  function get_ResponseObserver() {
    _init_properties_ResponseObserver_kt__a2r107();
    return ResponseObserver;
  }
  var ResponseObserver;
  function ResponseObserverConfig$responseHandler$slambda(resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(ResponseObserverConfig$responseHandler$slambda).invoke_5qztuh_k$ = function (it, $completion) {
    var tmp = this.create_bkvwgl_k$(it, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(ResponseObserverConfig$responseHandler$slambda).invoke_qns8j1_k$ = function (p1, $completion) {
    return this.invoke_5qztuh_k$(p1 instanceof HttpResponse ? p1 : THROW_CCE(), $completion);
  };
  protoOf(ResponseObserverConfig$responseHandler$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        if (tmp === 0) {
          this.set_exceptionState_fex74n_k$(1);
          return Unit_getInstance();
        } else if (tmp === 1) {
          throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        throw e;
      }
     while (true);
  };
  protoOf(ResponseObserverConfig$responseHandler$slambda).create_bkvwgl_k$ = function (it, completion) {
    var i = new ResponseObserverConfig$responseHandler$slambda(completion);
    i.it_1 = it;
    return i;
  };
  protoOf(ResponseObserverConfig$responseHandler$slambda).create_wyq9v6_k$ = function (value, completion) {
    return this.create_bkvwgl_k$(value instanceof HttpResponse ? value : THROW_CCE(), completion);
  };
  function ResponseObserverConfig$responseHandler$slambda_0(resultContinuation) {
    var i = new ResponseObserverConfig$responseHandler$slambda(resultContinuation);
    var l = function (it, $completion) {
      return i.invoke_5qztuh_k$(it, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function ResponseObserverConfig() {
    var tmp = this;
    tmp.responseHandler_1 = ResponseObserverConfig$responseHandler$slambda_0(null);
    this.filter_1 = null;
  }
  protoOf(ResponseObserverConfig).set_responseHandler_81iyfb_k$ = function (_set____db54di) {
    this.responseHandler_1 = _set____db54di;
  };
  protoOf(ResponseObserverConfig).get_responseHandler_4dyt2l_k$ = function () {
    return this.responseHandler_1;
  };
  protoOf(ResponseObserverConfig).set_filter_8mill_k$ = function (_set____db54di) {
    this.filter_1 = _set____db54di;
  };
  protoOf(ResponseObserverConfig).get_filter_yywyj0_k$ = function () {
    return this.filter_1;
  };
  protoOf(ResponseObserverConfig).onResponse_psf88o_k$ = function (block) {
    this.responseHandler_1 = block;
  };
  protoOf(ResponseObserverConfig).filter_9eu8bm_k$ = function (block) {
    this.filter_1 = block;
  };
  function _get_context__ps0bpe($this) {
    return $this.context_1;
  }
  function Context(context) {
    this.context_1 = context;
  }
  protoOf(Context).proceedWith_k1k4l2_k$ = function (response, $completion) {
    return this.context_1.proceedWith_i5skhv_k$(response, $completion);
  };
  function AfterReceiveHook$install$slambda_1($handler, resultContinuation) {
    this.$handler_1 = $handler;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(AfterReceiveHook$install$slambda_1).invoke_djztfu_k$ = function ($this$intercept, it, $completion) {
    var tmp = this.create_sxpl8e_k$($this$intercept, it, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(AfterReceiveHook$install$slambda_1).invoke_4tzzq6_k$ = function (p1, p2, $completion) {
    var tmp = p1 instanceof PipelineContext ? p1 : THROW_CCE();
    return this.invoke_djztfu_k$(tmp, p2 instanceof HttpResponse ? p2 : THROW_CCE(), $completion);
  };
  protoOf(AfterReceiveHook$install$slambda_1).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = this.$handler_1(new Context(this.$this$intercept_1), this.$this$intercept_1.get_subject_tmjbgd_k$(), this);
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
  protoOf(AfterReceiveHook$install$slambda_1).create_sxpl8e_k$ = function ($this$intercept, it, completion) {
    var i = new AfterReceiveHook$install$slambda_1(this.$handler_1, completion);
    i.$this$intercept_1 = $this$intercept;
    i.it_1 = it;
    return i;
  };
  function AfterReceiveHook$install$slambda_2($handler, resultContinuation) {
    var i = new AfterReceiveHook$install$slambda_1($handler, resultContinuation);
    var l = function ($this$intercept, it, $completion) {
      return i.invoke_djztfu_k$($this$intercept, it, $completion);
    };
    l.$arity = 2;
    return l;
  }
  function AfterReceiveHook_0() {
    AfterReceiveHook_instance_0 = this;
  }
  protoOf(AfterReceiveHook_0).install_gh3j9i_k$ = function (client, handler) {
    var tmp = client.get_receivePipeline_3qwhq4_k$();
    var tmp_0 = Phases_getInstance_1().get_After_i6zngz_k$();
    tmp.intercept_k21bv3_k$(tmp_0, AfterReceiveHook$install$slambda_2(handler, null));
  };
  protoOf(AfterReceiveHook_0).install_o8nink_k$ = function (client, handler) {
    return this.install_gh3j9i_k$(client, (!(handler == null) ? isSuspendFunction(handler, 2) : false) ? handler : THROW_CCE());
  };
  var AfterReceiveHook_instance_0;
  function AfterReceiveHook_getInstance_0() {
    if (AfterReceiveHook_instance_0 == null)
      new AfterReceiveHook_0();
    return AfterReceiveHook_instance_0;
  }
  function ResponseObserverConfig$_init_$ref_8ccbys() {
    var l = function () {
      return new ResponseObserverConfig();
    };
    l.callableName = '<init>';
    return l;
  }
  function ResponseObserver$lambda($this$createClientPlugin) {
    _init_properties_ResponseObserver_kt__a2r107();
    var responseHandler = $this$createClientPlugin.get_pluginConfig_p50bdq_k$().responseHandler_1;
    var filter = $this$createClientPlugin.get_pluginConfig_p50bdq_k$().filter_1;
    var tmp = AfterReceiveHook_getInstance_0();
    $this$createClientPlugin.on_z1oiz_k$(tmp, ResponseObserver$lambda$slambda_0(filter, $this$createClientPlugin, responseHandler, null));
    return Unit_getInstance();
  }
  function ResponseObserver$lambda$slambda$slambda($responseHandler, $sideResponse, resultContinuation) {
    this.$responseHandler_1 = $responseHandler;
    this.$sideResponse_1 = $sideResponse;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(ResponseObserver$lambda$slambda$slambda).invoke_d9fzmj_k$ = function ($this$launch, $completion) {
    var tmp = this.create_rcuf4x_k$($this$launch, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(ResponseObserver$lambda$slambda$slambda).invoke_qns8j1_k$ = function (p1, $completion) {
    return this.invoke_d9fzmj_k$((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(ResponseObserver$lambda$slambda$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(8);
            var tmp_0 = this;
            tmp_0.tmp00__1 = this.$this$launch_1;
            this.this1__1 = this.tmp00__1;
            this.set_exceptionState_fex74n_k$(2);
            var tmp_1 = this;
            tmp_1.tmp03__1 = Companion_getInstance_2();
            var tmp_2 = this;
            tmp_2.tmp14__1 = this.this1__1;
            this.$this$runCatching5__1 = this.tmp14__1;
            this.set_state_rjd8d0_k$(1);
            suspendResult = this.$responseHandler_1(this.$sideResponse_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.tmp16__1 = Unit_getInstance();
            var tmp_3 = this;
            this.tmp03__1;
            var value = this.tmp16__1;
            tmp_3.TRY_RESULT2__1 = _Result___init__impl__xyqfz8(value);
            this.set_exceptionState_fex74n_k$(8);
            this.set_state_rjd8d0_k$(3);
            continue $sm;
          case 2:
            this.set_exceptionState_fex74n_k$(8);
            var tmp_4 = this.get_exception_x0n6w6_k$();
            if (tmp_4 instanceof Error) {
              this.e7__1 = this.get_exception_x0n6w6_k$();
              var tmp_5 = this;
              Companion_getInstance_2();
              var exception = this.e7__1;
              tmp_5.TRY_RESULT2__1 = _Result___init__impl__xyqfz8(createFailure(exception));
              this.set_state_rjd8d0_k$(3);
              continue $sm;
            } else {
              throw this.get_exception_x0n6w6_k$();
            }

          case 3:
            this.set_exceptionState_fex74n_k$(8);
            this.content8__1 = this.$sideResponse_1.get_rawContent_u3f8li_k$();
            if (!this.content8__1.get_isClosedForRead_ajcc1s_k$()) {
              var tmp_6 = this;
              tmp_6.tmp29__1 = this.$this$launch_1;
              this.this10__1 = this.tmp29__1;
              this.set_exceptionState_fex74n_k$(5);
              var tmp_7 = this;
              tmp_7.tmp012__1 = Companion_getInstance_2();
              var tmp_8 = this;
              tmp_8.tmp313__1 = this.this10__1;
              this.$this$runCatching14__1 = this.tmp313__1;
              this.set_state_rjd8d0_k$(4);
              suspendResult = discard(this.content8__1, VOID, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.set_state_rjd8d0_k$(7);
              continue $sm;
            }

          case 4:
            var tmp1 = suspendResult;
            var tmp_9 = this;
            this.tmp012__1;
            tmp_9.TRY_RESULT11__1 = _Result___init__impl__xyqfz8(tmp1);
            this.set_exceptionState_fex74n_k$(8);
            this.set_state_rjd8d0_k$(6);
            continue $sm;
          case 5:
            this.set_exceptionState_fex74n_k$(8);
            var tmp_10 = this.get_exception_x0n6w6_k$();
            if (tmp_10 instanceof Error) {
              var e = this.get_exception_x0n6w6_k$();
              var tmp_11 = this;
              Companion_getInstance_2();
              tmp_11.TRY_RESULT11__1 = _Result___init__impl__xyqfz8(createFailure(e));
              this.set_state_rjd8d0_k$(6);
              continue $sm;
            } else {
              throw this.get_exception_x0n6w6_k$();
            }

          case 6:
            this.set_exceptionState_fex74n_k$(8);
            this.set_state_rjd8d0_k$(7);
            continue $sm;
          case 7:
            return Unit_getInstance();
          case 8:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e_0 = $p;
        if (this.get_exceptionState_wflpxn_k$() === 8) {
          throw e_0;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e_0);
        }
      }
     while (true);
  };
  protoOf(ResponseObserver$lambda$slambda$slambda).create_rcuf4x_k$ = function ($this$launch, completion) {
    var i = new ResponseObserver$lambda$slambda$slambda(this.$responseHandler_1, this.$sideResponse_1, completion);
    i.$this$launch_1 = $this$launch;
    return i;
  };
  protoOf(ResponseObserver$lambda$slambda$slambda).create_wyq9v6_k$ = function (value, completion) {
    return this.create_rcuf4x_k$((!(value == null) ? isInterface(value, CoroutineScope) : false) ? value : THROW_CCE(), completion);
  };
  function ResponseObserver$lambda$slambda$slambda_0($responseHandler, $sideResponse, resultContinuation) {
    var i = new ResponseObserver$lambda$slambda$slambda($responseHandler, $sideResponse, resultContinuation);
    var l = function ($this$launch, $completion) {
      return i.invoke_d9fzmj_k$($this$launch, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function ResponseObserver$lambda$slambda($filter, $this_createClientPlugin, $responseHandler, resultContinuation) {
    this.$filter_1 = $filter;
    this.$this_createClientPlugin_1 = $this_createClientPlugin;
    this.$responseHandler_1 = $responseHandler;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(ResponseObserver$lambda$slambda).invoke_uxth3i_k$ = function ($this$on, response, $completion) {
    var tmp = this.create_mcxhgu_k$($this$on, response, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(ResponseObserver$lambda$slambda).invoke_4tzzq6_k$ = function (p1, p2, $completion) {
    var tmp = p1 instanceof Context ? p1 : THROW_CCE();
    return this.invoke_uxth3i_k$(tmp, p2 instanceof HttpResponse ? p2 : THROW_CCE(), $completion);
  };
  protoOf(ResponseObserver$lambda$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(3);
            var tmp0_safe_receiver = this.$filter_1;
            if ((tmp0_safe_receiver == null ? null : tmp0_safe_receiver(this.response_1.get_call_wojxrb_k$())) === false)
              return Unit_getInstance();
            this._destruct_0_gwiw3o_1 = split(this.response_1.get_rawContent_u3f8li_k$(), this.response_1);
            this.loggingContent1__1 = this._destruct_0_gwiw3o_1.component1_7eebsc_k$();
            this.responseContent2__1 = this._destruct_0_gwiw3o_1.component2_7eebsb_k$();
            this.newResponse3__1 = wrapWithContent(this.response_1.get_call_wojxrb_k$(), this.responseContent2__1).get_response_xlk07e_k$();
            this.sideResponse4__1 = wrapWithContent(this.response_1.get_call_wojxrb_k$(), this.loggingContent1__1).get_response_xlk07e_k$();
            this.ARGUMENT5__1 = this.$this_createClientPlugin_1.get_client_byfnx0_k$();
            this.set_state_rjd8d0_k$(1);
            suspendResult = getResponseObserverContext(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.ARGUMENT6__1 = suspendResult;
            launch(this.ARGUMENT5__1, this.ARGUMENT6__1, VOID, ResponseObserver$lambda$slambda$slambda_0(this.$responseHandler_1, this.sideResponse4__1, null));
            this.set_state_rjd8d0_k$(2);
            suspendResult = this.$this$on_1.proceedWith_k1k4l2_k$(this.newResponse3__1, this);
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
  protoOf(ResponseObserver$lambda$slambda).create_mcxhgu_k$ = function ($this$on, response, completion) {
    var i = new ResponseObserver$lambda$slambda(this.$filter_1, this.$this_createClientPlugin_1, this.$responseHandler_1, completion);
    i.$this$on_1 = $this$on;
    i.response_1 = response;
    return i;
  };
  function ResponseObserver$lambda$slambda_0($filter, $this_createClientPlugin, $responseHandler, resultContinuation) {
    var i = new ResponseObserver$lambda$slambda($filter, $this_createClientPlugin, $responseHandler, resultContinuation);
    var l = function ($this$on, response, $completion) {
      return i.invoke_uxth3i_k$($this$on, response, $completion);
    };
    l.$arity = 2;
    return l;
  }
  var properties_initialized_ResponseObserver_kt_f8skbd;
  function _init_properties_ResponseObserver_kt__a2r107() {
    if (!properties_initialized_ResponseObserver_kt_f8skbd) {
      properties_initialized_ResponseObserver_kt_f8skbd = true;
      var tmp = ResponseObserverConfig$_init_$ref_8ccbys();
      ResponseObserver = createClientPlugin_0('ResponseObserver', tmp, ResponseObserver$lambda);
    }
  }
  function SSESession() {
  }
  function ClientSSESession(call, delegate) {
    this.$$delegate_0__1 = delegate;
    this.call_1 = call;
  }
  protoOf(ClientSSESession).get_call_wojxrb_k$ = function () {
    return this.call_1;
  };
  protoOf(ClientSSESession).get_incoming_u9os29_k$ = function () {
    return this.$$delegate_0__1.get_incoming_u9os29_k$();
  };
  protoOf(ClientSSESession).get_coroutineContext_115oqo_k$ = function () {
    return this.$$delegate_0__1.get_coroutineContext_115oqo_k$();
  };
  function _set_input__fynq9n($this, _set____db54di) {
    $this.input_1 = _set____db54di;
  }
  function _get_input__g2gq7t($this) {
    return $this.input_1;
  }
  function _set_lastEventId__qsa322($this, _set____db54di) {
    $this.lastEventId_1 = _set____db54di;
  }
  function _get_lastEventId__3i439u($this) {
    return $this.lastEventId_1;
  }
  function _set_reconnectionTimeMillis__lnkbn7($this, _set____db54di) {
    $this.reconnectionTimeMillis_1 = _set____db54di;
  }
  function _get_reconnectionTimeMillis__r4g9w9($this) {
    return $this.reconnectionTimeMillis_1;
  }
  function _get_showCommentEvents__ni13fu($this) {
    return $this.showCommentEvents_1;
  }
  function _get_showRetryEvents__j8xxwt($this) {
    return $this.showRetryEvents_1;
  }
  function _get__incoming__1bn23w($this) {
    return $this._incoming_1;
  }
  function parseEvent($this, _this__u8e3s4, $completion) {
    var tmp = new $parseEventCOROUTINE$10($this, _this__u8e3s4, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  }
  function appendComment($this, _this__u8e3s4, comment) {
    _this__u8e3s4.append_22ad7x_k$(removePrefix(removePrefix(comment, ':'), ' ')).append_22ad7x_k$('\r\n');
  }
  function toText($this, _this__u8e3s4) {
    return removeSuffix(_this__u8e3s4.toString(), '\r\n');
  }
  function isEmpty($this, _this__u8e3s4) {
    return _this__u8e3s4.get_data_wokkxf_k$() == null && _this__u8e3s4.get_id_kntnx8_k$() == null && _this__u8e3s4.get_event_ir25pt_k$() == null && _this__u8e3s4.get_retry_ixwxvj_k$() == null && _this__u8e3s4.get_comments_t9igfx_k$() == null;
  }
  function isCommentsEvent($this, _this__u8e3s4) {
    return _this__u8e3s4.get_data_wokkxf_k$() == null && _this__u8e3s4.get_event_ir25pt_k$() == null && _this__u8e3s4.get_id_kntnx8_k$() == null && _this__u8e3s4.get_retry_ixwxvj_k$() == null && !(_this__u8e3s4.get_comments_t9igfx_k$() == null);
  }
  function isRetryEvent($this, _this__u8e3s4) {
    return _this__u8e3s4.get_data_wokkxf_k$() == null && _this__u8e3s4.get_event_ir25pt_k$() == null && _this__u8e3s4.get_id_kntnx8_k$() == null && _this__u8e3s4.get_comments_t9igfx_k$() == null && !(_this__u8e3s4.get_retry_ixwxvj_k$() == null);
  }
  function DefaultClientSSESession$_incoming$slambda(this$0, resultContinuation) {
    this.this$0__1 = this$0;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(DefaultClientSSESession$_incoming$slambda).invoke_i5embz_k$ = function ($this$channelFlow, $completion) {
    var tmp = this.create_8xptjv_k$($this$channelFlow, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(DefaultClientSSESession$_incoming$slambda).invoke_qns8j1_k$ = function (p1, $completion) {
    return this.invoke_i5embz_k$((!(p1 == null) ? isInterface(p1, ProducerScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(DefaultClientSSESession$_incoming$slambda).doResume_5yljmg_k$ = function () {
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
            if (!true) {
              this.set_state_rjd8d0_k$(8);
              continue $sm;
            }

            this.set_state_rjd8d0_k$(2);
            suspendResult = parseEvent(this.this$0__1, this.this$0__1.input_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            this.tmp0_elvis_lhs0__1 = suspendResult;
            if (this.tmp0_elvis_lhs0__1 == null) {
              this.set_state_rjd8d0_k$(8);
              var tmp_0 = this;
              continue $sm;
            } else {
              this.WHEN_RESULT1__1 = this.tmp0_elvis_lhs0__1;
              this.set_state_rjd8d0_k$(3);
              continue $sm;
            }

          case 3:
            this.event2__1 = this.WHEN_RESULT1__1;
            if (isCommentsEvent(this.this$0__1, this.event2__1) && !this.this$0__1.showCommentEvents_1) {
              this.set_state_rjd8d0_k$(1);
              continue $sm;
            } else {
              this.set_state_rjd8d0_k$(4);
              continue $sm;
            }

          case 4:
            if (isRetryEvent(this.this$0__1, this.event2__1) && !this.this$0__1.showRetryEvents_1) {
              this.set_state_rjd8d0_k$(1);
              continue $sm;
            } else {
              this.set_state_rjd8d0_k$(5);
              continue $sm;
            }

          case 5:
            this.set_state_rjd8d0_k$(6);
            suspendResult = this.$this$channelFlow_1.send_44jogj_k$(this.event2__1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 6:
            this.set_state_rjd8d0_k$(1);
            continue $sm;
          case 7:
            throw this.get_exception_x0n6w6_k$();
          case 8:
            return Unit_getInstance();
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
  protoOf(DefaultClientSSESession$_incoming$slambda).create_8xptjv_k$ = function ($this$channelFlow, completion) {
    var i = new DefaultClientSSESession$_incoming$slambda(this.this$0__1, completion);
    i.$this$channelFlow_1 = $this$channelFlow;
    return i;
  };
  protoOf(DefaultClientSSESession$_incoming$slambda).create_wyq9v6_k$ = function (value, completion) {
    return this.create_8xptjv_k$((!(value == null) ? isInterface(value, ProducerScope) : false) ? value : THROW_CCE(), completion);
  };
  function DefaultClientSSESession$_incoming$slambda_0(this$0, resultContinuation) {
    var i = new DefaultClientSSESession$_incoming$slambda(this$0, resultContinuation);
    var l = function ($this$channelFlow, $completion) {
      return i.invoke_i5embz_k$($this$channelFlow, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function $parseEventCOROUTINE$10(_this__u8e3s4, _this__u8e3s4_0, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this._this__u8e3s4__2 = _this__u8e3s4_0;
  }
  protoOf($parseEventCOROUTINE$10).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(8);
            this.data0__1 = StringBuilder_init_$Create$();
            this.comments1__1 = StringBuilder_init_$Create$();
            this.eventType2__1 = null;
            this.curRetry3__1 = null;
            this.lastEventId4__1 = this._this__u8e3s4__1.lastEventId_1;
            this.wasData5__1 = false;
            this.wasComments6__1 = false;
            this.set_state_rjd8d0_k$(1);
            suspendResult = readUTF8Line(this._this__u8e3s4__2, VOID, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.tmp0_elvis_lhs7__1 = suspendResult;
            var tmp_0 = this;
            var tmp_1;
            if (this.tmp0_elvis_lhs7__1 == null) {
              return null;
            } else {
              tmp_1 = this.tmp0_elvis_lhs7__1;
            }

            tmp_0.line8__1 = tmp_1;
            this.set_state_rjd8d0_k$(2);
            continue $sm;
          case 2:
            if (!isBlank(this.line8__1)) {
              this.set_state_rjd8d0_k$(4);
              continue $sm;
            }

            this.set_state_rjd8d0_k$(3);
            suspendResult = readUTF8Line(this._this__u8e3s4__2, VOID, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 3:
            this.tmp1_elvis_lhs9__1 = suspendResult;
            var tmp_2 = this;
            var tmp_3;
            if (this.tmp1_elvis_lhs9__1 == null) {
              return null;
            } else {
              tmp_3 = this.tmp1_elvis_lhs9__1;
            }

            tmp_2.line8__1 = tmp_3;
            this.set_state_rjd8d0_k$(2);
            continue $sm;
          case 4:
            this.set_state_rjd8d0_k$(5);
            continue $sm;
          case 5:
            if (!true) {
              this.set_state_rjd8d0_k$(7);
              continue $sm;
            }

            if (isBlank(this.line8__1)) {
              this._this__u8e3s4__1.lastEventId_1 = this.lastEventId4__1;
              var event = new ServerSentEvent(this.wasData5__1 ? toText(this._this__u8e3s4__1, this.data0__1) : null, this.eventType2__1, this.lastEventId4__1, this.curRetry3__1, this.wasComments6__1 ? toText(this._this__u8e3s4__1, this.comments1__1) : null);
              if (!isEmpty(this._this__u8e3s4__1, event)) {
                return event;
              }
            } else if (startsWith(this.line8__1, ':')) {
              this.wasComments6__1 = true;
              appendComment(this._this__u8e3s4__1, this.comments1__1, this.line8__1);
            } else {
              var field = substringBefore(this.line8__1, ':');
              var value = removePrefix(substringAfter(this.line8__1, ':', ''), ' ');
              switch (field) {
                case 'event':
                  this.eventType2__1 = value;
                  break;
                case 'data':
                  this.wasData5__1 = true;
                  this.data0__1.append_22ad7x_k$(value).append_22ad7x_k$('\r\n');
                  break;
                case 'retry':
                  var tmp3_safe_receiver = toLongOrNull(value);
                  if (tmp3_safe_receiver == null)
                    null;
                  else {
                    this._this__u8e3s4__1.reconnectionTimeMillis_1 = tmp3_safe_receiver;
                    this.curRetry3__1 = tmp3_safe_receiver;
                  }

                  break;
                case 'id':
                  if (!contains(value, '\x00')) {
                    this.lastEventId4__1 = value;
                  }

                  break;
              }
            }

            this.set_state_rjd8d0_k$(6);
            suspendResult = readUTF8Line(this._this__u8e3s4__2, VOID, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 6:
            var tmp4_elvis_lhs = suspendResult;
            var tmp_4 = this;
            var tmp_5;
            if (tmp4_elvis_lhs == null) {
              return null;
            } else {
              tmp_5 = tmp4_elvis_lhs;
            }

            tmp_4.line8__1 = tmp_5;
            this.set_state_rjd8d0_k$(5);
            continue $sm;
          case 7:
            return Unit_getInstance();
          case 8:
            throw this.get_exception_x0n6w6_k$();
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
  function DefaultClientSSESession(content, input, coroutineContext) {
    this.input_1 = input;
    this.coroutineContext_1 = coroutineContext;
    this.lastEventId_1 = null;
    this.reconnectionTimeMillis_1 = _Duration___get_inWholeMilliseconds__impl__msfiry(content.get_reconnectionTime_k805x9_k$());
    this.showCommentEvents_1 = content.get_showCommentEvents_chh776_k$();
    this.showRetryEvents_1 = content.get_showRetryEvents_mqul39_k$();
    var tmp = this;
    tmp._incoming_1 = channelFlow(DefaultClientSSESession$_incoming$slambda_0(this, null));
  }
  protoOf(DefaultClientSSESession).get_coroutineContext_115oqo_k$ = function () {
    return this.coroutineContext_1;
  };
  protoOf(DefaultClientSSESession).get_incoming_u9os29_k$ = function () {
    return this._incoming_1;
  };
  function get_LOGGER_11() {
    _init_properties_SSE_kt__ir0g19();
    return LOGGER_11;
  }
  var LOGGER_11;
  function get_SSE() {
    _init_properties_SSE_kt__ir0g19();
    return SSE;
  }
  var SSE;
  function AfterRender$install$slambda($handler, resultContinuation) {
    this.$handler_1 = $handler;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(AfterRender$install$slambda).invoke_wpcgmu_k$ = function ($this$intercept, content, $completion) {
    var tmp = this.create_l3tkcm_k$($this$intercept, content, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(AfterRender$install$slambda).invoke_4tzzq6_k$ = function (p1, p2, $completion) {
    var tmp = p1 instanceof PipelineContext ? p1 : THROW_CCE();
    return this.invoke_wpcgmu_k$(tmp, !(p2 == null) ? p2 : THROW_CCE(), $completion);
  };
  protoOf(AfterRender$install$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(3);
            var tmp_0 = this.content_1;
            if (!(tmp_0 instanceof OutgoingContent))
              return Unit_getInstance();
            this.set_state_rjd8d0_k$(1);
            suspendResult = this.$handler_1(this.$this$intercept_1.get_context_h02k06_k$(), this.content_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.ARGUMENT0__1 = suspendResult;
            this.set_state_rjd8d0_k$(2);
            suspendResult = this.$this$intercept_1.proceedWith_i5skhv_k$(this.ARGUMENT0__1, this);
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
  protoOf(AfterRender$install$slambda).create_l3tkcm_k$ = function ($this$intercept, content, completion) {
    var i = new AfterRender$install$slambda(this.$handler_1, completion);
    i.$this$intercept_1 = $this$intercept;
    i.content_1 = content;
    return i;
  };
  function AfterRender$install$slambda_0($handler, resultContinuation) {
    var i = new AfterRender$install$slambda($handler, resultContinuation);
    var l = function ($this$intercept, content, $completion) {
      return i.invoke_wpcgmu_k$($this$intercept, content, $completion);
    };
    l.$arity = 2;
    return l;
  }
  function AfterRender() {
    AfterRender_instance = this;
  }
  protoOf(AfterRender).install_zcwfjy_k$ = function (client, handler) {
    var phase = new PipelinePhase('AfterRender');
    client.get_requestPipeline_5d9z6w_k$().insertPhaseAfter_gfhxiu_k$(Phases_getInstance().get_Render_3swp1b_k$(), phase);
    var tmp = client.get_requestPipeline_5d9z6w_k$();
    tmp.intercept_k21bv3_k$(phase, AfterRender$install$slambda_0(handler, null));
  };
  protoOf(AfterRender).install_o8nink_k$ = function (client, handler) {
    return this.install_zcwfjy_k$(client, (!(handler == null) ? isSuspendFunction(handler, 2) : false) ? handler : THROW_CCE());
  };
  var AfterRender_instance;
  function AfterRender_getInstance() {
    if (AfterRender_instance == null)
      new AfterRender();
    return AfterRender_instance;
  }
  function getAttributeValue(request, attributeKey) {
    _init_properties_SSE_kt__ir0g19();
    return request.get_attributes_dgqof4_k$().getOrNull_6mjt1v_k$(attributeKey);
  }
  function SSECapability() {
    SSECapability_instance = this;
  }
  protoOf(SSECapability).toString = function () {
    return 'SSECapability';
  };
  protoOf(SSECapability).hashCode = function () {
    return -177755299;
  };
  protoOf(SSECapability).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof SSECapability))
      return false;
    other instanceof SSECapability || THROW_CCE();
    return true;
  };
  var SSECapability_instance;
  function SSECapability_getInstance() {
    if (SSECapability_instance == null)
      new SSECapability();
    return SSECapability_instance;
  }
  function SSEClientException(response, cause, message) {
    response = response === VOID ? null : response;
    cause = cause === VOID ? null : cause;
    message = message === VOID ? null : message;
    IllegalStateException_init_$Init$(this);
    captureStack(this, SSEClientException);
    this.response_1 = response;
    this.cause_1 = cause;
    this.message_1 = message;
  }
  protoOf(SSEClientException).get_response_xlk07e_k$ = function () {
    return this.response_1;
  };
  protoOf(SSEClientException).get_cause_iplhs0_k$ = function () {
    return this.cause_1;
  };
  protoOf(SSEClientException).get_message_h23axq_k$ = function () {
    return this.message_1;
  };
  function SSEConfig$_init_$ref_nhmcny() {
    var l = function () {
      return new SSEConfig();
    };
    l.callableName = '<init>';
    return l;
  }
  function SSE$lambda($this$createClientPlugin) {
    _init_properties_SSE_kt__ir0g19();
    var reconnectionTime = $this$createClientPlugin.get_pluginConfig_p50bdq_k$().get_reconnectionTime_k805x9_k$();
    var showCommentEvents = $this$createClientPlugin.get_pluginConfig_p50bdq_k$().get_showCommentEvents_c64hb9_k$();
    var showRetryEvents = $this$createClientPlugin.get_pluginConfig_p50bdq_k$().get_showRetryEvents_jgmcya_k$();
    var tmp = AfterRender_getInstance();
    $this$createClientPlugin.on_z1oiz_k$(tmp, SSE$lambda$slambda_0(reconnectionTime, showCommentEvents, showRetryEvents, null));
    var tmp_0 = $this$createClientPlugin.get_client_byfnx0_k$().get_responsePipeline_xbi790_k$();
    var tmp_1 = Phases_getInstance_2().get_Transform_byqycd_k$();
    tmp_0.intercept_k21bv3_k$(tmp_1, SSE$lambda$slambda_2(null));
    return Unit_getInstance();
  }
  function SSE$lambda$slambda($reconnectionTime, $showCommentEvents, $showRetryEvents, resultContinuation) {
    this.$reconnectionTime_1 = $reconnectionTime;
    this.$showCommentEvents_1 = $showCommentEvents;
    this.$showRetryEvents_1 = $showRetryEvents;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(SSE$lambda$slambda).invoke_2omdgl_k$ = function (request, content, $completion) {
    var tmp = this.create_gs58mt_k$(request, content, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(SSE$lambda$slambda).invoke_4tzzq6_k$ = function (p1, p2, $completion) {
    var tmp = p1 instanceof HttpRequestBuilder ? p1 : THROW_CCE();
    return this.invoke_2omdgl_k$(tmp, p2 instanceof OutgoingContent ? p2 : THROW_CCE(), $completion);
  };
  protoOf(SSE$lambda$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        if (tmp === 0) {
          this.set_exceptionState_fex74n_k$(1);
          if (!(getAttributeValue(this.request_1, get_sseRequestAttr()) === true)) {
            return this.content_1;
          }
          get_LOGGER_11().trace_fti9bv_k$('Sending SSE request ' + this.request_1.get_url_18iuii_k$().toString());
          this.request_1.setCapability_di4fgr_k$(SSECapability_getInstance(), Unit_getInstance());
          var tmp_0 = getAttributeValue(this.request_1, get_reconnectionTimeAttr());
          var localReconnectionTime = tmp_0 == null ? null : tmp_0.rawValue_1;
          var localShowCommentEvents = getAttributeValue(this.request_1, get_showCommentEventsAttr());
          var localShowRetryEvents = getAttributeValue(this.request_1, get_showRetryEventsAttr());
          this.request_1.get_attributes_dgqof4_k$().put_gkntno_k$(get_ResponseAdapterAttributeKey(), new SSEClientResponseAdapter());
          var tmp0_safe_receiver = this.content_1.get_contentType_7git4a_k$();
          if (tmp0_safe_receiver == null)
            null;
          else {
            contentType_0(this.request_1, tmp0_safe_receiver);
          }
          var tmp_1;
          var tmp_2 = localReconnectionTime;
          if ((tmp_2 == null ? null : new Duration(tmp_2)) == null) {
            tmp_1 = this.$reconnectionTime_1;
          } else {
            tmp_1 = localReconnectionTime;
          }
          var tmp_3 = tmp_1;
          var tmp_4 = localShowCommentEvents == null ? this.$showCommentEvents_1 : localShowCommentEvents;
          return new SSEClientContent(tmp_3, tmp_4, localShowRetryEvents == null ? this.$showRetryEvents_1 : localShowRetryEvents, this.content_1);
        } else if (tmp === 1) {
          throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        throw e;
      }
     while (true);
  };
  protoOf(SSE$lambda$slambda).create_gs58mt_k$ = function (request, content, completion) {
    var i = new SSE$lambda$slambda(this.$reconnectionTime_1, this.$showCommentEvents_1, this.$showRetryEvents_1, completion);
    i.request_1 = request;
    i.content_1 = content;
    return i;
  };
  function SSE$lambda$slambda_0($reconnectionTime, $showCommentEvents, $showRetryEvents, resultContinuation) {
    var i = new SSE$lambda$slambda($reconnectionTime, $showCommentEvents, $showRetryEvents, resultContinuation);
    var l = function (request, content, $completion) {
      return i.invoke_2omdgl_k$(request, content, $completion);
    };
    l.$arity = 2;
    return l;
  }
  function SSE$lambda$slambda_1(resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(SSE$lambda$slambda_1).invoke_b1ivo5_k$ = function ($this$intercept, _destruct__k2r9zo, $completion) {
    var tmp = this.create_aalyq9_k$($this$intercept, _destruct__k2r9zo, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(SSE$lambda$slambda_1).invoke_4tzzq6_k$ = function (p1, p2, $completion) {
    var tmp = p1 instanceof PipelineContext ? p1 : THROW_CCE();
    return this.invoke_b1ivo5_k$(tmp, p2 instanceof HttpResponseContainer ? p2 : THROW_CCE(), $completion);
  };
  protoOf(SSE$lambda$slambda_1).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.info0__1 = this._destruct__k2r9zo_1.component1_7eebsc_k$();
            this.session1__1 = this._destruct__k2r9zo_1.component2_7eebsb_k$();
            this.response2__1 = this.$this$intercept_1.get_context_h02k06_k$().get_response_xlk07e_k$();
            this.status3__1 = this.response2__1.get_status_jnf6d7_k$();
            this.contentType4__1 = contentType_1(this.response2__1);
            this.requestContent5__1 = get_request(this.response2__1).get_content_h02jrk_k$();
            var tmp_0 = this.requestContent5__1;
            if (!(tmp_0 instanceof SSEClientContent)) {
              get_LOGGER_11().trace_fti9bv_k$('Skipping non SSE response from ' + get_request(this.response2__1).get_url_18iuii_k$().toString());
              return Unit_getInstance();
            }

            if (!this.status3__1.equals(Companion_getInstance_1().get_OK_kntokb_k$())) {
              throw new SSEClientException(this.response2__1, VOID, 'Expected status code ' + Companion_getInstance_1().get_OK_kntokb_k$().get_value_j01efc_k$() + ' but was ' + this.status3__1.get_value_j01efc_k$());
            }

            var tmp0_safe_receiver = this.contentType4__1;
            if (!equals(tmp0_safe_receiver == null ? null : tmp0_safe_receiver.withoutParameters_wrqe36_k$(), Text_getInstance().get_EventStream_rs47v3_k$())) {
              throw new SSEClientException(this.response2__1, VOID, 'Expected Content-Type ' + Text_getInstance().get_EventStream_rs47v3_k$().toString() + ' but was ' + toString_0(this.contentType4__1));
            }

            var tmp_1 = this.session1__1;
            if (!isInterface(tmp_1, SSESession)) {
              throw new SSEClientException(this.response2__1, VOID, 'Expected ' + getKClass(SSESession).get_simpleName_r6f8py_k$() + ' content but was ' + toString(this.session1__1));
            }

            get_LOGGER_11().trace_fti9bv_k$('Receive SSE session from ' + get_request(this.response2__1).get_url_18iuii_k$().toString() + ': ' + toString(this.session1__1));
            this.set_state_rjd8d0_k$(1);
            suspendResult = this.$this$intercept_1.proceedWith_i5skhv_k$(new HttpResponseContainer(this.info0__1, new ClientSSESession(this.$this$intercept_1.get_context_h02k06_k$(), this.session1__1)), this);
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
  protoOf(SSE$lambda$slambda_1).create_aalyq9_k$ = function ($this$intercept, _destruct__k2r9zo, completion) {
    var i = new SSE$lambda$slambda_1(completion);
    i.$this$intercept_1 = $this$intercept;
    i._destruct__k2r9zo_1 = _destruct__k2r9zo;
    return i;
  };
  function SSE$lambda$slambda_2(resultContinuation) {
    var i = new SSE$lambda$slambda_1(resultContinuation);
    var l = function ($this$intercept, _destruct__k2r9zo, $completion) {
      return i.invoke_b1ivo5_k$($this$intercept, _destruct__k2r9zo, $completion);
    };
    l.$arity = 2;
    return l;
  }
  var properties_initialized_SSE_kt_scp42z;
  function _init_properties_SSE_kt__ir0g19() {
    if (!properties_initialized_SSE_kt_scp42z) {
      properties_initialized_SSE_kt_scp42z = true;
      LOGGER_11 = KtorSimpleLogger('io.ktor.client.plugins.sse.SSE');
      var tmp = SSEConfig$_init_$ref_nhmcny();
      SSE = createClientPlugin_0('SSE', tmp, SSE$lambda);
    }
  }
  function SSEClientContent(reconnectionTime, showCommentEvents, showRetryEvents, requestBody) {
    ContentWrapper.call(this, requestBody);
    this.reconnectionTime_1 = reconnectionTime;
    this.showCommentEvents_1 = showCommentEvents;
    this.showRetryEvents_1 = showRetryEvents;
    var tmp = this;
    // Inline function 'kotlin.apply' call
    var this_0 = new HeadersBuilder();
    this_0.appendAll_k8dlt1_k$(requestBody.get_headers_ef25jx_k$());
    append(this_0, HttpHeaders_getInstance().get_Accept_4a5gpb_k$(), Text_getInstance().get_EventStream_rs47v3_k$());
    this_0.append_rhug0a_k$(HttpHeaders_getInstance().get_CacheControl_eudkbg_k$(), 'no-store');
    tmp.headers_1 = this_0.build_1k0s4u_k$();
  }
  protoOf(SSEClientContent).get_reconnectionTime_k805x9_k$ = function () {
    return this.reconnectionTime_1;
  };
  protoOf(SSEClientContent).get_showCommentEvents_chh776_k$ = function () {
    return this.showCommentEvents_1;
  };
  protoOf(SSEClientContent).get_showRetryEvents_mqul39_k$ = function () {
    return this.showRetryEvents_1;
  };
  protoOf(SSEClientContent).get_headers_ef25jx_k$ = function () {
    return this.headers_1;
  };
  protoOf(SSEClientContent).toString = function () {
    return 'SSEClientContent';
  };
  protoOf(SSEClientContent).copy_ff4g1d_k$ = function (delegate) {
    return new SSEClientContent(this.reconnectionTime_1, this.showCommentEvents_1, this.showRetryEvents_1, delegate);
  };
  function SSEConfig() {
    this.showCommentEvents_1 = false;
    this.showRetryEvents_1 = false;
    var tmp = this;
    // Inline function 'kotlin.time.Companion.milliseconds' call
    Companion_getInstance_3();
    tmp.reconnectionTime_1 = toDuration(3000, DurationUnit_MILLISECONDS_getInstance());
  }
  protoOf(SSEConfig).set_showCommentEvents_pdlgec_k$ = function (_set____db54di) {
    this.showCommentEvents_1 = _set____db54di;
  };
  protoOf(SSEConfig).get_showCommentEvents_c64hb9_k$ = function () {
    return this.showCommentEvents_1;
  };
  protoOf(SSEConfig).set_showRetryEvents_azt2hx_k$ = function (_set____db54di) {
    this.showRetryEvents_1 = _set____db54di;
  };
  protoOf(SSEConfig).get_showRetryEvents_jgmcya_k$ = function () {
    return this.showRetryEvents_1;
  };
  protoOf(SSEConfig).set_reconnectionTime_a2cns6_k$ = function (_set____db54di) {
    this.reconnectionTime_1 = _set____db54di;
  };
  protoOf(SSEConfig).get_reconnectionTime_k805x9_k$ = function () {
    return this.reconnectionTime_1;
  };
  protoOf(SSEConfig).showCommentEvents_uy3vyj_k$ = function () {
    this.showCommentEvents_1 = true;
  };
  protoOf(SSEConfig).showRetryEvents_y1q88c_k$ = function () {
    this.showRetryEvents_1 = true;
  };
  function get_sseRequestAttr() {
    _init_properties_builders_kt__ach3uw();
    return sseRequestAttr;
  }
  var sseRequestAttr;
  function get_reconnectionTimeAttr() {
    _init_properties_builders_kt__ach3uw();
    return reconnectionTimeAttr;
  }
  var reconnectionTimeAttr;
  function get_showCommentEventsAttr() {
    _init_properties_builders_kt__ach3uw();
    return showCommentEventsAttr;
  }
  var showCommentEventsAttr;
  function get_showRetryEventsAttr() {
    _init_properties_builders_kt__ach3uw();
    return showRetryEventsAttr;
  }
  var showRetryEventsAttr;
  var properties_initialized_builders_kt_nukecm;
  function _init_properties_builders_kt__ach3uw() {
    if (!properties_initialized_builders_kt_nukecm) {
      properties_initialized_builders_kt_nukecm = true;
      // Inline function 'io.ktor.util.AttributeKey' call
      var name = 'SSERequestFlag';
      // Inline function 'io.ktor.util.reflect.typeInfo' call
      var tmp = PrimitiveClasses_getInstance().get_booleanClass_d285fr_k$();
      // Inline function 'io.ktor.util.reflect.typeOfOrNull' call
      var tmp_0;
      try {
        tmp_0 = createKType(PrimitiveClasses_getInstance().get_booleanClass_d285fr_k$(), arrayOf([]), false);
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
      sseRequestAttr = new AttributeKey(name, tmp$ret$1);
      // Inline function 'io.ktor.util.AttributeKey' call
      var name_0 = 'SSEReconnectionTime';
      // Inline function 'io.ktor.util.reflect.typeInfo' call
      var tmp_2 = getKClass(Duration);
      // Inline function 'io.ktor.util.reflect.typeOfOrNull' call
      var tmp_3;
      try {
        tmp_3 = createKType(getKClass(Duration), arrayOf([]), false);
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
      reconnectionTimeAttr = new AttributeKey(name_0, tmp$ret$1_0);
      // Inline function 'io.ktor.util.AttributeKey' call
      var name_1 = 'SSEShowCommentEvents';
      // Inline function 'io.ktor.util.reflect.typeInfo' call
      var tmp_5 = PrimitiveClasses_getInstance().get_booleanClass_d285fr_k$();
      // Inline function 'io.ktor.util.reflect.typeOfOrNull' call
      var tmp_6;
      try {
        tmp_6 = createKType(PrimitiveClasses_getInstance().get_booleanClass_d285fr_k$(), arrayOf([]), false);
      } catch ($p) {
        var tmp_7;
        if ($p instanceof Error) {
          var _unused_var__etf5q3_1 = $p;
          tmp_7 = null;
        } else {
          throw $p;
        }
        tmp_6 = tmp_7;
      }
      var tmp$ret$0_1 = tmp_6;
      var tmp$ret$1_1 = new TypeInfo(tmp_5, tmp$ret$0_1);
      showCommentEventsAttr = new AttributeKey(name_1, tmp$ret$1_1);
      // Inline function 'io.ktor.util.AttributeKey' call
      var name_2 = 'SSEShowRetryEvents';
      // Inline function 'io.ktor.util.reflect.typeInfo' call
      var tmp_8 = PrimitiveClasses_getInstance().get_booleanClass_d285fr_k$();
      // Inline function 'io.ktor.util.reflect.typeOfOrNull' call
      var tmp_9;
      try {
        tmp_9 = createKType(PrimitiveClasses_getInstance().get_booleanClass_d285fr_k$(), arrayOf([]), false);
      } catch ($p) {
        var tmp_10;
        if ($p instanceof Error) {
          var _unused_var__etf5q3_2 = $p;
          tmp_10 = null;
        } else {
          throw $p;
        }
        tmp_9 = tmp_10;
      }
      var tmp$ret$0_2 = tmp_9;
      var tmp$ret$1_2 = new TypeInfo(tmp_8, tmp$ret$0_2);
      showRetryEventsAttr = new AttributeKey(name_2, tmp$ret$1_2);
    }
  }
  function get_REQUEST_EXTENSIONS_KEY() {
    _init_properties_WebSockets_kt__jaqpbo();
    return REQUEST_EXTENSIONS_KEY;
  }
  var REQUEST_EXTENSIONS_KEY;
  function get_LOGGER_12() {
    _init_properties_WebSockets_kt__jaqpbo();
    return LOGGER_12;
  }
  var LOGGER_12;
  function WebSocketCapability() {
    WebSocketCapability_instance = this;
  }
  protoOf(WebSocketCapability).toString = function () {
    return 'WebSocketCapability';
  };
  protoOf(WebSocketCapability).hashCode = function () {
    return -1146563391;
  };
  protoOf(WebSocketCapability).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof WebSocketCapability))
      return false;
    other instanceof WebSocketCapability || THROW_CCE();
    return true;
  };
  var WebSocketCapability_instance;
  function WebSocketCapability_getInstance() {
    if (WebSocketCapability_instance == null)
      new WebSocketCapability();
    return WebSocketCapability_instance;
  }
  function WebSocketException_init_$Init$(message, $this) {
    WebSocketException.call($this, message, null);
    return $this;
  }
  function WebSocketException_init_$Create$(message) {
    var tmp = WebSocketException_init_$Init$(message, objectCreate(protoOf(WebSocketException)));
    captureStack(tmp, WebSocketException_init_$Create$);
    return tmp;
  }
  function WebSocketException(message, cause) {
    IllegalStateException_init_$Init$_1(message, cause, this);
    captureStack(this, WebSocketException);
  }
  var properties_initialized_WebSockets_kt_2t2hw2;
  function _init_properties_WebSockets_kt__jaqpbo() {
    if (!properties_initialized_WebSockets_kt_2t2hw2) {
      properties_initialized_WebSockets_kt_2t2hw2 = true;
      // Inline function 'io.ktor.util.AttributeKey' call
      var name = 'Websocket extensions';
      // Inline function 'io.ktor.util.reflect.typeInfo' call
      var tmp = getKClass(KtList);
      // Inline function 'io.ktor.util.reflect.typeOfOrNull' call
      var tmp_0;
      try {
        tmp_0 = createKType(getKClass(KtList), arrayOf([createInvariantKTypeProjection(createKType(getKClass(WebSocketExtension), arrayOf([getStarKTypeProjection()]), false))]), false);
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
      REQUEST_EXTENSIONS_KEY = new AttributeKey(name, tmp$ret$1);
      LOGGER_12 = KtorSimpleLogger('io.ktor.client.plugins.websocket.WebSockets');
    }
  }
  function _get_content__ps04ag_1($this) {
    var tmp0 = $this.content$delegate_1;
    // Inline function 'kotlin.getValue' call
    content$factory();
    return tmp0.get_value_j01efc_k$();
  }
  function ClientUpgradeContent$content$delegate$lambda() {
    return new ByteChannel();
  }
  function $pipeToCOROUTINE$11(_this__u8e3s4, output, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.output_1 = output;
  }
  protoOf($pipeToCOROUTINE$11).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = copyAndClose(_get_content__ps04ag_1(this._this__u8e3s4__1), this.output_1, this);
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
  function ClientUpgradeContent() {
    NoContent.call(this);
    var tmp = this;
    tmp.content$delegate_1 = lazy(ClientUpgradeContent$content$delegate$lambda);
  }
  protoOf(ClientUpgradeContent).get_output_hs4j62_k$ = function () {
    return _get_content__ps04ag_1(this);
  };
  protoOf(ClientUpgradeContent).pipeTo_80kx7f_k$ = function (output, $completion) {
    var tmp = new $pipeToCOROUTINE$11(this, output, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  function content$factory() {
    return getPropertyCallableRef('content', 1, KProperty1, function (receiver) {
      return _get_content__ps04ag_1(receiver);
    }, null);
  }
  function DefaultHttpRequest(call, data) {
    this.call_1 = call;
    this.method_1 = data.get_method_gl8esq_k$();
    this.url_1 = data.get_url_18iuii_k$();
    this.content_1 = data.get_body_wojkyz_k$();
    this.headers_1 = data.get_headers_ef25jx_k$();
    this.attributes_1 = data.get_attributes_dgqof4_k$();
  }
  protoOf(DefaultHttpRequest).get_call_wojxrb_k$ = function () {
    return this.call_1;
  };
  protoOf(DefaultHttpRequest).get_coroutineContext_115oqo_k$ = function () {
    return this.get_call_wojxrb_k$().get_coroutineContext_115oqo_k$();
  };
  protoOf(DefaultHttpRequest).get_method_gl8esq_k$ = function () {
    return this.method_1;
  };
  protoOf(DefaultHttpRequest).get_url_18iuii_k$ = function () {
    return this.url_1;
  };
  protoOf(DefaultHttpRequest).get_content_h02jrk_k$ = function () {
    return this.content_1;
  };
  protoOf(DefaultHttpRequest).get_headers_ef25jx_k$ = function () {
    return this.headers_1;
  };
  protoOf(DefaultHttpRequest).get_attributes_dgqof4_k$ = function () {
    return this.attributes_1;
  };
  function get_ResponseAdapterAttributeKey() {
    _init_properties_HttpRequest_kt__813lx1();
    return ResponseAdapterAttributeKey;
  }
  var ResponseAdapterAttributeKey;
  function Companion_2() {
    Companion_instance_2 = this;
  }
  var Companion_instance_2;
  function Companion_getInstance_11() {
    if (Companion_instance_2 == null)
      new Companion_2();
    return Companion_instance_2;
  }
  function HttpRequestBuilder$setCapability$lambda() {
    // Inline function 'kotlin.collections.mutableMapOf' call
    return LinkedHashMap_init_$Create$();
  }
  function HttpRequestBuilder() {
    Companion_getInstance_11();
    this.url_1 = new URLBuilder();
    this.method_1 = Companion_getInstance().get_Get_18jsxf_k$();
    this.headers_1 = new HeadersBuilder();
    this.body_1 = EmptyContent_getInstance();
    this.executionContext_1 = SupervisorJob();
    this.attributes_1 = AttributesJsFn(true);
  }
  protoOf(HttpRequestBuilder).get_url_18iuii_k$ = function () {
    return this.url_1;
  };
  protoOf(HttpRequestBuilder).set_method_hoo95u_k$ = function (_set____db54di) {
    this.method_1 = _set____db54di;
  };
  protoOf(HttpRequestBuilder).get_method_gl8esq_k$ = function () {
    return this.method_1;
  };
  protoOf(HttpRequestBuilder).get_headers_ef25jx_k$ = function () {
    return this.headers_1;
  };
  protoOf(HttpRequestBuilder).set_body_slfhxt_k$ = function (_set____db54di) {
    this.body_1 = _set____db54di;
  };
  protoOf(HttpRequestBuilder).get_body_wojkyz_k$ = function () {
    return this.body_1;
  };
  protoOf(HttpRequestBuilder).set_bodyType_8pgqkl_k$ = function (value) {
    if (!(value == null)) {
      this.attributes_1.put_gkntno_k$(get_BodyTypeAttributeKey(), value);
    } else {
      this.attributes_1.remove_2btyex_k$(get_BodyTypeAttributeKey());
    }
  };
  protoOf(HttpRequestBuilder).get_bodyType_3n7prv_k$ = function () {
    return this.attributes_1.getOrNull_6mjt1v_k$(get_BodyTypeAttributeKey());
  };
  protoOf(HttpRequestBuilder).set_executionContext_pbxehy_k$ = function (_set____db54di) {
    this.executionContext_1 = _set____db54di;
  };
  protoOf(HttpRequestBuilder).get_executionContext_yb2vgg_k$ = function () {
    return this.executionContext_1;
  };
  protoOf(HttpRequestBuilder).get_attributes_dgqof4_k$ = function () {
    return this.attributes_1;
  };
  protoOf(HttpRequestBuilder).url_gkqa8r_k$ = function (block) {
    return block(this.url_1, this.url_1);
  };
  protoOf(HttpRequestBuilder).build_1k0s4u_k$ = function () {
    var tmp = this.url_1.build_1k0s4u_k$();
    var tmp_0 = this.method_1;
    var tmp_1 = this.headers_1.build_1k0s4u_k$();
    var tmp_2 = this.body_1;
    var tmp0_elvis_lhs = tmp_2 instanceof OutgoingContent ? tmp_2 : null;
    var tmp_3;
    if (tmp0_elvis_lhs == null) {
      var message = 'No request transformation found: ' + toString(this.body_1);
      throw IllegalStateException_init_$Create$(toString(message));
    } else {
      tmp_3 = tmp0_elvis_lhs;
    }
    return new HttpRequestData(tmp, tmp_0, tmp_1, tmp_3, this.executionContext_1, this.attributes_1);
  };
  protoOf(HttpRequestBuilder).setAttributes_s4k9r6_k$ = function (block) {
    // Inline function 'kotlin.apply' call
    block(this.attributes_1);
  };
  protoOf(HttpRequestBuilder).takeFromWithExecutionContext_9qmqoi_k$ = function (builder) {
    this.executionContext_1 = builder.executionContext_1;
    return this.takeFrom_wuijvv_k$(builder);
  };
  protoOf(HttpRequestBuilder).takeFrom_wuijvv_k$ = function (builder) {
    this.method_1 = builder.method_1;
    this.body_1 = builder.body_1;
    this.set_bodyType_8pgqkl_k$(builder.get_bodyType_3n7prv_k$());
    takeFrom_0(this.url_1, builder.url_1);
    this.url_1.set_encodedPathSegments_jw2fx8_k$(this.url_1.get_encodedPathSegments_tl8vo6_k$());
    appendAll(this.headers_1, builder.headers_1);
    putAll(this.attributes_1, builder.attributes_1);
    return this;
  };
  protoOf(HttpRequestBuilder).setCapability_di4fgr_k$ = function (key, capability) {
    var tmp = get_ENGINE_CAPABILITIES_KEY();
    var capabilities = this.attributes_1.computeIfAbsent_c4qp5i_k$(tmp, HttpRequestBuilder$setCapability$lambda);
    // Inline function 'kotlin.collections.set' call
    capabilities.put_4fpzoq_k$(key, capability);
  };
  protoOf(HttpRequestBuilder).getCapabilityOrNull_welm9h_k$ = function (key) {
    var tmp0_safe_receiver = this.attributes_1.getOrNull_6mjt1v_k$(get_ENGINE_CAPABILITIES_KEY());
    var tmp = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.get_wei43m_k$(key);
    return (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
  };
  function HttpRequest_0() {
  }
  function HttpRequestData(url, method, headers, body, executionContext, attributes) {
    this.url_1 = url;
    this.method_1 = method;
    this.headers_1 = headers;
    this.body_1 = body;
    this.executionContext_1 = executionContext;
    this.attributes_1 = attributes;
    var tmp = this;
    var tmp0_safe_receiver = this.attributes_1.getOrNull_6mjt1v_k$(get_ENGINE_CAPABILITIES_KEY());
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.get_keys_wop4xp_k$();
    tmp.requiredCapabilities_1 = tmp1_elvis_lhs == null ? emptySet() : tmp1_elvis_lhs;
  }
  protoOf(HttpRequestData).get_url_18iuii_k$ = function () {
    return this.url_1;
  };
  protoOf(HttpRequestData).get_method_gl8esq_k$ = function () {
    return this.method_1;
  };
  protoOf(HttpRequestData).get_headers_ef25jx_k$ = function () {
    return this.headers_1;
  };
  protoOf(HttpRequestData).get_body_wojkyz_k$ = function () {
    return this.body_1;
  };
  protoOf(HttpRequestData).get_executionContext_yb2vgg_k$ = function () {
    return this.executionContext_1;
  };
  protoOf(HttpRequestData).get_attributes_dgqof4_k$ = function () {
    return this.attributes_1;
  };
  protoOf(HttpRequestData).getCapabilityOrNull_xl2bq4_k$ = function (key) {
    var tmp0_safe_receiver = this.attributes_1.getOrNull_6mjt1v_k$(get_ENGINE_CAPABILITIES_KEY());
    var tmp = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.get_wei43m_k$(key);
    return (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
  };
  protoOf(HttpRequestData).get_requiredCapabilities_2lys3z_k$ = function () {
    return this.requiredCapabilities_1;
  };
  protoOf(HttpRequestData).toString = function () {
    return 'HttpRequestData(url=' + this.url_1.toString() + ', method=' + this.method_1.toString() + ')';
  };
  function ResponseAdapter() {
  }
  function SSEClientResponseAdapter() {
  }
  protoOf(SSEClientResponseAdapter).adapt_fv4lp9_k$ = function (data, status, headers, responseBody, outgoingContent, callContext) {
    var tmp0_safe_receiver = headers.get_6bo4tg_k$(HttpHeaders_getInstance().get_ContentType_z1j0sq_k$());
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      tmp = Companion_getInstance_4().parse_pc1q8p_k$(tmp0_safe_receiver);
    }
    var contentType = tmp;
    var tmp_0;
    var tmp_1;
    if (isSseRequest(data) && status.equals(Companion_getInstance_1().get_OK_kntokb_k$())) {
      tmp_1 = equals(contentType == null ? null : contentType.withoutParameters_wrqe36_k$(), Text_getInstance().get_EventStream_rs47v3_k$());
    } else {
      tmp_1 = false;
    }
    if (tmp_1) {
      tmp_0 = new DefaultClientSSESession(outgoingContent instanceof SSEClientContent ? outgoingContent : THROW_CCE(), responseBody, callContext);
    } else {
      tmp_0 = null;
    }
    return tmp_0;
  };
  function isSseRequest(_this__u8e3s4) {
    _init_properties_HttpRequest_kt__813lx1();
    var tmp = _this__u8e3s4.body_1;
    return tmp instanceof SSEClientContent;
  }
  function HttpResponseData(statusCode, requestTime, headers, version, body, callContext) {
    this.statusCode_1 = statusCode;
    this.requestTime_1 = requestTime;
    this.headers_1 = headers;
    this.version_1 = version;
    this.body_1 = body;
    this.callContext_1 = callContext;
    this.responseTime_1 = GMTDate();
  }
  protoOf(HttpResponseData).get_statusCode_g2w4u0_k$ = function () {
    return this.statusCode_1;
  };
  protoOf(HttpResponseData).get_requestTime_wwxhg3_k$ = function () {
    return this.requestTime_1;
  };
  protoOf(HttpResponseData).get_headers_ef25jx_k$ = function () {
    return this.headers_1;
  };
  protoOf(HttpResponseData).get_version_72w4j3_k$ = function () {
    return this.version_1;
  };
  protoOf(HttpResponseData).get_body_wojkyz_k$ = function () {
    return this.body_1;
  };
  protoOf(HttpResponseData).get_callContext_mskb9k_k$ = function () {
    return this.callContext_1;
  };
  protoOf(HttpResponseData).get_responseTime_scfvg7_k$ = function () {
    return this.responseTime_1;
  };
  protoOf(HttpResponseData).toString = function () {
    return 'HttpResponseData=(statusCode=' + this.statusCode_1.toString() + ')';
  };
  function url(_this__u8e3s4, urlString) {
    _init_properties_HttpRequest_kt__813lx1();
    takeFrom(_this__u8e3s4.url_1, urlString);
  }
  function isUpgradeRequest(_this__u8e3s4) {
    _init_properties_HttpRequest_kt__813lx1();
    var tmp = _this__u8e3s4.body_1;
    return tmp instanceof ClientUpgradeContent;
  }
  var properties_initialized_HttpRequest_kt_zh09pz;
  function _init_properties_HttpRequest_kt__813lx1() {
    if (!properties_initialized_HttpRequest_kt_zh09pz) {
      properties_initialized_HttpRequest_kt_zh09pz = true;
      // Inline function 'io.ktor.util.AttributeKey' call
      var name = 'ResponseAdapterAttributeKey';
      // Inline function 'io.ktor.util.reflect.typeInfo' call
      var tmp = getKClass(ResponseAdapter);
      // Inline function 'io.ktor.util.reflect.typeOfOrNull' call
      var tmp_0;
      try {
        tmp_0 = createKType(getKClass(ResponseAdapter), arrayOf([]), false);
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
      ResponseAdapterAttributeKey = new AttributeKey(name, tmp$ret$1);
    }
  }
  function Phases() {
    Phases_instance = this;
    this.Before_1 = new PipelinePhase('Before');
    this.State_1 = new PipelinePhase('State');
    this.Transform_1 = new PipelinePhase('Transform');
    this.Render_1 = new PipelinePhase('Render');
    this.Send_1 = new PipelinePhase('Send');
  }
  protoOf(Phases).get_Before_3ry4pk_k$ = function () {
    return this.Before_1;
  };
  protoOf(Phases).get_State_ih4i88_k$ = function () {
    return this.State_1;
  };
  protoOf(Phases).get_Transform_byqycd_k$ = function () {
    return this.Transform_1;
  };
  protoOf(Phases).get_Render_3swp1b_k$ = function () {
    return this.Render_1;
  };
  protoOf(Phases).get_Send_wo9sz5_k$ = function () {
    return this.Send_1;
  };
  var Phases_instance;
  function Phases_getInstance() {
    if (Phases_instance == null)
      new Phases();
    return Phases_instance;
  }
  function HttpRequestPipeline(developmentMode) {
    Phases_getInstance();
    developmentMode = developmentMode === VOID ? true : developmentMode;
    Pipeline.call(this, [Phases_getInstance().Before_1, Phases_getInstance().State_1, Phases_getInstance().Transform_1, Phases_getInstance().Render_1, Phases_getInstance().Send_1]);
    this.developmentMode_2 = developmentMode;
  }
  protoOf(HttpRequestPipeline).get_developmentMode_eqiro5_k$ = function () {
    return this.developmentMode_2;
  };
  function Phases_0() {
    Phases_instance_0 = this;
    this.Before_1 = new PipelinePhase('Before');
    this.State_1 = new PipelinePhase('State');
    this.Monitoring_1 = new PipelinePhase('Monitoring');
    this.Engine_1 = new PipelinePhase('Engine');
    this.Receive_1 = new PipelinePhase('Receive');
  }
  protoOf(Phases_0).get_Before_3ry4pk_k$ = function () {
    return this.Before_1;
  };
  protoOf(Phases_0).get_State_ih4i88_k$ = function () {
    return this.State_1;
  };
  protoOf(Phases_0).get_Monitoring_rltjwv_k$ = function () {
    return this.Monitoring_1;
  };
  protoOf(Phases_0).get_Engine_27ulqt_k$ = function () {
    return this.Engine_1;
  };
  protoOf(Phases_0).get_Receive_oc3k86_k$ = function () {
    return this.Receive_1;
  };
  var Phases_instance_0;
  function Phases_getInstance_0() {
    if (Phases_instance_0 == null)
      new Phases_0();
    return Phases_instance_0;
  }
  function HttpSendPipeline(developmentMode) {
    Phases_getInstance_0();
    developmentMode = developmentMode === VOID ? true : developmentMode;
    Pipeline.call(this, [Phases_getInstance_0().Before_1, Phases_getInstance_0().State_1, Phases_getInstance_0().Monitoring_1, Phases_getInstance_0().Engine_1, Phases_getInstance_0().Receive_1]);
    this.developmentMode_2 = developmentMode;
  }
  protoOf(HttpSendPipeline).get_developmentMode_eqiro5_k$ = function () {
    return this.developmentMode_2;
  };
  function get_BodyTypeAttributeKey() {
    _init_properties_RequestBody_kt__bo3lwf();
    return BodyTypeAttributeKey;
  }
  var BodyTypeAttributeKey;
  var properties_initialized_RequestBody_kt_agyv1b;
  function _init_properties_RequestBody_kt__bo3lwf() {
    if (!properties_initialized_RequestBody_kt_agyv1b) {
      properties_initialized_RequestBody_kt_agyv1b = true;
      // Inline function 'io.ktor.util.AttributeKey' call
      var name = 'BodyTypeAttributeKey';
      // Inline function 'io.ktor.util.reflect.typeInfo' call
      var tmp = getKClass(TypeInfo);
      // Inline function 'io.ktor.util.reflect.typeOfOrNull' call
      var tmp_0;
      try {
        tmp_0 = createKType(getKClass(TypeInfo), arrayOf([]), false);
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
      BodyTypeAttributeKey = new AttributeKey(name, tmp$ret$1);
    }
  }
  function preparePost(_this__u8e3s4, urlString, block, $completion) {
    var tmp;
    if (block === VOID) {
      tmp = preparePost$lambda;
    } else {
      tmp = block;
    }
    block = tmp;
    // Inline function 'io.ktor.client.request.preparePost' call
    // Inline function 'kotlin.apply' call
    var this_0 = new HttpRequestBuilder();
    url(this_0, urlString);
    block(this_0);
    // Inline function 'io.ktor.client.request.preparePost' call
    this_0.set_method_hoo95u_k$(Companion_getInstance().get_Post_wo83k9_k$());
    // Inline function 'io.ktor.client.request.prepareRequest' call
    return new HttpStatement(this_0, _this__u8e3s4);
  }
  function preparePost_0(_this__u8e3s4, block, $completion) {
    // Inline function 'kotlin.apply' call
    var this_0 = new HttpRequestBuilder();
    block(this_0);
    // Inline function 'io.ktor.client.request.preparePost' call
    this_0.set_method_hoo95u_k$(Companion_getInstance().get_Post_wo83k9_k$());
    // Inline function 'io.ktor.client.request.prepareRequest' call
    return new HttpStatement(this_0, _this__u8e3s4);
  }
  function preparePost_1(_this__u8e3s4, builder, $completion) {
    builder.set_method_hoo95u_k$(Companion_getInstance().get_Post_wo83k9_k$());
    // Inline function 'io.ktor.client.request.prepareRequest' call
    return new HttpStatement(builder, _this__u8e3s4);
  }
  function prepareRequest(_this__u8e3s4, builder, $completion) {
    builder = builder === VOID ? new HttpRequestBuilder() : builder;
    return new HttpStatement(builder, _this__u8e3s4);
  }
  function preparePost$lambda(_this__u8e3s4) {
    return Unit_getInstance();
  }
  function get_RN_BYTES() {
    _init_properties_FormDataContent_kt__7tvkbr();
    return RN_BYTES;
  }
  var RN_BYTES;
  var properties_initialized_FormDataContent_kt_w3e0rf;
  function _init_properties_FormDataContent_kt__7tvkbr() {
    if (!properties_initialized_FormDataContent_kt_w3e0rf) {
      properties_initialized_FormDataContent_kt_w3e0rf = true;
      RN_BYTES = toByteArray_0('\r\n');
    }
  }
  function header(_this__u8e3s4, key, value) {
    var tmp;
    if (value == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      _this__u8e3s4.get_headers_ef25jx_k$().append_rhug0a_k$(key, toString(value));
      tmp = Unit_getInstance();
    }
    var tmp1_elvis_lhs = tmp;
    return tmp1_elvis_lhs == null ? Unit_getInstance() : tmp1_elvis_lhs;
  }
  function accept(_this__u8e3s4, contentType) {
    return _this__u8e3s4.get_headers_ef25jx_k$().append_rhug0a_k$(HttpHeaders_getInstance().get_Accept_4a5gpb_k$(), contentType.toString());
  }
  function DefaultHttpResponse(call, responseData) {
    HttpResponse.call(this);
    this.call_1 = call;
    this.coroutineContext_1 = responseData.get_callContext_mskb9k_k$();
    this.status_1 = responseData.get_statusCode_g2w4u0_k$();
    this.version_1 = responseData.get_version_72w4j3_k$();
    this.requestTime_1 = responseData.get_requestTime_wwxhg3_k$();
    this.responseTime_1 = responseData.get_responseTime_scfvg7_k$();
    var tmp = this;
    var tmp_0 = responseData.get_body_wojkyz_k$();
    var tmp0_elvis_lhs = isInterface(tmp_0, ByteReadChannel) ? tmp_0 : null;
    tmp.rawContent_1 = tmp0_elvis_lhs == null ? Companion_getInstance_0().get_Empty_i9b85g_k$() : tmp0_elvis_lhs;
    this.headers_1 = responseData.get_headers_ef25jx_k$();
  }
  protoOf(DefaultHttpResponse).get_call_wojxrb_k$ = function () {
    return this.call_1;
  };
  protoOf(DefaultHttpResponse).get_coroutineContext_115oqo_k$ = function () {
    return this.coroutineContext_1;
  };
  protoOf(DefaultHttpResponse).get_status_jnf6d7_k$ = function () {
    return this.status_1;
  };
  protoOf(DefaultHttpResponse).get_version_72w4j3_k$ = function () {
    return this.version_1;
  };
  protoOf(DefaultHttpResponse).get_requestTime_wwxhg3_k$ = function () {
    return this.requestTime_1;
  };
  protoOf(DefaultHttpResponse).get_responseTime_scfvg7_k$ = function () {
    return this.responseTime_1;
  };
  protoOf(DefaultHttpResponse).get_rawContent_u3f8li_k$ = function () {
    return this.rawContent_1;
  };
  protoOf(DefaultHttpResponse).get_headers_ef25jx_k$ = function () {
    return this.headers_1;
  };
  function HttpResponse() {
  }
  protoOf(HttpResponse).toString = function () {
    return 'HttpResponse[' + get_request(this).get_url_18iuii_k$().toString() + ', ' + this.get_status_jnf6d7_k$().toString() + ']';
  };
  function get_request(_this__u8e3s4) {
    return _this__u8e3s4.get_call_wojxrb_k$().get_request_jdwg4m_k$();
  }
  function bodyAsText(_this__u8e3s4, fallbackCharset, $completion) {
    fallbackCharset = fallbackCharset === VOID ? Charsets_getInstance().get_UTF_8_ihn39z_k$() : fallbackCharset;
    var tmp = new $bodyAsTextCOROUTINE$12(_this__u8e3s4, fallbackCharset, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  }
  function bodyAsChannel(_this__u8e3s4, $completion) {
    var tmp = new $bodyAsChannelCOROUTINE$13(_this__u8e3s4, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  }
  function complete(_this__u8e3s4) {
    var tmp = ensureNotNull(_this__u8e3s4.get_coroutineContext_115oqo_k$().get_y2st91_k$(Key_getInstance()));
    var job = isInterface(tmp, CompletableJob) ? tmp : THROW_CCE();
    job.complete_9ww6vb_k$();
  }
  function $bodyAsTextCOROUTINE$12(_this__u8e3s4, fallbackCharset, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.fallbackCharset_1 = fallbackCharset;
  }
  protoOf($bodyAsTextCOROUTINE$12).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            var tmp_0 = this;
            var tmp0_elvis_lhs = charset_0(this._this__u8e3s4__1);
            tmp_0.originCharset0__1 = tmp0_elvis_lhs == null ? this.fallbackCharset_1 : tmp0_elvis_lhs;
            this.decoder1__1 = this.originCharset0__1.newDecoder_zcettw_k$();
            var tmp_1 = this;
            tmp_1.tmp02__1 = this._this__u8e3s4__1;
            this.this3__1 = this.tmp02__1;
            this.set_state_rjd8d0_k$(1);
            var tmp_2 = this.this3__1.get_call_wojxrb_k$();
            var tmp_3 = getKClass(Source);
            var tmp_4;
            try {
              tmp_4 = createKType(getKClass(Source), arrayOf([]), false);
            } catch ($p) {
              var tmp_5;
              if ($p instanceof Error) {
                var _unused_var__etf5q3 = $p;
                tmp_5 = null;
              } else {
                throw $p;
              }
              tmp_4 = tmp_5;
            }

            suspendResult = tmp_2.bodyNullable_wn8z59_k$(new TypeInfo(tmp_3, tmp_4), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var input = (!(suspendResult == null) ? isInterface(suspendResult, Source) : false) ? suspendResult : THROW_CCE();
            return decode(this.decoder1__1, input);
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
  function $bodyAsChannelCOROUTINE$13(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
  }
  protoOf($bodyAsChannelCOROUTINE$13).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            var tmp_0 = this;
            tmp_0.tmp00__1 = this._this__u8e3s4__1;
            this.this1__1 = this.tmp00__1;
            this.set_state_rjd8d0_k$(1);
            var tmp_1 = this.this1__1.get_call_wojxrb_k$();
            var tmp_2 = getKClass(ByteReadChannel);
            var tmp_3;
            try {
              tmp_3 = createKType(getKClass(ByteReadChannel), arrayOf([]), false);
            } catch ($p) {
              var tmp_4;
              if ($p instanceof Error) {
                var _unused_var__etf5q3 = $p;
                tmp_4 = null;
              } else {
                throw $p;
              }
              tmp_3 = tmp_4;
            }

            suspendResult = tmp_1.bodyNullable_wn8z59_k$(new TypeInfo(tmp_2, tmp_3), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            return (!(suspendResult == null) ? isInterface(suspendResult, ByteReadChannel) : false) ? suspendResult : THROW_CCE();
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
  function Phases_1() {
    Phases_instance_1 = this;
    this.Before_1 = new PipelinePhase('Before');
    this.State_1 = new PipelinePhase('State');
    this.After_1 = new PipelinePhase('After');
  }
  protoOf(Phases_1).get_Before_3ry4pk_k$ = function () {
    return this.Before_1;
  };
  protoOf(Phases_1).get_State_ih4i88_k$ = function () {
    return this.State_1;
  };
  protoOf(Phases_1).get_After_i6zngz_k$ = function () {
    return this.After_1;
  };
  var Phases_instance_1;
  function Phases_getInstance_1() {
    if (Phases_instance_1 == null)
      new Phases_1();
    return Phases_instance_1;
  }
  function HttpReceivePipeline(developmentMode) {
    Phases_getInstance_1();
    developmentMode = developmentMode === VOID ? true : developmentMode;
    Pipeline.call(this, [Phases_getInstance_1().Before_1, Phases_getInstance_1().State_1, Phases_getInstance_1().After_1]);
    this.developmentMode_2 = developmentMode;
  }
  protoOf(HttpReceivePipeline).get_developmentMode_eqiro5_k$ = function () {
    return this.developmentMode_2;
  };
  function Phases_2() {
    Phases_instance_2 = this;
    this.Receive_1 = new PipelinePhase('Receive');
    this.Parse_1 = new PipelinePhase('Parse');
    this.Transform_1 = new PipelinePhase('Transform');
    this.State_1 = new PipelinePhase('State');
    this.After_1 = new PipelinePhase('After');
  }
  protoOf(Phases_2).get_Receive_oc3k86_k$ = function () {
    return this.Receive_1;
  };
  protoOf(Phases_2).get_Parse_if5ca2_k$ = function () {
    return this.Parse_1;
  };
  protoOf(Phases_2).get_Transform_byqycd_k$ = function () {
    return this.Transform_1;
  };
  protoOf(Phases_2).get_State_ih4i88_k$ = function () {
    return this.State_1;
  };
  protoOf(Phases_2).get_After_i6zngz_k$ = function () {
    return this.After_1;
  };
  var Phases_instance_2;
  function Phases_getInstance_2() {
    if (Phases_instance_2 == null)
      new Phases_2();
    return Phases_instance_2;
  }
  function HttpResponsePipeline(developmentMode) {
    Phases_getInstance_2();
    developmentMode = developmentMode === VOID ? true : developmentMode;
    Pipeline.call(this, [Phases_getInstance_2().Receive_1, Phases_getInstance_2().Parse_1, Phases_getInstance_2().Transform_1, Phases_getInstance_2().State_1, Phases_getInstance_2().After_1]);
    this.developmentMode_2 = developmentMode;
  }
  protoOf(HttpResponsePipeline).get_developmentMode_eqiro5_k$ = function () {
    return this.developmentMode_2;
  };
  function HttpResponseContainer(expectedType, response) {
    this.expectedType_1 = expectedType;
    this.response_1 = response;
  }
  protoOf(HttpResponseContainer).get_expectedType_79s38b_k$ = function () {
    return this.expectedType_1;
  };
  protoOf(HttpResponseContainer).get_response_xlk07e_k$ = function () {
    return this.response_1;
  };
  protoOf(HttpResponseContainer).component1_7eebsc_k$ = function () {
    return this.expectedType_1;
  };
  protoOf(HttpResponseContainer).component2_7eebsb_k$ = function () {
    return this.response_1;
  };
  protoOf(HttpResponseContainer).copy_gtmgle_k$ = function (expectedType, response) {
    return new HttpResponseContainer(expectedType, response);
  };
  protoOf(HttpResponseContainer).copy$default_pseifo_k$ = function (expectedType, response, $super) {
    expectedType = expectedType === VOID ? this.expectedType_1 : expectedType;
    response = response === VOID ? this.response_1 : response;
    return $super === VOID ? this.copy_gtmgle_k$(expectedType, response) : $super.copy_gtmgle_k$.call(this, expectedType, response);
  };
  protoOf(HttpResponseContainer).toString = function () {
    return 'HttpResponseContainer(expectedType=' + this.expectedType_1.toString() + ', response=' + toString(this.response_1) + ')';
  };
  protoOf(HttpResponseContainer).hashCode = function () {
    var result = this.expectedType_1.hashCode();
    result = imul(result, 31) + hashCode(this.response_1) | 0;
    return result;
  };
  protoOf(HttpResponseContainer).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof HttpResponseContainer))
      return false;
    var tmp0_other_with_cast = other instanceof HttpResponseContainer ? other : THROW_CCE();
    if (!this.expectedType_1.equals(tmp0_other_with_cast.expectedType_1))
      return false;
    if (!equals(this.response_1, tmp0_other_with_cast.response_1))
      return false;
    return true;
  };
  function _get_builder__bi005y($this) {
    return $this.builder_1;
  }
  function $executeCOROUTINE$14(_this__u8e3s4, block, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.block_1 = block;
  }
  protoOf($executeCOROUTINE$14).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(14);
            this.set_state_rjd8d0_k$(1);
            continue $sm;
          case 1:
            this.set_exceptionState_fex74n_k$(13);
            this.set_state_rjd8d0_k$(2);
            suspendResult = this._this__u8e3s4__1.fetchStreamingResponse_5m01ac_k$(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            this.response1__1 = suspendResult;
            this.set_state_rjd8d0_k$(3);
            continue $sm;
          case 3:
            this.set_state_rjd8d0_k$(4);
            continue $sm;
          case 4:
            this.set_exceptionState_fex74n_k$(11);
            this.set_state_rjd8d0_k$(5);
            suspendResult = this.block_1(this.response1__1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 5:
            this.tmp$ret$03__1 = suspendResult;
            this.set_state_rjd8d0_k$(6);
            var tmp_0 = this;
            continue $sm;
          case 6:
            this.tmp4__1 = this.tmp$ret$03__1;
            this.set_exceptionState_fex74n_k$(13);
            this.set_state_rjd8d0_k$(7);
            suspendResult = this._this__u8e3s4__1.cleanup_fxfbd2_k$(this.response1__1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 7:
            return this.tmp4__1;
          case 8:
            this.set_exceptionState_fex74n_k$(13);
            this.set_state_rjd8d0_k$(9);
            suspendResult = this._this__u8e3s4__1.cleanup_fxfbd2_k$(this.response1__1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 9:
            var tmp_1 = this;
            tmp_1.tmp$ret$40__1 = Unit_getInstance();
            this.set_exceptionState_fex74n_k$(14);
            this.set_state_rjd8d0_k$(10);
            continue $sm;
          case 10:
            return this.tmp$ret$40__1;
          case 11:
            this.set_exceptionState_fex74n_k$(13);
            this.t5__1 = this.get_exception_x0n6w6_k$();
            this.set_state_rjd8d0_k$(12);
            suspendResult = this._this__u8e3s4__1.cleanup_fxfbd2_k$(this.response1__1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 12:
            throw this.t5__1;
          case 13:
            this.set_exceptionState_fex74n_k$(14);
            var tmp_2 = this.get_exception_x0n6w6_k$();
            if (tmp_2 instanceof CancellationException) {
              var cause = this.get_exception_x0n6w6_k$();
              throw unwrapCancellationException(cause);
            } else {
              throw this.get_exception_x0n6w6_k$();
            }

          case 14:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 14) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  function $fetchStreamingResponseCOROUTINE$15(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
  }
  protoOf($fetchStreamingResponseCOROUTINE$15).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(5);
            this.set_state_rjd8d0_k$(1);
            continue $sm;
          case 1:
            this.set_exceptionState_fex74n_k$(4);
            this.builder1__1 = (new HttpRequestBuilder()).takeFromWithExecutionContext_9qmqoi_k$(this._this__u8e3s4__1.builder_1);
            skipSavingBody(this.builder1__1);
            this.set_state_rjd8d0_k$(2);
            suspendResult = this._this__u8e3s4__1.client_1.execute_1mk68n_k$(this.builder1__1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            var call = suspendResult;
            var tmp_0 = this;
            return call.get_response_xlk07e_k$();
          case 3:
            return this.tmp$ret$00__1;
          case 4:
            this.set_exceptionState_fex74n_k$(5);
            var tmp_1 = this.get_exception_x0n6w6_k$();
            if (tmp_1 instanceof CancellationException) {
              var cause = this.get_exception_x0n6w6_k$();
              throw unwrapCancellationException(cause);
            } else {
              throw this.get_exception_x0n6w6_k$();
            }

          case 5:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 5) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  function $fetchResponseCOROUTINE$16(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
  }
  protoOf($fetchResponseCOROUTINE$16).doResume_5yljmg_k$ = function () {
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
            this.builder1__1 = (new HttpRequestBuilder()).takeFromWithExecutionContext_9qmqoi_k$(this._this__u8e3s4__1.builder_1);
            this.set_state_rjd8d0_k$(2);
            suspendResult = this._this__u8e3s4__1.client_1.execute_1mk68n_k$(this.builder1__1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            this.call2__1 = suspendResult;
            this.set_state_rjd8d0_k$(3);
            suspendResult = save(this.call2__1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 3:
            this.ARGUMENT3__1 = suspendResult;
            this.result4__1 = this.ARGUMENT3__1.get_response_xlk07e_k$();
            this.set_state_rjd8d0_k$(4);
            suspendResult = this._this__u8e3s4__1.cleanup_fxfbd2_k$(this.call2__1.get_response_xlk07e_k$(), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 4:
            var tmp_0 = this;
            return this.result4__1;
          case 5:
            return this.tmp$ret$00__1;
          case 6:
            this.set_exceptionState_fex74n_k$(7);
            var tmp_1 = this.get_exception_x0n6w6_k$();
            if (tmp_1 instanceof CancellationException) {
              var cause = this.get_exception_x0n6w6_k$();
              throw unwrapCancellationException(cause);
            } else {
              throw this.get_exception_x0n6w6_k$();
            }

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
  function $cleanupCOROUTINE$17(_this__u8e3s4, _this__u8e3s4_0, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this._this__u8e3s4__2 = _this__u8e3s4_0;
  }
  protoOf($cleanupCOROUTINE$17).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(4);
            var tmp_0 = this;
            var tmp_1 = ensureNotNull(this._this__u8e3s4__2.get_coroutineContext_115oqo_k$().get_y2st91_k$(Key_getInstance()));
            tmp_0.job0__1 = isInterface(tmp_1, CompletableJob) ? tmp_1 : THROW_CCE();
            var tmp_2 = this;
            tmp_2.tmp01__1 = this.job0__1;
            this.this2__1 = this.tmp01__1;
            var tmp_3 = this;
            tmp_3.tmp13__1 = this.this2__1;
            this.$this$apply4__1 = this.tmp13__1;
            this.$this$apply4__1.complete_9ww6vb_k$();
            this.set_exceptionState_fex74n_k$(1);
            cancel_1(this._this__u8e3s4__2.get_rawContent_u3f8li_k$());
            this.set_exceptionState_fex74n_k$(4);
            this.set_state_rjd8d0_k$(2);
            continue $sm;
          case 1:
            this.set_exceptionState_fex74n_k$(4);
            var tmp_4 = this.get_exception_x0n6w6_k$();
            if (tmp_4 instanceof Error) {
              this._unused_var_5_x5dlkg_1 = this.get_exception_x0n6w6_k$();
              this.set_state_rjd8d0_k$(2);
              continue $sm;
            } else {
              throw this.get_exception_x0n6w6_k$();
            }

          case 2:
            this.set_exceptionState_fex74n_k$(4);
            this.set_state_rjd8d0_k$(3);
            suspendResult = this.$this$apply4__1.join_o20dar_k$(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 3:
            return Unit_getInstance();
          case 4:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 4) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  function HttpStatement(builder, client) {
    this.builder_1 = builder;
    this.client_1 = client;
  }
  protoOf(HttpStatement).get_client_f22893_k$ = function () {
    return this.client_1;
  };
  protoOf(HttpStatement).execute_dr84pm_k$ = function (block, $completion) {
    var tmp = new $executeCOROUTINE$14(this, block, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(HttpStatement).execute_rsj18j_k$ = function ($completion) {
    return this.fetchResponse_nxdygm_k$($completion);
  };
  protoOf(HttpStatement).fetchStreamingResponse_5m01ac_k$ = function ($completion) {
    var tmp = new $fetchStreamingResponseCOROUTINE$15(this, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(HttpStatement).fetchResponse_nxdygm_k$ = function ($completion) {
    var tmp = new $fetchResponseCOROUTINE$16(this, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(HttpStatement).cleanup_fxfbd2_k$ = function (_this__u8e3s4, $completion) {
    var tmp = new $cleanupCOROUTINE$17(this, _this__u8e3s4, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(HttpStatement).toString = function () {
    return 'HttpStatement[' + this.builder_1.get_url_18iuii_k$().toString() + ']';
  };
  function readBytes(_this__u8e3s4, count, $completion) {
    var tmp = new $readBytesCOROUTINE$18(_this__u8e3s4, count, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  }
  function $readBytesCOROUTINE$18(_this__u8e3s4, count, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.count_1 = count;
  }
  protoOf($readBytesCOROUTINE$18).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            var tmp_0 = this;
            tmp_0.tmp00__1 = new Int8Array(this.count_1);
            this.this1__1 = this.tmp00__1;
            var tmp_1 = this;
            tmp_1.tmp12__1 = this.this1__1;
            this.it3__1 = this.tmp12__1;
            this.set_state_rjd8d0_k$(1);
            suspendResult = readFully(this._this__u8e3s4__1.get_rawContent_u3f8li_k$(), this.it3__1, VOID, VOID, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            return this.this1__1;
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
  function observable(_this__u8e3s4, context, contentLength, listener) {
    var tmp = GlobalScope_getInstance();
    return writer(tmp, context, true, observable$slambda_0(_this__u8e3s4, listener, contentLength, null)).get_channel_dhi7tm_k$();
  }
  function observable$slambda($this_observable, $listener, $contentLength, resultContinuation) {
    this.$this_observable_1 = $this_observable;
    this.$listener_1 = $listener;
    this.$contentLength_1 = $contentLength;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(observable$slambda).invoke_86bb4c_k$ = function ($this$writer, $completion) {
    var tmp = this.create_fmjhmg_k$($this$writer, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(observable$slambda).invoke_qns8j1_k$ = function (p1, $completion) {
    return this.invoke_86bb4c_k$(p1 instanceof WriterScope ? p1 : THROW_CCE(), $completion);
  };
  protoOf(observable$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(16);
            var tmp_0 = this;
            tmp_0.tmp00__1 = get_ByteArrayPool();
            this.set_state_rjd8d0_k$(1);
            continue $sm;
          case 1:
            this.this2__1 = this.tmp00__1;
            this.instance3__1 = this.this2__1.borrow_mvkpor_k$();
            this.set_state_rjd8d0_k$(2);
            continue $sm;
          case 2:
            this.set_state_rjd8d0_k$(3);
            continue $sm;
          case 3:
            this.set_exceptionState_fex74n_k$(15);
            var tmp_1 = this;
            tmp_1.tmp16__1 = this.instance3__1;
            this.byteArray7__1 = this.tmp16__1;
            this.bytesSend8__1 = new Long(0, 0);
            this.set_state_rjd8d0_k$(4);
            continue $sm;
          case 4:
            if (!!this.$this_observable_1.get_isClosedForRead_ajcc1s_k$()) {
              this.set_state_rjd8d0_k$(9);
              continue $sm;
            }

            this.set_state_rjd8d0_k$(5);
            suspendResult = readAvailable(this.$this_observable_1, this.byteArray7__1, VOID, VOID, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 5:
            this.read9__1 = suspendResult;
            if (this.read9__1 <= 0) {
              this.set_state_rjd8d0_k$(4);
              continue $sm;
            } else {
              this.set_state_rjd8d0_k$(6);
              continue $sm;
            }

          case 6:
            this.set_state_rjd8d0_k$(7);
            suspendResult = writeFully(this.$this$writer_1.get_channel_dhi7tm_k$(), this.byteArray7__1, 0, this.read9__1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 7:
            var tmp_2 = this;
            var tmp0 = this.bytesSend8__1;
            var other = this.read9__1;
            tmp_2.bytesSend8__1 = tmp0.plus_r93sks_k$(toLong(other));
            this.set_state_rjd8d0_k$(8);
            suspendResult = this.$listener_1.onProgress_3xfjn4_k$(this.bytesSend8__1, this.$contentLength_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 8:
            this.set_state_rjd8d0_k$(4);
            continue $sm;
          case 9:
            this.closedCause10__1 = this.$this_observable_1.get_closedCause_o1qcj8_k$();
            close(this.$this$writer_1.get_channel_dhi7tm_k$(), this.closedCause10__1);
            if (this.closedCause10__1 == null && this.bytesSend8__1.equals(new Long(0, 0))) {
              this.set_state_rjd8d0_k$(10);
              suspendResult = this.$listener_1.onProgress_3xfjn4_k$(this.bytesSend8__1, this.$contentLength_1, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.set_state_rjd8d0_k$(11);
              continue $sm;
            }

          case 10:
            this.set_state_rjd8d0_k$(11);
            continue $sm;
          case 11:
            var tmp_3 = this;
            tmp_3.tmp$ret$05__1 = Unit_getInstance();
            this.set_exceptionState_fex74n_k$(16);
            this.set_state_rjd8d0_k$(12);
            var tmp_4 = this;
            continue $sm;
          case 12:
            this.set_exceptionState_fex74n_k$(16);
            var tmp_5 = this;
            this.this2__1.recycle_d2xv5h_k$(this.instance3__1);
            tmp_5.tmp$ret$41__1 = Unit_getInstance();
            this.set_state_rjd8d0_k$(14);
            continue $sm;
          case 13:
            this.set_exceptionState_fex74n_k$(16);
            this.this2__1.recycle_d2xv5h_k$(this.instance3__1);
            if (false) {
              this.set_state_rjd8d0_k$(1);
              continue $sm;
            }

            this.set_state_rjd8d0_k$(14);
            continue $sm;
          case 14:
            return Unit_getInstance();
          case 15:
            this.set_exceptionState_fex74n_k$(16);
            var t = this.get_exception_x0n6w6_k$();
            this.this2__1.recycle_d2xv5h_k$(this.instance3__1);
            throw t;
          case 16:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 16) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  protoOf(observable$slambda).create_fmjhmg_k$ = function ($this$writer, completion) {
    var i = new observable$slambda(this.$this_observable_1, this.$listener_1, this.$contentLength_1, completion);
    i.$this$writer_1 = $this$writer;
    return i;
  };
  protoOf(observable$slambda).create_wyq9v6_k$ = function (value, completion) {
    return this.create_fmjhmg_k$(value instanceof WriterScope ? value : THROW_CCE(), completion);
  };
  function observable$slambda_0($this_observable, $listener, $contentLength, resultContinuation) {
    var i = new observable$slambda($this_observable, $listener, $contentLength, resultContinuation);
    var l = function ($this$writer, $completion) {
      return i.invoke_86bb4c_k$($this$writer, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function get_HttpRequestCreated() {
    _init_properties_ClientEvents_kt__xuvbz8();
    return HttpRequestCreated;
  }
  var HttpRequestCreated;
  function get_HttpRequestIsReadyForSending() {
    _init_properties_ClientEvents_kt__xuvbz8();
    return HttpRequestIsReadyForSending;
  }
  var HttpRequestIsReadyForSending;
  function get_HttpResponseReceived() {
    _init_properties_ClientEvents_kt__xuvbz8();
    return HttpResponseReceived;
  }
  var HttpResponseReceived;
  function get_HttpResponseReceiveFailed() {
    _init_properties_ClientEvents_kt__xuvbz8();
    return HttpResponseReceiveFailed;
  }
  var HttpResponseReceiveFailed;
  function get_HttpResponseCancelled() {
    _init_properties_ClientEvents_kt__xuvbz8();
    return HttpResponseCancelled;
  }
  var HttpResponseCancelled;
  function HttpResponseReceiveFail(response, cause) {
    this.response_1 = response;
    this.cause_1 = cause;
  }
  protoOf(HttpResponseReceiveFail).get_response_xlk07e_k$ = function () {
    return this.response_1;
  };
  protoOf(HttpResponseReceiveFail).get_cause_iplhs0_k$ = function () {
    return this.cause_1;
  };
  var properties_initialized_ClientEvents_kt_rdee4m;
  function _init_properties_ClientEvents_kt__xuvbz8() {
    if (!properties_initialized_ClientEvents_kt_rdee4m) {
      properties_initialized_ClientEvents_kt_rdee4m = true;
      HttpRequestCreated = new EventDefinition();
      HttpRequestIsReadyForSending = new EventDefinition();
      HttpResponseReceived = new EventDefinition();
      HttpResponseReceiveFailed = new EventDefinition();
      HttpResponseCancelled = new EventDefinition();
    }
  }
  function EmptyContent() {
    EmptyContent_instance = this;
    NoContent.call(this);
    this.contentLength_1 = new Long(0, 0);
  }
  protoOf(EmptyContent).get_contentLength_a5o8yy_k$ = function () {
    return this.contentLength_1;
  };
  protoOf(EmptyContent).toString = function () {
    return 'EmptyContent';
  };
  protoOf(EmptyContent).hashCode = function () {
    return 1450860306;
  };
  protoOf(EmptyContent).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof EmptyContent))
      return false;
    other instanceof EmptyContent || THROW_CCE();
    return true;
  };
  var EmptyContent_instance;
  function EmptyContent_getInstance() {
    if (EmptyContent_instance == null)
      new EmptyContent();
    return EmptyContent_instance;
  }
  function get_DecompressionListAttribute() {
    _init_properties_HeadersUtils_kt__fb6dxx();
    return DecompressionListAttribute;
  }
  var DecompressionListAttribute;
  function dropCompressionHeaders(_this__u8e3s4, method, attributes) {
    _init_properties_HeadersUtils_kt__fb6dxx();
    if (method.equals(Companion_getInstance().get_Head_wo2rt5_k$()) || method.equals(Companion_getInstance().get_Options_84qnpx_k$()))
      return Unit_getInstance();
    var tmp0_elvis_lhs = _this__u8e3s4.get_6bo4tg_k$(HttpHeaders_getInstance().get_ContentEncoding_klk8o3_k$());
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return Unit_getInstance();
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var header = tmp;
    var tmp_0 = get_DecompressionListAttribute();
    attributes.computeIfAbsent_c4qp5i_k$(tmp_0, dropCompressionHeaders$lambda).add_utx5q5_k$(header);
    _this__u8e3s4.remove_6241ba_k$(HttpHeaders_getInstance().get_ContentEncoding_klk8o3_k$());
    _this__u8e3s4.remove_6241ba_k$(HttpHeaders_getInstance().get_ContentLength_3209rq_k$());
  }
  function dropCompressionHeaders$lambda() {
    _init_properties_HeadersUtils_kt__fb6dxx();
    // Inline function 'kotlin.collections.mutableListOf' call
    return ArrayList_init_$Create$();
  }
  var properties_initialized_HeadersUtils_kt_8c3zal;
  function _init_properties_HeadersUtils_kt__fb6dxx() {
    if (!properties_initialized_HeadersUtils_kt_8c3zal) {
      properties_initialized_HeadersUtils_kt_8c3zal = true;
      // Inline function 'io.ktor.util.AttributeKey' call
      var name = 'DecompressionListAttribute';
      // Inline function 'io.ktor.util.reflect.typeInfo' call
      var tmp = getKClass(KtMutableList);
      // Inline function 'io.ktor.util.reflect.typeOfOrNull' call
      var tmp_0;
      try {
        tmp_0 = createKType(getKClass(KtMutableList), arrayOf([createInvariantKTypeProjection(createKType(PrimitiveClasses_getInstance().get_stringClass_bik2gy_k$(), arrayOf([]), false))]), false);
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
      DecompressionListAttribute = new AttributeKey(name, tmp$ret$1);
    }
  }
  function buildHeaders(block) {
    var tmp;
    if (block === VOID) {
      tmp = buildHeaders$lambda;
    } else {
      tmp = block;
    }
    block = tmp;
    // Inline function 'kotlin.apply' call
    var this_0 = new HeadersBuilder();
    block(this_0);
    return this_0.build_1k0s4u_k$();
  }
  function buildHeaders$lambda(_this__u8e3s4) {
    return Unit_getInstance();
  }
  function Js() {
    Js_instance = this;
  }
  protoOf(Js).create_daqt9g_k$ = function (block) {
    // Inline function 'kotlin.apply' call
    var this_0 = new JsClientEngineConfig();
    block(this_0);
    return new JsClientEngine(this_0);
  };
  protoOf(Js).create_kry9d7_k$ = function (block) {
    return this.create_daqt9g_k$(block);
  };
  var Js_instance;
  function Js_getInstance() {
    if (Js_instance == null)
      new Js();
    return Js_instance;
  }
  function JsClientEngineConfig() {
    HttpClientEngineConfig.call(this);
    this.nodeOptions_1 = Object.create(null);
  }
  protoOf(JsClientEngineConfig).set_nodeOptions_c1onw1_k$ = function (_set____db54di) {
    this.nodeOptions_1 = _set____db54di;
  };
  protoOf(JsClientEngineConfig).get_nodeOptions_6iss0j_k$ = function () {
    return this.nodeOptions_1;
  };
  function createWebSocket($this, urlString_capturingHack, headers, $completion) {
    var tmp = new $createWebSocketCOROUTINE$20($this, urlString_capturingHack, headers, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  }
  function executeWebSocketRequest($this, request, callContext, $completion) {
    var tmp = new $executeWebSocketRequestCOROUTINE$21($this, request, callContext, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  }
  function JsClientEngine$execute$lambda($controller) {
    return function (it) {
      $controller.abort();
      return Unit_getInstance();
    };
  }
  function JsClientEngine$createWebSocket$headers_capturingHack$1() {
  }
  function JsClientEngine$createWebSocket$lambda($headers_capturingHack) {
    return function (name, values) {
      $headers_capturingHack[name] = joinToString(values, ',');
      return Unit_getInstance();
    };
  }
  function $executeCOROUTINE$19(_this__u8e3s4, data, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.data_1 = data;
  }
  protoOf($executeCOROUTINE$19).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(6);
            this.set_state_rjd8d0_k$(1);
            suspendResult = callContext(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.callContext0__1 = suspendResult;
            this.clientConfig1__1 = this.data_1.get_attributes_dgqof4_k$().get_r696p5_k$(get_CLIENT_CONFIG());
            if (isUpgradeRequest(this.data_1)) {
              this.set_state_rjd8d0_k$(5);
              suspendResult = executeWebSocketRequest(this._this__u8e3s4__1, this.data_1, this.callContext0__1, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.set_state_rjd8d0_k$(2);
              continue $sm;
            }

          case 2:
            this.requestTime2__1 = GMTDate();
            this.set_state_rjd8d0_k$(3);
            suspendResult = toRaw(this.data_1, this.clientConfig1__1, this.callContext0__1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 3:
            this.rawRequest3__1 = suspendResult;
            this.controller4__1 = AbortController_0();
            this.rawRequest3__1.signal = this.controller4__1.signal;
            var tmp_0 = get_job(this.callContext0__1);
            tmp_0.invokeOnCompletion$default_1v3utx_k$(true, VOID, JsClientEngine$execute$lambda(this.controller4__1));
            this.set_state_rjd8d0_k$(4);
            suspendResult = commonFetch(this.data_1.get_url_18iuii_k$().toString(), this.rawRequest3__1, this._this__u8e3s4__1.config_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 4:
            var rawResponse = suspendResult;
            var status = new HttpStatusCode(rawResponse.status, rawResponse.statusText);
            var headers = mapToKtor(rawResponse.headers, this.data_1.get_method_gl8esq_k$(), this.data_1.get_attributes_dgqof4_k$());
            var version = Companion_getInstance_5().get_HTTP_1_1_l1gte3_k$();
            var body = readBody(CoroutineScope_0(this.callContext0__1), rawResponse);
            var tmp0_safe_receiver = this.data_1.get_attributes_dgqof4_k$().getOrNull_6mjt1v_k$(get_ResponseAdapterAttributeKey());
            var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.adapt_fv4lp9_k$(this.data_1, status, headers, body, this.data_1.get_body_wojkyz_k$(), this.callContext0__1);
            var responseBody = tmp1_elvis_lhs == null ? body : tmp1_elvis_lhs;
            return new HttpResponseData(status, this.requestTime2__1, headers, version, responseBody, this.callContext0__1);
          case 5:
            return suspendResult;
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
  function $createWebSocketCOROUTINE$20(_this__u8e3s4, urlString_capturingHack, headers, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.urlString_capturingHack_1 = urlString_capturingHack;
    this.headers_1 = headers;
  }
  protoOf($createWebSocketCOROUTINE$20).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(3);
            var tmp_0 = this;
            var tmp0 = this.headers_1.names_1q9mbs_k$();
            var destination = ArrayList_init_$Create$();
            var _iterator__ex2g4s = tmp0.iterator_jk1svi_k$();
            while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
              var element = _iterator__ex2g4s.next_20eer_k$();
              if (equals_0(element, 'sec-websocket-protocol', true)) {
                destination.add_utx5q5_k$(element);
              }
            }

            tmp_0.protocolHeaderNames0__1 = destination;
            var tmp_1 = this;
            var tmp0_0 = this.protocolHeaderNames0__1;
            var destination_0 = ArrayList_init_$Create$();
            var _iterator__ex2g4s_0 = tmp0_0.iterator_jk1svi_k$();
            while (_iterator__ex2g4s_0.hasNext_bitz1p_k$()) {
              var element_0 = _iterator__ex2g4s_0.next_20eer_k$();
              var tmp0_safe_receiver = this.headers_1.getAll_ffxf4h_k$(element_0);
              if (tmp0_safe_receiver == null)
                null;
              else {
                destination_0.add_utx5q5_k$(tmp0_safe_receiver);
              }
            }

            var this_0 = flatten(destination_0);
            tmp_1.protocols1__1 = copyToArray(this_0);
            if (PlatformUtils_getInstance().get_IS_BROWSER_e36mbg_k$()) {
              this.WHEN_RESULT2__1 = new WebSocket(this.urlString_capturingHack_1, this.protocols1__1);
              this.set_state_rjd8d0_k$(2);
              continue $sm;
            } else {
              this.ws_import3__1 = import('ws');
              this.set_state_rjd8d0_k$(1);
              suspendResult = await_0(this.ws_import3__1, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            }

          case 1:
            var ws_capturingHack = suspendResult.default;
            var headers_capturingHack = new JsClientEngine$createWebSocket$headers_capturingHack$1();
            this.headers_1.forEach_jocloe_k$(JsClientEngine$createWebSocket$lambda(headers_capturingHack));
            this.WHEN_RESULT2__1 = new ws_capturingHack(this.urlString_capturingHack_1, this.protocols1__1, {headers: headers_capturingHack});
            this.set_state_rjd8d0_k$(2);
            continue $sm;
          case 2:
            return this.WHEN_RESULT2__1;
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
  function $executeWebSocketRequestCOROUTINE$21(_this__u8e3s4, request, callContext, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.request_1 = request;
    this.callContext_1 = callContext;
  }
  protoOf($executeWebSocketRequestCOROUTINE$21).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(5);
            this.requestTime0__1 = GMTDate();
            this.urlString1__1 = this.request_1.get_url_18iuii_k$().toString();
            this.set_state_rjd8d0_k$(1);
            suspendResult = createWebSocket(this._this__u8e3s4__1, this.urlString1__1, this.request_1.get_headers_ef25jx_k$(), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.socket2__1 = suspendResult;
            this.session3__1 = new JsWebSocketSession(this.callContext_1, this.socket2__1);
            this.set_exceptionState_fex74n_k$(3);
            this.set_state_rjd8d0_k$(2);
            suspendResult = awaitConnection(this.socket2__1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            this.TRY_RESULT4__1 = suspendResult;
            this.set_exceptionState_fex74n_k$(5);
            this.set_state_rjd8d0_k$(4);
            continue $sm;
          case 3:
            this.set_exceptionState_fex74n_k$(5);
            var tmp_0 = this.get_exception_x0n6w6_k$();
            if (tmp_0 instanceof Error) {
              var cause = this.get_exception_x0n6w6_k$();
              var tmp_1 = this;
              cancel_3(this.callContext_1, CancellationException_0('Failed to connect to ' + this.urlString1__1, cause));
              throw cause;
            } else {
              throw this.get_exception_x0n6w6_k$();
            }

          case 4:
            this.set_exceptionState_fex74n_k$(5);
            return new HttpResponseData(Companion_getInstance_1().get_SwitchingProtocols_cb8qoa_k$(), this.requestTime0__1, Companion_getInstance_6().get_Empty_i9b85g_k$(), Companion_getInstance_5().get_HTTP_1_1_l1gte3_k$(), this.session3__1, this.callContext_1);
          case 5:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 5) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  function JsClientEngine(config) {
    HttpClientEngineBase.call(this, 'ktor-js');
    this.config_1 = config;
    this.supportedCapabilities_1 = setOf_0([HttpTimeoutCapability_getInstance(), WebSocketCapability_getInstance(), SSECapability_getInstance()]);
    // Inline function 'kotlin.check' call
    if (!(this.config_1.get_proxy_ix1jyd_k$() == null)) {
      var message = 'Proxy unsupported in Js engine.';
      throw IllegalStateException_init_$Create$(toString(message));
    }
  }
  protoOf(JsClientEngine).get_config_c0698r_k$ = function () {
    return this.config_1;
  };
  protoOf(JsClientEngine).get_supportedCapabilities_gwz15x_k$ = function () {
    return this.supportedCapabilities_1;
  };
  protoOf(JsClientEngine).execute_bvjlbk_k$ = function (data, $completion) {
    var tmp = new $executeCOROUTINE$19(this, data, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  function mapToKtor(_this__u8e3s4, method, attributes) {
    return buildHeaders(mapToKtor$lambda(_this__u8e3s4, method, attributes));
  }
  function awaitConnection(_this__u8e3s4, $completion) {
    var cancellable = new CancellableContinuationImpl(intercepted($completion), 1);
    cancellable.initCancellability_shqc60_k$();
    $l$block: {
      if (cancellable.get_isCancelled_trk8pu_k$()) {
        break $l$block;
      }
      var eventListener = awaitConnection$lambda(cancellable, _this__u8e3s4);
      _this__u8e3s4.addEventListener('open', eventListener);
      _this__u8e3s4.addEventListener('error', eventListener);
      cancellable.invokeOnCancellation_kffkqp_k$(awaitConnection$lambda_0(_this__u8e3s4, eventListener));
    }
    return cancellable.getResult_fck196_k$();
  }
  function asString(_this__u8e3s4) {
    // Inline function 'kotlin.text.buildString' call
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$();
    var tmp = JSON;
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp$ret$2 = ['message', 'target', 'type', 'isTrusted'];
    this_0.append_22ad7x_k$(tmp.stringify(_this__u8e3s4, tmp$ret$2));
    return this_0.toString();
  }
  function mapToKtor$lambda$lambda($this_buildHeaders) {
    return function (value, key) {
      $this_buildHeaders.append_rhug0a_k$(key, value);
      return Unit_getInstance();
    };
  }
  function mapToKtor$lambda($this_mapToKtor, $method, $attributes) {
    return function ($this$buildHeaders) {
      // Inline function 'kotlin.js.asDynamic' call
      $this_mapToKtor.forEach(mapToKtor$lambda$lambda($this$buildHeaders));
      dropCompressionHeaders($this$buildHeaders, $method, $attributes);
      return Unit_getInstance();
    };
  }
  function awaitConnection$lambda($continuation, $this_awaitConnection) {
    return function (event) {
      var tmp0_subject = event.type;
      var tmp;
      if (tmp0_subject === 'open') {
        var tmp0 = $continuation;
        // Inline function 'kotlin.coroutines.resume' call
        var value = $this_awaitConnection;
        // Inline function 'kotlin.Companion.success' call
        Companion_getInstance_2();
        var tmp$ret$0 = _Result___init__impl__xyqfz8(value);
        tmp0.resumeWith_dtxwbr_k$(tmp$ret$0);
        tmp = Unit_getInstance();
      } else if (tmp0_subject === 'error') {
        var tmp2 = $continuation;
        // Inline function 'kotlin.coroutines.resumeWithException' call
        var exception = WebSocketException_init_$Create$(asString(event));
        // Inline function 'kotlin.Companion.failure' call
        Companion_getInstance_2();
        var tmp$ret$2 = _Result___init__impl__xyqfz8(createFailure(exception));
        tmp2.resumeWith_dtxwbr_k$(tmp$ret$2);
        tmp = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function awaitConnection$lambda_0($this_awaitConnection, $eventListener) {
    return function (it) {
      $this_awaitConnection.removeEventListener('open', $eventListener);
      $this_awaitConnection.removeEventListener('error', $eventListener);
      var tmp;
      if (!(it == null)) {
        $this_awaitConnection.close();
        tmp = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function toRaw(_this__u8e3s4, clientConfig, callContext, $completion) {
    var tmp = new $toRawCOROUTINE$22(_this__u8e3s4, clientConfig, callContext, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  }
  function getBodyBytes(content, callContext, $completion) {
    var tmp = new $getBodyBytesCOROUTINE$23(content, callContext, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  }
  function buildObject(block) {
    var tmp = {};
    // Inline function 'kotlin.apply' call
    var this_0 = (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
    block(this_0);
    return this_0;
  }
  function toRaw$lambda($jsHeaders) {
    return function (key, value) {
      $jsHeaders[key] = value;
      return Unit_getInstance();
    };
  }
  function toRaw$lambda_0($this_toRaw, $jsHeaders, $clientConfig, $bodyBytes) {
    return function ($this$buildObject) {
      $this$buildObject.method = $this_toRaw.get_method_gl8esq_k$().get_value_j01efc_k$();
      $this$buildObject.headers = $jsHeaders;
      var tmp;
      if ($clientConfig.get_followRedirects_a62ikd_k$()) {
        // Inline function 'org.w3c.fetch.FOLLOW' call
        // Inline function 'kotlin.js.asDynamic' call
        // Inline function 'kotlin.js.unsafeCast' call
        tmp = 'follow';
      } else {
        // Inline function 'org.w3c.fetch.MANUAL' call
        // Inline function 'kotlin.js.asDynamic' call
        // Inline function 'kotlin.js.unsafeCast' call
        tmp = 'manual';
      }
      $this$buildObject.redirect = tmp;
      var tmp0_safe_receiver = $bodyBytes;
      if (tmp0_safe_receiver == null)
        null;
      else {
        // Inline function 'kotlin.let' call
        $this$buildObject.body = new Uint8Array(toTypedArray(tmp0_safe_receiver));
      }
      return Unit_getInstance();
    };
  }
  function getBodyBytes$slambda($content, resultContinuation) {
    this.$content_1 = $content;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(getBodyBytes$slambda).invoke_86bb4c_k$ = function ($this$writer, $completion) {
    var tmp = this.create_fmjhmg_k$($this$writer, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(getBodyBytes$slambda).invoke_qns8j1_k$ = function (p1, $completion) {
    return this.invoke_86bb4c_k$(p1 instanceof WriterScope ? p1 : THROW_CCE(), $completion);
  };
  protoOf(getBodyBytes$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = this.$content_1.writeTo_vfpsb0_k$(this.$this$writer_1.get_channel_dhi7tm_k$(), this);
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
  protoOf(getBodyBytes$slambda).create_fmjhmg_k$ = function ($this$writer, completion) {
    var i = new getBodyBytes$slambda(this.$content_1, completion);
    i.$this$writer_1 = $this$writer;
    return i;
  };
  protoOf(getBodyBytes$slambda).create_wyq9v6_k$ = function (value, completion) {
    return this.create_fmjhmg_k$(value instanceof WriterScope ? value : THROW_CCE(), completion);
  };
  function getBodyBytes$slambda_0($content, resultContinuation) {
    var i = new getBodyBytes$slambda($content, resultContinuation);
    var l = function ($this$writer, $completion) {
      return i.invoke_86bb4c_k$($this$writer, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function $toRawCOROUTINE$22(_this__u8e3s4, clientConfig, callContext, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.clientConfig_1 = clientConfig;
    this.callContext_1 = callContext;
  }
  protoOf($toRawCOROUTINE$22).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.jsHeaders0__1 = {};
            var tmp_0 = this._this__u8e3s4__1.get_headers_ef25jx_k$();
            var tmp_1 = this._this__u8e3s4__1.get_body_wojkyz_k$();
            mergeHeaders(tmp_0, tmp_1, toRaw$lambda(this.jsHeaders0__1));
            this.set_state_rjd8d0_k$(1);
            suspendResult = getBodyBytes(this._this__u8e3s4__1.get_body_wojkyz_k$(), this.callContext_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var bodyBytes = suspendResult;
            return buildObject(toRaw$lambda_0(this._this__u8e3s4__1, this.jsHeaders0__1, this.clientConfig_1, bodyBytes));
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
  function $getBodyBytesCOROUTINE$23(content, callContext, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.content_1 = content;
    this.callContext_1 = callContext;
  }
  protoOf($getBodyBytesCOROUTINE$23).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(4);
            this.tmp0_subject0__1 = this.content_1;
            var tmp_0 = this.tmp0_subject0__1;
            if (tmp_0 instanceof ByteArrayContent) {
              this.WHEN_RESULT1__1 = this.content_1.bytes_1k3k2z_k$();
              this.set_state_rjd8d0_k$(5);
              continue $sm;
            } else {
              var tmp_1 = this.tmp0_subject0__1;
              if (tmp_1 instanceof ReadChannelContent) {
                this.set_state_rjd8d0_k$(3);
                suspendResult = readRemaining(this.content_1.readFrom_ecr4ww_k$(), this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }
                continue $sm;
              } else {
                var tmp_2 = this.tmp0_subject0__1;
                if (tmp_2 instanceof WriteChannelContent) {
                  this.set_state_rjd8d0_k$(2);
                  var tmp_3 = GlobalScope_getInstance();
                  suspendResult = readRemaining(writer(tmp_3, this.callContext_1, VOID, getBodyBytes$slambda_0(this.content_1, null)).get_channel_dhi7tm_k$(), this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  var tmp_4 = this.tmp0_subject0__1;
                  if (tmp_4 instanceof ContentWrapper) {
                    this.set_state_rjd8d0_k$(1);
                    suspendResult = getBodyBytes(this.content_1.delegate_djsx39_k$(), this.callContext_1, this);
                    if (suspendResult === get_COROUTINE_SUSPENDED()) {
                      return suspendResult;
                    }
                    continue $sm;
                  } else {
                    var tmp_5 = this.tmp0_subject0__1;
                    if (tmp_5 instanceof NoContent) {
                      this.WHEN_RESULT1__1 = null;
                      this.set_state_rjd8d0_k$(5);
                      continue $sm;
                    } else {
                      var tmp_6 = this.tmp0_subject0__1;
                      if (tmp_6 instanceof ProtocolUpgrade) {
                        var tmp_7 = this;
                        throw new UnsupportedContentTypeException(this.content_1);
                      } else {
                        var tmp_8 = this;
                        noWhenBranchMatchedException();
                      }
                    }
                  }
                }
              }
            }

            break;
          case 1:
            this.WHEN_RESULT1__1 = suspendResult;
            this.set_state_rjd8d0_k$(5);
            continue $sm;
          case 2:
            var ARGUMENT = suspendResult;
            this.WHEN_RESULT1__1 = readByteArray(ARGUMENT);
            this.set_state_rjd8d0_k$(5);
            continue $sm;
          case 3:
            var ARGUMENT_0 = suspendResult;
            this.WHEN_RESULT1__1 = readByteArray(ARGUMENT_0);
            this.set_state_rjd8d0_k$(5);
            continue $sm;
          case 4:
            throw this.get_exception_x0n6w6_k$();
          case 5:
            return this.WHEN_RESULT1__1;
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 4) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  function asByteArray(_this__u8e3s4) {
    // Inline function 'kotlin.js.asDynamic' call
    return new Int8Array(_this__u8e3s4.buffer, _this__u8e3s4.byteOffset, _this__u8e3s4.length);
  }
  function readBodyBrowser(_this__u8e3s4, response) {
    var tmp0_elvis_lhs = response.body;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return Companion_getInstance_0().get_Empty_i9b85g_k$();
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var stream = tmp;
    return channelFromStream(_this__u8e3s4, stream);
  }
  function channelFromStream(_this__u8e3s4, stream) {
    return writer(_this__u8e3s4, VOID, VOID, channelFromStream$slambda_0(stream, null)).get_channel_dhi7tm_k$();
  }
  function readChunk(_this__u8e3s4, $completion) {
    var cancellable = new CancellableContinuationImpl(intercepted($completion), 1);
    cancellable.initCancellability_shqc60_k$();
    var tmp = _this__u8e3s4.read();
    var tmp_0 = tmp.then(readChunk$lambda(cancellable));
    tmp_0.catch(readChunk$lambda_0(cancellable));
    return cancellable.getResult_fck196_k$();
  }
  function channelFromStream$slambda($stream, resultContinuation) {
    this.$stream_1 = $stream;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(channelFromStream$slambda).invoke_86bb4c_k$ = function ($this$writer, $completion) {
    var tmp = this.create_fmjhmg_k$($this$writer, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(channelFromStream$slambda).invoke_qns8j1_k$ = function (p1, $completion) {
    return this.invoke_86bb4c_k$(p1 instanceof WriterScope ? p1 : THROW_CCE(), $completion);
  };
  protoOf(channelFromStream$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(8);
            this.reader0__1 = this.$stream_1.getReader();
            this.set_state_rjd8d0_k$(1);
            continue $sm;
          case 1:
            if (!true) {
              this.set_state_rjd8d0_k$(9);
              continue $sm;
            }

            this.set_exceptionState_fex74n_k$(7);
            this.set_state_rjd8d0_k$(2);
            suspendResult = readChunk(this.reader0__1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            this.tmp0_elvis_lhs1__1 = suspendResult;
            if (this.tmp0_elvis_lhs1__1 == null) {
              this.set_exceptionState_fex74n_k$(8);
              this.set_state_rjd8d0_k$(9);
              var tmp_0 = this;
              continue $sm;
            } else {
              this.WHEN_RESULT2__1 = this.tmp0_elvis_lhs1__1;
              this.set_state_rjd8d0_k$(3);
              continue $sm;
            }

          case 3:
            this.chunk3__1 = this.WHEN_RESULT2__1;
            this.set_state_rjd8d0_k$(4);
            suspendResult = writeFully(this.$this$writer_1.get_channel_dhi7tm_k$(), asByteArray(this.chunk3__1), VOID, VOID, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 4:
            this.set_state_rjd8d0_k$(5);
            suspendResult = this.$this$writer_1.get_channel_dhi7tm_k$().flush_4wsz1p_k$(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 5:
            this.set_exceptionState_fex74n_k$(8);
            this.set_state_rjd8d0_k$(6);
            continue $sm;
          case 6:
            this.set_exceptionState_fex74n_k$(8);
            this.set_state_rjd8d0_k$(1);
            continue $sm;
          case 7:
            this.set_exceptionState_fex74n_k$(8);
            var tmp_1 = this.get_exception_x0n6w6_k$();
            if (tmp_1 instanceof Error) {
              var cause = this.get_exception_x0n6w6_k$();
              this.reader0__1.cancel(cause);
              throw cause;
            } else {
              throw this.get_exception_x0n6w6_k$();
            }

          case 8:
            throw this.get_exception_x0n6w6_k$();
          case 9:
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
  protoOf(channelFromStream$slambda).create_fmjhmg_k$ = function ($this$writer, completion) {
    var i = new channelFromStream$slambda(this.$stream_1, completion);
    i.$this$writer_1 = $this$writer;
    return i;
  };
  protoOf(channelFromStream$slambda).create_wyq9v6_k$ = function (value, completion) {
    return this.create_fmjhmg_k$(value instanceof WriterScope ? value : THROW_CCE(), completion);
  };
  function channelFromStream$slambda_0($stream, resultContinuation) {
    var i = new channelFromStream$slambda($stream, resultContinuation);
    var l = function ($this$writer, $completion) {
      return i.invoke_86bb4c_k$($this$writer, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function readChunk$lambda($continuation) {
    return function (it) {
      var chunk = it.value;
      var result = it.done ? null : chunk;
      // Inline function 'kotlin.Companion.success' call
      Companion_getInstance_2();
      var tmp$ret$0 = _Result___init__impl__xyqfz8(result);
      $continuation.resumeWith_dtxwbr_k$(tmp$ret$0);
      return Unit_getInstance();
    };
  }
  function readChunk$lambda_0($continuation) {
    return function (cause) {
      // Inline function 'kotlin.coroutines.resumeWithException' call
      var this_0 = $continuation;
      // Inline function 'kotlin.Companion.failure' call
      Companion_getInstance_2();
      var tmp$ret$0 = _Result___init__impl__xyqfz8(createFailure(cause));
      this_0.resumeWith_dtxwbr_k$(tmp$ret$0);
      return Unit_getInstance();
    };
  }
  function AbortController_0() {
    return new AbortController();
  }
  function commonFetch(input, init, config, $completion) {
    var cancellable = new CancellableContinuationImpl(intercepted($completion), 1);
    cancellable.initCancellability_shqc60_k$();
    var tmp;
    if (PlatformUtils_getInstance().get_IS_BROWSER_e36mbg_k$()) {
      tmp = fetch(input, init);
    } else {
      var options = Object.assign(Object.create(null), init, config.get_nodeOptions_6iss0j_k$());
      tmp = fetch(input, options);
    }
    var promise = tmp;
    var tmp_0 = commonFetch$lambda(cancellable);
    promise.then(tmp_0, commonFetch$lambda_0(cancellable));
    return cancellable.getResult_fck196_k$();
  }
  function readBody(_this__u8e3s4, response) {
    return readBodyBrowser(_this__u8e3s4, response);
  }
  function commonFetch$lambda($continuation) {
    return function (it) {
      // Inline function 'kotlin.Companion.success' call
      Companion_getInstance_2();
      var tmp$ret$0 = _Result___init__impl__xyqfz8(it);
      $continuation.resumeWith_dtxwbr_k$(tmp$ret$0);
      return Unit_getInstance();
    };
  }
  function commonFetch$lambda_0($continuation) {
    return function (it) {
      Companion_getInstance_2();
      // Inline function 'kotlin.Companion.failure' call
      var exception = Error_init_$Create$('Fail to fetch', it);
      var tmp$ret$0 = _Result___init__impl__xyqfz8(createFailure(exception));
      $continuation.resumeWith_dtxwbr_k$(tmp$ret$0);
      return Unit_getInstance();
    };
  }
  function _get_websocket__2qm0ru($this) {
    return $this.websocket_1;
  }
  function _get__closeReason__rkk1fy($this) {
    return $this._closeReason_1;
  }
  function _get__incoming__1bn23w_0($this) {
    return $this._incoming_1;
  }
  function _get__outgoing__emmja2($this) {
    return $this._outgoing_1;
  }
  function isReservedStatusCode($this, _this__u8e3s4) {
    // Inline function 'kotlin.let' call
    var resolved = Companion_getInstance_7().byCode_d9s8a4_k$(_this__u8e3s4);
    return resolved == null || equals(resolved, Codes_CLOSED_ABNORMALLY_getInstance());
  }
  function JsWebSocketSession$lambda(this$0) {
    return function (it) {
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      var event = it;
      var data = event.data;
      var tmp;
      if (data instanceof ArrayBuffer) {
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        var tmp$ret$3 = new Int8Array(data);
        tmp = Binary_init_$Create$(false, tmp$ret$3);
      } else {
        if (!(data == null) ? typeof data === 'string' : false) {
          tmp = Text_init_$Create$(data);
        } else {
          var error = IllegalStateException_init_$Create$('Unknown frame type: ' + event.type);
          this$0._closeReason_1.completeExceptionally_xyzekf_k$(error);
          throw error;
        }
      }
      var frame = tmp;
      this$0._incoming_1.trySend_62dpg8_k$(frame);
      return Unit_getInstance();
    };
  }
  function JsWebSocketSession$lambda_0(this$0) {
    return function (it) {
      var cause = WebSocketException_init_$Create$(toString(it));
      this$0._closeReason_1.completeExceptionally_xyzekf_k$(cause);
      this$0._incoming_1.close_ukldxa_k$(cause);
      this$0._outgoing_1.cancel$default_880p35_k$();
      return Unit_getInstance();
    };
  }
  function JsWebSocketSession$lambda_1(this$0) {
    return function (event) {
      var tmp = event.code;
      var tmp_0 = (!(tmp == null) ? typeof tmp === 'number' : false) ? tmp : THROW_CCE();
      var tmp_1 = event.reason;
      var reason = new CloseReason(tmp_0, (!(tmp_1 == null) ? typeof tmp_1 === 'string' : false) ? tmp_1 : THROW_CCE());
      this$0._closeReason_1.complete_ixf84q_k$(reason);
      this$0._incoming_1.trySend_62dpg8_k$(Close_init_$Create$(reason));
      this$0._incoming_1.close$default_kcbl7u_k$();
      this$0._outgoing_1.cancel$default_880p35_k$();
      return Unit_getInstance();
    };
  }
  function JsWebSocketSession$slambda(this$0, resultContinuation) {
    this.this$0__1 = this$0;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(JsWebSocketSession$slambda).invoke_d9fzmj_k$ = function ($this$launch, $completion) {
    var tmp = this.create_rcuf4x_k$($this$launch, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(JsWebSocketSession$slambda).invoke_qns8j1_k$ = function (p1, $completion) {
    return this.invoke_d9fzmj_k$((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(JsWebSocketSession$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(10);
            var tmp_0 = this;
            tmp_0.tmp00__1 = this.this$0__1._outgoing_1;
            this.this1__1 = this.tmp00__1;
            var tmp_1 = this;
            tmp_1.tmp02__1 = this.this1__1;
            this.set_state_rjd8d0_k$(1);
            continue $sm;
          case 1:
            this.this4__1 = this.tmp02__1;
            this.cause5__1 = null;
            this.set_state_rjd8d0_k$(2);
            continue $sm;
          case 2:
            this.set_state_rjd8d0_k$(3);
            continue $sm;
          case 3:
            this.set_exceptionState_fex74n_k$(9);
            this.set_exceptionState_fex74n_k$(8);
            var tmp_2 = this;
            tmp_2.tmp18__1 = this.this4__1;
            this.$this$consume9__1 = this.tmp18__1;
            this._iterator_10_biegoj_1 = this.$this$consume9__1.iterator_jk1svi_k$();
            this.set_state_rjd8d0_k$(4);
            continue $sm;
          case 4:
            this.set_state_rjd8d0_k$(5);
            suspendResult = this._iterator_10_biegoj_1.hasNext_nhy1w3_k$(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 5:
            if (!suspendResult) {
              this.set_state_rjd8d0_k$(6);
              continue $sm;
            }

            var e = this._iterator_10_biegoj_1.next_20eer_k$();
            switch (e.get_frameType_hj325a_k$().get_ordinal_ip24qg_k$()) {
              case 0:
                var text = e.get_data_wokkxf_k$();
                this.this$0__1.websocket_1.send(decodeToString(text, 0, 0 + text.length | 0));
                break;
              case 1:
                var tmp_3 = e.get_data_wokkxf_k$();
                var source = tmp_3 instanceof Int8Array ? tmp_3 : THROW_CCE();
                var frameData = source.buffer.slice(source.byteOffset, source.byteOffset + source.byteLength | 0);
                this.this$0__1.websocket_1.send(frameData);
                break;
              case 2:
                var builder = new Buffer();
                writeFully_0(builder, e.get_data_wokkxf_k$());
                var data = builder;
                var code = data.readShort_ilpyey_k$();
                var reason = readText(data);
                this.this$0__1._closeReason_1.complete_ixf84q_k$(new CloseReason(code, reason));
                if (isReservedStatusCode(this.this$0__1, code)) {
                  this.this$0__1.websocket_1.close();
                } else {
                  this.this$0__1.websocket_1.close(code, reason);
                }

                break;
              case 3:
              case 4:
                break;
              default:
                noWhenBranchMatchedException();
                break;
            }

            this.set_state_rjd8d0_k$(4);
            continue $sm;
          case 6:
            var tmp_4 = this;
            tmp_4.tmp$ret$07__1 = Unit_getInstance();
            this.set_exceptionState_fex74n_k$(10);
            this.set_state_rjd8d0_k$(7);
            var tmp_5 = this;
            continue $sm;
          case 7:
            this.set_exceptionState_fex74n_k$(10);
            var tmp_6 = this;
            cancelConsumed(this.this4__1, this.cause5__1);
            tmp_6.tmp$ret$43__1 = Unit_getInstance();
            this.set_state_rjd8d0_k$(12);
            continue $sm;
          case 8:
            this.set_exceptionState_fex74n_k$(9);
            var tmp_7 = this.get_exception_x0n6w6_k$();
            if (tmp_7 instanceof Error) {
              var e_0 = this.get_exception_x0n6w6_k$();
              var tmp_8 = this;
              this.cause5__1 = e_0;
              throw e_0;
            } else {
              throw this.get_exception_x0n6w6_k$();
            }

          case 9:
            this.set_exceptionState_fex74n_k$(10);
            var t = this.get_exception_x0n6w6_k$();
            cancelConsumed(this.this4__1, this.cause5__1);
            throw t;
          case 10:
            throw this.get_exception_x0n6w6_k$();
          case 11:
            this.set_exceptionState_fex74n_k$(10);
            cancelConsumed(this.this4__1, this.cause5__1);
            if (false) {
              this.set_state_rjd8d0_k$(1);
              continue $sm;
            }

            this.set_state_rjd8d0_k$(12);
            continue $sm;
          case 12:
            return Unit_getInstance();
        }
      } catch ($p) {
        var e_1 = $p;
        if (this.get_exceptionState_wflpxn_k$() === 10) {
          throw e_1;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e_1);
        }
      }
     while (true);
  };
  protoOf(JsWebSocketSession$slambda).create_rcuf4x_k$ = function ($this$launch, completion) {
    var i = new JsWebSocketSession$slambda(this.this$0__1, completion);
    i.$this$launch_1 = $this$launch;
    return i;
  };
  protoOf(JsWebSocketSession$slambda).create_wyq9v6_k$ = function (value, completion) {
    return this.create_rcuf4x_k$((!(value == null) ? isInterface(value, CoroutineScope) : false) ? value : THROW_CCE(), completion);
  };
  function JsWebSocketSession$slambda_0(this$0, resultContinuation) {
    var i = new JsWebSocketSession$slambda(this$0, resultContinuation);
    var l = function ($this$launch, $completion) {
      return i.invoke_d9fzmj_k$($this$launch, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function JsWebSocketSession$lambda_2(this$0) {
    return function (cause) {
      var tmp;
      if (cause == null) {
        this$0.websocket_1.close();
        tmp = Unit_getInstance();
      } else {
        this$0.websocket_1.close(Codes_NORMAL_getInstance().get_code_wok7xy_k$(), 'Client failed');
        tmp = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function JsWebSocketSession(coroutineContext, websocket) {
    this.coroutineContext_1 = coroutineContext;
    this.websocket_1 = websocket;
    this._closeReason_1 = CompletableDeferred();
    this._incoming_1 = Channel(2147483647);
    this._outgoing_1 = Channel(2147483647);
    this.incoming_1 = this._incoming_1;
    this.outgoing_1 = this._outgoing_1;
    this.closeReason_1 = this._closeReason_1;
    // Inline function 'org.w3c.dom.ARRAYBUFFER' call
    // Inline function 'kotlin.js.asDynamic' call
    // Inline function 'kotlin.js.unsafeCast' call
    var tmp$ret$2 = 'arraybuffer';
    this.websocket_1.binaryType = tmp$ret$2;
    this.websocket_1.addEventListener('message', JsWebSocketSession$lambda(this));
    this.websocket_1.addEventListener('error', JsWebSocketSession$lambda_0(this));
    this.websocket_1.addEventListener('close', JsWebSocketSession$lambda_1(this));
    launch(this, VOID, VOID, JsWebSocketSession$slambda_0(this, null));
    var tmp0_safe_receiver = this.coroutineContext_1.get_y2st91_k$(Key_getInstance());
    if (tmp0_safe_receiver == null)
      null;
    else {
      tmp0_safe_receiver.invokeOnCompletion_n6cffu_k$(JsWebSocketSession$lambda_2(this));
    }
  }
  protoOf(JsWebSocketSession).get_coroutineContext_115oqo_k$ = function () {
    return this.coroutineContext_1;
  };
  protoOf(JsWebSocketSession).get_incoming_u9os29_k$ = function () {
    return this.incoming_1;
  };
  protoOf(JsWebSocketSession).get_outgoing_us7o3v_k$ = function () {
    return this.outgoing_1;
  };
  protoOf(JsWebSocketSession).get_extensions_kxksyl_k$ = function () {
    return emptyList();
  };
  protoOf(JsWebSocketSession).get_closeReason_g1m41f_k$ = function () {
    return this.closeReason_1;
  };
  protoOf(JsWebSocketSession).set_pingIntervalMillis_hq8mas_k$ = function (_) {
    throw WebSocketException_init_$Create$('Websocket ping-pong is not supported in JS engine.');
  };
  protoOf(JsWebSocketSession).get_pingIntervalMillis_4y22i_k$ = function () {
    throw WebSocketException_init_$Create$('Websocket ping-pong is not supported in JS engine.');
  };
  protoOf(JsWebSocketSession).set_timeoutMillis_7953m4_k$ = function (_) {
    throw WebSocketException_init_$Create$('Websocket timeout is not supported in JS engine.');
  };
  protoOf(JsWebSocketSession).get_timeoutMillis_ig3vfi_k$ = function () {
    throw WebSocketException_init_$Create$('Websocket timeout is not supported in JS engine.');
  };
  protoOf(JsWebSocketSession).set_masking_u6d5es_k$ = function (_) {
    throw WebSocketException_init_$Create$('Masking switch is not supported in JS engine.');
  };
  protoOf(JsWebSocketSession).get_masking_f5rvkd_k$ = function () {
    return true;
  };
  protoOf(JsWebSocketSession).set_maxFrameSize_6aa793_k$ = function (_) {
    throw WebSocketException_init_$Create$('Max frame size switch is not supported in Js engine.');
  };
  protoOf(JsWebSocketSession).get_maxFrameSize_9zaht9_k$ = function () {
    return new Long(-1, 2147483647);
  };
  protoOf(JsWebSocketSession).start_ye6294_k$ = function (negotiatedExtensions) {
    // Inline function 'kotlin.require' call
    if (!negotiatedExtensions.isEmpty_y1axqb_k$()) {
      var message = 'Extensions are not supported.';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
  };
  protoOf(JsWebSocketSession).flush_4wsz1p_k$ = function ($completion) {
    return Unit_getInstance();
  };
  protoOf(JsWebSocketSession).terminate_hmb9m7_k$ = function () {
    this._incoming_1.cancel$default_880p35_k$();
    this._outgoing_1.cancel$default_880p35_k$();
    cancel_2(this._closeReason_1, 'WebSocket terminated');
    this.websocket_1.close();
  };
  function ioDispatcher() {
    return Dispatchers_getInstance().get_Default_goqax4_k$();
  }
  function ProxyConfig() {
  }
  function ConnectTimeoutException(message, cause) {
    cause = cause === VOID ? null : cause;
    IOException_init_$Init$(message, cause, this);
    captureStack(this, ConnectTimeoutException);
  }
  function SocketTimeoutException(message, cause, unit) {
    InterruptedIOException.call(this);
    captureStack(this, SocketTimeoutException);
    this.message_1 = message;
    this.cause_1 = cause;
  }
  protoOf(SocketTimeoutException).get_message_h23axq_k$ = function () {
    return this.message_1;
  };
  protoOf(SocketTimeoutException).get_cause_iplhs0_k$ = function () {
    return this.cause_1;
  };
  function InterruptedIOException() {
    IOException_init_$Init$_0(this);
    captureStack(this, InterruptedIOException);
  }
  function platformRequestDefaultTransform(contentType, context, body) {
    return null;
  }
  function platformResponseDefaultTransformers(_this__u8e3s4) {
  }
  function getResponseObserverContext($completion) {
    return EmptyCoroutineContext_getInstance();
  }
  function unwrapCancellationException(_this__u8e3s4) {
    var exception = _this__u8e3s4;
    $l$loop: while (exception instanceof CancellationException) {
      if (equals(exception, exception.cause)) {
        return _this__u8e3s4;
      }
      exception = exception.cause;
    }
    var tmp0_elvis_lhs = exception;
    return tmp0_elvis_lhs == null ? _this__u8e3s4 : tmp0_elvis_lhs;
  }
  //region block: post-declaration
  defineProp(protoOf(DoubleReceiveException), 'message', function () {
    return this.get_message_h23axq_k$();
  });
  defineProp(protoOf(NoTransformationFoundException), 'message', function () {
    return this.get_message_h23axq_k$();
  });
  defineProp(protoOf(ClientEngineClosedException), 'cause', function () {
    return this.get_cause_iplhs0_k$();
  });
  protoOf(HttpClientEngineBase).get_supportedCapabilities_gwz15x_k$ = get_supportedCapabilities;
  protoOf(HttpClientEngineBase).install_ve6kwc_k$ = install;
  protoOf(KtorCallContextElement).get_y2st91_k$ = get;
  protoOf(KtorCallContextElement).fold_j2vaxd_k$ = fold;
  protoOf(KtorCallContextElement).minusKey_9i5ggf_k$ = minusKey;
  protoOf(KtorCallContextElement).plus_s13ygv_k$ = plus;
  defineProp(protoOf(RedirectResponseException), 'message', function () {
    return this.get_message_h23axq_k$();
  });
  defineProp(protoOf(ClientRequestException), 'message', function () {
    return this.get_message_h23axq_k$();
  });
  defineProp(protoOf(ServerResponseException), 'message', function () {
    return this.get_message_h23axq_k$();
  });
  protoOf(HttpRequest$1).get_coroutineContext_115oqo_k$ = get_coroutineContext;
  protoOf(Plugin).prepare$default_ybahnt_k$ = prepare$default;
  protoOf(ClientPluginImpl).prepare$default_ybahnt_k$ = prepare$default;
  defineProp(protoOf(SSEClientException), 'cause', function () {
    return this.get_cause_iplhs0_k$();
  });
  defineProp(protoOf(SSEClientException), 'message', function () {
    return this.get_message_h23axq_k$();
  });
  protoOf(Js).create$default_3xwi5e_k$ = create$default;
  protoOf(JsWebSocketSession).start$default_h1tqpr_k$ = start$default;
  protoOf(JsWebSocketSession).send_sburzs_k$ = send;
  defineProp(protoOf(SocketTimeoutException), 'message', function () {
    return this.get_message_h23axq_k$();
  });
  defineProp(protoOf(SocketTimeoutException), 'cause', function () {
    return this.get_cause_iplhs0_k$();
  });
  //endregion
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = bodyAsChannel;
  _.$_$.b = Js_getInstance;
  _.$_$.c = Phases_getInstance_0;
  _.$_$.d = Phases_getInstance_1;
  _.$_$.e = Phases_getInstance_2;
  _.$_$.f = EmptyContent_getInstance;
  _.$_$.g = HttpClientCall;
  _.$_$.h = ClientHook;
  _.$_$.i = TransformRequestBodyContext;
  _.$_$.j = TransformResponseBodyContext;
  _.$_$.k = createClientPlugin_0;
  _.$_$.l = get_ResponseObserver;
  _.$_$.m = HttpRequestBuilder;
  _.$_$.n = accept;
  _.$_$.o = header;
  _.$_$.p = url;
  _.$_$.q = HttpResponseContainer;
  _.$_$.r = HttpResponse;
  _.$_$.s = HttpStatement;
  _.$_$.t = get_request;
  _.$_$.u = HttpClient_0;
  //endregion
  return _;
}));

//# sourceMappingURL=ktor-ktor-client-ktor-client-core.js.map
