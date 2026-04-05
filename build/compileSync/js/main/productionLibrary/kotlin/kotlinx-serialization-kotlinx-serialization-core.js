(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'));
  else {
    if (typeof globalThis['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'kotlinx-serialization-kotlinx-serialization-core'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'kotlinx-serialization-kotlinx-serialization-core'.");
    }
    globalThis['kotlinx-serialization-kotlinx-serialization-core'] = factory(typeof globalThis['kotlinx-serialization-kotlinx-serialization-core'] === 'undefined' ? {} : globalThis['kotlinx-serialization-kotlinx-serialization-core'], globalThis['kotlin-kotlin-stdlib']);
  }
}(function (_, kotlin_kotlin) {
  'use strict';
  //region block: imports
  var imul = Math.imul;
  var protoOf = kotlin_kotlin.$_$.bc;
  var initMetadataForInterface = kotlin_kotlin.$_$.bb;
  var VOID = kotlin_kotlin.$_$.h;
  var StringCompanionObject_instance = kotlin_kotlin.$_$.s4;
  var Unit_instance = kotlin_kotlin.$_$.f5;
  var emptyList = kotlin_kotlin.$_$.t6;
  var LazyThreadSafetyMode_PUBLICATION_getInstance = kotlin_kotlin.$_$.l;
  var lazy = kotlin_kotlin.$_$.fh;
  var toString = kotlin_kotlin.$_$.fc;
  var initMetadataForClass = kotlin_kotlin.$_$.xa;
  var getKClassFromExpression = kotlin_kotlin.$_$.e;
  var KProperty1 = kotlin_kotlin.$_$.zc;
  var getPropertyCallableRef = kotlin_kotlin.$_$.ua;
  var THROW_CCE = kotlin_kotlin.$_$.ig;
  var IllegalArgumentException_init_$Create$ = kotlin_kotlin.$_$.u1;
  var zip = kotlin_kotlin.$_$.g9;
  var toMap = kotlin_kotlin.$_$.z8;
  var LinkedHashMap_init_$Create$ = kotlin_kotlin.$_$.y;
  var IllegalStateException_init_$Create$ = kotlin_kotlin.$_$.y1;
  var mapCapacity = kotlin_kotlin.$_$.r7;
  var LinkedHashMap_init_$Create$_0 = kotlin_kotlin.$_$.x;
  var KtMap = kotlin_kotlin.$_$.o5;
  var isInterface = kotlin_kotlin.$_$.mb;
  var IllegalArgumentException_init_$Init$ = kotlin_kotlin.$_$.r1;
  var objectCreate = kotlin_kotlin.$_$.ac;
  var captureStack = kotlin_kotlin.$_$.ia;
  var IllegalArgumentException_init_$Init$_0 = kotlin_kotlin.$_$.t1;
  var IllegalArgumentException_init_$Init$_1 = kotlin_kotlin.$_$.v1;
  var IllegalArgumentException = kotlin_kotlin.$_$.bg;
  var listOf = kotlin_kotlin.$_$.p7;
  var collectionSizeOrDefault = kotlin_kotlin.$_$.b6;
  var ArrayList_init_$Create$ = kotlin_kotlin.$_$.o;
  var KClass = kotlin_kotlin.$_$.vc;
  var Triple = kotlin_kotlin.$_$.kg;
  var getKClass = kotlin_kotlin.$_$.f;
  var Pair = kotlin_kotlin.$_$.fg;
  var Entry = kotlin_kotlin.$_$.n5;
  var KtMutableMap = kotlin_kotlin.$_$.q5;
  var LinkedHashMap = kotlin_kotlin.$_$.k5;
  var HashMap = kotlin_kotlin.$_$.i5;
  var KtSet = kotlin_kotlin.$_$.s5;
  var KtMutableSet = kotlin_kotlin.$_$.r5;
  var LinkedHashSet = kotlin_kotlin.$_$.l5;
  var HashSet = kotlin_kotlin.$_$.j5;
  var Collection = kotlin_kotlin.$_$.h5;
  var KtList = kotlin_kotlin.$_$.m5;
  var KtMutableList = kotlin_kotlin.$_$.p5;
  var ArrayList = kotlin_kotlin.$_$.g5;
  var copyToArray = kotlin_kotlin.$_$.p6;
  var _Result___get_value__impl__bjfvqg = kotlin_kotlin.$_$.z2;
  var _Result___get_isFailure__impl__jpiriv = kotlin_kotlin.$_$.y2;
  var Result = kotlin_kotlin.$_$.gg;
  var ensureNotNull = kotlin_kotlin.$_$.ah;
  var equals = kotlin_kotlin.$_$.qa;
  var getStringHashCode = kotlin_kotlin.$_$.va;
  var isBlank = kotlin_kotlin.$_$.td;
  var toList = kotlin_kotlin.$_$.x8;
  var ArrayList_init_$Create$_0 = kotlin_kotlin.$_$.p;
  var HashSet_init_$Create$ = kotlin_kotlin.$_$.v;
  var toHashSet = kotlin_kotlin.$_$.u8;
  var toBooleanArray = kotlin_kotlin.$_$.t8;
  var withIndex = kotlin_kotlin.$_$.e9;
  var to = kotlin_kotlin.$_$.mh;
  var lazy_0 = kotlin_kotlin.$_$.gh;
  var contentEquals = kotlin_kotlin.$_$.d6;
  var until = kotlin_kotlin.$_$.uc;
  var joinToString = kotlin_kotlin.$_$.h7;
  var initMetadataForObject = kotlin_kotlin.$_$.db;
  var Long = kotlin_kotlin.$_$.dg;
  var Char = kotlin_kotlin.$_$.tf;
  var Duration__toIsoString_impl_9h6wsm = kotlin_kotlin.$_$.n2;
  var Duration = kotlin_kotlin.$_$.qf;
  var Companion_getInstance = kotlin_kotlin.$_$.w4;
  var Uuid = kotlin_kotlin.$_$.rf;
  var Companion_getInstance_0 = kotlin_kotlin.$_$.x4;
  var toIntOrNull = kotlin_kotlin.$_$.xe;
  var hashCode = kotlin_kotlin.$_$.wa;
  var ArrayList_init_$Create$_1 = kotlin_kotlin.$_$.q;
  var HashSet_init_$Create$_0 = kotlin_kotlin.$_$.w;
  var LinkedHashSet_init_$Create$ = kotlin_kotlin.$_$.a1;
  var LinkedHashSet_init_$Create$_0 = kotlin_kotlin.$_$.b1;
  var HashMap_init_$Create$ = kotlin_kotlin.$_$.s;
  var HashMap_init_$Create$_0 = kotlin_kotlin.$_$.t;
  var LinkedHashMap_init_$Create$_1 = kotlin_kotlin.$_$.z;
  var isArray = kotlin_kotlin.$_$.eb;
  var arrayIterator = kotlin_kotlin.$_$.ga;
  var asList = kotlin_kotlin.$_$.v5;
  var step = kotlin_kotlin.$_$.tc;
  var getValue = kotlin_kotlin.$_$.c7;
  var longArray = kotlin_kotlin.$_$.tb;
  var initMetadataForCompanion = kotlin_kotlin.$_$.ya;
  var get_lastIndex = kotlin_kotlin.$_$.j7;
  var countTrailingZeroBits = kotlin_kotlin.$_$.yg;
  var getOrNull = kotlin_kotlin.$_$.a7;
  var indexOf = kotlin_kotlin.$_$.d7;
  var contentToString = kotlin_kotlin.$_$.f6;
  var Enum = kotlin_kotlin.$_$.yf;
  var HashSet_init_$Create$_1 = kotlin_kotlin.$_$.u;
  var toString_0 = kotlin_kotlin.$_$.lh;
  var KTypeParameter = kotlin_kotlin.$_$.ad;
  var contentHashCode = kotlin_kotlin.$_$.e6;
  var booleanArray = kotlin_kotlin.$_$.ha;
  var emptyMap = kotlin_kotlin.$_$.u6;
  var Companion_getInstance_1 = kotlin_kotlin.$_$.y4;
  var isCharArray = kotlin_kotlin.$_$.hb;
  var charArray = kotlin_kotlin.$_$.ka;
  var DoubleCompanionObject_instance = kotlin_kotlin.$_$.o4;
  var isDoubleArray = kotlin_kotlin.$_$.jb;
  var FloatCompanionObject_instance = kotlin_kotlin.$_$.p4;
  var isFloatArray = kotlin_kotlin.$_$.kb;
  var Companion_getInstance_2 = kotlin_kotlin.$_$.z4;
  var isLongArray = kotlin_kotlin.$_$.nb;
  var Companion_getInstance_3 = kotlin_kotlin.$_$.d5;
  var _ULongArray___get_size__impl__ju6dtr = kotlin_kotlin.$_$.z3;
  var ULongArray = kotlin_kotlin.$_$.pg;
  var _ULongArray___init__impl__twm1l3 = kotlin_kotlin.$_$.v3;
  var _ULong___init__impl__c78o9k = kotlin_kotlin.$_$.s3;
  var ULongArray__get_impl_pr71q9 = kotlin_kotlin.$_$.x3;
  var _ULong___get_data__impl__fggpzb = kotlin_kotlin.$_$.t3;
  var IntCompanionObject_instance = kotlin_kotlin.$_$.q4;
  var isIntArray = kotlin_kotlin.$_$.lb;
  var Companion_getInstance_4 = kotlin_kotlin.$_$.c5;
  var _UIntArray___get_size__impl__r6l8ci = kotlin_kotlin.$_$.q3;
  var UIntArray = kotlin_kotlin.$_$.ng;
  var _UIntArray___init__impl__ghjpc6 = kotlin_kotlin.$_$.m3;
  var _UInt___init__impl__l7qpdl = kotlin_kotlin.$_$.j3;
  var UIntArray__get_impl_gp5kza = kotlin_kotlin.$_$.o3;
  var _UInt___get_data__impl__f0vqqw = kotlin_kotlin.$_$.k3;
  var ShortCompanionObject_instance = kotlin_kotlin.$_$.r4;
  var isShortArray = kotlin_kotlin.$_$.pb;
  var Companion_getInstance_5 = kotlin_kotlin.$_$.e5;
  var _UShortArray___get_size__impl__jqto1b = kotlin_kotlin.$_$.i4;
  var UShortArray = kotlin_kotlin.$_$.rg;
  var _UShortArray___init__impl__9b26ef = kotlin_kotlin.$_$.e4;
  var _UShort___init__impl__jigrne = kotlin_kotlin.$_$.b4;
  var UShortArray__get_impl_fnbhmx = kotlin_kotlin.$_$.g4;
  var _UShort___get_data__impl__g0245 = kotlin_kotlin.$_$.c4;
  var ByteCompanionObject_instance = kotlin_kotlin.$_$.n4;
  var isByteArray = kotlin_kotlin.$_$.gb;
  var Companion_getInstance_6 = kotlin_kotlin.$_$.b5;
  var _UByteArray___get_size__impl__h6pkdv = kotlin_kotlin.$_$.h3;
  var UByteArray = kotlin_kotlin.$_$.lg;
  var _UByteArray___init__impl__ip4y9n = kotlin_kotlin.$_$.e3;
  var _UByte___init__impl__g9hnc4 = kotlin_kotlin.$_$.a3;
  var UByteArray__get_impl_t5f3hv = kotlin_kotlin.$_$.f3;
  var _UByte___get_data__impl__jof9qr = kotlin_kotlin.$_$.b3;
  var BooleanCompanionObject_instance = kotlin_kotlin.$_$.m4;
  var isBooleanArray = kotlin_kotlin.$_$.fb;
  var coerceAtLeast = kotlin_kotlin.$_$.lc;
  var copyOf = kotlin_kotlin.$_$.j6;
  var copyOf_0 = kotlin_kotlin.$_$.l6;
  var copyOf_1 = kotlin_kotlin.$_$.m6;
  var copyOf_2 = kotlin_kotlin.$_$.h6;
  var _ULongArray___get_storage__impl__28e64j = kotlin_kotlin.$_$.a4;
  var _ULongArray___init__impl__twm1l3_0 = kotlin_kotlin.$_$.w3;
  var ULongArray__set_impl_z19mvh = kotlin_kotlin.$_$.y3;
  var copyOf_3 = kotlin_kotlin.$_$.o6;
  var _UIntArray___get_storage__impl__92a0v0 = kotlin_kotlin.$_$.r3;
  var _UIntArray___init__impl__ghjpc6_0 = kotlin_kotlin.$_$.n3;
  var UIntArray__set_impl_7f2zu2 = kotlin_kotlin.$_$.p3;
  var copyOf_4 = kotlin_kotlin.$_$.g6;
  var _UShortArray___get_storage__impl__t2jpv5 = kotlin_kotlin.$_$.j4;
  var _UShortArray___init__impl__9b26ef_0 = kotlin_kotlin.$_$.f4;
  var UShortArray__set_impl_6d8whp = kotlin_kotlin.$_$.h4;
  var copyOf_5 = kotlin_kotlin.$_$.k6;
  var _UByteArray___get_storage__impl__d4kctt = kotlin_kotlin.$_$.i3;
  var _UByteArray___init__impl__ip4y9n_0 = kotlin_kotlin.$_$.d3;
  var UByteArray__set_impl_jvcicn = kotlin_kotlin.$_$.g3;
  var copyOf_6 = kotlin_kotlin.$_$.i6;
  var Unit = kotlin_kotlin.$_$.tg;
  var trimIndent = kotlin_kotlin.$_$.kf;
  var charSequenceLength = kotlin_kotlin.$_$.ma;
  var last = kotlin_kotlin.$_$.m7;
  var lastOrNull = kotlin_kotlin.$_$.l7;
  var get_lastIndex_0 = kotlin_kotlin.$_$.k7;
  var ULong = kotlin_kotlin.$_$.qg;
  var UInt = kotlin_kotlin.$_$.og;
  var UShort = kotlin_kotlin.$_$.sg;
  var UByte = kotlin_kotlin.$_$.mg;
  var noWhenBranchMatchedException = kotlin_kotlin.$_$.hh;
  var PrimitiveClasses_getInstance = kotlin_kotlin.$_$.u4;
  var mapOf = kotlin_kotlin.$_$.t7;
  var get_js = kotlin_kotlin.$_$.rb;
  var findAssociatedObject = kotlin_kotlin.$_$.d;
  var get_indices = kotlin_kotlin.$_$.f7;
  var IndexOutOfBoundsException_init_$Create$ = kotlin_kotlin.$_$.b2;
  var get_indices_0 = kotlin_kotlin.$_$.e7;
  var Companion_instance = kotlin_kotlin.$_$.a5;
  var _Result___init__impl__xyqfz8 = kotlin_kotlin.$_$.w2;
  var createFailure = kotlin_kotlin.$_$.zg;
  //endregion
  //region block: pre-declaration
  initMetadataForInterface(SerializationStrategy, 'SerializationStrategy');
  initMetadataForInterface(DeserializationStrategy, 'DeserializationStrategy');
  initMetadataForInterface(KSerializer, 'KSerializer', VOID, VOID, [SerializationStrategy, DeserializationStrategy]);
  initMetadataForClass(AbstractPolymorphicSerializer, 'AbstractPolymorphicSerializer', VOID, VOID, [KSerializer]);
  initMetadataForClass(PolymorphicSerializer, 'PolymorphicSerializer', VOID, AbstractPolymorphicSerializer);
  initMetadataForClass(SealedClassSerializer$$inlined$groupingBy$1);
  initMetadataForClass(SealedClassSerializer, 'SealedClassSerializer', VOID, AbstractPolymorphicSerializer);
  initMetadataForClass(SerializationException, 'SerializationException', SerializationException_init_$Create$, IllegalArgumentException);
  initMetadataForClass(UnknownFieldException, 'UnknownFieldException', VOID, SerializationException);
  initMetadataForClass(MissingFieldException, 'MissingFieldException', VOID, SerializationException);
  function get_isNullable() {
    return false;
  }
  function get_isInline() {
    return false;
  }
  function get_annotations() {
    return emptyList();
  }
  initMetadataForInterface(SerialDescriptor, 'SerialDescriptor');
  initMetadataForClass(ContextDescriptor, 'ContextDescriptor', VOID, VOID, [SerialDescriptor]);
  initMetadataForClass(elementDescriptors$1);
  initMetadataForClass(elementDescriptors$$inlined$Iterable$1);
  initMetadataForClass(elementNames$1);
  initMetadataForClass(elementNames$$inlined$Iterable$1);
  initMetadataForClass(ClassSerialDescriptorBuilder, 'ClassSerialDescriptorBuilder');
  initMetadataForInterface(CachedNames, 'CachedNames');
  initMetadataForClass(SerialDescriptorImpl, 'SerialDescriptorImpl', VOID, VOID, [SerialDescriptor, CachedNames]);
  initMetadataForClass(SerialKind, 'SerialKind');
  initMetadataForObject(ENUM, 'ENUM', VOID, SerialKind);
  initMetadataForObject(CONTEXTUAL, 'CONTEXTUAL', VOID, SerialKind);
  initMetadataForClass(PolymorphicKind, 'PolymorphicKind', VOID, SerialKind);
  initMetadataForObject(SEALED, 'SEALED', VOID, PolymorphicKind);
  initMetadataForObject(OPEN, 'OPEN', VOID, PolymorphicKind);
  initMetadataForClass(PrimitiveKind, 'PrimitiveKind', VOID, SerialKind);
  initMetadataForObject(BOOLEAN, 'BOOLEAN', VOID, PrimitiveKind);
  initMetadataForObject(BYTE, 'BYTE', VOID, PrimitiveKind);
  initMetadataForObject(CHAR, 'CHAR', VOID, PrimitiveKind);
  initMetadataForObject(SHORT, 'SHORT', VOID, PrimitiveKind);
  initMetadataForObject(INT, 'INT', VOID, PrimitiveKind);
  initMetadataForObject(LONG, 'LONG', VOID, PrimitiveKind);
  initMetadataForObject(FLOAT, 'FLOAT', VOID, PrimitiveKind);
  initMetadataForObject(DOUBLE, 'DOUBLE', VOID, PrimitiveKind);
  initMetadataForObject(STRING, 'STRING', VOID, PrimitiveKind);
  initMetadataForClass(StructureKind, 'StructureKind', VOID, SerialKind);
  initMetadataForObject(CLASS, 'CLASS', VOID, StructureKind);
  initMetadataForObject(LIST, 'LIST', VOID, StructureKind);
  initMetadataForObject(MAP, 'MAP', VOID, StructureKind);
  initMetadataForObject(OBJECT, 'OBJECT', VOID, StructureKind);
  function decodeSerializableValue(deserializer) {
    return deserializer.y1k(this);
  }
  initMetadataForInterface(Decoder, 'Decoder');
  function decodeSequentially() {
    return false;
  }
  function decodeCollectionSize(descriptor) {
    return -1;
  }
  function decodeSerializableElement$default(descriptor, index, deserializer, previousValue, $super) {
    previousValue = previousValue === VOID ? null : previousValue;
    return $super === VOID ? this.r1o(descriptor, index, deserializer, previousValue) : $super.r1o.call(this, descriptor, index, deserializer, previousValue);
  }
  initMetadataForInterface(CompositeDecoder, 'CompositeDecoder');
  initMetadataForClass(AbstractDecoder, 'AbstractDecoder', VOID, VOID, [Decoder, CompositeDecoder]);
  function encodeNotNullMark() {
  }
  function beginCollection(descriptor, collectionSize) {
    return this.f1o(descriptor);
  }
  function encodeSerializableValue(serializer, value) {
    serializer.x1k(this, value);
  }
  function encodeNullableSerializableValue(serializer, value) {
    var isNullabilitySupported = serializer.w1k().f1m();
    if (isNullabilitySupported) {
      return this.x1p(isInterface(serializer, SerializationStrategy) ? serializer : THROW_CCE(), value);
    }
    if (value == null) {
      this.a1p();
    } else {
      this.a1q();
      this.x1p(serializer, value);
    }
  }
  initMetadataForInterface(Encoder, 'Encoder');
  function shouldEncodeElementDefault(descriptor, index) {
    return true;
  }
  initMetadataForInterface(CompositeEncoder, 'CompositeEncoder');
  initMetadataForClass(AbstractEncoder, 'AbstractEncoder', VOID, VOID, [Encoder, CompositeEncoder]);
  initMetadataForObject(NothingSerializer_0, 'NothingSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(DurationSerializer, 'DurationSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(UuidSerializer, 'UuidSerializer', VOID, VOID, [KSerializer]);
  initMetadataForClass(ListLikeDescriptor, 'ListLikeDescriptor', VOID, VOID, [SerialDescriptor]);
  initMetadataForClass(ArrayListClassDesc, 'ArrayListClassDesc', VOID, ListLikeDescriptor);
  initMetadataForClass(HashSetClassDesc, 'HashSetClassDesc', VOID, ListLikeDescriptor);
  initMetadataForClass(LinkedHashSetClassDesc, 'LinkedHashSetClassDesc', VOID, ListLikeDescriptor);
  initMetadataForClass(MapLikeDescriptor, 'MapLikeDescriptor', VOID, VOID, [SerialDescriptor]);
  initMetadataForClass(HashMapClassDesc, 'HashMapClassDesc', VOID, MapLikeDescriptor);
  initMetadataForClass(LinkedHashMapClassDesc, 'LinkedHashMapClassDesc', VOID, MapLikeDescriptor);
  initMetadataForClass(ArrayClassDesc, 'ArrayClassDesc', VOID, ListLikeDescriptor);
  initMetadataForClass(PrimitiveArrayDescriptor, 'PrimitiveArrayDescriptor', VOID, ListLikeDescriptor);
  initMetadataForClass(AbstractCollectionSerializer, 'AbstractCollectionSerializer', VOID, VOID, [KSerializer]);
  initMetadataForClass(CollectionLikeSerializer, 'CollectionLikeSerializer', VOID, AbstractCollectionSerializer);
  initMetadataForClass(CollectionSerializer, 'CollectionSerializer', VOID, CollectionLikeSerializer);
  initMetadataForClass(ArrayListSerializer, 'ArrayListSerializer', VOID, CollectionSerializer);
  initMetadataForClass(HashSetSerializer, 'HashSetSerializer', VOID, CollectionSerializer);
  initMetadataForClass(LinkedHashSetSerializer, 'LinkedHashSetSerializer', VOID, CollectionSerializer);
  initMetadataForClass(MapLikeSerializer, 'MapLikeSerializer', VOID, AbstractCollectionSerializer);
  initMetadataForClass(HashMapSerializer, 'HashMapSerializer', VOID, MapLikeSerializer);
  initMetadataForClass(LinkedHashMapSerializer, 'LinkedHashMapSerializer', VOID, MapLikeSerializer);
  initMetadataForClass(ReferenceArraySerializer, 'ReferenceArraySerializer', VOID, CollectionLikeSerializer);
  initMetadataForClass(PrimitiveArraySerializer, 'PrimitiveArraySerializer', VOID, CollectionLikeSerializer);
  initMetadataForClass(PrimitiveArrayBuilder, 'PrimitiveArrayBuilder');
  initMetadataForCompanion(Companion);
  initMetadataForClass(ElementMarker, 'ElementMarker');
  initMetadataForClass(EnumSerializer, 'EnumSerializer', VOID, VOID, [KSerializer]);
  initMetadataForClass(PluginGeneratedSerialDescriptor, 'PluginGeneratedSerialDescriptor', VOID, VOID, [SerialDescriptor, CachedNames]);
  initMetadataForClass(EnumDescriptor, 'EnumDescriptor', VOID, PluginGeneratedSerialDescriptor);
  initMetadataForClass(InlineClassDescriptor, 'InlineClassDescriptor', VOID, PluginGeneratedSerialDescriptor);
  function typeParametersSerializers() {
    return get_EMPTY_SERIALIZER_ARRAY();
  }
  initMetadataForInterface(GeneratedSerializer, 'GeneratedSerializer', VOID, VOID, [KSerializer]);
  initMetadataForClass(InlinePrimitiveDescriptor$1, VOID, VOID, VOID, [GeneratedSerializer]);
  initMetadataForObject(NoOpEncoder, 'NoOpEncoder', VOID, AbstractEncoder);
  initMetadataForObject(NothingSerialDescriptor, 'NothingSerialDescriptor', VOID, VOID, [SerialDescriptor]);
  initMetadataForClass(NullableSerializer, 'NullableSerializer', VOID, VOID, [KSerializer]);
  initMetadataForClass(SerialDescriptorForNullable, 'SerialDescriptorForNullable', VOID, VOID, [SerialDescriptor, CachedNames]);
  initMetadataForClass(ObjectSerializer, 'ObjectSerializer', VOID, VOID, [KSerializer]);
  initMetadataForInterface(SerializerFactory, 'SerializerFactory');
  initMetadataForObject(CharArraySerializer_0, 'CharArraySerializer', VOID, PrimitiveArraySerializer, [KSerializer, PrimitiveArraySerializer]);
  initMetadataForObject(DoubleArraySerializer_0, 'DoubleArraySerializer', VOID, PrimitiveArraySerializer, [KSerializer, PrimitiveArraySerializer]);
  initMetadataForObject(FloatArraySerializer_0, 'FloatArraySerializer', VOID, PrimitiveArraySerializer, [KSerializer, PrimitiveArraySerializer]);
  initMetadataForObject(LongArraySerializer_0, 'LongArraySerializer', VOID, PrimitiveArraySerializer, [KSerializer, PrimitiveArraySerializer]);
  initMetadataForObject(ULongArraySerializer_0, 'ULongArraySerializer', VOID, PrimitiveArraySerializer, [KSerializer, PrimitiveArraySerializer]);
  initMetadataForObject(IntArraySerializer_0, 'IntArraySerializer', VOID, PrimitiveArraySerializer, [KSerializer, PrimitiveArraySerializer]);
  initMetadataForObject(UIntArraySerializer_0, 'UIntArraySerializer', VOID, PrimitiveArraySerializer, [KSerializer, PrimitiveArraySerializer]);
  initMetadataForObject(ShortArraySerializer_0, 'ShortArraySerializer', VOID, PrimitiveArraySerializer, [KSerializer, PrimitiveArraySerializer]);
  initMetadataForObject(UShortArraySerializer_0, 'UShortArraySerializer', VOID, PrimitiveArraySerializer, [KSerializer, PrimitiveArraySerializer]);
  initMetadataForObject(ByteArraySerializer_0, 'ByteArraySerializer', VOID, PrimitiveArraySerializer, [KSerializer, PrimitiveArraySerializer]);
  initMetadataForObject(UByteArraySerializer_0, 'UByteArraySerializer', VOID, PrimitiveArraySerializer, [KSerializer, PrimitiveArraySerializer]);
  initMetadataForObject(BooleanArraySerializer_0, 'BooleanArraySerializer', VOID, PrimitiveArraySerializer, [KSerializer, PrimitiveArraySerializer]);
  initMetadataForClass(CharArrayBuilder, 'CharArrayBuilder', VOID, PrimitiveArrayBuilder);
  initMetadataForClass(DoubleArrayBuilder, 'DoubleArrayBuilder', VOID, PrimitiveArrayBuilder);
  initMetadataForClass(FloatArrayBuilder, 'FloatArrayBuilder', VOID, PrimitiveArrayBuilder);
  initMetadataForClass(LongArrayBuilder, 'LongArrayBuilder', VOID, PrimitiveArrayBuilder);
  initMetadataForClass(ULongArrayBuilder, 'ULongArrayBuilder', VOID, PrimitiveArrayBuilder);
  initMetadataForClass(IntArrayBuilder, 'IntArrayBuilder', VOID, PrimitiveArrayBuilder);
  initMetadataForClass(UIntArrayBuilder, 'UIntArrayBuilder', VOID, PrimitiveArrayBuilder);
  initMetadataForClass(ShortArrayBuilder, 'ShortArrayBuilder', VOID, PrimitiveArrayBuilder);
  initMetadataForClass(UShortArrayBuilder, 'UShortArrayBuilder', VOID, PrimitiveArrayBuilder);
  initMetadataForClass(ByteArrayBuilder, 'ByteArrayBuilder', VOID, PrimitiveArrayBuilder);
  initMetadataForClass(UByteArrayBuilder, 'UByteArrayBuilder', VOID, PrimitiveArrayBuilder);
  initMetadataForClass(BooleanArrayBuilder, 'BooleanArrayBuilder', VOID, PrimitiveArrayBuilder);
  initMetadataForObject(StringSerializer, 'StringSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(CharSerializer, 'CharSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(DoubleSerializer, 'DoubleSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(FloatSerializer, 'FloatSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(LongSerializer, 'LongSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(IntSerializer, 'IntSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(ShortSerializer, 'ShortSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(ByteSerializer, 'ByteSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(BooleanSerializer, 'BooleanSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(UnitSerializer, 'UnitSerializer', VOID, VOID, [KSerializer]);
  initMetadataForClass(PrimitiveSerialDescriptor_0, 'PrimitiveSerialDescriptor', VOID, VOID, [SerialDescriptor]);
  initMetadataForClass(TaggedEncoder, 'TaggedEncoder', VOID, VOID, [Encoder, CompositeEncoder]);
  initMetadataForClass(NamedValueEncoder, 'NamedValueEncoder', VOID, TaggedEncoder);
  initMetadataForClass(TaggedDecoder, 'TaggedDecoder', VOID, VOID, [Decoder, CompositeDecoder]);
  initMetadataForClass(NamedValueDecoder, 'NamedValueDecoder', VOID, TaggedDecoder);
  initMetadataForClass(MapEntry, 'MapEntry', VOID, VOID, [Entry]);
  initMetadataForClass(KeyValueSerializer, 'KeyValueSerializer', VOID, VOID, [KSerializer]);
  initMetadataForClass(MapEntrySerializer_0, 'MapEntrySerializer', VOID, KeyValueSerializer);
  initMetadataForClass(PairSerializer_0, 'PairSerializer', VOID, KeyValueSerializer);
  initMetadataForClass(TripleSerializer_0, 'TripleSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(ULongSerializer, 'ULongSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(UIntSerializer, 'UIntSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(UShortSerializer, 'UShortSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(UByteSerializer, 'UByteSerializer', VOID, VOID, [KSerializer]);
  initMetadataForClass(SerializersModule, 'SerializersModule');
  initMetadataForClass(SerialModuleImpl, 'SerialModuleImpl', VOID, SerializersModule);
  initMetadataForClass(ContextualProvider, 'ContextualProvider');
  initMetadataForClass(Argless, 'Argless', VOID, ContextualProvider);
  initMetadataForClass(WithTypeArguments, 'WithTypeArguments', VOID, ContextualProvider);
  function contextual(kClass, serializer) {
    return this.p25(kClass, SerializersModuleCollector$contextual$lambda(serializer));
  }
  initMetadataForInterface(SerializersModuleCollector, 'SerializersModuleCollector');
  initMetadataForClass(SerializableWith, 'SerializableWith', VOID, VOID, VOID, VOID, 0);
  initMetadataForClass(createCache$1);
  initMetadataForClass(createParametrizedCache$1);
  //endregion
  function KSerializer() {
  }
  function SerializationStrategy() {
  }
  function DeserializationStrategy() {
  }
  function PolymorphicSerializer$descriptor$delegate$lambda$lambda(this$0) {
    return function ($this$buildSerialDescriptor) {
      $this$buildSerialDescriptor.h1l('type', serializer_1(StringCompanionObject_instance).w1k());
      $this$buildSerialDescriptor.h1l('value', buildSerialDescriptor('kotlinx.serialization.Polymorphic<' + this$0.i1l_1.za() + '>', CONTEXTUAL_getInstance(), []));
      $this$buildSerialDescriptor.b1l_1 = this$0.j1l_1;
      return Unit_instance;
    };
  }
  function PolymorphicSerializer$descriptor$delegate$lambda(this$0) {
    return function () {
      var tmp = OPEN_getInstance();
      return withContext(buildSerialDescriptor('kotlinx.serialization.Polymorphic', tmp, [], PolymorphicSerializer$descriptor$delegate$lambda$lambda(this$0)), this$0.i1l_1);
    };
  }
  function PolymorphicSerializer(baseClass) {
    AbstractPolymorphicSerializer.call(this);
    this.i1l_1 = baseClass;
    this.j1l_1 = emptyList();
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp.k1l_1 = lazy(tmp_0, PolymorphicSerializer$descriptor$delegate$lambda(this));
  }
  protoOf(PolymorphicSerializer).l1l = function () {
    return this.i1l_1;
  };
  protoOf(PolymorphicSerializer).w1k = function () {
    var tmp0 = this.k1l_1;
    // Inline function 'kotlin.getValue' call
    descriptor$factory();
    return tmp0.w();
  };
  protoOf(PolymorphicSerializer).toString = function () {
    return 'kotlinx.serialization.PolymorphicSerializer(baseClass: ' + toString(this.i1l_1) + ')';
  };
  function findPolymorphicSerializer(_this__u8e3s4, encoder, value) {
    var tmp0_elvis_lhs = _this__u8e3s4.o1l(encoder, value);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throwSubtypeNotRegistered(getKClassFromExpression(value), _this__u8e3s4.l1l());
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function findPolymorphicSerializer_0(_this__u8e3s4, decoder, klassName) {
    var tmp0_elvis_lhs = _this__u8e3s4.n1l(decoder, klassName);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throwSubtypeNotRegistered_0(klassName, _this__u8e3s4.l1l());
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function descriptor$factory() {
    return getPropertyCallableRef('descriptor', 1, KProperty1, function (receiver) {
      return receiver.w1k();
    }, null);
  }
  function SealedClassSerializer$descriptor$delegate$lambda$lambda$lambda(this$0) {
    return function ($this$buildSerialDescriptor) {
      // Inline function 'kotlin.collections.forEach' call
      // Inline function 'kotlin.collections.iterator' call
      var _iterator__ex2g4s = this$0.t1l_1.u().j();
      while (_iterator__ex2g4s.k()) {
        var element = _iterator__ex2g4s.l();
        // Inline function 'kotlin.collections.component1' call
        var name = element.v();
        // Inline function 'kotlin.collections.component2' call
        var serializer = element.w();
        $this$buildSerialDescriptor.h1l(name, serializer.w1k());
      }
      return Unit_instance;
    };
  }
  function SealedClassSerializer$descriptor$delegate$lambda$lambda(this$0) {
    return function ($this$buildSerialDescriptor) {
      $this$buildSerialDescriptor.h1l('type', serializer_1(StringCompanionObject_instance).w1k());
      var tmp = 'kotlinx.serialization.Sealed<' + this$0.p1l_1.za() + '>';
      var tmp_0 = CONTEXTUAL_getInstance();
      var elementDescriptor = buildSerialDescriptor(tmp, tmp_0, [], SealedClassSerializer$descriptor$delegate$lambda$lambda$lambda(this$0));
      $this$buildSerialDescriptor.h1l('value', elementDescriptor);
      $this$buildSerialDescriptor.b1l_1 = this$0.q1l_1;
      return Unit_instance;
    };
  }
  function SealedClassSerializer$descriptor$delegate$lambda($serialName, this$0) {
    return function () {
      var tmp = SEALED_getInstance();
      return buildSerialDescriptor($serialName, tmp, [], SealedClassSerializer$descriptor$delegate$lambda$lambda(this$0));
    };
  }
  function SealedClassSerializer$$inlined$groupingBy$1($this) {
    this.u1l_1 = $this;
  }
  protoOf(SealedClassSerializer$$inlined$groupingBy$1).v1l = function () {
    return this.u1l_1.j();
  };
  protoOf(SealedClassSerializer$$inlined$groupingBy$1).w1l = function (element) {
    return element.w().w1k().x1l();
  };
  protoOf(SealedClassSerializer$$inlined$groupingBy$1).y1l = function (element) {
    return this.w1l((element == null ? true : !(element == null)) ? element : THROW_CCE());
  };
  function SealedClassSerializer(serialName, baseClass, subclasses, subclassSerializers) {
    AbstractPolymorphicSerializer.call(this);
    this.p1l_1 = baseClass;
    this.q1l_1 = emptyList();
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp.r1l_1 = lazy(tmp_0, SealedClassSerializer$descriptor$delegate$lambda(serialName, this));
    if (!(subclasses.length === subclassSerializers.length)) {
      throw IllegalArgumentException_init_$Create$('All subclasses of sealed class ' + this.p1l_1.za() + ' should be marked @Serializable');
    }
    this.s1l_1 = toMap(zip(subclasses, subclassSerializers));
    var tmp_1 = this;
    // Inline function 'kotlin.collections.groupingBy' call
    var this_0 = this.s1l_1.u();
    // Inline function 'kotlin.collections.aggregate' call
    var tmp0 = new SealedClassSerializer$$inlined$groupingBy$1(this_0);
    // Inline function 'kotlin.collections.mutableMapOf' call
    // Inline function 'kotlin.collections.aggregateTo' call
    var destination = LinkedHashMap_init_$Create$();
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s = tmp0.v1l();
    while (_iterator__ex2g4s.k()) {
      var e = _iterator__ex2g4s.l();
      var key = tmp0.y1l(e);
      var accumulator = destination.h2(key);
      accumulator == null && !destination.f2(key);
      if (!(accumulator == null)) {
        // Inline function 'kotlin.error' call
        var message = "Multiple sealed subclasses of '" + toString(this.p1l_1) + "' have the same serial name '" + key + "':" + (" '" + toString(accumulator.v()) + "', '" + toString(e.v()) + "'");
        throw IllegalStateException_init_$Create$(toString(message));
      }
      // Inline function 'kotlin.collections.set' call
      destination.k2(key, e);
    }
    // Inline function 'kotlin.collections.mapValues' call
    // Inline function 'kotlin.collections.mapValuesTo' call
    var destination_0 = LinkedHashMap_init_$Create$_0(mapCapacity(destination.m()));
    // Inline function 'kotlin.collections.associateByTo' call
    var _iterator__ex2g4s_0 = destination.u().j();
    while (_iterator__ex2g4s_0.k()) {
      var element = _iterator__ex2g4s_0.l();
      var tmp_2 = element.v();
      var tmp$ret$8 = element.w().w();
      destination_0.k2(tmp_2, tmp$ret$8);
    }
    tmp_1.t1l_1 = destination_0;
  }
  protoOf(SealedClassSerializer).l1l = function () {
    return this.p1l_1;
  };
  protoOf(SealedClassSerializer).w1k = function () {
    var tmp0 = this.r1l_1;
    // Inline function 'kotlin.getValue' call
    descriptor$factory_0();
    return tmp0.w();
  };
  protoOf(SealedClassSerializer).n1l = function (decoder, klassName) {
    // Inline function 'kotlin.collections.get' call
    var this_0 = this.t1l_1;
    var tmp0_elvis_lhs = (isInterface(this_0, KtMap) ? this_0 : THROW_CCE()).h2(klassName);
    return tmp0_elvis_lhs == null ? protoOf(AbstractPolymorphicSerializer).n1l.call(this, decoder, klassName) : tmp0_elvis_lhs;
  };
  protoOf(SealedClassSerializer).o1l = function (encoder, value) {
    var tmp0_elvis_lhs = this.s1l_1.h2(getKClassFromExpression(value));
    var tmp1_safe_receiver = tmp0_elvis_lhs == null ? protoOf(AbstractPolymorphicSerializer).o1l.call(this, encoder, value) : tmp0_elvis_lhs;
    var tmp;
    if (tmp1_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlinx.serialization.internal.cast' call
      tmp = isInterface(tmp1_safe_receiver, SerializationStrategy) ? tmp1_safe_receiver : THROW_CCE();
    }
    return tmp;
  };
  function descriptor$factory_0() {
    return getPropertyCallableRef('descriptor', 1, KProperty1, function (receiver) {
      return receiver.w1k();
    }, null);
  }
  function SerializationException_init_$Init$($this) {
    IllegalArgumentException_init_$Init$($this);
    SerializationException.call($this);
    return $this;
  }
  function SerializationException_init_$Create$() {
    var tmp = SerializationException_init_$Init$(objectCreate(protoOf(SerializationException)));
    captureStack(tmp, SerializationException_init_$Create$);
    return tmp;
  }
  function SerializationException_init_$Init$_0(message, $this) {
    IllegalArgumentException_init_$Init$_0(message, $this);
    SerializationException.call($this);
    return $this;
  }
  function SerializationException_init_$Create$_0(message) {
    var tmp = SerializationException_init_$Init$_0(message, objectCreate(protoOf(SerializationException)));
    captureStack(tmp, SerializationException_init_$Create$_0);
    return tmp;
  }
  function SerializationException_init_$Init$_1(message, cause, $this) {
    IllegalArgumentException_init_$Init$_1(message, cause, $this);
    SerializationException.call($this);
    return $this;
  }
  function SerializationException() {
    captureStack(this, SerializationException);
  }
  function UnknownFieldException_init_$Init$(index, $this) {
    UnknownFieldException.call($this, 'An unknown field for index ' + index);
    return $this;
  }
  function UnknownFieldException_init_$Create$(index) {
    var tmp = UnknownFieldException_init_$Init$(index, objectCreate(protoOf(UnknownFieldException)));
    captureStack(tmp, UnknownFieldException_init_$Create$);
    return tmp;
  }
  function UnknownFieldException(message) {
    SerializationException_init_$Init$_0(message, this);
    captureStack(this, UnknownFieldException);
  }
  function MissingFieldException_init_$Init$(missingFields, serialName, $this) {
    MissingFieldException.call($this, missingFields, missingFields.m() === 1 ? "Field '" + missingFields.o(0) + "' is required for type with serial name '" + serialName + "', but it was missing" : 'Fields ' + toString(missingFields) + " are required for type with serial name '" + serialName + "', but they were missing", null);
    return $this;
  }
  function MissingFieldException_init_$Create$(missingFields, serialName) {
    var tmp = MissingFieldException_init_$Init$(missingFields, serialName, objectCreate(protoOf(MissingFieldException)));
    captureStack(tmp, MissingFieldException_init_$Create$);
    return tmp;
  }
  function MissingFieldException_init_$Init$_0(missingField, serialName, $this) {
    MissingFieldException.call($this, listOf(missingField), "Field '" + missingField + "' is required for type with serial name '" + serialName + "', but it was missing", null);
    return $this;
  }
  function MissingFieldException_init_$Create$_0(missingField, serialName) {
    var tmp = MissingFieldException_init_$Init$_0(missingField, serialName, objectCreate(protoOf(MissingFieldException)));
    captureStack(tmp, MissingFieldException_init_$Create$_0);
    return tmp;
  }
  function MissingFieldException(missingFields, message, cause) {
    SerializationException_init_$Init$_1(message, cause, this);
    captureStack(this, MissingFieldException);
    this.z1l_1 = missingFields;
  }
  function serializerOrNull(_this__u8e3s4) {
    var tmp0_elvis_lhs = compiledSerializerImpl(_this__u8e3s4);
    return tmp0_elvis_lhs == null ? builtinSerializerOrNull(_this__u8e3s4) : tmp0_elvis_lhs;
  }
  function serializersForParameters(_this__u8e3s4, typeArguments, failOnMissingTypeArgSerializer) {
    var tmp;
    if (failOnMissingTypeArgSerializer) {
      // Inline function 'kotlin.collections.map' call
      // Inline function 'kotlin.collections.mapTo' call
      var destination = ArrayList_init_$Create$(collectionSizeOrDefault(typeArguments, 10));
      var _iterator__ex2g4s = typeArguments.j();
      while (_iterator__ex2g4s.k()) {
        var item = _iterator__ex2g4s.l();
        var tmp$ret$0 = serializer(_this__u8e3s4, item);
        destination.e(tmp$ret$0);
      }
      tmp = destination;
    } else {
      // Inline function 'kotlin.collections.map' call
      // Inline function 'kotlin.collections.mapTo' call
      var destination_0 = ArrayList_init_$Create$(collectionSizeOrDefault(typeArguments, 10));
      var _iterator__ex2g4s_0 = typeArguments.j();
      while (_iterator__ex2g4s_0.k()) {
        var item_0 = _iterator__ex2g4s_0.l();
        var tmp0_elvis_lhs = serializerOrNull_0(_this__u8e3s4, item_0);
        var tmp_0;
        if (tmp0_elvis_lhs == null) {
          return null;
        } else {
          tmp_0 = tmp0_elvis_lhs;
        }
        var tmp$ret$3 = tmp_0;
        destination_0.e(tmp$ret$3);
      }
      tmp = destination_0;
    }
    var serializers = tmp;
    return serializers;
  }
  function parametrizedSerializerOrNull(_this__u8e3s4, serializers, elementClassifierIfArray) {
    var tmp0_elvis_lhs = builtinParametrizedSerializer(_this__u8e3s4, serializers, elementClassifierIfArray);
    return tmp0_elvis_lhs == null ? compiledParametrizedSerializer(_this__u8e3s4, serializers) : tmp0_elvis_lhs;
  }
  function serializer(_this__u8e3s4, type) {
    var tmp0_elvis_lhs = serializerByKTypeImpl(_this__u8e3s4, type, true);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      platformSpecificSerializerNotRegistered(kclass(type));
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function serializerOrNull_0(_this__u8e3s4, type) {
    return serializerByKTypeImpl(_this__u8e3s4, type, false);
  }
  function builtinParametrizedSerializer(_this__u8e3s4, serializers, elementClassifierIfArray) {
    var tmp;
    if (_this__u8e3s4.equals(getKClass(Collection)) || _this__u8e3s4.equals(getKClass(KtList)) || (_this__u8e3s4.equals(getKClass(KtMutableList)) || _this__u8e3s4.equals(getKClass(ArrayList)))) {
      tmp = new ArrayListSerializer(serializers.o(0));
    } else if (_this__u8e3s4.equals(getKClass(HashSet))) {
      tmp = new HashSetSerializer(serializers.o(0));
    } else if (_this__u8e3s4.equals(getKClass(KtSet)) || (_this__u8e3s4.equals(getKClass(KtMutableSet)) || _this__u8e3s4.equals(getKClass(LinkedHashSet)))) {
      tmp = new LinkedHashSetSerializer(serializers.o(0));
    } else if (_this__u8e3s4.equals(getKClass(HashMap))) {
      tmp = new HashMapSerializer(serializers.o(0), serializers.o(1));
    } else if (_this__u8e3s4.equals(getKClass(KtMap)) || (_this__u8e3s4.equals(getKClass(KtMutableMap)) || _this__u8e3s4.equals(getKClass(LinkedHashMap)))) {
      tmp = new LinkedHashMapSerializer(serializers.o(0), serializers.o(1));
    } else if (_this__u8e3s4.equals(getKClass(Entry))) {
      tmp = MapEntrySerializer(serializers.o(0), serializers.o(1));
    } else if (_this__u8e3s4.equals(getKClass(Pair))) {
      tmp = PairSerializer(serializers.o(0), serializers.o(1));
    } else if (_this__u8e3s4.equals(getKClass(Triple))) {
      tmp = TripleSerializer(serializers.o(0), serializers.o(1), serializers.o(2));
    } else {
      var tmp_0;
      if (isReferenceArray(_this__u8e3s4)) {
        var tmp_1 = elementClassifierIfArray();
        tmp_0 = ArraySerializer((!(tmp_1 == null) ? isInterface(tmp_1, KClass) : false) ? tmp_1 : THROW_CCE(), serializers.o(0));
      } else {
        tmp_0 = null;
      }
      tmp = tmp_0;
    }
    return tmp;
  }
  function compiledParametrizedSerializer(_this__u8e3s4, serializers) {
    // Inline function 'kotlin.collections.toTypedArray' call
    var tmp$ret$0 = copyToArray(serializers);
    return constructSerializerForGivenTypeArgs(_this__u8e3s4, tmp$ret$0.slice());
  }
  function serializerByKTypeImpl(_this__u8e3s4, type, failOnMissingTypeArgSerializer) {
    var rootClass = kclass(type);
    var isNullable = type.qb();
    // Inline function 'kotlin.collections.map' call
    var this_0 = type.pb();
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$(collectionSizeOrDefault(this_0, 10));
    var _iterator__ex2g4s = this_0.j();
    while (_iterator__ex2g4s.k()) {
      var item = _iterator__ex2g4s.l();
      var tmp$ret$0 = typeOrThrow(item);
      destination.e(tmp$ret$0);
    }
    var typeArguments = destination;
    var tmp;
    if (typeArguments.p()) {
      var tmp_0;
      if (isInterface_0(rootClass) && !(_this__u8e3s4.b1m(rootClass) == null)) {
        tmp_0 = null;
      } else {
        tmp_0 = findCachedSerializer(rootClass, isNullable);
      }
      tmp = tmp_0;
    } else {
      var tmp_1;
      if (_this__u8e3s4.a1m()) {
        tmp_1 = null;
      } else {
        // Inline function 'kotlin.Result.getOrNull' call
        var this_1 = findParametrizedCachedSerializer(rootClass, typeArguments, isNullable);
        var tmp_2;
        if (_Result___get_isFailure__impl__jpiriv(this_1)) {
          tmp_2 = null;
        } else {
          var tmp_3 = _Result___get_value__impl__bjfvqg(this_1);
          tmp_2 = (tmp_3 == null ? true : !(tmp_3 == null)) ? tmp_3 : THROW_CCE();
        }
        tmp_1 = tmp_2;
      }
      tmp = tmp_1;
    }
    var cachedSerializer = tmp;
    if (!(cachedSerializer == null))
      return cachedSerializer;
    var tmp_4;
    if (typeArguments.p()) {
      var tmp0_elvis_lhs = serializerOrNull(rootClass);
      var tmp1_elvis_lhs = tmp0_elvis_lhs == null ? _this__u8e3s4.b1m(rootClass) : tmp0_elvis_lhs;
      var tmp_5;
      if (tmp1_elvis_lhs == null) {
        // Inline function 'kotlinx.serialization.polymorphicIfInterface' call
        tmp_5 = isInterface_0(rootClass) ? new PolymorphicSerializer(rootClass) : null;
      } else {
        tmp_5 = tmp1_elvis_lhs;
      }
      tmp_4 = tmp_5;
    } else {
      var tmp2_elvis_lhs = serializersForParameters(_this__u8e3s4, typeArguments, failOnMissingTypeArgSerializer);
      var tmp_6;
      if (tmp2_elvis_lhs == null) {
        return null;
      } else {
        tmp_6 = tmp2_elvis_lhs;
      }
      var serializers = tmp_6;
      var tmp3_elvis_lhs = parametrizedSerializerOrNull(rootClass, serializers, serializerByKTypeImpl$lambda(typeArguments));
      var tmp4_elvis_lhs = tmp3_elvis_lhs == null ? _this__u8e3s4.c1m(rootClass, serializers) : tmp3_elvis_lhs;
      var tmp_7;
      if (tmp4_elvis_lhs == null) {
        // Inline function 'kotlinx.serialization.polymorphicIfInterface' call
        tmp_7 = isInterface_0(rootClass) ? new PolymorphicSerializer(rootClass) : null;
      } else {
        tmp_7 = tmp4_elvis_lhs;
      }
      tmp_4 = tmp_7;
    }
    var contextualSerializer = tmp_4;
    var tmp_8;
    if (contextualSerializer == null) {
      tmp_8 = null;
    } else {
      // Inline function 'kotlinx.serialization.internal.cast' call
      tmp_8 = isInterface(contextualSerializer, KSerializer) ? contextualSerializer : THROW_CCE();
    }
    var tmp6_safe_receiver = tmp_8;
    return tmp6_safe_receiver == null ? null : nullable(tmp6_safe_receiver, isNullable);
  }
  function nullable(_this__u8e3s4, shouldBeNullable) {
    if (shouldBeNullable)
      return get_nullable(_this__u8e3s4);
    return isInterface(_this__u8e3s4, KSerializer) ? _this__u8e3s4 : THROW_CCE();
  }
  function serializer_0(type) {
    return serializer(EmptySerializersModule_0(), type);
  }
  function serializerByKTypeImpl$lambda($typeArguments) {
    return function () {
      return $typeArguments.o(0).ob();
    };
  }
  function get_SERIALIZERS_CACHE() {
    _init_properties_SerializersCache_kt__hgwi2p();
    return SERIALIZERS_CACHE;
  }
  var SERIALIZERS_CACHE;
  function get_SERIALIZERS_CACHE_NULLABLE() {
    _init_properties_SerializersCache_kt__hgwi2p();
    return SERIALIZERS_CACHE_NULLABLE;
  }
  var SERIALIZERS_CACHE_NULLABLE;
  function get_PARAMETRIZED_SERIALIZERS_CACHE() {
    _init_properties_SerializersCache_kt__hgwi2p();
    return PARAMETRIZED_SERIALIZERS_CACHE;
  }
  var PARAMETRIZED_SERIALIZERS_CACHE;
  function get_PARAMETRIZED_SERIALIZERS_CACHE_NULLABLE() {
    _init_properties_SerializersCache_kt__hgwi2p();
    return PARAMETRIZED_SERIALIZERS_CACHE_NULLABLE;
  }
  var PARAMETRIZED_SERIALIZERS_CACHE_NULLABLE;
  function findCachedSerializer(clazz, isNullable) {
    _init_properties_SerializersCache_kt__hgwi2p();
    var tmp;
    if (!isNullable) {
      var tmp0_safe_receiver = get_SERIALIZERS_CACHE().d1m(clazz);
      var tmp_0;
      if (tmp0_safe_receiver == null) {
        tmp_0 = null;
      } else {
        // Inline function 'kotlinx.serialization.internal.cast' call
        tmp_0 = isInterface(tmp0_safe_receiver, KSerializer) ? tmp0_safe_receiver : THROW_CCE();
      }
      tmp = tmp_0;
    } else {
      tmp = get_SERIALIZERS_CACHE_NULLABLE().d1m(clazz);
    }
    return tmp;
  }
  function findParametrizedCachedSerializer(clazz, types, isNullable) {
    _init_properties_SerializersCache_kt__hgwi2p();
    var tmp;
    if (!isNullable) {
      var tmp_0 = get_PARAMETRIZED_SERIALIZERS_CACHE().e1m(clazz, types);
      tmp = new Result(tmp_0) instanceof Result ? tmp_0 : THROW_CCE();
    } else {
      tmp = get_PARAMETRIZED_SERIALIZERS_CACHE_NULLABLE().e1m(clazz, types);
    }
    return tmp;
  }
  function SERIALIZERS_CACHE$lambda(it) {
    _init_properties_SerializersCache_kt__hgwi2p();
    var tmp0_elvis_lhs = serializerOrNull(it);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      // Inline function 'kotlinx.serialization.polymorphicIfInterface' call
      tmp = isInterface_0(it) ? new PolymorphicSerializer(it) : null;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function SERIALIZERS_CACHE_NULLABLE$lambda(it) {
    _init_properties_SerializersCache_kt__hgwi2p();
    var tmp0_elvis_lhs = serializerOrNull(it);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      // Inline function 'kotlinx.serialization.polymorphicIfInterface' call
      tmp = isInterface_0(it) ? new PolymorphicSerializer(it) : null;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var tmp1_safe_receiver = tmp;
    var tmp2_safe_receiver = tmp1_safe_receiver == null ? null : get_nullable(tmp1_safe_receiver);
    var tmp_0;
    if (tmp2_safe_receiver == null) {
      tmp_0 = null;
    } else {
      // Inline function 'kotlinx.serialization.internal.cast' call
      tmp_0 = isInterface(tmp2_safe_receiver, KSerializer) ? tmp2_safe_receiver : THROW_CCE();
    }
    return tmp_0;
  }
  function PARAMETRIZED_SERIALIZERS_CACHE$lambda(clazz, types) {
    _init_properties_SerializersCache_kt__hgwi2p();
    var serializers = ensureNotNull(serializersForParameters(EmptySerializersModule_0(), types, true));
    return parametrizedSerializerOrNull(clazz, serializers, PARAMETRIZED_SERIALIZERS_CACHE$lambda$lambda(types));
  }
  function PARAMETRIZED_SERIALIZERS_CACHE$lambda$lambda($types) {
    return function () {
      return $types.o(0).ob();
    };
  }
  function PARAMETRIZED_SERIALIZERS_CACHE_NULLABLE$lambda(clazz, types) {
    _init_properties_SerializersCache_kt__hgwi2p();
    var serializers = ensureNotNull(serializersForParameters(EmptySerializersModule_0(), types, true));
    var tmp0_safe_receiver = parametrizedSerializerOrNull(clazz, serializers, PARAMETRIZED_SERIALIZERS_CACHE_NULLABLE$lambda$lambda(types));
    var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : get_nullable(tmp0_safe_receiver);
    var tmp;
    if (tmp1_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlinx.serialization.internal.cast' call
      tmp = isInterface(tmp1_safe_receiver, KSerializer) ? tmp1_safe_receiver : THROW_CCE();
    }
    return tmp;
  }
  function PARAMETRIZED_SERIALIZERS_CACHE_NULLABLE$lambda$lambda($types) {
    return function () {
      return $types.o(0).ob();
    };
  }
  var properties_initialized_SerializersCache_kt_q8kf25;
  function _init_properties_SerializersCache_kt__hgwi2p() {
    if (!properties_initialized_SerializersCache_kt_q8kf25) {
      properties_initialized_SerializersCache_kt_q8kf25 = true;
      SERIALIZERS_CACHE = createCache(SERIALIZERS_CACHE$lambda);
      SERIALIZERS_CACHE_NULLABLE = createCache(SERIALIZERS_CACHE_NULLABLE$lambda);
      PARAMETRIZED_SERIALIZERS_CACHE = createParametrizedCache(PARAMETRIZED_SERIALIZERS_CACHE$lambda);
      PARAMETRIZED_SERIALIZERS_CACHE_NULLABLE = createParametrizedCache(PARAMETRIZED_SERIALIZERS_CACHE_NULLABLE$lambda);
    }
  }
  function get_nullable(_this__u8e3s4) {
    var tmp;
    if (_this__u8e3s4.w1k().f1m()) {
      tmp = isInterface(_this__u8e3s4, KSerializer) ? _this__u8e3s4 : THROW_CCE();
    } else {
      tmp = new NullableSerializer(_this__u8e3s4);
    }
    return tmp;
  }
  function serializer_1(_this__u8e3s4) {
    return StringSerializer_getInstance();
  }
  function serializer_2(_this__u8e3s4) {
    return CharSerializer_getInstance();
  }
  function CharArraySerializer() {
    return CharArraySerializer_getInstance();
  }
  function serializer_3(_this__u8e3s4) {
    return DoubleSerializer_getInstance();
  }
  function DoubleArraySerializer() {
    return DoubleArraySerializer_getInstance();
  }
  function serializer_4(_this__u8e3s4) {
    return FloatSerializer_getInstance();
  }
  function FloatArraySerializer() {
    return FloatArraySerializer_getInstance();
  }
  function serializer_5(_this__u8e3s4) {
    return LongSerializer_getInstance();
  }
  function LongArraySerializer() {
    return LongArraySerializer_getInstance();
  }
  function serializer_6(_this__u8e3s4) {
    return ULongSerializer_getInstance();
  }
  function ULongArraySerializer() {
    return ULongArraySerializer_getInstance();
  }
  function serializer_7(_this__u8e3s4) {
    return IntSerializer_getInstance();
  }
  function IntArraySerializer() {
    return IntArraySerializer_getInstance();
  }
  function serializer_8(_this__u8e3s4) {
    return UIntSerializer_getInstance();
  }
  function UIntArraySerializer() {
    return UIntArraySerializer_getInstance();
  }
  function serializer_9(_this__u8e3s4) {
    return ShortSerializer_getInstance();
  }
  function ShortArraySerializer() {
    return ShortArraySerializer_getInstance();
  }
  function serializer_10(_this__u8e3s4) {
    return UShortSerializer_getInstance();
  }
  function UShortArraySerializer() {
    return UShortArraySerializer_getInstance();
  }
  function serializer_11(_this__u8e3s4) {
    return ByteSerializer_getInstance();
  }
  function ByteArraySerializer() {
    return ByteArraySerializer_getInstance();
  }
  function serializer_12(_this__u8e3s4) {
    return UByteSerializer_getInstance();
  }
  function UByteArraySerializer() {
    return UByteArraySerializer_getInstance();
  }
  function serializer_13(_this__u8e3s4) {
    return BooleanSerializer_getInstance();
  }
  function BooleanArraySerializer() {
    return BooleanArraySerializer_getInstance();
  }
  function serializer_14(_this__u8e3s4) {
    return UnitSerializer_getInstance();
  }
  function NothingSerializer() {
    return NothingSerializer_getInstance();
  }
  function serializer_15(_this__u8e3s4) {
    return DurationSerializer_getInstance();
  }
  function serializer_16(_this__u8e3s4) {
    return UuidSerializer_getInstance();
  }
  function MapEntrySerializer(keySerializer, valueSerializer) {
    return new MapEntrySerializer_0(keySerializer, valueSerializer);
  }
  function PairSerializer(keySerializer, valueSerializer) {
    return new PairSerializer_0(keySerializer, valueSerializer);
  }
  function TripleSerializer(aSerializer, bSerializer, cSerializer) {
    return new TripleSerializer_0(aSerializer, bSerializer, cSerializer);
  }
  function ArraySerializer(kClass, elementSerializer) {
    return new ReferenceArraySerializer(kClass, elementSerializer);
  }
  function ListSerializer(elementSerializer) {
    return new ArrayListSerializer(elementSerializer);
  }
  function MapSerializer(keySerializer, valueSerializer) {
    return new LinkedHashMapSerializer(keySerializer, valueSerializer);
  }
  function withContext(_this__u8e3s4, context) {
    return new ContextDescriptor(_this__u8e3s4, context);
  }
  function ContextDescriptor(original, kClass) {
    this.g1m_1 = original;
    this.h1m_1 = kClass;
    this.i1m_1 = this.g1m_1.x1l() + '<' + this.h1m_1.za() + '>';
  }
  protoOf(ContextDescriptor).x1l = function () {
    return this.i1m_1;
  };
  protoOf(ContextDescriptor).equals = function (other) {
    var tmp0_elvis_lhs = other instanceof ContextDescriptor ? other : null;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return false;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var another = tmp;
    return equals(this.g1m_1, another.g1m_1) && another.h1m_1.equals(this.h1m_1);
  };
  protoOf(ContextDescriptor).hashCode = function () {
    var result = this.h1m_1.hashCode();
    result = imul(31, result) + getStringHashCode(this.i1m_1) | 0;
    return result;
  };
  protoOf(ContextDescriptor).toString = function () {
    return 'ContextDescriptor(kClass: ' + toString(this.h1m_1) + ', original: ' + toString(this.g1m_1) + ')';
  };
  protoOf(ContextDescriptor).j1m = function () {
    return this.g1m_1.j1m();
  };
  protoOf(ContextDescriptor).f1m = function () {
    return this.g1m_1.f1m();
  };
  protoOf(ContextDescriptor).k1m = function () {
    return this.g1m_1.k1m();
  };
  protoOf(ContextDescriptor).l1m = function () {
    return this.g1m_1.l1m();
  };
  protoOf(ContextDescriptor).m1m = function () {
    return this.g1m_1.m1m();
  };
  protoOf(ContextDescriptor).n1m = function (index) {
    return this.g1m_1.n1m(index);
  };
  protoOf(ContextDescriptor).o1m = function (name) {
    return this.g1m_1.o1m(name);
  };
  protoOf(ContextDescriptor).p1m = function (index) {
    return this.g1m_1.p1m(index);
  };
  protoOf(ContextDescriptor).q1m = function (index) {
    return this.g1m_1.q1m(index);
  };
  protoOf(ContextDescriptor).r1m = function (index) {
    return this.g1m_1.r1m(index);
  };
  function getContextualDescriptor(_this__u8e3s4, descriptor) {
    var tmp0_safe_receiver = get_capturedKClass(descriptor);
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      var tmp0_safe_receiver_0 = _this__u8e3s4.b1m(tmp0_safe_receiver);
      tmp = tmp0_safe_receiver_0 == null ? null : tmp0_safe_receiver_0.w1k();
    }
    return tmp;
  }
  function get_capturedKClass(_this__u8e3s4) {
    var tmp;
    if (_this__u8e3s4 instanceof ContextDescriptor) {
      tmp = _this__u8e3s4.h1m_1;
    } else {
      if (_this__u8e3s4 instanceof SerialDescriptorForNullable) {
        tmp = get_capturedKClass(_this__u8e3s4.s1m_1);
      } else {
        tmp = null;
      }
    }
    return tmp;
  }
  function SerialDescriptor() {
  }
  function get_elementDescriptors(_this__u8e3s4) {
    // Inline function 'kotlin.collections.Iterable' call
    return new elementDescriptors$$inlined$Iterable$1(_this__u8e3s4);
  }
  function get_elementNames(_this__u8e3s4) {
    // Inline function 'kotlin.collections.Iterable' call
    return new elementNames$$inlined$Iterable$1(_this__u8e3s4);
  }
  function elementDescriptors$1($this_elementDescriptors) {
    this.w1m_1 = $this_elementDescriptors;
    this.v1m_1 = $this_elementDescriptors.l1m();
  }
  protoOf(elementDescriptors$1).k = function () {
    return this.v1m_1 > 0;
  };
  protoOf(elementDescriptors$1).l = function () {
    var tmp = this.w1m_1.l1m();
    var _unary__edvuaz = this.v1m_1;
    this.v1m_1 = _unary__edvuaz - 1 | 0;
    return this.w1m_1.q1m(tmp - _unary__edvuaz | 0);
  };
  function elementDescriptors$$inlined$Iterable$1($this_elementDescriptors) {
    this.x1m_1 = $this_elementDescriptors;
  }
  protoOf(elementDescriptors$$inlined$Iterable$1).j = function () {
    return new elementDescriptors$1(this.x1m_1);
  };
  function elementNames$1($this_elementNames) {
    this.z1m_1 = $this_elementNames;
    this.y1m_1 = $this_elementNames.l1m();
  }
  protoOf(elementNames$1).k = function () {
    return this.y1m_1 > 0;
  };
  protoOf(elementNames$1).l = function () {
    var tmp = this.z1m_1.l1m();
    var _unary__edvuaz = this.y1m_1;
    this.y1m_1 = _unary__edvuaz - 1 | 0;
    return this.z1m_1.n1m(tmp - _unary__edvuaz | 0);
  };
  function elementNames$$inlined$Iterable$1($this_elementNames) {
    this.a1n_1 = $this_elementNames;
  }
  protoOf(elementNames$$inlined$Iterable$1).j = function () {
    return new elementNames$1(this.a1n_1);
  };
  function buildSerialDescriptor(serialName, kind, typeParameters, builder) {
    var tmp;
    if (builder === VOID) {
      tmp = buildSerialDescriptor$lambda;
    } else {
      tmp = builder;
    }
    builder = tmp;
    // Inline function 'kotlin.text.isNotBlank' call
    // Inline function 'kotlin.require' call
    if (!!isBlank(serialName)) {
      var message = 'Blank serial names are prohibited';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    // Inline function 'kotlin.require' call
    if (!!equals(kind, CLASS_getInstance())) {
      var message_0 = "For StructureKind.CLASS please use 'buildClassSerialDescriptor' instead";
      throw IllegalArgumentException_init_$Create$(toString(message_0));
    }
    var sdBuilder = new ClassSerialDescriptorBuilder(serialName);
    builder(sdBuilder);
    return new SerialDescriptorImpl(serialName, kind, sdBuilder.c1l_1.m(), toList(typeParameters), sdBuilder);
  }
  function ClassSerialDescriptorBuilder(serialName) {
    this.z1k_1 = serialName;
    this.a1l_1 = false;
    this.b1l_1 = emptyList();
    this.c1l_1 = ArrayList_init_$Create$_0();
    this.d1l_1 = HashSet_init_$Create$();
    this.e1l_1 = ArrayList_init_$Create$_0();
    this.f1l_1 = ArrayList_init_$Create$_0();
    this.g1l_1 = ArrayList_init_$Create$_0();
  }
  protoOf(ClassSerialDescriptorBuilder).b1n = function (elementName, descriptor, annotations, isOptional) {
    // Inline function 'kotlin.require' call
    if (!this.d1l_1.e(elementName)) {
      var message = "Element with name '" + elementName + "' is already registered in " + this.z1k_1;
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    // Inline function 'kotlin.collections.plusAssign' call
    this.c1l_1.e(elementName);
    // Inline function 'kotlin.collections.plusAssign' call
    this.e1l_1.e(descriptor);
    // Inline function 'kotlin.collections.plusAssign' call
    this.f1l_1.e(annotations);
    // Inline function 'kotlin.collections.plusAssign' call
    this.g1l_1.e(isOptional);
  };
  protoOf(ClassSerialDescriptorBuilder).h1l = function (elementName, descriptor, annotations, isOptional, $super) {
    annotations = annotations === VOID ? emptyList() : annotations;
    isOptional = isOptional === VOID ? false : isOptional;
    var tmp;
    if ($super === VOID) {
      this.b1n(elementName, descriptor, annotations, isOptional);
      tmp = Unit_instance;
    } else {
      tmp = $super.b1n.call(this, elementName, descriptor, annotations, isOptional);
    }
    return tmp;
  };
  function _get__hashCode__tgwhef($this) {
    var tmp0 = $this.n1n_1;
    // Inline function 'kotlin.getValue' call
    _hashCode$factory();
    return tmp0.w();
  }
  function SerialDescriptorImpl$_hashCode$delegate$lambda(this$0) {
    return function () {
      return hashCodeImpl(this$0, this$0.m1n_1);
    };
  }
  function SerialDescriptorImpl$toString$lambda(this$0) {
    return function (it) {
      return this$0.n1m(it) + ': ' + this$0.q1m(it).x1l();
    };
  }
  function SerialDescriptorImpl(serialName, kind, elementsCount, typeParameters, builder) {
    this.c1n_1 = serialName;
    this.d1n_1 = kind;
    this.e1n_1 = elementsCount;
    this.f1n_1 = builder.b1l_1;
    this.g1n_1 = toHashSet(builder.c1l_1);
    var tmp = this;
    // Inline function 'kotlin.collections.toTypedArray' call
    var this_0 = builder.c1l_1;
    tmp.h1n_1 = copyToArray(this_0);
    this.i1n_1 = compactArray(builder.e1l_1);
    var tmp_0 = this;
    // Inline function 'kotlin.collections.toTypedArray' call
    var this_1 = builder.f1l_1;
    tmp_0.j1n_1 = copyToArray(this_1);
    this.k1n_1 = toBooleanArray(builder.g1l_1);
    var tmp_1 = this;
    // Inline function 'kotlin.collections.map' call
    var this_2 = withIndex(this.h1n_1);
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$(collectionSizeOrDefault(this_2, 10));
    var _iterator__ex2g4s = this_2.j();
    while (_iterator__ex2g4s.k()) {
      var item = _iterator__ex2g4s.l();
      var tmp$ret$2 = to(item.kg_1, item.jg_1);
      destination.e(tmp$ret$2);
    }
    tmp_1.l1n_1 = toMap(destination);
    this.m1n_1 = compactArray(typeParameters);
    var tmp_2 = this;
    tmp_2.n1n_1 = lazy_0(SerialDescriptorImpl$_hashCode$delegate$lambda(this));
  }
  protoOf(SerialDescriptorImpl).x1l = function () {
    return this.c1n_1;
  };
  protoOf(SerialDescriptorImpl).j1m = function () {
    return this.d1n_1;
  };
  protoOf(SerialDescriptorImpl).l1m = function () {
    return this.e1n_1;
  };
  protoOf(SerialDescriptorImpl).m1m = function () {
    return this.f1n_1;
  };
  protoOf(SerialDescriptorImpl).o1n = function () {
    return this.g1n_1;
  };
  protoOf(SerialDescriptorImpl).n1m = function (index) {
    return getChecked(this.h1n_1, index);
  };
  protoOf(SerialDescriptorImpl).o1m = function (name) {
    var tmp0_elvis_lhs = this.l1n_1.h2(name);
    return tmp0_elvis_lhs == null ? -3 : tmp0_elvis_lhs;
  };
  protoOf(SerialDescriptorImpl).p1m = function (index) {
    return getChecked(this.j1n_1, index);
  };
  protoOf(SerialDescriptorImpl).q1m = function (index) {
    return getChecked(this.i1n_1, index);
  };
  protoOf(SerialDescriptorImpl).r1m = function (index) {
    return getChecked_0(this.k1n_1, index);
  };
  protoOf(SerialDescriptorImpl).equals = function (other) {
    var tmp$ret$0;
    $l$block_5: {
      // Inline function 'kotlinx.serialization.internal.equalsImpl' call
      if (this === other) {
        tmp$ret$0 = true;
        break $l$block_5;
      }
      if (!(other instanceof SerialDescriptorImpl)) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      if (!(this.x1l() === other.x1l())) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      if (!contentEquals(this.m1n_1, other.m1n_1)) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      if (!(this.l1m() === other.l1m())) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      var inductionVariable = 0;
      var last = this.l1m();
      if (inductionVariable < last)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          if (!(this.q1m(index).x1l() === other.q1m(index).x1l())) {
            tmp$ret$0 = false;
            break $l$block_5;
          }
          if (!equals(this.q1m(index).j1m(), other.q1m(index).j1m())) {
            tmp$ret$0 = false;
            break $l$block_5;
          }
        }
         while (inductionVariable < last);
      tmp$ret$0 = true;
    }
    return tmp$ret$0;
  };
  protoOf(SerialDescriptorImpl).hashCode = function () {
    return _get__hashCode__tgwhef(this);
  };
  protoOf(SerialDescriptorImpl).toString = function () {
    var tmp = until(0, this.e1n_1);
    var tmp_0 = this.c1n_1 + '(';
    return joinToString(tmp, ', ', tmp_0, ')', VOID, VOID, SerialDescriptorImpl$toString$lambda(this));
  };
  function buildClassSerialDescriptor(serialName, typeParameters, builderAction) {
    var tmp;
    if (builderAction === VOID) {
      tmp = buildClassSerialDescriptor$lambda;
    } else {
      tmp = builderAction;
    }
    builderAction = tmp;
    // Inline function 'kotlin.text.isNotBlank' call
    // Inline function 'kotlin.require' call
    if (!!isBlank(serialName)) {
      var message = 'Blank serial names are prohibited';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    var sdBuilder = new ClassSerialDescriptorBuilder(serialName);
    builderAction(sdBuilder);
    return new SerialDescriptorImpl(serialName, CLASS_getInstance(), sdBuilder.c1l_1.m(), toList(typeParameters), sdBuilder);
  }
  function PrimitiveSerialDescriptor(serialName, kind) {
    // Inline function 'kotlin.text.isNotBlank' call
    // Inline function 'kotlin.require' call
    if (!!isBlank(serialName)) {
      var message = 'Blank serial names are prohibited';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return PrimitiveDescriptorSafe(serialName, kind);
  }
  function buildSerialDescriptor$lambda(_this__u8e3s4) {
    return Unit_instance;
  }
  function buildClassSerialDescriptor$lambda(_this__u8e3s4) {
    return Unit_instance;
  }
  function _hashCode$factory() {
    return getPropertyCallableRef('_hashCode', 1, KProperty1, function (receiver) {
      return _get__hashCode__tgwhef(receiver);
    }, null);
  }
  function ENUM() {
    ENUM_instance = this;
    SerialKind.call(this);
  }
  var ENUM_instance;
  function ENUM_getInstance() {
    if (ENUM_instance == null)
      new ENUM();
    return ENUM_instance;
  }
  function CONTEXTUAL() {
    CONTEXTUAL_instance = this;
    SerialKind.call(this);
  }
  var CONTEXTUAL_instance;
  function CONTEXTUAL_getInstance() {
    if (CONTEXTUAL_instance == null)
      new CONTEXTUAL();
    return CONTEXTUAL_instance;
  }
  function SerialKind() {
  }
  protoOf(SerialKind).toString = function () {
    return ensureNotNull(getKClassFromExpression(this).za());
  };
  protoOf(SerialKind).hashCode = function () {
    return getStringHashCode(this.toString());
  };
  function SEALED() {
    SEALED_instance = this;
    PolymorphicKind.call(this);
  }
  var SEALED_instance;
  function SEALED_getInstance() {
    if (SEALED_instance == null)
      new SEALED();
    return SEALED_instance;
  }
  function OPEN() {
    OPEN_instance = this;
    PolymorphicKind.call(this);
  }
  var OPEN_instance;
  function OPEN_getInstance() {
    if (OPEN_instance == null)
      new OPEN();
    return OPEN_instance;
  }
  function PolymorphicKind() {
    SerialKind.call(this);
  }
  function BOOLEAN() {
    BOOLEAN_instance = this;
    PrimitiveKind.call(this);
  }
  var BOOLEAN_instance;
  function BOOLEAN_getInstance() {
    if (BOOLEAN_instance == null)
      new BOOLEAN();
    return BOOLEAN_instance;
  }
  function BYTE() {
    BYTE_instance = this;
    PrimitiveKind.call(this);
  }
  var BYTE_instance;
  function BYTE_getInstance() {
    if (BYTE_instance == null)
      new BYTE();
    return BYTE_instance;
  }
  function CHAR() {
    CHAR_instance = this;
    PrimitiveKind.call(this);
  }
  var CHAR_instance;
  function CHAR_getInstance() {
    if (CHAR_instance == null)
      new CHAR();
    return CHAR_instance;
  }
  function SHORT() {
    SHORT_instance = this;
    PrimitiveKind.call(this);
  }
  var SHORT_instance;
  function SHORT_getInstance() {
    if (SHORT_instance == null)
      new SHORT();
    return SHORT_instance;
  }
  function INT() {
    INT_instance = this;
    PrimitiveKind.call(this);
  }
  var INT_instance;
  function INT_getInstance() {
    if (INT_instance == null)
      new INT();
    return INT_instance;
  }
  function LONG() {
    LONG_instance = this;
    PrimitiveKind.call(this);
  }
  var LONG_instance;
  function LONG_getInstance() {
    if (LONG_instance == null)
      new LONG();
    return LONG_instance;
  }
  function FLOAT() {
    FLOAT_instance = this;
    PrimitiveKind.call(this);
  }
  var FLOAT_instance;
  function FLOAT_getInstance() {
    if (FLOAT_instance == null)
      new FLOAT();
    return FLOAT_instance;
  }
  function DOUBLE() {
    DOUBLE_instance = this;
    PrimitiveKind.call(this);
  }
  var DOUBLE_instance;
  function DOUBLE_getInstance() {
    if (DOUBLE_instance == null)
      new DOUBLE();
    return DOUBLE_instance;
  }
  function STRING() {
    STRING_instance = this;
    PrimitiveKind.call(this);
  }
  var STRING_instance;
  function STRING_getInstance() {
    if (STRING_instance == null)
      new STRING();
    return STRING_instance;
  }
  function PrimitiveKind() {
    SerialKind.call(this);
  }
  function CLASS() {
    CLASS_instance = this;
    StructureKind.call(this);
  }
  var CLASS_instance;
  function CLASS_getInstance() {
    if (CLASS_instance == null)
      new CLASS();
    return CLASS_instance;
  }
  function LIST() {
    LIST_instance = this;
    StructureKind.call(this);
  }
  var LIST_instance;
  function LIST_getInstance() {
    if (LIST_instance == null)
      new LIST();
    return LIST_instance;
  }
  function MAP() {
    MAP_instance = this;
    StructureKind.call(this);
  }
  var MAP_instance;
  function MAP_getInstance() {
    if (MAP_instance == null)
      new MAP();
    return MAP_instance;
  }
  function OBJECT() {
    OBJECT_instance = this;
    StructureKind.call(this);
  }
  var OBJECT_instance;
  function OBJECT_getInstance() {
    if (OBJECT_instance == null)
      new OBJECT();
    return OBJECT_instance;
  }
  function StructureKind() {
    SerialKind.call(this);
  }
  function AbstractDecoder() {
  }
  protoOf(AbstractDecoder).p1n = function () {
    throw SerializationException_init_$Create$_0(toString(getKClassFromExpression(this)) + " can't retrieve untyped values");
  };
  protoOf(AbstractDecoder).q1n = function () {
    return true;
  };
  protoOf(AbstractDecoder).r1n = function () {
    return null;
  };
  protoOf(AbstractDecoder).s1n = function () {
    var tmp = this.p1n();
    return typeof tmp === 'boolean' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).t1n = function () {
    var tmp = this.p1n();
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).u1n = function () {
    var tmp = this.p1n();
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).v1n = function () {
    var tmp = this.p1n();
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).w1n = function () {
    var tmp = this.p1n();
    return tmp instanceof Long ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).x1n = function () {
    var tmp = this.p1n();
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).y1n = function () {
    var tmp = this.p1n();
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).z1n = function () {
    var tmp = this.p1n();
    return tmp instanceof Char ? tmp.m1_1 : THROW_CCE();
  };
  protoOf(AbstractDecoder).a1o = function () {
    var tmp = this.p1n();
    return typeof tmp === 'string' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).b1o = function (enumDescriptor) {
    var tmp = this.p1n();
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).c1o = function (descriptor) {
    return this;
  };
  protoOf(AbstractDecoder).d1o = function (deserializer, previousValue) {
    return this.e1o(deserializer);
  };
  protoOf(AbstractDecoder).f1o = function (descriptor) {
    return this;
  };
  protoOf(AbstractDecoder).g1o = function (descriptor) {
  };
  protoOf(AbstractDecoder).h1o = function (descriptor, index) {
    return this.s1n();
  };
  protoOf(AbstractDecoder).i1o = function (descriptor, index) {
    return this.t1n();
  };
  protoOf(AbstractDecoder).j1o = function (descriptor, index) {
    return this.u1n();
  };
  protoOf(AbstractDecoder).k1o = function (descriptor, index) {
    return this.v1n();
  };
  protoOf(AbstractDecoder).l1o = function (descriptor, index) {
    return this.w1n();
  };
  protoOf(AbstractDecoder).m1o = function (descriptor, index) {
    return this.x1n();
  };
  protoOf(AbstractDecoder).n1o = function (descriptor, index) {
    return this.y1n();
  };
  protoOf(AbstractDecoder).o1o = function (descriptor, index) {
    return this.z1n();
  };
  protoOf(AbstractDecoder).p1o = function (descriptor, index) {
    return this.a1o();
  };
  protoOf(AbstractDecoder).q1o = function (descriptor, index) {
    return this.c1o(descriptor.q1m(index));
  };
  protoOf(AbstractDecoder).r1o = function (descriptor, index, deserializer, previousValue) {
    return this.d1o(deserializer, previousValue);
  };
  protoOf(AbstractDecoder).t1o = function (descriptor, index, deserializer, previousValue) {
    // Inline function 'kotlinx.serialization.encoding.decodeIfNullable' call
    var isNullabilitySupported = deserializer.w1k().f1m();
    var tmp;
    if (isNullabilitySupported || this.q1n()) {
      tmp = this.d1o(deserializer, previousValue);
    } else {
      tmp = this.r1n();
    }
    return tmp;
  };
  function AbstractEncoder() {
  }
  protoOf(AbstractEncoder).f1o = function (descriptor) {
    return this;
  };
  protoOf(AbstractEncoder).g1o = function (descriptor) {
  };
  protoOf(AbstractEncoder).y1o = function (descriptor, index) {
    return true;
  };
  protoOf(AbstractEncoder).z1o = function (value) {
    throw SerializationException_init_$Create$_0('Non-serializable ' + toString(getKClassFromExpression(value)) + ' is not supported by ' + toString(getKClassFromExpression(this)) + ' encoder');
  };
  protoOf(AbstractEncoder).a1p = function () {
    throw SerializationException_init_$Create$_0("'null' is not supported by default");
  };
  protoOf(AbstractEncoder).b1p = function (value) {
    return this.z1o(value);
  };
  protoOf(AbstractEncoder).c1p = function (value) {
    return this.z1o(value);
  };
  protoOf(AbstractEncoder).d1p = function (value) {
    return this.z1o(value);
  };
  protoOf(AbstractEncoder).e1p = function (value) {
    return this.z1o(value);
  };
  protoOf(AbstractEncoder).f1p = function (value) {
    return this.z1o(value);
  };
  protoOf(AbstractEncoder).g1p = function (value) {
    return this.z1o(value);
  };
  protoOf(AbstractEncoder).h1p = function (value) {
    return this.z1o(value);
  };
  protoOf(AbstractEncoder).i1p = function (value) {
    return this.z1o(new Char(value));
  };
  protoOf(AbstractEncoder).j1p = function (value) {
    return this.z1o(value);
  };
  protoOf(AbstractEncoder).k1p = function (enumDescriptor, index) {
    return this.z1o(index);
  };
  protoOf(AbstractEncoder).l1p = function (descriptor) {
    return this;
  };
  protoOf(AbstractEncoder).m1p = function (descriptor, index, value) {
    if (this.y1o(descriptor, index)) {
      this.b1p(value);
    }
  };
  protoOf(AbstractEncoder).n1p = function (descriptor, index, value) {
    if (this.y1o(descriptor, index)) {
      this.c1p(value);
    }
  };
  protoOf(AbstractEncoder).o1p = function (descriptor, index, value) {
    if (this.y1o(descriptor, index)) {
      this.d1p(value);
    }
  };
  protoOf(AbstractEncoder).p1p = function (descriptor, index, value) {
    if (this.y1o(descriptor, index)) {
      this.e1p(value);
    }
  };
  protoOf(AbstractEncoder).q1p = function (descriptor, index, value) {
    if (this.y1o(descriptor, index)) {
      this.f1p(value);
    }
  };
  protoOf(AbstractEncoder).r1p = function (descriptor, index, value) {
    if (this.y1o(descriptor, index)) {
      this.g1p(value);
    }
  };
  protoOf(AbstractEncoder).s1p = function (descriptor, index, value) {
    if (this.y1o(descriptor, index)) {
      this.h1p(value);
    }
  };
  protoOf(AbstractEncoder).t1p = function (descriptor, index, value) {
    if (this.y1o(descriptor, index)) {
      this.i1p(value);
    }
  };
  protoOf(AbstractEncoder).u1p = function (descriptor, index, value) {
    if (this.y1o(descriptor, index)) {
      this.j1p(value);
    }
  };
  protoOf(AbstractEncoder).v1p = function (descriptor, index) {
    return this.y1o(descriptor, index) ? this.l1p(descriptor.q1m(index)) : NoOpEncoder_getInstance();
  };
  protoOf(AbstractEncoder).w1p = function (descriptor, index, serializer, value) {
    if (this.y1o(descriptor, index)) {
      this.x1p(serializer, value);
    }
  };
  protoOf(AbstractEncoder).y1p = function (descriptor, index, serializer, value) {
    if (this.y1o(descriptor, index)) {
      this.z1p(serializer, value);
    }
  };
  function Decoder() {
  }
  function CompositeDecoder() {
  }
  function Encoder() {
  }
  function CompositeEncoder() {
  }
  function decodeSequentially_0($this, compositeDecoder) {
    var klassName = compositeDecoder.p1o($this.w1k(), 0);
    var serializer = findPolymorphicSerializer_0($this, compositeDecoder, klassName);
    return compositeDecoder.s1o($this.w1k(), 1, serializer);
  }
  function AbstractPolymorphicSerializer() {
  }
  protoOf(AbstractPolymorphicSerializer).m1l = function (encoder, value) {
    var actualSerializer = findPolymorphicSerializer(this, encoder, value);
    // Inline function 'kotlinx.serialization.encoding.encodeStructure' call
    var descriptor = this.w1k();
    var composite = encoder.f1o(descriptor);
    composite.u1p(this.w1k(), 0, actualSerializer.w1k().x1l());
    var tmp = this.w1k();
    // Inline function 'kotlinx.serialization.internal.cast' call
    var tmp$ret$0 = isInterface(actualSerializer, SerializationStrategy) ? actualSerializer : THROW_CCE();
    composite.w1p(tmp, 1, tmp$ret$0, value);
    composite.g1o(descriptor);
  };
  protoOf(AbstractPolymorphicSerializer).x1k = function (encoder, value) {
    return this.m1l(encoder, !(value == null) ? value : THROW_CCE());
  };
  protoOf(AbstractPolymorphicSerializer).y1k = function (decoder) {
    // Inline function 'kotlinx.serialization.encoding.decodeStructure' call
    var descriptor = this.w1k();
    var composite = decoder.f1o(descriptor);
    var tmp$ret$0;
    $l$block: {
      var klassName = null;
      var value = null;
      if (composite.v1o()) {
        tmp$ret$0 = decodeSequentially_0(this, composite);
        break $l$block;
      }
      mainLoop: while (true) {
        var index = composite.w1o(this.w1k());
        switch (index) {
          case -1:
            break mainLoop;
          case 0:
            klassName = composite.p1o(this.w1k(), index);
            break;
          case 1:
            var tmp0 = klassName;
            var tmp$ret$2;
            $l$block_0: {
              // Inline function 'kotlin.requireNotNull' call
              if (tmp0 == null) {
                var message = 'Cannot read polymorphic value before its type token';
                throw IllegalArgumentException_init_$Create$(toString(message));
              } else {
                tmp$ret$2 = tmp0;
                break $l$block_0;
              }
            }

            klassName = tmp$ret$2;
            var serializer = findPolymorphicSerializer_0(this, composite, klassName);
            value = composite.s1o(this.w1k(), index, serializer);
            break;
          default:
            var tmp0_elvis_lhs = klassName;
            throw SerializationException_init_$Create$_0('Invalid index in polymorphic deserialization of ' + (tmp0_elvis_lhs == null ? 'unknown class' : tmp0_elvis_lhs) + ('\n Expected 0, 1 or DECODE_DONE(-1), but found ' + index));
        }
      }
      var tmp1 = value;
      var tmp$ret$4;
      $l$block_1: {
        // Inline function 'kotlin.requireNotNull' call
        if (tmp1 == null) {
          var message_0 = 'Polymorphic value has not been read for class ' + klassName;
          throw IllegalArgumentException_init_$Create$(toString(message_0));
        } else {
          tmp$ret$4 = tmp1;
          break $l$block_1;
        }
      }
      var tmp = tmp$ret$4;
      tmp$ret$0 = !(tmp == null) ? tmp : THROW_CCE();
    }
    var result = tmp$ret$0;
    composite.g1o(descriptor);
    return result;
  };
  protoOf(AbstractPolymorphicSerializer).n1l = function (decoder, klassName) {
    return decoder.u1o().d1q(this.l1l(), klassName);
  };
  protoOf(AbstractPolymorphicSerializer).o1l = function (encoder, value) {
    return encoder.u1o().e1q(this.l1l(), value);
  };
  function throwSubtypeNotRegistered(subClass, baseClass) {
    var tmp0_elvis_lhs = subClass.za();
    throwSubtypeNotRegistered_0(tmp0_elvis_lhs == null ? toString(subClass) : tmp0_elvis_lhs, baseClass);
  }
  function throwSubtypeNotRegistered_0(subClassName, baseClass) {
    var scope = "in the polymorphic scope of '" + baseClass.za() + "'";
    throw SerializationException_init_$Create$_0(subClassName == null ? 'Class discriminator was missing and no default serializers were registered ' + scope + '.' : "Serializer for subclass '" + subClassName + "' is not found " + scope + '.\n' + ("Check if class with serial name '" + subClassName + "' exists and serializer is registered in a corresponding SerializersModule.\n") + ("To be registered automatically, class '" + subClassName + "' has to be '@Serializable', and the base class '" + baseClass.za() + "' has to be sealed and '@Serializable'."));
  }
  function NothingSerializer_0() {
    NothingSerializer_instance = this;
    this.f1q_1 = NothingSerialDescriptor_getInstance();
  }
  protoOf(NothingSerializer_0).w1k = function () {
    return this.f1q_1;
  };
  protoOf(NothingSerializer_0).g1q = function (encoder, value) {
    throw SerializationException_init_$Create$_0("'kotlin.Nothing' cannot be serialized");
  };
  protoOf(NothingSerializer_0).x1k = function (encoder, value) {
    var tmp;
    if (false) {
      tmp = value;
    } else {
      tmp = THROW_CCE();
    }
    return this.g1q(encoder, tmp);
  };
  protoOf(NothingSerializer_0).y1k = function (decoder) {
    throw SerializationException_init_$Create$_0("'kotlin.Nothing' does not have instances");
  };
  var NothingSerializer_instance;
  function NothingSerializer_getInstance() {
    if (NothingSerializer_instance == null)
      new NothingSerializer_0();
    return NothingSerializer_instance;
  }
  function DurationSerializer() {
    DurationSerializer_instance = this;
    this.h1q_1 = new PrimitiveSerialDescriptor_0('kotlin.time.Duration', STRING_getInstance());
  }
  protoOf(DurationSerializer).w1k = function () {
    return this.h1q_1;
  };
  protoOf(DurationSerializer).i1q = function (encoder, value) {
    encoder.j1p(Duration__toIsoString_impl_9h6wsm(value));
  };
  protoOf(DurationSerializer).x1k = function (encoder, value) {
    return this.i1q(encoder, value instanceof Duration ? value.ml_1 : THROW_CCE());
  };
  protoOf(DurationSerializer).j1q = function (decoder) {
    return Companion_getInstance().ll(decoder.a1o());
  };
  protoOf(DurationSerializer).y1k = function (decoder) {
    return new Duration(this.j1q(decoder));
  };
  var DurationSerializer_instance;
  function DurationSerializer_getInstance() {
    if (DurationSerializer_instance == null)
      new DurationSerializer();
    return DurationSerializer_instance;
  }
  function UuidSerializer() {
    UuidSerializer_instance = this;
    this.k1q_1 = new PrimitiveSerialDescriptor_0('kotlin.uuid.Uuid', STRING_getInstance());
  }
  protoOf(UuidSerializer).w1k = function () {
    return this.k1q_1;
  };
  protoOf(UuidSerializer).l1q = function (encoder, value) {
    encoder.j1p(value.toString());
  };
  protoOf(UuidSerializer).x1k = function (encoder, value) {
    return this.l1q(encoder, value instanceof Uuid ? value : THROW_CCE());
  };
  protoOf(UuidSerializer).y1k = function (decoder) {
    return Companion_getInstance_0().fm(decoder.a1o());
  };
  var UuidSerializer_instance;
  function UuidSerializer_getInstance() {
    if (UuidSerializer_instance == null)
      new UuidSerializer();
    return UuidSerializer_instance;
  }
  function CachedNames() {
  }
  function ArrayListClassDesc(elementDesc) {
    ListLikeDescriptor.call(this, elementDesc);
  }
  protoOf(ArrayListClassDesc).x1l = function () {
    return 'kotlin.collections.ArrayList';
  };
  function HashSetClassDesc(elementDesc) {
    ListLikeDescriptor.call(this, elementDesc);
  }
  protoOf(HashSetClassDesc).x1l = function () {
    return 'kotlin.collections.HashSet';
  };
  function LinkedHashSetClassDesc(elementDesc) {
    ListLikeDescriptor.call(this, elementDesc);
  }
  protoOf(LinkedHashSetClassDesc).x1l = function () {
    return 'kotlin.collections.LinkedHashSet';
  };
  function HashMapClassDesc(keyDesc, valueDesc) {
    MapLikeDescriptor.call(this, 'kotlin.collections.HashMap', keyDesc, valueDesc);
  }
  function LinkedHashMapClassDesc(keyDesc, valueDesc) {
    MapLikeDescriptor.call(this, 'kotlin.collections.LinkedHashMap', keyDesc, valueDesc);
  }
  function ArrayClassDesc(elementDesc) {
    ListLikeDescriptor.call(this, elementDesc);
  }
  protoOf(ArrayClassDesc).x1l = function () {
    return 'kotlin.Array';
  };
  function ListLikeDescriptor(elementDescriptor) {
    this.o1q_1 = elementDescriptor;
    this.p1q_1 = 1;
  }
  protoOf(ListLikeDescriptor).j1m = function () {
    return LIST_getInstance();
  };
  protoOf(ListLikeDescriptor).l1m = function () {
    return this.p1q_1;
  };
  protoOf(ListLikeDescriptor).n1m = function (index) {
    return index.toString();
  };
  protoOf(ListLikeDescriptor).o1m = function (name) {
    var tmp0_elvis_lhs = toIntOrNull(name);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throw IllegalArgumentException_init_$Create$(name + ' is not a valid list index');
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  };
  protoOf(ListLikeDescriptor).r1m = function (index) {
    // Inline function 'kotlin.require' call
    if (!(index >= 0)) {
      var message = 'Illegal index ' + index + ', ' + this.x1l() + ' expects only non-negative indices';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return false;
  };
  protoOf(ListLikeDescriptor).p1m = function (index) {
    // Inline function 'kotlin.require' call
    if (!(index >= 0)) {
      var message = 'Illegal index ' + index + ', ' + this.x1l() + ' expects only non-negative indices';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return emptyList();
  };
  protoOf(ListLikeDescriptor).q1m = function (index) {
    // Inline function 'kotlin.require' call
    if (!(index >= 0)) {
      var message = 'Illegal index ' + index + ', ' + this.x1l() + ' expects only non-negative indices';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return this.o1q_1;
  };
  protoOf(ListLikeDescriptor).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof ListLikeDescriptor))
      return false;
    if (equals(this.o1q_1, other.o1q_1) && this.x1l() === other.x1l())
      return true;
    return false;
  };
  protoOf(ListLikeDescriptor).hashCode = function () {
    return imul(hashCode(this.o1q_1), 31) + getStringHashCode(this.x1l()) | 0;
  };
  protoOf(ListLikeDescriptor).toString = function () {
    return this.x1l() + '(' + toString(this.o1q_1) + ')';
  };
  function MapLikeDescriptor(serialName, keyDescriptor, valueDescriptor) {
    this.u1q_1 = serialName;
    this.v1q_1 = keyDescriptor;
    this.w1q_1 = valueDescriptor;
    this.x1q_1 = 2;
  }
  protoOf(MapLikeDescriptor).x1l = function () {
    return this.u1q_1;
  };
  protoOf(MapLikeDescriptor).j1m = function () {
    return MAP_getInstance();
  };
  protoOf(MapLikeDescriptor).l1m = function () {
    return this.x1q_1;
  };
  protoOf(MapLikeDescriptor).n1m = function (index) {
    return index.toString();
  };
  protoOf(MapLikeDescriptor).o1m = function (name) {
    var tmp0_elvis_lhs = toIntOrNull(name);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throw IllegalArgumentException_init_$Create$(name + ' is not a valid map index');
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  };
  protoOf(MapLikeDescriptor).r1m = function (index) {
    // Inline function 'kotlin.require' call
    if (!(index >= 0)) {
      var message = 'Illegal index ' + index + ', ' + this.x1l() + ' expects only non-negative indices';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return false;
  };
  protoOf(MapLikeDescriptor).p1m = function (index) {
    // Inline function 'kotlin.require' call
    if (!(index >= 0)) {
      var message = 'Illegal index ' + index + ', ' + this.x1l() + ' expects only non-negative indices';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return emptyList();
  };
  protoOf(MapLikeDescriptor).q1m = function (index) {
    // Inline function 'kotlin.require' call
    if (!(index >= 0)) {
      var message = 'Illegal index ' + index + ', ' + this.x1l() + ' expects only non-negative indices';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    var tmp;
    switch (index % 2 | 0) {
      case 0:
        tmp = this.v1q_1;
        break;
      case 1:
        tmp = this.w1q_1;
        break;
      default:
        var message_0 = 'Unreached';
        throw IllegalStateException_init_$Create$(toString(message_0));
    }
    return tmp;
  };
  protoOf(MapLikeDescriptor).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof MapLikeDescriptor))
      return false;
    if (!(this.x1l() === other.x1l()))
      return false;
    if (!equals(this.v1q_1, other.v1q_1))
      return false;
    if (!equals(this.w1q_1, other.w1q_1))
      return false;
    return true;
  };
  protoOf(MapLikeDescriptor).hashCode = function () {
    var result = getStringHashCode(this.x1l());
    result = imul(31, result) + hashCode(this.v1q_1) | 0;
    result = imul(31, result) + hashCode(this.w1q_1) | 0;
    return result;
  };
  protoOf(MapLikeDescriptor).toString = function () {
    return this.x1l() + '(' + toString(this.v1q_1) + ', ' + toString(this.w1q_1) + ')';
  };
  function PrimitiveArrayDescriptor(primitive) {
    ListLikeDescriptor.call(this, primitive);
    this.c1r_1 = primitive.x1l() + 'Array';
  }
  protoOf(PrimitiveArrayDescriptor).x1l = function () {
    return this.c1r_1;
  };
  function ArrayListSerializer(element) {
    CollectionSerializer.call(this, element);
    this.e1r_1 = new ArrayListClassDesc(element.w1k());
  }
  protoOf(ArrayListSerializer).w1k = function () {
    return this.e1r_1;
  };
  protoOf(ArrayListSerializer).f1r = function () {
    // Inline function 'kotlin.collections.arrayListOf' call
    return ArrayList_init_$Create$_0();
  };
  protoOf(ArrayListSerializer).g1r = function (_this__u8e3s4) {
    return _this__u8e3s4.m();
  };
  protoOf(ArrayListSerializer).h1r = function (_this__u8e3s4) {
    return this.g1r(_this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ArrayListSerializer).i1r = function (_this__u8e3s4) {
    return _this__u8e3s4;
  };
  protoOf(ArrayListSerializer).j1r = function (_this__u8e3s4) {
    return this.i1r(_this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ArrayListSerializer).k1r = function (_this__u8e3s4) {
    var tmp0_elvis_lhs = _this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : null;
    return tmp0_elvis_lhs == null ? ArrayList_init_$Create$_1(_this__u8e3s4) : tmp0_elvis_lhs;
  };
  protoOf(ArrayListSerializer).l1r = function (_this__u8e3s4) {
    return this.k1r((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtList) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ArrayListSerializer).m1r = function (_this__u8e3s4, size) {
    return _this__u8e3s4.l5(size);
  };
  protoOf(ArrayListSerializer).n1r = function (_this__u8e3s4, size) {
    return this.m1r(_this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE(), size);
  };
  protoOf(ArrayListSerializer).o1r = function (_this__u8e3s4, index, element) {
    _this__u8e3s4.d2(index, element);
  };
  protoOf(ArrayListSerializer).p1r = function (_this__u8e3s4, index, element) {
    var tmp = _this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE();
    return this.o1r(tmp, index, (element == null ? true : !(element == null)) ? element : THROW_CCE());
  };
  function HashSetSerializer(eSerializer) {
    CollectionSerializer.call(this, eSerializer);
    this.a1s_1 = new HashSetClassDesc(eSerializer.w1k());
  }
  protoOf(HashSetSerializer).w1k = function () {
    return this.a1s_1;
  };
  protoOf(HashSetSerializer).f1r = function () {
    return HashSet_init_$Create$();
  };
  protoOf(HashSetSerializer).b1s = function (_this__u8e3s4) {
    return _this__u8e3s4.m();
  };
  protoOf(HashSetSerializer).h1r = function (_this__u8e3s4) {
    return this.b1s(_this__u8e3s4 instanceof HashSet ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(HashSetSerializer).c1s = function (_this__u8e3s4) {
    return _this__u8e3s4;
  };
  protoOf(HashSetSerializer).j1r = function (_this__u8e3s4) {
    return this.c1s(_this__u8e3s4 instanceof HashSet ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(HashSetSerializer).d1s = function (_this__u8e3s4) {
    var tmp0_elvis_lhs = _this__u8e3s4 instanceof HashSet ? _this__u8e3s4 : null;
    return tmp0_elvis_lhs == null ? HashSet_init_$Create$_0(_this__u8e3s4) : tmp0_elvis_lhs;
  };
  protoOf(HashSetSerializer).l1r = function (_this__u8e3s4) {
    return this.d1s((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtSet) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(HashSetSerializer).e1s = function (_this__u8e3s4, size) {
  };
  protoOf(HashSetSerializer).n1r = function (_this__u8e3s4, size) {
    return this.e1s(_this__u8e3s4 instanceof HashSet ? _this__u8e3s4 : THROW_CCE(), size);
  };
  protoOf(HashSetSerializer).f1s = function (_this__u8e3s4, index, element) {
    _this__u8e3s4.e(element);
  };
  protoOf(HashSetSerializer).p1r = function (_this__u8e3s4, index, element) {
    var tmp = _this__u8e3s4 instanceof HashSet ? _this__u8e3s4 : THROW_CCE();
    return this.f1s(tmp, index, (element == null ? true : !(element == null)) ? element : THROW_CCE());
  };
  function LinkedHashSetSerializer(eSerializer) {
    CollectionSerializer.call(this, eSerializer);
    this.h1s_1 = new LinkedHashSetClassDesc(eSerializer.w1k());
  }
  protoOf(LinkedHashSetSerializer).w1k = function () {
    return this.h1s_1;
  };
  protoOf(LinkedHashSetSerializer).f1r = function () {
    // Inline function 'kotlin.collections.linkedSetOf' call
    return LinkedHashSet_init_$Create$();
  };
  protoOf(LinkedHashSetSerializer).i1s = function (_this__u8e3s4) {
    return _this__u8e3s4.m();
  };
  protoOf(LinkedHashSetSerializer).h1r = function (_this__u8e3s4) {
    return this.i1s(_this__u8e3s4 instanceof LinkedHashSet ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashSetSerializer).j1s = function (_this__u8e3s4) {
    return _this__u8e3s4;
  };
  protoOf(LinkedHashSetSerializer).j1r = function (_this__u8e3s4) {
    return this.j1s(_this__u8e3s4 instanceof LinkedHashSet ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashSetSerializer).d1s = function (_this__u8e3s4) {
    var tmp0_elvis_lhs = _this__u8e3s4 instanceof LinkedHashSet ? _this__u8e3s4 : null;
    return tmp0_elvis_lhs == null ? LinkedHashSet_init_$Create$_0(_this__u8e3s4) : tmp0_elvis_lhs;
  };
  protoOf(LinkedHashSetSerializer).l1r = function (_this__u8e3s4) {
    return this.d1s((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtSet) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashSetSerializer).k1s = function (_this__u8e3s4, size) {
  };
  protoOf(LinkedHashSetSerializer).n1r = function (_this__u8e3s4, size) {
    return this.k1s(_this__u8e3s4 instanceof LinkedHashSet ? _this__u8e3s4 : THROW_CCE(), size);
  };
  protoOf(LinkedHashSetSerializer).l1s = function (_this__u8e3s4, index, element) {
    _this__u8e3s4.e(element);
  };
  protoOf(LinkedHashSetSerializer).p1r = function (_this__u8e3s4, index, element) {
    var tmp = _this__u8e3s4 instanceof LinkedHashSet ? _this__u8e3s4 : THROW_CCE();
    return this.l1s(tmp, index, (element == null ? true : !(element == null)) ? element : THROW_CCE());
  };
  function HashMapSerializer(kSerializer, vSerializer) {
    MapLikeSerializer.call(this, kSerializer, vSerializer);
    this.o1s_1 = new HashMapClassDesc(kSerializer.w1k(), vSerializer.w1k());
  }
  protoOf(HashMapSerializer).w1k = function () {
    return this.o1s_1;
  };
  protoOf(HashMapSerializer).p1s = function (_this__u8e3s4) {
    return _this__u8e3s4.m();
  };
  protoOf(HashMapSerializer).q1s = function (_this__u8e3s4) {
    return this.p1s((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtMap) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(HashMapSerializer).r1s = function (_this__u8e3s4) {
    // Inline function 'kotlin.collections.iterator' call
    return _this__u8e3s4.u().j();
  };
  protoOf(HashMapSerializer).s1s = function (_this__u8e3s4) {
    return this.r1s((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtMap) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(HashMapSerializer).f1r = function () {
    return HashMap_init_$Create$();
  };
  protoOf(HashMapSerializer).t1s = function (_this__u8e3s4) {
    return imul(_this__u8e3s4.m(), 2);
  };
  protoOf(HashMapSerializer).h1r = function (_this__u8e3s4) {
    return this.t1s(_this__u8e3s4 instanceof HashMap ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(HashMapSerializer).u1s = function (_this__u8e3s4) {
    return _this__u8e3s4;
  };
  protoOf(HashMapSerializer).j1r = function (_this__u8e3s4) {
    return this.u1s(_this__u8e3s4 instanceof HashMap ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(HashMapSerializer).v1s = function (_this__u8e3s4) {
    var tmp0_elvis_lhs = _this__u8e3s4 instanceof HashMap ? _this__u8e3s4 : null;
    return tmp0_elvis_lhs == null ? HashMap_init_$Create$_0(_this__u8e3s4) : tmp0_elvis_lhs;
  };
  protoOf(HashMapSerializer).l1r = function (_this__u8e3s4) {
    return this.v1s((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtMap) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(HashMapSerializer).w1s = function (_this__u8e3s4, size) {
  };
  protoOf(HashMapSerializer).n1r = function (_this__u8e3s4, size) {
    return this.w1s(_this__u8e3s4 instanceof HashMap ? _this__u8e3s4 : THROW_CCE(), size);
  };
  function LinkedHashMapSerializer(kSerializer, vSerializer) {
    MapLikeSerializer.call(this, kSerializer, vSerializer);
    this.d1t_1 = new LinkedHashMapClassDesc(kSerializer.w1k(), vSerializer.w1k());
  }
  protoOf(LinkedHashMapSerializer).w1k = function () {
    return this.d1t_1;
  };
  protoOf(LinkedHashMapSerializer).p1s = function (_this__u8e3s4) {
    return _this__u8e3s4.m();
  };
  protoOf(LinkedHashMapSerializer).q1s = function (_this__u8e3s4) {
    return this.p1s((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtMap) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashMapSerializer).r1s = function (_this__u8e3s4) {
    // Inline function 'kotlin.collections.iterator' call
    return _this__u8e3s4.u().j();
  };
  protoOf(LinkedHashMapSerializer).s1s = function (_this__u8e3s4) {
    return this.r1s((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtMap) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashMapSerializer).f1r = function () {
    return LinkedHashMap_init_$Create$();
  };
  protoOf(LinkedHashMapSerializer).e1t = function (_this__u8e3s4) {
    return imul(_this__u8e3s4.m(), 2);
  };
  protoOf(LinkedHashMapSerializer).h1r = function (_this__u8e3s4) {
    return this.e1t(_this__u8e3s4 instanceof LinkedHashMap ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashMapSerializer).f1t = function (_this__u8e3s4) {
    return _this__u8e3s4;
  };
  protoOf(LinkedHashMapSerializer).j1r = function (_this__u8e3s4) {
    return this.f1t(_this__u8e3s4 instanceof LinkedHashMap ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashMapSerializer).v1s = function (_this__u8e3s4) {
    var tmp0_elvis_lhs = _this__u8e3s4 instanceof LinkedHashMap ? _this__u8e3s4 : null;
    return tmp0_elvis_lhs == null ? LinkedHashMap_init_$Create$_1(_this__u8e3s4) : tmp0_elvis_lhs;
  };
  protoOf(LinkedHashMapSerializer).l1r = function (_this__u8e3s4) {
    return this.v1s((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtMap) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashMapSerializer).g1t = function (_this__u8e3s4, size) {
  };
  protoOf(LinkedHashMapSerializer).n1r = function (_this__u8e3s4, size) {
    return this.g1t(_this__u8e3s4 instanceof LinkedHashMap ? _this__u8e3s4 : THROW_CCE(), size);
  };
  function ReferenceArraySerializer(kClass, eSerializer) {
    CollectionLikeSerializer.call(this, eSerializer);
    this.i1t_1 = kClass;
    this.j1t_1 = new ArrayClassDesc(eSerializer.w1k());
  }
  protoOf(ReferenceArraySerializer).w1k = function () {
    return this.j1t_1;
  };
  protoOf(ReferenceArraySerializer).k1t = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(ReferenceArraySerializer).q1s = function (_this__u8e3s4) {
    return this.k1t((!(_this__u8e3s4 == null) ? isArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ReferenceArraySerializer).l1t = function (_this__u8e3s4) {
    return arrayIterator(_this__u8e3s4);
  };
  protoOf(ReferenceArraySerializer).s1s = function (_this__u8e3s4) {
    return this.l1t((!(_this__u8e3s4 == null) ? isArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ReferenceArraySerializer).f1r = function () {
    // Inline function 'kotlin.collections.arrayListOf' call
    return ArrayList_init_$Create$_0();
  };
  protoOf(ReferenceArraySerializer).m1t = function (_this__u8e3s4) {
    return _this__u8e3s4.m();
  };
  protoOf(ReferenceArraySerializer).h1r = function (_this__u8e3s4) {
    return this.m1t(_this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ReferenceArraySerializer).n1t = function (_this__u8e3s4) {
    return toNativeArrayImpl(_this__u8e3s4, this.i1t_1);
  };
  protoOf(ReferenceArraySerializer).j1r = function (_this__u8e3s4) {
    return this.n1t(_this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ReferenceArraySerializer).o1t = function (_this__u8e3s4) {
    return ArrayList_init_$Create$_1(asList(_this__u8e3s4));
  };
  protoOf(ReferenceArraySerializer).l1r = function (_this__u8e3s4) {
    return this.o1t((!(_this__u8e3s4 == null) ? isArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ReferenceArraySerializer).p1t = function (_this__u8e3s4, size) {
    return _this__u8e3s4.l5(size);
  };
  protoOf(ReferenceArraySerializer).n1r = function (_this__u8e3s4, size) {
    return this.p1t(_this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE(), size);
  };
  protoOf(ReferenceArraySerializer).q1t = function (_this__u8e3s4, index, element) {
    _this__u8e3s4.d2(index, element);
  };
  protoOf(ReferenceArraySerializer).p1r = function (_this__u8e3s4, index, element) {
    var tmp = _this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE();
    return this.q1t(tmp, index, (element == null ? true : !(element == null)) ? element : THROW_CCE());
  };
  function CollectionSerializer(element) {
    CollectionLikeSerializer.call(this, element);
  }
  protoOf(CollectionSerializer).r1r = function (_this__u8e3s4) {
    return _this__u8e3s4.m();
  };
  protoOf(CollectionSerializer).q1s = function (_this__u8e3s4) {
    return this.r1r((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, Collection) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(CollectionSerializer).s1r = function (_this__u8e3s4) {
    return _this__u8e3s4.j();
  };
  protoOf(CollectionSerializer).s1s = function (_this__u8e3s4) {
    return this.s1r((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, Collection) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  function MapLikeSerializer(keySerializer, valueSerializer) {
    AbstractCollectionSerializer.call(this);
    this.x1s_1 = keySerializer;
    this.y1s_1 = valueSerializer;
  }
  protoOf(MapLikeSerializer).z1s = function (decoder, builder, startIndex, size) {
    // Inline function 'kotlin.require' call
    if (!(size >= 0)) {
      var message = 'Size must be known in advance when using READ_ALL';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    var progression = step(until(0, imul(size, 2)), 2);
    var inductionVariable = progression.c1_1;
    var last = progression.d1_1;
    var step_0 = progression.e1_1;
    if (step_0 > 0 && inductionVariable <= last || (step_0 < 0 && last <= inductionVariable))
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + step_0 | 0;
        this.a1t(decoder, startIndex + index | 0, builder, false);
      }
       while (!(index === last));
  };
  protoOf(MapLikeSerializer).v1r = function (decoder, builder, startIndex, size) {
    return this.z1s(decoder, (!(builder == null) ? isInterface(builder, KtMutableMap) : false) ? builder : THROW_CCE(), startIndex, size);
  };
  protoOf(MapLikeSerializer).a1t = function (decoder, index, builder, checkIndex) {
    var key = decoder.s1o(this.w1k(), index, this.x1s_1);
    var tmp;
    if (checkIndex) {
      // Inline function 'kotlin.also' call
      var this_0 = decoder.w1o(this.w1k());
      // Inline function 'kotlin.require' call
      if (!(this_0 === (index + 1 | 0))) {
        var message = 'Value must follow key in a map, index for key: ' + index + ', returned index for value: ' + this_0;
        throw IllegalArgumentException_init_$Create$(toString(message));
      }
      tmp = this_0;
    } else {
      tmp = index + 1 | 0;
    }
    var vIndex = tmp;
    var tmp_0;
    var tmp_1;
    if (builder.f2(key)) {
      var tmp_2 = this.y1s_1.w1k().j1m();
      tmp_1 = !(tmp_2 instanceof PrimitiveKind);
    } else {
      tmp_1 = false;
    }
    if (tmp_1) {
      tmp_0 = decoder.r1o(this.w1k(), vIndex, this.y1s_1, getValue(builder, key));
    } else {
      tmp_0 = decoder.s1o(this.w1k(), vIndex, this.y1s_1);
    }
    var value = tmp_0;
    // Inline function 'kotlin.collections.set' call
    builder.k2(key, value);
  };
  protoOf(MapLikeSerializer).w1r = function (decoder, index, builder, checkIndex) {
    return this.a1t(decoder, index, (!(builder == null) ? isInterface(builder, KtMutableMap) : false) ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(MapLikeSerializer).u1r = function (encoder, value) {
    var size = this.q1s(value);
    // Inline function 'kotlinx.serialization.encoding.encodeCollection' call
    var descriptor = this.w1k();
    var composite = encoder.b1q(descriptor, size);
    var iterator = this.s1s(value);
    var index = 0;
    // Inline function 'kotlin.collections.forEach' call
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s = iterator;
    while (_iterator__ex2g4s.k()) {
      var element = _iterator__ex2g4s.l();
      // Inline function 'kotlin.collections.component1' call
      var k = element.v();
      // Inline function 'kotlin.collections.component2' call
      var v = element.w();
      var tmp = this.w1k();
      var _unary__edvuaz = index;
      index = _unary__edvuaz + 1 | 0;
      composite.w1p(tmp, _unary__edvuaz, this.x1s_1, k);
      var tmp_0 = this.w1k();
      var _unary__edvuaz_0 = index;
      index = _unary__edvuaz_0 + 1 | 0;
      composite.w1p(tmp_0, _unary__edvuaz_0, this.y1s_1, v);
    }
    composite.g1o(descriptor);
  };
  protoOf(MapLikeSerializer).x1k = function (encoder, value) {
    return this.u1r(encoder, (value == null ? true : !(value == null)) ? value : THROW_CCE());
  };
  function CollectionLikeSerializer(elementSerializer) {
    AbstractCollectionSerializer.call(this);
    this.t1r_1 = elementSerializer;
  }
  protoOf(CollectionLikeSerializer).u1r = function (encoder, value) {
    var size = this.q1s(value);
    // Inline function 'kotlinx.serialization.encoding.encodeCollection' call
    var descriptor = this.w1k();
    var composite = encoder.b1q(descriptor, size);
    var iterator = this.s1s(value);
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        composite.w1p(this.w1k(), index, this.t1r_1, iterator.l());
      }
       while (inductionVariable < size);
    composite.g1o(descriptor);
  };
  protoOf(CollectionLikeSerializer).x1k = function (encoder, value) {
    return this.u1r(encoder, (value == null ? true : !(value == null)) ? value : THROW_CCE());
  };
  protoOf(CollectionLikeSerializer).v1r = function (decoder, builder, startIndex, size) {
    // Inline function 'kotlin.require' call
    if (!(size >= 0)) {
      var message = 'Size must be known in advance when using READ_ALL';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        this.w1r(decoder, startIndex + index | 0, builder, false);
      }
       while (inductionVariable < size);
  };
  protoOf(CollectionLikeSerializer).w1r = function (decoder, index, builder, checkIndex) {
    this.p1r(builder, index, decoder.s1o(this.w1k(), index, this.t1r_1));
  };
  function readSize($this, decoder, builder) {
    var size = decoder.x1o($this.w1k());
    $this.n1r(builder, size);
    return size;
  }
  function AbstractCollectionSerializer() {
  }
  protoOf(AbstractCollectionSerializer).y1r = function (decoder, previous) {
    var tmp1_elvis_lhs = previous == null ? null : this.l1r(previous);
    var builder = tmp1_elvis_lhs == null ? this.f1r() : tmp1_elvis_lhs;
    var startIndex = this.h1r(builder);
    var compositeDecoder = decoder.f1o(this.w1k());
    if (compositeDecoder.v1o()) {
      this.v1r(compositeDecoder, builder, startIndex, readSize(this, compositeDecoder, builder));
    } else {
      $l$loop: while (true) {
        var index = compositeDecoder.w1o(this.w1k());
        if (index === -1)
          break $l$loop;
        this.x1r(compositeDecoder, startIndex + index | 0, builder);
      }
    }
    compositeDecoder.g1o(this.w1k());
    return this.j1r(builder);
  };
  protoOf(AbstractCollectionSerializer).y1k = function (decoder) {
    return this.y1r(decoder, null);
  };
  protoOf(AbstractCollectionSerializer).x1r = function (decoder, index, builder, checkIndex, $super) {
    checkIndex = checkIndex === VOID ? true : checkIndex;
    var tmp;
    if ($super === VOID) {
      this.w1r(decoder, index, builder, checkIndex);
      tmp = Unit_instance;
    } else {
      tmp = $super.w1r.call(this, decoder, index, builder, checkIndex);
    }
    return tmp;
  };
  function PrimitiveArraySerializer(primitiveSerializer) {
    CollectionLikeSerializer.call(this, primitiveSerializer);
    this.s1t_1 = new PrimitiveArrayDescriptor(primitiveSerializer.w1k());
  }
  protoOf(PrimitiveArraySerializer).w1k = function () {
    return this.s1t_1;
  };
  protoOf(PrimitiveArraySerializer).t1t = function (_this__u8e3s4) {
    return _this__u8e3s4.u1t();
  };
  protoOf(PrimitiveArraySerializer).h1r = function (_this__u8e3s4) {
    return this.t1t(_this__u8e3s4 instanceof PrimitiveArrayBuilder ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(PrimitiveArraySerializer).v1t = function (_this__u8e3s4) {
    return _this__u8e3s4.w1t();
  };
  protoOf(PrimitiveArraySerializer).j1r = function (_this__u8e3s4) {
    return this.v1t(_this__u8e3s4 instanceof PrimitiveArrayBuilder ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(PrimitiveArraySerializer).x1t = function (_this__u8e3s4, size) {
    return _this__u8e3s4.y1t(size);
  };
  protoOf(PrimitiveArraySerializer).n1r = function (_this__u8e3s4, size) {
    return this.x1t(_this__u8e3s4 instanceof PrimitiveArrayBuilder ? _this__u8e3s4 : THROW_CCE(), size);
  };
  protoOf(PrimitiveArraySerializer).z1t = function (_this__u8e3s4) {
    var message = 'This method lead to boxing and must not be used, use writeContents instead';
    throw IllegalStateException_init_$Create$(toString(message));
  };
  protoOf(PrimitiveArraySerializer).s1s = function (_this__u8e3s4) {
    return this.z1t((_this__u8e3s4 == null ? true : !(_this__u8e3s4 == null)) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(PrimitiveArraySerializer).a1u = function (_this__u8e3s4, index, element) {
    var message = 'This method lead to boxing and must not be used, use Builder.append instead';
    throw IllegalStateException_init_$Create$(toString(message));
  };
  protoOf(PrimitiveArraySerializer).p1r = function (_this__u8e3s4, index, element) {
    var tmp = _this__u8e3s4 instanceof PrimitiveArrayBuilder ? _this__u8e3s4 : THROW_CCE();
    return this.a1u(tmp, index, (element == null ? true : !(element == null)) ? element : THROW_CCE());
  };
  protoOf(PrimitiveArraySerializer).f1r = function () {
    return this.l1r(this.b1u());
  };
  protoOf(PrimitiveArraySerializer).e1u = function (encoder, value) {
    var size = this.q1s(value);
    // Inline function 'kotlinx.serialization.encoding.encodeCollection' call
    var descriptor = this.s1t_1;
    var composite = encoder.b1q(descriptor, size);
    this.d1u(composite, value, size);
    composite.g1o(descriptor);
  };
  protoOf(PrimitiveArraySerializer).x1k = function (encoder, value) {
    return this.e1u(encoder, (value == null ? true : !(value == null)) ? value : THROW_CCE());
  };
  protoOf(PrimitiveArraySerializer).u1r = function (encoder, value) {
    return this.e1u(encoder, (value == null ? true : !(value == null)) ? value : THROW_CCE());
  };
  protoOf(PrimitiveArraySerializer).y1k = function (decoder) {
    return this.y1r(decoder, null);
  };
  function PrimitiveArrayBuilder() {
  }
  protoOf(PrimitiveArrayBuilder).f1u = function (requiredCapacity, $super) {
    requiredCapacity = requiredCapacity === VOID ? this.u1t() + 1 | 0 : requiredCapacity;
    var tmp;
    if ($super === VOID) {
      this.y1t(requiredCapacity);
      tmp = Unit_instance;
    } else {
      tmp = $super.y1t.call(this, requiredCapacity);
    }
    return tmp;
  };
  function Companion() {
    Companion_instance_0 = this;
    this.g1u_1 = longArray(0);
  }
  var Companion_instance_0;
  function Companion_getInstance_7() {
    if (Companion_instance_0 == null)
      new Companion();
    return Companion_instance_0;
  }
  function prepareHighMarksArray($this, elementsCount) {
    var slotsCount = (elementsCount - 1 | 0) >>> 6 | 0;
    var elementsInLastSlot = elementsCount & 63;
    var highMarks = longArray(slotsCount);
    if (!(elementsInLastSlot === 0)) {
      highMarks[get_lastIndex(highMarks)] = (new Long(-1, -1)).d3(elementsCount);
    }
    return highMarks;
  }
  function markHigh($this, index) {
    var slot = (index >>> 6 | 0) - 1 | 0;
    var offsetInSlot = index & 63;
    $this.k1u_1[slot] = $this.k1u_1[slot].h3((new Long(1, 0)).d3(offsetInSlot));
  }
  function nextUnmarkedHighIndex($this) {
    var inductionVariable = 0;
    var last = $this.k1u_1.length - 1 | 0;
    if (inductionVariable <= last)
      do {
        var slot = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var slotOffset = imul(slot + 1 | 0, 64);
        var slotMarks = $this.k1u_1[slot];
        while (!slotMarks.equals(new Long(-1, -1))) {
          var indexInSlot = countTrailingZeroBits(slotMarks.c3());
          slotMarks = slotMarks.h3((new Long(1, 0)).d3(indexInSlot));
          var index = slotOffset + indexInSlot | 0;
          if ($this.i1u_1($this.h1u_1, index)) {
            $this.k1u_1[slot] = slotMarks;
            return index;
          }
        }
        $this.k1u_1[slot] = slotMarks;
      }
       while (inductionVariable <= last);
    return -1;
  }
  function ElementMarker(descriptor, readIfAbsent) {
    Companion_getInstance_7();
    this.h1u_1 = descriptor;
    this.i1u_1 = readIfAbsent;
    var elementsCount = this.h1u_1.l1m();
    if (elementsCount <= 64) {
      var tmp = this;
      var tmp_0;
      if (elementsCount === 64) {
        tmp_0 = new Long(0, 0);
      } else {
        tmp_0 = (new Long(-1, -1)).d3(elementsCount);
      }
      tmp.j1u_1 = tmp_0;
      this.k1u_1 = Companion_getInstance_7().g1u_1;
    } else {
      this.j1u_1 = new Long(0, 0);
      this.k1u_1 = prepareHighMarksArray(this, elementsCount);
    }
  }
  protoOf(ElementMarker).l1u = function (index) {
    if (index < 64) {
      this.j1u_1 = this.j1u_1.h3((new Long(1, 0)).d3(index));
    } else {
      markHigh(this, index);
    }
  };
  protoOf(ElementMarker).m1u = function () {
    var elementsCount = this.h1u_1.l1m();
    while (!this.j1u_1.equals(new Long(-1, -1))) {
      var index = countTrailingZeroBits(this.j1u_1.c3());
      this.j1u_1 = this.j1u_1.h3((new Long(1, 0)).d3(index));
      if (this.i1u_1(this.h1u_1, index)) {
        return index;
      }
    }
    if (elementsCount > 64) {
      return nextUnmarkedHighIndex(this);
    }
    return -1;
  };
  function createSimpleEnumSerializer(serialName, values) {
    return new EnumSerializer(serialName, values);
  }
  function createAnnotatedEnumSerializer(serialName, values, names, entryAnnotations, classAnnotations) {
    var descriptor = new EnumDescriptor(serialName, values.length);
    if (classAnnotations == null)
      null;
    else {
      // Inline function 'kotlin.collections.forEach' call
      var inductionVariable = 0;
      var last = classAnnotations.length;
      while (inductionVariable < last) {
        var element = classAnnotations[inductionVariable];
        inductionVariable = inductionVariable + 1 | 0;
        descriptor.z1u(element);
      }
    }
    // Inline function 'kotlin.collections.forEachIndexed' call
    var index = 0;
    var inductionVariable_0 = 0;
    var last_0 = values.length;
    while (inductionVariable_0 < last_0) {
      var item = values[inductionVariable_0];
      inductionVariable_0 = inductionVariable_0 + 1 | 0;
      var _unary__edvuaz = index;
      index = _unary__edvuaz + 1 | 0;
      var tmp0_elvis_lhs = getOrNull(names, _unary__edvuaz);
      var elementName = tmp0_elvis_lhs == null ? item.n2_1 : tmp0_elvis_lhs;
      descriptor.a1v(elementName);
      var tmp1_safe_receiver = getOrNull(entryAnnotations, _unary__edvuaz);
      if (tmp1_safe_receiver == null)
        null;
      else {
        // Inline function 'kotlin.collections.forEach' call
        var inductionVariable_1 = 0;
        var last_1 = tmp1_safe_receiver.length;
        while (inductionVariable_1 < last_1) {
          var element_0 = tmp1_safe_receiver[inductionVariable_1];
          inductionVariable_1 = inductionVariable_1 + 1 | 0;
          descriptor.b1v(element_0);
        }
      }
    }
    return EnumSerializer_init_$Create$(serialName, values, descriptor);
  }
  function EnumSerializer_init_$Init$(serialName, values, descriptor, $this) {
    EnumSerializer.call($this, serialName, values);
    $this.d1v_1 = descriptor;
    return $this;
  }
  function EnumSerializer_init_$Create$(serialName, values, descriptor) {
    return EnumSerializer_init_$Init$(serialName, values, descriptor, objectCreate(protoOf(EnumSerializer)));
  }
  function createUnmarkedDescriptor($this, serialName) {
    var d = new EnumDescriptor(serialName, $this.c1v_1.length);
    // Inline function 'kotlin.collections.forEach' call
    var indexedObject = $this.c1v_1;
    var inductionVariable = 0;
    var last = indexedObject.length;
    while (inductionVariable < last) {
      var element = indexedObject[inductionVariable];
      inductionVariable = inductionVariable + 1 | 0;
      d.a1v(element.n2_1);
    }
    return d;
  }
  function EnumSerializer$descriptor$delegate$lambda(this$0, $serialName) {
    return function () {
      var tmp0_elvis_lhs = this$0.d1v_1;
      return tmp0_elvis_lhs == null ? createUnmarkedDescriptor(this$0, $serialName) : tmp0_elvis_lhs;
    };
  }
  function EnumSerializer(serialName, values) {
    this.c1v_1 = values;
    this.d1v_1 = null;
    var tmp = this;
    tmp.e1v_1 = lazy_0(EnumSerializer$descriptor$delegate$lambda(this, serialName));
  }
  protoOf(EnumSerializer).w1k = function () {
    var tmp0 = this.e1v_1;
    // Inline function 'kotlin.getValue' call
    descriptor$factory_1();
    return tmp0.w();
  };
  protoOf(EnumSerializer).f1v = function (encoder, value) {
    var index = indexOf(this.c1v_1, value);
    if (index === -1) {
      throw SerializationException_init_$Create$_0(toString(value) + ' is not a valid enum ' + this.w1k().x1l() + ', ' + ('must be one of ' + contentToString(this.c1v_1)));
    }
    encoder.k1p(this.w1k(), index);
  };
  protoOf(EnumSerializer).x1k = function (encoder, value) {
    return this.f1v(encoder, value instanceof Enum ? value : THROW_CCE());
  };
  protoOf(EnumSerializer).y1k = function (decoder) {
    var index = decoder.b1o(this.w1k());
    if (!(0 <= index ? index <= (this.c1v_1.length - 1 | 0) : false)) {
      throw SerializationException_init_$Create$_0('' + index + ' is not among valid ' + this.w1k().x1l() + ' enum values, ' + ('values size is ' + this.c1v_1.length));
    }
    return this.c1v_1[index];
  };
  protoOf(EnumSerializer).toString = function () {
    return 'kotlinx.serialization.internal.EnumSerializer<' + this.w1k().x1l() + '>';
  };
  function _get_elementDescriptors__y23q9p($this) {
    var tmp0 = $this.t1v_1;
    // Inline function 'kotlin.getValue' call
    elementDescriptors$factory();
    return tmp0.w();
  }
  function EnumDescriptor$elementDescriptors$delegate$lambda($elementsCount, $name, this$0) {
    return function () {
      var tmp = 0;
      var tmp_0 = $elementsCount;
      // Inline function 'kotlin.arrayOfNulls' call
      var tmp_1 = Array(tmp_0);
      while (tmp < tmp_0) {
        var tmp_2 = tmp;
        tmp_1[tmp_2] = buildSerialDescriptor($name + '.' + this$0.n1m(tmp_2), OBJECT_getInstance(), []);
        tmp = tmp + 1 | 0;
      }
      return tmp_1;
    };
  }
  function EnumDescriptor(name, elementsCount) {
    PluginGeneratedSerialDescriptor.call(this, name, VOID, elementsCount);
    this.s1v_1 = ENUM_getInstance();
    var tmp = this;
    tmp.t1v_1 = lazy_0(EnumDescriptor$elementDescriptors$delegate$lambda(elementsCount, name, this));
  }
  protoOf(EnumDescriptor).j1m = function () {
    return this.s1v_1;
  };
  protoOf(EnumDescriptor).q1m = function (index) {
    return getChecked(_get_elementDescriptors__y23q9p(this), index);
  };
  protoOf(EnumDescriptor).equals = function (other) {
    if (this === other)
      return true;
    if (other == null)
      return false;
    if (!(!(other == null) ? isInterface(other, SerialDescriptor) : false))
      return false;
    if (!(other.j1m() === ENUM_getInstance()))
      return false;
    if (!(this.x1l() === other.x1l()))
      return false;
    if (!equals(cachedSerialNames(this), cachedSerialNames(other)))
      return false;
    return true;
  };
  protoOf(EnumDescriptor).toString = function () {
    return joinToString(get_elementNames(this), ', ', this.x1l() + '(', ')');
  };
  protoOf(EnumDescriptor).hashCode = function () {
    var result = getStringHashCode(this.x1l());
    // Inline function 'kotlinx.serialization.internal.elementsHashCodeBy' call
    // Inline function 'kotlin.collections.fold' call
    var accumulator = 1;
    var _iterator__ex2g4s = get_elementNames(this).j();
    while (_iterator__ex2g4s.k()) {
      var element = _iterator__ex2g4s.l();
      var hash = accumulator;
      var tmp = imul(31, hash);
      // Inline function 'kotlin.hashCode' call
      var tmp1_elvis_lhs = element == null ? null : hashCode(element);
      accumulator = tmp + (tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs) | 0;
    }
    var elementsHashCode = accumulator;
    result = imul(31, result) + elementsHashCode | 0;
    return result;
  };
  function descriptor$factory_1() {
    return getPropertyCallableRef('descriptor', 1, KProperty1, function (receiver) {
      return receiver.w1k();
    }, null);
  }
  function elementDescriptors$factory() {
    return getPropertyCallableRef('elementDescriptors', 1, KProperty1, function (receiver) {
      return _get_elementDescriptors__y23q9p(receiver);
    }, null);
  }
  function InlinePrimitiveDescriptor(name, primitiveSerializer) {
    return new InlineClassDescriptor(name, new InlinePrimitiveDescriptor$1(primitiveSerializer));
  }
  function InlineClassDescriptor(name, generatedSerializer) {
    PluginGeneratedSerialDescriptor.call(this, name, generatedSerializer, 1);
    this.i1w_1 = true;
  }
  protoOf(InlineClassDescriptor).k1m = function () {
    return this.i1w_1;
  };
  protoOf(InlineClassDescriptor).hashCode = function () {
    return imul(protoOf(PluginGeneratedSerialDescriptor).hashCode.call(this), 31);
  };
  protoOf(InlineClassDescriptor).equals = function (other) {
    var tmp$ret$0;
    $l$block_5: {
      // Inline function 'kotlinx.serialization.internal.equalsImpl' call
      if (this === other) {
        tmp$ret$0 = true;
        break $l$block_5;
      }
      if (!(other instanceof InlineClassDescriptor)) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      if (!(this.x1l() === other.x1l())) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      if (!(other.i1w_1 && contentEquals(this.u1v(), other.u1v()))) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      if (!(this.l1m() === other.l1m())) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      var inductionVariable = 0;
      var last = this.l1m();
      if (inductionVariable < last)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          if (!(this.q1m(index).x1l() === other.q1m(index).x1l())) {
            tmp$ret$0 = false;
            break $l$block_5;
          }
          if (!equals(this.q1m(index).j1m(), other.q1m(index).j1m())) {
            tmp$ret$0 = false;
            break $l$block_5;
          }
        }
         while (inductionVariable < last);
      tmp$ret$0 = true;
    }
    return tmp$ret$0;
  };
  function InlinePrimitiveDescriptor$1($primitiveSerializer) {
    this.j1w_1 = $primitiveSerializer;
  }
  protoOf(InlinePrimitiveDescriptor$1).k1w = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [this.j1w_1];
  };
  protoOf(InlinePrimitiveDescriptor$1).w1k = function () {
    var message = 'unsupported';
    throw IllegalStateException_init_$Create$(toString(message));
  };
  protoOf(InlinePrimitiveDescriptor$1).x1k = function (encoder, value) {
    // Inline function 'kotlin.error' call
    var message = 'unsupported';
    throw IllegalStateException_init_$Create$(toString(message));
  };
  protoOf(InlinePrimitiveDescriptor$1).y1k = function (decoder) {
    // Inline function 'kotlin.error' call
    var message = 'unsupported';
    throw IllegalStateException_init_$Create$(toString(message));
  };
  function jsonCachedSerialNames(_this__u8e3s4) {
    return cachedSerialNames(_this__u8e3s4);
  }
  function NoOpEncoder() {
    NoOpEncoder_instance = this;
    AbstractEncoder.call(this);
    this.m1w_1 = EmptySerializersModule_0();
  }
  protoOf(NoOpEncoder).u1o = function () {
    return this.m1w_1;
  };
  protoOf(NoOpEncoder).z1o = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).a1p = function () {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).b1p = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).c1p = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).d1p = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).e1p = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).f1p = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).g1p = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).h1p = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).i1p = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).j1p = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).k1p = function (enumDescriptor, index) {
    return Unit_instance;
  };
  var NoOpEncoder_instance;
  function NoOpEncoder_getInstance() {
    if (NoOpEncoder_instance == null)
      new NoOpEncoder();
    return NoOpEncoder_instance;
  }
  function error($this) {
    throw IllegalStateException_init_$Create$('Descriptor for type `kotlin.Nothing` does not have elements');
  }
  function NothingSerialDescriptor() {
    NothingSerialDescriptor_instance = this;
    this.n1w_1 = OBJECT_getInstance();
    this.o1w_1 = 'kotlin.Nothing';
  }
  protoOf(NothingSerialDescriptor).j1m = function () {
    return this.n1w_1;
  };
  protoOf(NothingSerialDescriptor).x1l = function () {
    return this.o1w_1;
  };
  protoOf(NothingSerialDescriptor).l1m = function () {
    return 0;
  };
  protoOf(NothingSerialDescriptor).n1m = function (index) {
    error(this);
  };
  protoOf(NothingSerialDescriptor).o1m = function (name) {
    error(this);
  };
  protoOf(NothingSerialDescriptor).r1m = function (index) {
    error(this);
  };
  protoOf(NothingSerialDescriptor).q1m = function (index) {
    error(this);
  };
  protoOf(NothingSerialDescriptor).p1m = function (index) {
    error(this);
  };
  protoOf(NothingSerialDescriptor).toString = function () {
    return 'NothingSerialDescriptor';
  };
  protoOf(NothingSerialDescriptor).equals = function (other) {
    return this === other;
  };
  protoOf(NothingSerialDescriptor).hashCode = function () {
    return getStringHashCode(this.o1w_1) + imul(31, this.n1w_1.hashCode()) | 0;
  };
  var NothingSerialDescriptor_instance;
  function NothingSerialDescriptor_getInstance() {
    if (NothingSerialDescriptor_instance == null)
      new NothingSerialDescriptor();
    return NothingSerialDescriptor_instance;
  }
  function NullableSerializer(serializer) {
    this.p1w_1 = serializer;
    this.q1w_1 = new SerialDescriptorForNullable(this.p1w_1.w1k());
  }
  protoOf(NullableSerializer).w1k = function () {
    return this.q1w_1;
  };
  protoOf(NullableSerializer).r1w = function (encoder, value) {
    if (!(value == null)) {
      encoder.a1q();
      encoder.x1p(this.p1w_1, value);
    } else {
      encoder.a1p();
    }
  };
  protoOf(NullableSerializer).x1k = function (encoder, value) {
    return this.r1w(encoder, (value == null ? true : !(value == null)) ? value : THROW_CCE());
  };
  protoOf(NullableSerializer).y1k = function (decoder) {
    return decoder.q1n() ? decoder.e1o(this.p1w_1) : decoder.r1n();
  };
  protoOf(NullableSerializer).equals = function (other) {
    if (this === other)
      return true;
    if (other == null || !getKClassFromExpression(this).equals(getKClassFromExpression(other)))
      return false;
    if (!(other instanceof NullableSerializer))
      THROW_CCE();
    if (!equals(this.p1w_1, other.p1w_1))
      return false;
    return true;
  };
  protoOf(NullableSerializer).hashCode = function () {
    return hashCode(this.p1w_1);
  };
  function SerialDescriptorForNullable(original) {
    this.s1m_1 = original;
    this.t1m_1 = this.s1m_1.x1l() + '?';
    this.u1m_1 = cachedSerialNames(this.s1m_1);
  }
  protoOf(SerialDescriptorForNullable).x1l = function () {
    return this.t1m_1;
  };
  protoOf(SerialDescriptorForNullable).o1n = function () {
    return this.u1m_1;
  };
  protoOf(SerialDescriptorForNullable).f1m = function () {
    return true;
  };
  protoOf(SerialDescriptorForNullable).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof SerialDescriptorForNullable))
      return false;
    if (!equals(this.s1m_1, other.s1m_1))
      return false;
    return true;
  };
  protoOf(SerialDescriptorForNullable).toString = function () {
    return toString(this.s1m_1) + '?';
  };
  protoOf(SerialDescriptorForNullable).hashCode = function () {
    return imul(hashCode(this.s1m_1), 31);
  };
  protoOf(SerialDescriptorForNullable).j1m = function () {
    return this.s1m_1.j1m();
  };
  protoOf(SerialDescriptorForNullable).k1m = function () {
    return this.s1m_1.k1m();
  };
  protoOf(SerialDescriptorForNullable).l1m = function () {
    return this.s1m_1.l1m();
  };
  protoOf(SerialDescriptorForNullable).m1m = function () {
    return this.s1m_1.m1m();
  };
  protoOf(SerialDescriptorForNullable).n1m = function (index) {
    return this.s1m_1.n1m(index);
  };
  protoOf(SerialDescriptorForNullable).o1m = function (name) {
    return this.s1m_1.o1m(name);
  };
  protoOf(SerialDescriptorForNullable).p1m = function (index) {
    return this.s1m_1.p1m(index);
  };
  protoOf(SerialDescriptorForNullable).q1m = function (index) {
    return this.s1m_1.q1m(index);
  };
  protoOf(SerialDescriptorForNullable).r1m = function (index) {
    return this.s1m_1.r1m(index);
  };
  function ObjectSerializer$descriptor$delegate$lambda$lambda(this$0) {
    return function ($this$buildSerialDescriptor) {
      $this$buildSerialDescriptor.b1l_1 = this$0.t1w_1;
      return Unit_instance;
    };
  }
  function ObjectSerializer$descriptor$delegate$lambda($serialName, this$0) {
    return function () {
      var tmp = OBJECT_getInstance();
      return buildSerialDescriptor($serialName, tmp, [], ObjectSerializer$descriptor$delegate$lambda$lambda(this$0));
    };
  }
  function ObjectSerializer(serialName, objectInstance) {
    this.s1w_1 = objectInstance;
    this.t1w_1 = emptyList();
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp.u1w_1 = lazy(tmp_0, ObjectSerializer$descriptor$delegate$lambda(serialName, this));
  }
  protoOf(ObjectSerializer).w1k = function () {
    var tmp0 = this.u1w_1;
    // Inline function 'kotlin.getValue' call
    descriptor$factory_2();
    return tmp0.w();
  };
  protoOf(ObjectSerializer).m1l = function (encoder, value) {
    encoder.f1o(this.w1k()).g1o(this.w1k());
  };
  protoOf(ObjectSerializer).x1k = function (encoder, value) {
    return this.m1l(encoder, !(value == null) ? value : THROW_CCE());
  };
  protoOf(ObjectSerializer).y1k = function (decoder) {
    // Inline function 'kotlinx.serialization.encoding.decodeStructure' call
    var descriptor = this.w1k();
    var composite = decoder.f1o(descriptor);
    var tmp$ret$0;
    $l$block_0: {
      if (composite.v1o()) {
        tmp$ret$0 = Unit_instance;
        break $l$block_0;
      }
      var index = composite.w1o(this.w1k());
      if (index === -1) {
        tmp$ret$0 = Unit_instance;
        break $l$block_0;
      } else
        throw SerializationException_init_$Create$_0('Unexpected index ' + index);
    }
    var result = tmp$ret$0;
    composite.g1o(descriptor);
    return this.s1w_1;
  };
  function descriptor$factory_2() {
    return getPropertyCallableRef('descriptor', 1, KProperty1, function (receiver) {
      return receiver.w1k();
    }, null);
  }
  function get_EMPTY_DESCRIPTOR_ARRAY() {
    _init_properties_Platform_common_kt__3qzecs();
    return EMPTY_DESCRIPTOR_ARRAY;
  }
  var EMPTY_DESCRIPTOR_ARRAY;
  function cachedSerialNames(_this__u8e3s4) {
    _init_properties_Platform_common_kt__3qzecs();
    if (isInterface(_this__u8e3s4, CachedNames))
      return _this__u8e3s4.o1n();
    var result = HashSet_init_$Create$_1(_this__u8e3s4.l1m());
    var inductionVariable = 0;
    var last = _this__u8e3s4.l1m();
    if (inductionVariable < last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'kotlin.collections.plusAssign' call
        var element = _this__u8e3s4.n1m(i);
        result.e(element);
      }
       while (inductionVariable < last);
    return result;
  }
  function kclass(_this__u8e3s4) {
    _init_properties_Platform_common_kt__3qzecs();
    var t = _this__u8e3s4.ob();
    var tmp;
    if (!(t == null) ? isInterface(t, KClass) : false) {
      tmp = t;
    } else {
      if (!(t == null) ? isInterface(t, KTypeParameter) : false) {
        throw IllegalArgumentException_init_$Create$('Captured type parameter ' + toString(t) + ' from generic non-reified function. ' + ('Such functionality cannot be supported because ' + toString(t) + ' is erased, either specify serializer explicitly or make ') + ('calling function inline with reified ' + toString(t) + '.'));
      } else {
        throw IllegalArgumentException_init_$Create$('Only KClass supported as classifier, got ' + toString_0(t));
      }
    }
    var tmp_0 = tmp;
    return isInterface(tmp_0, KClass) ? tmp_0 : THROW_CCE();
  }
  function typeOrThrow(_this__u8e3s4) {
    _init_properties_Platform_common_kt__3qzecs();
    var tmp0 = _this__u8e3s4.qj_1;
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlin.requireNotNull' call
      if (tmp0 == null) {
        var message = 'Star projections in type arguments are not allowed, but had ' + toString_0(_this__u8e3s4.qj_1);
        throw IllegalArgumentException_init_$Create$(toString(message));
      } else {
        tmp$ret$1 = tmp0;
        break $l$block;
      }
    }
    return tmp$ret$1;
  }
  function notRegisteredMessage(_this__u8e3s4) {
    _init_properties_Platform_common_kt__3qzecs();
    var tmp0_elvis_lhs = _this__u8e3s4.za();
    return notRegisteredMessage_0(tmp0_elvis_lhs == null ? '<local class name not available>' : tmp0_elvis_lhs);
  }
  function compactArray(_this__u8e3s4) {
    _init_properties_Platform_common_kt__3qzecs();
    // Inline function 'kotlin.takeUnless' call
    var tmp;
    // Inline function 'kotlin.collections.isNullOrEmpty' call
    if (!(_this__u8e3s4 == null || _this__u8e3s4.p())) {
      tmp = _this__u8e3s4;
    } else {
      tmp = null;
    }
    var tmp0_safe_receiver = tmp;
    var tmp_0;
    if (tmp0_safe_receiver == null) {
      tmp_0 = null;
    } else {
      // Inline function 'kotlin.collections.toTypedArray' call
      tmp_0 = copyToArray(tmp0_safe_receiver);
    }
    var tmp1_elvis_lhs = tmp_0;
    return tmp1_elvis_lhs == null ? get_EMPTY_DESCRIPTOR_ARRAY() : tmp1_elvis_lhs;
  }
  function notRegisteredMessage_0(className) {
    _init_properties_Platform_common_kt__3qzecs();
    return "Serializer for class '" + className + "' is not found.\n" + "Please ensure that class is marked as '@Serializable' and that the serialization compiler plugin is applied.\n";
  }
  var properties_initialized_Platform_common_kt_i7q4ty;
  function _init_properties_Platform_common_kt__3qzecs() {
    if (!properties_initialized_Platform_common_kt_i7q4ty) {
      properties_initialized_Platform_common_kt_i7q4ty = true;
      // Inline function 'kotlin.arrayOf' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      EMPTY_DESCRIPTOR_ARRAY = [];
    }
  }
  function throwMissingFieldException(seen, goldenMask, descriptor) {
    // Inline function 'kotlin.collections.mutableListOf' call
    var missingFields = ArrayList_init_$Create$_0();
    var missingFieldsBits = goldenMask & ~seen;
    var inductionVariable = 0;
    if (inductionVariable < 32)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        if (!((missingFieldsBits & 1) === 0)) {
          // Inline function 'kotlin.collections.plusAssign' call
          var element = descriptor.n1m(i);
          missingFields.e(element);
        }
        missingFieldsBits = missingFieldsBits >>> 1 | 0;
      }
       while (inductionVariable < 32);
    throw MissingFieldException_init_$Create$(missingFields, descriptor.x1l());
  }
  function throwArrayMissingFieldException(seenArray, goldenMaskArray, descriptor) {
    // Inline function 'kotlin.collections.mutableListOf' call
    var missingFields = ArrayList_init_$Create$_0();
    var inductionVariable = 0;
    var last = goldenMaskArray.length - 1 | 0;
    if (inductionVariable <= last)
      do {
        var maskSlot = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var missingFieldsBits = goldenMaskArray[maskSlot] & ~seenArray[maskSlot];
        if (!(missingFieldsBits === 0)) {
          var inductionVariable_0 = 0;
          if (inductionVariable_0 < 32)
            do {
              var i = inductionVariable_0;
              inductionVariable_0 = inductionVariable_0 + 1 | 0;
              if (!((missingFieldsBits & 1) === 0)) {
                // Inline function 'kotlin.collections.plusAssign' call
                var element = descriptor.n1m(imul(maskSlot, 32) + i | 0);
                missingFields.e(element);
              }
              missingFieldsBits = missingFieldsBits >>> 1 | 0;
            }
             while (inductionVariable_0 < 32);
        }
      }
       while (inductionVariable <= last);
    throw MissingFieldException_init_$Create$(missingFields, descriptor.x1l());
  }
  function hashCodeImpl(_this__u8e3s4, typeParams) {
    var result = getStringHashCode(_this__u8e3s4.x1l());
    result = imul(31, result) + contentHashCode(typeParams) | 0;
    var elementDescriptors = get_elementDescriptors(_this__u8e3s4);
    // Inline function 'kotlinx.serialization.internal.elementsHashCodeBy' call
    // Inline function 'kotlin.collections.fold' call
    var accumulator = 1;
    var _iterator__ex2g4s = elementDescriptors.j();
    while (_iterator__ex2g4s.k()) {
      var element = _iterator__ex2g4s.l();
      var hash = accumulator;
      var tmp = imul(31, hash);
      // Inline function 'kotlin.hashCode' call
      var tmp0_safe_receiver = element.x1l();
      var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : hashCode(tmp0_safe_receiver);
      accumulator = tmp + (tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs) | 0;
    }
    var namesHash = accumulator;
    // Inline function 'kotlinx.serialization.internal.elementsHashCodeBy' call
    // Inline function 'kotlin.collections.fold' call
    var accumulator_0 = 1;
    var _iterator__ex2g4s_0 = elementDescriptors.j();
    while (_iterator__ex2g4s_0.k()) {
      var element_0 = _iterator__ex2g4s_0.l();
      var hash_0 = accumulator_0;
      var tmp_0 = imul(31, hash_0);
      // Inline function 'kotlin.hashCode' call
      var tmp0_safe_receiver_0 = element_0.j1m();
      var tmp1_elvis_lhs_0 = tmp0_safe_receiver_0 == null ? null : hashCode(tmp0_safe_receiver_0);
      accumulator_0 = tmp_0 + (tmp1_elvis_lhs_0 == null ? 0 : tmp1_elvis_lhs_0) | 0;
    }
    var kindHash = accumulator_0;
    result = imul(31, result) + namesHash | 0;
    result = imul(31, result) + kindHash | 0;
    return result;
  }
  function _get_childSerializers__7vnyfa($this) {
    var tmp0 = $this.w1u_1;
    // Inline function 'kotlin.getValue' call
    childSerializers$factory();
    return tmp0.w();
  }
  function _get__hashCode__tgwhef_0($this) {
    var tmp0 = $this.y1u_1;
    // Inline function 'kotlin.getValue' call
    _hashCode$factory_0();
    return tmp0.w();
  }
  function buildIndices($this) {
    var indices = HashMap_init_$Create$();
    var inductionVariable = 0;
    var last = $this.r1u_1.length - 1 | 0;
    if (inductionVariable <= last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'kotlin.collections.set' call
        var key = $this.r1u_1[i];
        indices.k2(key, i);
      }
       while (inductionVariable <= last);
    return indices;
  }
  function PluginGeneratedSerialDescriptor$childSerializers$delegate$lambda(this$0) {
    return function () {
      var tmp0_safe_receiver = this$0.o1u_1;
      var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.k1w();
      return tmp1_elvis_lhs == null ? get_EMPTY_SERIALIZER_ARRAY() : tmp1_elvis_lhs;
    };
  }
  function PluginGeneratedSerialDescriptor$typeParameterDescriptors$delegate$lambda(this$0) {
    return function () {
      var tmp0_safe_receiver = this$0.o1u_1;
      var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.l1w();
      var tmp;
      if (tmp1_safe_receiver == null) {
        tmp = null;
      } else {
        // Inline function 'kotlin.collections.map' call
        // Inline function 'kotlin.collections.mapTo' call
        var destination = ArrayList_init_$Create$(tmp1_safe_receiver.length);
        var inductionVariable = 0;
        var last = tmp1_safe_receiver.length;
        while (inductionVariable < last) {
          var item = tmp1_safe_receiver[inductionVariable];
          inductionVariable = inductionVariable + 1 | 0;
          var tmp$ret$0 = item.w1k();
          destination.e(tmp$ret$0);
        }
        tmp = destination;
      }
      return compactArray(tmp);
    };
  }
  function PluginGeneratedSerialDescriptor$_hashCode$delegate$lambda(this$0) {
    return function () {
      return hashCodeImpl(this$0, this$0.u1v());
    };
  }
  function PluginGeneratedSerialDescriptor$toString$lambda(this$0) {
    return function (i) {
      return this$0.n1m(i) + ': ' + this$0.q1m(i).x1l();
    };
  }
  function PluginGeneratedSerialDescriptor(serialName, generatedSerializer, elementsCount) {
    generatedSerializer = generatedSerializer === VOID ? null : generatedSerializer;
    this.n1u_1 = serialName;
    this.o1u_1 = generatedSerializer;
    this.p1u_1 = elementsCount;
    this.q1u_1 = -1;
    var tmp = this;
    var tmp_0 = 0;
    var tmp_1 = this.p1u_1;
    // Inline function 'kotlin.arrayOfNulls' call
    var tmp_2 = Array(tmp_1);
    while (tmp_0 < tmp_1) {
      tmp_2[tmp_0] = '[UNINITIALIZED]';
      tmp_0 = tmp_0 + 1 | 0;
    }
    tmp.r1u_1 = tmp_2;
    var tmp_3 = this;
    // Inline function 'kotlin.arrayOfNulls' call
    var size = this.p1u_1;
    tmp_3.s1u_1 = Array(size);
    this.t1u_1 = null;
    this.u1u_1 = booleanArray(this.p1u_1);
    this.v1u_1 = emptyMap();
    var tmp_4 = this;
    var tmp_5 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp_4.w1u_1 = lazy(tmp_5, PluginGeneratedSerialDescriptor$childSerializers$delegate$lambda(this));
    var tmp_6 = this;
    var tmp_7 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp_6.x1u_1 = lazy(tmp_7, PluginGeneratedSerialDescriptor$typeParameterDescriptors$delegate$lambda(this));
    var tmp_8 = this;
    var tmp_9 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp_8.y1u_1 = lazy(tmp_9, PluginGeneratedSerialDescriptor$_hashCode$delegate$lambda(this));
  }
  protoOf(PluginGeneratedSerialDescriptor).x1l = function () {
    return this.n1u_1;
  };
  protoOf(PluginGeneratedSerialDescriptor).l1m = function () {
    return this.p1u_1;
  };
  protoOf(PluginGeneratedSerialDescriptor).j1m = function () {
    return CLASS_getInstance();
  };
  protoOf(PluginGeneratedSerialDescriptor).m1m = function () {
    var tmp0_elvis_lhs = this.t1u_1;
    return tmp0_elvis_lhs == null ? emptyList() : tmp0_elvis_lhs;
  };
  protoOf(PluginGeneratedSerialDescriptor).o1n = function () {
    return this.v1u_1.i2();
  };
  protoOf(PluginGeneratedSerialDescriptor).u1v = function () {
    var tmp0 = this.x1u_1;
    // Inline function 'kotlin.getValue' call
    typeParameterDescriptors$factory();
    return tmp0.w();
  };
  protoOf(PluginGeneratedSerialDescriptor).v1v = function (name, isOptional) {
    this.q1u_1 = this.q1u_1 + 1 | 0;
    this.r1u_1[this.q1u_1] = name;
    this.u1u_1[this.q1u_1] = isOptional;
    this.s1u_1[this.q1u_1] = null;
    if (this.q1u_1 === (this.p1u_1 - 1 | 0)) {
      this.v1u_1 = buildIndices(this);
    }
  };
  protoOf(PluginGeneratedSerialDescriptor).a1v = function (name, isOptional, $super) {
    isOptional = isOptional === VOID ? false : isOptional;
    var tmp;
    if ($super === VOID) {
      this.v1v(name, isOptional);
      tmp = Unit_instance;
    } else {
      tmp = $super.v1v.call(this, name, isOptional);
    }
    return tmp;
  };
  protoOf(PluginGeneratedSerialDescriptor).b1v = function (annotation) {
    // Inline function 'kotlin.let' call
    var it = this.s1u_1[this.q1u_1];
    var tmp;
    if (it == null) {
      var result = ArrayList_init_$Create$(1);
      this.s1u_1[this.q1u_1] = result;
      tmp = result;
    } else {
      tmp = it;
    }
    var list = tmp;
    list.e(annotation);
  };
  protoOf(PluginGeneratedSerialDescriptor).z1u = function (a) {
    if (this.t1u_1 == null) {
      this.t1u_1 = ArrayList_init_$Create$(1);
    }
    ensureNotNull(this.t1u_1).e(a);
  };
  protoOf(PluginGeneratedSerialDescriptor).q1m = function (index) {
    return getChecked(_get_childSerializers__7vnyfa(this), index).w1k();
  };
  protoOf(PluginGeneratedSerialDescriptor).r1m = function (index) {
    return getChecked_0(this.u1u_1, index);
  };
  protoOf(PluginGeneratedSerialDescriptor).p1m = function (index) {
    var tmp0_elvis_lhs = getChecked(this.s1u_1, index);
    return tmp0_elvis_lhs == null ? emptyList() : tmp0_elvis_lhs;
  };
  protoOf(PluginGeneratedSerialDescriptor).n1m = function (index) {
    return getChecked(this.r1u_1, index);
  };
  protoOf(PluginGeneratedSerialDescriptor).o1m = function (name) {
    var tmp0_elvis_lhs = this.v1u_1.h2(name);
    return tmp0_elvis_lhs == null ? -3 : tmp0_elvis_lhs;
  };
  protoOf(PluginGeneratedSerialDescriptor).equals = function (other) {
    var tmp$ret$0;
    $l$block_5: {
      // Inline function 'kotlinx.serialization.internal.equalsImpl' call
      if (this === other) {
        tmp$ret$0 = true;
        break $l$block_5;
      }
      if (!(other instanceof PluginGeneratedSerialDescriptor)) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      if (!(this.x1l() === other.x1l())) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      if (!contentEquals(this.u1v(), other.u1v())) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      if (!(this.l1m() === other.l1m())) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      var inductionVariable = 0;
      var last = this.l1m();
      if (inductionVariable < last)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          if (!(this.q1m(index).x1l() === other.q1m(index).x1l())) {
            tmp$ret$0 = false;
            break $l$block_5;
          }
          if (!equals(this.q1m(index).j1m(), other.q1m(index).j1m())) {
            tmp$ret$0 = false;
            break $l$block_5;
          }
        }
         while (inductionVariable < last);
      tmp$ret$0 = true;
    }
    return tmp$ret$0;
  };
  protoOf(PluginGeneratedSerialDescriptor).hashCode = function () {
    return _get__hashCode__tgwhef_0(this);
  };
  protoOf(PluginGeneratedSerialDescriptor).toString = function () {
    var tmp = until(0, this.p1u_1);
    var tmp_0 = this.x1l() + '(';
    return joinToString(tmp, ', ', tmp_0, ')', VOID, VOID, PluginGeneratedSerialDescriptor$toString$lambda(this));
  };
  function childSerializers$factory() {
    return getPropertyCallableRef('childSerializers', 1, KProperty1, function (receiver) {
      return _get_childSerializers__7vnyfa(receiver);
    }, null);
  }
  function typeParameterDescriptors$factory() {
    return getPropertyCallableRef('typeParameterDescriptors', 1, KProperty1, function (receiver) {
      return receiver.u1v();
    }, null);
  }
  function _hashCode$factory_0() {
    return getPropertyCallableRef('_hashCode', 1, KProperty1, function (receiver) {
      return _get__hashCode__tgwhef_0(receiver);
    }, null);
  }
  function get_EMPTY_SERIALIZER_ARRAY() {
    _init_properties_PluginHelperInterfaces_kt__xgvzfp();
    return EMPTY_SERIALIZER_ARRAY;
  }
  var EMPTY_SERIALIZER_ARRAY;
  function SerializerFactory() {
  }
  function GeneratedSerializer() {
  }
  var properties_initialized_PluginHelperInterfaces_kt_ap8in1;
  function _init_properties_PluginHelperInterfaces_kt__xgvzfp() {
    if (!properties_initialized_PluginHelperInterfaces_kt_ap8in1) {
      properties_initialized_PluginHelperInterfaces_kt_ap8in1 = true;
      // Inline function 'kotlin.arrayOf' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      EMPTY_SERIALIZER_ARRAY = [];
    }
  }
  function CharArraySerializer_0() {
    CharArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_2(Companion_getInstance_1()));
  }
  protoOf(CharArraySerializer_0).y1w = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(CharArraySerializer_0).q1s = function (_this__u8e3s4) {
    return this.y1w((!(_this__u8e3s4 == null) ? isCharArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(CharArraySerializer_0).z1w = function (_this__u8e3s4) {
    return new CharArrayBuilder(_this__u8e3s4);
  };
  protoOf(CharArraySerializer_0).l1r = function (_this__u8e3s4) {
    return this.z1w((!(_this__u8e3s4 == null) ? isCharArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(CharArraySerializer_0).b1u = function () {
    return charArray(0);
  };
  protoOf(CharArraySerializer_0).a1x = function (decoder, index, builder, checkIndex) {
    builder.d1x(decoder.o1o(this.s1t_1, index));
  };
  protoOf(CharArraySerializer_0).w1r = function (decoder, index, builder, checkIndex) {
    return this.a1x(decoder, index, builder instanceof CharArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(CharArraySerializer_0).c1u = function (decoder, index, builder, checkIndex) {
    return this.a1x(decoder, index, builder instanceof CharArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(CharArraySerializer_0).e1x = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.t1p(this.s1t_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(CharArraySerializer_0).d1u = function (encoder, content, size) {
    return this.e1x(encoder, (!(content == null) ? isCharArray(content) : false) ? content : THROW_CCE(), size);
  };
  var CharArraySerializer_instance;
  function CharArraySerializer_getInstance() {
    if (CharArraySerializer_instance == null)
      new CharArraySerializer_0();
    return CharArraySerializer_instance;
  }
  function DoubleArraySerializer_0() {
    DoubleArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_3(DoubleCompanionObject_instance));
  }
  protoOf(DoubleArraySerializer_0).h1x = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(DoubleArraySerializer_0).q1s = function (_this__u8e3s4) {
    return this.h1x((!(_this__u8e3s4 == null) ? isDoubleArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(DoubleArraySerializer_0).i1x = function (_this__u8e3s4) {
    return new DoubleArrayBuilder(_this__u8e3s4);
  };
  protoOf(DoubleArraySerializer_0).l1r = function (_this__u8e3s4) {
    return this.i1x((!(_this__u8e3s4 == null) ? isDoubleArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(DoubleArraySerializer_0).b1u = function () {
    return new Float64Array(0);
  };
  protoOf(DoubleArraySerializer_0).j1x = function (decoder, index, builder, checkIndex) {
    builder.m1x(decoder.n1o(this.s1t_1, index));
  };
  protoOf(DoubleArraySerializer_0).w1r = function (decoder, index, builder, checkIndex) {
    return this.j1x(decoder, index, builder instanceof DoubleArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(DoubleArraySerializer_0).c1u = function (decoder, index, builder, checkIndex) {
    return this.j1x(decoder, index, builder instanceof DoubleArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(DoubleArraySerializer_0).n1x = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.s1p(this.s1t_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(DoubleArraySerializer_0).d1u = function (encoder, content, size) {
    return this.n1x(encoder, (!(content == null) ? isDoubleArray(content) : false) ? content : THROW_CCE(), size);
  };
  var DoubleArraySerializer_instance;
  function DoubleArraySerializer_getInstance() {
    if (DoubleArraySerializer_instance == null)
      new DoubleArraySerializer_0();
    return DoubleArraySerializer_instance;
  }
  function FloatArraySerializer_0() {
    FloatArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_4(FloatCompanionObject_instance));
  }
  protoOf(FloatArraySerializer_0).q1x = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(FloatArraySerializer_0).q1s = function (_this__u8e3s4) {
    return this.q1x((!(_this__u8e3s4 == null) ? isFloatArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(FloatArraySerializer_0).r1x = function (_this__u8e3s4) {
    return new FloatArrayBuilder(_this__u8e3s4);
  };
  protoOf(FloatArraySerializer_0).l1r = function (_this__u8e3s4) {
    return this.r1x((!(_this__u8e3s4 == null) ? isFloatArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(FloatArraySerializer_0).b1u = function () {
    return new Float32Array(0);
  };
  protoOf(FloatArraySerializer_0).s1x = function (decoder, index, builder, checkIndex) {
    builder.v1x(decoder.m1o(this.s1t_1, index));
  };
  protoOf(FloatArraySerializer_0).w1r = function (decoder, index, builder, checkIndex) {
    return this.s1x(decoder, index, builder instanceof FloatArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(FloatArraySerializer_0).c1u = function (decoder, index, builder, checkIndex) {
    return this.s1x(decoder, index, builder instanceof FloatArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(FloatArraySerializer_0).w1x = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.r1p(this.s1t_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(FloatArraySerializer_0).d1u = function (encoder, content, size) {
    return this.w1x(encoder, (!(content == null) ? isFloatArray(content) : false) ? content : THROW_CCE(), size);
  };
  var FloatArraySerializer_instance;
  function FloatArraySerializer_getInstance() {
    if (FloatArraySerializer_instance == null)
      new FloatArraySerializer_0();
    return FloatArraySerializer_instance;
  }
  function LongArraySerializer_0() {
    LongArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_5(Companion_getInstance_2()));
  }
  protoOf(LongArraySerializer_0).z1x = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(LongArraySerializer_0).q1s = function (_this__u8e3s4) {
    return this.z1x((!(_this__u8e3s4 == null) ? isLongArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LongArraySerializer_0).a1y = function (_this__u8e3s4) {
    return new LongArrayBuilder(_this__u8e3s4);
  };
  protoOf(LongArraySerializer_0).l1r = function (_this__u8e3s4) {
    return this.a1y((!(_this__u8e3s4 == null) ? isLongArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LongArraySerializer_0).b1u = function () {
    return longArray(0);
  };
  protoOf(LongArraySerializer_0).b1y = function (decoder, index, builder, checkIndex) {
    builder.e1y(decoder.l1o(this.s1t_1, index));
  };
  protoOf(LongArraySerializer_0).w1r = function (decoder, index, builder, checkIndex) {
    return this.b1y(decoder, index, builder instanceof LongArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(LongArraySerializer_0).c1u = function (decoder, index, builder, checkIndex) {
    return this.b1y(decoder, index, builder instanceof LongArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(LongArraySerializer_0).f1y = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.q1p(this.s1t_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(LongArraySerializer_0).d1u = function (encoder, content, size) {
    return this.f1y(encoder, (!(content == null) ? isLongArray(content) : false) ? content : THROW_CCE(), size);
  };
  var LongArraySerializer_instance;
  function LongArraySerializer_getInstance() {
    if (LongArraySerializer_instance == null)
      new LongArraySerializer_0();
    return LongArraySerializer_instance;
  }
  function ULongArraySerializer_0() {
    ULongArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_6(Companion_getInstance_3()));
  }
  protoOf(ULongArraySerializer_0).i1y = function (_this__u8e3s4) {
    return _ULongArray___get_size__impl__ju6dtr(_this__u8e3s4);
  };
  protoOf(ULongArraySerializer_0).q1s = function (_this__u8e3s4) {
    return this.i1y(_this__u8e3s4 instanceof ULongArray ? _this__u8e3s4.rn_1 : THROW_CCE());
  };
  protoOf(ULongArraySerializer_0).j1y = function (_this__u8e3s4) {
    return new ULongArrayBuilder(_this__u8e3s4);
  };
  protoOf(ULongArraySerializer_0).l1r = function (_this__u8e3s4) {
    return this.j1y(_this__u8e3s4 instanceof ULongArray ? _this__u8e3s4.rn_1 : THROW_CCE());
  };
  protoOf(ULongArraySerializer_0).k1y = function () {
    return _ULongArray___init__impl__twm1l3(0);
  };
  protoOf(ULongArraySerializer_0).b1u = function () {
    return new ULongArray(this.k1y());
  };
  protoOf(ULongArraySerializer_0).l1y = function (decoder, index, builder, checkIndex) {
    // Inline function 'kotlin.toULong' call
    var this_0 = decoder.q1o(this.s1t_1, index).w1n();
    var tmp$ret$0 = _ULong___init__impl__c78o9k(this_0);
    builder.o1y(tmp$ret$0);
  };
  protoOf(ULongArraySerializer_0).w1r = function (decoder, index, builder, checkIndex) {
    return this.l1y(decoder, index, builder instanceof ULongArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(ULongArraySerializer_0).c1u = function (decoder, index, builder, checkIndex) {
    return this.l1y(decoder, index, builder instanceof ULongArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(ULongArraySerializer_0).p1y = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var tmp = encoder.v1p(this.s1t_1, i);
        // Inline function 'kotlin.ULong.toLong' call
        var this_0 = ULongArray__get_impl_pr71q9(content, i);
        var tmp$ret$0 = _ULong___get_data__impl__fggpzb(this_0);
        tmp.f1p(tmp$ret$0);
      }
       while (inductionVariable < size);
  };
  protoOf(ULongArraySerializer_0).d1u = function (encoder, content, size) {
    return this.p1y(encoder, content instanceof ULongArray ? content.rn_1 : THROW_CCE(), size);
  };
  var ULongArraySerializer_instance;
  function ULongArraySerializer_getInstance() {
    if (ULongArraySerializer_instance == null)
      new ULongArraySerializer_0();
    return ULongArraySerializer_instance;
  }
  function IntArraySerializer_0() {
    IntArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_7(IntCompanionObject_instance));
  }
  protoOf(IntArraySerializer_0).s1y = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(IntArraySerializer_0).q1s = function (_this__u8e3s4) {
    return this.s1y((!(_this__u8e3s4 == null) ? isIntArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(IntArraySerializer_0).t1y = function (_this__u8e3s4) {
    return new IntArrayBuilder(_this__u8e3s4);
  };
  protoOf(IntArraySerializer_0).l1r = function (_this__u8e3s4) {
    return this.t1y((!(_this__u8e3s4 == null) ? isIntArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(IntArraySerializer_0).b1u = function () {
    return new Int32Array(0);
  };
  protoOf(IntArraySerializer_0).u1y = function (decoder, index, builder, checkIndex) {
    builder.x1y(decoder.k1o(this.s1t_1, index));
  };
  protoOf(IntArraySerializer_0).w1r = function (decoder, index, builder, checkIndex) {
    return this.u1y(decoder, index, builder instanceof IntArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(IntArraySerializer_0).c1u = function (decoder, index, builder, checkIndex) {
    return this.u1y(decoder, index, builder instanceof IntArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(IntArraySerializer_0).y1y = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.p1p(this.s1t_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(IntArraySerializer_0).d1u = function (encoder, content, size) {
    return this.y1y(encoder, (!(content == null) ? isIntArray(content) : false) ? content : THROW_CCE(), size);
  };
  var IntArraySerializer_instance;
  function IntArraySerializer_getInstance() {
    if (IntArraySerializer_instance == null)
      new IntArraySerializer_0();
    return IntArraySerializer_instance;
  }
  function UIntArraySerializer_0() {
    UIntArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_8(Companion_getInstance_4()));
  }
  protoOf(UIntArraySerializer_0).b1z = function (_this__u8e3s4) {
    return _UIntArray___get_size__impl__r6l8ci(_this__u8e3s4);
  };
  protoOf(UIntArraySerializer_0).q1s = function (_this__u8e3s4) {
    return this.b1z(_this__u8e3s4 instanceof UIntArray ? _this__u8e3s4.fn_1 : THROW_CCE());
  };
  protoOf(UIntArraySerializer_0).c1z = function (_this__u8e3s4) {
    return new UIntArrayBuilder(_this__u8e3s4);
  };
  protoOf(UIntArraySerializer_0).l1r = function (_this__u8e3s4) {
    return this.c1z(_this__u8e3s4 instanceof UIntArray ? _this__u8e3s4.fn_1 : THROW_CCE());
  };
  protoOf(UIntArraySerializer_0).d1z = function () {
    return _UIntArray___init__impl__ghjpc6(0);
  };
  protoOf(UIntArraySerializer_0).b1u = function () {
    return new UIntArray(this.d1z());
  };
  protoOf(UIntArraySerializer_0).e1z = function (decoder, index, builder, checkIndex) {
    // Inline function 'kotlin.toUInt' call
    var this_0 = decoder.q1o(this.s1t_1, index).v1n();
    var tmp$ret$0 = _UInt___init__impl__l7qpdl(this_0);
    builder.h1z(tmp$ret$0);
  };
  protoOf(UIntArraySerializer_0).w1r = function (decoder, index, builder, checkIndex) {
    return this.e1z(decoder, index, builder instanceof UIntArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(UIntArraySerializer_0).c1u = function (decoder, index, builder, checkIndex) {
    return this.e1z(decoder, index, builder instanceof UIntArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(UIntArraySerializer_0).i1z = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var tmp = encoder.v1p(this.s1t_1, i);
        // Inline function 'kotlin.UInt.toInt' call
        var this_0 = UIntArray__get_impl_gp5kza(content, i);
        var tmp$ret$0 = _UInt___get_data__impl__f0vqqw(this_0);
        tmp.e1p(tmp$ret$0);
      }
       while (inductionVariable < size);
  };
  protoOf(UIntArraySerializer_0).d1u = function (encoder, content, size) {
    return this.i1z(encoder, content instanceof UIntArray ? content.fn_1 : THROW_CCE(), size);
  };
  var UIntArraySerializer_instance;
  function UIntArraySerializer_getInstance() {
    if (UIntArraySerializer_instance == null)
      new UIntArraySerializer_0();
    return UIntArraySerializer_instance;
  }
  function ShortArraySerializer_0() {
    ShortArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_9(ShortCompanionObject_instance));
  }
  protoOf(ShortArraySerializer_0).l1z = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(ShortArraySerializer_0).q1s = function (_this__u8e3s4) {
    return this.l1z((!(_this__u8e3s4 == null) ? isShortArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ShortArraySerializer_0).m1z = function (_this__u8e3s4) {
    return new ShortArrayBuilder(_this__u8e3s4);
  };
  protoOf(ShortArraySerializer_0).l1r = function (_this__u8e3s4) {
    return this.m1z((!(_this__u8e3s4 == null) ? isShortArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ShortArraySerializer_0).b1u = function () {
    return new Int16Array(0);
  };
  protoOf(ShortArraySerializer_0).n1z = function (decoder, index, builder, checkIndex) {
    builder.q1z(decoder.j1o(this.s1t_1, index));
  };
  protoOf(ShortArraySerializer_0).w1r = function (decoder, index, builder, checkIndex) {
    return this.n1z(decoder, index, builder instanceof ShortArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(ShortArraySerializer_0).c1u = function (decoder, index, builder, checkIndex) {
    return this.n1z(decoder, index, builder instanceof ShortArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(ShortArraySerializer_0).r1z = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.o1p(this.s1t_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(ShortArraySerializer_0).d1u = function (encoder, content, size) {
    return this.r1z(encoder, (!(content == null) ? isShortArray(content) : false) ? content : THROW_CCE(), size);
  };
  var ShortArraySerializer_instance;
  function ShortArraySerializer_getInstance() {
    if (ShortArraySerializer_instance == null)
      new ShortArraySerializer_0();
    return ShortArraySerializer_instance;
  }
  function UShortArraySerializer_0() {
    UShortArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_10(Companion_getInstance_5()));
  }
  protoOf(UShortArraySerializer_0).u1z = function (_this__u8e3s4) {
    return _UShortArray___get_size__impl__jqto1b(_this__u8e3s4);
  };
  protoOf(UShortArraySerializer_0).q1s = function (_this__u8e3s4) {
    return this.u1z(_this__u8e3s4 instanceof UShortArray ? _this__u8e3s4.do_1 : THROW_CCE());
  };
  protoOf(UShortArraySerializer_0).v1z = function (_this__u8e3s4) {
    return new UShortArrayBuilder(_this__u8e3s4);
  };
  protoOf(UShortArraySerializer_0).l1r = function (_this__u8e3s4) {
    return this.v1z(_this__u8e3s4 instanceof UShortArray ? _this__u8e3s4.do_1 : THROW_CCE());
  };
  protoOf(UShortArraySerializer_0).w1z = function () {
    return _UShortArray___init__impl__9b26ef(0);
  };
  protoOf(UShortArraySerializer_0).b1u = function () {
    return new UShortArray(this.w1z());
  };
  protoOf(UShortArraySerializer_0).x1z = function (decoder, index, builder, checkIndex) {
    // Inline function 'kotlin.toUShort' call
    var this_0 = decoder.q1o(this.s1t_1, index).u1n();
    var tmp$ret$0 = _UShort___init__impl__jigrne(this_0);
    builder.a20(tmp$ret$0);
  };
  protoOf(UShortArraySerializer_0).w1r = function (decoder, index, builder, checkIndex) {
    return this.x1z(decoder, index, builder instanceof UShortArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(UShortArraySerializer_0).c1u = function (decoder, index, builder, checkIndex) {
    return this.x1z(decoder, index, builder instanceof UShortArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(UShortArraySerializer_0).b20 = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var tmp = encoder.v1p(this.s1t_1, i);
        // Inline function 'kotlin.UShort.toShort' call
        var this_0 = UShortArray__get_impl_fnbhmx(content, i);
        var tmp$ret$0 = _UShort___get_data__impl__g0245(this_0);
        tmp.d1p(tmp$ret$0);
      }
       while (inductionVariable < size);
  };
  protoOf(UShortArraySerializer_0).d1u = function (encoder, content, size) {
    return this.b20(encoder, content instanceof UShortArray ? content.do_1 : THROW_CCE(), size);
  };
  var UShortArraySerializer_instance;
  function UShortArraySerializer_getInstance() {
    if (UShortArraySerializer_instance == null)
      new UShortArraySerializer_0();
    return UShortArraySerializer_instance;
  }
  function ByteArraySerializer_0() {
    ByteArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_11(ByteCompanionObject_instance));
  }
  protoOf(ByteArraySerializer_0).e20 = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(ByteArraySerializer_0).q1s = function (_this__u8e3s4) {
    return this.e20((!(_this__u8e3s4 == null) ? isByteArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ByteArraySerializer_0).f20 = function (_this__u8e3s4) {
    return new ByteArrayBuilder(_this__u8e3s4);
  };
  protoOf(ByteArraySerializer_0).l1r = function (_this__u8e3s4) {
    return this.f20((!(_this__u8e3s4 == null) ? isByteArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ByteArraySerializer_0).b1u = function () {
    return new Int8Array(0);
  };
  protoOf(ByteArraySerializer_0).g20 = function (decoder, index, builder, checkIndex) {
    builder.j20(decoder.i1o(this.s1t_1, index));
  };
  protoOf(ByteArraySerializer_0).w1r = function (decoder, index, builder, checkIndex) {
    return this.g20(decoder, index, builder instanceof ByteArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(ByteArraySerializer_0).c1u = function (decoder, index, builder, checkIndex) {
    return this.g20(decoder, index, builder instanceof ByteArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(ByteArraySerializer_0).k20 = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.n1p(this.s1t_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(ByteArraySerializer_0).d1u = function (encoder, content, size) {
    return this.k20(encoder, (!(content == null) ? isByteArray(content) : false) ? content : THROW_CCE(), size);
  };
  var ByteArraySerializer_instance;
  function ByteArraySerializer_getInstance() {
    if (ByteArraySerializer_instance == null)
      new ByteArraySerializer_0();
    return ByteArraySerializer_instance;
  }
  function UByteArraySerializer_0() {
    UByteArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_12(Companion_getInstance_6()));
  }
  protoOf(UByteArraySerializer_0).n20 = function (_this__u8e3s4) {
    return _UByteArray___get_size__impl__h6pkdv(_this__u8e3s4);
  };
  protoOf(UByteArraySerializer_0).q1s = function (_this__u8e3s4) {
    return this.n20(_this__u8e3s4 instanceof UByteArray ? _this__u8e3s4.tm_1 : THROW_CCE());
  };
  protoOf(UByteArraySerializer_0).o20 = function (_this__u8e3s4) {
    return new UByteArrayBuilder(_this__u8e3s4);
  };
  protoOf(UByteArraySerializer_0).l1r = function (_this__u8e3s4) {
    return this.o20(_this__u8e3s4 instanceof UByteArray ? _this__u8e3s4.tm_1 : THROW_CCE());
  };
  protoOf(UByteArraySerializer_0).p20 = function () {
    return _UByteArray___init__impl__ip4y9n(0);
  };
  protoOf(UByteArraySerializer_0).b1u = function () {
    return new UByteArray(this.p20());
  };
  protoOf(UByteArraySerializer_0).q20 = function (decoder, index, builder, checkIndex) {
    // Inline function 'kotlin.toUByte' call
    var this_0 = decoder.q1o(this.s1t_1, index).t1n();
    var tmp$ret$0 = _UByte___init__impl__g9hnc4(this_0);
    builder.t20(tmp$ret$0);
  };
  protoOf(UByteArraySerializer_0).w1r = function (decoder, index, builder, checkIndex) {
    return this.q20(decoder, index, builder instanceof UByteArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(UByteArraySerializer_0).c1u = function (decoder, index, builder, checkIndex) {
    return this.q20(decoder, index, builder instanceof UByteArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(UByteArraySerializer_0).u20 = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var tmp = encoder.v1p(this.s1t_1, i);
        // Inline function 'kotlin.UByte.toByte' call
        var this_0 = UByteArray__get_impl_t5f3hv(content, i);
        var tmp$ret$0 = _UByte___get_data__impl__jof9qr(this_0);
        tmp.c1p(tmp$ret$0);
      }
       while (inductionVariable < size);
  };
  protoOf(UByteArraySerializer_0).d1u = function (encoder, content, size) {
    return this.u20(encoder, content instanceof UByteArray ? content.tm_1 : THROW_CCE(), size);
  };
  var UByteArraySerializer_instance;
  function UByteArraySerializer_getInstance() {
    if (UByteArraySerializer_instance == null)
      new UByteArraySerializer_0();
    return UByteArraySerializer_instance;
  }
  function BooleanArraySerializer_0() {
    BooleanArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_13(BooleanCompanionObject_instance));
  }
  protoOf(BooleanArraySerializer_0).x20 = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(BooleanArraySerializer_0).q1s = function (_this__u8e3s4) {
    return this.x20((!(_this__u8e3s4 == null) ? isBooleanArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(BooleanArraySerializer_0).y20 = function (_this__u8e3s4) {
    return new BooleanArrayBuilder(_this__u8e3s4);
  };
  protoOf(BooleanArraySerializer_0).l1r = function (_this__u8e3s4) {
    return this.y20((!(_this__u8e3s4 == null) ? isBooleanArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(BooleanArraySerializer_0).b1u = function () {
    return booleanArray(0);
  };
  protoOf(BooleanArraySerializer_0).z20 = function (decoder, index, builder, checkIndex) {
    builder.c21(decoder.h1o(this.s1t_1, index));
  };
  protoOf(BooleanArraySerializer_0).w1r = function (decoder, index, builder, checkIndex) {
    return this.z20(decoder, index, builder instanceof BooleanArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(BooleanArraySerializer_0).c1u = function (decoder, index, builder, checkIndex) {
    return this.z20(decoder, index, builder instanceof BooleanArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(BooleanArraySerializer_0).d21 = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.m1p(this.s1t_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(BooleanArraySerializer_0).d1u = function (encoder, content, size) {
    return this.d21(encoder, (!(content == null) ? isBooleanArray(content) : false) ? content : THROW_CCE(), size);
  };
  var BooleanArraySerializer_instance;
  function BooleanArraySerializer_getInstance() {
    if (BooleanArraySerializer_instance == null)
      new BooleanArraySerializer_0();
    return BooleanArraySerializer_instance;
  }
  function CharArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.b1x_1 = bufferWithData;
    this.c1x_1 = bufferWithData.length;
    this.y1t(10);
  }
  protoOf(CharArrayBuilder).u1t = function () {
    return this.c1x_1;
  };
  protoOf(CharArrayBuilder).y1t = function (requiredCapacity) {
    if (this.b1x_1.length < requiredCapacity)
      this.b1x_1 = copyOf(this.b1x_1, coerceAtLeast(requiredCapacity, imul(this.b1x_1.length, 2)));
  };
  protoOf(CharArrayBuilder).d1x = function (c) {
    this.f1u();
    var tmp = this.b1x_1;
    var _unary__edvuaz = this.c1x_1;
    this.c1x_1 = _unary__edvuaz + 1 | 0;
    tmp[_unary__edvuaz] = c;
  };
  protoOf(CharArrayBuilder).w1t = function () {
    return copyOf(this.b1x_1, this.c1x_1);
  };
  function DoubleArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.k1x_1 = bufferWithData;
    this.l1x_1 = bufferWithData.length;
    this.y1t(10);
  }
  protoOf(DoubleArrayBuilder).u1t = function () {
    return this.l1x_1;
  };
  protoOf(DoubleArrayBuilder).y1t = function (requiredCapacity) {
    if (this.k1x_1.length < requiredCapacity)
      this.k1x_1 = copyOf_0(this.k1x_1, coerceAtLeast(requiredCapacity, imul(this.k1x_1.length, 2)));
  };
  protoOf(DoubleArrayBuilder).m1x = function (c) {
    this.f1u();
    var tmp = this.k1x_1;
    var _unary__edvuaz = this.l1x_1;
    this.l1x_1 = _unary__edvuaz + 1 | 0;
    tmp[_unary__edvuaz] = c;
  };
  protoOf(DoubleArrayBuilder).w1t = function () {
    return copyOf_0(this.k1x_1, this.l1x_1);
  };
  function FloatArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.t1x_1 = bufferWithData;
    this.u1x_1 = bufferWithData.length;
    this.y1t(10);
  }
  protoOf(FloatArrayBuilder).u1t = function () {
    return this.u1x_1;
  };
  protoOf(FloatArrayBuilder).y1t = function (requiredCapacity) {
    if (this.t1x_1.length < requiredCapacity)
      this.t1x_1 = copyOf_1(this.t1x_1, coerceAtLeast(requiredCapacity, imul(this.t1x_1.length, 2)));
  };
  protoOf(FloatArrayBuilder).v1x = function (c) {
    this.f1u();
    var tmp = this.t1x_1;
    var _unary__edvuaz = this.u1x_1;
    this.u1x_1 = _unary__edvuaz + 1 | 0;
    tmp[_unary__edvuaz] = c;
  };
  protoOf(FloatArrayBuilder).w1t = function () {
    return copyOf_1(this.t1x_1, this.u1x_1);
  };
  function LongArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.c1y_1 = bufferWithData;
    this.d1y_1 = bufferWithData.length;
    this.y1t(10);
  }
  protoOf(LongArrayBuilder).u1t = function () {
    return this.d1y_1;
  };
  protoOf(LongArrayBuilder).y1t = function (requiredCapacity) {
    if (this.c1y_1.length < requiredCapacity)
      this.c1y_1 = copyOf_2(this.c1y_1, coerceAtLeast(requiredCapacity, imul(this.c1y_1.length, 2)));
  };
  protoOf(LongArrayBuilder).e1y = function (c) {
    this.f1u();
    var tmp = this.c1y_1;
    var _unary__edvuaz = this.d1y_1;
    this.d1y_1 = _unary__edvuaz + 1 | 0;
    tmp[_unary__edvuaz] = c;
  };
  protoOf(LongArrayBuilder).w1t = function () {
    return copyOf_2(this.c1y_1, this.d1y_1);
  };
  function ULongArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.m1y_1 = bufferWithData;
    this.n1y_1 = _ULongArray___get_size__impl__ju6dtr(bufferWithData);
    this.y1t(10);
  }
  protoOf(ULongArrayBuilder).u1t = function () {
    return this.n1y_1;
  };
  protoOf(ULongArrayBuilder).y1t = function (requiredCapacity) {
    if (_ULongArray___get_size__impl__ju6dtr(this.m1y_1) < requiredCapacity) {
      var tmp = this;
      var tmp0 = this.m1y_1;
      // Inline function 'kotlin.collections.copyOf' call
      var newSize = coerceAtLeast(requiredCapacity, imul(_ULongArray___get_size__impl__ju6dtr(this.m1y_1), 2));
      tmp.m1y_1 = _ULongArray___init__impl__twm1l3_0(copyOf_2(_ULongArray___get_storage__impl__28e64j(tmp0), newSize));
    }
  };
  protoOf(ULongArrayBuilder).o1y = function (c) {
    this.f1u();
    var tmp = this.m1y_1;
    var _unary__edvuaz = this.n1y_1;
    this.n1y_1 = _unary__edvuaz + 1 | 0;
    ULongArray__set_impl_z19mvh(tmp, _unary__edvuaz, c);
  };
  protoOf(ULongArrayBuilder).e21 = function () {
    var tmp0 = this.m1y_1;
    // Inline function 'kotlin.collections.copyOf' call
    var newSize = this.n1y_1;
    return _ULongArray___init__impl__twm1l3_0(copyOf_2(_ULongArray___get_storage__impl__28e64j(tmp0), newSize));
  };
  protoOf(ULongArrayBuilder).w1t = function () {
    return new ULongArray(this.e21());
  };
  function IntArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.v1y_1 = bufferWithData;
    this.w1y_1 = bufferWithData.length;
    this.y1t(10);
  }
  protoOf(IntArrayBuilder).u1t = function () {
    return this.w1y_1;
  };
  protoOf(IntArrayBuilder).y1t = function (requiredCapacity) {
    if (this.v1y_1.length < requiredCapacity)
      this.v1y_1 = copyOf_3(this.v1y_1, coerceAtLeast(requiredCapacity, imul(this.v1y_1.length, 2)));
  };
  protoOf(IntArrayBuilder).x1y = function (c) {
    this.f1u();
    var tmp = this.v1y_1;
    var _unary__edvuaz = this.w1y_1;
    this.w1y_1 = _unary__edvuaz + 1 | 0;
    tmp[_unary__edvuaz] = c;
  };
  protoOf(IntArrayBuilder).w1t = function () {
    return copyOf_3(this.v1y_1, this.w1y_1);
  };
  function UIntArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.f1z_1 = bufferWithData;
    this.g1z_1 = _UIntArray___get_size__impl__r6l8ci(bufferWithData);
    this.y1t(10);
  }
  protoOf(UIntArrayBuilder).u1t = function () {
    return this.g1z_1;
  };
  protoOf(UIntArrayBuilder).y1t = function (requiredCapacity) {
    if (_UIntArray___get_size__impl__r6l8ci(this.f1z_1) < requiredCapacity) {
      var tmp = this;
      var tmp0 = this.f1z_1;
      // Inline function 'kotlin.collections.copyOf' call
      var newSize = coerceAtLeast(requiredCapacity, imul(_UIntArray___get_size__impl__r6l8ci(this.f1z_1), 2));
      tmp.f1z_1 = _UIntArray___init__impl__ghjpc6_0(copyOf_3(_UIntArray___get_storage__impl__92a0v0(tmp0), newSize));
    }
  };
  protoOf(UIntArrayBuilder).h1z = function (c) {
    this.f1u();
    var tmp = this.f1z_1;
    var _unary__edvuaz = this.g1z_1;
    this.g1z_1 = _unary__edvuaz + 1 | 0;
    UIntArray__set_impl_7f2zu2(tmp, _unary__edvuaz, c);
  };
  protoOf(UIntArrayBuilder).f21 = function () {
    var tmp0 = this.f1z_1;
    // Inline function 'kotlin.collections.copyOf' call
    var newSize = this.g1z_1;
    return _UIntArray___init__impl__ghjpc6_0(copyOf_3(_UIntArray___get_storage__impl__92a0v0(tmp0), newSize));
  };
  protoOf(UIntArrayBuilder).w1t = function () {
    return new UIntArray(this.f21());
  };
  function ShortArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.o1z_1 = bufferWithData;
    this.p1z_1 = bufferWithData.length;
    this.y1t(10);
  }
  protoOf(ShortArrayBuilder).u1t = function () {
    return this.p1z_1;
  };
  protoOf(ShortArrayBuilder).y1t = function (requiredCapacity) {
    if (this.o1z_1.length < requiredCapacity)
      this.o1z_1 = copyOf_4(this.o1z_1, coerceAtLeast(requiredCapacity, imul(this.o1z_1.length, 2)));
  };
  protoOf(ShortArrayBuilder).q1z = function (c) {
    this.f1u();
    var tmp = this.o1z_1;
    var _unary__edvuaz = this.p1z_1;
    this.p1z_1 = _unary__edvuaz + 1 | 0;
    tmp[_unary__edvuaz] = c;
  };
  protoOf(ShortArrayBuilder).w1t = function () {
    return copyOf_4(this.o1z_1, this.p1z_1);
  };
  function UShortArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.y1z_1 = bufferWithData;
    this.z1z_1 = _UShortArray___get_size__impl__jqto1b(bufferWithData);
    this.y1t(10);
  }
  protoOf(UShortArrayBuilder).u1t = function () {
    return this.z1z_1;
  };
  protoOf(UShortArrayBuilder).y1t = function (requiredCapacity) {
    if (_UShortArray___get_size__impl__jqto1b(this.y1z_1) < requiredCapacity) {
      var tmp = this;
      var tmp0 = this.y1z_1;
      // Inline function 'kotlin.collections.copyOf' call
      var newSize = coerceAtLeast(requiredCapacity, imul(_UShortArray___get_size__impl__jqto1b(this.y1z_1), 2));
      tmp.y1z_1 = _UShortArray___init__impl__9b26ef_0(copyOf_4(_UShortArray___get_storage__impl__t2jpv5(tmp0), newSize));
    }
  };
  protoOf(UShortArrayBuilder).a20 = function (c) {
    this.f1u();
    var tmp = this.y1z_1;
    var _unary__edvuaz = this.z1z_1;
    this.z1z_1 = _unary__edvuaz + 1 | 0;
    UShortArray__set_impl_6d8whp(tmp, _unary__edvuaz, c);
  };
  protoOf(UShortArrayBuilder).g21 = function () {
    var tmp0 = this.y1z_1;
    // Inline function 'kotlin.collections.copyOf' call
    var newSize = this.z1z_1;
    return _UShortArray___init__impl__9b26ef_0(copyOf_4(_UShortArray___get_storage__impl__t2jpv5(tmp0), newSize));
  };
  protoOf(UShortArrayBuilder).w1t = function () {
    return new UShortArray(this.g21());
  };
  function ByteArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.h20_1 = bufferWithData;
    this.i20_1 = bufferWithData.length;
    this.y1t(10);
  }
  protoOf(ByteArrayBuilder).u1t = function () {
    return this.i20_1;
  };
  protoOf(ByteArrayBuilder).y1t = function (requiredCapacity) {
    if (this.h20_1.length < requiredCapacity)
      this.h20_1 = copyOf_5(this.h20_1, coerceAtLeast(requiredCapacity, imul(this.h20_1.length, 2)));
  };
  protoOf(ByteArrayBuilder).j20 = function (c) {
    this.f1u();
    var tmp = this.h20_1;
    var _unary__edvuaz = this.i20_1;
    this.i20_1 = _unary__edvuaz + 1 | 0;
    tmp[_unary__edvuaz] = c;
  };
  protoOf(ByteArrayBuilder).w1t = function () {
    return copyOf_5(this.h20_1, this.i20_1);
  };
  function UByteArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.r20_1 = bufferWithData;
    this.s20_1 = _UByteArray___get_size__impl__h6pkdv(bufferWithData);
    this.y1t(10);
  }
  protoOf(UByteArrayBuilder).u1t = function () {
    return this.s20_1;
  };
  protoOf(UByteArrayBuilder).y1t = function (requiredCapacity) {
    if (_UByteArray___get_size__impl__h6pkdv(this.r20_1) < requiredCapacity) {
      var tmp = this;
      var tmp0 = this.r20_1;
      // Inline function 'kotlin.collections.copyOf' call
      var newSize = coerceAtLeast(requiredCapacity, imul(_UByteArray___get_size__impl__h6pkdv(this.r20_1), 2));
      tmp.r20_1 = _UByteArray___init__impl__ip4y9n_0(copyOf_5(_UByteArray___get_storage__impl__d4kctt(tmp0), newSize));
    }
  };
  protoOf(UByteArrayBuilder).t20 = function (c) {
    this.f1u();
    var tmp = this.r20_1;
    var _unary__edvuaz = this.s20_1;
    this.s20_1 = _unary__edvuaz + 1 | 0;
    UByteArray__set_impl_jvcicn(tmp, _unary__edvuaz, c);
  };
  protoOf(UByteArrayBuilder).h21 = function () {
    var tmp0 = this.r20_1;
    // Inline function 'kotlin.collections.copyOf' call
    var newSize = this.s20_1;
    return _UByteArray___init__impl__ip4y9n_0(copyOf_5(_UByteArray___get_storage__impl__d4kctt(tmp0), newSize));
  };
  protoOf(UByteArrayBuilder).w1t = function () {
    return new UByteArray(this.h21());
  };
  function BooleanArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.a21_1 = bufferWithData;
    this.b21_1 = bufferWithData.length;
    this.y1t(10);
  }
  protoOf(BooleanArrayBuilder).u1t = function () {
    return this.b21_1;
  };
  protoOf(BooleanArrayBuilder).y1t = function (requiredCapacity) {
    if (this.a21_1.length < requiredCapacity)
      this.a21_1 = copyOf_6(this.a21_1, coerceAtLeast(requiredCapacity, imul(this.a21_1.length, 2)));
  };
  protoOf(BooleanArrayBuilder).c21 = function (c) {
    this.f1u();
    var tmp = this.a21_1;
    var _unary__edvuaz = this.b21_1;
    this.b21_1 = _unary__edvuaz + 1 | 0;
    tmp[_unary__edvuaz] = c;
  };
  protoOf(BooleanArrayBuilder).w1t = function () {
    return copyOf_6(this.a21_1, this.b21_1);
  };
  function get_BUILTIN_SERIALIZERS() {
    _init_properties_Primitives_kt__k0eto4();
    return BUILTIN_SERIALIZERS;
  }
  var BUILTIN_SERIALIZERS;
  function builtinSerializerOrNull(_this__u8e3s4) {
    _init_properties_Primitives_kt__k0eto4();
    var tmp = get_BUILTIN_SERIALIZERS().h2(_this__u8e3s4);
    return (tmp == null ? true : isInterface(tmp, KSerializer)) ? tmp : THROW_CCE();
  }
  function StringSerializer() {
    StringSerializer_instance = this;
    this.i21_1 = new PrimitiveSerialDescriptor_0('kotlin.String', STRING_getInstance());
  }
  protoOf(StringSerializer).w1k = function () {
    return this.i21_1;
  };
  protoOf(StringSerializer).j21 = function (encoder, value) {
    return encoder.j1p(value);
  };
  protoOf(StringSerializer).x1k = function (encoder, value) {
    return this.j21(encoder, (!(value == null) ? typeof value === 'string' : false) ? value : THROW_CCE());
  };
  protoOf(StringSerializer).y1k = function (decoder) {
    return decoder.a1o();
  };
  var StringSerializer_instance;
  function StringSerializer_getInstance() {
    if (StringSerializer_instance == null)
      new StringSerializer();
    return StringSerializer_instance;
  }
  function CharSerializer() {
    CharSerializer_instance = this;
    this.k21_1 = new PrimitiveSerialDescriptor_0('kotlin.Char', CHAR_getInstance());
  }
  protoOf(CharSerializer).w1k = function () {
    return this.k21_1;
  };
  protoOf(CharSerializer).l21 = function (encoder, value) {
    return encoder.i1p(value);
  };
  protoOf(CharSerializer).x1k = function (encoder, value) {
    return this.l21(encoder, value instanceof Char ? value.m1_1 : THROW_CCE());
  };
  protoOf(CharSerializer).m21 = function (decoder) {
    return decoder.z1n();
  };
  protoOf(CharSerializer).y1k = function (decoder) {
    return new Char(this.m21(decoder));
  };
  var CharSerializer_instance;
  function CharSerializer_getInstance() {
    if (CharSerializer_instance == null)
      new CharSerializer();
    return CharSerializer_instance;
  }
  function DoubleSerializer() {
    DoubleSerializer_instance = this;
    this.n21_1 = new PrimitiveSerialDescriptor_0('kotlin.Double', DOUBLE_getInstance());
  }
  protoOf(DoubleSerializer).w1k = function () {
    return this.n21_1;
  };
  protoOf(DoubleSerializer).o21 = function (encoder, value) {
    return encoder.h1p(value);
  };
  protoOf(DoubleSerializer).x1k = function (encoder, value) {
    return this.o21(encoder, (!(value == null) ? typeof value === 'number' : false) ? value : THROW_CCE());
  };
  protoOf(DoubleSerializer).y1k = function (decoder) {
    return decoder.y1n();
  };
  var DoubleSerializer_instance;
  function DoubleSerializer_getInstance() {
    if (DoubleSerializer_instance == null)
      new DoubleSerializer();
    return DoubleSerializer_instance;
  }
  function FloatSerializer() {
    FloatSerializer_instance = this;
    this.p21_1 = new PrimitiveSerialDescriptor_0('kotlin.Float', FLOAT_getInstance());
  }
  protoOf(FloatSerializer).w1k = function () {
    return this.p21_1;
  };
  protoOf(FloatSerializer).q21 = function (encoder, value) {
    return encoder.g1p(value);
  };
  protoOf(FloatSerializer).x1k = function (encoder, value) {
    return this.q21(encoder, (!(value == null) ? typeof value === 'number' : false) ? value : THROW_CCE());
  };
  protoOf(FloatSerializer).y1k = function (decoder) {
    return decoder.x1n();
  };
  var FloatSerializer_instance;
  function FloatSerializer_getInstance() {
    if (FloatSerializer_instance == null)
      new FloatSerializer();
    return FloatSerializer_instance;
  }
  function LongSerializer() {
    LongSerializer_instance = this;
    this.r21_1 = new PrimitiveSerialDescriptor_0('kotlin.Long', LONG_getInstance());
  }
  protoOf(LongSerializer).w1k = function () {
    return this.r21_1;
  };
  protoOf(LongSerializer).s21 = function (encoder, value) {
    return encoder.f1p(value);
  };
  protoOf(LongSerializer).x1k = function (encoder, value) {
    return this.s21(encoder, value instanceof Long ? value : THROW_CCE());
  };
  protoOf(LongSerializer).y1k = function (decoder) {
    return decoder.w1n();
  };
  var LongSerializer_instance;
  function LongSerializer_getInstance() {
    if (LongSerializer_instance == null)
      new LongSerializer();
    return LongSerializer_instance;
  }
  function IntSerializer() {
    IntSerializer_instance = this;
    this.t21_1 = new PrimitiveSerialDescriptor_0('kotlin.Int', INT_getInstance());
  }
  protoOf(IntSerializer).w1k = function () {
    return this.t21_1;
  };
  protoOf(IntSerializer).u21 = function (encoder, value) {
    return encoder.e1p(value);
  };
  protoOf(IntSerializer).x1k = function (encoder, value) {
    return this.u21(encoder, (!(value == null) ? typeof value === 'number' : false) ? value : THROW_CCE());
  };
  protoOf(IntSerializer).y1k = function (decoder) {
    return decoder.v1n();
  };
  var IntSerializer_instance;
  function IntSerializer_getInstance() {
    if (IntSerializer_instance == null)
      new IntSerializer();
    return IntSerializer_instance;
  }
  function ShortSerializer() {
    ShortSerializer_instance = this;
    this.v21_1 = new PrimitiveSerialDescriptor_0('kotlin.Short', SHORT_getInstance());
  }
  protoOf(ShortSerializer).w1k = function () {
    return this.v21_1;
  };
  protoOf(ShortSerializer).w21 = function (encoder, value) {
    return encoder.d1p(value);
  };
  protoOf(ShortSerializer).x1k = function (encoder, value) {
    return this.w21(encoder, (!(value == null) ? typeof value === 'number' : false) ? value : THROW_CCE());
  };
  protoOf(ShortSerializer).y1k = function (decoder) {
    return decoder.u1n();
  };
  var ShortSerializer_instance;
  function ShortSerializer_getInstance() {
    if (ShortSerializer_instance == null)
      new ShortSerializer();
    return ShortSerializer_instance;
  }
  function ByteSerializer() {
    ByteSerializer_instance = this;
    this.x21_1 = new PrimitiveSerialDescriptor_0('kotlin.Byte', BYTE_getInstance());
  }
  protoOf(ByteSerializer).w1k = function () {
    return this.x21_1;
  };
  protoOf(ByteSerializer).y21 = function (encoder, value) {
    return encoder.c1p(value);
  };
  protoOf(ByteSerializer).x1k = function (encoder, value) {
    return this.y21(encoder, (!(value == null) ? typeof value === 'number' : false) ? value : THROW_CCE());
  };
  protoOf(ByteSerializer).y1k = function (decoder) {
    return decoder.t1n();
  };
  var ByteSerializer_instance;
  function ByteSerializer_getInstance() {
    if (ByteSerializer_instance == null)
      new ByteSerializer();
    return ByteSerializer_instance;
  }
  function BooleanSerializer() {
    BooleanSerializer_instance = this;
    this.z21_1 = new PrimitiveSerialDescriptor_0('kotlin.Boolean', BOOLEAN_getInstance());
  }
  protoOf(BooleanSerializer).w1k = function () {
    return this.z21_1;
  };
  protoOf(BooleanSerializer).a22 = function (encoder, value) {
    return encoder.b1p(value);
  };
  protoOf(BooleanSerializer).x1k = function (encoder, value) {
    return this.a22(encoder, (!(value == null) ? typeof value === 'boolean' : false) ? value : THROW_CCE());
  };
  protoOf(BooleanSerializer).y1k = function (decoder) {
    return decoder.s1n();
  };
  var BooleanSerializer_instance;
  function BooleanSerializer_getInstance() {
    if (BooleanSerializer_instance == null)
      new BooleanSerializer();
    return BooleanSerializer_instance;
  }
  function UnitSerializer() {
    UnitSerializer_instance = this;
    this.b22_1 = new ObjectSerializer('kotlin.Unit', Unit_instance);
  }
  protoOf(UnitSerializer).w1k = function () {
    return this.b22_1.w1k();
  };
  protoOf(UnitSerializer).c22 = function (encoder, value) {
    this.b22_1.m1l(encoder, Unit_instance);
  };
  protoOf(UnitSerializer).x1k = function (encoder, value) {
    return this.c22(encoder, value instanceof Unit ? value : THROW_CCE());
  };
  protoOf(UnitSerializer).d22 = function (decoder) {
    this.b22_1.y1k(decoder);
  };
  protoOf(UnitSerializer).y1k = function (decoder) {
    this.d22(decoder);
    return Unit_instance;
  };
  var UnitSerializer_instance;
  function UnitSerializer_getInstance() {
    if (UnitSerializer_instance == null)
      new UnitSerializer();
    return UnitSerializer_instance;
  }
  function error_0($this) {
    throw IllegalStateException_init_$Create$('Primitive descriptor does not have elements');
  }
  function PrimitiveSerialDescriptor_0(serialName, kind) {
    this.e22_1 = serialName;
    this.f22_1 = kind;
  }
  protoOf(PrimitiveSerialDescriptor_0).x1l = function () {
    return this.e22_1;
  };
  protoOf(PrimitiveSerialDescriptor_0).j1m = function () {
    return this.f22_1;
  };
  protoOf(PrimitiveSerialDescriptor_0).l1m = function () {
    return 0;
  };
  protoOf(PrimitiveSerialDescriptor_0).n1m = function (index) {
    error_0(this);
  };
  protoOf(PrimitiveSerialDescriptor_0).o1m = function (name) {
    error_0(this);
  };
  protoOf(PrimitiveSerialDescriptor_0).r1m = function (index) {
    error_0(this);
  };
  protoOf(PrimitiveSerialDescriptor_0).q1m = function (index) {
    error_0(this);
  };
  protoOf(PrimitiveSerialDescriptor_0).p1m = function (index) {
    error_0(this);
  };
  protoOf(PrimitiveSerialDescriptor_0).toString = function () {
    return 'PrimitiveDescriptor(' + this.e22_1 + ')';
  };
  protoOf(PrimitiveSerialDescriptor_0).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof PrimitiveSerialDescriptor_0))
      return false;
    if (this.e22_1 === other.e22_1 && equals(this.f22_1, other.f22_1))
      return true;
    return false;
  };
  protoOf(PrimitiveSerialDescriptor_0).hashCode = function () {
    return getStringHashCode(this.e22_1) + imul(31, this.f22_1.hashCode()) | 0;
  };
  function PrimitiveDescriptorSafe(serialName, kind) {
    _init_properties_Primitives_kt__k0eto4();
    checkName(serialName);
    return new PrimitiveSerialDescriptor_0(serialName, kind);
  }
  function checkName(serialName) {
    _init_properties_Primitives_kt__k0eto4();
    var values = get_BUILTIN_SERIALIZERS().j2();
    var _iterator__ex2g4s = values.j();
    while (_iterator__ex2g4s.k()) {
      var primitive = _iterator__ex2g4s.l();
      var primitiveName = primitive.w1k().x1l();
      if (serialName === primitiveName) {
        throw IllegalArgumentException_init_$Create$(trimIndent('\n                The name of serial descriptor should uniquely identify associated serializer.\n                For serial name ' + serialName + ' there already exists ' + getKClassFromExpression(primitive).za() + '.\n                Please refer to SerialDescriptor documentation for additional information.\n            '));
      }
    }
  }
  var properties_initialized_Primitives_kt_6dpii6;
  function _init_properties_Primitives_kt__k0eto4() {
    if (!properties_initialized_Primitives_kt_6dpii6) {
      properties_initialized_Primitives_kt_6dpii6 = true;
      BUILTIN_SERIALIZERS = initBuiltins();
    }
  }
  function NamedValueEncoder() {
    TaggedEncoder.call(this);
  }
  protoOf(NamedValueEncoder).h22 = function (_this__u8e3s4, index) {
    return this.j22(this.i22(_this__u8e3s4, index));
  };
  protoOf(NamedValueEncoder).j22 = function (nestedName) {
    var tmp0_elvis_lhs = this.l22();
    return this.m22(tmp0_elvis_lhs == null ? '' : tmp0_elvis_lhs, nestedName);
  };
  protoOf(NamedValueEncoder).i22 = function (descriptor, index) {
    return descriptor.n1m(index);
  };
  protoOf(NamedValueEncoder).m22 = function (parentName, childName) {
    var tmp;
    // Inline function 'kotlin.text.isEmpty' call
    if (charSequenceLength(parentName) === 0) {
      tmp = childName;
    } else {
      tmp = parentName + '.' + childName;
    }
    return tmp;
  };
  function NamedValueDecoder() {
    TaggedDecoder.call(this);
  }
  protoOf(NamedValueDecoder).h22 = function (_this__u8e3s4, index) {
    return this.j22(this.i22(_this__u8e3s4, index));
  };
  protoOf(NamedValueDecoder).j22 = function (nestedName) {
    var tmp0_elvis_lhs = this.l22();
    return this.m22(tmp0_elvis_lhs == null ? '' : tmp0_elvis_lhs, nestedName);
  };
  protoOf(NamedValueDecoder).i22 = function (descriptor, index) {
    return descriptor.n1m(index);
  };
  protoOf(NamedValueDecoder).m22 = function (parentName, childName) {
    var tmp;
    // Inline function 'kotlin.text.isEmpty' call
    if (charSequenceLength(parentName) === 0) {
      tmp = childName;
    } else {
      tmp = parentName + '.' + childName;
    }
    return tmp;
  };
  protoOf(NamedValueDecoder).j23 = function () {
    return this.h23_1.p() ? '$' : joinToString(this.h23_1, '.', '$.');
  };
  function encodeElement($this, desc, index) {
    var tag = $this.h22(desc, index);
    $this.d23(tag);
    return true;
  }
  function TaggedEncoder() {
    var tmp = this;
    // Inline function 'kotlin.collections.arrayListOf' call
    tmp.k22_1 = ArrayList_init_$Create$_0();
  }
  protoOf(TaggedEncoder).u1o = function () {
    return EmptySerializersModule_0();
  };
  protoOf(TaggedEncoder).n22 = function (tag, value) {
    throw SerializationException_init_$Create$_0('Non-serializable ' + toString(getKClassFromExpression(value)) + ' is not supported by ' + toString(getKClassFromExpression(this)) + ' encoder');
  };
  protoOf(TaggedEncoder).o22 = function (tag) {
  };
  protoOf(TaggedEncoder).p22 = function (tag) {
    throw SerializationException_init_$Create$_0('null is not supported');
  };
  protoOf(TaggedEncoder).q22 = function (tag, value) {
    return this.n22(tag, value);
  };
  protoOf(TaggedEncoder).r22 = function (tag, value) {
    return this.n22(tag, value);
  };
  protoOf(TaggedEncoder).s22 = function (tag, value) {
    return this.n22(tag, value);
  };
  protoOf(TaggedEncoder).t22 = function (tag, value) {
    return this.n22(tag, value);
  };
  protoOf(TaggedEncoder).u22 = function (tag, value) {
    return this.n22(tag, value);
  };
  protoOf(TaggedEncoder).v22 = function (tag, value) {
    return this.n22(tag, value);
  };
  protoOf(TaggedEncoder).w22 = function (tag, value) {
    return this.n22(tag, value);
  };
  protoOf(TaggedEncoder).x22 = function (tag, value) {
    return this.n22(tag, new Char(value));
  };
  protoOf(TaggedEncoder).y22 = function (tag, value) {
    return this.n22(tag, value);
  };
  protoOf(TaggedEncoder).z22 = function (tag, enumDescriptor, ordinal) {
    return this.n22(tag, ordinal);
  };
  protoOf(TaggedEncoder).a23 = function (tag, inlineDescriptor) {
    // Inline function 'kotlin.apply' call
    this.d23(tag);
    return this;
  };
  protoOf(TaggedEncoder).l1p = function (descriptor) {
    return this.a23(this.e23(), descriptor);
  };
  protoOf(TaggedEncoder).a1q = function () {
    return this.o22(this.c23());
  };
  protoOf(TaggedEncoder).a1p = function () {
    return this.p22(this.e23());
  };
  protoOf(TaggedEncoder).b1p = function (value) {
    return this.w22(this.e23(), value);
  };
  protoOf(TaggedEncoder).c1p = function (value) {
    return this.r22(this.e23(), value);
  };
  protoOf(TaggedEncoder).d1p = function (value) {
    return this.s22(this.e23(), value);
  };
  protoOf(TaggedEncoder).e1p = function (value) {
    return this.q22(this.e23(), value);
  };
  protoOf(TaggedEncoder).f1p = function (value) {
    return this.t22(this.e23(), value);
  };
  protoOf(TaggedEncoder).g1p = function (value) {
    return this.u22(this.e23(), value);
  };
  protoOf(TaggedEncoder).h1p = function (value) {
    return this.v22(this.e23(), value);
  };
  protoOf(TaggedEncoder).i1p = function (value) {
    return this.x22(this.e23(), value);
  };
  protoOf(TaggedEncoder).j1p = function (value) {
    return this.y22(this.e23(), value);
  };
  protoOf(TaggedEncoder).k1p = function (enumDescriptor, index) {
    return this.z22(this.e23(), enumDescriptor, index);
  };
  protoOf(TaggedEncoder).f1o = function (descriptor) {
    return this;
  };
  protoOf(TaggedEncoder).g1o = function (descriptor) {
    // Inline function 'kotlin.collections.isNotEmpty' call
    if (!this.k22_1.p()) {
      this.e23();
    }
    this.b23(descriptor);
  };
  protoOf(TaggedEncoder).b23 = function (descriptor) {
  };
  protoOf(TaggedEncoder).m1p = function (descriptor, index, value) {
    return this.w22(this.h22(descriptor, index), value);
  };
  protoOf(TaggedEncoder).n1p = function (descriptor, index, value) {
    return this.r22(this.h22(descriptor, index), value);
  };
  protoOf(TaggedEncoder).o1p = function (descriptor, index, value) {
    return this.s22(this.h22(descriptor, index), value);
  };
  protoOf(TaggedEncoder).p1p = function (descriptor, index, value) {
    return this.q22(this.h22(descriptor, index), value);
  };
  protoOf(TaggedEncoder).q1p = function (descriptor, index, value) {
    return this.t22(this.h22(descriptor, index), value);
  };
  protoOf(TaggedEncoder).r1p = function (descriptor, index, value) {
    return this.u22(this.h22(descriptor, index), value);
  };
  protoOf(TaggedEncoder).s1p = function (descriptor, index, value) {
    return this.v22(this.h22(descriptor, index), value);
  };
  protoOf(TaggedEncoder).t1p = function (descriptor, index, value) {
    return this.x22(this.h22(descriptor, index), value);
  };
  protoOf(TaggedEncoder).u1p = function (descriptor, index, value) {
    return this.y22(this.h22(descriptor, index), value);
  };
  protoOf(TaggedEncoder).v1p = function (descriptor, index) {
    return this.a23(this.h22(descriptor, index), descriptor.q1m(index));
  };
  protoOf(TaggedEncoder).w1p = function (descriptor, index, serializer, value) {
    if (encodeElement(this, descriptor, index)) {
      this.x1p(serializer, value);
    }
  };
  protoOf(TaggedEncoder).y1p = function (descriptor, index, serializer, value) {
    if (encodeElement(this, descriptor, index)) {
      this.z1p(serializer, value);
    }
  };
  protoOf(TaggedEncoder).c23 = function () {
    return last(this.k22_1);
  };
  protoOf(TaggedEncoder).l22 = function () {
    return lastOrNull(this.k22_1);
  };
  protoOf(TaggedEncoder).d23 = function (name) {
    this.k22_1.e(name);
  };
  protoOf(TaggedEncoder).e23 = function () {
    var tmp;
    // Inline function 'kotlin.collections.isNotEmpty' call
    if (!this.k22_1.p()) {
      tmp = this.k22_1.e2(get_lastIndex_0(this.k22_1));
    } else {
      throw SerializationException_init_$Create$_0('No tag in stack for requested element');
    }
    return tmp;
  };
  function tagBlock($this, tag, block) {
    $this.d23(tag);
    var r = block();
    if (!$this.i23_1) {
      $this.e23();
    }
    $this.i23_1 = false;
    return r;
  }
  function TaggedDecoder$decodeSerializableElement$lambda(this$0, $deserializer, $previousValue) {
    return function () {
      return this$0.d1o($deserializer, $previousValue);
    };
  }
  function TaggedDecoder$decodeNullableSerializableElement$lambda(this$0, $deserializer, $previousValue) {
    return function () {
      var tmp0 = this$0;
      // Inline function 'kotlinx.serialization.encoding.decodeIfNullable' call
      var isNullabilitySupported = $deserializer.w1k().f1m();
      var tmp;
      if (isNullabilitySupported || tmp0.q1n()) {
        tmp = this$0.d1o($deserializer, $previousValue);
      } else {
        tmp = tmp0.r1n();
      }
      return tmp;
    };
  }
  function TaggedDecoder() {
    var tmp = this;
    // Inline function 'kotlin.collections.arrayListOf' call
    tmp.h23_1 = ArrayList_init_$Create$_0();
    this.i23_1 = false;
  }
  protoOf(TaggedDecoder).u1o = function () {
    return EmptySerializersModule_0();
  };
  protoOf(TaggedDecoder).k23 = function (tag) {
    throw SerializationException_init_$Create$_0(toString(getKClassFromExpression(this)) + " can't retrieve untyped values");
  };
  protoOf(TaggedDecoder).l23 = function (tag) {
    return true;
  };
  protoOf(TaggedDecoder).m23 = function (tag) {
    var tmp = this.k23(tag);
    return typeof tmp === 'boolean' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).n23 = function (tag) {
    var tmp = this.k23(tag);
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).o23 = function (tag) {
    var tmp = this.k23(tag);
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).p23 = function (tag) {
    var tmp = this.k23(tag);
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).q23 = function (tag) {
    var tmp = this.k23(tag);
    return tmp instanceof Long ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).r23 = function (tag) {
    var tmp = this.k23(tag);
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).s23 = function (tag) {
    var tmp = this.k23(tag);
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).t23 = function (tag) {
    var tmp = this.k23(tag);
    return tmp instanceof Char ? tmp.m1_1 : THROW_CCE();
  };
  protoOf(TaggedDecoder).u23 = function (tag) {
    var tmp = this.k23(tag);
    return typeof tmp === 'string' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).v23 = function (tag, enumDescriptor) {
    var tmp = this.k23(tag);
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).w23 = function (tag, inlineDescriptor) {
    // Inline function 'kotlin.apply' call
    this.d23(tag);
    return this;
  };
  protoOf(TaggedDecoder).d1o = function (deserializer, previousValue) {
    return this.e1o(deserializer);
  };
  protoOf(TaggedDecoder).c1o = function (descriptor) {
    return this.w23(this.e23(), descriptor);
  };
  protoOf(TaggedDecoder).q1n = function () {
    var tmp0_elvis_lhs = this.l22();
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return false;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var currentTag = tmp;
    return this.l23(currentTag);
  };
  protoOf(TaggedDecoder).r1n = function () {
    return null;
  };
  protoOf(TaggedDecoder).s1n = function () {
    return this.m23(this.e23());
  };
  protoOf(TaggedDecoder).t1n = function () {
    return this.n23(this.e23());
  };
  protoOf(TaggedDecoder).u1n = function () {
    return this.o23(this.e23());
  };
  protoOf(TaggedDecoder).v1n = function () {
    return this.p23(this.e23());
  };
  protoOf(TaggedDecoder).w1n = function () {
    return this.q23(this.e23());
  };
  protoOf(TaggedDecoder).x1n = function () {
    return this.r23(this.e23());
  };
  protoOf(TaggedDecoder).y1n = function () {
    return this.s23(this.e23());
  };
  protoOf(TaggedDecoder).z1n = function () {
    return this.t23(this.e23());
  };
  protoOf(TaggedDecoder).a1o = function () {
    return this.u23(this.e23());
  };
  protoOf(TaggedDecoder).b1o = function (enumDescriptor) {
    return this.v23(this.e23(), enumDescriptor);
  };
  protoOf(TaggedDecoder).f1o = function (descriptor) {
    return this;
  };
  protoOf(TaggedDecoder).g1o = function (descriptor) {
  };
  protoOf(TaggedDecoder).h1o = function (descriptor, index) {
    return this.m23(this.h22(descriptor, index));
  };
  protoOf(TaggedDecoder).i1o = function (descriptor, index) {
    return this.n23(this.h22(descriptor, index));
  };
  protoOf(TaggedDecoder).j1o = function (descriptor, index) {
    return this.o23(this.h22(descriptor, index));
  };
  protoOf(TaggedDecoder).k1o = function (descriptor, index) {
    return this.p23(this.h22(descriptor, index));
  };
  protoOf(TaggedDecoder).l1o = function (descriptor, index) {
    return this.q23(this.h22(descriptor, index));
  };
  protoOf(TaggedDecoder).m1o = function (descriptor, index) {
    return this.r23(this.h22(descriptor, index));
  };
  protoOf(TaggedDecoder).n1o = function (descriptor, index) {
    return this.s23(this.h22(descriptor, index));
  };
  protoOf(TaggedDecoder).o1o = function (descriptor, index) {
    return this.t23(this.h22(descriptor, index));
  };
  protoOf(TaggedDecoder).p1o = function (descriptor, index) {
    return this.u23(this.h22(descriptor, index));
  };
  protoOf(TaggedDecoder).q1o = function (descriptor, index) {
    return this.w23(this.h22(descriptor, index), descriptor.q1m(index));
  };
  protoOf(TaggedDecoder).r1o = function (descriptor, index, deserializer, previousValue) {
    var tmp = this.h22(descriptor, index);
    return tagBlock(this, tmp, TaggedDecoder$decodeSerializableElement$lambda(this, deserializer, previousValue));
  };
  protoOf(TaggedDecoder).t1o = function (descriptor, index, deserializer, previousValue) {
    var tmp = this.h22(descriptor, index);
    return tagBlock(this, tmp, TaggedDecoder$decodeNullableSerializableElement$lambda(this, deserializer, previousValue));
  };
  protoOf(TaggedDecoder).l22 = function () {
    return lastOrNull(this.h23_1);
  };
  protoOf(TaggedDecoder).d23 = function (name) {
    this.h23_1.e(name);
  };
  protoOf(TaggedDecoder).e23 = function () {
    var r = this.h23_1.e2(get_lastIndex_0(this.h23_1));
    this.i23_1 = true;
    return r;
  };
  function get_NULL() {
    _init_properties_Tuples_kt__dz0qyd();
    return NULL;
  }
  var NULL;
  function MapEntry(key, value) {
    this.x23_1 = key;
    this.y23_1 = value;
  }
  protoOf(MapEntry).v = function () {
    return this.x23_1;
  };
  protoOf(MapEntry).w = function () {
    return this.y23_1;
  };
  protoOf(MapEntry).toString = function () {
    return 'MapEntry(key=' + toString_0(this.x23_1) + ', value=' + toString_0(this.y23_1) + ')';
  };
  protoOf(MapEntry).hashCode = function () {
    var result = this.x23_1 == null ? 0 : hashCode(this.x23_1);
    result = imul(result, 31) + (this.y23_1 == null ? 0 : hashCode(this.y23_1)) | 0;
    return result;
  };
  protoOf(MapEntry).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof MapEntry))
      return false;
    var tmp0_other_with_cast = other instanceof MapEntry ? other : THROW_CCE();
    if (!equals(this.x23_1, tmp0_other_with_cast.x23_1))
      return false;
    if (!equals(this.y23_1, tmp0_other_with_cast.y23_1))
      return false;
    return true;
  };
  function MapEntrySerializer$descriptor$lambda($keySerializer, $valueSerializer) {
    return function ($this$buildSerialDescriptor) {
      $this$buildSerialDescriptor.h1l('key', $keySerializer.w1k());
      $this$buildSerialDescriptor.h1l('value', $valueSerializer.w1k());
      return Unit_instance;
    };
  }
  function MapEntrySerializer_0(keySerializer, valueSerializer) {
    KeyValueSerializer.call(this, keySerializer, valueSerializer);
    var tmp = this;
    var tmp_0 = MAP_getInstance();
    tmp.b24_1 = buildSerialDescriptor('kotlin.collections.Map.Entry', tmp_0, [], MapEntrySerializer$descriptor$lambda(keySerializer, valueSerializer));
  }
  protoOf(MapEntrySerializer_0).w1k = function () {
    return this.b24_1;
  };
  protoOf(MapEntrySerializer_0).c24 = function (_this__u8e3s4) {
    return _this__u8e3s4.v();
  };
  protoOf(MapEntrySerializer_0).d24 = function (_this__u8e3s4) {
    return this.c24((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, Entry) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(MapEntrySerializer_0).e24 = function (_this__u8e3s4) {
    return _this__u8e3s4.w();
  };
  protoOf(MapEntrySerializer_0).f24 = function (_this__u8e3s4) {
    return this.e24((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, Entry) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(MapEntrySerializer_0).g24 = function (key, value) {
    return new MapEntry(key, value);
  };
  function PairSerializer$descriptor$lambda($keySerializer, $valueSerializer) {
    return function ($this$buildClassSerialDescriptor) {
      $this$buildClassSerialDescriptor.h1l('first', $keySerializer.w1k());
      $this$buildClassSerialDescriptor.h1l('second', $valueSerializer.w1k());
      return Unit_instance;
    };
  }
  function PairSerializer_0(keySerializer, valueSerializer) {
    KeyValueSerializer.call(this, keySerializer, valueSerializer);
    var tmp = this;
    tmp.m24_1 = buildClassSerialDescriptor('kotlin.Pair', [], PairSerializer$descriptor$lambda(keySerializer, valueSerializer));
  }
  protoOf(PairSerializer_0).w1k = function () {
    return this.m24_1;
  };
  protoOf(PairSerializer_0).n24 = function (_this__u8e3s4) {
    return _this__u8e3s4.ug_1;
  };
  protoOf(PairSerializer_0).d24 = function (_this__u8e3s4) {
    return this.n24(_this__u8e3s4 instanceof Pair ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(PairSerializer_0).o24 = function (_this__u8e3s4) {
    return _this__u8e3s4.vg_1;
  };
  protoOf(PairSerializer_0).f24 = function (_this__u8e3s4) {
    return this.o24(_this__u8e3s4 instanceof Pair ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(PairSerializer_0).g24 = function (key, value) {
    return to(key, value);
  };
  function decodeSequentially_1($this, composite) {
    var a = composite.s1o($this.s24_1, 0, $this.p24_1);
    var b = composite.s1o($this.s24_1, 1, $this.q24_1);
    var c = composite.s1o($this.s24_1, 2, $this.r24_1);
    composite.g1o($this.s24_1);
    return new Triple(a, b, c);
  }
  function decodeStructure($this, composite) {
    var a = get_NULL();
    var b = get_NULL();
    var c = get_NULL();
    mainLoop: while (true) {
      var index = composite.w1o($this.s24_1);
      switch (index) {
        case -1:
          break mainLoop;
        case 0:
          a = composite.s1o($this.s24_1, 0, $this.p24_1);
          break;
        case 1:
          b = composite.s1o($this.s24_1, 1, $this.q24_1);
          break;
        case 2:
          c = composite.s1o($this.s24_1, 2, $this.r24_1);
          break;
        default:
          throw SerializationException_init_$Create$_0('Unexpected index ' + index);
      }
    }
    composite.g1o($this.s24_1);
    if (a === get_NULL())
      throw SerializationException_init_$Create$_0("Element 'first' is missing");
    if (b === get_NULL())
      throw SerializationException_init_$Create$_0("Element 'second' is missing");
    if (c === get_NULL())
      throw SerializationException_init_$Create$_0("Element 'third' is missing");
    var tmp = (a == null ? true : !(a == null)) ? a : THROW_CCE();
    var tmp_0 = (b == null ? true : !(b == null)) ? b : THROW_CCE();
    return new Triple(tmp, tmp_0, (c == null ? true : !(c == null)) ? c : THROW_CCE());
  }
  function TripleSerializer$descriptor$lambda(this$0) {
    return function ($this$buildClassSerialDescriptor) {
      $this$buildClassSerialDescriptor.h1l('first', this$0.p24_1.w1k());
      $this$buildClassSerialDescriptor.h1l('second', this$0.q24_1.w1k());
      $this$buildClassSerialDescriptor.h1l('third', this$0.r24_1.w1k());
      return Unit_instance;
    };
  }
  function TripleSerializer_0(aSerializer, bSerializer, cSerializer) {
    this.p24_1 = aSerializer;
    this.q24_1 = bSerializer;
    this.r24_1 = cSerializer;
    var tmp = this;
    tmp.s24_1 = buildClassSerialDescriptor('kotlin.Triple', [], TripleSerializer$descriptor$lambda(this));
  }
  protoOf(TripleSerializer_0).w1k = function () {
    return this.s24_1;
  };
  protoOf(TripleSerializer_0).t24 = function (encoder, value) {
    var structuredEncoder = encoder.f1o(this.s24_1);
    structuredEncoder.w1p(this.s24_1, 0, this.p24_1, value.bm_1);
    structuredEncoder.w1p(this.s24_1, 1, this.q24_1, value.cm_1);
    structuredEncoder.w1p(this.s24_1, 2, this.r24_1, value.dm_1);
    structuredEncoder.g1o(this.s24_1);
  };
  protoOf(TripleSerializer_0).x1k = function (encoder, value) {
    return this.t24(encoder, value instanceof Triple ? value : THROW_CCE());
  };
  protoOf(TripleSerializer_0).y1k = function (decoder) {
    var composite = decoder.f1o(this.s24_1);
    if (composite.v1o()) {
      return decodeSequentially_1(this, composite);
    }
    return decodeStructure(this, composite);
  };
  function KeyValueSerializer(keySerializer, valueSerializer) {
    this.h24_1 = keySerializer;
    this.i24_1 = valueSerializer;
  }
  protoOf(KeyValueSerializer).j24 = function (encoder, value) {
    var structuredEncoder = encoder.f1o(this.w1k());
    structuredEncoder.w1p(this.w1k(), 0, this.h24_1, this.d24(value));
    structuredEncoder.w1p(this.w1k(), 1, this.i24_1, this.f24(value));
    structuredEncoder.g1o(this.w1k());
  };
  protoOf(KeyValueSerializer).x1k = function (encoder, value) {
    return this.j24(encoder, (value == null ? true : !(value == null)) ? value : THROW_CCE());
  };
  protoOf(KeyValueSerializer).y1k = function (decoder) {
    // Inline function 'kotlinx.serialization.encoding.decodeStructure' call
    var descriptor = this.w1k();
    var composite = decoder.f1o(descriptor);
    var tmp$ret$0;
    $l$block: {
      if (composite.v1o()) {
        var key = composite.s1o(this.w1k(), 0, this.h24_1);
        var value = composite.s1o(this.w1k(), 1, this.i24_1);
        tmp$ret$0 = this.g24(key, value);
        break $l$block;
      }
      var key_0 = get_NULL();
      var value_0 = get_NULL();
      mainLoop: while (true) {
        var idx = composite.w1o(this.w1k());
        switch (idx) {
          case -1:
            break mainLoop;
          case 0:
            key_0 = composite.s1o(this.w1k(), 0, this.h24_1);
            break;
          case 1:
            value_0 = composite.s1o(this.w1k(), 1, this.i24_1);
            break;
          default:
            throw SerializationException_init_$Create$_0('Invalid index: ' + idx);
        }
      }
      if (key_0 === get_NULL())
        throw SerializationException_init_$Create$_0("Element 'key' is missing");
      if (value_0 === get_NULL())
        throw SerializationException_init_$Create$_0("Element 'value' is missing");
      var tmp = (key_0 == null ? true : !(key_0 == null)) ? key_0 : THROW_CCE();
      tmp$ret$0 = this.g24(tmp, (value_0 == null ? true : !(value_0 == null)) ? value_0 : THROW_CCE());
    }
    var result = tmp$ret$0;
    composite.g1o(descriptor);
    return result;
  };
  var properties_initialized_Tuples_kt_3vs7ar;
  function _init_properties_Tuples_kt__dz0qyd() {
    if (!properties_initialized_Tuples_kt_3vs7ar) {
      properties_initialized_Tuples_kt_3vs7ar = true;
      NULL = new Object();
    }
  }
  function ULongSerializer() {
    ULongSerializer_instance = this;
    this.u24_1 = InlinePrimitiveDescriptor('kotlin.ULong', serializer_5(Companion_getInstance_2()));
  }
  protoOf(ULongSerializer).w1k = function () {
    return this.u24_1;
  };
  protoOf(ULongSerializer).v24 = function (encoder, value) {
    var tmp = encoder.l1p(this.u24_1);
    // Inline function 'kotlin.ULong.toLong' call
    var tmp$ret$0 = _ULong___get_data__impl__fggpzb(value);
    tmp.f1p(tmp$ret$0);
  };
  protoOf(ULongSerializer).x1k = function (encoder, value) {
    return this.v24(encoder, value instanceof ULong ? value.mn_1 : THROW_CCE());
  };
  protoOf(ULongSerializer).w24 = function (decoder) {
    // Inline function 'kotlin.toULong' call
    var this_0 = decoder.c1o(this.u24_1).w1n();
    return _ULong___init__impl__c78o9k(this_0);
  };
  protoOf(ULongSerializer).y1k = function (decoder) {
    return new ULong(this.w24(decoder));
  };
  var ULongSerializer_instance;
  function ULongSerializer_getInstance() {
    if (ULongSerializer_instance == null)
      new ULongSerializer();
    return ULongSerializer_instance;
  }
  function UIntSerializer() {
    UIntSerializer_instance = this;
    this.x24_1 = InlinePrimitiveDescriptor('kotlin.UInt', serializer_7(IntCompanionObject_instance));
  }
  protoOf(UIntSerializer).w1k = function () {
    return this.x24_1;
  };
  protoOf(UIntSerializer).y24 = function (encoder, value) {
    var tmp = encoder.l1p(this.x24_1);
    // Inline function 'kotlin.UInt.toInt' call
    var tmp$ret$0 = _UInt___get_data__impl__f0vqqw(value);
    tmp.e1p(tmp$ret$0);
  };
  protoOf(UIntSerializer).x1k = function (encoder, value) {
    return this.y24(encoder, value instanceof UInt ? value.an_1 : THROW_CCE());
  };
  protoOf(UIntSerializer).z24 = function (decoder) {
    // Inline function 'kotlin.toUInt' call
    var this_0 = decoder.c1o(this.x24_1).v1n();
    return _UInt___init__impl__l7qpdl(this_0);
  };
  protoOf(UIntSerializer).y1k = function (decoder) {
    return new UInt(this.z24(decoder));
  };
  var UIntSerializer_instance;
  function UIntSerializer_getInstance() {
    if (UIntSerializer_instance == null)
      new UIntSerializer();
    return UIntSerializer_instance;
  }
  function UShortSerializer() {
    UShortSerializer_instance = this;
    this.a25_1 = InlinePrimitiveDescriptor('kotlin.UShort', serializer_9(ShortCompanionObject_instance));
  }
  protoOf(UShortSerializer).w1k = function () {
    return this.a25_1;
  };
  protoOf(UShortSerializer).b25 = function (encoder, value) {
    var tmp = encoder.l1p(this.a25_1);
    // Inline function 'kotlin.UShort.toShort' call
    var tmp$ret$0 = _UShort___get_data__impl__g0245(value);
    tmp.d1p(tmp$ret$0);
  };
  protoOf(UShortSerializer).x1k = function (encoder, value) {
    return this.b25(encoder, value instanceof UShort ? value.yn_1 : THROW_CCE());
  };
  protoOf(UShortSerializer).c25 = function (decoder) {
    // Inline function 'kotlin.toUShort' call
    var this_0 = decoder.c1o(this.a25_1).u1n();
    return _UShort___init__impl__jigrne(this_0);
  };
  protoOf(UShortSerializer).y1k = function (decoder) {
    return new UShort(this.c25(decoder));
  };
  var UShortSerializer_instance;
  function UShortSerializer_getInstance() {
    if (UShortSerializer_instance == null)
      new UShortSerializer();
    return UShortSerializer_instance;
  }
  function UByteSerializer() {
    UByteSerializer_instance = this;
    this.d25_1 = InlinePrimitiveDescriptor('kotlin.UByte', serializer_11(ByteCompanionObject_instance));
  }
  protoOf(UByteSerializer).w1k = function () {
    return this.d25_1;
  };
  protoOf(UByteSerializer).e25 = function (encoder, value) {
    var tmp = encoder.l1p(this.d25_1);
    // Inline function 'kotlin.UByte.toByte' call
    var tmp$ret$0 = _UByte___get_data__impl__jof9qr(value);
    tmp.c1p(tmp$ret$0);
  };
  protoOf(UByteSerializer).x1k = function (encoder, value) {
    return this.e25(encoder, value instanceof UByte ? value.om_1 : THROW_CCE());
  };
  protoOf(UByteSerializer).f25 = function (decoder) {
    // Inline function 'kotlin.toUByte' call
    var this_0 = decoder.c1o(this.d25_1).t1n();
    return _UByte___init__impl__g9hnc4(this_0);
  };
  protoOf(UByteSerializer).y1k = function (decoder) {
    return new UByte(this.f25(decoder));
  };
  var UByteSerializer_instance;
  function UByteSerializer_getInstance() {
    if (UByteSerializer_instance == null)
      new UByteSerializer();
    return UByteSerializer_instance;
  }
  function get_EmptySerializersModuleLegacyJs() {
    _init_properties_SerializersModule_kt__u78ha3();
    return EmptySerializersModule;
  }
  var EmptySerializersModule;
  function SerializersModule() {
  }
  protoOf(SerializersModule).b1m = function (kClass, typeArgumentsSerializers, $super) {
    typeArgumentsSerializers = typeArgumentsSerializers === VOID ? emptyList() : typeArgumentsSerializers;
    return $super === VOID ? this.c1m(kClass, typeArgumentsSerializers) : $super.c1m.call(this, kClass, typeArgumentsSerializers);
  };
  function SerialModuleImpl(class2ContextualFactory, polyBase2Serializers, polyBase2DefaultSerializerProvider, polyBase2NamedSerializers, polyBase2DefaultDeserializerProvider, hasInterfaceContextualSerializers) {
    SerializersModule.call(this);
    this.h25_1 = class2ContextualFactory;
    this.i25_1 = polyBase2Serializers;
    this.j25_1 = polyBase2DefaultSerializerProvider;
    this.k25_1 = polyBase2NamedSerializers;
    this.l25_1 = polyBase2DefaultDeserializerProvider;
    this.m25_1 = hasInterfaceContextualSerializers;
  }
  protoOf(SerialModuleImpl).a1m = function () {
    return this.m25_1;
  };
  protoOf(SerialModuleImpl).e1q = function (baseClass, value) {
    if (!baseClass.ab(value))
      return null;
    var tmp0_safe_receiver = this.i25_1.h2(baseClass);
    var tmp = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.h2(getKClassFromExpression(value));
    var registered = (!(tmp == null) ? isInterface(tmp, SerializationStrategy) : false) ? tmp : null;
    if (!(registered == null))
      return registered;
    var tmp_0 = this.j25_1.h2(baseClass);
    var tmp1_safe_receiver = (!(tmp_0 == null) ? typeof tmp_0 === 'function' : false) ? tmp_0 : null;
    return tmp1_safe_receiver == null ? null : tmp1_safe_receiver(value);
  };
  protoOf(SerialModuleImpl).d1q = function (baseClass, serializedClassName) {
    var tmp0_safe_receiver = this.k25_1.h2(baseClass);
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.collections.get' call
      tmp = (isInterface(tmp0_safe_receiver, KtMap) ? tmp0_safe_receiver : THROW_CCE()).h2(serializedClassName);
    }
    var tmp_0 = tmp;
    var registered = (!(tmp_0 == null) ? isInterface(tmp_0, KSerializer) : false) ? tmp_0 : null;
    if (!(registered == null))
      return registered;
    var tmp_1 = this.l25_1.h2(baseClass);
    var tmp1_safe_receiver = (!(tmp_1 == null) ? typeof tmp_1 === 'function' : false) ? tmp_1 : null;
    return tmp1_safe_receiver == null ? null : tmp1_safe_receiver(serializedClassName);
  };
  protoOf(SerialModuleImpl).c1m = function (kClass, typeArgumentsSerializers) {
    var tmp0_safe_receiver = this.h25_1.h2(kClass);
    var tmp = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.n25(typeArgumentsSerializers);
    return (tmp == null ? true : isInterface(tmp, KSerializer)) ? tmp : null;
  };
  protoOf(SerialModuleImpl).g25 = function (collector) {
    // Inline function 'kotlin.collections.forEach' call
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s = this.h25_1.u().j();
    while (_iterator__ex2g4s.k()) {
      var element = _iterator__ex2g4s.l();
      // Inline function 'kotlin.collections.component1' call
      var kclass = element.v();
      // Inline function 'kotlin.collections.component2' call
      var serial = element.w();
      if (serial instanceof Argless) {
        var tmp = isInterface(kclass, KClass) ? kclass : THROW_CCE();
        var tmp_0 = serial.q25_1;
        collector.r25(tmp, isInterface(tmp_0, KSerializer) ? tmp_0 : THROW_CCE());
      } else {
        if (serial instanceof WithTypeArguments) {
          collector.p25(kclass, serial.o25_1);
        } else {
          noWhenBranchMatchedException();
        }
      }
    }
    // Inline function 'kotlin.collections.forEach' call
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s_0 = this.i25_1.u().j();
    while (_iterator__ex2g4s_0.k()) {
      var element_0 = _iterator__ex2g4s_0.l();
      // Inline function 'kotlin.collections.component1' call
      var baseClass = element_0.v();
      // Inline function 'kotlin.collections.component2' call
      var classMap = element_0.w();
      // Inline function 'kotlin.collections.forEach' call
      // Inline function 'kotlin.collections.iterator' call
      var _iterator__ex2g4s_1 = classMap.u().j();
      while (_iterator__ex2g4s_1.k()) {
        var element_1 = _iterator__ex2g4s_1.l();
        // Inline function 'kotlin.collections.component1' call
        var actualClass = element_1.v();
        // Inline function 'kotlin.collections.component2' call
        var serializer = element_1.w();
        var tmp_1 = isInterface(baseClass, KClass) ? baseClass : THROW_CCE();
        var tmp_2 = isInterface(actualClass, KClass) ? actualClass : THROW_CCE();
        // Inline function 'kotlinx.serialization.internal.cast' call
        var tmp$ret$11 = isInterface(serializer, KSerializer) ? serializer : THROW_CCE();
        collector.s25(tmp_1, tmp_2, tmp$ret$11);
      }
    }
    // Inline function 'kotlin.collections.forEach' call
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s_2 = this.j25_1.u().j();
    while (_iterator__ex2g4s_2.k()) {
      var element_2 = _iterator__ex2g4s_2.l();
      // Inline function 'kotlin.collections.component1' call
      var baseClass_0 = element_2.v();
      // Inline function 'kotlin.collections.component2' call
      var provider = element_2.w();
      var tmp_3 = isInterface(baseClass_0, KClass) ? baseClass_0 : THROW_CCE();
      collector.t25(tmp_3, typeof provider === 'function' ? provider : THROW_CCE());
    }
    // Inline function 'kotlin.collections.forEach' call
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s_3 = this.l25_1.u().j();
    while (_iterator__ex2g4s_3.k()) {
      var element_3 = _iterator__ex2g4s_3.l();
      // Inline function 'kotlin.collections.component1' call
      var baseClass_1 = element_3.v();
      // Inline function 'kotlin.collections.component2' call
      var provider_0 = element_3.w();
      var tmp_4 = isInterface(baseClass_1, KClass) ? baseClass_1 : THROW_CCE();
      collector.u25(tmp_4, typeof provider_0 === 'function' ? provider_0 : THROW_CCE());
    }
  };
  function Argless() {
  }
  function WithTypeArguments() {
  }
  function ContextualProvider() {
  }
  var properties_initialized_SerializersModule_kt_fjigjn;
  function _init_properties_SerializersModule_kt__u78ha3() {
    if (!properties_initialized_SerializersModule_kt_fjigjn) {
      properties_initialized_SerializersModule_kt_fjigjn = true;
      EmptySerializersModule = new SerialModuleImpl(emptyMap(), emptyMap(), emptyMap(), emptyMap(), emptyMap(), false);
    }
  }
  function EmptySerializersModule_0() {
    return get_EmptySerializersModuleLegacyJs();
  }
  function SerializersModuleCollector$contextual$lambda($serializer) {
    return function (it) {
      return $serializer;
    };
  }
  function SerializersModuleCollector() {
  }
  function SerializableWith(serializer) {
    this.v25_1 = serializer;
  }
  protoOf(SerializableWith).equals = function (other) {
    if (!(other instanceof SerializableWith))
      return false;
    var tmp0_other_with_cast = other instanceof SerializableWith ? other : THROW_CCE();
    if (!this.v25_1.equals(tmp0_other_with_cast.v25_1))
      return false;
    return true;
  };
  protoOf(SerializableWith).hashCode = function () {
    return imul(getStringHashCode('serializer'), 127) ^ this.v25_1.hashCode();
  };
  protoOf(SerializableWith).toString = function () {
    return '@kotlinx.serialization.SerializableWith(' + 'serializer=' + toString(this.v25_1) + ')';
  };
  function createCache(factory) {
    return new createCache$1(factory);
  }
  function createParametrizedCache(factory) {
    return new createParametrizedCache$1(factory);
  }
  function isInterface_0(_this__u8e3s4) {
    return get_isInterface(_this__u8e3s4);
  }
  function initBuiltins() {
    return mapOf([to(PrimitiveClasses_getInstance().fc(), serializer_1(StringCompanionObject_instance)), to(getKClass(Char), serializer_2(Companion_getInstance_1())), to(PrimitiveClasses_getInstance().ic(), CharArraySerializer()), to(PrimitiveClasses_getInstance().dc(), serializer_3(DoubleCompanionObject_instance)), to(PrimitiveClasses_getInstance().oc(), DoubleArraySerializer()), to(PrimitiveClasses_getInstance().cc(), serializer_4(FloatCompanionObject_instance)), to(PrimitiveClasses_getInstance().nc(), FloatArraySerializer()), to(getKClass(Long), serializer_5(Companion_getInstance_2())), to(PrimitiveClasses_getInstance().mc(), LongArraySerializer()), to(getKClass(ULong), serializer_6(Companion_getInstance_3())), to(getKClass(ULongArray), ULongArraySerializer()), to(PrimitiveClasses_getInstance().bc(), serializer_7(IntCompanionObject_instance)), to(PrimitiveClasses_getInstance().lc(), IntArraySerializer()), to(getKClass(UInt), serializer_8(Companion_getInstance_4())), to(getKClass(UIntArray), UIntArraySerializer()), to(PrimitiveClasses_getInstance().ac(), serializer_9(ShortCompanionObject_instance)), to(PrimitiveClasses_getInstance().kc(), ShortArraySerializer()), to(getKClass(UShort), serializer_10(Companion_getInstance_5())), to(getKClass(UShortArray), UShortArraySerializer()), to(PrimitiveClasses_getInstance().zb(), serializer_11(ByteCompanionObject_instance)), to(PrimitiveClasses_getInstance().jc(), ByteArraySerializer()), to(getKClass(UByte), serializer_12(Companion_getInstance_6())), to(getKClass(UByteArray), UByteArraySerializer()), to(PrimitiveClasses_getInstance().yb(), serializer_13(BooleanCompanionObject_instance)), to(PrimitiveClasses_getInstance().hc(), BooleanArraySerializer()), to(getKClass(Unit), serializer_14(Unit_instance)), to(PrimitiveClasses_getInstance().xb(), NothingSerializer()), to(getKClass(Duration), serializer_15(Companion_getInstance())), to(getKClass(Uuid), serializer_16(Companion_getInstance_0()))]);
  }
  function get_isInterface(_this__u8e3s4) {
    if (_this__u8e3s4 === PrimitiveClasses_getInstance().xb())
      return false;
    // Inline function 'kotlin.js.asDynamic' call
    var tmp0_safe_receiver = get_js(_this__u8e3s4).$metadata$;
    return (tmp0_safe_receiver == null ? null : tmp0_safe_receiver.kind) == 'interface';
  }
  function compiledSerializerImpl(_this__u8e3s4) {
    var tmp0_elvis_lhs = constructSerializerForGivenTypeArgs(_this__u8e3s4, []);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      var tmp_0;
      if (_this__u8e3s4 === PrimitiveClasses_getInstance().xb()) {
        tmp_0 = NothingSerializer_getInstance();
      } else {
        // Inline function 'kotlin.js.asDynamic' call
        var tmp1_safe_receiver = get_js(_this__u8e3s4).Companion;
        tmp_0 = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.serializer();
      }
      var tmp_1 = tmp_0;
      tmp = (!(tmp_1 == null) ? isInterface(tmp_1, KSerializer) : false) ? tmp_1 : null;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function platformSpecificSerializerNotRegistered(_this__u8e3s4) {
    throw SerializationException_init_$Create$_0(notRegisteredMessage(_this__u8e3s4) + 'To get enum serializer on Kotlin/JS, it should be annotated with @Serializable annotation.');
  }
  function isReferenceArray(rootClass) {
    return rootClass.equals(PrimitiveClasses_getInstance().ec());
  }
  function constructSerializerForGivenTypeArgs(_this__u8e3s4, args) {
    var tmp;
    try {
      // Inline function 'kotlin.reflect.findAssociatedObject' call
      var assocObject = findAssociatedObject(_this__u8e3s4, getKClass(SerializableWith));
      var tmp_0;
      if (!(assocObject == null) ? isInterface(assocObject, KSerializer) : false) {
        tmp_0 = isInterface(assocObject, KSerializer) ? assocObject : THROW_CCE();
      } else {
        if (!(assocObject == null) ? isInterface(assocObject, SerializerFactory) : false) {
          var tmp_1 = assocObject.v1w(args.slice());
          tmp_0 = isInterface(tmp_1, KSerializer) ? tmp_1 : THROW_CCE();
        } else {
          tmp_0 = null;
        }
      }
      tmp = tmp_0;
    } catch ($p) {
      var tmp_2;
      var e = $p;
      tmp_2 = null;
      tmp = tmp_2;
    }
    return tmp;
  }
  function toNativeArrayImpl(_this__u8e3s4, eClass) {
    // Inline function 'kotlin.collections.toTypedArray' call
    return copyToArray(_this__u8e3s4);
  }
  function getChecked(_this__u8e3s4, index) {
    if (!(0 <= index ? index <= (_this__u8e3s4.length - 1 | 0) : false))
      throw IndexOutOfBoundsException_init_$Create$('Index ' + index + ' out of bounds ' + get_indices(_this__u8e3s4).toString());
    return _this__u8e3s4[index];
  }
  function getChecked_0(_this__u8e3s4, index) {
    if (!(0 <= index ? index <= (_this__u8e3s4.length - 1 | 0) : false))
      throw IndexOutOfBoundsException_init_$Create$('Index ' + index + ' out of bounds ' + get_indices_0(_this__u8e3s4).toString());
    return _this__u8e3s4[index];
  }
  function createCache$1($factory) {
    this.w25_1 = $factory;
  }
  protoOf(createCache$1).d1m = function (key) {
    return this.w25_1(key);
  };
  function createParametrizedCache$1($factory) {
    this.x25_1 = $factory;
  }
  protoOf(createParametrizedCache$1).e1m = function (key, types) {
    // Inline function 'kotlin.runCatching' call
    var tmp;
    try {
      // Inline function 'kotlin.Companion.success' call
      var value = this.x25_1(key, types);
      tmp = _Result___init__impl__xyqfz8(value);
    } catch ($p) {
      var tmp_0;
      if ($p instanceof Error) {
        var e = $p;
        // Inline function 'kotlin.Companion.failure' call
        tmp_0 = _Result___init__impl__xyqfz8(createFailure(e));
      } else {
        throw $p;
      }
      tmp = tmp_0;
    }
    return tmp;
  };
  //region block: post-declaration
  protoOf(SerialDescriptorImpl).f1m = get_isNullable;
  protoOf(SerialDescriptorImpl).k1m = get_isInline;
  protoOf(AbstractDecoder).s1o = decodeSerializableElement$default;
  protoOf(AbstractDecoder).e1o = decodeSerializableValue;
  protoOf(AbstractDecoder).v1o = decodeSequentially;
  protoOf(AbstractDecoder).x1o = decodeCollectionSize;
  protoOf(AbstractEncoder).a1q = encodeNotNullMark;
  protoOf(AbstractEncoder).b1q = beginCollection;
  protoOf(AbstractEncoder).x1p = encodeSerializableValue;
  protoOf(AbstractEncoder).z1p = encodeNullableSerializableValue;
  protoOf(AbstractEncoder).c1q = shouldEncodeElementDefault;
  protoOf(ListLikeDescriptor).f1m = get_isNullable;
  protoOf(ListLikeDescriptor).k1m = get_isInline;
  protoOf(ListLikeDescriptor).m1m = get_annotations;
  protoOf(MapLikeDescriptor).f1m = get_isNullable;
  protoOf(MapLikeDescriptor).k1m = get_isInline;
  protoOf(MapLikeDescriptor).m1m = get_annotations;
  protoOf(PluginGeneratedSerialDescriptor).f1m = get_isNullable;
  protoOf(PluginGeneratedSerialDescriptor).k1m = get_isInline;
  protoOf(InlinePrimitiveDescriptor$1).l1w = typeParametersSerializers;
  protoOf(NothingSerialDescriptor).f1m = get_isNullable;
  protoOf(NothingSerialDescriptor).k1m = get_isInline;
  protoOf(NothingSerialDescriptor).m1m = get_annotations;
  protoOf(PrimitiveSerialDescriptor_0).f1m = get_isNullable;
  protoOf(PrimitiveSerialDescriptor_0).k1m = get_isInline;
  protoOf(PrimitiveSerialDescriptor_0).m1m = get_annotations;
  protoOf(TaggedEncoder).b1q = beginCollection;
  protoOf(TaggedEncoder).x1p = encodeSerializableValue;
  protoOf(TaggedEncoder).z1p = encodeNullableSerializableValue;
  protoOf(TaggedEncoder).c1q = shouldEncodeElementDefault;
  protoOf(TaggedDecoder).s1o = decodeSerializableElement$default;
  protoOf(TaggedDecoder).e1o = decodeSerializableValue;
  protoOf(TaggedDecoder).v1o = decodeSequentially;
  protoOf(TaggedDecoder).x1o = decodeCollectionSize;
  //endregion
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = MissingFieldException_init_$Create$_0;
  _.$_$.b = SerializationException_init_$Init$_0;
  _.$_$.c = SerializationException_init_$Create$_0;
  _.$_$.d = UnknownFieldException_init_$Create$;
  _.$_$.e = SEALED_getInstance;
  _.$_$.f = STRING_getInstance;
  _.$_$.g = CONTEXTUAL_getInstance;
  _.$_$.h = ENUM_getInstance;
  _.$_$.i = CLASS_getInstance;
  _.$_$.j = LIST_getInstance;
  _.$_$.k = MAP_getInstance;
  _.$_$.l = OBJECT_getInstance;
  _.$_$.m = BooleanSerializer_getInstance;
  _.$_$.n = DoubleSerializer_getInstance;
  _.$_$.o = FloatSerializer_getInstance;
  _.$_$.p = IntSerializer_getInstance;
  _.$_$.q = LongSerializer_getInstance;
  _.$_$.r = StringSerializer_getInstance;
  _.$_$.s = ListSerializer;
  _.$_$.t = MapSerializer;
  _.$_$.u = get_nullable;
  _.$_$.v = serializer_1;
  _.$_$.w = serializer_10;
  _.$_$.x = serializer_8;
  _.$_$.y = serializer_12;
  _.$_$.z = serializer_6;
  _.$_$.a1 = PolymorphicKind;
  _.$_$.b1 = PrimitiveKind;
  _.$_$.c1 = PrimitiveSerialDescriptor;
  _.$_$.d1 = get_annotations;
  _.$_$.e1 = get_isInline;
  _.$_$.f1 = get_isNullable;
  _.$_$.g1 = SerialDescriptor;
  _.$_$.h1 = ENUM;
  _.$_$.i1 = buildClassSerialDescriptor;
  _.$_$.j1 = buildSerialDescriptor;
  _.$_$.k1 = getContextualDescriptor;
  _.$_$.l1 = AbstractDecoder;
  _.$_$.m1 = AbstractEncoder;
  _.$_$.n1 = CompositeDecoder;
  _.$_$.o1 = CompositeEncoder;
  _.$_$.p1 = Decoder;
  _.$_$.q1 = Encoder;
  _.$_$.r1 = AbstractPolymorphicSerializer;
  _.$_$.s1 = ArrayListSerializer;
  _.$_$.t1 = ElementMarker;
  _.$_$.u1 = typeParametersSerializers;
  _.$_$.v1 = GeneratedSerializer;
  _.$_$.w1 = InlinePrimitiveDescriptor;
  _.$_$.x1 = LinkedHashMapSerializer;
  _.$_$.y1 = NamedValueDecoder;
  _.$_$.z1 = NamedValueEncoder;
  _.$_$.a2 = PluginGeneratedSerialDescriptor;
  _.$_$.b2 = SerializerFactory;
  _.$_$.c2 = createAnnotatedEnumSerializer;
  _.$_$.d2 = createSimpleEnumSerializer;
  _.$_$.e2 = jsonCachedSerialNames;
  _.$_$.f2 = throwArrayMissingFieldException;
  _.$_$.g2 = throwMissingFieldException;
  _.$_$.h2 = EmptySerializersModule_0;
  _.$_$.i2 = contextual;
  _.$_$.j2 = SerializersModuleCollector;
  _.$_$.k2 = DeserializationStrategy;
  _.$_$.l2 = KSerializer;
  _.$_$.m2 = MissingFieldException;
  _.$_$.n2 = SealedClassSerializer;
  _.$_$.o2 = SerializationException;
  _.$_$.p2 = SerializationStrategy;
  _.$_$.q2 = findPolymorphicSerializer_0;
  _.$_$.r2 = findPolymorphicSerializer;
  _.$_$.s2 = serializer_0;
  _.$_$.t2 = serializer;
  //endregion
  return _;
}));

//# sourceMappingURL=kotlinx-serialization-kotlinx-serialization-core.js.map
