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
  var EmptySerializersModule = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.h2;
  var protoOf = kotlin_kotlin.$_$.bc;
  var initMetadataForObject = kotlin_kotlin.$_$.db;
  var VOID = kotlin_kotlin.$_$.h;
  var Unit_instance = kotlin_kotlin.$_$.f5;
  var initMetadataForClass = kotlin_kotlin.$_$.xa;
  var toString = kotlin_kotlin.$_$.fc;
  var IllegalArgumentException_init_$Create$ = kotlin_kotlin.$_$.u1;
  var charSequenceLength = kotlin_kotlin.$_$.ma;
  var charSequenceGet = kotlin_kotlin.$_$.la;
  var _Char___init__impl__6a9atx = kotlin_kotlin.$_$.o2;
  var equals = kotlin_kotlin.$_$.qa;
  var toString_0 = kotlin_kotlin.$_$.lh;
  var Enum = kotlin_kotlin.$_$.yf;
  var Decoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.p1;
  var CompositeDecoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.n1;
  var initMetadataForInterface = kotlin_kotlin.$_$.bb;
  var initMetadataForCompanion = kotlin_kotlin.$_$.ya;
  var StringBuilder_init_$Create$ = kotlin_kotlin.$_$.i1;
  var hashCode = kotlin_kotlin.$_$.wa;
  var joinToString = kotlin_kotlin.$_$.h7;
  var THROW_CCE = kotlin_kotlin.$_$.ig;
  var KtMap = kotlin_kotlin.$_$.o5;
  var toDoubleOrNull = kotlin_kotlin.$_$.ve;
  var KtList = kotlin_kotlin.$_$.m5;
  var numberRangeToNumber = kotlin_kotlin.$_$.vb;
  var ClosedRange = kotlin_kotlin.$_$.kc;
  var isInterface = kotlin_kotlin.$_$.mb;
  var contains = kotlin_kotlin.$_$.rc;
  var SerializerFactory = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.b2;
  var toDouble = kotlin_kotlin.$_$.we;
  var getKClassFromExpression = kotlin_kotlin.$_$.e;
  var getBooleanHashCode = kotlin_kotlin.$_$.sa;
  var getStringHashCode = kotlin_kotlin.$_$.va;
  var NumberFormatException_init_$Create$ = kotlin_kotlin.$_$.e2;
  var StringCompanionObject_instance = kotlin_kotlin.$_$.s4;
  var serializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.v;
  var InlinePrimitiveDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.w1;
  var LinkedHashMap_init_$Create$ = kotlin_kotlin.$_$.y;
  var ArrayList_init_$Create$ = kotlin_kotlin.$_$.p;
  var MapSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.t;
  var SerialDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.g1;
  var KSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.l2;
  var SEALED_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.e;
  var buildSerialDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.j1;
  var noWhenBranchMatchedException = kotlin_kotlin.$_$.hh;
  var STRING_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.f;
  var ListSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.s;
  var ENUM_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.h;
  var PrimitiveSerialDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.c1;
  var toLongOrNull = kotlin_kotlin.$_$.af;
  var toULongOrNull = kotlin_kotlin.$_$.gf;
  var ULong = kotlin_kotlin.$_$.qg;
  var Companion_getInstance = kotlin_kotlin.$_$.d5;
  var serializer_0 = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.z;
  var _ULong___get_data__impl__fggpzb = kotlin_kotlin.$_$.t3;
  var toBooleanStrictOrNull = kotlin_kotlin.$_$.ue;
  var IllegalStateException_init_$Create$ = kotlin_kotlin.$_$.y1;
  var lazy = kotlin_kotlin.$_$.gh;
  var get_isNullable = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.f1;
  var get_isInline = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.e1;
  var get_annotations = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.d1;
  var KProperty1 = kotlin_kotlin.$_$.zc;
  var getPropertyCallableRef = kotlin_kotlin.$_$.ua;
  var Encoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.q1;
  var CompositeEncoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.o1;
  var toLong = kotlin_kotlin.$_$.dc;
  var _UInt___init__impl__l7qpdl = kotlin_kotlin.$_$.j3;
  var UInt__toString_impl_dbgl21 = kotlin_kotlin.$_$.l3;
  var _ULong___init__impl__c78o9k = kotlin_kotlin.$_$.s3;
  var ULong__toString_impl_f9au7k = kotlin_kotlin.$_$.u3;
  var _UByte___init__impl__g9hnc4 = kotlin_kotlin.$_$.a3;
  var UByte__toString_impl_v72jg = kotlin_kotlin.$_$.c3;
  var _UShort___init__impl__jigrne = kotlin_kotlin.$_$.b4;
  var UShort__toString_impl_edaoee = kotlin_kotlin.$_$.d4;
  var ElementMarker = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.t1;
  var captureStack = kotlin_kotlin.$_$.ia;
  var SerializationException = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.o2;
  var SerializationException_init_$Init$ = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.b;
  var charSequenceSubSequence = kotlin_kotlin.$_$.na;
  var coerceAtLeast = kotlin_kotlin.$_$.lc;
  var coerceAtMost = kotlin_kotlin.$_$.nc;
  var SerializationException_init_$Create$ = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.c;
  var CLASS_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.i;
  var singleOrNull = kotlin_kotlin.$_$.l8;
  var emptyMap = kotlin_kotlin.$_$.u6;
  var getValue = kotlin_kotlin.$_$.c7;
  var copyOf = kotlin_kotlin.$_$.n6;
  var copyOf_0 = kotlin_kotlin.$_$.o6;
  var LIST_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.j;
  var DeepRecursiveFunction = kotlin_kotlin.$_$.wf;
  var invoke = kotlin_kotlin.$_$.bh;
  var CoroutineImpl = kotlin_kotlin.$_$.aa;
  var DeepRecursiveScope = kotlin_kotlin.$_$.xf;
  var Unit = kotlin_kotlin.$_$.tg;
  var get_COROUTINE_SUSPENDED = kotlin_kotlin.$_$.k9;
  var initMetadataForLambda = kotlin_kotlin.$_$.cb;
  var initMetadataForCoroutine = kotlin_kotlin.$_$.za;
  var SealedClassSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.n2;
  var jsonCachedSerialNames = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.e2;
  var ENUM = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.h1;
  var PrimitiveKind = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.b1;
  var PolymorphicKind = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.a1;
  var CONTEXTUAL_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.g;
  var MAP_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.k;
  var contextual = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.i2;
  var SerializersModuleCollector = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.j2;
  var AbstractDecoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.l1;
  var AbstractPolymorphicSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.r1;
  var DeserializationStrategy = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.k2;
  var getKClass = kotlin_kotlin.$_$.f;
  var findPolymorphicSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.q2;
  var ensureNotNull = kotlin_kotlin.$_$.ah;
  var substringBefore = kotlin_kotlin.$_$.se;
  var removeSuffix = kotlin_kotlin.$_$.fe;
  var substringAfter = kotlin_kotlin.$_$.re;
  var contains_0 = kotlin_kotlin.$_$.hd;
  var plus = kotlin_kotlin.$_$.ih;
  var MissingFieldException = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.m2;
  var IllegalArgumentException = kotlin_kotlin.$_$.bg;
  var isFinite = kotlin_kotlin.$_$.dh;
  var isFinite_0 = kotlin_kotlin.$_$.ch;
  var toUInt = kotlin_kotlin.$_$.ff;
  var _UInt___get_data__impl__f0vqqw = kotlin_kotlin.$_$.k3;
  var toULong = kotlin_kotlin.$_$.hf;
  var toUByte = kotlin_kotlin.$_$.ef;
  var _UByte___get_data__impl__jof9qr = kotlin_kotlin.$_$.b3;
  var toUShort = kotlin_kotlin.$_$.if;
  var _UShort___get_data__impl__g0245 = kotlin_kotlin.$_$.c4;
  var objectCreate = kotlin_kotlin.$_$.ac;
  var AbstractEncoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.m1;
  var OBJECT_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.l;
  var findPolymorphicSerializer_0 = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.r2;
  var SerializationStrategy = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.p2;
  var toString_1 = kotlin_kotlin.$_$.v2;
  var Companion_getInstance_0 = kotlin_kotlin.$_$.c5;
  var serializer_1 = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.x;
  var Companion_getInstance_1 = kotlin_kotlin.$_$.b5;
  var serializer_2 = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.y;
  var Companion_getInstance_2 = kotlin_kotlin.$_$.e5;
  var serializer_3 = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.w;
  var setOf = kotlin_kotlin.$_$.k8;
  var Char__toInt_impl_vasixd = kotlin_kotlin.$_$.u2;
  var numberToChar = kotlin_kotlin.$_$.wb;
  var equals_0 = kotlin_kotlin.$_$.nd;
  var toByte = kotlin_kotlin.$_$.cc;
  var startsWith = kotlin_kotlin.$_$.oe;
  var NamedValueDecoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.y1;
  var toShort = kotlin_kotlin.$_$.ec;
  var single = kotlin_kotlin.$_$.le;
  var Char = kotlin_kotlin.$_$.tf;
  var emptySet = kotlin_kotlin.$_$.v6;
  var plus_0 = kotlin_kotlin.$_$.z7;
  var toInt = kotlin_kotlin.$_$.ye;
  var toList = kotlin_kotlin.$_$.w8;
  var throwUninitializedPropertyAccessException = kotlin_kotlin.$_$.kh;
  var NamedValueEncoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.z1;
  var enumEntries = kotlin_kotlin.$_$.ca;
  var getContextualDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.k1;
  var last = kotlin_kotlin.$_$.m7;
  var removeLast = kotlin_kotlin.$_$.h8;
  var lastIndexOf = kotlin_kotlin.$_$.zd;
  var Long = kotlin_kotlin.$_$.dg;
  var Char__minus_impl_a2frrh = kotlin_kotlin.$_$.q2;
  var numberToLong = kotlin_kotlin.$_$.zb;
  var charArray = kotlin_kotlin.$_$.ka;
  var indexOf = kotlin_kotlin.$_$.rd;
  var indexOf_0 = kotlin_kotlin.$_$.sd;
  var StringBuilder_init_$Create$_0 = kotlin_kotlin.$_$.h1;
  var HashMap_init_$Create$ = kotlin_kotlin.$_$.r;
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
    this.o3t_1 = configuration;
    this.p3t_1 = serializersModule;
    this.q3t_1 = new DescriptorSchemaCache();
  }
  protoOf(Json).u1o = function () {
    return this.p3t_1;
  };
  protoOf(Json).r3t = function (serializer, value) {
    var result = new JsonToStringWriter();
    try {
      encodeByWriter(this, result, serializer, value);
      return result.toString();
    }finally {
      result.x3t();
    }
  };
  protoOf(Json).s3t = function (deserializer, string) {
    var lexer = StringJsonLexer_0(this, string);
    var input = new StreamingJsonDecoder(this, WriteMode_OBJ_getInstance(), lexer, deserializer.w1k(), null);
    var result = input.e1o(deserializer);
    lexer.k3u();
    return result;
  };
  protoOf(Json).t3t = function (serializer, value) {
    return writeJson(this, value, serializer);
  };
  protoOf(Json).u3t = function (deserializer, element) {
    return readJson(this, element, deserializer);
  };
  protoOf(Json).v3t = function (string) {
    return this.s3t(JsonElementSerializer_getInstance(), string);
  };
  function Json_0(from, builderAction) {
    from = from === VOID ? Default_getInstance() : from;
    var builder = new JsonBuilder(from);
    builderAction(builder);
    var conf = builder.d3v();
    return new JsonImpl(conf, builder.c3v_1);
  }
  function JsonBuilder(json) {
    this.l3u_1 = json.o3t_1.e3v_1;
    this.m3u_1 = json.o3t_1.j3v_1;
    this.n3u_1 = json.o3t_1.f3v_1;
    this.o3u_1 = json.o3t_1.g3v_1;
    this.p3u_1 = json.o3t_1.i3v_1;
    this.q3u_1 = json.o3t_1.k3v_1;
    this.r3u_1 = json.o3t_1.l3v_1;
    this.s3u_1 = json.o3t_1.n3v_1;
    this.t3u_1 = json.o3t_1.u3v_1;
    this.u3u_1 = json.o3t_1.p3v_1;
    this.v3u_1 = json.o3t_1.q3v_1;
    this.w3u_1 = json.o3t_1.r3v_1;
    this.x3u_1 = json.o3t_1.s3v_1;
    this.y3u_1 = json.o3t_1.t3v_1;
    this.z3u_1 = json.o3t_1.o3v_1;
    this.a3v_1 = json.o3t_1.h3v_1;
    this.b3v_1 = json.o3t_1.m3v_1;
    this.c3v_1 = json.u1o();
  }
  protoOf(JsonBuilder).d3v = function () {
    if (this.b3v_1) {
      // Inline function 'kotlin.require' call
      if (!(this.s3u_1 === 'type')) {
        var message = 'Class discriminator should not be specified when array polymorphism is specified';
        throw IllegalArgumentException_init_$Create$(toString(message));
      }
      // Inline function 'kotlin.require' call
      if (!this.t3u_1.equals(ClassDiscriminatorMode_POLYMORPHIC_getInstance())) {
        var message_0 = 'useArrayPolymorphism option can only be used if classDiscriminatorMode in a default POLYMORPHIC state.';
        throw IllegalArgumentException_init_$Create$(toString(message_0));
      }
    }
    if (!this.p3u_1) {
      // Inline function 'kotlin.require' call
      if (!(this.q3u_1 === '    ')) {
        var message_1 = 'Indent should not be specified when default printing mode is used';
        throw IllegalArgumentException_init_$Create$(toString(message_1));
      }
    } else if (!(this.q3u_1 === '    ')) {
      var tmp3 = this.q3u_1;
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
        var message_2 = 'Only whitespace, tab, newline and carriage return are allowed as pretty print symbols. Had ' + this.q3u_1;
        throw IllegalArgumentException_init_$Create$(toString(message_2));
      }
    }
    return new JsonConfiguration(this.l3u_1, this.n3u_1, this.o3u_1, this.a3v_1, this.p3u_1, this.m3u_1, this.q3u_1, this.r3u_1, this.b3v_1, this.s3u_1, this.z3u_1, this.u3u_1, this.v3u_1, this.w3u_1, this.x3u_1, this.y3u_1, this.t3u_1);
  };
  function validateConfiguration($this) {
    if (equals($this.u1o(), EmptySerializersModule()))
      return Unit_instance;
    var collector = new PolymorphismValidator($this.o3t_1.m3v_1, $this.o3t_1.n3v_1);
    $this.u1o().g25(collector);
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
    this.e3v_1 = encodeDefaults;
    this.f3v_1 = ignoreUnknownKeys;
    this.g3v_1 = isLenient;
    this.h3v_1 = allowStructuredMapKeys;
    this.i3v_1 = prettyPrint;
    this.j3v_1 = explicitNulls;
    this.k3v_1 = prettyPrintIndent;
    this.l3v_1 = coerceInputValues;
    this.m3v_1 = useArrayPolymorphism;
    this.n3v_1 = classDiscriminator;
    this.o3v_1 = allowSpecialFloatingPointValues;
    this.p3v_1 = useAlternativeNames;
    this.q3v_1 = namingStrategy;
    this.r3v_1 = decodeEnumsCaseInsensitive;
    this.s3v_1 = allowTrailingComma;
    this.t3v_1 = allowComments;
    this.u3v_1 = classDiscriminatorMode;
  }
  protoOf(JsonConfiguration).toString = function () {
    return 'JsonConfiguration(encodeDefaults=' + this.e3v_1 + ', ignoreUnknownKeys=' + this.f3v_1 + ', isLenient=' + this.g3v_1 + ', ' + ('allowStructuredMapKeys=' + this.h3v_1 + ', prettyPrint=' + this.i3v_1 + ', explicitNulls=' + this.j3v_1 + ', ') + ("prettyPrintIndent='" + this.k3v_1 + "', coerceInputValues=" + this.l3v_1 + ', useArrayPolymorphism=' + this.m3v_1 + ', ') + ("classDiscriminator='" + this.n3v_1 + "', allowSpecialFloatingPointValues=" + this.o3v_1 + ', ') + ('useAlternativeNames=' + this.p3v_1 + ', namingStrategy=' + toString_0(this.q3v_1) + ', decodeEnumsCaseInsensitive=' + this.r3v_1 + ', ') + ('allowTrailingComma=' + this.s3v_1 + ', allowComments=' + this.t3v_1 + ', classDiscriminatorMode=' + this.u3v_1.toString() + ')');
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
    return this.y3v();
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
  protoOf(Companion_1).z3v = function () {
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
    this_0.f8(_Char___init__impl__6a9atx(58));
    this_0.d8(v);
    return this_0.toString();
  }
  function JsonObject(content) {
    JsonElement.call(this);
    this.a3w_1 = content;
  }
  protoOf(JsonObject).equals = function (other) {
    return equals(this.a3w_1, other);
  };
  protoOf(JsonObject).hashCode = function () {
    return hashCode(this.a3w_1);
  };
  protoOf(JsonObject).toString = function () {
    var tmp = this.a3w_1.u();
    return joinToString(tmp, ',', '{', '}', VOID, VOID, JsonObject$toString$lambda);
  };
  protoOf(JsonObject).k26 = function (key) {
    return this.a3w_1.f2(key);
  };
  protoOf(JsonObject).f2 = function (key) {
    if (!(!(key == null) ? typeof key === 'string' : false))
      return false;
    return this.k26((!(key == null) ? typeof key === 'string' : false) ? key : THROW_CCE());
  };
  protoOf(JsonObject).de = function (key) {
    return this.a3w_1.h2(key);
  };
  protoOf(JsonObject).h2 = function (key) {
    if (!(!(key == null) ? typeof key === 'string' : false))
      return null;
    return this.de((!(key == null) ? typeof key === 'string' : false) ? key : THROW_CCE());
  };
  protoOf(JsonObject).p = function () {
    return this.a3w_1.p();
  };
  protoOf(JsonObject).u = function () {
    return this.a3w_1.u();
  };
  protoOf(JsonObject).i2 = function () {
    return this.a3w_1.i2();
  };
  protoOf(JsonObject).m = function () {
    return this.a3w_1.m();
  };
  protoOf(JsonObject).j2 = function () {
    return this.a3w_1.j2();
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
    return toDoubleOrNull(_this__u8e3s4.y3v());
  }
  function Companion_2() {
  }
  var Companion_instance_2;
  function Companion_getInstance_6() {
    return Companion_instance_2;
  }
  function JsonArray(content) {
    JsonElement.call(this);
    this.b3w_1 = content;
  }
  protoOf(JsonArray).equals = function (other) {
    return equals(this.b3w_1, other);
  };
  protoOf(JsonArray).hashCode = function () {
    return hashCode(this.b3w_1);
  };
  protoOf(JsonArray).toString = function () {
    return joinToString(this.b3w_1, ',', '[', ']');
  };
  protoOf(JsonArray).c3w = function (element) {
    return this.b3w_1.r(element);
  };
  protoOf(JsonArray).r = function (element) {
    if (!(element instanceof JsonElement))
      return false;
    return this.c3w(element instanceof JsonElement ? element : THROW_CCE());
  };
  protoOf(JsonArray).d3w = function (elements) {
    return this.b3w_1.y1(elements);
  };
  protoOf(JsonArray).y1 = function (elements) {
    return this.d3w(elements);
  };
  protoOf(JsonArray).o = function (index) {
    return this.b3w_1.o(index);
  };
  protoOf(JsonArray).e3w = function (element) {
    return this.b3w_1.s(element);
  };
  protoOf(JsonArray).s = function (element) {
    if (!(element instanceof JsonElement))
      return -1;
    return this.e3w(element instanceof JsonElement ? element : THROW_CCE());
  };
  protoOf(JsonArray).p = function () {
    return this.b3w_1.p();
  };
  protoOf(JsonArray).j = function () {
    return this.b3w_1.j();
  };
  protoOf(JsonArray).q = function (index) {
    return this.b3w_1.q(index);
  };
  protoOf(JsonArray).z1 = function (fromIndex, toIndex) {
    return this.b3w_1.z1(fromIndex, toIndex);
  };
  protoOf(JsonArray).m = function () {
    return this.b3w_1.m();
  };
  function get_intOrNull(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    // Inline function 'kotlinx.serialization.json.mapExceptionsToNull' call
    var tmp;
    try {
      tmp = (new StringJsonLexer(_this__u8e3s4.y3v())).f3w();
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
      tmp = _this__u8e3s4.y3v();
    }
    return tmp;
  }
  function get_booleanOrNull(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    return toBooleanStrictOrNull_0(_this__u8e3s4.y3v());
  }
  function get_floatOrNull(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    // Inline function 'kotlin.text.toFloatOrNull' call
    var this_0 = _this__u8e3s4.y3v();
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return toDoubleOrNull(this_0);
  }
  function JsonNull() {
    JsonNull_instance = this;
    JsonPrimitive.call(this);
    this.g3w_1 = 'null';
  }
  protoOf(JsonNull).x3v = function () {
    return false;
  };
  protoOf(JsonNull).y3v = function () {
    return this.g3w_1;
  };
  protoOf(JsonNull).z3v = function () {
    return JsonNullSerializer_getInstance();
  };
  protoOf(JsonNull).v1w = function (typeParamsSerializers) {
    return this.z3v();
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
    return toDouble(_this__u8e3s4.y3v());
  }
  function get_longOrNull(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    // Inline function 'kotlinx.serialization.json.mapExceptionsToNull' call
    var tmp;
    try {
      tmp = (new StringJsonLexer(_this__u8e3s4.y3v())).f3w();
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
    this.h3w_1 = isString;
    this.i3w_1 = coerceToInlineType;
    this.j3w_1 = toString(body);
    if (!(this.i3w_1 == null)) {
      // Inline function 'kotlin.require' call
      // Inline function 'kotlin.require' call
      if (!this.i3w_1.k1m()) {
        var message = 'Failed requirement.';
        throw IllegalArgumentException_init_$Create$(toString(message));
      }
    }
  }
  protoOf(JsonLiteral).x3v = function () {
    return this.h3w_1;
  };
  protoOf(JsonLiteral).y3v = function () {
    return this.j3w_1;
  };
  protoOf(JsonLiteral).toString = function () {
    var tmp;
    if (this.h3w_1) {
      // Inline function 'kotlin.text.buildString' call
      // Inline function 'kotlin.apply' call
      var this_0 = StringBuilder_init_$Create$();
      printQuoted(this_0, this.j3w_1);
      tmp = this_0.toString();
    } else {
      tmp = this.j3w_1;
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
    if (!(this.h3w_1 === other.h3w_1))
      return false;
    if (!(this.j3w_1 === other.j3w_1))
      return false;
    return true;
  };
  protoOf(JsonLiteral).hashCode = function () {
    var result = getBooleanHashCode(this.h3w_1);
    result = imul(31, result) + getStringHashCode(this.j3w_1) | 0;
    return result;
  };
  function get_int(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    // Inline function 'kotlinx.serialization.json.mapExceptions' call
    var tmp;
    try {
      tmp = (new StringJsonLexer(_this__u8e3s4.y3v())).f3w();
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
      throw NumberFormatException_init_$Create$(_this__u8e3s4.y3v() + ' is not an Int');
    return result.g1();
  }
  function get_long(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    // Inline function 'kotlinx.serialization.json.mapExceptions' call
    var tmp;
    try {
      tmp = (new StringJsonLexer(_this__u8e3s4.y3v())).f3w();
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
    var this_0 = _this__u8e3s4.y3v();
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
    tmp.k3w_1 = LinkedHashMap_init_$Create$();
  }
  protoOf(JsonObjectBuilder).l3w = function (key, element) {
    return this.k3w_1.k2(key, element);
  };
  protoOf(JsonObjectBuilder).d3v = function () {
    return new JsonObject(this.k3w_1);
  };
  function JsonArrayBuilder() {
    var tmp = this;
    // Inline function 'kotlin.collections.mutableListOf' call
    tmp.m3w_1 = ArrayList_init_$Create$();
  }
  protoOf(JsonArrayBuilder).n3w = function (element) {
    // Inline function 'kotlin.collections.plusAssign' call
    this.m3w_1.e(element);
    return true;
  };
  protoOf(JsonArrayBuilder).d3v = function () {
    return new JsonArray(this.m3w_1);
  };
  function put(_this__u8e3s4, key, value) {
    return _this__u8e3s4.l3w(key, JsonPrimitive_2(value));
  }
  function put_0(_this__u8e3s4, key, value) {
    return _this__u8e3s4.l3w(key, JsonPrimitive_0(value));
  }
  function put_1(_this__u8e3s4, key, value) {
    return _this__u8e3s4.l3w(key, JsonPrimitive_1(value));
  }
  function putJsonObject(_this__u8e3s4, key, builderAction) {
    // Inline function 'kotlinx.serialization.json.buildJsonObject' call
    var builder = new JsonObjectBuilder();
    builderAction(builder);
    var tmp$ret$0 = builder.d3v();
    return _this__u8e3s4.l3w(key, tmp$ret$0);
  }
  function putJsonArray(_this__u8e3s4, key, builderAction) {
    // Inline function 'kotlinx.serialization.json.buildJsonArray' call
    var builder = new JsonArrayBuilder();
    builderAction(builder);
    var tmp$ret$0 = builder.d3v();
    return _this__u8e3s4.l3w(key, tmp$ret$0);
  }
  function add(_this__u8e3s4, value) {
    return _this__u8e3s4.n3w(JsonPrimitive_2(value));
  }
  function addJsonObject(_this__u8e3s4, builderAction) {
    // Inline function 'kotlinx.serialization.json.buildJsonObject' call
    var builder = new JsonObjectBuilder();
    builderAction(builder);
    var tmp$ret$0 = builder.d3v();
    return _this__u8e3s4.n3w(tmp$ret$0);
  }
  function JsonObjectDescriptor() {
    JsonObjectDescriptor_instance = this;
    this.o3w_1 = MapSerializer(serializer(StringCompanionObject_instance), JsonElementSerializer_getInstance()).w1k();
    this.p3w_1 = 'kotlinx.serialization.json.JsonObject';
  }
  protoOf(JsonObjectDescriptor).x1l = function () {
    return this.p3w_1;
  };
  protoOf(JsonObjectDescriptor).n1m = function (index) {
    return this.o3w_1.n1m(index);
  };
  protoOf(JsonObjectDescriptor).o1m = function (name) {
    return this.o3w_1.o1m(name);
  };
  protoOf(JsonObjectDescriptor).p1m = function (index) {
    return this.o3w_1.p1m(index);
  };
  protoOf(JsonObjectDescriptor).q1m = function (index) {
    return this.o3w_1.q1m(index);
  };
  protoOf(JsonObjectDescriptor).r1m = function (index) {
    return this.o3w_1.r1m(index);
  };
  protoOf(JsonObjectDescriptor).j1m = function () {
    return this.o3w_1.j1m();
  };
  protoOf(JsonObjectDescriptor).f1m = function () {
    return this.o3w_1.f1m();
  };
  protoOf(JsonObjectDescriptor).k1m = function () {
    return this.o3w_1.k1m();
  };
  protoOf(JsonObjectDescriptor).l1m = function () {
    return this.o3w_1.l1m();
  };
  protoOf(JsonObjectDescriptor).m1m = function () {
    return this.o3w_1.m1m();
  };
  var JsonObjectDescriptor_instance;
  function JsonObjectDescriptor_getInstance() {
    if (JsonObjectDescriptor_instance == null)
      new JsonObjectDescriptor();
    return JsonObjectDescriptor_instance;
  }
  function JsonObjectSerializer() {
    JsonObjectSerializer_instance = this;
    this.q3w_1 = JsonObjectDescriptor_getInstance();
  }
  protoOf(JsonObjectSerializer).w1k = function () {
    return this.q3w_1;
  };
  protoOf(JsonObjectSerializer).r3w = function (encoder, value) {
    verify(encoder);
    MapSerializer(serializer(StringCompanionObject_instance), JsonElementSerializer_getInstance()).x1k(encoder, value);
  };
  protoOf(JsonObjectSerializer).x1k = function (encoder, value) {
    return this.r3w(encoder, value instanceof JsonObject ? value : THROW_CCE());
  };
  protoOf(JsonObjectSerializer).y1k = function (decoder) {
    verify_0(decoder);
    return new JsonObject(MapSerializer(serializer(StringCompanionObject_instance), JsonElementSerializer_getInstance()).y1k(decoder));
  };
  var JsonObjectSerializer_instance;
  function JsonObjectSerializer_getInstance() {
    if (JsonObjectSerializer_instance == null)
      new JsonObjectSerializer();
    return JsonObjectSerializer_instance;
  }
  function JsonElementSerializer$descriptor$lambda($this$buildSerialDescriptor) {
    $this$buildSerialDescriptor.h1l('JsonPrimitive', defer(JsonElementSerializer$descriptor$lambda$lambda));
    $this$buildSerialDescriptor.h1l('JsonNull', defer(JsonElementSerializer$descriptor$lambda$lambda_0));
    $this$buildSerialDescriptor.h1l('JsonLiteral', defer(JsonElementSerializer$descriptor$lambda$lambda_1));
    $this$buildSerialDescriptor.h1l('JsonObject', defer(JsonElementSerializer$descriptor$lambda$lambda_2));
    $this$buildSerialDescriptor.h1l('JsonArray', defer(JsonElementSerializer$descriptor$lambda$lambda_3));
    return Unit_instance;
  }
  function JsonElementSerializer$descriptor$lambda$lambda() {
    return JsonPrimitiveSerializer_getInstance().s3w_1;
  }
  function JsonElementSerializer$descriptor$lambda$lambda_0() {
    return JsonNullSerializer_getInstance().t3w_1;
  }
  function JsonElementSerializer$descriptor$lambda$lambda_1() {
    return JsonLiteralSerializer_getInstance().u3w_1;
  }
  function JsonElementSerializer$descriptor$lambda$lambda_2() {
    return JsonObjectSerializer_getInstance().q3w_1;
  }
  function JsonElementSerializer$descriptor$lambda$lambda_3() {
    return JsonArraySerializer_getInstance().v3w_1;
  }
  function JsonElementSerializer() {
    JsonElementSerializer_instance = this;
    var tmp = this;
    var tmp_0 = SEALED_getInstance();
    tmp.w3w_1 = buildSerialDescriptor('kotlinx.serialization.json.JsonElement', tmp_0, [], JsonElementSerializer$descriptor$lambda);
  }
  protoOf(JsonElementSerializer).w1k = function () {
    return this.w3w_1;
  };
  protoOf(JsonElementSerializer).x3w = function (encoder, value) {
    verify(encoder);
    if (value instanceof JsonPrimitive) {
      encoder.x1p(JsonPrimitiveSerializer_getInstance(), value);
    } else {
      if (value instanceof JsonObject) {
        encoder.x1p(JsonObjectSerializer_getInstance(), value);
      } else {
        if (value instanceof JsonArray) {
          encoder.x1p(JsonArraySerializer_getInstance(), value);
        } else {
          noWhenBranchMatchedException();
        }
      }
    }
  };
  protoOf(JsonElementSerializer).x1k = function (encoder, value) {
    return this.x3w(encoder, value instanceof JsonElement ? value : THROW_CCE());
  };
  protoOf(JsonElementSerializer).y1k = function (decoder) {
    var input = asJsonDecoder(decoder);
    return input.w3v();
  };
  var JsonElementSerializer_instance;
  function JsonElementSerializer_getInstance() {
    if (JsonElementSerializer_instance == null)
      new JsonElementSerializer();
    return JsonElementSerializer_instance;
  }
  function JsonPrimitiveSerializer() {
    JsonPrimitiveSerializer_instance = this;
    this.s3w_1 = buildSerialDescriptor('kotlinx.serialization.json.JsonPrimitive', STRING_getInstance(), []);
  }
  protoOf(JsonPrimitiveSerializer).w1k = function () {
    return this.s3w_1;
  };
  protoOf(JsonPrimitiveSerializer).y3w = function (encoder, value) {
    verify(encoder);
    var tmp;
    if (value instanceof JsonNull) {
      encoder.x1p(JsonNullSerializer_getInstance(), JsonNull_getInstance());
      tmp = Unit_instance;
    } else {
      var tmp_0 = JsonLiteralSerializer_getInstance();
      encoder.x1p(tmp_0, value instanceof JsonLiteral ? value : THROW_CCE());
      tmp = Unit_instance;
    }
    return tmp;
  };
  protoOf(JsonPrimitiveSerializer).x1k = function (encoder, value) {
    return this.y3w(encoder, value instanceof JsonPrimitive ? value : THROW_CCE());
  };
  protoOf(JsonPrimitiveSerializer).y1k = function (decoder) {
    var result = asJsonDecoder(decoder).w3v();
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
    this.z3w_1 = ListSerializer(JsonElementSerializer_getInstance()).w1k();
    this.a3x_1 = 'kotlinx.serialization.json.JsonArray';
  }
  protoOf(JsonArrayDescriptor).x1l = function () {
    return this.a3x_1;
  };
  protoOf(JsonArrayDescriptor).n1m = function (index) {
    return this.z3w_1.n1m(index);
  };
  protoOf(JsonArrayDescriptor).o1m = function (name) {
    return this.z3w_1.o1m(name);
  };
  protoOf(JsonArrayDescriptor).p1m = function (index) {
    return this.z3w_1.p1m(index);
  };
  protoOf(JsonArrayDescriptor).q1m = function (index) {
    return this.z3w_1.q1m(index);
  };
  protoOf(JsonArrayDescriptor).r1m = function (index) {
    return this.z3w_1.r1m(index);
  };
  protoOf(JsonArrayDescriptor).j1m = function () {
    return this.z3w_1.j1m();
  };
  protoOf(JsonArrayDescriptor).f1m = function () {
    return this.z3w_1.f1m();
  };
  protoOf(JsonArrayDescriptor).k1m = function () {
    return this.z3w_1.k1m();
  };
  protoOf(JsonArrayDescriptor).l1m = function () {
    return this.z3w_1.l1m();
  };
  protoOf(JsonArrayDescriptor).m1m = function () {
    return this.z3w_1.m1m();
  };
  var JsonArrayDescriptor_instance;
  function JsonArrayDescriptor_getInstance() {
    if (JsonArrayDescriptor_instance == null)
      new JsonArrayDescriptor();
    return JsonArrayDescriptor_instance;
  }
  function JsonArraySerializer() {
    JsonArraySerializer_instance = this;
    this.v3w_1 = JsonArrayDescriptor_getInstance();
  }
  protoOf(JsonArraySerializer).w1k = function () {
    return this.v3w_1;
  };
  protoOf(JsonArraySerializer).b3x = function (encoder, value) {
    verify(encoder);
    ListSerializer(JsonElementSerializer_getInstance()).x1k(encoder, value);
  };
  protoOf(JsonArraySerializer).x1k = function (encoder, value) {
    return this.b3x(encoder, value instanceof JsonArray ? value : THROW_CCE());
  };
  protoOf(JsonArraySerializer).y1k = function (decoder) {
    verify_0(decoder);
    return new JsonArray(ListSerializer(JsonElementSerializer_getInstance()).y1k(decoder));
  };
  var JsonArraySerializer_instance;
  function JsonArraySerializer_getInstance() {
    if (JsonArraySerializer_instance == null)
      new JsonArraySerializer();
    return JsonArraySerializer_instance;
  }
  function JsonNullSerializer() {
    JsonNullSerializer_instance = this;
    this.t3w_1 = buildSerialDescriptor('kotlinx.serialization.json.JsonNull', ENUM_getInstance(), []);
  }
  protoOf(JsonNullSerializer).w1k = function () {
    return this.t3w_1;
  };
  protoOf(JsonNullSerializer).c3x = function (encoder, value) {
    verify(encoder);
    encoder.a1p();
  };
  protoOf(JsonNullSerializer).x1k = function (encoder, value) {
    return this.c3x(encoder, value instanceof JsonNull ? value : THROW_CCE());
  };
  protoOf(JsonNullSerializer).y1k = function (decoder) {
    verify_0(decoder);
    if (decoder.q1n()) {
      throw new JsonDecodingException("Expected 'null' literal");
    }
    decoder.r1n();
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
    this.u3w_1 = PrimitiveSerialDescriptor('kotlinx.serialization.json.JsonLiteral', STRING_getInstance());
  }
  protoOf(JsonLiteralSerializer).w1k = function () {
    return this.u3w_1;
  };
  protoOf(JsonLiteralSerializer).d3x = function (encoder, value) {
    verify(encoder);
    if (value.h3w_1) {
      return encoder.j1p(value.j3w_1);
    }
    if (!(value.i3w_1 == null)) {
      return encoder.l1p(value.i3w_1).j1p(value.j3w_1);
    }
    var tmp0_safe_receiver = toLongOrNull(value.j3w_1);
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      return encoder.f1p(tmp0_safe_receiver);
    }
    var tmp1_safe_receiver = toULongOrNull(value.j3w_1);
    var tmp = tmp1_safe_receiver;
    if ((tmp == null ? null : new ULong(tmp)) == null)
      null;
    else {
      var tmp_0 = tmp1_safe_receiver;
      // Inline function 'kotlin.let' call
      var it = (tmp_0 == null ? null : new ULong(tmp_0)).mn_1;
      var tmp_1 = encoder.l1p(serializer_0(Companion_getInstance()).w1k());
      // Inline function 'kotlin.ULong.toLong' call
      var tmp$ret$1 = _ULong___get_data__impl__fggpzb(it);
      tmp_1.f1p(tmp$ret$1);
      return Unit_instance;
    }
    var tmp2_safe_receiver = toDoubleOrNull(value.j3w_1);
    if (tmp2_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      return encoder.h1p(tmp2_safe_receiver);
    }
    var tmp3_safe_receiver = toBooleanStrictOrNull(value.j3w_1);
    if (tmp3_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      return encoder.b1p(tmp3_safe_receiver);
    }
    encoder.j1p(value.j3w_1);
  };
  protoOf(JsonLiteralSerializer).x1k = function (encoder, value) {
    return this.d3x(encoder, value instanceof JsonLiteral ? value : THROW_CCE());
  };
  protoOf(JsonLiteralSerializer).y1k = function (decoder) {
    var result = asJsonDecoder(decoder).w3v();
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
    var tmp0 = $this.e3x_1;
    // Inline function 'kotlin.getValue' call
    original$factory();
    return tmp0.w();
  }
  function defer$1($deferred) {
    this.e3x_1 = lazy($deferred);
  }
  protoOf(defer$1).x1l = function () {
    return _get_original__l7ku1m(this).x1l();
  };
  protoOf(defer$1).j1m = function () {
    return _get_original__l7ku1m(this).j1m();
  };
  protoOf(defer$1).l1m = function () {
    return _get_original__l7ku1m(this).l1m();
  };
  protoOf(defer$1).n1m = function (index) {
    return _get_original__l7ku1m(this).n1m(index);
  };
  protoOf(defer$1).o1m = function (name) {
    return _get_original__l7ku1m(this).o1m(name);
  };
  protoOf(defer$1).p1m = function (index) {
    return _get_original__l7ku1m(this).p1m(index);
  };
  protoOf(defer$1).q1m = function (index) {
    return _get_original__l7ku1m(this).q1m(index);
  };
  protoOf(defer$1).r1m = function (index) {
    return _get_original__l7ku1m(this).r1m(index);
  };
  function original$factory() {
    return getPropertyCallableRef('original', 1, KProperty1, function (receiver) {
      return _get_original__l7ku1m(receiver);
    }, null);
  }
  function JsonEncoder() {
  }
  function Composer(writer) {
    this.f3x_1 = writer;
    this.g3x_1 = true;
  }
  protoOf(Composer).h3x = function () {
    this.g3x_1 = true;
  };
  protoOf(Composer).i3x = function () {
    return Unit_instance;
  };
  protoOf(Composer).j3x = function () {
    this.g3x_1 = false;
  };
  protoOf(Composer).k3x = function () {
    this.g3x_1 = false;
  };
  protoOf(Composer).l3x = function () {
    return Unit_instance;
  };
  protoOf(Composer).m3x = function (v) {
    return this.f3x_1.n3x(v);
  };
  protoOf(Composer).o3x = function (v) {
    return this.f3x_1.p3x(v);
  };
  protoOf(Composer).q3x = function (v) {
    return this.f3x_1.p3x(v.toString());
  };
  protoOf(Composer).r3x = function (v) {
    return this.f3x_1.p3x(v.toString());
  };
  protoOf(Composer).s3x = function (v) {
    return this.f3x_1.t3x(toLong(v));
  };
  protoOf(Composer).u3x = function (v) {
    return this.f3x_1.t3x(toLong(v));
  };
  protoOf(Composer).v3x = function (v) {
    return this.f3x_1.t3x(toLong(v));
  };
  protoOf(Composer).w3x = function (v) {
    return this.f3x_1.t3x(v);
  };
  protoOf(Composer).x3x = function (v) {
    return this.f3x_1.p3x(v.toString());
  };
  protoOf(Composer).y3x = function (value) {
    return this.f3x_1.z3x(value);
  };
  function Composer_0(sb, json) {
    return json.o3t_1.i3v_1 ? new ComposerWithPrettyPrint(sb, json) : new Composer(sb);
  }
  function ComposerForUnsignedNumbers(writer, forceQuoting) {
    Composer.call(this, writer);
    this.c3y_1 = forceQuoting;
  }
  protoOf(ComposerForUnsignedNumbers).v3x = function (v) {
    if (this.c3y_1) {
      // Inline function 'kotlin.toUInt' call
      var tmp$ret$0 = _UInt___init__impl__l7qpdl(v);
      this.y3x(UInt__toString_impl_dbgl21(tmp$ret$0));
    } else {
      // Inline function 'kotlin.toUInt' call
      var tmp$ret$1 = _UInt___init__impl__l7qpdl(v);
      this.o3x(UInt__toString_impl_dbgl21(tmp$ret$1));
    }
  };
  protoOf(ComposerForUnsignedNumbers).w3x = function (v) {
    if (this.c3y_1) {
      // Inline function 'kotlin.toULong' call
      var tmp$ret$0 = _ULong___init__impl__c78o9k(v);
      this.y3x(ULong__toString_impl_f9au7k(tmp$ret$0));
    } else {
      // Inline function 'kotlin.toULong' call
      var tmp$ret$1 = _ULong___init__impl__c78o9k(v);
      this.o3x(ULong__toString_impl_f9au7k(tmp$ret$1));
    }
  };
  protoOf(ComposerForUnsignedNumbers).s3x = function (v) {
    if (this.c3y_1) {
      // Inline function 'kotlin.toUByte' call
      var tmp$ret$0 = _UByte___init__impl__g9hnc4(v);
      this.y3x(UByte__toString_impl_v72jg(tmp$ret$0));
    } else {
      // Inline function 'kotlin.toUByte' call
      var tmp$ret$1 = _UByte___init__impl__g9hnc4(v);
      this.o3x(UByte__toString_impl_v72jg(tmp$ret$1));
    }
  };
  protoOf(ComposerForUnsignedNumbers).u3x = function (v) {
    if (this.c3y_1) {
      // Inline function 'kotlin.toUShort' call
      var tmp$ret$0 = _UShort___init__impl__jigrne(v);
      this.y3x(UShort__toString_impl_edaoee(tmp$ret$0));
    } else {
      // Inline function 'kotlin.toUShort' call
      var tmp$ret$1 = _UShort___init__impl__jigrne(v);
      this.o3x(UShort__toString_impl_edaoee(tmp$ret$1));
    }
  };
  function ComposerForUnquotedLiterals(writer, forceQuoting) {
    Composer.call(this, writer);
    this.f3y_1 = forceQuoting;
  }
  protoOf(ComposerForUnquotedLiterals).y3x = function (value) {
    if (this.f3y_1) {
      protoOf(Composer).y3x.call(this, value);
    } else {
      protoOf(Composer).o3x.call(this, value);
    }
  };
  function ComposerWithPrettyPrint(writer, json) {
    Composer.call(this, writer);
    this.i3y_1 = json;
    this.j3y_1 = 0;
  }
  protoOf(ComposerWithPrettyPrint).h3x = function () {
    this.g3x_1 = true;
    this.j3y_1 = this.j3y_1 + 1 | 0;
  };
  protoOf(ComposerWithPrettyPrint).i3x = function () {
    this.j3y_1 = this.j3y_1 - 1 | 0;
  };
  protoOf(ComposerWithPrettyPrint).j3x = function () {
    this.g3x_1 = false;
    this.o3x('\n');
    // Inline function 'kotlin.repeat' call
    var times = this.j3y_1;
    var inductionVariable = 0;
    if (inductionVariable < times)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        this.o3x(this.i3y_1.o3t_1.k3v_1);
      }
       while (inductionVariable < times);
  };
  protoOf(ComposerWithPrettyPrint).k3x = function () {
    if (this.g3x_1)
      this.g3x_1 = false;
    else {
      this.j3x();
    }
  };
  protoOf(ComposerWithPrettyPrint).l3x = function () {
    this.m3x(_Char___init__impl__6a9atx(32));
  };
  function readIfAbsent($this, descriptor, index) {
    $this.l3y_1 = (!descriptor.r1m(index) && descriptor.q1m(index).f1m());
    return $this.l3y_1;
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
    tmp.k3y_1 = new ElementMarker(descriptor, JsonElementMarker$readIfAbsent$ref(this));
    this.l3y_1 = false;
  }
  protoOf(JsonElementMarker).m3y = function (index) {
    this.k3y_1.l1u(index);
  };
  protoOf(JsonElementMarker).n3y = function () {
    return this.k3y_1.m1u();
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
    _this__u8e3s4.o3y('Trailing comma before the end of JSON ' + entity, _this__u8e3s4.g3u_1 - 1 | 0, "Trailing commas are non-complaint JSON and not allowed by default. Use 'allowTrailingCommas = true' in 'Json {}' builder to support them.");
  }
  function throwInvalidFloatingPointDecoded(_this__u8e3s4, result) {
    _this__u8e3s4.p3y('Unexpected special floating-point value ' + toString(result) + '. By default, ' + 'non-finite floating point values are prohibited because they do not conform JSON specification', VOID, "It is possible to deserialize them using 'JsonBuilder.allowSpecialFloatingPointValues = true'");
  }
  function JsonEncodingException(message) {
    JsonException.call(this, message);
    captureStack(this, JsonEncodingException);
  }
  function InvalidKeyKindException(keyDescriptor) {
    return new JsonEncodingException("Value of type '" + keyDescriptor.x1l() + "' can't be used in JSON as a key in the map. " + ("It should have either primitive or enum kind, but its kind is '" + keyDescriptor.j1m().toString() + "'.\n") + "Use 'allowStructuredMapKeys = true' in 'Json {}' builder to convert such maps to [key1, value1, key2, value2,...] arrays.");
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
    var index = _this__u8e3s4.o1m(name);
    if (!(index === -3))
      return index;
    if (!json.o3t_1.p3v_1)
      return index;
    return getJsonNameIndexSlowPath(_this__u8e3s4, json, name);
  }
  function getJsonNameIndexOrThrow(_this__u8e3s4, json, name, suffix) {
    suffix = suffix === VOID ? '' : suffix;
    _init_properties_JsonNamesMap_kt__cbbp0k();
    var index = getJsonNameIndex(_this__u8e3s4, json, name);
    if (index === -3)
      throw SerializationException_init_$Create$(_this__u8e3s4.x1l() + " does not contain element with name '" + name + "'" + suffix);
    return index;
  }
  function getJsonElementName(_this__u8e3s4, json, index) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    var strategy = namingStrategy(_this__u8e3s4, json);
    return strategy == null ? _this__u8e3s4.n1m(index) : serializationNamesIndices(_this__u8e3s4, json, strategy)[index];
  }
  function namingStrategy(_this__u8e3s4, json) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    return equals(_this__u8e3s4.j1m(), CLASS_getInstance()) ? json.o3t_1.q3v_1 : null;
  }
  function deserializationNamesMap(_this__u8e3s4, descriptor) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    var tmp = get_schemaCache(_this__u8e3s4);
    var tmp_0 = get_JsonDeserializationNamesKey();
    return tmp.r3y(descriptor, tmp_0, deserializationNamesMap$lambda(descriptor, _this__u8e3s4));
  }
  function decodeCaseInsensitive(_this__u8e3s4, descriptor) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    return _this__u8e3s4.o3t_1.r3v_1 && equals(descriptor.j1m(), ENUM_getInstance());
  }
  function getJsonNameIndexSlowPath(_this__u8e3s4, json, name) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    var tmp0_elvis_lhs = deserializationNamesMap(json, _this__u8e3s4).h2(name);
    return tmp0_elvis_lhs == null ? -3 : tmp0_elvis_lhs;
  }
  function serializationNamesIndices(_this__u8e3s4, json, strategy) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    var tmp = get_schemaCache(json);
    var tmp_0 = get_JsonSerializationNamesKey();
    return tmp.r3y(_this__u8e3s4, tmp_0, serializationNamesIndices$lambda(_this__u8e3s4, strategy));
  }
  function buildDeserializationNamesMap(_this__u8e3s4, json) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    // Inline function 'kotlin.collections.mutableMapOf' call
    var builder = LinkedHashMap_init_$Create$();
    var useLowercaseEnums = decodeCaseInsensitive(json, _this__u8e3s4);
    var strategyForClasses = namingStrategy(_this__u8e3s4, json);
    var inductionVariable = 0;
    var last = _this__u8e3s4.l1m();
    if (inductionVariable < last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'kotlin.collections.filterIsInstance' call
        var tmp0 = _this__u8e3s4.p1m(i);
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
        var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.s3y_1;
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
          tmp_0 = _this__u8e3s4.n1m(i).toLowerCase();
        } else if (!(strategyForClasses == null)) {
          tmp_0 = strategyForClasses.t3y(_this__u8e3s4, i, _this__u8e3s4.n1m(i));
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
    var entity = equals($this_buildDeserializationNamesMap.j1m(), ENUM_getInstance()) ? 'enum value' : 'property';
    // Inline function 'kotlin.collections.contains' call
    // Inline function 'kotlin.collections.containsKey' call
    if ((isInterface(_this__u8e3s4, KtMap) ? _this__u8e3s4 : THROW_CCE()).f2(name)) {
      throw new JsonException("The suggested name '" + name + "' for " + entity + ' ' + $this_buildDeserializationNamesMap.n1m(index) + ' is already one of the names for ' + entity + ' ' + ($this_buildDeserializationNamesMap.n1m(getValue(_this__u8e3s4, name)) + ' in ' + toString($this_buildDeserializationNamesMap)));
    }
    // Inline function 'kotlin.collections.set' call
    _this__u8e3s4.k2(name, index);
  }
  function deserializationNamesMap$lambda($descriptor, $this_deserializationNamesMap) {
    return function () {
      return buildDeserializationNamesMap($descriptor, $this_deserializationNamesMap);
    };
  }
  function serializationNamesIndices$lambda($this_serializationNamesIndices, $strategy) {
    return function () {
      var tmp = 0;
      var tmp_0 = $this_serializationNamesIndices.l1m();
      // Inline function 'kotlin.arrayOfNulls' call
      var tmp_1 = Array(tmp_0);
      while (tmp < tmp_0) {
        var tmp_2 = tmp;
        var baseName = $this_serializationNamesIndices.n1m(tmp_2);
        tmp_1[tmp_2] = $strategy.t3y($this_serializationNamesIndices, tmp_2, baseName);
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
    var newSize = imul($this.w3y_1, 2);
    $this.u3y_1 = copyOf($this.u3y_1, newSize);
    $this.v3y_1 = copyOf_0($this.v3y_1, newSize);
  }
  function JsonPath() {
    var tmp = this;
    // Inline function 'kotlin.arrayOfNulls' call
    tmp.u3y_1 = Array(8);
    var tmp_0 = this;
    var tmp_1 = 0;
    var tmp_2 = new Int32Array(8);
    while (tmp_1 < 8) {
      tmp_2[tmp_1] = -1;
      tmp_1 = tmp_1 + 1 | 0;
    }
    tmp_0.v3y_1 = tmp_2;
    this.w3y_1 = -1;
  }
  protoOf(JsonPath).x3y = function (sd) {
    this.w3y_1 = this.w3y_1 + 1 | 0;
    var depth = this.w3y_1;
    if (depth === this.u3y_1.length) {
      resize(this);
    }
    this.u3y_1[depth] = sd;
  };
  protoOf(JsonPath).y3y = function (index) {
    this.v3y_1[this.w3y_1] = index;
  };
  protoOf(JsonPath).z3y = function (key) {
    var tmp;
    if (!(this.v3y_1[this.w3y_1] === -2)) {
      this.w3y_1 = this.w3y_1 + 1 | 0;
      tmp = this.w3y_1 === this.u3y_1.length;
    } else {
      tmp = false;
    }
    if (tmp) {
      resize(this);
    }
    this.u3y_1[this.w3y_1] = key;
    this.v3y_1[this.w3y_1] = -2;
  };
  protoOf(JsonPath).a3z = function () {
    if (this.v3y_1[this.w3y_1] === -2) {
      this.u3y_1[this.w3y_1] = Tombstone_instance;
    }
  };
  protoOf(JsonPath).b3z = function () {
    var depth = this.w3y_1;
    if (this.v3y_1[depth] === -2) {
      this.v3y_1[depth] = -1;
      this.w3y_1 = this.w3y_1 - 1 | 0;
    }
    if (!(this.w3y_1 === -1)) {
      this.w3y_1 = this.w3y_1 - 1 | 0;
    }
  };
  protoOf(JsonPath).c3z = function () {
    // Inline function 'kotlin.text.buildString' call
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$();
    this_0.e8('$');
    // Inline function 'kotlin.repeat' call
    var times = this.w3y_1 + 1 | 0;
    var inductionVariable = 0;
    if (inductionVariable < times)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var element = this.u3y_1[index];
        if (!(element == null) ? isInterface(element, SerialDescriptor) : false) {
          if (equals(element.j1m(), LIST_getInstance())) {
            if (!(this.v3y_1[index] === -1)) {
              this_0.e8('[');
              this_0.sc(this.v3y_1[index]);
              this_0.e8(']');
            }
          } else {
            var idx = this.v3y_1[index];
            if (idx >= 0) {
              this_0.e8('.');
              this_0.e8(element.n1m(idx));
            }
          }
        } else {
          if (!(element === Tombstone_instance)) {
            this_0.e8('[');
            this_0.e8("'");
            this_0.d8(element);
            this_0.e8("'");
            this_0.e8(']');
          }
        }
      }
       while (inductionVariable < times);
    return this_0.toString();
  };
  protoOf(JsonPath).toString = function () {
    return this.c3z();
  };
  function encodeByWriter(json, writer, serializer, value) {
    var tmp = WriteMode_OBJ_getInstance();
    // Inline function 'kotlin.arrayOfNulls' call
    var size = get_entries().m();
    var tmp$ret$0 = Array(size);
    var encoder = StreamingJsonEncoder_init_$Create$(writer, json, tmp, tmp$ret$0);
    encoder.x1p(serializer, value);
  }
  function readObject($this) {
    // Inline function 'kotlinx.serialization.json.internal.JsonTreeReader.readObjectImpl' call
    var lastToken = $this.m3z_1.q3z(6);
    if ($this.m3z_1.r3z() === 4) {
      $this.m3z_1.p3y('Unexpected leading comma');
    }
    // Inline function 'kotlin.collections.linkedMapOf' call
    var result = LinkedHashMap_init_$Create$();
    $l$loop: while ($this.m3z_1.s3z()) {
      var key = $this.n3z_1 ? $this.m3z_1.u3z() : $this.m3z_1.t3z();
      $this.m3z_1.q3z(5);
      var element = $this.v3z();
      // Inline function 'kotlin.collections.set' call
      result.k2(key, element);
      lastToken = $this.m3z_1.w3z();
      var tmp0_subject = lastToken;
      if (tmp0_subject !== 4)
        if (tmp0_subject === 7)
          break $l$loop;
        else {
          $this.m3z_1.p3y('Expected end of the object or comma');
        }
    }
    if (lastToken === 6) {
      $this.m3z_1.q3z(7);
    } else if (lastToken === 4) {
      if (!$this.o3z_1) {
        invalidTrailingComma($this.m3z_1);
      }
      $this.m3z_1.q3z(7);
    }
    return new JsonObject(result);
  }
  function readObject_0($this, _this__u8e3s4, $completion) {
    var tmp = new $readObjectCOROUTINE$0($this, _this__u8e3s4, $completion);
    tmp.b9_1 = Unit_instance;
    tmp.c9_1 = null;
    return tmp.h9();
  }
  function readArray($this) {
    var lastToken = $this.m3z_1.w3z();
    if ($this.m3z_1.r3z() === 4) {
      $this.m3z_1.p3y('Unexpected leading comma');
    }
    // Inline function 'kotlin.collections.arrayListOf' call
    var result = ArrayList_init_$Create$();
    while ($this.m3z_1.s3z()) {
      var element = $this.v3z();
      result.e(element);
      lastToken = $this.m3z_1.w3z();
      if (!(lastToken === 4)) {
        var tmp0 = $this.m3z_1;
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.require' call
        var condition = lastToken === 9;
        var position = tmp0.g3u_1;
        if (!condition) {
          var tmp$ret$1 = 'Expected end of the array or comma';
          tmp0.p3y(tmp$ret$1, position);
        }
      }
    }
    if (lastToken === 8) {
      $this.m3z_1.q3z(9);
    } else if (lastToken === 4) {
      if (!$this.o3z_1) {
        invalidTrailingComma($this.m3z_1, 'array');
      }
      $this.m3z_1.q3z(9);
    }
    return new JsonArray(result);
  }
  function readValue($this, isString) {
    var tmp;
    if ($this.n3z_1 || !isString) {
      tmp = $this.m3z_1.u3z();
    } else {
      tmp = $this.m3z_1.t3z();
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
    this.u40_1 = this$0;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(JsonTreeReader$readDeepRecursive$slambda).z40 = function ($this$DeepRecursiveFunction, it, $completion) {
    var tmp = this.a41($this$DeepRecursiveFunction, it, $completion);
    tmp.b9_1 = Unit_instance;
    tmp.c9_1 = null;
    return tmp.h9();
  };
  protoOf(JsonTreeReader$readDeepRecursive$slambda).s9 = function (p1, p2, $completion) {
    var tmp = p1 instanceof DeepRecursiveScope ? p1 : THROW_CCE();
    return this.z40(tmp, p2 instanceof Unit ? p2 : THROW_CCE(), $completion);
  };
  protoOf(JsonTreeReader$readDeepRecursive$slambda).h9 = function () {
    var suspendResult = this.b9_1;
    $sm: do
      try {
        var tmp = this.z8_1;
        switch (tmp) {
          case 0:
            this.a9_1 = 3;
            this.x40_1 = this.u40_1.m3z_1.r3z();
            if (this.x40_1 === 1) {
              this.y40_1 = readValue(this.u40_1, true);
              this.z8_1 = 2;
              continue $sm;
            } else {
              if (this.x40_1 === 0) {
                this.y40_1 = readValue(this.u40_1, false);
                this.z8_1 = 2;
                continue $sm;
              } else {
                if (this.x40_1 === 6) {
                  this.z8_1 = 1;
                  suspendResult = readObject_0(this.u40_1, this.v40_1, this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  if (this.x40_1 === 8) {
                    this.y40_1 = readArray(this.u40_1);
                    this.z8_1 = 2;
                    continue $sm;
                  } else {
                    var tmp_0 = this;
                    this.u40_1.m3z_1.p3y("Can't begin reading element, unexpected token");
                  }
                }
              }
            }

            break;
          case 1:
            this.y40_1 = suspendResult;
            this.z8_1 = 2;
            continue $sm;
          case 2:
            return this.y40_1;
          case 3:
            throw this.c9_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.a9_1 === 3) {
          throw e;
        } else {
          this.z8_1 = this.a9_1;
          this.c9_1 = e;
        }
      }
     while (true);
  };
  protoOf(JsonTreeReader$readDeepRecursive$slambda).a41 = function ($this$DeepRecursiveFunction, it, completion) {
    var i = new JsonTreeReader$readDeepRecursive$slambda(this.u40_1, completion);
    i.v40_1 = $this$DeepRecursiveFunction;
    i.w40_1 = it;
    return i;
  };
  function JsonTreeReader$readDeepRecursive$slambda_0(this$0, resultContinuation) {
    var i = new JsonTreeReader$readDeepRecursive$slambda(this$0, resultContinuation);
    var l = function ($this$DeepRecursiveFunction, it, $completion) {
      return i.z40($this$DeepRecursiveFunction, it, $completion);
    };
    l.$arity = 2;
    return l;
  }
  function $readObjectCOROUTINE$0(_this__u8e3s4, _this__u8e3s4_0, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.f40_1 = _this__u8e3s4;
    this.g40_1 = _this__u8e3s4_0;
  }
  protoOf($readObjectCOROUTINE$0).h9 = function () {
    var suspendResult = this.b9_1;
    $sm: do
      try {
        var tmp = this.z8_1;
        switch (tmp) {
          case 0:
            this.a9_1 = 5;
            var tmp_0 = this;
            tmp_0.h40_1 = this.f40_1;
            this.i40_1 = this.h40_1;
            this.j40_1 = this.i40_1.m3z_1.q3z(6);
            if (this.i40_1.m3z_1.r3z() === 4) {
              this.i40_1.m3z_1.p3y('Unexpected leading comma');
            }

            var tmp_1 = this;
            tmp_1.k40_1 = LinkedHashMap_init_$Create$();
            this.z8_1 = 1;
            continue $sm;
          case 1:
            if (!this.i40_1.m3z_1.s3z()) {
              this.z8_1 = 4;
              continue $sm;
            }

            this.l40_1 = this.i40_1.n3z_1 ? this.i40_1.m3z_1.u3z() : this.i40_1.m3z_1.t3z();
            this.i40_1.m3z_1.q3z(5);
            this.z8_1 = 2;
            suspendResult = this.g40_1.ol(Unit_instance, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            var element = suspendResult;
            var tmp0 = this.k40_1;
            var key = this.l40_1;
            tmp0.k2(key, element);
            this.j40_1 = this.i40_1.m3z_1.w3z();
            var tmp0_subject = this.j40_1;
            if (tmp0_subject === 4) {
              this.z8_1 = 3;
              continue $sm;
            } else {
              if (tmp0_subject === 7) {
                this.z8_1 = 4;
                continue $sm;
              } else {
                this.i40_1.m3z_1.p3y('Expected end of the object or comma');
              }
            }

            break;
          case 3:
            this.z8_1 = 1;
            continue $sm;
          case 4:
            if (this.j40_1 === 6) {
              this.i40_1.m3z_1.q3z(7);
            } else if (this.j40_1 === 4) {
              if (!this.i40_1.o3z_1) {
                invalidTrailingComma(this.i40_1.m3z_1);
              }
              this.i40_1.m3z_1.q3z(7);
            }

            return new JsonObject(this.k40_1);
          case 5:
            throw this.c9_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.a9_1 === 5) {
          throw e;
        } else {
          this.z8_1 = this.a9_1;
          this.c9_1 = e;
        }
      }
     while (true);
  };
  function JsonTreeReader(configuration, lexer) {
    this.m3z_1 = lexer;
    this.n3z_1 = configuration.g3v_1;
    this.o3z_1 = configuration.s3v_1;
    this.p3z_1 = 0;
  }
  protoOf(JsonTreeReader).v3z = function () {
    var token = this.m3z_1.r3z();
    var tmp;
    if (token === 1) {
      tmp = readValue(this, true);
    } else if (token === 0) {
      tmp = readValue(this, false);
    } else if (token === 6) {
      var tmp_0;
      this.p3z_1 = this.p3z_1 + 1 | 0;
      if (this.p3z_1 === 200) {
        tmp_0 = readDeepRecursive(this);
      } else {
        tmp_0 = readObject(this);
      }
      var result = tmp_0;
      this.p3z_1 = this.p3z_1 - 1 | 0;
      tmp = result;
    } else if (token === 8) {
      tmp = readArray(this);
    } else {
      this.m3z_1.p3y('Cannot read Json element because of unexpected ' + tokenDescription(token));
    }
    return tmp;
  };
  function classDiscriminator(_this__u8e3s4, json) {
    var _iterator__ex2g4s = _this__u8e3s4.m1m().j();
    while (_iterator__ex2g4s.k()) {
      var annotation = _iterator__ex2g4s.l();
      if (annotation instanceof JsonClassDiscriminator)
        return annotation.b41_1;
    }
    return json.o3t_1.n3v_1;
  }
  function validateIfSealed(serializer, actualSerializer, classDiscriminator) {
    if (!(serializer instanceof SealedClassSerializer))
      return Unit_instance;
    if (jsonCachedSerialNames(actualSerializer.w1k()).r(classDiscriminator)) {
      var baseName = serializer.w1k().x1l();
      var actualName = actualSerializer.w1k().x1l();
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
    var kind = descriptor.j1m();
    var tmp;
    if (kind instanceof PolymorphicKind) {
      tmp = true;
    } else {
      tmp = equals(kind, CONTEXTUAL_getInstance());
    }
    if (tmp) {
      throw IllegalArgumentException_init_$Create$('Serializer for ' + actualClass.za() + " can't be registered as a subclass for polymorphic serialization " + ('because its kind ' + kind.toString() + ' is not concrete. To work with multiple hierarchies, register it as a base class.'));
    }
    if ($this.c41_1)
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
    var last = descriptor.l1m();
    if (inductionVariable < last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var name = descriptor.n1m(i);
        if (name === $this.d41_1) {
          throw IllegalArgumentException_init_$Create$('Polymorphic serializer for ' + toString(actualClass) + " has property '" + name + "' that conflicts " + 'with JSON class discriminator. You can either change class discriminator in JsonConfiguration, ' + 'rename property with @SerialName annotation ' + 'or fall back to array polymorphism');
        }
      }
       while (inductionVariable < last);
  }
  function PolymorphismValidator(useArrayPolymorphism, discriminator) {
    this.c41_1 = useArrayPolymorphism;
    this.d41_1 = discriminator;
  }
  protoOf(PolymorphismValidator).p25 = function (kClass, provider) {
  };
  protoOf(PolymorphismValidator).s25 = function (baseClass, actualClass, actualSerializer) {
    var descriptor = actualSerializer.w1k();
    checkKind_0(this, descriptor, actualClass);
    if (!this.c41_1) {
      checkDiscriminatorCollisions(this, descriptor, actualClass);
    }
  };
  protoOf(PolymorphismValidator).t25 = function (baseClass, defaultSerializerProvider) {
  };
  protoOf(PolymorphismValidator).u25 = function (baseClass, defaultDeserializerProvider) {
  };
  function Key() {
  }
  function DescriptorSchemaCache() {
    this.q3y_1 = createMapForCache(16);
  }
  protoOf(DescriptorSchemaCache).e41 = function (descriptor, key, value) {
    // Inline function 'kotlin.collections.getOrPut' call
    var this_0 = this.q3y_1;
    var value_0 = this_0.h2(descriptor);
    var tmp;
    if (value_0 == null) {
      var answer = createMapForCache(2);
      this_0.k2(descriptor, answer);
      tmp = answer;
    } else {
      tmp = value_0;
    }
    var tmp2 = tmp;
    var tmp3 = key instanceof Key ? key : THROW_CCE();
    // Inline function 'kotlin.collections.set' call
    var value_1 = !(value == null) ? value : THROW_CCE();
    tmp2.k2(tmp3, value_1);
  };
  protoOf(DescriptorSchemaCache).r3y = function (descriptor, key, defaultValue) {
    var tmp0_safe_receiver = this.f41(descriptor, key);
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      return tmp0_safe_receiver;
    }
    var value = defaultValue();
    this.e41(descriptor, key, value);
    return value;
  };
  protoOf(DescriptorSchemaCache).f41 = function (descriptor, key) {
    var tmp0_safe_receiver = this.q3y_1.h2(descriptor);
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      tmp = tmp0_safe_receiver.h2(key instanceof Key ? key : THROW_CCE());
    }
    var tmp_0 = tmp;
    return !(tmp_0 == null) ? tmp_0 : null;
  };
  function DiscriminatorHolder(discriminatorToSkip) {
    this.g41_1 = discriminatorToSkip;
  }
  function trySkip($this, _this__u8e3s4, unknownKey) {
    if (_this__u8e3s4 == null)
      return false;
    if (_this__u8e3s4.g41_1 === unknownKey) {
      _this__u8e3s4.g41_1 = null;
      return true;
    }
    return false;
  }
  function skipLeftoverElements($this, descriptor) {
    while (!($this.w1o(descriptor) === -1)) {
    }
  }
  function checkLeadingComma($this) {
    if ($this.a3u_1.r3z() === 4) {
      $this.a3u_1.p3y('Unexpected leading comma');
    }
  }
  function decodeMapIndex($this) {
    var hasComma = false;
    var decodingKey = !(($this.c3u_1 % 2 | 0) === 0);
    if (decodingKey) {
      if (!($this.c3u_1 === -1)) {
        hasComma = $this.a3u_1.i41();
      }
    } else {
      $this.a3u_1.h41(_Char___init__impl__6a9atx(58));
    }
    var tmp;
    if ($this.a3u_1.s3z()) {
      if (decodingKey) {
        if ($this.c3u_1 === -1) {
          var tmp0 = $this.a3u_1;
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.require' call
          var condition = !hasComma;
          var position = tmp0.g3u_1;
          if (!condition) {
            var tmp$ret$0 = 'Unexpected leading comma';
            tmp0.p3y(tmp$ret$0, position);
          }
        } else {
          var tmp3 = $this.a3u_1;
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.require' call
          var condition_0 = hasComma;
          var position_0 = tmp3.g3u_1;
          if (!condition_0) {
            var tmp$ret$2 = 'Expected comma after the key-value pair';
            tmp3.p3y(tmp$ret$2, position_0);
          }
        }
      }
      $this.c3u_1 = $this.c3u_1 + 1 | 0;
      tmp = $this.c3u_1;
    } else {
      if (hasComma && !$this.y3t_1.o3t_1.s3v_1) {
        invalidTrailingComma($this.a3u_1);
      }
      tmp = -1;
    }
    return tmp;
  }
  function coerceInputValue($this, descriptor, index) {
    var tmp0 = $this.y3t_1;
    var tmp$ret$1;
    $l$block_2: {
      // Inline function 'kotlinx.serialization.json.internal.tryCoerceValue' call
      var isOptional = descriptor.r1m(index);
      var elementDescriptor = descriptor.q1m(index);
      var tmp;
      if (isOptional && !elementDescriptor.f1m()) {
        tmp = $this.a3u_1.j41(true);
      } else {
        tmp = false;
      }
      if (tmp) {
        tmp$ret$1 = true;
        break $l$block_2;
      }
      if (equals(elementDescriptor.j1m(), ENUM_getInstance())) {
        var tmp_0;
        if (elementDescriptor.f1m()) {
          tmp_0 = $this.a3u_1.j41(false);
        } else {
          tmp_0 = false;
        }
        if (tmp_0) {
          tmp$ret$1 = false;
          break $l$block_2;
        }
        var tmp0_elvis_lhs = $this.a3u_1.k41($this.e3u_1.g3v_1);
        var tmp_1;
        if (tmp0_elvis_lhs == null) {
          tmp$ret$1 = false;
          break $l$block_2;
        } else {
          tmp_1 = tmp0_elvis_lhs;
        }
        var enumValue = tmp_1;
        var enumIndex = getJsonNameIndex(elementDescriptor, tmp0, enumValue);
        var coerceToNull = !tmp0.o3t_1.j3v_1 && elementDescriptor.f1m();
        if (enumIndex === -3 && (isOptional || coerceToNull)) {
          $this.a3u_1.t3z();
          tmp$ret$1 = true;
          break $l$block_2;
        }
      }
      tmp$ret$1 = false;
    }
    return tmp$ret$1;
  }
  function decodeObjectIndex($this, descriptor) {
    var hasComma = $this.a3u_1.i41();
    while ($this.a3u_1.s3z()) {
      hasComma = false;
      var key = decodeStringKey($this);
      $this.a3u_1.h41(_Char___init__impl__6a9atx(58));
      var index = getJsonNameIndex(descriptor, $this.y3t_1, key);
      var tmp;
      if (!(index === -3)) {
        var tmp_0;
        if ($this.e3u_1.l3v_1 && coerceInputValue($this, descriptor, index)) {
          hasComma = $this.a3u_1.i41();
          tmp_0 = false;
        } else {
          var tmp0_safe_receiver = $this.f3u_1;
          if (tmp0_safe_receiver == null)
            null;
          else {
            tmp0_safe_receiver.m3y(index);
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
    if (hasComma && !$this.y3t_1.o3t_1.s3v_1) {
      invalidTrailingComma($this.a3u_1);
    }
    var tmp1_safe_receiver = $this.f3u_1;
    var tmp2_elvis_lhs = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.n3y();
    return tmp2_elvis_lhs == null ? -1 : tmp2_elvis_lhs;
  }
  function handleUnknown($this, key) {
    if ($this.e3u_1.f3v_1 || trySkip($this, $this.d3u_1, key)) {
      $this.a3u_1.m41($this.e3u_1.g3v_1);
    } else {
      $this.a3u_1.l41(key);
    }
    return $this.a3u_1.i41();
  }
  function decodeListIndex($this) {
    var hasComma = $this.a3u_1.i41();
    var tmp;
    if ($this.a3u_1.s3z()) {
      if (!($this.c3u_1 === -1) && !hasComma) {
        $this.a3u_1.p3y('Expected end of the array or comma');
      }
      $this.c3u_1 = $this.c3u_1 + 1 | 0;
      tmp = $this.c3u_1;
    } else {
      if (hasComma && !$this.y3t_1.o3t_1.s3v_1) {
        invalidTrailingComma($this.a3u_1, 'array');
      }
      tmp = -1;
    }
    return tmp;
  }
  function decodeStringKey($this) {
    var tmp;
    if ($this.e3u_1.g3v_1) {
      tmp = $this.a3u_1.o41();
    } else {
      tmp = $this.a3u_1.n41();
    }
    return tmp;
  }
  function StreamingJsonDecoder(json, mode, lexer, descriptor, discriminatorHolder) {
    AbstractDecoder.call(this);
    this.y3t_1 = json;
    this.z3t_1 = mode;
    this.a3u_1 = lexer;
    this.b3u_1 = this.y3t_1.u1o();
    this.c3u_1 = -1;
    this.d3u_1 = discriminatorHolder;
    this.e3u_1 = this.y3t_1.o3t_1;
    this.f3u_1 = this.e3u_1.j3v_1 ? null : new JsonElementMarker(descriptor);
  }
  protoOf(StreamingJsonDecoder).v3v = function () {
    return this.y3t_1;
  };
  protoOf(StreamingJsonDecoder).u1o = function () {
    return this.b3u_1;
  };
  protoOf(StreamingJsonDecoder).w3v = function () {
    return (new JsonTreeReader(this.y3t_1.o3t_1, this.a3u_1)).v3z();
  };
  protoOf(StreamingJsonDecoder).e1o = function (deserializer) {
    try {
      var tmp;
      if (!(deserializer instanceof AbstractPolymorphicSerializer)) {
        tmp = true;
      } else {
        tmp = this.y3t_1.o3t_1.m3v_1;
      }
      if (tmp) {
        return deserializer.y1k(this);
      }
      var discriminator = classDiscriminator(deserializer.w1k(), this.y3t_1);
      var tmp0_elvis_lhs = this.a3u_1.p41(discriminator, this.e3u_1.g3v_1);
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
            tmp_1 = this.v3v().o3t_1.m3v_1;
          }
          if (tmp_1) {
            tmp$ret$0 = tmp1.y1k(this);
            break $l$block;
          }
          var discriminator_0 = classDiscriminator(tmp1.w1k(), this.v3v());
          var tmp0 = this.w3v();
          // Inline function 'kotlinx.serialization.json.internal.cast' call
          var serialName = tmp1.w1k().x1l();
          if (!(tmp0 instanceof JsonObject)) {
            var tmp_2 = getKClass(JsonObject).za();
            var tmp_3 = getKClassFromExpression(tmp0).za();
            var tmp$ret$1 = this.a3u_1.h3u_1.c3z();
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
          tmp$ret$0 = readPolymorphicJson(this.v3v(), discriminator_0, jsonTree, actualSerializer);
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
          this.a3u_1.p3y(message, VOID, hint);
        } else {
          throw $p;
        }
        tmp_7 = tmp_8;
      }
      var tmp_9 = tmp_7;
      var actualSerializer_0 = isInterface(tmp_9, DeserializationStrategy) ? tmp_9 : THROW_CCE();
      this.d3u_1 = new DiscriminatorHolder(discriminator);
      return actualSerializer_0.y1k(this);
    } catch ($p) {
      if ($p instanceof MissingFieldException) {
        var e = $p;
        if (contains_0(ensureNotNull(e.message), 'at path'))
          throw e;
        throw new MissingFieldException(e.z1l_1, plus(e.message, ' at path: ') + this.a3u_1.h3u_1.c3z(), e);
      } else {
        throw $p;
      }
    }
  };
  protoOf(StreamingJsonDecoder).f1o = function (descriptor) {
    var newMode = switchMode(this.y3t_1, descriptor);
    this.a3u_1.h3u_1.x3y(descriptor);
    this.a3u_1.h41(newMode.s41_1);
    checkLeadingComma(this);
    var tmp;
    switch (newMode.o2_1) {
      case 1:
      case 2:
      case 3:
        tmp = new StreamingJsonDecoder(this.y3t_1, newMode, this.a3u_1, descriptor, this.d3u_1);
        break;
      default:
        var tmp_0;
        if (this.z3t_1.equals(newMode) && this.y3t_1.o3t_1.j3v_1) {
          tmp_0 = this;
        } else {
          tmp_0 = new StreamingJsonDecoder(this.y3t_1, newMode, this.a3u_1, descriptor, this.d3u_1);
        }

        tmp = tmp_0;
        break;
    }
    return tmp;
  };
  protoOf(StreamingJsonDecoder).g1o = function (descriptor) {
    if (this.y3t_1.o3t_1.f3v_1 && descriptor.l1m() === 0) {
      skipLeftoverElements(this, descriptor);
    }
    if (this.a3u_1.i41() && !this.y3t_1.o3t_1.s3v_1) {
      invalidTrailingComma(this.a3u_1, '');
    }
    this.a3u_1.h41(this.z3t_1.t41_1);
    this.a3u_1.h3u_1.b3z();
  };
  protoOf(StreamingJsonDecoder).q1n = function () {
    var tmp;
    var tmp0_safe_receiver = this.f3u_1;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.l3y_1;
    if (!(tmp1_elvis_lhs == null ? false : tmp1_elvis_lhs)) {
      tmp = !this.a3u_1.u41();
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(StreamingJsonDecoder).r1n = function () {
    return null;
  };
  protoOf(StreamingJsonDecoder).r1o = function (descriptor, index, deserializer, previousValue) {
    var isMapKey = this.z3t_1.equals(WriteMode_MAP_getInstance()) && (index & 1) === 0;
    if (isMapKey) {
      this.a3u_1.h3u_1.a3z();
    }
    var value = protoOf(AbstractDecoder).r1o.call(this, descriptor, index, deserializer, previousValue);
    if (isMapKey) {
      this.a3u_1.h3u_1.z3y(value);
    }
    return value;
  };
  protoOf(StreamingJsonDecoder).w1o = function (descriptor) {
    var index;
    switch (this.z3t_1.o2_1) {
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
    if (!this.z3t_1.equals(WriteMode_MAP_getInstance())) {
      this.a3u_1.h3u_1.y3y(index);
    }
    return index;
  };
  protoOf(StreamingJsonDecoder).s1n = function () {
    return this.a3u_1.v41();
  };
  protoOf(StreamingJsonDecoder).t1n = function () {
    var value = this.a3u_1.f3w();
    if (!value.equals(toLong(value.j3()))) {
      this.a3u_1.p3y("Failed to parse byte for input '" + value.toString() + "'");
    }
    return value.j3();
  };
  protoOf(StreamingJsonDecoder).u1n = function () {
    var value = this.a3u_1.f3w();
    if (!value.equals(toLong(value.k3()))) {
      this.a3u_1.p3y("Failed to parse short for input '" + value.toString() + "'");
    }
    return value.k3();
  };
  protoOf(StreamingJsonDecoder).v1n = function () {
    var value = this.a3u_1.f3w();
    if (!value.equals(toLong(value.g1()))) {
      this.a3u_1.p3y("Failed to parse int for input '" + value.toString() + "'");
    }
    return value.g1();
  };
  protoOf(StreamingJsonDecoder).w1n = function () {
    return this.a3u_1.f3w();
  };
  protoOf(StreamingJsonDecoder).x1n = function () {
    var tmp0 = this.a3u_1;
    var tmp$ret$4;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.parseString' call
      var input = tmp0.u3z();
      try {
        // Inline function 'kotlin.text.toFloat' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        tmp$ret$4 = toDouble(input);
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          tmp0.p3y("Failed to parse type '" + 'float' + "' for input '" + input + "'");
        } else {
          throw $p;
        }
      }
    }
    var result = tmp$ret$4;
    var specialFp = this.y3t_1.o3t_1.o3v_1;
    if (specialFp || isFinite(result))
      return result;
    throwInvalidFloatingPointDecoded(this.a3u_1, result);
  };
  protoOf(StreamingJsonDecoder).y1n = function () {
    var tmp0 = this.a3u_1;
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.parseString' call
      var input = tmp0.u3z();
      try {
        tmp$ret$1 = toDouble(input);
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          tmp0.p3y("Failed to parse type '" + 'double' + "' for input '" + input + "'");
        } else {
          throw $p;
        }
      }
    }
    var result = tmp$ret$1;
    var specialFp = this.y3t_1.o3t_1.o3v_1;
    if (specialFp || isFinite_0(result))
      return result;
    throwInvalidFloatingPointDecoded(this.a3u_1, result);
  };
  protoOf(StreamingJsonDecoder).z1n = function () {
    var string = this.a3u_1.u3z();
    if (!(string.length === 1)) {
      this.a3u_1.p3y("Expected single char, but got '" + string + "'");
    }
    return charSequenceGet(string, 0);
  };
  protoOf(StreamingJsonDecoder).a1o = function () {
    var tmp;
    if (this.e3u_1.g3v_1) {
      tmp = this.a3u_1.o41();
    } else {
      tmp = this.a3u_1.t3z();
    }
    return tmp;
  };
  protoOf(StreamingJsonDecoder).c1o = function (descriptor) {
    return get_isUnsignedNumber(descriptor) ? new JsonDecoderForUnsignedTypes(this.a3u_1, this.y3t_1) : protoOf(AbstractDecoder).c1o.call(this, descriptor);
  };
  protoOf(StreamingJsonDecoder).b1o = function (enumDescriptor) {
    return getJsonNameIndexOrThrow(enumDescriptor, this.y3t_1, this.a1o(), ' at path ' + this.a3u_1.h3u_1.c3z());
  };
  function JsonDecoderForUnsignedTypes(lexer, json) {
    AbstractDecoder.call(this);
    this.w41_1 = lexer;
    this.x41_1 = json.u1o();
  }
  protoOf(JsonDecoderForUnsignedTypes).u1o = function () {
    return this.x41_1;
  };
  protoOf(JsonDecoderForUnsignedTypes).w1o = function (descriptor) {
    var message = 'unsupported';
    throw IllegalStateException_init_$Create$(toString(message));
  };
  protoOf(JsonDecoderForUnsignedTypes).v1n = function () {
    var tmp0 = this.w41_1;
    var tmp$ret$2;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.parseString' call
      var input = tmp0.u3z();
      try {
        // Inline function 'kotlin.UInt.toInt' call
        var this_0 = toUInt(input);
        tmp$ret$2 = _UInt___get_data__impl__f0vqqw(this_0);
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          tmp0.p3y("Failed to parse type '" + 'UInt' + "' for input '" + input + "'");
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$2;
  };
  protoOf(JsonDecoderForUnsignedTypes).w1n = function () {
    var tmp0 = this.w41_1;
    var tmp$ret$2;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.parseString' call
      var input = tmp0.u3z();
      try {
        // Inline function 'kotlin.ULong.toLong' call
        var this_0 = toULong(input);
        tmp$ret$2 = _ULong___get_data__impl__fggpzb(this_0);
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          tmp0.p3y("Failed to parse type '" + 'ULong' + "' for input '" + input + "'");
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$2;
  };
  protoOf(JsonDecoderForUnsignedTypes).t1n = function () {
    var tmp0 = this.w41_1;
    var tmp$ret$2;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.parseString' call
      var input = tmp0.u3z();
      try {
        // Inline function 'kotlin.UByte.toByte' call
        var this_0 = toUByte(input);
        tmp$ret$2 = _UByte___get_data__impl__jof9qr(this_0);
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          tmp0.p3y("Failed to parse type '" + 'UByte' + "' for input '" + input + "'");
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$2;
  };
  protoOf(JsonDecoderForUnsignedTypes).u1n = function () {
    var tmp0 = this.w41_1;
    var tmp$ret$2;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.parseString' call
      var input = tmp0.u3z();
      try {
        // Inline function 'kotlin.UShort.toShort' call
        var this_0 = toUShort(input);
        tmp$ret$2 = _UShort___get_data__impl__g0245(this_0);
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          tmp0.p3y("Failed to parse type '" + 'UShort' + "' for input '" + input + "'");
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
    $this.d3z_1.j3x();
    $this.j1p(discriminator);
    $this.d3z_1.m3x(_Char___init__impl__6a9atx(58));
    $this.d3z_1.l3x();
    $this.j1p(serialName);
  }
  function StreamingJsonEncoder(composer, json, mode, modeReuseCache) {
    AbstractEncoder.call(this);
    this.d3z_1 = composer;
    this.e3z_1 = json;
    this.f3z_1 = mode;
    this.g3z_1 = modeReuseCache;
    this.h3z_1 = this.e3z_1.u1o();
    this.i3z_1 = this.e3z_1.o3t_1;
    this.j3z_1 = false;
    this.k3z_1 = null;
    this.l3z_1 = null;
    var i = this.f3z_1.o2_1;
    if (!(this.g3z_1 == null)) {
      if (!(this.g3z_1[i] === null) || !(this.g3z_1[i] === this)) {
        this.g3z_1[i] = this;
      }
    }
  }
  protoOf(StreamingJsonEncoder).v3v = function () {
    return this.e3z_1;
  };
  protoOf(StreamingJsonEncoder).u1o = function () {
    return this.h3z_1;
  };
  protoOf(StreamingJsonEncoder).c1q = function (descriptor, index) {
    return this.i3z_1.e3v_1;
  };
  protoOf(StreamingJsonEncoder).x1p = function (serializer, value) {
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.encodePolymorphically' call
      if (this.v3v().o3t_1.m3v_1) {
        serializer.x1k(this, value);
        break $l$block;
      }
      var isPolymorphicSerializer = serializer instanceof AbstractPolymorphicSerializer;
      var tmp;
      if (isPolymorphicSerializer) {
        tmp = !this.v3v().o3t_1.u3v_1.equals(ClassDiscriminatorMode_NONE_getInstance());
      } else {
        var tmp_0;
        switch (this.v3v().o3t_1.u3v_1.o2_1) {
          case 0:
          case 2:
            tmp_0 = false;
            break;
          case 1:
            // Inline function 'kotlin.let' call

            var it = serializer.w1k().j1m();
            tmp_0 = equals(it, CLASS_getInstance()) || equals(it, OBJECT_getInstance());
            break;
          default:
            noWhenBranchMatchedException();
            break;
        }
        tmp = tmp_0;
      }
      var needDiscriminator = tmp;
      var baseClassDiscriminator = needDiscriminator ? classDiscriminator(serializer.w1k(), this.v3v()) : null;
      var tmp_1;
      if (isPolymorphicSerializer) {
        var casted = serializer instanceof AbstractPolymorphicSerializer ? serializer : THROW_CCE();
        $l$block_0: {
          // Inline function 'kotlin.requireNotNull' call
          if (value == null) {
            var message = 'Value for serializer ' + toString(serializer.w1k()) + ' should always be non-null. Please report issue to the kotlinx.serialization tracker.';
            throw IllegalArgumentException_init_$Create$(toString(message));
          } else {
            break $l$block_0;
          }
        }
        var actual = findPolymorphicSerializer_0(casted, this, value);
        if (!(baseClassDiscriminator == null)) {
          access$validateIfSealed$tPolymorphicKt(serializer, actual, baseClassDiscriminator);
        }
        checkKind(actual.w1k().j1m());
        tmp_1 = isInterface(actual, SerializationStrategy) ? actual : THROW_CCE();
      } else {
        tmp_1 = serializer;
      }
      var actualSerializer = tmp_1;
      if (!(baseClassDiscriminator == null)) {
        var serialName = actualSerializer.w1k().x1l();
        this.k3z_1 = baseClassDiscriminator;
        this.l3z_1 = serialName;
      }
      actualSerializer.x1k(this, value);
    }
  };
  protoOf(StreamingJsonEncoder).f1o = function (descriptor) {
    var newMode = switchMode(this.e3z_1, descriptor);
    if (!(newMode.s41_1 === _Char___init__impl__6a9atx(0))) {
      this.d3z_1.m3x(newMode.s41_1);
      this.d3z_1.h3x();
    }
    var discriminator = this.k3z_1;
    if (!(discriminator == null)) {
      var tmp0_elvis_lhs = this.l3z_1;
      encodeTypeInfo(this, discriminator, tmp0_elvis_lhs == null ? descriptor.x1l() : tmp0_elvis_lhs);
      this.k3z_1 = null;
      this.l3z_1 = null;
    }
    if (this.f3z_1.equals(newMode)) {
      return this;
    }
    var tmp1_safe_receiver = this.g3z_1;
    var tmp2_elvis_lhs = tmp1_safe_receiver == null ? null : tmp1_safe_receiver[newMode.o2_1];
    return tmp2_elvis_lhs == null ? new StreamingJsonEncoder(this.d3z_1, this.e3z_1, newMode, this.g3z_1) : tmp2_elvis_lhs;
  };
  protoOf(StreamingJsonEncoder).g1o = function (descriptor) {
    if (!(this.f3z_1.t41_1 === _Char___init__impl__6a9atx(0))) {
      this.d3z_1.i3x();
      this.d3z_1.k3x();
      this.d3z_1.m3x(this.f3z_1.t41_1);
    }
  };
  protoOf(StreamingJsonEncoder).y1o = function (descriptor, index) {
    switch (this.f3z_1.o2_1) {
      case 1:
        if (!this.d3z_1.g3x_1) {
          this.d3z_1.m3x(_Char___init__impl__6a9atx(44));
        }

        this.d3z_1.j3x();
        break;
      case 2:
        if (!this.d3z_1.g3x_1) {
          var tmp = this;
          var tmp_0;
          if ((index % 2 | 0) === 0) {
            this.d3z_1.m3x(_Char___init__impl__6a9atx(44));
            this.d3z_1.j3x();
            tmp_0 = true;
          } else {
            this.d3z_1.m3x(_Char___init__impl__6a9atx(58));
            this.d3z_1.l3x();
            tmp_0 = false;
          }
          tmp.j3z_1 = tmp_0;
        } else {
          this.j3z_1 = true;
          this.d3z_1.j3x();
        }

        break;
      case 3:
        if (index === 0)
          this.j3z_1 = true;
        if (index === 1) {
          this.d3z_1.m3x(_Char___init__impl__6a9atx(44));
          this.d3z_1.l3x();
          this.j3z_1 = false;
        }

        break;
      default:
        if (!this.d3z_1.g3x_1) {
          this.d3z_1.m3x(_Char___init__impl__6a9atx(44));
        }

        this.d3z_1.j3x();
        this.j1p(getJsonElementName(descriptor, this.e3z_1, index));
        this.d3z_1.m3x(_Char___init__impl__6a9atx(58));
        this.d3z_1.l3x();
        break;
    }
    return true;
  };
  protoOf(StreamingJsonEncoder).y1p = function (descriptor, index, serializer, value) {
    if (!(value == null) || this.i3z_1.j3v_1) {
      protoOf(AbstractEncoder).y1p.call(this, descriptor, index, serializer, value);
    }
  };
  protoOf(StreamingJsonEncoder).l1p = function (descriptor) {
    var tmp;
    if (get_isUnsignedNumber(descriptor)) {
      // Inline function 'kotlinx.serialization.json.internal.StreamingJsonEncoder.composerAs' call
      var tmp_0;
      var tmp_1 = this.d3z_1;
      if (tmp_1 instanceof ComposerForUnsignedNumbers) {
        tmp_0 = this.d3z_1;
      } else {
        var tmp1 = this.d3z_1.f3x_1;
        var p1 = this.j3z_1;
        tmp_0 = new ComposerForUnsignedNumbers(tmp1, p1);
      }
      var tmp$ret$1 = tmp_0;
      tmp = new StreamingJsonEncoder(tmp$ret$1, this.e3z_1, this.f3z_1, null);
    } else if (get_isUnquotedLiteral(descriptor)) {
      // Inline function 'kotlinx.serialization.json.internal.StreamingJsonEncoder.composerAs' call
      var tmp_2;
      var tmp_3 = this.d3z_1;
      if (tmp_3 instanceof ComposerForUnquotedLiterals) {
        tmp_2 = this.d3z_1;
      } else {
        var tmp4 = this.d3z_1.f3x_1;
        var p1_0 = this.j3z_1;
        tmp_2 = new ComposerForUnquotedLiterals(tmp4, p1_0);
      }
      var tmp$ret$3 = tmp_2;
      tmp = new StreamingJsonEncoder(tmp$ret$3, this.e3z_1, this.f3z_1, null);
    } else if (!(this.k3z_1 == null)) {
      // Inline function 'kotlin.apply' call
      this.l3z_1 = descriptor.x1l();
      tmp = this;
    } else {
      tmp = protoOf(AbstractEncoder).l1p.call(this, descriptor);
    }
    return tmp;
  };
  protoOf(StreamingJsonEncoder).a1p = function () {
    this.d3z_1.o3x('null');
  };
  protoOf(StreamingJsonEncoder).b1p = function (value) {
    if (this.j3z_1) {
      this.j1p(value.toString());
    } else {
      this.d3z_1.x3x(value);
    }
  };
  protoOf(StreamingJsonEncoder).c1p = function (value) {
    if (this.j3z_1) {
      this.j1p(value.toString());
    } else {
      this.d3z_1.s3x(value);
    }
  };
  protoOf(StreamingJsonEncoder).d1p = function (value) {
    if (this.j3z_1) {
      this.j1p(value.toString());
    } else {
      this.d3z_1.u3x(value);
    }
  };
  protoOf(StreamingJsonEncoder).e1p = function (value) {
    if (this.j3z_1) {
      this.j1p(value.toString());
    } else {
      this.d3z_1.v3x(value);
    }
  };
  protoOf(StreamingJsonEncoder).f1p = function (value) {
    if (this.j3z_1) {
      this.j1p(value.toString());
    } else {
      this.d3z_1.w3x(value);
    }
  };
  protoOf(StreamingJsonEncoder).g1p = function (value) {
    if (this.j3z_1) {
      this.j1p(value.toString());
    } else {
      this.d3z_1.q3x(value);
    }
    if (!this.i3z_1.o3v_1 && !isFinite(value)) {
      throw InvalidFloatingPointEncoded_0(value, toString(this.d3z_1.f3x_1));
    }
  };
  protoOf(StreamingJsonEncoder).h1p = function (value) {
    if (this.j3z_1) {
      this.j1p(value.toString());
    } else {
      this.d3z_1.r3x(value);
    }
    if (!this.i3z_1.o3v_1 && !isFinite_0(value)) {
      throw InvalidFloatingPointEncoded_0(value, toString(this.d3z_1.f3x_1));
    }
  };
  protoOf(StreamingJsonEncoder).i1p = function (value) {
    this.j1p(toString_1(value));
  };
  protoOf(StreamingJsonEncoder).j1p = function (value) {
    return this.d3z_1.y3x(value);
  };
  protoOf(StreamingJsonEncoder).k1p = function (enumDescriptor, index) {
    this.j1p(enumDescriptor.n1m(index));
  };
  function get_isUnsignedNumber(_this__u8e3s4) {
    _init_properties_StreamingJsonEncoder_kt__pn1bsi();
    return _this__u8e3s4.k1m() && get_unsignedNumberDescriptors().r(_this__u8e3s4);
  }
  function get_isUnquotedLiteral(_this__u8e3s4) {
    _init_properties_StreamingJsonEncoder_kt__pn1bsi();
    return _this__u8e3s4.k1m() && equals(_this__u8e3s4, get_jsonUnquotedLiteralDescriptor());
  }
  var properties_initialized_StreamingJsonEncoder_kt_6ifwwk;
  function _init_properties_StreamingJsonEncoder_kt__pn1bsi() {
    if (!properties_initialized_StreamingJsonEncoder_kt_6ifwwk) {
      properties_initialized_StreamingJsonEncoder_kt_6ifwwk = true;
      unsignedNumberDescriptors = setOf([serializer_1(Companion_getInstance_0()).w1k(), serializer_0(Companion_getInstance()).w1k(), serializer_2(Companion_getInstance_1()).w1k(), serializer_3(Companion_getInstance_2()).w1k()]);
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
    _this__u8e3s4.f8(_Char___init__impl__6a9atx(34));
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
          _this__u8e3s4.e8(get_ESCAPE_STRINGS()[c]);
          lastPos = i + 1 | 0;
        }
      }
       while (inductionVariable <= last);
    if (!(lastPos === 0))
      _this__u8e3s4.pc(value, lastPos, value.length);
    else
      _this__u8e3s4.e8(value);
    _this__u8e3s4.f8(_Char___init__impl__6a9atx(34));
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
    return input.e1o(deserializer);
  }
  function unparsedPrimitive($this, literal, primitive, tag) {
    var type = startsWith(primitive, 'i') ? 'an ' + primitive : 'a ' + primitive;
    throw JsonDecodingException_0(-1, "Failed to parse literal '" + literal.toString() + "' as " + type + ' value at element: ' + $this.e42(tag), toString($this.f42()));
  }
  function AbstractJsonTreeDecoder(json, value, polymorphicDiscriminator) {
    polymorphicDiscriminator = polymorphicDiscriminator === VOID ? null : polymorphicDiscriminator;
    NamedValueDecoder.call(this);
    this.a42_1 = json;
    this.b42_1 = value;
    this.c42_1 = polymorphicDiscriminator;
    this.d42_1 = this.v3v().o3t_1;
  }
  protoOf(AbstractJsonTreeDecoder).v3v = function () {
    return this.a42_1;
  };
  protoOf(AbstractJsonTreeDecoder).w = function () {
    return this.b42_1;
  };
  protoOf(AbstractJsonTreeDecoder).u1o = function () {
    return this.v3v().u1o();
  };
  protoOf(AbstractJsonTreeDecoder).f42 = function () {
    var tmp0_safe_receiver = this.l22();
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      tmp = this.g42(tmp0_safe_receiver);
    }
    var tmp1_elvis_lhs = tmp;
    return tmp1_elvis_lhs == null ? this.w() : tmp1_elvis_lhs;
  };
  protoOf(AbstractJsonTreeDecoder).e42 = function (currentTag) {
    return this.j23() + ('.' + currentTag);
  };
  protoOf(AbstractJsonTreeDecoder).w3v = function () {
    return this.f42();
  };
  protoOf(AbstractJsonTreeDecoder).e1o = function (deserializer) {
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.decodeSerializableValuePolymorphic' call
      var tmp;
      if (!(deserializer instanceof AbstractPolymorphicSerializer)) {
        tmp = true;
      } else {
        tmp = this.v3v().o3t_1.m3v_1;
      }
      if (tmp) {
        tmp$ret$0 = deserializer.y1k(this);
        break $l$block;
      }
      var discriminator = classDiscriminator(deserializer.w1k(), this.v3v());
      var tmp0 = this.w3v();
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var serialName = deserializer.w1k().x1l();
      if (!(tmp0 instanceof JsonObject)) {
        var tmp_0 = getKClass(JsonObject).za();
        var tmp_1 = getKClassFromExpression(tmp0).za();
        var tmp$ret$1 = this.j23();
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
      tmp$ret$0 = readPolymorphicJson(this.v3v(), discriminator, jsonTree, actualSerializer);
    }
    return tmp$ret$0;
  };
  protoOf(AbstractJsonTreeDecoder).m22 = function (parentName, childName) {
    return childName;
  };
  protoOf(AbstractJsonTreeDecoder).f1o = function (descriptor) {
    var currentObject = this.f42();
    var tmp0_subject = descriptor.j1m();
    var tmp;
    var tmp_0;
    if (equals(tmp0_subject, LIST_getInstance())) {
      tmp_0 = true;
    } else {
      tmp_0 = tmp0_subject instanceof PolymorphicKind;
    }
    if (tmp_0) {
      var tmp_1 = this.v3v();
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var serialName = descriptor.x1l();
      if (!(currentObject instanceof JsonArray)) {
        var tmp_2 = getKClass(JsonArray).za();
        var tmp_3 = getKClassFromExpression(currentObject).za();
        var tmp$ret$0 = this.j23();
        throw JsonDecodingException_0(-1, 'Expected ' + tmp_2 + ', but had ' + tmp_3 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$0, toString(currentObject));
      }
      tmp = new JsonTreeListDecoder(tmp_1, currentObject);
    } else {
      if (equals(tmp0_subject, MAP_getInstance())) {
        // Inline function 'kotlinx.serialization.json.internal.selectMapMode' call
        var this_0 = this.v3v();
        var keyDescriptor = carrierDescriptor(descriptor.q1m(0), this_0.u1o());
        var keyKind = keyDescriptor.j1m();
        var tmp_4;
        var tmp_5;
        if (keyKind instanceof PrimitiveKind) {
          tmp_5 = true;
        } else {
          tmp_5 = equals(keyKind, ENUM_getInstance());
        }
        if (tmp_5) {
          var tmp_6 = this.v3v();
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
          // Inline function 'kotlinx.serialization.json.internal.cast' call
          var serialName_0 = descriptor.x1l();
          if (!(currentObject instanceof JsonObject)) {
            var tmp_7 = getKClass(JsonObject).za();
            var tmp_8 = getKClassFromExpression(currentObject).za();
            var tmp$ret$3 = this.j23();
            throw JsonDecodingException_0(-1, 'Expected ' + tmp_7 + ', but had ' + tmp_8 + ' as the serialized body of ' + serialName_0 + ' at element: ' + tmp$ret$3, toString(currentObject));
          }
          tmp_4 = new JsonTreeMapDecoder(tmp_6, currentObject);
        } else {
          if (this_0.o3t_1.h3v_1) {
            var tmp_9 = this.v3v();
            // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
            // Inline function 'kotlinx.serialization.json.internal.cast' call
            var serialName_1 = descriptor.x1l();
            if (!(currentObject instanceof JsonArray)) {
              var tmp_10 = getKClass(JsonArray).za();
              var tmp_11 = getKClassFromExpression(currentObject).za();
              var tmp$ret$7 = this.j23();
              throw JsonDecodingException_0(-1, 'Expected ' + tmp_10 + ', but had ' + tmp_11 + ' as the serialized body of ' + serialName_1 + ' at element: ' + tmp$ret$7, toString(currentObject));
            }
            tmp_4 = new JsonTreeListDecoder(tmp_9, currentObject);
          } else {
            throw InvalidKeyKindException(keyDescriptor);
          }
        }
        tmp = tmp_4;
      } else {
        var tmp_12 = this.v3v();
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
        // Inline function 'kotlinx.serialization.json.internal.cast' call
        var serialName_2 = descriptor.x1l();
        if (!(currentObject instanceof JsonObject)) {
          var tmp_13 = getKClass(JsonObject).za();
          var tmp_14 = getKClassFromExpression(currentObject).za();
          var tmp$ret$12 = this.j23();
          throw JsonDecodingException_0(-1, 'Expected ' + tmp_13 + ', but had ' + tmp_14 + ' as the serialized body of ' + serialName_2 + ' at element: ' + tmp$ret$12, toString(currentObject));
        }
        tmp = new JsonTreeDecoder(tmp_12, currentObject, this.c42_1);
      }
    }
    return tmp;
  };
  protoOf(AbstractJsonTreeDecoder).g1o = function (descriptor) {
  };
  protoOf(AbstractJsonTreeDecoder).q1n = function () {
    var tmp = this.f42();
    return !(tmp instanceof JsonNull);
  };
  protoOf(AbstractJsonTreeDecoder).h42 = function (tag, enumDescriptor) {
    var tmp = this.v3v();
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
    var tmp1 = this.g42(tag);
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var serialName = enumDescriptor.x1l();
    if (!(tmp1 instanceof JsonPrimitive)) {
      var tmp_0 = getKClass(JsonPrimitive).za();
      var tmp_1 = getKClassFromExpression(tmp1).za();
      var tmp$ret$0 = this.e42(tag);
      throw JsonDecodingException_0(-1, 'Expected ' + tmp_0 + ', but had ' + tmp_1 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$0, toString(tmp1));
    }
    return getJsonNameIndexOrThrow(enumDescriptor, tmp, tmp1.y3v());
  };
  protoOf(AbstractJsonTreeDecoder).v23 = function (tag, enumDescriptor) {
    return this.h42((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), enumDescriptor);
  };
  protoOf(AbstractJsonTreeDecoder).i42 = function (tag) {
    return !(this.g42(tag) === JsonNull_getInstance());
  };
  protoOf(AbstractJsonTreeDecoder).l23 = function (tag) {
    return this.i42((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).j42 = function (tag) {
    var tmp$ret$4;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.g42(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp = getKClass(JsonPrimitive).za();
        var tmp_0 = getKClassFromExpression(value).za();
        var tmp$ret$0 = this.e42(tag);
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
  protoOf(AbstractJsonTreeDecoder).m23 = function (tag) {
    return this.j42((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).k42 = function (tag) {
    var tmp$ret$4;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.g42(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp = getKClass(JsonPrimitive).za();
        var tmp_0 = getKClassFromExpression(value).za();
        var tmp$ret$0 = this.e42(tag);
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
  protoOf(AbstractJsonTreeDecoder).n23 = function (tag) {
    return this.k42((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).l42 = function (tag) {
    var tmp$ret$4;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.g42(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp = getKClass(JsonPrimitive).za();
        var tmp_0 = getKClassFromExpression(value).za();
        var tmp$ret$0 = this.e42(tag);
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
  protoOf(AbstractJsonTreeDecoder).o23 = function (tag) {
    return this.l42((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).m42 = function (tag) {
    var tmp$ret$4;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.g42(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp = getKClass(JsonPrimitive).za();
        var tmp_0 = getKClassFromExpression(value).za();
        var tmp$ret$0 = this.e42(tag);
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
  protoOf(AbstractJsonTreeDecoder).p23 = function (tag) {
    return this.m42((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).n42 = function (tag) {
    var tmp$ret$4;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.g42(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp = getKClass(JsonPrimitive).za();
        var tmp_0 = getKClassFromExpression(value).za();
        var tmp$ret$0 = this.e42(tag);
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
  protoOf(AbstractJsonTreeDecoder).q23 = function (tag) {
    return this.n42((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).o42 = function (tag) {
    var tmp$ret$4;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.g42(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp = getKClass(JsonPrimitive).za();
        var tmp_0 = getKClassFromExpression(value).za();
        var tmp$ret$0 = this.e42(tag);
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
    var specialFp = this.v3v().o3t_1.o3v_1;
    if (specialFp || isFinite(result))
      return result;
    throw InvalidFloatingPointDecoded(result, tag, toString(this.f42()));
  };
  protoOf(AbstractJsonTreeDecoder).r23 = function (tag) {
    return this.o42((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).p42 = function (tag) {
    var tmp$ret$4;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.g42(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp = getKClass(JsonPrimitive).za();
        var tmp_0 = getKClassFromExpression(value).za();
        var tmp$ret$0 = this.e42(tag);
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
    var specialFp = this.v3v().o3t_1.o3v_1;
    if (specialFp || isFinite_0(result))
      return result;
    throw InvalidFloatingPointDecoded(result, tag, toString(this.f42()));
  };
  protoOf(AbstractJsonTreeDecoder).s23 = function (tag) {
    return this.p42((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).q42 = function (tag) {
    var tmp$ret$4;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.g42(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp = getKClass(JsonPrimitive).za();
        var tmp_0 = getKClassFromExpression(value).za();
        var tmp$ret$0 = this.e42(tag);
        throw JsonDecodingException_0(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'char' + ' at element: ' + tmp$ret$0, toString(value));
      }
      var literal = value;
      try {
        var tmp0_elvis_lhs = new Char(single(literal.y3v()));
        var tmp_1;
        if (tmp0_elvis_lhs == null) {
          unparsedPrimitive(this, literal, 'char', tag);
        } else {
          tmp_1 = tmp0_elvis_lhs;
        }
        tmp$ret$4 = tmp_1.m1_1;
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
  protoOf(AbstractJsonTreeDecoder).t23 = function (tag) {
    return this.q42((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).r42 = function (tag) {
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var value = this.g42(tag);
    if (!(value instanceof JsonPrimitive)) {
      var tmp = getKClass(JsonPrimitive).za();
      var tmp_0 = getKClassFromExpression(value).za();
      var tmp$ret$0 = this.e42(tag);
      throw JsonDecodingException_0(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'string' + ' at element: ' + tmp$ret$0, toString(value));
    }
    var value_0 = value;
    if (!(value_0 instanceof JsonLiteral))
      throw JsonDecodingException_0(-1, "Expected string value for a non-null key '" + tag + "', got null literal instead at element: " + this.e42(tag), toString(this.f42()));
    if (!value_0.h3w_1 && !this.v3v().o3t_1.g3v_1) {
      throw JsonDecodingException_0(-1, "String literal for key '" + tag + "' should be quoted at element: " + this.e42(tag) + ".\nUse 'isLenient = true' in 'Json {}' builder to accept non-compliant JSON.", toString(this.f42()));
    }
    return value_0.j3w_1;
  };
  protoOf(AbstractJsonTreeDecoder).u23 = function (tag) {
    return this.r42((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).s42 = function (tag, inlineDescriptor) {
    var tmp;
    if (get_isUnsignedNumber(inlineDescriptor)) {
      var tmp_0 = this.v3v();
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      var tmp1 = this.g42(tag);
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var serialName = inlineDescriptor.x1l();
      if (!(tmp1 instanceof JsonPrimitive)) {
        var tmp_1 = getKClass(JsonPrimitive).za();
        var tmp_2 = getKClassFromExpression(tmp1).za();
        var tmp$ret$0 = this.e42(tag);
        throw JsonDecodingException_0(-1, 'Expected ' + tmp_1 + ', but had ' + tmp_2 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$0, toString(tmp1));
      }
      var lexer = StringJsonLexer_0(tmp_0, tmp1.y3v());
      tmp = new JsonDecoderForUnsignedTypes(lexer, this.v3v());
    } else {
      tmp = protoOf(NamedValueDecoder).w23.call(this, tag, inlineDescriptor);
    }
    return tmp;
  };
  protoOf(AbstractJsonTreeDecoder).w23 = function (tag, inlineDescriptor) {
    return this.s42((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), inlineDescriptor);
  };
  protoOf(AbstractJsonTreeDecoder).c1o = function (descriptor) {
    return !(this.l22() == null) ? protoOf(NamedValueDecoder).c1o.call(this, descriptor) : (new JsonPrimitiveDecoder(this.v3v(), this.w(), this.c42_1)).c1o(descriptor);
  };
  function coerceInputValue_0($this, descriptor, index, tag) {
    var tmp0 = $this.v3v();
    var tmp$ret$1;
    $l$block_2: {
      // Inline function 'kotlinx.serialization.json.internal.tryCoerceValue' call
      var isOptional = descriptor.r1m(index);
      var elementDescriptor = descriptor.q1m(index);
      var tmp;
      if (isOptional && !elementDescriptor.f1m()) {
        var tmp_0 = $this.g42(tag);
        tmp = tmp_0 instanceof JsonNull;
      } else {
        tmp = false;
      }
      if (tmp) {
        tmp$ret$1 = true;
        break $l$block_2;
      }
      if (equals(elementDescriptor.j1m(), ENUM_getInstance())) {
        var tmp_1;
        if (elementDescriptor.f1m()) {
          var tmp_2 = $this.g42(tag);
          tmp_1 = tmp_2 instanceof JsonNull;
        } else {
          tmp_1 = false;
        }
        if (tmp_1) {
          tmp$ret$1 = false;
          break $l$block_2;
        }
        var tmp_3 = $this.g42(tag);
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
        var coerceToNull = !tmp0.o3t_1.j3v_1 && elementDescriptor.f1m();
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
    $this.c43_1 = (!$this.v3v().o3t_1.j3v_1 && !descriptor.r1m(index) && descriptor.q1m(index).f1m());
    return $this.c43_1;
  }
  function JsonTreeDecoder(json, value, polymorphicDiscriminator, polyDescriptor) {
    polymorphicDiscriminator = polymorphicDiscriminator === VOID ? null : polymorphicDiscriminator;
    polyDescriptor = polyDescriptor === VOID ? null : polyDescriptor;
    AbstractJsonTreeDecoder.call(this, json, value, polymorphicDiscriminator);
    this.z42_1 = value;
    this.a43_1 = polyDescriptor;
    this.b43_1 = 0;
    this.c43_1 = false;
  }
  protoOf(JsonTreeDecoder).w = function () {
    return this.z42_1;
  };
  protoOf(JsonTreeDecoder).w1o = function (descriptor) {
    while (this.b43_1 < descriptor.l1m()) {
      var _unary__edvuaz = this.b43_1;
      this.b43_1 = _unary__edvuaz + 1 | 0;
      var name = this.h22(descriptor, _unary__edvuaz);
      var index = this.b43_1 - 1 | 0;
      this.c43_1 = false;
      var tmp;
      var tmp_0;
      // Inline function 'kotlin.collections.contains' call
      // Inline function 'kotlin.collections.containsKey' call
      var this_0 = this.w();
      if ((isInterface(this_0, KtMap) ? this_0 : THROW_CCE()).f2(name)) {
        tmp_0 = true;
      } else {
        tmp_0 = absenceIsNull(this, descriptor, index);
      }
      if (tmp_0) {
        tmp = !this.d42_1.l3v_1 || !coerceInputValue_0(this, descriptor, index, name);
      } else {
        tmp = false;
      }
      if (tmp) {
        return index;
      }
    }
    return -1;
  };
  protoOf(JsonTreeDecoder).q1n = function () {
    return !this.c43_1 && protoOf(AbstractJsonTreeDecoder).q1n.call(this);
  };
  protoOf(JsonTreeDecoder).i22 = function (descriptor, index) {
    var strategy = namingStrategy(descriptor, this.v3v());
    var baseName = descriptor.n1m(index);
    if (strategy == null) {
      if (!this.d42_1.p3v_1)
        return baseName;
      if (this.w().i2().r(baseName))
        return baseName;
    }
    var deserializationNamesMap_0 = deserializationNamesMap(this.v3v(), descriptor);
    // Inline function 'kotlin.collections.find' call
    var tmp0 = this.w().i2();
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var _iterator__ex2g4s = tmp0.j();
      while (_iterator__ex2g4s.k()) {
        var element = _iterator__ex2g4s.l();
        if (deserializationNamesMap_0.h2(element) === index) {
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
    var fallbackName = strategy == null ? null : strategy.t3y(descriptor, index, baseName);
    return fallbackName == null ? baseName : fallbackName;
  };
  protoOf(JsonTreeDecoder).g42 = function (tag) {
    return getValue(this.w(), tag);
  };
  protoOf(JsonTreeDecoder).f1o = function (descriptor) {
    if (descriptor === this.a43_1) {
      var tmp = this.v3v();
      var tmp1 = this.f42();
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var serialName = this.a43_1.x1l();
      if (!(tmp1 instanceof JsonObject)) {
        var tmp_0 = getKClass(JsonObject).za();
        var tmp_1 = getKClassFromExpression(tmp1).za();
        var tmp$ret$0 = this.j23();
        throw JsonDecodingException_0(-1, 'Expected ' + tmp_0 + ', but had ' + tmp_1 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$0, toString(tmp1));
      }
      return new JsonTreeDecoder(tmp, tmp1, this.c42_1, this.a43_1);
    }
    return protoOf(AbstractJsonTreeDecoder).f1o.call(this, descriptor);
  };
  protoOf(JsonTreeDecoder).g1o = function (descriptor) {
    var tmp;
    if (this.d42_1.f3v_1) {
      tmp = true;
    } else {
      var tmp_0 = descriptor.j1m();
      tmp = tmp_0 instanceof PolymorphicKind;
    }
    if (tmp)
      return Unit_instance;
    var strategy = namingStrategy(descriptor, this.v3v());
    var tmp_1;
    if (strategy == null && !this.d42_1.p3v_1) {
      tmp_1 = jsonCachedSerialNames(descriptor);
    } else if (!(strategy == null)) {
      tmp_1 = deserializationNamesMap(this.v3v(), descriptor).i2();
    } else {
      var tmp_2 = jsonCachedSerialNames(descriptor);
      var tmp0_safe_receiver = get_schemaCache(this.v3v()).f41(descriptor, get_JsonDeserializationNamesKey());
      // Inline function 'kotlin.collections.orEmpty' call
      var tmp0_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.i2();
      var tmp$ret$0 = tmp0_elvis_lhs == null ? emptySet() : tmp0_elvis_lhs;
      tmp_1 = plus_0(tmp_2, tmp$ret$0);
    }
    var names = tmp_1;
    var _iterator__ex2g4s = this.w().i2().j();
    while (_iterator__ex2g4s.k()) {
      var key = _iterator__ex2g4s.l();
      if (!names.r(key) && !(key === this.c42_1)) {
        throw UnknownKeyException(key, this.w().toString());
      }
    }
  };
  function JsonTreeListDecoder(json, value) {
    AbstractJsonTreeDecoder.call(this, json, value);
    this.j43_1 = value;
    this.k43_1 = this.j43_1.m();
    this.l43_1 = -1;
  }
  protoOf(JsonTreeListDecoder).w = function () {
    return this.j43_1;
  };
  protoOf(JsonTreeListDecoder).i22 = function (descriptor, index) {
    return index.toString();
  };
  protoOf(JsonTreeListDecoder).g42 = function (tag) {
    return this.j43_1.o(toInt(tag));
  };
  protoOf(JsonTreeListDecoder).w1o = function (descriptor) {
    while (this.l43_1 < (this.k43_1 - 1 | 0)) {
      this.l43_1 = this.l43_1 + 1 | 0;
      return this.l43_1;
    }
    return -1;
  };
  function JsonPrimitiveDecoder(json, value, polymorphicDiscriminator) {
    polymorphicDiscriminator = polymorphicDiscriminator === VOID ? null : polymorphicDiscriminator;
    AbstractJsonTreeDecoder.call(this, json, value, polymorphicDiscriminator);
    this.s43_1 = value;
    this.d23('primitive');
  }
  protoOf(JsonPrimitiveDecoder).w = function () {
    return this.s43_1;
  };
  protoOf(JsonPrimitiveDecoder).w1o = function (descriptor) {
    return 0;
  };
  protoOf(JsonPrimitiveDecoder).g42 = function (tag) {
    // Inline function 'kotlin.require' call
    if (!(tag === 'primitive')) {
      var message = "This input can only handle primitives with 'primitive' tag";
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return this.s43_1;
  };
  function JsonTreeMapDecoder(json, value) {
    JsonTreeDecoder.call(this, json, value);
    this.d44_1 = value;
    this.e44_1 = toList(this.d44_1.i2());
    this.f44_1 = imul(this.e44_1.m(), 2);
    this.g44_1 = -1;
  }
  protoOf(JsonTreeMapDecoder).w = function () {
    return this.d44_1;
  };
  protoOf(JsonTreeMapDecoder).i22 = function (descriptor, index) {
    var i = index / 2 | 0;
    return this.e44_1.o(i);
  };
  protoOf(JsonTreeMapDecoder).w1o = function (descriptor) {
    while (this.g44_1 < (this.f44_1 - 1 | 0)) {
      this.g44_1 = this.g44_1 + 1 | 0;
      return this.g44_1;
    }
    return -1;
  };
  protoOf(JsonTreeMapDecoder).g42 = function (tag) {
    return (this.g44_1 % 2 | 0) === 0 ? JsonPrimitive_2(tag) : getValue(this.d44_1, tag);
  };
  protoOf(JsonTreeMapDecoder).g1o = function (descriptor) {
  };
  function readPolymorphicJson(_this__u8e3s4, discriminator, element, deserializer) {
    return (new JsonTreeDecoder(_this__u8e3s4, element, discriminator, deserializer.w1k())).e1o(deserializer);
  }
  function writeJson(json, value, serializer) {
    var result = {_v: null};
    var encoder = new JsonTreeEncoder(json, writeJson$lambda(result));
    encoder.x1p(serializer, value);
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
    tmp.t44_1 = LinkedHashMap_init_$Create$();
  }
  protoOf(JsonTreeEncoder).u44 = function (key, element) {
    // Inline function 'kotlin.collections.set' call
    this.t44_1.k2(key, element);
  };
  protoOf(JsonTreeEncoder).y1p = function (descriptor, index, serializer, value) {
    if (!(value == null) || this.k44_1.j3v_1) {
      protoOf(AbstractJsonTreeEncoder).y1p.call(this, descriptor, index, serializer, value);
    }
  };
  protoOf(JsonTreeEncoder).v44 = function () {
    return new JsonObject(this.t44_1);
  };
  function inlineUnsignedNumberEncoder($this, tag) {
    return new AbstractJsonTreeEncoder$inlineUnsignedNumberEncoder$1($this, tag);
  }
  function inlineUnquotedLiteralEncoder($this, tag, inlineDescriptor) {
    return new AbstractJsonTreeEncoder$inlineUnquotedLiteralEncoder$1($this, tag, inlineDescriptor);
  }
  function AbstractJsonTreeEncoder$inlineUnsignedNumberEncoder$1(this$0, $tag) {
    this.k45_1 = this$0;
    this.l45_1 = $tag;
    AbstractEncoder.call(this);
    this.j45_1 = this$0.i44_1.u1o();
  }
  protoOf(AbstractJsonTreeEncoder$inlineUnsignedNumberEncoder$1).u1o = function () {
    return this.j45_1;
  };
  protoOf(AbstractJsonTreeEncoder$inlineUnsignedNumberEncoder$1).m45 = function (s) {
    return this.k45_1.u44(this.l45_1, new JsonLiteral(s, false));
  };
  protoOf(AbstractJsonTreeEncoder$inlineUnsignedNumberEncoder$1).e1p = function (value) {
    // Inline function 'kotlin.toUInt' call
    var tmp$ret$0 = _UInt___init__impl__l7qpdl(value);
    return this.m45(UInt__toString_impl_dbgl21(tmp$ret$0));
  };
  protoOf(AbstractJsonTreeEncoder$inlineUnsignedNumberEncoder$1).f1p = function (value) {
    // Inline function 'kotlin.toULong' call
    var tmp$ret$0 = _ULong___init__impl__c78o9k(value);
    return this.m45(ULong__toString_impl_f9au7k(tmp$ret$0));
  };
  protoOf(AbstractJsonTreeEncoder$inlineUnsignedNumberEncoder$1).c1p = function (value) {
    // Inline function 'kotlin.toUByte' call
    var tmp$ret$0 = _UByte___init__impl__g9hnc4(value);
    return this.m45(UByte__toString_impl_v72jg(tmp$ret$0));
  };
  protoOf(AbstractJsonTreeEncoder$inlineUnsignedNumberEncoder$1).d1p = function (value) {
    // Inline function 'kotlin.toUShort' call
    var tmp$ret$0 = _UShort___init__impl__jigrne(value);
    return this.m45(UShort__toString_impl_edaoee(tmp$ret$0));
  };
  function AbstractJsonTreeEncoder$inlineUnquotedLiteralEncoder$1(this$0, $tag, $inlineDescriptor) {
    this.n45_1 = this$0;
    this.o45_1 = $tag;
    this.p45_1 = $inlineDescriptor;
    AbstractEncoder.call(this);
  }
  protoOf(AbstractJsonTreeEncoder$inlineUnquotedLiteralEncoder$1).u1o = function () {
    return this.n45_1.i44_1.u1o();
  };
  protoOf(AbstractJsonTreeEncoder$inlineUnquotedLiteralEncoder$1).j1p = function (value) {
    return this.n45_1.u44(this.o45_1, new JsonLiteral(value, false, this.p45_1));
  };
  function AbstractJsonTreeEncoder$beginStructure$lambda(this$0) {
    return function (node) {
      this$0.u44(this$0.c23(), node);
      return Unit_instance;
    };
  }
  function AbstractJsonTreeEncoder(json, nodeConsumer) {
    NamedValueEncoder.call(this);
    this.i44_1 = json;
    this.j44_1 = nodeConsumer;
    this.k44_1 = this.i44_1.o3t_1;
    this.l44_1 = null;
    this.m44_1 = null;
  }
  protoOf(AbstractJsonTreeEncoder).v3v = function () {
    return this.i44_1;
  };
  protoOf(AbstractJsonTreeEncoder).u1o = function () {
    return this.i44_1.u1o();
  };
  protoOf(AbstractJsonTreeEncoder).i22 = function (descriptor, index) {
    return getJsonElementName(descriptor, this.i44_1, index);
  };
  protoOf(AbstractJsonTreeEncoder).c1q = function (descriptor, index) {
    return this.k44_1.e3v_1;
  };
  protoOf(AbstractJsonTreeEncoder).m22 = function (parentName, childName) {
    return childName;
  };
  protoOf(AbstractJsonTreeEncoder).a1q = function () {
  };
  protoOf(AbstractJsonTreeEncoder).a1p = function () {
    var tmp0_elvis_lhs = this.l22();
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return this.j44_1(JsonNull_getInstance());
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var tag = tmp;
    this.w44(tag);
  };
  protoOf(AbstractJsonTreeEncoder).w44 = function (tag) {
    return this.u44(tag, JsonNull_getInstance());
  };
  protoOf(AbstractJsonTreeEncoder).p22 = function (tag) {
    return this.w44((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeEncoder).x44 = function (tag, value) {
    return this.u44(tag, JsonPrimitive_1(value));
  };
  protoOf(AbstractJsonTreeEncoder).q22 = function (tag, value) {
    return this.x44((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), value);
  };
  protoOf(AbstractJsonTreeEncoder).y44 = function (tag, value) {
    return this.u44(tag, JsonPrimitive_1(value));
  };
  protoOf(AbstractJsonTreeEncoder).r22 = function (tag, value) {
    return this.y44((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), value);
  };
  protoOf(AbstractJsonTreeEncoder).z44 = function (tag, value) {
    return this.u44(tag, JsonPrimitive_1(value));
  };
  protoOf(AbstractJsonTreeEncoder).s22 = function (tag, value) {
    return this.z44((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), value);
  };
  protoOf(AbstractJsonTreeEncoder).a45 = function (tag, value) {
    return this.u44(tag, JsonPrimitive_1(value));
  };
  protoOf(AbstractJsonTreeEncoder).t22 = function (tag, value) {
    return this.a45((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), value);
  };
  protoOf(AbstractJsonTreeEncoder).b45 = function (tag, value) {
    this.u44(tag, JsonPrimitive_1(value));
    if (!this.k44_1.o3v_1 && !isFinite(value)) {
      throw InvalidFloatingPointEncoded(value, tag, toString(this.v44()));
    }
  };
  protoOf(AbstractJsonTreeEncoder).u22 = function (tag, value) {
    return this.b45((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), value);
  };
  protoOf(AbstractJsonTreeEncoder).x1p = function (serializer, value) {
    if (!(this.l22() == null) || !get_requiresTopLevelTag(carrierDescriptor(serializer.w1k(), this.u1o()))) {
      $l$block: {
        // Inline function 'kotlinx.serialization.json.internal.encodePolymorphically' call
        if (this.v3v().o3t_1.m3v_1) {
          serializer.x1k(this, value);
          break $l$block;
        }
        var isPolymorphicSerializer = serializer instanceof AbstractPolymorphicSerializer;
        var tmp;
        if (isPolymorphicSerializer) {
          tmp = !this.v3v().o3t_1.u3v_1.equals(ClassDiscriminatorMode_NONE_getInstance());
        } else {
          var tmp_0;
          switch (this.v3v().o3t_1.u3v_1.o2_1) {
            case 0:
            case 2:
              tmp_0 = false;
              break;
            case 1:
              // Inline function 'kotlin.let' call

              var it = serializer.w1k().j1m();
              tmp_0 = equals(it, CLASS_getInstance()) || equals(it, OBJECT_getInstance());
              break;
            default:
              noWhenBranchMatchedException();
              break;
          }
          tmp = tmp_0;
        }
        var needDiscriminator = tmp;
        var baseClassDiscriminator = needDiscriminator ? classDiscriminator(serializer.w1k(), this.v3v()) : null;
        var tmp_1;
        if (isPolymorphicSerializer) {
          var casted = serializer instanceof AbstractPolymorphicSerializer ? serializer : THROW_CCE();
          $l$block_0: {
            // Inline function 'kotlin.requireNotNull' call
            if (value == null) {
              var message = 'Value for serializer ' + toString(serializer.w1k()) + ' should always be non-null. Please report issue to the kotlinx.serialization tracker.';
              throw IllegalArgumentException_init_$Create$(toString(message));
            } else {
              break $l$block_0;
            }
          }
          var actual = findPolymorphicSerializer_0(casted, this, value);
          if (!(baseClassDiscriminator == null)) {
            access$validateIfSealed$tPolymorphicKt(serializer, actual, baseClassDiscriminator);
          }
          checkKind(actual.w1k().j1m());
          tmp_1 = isInterface(actual, SerializationStrategy) ? actual : THROW_CCE();
        } else {
          tmp_1 = serializer;
        }
        var actualSerializer = tmp_1;
        if (!(baseClassDiscriminator == null)) {
          var serialName = actualSerializer.w1k().x1l();
          this.l44_1 = baseClassDiscriminator;
          this.m44_1 = serialName;
        }
        actualSerializer.x1k(this, value);
      }
    } else {
      // Inline function 'kotlin.apply' call
      (new JsonPrimitiveEncoder(this.i44_1, this.j44_1)).x1p(serializer, value);
    }
  };
  protoOf(AbstractJsonTreeEncoder).c45 = function (tag, value) {
    this.u44(tag, JsonPrimitive_1(value));
    if (!this.k44_1.o3v_1 && !isFinite_0(value)) {
      throw InvalidFloatingPointEncoded(value, tag, toString(this.v44()));
    }
  };
  protoOf(AbstractJsonTreeEncoder).v22 = function (tag, value) {
    return this.c45((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), value);
  };
  protoOf(AbstractJsonTreeEncoder).d45 = function (tag, value) {
    return this.u44(tag, JsonPrimitive_0(value));
  };
  protoOf(AbstractJsonTreeEncoder).w22 = function (tag, value) {
    return this.d45((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), value);
  };
  protoOf(AbstractJsonTreeEncoder).e45 = function (tag, value) {
    return this.u44(tag, JsonPrimitive_2(toString_1(value)));
  };
  protoOf(AbstractJsonTreeEncoder).x22 = function (tag, value) {
    return this.e45((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), value);
  };
  protoOf(AbstractJsonTreeEncoder).f45 = function (tag, value) {
    return this.u44(tag, JsonPrimitive_2(value));
  };
  protoOf(AbstractJsonTreeEncoder).y22 = function (tag, value) {
    return this.f45((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), value);
  };
  protoOf(AbstractJsonTreeEncoder).g45 = function (tag, enumDescriptor, ordinal) {
    return this.u44(tag, JsonPrimitive_2(enumDescriptor.n1m(ordinal)));
  };
  protoOf(AbstractJsonTreeEncoder).z22 = function (tag, enumDescriptor, ordinal) {
    return this.g45((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), enumDescriptor, ordinal);
  };
  protoOf(AbstractJsonTreeEncoder).h45 = function (tag, value) {
    this.u44(tag, JsonPrimitive_2(toString(value)));
  };
  protoOf(AbstractJsonTreeEncoder).n22 = function (tag, value) {
    return this.h45((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), value);
  };
  protoOf(AbstractJsonTreeEncoder).i45 = function (tag, inlineDescriptor) {
    return get_isUnsignedNumber(inlineDescriptor) ? inlineUnsignedNumberEncoder(this, tag) : get_isUnquotedLiteral(inlineDescriptor) ? inlineUnquotedLiteralEncoder(this, tag, inlineDescriptor) : protoOf(NamedValueEncoder).a23.call(this, tag, inlineDescriptor);
  };
  protoOf(AbstractJsonTreeEncoder).a23 = function (tag, inlineDescriptor) {
    return this.i45((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), inlineDescriptor);
  };
  protoOf(AbstractJsonTreeEncoder).l1p = function (descriptor) {
    var tmp;
    if (!(this.l22() == null)) {
      if (!(this.l44_1 == null))
        this.m44_1 = descriptor.x1l();
      tmp = protoOf(NamedValueEncoder).l1p.call(this, descriptor);
    } else {
      tmp = (new JsonPrimitiveEncoder(this.i44_1, this.j44_1)).l1p(descriptor);
    }
    return tmp;
  };
  protoOf(AbstractJsonTreeEncoder).f1o = function (descriptor) {
    var tmp;
    if (this.l22() == null) {
      tmp = this.j44_1;
    } else {
      tmp = AbstractJsonTreeEncoder$beginStructure$lambda(this);
    }
    var consumer = tmp;
    var tmp0_subject = descriptor.j1m();
    var tmp_0;
    var tmp_1;
    if (equals(tmp0_subject, LIST_getInstance())) {
      tmp_1 = true;
    } else {
      tmp_1 = tmp0_subject instanceof PolymorphicKind;
    }
    if (tmp_1) {
      tmp_0 = new JsonTreeListEncoder(this.i44_1, consumer);
    } else {
      if (equals(tmp0_subject, MAP_getInstance())) {
        // Inline function 'kotlinx.serialization.json.internal.selectMapMode' call
        var this_0 = this.i44_1;
        var keyDescriptor = carrierDescriptor(descriptor.q1m(0), this_0.u1o());
        var keyKind = keyDescriptor.j1m();
        var tmp_2;
        var tmp_3;
        if (keyKind instanceof PrimitiveKind) {
          tmp_3 = true;
        } else {
          tmp_3 = equals(keyKind, ENUM_getInstance());
        }
        if (tmp_3) {
          tmp_2 = new JsonTreeMapEncoder(this.i44_1, consumer);
        } else {
          if (this_0.o3t_1.h3v_1) {
            tmp_2 = new JsonTreeListEncoder(this.i44_1, consumer);
          } else {
            throw InvalidKeyKindException(keyDescriptor);
          }
        }
        tmp_0 = tmp_2;
      } else {
        tmp_0 = new JsonTreeEncoder(this.i44_1, consumer);
      }
    }
    var encoder = tmp_0;
    var discriminator = this.l44_1;
    if (!(discriminator == null)) {
      if (encoder instanceof JsonTreeMapEncoder) {
        encoder.u44('key', JsonPrimitive_2(discriminator));
        var tmp1_elvis_lhs = this.m44_1;
        encoder.u44('value', JsonPrimitive_2(tmp1_elvis_lhs == null ? descriptor.x1l() : tmp1_elvis_lhs));
      } else {
        var tmp2_elvis_lhs = this.m44_1;
        encoder.u44(discriminator, JsonPrimitive_2(tmp2_elvis_lhs == null ? descriptor.x1l() : tmp2_elvis_lhs));
      }
      this.l44_1 = null;
      this.m44_1 = null;
    }
    return encoder;
  };
  protoOf(AbstractJsonTreeEncoder).b23 = function (descriptor) {
    this.j44_1(this.v44());
  };
  function get_requiresTopLevelTag(_this__u8e3s4) {
    var tmp;
    var tmp_0 = _this__u8e3s4.j1m();
    if (tmp_0 instanceof PrimitiveKind) {
      tmp = true;
    } else {
      tmp = _this__u8e3s4.j1m() === ENUM_getInstance();
    }
    return tmp;
  }
  function JsonPrimitiveEncoder(json, nodeConsumer) {
    AbstractJsonTreeEncoder.call(this, json, nodeConsumer);
    this.f46_1 = null;
    this.d23('primitive');
  }
  protoOf(JsonPrimitiveEncoder).u44 = function (key, element) {
    // Inline function 'kotlin.require' call
    if (!(key === 'primitive')) {
      var message = "This output can only consume primitives with 'primitive' tag";
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    // Inline function 'kotlin.require' call
    if (!(this.f46_1 == null)) {
      var message_0 = 'Primitive element was already recorded. Does call to .encodeXxx happen more than once?';
      throw IllegalArgumentException_init_$Create$(toString(message_0));
    }
    this.f46_1 = element;
    this.j44_1(element);
  };
  protoOf(JsonPrimitiveEncoder).v44 = function () {
    var tmp0 = this.f46_1;
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
    tmp.m46_1 = ArrayList_init_$Create$();
  }
  protoOf(JsonTreeListEncoder).i22 = function (descriptor, index) {
    return index.toString();
  };
  protoOf(JsonTreeListEncoder).u44 = function (key, element) {
    var idx = toInt(key);
    this.m46_1.d2(idx, element);
  };
  protoOf(JsonTreeListEncoder).v44 = function () {
    return new JsonArray(this.m46_1);
  };
  function _get_tag__e6h4qf($this) {
    var tmp = $this.x45_1;
    if (!(tmp == null))
      return tmp;
    else {
      throwUninitializedPropertyAccessException('tag');
    }
  }
  function JsonTreeMapEncoder(json, nodeConsumer) {
    JsonTreeEncoder.call(this, json, nodeConsumer);
    this.y45_1 = true;
  }
  protoOf(JsonTreeMapEncoder).u44 = function (key, element) {
    if (this.y45_1) {
      var tmp = this;
      var tmp_0;
      if (element instanceof JsonPrimitive) {
        tmp_0 = element.y3v();
      } else {
        if (element instanceof JsonObject) {
          throw InvalidKeyKindException(JsonObjectSerializer_getInstance().q3w_1);
        } else {
          if (element instanceof JsonArray) {
            throw InvalidKeyKindException(JsonArraySerializer_getInstance().v3w_1);
          } else {
            noWhenBranchMatchedException();
          }
        }
      }
      tmp.x45_1 = tmp_0;
      this.y45_1 = false;
    } else {
      var tmp0 = this.t44_1;
      // Inline function 'kotlin.collections.set' call
      var key_0 = _get_tag__e6h4qf(this);
      tmp0.k2(key_0, element);
      this.y45_1 = true;
    }
  };
  protoOf(JsonTreeMapEncoder).v44 = function () {
    return new JsonObject(this.t44_1);
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
    this.s41_1 = begin;
    this.t41_1 = end;
  }
  function switchMode(_this__u8e3s4, desc) {
    var tmp0_subject = desc.j1m();
    var tmp;
    if (tmp0_subject instanceof PolymorphicKind) {
      tmp = WriteMode_POLY_OBJ_getInstance();
    } else {
      if (equals(tmp0_subject, LIST_getInstance())) {
        tmp = WriteMode_LIST_getInstance();
      } else {
        if (equals(tmp0_subject, MAP_getInstance())) {
          // Inline function 'kotlinx.serialization.json.internal.selectMapMode' call
          var keyDescriptor = carrierDescriptor(desc.q1m(0), _this__u8e3s4.u1o());
          var keyKind = keyDescriptor.j1m();
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
            if (_this__u8e3s4.o3t_1.h3v_1) {
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
    if (equals(_this__u8e3s4.j1m(), CONTEXTUAL_getInstance())) {
      var tmp0_safe_receiver = getContextualDescriptor(module_0, _this__u8e3s4);
      var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : carrierDescriptor(tmp0_safe_receiver, module_0);
      tmp = tmp1_elvis_lhs == null ? _this__u8e3s4 : tmp1_elvis_lhs;
    } else if (_this__u8e3s4.k1m()) {
      tmp = carrierDescriptor(_this__u8e3s4.q1m(0), module_0);
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
    $this.n46(lastPosition, current);
    return appendEsc($this, current + 1 | 0);
  }
  function decodedString($this, lastPosition, currentPosition) {
    $this.n46(lastPosition, currentPosition);
    var result = $this.j3u_1.toString();
    $this.j3u_1.vc(0);
    return result;
  }
  function takePeeked($this) {
    // Inline function 'kotlin.also' call
    var this_0 = ensureNotNull($this.i3u_1);
    $this.i3u_1 = null;
    return this_0;
  }
  function wasUnquotedString($this) {
    return !(charSequenceGet($this.o46(), $this.g3u_1 - 1 | 0) === _Char___init__impl__6a9atx(34));
  }
  function appendEsc($this, startPosition) {
    var currentPosition = startPosition;
    currentPosition = $this.p46(currentPosition);
    if (currentPosition === -1) {
      $this.p3y('Expected escape sequence to continue, got EOF');
    }
    var tmp = $this.o46();
    var _unary__edvuaz = currentPosition;
    currentPosition = _unary__edvuaz + 1 | 0;
    var currentChar = charSequenceGet(tmp, _unary__edvuaz);
    if (currentChar === _Char___init__impl__6a9atx(117)) {
      return appendHex($this, $this.o46(), currentPosition);
    }
    // Inline function 'kotlin.code' call
    var tmp$ret$0 = Char__toInt_impl_vasixd(currentChar);
    var c = escapeToChar(tmp$ret$0);
    if (c === _Char___init__impl__6a9atx(0)) {
      $this.p3y("Invalid escaped char '" + toString_1(currentChar) + "'");
    }
    $this.j3u_1.f8(c);
    return currentPosition;
  }
  function appendHex($this, source, startPos) {
    if ((startPos + 4 | 0) >= charSequenceLength(source)) {
      $this.g3u_1 = startPos;
      $this.q46();
      if (($this.g3u_1 + 4 | 0) >= charSequenceLength(source)) {
        $this.p3y('Unexpected EOF during unicode escape');
      }
      return appendHex($this, source, $this.g3u_1);
    }
    $this.j3u_1.f8(numberToChar((((fromHexChar($this, source, startPos) << 12) + (fromHexChar($this, source, startPos + 1 | 0) << 8) | 0) + (fromHexChar($this, source, startPos + 2 | 0) << 4) | 0) + fromHexChar($this, source, startPos + 3 | 0) | 0));
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
      $this.p3y("Invalid toHexChar char '" + toString_1(character) + "' in unicode escape");
    }
    return tmp;
  }
  function consumeBoolean2($this, start) {
    var current = $this.p46(start);
    if (current >= charSequenceLength($this.o46()) || current === -1) {
      $this.p3y('EOF');
    }
    var tmp = $this.o46();
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
        $this.p3y("Expected valid boolean literal prefix, but had '" + $this.u3z() + "'");
      }
    }
    return tmp_0;
  }
  function consumeBooleanLiteral($this, literalSuffix, current) {
    if ((charSequenceLength($this.o46()) - current | 0) < literalSuffix.length) {
      $this.p3y('Unexpected end of boolean literal');
    }
    var inductionVariable = 0;
    var last = charSequenceLength(literalSuffix) - 1 | 0;
    if (inductionVariable <= last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var expected = charSequenceGet(literalSuffix, i);
        var actual = charSequenceGet($this.o46(), current + i | 0);
        // Inline function 'kotlin.code' call
        var tmp = Char__toInt_impl_vasixd(expected);
        // Inline function 'kotlin.code' call
        if (!(tmp === (Char__toInt_impl_vasixd(actual) | 32))) {
          $this.p3y("Expected valid boolean literal prefix, but had '" + $this.u3z() + "'");
        }
      }
       while (inductionVariable <= last);
    $this.g3u_1 = current + literalSuffix.length | 0;
  }
  function consumeNumericLiteral$calculateExponent(exponentAccumulator, isExponentPositive) {
    var tmp;
    switch (isExponentPositive) {
      case false:
        // Inline function 'kotlin.math.pow' call

        var x = -exponentAccumulator.l3();
        tmp = Math.pow(10.0, x);
        break;
      case true:
        // Inline function 'kotlin.math.pow' call

        var x_0 = exponentAccumulator.l3();
        tmp = Math.pow(10.0, x_0);
        break;
      default:
        noWhenBranchMatchedException();
        break;
    }
    return tmp;
  }
  function AbstractJsonLexer() {
    this.g3u_1 = 0;
    this.h3u_1 = new JsonPath();
    this.i3u_1 = null;
    this.j3u_1 = StringBuilder_init_$Create$();
  }
  protoOf(AbstractJsonLexer).q46 = function () {
  };
  protoOf(AbstractJsonLexer).i41 = function () {
    var current = this.r46();
    var source = this.o46();
    if (current >= charSequenceLength(source) || current === -1)
      return false;
    if (charSequenceGet(source, current) === _Char___init__impl__6a9atx(44)) {
      this.g3u_1 = this.g3u_1 + 1 | 0;
      return true;
    }
    return false;
  };
  protoOf(AbstractJsonLexer).s46 = function (c) {
    return c === _Char___init__impl__6a9atx(125) || c === _Char___init__impl__6a9atx(93) || (c === _Char___init__impl__6a9atx(58) || c === _Char___init__impl__6a9atx(44)) ? false : true;
  };
  protoOf(AbstractJsonLexer).k3u = function () {
    var nextToken = this.w3z();
    if (!(nextToken === 10)) {
      this.p3y('Expected EOF after parsing, but had ' + toString_1(charSequenceGet(this.o46(), this.g3u_1 - 1 | 0)) + ' instead');
    }
  };
  protoOf(AbstractJsonLexer).q3z = function (expected) {
    var token = this.w3z();
    if (!(token === expected)) {
      this.t46(expected);
    }
    return token;
  };
  protoOf(AbstractJsonLexer).u46 = function (expected) {
    if (this.g3u_1 > 0 && expected === _Char___init__impl__6a9atx(34)) {
      var tmp$ret$1;
      $l$block: {
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.withPositionRollback' call
        var snapshot = this.g3u_1;
        try {
          this.g3u_1 = this.g3u_1 - 1 | 0;
          tmp$ret$1 = this.u3z();
          break $l$block;
        }finally {
          this.g3u_1 = snapshot;
        }
      }
      var inputLiteral = tmp$ret$1;
      if (inputLiteral === 'null') {
        this.o3y("Expected string literal but 'null' literal was found", this.g3u_1 - 1 | 0, "Use 'coerceInputValues = true' in 'Json {}' builder to coerce nulls if property has a default value.");
      }
    }
    this.t46(charToTokenClass(expected));
  };
  protoOf(AbstractJsonLexer).v46 = function (expectedToken, wasConsumed) {
    var expected = tokenDescription(expectedToken);
    var position = wasConsumed ? this.g3u_1 - 1 | 0 : this.g3u_1;
    var s = this.g3u_1 === charSequenceLength(this.o46()) || position < 0 ? 'EOF' : toString_1(charSequenceGet(this.o46(), position));
    this.p3y('Expected ' + expected + ", but had '" + s + "' instead", position);
  };
  protoOf(AbstractJsonLexer).t46 = function (expectedToken, wasConsumed, $super) {
    wasConsumed = wasConsumed === VOID ? true : wasConsumed;
    return $super === VOID ? this.v46(expectedToken, wasConsumed) : $super.v46.call(this, expectedToken, wasConsumed);
  };
  protoOf(AbstractJsonLexer).r3z = function () {
    var source = this.o46();
    var cpos = this.g3u_1;
    $l$loop_0: while (true) {
      cpos = this.p46(cpos);
      if (cpos === -1)
        break $l$loop_0;
      var ch = charSequenceGet(source, cpos);
      if (ch === _Char___init__impl__6a9atx(32) || ch === _Char___init__impl__6a9atx(10) || ch === _Char___init__impl__6a9atx(13) || ch === _Char___init__impl__6a9atx(9)) {
        cpos = cpos + 1 | 0;
        continue $l$loop_0;
      }
      this.g3u_1 = cpos;
      return charToTokenClass(ch);
    }
    this.g3u_1 = cpos;
    return 10;
  };
  protoOf(AbstractJsonLexer).j41 = function (doConsume) {
    var current = this.r46();
    current = this.p46(current);
    var len = charSequenceLength(this.o46()) - current | 0;
    if (len < 4 || current === -1)
      return false;
    var inductionVariable = 0;
    if (inductionVariable <= 3)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        if (!(charSequenceGet('null', i) === charSequenceGet(this.o46(), current + i | 0)))
          return false;
      }
       while (inductionVariable <= 3);
    if (len > 4 && charToTokenClass(charSequenceGet(this.o46(), current + 4 | 0)) === 0)
      return false;
    if (doConsume) {
      this.g3u_1 = current + 4 | 0;
    }
    return true;
  };
  protoOf(AbstractJsonLexer).u41 = function (doConsume, $super) {
    doConsume = doConsume === VOID ? true : doConsume;
    return $super === VOID ? this.j41(doConsume) : $super.j41.call(this, doConsume);
  };
  protoOf(AbstractJsonLexer).k41 = function (isLenient) {
    var token = this.r3z();
    var tmp;
    if (isLenient) {
      if (!(token === 1) && !(token === 0))
        return null;
      tmp = this.u3z();
    } else {
      if (!(token === 1))
        return null;
      tmp = this.t3z();
    }
    var string = tmp;
    this.i3u_1 = string;
    return string;
  };
  protoOf(AbstractJsonLexer).w46 = function () {
    this.i3u_1 = null;
  };
  protoOf(AbstractJsonLexer).x46 = function (startPos, endPos) {
    // Inline function 'kotlin.text.substring' call
    var this_0 = this.o46();
    return toString(charSequenceSubSequence(this_0, startPos, endPos));
  };
  protoOf(AbstractJsonLexer).t3z = function () {
    if (!(this.i3u_1 == null)) {
      return takePeeked(this);
    }
    return this.n41();
  };
  protoOf(AbstractJsonLexer).consumeString2 = function (source, startPosition, current) {
    var currentPosition = current;
    var lastPosition = startPosition;
    var char = charSequenceGet(source, currentPosition);
    var usedAppend = false;
    while (!(char === _Char___init__impl__6a9atx(34))) {
      if (char === _Char___init__impl__6a9atx(92)) {
        usedAppend = true;
        currentPosition = this.p46(appendEscape(this, lastPosition, currentPosition));
        if (currentPosition === -1) {
          this.p3y('Unexpected EOF', currentPosition);
        }
        lastPosition = currentPosition;
      } else {
        currentPosition = currentPosition + 1 | 0;
        if (currentPosition >= charSequenceLength(source)) {
          usedAppend = true;
          this.n46(lastPosition, currentPosition);
          currentPosition = this.p46(currentPosition);
          if (currentPosition === -1) {
            this.p3y('Unexpected EOF', currentPosition);
          }
          lastPosition = currentPosition;
        }
      }
      char = charSequenceGet(source, currentPosition);
    }
    var tmp;
    if (!usedAppend) {
      tmp = this.x46(lastPosition, currentPosition);
    } else {
      tmp = decodedString(this, lastPosition, currentPosition);
    }
    var string = tmp;
    this.g3u_1 = currentPosition + 1 | 0;
    return string;
  };
  protoOf(AbstractJsonLexer).o41 = function () {
    var result = this.u3z();
    if (result === 'null' && wasUnquotedString(this)) {
      this.p3y("Unexpected 'null' value instead of string literal");
    }
    return result;
  };
  protoOf(AbstractJsonLexer).u3z = function () {
    if (!(this.i3u_1 == null)) {
      return takePeeked(this);
    }
    var current = this.r46();
    if (current >= charSequenceLength(this.o46()) || current === -1) {
      this.p3y('EOF', current);
    }
    var token = charToTokenClass(charSequenceGet(this.o46(), current));
    if (token === 1) {
      return this.t3z();
    }
    if (!(token === 0)) {
      this.p3y('Expected beginning of the string, but got ' + toString_1(charSequenceGet(this.o46(), current)));
    }
    var usedAppend = false;
    while (charToTokenClass(charSequenceGet(this.o46(), current)) === 0) {
      current = current + 1 | 0;
      if (current >= charSequenceLength(this.o46())) {
        usedAppend = true;
        this.n46(this.g3u_1, current);
        var eof = this.p46(current);
        if (eof === -1) {
          this.g3u_1 = current;
          return decodedString(this, 0, 0);
        } else {
          current = eof;
        }
      }
    }
    var tmp;
    if (!usedAppend) {
      tmp = this.x46(this.g3u_1, current);
    } else {
      tmp = decodedString(this, this.g3u_1, current);
    }
    var result = tmp;
    this.g3u_1 = current;
    return result;
  };
  protoOf(AbstractJsonLexer).n46 = function (fromIndex, toIndex) {
    this.j3u_1.pc(this.o46(), fromIndex, toIndex);
  };
  protoOf(AbstractJsonLexer).m41 = function (allowLenientStrings) {
    // Inline function 'kotlin.collections.mutableListOf' call
    var tokenStack = ArrayList_init_$Create$();
    var lastToken = this.r3z();
    if (!(lastToken === 8) && !(lastToken === 6)) {
      this.u3z();
      return Unit_instance;
    }
    $l$loop: while (true) {
      lastToken = this.r3z();
      if (lastToken === 1) {
        if (allowLenientStrings)
          this.u3z();
        else
          this.n41();
        continue $l$loop;
      }
      var tmp0_subject = lastToken;
      if (tmp0_subject === 8 || tmp0_subject === 6) {
        tokenStack.e(lastToken);
      } else if (tmp0_subject === 9) {
        if (!(last(tokenStack) === 8))
          throw JsonDecodingException_0(this.g3u_1, 'found ] instead of } at path: ' + this.h3u_1.toString(), this.o46());
        removeLast(tokenStack);
      } else if (tmp0_subject === 7) {
        if (!(last(tokenStack) === 6))
          throw JsonDecodingException_0(this.g3u_1, 'found } instead of ] at path: ' + this.h3u_1.toString(), this.o46());
        removeLast(tokenStack);
      } else if (tmp0_subject === 10) {
        this.p3y('Unexpected end of input due to malformed JSON during ignoring unknown keys');
      }
      this.w3z();
      if (tokenStack.m() === 0)
        return Unit_instance;
    }
  };
  protoOf(AbstractJsonLexer).toString = function () {
    return "JsonReader(source='" + toString(this.o46()) + "', currentPosition=" + this.g3u_1 + ')';
  };
  protoOf(AbstractJsonLexer).l41 = function (key) {
    var processed = this.x46(0, this.g3u_1);
    var lastIndexOf_0 = lastIndexOf(processed, key);
    this.o3y("Encountered an unknown key '" + key + "'", lastIndexOf_0, "Use 'ignoreUnknownKeys = true' in 'Json {}' builder to ignore unknown keys.");
  };
  protoOf(AbstractJsonLexer).o3y = function (message, position, hint) {
    var tmp;
    // Inline function 'kotlin.text.isEmpty' call
    if (charSequenceLength(hint) === 0) {
      tmp = '';
    } else {
      tmp = '\n' + hint;
    }
    var hintMessage = tmp;
    throw JsonDecodingException_0(position, message + ' at path: ' + this.h3u_1.c3z() + hintMessage, this.o46());
  };
  protoOf(AbstractJsonLexer).p3y = function (message, position, hint, $super) {
    position = position === VOID ? this.g3u_1 : position;
    hint = hint === VOID ? '' : hint;
    return $super === VOID ? this.o3y(message, position, hint) : $super.o3y.call(this, message, position, hint);
  };
  protoOf(AbstractJsonLexer).f3w = function () {
    var current = this.r46();
    current = this.p46(current);
    if (current >= charSequenceLength(this.o46()) || current === -1) {
      this.p3y('EOF');
    }
    var tmp;
    if (charSequenceGet(this.o46(), current) === _Char___init__impl__6a9atx(34)) {
      current = current + 1 | 0;
      if (current === charSequenceLength(this.o46())) {
        this.p3y('EOF');
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
    $l$loop_4: while (!(current === charSequenceLength(this.o46()))) {
      var ch = charSequenceGet(this.o46(), current);
      if ((ch === _Char___init__impl__6a9atx(101) || ch === _Char___init__impl__6a9atx(69)) && !hasExponent) {
        if (current === start) {
          this.p3y('Unexpected symbol ' + toString_1(ch) + ' in numeric literal');
        }
        isExponentPositive = true;
        hasExponent = true;
        current = current + 1 | 0;
        continue $l$loop_4;
      }
      if (ch === _Char___init__impl__6a9atx(45) && hasExponent) {
        if (current === start) {
          this.p3y("Unexpected symbol '-' in numeric literal");
        }
        isExponentPositive = false;
        current = current + 1 | 0;
        continue $l$loop_4;
      }
      if (ch === _Char___init__impl__6a9atx(43) && hasExponent) {
        if (current === start) {
          this.p3y("Unexpected symbol '+' in numeric literal");
        }
        isExponentPositive = true;
        current = current + 1 | 0;
        continue $l$loop_4;
      }
      if (ch === _Char___init__impl__6a9atx(45)) {
        if (!(current === start)) {
          this.p3y("Unexpected symbol '-' in numeric literal");
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
        this.p3y("Unexpected symbol '" + toString_1(ch) + "' in numeric literal");
      }
      if (hasExponent) {
        // Inline function 'kotlin.Long.times' call
        // Inline function 'kotlin.Long.plus' call
        exponentAccumulator = exponentAccumulator.w2(toLong(10)).u2(toLong(digit));
        continue $l$loop_4;
      }
      // Inline function 'kotlin.Long.times' call
      // Inline function 'kotlin.Long.minus' call
      accumulator = accumulator.w2(toLong(10)).v2(toLong(digit));
      if (accumulator.b1(new Long(0, 0)) > 0) {
        this.p3y('Numeric value overflow');
      }
    }
    var hasChars = !(current === start);
    if (start === current || (isNegative && start === (current - 1 | 0))) {
      this.p3y('Expected numeric literal');
    }
    if (hasQuotation) {
      if (!hasChars) {
        this.p3y('EOF');
      }
      if (!(charSequenceGet(this.o46(), current) === _Char___init__impl__6a9atx(34))) {
        this.p3y('Expected closing quotation mark');
      }
      current = current + 1 | 0;
    }
    this.g3u_1 = current;
    if (hasExponent) {
      var doubleAccumulator = accumulator.l3() * consumeNumericLiteral$calculateExponent(exponentAccumulator, isExponentPositive);
      if (doubleAccumulator > (new Long(-1, 2147483647)).l3() || doubleAccumulator < (new Long(0, -2147483648)).l3()) {
        this.p3y('Numeric value overflow');
      }
      // Inline function 'kotlin.math.floor' call
      if (!(Math.floor(doubleAccumulator) === doubleAccumulator)) {
        this.p3y("Can't convert " + doubleAccumulator + ' to Long');
      }
      accumulator = numberToLong(doubleAccumulator);
    }
    var tmp_0;
    if (isNegative) {
      tmp_0 = accumulator;
    } else if (!accumulator.equals(new Long(0, -2147483648))) {
      tmp_0 = accumulator.b3();
    } else {
      this.p3y('Numeric value overflow');
    }
    return tmp_0;
  };
  protoOf(AbstractJsonLexer).v41 = function () {
    var current = this.r46();
    if (current === charSequenceLength(this.o46())) {
      this.p3y('EOF');
    }
    var tmp;
    if (charSequenceGet(this.o46(), current) === _Char___init__impl__6a9atx(34)) {
      current = current + 1 | 0;
      tmp = true;
    } else {
      tmp = false;
    }
    var hasQuotation = tmp;
    var result = consumeBoolean2(this, current);
    if (hasQuotation) {
      if (this.g3u_1 === charSequenceLength(this.o46())) {
        this.p3y('EOF');
      }
      if (!(charSequenceGet(this.o46(), this.g3u_1) === _Char___init__impl__6a9atx(34))) {
        this.p3y('Expected closing quotation mark');
      }
      this.g3u_1 = this.g3u_1 + 1 | 0;
    }
    return result;
  };
  function charToTokenClass(c) {
    var tmp;
    // Inline function 'kotlin.code' call
    if (Char__toInt_impl_vasixd(c) < 126) {
      var tmp_0 = CharMappings_getInstance().z46_1;
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
    return c < 117 ? CharMappings_getInstance().y46_1[c] : _Char___init__impl__6a9atx(0);
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
      $this.y46_1[tmp$ret$0] = numberToChar(c);
    }
  }
  function initC2ESC_0($this, c, esc) {
    // Inline function 'kotlin.code' call
    var tmp$ret$0 = Char__toInt_impl_vasixd(c);
    return initC2ESC($this, tmp$ret$0, esc);
  }
  function initC2TC($this, c, cl) {
    $this.z46_1[c] = cl;
  }
  function initC2TC_0($this, c, cl) {
    // Inline function 'kotlin.code' call
    var tmp$ret$0 = Char__toInt_impl_vasixd(c);
    return initC2TC($this, tmp$ret$0, cl);
  }
  function CharMappings() {
    CharMappings_instance = this;
    this.y46_1 = charArray(117);
    this.z46_1 = new Int8Array(126);
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
  protoOf(StringJsonLexerWithComments).w3z = function () {
    var source = this.o46();
    var cpos = this.r46();
    if (cpos >= source.length || cpos === -1)
      return 10;
    this.g3u_1 = cpos + 1 | 0;
    return charToTokenClass(charSequenceGet(source, cpos));
  };
  protoOf(StringJsonLexerWithComments).s3z = function () {
    var current = this.r46();
    if (current >= this.o46().length || current === -1)
      return false;
    return this.s46(charSequenceGet(this.o46(), current));
  };
  protoOf(StringJsonLexerWithComments).h41 = function (expected) {
    var source = this.o46();
    var current = this.r46();
    if (current >= source.length || current === -1) {
      this.g3u_1 = -1;
      this.u46(expected);
    }
    var c = charSequenceGet(source, current);
    this.g3u_1 = current + 1 | 0;
    if (c === expected)
      return Unit_instance;
    else {
      this.u46(expected);
    }
  };
  protoOf(StringJsonLexerWithComments).r3z = function () {
    var source = this.o46();
    var cpos = this.r46();
    if (cpos >= source.length || cpos === -1)
      return 10;
    this.g3u_1 = cpos;
    return charToTokenClass(charSequenceGet(source, cpos));
  };
  protoOf(StringJsonLexerWithComments).r46 = function () {
    var current = this.g3u_1;
    if (current === -1)
      return current;
    var source = this.o46();
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
            this.g3u_1 = source.length;
            this.p3y('Expected end of the block comment: "*/", but had EOF instead');
          } else {
            current = current + 2 | 0;
          }
          continue $l$loop_1;
        }
      }
      break $l$loop_1;
    }
    this.g3u_1 = current;
    return current;
  };
  function StringJsonLexer(source) {
    AbstractJsonLexer.call(this);
    this.j47_1 = source;
  }
  protoOf(StringJsonLexer).o46 = function () {
    return this.j47_1;
  };
  protoOf(StringJsonLexer).p46 = function (position) {
    return position < this.o46().length ? position : -1;
  };
  protoOf(StringJsonLexer).w3z = function () {
    var source = this.o46();
    var cpos = this.g3u_1;
    $l$loop: while (!(cpos === -1) && cpos < source.length) {
      var _unary__edvuaz = cpos;
      cpos = _unary__edvuaz + 1 | 0;
      var c = charSequenceGet(source, _unary__edvuaz);
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
      if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9))
        continue $l$loop;
      this.g3u_1 = cpos;
      return charToTokenClass(c);
    }
    this.g3u_1 = source.length;
    return 10;
  };
  protoOf(StringJsonLexer).s3z = function () {
    var current = this.g3u_1;
    if (current === -1)
      return false;
    var source = this.o46();
    $l$loop: while (current < source.length) {
      var c = charSequenceGet(source, current);
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
      if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9)) {
        current = current + 1 | 0;
        continue $l$loop;
      }
      this.g3u_1 = current;
      return this.s46(c);
    }
    this.g3u_1 = current;
    return false;
  };
  protoOf(StringJsonLexer).r46 = function () {
    var current = this.g3u_1;
    if (current === -1)
      return current;
    var source = this.o46();
    $l$loop: while (current < source.length) {
      var c = charSequenceGet(source, current);
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
      if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9)) {
        current = current + 1 | 0;
      } else {
        break $l$loop;
      }
    }
    this.g3u_1 = current;
    return current;
  };
  protoOf(StringJsonLexer).h41 = function (expected) {
    if (this.g3u_1 === -1) {
      this.u46(expected);
    }
    var source = this.o46();
    var cpos = this.g3u_1;
    $l$loop: while (cpos < source.length) {
      var _unary__edvuaz = cpos;
      cpos = _unary__edvuaz + 1 | 0;
      var c = charSequenceGet(source, _unary__edvuaz);
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
      if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9))
        continue $l$loop;
      this.g3u_1 = cpos;
      if (c === expected)
        return Unit_instance;
      this.u46(expected);
    }
    this.g3u_1 = -1;
    this.u46(expected);
  };
  protoOf(StringJsonLexer).n41 = function () {
    this.h41(_Char___init__impl__6a9atx(34));
    var current = this.g3u_1;
    var closingQuote = indexOf_0(this.o46(), _Char___init__impl__6a9atx(34), current);
    if (closingQuote === -1) {
      this.u3z();
      this.v46(1, false);
    }
    var inductionVariable = current;
    if (inductionVariable < closingQuote)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        if (charSequenceGet(this.o46(), i) === _Char___init__impl__6a9atx(92)) {
          return this.consumeString2(this.o46(), this.g3u_1, i);
        }
      }
       while (inductionVariable < closingQuote);
    this.g3u_1 = closingQuote + 1 | 0;
    // Inline function 'kotlin.text.substring' call
    // Inline function 'kotlin.js.asDynamic' call
    return this.o46().substring(current, closingQuote);
  };
  protoOf(StringJsonLexer).p41 = function (keyToMatch, isLenient) {
    var positionSnapshot = this.g3u_1;
    try {
      if (!(this.w3z() === 6))
        return null;
      var firstKey = this.k41(isLenient);
      if (!(firstKey === keyToMatch))
        return null;
      this.w46();
      if (!(this.w3z() === 5))
        return null;
      return this.k41(isLenient);
    }finally {
      this.g3u_1 = positionSnapshot;
      this.w46();
    }
  };
  function StringJsonLexer_0(json, source) {
    return !json.o3t_1.t3v_1 ? new StringJsonLexer(source) : new StringJsonLexerWithComments(source);
  }
  function get_schemaCache(_this__u8e3s4) {
    return _this__u8e3s4.q3t_1;
  }
  function JsonToStringWriter() {
    this.w3t_1 = StringBuilder_init_$Create$_0(128);
  }
  protoOf(JsonToStringWriter).t3x = function (value) {
    this.w3t_1.tc(value);
  };
  protoOf(JsonToStringWriter).n3x = function (char) {
    this.w3t_1.f8(char);
  };
  protoOf(JsonToStringWriter).p3x = function (text) {
    this.w3t_1.e8(text);
  };
  protoOf(JsonToStringWriter).z3x = function (text) {
    printQuoted(this.w3t_1, text);
  };
  protoOf(JsonToStringWriter).x3t = function () {
    this.w3t_1.wc();
  };
  protoOf(JsonToStringWriter).toString = function () {
    return this.w3t_1.toString();
  };
  function createMapForCache(initialCapacity) {
    return HashMap_init_$Create$(initialCapacity);
  }
  //region block: post-declaration
  protoOf(defer$1).f1m = get_isNullable;
  protoOf(defer$1).k1m = get_isInline;
  protoOf(defer$1).m1m = get_annotations;
  protoOf(PolymorphismValidator).r25 = contextual;
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
  _.$_$.h = JsonElement;
  _.$_$.i = JsonNull;
  _.$_$.j = JsonObjectBuilder;
  _.$_$.k = JsonObject;
  _.$_$.l = JsonPrimitive_2;
  _.$_$.m = JsonPrimitive_1;
  _.$_$.n = JsonPrimitive_0;
  _.$_$.o = JsonPrimitive;
  _.$_$.p = Json_0;
  _.$_$.q = addJsonObject;
  _.$_$.r = add;
  _.$_$.s = get_booleanOrNull;
  _.$_$.t = get_contentOrNull;
  _.$_$.u = get_double;
  _.$_$.v = get_doubleOrNull;
  _.$_$.w = get_floatOrNull;
  _.$_$.x = get_intOrNull;
  _.$_$.y = get_jsonArray;
  _.$_$.z = get_jsonObject;
  _.$_$.a1 = get_jsonPrimitive;
  _.$_$.b1 = get_longOrNull;
  _.$_$.c1 = putJsonArray;
  _.$_$.d1 = putJsonObject;
  _.$_$.e1 = put_1;
  _.$_$.f1 = put;
  _.$_$.g1 = put_0;
  //endregion
  return _;
}));

//# sourceMappingURL=kotlinx-serialization-kotlinx-serialization-json.js.map
