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
  var PrimitiveClasses_getInstance = kotlin_kotlin.$_$.x4;
  var arrayOf = kotlin_kotlin.$_$.gh;
  var createKType = kotlin_kotlin.$_$.d;
  var Unit_instance = kotlin_kotlin.$_$.i5;
  var VOID = kotlin_kotlin.$_$.i;
  var isBlank = kotlin_kotlin.$_$.ce;
  var toString = kotlin_kotlin.$_$.lc;
  var IllegalArgumentException_init_$Create$ = kotlin_kotlin.$_$.w1;
  var protoOf = kotlin_kotlin.$_$.hc;
  var getStringHashCode = kotlin_kotlin.$_$.bb;
  var THROW_CCE = kotlin_kotlin.$_$.sg;
  var initMetadataForClass = kotlin_kotlin.$_$.db;
  var IllegalStateException_init_$Create$ = kotlin_kotlin.$_$.a2;
  var initMetadataForInterface = kotlin_kotlin.$_$.hb;
  var LinkedHashMap_init_$Create$ = kotlin_kotlin.$_$.z;
  var equals = kotlin_kotlin.$_$.wa;
  var hashCode = kotlin_kotlin.$_$.cb;
  var KtMutableMap = kotlin_kotlin.$_$.t5;
  var ensureNotNull = kotlin_kotlin.$_$.kh;
  var Entry = kotlin_kotlin.$_$.q5;
  var isInterface = kotlin_kotlin.$_$.sb;
  var toString_0 = kotlin_kotlin.$_$.xh;
  var charArray = kotlin_kotlin.$_$.qa;
  var charSequenceGet = kotlin_kotlin.$_$.ra;
  var toString_1 = kotlin_kotlin.$_$.x2;
  var SupervisorJob = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.b1;
  var AbstractCoroutineContextElement = kotlin_kotlin.$_$.v9;
  var Key_instance = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.e;
  var Element = kotlin_kotlin.$_$.ea;
  var collectionSizeOrDefault = kotlin_kotlin.$_$.e6;
  var ArrayList_init_$Create$ = kotlin_kotlin.$_$.p;
  var KtSet = kotlin_kotlin.$_$.v5;
  var KtMutableSet = kotlin_kotlin.$_$.u5;
  var initMetadataForObject = kotlin_kotlin.$_$.jb;
  var Enum = kotlin_kotlin.$_$.ig;
  var firstOrNull = kotlin_kotlin.$_$.a7;
  var ArrayList_init_$Create$_0 = kotlin_kotlin.$_$.q;
  var LinkedHashMap_init_$Create$_0 = kotlin_kotlin.$_$.y;
  var addAll = kotlin_kotlin.$_$.w5;
  var emptyMap = kotlin_kotlin.$_$.x6;
  var getBooleanHashCode = kotlin_kotlin.$_$.ya;
  var charSequenceLength = kotlin_kotlin.$_$.sa;
  var StringBuilder_init_$Create$ = kotlin_kotlin.$_$.i1;
  var get_lastIndex = kotlin_kotlin.$_$.ge;
  var _Char___init__impl__6a9atx = kotlin_kotlin.$_$.q2;
  var Char__plus_impl_qi7pgj = kotlin_kotlin.$_$.u2;
  var Char__toInt_impl_vasixd = kotlin_kotlin.$_$.w2;
  var equals_0 = kotlin_kotlin.$_$.wd;
  var atomic$ref$1 = kotlin_org_jetbrains_kotlinx_atomicfu.$_$.d;
  var createSimpleEnumSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.f2;
  var Long = kotlin_kotlin.$_$.ng;
  var initMetadataForCompanion = kotlin_kotlin.$_$.eb;
  var PluginGeneratedSerialDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.c2;
  var UnknownFieldException_init_$Create$ = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.f;
  var IntSerializer_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.r;
  var LongSerializer_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.s;
  var typeParametersSerializers = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.w1;
  var GeneratedSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.x1;
  var throwMissingFieldException = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.i2;
  var objectCreate = kotlin_kotlin.$_$.gc;
  var Comparable = kotlin_kotlin.$_$.eg;
  var enumEntries = kotlin_kotlin.$_$.ia;
  var CoroutineImpl = kotlin_kotlin.$_$.ga;
  var get_COROUTINE_SUSPENDED = kotlin_kotlin.$_$.q9;
  var initMetadataForCoroutine = kotlin_kotlin.$_$.fb;
  var KtMutableList = kotlin_kotlin.$_$.s5;
  var toMutableList = kotlin_kotlin.$_$.g9;
  var ArrayList = kotlin_kotlin.$_$.j5;
  var emptyList = kotlin_kotlin.$_$.w6;
  var get_lastIndex_0 = kotlin_kotlin.$_$.n7;
  var last = kotlin_kotlin.$_$.p7;
  var mutableListOf = kotlin_kotlin.$_$.z7;
  var anyToString = kotlin_kotlin.$_$.la;
  var KMutableProperty1 = kotlin_kotlin.$_$.ed;
  var getPropertyCallableRef = kotlin_kotlin.$_$.ab;
  var CoroutineScope = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.z;
  var extendThrowable = kotlin_kotlin.$_$.xa;
  var captureStack = kotlin_kotlin.$_$.oa;
  var recoverStackTrace = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.q;
  var Companion_instance = kotlin_kotlin.$_$.d5;
  var _Result___init__impl__xyqfz8 = kotlin_kotlin.$_$.y2;
  var createFailure = kotlin_kotlin.$_$.jh;
  var Result__exceptionOrNull_impl_p6xea9 = kotlin_kotlin.$_$.z2;
  var _Result___get_isFailure__impl__jpiriv = kotlin_kotlin.$_$.a3;
  var Continuation = kotlin_kotlin.$_$.aa;
  var intercepted = kotlin_kotlin.$_$.t9;
  var KProperty1 = kotlin_kotlin.$_$.gd;
  var lazy = kotlin_kotlin.$_$.qh;
  var isNaN_0 = kotlin_kotlin.$_$.oh;
  var numberToLong = kotlin_kotlin.$_$.fc;
  var IllegalStateException = kotlin_kotlin.$_$.mg;
  var IllegalStateException_init_$Init$ = kotlin_kotlin.$_$.z1;
  var toList = kotlin_kotlin.$_$.c9;
  var _Result___get_value__impl__bjfvqg = kotlin_kotlin.$_$.c3;
  var noWhenBranchMatchedException = kotlin_kotlin.$_$.rh;
  //endregion
  //region block: pre-declaration
  initMetadataForClass(AttributeKey, 'AttributeKey');
  function get(key) {
    var tmp0_elvis_lhs = this.i2b(key);
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
    var tmp0_safe_receiver = this.w2c(name);
    return tmp0_safe_receiver == null ? null : firstOrNull(tmp0_safe_receiver);
  }
  function forEach(body) {
    // Inline function 'kotlin.collections.forEach' call
    var _iterator__ex2g4s = this.y2c().j();
    while (_iterator__ex2g4s.k()) {
      var element = _iterator__ex2g4s.l();
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
      var tmp_0 = PrimitiveClasses_getInstance().vb();
      // Inline function 'io.ktor.util.reflect.typeOfOrNull' call
      var tmp_1;
      try {
        tmp_1 = createKType(PrimitiveClasses_getInstance().vb(), arrayOf([]), false);
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
    this.f2b_1 = name;
    this.g2b_1 = type;
    // Inline function 'kotlin.text.isNotBlank' call
    var this_0 = this.f2b_1;
    // Inline function 'kotlin.require' call
    if (!!isBlank(this_0)) {
      var message = "Name can't be blank";
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
  }
  protoOf(AttributeKey).toString = function () {
    return 'AttributeKey: ' + this.f2b_1;
  };
  protoOf(AttributeKey).hashCode = function () {
    var result = getStringHashCode(this.f2b_1);
    result = imul(result, 31) + this.g2b_1.hashCode() | 0;
    return result;
  };
  protoOf(AttributeKey).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof AttributeKey))
      return false;
    var tmp0_other_with_cast = other instanceof AttributeKey ? other : THROW_CCE();
    if (!(this.f2b_1 === tmp0_other_with_cast.f2b_1))
      return false;
    if (!this.g2b_1.equals(tmp0_other_with_cast.g2b_1))
      return false;
    return true;
  };
  function Attributes() {
  }
  function putAll(_this__u8e3s4, other) {
    // Inline function 'kotlin.collections.forEach' call
    var _iterator__ex2g4s = other.n2b().j();
    while (_iterator__ex2g4s.k()) {
      var element = _iterator__ex2g4s.l();
      _this__u8e3s4.k2b(element instanceof AttributeKey ? element : THROW_CCE(), other.h2b(element));
    }
  }
  function CaseInsensitiveMap$_get_keys_$lambda_ptzlqj($this$DelegatingMutableSet) {
    return $this$DelegatingMutableSet.o2b_1;
  }
  function CaseInsensitiveMap$_get_keys_$lambda_ptzlqj_0($this$DelegatingMutableSet) {
    return caseInsensitive($this$DelegatingMutableSet);
  }
  function CaseInsensitiveMap$_get_entries_$lambda_r32w19($this$DelegatingMutableSet) {
    return new Entry_0($this$DelegatingMutableSet.v().o2b_1, $this$DelegatingMutableSet.w());
  }
  function CaseInsensitiveMap$_get_entries_$lambda_r32w19_0($this$DelegatingMutableSet) {
    return new Entry_0(caseInsensitive($this$DelegatingMutableSet.v()), $this$DelegatingMutableSet.w());
  }
  function CaseInsensitiveMap() {
    var tmp = this;
    // Inline function 'kotlin.collections.mutableMapOf' call
    tmp.q2b_1 = LinkedHashMap_init_$Create$();
  }
  protoOf(CaseInsensitiveMap).m = function () {
    return this.q2b_1.m();
  };
  protoOf(CaseInsensitiveMap).r2b = function (key) {
    return this.q2b_1.h2(new CaseInsensitiveString(key));
  };
  protoOf(CaseInsensitiveMap).h2 = function (key) {
    if (!(!(key == null) ? typeof key === 'string' : false))
      return false;
    return this.r2b((!(key == null) ? typeof key === 'string' : false) ? key : THROW_CCE());
  };
  protoOf(CaseInsensitiveMap).de = function (key) {
    return this.q2b_1.j2(caseInsensitive(key));
  };
  protoOf(CaseInsensitiveMap).j2 = function (key) {
    if (!(!(key == null) ? typeof key === 'string' : false))
      return null;
    return this.de((!(key == null) ? typeof key === 'string' : false) ? key : THROW_CCE());
  };
  protoOf(CaseInsensitiveMap).p = function () {
    return this.q2b_1.p();
  };
  protoOf(CaseInsensitiveMap).d2 = function () {
    this.q2b_1.d2();
  };
  protoOf(CaseInsensitiveMap).s2b = function (key, value) {
    return this.q2b_1.m2(caseInsensitive(key), value);
  };
  protoOf(CaseInsensitiveMap).m2 = function (key, value) {
    var tmp = (!(key == null) ? typeof key === 'string' : false) ? key : THROW_CCE();
    return this.s2b(tmp, !(value == null) ? value : THROW_CCE());
  };
  protoOf(CaseInsensitiveMap).t2b = function (from) {
    // Inline function 'kotlin.collections.forEach' call
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s = from.u().j();
    while (_iterator__ex2g4s.k()) {
      var element = _iterator__ex2g4s.l();
      // Inline function 'kotlin.collections.component1' call
      var key = element.v();
      // Inline function 'kotlin.collections.component2' call
      var value = element.w();
      this.s2b(key, value);
    }
  };
  protoOf(CaseInsensitiveMap).o2 = function (from) {
    return this.t2b(from);
  };
  protoOf(CaseInsensitiveMap).u2b = function (key) {
    return this.q2b_1.n2(caseInsensitive(key));
  };
  protoOf(CaseInsensitiveMap).n2 = function (key) {
    if (!(!(key == null) ? typeof key === 'string' : false))
      return null;
    return this.u2b((!(key == null) ? typeof key === 'string' : false) ? key : THROW_CCE());
  };
  protoOf(CaseInsensitiveMap).k2 = function () {
    var tmp = this.q2b_1.k2();
    var tmp_0 = CaseInsensitiveMap$_get_keys_$lambda_ptzlqj;
    return new DelegatingMutableSet(tmp, tmp_0, CaseInsensitiveMap$_get_keys_$lambda_ptzlqj_0);
  };
  protoOf(CaseInsensitiveMap).u = function () {
    var tmp = this.q2b_1.u();
    var tmp_0 = CaseInsensitiveMap$_get_entries_$lambda_r32w19;
    return new DelegatingMutableSet(tmp, tmp_0, CaseInsensitiveMap$_get_entries_$lambda_r32w19_0);
  };
  protoOf(CaseInsensitiveMap).l2 = function () {
    return this.q2b_1.l2();
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
    return equals(other.q2b_1, this.q2b_1);
  };
  protoOf(CaseInsensitiveMap).hashCode = function () {
    return hashCode(this.q2b_1);
  };
  function Entry_0(key, value) {
    this.v2b_1 = key;
    this.w2b_1 = value;
  }
  protoOf(Entry_0).v = function () {
    return this.v2b_1;
  };
  protoOf(Entry_0).w = function () {
    return this.w2b_1;
  };
  protoOf(Entry_0).hashCode = function () {
    return (527 + hashCode(ensureNotNull(this.v2b_1)) | 0) + hashCode(ensureNotNull(this.w2b_1)) | 0;
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
    return equals(other.v(), this.v2b_1) && equals(other.w(), this.w2b_1);
  };
  protoOf(Entry_0).toString = function () {
    return toString_0(this.v2b_1) + '=' + toString_0(this.w2b_1);
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
    return tmp.ci(tmp$ret$0);
  }
  function SilentSupervisor$$inlined$CoroutineExceptionHandler$1() {
    AbstractCoroutineContextElement.call(this, Key_instance);
  }
  protoOf(SilentSupervisor$$inlined$CoroutineExceptionHandler$1).qv = function (context, exception) {
    return Unit_instance;
  };
  function DelegatingMutableSet$iterator$1(this$0) {
    this.z2b_1 = this$0;
    this.y2b_1 = this$0.a2c_1.j();
  }
  protoOf(DelegatingMutableSet$iterator$1).k = function () {
    return this.y2b_1.k();
  };
  protoOf(DelegatingMutableSet$iterator$1).l = function () {
    return this.z2b_1.b2c_1(this.y2b_1.l());
  };
  protoOf(DelegatingMutableSet$iterator$1).g4 = function () {
    return this.y2b_1.g4();
  };
  function DelegatingMutableSet(delegate, convertTo, convert) {
    this.a2c_1 = delegate;
    this.b2c_1 = convertTo;
    this.c2c_1 = convert;
    this.d2c_1 = this.a2c_1.m();
  }
  protoOf(DelegatingMutableSet).e2c = function (_this__u8e3s4) {
    // Inline function 'kotlin.collections.map' call
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$(collectionSizeOrDefault(_this__u8e3s4, 10));
    var _iterator__ex2g4s = _this__u8e3s4.j();
    while (_iterator__ex2g4s.k()) {
      var item = _iterator__ex2g4s.l();
      var tmp$ret$0 = this.c2c_1(item);
      destination.e(tmp$ret$0);
    }
    return destination;
  };
  protoOf(DelegatingMutableSet).f2c = function (_this__u8e3s4) {
    // Inline function 'kotlin.collections.map' call
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$(collectionSizeOrDefault(_this__u8e3s4, 10));
    var _iterator__ex2g4s = _this__u8e3s4.j();
    while (_iterator__ex2g4s.k()) {
      var item = _iterator__ex2g4s.l();
      var tmp$ret$0 = this.b2c_1(item);
      destination.e(tmp$ret$0);
    }
    return destination;
  };
  protoOf(DelegatingMutableSet).m = function () {
    return this.d2c_1;
  };
  protoOf(DelegatingMutableSet).g2c = function (element) {
    return this.a2c_1.e(this.c2c_1(element));
  };
  protoOf(DelegatingMutableSet).e = function (element) {
    return this.g2c((element == null ? true : !(element == null)) ? element : THROW_CCE());
  };
  protoOf(DelegatingMutableSet).h2c = function (elements) {
    return this.a2c_1.n(this.e2c(elements));
  };
  protoOf(DelegatingMutableSet).n = function (elements) {
    return this.h2c(elements);
  };
  protoOf(DelegatingMutableSet).d2 = function () {
    this.a2c_1.d2();
  };
  protoOf(DelegatingMutableSet).i2c = function (element) {
    return this.a2c_1.c2(this.c2c_1(element));
  };
  protoOf(DelegatingMutableSet).c2 = function (element) {
    if (!(element == null ? true : !(element == null)))
      return false;
    return this.i2c((element == null ? true : !(element == null)) ? element : THROW_CCE());
  };
  protoOf(DelegatingMutableSet).j2c = function (element) {
    return this.a2c_1.r(this.c2c_1(element));
  };
  protoOf(DelegatingMutableSet).r = function (element) {
    if (!(element == null ? true : !(element == null)))
      return false;
    return this.j2c((element == null ? true : !(element == null)) ? element : THROW_CCE());
  };
  protoOf(DelegatingMutableSet).k2c = function (elements) {
    return this.a2c_1.a2(this.e2c(elements));
  };
  protoOf(DelegatingMutableSet).a2 = function (elements) {
    return this.k2c(elements);
  };
  protoOf(DelegatingMutableSet).p = function () {
    return this.a2c_1.p();
  };
  protoOf(DelegatingMutableSet).j = function () {
    return new DelegatingMutableSet$iterator$1(this);
  };
  protoOf(DelegatingMutableSet).hashCode = function () {
    return hashCode(this.a2c_1);
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
    var elements = this.f2c(this.a2c_1);
    var tmp_0;
    if (other.a2(elements)) {
      // Inline function 'kotlin.collections.containsAll' call
      tmp_0 = elements.a2(other);
    } else {
      tmp_0 = false;
    }
    return tmp_0;
  };
  protoOf(DelegatingMutableSet).toString = function () {
    return toString(this.f2c(this.a2c_1));
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
    this.l2c_1 = jsPlatform;
  }
  protoOf(Js).toString = function () {
    return 'Js(jsPlatform=' + this.l2c_1.toString() + ')';
  };
  protoOf(Js).hashCode = function () {
    return this.l2c_1.hashCode();
  };
  protoOf(Js).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Js))
      return false;
    var tmp0_other_with_cast = other instanceof Js ? other : THROW_CCE();
    if (!this.l2c_1.equals(tmp0_other_with_cast.l2c_1))
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
      tmp_0 = platform.l2c_1.equals(JsPlatform_Browser_getInstance());
    } else {
      if (platform instanceof WasmJs) {
        tmp_0 = platform.m2c_1.equals(JsPlatform_Browser_getInstance());
      } else {
        tmp_0 = false;
      }
    }
    tmp.n2c_1 = tmp_0;
    var tmp_1 = this;
    var platform_0 = get_platform(this);
    var tmp_2;
    if (platform_0 instanceof Js) {
      tmp_2 = platform_0.l2c_1.equals(JsPlatform_Node_getInstance());
    } else {
      if (platform_0 instanceof WasmJs) {
        tmp_2 = platform_0.m2c_1.equals(JsPlatform_Node_getInstance());
      } else {
        tmp_2 = false;
      }
    }
    tmp_1.o2c_1 = tmp_2;
    var tmp_3 = this;
    var tmp_4 = get_platform(this);
    tmp_3.p2c_1 = tmp_4 instanceof Js;
    var tmp_5 = this;
    var tmp_6 = get_platform(this);
    tmp_5.q2c_1 = tmp_6 instanceof WasmJs;
    this.r2c_1 = equals(get_platform(this), Jvm_getInstance());
    this.s2c_1 = equals(get_platform(this), Native_getInstance());
    this.t2c_1 = get_isDevelopmentMode(this);
    this.u2c_1 = get_isNewMemoryModel(this);
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
    var tmp0_elvis_lhs = $this.b2d_1.j2(name);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      // Inline function 'kotlin.collections.mutableListOf' call
      // Inline function 'kotlin.also' call
      var this_0 = ArrayList_init_$Create$_0();
      $this.c2d(name);
      // Inline function 'kotlin.collections.set' call
      $this.b2d_1.m2(name, this_0);
      tmp = this_0;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function StringValuesBuilderImpl$appendAll$lambda(this$0) {
    return function (name, values) {
      this$0.d2d(name, values);
      return Unit_instance;
    };
  }
  function StringValuesBuilderImpl(caseInsensitiveName, size) {
    caseInsensitiveName = caseInsensitiveName === VOID ? false : caseInsensitiveName;
    size = size === VOID ? 8 : size;
    this.a2d_1 = caseInsensitiveName;
    this.b2d_1 = this.a2d_1 ? caseInsensitiveMap() : LinkedHashMap_init_$Create$_0(size);
  }
  protoOf(StringValuesBuilderImpl).v2c = function () {
    return this.a2d_1;
  };
  protoOf(StringValuesBuilderImpl).w2c = function (name) {
    return this.b2d_1.j2(name);
  };
  protoOf(StringValuesBuilderImpl).x2c = function () {
    return this.b2d_1.k2();
  };
  protoOf(StringValuesBuilderImpl).p = function () {
    return this.b2d_1.p();
  };
  protoOf(StringValuesBuilderImpl).y2c = function () {
    return unmodifiable(this.b2d_1.u());
  };
  protoOf(StringValuesBuilderImpl).e2d = function (name, value) {
    this.f2d(value);
    var list = ensureListForKey(this, name);
    list.d2();
    list.e(value);
  };
  protoOf(StringValuesBuilderImpl).de = function (name) {
    var tmp0_safe_receiver = this.w2c(name);
    return tmp0_safe_receiver == null ? null : firstOrNull(tmp0_safe_receiver);
  };
  protoOf(StringValuesBuilderImpl).g2d = function (name, value) {
    this.f2d(value);
    ensureListForKey(this, name).e(value);
  };
  protoOf(StringValuesBuilderImpl).h2d = function (stringValues) {
    stringValues.z2c(StringValuesBuilderImpl$appendAll$lambda(this));
  };
  protoOf(StringValuesBuilderImpl).d2d = function (name, values) {
    // Inline function 'kotlin.let' call
    var list = ensureListForKey(this, name);
    // Inline function 'kotlin.collections.forEach' call
    var _iterator__ex2g4s = values.j();
    while (_iterator__ex2g4s.k()) {
      var element = _iterator__ex2g4s.l();
      this.f2d(element);
    }
    addAll(list, values);
  };
  protoOf(StringValuesBuilderImpl).i2d = function (name) {
    this.b2d_1.n2(name);
  };
  protoOf(StringValuesBuilderImpl).d2 = function () {
    this.b2d_1.d2();
  };
  protoOf(StringValuesBuilderImpl).c2d = function (name) {
  };
  protoOf(StringValuesBuilderImpl).f2d = function (value) {
  };
  function listForKey($this, name) {
    return $this.k2d_1.j2(name);
  }
  function StringValuesImpl(caseInsensitiveName, values) {
    caseInsensitiveName = caseInsensitiveName === VOID ? false : caseInsensitiveName;
    values = values === VOID ? emptyMap() : values;
    this.j2d_1 = caseInsensitiveName;
    var tmp;
    if (this.j2d_1) {
      tmp = caseInsensitiveMap();
    } else {
      // Inline function 'kotlin.collections.mutableMapOf' call
      tmp = LinkedHashMap_init_$Create$();
    }
    var newMap = tmp;
    // Inline function 'kotlin.collections.forEach' call
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s = values.u().j();
    while (_iterator__ex2g4s.k()) {
      var element = _iterator__ex2g4s.l();
      // Inline function 'kotlin.collections.component1' call
      var key = element.v();
      // Inline function 'kotlin.collections.component2' call
      var value = element.w();
      // Inline function 'kotlin.collections.List' call
      // Inline function 'kotlin.collections.MutableList' call
      var size = value.m();
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
      newMap.m2(key, list);
    }
    this.k2d_1 = newMap;
  }
  protoOf(StringValuesImpl).v2c = function () {
    return this.j2d_1;
  };
  protoOf(StringValuesImpl).de = function (name) {
    var tmp0_safe_receiver = listForKey(this, name);
    return tmp0_safe_receiver == null ? null : firstOrNull(tmp0_safe_receiver);
  };
  protoOf(StringValuesImpl).w2c = function (name) {
    return listForKey(this, name);
  };
  protoOf(StringValuesImpl).x2c = function () {
    return unmodifiable(this.k2d_1.k2());
  };
  protoOf(StringValuesImpl).p = function () {
    return this.k2d_1.p();
  };
  protoOf(StringValuesImpl).y2c = function () {
    return unmodifiable(this.k2d_1.u());
  };
  protoOf(StringValuesImpl).z2c = function (body) {
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s = this.k2d_1.u().j();
    while (_iterator__ex2g4s.k()) {
      var _destruct__k2r9zo = _iterator__ex2g4s.l();
      // Inline function 'kotlin.collections.component1' call
      var key = _destruct__k2r9zo.v();
      // Inline function 'kotlin.collections.component2' call
      var value = _destruct__k2r9zo.w();
      body(key, value);
    }
  };
  protoOf(StringValuesImpl).toString = function () {
    return 'StringValues(case=' + !this.j2d_1 + ') ' + toString(this.y2c());
  };
  protoOf(StringValuesImpl).equals = function (other) {
    if (this === other)
      return true;
    if (!(!(other == null) ? isInterface(other, StringValues) : false))
      return false;
    if (!(this.j2d_1 === other.v2c()))
      return false;
    return entriesEquals(this.y2c(), other.y2c());
  };
  protoOf(StringValuesImpl).hashCode = function () {
    return entriesHashCode(this.y2c(), imul(31, getBooleanHashCode(this.j2d_1)));
  };
  function appendAll(_this__u8e3s4, builder) {
    // Inline function 'kotlin.apply' call
    // Inline function 'kotlin.collections.forEach' call
    var _iterator__ex2g4s = builder.y2c().j();
    while (_iterator__ex2g4s.k()) {
      var element = _iterator__ex2g4s.l();
      // Inline function 'kotlin.collections.component1' call
      var name = element.v();
      // Inline function 'kotlin.collections.component2' call
      var values = element.w();
      _this__u8e3s4.d2d(name, values);
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
    this_0.pc(original, 0, firstIndex);
    var inductionVariable_0 = firstIndex;
    var last_0 = get_lastIndex(original);
    if (inductionVariable_0 <= last_0)
      do {
        var index_0 = inductionVariable_0;
        inductionVariable_0 = inductionVariable_0 + 1 | 0;
        this_0.h8(toLowerCasePreservingASCII(charSequenceGet(original, index_0)));
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
    this.o2b_1 = content;
    var temp = 0;
    var indexedObject = this.o2b_1;
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
    this.p2b_1 = temp;
  }
  protoOf(CaseInsensitiveString).equals = function (other) {
    var tmp0_safe_receiver = other instanceof CaseInsensitiveString ? other : null;
    var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.o2b_1;
    return (tmp1_safe_receiver == null ? null : equals_0(tmp1_safe_receiver, this.o2b_1, true)) === true;
  };
  protoOf(CaseInsensitiveString).hashCode = function () {
    return this.p2b_1;
  };
  protoOf(CaseInsensitiveString).toString = function () {
    return this.o2b_1;
  };
  function caseInsensitive(_this__u8e3s4) {
    return new CaseInsensitiveString(_this__u8e3s4);
  }
  function CopyOnWriteHashMap() {
    this.l2d_1 = atomic$ref$1(emptyMap());
  }
  protoOf(CopyOnWriteHashMap).m2d = function (key) {
    return this.l2d_1.kotlinx$atomicfu$value.j2(key);
  };
  function Companion() {
    Companion_instance_0 = this;
    var tmp = this;
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    tmp.n2d_1 = [null, null, null, createSimpleEnumSerializer('io.ktor.util.date.WeekDay', values()), null, null, createSimpleEnumSerializer('io.ktor.util.date.Month', values_0()), null, null];
    this.o2d_1 = GMTDate_0(new Long(0, 0));
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
    tmp0_serialDesc.c21('seconds', false);
    tmp0_serialDesc.c21('minutes', false);
    tmp0_serialDesc.c21('hours', false);
    tmp0_serialDesc.c21('dayOfWeek', false);
    tmp0_serialDesc.c21('dayOfMonth', false);
    tmp0_serialDesc.c21('dayOfYear', false);
    tmp0_serialDesc.c21('month', false);
    tmp0_serialDesc.c21('year', false);
    tmp0_serialDesc.c21('timestamp', false);
    this.p2d_1 = tmp0_serialDesc;
  }
  protoOf($serializer).q2d = function (encoder, value) {
    var tmp0_desc = this.p2d_1;
    var tmp1_output = encoder.m1t(tmp0_desc);
    var tmp2_cached = Companion_getInstance().n2d_1;
    tmp1_output.w1u(tmp0_desc, 0, value.r2d_1);
    tmp1_output.w1u(tmp0_desc, 1, value.s2d_1);
    tmp1_output.w1u(tmp0_desc, 2, value.t2d_1);
    tmp1_output.d1v(tmp0_desc, 3, tmp2_cached[3], value.u2d_1);
    tmp1_output.w1u(tmp0_desc, 4, value.v2d_1);
    tmp1_output.w1u(tmp0_desc, 5, value.w2d_1);
    tmp1_output.d1v(tmp0_desc, 6, tmp2_cached[6], value.x2d_1);
    tmp1_output.w1u(tmp0_desc, 7, value.y2d_1);
    tmp1_output.x1u(tmp0_desc, 8, value.z2d_1);
    tmp1_output.n1t(tmp0_desc);
  };
  protoOf($serializer).e1q = function (encoder, value) {
    return this.q2d(encoder, value instanceof GMTDate ? value : THROW_CCE());
  };
  protoOf($serializer).f1q = function (decoder) {
    var tmp0_desc = this.p2d_1;
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
    var tmp13_input = decoder.m1t(tmp0_desc);
    var tmp14_cached = Companion_getInstance().n2d_1;
    if (tmp13_input.c1u()) {
      tmp4_local0 = tmp13_input.r1t(tmp0_desc, 0);
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
      tmp5_local1 = tmp13_input.r1t(tmp0_desc, 1);
      tmp3_bitMask0 = tmp3_bitMask0 | 2;
      tmp6_local2 = tmp13_input.r1t(tmp0_desc, 2);
      tmp3_bitMask0 = tmp3_bitMask0 | 4;
      tmp7_local3 = tmp13_input.y1t(tmp0_desc, 3, tmp14_cached[3], tmp7_local3);
      tmp3_bitMask0 = tmp3_bitMask0 | 8;
      tmp8_local4 = tmp13_input.r1t(tmp0_desc, 4);
      tmp3_bitMask0 = tmp3_bitMask0 | 16;
      tmp9_local5 = tmp13_input.r1t(tmp0_desc, 5);
      tmp3_bitMask0 = tmp3_bitMask0 | 32;
      tmp10_local6 = tmp13_input.y1t(tmp0_desc, 6, tmp14_cached[6], tmp10_local6);
      tmp3_bitMask0 = tmp3_bitMask0 | 64;
      tmp11_local7 = tmp13_input.r1t(tmp0_desc, 7);
      tmp3_bitMask0 = tmp3_bitMask0 | 128;
      tmp12_local8 = tmp13_input.s1t(tmp0_desc, 8);
      tmp3_bitMask0 = tmp3_bitMask0 | 256;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp13_input.d1u(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            tmp4_local0 = tmp13_input.r1t(tmp0_desc, 0);
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          case 1:
            tmp5_local1 = tmp13_input.r1t(tmp0_desc, 1);
            tmp3_bitMask0 = tmp3_bitMask0 | 2;
            break;
          case 2:
            tmp6_local2 = tmp13_input.r1t(tmp0_desc, 2);
            tmp3_bitMask0 = tmp3_bitMask0 | 4;
            break;
          case 3:
            tmp7_local3 = tmp13_input.y1t(tmp0_desc, 3, tmp14_cached[3], tmp7_local3);
            tmp3_bitMask0 = tmp3_bitMask0 | 8;
            break;
          case 4:
            tmp8_local4 = tmp13_input.r1t(tmp0_desc, 4);
            tmp3_bitMask0 = tmp3_bitMask0 | 16;
            break;
          case 5:
            tmp9_local5 = tmp13_input.r1t(tmp0_desc, 5);
            tmp3_bitMask0 = tmp3_bitMask0 | 32;
            break;
          case 6:
            tmp10_local6 = tmp13_input.y1t(tmp0_desc, 6, tmp14_cached[6], tmp10_local6);
            tmp3_bitMask0 = tmp3_bitMask0 | 64;
            break;
          case 7:
            tmp11_local7 = tmp13_input.r1t(tmp0_desc, 7);
            tmp3_bitMask0 = tmp3_bitMask0 | 128;
            break;
          case 8:
            tmp12_local8 = tmp13_input.s1t(tmp0_desc, 8);
            tmp3_bitMask0 = tmp3_bitMask0 | 256;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp13_input.n1t(tmp0_desc);
    return GMTDate_init_$Create$(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, tmp7_local3, tmp8_local4, tmp9_local5, tmp10_local6, tmp11_local7, tmp12_local8, null);
  };
  protoOf($serializer).d1q = function () {
    return this.p2d_1;
  };
  protoOf($serializer).r21 = function () {
    var tmp0_cached = Companion_getInstance().n2d_1;
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
      throwMissingFieldException(seen0, 511, $serializer_getInstance().p2d_1);
    }
    $this.r2d_1 = seconds;
    $this.s2d_1 = minutes;
    $this.t2d_1 = hours;
    $this.u2d_1 = dayOfWeek;
    $this.v2d_1 = dayOfMonth;
    $this.w2d_1 = dayOfYear;
    $this.x2d_1 = month;
    $this.y2d_1 = year;
    $this.z2d_1 = timestamp;
    return $this;
  }
  function GMTDate_init_$Create$(seen0, seconds, minutes, hours, dayOfWeek, dayOfMonth, dayOfYear, month, year, timestamp, serializationConstructorMarker) {
    return GMTDate_init_$Init$(seen0, seconds, minutes, hours, dayOfWeek, dayOfMonth, dayOfYear, month, year, timestamp, serializationConstructorMarker, objectCreate(protoOf(GMTDate)));
  }
  function GMTDate(seconds, minutes, hours, dayOfWeek, dayOfMonth, dayOfYear, month, year, timestamp) {
    Companion_getInstance();
    this.r2d_1 = seconds;
    this.s2d_1 = minutes;
    this.t2d_1 = hours;
    this.u2d_1 = dayOfWeek;
    this.v2d_1 = dayOfMonth;
    this.w2d_1 = dayOfYear;
    this.x2d_1 = month;
    this.y2d_1 = year;
    this.z2d_1 = timestamp;
  }
  protoOf(GMTDate).a2e = function (other) {
    return this.z2d_1.b1(other.z2d_1);
  };
  protoOf(GMTDate).d = function (other) {
    return this.a2e(other instanceof GMTDate ? other : THROW_CCE());
  };
  protoOf(GMTDate).toString = function () {
    return 'GMTDate(seconds=' + this.r2d_1 + ', minutes=' + this.s2d_1 + ', hours=' + this.t2d_1 + ', dayOfWeek=' + this.u2d_1.toString() + ', dayOfMonth=' + this.v2d_1 + ', dayOfYear=' + this.w2d_1 + ', month=' + this.x2d_1.toString() + ', year=' + this.y2d_1 + ', timestamp=' + this.z2d_1.toString() + ')';
  };
  protoOf(GMTDate).hashCode = function () {
    var result = this.r2d_1;
    result = imul(result, 31) + this.s2d_1 | 0;
    result = imul(result, 31) + this.t2d_1 | 0;
    result = imul(result, 31) + this.u2d_1.hashCode() | 0;
    result = imul(result, 31) + this.v2d_1 | 0;
    result = imul(result, 31) + this.w2d_1 | 0;
    result = imul(result, 31) + this.x2d_1.hashCode() | 0;
    result = imul(result, 31) + this.y2d_1 | 0;
    result = imul(result, 31) + this.z2d_1.hashCode() | 0;
    return result;
  };
  protoOf(GMTDate).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof GMTDate))
      return false;
    var tmp0_other_with_cast = other instanceof GMTDate ? other : THROW_CCE();
    if (!(this.r2d_1 === tmp0_other_with_cast.r2d_1))
      return false;
    if (!(this.s2d_1 === tmp0_other_with_cast.s2d_1))
      return false;
    if (!(this.t2d_1 === tmp0_other_with_cast.t2d_1))
      return false;
    if (!this.u2d_1.equals(tmp0_other_with_cast.u2d_1))
      return false;
    if (!(this.v2d_1 === tmp0_other_with_cast.v2d_1))
      return false;
    if (!(this.w2d_1 === tmp0_other_with_cast.w2d_1))
      return false;
    if (!this.x2d_1.equals(tmp0_other_with_cast.x2d_1))
      return false;
    if (!(this.y2d_1 === tmp0_other_with_cast.y2d_1))
      return false;
    if (!this.z2d_1.equals(tmp0_other_with_cast.z2d_1))
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
  protoOf(Companion_0).b2e = function (ordinal) {
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
    this.e2e_1 = value;
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
  protoOf(Companion_1).b2e = function (ordinal) {
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
    this.h2e_1 = value;
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
    this.i2e_1 = symbol;
  }
  protoOf(Symbol).toString = function () {
    return this.i2e_1;
  };
  function LockFreeLinkedListNode() {
  }
  protoOf(LockFreeLinkedListNode).v10 = function () {
    // Inline function 'kotlinx.atomicfu.loop' call
    var this_0 = this.j2e_1;
    while (true) {
      var next = this_0.kotlinx$atomicfu$value;
      if (!(next instanceof OpDescriptor))
        return next;
      next.k2e(this);
    }
  };
  protoOf(LockFreeLinkedListNode).l2e = function () {
    return unwrap(this.v10());
  };
  function Removed() {
  }
  function OpDescriptor() {
  }
  function unwrap(_this__u8e3s4) {
    _init_properties_LockFreeLinkedList_kt__wekxce();
    var tmp0_safe_receiver = _this__u8e3s4 instanceof Removed ? _this__u8e3s4 : null;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.m2e_1;
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
    tmp.d9_1 = Unit_instance;
    tmp.e9_1 = null;
    return tmp.j9();
  }
  function $proceedLoopCOROUTINE$0(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.v2e_1 = _this__u8e3s4;
  }
  protoOf($proceedLoopCOROUTINE$0).j9 = function () {
    var suspendResult = this.d9_1;
    $sm: do
      try {
        var tmp = this.b9_1;
        switch (tmp) {
          case 0:
            this.c9_1 = 6;
            this.b9_1 = 1;
            continue $sm;
          case 1:
            this.w2e_1 = this.v2e_1.d2f_1;
            if (this.w2e_1 === -1) {
              this.b9_1 = 5;
              continue $sm;
            } else {
              this.b9_1 = 2;
              continue $sm;
            }

          case 2:
            this.x2e_1 = this.v2e_1.a2f_1;
            if (this.w2e_1 >= this.x2e_1.m()) {
              this.v2e_1.e2f();
              this.b9_1 = 5;
              continue $sm;
            } else {
              this.b9_1 = 3;
              continue $sm;
            }

          case 3:
            this.y2e_1 = this.x2e_1.o(this.w2e_1);
            this.v2e_1.d2f_1 = this.w2e_1 + 1 | 0;
            this.b9_1 = 4;
            suspendResult = this.y2e_1(this.v2e_1, this.v2e_1.c2f_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 4:
            this.b9_1 = 1;
            continue $sm;
          case 5:
            return this.v2e_1.c2f_1;
          case 6:
            throw this.e9_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.c9_1 === 6) {
          throw e;
        } else {
          this.b9_1 = this.c9_1;
          this.e9_1 = e;
        }
      }
     while (true);
  };
  function DebugPipelineContext(context, interceptors, subject, coroutineContext) {
    PipelineContext.call(this, context);
    this.a2f_1 = interceptors;
    this.b2f_1 = coroutineContext;
    this.c2f_1 = subject;
    this.d2f_1 = 0;
  }
  protoOf(DebugPipelineContext).to = function () {
    return this.b2f_1;
  };
  protoOf(DebugPipelineContext).f2f = function () {
    return this.c2f_1;
  };
  protoOf(DebugPipelineContext).e2f = function () {
    this.d2f_1 = -1;
  };
  protoOf(DebugPipelineContext).g2f = function (subject, $completion) {
    this.c2f_1 = subject;
    return this.h2f($completion);
  };
  protoOf(DebugPipelineContext).h2f = function ($completion) {
    var index = this.d2f_1;
    if (index < 0)
      return this.c2f_1;
    if (index >= this.a2f_1.m()) {
      this.e2f();
      return this.c2f_1;
    }
    return proceedLoop(this, $completion);
  };
  protoOf(DebugPipelineContext).i2f = function (initial, $completion) {
    this.d2f_1 = 0;
    this.c2f_1 = initial;
    return this.h2f($completion);
  };
  function PhaseContent_init_$Init$(phase, relation, $this) {
    var tmp = Companion_getInstance_2().j2f_1;
    PhaseContent.call($this, phase, relation, isInterface(tmp, KtMutableList) ? tmp : THROW_CCE());
    // Inline function 'kotlin.check' call
    if (!Companion_getInstance_2().j2f_1.p()) {
      var message = 'The shared empty array list has been modified';
      throw IllegalStateException_init_$Create$(toString(message));
    }
    return $this;
  }
  function PhaseContent_init_$Create$(phase, relation) {
    return PhaseContent_init_$Init$(phase, relation, objectCreate(protoOf(PhaseContent)));
  }
  function copiedInterceptors($this) {
    return toMutableList($this.m2f_1);
  }
  function copyInterceptors($this) {
    $this.m2f_1 = copiedInterceptors($this);
    $this.n2f_1 = false;
  }
  function Companion_2() {
    Companion_instance_3 = this;
    var tmp = this;
    // Inline function 'kotlin.collections.mutableListOf' call
    tmp.j2f_1 = ArrayList_init_$Create$_0();
  }
  var Companion_instance_3;
  function Companion_getInstance_2() {
    if (Companion_instance_3 == null)
      new Companion_2();
    return Companion_instance_3;
  }
  function PhaseContent(phase, relation, interceptors) {
    Companion_getInstance_2();
    this.k2f_1 = phase;
    this.l2f_1 = relation;
    this.m2f_1 = interceptors;
    this.n2f_1 = true;
  }
  protoOf(PhaseContent).o2f = function () {
    return this.m2f_1.p();
  };
  protoOf(PhaseContent).m = function () {
    return this.m2f_1.m();
  };
  protoOf(PhaseContent).p2f = function (interceptor) {
    if (this.n2f_1) {
      copyInterceptors(this);
    }
    this.m2f_1.e(interceptor);
  };
  protoOf(PhaseContent).q2f = function (destination) {
    var interceptors = this.m2f_1;
    if (destination instanceof ArrayList) {
      destination.n5(destination.m() + interceptors.m() | 0);
    }
    var inductionVariable = 0;
    var last = interceptors.m();
    if (inductionVariable < last)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        destination.e(interceptors.o(index));
      }
       while (inductionVariable < last);
  };
  protoOf(PhaseContent).r2f = function () {
    this.n2f_1 = true;
    return this.m2f_1;
  };
  protoOf(PhaseContent).toString = function () {
    return 'Phase `' + this.k2f_1.s2f_1 + '`, ' + this.m() + ' handlers';
  };
  function _set_interceptors__wod97b($this, _set____db54di) {
    var tmp0 = $this.x2f_1;
    // Inline function 'kotlinx.atomicfu.AtomicRef.setValue' call
    interceptors$factory();
    tmp0.kotlinx$atomicfu$value = _set____db54di;
    return Unit_instance;
  }
  function _get_interceptors__h4min7($this) {
    var tmp0 = $this.x2f_1;
    // Inline function 'kotlinx.atomicfu.AtomicRef.getValue' call
    interceptors$factory_0();
    return tmp0.kotlinx$atomicfu$value;
  }
  function createContext($this, context, subject, coroutineContext) {
    return pipelineContextFor(context, sharedInterceptorsList($this), subject, coroutineContext, $this.a2g());
  }
  function findPhase($this, phase) {
    var phasesList = $this.v2f_1;
    var inductionVariable = 0;
    var last = phasesList.m();
    if (inductionVariable < last)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var current = phasesList.o(index);
        if (current === phase) {
          var content = PhaseContent_init_$Create$(phase, Last_getInstance());
          phasesList.e2(index, content);
          return content;
        }
        var tmp;
        if (current instanceof PhaseContent) {
          tmp = current.k2f_1 === phase;
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
    var phasesList = $this.v2f_1;
    var inductionVariable = 0;
    var last = phasesList.m();
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
            tmp_0 = current.k2f_1 === phase;
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
    var phasesList = $this.v2f_1;
    var inductionVariable = 0;
    var last = phasesList.m();
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
            tmp_0 = current.k2f_1 === phase;
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
    var interceptorsQuantity = $this.w2f_1;
    if (interceptorsQuantity === 0) {
      notSharedInterceptorsList($this, emptyList());
      return emptyList();
    }
    var phases = $this.v2f_1;
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
          if (phaseContent.o2f())
            continue $l$loop_0;
          var interceptors = phaseContent.r2f();
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
        phase.q2f(destination);
      }
       while (!(phaseIndex_0 === last_0));
    notSharedInterceptorsList($this, destination);
    return destination;
  }
  function sharedInterceptorsList($this) {
    if (_get_interceptors__h4min7($this) == null) {
      cacheInterceptors($this);
    }
    $this.y2f_1 = true;
    return ensureNotNull(_get_interceptors__h4min7($this));
  }
  function resetInterceptorsList($this) {
    _set_interceptors__wod97b($this, null);
    $this.y2f_1 = false;
    $this.z2f_1 = null;
  }
  function notSharedInterceptorsList($this, list) {
    _set_interceptors__wod97b($this, list);
    $this.y2f_1 = false;
    $this.z2f_1 = null;
  }
  function setInterceptorsListFromPhase($this, phaseContent) {
    _set_interceptors__wod97b($this, phaseContent.r2f());
    $this.y2f_1 = false;
    $this.z2f_1 = phaseContent.k2f_1;
  }
  function tryAddToPhaseFastPath($this, phase, block) {
    var currentInterceptors = _get_interceptors__h4min7($this);
    if ($this.v2f_1.p() || currentInterceptors == null) {
      return false;
    }
    var tmp;
    if ($this.y2f_1) {
      tmp = true;
    } else {
      tmp = !(!(currentInterceptors == null) ? isInterface(currentInterceptors, KtMutableList) : false);
    }
    if (tmp) {
      return false;
    }
    if (equals($this.z2f_1, phase)) {
      currentInterceptors.e(block);
      return true;
    }
    if (equals(phase, last($this.v2f_1)) || findPhaseIndex($this, phase) === get_lastIndex_0($this.v2f_1)) {
      ensureNotNull(findPhase($this, phase)).p2f(block);
      currentInterceptors.e(block);
      return true;
    }
    return false;
  }
  function Pipeline(phases) {
    this.t2f_1 = AttributesJsFn(true);
    this.u2f_1 = false;
    this.v2f_1 = mutableListOf(phases.slice());
    this.w2f_1 = 0;
    this.x2f_1 = atomic$ref$1(null);
    this.y2f_1 = false;
    this.z2f_1 = null;
  }
  protoOf(Pipeline).a2g = function () {
    return this.u2f_1;
  };
  protoOf(Pipeline).b2g = function (context, subject, $completion) {
    // Inline function 'kotlin.js.getCoroutineContext' call
    var tmp$ret$0 = $completion.h9();
    return createContext(this, context, subject, tmp$ret$0).i2f(subject, $completion);
  };
  protoOf(Pipeline).d2g = function (reference, phase) {
    if (hasPhase(this, phase))
      return Unit_instance;
    var index = findPhaseIndex(this, reference);
    if (index === -1) {
      throw new InvalidPhaseException('Phase ' + reference.toString() + ' was not registered for this pipeline');
    }
    var lastRelatedPhaseIndex = index;
    var inductionVariable = index + 1 | 0;
    var last = get_lastIndex_0(this.v2f_1);
    if (inductionVariable <= last)
      $l$loop_0: do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var tmp = this.v2f_1.o(i);
        var tmp0_safe_receiver = tmp instanceof PhaseContent ? tmp : null;
        var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.l2f_1;
        var tmp_0;
        if (tmp1_elvis_lhs == null) {
          break $l$loop_0;
        } else {
          tmp_0 = tmp1_elvis_lhs;
        }
        var relation = tmp_0;
        var tmp2_safe_receiver = relation instanceof After ? relation : null;
        var tmp3_elvis_lhs = tmp2_safe_receiver == null ? null : tmp2_safe_receiver.e2g_1;
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
    this.v2f_1.f2(lastRelatedPhaseIndex + 1 | 0, PhaseContent_init_$Create$(phase, new After(reference)));
  };
  protoOf(Pipeline).f2g = function (reference, phase) {
    if (hasPhase(this, phase))
      return Unit_instance;
    var index = findPhaseIndex(this, reference);
    if (index === -1) {
      throw new InvalidPhaseException('Phase ' + reference.toString() + ' was not registered for this pipeline');
    }
    this.v2f_1.f2(index, PhaseContent_init_$Create$(phase, new Before(reference)));
  };
  protoOf(Pipeline).g2g = function (phase, block) {
    var tmp0_elvis_lhs = findPhase(this, phase);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throw new InvalidPhaseException('Phase ' + phase.toString() + ' was not registered for this pipeline');
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var phaseContent = tmp;
    if (tryAddToPhaseFastPath(this, phase, block)) {
      this.w2f_1 = this.w2f_1 + 1 | 0;
      return Unit_instance;
    }
    phaseContent.p2f(block);
    this.w2f_1 = this.w2f_1 + 1 | 0;
    resetInterceptorsList(this);
    this.h2g();
  };
  protoOf(Pipeline).h2g = function () {
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
    this.c2g_1 = context;
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
    this.s2f_1 = name;
  }
  protoOf(PipelinePhase).toString = function () {
    return "Phase('" + this.s2f_1 + "')";
  };
  function InvalidPhaseException(message) {
    extendThrowable(this, message);
    captureStack(this, InvalidPhaseException);
  }
  function After(relativeTo) {
    PipelinePhaseRelation.call(this);
    this.e2g_1 = relativeTo;
  }
  function Before(relativeTo) {
    PipelinePhaseRelation.call(this);
    this.i2g_1 = relativeTo;
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
      var currentIndex = $this.p2g_1;
      if (currentIndex === $this.k2g_1.m()) {
        if (!direct) {
          // Inline function 'kotlin.Companion.success' call
          var value = $this.m2g_1;
          var tmp$ret$0 = _Result___init__impl__xyqfz8(value);
          resumeRootWith($this, tmp$ret$0);
          return false;
        }
        return true;
      }
      $this.p2g_1 = currentIndex + 1 | 0;
      var next = $this.k2g_1.o(currentIndex);
      try {
        var result = pipelineStartCoroutineUninterceptedOrReturn(next, $this, $this.m2g_1, $this.l2g_1);
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
    if ($this.o2g_1 < 0) {
      // Inline function 'kotlin.error' call
      var message = 'No more continuations to resume';
      throw IllegalStateException_init_$Create$(toString(message));
    }
    var next = ensureNotNull($this.n2g_1[$this.o2g_1]);
    var _unary__edvuaz = $this.o2g_1;
    $this.o2g_1 = _unary__edvuaz - 1 | 0;
    $this.n2g_1[_unary__edvuaz] = null;
    if (!_Result___get_isFailure__impl__jpiriv(result)) {
      next.m9(result);
    } else {
      var exception = recoverStackTraceBridge(ensureNotNull(Result__exceptionOrNull_impl_p6xea9(result)), next);
      // Inline function 'kotlin.coroutines.resumeWithException' call
      // Inline function 'kotlin.Companion.failure' call
      var tmp$ret$0 = _Result___init__impl__xyqfz8(createFailure(exception));
      next.m9(tmp$ret$0);
    }
  }
  function discardLastRootContinuation($this) {
    if ($this.o2g_1 < 0)
      throw IllegalStateException_init_$Create$('No more continuations to resume');
    var _unary__edvuaz = $this.o2g_1;
    $this.o2g_1 = _unary__edvuaz - 1 | 0;
    $this.n2g_1[_unary__edvuaz] = null;
  }
  function SuspendFunctionGun$continuation$1(this$0) {
    this.r2g_1 = this$0;
    this.q2g_1 = -2147483648;
  }
  protoOf(SuspendFunctionGun$continuation$1).h9 = function () {
    var continuation = this.r2g_1.n2g_1[this.r2g_1.o2g_1];
    if (!(continuation === this) && !(continuation == null))
      return continuation.h9();
    var index = this.r2g_1.o2g_1 - 1 | 0;
    while (index >= 0) {
      var _unary__edvuaz = index;
      index = _unary__edvuaz - 1 | 0;
      var cont = this.r2g_1.n2g_1[_unary__edvuaz];
      if (!(cont === this) && !(cont == null))
        return cont.h9();
    }
    // Inline function 'kotlin.error' call
    var message = 'Not started';
    throw IllegalStateException_init_$Create$(toString(message));
  };
  protoOf(SuspendFunctionGun$continuation$1).s2g = function (result) {
    if (_Result___get_isFailure__impl__jpiriv(result)) {
      // Inline function 'kotlin.Companion.failure' call
      var exception = ensureNotNull(Result__exceptionOrNull_impl_p6xea9(result));
      var tmp$ret$0 = _Result___init__impl__xyqfz8(createFailure(exception));
      resumeRootWith(this.r2g_1, tmp$ret$0);
      return Unit_instance;
    }
    loop(this.r2g_1, false);
  };
  protoOf(SuspendFunctionGun$continuation$1).m9 = function (result) {
    return this.s2g(result);
  };
  function SuspendFunctionGun(initial, context, blocks) {
    PipelineContext.call(this, context);
    this.k2g_1 = blocks;
    var tmp = this;
    tmp.l2g_1 = new SuspendFunctionGun$continuation$1(this);
    this.m2g_1 = initial;
    var tmp_0 = this;
    // Inline function 'kotlin.arrayOfNulls' call
    var size = this.k2g_1.m();
    tmp_0.n2g_1 = Array(size);
    this.o2g_1 = -1;
    this.p2g_1 = 0;
  }
  protoOf(SuspendFunctionGun).to = function () {
    return this.l2g_1.h9();
  };
  protoOf(SuspendFunctionGun).f2f = function () {
    return this.m2g_1;
  };
  protoOf(SuspendFunctionGun).h2f = function ($completion) {
    var tmp$ret$0;
    $l$block_0: {
      if (this.p2g_1 === this.k2g_1.m()) {
        tmp$ret$0 = this.m2g_1;
        break $l$block_0;
      }
      this.t2g(intercepted($completion));
      if (loop(this, true)) {
        discardLastRootContinuation(this);
        tmp$ret$0 = this.m2g_1;
        break $l$block_0;
      }
      tmp$ret$0 = get_COROUTINE_SUSPENDED();
    }
    return tmp$ret$0;
  };
  protoOf(SuspendFunctionGun).g2f = function (subject, $completion) {
    this.m2g_1 = subject;
    return this.h2f($completion);
  };
  protoOf(SuspendFunctionGun).i2f = function (initial, $completion) {
    this.p2g_1 = 0;
    if (this.p2g_1 === this.k2g_1.m())
      return initial;
    this.m2g_1 = initial;
    if (this.o2g_1 >= 0)
      throw IllegalStateException_init_$Create$('Already started');
    return this.h2f($completion);
  };
  protoOf(SuspendFunctionGun).t2g = function (continuation) {
    this.o2g_1 = this.o2g_1 + 1 | 0;
    this.n2g_1[this.o2g_1] = continuation;
  };
  function TypeInfo(type, kotlinType) {
    kotlinType = kotlinType === VOID ? null : kotlinType;
    this.u2g_1 = type;
    this.v2g_1 = kotlinType;
  }
  protoOf(TypeInfo).hashCode = function () {
    var tmp0_safe_receiver = this.v2g_1;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : hashCode(tmp0_safe_receiver);
    return tmp1_elvis_lhs == null ? this.u2g_1.hashCode() : tmp1_elvis_lhs;
  };
  protoOf(TypeInfo).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof TypeInfo))
      return false;
    var tmp;
    if (!(this.v2g_1 == null) || !(other.v2g_1 == null)) {
      tmp = equals(this.v2g_1, other.v2g_1);
    } else {
      tmp = this.u2g_1.equals(other.u2g_1);
    }
    return tmp;
  };
  protoOf(TypeInfo).toString = function () {
    var tmp0_elvis_lhs = this.v2g_1;
    return 'TypeInfo(' + toString(tmp0_elvis_lhs == null ? this.u2g_1 : tmp0_elvis_lhs) + ')';
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
    var tmp1_safe_receiver = timestamp == null ? null : timestamp.n3();
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
    var dayOfWeek = Companion_instance_1.b2e((date.getUTCDay() + 6 | 0) % 7 | 0);
    var month = Companion_instance_2.b2e(date.getUTCMonth());
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
    tmp.w2g_1 = LinkedHashMap_init_$Create$();
  }
  protoOf(AttributesJs).i2b = function (key) {
    var tmp = this.w2g_1.j2(key);
    return (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
  };
  protoOf(AttributesJs).j2b = function (key) {
    return this.w2g_1.h2(key);
  };
  protoOf(AttributesJs).k2b = function (key, value) {
    // Inline function 'kotlin.collections.set' call
    this.w2g_1.m2(key, value);
  };
  protoOf(AttributesJs).l2b = function (key) {
    this.w2g_1.n2(key);
  };
  protoOf(AttributesJs).m2b = function (key, block) {
    var tmp0_safe_receiver = this.w2g_1.j2(key);
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      return !(tmp0_safe_receiver == null) ? tmp0_safe_receiver : THROW_CCE();
    }
    // Inline function 'kotlin.also' call
    var this_0 = block();
    // Inline function 'kotlin.collections.set' call
    this.w2g_1.m2(key, this_0);
    return this_0;
  };
  protoOf(AttributesJs).n2b = function () {
    return toList(this.w2g_1.k2());
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
    switch (PlatformUtils_getInstance().o2c_1 || PlatformUtils_getInstance().n2c_1) {
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
            var _iterator__ex2g4s = tmp0.j();
            while (_iterator__ex2g4s.k()) {
              var element = _iterator__ex2g4s.l();
              if (element.p2_1 === tmp1_safe_receiver) {
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
    tmp.x2g_1 = tmp_0;
  }
  protoOf(KtorSimpleLogger$1).y2g = function (message) {
    if (this.x2g_1.r2(LogLevel_TRACE_getInstance()) > 0)
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
    return type.ab(_this__u8e3s4);
  }
  //region block: post-declaration
  protoOf($serializer).s21 = typeParametersSerializers;
  protoOf(AttributesJs).h2b = get;
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
