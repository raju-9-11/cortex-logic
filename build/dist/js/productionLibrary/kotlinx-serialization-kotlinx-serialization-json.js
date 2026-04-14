(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlinx-serialization-kotlinx-serialization-core.js', './kotlin-kotlin-stdlib.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlinx-serialization-kotlinx-serialization-core.js'), require('./kotlin-kotlin-stdlib.js'));
  else {
    if (typeof globalThis['kotlinx-serialization-kotlinx-serialization-core'] === 'undefined') {
      throw new Error("Error loading module 'kotlinx-serialization-kotlinx-serialization-json'. Its dependency 'kotlinx-serialization-kotlinx-serialization-core' was not found. Please, check whether 'kotlinx-serialization-kotlinx-serialization-core' is loaded prior to 'kotlinx-serialization-kotlinx-serialization-json'.");
    }
    if (typeof globalThis['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'kotlinx-serialization-kotlinx-serialization-json'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'kotlinx-serialization-kotlinx-serialization-json'.");
    }
    globalThis['kotlinx-serialization-kotlinx-serialization-json'] = factory(typeof globalThis['kotlinx-serialization-kotlinx-serialization-json'] === 'undefined' ? {} : globalThis['kotlinx-serialization-kotlinx-serialization-json'], globalThis['kotlinx-serialization-kotlinx-serialization-core'], globalThis['kotlin-kotlin-stdlib']);
  }
}(function (_, kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core, kotlin_kotlin) {
  'use strict';
  //region block: imports
  var imul = Math.imul;
  var EmptySerializersModule = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.j2;
  var protoOf = kotlin_kotlin.$_$.ic;
  var initMetadataForObject = kotlin_kotlin.$_$.kb;
  var VOID = kotlin_kotlin.$_$.i;
  var Unit_instance = kotlin_kotlin.$_$.i5;
  var initMetadataForClass = kotlin_kotlin.$_$.eb;
  var toString = kotlin_kotlin.$_$.mc;
  var IllegalArgumentException_init_$Create$ = kotlin_kotlin.$_$.w1;
  var charSequenceLength = kotlin_kotlin.$_$.ta;
  var charSequenceGet = kotlin_kotlin.$_$.sa;
  var _Char___init__impl__6a9atx = kotlin_kotlin.$_$.q2;
  var equals = kotlin_kotlin.$_$.xa;
  var toString_0 = kotlin_kotlin.$_$.yh;
  var Enum = kotlin_kotlin.$_$.jg;
  var Decoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.r1;
  var CompositeDecoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.p1;
  var initMetadataForInterface = kotlin_kotlin.$_$.ib;
  var initMetadataForCompanion = kotlin_kotlin.$_$.fb;
  var StringBuilder_init_$Create$ = kotlin_kotlin.$_$.j1;
  var hashCode = kotlin_kotlin.$_$.db;
  var joinToString = kotlin_kotlin.$_$.l7;
  var THROW_CCE = kotlin_kotlin.$_$.tg;
  var KtMap = kotlin_kotlin.$_$.r5;
  var toDoubleOrNull = kotlin_kotlin.$_$.ff;
  var KtList = kotlin_kotlin.$_$.p5;
  var numberRangeToNumber = kotlin_kotlin.$_$.cc;
  var ClosedRange = kotlin_kotlin.$_$.rc;
  var isInterface = kotlin_kotlin.$_$.tb;
  var contains = kotlin_kotlin.$_$.zc;
  var SerializerFactory = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.d2;
  var toDouble = kotlin_kotlin.$_$.gf;
  var getKClassFromExpression = kotlin_kotlin.$_$.f;
  var getBooleanHashCode = kotlin_kotlin.$_$.za;
  var getStringHashCode = kotlin_kotlin.$_$.cb;
  var NumberFormatException_init_$Create$ = kotlin_kotlin.$_$.g2;
  var StringCompanionObject_instance = kotlin_kotlin.$_$.v4;
  var serializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.x;
  var InlinePrimitiveDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.y1;
  var LinkedHashMap_init_$Create$ = kotlin_kotlin.$_$.z;
  var ArrayList_init_$Create$ = kotlin_kotlin.$_$.q;
  var MapSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.v;
  var SerialDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.i1;
  var KSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.n2;
  var SEALED_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.g;
  var buildSerialDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.l1;
  var noWhenBranchMatchedException = kotlin_kotlin.$_$.sh;
  var STRING_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.h;
  var ListSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.u;
  var ENUM_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.j;
  var PrimitiveSerialDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.e1;
  var toLongOrNull = kotlin_kotlin.$_$.kf;
  var toULongOrNull = kotlin_kotlin.$_$.qf;
  var ULong = kotlin_kotlin.$_$.bh;
  var Companion_getInstance = kotlin_kotlin.$_$.g5;
  var serializer_0 = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.b1;
  var _ULong___get_data__impl__fggpzb = kotlin_kotlin.$_$.w3;
  var toBooleanStrictOrNull = kotlin_kotlin.$_$.ef;
  var IllegalStateException_init_$Create$ = kotlin_kotlin.$_$.a2;
  var lazy = kotlin_kotlin.$_$.rh;
  var get_isNullable = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.h1;
  var get_isInline = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.g1;
  var get_annotations = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.f1;
  var KProperty1 = kotlin_kotlin.$_$.hd;
  var getPropertyCallableRef = kotlin_kotlin.$_$.bb;
  var Encoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.s1;
  var CompositeEncoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.q1;
  var toLong = kotlin_kotlin.$_$.kc;
  var _UInt___init__impl__l7qpdl = kotlin_kotlin.$_$.m3;
  var UInt__toString_impl_dbgl21 = kotlin_kotlin.$_$.o3;
  var _ULong___init__impl__c78o9k = kotlin_kotlin.$_$.v3;
  var ULong__toString_impl_f9au7k = kotlin_kotlin.$_$.x3;
  var _UByte___init__impl__g9hnc4 = kotlin_kotlin.$_$.d3;
  var UByte__toString_impl_v72jg = kotlin_kotlin.$_$.f3;
  var _UShort___init__impl__jigrne = kotlin_kotlin.$_$.e4;
  var UShort__toString_impl_edaoee = kotlin_kotlin.$_$.g4;
  var ElementMarker = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.v1;
  var captureStack = kotlin_kotlin.$_$.pa;
  var SerializationException = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.q2;
  var SerializationException_init_$Init$ = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.d;
  var charSequenceSubSequence = kotlin_kotlin.$_$.ua;
  var coerceAtLeast = kotlin_kotlin.$_$.sc;
  var coerceAtMost = kotlin_kotlin.$_$.uc;
  var SerializationException_init_$Create$ = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.e;
  var CLASS_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.k;
  var singleOrNull = kotlin_kotlin.$_$.r8;
  var emptyMap = kotlin_kotlin.$_$.x6;
  var getValue = kotlin_kotlin.$_$.g7;
  var copyOf = kotlin_kotlin.$_$.q6;
  var copyOf_0 = kotlin_kotlin.$_$.r6;
  var LIST_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.l;
  var DeepRecursiveFunction = kotlin_kotlin.$_$.hg;
  var invoke = kotlin_kotlin.$_$.mh;
  var CoroutineImpl = kotlin_kotlin.$_$.ha;
  var DeepRecursiveScope = kotlin_kotlin.$_$.ig;
  var Unit = kotlin_kotlin.$_$.eh;
  var get_COROUTINE_SUSPENDED = kotlin_kotlin.$_$.r9;
  var initMetadataForLambda = kotlin_kotlin.$_$.jb;
  var initMetadataForCoroutine = kotlin_kotlin.$_$.gb;
  var SealedClassSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.p2;
  var jsonCachedSerialNames = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.g2;
  var ENUM = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.j1;
  var PrimitiveKind = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.d1;
  var PolymorphicKind = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.c1;
  var CONTEXTUAL_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.i;
  var MAP_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.m;
  var contextual = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.k2;
  var SerializersModuleCollector = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.l2;
  var AbstractDecoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.n1;
  var AbstractPolymorphicSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.t1;
  var DeserializationStrategy = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.m2;
  var getKClass = kotlin_kotlin.$_$.g;
  var findPolymorphicSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.s2;
  var ensureNotNull = kotlin_kotlin.$_$.lh;
  var substringBefore = kotlin_kotlin.$_$.cf;
  var removeSuffix = kotlin_kotlin.$_$.pe;
  var substringAfter = kotlin_kotlin.$_$.bf;
  var contains_0 = kotlin_kotlin.$_$.pd;
  var plus = kotlin_kotlin.$_$.th;
  var MissingFieldException = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.o2;
  var IllegalArgumentException = kotlin_kotlin.$_$.mg;
  var isFinite = kotlin_kotlin.$_$.oh;
  var isFinite_0 = kotlin_kotlin.$_$.nh;
  var toUInt = kotlin_kotlin.$_$.pf;
  var _UInt___get_data__impl__f0vqqw = kotlin_kotlin.$_$.n3;
  var toULong = kotlin_kotlin.$_$.rf;
  var toUByte = kotlin_kotlin.$_$.of;
  var _UByte___get_data__impl__jof9qr = kotlin_kotlin.$_$.e3;
  var toUShort = kotlin_kotlin.$_$.sf;
  var _UShort___get_data__impl__g0245 = kotlin_kotlin.$_$.f4;
  var objectCreate = kotlin_kotlin.$_$.hc;
  var AbstractEncoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.o1;
  var OBJECT_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.n;
  var findPolymorphicSerializer_0 = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.t2;
  var SerializationStrategy = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.r2;
  var toString_1 = kotlin_kotlin.$_$.x2;
  var Companion_getInstance_0 = kotlin_kotlin.$_$.f5;
  var serializer_1 = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.z;
  var Companion_getInstance_1 = kotlin_kotlin.$_$.e5;
  var serializer_2 = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.a1;
  var Companion_getInstance_2 = kotlin_kotlin.$_$.h5;
  var serializer_3 = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.y;
  var setOf = kotlin_kotlin.$_$.q8;
  var Char__toInt_impl_vasixd = kotlin_kotlin.$_$.w2;
  var numberToChar = kotlin_kotlin.$_$.dc;
  var equals_0 = kotlin_kotlin.$_$.xd;
  var toByte = kotlin_kotlin.$_$.jc;
  var startsWith = kotlin_kotlin.$_$.ye;
  var NamedValueDecoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.a2;
  var toShort = kotlin_kotlin.$_$.lc;
  var single = kotlin_kotlin.$_$.ve;
  var Char = kotlin_kotlin.$_$.eg;
  var emptySet = kotlin_kotlin.$_$.y6;
  var plus_0 = kotlin_kotlin.$_$.e8;
  var toInt = kotlin_kotlin.$_$.if;
  var toList = kotlin_kotlin.$_$.d9;
  var throwUninitializedPropertyAccessException = kotlin_kotlin.$_$.xh;
  var NamedValueEncoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.b2;
  var enumEntries = kotlin_kotlin.$_$.ja;
  var getContextualDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.m1;
  var last = kotlin_kotlin.$_$.q7;
  var removeLast = kotlin_kotlin.$_$.n8;
  var lastIndexOf = kotlin_kotlin.$_$.je;
  var Long = kotlin_kotlin.$_$.og;
  var Char__minus_impl_a2frrh = kotlin_kotlin.$_$.s2;
  var numberToLong = kotlin_kotlin.$_$.gc;
  var charArray = kotlin_kotlin.$_$.ra;
  var indexOf = kotlin_kotlin.$_$.be;
  var indexOf_0 = kotlin_kotlin.$_$.ce;
  var StringBuilder_init_$Create$_0 = kotlin_kotlin.$_$.i1;
  var HashMap_init_$Create$ = kotlin_kotlin.$_$.s;
  //endregion
  //region block: pre-declaration
  initMetadataForClass(Json, 'Json');
  initMetadataForObject(Default, 'Default', VOID, Json);
  initMetadataForClass(JsonBuilder, 'JsonBuilder');
  initMetadataForClass(JsonImpl, 'JsonImpl', VOID, Json);
  initMetadataForClass(JsonClassDiscriminator, 'JsonClassDiscriminator');
  initMetadataForClass(JsonNames, 'JsonNames');
  initMetadataForClass(JsonConfiguration, 'JsonConfiguration');
  initMetadataForClass(ClassDiscriminatorMode, 'ClassDiscriminatorMode', VOID, Enum);
  initMetadataForInterface(JsonDecoder, 'JsonDecoder', VOID, VOID, [Decoder, CompositeDecoder]);
  initMetadataForCompanion(Companion);
  initMetadataForClass(JsonElement, 'JsonElement', VOID, VOID, VOID, VOID, VOID, {0: JsonElementSerializer_getInstance});
  initMetadataForClass(JsonPrimitive, 'JsonPrimitive', VOID, JsonElement, VOID, VOID, VOID, {0: JsonPrimitiveSerializer_getInstance});
  initMetadataForCompanion(Companion_0);
  initMetadataForCompanion(Companion_1);
  initMetadataForClass(JsonObject, 'JsonObject', VOID, JsonElement, [JsonElement, KtMap], VOID, VOID, {0: JsonObjectSerializer_getInstance});
  initMetadataForCompanion(Companion_2);
  initMetadataForClass(JsonArray, 'JsonArray', VOID, JsonElement, [JsonElement, KtList], VOID, VOID, {0: JsonArraySerializer_getInstance});
  initMetadataForObject(JsonNull, 'JsonNull', VOID, JsonPrimitive, [JsonPrimitive, SerializerFactory], VOID, VOID, {0: JsonNullSerializer_getInstance});
  initMetadataForClass(JsonLiteral, 'JsonLiteral', VOID, JsonPrimitive);
  initMetadataForClass(JsonObjectBuilder, 'JsonObjectBuilder');
  initMetadataForClass(JsonArrayBuilder, 'JsonArrayBuilder');
  initMetadataForObject(JsonObjectDescriptor, 'JsonObjectDescriptor', VOID, VOID, [SerialDescriptor]);
  initMetadataForObject(JsonObjectSerializer, 'JsonObjectSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(JsonElementSerializer, 'JsonElementSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(JsonPrimitiveSerializer, 'JsonPrimitiveSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(JsonArrayDescriptor, 'JsonArrayDescriptor', VOID, VOID, [SerialDescriptor]);
  initMetadataForObject(JsonArraySerializer, 'JsonArraySerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(JsonNullSerializer, 'JsonNullSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(JsonLiteralSerializer, 'JsonLiteralSerializer', VOID, VOID, [KSerializer]);
  initMetadataForClass(defer$1, VOID, VOID, VOID, [SerialDescriptor]);
  initMetadataForInterface(JsonEncoder, 'JsonEncoder', VOID, VOID, [Encoder, CompositeEncoder]);
  initMetadataForClass(Composer, 'Composer');
  initMetadataForClass(ComposerForUnsignedNumbers, 'ComposerForUnsignedNumbers', VOID, Composer);
  initMetadataForClass(ComposerForUnquotedLiterals, 'ComposerForUnquotedLiterals', VOID, Composer);
  initMetadataForClass(ComposerWithPrettyPrint, 'ComposerWithPrettyPrint', VOID, Composer);
  initMetadataForClass(JsonElementMarker, 'JsonElementMarker');
  initMetadataForClass(JsonException, 'JsonException', VOID, SerializationException);
  initMetadataForClass(JsonDecodingException, 'JsonDecodingException', VOID, JsonException);
  initMetadataForClass(JsonEncodingException, 'JsonEncodingException', VOID, JsonException);
  initMetadataForObject(Tombstone, 'Tombstone');
  initMetadataForClass(JsonPath, 'JsonPath', JsonPath);
  initMetadataForLambda(JsonTreeReader$readDeepRecursive$slambda, CoroutineImpl, VOID, [2]);
  initMetadataForCoroutine($readObjectCOROUTINE$0, CoroutineImpl);
  initMetadataForClass(JsonTreeReader, 'JsonTreeReader', VOID, VOID, VOID, [0]);
  initMetadataForClass(PolymorphismValidator, 'PolymorphismValidator', VOID, VOID, [SerializersModuleCollector]);
  initMetadataForClass(Key, 'Key', Key);
  initMetadataForClass(DescriptorSchemaCache, 'DescriptorSchemaCache', DescriptorSchemaCache);
  initMetadataForClass(DiscriminatorHolder, 'DiscriminatorHolder');
  initMetadataForClass(StreamingJsonDecoder, 'StreamingJsonDecoder', VOID, AbstractDecoder, [JsonDecoder, AbstractDecoder]);
  initMetadataForClass(JsonDecoderForUnsignedTypes, 'JsonDecoderForUnsignedTypes', VOID, AbstractDecoder);
  initMetadataForClass(StreamingJsonEncoder, 'StreamingJsonEncoder', VOID, AbstractEncoder, [JsonEncoder, AbstractEncoder]);
  initMetadataForClass(AbstractJsonTreeDecoder, 'AbstractJsonTreeDecoder', VOID, NamedValueDecoder, [NamedValueDecoder, JsonDecoder]);
  initMetadataForClass(JsonTreeDecoder, 'JsonTreeDecoder', VOID, AbstractJsonTreeDecoder);
  initMetadataForClass(JsonTreeListDecoder, 'JsonTreeListDecoder', VOID, AbstractJsonTreeDecoder);
  initMetadataForClass(JsonPrimitiveDecoder, 'JsonPrimitiveDecoder', VOID, AbstractJsonTreeDecoder);
  initMetadataForClass(JsonTreeMapDecoder, 'JsonTreeMapDecoder', VOID, JsonTreeDecoder);
  initMetadataForClass(AbstractJsonTreeEncoder, 'AbstractJsonTreeEncoder', VOID, NamedValueEncoder, [NamedValueEncoder, JsonEncoder]);
  initMetadataForClass(JsonTreeEncoder, 'JsonTreeEncoder', VOID, AbstractJsonTreeEncoder);
  initMetadataForClass(AbstractJsonTreeEncoder$inlineUnsignedNumberEncoder$1, VOID, VOID, AbstractEncoder);
  initMetadataForClass(AbstractJsonTreeEncoder$inlineUnquotedLiteralEncoder$1, VOID, VOID, AbstractEncoder);
  initMetadataForClass(JsonPrimitiveEncoder, 'JsonPrimitiveEncoder', VOID, AbstractJsonTreeEncoder);
  initMetadataForClass(JsonTreeListEncoder, 'JsonTreeListEncoder', VOID, AbstractJsonTreeEncoder);
  initMetadataForClass(JsonTreeMapEncoder, 'JsonTreeMapEncoder', VOID, JsonTreeEncoder);
  initMetadataForClass(WriteMode, 'WriteMode', VOID, Enum);
  initMetadataForClass(AbstractJsonLexer, 'AbstractJsonLexer');
  initMetadataForObject(CharMappings, 'CharMappings');
  initMetadataForClass(StringJsonLexer, 'StringJsonLexer', VOID, AbstractJsonLexer);
  initMetadataForClass(StringJsonLexerWithComments, 'StringJsonLexerWithComments', VOID, StringJsonLexer);
  initMetadataForClass(JsonToStringWriter, 'JsonToStringWriter', JsonToStringWriter);
  //endregion
  function Default() {
    Default_instance = this;
    Json.call(this, new JsonConfiguration(), EmptySerializersModule());
  }
  var Default_instance;
  function Default_getInstance() {
    if (Default_instance == null)
      new Default();
    return Default_instance;
  }
  function Json(configuration, serializersModule) {
    Default_getInstance();
    this.v3y_1 = configuration;
    this.w3y_1 = serializersModule;
    this.x3y_1 = new DescriptorSchemaCache();
  }
  protoOf(Json).b1u = function () {
    return this.w3y_1;
  };
  protoOf(Json).y3y = function (serializer, value) {
    var result = new JsonToStringWriter();
    try {
      encodeByWriter(this, result, serializer, value);
      return result.toString();
    }finally {
      result.e3z();
    }
  };
  protoOf(Json).z3y = function (deserializer, string) {
    var lexer = StringJsonLexer_0(this, string);
    var input = new StreamingJsonDecoder(this, WriteMode_OBJ_getInstance(), lexer, deserializer.d1q(), null);
    var result = input.l1t(deserializer);
    lexer.r3z();
    return result;
  };
  protoOf(Json).a3z = function (serializer, value) {
    return writeJson(this, value, serializer);
  };
  protoOf(Json).b3z = function (deserializer, element) {
    return readJson(this, element, deserializer);
  };
  protoOf(Json).c3z = function (string) {
    return this.z3y(JsonElementSerializer_getInstance(), string);
  };
  function Json_0(from, builderAction) {
    from = from === VOID ? Default_getInstance() : from;
    var builder = new JsonBuilder(from);
    builderAction(builder);
    var conf = builder.k40();
    return new JsonImpl(conf, builder.j40_1);
  }
  function JsonBuilder(json) {
    this.s3z_1 = json.v3y_1.l40_1;
    this.t3z_1 = json.v3y_1.q40_1;
    this.u3z_1 = json.v3y_1.m40_1;
    this.v3z_1 = json.v3y_1.n40_1;
    this.w3z_1 = json.v3y_1.p40_1;
    this.x3z_1 = json.v3y_1.r40_1;
    this.y3z_1 = json.v3y_1.s40_1;
    this.z3z_1 = json.v3y_1.u40_1;
    this.a40_1 = json.v3y_1.b41_1;
    this.b40_1 = json.v3y_1.w40_1;
    this.c40_1 = json.v3y_1.x40_1;
    this.d40_1 = json.v3y_1.y40_1;
    this.e40_1 = json.v3y_1.z40_1;
    this.f40_1 = json.v3y_1.a41_1;
    this.g40_1 = json.v3y_1.v40_1;
    this.h40_1 = json.v3y_1.o40_1;
    this.i40_1 = json.v3y_1.t40_1;
    this.j40_1 = json.b1u();
  }
  protoOf(JsonBuilder).k40 = function () {
    if (this.i40_1) {
      // Inline function 'kotlin.require' call
      if (!(this.z3z_1 === 'type')) {
        var message = 'Class discriminator should not be specified when array polymorphism is specified';
        throw IllegalArgumentException_init_$Create$(toString(message));
      }
      // Inline function 'kotlin.require' call
      if (!this.a40_1.equals(ClassDiscriminatorMode_POLYMORPHIC_getInstance())) {
        var message_0 = 'useArrayPolymorphism option can only be used if classDiscriminatorMode in a default POLYMORPHIC state.';
        throw IllegalArgumentException_init_$Create$(toString(message_0));
      }
    }
    if (!this.w3z_1) {
      // Inline function 'kotlin.require' call
      if (!(this.x3z_1 === '    ')) {
        var message_1 = 'Indent should not be specified when default printing mode is used';
        throw IllegalArgumentException_init_$Create$(toString(message_1));
      }
    } else if (!(this.x3z_1 === '    ')) {
      var tmp3 = this.x3z_1;
      var tmp$ret$7;
      $l$block: {
        // Inline function 'kotlin.text.all' call
        var inductionVariable = 0;
        while (inductionVariable < charSequenceLength(tmp3)) {
          var element = charSequenceGet(tmp3, inductionVariable);
          inductionVariable = inductionVariable + 1 | 0;
          if (!(element === _Char___init__impl__6a9atx(32) || element === _Char___init__impl__6a9atx(9) || element === _Char___init__impl__6a9atx(13) || element === _Char___init__impl__6a9atx(10))) {
            tmp$ret$7 = false;
            break $l$block;
          }
        }
        tmp$ret$7 = true;
      }
      var allWhitespaces = tmp$ret$7;
      // Inline function 'kotlin.require' call
      if (!allWhitespaces) {
        var message_2 = 'Only whitespace, tab, newline and carriage return are allowed as pretty print symbols. Had ' + this.x3z_1;
        throw IllegalArgumentException_init_$Create$(toString(message_2));
      }
    }
    return new JsonConfiguration(this.s3z_1, this.u3z_1, this.v3z_1, this.h40_1, this.w3z_1, this.t3z_1, this.x3z_1, this.y3z_1, this.i40_1, this.z3z_1, this.g40_1, this.b40_1, this.c40_1, this.d40_1, this.e40_1, this.f40_1, this.a40_1);
  };
  function validateConfiguration($this) {
    if (equals($this.b1u(), EmptySerializersModule()))
      return Unit_instance;
    var collector = new PolymorphismValidator($this.v3y_1.t40_1, $this.v3y_1.u40_1);
    $this.b1u().n2a(collector);
  }
  function JsonImpl(configuration, module_0) {
    Json.call(this, configuration, module_0);
    validateConfiguration(this);
  }
  function JsonClassDiscriminator() {
  }
  function JsonNames() {
  }
  function JsonConfiguration(encodeDefaults, ignoreUnknownKeys, isLenient, allowStructuredMapKeys, prettyPrint, explicitNulls, prettyPrintIndent, coerceInputValues, useArrayPolymorphism, classDiscriminator, allowSpecialFloatingPointValues, useAlternativeNames, namingStrategy, decodeEnumsCaseInsensitive, allowTrailingComma, allowComments, classDiscriminatorMode) {
    encodeDefaults = encodeDefaults === VOID ? false : encodeDefaults;
    ignoreUnknownKeys = ignoreUnknownKeys === VOID ? false : ignoreUnknownKeys;
    isLenient = isLenient === VOID ? false : isLenient;
    allowStructuredMapKeys = allowStructuredMapKeys === VOID ? false : allowStructuredMapKeys;
    prettyPrint = prettyPrint === VOID ? false : prettyPrint;
    explicitNulls = explicitNulls === VOID ? true : explicitNulls;
    prettyPrintIndent = prettyPrintIndent === VOID ? '    ' : prettyPrintIndent;
    coerceInputValues = coerceInputValues === VOID ? false : coerceInputValues;
    useArrayPolymorphism = useArrayPolymorphism === VOID ? false : useArrayPolymorphism;
    classDiscriminator = classDiscriminator === VOID ? 'type' : classDiscriminator;
    allowSpecialFloatingPointValues = allowSpecialFloatingPointValues === VOID ? false : allowSpecialFloatingPointValues;
    useAlternativeNames = useAlternativeNames === VOID ? true : useAlternativeNames;
    namingStrategy = namingStrategy === VOID ? null : namingStrategy;
    decodeEnumsCaseInsensitive = decodeEnumsCaseInsensitive === VOID ? false : decodeEnumsCaseInsensitive;
    allowTrailingComma = allowTrailingComma === VOID ? false : allowTrailingComma;
    allowComments = allowComments === VOID ? false : allowComments;
    classDiscriminatorMode = classDiscriminatorMode === VOID ? ClassDiscriminatorMode_POLYMORPHIC_getInstance() : classDiscriminatorMode;
    this.l40_1 = encodeDefaults;
    this.m40_1 = ignoreUnknownKeys;
    this.n40_1 = isLenient;
    this.o40_1 = allowStructuredMapKeys;
    this.p40_1 = prettyPrint;
    this.q40_1 = explicitNulls;
    this.r40_1 = prettyPrintIndent;
    this.s40_1 = coerceInputValues;
    this.t40_1 = useArrayPolymorphism;
    this.u40_1 = classDiscriminator;
    this.v40_1 = allowSpecialFloatingPointValues;
    this.w40_1 = useAlternativeNames;
    this.x40_1 = namingStrategy;
    this.y40_1 = decodeEnumsCaseInsensitive;
    this.z40_1 = allowTrailingComma;
    this.a41_1 = allowComments;
    this.b41_1 = classDiscriminatorMode;
  }
  protoOf(JsonConfiguration).toString = function () {
    return 'JsonConfiguration(encodeDefaults=' + this.l40_1 + ', ignoreUnknownKeys=' + this.m40_1 + ', isLenient=' + this.n40_1 + ', ' + ('allowStructuredMapKeys=' + this.o40_1 + ', prettyPrint=' + this.p40_1 + ', explicitNulls=' + this.q40_1 + ', ') + ("prettyPrintIndent='" + this.r40_1 + "', coerceInputValues=" + this.s40_1 + ', useArrayPolymorphism=' + this.t40_1 + ', ') + ("classDiscriminator='" + this.u40_1 + "', allowSpecialFloatingPointValues=" + this.v40_1 + ', ') + ('useAlternativeNames=' + this.w40_1 + ', namingStrategy=' + toString_0(this.x40_1) + ', decodeEnumsCaseInsensitive=' + this.y40_1 + ', ') + ('allowTrailingComma=' + this.z40_1 + ', allowComments=' + this.a41_1 + ', classDiscriminatorMode=' + this.b41_1.toString() + ')');
  };
  var ClassDiscriminatorMode_NONE_instance;
  var ClassDiscriminatorMode_ALL_JSON_OBJECTS_instance;
  var ClassDiscriminatorMode_POLYMORPHIC_instance;
  var ClassDiscriminatorMode_entriesInitialized;
  function ClassDiscriminatorMode_initEntries() {
    if (ClassDiscriminatorMode_entriesInitialized)
      return Unit_instance;
    ClassDiscriminatorMode_entriesInitialized = true;
    ClassDiscriminatorMode_NONE_instance = new ClassDiscriminatorMode('NONE', 0);
    ClassDiscriminatorMode_ALL_JSON_OBJECTS_instance = new ClassDiscriminatorMode('ALL_JSON_OBJECTS', 1);
    ClassDiscriminatorMode_POLYMORPHIC_instance = new ClassDiscriminatorMode('POLYMORPHIC', 2);
  }
  function ClassDiscriminatorMode(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function ClassDiscriminatorMode_NONE_getInstance() {
    ClassDiscriminatorMode_initEntries();
    return ClassDiscriminatorMode_NONE_instance;
  }
  function ClassDiscriminatorMode_POLYMORPHIC_getInstance() {
    ClassDiscriminatorMode_initEntries();
    return ClassDiscriminatorMode_POLYMORPHIC_instance;
  }
  function JsonDecoder() {
  }
  function get_jsonUnquotedLiteralDescriptor() {
    _init_properties_JsonElement_kt__7cbdc2();
    return jsonUnquotedLiteralDescriptor;
  }
  var jsonUnquotedLiteralDescriptor;
  function Companion() {
  }
  var Companion_instance;
  function Companion_getInstance_3() {
    return Companion_instance;
  }
  function JsonPrimitive() {
    JsonElement.call(this);
  }
  protoOf(JsonPrimitive).toString = function () {
    return this.f41();
  };
  function Companion_0() {
  }
  var Companion_instance_0;
  function Companion_getInstance_4() {
    return Companion_instance_0;
  }
  function JsonElement() {
  }
  function Companion_1() {
  }
  protoOf(Companion_1).g41 = function () {
    return JsonObjectSerializer_getInstance();
  };
  var Companion_instance_1;
  function Companion_getInstance_5() {
    return Companion_instance_1;
  }
  function JsonObject$toString$lambda(_destruct__k2r9zo) {
    // Inline function 'kotlin.collections.component1' call
    var k = _destruct__k2r9zo.v();
    // Inline function 'kotlin.collections.component2' call
    var v = _destruct__k2r9zo.w();
    // Inline function 'kotlin.text.buildString' call
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$();
    printQuoted(this_0, k);
    this_0.h8(_Char___init__impl__6a9atx(58));
    this_0.f8(v);
    return this_0.toString();
  }
  function JsonObject(content) {
    JsonElement.call(this);
    this.h41_1 = content;
  }
  protoOf(JsonObject).equals = function (other) {
    return equals(this.h41_1, other);
  };
  protoOf(JsonObject).hashCode = function () {
    return hashCode(this.h41_1);
  };
  protoOf(JsonObject).toString = function () {
    var tmp = this.h41_1.u();
    return joinToString(tmp, ',', '{', '}', VOID, VOID, JsonObject$toString$lambda);
  };
  protoOf(JsonObject).r2b = function (key) {
    return this.h41_1.h2(key);
  };
  protoOf(JsonObject).h2 = function (key) {
    if (!(!(key == null) ? typeof key === 'string' : false))
      return false;
    return this.r2b((!(key == null) ? typeof key === 'string' : false) ? key : THROW_CCE());
  };
  protoOf(JsonObject).de = function (key) {
    return this.h41_1.j2(key);
  };
  protoOf(JsonObject).j2 = function (key) {
    if (!(!(key == null) ? typeof key === 'string' : false))
      return null;
    return this.de((!(key == null) ? typeof key === 'string' : false) ? key : THROW_CCE());
  };
  protoOf(JsonObject).p = function () {
    return this.h41_1.p();
  };
  protoOf(JsonObject).u = function () {
    return this.h41_1.u();
  };
  protoOf(JsonObject).k2 = function () {
    return this.h41_1.k2();
  };
  protoOf(JsonObject).m = function () {
    return this.h41_1.m();
  };
  protoOf(JsonObject).l2 = function () {
    return this.h41_1.l2();
  };
  function get_jsonPrimitive(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    var tmp0_elvis_lhs = _this__u8e3s4 instanceof JsonPrimitive ? _this__u8e3s4 : null;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      error(_this__u8e3s4, 'JsonPrimitive');
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function get_jsonObject(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    var tmp0_elvis_lhs = _this__u8e3s4 instanceof JsonObject ? _this__u8e3s4 : null;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      error(_this__u8e3s4, 'JsonObject');
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function get_doubleOrNull(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    return toDoubleOrNull(_this__u8e3s4.f41());
  }
  function Companion_2() {
  }
  var Companion_instance_2;
  function Companion_getInstance_6() {
    return Companion_instance_2;
  }
  function JsonArray(content) {
    JsonElement.call(this);
    this.i41_1 = content;
  }
  protoOf(JsonArray).equals = function (other) {
    return equals(this.i41_1, other);
  };
  protoOf(JsonArray).hashCode = function () {
    return hashCode(this.i41_1);
  };
  protoOf(JsonArray).toString = function () {
    return joinToString(this.i41_1, ',', '[', ']');
  };
  protoOf(JsonArray).j41 = function (element) {
    return this.i41_1.r(element);
  };
  protoOf(JsonArray).r = function (element) {
    if (!(element instanceof JsonElement))
      return false;
    return this.j41(element instanceof JsonElement ? element : THROW_CCE());
  };
  protoOf(JsonArray).k41 = function (elements) {
    return this.i41_1.a2(elements);
  };
  protoOf(JsonArray).a2 = function (elements) {
    return this.k41(elements);
  };
  protoOf(JsonArray).o = function (index) {
    return this.i41_1.o(index);
  };
  protoOf(JsonArray).l41 = function (element) {
    return this.i41_1.s(element);
  };
  protoOf(JsonArray).s = function (element) {
    if (!(element instanceof JsonElement))
      return -1;
    return this.l41(element instanceof JsonElement ? element : THROW_CCE());
  };
  protoOf(JsonArray).p = function () {
    return this.i41_1.p();
  };
  protoOf(JsonArray).j = function () {
    return this.i41_1.j();
  };
  protoOf(JsonArray).q = function (index) {
    return this.i41_1.q(index);
  };
  protoOf(JsonArray).b2 = function (fromIndex, toIndex) {
    return this.i41_1.b2(fromIndex, toIndex);
  };
  protoOf(JsonArray).m = function () {
    return this.i41_1.m();
  };
  function get_intOrNull(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    // Inline function 'kotlinx.serialization.json.mapExceptionsToNull' call
    var tmp;
    try {
      tmp = (new StringJsonLexer(_this__u8e3s4.f41())).m41();
    } catch ($p) {
      var tmp_0;
      if ($p instanceof JsonDecodingException) {
        var e = $p;
        tmp_0 = null;
      } else {
        throw $p;
      }
      tmp = tmp_0;
    }
    var tmp0_elvis_lhs = tmp;
    var tmp_1;
    if (tmp0_elvis_lhs == null) {
      return null;
    } else {
      tmp_1 = tmp0_elvis_lhs;
    }
    var result = tmp_1;
    // Inline function 'kotlin.ranges.contains' call
    var this_0 = numberRangeToNumber(-2147483648, 2147483647);
    if (!contains(isInterface(this_0, ClosedRange) ? this_0 : THROW_CCE(), result))
      return null;
    return result.g1();
  }
  function get_contentOrNull(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    var tmp;
    if (_this__u8e3s4 instanceof JsonNull) {
      tmp = null;
    } else {
      tmp = _this__u8e3s4.f41();
    }
    return tmp;
  }
  function get_booleanOrNull(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    return toBooleanStrictOrNull_0(_this__u8e3s4.f41());
  }
  function get_floatOrNull(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    // Inline function 'kotlin.text.toFloatOrNull' call
    var this_0 = _this__u8e3s4.f41();
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return toDoubleOrNull(this_0);
  }
  function JsonNull() {
    JsonNull_instance = this;
    JsonPrimitive.call(this);
    this.n41_1 = 'null';
  }
  protoOf(JsonNull).e41 = function () {
    return false;
  };
  protoOf(JsonNull).f41 = function () {
    return this.n41_1;
  };
  protoOf(JsonNull).g41 = function () {
    return JsonNullSerializer_getInstance();
  };
  protoOf(JsonNull).c22 = function (typeParamsSerializers) {
    return this.g41();
  };
  var JsonNull_instance;
  function JsonNull_getInstance() {
    if (JsonNull_instance == null)
      new JsonNull();
    return JsonNull_instance;
  }
  function JsonPrimitive_0(value) {
    _init_properties_JsonElement_kt__7cbdc2();
    if (value == null)
      return JsonNull_getInstance();
    return new JsonLiteral(value, false);
  }
  function JsonPrimitive_1(value) {
    _init_properties_JsonElement_kt__7cbdc2();
    if (value == null)
      return JsonNull_getInstance();
    return new JsonLiteral(value, false);
  }
  function JsonPrimitive_2(value) {
    _init_properties_JsonElement_kt__7cbdc2();
    if (value == null)
      return JsonNull_getInstance();
    return new JsonLiteral(value, true);
  }
  function get_jsonArray(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    var tmp0_elvis_lhs = _this__u8e3s4 instanceof JsonArray ? _this__u8e3s4 : null;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      error(_this__u8e3s4, 'JsonArray');
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function get_double(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    return toDouble(_this__u8e3s4.f41());
  }
  function get_longOrNull(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    // Inline function 'kotlinx.serialization.json.mapExceptionsToNull' call
    var tmp;
    try {
      tmp = (new StringJsonLexer(_this__u8e3s4.f41())).m41();
    } catch ($p) {
      var tmp_0;
      if ($p instanceof JsonDecodingException) {
        var e = $p;
        tmp_0 = null;
      } else {
        throw $p;
      }
      tmp = tmp_0;
    }
    return tmp;
  }
  function error(_this__u8e3s4, element) {
    _init_properties_JsonElement_kt__7cbdc2();
    throw IllegalArgumentException_init_$Create$('Element ' + toString(getKClassFromExpression(_this__u8e3s4)) + ' is not a ' + element);
  }
  function JsonLiteral(body, isString, coerceToInlineType) {
    coerceToInlineType = coerceToInlineType === VOID ? null : coerceToInlineType;
    JsonPrimitive.call(this);
    this.o41_1 = isString;
    this.p41_1 = coerceToInlineType;
    this.q41_1 = toString(body);
    if (!(this.p41_1 == null)) {
      // Inline function 'kotlin.require' call
      // Inline function 'kotlin.require' call
      if (!this.p41_1.r1r()) {
        var message = 'Failed requirement.';
        throw IllegalArgumentException_init_$Create$(toString(message));
      }
    }
  }
  protoOf(JsonLiteral).e41 = function () {
    return this.o41_1;
  };
  protoOf(JsonLiteral).f41 = function () {
    return this.q41_1;
  };
  protoOf(JsonLiteral).toString = function () {
    var tmp;
    if (this.o41_1) {
      // Inline function 'kotlin.text.buildString' call
      // Inline function 'kotlin.apply' call
      var this_0 = StringBuilder_init_$Create$();
      printQuoted(this_0, this.q41_1);
      tmp = this_0.toString();
    } else {
      tmp = this.q41_1;
    }
    return tmp;
  };
  protoOf(JsonLiteral).equals = function (other) {
    if (this === other)
      return true;
    if (other == null || !getKClassFromExpression(this).equals(getKClassFromExpression(other)))
      return false;
    if (!(other instanceof JsonLiteral))
      THROW_CCE();
    if (!(this.o41_1 === other.o41_1))
      return false;
    if (!(this.q41_1 === other.q41_1))
      return false;
    return true;
  };
  protoOf(JsonLiteral).hashCode = function () {
    var result = getBooleanHashCode(this.o41_1);
    result = imul(31, result) + getStringHashCode(this.q41_1) | 0;
    return result;
  };
  function get_int(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    // Inline function 'kotlinx.serialization.json.mapExceptions' call
    var tmp;
    try {
      tmp = (new StringJsonLexer(_this__u8e3s4.f41())).m41();
    } catch ($p) {
      var tmp_0;
      if ($p instanceof JsonDecodingException) {
        var e = $p;
        throw NumberFormatException_init_$Create$(e.message);
      } else {
        throw $p;
      }
    }
    var result = tmp;
    // Inline function 'kotlin.ranges.contains' call
    var this_0 = numberRangeToNumber(-2147483648, 2147483647);
    if (!contains(isInterface(this_0, ClosedRange) ? this_0 : THROW_CCE(), result))
      throw NumberFormatException_init_$Create$(_this__u8e3s4.f41() + ' is not an Int');
    return result.g1();
  }
  function get_long(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    // Inline function 'kotlinx.serialization.json.mapExceptions' call
    var tmp;
    try {
      tmp = (new StringJsonLexer(_this__u8e3s4.f41())).m41();
    } catch ($p) {
      var tmp_0;
      if ($p instanceof JsonDecodingException) {
        var e = $p;
        throw NumberFormatException_init_$Create$(e.message);
      } else {
        throw $p;
      }
    }
    return tmp;
  }
  function get_float(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    // Inline function 'kotlin.text.toFloat' call
    var this_0 = _this__u8e3s4.f41();
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return toDouble(this_0);
  }
  var properties_initialized_JsonElement_kt_abxy8s;
  function _init_properties_JsonElement_kt__7cbdc2() {
    if (!properties_initialized_JsonElement_kt_abxy8s) {
      properties_initialized_JsonElement_kt_abxy8s = true;
      jsonUnquotedLiteralDescriptor = InlinePrimitiveDescriptor('kotlinx.serialization.json.JsonUnquotedLiteral', serializer(StringCompanionObject_instance));
    }
  }
  function JsonObjectBuilder() {
    var tmp = this;
    // Inline function 'kotlin.collections.linkedMapOf' call
    tmp.r41_1 = LinkedHashMap_init_$Create$();
  }
  protoOf(JsonObjectBuilder).s41 = function (key, element) {
    return this.r41_1.m2(key, element);
  };
  protoOf(JsonObjectBuilder).k40 = function () {
    return new JsonObject(this.r41_1);
  };
  function JsonArrayBuilder() {
    var tmp = this;
    // Inline function 'kotlin.collections.mutableListOf' call
    tmp.t41_1 = ArrayList_init_$Create$();
  }
  protoOf(JsonArrayBuilder).u41 = function (element) {
    // Inline function 'kotlin.collections.plusAssign' call
    this.t41_1.e(element);
    return true;
  };
  protoOf(JsonArrayBuilder).k40 = function () {
    return new JsonArray(this.t41_1);
  };
  function put(_this__u8e3s4, key, value) {
    return _this__u8e3s4.s41(key, JsonPrimitive_1(value));
  }
  function put_0(_this__u8e3s4, key, value) {
    return _this__u8e3s4.s41(key, JsonPrimitive_2(value));
  }
  function put_1(_this__u8e3s4, key, value) {
    return _this__u8e3s4.s41(key, JsonPrimitive_0(value));
  }
  function add(_this__u8e3s4, value) {
    return _this__u8e3s4.u41(JsonPrimitive_2(value));
  }
  function putJsonObject(_this__u8e3s4, key, builderAction) {
    // Inline function 'kotlinx.serialization.json.buildJsonObject' call
    var builder = new JsonObjectBuilder();
    builderAction(builder);
    var tmp$ret$0 = builder.k40();
    return _this__u8e3s4.s41(key, tmp$ret$0);
  }
  function putJsonArray(_this__u8e3s4, key, builderAction) {
    // Inline function 'kotlinx.serialization.json.buildJsonArray' call
    var builder = new JsonArrayBuilder();
    builderAction(builder);
    var tmp$ret$0 = builder.k40();
    return _this__u8e3s4.s41(key, tmp$ret$0);
  }
  function addJsonObject(_this__u8e3s4, builderAction) {
    // Inline function 'kotlinx.serialization.json.buildJsonObject' call
    var builder = new JsonObjectBuilder();
    builderAction(builder);
    var tmp$ret$0 = builder.k40();
    return _this__u8e3s4.u41(tmp$ret$0);
  }
  function JsonObjectDescriptor() {
    JsonObjectDescriptor_instance = this;
    this.v41_1 = MapSerializer(serializer(StringCompanionObject_instance), JsonElementSerializer_getInstance()).d1q();
    this.w41_1 = 'kotlinx.serialization.json.JsonObject';
  }
  protoOf(JsonObjectDescriptor).e1r = function () {
    return this.w41_1;
  };
  protoOf(JsonObjectDescriptor).u1r = function (index) {
    return this.v41_1.u1r(index);
  };
  protoOf(JsonObjectDescriptor).v1r = function (name) {
    return this.v41_1.v1r(name);
  };
  protoOf(JsonObjectDescriptor).w1r = function (index) {
    return this.v41_1.w1r(index);
  };
  protoOf(JsonObjectDescriptor).x1r = function (index) {
    return this.v41_1.x1r(index);
  };
  protoOf(JsonObjectDescriptor).y1r = function (index) {
    return this.v41_1.y1r(index);
  };
  protoOf(JsonObjectDescriptor).q1r = function () {
    return this.v41_1.q1r();
  };
  protoOf(JsonObjectDescriptor).m1r = function () {
    return this.v41_1.m1r();
  };
  protoOf(JsonObjectDescriptor).r1r = function () {
    return this.v41_1.r1r();
  };
  protoOf(JsonObjectDescriptor).s1r = function () {
    return this.v41_1.s1r();
  };
  protoOf(JsonObjectDescriptor).t1r = function () {
    return this.v41_1.t1r();
  };
  var JsonObjectDescriptor_instance;
  function JsonObjectDescriptor_getInstance() {
    if (JsonObjectDescriptor_instance == null)
      new JsonObjectDescriptor();
    return JsonObjectDescriptor_instance;
  }
  function JsonObjectSerializer() {
    JsonObjectSerializer_instance = this;
    this.x41_1 = JsonObjectDescriptor_getInstance();
  }
  protoOf(JsonObjectSerializer).d1q = function () {
    return this.x41_1;
  };
  protoOf(JsonObjectSerializer).y41 = function (encoder, value) {
    verify(encoder);
    MapSerializer(serializer(StringCompanionObject_instance), JsonElementSerializer_getInstance()).e1q(encoder, value);
  };
  protoOf(JsonObjectSerializer).e1q = function (encoder, value) {
    return this.y41(encoder, value instanceof JsonObject ? value : THROW_CCE());
  };
  protoOf(JsonObjectSerializer).f1q = function (decoder) {
    verify_0(decoder);
    return new JsonObject(MapSerializer(serializer(StringCompanionObject_instance), JsonElementSerializer_getInstance()).f1q(decoder));
  };
  var JsonObjectSerializer_instance;
  function JsonObjectSerializer_getInstance() {
    if (JsonObjectSerializer_instance == null)
      new JsonObjectSerializer();
    return JsonObjectSerializer_instance;
  }
  function JsonElementSerializer$descriptor$lambda($this$buildSerialDescriptor) {
    $this$buildSerialDescriptor.o1q('JsonPrimitive', defer(JsonElementSerializer$descriptor$lambda$lambda));
    $this$buildSerialDescriptor.o1q('JsonNull', defer(JsonElementSerializer$descriptor$lambda$lambda_0));
    $this$buildSerialDescriptor.o1q('JsonLiteral', defer(JsonElementSerializer$descriptor$lambda$lambda_1));
    $this$buildSerialDescriptor.o1q('JsonObject', defer(JsonElementSerializer$descriptor$lambda$lambda_2));
    $this$buildSerialDescriptor.o1q('JsonArray', defer(JsonElementSerializer$descriptor$lambda$lambda_3));
    return Unit_instance;
  }
  function JsonElementSerializer$descriptor$lambda$lambda() {
    return JsonPrimitiveSerializer_getInstance().z41_1;
  }
  function JsonElementSerializer$descriptor$lambda$lambda_0() {
    return JsonNullSerializer_getInstance().a42_1;
  }
  function JsonElementSerializer$descriptor$lambda$lambda_1() {
    return JsonLiteralSerializer_getInstance().b42_1;
  }
  function JsonElementSerializer$descriptor$lambda$lambda_2() {
    return JsonObjectSerializer_getInstance().x41_1;
  }
  function JsonElementSerializer$descriptor$lambda$lambda_3() {
    return JsonArraySerializer_getInstance().c42_1;
  }
  function JsonElementSerializer() {
    JsonElementSerializer_instance = this;
    var tmp = this;
    var tmp_0 = SEALED_getInstance();
    tmp.d42_1 = buildSerialDescriptor('kotlinx.serialization.json.JsonElement', tmp_0, [], JsonElementSerializer$descriptor$lambda);
  }
  protoOf(JsonElementSerializer).d1q = function () {
    return this.d42_1;
  };
  protoOf(JsonElementSerializer).e42 = function (encoder, value) {
    verify(encoder);
    if (value instanceof JsonPrimitive) {
      encoder.e1v(JsonPrimitiveSerializer_getInstance(), value);
    } else {
      if (value instanceof JsonObject) {
        encoder.e1v(JsonObjectSerializer_getInstance(), value);
      } else {
        if (value instanceof JsonArray) {
          encoder.e1v(JsonArraySerializer_getInstance(), value);
        } else {
          noWhenBranchMatchedException();
        }
      }
    }
  };
  protoOf(JsonElementSerializer).e1q = function (encoder, value) {
    return this.e42(encoder, value instanceof JsonElement ? value : THROW_CCE());
  };
  protoOf(JsonElementSerializer).f1q = function (decoder) {
    var input = asJsonDecoder(decoder);
    return input.d41();
  };
  var JsonElementSerializer_instance;
  function JsonElementSerializer_getInstance() {
    if (JsonElementSerializer_instance == null)
      new JsonElementSerializer();
    return JsonElementSerializer_instance;
  }
  function JsonPrimitiveSerializer() {
    JsonPrimitiveSerializer_instance = this;
    this.z41_1 = buildSerialDescriptor('kotlinx.serialization.json.JsonPrimitive', STRING_getInstance(), []);
  }
  protoOf(JsonPrimitiveSerializer).d1q = function () {
    return this.z41_1;
  };
  protoOf(JsonPrimitiveSerializer).f42 = function (encoder, value) {
    verify(encoder);
    var tmp;
    if (value instanceof JsonNull) {
      encoder.e1v(JsonNullSerializer_getInstance(), JsonNull_getInstance());
      tmp = Unit_instance;
    } else {
      var tmp_0 = JsonLiteralSerializer_getInstance();
      encoder.e1v(tmp_0, value instanceof JsonLiteral ? value : THROW_CCE());
      tmp = Unit_instance;
    }
    return tmp;
  };
  protoOf(JsonPrimitiveSerializer).e1q = function (encoder, value) {
    return this.f42(encoder, value instanceof JsonPrimitive ? value : THROW_CCE());
  };
  protoOf(JsonPrimitiveSerializer).f1q = function (decoder) {
    var result = asJsonDecoder(decoder).d41();
    if (!(result instanceof JsonPrimitive))
      throw JsonDecodingException_0(-1, 'Unexpected JSON element, expected JsonPrimitive, had ' + toString(getKClassFromExpression(result)), toString(result));
    return result;
  };
  var JsonPrimitiveSerializer_instance;
  function JsonPrimitiveSerializer_getInstance() {
    if (JsonPrimitiveSerializer_instance == null)
      new JsonPrimitiveSerializer();
    return JsonPrimitiveSerializer_instance;
  }
  function JsonArrayDescriptor() {
    JsonArrayDescriptor_instance = this;
    this.g42_1 = ListSerializer(JsonElementSerializer_getInstance()).d1q();
    this.h42_1 = 'kotlinx.serialization.json.JsonArray';
  }
  protoOf(JsonArrayDescriptor).e1r = function () {
    return this.h42_1;
  };
  protoOf(JsonArrayDescriptor).u1r = function (index) {
    return this.g42_1.u1r(index);
  };
  protoOf(JsonArrayDescriptor).v1r = function (name) {
    return this.g42_1.v1r(name);
  };
  protoOf(JsonArrayDescriptor).w1r = function (index) {
    return this.g42_1.w1r(index);
  };
  protoOf(JsonArrayDescriptor).x1r = function (index) {
    return this.g42_1.x1r(index);
  };
  protoOf(JsonArrayDescriptor).y1r = function (index) {
    return this.g42_1.y1r(index);
  };
  protoOf(JsonArrayDescriptor).q1r = function () {
    return this.g42_1.q1r();
  };
  protoOf(JsonArrayDescriptor).m1r = function () {
    return this.g42_1.m1r();
  };
  protoOf(JsonArrayDescriptor).r1r = function () {
    return this.g42_1.r1r();
  };
  protoOf(JsonArrayDescriptor).s1r = function () {
    return this.g42_1.s1r();
  };
  protoOf(JsonArrayDescriptor).t1r = function () {
    return this.g42_1.t1r();
  };
  var JsonArrayDescriptor_instance;
  function JsonArrayDescriptor_getInstance() {
    if (JsonArrayDescriptor_instance == null)
      new JsonArrayDescriptor();
    return JsonArrayDescriptor_instance;
  }
  function JsonArraySerializer() {
    JsonArraySerializer_instance = this;
    this.c42_1 = JsonArrayDescriptor_getInstance();
  }
  protoOf(JsonArraySerializer).d1q = function () {
    return this.c42_1;
  };
  protoOf(JsonArraySerializer).i42 = function (encoder, value) {
    verify(encoder);
    ListSerializer(JsonElementSerializer_getInstance()).e1q(encoder, value);
  };
  protoOf(JsonArraySerializer).e1q = function (encoder, value) {
    return this.i42(encoder, value instanceof JsonArray ? value : THROW_CCE());
  };
  protoOf(JsonArraySerializer).f1q = function (decoder) {
    verify_0(decoder);
    return new JsonArray(ListSerializer(JsonElementSerializer_getInstance()).f1q(decoder));
  };
  var JsonArraySerializer_instance;
  function JsonArraySerializer_getInstance() {
    if (JsonArraySerializer_instance == null)
      new JsonArraySerializer();
    return JsonArraySerializer_instance;
  }
  function JsonNullSerializer() {
    JsonNullSerializer_instance = this;
    this.a42_1 = buildSerialDescriptor('kotlinx.serialization.json.JsonNull', ENUM_getInstance(), []);
  }
  protoOf(JsonNullSerializer).d1q = function () {
    return this.a42_1;
  };
  protoOf(JsonNullSerializer).j42 = function (encoder, value) {
    verify(encoder);
    encoder.h1u();
  };
  protoOf(JsonNullSerializer).e1q = function (encoder, value) {
    return this.j42(encoder, value instanceof JsonNull ? value : THROW_CCE());
  };
  protoOf(JsonNullSerializer).f1q = function (decoder) {
    verify_0(decoder);
    if (decoder.x1s()) {
      throw new JsonDecodingException("Expected 'null' literal");
    }
    decoder.y1s();
    return JsonNull_getInstance();
  };
  var JsonNullSerializer_instance;
  function JsonNullSerializer_getInstance() {
    if (JsonNullSerializer_instance == null)
      new JsonNullSerializer();
    return JsonNullSerializer_instance;
  }
  function verify(encoder) {
    asJsonEncoder(encoder);
  }
  function verify_0(decoder) {
    asJsonDecoder(decoder);
  }
  function defer(deferred) {
    return new defer$1(deferred);
  }
  function JsonLiteralSerializer() {
    JsonLiteralSerializer_instance = this;
    this.b42_1 = PrimitiveSerialDescriptor('kotlinx.serialization.json.JsonLiteral', STRING_getInstance());
  }
  protoOf(JsonLiteralSerializer).d1q = function () {
    return this.b42_1;
  };
  protoOf(JsonLiteralSerializer).k42 = function (encoder, value) {
    verify(encoder);
    if (value.o41_1) {
      return encoder.q1u(value.q41_1);
    }
    if (!(value.p41_1 == null)) {
      return encoder.s1u(value.p41_1).q1u(value.q41_1);
    }
    var tmp0_safe_receiver = toLongOrNull(value.q41_1);
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      return encoder.m1u(tmp0_safe_receiver);
    }
    var tmp1_safe_receiver = toULongOrNull(value.q41_1);
    var tmp = tmp1_safe_receiver;
    if ((tmp == null ? null : new ULong(tmp)) == null)
      null;
    else {
      var tmp_0 = tmp1_safe_receiver;
      // Inline function 'kotlin.let' call
      var it = (tmp_0 == null ? null : new ULong(tmp_0)).mn_1;
      var tmp_1 = encoder.s1u(serializer_0(Companion_getInstance()).d1q());
      // Inline function 'kotlin.ULong.toLong' call
      var tmp$ret$1 = _ULong___get_data__impl__fggpzb(it);
      tmp_1.m1u(tmp$ret$1);
      return Unit_instance;
    }
    var tmp2_safe_receiver = toDoubleOrNull(value.q41_1);
    if (tmp2_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      return encoder.o1u(tmp2_safe_receiver);
    }
    var tmp3_safe_receiver = toBooleanStrictOrNull(value.q41_1);
    if (tmp3_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      return encoder.i1u(tmp3_safe_receiver);
    }
    encoder.q1u(value.q41_1);
  };
  protoOf(JsonLiteralSerializer).e1q = function (encoder, value) {
    return this.k42(encoder, value instanceof JsonLiteral ? value : THROW_CCE());
  };
  protoOf(JsonLiteralSerializer).f1q = function (decoder) {
    var result = asJsonDecoder(decoder).d41();
    if (!(result instanceof JsonLiteral))
      throw JsonDecodingException_0(-1, 'Unexpected JSON element, expected JsonLiteral, had ' + toString(getKClassFromExpression(result)), toString(result));
    return result;
  };
  var JsonLiteralSerializer_instance;
  function JsonLiteralSerializer_getInstance() {
    if (JsonLiteralSerializer_instance == null)
      new JsonLiteralSerializer();
    return JsonLiteralSerializer_instance;
  }
  function asJsonDecoder(_this__u8e3s4) {
    var tmp0_elvis_lhs = isInterface(_this__u8e3s4, JsonDecoder) ? _this__u8e3s4 : null;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throw IllegalStateException_init_$Create$('This serializer can be used only with Json format.' + ('Expected Decoder to be JsonDecoder, got ' + toString(getKClassFromExpression(_this__u8e3s4))));
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function asJsonEncoder(_this__u8e3s4) {
    var tmp0_elvis_lhs = isInterface(_this__u8e3s4, JsonEncoder) ? _this__u8e3s4 : null;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throw IllegalStateException_init_$Create$('This serializer can be used only with Json format.' + ('Expected Encoder to be JsonEncoder, got ' + toString(getKClassFromExpression(_this__u8e3s4))));
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function _get_original__l7ku1m($this) {
    var tmp0 = $this.l42_1;
    // Inline function 'kotlin.getValue' call
    original$factory();
    return tmp0.w();
  }
  function defer$1($deferred) {
    this.l42_1 = lazy($deferred);
  }
  protoOf(defer$1).e1r = function () {
    return _get_original__l7ku1m(this).e1r();
  };
  protoOf(defer$1).q1r = function () {
    return _get_original__l7ku1m(this).q1r();
  };
  protoOf(defer$1).s1r = function () {
    return _get_original__l7ku1m(this).s1r();
  };
  protoOf(defer$1).u1r = function (index) {
    return _get_original__l7ku1m(this).u1r(index);
  };
  protoOf(defer$1).v1r = function (name) {
    return _get_original__l7ku1m(this).v1r(name);
  };
  protoOf(defer$1).w1r = function (index) {
    return _get_original__l7ku1m(this).w1r(index);
  };
  protoOf(defer$1).x1r = function (index) {
    return _get_original__l7ku1m(this).x1r(index);
  };
  protoOf(defer$1).y1r = function (index) {
    return _get_original__l7ku1m(this).y1r(index);
  };
  function original$factory() {
    return getPropertyCallableRef('original', 1, KProperty1, function (receiver) {
      return _get_original__l7ku1m(receiver);
    }, null);
  }
  function JsonEncoder() {
  }
  function Composer(writer) {
    this.n42_1 = writer;
    this.o42_1 = true;
  }
  protoOf(Composer).p42 = function () {
    this.o42_1 = true;
  };
  protoOf(Composer).q42 = function () {
    return Unit_instance;
  };
  protoOf(Composer).r42 = function () {
    this.o42_1 = false;
  };
  protoOf(Composer).s42 = function () {
    this.o42_1 = false;
  };
  protoOf(Composer).t42 = function () {
    return Unit_instance;
  };
  protoOf(Composer).u42 = function (v) {
    return this.n42_1.v42(v);
  };
  protoOf(Composer).w42 = function (v) {
    return this.n42_1.x42(v);
  };
  protoOf(Composer).y42 = function (v) {
    return this.n42_1.x42(v.toString());
  };
  protoOf(Composer).z42 = function (v) {
    return this.n42_1.x42(v.toString());
  };
  protoOf(Composer).a43 = function (v) {
    return this.n42_1.b43(toLong(v));
  };
  protoOf(Composer).c43 = function (v) {
    return this.n42_1.b43(toLong(v));
  };
  protoOf(Composer).d43 = function (v) {
    return this.n42_1.b43(toLong(v));
  };
  protoOf(Composer).e43 = function (v) {
    return this.n42_1.b43(v);
  };
  protoOf(Composer).f43 = function (v) {
    return this.n42_1.x42(v.toString());
  };
  protoOf(Composer).g43 = function (value) {
    return this.n42_1.h43(value);
  };
  function Composer_0(sb, json) {
    return json.v3y_1.p40_1 ? new ComposerWithPrettyPrint(sb, json) : new Composer(sb);
  }
  function ComposerForUnsignedNumbers(writer, forceQuoting) {
    Composer.call(this, writer);
    this.k43_1 = forceQuoting;
  }
  protoOf(ComposerForUnsignedNumbers).d43 = function (v) {
    if (this.k43_1) {
      // Inline function 'kotlin.toUInt' call
      var tmp$ret$0 = _UInt___init__impl__l7qpdl(v);
      this.g43(UInt__toString_impl_dbgl21(tmp$ret$0));
    } else {
      // Inline function 'kotlin.toUInt' call
      var tmp$ret$1 = _UInt___init__impl__l7qpdl(v);
      this.w42(UInt__toString_impl_dbgl21(tmp$ret$1));
    }
  };
  protoOf(ComposerForUnsignedNumbers).e43 = function (v) {
    if (this.k43_1) {
      // Inline function 'kotlin.toULong' call
      var tmp$ret$0 = _ULong___init__impl__c78o9k(v);
      this.g43(ULong__toString_impl_f9au7k(tmp$ret$0));
    } else {
      // Inline function 'kotlin.toULong' call
      var tmp$ret$1 = _ULong___init__impl__c78o9k(v);
      this.w42(ULong__toString_impl_f9au7k(tmp$ret$1));
    }
  };
  protoOf(ComposerForUnsignedNumbers).a43 = function (v) {
    if (this.k43_1) {
      // Inline function 'kotlin.toUByte' call
      var tmp$ret$0 = _UByte___init__impl__g9hnc4(v);
      this.g43(UByte__toString_impl_v72jg(tmp$ret$0));
    } else {
      // Inline function 'kotlin.toUByte' call
      var tmp$ret$1 = _UByte___init__impl__g9hnc4(v);
      this.w42(UByte__toString_impl_v72jg(tmp$ret$1));
    }
  };
  protoOf(ComposerForUnsignedNumbers).c43 = function (v) {
    if (this.k43_1) {
      // Inline function 'kotlin.toUShort' call
      var tmp$ret$0 = _UShort___init__impl__jigrne(v);
      this.g43(UShort__toString_impl_edaoee(tmp$ret$0));
    } else {
      // Inline function 'kotlin.toUShort' call
      var tmp$ret$1 = _UShort___init__impl__jigrne(v);
      this.w42(UShort__toString_impl_edaoee(tmp$ret$1));
    }
  };
  function ComposerForUnquotedLiterals(writer, forceQuoting) {
    Composer.call(this, writer);
    this.n43_1 = forceQuoting;
  }
  protoOf(ComposerForUnquotedLiterals).g43 = function (value) {
    if (this.n43_1) {
      protoOf(Composer).g43.call(this, value);
    } else {
      protoOf(Composer).w42.call(this, value);
    }
  };
  function ComposerWithPrettyPrint(writer, json) {
    Composer.call(this, writer);
    this.q43_1 = json;
    this.r43_1 = 0;
  }
  protoOf(ComposerWithPrettyPrint).p42 = function () {
    this.o42_1 = true;
    this.r43_1 = this.r43_1 + 1 | 0;
  };
  protoOf(ComposerWithPrettyPrint).q42 = function () {
    this.r43_1 = this.r43_1 - 1 | 0;
  };
  protoOf(ComposerWithPrettyPrint).r42 = function () {
    this.o42_1 = false;
    this.w42('\n');
    // Inline function 'kotlin.repeat' call
    var times = this.r43_1;
    var inductionVariable = 0;
    if (inductionVariable < times)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        this.w42(this.q43_1.v3y_1.r40_1);
      }
       while (inductionVariable < times);
  };
  protoOf(ComposerWithPrettyPrint).s42 = function () {
    if (this.o42_1)
      this.o42_1 = false;
    else {
      this.r42();
    }
  };
  protoOf(ComposerWithPrettyPrint).t42 = function () {
    this.u42(_Char___init__impl__6a9atx(32));
  };
  function readIfAbsent($this, descriptor, index) {
    $this.t43_1 = (!descriptor.y1r(index) && descriptor.x1r(index).m1r());
    return $this.t43_1;
  }
  function JsonElementMarker$readIfAbsent$ref($boundThis) {
    var l = function (p0, p1) {
      return readIfAbsent($boundThis, p0, p1);
    };
    l.callableName = 'readIfAbsent';
    return l;
  }
  function JsonElementMarker(descriptor) {
    var tmp = this;
    tmp.s43_1 = new ElementMarker(descriptor, JsonElementMarker$readIfAbsent$ref(this));
    this.t43_1 = false;
  }
  protoOf(JsonElementMarker).u43 = function (index) {
    this.s43_1.s1z(index);
  };
  protoOf(JsonElementMarker).v43 = function () {
    return this.s43_1.t1z();
  };
  function JsonDecodingException(message) {
    JsonException.call(this, message);
    captureStack(this, JsonDecodingException);
  }
  function JsonDecodingException_0(offset, message, input) {
    return JsonDecodingException_1(offset, message + '\nJSON input: ' + toString(minify(input, offset)));
  }
  function invalidTrailingComma(_this__u8e3s4, entity) {
    entity = entity === VOID ? 'object' : entity;
    _this__u8e3s4.w43('Trailing comma before the end of JSON ' + entity, _this__u8e3s4.n3z_1 - 1 | 0, "Trailing commas are non-complaint JSON and not allowed by default. Use 'allowTrailingCommas = true' in 'Json {}' builder to support them.");
  }
  function throwInvalidFloatingPointDecoded(_this__u8e3s4, result) {
    _this__u8e3s4.x43('Unexpected special floating-point value ' + toString(result) + '. By default, ' + 'non-finite floating point values are prohibited because they do not conform JSON specification', VOID, "It is possible to deserialize them using 'JsonBuilder.allowSpecialFloatingPointValues = true'");
  }
  function JsonEncodingException(message) {
    JsonException.call(this, message);
    captureStack(this, JsonEncodingException);
  }
  function InvalidKeyKindException(keyDescriptor) {
    return new JsonEncodingException("Value of type '" + keyDescriptor.e1r() + "' can't be used in JSON as a key in the map. " + ("It should have either primitive or enum kind, but its kind is '" + keyDescriptor.q1r().toString() + "'.\n") + "Use 'allowStructuredMapKeys = true' in 'Json {}' builder to convert such maps to [key1, value1, key2, value2,...] arrays.");
  }
  function InvalidFloatingPointEncoded(value, key, output) {
    return new JsonEncodingException(unexpectedFpErrorMessage(value, key, output));
  }
  function InvalidFloatingPointDecoded(value, key, output) {
    return JsonDecodingException_1(-1, unexpectedFpErrorMessage(value, key, output));
  }
  function UnknownKeyException(key, input) {
    return JsonDecodingException_1(-1, "Encountered an unknown key '" + key + "'.\n" + "Use 'ignoreUnknownKeys = true' in 'Json {}' builder to ignore unknown keys.\n" + ('Current input: ' + toString(minify(input))));
  }
  function JsonException(message) {
    SerializationException_init_$Init$(message, this);
    captureStack(this, JsonException);
  }
  function JsonDecodingException_1(offset, message) {
    return new JsonDecodingException(offset >= 0 ? 'Unexpected JSON token at offset ' + offset + ': ' + message : message);
  }
  function minify(_this__u8e3s4, offset) {
    offset = offset === VOID ? -1 : offset;
    if (charSequenceLength(_this__u8e3s4) < 200)
      return _this__u8e3s4;
    if (offset === -1) {
      var start = charSequenceLength(_this__u8e3s4) - 60 | 0;
      if (start <= 0)
        return _this__u8e3s4;
      // Inline function 'kotlin.text.substring' call
      var endIndex = charSequenceLength(_this__u8e3s4);
      return '.....' + toString(charSequenceSubSequence(_this__u8e3s4, start, endIndex));
    }
    var start_0 = offset - 30 | 0;
    var end = offset + 30 | 0;
    var prefix = start_0 <= 0 ? '' : '.....';
    var suffix = end >= charSequenceLength(_this__u8e3s4) ? '' : '.....';
    var tmp4 = coerceAtLeast(start_0, 0);
    // Inline function 'kotlin.text.substring' call
    var endIndex_0 = coerceAtMost(end, charSequenceLength(_this__u8e3s4));
    return prefix + toString(charSequenceSubSequence(_this__u8e3s4, tmp4, endIndex_0)) + suffix;
  }
  function unexpectedFpErrorMessage(value, key, output) {
    return 'Unexpected special floating-point value ' + toString(value) + ' with key ' + key + '. By default, ' + 'non-finite floating point values are prohibited because they do not conform JSON specification. ' + "It is possible to deserialize them using 'JsonBuilder.allowSpecialFloatingPointValues = true'\n" + ('Current output: ' + toString(minify(output)));
  }
  function InvalidFloatingPointEncoded_0(value, output) {
    return new JsonEncodingException('Unexpected special floating-point value ' + toString(value) + '. By default, ' + 'non-finite floating point values are prohibited because they do not conform JSON specification. ' + "It is possible to deserialize them using 'JsonBuilder.allowSpecialFloatingPointValues = true'\n" + ('Current output: ' + toString(minify(output))));
  }
  function get_JsonDeserializationNamesKey() {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    return JsonDeserializationNamesKey;
  }
  var JsonDeserializationNamesKey;
  function get_JsonSerializationNamesKey() {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    return JsonSerializationNamesKey;
  }
  var JsonSerializationNamesKey;
  function getJsonNameIndex(_this__u8e3s4, json, name) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    if (decodeCaseInsensitive(json, _this__u8e3s4)) {
      // Inline function 'kotlin.text.lowercase' call
      // Inline function 'kotlin.js.asDynamic' call
      var tmp$ret$1 = name.toLowerCase();
      return getJsonNameIndexSlowPath(_this__u8e3s4, json, tmp$ret$1);
    }
    var strategy = namingStrategy(_this__u8e3s4, json);
    if (!(strategy == null))
      return getJsonNameIndexSlowPath(_this__u8e3s4, json, name);
    var index = _this__u8e3s4.v1r(name);
    if (!(index === -3))
      return index;
    if (!json.v3y_1.w40_1)
      return index;
    return getJsonNameIndexSlowPath(_this__u8e3s4, json, name);
  }
  function getJsonNameIndexOrThrow(_this__u8e3s4, json, name, suffix) {
    suffix = suffix === VOID ? '' : suffix;
    _init_properties_JsonNamesMap_kt__cbbp0k();
    var index = getJsonNameIndex(_this__u8e3s4, json, name);
    if (index === -3)
      throw SerializationException_init_$Create$(_this__u8e3s4.e1r() + " does not contain element with name '" + name + "'" + suffix);
    return index;
  }
  function getJsonElementName(_this__u8e3s4, json, index) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    var strategy = namingStrategy(_this__u8e3s4, json);
    return strategy == null ? _this__u8e3s4.u1r(index) : serializationNamesIndices(_this__u8e3s4, json, strategy)[index];
  }
  function namingStrategy(_this__u8e3s4, json) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    return equals(_this__u8e3s4.q1r(), CLASS_getInstance()) ? json.v3y_1.x40_1 : null;
  }
  function deserializationNamesMap(_this__u8e3s4, descriptor) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    var tmp = get_schemaCache(_this__u8e3s4);
    var tmp_0 = get_JsonDeserializationNamesKey();
    return tmp.z43(descriptor, tmp_0, deserializationNamesMap$lambda(descriptor, _this__u8e3s4));
  }
  function decodeCaseInsensitive(_this__u8e3s4, descriptor) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    return _this__u8e3s4.v3y_1.y40_1 && equals(descriptor.q1r(), ENUM_getInstance());
  }
  function getJsonNameIndexSlowPath(_this__u8e3s4, json, name) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    var tmp0_elvis_lhs = deserializationNamesMap(json, _this__u8e3s4).j2(name);
    return tmp0_elvis_lhs == null ? -3 : tmp0_elvis_lhs;
  }
  function serializationNamesIndices(_this__u8e3s4, json, strategy) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    var tmp = get_schemaCache(json);
    var tmp_0 = get_JsonSerializationNamesKey();
    return tmp.z43(_this__u8e3s4, tmp_0, serializationNamesIndices$lambda(_this__u8e3s4, strategy));
  }
  function buildDeserializationNamesMap(_this__u8e3s4, json) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    // Inline function 'kotlin.collections.mutableMapOf' call
    var builder = LinkedHashMap_init_$Create$();
    var useLowercaseEnums = decodeCaseInsensitive(json, _this__u8e3s4);
    var strategyForClasses = namingStrategy(_this__u8e3s4, json);
    var inductionVariable = 0;
    var last = _this__u8e3s4.s1r();
    if (inductionVariable < last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'kotlin.collections.filterIsInstance' call
        var tmp0 = _this__u8e3s4.w1r(i);
        // Inline function 'kotlin.collections.filterIsInstanceTo' call
        var destination = ArrayList_init_$Create$();
        var _iterator__ex2g4s = tmp0.j();
        while (_iterator__ex2g4s.k()) {
          var element = _iterator__ex2g4s.l();
          if (element instanceof JsonNames) {
            destination.e(element);
          }
        }
        var tmp0_safe_receiver = singleOrNull(destination);
        var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.a44_1;
        if (tmp1_safe_receiver == null)
          null;
        else {
          // Inline function 'kotlin.collections.forEach' call
          var inductionVariable_0 = 0;
          var last_0 = tmp1_safe_receiver.length;
          while (inductionVariable_0 < last_0) {
            var element_0 = tmp1_safe_receiver[inductionVariable_0];
            inductionVariable_0 = inductionVariable_0 + 1 | 0;
            var tmp;
            if (useLowercaseEnums) {
              // Inline function 'kotlin.text.lowercase' call
              // Inline function 'kotlin.js.asDynamic' call
              tmp = element_0.toLowerCase();
            } else {
              tmp = element_0;
            }
            buildDeserializationNamesMap$putOrThrow(builder, _this__u8e3s4, tmp, i);
          }
        }
        var tmp_0;
        if (useLowercaseEnums) {
          // Inline function 'kotlin.text.lowercase' call
          // Inline function 'kotlin.js.asDynamic' call
          tmp_0 = _this__u8e3s4.u1r(i).toLowerCase();
        } else if (!(strategyForClasses == null)) {
          tmp_0 = strategyForClasses.b44(_this__u8e3s4, i, _this__u8e3s4.u1r(i));
        } else {
          tmp_0 = null;
        }
        var nameToPut = tmp_0;
        if (nameToPut == null)
          null;
        else {
          // Inline function 'kotlin.let' call
          buildDeserializationNamesMap$putOrThrow(builder, _this__u8e3s4, nameToPut, i);
        }
      }
       while (inductionVariable < last);
    // Inline function 'kotlin.collections.ifEmpty' call
    var tmp_1;
    if (builder.p()) {
      tmp_1 = emptyMap();
    } else {
      tmp_1 = builder;
    }
    return tmp_1;
  }
  function buildDeserializationNamesMap$putOrThrow(_this__u8e3s4, $this_buildDeserializationNamesMap, name, index) {
    var entity = equals($this_buildDeserializationNamesMap.q1r(), ENUM_getInstance()) ? 'enum value' : 'property';
    // Inline function 'kotlin.collections.contains' call
    // Inline function 'kotlin.collections.containsKey' call
    if ((isInterface(_this__u8e3s4, KtMap) ? _this__u8e3s4 : THROW_CCE()).h2(name)) {
      throw new JsonException("The suggested name '" + name + "' for " + entity + ' ' + $this_buildDeserializationNamesMap.u1r(index) + ' is already one of the names for ' + entity + ' ' + ($this_buildDeserializationNamesMap.u1r(getValue(_this__u8e3s4, name)) + ' in ' + toString($this_buildDeserializationNamesMap)));
    }
    // Inline function 'kotlin.collections.set' call
    _this__u8e3s4.m2(name, index);
  }
  function deserializationNamesMap$lambda($descriptor, $this_deserializationNamesMap) {
    return function () {
      return buildDeserializationNamesMap($descriptor, $this_deserializationNamesMap);
    };
  }
  function serializationNamesIndices$lambda($this_serializationNamesIndices, $strategy) {
    return function () {
      var tmp = 0;
      var tmp_0 = $this_serializationNamesIndices.s1r();
      // Inline function 'kotlin.arrayOfNulls' call
      var tmp_1 = Array(tmp_0);
      while (tmp < tmp_0) {
        var tmp_2 = tmp;
        var baseName = $this_serializationNamesIndices.u1r(tmp_2);
        tmp_1[tmp_2] = $strategy.b44($this_serializationNamesIndices, tmp_2, baseName);
        tmp = tmp + 1 | 0;
      }
      return tmp_1;
    };
  }
  var properties_initialized_JsonNamesMap_kt_ljpf42;
  function _init_properties_JsonNamesMap_kt__cbbp0k() {
    if (!properties_initialized_JsonNamesMap_kt_ljpf42) {
      properties_initialized_JsonNamesMap_kt_ljpf42 = true;
      JsonDeserializationNamesKey = new Key();
      JsonSerializationNamesKey = new Key();
    }
  }
  function Tombstone() {
  }
  var Tombstone_instance;
  function Tombstone_getInstance() {
    return Tombstone_instance;
  }
  function resize($this) {
    var newSize = imul($this.e44_1, 2);
    $this.c44_1 = copyOf($this.c44_1, newSize);
    $this.d44_1 = copyOf_0($this.d44_1, newSize);
  }
  function JsonPath() {
    var tmp = this;
    // Inline function 'kotlin.arrayOfNulls' call
    tmp.c44_1 = Array(8);
    var tmp_0 = this;
    var tmp_1 = 0;
    var tmp_2 = new Int32Array(8);
    while (tmp_1 < 8) {
      tmp_2[tmp_1] = -1;
      tmp_1 = tmp_1 + 1 | 0;
    }
    tmp_0.d44_1 = tmp_2;
    this.e44_1 = -1;
  }
  protoOf(JsonPath).f44 = function (sd) {
    this.e44_1 = this.e44_1 + 1 | 0;
    var depth = this.e44_1;
    if (depth === this.c44_1.length) {
      resize(this);
    }
    this.c44_1[depth] = sd;
  };
  protoOf(JsonPath).g44 = function (index) {
    this.d44_1[this.e44_1] = index;
  };
  protoOf(JsonPath).h44 = function (key) {
    var tmp;
    if (!(this.d44_1[this.e44_1] === -2)) {
      this.e44_1 = this.e44_1 + 1 | 0;
      tmp = this.e44_1 === this.c44_1.length;
    } else {
      tmp = false;
    }
    if (tmp) {
      resize(this);
    }
    this.c44_1[this.e44_1] = key;
    this.d44_1[this.e44_1] = -2;
  };
  protoOf(JsonPath).i44 = function () {
    if (this.d44_1[this.e44_1] === -2) {
      this.c44_1[this.e44_1] = Tombstone_instance;
    }
  };
  protoOf(JsonPath).j44 = function () {
    var depth = this.e44_1;
    if (this.d44_1[depth] === -2) {
      this.d44_1[depth] = -1;
      this.e44_1 = this.e44_1 - 1 | 0;
    }
    if (!(this.e44_1 === -1)) {
      this.e44_1 = this.e44_1 - 1 | 0;
    }
  };
  protoOf(JsonPath).k44 = function () {
    // Inline function 'kotlin.text.buildString' call
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$();
    this_0.g8('$');
    // Inline function 'kotlin.repeat' call
    var times = this.e44_1 + 1 | 0;
    var inductionVariable = 0;
    if (inductionVariable < times)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var element = this.c44_1[index];
        if (!(element == null) ? isInterface(element, SerialDescriptor) : false) {
          if (equals(element.q1r(), LIST_getInstance())) {
            if (!(this.d44_1[index] === -1)) {
              this_0.g8('[');
              this_0.sc(this.d44_1[index]);
              this_0.g8(']');
            }
          } else {
            var idx = this.d44_1[index];
            if (idx >= 0) {
              this_0.g8('.');
              this_0.g8(element.u1r(idx));
            }
          }
        } else {
          if (!(element === Tombstone_instance)) {
            this_0.g8('[');
            this_0.g8("'");
            this_0.f8(element);
            this_0.g8("'");
            this_0.g8(']');
          }
        }
      }
       while (inductionVariable < times);
    return this_0.toString();
  };
  protoOf(JsonPath).toString = function () {
    return this.k44();
  };
  function encodeByWriter(json, writer, serializer, value) {
    var tmp = WriteMode_OBJ_getInstance();
    // Inline function 'kotlin.arrayOfNulls' call
    var size = get_entries().m();
    var tmp$ret$0 = Array(size);
    var encoder = StreamingJsonEncoder_init_$Create$(writer, json, tmp, tmp$ret$0);
    encoder.e1v(serializer, value);
  }
  function readObject($this) {
    // Inline function 'kotlinx.serialization.json.internal.JsonTreeReader.readObjectImpl' call
    var lastToken = $this.u44_1.y44(6);
    if ($this.u44_1.z44() === 4) {
      $this.u44_1.x43('Unexpected leading comma');
    }
    // Inline function 'kotlin.collections.linkedMapOf' call
    var result = LinkedHashMap_init_$Create$();
    $l$loop: while ($this.u44_1.a45()) {
      var key = $this.v44_1 ? $this.u44_1.c45() : $this.u44_1.b45();
      $this.u44_1.y44(5);
      var element = $this.d45();
      // Inline function 'kotlin.collections.set' call
      result.m2(key, element);
      lastToken = $this.u44_1.e45();
      var tmp0_subject = lastToken;
      if (tmp0_subject !== 4)
        if (tmp0_subject === 7)
          break $l$loop;
        else {
          $this.u44_1.x43('Expected end of the object or comma');
        }
    }
    if (lastToken === 6) {
      $this.u44_1.y44(7);
    } else if (lastToken === 4) {
      if (!$this.w44_1) {
        invalidTrailingComma($this.u44_1);
      }
      $this.u44_1.y44(7);
    }
    return new JsonObject(result);
  }
  function readObject_0($this, _this__u8e3s4, $completion) {
    var tmp = new $readObjectCOROUTINE$0($this, _this__u8e3s4, $completion);
    tmp.d9_1 = Unit_instance;
    tmp.e9_1 = null;
    return tmp.j9();
  }
  function readArray($this) {
    var lastToken = $this.u44_1.e45();
    if ($this.u44_1.z44() === 4) {
      $this.u44_1.x43('Unexpected leading comma');
    }
    // Inline function 'kotlin.collections.arrayListOf' call
    var result = ArrayList_init_$Create$();
    while ($this.u44_1.a45()) {
      var element = $this.d45();
      result.e(element);
      lastToken = $this.u44_1.e45();
      if (!(lastToken === 4)) {
        var tmp0 = $this.u44_1;
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.require' call
        var condition = lastToken === 9;
        var position = tmp0.n3z_1;
        if (!condition) {
          var tmp$ret$1 = 'Expected end of the array or comma';
          tmp0.x43(tmp$ret$1, position);
        }
      }
    }
    if (lastToken === 8) {
      $this.u44_1.y44(9);
    } else if (lastToken === 4) {
      if (!$this.w44_1) {
        invalidTrailingComma($this.u44_1, 'array');
      }
      $this.u44_1.y44(9);
    }
    return new JsonArray(result);
  }
  function readValue($this, isString) {
    var tmp;
    if ($this.v44_1 || !isString) {
      tmp = $this.u44_1.c45();
    } else {
      tmp = $this.u44_1.b45();
    }
    var string = tmp;
    if (!isString && string === 'null')
      return JsonNull_getInstance();
    return new JsonLiteral(string, isString);
  }
  function readDeepRecursive($this) {
    return invoke(new DeepRecursiveFunction(JsonTreeReader$readDeepRecursive$slambda_0($this, null)), Unit_instance);
  }
  function JsonTreeReader$readDeepRecursive$slambda(this$0, resultContinuation) {
    this.c46_1 = this$0;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(JsonTreeReader$readDeepRecursive$slambda).h46 = function ($this$DeepRecursiveFunction, it, $completion) {
    var tmp = this.i46($this$DeepRecursiveFunction, it, $completion);
    tmp.d9_1 = Unit_instance;
    tmp.e9_1 = null;
    return tmp.j9();
  };
  protoOf(JsonTreeReader$readDeepRecursive$slambda).s9 = function (p1, p2, $completion) {
    var tmp = p1 instanceof DeepRecursiveScope ? p1 : THROW_CCE();
    return this.h46(tmp, p2 instanceof Unit ? p2 : THROW_CCE(), $completion);
  };
  protoOf(JsonTreeReader$readDeepRecursive$slambda).j9 = function () {
    var suspendResult = this.d9_1;
    $sm: do
      try {
        var tmp = this.b9_1;
        switch (tmp) {
          case 0:
            this.c9_1 = 3;
            this.f46_1 = this.c46_1.u44_1.z44();
            if (this.f46_1 === 1) {
              this.g46_1 = readValue(this.c46_1, true);
              this.b9_1 = 2;
              continue $sm;
            } else {
              if (this.f46_1 === 0) {
                this.g46_1 = readValue(this.c46_1, false);
                this.b9_1 = 2;
                continue $sm;
              } else {
                if (this.f46_1 === 6) {
                  this.b9_1 = 1;
                  suspendResult = readObject_0(this.c46_1, this.d46_1, this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  if (this.f46_1 === 8) {
                    this.g46_1 = readArray(this.c46_1);
                    this.b9_1 = 2;
                    continue $sm;
                  } else {
                    var tmp_0 = this;
                    this.c46_1.u44_1.x43("Can't begin reading element, unexpected token");
                  }
                }
              }
            }

            break;
          case 1:
            this.g46_1 = suspendResult;
            this.b9_1 = 2;
            continue $sm;
          case 2:
            return this.g46_1;
          case 3:
            throw this.e9_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.c9_1 === 3) {
          throw e;
        } else {
          this.b9_1 = this.c9_1;
          this.e9_1 = e;
        }
      }
     while (true);
  };
  protoOf(JsonTreeReader$readDeepRecursive$slambda).i46 = function ($this$DeepRecursiveFunction, it, completion) {
    var i = new JsonTreeReader$readDeepRecursive$slambda(this.c46_1, completion);
    i.d46_1 = $this$DeepRecursiveFunction;
    i.e46_1 = it;
    return i;
  };
  function JsonTreeReader$readDeepRecursive$slambda_0(this$0, resultContinuation) {
    var i = new JsonTreeReader$readDeepRecursive$slambda(this$0, resultContinuation);
    var l = function ($this$DeepRecursiveFunction, it, $completion) {
      return i.h46($this$DeepRecursiveFunction, it, $completion);
    };
    l.$arity = 2;
    return l;
  }
  function $readObjectCOROUTINE$0(_this__u8e3s4, _this__u8e3s4_0, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.n45_1 = _this__u8e3s4;
    this.o45_1 = _this__u8e3s4_0;
  }
  protoOf($readObjectCOROUTINE$0).j9 = function () {
    var suspendResult = this.d9_1;
    $sm: do
      try {
        var tmp = this.b9_1;
        switch (tmp) {
          case 0:
            this.c9_1 = 5;
            var tmp_0 = this;
            tmp_0.p45_1 = this.n45_1;
            this.q45_1 = this.p45_1;
            this.r45_1 = this.q45_1.u44_1.y44(6);
            if (this.q45_1.u44_1.z44() === 4) {
              this.q45_1.u44_1.x43('Unexpected leading comma');
            }

            var tmp_1 = this;
            tmp_1.s45_1 = LinkedHashMap_init_$Create$();
            this.b9_1 = 1;
            continue $sm;
          case 1:
            if (!this.q45_1.u44_1.a45()) {
              this.b9_1 = 4;
              continue $sm;
            }

            this.t45_1 = this.q45_1.v44_1 ? this.q45_1.u44_1.c45() : this.q45_1.u44_1.b45();
            this.q45_1.u44_1.y44(5);
            this.b9_1 = 2;
            suspendResult = this.o45_1.ol(Unit_instance, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            var element = suspendResult;
            var tmp0 = this.s45_1;
            var key = this.t45_1;
            tmp0.m2(key, element);
            this.r45_1 = this.q45_1.u44_1.e45();
            var tmp0_subject = this.r45_1;
            if (tmp0_subject === 4) {
              this.b9_1 = 3;
              continue $sm;
            } else {
              if (tmp0_subject === 7) {
                this.b9_1 = 4;
                continue $sm;
              } else {
                this.q45_1.u44_1.x43('Expected end of the object or comma');
              }
            }

            break;
          case 3:
            this.b9_1 = 1;
            continue $sm;
          case 4:
            if (this.r45_1 === 6) {
              this.q45_1.u44_1.y44(7);
            } else if (this.r45_1 === 4) {
              if (!this.q45_1.w44_1) {
                invalidTrailingComma(this.q45_1.u44_1);
              }
              this.q45_1.u44_1.y44(7);
            }

            return new JsonObject(this.s45_1);
          case 5:
            throw this.e9_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.c9_1 === 5) {
          throw e;
        } else {
          this.b9_1 = this.c9_1;
          this.e9_1 = e;
        }
      }
     while (true);
  };
  function JsonTreeReader(configuration, lexer) {
    this.u44_1 = lexer;
    this.v44_1 = configuration.n40_1;
    this.w44_1 = configuration.z40_1;
    this.x44_1 = 0;
  }
  protoOf(JsonTreeReader).d45 = function () {
    var token = this.u44_1.z44();
    var tmp;
    if (token === 1) {
      tmp = readValue(this, true);
    } else if (token === 0) {
      tmp = readValue(this, false);
    } else if (token === 6) {
      var tmp_0;
      this.x44_1 = this.x44_1 + 1 | 0;
      if (this.x44_1 === 200) {
        tmp_0 = readDeepRecursive(this);
      } else {
        tmp_0 = readObject(this);
      }
      var result = tmp_0;
      this.x44_1 = this.x44_1 - 1 | 0;
      tmp = result;
    } else if (token === 8) {
      tmp = readArray(this);
    } else {
      this.u44_1.x43('Cannot read Json element because of unexpected ' + tokenDescription(token));
    }
    return tmp;
  };
  function classDiscriminator(_this__u8e3s4, json) {
    var _iterator__ex2g4s = _this__u8e3s4.t1r().j();
    while (_iterator__ex2g4s.k()) {
      var annotation = _iterator__ex2g4s.l();
      if (annotation instanceof JsonClassDiscriminator)
        return annotation.j46_1;
    }
    return json.v3y_1.u40_1;
  }
  function throwJsonElementPolymorphicException(serialName, element) {
    throw new JsonEncodingException('Class with serial name ' + serialName + ' cannot be serialized polymorphically because it is represented as ' + getKClassFromExpression(element).za() + '. Make sure that its JsonTransformingSerializer returns JsonObject, so class discriminator can be added to it.');
  }
  function validateIfSealed(serializer, actualSerializer, classDiscriminator) {
    if (!(serializer instanceof SealedClassSerializer))
      return Unit_instance;
    if (jsonCachedSerialNames(actualSerializer.d1q()).r(classDiscriminator)) {
      var baseName = serializer.d1q().e1r();
      var actualName = actualSerializer.d1q().e1r();
      // Inline function 'kotlin.error' call
      var message = "Sealed class '" + actualName + "' cannot be serialized as base class '" + baseName + "' because" + (" it has property name that conflicts with JSON class discriminator '" + classDiscriminator + "'. ") + 'You can either change class discriminator in JsonConfiguration, ' + 'rename property with @SerialName annotation or fall back to array polymorphism';
      throw IllegalStateException_init_$Create$(toString(message));
    }
  }
  function checkKind(kind) {
    if (kind instanceof ENUM) {
      // Inline function 'kotlin.error' call
      var message = "Enums cannot be serialized polymorphically with 'type' parameter. You can use 'JsonBuilder.useArrayPolymorphism' instead";
      throw IllegalStateException_init_$Create$(toString(message));
    }
    if (kind instanceof PrimitiveKind) {
      // Inline function 'kotlin.error' call
      var message_0 = "Primitives cannot be serialized polymorphically with 'type' parameter. You can use 'JsonBuilder.useArrayPolymorphism' instead";
      throw IllegalStateException_init_$Create$(toString(message_0));
    }
    if (kind instanceof PolymorphicKind) {
      // Inline function 'kotlin.error' call
      var message_1 = 'Actual serializer for polymorphic cannot be polymorphic itself';
      throw IllegalStateException_init_$Create$(toString(message_1));
    }
  }
  function access$validateIfSealed$tPolymorphicKt(serializer, actualSerializer, classDiscriminator) {
    return validateIfSealed(serializer, actualSerializer, classDiscriminator);
  }
  function checkKind_0($this, descriptor, actualClass) {
    var kind = descriptor.q1r();
    var tmp;
    if (kind instanceof PolymorphicKind) {
      tmp = true;
    } else {
      tmp = equals(kind, CONTEXTUAL_getInstance());
    }
    if (tmp) {
      throw IllegalArgumentException_init_$Create$('Serializer for ' + actualClass.za() + " can't be registered as a subclass for polymorphic serialization " + ('because its kind ' + kind.toString() + ' is not concrete. To work with multiple hierarchies, register it as a base class.'));
    }
    if ($this.k46_1)
      return Unit_instance;
    var tmp_0;
    var tmp_1;
    if (equals(kind, LIST_getInstance()) || equals(kind, MAP_getInstance())) {
      tmp_1 = true;
    } else {
      tmp_1 = kind instanceof PrimitiveKind;
    }
    if (tmp_1) {
      tmp_0 = true;
    } else {
      tmp_0 = kind instanceof ENUM;
    }
    if (tmp_0) {
      throw IllegalArgumentException_init_$Create$('Serializer for ' + actualClass.za() + ' of kind ' + kind.toString() + ' cannot be serialized polymorphically with class discriminator.');
    }
  }
  function checkDiscriminatorCollisions($this, descriptor, actualClass) {
    var inductionVariable = 0;
    var last = descriptor.s1r();
    if (inductionVariable < last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var name = descriptor.u1r(i);
        if (name === $this.l46_1) {
          throw IllegalArgumentException_init_$Create$('Polymorphic serializer for ' + toString(actualClass) + " has property '" + name + "' that conflicts " + 'with JSON class discriminator. You can either change class discriminator in JsonConfiguration, ' + 'rename property with @SerialName annotation ' + 'or fall back to array polymorphism');
        }
      }
       while (inductionVariable < last);
  }
  function PolymorphismValidator(useArrayPolymorphism, discriminator) {
    this.k46_1 = useArrayPolymorphism;
    this.l46_1 = discriminator;
  }
  protoOf(PolymorphismValidator).w2a = function (kClass, provider) {
  };
  protoOf(PolymorphismValidator).z2a = function (baseClass, actualClass, actualSerializer) {
    var descriptor = actualSerializer.d1q();
    checkKind_0(this, descriptor, actualClass);
    if (!this.k46_1) {
      checkDiscriminatorCollisions(this, descriptor, actualClass);
    }
  };
  protoOf(PolymorphismValidator).a2b = function (baseClass, defaultSerializerProvider) {
  };
  protoOf(PolymorphismValidator).b2b = function (baseClass, defaultDeserializerProvider) {
  };
  function Key() {
  }
  function DescriptorSchemaCache() {
    this.y43_1 = createMapForCache(16);
  }
  protoOf(DescriptorSchemaCache).m46 = function (descriptor, key, value) {
    // Inline function 'kotlin.collections.getOrPut' call
    var this_0 = this.y43_1;
    var value_0 = this_0.j2(descriptor);
    var tmp;
    if (value_0 == null) {
      var answer = createMapForCache(2);
      this_0.m2(descriptor, answer);
      tmp = answer;
    } else {
      tmp = value_0;
    }
    var tmp2 = tmp;
    var tmp3 = key instanceof Key ? key : THROW_CCE();
    // Inline function 'kotlin.collections.set' call
    var value_1 = !(value == null) ? value : THROW_CCE();
    tmp2.m2(tmp3, value_1);
  };
  protoOf(DescriptorSchemaCache).z43 = function (descriptor, key, defaultValue) {
    var tmp0_safe_receiver = this.n46(descriptor, key);
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      return tmp0_safe_receiver;
    }
    var value = defaultValue();
    this.m46(descriptor, key, value);
    return value;
  };
  protoOf(DescriptorSchemaCache).n46 = function (descriptor, key) {
    var tmp0_safe_receiver = this.y43_1.j2(descriptor);
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      tmp = tmp0_safe_receiver.j2(key instanceof Key ? key : THROW_CCE());
    }
    var tmp_0 = tmp;
    return !(tmp_0 == null) ? tmp_0 : null;
  };
  function DiscriminatorHolder(discriminatorToSkip) {
    this.o46_1 = discriminatorToSkip;
  }
  function trySkip($this, _this__u8e3s4, unknownKey) {
    if (_this__u8e3s4 == null)
      return false;
    if (_this__u8e3s4.o46_1 === unknownKey) {
      _this__u8e3s4.o46_1 = null;
      return true;
    }
    return false;
  }
  function skipLeftoverElements($this, descriptor) {
    while (!($this.d1u(descriptor) === -1)) {
    }
  }
  function checkLeadingComma($this) {
    if ($this.h3z_1.z44() === 4) {
      $this.h3z_1.x43('Unexpected leading comma');
    }
  }
  function decodeMapIndex($this) {
    var hasComma = false;
    var decodingKey = !(($this.j3z_1 % 2 | 0) === 0);
    if (decodingKey) {
      if (!($this.j3z_1 === -1)) {
        hasComma = $this.h3z_1.q46();
      }
    } else {
      $this.h3z_1.p46(_Char___init__impl__6a9atx(58));
    }
    var tmp;
    if ($this.h3z_1.a45()) {
      if (decodingKey) {
        if ($this.j3z_1 === -1) {
          var tmp0 = $this.h3z_1;
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.require' call
          var condition = !hasComma;
          var position = tmp0.n3z_1;
          if (!condition) {
            var tmp$ret$0 = 'Unexpected leading comma';
            tmp0.x43(tmp$ret$0, position);
          }
        } else {
          var tmp3 = $this.h3z_1;
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.require' call
          var condition_0 = hasComma;
          var position_0 = tmp3.n3z_1;
          if (!condition_0) {
            var tmp$ret$2 = 'Expected comma after the key-value pair';
            tmp3.x43(tmp$ret$2, position_0);
          }
        }
      }
      $this.j3z_1 = $this.j3z_1 + 1 | 0;
      tmp = $this.j3z_1;
    } else {
      if (hasComma && !$this.f3z_1.v3y_1.z40_1) {
        invalidTrailingComma($this.h3z_1);
      }
      tmp = -1;
    }
    return tmp;
  }
  function coerceInputValue($this, descriptor, index) {
    var tmp0 = $this.f3z_1;
    var tmp$ret$1;
    $l$block_2: {
      // Inline function 'kotlinx.serialization.json.internal.tryCoerceValue' call
      var isOptional = descriptor.y1r(index);
      var elementDescriptor = descriptor.x1r(index);
      var tmp;
      if (isOptional && !elementDescriptor.m1r()) {
        tmp = $this.h3z_1.r46(true);
      } else {
        tmp = false;
      }
      if (tmp) {
        tmp$ret$1 = true;
        break $l$block_2;
      }
      if (equals(elementDescriptor.q1r(), ENUM_getInstance())) {
        var tmp_0;
        if (elementDescriptor.m1r()) {
          tmp_0 = $this.h3z_1.r46(false);
        } else {
          tmp_0 = false;
        }
        if (tmp_0) {
          tmp$ret$1 = false;
          break $l$block_2;
        }
        var tmp0_elvis_lhs = $this.h3z_1.s46($this.l3z_1.n40_1);
        var tmp_1;
        if (tmp0_elvis_lhs == null) {
          tmp$ret$1 = false;
          break $l$block_2;
        } else {
          tmp_1 = tmp0_elvis_lhs;
        }
        var enumValue = tmp_1;
        var enumIndex = getJsonNameIndex(elementDescriptor, tmp0, enumValue);
        var coerceToNull = !tmp0.v3y_1.q40_1 && elementDescriptor.m1r();
        if (enumIndex === -3 && (isOptional || coerceToNull)) {
          $this.h3z_1.b45();
          tmp$ret$1 = true;
          break $l$block_2;
        }
      }
      tmp$ret$1 = false;
    }
    return tmp$ret$1;
  }
  function decodeObjectIndex($this, descriptor) {
    var hasComma = $this.h3z_1.q46();
    while ($this.h3z_1.a45()) {
      hasComma = false;
      var key = decodeStringKey($this);
      $this.h3z_1.p46(_Char___init__impl__6a9atx(58));
      var index = getJsonNameIndex(descriptor, $this.f3z_1, key);
      var tmp;
      if (!(index === -3)) {
        var tmp_0;
        if ($this.l3z_1.s40_1 && coerceInputValue($this, descriptor, index)) {
          hasComma = $this.h3z_1.q46();
          tmp_0 = false;
        } else {
          var tmp0_safe_receiver = $this.m3z_1;
          if (tmp0_safe_receiver == null)
            null;
          else {
            tmp0_safe_receiver.u43(index);
          }
          return index;
        }
        tmp = tmp_0;
      } else {
        tmp = true;
      }
      var isUnknown = tmp;
      if (isUnknown) {
        hasComma = handleUnknown($this, key);
      }
    }
    if (hasComma && !$this.f3z_1.v3y_1.z40_1) {
      invalidTrailingComma($this.h3z_1);
    }
    var tmp1_safe_receiver = $this.m3z_1;
    var tmp2_elvis_lhs = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.v43();
    return tmp2_elvis_lhs == null ? -1 : tmp2_elvis_lhs;
  }
  function handleUnknown($this, key) {
    if ($this.l3z_1.m40_1 || trySkip($this, $this.k3z_1, key)) {
      $this.h3z_1.u46($this.l3z_1.n40_1);
    } else {
      $this.h3z_1.t46(key);
    }
    return $this.h3z_1.q46();
  }
  function decodeListIndex($this) {
    var hasComma = $this.h3z_1.q46();
    var tmp;
    if ($this.h3z_1.a45()) {
      if (!($this.j3z_1 === -1) && !hasComma) {
        $this.h3z_1.x43('Expected end of the array or comma');
      }
      $this.j3z_1 = $this.j3z_1 + 1 | 0;
      tmp = $this.j3z_1;
    } else {
      if (hasComma && !$this.f3z_1.v3y_1.z40_1) {
        invalidTrailingComma($this.h3z_1, 'array');
      }
      tmp = -1;
    }
    return tmp;
  }
  function decodeStringKey($this) {
    var tmp;
    if ($this.l3z_1.n40_1) {
      tmp = $this.h3z_1.w46();
    } else {
      tmp = $this.h3z_1.v46();
    }
    return tmp;
  }
  function StreamingJsonDecoder(json, mode, lexer, descriptor, discriminatorHolder) {
    AbstractDecoder.call(this);
    this.f3z_1 = json;
    this.g3z_1 = mode;
    this.h3z_1 = lexer;
    this.i3z_1 = this.f3z_1.b1u();
    this.j3z_1 = -1;
    this.k3z_1 = discriminatorHolder;
    this.l3z_1 = this.f3z_1.v3y_1;
    this.m3z_1 = this.l3z_1.q40_1 ? null : new JsonElementMarker(descriptor);
  }
  protoOf(StreamingJsonDecoder).c41 = function () {
    return this.f3z_1;
  };
  protoOf(StreamingJsonDecoder).b1u = function () {
    return this.i3z_1;
  };
  protoOf(StreamingJsonDecoder).d41 = function () {
    return (new JsonTreeReader(this.f3z_1.v3y_1, this.h3z_1)).d45();
  };
  protoOf(StreamingJsonDecoder).l1t = function (deserializer) {
    try {
      var tmp;
      if (!(deserializer instanceof AbstractPolymorphicSerializer)) {
        tmp = true;
      } else {
        tmp = this.f3z_1.v3y_1.t40_1;
      }
      if (tmp) {
        return deserializer.f1q(this);
      }
      var discriminator = classDiscriminator(deserializer.d1q(), this.f3z_1);
      var tmp0_elvis_lhs = this.h3z_1.x46(discriminator, this.l3z_1.n40_1);
      var tmp_0;
      if (tmp0_elvis_lhs == null) {
        var tmp1 = isInterface(deserializer, DeserializationStrategy) ? deserializer : THROW_CCE();
        var tmp$ret$0;
        $l$block: {
          // Inline function 'kotlinx.serialization.json.internal.decodeSerializableValuePolymorphic' call
          var tmp_1;
          if (!(tmp1 instanceof AbstractPolymorphicSerializer)) {
            tmp_1 = true;
          } else {
            tmp_1 = this.c41().v3y_1.t40_1;
          }
          if (tmp_1) {
            tmp$ret$0 = tmp1.f1q(this);
            break $l$block;
          }
          var discriminator_0 = classDiscriminator(tmp1.d1q(), this.c41());
          var tmp0 = this.d41();
          // Inline function 'kotlinx.serialization.json.internal.cast' call
          var serialName = tmp1.d1q().e1r();
          if (!(tmp0 instanceof JsonObject)) {
            var tmp_2 = getKClass(JsonObject).za();
            var tmp_3 = getKClassFromExpression(tmp0).za();
            var tmp$ret$1 = this.h3z_1.o3z_1.k44();
            throw JsonDecodingException_0(-1, 'Expected ' + tmp_2 + ', but had ' + tmp_3 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$1, toString(tmp0));
          }
          var jsonTree = tmp0;
          var tmp0_safe_receiver = jsonTree.de(discriminator_0);
          var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : get_jsonPrimitive(tmp0_safe_receiver);
          var type = tmp1_safe_receiver == null ? null : get_contentOrNull(tmp1_safe_receiver);
          var tmp_4;
          try {
            tmp_4 = findPolymorphicSerializer(tmp1, this, type);
          } catch ($p) {
            var tmp_5;
            if ($p instanceof SerializationException) {
              var it = $p;
              throw JsonDecodingException_0(-1, ensureNotNull(it.message), jsonTree.toString());
            } else {
              throw $p;
            }
          }
          var tmp_6 = tmp_4;
          var actualSerializer = isInterface(tmp_6, DeserializationStrategy) ? tmp_6 : THROW_CCE();
          tmp$ret$0 = readPolymorphicJson(this.c41(), discriminator_0, jsonTree, actualSerializer);
        }
        return tmp$ret$0;
      } else {
        tmp_0 = tmp0_elvis_lhs;
      }
      var type_0 = tmp_0;
      var tmp_7;
      try {
        tmp_7 = findPolymorphicSerializer(deserializer, this, type_0);
      } catch ($p) {
        var tmp_8;
        if ($p instanceof SerializationException) {
          var it_0 = $p;
          var message = removeSuffix(substringBefore(ensureNotNull(it_0.message), _Char___init__impl__6a9atx(10)), '.');
          var hint = substringAfter(ensureNotNull(it_0.message), _Char___init__impl__6a9atx(10), '');
          this.h3z_1.x43(message, VOID, hint);
        } else {
          throw $p;
        }
        tmp_7 = tmp_8;
      }
      var tmp_9 = tmp_7;
      var actualSerializer_0 = isInterface(tmp_9, DeserializationStrategy) ? tmp_9 : THROW_CCE();
      this.k3z_1 = new DiscriminatorHolder(discriminator);
      return actualSerializer_0.f1q(this);
    } catch ($p) {
      if ($p instanceof MissingFieldException) {
        var e = $p;
        if (contains_0(ensureNotNull(e.message), 'at path'))
          throw e;
        throw new MissingFieldException(e.g1r_1, plus(e.message, ' at path: ') + this.h3z_1.o3z_1.k44(), e);
      } else {
        throw $p;
      }
    }
  };
  protoOf(StreamingJsonDecoder).m1t = function (descriptor) {
    var newMode = switchMode(this.f3z_1, descriptor);
    this.h3z_1.o3z_1.f44(descriptor);
    this.h3z_1.p46(newMode.a47_1);
    checkLeadingComma(this);
    var tmp;
    switch (newMode.q2_1) {
      case 1:
      case 2:
      case 3:
        tmp = new StreamingJsonDecoder(this.f3z_1, newMode, this.h3z_1, descriptor, this.k3z_1);
        break;
      default:
        var tmp_0;
        if (this.g3z_1.equals(newMode) && this.f3z_1.v3y_1.q40_1) {
          tmp_0 = this;
        } else {
          tmp_0 = new StreamingJsonDecoder(this.f3z_1, newMode, this.h3z_1, descriptor, this.k3z_1);
        }

        tmp = tmp_0;
        break;
    }
    return tmp;
  };
  protoOf(StreamingJsonDecoder).n1t = function (descriptor) {
    if (this.f3z_1.v3y_1.m40_1 && descriptor.s1r() === 0) {
      skipLeftoverElements(this, descriptor);
    }
    if (this.h3z_1.q46() && !this.f3z_1.v3y_1.z40_1) {
      invalidTrailingComma(this.h3z_1, '');
    }
    this.h3z_1.p46(this.g3z_1.b47_1);
    this.h3z_1.o3z_1.j44();
  };
  protoOf(StreamingJsonDecoder).x1s = function () {
    var tmp;
    var tmp0_safe_receiver = this.m3z_1;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.t43_1;
    if (!(tmp1_elvis_lhs == null ? false : tmp1_elvis_lhs)) {
      tmp = !this.h3z_1.c47();
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(StreamingJsonDecoder).y1s = function () {
    return null;
  };
  protoOf(StreamingJsonDecoder).y1t = function (descriptor, index, deserializer, previousValue) {
    var isMapKey = this.g3z_1.equals(WriteMode_MAP_getInstance()) && (index & 1) === 0;
    if (isMapKey) {
      this.h3z_1.o3z_1.i44();
    }
    var value = protoOf(AbstractDecoder).y1t.call(this, descriptor, index, deserializer, previousValue);
    if (isMapKey) {
      this.h3z_1.o3z_1.h44(value);
    }
    return value;
  };
  protoOf(StreamingJsonDecoder).d1u = function (descriptor) {
    var index;
    switch (this.g3z_1.q2_1) {
      case 0:
        index = decodeObjectIndex(this, descriptor);
        break;
      case 2:
        index = decodeMapIndex(this);
        break;
      default:
        index = decodeListIndex(this);
        break;
    }
    if (!this.g3z_1.equals(WriteMode_MAP_getInstance())) {
      this.h3z_1.o3z_1.g44(index);
    }
    return index;
  };
  protoOf(StreamingJsonDecoder).z1s = function () {
    return this.h3z_1.d47();
  };
  protoOf(StreamingJsonDecoder).a1t = function () {
    var value = this.h3z_1.m41();
    if (!value.equals(toLong(value.l3()))) {
      this.h3z_1.x43("Failed to parse byte for input '" + value.toString() + "'");
    }
    return value.l3();
  };
  protoOf(StreamingJsonDecoder).b1t = function () {
    var value = this.h3z_1.m41();
    if (!value.equals(toLong(value.m3()))) {
      this.h3z_1.x43("Failed to parse short for input '" + value.toString() + "'");
    }
    return value.m3();
  };
  protoOf(StreamingJsonDecoder).c1t = function () {
    var value = this.h3z_1.m41();
    if (!value.equals(toLong(value.g1()))) {
      this.h3z_1.x43("Failed to parse int for input '" + value.toString() + "'");
    }
    return value.g1();
  };
  protoOf(StreamingJsonDecoder).d1t = function () {
    return this.h3z_1.m41();
  };
  protoOf(StreamingJsonDecoder).e1t = function () {
    var tmp0 = this.h3z_1;
    var tmp$ret$4;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.parseString' call
      var input = tmp0.c45();
      try {
        // Inline function 'kotlin.text.toFloat' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        tmp$ret$4 = toDouble(input);
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          tmp0.x43("Failed to parse type '" + 'float' + "' for input '" + input + "'");
        } else {
          throw $p;
        }
      }
    }
    var result = tmp$ret$4;
    var specialFp = this.f3z_1.v3y_1.v40_1;
    if (specialFp || isFinite(result))
      return result;
    throwInvalidFloatingPointDecoded(this.h3z_1, result);
  };
  protoOf(StreamingJsonDecoder).f1t = function () {
    var tmp0 = this.h3z_1;
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.parseString' call
      var input = tmp0.c45();
      try {
        tmp$ret$1 = toDouble(input);
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          tmp0.x43("Failed to parse type '" + 'double' + "' for input '" + input + "'");
        } else {
          throw $p;
        }
      }
    }
    var result = tmp$ret$1;
    var specialFp = this.f3z_1.v3y_1.v40_1;
    if (specialFp || isFinite_0(result))
      return result;
    throwInvalidFloatingPointDecoded(this.h3z_1, result);
  };
  protoOf(StreamingJsonDecoder).g1t = function () {
    var string = this.h3z_1.c45();
    if (!(string.length === 1)) {
      this.h3z_1.x43("Expected single char, but got '" + string + "'");
    }
    return charSequenceGet(string, 0);
  };
  protoOf(StreamingJsonDecoder).h1t = function () {
    var tmp;
    if (this.l3z_1.n40_1) {
      tmp = this.h3z_1.w46();
    } else {
      tmp = this.h3z_1.b45();
    }
    return tmp;
  };
  protoOf(StreamingJsonDecoder).j1t = function (descriptor) {
    return get_isUnsignedNumber(descriptor) ? new JsonDecoderForUnsignedTypes(this.h3z_1, this.f3z_1) : protoOf(AbstractDecoder).j1t.call(this, descriptor);
  };
  protoOf(StreamingJsonDecoder).i1t = function (enumDescriptor) {
    return getJsonNameIndexOrThrow(enumDescriptor, this.f3z_1, this.h1t(), ' at path ' + this.h3z_1.o3z_1.k44());
  };
  function JsonDecoderForUnsignedTypes(lexer, json) {
    AbstractDecoder.call(this);
    this.e47_1 = lexer;
    this.f47_1 = json.b1u();
  }
  protoOf(JsonDecoderForUnsignedTypes).b1u = function () {
    return this.f47_1;
  };
  protoOf(JsonDecoderForUnsignedTypes).d1u = function (descriptor) {
    var message = 'unsupported';
    throw IllegalStateException_init_$Create$(toString(message));
  };
  protoOf(JsonDecoderForUnsignedTypes).c1t = function () {
    var tmp0 = this.e47_1;
    var tmp$ret$2;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.parseString' call
      var input = tmp0.c45();
      try {
        // Inline function 'kotlin.UInt.toInt' call
        var this_0 = toUInt(input);
        tmp$ret$2 = _UInt___get_data__impl__f0vqqw(this_0);
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          tmp0.x43("Failed to parse type '" + 'UInt' + "' for input '" + input + "'");
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$2;
  };
  protoOf(JsonDecoderForUnsignedTypes).d1t = function () {
    var tmp0 = this.e47_1;
    var tmp$ret$2;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.parseString' call
      var input = tmp0.c45();
      try {
        // Inline function 'kotlin.ULong.toLong' call
        var this_0 = toULong(input);
        tmp$ret$2 = _ULong___get_data__impl__fggpzb(this_0);
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          tmp0.x43("Failed to parse type '" + 'ULong' + "' for input '" + input + "'");
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$2;
  };
  protoOf(JsonDecoderForUnsignedTypes).a1t = function () {
    var tmp0 = this.e47_1;
    var tmp$ret$2;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.parseString' call
      var input = tmp0.c45();
      try {
        // Inline function 'kotlin.UByte.toByte' call
        var this_0 = toUByte(input);
        tmp$ret$2 = _UByte___get_data__impl__jof9qr(this_0);
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          tmp0.x43("Failed to parse type '" + 'UByte' + "' for input '" + input + "'");
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$2;
  };
  protoOf(JsonDecoderForUnsignedTypes).b1t = function () {
    var tmp0 = this.e47_1;
    var tmp$ret$2;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.parseString' call
      var input = tmp0.c45();
      try {
        // Inline function 'kotlin.UShort.toShort' call
        var this_0 = toUShort(input);
        tmp$ret$2 = _UShort___get_data__impl__g0245(this_0);
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          tmp0.x43("Failed to parse type '" + 'UShort' + "' for input '" + input + "'");
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$2;
  };
  function get_unsignedNumberDescriptors() {
    _init_properties_StreamingJsonEncoder_kt__pn1bsi();
    return unsignedNumberDescriptors;
  }
  var unsignedNumberDescriptors;
  function StreamingJsonEncoder_init_$Init$(output, json, mode, modeReuseCache, $this) {
    StreamingJsonEncoder.call($this, Composer_0(output, json), json, mode, modeReuseCache);
    return $this;
  }
  function StreamingJsonEncoder_init_$Create$(output, json, mode, modeReuseCache) {
    return StreamingJsonEncoder_init_$Init$(output, json, mode, modeReuseCache, objectCreate(protoOf(StreamingJsonEncoder)));
  }
  function encodeTypeInfo($this, discriminator, serialName) {
    $this.l44_1.r42();
    $this.q1u(discriminator);
    $this.l44_1.u42(_Char___init__impl__6a9atx(58));
    $this.l44_1.t42();
    $this.q1u(serialName);
  }
  function StreamingJsonEncoder(composer, json, mode, modeReuseCache) {
    AbstractEncoder.call(this);
    this.l44_1 = composer;
    this.m44_1 = json;
    this.n44_1 = mode;
    this.o44_1 = modeReuseCache;
    this.p44_1 = this.m44_1.b1u();
    this.q44_1 = this.m44_1.v3y_1;
    this.r44_1 = false;
    this.s44_1 = null;
    this.t44_1 = null;
    var i = this.n44_1.q2_1;
    if (!(this.o44_1 == null)) {
      if (!(this.o44_1[i] === null) || !(this.o44_1[i] === this)) {
        this.o44_1[i] = this;
      }
    }
  }
  protoOf(StreamingJsonEncoder).c41 = function () {
    return this.m44_1;
  };
  protoOf(StreamingJsonEncoder).b1u = function () {
    return this.p44_1;
  };
  protoOf(StreamingJsonEncoder).m42 = function (element) {
    var tmp;
    if (!(this.s44_1 == null)) {
      tmp = !(element instanceof JsonObject);
    } else {
      tmp = false;
    }
    if (tmp) {
      throwJsonElementPolymorphicException(this.t44_1, element);
    }
    this.e1v(JsonElementSerializer_getInstance(), element);
  };
  protoOf(StreamingJsonEncoder).j1v = function (descriptor, index) {
    return this.q44_1.l40_1;
  };
  protoOf(StreamingJsonEncoder).e1v = function (serializer, value) {
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.encodePolymorphically' call
      if (this.c41().v3y_1.t40_1) {
        serializer.e1q(this, value);
        break $l$block;
      }
      var isPolymorphicSerializer = serializer instanceof AbstractPolymorphicSerializer;
      var tmp;
      if (isPolymorphicSerializer) {
        tmp = !this.c41().v3y_1.b41_1.equals(ClassDiscriminatorMode_NONE_getInstance());
      } else {
        var tmp_0;
        switch (this.c41().v3y_1.b41_1.q2_1) {
          case 0:
          case 2:
            tmp_0 = false;
            break;
          case 1:
            // Inline function 'kotlin.let' call

            var it = serializer.d1q().q1r();
            tmp_0 = equals(it, CLASS_getInstance()) || equals(it, OBJECT_getInstance());
            break;
          default:
            noWhenBranchMatchedException();
            break;
        }
        tmp = tmp_0;
      }
      var needDiscriminator = tmp;
      var baseClassDiscriminator = needDiscriminator ? classDiscriminator(serializer.d1q(), this.c41()) : null;
      var tmp_1;
      if (isPolymorphicSerializer) {
        var casted = serializer instanceof AbstractPolymorphicSerializer ? serializer : THROW_CCE();
        $l$block_0: {
          // Inline function 'kotlin.requireNotNull' call
          if (value == null) {
            var message = 'Value for serializer ' + toString(serializer.d1q()) + ' should always be non-null. Please report issue to the kotlinx.serialization tracker.';
            throw IllegalArgumentException_init_$Create$(toString(message));
          } else {
            break $l$block_0;
          }
        }
        var actual = findPolymorphicSerializer_0(casted, this, value);
        if (!(baseClassDiscriminator == null)) {
          access$validateIfSealed$tPolymorphicKt(serializer, actual, baseClassDiscriminator);
        }
        checkKind(actual.d1q().q1r());
        tmp_1 = isInterface(actual, SerializationStrategy) ? actual : THROW_CCE();
      } else {
        tmp_1 = serializer;
      }
      var actualSerializer = tmp_1;
      if (!(baseClassDiscriminator == null)) {
        var serialName = actualSerializer.d1q().e1r();
        this.s44_1 = baseClassDiscriminator;
        this.t44_1 = serialName;
      }
      actualSerializer.e1q(this, value);
    }
  };
  protoOf(StreamingJsonEncoder).m1t = function (descriptor) {
    var newMode = switchMode(this.m44_1, descriptor);
    if (!(newMode.a47_1 === _Char___init__impl__6a9atx(0))) {
      this.l44_1.u42(newMode.a47_1);
      this.l44_1.p42();
    }
    var discriminator = this.s44_1;
    if (!(discriminator == null)) {
      var tmp0_elvis_lhs = this.t44_1;
      encodeTypeInfo(this, discriminator, tmp0_elvis_lhs == null ? descriptor.e1r() : tmp0_elvis_lhs);
      this.s44_1 = null;
      this.t44_1 = null;
    }
    if (this.n44_1.equals(newMode)) {
      return this;
    }
    var tmp1_safe_receiver = this.o44_1;
    var tmp2_elvis_lhs = tmp1_safe_receiver == null ? null : tmp1_safe_receiver[newMode.q2_1];
    return tmp2_elvis_lhs == null ? new StreamingJsonEncoder(this.l44_1, this.m44_1, newMode, this.o44_1) : tmp2_elvis_lhs;
  };
  protoOf(StreamingJsonEncoder).n1t = function (descriptor) {
    if (!(this.n44_1.b47_1 === _Char___init__impl__6a9atx(0))) {
      this.l44_1.q42();
      this.l44_1.s42();
      this.l44_1.u42(this.n44_1.b47_1);
    }
  };
  protoOf(StreamingJsonEncoder).f1u = function (descriptor, index) {
    switch (this.n44_1.q2_1) {
      case 1:
        if (!this.l44_1.o42_1) {
          this.l44_1.u42(_Char___init__impl__6a9atx(44));
        }

        this.l44_1.r42();
        break;
      case 2:
        if (!this.l44_1.o42_1) {
          var tmp = this;
          var tmp_0;
          if ((index % 2 | 0) === 0) {
            this.l44_1.u42(_Char___init__impl__6a9atx(44));
            this.l44_1.r42();
            tmp_0 = true;
          } else {
            this.l44_1.u42(_Char___init__impl__6a9atx(58));
            this.l44_1.t42();
            tmp_0 = false;
          }
          tmp.r44_1 = tmp_0;
        } else {
          this.r44_1 = true;
          this.l44_1.r42();
        }

        break;
      case 3:
        if (index === 0)
          this.r44_1 = true;
        if (index === 1) {
          this.l44_1.u42(_Char___init__impl__6a9atx(44));
          this.l44_1.t42();
          this.r44_1 = false;
        }

        break;
      default:
        if (!this.l44_1.o42_1) {
          this.l44_1.u42(_Char___init__impl__6a9atx(44));
        }

        this.l44_1.r42();
        this.q1u(getJsonElementName(descriptor, this.m44_1, index));
        this.l44_1.u42(_Char___init__impl__6a9atx(58));
        this.l44_1.t42();
        break;
    }
    return true;
  };
  protoOf(StreamingJsonEncoder).f1v = function (descriptor, index, serializer, value) {
    if (!(value == null) || this.q44_1.q40_1) {
      protoOf(AbstractEncoder).f1v.call(this, descriptor, index, serializer, value);
    }
  };
  protoOf(StreamingJsonEncoder).s1u = function (descriptor) {
    var tmp;
    if (get_isUnsignedNumber(descriptor)) {
      // Inline function 'kotlinx.serialization.json.internal.StreamingJsonEncoder.composerAs' call
      var tmp_0;
      var tmp_1 = this.l44_1;
      if (tmp_1 instanceof ComposerForUnsignedNumbers) {
        tmp_0 = this.l44_1;
      } else {
        var tmp1 = this.l44_1.n42_1;
        var p1 = this.r44_1;
        tmp_0 = new ComposerForUnsignedNumbers(tmp1, p1);
      }
      var tmp$ret$1 = tmp_0;
      tmp = new StreamingJsonEncoder(tmp$ret$1, this.m44_1, this.n44_1, null);
    } else if (get_isUnquotedLiteral(descriptor)) {
      // Inline function 'kotlinx.serialization.json.internal.StreamingJsonEncoder.composerAs' call
      var tmp_2;
      var tmp_3 = this.l44_1;
      if (tmp_3 instanceof ComposerForUnquotedLiterals) {
        tmp_2 = this.l44_1;
      } else {
        var tmp4 = this.l44_1.n42_1;
        var p1_0 = this.r44_1;
        tmp_2 = new ComposerForUnquotedLiterals(tmp4, p1_0);
      }
      var tmp$ret$3 = tmp_2;
      tmp = new StreamingJsonEncoder(tmp$ret$3, this.m44_1, this.n44_1, null);
    } else if (!(this.s44_1 == null)) {
      // Inline function 'kotlin.apply' call
      this.t44_1 = descriptor.e1r();
      tmp = this;
    } else {
      tmp = protoOf(AbstractEncoder).s1u.call(this, descriptor);
    }
    return tmp;
  };
  protoOf(StreamingJsonEncoder).h1u = function () {
    this.l44_1.w42('null');
  };
  protoOf(StreamingJsonEncoder).i1u = function (value) {
    if (this.r44_1) {
      this.q1u(value.toString());
    } else {
      this.l44_1.f43(value);
    }
  };
  protoOf(StreamingJsonEncoder).j1u = function (value) {
    if (this.r44_1) {
      this.q1u(value.toString());
    } else {
      this.l44_1.a43(value);
    }
  };
  protoOf(StreamingJsonEncoder).k1u = function (value) {
    if (this.r44_1) {
      this.q1u(value.toString());
    } else {
      this.l44_1.c43(value);
    }
  };
  protoOf(StreamingJsonEncoder).l1u = function (value) {
    if (this.r44_1) {
      this.q1u(value.toString());
    } else {
      this.l44_1.d43(value);
    }
  };
  protoOf(StreamingJsonEncoder).m1u = function (value) {
    if (this.r44_1) {
      this.q1u(value.toString());
    } else {
      this.l44_1.e43(value);
    }
  };
  protoOf(StreamingJsonEncoder).n1u = function (value) {
    if (this.r44_1) {
      this.q1u(value.toString());
    } else {
      this.l44_1.y42(value);
    }
    if (!this.q44_1.v40_1 && !isFinite(value)) {
      throw InvalidFloatingPointEncoded_0(value, toString(this.l44_1.n42_1));
    }
  };
  protoOf(StreamingJsonEncoder).o1u = function (value) {
    if (this.r44_1) {
      this.q1u(value.toString());
    } else {
      this.l44_1.z42(value);
    }
    if (!this.q44_1.v40_1 && !isFinite_0(value)) {
      throw InvalidFloatingPointEncoded_0(value, toString(this.l44_1.n42_1));
    }
  };
  protoOf(StreamingJsonEncoder).p1u = function (value) {
    this.q1u(toString_1(value));
  };
  protoOf(StreamingJsonEncoder).q1u = function (value) {
    return this.l44_1.g43(value);
  };
  protoOf(StreamingJsonEncoder).r1u = function (enumDescriptor, index) {
    this.q1u(enumDescriptor.u1r(index));
  };
  function get_isUnsignedNumber(_this__u8e3s4) {
    _init_properties_StreamingJsonEncoder_kt__pn1bsi();
    return _this__u8e3s4.r1r() && get_unsignedNumberDescriptors().r(_this__u8e3s4);
  }
  function get_isUnquotedLiteral(_this__u8e3s4) {
    _init_properties_StreamingJsonEncoder_kt__pn1bsi();
    return _this__u8e3s4.r1r() && equals(_this__u8e3s4, get_jsonUnquotedLiteralDescriptor());
  }
  var properties_initialized_StreamingJsonEncoder_kt_6ifwwk;
  function _init_properties_StreamingJsonEncoder_kt__pn1bsi() {
    if (!properties_initialized_StreamingJsonEncoder_kt_6ifwwk) {
      properties_initialized_StreamingJsonEncoder_kt_6ifwwk = true;
      unsignedNumberDescriptors = setOf([serializer_1(Companion_getInstance_0()).d1q(), serializer_0(Companion_getInstance()).d1q(), serializer_2(Companion_getInstance_1()).d1q(), serializer_3(Companion_getInstance_2()).d1q()]);
    }
  }
  function get_ESCAPE_STRINGS() {
    _init_properties_StringOps_kt__fcy1db();
    return ESCAPE_STRINGS;
  }
  var ESCAPE_STRINGS;
  var ESCAPE_MARKERS;
  function toHexChar(i) {
    _init_properties_StringOps_kt__fcy1db();
    var d = i & 15;
    var tmp;
    if (d < 10) {
      // Inline function 'kotlin.code' call
      var this_0 = _Char___init__impl__6a9atx(48);
      var tmp$ret$0 = Char__toInt_impl_vasixd(this_0);
      tmp = numberToChar(d + tmp$ret$0 | 0);
    } else {
      var tmp_0 = d - 10 | 0;
      // Inline function 'kotlin.code' call
      var this_1 = _Char___init__impl__6a9atx(97);
      var tmp$ret$1 = Char__toInt_impl_vasixd(this_1);
      tmp = numberToChar(tmp_0 + tmp$ret$1 | 0);
    }
    return tmp;
  }
  function printQuoted(_this__u8e3s4, value) {
    _init_properties_StringOps_kt__fcy1db();
    _this__u8e3s4.h8(_Char___init__impl__6a9atx(34));
    var lastPos = 0;
    var inductionVariable = 0;
    var last = charSequenceLength(value) - 1 | 0;
    if (inductionVariable <= last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'kotlin.code' call
        var this_0 = charSequenceGet(value, i);
        var c = Char__toInt_impl_vasixd(this_0);
        if (c < get_ESCAPE_STRINGS().length && !(get_ESCAPE_STRINGS()[c] == null)) {
          _this__u8e3s4.pc(value, lastPos, i);
          _this__u8e3s4.g8(get_ESCAPE_STRINGS()[c]);
          lastPos = i + 1 | 0;
        }
      }
       while (inductionVariable <= last);
    if (!(lastPos === 0))
      _this__u8e3s4.pc(value, lastPos, value.length);
    else
      _this__u8e3s4.g8(value);
    _this__u8e3s4.h8(_Char___init__impl__6a9atx(34));
  }
  function toBooleanStrictOrNull_0(_this__u8e3s4) {
    _init_properties_StringOps_kt__fcy1db();
    return equals_0(_this__u8e3s4, 'true', true) ? true : equals_0(_this__u8e3s4, 'false', true) ? false : null;
  }
  var properties_initialized_StringOps_kt_wzaea7;
  function _init_properties_StringOps_kt__fcy1db() {
    if (!properties_initialized_StringOps_kt_wzaea7) {
      properties_initialized_StringOps_kt_wzaea7 = true;
      // Inline function 'kotlin.arrayOfNulls' call
      // Inline function 'kotlin.apply' call
      var this_0 = Array(93);
      var inductionVariable = 0;
      if (inductionVariable <= 31)
        do {
          var c = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var c1 = toHexChar(c >> 12);
          var c2 = toHexChar(c >> 8);
          var c3 = toHexChar(c >> 4);
          var c4 = toHexChar(c);
          this_0[c] = '\\u' + toString_1(c1) + toString_1(c2) + toString_1(c3) + toString_1(c4);
        }
         while (inductionVariable <= 31);
      // Inline function 'kotlin.code' call
      var this_1 = _Char___init__impl__6a9atx(34);
      this_0[Char__toInt_impl_vasixd(this_1)] = '\\"';
      // Inline function 'kotlin.code' call
      var this_2 = _Char___init__impl__6a9atx(92);
      this_0[Char__toInt_impl_vasixd(this_2)] = '\\\\';
      // Inline function 'kotlin.code' call
      var this_3 = _Char___init__impl__6a9atx(9);
      this_0[Char__toInt_impl_vasixd(this_3)] = '\\t';
      // Inline function 'kotlin.code' call
      var this_4 = _Char___init__impl__6a9atx(8);
      this_0[Char__toInt_impl_vasixd(this_4)] = '\\b';
      // Inline function 'kotlin.code' call
      var this_5 = _Char___init__impl__6a9atx(10);
      this_0[Char__toInt_impl_vasixd(this_5)] = '\\n';
      // Inline function 'kotlin.code' call
      var this_6 = _Char___init__impl__6a9atx(13);
      this_0[Char__toInt_impl_vasixd(this_6)] = '\\r';
      this_0[12] = '\\f';
      ESCAPE_STRINGS = this_0;
      // Inline function 'kotlin.apply' call
      var this_7 = new Int8Array(93);
      var inductionVariable_0 = 0;
      if (inductionVariable_0 <= 31)
        do {
          var c_0 = inductionVariable_0;
          inductionVariable_0 = inductionVariable_0 + 1 | 0;
          this_7[c_0] = 1;
        }
         while (inductionVariable_0 <= 31);
      // Inline function 'kotlin.code' call
      var this_8 = _Char___init__impl__6a9atx(34);
      var tmp = Char__toInt_impl_vasixd(this_8);
      // Inline function 'kotlin.code' call
      var this_9 = _Char___init__impl__6a9atx(34);
      var tmp$ret$1 = Char__toInt_impl_vasixd(this_9);
      this_7[tmp] = toByte(tmp$ret$1);
      // Inline function 'kotlin.code' call
      var this_10 = _Char___init__impl__6a9atx(92);
      var tmp_0 = Char__toInt_impl_vasixd(this_10);
      // Inline function 'kotlin.code' call
      var this_11 = _Char___init__impl__6a9atx(92);
      var tmp$ret$3 = Char__toInt_impl_vasixd(this_11);
      this_7[tmp_0] = toByte(tmp$ret$3);
      // Inline function 'kotlin.code' call
      var this_12 = _Char___init__impl__6a9atx(9);
      var tmp_1 = Char__toInt_impl_vasixd(this_12);
      // Inline function 'kotlin.code' call
      var this_13 = _Char___init__impl__6a9atx(116);
      var tmp$ret$5 = Char__toInt_impl_vasixd(this_13);
      this_7[tmp_1] = toByte(tmp$ret$5);
      // Inline function 'kotlin.code' call
      var this_14 = _Char___init__impl__6a9atx(8);
      var tmp_2 = Char__toInt_impl_vasixd(this_14);
      // Inline function 'kotlin.code' call
      var this_15 = _Char___init__impl__6a9atx(98);
      var tmp$ret$7 = Char__toInt_impl_vasixd(this_15);
      this_7[tmp_2] = toByte(tmp$ret$7);
      // Inline function 'kotlin.code' call
      var this_16 = _Char___init__impl__6a9atx(10);
      var tmp_3 = Char__toInt_impl_vasixd(this_16);
      // Inline function 'kotlin.code' call
      var this_17 = _Char___init__impl__6a9atx(110);
      var tmp$ret$9 = Char__toInt_impl_vasixd(this_17);
      this_7[tmp_3] = toByte(tmp$ret$9);
      // Inline function 'kotlin.code' call
      var this_18 = _Char___init__impl__6a9atx(13);
      var tmp_4 = Char__toInt_impl_vasixd(this_18);
      // Inline function 'kotlin.code' call
      var this_19 = _Char___init__impl__6a9atx(114);
      var tmp$ret$11 = Char__toInt_impl_vasixd(this_19);
      this_7[tmp_4] = toByte(tmp$ret$11);
      // Inline function 'kotlin.code' call
      var this_20 = _Char___init__impl__6a9atx(102);
      var tmp$ret$12 = Char__toInt_impl_vasixd(this_20);
      this_7[12] = toByte(tmp$ret$12);
      ESCAPE_MARKERS = this_7;
    }
  }
  function readJson(json, element, deserializer) {
    var tmp;
    if (element instanceof JsonObject) {
      tmp = new JsonTreeDecoder(json, element);
    } else {
      if (element instanceof JsonArray) {
        tmp = new JsonTreeListDecoder(json, element);
      } else {
        var tmp_0;
        if (element instanceof JsonLiteral) {
          tmp_0 = true;
        } else {
          tmp_0 = equals(element, JsonNull_getInstance());
        }
        if (tmp_0) {
          tmp = new JsonPrimitiveDecoder(json, element instanceof JsonPrimitive ? element : THROW_CCE());
        } else {
          noWhenBranchMatchedException();
        }
      }
    }
    var input = tmp;
    return input.l1t(deserializer);
  }
  function unparsedPrimitive($this, literal, primitive, tag) {
    var type = startsWith(primitive, 'i') ? 'an ' + primitive : 'a ' + primitive;
    throw JsonDecodingException_0(-1, "Failed to parse literal '" + literal.toString() + "' as " + type + ' value at element: ' + $this.m47(tag), toString($this.n47()));
  }
  function AbstractJsonTreeDecoder(json, value, polymorphicDiscriminator) {
    polymorphicDiscriminator = polymorphicDiscriminator === VOID ? null : polymorphicDiscriminator;
    NamedValueDecoder.call(this);
    this.i47_1 = json;
    this.j47_1 = value;
    this.k47_1 = polymorphicDiscriminator;
    this.l47_1 = this.c41().v3y_1;
  }
  protoOf(AbstractJsonTreeDecoder).c41 = function () {
    return this.i47_1;
  };
  protoOf(AbstractJsonTreeDecoder).w = function () {
    return this.j47_1;
  };
  protoOf(AbstractJsonTreeDecoder).b1u = function () {
    return this.c41().b1u();
  };
  protoOf(AbstractJsonTreeDecoder).n47 = function () {
    var tmp0_safe_receiver = this.s27();
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      tmp = this.o47(tmp0_safe_receiver);
    }
    var tmp1_elvis_lhs = tmp;
    return tmp1_elvis_lhs == null ? this.w() : tmp1_elvis_lhs;
  };
  protoOf(AbstractJsonTreeDecoder).m47 = function (currentTag) {
    return this.q28() + ('.' + currentTag);
  };
  protoOf(AbstractJsonTreeDecoder).d41 = function () {
    return this.n47();
  };
  protoOf(AbstractJsonTreeDecoder).l1t = function (deserializer) {
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.decodeSerializableValuePolymorphic' call
      var tmp;
      if (!(deserializer instanceof AbstractPolymorphicSerializer)) {
        tmp = true;
      } else {
        tmp = this.c41().v3y_1.t40_1;
      }
      if (tmp) {
        tmp$ret$0 = deserializer.f1q(this);
        break $l$block;
      }
      var discriminator = classDiscriminator(deserializer.d1q(), this.c41());
      var tmp0 = this.d41();
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var serialName = deserializer.d1q().e1r();
      if (!(tmp0 instanceof JsonObject)) {
        var tmp_0 = getKClass(JsonObject).za();
        var tmp_1 = getKClassFromExpression(tmp0).za();
        var tmp$ret$1 = this.q28();
        throw JsonDecodingException_0(-1, 'Expected ' + tmp_0 + ', but had ' + tmp_1 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$1, toString(tmp0));
      }
      var jsonTree = tmp0;
      var tmp0_safe_receiver = jsonTree.de(discriminator);
      var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : get_jsonPrimitive(tmp0_safe_receiver);
      var type = tmp1_safe_receiver == null ? null : get_contentOrNull(tmp1_safe_receiver);
      var tmp_2;
      try {
        tmp_2 = findPolymorphicSerializer(deserializer, this, type);
      } catch ($p) {
        var tmp_3;
        if ($p instanceof SerializationException) {
          var it = $p;
          throw JsonDecodingException_0(-1, ensureNotNull(it.message), jsonTree.toString());
        } else {
          throw $p;
        }
      }
      var tmp_4 = tmp_2;
      var actualSerializer = isInterface(tmp_4, DeserializationStrategy) ? tmp_4 : THROW_CCE();
      tmp$ret$0 = readPolymorphicJson(this.c41(), discriminator, jsonTree, actualSerializer);
    }
    return tmp$ret$0;
  };
  protoOf(AbstractJsonTreeDecoder).t27 = function (parentName, childName) {
    return childName;
  };
  protoOf(AbstractJsonTreeDecoder).m1t = function (descriptor) {
    var currentObject = this.n47();
    var tmp0_subject = descriptor.q1r();
    var tmp;
    var tmp_0;
    if (equals(tmp0_subject, LIST_getInstance())) {
      tmp_0 = true;
    } else {
      tmp_0 = tmp0_subject instanceof PolymorphicKind;
    }
    if (tmp_0) {
      var tmp_1 = this.c41();
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var serialName = descriptor.e1r();
      if (!(currentObject instanceof JsonArray)) {
        var tmp_2 = getKClass(JsonArray).za();
        var tmp_3 = getKClassFromExpression(currentObject).za();
        var tmp$ret$0 = this.q28();
        throw JsonDecodingException_0(-1, 'Expected ' + tmp_2 + ', but had ' + tmp_3 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$0, toString(currentObject));
      }
      tmp = new JsonTreeListDecoder(tmp_1, currentObject);
    } else {
      if (equals(tmp0_subject, MAP_getInstance())) {
        // Inline function 'kotlinx.serialization.json.internal.selectMapMode' call
        var this_0 = this.c41();
        var keyDescriptor = carrierDescriptor(descriptor.x1r(0), this_0.b1u());
        var keyKind = keyDescriptor.q1r();
        var tmp_4;
        var tmp_5;
        if (keyKind instanceof PrimitiveKind) {
          tmp_5 = true;
        } else {
          tmp_5 = equals(keyKind, ENUM_getInstance());
        }
        if (tmp_5) {
          var tmp_6 = this.c41();
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
          // Inline function 'kotlinx.serialization.json.internal.cast' call
          var serialName_0 = descriptor.e1r();
          if (!(currentObject instanceof JsonObject)) {
            var tmp_7 = getKClass(JsonObject).za();
            var tmp_8 = getKClassFromExpression(currentObject).za();
            var tmp$ret$3 = this.q28();
            throw JsonDecodingException_0(-1, 'Expected ' + tmp_7 + ', but had ' + tmp_8 + ' as the serialized body of ' + serialName_0 + ' at element: ' + tmp$ret$3, toString(currentObject));
          }
          tmp_4 = new JsonTreeMapDecoder(tmp_6, currentObject);
        } else {
          if (this_0.v3y_1.o40_1) {
            var tmp_9 = this.c41();
            // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
            // Inline function 'kotlinx.serialization.json.internal.cast' call
            var serialName_1 = descriptor.e1r();
            if (!(currentObject instanceof JsonArray)) {
              var tmp_10 = getKClass(JsonArray).za();
              var tmp_11 = getKClassFromExpression(currentObject).za();
              var tmp$ret$7 = this.q28();
              throw JsonDecodingException_0(-1, 'Expected ' + tmp_10 + ', but had ' + tmp_11 + ' as the serialized body of ' + serialName_1 + ' at element: ' + tmp$ret$7, toString(currentObject));
            }
            tmp_4 = new JsonTreeListDecoder(tmp_9, currentObject);
          } else {
            throw InvalidKeyKindException(keyDescriptor);
          }
        }
        tmp = tmp_4;
      } else {
        var tmp_12 = this.c41();
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
        // Inline function 'kotlinx.serialization.json.internal.cast' call
        var serialName_2 = descriptor.e1r();
        if (!(currentObject instanceof JsonObject)) {
          var tmp_13 = getKClass(JsonObject).za();
          var tmp_14 = getKClassFromExpression(currentObject).za();
          var tmp$ret$12 = this.q28();
          throw JsonDecodingException_0(-1, 'Expected ' + tmp_13 + ', but had ' + tmp_14 + ' as the serialized body of ' + serialName_2 + ' at element: ' + tmp$ret$12, toString(currentObject));
        }
        tmp = new JsonTreeDecoder(tmp_12, currentObject, this.k47_1);
      }
    }
    return tmp;
  };
  protoOf(AbstractJsonTreeDecoder).n1t = function (descriptor) {
  };
  protoOf(AbstractJsonTreeDecoder).x1s = function () {
    var tmp = this.n47();
    return !(tmp instanceof JsonNull);
  };
  protoOf(AbstractJsonTreeDecoder).p47 = function (tag, enumDescriptor) {
    var tmp = this.c41();
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
    var tmp1 = this.o47(tag);
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var serialName = enumDescriptor.e1r();
    if (!(tmp1 instanceof JsonPrimitive)) {
      var tmp_0 = getKClass(JsonPrimitive).za();
      var tmp_1 = getKClassFromExpression(tmp1).za();
      var tmp$ret$0 = this.m47(tag);
      throw JsonDecodingException_0(-1, 'Expected ' + tmp_0 + ', but had ' + tmp_1 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$0, toString(tmp1));
    }
    return getJsonNameIndexOrThrow(enumDescriptor, tmp, tmp1.f41());
  };
  protoOf(AbstractJsonTreeDecoder).c29 = function (tag, enumDescriptor) {
    return this.p47((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), enumDescriptor);
  };
  protoOf(AbstractJsonTreeDecoder).q47 = function (tag) {
    return !(this.o47(tag) === JsonNull_getInstance());
  };
  protoOf(AbstractJsonTreeDecoder).s28 = function (tag) {
    return this.q47((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).r47 = function (tag) {
    var tmp$ret$4;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.o47(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp = getKClass(JsonPrimitive).za();
        var tmp_0 = getKClassFromExpression(value).za();
        var tmp$ret$0 = this.m47(tag);
        throw JsonDecodingException_0(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'boolean' + ' at element: ' + tmp$ret$0, toString(value));
      }
      var literal = value;
      try {
        var tmp0_elvis_lhs = get_booleanOrNull(literal);
        var tmp_1;
        if (tmp0_elvis_lhs == null) {
          unparsedPrimitive(this, literal, 'boolean', tag);
        } else {
          tmp_1 = tmp0_elvis_lhs;
        }
        tmp$ret$4 = tmp_1;
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          unparsedPrimitive(this, literal, 'boolean', tag);
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$4;
  };
  protoOf(AbstractJsonTreeDecoder).t28 = function (tag) {
    return this.r47((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).s47 = function (tag) {
    var tmp$ret$4;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.o47(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp = getKClass(JsonPrimitive).za();
        var tmp_0 = getKClassFromExpression(value).za();
        var tmp$ret$0 = this.m47(tag);
        throw JsonDecodingException_0(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'byte' + ' at element: ' + tmp$ret$0, toString(value));
      }
      var literal = value;
      try {
        var result = get_int(literal);
        var tmp0_elvis_lhs = (-128 <= result ? result <= 127 : false) ? toByte(result) : null;
        var tmp_1;
        if (tmp0_elvis_lhs == null) {
          unparsedPrimitive(this, literal, 'byte', tag);
        } else {
          tmp_1 = tmp0_elvis_lhs;
        }
        tmp$ret$4 = tmp_1;
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          unparsedPrimitive(this, literal, 'byte', tag);
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$4;
  };
  protoOf(AbstractJsonTreeDecoder).u28 = function (tag) {
    return this.s47((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).t47 = function (tag) {
    var tmp$ret$4;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.o47(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp = getKClass(JsonPrimitive).za();
        var tmp_0 = getKClassFromExpression(value).za();
        var tmp$ret$0 = this.m47(tag);
        throw JsonDecodingException_0(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'short' + ' at element: ' + tmp$ret$0, toString(value));
      }
      var literal = value;
      try {
        var result = get_int(literal);
        var tmp0_elvis_lhs = (-32768 <= result ? result <= 32767 : false) ? toShort(result) : null;
        var tmp_1;
        if (tmp0_elvis_lhs == null) {
          unparsedPrimitive(this, literal, 'short', tag);
        } else {
          tmp_1 = tmp0_elvis_lhs;
        }
        tmp$ret$4 = tmp_1;
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          unparsedPrimitive(this, literal, 'short', tag);
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$4;
  };
  protoOf(AbstractJsonTreeDecoder).v28 = function (tag) {
    return this.t47((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).u47 = function (tag) {
    var tmp$ret$4;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.o47(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp = getKClass(JsonPrimitive).za();
        var tmp_0 = getKClassFromExpression(value).za();
        var tmp$ret$0 = this.m47(tag);
        throw JsonDecodingException_0(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'int' + ' at element: ' + tmp$ret$0, toString(value));
      }
      var literal = value;
      try {
        var tmp0_elvis_lhs = get_int(literal);
        var tmp_1;
        if (tmp0_elvis_lhs == null) {
          unparsedPrimitive(this, literal, 'int', tag);
        } else {
          tmp_1 = tmp0_elvis_lhs;
        }
        tmp$ret$4 = tmp_1;
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          unparsedPrimitive(this, literal, 'int', tag);
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$4;
  };
  protoOf(AbstractJsonTreeDecoder).w28 = function (tag) {
    return this.u47((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).v47 = function (tag) {
    var tmp$ret$4;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.o47(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp = getKClass(JsonPrimitive).za();
        var tmp_0 = getKClassFromExpression(value).za();
        var tmp$ret$0 = this.m47(tag);
        throw JsonDecodingException_0(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'long' + ' at element: ' + tmp$ret$0, toString(value));
      }
      var literal = value;
      try {
        var tmp0_elvis_lhs = get_long(literal);
        var tmp_1;
        if (tmp0_elvis_lhs == null) {
          unparsedPrimitive(this, literal, 'long', tag);
        } else {
          tmp_1 = tmp0_elvis_lhs;
        }
        tmp$ret$4 = tmp_1;
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          unparsedPrimitive(this, literal, 'long', tag);
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$4;
  };
  protoOf(AbstractJsonTreeDecoder).x28 = function (tag) {
    return this.v47((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).w47 = function (tag) {
    var tmp$ret$4;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.o47(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp = getKClass(JsonPrimitive).za();
        var tmp_0 = getKClassFromExpression(value).za();
        var tmp$ret$0 = this.m47(tag);
        throw JsonDecodingException_0(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'float' + ' at element: ' + tmp$ret$0, toString(value));
      }
      var literal = value;
      try {
        var tmp0_elvis_lhs = get_float(literal);
        var tmp_1;
        if (tmp0_elvis_lhs == null) {
          unparsedPrimitive(this, literal, 'float', tag);
        } else {
          tmp_1 = tmp0_elvis_lhs;
        }
        tmp$ret$4 = tmp_1;
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          unparsedPrimitive(this, literal, 'float', tag);
        } else {
          throw $p;
        }
      }
    }
    var result = tmp$ret$4;
    var specialFp = this.c41().v3y_1.v40_1;
    if (specialFp || isFinite(result))
      return result;
    throw InvalidFloatingPointDecoded(result, tag, toString(this.n47()));
  };
  protoOf(AbstractJsonTreeDecoder).y28 = function (tag) {
    return this.w47((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).x47 = function (tag) {
    var tmp$ret$4;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.o47(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp = getKClass(JsonPrimitive).za();
        var tmp_0 = getKClassFromExpression(value).za();
        var tmp$ret$0 = this.m47(tag);
        throw JsonDecodingException_0(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'double' + ' at element: ' + tmp$ret$0, toString(value));
      }
      var literal = value;
      try {
        var tmp0_elvis_lhs = get_double(literal);
        var tmp_1;
        if (tmp0_elvis_lhs == null) {
          unparsedPrimitive(this, literal, 'double', tag);
        } else {
          tmp_1 = tmp0_elvis_lhs;
        }
        tmp$ret$4 = tmp_1;
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          unparsedPrimitive(this, literal, 'double', tag);
        } else {
          throw $p;
        }
      }
    }
    var result = tmp$ret$4;
    var specialFp = this.c41().v3y_1.v40_1;
    if (specialFp || isFinite_0(result))
      return result;
    throw InvalidFloatingPointDecoded(result, tag, toString(this.n47()));
  };
  protoOf(AbstractJsonTreeDecoder).z28 = function (tag) {
    return this.x47((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).y47 = function (tag) {
    var tmp$ret$4;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.o47(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp = getKClass(JsonPrimitive).za();
        var tmp_0 = getKClassFromExpression(value).za();
        var tmp$ret$0 = this.m47(tag);
        throw JsonDecodingException_0(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'char' + ' at element: ' + tmp$ret$0, toString(value));
      }
      var literal = value;
      try {
        var tmp0_elvis_lhs = new Char(single(literal.f41()));
        var tmp_1;
        if (tmp0_elvis_lhs == null) {
          unparsedPrimitive(this, literal, 'char', tag);
        } else {
          tmp_1 = tmp0_elvis_lhs;
        }
        tmp$ret$4 = tmp_1.o1_1;
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          unparsedPrimitive(this, literal, 'char', tag);
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$4;
  };
  protoOf(AbstractJsonTreeDecoder).a29 = function (tag) {
    return this.y47((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).z47 = function (tag) {
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var value = this.o47(tag);
    if (!(value instanceof JsonPrimitive)) {
      var tmp = getKClass(JsonPrimitive).za();
      var tmp_0 = getKClassFromExpression(value).za();
      var tmp$ret$0 = this.m47(tag);
      throw JsonDecodingException_0(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'string' + ' at element: ' + tmp$ret$0, toString(value));
    }
    var value_0 = value;
    if (!(value_0 instanceof JsonLiteral))
      throw JsonDecodingException_0(-1, "Expected string value for a non-null key '" + tag + "', got null literal instead at element: " + this.m47(tag), toString(this.n47()));
    if (!value_0.o41_1 && !this.c41().v3y_1.n40_1) {
      throw JsonDecodingException_0(-1, "String literal for key '" + tag + "' should be quoted at element: " + this.m47(tag) + ".\nUse 'isLenient = true' in 'Json {}' builder to accept non-compliant JSON.", toString(this.n47()));
    }
    return value_0.q41_1;
  };
  protoOf(AbstractJsonTreeDecoder).b29 = function (tag) {
    return this.z47((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).a48 = function (tag, inlineDescriptor) {
    var tmp;
    if (get_isUnsignedNumber(inlineDescriptor)) {
      var tmp_0 = this.c41();
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      var tmp1 = this.o47(tag);
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var serialName = inlineDescriptor.e1r();
      if (!(tmp1 instanceof JsonPrimitive)) {
        var tmp_1 = getKClass(JsonPrimitive).za();
        var tmp_2 = getKClassFromExpression(tmp1).za();
        var tmp$ret$0 = this.m47(tag);
        throw JsonDecodingException_0(-1, 'Expected ' + tmp_1 + ', but had ' + tmp_2 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$0, toString(tmp1));
      }
      var lexer = StringJsonLexer_0(tmp_0, tmp1.f41());
      tmp = new JsonDecoderForUnsignedTypes(lexer, this.c41());
    } else {
      tmp = protoOf(NamedValueDecoder).d29.call(this, tag, inlineDescriptor);
    }
    return tmp;
  };
  protoOf(AbstractJsonTreeDecoder).d29 = function (tag, inlineDescriptor) {
    return this.a48((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), inlineDescriptor);
  };
  protoOf(AbstractJsonTreeDecoder).j1t = function (descriptor) {
    return !(this.s27() == null) ? protoOf(NamedValueDecoder).j1t.call(this, descriptor) : (new JsonPrimitiveDecoder(this.c41(), this.w(), this.k47_1)).j1t(descriptor);
  };
  function coerceInputValue_0($this, descriptor, index, tag) {
    var tmp0 = $this.c41();
    var tmp$ret$1;
    $l$block_2: {
      // Inline function 'kotlinx.serialization.json.internal.tryCoerceValue' call
      var isOptional = descriptor.y1r(index);
      var elementDescriptor = descriptor.x1r(index);
      var tmp;
      if (isOptional && !elementDescriptor.m1r()) {
        var tmp_0 = $this.o47(tag);
        tmp = tmp_0 instanceof JsonNull;
      } else {
        tmp = false;
      }
      if (tmp) {
        tmp$ret$1 = true;
        break $l$block_2;
      }
      if (equals(elementDescriptor.q1r(), ENUM_getInstance())) {
        var tmp_1;
        if (elementDescriptor.m1r()) {
          var tmp_2 = $this.o47(tag);
          tmp_1 = tmp_2 instanceof JsonNull;
        } else {
          tmp_1 = false;
        }
        if (tmp_1) {
          tmp$ret$1 = false;
          break $l$block_2;
        }
        var tmp_3 = $this.o47(tag);
        var tmp0_safe_receiver = tmp_3 instanceof JsonPrimitive ? tmp_3 : null;
        var tmp0_elvis_lhs = tmp0_safe_receiver == null ? null : get_contentOrNull(tmp0_safe_receiver);
        var tmp_4;
        if (tmp0_elvis_lhs == null) {
          tmp$ret$1 = false;
          break $l$block_2;
        } else {
          tmp_4 = tmp0_elvis_lhs;
        }
        var enumValue = tmp_4;
        var enumIndex = getJsonNameIndex(elementDescriptor, tmp0, enumValue);
        var coerceToNull = !tmp0.v3y_1.q40_1 && elementDescriptor.m1r();
        if (enumIndex === -3 && (isOptional || coerceToNull)) {
          tmp$ret$1 = true;
          break $l$block_2;
        }
      }
      tmp$ret$1 = false;
    }
    return tmp$ret$1;
  }
  function absenceIsNull($this, descriptor, index) {
    $this.k48_1 = (!$this.c41().v3y_1.q40_1 && !descriptor.y1r(index) && descriptor.x1r(index).m1r());
    return $this.k48_1;
  }
  function JsonTreeDecoder(json, value, polymorphicDiscriminator, polyDescriptor) {
    polymorphicDiscriminator = polymorphicDiscriminator === VOID ? null : polymorphicDiscriminator;
    polyDescriptor = polyDescriptor === VOID ? null : polyDescriptor;
    AbstractJsonTreeDecoder.call(this, json, value, polymorphicDiscriminator);
    this.h48_1 = value;
    this.i48_1 = polyDescriptor;
    this.j48_1 = 0;
    this.k48_1 = false;
  }
  protoOf(JsonTreeDecoder).w = function () {
    return this.h48_1;
  };
  protoOf(JsonTreeDecoder).d1u = function (descriptor) {
    while (this.j48_1 < descriptor.s1r()) {
      var _unary__edvuaz = this.j48_1;
      this.j48_1 = _unary__edvuaz + 1 | 0;
      var name = this.o27(descriptor, _unary__edvuaz);
      var index = this.j48_1 - 1 | 0;
      this.k48_1 = false;
      var tmp;
      var tmp_0;
      // Inline function 'kotlin.collections.contains' call
      // Inline function 'kotlin.collections.containsKey' call
      var this_0 = this.w();
      if ((isInterface(this_0, KtMap) ? this_0 : THROW_CCE()).h2(name)) {
        tmp_0 = true;
      } else {
        tmp_0 = absenceIsNull(this, descriptor, index);
      }
      if (tmp_0) {
        tmp = !this.l47_1.s40_1 || !coerceInputValue_0(this, descriptor, index, name);
      } else {
        tmp = false;
      }
      if (tmp) {
        return index;
      }
    }
    return -1;
  };
  protoOf(JsonTreeDecoder).x1s = function () {
    return !this.k48_1 && protoOf(AbstractJsonTreeDecoder).x1s.call(this);
  };
  protoOf(JsonTreeDecoder).p27 = function (descriptor, index) {
    var strategy = namingStrategy(descriptor, this.c41());
    var baseName = descriptor.u1r(index);
    if (strategy == null) {
      if (!this.l47_1.w40_1)
        return baseName;
      if (this.w().k2().r(baseName))
        return baseName;
    }
    var deserializationNamesMap_0 = deserializationNamesMap(this.c41(), descriptor);
    // Inline function 'kotlin.collections.find' call
    var tmp0 = this.w().k2();
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var _iterator__ex2g4s = tmp0.j();
      while (_iterator__ex2g4s.k()) {
        var element = _iterator__ex2g4s.l();
        if (deserializationNamesMap_0.j2(element) === index) {
          tmp$ret$1 = element;
          break $l$block;
        }
      }
      tmp$ret$1 = null;
    }
    var tmp0_safe_receiver = tmp$ret$1;
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      return tmp0_safe_receiver;
    }
    var fallbackName = strategy == null ? null : strategy.b44(descriptor, index, baseName);
    return fallbackName == null ? baseName : fallbackName;
  };
  protoOf(JsonTreeDecoder).o47 = function (tag) {
    return getValue(this.w(), tag);
  };
  protoOf(JsonTreeDecoder).m1t = function (descriptor) {
    if (descriptor === this.i48_1) {
      var tmp = this.c41();
      var tmp1 = this.n47();
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var serialName = this.i48_1.e1r();
      if (!(tmp1 instanceof JsonObject)) {
        var tmp_0 = getKClass(JsonObject).za();
        var tmp_1 = getKClassFromExpression(tmp1).za();
        var tmp$ret$0 = this.q28();
        throw JsonDecodingException_0(-1, 'Expected ' + tmp_0 + ', but had ' + tmp_1 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$0, toString(tmp1));
      }
      return new JsonTreeDecoder(tmp, tmp1, this.k47_1, this.i48_1);
    }
    return protoOf(AbstractJsonTreeDecoder).m1t.call(this, descriptor);
  };
  protoOf(JsonTreeDecoder).n1t = function (descriptor) {
    var tmp;
    if (this.l47_1.m40_1) {
      tmp = true;
    } else {
      var tmp_0 = descriptor.q1r();
      tmp = tmp_0 instanceof PolymorphicKind;
    }
    if (tmp)
      return Unit_instance;
    var strategy = namingStrategy(descriptor, this.c41());
    var tmp_1;
    if (strategy == null && !this.l47_1.w40_1) {
      tmp_1 = jsonCachedSerialNames(descriptor);
    } else if (!(strategy == null)) {
      tmp_1 = deserializationNamesMap(this.c41(), descriptor).k2();
    } else {
      var tmp_2 = jsonCachedSerialNames(descriptor);
      var tmp0_safe_receiver = get_schemaCache(this.c41()).n46(descriptor, get_JsonDeserializationNamesKey());
      // Inline function 'kotlin.collections.orEmpty' call
      var tmp0_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.k2();
      var tmp$ret$0 = tmp0_elvis_lhs == null ? emptySet() : tmp0_elvis_lhs;
      tmp_1 = plus_0(tmp_2, tmp$ret$0);
    }
    var names = tmp_1;
    var _iterator__ex2g4s = this.w().k2().j();
    while (_iterator__ex2g4s.k()) {
      var key = _iterator__ex2g4s.l();
      if (!names.r(key) && !(key === this.k47_1)) {
        throw UnknownKeyException(key, this.w().toString());
      }
    }
  };
  function JsonTreeListDecoder(json, value) {
    AbstractJsonTreeDecoder.call(this, json, value);
    this.r48_1 = value;
    this.s48_1 = this.r48_1.m();
    this.t48_1 = -1;
  }
  protoOf(JsonTreeListDecoder).w = function () {
    return this.r48_1;
  };
  protoOf(JsonTreeListDecoder).p27 = function (descriptor, index) {
    return index.toString();
  };
  protoOf(JsonTreeListDecoder).o47 = function (tag) {
    return this.r48_1.o(toInt(tag));
  };
  protoOf(JsonTreeListDecoder).d1u = function (descriptor) {
    while (this.t48_1 < (this.s48_1 - 1 | 0)) {
      this.t48_1 = this.t48_1 + 1 | 0;
      return this.t48_1;
    }
    return -1;
  };
  function JsonPrimitiveDecoder(json, value, polymorphicDiscriminator) {
    polymorphicDiscriminator = polymorphicDiscriminator === VOID ? null : polymorphicDiscriminator;
    AbstractJsonTreeDecoder.call(this, json, value, polymorphicDiscriminator);
    this.a49_1 = value;
    this.k28('primitive');
  }
  protoOf(JsonPrimitiveDecoder).w = function () {
    return this.a49_1;
  };
  protoOf(JsonPrimitiveDecoder).d1u = function (descriptor) {
    return 0;
  };
  protoOf(JsonPrimitiveDecoder).o47 = function (tag) {
    // Inline function 'kotlin.require' call
    if (!(tag === 'primitive')) {
      var message = "This input can only handle primitives with 'primitive' tag";
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return this.a49_1;
  };
  function JsonTreeMapDecoder(json, value) {
    JsonTreeDecoder.call(this, json, value);
    this.l49_1 = value;
    this.m49_1 = toList(this.l49_1.k2());
    this.n49_1 = imul(this.m49_1.m(), 2);
    this.o49_1 = -1;
  }
  protoOf(JsonTreeMapDecoder).w = function () {
    return this.l49_1;
  };
  protoOf(JsonTreeMapDecoder).p27 = function (descriptor, index) {
    var i = index / 2 | 0;
    return this.m49_1.o(i);
  };
  protoOf(JsonTreeMapDecoder).d1u = function (descriptor) {
    while (this.o49_1 < (this.n49_1 - 1 | 0)) {
      this.o49_1 = this.o49_1 + 1 | 0;
      return this.o49_1;
    }
    return -1;
  };
  protoOf(JsonTreeMapDecoder).o47 = function (tag) {
    return (this.o49_1 % 2 | 0) === 0 ? JsonPrimitive_2(tag) : getValue(this.l49_1, tag);
  };
  protoOf(JsonTreeMapDecoder).n1t = function (descriptor) {
  };
  function readPolymorphicJson(_this__u8e3s4, discriminator, element, deserializer) {
    return (new JsonTreeDecoder(_this__u8e3s4, element, discriminator, deserializer.d1q())).l1t(deserializer);
  }
  function writeJson(json, value, serializer) {
    var result = {_v: null};
    var encoder = new JsonTreeEncoder(json, writeJson$lambda(result));
    encoder.e1v(serializer, value);
    var tmp;
    if (result._v == null) {
      throwUninitializedPropertyAccessException('result');
    } else {
      tmp = result._v;
    }
    return tmp;
  }
  function JsonTreeEncoder(json, nodeConsumer) {
    AbstractJsonTreeEncoder.call(this, json, nodeConsumer);
    var tmp = this;
    // Inline function 'kotlin.collections.linkedMapOf' call
    tmp.b4a_1 = LinkedHashMap_init_$Create$();
  }
  protoOf(JsonTreeEncoder).c4a = function (key, element) {
    // Inline function 'kotlin.collections.set' call
    this.b4a_1.m2(key, element);
  };
  protoOf(JsonTreeEncoder).f1v = function (descriptor, index, serializer, value) {
    if (!(value == null) || this.s49_1.q40_1) {
      protoOf(AbstractJsonTreeEncoder).f1v.call(this, descriptor, index, serializer, value);
    }
  };
  protoOf(JsonTreeEncoder).d4a = function () {
    return new JsonObject(this.b4a_1);
  };
  function inlineUnsignedNumberEncoder($this, tag) {
    return new AbstractJsonTreeEncoder$inlineUnsignedNumberEncoder$1($this, tag);
  }
  function inlineUnquotedLiteralEncoder($this, tag, inlineDescriptor) {
    return new AbstractJsonTreeEncoder$inlineUnquotedLiteralEncoder$1($this, tag, inlineDescriptor);
  }
  function AbstractJsonTreeEncoder$inlineUnsignedNumberEncoder$1(this$0, $tag) {
    this.s4a_1 = this$0;
    this.t4a_1 = $tag;
    AbstractEncoder.call(this);
    this.r4a_1 = this$0.q49_1.b1u();
  }
  protoOf(AbstractJsonTreeEncoder$inlineUnsignedNumberEncoder$1).b1u = function () {
    return this.r4a_1;
  };
  protoOf(AbstractJsonTreeEncoder$inlineUnsignedNumberEncoder$1).u4a = function (s) {
    return this.s4a_1.c4a(this.t4a_1, new JsonLiteral(s, false));
  };
  protoOf(AbstractJsonTreeEncoder$inlineUnsignedNumberEncoder$1).l1u = function (value) {
    // Inline function 'kotlin.toUInt' call
    var tmp$ret$0 = _UInt___init__impl__l7qpdl(value);
    return this.u4a(UInt__toString_impl_dbgl21(tmp$ret$0));
  };
  protoOf(AbstractJsonTreeEncoder$inlineUnsignedNumberEncoder$1).m1u = function (value) {
    // Inline function 'kotlin.toULong' call
    var tmp$ret$0 = _ULong___init__impl__c78o9k(value);
    return this.u4a(ULong__toString_impl_f9au7k(tmp$ret$0));
  };
  protoOf(AbstractJsonTreeEncoder$inlineUnsignedNumberEncoder$1).j1u = function (value) {
    // Inline function 'kotlin.toUByte' call
    var tmp$ret$0 = _UByte___init__impl__g9hnc4(value);
    return this.u4a(UByte__toString_impl_v72jg(tmp$ret$0));
  };
  protoOf(AbstractJsonTreeEncoder$inlineUnsignedNumberEncoder$1).k1u = function (value) {
    // Inline function 'kotlin.toUShort' call
    var tmp$ret$0 = _UShort___init__impl__jigrne(value);
    return this.u4a(UShort__toString_impl_edaoee(tmp$ret$0));
  };
  function AbstractJsonTreeEncoder$inlineUnquotedLiteralEncoder$1(this$0, $tag, $inlineDescriptor) {
    this.v4a_1 = this$0;
    this.w4a_1 = $tag;
    this.x4a_1 = $inlineDescriptor;
    AbstractEncoder.call(this);
  }
  protoOf(AbstractJsonTreeEncoder$inlineUnquotedLiteralEncoder$1).b1u = function () {
    return this.v4a_1.q49_1.b1u();
  };
  protoOf(AbstractJsonTreeEncoder$inlineUnquotedLiteralEncoder$1).q1u = function (value) {
    return this.v4a_1.c4a(this.w4a_1, new JsonLiteral(value, false, this.x4a_1));
  };
  function AbstractJsonTreeEncoder$beginStructure$lambda(this$0) {
    return function (node) {
      this$0.c4a(this$0.j28(), node);
      return Unit_instance;
    };
  }
  function AbstractJsonTreeEncoder(json, nodeConsumer) {
    NamedValueEncoder.call(this);
    this.q49_1 = json;
    this.r49_1 = nodeConsumer;
    this.s49_1 = this.q49_1.v3y_1;
    this.t49_1 = null;
    this.u49_1 = null;
  }
  protoOf(AbstractJsonTreeEncoder).c41 = function () {
    return this.q49_1;
  };
  protoOf(AbstractJsonTreeEncoder).b1u = function () {
    return this.q49_1.b1u();
  };
  protoOf(AbstractJsonTreeEncoder).p27 = function (descriptor, index) {
    return getJsonElementName(descriptor, this.q49_1, index);
  };
  protoOf(AbstractJsonTreeEncoder).m42 = function (element) {
    var tmp;
    if (!(this.t49_1 == null)) {
      tmp = !(element instanceof JsonObject);
    } else {
      tmp = false;
    }
    if (tmp) {
      throwJsonElementPolymorphicException(this.u49_1, element);
    }
    this.e1v(JsonElementSerializer_getInstance(), element);
  };
  protoOf(AbstractJsonTreeEncoder).j1v = function (descriptor, index) {
    return this.s49_1.l40_1;
  };
  protoOf(AbstractJsonTreeEncoder).t27 = function (parentName, childName) {
    return childName;
  };
  protoOf(AbstractJsonTreeEncoder).h1v = function () {
  };
  protoOf(AbstractJsonTreeEncoder).h1u = function () {
    var tmp0_elvis_lhs = this.s27();
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return this.r49_1(JsonNull_getInstance());
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var tag = tmp;
    this.e4a(tag);
  };
  protoOf(AbstractJsonTreeEncoder).e4a = function (tag) {
    return this.c4a(tag, JsonNull_getInstance());
  };
  protoOf(AbstractJsonTreeEncoder).w27 = function (tag) {
    return this.e4a((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeEncoder).f4a = function (tag, value) {
    return this.c4a(tag, JsonPrimitive_1(value));
  };
  protoOf(AbstractJsonTreeEncoder).x27 = function (tag, value) {
    return this.f4a((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), value);
  };
  protoOf(AbstractJsonTreeEncoder).g4a = function (tag, value) {
    return this.c4a(tag, JsonPrimitive_1(value));
  };
  protoOf(AbstractJsonTreeEncoder).y27 = function (tag, value) {
    return this.g4a((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), value);
  };
  protoOf(AbstractJsonTreeEncoder).h4a = function (tag, value) {
    return this.c4a(tag, JsonPrimitive_1(value));
  };
  protoOf(AbstractJsonTreeEncoder).z27 = function (tag, value) {
    return this.h4a((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), value);
  };
  protoOf(AbstractJsonTreeEncoder).i4a = function (tag, value) {
    return this.c4a(tag, JsonPrimitive_1(value));
  };
  protoOf(AbstractJsonTreeEncoder).a28 = function (tag, value) {
    return this.i4a((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), value);
  };
  protoOf(AbstractJsonTreeEncoder).j4a = function (tag, value) {
    this.c4a(tag, JsonPrimitive_1(value));
    if (!this.s49_1.v40_1 && !isFinite(value)) {
      throw InvalidFloatingPointEncoded(value, tag, toString(this.d4a()));
    }
  };
  protoOf(AbstractJsonTreeEncoder).b28 = function (tag, value) {
    return this.j4a((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), value);
  };
  protoOf(AbstractJsonTreeEncoder).e1v = function (serializer, value) {
    if (!(this.s27() == null) || !get_requiresTopLevelTag(carrierDescriptor(serializer.d1q(), this.b1u()))) {
      $l$block: {
        // Inline function 'kotlinx.serialization.json.internal.encodePolymorphically' call
        if (this.c41().v3y_1.t40_1) {
          serializer.e1q(this, value);
          break $l$block;
        }
        var isPolymorphicSerializer = serializer instanceof AbstractPolymorphicSerializer;
        var tmp;
        if (isPolymorphicSerializer) {
          tmp = !this.c41().v3y_1.b41_1.equals(ClassDiscriminatorMode_NONE_getInstance());
        } else {
          var tmp_0;
          switch (this.c41().v3y_1.b41_1.q2_1) {
            case 0:
            case 2:
              tmp_0 = false;
              break;
            case 1:
              // Inline function 'kotlin.let' call

              var it = serializer.d1q().q1r();
              tmp_0 = equals(it, CLASS_getInstance()) || equals(it, OBJECT_getInstance());
              break;
            default:
              noWhenBranchMatchedException();
              break;
          }
          tmp = tmp_0;
        }
        var needDiscriminator = tmp;
        var baseClassDiscriminator = needDiscriminator ? classDiscriminator(serializer.d1q(), this.c41()) : null;
        var tmp_1;
        if (isPolymorphicSerializer) {
          var casted = serializer instanceof AbstractPolymorphicSerializer ? serializer : THROW_CCE();
          $l$block_0: {
            // Inline function 'kotlin.requireNotNull' call
            if (value == null) {
              var message = 'Value for serializer ' + toString(serializer.d1q()) + ' should always be non-null. Please report issue to the kotlinx.serialization tracker.';
              throw IllegalArgumentException_init_$Create$(toString(message));
            } else {
              break $l$block_0;
            }
          }
          var actual = findPolymorphicSerializer_0(casted, this, value);
          if (!(baseClassDiscriminator == null)) {
            access$validateIfSealed$tPolymorphicKt(serializer, actual, baseClassDiscriminator);
          }
          checkKind(actual.d1q().q1r());
          tmp_1 = isInterface(actual, SerializationStrategy) ? actual : THROW_CCE();
        } else {
          tmp_1 = serializer;
        }
        var actualSerializer = tmp_1;
        if (!(baseClassDiscriminator == null)) {
          var serialName = actualSerializer.d1q().e1r();
          this.t49_1 = baseClassDiscriminator;
          this.u49_1 = serialName;
        }
        actualSerializer.e1q(this, value);
      }
    } else {
      // Inline function 'kotlin.apply' call
      (new JsonPrimitiveEncoder(this.q49_1, this.r49_1)).e1v(serializer, value);
    }
  };
  protoOf(AbstractJsonTreeEncoder).k4a = function (tag, value) {
    this.c4a(tag, JsonPrimitive_1(value));
    if (!this.s49_1.v40_1 && !isFinite_0(value)) {
      throw InvalidFloatingPointEncoded(value, tag, toString(this.d4a()));
    }
  };
  protoOf(AbstractJsonTreeEncoder).c28 = function (tag, value) {
    return this.k4a((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), value);
  };
  protoOf(AbstractJsonTreeEncoder).l4a = function (tag, value) {
    return this.c4a(tag, JsonPrimitive_0(value));
  };
  protoOf(AbstractJsonTreeEncoder).d28 = function (tag, value) {
    return this.l4a((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), value);
  };
  protoOf(AbstractJsonTreeEncoder).m4a = function (tag, value) {
    return this.c4a(tag, JsonPrimitive_2(toString_1(value)));
  };
  protoOf(AbstractJsonTreeEncoder).e28 = function (tag, value) {
    return this.m4a((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), value);
  };
  protoOf(AbstractJsonTreeEncoder).n4a = function (tag, value) {
    return this.c4a(tag, JsonPrimitive_2(value));
  };
  protoOf(AbstractJsonTreeEncoder).f28 = function (tag, value) {
    return this.n4a((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), value);
  };
  protoOf(AbstractJsonTreeEncoder).o4a = function (tag, enumDescriptor, ordinal) {
    return this.c4a(tag, JsonPrimitive_2(enumDescriptor.u1r(ordinal)));
  };
  protoOf(AbstractJsonTreeEncoder).g28 = function (tag, enumDescriptor, ordinal) {
    return this.o4a((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), enumDescriptor, ordinal);
  };
  protoOf(AbstractJsonTreeEncoder).p4a = function (tag, value) {
    this.c4a(tag, JsonPrimitive_2(toString(value)));
  };
  protoOf(AbstractJsonTreeEncoder).u27 = function (tag, value) {
    return this.p4a((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), value);
  };
  protoOf(AbstractJsonTreeEncoder).q4a = function (tag, inlineDescriptor) {
    return get_isUnsignedNumber(inlineDescriptor) ? inlineUnsignedNumberEncoder(this, tag) : get_isUnquotedLiteral(inlineDescriptor) ? inlineUnquotedLiteralEncoder(this, tag, inlineDescriptor) : protoOf(NamedValueEncoder).h28.call(this, tag, inlineDescriptor);
  };
  protoOf(AbstractJsonTreeEncoder).h28 = function (tag, inlineDescriptor) {
    return this.q4a((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), inlineDescriptor);
  };
  protoOf(AbstractJsonTreeEncoder).s1u = function (descriptor) {
    var tmp;
    if (!(this.s27() == null)) {
      if (!(this.t49_1 == null))
        this.u49_1 = descriptor.e1r();
      tmp = protoOf(NamedValueEncoder).s1u.call(this, descriptor);
    } else {
      tmp = (new JsonPrimitiveEncoder(this.q49_1, this.r49_1)).s1u(descriptor);
    }
    return tmp;
  };
  protoOf(AbstractJsonTreeEncoder).m1t = function (descriptor) {
    var tmp;
    if (this.s27() == null) {
      tmp = this.r49_1;
    } else {
      tmp = AbstractJsonTreeEncoder$beginStructure$lambda(this);
    }
    var consumer = tmp;
    var tmp0_subject = descriptor.q1r();
    var tmp_0;
    var tmp_1;
    if (equals(tmp0_subject, LIST_getInstance())) {
      tmp_1 = true;
    } else {
      tmp_1 = tmp0_subject instanceof PolymorphicKind;
    }
    if (tmp_1) {
      tmp_0 = new JsonTreeListEncoder(this.q49_1, consumer);
    } else {
      if (equals(tmp0_subject, MAP_getInstance())) {
        // Inline function 'kotlinx.serialization.json.internal.selectMapMode' call
        var this_0 = this.q49_1;
        var keyDescriptor = carrierDescriptor(descriptor.x1r(0), this_0.b1u());
        var keyKind = keyDescriptor.q1r();
        var tmp_2;
        var tmp_3;
        if (keyKind instanceof PrimitiveKind) {
          tmp_3 = true;
        } else {
          tmp_3 = equals(keyKind, ENUM_getInstance());
        }
        if (tmp_3) {
          tmp_2 = new JsonTreeMapEncoder(this.q49_1, consumer);
        } else {
          if (this_0.v3y_1.o40_1) {
            tmp_2 = new JsonTreeListEncoder(this.q49_1, consumer);
          } else {
            throw InvalidKeyKindException(keyDescriptor);
          }
        }
        tmp_0 = tmp_2;
      } else {
        tmp_0 = new JsonTreeEncoder(this.q49_1, consumer);
      }
    }
    var encoder = tmp_0;
    var discriminator = this.t49_1;
    if (!(discriminator == null)) {
      if (encoder instanceof JsonTreeMapEncoder) {
        encoder.c4a('key', JsonPrimitive_2(discriminator));
        var tmp1_elvis_lhs = this.u49_1;
        encoder.c4a('value', JsonPrimitive_2(tmp1_elvis_lhs == null ? descriptor.e1r() : tmp1_elvis_lhs));
      } else {
        var tmp2_elvis_lhs = this.u49_1;
        encoder.c4a(discriminator, JsonPrimitive_2(tmp2_elvis_lhs == null ? descriptor.e1r() : tmp2_elvis_lhs));
      }
      this.t49_1 = null;
      this.u49_1 = null;
    }
    return encoder;
  };
  protoOf(AbstractJsonTreeEncoder).i28 = function (descriptor) {
    this.r49_1(this.d4a());
  };
  function get_requiresTopLevelTag(_this__u8e3s4) {
    var tmp;
    var tmp_0 = _this__u8e3s4.q1r();
    if (tmp_0 instanceof PrimitiveKind) {
      tmp = true;
    } else {
      tmp = _this__u8e3s4.q1r() === ENUM_getInstance();
    }
    return tmp;
  }
  function JsonPrimitiveEncoder(json, nodeConsumer) {
    AbstractJsonTreeEncoder.call(this, json, nodeConsumer);
    this.n4b_1 = null;
    this.k28('primitive');
  }
  protoOf(JsonPrimitiveEncoder).c4a = function (key, element) {
    // Inline function 'kotlin.require' call
    if (!(key === 'primitive')) {
      var message = "This output can only consume primitives with 'primitive' tag";
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    // Inline function 'kotlin.require' call
    if (!(this.n4b_1 == null)) {
      var message_0 = 'Primitive element was already recorded. Does call to .encodeXxx happen more than once?';
      throw IllegalArgumentException_init_$Create$(toString(message_0));
    }
    this.n4b_1 = element;
    this.r49_1(element);
  };
  protoOf(JsonPrimitiveEncoder).d4a = function () {
    var tmp0 = this.n4b_1;
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlin.requireNotNull' call
      if (tmp0 == null) {
        var message = 'Primitive element has not been recorded. Is call to .encodeXxx is missing in serializer?';
        throw IllegalArgumentException_init_$Create$(toString(message));
      } else {
        tmp$ret$1 = tmp0;
        break $l$block;
      }
    }
    return tmp$ret$1;
  };
  function JsonTreeListEncoder(json, nodeConsumer) {
    AbstractJsonTreeEncoder.call(this, json, nodeConsumer);
    var tmp = this;
    // Inline function 'kotlin.collections.arrayListOf' call
    tmp.u4b_1 = ArrayList_init_$Create$();
  }
  protoOf(JsonTreeListEncoder).p27 = function (descriptor, index) {
    return index.toString();
  };
  protoOf(JsonTreeListEncoder).c4a = function (key, element) {
    var idx = toInt(key);
    this.u4b_1.f2(idx, element);
  };
  protoOf(JsonTreeListEncoder).d4a = function () {
    return new JsonArray(this.u4b_1);
  };
  function _get_tag__e6h4qf($this) {
    var tmp = $this.f4b_1;
    if (!(tmp == null))
      return tmp;
    else {
      throwUninitializedPropertyAccessException('tag');
    }
  }
  function JsonTreeMapEncoder(json, nodeConsumer) {
    JsonTreeEncoder.call(this, json, nodeConsumer);
    this.g4b_1 = true;
  }
  protoOf(JsonTreeMapEncoder).c4a = function (key, element) {
    if (this.g4b_1) {
      var tmp = this;
      var tmp_0;
      if (element instanceof JsonPrimitive) {
        tmp_0 = element.f41();
      } else {
        if (element instanceof JsonObject) {
          throw InvalidKeyKindException(JsonObjectSerializer_getInstance().x41_1);
        } else {
          if (element instanceof JsonArray) {
            throw InvalidKeyKindException(JsonArraySerializer_getInstance().c42_1);
          } else {
            noWhenBranchMatchedException();
          }
        }
      }
      tmp.f4b_1 = tmp_0;
      this.g4b_1 = false;
    } else {
      var tmp0 = this.b4a_1;
      // Inline function 'kotlin.collections.set' call
      var key_0 = _get_tag__e6h4qf(this);
      tmp0.m2(key_0, element);
      this.g4b_1 = true;
    }
  };
  protoOf(JsonTreeMapEncoder).d4a = function () {
    return new JsonObject(this.b4a_1);
  };
  function writeJson$lambda($result) {
    return function (it) {
      $result._v = it;
      return Unit_instance;
    };
  }
  var WriteMode_OBJ_instance;
  var WriteMode_LIST_instance;
  var WriteMode_MAP_instance;
  var WriteMode_POLY_OBJ_instance;
  function values() {
    return [WriteMode_OBJ_getInstance(), WriteMode_LIST_getInstance(), WriteMode_MAP_getInstance(), WriteMode_POLY_OBJ_getInstance()];
  }
  function get_entries() {
    if ($ENTRIES == null)
      $ENTRIES = enumEntries(values());
    return $ENTRIES;
  }
  var WriteMode_entriesInitialized;
  function WriteMode_initEntries() {
    if (WriteMode_entriesInitialized)
      return Unit_instance;
    WriteMode_entriesInitialized = true;
    WriteMode_OBJ_instance = new WriteMode('OBJ', 0, _Char___init__impl__6a9atx(123), _Char___init__impl__6a9atx(125));
    WriteMode_LIST_instance = new WriteMode('LIST', 1, _Char___init__impl__6a9atx(91), _Char___init__impl__6a9atx(93));
    WriteMode_MAP_instance = new WriteMode('MAP', 2, _Char___init__impl__6a9atx(123), _Char___init__impl__6a9atx(125));
    WriteMode_POLY_OBJ_instance = new WriteMode('POLY_OBJ', 3, _Char___init__impl__6a9atx(91), _Char___init__impl__6a9atx(93));
  }
  var $ENTRIES;
  function WriteMode(name, ordinal, begin, end) {
    Enum.call(this, name, ordinal);
    this.a47_1 = begin;
    this.b47_1 = end;
  }
  function switchMode(_this__u8e3s4, desc) {
    var tmp0_subject = desc.q1r();
    var tmp;
    if (tmp0_subject instanceof PolymorphicKind) {
      tmp = WriteMode_POLY_OBJ_getInstance();
    } else {
      if (equals(tmp0_subject, LIST_getInstance())) {
        tmp = WriteMode_LIST_getInstance();
      } else {
        if (equals(tmp0_subject, MAP_getInstance())) {
          // Inline function 'kotlinx.serialization.json.internal.selectMapMode' call
          var keyDescriptor = carrierDescriptor(desc.x1r(0), _this__u8e3s4.b1u());
          var keyKind = keyDescriptor.q1r();
          var tmp_0;
          var tmp_1;
          if (keyKind instanceof PrimitiveKind) {
            tmp_1 = true;
          } else {
            tmp_1 = equals(keyKind, ENUM_getInstance());
          }
          if (tmp_1) {
            tmp_0 = WriteMode_MAP_getInstance();
          } else {
            if (_this__u8e3s4.v3y_1.o40_1) {
              tmp_0 = WriteMode_LIST_getInstance();
            } else {
              throw InvalidKeyKindException(keyDescriptor);
            }
          }
          tmp = tmp_0;
        } else {
          tmp = WriteMode_OBJ_getInstance();
        }
      }
    }
    return tmp;
  }
  function carrierDescriptor(_this__u8e3s4, module_0) {
    var tmp;
    if (equals(_this__u8e3s4.q1r(), CONTEXTUAL_getInstance())) {
      var tmp0_safe_receiver = getContextualDescriptor(module_0, _this__u8e3s4);
      var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : carrierDescriptor(tmp0_safe_receiver, module_0);
      tmp = tmp1_elvis_lhs == null ? _this__u8e3s4 : tmp1_elvis_lhs;
    } else if (_this__u8e3s4.r1r()) {
      tmp = carrierDescriptor(_this__u8e3s4.x1r(0), module_0);
    } else {
      tmp = _this__u8e3s4;
    }
    return tmp;
  }
  function WriteMode_OBJ_getInstance() {
    WriteMode_initEntries();
    return WriteMode_OBJ_instance;
  }
  function WriteMode_LIST_getInstance() {
    WriteMode_initEntries();
    return WriteMode_LIST_instance;
  }
  function WriteMode_MAP_getInstance() {
    WriteMode_initEntries();
    return WriteMode_MAP_instance;
  }
  function WriteMode_POLY_OBJ_getInstance() {
    WriteMode_initEntries();
    return WriteMode_POLY_OBJ_instance;
  }
  function appendEscape($this, lastPosition, current) {
    $this.v4b(lastPosition, current);
    return appendEsc($this, current + 1 | 0);
  }
  function decodedString($this, lastPosition, currentPosition) {
    $this.v4b(lastPosition, currentPosition);
    var result = $this.q3z_1.toString();
    $this.q3z_1.vc(0);
    return result;
  }
  function takePeeked($this) {
    // Inline function 'kotlin.also' call
    var this_0 = ensureNotNull($this.p3z_1);
    $this.p3z_1 = null;
    return this_0;
  }
  function wasUnquotedString($this) {
    return !(charSequenceGet($this.w4b(), $this.n3z_1 - 1 | 0) === _Char___init__impl__6a9atx(34));
  }
  function appendEsc($this, startPosition) {
    var currentPosition = startPosition;
    currentPosition = $this.x4b(currentPosition);
    if (currentPosition === -1) {
      $this.x43('Expected escape sequence to continue, got EOF');
    }
    var tmp = $this.w4b();
    var _unary__edvuaz = currentPosition;
    currentPosition = _unary__edvuaz + 1 | 0;
    var currentChar = charSequenceGet(tmp, _unary__edvuaz);
    if (currentChar === _Char___init__impl__6a9atx(117)) {
      return appendHex($this, $this.w4b(), currentPosition);
    }
    // Inline function 'kotlin.code' call
    var tmp$ret$0 = Char__toInt_impl_vasixd(currentChar);
    var c = escapeToChar(tmp$ret$0);
    if (c === _Char___init__impl__6a9atx(0)) {
      $this.x43("Invalid escaped char '" + toString_1(currentChar) + "'");
    }
    $this.q3z_1.h8(c);
    return currentPosition;
  }
  function appendHex($this, source, startPos) {
    if ((startPos + 4 | 0) >= charSequenceLength(source)) {
      $this.n3z_1 = startPos;
      $this.y4b();
      if (($this.n3z_1 + 4 | 0) >= charSequenceLength(source)) {
        $this.x43('Unexpected EOF during unicode escape');
      }
      return appendHex($this, source, $this.n3z_1);
    }
    $this.q3z_1.h8(numberToChar((((fromHexChar($this, source, startPos) << 12) + (fromHexChar($this, source, startPos + 1 | 0) << 8) | 0) + (fromHexChar($this, source, startPos + 2 | 0) << 4) | 0) + fromHexChar($this, source, startPos + 3 | 0) | 0));
    return startPos + 4 | 0;
  }
  function fromHexChar($this, source, currentPosition) {
    var character = charSequenceGet(source, currentPosition);
    var tmp;
    if (_Char___init__impl__6a9atx(48) <= character ? character <= _Char___init__impl__6a9atx(57) : false) {
      // Inline function 'kotlin.code' call
      var tmp_0 = Char__toInt_impl_vasixd(character);
      // Inline function 'kotlin.code' call
      var this_0 = _Char___init__impl__6a9atx(48);
      tmp = tmp_0 - Char__toInt_impl_vasixd(this_0) | 0;
    } else if (_Char___init__impl__6a9atx(97) <= character ? character <= _Char___init__impl__6a9atx(102) : false) {
      // Inline function 'kotlin.code' call
      var tmp_1 = Char__toInt_impl_vasixd(character);
      // Inline function 'kotlin.code' call
      var this_1 = _Char___init__impl__6a9atx(97);
      tmp = (tmp_1 - Char__toInt_impl_vasixd(this_1) | 0) + 10 | 0;
    } else if (_Char___init__impl__6a9atx(65) <= character ? character <= _Char___init__impl__6a9atx(70) : false) {
      // Inline function 'kotlin.code' call
      var tmp_2 = Char__toInt_impl_vasixd(character);
      // Inline function 'kotlin.code' call
      var this_2 = _Char___init__impl__6a9atx(65);
      tmp = (tmp_2 - Char__toInt_impl_vasixd(this_2) | 0) + 10 | 0;
    } else {
      $this.x43("Invalid toHexChar char '" + toString_1(character) + "' in unicode escape");
    }
    return tmp;
  }
  function consumeBoolean2($this, start) {
    var current = $this.x4b(start);
    if (current >= charSequenceLength($this.w4b()) || current === -1) {
      $this.x43('EOF');
    }
    var tmp = $this.w4b();
    var _unary__edvuaz = current;
    current = _unary__edvuaz + 1 | 0;
    // Inline function 'kotlin.code' call
    var this_0 = charSequenceGet(tmp, _unary__edvuaz);
    var tmp0_subject = Char__toInt_impl_vasixd(this_0) | 32;
    var tmp_0;
    // Inline function 'kotlin.code' call
    var this_1 = _Char___init__impl__6a9atx(116);
    if (tmp0_subject === Char__toInt_impl_vasixd(this_1)) {
      consumeBooleanLiteral($this, 'rue', current);
      tmp_0 = true;
    } else {
      // Inline function 'kotlin.code' call
      var this_2 = _Char___init__impl__6a9atx(102);
      if (tmp0_subject === Char__toInt_impl_vasixd(this_2)) {
        consumeBooleanLiteral($this, 'alse', current);
        tmp_0 = false;
      } else {
        $this.x43("Expected valid boolean literal prefix, but had '" + $this.c45() + "'");
      }
    }
    return tmp_0;
  }
  function consumeBooleanLiteral($this, literalSuffix, current) {
    if ((charSequenceLength($this.w4b()) - current | 0) < literalSuffix.length) {
      $this.x43('Unexpected end of boolean literal');
    }
    var inductionVariable = 0;
    var last = charSequenceLength(literalSuffix) - 1 | 0;
    if (inductionVariable <= last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var expected = charSequenceGet(literalSuffix, i);
        var actual = charSequenceGet($this.w4b(), current + i | 0);
        // Inline function 'kotlin.code' call
        var tmp = Char__toInt_impl_vasixd(expected);
        // Inline function 'kotlin.code' call
        if (!(tmp === (Char__toInt_impl_vasixd(actual) | 32))) {
          $this.x43("Expected valid boolean literal prefix, but had '" + $this.c45() + "'");
        }
      }
       while (inductionVariable <= last);
    $this.n3z_1 = current + literalSuffix.length | 0;
  }
  function consumeNumericLiteral$calculateExponent(exponentAccumulator, isExponentPositive) {
    var tmp;
    switch (isExponentPositive) {
      case false:
        // Inline function 'kotlin.math.pow' call

        var x = -exponentAccumulator.n3();
        tmp = Math.pow(10.0, x);
        break;
      case true:
        // Inline function 'kotlin.math.pow' call

        var x_0 = exponentAccumulator.n3();
        tmp = Math.pow(10.0, x_0);
        break;
      default:
        noWhenBranchMatchedException();
        break;
    }
    return tmp;
  }
  function AbstractJsonLexer() {
    this.n3z_1 = 0;
    this.o3z_1 = new JsonPath();
    this.p3z_1 = null;
    this.q3z_1 = StringBuilder_init_$Create$();
  }
  protoOf(AbstractJsonLexer).y4b = function () {
  };
  protoOf(AbstractJsonLexer).q46 = function () {
    var current = this.z4b();
    var source = this.w4b();
    if (current >= charSequenceLength(source) || current === -1)
      return false;
    if (charSequenceGet(source, current) === _Char___init__impl__6a9atx(44)) {
      this.n3z_1 = this.n3z_1 + 1 | 0;
      return true;
    }
    return false;
  };
  protoOf(AbstractJsonLexer).a4c = function (c) {
    return c === _Char___init__impl__6a9atx(125) || c === _Char___init__impl__6a9atx(93) || (c === _Char___init__impl__6a9atx(58) || c === _Char___init__impl__6a9atx(44)) ? false : true;
  };
  protoOf(AbstractJsonLexer).r3z = function () {
    var nextToken = this.e45();
    if (!(nextToken === 10)) {
      this.x43('Expected EOF after parsing, but had ' + toString_1(charSequenceGet(this.w4b(), this.n3z_1 - 1 | 0)) + ' instead');
    }
  };
  protoOf(AbstractJsonLexer).y44 = function (expected) {
    var token = this.e45();
    if (!(token === expected)) {
      this.b4c(expected);
    }
    return token;
  };
  protoOf(AbstractJsonLexer).c4c = function (expected) {
    if (this.n3z_1 > 0 && expected === _Char___init__impl__6a9atx(34)) {
      var tmp$ret$1;
      $l$block: {
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.withPositionRollback' call
        var snapshot = this.n3z_1;
        try {
          this.n3z_1 = this.n3z_1 - 1 | 0;
          tmp$ret$1 = this.c45();
          break $l$block;
        }finally {
          this.n3z_1 = snapshot;
        }
      }
      var inputLiteral = tmp$ret$1;
      if (inputLiteral === 'null') {
        this.w43("Expected string literal but 'null' literal was found", this.n3z_1 - 1 | 0, "Use 'coerceInputValues = true' in 'Json {}' builder to coerce nulls if property has a default value.");
      }
    }
    this.b4c(charToTokenClass(expected));
  };
  protoOf(AbstractJsonLexer).d4c = function (expectedToken, wasConsumed) {
    var expected = tokenDescription(expectedToken);
    var position = wasConsumed ? this.n3z_1 - 1 | 0 : this.n3z_1;
    var s = this.n3z_1 === charSequenceLength(this.w4b()) || position < 0 ? 'EOF' : toString_1(charSequenceGet(this.w4b(), position));
    this.x43('Expected ' + expected + ", but had '" + s + "' instead", position);
  };
  protoOf(AbstractJsonLexer).b4c = function (expectedToken, wasConsumed, $super) {
    wasConsumed = wasConsumed === VOID ? true : wasConsumed;
    return $super === VOID ? this.d4c(expectedToken, wasConsumed) : $super.d4c.call(this, expectedToken, wasConsumed);
  };
  protoOf(AbstractJsonLexer).z44 = function () {
    var source = this.w4b();
    var cpos = this.n3z_1;
    $l$loop_0: while (true) {
      cpos = this.x4b(cpos);
      if (cpos === -1)
        break $l$loop_0;
      var ch = charSequenceGet(source, cpos);
      if (ch === _Char___init__impl__6a9atx(32) || ch === _Char___init__impl__6a9atx(10) || ch === _Char___init__impl__6a9atx(13) || ch === _Char___init__impl__6a9atx(9)) {
        cpos = cpos + 1 | 0;
        continue $l$loop_0;
      }
      this.n3z_1 = cpos;
      return charToTokenClass(ch);
    }
    this.n3z_1 = cpos;
    return 10;
  };
  protoOf(AbstractJsonLexer).r46 = function (doConsume) {
    var current = this.z4b();
    current = this.x4b(current);
    var len = charSequenceLength(this.w4b()) - current | 0;
    if (len < 4 || current === -1)
      return false;
    var inductionVariable = 0;
    if (inductionVariable <= 3)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        if (!(charSequenceGet('null', i) === charSequenceGet(this.w4b(), current + i | 0)))
          return false;
      }
       while (inductionVariable <= 3);
    if (len > 4 && charToTokenClass(charSequenceGet(this.w4b(), current + 4 | 0)) === 0)
      return false;
    if (doConsume) {
      this.n3z_1 = current + 4 | 0;
    }
    return true;
  };
  protoOf(AbstractJsonLexer).c47 = function (doConsume, $super) {
    doConsume = doConsume === VOID ? true : doConsume;
    return $super === VOID ? this.r46(doConsume) : $super.r46.call(this, doConsume);
  };
  protoOf(AbstractJsonLexer).s46 = function (isLenient) {
    var token = this.z44();
    var tmp;
    if (isLenient) {
      if (!(token === 1) && !(token === 0))
        return null;
      tmp = this.c45();
    } else {
      if (!(token === 1))
        return null;
      tmp = this.b45();
    }
    var string = tmp;
    this.p3z_1 = string;
    return string;
  };
  protoOf(AbstractJsonLexer).e4c = function () {
    this.p3z_1 = null;
  };
  protoOf(AbstractJsonLexer).f4c = function (startPos, endPos) {
    // Inline function 'kotlin.text.substring' call
    var this_0 = this.w4b();
    return toString(charSequenceSubSequence(this_0, startPos, endPos));
  };
  protoOf(AbstractJsonLexer).b45 = function () {
    if (!(this.p3z_1 == null)) {
      return takePeeked(this);
    }
    return this.v46();
  };
  protoOf(AbstractJsonLexer).consumeString2 = function (source, startPosition, current) {
    var currentPosition = current;
    var lastPosition = startPosition;
    var char = charSequenceGet(source, currentPosition);
    var usedAppend = false;
    while (!(char === _Char___init__impl__6a9atx(34))) {
      if (char === _Char___init__impl__6a9atx(92)) {
        usedAppend = true;
        currentPosition = this.x4b(appendEscape(this, lastPosition, currentPosition));
        if (currentPosition === -1) {
          this.x43('Unexpected EOF', currentPosition);
        }
        lastPosition = currentPosition;
      } else {
        currentPosition = currentPosition + 1 | 0;
        if (currentPosition >= charSequenceLength(source)) {
          usedAppend = true;
          this.v4b(lastPosition, currentPosition);
          currentPosition = this.x4b(currentPosition);
          if (currentPosition === -1) {
            this.x43('Unexpected EOF', currentPosition);
          }
          lastPosition = currentPosition;
        }
      }
      char = charSequenceGet(source, currentPosition);
    }
    var tmp;
    if (!usedAppend) {
      tmp = this.f4c(lastPosition, currentPosition);
    } else {
      tmp = decodedString(this, lastPosition, currentPosition);
    }
    var string = tmp;
    this.n3z_1 = currentPosition + 1 | 0;
    return string;
  };
  protoOf(AbstractJsonLexer).w46 = function () {
    var result = this.c45();
    if (result === 'null' && wasUnquotedString(this)) {
      this.x43("Unexpected 'null' value instead of string literal");
    }
    return result;
  };
  protoOf(AbstractJsonLexer).c45 = function () {
    if (!(this.p3z_1 == null)) {
      return takePeeked(this);
    }
    var current = this.z4b();
    if (current >= charSequenceLength(this.w4b()) || current === -1) {
      this.x43('EOF', current);
    }
    var token = charToTokenClass(charSequenceGet(this.w4b(), current));
    if (token === 1) {
      return this.b45();
    }
    if (!(token === 0)) {
      this.x43('Expected beginning of the string, but got ' + toString_1(charSequenceGet(this.w4b(), current)));
    }
    var usedAppend = false;
    while (charToTokenClass(charSequenceGet(this.w4b(), current)) === 0) {
      current = current + 1 | 0;
      if (current >= charSequenceLength(this.w4b())) {
        usedAppend = true;
        this.v4b(this.n3z_1, current);
        var eof = this.x4b(current);
        if (eof === -1) {
          this.n3z_1 = current;
          return decodedString(this, 0, 0);
        } else {
          current = eof;
        }
      }
    }
    var tmp;
    if (!usedAppend) {
      tmp = this.f4c(this.n3z_1, current);
    } else {
      tmp = decodedString(this, this.n3z_1, current);
    }
    var result = tmp;
    this.n3z_1 = current;
    return result;
  };
  protoOf(AbstractJsonLexer).v4b = function (fromIndex, toIndex) {
    this.q3z_1.pc(this.w4b(), fromIndex, toIndex);
  };
  protoOf(AbstractJsonLexer).u46 = function (allowLenientStrings) {
    // Inline function 'kotlin.collections.mutableListOf' call
    var tokenStack = ArrayList_init_$Create$();
    var lastToken = this.z44();
    if (!(lastToken === 8) && !(lastToken === 6)) {
      this.c45();
      return Unit_instance;
    }
    $l$loop: while (true) {
      lastToken = this.z44();
      if (lastToken === 1) {
        if (allowLenientStrings)
          this.c45();
        else
          this.v46();
        continue $l$loop;
      }
      var tmp0_subject = lastToken;
      if (tmp0_subject === 8 || tmp0_subject === 6) {
        tokenStack.e(lastToken);
      } else if (tmp0_subject === 9) {
        if (!(last(tokenStack) === 8))
          throw JsonDecodingException_0(this.n3z_1, 'found ] instead of } at path: ' + this.o3z_1.toString(), this.w4b());
        removeLast(tokenStack);
      } else if (tmp0_subject === 7) {
        if (!(last(tokenStack) === 6))
          throw JsonDecodingException_0(this.n3z_1, 'found } instead of ] at path: ' + this.o3z_1.toString(), this.w4b());
        removeLast(tokenStack);
      } else if (tmp0_subject === 10) {
        this.x43('Unexpected end of input due to malformed JSON during ignoring unknown keys');
      }
      this.e45();
      if (tokenStack.m() === 0)
        return Unit_instance;
    }
  };
  protoOf(AbstractJsonLexer).toString = function () {
    return "JsonReader(source='" + toString(this.w4b()) + "', currentPosition=" + this.n3z_1 + ')';
  };
  protoOf(AbstractJsonLexer).t46 = function (key) {
    var processed = this.f4c(0, this.n3z_1);
    var lastIndexOf_0 = lastIndexOf(processed, key);
    this.w43("Encountered an unknown key '" + key + "'", lastIndexOf_0, "Use 'ignoreUnknownKeys = true' in 'Json {}' builder to ignore unknown keys.");
  };
  protoOf(AbstractJsonLexer).w43 = function (message, position, hint) {
    var tmp;
    // Inline function 'kotlin.text.isEmpty' call
    if (charSequenceLength(hint) === 0) {
      tmp = '';
    } else {
      tmp = '\n' + hint;
    }
    var hintMessage = tmp;
    throw JsonDecodingException_0(position, message + ' at path: ' + this.o3z_1.k44() + hintMessage, this.w4b());
  };
  protoOf(AbstractJsonLexer).x43 = function (message, position, hint, $super) {
    position = position === VOID ? this.n3z_1 : position;
    hint = hint === VOID ? '' : hint;
    return $super === VOID ? this.w43(message, position, hint) : $super.w43.call(this, message, position, hint);
  };
  protoOf(AbstractJsonLexer).m41 = function () {
    var current = this.z4b();
    current = this.x4b(current);
    if (current >= charSequenceLength(this.w4b()) || current === -1) {
      this.x43('EOF');
    }
    var tmp;
    if (charSequenceGet(this.w4b(), current) === _Char___init__impl__6a9atx(34)) {
      current = current + 1 | 0;
      if (current === charSequenceLength(this.w4b())) {
        this.x43('EOF');
      }
      tmp = true;
    } else {
      tmp = false;
    }
    var hasQuotation = tmp;
    var accumulator = new Long(0, 0);
    var exponentAccumulator = new Long(0, 0);
    var isNegative = false;
    var isExponentPositive = false;
    var hasExponent = false;
    var start = current;
    $l$loop_4: while (!(current === charSequenceLength(this.w4b()))) {
      var ch = charSequenceGet(this.w4b(), current);
      if ((ch === _Char___init__impl__6a9atx(101) || ch === _Char___init__impl__6a9atx(69)) && !hasExponent) {
        if (current === start) {
          this.x43('Unexpected symbol ' + toString_1(ch) + ' in numeric literal');
        }
        isExponentPositive = true;
        hasExponent = true;
        current = current + 1 | 0;
        continue $l$loop_4;
      }
      if (ch === _Char___init__impl__6a9atx(45) && hasExponent) {
        if (current === start) {
          this.x43("Unexpected symbol '-' in numeric literal");
        }
        isExponentPositive = false;
        current = current + 1 | 0;
        continue $l$loop_4;
      }
      if (ch === _Char___init__impl__6a9atx(43) && hasExponent) {
        if (current === start) {
          this.x43("Unexpected symbol '+' in numeric literal");
        }
        isExponentPositive = true;
        current = current + 1 | 0;
        continue $l$loop_4;
      }
      if (ch === _Char___init__impl__6a9atx(45)) {
        if (!(current === start)) {
          this.x43("Unexpected symbol '-' in numeric literal");
        }
        isNegative = true;
        current = current + 1 | 0;
        continue $l$loop_4;
      }
      var token = charToTokenClass(ch);
      if (!(token === 0))
        break $l$loop_4;
      current = current + 1 | 0;
      var digit = Char__minus_impl_a2frrh(ch, _Char___init__impl__6a9atx(48));
      if (!(0 <= digit ? digit <= 9 : false)) {
        this.x43("Unexpected symbol '" + toString_1(ch) + "' in numeric literal");
      }
      if (hasExponent) {
        // Inline function 'kotlin.Long.times' call
        // Inline function 'kotlin.Long.plus' call
        exponentAccumulator = exponentAccumulator.y2(toLong(10)).w2(toLong(digit));
        continue $l$loop_4;
      }
      // Inline function 'kotlin.Long.times' call
      // Inline function 'kotlin.Long.minus' call
      accumulator = accumulator.y2(toLong(10)).x2(toLong(digit));
      if (accumulator.b1(new Long(0, 0)) > 0) {
        this.x43('Numeric value overflow');
      }
    }
    var hasChars = !(current === start);
    if (start === current || (isNegative && start === (current - 1 | 0))) {
      this.x43('Expected numeric literal');
    }
    if (hasQuotation) {
      if (!hasChars) {
        this.x43('EOF');
      }
      if (!(charSequenceGet(this.w4b(), current) === _Char___init__impl__6a9atx(34))) {
        this.x43('Expected closing quotation mark');
      }
      current = current + 1 | 0;
    }
    this.n3z_1 = current;
    if (hasExponent) {
      var doubleAccumulator = accumulator.n3() * consumeNumericLiteral$calculateExponent(exponentAccumulator, isExponentPositive);
      if (doubleAccumulator > (new Long(-1, 2147483647)).n3() || doubleAccumulator < (new Long(0, -2147483648)).n3()) {
        this.x43('Numeric value overflow');
      }
      // Inline function 'kotlin.math.floor' call
      if (!(Math.floor(doubleAccumulator) === doubleAccumulator)) {
        this.x43("Can't convert " + doubleAccumulator + ' to Long');
      }
      accumulator = numberToLong(doubleAccumulator);
    }
    var tmp_0;
    if (isNegative) {
      tmp_0 = accumulator;
    } else if (!accumulator.equals(new Long(0, -2147483648))) {
      tmp_0 = accumulator.d3();
    } else {
      this.x43('Numeric value overflow');
    }
    return tmp_0;
  };
  protoOf(AbstractJsonLexer).d47 = function () {
    var current = this.z4b();
    if (current === charSequenceLength(this.w4b())) {
      this.x43('EOF');
    }
    var tmp;
    if (charSequenceGet(this.w4b(), current) === _Char___init__impl__6a9atx(34)) {
      current = current + 1 | 0;
      tmp = true;
    } else {
      tmp = false;
    }
    var hasQuotation = tmp;
    var result = consumeBoolean2(this, current);
    if (hasQuotation) {
      if (this.n3z_1 === charSequenceLength(this.w4b())) {
        this.x43('EOF');
      }
      if (!(charSequenceGet(this.w4b(), this.n3z_1) === _Char___init__impl__6a9atx(34))) {
        this.x43('Expected closing quotation mark');
      }
      this.n3z_1 = this.n3z_1 + 1 | 0;
    }
    return result;
  };
  function charToTokenClass(c) {
    var tmp;
    // Inline function 'kotlin.code' call
    if (Char__toInt_impl_vasixd(c) < 126) {
      var tmp_0 = CharMappings_getInstance().h4c_1;
      // Inline function 'kotlin.code' call
      tmp = tmp_0[Char__toInt_impl_vasixd(c)];
    } else {
      tmp = 0;
    }
    return tmp;
  }
  function tokenDescription(token) {
    return token === 1 ? "quotation mark '\"'" : token === 2 ? "string escape sequence '\\'" : token === 4 ? "comma ','" : token === 5 ? "colon ':'" : token === 6 ? "start of the object '{'" : token === 7 ? "end of the object '}'" : token === 8 ? "start of the array '['" : token === 9 ? "end of the array ']'" : token === 10 ? 'end of the input' : token === 127 ? 'invalid token' : 'valid token';
  }
  function escapeToChar(c) {
    return c < 117 ? CharMappings_getInstance().g4c_1[c] : _Char___init__impl__6a9atx(0);
  }
  function initEscape($this) {
    var inductionVariable = 0;
    if (inductionVariable <= 31)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        initC2ESC($this, i, _Char___init__impl__6a9atx(117));
      }
       while (inductionVariable <= 31);
    initC2ESC($this, 8, _Char___init__impl__6a9atx(98));
    initC2ESC($this, 9, _Char___init__impl__6a9atx(116));
    initC2ESC($this, 10, _Char___init__impl__6a9atx(110));
    initC2ESC($this, 12, _Char___init__impl__6a9atx(102));
    initC2ESC($this, 13, _Char___init__impl__6a9atx(114));
    initC2ESC_0($this, _Char___init__impl__6a9atx(47), _Char___init__impl__6a9atx(47));
    initC2ESC_0($this, _Char___init__impl__6a9atx(34), _Char___init__impl__6a9atx(34));
    initC2ESC_0($this, _Char___init__impl__6a9atx(92), _Char___init__impl__6a9atx(92));
  }
  function initCharToToken($this) {
    var inductionVariable = 0;
    if (inductionVariable <= 32)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        initC2TC($this, i, 127);
      }
       while (inductionVariable <= 32);
    initC2TC($this, 9, 3);
    initC2TC($this, 10, 3);
    initC2TC($this, 13, 3);
    initC2TC($this, 32, 3);
    initC2TC_0($this, _Char___init__impl__6a9atx(44), 4);
    initC2TC_0($this, _Char___init__impl__6a9atx(58), 5);
    initC2TC_0($this, _Char___init__impl__6a9atx(123), 6);
    initC2TC_0($this, _Char___init__impl__6a9atx(125), 7);
    initC2TC_0($this, _Char___init__impl__6a9atx(91), 8);
    initC2TC_0($this, _Char___init__impl__6a9atx(93), 9);
    initC2TC_0($this, _Char___init__impl__6a9atx(34), 1);
    initC2TC_0($this, _Char___init__impl__6a9atx(92), 2);
  }
  function initC2ESC($this, c, esc) {
    if (!(esc === _Char___init__impl__6a9atx(117))) {
      // Inline function 'kotlin.code' call
      var tmp$ret$0 = Char__toInt_impl_vasixd(esc);
      $this.g4c_1[tmp$ret$0] = numberToChar(c);
    }
  }
  function initC2ESC_0($this, c, esc) {
    // Inline function 'kotlin.code' call
    var tmp$ret$0 = Char__toInt_impl_vasixd(c);
    return initC2ESC($this, tmp$ret$0, esc);
  }
  function initC2TC($this, c, cl) {
    $this.h4c_1[c] = cl;
  }
  function initC2TC_0($this, c, cl) {
    // Inline function 'kotlin.code' call
    var tmp$ret$0 = Char__toInt_impl_vasixd(c);
    return initC2TC($this, tmp$ret$0, cl);
  }
  function CharMappings() {
    CharMappings_instance = this;
    this.g4c_1 = charArray(117);
    this.h4c_1 = new Int8Array(126);
    initEscape(this);
    initCharToToken(this);
  }
  var CharMappings_instance;
  function CharMappings_getInstance() {
    if (CharMappings_instance == null)
      new CharMappings();
    return CharMappings_instance;
  }
  function StringJsonLexerWithComments(source) {
    StringJsonLexer.call(this, source);
  }
  protoOf(StringJsonLexerWithComments).e45 = function () {
    var source = this.w4b();
    var cpos = this.z4b();
    if (cpos >= source.length || cpos === -1)
      return 10;
    this.n3z_1 = cpos + 1 | 0;
    return charToTokenClass(charSequenceGet(source, cpos));
  };
  protoOf(StringJsonLexerWithComments).a45 = function () {
    var current = this.z4b();
    if (current >= this.w4b().length || current === -1)
      return false;
    return this.a4c(charSequenceGet(this.w4b(), current));
  };
  protoOf(StringJsonLexerWithComments).p46 = function (expected) {
    var source = this.w4b();
    var current = this.z4b();
    if (current >= source.length || current === -1) {
      this.n3z_1 = -1;
      this.c4c(expected);
    }
    var c = charSequenceGet(source, current);
    this.n3z_1 = current + 1 | 0;
    if (c === expected)
      return Unit_instance;
    else {
      this.c4c(expected);
    }
  };
  protoOf(StringJsonLexerWithComments).z44 = function () {
    var source = this.w4b();
    var cpos = this.z4b();
    if (cpos >= source.length || cpos === -1)
      return 10;
    this.n3z_1 = cpos;
    return charToTokenClass(charSequenceGet(source, cpos));
  };
  protoOf(StringJsonLexerWithComments).z4b = function () {
    var current = this.n3z_1;
    if (current === -1)
      return current;
    var source = this.w4b();
    $l$loop_1: while (current < source.length) {
      var c = charSequenceGet(source, current);
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
      if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9)) {
        current = current + 1 | 0;
        continue $l$loop_1;
      }
      if (c === _Char___init__impl__6a9atx(47) && (current + 1 | 0) < source.length) {
        var tmp0_subject = charSequenceGet(source, current + 1 | 0);
        if (tmp0_subject === _Char___init__impl__6a9atx(47)) {
          current = indexOf_0(source, _Char___init__impl__6a9atx(10), current + 2 | 0);
          if (current === -1) {
            current = source.length;
          } else {
            current = current + 1 | 0;
          }
          continue $l$loop_1;
        } else if (tmp0_subject === _Char___init__impl__6a9atx(42)) {
          current = indexOf(source, '*/', current + 2 | 0);
          if (current === -1) {
            this.n3z_1 = source.length;
            this.x43('Expected end of the block comment: "*/", but had EOF instead');
          } else {
            current = current + 2 | 0;
          }
          continue $l$loop_1;
        }
      }
      break $l$loop_1;
    }
    this.n3z_1 = current;
    return current;
  };
  function StringJsonLexer(source) {
    AbstractJsonLexer.call(this);
    this.r4c_1 = source;
  }
  protoOf(StringJsonLexer).w4b = function () {
    return this.r4c_1;
  };
  protoOf(StringJsonLexer).x4b = function (position) {
    return position < this.w4b().length ? position : -1;
  };
  protoOf(StringJsonLexer).e45 = function () {
    var source = this.w4b();
    var cpos = this.n3z_1;
    $l$loop: while (!(cpos === -1) && cpos < source.length) {
      var _unary__edvuaz = cpos;
      cpos = _unary__edvuaz + 1 | 0;
      var c = charSequenceGet(source, _unary__edvuaz);
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
      if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9))
        continue $l$loop;
      this.n3z_1 = cpos;
      return charToTokenClass(c);
    }
    this.n3z_1 = source.length;
    return 10;
  };
  protoOf(StringJsonLexer).a45 = function () {
    var current = this.n3z_1;
    if (current === -1)
      return false;
    var source = this.w4b();
    $l$loop: while (current < source.length) {
      var c = charSequenceGet(source, current);
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
      if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9)) {
        current = current + 1 | 0;
        continue $l$loop;
      }
      this.n3z_1 = current;
      return this.a4c(c);
    }
    this.n3z_1 = current;
    return false;
  };
  protoOf(StringJsonLexer).z4b = function () {
    var current = this.n3z_1;
    if (current === -1)
      return current;
    var source = this.w4b();
    $l$loop: while (current < source.length) {
      var c = charSequenceGet(source, current);
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
      if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9)) {
        current = current + 1 | 0;
      } else {
        break $l$loop;
      }
    }
    this.n3z_1 = current;
    return current;
  };
  protoOf(StringJsonLexer).p46 = function (expected) {
    if (this.n3z_1 === -1) {
      this.c4c(expected);
    }
    var source = this.w4b();
    var cpos = this.n3z_1;
    $l$loop: while (cpos < source.length) {
      var _unary__edvuaz = cpos;
      cpos = _unary__edvuaz + 1 | 0;
      var c = charSequenceGet(source, _unary__edvuaz);
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
      if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9))
        continue $l$loop;
      this.n3z_1 = cpos;
      if (c === expected)
        return Unit_instance;
      this.c4c(expected);
    }
    this.n3z_1 = -1;
    this.c4c(expected);
  };
  protoOf(StringJsonLexer).v46 = function () {
    this.p46(_Char___init__impl__6a9atx(34));
    var current = this.n3z_1;
    var closingQuote = indexOf_0(this.w4b(), _Char___init__impl__6a9atx(34), current);
    if (closingQuote === -1) {
      this.c45();
      this.d4c(1, false);
    }
    var inductionVariable = current;
    if (inductionVariable < closingQuote)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        if (charSequenceGet(this.w4b(), i) === _Char___init__impl__6a9atx(92)) {
          return this.consumeString2(this.w4b(), this.n3z_1, i);
        }
      }
       while (inductionVariable < closingQuote);
    this.n3z_1 = closingQuote + 1 | 0;
    // Inline function 'kotlin.text.substring' call
    // Inline function 'kotlin.js.asDynamic' call
    return this.w4b().substring(current, closingQuote);
  };
  protoOf(StringJsonLexer).x46 = function (keyToMatch, isLenient) {
    var positionSnapshot = this.n3z_1;
    try {
      if (!(this.e45() === 6))
        return null;
      var firstKey = this.s46(isLenient);
      if (!(firstKey === keyToMatch))
        return null;
      this.e4c();
      if (!(this.e45() === 5))
        return null;
      return this.s46(isLenient);
    }finally {
      this.n3z_1 = positionSnapshot;
      this.e4c();
    }
  };
  function StringJsonLexer_0(json, source) {
    return !json.v3y_1.a41_1 ? new StringJsonLexer(source) : new StringJsonLexerWithComments(source);
  }
  function get_schemaCache(_this__u8e3s4) {
    return _this__u8e3s4.x3y_1;
  }
  function JsonToStringWriter() {
    this.d3z_1 = StringBuilder_init_$Create$_0(128);
  }
  protoOf(JsonToStringWriter).b43 = function (value) {
    this.d3z_1.tc(value);
  };
  protoOf(JsonToStringWriter).v42 = function (char) {
    this.d3z_1.h8(char);
  };
  protoOf(JsonToStringWriter).x42 = function (text) {
    this.d3z_1.g8(text);
  };
  protoOf(JsonToStringWriter).h43 = function (text) {
    printQuoted(this.d3z_1, text);
  };
  protoOf(JsonToStringWriter).e3z = function () {
    this.d3z_1.wc();
  };
  protoOf(JsonToStringWriter).toString = function () {
    return this.d3z_1.toString();
  };
  function createMapForCache(initialCapacity) {
    return HashMap_init_$Create$(initialCapacity);
  }
  //region block: post-declaration
  protoOf(defer$1).m1r = get_isNullable;
  protoOf(defer$1).r1r = get_isInline;
  protoOf(defer$1).t1r = get_annotations;
  protoOf(PolymorphismValidator).y2a = contextual;
  //endregion
  //region block: init
  Companion_instance = new Companion();
  Companion_instance_0 = new Companion_0();
  Companion_instance_1 = new Companion_1();
  Companion_instance_2 = new Companion_2();
  Tombstone_instance = new Tombstone();
  //endregion
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = Default_getInstance;
  _.$_$.b = JsonElementSerializer_getInstance;
  _.$_$.c = JsonNull_getInstance;
  _.$_$.d = Companion_instance_1;
  _.$_$.e = JsonObjectSerializer_getInstance;
  _.$_$.f = JsonArrayBuilder;
  _.$_$.g = JsonArray;
  _.$_$.h = JsonDecoder;
  _.$_$.i = JsonElement;
  _.$_$.j = JsonEncoder;
  _.$_$.k = JsonNull;
  _.$_$.l = JsonObjectBuilder;
  _.$_$.m = JsonObject;
  _.$_$.n = JsonPrimitive_2;
  _.$_$.o = JsonPrimitive_1;
  _.$_$.p = JsonPrimitive_0;
  _.$_$.q = JsonPrimitive;
  _.$_$.r = Json_0;
  _.$_$.s = addJsonObject;
  _.$_$.t = add;
  _.$_$.u = get_booleanOrNull;
  _.$_$.v = get_contentOrNull;
  _.$_$.w = get_double;
  _.$_$.x = get_doubleOrNull;
  _.$_$.y = get_floatOrNull;
  _.$_$.z = get_intOrNull;
  _.$_$.a1 = get_jsonArray;
  _.$_$.b1 = get_jsonObject;
  _.$_$.c1 = get_jsonPrimitive;
  _.$_$.d1 = get_longOrNull;
  _.$_$.e1 = putJsonArray;
  _.$_$.f1 = putJsonObject;
  _.$_$.g1 = put;
  _.$_$.h1 = put_0;
  _.$_$.i1 = put_1;
  //endregion
  return _;
}));

//# sourceMappingURL=kotlinx-serialization-kotlinx-serialization-json.js.map
