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
    this.d3t_1 = configuration;
    this.e3t_1 = serializersModule;
    this.f3t_1 = new DescriptorSchemaCache();
  }
  protoOf(Json).j1o = function () {
    return this.e3t_1;
  };
  protoOf(Json).g3t = function (serializer, value) {
    var result = new JsonToStringWriter();
    try {
      encodeByWriter(this, result, serializer, value);
      return result.toString();
    }finally {
      result.m3t();
    }
  };
  protoOf(Json).h3t = function (deserializer, string) {
    var lexer = StringJsonLexer_0(this, string);
    var input = new StreamingJsonDecoder(this, WriteMode_OBJ_getInstance(), lexer, deserializer.t1k(), null);
    var result = input.t1n(deserializer);
    lexer.z3t();
    return result;
  };
  protoOf(Json).i3t = function (serializer, value) {
    return writeJson(this, value, serializer);
  };
  protoOf(Json).j3t = function (deserializer, element) {
    return readJson(this, element, deserializer);
  };
  protoOf(Json).k3t = function (string) {
    return this.h3t(JsonElementSerializer_getInstance(), string);
  };
  function Json_0(from, builderAction) {
    from = from === VOID ? Default_getInstance() : from;
    var builder = new JsonBuilder(from);
    builderAction(builder);
    var conf = builder.s3u();
    return new JsonImpl(conf, builder.r3u_1);
  }
  function JsonBuilder(json) {
    this.a3u_1 = json.d3t_1.t3u_1;
    this.b3u_1 = json.d3t_1.y3u_1;
    this.c3u_1 = json.d3t_1.u3u_1;
    this.d3u_1 = json.d3t_1.v3u_1;
    this.e3u_1 = json.d3t_1.x3u_1;
    this.f3u_1 = json.d3t_1.z3u_1;
    this.g3u_1 = json.d3t_1.a3v_1;
    this.h3u_1 = json.d3t_1.c3v_1;
    this.i3u_1 = json.d3t_1.j3v_1;
    this.j3u_1 = json.d3t_1.e3v_1;
    this.k3u_1 = json.d3t_1.f3v_1;
    this.l3u_1 = json.d3t_1.g3v_1;
    this.m3u_1 = json.d3t_1.h3v_1;
    this.n3u_1 = json.d3t_1.i3v_1;
    this.o3u_1 = json.d3t_1.d3v_1;
    this.p3u_1 = json.d3t_1.w3u_1;
    this.q3u_1 = json.d3t_1.b3v_1;
    this.r3u_1 = json.j1o();
  }
  protoOf(JsonBuilder).s3u = function () {
    if (this.q3u_1) {
      // Inline function 'kotlin.require' call
      if (!(this.h3u_1 === 'type')) {
        var message = 'Class discriminator should not be specified when array polymorphism is specified';
        throw IllegalArgumentException_init_$Create$(toString(message));
      }
      // Inline function 'kotlin.require' call
      if (!this.i3u_1.equals(ClassDiscriminatorMode_POLYMORPHIC_getInstance())) {
        var message_0 = 'useArrayPolymorphism option can only be used if classDiscriminatorMode in a default POLYMORPHIC state.';
        throw IllegalArgumentException_init_$Create$(toString(message_0));
      }
    }
    if (!this.e3u_1) {
      // Inline function 'kotlin.require' call
      if (!(this.f3u_1 === '    ')) {
        var message_1 = 'Indent should not be specified when default printing mode is used';
        throw IllegalArgumentException_init_$Create$(toString(message_1));
      }
    } else if (!(this.f3u_1 === '    ')) {
      var tmp3 = this.f3u_1;
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
        var message_2 = 'Only whitespace, tab, newline and carriage return are allowed as pretty print symbols. Had ' + this.f3u_1;
        throw IllegalArgumentException_init_$Create$(toString(message_2));
      }
    }
    return new JsonConfiguration(this.a3u_1, this.c3u_1, this.d3u_1, this.p3u_1, this.e3u_1, this.b3u_1, this.f3u_1, this.g3u_1, this.q3u_1, this.h3u_1, this.o3u_1, this.j3u_1, this.k3u_1, this.l3u_1, this.m3u_1, this.n3u_1, this.i3u_1);
  };
  function validateConfiguration($this) {
    if (equals($this.j1o(), EmptySerializersModule()))
      return Unit_instance;
    var collector = new PolymorphismValidator($this.d3t_1.b3v_1, $this.d3t_1.c3v_1);
    $this.j1o().v24(collector);
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
    this.t3u_1 = encodeDefaults;
    this.u3u_1 = ignoreUnknownKeys;
    this.v3u_1 = isLenient;
    this.w3u_1 = allowStructuredMapKeys;
    this.x3u_1 = prettyPrint;
    this.y3u_1 = explicitNulls;
    this.z3u_1 = prettyPrintIndent;
    this.a3v_1 = coerceInputValues;
    this.b3v_1 = useArrayPolymorphism;
    this.c3v_1 = classDiscriminator;
    this.d3v_1 = allowSpecialFloatingPointValues;
    this.e3v_1 = useAlternativeNames;
    this.f3v_1 = namingStrategy;
    this.g3v_1 = decodeEnumsCaseInsensitive;
    this.h3v_1 = allowTrailingComma;
    this.i3v_1 = allowComments;
    this.j3v_1 = classDiscriminatorMode;
  }
  protoOf(JsonConfiguration).toString = function () {
    return 'JsonConfiguration(encodeDefaults=' + this.t3u_1 + ', ignoreUnknownKeys=' + this.u3u_1 + ', isLenient=' + this.v3u_1 + ', ' + ('allowStructuredMapKeys=' + this.w3u_1 + ', prettyPrint=' + this.x3u_1 + ', explicitNulls=' + this.y3u_1 + ', ') + ("prettyPrintIndent='" + this.z3u_1 + "', coerceInputValues=" + this.a3v_1 + ', useArrayPolymorphism=' + this.b3v_1 + ', ') + ("classDiscriminator='" + this.c3v_1 + "', allowSpecialFloatingPointValues=" + this.d3v_1 + ', ') + ('useAlternativeNames=' + this.e3v_1 + ', namingStrategy=' + toString_0(this.f3v_1) + ', decodeEnumsCaseInsensitive=' + this.g3v_1 + ', ') + ('allowTrailingComma=' + this.h3v_1 + ', allowComments=' + this.i3v_1 + ', classDiscriminatorMode=' + this.j3v_1.toString() + ')');
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
    return this.n3v();
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
  protoOf(Companion_1).o3v = function () {
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
    this_0.e8(_Char___init__impl__6a9atx(58));
    this_0.c8(v);
    return this_0.toString();
  }
  function JsonObject(content) {
    JsonElement.call(this);
    this.p3v_1 = content;
  }
  protoOf(JsonObject).equals = function (other) {
    return equals(this.p3v_1, other);
  };
  protoOf(JsonObject).hashCode = function () {
    return hashCode(this.p3v_1);
  };
  protoOf(JsonObject).toString = function () {
    var tmp = this.p3v_1.u();
    return joinToString(tmp, ',', '{', '}', VOID, VOID, JsonObject$toString$lambda);
  };
  protoOf(JsonObject).z25 = function (key) {
    return this.p3v_1.d2(key);
  };
  protoOf(JsonObject).d2 = function (key) {
    if (!(!(key == null) ? typeof key === 'string' : false))
      return false;
    return this.z25((!(key == null) ? typeof key === 'string' : false) ? key : THROW_CCE());
  };
  protoOf(JsonObject).ce = function (key) {
    return this.p3v_1.f2(key);
  };
  protoOf(JsonObject).f2 = function (key) {
    if (!(!(key == null) ? typeof key === 'string' : false))
      return null;
    return this.ce((!(key == null) ? typeof key === 'string' : false) ? key : THROW_CCE());
  };
  protoOf(JsonObject).p = function () {
    return this.p3v_1.p();
  };
  protoOf(JsonObject).u = function () {
    return this.p3v_1.u();
  };
  protoOf(JsonObject).g2 = function () {
    return this.p3v_1.g2();
  };
  protoOf(JsonObject).j = function () {
    return this.p3v_1.j();
  };
  protoOf(JsonObject).h2 = function () {
    return this.p3v_1.h2();
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
    return toDoubleOrNull(_this__u8e3s4.n3v());
  }
  function Companion_2() {
  }
  var Companion_instance_2;
  function Companion_getInstance_6() {
    return Companion_instance_2;
  }
  function JsonArray(content) {
    JsonElement.call(this);
    this.q3v_1 = content;
  }
  protoOf(JsonArray).equals = function (other) {
    return equals(this.q3v_1, other);
  };
  protoOf(JsonArray).hashCode = function () {
    return hashCode(this.q3v_1);
  };
  protoOf(JsonArray).toString = function () {
    return joinToString(this.q3v_1, ',', '[', ']');
  };
  protoOf(JsonArray).r3v = function (element) {
    return this.q3v_1.r(element);
  };
  protoOf(JsonArray).r = function (element) {
    if (!(element instanceof JsonElement))
      return false;
    return this.r3v(element instanceof JsonElement ? element : THROW_CCE());
  };
  protoOf(JsonArray).s3v = function (elements) {
    return this.q3v_1.w1(elements);
  };
  protoOf(JsonArray).w1 = function (elements) {
    return this.s3v(elements);
  };
  protoOf(JsonArray).o = function (index) {
    return this.q3v_1.o(index);
  };
  protoOf(JsonArray).t3v = function (element) {
    return this.q3v_1.s(element);
  };
  protoOf(JsonArray).s = function (element) {
    if (!(element instanceof JsonElement))
      return -1;
    return this.t3v(element instanceof JsonElement ? element : THROW_CCE());
  };
  protoOf(JsonArray).p = function () {
    return this.q3v_1.p();
  };
  protoOf(JsonArray).g = function () {
    return this.q3v_1.g();
  };
  protoOf(JsonArray).q = function (index) {
    return this.q3v_1.q(index);
  };
  protoOf(JsonArray).x1 = function (fromIndex, toIndex) {
    return this.q3v_1.x1(fromIndex, toIndex);
  };
  protoOf(JsonArray).j = function () {
    return this.q3v_1.j();
  };
  function get_intOrNull(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    // Inline function 'kotlinx.serialization.json.mapExceptionsToNull' call
    var tmp;
    try {
      tmp = (new StringJsonLexer(_this__u8e3s4.n3v())).u3v();
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
      tmp = _this__u8e3s4.n3v();
    }
    return tmp;
  }
  function get_booleanOrNull(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    return toBooleanStrictOrNull_0(_this__u8e3s4.n3v());
  }
  function get_floatOrNull(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    // Inline function 'kotlin.text.toFloatOrNull' call
    var this_0 = _this__u8e3s4.n3v();
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return toDoubleOrNull(this_0);
  }
  function JsonNull() {
    JsonNull_instance = this;
    JsonPrimitive.call(this);
    this.v3v_1 = 'null';
  }
  protoOf(JsonNull).m3v = function () {
    return false;
  };
  protoOf(JsonNull).n3v = function () {
    return this.v3v_1;
  };
  protoOf(JsonNull).o3v = function () {
    return JsonNullSerializer_getInstance();
  };
  protoOf(JsonNull).k1w = function (typeParamsSerializers) {
    return this.o3v();
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
    return toDouble(_this__u8e3s4.n3v());
  }
  function get_longOrNull(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    // Inline function 'kotlinx.serialization.json.mapExceptionsToNull' call
    var tmp;
    try {
      tmp = (new StringJsonLexer(_this__u8e3s4.n3v())).u3v();
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
    this.w3v_1 = isString;
    this.x3v_1 = coerceToInlineType;
    this.y3v_1 = toString(body);
    if (!(this.x3v_1 == null)) {
      // Inline function 'kotlin.require' call
      // Inline function 'kotlin.require' call
      if (!this.x3v_1.z1l()) {
        var message = 'Failed requirement.';
        throw IllegalArgumentException_init_$Create$(toString(message));
      }
    }
  }
  protoOf(JsonLiteral).m3v = function () {
    return this.w3v_1;
  };
  protoOf(JsonLiteral).n3v = function () {
    return this.y3v_1;
  };
  protoOf(JsonLiteral).toString = function () {
    var tmp;
    if (this.w3v_1) {
      // Inline function 'kotlin.text.buildString' call
      // Inline function 'kotlin.apply' call
      var this_0 = StringBuilder_init_$Create$();
      printQuoted(this_0, this.y3v_1);
      tmp = this_0.toString();
    } else {
      tmp = this.y3v_1;
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
    if (!(this.w3v_1 === other.w3v_1))
      return false;
    if (!(this.y3v_1 === other.y3v_1))
      return false;
    return true;
  };
  protoOf(JsonLiteral).hashCode = function () {
    var result = getBooleanHashCode(this.w3v_1);
    result = imul(31, result) + getStringHashCode(this.y3v_1) | 0;
    return result;
  };
  function get_int(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    // Inline function 'kotlinx.serialization.json.mapExceptions' call
    var tmp;
    try {
      tmp = (new StringJsonLexer(_this__u8e3s4.n3v())).u3v();
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
      throw NumberFormatException_init_$Create$(_this__u8e3s4.n3v() + ' is not an Int');
    return result.g1();
  }
  function get_long(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    // Inline function 'kotlinx.serialization.json.mapExceptions' call
    var tmp;
    try {
      tmp = (new StringJsonLexer(_this__u8e3s4.n3v())).u3v();
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
    var this_0 = _this__u8e3s4.n3v();
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
    tmp.z3v_1 = LinkedHashMap_init_$Create$();
  }
  protoOf(JsonObjectBuilder).a3w = function (key, element) {
    return this.z3v_1.i2(key, element);
  };
  protoOf(JsonObjectBuilder).s3u = function () {
    return new JsonObject(this.z3v_1);
  };
  function JsonArrayBuilder() {
    var tmp = this;
    // Inline function 'kotlin.collections.mutableListOf' call
    tmp.b3w_1 = ArrayList_init_$Create$();
  }
  protoOf(JsonArrayBuilder).c3w = function (element) {
    // Inline function 'kotlin.collections.plusAssign' call
    this.b3w_1.e(element);
    return true;
  };
  protoOf(JsonArrayBuilder).s3u = function () {
    return new JsonArray(this.b3w_1);
  };
  function put(_this__u8e3s4, key, value) {
    return _this__u8e3s4.a3w(key, JsonPrimitive_2(value));
  }
  function put_0(_this__u8e3s4, key, value) {
    return _this__u8e3s4.a3w(key, JsonPrimitive_0(value));
  }
  function put_1(_this__u8e3s4, key, value) {
    return _this__u8e3s4.a3w(key, JsonPrimitive_1(value));
  }
  function putJsonObject(_this__u8e3s4, key, builderAction) {
    // Inline function 'kotlinx.serialization.json.buildJsonObject' call
    var builder = new JsonObjectBuilder();
    builderAction(builder);
    var tmp$ret$0 = builder.s3u();
    return _this__u8e3s4.a3w(key, tmp$ret$0);
  }
  function putJsonArray(_this__u8e3s4, key, builderAction) {
    // Inline function 'kotlinx.serialization.json.buildJsonArray' call
    var builder = new JsonArrayBuilder();
    builderAction(builder);
    var tmp$ret$0 = builder.s3u();
    return _this__u8e3s4.a3w(key, tmp$ret$0);
  }
  function add(_this__u8e3s4, value) {
    return _this__u8e3s4.c3w(JsonPrimitive_2(value));
  }
  function addJsonObject(_this__u8e3s4, builderAction) {
    // Inline function 'kotlinx.serialization.json.buildJsonObject' call
    var builder = new JsonObjectBuilder();
    builderAction(builder);
    var tmp$ret$0 = builder.s3u();
    return _this__u8e3s4.c3w(tmp$ret$0);
  }
  function JsonObjectDescriptor() {
    JsonObjectDescriptor_instance = this;
    this.d3w_1 = MapSerializer(serializer(StringCompanionObject_instance), JsonElementSerializer_getInstance()).t1k();
    this.e3w_1 = 'kotlinx.serialization.json.JsonObject';
  }
  protoOf(JsonObjectDescriptor).x1l = function () {
    return this.e3w_1;
  };
  protoOf(JsonObjectDescriptor).c1m = function (index) {
    return this.d3w_1.c1m(index);
  };
  protoOf(JsonObjectDescriptor).d1m = function (name) {
    return this.d3w_1.d1m(name);
  };
  protoOf(JsonObjectDescriptor).e1m = function (index) {
    return this.d3w_1.e1m(index);
  };
  protoOf(JsonObjectDescriptor).f1m = function (index) {
    return this.d3w_1.f1m(index);
  };
  protoOf(JsonObjectDescriptor).g1m = function (index) {
    return this.d3w_1.g1m(index);
  };
  protoOf(JsonObjectDescriptor).y1l = function () {
    return this.d3w_1.y1l();
  };
  protoOf(JsonObjectDescriptor).t1l = function () {
    return this.d3w_1.t1l();
  };
  protoOf(JsonObjectDescriptor).z1l = function () {
    return this.d3w_1.z1l();
  };
  protoOf(JsonObjectDescriptor).a1m = function () {
    return this.d3w_1.a1m();
  };
  protoOf(JsonObjectDescriptor).b1m = function () {
    return this.d3w_1.b1m();
  };
  var JsonObjectDescriptor_instance;
  function JsonObjectDescriptor_getInstance() {
    if (JsonObjectDescriptor_instance == null)
      new JsonObjectDescriptor();
    return JsonObjectDescriptor_instance;
  }
  function JsonObjectSerializer() {
    JsonObjectSerializer_instance = this;
    this.f3w_1 = JsonObjectDescriptor_getInstance();
  }
  protoOf(JsonObjectSerializer).t1k = function () {
    return this.f3w_1;
  };
  protoOf(JsonObjectSerializer).g3w = function (encoder, value) {
    verify(encoder);
    MapSerializer(serializer(StringCompanionObject_instance), JsonElementSerializer_getInstance()).u1k(encoder, value);
  };
  protoOf(JsonObjectSerializer).u1k = function (encoder, value) {
    return this.g3w(encoder, value instanceof JsonObject ? value : THROW_CCE());
  };
  protoOf(JsonObjectSerializer).v1k = function (decoder) {
    verify_0(decoder);
    return new JsonObject(MapSerializer(serializer(StringCompanionObject_instance), JsonElementSerializer_getInstance()).v1k(decoder));
  };
  var JsonObjectSerializer_instance;
  function JsonObjectSerializer_getInstance() {
    if (JsonObjectSerializer_instance == null)
      new JsonObjectSerializer();
    return JsonObjectSerializer_instance;
  }
  function JsonElementSerializer$descriptor$lambda($this$buildSerialDescriptor) {
    $this$buildSerialDescriptor.e1l('JsonPrimitive', defer(JsonElementSerializer$descriptor$lambda$lambda));
    $this$buildSerialDescriptor.e1l('JsonNull', defer(JsonElementSerializer$descriptor$lambda$lambda_0));
    $this$buildSerialDescriptor.e1l('JsonLiteral', defer(JsonElementSerializer$descriptor$lambda$lambda_1));
    $this$buildSerialDescriptor.e1l('JsonObject', defer(JsonElementSerializer$descriptor$lambda$lambda_2));
    $this$buildSerialDescriptor.e1l('JsonArray', defer(JsonElementSerializer$descriptor$lambda$lambda_3));
    return Unit_instance;
  }
  function JsonElementSerializer$descriptor$lambda$lambda() {
    return JsonPrimitiveSerializer_getInstance().h3w_1;
  }
  function JsonElementSerializer$descriptor$lambda$lambda_0() {
    return JsonNullSerializer_getInstance().i3w_1;
  }
  function JsonElementSerializer$descriptor$lambda$lambda_1() {
    return JsonLiteralSerializer_getInstance().j3w_1;
  }
  function JsonElementSerializer$descriptor$lambda$lambda_2() {
    return JsonObjectSerializer_getInstance().f3w_1;
  }
  function JsonElementSerializer$descriptor$lambda$lambda_3() {
    return JsonArraySerializer_getInstance().k3w_1;
  }
  function JsonElementSerializer() {
    JsonElementSerializer_instance = this;
    var tmp = this;
    var tmp_0 = SEALED_getInstance();
    tmp.l3w_1 = buildSerialDescriptor('kotlinx.serialization.json.JsonElement', tmp_0, [], JsonElementSerializer$descriptor$lambda);
  }
  protoOf(JsonElementSerializer).t1k = function () {
    return this.l3w_1;
  };
  protoOf(JsonElementSerializer).m3w = function (encoder, value) {
    verify(encoder);
    if (value instanceof JsonPrimitive) {
      encoder.m1p(JsonPrimitiveSerializer_getInstance(), value);
    } else {
      if (value instanceof JsonObject) {
        encoder.m1p(JsonObjectSerializer_getInstance(), value);
      } else {
        if (value instanceof JsonArray) {
          encoder.m1p(JsonArraySerializer_getInstance(), value);
        } else {
          noWhenBranchMatchedException();
        }
      }
    }
  };
  protoOf(JsonElementSerializer).u1k = function (encoder, value) {
    return this.m3w(encoder, value instanceof JsonElement ? value : THROW_CCE());
  };
  protoOf(JsonElementSerializer).v1k = function (decoder) {
    var input = asJsonDecoder(decoder);
    return input.l3v();
  };
  var JsonElementSerializer_instance;
  function JsonElementSerializer_getInstance() {
    if (JsonElementSerializer_instance == null)
      new JsonElementSerializer();
    return JsonElementSerializer_instance;
  }
  function JsonPrimitiveSerializer() {
    JsonPrimitiveSerializer_instance = this;
    this.h3w_1 = buildSerialDescriptor('kotlinx.serialization.json.JsonPrimitive', STRING_getInstance(), []);
  }
  protoOf(JsonPrimitiveSerializer).t1k = function () {
    return this.h3w_1;
  };
  protoOf(JsonPrimitiveSerializer).n3w = function (encoder, value) {
    verify(encoder);
    var tmp;
    if (value instanceof JsonNull) {
      encoder.m1p(JsonNullSerializer_getInstance(), JsonNull_getInstance());
      tmp = Unit_instance;
    } else {
      var tmp_0 = JsonLiteralSerializer_getInstance();
      encoder.m1p(tmp_0, value instanceof JsonLiteral ? value : THROW_CCE());
      tmp = Unit_instance;
    }
    return tmp;
  };
  protoOf(JsonPrimitiveSerializer).u1k = function (encoder, value) {
    return this.n3w(encoder, value instanceof JsonPrimitive ? value : THROW_CCE());
  };
  protoOf(JsonPrimitiveSerializer).v1k = function (decoder) {
    var result = asJsonDecoder(decoder).l3v();
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
    this.o3w_1 = ListSerializer(JsonElementSerializer_getInstance()).t1k();
    this.p3w_1 = 'kotlinx.serialization.json.JsonArray';
  }
  protoOf(JsonArrayDescriptor).x1l = function () {
    return this.p3w_1;
  };
  protoOf(JsonArrayDescriptor).c1m = function (index) {
    return this.o3w_1.c1m(index);
  };
  protoOf(JsonArrayDescriptor).d1m = function (name) {
    return this.o3w_1.d1m(name);
  };
  protoOf(JsonArrayDescriptor).e1m = function (index) {
    return this.o3w_1.e1m(index);
  };
  protoOf(JsonArrayDescriptor).f1m = function (index) {
    return this.o3w_1.f1m(index);
  };
  protoOf(JsonArrayDescriptor).g1m = function (index) {
    return this.o3w_1.g1m(index);
  };
  protoOf(JsonArrayDescriptor).y1l = function () {
    return this.o3w_1.y1l();
  };
  protoOf(JsonArrayDescriptor).t1l = function () {
    return this.o3w_1.t1l();
  };
  protoOf(JsonArrayDescriptor).z1l = function () {
    return this.o3w_1.z1l();
  };
  protoOf(JsonArrayDescriptor).a1m = function () {
    return this.o3w_1.a1m();
  };
  protoOf(JsonArrayDescriptor).b1m = function () {
    return this.o3w_1.b1m();
  };
  var JsonArrayDescriptor_instance;
  function JsonArrayDescriptor_getInstance() {
    if (JsonArrayDescriptor_instance == null)
      new JsonArrayDescriptor();
    return JsonArrayDescriptor_instance;
  }
  function JsonArraySerializer() {
    JsonArraySerializer_instance = this;
    this.k3w_1 = JsonArrayDescriptor_getInstance();
  }
  protoOf(JsonArraySerializer).t1k = function () {
    return this.k3w_1;
  };
  protoOf(JsonArraySerializer).q3w = function (encoder, value) {
    verify(encoder);
    ListSerializer(JsonElementSerializer_getInstance()).u1k(encoder, value);
  };
  protoOf(JsonArraySerializer).u1k = function (encoder, value) {
    return this.q3w(encoder, value instanceof JsonArray ? value : THROW_CCE());
  };
  protoOf(JsonArraySerializer).v1k = function (decoder) {
    verify_0(decoder);
    return new JsonArray(ListSerializer(JsonElementSerializer_getInstance()).v1k(decoder));
  };
  var JsonArraySerializer_instance;
  function JsonArraySerializer_getInstance() {
    if (JsonArraySerializer_instance == null)
      new JsonArraySerializer();
    return JsonArraySerializer_instance;
  }
  function JsonNullSerializer() {
    JsonNullSerializer_instance = this;
    this.i3w_1 = buildSerialDescriptor('kotlinx.serialization.json.JsonNull', ENUM_getInstance(), []);
  }
  protoOf(JsonNullSerializer).t1k = function () {
    return this.i3w_1;
  };
  protoOf(JsonNullSerializer).r3w = function (encoder, value) {
    verify(encoder);
    encoder.p1o();
  };
  protoOf(JsonNullSerializer).u1k = function (encoder, value) {
    return this.r3w(encoder, value instanceof JsonNull ? value : THROW_CCE());
  };
  protoOf(JsonNullSerializer).v1k = function (decoder) {
    verify_0(decoder);
    if (decoder.f1n()) {
      throw new JsonDecodingException("Expected 'null' literal");
    }
    decoder.g1n();
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
    this.j3w_1 = PrimitiveSerialDescriptor('kotlinx.serialization.json.JsonLiteral', STRING_getInstance());
  }
  protoOf(JsonLiteralSerializer).t1k = function () {
    return this.j3w_1;
  };
  protoOf(JsonLiteralSerializer).s3w = function (encoder, value) {
    verify(encoder);
    if (value.w3v_1) {
      return encoder.y1o(value.y3v_1);
    }
    if (!(value.x3v_1 == null)) {
      return encoder.a1p(value.x3v_1).y1o(value.y3v_1);
    }
    var tmp0_safe_receiver = toLongOrNull(value.y3v_1);
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      return encoder.u1o(tmp0_safe_receiver);
    }
    var tmp1_safe_receiver = toULongOrNull(value.y3v_1);
    var tmp = tmp1_safe_receiver;
    if ((tmp == null ? null : new ULong(tmp)) == null)
      null;
    else {
      var tmp_0 = tmp1_safe_receiver;
      // Inline function 'kotlin.let' call
      var it = (tmp_0 == null ? null : new ULong(tmp_0)).kn_1;
      var tmp_1 = encoder.a1p(serializer_0(Companion_getInstance()).t1k());
      // Inline function 'kotlin.ULong.toLong' call
      var tmp$ret$1 = _ULong___get_data__impl__fggpzb(it);
      tmp_1.u1o(tmp$ret$1);
      return Unit_instance;
    }
    var tmp2_safe_receiver = toDoubleOrNull(value.y3v_1);
    if (tmp2_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      return encoder.w1o(tmp2_safe_receiver);
    }
    var tmp3_safe_receiver = toBooleanStrictOrNull(value.y3v_1);
    if (tmp3_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      return encoder.q1o(tmp3_safe_receiver);
    }
    encoder.y1o(value.y3v_1);
  };
  protoOf(JsonLiteralSerializer).u1k = function (encoder, value) {
    return this.s3w(encoder, value instanceof JsonLiteral ? value : THROW_CCE());
  };
  protoOf(JsonLiteralSerializer).v1k = function (decoder) {
    var result = asJsonDecoder(decoder).l3v();
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
    var tmp0 = $this.t3w_1;
    // Inline function 'kotlin.getValue' call
    original$factory();
    return tmp0.w();
  }
  function defer$1($deferred) {
    this.t3w_1 = lazy($deferred);
  }
  protoOf(defer$1).x1l = function () {
    return _get_original__l7ku1m(this).x1l();
  };
  protoOf(defer$1).y1l = function () {
    return _get_original__l7ku1m(this).y1l();
  };
  protoOf(defer$1).a1m = function () {
    return _get_original__l7ku1m(this).a1m();
  };
  protoOf(defer$1).c1m = function (index) {
    return _get_original__l7ku1m(this).c1m(index);
  };
  protoOf(defer$1).d1m = function (name) {
    return _get_original__l7ku1m(this).d1m(name);
  };
  protoOf(defer$1).e1m = function (index) {
    return _get_original__l7ku1m(this).e1m(index);
  };
  protoOf(defer$1).f1m = function (index) {
    return _get_original__l7ku1m(this).f1m(index);
  };
  protoOf(defer$1).g1m = function (index) {
    return _get_original__l7ku1m(this).g1m(index);
  };
  function original$factory() {
    return getPropertyCallableRef('original', 1, KProperty1, function (receiver) {
      return _get_original__l7ku1m(receiver);
    }, null);
  }
  function JsonEncoder() {
  }
  function Composer(writer) {
    this.u3w_1 = writer;
    this.v3w_1 = true;
  }
  protoOf(Composer).w3w = function () {
    this.v3w_1 = true;
  };
  protoOf(Composer).x3w = function () {
    return Unit_instance;
  };
  protoOf(Composer).y3w = function () {
    this.v3w_1 = false;
  };
  protoOf(Composer).z3w = function () {
    this.v3w_1 = false;
  };
  protoOf(Composer).a3x = function () {
    return Unit_instance;
  };
  protoOf(Composer).b3x = function (v) {
    return this.u3w_1.c3x(v);
  };
  protoOf(Composer).d3x = function (v) {
    return this.u3w_1.e3x(v);
  };
  protoOf(Composer).f3x = function (v) {
    return this.u3w_1.e3x(v.toString());
  };
  protoOf(Composer).g3x = function (v) {
    return this.u3w_1.e3x(v.toString());
  };
  protoOf(Composer).h3x = function (v) {
    return this.u3w_1.i3x(toLong(v));
  };
  protoOf(Composer).j3x = function (v) {
    return this.u3w_1.i3x(toLong(v));
  };
  protoOf(Composer).k3x = function (v) {
    return this.u3w_1.i3x(toLong(v));
  };
  protoOf(Composer).l3x = function (v) {
    return this.u3w_1.i3x(v);
  };
  protoOf(Composer).m3x = function (v) {
    return this.u3w_1.e3x(v.toString());
  };
  protoOf(Composer).n3x = function (value) {
    return this.u3w_1.o3x(value);
  };
  function Composer_0(sb, json) {
    return json.d3t_1.x3u_1 ? new ComposerWithPrettyPrint(sb, json) : new Composer(sb);
  }
  function ComposerForUnsignedNumbers(writer, forceQuoting) {
    Composer.call(this, writer);
    this.r3x_1 = forceQuoting;
  }
  protoOf(ComposerForUnsignedNumbers).k3x = function (v) {
    if (this.r3x_1) {
      // Inline function 'kotlin.toUInt' call
      var tmp$ret$0 = _UInt___init__impl__l7qpdl(v);
      this.n3x(UInt__toString_impl_dbgl21(tmp$ret$0));
    } else {
      // Inline function 'kotlin.toUInt' call
      var tmp$ret$1 = _UInt___init__impl__l7qpdl(v);
      this.d3x(UInt__toString_impl_dbgl21(tmp$ret$1));
    }
  };
  protoOf(ComposerForUnsignedNumbers).l3x = function (v) {
    if (this.r3x_1) {
      // Inline function 'kotlin.toULong' call
      var tmp$ret$0 = _ULong___init__impl__c78o9k(v);
      this.n3x(ULong__toString_impl_f9au7k(tmp$ret$0));
    } else {
      // Inline function 'kotlin.toULong' call
      var tmp$ret$1 = _ULong___init__impl__c78o9k(v);
      this.d3x(ULong__toString_impl_f9au7k(tmp$ret$1));
    }
  };
  protoOf(ComposerForUnsignedNumbers).h3x = function (v) {
    if (this.r3x_1) {
      // Inline function 'kotlin.toUByte' call
      var tmp$ret$0 = _UByte___init__impl__g9hnc4(v);
      this.n3x(UByte__toString_impl_v72jg(tmp$ret$0));
    } else {
      // Inline function 'kotlin.toUByte' call
      var tmp$ret$1 = _UByte___init__impl__g9hnc4(v);
      this.d3x(UByte__toString_impl_v72jg(tmp$ret$1));
    }
  };
  protoOf(ComposerForUnsignedNumbers).j3x = function (v) {
    if (this.r3x_1) {
      // Inline function 'kotlin.toUShort' call
      var tmp$ret$0 = _UShort___init__impl__jigrne(v);
      this.n3x(UShort__toString_impl_edaoee(tmp$ret$0));
    } else {
      // Inline function 'kotlin.toUShort' call
      var tmp$ret$1 = _UShort___init__impl__jigrne(v);
      this.d3x(UShort__toString_impl_edaoee(tmp$ret$1));
    }
  };
  function ComposerForUnquotedLiterals(writer, forceQuoting) {
    Composer.call(this, writer);
    this.u3x_1 = forceQuoting;
  }
  protoOf(ComposerForUnquotedLiterals).n3x = function (value) {
    if (this.u3x_1) {
      protoOf(Composer).n3x.call(this, value);
    } else {
      protoOf(Composer).d3x.call(this, value);
    }
  };
  function ComposerWithPrettyPrint(writer, json) {
    Composer.call(this, writer);
    this.x3x_1 = json;
    this.y3x_1 = 0;
  }
  protoOf(ComposerWithPrettyPrint).w3w = function () {
    this.v3w_1 = true;
    this.y3x_1 = this.y3x_1 + 1 | 0;
  };
  protoOf(ComposerWithPrettyPrint).x3w = function () {
    this.y3x_1 = this.y3x_1 - 1 | 0;
  };
  protoOf(ComposerWithPrettyPrint).y3w = function () {
    this.v3w_1 = false;
    this.d3x('\n');
    // Inline function 'kotlin.repeat' call
    var times = this.y3x_1;
    var inductionVariable = 0;
    if (inductionVariable < times)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        this.d3x(this.x3x_1.d3t_1.z3u_1);
      }
       while (inductionVariable < times);
  };
  protoOf(ComposerWithPrettyPrint).z3w = function () {
    if (this.v3w_1)
      this.v3w_1 = false;
    else {
      this.y3w();
    }
  };
  protoOf(ComposerWithPrettyPrint).a3x = function () {
    this.b3x(_Char___init__impl__6a9atx(32));
  };
  function readIfAbsent($this, descriptor, index) {
    $this.a3y_1 = (!descriptor.g1m(index) && descriptor.f1m(index).t1l());
    return $this.a3y_1;
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
    tmp.z3x_1 = new ElementMarker(descriptor, JsonElementMarker$readIfAbsent$ref(this));
    this.a3y_1 = false;
  }
  protoOf(JsonElementMarker).b3y = function (index) {
    this.z3x_1.a1u(index);
  };
  protoOf(JsonElementMarker).c3y = function () {
    return this.z3x_1.b1u();
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
    _this__u8e3s4.d3y('Trailing comma before the end of JSON ' + entity, _this__u8e3s4.v3t_1 - 1 | 0, "Trailing commas are non-complaint JSON and not allowed by default. Use 'allowTrailingCommas = true' in 'Json {}' builder to support them.");
  }
  function throwInvalidFloatingPointDecoded(_this__u8e3s4, result) {
    _this__u8e3s4.e3y('Unexpected special floating-point value ' + toString(result) + '. By default, ' + 'non-finite floating point values are prohibited because they do not conform JSON specification', VOID, "It is possible to deserialize them using 'JsonBuilder.allowSpecialFloatingPointValues = true'");
  }
  function JsonEncodingException(message) {
    JsonException.call(this, message);
    captureStack(this, JsonEncodingException);
  }
  function InvalidKeyKindException(keyDescriptor) {
    return new JsonEncodingException("Value of type '" + keyDescriptor.x1l() + "' can't be used in JSON as a key in the map. " + ("It should have either primitive or enum kind, but its kind is '" + keyDescriptor.y1l().toString() + "'.\n") + "Use 'allowStructuredMapKeys = true' in 'Json {}' builder to convert such maps to [key1, value1, key2, value2,...] arrays.");
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
    var index = _this__u8e3s4.d1m(name);
    if (!(index === -3))
      return index;
    if (!json.d3t_1.e3v_1)
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
    return strategy == null ? _this__u8e3s4.c1m(index) : serializationNamesIndices(_this__u8e3s4, json, strategy)[index];
  }
  function namingStrategy(_this__u8e3s4, json) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    return equals(_this__u8e3s4.y1l(), CLASS_getInstance()) ? json.d3t_1.f3v_1 : null;
  }
  function deserializationNamesMap(_this__u8e3s4, descriptor) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    var tmp = get_schemaCache(_this__u8e3s4);
    var tmp_0 = get_JsonDeserializationNamesKey();
    return tmp.g3y(descriptor, tmp_0, deserializationNamesMap$lambda(descriptor, _this__u8e3s4));
  }
  function decodeCaseInsensitive(_this__u8e3s4, descriptor) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    return _this__u8e3s4.d3t_1.g3v_1 && equals(descriptor.y1l(), ENUM_getInstance());
  }
  function getJsonNameIndexSlowPath(_this__u8e3s4, json, name) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    var tmp0_elvis_lhs = deserializationNamesMap(json, _this__u8e3s4).f2(name);
    return tmp0_elvis_lhs == null ? -3 : tmp0_elvis_lhs;
  }
  function serializationNamesIndices(_this__u8e3s4, json, strategy) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    var tmp = get_schemaCache(json);
    var tmp_0 = get_JsonSerializationNamesKey();
    return tmp.g3y(_this__u8e3s4, tmp_0, serializationNamesIndices$lambda(_this__u8e3s4, strategy));
  }
  function buildDeserializationNamesMap(_this__u8e3s4, json) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    // Inline function 'kotlin.collections.mutableMapOf' call
    var builder = LinkedHashMap_init_$Create$();
    var useLowercaseEnums = decodeCaseInsensitive(json, _this__u8e3s4);
    var strategyForClasses = namingStrategy(_this__u8e3s4, json);
    var inductionVariable = 0;
    var last = _this__u8e3s4.a1m();
    if (inductionVariable < last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'kotlin.collections.filterIsInstance' call
        var tmp0 = _this__u8e3s4.e1m(i);
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
        var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.h3y_1;
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
          tmp_0 = _this__u8e3s4.c1m(i).toLowerCase();
        } else if (!(strategyForClasses == null)) {
          tmp_0 = strategyForClasses.i3y(_this__u8e3s4, i, _this__u8e3s4.c1m(i));
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
    var entity = equals($this_buildDeserializationNamesMap.y1l(), ENUM_getInstance()) ? 'enum value' : 'property';
    // Inline function 'kotlin.collections.contains' call
    // Inline function 'kotlin.collections.containsKey' call
    if ((isInterface(_this__u8e3s4, KtMap) ? _this__u8e3s4 : THROW_CCE()).d2(name)) {
      throw new JsonException("The suggested name '" + name + "' for " + entity + ' ' + $this_buildDeserializationNamesMap.c1m(index) + ' is already one of the names for ' + entity + ' ' + ($this_buildDeserializationNamesMap.c1m(getValue(_this__u8e3s4, name)) + ' in ' + toString($this_buildDeserializationNamesMap)));
    }
    // Inline function 'kotlin.collections.set' call
    _this__u8e3s4.i2(name, index);
  }
  function deserializationNamesMap$lambda($descriptor, $this_deserializationNamesMap) {
    return function () {
      return buildDeserializationNamesMap($descriptor, $this_deserializationNamesMap);
    };
  }
  function serializationNamesIndices$lambda($this_serializationNamesIndices, $strategy) {
    return function () {
      var tmp = 0;
      var tmp_0 = $this_serializationNamesIndices.a1m();
      // Inline function 'kotlin.arrayOfNulls' call
      var tmp_1 = Array(tmp_0);
      while (tmp < tmp_0) {
        var tmp_2 = tmp;
        var baseName = $this_serializationNamesIndices.c1m(tmp_2);
        tmp_1[tmp_2] = $strategy.i3y($this_serializationNamesIndices, tmp_2, baseName);
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
    var newSize = imul($this.l3y_1, 2);
    $this.j3y_1 = copyOf($this.j3y_1, newSize);
    $this.k3y_1 = copyOf_0($this.k3y_1, newSize);
  }
  function JsonPath() {
    var tmp = this;
    // Inline function 'kotlin.arrayOfNulls' call
    tmp.j3y_1 = Array(8);
    var tmp_0 = this;
    var tmp_1 = 0;
    var tmp_2 = new Int32Array(8);
    while (tmp_1 < 8) {
      tmp_2[tmp_1] = -1;
      tmp_1 = tmp_1 + 1 | 0;
    }
    tmp_0.k3y_1 = tmp_2;
    this.l3y_1 = -1;
  }
  protoOf(JsonPath).m3y = function (sd) {
    this.l3y_1 = this.l3y_1 + 1 | 0;
    var depth = this.l3y_1;
    if (depth === this.j3y_1.length) {
      resize(this);
    }
    this.j3y_1[depth] = sd;
  };
  protoOf(JsonPath).n3y = function (index) {
    this.k3y_1[this.l3y_1] = index;
  };
  protoOf(JsonPath).o3y = function (key) {
    var tmp;
    if (!(this.k3y_1[this.l3y_1] === -2)) {
      this.l3y_1 = this.l3y_1 + 1 | 0;
      tmp = this.l3y_1 === this.j3y_1.length;
    } else {
      tmp = false;
    }
    if (tmp) {
      resize(this);
    }
    this.j3y_1[this.l3y_1] = key;
    this.k3y_1[this.l3y_1] = -2;
  };
  protoOf(JsonPath).p3y = function () {
    if (this.k3y_1[this.l3y_1] === -2) {
      this.j3y_1[this.l3y_1] = Tombstone_instance;
    }
  };
  protoOf(JsonPath).q3y = function () {
    var depth = this.l3y_1;
    if (this.k3y_1[depth] === -2) {
      this.k3y_1[depth] = -1;
      this.l3y_1 = this.l3y_1 - 1 | 0;
    }
    if (!(this.l3y_1 === -1)) {
      this.l3y_1 = this.l3y_1 - 1 | 0;
    }
  };
  protoOf(JsonPath).r3y = function () {
    // Inline function 'kotlin.text.buildString' call
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$();
    this_0.d8('$');
    // Inline function 'kotlin.repeat' call
    var times = this.l3y_1 + 1 | 0;
    var inductionVariable = 0;
    if (inductionVariable < times)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var element = this.j3y_1[index];
        if (!(element == null) ? isInterface(element, SerialDescriptor) : false) {
          if (equals(element.y1l(), LIST_getInstance())) {
            if (!(this.k3y_1[index] === -1)) {
              this_0.d8('[');
              this_0.rc(this.k3y_1[index]);
              this_0.d8(']');
            }
          } else {
            var idx = this.k3y_1[index];
            if (idx >= 0) {
              this_0.d8('.');
              this_0.d8(element.c1m(idx));
            }
          }
        } else {
          if (!(element === Tombstone_instance)) {
            this_0.d8('[');
            this_0.d8("'");
            this_0.c8(element);
            this_0.d8("'");
            this_0.d8(']');
          }
        }
      }
       while (inductionVariable < times);
    return this_0.toString();
  };
  protoOf(JsonPath).toString = function () {
    return this.r3y();
  };
  function encodeByWriter(json, writer, serializer, value) {
    var tmp = WriteMode_OBJ_getInstance();
    // Inline function 'kotlin.arrayOfNulls' call
    var size = get_entries().j();
    var tmp$ret$0 = Array(size);
    var encoder = StreamingJsonEncoder_init_$Create$(writer, json, tmp, tmp$ret$0);
    encoder.m1p(serializer, value);
  }
  function readObject($this) {
    // Inline function 'kotlinx.serialization.json.internal.JsonTreeReader.readObjectImpl' call
    var lastToken = $this.b3z_1.f3z(6);
    if ($this.b3z_1.g3z() === 4) {
      $this.b3z_1.e3y('Unexpected leading comma');
    }
    // Inline function 'kotlin.collections.linkedMapOf' call
    var result = LinkedHashMap_init_$Create$();
    $l$loop: while ($this.b3z_1.h3z()) {
      var key = $this.c3z_1 ? $this.b3z_1.j3z() : $this.b3z_1.i3z();
      $this.b3z_1.f3z(5);
      var element = $this.k3z();
      // Inline function 'kotlin.collections.set' call
      result.i2(key, element);
      lastToken = $this.b3z_1.l3z();
      var tmp0_subject = lastToken;
      if (tmp0_subject !== 4)
        if (tmp0_subject === 7)
          break $l$loop;
        else {
          $this.b3z_1.e3y('Expected end of the object or comma');
        }
    }
    if (lastToken === 6) {
      $this.b3z_1.f3z(7);
    } else if (lastToken === 4) {
      if (!$this.d3z_1) {
        invalidTrailingComma($this.b3z_1);
      }
      $this.b3z_1.f3z(7);
    }
    return new JsonObject(result);
  }
  function readObject_0($this, _this__u8e3s4, $completion) {
    var tmp = new $readObjectCOROUTINE$0($this, _this__u8e3s4, $completion);
    tmp.a9_1 = Unit_instance;
    tmp.b9_1 = null;
    return tmp.g9();
  }
  function readArray($this) {
    var lastToken = $this.b3z_1.l3z();
    if ($this.b3z_1.g3z() === 4) {
      $this.b3z_1.e3y('Unexpected leading comma');
    }
    // Inline function 'kotlin.collections.arrayListOf' call
    var result = ArrayList_init_$Create$();
    while ($this.b3z_1.h3z()) {
      var element = $this.k3z();
      result.e(element);
      lastToken = $this.b3z_1.l3z();
      if (!(lastToken === 4)) {
        var tmp0 = $this.b3z_1;
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.require' call
        var condition = lastToken === 9;
        var position = tmp0.v3t_1;
        if (!condition) {
          var tmp$ret$1 = 'Expected end of the array or comma';
          tmp0.e3y(tmp$ret$1, position);
        }
      }
    }
    if (lastToken === 8) {
      $this.b3z_1.f3z(9);
    } else if (lastToken === 4) {
      if (!$this.d3z_1) {
        invalidTrailingComma($this.b3z_1, 'array');
      }
      $this.b3z_1.f3z(9);
    }
    return new JsonArray(result);
  }
  function readValue($this, isString) {
    var tmp;
    if ($this.c3z_1 || !isString) {
      tmp = $this.b3z_1.j3z();
    } else {
      tmp = $this.b3z_1.i3z();
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
    this.j40_1 = this$0;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(JsonTreeReader$readDeepRecursive$slambda).o40 = function ($this$DeepRecursiveFunction, it, $completion) {
    var tmp = this.p40($this$DeepRecursiveFunction, it, $completion);
    tmp.a9_1 = Unit_instance;
    tmp.b9_1 = null;
    return tmp.g9();
  };
  protoOf(JsonTreeReader$readDeepRecursive$slambda).r9 = function (p1, p2, $completion) {
    var tmp = p1 instanceof DeepRecursiveScope ? p1 : THROW_CCE();
    return this.o40(tmp, p2 instanceof Unit ? p2 : THROW_CCE(), $completion);
  };
  protoOf(JsonTreeReader$readDeepRecursive$slambda).g9 = function () {
    var suspendResult = this.a9_1;
    $sm: do
      try {
        var tmp = this.y8_1;
        switch (tmp) {
          case 0:
            this.z8_1 = 3;
            this.m40_1 = this.j40_1.b3z_1.g3z();
            if (this.m40_1 === 1) {
              this.n40_1 = readValue(this.j40_1, true);
              this.y8_1 = 2;
              continue $sm;
            } else {
              if (this.m40_1 === 0) {
                this.n40_1 = readValue(this.j40_1, false);
                this.y8_1 = 2;
                continue $sm;
              } else {
                if (this.m40_1 === 6) {
                  this.y8_1 = 1;
                  suspendResult = readObject_0(this.j40_1, this.k40_1, this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  if (this.m40_1 === 8) {
                    this.n40_1 = readArray(this.j40_1);
                    this.y8_1 = 2;
                    continue $sm;
                  } else {
                    var tmp_0 = this;
                    this.j40_1.b3z_1.e3y("Can't begin reading element, unexpected token");
                  }
                }
              }
            }

            break;
          case 1:
            this.n40_1 = suspendResult;
            this.y8_1 = 2;
            continue $sm;
          case 2:
            return this.n40_1;
          case 3:
            throw this.b9_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.z8_1 === 3) {
          throw e;
        } else {
          this.y8_1 = this.z8_1;
          this.b9_1 = e;
        }
      }
     while (true);
  };
  protoOf(JsonTreeReader$readDeepRecursive$slambda).p40 = function ($this$DeepRecursiveFunction, it, completion) {
    var i = new JsonTreeReader$readDeepRecursive$slambda(this.j40_1, completion);
    i.k40_1 = $this$DeepRecursiveFunction;
    i.l40_1 = it;
    return i;
  };
  function JsonTreeReader$readDeepRecursive$slambda_0(this$0, resultContinuation) {
    var i = new JsonTreeReader$readDeepRecursive$slambda(this$0, resultContinuation);
    var l = function ($this$DeepRecursiveFunction, it, $completion) {
      return i.o40($this$DeepRecursiveFunction, it, $completion);
    };
    l.$arity = 2;
    return l;
  }
  function $readObjectCOROUTINE$0(_this__u8e3s4, _this__u8e3s4_0, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.u3z_1 = _this__u8e3s4;
    this.v3z_1 = _this__u8e3s4_0;
  }
  protoOf($readObjectCOROUTINE$0).g9 = function () {
    var suspendResult = this.a9_1;
    $sm: do
      try {
        var tmp = this.y8_1;
        switch (tmp) {
          case 0:
            this.z8_1 = 5;
            var tmp_0 = this;
            tmp_0.w3z_1 = this.u3z_1;
            this.x3z_1 = this.w3z_1;
            this.y3z_1 = this.x3z_1.b3z_1.f3z(6);
            if (this.x3z_1.b3z_1.g3z() === 4) {
              this.x3z_1.b3z_1.e3y('Unexpected leading comma');
            }

            var tmp_1 = this;
            tmp_1.z3z_1 = LinkedHashMap_init_$Create$();
            this.y8_1 = 1;
            continue $sm;
          case 1:
            if (!this.x3z_1.b3z_1.h3z()) {
              this.y8_1 = 4;
              continue $sm;
            }

            this.a40_1 = this.x3z_1.c3z_1 ? this.x3z_1.b3z_1.j3z() : this.x3z_1.b3z_1.i3z();
            this.x3z_1.b3z_1.f3z(5);
            this.y8_1 = 2;
            suspendResult = this.v3z_1.ml(Unit_instance, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            var element = suspendResult;
            var tmp0 = this.z3z_1;
            var key = this.a40_1;
            tmp0.i2(key, element);
            this.y3z_1 = this.x3z_1.b3z_1.l3z();
            var tmp0_subject = this.y3z_1;
            if (tmp0_subject === 4) {
              this.y8_1 = 3;
              continue $sm;
            } else {
              if (tmp0_subject === 7) {
                this.y8_1 = 4;
                continue $sm;
              } else {
                this.x3z_1.b3z_1.e3y('Expected end of the object or comma');
              }
            }

            break;
          case 3:
            this.y8_1 = 1;
            continue $sm;
          case 4:
            if (this.y3z_1 === 6) {
              this.x3z_1.b3z_1.f3z(7);
            } else if (this.y3z_1 === 4) {
              if (!this.x3z_1.d3z_1) {
                invalidTrailingComma(this.x3z_1.b3z_1);
              }
              this.x3z_1.b3z_1.f3z(7);
            }

            return new JsonObject(this.z3z_1);
          case 5:
            throw this.b9_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.z8_1 === 5) {
          throw e;
        } else {
          this.y8_1 = this.z8_1;
          this.b9_1 = e;
        }
      }
     while (true);
  };
  function JsonTreeReader(configuration, lexer) {
    this.b3z_1 = lexer;
    this.c3z_1 = configuration.v3u_1;
    this.d3z_1 = configuration.h3v_1;
    this.e3z_1 = 0;
  }
  protoOf(JsonTreeReader).k3z = function () {
    var token = this.b3z_1.g3z();
    var tmp;
    if (token === 1) {
      tmp = readValue(this, true);
    } else if (token === 0) {
      tmp = readValue(this, false);
    } else if (token === 6) {
      var tmp_0;
      this.e3z_1 = this.e3z_1 + 1 | 0;
      if (this.e3z_1 === 200) {
        tmp_0 = readDeepRecursive(this);
      } else {
        tmp_0 = readObject(this);
      }
      var result = tmp_0;
      this.e3z_1 = this.e3z_1 - 1 | 0;
      tmp = result;
    } else if (token === 8) {
      tmp = readArray(this);
    } else {
      this.b3z_1.e3y('Cannot read Json element because of unexpected ' + tokenDescription(token));
    }
    return tmp;
  };
  function classDiscriminator(_this__u8e3s4, json) {
    var _iterator__ex2g4s = _this__u8e3s4.b1m().g();
    while (_iterator__ex2g4s.h()) {
      var annotation = _iterator__ex2g4s.i();
      if (annotation instanceof JsonClassDiscriminator)
        return annotation.q40_1;
    }
    return json.d3t_1.c3v_1;
  }
  function validateIfSealed(serializer, actualSerializer, classDiscriminator) {
    if (!(serializer instanceof SealedClassSerializer))
      return Unit_instance;
    if (jsonCachedSerialNames(actualSerializer.t1k()).r(classDiscriminator)) {
      var baseName = serializer.t1k().x1l();
      var actualName = actualSerializer.t1k().x1l();
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
    var kind = descriptor.y1l();
    var tmp;
    if (kind instanceof PolymorphicKind) {
      tmp = true;
    } else {
      tmp = equals(kind, CONTEXTUAL_getInstance());
    }
    if (tmp) {
      throw IllegalArgumentException_init_$Create$('Serializer for ' + actualClass.ya() + " can't be registered as a subclass for polymorphic serialization " + ('because its kind ' + kind.toString() + ' is not concrete. To work with multiple hierarchies, register it as a base class.'));
    }
    if ($this.r40_1)
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
      throw IllegalArgumentException_init_$Create$('Serializer for ' + actualClass.ya() + ' of kind ' + kind.toString() + ' cannot be serialized polymorphically with class discriminator.');
    }
  }
  function checkDiscriminatorCollisions($this, descriptor, actualClass) {
    var inductionVariable = 0;
    var last = descriptor.a1m();
    if (inductionVariable < last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var name = descriptor.c1m(i);
        if (name === $this.s40_1) {
          throw IllegalArgumentException_init_$Create$('Polymorphic serializer for ' + toString(actualClass) + " has property '" + name + "' that conflicts " + 'with JSON class discriminator. You can either change class discriminator in JsonConfiguration, ' + 'rename property with @SerialName annotation ' + 'or fall back to array polymorphism');
        }
      }
       while (inductionVariable < last);
  }
  function PolymorphismValidator(useArrayPolymorphism, discriminator) {
    this.r40_1 = useArrayPolymorphism;
    this.s40_1 = discriminator;
  }
  protoOf(PolymorphismValidator).e25 = function (kClass, provider) {
  };
  protoOf(PolymorphismValidator).h25 = function (baseClass, actualClass, actualSerializer) {
    var descriptor = actualSerializer.t1k();
    checkKind_0(this, descriptor, actualClass);
    if (!this.r40_1) {
      checkDiscriminatorCollisions(this, descriptor, actualClass);
    }
  };
  protoOf(PolymorphismValidator).i25 = function (baseClass, defaultSerializerProvider) {
  };
  protoOf(PolymorphismValidator).j25 = function (baseClass, defaultDeserializerProvider) {
  };
  function Key() {
  }
  function DescriptorSchemaCache() {
    this.f3y_1 = createMapForCache(16);
  }
  protoOf(DescriptorSchemaCache).t40 = function (descriptor, key, value) {
    // Inline function 'kotlin.collections.getOrPut' call
    var this_0 = this.f3y_1;
    var value_0 = this_0.f2(descriptor);
    var tmp;
    if (value_0 == null) {
      var answer = createMapForCache(2);
      this_0.i2(descriptor, answer);
      tmp = answer;
    } else {
      tmp = value_0;
    }
    var tmp2 = tmp;
    var tmp3 = key instanceof Key ? key : THROW_CCE();
    // Inline function 'kotlin.collections.set' call
    var value_1 = !(value == null) ? value : THROW_CCE();
    tmp2.i2(tmp3, value_1);
  };
  protoOf(DescriptorSchemaCache).g3y = function (descriptor, key, defaultValue) {
    var tmp0_safe_receiver = this.u40(descriptor, key);
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      return tmp0_safe_receiver;
    }
    var value = defaultValue();
    this.t40(descriptor, key, value);
    return value;
  };
  protoOf(DescriptorSchemaCache).u40 = function (descriptor, key) {
    var tmp0_safe_receiver = this.f3y_1.f2(descriptor);
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      tmp = tmp0_safe_receiver.f2(key instanceof Key ? key : THROW_CCE());
    }
    var tmp_0 = tmp;
    return !(tmp_0 == null) ? tmp_0 : null;
  };
  function DiscriminatorHolder(discriminatorToSkip) {
    this.v40_1 = discriminatorToSkip;
  }
  function trySkip($this, _this__u8e3s4, unknownKey) {
    if (_this__u8e3s4 == null)
      return false;
    if (_this__u8e3s4.v40_1 === unknownKey) {
      _this__u8e3s4.v40_1 = null;
      return true;
    }
    return false;
  }
  function skipLeftoverElements($this, descriptor) {
    while (!($this.l1o(descriptor) === -1)) {
    }
  }
  function checkLeadingComma($this) {
    if ($this.p3t_1.g3z() === 4) {
      $this.p3t_1.e3y('Unexpected leading comma');
    }
  }
  function decodeMapIndex($this) {
    var hasComma = false;
    var decodingKey = !(($this.r3t_1 % 2 | 0) === 0);
    if (decodingKey) {
      if (!($this.r3t_1 === -1)) {
        hasComma = $this.p3t_1.x40();
      }
    } else {
      $this.p3t_1.w40(_Char___init__impl__6a9atx(58));
    }
    var tmp;
    if ($this.p3t_1.h3z()) {
      if (decodingKey) {
        if ($this.r3t_1 === -1) {
          var tmp0 = $this.p3t_1;
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.require' call
          var condition = !hasComma;
          var position = tmp0.v3t_1;
          if (!condition) {
            var tmp$ret$0 = 'Unexpected leading comma';
            tmp0.e3y(tmp$ret$0, position);
          }
        } else {
          var tmp3 = $this.p3t_1;
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.require' call
          var condition_0 = hasComma;
          var position_0 = tmp3.v3t_1;
          if (!condition_0) {
            var tmp$ret$2 = 'Expected comma after the key-value pair';
            tmp3.e3y(tmp$ret$2, position_0);
          }
        }
      }
      $this.r3t_1 = $this.r3t_1 + 1 | 0;
      tmp = $this.r3t_1;
    } else {
      if (hasComma && !$this.n3t_1.d3t_1.h3v_1) {
        invalidTrailingComma($this.p3t_1);
      }
      tmp = -1;
    }
    return tmp;
  }
  function coerceInputValue($this, descriptor, index) {
    var tmp0 = $this.n3t_1;
    var tmp$ret$1;
    $l$block_2: {
      // Inline function 'kotlinx.serialization.json.internal.tryCoerceValue' call
      var isOptional = descriptor.g1m(index);
      var elementDescriptor = descriptor.f1m(index);
      var tmp;
      if (isOptional && !elementDescriptor.t1l()) {
        tmp = $this.p3t_1.y40(true);
      } else {
        tmp = false;
      }
      if (tmp) {
        tmp$ret$1 = true;
        break $l$block_2;
      }
      if (equals(elementDescriptor.y1l(), ENUM_getInstance())) {
        var tmp_0;
        if (elementDescriptor.t1l()) {
          tmp_0 = $this.p3t_1.y40(false);
        } else {
          tmp_0 = false;
        }
        if (tmp_0) {
          tmp$ret$1 = false;
          break $l$block_2;
        }
        var tmp0_elvis_lhs = $this.p3t_1.z40($this.t3t_1.v3u_1);
        var tmp_1;
        if (tmp0_elvis_lhs == null) {
          tmp$ret$1 = false;
          break $l$block_2;
        } else {
          tmp_1 = tmp0_elvis_lhs;
        }
        var enumValue = tmp_1;
        var enumIndex = getJsonNameIndex(elementDescriptor, tmp0, enumValue);
        var coerceToNull = !tmp0.d3t_1.y3u_1 && elementDescriptor.t1l();
        if (enumIndex === -3 && (isOptional || coerceToNull)) {
          $this.p3t_1.i3z();
          tmp$ret$1 = true;
          break $l$block_2;
        }
      }
      tmp$ret$1 = false;
    }
    return tmp$ret$1;
  }
  function decodeObjectIndex($this, descriptor) {
    var hasComma = $this.p3t_1.x40();
    while ($this.p3t_1.h3z()) {
      hasComma = false;
      var key = decodeStringKey($this);
      $this.p3t_1.w40(_Char___init__impl__6a9atx(58));
      var index = getJsonNameIndex(descriptor, $this.n3t_1, key);
      var tmp;
      if (!(index === -3)) {
        var tmp_0;
        if ($this.t3t_1.a3v_1 && coerceInputValue($this, descriptor, index)) {
          hasComma = $this.p3t_1.x40();
          tmp_0 = false;
        } else {
          var tmp0_safe_receiver = $this.u3t_1;
          if (tmp0_safe_receiver == null)
            null;
          else {
            tmp0_safe_receiver.b3y(index);
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
    if (hasComma && !$this.n3t_1.d3t_1.h3v_1) {
      invalidTrailingComma($this.p3t_1);
    }
    var tmp1_safe_receiver = $this.u3t_1;
    var tmp2_elvis_lhs = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.c3y();
    return tmp2_elvis_lhs == null ? -1 : tmp2_elvis_lhs;
  }
  function handleUnknown($this, key) {
    if ($this.t3t_1.u3u_1 || trySkip($this, $this.s3t_1, key)) {
      $this.p3t_1.b41($this.t3t_1.v3u_1);
    } else {
      $this.p3t_1.a41(key);
    }
    return $this.p3t_1.x40();
  }
  function decodeListIndex($this) {
    var hasComma = $this.p3t_1.x40();
    var tmp;
    if ($this.p3t_1.h3z()) {
      if (!($this.r3t_1 === -1) && !hasComma) {
        $this.p3t_1.e3y('Expected end of the array or comma');
      }
      $this.r3t_1 = $this.r3t_1 + 1 | 0;
      tmp = $this.r3t_1;
    } else {
      if (hasComma && !$this.n3t_1.d3t_1.h3v_1) {
        invalidTrailingComma($this.p3t_1, 'array');
      }
      tmp = -1;
    }
    return tmp;
  }
  function decodeStringKey($this) {
    var tmp;
    if ($this.t3t_1.v3u_1) {
      tmp = $this.p3t_1.d41();
    } else {
      tmp = $this.p3t_1.c41();
    }
    return tmp;
  }
  function StreamingJsonDecoder(json, mode, lexer, descriptor, discriminatorHolder) {
    AbstractDecoder.call(this);
    this.n3t_1 = json;
    this.o3t_1 = mode;
    this.p3t_1 = lexer;
    this.q3t_1 = this.n3t_1.j1o();
    this.r3t_1 = -1;
    this.s3t_1 = discriminatorHolder;
    this.t3t_1 = this.n3t_1.d3t_1;
    this.u3t_1 = this.t3t_1.y3u_1 ? null : new JsonElementMarker(descriptor);
  }
  protoOf(StreamingJsonDecoder).k3v = function () {
    return this.n3t_1;
  };
  protoOf(StreamingJsonDecoder).j1o = function () {
    return this.q3t_1;
  };
  protoOf(StreamingJsonDecoder).l3v = function () {
    return (new JsonTreeReader(this.n3t_1.d3t_1, this.p3t_1)).k3z();
  };
  protoOf(StreamingJsonDecoder).t1n = function (deserializer) {
    try {
      var tmp;
      if (!(deserializer instanceof AbstractPolymorphicSerializer)) {
        tmp = true;
      } else {
        tmp = this.n3t_1.d3t_1.b3v_1;
      }
      if (tmp) {
        return deserializer.v1k(this);
      }
      var discriminator = classDiscriminator(deserializer.t1k(), this.n3t_1);
      var tmp0_elvis_lhs = this.p3t_1.e41(discriminator, this.t3t_1.v3u_1);
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
            tmp_1 = this.k3v().d3t_1.b3v_1;
          }
          if (tmp_1) {
            tmp$ret$0 = tmp1.v1k(this);
            break $l$block;
          }
          var discriminator_0 = classDiscriminator(tmp1.t1k(), this.k3v());
          var tmp0 = this.l3v();
          // Inline function 'kotlinx.serialization.json.internal.cast' call
          var serialName = tmp1.t1k().x1l();
          if (!(tmp0 instanceof JsonObject)) {
            var tmp_2 = getKClass(JsonObject).ya();
            var tmp_3 = getKClassFromExpression(tmp0).ya();
            var tmp$ret$1 = this.p3t_1.w3t_1.r3y();
            throw JsonDecodingException_0(-1, 'Expected ' + tmp_2 + ', but had ' + tmp_3 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$1, toString(tmp0));
          }
          var jsonTree = tmp0;
          var tmp0_safe_receiver = jsonTree.ce(discriminator_0);
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
          tmp$ret$0 = readPolymorphicJson(this.k3v(), discriminator_0, jsonTree, actualSerializer);
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
          this.p3t_1.e3y(message, VOID, hint);
        } else {
          throw $p;
        }
        tmp_7 = tmp_8;
      }
      var tmp_9 = tmp_7;
      var actualSerializer_0 = isInterface(tmp_9, DeserializationStrategy) ? tmp_9 : THROW_CCE();
      this.s3t_1 = new DiscriminatorHolder(discriminator);
      return actualSerializer_0.v1k(this);
    } catch ($p) {
      if ($p instanceof MissingFieldException) {
        var e = $p;
        if (contains_0(ensureNotNull(e.message), 'at path'))
          throw e;
        throw new MissingFieldException(e.n1l_1, plus(e.message, ' at path: ') + this.p3t_1.w3t_1.r3y(), e);
      } else {
        throw $p;
      }
    }
  };
  protoOf(StreamingJsonDecoder).u1n = function (descriptor) {
    var newMode = switchMode(this.n3t_1, descriptor);
    this.p3t_1.w3t_1.m3y(descriptor);
    this.p3t_1.w40(newMode.h41_1);
    checkLeadingComma(this);
    var tmp;
    switch (newMode.m2_1) {
      case 1:
      case 2:
      case 3:
        tmp = new StreamingJsonDecoder(this.n3t_1, newMode, this.p3t_1, descriptor, this.s3t_1);
        break;
      default:
        var tmp_0;
        if (this.o3t_1.equals(newMode) && this.n3t_1.d3t_1.y3u_1) {
          tmp_0 = this;
        } else {
          tmp_0 = new StreamingJsonDecoder(this.n3t_1, newMode, this.p3t_1, descriptor, this.s3t_1);
        }

        tmp = tmp_0;
        break;
    }
    return tmp;
  };
  protoOf(StreamingJsonDecoder).v1n = function (descriptor) {
    if (this.n3t_1.d3t_1.u3u_1 && descriptor.a1m() === 0) {
      skipLeftoverElements(this, descriptor);
    }
    if (this.p3t_1.x40() && !this.n3t_1.d3t_1.h3v_1) {
      invalidTrailingComma(this.p3t_1, '');
    }
    this.p3t_1.w40(this.o3t_1.i41_1);
    this.p3t_1.w3t_1.q3y();
  };
  protoOf(StreamingJsonDecoder).f1n = function () {
    var tmp;
    var tmp0_safe_receiver = this.u3t_1;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.a3y_1;
    if (!(tmp1_elvis_lhs == null ? false : tmp1_elvis_lhs)) {
      tmp = !this.p3t_1.j41();
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(StreamingJsonDecoder).g1n = function () {
    return null;
  };
  protoOf(StreamingJsonDecoder).g1o = function (descriptor, index, deserializer, previousValue) {
    var isMapKey = this.o3t_1.equals(WriteMode_MAP_getInstance()) && (index & 1) === 0;
    if (isMapKey) {
      this.p3t_1.w3t_1.p3y();
    }
    var value = protoOf(AbstractDecoder).g1o.call(this, descriptor, index, deserializer, previousValue);
    if (isMapKey) {
      this.p3t_1.w3t_1.o3y(value);
    }
    return value;
  };
  protoOf(StreamingJsonDecoder).l1o = function (descriptor) {
    var index;
    switch (this.o3t_1.m2_1) {
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
    if (!this.o3t_1.equals(WriteMode_MAP_getInstance())) {
      this.p3t_1.w3t_1.n3y(index);
    }
    return index;
  };
  protoOf(StreamingJsonDecoder).h1n = function () {
    return this.p3t_1.k41();
  };
  protoOf(StreamingJsonDecoder).i1n = function () {
    var value = this.p3t_1.u3v();
    if (!value.equals(toLong(value.h3()))) {
      this.p3t_1.e3y("Failed to parse byte for input '" + value.toString() + "'");
    }
    return value.h3();
  };
  protoOf(StreamingJsonDecoder).j1n = function () {
    var value = this.p3t_1.u3v();
    if (!value.equals(toLong(value.i3()))) {
      this.p3t_1.e3y("Failed to parse short for input '" + value.toString() + "'");
    }
    return value.i3();
  };
  protoOf(StreamingJsonDecoder).k1n = function () {
    var value = this.p3t_1.u3v();
    if (!value.equals(toLong(value.g1()))) {
      this.p3t_1.e3y("Failed to parse int for input '" + value.toString() + "'");
    }
    return value.g1();
  };
  protoOf(StreamingJsonDecoder).l1n = function () {
    return this.p3t_1.u3v();
  };
  protoOf(StreamingJsonDecoder).m1n = function () {
    var tmp0 = this.p3t_1;
    var tmp$ret$4;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.parseString' call
      var input = tmp0.j3z();
      try {
        // Inline function 'kotlin.text.toFloat' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        tmp$ret$4 = toDouble(input);
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          tmp0.e3y("Failed to parse type '" + 'float' + "' for input '" + input + "'");
        } else {
          throw $p;
        }
      }
    }
    var result = tmp$ret$4;
    var specialFp = this.n3t_1.d3t_1.d3v_1;
    if (specialFp || isFinite(result))
      return result;
    throwInvalidFloatingPointDecoded(this.p3t_1, result);
  };
  protoOf(StreamingJsonDecoder).n1n = function () {
    var tmp0 = this.p3t_1;
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.parseString' call
      var input = tmp0.j3z();
      try {
        tmp$ret$1 = toDouble(input);
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          tmp0.e3y("Failed to parse type '" + 'double' + "' for input '" + input + "'");
        } else {
          throw $p;
        }
      }
    }
    var result = tmp$ret$1;
    var specialFp = this.n3t_1.d3t_1.d3v_1;
    if (specialFp || isFinite_0(result))
      return result;
    throwInvalidFloatingPointDecoded(this.p3t_1, result);
  };
  protoOf(StreamingJsonDecoder).o1n = function () {
    var string = this.p3t_1.j3z();
    if (!(string.length === 1)) {
      this.p3t_1.e3y("Expected single char, but got '" + string + "'");
    }
    return charSequenceGet(string, 0);
  };
  protoOf(StreamingJsonDecoder).p1n = function () {
    var tmp;
    if (this.t3t_1.v3u_1) {
      tmp = this.p3t_1.d41();
    } else {
      tmp = this.p3t_1.i3z();
    }
    return tmp;
  };
  protoOf(StreamingJsonDecoder).r1n = function (descriptor) {
    return get_isUnsignedNumber(descriptor) ? new JsonDecoderForUnsignedTypes(this.p3t_1, this.n3t_1) : protoOf(AbstractDecoder).r1n.call(this, descriptor);
  };
  protoOf(StreamingJsonDecoder).q1n = function (enumDescriptor) {
    return getJsonNameIndexOrThrow(enumDescriptor, this.n3t_1, this.p1n(), ' at path ' + this.p3t_1.w3t_1.r3y());
  };
  function JsonDecoderForUnsignedTypes(lexer, json) {
    AbstractDecoder.call(this);
    this.l41_1 = lexer;
    this.m41_1 = json.j1o();
  }
  protoOf(JsonDecoderForUnsignedTypes).j1o = function () {
    return this.m41_1;
  };
  protoOf(JsonDecoderForUnsignedTypes).l1o = function (descriptor) {
    var message = 'unsupported';
    throw IllegalStateException_init_$Create$(toString(message));
  };
  protoOf(JsonDecoderForUnsignedTypes).k1n = function () {
    var tmp0 = this.l41_1;
    var tmp$ret$2;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.parseString' call
      var input = tmp0.j3z();
      try {
        // Inline function 'kotlin.UInt.toInt' call
        var this_0 = toUInt(input);
        tmp$ret$2 = _UInt___get_data__impl__f0vqqw(this_0);
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          tmp0.e3y("Failed to parse type '" + 'UInt' + "' for input '" + input + "'");
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$2;
  };
  protoOf(JsonDecoderForUnsignedTypes).l1n = function () {
    var tmp0 = this.l41_1;
    var tmp$ret$2;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.parseString' call
      var input = tmp0.j3z();
      try {
        // Inline function 'kotlin.ULong.toLong' call
        var this_0 = toULong(input);
        tmp$ret$2 = _ULong___get_data__impl__fggpzb(this_0);
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          tmp0.e3y("Failed to parse type '" + 'ULong' + "' for input '" + input + "'");
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$2;
  };
  protoOf(JsonDecoderForUnsignedTypes).i1n = function () {
    var tmp0 = this.l41_1;
    var tmp$ret$2;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.parseString' call
      var input = tmp0.j3z();
      try {
        // Inline function 'kotlin.UByte.toByte' call
        var this_0 = toUByte(input);
        tmp$ret$2 = _UByte___get_data__impl__jof9qr(this_0);
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          tmp0.e3y("Failed to parse type '" + 'UByte' + "' for input '" + input + "'");
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$2;
  };
  protoOf(JsonDecoderForUnsignedTypes).j1n = function () {
    var tmp0 = this.l41_1;
    var tmp$ret$2;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.parseString' call
      var input = tmp0.j3z();
      try {
        // Inline function 'kotlin.UShort.toShort' call
        var this_0 = toUShort(input);
        tmp$ret$2 = _UShort___get_data__impl__g0245(this_0);
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          tmp0.e3y("Failed to parse type '" + 'UShort' + "' for input '" + input + "'");
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
    $this.s3y_1.y3w();
    $this.y1o(discriminator);
    $this.s3y_1.b3x(_Char___init__impl__6a9atx(58));
    $this.s3y_1.a3x();
    $this.y1o(serialName);
  }
  function StreamingJsonEncoder(composer, json, mode, modeReuseCache) {
    AbstractEncoder.call(this);
    this.s3y_1 = composer;
    this.t3y_1 = json;
    this.u3y_1 = mode;
    this.v3y_1 = modeReuseCache;
    this.w3y_1 = this.t3y_1.j1o();
    this.x3y_1 = this.t3y_1.d3t_1;
    this.y3y_1 = false;
    this.z3y_1 = null;
    this.a3z_1 = null;
    var i = this.u3y_1.m2_1;
    if (!(this.v3y_1 == null)) {
      if (!(this.v3y_1[i] === null) || !(this.v3y_1[i] === this)) {
        this.v3y_1[i] = this;
      }
    }
  }
  protoOf(StreamingJsonEncoder).k3v = function () {
    return this.t3y_1;
  };
  protoOf(StreamingJsonEncoder).j1o = function () {
    return this.w3y_1;
  };
  protoOf(StreamingJsonEncoder).r1p = function (descriptor, index) {
    return this.x3y_1.t3u_1;
  };
  protoOf(StreamingJsonEncoder).m1p = function (serializer, value) {
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.encodePolymorphically' call
      if (this.k3v().d3t_1.b3v_1) {
        serializer.u1k(this, value);
        break $l$block;
      }
      var isPolymorphicSerializer = serializer instanceof AbstractPolymorphicSerializer;
      var tmp;
      if (isPolymorphicSerializer) {
        tmp = !this.k3v().d3t_1.j3v_1.equals(ClassDiscriminatorMode_NONE_getInstance());
      } else {
        var tmp_0;
        switch (this.k3v().d3t_1.j3v_1.m2_1) {
          case 0:
          case 2:
            tmp_0 = false;
            break;
          case 1:
            // Inline function 'kotlin.let' call

            var it = serializer.t1k().y1l();
            tmp_0 = equals(it, CLASS_getInstance()) || equals(it, OBJECT_getInstance());
            break;
          default:
            noWhenBranchMatchedException();
            break;
        }
        tmp = tmp_0;
      }
      var needDiscriminator = tmp;
      var baseClassDiscriminator = needDiscriminator ? classDiscriminator(serializer.t1k(), this.k3v()) : null;
      var tmp_1;
      if (isPolymorphicSerializer) {
        var casted = serializer instanceof AbstractPolymorphicSerializer ? serializer : THROW_CCE();
        $l$block_0: {
          // Inline function 'kotlin.requireNotNull' call
          if (value == null) {
            var message = 'Value for serializer ' + toString(serializer.t1k()) + ' should always be non-null. Please report issue to the kotlinx.serialization tracker.';
            throw IllegalArgumentException_init_$Create$(toString(message));
          } else {
            break $l$block_0;
          }
        }
        var actual = findPolymorphicSerializer_0(casted, this, value);
        if (!(baseClassDiscriminator == null)) {
          access$validateIfSealed$tPolymorphicKt(serializer, actual, baseClassDiscriminator);
        }
        checkKind(actual.t1k().y1l());
        tmp_1 = isInterface(actual, SerializationStrategy) ? actual : THROW_CCE();
      } else {
        tmp_1 = serializer;
      }
      var actualSerializer = tmp_1;
      if (!(baseClassDiscriminator == null)) {
        var serialName = actualSerializer.t1k().x1l();
        this.z3y_1 = baseClassDiscriminator;
        this.a3z_1 = serialName;
      }
      actualSerializer.u1k(this, value);
    }
  };
  protoOf(StreamingJsonEncoder).u1n = function (descriptor) {
    var newMode = switchMode(this.t3y_1, descriptor);
    if (!(newMode.h41_1 === _Char___init__impl__6a9atx(0))) {
      this.s3y_1.b3x(newMode.h41_1);
      this.s3y_1.w3w();
    }
    var discriminator = this.z3y_1;
    if (!(discriminator == null)) {
      var tmp0_elvis_lhs = this.a3z_1;
      encodeTypeInfo(this, discriminator, tmp0_elvis_lhs == null ? descriptor.x1l() : tmp0_elvis_lhs);
      this.z3y_1 = null;
      this.a3z_1 = null;
    }
    if (this.u3y_1.equals(newMode)) {
      return this;
    }
    var tmp1_safe_receiver = this.v3y_1;
    var tmp2_elvis_lhs = tmp1_safe_receiver == null ? null : tmp1_safe_receiver[newMode.m2_1];
    return tmp2_elvis_lhs == null ? new StreamingJsonEncoder(this.s3y_1, this.t3y_1, newMode, this.v3y_1) : tmp2_elvis_lhs;
  };
  protoOf(StreamingJsonEncoder).v1n = function (descriptor) {
    if (!(this.u3y_1.i41_1 === _Char___init__impl__6a9atx(0))) {
      this.s3y_1.x3w();
      this.s3y_1.z3w();
      this.s3y_1.b3x(this.u3y_1.i41_1);
    }
  };
  protoOf(StreamingJsonEncoder).n1o = function (descriptor, index) {
    switch (this.u3y_1.m2_1) {
      case 1:
        if (!this.s3y_1.v3w_1) {
          this.s3y_1.b3x(_Char___init__impl__6a9atx(44));
        }

        this.s3y_1.y3w();
        break;
      case 2:
        if (!this.s3y_1.v3w_1) {
          var tmp = this;
          var tmp_0;
          if ((index % 2 | 0) === 0) {
            this.s3y_1.b3x(_Char___init__impl__6a9atx(44));
            this.s3y_1.y3w();
            tmp_0 = true;
          } else {
            this.s3y_1.b3x(_Char___init__impl__6a9atx(58));
            this.s3y_1.a3x();
            tmp_0 = false;
          }
          tmp.y3y_1 = tmp_0;
        } else {
          this.y3y_1 = true;
          this.s3y_1.y3w();
        }

        break;
      case 3:
        if (index === 0)
          this.y3y_1 = true;
        if (index === 1) {
          this.s3y_1.b3x(_Char___init__impl__6a9atx(44));
          this.s3y_1.a3x();
          this.y3y_1 = false;
        }

        break;
      default:
        if (!this.s3y_1.v3w_1) {
          this.s3y_1.b3x(_Char___init__impl__6a9atx(44));
        }

        this.s3y_1.y3w();
        this.y1o(getJsonElementName(descriptor, this.t3y_1, index));
        this.s3y_1.b3x(_Char___init__impl__6a9atx(58));
        this.s3y_1.a3x();
        break;
    }
    return true;
  };
  protoOf(StreamingJsonEncoder).n1p = function (descriptor, index, serializer, value) {
    if (!(value == null) || this.x3y_1.y3u_1) {
      protoOf(AbstractEncoder).n1p.call(this, descriptor, index, serializer, value);
    }
  };
  protoOf(StreamingJsonEncoder).a1p = function (descriptor) {
    var tmp;
    if (get_isUnsignedNumber(descriptor)) {
      // Inline function 'kotlinx.serialization.json.internal.StreamingJsonEncoder.composerAs' call
      var tmp_0;
      var tmp_1 = this.s3y_1;
      if (tmp_1 instanceof ComposerForUnsignedNumbers) {
        tmp_0 = this.s3y_1;
      } else {
        var tmp1 = this.s3y_1.u3w_1;
        var p1 = this.y3y_1;
        tmp_0 = new ComposerForUnsignedNumbers(tmp1, p1);
      }
      var tmp$ret$1 = tmp_0;
      tmp = new StreamingJsonEncoder(tmp$ret$1, this.t3y_1, this.u3y_1, null);
    } else if (get_isUnquotedLiteral(descriptor)) {
      // Inline function 'kotlinx.serialization.json.internal.StreamingJsonEncoder.composerAs' call
      var tmp_2;
      var tmp_3 = this.s3y_1;
      if (tmp_3 instanceof ComposerForUnquotedLiterals) {
        tmp_2 = this.s3y_1;
      } else {
        var tmp4 = this.s3y_1.u3w_1;
        var p1_0 = this.y3y_1;
        tmp_2 = new ComposerForUnquotedLiterals(tmp4, p1_0);
      }
      var tmp$ret$3 = tmp_2;
      tmp = new StreamingJsonEncoder(tmp$ret$3, this.t3y_1, this.u3y_1, null);
    } else if (!(this.z3y_1 == null)) {
      // Inline function 'kotlin.apply' call
      this.a3z_1 = descriptor.x1l();
      tmp = this;
    } else {
      tmp = protoOf(AbstractEncoder).a1p.call(this, descriptor);
    }
    return tmp;
  };
  protoOf(StreamingJsonEncoder).p1o = function () {
    this.s3y_1.d3x('null');
  };
  protoOf(StreamingJsonEncoder).q1o = function (value) {
    if (this.y3y_1) {
      this.y1o(value.toString());
    } else {
      this.s3y_1.m3x(value);
    }
  };
  protoOf(StreamingJsonEncoder).r1o = function (value) {
    if (this.y3y_1) {
      this.y1o(value.toString());
    } else {
      this.s3y_1.h3x(value);
    }
  };
  protoOf(StreamingJsonEncoder).s1o = function (value) {
    if (this.y3y_1) {
      this.y1o(value.toString());
    } else {
      this.s3y_1.j3x(value);
    }
  };
  protoOf(StreamingJsonEncoder).t1o = function (value) {
    if (this.y3y_1) {
      this.y1o(value.toString());
    } else {
      this.s3y_1.k3x(value);
    }
  };
  protoOf(StreamingJsonEncoder).u1o = function (value) {
    if (this.y3y_1) {
      this.y1o(value.toString());
    } else {
      this.s3y_1.l3x(value);
    }
  };
  protoOf(StreamingJsonEncoder).v1o = function (value) {
    if (this.y3y_1) {
      this.y1o(value.toString());
    } else {
      this.s3y_1.f3x(value);
    }
    if (!this.x3y_1.d3v_1 && !isFinite(value)) {
      throw InvalidFloatingPointEncoded_0(value, toString(this.s3y_1.u3w_1));
    }
  };
  protoOf(StreamingJsonEncoder).w1o = function (value) {
    if (this.y3y_1) {
      this.y1o(value.toString());
    } else {
      this.s3y_1.g3x(value);
    }
    if (!this.x3y_1.d3v_1 && !isFinite_0(value)) {
      throw InvalidFloatingPointEncoded_0(value, toString(this.s3y_1.u3w_1));
    }
  };
  protoOf(StreamingJsonEncoder).x1o = function (value) {
    this.y1o(toString_1(value));
  };
  protoOf(StreamingJsonEncoder).y1o = function (value) {
    return this.s3y_1.n3x(value);
  };
  protoOf(StreamingJsonEncoder).z1o = function (enumDescriptor, index) {
    this.y1o(enumDescriptor.c1m(index));
  };
  function get_isUnsignedNumber(_this__u8e3s4) {
    _init_properties_StreamingJsonEncoder_kt__pn1bsi();
    return _this__u8e3s4.z1l() && get_unsignedNumberDescriptors().r(_this__u8e3s4);
  }
  function get_isUnquotedLiteral(_this__u8e3s4) {
    _init_properties_StreamingJsonEncoder_kt__pn1bsi();
    return _this__u8e3s4.z1l() && equals(_this__u8e3s4, get_jsonUnquotedLiteralDescriptor());
  }
  var properties_initialized_StreamingJsonEncoder_kt_6ifwwk;
  function _init_properties_StreamingJsonEncoder_kt__pn1bsi() {
    if (!properties_initialized_StreamingJsonEncoder_kt_6ifwwk) {
      properties_initialized_StreamingJsonEncoder_kt_6ifwwk = true;
      unsignedNumberDescriptors = setOf([serializer_1(Companion_getInstance_0()).t1k(), serializer_0(Companion_getInstance()).t1k(), serializer_2(Companion_getInstance_1()).t1k(), serializer_3(Companion_getInstance_2()).t1k()]);
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
    _this__u8e3s4.e8(_Char___init__impl__6a9atx(34));
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
          _this__u8e3s4.oc(value, lastPos, i);
          _this__u8e3s4.d8(get_ESCAPE_STRINGS()[c]);
          lastPos = i + 1 | 0;
        }
      }
       while (inductionVariable <= last);
    if (!(lastPos === 0))
      _this__u8e3s4.oc(value, lastPos, value.length);
    else
      _this__u8e3s4.d8(value);
    _this__u8e3s4.e8(_Char___init__impl__6a9atx(34));
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
    return input.t1n(deserializer);
  }
  function unparsedPrimitive($this, literal, primitive, tag) {
    var type = startsWith(primitive, 'i') ? 'an ' + primitive : 'a ' + primitive;
    throw JsonDecodingException_0(-1, "Failed to parse literal '" + literal.toString() + "' as " + type + ' value at element: ' + $this.t41(tag), toString($this.u41()));
  }
  function AbstractJsonTreeDecoder(json, value, polymorphicDiscriminator) {
    polymorphicDiscriminator = polymorphicDiscriminator === VOID ? null : polymorphicDiscriminator;
    NamedValueDecoder.call(this);
    this.p41_1 = json;
    this.q41_1 = value;
    this.r41_1 = polymorphicDiscriminator;
    this.s41_1 = this.k3v().d3t_1;
  }
  protoOf(AbstractJsonTreeDecoder).k3v = function () {
    return this.p41_1;
  };
  protoOf(AbstractJsonTreeDecoder).w = function () {
    return this.q41_1;
  };
  protoOf(AbstractJsonTreeDecoder).j1o = function () {
    return this.k3v().j1o();
  };
  protoOf(AbstractJsonTreeDecoder).u41 = function () {
    var tmp0_safe_receiver = this.a22();
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      tmp = this.v41(tmp0_safe_receiver);
    }
    var tmp1_elvis_lhs = tmp;
    return tmp1_elvis_lhs == null ? this.w() : tmp1_elvis_lhs;
  };
  protoOf(AbstractJsonTreeDecoder).t41 = function (currentTag) {
    return this.y22() + ('.' + currentTag);
  };
  protoOf(AbstractJsonTreeDecoder).l3v = function () {
    return this.u41();
  };
  protoOf(AbstractJsonTreeDecoder).t1n = function (deserializer) {
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.decodeSerializableValuePolymorphic' call
      var tmp;
      if (!(deserializer instanceof AbstractPolymorphicSerializer)) {
        tmp = true;
      } else {
        tmp = this.k3v().d3t_1.b3v_1;
      }
      if (tmp) {
        tmp$ret$0 = deserializer.v1k(this);
        break $l$block;
      }
      var discriminator = classDiscriminator(deserializer.t1k(), this.k3v());
      var tmp0 = this.l3v();
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var serialName = deserializer.t1k().x1l();
      if (!(tmp0 instanceof JsonObject)) {
        var tmp_0 = getKClass(JsonObject).ya();
        var tmp_1 = getKClassFromExpression(tmp0).ya();
        var tmp$ret$1 = this.y22();
        throw JsonDecodingException_0(-1, 'Expected ' + tmp_0 + ', but had ' + tmp_1 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$1, toString(tmp0));
      }
      var jsonTree = tmp0;
      var tmp0_safe_receiver = jsonTree.ce(discriminator);
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
      tmp$ret$0 = readPolymorphicJson(this.k3v(), discriminator, jsonTree, actualSerializer);
    }
    return tmp$ret$0;
  };
  protoOf(AbstractJsonTreeDecoder).b22 = function (parentName, childName) {
    return childName;
  };
  protoOf(AbstractJsonTreeDecoder).u1n = function (descriptor) {
    var currentObject = this.u41();
    var tmp0_subject = descriptor.y1l();
    var tmp;
    var tmp_0;
    if (equals(tmp0_subject, LIST_getInstance())) {
      tmp_0 = true;
    } else {
      tmp_0 = tmp0_subject instanceof PolymorphicKind;
    }
    if (tmp_0) {
      var tmp_1 = this.k3v();
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var serialName = descriptor.x1l();
      if (!(currentObject instanceof JsonArray)) {
        var tmp_2 = getKClass(JsonArray).ya();
        var tmp_3 = getKClassFromExpression(currentObject).ya();
        var tmp$ret$0 = this.y22();
        throw JsonDecodingException_0(-1, 'Expected ' + tmp_2 + ', but had ' + tmp_3 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$0, toString(currentObject));
      }
      tmp = new JsonTreeListDecoder(tmp_1, currentObject);
    } else {
      if (equals(tmp0_subject, MAP_getInstance())) {
        // Inline function 'kotlinx.serialization.json.internal.selectMapMode' call
        var this_0 = this.k3v();
        var keyDescriptor = carrierDescriptor(descriptor.f1m(0), this_0.j1o());
        var keyKind = keyDescriptor.y1l();
        var tmp_4;
        var tmp_5;
        if (keyKind instanceof PrimitiveKind) {
          tmp_5 = true;
        } else {
          tmp_5 = equals(keyKind, ENUM_getInstance());
        }
        if (tmp_5) {
          var tmp_6 = this.k3v();
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
          // Inline function 'kotlinx.serialization.json.internal.cast' call
          var serialName_0 = descriptor.x1l();
          if (!(currentObject instanceof JsonObject)) {
            var tmp_7 = getKClass(JsonObject).ya();
            var tmp_8 = getKClassFromExpression(currentObject).ya();
            var tmp$ret$3 = this.y22();
            throw JsonDecodingException_0(-1, 'Expected ' + tmp_7 + ', but had ' + tmp_8 + ' as the serialized body of ' + serialName_0 + ' at element: ' + tmp$ret$3, toString(currentObject));
          }
          tmp_4 = new JsonTreeMapDecoder(tmp_6, currentObject);
        } else {
          if (this_0.d3t_1.w3u_1) {
            var tmp_9 = this.k3v();
            // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
            // Inline function 'kotlinx.serialization.json.internal.cast' call
            var serialName_1 = descriptor.x1l();
            if (!(currentObject instanceof JsonArray)) {
              var tmp_10 = getKClass(JsonArray).ya();
              var tmp_11 = getKClassFromExpression(currentObject).ya();
              var tmp$ret$7 = this.y22();
              throw JsonDecodingException_0(-1, 'Expected ' + tmp_10 + ', but had ' + tmp_11 + ' as the serialized body of ' + serialName_1 + ' at element: ' + tmp$ret$7, toString(currentObject));
            }
            tmp_4 = new JsonTreeListDecoder(tmp_9, currentObject);
          } else {
            throw InvalidKeyKindException(keyDescriptor);
          }
        }
        tmp = tmp_4;
      } else {
        var tmp_12 = this.k3v();
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
        // Inline function 'kotlinx.serialization.json.internal.cast' call
        var serialName_2 = descriptor.x1l();
        if (!(currentObject instanceof JsonObject)) {
          var tmp_13 = getKClass(JsonObject).ya();
          var tmp_14 = getKClassFromExpression(currentObject).ya();
          var tmp$ret$12 = this.y22();
          throw JsonDecodingException_0(-1, 'Expected ' + tmp_13 + ', but had ' + tmp_14 + ' as the serialized body of ' + serialName_2 + ' at element: ' + tmp$ret$12, toString(currentObject));
        }
        tmp = new JsonTreeDecoder(tmp_12, currentObject, this.r41_1);
      }
    }
    return tmp;
  };
  protoOf(AbstractJsonTreeDecoder).v1n = function (descriptor) {
  };
  protoOf(AbstractJsonTreeDecoder).f1n = function () {
    var tmp = this.u41();
    return !(tmp instanceof JsonNull);
  };
  protoOf(AbstractJsonTreeDecoder).w41 = function (tag, enumDescriptor) {
    var tmp = this.k3v();
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
    var tmp1 = this.v41(tag);
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var serialName = enumDescriptor.x1l();
    if (!(tmp1 instanceof JsonPrimitive)) {
      var tmp_0 = getKClass(JsonPrimitive).ya();
      var tmp_1 = getKClassFromExpression(tmp1).ya();
      var tmp$ret$0 = this.t41(tag);
      throw JsonDecodingException_0(-1, 'Expected ' + tmp_0 + ', but had ' + tmp_1 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$0, toString(tmp1));
    }
    return getJsonNameIndexOrThrow(enumDescriptor, tmp, tmp1.n3v());
  };
  protoOf(AbstractJsonTreeDecoder).k23 = function (tag, enumDescriptor) {
    return this.w41((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), enumDescriptor);
  };
  protoOf(AbstractJsonTreeDecoder).x41 = function (tag) {
    return !(this.v41(tag) === JsonNull_getInstance());
  };
  protoOf(AbstractJsonTreeDecoder).a23 = function (tag) {
    return this.x41((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).y41 = function (tag) {
    var tmp$ret$4;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.v41(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp = getKClass(JsonPrimitive).ya();
        var tmp_0 = getKClassFromExpression(value).ya();
        var tmp$ret$0 = this.t41(tag);
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
  protoOf(AbstractJsonTreeDecoder).b23 = function (tag) {
    return this.y41((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).z41 = function (tag) {
    var tmp$ret$4;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.v41(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp = getKClass(JsonPrimitive).ya();
        var tmp_0 = getKClassFromExpression(value).ya();
        var tmp$ret$0 = this.t41(tag);
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
  protoOf(AbstractJsonTreeDecoder).c23 = function (tag) {
    return this.z41((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).a42 = function (tag) {
    var tmp$ret$4;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.v41(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp = getKClass(JsonPrimitive).ya();
        var tmp_0 = getKClassFromExpression(value).ya();
        var tmp$ret$0 = this.t41(tag);
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
  protoOf(AbstractJsonTreeDecoder).d23 = function (tag) {
    return this.a42((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).b42 = function (tag) {
    var tmp$ret$4;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.v41(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp = getKClass(JsonPrimitive).ya();
        var tmp_0 = getKClassFromExpression(value).ya();
        var tmp$ret$0 = this.t41(tag);
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
  protoOf(AbstractJsonTreeDecoder).e23 = function (tag) {
    return this.b42((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).c42 = function (tag) {
    var tmp$ret$4;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.v41(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp = getKClass(JsonPrimitive).ya();
        var tmp_0 = getKClassFromExpression(value).ya();
        var tmp$ret$0 = this.t41(tag);
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
  protoOf(AbstractJsonTreeDecoder).f23 = function (tag) {
    return this.c42((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).d42 = function (tag) {
    var tmp$ret$4;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.v41(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp = getKClass(JsonPrimitive).ya();
        var tmp_0 = getKClassFromExpression(value).ya();
        var tmp$ret$0 = this.t41(tag);
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
    var specialFp = this.k3v().d3t_1.d3v_1;
    if (specialFp || isFinite(result))
      return result;
    throw InvalidFloatingPointDecoded(result, tag, toString(this.u41()));
  };
  protoOf(AbstractJsonTreeDecoder).g23 = function (tag) {
    return this.d42((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).e42 = function (tag) {
    var tmp$ret$4;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.v41(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp = getKClass(JsonPrimitive).ya();
        var tmp_0 = getKClassFromExpression(value).ya();
        var tmp$ret$0 = this.t41(tag);
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
    var specialFp = this.k3v().d3t_1.d3v_1;
    if (specialFp || isFinite_0(result))
      return result;
    throw InvalidFloatingPointDecoded(result, tag, toString(this.u41()));
  };
  protoOf(AbstractJsonTreeDecoder).h23 = function (tag) {
    return this.e42((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).f42 = function (tag) {
    var tmp$ret$4;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.v41(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp = getKClass(JsonPrimitive).ya();
        var tmp_0 = getKClassFromExpression(value).ya();
        var tmp$ret$0 = this.t41(tag);
        throw JsonDecodingException_0(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'char' + ' at element: ' + tmp$ret$0, toString(value));
      }
      var literal = value;
      try {
        var tmp0_elvis_lhs = new Char(single(literal.n3v()));
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
  protoOf(AbstractJsonTreeDecoder).i23 = function (tag) {
    return this.f42((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).g42 = function (tag) {
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var value = this.v41(tag);
    if (!(value instanceof JsonPrimitive)) {
      var tmp = getKClass(JsonPrimitive).ya();
      var tmp_0 = getKClassFromExpression(value).ya();
      var tmp$ret$0 = this.t41(tag);
      throw JsonDecodingException_0(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'string' + ' at element: ' + tmp$ret$0, toString(value));
    }
    var value_0 = value;
    if (!(value_0 instanceof JsonLiteral))
      throw JsonDecodingException_0(-1, "Expected string value for a non-null key '" + tag + "', got null literal instead at element: " + this.t41(tag), toString(this.u41()));
    if (!value_0.w3v_1 && !this.k3v().d3t_1.v3u_1) {
      throw JsonDecodingException_0(-1, "String literal for key '" + tag + "' should be quoted at element: " + this.t41(tag) + ".\nUse 'isLenient = true' in 'Json {}' builder to accept non-compliant JSON.", toString(this.u41()));
    }
    return value_0.y3v_1;
  };
  protoOf(AbstractJsonTreeDecoder).j23 = function (tag) {
    return this.g42((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).h42 = function (tag, inlineDescriptor) {
    var tmp;
    if (get_isUnsignedNumber(inlineDescriptor)) {
      var tmp_0 = this.k3v();
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      var tmp1 = this.v41(tag);
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var serialName = inlineDescriptor.x1l();
      if (!(tmp1 instanceof JsonPrimitive)) {
        var tmp_1 = getKClass(JsonPrimitive).ya();
        var tmp_2 = getKClassFromExpression(tmp1).ya();
        var tmp$ret$0 = this.t41(tag);
        throw JsonDecodingException_0(-1, 'Expected ' + tmp_1 + ', but had ' + tmp_2 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$0, toString(tmp1));
      }
      var lexer = StringJsonLexer_0(tmp_0, tmp1.n3v());
      tmp = new JsonDecoderForUnsignedTypes(lexer, this.k3v());
    } else {
      tmp = protoOf(NamedValueDecoder).l23.call(this, tag, inlineDescriptor);
    }
    return tmp;
  };
  protoOf(AbstractJsonTreeDecoder).l23 = function (tag, inlineDescriptor) {
    return this.h42((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), inlineDescriptor);
  };
  protoOf(AbstractJsonTreeDecoder).r1n = function (descriptor) {
    return !(this.a22() == null) ? protoOf(NamedValueDecoder).r1n.call(this, descriptor) : (new JsonPrimitiveDecoder(this.k3v(), this.w(), this.r41_1)).r1n(descriptor);
  };
  function coerceInputValue_0($this, descriptor, index, tag) {
    var tmp0 = $this.k3v();
    var tmp$ret$1;
    $l$block_2: {
      // Inline function 'kotlinx.serialization.json.internal.tryCoerceValue' call
      var isOptional = descriptor.g1m(index);
      var elementDescriptor = descriptor.f1m(index);
      var tmp;
      if (isOptional && !elementDescriptor.t1l()) {
        var tmp_0 = $this.v41(tag);
        tmp = tmp_0 instanceof JsonNull;
      } else {
        tmp = false;
      }
      if (tmp) {
        tmp$ret$1 = true;
        break $l$block_2;
      }
      if (equals(elementDescriptor.y1l(), ENUM_getInstance())) {
        var tmp_1;
        if (elementDescriptor.t1l()) {
          var tmp_2 = $this.v41(tag);
          tmp_1 = tmp_2 instanceof JsonNull;
        } else {
          tmp_1 = false;
        }
        if (tmp_1) {
          tmp$ret$1 = false;
          break $l$block_2;
        }
        var tmp_3 = $this.v41(tag);
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
        var coerceToNull = !tmp0.d3t_1.y3u_1 && elementDescriptor.t1l();
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
    $this.r42_1 = (!$this.k3v().d3t_1.y3u_1 && !descriptor.g1m(index) && descriptor.f1m(index).t1l());
    return $this.r42_1;
  }
  function JsonTreeDecoder(json, value, polymorphicDiscriminator, polyDescriptor) {
    polymorphicDiscriminator = polymorphicDiscriminator === VOID ? null : polymorphicDiscriminator;
    polyDescriptor = polyDescriptor === VOID ? null : polyDescriptor;
    AbstractJsonTreeDecoder.call(this, json, value, polymorphicDiscriminator);
    this.o42_1 = value;
    this.p42_1 = polyDescriptor;
    this.q42_1 = 0;
    this.r42_1 = false;
  }
  protoOf(JsonTreeDecoder).w = function () {
    return this.o42_1;
  };
  protoOf(JsonTreeDecoder).l1o = function (descriptor) {
    while (this.q42_1 < descriptor.a1m()) {
      var _unary__edvuaz = this.q42_1;
      this.q42_1 = _unary__edvuaz + 1 | 0;
      var name = this.w21(descriptor, _unary__edvuaz);
      var index = this.q42_1 - 1 | 0;
      this.r42_1 = false;
      var tmp;
      var tmp_0;
      // Inline function 'kotlin.collections.contains' call
      // Inline function 'kotlin.collections.containsKey' call
      var this_0 = this.w();
      if ((isInterface(this_0, KtMap) ? this_0 : THROW_CCE()).d2(name)) {
        tmp_0 = true;
      } else {
        tmp_0 = absenceIsNull(this, descriptor, index);
      }
      if (tmp_0) {
        tmp = !this.s41_1.a3v_1 || !coerceInputValue_0(this, descriptor, index, name);
      } else {
        tmp = false;
      }
      if (tmp) {
        return index;
      }
    }
    return -1;
  };
  protoOf(JsonTreeDecoder).f1n = function () {
    return !this.r42_1 && protoOf(AbstractJsonTreeDecoder).f1n.call(this);
  };
  protoOf(JsonTreeDecoder).x21 = function (descriptor, index) {
    var strategy = namingStrategy(descriptor, this.k3v());
    var baseName = descriptor.c1m(index);
    if (strategy == null) {
      if (!this.s41_1.e3v_1)
        return baseName;
      if (this.w().g2().r(baseName))
        return baseName;
    }
    var deserializationNamesMap_0 = deserializationNamesMap(this.k3v(), descriptor);
    // Inline function 'kotlin.collections.find' call
    var tmp0 = this.w().g2();
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var _iterator__ex2g4s = tmp0.g();
      while (_iterator__ex2g4s.h()) {
        var element = _iterator__ex2g4s.i();
        if (deserializationNamesMap_0.f2(element) === index) {
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
    var fallbackName = strategy == null ? null : strategy.i3y(descriptor, index, baseName);
    return fallbackName == null ? baseName : fallbackName;
  };
  protoOf(JsonTreeDecoder).v41 = function (tag) {
    return getValue(this.w(), tag);
  };
  protoOf(JsonTreeDecoder).u1n = function (descriptor) {
    if (descriptor === this.p42_1) {
      var tmp = this.k3v();
      var tmp1 = this.u41();
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var serialName = this.p42_1.x1l();
      if (!(tmp1 instanceof JsonObject)) {
        var tmp_0 = getKClass(JsonObject).ya();
        var tmp_1 = getKClassFromExpression(tmp1).ya();
        var tmp$ret$0 = this.y22();
        throw JsonDecodingException_0(-1, 'Expected ' + tmp_0 + ', but had ' + tmp_1 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$0, toString(tmp1));
      }
      return new JsonTreeDecoder(tmp, tmp1, this.r41_1, this.p42_1);
    }
    return protoOf(AbstractJsonTreeDecoder).u1n.call(this, descriptor);
  };
  protoOf(JsonTreeDecoder).v1n = function (descriptor) {
    var tmp;
    if (this.s41_1.u3u_1) {
      tmp = true;
    } else {
      var tmp_0 = descriptor.y1l();
      tmp = tmp_0 instanceof PolymorphicKind;
    }
    if (tmp)
      return Unit_instance;
    var strategy = namingStrategy(descriptor, this.k3v());
    var tmp_1;
    if (strategy == null && !this.s41_1.e3v_1) {
      tmp_1 = jsonCachedSerialNames(descriptor);
    } else if (!(strategy == null)) {
      tmp_1 = deserializationNamesMap(this.k3v(), descriptor).g2();
    } else {
      var tmp_2 = jsonCachedSerialNames(descriptor);
      var tmp0_safe_receiver = get_schemaCache(this.k3v()).u40(descriptor, get_JsonDeserializationNamesKey());
      // Inline function 'kotlin.collections.orEmpty' call
      var tmp0_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.g2();
      var tmp$ret$0 = tmp0_elvis_lhs == null ? emptySet() : tmp0_elvis_lhs;
      tmp_1 = plus_0(tmp_2, tmp$ret$0);
    }
    var names = tmp_1;
    var _iterator__ex2g4s = this.w().g2().g();
    while (_iterator__ex2g4s.h()) {
      var key = _iterator__ex2g4s.i();
      if (!names.r(key) && !(key === this.r41_1)) {
        throw UnknownKeyException(key, this.w().toString());
      }
    }
  };
  function JsonTreeListDecoder(json, value) {
    AbstractJsonTreeDecoder.call(this, json, value);
    this.y42_1 = value;
    this.z42_1 = this.y42_1.j();
    this.a43_1 = -1;
  }
  protoOf(JsonTreeListDecoder).w = function () {
    return this.y42_1;
  };
  protoOf(JsonTreeListDecoder).x21 = function (descriptor, index) {
    return index.toString();
  };
  protoOf(JsonTreeListDecoder).v41 = function (tag) {
    return this.y42_1.o(toInt(tag));
  };
  protoOf(JsonTreeListDecoder).l1o = function (descriptor) {
    while (this.a43_1 < (this.z42_1 - 1 | 0)) {
      this.a43_1 = this.a43_1 + 1 | 0;
      return this.a43_1;
    }
    return -1;
  };
  function JsonPrimitiveDecoder(json, value, polymorphicDiscriminator) {
    polymorphicDiscriminator = polymorphicDiscriminator === VOID ? null : polymorphicDiscriminator;
    AbstractJsonTreeDecoder.call(this, json, value, polymorphicDiscriminator);
    this.h43_1 = value;
    this.s22('primitive');
  }
  protoOf(JsonPrimitiveDecoder).w = function () {
    return this.h43_1;
  };
  protoOf(JsonPrimitiveDecoder).l1o = function (descriptor) {
    return 0;
  };
  protoOf(JsonPrimitiveDecoder).v41 = function (tag) {
    // Inline function 'kotlin.require' call
    if (!(tag === 'primitive')) {
      var message = "This input can only handle primitives with 'primitive' tag";
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return this.h43_1;
  };
  function JsonTreeMapDecoder(json, value) {
    JsonTreeDecoder.call(this, json, value);
    this.s43_1 = value;
    this.t43_1 = toList(this.s43_1.g2());
    this.u43_1 = imul(this.t43_1.j(), 2);
    this.v43_1 = -1;
  }
  protoOf(JsonTreeMapDecoder).w = function () {
    return this.s43_1;
  };
  protoOf(JsonTreeMapDecoder).x21 = function (descriptor, index) {
    var i = index / 2 | 0;
    return this.t43_1.o(i);
  };
  protoOf(JsonTreeMapDecoder).l1o = function (descriptor) {
    while (this.v43_1 < (this.u43_1 - 1 | 0)) {
      this.v43_1 = this.v43_1 + 1 | 0;
      return this.v43_1;
    }
    return -1;
  };
  protoOf(JsonTreeMapDecoder).v41 = function (tag) {
    return (this.v43_1 % 2 | 0) === 0 ? JsonPrimitive_2(tag) : getValue(this.s43_1, tag);
  };
  protoOf(JsonTreeMapDecoder).v1n = function (descriptor) {
  };
  function readPolymorphicJson(_this__u8e3s4, discriminator, element, deserializer) {
    return (new JsonTreeDecoder(_this__u8e3s4, element, discriminator, deserializer.t1k())).t1n(deserializer);
  }
  function writeJson(json, value, serializer) {
    var result = {_v: null};
    var encoder = new JsonTreeEncoder(json, writeJson$lambda(result));
    encoder.m1p(serializer, value);
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
    tmp.i44_1 = LinkedHashMap_init_$Create$();
  }
  protoOf(JsonTreeEncoder).j44 = function (key, element) {
    // Inline function 'kotlin.collections.set' call
    this.i44_1.i2(key, element);
  };
  protoOf(JsonTreeEncoder).n1p = function (descriptor, index, serializer, value) {
    if (!(value == null) || this.z43_1.y3u_1) {
      protoOf(AbstractJsonTreeEncoder).n1p.call(this, descriptor, index, serializer, value);
    }
  };
  protoOf(JsonTreeEncoder).k44 = function () {
    return new JsonObject(this.i44_1);
  };
  function inlineUnsignedNumberEncoder($this, tag) {
    return new AbstractJsonTreeEncoder$inlineUnsignedNumberEncoder$1($this, tag);
  }
  function inlineUnquotedLiteralEncoder($this, tag, inlineDescriptor) {
    return new AbstractJsonTreeEncoder$inlineUnquotedLiteralEncoder$1($this, tag, inlineDescriptor);
  }
  function AbstractJsonTreeEncoder$inlineUnsignedNumberEncoder$1(this$0, $tag) {
    this.z44_1 = this$0;
    this.a45_1 = $tag;
    AbstractEncoder.call(this);
    this.y44_1 = this$0.x43_1.j1o();
  }
  protoOf(AbstractJsonTreeEncoder$inlineUnsignedNumberEncoder$1).j1o = function () {
    return this.y44_1;
  };
  protoOf(AbstractJsonTreeEncoder$inlineUnsignedNumberEncoder$1).b45 = function (s) {
    return this.z44_1.j44(this.a45_1, new JsonLiteral(s, false));
  };
  protoOf(AbstractJsonTreeEncoder$inlineUnsignedNumberEncoder$1).t1o = function (value) {
    // Inline function 'kotlin.toUInt' call
    var tmp$ret$0 = _UInt___init__impl__l7qpdl(value);
    return this.b45(UInt__toString_impl_dbgl21(tmp$ret$0));
  };
  protoOf(AbstractJsonTreeEncoder$inlineUnsignedNumberEncoder$1).u1o = function (value) {
    // Inline function 'kotlin.toULong' call
    var tmp$ret$0 = _ULong___init__impl__c78o9k(value);
    return this.b45(ULong__toString_impl_f9au7k(tmp$ret$0));
  };
  protoOf(AbstractJsonTreeEncoder$inlineUnsignedNumberEncoder$1).r1o = function (value) {
    // Inline function 'kotlin.toUByte' call
    var tmp$ret$0 = _UByte___init__impl__g9hnc4(value);
    return this.b45(UByte__toString_impl_v72jg(tmp$ret$0));
  };
  protoOf(AbstractJsonTreeEncoder$inlineUnsignedNumberEncoder$1).s1o = function (value) {
    // Inline function 'kotlin.toUShort' call
    var tmp$ret$0 = _UShort___init__impl__jigrne(value);
    return this.b45(UShort__toString_impl_edaoee(tmp$ret$0));
  };
  function AbstractJsonTreeEncoder$inlineUnquotedLiteralEncoder$1(this$0, $tag, $inlineDescriptor) {
    this.c45_1 = this$0;
    this.d45_1 = $tag;
    this.e45_1 = $inlineDescriptor;
    AbstractEncoder.call(this);
  }
  protoOf(AbstractJsonTreeEncoder$inlineUnquotedLiteralEncoder$1).j1o = function () {
    return this.c45_1.x43_1.j1o();
  };
  protoOf(AbstractJsonTreeEncoder$inlineUnquotedLiteralEncoder$1).y1o = function (value) {
    return this.c45_1.j44(this.d45_1, new JsonLiteral(value, false, this.e45_1));
  };
  function AbstractJsonTreeEncoder$beginStructure$lambda(this$0) {
    return function (node) {
      this$0.j44(this$0.r22(), node);
      return Unit_instance;
    };
  }
  function AbstractJsonTreeEncoder(json, nodeConsumer) {
    NamedValueEncoder.call(this);
    this.x43_1 = json;
    this.y43_1 = nodeConsumer;
    this.z43_1 = this.x43_1.d3t_1;
    this.a44_1 = null;
    this.b44_1 = null;
  }
  protoOf(AbstractJsonTreeEncoder).k3v = function () {
    return this.x43_1;
  };
  protoOf(AbstractJsonTreeEncoder).j1o = function () {
    return this.x43_1.j1o();
  };
  protoOf(AbstractJsonTreeEncoder).x21 = function (descriptor, index) {
    return getJsonElementName(descriptor, this.x43_1, index);
  };
  protoOf(AbstractJsonTreeEncoder).r1p = function (descriptor, index) {
    return this.z43_1.t3u_1;
  };
  protoOf(AbstractJsonTreeEncoder).b22 = function (parentName, childName) {
    return childName;
  };
  protoOf(AbstractJsonTreeEncoder).p1p = function () {
  };
  protoOf(AbstractJsonTreeEncoder).p1o = function () {
    var tmp0_elvis_lhs = this.a22();
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return this.y43_1(JsonNull_getInstance());
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var tag = tmp;
    this.l44(tag);
  };
  protoOf(AbstractJsonTreeEncoder).l44 = function (tag) {
    return this.j44(tag, JsonNull_getInstance());
  };
  protoOf(AbstractJsonTreeEncoder).e22 = function (tag) {
    return this.l44((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeEncoder).m44 = function (tag, value) {
    return this.j44(tag, JsonPrimitive_1(value));
  };
  protoOf(AbstractJsonTreeEncoder).f22 = function (tag, value) {
    return this.m44((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), value);
  };
  protoOf(AbstractJsonTreeEncoder).n44 = function (tag, value) {
    return this.j44(tag, JsonPrimitive_1(value));
  };
  protoOf(AbstractJsonTreeEncoder).g22 = function (tag, value) {
    return this.n44((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), value);
  };
  protoOf(AbstractJsonTreeEncoder).o44 = function (tag, value) {
    return this.j44(tag, JsonPrimitive_1(value));
  };
  protoOf(AbstractJsonTreeEncoder).h22 = function (tag, value) {
    return this.o44((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), value);
  };
  protoOf(AbstractJsonTreeEncoder).p44 = function (tag, value) {
    return this.j44(tag, JsonPrimitive_1(value));
  };
  protoOf(AbstractJsonTreeEncoder).i22 = function (tag, value) {
    return this.p44((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), value);
  };
  protoOf(AbstractJsonTreeEncoder).q44 = function (tag, value) {
    this.j44(tag, JsonPrimitive_1(value));
    if (!this.z43_1.d3v_1 && !isFinite(value)) {
      throw InvalidFloatingPointEncoded(value, tag, toString(this.k44()));
    }
  };
  protoOf(AbstractJsonTreeEncoder).j22 = function (tag, value) {
    return this.q44((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), value);
  };
  protoOf(AbstractJsonTreeEncoder).m1p = function (serializer, value) {
    if (!(this.a22() == null) || !get_requiresTopLevelTag(carrierDescriptor(serializer.t1k(), this.j1o()))) {
      $l$block: {
        // Inline function 'kotlinx.serialization.json.internal.encodePolymorphically' call
        if (this.k3v().d3t_1.b3v_1) {
          serializer.u1k(this, value);
          break $l$block;
        }
        var isPolymorphicSerializer = serializer instanceof AbstractPolymorphicSerializer;
        var tmp;
        if (isPolymorphicSerializer) {
          tmp = !this.k3v().d3t_1.j3v_1.equals(ClassDiscriminatorMode_NONE_getInstance());
        } else {
          var tmp_0;
          switch (this.k3v().d3t_1.j3v_1.m2_1) {
            case 0:
            case 2:
              tmp_0 = false;
              break;
            case 1:
              // Inline function 'kotlin.let' call

              var it = serializer.t1k().y1l();
              tmp_0 = equals(it, CLASS_getInstance()) || equals(it, OBJECT_getInstance());
              break;
            default:
              noWhenBranchMatchedException();
              break;
          }
          tmp = tmp_0;
        }
        var needDiscriminator = tmp;
        var baseClassDiscriminator = needDiscriminator ? classDiscriminator(serializer.t1k(), this.k3v()) : null;
        var tmp_1;
        if (isPolymorphicSerializer) {
          var casted = serializer instanceof AbstractPolymorphicSerializer ? serializer : THROW_CCE();
          $l$block_0: {
            // Inline function 'kotlin.requireNotNull' call
            if (value == null) {
              var message = 'Value for serializer ' + toString(serializer.t1k()) + ' should always be non-null. Please report issue to the kotlinx.serialization tracker.';
              throw IllegalArgumentException_init_$Create$(toString(message));
            } else {
              break $l$block_0;
            }
          }
          var actual = findPolymorphicSerializer_0(casted, this, value);
          if (!(baseClassDiscriminator == null)) {
            access$validateIfSealed$tPolymorphicKt(serializer, actual, baseClassDiscriminator);
          }
          checkKind(actual.t1k().y1l());
          tmp_1 = isInterface(actual, SerializationStrategy) ? actual : THROW_CCE();
        } else {
          tmp_1 = serializer;
        }
        var actualSerializer = tmp_1;
        if (!(baseClassDiscriminator == null)) {
          var serialName = actualSerializer.t1k().x1l();
          this.a44_1 = baseClassDiscriminator;
          this.b44_1 = serialName;
        }
        actualSerializer.u1k(this, value);
      }
    } else {
      // Inline function 'kotlin.apply' call
      (new JsonPrimitiveEncoder(this.x43_1, this.y43_1)).m1p(serializer, value);
    }
  };
  protoOf(AbstractJsonTreeEncoder).r44 = function (tag, value) {
    this.j44(tag, JsonPrimitive_1(value));
    if (!this.z43_1.d3v_1 && !isFinite_0(value)) {
      throw InvalidFloatingPointEncoded(value, tag, toString(this.k44()));
    }
  };
  protoOf(AbstractJsonTreeEncoder).k22 = function (tag, value) {
    return this.r44((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), value);
  };
  protoOf(AbstractJsonTreeEncoder).s44 = function (tag, value) {
    return this.j44(tag, JsonPrimitive_0(value));
  };
  protoOf(AbstractJsonTreeEncoder).l22 = function (tag, value) {
    return this.s44((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), value);
  };
  protoOf(AbstractJsonTreeEncoder).t44 = function (tag, value) {
    return this.j44(tag, JsonPrimitive_2(toString_1(value)));
  };
  protoOf(AbstractJsonTreeEncoder).m22 = function (tag, value) {
    return this.t44((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), value);
  };
  protoOf(AbstractJsonTreeEncoder).u44 = function (tag, value) {
    return this.j44(tag, JsonPrimitive_2(value));
  };
  protoOf(AbstractJsonTreeEncoder).n22 = function (tag, value) {
    return this.u44((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), value);
  };
  protoOf(AbstractJsonTreeEncoder).v44 = function (tag, enumDescriptor, ordinal) {
    return this.j44(tag, JsonPrimitive_2(enumDescriptor.c1m(ordinal)));
  };
  protoOf(AbstractJsonTreeEncoder).o22 = function (tag, enumDescriptor, ordinal) {
    return this.v44((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), enumDescriptor, ordinal);
  };
  protoOf(AbstractJsonTreeEncoder).w44 = function (tag, value) {
    this.j44(tag, JsonPrimitive_2(toString(value)));
  };
  protoOf(AbstractJsonTreeEncoder).c22 = function (tag, value) {
    return this.w44((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), value);
  };
  protoOf(AbstractJsonTreeEncoder).x44 = function (tag, inlineDescriptor) {
    return get_isUnsignedNumber(inlineDescriptor) ? inlineUnsignedNumberEncoder(this, tag) : get_isUnquotedLiteral(inlineDescriptor) ? inlineUnquotedLiteralEncoder(this, tag, inlineDescriptor) : protoOf(NamedValueEncoder).p22.call(this, tag, inlineDescriptor);
  };
  protoOf(AbstractJsonTreeEncoder).p22 = function (tag, inlineDescriptor) {
    return this.x44((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), inlineDescriptor);
  };
  protoOf(AbstractJsonTreeEncoder).a1p = function (descriptor) {
    var tmp;
    if (!(this.a22() == null)) {
      if (!(this.a44_1 == null))
        this.b44_1 = descriptor.x1l();
      tmp = protoOf(NamedValueEncoder).a1p.call(this, descriptor);
    } else {
      tmp = (new JsonPrimitiveEncoder(this.x43_1, this.y43_1)).a1p(descriptor);
    }
    return tmp;
  };
  protoOf(AbstractJsonTreeEncoder).u1n = function (descriptor) {
    var tmp;
    if (this.a22() == null) {
      tmp = this.y43_1;
    } else {
      tmp = AbstractJsonTreeEncoder$beginStructure$lambda(this);
    }
    var consumer = tmp;
    var tmp0_subject = descriptor.y1l();
    var tmp_0;
    var tmp_1;
    if (equals(tmp0_subject, LIST_getInstance())) {
      tmp_1 = true;
    } else {
      tmp_1 = tmp0_subject instanceof PolymorphicKind;
    }
    if (tmp_1) {
      tmp_0 = new JsonTreeListEncoder(this.x43_1, consumer);
    } else {
      if (equals(tmp0_subject, MAP_getInstance())) {
        // Inline function 'kotlinx.serialization.json.internal.selectMapMode' call
        var this_0 = this.x43_1;
        var keyDescriptor = carrierDescriptor(descriptor.f1m(0), this_0.j1o());
        var keyKind = keyDescriptor.y1l();
        var tmp_2;
        var tmp_3;
        if (keyKind instanceof PrimitiveKind) {
          tmp_3 = true;
        } else {
          tmp_3 = equals(keyKind, ENUM_getInstance());
        }
        if (tmp_3) {
          tmp_2 = new JsonTreeMapEncoder(this.x43_1, consumer);
        } else {
          if (this_0.d3t_1.w3u_1) {
            tmp_2 = new JsonTreeListEncoder(this.x43_1, consumer);
          } else {
            throw InvalidKeyKindException(keyDescriptor);
          }
        }
        tmp_0 = tmp_2;
      } else {
        tmp_0 = new JsonTreeEncoder(this.x43_1, consumer);
      }
    }
    var encoder = tmp_0;
    var discriminator = this.a44_1;
    if (!(discriminator == null)) {
      if (encoder instanceof JsonTreeMapEncoder) {
        encoder.j44('key', JsonPrimitive_2(discriminator));
        var tmp1_elvis_lhs = this.b44_1;
        encoder.j44('value', JsonPrimitive_2(tmp1_elvis_lhs == null ? descriptor.x1l() : tmp1_elvis_lhs));
      } else {
        var tmp2_elvis_lhs = this.b44_1;
        encoder.j44(discriminator, JsonPrimitive_2(tmp2_elvis_lhs == null ? descriptor.x1l() : tmp2_elvis_lhs));
      }
      this.a44_1 = null;
      this.b44_1 = null;
    }
    return encoder;
  };
  protoOf(AbstractJsonTreeEncoder).q22 = function (descriptor) {
    this.y43_1(this.k44());
  };
  function get_requiresTopLevelTag(_this__u8e3s4) {
    var tmp;
    var tmp_0 = _this__u8e3s4.y1l();
    if (tmp_0 instanceof PrimitiveKind) {
      tmp = true;
    } else {
      tmp = _this__u8e3s4.y1l() === ENUM_getInstance();
    }
    return tmp;
  }
  function JsonPrimitiveEncoder(json, nodeConsumer) {
    AbstractJsonTreeEncoder.call(this, json, nodeConsumer);
    this.u45_1 = null;
    this.s22('primitive');
  }
  protoOf(JsonPrimitiveEncoder).j44 = function (key, element) {
    // Inline function 'kotlin.require' call
    if (!(key === 'primitive')) {
      var message = "This output can only consume primitives with 'primitive' tag";
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    // Inline function 'kotlin.require' call
    if (!(this.u45_1 == null)) {
      var message_0 = 'Primitive element was already recorded. Does call to .encodeXxx happen more than once?';
      throw IllegalArgumentException_init_$Create$(toString(message_0));
    }
    this.u45_1 = element;
    this.y43_1(element);
  };
  protoOf(JsonPrimitiveEncoder).k44 = function () {
    var tmp0 = this.u45_1;
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
    tmp.b46_1 = ArrayList_init_$Create$();
  }
  protoOf(JsonTreeListEncoder).x21 = function (descriptor, index) {
    return index.toString();
  };
  protoOf(JsonTreeListEncoder).j44 = function (key, element) {
    var idx = toInt(key);
    this.b46_1.b2(idx, element);
  };
  protoOf(JsonTreeListEncoder).k44 = function () {
    return new JsonArray(this.b46_1);
  };
  function _get_tag__e6h4qf($this) {
    var tmp = $this.m45_1;
    if (!(tmp == null))
      return tmp;
    else {
      throwUninitializedPropertyAccessException('tag');
    }
  }
  function JsonTreeMapEncoder(json, nodeConsumer) {
    JsonTreeEncoder.call(this, json, nodeConsumer);
    this.n45_1 = true;
  }
  protoOf(JsonTreeMapEncoder).j44 = function (key, element) {
    if (this.n45_1) {
      var tmp = this;
      var tmp_0;
      if (element instanceof JsonPrimitive) {
        tmp_0 = element.n3v();
      } else {
        if (element instanceof JsonObject) {
          throw InvalidKeyKindException(JsonObjectSerializer_getInstance().f3w_1);
        } else {
          if (element instanceof JsonArray) {
            throw InvalidKeyKindException(JsonArraySerializer_getInstance().k3w_1);
          } else {
            noWhenBranchMatchedException();
          }
        }
      }
      tmp.m45_1 = tmp_0;
      this.n45_1 = false;
    } else {
      var tmp0 = this.i44_1;
      // Inline function 'kotlin.collections.set' call
      var key_0 = _get_tag__e6h4qf(this);
      tmp0.i2(key_0, element);
      this.n45_1 = true;
    }
  };
  protoOf(JsonTreeMapEncoder).k44 = function () {
    return new JsonObject(this.i44_1);
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
    this.h41_1 = begin;
    this.i41_1 = end;
  }
  function switchMode(_this__u8e3s4, desc) {
    var tmp0_subject = desc.y1l();
    var tmp;
    if (tmp0_subject instanceof PolymorphicKind) {
      tmp = WriteMode_POLY_OBJ_getInstance();
    } else {
      if (equals(tmp0_subject, LIST_getInstance())) {
        tmp = WriteMode_LIST_getInstance();
      } else {
        if (equals(tmp0_subject, MAP_getInstance())) {
          // Inline function 'kotlinx.serialization.json.internal.selectMapMode' call
          var keyDescriptor = carrierDescriptor(desc.f1m(0), _this__u8e3s4.j1o());
          var keyKind = keyDescriptor.y1l();
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
            if (_this__u8e3s4.d3t_1.w3u_1) {
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
    if (equals(_this__u8e3s4.y1l(), CONTEXTUAL_getInstance())) {
      var tmp0_safe_receiver = getContextualDescriptor(module_0, _this__u8e3s4);
      var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : carrierDescriptor(tmp0_safe_receiver, module_0);
      tmp = tmp1_elvis_lhs == null ? _this__u8e3s4 : tmp1_elvis_lhs;
    } else if (_this__u8e3s4.z1l()) {
      tmp = carrierDescriptor(_this__u8e3s4.f1m(0), module_0);
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
    $this.c46(lastPosition, current);
    return appendEsc($this, current + 1 | 0);
  }
  function decodedString($this, lastPosition, currentPosition) {
    $this.c46(lastPosition, currentPosition);
    var result = $this.y3t_1.toString();
    $this.y3t_1.uc(0);
    return result;
  }
  function takePeeked($this) {
    // Inline function 'kotlin.also' call
    var this_0 = ensureNotNull($this.x3t_1);
    $this.x3t_1 = null;
    return this_0;
  }
  function wasUnquotedString($this) {
    return !(charSequenceGet($this.d46(), $this.v3t_1 - 1 | 0) === _Char___init__impl__6a9atx(34));
  }
  function appendEsc($this, startPosition) {
    var currentPosition = startPosition;
    currentPosition = $this.e46(currentPosition);
    if (currentPosition === -1) {
      $this.e3y('Expected escape sequence to continue, got EOF');
    }
    var tmp = $this.d46();
    var _unary__edvuaz = currentPosition;
    currentPosition = _unary__edvuaz + 1 | 0;
    var currentChar = charSequenceGet(tmp, _unary__edvuaz);
    if (currentChar === _Char___init__impl__6a9atx(117)) {
      return appendHex($this, $this.d46(), currentPosition);
    }
    // Inline function 'kotlin.code' call
    var tmp$ret$0 = Char__toInt_impl_vasixd(currentChar);
    var c = escapeToChar(tmp$ret$0);
    if (c === _Char___init__impl__6a9atx(0)) {
      $this.e3y("Invalid escaped char '" + toString_1(currentChar) + "'");
    }
    $this.y3t_1.e8(c);
    return currentPosition;
  }
  function appendHex($this, source, startPos) {
    if ((startPos + 4 | 0) >= charSequenceLength(source)) {
      $this.v3t_1 = startPos;
      $this.f46();
      if (($this.v3t_1 + 4 | 0) >= charSequenceLength(source)) {
        $this.e3y('Unexpected EOF during unicode escape');
      }
      return appendHex($this, source, $this.v3t_1);
    }
    $this.y3t_1.e8(numberToChar((((fromHexChar($this, source, startPos) << 12) + (fromHexChar($this, source, startPos + 1 | 0) << 8) | 0) + (fromHexChar($this, source, startPos + 2 | 0) << 4) | 0) + fromHexChar($this, source, startPos + 3 | 0) | 0));
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
      $this.e3y("Invalid toHexChar char '" + toString_1(character) + "' in unicode escape");
    }
    return tmp;
  }
  function consumeBoolean2($this, start) {
    var current = $this.e46(start);
    if (current >= charSequenceLength($this.d46()) || current === -1) {
      $this.e3y('EOF');
    }
    var tmp = $this.d46();
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
        $this.e3y("Expected valid boolean literal prefix, but had '" + $this.j3z() + "'");
      }
    }
    return tmp_0;
  }
  function consumeBooleanLiteral($this, literalSuffix, current) {
    if ((charSequenceLength($this.d46()) - current | 0) < literalSuffix.length) {
      $this.e3y('Unexpected end of boolean literal');
    }
    var inductionVariable = 0;
    var last = charSequenceLength(literalSuffix) - 1 | 0;
    if (inductionVariable <= last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var expected = charSequenceGet(literalSuffix, i);
        var actual = charSequenceGet($this.d46(), current + i | 0);
        // Inline function 'kotlin.code' call
        var tmp = Char__toInt_impl_vasixd(expected);
        // Inline function 'kotlin.code' call
        if (!(tmp === (Char__toInt_impl_vasixd(actual) | 32))) {
          $this.e3y("Expected valid boolean literal prefix, but had '" + $this.j3z() + "'");
        }
      }
       while (inductionVariable <= last);
    $this.v3t_1 = current + literalSuffix.length | 0;
  }
  function consumeNumericLiteral$calculateExponent(exponentAccumulator, isExponentPositive) {
    var tmp;
    switch (isExponentPositive) {
      case false:
        // Inline function 'kotlin.math.pow' call

        var x = -exponentAccumulator.j3();
        tmp = Math.pow(10.0, x);
        break;
      case true:
        // Inline function 'kotlin.math.pow' call

        var x_0 = exponentAccumulator.j3();
        tmp = Math.pow(10.0, x_0);
        break;
      default:
        noWhenBranchMatchedException();
        break;
    }
    return tmp;
  }
  function AbstractJsonLexer() {
    this.v3t_1 = 0;
    this.w3t_1 = new JsonPath();
    this.x3t_1 = null;
    this.y3t_1 = StringBuilder_init_$Create$();
  }
  protoOf(AbstractJsonLexer).f46 = function () {
  };
  protoOf(AbstractJsonLexer).x40 = function () {
    var current = this.g46();
    var source = this.d46();
    if (current >= charSequenceLength(source) || current === -1)
      return false;
    if (charSequenceGet(source, current) === _Char___init__impl__6a9atx(44)) {
      this.v3t_1 = this.v3t_1 + 1 | 0;
      return true;
    }
    return false;
  };
  protoOf(AbstractJsonLexer).h46 = function (c) {
    return c === _Char___init__impl__6a9atx(125) || c === _Char___init__impl__6a9atx(93) || (c === _Char___init__impl__6a9atx(58) || c === _Char___init__impl__6a9atx(44)) ? false : true;
  };
  protoOf(AbstractJsonLexer).z3t = function () {
    var nextToken = this.l3z();
    if (!(nextToken === 10)) {
      this.e3y('Expected EOF after parsing, but had ' + toString_1(charSequenceGet(this.d46(), this.v3t_1 - 1 | 0)) + ' instead');
    }
  };
  protoOf(AbstractJsonLexer).f3z = function (expected) {
    var token = this.l3z();
    if (!(token === expected)) {
      this.i46(expected);
    }
    return token;
  };
  protoOf(AbstractJsonLexer).j46 = function (expected) {
    if (this.v3t_1 > 0 && expected === _Char___init__impl__6a9atx(34)) {
      var tmp$ret$1;
      $l$block: {
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.withPositionRollback' call
        var snapshot = this.v3t_1;
        try {
          this.v3t_1 = this.v3t_1 - 1 | 0;
          tmp$ret$1 = this.j3z();
          break $l$block;
        }finally {
          this.v3t_1 = snapshot;
        }
      }
      var inputLiteral = tmp$ret$1;
      if (inputLiteral === 'null') {
        this.d3y("Expected string literal but 'null' literal was found", this.v3t_1 - 1 | 0, "Use 'coerceInputValues = true' in 'Json {}' builder to coerce nulls if property has a default value.");
      }
    }
    this.i46(charToTokenClass(expected));
  };
  protoOf(AbstractJsonLexer).k46 = function (expectedToken, wasConsumed) {
    var expected = tokenDescription(expectedToken);
    var position = wasConsumed ? this.v3t_1 - 1 | 0 : this.v3t_1;
    var s = this.v3t_1 === charSequenceLength(this.d46()) || position < 0 ? 'EOF' : toString_1(charSequenceGet(this.d46(), position));
    this.e3y('Expected ' + expected + ", but had '" + s + "' instead", position);
  };
  protoOf(AbstractJsonLexer).i46 = function (expectedToken, wasConsumed, $super) {
    wasConsumed = wasConsumed === VOID ? true : wasConsumed;
    return $super === VOID ? this.k46(expectedToken, wasConsumed) : $super.k46.call(this, expectedToken, wasConsumed);
  };
  protoOf(AbstractJsonLexer).g3z = function () {
    var source = this.d46();
    var cpos = this.v3t_1;
    $l$loop_0: while (true) {
      cpos = this.e46(cpos);
      if (cpos === -1)
        break $l$loop_0;
      var ch = charSequenceGet(source, cpos);
      if (ch === _Char___init__impl__6a9atx(32) || ch === _Char___init__impl__6a9atx(10) || ch === _Char___init__impl__6a9atx(13) || ch === _Char___init__impl__6a9atx(9)) {
        cpos = cpos + 1 | 0;
        continue $l$loop_0;
      }
      this.v3t_1 = cpos;
      return charToTokenClass(ch);
    }
    this.v3t_1 = cpos;
    return 10;
  };
  protoOf(AbstractJsonLexer).y40 = function (doConsume) {
    var current = this.g46();
    current = this.e46(current);
    var len = charSequenceLength(this.d46()) - current | 0;
    if (len < 4 || current === -1)
      return false;
    var inductionVariable = 0;
    if (inductionVariable <= 3)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        if (!(charSequenceGet('null', i) === charSequenceGet(this.d46(), current + i | 0)))
          return false;
      }
       while (inductionVariable <= 3);
    if (len > 4 && charToTokenClass(charSequenceGet(this.d46(), current + 4 | 0)) === 0)
      return false;
    if (doConsume) {
      this.v3t_1 = current + 4 | 0;
    }
    return true;
  };
  protoOf(AbstractJsonLexer).j41 = function (doConsume, $super) {
    doConsume = doConsume === VOID ? true : doConsume;
    return $super === VOID ? this.y40(doConsume) : $super.y40.call(this, doConsume);
  };
  protoOf(AbstractJsonLexer).z40 = function (isLenient) {
    var token = this.g3z();
    var tmp;
    if (isLenient) {
      if (!(token === 1) && !(token === 0))
        return null;
      tmp = this.j3z();
    } else {
      if (!(token === 1))
        return null;
      tmp = this.i3z();
    }
    var string = tmp;
    this.x3t_1 = string;
    return string;
  };
  protoOf(AbstractJsonLexer).l46 = function () {
    this.x3t_1 = null;
  };
  protoOf(AbstractJsonLexer).m46 = function (startPos, endPos) {
    // Inline function 'kotlin.text.substring' call
    var this_0 = this.d46();
    return toString(charSequenceSubSequence(this_0, startPos, endPos));
  };
  protoOf(AbstractJsonLexer).i3z = function () {
    if (!(this.x3t_1 == null)) {
      return takePeeked(this);
    }
    return this.c41();
  };
  protoOf(AbstractJsonLexer).consumeString2 = function (source, startPosition, current) {
    var currentPosition = current;
    var lastPosition = startPosition;
    var char = charSequenceGet(source, currentPosition);
    var usedAppend = false;
    while (!(char === _Char___init__impl__6a9atx(34))) {
      if (char === _Char___init__impl__6a9atx(92)) {
        usedAppend = true;
        currentPosition = this.e46(appendEscape(this, lastPosition, currentPosition));
        if (currentPosition === -1) {
          this.e3y('Unexpected EOF', currentPosition);
        }
        lastPosition = currentPosition;
      } else {
        currentPosition = currentPosition + 1 | 0;
        if (currentPosition >= charSequenceLength(source)) {
          usedAppend = true;
          this.c46(lastPosition, currentPosition);
          currentPosition = this.e46(currentPosition);
          if (currentPosition === -1) {
            this.e3y('Unexpected EOF', currentPosition);
          }
          lastPosition = currentPosition;
        }
      }
      char = charSequenceGet(source, currentPosition);
    }
    var tmp;
    if (!usedAppend) {
      tmp = this.m46(lastPosition, currentPosition);
    } else {
      tmp = decodedString(this, lastPosition, currentPosition);
    }
    var string = tmp;
    this.v3t_1 = currentPosition + 1 | 0;
    return string;
  };
  protoOf(AbstractJsonLexer).d41 = function () {
    var result = this.j3z();
    if (result === 'null' && wasUnquotedString(this)) {
      this.e3y("Unexpected 'null' value instead of string literal");
    }
    return result;
  };
  protoOf(AbstractJsonLexer).j3z = function () {
    if (!(this.x3t_1 == null)) {
      return takePeeked(this);
    }
    var current = this.g46();
    if (current >= charSequenceLength(this.d46()) || current === -1) {
      this.e3y('EOF', current);
    }
    var token = charToTokenClass(charSequenceGet(this.d46(), current));
    if (token === 1) {
      return this.i3z();
    }
    if (!(token === 0)) {
      this.e3y('Expected beginning of the string, but got ' + toString_1(charSequenceGet(this.d46(), current)));
    }
    var usedAppend = false;
    while (charToTokenClass(charSequenceGet(this.d46(), current)) === 0) {
      current = current + 1 | 0;
      if (current >= charSequenceLength(this.d46())) {
        usedAppend = true;
        this.c46(this.v3t_1, current);
        var eof = this.e46(current);
        if (eof === -1) {
          this.v3t_1 = current;
          return decodedString(this, 0, 0);
        } else {
          current = eof;
        }
      }
    }
    var tmp;
    if (!usedAppend) {
      tmp = this.m46(this.v3t_1, current);
    } else {
      tmp = decodedString(this, this.v3t_1, current);
    }
    var result = tmp;
    this.v3t_1 = current;
    return result;
  };
  protoOf(AbstractJsonLexer).c46 = function (fromIndex, toIndex) {
    this.y3t_1.oc(this.d46(), fromIndex, toIndex);
  };
  protoOf(AbstractJsonLexer).b41 = function (allowLenientStrings) {
    // Inline function 'kotlin.collections.mutableListOf' call
    var tokenStack = ArrayList_init_$Create$();
    var lastToken = this.g3z();
    if (!(lastToken === 8) && !(lastToken === 6)) {
      this.j3z();
      return Unit_instance;
    }
    $l$loop: while (true) {
      lastToken = this.g3z();
      if (lastToken === 1) {
        if (allowLenientStrings)
          this.j3z();
        else
          this.c41();
        continue $l$loop;
      }
      var tmp0_subject = lastToken;
      if (tmp0_subject === 8 || tmp0_subject === 6) {
        tokenStack.e(lastToken);
      } else if (tmp0_subject === 9) {
        if (!(last(tokenStack) === 8))
          throw JsonDecodingException_0(this.v3t_1, 'found ] instead of } at path: ' + this.w3t_1.toString(), this.d46());
        removeLast(tokenStack);
      } else if (tmp0_subject === 7) {
        if (!(last(tokenStack) === 6))
          throw JsonDecodingException_0(this.v3t_1, 'found } instead of ] at path: ' + this.w3t_1.toString(), this.d46());
        removeLast(tokenStack);
      } else if (tmp0_subject === 10) {
        this.e3y('Unexpected end of input due to malformed JSON during ignoring unknown keys');
      }
      this.l3z();
      if (tokenStack.j() === 0)
        return Unit_instance;
    }
  };
  protoOf(AbstractJsonLexer).toString = function () {
    return "JsonReader(source='" + toString(this.d46()) + "', currentPosition=" + this.v3t_1 + ')';
  };
  protoOf(AbstractJsonLexer).a41 = function (key) {
    var processed = this.m46(0, this.v3t_1);
    var lastIndexOf_0 = lastIndexOf(processed, key);
    this.d3y("Encountered an unknown key '" + key + "'", lastIndexOf_0, "Use 'ignoreUnknownKeys = true' in 'Json {}' builder to ignore unknown keys.");
  };
  protoOf(AbstractJsonLexer).d3y = function (message, position, hint) {
    var tmp;
    // Inline function 'kotlin.text.isEmpty' call
    if (charSequenceLength(hint) === 0) {
      tmp = '';
    } else {
      tmp = '\n' + hint;
    }
    var hintMessage = tmp;
    throw JsonDecodingException_0(position, message + ' at path: ' + this.w3t_1.r3y() + hintMessage, this.d46());
  };
  protoOf(AbstractJsonLexer).e3y = function (message, position, hint, $super) {
    position = position === VOID ? this.v3t_1 : position;
    hint = hint === VOID ? '' : hint;
    return $super === VOID ? this.d3y(message, position, hint) : $super.d3y.call(this, message, position, hint);
  };
  protoOf(AbstractJsonLexer).u3v = function () {
    var current = this.g46();
    current = this.e46(current);
    if (current >= charSequenceLength(this.d46()) || current === -1) {
      this.e3y('EOF');
    }
    var tmp;
    if (charSequenceGet(this.d46(), current) === _Char___init__impl__6a9atx(34)) {
      current = current + 1 | 0;
      if (current === charSequenceLength(this.d46())) {
        this.e3y('EOF');
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
    $l$loop_4: while (!(current === charSequenceLength(this.d46()))) {
      var ch = charSequenceGet(this.d46(), current);
      if ((ch === _Char___init__impl__6a9atx(101) || ch === _Char___init__impl__6a9atx(69)) && !hasExponent) {
        if (current === start) {
          this.e3y('Unexpected symbol ' + toString_1(ch) + ' in numeric literal');
        }
        isExponentPositive = true;
        hasExponent = true;
        current = current + 1 | 0;
        continue $l$loop_4;
      }
      if (ch === _Char___init__impl__6a9atx(45) && hasExponent) {
        if (current === start) {
          this.e3y("Unexpected symbol '-' in numeric literal");
        }
        isExponentPositive = false;
        current = current + 1 | 0;
        continue $l$loop_4;
      }
      if (ch === _Char___init__impl__6a9atx(43) && hasExponent) {
        if (current === start) {
          this.e3y("Unexpected symbol '+' in numeric literal");
        }
        isExponentPositive = true;
        current = current + 1 | 0;
        continue $l$loop_4;
      }
      if (ch === _Char___init__impl__6a9atx(45)) {
        if (!(current === start)) {
          this.e3y("Unexpected symbol '-' in numeric literal");
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
        this.e3y("Unexpected symbol '" + toString_1(ch) + "' in numeric literal");
      }
      if (hasExponent) {
        // Inline function 'kotlin.Long.times' call
        // Inline function 'kotlin.Long.plus' call
        exponentAccumulator = exponentAccumulator.u2(toLong(10)).s2(toLong(digit));
        continue $l$loop_4;
      }
      // Inline function 'kotlin.Long.times' call
      // Inline function 'kotlin.Long.minus' call
      accumulator = accumulator.u2(toLong(10)).t2(toLong(digit));
      if (accumulator.b1(new Long(0, 0)) > 0) {
        this.e3y('Numeric value overflow');
      }
    }
    var hasChars = !(current === start);
    if (start === current || (isNegative && start === (current - 1 | 0))) {
      this.e3y('Expected numeric literal');
    }
    if (hasQuotation) {
      if (!hasChars) {
        this.e3y('EOF');
      }
      if (!(charSequenceGet(this.d46(), current) === _Char___init__impl__6a9atx(34))) {
        this.e3y('Expected closing quotation mark');
      }
      current = current + 1 | 0;
    }
    this.v3t_1 = current;
    if (hasExponent) {
      var doubleAccumulator = accumulator.j3() * consumeNumericLiteral$calculateExponent(exponentAccumulator, isExponentPositive);
      if (doubleAccumulator > (new Long(-1, 2147483647)).j3() || doubleAccumulator < (new Long(0, -2147483648)).j3()) {
        this.e3y('Numeric value overflow');
      }
      // Inline function 'kotlin.math.floor' call
      if (!(Math.floor(doubleAccumulator) === doubleAccumulator)) {
        this.e3y("Can't convert " + doubleAccumulator + ' to Long');
      }
      accumulator = numberToLong(doubleAccumulator);
    }
    var tmp_0;
    if (isNegative) {
      tmp_0 = accumulator;
    } else if (!accumulator.equals(new Long(0, -2147483648))) {
      tmp_0 = accumulator.z2();
    } else {
      this.e3y('Numeric value overflow');
    }
    return tmp_0;
  };
  protoOf(AbstractJsonLexer).k41 = function () {
    var current = this.g46();
    if (current === charSequenceLength(this.d46())) {
      this.e3y('EOF');
    }
    var tmp;
    if (charSequenceGet(this.d46(), current) === _Char___init__impl__6a9atx(34)) {
      current = current + 1 | 0;
      tmp = true;
    } else {
      tmp = false;
    }
    var hasQuotation = tmp;
    var result = consumeBoolean2(this, current);
    if (hasQuotation) {
      if (this.v3t_1 === charSequenceLength(this.d46())) {
        this.e3y('EOF');
      }
      if (!(charSequenceGet(this.d46(), this.v3t_1) === _Char___init__impl__6a9atx(34))) {
        this.e3y('Expected closing quotation mark');
      }
      this.v3t_1 = this.v3t_1 + 1 | 0;
    }
    return result;
  };
  function charToTokenClass(c) {
    var tmp;
    // Inline function 'kotlin.code' call
    if (Char__toInt_impl_vasixd(c) < 126) {
      var tmp_0 = CharMappings_getInstance().o46_1;
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
    return c < 117 ? CharMappings_getInstance().n46_1[c] : _Char___init__impl__6a9atx(0);
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
      $this.n46_1[tmp$ret$0] = numberToChar(c);
    }
  }
  function initC2ESC_0($this, c, esc) {
    // Inline function 'kotlin.code' call
    var tmp$ret$0 = Char__toInt_impl_vasixd(c);
    return initC2ESC($this, tmp$ret$0, esc);
  }
  function initC2TC($this, c, cl) {
    $this.o46_1[c] = cl;
  }
  function initC2TC_0($this, c, cl) {
    // Inline function 'kotlin.code' call
    var tmp$ret$0 = Char__toInt_impl_vasixd(c);
    return initC2TC($this, tmp$ret$0, cl);
  }
  function CharMappings() {
    CharMappings_instance = this;
    this.n46_1 = charArray(117);
    this.o46_1 = new Int8Array(126);
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
  protoOf(StringJsonLexerWithComments).l3z = function () {
    var source = this.d46();
    var cpos = this.g46();
    if (cpos >= source.length || cpos === -1)
      return 10;
    this.v3t_1 = cpos + 1 | 0;
    return charToTokenClass(charSequenceGet(source, cpos));
  };
  protoOf(StringJsonLexerWithComments).h3z = function () {
    var current = this.g46();
    if (current >= this.d46().length || current === -1)
      return false;
    return this.h46(charSequenceGet(this.d46(), current));
  };
  protoOf(StringJsonLexerWithComments).w40 = function (expected) {
    var source = this.d46();
    var current = this.g46();
    if (current >= source.length || current === -1) {
      this.v3t_1 = -1;
      this.j46(expected);
    }
    var c = charSequenceGet(source, current);
    this.v3t_1 = current + 1 | 0;
    if (c === expected)
      return Unit_instance;
    else {
      this.j46(expected);
    }
  };
  protoOf(StringJsonLexerWithComments).g3z = function () {
    var source = this.d46();
    var cpos = this.g46();
    if (cpos >= source.length || cpos === -1)
      return 10;
    this.v3t_1 = cpos;
    return charToTokenClass(charSequenceGet(source, cpos));
  };
  protoOf(StringJsonLexerWithComments).g46 = function () {
    var current = this.v3t_1;
    if (current === -1)
      return current;
    var source = this.d46();
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
            this.v3t_1 = source.length;
            this.e3y('Expected end of the block comment: "*/", but had EOF instead');
          } else {
            current = current + 2 | 0;
          }
          continue $l$loop_1;
        }
      }
      break $l$loop_1;
    }
    this.v3t_1 = current;
    return current;
  };
  function StringJsonLexer(source) {
    AbstractJsonLexer.call(this);
    this.y46_1 = source;
  }
  protoOf(StringJsonLexer).d46 = function () {
    return this.y46_1;
  };
  protoOf(StringJsonLexer).e46 = function (position) {
    return position < this.d46().length ? position : -1;
  };
  protoOf(StringJsonLexer).l3z = function () {
    var source = this.d46();
    var cpos = this.v3t_1;
    $l$loop: while (!(cpos === -1) && cpos < source.length) {
      var _unary__edvuaz = cpos;
      cpos = _unary__edvuaz + 1 | 0;
      var c = charSequenceGet(source, _unary__edvuaz);
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
      if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9))
        continue $l$loop;
      this.v3t_1 = cpos;
      return charToTokenClass(c);
    }
    this.v3t_1 = source.length;
    return 10;
  };
  protoOf(StringJsonLexer).h3z = function () {
    var current = this.v3t_1;
    if (current === -1)
      return false;
    var source = this.d46();
    $l$loop: while (current < source.length) {
      var c = charSequenceGet(source, current);
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
      if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9)) {
        current = current + 1 | 0;
        continue $l$loop;
      }
      this.v3t_1 = current;
      return this.h46(c);
    }
    this.v3t_1 = current;
    return false;
  };
  protoOf(StringJsonLexer).g46 = function () {
    var current = this.v3t_1;
    if (current === -1)
      return current;
    var source = this.d46();
    $l$loop: while (current < source.length) {
      var c = charSequenceGet(source, current);
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
      if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9)) {
        current = current + 1 | 0;
      } else {
        break $l$loop;
      }
    }
    this.v3t_1 = current;
    return current;
  };
  protoOf(StringJsonLexer).w40 = function (expected) {
    if (this.v3t_1 === -1) {
      this.j46(expected);
    }
    var source = this.d46();
    var cpos = this.v3t_1;
    $l$loop: while (cpos < source.length) {
      var _unary__edvuaz = cpos;
      cpos = _unary__edvuaz + 1 | 0;
      var c = charSequenceGet(source, _unary__edvuaz);
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
      if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9))
        continue $l$loop;
      this.v3t_1 = cpos;
      if (c === expected)
        return Unit_instance;
      this.j46(expected);
    }
    this.v3t_1 = -1;
    this.j46(expected);
  };
  protoOf(StringJsonLexer).c41 = function () {
    this.w40(_Char___init__impl__6a9atx(34));
    var current = this.v3t_1;
    var closingQuote = indexOf_0(this.d46(), _Char___init__impl__6a9atx(34), current);
    if (closingQuote === -1) {
      this.j3z();
      this.k46(1, false);
    }
    var inductionVariable = current;
    if (inductionVariable < closingQuote)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        if (charSequenceGet(this.d46(), i) === _Char___init__impl__6a9atx(92)) {
          return this.consumeString2(this.d46(), this.v3t_1, i);
        }
      }
       while (inductionVariable < closingQuote);
    this.v3t_1 = closingQuote + 1 | 0;
    // Inline function 'kotlin.text.substring' call
    // Inline function 'kotlin.js.asDynamic' call
    return this.d46().substring(current, closingQuote);
  };
  protoOf(StringJsonLexer).e41 = function (keyToMatch, isLenient) {
    var positionSnapshot = this.v3t_1;
    try {
      if (!(this.l3z() === 6))
        return null;
      var firstKey = this.z40(isLenient);
      if (!(firstKey === keyToMatch))
        return null;
      this.l46();
      if (!(this.l3z() === 5))
        return null;
      return this.z40(isLenient);
    }finally {
      this.v3t_1 = positionSnapshot;
      this.l46();
    }
  };
  function StringJsonLexer_0(json, source) {
    return !json.d3t_1.i3v_1 ? new StringJsonLexer(source) : new StringJsonLexerWithComments(source);
  }
  function get_schemaCache(_this__u8e3s4) {
    return _this__u8e3s4.f3t_1;
  }
  function JsonToStringWriter() {
    this.l3t_1 = StringBuilder_init_$Create$_0(128);
  }
  protoOf(JsonToStringWriter).i3x = function (value) {
    this.l3t_1.sc(value);
  };
  protoOf(JsonToStringWriter).c3x = function (char) {
    this.l3t_1.e8(char);
  };
  protoOf(JsonToStringWriter).e3x = function (text) {
    this.l3t_1.d8(text);
  };
  protoOf(JsonToStringWriter).o3x = function (text) {
    printQuoted(this.l3t_1, text);
  };
  protoOf(JsonToStringWriter).m3t = function () {
    this.l3t_1.vc();
  };
  protoOf(JsonToStringWriter).toString = function () {
    return this.l3t_1.toString();
  };
  function createMapForCache(initialCapacity) {
    return HashMap_init_$Create$(initialCapacity);
  }
  //region block: post-declaration
  protoOf(defer$1).t1l = get_isNullable;
  protoOf(defer$1).z1l = get_isInline;
  protoOf(defer$1).b1m = get_annotations;
  protoOf(PolymorphismValidator).g25 = contextual;
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
