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
  var EmptySerializersModule = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.f2;
  var protoOf = kotlin_kotlin.$_$.xb;
  var initMetadataForObject = kotlin_kotlin.$_$.za;
  var VOID = kotlin_kotlin.$_$.h;
  var Unit_instance = kotlin_kotlin.$_$.f5;
  var initMetadataForClass = kotlin_kotlin.$_$.ta;
  var toString = kotlin_kotlin.$_$.bc;
  var IllegalArgumentException_init_$Create$ = kotlin_kotlin.$_$.u1;
  var charSequenceLength = kotlin_kotlin.$_$.ia;
  var charSequenceGet = kotlin_kotlin.$_$.ha;
  var _Char___init__impl__6a9atx = kotlin_kotlin.$_$.o2;
  var equals = kotlin_kotlin.$_$.ma;
  var toString_0 = kotlin_kotlin.$_$.fh;
  var Enum = kotlin_kotlin.$_$.sf;
  var Decoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.n1;
  var CompositeDecoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.l1;
  var initMetadataForInterface = kotlin_kotlin.$_$.xa;
  var initMetadataForCompanion = kotlin_kotlin.$_$.ua;
  var StringBuilder_init_$Create$ = kotlin_kotlin.$_$.i1;
  var hashCode = kotlin_kotlin.$_$.sa;
  var joinToString = kotlin_kotlin.$_$.h7;
  var THROW_CCE = kotlin_kotlin.$_$.cg;
  var KtMap = kotlin_kotlin.$_$.o5;
  var toDoubleOrNull = kotlin_kotlin.$_$.pe;
  var KtList = kotlin_kotlin.$_$.m5;
  var numberRangeToNumber = kotlin_kotlin.$_$.rb;
  var ClosedRange = kotlin_kotlin.$_$.gc;
  var isInterface = kotlin_kotlin.$_$.ib;
  var contains = kotlin_kotlin.$_$.nc;
  var SerializerFactory = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.z1;
  var toDouble = kotlin_kotlin.$_$.qe;
  var getKClassFromExpression = kotlin_kotlin.$_$.e;
  var getBooleanHashCode = kotlin_kotlin.$_$.oa;
  var getStringHashCode = kotlin_kotlin.$_$.ra;
  var NumberFormatException_init_$Create$ = kotlin_kotlin.$_$.e2;
  var StringCompanionObject_instance = kotlin_kotlin.$_$.s4;
  var serializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.u;
  var InlinePrimitiveDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.u1;
  var LinkedHashMap_init_$Create$ = kotlin_kotlin.$_$.y;
  var ArrayList_init_$Create$ = kotlin_kotlin.$_$.p;
  var MapSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.s;
  var SerialDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.f1;
  var KSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.j2;
  var SEALED_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.d;
  var buildSerialDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.h1;
  var noWhenBranchMatchedException = kotlin_kotlin.$_$.bh;
  var STRING_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.e;
  var ListSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.r;
  var ENUM_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.g;
  var PrimitiveSerialDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.b1;
  var toLongOrNull = kotlin_kotlin.$_$.ue;
  var toULongOrNull = kotlin_kotlin.$_$.af;
  var ULong = kotlin_kotlin.$_$.kg;
  var Companion_getInstance = kotlin_kotlin.$_$.d5;
  var serializer_0 = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.y;
  var _ULong___get_data__impl__fggpzb = kotlin_kotlin.$_$.t3;
  var toBooleanStrictOrNull = kotlin_kotlin.$_$.oe;
  var IllegalStateException_init_$Create$ = kotlin_kotlin.$_$.y1;
  var lazy = kotlin_kotlin.$_$.ah;
  var get_isNullable = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.e1;
  var get_isInline = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.d1;
  var get_annotations = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.c1;
  var KProperty1 = kotlin_kotlin.$_$.vc;
  var getPropertyCallableRef = kotlin_kotlin.$_$.qa;
  var Encoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.o1;
  var CompositeEncoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.m1;
  var toLong = kotlin_kotlin.$_$.zb;
  var _UInt___init__impl__l7qpdl = kotlin_kotlin.$_$.j3;
  var UInt__toString_impl_dbgl21 = kotlin_kotlin.$_$.l3;
  var _ULong___init__impl__c78o9k = kotlin_kotlin.$_$.s3;
  var ULong__toString_impl_f9au7k = kotlin_kotlin.$_$.u3;
  var _UByte___init__impl__g9hnc4 = kotlin_kotlin.$_$.a3;
  var UByte__toString_impl_v72jg = kotlin_kotlin.$_$.c3;
  var _UShort___init__impl__jigrne = kotlin_kotlin.$_$.b4;
  var UShort__toString_impl_edaoee = kotlin_kotlin.$_$.d4;
  var ElementMarker = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.r1;
  var captureStack = kotlin_kotlin.$_$.ea;
  var SerializationException = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.m2;
  var SerializationException_init_$Init$ = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.a;
  var charSequenceSubSequence = kotlin_kotlin.$_$.ja;
  var coerceAtLeast = kotlin_kotlin.$_$.hc;
  var coerceAtMost = kotlin_kotlin.$_$.jc;
  var SerializationException_init_$Create$ = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.b;
  var CLASS_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.h;
  var singleOrNull = kotlin_kotlin.$_$.j8;
  var emptyMap = kotlin_kotlin.$_$.u6;
  var getValue = kotlin_kotlin.$_$.c7;
  var copyOf = kotlin_kotlin.$_$.n6;
  var copyOf_0 = kotlin_kotlin.$_$.o6;
  var LIST_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.i;
  var DeepRecursiveFunction = kotlin_kotlin.$_$.qf;
  var invoke = kotlin_kotlin.$_$.vg;
  var CoroutineImpl = kotlin_kotlin.$_$.w9;
  var DeepRecursiveScope = kotlin_kotlin.$_$.rf;
  var Unit = kotlin_kotlin.$_$.ng;
  var get_COROUTINE_SUSPENDED = kotlin_kotlin.$_$.g9;
  var initMetadataForLambda = kotlin_kotlin.$_$.ya;
  var initMetadataForCoroutine = kotlin_kotlin.$_$.va;
  var SealedClassSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.l2;
  var jsonCachedSerialNames = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.c2;
  var ENUM = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.g1;
  var PrimitiveKind = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.a1;
  var PolymorphicKind = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.z;
  var CONTEXTUAL_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.f;
  var MAP_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.j;
  var contextual = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.g2;
  var SerializersModuleCollector = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.h2;
  var AbstractDecoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.j1;
  var AbstractPolymorphicSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.p1;
  var DeserializationStrategy = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.i2;
  var getKClass = kotlin_kotlin.$_$.f;
  var findPolymorphicSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.o2;
  var ensureNotNull = kotlin_kotlin.$_$.ug;
  var substringBefore = kotlin_kotlin.$_$.me;
  var removeSuffix = kotlin_kotlin.$_$.ae;
  var substringAfter = kotlin_kotlin.$_$.le;
  var contains_0 = kotlin_kotlin.$_$.cd;
  var plus = kotlin_kotlin.$_$.ch;
  var MissingFieldException = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.k2;
  var IllegalArgumentException = kotlin_kotlin.$_$.vf;
  var isFinite = kotlin_kotlin.$_$.xg;
  var isFinite_0 = kotlin_kotlin.$_$.wg;
  var toUInt = kotlin_kotlin.$_$.ze;
  var _UInt___get_data__impl__f0vqqw = kotlin_kotlin.$_$.k3;
  var toULong = kotlin_kotlin.$_$.bf;
  var toUByte = kotlin_kotlin.$_$.ye;
  var _UByte___get_data__impl__jof9qr = kotlin_kotlin.$_$.b3;
  var toUShort = kotlin_kotlin.$_$.cf;
  var _UShort___get_data__impl__g0245 = kotlin_kotlin.$_$.c4;
  var objectCreate = kotlin_kotlin.$_$.wb;
  var AbstractEncoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.k1;
  var OBJECT_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.k;
  var findPolymorphicSerializer_0 = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.p2;
  var SerializationStrategy = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.n2;
  var toString_1 = kotlin_kotlin.$_$.v2;
  var Companion_getInstance_0 = kotlin_kotlin.$_$.c5;
  var serializer_1 = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.w;
  var Companion_getInstance_1 = kotlin_kotlin.$_$.b5;
  var serializer_2 = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.x;
  var Companion_getInstance_2 = kotlin_kotlin.$_$.e5;
  var serializer_3 = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.v;
  var setOf = kotlin_kotlin.$_$.i8;
  var Char__toInt_impl_vasixd = kotlin_kotlin.$_$.u2;
  var numberToChar = kotlin_kotlin.$_$.sb;
  var equals_0 = kotlin_kotlin.$_$.id;
  var toByte = kotlin_kotlin.$_$.yb;
  var startsWith = kotlin_kotlin.$_$.ie;
  var NamedValueDecoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.w1;
  var toShort = kotlin_kotlin.$_$.ac;
  var single = kotlin_kotlin.$_$.fe;
  var Char = kotlin_kotlin.$_$.nf;
  var emptySet = kotlin_kotlin.$_$.v6;
  var plus_0 = kotlin_kotlin.$_$.x7;
  var toInt = kotlin_kotlin.$_$.se;
  var toList = kotlin_kotlin.$_$.t8;
  var throwUninitializedPropertyAccessException = kotlin_kotlin.$_$.eh;
  var NamedValueEncoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.x1;
  var enumEntries = kotlin_kotlin.$_$.y9;
  var getContextualDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.i1;
  var last = kotlin_kotlin.$_$.m7;
  var removeLast = kotlin_kotlin.$_$.f8;
  var lastIndexOf = kotlin_kotlin.$_$.ud;
  var Long = kotlin_kotlin.$_$.xf;
  var Char__minus_impl_a2frrh = kotlin_kotlin.$_$.q2;
  var numberToLong = kotlin_kotlin.$_$.vb;
  var charArray = kotlin_kotlin.$_$.ga;
  var indexOf = kotlin_kotlin.$_$.md;
  var indexOf_0 = kotlin_kotlin.$_$.nd;
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
    this.y3s_1 = configuration;
    this.z3s_1 = serializersModule;
    this.a3t_1 = new DescriptorSchemaCache();
  }
  protoOf(Json).f1o = function () {
    return this.z3s_1;
  };
  protoOf(Json).b3t = function (serializer, value) {
    var result = new JsonToStringWriter();
    try {
      encodeByWriter(this, result, serializer, value);
      return result.toString();
    }finally {
      result.h3t();
    }
  };
  protoOf(Json).c3t = function (deserializer, string) {
    var lexer = StringJsonLexer_0(this, string);
    var input = new StreamingJsonDecoder(this, WriteMode_OBJ_getInstance(), lexer, deserializer.p1k(), null);
    var result = input.p1n(deserializer);
    lexer.u3t();
    return result;
  };
  protoOf(Json).d3t = function (serializer, value) {
    return writeJson(this, value, serializer);
  };
  protoOf(Json).e3t = function (deserializer, element) {
    return readJson(this, element, deserializer);
  };
  protoOf(Json).f3t = function (string) {
    return this.c3t(JsonElementSerializer_getInstance(), string);
  };
  function Json_0(from, builderAction) {
    from = from === VOID ? Default_getInstance() : from;
    var builder = new JsonBuilder(from);
    builderAction(builder);
    var conf = builder.n3u();
    return new JsonImpl(conf, builder.m3u_1);
  }
  function JsonBuilder(json) {
    this.v3t_1 = json.y3s_1.o3u_1;
    this.w3t_1 = json.y3s_1.t3u_1;
    this.x3t_1 = json.y3s_1.p3u_1;
    this.y3t_1 = json.y3s_1.q3u_1;
    this.z3t_1 = json.y3s_1.s3u_1;
    this.a3u_1 = json.y3s_1.u3u_1;
    this.b3u_1 = json.y3s_1.v3u_1;
    this.c3u_1 = json.y3s_1.x3u_1;
    this.d3u_1 = json.y3s_1.e3v_1;
    this.e3u_1 = json.y3s_1.z3u_1;
    this.f3u_1 = json.y3s_1.a3v_1;
    this.g3u_1 = json.y3s_1.b3v_1;
    this.h3u_1 = json.y3s_1.c3v_1;
    this.i3u_1 = json.y3s_1.d3v_1;
    this.j3u_1 = json.y3s_1.y3u_1;
    this.k3u_1 = json.y3s_1.r3u_1;
    this.l3u_1 = json.y3s_1.w3u_1;
    this.m3u_1 = json.f1o();
  }
  protoOf(JsonBuilder).n3u = function () {
    if (this.l3u_1) {
      // Inline function 'kotlin.require' call
      if (!(this.c3u_1 === 'type')) {
        var message = 'Class discriminator should not be specified when array polymorphism is specified';
        throw IllegalArgumentException_init_$Create$(toString(message));
      }
      // Inline function 'kotlin.require' call
      if (!this.d3u_1.equals(ClassDiscriminatorMode_POLYMORPHIC_getInstance())) {
        var message_0 = 'useArrayPolymorphism option can only be used if classDiscriminatorMode in a default POLYMORPHIC state.';
        throw IllegalArgumentException_init_$Create$(toString(message_0));
      }
    }
    if (!this.z3t_1) {
      // Inline function 'kotlin.require' call
      if (!(this.a3u_1 === '    ')) {
        var message_1 = 'Indent should not be specified when default printing mode is used';
        throw IllegalArgumentException_init_$Create$(toString(message_1));
      }
    } else if (!(this.a3u_1 === '    ')) {
      var tmp3 = this.a3u_1;
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
        var message_2 = 'Only whitespace, tab, newline and carriage return are allowed as pretty print symbols. Had ' + this.a3u_1;
        throw IllegalArgumentException_init_$Create$(toString(message_2));
      }
    }
    return new JsonConfiguration(this.v3t_1, this.x3t_1, this.y3t_1, this.k3u_1, this.z3t_1, this.w3t_1, this.a3u_1, this.b3u_1, this.l3u_1, this.c3u_1, this.j3u_1, this.e3u_1, this.f3u_1, this.g3u_1, this.h3u_1, this.i3u_1, this.d3u_1);
  };
  function validateConfiguration($this) {
    if (equals($this.f1o(), EmptySerializersModule()))
      return Unit_instance;
    var collector = new PolymorphismValidator($this.y3s_1.w3u_1, $this.y3s_1.x3u_1);
    $this.f1o().r24(collector);
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
    this.o3u_1 = encodeDefaults;
    this.p3u_1 = ignoreUnknownKeys;
    this.q3u_1 = isLenient;
    this.r3u_1 = allowStructuredMapKeys;
    this.s3u_1 = prettyPrint;
    this.t3u_1 = explicitNulls;
    this.u3u_1 = prettyPrintIndent;
    this.v3u_1 = coerceInputValues;
    this.w3u_1 = useArrayPolymorphism;
    this.x3u_1 = classDiscriminator;
    this.y3u_1 = allowSpecialFloatingPointValues;
    this.z3u_1 = useAlternativeNames;
    this.a3v_1 = namingStrategy;
    this.b3v_1 = decodeEnumsCaseInsensitive;
    this.c3v_1 = allowTrailingComma;
    this.d3v_1 = allowComments;
    this.e3v_1 = classDiscriminatorMode;
  }
  protoOf(JsonConfiguration).toString = function () {
    return 'JsonConfiguration(encodeDefaults=' + this.o3u_1 + ', ignoreUnknownKeys=' + this.p3u_1 + ', isLenient=' + this.q3u_1 + ', ' + ('allowStructuredMapKeys=' + this.r3u_1 + ', prettyPrint=' + this.s3u_1 + ', explicitNulls=' + this.t3u_1 + ', ') + ("prettyPrintIndent='" + this.u3u_1 + "', coerceInputValues=" + this.v3u_1 + ', useArrayPolymorphism=' + this.w3u_1 + ', ') + ("classDiscriminator='" + this.x3u_1 + "', allowSpecialFloatingPointValues=" + this.y3u_1 + ', ') + ('useAlternativeNames=' + this.z3u_1 + ', namingStrategy=' + toString_0(this.a3v_1) + ', decodeEnumsCaseInsensitive=' + this.b3v_1 + ', ') + ('allowTrailingComma=' + this.c3v_1 + ', allowComments=' + this.d3v_1 + ', classDiscriminatorMode=' + this.e3v_1.toString() + ')');
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
    return this.i3v();
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
  protoOf(Companion_1).j3v = function () {
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
    this_0.a8(_Char___init__impl__6a9atx(58));
    this_0.y7(v);
    return this_0.toString();
  }
  function JsonObject(content) {
    JsonElement.call(this);
    this.k3v_1 = content;
  }
  protoOf(JsonObject).equals = function (other) {
    return equals(this.k3v_1, other);
  };
  protoOf(JsonObject).hashCode = function () {
    return hashCode(this.k3v_1);
  };
  protoOf(JsonObject).toString = function () {
    var tmp = this.k3v_1.u();
    return joinToString(tmp, ',', '{', '}', VOID, VOID, JsonObject$toString$lambda);
  };
  protoOf(JsonObject).v25 = function (key) {
    return this.k3v_1.c2(key);
  };
  protoOf(JsonObject).c2 = function (key) {
    if (!(!(key == null) ? typeof key === 'string' : false))
      return false;
    return this.v25((!(key == null) ? typeof key === 'string' : false) ? key : THROW_CCE());
  };
  protoOf(JsonObject).yd = function (key) {
    return this.k3v_1.e2(key);
  };
  protoOf(JsonObject).e2 = function (key) {
    if (!(!(key == null) ? typeof key === 'string' : false))
      return null;
    return this.yd((!(key == null) ? typeof key === 'string' : false) ? key : THROW_CCE());
  };
  protoOf(JsonObject).p = function () {
    return this.k3v_1.p();
  };
  protoOf(JsonObject).u = function () {
    return this.k3v_1.u();
  };
  protoOf(JsonObject).f2 = function () {
    return this.k3v_1.f2();
  };
  protoOf(JsonObject).j = function () {
    return this.k3v_1.j();
  };
  protoOf(JsonObject).g2 = function () {
    return this.k3v_1.g2();
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
    return toDoubleOrNull(_this__u8e3s4.i3v());
  }
  function Companion_2() {
  }
  var Companion_instance_2;
  function Companion_getInstance_6() {
    return Companion_instance_2;
  }
  function JsonArray(content) {
    JsonElement.call(this);
    this.l3v_1 = content;
  }
  protoOf(JsonArray).equals = function (other) {
    return equals(this.l3v_1, other);
  };
  protoOf(JsonArray).hashCode = function () {
    return hashCode(this.l3v_1);
  };
  protoOf(JsonArray).toString = function () {
    return joinToString(this.l3v_1, ',', '[', ']');
  };
  protoOf(JsonArray).m3v = function (element) {
    return this.l3v_1.r(element);
  };
  protoOf(JsonArray).r = function (element) {
    if (!(element instanceof JsonElement))
      return false;
    return this.m3v(element instanceof JsonElement ? element : THROW_CCE());
  };
  protoOf(JsonArray).n3v = function (elements) {
    return this.l3v_1.w1(elements);
  };
  protoOf(JsonArray).w1 = function (elements) {
    return this.n3v(elements);
  };
  protoOf(JsonArray).o = function (index) {
    return this.l3v_1.o(index);
  };
  protoOf(JsonArray).o3v = function (element) {
    return this.l3v_1.s(element);
  };
  protoOf(JsonArray).s = function (element) {
    if (!(element instanceof JsonElement))
      return -1;
    return this.o3v(element instanceof JsonElement ? element : THROW_CCE());
  };
  protoOf(JsonArray).p = function () {
    return this.l3v_1.p();
  };
  protoOf(JsonArray).g = function () {
    return this.l3v_1.g();
  };
  protoOf(JsonArray).q = function (index) {
    return this.l3v_1.q(index);
  };
  protoOf(JsonArray).x1 = function (fromIndex, toIndex) {
    return this.l3v_1.x1(fromIndex, toIndex);
  };
  protoOf(JsonArray).j = function () {
    return this.l3v_1.j();
  };
  function get_intOrNull(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    // Inline function 'kotlinx.serialization.json.mapExceptionsToNull' call
    var tmp;
    try {
      tmp = (new StringJsonLexer(_this__u8e3s4.i3v())).p3v();
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
      tmp = _this__u8e3s4.i3v();
    }
    return tmp;
  }
  function get_booleanOrNull(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    return toBooleanStrictOrNull_0(_this__u8e3s4.i3v());
  }
  function get_floatOrNull(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    // Inline function 'kotlin.text.toFloatOrNull' call
    var this_0 = _this__u8e3s4.i3v();
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return toDoubleOrNull(this_0);
  }
  function JsonNull() {
    JsonNull_instance = this;
    JsonPrimitive.call(this);
    this.q3v_1 = 'null';
  }
  protoOf(JsonNull).h3v = function () {
    return false;
  };
  protoOf(JsonNull).i3v = function () {
    return this.q3v_1;
  };
  protoOf(JsonNull).j3v = function () {
    return JsonNullSerializer_getInstance();
  };
  protoOf(JsonNull).g1w = function (typeParamsSerializers) {
    return this.j3v();
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
    return toDouble(_this__u8e3s4.i3v());
  }
  function get_longOrNull(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    // Inline function 'kotlinx.serialization.json.mapExceptionsToNull' call
    var tmp;
    try {
      tmp = (new StringJsonLexer(_this__u8e3s4.i3v())).p3v();
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
    this.r3v_1 = isString;
    this.s3v_1 = coerceToInlineType;
    this.t3v_1 = toString(body);
    if (!(this.s3v_1 == null)) {
      // Inline function 'kotlin.require' call
      // Inline function 'kotlin.require' call
      if (!this.s3v_1.v1l()) {
        var message = 'Failed requirement.';
        throw IllegalArgumentException_init_$Create$(toString(message));
      }
    }
  }
  protoOf(JsonLiteral).h3v = function () {
    return this.r3v_1;
  };
  protoOf(JsonLiteral).i3v = function () {
    return this.t3v_1;
  };
  protoOf(JsonLiteral).toString = function () {
    var tmp;
    if (this.r3v_1) {
      // Inline function 'kotlin.text.buildString' call
      // Inline function 'kotlin.apply' call
      var this_0 = StringBuilder_init_$Create$();
      printQuoted(this_0, this.t3v_1);
      tmp = this_0.toString();
    } else {
      tmp = this.t3v_1;
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
    if (!(this.r3v_1 === other.r3v_1))
      return false;
    if (!(this.t3v_1 === other.t3v_1))
      return false;
    return true;
  };
  protoOf(JsonLiteral).hashCode = function () {
    var result = getBooleanHashCode(this.r3v_1);
    result = imul(31, result) + getStringHashCode(this.t3v_1) | 0;
    return result;
  };
  function get_int(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    // Inline function 'kotlinx.serialization.json.mapExceptions' call
    var tmp;
    try {
      tmp = (new StringJsonLexer(_this__u8e3s4.i3v())).p3v();
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
      throw NumberFormatException_init_$Create$(_this__u8e3s4.i3v() + ' is not an Int');
    return result.g1();
  }
  function get_long(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    // Inline function 'kotlinx.serialization.json.mapExceptions' call
    var tmp;
    try {
      tmp = (new StringJsonLexer(_this__u8e3s4.i3v())).p3v();
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
    var this_0 = _this__u8e3s4.i3v();
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
    tmp.u3v_1 = LinkedHashMap_init_$Create$();
  }
  protoOf(JsonObjectBuilder).v3v = function (key, element) {
    return this.u3v_1.h2(key, element);
  };
  protoOf(JsonObjectBuilder).n3u = function () {
    return new JsonObject(this.u3v_1);
  };
  function JsonArrayBuilder() {
    var tmp = this;
    // Inline function 'kotlin.collections.mutableListOf' call
    tmp.w3v_1 = ArrayList_init_$Create$();
  }
  protoOf(JsonArrayBuilder).x3v = function (element) {
    // Inline function 'kotlin.collections.plusAssign' call
    this.w3v_1.e(element);
    return true;
  };
  protoOf(JsonArrayBuilder).n3u = function () {
    return new JsonArray(this.w3v_1);
  };
  function put(_this__u8e3s4, key, value) {
    return _this__u8e3s4.v3v(key, JsonPrimitive_2(value));
  }
  function put_0(_this__u8e3s4, key, value) {
    return _this__u8e3s4.v3v(key, JsonPrimitive_0(value));
  }
  function put_1(_this__u8e3s4, key, value) {
    return _this__u8e3s4.v3v(key, JsonPrimitive_1(value));
  }
  function putJsonObject(_this__u8e3s4, key, builderAction) {
    // Inline function 'kotlinx.serialization.json.buildJsonObject' call
    var builder = new JsonObjectBuilder();
    builderAction(builder);
    var tmp$ret$0 = builder.n3u();
    return _this__u8e3s4.v3v(key, tmp$ret$0);
  }
  function putJsonArray(_this__u8e3s4, key, builderAction) {
    // Inline function 'kotlinx.serialization.json.buildJsonArray' call
    var builder = new JsonArrayBuilder();
    builderAction(builder);
    var tmp$ret$0 = builder.n3u();
    return _this__u8e3s4.v3v(key, tmp$ret$0);
  }
  function add(_this__u8e3s4, value) {
    return _this__u8e3s4.x3v(JsonPrimitive_2(value));
  }
  function addJsonObject(_this__u8e3s4, builderAction) {
    // Inline function 'kotlinx.serialization.json.buildJsonObject' call
    var builder = new JsonObjectBuilder();
    builderAction(builder);
    var tmp$ret$0 = builder.n3u();
    return _this__u8e3s4.x3v(tmp$ret$0);
  }
  function JsonObjectDescriptor() {
    JsonObjectDescriptor_instance = this;
    this.y3v_1 = MapSerializer(serializer(StringCompanionObject_instance), JsonElementSerializer_getInstance()).p1k();
    this.z3v_1 = 'kotlinx.serialization.json.JsonObject';
  }
  protoOf(JsonObjectDescriptor).t1l = function () {
    return this.z3v_1;
  };
  protoOf(JsonObjectDescriptor).y1l = function (index) {
    return this.y3v_1.y1l(index);
  };
  protoOf(JsonObjectDescriptor).z1l = function (name) {
    return this.y3v_1.z1l(name);
  };
  protoOf(JsonObjectDescriptor).a1m = function (index) {
    return this.y3v_1.a1m(index);
  };
  protoOf(JsonObjectDescriptor).b1m = function (index) {
    return this.y3v_1.b1m(index);
  };
  protoOf(JsonObjectDescriptor).c1m = function (index) {
    return this.y3v_1.c1m(index);
  };
  protoOf(JsonObjectDescriptor).u1l = function () {
    return this.y3v_1.u1l();
  };
  protoOf(JsonObjectDescriptor).p1l = function () {
    return this.y3v_1.p1l();
  };
  protoOf(JsonObjectDescriptor).v1l = function () {
    return this.y3v_1.v1l();
  };
  protoOf(JsonObjectDescriptor).w1l = function () {
    return this.y3v_1.w1l();
  };
  protoOf(JsonObjectDescriptor).x1l = function () {
    return this.y3v_1.x1l();
  };
  var JsonObjectDescriptor_instance;
  function JsonObjectDescriptor_getInstance() {
    if (JsonObjectDescriptor_instance == null)
      new JsonObjectDescriptor();
    return JsonObjectDescriptor_instance;
  }
  function JsonObjectSerializer() {
    JsonObjectSerializer_instance = this;
    this.a3w_1 = JsonObjectDescriptor_getInstance();
  }
  protoOf(JsonObjectSerializer).p1k = function () {
    return this.a3w_1;
  };
  protoOf(JsonObjectSerializer).b3w = function (encoder, value) {
    verify(encoder);
    MapSerializer(serializer(StringCompanionObject_instance), JsonElementSerializer_getInstance()).q1k(encoder, value);
  };
  protoOf(JsonObjectSerializer).q1k = function (encoder, value) {
    return this.b3w(encoder, value instanceof JsonObject ? value : THROW_CCE());
  };
  protoOf(JsonObjectSerializer).r1k = function (decoder) {
    verify_0(decoder);
    return new JsonObject(MapSerializer(serializer(StringCompanionObject_instance), JsonElementSerializer_getInstance()).r1k(decoder));
  };
  var JsonObjectSerializer_instance;
  function JsonObjectSerializer_getInstance() {
    if (JsonObjectSerializer_instance == null)
      new JsonObjectSerializer();
    return JsonObjectSerializer_instance;
  }
  function JsonElementSerializer$descriptor$lambda($this$buildSerialDescriptor) {
    $this$buildSerialDescriptor.a1l('JsonPrimitive', defer(JsonElementSerializer$descriptor$lambda$lambda));
    $this$buildSerialDescriptor.a1l('JsonNull', defer(JsonElementSerializer$descriptor$lambda$lambda_0));
    $this$buildSerialDescriptor.a1l('JsonLiteral', defer(JsonElementSerializer$descriptor$lambda$lambda_1));
    $this$buildSerialDescriptor.a1l('JsonObject', defer(JsonElementSerializer$descriptor$lambda$lambda_2));
    $this$buildSerialDescriptor.a1l('JsonArray', defer(JsonElementSerializer$descriptor$lambda$lambda_3));
    return Unit_instance;
  }
  function JsonElementSerializer$descriptor$lambda$lambda() {
    return JsonPrimitiveSerializer_getInstance().c3w_1;
  }
  function JsonElementSerializer$descriptor$lambda$lambda_0() {
    return JsonNullSerializer_getInstance().d3w_1;
  }
  function JsonElementSerializer$descriptor$lambda$lambda_1() {
    return JsonLiteralSerializer_getInstance().e3w_1;
  }
  function JsonElementSerializer$descriptor$lambda$lambda_2() {
    return JsonObjectSerializer_getInstance().a3w_1;
  }
  function JsonElementSerializer$descriptor$lambda$lambda_3() {
    return JsonArraySerializer_getInstance().f3w_1;
  }
  function JsonElementSerializer() {
    JsonElementSerializer_instance = this;
    var tmp = this;
    var tmp_0 = SEALED_getInstance();
    tmp.g3w_1 = buildSerialDescriptor('kotlinx.serialization.json.JsonElement', tmp_0, [], JsonElementSerializer$descriptor$lambda);
  }
  protoOf(JsonElementSerializer).p1k = function () {
    return this.g3w_1;
  };
  protoOf(JsonElementSerializer).h3w = function (encoder, value) {
    verify(encoder);
    if (value instanceof JsonPrimitive) {
      encoder.i1p(JsonPrimitiveSerializer_getInstance(), value);
    } else {
      if (value instanceof JsonObject) {
        encoder.i1p(JsonObjectSerializer_getInstance(), value);
      } else {
        if (value instanceof JsonArray) {
          encoder.i1p(JsonArraySerializer_getInstance(), value);
        } else {
          noWhenBranchMatchedException();
        }
      }
    }
  };
  protoOf(JsonElementSerializer).q1k = function (encoder, value) {
    return this.h3w(encoder, value instanceof JsonElement ? value : THROW_CCE());
  };
  protoOf(JsonElementSerializer).r1k = function (decoder) {
    var input = asJsonDecoder(decoder);
    return input.g3v();
  };
  var JsonElementSerializer_instance;
  function JsonElementSerializer_getInstance() {
    if (JsonElementSerializer_instance == null)
      new JsonElementSerializer();
    return JsonElementSerializer_instance;
  }
  function JsonPrimitiveSerializer() {
    JsonPrimitiveSerializer_instance = this;
    this.c3w_1 = buildSerialDescriptor('kotlinx.serialization.json.JsonPrimitive', STRING_getInstance(), []);
  }
  protoOf(JsonPrimitiveSerializer).p1k = function () {
    return this.c3w_1;
  };
  protoOf(JsonPrimitiveSerializer).i3w = function (encoder, value) {
    verify(encoder);
    var tmp;
    if (value instanceof JsonNull) {
      encoder.i1p(JsonNullSerializer_getInstance(), JsonNull_getInstance());
      tmp = Unit_instance;
    } else {
      var tmp_0 = JsonLiteralSerializer_getInstance();
      encoder.i1p(tmp_0, value instanceof JsonLiteral ? value : THROW_CCE());
      tmp = Unit_instance;
    }
    return tmp;
  };
  protoOf(JsonPrimitiveSerializer).q1k = function (encoder, value) {
    return this.i3w(encoder, value instanceof JsonPrimitive ? value : THROW_CCE());
  };
  protoOf(JsonPrimitiveSerializer).r1k = function (decoder) {
    var result = asJsonDecoder(decoder).g3v();
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
    this.j3w_1 = ListSerializer(JsonElementSerializer_getInstance()).p1k();
    this.k3w_1 = 'kotlinx.serialization.json.JsonArray';
  }
  protoOf(JsonArrayDescriptor).t1l = function () {
    return this.k3w_1;
  };
  protoOf(JsonArrayDescriptor).y1l = function (index) {
    return this.j3w_1.y1l(index);
  };
  protoOf(JsonArrayDescriptor).z1l = function (name) {
    return this.j3w_1.z1l(name);
  };
  protoOf(JsonArrayDescriptor).a1m = function (index) {
    return this.j3w_1.a1m(index);
  };
  protoOf(JsonArrayDescriptor).b1m = function (index) {
    return this.j3w_1.b1m(index);
  };
  protoOf(JsonArrayDescriptor).c1m = function (index) {
    return this.j3w_1.c1m(index);
  };
  protoOf(JsonArrayDescriptor).u1l = function () {
    return this.j3w_1.u1l();
  };
  protoOf(JsonArrayDescriptor).p1l = function () {
    return this.j3w_1.p1l();
  };
  protoOf(JsonArrayDescriptor).v1l = function () {
    return this.j3w_1.v1l();
  };
  protoOf(JsonArrayDescriptor).w1l = function () {
    return this.j3w_1.w1l();
  };
  protoOf(JsonArrayDescriptor).x1l = function () {
    return this.j3w_1.x1l();
  };
  var JsonArrayDescriptor_instance;
  function JsonArrayDescriptor_getInstance() {
    if (JsonArrayDescriptor_instance == null)
      new JsonArrayDescriptor();
    return JsonArrayDescriptor_instance;
  }
  function JsonArraySerializer() {
    JsonArraySerializer_instance = this;
    this.f3w_1 = JsonArrayDescriptor_getInstance();
  }
  protoOf(JsonArraySerializer).p1k = function () {
    return this.f3w_1;
  };
  protoOf(JsonArraySerializer).l3w = function (encoder, value) {
    verify(encoder);
    ListSerializer(JsonElementSerializer_getInstance()).q1k(encoder, value);
  };
  protoOf(JsonArraySerializer).q1k = function (encoder, value) {
    return this.l3w(encoder, value instanceof JsonArray ? value : THROW_CCE());
  };
  protoOf(JsonArraySerializer).r1k = function (decoder) {
    verify_0(decoder);
    return new JsonArray(ListSerializer(JsonElementSerializer_getInstance()).r1k(decoder));
  };
  var JsonArraySerializer_instance;
  function JsonArraySerializer_getInstance() {
    if (JsonArraySerializer_instance == null)
      new JsonArraySerializer();
    return JsonArraySerializer_instance;
  }
  function JsonNullSerializer() {
    JsonNullSerializer_instance = this;
    this.d3w_1 = buildSerialDescriptor('kotlinx.serialization.json.JsonNull', ENUM_getInstance(), []);
  }
  protoOf(JsonNullSerializer).p1k = function () {
    return this.d3w_1;
  };
  protoOf(JsonNullSerializer).m3w = function (encoder, value) {
    verify(encoder);
    encoder.l1o();
  };
  protoOf(JsonNullSerializer).q1k = function (encoder, value) {
    return this.m3w(encoder, value instanceof JsonNull ? value : THROW_CCE());
  };
  protoOf(JsonNullSerializer).r1k = function (decoder) {
    verify_0(decoder);
    if (decoder.b1n()) {
      throw new JsonDecodingException("Expected 'null' literal");
    }
    decoder.c1n();
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
    this.e3w_1 = PrimitiveSerialDescriptor('kotlinx.serialization.json.JsonLiteral', STRING_getInstance());
  }
  protoOf(JsonLiteralSerializer).p1k = function () {
    return this.e3w_1;
  };
  protoOf(JsonLiteralSerializer).n3w = function (encoder, value) {
    verify(encoder);
    if (value.r3v_1) {
      return encoder.u1o(value.t3v_1);
    }
    if (!(value.s3v_1 == null)) {
      return encoder.w1o(value.s3v_1).u1o(value.t3v_1);
    }
    var tmp0_safe_receiver = toLongOrNull(value.t3v_1);
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      return encoder.q1o(tmp0_safe_receiver);
    }
    var tmp1_safe_receiver = toULongOrNull(value.t3v_1);
    var tmp = tmp1_safe_receiver;
    if ((tmp == null ? null : new ULong(tmp)) == null)
      null;
    else {
      var tmp_0 = tmp1_safe_receiver;
      // Inline function 'kotlin.let' call
      var it = (tmp_0 == null ? null : new ULong(tmp_0)).gn_1;
      var tmp_1 = encoder.w1o(serializer_0(Companion_getInstance()).p1k());
      // Inline function 'kotlin.ULong.toLong' call
      var tmp$ret$1 = _ULong___get_data__impl__fggpzb(it);
      tmp_1.q1o(tmp$ret$1);
      return Unit_instance;
    }
    var tmp2_safe_receiver = toDoubleOrNull(value.t3v_1);
    if (tmp2_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      return encoder.s1o(tmp2_safe_receiver);
    }
    var tmp3_safe_receiver = toBooleanStrictOrNull(value.t3v_1);
    if (tmp3_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      return encoder.m1o(tmp3_safe_receiver);
    }
    encoder.u1o(value.t3v_1);
  };
  protoOf(JsonLiteralSerializer).q1k = function (encoder, value) {
    return this.n3w(encoder, value instanceof JsonLiteral ? value : THROW_CCE());
  };
  protoOf(JsonLiteralSerializer).r1k = function (decoder) {
    var result = asJsonDecoder(decoder).g3v();
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
    var tmp0 = $this.o3w_1;
    // Inline function 'kotlin.getValue' call
    original$factory();
    return tmp0.w();
  }
  function defer$1($deferred) {
    this.o3w_1 = lazy($deferred);
  }
  protoOf(defer$1).t1l = function () {
    return _get_original__l7ku1m(this).t1l();
  };
  protoOf(defer$1).u1l = function () {
    return _get_original__l7ku1m(this).u1l();
  };
  protoOf(defer$1).w1l = function () {
    return _get_original__l7ku1m(this).w1l();
  };
  protoOf(defer$1).y1l = function (index) {
    return _get_original__l7ku1m(this).y1l(index);
  };
  protoOf(defer$1).z1l = function (name) {
    return _get_original__l7ku1m(this).z1l(name);
  };
  protoOf(defer$1).a1m = function (index) {
    return _get_original__l7ku1m(this).a1m(index);
  };
  protoOf(defer$1).b1m = function (index) {
    return _get_original__l7ku1m(this).b1m(index);
  };
  protoOf(defer$1).c1m = function (index) {
    return _get_original__l7ku1m(this).c1m(index);
  };
  function original$factory() {
    return getPropertyCallableRef('original', 1, KProperty1, function (receiver) {
      return _get_original__l7ku1m(receiver);
    }, null);
  }
  function JsonEncoder() {
  }
  function Composer(writer) {
    this.p3w_1 = writer;
    this.q3w_1 = true;
  }
  protoOf(Composer).r3w = function () {
    this.q3w_1 = true;
  };
  protoOf(Composer).s3w = function () {
    return Unit_instance;
  };
  protoOf(Composer).t3w = function () {
    this.q3w_1 = false;
  };
  protoOf(Composer).u3w = function () {
    this.q3w_1 = false;
  };
  protoOf(Composer).v3w = function () {
    return Unit_instance;
  };
  protoOf(Composer).w3w = function (v) {
    return this.p3w_1.x3w(v);
  };
  protoOf(Composer).y3w = function (v) {
    return this.p3w_1.z3w(v);
  };
  protoOf(Composer).a3x = function (v) {
    return this.p3w_1.z3w(v.toString());
  };
  protoOf(Composer).b3x = function (v) {
    return this.p3w_1.z3w(v.toString());
  };
  protoOf(Composer).c3x = function (v) {
    return this.p3w_1.d3x(toLong(v));
  };
  protoOf(Composer).e3x = function (v) {
    return this.p3w_1.d3x(toLong(v));
  };
  protoOf(Composer).f3x = function (v) {
    return this.p3w_1.d3x(toLong(v));
  };
  protoOf(Composer).g3x = function (v) {
    return this.p3w_1.d3x(v);
  };
  protoOf(Composer).h3x = function (v) {
    return this.p3w_1.z3w(v.toString());
  };
  protoOf(Composer).i3x = function (value) {
    return this.p3w_1.j3x(value);
  };
  function Composer_0(sb, json) {
    return json.y3s_1.s3u_1 ? new ComposerWithPrettyPrint(sb, json) : new Composer(sb);
  }
  function ComposerForUnsignedNumbers(writer, forceQuoting) {
    Composer.call(this, writer);
    this.m3x_1 = forceQuoting;
  }
  protoOf(ComposerForUnsignedNumbers).f3x = function (v) {
    if (this.m3x_1) {
      // Inline function 'kotlin.toUInt' call
      var tmp$ret$0 = _UInt___init__impl__l7qpdl(v);
      this.i3x(UInt__toString_impl_dbgl21(tmp$ret$0));
    } else {
      // Inline function 'kotlin.toUInt' call
      var tmp$ret$1 = _UInt___init__impl__l7qpdl(v);
      this.y3w(UInt__toString_impl_dbgl21(tmp$ret$1));
    }
  };
  protoOf(ComposerForUnsignedNumbers).g3x = function (v) {
    if (this.m3x_1) {
      // Inline function 'kotlin.toULong' call
      var tmp$ret$0 = _ULong___init__impl__c78o9k(v);
      this.i3x(ULong__toString_impl_f9au7k(tmp$ret$0));
    } else {
      // Inline function 'kotlin.toULong' call
      var tmp$ret$1 = _ULong___init__impl__c78o9k(v);
      this.y3w(ULong__toString_impl_f9au7k(tmp$ret$1));
    }
  };
  protoOf(ComposerForUnsignedNumbers).c3x = function (v) {
    if (this.m3x_1) {
      // Inline function 'kotlin.toUByte' call
      var tmp$ret$0 = _UByte___init__impl__g9hnc4(v);
      this.i3x(UByte__toString_impl_v72jg(tmp$ret$0));
    } else {
      // Inline function 'kotlin.toUByte' call
      var tmp$ret$1 = _UByte___init__impl__g9hnc4(v);
      this.y3w(UByte__toString_impl_v72jg(tmp$ret$1));
    }
  };
  protoOf(ComposerForUnsignedNumbers).e3x = function (v) {
    if (this.m3x_1) {
      // Inline function 'kotlin.toUShort' call
      var tmp$ret$0 = _UShort___init__impl__jigrne(v);
      this.i3x(UShort__toString_impl_edaoee(tmp$ret$0));
    } else {
      // Inline function 'kotlin.toUShort' call
      var tmp$ret$1 = _UShort___init__impl__jigrne(v);
      this.y3w(UShort__toString_impl_edaoee(tmp$ret$1));
    }
  };
  function ComposerForUnquotedLiterals(writer, forceQuoting) {
    Composer.call(this, writer);
    this.p3x_1 = forceQuoting;
  }
  protoOf(ComposerForUnquotedLiterals).i3x = function (value) {
    if (this.p3x_1) {
      protoOf(Composer).i3x.call(this, value);
    } else {
      protoOf(Composer).y3w.call(this, value);
    }
  };
  function ComposerWithPrettyPrint(writer, json) {
    Composer.call(this, writer);
    this.s3x_1 = json;
    this.t3x_1 = 0;
  }
  protoOf(ComposerWithPrettyPrint).r3w = function () {
    this.q3w_1 = true;
    this.t3x_1 = this.t3x_1 + 1 | 0;
  };
  protoOf(ComposerWithPrettyPrint).s3w = function () {
    this.t3x_1 = this.t3x_1 - 1 | 0;
  };
  protoOf(ComposerWithPrettyPrint).t3w = function () {
    this.q3w_1 = false;
    this.y3w('\n');
    // Inline function 'kotlin.repeat' call
    var times = this.t3x_1;
    var inductionVariable = 0;
    if (inductionVariable < times)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        this.y3w(this.s3x_1.y3s_1.u3u_1);
      }
       while (inductionVariable < times);
  };
  protoOf(ComposerWithPrettyPrint).u3w = function () {
    if (this.q3w_1)
      this.q3w_1 = false;
    else {
      this.t3w();
    }
  };
  protoOf(ComposerWithPrettyPrint).v3w = function () {
    this.w3w(_Char___init__impl__6a9atx(32));
  };
  function readIfAbsent($this, descriptor, index) {
    $this.v3x_1 = (!descriptor.c1m(index) && descriptor.b1m(index).p1l());
    return $this.v3x_1;
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
    tmp.u3x_1 = new ElementMarker(descriptor, JsonElementMarker$readIfAbsent$ref(this));
    this.v3x_1 = false;
  }
  protoOf(JsonElementMarker).w3x = function (index) {
    this.u3x_1.w1t(index);
  };
  protoOf(JsonElementMarker).x3x = function () {
    return this.u3x_1.x1t();
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
    _this__u8e3s4.y3x('Trailing comma before the end of JSON ' + entity, _this__u8e3s4.q3t_1 - 1 | 0, "Trailing commas are non-complaint JSON and not allowed by default. Use 'allowTrailingCommas = true' in 'Json {}' builder to support them.");
  }
  function throwInvalidFloatingPointDecoded(_this__u8e3s4, result) {
    _this__u8e3s4.z3x('Unexpected special floating-point value ' + toString(result) + '. By default, ' + 'non-finite floating point values are prohibited because they do not conform JSON specification', VOID, "It is possible to deserialize them using 'JsonBuilder.allowSpecialFloatingPointValues = true'");
  }
  function JsonEncodingException(message) {
    JsonException.call(this, message);
    captureStack(this, JsonEncodingException);
  }
  function InvalidKeyKindException(keyDescriptor) {
    return new JsonEncodingException("Value of type '" + keyDescriptor.t1l() + "' can't be used in JSON as a key in the map. " + ("It should have either primitive or enum kind, but its kind is '" + keyDescriptor.u1l().toString() + "'.\n") + "Use 'allowStructuredMapKeys = true' in 'Json {}' builder to convert such maps to [key1, value1, key2, value2,...] arrays.");
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
    var index = _this__u8e3s4.z1l(name);
    if (!(index === -3))
      return index;
    if (!json.y3s_1.z3u_1)
      return index;
    return getJsonNameIndexSlowPath(_this__u8e3s4, json, name);
  }
  function getJsonNameIndexOrThrow(_this__u8e3s4, json, name, suffix) {
    suffix = suffix === VOID ? '' : suffix;
    _init_properties_JsonNamesMap_kt__cbbp0k();
    var index = getJsonNameIndex(_this__u8e3s4, json, name);
    if (index === -3)
      throw SerializationException_init_$Create$(_this__u8e3s4.t1l() + " does not contain element with name '" + name + "'" + suffix);
    return index;
  }
  function getJsonElementName(_this__u8e3s4, json, index) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    var strategy = namingStrategy(_this__u8e3s4, json);
    return strategy == null ? _this__u8e3s4.y1l(index) : serializationNamesIndices(_this__u8e3s4, json, strategy)[index];
  }
  function namingStrategy(_this__u8e3s4, json) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    return equals(_this__u8e3s4.u1l(), CLASS_getInstance()) ? json.y3s_1.a3v_1 : null;
  }
  function deserializationNamesMap(_this__u8e3s4, descriptor) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    var tmp = get_schemaCache(_this__u8e3s4);
    var tmp_0 = get_JsonDeserializationNamesKey();
    return tmp.b3y(descriptor, tmp_0, deserializationNamesMap$lambda(descriptor, _this__u8e3s4));
  }
  function decodeCaseInsensitive(_this__u8e3s4, descriptor) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    return _this__u8e3s4.y3s_1.b3v_1 && equals(descriptor.u1l(), ENUM_getInstance());
  }
  function getJsonNameIndexSlowPath(_this__u8e3s4, json, name) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    var tmp0_elvis_lhs = deserializationNamesMap(json, _this__u8e3s4).e2(name);
    return tmp0_elvis_lhs == null ? -3 : tmp0_elvis_lhs;
  }
  function serializationNamesIndices(_this__u8e3s4, json, strategy) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    var tmp = get_schemaCache(json);
    var tmp_0 = get_JsonSerializationNamesKey();
    return tmp.b3y(_this__u8e3s4, tmp_0, serializationNamesIndices$lambda(_this__u8e3s4, strategy));
  }
  function buildDeserializationNamesMap(_this__u8e3s4, json) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    // Inline function 'kotlin.collections.mutableMapOf' call
    var builder = LinkedHashMap_init_$Create$();
    var useLowercaseEnums = decodeCaseInsensitive(json, _this__u8e3s4);
    var strategyForClasses = namingStrategy(_this__u8e3s4, json);
    var inductionVariable = 0;
    var last = _this__u8e3s4.w1l();
    if (inductionVariable < last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'kotlin.collections.filterIsInstance' call
        var tmp0 = _this__u8e3s4.a1m(i);
        // Inline function 'kotlin.collections.filterIsInstanceTo' call
        var destination = ArrayList_init_$Create$();
        var _iterator__ex2g4s = tmp0.g();
        while (_iterator__ex2g4s.h()) {
          var element = _iterator__ex2g4s.i();
          if (element instanceof JsonNames) {
            destination.e(element);
          }
        }
        var tmp0_safe_receiver = singleOrNull(destination);
        var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.c3y_1;
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
          tmp_0 = _this__u8e3s4.y1l(i).toLowerCase();
        } else if (!(strategyForClasses == null)) {
          tmp_0 = strategyForClasses.d3y(_this__u8e3s4, i, _this__u8e3s4.y1l(i));
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
    var entity = equals($this_buildDeserializationNamesMap.u1l(), ENUM_getInstance()) ? 'enum value' : 'property';
    // Inline function 'kotlin.collections.contains' call
    // Inline function 'kotlin.collections.containsKey' call
    if ((isInterface(_this__u8e3s4, KtMap) ? _this__u8e3s4 : THROW_CCE()).c2(name)) {
      throw new JsonException("The suggested name '" + name + "' for " + entity + ' ' + $this_buildDeserializationNamesMap.y1l(index) + ' is already one of the names for ' + entity + ' ' + ($this_buildDeserializationNamesMap.y1l(getValue(_this__u8e3s4, name)) + ' in ' + toString($this_buildDeserializationNamesMap)));
    }
    // Inline function 'kotlin.collections.set' call
    _this__u8e3s4.h2(name, index);
  }
  function deserializationNamesMap$lambda($descriptor, $this_deserializationNamesMap) {
    return function () {
      return buildDeserializationNamesMap($descriptor, $this_deserializationNamesMap);
    };
  }
  function serializationNamesIndices$lambda($this_serializationNamesIndices, $strategy) {
    return function () {
      var tmp = 0;
      var tmp_0 = $this_serializationNamesIndices.w1l();
      // Inline function 'kotlin.arrayOfNulls' call
      var tmp_1 = Array(tmp_0);
      while (tmp < tmp_0) {
        var tmp_2 = tmp;
        var baseName = $this_serializationNamesIndices.y1l(tmp_2);
        tmp_1[tmp_2] = $strategy.d3y($this_serializationNamesIndices, tmp_2, baseName);
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
    var newSize = imul($this.g3y_1, 2);
    $this.e3y_1 = copyOf($this.e3y_1, newSize);
    $this.f3y_1 = copyOf_0($this.f3y_1, newSize);
  }
  function JsonPath() {
    var tmp = this;
    // Inline function 'kotlin.arrayOfNulls' call
    tmp.e3y_1 = Array(8);
    var tmp_0 = this;
    var tmp_1 = 0;
    var tmp_2 = new Int32Array(8);
    while (tmp_1 < 8) {
      tmp_2[tmp_1] = -1;
      tmp_1 = tmp_1 + 1 | 0;
    }
    tmp_0.f3y_1 = tmp_2;
    this.g3y_1 = -1;
  }
  protoOf(JsonPath).h3y = function (sd) {
    this.g3y_1 = this.g3y_1 + 1 | 0;
    var depth = this.g3y_1;
    if (depth === this.e3y_1.length) {
      resize(this);
    }
    this.e3y_1[depth] = sd;
  };
  protoOf(JsonPath).i3y = function (index) {
    this.f3y_1[this.g3y_1] = index;
  };
  protoOf(JsonPath).j3y = function (key) {
    var tmp;
    if (!(this.f3y_1[this.g3y_1] === -2)) {
      this.g3y_1 = this.g3y_1 + 1 | 0;
      tmp = this.g3y_1 === this.e3y_1.length;
    } else {
      tmp = false;
    }
    if (tmp) {
      resize(this);
    }
    this.e3y_1[this.g3y_1] = key;
    this.f3y_1[this.g3y_1] = -2;
  };
  protoOf(JsonPath).k3y = function () {
    if (this.f3y_1[this.g3y_1] === -2) {
      this.e3y_1[this.g3y_1] = Tombstone_instance;
    }
  };
  protoOf(JsonPath).l3y = function () {
    var depth = this.g3y_1;
    if (this.f3y_1[depth] === -2) {
      this.f3y_1[depth] = -1;
      this.g3y_1 = this.g3y_1 - 1 | 0;
    }
    if (!(this.g3y_1 === -1)) {
      this.g3y_1 = this.g3y_1 - 1 | 0;
    }
  };
  protoOf(JsonPath).m3y = function () {
    // Inline function 'kotlin.text.buildString' call
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$();
    this_0.z7('$');
    // Inline function 'kotlin.repeat' call
    var times = this.g3y_1 + 1 | 0;
    var inductionVariable = 0;
    if (inductionVariable < times)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var element = this.e3y_1[index];
        if (!(element == null) ? isInterface(element, SerialDescriptor) : false) {
          if (equals(element.u1l(), LIST_getInstance())) {
            if (!(this.f3y_1[index] === -1)) {
              this_0.z7('[');
              this_0.nc(this.f3y_1[index]);
              this_0.z7(']');
            }
          } else {
            var idx = this.f3y_1[index];
            if (idx >= 0) {
              this_0.z7('.');
              this_0.z7(element.y1l(idx));
            }
          }
        } else {
          if (!(element === Tombstone_instance)) {
            this_0.z7('[');
            this_0.z7("'");
            this_0.y7(element);
            this_0.z7("'");
            this_0.z7(']');
          }
        }
      }
       while (inductionVariable < times);
    return this_0.toString();
  };
  protoOf(JsonPath).toString = function () {
    return this.m3y();
  };
  function encodeByWriter(json, writer, serializer, value) {
    var tmp = WriteMode_OBJ_getInstance();
    // Inline function 'kotlin.arrayOfNulls' call
    var size = get_entries().j();
    var tmp$ret$0 = Array(size);
    var encoder = StreamingJsonEncoder_init_$Create$(writer, json, tmp, tmp$ret$0);
    encoder.i1p(serializer, value);
  }
  function readObject($this) {
    // Inline function 'kotlinx.serialization.json.internal.JsonTreeReader.readObjectImpl' call
    var lastToken = $this.w3y_1.a3z(6);
    if ($this.w3y_1.b3z() === 4) {
      $this.w3y_1.z3x('Unexpected leading comma');
    }
    // Inline function 'kotlin.collections.linkedMapOf' call
    var result = LinkedHashMap_init_$Create$();
    $l$loop: while ($this.w3y_1.c3z()) {
      var key = $this.x3y_1 ? $this.w3y_1.e3z() : $this.w3y_1.d3z();
      $this.w3y_1.a3z(5);
      var element = $this.f3z();
      // Inline function 'kotlin.collections.set' call
      result.h2(key, element);
      lastToken = $this.w3y_1.g3z();
      var tmp0_subject = lastToken;
      if (tmp0_subject !== 4)
        if (tmp0_subject === 7)
          break $l$loop;
        else {
          $this.w3y_1.z3x('Expected end of the object or comma');
        }
    }
    if (lastToken === 6) {
      $this.w3y_1.a3z(7);
    } else if (lastToken === 4) {
      if (!$this.y3y_1) {
        invalidTrailingComma($this.w3y_1);
      }
      $this.w3y_1.a3z(7);
    }
    return new JsonObject(result);
  }
  function readObject_0($this, _this__u8e3s4, $completion) {
    var tmp = new $readObjectCOROUTINE$0($this, _this__u8e3s4, $completion);
    tmp.w8_1 = Unit_instance;
    tmp.x8_1 = null;
    return tmp.c9();
  }
  function readArray($this) {
    var lastToken = $this.w3y_1.g3z();
    if ($this.w3y_1.b3z() === 4) {
      $this.w3y_1.z3x('Unexpected leading comma');
    }
    // Inline function 'kotlin.collections.arrayListOf' call
    var result = ArrayList_init_$Create$();
    while ($this.w3y_1.c3z()) {
      var element = $this.f3z();
      result.e(element);
      lastToken = $this.w3y_1.g3z();
      if (!(lastToken === 4)) {
        var tmp0 = $this.w3y_1;
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.require' call
        var condition = lastToken === 9;
        var position = tmp0.q3t_1;
        if (!condition) {
          var tmp$ret$1 = 'Expected end of the array or comma';
          tmp0.z3x(tmp$ret$1, position);
        }
      }
    }
    if (lastToken === 8) {
      $this.w3y_1.a3z(9);
    } else if (lastToken === 4) {
      if (!$this.y3y_1) {
        invalidTrailingComma($this.w3y_1, 'array');
      }
      $this.w3y_1.a3z(9);
    }
    return new JsonArray(result);
  }
  function readValue($this, isString) {
    var tmp;
    if ($this.x3y_1 || !isString) {
      tmp = $this.w3y_1.e3z();
    } else {
      tmp = $this.w3y_1.d3z();
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
    this.e40_1 = this$0;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(JsonTreeReader$readDeepRecursive$slambda).j40 = function ($this$DeepRecursiveFunction, it, $completion) {
    var tmp = this.k40($this$DeepRecursiveFunction, it, $completion);
    tmp.w8_1 = Unit_instance;
    tmp.x8_1 = null;
    return tmp.c9();
  };
  protoOf(JsonTreeReader$readDeepRecursive$slambda).n9 = function (p1, p2, $completion) {
    var tmp = p1 instanceof DeepRecursiveScope ? p1 : THROW_CCE();
    return this.j40(tmp, p2 instanceof Unit ? p2 : THROW_CCE(), $completion);
  };
  protoOf(JsonTreeReader$readDeepRecursive$slambda).c9 = function () {
    var suspendResult = this.w8_1;
    $sm: do
      try {
        var tmp = this.u8_1;
        switch (tmp) {
          case 0:
            this.v8_1 = 3;
            this.h40_1 = this.e40_1.w3y_1.b3z();
            if (this.h40_1 === 1) {
              this.i40_1 = readValue(this.e40_1, true);
              this.u8_1 = 2;
              continue $sm;
            } else {
              if (this.h40_1 === 0) {
                this.i40_1 = readValue(this.e40_1, false);
                this.u8_1 = 2;
                continue $sm;
              } else {
                if (this.h40_1 === 6) {
                  this.u8_1 = 1;
                  suspendResult = readObject_0(this.e40_1, this.f40_1, this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  if (this.h40_1 === 8) {
                    this.i40_1 = readArray(this.e40_1);
                    this.u8_1 = 2;
                    continue $sm;
                  } else {
                    var tmp_0 = this;
                    this.e40_1.w3y_1.z3x("Can't begin reading element, unexpected token");
                  }
                }
              }
            }

            break;
          case 1:
            this.i40_1 = suspendResult;
            this.u8_1 = 2;
            continue $sm;
          case 2:
            return this.i40_1;
          case 3:
            throw this.x8_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.v8_1 === 3) {
          throw e;
        } else {
          this.u8_1 = this.v8_1;
          this.x8_1 = e;
        }
      }
     while (true);
  };
  protoOf(JsonTreeReader$readDeepRecursive$slambda).k40 = function ($this$DeepRecursiveFunction, it, completion) {
    var i = new JsonTreeReader$readDeepRecursive$slambda(this.e40_1, completion);
    i.f40_1 = $this$DeepRecursiveFunction;
    i.g40_1 = it;
    return i;
  };
  function JsonTreeReader$readDeepRecursive$slambda_0(this$0, resultContinuation) {
    var i = new JsonTreeReader$readDeepRecursive$slambda(this$0, resultContinuation);
    var l = function ($this$DeepRecursiveFunction, it, $completion) {
      return i.j40($this$DeepRecursiveFunction, it, $completion);
    };
    l.$arity = 2;
    return l;
  }
  function $readObjectCOROUTINE$0(_this__u8e3s4, _this__u8e3s4_0, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.p3z_1 = _this__u8e3s4;
    this.q3z_1 = _this__u8e3s4_0;
  }
  protoOf($readObjectCOROUTINE$0).c9 = function () {
    var suspendResult = this.w8_1;
    $sm: do
      try {
        var tmp = this.u8_1;
        switch (tmp) {
          case 0:
            this.v8_1 = 5;
            var tmp_0 = this;
            tmp_0.r3z_1 = this.p3z_1;
            this.s3z_1 = this.r3z_1;
            this.t3z_1 = this.s3z_1.w3y_1.a3z(6);
            if (this.s3z_1.w3y_1.b3z() === 4) {
              this.s3z_1.w3y_1.z3x('Unexpected leading comma');
            }

            var tmp_1 = this;
            tmp_1.u3z_1 = LinkedHashMap_init_$Create$();
            this.u8_1 = 1;
            continue $sm;
          case 1:
            if (!this.s3z_1.w3y_1.c3z()) {
              this.u8_1 = 4;
              continue $sm;
            }

            this.v3z_1 = this.s3z_1.x3y_1 ? this.s3z_1.w3y_1.e3z() : this.s3z_1.w3y_1.d3z();
            this.s3z_1.w3y_1.a3z(5);
            this.u8_1 = 2;
            suspendResult = this.q3z_1.il(Unit_instance, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            var element = suspendResult;
            var tmp0 = this.u3z_1;
            var key = this.v3z_1;
            tmp0.h2(key, element);
            this.t3z_1 = this.s3z_1.w3y_1.g3z();
            var tmp0_subject = this.t3z_1;
            if (tmp0_subject === 4) {
              this.u8_1 = 3;
              continue $sm;
            } else {
              if (tmp0_subject === 7) {
                this.u8_1 = 4;
                continue $sm;
              } else {
                this.s3z_1.w3y_1.z3x('Expected end of the object or comma');
              }
            }

            break;
          case 3:
            this.u8_1 = 1;
            continue $sm;
          case 4:
            if (this.t3z_1 === 6) {
              this.s3z_1.w3y_1.a3z(7);
            } else if (this.t3z_1 === 4) {
              if (!this.s3z_1.y3y_1) {
                invalidTrailingComma(this.s3z_1.w3y_1);
              }
              this.s3z_1.w3y_1.a3z(7);
            }

            return new JsonObject(this.u3z_1);
          case 5:
            throw this.x8_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.v8_1 === 5) {
          throw e;
        } else {
          this.u8_1 = this.v8_1;
          this.x8_1 = e;
        }
      }
     while (true);
  };
  function JsonTreeReader(configuration, lexer) {
    this.w3y_1 = lexer;
    this.x3y_1 = configuration.q3u_1;
    this.y3y_1 = configuration.c3v_1;
    this.z3y_1 = 0;
  }
  protoOf(JsonTreeReader).f3z = function () {
    var token = this.w3y_1.b3z();
    var tmp;
    if (token === 1) {
      tmp = readValue(this, true);
    } else if (token === 0) {
      tmp = readValue(this, false);
    } else if (token === 6) {
      var tmp_0;
      this.z3y_1 = this.z3y_1 + 1 | 0;
      if (this.z3y_1 === 200) {
        tmp_0 = readDeepRecursive(this);
      } else {
        tmp_0 = readObject(this);
      }
      var result = tmp_0;
      this.z3y_1 = this.z3y_1 - 1 | 0;
      tmp = result;
    } else if (token === 8) {
      tmp = readArray(this);
    } else {
      this.w3y_1.z3x('Cannot read Json element because of unexpected ' + tokenDescription(token));
    }
    return tmp;
  };
  function classDiscriminator(_this__u8e3s4, json) {
    var _iterator__ex2g4s = _this__u8e3s4.x1l().g();
    while (_iterator__ex2g4s.h()) {
      var annotation = _iterator__ex2g4s.i();
      if (annotation instanceof JsonClassDiscriminator)
        return annotation.l40_1;
    }
    return json.y3s_1.x3u_1;
  }
  function validateIfSealed(serializer, actualSerializer, classDiscriminator) {
    if (!(serializer instanceof SealedClassSerializer))
      return Unit_instance;
    if (jsonCachedSerialNames(actualSerializer.p1k()).r(classDiscriminator)) {
      var baseName = serializer.p1k().t1l();
      var actualName = actualSerializer.p1k().t1l();
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
    var kind = descriptor.u1l();
    var tmp;
    if (kind instanceof PolymorphicKind) {
      tmp = true;
    } else {
      tmp = equals(kind, CONTEXTUAL_getInstance());
    }
    if (tmp) {
      throw IllegalArgumentException_init_$Create$('Serializer for ' + actualClass.ua() + " can't be registered as a subclass for polymorphic serialization " + ('because its kind ' + kind.toString() + ' is not concrete. To work with multiple hierarchies, register it as a base class.'));
    }
    if ($this.m40_1)
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
      throw IllegalArgumentException_init_$Create$('Serializer for ' + actualClass.ua() + ' of kind ' + kind.toString() + ' cannot be serialized polymorphically with class discriminator.');
    }
  }
  function checkDiscriminatorCollisions($this, descriptor, actualClass) {
    var inductionVariable = 0;
    var last = descriptor.w1l();
    if (inductionVariable < last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var name = descriptor.y1l(i);
        if (name === $this.n40_1) {
          throw IllegalArgumentException_init_$Create$('Polymorphic serializer for ' + toString(actualClass) + " has property '" + name + "' that conflicts " + 'with JSON class discriminator. You can either change class discriminator in JsonConfiguration, ' + 'rename property with @SerialName annotation ' + 'or fall back to array polymorphism');
        }
      }
       while (inductionVariable < last);
  }
  function PolymorphismValidator(useArrayPolymorphism, discriminator) {
    this.m40_1 = useArrayPolymorphism;
    this.n40_1 = discriminator;
  }
  protoOf(PolymorphismValidator).a25 = function (kClass, provider) {
  };
  protoOf(PolymorphismValidator).d25 = function (baseClass, actualClass, actualSerializer) {
    var descriptor = actualSerializer.p1k();
    checkKind_0(this, descriptor, actualClass);
    if (!this.m40_1) {
      checkDiscriminatorCollisions(this, descriptor, actualClass);
    }
  };
  protoOf(PolymorphismValidator).e25 = function (baseClass, defaultSerializerProvider) {
  };
  protoOf(PolymorphismValidator).f25 = function (baseClass, defaultDeserializerProvider) {
  };
  function Key() {
  }
  function DescriptorSchemaCache() {
    this.a3y_1 = createMapForCache(16);
  }
  protoOf(DescriptorSchemaCache).o40 = function (descriptor, key, value) {
    // Inline function 'kotlin.collections.getOrPut' call
    var this_0 = this.a3y_1;
    var value_0 = this_0.e2(descriptor);
    var tmp;
    if (value_0 == null) {
      var answer = createMapForCache(2);
      this_0.h2(descriptor, answer);
      tmp = answer;
    } else {
      tmp = value_0;
    }
    var tmp2 = tmp;
    var tmp3 = key instanceof Key ? key : THROW_CCE();
    // Inline function 'kotlin.collections.set' call
    var value_1 = !(value == null) ? value : THROW_CCE();
    tmp2.h2(tmp3, value_1);
  };
  protoOf(DescriptorSchemaCache).b3y = function (descriptor, key, defaultValue) {
    var tmp0_safe_receiver = this.p40(descriptor, key);
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      return tmp0_safe_receiver;
    }
    var value = defaultValue();
    this.o40(descriptor, key, value);
    return value;
  };
  protoOf(DescriptorSchemaCache).p40 = function (descriptor, key) {
    var tmp0_safe_receiver = this.a3y_1.e2(descriptor);
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      tmp = tmp0_safe_receiver.e2(key instanceof Key ? key : THROW_CCE());
    }
    var tmp_0 = tmp;
    return !(tmp_0 == null) ? tmp_0 : null;
  };
  function DiscriminatorHolder(discriminatorToSkip) {
    this.q40_1 = discriminatorToSkip;
  }
  function trySkip($this, _this__u8e3s4, unknownKey) {
    if (_this__u8e3s4 == null)
      return false;
    if (_this__u8e3s4.q40_1 === unknownKey) {
      _this__u8e3s4.q40_1 = null;
      return true;
    }
    return false;
  }
  function skipLeftoverElements($this, descriptor) {
    while (!($this.h1o(descriptor) === -1)) {
    }
  }
  function checkLeadingComma($this) {
    if ($this.k3t_1.b3z() === 4) {
      $this.k3t_1.z3x('Unexpected leading comma');
    }
  }
  function decodeMapIndex($this) {
    var hasComma = false;
    var decodingKey = !(($this.m3t_1 % 2 | 0) === 0);
    if (decodingKey) {
      if (!($this.m3t_1 === -1)) {
        hasComma = $this.k3t_1.s40();
      }
    } else {
      $this.k3t_1.r40(_Char___init__impl__6a9atx(58));
    }
    var tmp;
    if ($this.k3t_1.c3z()) {
      if (decodingKey) {
        if ($this.m3t_1 === -1) {
          var tmp0 = $this.k3t_1;
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.require' call
          var condition = !hasComma;
          var position = tmp0.q3t_1;
          if (!condition) {
            var tmp$ret$0 = 'Unexpected leading comma';
            tmp0.z3x(tmp$ret$0, position);
          }
        } else {
          var tmp3 = $this.k3t_1;
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.require' call
          var condition_0 = hasComma;
          var position_0 = tmp3.q3t_1;
          if (!condition_0) {
            var tmp$ret$2 = 'Expected comma after the key-value pair';
            tmp3.z3x(tmp$ret$2, position_0);
          }
        }
      }
      $this.m3t_1 = $this.m3t_1 + 1 | 0;
      tmp = $this.m3t_1;
    } else {
      if (hasComma && !$this.i3t_1.y3s_1.c3v_1) {
        invalidTrailingComma($this.k3t_1);
      }
      tmp = -1;
    }
    return tmp;
  }
  function coerceInputValue($this, descriptor, index) {
    var tmp0 = $this.i3t_1;
    var tmp$ret$1;
    $l$block_2: {
      // Inline function 'kotlinx.serialization.json.internal.tryCoerceValue' call
      var isOptional = descriptor.c1m(index);
      var elementDescriptor = descriptor.b1m(index);
      var tmp;
      if (isOptional && !elementDescriptor.p1l()) {
        tmp = $this.k3t_1.t40(true);
      } else {
        tmp = false;
      }
      if (tmp) {
        tmp$ret$1 = true;
        break $l$block_2;
      }
      if (equals(elementDescriptor.u1l(), ENUM_getInstance())) {
        var tmp_0;
        if (elementDescriptor.p1l()) {
          tmp_0 = $this.k3t_1.t40(false);
        } else {
          tmp_0 = false;
        }
        if (tmp_0) {
          tmp$ret$1 = false;
          break $l$block_2;
        }
        var tmp0_elvis_lhs = $this.k3t_1.u40($this.o3t_1.q3u_1);
        var tmp_1;
        if (tmp0_elvis_lhs == null) {
          tmp$ret$1 = false;
          break $l$block_2;
        } else {
          tmp_1 = tmp0_elvis_lhs;
        }
        var enumValue = tmp_1;
        var enumIndex = getJsonNameIndex(elementDescriptor, tmp0, enumValue);
        var coerceToNull = !tmp0.y3s_1.t3u_1 && elementDescriptor.p1l();
        if (enumIndex === -3 && (isOptional || coerceToNull)) {
          $this.k3t_1.d3z();
          tmp$ret$1 = true;
          break $l$block_2;
        }
      }
      tmp$ret$1 = false;
    }
    return tmp$ret$1;
  }
  function decodeObjectIndex($this, descriptor) {
    var hasComma = $this.k3t_1.s40();
    while ($this.k3t_1.c3z()) {
      hasComma = false;
      var key = decodeStringKey($this);
      $this.k3t_1.r40(_Char___init__impl__6a9atx(58));
      var index = getJsonNameIndex(descriptor, $this.i3t_1, key);
      var tmp;
      if (!(index === -3)) {
        var tmp_0;
        if ($this.o3t_1.v3u_1 && coerceInputValue($this, descriptor, index)) {
          hasComma = $this.k3t_1.s40();
          tmp_0 = false;
        } else {
          var tmp0_safe_receiver = $this.p3t_1;
          if (tmp0_safe_receiver == null)
            null;
          else {
            tmp0_safe_receiver.w3x(index);
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
    if (hasComma && !$this.i3t_1.y3s_1.c3v_1) {
      invalidTrailingComma($this.k3t_1);
    }
    var tmp1_safe_receiver = $this.p3t_1;
    var tmp2_elvis_lhs = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.x3x();
    return tmp2_elvis_lhs == null ? -1 : tmp2_elvis_lhs;
  }
  function handleUnknown($this, key) {
    if ($this.o3t_1.p3u_1 || trySkip($this, $this.n3t_1, key)) {
      $this.k3t_1.w40($this.o3t_1.q3u_1);
    } else {
      $this.k3t_1.v40(key);
    }
    return $this.k3t_1.s40();
  }
  function decodeListIndex($this) {
    var hasComma = $this.k3t_1.s40();
    var tmp;
    if ($this.k3t_1.c3z()) {
      if (!($this.m3t_1 === -1) && !hasComma) {
        $this.k3t_1.z3x('Expected end of the array or comma');
      }
      $this.m3t_1 = $this.m3t_1 + 1 | 0;
      tmp = $this.m3t_1;
    } else {
      if (hasComma && !$this.i3t_1.y3s_1.c3v_1) {
        invalidTrailingComma($this.k3t_1, 'array');
      }
      tmp = -1;
    }
    return tmp;
  }
  function decodeStringKey($this) {
    var tmp;
    if ($this.o3t_1.q3u_1) {
      tmp = $this.k3t_1.y40();
    } else {
      tmp = $this.k3t_1.x40();
    }
    return tmp;
  }
  function StreamingJsonDecoder(json, mode, lexer, descriptor, discriminatorHolder) {
    AbstractDecoder.call(this);
    this.i3t_1 = json;
    this.j3t_1 = mode;
    this.k3t_1 = lexer;
    this.l3t_1 = this.i3t_1.f1o();
    this.m3t_1 = -1;
    this.n3t_1 = discriminatorHolder;
    this.o3t_1 = this.i3t_1.y3s_1;
    this.p3t_1 = this.o3t_1.t3u_1 ? null : new JsonElementMarker(descriptor);
  }
  protoOf(StreamingJsonDecoder).f3v = function () {
    return this.i3t_1;
  };
  protoOf(StreamingJsonDecoder).f1o = function () {
    return this.l3t_1;
  };
  protoOf(StreamingJsonDecoder).g3v = function () {
    return (new JsonTreeReader(this.i3t_1.y3s_1, this.k3t_1)).f3z();
  };
  protoOf(StreamingJsonDecoder).p1n = function (deserializer) {
    try {
      var tmp;
      if (!(deserializer instanceof AbstractPolymorphicSerializer)) {
        tmp = true;
      } else {
        tmp = this.i3t_1.y3s_1.w3u_1;
      }
      if (tmp) {
        return deserializer.r1k(this);
      }
      var discriminator = classDiscriminator(deserializer.p1k(), this.i3t_1);
      var tmp0_elvis_lhs = this.k3t_1.z40(discriminator, this.o3t_1.q3u_1);
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
            tmp_1 = this.f3v().y3s_1.w3u_1;
          }
          if (tmp_1) {
            tmp$ret$0 = tmp1.r1k(this);
            break $l$block;
          }
          var discriminator_0 = classDiscriminator(tmp1.p1k(), this.f3v());
          var tmp0 = this.g3v();
          // Inline function 'kotlinx.serialization.json.internal.cast' call
          var serialName = tmp1.p1k().t1l();
          if (!(tmp0 instanceof JsonObject)) {
            var tmp_2 = getKClass(JsonObject).ua();
            var tmp_3 = getKClassFromExpression(tmp0).ua();
            var tmp$ret$1 = this.k3t_1.r3t_1.m3y();
            throw JsonDecodingException_0(-1, 'Expected ' + tmp_2 + ', but had ' + tmp_3 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$1, toString(tmp0));
          }
          var jsonTree = tmp0;
          var tmp0_safe_receiver = jsonTree.yd(discriminator_0);
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
          tmp$ret$0 = readPolymorphicJson(this.f3v(), discriminator_0, jsonTree, actualSerializer);
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
          this.k3t_1.z3x(message, VOID, hint);
        } else {
          throw $p;
        }
        tmp_7 = tmp_8;
      }
      var tmp_9 = tmp_7;
      var actualSerializer_0 = isInterface(tmp_9, DeserializationStrategy) ? tmp_9 : THROW_CCE();
      this.n3t_1 = new DiscriminatorHolder(discriminator);
      return actualSerializer_0.r1k(this);
    } catch ($p) {
      if ($p instanceof MissingFieldException) {
        var e = $p;
        if (contains_0(ensureNotNull(e.message), 'at path'))
          throw e;
        throw new MissingFieldException(e.j1l_1, plus(e.message, ' at path: ') + this.k3t_1.r3t_1.m3y(), e);
      } else {
        throw $p;
      }
    }
  };
  protoOf(StreamingJsonDecoder).q1n = function (descriptor) {
    var newMode = switchMode(this.i3t_1, descriptor);
    this.k3t_1.r3t_1.h3y(descriptor);
    this.k3t_1.r40(newMode.c41_1);
    checkLeadingComma(this);
    var tmp;
    switch (newMode.l2_1) {
      case 1:
      case 2:
      case 3:
        tmp = new StreamingJsonDecoder(this.i3t_1, newMode, this.k3t_1, descriptor, this.n3t_1);
        break;
      default:
        var tmp_0;
        if (this.j3t_1.equals(newMode) && this.i3t_1.y3s_1.t3u_1) {
          tmp_0 = this;
        } else {
          tmp_0 = new StreamingJsonDecoder(this.i3t_1, newMode, this.k3t_1, descriptor, this.n3t_1);
        }

        tmp = tmp_0;
        break;
    }
    return tmp;
  };
  protoOf(StreamingJsonDecoder).r1n = function (descriptor) {
    if (this.i3t_1.y3s_1.p3u_1 && descriptor.w1l() === 0) {
      skipLeftoverElements(this, descriptor);
    }
    if (this.k3t_1.s40() && !this.i3t_1.y3s_1.c3v_1) {
      invalidTrailingComma(this.k3t_1, '');
    }
    this.k3t_1.r40(this.j3t_1.d41_1);
    this.k3t_1.r3t_1.l3y();
  };
  protoOf(StreamingJsonDecoder).b1n = function () {
    var tmp;
    var tmp0_safe_receiver = this.p3t_1;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.v3x_1;
    if (!(tmp1_elvis_lhs == null ? false : tmp1_elvis_lhs)) {
      tmp = !this.k3t_1.e41();
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(StreamingJsonDecoder).c1n = function () {
    return null;
  };
  protoOf(StreamingJsonDecoder).c1o = function (descriptor, index, deserializer, previousValue) {
    var isMapKey = this.j3t_1.equals(WriteMode_MAP_getInstance()) && (index & 1) === 0;
    if (isMapKey) {
      this.k3t_1.r3t_1.k3y();
    }
    var value = protoOf(AbstractDecoder).c1o.call(this, descriptor, index, deserializer, previousValue);
    if (isMapKey) {
      this.k3t_1.r3t_1.j3y(value);
    }
    return value;
  };
  protoOf(StreamingJsonDecoder).h1o = function (descriptor) {
    var index;
    switch (this.j3t_1.l2_1) {
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
    if (!this.j3t_1.equals(WriteMode_MAP_getInstance())) {
      this.k3t_1.r3t_1.i3y(index);
    }
    return index;
  };
  protoOf(StreamingJsonDecoder).d1n = function () {
    return this.k3t_1.f41();
  };
  protoOf(StreamingJsonDecoder).e1n = function () {
    var value = this.k3t_1.p3v();
    if (!value.equals(toLong(value.g3()))) {
      this.k3t_1.z3x("Failed to parse byte for input '" + value.toString() + "'");
    }
    return value.g3();
  };
  protoOf(StreamingJsonDecoder).f1n = function () {
    var value = this.k3t_1.p3v();
    if (!value.equals(toLong(value.h3()))) {
      this.k3t_1.z3x("Failed to parse short for input '" + value.toString() + "'");
    }
    return value.h3();
  };
  protoOf(StreamingJsonDecoder).g1n = function () {
    var value = this.k3t_1.p3v();
    if (!value.equals(toLong(value.g1()))) {
      this.k3t_1.z3x("Failed to parse int for input '" + value.toString() + "'");
    }
    return value.g1();
  };
  protoOf(StreamingJsonDecoder).h1n = function () {
    return this.k3t_1.p3v();
  };
  protoOf(StreamingJsonDecoder).i1n = function () {
    var tmp0 = this.k3t_1;
    var tmp$ret$4;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.parseString' call
      var input = tmp0.e3z();
      try {
        // Inline function 'kotlin.text.toFloat' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        tmp$ret$4 = toDouble(input);
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          tmp0.z3x("Failed to parse type '" + 'float' + "' for input '" + input + "'");
        } else {
          throw $p;
        }
      }
    }
    var result = tmp$ret$4;
    var specialFp = this.i3t_1.y3s_1.y3u_1;
    if (specialFp || isFinite(result))
      return result;
    throwInvalidFloatingPointDecoded(this.k3t_1, result);
  };
  protoOf(StreamingJsonDecoder).j1n = function () {
    var tmp0 = this.k3t_1;
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.parseString' call
      var input = tmp0.e3z();
      try {
        tmp$ret$1 = toDouble(input);
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          tmp0.z3x("Failed to parse type '" + 'double' + "' for input '" + input + "'");
        } else {
          throw $p;
        }
      }
    }
    var result = tmp$ret$1;
    var specialFp = this.i3t_1.y3s_1.y3u_1;
    if (specialFp || isFinite_0(result))
      return result;
    throwInvalidFloatingPointDecoded(this.k3t_1, result);
  };
  protoOf(StreamingJsonDecoder).k1n = function () {
    var string = this.k3t_1.e3z();
    if (!(string.length === 1)) {
      this.k3t_1.z3x("Expected single char, but got '" + string + "'");
    }
    return charSequenceGet(string, 0);
  };
  protoOf(StreamingJsonDecoder).l1n = function () {
    var tmp;
    if (this.o3t_1.q3u_1) {
      tmp = this.k3t_1.y40();
    } else {
      tmp = this.k3t_1.d3z();
    }
    return tmp;
  };
  protoOf(StreamingJsonDecoder).n1n = function (descriptor) {
    return get_isUnsignedNumber(descriptor) ? new JsonDecoderForUnsignedTypes(this.k3t_1, this.i3t_1) : protoOf(AbstractDecoder).n1n.call(this, descriptor);
  };
  protoOf(StreamingJsonDecoder).m1n = function (enumDescriptor) {
    return getJsonNameIndexOrThrow(enumDescriptor, this.i3t_1, this.l1n(), ' at path ' + this.k3t_1.r3t_1.m3y());
  };
  function JsonDecoderForUnsignedTypes(lexer, json) {
    AbstractDecoder.call(this);
    this.g41_1 = lexer;
    this.h41_1 = json.f1o();
  }
  protoOf(JsonDecoderForUnsignedTypes).f1o = function () {
    return this.h41_1;
  };
  protoOf(JsonDecoderForUnsignedTypes).h1o = function (descriptor) {
    var message = 'unsupported';
    throw IllegalStateException_init_$Create$(toString(message));
  };
  protoOf(JsonDecoderForUnsignedTypes).g1n = function () {
    var tmp0 = this.g41_1;
    var tmp$ret$2;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.parseString' call
      var input = tmp0.e3z();
      try {
        // Inline function 'kotlin.UInt.toInt' call
        var this_0 = toUInt(input);
        tmp$ret$2 = _UInt___get_data__impl__f0vqqw(this_0);
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          tmp0.z3x("Failed to parse type '" + 'UInt' + "' for input '" + input + "'");
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$2;
  };
  protoOf(JsonDecoderForUnsignedTypes).h1n = function () {
    var tmp0 = this.g41_1;
    var tmp$ret$2;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.parseString' call
      var input = tmp0.e3z();
      try {
        // Inline function 'kotlin.ULong.toLong' call
        var this_0 = toULong(input);
        tmp$ret$2 = _ULong___get_data__impl__fggpzb(this_0);
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          tmp0.z3x("Failed to parse type '" + 'ULong' + "' for input '" + input + "'");
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$2;
  };
  protoOf(JsonDecoderForUnsignedTypes).e1n = function () {
    var tmp0 = this.g41_1;
    var tmp$ret$2;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.parseString' call
      var input = tmp0.e3z();
      try {
        // Inline function 'kotlin.UByte.toByte' call
        var this_0 = toUByte(input);
        tmp$ret$2 = _UByte___get_data__impl__jof9qr(this_0);
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          tmp0.z3x("Failed to parse type '" + 'UByte' + "' for input '" + input + "'");
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$2;
  };
  protoOf(JsonDecoderForUnsignedTypes).f1n = function () {
    var tmp0 = this.g41_1;
    var tmp$ret$2;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.parseString' call
      var input = tmp0.e3z();
      try {
        // Inline function 'kotlin.UShort.toShort' call
        var this_0 = toUShort(input);
        tmp$ret$2 = _UShort___get_data__impl__g0245(this_0);
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          tmp0.z3x("Failed to parse type '" + 'UShort' + "' for input '" + input + "'");
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
    $this.n3y_1.t3w();
    $this.u1o(discriminator);
    $this.n3y_1.w3w(_Char___init__impl__6a9atx(58));
    $this.n3y_1.v3w();
    $this.u1o(serialName);
  }
  function StreamingJsonEncoder(composer, json, mode, modeReuseCache) {
    AbstractEncoder.call(this);
    this.n3y_1 = composer;
    this.o3y_1 = json;
    this.p3y_1 = mode;
    this.q3y_1 = modeReuseCache;
    this.r3y_1 = this.o3y_1.f1o();
    this.s3y_1 = this.o3y_1.y3s_1;
    this.t3y_1 = false;
    this.u3y_1 = null;
    this.v3y_1 = null;
    var i = this.p3y_1.l2_1;
    if (!(this.q3y_1 == null)) {
      if (!(this.q3y_1[i] === null) || !(this.q3y_1[i] === this)) {
        this.q3y_1[i] = this;
      }
    }
  }
  protoOf(StreamingJsonEncoder).f3v = function () {
    return this.o3y_1;
  };
  protoOf(StreamingJsonEncoder).f1o = function () {
    return this.r3y_1;
  };
  protoOf(StreamingJsonEncoder).n1p = function (descriptor, index) {
    return this.s3y_1.o3u_1;
  };
  protoOf(StreamingJsonEncoder).i1p = function (serializer, value) {
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.encodePolymorphically' call
      if (this.f3v().y3s_1.w3u_1) {
        serializer.q1k(this, value);
        break $l$block;
      }
      var isPolymorphicSerializer = serializer instanceof AbstractPolymorphicSerializer;
      var tmp;
      if (isPolymorphicSerializer) {
        tmp = !this.f3v().y3s_1.e3v_1.equals(ClassDiscriminatorMode_NONE_getInstance());
      } else {
        var tmp_0;
        switch (this.f3v().y3s_1.e3v_1.l2_1) {
          case 0:
          case 2:
            tmp_0 = false;
            break;
          case 1:
            // Inline function 'kotlin.let' call

            var it = serializer.p1k().u1l();
            tmp_0 = equals(it, CLASS_getInstance()) || equals(it, OBJECT_getInstance());
            break;
          default:
            noWhenBranchMatchedException();
            break;
        }
        tmp = tmp_0;
      }
      var needDiscriminator = tmp;
      var baseClassDiscriminator = needDiscriminator ? classDiscriminator(serializer.p1k(), this.f3v()) : null;
      var tmp_1;
      if (isPolymorphicSerializer) {
        var casted = serializer instanceof AbstractPolymorphicSerializer ? serializer : THROW_CCE();
        $l$block_0: {
          // Inline function 'kotlin.requireNotNull' call
          if (value == null) {
            var message = 'Value for serializer ' + toString(serializer.p1k()) + ' should always be non-null. Please report issue to the kotlinx.serialization tracker.';
            throw IllegalArgumentException_init_$Create$(toString(message));
          } else {
            break $l$block_0;
          }
        }
        var actual = findPolymorphicSerializer_0(casted, this, value);
        if (!(baseClassDiscriminator == null)) {
          access$validateIfSealed$tPolymorphicKt(serializer, actual, baseClassDiscriminator);
        }
        checkKind(actual.p1k().u1l());
        tmp_1 = isInterface(actual, SerializationStrategy) ? actual : THROW_CCE();
      } else {
        tmp_1 = serializer;
      }
      var actualSerializer = tmp_1;
      if (!(baseClassDiscriminator == null)) {
        var serialName = actualSerializer.p1k().t1l();
        this.u3y_1 = baseClassDiscriminator;
        this.v3y_1 = serialName;
      }
      actualSerializer.q1k(this, value);
    }
  };
  protoOf(StreamingJsonEncoder).q1n = function (descriptor) {
    var newMode = switchMode(this.o3y_1, descriptor);
    if (!(newMode.c41_1 === _Char___init__impl__6a9atx(0))) {
      this.n3y_1.w3w(newMode.c41_1);
      this.n3y_1.r3w();
    }
    var discriminator = this.u3y_1;
    if (!(discriminator == null)) {
      var tmp0_elvis_lhs = this.v3y_1;
      encodeTypeInfo(this, discriminator, tmp0_elvis_lhs == null ? descriptor.t1l() : tmp0_elvis_lhs);
      this.u3y_1 = null;
      this.v3y_1 = null;
    }
    if (this.p3y_1.equals(newMode)) {
      return this;
    }
    var tmp1_safe_receiver = this.q3y_1;
    var tmp2_elvis_lhs = tmp1_safe_receiver == null ? null : tmp1_safe_receiver[newMode.l2_1];
    return tmp2_elvis_lhs == null ? new StreamingJsonEncoder(this.n3y_1, this.o3y_1, newMode, this.q3y_1) : tmp2_elvis_lhs;
  };
  protoOf(StreamingJsonEncoder).r1n = function (descriptor) {
    if (!(this.p3y_1.d41_1 === _Char___init__impl__6a9atx(0))) {
      this.n3y_1.s3w();
      this.n3y_1.u3w();
      this.n3y_1.w3w(this.p3y_1.d41_1);
    }
  };
  protoOf(StreamingJsonEncoder).j1o = function (descriptor, index) {
    switch (this.p3y_1.l2_1) {
      case 1:
        if (!this.n3y_1.q3w_1) {
          this.n3y_1.w3w(_Char___init__impl__6a9atx(44));
        }

        this.n3y_1.t3w();
        break;
      case 2:
        if (!this.n3y_1.q3w_1) {
          var tmp = this;
          var tmp_0;
          if ((index % 2 | 0) === 0) {
            this.n3y_1.w3w(_Char___init__impl__6a9atx(44));
            this.n3y_1.t3w();
            tmp_0 = true;
          } else {
            this.n3y_1.w3w(_Char___init__impl__6a9atx(58));
            this.n3y_1.v3w();
            tmp_0 = false;
          }
          tmp.t3y_1 = tmp_0;
        } else {
          this.t3y_1 = true;
          this.n3y_1.t3w();
        }

        break;
      case 3:
        if (index === 0)
          this.t3y_1 = true;
        if (index === 1) {
          this.n3y_1.w3w(_Char___init__impl__6a9atx(44));
          this.n3y_1.v3w();
          this.t3y_1 = false;
        }

        break;
      default:
        if (!this.n3y_1.q3w_1) {
          this.n3y_1.w3w(_Char___init__impl__6a9atx(44));
        }

        this.n3y_1.t3w();
        this.u1o(getJsonElementName(descriptor, this.o3y_1, index));
        this.n3y_1.w3w(_Char___init__impl__6a9atx(58));
        this.n3y_1.v3w();
        break;
    }
    return true;
  };
  protoOf(StreamingJsonEncoder).j1p = function (descriptor, index, serializer, value) {
    if (!(value == null) || this.s3y_1.t3u_1) {
      protoOf(AbstractEncoder).j1p.call(this, descriptor, index, serializer, value);
    }
  };
  protoOf(StreamingJsonEncoder).w1o = function (descriptor) {
    var tmp;
    if (get_isUnsignedNumber(descriptor)) {
      // Inline function 'kotlinx.serialization.json.internal.StreamingJsonEncoder.composerAs' call
      var tmp_0;
      var tmp_1 = this.n3y_1;
      if (tmp_1 instanceof ComposerForUnsignedNumbers) {
        tmp_0 = this.n3y_1;
      } else {
        var tmp1 = this.n3y_1.p3w_1;
        var p1 = this.t3y_1;
        tmp_0 = new ComposerForUnsignedNumbers(tmp1, p1);
      }
      var tmp$ret$1 = tmp_0;
      tmp = new StreamingJsonEncoder(tmp$ret$1, this.o3y_1, this.p3y_1, null);
    } else if (get_isUnquotedLiteral(descriptor)) {
      // Inline function 'kotlinx.serialization.json.internal.StreamingJsonEncoder.composerAs' call
      var tmp_2;
      var tmp_3 = this.n3y_1;
      if (tmp_3 instanceof ComposerForUnquotedLiterals) {
        tmp_2 = this.n3y_1;
      } else {
        var tmp4 = this.n3y_1.p3w_1;
        var p1_0 = this.t3y_1;
        tmp_2 = new ComposerForUnquotedLiterals(tmp4, p1_0);
      }
      var tmp$ret$3 = tmp_2;
      tmp = new StreamingJsonEncoder(tmp$ret$3, this.o3y_1, this.p3y_1, null);
    } else if (!(this.u3y_1 == null)) {
      // Inline function 'kotlin.apply' call
      this.v3y_1 = descriptor.t1l();
      tmp = this;
    } else {
      tmp = protoOf(AbstractEncoder).w1o.call(this, descriptor);
    }
    return tmp;
  };
  protoOf(StreamingJsonEncoder).l1o = function () {
    this.n3y_1.y3w('null');
  };
  protoOf(StreamingJsonEncoder).m1o = function (value) {
    if (this.t3y_1) {
      this.u1o(value.toString());
    } else {
      this.n3y_1.h3x(value);
    }
  };
  protoOf(StreamingJsonEncoder).n1o = function (value) {
    if (this.t3y_1) {
      this.u1o(value.toString());
    } else {
      this.n3y_1.c3x(value);
    }
  };
  protoOf(StreamingJsonEncoder).o1o = function (value) {
    if (this.t3y_1) {
      this.u1o(value.toString());
    } else {
      this.n3y_1.e3x(value);
    }
  };
  protoOf(StreamingJsonEncoder).p1o = function (value) {
    if (this.t3y_1) {
      this.u1o(value.toString());
    } else {
      this.n3y_1.f3x(value);
    }
  };
  protoOf(StreamingJsonEncoder).q1o = function (value) {
    if (this.t3y_1) {
      this.u1o(value.toString());
    } else {
      this.n3y_1.g3x(value);
    }
  };
  protoOf(StreamingJsonEncoder).r1o = function (value) {
    if (this.t3y_1) {
      this.u1o(value.toString());
    } else {
      this.n3y_1.a3x(value);
    }
    if (!this.s3y_1.y3u_1 && !isFinite(value)) {
      throw InvalidFloatingPointEncoded_0(value, toString(this.n3y_1.p3w_1));
    }
  };
  protoOf(StreamingJsonEncoder).s1o = function (value) {
    if (this.t3y_1) {
      this.u1o(value.toString());
    } else {
      this.n3y_1.b3x(value);
    }
    if (!this.s3y_1.y3u_1 && !isFinite_0(value)) {
      throw InvalidFloatingPointEncoded_0(value, toString(this.n3y_1.p3w_1));
    }
  };
  protoOf(StreamingJsonEncoder).t1o = function (value) {
    this.u1o(toString_1(value));
  };
  protoOf(StreamingJsonEncoder).u1o = function (value) {
    return this.n3y_1.i3x(value);
  };
  protoOf(StreamingJsonEncoder).v1o = function (enumDescriptor, index) {
    this.u1o(enumDescriptor.y1l(index));
  };
  function get_isUnsignedNumber(_this__u8e3s4) {
    _init_properties_StreamingJsonEncoder_kt__pn1bsi();
    return _this__u8e3s4.v1l() && get_unsignedNumberDescriptors().r(_this__u8e3s4);
  }
  function get_isUnquotedLiteral(_this__u8e3s4) {
    _init_properties_StreamingJsonEncoder_kt__pn1bsi();
    return _this__u8e3s4.v1l() && equals(_this__u8e3s4, get_jsonUnquotedLiteralDescriptor());
  }
  var properties_initialized_StreamingJsonEncoder_kt_6ifwwk;
  function _init_properties_StreamingJsonEncoder_kt__pn1bsi() {
    if (!properties_initialized_StreamingJsonEncoder_kt_6ifwwk) {
      properties_initialized_StreamingJsonEncoder_kt_6ifwwk = true;
      unsignedNumberDescriptors = setOf([serializer_1(Companion_getInstance_0()).p1k(), serializer_0(Companion_getInstance()).p1k(), serializer_2(Companion_getInstance_1()).p1k(), serializer_3(Companion_getInstance_2()).p1k()]);
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
    _this__u8e3s4.a8(_Char___init__impl__6a9atx(34));
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
          _this__u8e3s4.kc(value, lastPos, i);
          _this__u8e3s4.z7(get_ESCAPE_STRINGS()[c]);
          lastPos = i + 1 | 0;
        }
      }
       while (inductionVariable <= last);
    if (!(lastPos === 0))
      _this__u8e3s4.kc(value, lastPos, value.length);
    else
      _this__u8e3s4.z7(value);
    _this__u8e3s4.a8(_Char___init__impl__6a9atx(34));
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
    return input.p1n(deserializer);
  }
  function unparsedPrimitive($this, literal, primitive, tag) {
    var type = startsWith(primitive, 'i') ? 'an ' + primitive : 'a ' + primitive;
    throw JsonDecodingException_0(-1, "Failed to parse literal '" + literal.toString() + "' as " + type + ' value at element: ' + $this.o41(tag), toString($this.p41()));
  }
  function AbstractJsonTreeDecoder(json, value, polymorphicDiscriminator) {
    polymorphicDiscriminator = polymorphicDiscriminator === VOID ? null : polymorphicDiscriminator;
    NamedValueDecoder.call(this);
    this.k41_1 = json;
    this.l41_1 = value;
    this.m41_1 = polymorphicDiscriminator;
    this.n41_1 = this.f3v().y3s_1;
  }
  protoOf(AbstractJsonTreeDecoder).f3v = function () {
    return this.k41_1;
  };
  protoOf(AbstractJsonTreeDecoder).w = function () {
    return this.l41_1;
  };
  protoOf(AbstractJsonTreeDecoder).f1o = function () {
    return this.f3v().f1o();
  };
  protoOf(AbstractJsonTreeDecoder).p41 = function () {
    var tmp0_safe_receiver = this.w21();
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      tmp = this.q41(tmp0_safe_receiver);
    }
    var tmp1_elvis_lhs = tmp;
    return tmp1_elvis_lhs == null ? this.w() : tmp1_elvis_lhs;
  };
  protoOf(AbstractJsonTreeDecoder).o41 = function (currentTag) {
    return this.u22() + ('.' + currentTag);
  };
  protoOf(AbstractJsonTreeDecoder).g3v = function () {
    return this.p41();
  };
  protoOf(AbstractJsonTreeDecoder).p1n = function (deserializer) {
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.decodeSerializableValuePolymorphic' call
      var tmp;
      if (!(deserializer instanceof AbstractPolymorphicSerializer)) {
        tmp = true;
      } else {
        tmp = this.f3v().y3s_1.w3u_1;
      }
      if (tmp) {
        tmp$ret$0 = deserializer.r1k(this);
        break $l$block;
      }
      var discriminator = classDiscriminator(deserializer.p1k(), this.f3v());
      var tmp0 = this.g3v();
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var serialName = deserializer.p1k().t1l();
      if (!(tmp0 instanceof JsonObject)) {
        var tmp_0 = getKClass(JsonObject).ua();
        var tmp_1 = getKClassFromExpression(tmp0).ua();
        var tmp$ret$1 = this.u22();
        throw JsonDecodingException_0(-1, 'Expected ' + tmp_0 + ', but had ' + tmp_1 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$1, toString(tmp0));
      }
      var jsonTree = tmp0;
      var tmp0_safe_receiver = jsonTree.yd(discriminator);
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
      tmp$ret$0 = readPolymorphicJson(this.f3v(), discriminator, jsonTree, actualSerializer);
    }
    return tmp$ret$0;
  };
  protoOf(AbstractJsonTreeDecoder).x21 = function (parentName, childName) {
    return childName;
  };
  protoOf(AbstractJsonTreeDecoder).q1n = function (descriptor) {
    var currentObject = this.p41();
    var tmp0_subject = descriptor.u1l();
    var tmp;
    var tmp_0;
    if (equals(tmp0_subject, LIST_getInstance())) {
      tmp_0 = true;
    } else {
      tmp_0 = tmp0_subject instanceof PolymorphicKind;
    }
    if (tmp_0) {
      var tmp_1 = this.f3v();
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var serialName = descriptor.t1l();
      if (!(currentObject instanceof JsonArray)) {
        var tmp_2 = getKClass(JsonArray).ua();
        var tmp_3 = getKClassFromExpression(currentObject).ua();
        var tmp$ret$0 = this.u22();
        throw JsonDecodingException_0(-1, 'Expected ' + tmp_2 + ', but had ' + tmp_3 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$0, toString(currentObject));
      }
      tmp = new JsonTreeListDecoder(tmp_1, currentObject);
    } else {
      if (equals(tmp0_subject, MAP_getInstance())) {
        // Inline function 'kotlinx.serialization.json.internal.selectMapMode' call
        var this_0 = this.f3v();
        var keyDescriptor = carrierDescriptor(descriptor.b1m(0), this_0.f1o());
        var keyKind = keyDescriptor.u1l();
        var tmp_4;
        var tmp_5;
        if (keyKind instanceof PrimitiveKind) {
          tmp_5 = true;
        } else {
          tmp_5 = equals(keyKind, ENUM_getInstance());
        }
        if (tmp_5) {
          var tmp_6 = this.f3v();
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
          // Inline function 'kotlinx.serialization.json.internal.cast' call
          var serialName_0 = descriptor.t1l();
          if (!(currentObject instanceof JsonObject)) {
            var tmp_7 = getKClass(JsonObject).ua();
            var tmp_8 = getKClassFromExpression(currentObject).ua();
            var tmp$ret$3 = this.u22();
            throw JsonDecodingException_0(-1, 'Expected ' + tmp_7 + ', but had ' + tmp_8 + ' as the serialized body of ' + serialName_0 + ' at element: ' + tmp$ret$3, toString(currentObject));
          }
          tmp_4 = new JsonTreeMapDecoder(tmp_6, currentObject);
        } else {
          if (this_0.y3s_1.r3u_1) {
            var tmp_9 = this.f3v();
            // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
            // Inline function 'kotlinx.serialization.json.internal.cast' call
            var serialName_1 = descriptor.t1l();
            if (!(currentObject instanceof JsonArray)) {
              var tmp_10 = getKClass(JsonArray).ua();
              var tmp_11 = getKClassFromExpression(currentObject).ua();
              var tmp$ret$7 = this.u22();
              throw JsonDecodingException_0(-1, 'Expected ' + tmp_10 + ', but had ' + tmp_11 + ' as the serialized body of ' + serialName_1 + ' at element: ' + tmp$ret$7, toString(currentObject));
            }
            tmp_4 = new JsonTreeListDecoder(tmp_9, currentObject);
          } else {
            throw InvalidKeyKindException(keyDescriptor);
          }
        }
        tmp = tmp_4;
      } else {
        var tmp_12 = this.f3v();
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
        // Inline function 'kotlinx.serialization.json.internal.cast' call
        var serialName_2 = descriptor.t1l();
        if (!(currentObject instanceof JsonObject)) {
          var tmp_13 = getKClass(JsonObject).ua();
          var tmp_14 = getKClassFromExpression(currentObject).ua();
          var tmp$ret$12 = this.u22();
          throw JsonDecodingException_0(-1, 'Expected ' + tmp_13 + ', but had ' + tmp_14 + ' as the serialized body of ' + serialName_2 + ' at element: ' + tmp$ret$12, toString(currentObject));
        }
        tmp = new JsonTreeDecoder(tmp_12, currentObject, this.m41_1);
      }
    }
    return tmp;
  };
  protoOf(AbstractJsonTreeDecoder).r1n = function (descriptor) {
  };
  protoOf(AbstractJsonTreeDecoder).b1n = function () {
    var tmp = this.p41();
    return !(tmp instanceof JsonNull);
  };
  protoOf(AbstractJsonTreeDecoder).r41 = function (tag, enumDescriptor) {
    var tmp = this.f3v();
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
    var tmp1 = this.q41(tag);
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var serialName = enumDescriptor.t1l();
    if (!(tmp1 instanceof JsonPrimitive)) {
      var tmp_0 = getKClass(JsonPrimitive).ua();
      var tmp_1 = getKClassFromExpression(tmp1).ua();
      var tmp$ret$0 = this.o41(tag);
      throw JsonDecodingException_0(-1, 'Expected ' + tmp_0 + ', but had ' + tmp_1 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$0, toString(tmp1));
    }
    return getJsonNameIndexOrThrow(enumDescriptor, tmp, tmp1.i3v());
  };
  protoOf(AbstractJsonTreeDecoder).g23 = function (tag, enumDescriptor) {
    return this.r41((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), enumDescriptor);
  };
  protoOf(AbstractJsonTreeDecoder).s41 = function (tag) {
    return !(this.q41(tag) === JsonNull_getInstance());
  };
  protoOf(AbstractJsonTreeDecoder).w22 = function (tag) {
    return this.s41((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).t41 = function (tag) {
    var tmp$ret$4;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.q41(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp = getKClass(JsonPrimitive).ua();
        var tmp_0 = getKClassFromExpression(value).ua();
        var tmp$ret$0 = this.o41(tag);
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
  protoOf(AbstractJsonTreeDecoder).x22 = function (tag) {
    return this.t41((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).u41 = function (tag) {
    var tmp$ret$4;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.q41(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp = getKClass(JsonPrimitive).ua();
        var tmp_0 = getKClassFromExpression(value).ua();
        var tmp$ret$0 = this.o41(tag);
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
  protoOf(AbstractJsonTreeDecoder).y22 = function (tag) {
    return this.u41((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).v41 = function (tag) {
    var tmp$ret$4;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.q41(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp = getKClass(JsonPrimitive).ua();
        var tmp_0 = getKClassFromExpression(value).ua();
        var tmp$ret$0 = this.o41(tag);
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
  protoOf(AbstractJsonTreeDecoder).z22 = function (tag) {
    return this.v41((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).w41 = function (tag) {
    var tmp$ret$4;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.q41(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp = getKClass(JsonPrimitive).ua();
        var tmp_0 = getKClassFromExpression(value).ua();
        var tmp$ret$0 = this.o41(tag);
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
  protoOf(AbstractJsonTreeDecoder).a23 = function (tag) {
    return this.w41((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).x41 = function (tag) {
    var tmp$ret$4;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.q41(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp = getKClass(JsonPrimitive).ua();
        var tmp_0 = getKClassFromExpression(value).ua();
        var tmp$ret$0 = this.o41(tag);
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
  protoOf(AbstractJsonTreeDecoder).b23 = function (tag) {
    return this.x41((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).y41 = function (tag) {
    var tmp$ret$4;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.q41(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp = getKClass(JsonPrimitive).ua();
        var tmp_0 = getKClassFromExpression(value).ua();
        var tmp$ret$0 = this.o41(tag);
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
    var specialFp = this.f3v().y3s_1.y3u_1;
    if (specialFp || isFinite(result))
      return result;
    throw InvalidFloatingPointDecoded(result, tag, toString(this.p41()));
  };
  protoOf(AbstractJsonTreeDecoder).c23 = function (tag) {
    return this.y41((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).z41 = function (tag) {
    var tmp$ret$4;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.q41(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp = getKClass(JsonPrimitive).ua();
        var tmp_0 = getKClassFromExpression(value).ua();
        var tmp$ret$0 = this.o41(tag);
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
    var specialFp = this.f3v().y3s_1.y3u_1;
    if (specialFp || isFinite_0(result))
      return result;
    throw InvalidFloatingPointDecoded(result, tag, toString(this.p41()));
  };
  protoOf(AbstractJsonTreeDecoder).d23 = function (tag) {
    return this.z41((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).a42 = function (tag) {
    var tmp$ret$4;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.q41(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp = getKClass(JsonPrimitive).ua();
        var tmp_0 = getKClassFromExpression(value).ua();
        var tmp$ret$0 = this.o41(tag);
        throw JsonDecodingException_0(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'char' + ' at element: ' + tmp$ret$0, toString(value));
      }
      var literal = value;
      try {
        var tmp0_elvis_lhs = new Char(single(literal.i3v()));
        var tmp_1;
        if (tmp0_elvis_lhs == null) {
          unparsedPrimitive(this, literal, 'char', tag);
        } else {
          tmp_1 = tmp0_elvis_lhs;
        }
        tmp$ret$4 = tmp_1.k1_1;
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
  protoOf(AbstractJsonTreeDecoder).e23 = function (tag) {
    return this.a42((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).b42 = function (tag) {
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var value = this.q41(tag);
    if (!(value instanceof JsonPrimitive)) {
      var tmp = getKClass(JsonPrimitive).ua();
      var tmp_0 = getKClassFromExpression(value).ua();
      var tmp$ret$0 = this.o41(tag);
      throw JsonDecodingException_0(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'string' + ' at element: ' + tmp$ret$0, toString(value));
    }
    var value_0 = value;
    if (!(value_0 instanceof JsonLiteral))
      throw JsonDecodingException_0(-1, "Expected string value for a non-null key '" + tag + "', got null literal instead at element: " + this.o41(tag), toString(this.p41()));
    if (!value_0.r3v_1 && !this.f3v().y3s_1.q3u_1) {
      throw JsonDecodingException_0(-1, "String literal for key '" + tag + "' should be quoted at element: " + this.o41(tag) + ".\nUse 'isLenient = true' in 'Json {}' builder to accept non-compliant JSON.", toString(this.p41()));
    }
    return value_0.t3v_1;
  };
  protoOf(AbstractJsonTreeDecoder).f23 = function (tag) {
    return this.b42((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).c42 = function (tag, inlineDescriptor) {
    var tmp;
    if (get_isUnsignedNumber(inlineDescriptor)) {
      var tmp_0 = this.f3v();
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      var tmp1 = this.q41(tag);
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var serialName = inlineDescriptor.t1l();
      if (!(tmp1 instanceof JsonPrimitive)) {
        var tmp_1 = getKClass(JsonPrimitive).ua();
        var tmp_2 = getKClassFromExpression(tmp1).ua();
        var tmp$ret$0 = this.o41(tag);
        throw JsonDecodingException_0(-1, 'Expected ' + tmp_1 + ', but had ' + tmp_2 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$0, toString(tmp1));
      }
      var lexer = StringJsonLexer_0(tmp_0, tmp1.i3v());
      tmp = new JsonDecoderForUnsignedTypes(lexer, this.f3v());
    } else {
      tmp = protoOf(NamedValueDecoder).h23.call(this, tag, inlineDescriptor);
    }
    return tmp;
  };
  protoOf(AbstractJsonTreeDecoder).h23 = function (tag, inlineDescriptor) {
    return this.c42((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), inlineDescriptor);
  };
  protoOf(AbstractJsonTreeDecoder).n1n = function (descriptor) {
    return !(this.w21() == null) ? protoOf(NamedValueDecoder).n1n.call(this, descriptor) : (new JsonPrimitiveDecoder(this.f3v(), this.w(), this.m41_1)).n1n(descriptor);
  };
  function coerceInputValue_0($this, descriptor, index, tag) {
    var tmp0 = $this.f3v();
    var tmp$ret$1;
    $l$block_2: {
      // Inline function 'kotlinx.serialization.json.internal.tryCoerceValue' call
      var isOptional = descriptor.c1m(index);
      var elementDescriptor = descriptor.b1m(index);
      var tmp;
      if (isOptional && !elementDescriptor.p1l()) {
        var tmp_0 = $this.q41(tag);
        tmp = tmp_0 instanceof JsonNull;
      } else {
        tmp = false;
      }
      if (tmp) {
        tmp$ret$1 = true;
        break $l$block_2;
      }
      if (equals(elementDescriptor.u1l(), ENUM_getInstance())) {
        var tmp_1;
        if (elementDescriptor.p1l()) {
          var tmp_2 = $this.q41(tag);
          tmp_1 = tmp_2 instanceof JsonNull;
        } else {
          tmp_1 = false;
        }
        if (tmp_1) {
          tmp$ret$1 = false;
          break $l$block_2;
        }
        var tmp_3 = $this.q41(tag);
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
        var coerceToNull = !tmp0.y3s_1.t3u_1 && elementDescriptor.p1l();
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
    $this.m42_1 = (!$this.f3v().y3s_1.t3u_1 && !descriptor.c1m(index) && descriptor.b1m(index).p1l());
    return $this.m42_1;
  }
  function JsonTreeDecoder(json, value, polymorphicDiscriminator, polyDescriptor) {
    polymorphicDiscriminator = polymorphicDiscriminator === VOID ? null : polymorphicDiscriminator;
    polyDescriptor = polyDescriptor === VOID ? null : polyDescriptor;
    AbstractJsonTreeDecoder.call(this, json, value, polymorphicDiscriminator);
    this.j42_1 = value;
    this.k42_1 = polyDescriptor;
    this.l42_1 = 0;
    this.m42_1 = false;
  }
  protoOf(JsonTreeDecoder).w = function () {
    return this.j42_1;
  };
  protoOf(JsonTreeDecoder).h1o = function (descriptor) {
    while (this.l42_1 < descriptor.w1l()) {
      var _unary__edvuaz = this.l42_1;
      this.l42_1 = _unary__edvuaz + 1 | 0;
      var name = this.s21(descriptor, _unary__edvuaz);
      var index = this.l42_1 - 1 | 0;
      this.m42_1 = false;
      var tmp;
      var tmp_0;
      // Inline function 'kotlin.collections.contains' call
      // Inline function 'kotlin.collections.containsKey' call
      var this_0 = this.w();
      if ((isInterface(this_0, KtMap) ? this_0 : THROW_CCE()).c2(name)) {
        tmp_0 = true;
      } else {
        tmp_0 = absenceIsNull(this, descriptor, index);
      }
      if (tmp_0) {
        tmp = !this.n41_1.v3u_1 || !coerceInputValue_0(this, descriptor, index, name);
      } else {
        tmp = false;
      }
      if (tmp) {
        return index;
      }
    }
    return -1;
  };
  protoOf(JsonTreeDecoder).b1n = function () {
    return !this.m42_1 && protoOf(AbstractJsonTreeDecoder).b1n.call(this);
  };
  protoOf(JsonTreeDecoder).t21 = function (descriptor, index) {
    var strategy = namingStrategy(descriptor, this.f3v());
    var baseName = descriptor.y1l(index);
    if (strategy == null) {
      if (!this.n41_1.z3u_1)
        return baseName;
      if (this.w().f2().r(baseName))
        return baseName;
    }
    var deserializationNamesMap_0 = deserializationNamesMap(this.f3v(), descriptor);
    // Inline function 'kotlin.collections.find' call
    var tmp0 = this.w().f2();
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var _iterator__ex2g4s = tmp0.g();
      while (_iterator__ex2g4s.h()) {
        var element = _iterator__ex2g4s.i();
        if (deserializationNamesMap_0.e2(element) === index) {
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
    var fallbackName = strategy == null ? null : strategy.d3y(descriptor, index, baseName);
    return fallbackName == null ? baseName : fallbackName;
  };
  protoOf(JsonTreeDecoder).q41 = function (tag) {
    return getValue(this.w(), tag);
  };
  protoOf(JsonTreeDecoder).q1n = function (descriptor) {
    if (descriptor === this.k42_1) {
      var tmp = this.f3v();
      var tmp1 = this.p41();
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var serialName = this.k42_1.t1l();
      if (!(tmp1 instanceof JsonObject)) {
        var tmp_0 = getKClass(JsonObject).ua();
        var tmp_1 = getKClassFromExpression(tmp1).ua();
        var tmp$ret$0 = this.u22();
        throw JsonDecodingException_0(-1, 'Expected ' + tmp_0 + ', but had ' + tmp_1 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$0, toString(tmp1));
      }
      return new JsonTreeDecoder(tmp, tmp1, this.m41_1, this.k42_1);
    }
    return protoOf(AbstractJsonTreeDecoder).q1n.call(this, descriptor);
  };
  protoOf(JsonTreeDecoder).r1n = function (descriptor) {
    var tmp;
    if (this.n41_1.p3u_1) {
      tmp = true;
    } else {
      var tmp_0 = descriptor.u1l();
      tmp = tmp_0 instanceof PolymorphicKind;
    }
    if (tmp)
      return Unit_instance;
    var strategy = namingStrategy(descriptor, this.f3v());
    var tmp_1;
    if (strategy == null && !this.n41_1.z3u_1) {
      tmp_1 = jsonCachedSerialNames(descriptor);
    } else if (!(strategy == null)) {
      tmp_1 = deserializationNamesMap(this.f3v(), descriptor).f2();
    } else {
      var tmp_2 = jsonCachedSerialNames(descriptor);
      var tmp0_safe_receiver = get_schemaCache(this.f3v()).p40(descriptor, get_JsonDeserializationNamesKey());
      // Inline function 'kotlin.collections.orEmpty' call
      var tmp0_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.f2();
      var tmp$ret$0 = tmp0_elvis_lhs == null ? emptySet() : tmp0_elvis_lhs;
      tmp_1 = plus_0(tmp_2, tmp$ret$0);
    }
    var names = tmp_1;
    var _iterator__ex2g4s = this.w().f2().g();
    while (_iterator__ex2g4s.h()) {
      var key = _iterator__ex2g4s.i();
      if (!names.r(key) && !(key === this.m41_1)) {
        throw UnknownKeyException(key, this.w().toString());
      }
    }
  };
  function JsonTreeListDecoder(json, value) {
    AbstractJsonTreeDecoder.call(this, json, value);
    this.t42_1 = value;
    this.u42_1 = this.t42_1.j();
    this.v42_1 = -1;
  }
  protoOf(JsonTreeListDecoder).w = function () {
    return this.t42_1;
  };
  protoOf(JsonTreeListDecoder).t21 = function (descriptor, index) {
    return index.toString();
  };
  protoOf(JsonTreeListDecoder).q41 = function (tag) {
    return this.t42_1.o(toInt(tag));
  };
  protoOf(JsonTreeListDecoder).h1o = function (descriptor) {
    while (this.v42_1 < (this.u42_1 - 1 | 0)) {
      this.v42_1 = this.v42_1 + 1 | 0;
      return this.v42_1;
    }
    return -1;
  };
  function JsonPrimitiveDecoder(json, value, polymorphicDiscriminator) {
    polymorphicDiscriminator = polymorphicDiscriminator === VOID ? null : polymorphicDiscriminator;
    AbstractJsonTreeDecoder.call(this, json, value, polymorphicDiscriminator);
    this.c43_1 = value;
    this.o22('primitive');
  }
  protoOf(JsonPrimitiveDecoder).w = function () {
    return this.c43_1;
  };
  protoOf(JsonPrimitiveDecoder).h1o = function (descriptor) {
    return 0;
  };
  protoOf(JsonPrimitiveDecoder).q41 = function (tag) {
    // Inline function 'kotlin.require' call
    if (!(tag === 'primitive')) {
      var message = "This input can only handle primitives with 'primitive' tag";
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return this.c43_1;
  };
  function JsonTreeMapDecoder(json, value) {
    JsonTreeDecoder.call(this, json, value);
    this.n43_1 = value;
    this.o43_1 = toList(this.n43_1.f2());
    this.p43_1 = imul(this.o43_1.j(), 2);
    this.q43_1 = -1;
  }
  protoOf(JsonTreeMapDecoder).w = function () {
    return this.n43_1;
  };
  protoOf(JsonTreeMapDecoder).t21 = function (descriptor, index) {
    var i = index / 2 | 0;
    return this.o43_1.o(i);
  };
  protoOf(JsonTreeMapDecoder).h1o = function (descriptor) {
    while (this.q43_1 < (this.p43_1 - 1 | 0)) {
      this.q43_1 = this.q43_1 + 1 | 0;
      return this.q43_1;
    }
    return -1;
  };
  protoOf(JsonTreeMapDecoder).q41 = function (tag) {
    return (this.q43_1 % 2 | 0) === 0 ? JsonPrimitive_2(tag) : getValue(this.n43_1, tag);
  };
  protoOf(JsonTreeMapDecoder).r1n = function (descriptor) {
  };
  function readPolymorphicJson(_this__u8e3s4, discriminator, element, deserializer) {
    return (new JsonTreeDecoder(_this__u8e3s4, element, discriminator, deserializer.p1k())).p1n(deserializer);
  }
  function writeJson(json, value, serializer) {
    var result = {_v: null};
    var encoder = new JsonTreeEncoder(json, writeJson$lambda(result));
    encoder.i1p(serializer, value);
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
    tmp.d44_1 = LinkedHashMap_init_$Create$();
  }
  protoOf(JsonTreeEncoder).e44 = function (key, element) {
    // Inline function 'kotlin.collections.set' call
    this.d44_1.h2(key, element);
  };
  protoOf(JsonTreeEncoder).j1p = function (descriptor, index, serializer, value) {
    if (!(value == null) || this.u43_1.t3u_1) {
      protoOf(AbstractJsonTreeEncoder).j1p.call(this, descriptor, index, serializer, value);
    }
  };
  protoOf(JsonTreeEncoder).f44 = function () {
    return new JsonObject(this.d44_1);
  };
  function inlineUnsignedNumberEncoder($this, tag) {
    return new AbstractJsonTreeEncoder$inlineUnsignedNumberEncoder$1($this, tag);
  }
  function inlineUnquotedLiteralEncoder($this, tag, inlineDescriptor) {
    return new AbstractJsonTreeEncoder$inlineUnquotedLiteralEncoder$1($this, tag, inlineDescriptor);
  }
  function AbstractJsonTreeEncoder$inlineUnsignedNumberEncoder$1(this$0, $tag) {
    this.u44_1 = this$0;
    this.v44_1 = $tag;
    AbstractEncoder.call(this);
    this.t44_1 = this$0.s43_1.f1o();
  }
  protoOf(AbstractJsonTreeEncoder$inlineUnsignedNumberEncoder$1).f1o = function () {
    return this.t44_1;
  };
  protoOf(AbstractJsonTreeEncoder$inlineUnsignedNumberEncoder$1).w44 = function (s) {
    return this.u44_1.e44(this.v44_1, new JsonLiteral(s, false));
  };
  protoOf(AbstractJsonTreeEncoder$inlineUnsignedNumberEncoder$1).p1o = function (value) {
    // Inline function 'kotlin.toUInt' call
    var tmp$ret$0 = _UInt___init__impl__l7qpdl(value);
    return this.w44(UInt__toString_impl_dbgl21(tmp$ret$0));
  };
  protoOf(AbstractJsonTreeEncoder$inlineUnsignedNumberEncoder$1).q1o = function (value) {
    // Inline function 'kotlin.toULong' call
    var tmp$ret$0 = _ULong___init__impl__c78o9k(value);
    return this.w44(ULong__toString_impl_f9au7k(tmp$ret$0));
  };
  protoOf(AbstractJsonTreeEncoder$inlineUnsignedNumberEncoder$1).n1o = function (value) {
    // Inline function 'kotlin.toUByte' call
    var tmp$ret$0 = _UByte___init__impl__g9hnc4(value);
    return this.w44(UByte__toString_impl_v72jg(tmp$ret$0));
  };
  protoOf(AbstractJsonTreeEncoder$inlineUnsignedNumberEncoder$1).o1o = function (value) {
    // Inline function 'kotlin.toUShort' call
    var tmp$ret$0 = _UShort___init__impl__jigrne(value);
    return this.w44(UShort__toString_impl_edaoee(tmp$ret$0));
  };
  function AbstractJsonTreeEncoder$inlineUnquotedLiteralEncoder$1(this$0, $tag, $inlineDescriptor) {
    this.x44_1 = this$0;
    this.y44_1 = $tag;
    this.z44_1 = $inlineDescriptor;
    AbstractEncoder.call(this);
  }
  protoOf(AbstractJsonTreeEncoder$inlineUnquotedLiteralEncoder$1).f1o = function () {
    return this.x44_1.s43_1.f1o();
  };
  protoOf(AbstractJsonTreeEncoder$inlineUnquotedLiteralEncoder$1).u1o = function (value) {
    return this.x44_1.e44(this.y44_1, new JsonLiteral(value, false, this.z44_1));
  };
  function AbstractJsonTreeEncoder$beginStructure$lambda(this$0) {
    return function (node) {
      this$0.e44(this$0.n22(), node);
      return Unit_instance;
    };
  }
  function AbstractJsonTreeEncoder(json, nodeConsumer) {
    NamedValueEncoder.call(this);
    this.s43_1 = json;
    this.t43_1 = nodeConsumer;
    this.u43_1 = this.s43_1.y3s_1;
    this.v43_1 = null;
    this.w43_1 = null;
  }
  protoOf(AbstractJsonTreeEncoder).f3v = function () {
    return this.s43_1;
  };
  protoOf(AbstractJsonTreeEncoder).f1o = function () {
    return this.s43_1.f1o();
  };
  protoOf(AbstractJsonTreeEncoder).t21 = function (descriptor, index) {
    return getJsonElementName(descriptor, this.s43_1, index);
  };
  protoOf(AbstractJsonTreeEncoder).n1p = function (descriptor, index) {
    return this.u43_1.o3u_1;
  };
  protoOf(AbstractJsonTreeEncoder).x21 = function (parentName, childName) {
    return childName;
  };
  protoOf(AbstractJsonTreeEncoder).l1p = function () {
  };
  protoOf(AbstractJsonTreeEncoder).l1o = function () {
    var tmp0_elvis_lhs = this.w21();
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return this.t43_1(JsonNull_getInstance());
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var tag = tmp;
    this.g44(tag);
  };
  protoOf(AbstractJsonTreeEncoder).g44 = function (tag) {
    return this.e44(tag, JsonNull_getInstance());
  };
  protoOf(AbstractJsonTreeEncoder).a22 = function (tag) {
    return this.g44((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeEncoder).h44 = function (tag, value) {
    return this.e44(tag, JsonPrimitive_1(value));
  };
  protoOf(AbstractJsonTreeEncoder).b22 = function (tag, value) {
    return this.h44((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), value);
  };
  protoOf(AbstractJsonTreeEncoder).i44 = function (tag, value) {
    return this.e44(tag, JsonPrimitive_1(value));
  };
  protoOf(AbstractJsonTreeEncoder).c22 = function (tag, value) {
    return this.i44((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), value);
  };
  protoOf(AbstractJsonTreeEncoder).j44 = function (tag, value) {
    return this.e44(tag, JsonPrimitive_1(value));
  };
  protoOf(AbstractJsonTreeEncoder).d22 = function (tag, value) {
    return this.j44((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), value);
  };
  protoOf(AbstractJsonTreeEncoder).k44 = function (tag, value) {
    return this.e44(tag, JsonPrimitive_1(value));
  };
  protoOf(AbstractJsonTreeEncoder).e22 = function (tag, value) {
    return this.k44((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), value);
  };
  protoOf(AbstractJsonTreeEncoder).l44 = function (tag, value) {
    this.e44(tag, JsonPrimitive_1(value));
    if (!this.u43_1.y3u_1 && !isFinite(value)) {
      throw InvalidFloatingPointEncoded(value, tag, toString(this.f44()));
    }
  };
  protoOf(AbstractJsonTreeEncoder).f22 = function (tag, value) {
    return this.l44((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), value);
  };
  protoOf(AbstractJsonTreeEncoder).i1p = function (serializer, value) {
    if (!(this.w21() == null) || !get_requiresTopLevelTag(carrierDescriptor(serializer.p1k(), this.f1o()))) {
      $l$block: {
        // Inline function 'kotlinx.serialization.json.internal.encodePolymorphically' call
        if (this.f3v().y3s_1.w3u_1) {
          serializer.q1k(this, value);
          break $l$block;
        }
        var isPolymorphicSerializer = serializer instanceof AbstractPolymorphicSerializer;
        var tmp;
        if (isPolymorphicSerializer) {
          tmp = !this.f3v().y3s_1.e3v_1.equals(ClassDiscriminatorMode_NONE_getInstance());
        } else {
          var tmp_0;
          switch (this.f3v().y3s_1.e3v_1.l2_1) {
            case 0:
            case 2:
              tmp_0 = false;
              break;
            case 1:
              // Inline function 'kotlin.let' call

              var it = serializer.p1k().u1l();
              tmp_0 = equals(it, CLASS_getInstance()) || equals(it, OBJECT_getInstance());
              break;
            default:
              noWhenBranchMatchedException();
              break;
          }
          tmp = tmp_0;
        }
        var needDiscriminator = tmp;
        var baseClassDiscriminator = needDiscriminator ? classDiscriminator(serializer.p1k(), this.f3v()) : null;
        var tmp_1;
        if (isPolymorphicSerializer) {
          var casted = serializer instanceof AbstractPolymorphicSerializer ? serializer : THROW_CCE();
          $l$block_0: {
            // Inline function 'kotlin.requireNotNull' call
            if (value == null) {
              var message = 'Value for serializer ' + toString(serializer.p1k()) + ' should always be non-null. Please report issue to the kotlinx.serialization tracker.';
              throw IllegalArgumentException_init_$Create$(toString(message));
            } else {
              break $l$block_0;
            }
          }
          var actual = findPolymorphicSerializer_0(casted, this, value);
          if (!(baseClassDiscriminator == null)) {
            access$validateIfSealed$tPolymorphicKt(serializer, actual, baseClassDiscriminator);
          }
          checkKind(actual.p1k().u1l());
          tmp_1 = isInterface(actual, SerializationStrategy) ? actual : THROW_CCE();
        } else {
          tmp_1 = serializer;
        }
        var actualSerializer = tmp_1;
        if (!(baseClassDiscriminator == null)) {
          var serialName = actualSerializer.p1k().t1l();
          this.v43_1 = baseClassDiscriminator;
          this.w43_1 = serialName;
        }
        actualSerializer.q1k(this, value);
      }
    } else {
      // Inline function 'kotlin.apply' call
      (new JsonPrimitiveEncoder(this.s43_1, this.t43_1)).i1p(serializer, value);
    }
  };
  protoOf(AbstractJsonTreeEncoder).m44 = function (tag, value) {
    this.e44(tag, JsonPrimitive_1(value));
    if (!this.u43_1.y3u_1 && !isFinite_0(value)) {
      throw InvalidFloatingPointEncoded(value, tag, toString(this.f44()));
    }
  };
  protoOf(AbstractJsonTreeEncoder).g22 = function (tag, value) {
    return this.m44((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), value);
  };
  protoOf(AbstractJsonTreeEncoder).n44 = function (tag, value) {
    return this.e44(tag, JsonPrimitive_0(value));
  };
  protoOf(AbstractJsonTreeEncoder).h22 = function (tag, value) {
    return this.n44((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), value);
  };
  protoOf(AbstractJsonTreeEncoder).o44 = function (tag, value) {
    return this.e44(tag, JsonPrimitive_2(toString_1(value)));
  };
  protoOf(AbstractJsonTreeEncoder).i22 = function (tag, value) {
    return this.o44((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), value);
  };
  protoOf(AbstractJsonTreeEncoder).p44 = function (tag, value) {
    return this.e44(tag, JsonPrimitive_2(value));
  };
  protoOf(AbstractJsonTreeEncoder).j22 = function (tag, value) {
    return this.p44((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), value);
  };
  protoOf(AbstractJsonTreeEncoder).q44 = function (tag, enumDescriptor, ordinal) {
    return this.e44(tag, JsonPrimitive_2(enumDescriptor.y1l(ordinal)));
  };
  protoOf(AbstractJsonTreeEncoder).k22 = function (tag, enumDescriptor, ordinal) {
    return this.q44((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), enumDescriptor, ordinal);
  };
  protoOf(AbstractJsonTreeEncoder).r44 = function (tag, value) {
    this.e44(tag, JsonPrimitive_2(toString(value)));
  };
  protoOf(AbstractJsonTreeEncoder).y21 = function (tag, value) {
    return this.r44((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), value);
  };
  protoOf(AbstractJsonTreeEncoder).s44 = function (tag, inlineDescriptor) {
    return get_isUnsignedNumber(inlineDescriptor) ? inlineUnsignedNumberEncoder(this, tag) : get_isUnquotedLiteral(inlineDescriptor) ? inlineUnquotedLiteralEncoder(this, tag, inlineDescriptor) : protoOf(NamedValueEncoder).l22.call(this, tag, inlineDescriptor);
  };
  protoOf(AbstractJsonTreeEncoder).l22 = function (tag, inlineDescriptor) {
    return this.s44((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), inlineDescriptor);
  };
  protoOf(AbstractJsonTreeEncoder).w1o = function (descriptor) {
    var tmp;
    if (!(this.w21() == null)) {
      if (!(this.v43_1 == null))
        this.w43_1 = descriptor.t1l();
      tmp = protoOf(NamedValueEncoder).w1o.call(this, descriptor);
    } else {
      tmp = (new JsonPrimitiveEncoder(this.s43_1, this.t43_1)).w1o(descriptor);
    }
    return tmp;
  };
  protoOf(AbstractJsonTreeEncoder).q1n = function (descriptor) {
    var tmp;
    if (this.w21() == null) {
      tmp = this.t43_1;
    } else {
      tmp = AbstractJsonTreeEncoder$beginStructure$lambda(this);
    }
    var consumer = tmp;
    var tmp0_subject = descriptor.u1l();
    var tmp_0;
    var tmp_1;
    if (equals(tmp0_subject, LIST_getInstance())) {
      tmp_1 = true;
    } else {
      tmp_1 = tmp0_subject instanceof PolymorphicKind;
    }
    if (tmp_1) {
      tmp_0 = new JsonTreeListEncoder(this.s43_1, consumer);
    } else {
      if (equals(tmp0_subject, MAP_getInstance())) {
        // Inline function 'kotlinx.serialization.json.internal.selectMapMode' call
        var this_0 = this.s43_1;
        var keyDescriptor = carrierDescriptor(descriptor.b1m(0), this_0.f1o());
        var keyKind = keyDescriptor.u1l();
        var tmp_2;
        var tmp_3;
        if (keyKind instanceof PrimitiveKind) {
          tmp_3 = true;
        } else {
          tmp_3 = equals(keyKind, ENUM_getInstance());
        }
        if (tmp_3) {
          tmp_2 = new JsonTreeMapEncoder(this.s43_1, consumer);
        } else {
          if (this_0.y3s_1.r3u_1) {
            tmp_2 = new JsonTreeListEncoder(this.s43_1, consumer);
          } else {
            throw InvalidKeyKindException(keyDescriptor);
          }
        }
        tmp_0 = tmp_2;
      } else {
        tmp_0 = new JsonTreeEncoder(this.s43_1, consumer);
      }
    }
    var encoder = tmp_0;
    var discriminator = this.v43_1;
    if (!(discriminator == null)) {
      if (encoder instanceof JsonTreeMapEncoder) {
        encoder.e44('key', JsonPrimitive_2(discriminator));
        var tmp1_elvis_lhs = this.w43_1;
        encoder.e44('value', JsonPrimitive_2(tmp1_elvis_lhs == null ? descriptor.t1l() : tmp1_elvis_lhs));
      } else {
        var tmp2_elvis_lhs = this.w43_1;
        encoder.e44(discriminator, JsonPrimitive_2(tmp2_elvis_lhs == null ? descriptor.t1l() : tmp2_elvis_lhs));
      }
      this.v43_1 = null;
      this.w43_1 = null;
    }
    return encoder;
  };
  protoOf(AbstractJsonTreeEncoder).m22 = function (descriptor) {
    this.t43_1(this.f44());
  };
  function get_requiresTopLevelTag(_this__u8e3s4) {
    var tmp;
    var tmp_0 = _this__u8e3s4.u1l();
    if (tmp_0 instanceof PrimitiveKind) {
      tmp = true;
    } else {
      tmp = _this__u8e3s4.u1l() === ENUM_getInstance();
    }
    return tmp;
  }
  function JsonPrimitiveEncoder(json, nodeConsumer) {
    AbstractJsonTreeEncoder.call(this, json, nodeConsumer);
    this.p45_1 = null;
    this.o22('primitive');
  }
  protoOf(JsonPrimitiveEncoder).e44 = function (key, element) {
    // Inline function 'kotlin.require' call
    if (!(key === 'primitive')) {
      var message = "This output can only consume primitives with 'primitive' tag";
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    // Inline function 'kotlin.require' call
    if (!(this.p45_1 == null)) {
      var message_0 = 'Primitive element was already recorded. Does call to .encodeXxx happen more than once?';
      throw IllegalArgumentException_init_$Create$(toString(message_0));
    }
    this.p45_1 = element;
    this.t43_1(element);
  };
  protoOf(JsonPrimitiveEncoder).f44 = function () {
    var tmp0 = this.p45_1;
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
    tmp.w45_1 = ArrayList_init_$Create$();
  }
  protoOf(JsonTreeListEncoder).t21 = function (descriptor, index) {
    return index.toString();
  };
  protoOf(JsonTreeListEncoder).e44 = function (key, element) {
    var idx = toInt(key);
    this.w45_1.a2(idx, element);
  };
  protoOf(JsonTreeListEncoder).f44 = function () {
    return new JsonArray(this.w45_1);
  };
  function _get_tag__e6h4qf($this) {
    var tmp = $this.h45_1;
    if (!(tmp == null))
      return tmp;
    else {
      throwUninitializedPropertyAccessException('tag');
    }
  }
  function JsonTreeMapEncoder(json, nodeConsumer) {
    JsonTreeEncoder.call(this, json, nodeConsumer);
    this.i45_1 = true;
  }
  protoOf(JsonTreeMapEncoder).e44 = function (key, element) {
    if (this.i45_1) {
      var tmp = this;
      var tmp_0;
      if (element instanceof JsonPrimitive) {
        tmp_0 = element.i3v();
      } else {
        if (element instanceof JsonObject) {
          throw InvalidKeyKindException(JsonObjectSerializer_getInstance().a3w_1);
        } else {
          if (element instanceof JsonArray) {
            throw InvalidKeyKindException(JsonArraySerializer_getInstance().f3w_1);
          } else {
            noWhenBranchMatchedException();
          }
        }
      }
      tmp.h45_1 = tmp_0;
      this.i45_1 = false;
    } else {
      var tmp0 = this.d44_1;
      // Inline function 'kotlin.collections.set' call
      var key_0 = _get_tag__e6h4qf(this);
      tmp0.h2(key_0, element);
      this.i45_1 = true;
    }
  };
  protoOf(JsonTreeMapEncoder).f44 = function () {
    return new JsonObject(this.d44_1);
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
    this.c41_1 = begin;
    this.d41_1 = end;
  }
  function switchMode(_this__u8e3s4, desc) {
    var tmp0_subject = desc.u1l();
    var tmp;
    if (tmp0_subject instanceof PolymorphicKind) {
      tmp = WriteMode_POLY_OBJ_getInstance();
    } else {
      if (equals(tmp0_subject, LIST_getInstance())) {
        tmp = WriteMode_LIST_getInstance();
      } else {
        if (equals(tmp0_subject, MAP_getInstance())) {
          // Inline function 'kotlinx.serialization.json.internal.selectMapMode' call
          var keyDescriptor = carrierDescriptor(desc.b1m(0), _this__u8e3s4.f1o());
          var keyKind = keyDescriptor.u1l();
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
            if (_this__u8e3s4.y3s_1.r3u_1) {
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
    if (equals(_this__u8e3s4.u1l(), CONTEXTUAL_getInstance())) {
      var tmp0_safe_receiver = getContextualDescriptor(module_0, _this__u8e3s4);
      var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : carrierDescriptor(tmp0_safe_receiver, module_0);
      tmp = tmp1_elvis_lhs == null ? _this__u8e3s4 : tmp1_elvis_lhs;
    } else if (_this__u8e3s4.v1l()) {
      tmp = carrierDescriptor(_this__u8e3s4.b1m(0), module_0);
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
    $this.x45(lastPosition, current);
    return appendEsc($this, current + 1 | 0);
  }
  function decodedString($this, lastPosition, currentPosition) {
    $this.x45(lastPosition, currentPosition);
    var result = $this.t3t_1.toString();
    $this.t3t_1.qc(0);
    return result;
  }
  function takePeeked($this) {
    // Inline function 'kotlin.also' call
    var this_0 = ensureNotNull($this.s3t_1);
    $this.s3t_1 = null;
    return this_0;
  }
  function wasUnquotedString($this) {
    return !(charSequenceGet($this.y45(), $this.q3t_1 - 1 | 0) === _Char___init__impl__6a9atx(34));
  }
  function appendEsc($this, startPosition) {
    var currentPosition = startPosition;
    currentPosition = $this.z45(currentPosition);
    if (currentPosition === -1) {
      $this.z3x('Expected escape sequence to continue, got EOF');
    }
    var tmp = $this.y45();
    var _unary__edvuaz = currentPosition;
    currentPosition = _unary__edvuaz + 1 | 0;
    var currentChar = charSequenceGet(tmp, _unary__edvuaz);
    if (currentChar === _Char___init__impl__6a9atx(117)) {
      return appendHex($this, $this.y45(), currentPosition);
    }
    // Inline function 'kotlin.code' call
    var tmp$ret$0 = Char__toInt_impl_vasixd(currentChar);
    var c = escapeToChar(tmp$ret$0);
    if (c === _Char___init__impl__6a9atx(0)) {
      $this.z3x("Invalid escaped char '" + toString_1(currentChar) + "'");
    }
    $this.t3t_1.a8(c);
    return currentPosition;
  }
  function appendHex($this, source, startPos) {
    if ((startPos + 4 | 0) >= charSequenceLength(source)) {
      $this.q3t_1 = startPos;
      $this.a46();
      if (($this.q3t_1 + 4 | 0) >= charSequenceLength(source)) {
        $this.z3x('Unexpected EOF during unicode escape');
      }
      return appendHex($this, source, $this.q3t_1);
    }
    $this.t3t_1.a8(numberToChar((((fromHexChar($this, source, startPos) << 12) + (fromHexChar($this, source, startPos + 1 | 0) << 8) | 0) + (fromHexChar($this, source, startPos + 2 | 0) << 4) | 0) + fromHexChar($this, source, startPos + 3 | 0) | 0));
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
      $this.z3x("Invalid toHexChar char '" + toString_1(character) + "' in unicode escape");
    }
    return tmp;
  }
  function consumeBoolean2($this, start) {
    var current = $this.z45(start);
    if (current >= charSequenceLength($this.y45()) || current === -1) {
      $this.z3x('EOF');
    }
    var tmp = $this.y45();
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
        $this.z3x("Expected valid boolean literal prefix, but had '" + $this.e3z() + "'");
      }
    }
    return tmp_0;
  }
  function consumeBooleanLiteral($this, literalSuffix, current) {
    if ((charSequenceLength($this.y45()) - current | 0) < literalSuffix.length) {
      $this.z3x('Unexpected end of boolean literal');
    }
    var inductionVariable = 0;
    var last = charSequenceLength(literalSuffix) - 1 | 0;
    if (inductionVariable <= last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var expected = charSequenceGet(literalSuffix, i);
        var actual = charSequenceGet($this.y45(), current + i | 0);
        // Inline function 'kotlin.code' call
        var tmp = Char__toInt_impl_vasixd(expected);
        // Inline function 'kotlin.code' call
        if (!(tmp === (Char__toInt_impl_vasixd(actual) | 32))) {
          $this.z3x("Expected valid boolean literal prefix, but had '" + $this.e3z() + "'");
        }
      }
       while (inductionVariable <= last);
    $this.q3t_1 = current + literalSuffix.length | 0;
  }
  function consumeNumericLiteral$calculateExponent(exponentAccumulator, isExponentPositive) {
    var tmp;
    switch (isExponentPositive) {
      case false:
        // Inline function 'kotlin.math.pow' call

        var x = -exponentAccumulator.i3();
        tmp = Math.pow(10.0, x);
        break;
      case true:
        // Inline function 'kotlin.math.pow' call

        var x_0 = exponentAccumulator.i3();
        tmp = Math.pow(10.0, x_0);
        break;
      default:
        noWhenBranchMatchedException();
        break;
    }
    return tmp;
  }
  function AbstractJsonLexer() {
    this.q3t_1 = 0;
    this.r3t_1 = new JsonPath();
    this.s3t_1 = null;
    this.t3t_1 = StringBuilder_init_$Create$();
  }
  protoOf(AbstractJsonLexer).a46 = function () {
  };
  protoOf(AbstractJsonLexer).s40 = function () {
    var current = this.b46();
    var source = this.y45();
    if (current >= charSequenceLength(source) || current === -1)
      return false;
    if (charSequenceGet(source, current) === _Char___init__impl__6a9atx(44)) {
      this.q3t_1 = this.q3t_1 + 1 | 0;
      return true;
    }
    return false;
  };
  protoOf(AbstractJsonLexer).c46 = function (c) {
    return c === _Char___init__impl__6a9atx(125) || c === _Char___init__impl__6a9atx(93) || (c === _Char___init__impl__6a9atx(58) || c === _Char___init__impl__6a9atx(44)) ? false : true;
  };
  protoOf(AbstractJsonLexer).u3t = function () {
    var nextToken = this.g3z();
    if (!(nextToken === 10)) {
      this.z3x('Expected EOF after parsing, but had ' + toString_1(charSequenceGet(this.y45(), this.q3t_1 - 1 | 0)) + ' instead');
    }
  };
  protoOf(AbstractJsonLexer).a3z = function (expected) {
    var token = this.g3z();
    if (!(token === expected)) {
      this.d46(expected);
    }
    return token;
  };
  protoOf(AbstractJsonLexer).e46 = function (expected) {
    if (this.q3t_1 > 0 && expected === _Char___init__impl__6a9atx(34)) {
      var tmp$ret$1;
      $l$block: {
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.withPositionRollback' call
        var snapshot = this.q3t_1;
        try {
          this.q3t_1 = this.q3t_1 - 1 | 0;
          tmp$ret$1 = this.e3z();
          break $l$block;
        }finally {
          this.q3t_1 = snapshot;
        }
      }
      var inputLiteral = tmp$ret$1;
      if (inputLiteral === 'null') {
        this.y3x("Expected string literal but 'null' literal was found", this.q3t_1 - 1 | 0, "Use 'coerceInputValues = true' in 'Json {}' builder to coerce nulls if property has a default value.");
      }
    }
    this.d46(charToTokenClass(expected));
  };
  protoOf(AbstractJsonLexer).f46 = function (expectedToken, wasConsumed) {
    var expected = tokenDescription(expectedToken);
    var position = wasConsumed ? this.q3t_1 - 1 | 0 : this.q3t_1;
    var s = this.q3t_1 === charSequenceLength(this.y45()) || position < 0 ? 'EOF' : toString_1(charSequenceGet(this.y45(), position));
    this.z3x('Expected ' + expected + ", but had '" + s + "' instead", position);
  };
  protoOf(AbstractJsonLexer).d46 = function (expectedToken, wasConsumed, $super) {
    wasConsumed = wasConsumed === VOID ? true : wasConsumed;
    return $super === VOID ? this.f46(expectedToken, wasConsumed) : $super.f46.call(this, expectedToken, wasConsumed);
  };
  protoOf(AbstractJsonLexer).b3z = function () {
    var source = this.y45();
    var cpos = this.q3t_1;
    $l$loop_0: while (true) {
      cpos = this.z45(cpos);
      if (cpos === -1)
        break $l$loop_0;
      var ch = charSequenceGet(source, cpos);
      if (ch === _Char___init__impl__6a9atx(32) || ch === _Char___init__impl__6a9atx(10) || ch === _Char___init__impl__6a9atx(13) || ch === _Char___init__impl__6a9atx(9)) {
        cpos = cpos + 1 | 0;
        continue $l$loop_0;
      }
      this.q3t_1 = cpos;
      return charToTokenClass(ch);
    }
    this.q3t_1 = cpos;
    return 10;
  };
  protoOf(AbstractJsonLexer).t40 = function (doConsume) {
    var current = this.b46();
    current = this.z45(current);
    var len = charSequenceLength(this.y45()) - current | 0;
    if (len < 4 || current === -1)
      return false;
    var inductionVariable = 0;
    if (inductionVariable <= 3)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        if (!(charSequenceGet('null', i) === charSequenceGet(this.y45(), current + i | 0)))
          return false;
      }
       while (inductionVariable <= 3);
    if (len > 4 && charToTokenClass(charSequenceGet(this.y45(), current + 4 | 0)) === 0)
      return false;
    if (doConsume) {
      this.q3t_1 = current + 4 | 0;
    }
    return true;
  };
  protoOf(AbstractJsonLexer).e41 = function (doConsume, $super) {
    doConsume = doConsume === VOID ? true : doConsume;
    return $super === VOID ? this.t40(doConsume) : $super.t40.call(this, doConsume);
  };
  protoOf(AbstractJsonLexer).u40 = function (isLenient) {
    var token = this.b3z();
    var tmp;
    if (isLenient) {
      if (!(token === 1) && !(token === 0))
        return null;
      tmp = this.e3z();
    } else {
      if (!(token === 1))
        return null;
      tmp = this.d3z();
    }
    var string = tmp;
    this.s3t_1 = string;
    return string;
  };
  protoOf(AbstractJsonLexer).g46 = function () {
    this.s3t_1 = null;
  };
  protoOf(AbstractJsonLexer).h46 = function (startPos, endPos) {
    // Inline function 'kotlin.text.substring' call
    var this_0 = this.y45();
    return toString(charSequenceSubSequence(this_0, startPos, endPos));
  };
  protoOf(AbstractJsonLexer).d3z = function () {
    if (!(this.s3t_1 == null)) {
      return takePeeked(this);
    }
    return this.x40();
  };
  protoOf(AbstractJsonLexer).consumeString2 = function (source, startPosition, current) {
    var currentPosition = current;
    var lastPosition = startPosition;
    var char = charSequenceGet(source, currentPosition);
    var usedAppend = false;
    while (!(char === _Char___init__impl__6a9atx(34))) {
      if (char === _Char___init__impl__6a9atx(92)) {
        usedAppend = true;
        currentPosition = this.z45(appendEscape(this, lastPosition, currentPosition));
        if (currentPosition === -1) {
          this.z3x('Unexpected EOF', currentPosition);
        }
        lastPosition = currentPosition;
      } else {
        currentPosition = currentPosition + 1 | 0;
        if (currentPosition >= charSequenceLength(source)) {
          usedAppend = true;
          this.x45(lastPosition, currentPosition);
          currentPosition = this.z45(currentPosition);
          if (currentPosition === -1) {
            this.z3x('Unexpected EOF', currentPosition);
          }
          lastPosition = currentPosition;
        }
      }
      char = charSequenceGet(source, currentPosition);
    }
    var tmp;
    if (!usedAppend) {
      tmp = this.h46(lastPosition, currentPosition);
    } else {
      tmp = decodedString(this, lastPosition, currentPosition);
    }
    var string = tmp;
    this.q3t_1 = currentPosition + 1 | 0;
    return string;
  };
  protoOf(AbstractJsonLexer).y40 = function () {
    var result = this.e3z();
    if (result === 'null' && wasUnquotedString(this)) {
      this.z3x("Unexpected 'null' value instead of string literal");
    }
    return result;
  };
  protoOf(AbstractJsonLexer).e3z = function () {
    if (!(this.s3t_1 == null)) {
      return takePeeked(this);
    }
    var current = this.b46();
    if (current >= charSequenceLength(this.y45()) || current === -1) {
      this.z3x('EOF', current);
    }
    var token = charToTokenClass(charSequenceGet(this.y45(), current));
    if (token === 1) {
      return this.d3z();
    }
    if (!(token === 0)) {
      this.z3x('Expected beginning of the string, but got ' + toString_1(charSequenceGet(this.y45(), current)));
    }
    var usedAppend = false;
    while (charToTokenClass(charSequenceGet(this.y45(), current)) === 0) {
      current = current + 1 | 0;
      if (current >= charSequenceLength(this.y45())) {
        usedAppend = true;
        this.x45(this.q3t_1, current);
        var eof = this.z45(current);
        if (eof === -1) {
          this.q3t_1 = current;
          return decodedString(this, 0, 0);
        } else {
          current = eof;
        }
      }
    }
    var tmp;
    if (!usedAppend) {
      tmp = this.h46(this.q3t_1, current);
    } else {
      tmp = decodedString(this, this.q3t_1, current);
    }
    var result = tmp;
    this.q3t_1 = current;
    return result;
  };
  protoOf(AbstractJsonLexer).x45 = function (fromIndex, toIndex) {
    this.t3t_1.kc(this.y45(), fromIndex, toIndex);
  };
  protoOf(AbstractJsonLexer).w40 = function (allowLenientStrings) {
    // Inline function 'kotlin.collections.mutableListOf' call
    var tokenStack = ArrayList_init_$Create$();
    var lastToken = this.b3z();
    if (!(lastToken === 8) && !(lastToken === 6)) {
      this.e3z();
      return Unit_instance;
    }
    $l$loop: while (true) {
      lastToken = this.b3z();
      if (lastToken === 1) {
        if (allowLenientStrings)
          this.e3z();
        else
          this.x40();
        continue $l$loop;
      }
      var tmp0_subject = lastToken;
      if (tmp0_subject === 8 || tmp0_subject === 6) {
        tokenStack.e(lastToken);
      } else if (tmp0_subject === 9) {
        if (!(last(tokenStack) === 8))
          throw JsonDecodingException_0(this.q3t_1, 'found ] instead of } at path: ' + this.r3t_1.toString(), this.y45());
        removeLast(tokenStack);
      } else if (tmp0_subject === 7) {
        if (!(last(tokenStack) === 6))
          throw JsonDecodingException_0(this.q3t_1, 'found } instead of ] at path: ' + this.r3t_1.toString(), this.y45());
        removeLast(tokenStack);
      } else if (tmp0_subject === 10) {
        this.z3x('Unexpected end of input due to malformed JSON during ignoring unknown keys');
      }
      this.g3z();
      if (tokenStack.j() === 0)
        return Unit_instance;
    }
  };
  protoOf(AbstractJsonLexer).toString = function () {
    return "JsonReader(source='" + toString(this.y45()) + "', currentPosition=" + this.q3t_1 + ')';
  };
  protoOf(AbstractJsonLexer).v40 = function (key) {
    var processed = this.h46(0, this.q3t_1);
    var lastIndexOf_0 = lastIndexOf(processed, key);
    this.y3x("Encountered an unknown key '" + key + "'", lastIndexOf_0, "Use 'ignoreUnknownKeys = true' in 'Json {}' builder to ignore unknown keys.");
  };
  protoOf(AbstractJsonLexer).y3x = function (message, position, hint) {
    var tmp;
    // Inline function 'kotlin.text.isEmpty' call
    if (charSequenceLength(hint) === 0) {
      tmp = '';
    } else {
      tmp = '\n' + hint;
    }
    var hintMessage = tmp;
    throw JsonDecodingException_0(position, message + ' at path: ' + this.r3t_1.m3y() + hintMessage, this.y45());
  };
  protoOf(AbstractJsonLexer).z3x = function (message, position, hint, $super) {
    position = position === VOID ? this.q3t_1 : position;
    hint = hint === VOID ? '' : hint;
    return $super === VOID ? this.y3x(message, position, hint) : $super.y3x.call(this, message, position, hint);
  };
  protoOf(AbstractJsonLexer).p3v = function () {
    var current = this.b46();
    current = this.z45(current);
    if (current >= charSequenceLength(this.y45()) || current === -1) {
      this.z3x('EOF');
    }
    var tmp;
    if (charSequenceGet(this.y45(), current) === _Char___init__impl__6a9atx(34)) {
      current = current + 1 | 0;
      if (current === charSequenceLength(this.y45())) {
        this.z3x('EOF');
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
    $l$loop_4: while (!(current === charSequenceLength(this.y45()))) {
      var ch = charSequenceGet(this.y45(), current);
      if ((ch === _Char___init__impl__6a9atx(101) || ch === _Char___init__impl__6a9atx(69)) && !hasExponent) {
        if (current === start) {
          this.z3x('Unexpected symbol ' + toString_1(ch) + ' in numeric literal');
        }
        isExponentPositive = true;
        hasExponent = true;
        current = current + 1 | 0;
        continue $l$loop_4;
      }
      if (ch === _Char___init__impl__6a9atx(45) && hasExponent) {
        if (current === start) {
          this.z3x("Unexpected symbol '-' in numeric literal");
        }
        isExponentPositive = false;
        current = current + 1 | 0;
        continue $l$loop_4;
      }
      if (ch === _Char___init__impl__6a9atx(43) && hasExponent) {
        if (current === start) {
          this.z3x("Unexpected symbol '+' in numeric literal");
        }
        isExponentPositive = true;
        current = current + 1 | 0;
        continue $l$loop_4;
      }
      if (ch === _Char___init__impl__6a9atx(45)) {
        if (!(current === start)) {
          this.z3x("Unexpected symbol '-' in numeric literal");
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
        this.z3x("Unexpected symbol '" + toString_1(ch) + "' in numeric literal");
      }
      if (hasExponent) {
        // Inline function 'kotlin.Long.times' call
        // Inline function 'kotlin.Long.plus' call
        exponentAccumulator = exponentAccumulator.t2(toLong(10)).r2(toLong(digit));
        continue $l$loop_4;
      }
      // Inline function 'kotlin.Long.times' call
      // Inline function 'kotlin.Long.minus' call
      accumulator = accumulator.t2(toLong(10)).s2(toLong(digit));
      if (accumulator.b1(new Long(0, 0)) > 0) {
        this.z3x('Numeric value overflow');
      }
    }
    var hasChars = !(current === start);
    if (start === current || (isNegative && start === (current - 1 | 0))) {
      this.z3x('Expected numeric literal');
    }
    if (hasQuotation) {
      if (!hasChars) {
        this.z3x('EOF');
      }
      if (!(charSequenceGet(this.y45(), current) === _Char___init__impl__6a9atx(34))) {
        this.z3x('Expected closing quotation mark');
      }
      current = current + 1 | 0;
    }
    this.q3t_1 = current;
    if (hasExponent) {
      var doubleAccumulator = accumulator.i3() * consumeNumericLiteral$calculateExponent(exponentAccumulator, isExponentPositive);
      if (doubleAccumulator > (new Long(-1, 2147483647)).i3() || doubleAccumulator < (new Long(0, -2147483648)).i3()) {
        this.z3x('Numeric value overflow');
      }
      // Inline function 'kotlin.math.floor' call
      if (!(Math.floor(doubleAccumulator) === doubleAccumulator)) {
        this.z3x("Can't convert " + doubleAccumulator + ' to Long');
      }
      accumulator = numberToLong(doubleAccumulator);
    }
    var tmp_0;
    if (isNegative) {
      tmp_0 = accumulator;
    } else if (!accumulator.equals(new Long(0, -2147483648))) {
      tmp_0 = accumulator.y2();
    } else {
      this.z3x('Numeric value overflow');
    }
    return tmp_0;
  };
  protoOf(AbstractJsonLexer).f41 = function () {
    var current = this.b46();
    if (current === charSequenceLength(this.y45())) {
      this.z3x('EOF');
    }
    var tmp;
    if (charSequenceGet(this.y45(), current) === _Char___init__impl__6a9atx(34)) {
      current = current + 1 | 0;
      tmp = true;
    } else {
      tmp = false;
    }
    var hasQuotation = tmp;
    var result = consumeBoolean2(this, current);
    if (hasQuotation) {
      if (this.q3t_1 === charSequenceLength(this.y45())) {
        this.z3x('EOF');
      }
      if (!(charSequenceGet(this.y45(), this.q3t_1) === _Char___init__impl__6a9atx(34))) {
        this.z3x('Expected closing quotation mark');
      }
      this.q3t_1 = this.q3t_1 + 1 | 0;
    }
    return result;
  };
  function charToTokenClass(c) {
    var tmp;
    // Inline function 'kotlin.code' call
    if (Char__toInt_impl_vasixd(c) < 126) {
      var tmp_0 = CharMappings_getInstance().j46_1;
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
    return c < 117 ? CharMappings_getInstance().i46_1[c] : _Char___init__impl__6a9atx(0);
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
      $this.i46_1[tmp$ret$0] = numberToChar(c);
    }
  }
  function initC2ESC_0($this, c, esc) {
    // Inline function 'kotlin.code' call
    var tmp$ret$0 = Char__toInt_impl_vasixd(c);
    return initC2ESC($this, tmp$ret$0, esc);
  }
  function initC2TC($this, c, cl) {
    $this.j46_1[c] = cl;
  }
  function initC2TC_0($this, c, cl) {
    // Inline function 'kotlin.code' call
    var tmp$ret$0 = Char__toInt_impl_vasixd(c);
    return initC2TC($this, tmp$ret$0, cl);
  }
  function CharMappings() {
    CharMappings_instance = this;
    this.i46_1 = charArray(117);
    this.j46_1 = new Int8Array(126);
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
  protoOf(StringJsonLexerWithComments).g3z = function () {
    var source = this.y45();
    var cpos = this.b46();
    if (cpos >= source.length || cpos === -1)
      return 10;
    this.q3t_1 = cpos + 1 | 0;
    return charToTokenClass(charSequenceGet(source, cpos));
  };
  protoOf(StringJsonLexerWithComments).c3z = function () {
    var current = this.b46();
    if (current >= this.y45().length || current === -1)
      return false;
    return this.c46(charSequenceGet(this.y45(), current));
  };
  protoOf(StringJsonLexerWithComments).r40 = function (expected) {
    var source = this.y45();
    var current = this.b46();
    if (current >= source.length || current === -1) {
      this.q3t_1 = -1;
      this.e46(expected);
    }
    var c = charSequenceGet(source, current);
    this.q3t_1 = current + 1 | 0;
    if (c === expected)
      return Unit_instance;
    else {
      this.e46(expected);
    }
  };
  protoOf(StringJsonLexerWithComments).b3z = function () {
    var source = this.y45();
    var cpos = this.b46();
    if (cpos >= source.length || cpos === -1)
      return 10;
    this.q3t_1 = cpos;
    return charToTokenClass(charSequenceGet(source, cpos));
  };
  protoOf(StringJsonLexerWithComments).b46 = function () {
    var current = this.q3t_1;
    if (current === -1)
      return current;
    var source = this.y45();
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
            this.q3t_1 = source.length;
            this.z3x('Expected end of the block comment: "*/", but had EOF instead');
          } else {
            current = current + 2 | 0;
          }
          continue $l$loop_1;
        }
      }
      break $l$loop_1;
    }
    this.q3t_1 = current;
    return current;
  };
  function StringJsonLexer(source) {
    AbstractJsonLexer.call(this);
    this.t46_1 = source;
  }
  protoOf(StringJsonLexer).y45 = function () {
    return this.t46_1;
  };
  protoOf(StringJsonLexer).z45 = function (position) {
    return position < this.y45().length ? position : -1;
  };
  protoOf(StringJsonLexer).g3z = function () {
    var source = this.y45();
    var cpos = this.q3t_1;
    $l$loop: while (!(cpos === -1) && cpos < source.length) {
      var _unary__edvuaz = cpos;
      cpos = _unary__edvuaz + 1 | 0;
      var c = charSequenceGet(source, _unary__edvuaz);
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
      if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9))
        continue $l$loop;
      this.q3t_1 = cpos;
      return charToTokenClass(c);
    }
    this.q3t_1 = source.length;
    return 10;
  };
  protoOf(StringJsonLexer).c3z = function () {
    var current = this.q3t_1;
    if (current === -1)
      return false;
    var source = this.y45();
    $l$loop: while (current < source.length) {
      var c = charSequenceGet(source, current);
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
      if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9)) {
        current = current + 1 | 0;
        continue $l$loop;
      }
      this.q3t_1 = current;
      return this.c46(c);
    }
    this.q3t_1 = current;
    return false;
  };
  protoOf(StringJsonLexer).b46 = function () {
    var current = this.q3t_1;
    if (current === -1)
      return current;
    var source = this.y45();
    $l$loop: while (current < source.length) {
      var c = charSequenceGet(source, current);
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
      if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9)) {
        current = current + 1 | 0;
      } else {
        break $l$loop;
      }
    }
    this.q3t_1 = current;
    return current;
  };
  protoOf(StringJsonLexer).r40 = function (expected) {
    if (this.q3t_1 === -1) {
      this.e46(expected);
    }
    var source = this.y45();
    var cpos = this.q3t_1;
    $l$loop: while (cpos < source.length) {
      var _unary__edvuaz = cpos;
      cpos = _unary__edvuaz + 1 | 0;
      var c = charSequenceGet(source, _unary__edvuaz);
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
      if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9))
        continue $l$loop;
      this.q3t_1 = cpos;
      if (c === expected)
        return Unit_instance;
      this.e46(expected);
    }
    this.q3t_1 = -1;
    this.e46(expected);
  };
  protoOf(StringJsonLexer).x40 = function () {
    this.r40(_Char___init__impl__6a9atx(34));
    var current = this.q3t_1;
    var closingQuote = indexOf_0(this.y45(), _Char___init__impl__6a9atx(34), current);
    if (closingQuote === -1) {
      this.e3z();
      this.f46(1, false);
    }
    var inductionVariable = current;
    if (inductionVariable < closingQuote)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        if (charSequenceGet(this.y45(), i) === _Char___init__impl__6a9atx(92)) {
          return this.consumeString2(this.y45(), this.q3t_1, i);
        }
      }
       while (inductionVariable < closingQuote);
    this.q3t_1 = closingQuote + 1 | 0;
    // Inline function 'kotlin.text.substring' call
    // Inline function 'kotlin.js.asDynamic' call
    return this.y45().substring(current, closingQuote);
  };
  protoOf(StringJsonLexer).z40 = function (keyToMatch, isLenient) {
    var positionSnapshot = this.q3t_1;
    try {
      if (!(this.g3z() === 6))
        return null;
      var firstKey = this.u40(isLenient);
      if (!(firstKey === keyToMatch))
        return null;
      this.g46();
      if (!(this.g3z() === 5))
        return null;
      return this.u40(isLenient);
    }finally {
      this.q3t_1 = positionSnapshot;
      this.g46();
    }
  };
  function StringJsonLexer_0(json, source) {
    return !json.y3s_1.d3v_1 ? new StringJsonLexer(source) : new StringJsonLexerWithComments(source);
  }
  function get_schemaCache(_this__u8e3s4) {
    return _this__u8e3s4.a3t_1;
  }
  function JsonToStringWriter() {
    this.g3t_1 = StringBuilder_init_$Create$_0(128);
  }
  protoOf(JsonToStringWriter).d3x = function (value) {
    this.g3t_1.oc(value);
  };
  protoOf(JsonToStringWriter).x3w = function (char) {
    this.g3t_1.a8(char);
  };
  protoOf(JsonToStringWriter).z3w = function (text) {
    this.g3t_1.z7(text);
  };
  protoOf(JsonToStringWriter).j3x = function (text) {
    printQuoted(this.g3t_1, text);
  };
  protoOf(JsonToStringWriter).h3t = function () {
    this.g3t_1.rc();
  };
  protoOf(JsonToStringWriter).toString = function () {
    return this.g3t_1.toString();
  };
  function createMapForCache(initialCapacity) {
    return HashMap_init_$Create$(initialCapacity);
  }
  //region block: post-declaration
  protoOf(defer$1).p1l = get_isNullable;
  protoOf(defer$1).v1l = get_isInline;
  protoOf(defer$1).x1l = get_annotations;
  protoOf(PolymorphismValidator).c25 = contextual;
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
