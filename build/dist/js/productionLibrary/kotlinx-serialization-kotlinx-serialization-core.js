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
  var protoOf = kotlin_kotlin.$_$.xb;
  var initMetadataForInterface = kotlin_kotlin.$_$.xa;
  var VOID = kotlin_kotlin.$_$.h;
  var StringCompanionObject_instance = kotlin_kotlin.$_$.s4;
  var Unit_instance = kotlin_kotlin.$_$.f5;
  var emptyList = kotlin_kotlin.$_$.t6;
  var LazyThreadSafetyMode_PUBLICATION_getInstance = kotlin_kotlin.$_$.l;
  var lazy = kotlin_kotlin.$_$.zg;
  var toString = kotlin_kotlin.$_$.bc;
  var initMetadataForClass = kotlin_kotlin.$_$.ta;
  var getKClassFromExpression = kotlin_kotlin.$_$.e;
  var KProperty1 = kotlin_kotlin.$_$.vc;
  var getPropertyCallableRef = kotlin_kotlin.$_$.qa;
  var IllegalArgumentException_init_$Init$ = kotlin_kotlin.$_$.r1;
  var objectCreate = kotlin_kotlin.$_$.wb;
  var captureStack = kotlin_kotlin.$_$.ea;
  var IllegalArgumentException_init_$Init$_0 = kotlin_kotlin.$_$.t1;
  var IllegalArgumentException_init_$Init$_1 = kotlin_kotlin.$_$.v1;
  var IllegalArgumentException = kotlin_kotlin.$_$.vf;
  var collectionSizeOrDefault = kotlin_kotlin.$_$.b6;
  var ArrayList_init_$Create$ = kotlin_kotlin.$_$.o;
  var THROW_CCE = kotlin_kotlin.$_$.cg;
  var KClass = kotlin_kotlin.$_$.rc;
  var isInterface = kotlin_kotlin.$_$.ib;
  var Triple = kotlin_kotlin.$_$.eg;
  var getKClass = kotlin_kotlin.$_$.f;
  var Pair = kotlin_kotlin.$_$.zf;
  var Entry = kotlin_kotlin.$_$.n5;
  var KtMap = kotlin_kotlin.$_$.o5;
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
  var Result = kotlin_kotlin.$_$.ag;
  var ensureNotNull = kotlin_kotlin.$_$.ug;
  var equals = kotlin_kotlin.$_$.ma;
  var getStringHashCode = kotlin_kotlin.$_$.ra;
  var isBlank = kotlin_kotlin.$_$.od;
  var IllegalArgumentException_init_$Create$ = kotlin_kotlin.$_$.u1;
  var toList = kotlin_kotlin.$_$.u8;
  var ArrayList_init_$Create$_0 = kotlin_kotlin.$_$.p;
  var HashSet_init_$Create$ = kotlin_kotlin.$_$.v;
  var toHashSet = kotlin_kotlin.$_$.r8;
  var toBooleanArray = kotlin_kotlin.$_$.q8;
  var withIndex = kotlin_kotlin.$_$.b9;
  var to = kotlin_kotlin.$_$.gh;
  var toMap = kotlin_kotlin.$_$.w8;
  var lazy_0 = kotlin_kotlin.$_$.ah;
  var contentEquals = kotlin_kotlin.$_$.d6;
  var until = kotlin_kotlin.$_$.qc;
  var joinToString = kotlin_kotlin.$_$.h7;
  var initMetadataForObject = kotlin_kotlin.$_$.za;
  var Long = kotlin_kotlin.$_$.xf;
  var Char = kotlin_kotlin.$_$.nf;
  var Duration__toIsoString_impl_9h6wsm = kotlin_kotlin.$_$.n2;
  var Duration = kotlin_kotlin.$_$.kf;
  var Companion_getInstance = kotlin_kotlin.$_$.w4;
  var Uuid = kotlin_kotlin.$_$.lf;
  var Companion_getInstance_0 = kotlin_kotlin.$_$.x4;
  var toIntOrNull = kotlin_kotlin.$_$.re;
  var hashCode = kotlin_kotlin.$_$.sa;
  var IllegalStateException_init_$Create$ = kotlin_kotlin.$_$.y1;
  var ArrayList_init_$Create$_1 = kotlin_kotlin.$_$.q;
  var HashSet_init_$Create$_0 = kotlin_kotlin.$_$.w;
  var LinkedHashSet_init_$Create$ = kotlin_kotlin.$_$.a1;
  var LinkedHashSet_init_$Create$_0 = kotlin_kotlin.$_$.b1;
  var HashMap_init_$Create$ = kotlin_kotlin.$_$.s;
  var HashMap_init_$Create$_0 = kotlin_kotlin.$_$.t;
  var LinkedHashMap_init_$Create$ = kotlin_kotlin.$_$.y;
  var LinkedHashMap_init_$Create$_0 = kotlin_kotlin.$_$.z;
  var isArray = kotlin_kotlin.$_$.ab;
  var arrayIterator = kotlin_kotlin.$_$.ca;
  var asList = kotlin_kotlin.$_$.v5;
  var step = kotlin_kotlin.$_$.pc;
  var getValue = kotlin_kotlin.$_$.c7;
  var longArray = kotlin_kotlin.$_$.pb;
  var initMetadataForCompanion = kotlin_kotlin.$_$.ua;
  var get_lastIndex = kotlin_kotlin.$_$.j7;
  var countTrailingZeroBits = kotlin_kotlin.$_$.sg;
  var getOrNull = kotlin_kotlin.$_$.a7;
  var indexOf = kotlin_kotlin.$_$.d7;
  var contentToString = kotlin_kotlin.$_$.f6;
  var Enum = kotlin_kotlin.$_$.sf;
  var HashSet_init_$Create$_1 = kotlin_kotlin.$_$.u;
  var toString_0 = kotlin_kotlin.$_$.fh;
  var KTypeParameter = kotlin_kotlin.$_$.wc;
  var contentHashCode = kotlin_kotlin.$_$.e6;
  var booleanArray = kotlin_kotlin.$_$.da;
  var emptyMap = kotlin_kotlin.$_$.u6;
  var Companion_getInstance_1 = kotlin_kotlin.$_$.y4;
  var isCharArray = kotlin_kotlin.$_$.db;
  var charArray = kotlin_kotlin.$_$.ga;
  var DoubleCompanionObject_instance = kotlin_kotlin.$_$.o4;
  var isDoubleArray = kotlin_kotlin.$_$.fb;
  var FloatCompanionObject_instance = kotlin_kotlin.$_$.p4;
  var isFloatArray = kotlin_kotlin.$_$.gb;
  var Companion_getInstance_2 = kotlin_kotlin.$_$.z4;
  var isLongArray = kotlin_kotlin.$_$.jb;
  var Companion_getInstance_3 = kotlin_kotlin.$_$.d5;
  var _ULongArray___get_size__impl__ju6dtr = kotlin_kotlin.$_$.z3;
  var ULongArray = kotlin_kotlin.$_$.jg;
  var _ULongArray___init__impl__twm1l3 = kotlin_kotlin.$_$.v3;
  var _ULong___init__impl__c78o9k = kotlin_kotlin.$_$.s3;
  var ULongArray__get_impl_pr71q9 = kotlin_kotlin.$_$.x3;
  var _ULong___get_data__impl__fggpzb = kotlin_kotlin.$_$.t3;
  var IntCompanionObject_instance = kotlin_kotlin.$_$.q4;
  var isIntArray = kotlin_kotlin.$_$.hb;
  var Companion_getInstance_4 = kotlin_kotlin.$_$.c5;
  var _UIntArray___get_size__impl__r6l8ci = kotlin_kotlin.$_$.q3;
  var UIntArray = kotlin_kotlin.$_$.hg;
  var _UIntArray___init__impl__ghjpc6 = kotlin_kotlin.$_$.m3;
  var _UInt___init__impl__l7qpdl = kotlin_kotlin.$_$.j3;
  var UIntArray__get_impl_gp5kza = kotlin_kotlin.$_$.o3;
  var _UInt___get_data__impl__f0vqqw = kotlin_kotlin.$_$.k3;
  var ShortCompanionObject_instance = kotlin_kotlin.$_$.r4;
  var isShortArray = kotlin_kotlin.$_$.lb;
  var Companion_getInstance_5 = kotlin_kotlin.$_$.e5;
  var _UShortArray___get_size__impl__jqto1b = kotlin_kotlin.$_$.i4;
  var UShortArray = kotlin_kotlin.$_$.lg;
  var _UShortArray___init__impl__9b26ef = kotlin_kotlin.$_$.e4;
  var _UShort___init__impl__jigrne = kotlin_kotlin.$_$.b4;
  var UShortArray__get_impl_fnbhmx = kotlin_kotlin.$_$.g4;
  var _UShort___get_data__impl__g0245 = kotlin_kotlin.$_$.c4;
  var ByteCompanionObject_instance = kotlin_kotlin.$_$.n4;
  var isByteArray = kotlin_kotlin.$_$.cb;
  var Companion_getInstance_6 = kotlin_kotlin.$_$.b5;
  var _UByteArray___get_size__impl__h6pkdv = kotlin_kotlin.$_$.h3;
  var UByteArray = kotlin_kotlin.$_$.fg;
  var _UByteArray___init__impl__ip4y9n = kotlin_kotlin.$_$.e3;
  var _UByte___init__impl__g9hnc4 = kotlin_kotlin.$_$.a3;
  var UByteArray__get_impl_t5f3hv = kotlin_kotlin.$_$.f3;
  var _UByte___get_data__impl__jof9qr = kotlin_kotlin.$_$.b3;
  var BooleanCompanionObject_instance = kotlin_kotlin.$_$.m4;
  var isBooleanArray = kotlin_kotlin.$_$.bb;
  var coerceAtLeast = kotlin_kotlin.$_$.hc;
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
  var Unit = kotlin_kotlin.$_$.ng;
  var trimIndent = kotlin_kotlin.$_$.ef;
  var charSequenceLength = kotlin_kotlin.$_$.ia;
  var last = kotlin_kotlin.$_$.m7;
  var lastOrNull = kotlin_kotlin.$_$.l7;
  var get_lastIndex_0 = kotlin_kotlin.$_$.k7;
  var ULong = kotlin_kotlin.$_$.kg;
  var UInt = kotlin_kotlin.$_$.ig;
  var UShort = kotlin_kotlin.$_$.mg;
  var UByte = kotlin_kotlin.$_$.gg;
  var noWhenBranchMatchedException = kotlin_kotlin.$_$.bh;
  var PrimitiveClasses_getInstance = kotlin_kotlin.$_$.u4;
  var mapOf = kotlin_kotlin.$_$.t7;
  var get_js = kotlin_kotlin.$_$.nb;
  var findAssociatedObject = kotlin_kotlin.$_$.d;
  var get_indices = kotlin_kotlin.$_$.f7;
  var IndexOutOfBoundsException_init_$Create$ = kotlin_kotlin.$_$.b2;
  var get_indices_0 = kotlin_kotlin.$_$.e7;
  var Companion_instance = kotlin_kotlin.$_$.a5;
  var _Result___init__impl__xyqfz8 = kotlin_kotlin.$_$.w2;
  var createFailure = kotlin_kotlin.$_$.tg;
  //endregion
  //region block: pre-declaration
  initMetadataForInterface(SerializationStrategy, 'SerializationStrategy');
  initMetadataForInterface(DeserializationStrategy, 'DeserializationStrategy');
  initMetadataForInterface(KSerializer, 'KSerializer', VOID, VOID, [SerializationStrategy, DeserializationStrategy]);
  initMetadataForClass(AbstractPolymorphicSerializer, 'AbstractPolymorphicSerializer', VOID, VOID, [KSerializer]);
  initMetadataForClass(PolymorphicSerializer, 'PolymorphicSerializer', VOID, AbstractPolymorphicSerializer);
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
    return deserializer.v1k(this);
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
    return $super === VOID ? this.g1o(descriptor, index, deserializer, previousValue) : $super.g1o.call(this, descriptor, index, deserializer, previousValue);
  }
  initMetadataForInterface(CompositeDecoder, 'CompositeDecoder');
  initMetadataForClass(AbstractDecoder, 'AbstractDecoder', VOID, VOID, [Decoder, CompositeDecoder]);
  function encodeNotNullMark() {
  }
  function beginCollection(descriptor, collectionSize) {
    return this.u1n(descriptor);
  }
  function encodeSerializableValue(serializer, value) {
    serializer.u1k(this, value);
  }
  function encodeNullableSerializableValue(serializer, value) {
    var isNullabilitySupported = serializer.t1k().t1l();
    if (isNullabilitySupported) {
      return this.m1p(isInterface(serializer, SerializationStrategy) ? serializer : THROW_CCE(), value);
    }
    if (value == null) {
      this.p1o();
    } else {
      this.p1p();
      this.m1p(serializer, value);
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
    return this.e25(kClass, SerializersModuleCollector$contextual$lambda(serializer));
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
      $this$buildSerialDescriptor.e1l('type', serializer_0(StringCompanionObject_instance).t1k());
      $this$buildSerialDescriptor.e1l('value', buildSerialDescriptor('kotlinx.serialization.Polymorphic<' + this$0.f1l_1.ya() + '>', CONTEXTUAL_getInstance(), []));
      $this$buildSerialDescriptor.y1k_1 = this$0.g1l_1;
      return Unit_instance;
    };
  }
  function PolymorphicSerializer$descriptor$delegate$lambda(this$0) {
    return function () {
      var tmp = OPEN_getInstance();
      return withContext(buildSerialDescriptor('kotlinx.serialization.Polymorphic', tmp, [], PolymorphicSerializer$descriptor$delegate$lambda$lambda(this$0)), this$0.f1l_1);
    };
  }
  function PolymorphicSerializer(baseClass) {
    AbstractPolymorphicSerializer.call(this);
    this.f1l_1 = baseClass;
    this.g1l_1 = emptyList();
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp.h1l_1 = lazy(tmp_0, PolymorphicSerializer$descriptor$delegate$lambda(this));
  }
  protoOf(PolymorphicSerializer).i1l = function () {
    return this.f1l_1;
  };
  protoOf(PolymorphicSerializer).t1k = function () {
    var tmp0 = this.h1l_1;
    // Inline function 'kotlin.getValue' call
    descriptor$factory();
    return tmp0.w();
  };
  protoOf(PolymorphicSerializer).toString = function () {
    return 'kotlinx.serialization.PolymorphicSerializer(baseClass: ' + toString(this.f1l_1) + ')';
  };
  function findPolymorphicSerializer(_this__u8e3s4, encoder, value) {
    var tmp0_elvis_lhs = _this__u8e3s4.l1l(encoder, value);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throwSubtypeNotRegistered(getKClassFromExpression(value), _this__u8e3s4.i1l());
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function findPolymorphicSerializer_0(_this__u8e3s4, decoder, klassName) {
    var tmp0_elvis_lhs = _this__u8e3s4.k1l(decoder, klassName);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throwSubtypeNotRegistered_0(klassName, _this__u8e3s4.i1l());
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function descriptor$factory() {
    return getPropertyCallableRef('descriptor', 1, KProperty1, function (receiver) {
      return receiver.t1k();
    }, null);
  }
  function SealedClassSerializer() {
  }
  protoOf(SealedClassSerializer).t1k = function () {
    var tmp0 = this.m1l_1;
    // Inline function 'kotlin.getValue' call
    descriptor$factory_0();
    return tmp0.w();
  };
  function descriptor$factory_0() {
    return getPropertyCallableRef('descriptor', 1, KProperty1, function (receiver) {
      return receiver.t1k();
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
    MissingFieldException.call($this, missingFields, missingFields.j() === 1 ? "Field '" + missingFields.o(0) + "' is required for type with serial name '" + serialName + "', but it was missing" : 'Fields ' + toString(missingFields) + " are required for type with serial name '" + serialName + "', but they were missing", null);
    return $this;
  }
  function MissingFieldException_init_$Create$(missingFields, serialName) {
    var tmp = MissingFieldException_init_$Init$(missingFields, serialName, objectCreate(protoOf(MissingFieldException)));
    captureStack(tmp, MissingFieldException_init_$Create$);
    return tmp;
  }
  function MissingFieldException(missingFields, message, cause) {
    SerializationException_init_$Init$_1(message, cause, this);
    captureStack(this, MissingFieldException);
    this.n1l_1 = missingFields;
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
      var _iterator__ex2g4s = typeArguments.g();
      while (_iterator__ex2g4s.h()) {
        var item = _iterator__ex2g4s.i();
        var tmp$ret$0 = serializer(_this__u8e3s4, item);
        destination.e(tmp$ret$0);
      }
      tmp = destination;
    } else {
      // Inline function 'kotlin.collections.map' call
      // Inline function 'kotlin.collections.mapTo' call
      var destination_0 = ArrayList_init_$Create$(collectionSizeOrDefault(typeArguments, 10));
      var _iterator__ex2g4s_0 = typeArguments.g();
      while (_iterator__ex2g4s_0.h()) {
        var item_0 = _iterator__ex2g4s_0.i();
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
    var isNullable = type.pb();
    // Inline function 'kotlin.collections.map' call
    var this_0 = type.ob();
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$(collectionSizeOrDefault(this_0, 10));
    var _iterator__ex2g4s = this_0.g();
    while (_iterator__ex2g4s.h()) {
      var item = _iterator__ex2g4s.i();
      var tmp$ret$0 = typeOrThrow(item);
      destination.e(tmp$ret$0);
    }
    var typeArguments = destination;
    var tmp;
    if (typeArguments.p()) {
      var tmp_0;
      if (isInterface_0(rootClass) && !(_this__u8e3s4.p1l(rootClass) == null)) {
        tmp_0 = null;
      } else {
        tmp_0 = findCachedSerializer(rootClass, isNullable);
      }
      tmp = tmp_0;
    } else {
      var tmp_1;
      if (_this__u8e3s4.o1l()) {
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
      var tmp1_elvis_lhs = tmp0_elvis_lhs == null ? _this__u8e3s4.p1l(rootClass) : tmp0_elvis_lhs;
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
      var tmp4_elvis_lhs = tmp3_elvis_lhs == null ? _this__u8e3s4.q1l(rootClass, serializers) : tmp3_elvis_lhs;
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
  function serializerByKTypeImpl$lambda($typeArguments) {
    return function () {
      return $typeArguments.o(0).nb();
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
      var tmp0_safe_receiver = get_SERIALIZERS_CACHE().r1l(clazz);
      var tmp_0;
      if (tmp0_safe_receiver == null) {
        tmp_0 = null;
      } else {
        // Inline function 'kotlinx.serialization.internal.cast' call
        tmp_0 = isInterface(tmp0_safe_receiver, KSerializer) ? tmp0_safe_receiver : THROW_CCE();
      }
      tmp = tmp_0;
    } else {
      tmp = get_SERIALIZERS_CACHE_NULLABLE().r1l(clazz);
    }
    return tmp;
  }
  function findParametrizedCachedSerializer(clazz, types, isNullable) {
    _init_properties_SerializersCache_kt__hgwi2p();
    var tmp;
    if (!isNullable) {
      var tmp_0 = get_PARAMETRIZED_SERIALIZERS_CACHE().s1l(clazz, types);
      tmp = new Result(tmp_0) instanceof Result ? tmp_0 : THROW_CCE();
    } else {
      tmp = get_PARAMETRIZED_SERIALIZERS_CACHE_NULLABLE().s1l(clazz, types);
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
      return $types.o(0).nb();
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
      return $types.o(0).nb();
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
    if (_this__u8e3s4.t1k().t1l()) {
      tmp = isInterface(_this__u8e3s4, KSerializer) ? _this__u8e3s4 : THROW_CCE();
    } else {
      tmp = new NullableSerializer(_this__u8e3s4);
    }
    return tmp;
  }
  function serializer_0(_this__u8e3s4) {
    return StringSerializer_getInstance();
  }
  function serializer_1(_this__u8e3s4) {
    return CharSerializer_getInstance();
  }
  function CharArraySerializer() {
    return CharArraySerializer_getInstance();
  }
  function serializer_2(_this__u8e3s4) {
    return DoubleSerializer_getInstance();
  }
  function DoubleArraySerializer() {
    return DoubleArraySerializer_getInstance();
  }
  function serializer_3(_this__u8e3s4) {
    return FloatSerializer_getInstance();
  }
  function FloatArraySerializer() {
    return FloatArraySerializer_getInstance();
  }
  function serializer_4(_this__u8e3s4) {
    return LongSerializer_getInstance();
  }
  function LongArraySerializer() {
    return LongArraySerializer_getInstance();
  }
  function serializer_5(_this__u8e3s4) {
    return ULongSerializer_getInstance();
  }
  function ULongArraySerializer() {
    return ULongArraySerializer_getInstance();
  }
  function serializer_6(_this__u8e3s4) {
    return IntSerializer_getInstance();
  }
  function IntArraySerializer() {
    return IntArraySerializer_getInstance();
  }
  function serializer_7(_this__u8e3s4) {
    return UIntSerializer_getInstance();
  }
  function UIntArraySerializer() {
    return UIntArraySerializer_getInstance();
  }
  function serializer_8(_this__u8e3s4) {
    return ShortSerializer_getInstance();
  }
  function ShortArraySerializer() {
    return ShortArraySerializer_getInstance();
  }
  function serializer_9(_this__u8e3s4) {
    return UShortSerializer_getInstance();
  }
  function UShortArraySerializer() {
    return UShortArraySerializer_getInstance();
  }
  function serializer_10(_this__u8e3s4) {
    return ByteSerializer_getInstance();
  }
  function ByteArraySerializer() {
    return ByteArraySerializer_getInstance();
  }
  function serializer_11(_this__u8e3s4) {
    return UByteSerializer_getInstance();
  }
  function UByteArraySerializer() {
    return UByteArraySerializer_getInstance();
  }
  function serializer_12(_this__u8e3s4) {
    return BooleanSerializer_getInstance();
  }
  function BooleanArraySerializer() {
    return BooleanArraySerializer_getInstance();
  }
  function serializer_13(_this__u8e3s4) {
    return UnitSerializer_getInstance();
  }
  function NothingSerializer() {
    return NothingSerializer_getInstance();
  }
  function serializer_14(_this__u8e3s4) {
    return DurationSerializer_getInstance();
  }
  function serializer_15(_this__u8e3s4) {
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
    this.u1l_1 = original;
    this.v1l_1 = kClass;
    this.w1l_1 = this.u1l_1.x1l() + '<' + this.v1l_1.ya() + '>';
  }
  protoOf(ContextDescriptor).x1l = function () {
    return this.w1l_1;
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
    return equals(this.u1l_1, another.u1l_1) && another.v1l_1.equals(this.v1l_1);
  };
  protoOf(ContextDescriptor).hashCode = function () {
    var result = this.v1l_1.hashCode();
    result = imul(31, result) + getStringHashCode(this.w1l_1) | 0;
    return result;
  };
  protoOf(ContextDescriptor).toString = function () {
    return 'ContextDescriptor(kClass: ' + toString(this.v1l_1) + ', original: ' + toString(this.u1l_1) + ')';
  };
  protoOf(ContextDescriptor).y1l = function () {
    return this.u1l_1.y1l();
  };
  protoOf(ContextDescriptor).t1l = function () {
    return this.u1l_1.t1l();
  };
  protoOf(ContextDescriptor).z1l = function () {
    return this.u1l_1.z1l();
  };
  protoOf(ContextDescriptor).a1m = function () {
    return this.u1l_1.a1m();
  };
  protoOf(ContextDescriptor).b1m = function () {
    return this.u1l_1.b1m();
  };
  protoOf(ContextDescriptor).c1m = function (index) {
    return this.u1l_1.c1m(index);
  };
  protoOf(ContextDescriptor).d1m = function (name) {
    return this.u1l_1.d1m(name);
  };
  protoOf(ContextDescriptor).e1m = function (index) {
    return this.u1l_1.e1m(index);
  };
  protoOf(ContextDescriptor).f1m = function (index) {
    return this.u1l_1.f1m(index);
  };
  protoOf(ContextDescriptor).g1m = function (index) {
    return this.u1l_1.g1m(index);
  };
  function getContextualDescriptor(_this__u8e3s4, descriptor) {
    var tmp0_safe_receiver = get_capturedKClass(descriptor);
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      var tmp0_safe_receiver_0 = _this__u8e3s4.p1l(tmp0_safe_receiver);
      tmp = tmp0_safe_receiver_0 == null ? null : tmp0_safe_receiver_0.t1k();
    }
    return tmp;
  }
  function get_capturedKClass(_this__u8e3s4) {
    var tmp;
    if (_this__u8e3s4 instanceof ContextDescriptor) {
      tmp = _this__u8e3s4.v1l_1;
    } else {
      if (_this__u8e3s4 instanceof SerialDescriptorForNullable) {
        tmp = get_capturedKClass(_this__u8e3s4.h1m_1);
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
    this.l1m_1 = $this_elementDescriptors;
    this.k1m_1 = $this_elementDescriptors.a1m();
  }
  protoOf(elementDescriptors$1).h = function () {
    return this.k1m_1 > 0;
  };
  protoOf(elementDescriptors$1).i = function () {
    var tmp = this.l1m_1.a1m();
    var _unary__edvuaz = this.k1m_1;
    this.k1m_1 = _unary__edvuaz - 1 | 0;
    return this.l1m_1.f1m(tmp - _unary__edvuaz | 0);
  };
  function elementDescriptors$$inlined$Iterable$1($this_elementDescriptors) {
    this.m1m_1 = $this_elementDescriptors;
  }
  protoOf(elementDescriptors$$inlined$Iterable$1).g = function () {
    return new elementDescriptors$1(this.m1m_1);
  };
  function elementNames$1($this_elementNames) {
    this.o1m_1 = $this_elementNames;
    this.n1m_1 = $this_elementNames.a1m();
  }
  protoOf(elementNames$1).h = function () {
    return this.n1m_1 > 0;
  };
  protoOf(elementNames$1).i = function () {
    var tmp = this.o1m_1.a1m();
    var _unary__edvuaz = this.n1m_1;
    this.n1m_1 = _unary__edvuaz - 1 | 0;
    return this.o1m_1.c1m(tmp - _unary__edvuaz | 0);
  };
  function elementNames$$inlined$Iterable$1($this_elementNames) {
    this.p1m_1 = $this_elementNames;
  }
  protoOf(elementNames$$inlined$Iterable$1).g = function () {
    return new elementNames$1(this.p1m_1);
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
    return new SerialDescriptorImpl(serialName, kind, sdBuilder.z1k_1.j(), toList(typeParameters), sdBuilder);
  }
  function ClassSerialDescriptorBuilder(serialName) {
    this.w1k_1 = serialName;
    this.x1k_1 = false;
    this.y1k_1 = emptyList();
    this.z1k_1 = ArrayList_init_$Create$_0();
    this.a1l_1 = HashSet_init_$Create$();
    this.b1l_1 = ArrayList_init_$Create$_0();
    this.c1l_1 = ArrayList_init_$Create$_0();
    this.d1l_1 = ArrayList_init_$Create$_0();
  }
  protoOf(ClassSerialDescriptorBuilder).q1m = function (elementName, descriptor, annotations, isOptional) {
    // Inline function 'kotlin.require' call
    if (!this.a1l_1.e(elementName)) {
      var message = "Element with name '" + elementName + "' is already registered in " + this.w1k_1;
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    // Inline function 'kotlin.collections.plusAssign' call
    this.z1k_1.e(elementName);
    // Inline function 'kotlin.collections.plusAssign' call
    this.b1l_1.e(descriptor);
    // Inline function 'kotlin.collections.plusAssign' call
    this.c1l_1.e(annotations);
    // Inline function 'kotlin.collections.plusAssign' call
    this.d1l_1.e(isOptional);
  };
  protoOf(ClassSerialDescriptorBuilder).e1l = function (elementName, descriptor, annotations, isOptional, $super) {
    annotations = annotations === VOID ? emptyList() : annotations;
    isOptional = isOptional === VOID ? false : isOptional;
    var tmp;
    if ($super === VOID) {
      this.q1m(elementName, descriptor, annotations, isOptional);
      tmp = Unit_instance;
    } else {
      tmp = $super.q1m.call(this, elementName, descriptor, annotations, isOptional);
    }
    return tmp;
  };
  function _get__hashCode__tgwhef($this) {
    var tmp0 = $this.c1n_1;
    // Inline function 'kotlin.getValue' call
    _hashCode$factory();
    return tmp0.w();
  }
  function SerialDescriptorImpl$_hashCode$delegate$lambda(this$0) {
    return function () {
      return hashCodeImpl(this$0, this$0.b1n_1);
    };
  }
  function SerialDescriptorImpl$toString$lambda(this$0) {
    return function (it) {
      return this$0.c1m(it) + ': ' + this$0.f1m(it).x1l();
    };
  }
  function SerialDescriptorImpl(serialName, kind, elementsCount, typeParameters, builder) {
    this.r1m_1 = serialName;
    this.s1m_1 = kind;
    this.t1m_1 = elementsCount;
    this.u1m_1 = builder.y1k_1;
    this.v1m_1 = toHashSet(builder.z1k_1);
    var tmp = this;
    // Inline function 'kotlin.collections.toTypedArray' call
    var this_0 = builder.z1k_1;
    tmp.w1m_1 = copyToArray(this_0);
    this.x1m_1 = compactArray(builder.b1l_1);
    var tmp_0 = this;
    // Inline function 'kotlin.collections.toTypedArray' call
    var this_1 = builder.c1l_1;
    tmp_0.y1m_1 = copyToArray(this_1);
    this.z1m_1 = toBooleanArray(builder.d1l_1);
    var tmp_1 = this;
    // Inline function 'kotlin.collections.map' call
    var this_2 = withIndex(this.w1m_1);
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$(collectionSizeOrDefault(this_2, 10));
    var _iterator__ex2g4s = this_2.g();
    while (_iterator__ex2g4s.h()) {
      var item = _iterator__ex2g4s.i();
      var tmp$ret$2 = to(item.jg_1, item.ig_1);
      destination.e(tmp$ret$2);
    }
    tmp_1.a1n_1 = toMap(destination);
    this.b1n_1 = compactArray(typeParameters);
    var tmp_2 = this;
    tmp_2.c1n_1 = lazy_0(SerialDescriptorImpl$_hashCode$delegate$lambda(this));
  }
  protoOf(SerialDescriptorImpl).x1l = function () {
    return this.r1m_1;
  };
  protoOf(SerialDescriptorImpl).y1l = function () {
    return this.s1m_1;
  };
  protoOf(SerialDescriptorImpl).a1m = function () {
    return this.t1m_1;
  };
  protoOf(SerialDescriptorImpl).b1m = function () {
    return this.u1m_1;
  };
  protoOf(SerialDescriptorImpl).d1n = function () {
    return this.v1m_1;
  };
  protoOf(SerialDescriptorImpl).c1m = function (index) {
    return getChecked(this.w1m_1, index);
  };
  protoOf(SerialDescriptorImpl).d1m = function (name) {
    var tmp0_elvis_lhs = this.a1n_1.f2(name);
    return tmp0_elvis_lhs == null ? -3 : tmp0_elvis_lhs;
  };
  protoOf(SerialDescriptorImpl).e1m = function (index) {
    return getChecked(this.y1m_1, index);
  };
  protoOf(SerialDescriptorImpl).f1m = function (index) {
    return getChecked(this.x1m_1, index);
  };
  protoOf(SerialDescriptorImpl).g1m = function (index) {
    return getChecked_0(this.z1m_1, index);
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
      if (!contentEquals(this.b1n_1, other.b1n_1)) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      if (!(this.a1m() === other.a1m())) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      var inductionVariable = 0;
      var last = this.a1m();
      if (inductionVariable < last)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          if (!(this.f1m(index).x1l() === other.f1m(index).x1l())) {
            tmp$ret$0 = false;
            break $l$block_5;
          }
          if (!equals(this.f1m(index).y1l(), other.f1m(index).y1l())) {
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
    var tmp = until(0, this.t1m_1);
    var tmp_0 = this.r1m_1 + '(';
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
    return new SerialDescriptorImpl(serialName, CLASS_getInstance(), sdBuilder.z1k_1.j(), toList(typeParameters), sdBuilder);
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
    return ensureNotNull(getKClassFromExpression(this).ya());
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
  protoOf(AbstractDecoder).e1n = function () {
    throw SerializationException_init_$Create$_0(toString(getKClassFromExpression(this)) + " can't retrieve untyped values");
  };
  protoOf(AbstractDecoder).f1n = function () {
    return true;
  };
  protoOf(AbstractDecoder).g1n = function () {
    return null;
  };
  protoOf(AbstractDecoder).h1n = function () {
    var tmp = this.e1n();
    return typeof tmp === 'boolean' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).i1n = function () {
    var tmp = this.e1n();
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).j1n = function () {
    var tmp = this.e1n();
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).k1n = function () {
    var tmp = this.e1n();
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).l1n = function () {
    var tmp = this.e1n();
    return tmp instanceof Long ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).m1n = function () {
    var tmp = this.e1n();
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).n1n = function () {
    var tmp = this.e1n();
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).o1n = function () {
    var tmp = this.e1n();
    return tmp instanceof Char ? tmp.k1_1 : THROW_CCE();
  };
  protoOf(AbstractDecoder).p1n = function () {
    var tmp = this.e1n();
    return typeof tmp === 'string' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).q1n = function (enumDescriptor) {
    var tmp = this.e1n();
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).r1n = function (descriptor) {
    return this;
  };
  protoOf(AbstractDecoder).s1n = function (deserializer, previousValue) {
    return this.t1n(deserializer);
  };
  protoOf(AbstractDecoder).u1n = function (descriptor) {
    return this;
  };
  protoOf(AbstractDecoder).v1n = function (descriptor) {
  };
  protoOf(AbstractDecoder).w1n = function (descriptor, index) {
    return this.h1n();
  };
  protoOf(AbstractDecoder).x1n = function (descriptor, index) {
    return this.i1n();
  };
  protoOf(AbstractDecoder).y1n = function (descriptor, index) {
    return this.j1n();
  };
  protoOf(AbstractDecoder).z1n = function (descriptor, index) {
    return this.k1n();
  };
  protoOf(AbstractDecoder).a1o = function (descriptor, index) {
    return this.l1n();
  };
  protoOf(AbstractDecoder).b1o = function (descriptor, index) {
    return this.m1n();
  };
  protoOf(AbstractDecoder).c1o = function (descriptor, index) {
    return this.n1n();
  };
  protoOf(AbstractDecoder).d1o = function (descriptor, index) {
    return this.o1n();
  };
  protoOf(AbstractDecoder).e1o = function (descriptor, index) {
    return this.p1n();
  };
  protoOf(AbstractDecoder).f1o = function (descriptor, index) {
    return this.r1n(descriptor.f1m(index));
  };
  protoOf(AbstractDecoder).g1o = function (descriptor, index, deserializer, previousValue) {
    return this.s1n(deserializer, previousValue);
  };
  protoOf(AbstractDecoder).i1o = function (descriptor, index, deserializer, previousValue) {
    // Inline function 'kotlinx.serialization.encoding.decodeIfNullable' call
    var isNullabilitySupported = deserializer.t1k().t1l();
    var tmp;
    if (isNullabilitySupported || this.f1n()) {
      tmp = this.s1n(deserializer, previousValue);
    } else {
      tmp = this.g1n();
    }
    return tmp;
  };
  function AbstractEncoder() {
  }
  protoOf(AbstractEncoder).u1n = function (descriptor) {
    return this;
  };
  protoOf(AbstractEncoder).v1n = function (descriptor) {
  };
  protoOf(AbstractEncoder).n1o = function (descriptor, index) {
    return true;
  };
  protoOf(AbstractEncoder).o1o = function (value) {
    throw SerializationException_init_$Create$_0('Non-serializable ' + toString(getKClassFromExpression(value)) + ' is not supported by ' + toString(getKClassFromExpression(this)) + ' encoder');
  };
  protoOf(AbstractEncoder).p1o = function () {
    throw SerializationException_init_$Create$_0("'null' is not supported by default");
  };
  protoOf(AbstractEncoder).q1o = function (value) {
    return this.o1o(value);
  };
  protoOf(AbstractEncoder).r1o = function (value) {
    return this.o1o(value);
  };
  protoOf(AbstractEncoder).s1o = function (value) {
    return this.o1o(value);
  };
  protoOf(AbstractEncoder).t1o = function (value) {
    return this.o1o(value);
  };
  protoOf(AbstractEncoder).u1o = function (value) {
    return this.o1o(value);
  };
  protoOf(AbstractEncoder).v1o = function (value) {
    return this.o1o(value);
  };
  protoOf(AbstractEncoder).w1o = function (value) {
    return this.o1o(value);
  };
  protoOf(AbstractEncoder).x1o = function (value) {
    return this.o1o(new Char(value));
  };
  protoOf(AbstractEncoder).y1o = function (value) {
    return this.o1o(value);
  };
  protoOf(AbstractEncoder).z1o = function (enumDescriptor, index) {
    return this.o1o(index);
  };
  protoOf(AbstractEncoder).a1p = function (descriptor) {
    return this;
  };
  protoOf(AbstractEncoder).b1p = function (descriptor, index, value) {
    if (this.n1o(descriptor, index)) {
      this.q1o(value);
    }
  };
  protoOf(AbstractEncoder).c1p = function (descriptor, index, value) {
    if (this.n1o(descriptor, index)) {
      this.r1o(value);
    }
  };
  protoOf(AbstractEncoder).d1p = function (descriptor, index, value) {
    if (this.n1o(descriptor, index)) {
      this.s1o(value);
    }
  };
  protoOf(AbstractEncoder).e1p = function (descriptor, index, value) {
    if (this.n1o(descriptor, index)) {
      this.t1o(value);
    }
  };
  protoOf(AbstractEncoder).f1p = function (descriptor, index, value) {
    if (this.n1o(descriptor, index)) {
      this.u1o(value);
    }
  };
  protoOf(AbstractEncoder).g1p = function (descriptor, index, value) {
    if (this.n1o(descriptor, index)) {
      this.v1o(value);
    }
  };
  protoOf(AbstractEncoder).h1p = function (descriptor, index, value) {
    if (this.n1o(descriptor, index)) {
      this.w1o(value);
    }
  };
  protoOf(AbstractEncoder).i1p = function (descriptor, index, value) {
    if (this.n1o(descriptor, index)) {
      this.x1o(value);
    }
  };
  protoOf(AbstractEncoder).j1p = function (descriptor, index, value) {
    if (this.n1o(descriptor, index)) {
      this.y1o(value);
    }
  };
  protoOf(AbstractEncoder).k1p = function (descriptor, index) {
    return this.n1o(descriptor, index) ? this.a1p(descriptor.f1m(index)) : NoOpEncoder_getInstance();
  };
  protoOf(AbstractEncoder).l1p = function (descriptor, index, serializer, value) {
    if (this.n1o(descriptor, index)) {
      this.m1p(serializer, value);
    }
  };
  protoOf(AbstractEncoder).n1p = function (descriptor, index, serializer, value) {
    if (this.n1o(descriptor, index)) {
      this.o1p(serializer, value);
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
    var klassName = compositeDecoder.e1o($this.t1k(), 0);
    var serializer = findPolymorphicSerializer_0($this, compositeDecoder, klassName);
    return compositeDecoder.h1o($this.t1k(), 1, serializer);
  }
  function AbstractPolymorphicSerializer() {
  }
  protoOf(AbstractPolymorphicSerializer).j1l = function (encoder, value) {
    var actualSerializer = findPolymorphicSerializer(this, encoder, value);
    // Inline function 'kotlinx.serialization.encoding.encodeStructure' call
    var descriptor = this.t1k();
    var composite = encoder.u1n(descriptor);
    composite.j1p(this.t1k(), 0, actualSerializer.t1k().x1l());
    var tmp = this.t1k();
    // Inline function 'kotlinx.serialization.internal.cast' call
    var tmp$ret$0 = isInterface(actualSerializer, SerializationStrategy) ? actualSerializer : THROW_CCE();
    composite.l1p(tmp, 1, tmp$ret$0, value);
    composite.v1n(descriptor);
  };
  protoOf(AbstractPolymorphicSerializer).u1k = function (encoder, value) {
    return this.j1l(encoder, !(value == null) ? value : THROW_CCE());
  };
  protoOf(AbstractPolymorphicSerializer).v1k = function (decoder) {
    // Inline function 'kotlinx.serialization.encoding.decodeStructure' call
    var descriptor = this.t1k();
    var composite = decoder.u1n(descriptor);
    var tmp$ret$0;
    $l$block: {
      var klassName = null;
      var value = null;
      if (composite.k1o()) {
        tmp$ret$0 = decodeSequentially_0(this, composite);
        break $l$block;
      }
      mainLoop: while (true) {
        var index = composite.l1o(this.t1k());
        switch (index) {
          case -1:
            break mainLoop;
          case 0:
            klassName = composite.e1o(this.t1k(), index);
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
            value = composite.h1o(this.t1k(), index, serializer);
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
    composite.v1n(descriptor);
    return result;
  };
  protoOf(AbstractPolymorphicSerializer).k1l = function (decoder, klassName) {
    return decoder.j1o().s1p(this.i1l(), klassName);
  };
  protoOf(AbstractPolymorphicSerializer).l1l = function (encoder, value) {
    return encoder.j1o().t1p(this.i1l(), value);
  };
  function throwSubtypeNotRegistered(subClass, baseClass) {
    var tmp0_elvis_lhs = subClass.ya();
    throwSubtypeNotRegistered_0(tmp0_elvis_lhs == null ? toString(subClass) : tmp0_elvis_lhs, baseClass);
  }
  function throwSubtypeNotRegistered_0(subClassName, baseClass) {
    var scope = "in the polymorphic scope of '" + baseClass.ya() + "'";
    throw SerializationException_init_$Create$_0(subClassName == null ? 'Class discriminator was missing and no default serializers were registered ' + scope + '.' : "Serializer for subclass '" + subClassName + "' is not found " + scope + '.\n' + ("Check if class with serial name '" + subClassName + "' exists and serializer is registered in a corresponding SerializersModule.\n") + ("To be registered automatically, class '" + subClassName + "' has to be '@Serializable', and the base class '" + baseClass.ya() + "' has to be sealed and '@Serializable'."));
  }
  function NothingSerializer_0() {
    NothingSerializer_instance = this;
    this.u1p_1 = NothingSerialDescriptor_getInstance();
  }
  protoOf(NothingSerializer_0).t1k = function () {
    return this.u1p_1;
  };
  protoOf(NothingSerializer_0).v1p = function (encoder, value) {
    throw SerializationException_init_$Create$_0("'kotlin.Nothing' cannot be serialized");
  };
  protoOf(NothingSerializer_0).u1k = function (encoder, value) {
    var tmp;
    if (false) {
      tmp = value;
    } else {
      tmp = THROW_CCE();
    }
    return this.v1p(encoder, tmp);
  };
  protoOf(NothingSerializer_0).v1k = function (decoder) {
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
    this.w1p_1 = new PrimitiveSerialDescriptor_0('kotlin.time.Duration', STRING_getInstance());
  }
  protoOf(DurationSerializer).t1k = function () {
    return this.w1p_1;
  };
  protoOf(DurationSerializer).x1p = function (encoder, value) {
    encoder.y1o(Duration__toIsoString_impl_9h6wsm(value));
  };
  protoOf(DurationSerializer).u1k = function (encoder, value) {
    return this.x1p(encoder, value instanceof Duration ? value.kl_1 : THROW_CCE());
  };
  protoOf(DurationSerializer).y1p = function (decoder) {
    return Companion_getInstance().jl(decoder.p1n());
  };
  protoOf(DurationSerializer).v1k = function (decoder) {
    return new Duration(this.y1p(decoder));
  };
  var DurationSerializer_instance;
  function DurationSerializer_getInstance() {
    if (DurationSerializer_instance == null)
      new DurationSerializer();
    return DurationSerializer_instance;
  }
  function UuidSerializer() {
    UuidSerializer_instance = this;
    this.z1p_1 = new PrimitiveSerialDescriptor_0('kotlin.uuid.Uuid', STRING_getInstance());
  }
  protoOf(UuidSerializer).t1k = function () {
    return this.z1p_1;
  };
  protoOf(UuidSerializer).a1q = function (encoder, value) {
    encoder.y1o(value.toString());
  };
  protoOf(UuidSerializer).u1k = function (encoder, value) {
    return this.a1q(encoder, value instanceof Uuid ? value : THROW_CCE());
  };
  protoOf(UuidSerializer).v1k = function (decoder) {
    return Companion_getInstance_0().dm(decoder.p1n());
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
    this.d1q_1 = elementDescriptor;
    this.e1q_1 = 1;
  }
  protoOf(ListLikeDescriptor).y1l = function () {
    return LIST_getInstance();
  };
  protoOf(ListLikeDescriptor).a1m = function () {
    return this.e1q_1;
  };
  protoOf(ListLikeDescriptor).c1m = function (index) {
    return index.toString();
  };
  protoOf(ListLikeDescriptor).d1m = function (name) {
    var tmp0_elvis_lhs = toIntOrNull(name);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throw IllegalArgumentException_init_$Create$(name + ' is not a valid list index');
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  };
  protoOf(ListLikeDescriptor).g1m = function (index) {
    // Inline function 'kotlin.require' call
    if (!(index >= 0)) {
      var message = 'Illegal index ' + index + ', ' + this.x1l() + ' expects only non-negative indices';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return false;
  };
  protoOf(ListLikeDescriptor).e1m = function (index) {
    // Inline function 'kotlin.require' call
    if (!(index >= 0)) {
      var message = 'Illegal index ' + index + ', ' + this.x1l() + ' expects only non-negative indices';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return emptyList();
  };
  protoOf(ListLikeDescriptor).f1m = function (index) {
    // Inline function 'kotlin.require' call
    if (!(index >= 0)) {
      var message = 'Illegal index ' + index + ', ' + this.x1l() + ' expects only non-negative indices';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return this.d1q_1;
  };
  protoOf(ListLikeDescriptor).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof ListLikeDescriptor))
      return false;
    if (equals(this.d1q_1, other.d1q_1) && this.x1l() === other.x1l())
      return true;
    return false;
  };
  protoOf(ListLikeDescriptor).hashCode = function () {
    return imul(hashCode(this.d1q_1), 31) + getStringHashCode(this.x1l()) | 0;
  };
  protoOf(ListLikeDescriptor).toString = function () {
    return this.x1l() + '(' + toString(this.d1q_1) + ')';
  };
  function MapLikeDescriptor(serialName, keyDescriptor, valueDescriptor) {
    this.j1q_1 = serialName;
    this.k1q_1 = keyDescriptor;
    this.l1q_1 = valueDescriptor;
    this.m1q_1 = 2;
  }
  protoOf(MapLikeDescriptor).x1l = function () {
    return this.j1q_1;
  };
  protoOf(MapLikeDescriptor).y1l = function () {
    return MAP_getInstance();
  };
  protoOf(MapLikeDescriptor).a1m = function () {
    return this.m1q_1;
  };
  protoOf(MapLikeDescriptor).c1m = function (index) {
    return index.toString();
  };
  protoOf(MapLikeDescriptor).d1m = function (name) {
    var tmp0_elvis_lhs = toIntOrNull(name);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throw IllegalArgumentException_init_$Create$(name + ' is not a valid map index');
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  };
  protoOf(MapLikeDescriptor).g1m = function (index) {
    // Inline function 'kotlin.require' call
    if (!(index >= 0)) {
      var message = 'Illegal index ' + index + ', ' + this.x1l() + ' expects only non-negative indices';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return false;
  };
  protoOf(MapLikeDescriptor).e1m = function (index) {
    // Inline function 'kotlin.require' call
    if (!(index >= 0)) {
      var message = 'Illegal index ' + index + ', ' + this.x1l() + ' expects only non-negative indices';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return emptyList();
  };
  protoOf(MapLikeDescriptor).f1m = function (index) {
    // Inline function 'kotlin.require' call
    if (!(index >= 0)) {
      var message = 'Illegal index ' + index + ', ' + this.x1l() + ' expects only non-negative indices';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    var tmp;
    switch (index % 2 | 0) {
      case 0:
        tmp = this.k1q_1;
        break;
      case 1:
        tmp = this.l1q_1;
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
    if (!equals(this.k1q_1, other.k1q_1))
      return false;
    if (!equals(this.l1q_1, other.l1q_1))
      return false;
    return true;
  };
  protoOf(MapLikeDescriptor).hashCode = function () {
    var result = getStringHashCode(this.x1l());
    result = imul(31, result) + hashCode(this.k1q_1) | 0;
    result = imul(31, result) + hashCode(this.l1q_1) | 0;
    return result;
  };
  protoOf(MapLikeDescriptor).toString = function () {
    return this.x1l() + '(' + toString(this.k1q_1) + ', ' + toString(this.l1q_1) + ')';
  };
  function PrimitiveArrayDescriptor(primitive) {
    ListLikeDescriptor.call(this, primitive);
    this.r1q_1 = primitive.x1l() + 'Array';
  }
  protoOf(PrimitiveArrayDescriptor).x1l = function () {
    return this.r1q_1;
  };
  function ArrayListSerializer(element) {
    CollectionSerializer.call(this, element);
    this.t1q_1 = new ArrayListClassDesc(element.t1k());
  }
  protoOf(ArrayListSerializer).t1k = function () {
    return this.t1q_1;
  };
  protoOf(ArrayListSerializer).u1q = function () {
    // Inline function 'kotlin.collections.arrayListOf' call
    return ArrayList_init_$Create$_0();
  };
  protoOf(ArrayListSerializer).v1q = function (_this__u8e3s4) {
    return _this__u8e3s4.j();
  };
  protoOf(ArrayListSerializer).w1q = function (_this__u8e3s4) {
    return this.v1q(_this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ArrayListSerializer).x1q = function (_this__u8e3s4) {
    return _this__u8e3s4;
  };
  protoOf(ArrayListSerializer).y1q = function (_this__u8e3s4) {
    return this.x1q(_this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ArrayListSerializer).z1q = function (_this__u8e3s4) {
    var tmp0_elvis_lhs = _this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : null;
    return tmp0_elvis_lhs == null ? ArrayList_init_$Create$_1(_this__u8e3s4) : tmp0_elvis_lhs;
  };
  protoOf(ArrayListSerializer).a1r = function (_this__u8e3s4) {
    return this.z1q((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtList) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ArrayListSerializer).b1r = function (_this__u8e3s4, size) {
    return _this__u8e3s4.j5(size);
  };
  protoOf(ArrayListSerializer).c1r = function (_this__u8e3s4, size) {
    return this.b1r(_this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE(), size);
  };
  protoOf(ArrayListSerializer).d1r = function (_this__u8e3s4, index, element) {
    _this__u8e3s4.b2(index, element);
  };
  protoOf(ArrayListSerializer).e1r = function (_this__u8e3s4, index, element) {
    var tmp = _this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE();
    return this.d1r(tmp, index, (element == null ? true : !(element == null)) ? element : THROW_CCE());
  };
  function HashSetSerializer(eSerializer) {
    CollectionSerializer.call(this, eSerializer);
    this.p1r_1 = new HashSetClassDesc(eSerializer.t1k());
  }
  protoOf(HashSetSerializer).t1k = function () {
    return this.p1r_1;
  };
  protoOf(HashSetSerializer).u1q = function () {
    return HashSet_init_$Create$();
  };
  protoOf(HashSetSerializer).q1r = function (_this__u8e3s4) {
    return _this__u8e3s4.j();
  };
  protoOf(HashSetSerializer).w1q = function (_this__u8e3s4) {
    return this.q1r(_this__u8e3s4 instanceof HashSet ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(HashSetSerializer).r1r = function (_this__u8e3s4) {
    return _this__u8e3s4;
  };
  protoOf(HashSetSerializer).y1q = function (_this__u8e3s4) {
    return this.r1r(_this__u8e3s4 instanceof HashSet ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(HashSetSerializer).s1r = function (_this__u8e3s4) {
    var tmp0_elvis_lhs = _this__u8e3s4 instanceof HashSet ? _this__u8e3s4 : null;
    return tmp0_elvis_lhs == null ? HashSet_init_$Create$_0(_this__u8e3s4) : tmp0_elvis_lhs;
  };
  protoOf(HashSetSerializer).a1r = function (_this__u8e3s4) {
    return this.s1r((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtSet) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(HashSetSerializer).t1r = function (_this__u8e3s4, size) {
  };
  protoOf(HashSetSerializer).c1r = function (_this__u8e3s4, size) {
    return this.t1r(_this__u8e3s4 instanceof HashSet ? _this__u8e3s4 : THROW_CCE(), size);
  };
  protoOf(HashSetSerializer).u1r = function (_this__u8e3s4, index, element) {
    _this__u8e3s4.e(element);
  };
  protoOf(HashSetSerializer).e1r = function (_this__u8e3s4, index, element) {
    var tmp = _this__u8e3s4 instanceof HashSet ? _this__u8e3s4 : THROW_CCE();
    return this.u1r(tmp, index, (element == null ? true : !(element == null)) ? element : THROW_CCE());
  };
  function LinkedHashSetSerializer(eSerializer) {
    CollectionSerializer.call(this, eSerializer);
    this.w1r_1 = new LinkedHashSetClassDesc(eSerializer.t1k());
  }
  protoOf(LinkedHashSetSerializer).t1k = function () {
    return this.w1r_1;
  };
  protoOf(LinkedHashSetSerializer).u1q = function () {
    // Inline function 'kotlin.collections.linkedSetOf' call
    return LinkedHashSet_init_$Create$();
  };
  protoOf(LinkedHashSetSerializer).x1r = function (_this__u8e3s4) {
    return _this__u8e3s4.j();
  };
  protoOf(LinkedHashSetSerializer).w1q = function (_this__u8e3s4) {
    return this.x1r(_this__u8e3s4 instanceof LinkedHashSet ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashSetSerializer).y1r = function (_this__u8e3s4) {
    return _this__u8e3s4;
  };
  protoOf(LinkedHashSetSerializer).y1q = function (_this__u8e3s4) {
    return this.y1r(_this__u8e3s4 instanceof LinkedHashSet ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashSetSerializer).s1r = function (_this__u8e3s4) {
    var tmp0_elvis_lhs = _this__u8e3s4 instanceof LinkedHashSet ? _this__u8e3s4 : null;
    return tmp0_elvis_lhs == null ? LinkedHashSet_init_$Create$_0(_this__u8e3s4) : tmp0_elvis_lhs;
  };
  protoOf(LinkedHashSetSerializer).a1r = function (_this__u8e3s4) {
    return this.s1r((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtSet) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashSetSerializer).z1r = function (_this__u8e3s4, size) {
  };
  protoOf(LinkedHashSetSerializer).c1r = function (_this__u8e3s4, size) {
    return this.z1r(_this__u8e3s4 instanceof LinkedHashSet ? _this__u8e3s4 : THROW_CCE(), size);
  };
  protoOf(LinkedHashSetSerializer).a1s = function (_this__u8e3s4, index, element) {
    _this__u8e3s4.e(element);
  };
  protoOf(LinkedHashSetSerializer).e1r = function (_this__u8e3s4, index, element) {
    var tmp = _this__u8e3s4 instanceof LinkedHashSet ? _this__u8e3s4 : THROW_CCE();
    return this.a1s(tmp, index, (element == null ? true : !(element == null)) ? element : THROW_CCE());
  };
  function HashMapSerializer(kSerializer, vSerializer) {
    MapLikeSerializer.call(this, kSerializer, vSerializer);
    this.d1s_1 = new HashMapClassDesc(kSerializer.t1k(), vSerializer.t1k());
  }
  protoOf(HashMapSerializer).t1k = function () {
    return this.d1s_1;
  };
  protoOf(HashMapSerializer).e1s = function (_this__u8e3s4) {
    return _this__u8e3s4.j();
  };
  protoOf(HashMapSerializer).f1s = function (_this__u8e3s4) {
    return this.e1s((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtMap) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(HashMapSerializer).g1s = function (_this__u8e3s4) {
    // Inline function 'kotlin.collections.iterator' call
    return _this__u8e3s4.u().g();
  };
  protoOf(HashMapSerializer).h1s = function (_this__u8e3s4) {
    return this.g1s((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtMap) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(HashMapSerializer).u1q = function () {
    return HashMap_init_$Create$();
  };
  protoOf(HashMapSerializer).i1s = function (_this__u8e3s4) {
    return imul(_this__u8e3s4.j(), 2);
  };
  protoOf(HashMapSerializer).w1q = function (_this__u8e3s4) {
    return this.i1s(_this__u8e3s4 instanceof HashMap ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(HashMapSerializer).j1s = function (_this__u8e3s4) {
    return _this__u8e3s4;
  };
  protoOf(HashMapSerializer).y1q = function (_this__u8e3s4) {
    return this.j1s(_this__u8e3s4 instanceof HashMap ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(HashMapSerializer).k1s = function (_this__u8e3s4) {
    var tmp0_elvis_lhs = _this__u8e3s4 instanceof HashMap ? _this__u8e3s4 : null;
    return tmp0_elvis_lhs == null ? HashMap_init_$Create$_0(_this__u8e3s4) : tmp0_elvis_lhs;
  };
  protoOf(HashMapSerializer).a1r = function (_this__u8e3s4) {
    return this.k1s((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtMap) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(HashMapSerializer).l1s = function (_this__u8e3s4, size) {
  };
  protoOf(HashMapSerializer).c1r = function (_this__u8e3s4, size) {
    return this.l1s(_this__u8e3s4 instanceof HashMap ? _this__u8e3s4 : THROW_CCE(), size);
  };
  function LinkedHashMapSerializer(kSerializer, vSerializer) {
    MapLikeSerializer.call(this, kSerializer, vSerializer);
    this.s1s_1 = new LinkedHashMapClassDesc(kSerializer.t1k(), vSerializer.t1k());
  }
  protoOf(LinkedHashMapSerializer).t1k = function () {
    return this.s1s_1;
  };
  protoOf(LinkedHashMapSerializer).e1s = function (_this__u8e3s4) {
    return _this__u8e3s4.j();
  };
  protoOf(LinkedHashMapSerializer).f1s = function (_this__u8e3s4) {
    return this.e1s((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtMap) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashMapSerializer).g1s = function (_this__u8e3s4) {
    // Inline function 'kotlin.collections.iterator' call
    return _this__u8e3s4.u().g();
  };
  protoOf(LinkedHashMapSerializer).h1s = function (_this__u8e3s4) {
    return this.g1s((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtMap) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashMapSerializer).u1q = function () {
    return LinkedHashMap_init_$Create$();
  };
  protoOf(LinkedHashMapSerializer).t1s = function (_this__u8e3s4) {
    return imul(_this__u8e3s4.j(), 2);
  };
  protoOf(LinkedHashMapSerializer).w1q = function (_this__u8e3s4) {
    return this.t1s(_this__u8e3s4 instanceof LinkedHashMap ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashMapSerializer).u1s = function (_this__u8e3s4) {
    return _this__u8e3s4;
  };
  protoOf(LinkedHashMapSerializer).y1q = function (_this__u8e3s4) {
    return this.u1s(_this__u8e3s4 instanceof LinkedHashMap ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashMapSerializer).k1s = function (_this__u8e3s4) {
    var tmp0_elvis_lhs = _this__u8e3s4 instanceof LinkedHashMap ? _this__u8e3s4 : null;
    return tmp0_elvis_lhs == null ? LinkedHashMap_init_$Create$_0(_this__u8e3s4) : tmp0_elvis_lhs;
  };
  protoOf(LinkedHashMapSerializer).a1r = function (_this__u8e3s4) {
    return this.k1s((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtMap) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashMapSerializer).v1s = function (_this__u8e3s4, size) {
  };
  protoOf(LinkedHashMapSerializer).c1r = function (_this__u8e3s4, size) {
    return this.v1s(_this__u8e3s4 instanceof LinkedHashMap ? _this__u8e3s4 : THROW_CCE(), size);
  };
  function ReferenceArraySerializer(kClass, eSerializer) {
    CollectionLikeSerializer.call(this, eSerializer);
    this.x1s_1 = kClass;
    this.y1s_1 = new ArrayClassDesc(eSerializer.t1k());
  }
  protoOf(ReferenceArraySerializer).t1k = function () {
    return this.y1s_1;
  };
  protoOf(ReferenceArraySerializer).z1s = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(ReferenceArraySerializer).f1s = function (_this__u8e3s4) {
    return this.z1s((!(_this__u8e3s4 == null) ? isArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ReferenceArraySerializer).a1t = function (_this__u8e3s4) {
    return arrayIterator(_this__u8e3s4);
  };
  protoOf(ReferenceArraySerializer).h1s = function (_this__u8e3s4) {
    return this.a1t((!(_this__u8e3s4 == null) ? isArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ReferenceArraySerializer).u1q = function () {
    // Inline function 'kotlin.collections.arrayListOf' call
    return ArrayList_init_$Create$_0();
  };
  protoOf(ReferenceArraySerializer).b1t = function (_this__u8e3s4) {
    return _this__u8e3s4.j();
  };
  protoOf(ReferenceArraySerializer).w1q = function (_this__u8e3s4) {
    return this.b1t(_this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ReferenceArraySerializer).c1t = function (_this__u8e3s4) {
    return toNativeArrayImpl(_this__u8e3s4, this.x1s_1);
  };
  protoOf(ReferenceArraySerializer).y1q = function (_this__u8e3s4) {
    return this.c1t(_this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ReferenceArraySerializer).d1t = function (_this__u8e3s4) {
    return ArrayList_init_$Create$_1(asList(_this__u8e3s4));
  };
  protoOf(ReferenceArraySerializer).a1r = function (_this__u8e3s4) {
    return this.d1t((!(_this__u8e3s4 == null) ? isArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ReferenceArraySerializer).e1t = function (_this__u8e3s4, size) {
    return _this__u8e3s4.j5(size);
  };
  protoOf(ReferenceArraySerializer).c1r = function (_this__u8e3s4, size) {
    return this.e1t(_this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE(), size);
  };
  protoOf(ReferenceArraySerializer).f1t = function (_this__u8e3s4, index, element) {
    _this__u8e3s4.b2(index, element);
  };
  protoOf(ReferenceArraySerializer).e1r = function (_this__u8e3s4, index, element) {
    var tmp = _this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE();
    return this.f1t(tmp, index, (element == null ? true : !(element == null)) ? element : THROW_CCE());
  };
  function CollectionSerializer(element) {
    CollectionLikeSerializer.call(this, element);
  }
  protoOf(CollectionSerializer).g1r = function (_this__u8e3s4) {
    return _this__u8e3s4.j();
  };
  protoOf(CollectionSerializer).f1s = function (_this__u8e3s4) {
    return this.g1r((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, Collection) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(CollectionSerializer).h1r = function (_this__u8e3s4) {
    return _this__u8e3s4.g();
  };
  protoOf(CollectionSerializer).h1s = function (_this__u8e3s4) {
    return this.h1r((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, Collection) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  function MapLikeSerializer(keySerializer, valueSerializer) {
    AbstractCollectionSerializer.call(this);
    this.m1s_1 = keySerializer;
    this.n1s_1 = valueSerializer;
  }
  protoOf(MapLikeSerializer).o1s = function (decoder, builder, startIndex, size) {
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
        this.p1s(decoder, startIndex + index | 0, builder, false);
      }
       while (!(index === last));
  };
  protoOf(MapLikeSerializer).k1r = function (decoder, builder, startIndex, size) {
    return this.o1s(decoder, (!(builder == null) ? isInterface(builder, KtMutableMap) : false) ? builder : THROW_CCE(), startIndex, size);
  };
  protoOf(MapLikeSerializer).p1s = function (decoder, index, builder, checkIndex) {
    var key = decoder.h1o(this.t1k(), index, this.m1s_1);
    var tmp;
    if (checkIndex) {
      // Inline function 'kotlin.also' call
      var this_0 = decoder.l1o(this.t1k());
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
    if (builder.d2(key)) {
      var tmp_2 = this.n1s_1.t1k().y1l();
      tmp_1 = !(tmp_2 instanceof PrimitiveKind);
    } else {
      tmp_1 = false;
    }
    if (tmp_1) {
      tmp_0 = decoder.g1o(this.t1k(), vIndex, this.n1s_1, getValue(builder, key));
    } else {
      tmp_0 = decoder.h1o(this.t1k(), vIndex, this.n1s_1);
    }
    var value = tmp_0;
    // Inline function 'kotlin.collections.set' call
    builder.i2(key, value);
  };
  protoOf(MapLikeSerializer).l1r = function (decoder, index, builder, checkIndex) {
    return this.p1s(decoder, index, (!(builder == null) ? isInterface(builder, KtMutableMap) : false) ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(MapLikeSerializer).j1r = function (encoder, value) {
    var size = this.f1s(value);
    // Inline function 'kotlinx.serialization.encoding.encodeCollection' call
    var descriptor = this.t1k();
    var composite = encoder.q1p(descriptor, size);
    var iterator = this.h1s(value);
    var index = 0;
    // Inline function 'kotlin.collections.forEach' call
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s = iterator;
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      // Inline function 'kotlin.collections.component1' call
      var k = element.v();
      // Inline function 'kotlin.collections.component2' call
      var v = element.w();
      var tmp = this.t1k();
      var _unary__edvuaz = index;
      index = _unary__edvuaz + 1 | 0;
      composite.l1p(tmp, _unary__edvuaz, this.m1s_1, k);
      var tmp_0 = this.t1k();
      var _unary__edvuaz_0 = index;
      index = _unary__edvuaz_0 + 1 | 0;
      composite.l1p(tmp_0, _unary__edvuaz_0, this.n1s_1, v);
    }
    composite.v1n(descriptor);
  };
  protoOf(MapLikeSerializer).u1k = function (encoder, value) {
    return this.j1r(encoder, (value == null ? true : !(value == null)) ? value : THROW_CCE());
  };
  function CollectionLikeSerializer(elementSerializer) {
    AbstractCollectionSerializer.call(this);
    this.i1r_1 = elementSerializer;
  }
  protoOf(CollectionLikeSerializer).j1r = function (encoder, value) {
    var size = this.f1s(value);
    // Inline function 'kotlinx.serialization.encoding.encodeCollection' call
    var descriptor = this.t1k();
    var composite = encoder.q1p(descriptor, size);
    var iterator = this.h1s(value);
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        composite.l1p(this.t1k(), index, this.i1r_1, iterator.i());
      }
       while (inductionVariable < size);
    composite.v1n(descriptor);
  };
  protoOf(CollectionLikeSerializer).u1k = function (encoder, value) {
    return this.j1r(encoder, (value == null ? true : !(value == null)) ? value : THROW_CCE());
  };
  protoOf(CollectionLikeSerializer).k1r = function (decoder, builder, startIndex, size) {
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
        this.l1r(decoder, startIndex + index | 0, builder, false);
      }
       while (inductionVariable < size);
  };
  protoOf(CollectionLikeSerializer).l1r = function (decoder, index, builder, checkIndex) {
    this.e1r(builder, index, decoder.h1o(this.t1k(), index, this.i1r_1));
  };
  function readSize($this, decoder, builder) {
    var size = decoder.m1o($this.t1k());
    $this.c1r(builder, size);
    return size;
  }
  function AbstractCollectionSerializer() {
  }
  protoOf(AbstractCollectionSerializer).n1r = function (decoder, previous) {
    var tmp1_elvis_lhs = previous == null ? null : this.a1r(previous);
    var builder = tmp1_elvis_lhs == null ? this.u1q() : tmp1_elvis_lhs;
    var startIndex = this.w1q(builder);
    var compositeDecoder = decoder.u1n(this.t1k());
    if (compositeDecoder.k1o()) {
      this.k1r(compositeDecoder, builder, startIndex, readSize(this, compositeDecoder, builder));
    } else {
      $l$loop: while (true) {
        var index = compositeDecoder.l1o(this.t1k());
        if (index === -1)
          break $l$loop;
        this.m1r(compositeDecoder, startIndex + index | 0, builder);
      }
    }
    compositeDecoder.v1n(this.t1k());
    return this.y1q(builder);
  };
  protoOf(AbstractCollectionSerializer).v1k = function (decoder) {
    return this.n1r(decoder, null);
  };
  protoOf(AbstractCollectionSerializer).m1r = function (decoder, index, builder, checkIndex, $super) {
    checkIndex = checkIndex === VOID ? true : checkIndex;
    var tmp;
    if ($super === VOID) {
      this.l1r(decoder, index, builder, checkIndex);
      tmp = Unit_instance;
    } else {
      tmp = $super.l1r.call(this, decoder, index, builder, checkIndex);
    }
    return tmp;
  };
  function PrimitiveArraySerializer(primitiveSerializer) {
    CollectionLikeSerializer.call(this, primitiveSerializer);
    this.h1t_1 = new PrimitiveArrayDescriptor(primitiveSerializer.t1k());
  }
  protoOf(PrimitiveArraySerializer).t1k = function () {
    return this.h1t_1;
  };
  protoOf(PrimitiveArraySerializer).i1t = function (_this__u8e3s4) {
    return _this__u8e3s4.j1t();
  };
  protoOf(PrimitiveArraySerializer).w1q = function (_this__u8e3s4) {
    return this.i1t(_this__u8e3s4 instanceof PrimitiveArrayBuilder ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(PrimitiveArraySerializer).k1t = function (_this__u8e3s4) {
    return _this__u8e3s4.l1t();
  };
  protoOf(PrimitiveArraySerializer).y1q = function (_this__u8e3s4) {
    return this.k1t(_this__u8e3s4 instanceof PrimitiveArrayBuilder ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(PrimitiveArraySerializer).m1t = function (_this__u8e3s4, size) {
    return _this__u8e3s4.n1t(size);
  };
  protoOf(PrimitiveArraySerializer).c1r = function (_this__u8e3s4, size) {
    return this.m1t(_this__u8e3s4 instanceof PrimitiveArrayBuilder ? _this__u8e3s4 : THROW_CCE(), size);
  };
  protoOf(PrimitiveArraySerializer).o1t = function (_this__u8e3s4) {
    var message = 'This method lead to boxing and must not be used, use writeContents instead';
    throw IllegalStateException_init_$Create$(toString(message));
  };
  protoOf(PrimitiveArraySerializer).h1s = function (_this__u8e3s4) {
    return this.o1t((_this__u8e3s4 == null ? true : !(_this__u8e3s4 == null)) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(PrimitiveArraySerializer).p1t = function (_this__u8e3s4, index, element) {
    var message = 'This method lead to boxing and must not be used, use Builder.append instead';
    throw IllegalStateException_init_$Create$(toString(message));
  };
  protoOf(PrimitiveArraySerializer).e1r = function (_this__u8e3s4, index, element) {
    var tmp = _this__u8e3s4 instanceof PrimitiveArrayBuilder ? _this__u8e3s4 : THROW_CCE();
    return this.p1t(tmp, index, (element == null ? true : !(element == null)) ? element : THROW_CCE());
  };
  protoOf(PrimitiveArraySerializer).u1q = function () {
    return this.a1r(this.q1t());
  };
  protoOf(PrimitiveArraySerializer).t1t = function (encoder, value) {
    var size = this.f1s(value);
    // Inline function 'kotlinx.serialization.encoding.encodeCollection' call
    var descriptor = this.h1t_1;
    var composite = encoder.q1p(descriptor, size);
    this.s1t(composite, value, size);
    composite.v1n(descriptor);
  };
  protoOf(PrimitiveArraySerializer).u1k = function (encoder, value) {
    return this.t1t(encoder, (value == null ? true : !(value == null)) ? value : THROW_CCE());
  };
  protoOf(PrimitiveArraySerializer).j1r = function (encoder, value) {
    return this.t1t(encoder, (value == null ? true : !(value == null)) ? value : THROW_CCE());
  };
  protoOf(PrimitiveArraySerializer).v1k = function (decoder) {
    return this.n1r(decoder, null);
  };
  function PrimitiveArrayBuilder() {
  }
  protoOf(PrimitiveArrayBuilder).u1t = function (requiredCapacity, $super) {
    requiredCapacity = requiredCapacity === VOID ? this.j1t() + 1 | 0 : requiredCapacity;
    var tmp;
    if ($super === VOID) {
      this.n1t(requiredCapacity);
      tmp = Unit_instance;
    } else {
      tmp = $super.n1t.call(this, requiredCapacity);
    }
    return tmp;
  };
  function Companion() {
    Companion_instance_0 = this;
    this.v1t_1 = longArray(0);
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
      highMarks[get_lastIndex(highMarks)] = (new Long(-1, -1)).b3(elementsCount);
    }
    return highMarks;
  }
  function markHigh($this, index) {
    var slot = (index >>> 6 | 0) - 1 | 0;
    var offsetInSlot = index & 63;
    $this.z1t_1[slot] = $this.z1t_1[slot].f3((new Long(1, 0)).b3(offsetInSlot));
  }
  function nextUnmarkedHighIndex($this) {
    var inductionVariable = 0;
    var last = $this.z1t_1.length - 1 | 0;
    if (inductionVariable <= last)
      do {
        var slot = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var slotOffset = imul(slot + 1 | 0, 64);
        var slotMarks = $this.z1t_1[slot];
        while (!slotMarks.equals(new Long(-1, -1))) {
          var indexInSlot = countTrailingZeroBits(slotMarks.a3());
          slotMarks = slotMarks.f3((new Long(1, 0)).b3(indexInSlot));
          var index = slotOffset + indexInSlot | 0;
          if ($this.x1t_1($this.w1t_1, index)) {
            $this.z1t_1[slot] = slotMarks;
            return index;
          }
        }
        $this.z1t_1[slot] = slotMarks;
      }
       while (inductionVariable <= last);
    return -1;
  }
  function ElementMarker(descriptor, readIfAbsent) {
    Companion_getInstance_7();
    this.w1t_1 = descriptor;
    this.x1t_1 = readIfAbsent;
    var elementsCount = this.w1t_1.a1m();
    if (elementsCount <= 64) {
      var tmp = this;
      var tmp_0;
      if (elementsCount === 64) {
        tmp_0 = new Long(0, 0);
      } else {
        tmp_0 = (new Long(-1, -1)).b3(elementsCount);
      }
      tmp.y1t_1 = tmp_0;
      this.z1t_1 = Companion_getInstance_7().v1t_1;
    } else {
      this.y1t_1 = new Long(0, 0);
      this.z1t_1 = prepareHighMarksArray(this, elementsCount);
    }
  }
  protoOf(ElementMarker).a1u = function (index) {
    if (index < 64) {
      this.y1t_1 = this.y1t_1.f3((new Long(1, 0)).b3(index));
    } else {
      markHigh(this, index);
    }
  };
  protoOf(ElementMarker).b1u = function () {
    var elementsCount = this.w1t_1.a1m();
    while (!this.y1t_1.equals(new Long(-1, -1))) {
      var index = countTrailingZeroBits(this.y1t_1.a3());
      this.y1t_1 = this.y1t_1.f3((new Long(1, 0)).b3(index));
      if (this.x1t_1(this.w1t_1, index)) {
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
        descriptor.o1u(element);
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
      var elementName = tmp0_elvis_lhs == null ? item.l2_1 : tmp0_elvis_lhs;
      descriptor.p1u(elementName);
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
          descriptor.q1u(element_0);
        }
      }
    }
    return EnumSerializer_init_$Create$(serialName, values, descriptor);
  }
  function EnumSerializer_init_$Init$(serialName, values, descriptor, $this) {
    EnumSerializer.call($this, serialName, values);
    $this.s1u_1 = descriptor;
    return $this;
  }
  function EnumSerializer_init_$Create$(serialName, values, descriptor) {
    return EnumSerializer_init_$Init$(serialName, values, descriptor, objectCreate(protoOf(EnumSerializer)));
  }
  function createUnmarkedDescriptor($this, serialName) {
    var d = new EnumDescriptor(serialName, $this.r1u_1.length);
    // Inline function 'kotlin.collections.forEach' call
    var indexedObject = $this.r1u_1;
    var inductionVariable = 0;
    var last = indexedObject.length;
    while (inductionVariable < last) {
      var element = indexedObject[inductionVariable];
      inductionVariable = inductionVariable + 1 | 0;
      d.p1u(element.l2_1);
    }
    return d;
  }
  function EnumSerializer$descriptor$delegate$lambda(this$0, $serialName) {
    return function () {
      var tmp0_elvis_lhs = this$0.s1u_1;
      return tmp0_elvis_lhs == null ? createUnmarkedDescriptor(this$0, $serialName) : tmp0_elvis_lhs;
    };
  }
  function EnumSerializer(serialName, values) {
    this.r1u_1 = values;
    this.s1u_1 = null;
    var tmp = this;
    tmp.t1u_1 = lazy_0(EnumSerializer$descriptor$delegate$lambda(this, serialName));
  }
  protoOf(EnumSerializer).t1k = function () {
    var tmp0 = this.t1u_1;
    // Inline function 'kotlin.getValue' call
    descriptor$factory_1();
    return tmp0.w();
  };
  protoOf(EnumSerializer).u1u = function (encoder, value) {
    var index = indexOf(this.r1u_1, value);
    if (index === -1) {
      throw SerializationException_init_$Create$_0(toString(value) + ' is not a valid enum ' + this.t1k().x1l() + ', ' + ('must be one of ' + contentToString(this.r1u_1)));
    }
    encoder.z1o(this.t1k(), index);
  };
  protoOf(EnumSerializer).u1k = function (encoder, value) {
    return this.u1u(encoder, value instanceof Enum ? value : THROW_CCE());
  };
  protoOf(EnumSerializer).v1k = function (decoder) {
    var index = decoder.q1n(this.t1k());
    if (!(0 <= index ? index <= (this.r1u_1.length - 1 | 0) : false)) {
      throw SerializationException_init_$Create$_0('' + index + ' is not among valid ' + this.t1k().x1l() + ' enum values, ' + ('values size is ' + this.r1u_1.length));
    }
    return this.r1u_1[index];
  };
  protoOf(EnumSerializer).toString = function () {
    return 'kotlinx.serialization.internal.EnumSerializer<' + this.t1k().x1l() + '>';
  };
  function _get_elementDescriptors__y23q9p($this) {
    var tmp0 = $this.i1v_1;
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
        tmp_1[tmp_2] = buildSerialDescriptor($name + '.' + this$0.c1m(tmp_2), OBJECT_getInstance(), []);
        tmp = tmp + 1 | 0;
      }
      return tmp_1;
    };
  }
  function EnumDescriptor(name, elementsCount) {
    PluginGeneratedSerialDescriptor.call(this, name, VOID, elementsCount);
    this.h1v_1 = ENUM_getInstance();
    var tmp = this;
    tmp.i1v_1 = lazy_0(EnumDescriptor$elementDescriptors$delegate$lambda(elementsCount, name, this));
  }
  protoOf(EnumDescriptor).y1l = function () {
    return this.h1v_1;
  };
  protoOf(EnumDescriptor).f1m = function (index) {
    return getChecked(_get_elementDescriptors__y23q9p(this), index);
  };
  protoOf(EnumDescriptor).equals = function (other) {
    if (this === other)
      return true;
    if (other == null)
      return false;
    if (!(!(other == null) ? isInterface(other, SerialDescriptor) : false))
      return false;
    if (!(other.y1l() === ENUM_getInstance()))
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
    var _iterator__ex2g4s = get_elementNames(this).g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
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
      return receiver.t1k();
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
    this.x1v_1 = true;
  }
  protoOf(InlineClassDescriptor).z1l = function () {
    return this.x1v_1;
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
      if (!(other.x1v_1 && contentEquals(this.j1v(), other.j1v()))) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      if (!(this.a1m() === other.a1m())) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      var inductionVariable = 0;
      var last = this.a1m();
      if (inductionVariable < last)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          if (!(this.f1m(index).x1l() === other.f1m(index).x1l())) {
            tmp$ret$0 = false;
            break $l$block_5;
          }
          if (!equals(this.f1m(index).y1l(), other.f1m(index).y1l())) {
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
    this.y1v_1 = $primitiveSerializer;
  }
  protoOf(InlinePrimitiveDescriptor$1).z1v = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [this.y1v_1];
  };
  protoOf(InlinePrimitiveDescriptor$1).t1k = function () {
    var message = 'unsupported';
    throw IllegalStateException_init_$Create$(toString(message));
  };
  protoOf(InlinePrimitiveDescriptor$1).u1k = function (encoder, value) {
    // Inline function 'kotlin.error' call
    var message = 'unsupported';
    throw IllegalStateException_init_$Create$(toString(message));
  };
  protoOf(InlinePrimitiveDescriptor$1).v1k = function (decoder) {
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
    this.b1w_1 = EmptySerializersModule_0();
  }
  protoOf(NoOpEncoder).j1o = function () {
    return this.b1w_1;
  };
  protoOf(NoOpEncoder).o1o = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).p1o = function () {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).q1o = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).r1o = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).s1o = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).t1o = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).u1o = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).v1o = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).w1o = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).x1o = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).y1o = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).z1o = function (enumDescriptor, index) {
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
    this.c1w_1 = OBJECT_getInstance();
    this.d1w_1 = 'kotlin.Nothing';
  }
  protoOf(NothingSerialDescriptor).y1l = function () {
    return this.c1w_1;
  };
  protoOf(NothingSerialDescriptor).x1l = function () {
    return this.d1w_1;
  };
  protoOf(NothingSerialDescriptor).a1m = function () {
    return 0;
  };
  protoOf(NothingSerialDescriptor).c1m = function (index) {
    error(this);
  };
  protoOf(NothingSerialDescriptor).d1m = function (name) {
    error(this);
  };
  protoOf(NothingSerialDescriptor).g1m = function (index) {
    error(this);
  };
  protoOf(NothingSerialDescriptor).f1m = function (index) {
    error(this);
  };
  protoOf(NothingSerialDescriptor).e1m = function (index) {
    error(this);
  };
  protoOf(NothingSerialDescriptor).toString = function () {
    return 'NothingSerialDescriptor';
  };
  protoOf(NothingSerialDescriptor).equals = function (other) {
    return this === other;
  };
  protoOf(NothingSerialDescriptor).hashCode = function () {
    return getStringHashCode(this.d1w_1) + imul(31, this.c1w_1.hashCode()) | 0;
  };
  var NothingSerialDescriptor_instance;
  function NothingSerialDescriptor_getInstance() {
    if (NothingSerialDescriptor_instance == null)
      new NothingSerialDescriptor();
    return NothingSerialDescriptor_instance;
  }
  function NullableSerializer(serializer) {
    this.e1w_1 = serializer;
    this.f1w_1 = new SerialDescriptorForNullable(this.e1w_1.t1k());
  }
  protoOf(NullableSerializer).t1k = function () {
    return this.f1w_1;
  };
  protoOf(NullableSerializer).g1w = function (encoder, value) {
    if (!(value == null)) {
      encoder.p1p();
      encoder.m1p(this.e1w_1, value);
    } else {
      encoder.p1o();
    }
  };
  protoOf(NullableSerializer).u1k = function (encoder, value) {
    return this.g1w(encoder, (value == null ? true : !(value == null)) ? value : THROW_CCE());
  };
  protoOf(NullableSerializer).v1k = function (decoder) {
    return decoder.f1n() ? decoder.t1n(this.e1w_1) : decoder.g1n();
  };
  protoOf(NullableSerializer).equals = function (other) {
    if (this === other)
      return true;
    if (other == null || !getKClassFromExpression(this).equals(getKClassFromExpression(other)))
      return false;
    if (!(other instanceof NullableSerializer))
      THROW_CCE();
    if (!equals(this.e1w_1, other.e1w_1))
      return false;
    return true;
  };
  protoOf(NullableSerializer).hashCode = function () {
    return hashCode(this.e1w_1);
  };
  function SerialDescriptorForNullable(original) {
    this.h1m_1 = original;
    this.i1m_1 = this.h1m_1.x1l() + '?';
    this.j1m_1 = cachedSerialNames(this.h1m_1);
  }
  protoOf(SerialDescriptorForNullable).x1l = function () {
    return this.i1m_1;
  };
  protoOf(SerialDescriptorForNullable).d1n = function () {
    return this.j1m_1;
  };
  protoOf(SerialDescriptorForNullable).t1l = function () {
    return true;
  };
  protoOf(SerialDescriptorForNullable).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof SerialDescriptorForNullable))
      return false;
    if (!equals(this.h1m_1, other.h1m_1))
      return false;
    return true;
  };
  protoOf(SerialDescriptorForNullable).toString = function () {
    return toString(this.h1m_1) + '?';
  };
  protoOf(SerialDescriptorForNullable).hashCode = function () {
    return imul(hashCode(this.h1m_1), 31);
  };
  protoOf(SerialDescriptorForNullable).y1l = function () {
    return this.h1m_1.y1l();
  };
  protoOf(SerialDescriptorForNullable).z1l = function () {
    return this.h1m_1.z1l();
  };
  protoOf(SerialDescriptorForNullable).a1m = function () {
    return this.h1m_1.a1m();
  };
  protoOf(SerialDescriptorForNullable).b1m = function () {
    return this.h1m_1.b1m();
  };
  protoOf(SerialDescriptorForNullable).c1m = function (index) {
    return this.h1m_1.c1m(index);
  };
  protoOf(SerialDescriptorForNullable).d1m = function (name) {
    return this.h1m_1.d1m(name);
  };
  protoOf(SerialDescriptorForNullable).e1m = function (index) {
    return this.h1m_1.e1m(index);
  };
  protoOf(SerialDescriptorForNullable).f1m = function (index) {
    return this.h1m_1.f1m(index);
  };
  protoOf(SerialDescriptorForNullable).g1m = function (index) {
    return this.h1m_1.g1m(index);
  };
  function ObjectSerializer$descriptor$delegate$lambda$lambda(this$0) {
    return function ($this$buildSerialDescriptor) {
      $this$buildSerialDescriptor.y1k_1 = this$0.i1w_1;
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
    this.h1w_1 = objectInstance;
    this.i1w_1 = emptyList();
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp.j1w_1 = lazy(tmp_0, ObjectSerializer$descriptor$delegate$lambda(serialName, this));
  }
  protoOf(ObjectSerializer).t1k = function () {
    var tmp0 = this.j1w_1;
    // Inline function 'kotlin.getValue' call
    descriptor$factory_2();
    return tmp0.w();
  };
  protoOf(ObjectSerializer).j1l = function (encoder, value) {
    encoder.u1n(this.t1k()).v1n(this.t1k());
  };
  protoOf(ObjectSerializer).u1k = function (encoder, value) {
    return this.j1l(encoder, !(value == null) ? value : THROW_CCE());
  };
  protoOf(ObjectSerializer).v1k = function (decoder) {
    // Inline function 'kotlinx.serialization.encoding.decodeStructure' call
    var descriptor = this.t1k();
    var composite = decoder.u1n(descriptor);
    var tmp$ret$0;
    $l$block_0: {
      if (composite.k1o()) {
        tmp$ret$0 = Unit_instance;
        break $l$block_0;
      }
      var index = composite.l1o(this.t1k());
      if (index === -1) {
        tmp$ret$0 = Unit_instance;
        break $l$block_0;
      } else
        throw SerializationException_init_$Create$_0('Unexpected index ' + index);
    }
    var result = tmp$ret$0;
    composite.v1n(descriptor);
    return this.h1w_1;
  };
  function descriptor$factory_2() {
    return getPropertyCallableRef('descriptor', 1, KProperty1, function (receiver) {
      return receiver.t1k();
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
      return _this__u8e3s4.d1n();
    var result = HashSet_init_$Create$_1(_this__u8e3s4.a1m());
    var inductionVariable = 0;
    var last = _this__u8e3s4.a1m();
    if (inductionVariable < last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'kotlin.collections.plusAssign' call
        var element = _this__u8e3s4.c1m(i);
        result.e(element);
      }
       while (inductionVariable < last);
    return result;
  }
  function kclass(_this__u8e3s4) {
    _init_properties_Platform_common_kt__3qzecs();
    var t = _this__u8e3s4.nb();
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
    var tmp0 = _this__u8e3s4.oj_1;
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlin.requireNotNull' call
      if (tmp0 == null) {
        var message = 'Star projections in type arguments are not allowed, but had ' + toString_0(_this__u8e3s4.oj_1);
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
    var tmp0_elvis_lhs = _this__u8e3s4.ya();
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
          var element = descriptor.c1m(i);
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
                var element = descriptor.c1m(imul(maskSlot, 32) + i | 0);
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
    var _iterator__ex2g4s = elementDescriptors.g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
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
    var _iterator__ex2g4s_0 = elementDescriptors.g();
    while (_iterator__ex2g4s_0.h()) {
      var element_0 = _iterator__ex2g4s_0.i();
      var hash_0 = accumulator_0;
      var tmp_0 = imul(31, hash_0);
      // Inline function 'kotlin.hashCode' call
      var tmp0_safe_receiver_0 = element_0.y1l();
      var tmp1_elvis_lhs_0 = tmp0_safe_receiver_0 == null ? null : hashCode(tmp0_safe_receiver_0);
      accumulator_0 = tmp_0 + (tmp1_elvis_lhs_0 == null ? 0 : tmp1_elvis_lhs_0) | 0;
    }
    var kindHash = accumulator_0;
    result = imul(31, result) + namesHash | 0;
    result = imul(31, result) + kindHash | 0;
    return result;
  }
  function _get_childSerializers__7vnyfa($this) {
    var tmp0 = $this.l1u_1;
    // Inline function 'kotlin.getValue' call
    childSerializers$factory();
    return tmp0.w();
  }
  function _get__hashCode__tgwhef_0($this) {
    var tmp0 = $this.n1u_1;
    // Inline function 'kotlin.getValue' call
    _hashCode$factory_0();
    return tmp0.w();
  }
  function buildIndices($this) {
    var indices = HashMap_init_$Create$();
    var inductionVariable = 0;
    var last = $this.g1u_1.length - 1 | 0;
    if (inductionVariable <= last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'kotlin.collections.set' call
        var key = $this.g1u_1[i];
        indices.i2(key, i);
      }
       while (inductionVariable <= last);
    return indices;
  }
  function PluginGeneratedSerialDescriptor$childSerializers$delegate$lambda(this$0) {
    return function () {
      var tmp0_safe_receiver = this$0.d1u_1;
      var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.z1v();
      return tmp1_elvis_lhs == null ? get_EMPTY_SERIALIZER_ARRAY() : tmp1_elvis_lhs;
    };
  }
  function PluginGeneratedSerialDescriptor$typeParameterDescriptors$delegate$lambda(this$0) {
    return function () {
      var tmp0_safe_receiver = this$0.d1u_1;
      var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.a1w();
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
          var tmp$ret$0 = item.t1k();
          destination.e(tmp$ret$0);
        }
        tmp = destination;
      }
      return compactArray(tmp);
    };
  }
  function PluginGeneratedSerialDescriptor$_hashCode$delegate$lambda(this$0) {
    return function () {
      return hashCodeImpl(this$0, this$0.j1v());
    };
  }
  function PluginGeneratedSerialDescriptor$toString$lambda(this$0) {
    return function (i) {
      return this$0.c1m(i) + ': ' + this$0.f1m(i).x1l();
    };
  }
  function PluginGeneratedSerialDescriptor(serialName, generatedSerializer, elementsCount) {
    generatedSerializer = generatedSerializer === VOID ? null : generatedSerializer;
    this.c1u_1 = serialName;
    this.d1u_1 = generatedSerializer;
    this.e1u_1 = elementsCount;
    this.f1u_1 = -1;
    var tmp = this;
    var tmp_0 = 0;
    var tmp_1 = this.e1u_1;
    // Inline function 'kotlin.arrayOfNulls' call
    var tmp_2 = Array(tmp_1);
    while (tmp_0 < tmp_1) {
      tmp_2[tmp_0] = '[UNINITIALIZED]';
      tmp_0 = tmp_0 + 1 | 0;
    }
    tmp.g1u_1 = tmp_2;
    var tmp_3 = this;
    // Inline function 'kotlin.arrayOfNulls' call
    var size = this.e1u_1;
    tmp_3.h1u_1 = Array(size);
    this.i1u_1 = null;
    this.j1u_1 = booleanArray(this.e1u_1);
    this.k1u_1 = emptyMap();
    var tmp_4 = this;
    var tmp_5 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp_4.l1u_1 = lazy(tmp_5, PluginGeneratedSerialDescriptor$childSerializers$delegate$lambda(this));
    var tmp_6 = this;
    var tmp_7 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp_6.m1u_1 = lazy(tmp_7, PluginGeneratedSerialDescriptor$typeParameterDescriptors$delegate$lambda(this));
    var tmp_8 = this;
    var tmp_9 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp_8.n1u_1 = lazy(tmp_9, PluginGeneratedSerialDescriptor$_hashCode$delegate$lambda(this));
  }
  protoOf(PluginGeneratedSerialDescriptor).x1l = function () {
    return this.c1u_1;
  };
  protoOf(PluginGeneratedSerialDescriptor).a1m = function () {
    return this.e1u_1;
  };
  protoOf(PluginGeneratedSerialDescriptor).y1l = function () {
    return CLASS_getInstance();
  };
  protoOf(PluginGeneratedSerialDescriptor).b1m = function () {
    var tmp0_elvis_lhs = this.i1u_1;
    return tmp0_elvis_lhs == null ? emptyList() : tmp0_elvis_lhs;
  };
  protoOf(PluginGeneratedSerialDescriptor).d1n = function () {
    return this.k1u_1.g2();
  };
  protoOf(PluginGeneratedSerialDescriptor).j1v = function () {
    var tmp0 = this.m1u_1;
    // Inline function 'kotlin.getValue' call
    typeParameterDescriptors$factory();
    return tmp0.w();
  };
  protoOf(PluginGeneratedSerialDescriptor).k1v = function (name, isOptional) {
    this.f1u_1 = this.f1u_1 + 1 | 0;
    this.g1u_1[this.f1u_1] = name;
    this.j1u_1[this.f1u_1] = isOptional;
    this.h1u_1[this.f1u_1] = null;
    if (this.f1u_1 === (this.e1u_1 - 1 | 0)) {
      this.k1u_1 = buildIndices(this);
    }
  };
  protoOf(PluginGeneratedSerialDescriptor).p1u = function (name, isOptional, $super) {
    isOptional = isOptional === VOID ? false : isOptional;
    var tmp;
    if ($super === VOID) {
      this.k1v(name, isOptional);
      tmp = Unit_instance;
    } else {
      tmp = $super.k1v.call(this, name, isOptional);
    }
    return tmp;
  };
  protoOf(PluginGeneratedSerialDescriptor).q1u = function (annotation) {
    // Inline function 'kotlin.let' call
    var it = this.h1u_1[this.f1u_1];
    var tmp;
    if (it == null) {
      var result = ArrayList_init_$Create$(1);
      this.h1u_1[this.f1u_1] = result;
      tmp = result;
    } else {
      tmp = it;
    }
    var list = tmp;
    list.e(annotation);
  };
  protoOf(PluginGeneratedSerialDescriptor).o1u = function (a) {
    if (this.i1u_1 == null) {
      this.i1u_1 = ArrayList_init_$Create$(1);
    }
    ensureNotNull(this.i1u_1).e(a);
  };
  protoOf(PluginGeneratedSerialDescriptor).f1m = function (index) {
    return getChecked(_get_childSerializers__7vnyfa(this), index).t1k();
  };
  protoOf(PluginGeneratedSerialDescriptor).g1m = function (index) {
    return getChecked_0(this.j1u_1, index);
  };
  protoOf(PluginGeneratedSerialDescriptor).e1m = function (index) {
    var tmp0_elvis_lhs = getChecked(this.h1u_1, index);
    return tmp0_elvis_lhs == null ? emptyList() : tmp0_elvis_lhs;
  };
  protoOf(PluginGeneratedSerialDescriptor).c1m = function (index) {
    return getChecked(this.g1u_1, index);
  };
  protoOf(PluginGeneratedSerialDescriptor).d1m = function (name) {
    var tmp0_elvis_lhs = this.k1u_1.f2(name);
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
      if (!contentEquals(this.j1v(), other.j1v())) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      if (!(this.a1m() === other.a1m())) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      var inductionVariable = 0;
      var last = this.a1m();
      if (inductionVariable < last)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          if (!(this.f1m(index).x1l() === other.f1m(index).x1l())) {
            tmp$ret$0 = false;
            break $l$block_5;
          }
          if (!equals(this.f1m(index).y1l(), other.f1m(index).y1l())) {
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
    var tmp = until(0, this.e1u_1);
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
      return receiver.j1v();
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
    PrimitiveArraySerializer.call(this, serializer_1(Companion_getInstance_1()));
  }
  protoOf(CharArraySerializer_0).n1w = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(CharArraySerializer_0).f1s = function (_this__u8e3s4) {
    return this.n1w((!(_this__u8e3s4 == null) ? isCharArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(CharArraySerializer_0).o1w = function (_this__u8e3s4) {
    return new CharArrayBuilder(_this__u8e3s4);
  };
  protoOf(CharArraySerializer_0).a1r = function (_this__u8e3s4) {
    return this.o1w((!(_this__u8e3s4 == null) ? isCharArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(CharArraySerializer_0).q1t = function () {
    return charArray(0);
  };
  protoOf(CharArraySerializer_0).p1w = function (decoder, index, builder, checkIndex) {
    builder.s1w(decoder.d1o(this.h1t_1, index));
  };
  protoOf(CharArraySerializer_0).l1r = function (decoder, index, builder, checkIndex) {
    return this.p1w(decoder, index, builder instanceof CharArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(CharArraySerializer_0).r1t = function (decoder, index, builder, checkIndex) {
    return this.p1w(decoder, index, builder instanceof CharArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(CharArraySerializer_0).t1w = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.i1p(this.h1t_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(CharArraySerializer_0).s1t = function (encoder, content, size) {
    return this.t1w(encoder, (!(content == null) ? isCharArray(content) : false) ? content : THROW_CCE(), size);
  };
  var CharArraySerializer_instance;
  function CharArraySerializer_getInstance() {
    if (CharArraySerializer_instance == null)
      new CharArraySerializer_0();
    return CharArraySerializer_instance;
  }
  function DoubleArraySerializer_0() {
    DoubleArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_2(DoubleCompanionObject_instance));
  }
  protoOf(DoubleArraySerializer_0).w1w = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(DoubleArraySerializer_0).f1s = function (_this__u8e3s4) {
    return this.w1w((!(_this__u8e3s4 == null) ? isDoubleArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(DoubleArraySerializer_0).x1w = function (_this__u8e3s4) {
    return new DoubleArrayBuilder(_this__u8e3s4);
  };
  protoOf(DoubleArraySerializer_0).a1r = function (_this__u8e3s4) {
    return this.x1w((!(_this__u8e3s4 == null) ? isDoubleArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(DoubleArraySerializer_0).q1t = function () {
    return new Float64Array(0);
  };
  protoOf(DoubleArraySerializer_0).y1w = function (decoder, index, builder, checkIndex) {
    builder.b1x(decoder.c1o(this.h1t_1, index));
  };
  protoOf(DoubleArraySerializer_0).l1r = function (decoder, index, builder, checkIndex) {
    return this.y1w(decoder, index, builder instanceof DoubleArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(DoubleArraySerializer_0).r1t = function (decoder, index, builder, checkIndex) {
    return this.y1w(decoder, index, builder instanceof DoubleArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(DoubleArraySerializer_0).c1x = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.h1p(this.h1t_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(DoubleArraySerializer_0).s1t = function (encoder, content, size) {
    return this.c1x(encoder, (!(content == null) ? isDoubleArray(content) : false) ? content : THROW_CCE(), size);
  };
  var DoubleArraySerializer_instance;
  function DoubleArraySerializer_getInstance() {
    if (DoubleArraySerializer_instance == null)
      new DoubleArraySerializer_0();
    return DoubleArraySerializer_instance;
  }
  function FloatArraySerializer_0() {
    FloatArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_3(FloatCompanionObject_instance));
  }
  protoOf(FloatArraySerializer_0).f1x = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(FloatArraySerializer_0).f1s = function (_this__u8e3s4) {
    return this.f1x((!(_this__u8e3s4 == null) ? isFloatArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(FloatArraySerializer_0).g1x = function (_this__u8e3s4) {
    return new FloatArrayBuilder(_this__u8e3s4);
  };
  protoOf(FloatArraySerializer_0).a1r = function (_this__u8e3s4) {
    return this.g1x((!(_this__u8e3s4 == null) ? isFloatArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(FloatArraySerializer_0).q1t = function () {
    return new Float32Array(0);
  };
  protoOf(FloatArraySerializer_0).h1x = function (decoder, index, builder, checkIndex) {
    builder.k1x(decoder.b1o(this.h1t_1, index));
  };
  protoOf(FloatArraySerializer_0).l1r = function (decoder, index, builder, checkIndex) {
    return this.h1x(decoder, index, builder instanceof FloatArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(FloatArraySerializer_0).r1t = function (decoder, index, builder, checkIndex) {
    return this.h1x(decoder, index, builder instanceof FloatArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(FloatArraySerializer_0).l1x = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.g1p(this.h1t_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(FloatArraySerializer_0).s1t = function (encoder, content, size) {
    return this.l1x(encoder, (!(content == null) ? isFloatArray(content) : false) ? content : THROW_CCE(), size);
  };
  var FloatArraySerializer_instance;
  function FloatArraySerializer_getInstance() {
    if (FloatArraySerializer_instance == null)
      new FloatArraySerializer_0();
    return FloatArraySerializer_instance;
  }
  function LongArraySerializer_0() {
    LongArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_4(Companion_getInstance_2()));
  }
  protoOf(LongArraySerializer_0).o1x = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(LongArraySerializer_0).f1s = function (_this__u8e3s4) {
    return this.o1x((!(_this__u8e3s4 == null) ? isLongArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LongArraySerializer_0).p1x = function (_this__u8e3s4) {
    return new LongArrayBuilder(_this__u8e3s4);
  };
  protoOf(LongArraySerializer_0).a1r = function (_this__u8e3s4) {
    return this.p1x((!(_this__u8e3s4 == null) ? isLongArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LongArraySerializer_0).q1t = function () {
    return longArray(0);
  };
  protoOf(LongArraySerializer_0).q1x = function (decoder, index, builder, checkIndex) {
    builder.t1x(decoder.a1o(this.h1t_1, index));
  };
  protoOf(LongArraySerializer_0).l1r = function (decoder, index, builder, checkIndex) {
    return this.q1x(decoder, index, builder instanceof LongArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(LongArraySerializer_0).r1t = function (decoder, index, builder, checkIndex) {
    return this.q1x(decoder, index, builder instanceof LongArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(LongArraySerializer_0).u1x = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.f1p(this.h1t_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(LongArraySerializer_0).s1t = function (encoder, content, size) {
    return this.u1x(encoder, (!(content == null) ? isLongArray(content) : false) ? content : THROW_CCE(), size);
  };
  var LongArraySerializer_instance;
  function LongArraySerializer_getInstance() {
    if (LongArraySerializer_instance == null)
      new LongArraySerializer_0();
    return LongArraySerializer_instance;
  }
  function ULongArraySerializer_0() {
    ULongArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_5(Companion_getInstance_3()));
  }
  protoOf(ULongArraySerializer_0).x1x = function (_this__u8e3s4) {
    return _ULongArray___get_size__impl__ju6dtr(_this__u8e3s4);
  };
  protoOf(ULongArraySerializer_0).f1s = function (_this__u8e3s4) {
    return this.x1x(_this__u8e3s4 instanceof ULongArray ? _this__u8e3s4.pn_1 : THROW_CCE());
  };
  protoOf(ULongArraySerializer_0).y1x = function (_this__u8e3s4) {
    return new ULongArrayBuilder(_this__u8e3s4);
  };
  protoOf(ULongArraySerializer_0).a1r = function (_this__u8e3s4) {
    return this.y1x(_this__u8e3s4 instanceof ULongArray ? _this__u8e3s4.pn_1 : THROW_CCE());
  };
  protoOf(ULongArraySerializer_0).z1x = function () {
    return _ULongArray___init__impl__twm1l3(0);
  };
  protoOf(ULongArraySerializer_0).q1t = function () {
    return new ULongArray(this.z1x());
  };
  protoOf(ULongArraySerializer_0).a1y = function (decoder, index, builder, checkIndex) {
    // Inline function 'kotlin.toULong' call
    var this_0 = decoder.f1o(this.h1t_1, index).l1n();
    var tmp$ret$0 = _ULong___init__impl__c78o9k(this_0);
    builder.d1y(tmp$ret$0);
  };
  protoOf(ULongArraySerializer_0).l1r = function (decoder, index, builder, checkIndex) {
    return this.a1y(decoder, index, builder instanceof ULongArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(ULongArraySerializer_0).r1t = function (decoder, index, builder, checkIndex) {
    return this.a1y(decoder, index, builder instanceof ULongArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(ULongArraySerializer_0).e1y = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var tmp = encoder.k1p(this.h1t_1, i);
        // Inline function 'kotlin.ULong.toLong' call
        var this_0 = ULongArray__get_impl_pr71q9(content, i);
        var tmp$ret$0 = _ULong___get_data__impl__fggpzb(this_0);
        tmp.u1o(tmp$ret$0);
      }
       while (inductionVariable < size);
  };
  protoOf(ULongArraySerializer_0).s1t = function (encoder, content, size) {
    return this.e1y(encoder, content instanceof ULongArray ? content.pn_1 : THROW_CCE(), size);
  };
  var ULongArraySerializer_instance;
  function ULongArraySerializer_getInstance() {
    if (ULongArraySerializer_instance == null)
      new ULongArraySerializer_0();
    return ULongArraySerializer_instance;
  }
  function IntArraySerializer_0() {
    IntArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_6(IntCompanionObject_instance));
  }
  protoOf(IntArraySerializer_0).h1y = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(IntArraySerializer_0).f1s = function (_this__u8e3s4) {
    return this.h1y((!(_this__u8e3s4 == null) ? isIntArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(IntArraySerializer_0).i1y = function (_this__u8e3s4) {
    return new IntArrayBuilder(_this__u8e3s4);
  };
  protoOf(IntArraySerializer_0).a1r = function (_this__u8e3s4) {
    return this.i1y((!(_this__u8e3s4 == null) ? isIntArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(IntArraySerializer_0).q1t = function () {
    return new Int32Array(0);
  };
  protoOf(IntArraySerializer_0).j1y = function (decoder, index, builder, checkIndex) {
    builder.m1y(decoder.z1n(this.h1t_1, index));
  };
  protoOf(IntArraySerializer_0).l1r = function (decoder, index, builder, checkIndex) {
    return this.j1y(decoder, index, builder instanceof IntArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(IntArraySerializer_0).r1t = function (decoder, index, builder, checkIndex) {
    return this.j1y(decoder, index, builder instanceof IntArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(IntArraySerializer_0).n1y = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.e1p(this.h1t_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(IntArraySerializer_0).s1t = function (encoder, content, size) {
    return this.n1y(encoder, (!(content == null) ? isIntArray(content) : false) ? content : THROW_CCE(), size);
  };
  var IntArraySerializer_instance;
  function IntArraySerializer_getInstance() {
    if (IntArraySerializer_instance == null)
      new IntArraySerializer_0();
    return IntArraySerializer_instance;
  }
  function UIntArraySerializer_0() {
    UIntArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_7(Companion_getInstance_4()));
  }
  protoOf(UIntArraySerializer_0).q1y = function (_this__u8e3s4) {
    return _UIntArray___get_size__impl__r6l8ci(_this__u8e3s4);
  };
  protoOf(UIntArraySerializer_0).f1s = function (_this__u8e3s4) {
    return this.q1y(_this__u8e3s4 instanceof UIntArray ? _this__u8e3s4.dn_1 : THROW_CCE());
  };
  protoOf(UIntArraySerializer_0).r1y = function (_this__u8e3s4) {
    return new UIntArrayBuilder(_this__u8e3s4);
  };
  protoOf(UIntArraySerializer_0).a1r = function (_this__u8e3s4) {
    return this.r1y(_this__u8e3s4 instanceof UIntArray ? _this__u8e3s4.dn_1 : THROW_CCE());
  };
  protoOf(UIntArraySerializer_0).s1y = function () {
    return _UIntArray___init__impl__ghjpc6(0);
  };
  protoOf(UIntArraySerializer_0).q1t = function () {
    return new UIntArray(this.s1y());
  };
  protoOf(UIntArraySerializer_0).t1y = function (decoder, index, builder, checkIndex) {
    // Inline function 'kotlin.toUInt' call
    var this_0 = decoder.f1o(this.h1t_1, index).k1n();
    var tmp$ret$0 = _UInt___init__impl__l7qpdl(this_0);
    builder.w1y(tmp$ret$0);
  };
  protoOf(UIntArraySerializer_0).l1r = function (decoder, index, builder, checkIndex) {
    return this.t1y(decoder, index, builder instanceof UIntArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(UIntArraySerializer_0).r1t = function (decoder, index, builder, checkIndex) {
    return this.t1y(decoder, index, builder instanceof UIntArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(UIntArraySerializer_0).x1y = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var tmp = encoder.k1p(this.h1t_1, i);
        // Inline function 'kotlin.UInt.toInt' call
        var this_0 = UIntArray__get_impl_gp5kza(content, i);
        var tmp$ret$0 = _UInt___get_data__impl__f0vqqw(this_0);
        tmp.t1o(tmp$ret$0);
      }
       while (inductionVariable < size);
  };
  protoOf(UIntArraySerializer_0).s1t = function (encoder, content, size) {
    return this.x1y(encoder, content instanceof UIntArray ? content.dn_1 : THROW_CCE(), size);
  };
  var UIntArraySerializer_instance;
  function UIntArraySerializer_getInstance() {
    if (UIntArraySerializer_instance == null)
      new UIntArraySerializer_0();
    return UIntArraySerializer_instance;
  }
  function ShortArraySerializer_0() {
    ShortArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_8(ShortCompanionObject_instance));
  }
  protoOf(ShortArraySerializer_0).a1z = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(ShortArraySerializer_0).f1s = function (_this__u8e3s4) {
    return this.a1z((!(_this__u8e3s4 == null) ? isShortArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ShortArraySerializer_0).b1z = function (_this__u8e3s4) {
    return new ShortArrayBuilder(_this__u8e3s4);
  };
  protoOf(ShortArraySerializer_0).a1r = function (_this__u8e3s4) {
    return this.b1z((!(_this__u8e3s4 == null) ? isShortArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ShortArraySerializer_0).q1t = function () {
    return new Int16Array(0);
  };
  protoOf(ShortArraySerializer_0).c1z = function (decoder, index, builder, checkIndex) {
    builder.f1z(decoder.y1n(this.h1t_1, index));
  };
  protoOf(ShortArraySerializer_0).l1r = function (decoder, index, builder, checkIndex) {
    return this.c1z(decoder, index, builder instanceof ShortArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(ShortArraySerializer_0).r1t = function (decoder, index, builder, checkIndex) {
    return this.c1z(decoder, index, builder instanceof ShortArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(ShortArraySerializer_0).g1z = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.d1p(this.h1t_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(ShortArraySerializer_0).s1t = function (encoder, content, size) {
    return this.g1z(encoder, (!(content == null) ? isShortArray(content) : false) ? content : THROW_CCE(), size);
  };
  var ShortArraySerializer_instance;
  function ShortArraySerializer_getInstance() {
    if (ShortArraySerializer_instance == null)
      new ShortArraySerializer_0();
    return ShortArraySerializer_instance;
  }
  function UShortArraySerializer_0() {
    UShortArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_9(Companion_getInstance_5()));
  }
  protoOf(UShortArraySerializer_0).j1z = function (_this__u8e3s4) {
    return _UShortArray___get_size__impl__jqto1b(_this__u8e3s4);
  };
  protoOf(UShortArraySerializer_0).f1s = function (_this__u8e3s4) {
    return this.j1z(_this__u8e3s4 instanceof UShortArray ? _this__u8e3s4.bo_1 : THROW_CCE());
  };
  protoOf(UShortArraySerializer_0).k1z = function (_this__u8e3s4) {
    return new UShortArrayBuilder(_this__u8e3s4);
  };
  protoOf(UShortArraySerializer_0).a1r = function (_this__u8e3s4) {
    return this.k1z(_this__u8e3s4 instanceof UShortArray ? _this__u8e3s4.bo_1 : THROW_CCE());
  };
  protoOf(UShortArraySerializer_0).l1z = function () {
    return _UShortArray___init__impl__9b26ef(0);
  };
  protoOf(UShortArraySerializer_0).q1t = function () {
    return new UShortArray(this.l1z());
  };
  protoOf(UShortArraySerializer_0).m1z = function (decoder, index, builder, checkIndex) {
    // Inline function 'kotlin.toUShort' call
    var this_0 = decoder.f1o(this.h1t_1, index).j1n();
    var tmp$ret$0 = _UShort___init__impl__jigrne(this_0);
    builder.p1z(tmp$ret$0);
  };
  protoOf(UShortArraySerializer_0).l1r = function (decoder, index, builder, checkIndex) {
    return this.m1z(decoder, index, builder instanceof UShortArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(UShortArraySerializer_0).r1t = function (decoder, index, builder, checkIndex) {
    return this.m1z(decoder, index, builder instanceof UShortArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(UShortArraySerializer_0).q1z = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var tmp = encoder.k1p(this.h1t_1, i);
        // Inline function 'kotlin.UShort.toShort' call
        var this_0 = UShortArray__get_impl_fnbhmx(content, i);
        var tmp$ret$0 = _UShort___get_data__impl__g0245(this_0);
        tmp.s1o(tmp$ret$0);
      }
       while (inductionVariable < size);
  };
  protoOf(UShortArraySerializer_0).s1t = function (encoder, content, size) {
    return this.q1z(encoder, content instanceof UShortArray ? content.bo_1 : THROW_CCE(), size);
  };
  var UShortArraySerializer_instance;
  function UShortArraySerializer_getInstance() {
    if (UShortArraySerializer_instance == null)
      new UShortArraySerializer_0();
    return UShortArraySerializer_instance;
  }
  function ByteArraySerializer_0() {
    ByteArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_10(ByteCompanionObject_instance));
  }
  protoOf(ByteArraySerializer_0).t1z = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(ByteArraySerializer_0).f1s = function (_this__u8e3s4) {
    return this.t1z((!(_this__u8e3s4 == null) ? isByteArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ByteArraySerializer_0).u1z = function (_this__u8e3s4) {
    return new ByteArrayBuilder(_this__u8e3s4);
  };
  protoOf(ByteArraySerializer_0).a1r = function (_this__u8e3s4) {
    return this.u1z((!(_this__u8e3s4 == null) ? isByteArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ByteArraySerializer_0).q1t = function () {
    return new Int8Array(0);
  };
  protoOf(ByteArraySerializer_0).v1z = function (decoder, index, builder, checkIndex) {
    builder.y1z(decoder.x1n(this.h1t_1, index));
  };
  protoOf(ByteArraySerializer_0).l1r = function (decoder, index, builder, checkIndex) {
    return this.v1z(decoder, index, builder instanceof ByteArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(ByteArraySerializer_0).r1t = function (decoder, index, builder, checkIndex) {
    return this.v1z(decoder, index, builder instanceof ByteArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(ByteArraySerializer_0).z1z = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.c1p(this.h1t_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(ByteArraySerializer_0).s1t = function (encoder, content, size) {
    return this.z1z(encoder, (!(content == null) ? isByteArray(content) : false) ? content : THROW_CCE(), size);
  };
  var ByteArraySerializer_instance;
  function ByteArraySerializer_getInstance() {
    if (ByteArraySerializer_instance == null)
      new ByteArraySerializer_0();
    return ByteArraySerializer_instance;
  }
  function UByteArraySerializer_0() {
    UByteArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_11(Companion_getInstance_6()));
  }
  protoOf(UByteArraySerializer_0).c20 = function (_this__u8e3s4) {
    return _UByteArray___get_size__impl__h6pkdv(_this__u8e3s4);
  };
  protoOf(UByteArraySerializer_0).f1s = function (_this__u8e3s4) {
    return this.c20(_this__u8e3s4 instanceof UByteArray ? _this__u8e3s4.rm_1 : THROW_CCE());
  };
  protoOf(UByteArraySerializer_0).d20 = function (_this__u8e3s4) {
    return new UByteArrayBuilder(_this__u8e3s4);
  };
  protoOf(UByteArraySerializer_0).a1r = function (_this__u8e3s4) {
    return this.d20(_this__u8e3s4 instanceof UByteArray ? _this__u8e3s4.rm_1 : THROW_CCE());
  };
  protoOf(UByteArraySerializer_0).e20 = function () {
    return _UByteArray___init__impl__ip4y9n(0);
  };
  protoOf(UByteArraySerializer_0).q1t = function () {
    return new UByteArray(this.e20());
  };
  protoOf(UByteArraySerializer_0).f20 = function (decoder, index, builder, checkIndex) {
    // Inline function 'kotlin.toUByte' call
    var this_0 = decoder.f1o(this.h1t_1, index).i1n();
    var tmp$ret$0 = _UByte___init__impl__g9hnc4(this_0);
    builder.i20(tmp$ret$0);
  };
  protoOf(UByteArraySerializer_0).l1r = function (decoder, index, builder, checkIndex) {
    return this.f20(decoder, index, builder instanceof UByteArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(UByteArraySerializer_0).r1t = function (decoder, index, builder, checkIndex) {
    return this.f20(decoder, index, builder instanceof UByteArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(UByteArraySerializer_0).j20 = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var tmp = encoder.k1p(this.h1t_1, i);
        // Inline function 'kotlin.UByte.toByte' call
        var this_0 = UByteArray__get_impl_t5f3hv(content, i);
        var tmp$ret$0 = _UByte___get_data__impl__jof9qr(this_0);
        tmp.r1o(tmp$ret$0);
      }
       while (inductionVariable < size);
  };
  protoOf(UByteArraySerializer_0).s1t = function (encoder, content, size) {
    return this.j20(encoder, content instanceof UByteArray ? content.rm_1 : THROW_CCE(), size);
  };
  var UByteArraySerializer_instance;
  function UByteArraySerializer_getInstance() {
    if (UByteArraySerializer_instance == null)
      new UByteArraySerializer_0();
    return UByteArraySerializer_instance;
  }
  function BooleanArraySerializer_0() {
    BooleanArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_12(BooleanCompanionObject_instance));
  }
  protoOf(BooleanArraySerializer_0).m20 = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(BooleanArraySerializer_0).f1s = function (_this__u8e3s4) {
    return this.m20((!(_this__u8e3s4 == null) ? isBooleanArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(BooleanArraySerializer_0).n20 = function (_this__u8e3s4) {
    return new BooleanArrayBuilder(_this__u8e3s4);
  };
  protoOf(BooleanArraySerializer_0).a1r = function (_this__u8e3s4) {
    return this.n20((!(_this__u8e3s4 == null) ? isBooleanArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(BooleanArraySerializer_0).q1t = function () {
    return booleanArray(0);
  };
  protoOf(BooleanArraySerializer_0).o20 = function (decoder, index, builder, checkIndex) {
    builder.r20(decoder.w1n(this.h1t_1, index));
  };
  protoOf(BooleanArraySerializer_0).l1r = function (decoder, index, builder, checkIndex) {
    return this.o20(decoder, index, builder instanceof BooleanArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(BooleanArraySerializer_0).r1t = function (decoder, index, builder, checkIndex) {
    return this.o20(decoder, index, builder instanceof BooleanArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(BooleanArraySerializer_0).s20 = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.b1p(this.h1t_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(BooleanArraySerializer_0).s1t = function (encoder, content, size) {
    return this.s20(encoder, (!(content == null) ? isBooleanArray(content) : false) ? content : THROW_CCE(), size);
  };
  var BooleanArraySerializer_instance;
  function BooleanArraySerializer_getInstance() {
    if (BooleanArraySerializer_instance == null)
      new BooleanArraySerializer_0();
    return BooleanArraySerializer_instance;
  }
  function CharArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.q1w_1 = bufferWithData;
    this.r1w_1 = bufferWithData.length;
    this.n1t(10);
  }
  protoOf(CharArrayBuilder).j1t = function () {
    return this.r1w_1;
  };
  protoOf(CharArrayBuilder).n1t = function (requiredCapacity) {
    if (this.q1w_1.length < requiredCapacity)
      this.q1w_1 = copyOf(this.q1w_1, coerceAtLeast(requiredCapacity, imul(this.q1w_1.length, 2)));
  };
  protoOf(CharArrayBuilder).s1w = function (c) {
    this.u1t();
    var tmp = this.q1w_1;
    var _unary__edvuaz = this.r1w_1;
    this.r1w_1 = _unary__edvuaz + 1 | 0;
    tmp[_unary__edvuaz] = c;
  };
  protoOf(CharArrayBuilder).l1t = function () {
    return copyOf(this.q1w_1, this.r1w_1);
  };
  function DoubleArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.z1w_1 = bufferWithData;
    this.a1x_1 = bufferWithData.length;
    this.n1t(10);
  }
  protoOf(DoubleArrayBuilder).j1t = function () {
    return this.a1x_1;
  };
  protoOf(DoubleArrayBuilder).n1t = function (requiredCapacity) {
    if (this.z1w_1.length < requiredCapacity)
      this.z1w_1 = copyOf_0(this.z1w_1, coerceAtLeast(requiredCapacity, imul(this.z1w_1.length, 2)));
  };
  protoOf(DoubleArrayBuilder).b1x = function (c) {
    this.u1t();
    var tmp = this.z1w_1;
    var _unary__edvuaz = this.a1x_1;
    this.a1x_1 = _unary__edvuaz + 1 | 0;
    tmp[_unary__edvuaz] = c;
  };
  protoOf(DoubleArrayBuilder).l1t = function () {
    return copyOf_0(this.z1w_1, this.a1x_1);
  };
  function FloatArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.i1x_1 = bufferWithData;
    this.j1x_1 = bufferWithData.length;
    this.n1t(10);
  }
  protoOf(FloatArrayBuilder).j1t = function () {
    return this.j1x_1;
  };
  protoOf(FloatArrayBuilder).n1t = function (requiredCapacity) {
    if (this.i1x_1.length < requiredCapacity)
      this.i1x_1 = copyOf_1(this.i1x_1, coerceAtLeast(requiredCapacity, imul(this.i1x_1.length, 2)));
  };
  protoOf(FloatArrayBuilder).k1x = function (c) {
    this.u1t();
    var tmp = this.i1x_1;
    var _unary__edvuaz = this.j1x_1;
    this.j1x_1 = _unary__edvuaz + 1 | 0;
    tmp[_unary__edvuaz] = c;
  };
  protoOf(FloatArrayBuilder).l1t = function () {
    return copyOf_1(this.i1x_1, this.j1x_1);
  };
  function LongArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.r1x_1 = bufferWithData;
    this.s1x_1 = bufferWithData.length;
    this.n1t(10);
  }
  protoOf(LongArrayBuilder).j1t = function () {
    return this.s1x_1;
  };
  protoOf(LongArrayBuilder).n1t = function (requiredCapacity) {
    if (this.r1x_1.length < requiredCapacity)
      this.r1x_1 = copyOf_2(this.r1x_1, coerceAtLeast(requiredCapacity, imul(this.r1x_1.length, 2)));
  };
  protoOf(LongArrayBuilder).t1x = function (c) {
    this.u1t();
    var tmp = this.r1x_1;
    var _unary__edvuaz = this.s1x_1;
    this.s1x_1 = _unary__edvuaz + 1 | 0;
    tmp[_unary__edvuaz] = c;
  };
  protoOf(LongArrayBuilder).l1t = function () {
    return copyOf_2(this.r1x_1, this.s1x_1);
  };
  function ULongArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.b1y_1 = bufferWithData;
    this.c1y_1 = _ULongArray___get_size__impl__ju6dtr(bufferWithData);
    this.n1t(10);
  }
  protoOf(ULongArrayBuilder).j1t = function () {
    return this.c1y_1;
  };
  protoOf(ULongArrayBuilder).n1t = function (requiredCapacity) {
    if (_ULongArray___get_size__impl__ju6dtr(this.b1y_1) < requiredCapacity) {
      var tmp = this;
      var tmp0 = this.b1y_1;
      // Inline function 'kotlin.collections.copyOf' call
      var newSize = coerceAtLeast(requiredCapacity, imul(_ULongArray___get_size__impl__ju6dtr(this.b1y_1), 2));
      tmp.b1y_1 = _ULongArray___init__impl__twm1l3_0(copyOf_2(_ULongArray___get_storage__impl__28e64j(tmp0), newSize));
    }
  };
  protoOf(ULongArrayBuilder).d1y = function (c) {
    this.u1t();
    var tmp = this.b1y_1;
    var _unary__edvuaz = this.c1y_1;
    this.c1y_1 = _unary__edvuaz + 1 | 0;
    ULongArray__set_impl_z19mvh(tmp, _unary__edvuaz, c);
  };
  protoOf(ULongArrayBuilder).t20 = function () {
    var tmp0 = this.b1y_1;
    // Inline function 'kotlin.collections.copyOf' call
    var newSize = this.c1y_1;
    return _ULongArray___init__impl__twm1l3_0(copyOf_2(_ULongArray___get_storage__impl__28e64j(tmp0), newSize));
  };
  protoOf(ULongArrayBuilder).l1t = function () {
    return new ULongArray(this.t20());
  };
  function IntArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.k1y_1 = bufferWithData;
    this.l1y_1 = bufferWithData.length;
    this.n1t(10);
  }
  protoOf(IntArrayBuilder).j1t = function () {
    return this.l1y_1;
  };
  protoOf(IntArrayBuilder).n1t = function (requiredCapacity) {
    if (this.k1y_1.length < requiredCapacity)
      this.k1y_1 = copyOf_3(this.k1y_1, coerceAtLeast(requiredCapacity, imul(this.k1y_1.length, 2)));
  };
  protoOf(IntArrayBuilder).m1y = function (c) {
    this.u1t();
    var tmp = this.k1y_1;
    var _unary__edvuaz = this.l1y_1;
    this.l1y_1 = _unary__edvuaz + 1 | 0;
    tmp[_unary__edvuaz] = c;
  };
  protoOf(IntArrayBuilder).l1t = function () {
    return copyOf_3(this.k1y_1, this.l1y_1);
  };
  function UIntArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.u1y_1 = bufferWithData;
    this.v1y_1 = _UIntArray___get_size__impl__r6l8ci(bufferWithData);
    this.n1t(10);
  }
  protoOf(UIntArrayBuilder).j1t = function () {
    return this.v1y_1;
  };
  protoOf(UIntArrayBuilder).n1t = function (requiredCapacity) {
    if (_UIntArray___get_size__impl__r6l8ci(this.u1y_1) < requiredCapacity) {
      var tmp = this;
      var tmp0 = this.u1y_1;
      // Inline function 'kotlin.collections.copyOf' call
      var newSize = coerceAtLeast(requiredCapacity, imul(_UIntArray___get_size__impl__r6l8ci(this.u1y_1), 2));
      tmp.u1y_1 = _UIntArray___init__impl__ghjpc6_0(copyOf_3(_UIntArray___get_storage__impl__92a0v0(tmp0), newSize));
    }
  };
  protoOf(UIntArrayBuilder).w1y = function (c) {
    this.u1t();
    var tmp = this.u1y_1;
    var _unary__edvuaz = this.v1y_1;
    this.v1y_1 = _unary__edvuaz + 1 | 0;
    UIntArray__set_impl_7f2zu2(tmp, _unary__edvuaz, c);
  };
  protoOf(UIntArrayBuilder).u20 = function () {
    var tmp0 = this.u1y_1;
    // Inline function 'kotlin.collections.copyOf' call
    var newSize = this.v1y_1;
    return _UIntArray___init__impl__ghjpc6_0(copyOf_3(_UIntArray___get_storage__impl__92a0v0(tmp0), newSize));
  };
  protoOf(UIntArrayBuilder).l1t = function () {
    return new UIntArray(this.u20());
  };
  function ShortArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.d1z_1 = bufferWithData;
    this.e1z_1 = bufferWithData.length;
    this.n1t(10);
  }
  protoOf(ShortArrayBuilder).j1t = function () {
    return this.e1z_1;
  };
  protoOf(ShortArrayBuilder).n1t = function (requiredCapacity) {
    if (this.d1z_1.length < requiredCapacity)
      this.d1z_1 = copyOf_4(this.d1z_1, coerceAtLeast(requiredCapacity, imul(this.d1z_1.length, 2)));
  };
  protoOf(ShortArrayBuilder).f1z = function (c) {
    this.u1t();
    var tmp = this.d1z_1;
    var _unary__edvuaz = this.e1z_1;
    this.e1z_1 = _unary__edvuaz + 1 | 0;
    tmp[_unary__edvuaz] = c;
  };
  protoOf(ShortArrayBuilder).l1t = function () {
    return copyOf_4(this.d1z_1, this.e1z_1);
  };
  function UShortArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.n1z_1 = bufferWithData;
    this.o1z_1 = _UShortArray___get_size__impl__jqto1b(bufferWithData);
    this.n1t(10);
  }
  protoOf(UShortArrayBuilder).j1t = function () {
    return this.o1z_1;
  };
  protoOf(UShortArrayBuilder).n1t = function (requiredCapacity) {
    if (_UShortArray___get_size__impl__jqto1b(this.n1z_1) < requiredCapacity) {
      var tmp = this;
      var tmp0 = this.n1z_1;
      // Inline function 'kotlin.collections.copyOf' call
      var newSize = coerceAtLeast(requiredCapacity, imul(_UShortArray___get_size__impl__jqto1b(this.n1z_1), 2));
      tmp.n1z_1 = _UShortArray___init__impl__9b26ef_0(copyOf_4(_UShortArray___get_storage__impl__t2jpv5(tmp0), newSize));
    }
  };
  protoOf(UShortArrayBuilder).p1z = function (c) {
    this.u1t();
    var tmp = this.n1z_1;
    var _unary__edvuaz = this.o1z_1;
    this.o1z_1 = _unary__edvuaz + 1 | 0;
    UShortArray__set_impl_6d8whp(tmp, _unary__edvuaz, c);
  };
  protoOf(UShortArrayBuilder).v20 = function () {
    var tmp0 = this.n1z_1;
    // Inline function 'kotlin.collections.copyOf' call
    var newSize = this.o1z_1;
    return _UShortArray___init__impl__9b26ef_0(copyOf_4(_UShortArray___get_storage__impl__t2jpv5(tmp0), newSize));
  };
  protoOf(UShortArrayBuilder).l1t = function () {
    return new UShortArray(this.v20());
  };
  function ByteArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.w1z_1 = bufferWithData;
    this.x1z_1 = bufferWithData.length;
    this.n1t(10);
  }
  protoOf(ByteArrayBuilder).j1t = function () {
    return this.x1z_1;
  };
  protoOf(ByteArrayBuilder).n1t = function (requiredCapacity) {
    if (this.w1z_1.length < requiredCapacity)
      this.w1z_1 = copyOf_5(this.w1z_1, coerceAtLeast(requiredCapacity, imul(this.w1z_1.length, 2)));
  };
  protoOf(ByteArrayBuilder).y1z = function (c) {
    this.u1t();
    var tmp = this.w1z_1;
    var _unary__edvuaz = this.x1z_1;
    this.x1z_1 = _unary__edvuaz + 1 | 0;
    tmp[_unary__edvuaz] = c;
  };
  protoOf(ByteArrayBuilder).l1t = function () {
    return copyOf_5(this.w1z_1, this.x1z_1);
  };
  function UByteArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.g20_1 = bufferWithData;
    this.h20_1 = _UByteArray___get_size__impl__h6pkdv(bufferWithData);
    this.n1t(10);
  }
  protoOf(UByteArrayBuilder).j1t = function () {
    return this.h20_1;
  };
  protoOf(UByteArrayBuilder).n1t = function (requiredCapacity) {
    if (_UByteArray___get_size__impl__h6pkdv(this.g20_1) < requiredCapacity) {
      var tmp = this;
      var tmp0 = this.g20_1;
      // Inline function 'kotlin.collections.copyOf' call
      var newSize = coerceAtLeast(requiredCapacity, imul(_UByteArray___get_size__impl__h6pkdv(this.g20_1), 2));
      tmp.g20_1 = _UByteArray___init__impl__ip4y9n_0(copyOf_5(_UByteArray___get_storage__impl__d4kctt(tmp0), newSize));
    }
  };
  protoOf(UByteArrayBuilder).i20 = function (c) {
    this.u1t();
    var tmp = this.g20_1;
    var _unary__edvuaz = this.h20_1;
    this.h20_1 = _unary__edvuaz + 1 | 0;
    UByteArray__set_impl_jvcicn(tmp, _unary__edvuaz, c);
  };
  protoOf(UByteArrayBuilder).w20 = function () {
    var tmp0 = this.g20_1;
    // Inline function 'kotlin.collections.copyOf' call
    var newSize = this.h20_1;
    return _UByteArray___init__impl__ip4y9n_0(copyOf_5(_UByteArray___get_storage__impl__d4kctt(tmp0), newSize));
  };
  protoOf(UByteArrayBuilder).l1t = function () {
    return new UByteArray(this.w20());
  };
  function BooleanArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.p20_1 = bufferWithData;
    this.q20_1 = bufferWithData.length;
    this.n1t(10);
  }
  protoOf(BooleanArrayBuilder).j1t = function () {
    return this.q20_1;
  };
  protoOf(BooleanArrayBuilder).n1t = function (requiredCapacity) {
    if (this.p20_1.length < requiredCapacity)
      this.p20_1 = copyOf_6(this.p20_1, coerceAtLeast(requiredCapacity, imul(this.p20_1.length, 2)));
  };
  protoOf(BooleanArrayBuilder).r20 = function (c) {
    this.u1t();
    var tmp = this.p20_1;
    var _unary__edvuaz = this.q20_1;
    this.q20_1 = _unary__edvuaz + 1 | 0;
    tmp[_unary__edvuaz] = c;
  };
  protoOf(BooleanArrayBuilder).l1t = function () {
    return copyOf_6(this.p20_1, this.q20_1);
  };
  function get_BUILTIN_SERIALIZERS() {
    _init_properties_Primitives_kt__k0eto4();
    return BUILTIN_SERIALIZERS;
  }
  var BUILTIN_SERIALIZERS;
  function builtinSerializerOrNull(_this__u8e3s4) {
    _init_properties_Primitives_kt__k0eto4();
    var tmp = get_BUILTIN_SERIALIZERS().f2(_this__u8e3s4);
    return (tmp == null ? true : isInterface(tmp, KSerializer)) ? tmp : THROW_CCE();
  }
  function StringSerializer() {
    StringSerializer_instance = this;
    this.x20_1 = new PrimitiveSerialDescriptor_0('kotlin.String', STRING_getInstance());
  }
  protoOf(StringSerializer).t1k = function () {
    return this.x20_1;
  };
  protoOf(StringSerializer).y20 = function (encoder, value) {
    return encoder.y1o(value);
  };
  protoOf(StringSerializer).u1k = function (encoder, value) {
    return this.y20(encoder, (!(value == null) ? typeof value === 'string' : false) ? value : THROW_CCE());
  };
  protoOf(StringSerializer).v1k = function (decoder) {
    return decoder.p1n();
  };
  var StringSerializer_instance;
  function StringSerializer_getInstance() {
    if (StringSerializer_instance == null)
      new StringSerializer();
    return StringSerializer_instance;
  }
  function CharSerializer() {
    CharSerializer_instance = this;
    this.z20_1 = new PrimitiveSerialDescriptor_0('kotlin.Char', CHAR_getInstance());
  }
  protoOf(CharSerializer).t1k = function () {
    return this.z20_1;
  };
  protoOf(CharSerializer).a21 = function (encoder, value) {
    return encoder.x1o(value);
  };
  protoOf(CharSerializer).u1k = function (encoder, value) {
    return this.a21(encoder, value instanceof Char ? value.k1_1 : THROW_CCE());
  };
  protoOf(CharSerializer).b21 = function (decoder) {
    return decoder.o1n();
  };
  protoOf(CharSerializer).v1k = function (decoder) {
    return new Char(this.b21(decoder));
  };
  var CharSerializer_instance;
  function CharSerializer_getInstance() {
    if (CharSerializer_instance == null)
      new CharSerializer();
    return CharSerializer_instance;
  }
  function DoubleSerializer() {
    DoubleSerializer_instance = this;
    this.c21_1 = new PrimitiveSerialDescriptor_0('kotlin.Double', DOUBLE_getInstance());
  }
  protoOf(DoubleSerializer).t1k = function () {
    return this.c21_1;
  };
  protoOf(DoubleSerializer).d21 = function (encoder, value) {
    return encoder.w1o(value);
  };
  protoOf(DoubleSerializer).u1k = function (encoder, value) {
    return this.d21(encoder, (!(value == null) ? typeof value === 'number' : false) ? value : THROW_CCE());
  };
  protoOf(DoubleSerializer).v1k = function (decoder) {
    return decoder.n1n();
  };
  var DoubleSerializer_instance;
  function DoubleSerializer_getInstance() {
    if (DoubleSerializer_instance == null)
      new DoubleSerializer();
    return DoubleSerializer_instance;
  }
  function FloatSerializer() {
    FloatSerializer_instance = this;
    this.e21_1 = new PrimitiveSerialDescriptor_0('kotlin.Float', FLOAT_getInstance());
  }
  protoOf(FloatSerializer).t1k = function () {
    return this.e21_1;
  };
  protoOf(FloatSerializer).f21 = function (encoder, value) {
    return encoder.v1o(value);
  };
  protoOf(FloatSerializer).u1k = function (encoder, value) {
    return this.f21(encoder, (!(value == null) ? typeof value === 'number' : false) ? value : THROW_CCE());
  };
  protoOf(FloatSerializer).v1k = function (decoder) {
    return decoder.m1n();
  };
  var FloatSerializer_instance;
  function FloatSerializer_getInstance() {
    if (FloatSerializer_instance == null)
      new FloatSerializer();
    return FloatSerializer_instance;
  }
  function LongSerializer() {
    LongSerializer_instance = this;
    this.g21_1 = new PrimitiveSerialDescriptor_0('kotlin.Long', LONG_getInstance());
  }
  protoOf(LongSerializer).t1k = function () {
    return this.g21_1;
  };
  protoOf(LongSerializer).h21 = function (encoder, value) {
    return encoder.u1o(value);
  };
  protoOf(LongSerializer).u1k = function (encoder, value) {
    return this.h21(encoder, value instanceof Long ? value : THROW_CCE());
  };
  protoOf(LongSerializer).v1k = function (decoder) {
    return decoder.l1n();
  };
  var LongSerializer_instance;
  function LongSerializer_getInstance() {
    if (LongSerializer_instance == null)
      new LongSerializer();
    return LongSerializer_instance;
  }
  function IntSerializer() {
    IntSerializer_instance = this;
    this.i21_1 = new PrimitiveSerialDescriptor_0('kotlin.Int', INT_getInstance());
  }
  protoOf(IntSerializer).t1k = function () {
    return this.i21_1;
  };
  protoOf(IntSerializer).j21 = function (encoder, value) {
    return encoder.t1o(value);
  };
  protoOf(IntSerializer).u1k = function (encoder, value) {
    return this.j21(encoder, (!(value == null) ? typeof value === 'number' : false) ? value : THROW_CCE());
  };
  protoOf(IntSerializer).v1k = function (decoder) {
    return decoder.k1n();
  };
  var IntSerializer_instance;
  function IntSerializer_getInstance() {
    if (IntSerializer_instance == null)
      new IntSerializer();
    return IntSerializer_instance;
  }
  function ShortSerializer() {
    ShortSerializer_instance = this;
    this.k21_1 = new PrimitiveSerialDescriptor_0('kotlin.Short', SHORT_getInstance());
  }
  protoOf(ShortSerializer).t1k = function () {
    return this.k21_1;
  };
  protoOf(ShortSerializer).l21 = function (encoder, value) {
    return encoder.s1o(value);
  };
  protoOf(ShortSerializer).u1k = function (encoder, value) {
    return this.l21(encoder, (!(value == null) ? typeof value === 'number' : false) ? value : THROW_CCE());
  };
  protoOf(ShortSerializer).v1k = function (decoder) {
    return decoder.j1n();
  };
  var ShortSerializer_instance;
  function ShortSerializer_getInstance() {
    if (ShortSerializer_instance == null)
      new ShortSerializer();
    return ShortSerializer_instance;
  }
  function ByteSerializer() {
    ByteSerializer_instance = this;
    this.m21_1 = new PrimitiveSerialDescriptor_0('kotlin.Byte', BYTE_getInstance());
  }
  protoOf(ByteSerializer).t1k = function () {
    return this.m21_1;
  };
  protoOf(ByteSerializer).n21 = function (encoder, value) {
    return encoder.r1o(value);
  };
  protoOf(ByteSerializer).u1k = function (encoder, value) {
    return this.n21(encoder, (!(value == null) ? typeof value === 'number' : false) ? value : THROW_CCE());
  };
  protoOf(ByteSerializer).v1k = function (decoder) {
    return decoder.i1n();
  };
  var ByteSerializer_instance;
  function ByteSerializer_getInstance() {
    if (ByteSerializer_instance == null)
      new ByteSerializer();
    return ByteSerializer_instance;
  }
  function BooleanSerializer() {
    BooleanSerializer_instance = this;
    this.o21_1 = new PrimitiveSerialDescriptor_0('kotlin.Boolean', BOOLEAN_getInstance());
  }
  protoOf(BooleanSerializer).t1k = function () {
    return this.o21_1;
  };
  protoOf(BooleanSerializer).p21 = function (encoder, value) {
    return encoder.q1o(value);
  };
  protoOf(BooleanSerializer).u1k = function (encoder, value) {
    return this.p21(encoder, (!(value == null) ? typeof value === 'boolean' : false) ? value : THROW_CCE());
  };
  protoOf(BooleanSerializer).v1k = function (decoder) {
    return decoder.h1n();
  };
  var BooleanSerializer_instance;
  function BooleanSerializer_getInstance() {
    if (BooleanSerializer_instance == null)
      new BooleanSerializer();
    return BooleanSerializer_instance;
  }
  function UnitSerializer() {
    UnitSerializer_instance = this;
    this.q21_1 = new ObjectSerializer('kotlin.Unit', Unit_instance);
  }
  protoOf(UnitSerializer).t1k = function () {
    return this.q21_1.t1k();
  };
  protoOf(UnitSerializer).r21 = function (encoder, value) {
    this.q21_1.j1l(encoder, Unit_instance);
  };
  protoOf(UnitSerializer).u1k = function (encoder, value) {
    return this.r21(encoder, value instanceof Unit ? value : THROW_CCE());
  };
  protoOf(UnitSerializer).s21 = function (decoder) {
    this.q21_1.v1k(decoder);
  };
  protoOf(UnitSerializer).v1k = function (decoder) {
    this.s21(decoder);
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
    this.t21_1 = serialName;
    this.u21_1 = kind;
  }
  protoOf(PrimitiveSerialDescriptor_0).x1l = function () {
    return this.t21_1;
  };
  protoOf(PrimitiveSerialDescriptor_0).y1l = function () {
    return this.u21_1;
  };
  protoOf(PrimitiveSerialDescriptor_0).a1m = function () {
    return 0;
  };
  protoOf(PrimitiveSerialDescriptor_0).c1m = function (index) {
    error_0(this);
  };
  protoOf(PrimitiveSerialDescriptor_0).d1m = function (name) {
    error_0(this);
  };
  protoOf(PrimitiveSerialDescriptor_0).g1m = function (index) {
    error_0(this);
  };
  protoOf(PrimitiveSerialDescriptor_0).f1m = function (index) {
    error_0(this);
  };
  protoOf(PrimitiveSerialDescriptor_0).e1m = function (index) {
    error_0(this);
  };
  protoOf(PrimitiveSerialDescriptor_0).toString = function () {
    return 'PrimitiveDescriptor(' + this.t21_1 + ')';
  };
  protoOf(PrimitiveSerialDescriptor_0).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof PrimitiveSerialDescriptor_0))
      return false;
    if (this.t21_1 === other.t21_1 && equals(this.u21_1, other.u21_1))
      return true;
    return false;
  };
  protoOf(PrimitiveSerialDescriptor_0).hashCode = function () {
    return getStringHashCode(this.t21_1) + imul(31, this.u21_1.hashCode()) | 0;
  };
  function PrimitiveDescriptorSafe(serialName, kind) {
    _init_properties_Primitives_kt__k0eto4();
    checkName(serialName);
    return new PrimitiveSerialDescriptor_0(serialName, kind);
  }
  function checkName(serialName) {
    _init_properties_Primitives_kt__k0eto4();
    var values = get_BUILTIN_SERIALIZERS().h2();
    var _iterator__ex2g4s = values.g();
    while (_iterator__ex2g4s.h()) {
      var primitive = _iterator__ex2g4s.i();
      var primitiveName = primitive.t1k().x1l();
      if (serialName === primitiveName) {
        throw IllegalArgumentException_init_$Create$(trimIndent('\n                The name of serial descriptor should uniquely identify associated serializer.\n                For serial name ' + serialName + ' there already exists ' + getKClassFromExpression(primitive).ya() + '.\n                Please refer to SerialDescriptor documentation for additional information.\n            '));
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
  protoOf(NamedValueEncoder).w21 = function (_this__u8e3s4, index) {
    return this.y21(this.x21(_this__u8e3s4, index));
  };
  protoOf(NamedValueEncoder).y21 = function (nestedName) {
    var tmp0_elvis_lhs = this.a22();
    return this.b22(tmp0_elvis_lhs == null ? '' : tmp0_elvis_lhs, nestedName);
  };
  protoOf(NamedValueEncoder).x21 = function (descriptor, index) {
    return descriptor.c1m(index);
  };
  protoOf(NamedValueEncoder).b22 = function (parentName, childName) {
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
  protoOf(NamedValueDecoder).w21 = function (_this__u8e3s4, index) {
    return this.y21(this.x21(_this__u8e3s4, index));
  };
  protoOf(NamedValueDecoder).y21 = function (nestedName) {
    var tmp0_elvis_lhs = this.a22();
    return this.b22(tmp0_elvis_lhs == null ? '' : tmp0_elvis_lhs, nestedName);
  };
  protoOf(NamedValueDecoder).x21 = function (descriptor, index) {
    return descriptor.c1m(index);
  };
  protoOf(NamedValueDecoder).b22 = function (parentName, childName) {
    var tmp;
    // Inline function 'kotlin.text.isEmpty' call
    if (charSequenceLength(parentName) === 0) {
      tmp = childName;
    } else {
      tmp = parentName + '.' + childName;
    }
    return tmp;
  };
  protoOf(NamedValueDecoder).y22 = function () {
    return this.w22_1.p() ? '$' : joinToString(this.w22_1, '.', '$.');
  };
  function encodeElement($this, desc, index) {
    var tag = $this.w21(desc, index);
    $this.s22(tag);
    return true;
  }
  function TaggedEncoder() {
    var tmp = this;
    // Inline function 'kotlin.collections.arrayListOf' call
    tmp.z21_1 = ArrayList_init_$Create$_0();
  }
  protoOf(TaggedEncoder).j1o = function () {
    return EmptySerializersModule_0();
  };
  protoOf(TaggedEncoder).c22 = function (tag, value) {
    throw SerializationException_init_$Create$_0('Non-serializable ' + toString(getKClassFromExpression(value)) + ' is not supported by ' + toString(getKClassFromExpression(this)) + ' encoder');
  };
  protoOf(TaggedEncoder).d22 = function (tag) {
  };
  protoOf(TaggedEncoder).e22 = function (tag) {
    throw SerializationException_init_$Create$_0('null is not supported');
  };
  protoOf(TaggedEncoder).f22 = function (tag, value) {
    return this.c22(tag, value);
  };
  protoOf(TaggedEncoder).g22 = function (tag, value) {
    return this.c22(tag, value);
  };
  protoOf(TaggedEncoder).h22 = function (tag, value) {
    return this.c22(tag, value);
  };
  protoOf(TaggedEncoder).i22 = function (tag, value) {
    return this.c22(tag, value);
  };
  protoOf(TaggedEncoder).j22 = function (tag, value) {
    return this.c22(tag, value);
  };
  protoOf(TaggedEncoder).k22 = function (tag, value) {
    return this.c22(tag, value);
  };
  protoOf(TaggedEncoder).l22 = function (tag, value) {
    return this.c22(tag, value);
  };
  protoOf(TaggedEncoder).m22 = function (tag, value) {
    return this.c22(tag, new Char(value));
  };
  protoOf(TaggedEncoder).n22 = function (tag, value) {
    return this.c22(tag, value);
  };
  protoOf(TaggedEncoder).o22 = function (tag, enumDescriptor, ordinal) {
    return this.c22(tag, ordinal);
  };
  protoOf(TaggedEncoder).p22 = function (tag, inlineDescriptor) {
    // Inline function 'kotlin.apply' call
    this.s22(tag);
    return this;
  };
  protoOf(TaggedEncoder).a1p = function (descriptor) {
    return this.p22(this.t22(), descriptor);
  };
  protoOf(TaggedEncoder).p1p = function () {
    return this.d22(this.r22());
  };
  protoOf(TaggedEncoder).p1o = function () {
    return this.e22(this.t22());
  };
  protoOf(TaggedEncoder).q1o = function (value) {
    return this.l22(this.t22(), value);
  };
  protoOf(TaggedEncoder).r1o = function (value) {
    return this.g22(this.t22(), value);
  };
  protoOf(TaggedEncoder).s1o = function (value) {
    return this.h22(this.t22(), value);
  };
  protoOf(TaggedEncoder).t1o = function (value) {
    return this.f22(this.t22(), value);
  };
  protoOf(TaggedEncoder).u1o = function (value) {
    return this.i22(this.t22(), value);
  };
  protoOf(TaggedEncoder).v1o = function (value) {
    return this.j22(this.t22(), value);
  };
  protoOf(TaggedEncoder).w1o = function (value) {
    return this.k22(this.t22(), value);
  };
  protoOf(TaggedEncoder).x1o = function (value) {
    return this.m22(this.t22(), value);
  };
  protoOf(TaggedEncoder).y1o = function (value) {
    return this.n22(this.t22(), value);
  };
  protoOf(TaggedEncoder).z1o = function (enumDescriptor, index) {
    return this.o22(this.t22(), enumDescriptor, index);
  };
  protoOf(TaggedEncoder).u1n = function (descriptor) {
    return this;
  };
  protoOf(TaggedEncoder).v1n = function (descriptor) {
    // Inline function 'kotlin.collections.isNotEmpty' call
    if (!this.z21_1.p()) {
      this.t22();
    }
    this.q22(descriptor);
  };
  protoOf(TaggedEncoder).q22 = function (descriptor) {
  };
  protoOf(TaggedEncoder).b1p = function (descriptor, index, value) {
    return this.l22(this.w21(descriptor, index), value);
  };
  protoOf(TaggedEncoder).c1p = function (descriptor, index, value) {
    return this.g22(this.w21(descriptor, index), value);
  };
  protoOf(TaggedEncoder).d1p = function (descriptor, index, value) {
    return this.h22(this.w21(descriptor, index), value);
  };
  protoOf(TaggedEncoder).e1p = function (descriptor, index, value) {
    return this.f22(this.w21(descriptor, index), value);
  };
  protoOf(TaggedEncoder).f1p = function (descriptor, index, value) {
    return this.i22(this.w21(descriptor, index), value);
  };
  protoOf(TaggedEncoder).g1p = function (descriptor, index, value) {
    return this.j22(this.w21(descriptor, index), value);
  };
  protoOf(TaggedEncoder).h1p = function (descriptor, index, value) {
    return this.k22(this.w21(descriptor, index), value);
  };
  protoOf(TaggedEncoder).i1p = function (descriptor, index, value) {
    return this.m22(this.w21(descriptor, index), value);
  };
  protoOf(TaggedEncoder).j1p = function (descriptor, index, value) {
    return this.n22(this.w21(descriptor, index), value);
  };
  protoOf(TaggedEncoder).k1p = function (descriptor, index) {
    return this.p22(this.w21(descriptor, index), descriptor.f1m(index));
  };
  protoOf(TaggedEncoder).l1p = function (descriptor, index, serializer, value) {
    if (encodeElement(this, descriptor, index)) {
      this.m1p(serializer, value);
    }
  };
  protoOf(TaggedEncoder).n1p = function (descriptor, index, serializer, value) {
    if (encodeElement(this, descriptor, index)) {
      this.o1p(serializer, value);
    }
  };
  protoOf(TaggedEncoder).r22 = function () {
    return last(this.z21_1);
  };
  protoOf(TaggedEncoder).a22 = function () {
    return lastOrNull(this.z21_1);
  };
  protoOf(TaggedEncoder).s22 = function (name) {
    this.z21_1.e(name);
  };
  protoOf(TaggedEncoder).t22 = function () {
    var tmp;
    // Inline function 'kotlin.collections.isNotEmpty' call
    if (!this.z21_1.p()) {
      tmp = this.z21_1.c2(get_lastIndex_0(this.z21_1));
    } else {
      throw SerializationException_init_$Create$_0('No tag in stack for requested element');
    }
    return tmp;
  };
  function tagBlock($this, tag, block) {
    $this.s22(tag);
    var r = block();
    if (!$this.x22_1) {
      $this.t22();
    }
    $this.x22_1 = false;
    return r;
  }
  function TaggedDecoder$decodeSerializableElement$lambda(this$0, $deserializer, $previousValue) {
    return function () {
      return this$0.s1n($deserializer, $previousValue);
    };
  }
  function TaggedDecoder$decodeNullableSerializableElement$lambda(this$0, $deserializer, $previousValue) {
    return function () {
      var tmp0 = this$0;
      // Inline function 'kotlinx.serialization.encoding.decodeIfNullable' call
      var isNullabilitySupported = $deserializer.t1k().t1l();
      var tmp;
      if (isNullabilitySupported || tmp0.f1n()) {
        tmp = this$0.s1n($deserializer, $previousValue);
      } else {
        tmp = tmp0.g1n();
      }
      return tmp;
    };
  }
  function TaggedDecoder() {
    var tmp = this;
    // Inline function 'kotlin.collections.arrayListOf' call
    tmp.w22_1 = ArrayList_init_$Create$_0();
    this.x22_1 = false;
  }
  protoOf(TaggedDecoder).j1o = function () {
    return EmptySerializersModule_0();
  };
  protoOf(TaggedDecoder).z22 = function (tag) {
    throw SerializationException_init_$Create$_0(toString(getKClassFromExpression(this)) + " can't retrieve untyped values");
  };
  protoOf(TaggedDecoder).a23 = function (tag) {
    return true;
  };
  protoOf(TaggedDecoder).b23 = function (tag) {
    var tmp = this.z22(tag);
    return typeof tmp === 'boolean' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).c23 = function (tag) {
    var tmp = this.z22(tag);
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).d23 = function (tag) {
    var tmp = this.z22(tag);
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).e23 = function (tag) {
    var tmp = this.z22(tag);
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).f23 = function (tag) {
    var tmp = this.z22(tag);
    return tmp instanceof Long ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).g23 = function (tag) {
    var tmp = this.z22(tag);
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).h23 = function (tag) {
    var tmp = this.z22(tag);
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).i23 = function (tag) {
    var tmp = this.z22(tag);
    return tmp instanceof Char ? tmp.k1_1 : THROW_CCE();
  };
  protoOf(TaggedDecoder).j23 = function (tag) {
    var tmp = this.z22(tag);
    return typeof tmp === 'string' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).k23 = function (tag, enumDescriptor) {
    var tmp = this.z22(tag);
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).l23 = function (tag, inlineDescriptor) {
    // Inline function 'kotlin.apply' call
    this.s22(tag);
    return this;
  };
  protoOf(TaggedDecoder).s1n = function (deserializer, previousValue) {
    return this.t1n(deserializer);
  };
  protoOf(TaggedDecoder).r1n = function (descriptor) {
    return this.l23(this.t22(), descriptor);
  };
  protoOf(TaggedDecoder).f1n = function () {
    var tmp0_elvis_lhs = this.a22();
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return false;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var currentTag = tmp;
    return this.a23(currentTag);
  };
  protoOf(TaggedDecoder).g1n = function () {
    return null;
  };
  protoOf(TaggedDecoder).h1n = function () {
    return this.b23(this.t22());
  };
  protoOf(TaggedDecoder).i1n = function () {
    return this.c23(this.t22());
  };
  protoOf(TaggedDecoder).j1n = function () {
    return this.d23(this.t22());
  };
  protoOf(TaggedDecoder).k1n = function () {
    return this.e23(this.t22());
  };
  protoOf(TaggedDecoder).l1n = function () {
    return this.f23(this.t22());
  };
  protoOf(TaggedDecoder).m1n = function () {
    return this.g23(this.t22());
  };
  protoOf(TaggedDecoder).n1n = function () {
    return this.h23(this.t22());
  };
  protoOf(TaggedDecoder).o1n = function () {
    return this.i23(this.t22());
  };
  protoOf(TaggedDecoder).p1n = function () {
    return this.j23(this.t22());
  };
  protoOf(TaggedDecoder).q1n = function (enumDescriptor) {
    return this.k23(this.t22(), enumDescriptor);
  };
  protoOf(TaggedDecoder).u1n = function (descriptor) {
    return this;
  };
  protoOf(TaggedDecoder).v1n = function (descriptor) {
  };
  protoOf(TaggedDecoder).w1n = function (descriptor, index) {
    return this.b23(this.w21(descriptor, index));
  };
  protoOf(TaggedDecoder).x1n = function (descriptor, index) {
    return this.c23(this.w21(descriptor, index));
  };
  protoOf(TaggedDecoder).y1n = function (descriptor, index) {
    return this.d23(this.w21(descriptor, index));
  };
  protoOf(TaggedDecoder).z1n = function (descriptor, index) {
    return this.e23(this.w21(descriptor, index));
  };
  protoOf(TaggedDecoder).a1o = function (descriptor, index) {
    return this.f23(this.w21(descriptor, index));
  };
  protoOf(TaggedDecoder).b1o = function (descriptor, index) {
    return this.g23(this.w21(descriptor, index));
  };
  protoOf(TaggedDecoder).c1o = function (descriptor, index) {
    return this.h23(this.w21(descriptor, index));
  };
  protoOf(TaggedDecoder).d1o = function (descriptor, index) {
    return this.i23(this.w21(descriptor, index));
  };
  protoOf(TaggedDecoder).e1o = function (descriptor, index) {
    return this.j23(this.w21(descriptor, index));
  };
  protoOf(TaggedDecoder).f1o = function (descriptor, index) {
    return this.l23(this.w21(descriptor, index), descriptor.f1m(index));
  };
  protoOf(TaggedDecoder).g1o = function (descriptor, index, deserializer, previousValue) {
    var tmp = this.w21(descriptor, index);
    return tagBlock(this, tmp, TaggedDecoder$decodeSerializableElement$lambda(this, deserializer, previousValue));
  };
  protoOf(TaggedDecoder).i1o = function (descriptor, index, deserializer, previousValue) {
    var tmp = this.w21(descriptor, index);
    return tagBlock(this, tmp, TaggedDecoder$decodeNullableSerializableElement$lambda(this, deserializer, previousValue));
  };
  protoOf(TaggedDecoder).a22 = function () {
    return lastOrNull(this.w22_1);
  };
  protoOf(TaggedDecoder).s22 = function (name) {
    this.w22_1.e(name);
  };
  protoOf(TaggedDecoder).t22 = function () {
    var r = this.w22_1.c2(get_lastIndex_0(this.w22_1));
    this.x22_1 = true;
    return r;
  };
  function get_NULL() {
    _init_properties_Tuples_kt__dz0qyd();
    return NULL;
  }
  var NULL;
  function MapEntry(key, value) {
    this.m23_1 = key;
    this.n23_1 = value;
  }
  protoOf(MapEntry).v = function () {
    return this.m23_1;
  };
  protoOf(MapEntry).w = function () {
    return this.n23_1;
  };
  protoOf(MapEntry).toString = function () {
    return 'MapEntry(key=' + toString_0(this.m23_1) + ', value=' + toString_0(this.n23_1) + ')';
  };
  protoOf(MapEntry).hashCode = function () {
    var result = this.m23_1 == null ? 0 : hashCode(this.m23_1);
    result = imul(result, 31) + (this.n23_1 == null ? 0 : hashCode(this.n23_1)) | 0;
    return result;
  };
  protoOf(MapEntry).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof MapEntry))
      return false;
    var tmp0_other_with_cast = other instanceof MapEntry ? other : THROW_CCE();
    if (!equals(this.m23_1, tmp0_other_with_cast.m23_1))
      return false;
    if (!equals(this.n23_1, tmp0_other_with_cast.n23_1))
      return false;
    return true;
  };
  function MapEntrySerializer$descriptor$lambda($keySerializer, $valueSerializer) {
    return function ($this$buildSerialDescriptor) {
      $this$buildSerialDescriptor.e1l('key', $keySerializer.t1k());
      $this$buildSerialDescriptor.e1l('value', $valueSerializer.t1k());
      return Unit_instance;
    };
  }
  function MapEntrySerializer_0(keySerializer, valueSerializer) {
    KeyValueSerializer.call(this, keySerializer, valueSerializer);
    var tmp = this;
    var tmp_0 = MAP_getInstance();
    tmp.q23_1 = buildSerialDescriptor('kotlin.collections.Map.Entry', tmp_0, [], MapEntrySerializer$descriptor$lambda(keySerializer, valueSerializer));
  }
  protoOf(MapEntrySerializer_0).t1k = function () {
    return this.q23_1;
  };
  protoOf(MapEntrySerializer_0).r23 = function (_this__u8e3s4) {
    return _this__u8e3s4.v();
  };
  protoOf(MapEntrySerializer_0).s23 = function (_this__u8e3s4) {
    return this.r23((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, Entry) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(MapEntrySerializer_0).t23 = function (_this__u8e3s4) {
    return _this__u8e3s4.w();
  };
  protoOf(MapEntrySerializer_0).u23 = function (_this__u8e3s4) {
    return this.t23((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, Entry) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(MapEntrySerializer_0).v23 = function (key, value) {
    return new MapEntry(key, value);
  };
  function PairSerializer$descriptor$lambda($keySerializer, $valueSerializer) {
    return function ($this$buildClassSerialDescriptor) {
      $this$buildClassSerialDescriptor.e1l('first', $keySerializer.t1k());
      $this$buildClassSerialDescriptor.e1l('second', $valueSerializer.t1k());
      return Unit_instance;
    };
  }
  function PairSerializer_0(keySerializer, valueSerializer) {
    KeyValueSerializer.call(this, keySerializer, valueSerializer);
    var tmp = this;
    tmp.b24_1 = buildClassSerialDescriptor('kotlin.Pair', [], PairSerializer$descriptor$lambda(keySerializer, valueSerializer));
  }
  protoOf(PairSerializer_0).t1k = function () {
    return this.b24_1;
  };
  protoOf(PairSerializer_0).c24 = function (_this__u8e3s4) {
    return _this__u8e3s4.tg_1;
  };
  protoOf(PairSerializer_0).s23 = function (_this__u8e3s4) {
    return this.c24(_this__u8e3s4 instanceof Pair ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(PairSerializer_0).d24 = function (_this__u8e3s4) {
    return _this__u8e3s4.ug_1;
  };
  protoOf(PairSerializer_0).u23 = function (_this__u8e3s4) {
    return this.d24(_this__u8e3s4 instanceof Pair ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(PairSerializer_0).v23 = function (key, value) {
    return to(key, value);
  };
  function decodeSequentially_1($this, composite) {
    var a = composite.h1o($this.h24_1, 0, $this.e24_1);
    var b = composite.h1o($this.h24_1, 1, $this.f24_1);
    var c = composite.h1o($this.h24_1, 2, $this.g24_1);
    composite.v1n($this.h24_1);
    return new Triple(a, b, c);
  }
  function decodeStructure($this, composite) {
    var a = get_NULL();
    var b = get_NULL();
    var c = get_NULL();
    mainLoop: while (true) {
      var index = composite.l1o($this.h24_1);
      switch (index) {
        case -1:
          break mainLoop;
        case 0:
          a = composite.h1o($this.h24_1, 0, $this.e24_1);
          break;
        case 1:
          b = composite.h1o($this.h24_1, 1, $this.f24_1);
          break;
        case 2:
          c = composite.h1o($this.h24_1, 2, $this.g24_1);
          break;
        default:
          throw SerializationException_init_$Create$_0('Unexpected index ' + index);
      }
    }
    composite.v1n($this.h24_1);
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
      $this$buildClassSerialDescriptor.e1l('first', this$0.e24_1.t1k());
      $this$buildClassSerialDescriptor.e1l('second', this$0.f24_1.t1k());
      $this$buildClassSerialDescriptor.e1l('third', this$0.g24_1.t1k());
      return Unit_instance;
    };
  }
  function TripleSerializer_0(aSerializer, bSerializer, cSerializer) {
    this.e24_1 = aSerializer;
    this.f24_1 = bSerializer;
    this.g24_1 = cSerializer;
    var tmp = this;
    tmp.h24_1 = buildClassSerialDescriptor('kotlin.Triple', [], TripleSerializer$descriptor$lambda(this));
  }
  protoOf(TripleSerializer_0).t1k = function () {
    return this.h24_1;
  };
  protoOf(TripleSerializer_0).i24 = function (encoder, value) {
    var structuredEncoder = encoder.u1n(this.h24_1);
    structuredEncoder.l1p(this.h24_1, 0, this.e24_1, value.zl_1);
    structuredEncoder.l1p(this.h24_1, 1, this.f24_1, value.am_1);
    structuredEncoder.l1p(this.h24_1, 2, this.g24_1, value.bm_1);
    structuredEncoder.v1n(this.h24_1);
  };
  protoOf(TripleSerializer_0).u1k = function (encoder, value) {
    return this.i24(encoder, value instanceof Triple ? value : THROW_CCE());
  };
  protoOf(TripleSerializer_0).v1k = function (decoder) {
    var composite = decoder.u1n(this.h24_1);
    if (composite.k1o()) {
      return decodeSequentially_1(this, composite);
    }
    return decodeStructure(this, composite);
  };
  function KeyValueSerializer(keySerializer, valueSerializer) {
    this.w23_1 = keySerializer;
    this.x23_1 = valueSerializer;
  }
  protoOf(KeyValueSerializer).y23 = function (encoder, value) {
    var structuredEncoder = encoder.u1n(this.t1k());
    structuredEncoder.l1p(this.t1k(), 0, this.w23_1, this.s23(value));
    structuredEncoder.l1p(this.t1k(), 1, this.x23_1, this.u23(value));
    structuredEncoder.v1n(this.t1k());
  };
  protoOf(KeyValueSerializer).u1k = function (encoder, value) {
    return this.y23(encoder, (value == null ? true : !(value == null)) ? value : THROW_CCE());
  };
  protoOf(KeyValueSerializer).v1k = function (decoder) {
    // Inline function 'kotlinx.serialization.encoding.decodeStructure' call
    var descriptor = this.t1k();
    var composite = decoder.u1n(descriptor);
    var tmp$ret$0;
    $l$block: {
      if (composite.k1o()) {
        var key = composite.h1o(this.t1k(), 0, this.w23_1);
        var value = composite.h1o(this.t1k(), 1, this.x23_1);
        tmp$ret$0 = this.v23(key, value);
        break $l$block;
      }
      var key_0 = get_NULL();
      var value_0 = get_NULL();
      mainLoop: while (true) {
        var idx = composite.l1o(this.t1k());
        switch (idx) {
          case -1:
            break mainLoop;
          case 0:
            key_0 = composite.h1o(this.t1k(), 0, this.w23_1);
            break;
          case 1:
            value_0 = composite.h1o(this.t1k(), 1, this.x23_1);
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
      tmp$ret$0 = this.v23(tmp, (value_0 == null ? true : !(value_0 == null)) ? value_0 : THROW_CCE());
    }
    var result = tmp$ret$0;
    composite.v1n(descriptor);
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
    this.j24_1 = InlinePrimitiveDescriptor('kotlin.ULong', serializer_4(Companion_getInstance_2()));
  }
  protoOf(ULongSerializer).t1k = function () {
    return this.j24_1;
  };
  protoOf(ULongSerializer).k24 = function (encoder, value) {
    var tmp = encoder.a1p(this.j24_1);
    // Inline function 'kotlin.ULong.toLong' call
    var tmp$ret$0 = _ULong___get_data__impl__fggpzb(value);
    tmp.u1o(tmp$ret$0);
  };
  protoOf(ULongSerializer).u1k = function (encoder, value) {
    return this.k24(encoder, value instanceof ULong ? value.kn_1 : THROW_CCE());
  };
  protoOf(ULongSerializer).l24 = function (decoder) {
    // Inline function 'kotlin.toULong' call
    var this_0 = decoder.r1n(this.j24_1).l1n();
    return _ULong___init__impl__c78o9k(this_0);
  };
  protoOf(ULongSerializer).v1k = function (decoder) {
    return new ULong(this.l24(decoder));
  };
  var ULongSerializer_instance;
  function ULongSerializer_getInstance() {
    if (ULongSerializer_instance == null)
      new ULongSerializer();
    return ULongSerializer_instance;
  }
  function UIntSerializer() {
    UIntSerializer_instance = this;
    this.m24_1 = InlinePrimitiveDescriptor('kotlin.UInt', serializer_6(IntCompanionObject_instance));
  }
  protoOf(UIntSerializer).t1k = function () {
    return this.m24_1;
  };
  protoOf(UIntSerializer).n24 = function (encoder, value) {
    var tmp = encoder.a1p(this.m24_1);
    // Inline function 'kotlin.UInt.toInt' call
    var tmp$ret$0 = _UInt___get_data__impl__f0vqqw(value);
    tmp.t1o(tmp$ret$0);
  };
  protoOf(UIntSerializer).u1k = function (encoder, value) {
    return this.n24(encoder, value instanceof UInt ? value.ym_1 : THROW_CCE());
  };
  protoOf(UIntSerializer).o24 = function (decoder) {
    // Inline function 'kotlin.toUInt' call
    var this_0 = decoder.r1n(this.m24_1).k1n();
    return _UInt___init__impl__l7qpdl(this_0);
  };
  protoOf(UIntSerializer).v1k = function (decoder) {
    return new UInt(this.o24(decoder));
  };
  var UIntSerializer_instance;
  function UIntSerializer_getInstance() {
    if (UIntSerializer_instance == null)
      new UIntSerializer();
    return UIntSerializer_instance;
  }
  function UShortSerializer() {
    UShortSerializer_instance = this;
    this.p24_1 = InlinePrimitiveDescriptor('kotlin.UShort', serializer_8(ShortCompanionObject_instance));
  }
  protoOf(UShortSerializer).t1k = function () {
    return this.p24_1;
  };
  protoOf(UShortSerializer).q24 = function (encoder, value) {
    var tmp = encoder.a1p(this.p24_1);
    // Inline function 'kotlin.UShort.toShort' call
    var tmp$ret$0 = _UShort___get_data__impl__g0245(value);
    tmp.s1o(tmp$ret$0);
  };
  protoOf(UShortSerializer).u1k = function (encoder, value) {
    return this.q24(encoder, value instanceof UShort ? value.wn_1 : THROW_CCE());
  };
  protoOf(UShortSerializer).r24 = function (decoder) {
    // Inline function 'kotlin.toUShort' call
    var this_0 = decoder.r1n(this.p24_1).j1n();
    return _UShort___init__impl__jigrne(this_0);
  };
  protoOf(UShortSerializer).v1k = function (decoder) {
    return new UShort(this.r24(decoder));
  };
  var UShortSerializer_instance;
  function UShortSerializer_getInstance() {
    if (UShortSerializer_instance == null)
      new UShortSerializer();
    return UShortSerializer_instance;
  }
  function UByteSerializer() {
    UByteSerializer_instance = this;
    this.s24_1 = InlinePrimitiveDescriptor('kotlin.UByte', serializer_10(ByteCompanionObject_instance));
  }
  protoOf(UByteSerializer).t1k = function () {
    return this.s24_1;
  };
  protoOf(UByteSerializer).t24 = function (encoder, value) {
    var tmp = encoder.a1p(this.s24_1);
    // Inline function 'kotlin.UByte.toByte' call
    var tmp$ret$0 = _UByte___get_data__impl__jof9qr(value);
    tmp.r1o(tmp$ret$0);
  };
  protoOf(UByteSerializer).u1k = function (encoder, value) {
    return this.t24(encoder, value instanceof UByte ? value.mm_1 : THROW_CCE());
  };
  protoOf(UByteSerializer).u24 = function (decoder) {
    // Inline function 'kotlin.toUByte' call
    var this_0 = decoder.r1n(this.s24_1).i1n();
    return _UByte___init__impl__g9hnc4(this_0);
  };
  protoOf(UByteSerializer).v1k = function (decoder) {
    return new UByte(this.u24(decoder));
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
  protoOf(SerializersModule).p1l = function (kClass, typeArgumentsSerializers, $super) {
    typeArgumentsSerializers = typeArgumentsSerializers === VOID ? emptyList() : typeArgumentsSerializers;
    return $super === VOID ? this.q1l(kClass, typeArgumentsSerializers) : $super.q1l.call(this, kClass, typeArgumentsSerializers);
  };
  function SerialModuleImpl(class2ContextualFactory, polyBase2Serializers, polyBase2DefaultSerializerProvider, polyBase2NamedSerializers, polyBase2DefaultDeserializerProvider, hasInterfaceContextualSerializers) {
    SerializersModule.call(this);
    this.w24_1 = class2ContextualFactory;
    this.x24_1 = polyBase2Serializers;
    this.y24_1 = polyBase2DefaultSerializerProvider;
    this.z24_1 = polyBase2NamedSerializers;
    this.a25_1 = polyBase2DefaultDeserializerProvider;
    this.b25_1 = hasInterfaceContextualSerializers;
  }
  protoOf(SerialModuleImpl).o1l = function () {
    return this.b25_1;
  };
  protoOf(SerialModuleImpl).t1p = function (baseClass, value) {
    if (!baseClass.za(value))
      return null;
    var tmp0_safe_receiver = this.x24_1.f2(baseClass);
    var tmp = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.f2(getKClassFromExpression(value));
    var registered = (!(tmp == null) ? isInterface(tmp, SerializationStrategy) : false) ? tmp : null;
    if (!(registered == null))
      return registered;
    var tmp_0 = this.y24_1.f2(baseClass);
    var tmp1_safe_receiver = (!(tmp_0 == null) ? typeof tmp_0 === 'function' : false) ? tmp_0 : null;
    return tmp1_safe_receiver == null ? null : tmp1_safe_receiver(value);
  };
  protoOf(SerialModuleImpl).s1p = function (baseClass, serializedClassName) {
    var tmp0_safe_receiver = this.z24_1.f2(baseClass);
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.collections.get' call
      tmp = (isInterface(tmp0_safe_receiver, KtMap) ? tmp0_safe_receiver : THROW_CCE()).f2(serializedClassName);
    }
    var tmp_0 = tmp;
    var registered = (!(tmp_0 == null) ? isInterface(tmp_0, KSerializer) : false) ? tmp_0 : null;
    if (!(registered == null))
      return registered;
    var tmp_1 = this.a25_1.f2(baseClass);
    var tmp1_safe_receiver = (!(tmp_1 == null) ? typeof tmp_1 === 'function' : false) ? tmp_1 : null;
    return tmp1_safe_receiver == null ? null : tmp1_safe_receiver(serializedClassName);
  };
  protoOf(SerialModuleImpl).q1l = function (kClass, typeArgumentsSerializers) {
    var tmp0_safe_receiver = this.w24_1.f2(kClass);
    var tmp = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.c25(typeArgumentsSerializers);
    return (tmp == null ? true : isInterface(tmp, KSerializer)) ? tmp : null;
  };
  protoOf(SerialModuleImpl).v24 = function (collector) {
    // Inline function 'kotlin.collections.forEach' call
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s = this.w24_1.u().g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      // Inline function 'kotlin.collections.component1' call
      var kclass = element.v();
      // Inline function 'kotlin.collections.component2' call
      var serial = element.w();
      if (serial instanceof Argless) {
        var tmp = isInterface(kclass, KClass) ? kclass : THROW_CCE();
        var tmp_0 = serial.f25_1;
        collector.g25(tmp, isInterface(tmp_0, KSerializer) ? tmp_0 : THROW_CCE());
      } else {
        if (serial instanceof WithTypeArguments) {
          collector.e25(kclass, serial.d25_1);
        } else {
          noWhenBranchMatchedException();
        }
      }
    }
    // Inline function 'kotlin.collections.forEach' call
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s_0 = this.x24_1.u().g();
    while (_iterator__ex2g4s_0.h()) {
      var element_0 = _iterator__ex2g4s_0.i();
      // Inline function 'kotlin.collections.component1' call
      var baseClass = element_0.v();
      // Inline function 'kotlin.collections.component2' call
      var classMap = element_0.w();
      // Inline function 'kotlin.collections.forEach' call
      // Inline function 'kotlin.collections.iterator' call
      var _iterator__ex2g4s_1 = classMap.u().g();
      while (_iterator__ex2g4s_1.h()) {
        var element_1 = _iterator__ex2g4s_1.i();
        // Inline function 'kotlin.collections.component1' call
        var actualClass = element_1.v();
        // Inline function 'kotlin.collections.component2' call
        var serializer = element_1.w();
        var tmp_1 = isInterface(baseClass, KClass) ? baseClass : THROW_CCE();
        var tmp_2 = isInterface(actualClass, KClass) ? actualClass : THROW_CCE();
        // Inline function 'kotlinx.serialization.internal.cast' call
        var tmp$ret$11 = isInterface(serializer, KSerializer) ? serializer : THROW_CCE();
        collector.h25(tmp_1, tmp_2, tmp$ret$11);
      }
    }
    // Inline function 'kotlin.collections.forEach' call
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s_2 = this.y24_1.u().g();
    while (_iterator__ex2g4s_2.h()) {
      var element_2 = _iterator__ex2g4s_2.i();
      // Inline function 'kotlin.collections.component1' call
      var baseClass_0 = element_2.v();
      // Inline function 'kotlin.collections.component2' call
      var provider = element_2.w();
      var tmp_3 = isInterface(baseClass_0, KClass) ? baseClass_0 : THROW_CCE();
      collector.i25(tmp_3, typeof provider === 'function' ? provider : THROW_CCE());
    }
    // Inline function 'kotlin.collections.forEach' call
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s_3 = this.a25_1.u().g();
    while (_iterator__ex2g4s_3.h()) {
      var element_3 = _iterator__ex2g4s_3.i();
      // Inline function 'kotlin.collections.component1' call
      var baseClass_1 = element_3.v();
      // Inline function 'kotlin.collections.component2' call
      var provider_0 = element_3.w();
      var tmp_4 = isInterface(baseClass_1, KClass) ? baseClass_1 : THROW_CCE();
      collector.j25(tmp_4, typeof provider_0 === 'function' ? provider_0 : THROW_CCE());
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
    this.k25_1 = serializer;
  }
  protoOf(SerializableWith).equals = function (other) {
    if (!(other instanceof SerializableWith))
      return false;
    var tmp0_other_with_cast = other instanceof SerializableWith ? other : THROW_CCE();
    if (!this.k25_1.equals(tmp0_other_with_cast.k25_1))
      return false;
    return true;
  };
  protoOf(SerializableWith).hashCode = function () {
    return imul(getStringHashCode('serializer'), 127) ^ this.k25_1.hashCode();
  };
  protoOf(SerializableWith).toString = function () {
    return '@kotlinx.serialization.SerializableWith(' + 'serializer=' + toString(this.k25_1) + ')';
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
    return mapOf([to(PrimitiveClasses_getInstance().ec(), serializer_0(StringCompanionObject_instance)), to(getKClass(Char), serializer_1(Companion_getInstance_1())), to(PrimitiveClasses_getInstance().hc(), CharArraySerializer()), to(PrimitiveClasses_getInstance().cc(), serializer_2(DoubleCompanionObject_instance)), to(PrimitiveClasses_getInstance().nc(), DoubleArraySerializer()), to(PrimitiveClasses_getInstance().bc(), serializer_3(FloatCompanionObject_instance)), to(PrimitiveClasses_getInstance().mc(), FloatArraySerializer()), to(getKClass(Long), serializer_4(Companion_getInstance_2())), to(PrimitiveClasses_getInstance().lc(), LongArraySerializer()), to(getKClass(ULong), serializer_5(Companion_getInstance_3())), to(getKClass(ULongArray), ULongArraySerializer()), to(PrimitiveClasses_getInstance().ac(), serializer_6(IntCompanionObject_instance)), to(PrimitiveClasses_getInstance().kc(), IntArraySerializer()), to(getKClass(UInt), serializer_7(Companion_getInstance_4())), to(getKClass(UIntArray), UIntArraySerializer()), to(PrimitiveClasses_getInstance().zb(), serializer_8(ShortCompanionObject_instance)), to(PrimitiveClasses_getInstance().jc(), ShortArraySerializer()), to(getKClass(UShort), serializer_9(Companion_getInstance_5())), to(getKClass(UShortArray), UShortArraySerializer()), to(PrimitiveClasses_getInstance().yb(), serializer_10(ByteCompanionObject_instance)), to(PrimitiveClasses_getInstance().ic(), ByteArraySerializer()), to(getKClass(UByte), serializer_11(Companion_getInstance_6())), to(getKClass(UByteArray), UByteArraySerializer()), to(PrimitiveClasses_getInstance().xb(), serializer_12(BooleanCompanionObject_instance)), to(PrimitiveClasses_getInstance().gc(), BooleanArraySerializer()), to(getKClass(Unit), serializer_13(Unit_instance)), to(PrimitiveClasses_getInstance().wb(), NothingSerializer()), to(getKClass(Duration), serializer_14(Companion_getInstance())), to(getKClass(Uuid), serializer_15(Companion_getInstance_0()))]);
  }
  function get_isInterface(_this__u8e3s4) {
    if (_this__u8e3s4 === PrimitiveClasses_getInstance().wb())
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
      if (_this__u8e3s4 === PrimitiveClasses_getInstance().wb()) {
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
    return rootClass.equals(PrimitiveClasses_getInstance().dc());
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
          var tmp_1 = assocObject.k1w(args.slice());
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
    this.l25_1 = $factory;
  }
  protoOf(createCache$1).r1l = function (key) {
    return this.l25_1(key);
  };
  function createParametrizedCache$1($factory) {
    this.m25_1 = $factory;
  }
  protoOf(createParametrizedCache$1).s1l = function (key, types) {
    // Inline function 'kotlin.runCatching' call
    var tmp;
    try {
      // Inline function 'kotlin.Companion.success' call
      var value = this.m25_1(key, types);
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
  protoOf(SerialDescriptorImpl).t1l = get_isNullable;
  protoOf(SerialDescriptorImpl).z1l = get_isInline;
  protoOf(AbstractDecoder).h1o = decodeSerializableElement$default;
  protoOf(AbstractDecoder).t1n = decodeSerializableValue;
  protoOf(AbstractDecoder).k1o = decodeSequentially;
  protoOf(AbstractDecoder).m1o = decodeCollectionSize;
  protoOf(AbstractEncoder).p1p = encodeNotNullMark;
  protoOf(AbstractEncoder).q1p = beginCollection;
  protoOf(AbstractEncoder).m1p = encodeSerializableValue;
  protoOf(AbstractEncoder).o1p = encodeNullableSerializableValue;
  protoOf(AbstractEncoder).r1p = shouldEncodeElementDefault;
  protoOf(ListLikeDescriptor).t1l = get_isNullable;
  protoOf(ListLikeDescriptor).z1l = get_isInline;
  protoOf(ListLikeDescriptor).b1m = get_annotations;
  protoOf(MapLikeDescriptor).t1l = get_isNullable;
  protoOf(MapLikeDescriptor).z1l = get_isInline;
  protoOf(MapLikeDescriptor).b1m = get_annotations;
  protoOf(PluginGeneratedSerialDescriptor).t1l = get_isNullable;
  protoOf(PluginGeneratedSerialDescriptor).z1l = get_isInline;
  protoOf(InlinePrimitiveDescriptor$1).a1w = typeParametersSerializers;
  protoOf(NothingSerialDescriptor).t1l = get_isNullable;
  protoOf(NothingSerialDescriptor).z1l = get_isInline;
  protoOf(NothingSerialDescriptor).b1m = get_annotations;
  protoOf(PrimitiveSerialDescriptor_0).t1l = get_isNullable;
  protoOf(PrimitiveSerialDescriptor_0).z1l = get_isInline;
  protoOf(PrimitiveSerialDescriptor_0).b1m = get_annotations;
  protoOf(TaggedEncoder).q1p = beginCollection;
  protoOf(TaggedEncoder).m1p = encodeSerializableValue;
  protoOf(TaggedEncoder).o1p = encodeNullableSerializableValue;
  protoOf(TaggedEncoder).r1p = shouldEncodeElementDefault;
  protoOf(TaggedDecoder).h1o = decodeSerializableElement$default;
  protoOf(TaggedDecoder).t1n = decodeSerializableValue;
  protoOf(TaggedDecoder).k1o = decodeSequentially;
  protoOf(TaggedDecoder).m1o = decodeCollectionSize;
  //endregion
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = SerializationException_init_$Init$_0;
  _.$_$.b = SerializationException_init_$Create$_0;
  _.$_$.c = UnknownFieldException_init_$Create$;
  _.$_$.d = SEALED_getInstance;
  _.$_$.e = STRING_getInstance;
  _.$_$.f = CONTEXTUAL_getInstance;
  _.$_$.g = ENUM_getInstance;
  _.$_$.h = CLASS_getInstance;
  _.$_$.i = LIST_getInstance;
  _.$_$.j = MAP_getInstance;
  _.$_$.k = OBJECT_getInstance;
  _.$_$.l = BooleanSerializer_getInstance;
  _.$_$.m = DoubleSerializer_getInstance;
  _.$_$.n = FloatSerializer_getInstance;
  _.$_$.o = IntSerializer_getInstance;
  _.$_$.p = LongSerializer_getInstance;
  _.$_$.q = StringSerializer_getInstance;
  _.$_$.r = ListSerializer;
  _.$_$.s = MapSerializer;
  _.$_$.t = get_nullable;
  _.$_$.u = serializer_0;
  _.$_$.v = serializer_9;
  _.$_$.w = serializer_7;
  _.$_$.x = serializer_11;
  _.$_$.y = serializer_5;
  _.$_$.z = PolymorphicKind;
  _.$_$.a1 = PrimitiveKind;
  _.$_$.b1 = PrimitiveSerialDescriptor;
  _.$_$.c1 = get_annotations;
  _.$_$.d1 = get_isInline;
  _.$_$.e1 = get_isNullable;
  _.$_$.f1 = SerialDescriptor;
  _.$_$.g1 = ENUM;
  _.$_$.h1 = buildSerialDescriptor;
  _.$_$.i1 = getContextualDescriptor;
  _.$_$.j1 = AbstractDecoder;
  _.$_$.k1 = AbstractEncoder;
  _.$_$.l1 = CompositeDecoder;
  _.$_$.m1 = CompositeEncoder;
  _.$_$.n1 = Decoder;
  _.$_$.o1 = Encoder;
  _.$_$.p1 = AbstractPolymorphicSerializer;
  _.$_$.q1 = ArrayListSerializer;
  _.$_$.r1 = ElementMarker;
  _.$_$.s1 = typeParametersSerializers;
  _.$_$.t1 = GeneratedSerializer;
  _.$_$.u1 = InlinePrimitiveDescriptor;
  _.$_$.v1 = LinkedHashMapSerializer;
  _.$_$.w1 = NamedValueDecoder;
  _.$_$.x1 = NamedValueEncoder;
  _.$_$.y1 = PluginGeneratedSerialDescriptor;
  _.$_$.z1 = SerializerFactory;
  _.$_$.a2 = createAnnotatedEnumSerializer;
  _.$_$.b2 = createSimpleEnumSerializer;
  _.$_$.c2 = jsonCachedSerialNames;
  _.$_$.d2 = throwArrayMissingFieldException;
  _.$_$.e2 = throwMissingFieldException;
  _.$_$.f2 = EmptySerializersModule_0;
  _.$_$.g2 = contextual;
  _.$_$.h2 = SerializersModuleCollector;
  _.$_$.i2 = DeserializationStrategy;
  _.$_$.j2 = KSerializer;
  _.$_$.k2 = MissingFieldException;
  _.$_$.l2 = SealedClassSerializer;
  _.$_$.m2 = SerializationException;
  _.$_$.n2 = SerializationStrategy;
  _.$_$.o2 = findPolymorphicSerializer_0;
  _.$_$.p2 = findPolymorphicSerializer;
  _.$_$.q2 = serializer;
  //endregion
  return _;
}));

//# sourceMappingURL=kotlinx-serialization-kotlinx-serialization-core.js.map
