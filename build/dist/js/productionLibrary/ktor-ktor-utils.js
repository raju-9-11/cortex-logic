(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js', './kotlinx-coroutines-core.js', './kotlinx-atomicfu.js', './kotlinx-serialization-kotlinx-serialization-core.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'), require('./kotlinx-coroutines-core.js'), require('./kotlinx-atomicfu.js'), require('./kotlinx-serialization-kotlinx-serialization-core.js'));
  else {
    if (typeof globalThis['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'ktor-ktor-utils'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'ktor-ktor-utils'.");
    }
    if (typeof globalThis['kotlinx-coroutines-core'] === 'undefined') {
      throw new Error("Error loading module 'ktor-ktor-utils'. Its dependency 'kotlinx-coroutines-core' was not found. Please, check whether 'kotlinx-coroutines-core' is loaded prior to 'ktor-ktor-utils'.");
    }
    if (typeof globalThis['kotlinx-atomicfu'] === 'undefined') {
      throw new Error("Error loading module 'ktor-ktor-utils'. Its dependency 'kotlinx-atomicfu' was not found. Please, check whether 'kotlinx-atomicfu' is loaded prior to 'ktor-ktor-utils'.");
    }
    if (typeof globalThis['kotlinx-serialization-kotlinx-serialization-core'] === 'undefined') {
      throw new Error("Error loading module 'ktor-ktor-utils'. Its dependency 'kotlinx-serialization-kotlinx-serialization-core' was not found. Please, check whether 'kotlinx-serialization-kotlinx-serialization-core' is loaded prior to 'ktor-ktor-utils'.");
    }
    globalThis['ktor-ktor-utils'] = factory(typeof globalThis['ktor-ktor-utils'] === 'undefined' ? {} : globalThis['ktor-ktor-utils'], globalThis['kotlin-kotlin-stdlib'], globalThis['kotlinx-coroutines-core'], globalThis['kotlinx-atomicfu'], globalThis['kotlinx-serialization-kotlinx-serialization-core']);
  }
}(function (_, kotlin_kotlin, kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core, kotlin_org_jetbrains_kotlinx_atomicfu, kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core) {
  'use strict';
  //region block: imports
  var imul = Math.imul;
  var PrimitiveClasses_getInstance = kotlin_kotlin.$_$.u4;
  var arrayOf = kotlin_kotlin.$_$.qg;
  var createKType = kotlin_kotlin.$_$.c;
  var Unit_instance = kotlin_kotlin.$_$.f5;
  var VOID = kotlin_kotlin.$_$.h;
  var isBlank = kotlin_kotlin.$_$.od;
  var toString = kotlin_kotlin.$_$.bc;
  var IllegalArgumentException_init_$Create$ = kotlin_kotlin.$_$.u1;
  var protoOf = kotlin_kotlin.$_$.xb;
  var getStringHashCode = kotlin_kotlin.$_$.ra;
  var THROW_CCE = kotlin_kotlin.$_$.cg;
  var initMetadataForClass = kotlin_kotlin.$_$.ta;
  var IllegalStateException_init_$Create$ = kotlin_kotlin.$_$.y1;
  var initMetadataForInterface = kotlin_kotlin.$_$.xa;
  var LinkedHashMap_init_$Create$ = kotlin_kotlin.$_$.y;
  var equals = kotlin_kotlin.$_$.ma;
  var hashCode = kotlin_kotlin.$_$.sa;
  var KtMutableMap = kotlin_kotlin.$_$.q5;
  var ensureNotNull = kotlin_kotlin.$_$.ug;
  var Entry = kotlin_kotlin.$_$.n5;
  var isInterface = kotlin_kotlin.$_$.ib;
  var toString_0 = kotlin_kotlin.$_$.fh;
  var charArray = kotlin_kotlin.$_$.ga;
  var charSequenceGet = kotlin_kotlin.$_$.ha;
  var toString_1 = kotlin_kotlin.$_$.v2;
  var SupervisorJob = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.w;
  var AbstractCoroutineContextElement = kotlin_kotlin.$_$.l9;
  var Key_instance = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.d;
  var Element = kotlin_kotlin.$_$.u9;
  var collectionSizeOrDefault = kotlin_kotlin.$_$.b6;
  var ArrayList_init_$Create$ = kotlin_kotlin.$_$.o;
  var KtSet = kotlin_kotlin.$_$.s5;
  var KtMutableSet = kotlin_kotlin.$_$.r5;
  var initMetadataForObject = kotlin_kotlin.$_$.za;
  var Enum = kotlin_kotlin.$_$.sf;
  var firstOrNull = kotlin_kotlin.$_$.x6;
  var ArrayList_init_$Create$_0 = kotlin_kotlin.$_$.p;
  var LinkedHashMap_init_$Create$_0 = kotlin_kotlin.$_$.x;
  var addAll = kotlin_kotlin.$_$.t5;
  var emptyMap = kotlin_kotlin.$_$.u6;
  var getBooleanHashCode = kotlin_kotlin.$_$.oa;
  var charSequenceLength = kotlin_kotlin.$_$.ia;
  var StringBuilder_init_$Create$ = kotlin_kotlin.$_$.h1;
  var get_lastIndex = kotlin_kotlin.$_$.sd;
  var _Char___init__impl__6a9atx = kotlin_kotlin.$_$.o2;
  var Char__plus_impl_qi7pgj = kotlin_kotlin.$_$.s2;
  var Char__toInt_impl_vasixd = kotlin_kotlin.$_$.u2;
  var equals_0 = kotlin_kotlin.$_$.id;
  var atomic$ref$1 = kotlin_org_jetbrains_kotlinx_atomicfu.$_$.d;
  var createSimpleEnumSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.b2;
  var Long = kotlin_kotlin.$_$.xf;
  var initMetadataForCompanion = kotlin_kotlin.$_$.ua;
  var PluginGeneratedSerialDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.y1;
  var UnknownFieldException_init_$Create$ = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.c;
  var IntSerializer_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.o;
  var LongSerializer_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.p;
  var typeParametersSerializers = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.s1;
  var GeneratedSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.t1;
  var throwMissingFieldException = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.e2;
  var objectCreate = kotlin_kotlin.$_$.wb;
  var Comparable = kotlin_kotlin.$_$.of;
  var enumEntries = kotlin_kotlin.$_$.y9;
  var CoroutineImpl = kotlin_kotlin.$_$.w9;
  var get_COROUTINE_SUSPENDED = kotlin_kotlin.$_$.g9;
  var initMetadataForCoroutine = kotlin_kotlin.$_$.va;
  var KtMutableList = kotlin_kotlin.$_$.p5;
  var toMutableList = kotlin_kotlin.$_$.x8;
  var ArrayList = kotlin_kotlin.$_$.g5;
  var emptyList = kotlin_kotlin.$_$.t6;
  var get_lastIndex_0 = kotlin_kotlin.$_$.k7;
  var last = kotlin_kotlin.$_$.m7;
  var mutableListOf = kotlin_kotlin.$_$.u7;
  var anyToString = kotlin_kotlin.$_$.ba;
  var KMutableProperty1 = kotlin_kotlin.$_$.tc;
  var getPropertyCallableRef = kotlin_kotlin.$_$.qa;
  var CoroutineScope = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.u;
  var extendThrowable = kotlin_kotlin.$_$.na;
  var captureStack = kotlin_kotlin.$_$.ea;
  var recoverStackTrace = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.l;
  var Companion_instance = kotlin_kotlin.$_$.a5;
  var _Result___init__impl__xyqfz8 = kotlin_kotlin.$_$.w2;
  var createFailure = kotlin_kotlin.$_$.tg;
  var Result__exceptionOrNull_impl_p6xea9 = kotlin_kotlin.$_$.x2;
  var _Result___get_isFailure__impl__jpiriv = kotlin_kotlin.$_$.y2;
  var Continuation = kotlin_kotlin.$_$.q9;
  var intercepted = kotlin_kotlin.$_$.j9;
  var KProperty1 = kotlin_kotlin.$_$.vc;
  var lazy = kotlin_kotlin.$_$.ah;
  var isNaN_0 = kotlin_kotlin.$_$.yg;
  var numberToLong = kotlin_kotlin.$_$.vb;
  var IllegalStateException = kotlin_kotlin.$_$.wf;
  var IllegalStateException_init_$Init$ = kotlin_kotlin.$_$.x1;
  var toList = kotlin_kotlin.$_$.t8;
  var _Result___get_value__impl__bjfvqg = kotlin_kotlin.$_$.z2;
  var noWhenBranchMatchedException = kotlin_kotlin.$_$.bh;
  //endregion
  //region block: pre-declaration
  initMetadataForClass(AttributeKey, 'AttributeKey');
  function get(key) {
    var tmp0_elvis_lhs = this.m25(key);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throw IllegalStateException_init_$Create$('No instance for key ' + key.toString());
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  initMetadataForInterface(Attributes, 'Attributes');
  initMetadataForClass(CaseInsensitiveMap, 'CaseInsensitiveMap', CaseInsensitiveMap, VOID, [KtMutableMap]);
  initMetadataForClass(Entry_0, 'Entry', VOID, VOID, [Entry]);
  initMetadataForClass(SilentSupervisor$$inlined$CoroutineExceptionHandler$1, VOID, VOID, AbstractCoroutineContextElement, [AbstractCoroutineContextElement, Element]);
  initMetadataForClass(DelegatingMutableSet$iterator$1);
  initMetadataForClass(DelegatingMutableSet, 'DelegatingMutableSet', VOID, VOID, [KtMutableSet]);
  initMetadataForClass(Platform, 'Platform');
  initMetadataForObject(Jvm, 'Jvm', VOID, Platform);
  initMetadataForObject(Native, 'Native', VOID, Platform);
  initMetadataForClass(Js, 'Js', VOID, Platform);
  initMetadataForClass(WasmJs, 'WasmJs', VOID, Platform);
  initMetadataForClass(JsPlatform, 'JsPlatform', VOID, Enum);
  initMetadataForObject(PlatformUtils, 'PlatformUtils');
  function get_0(name) {
    var tmp0_safe_receiver = this.z26(name);
    return tmp0_safe_receiver == null ? null : firstOrNull(tmp0_safe_receiver);
  }
  function forEach(body) {
    // Inline function 'kotlin.collections.forEach' call
    var _iterator__ex2g4s = this.b27().g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      // Inline function 'kotlin.collections.component1' call
      var k = element.v();
      // Inline function 'kotlin.collections.component2' call
      var v = element.w();
      body(k, v);
    }
    return Unit_instance;
  }
  initMetadataForInterface(StringValues, 'StringValues');
  initMetadataForClass(StringValuesBuilderImpl, 'StringValuesBuilderImpl', StringValuesBuilderImpl);
  initMetadataForClass(StringValuesImpl, 'StringValuesImpl', StringValuesImpl, VOID, [StringValues]);
  initMetadataForClass(CaseInsensitiveString, 'CaseInsensitiveString');
  initMetadataForClass(CopyOnWriteHashMap, 'CopyOnWriteHashMap', CopyOnWriteHashMap);
  initMetadataForCompanion(Companion);
  initMetadataForObject($serializer, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(GMTDate, 'GMTDate', VOID, VOID, [Comparable], VOID, VOID, {0: $serializer_getInstance});
  initMetadataForCompanion(Companion_0);
  initMetadataForClass(WeekDay, 'WeekDay', VOID, Enum);
  initMetadataForCompanion(Companion_1);
  initMetadataForClass(Month, 'Month', VOID, Enum);
  initMetadataForClass(Symbol, 'Symbol');
  initMetadataForClass(LockFreeLinkedListNode, 'LockFreeLinkedListNode');
  initMetadataForClass(Removed, 'Removed');
  initMetadataForClass(OpDescriptor, 'OpDescriptor');
  initMetadataForCoroutine($proceedLoopCOROUTINE$0, CoroutineImpl);
  initMetadataForClass(PipelineContext, 'PipelineContext', VOID, VOID, [CoroutineScope], [1, 0]);
  initMetadataForClass(DebugPipelineContext, 'DebugPipelineContext', VOID, PipelineContext, VOID, [1, 0]);
  initMetadataForCompanion(Companion_2);
  initMetadataForClass(PhaseContent, 'PhaseContent');
  initMetadataForClass(Pipeline, 'Pipeline', VOID, VOID, VOID, [2]);
  initMetadataForClass(PipelinePhase, 'PipelinePhase');
  initMetadataForClass(InvalidPhaseException, 'InvalidPhaseException', VOID, Error);
  initMetadataForClass(PipelinePhaseRelation, 'PipelinePhaseRelation');
  initMetadataForClass(After, 'After', VOID, PipelinePhaseRelation);
  initMetadataForClass(Before, 'Before', VOID, PipelinePhaseRelation);
  initMetadataForObject(Last, 'Last', VOID, PipelinePhaseRelation);
  initMetadataForClass(SuspendFunctionGun$continuation$1, VOID, VOID, VOID, [Continuation]);
  initMetadataForClass(SuspendFunctionGun, 'SuspendFunctionGun', VOID, PipelineContext, VOID, [0, 1]);
  initMetadataForClass(TypeInfo, 'TypeInfo');
  initMetadataForClass(InvalidTimestampException, 'InvalidTimestampException', VOID, IllegalStateException);
  initMetadataForClass(AttributesJs, 'AttributesJs', AttributesJs, VOID, [Attributes]);
  initMetadataForClass(KtorSimpleLogger$1);
  initMetadataForClass(LogLevel, 'LogLevel', VOID, Enum);
  //endregion
  function AttributeKey(name, type) {
    var tmp;
    if (type === VOID) {
      // Inline function 'io.ktor.util.reflect.typeInfo' call
      var tmp_0 = PrimitiveClasses_getInstance().qb();
      // Inline function 'io.ktor.util.reflect.typeOfOrNull' call
      var tmp_1;
      try {
        tmp_1 = createKType(PrimitiveClasses_getInstance().qb(), arrayOf([]), false);
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
      tmp = new TypeInfo(tmp_0, tmp$ret$0);
    } else {
      tmp = type;
    }
    type = tmp;
    this.j25_1 = name;
    this.k25_1 = type;
    // Inline function 'kotlin.text.isNotBlank' call
    var this_0 = this.j25_1;
    // Inline function 'kotlin.require' call
    if (!!isBlank(this_0)) {
      var message = "Name can't be blank";
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
  }
  protoOf(AttributeKey).toString = function () {
    return 'AttributeKey: ' + this.j25_1;
  };
  protoOf(AttributeKey).hashCode = function () {
    var result = getStringHashCode(this.j25_1);
    result = imul(result, 31) + this.k25_1.hashCode() | 0;
    return result;
  };
  protoOf(AttributeKey).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof AttributeKey))
      return false;
    var tmp0_other_with_cast = other instanceof AttributeKey ? other : THROW_CCE();
    if (!(this.j25_1 === tmp0_other_with_cast.j25_1))
      return false;
    if (!this.k25_1.equals(tmp0_other_with_cast.k25_1))
      return false;
    return true;
  };
  function Attributes() {
  }
  function putAll(_this__u8e3s4, other) {
    // Inline function 'kotlin.collections.forEach' call
    var _iterator__ex2g4s = other.r25().g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      _this__u8e3s4.o25(element instanceof AttributeKey ? element : THROW_CCE(), other.l25(element));
    }
  }
  function CaseInsensitiveMap$_get_keys_$lambda_ptzlqj($this$DelegatingMutableSet) {
    return $this$DelegatingMutableSet.s25_1;
  }
  function CaseInsensitiveMap$_get_keys_$lambda_ptzlqj_0($this$DelegatingMutableSet) {
    return caseInsensitive($this$DelegatingMutableSet);
  }
  function CaseInsensitiveMap$_get_entries_$lambda_r32w19($this$DelegatingMutableSet) {
    return new Entry_0($this$DelegatingMutableSet.v().s25_1, $this$DelegatingMutableSet.w());
  }
  function CaseInsensitiveMap$_get_entries_$lambda_r32w19_0($this$DelegatingMutableSet) {
    return new Entry_0(caseInsensitive($this$DelegatingMutableSet.v()), $this$DelegatingMutableSet.w());
  }
  function CaseInsensitiveMap() {
    var tmp = this;
    // Inline function 'kotlin.collections.mutableMapOf' call
    tmp.u25_1 = LinkedHashMap_init_$Create$();
  }
  protoOf(CaseInsensitiveMap).j = function () {
    return this.u25_1.j();
  };
  protoOf(CaseInsensitiveMap).v25 = function (key) {
    return this.u25_1.c2(new CaseInsensitiveString(key));
  };
  protoOf(CaseInsensitiveMap).c2 = function (key) {
    if (!(!(key == null) ? typeof key === 'string' : false))
      return false;
    return this.v25((!(key == null) ? typeof key === 'string' : false) ? key : THROW_CCE());
  };
  protoOf(CaseInsensitiveMap).yd = function (key) {
    return this.u25_1.e2(caseInsensitive(key));
  };
  protoOf(CaseInsensitiveMap).e2 = function (key) {
    if (!(!(key == null) ? typeof key === 'string' : false))
      return null;
    return this.yd((!(key == null) ? typeof key === 'string' : false) ? key : THROW_CCE());
  };
  protoOf(CaseInsensitiveMap).p = function () {
    return this.u25_1.p();
  };
  protoOf(CaseInsensitiveMap).y1 = function () {
    this.u25_1.y1();
  };
  protoOf(CaseInsensitiveMap).w25 = function (key, value) {
    return this.u25_1.h2(caseInsensitive(key), value);
  };
  protoOf(CaseInsensitiveMap).h2 = function (key, value) {
    var tmp = (!(key == null) ? typeof key === 'string' : false) ? key : THROW_CCE();
    return this.w25(tmp, !(value == null) ? value : THROW_CCE());
  };
  protoOf(CaseInsensitiveMap).x25 = function (from) {
    // Inline function 'kotlin.collections.forEach' call
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s = from.u().g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      // Inline function 'kotlin.collections.component1' call
      var key = element.v();
      // Inline function 'kotlin.collections.component2' call
      var value = element.w();
      this.w25(key, value);
    }
  };
  protoOf(CaseInsensitiveMap).j2 = function (from) {
    return this.x25(from);
  };
  protoOf(CaseInsensitiveMap).y25 = function (key) {
    return this.u25_1.i2(caseInsensitive(key));
  };
  protoOf(CaseInsensitiveMap).i2 = function (key) {
    if (!(!(key == null) ? typeof key === 'string' : false))
      return null;
    return this.y25((!(key == null) ? typeof key === 'string' : false) ? key : THROW_CCE());
  };
  protoOf(CaseInsensitiveMap).f2 = function () {
    var tmp = this.u25_1.f2();
    var tmp_0 = CaseInsensitiveMap$_get_keys_$lambda_ptzlqj;
    return new DelegatingMutableSet(tmp, tmp_0, CaseInsensitiveMap$_get_keys_$lambda_ptzlqj_0);
  };
  protoOf(CaseInsensitiveMap).u = function () {
    var tmp = this.u25_1.u();
    var tmp_0 = CaseInsensitiveMap$_get_entries_$lambda_r32w19;
    return new DelegatingMutableSet(tmp, tmp_0, CaseInsensitiveMap$_get_entries_$lambda_r32w19_0);
  };
  protoOf(CaseInsensitiveMap).g2 = function () {
    return this.u25_1.g2();
  };
  protoOf(CaseInsensitiveMap).equals = function (other) {
    var tmp;
    if (other == null) {
      tmp = true;
    } else {
      tmp = !(other instanceof CaseInsensitiveMap);
    }
    if (tmp)
      return false;
    return equals(other.u25_1, this.u25_1);
  };
  protoOf(CaseInsensitiveMap).hashCode = function () {
    return hashCode(this.u25_1);
  };
  function Entry_0(key, value) {
    this.z25_1 = key;
    this.a26_1 = value;
  }
  protoOf(Entry_0).v = function () {
    return this.z25_1;
  };
  protoOf(Entry_0).w = function () {
    return this.a26_1;
  };
  protoOf(Entry_0).hashCode = function () {
    return (527 + hashCode(ensureNotNull(this.z25_1)) | 0) + hashCode(ensureNotNull(this.a26_1)) | 0;
  };
  protoOf(Entry_0).equals = function (other) {
    var tmp;
    if (other == null) {
      tmp = true;
    } else {
      tmp = !(!(other == null) ? isInterface(other, Entry) : false);
    }
    if (tmp)
      return false;
    return equals(other.v(), this.z25_1) && equals(other.w(), this.a26_1);
  };
  protoOf(Entry_0).toString = function () {
    return toString_0(this.z25_1) + '=' + toString_0(this.a26_1);
  };
  function toCharArray(_this__u8e3s4) {
    var tmp = 0;
    var tmp_0 = _this__u8e3s4.length;
    var tmp_1 = charArray(tmp_0);
    while (tmp < tmp_0) {
      var tmp_2 = tmp;
      tmp_1[tmp_2] = charSequenceGet(_this__u8e3s4, tmp_2);
      tmp = tmp + 1 | 0;
    }
    return tmp_1;
  }
  function isLowerCase(_this__u8e3s4) {
    // Inline function 'kotlin.text.lowercaseChar' call
    // Inline function 'kotlin.text.lowercase' call
    // Inline function 'kotlin.js.asDynamic' call
    // Inline function 'kotlin.js.unsafeCast' call
    var tmp$ret$2 = toString_1(_this__u8e3s4).toLowerCase();
    return charSequenceGet(tmp$ret$2, 0) === _this__u8e3s4;
  }
  function caseInsensitiveMap() {
    return new CaseInsensitiveMap();
  }
  function SilentSupervisor(parent) {
    parent = parent === VOID ? null : parent;
    var tmp = SupervisorJob(parent);
    // Inline function 'kotlinx.coroutines.CoroutineExceptionHandler' call
    var tmp$ret$0 = new SilentSupervisor$$inlined$CoroutineExceptionHandler$1();
    return tmp.wh(tmp$ret$0);
  }
  function SilentSupervisor$$inlined$CoroutineExceptionHandler$1() {
    AbstractCoroutineContextElement.call(this, Key_instance);
  }
  protoOf(SilentSupervisor$$inlined$CoroutineExceptionHandler$1).iv = function (context, exception) {
    return Unit_instance;
  };
  function DelegatingMutableSet$iterator$1(this$0) {
    this.d26_1 = this$0;
    this.c26_1 = this$0.e26_1.g();
  }
  protoOf(DelegatingMutableSet$iterator$1).h = function () {
    return this.c26_1.h();
  };
  protoOf(DelegatingMutableSet$iterator$1).i = function () {
    return this.d26_1.f26_1(this.c26_1.i());
  };
  protoOf(DelegatingMutableSet$iterator$1).b4 = function () {
    return this.c26_1.b4();
  };
  function DelegatingMutableSet(delegate, convertTo, convert) {
    this.e26_1 = delegate;
    this.f26_1 = convertTo;
    this.g26_1 = convert;
    this.h26_1 = this.e26_1.j();
  }
  protoOf(DelegatingMutableSet).i26 = function (_this__u8e3s4) {
    // Inline function 'kotlin.collections.map' call
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$(collectionSizeOrDefault(_this__u8e3s4, 10));
    var _iterator__ex2g4s = _this__u8e3s4.g();
    while (_iterator__ex2g4s.h()) {
      var item = _iterator__ex2g4s.i();
      var tmp$ret$0 = this.g26_1(item);
      destination.e(tmp$ret$0);
    }
    return destination;
  };
  protoOf(DelegatingMutableSet).j26 = function (_this__u8e3s4) {
    // Inline function 'kotlin.collections.map' call
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$(collectionSizeOrDefault(_this__u8e3s4, 10));
    var _iterator__ex2g4s = _this__u8e3s4.g();
    while (_iterator__ex2g4s.h()) {
      var item = _iterator__ex2g4s.i();
      var tmp$ret$0 = this.f26_1(item);
      destination.e(tmp$ret$0);
    }
    return destination;
  };
  protoOf(DelegatingMutableSet).j = function () {
    return this.h26_1;
  };
  protoOf(DelegatingMutableSet).k26 = function (element) {
    return this.e26_1.e(this.g26_1(element));
  };
  protoOf(DelegatingMutableSet).e = function (element) {
    return this.k26((element == null ? true : !(element == null)) ? element : THROW_CCE());
  };
  protoOf(DelegatingMutableSet).l26 = function (elements) {
    return this.e26_1.n(this.i26(elements));
  };
  protoOf(DelegatingMutableSet).n = function (elements) {
    return this.l26(elements);
  };
  protoOf(DelegatingMutableSet).y1 = function () {
    this.e26_1.y1();
  };
  protoOf(DelegatingMutableSet).m26 = function (element) {
    return this.e26_1.r(this.g26_1(element));
  };
  protoOf(DelegatingMutableSet).r = function (element) {
    if (!(element == null ? true : !(element == null)))
      return false;
    return this.m26((element == null ? true : !(element == null)) ? element : THROW_CCE());
  };
  protoOf(DelegatingMutableSet).n26 = function (elements) {
    return this.e26_1.w1(this.i26(elements));
  };
  protoOf(DelegatingMutableSet).w1 = function (elements) {
    return this.n26(elements);
  };
  protoOf(DelegatingMutableSet).p = function () {
    return this.e26_1.p();
  };
  protoOf(DelegatingMutableSet).g = function () {
    return new DelegatingMutableSet$iterator$1(this);
  };
  protoOf(DelegatingMutableSet).hashCode = function () {
    return hashCode(this.e26_1);
  };
  protoOf(DelegatingMutableSet).equals = function (other) {
    var tmp;
    if (other == null) {
      tmp = true;
    } else {
      tmp = !(!(other == null) ? isInterface(other, KtSet) : false);
    }
    if (tmp)
      return false;
    var elements = this.j26(this.e26_1);
    var tmp_0;
    if (other.w1(elements)) {
      // Inline function 'kotlin.collections.containsAll' call
      tmp_0 = elements.w1(other);
    } else {
      tmp_0 = false;
    }
    return tmp_0;
  };
  protoOf(DelegatingMutableSet).toString = function () {
    return toString(this.j26(this.e26_1));
  };
  var JsPlatform_Browser_instance;
  var JsPlatform_Node_instance;
  var JsPlatform_entriesInitialized;
  function JsPlatform_initEntries() {
    if (JsPlatform_entriesInitialized)
      return Unit_instance;
    JsPlatform_entriesInitialized = true;
    JsPlatform_Browser_instance = new JsPlatform('Browser', 0);
    JsPlatform_Node_instance = new JsPlatform('Node', 1);
  }
  function Jvm() {
    Jvm_instance = this;
    Platform.call(this);
  }
  protoOf(Jvm).toString = function () {
    return 'Jvm';
  };
  protoOf(Jvm).hashCode = function () {
    return 1051825272;
  };
  protoOf(Jvm).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Jvm))
      return false;
    other instanceof Jvm || THROW_CCE();
    return true;
  };
  var Jvm_instance;
  function Jvm_getInstance() {
    if (Jvm_instance == null)
      new Jvm();
    return Jvm_instance;
  }
  function Native() {
    Native_instance = this;
    Platform.call(this);
  }
  protoOf(Native).toString = function () {
    return 'Native';
  };
  protoOf(Native).hashCode = function () {
    return -1059277600;
  };
  protoOf(Native).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Native))
      return false;
    other instanceof Native || THROW_CCE();
    return true;
  };
  var Native_instance;
  function Native_getInstance() {
    if (Native_instance == null)
      new Native();
    return Native_instance;
  }
  function Js(jsPlatform) {
    Platform.call(this);
    this.o26_1 = jsPlatform;
  }
  protoOf(Js).toString = function () {
    return 'Js(jsPlatform=' + this.o26_1.toString() + ')';
  };
  protoOf(Js).hashCode = function () {
    return this.o26_1.hashCode();
  };
  protoOf(Js).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Js))
      return false;
    var tmp0_other_with_cast = other instanceof Js ? other : THROW_CCE();
    if (!this.o26_1.equals(tmp0_other_with_cast.o26_1))
      return false;
    return true;
  };
  function WasmJs() {
  }
  function JsPlatform(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function JsPlatform_Browser_getInstance() {
    JsPlatform_initEntries();
    return JsPlatform_Browser_instance;
  }
  function JsPlatform_Node_getInstance() {
    JsPlatform_initEntries();
    return JsPlatform_Node_instance;
  }
  function Platform() {
  }
  function PlatformUtils() {
    PlatformUtils_instance = this;
    var tmp = this;
    var platform = get_platform(this);
    var tmp_0;
    if (platform instanceof Js) {
      tmp_0 = platform.o26_1.equals(JsPlatform_Browser_getInstance());
    } else {
      if (platform instanceof WasmJs) {
        tmp_0 = platform.p26_1.equals(JsPlatform_Browser_getInstance());
      } else {
        tmp_0 = false;
      }
    }
    tmp.q26_1 = tmp_0;
    var tmp_1 = this;
    var platform_0 = get_platform(this);
    var tmp_2;
    if (platform_0 instanceof Js) {
      tmp_2 = platform_0.o26_1.equals(JsPlatform_Node_getInstance());
    } else {
      if (platform_0 instanceof WasmJs) {
        tmp_2 = platform_0.p26_1.equals(JsPlatform_Node_getInstance());
      } else {
        tmp_2 = false;
      }
    }
    tmp_1.r26_1 = tmp_2;
    var tmp_3 = this;
    var tmp_4 = get_platform(this);
    tmp_3.s26_1 = tmp_4 instanceof Js;
    var tmp_5 = this;
    var tmp_6 = get_platform(this);
    tmp_5.t26_1 = tmp_6 instanceof WasmJs;
    this.u26_1 = equals(get_platform(this), Jvm_getInstance());
    this.v26_1 = equals(get_platform(this), Native_getInstance());
    this.w26_1 = get_isDevelopmentMode(this);
    this.x26_1 = get_isNewMemoryModel(this);
  }
  var PlatformUtils_instance;
  function PlatformUtils_getInstance() {
    if (PlatformUtils_instance == null)
      new PlatformUtils();
    return PlatformUtils_instance;
  }
  function StringValues() {
  }
  function ensureListForKey($this, name) {
    var tmp0_elvis_lhs = $this.e27_1.e2(name);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      // Inline function 'kotlin.collections.mutableListOf' call
      // Inline function 'kotlin.also' call
      var this_0 = ArrayList_init_$Create$_0();
      $this.f27(name);
      // Inline function 'kotlin.collections.set' call
      $this.e27_1.h2(name, this_0);
      tmp = this_0;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function StringValuesBuilderImpl$appendAll$lambda(this$0) {
    return function (name, values) {
      this$0.g27(name, values);
      return Unit_instance;
    };
  }
  function StringValuesBuilderImpl(caseInsensitiveName, size) {
    caseInsensitiveName = caseInsensitiveName === VOID ? false : caseInsensitiveName;
    size = size === VOID ? 8 : size;
    this.d27_1 = caseInsensitiveName;
    this.e27_1 = this.d27_1 ? caseInsensitiveMap() : LinkedHashMap_init_$Create$_0(size);
  }
  protoOf(StringValuesBuilderImpl).y26 = function () {
    return this.d27_1;
  };
  protoOf(StringValuesBuilderImpl).z26 = function (name) {
    return this.e27_1.e2(name);
  };
  protoOf(StringValuesBuilderImpl).a27 = function () {
    return this.e27_1.f2();
  };
  protoOf(StringValuesBuilderImpl).p = function () {
    return this.e27_1.p();
  };
  protoOf(StringValuesBuilderImpl).b27 = function () {
    return unmodifiable(this.e27_1.u());
  };
  protoOf(StringValuesBuilderImpl).h27 = function (name, value) {
    this.i27(value);
    var list = ensureListForKey(this, name);
    list.y1();
    list.e(value);
  };
  protoOf(StringValuesBuilderImpl).yd = function (name) {
    var tmp0_safe_receiver = this.z26(name);
    return tmp0_safe_receiver == null ? null : firstOrNull(tmp0_safe_receiver);
  };
  protoOf(StringValuesBuilderImpl).j27 = function (name, value) {
    this.i27(value);
    ensureListForKey(this, name).e(value);
  };
  protoOf(StringValuesBuilderImpl).k27 = function (stringValues) {
    stringValues.c27(StringValuesBuilderImpl$appendAll$lambda(this));
  };
  protoOf(StringValuesBuilderImpl).g27 = function (name, values) {
    // Inline function 'kotlin.let' call
    var list = ensureListForKey(this, name);
    // Inline function 'kotlin.collections.forEach' call
    var _iterator__ex2g4s = values.g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      this.i27(element);
    }
    addAll(list, values);
  };
  protoOf(StringValuesBuilderImpl).l27 = function (name) {
    this.e27_1.i2(name);
  };
  protoOf(StringValuesBuilderImpl).y1 = function () {
    this.e27_1.y1();
  };
  protoOf(StringValuesBuilderImpl).f27 = function (name) {
  };
  protoOf(StringValuesBuilderImpl).i27 = function (value) {
  };
  function listForKey($this, name) {
    return $this.n27_1.e2(name);
  }
  function StringValuesImpl(caseInsensitiveName, values) {
    caseInsensitiveName = caseInsensitiveName === VOID ? false : caseInsensitiveName;
    values = values === VOID ? emptyMap() : values;
    this.m27_1 = caseInsensitiveName;
    var tmp;
    if (this.m27_1) {
      tmp = caseInsensitiveMap();
    } else {
      // Inline function 'kotlin.collections.mutableMapOf' call
      tmp = LinkedHashMap_init_$Create$();
    }
    var newMap = tmp;
    // Inline function 'kotlin.collections.forEach' call
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s = values.u().g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      // Inline function 'kotlin.collections.component1' call
      var key = element.v();
      // Inline function 'kotlin.collections.component2' call
      var value = element.w();
      // Inline function 'kotlin.collections.List' call
      // Inline function 'kotlin.collections.MutableList' call
      var size = value.j();
      var list = ArrayList_init_$Create$(size);
      // Inline function 'kotlin.repeat' call
      var inductionVariable = 0;
      if (inductionVariable < size)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var tmp$ret$4 = value.o(index);
          list.e(tmp$ret$4);
        }
         while (inductionVariable < size);
      // Inline function 'kotlin.collections.set' call
      newMap.h2(key, list);
    }
    this.n27_1 = newMap;
  }
  protoOf(StringValuesImpl).y26 = function () {
    return this.m27_1;
  };
  protoOf(StringValuesImpl).yd = function (name) {
    var tmp0_safe_receiver = listForKey(this, name);
    return tmp0_safe_receiver == null ? null : firstOrNull(tmp0_safe_receiver);
  };
  protoOf(StringValuesImpl).z26 = function (name) {
    return listForKey(this, name);
  };
  protoOf(StringValuesImpl).a27 = function () {
    return unmodifiable(this.n27_1.f2());
  };
  protoOf(StringValuesImpl).p = function () {
    return this.n27_1.p();
  };
  protoOf(StringValuesImpl).b27 = function () {
    return unmodifiable(this.n27_1.u());
  };
  protoOf(StringValuesImpl).c27 = function (body) {
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s = this.n27_1.u().g();
    while (_iterator__ex2g4s.h()) {
      var _destruct__k2r9zo = _iterator__ex2g4s.i();
      // Inline function 'kotlin.collections.component1' call
      var key = _destruct__k2r9zo.v();
      // Inline function 'kotlin.collections.component2' call
      var value = _destruct__k2r9zo.w();
      body(key, value);
    }
  };
  protoOf(StringValuesImpl).toString = function () {
    return 'StringValues(case=' + !this.m27_1 + ') ' + toString(this.b27());
  };
  protoOf(StringValuesImpl).equals = function (other) {
    if (this === other)
      return true;
    if (!(!(other == null) ? isInterface(other, StringValues) : false))
      return false;
    if (!(this.m27_1 === other.y26()))
      return false;
    return entriesEquals(this.b27(), other.b27());
  };
  protoOf(StringValuesImpl).hashCode = function () {
    return entriesHashCode(this.b27(), imul(31, getBooleanHashCode(this.m27_1)));
  };
  function appendAll(_this__u8e3s4, builder) {
    // Inline function 'kotlin.apply' call
    // Inline function 'kotlin.collections.forEach' call
    var _iterator__ex2g4s = builder.b27().g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      // Inline function 'kotlin.collections.component1' call
      var name = element.v();
      // Inline function 'kotlin.collections.component2' call
      var values = element.w();
      _this__u8e3s4.g27(name, values);
    }
    return _this__u8e3s4;
  }
  function entriesEquals(a, b) {
    return equals(a, b);
  }
  function entriesHashCode(entries, seed) {
    return imul(seed, 31) + hashCode(entries) | 0;
  }
  function toLowerCasePreservingASCIIRules(_this__u8e3s4) {
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlin.text.indexOfFirst' call
      var inductionVariable = 0;
      var last = charSequenceLength(_this__u8e3s4) - 1 | 0;
      if (inductionVariable <= last)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var it = charSequenceGet(_this__u8e3s4, index);
          if (!(toLowerCasePreservingASCII(it) === it)) {
            tmp$ret$1 = index;
            break $l$block;
          }
        }
         while (inductionVariable <= last);
      tmp$ret$1 = -1;
    }
    var firstIndex = tmp$ret$1;
    if (firstIndex === -1) {
      return _this__u8e3s4;
    }
    var original = _this__u8e3s4;
    // Inline function 'kotlin.text.buildString' call
    var capacity = _this__u8e3s4.length;
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$(capacity);
    this_0.kc(original, 0, firstIndex);
    var inductionVariable_0 = firstIndex;
    var last_0 = get_lastIndex(original);
    if (inductionVariable_0 <= last_0)
      do {
        var index_0 = inductionVariable_0;
        inductionVariable_0 = inductionVariable_0 + 1 | 0;
        this_0.a8(toLowerCasePreservingASCII(charSequenceGet(original, index_0)));
      }
       while (!(index_0 === last_0));
    return this_0.toString();
  }
  function toLowerCasePreservingASCII(ch) {
    var tmp;
    if (_Char___init__impl__6a9atx(65) <= ch ? ch <= _Char___init__impl__6a9atx(90) : false) {
      tmp = Char__plus_impl_qi7pgj(ch, 32);
    } else if (_Char___init__impl__6a9atx(0) <= ch ? ch <= _Char___init__impl__6a9atx(127) : false) {
      tmp = ch;
    } else {
      // Inline function 'kotlin.text.lowercaseChar' call
      // Inline function 'kotlin.text.lowercase' call
      // Inline function 'kotlin.js.asDynamic' call
      // Inline function 'kotlin.js.unsafeCast' call
      var tmp$ret$2 = toString_1(ch).toLowerCase();
      tmp = charSequenceGet(tmp$ret$2, 0);
    }
    return tmp;
  }
  function CaseInsensitiveString(content) {
    this.s25_1 = content;
    var temp = 0;
    var indexedObject = this.s25_1;
    var inductionVariable = 0;
    var last = indexedObject.length;
    while (inductionVariable < last) {
      var element = charSequenceGet(indexedObject, inductionVariable);
      inductionVariable = inductionVariable + 1 | 0;
      var tmp = imul(temp, 31);
      // Inline function 'kotlin.text.lowercaseChar' call
      // Inline function 'kotlin.text.lowercase' call
      // Inline function 'kotlin.js.asDynamic' call
      // Inline function 'kotlin.js.unsafeCast' call
      var tmp$ret$2 = toString_1(element).toLowerCase();
      // Inline function 'kotlin.code' call
      var this_0 = charSequenceGet(tmp$ret$2, 0);
      temp = tmp + Char__toInt_impl_vasixd(this_0) | 0;
    }
    this.t25_1 = temp;
  }
  protoOf(CaseInsensitiveString).equals = function (other) {
    var tmp0_safe_receiver = other instanceof CaseInsensitiveString ? other : null;
    var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.s25_1;
    return (tmp1_safe_receiver == null ? null : equals_0(tmp1_safe_receiver, this.s25_1, true)) === true;
  };
  protoOf(CaseInsensitiveString).hashCode = function () {
    return this.t25_1;
  };
  protoOf(CaseInsensitiveString).toString = function () {
    return this.s25_1;
  };
  function caseInsensitive(_this__u8e3s4) {
    return new CaseInsensitiveString(_this__u8e3s4);
  }
  function CopyOnWriteHashMap() {
    this.o27_1 = atomic$ref$1(emptyMap());
  }
  protoOf(CopyOnWriteHashMap).p27 = function (key) {
    return this.o27_1.kotlinx$atomicfu$value.e2(key);
  };
  function Companion() {
    Companion_instance_0 = this;
    var tmp = this;
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    tmp.q27_1 = [null, null, null, createSimpleEnumSerializer('io.ktor.util.date.WeekDay', values()), null, null, createSimpleEnumSerializer('io.ktor.util.date.Month', values_0()), null, null];
    this.r27_1 = GMTDate_0(new Long(0, 0));
  }
  var Companion_instance_0;
  function Companion_getInstance() {
    if (Companion_instance_0 == null)
      new Companion();
    return Companion_instance_0;
  }
  function $serializer() {
    $serializer_instance = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('io.ktor.util.date.GMTDate', this, 9);
    tmp0_serialDesc.g1v('seconds', false);
    tmp0_serialDesc.g1v('minutes', false);
    tmp0_serialDesc.g1v('hours', false);
    tmp0_serialDesc.g1v('dayOfWeek', false);
    tmp0_serialDesc.g1v('dayOfMonth', false);
    tmp0_serialDesc.g1v('dayOfYear', false);
    tmp0_serialDesc.g1v('month', false);
    tmp0_serialDesc.g1v('year', false);
    tmp0_serialDesc.g1v('timestamp', false);
    this.s27_1 = tmp0_serialDesc;
  }
  protoOf($serializer).t27 = function (encoder, value) {
    var tmp0_desc = this.s27_1;
    var tmp1_output = encoder.q1n(tmp0_desc);
    var tmp2_cached = Companion_getInstance().q27_1;
    tmp1_output.a1p(tmp0_desc, 0, value.u27_1);
    tmp1_output.a1p(tmp0_desc, 1, value.v27_1);
    tmp1_output.a1p(tmp0_desc, 2, value.w27_1);
    tmp1_output.h1p(tmp0_desc, 3, tmp2_cached[3], value.x27_1);
    tmp1_output.a1p(tmp0_desc, 4, value.y27_1);
    tmp1_output.a1p(tmp0_desc, 5, value.z27_1);
    tmp1_output.h1p(tmp0_desc, 6, tmp2_cached[6], value.a28_1);
    tmp1_output.a1p(tmp0_desc, 7, value.b28_1);
    tmp1_output.b1p(tmp0_desc, 8, value.c28_1);
    tmp1_output.r1n(tmp0_desc);
  };
  protoOf($serializer).q1k = function (encoder, value) {
    return this.t27(encoder, value instanceof GMTDate ? value : THROW_CCE());
  };
  protoOf($serializer).r1k = function (decoder) {
    var tmp0_desc = this.s27_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = 0;
    var tmp5_local1 = 0;
    var tmp6_local2 = 0;
    var tmp7_local3 = null;
    var tmp8_local4 = 0;
    var tmp9_local5 = 0;
    var tmp10_local6 = null;
    var tmp11_local7 = 0;
    var tmp12_local8 = new Long(0, 0);
    var tmp13_input = decoder.q1n(tmp0_desc);
    var tmp14_cached = Companion_getInstance().q27_1;
    if (tmp13_input.g1o()) {
      tmp4_local0 = tmp13_input.v1n(tmp0_desc, 0);
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
      tmp5_local1 = tmp13_input.v1n(tmp0_desc, 1);
      tmp3_bitMask0 = tmp3_bitMask0 | 2;
      tmp6_local2 = tmp13_input.v1n(tmp0_desc, 2);
      tmp3_bitMask0 = tmp3_bitMask0 | 4;
      tmp7_local3 = tmp13_input.c1o(tmp0_desc, 3, tmp14_cached[3], tmp7_local3);
      tmp3_bitMask0 = tmp3_bitMask0 | 8;
      tmp8_local4 = tmp13_input.v1n(tmp0_desc, 4);
      tmp3_bitMask0 = tmp3_bitMask0 | 16;
      tmp9_local5 = tmp13_input.v1n(tmp0_desc, 5);
      tmp3_bitMask0 = tmp3_bitMask0 | 32;
      tmp10_local6 = tmp13_input.c1o(tmp0_desc, 6, tmp14_cached[6], tmp10_local6);
      tmp3_bitMask0 = tmp3_bitMask0 | 64;
      tmp11_local7 = tmp13_input.v1n(tmp0_desc, 7);
      tmp3_bitMask0 = tmp3_bitMask0 | 128;
      tmp12_local8 = tmp13_input.w1n(tmp0_desc, 8);
      tmp3_bitMask0 = tmp3_bitMask0 | 256;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp13_input.h1o(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            tmp4_local0 = tmp13_input.v1n(tmp0_desc, 0);
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          case 1:
            tmp5_local1 = tmp13_input.v1n(tmp0_desc, 1);
            tmp3_bitMask0 = tmp3_bitMask0 | 2;
            break;
          case 2:
            tmp6_local2 = tmp13_input.v1n(tmp0_desc, 2);
            tmp3_bitMask0 = tmp3_bitMask0 | 4;
            break;
          case 3:
            tmp7_local3 = tmp13_input.c1o(tmp0_desc, 3, tmp14_cached[3], tmp7_local3);
            tmp3_bitMask0 = tmp3_bitMask0 | 8;
            break;
          case 4:
            tmp8_local4 = tmp13_input.v1n(tmp0_desc, 4);
            tmp3_bitMask0 = tmp3_bitMask0 | 16;
            break;
          case 5:
            tmp9_local5 = tmp13_input.v1n(tmp0_desc, 5);
            tmp3_bitMask0 = tmp3_bitMask0 | 32;
            break;
          case 6:
            tmp10_local6 = tmp13_input.c1o(tmp0_desc, 6, tmp14_cached[6], tmp10_local6);
            tmp3_bitMask0 = tmp3_bitMask0 | 64;
            break;
          case 7:
            tmp11_local7 = tmp13_input.v1n(tmp0_desc, 7);
            tmp3_bitMask0 = tmp3_bitMask0 | 128;
            break;
          case 8:
            tmp12_local8 = tmp13_input.w1n(tmp0_desc, 8);
            tmp3_bitMask0 = tmp3_bitMask0 | 256;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp13_input.r1n(tmp0_desc);
    return GMTDate_init_$Create$(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, tmp7_local3, tmp8_local4, tmp9_local5, tmp10_local6, tmp11_local7, tmp12_local8, null);
  };
  protoOf($serializer).p1k = function () {
    return this.s27_1;
  };
  protoOf($serializer).v1v = function () {
    var tmp0_cached = Companion_getInstance().q27_1;
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [IntSerializer_getInstance(), IntSerializer_getInstance(), IntSerializer_getInstance(), tmp0_cached[3], IntSerializer_getInstance(), IntSerializer_getInstance(), tmp0_cached[6], IntSerializer_getInstance(), LongSerializer_getInstance()];
  };
  var $serializer_instance;
  function $serializer_getInstance() {
    if ($serializer_instance == null)
      new $serializer();
    return $serializer_instance;
  }
  function GMTDate_init_$Init$(seen0, seconds, minutes, hours, dayOfWeek, dayOfMonth, dayOfYear, month, year, timestamp, serializationConstructorMarker, $this) {
    if (!(511 === (511 & seen0))) {
      throwMissingFieldException(seen0, 511, $serializer_getInstance().s27_1);
    }
    $this.u27_1 = seconds;
    $this.v27_1 = minutes;
    $this.w27_1 = hours;
    $this.x27_1 = dayOfWeek;
    $this.y27_1 = dayOfMonth;
    $this.z27_1 = dayOfYear;
    $this.a28_1 = month;
    $this.b28_1 = year;
    $this.c28_1 = timestamp;
    return $this;
  }
  function GMTDate_init_$Create$(seen0, seconds, minutes, hours, dayOfWeek, dayOfMonth, dayOfYear, month, year, timestamp, serializationConstructorMarker) {
    return GMTDate_init_$Init$(seen0, seconds, minutes, hours, dayOfWeek, dayOfMonth, dayOfYear, month, year, timestamp, serializationConstructorMarker, objectCreate(protoOf(GMTDate)));
  }
  function GMTDate(seconds, minutes, hours, dayOfWeek, dayOfMonth, dayOfYear, month, year, timestamp) {
    Companion_getInstance();
    this.u27_1 = seconds;
    this.v27_1 = minutes;
    this.w27_1 = hours;
    this.x27_1 = dayOfWeek;
    this.y27_1 = dayOfMonth;
    this.z27_1 = dayOfYear;
    this.a28_1 = month;
    this.b28_1 = year;
    this.c28_1 = timestamp;
  }
  protoOf(GMTDate).d28 = function (other) {
    return this.c28_1.b1(other.c28_1);
  };
  protoOf(GMTDate).d = function (other) {
    return this.d28(other instanceof GMTDate ? other : THROW_CCE());
  };
  protoOf(GMTDate).toString = function () {
    return 'GMTDate(seconds=' + this.u27_1 + ', minutes=' + this.v27_1 + ', hours=' + this.w27_1 + ', dayOfWeek=' + this.x27_1.toString() + ', dayOfMonth=' + this.y27_1 + ', dayOfYear=' + this.z27_1 + ', month=' + this.a28_1.toString() + ', year=' + this.b28_1 + ', timestamp=' + this.c28_1.toString() + ')';
  };
  protoOf(GMTDate).hashCode = function () {
    var result = this.u27_1;
    result = imul(result, 31) + this.v27_1 | 0;
    result = imul(result, 31) + this.w27_1 | 0;
    result = imul(result, 31) + this.x27_1.hashCode() | 0;
    result = imul(result, 31) + this.y27_1 | 0;
    result = imul(result, 31) + this.z27_1 | 0;
    result = imul(result, 31) + this.a28_1.hashCode() | 0;
    result = imul(result, 31) + this.b28_1 | 0;
    result = imul(result, 31) + this.c28_1.hashCode() | 0;
    return result;
  };
  protoOf(GMTDate).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof GMTDate))
      return false;
    var tmp0_other_with_cast = other instanceof GMTDate ? other : THROW_CCE();
    if (!(this.u27_1 === tmp0_other_with_cast.u27_1))
      return false;
    if (!(this.v27_1 === tmp0_other_with_cast.v27_1))
      return false;
    if (!(this.w27_1 === tmp0_other_with_cast.w27_1))
      return false;
    if (!this.x27_1.equals(tmp0_other_with_cast.x27_1))
      return false;
    if (!(this.y27_1 === tmp0_other_with_cast.y27_1))
      return false;
    if (!(this.z27_1 === tmp0_other_with_cast.z27_1))
      return false;
    if (!this.a28_1.equals(tmp0_other_with_cast.a28_1))
      return false;
    if (!(this.b28_1 === tmp0_other_with_cast.b28_1))
      return false;
    if (!this.c28_1.equals(tmp0_other_with_cast.c28_1))
      return false;
    return true;
  };
  var WeekDay_MONDAY_instance;
  var WeekDay_TUESDAY_instance;
  var WeekDay_WEDNESDAY_instance;
  var WeekDay_THURSDAY_instance;
  var WeekDay_FRIDAY_instance;
  var WeekDay_SATURDAY_instance;
  var WeekDay_SUNDAY_instance;
  function Companion_0() {
  }
  protoOf(Companion_0).e28 = function (ordinal) {
    return get_entries().o(ordinal);
  };
  var Companion_instance_1;
  function Companion_getInstance_0() {
    return Companion_instance_1;
  }
  function values() {
    return [WeekDay_MONDAY_getInstance(), WeekDay_TUESDAY_getInstance(), WeekDay_WEDNESDAY_getInstance(), WeekDay_THURSDAY_getInstance(), WeekDay_FRIDAY_getInstance(), WeekDay_SATURDAY_getInstance(), WeekDay_SUNDAY_getInstance()];
  }
  function get_entries() {
    if ($ENTRIES == null)
      $ENTRIES = enumEntries(values());
    return $ENTRIES;
  }
  var WeekDay_entriesInitialized;
  function WeekDay_initEntries() {
    if (WeekDay_entriesInitialized)
      return Unit_instance;
    WeekDay_entriesInitialized = true;
    WeekDay_MONDAY_instance = new WeekDay('MONDAY', 0, 'Mon');
    WeekDay_TUESDAY_instance = new WeekDay('TUESDAY', 1, 'Tue');
    WeekDay_WEDNESDAY_instance = new WeekDay('WEDNESDAY', 2, 'Wed');
    WeekDay_THURSDAY_instance = new WeekDay('THURSDAY', 3, 'Thu');
    WeekDay_FRIDAY_instance = new WeekDay('FRIDAY', 4, 'Fri');
    WeekDay_SATURDAY_instance = new WeekDay('SATURDAY', 5, 'Sat');
    WeekDay_SUNDAY_instance = new WeekDay('SUNDAY', 6, 'Sun');
  }
  var $ENTRIES;
  function WeekDay(name, ordinal, value) {
    Enum.call(this, name, ordinal);
    this.h28_1 = value;
  }
  var Month_JANUARY_instance;
  var Month_FEBRUARY_instance;
  var Month_MARCH_instance;
  var Month_APRIL_instance;
  var Month_MAY_instance;
  var Month_JUNE_instance;
  var Month_JULY_instance;
  var Month_AUGUST_instance;
  var Month_SEPTEMBER_instance;
  var Month_OCTOBER_instance;
  var Month_NOVEMBER_instance;
  var Month_DECEMBER_instance;
  function Companion_1() {
  }
  protoOf(Companion_1).e28 = function (ordinal) {
    return get_entries_0().o(ordinal);
  };
  var Companion_instance_2;
  function Companion_getInstance_1() {
    return Companion_instance_2;
  }
  function values_0() {
    return [Month_JANUARY_getInstance(), Month_FEBRUARY_getInstance(), Month_MARCH_getInstance(), Month_APRIL_getInstance(), Month_MAY_getInstance(), Month_JUNE_getInstance(), Month_JULY_getInstance(), Month_AUGUST_getInstance(), Month_SEPTEMBER_getInstance(), Month_OCTOBER_getInstance(), Month_NOVEMBER_getInstance(), Month_DECEMBER_getInstance()];
  }
  function get_entries_0() {
    if ($ENTRIES_0 == null)
      $ENTRIES_0 = enumEntries(values_0());
    return $ENTRIES_0;
  }
  var Month_entriesInitialized;
  function Month_initEntries() {
    if (Month_entriesInitialized)
      return Unit_instance;
    Month_entriesInitialized = true;
    Month_JANUARY_instance = new Month('JANUARY', 0, 'Jan');
    Month_FEBRUARY_instance = new Month('FEBRUARY', 1, 'Feb');
    Month_MARCH_instance = new Month('MARCH', 2, 'Mar');
    Month_APRIL_instance = new Month('APRIL', 3, 'Apr');
    Month_MAY_instance = new Month('MAY', 4, 'May');
    Month_JUNE_instance = new Month('JUNE', 5, 'Jun');
    Month_JULY_instance = new Month('JULY', 6, 'Jul');
    Month_AUGUST_instance = new Month('AUGUST', 7, 'Aug');
    Month_SEPTEMBER_instance = new Month('SEPTEMBER', 8, 'Sep');
    Month_OCTOBER_instance = new Month('OCTOBER', 9, 'Oct');
    Month_NOVEMBER_instance = new Month('NOVEMBER', 10, 'Nov');
    Month_DECEMBER_instance = new Month('DECEMBER', 11, 'Dec');
  }
  var $ENTRIES_0;
  function Month(name, ordinal, value) {
    Enum.call(this, name, ordinal);
    this.k28_1 = value;
  }
  function WeekDay_MONDAY_getInstance() {
    WeekDay_initEntries();
    return WeekDay_MONDAY_instance;
  }
  function WeekDay_TUESDAY_getInstance() {
    WeekDay_initEntries();
    return WeekDay_TUESDAY_instance;
  }
  function WeekDay_WEDNESDAY_getInstance() {
    WeekDay_initEntries();
    return WeekDay_WEDNESDAY_instance;
  }
  function WeekDay_THURSDAY_getInstance() {
    WeekDay_initEntries();
    return WeekDay_THURSDAY_instance;
  }
  function WeekDay_FRIDAY_getInstance() {
    WeekDay_initEntries();
    return WeekDay_FRIDAY_instance;
  }
  function WeekDay_SATURDAY_getInstance() {
    WeekDay_initEntries();
    return WeekDay_SATURDAY_instance;
  }
  function WeekDay_SUNDAY_getInstance() {
    WeekDay_initEntries();
    return WeekDay_SUNDAY_instance;
  }
  function Month_JANUARY_getInstance() {
    Month_initEntries();
    return Month_JANUARY_instance;
  }
  function Month_FEBRUARY_getInstance() {
    Month_initEntries();
    return Month_FEBRUARY_instance;
  }
  function Month_MARCH_getInstance() {
    Month_initEntries();
    return Month_MARCH_instance;
  }
  function Month_APRIL_getInstance() {
    Month_initEntries();
    return Month_APRIL_instance;
  }
  function Month_MAY_getInstance() {
    Month_initEntries();
    return Month_MAY_instance;
  }
  function Month_JUNE_getInstance() {
    Month_initEntries();
    return Month_JUNE_instance;
  }
  function Month_JULY_getInstance() {
    Month_initEntries();
    return Month_JULY_instance;
  }
  function Month_AUGUST_getInstance() {
    Month_initEntries();
    return Month_AUGUST_instance;
  }
  function Month_SEPTEMBER_getInstance() {
    Month_initEntries();
    return Month_SEPTEMBER_instance;
  }
  function Month_OCTOBER_getInstance() {
    Month_initEntries();
    return Month_OCTOBER_instance;
  }
  function Month_NOVEMBER_getInstance() {
    Month_initEntries();
    return Month_NOVEMBER_instance;
  }
  function Month_DECEMBER_getInstance() {
    Month_initEntries();
    return Month_DECEMBER_instance;
  }
  var CONDITION_FALSE;
  var ALREADY_REMOVED;
  var LIST_EMPTY;
  var REMOVE_PREPARED;
  var NO_DECISION;
  function Symbol(symbol) {
    this.l28_1 = symbol;
  }
  protoOf(Symbol).toString = function () {
    return this.l28_1;
  };
  function LockFreeLinkedListNode() {
  }
  protoOf(LockFreeLinkedListNode).m10 = function () {
    // Inline function 'kotlinx.atomicfu.loop' call
    var this_0 = this.m28_1;
    while (true) {
      var next = this_0.kotlinx$atomicfu$value;
      if (!(next instanceof OpDescriptor))
        return next;
      next.n28(this);
    }
  };
  protoOf(LockFreeLinkedListNode).o28 = function () {
    return unwrap(this.m10());
  };
  function Removed() {
  }
  function OpDescriptor() {
  }
  function unwrap(_this__u8e3s4) {
    _init_properties_LockFreeLinkedList_kt__wekxce();
    var tmp0_safe_receiver = _this__u8e3s4 instanceof Removed ? _this__u8e3s4 : null;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.p28_1;
    var tmp;
    if (tmp1_elvis_lhs == null) {
      tmp = _this__u8e3s4 instanceof LockFreeLinkedListNode ? _this__u8e3s4 : THROW_CCE();
    } else {
      tmp = tmp1_elvis_lhs;
    }
    return tmp;
  }
  var properties_initialized_LockFreeLinkedList_kt_lnmdgw;
  function _init_properties_LockFreeLinkedList_kt__wekxce() {
    if (!properties_initialized_LockFreeLinkedList_kt_lnmdgw) {
      properties_initialized_LockFreeLinkedList_kt_lnmdgw = true;
      CONDITION_FALSE = new Symbol('CONDITION_FALSE');
      ALREADY_REMOVED = new Symbol('ALREADY_REMOVED');
      LIST_EMPTY = new Symbol('LIST_EMPTY');
      REMOVE_PREPARED = new Symbol('REMOVE_PREPARED');
      NO_DECISION = new Symbol('NO_DECISION');
    }
  }
  function proceedLoop($this, $completion) {
    var tmp = new $proceedLoopCOROUTINE$0($this, $completion);
    tmp.w8_1 = Unit_instance;
    tmp.x8_1 = null;
    return tmp.c9();
  }
  function $proceedLoopCOROUTINE$0(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.y28_1 = _this__u8e3s4;
  }
  protoOf($proceedLoopCOROUTINE$0).c9 = function () {
    var suspendResult = this.w8_1;
    $sm: do
      try {
        var tmp = this.u8_1;
        switch (tmp) {
          case 0:
            this.v8_1 = 6;
            this.u8_1 = 1;
            continue $sm;
          case 1:
            this.z28_1 = this.y28_1.g29_1;
            if (this.z28_1 === -1) {
              this.u8_1 = 5;
              continue $sm;
            } else {
              this.u8_1 = 2;
              continue $sm;
            }

          case 2:
            this.a29_1 = this.y28_1.d29_1;
            if (this.z28_1 >= this.a29_1.j()) {
              this.y28_1.h29();
              this.u8_1 = 5;
              continue $sm;
            } else {
              this.u8_1 = 3;
              continue $sm;
            }

          case 3:
            this.b29_1 = this.a29_1.o(this.z28_1);
            this.y28_1.g29_1 = this.z28_1 + 1 | 0;
            this.u8_1 = 4;
            suspendResult = this.b29_1(this.y28_1, this.y28_1.f29_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 4:
            this.u8_1 = 1;
            continue $sm;
          case 5:
            return this.y28_1.f29_1;
          case 6:
            throw this.x8_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.v8_1 === 6) {
          throw e;
        } else {
          this.u8_1 = this.v8_1;
          this.x8_1 = e;
        }
      }
     while (true);
  };
  function DebugPipelineContext(context, interceptors, subject, coroutineContext) {
    PipelineContext.call(this, context);
    this.d29_1 = interceptors;
    this.e29_1 = coroutineContext;
    this.f29_1 = subject;
    this.g29_1 = 0;
  }
  protoOf(DebugPipelineContext).no = function () {
    return this.e29_1;
  };
  protoOf(DebugPipelineContext).i29 = function () {
    return this.f29_1;
  };
  protoOf(DebugPipelineContext).h29 = function () {
    this.g29_1 = -1;
  };
  protoOf(DebugPipelineContext).j29 = function (subject, $completion) {
    this.f29_1 = subject;
    return this.k29($completion);
  };
  protoOf(DebugPipelineContext).k29 = function ($completion) {
    var index = this.g29_1;
    if (index < 0)
      return this.f29_1;
    if (index >= this.d29_1.j()) {
      this.h29();
      return this.f29_1;
    }
    return proceedLoop(this, $completion);
  };
  protoOf(DebugPipelineContext).l29 = function (initial, $completion) {
    this.g29_1 = 0;
    this.f29_1 = initial;
    return this.k29($completion);
  };
  function PhaseContent_init_$Init$(phase, relation, $this) {
    var tmp = Companion_getInstance_2().m29_1;
    PhaseContent.call($this, phase, relation, isInterface(tmp, KtMutableList) ? tmp : THROW_CCE());
    // Inline function 'kotlin.check' call
    if (!Companion_getInstance_2().m29_1.p()) {
      var message = 'The shared empty array list has been modified';
      throw IllegalStateException_init_$Create$(toString(message));
    }
    return $this;
  }
  function PhaseContent_init_$Create$(phase, relation) {
    return PhaseContent_init_$Init$(phase, relation, objectCreate(protoOf(PhaseContent)));
  }
  function copiedInterceptors($this) {
    return toMutableList($this.p29_1);
  }
  function copyInterceptors($this) {
    $this.p29_1 = copiedInterceptors($this);
    $this.q29_1 = false;
  }
  function Companion_2() {
    Companion_instance_3 = this;
    var tmp = this;
    // Inline function 'kotlin.collections.mutableListOf' call
    tmp.m29_1 = ArrayList_init_$Create$_0();
  }
  var Companion_instance_3;
  function Companion_getInstance_2() {
    if (Companion_instance_3 == null)
      new Companion_2();
    return Companion_instance_3;
  }
  function PhaseContent(phase, relation, interceptors) {
    Companion_getInstance_2();
    this.n29_1 = phase;
    this.o29_1 = relation;
    this.p29_1 = interceptors;
    this.q29_1 = true;
  }
  protoOf(PhaseContent).r29 = function () {
    return this.p29_1.p();
  };
  protoOf(PhaseContent).j = function () {
    return this.p29_1.j();
  };
  protoOf(PhaseContent).s29 = function (interceptor) {
    if (this.q29_1) {
      copyInterceptors(this);
    }
    this.p29_1.e(interceptor);
  };
  protoOf(PhaseContent).t29 = function (destination) {
    var interceptors = this.p29_1;
    if (destination instanceof ArrayList) {
      destination.i5(destination.j() + interceptors.j() | 0);
    }
    var inductionVariable = 0;
    var last = interceptors.j();
    if (inductionVariable < last)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        destination.e(interceptors.o(index));
      }
       while (inductionVariable < last);
  };
  protoOf(PhaseContent).u29 = function () {
    this.q29_1 = true;
    return this.p29_1;
  };
  protoOf(PhaseContent).toString = function () {
    return 'Phase `' + this.n29_1.v29_1 + '`, ' + this.j() + ' handlers';
  };
  function _set_interceptors__wod97b($this, _set____db54di) {
    var tmp0 = $this.a2a_1;
    // Inline function 'kotlinx.atomicfu.AtomicRef.setValue' call
    interceptors$factory();
    tmp0.kotlinx$atomicfu$value = _set____db54di;
    return Unit_instance;
  }
  function _get_interceptors__h4min7($this) {
    var tmp0 = $this.a2a_1;
    // Inline function 'kotlinx.atomicfu.AtomicRef.getValue' call
    interceptors$factory_0();
    return tmp0.kotlinx$atomicfu$value;
  }
  function createContext($this, context, subject, coroutineContext) {
    return pipelineContextFor(context, sharedInterceptorsList($this), subject, coroutineContext, $this.d2a());
  }
  function findPhase($this, phase) {
    var phasesList = $this.y29_1;
    var inductionVariable = 0;
    var last = phasesList.j();
    if (inductionVariable < last)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var current = phasesList.o(index);
        if (current === phase) {
          var content = PhaseContent_init_$Create$(phase, Last_getInstance());
          phasesList.z1(index, content);
          return content;
        }
        var tmp;
        if (current instanceof PhaseContent) {
          tmp = current.n29_1 === phase;
        } else {
          tmp = false;
        }
        if (tmp) {
          return current instanceof PhaseContent ? current : THROW_CCE();
        }
      }
       while (inductionVariable < last);
    return null;
  }
  function findPhaseIndex($this, phase) {
    var phasesList = $this.y29_1;
    var inductionVariable = 0;
    var last = phasesList.j();
    if (inductionVariable < last)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var current = phasesList.o(index);
        var tmp;
        if (current === phase) {
          tmp = true;
        } else {
          var tmp_0;
          if (current instanceof PhaseContent) {
            tmp_0 = current.n29_1 === phase;
          } else {
            tmp_0 = false;
          }
          tmp = tmp_0;
        }
        if (tmp) {
          return index;
        }
      }
       while (inductionVariable < last);
    return -1;
  }
  function hasPhase($this, phase) {
    var phasesList = $this.y29_1;
    var inductionVariable = 0;
    var last = phasesList.j();
    if (inductionVariable < last)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var current = phasesList.o(index);
        var tmp;
        if (current === phase) {
          tmp = true;
        } else {
          var tmp_0;
          if (current instanceof PhaseContent) {
            tmp_0 = current.n29_1 === phase;
          } else {
            tmp_0 = false;
          }
          tmp = tmp_0;
        }
        if (tmp) {
          return true;
        }
      }
       while (inductionVariable < last);
    return false;
  }
  function cacheInterceptors($this) {
    var interceptorsQuantity = $this.z29_1;
    if (interceptorsQuantity === 0) {
      notSharedInterceptorsList($this, emptyList());
      return emptyList();
    }
    var phases = $this.y29_1;
    if (interceptorsQuantity === 1) {
      var inductionVariable = 0;
      var last = get_lastIndex_0(phases);
      if (inductionVariable <= last)
        $l$loop_0: do {
          var phaseIndex = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var tmp = phases.o(phaseIndex);
          var tmp0_elvis_lhs = tmp instanceof PhaseContent ? tmp : null;
          var tmp_0;
          if (tmp0_elvis_lhs == null) {
            continue $l$loop_0;
          } else {
            tmp_0 = tmp0_elvis_lhs;
          }
          var phaseContent = tmp_0;
          if (phaseContent.r29())
            continue $l$loop_0;
          var interceptors = phaseContent.u29();
          setInterceptorsListFromPhase($this, phaseContent);
          return interceptors;
        }
         while (!(phaseIndex === last));
    }
    // Inline function 'kotlin.collections.mutableListOf' call
    var destination = ArrayList_init_$Create$_0();
    var inductionVariable_0 = 0;
    var last_0 = get_lastIndex_0(phases);
    if (inductionVariable_0 <= last_0)
      $l$loop_1: do {
        var phaseIndex_0 = inductionVariable_0;
        inductionVariable_0 = inductionVariable_0 + 1 | 0;
        var tmp_1 = phases.o(phaseIndex_0);
        var tmp1_elvis_lhs = tmp_1 instanceof PhaseContent ? tmp_1 : null;
        var tmp_2;
        if (tmp1_elvis_lhs == null) {
          continue $l$loop_1;
        } else {
          tmp_2 = tmp1_elvis_lhs;
        }
        var phase = tmp_2;
        phase.t29(destination);
      }
       while (!(phaseIndex_0 === last_0));
    notSharedInterceptorsList($this, destination);
    return destination;
  }
  function sharedInterceptorsList($this) {
    if (_get_interceptors__h4min7($this) == null) {
      cacheInterceptors($this);
    }
    $this.b2a_1 = true;
    return ensureNotNull(_get_interceptors__h4min7($this));
  }
  function resetInterceptorsList($this) {
    _set_interceptors__wod97b($this, null);
    $this.b2a_1 = false;
    $this.c2a_1 = null;
  }
  function notSharedInterceptorsList($this, list) {
    _set_interceptors__wod97b($this, list);
    $this.b2a_1 = false;
    $this.c2a_1 = null;
  }
  function setInterceptorsListFromPhase($this, phaseContent) {
    _set_interceptors__wod97b($this, phaseContent.u29());
    $this.b2a_1 = false;
    $this.c2a_1 = phaseContent.n29_1;
  }
  function tryAddToPhaseFastPath($this, phase, block) {
    var currentInterceptors = _get_interceptors__h4min7($this);
    if ($this.y29_1.p() || currentInterceptors == null) {
      return false;
    }
    var tmp;
    if ($this.b2a_1) {
      tmp = true;
    } else {
      tmp = !(!(currentInterceptors == null) ? isInterface(currentInterceptors, KtMutableList) : false);
    }
    if (tmp) {
      return false;
    }
    if (equals($this.c2a_1, phase)) {
      currentInterceptors.e(block);
      return true;
    }
    if (equals(phase, last($this.y29_1)) || findPhaseIndex($this, phase) === get_lastIndex_0($this.y29_1)) {
      ensureNotNull(findPhase($this, phase)).s29(block);
      currentInterceptors.e(block);
      return true;
    }
    return false;
  }
  function Pipeline(phases) {
    this.w29_1 = AttributesJsFn(true);
    this.x29_1 = false;
    this.y29_1 = mutableListOf(phases.slice());
    this.z29_1 = 0;
    this.a2a_1 = atomic$ref$1(null);
    this.b2a_1 = false;
    this.c2a_1 = null;
  }
  protoOf(Pipeline).d2a = function () {
    return this.x29_1;
  };
  protoOf(Pipeline).e2a = function (context, subject, $completion) {
    // Inline function 'kotlin.js.getCoroutineContext' call
    var tmp$ret$0 = $completion.a9();
    return createContext(this, context, subject, tmp$ret$0).l29(subject, $completion);
  };
  protoOf(Pipeline).g2a = function (reference, phase) {
    if (hasPhase(this, phase))
      return Unit_instance;
    var index = findPhaseIndex(this, reference);
    if (index === -1) {
      throw new InvalidPhaseException('Phase ' + reference.toString() + ' was not registered for this pipeline');
    }
    var lastRelatedPhaseIndex = index;
    var inductionVariable = index + 1 | 0;
    var last = get_lastIndex_0(this.y29_1);
    if (inductionVariable <= last)
      $l$loop_0: do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var tmp = this.y29_1.o(i);
        var tmp0_safe_receiver = tmp instanceof PhaseContent ? tmp : null;
        var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.o29_1;
        var tmp_0;
        if (tmp1_elvis_lhs == null) {
          break $l$loop_0;
        } else {
          tmp_0 = tmp1_elvis_lhs;
        }
        var relation = tmp_0;
        var tmp2_safe_receiver = relation instanceof After ? relation : null;
        var tmp3_elvis_lhs = tmp2_safe_receiver == null ? null : tmp2_safe_receiver.h2a_1;
        var tmp_1;
        if (tmp3_elvis_lhs == null) {
          continue $l$loop_0;
        } else {
          tmp_1 = tmp3_elvis_lhs;
        }
        var relatedTo = tmp_1;
        lastRelatedPhaseIndex = equals(relatedTo, reference) ? i : lastRelatedPhaseIndex;
      }
       while (!(i === last));
    this.y29_1.a2(lastRelatedPhaseIndex + 1 | 0, PhaseContent_init_$Create$(phase, new After(reference)));
  };
  protoOf(Pipeline).i2a = function (reference, phase) {
    if (hasPhase(this, phase))
      return Unit_instance;
    var index = findPhaseIndex(this, reference);
    if (index === -1) {
      throw new InvalidPhaseException('Phase ' + reference.toString() + ' was not registered for this pipeline');
    }
    this.y29_1.a2(index, PhaseContent_init_$Create$(phase, new Before(reference)));
  };
  protoOf(Pipeline).j2a = function (phase, block) {
    var tmp0_elvis_lhs = findPhase(this, phase);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throw new InvalidPhaseException('Phase ' + phase.toString() + ' was not registered for this pipeline');
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var phaseContent = tmp;
    if (tryAddToPhaseFastPath(this, phase, block)) {
      this.z29_1 = this.z29_1 + 1 | 0;
      return Unit_instance;
    }
    phaseContent.s29(block);
    this.z29_1 = this.z29_1 + 1 | 0;
    resetInterceptorsList(this);
    this.k2a();
  };
  protoOf(Pipeline).k2a = function () {
  };
  protoOf(Pipeline).toString = function () {
    return anyToString(this);
  };
  function interceptors$factory() {
    return getPropertyCallableRef('interceptors', 1, KMutableProperty1, function (receiver) {
      return _get_interceptors__h4min7(receiver);
    }, function (receiver, value) {
      return _set_interceptors__wod97b(receiver, value);
    });
  }
  function interceptors$factory_0() {
    return getPropertyCallableRef('interceptors', 1, KMutableProperty1, function (receiver) {
      return _get_interceptors__h4min7(receiver);
    }, function (receiver, value) {
      return _set_interceptors__wod97b(receiver, value);
    });
  }
  function PipelineContext(context) {
    this.f2a_1 = context;
  }
  function pipelineContextFor(context, interceptors, subject, coroutineContext, debugMode) {
    debugMode = debugMode === VOID ? false : debugMode;
    var tmp;
    if (get_DISABLE_SFG() || debugMode) {
      tmp = new DebugPipelineContext(context, interceptors, subject, coroutineContext);
    } else {
      tmp = new SuspendFunctionGun(subject, context, interceptors);
    }
    return tmp;
  }
  function PipelinePhase(name) {
    this.v29_1 = name;
  }
  protoOf(PipelinePhase).toString = function () {
    return "Phase('" + this.v29_1 + "')";
  };
  function InvalidPhaseException(message) {
    extendThrowable(this, message);
    captureStack(this, InvalidPhaseException);
  }
  function After(relativeTo) {
    PipelinePhaseRelation.call(this);
    this.h2a_1 = relativeTo;
  }
  function Before(relativeTo) {
    PipelinePhaseRelation.call(this);
    this.l2a_1 = relativeTo;
  }
  function Last() {
    Last_instance = this;
    PipelinePhaseRelation.call(this);
  }
  protoOf(Last).toString = function () {
    return 'Last';
  };
  protoOf(Last).hashCode = function () {
    return 967869129;
  };
  protoOf(Last).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Last))
      return false;
    other instanceof Last || THROW_CCE();
    return true;
  };
  var Last_instance;
  function Last_getInstance() {
    if (Last_instance == null)
      new Last();
    return Last_instance;
  }
  function PipelinePhaseRelation() {
  }
  function recoverStackTraceBridge(exception, continuation) {
    var tmp;
    try {
      tmp = withCause(recoverStackTrace(exception, continuation), exception.cause);
    } catch ($p) {
      var tmp_0;
      if ($p instanceof Error) {
        var _unused_var__etf5q3 = $p;
        tmp_0 = exception;
      } else {
        throw $p;
      }
      tmp = tmp_0;
    }
    return tmp;
  }
  function loop($this, direct) {
    do {
      var currentIndex = $this.s2a_1;
      if (currentIndex === $this.n2a_1.j()) {
        if (!direct) {
          // Inline function 'kotlin.Companion.success' call
          var value = $this.p2a_1;
          var tmp$ret$0 = _Result___init__impl__xyqfz8(value);
          resumeRootWith($this, tmp$ret$0);
          return false;
        }
        return true;
      }
      $this.s2a_1 = currentIndex + 1 | 0;
      var next = $this.n2a_1.o(currentIndex);
      try {
        var result = pipelineStartCoroutineUninterceptedOrReturn(next, $this, $this.p2a_1, $this.o2a_1);
        if (result === get_COROUTINE_SUSPENDED())
          return false;
      } catch ($p) {
        if ($p instanceof Error) {
          var cause = $p;
          // Inline function 'kotlin.Companion.failure' call
          var tmp$ret$1 = _Result___init__impl__xyqfz8(createFailure(cause));
          resumeRootWith($this, tmp$ret$1);
          return false;
        } else {
          throw $p;
        }
      }
    }
     while (true);
  }
  function resumeRootWith($this, result) {
    if ($this.r2a_1 < 0) {
      // Inline function 'kotlin.error' call
      var message = 'No more continuations to resume';
      throw IllegalStateException_init_$Create$(toString(message));
    }
    var next = ensureNotNull($this.q2a_1[$this.r2a_1]);
    var _unary__edvuaz = $this.r2a_1;
    $this.r2a_1 = _unary__edvuaz - 1 | 0;
    $this.q2a_1[_unary__edvuaz] = null;
    if (!_Result___get_isFailure__impl__jpiriv(result)) {
      next.f9(result);
    } else {
      var exception = recoverStackTraceBridge(ensureNotNull(Result__exceptionOrNull_impl_p6xea9(result)), next);
      // Inline function 'kotlin.coroutines.resumeWithException' call
      // Inline function 'kotlin.Companion.failure' call
      var tmp$ret$0 = _Result___init__impl__xyqfz8(createFailure(exception));
      next.f9(tmp$ret$0);
    }
  }
  function discardLastRootContinuation($this) {
    if ($this.r2a_1 < 0)
      throw IllegalStateException_init_$Create$('No more continuations to resume');
    var _unary__edvuaz = $this.r2a_1;
    $this.r2a_1 = _unary__edvuaz - 1 | 0;
    $this.q2a_1[_unary__edvuaz] = null;
  }
  function SuspendFunctionGun$continuation$1(this$0) {
    this.u2a_1 = this$0;
    this.t2a_1 = -2147483648;
  }
  protoOf(SuspendFunctionGun$continuation$1).a9 = function () {
    var continuation = this.u2a_1.q2a_1[this.u2a_1.r2a_1];
    if (!(continuation === this) && !(continuation == null))
      return continuation.a9();
    var index = this.u2a_1.r2a_1 - 1 | 0;
    while (index >= 0) {
      var _unary__edvuaz = index;
      index = _unary__edvuaz - 1 | 0;
      var cont = this.u2a_1.q2a_1[_unary__edvuaz];
      if (!(cont === this) && !(cont == null))
        return cont.a9();
    }
    // Inline function 'kotlin.error' call
    var message = 'Not started';
    throw IllegalStateException_init_$Create$(toString(message));
  };
  protoOf(SuspendFunctionGun$continuation$1).v2a = function (result) {
    if (_Result___get_isFailure__impl__jpiriv(result)) {
      // Inline function 'kotlin.Companion.failure' call
      var exception = ensureNotNull(Result__exceptionOrNull_impl_p6xea9(result));
      var tmp$ret$0 = _Result___init__impl__xyqfz8(createFailure(exception));
      resumeRootWith(this.u2a_1, tmp$ret$0);
      return Unit_instance;
    }
    loop(this.u2a_1, false);
  };
  protoOf(SuspendFunctionGun$continuation$1).f9 = function (result) {
    return this.v2a(result);
  };
  function SuspendFunctionGun(initial, context, blocks) {
    PipelineContext.call(this, context);
    this.n2a_1 = blocks;
    var tmp = this;
    tmp.o2a_1 = new SuspendFunctionGun$continuation$1(this);
    this.p2a_1 = initial;
    var tmp_0 = this;
    // Inline function 'kotlin.arrayOfNulls' call
    var size = this.n2a_1.j();
    tmp_0.q2a_1 = Array(size);
    this.r2a_1 = -1;
    this.s2a_1 = 0;
  }
  protoOf(SuspendFunctionGun).no = function () {
    return this.o2a_1.a9();
  };
  protoOf(SuspendFunctionGun).i29 = function () {
    return this.p2a_1;
  };
  protoOf(SuspendFunctionGun).k29 = function ($completion) {
    var tmp$ret$0;
    $l$block_0: {
      if (this.s2a_1 === this.n2a_1.j()) {
        tmp$ret$0 = this.p2a_1;
        break $l$block_0;
      }
      this.w2a(intercepted($completion));
      if (loop(this, true)) {
        discardLastRootContinuation(this);
        tmp$ret$0 = this.p2a_1;
        break $l$block_0;
      }
      tmp$ret$0 = get_COROUTINE_SUSPENDED();
    }
    return tmp$ret$0;
  };
  protoOf(SuspendFunctionGun).j29 = function (subject, $completion) {
    this.p2a_1 = subject;
    return this.k29($completion);
  };
  protoOf(SuspendFunctionGun).l29 = function (initial, $completion) {
    this.s2a_1 = 0;
    if (this.s2a_1 === this.n2a_1.j())
      return initial;
    this.p2a_1 = initial;
    if (this.r2a_1 >= 0)
      throw IllegalStateException_init_$Create$('Already started');
    return this.k29($completion);
  };
  protoOf(SuspendFunctionGun).w2a = function (continuation) {
    this.r2a_1 = this.r2a_1 + 1 | 0;
    this.q2a_1[this.r2a_1] = continuation;
  };
  function TypeInfo(type, kotlinType) {
    kotlinType = kotlinType === VOID ? null : kotlinType;
    this.x2a_1 = type;
    this.y2a_1 = kotlinType;
  }
  protoOf(TypeInfo).hashCode = function () {
    var tmp0_safe_receiver = this.y2a_1;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : hashCode(tmp0_safe_receiver);
    return tmp1_elvis_lhs == null ? this.x2a_1.hashCode() : tmp1_elvis_lhs;
  };
  protoOf(TypeInfo).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof TypeInfo))
      return false;
    var tmp;
    if (!(this.y2a_1 == null) || !(other.y2a_1 == null)) {
      tmp = equals(this.y2a_1, other.y2a_1);
    } else {
      tmp = this.x2a_1.equals(other.x2a_1);
    }
    return tmp;
  };
  protoOf(TypeInfo).toString = function () {
    var tmp0_elvis_lhs = this.y2a_1;
    return 'TypeInfo(' + toString(tmp0_elvis_lhs == null ? this.x2a_1 : tmp0_elvis_lhs) + ')';
  };
  function get_platform(_this__u8e3s4) {
    _init_properties_PlatformUtils_js_kt__7rxm8p();
    var tmp0 = platform$delegate;
    // Inline function 'kotlin.getValue' call
    platform$factory();
    return tmp0.w();
  }
  var platform$delegate;
  function platform$delegate$lambda() {
    _init_properties_PlatformUtils_js_kt__7rxm8p();
    return new Js(hasNodeApi() ? JsPlatform_Node_getInstance() : JsPlatform_Browser_getInstance());
  }
  function platform$factory() {
    return getPropertyCallableRef('platform', 1, KProperty1, function (receiver) {
      return get_platform(receiver);
    }, null);
  }
  var properties_initialized_PlatformUtils_js_kt_8g036j;
  function _init_properties_PlatformUtils_js_kt__7rxm8p() {
    if (!properties_initialized_PlatformUtils_js_kt_8g036j) {
      properties_initialized_PlatformUtils_js_kt_8g036j = true;
      platform$delegate = lazy(platform$delegate$lambda);
    }
  }
  function GMTDate_0(timestamp) {
    timestamp = timestamp === VOID ? null : timestamp;
    var tmp1_safe_receiver = timestamp == null ? null : timestamp.i3();
    var tmp;
    if (tmp1_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      tmp = new Date(tmp1_safe_receiver);
    }
    var tmp2_elvis_lhs = tmp;
    var date = tmp2_elvis_lhs == null ? new Date() : tmp2_elvis_lhs;
    if (isNaN_0(date.getTime()))
      throw new InvalidTimestampException(ensureNotNull(timestamp));
    // Inline function 'kotlin.with' call
    var dayOfWeek = Companion_instance_1.e28((date.getUTCDay() + 6 | 0) % 7 | 0);
    var month = Companion_instance_2.e28(date.getUTCMonth());
    return new GMTDate(date.getUTCSeconds(), date.getUTCMinutes(), date.getUTCHours(), dayOfWeek, date.getUTCDate(), date.getUTCFullYear(), month, date.getUTCFullYear(), numberToLong(date.getTime()));
  }
  function InvalidTimestampException(timestamp) {
    IllegalStateException_init_$Init$('Invalid date timestamp exception: ' + timestamp.toString(), this);
    captureStack(this, InvalidTimestampException);
  }
  function pipelineStartCoroutineUninterceptedOrReturn(interceptor, context, subject, continuation) {
    return (typeof interceptor === 'function' ? interceptor : THROW_CCE())(context, subject, continuation);
  }
  function AttributesJsFn(concurrent) {
    concurrent = concurrent === VOID ? false : concurrent;
    return new AttributesJs();
  }
  function AttributesJs() {
    var tmp = this;
    // Inline function 'kotlin.collections.mutableMapOf' call
    tmp.z2a_1 = LinkedHashMap_init_$Create$();
  }
  protoOf(AttributesJs).m25 = function (key) {
    var tmp = this.z2a_1.e2(key);
    return (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
  };
  protoOf(AttributesJs).n25 = function (key) {
    return this.z2a_1.c2(key);
  };
  protoOf(AttributesJs).o25 = function (key, value) {
    // Inline function 'kotlin.collections.set' call
    this.z2a_1.h2(key, value);
  };
  protoOf(AttributesJs).p25 = function (key) {
    this.z2a_1.i2(key);
  };
  protoOf(AttributesJs).q25 = function (key, block) {
    var tmp0_safe_receiver = this.z2a_1.e2(key);
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      return !(tmp0_safe_receiver == null) ? tmp0_safe_receiver : THROW_CCE();
    }
    // Inline function 'kotlin.also' call
    var this_0 = block();
    // Inline function 'kotlin.collections.set' call
    this.z2a_1.h2(key, this_0);
    return this_0;
  };
  protoOf(AttributesJs).r25 = function () {
    return toList(this.z2a_1.f2());
  };
  function unmodifiable(_this__u8e3s4) {
    return _this__u8e3s4;
  }
  function hasNodeApi() {
    return typeof process !== 'undefined' && process.versions != null && process.versions.node != null || (typeof window !== 'undefined' && typeof window.process !== 'undefined' && window.process.versions != null && window.process.versions.node != null);
  }
  function get_isDevelopmentMode(_this__u8e3s4) {
    return false;
  }
  function get_isNewMemoryModel(_this__u8e3s4) {
    return true;
  }
  function KtorSimpleLogger(name) {
    return new KtorSimpleLogger$1();
  }
  function getKtorLogLevel() {
    return process.env.KTOR_LOG_LEVEL;
  }
  function KtorSimpleLogger$1() {
    var tmp = this;
    var tmp_0;
    switch (PlatformUtils_getInstance().r26_1 || PlatformUtils_getInstance().q26_1) {
      case true:
        // Inline function 'kotlin.runCatching' call

        var tmp_1;
        try {
          // Inline function 'kotlin.Companion.success' call
          var value = getKtorLogLevel();
          tmp_1 = _Result___init__impl__xyqfz8(value);
        } catch ($p) {
          var tmp_2;
          if ($p instanceof Error) {
            var e = $p;
            // Inline function 'kotlin.Companion.failure' call
            tmp_2 = _Result___init__impl__xyqfz8(createFailure(e));
          } else {
            throw $p;
          }
          tmp_1 = tmp_2;
        }

        // Inline function 'kotlin.Result.getOrNull' call

        var this_0 = tmp_1;
        var tmp_3;
        if (_Result___get_isFailure__impl__jpiriv(this_0)) {
          tmp_3 = null;
        } else {
          var tmp_4 = _Result___get_value__impl__bjfvqg(this_0);
          tmp_3 = (tmp_4 == null ? true : !(tmp_4 == null)) ? tmp_4 : THROW_CCE();
        }

        var tmp1_safe_receiver = tmp_3;
        var tmp_5;
        if (tmp1_safe_receiver == null) {
          tmp_5 = null;
        } else {
          // Inline function 'kotlin.let' call
          var tmp0 = get_entries_1();
          var tmp$ret$6;
          $l$block: {
            // Inline function 'kotlin.collections.firstOrNull' call
            var _iterator__ex2g4s = tmp0.g();
            while (_iterator__ex2g4s.h()) {
              var element = _iterator__ex2g4s.i();
              if (element.k2_1 === tmp1_safe_receiver) {
                tmp$ret$6 = element;
                break $l$block;
              }
            }
            tmp$ret$6 = null;
          }
          tmp_5 = tmp$ret$6;
        }

        var tmp2_elvis_lhs = tmp_5;
        tmp_0 = tmp2_elvis_lhs == null ? LogLevel_INFO_getInstance() : tmp2_elvis_lhs;
        break;
      case false:
        tmp_0 = LogLevel_TRACE_getInstance();
        break;
      default:
        noWhenBranchMatchedException();
        break;
    }
    tmp.a2b_1 = tmp_0;
  }
  protoOf(KtorSimpleLogger$1).b2b = function (message) {
    if (this.a2b_1.m2(LogLevel_TRACE_getInstance()) > 0)
      return Unit_instance;
    console.debug('TRACE: ' + message);
  };
  var LogLevel_TRACE_instance;
  var LogLevel_DEBUG_instance;
  var LogLevel_INFO_instance;
  var LogLevel_WARN_instance;
  var LogLevel_ERROR_instance;
  var LogLevel_NONE_instance;
  function values_1() {
    return [LogLevel_TRACE_getInstance(), LogLevel_DEBUG_getInstance(), LogLevel_INFO_getInstance(), LogLevel_WARN_getInstance(), LogLevel_ERROR_getInstance(), LogLevel_NONE_getInstance()];
  }
  function get_entries_1() {
    if ($ENTRIES_1 == null)
      $ENTRIES_1 = enumEntries(values_1());
    return $ENTRIES_1;
  }
  var LogLevel_entriesInitialized;
  function LogLevel_initEntries() {
    if (LogLevel_entriesInitialized)
      return Unit_instance;
    LogLevel_entriesInitialized = true;
    LogLevel_TRACE_instance = new LogLevel('TRACE', 0);
    LogLevel_DEBUG_instance = new LogLevel('DEBUG', 1);
    LogLevel_INFO_instance = new LogLevel('INFO', 2);
    LogLevel_WARN_instance = new LogLevel('WARN', 3);
    LogLevel_ERROR_instance = new LogLevel('ERROR', 4);
    LogLevel_NONE_instance = new LogLevel('NONE', 5);
  }
  var $ENTRIES_1;
  function LogLevel(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function LogLevel_TRACE_getInstance() {
    LogLevel_initEntries();
    return LogLevel_TRACE_instance;
  }
  function LogLevel_DEBUG_getInstance() {
    LogLevel_initEntries();
    return LogLevel_DEBUG_instance;
  }
  function LogLevel_INFO_getInstance() {
    LogLevel_initEntries();
    return LogLevel_INFO_instance;
  }
  function LogLevel_WARN_getInstance() {
    LogLevel_initEntries();
    return LogLevel_WARN_instance;
  }
  function LogLevel_ERROR_getInstance() {
    LogLevel_initEntries();
    return LogLevel_ERROR_instance;
  }
  function LogLevel_NONE_getInstance() {
    LogLevel_initEntries();
    return LogLevel_NONE_instance;
  }
  function get_DISABLE_SFG() {
    return DISABLE_SFG;
  }
  var DISABLE_SFG;
  function withCause(_this__u8e3s4, cause) {
    return _this__u8e3s4;
  }
  function instanceOf(_this__u8e3s4, type) {
    return type.va(_this__u8e3s4);
  }
  //region block: post-declaration
  protoOf($serializer).w1v = typeParametersSerializers;
  protoOf(AttributesJs).l25 = get;
  //endregion
  //region block: init
  Companion_instance_1 = new Companion_0();
  Companion_instance_2 = new Companion_1();
  DISABLE_SFG = false;
  //endregion
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = PlatformUtils_getInstance;
  _.$_$.b = CopyOnWriteHashMap;
  _.$_$.c = GMTDate_0;
  _.$_$.d = LockFreeLinkedListNode;
  _.$_$.e = KtorSimpleLogger;
  _.$_$.f = PipelineContext;
  _.$_$.g = PipelinePhase;
  _.$_$.h = Pipeline;
  _.$_$.i = TypeInfo;
  _.$_$.j = instanceOf;
  _.$_$.k = AttributeKey;
  _.$_$.l = AttributesJsFn;
  _.$_$.m = Attributes;
  _.$_$.n = SilentSupervisor;
  _.$_$.o = forEach;
  _.$_$.p = get_0;
  _.$_$.q = StringValuesBuilderImpl;
  _.$_$.r = StringValuesImpl;
  _.$_$.s = StringValues;
  _.$_$.t = appendAll;
  _.$_$.u = isLowerCase;
  _.$_$.v = putAll;
  _.$_$.w = toCharArray;
  _.$_$.x = toLowerCasePreservingASCIIRules;
  //endregion
  return _;
}));

//# sourceMappingURL=ktor-ktor-utils.js.map
