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
  var protoOf = kotlin_kotlin.$_$.ic;
  var initMetadataForInterface = kotlin_kotlin.$_$.ib;
  var VOID = kotlin_kotlin.$_$.i;
  var StringCompanionObject_instance = kotlin_kotlin.$_$.v4;
  var Unit_instance = kotlin_kotlin.$_$.i5;
  var emptyList = kotlin_kotlin.$_$.w6;
  var LazyThreadSafetyMode_PUBLICATION_getInstance = kotlin_kotlin.$_$.m;
  var lazy = kotlin_kotlin.$_$.sh;
  var toString = kotlin_kotlin.$_$.mc;
  var initMetadataForClass = kotlin_kotlin.$_$.eb;
  var getKClassFromExpression = kotlin_kotlin.$_$.f;
  var KProperty1 = kotlin_kotlin.$_$.hd;
  var getPropertyCallableRef = kotlin_kotlin.$_$.bb;
  var asList = kotlin_kotlin.$_$.y5;
  var objectCreate = kotlin_kotlin.$_$.hc;
  var THROW_CCE = kotlin_kotlin.$_$.vg;
  var IllegalArgumentException_init_$Create$ = kotlin_kotlin.$_$.w1;
  var zip = kotlin_kotlin.$_$.n9;
  var toMap = kotlin_kotlin.$_$.g9;
  var LinkedHashMap_init_$Create$ = kotlin_kotlin.$_$.z;
  var IllegalStateException_init_$Create$ = kotlin_kotlin.$_$.a2;
  var mapCapacity = kotlin_kotlin.$_$.w7;
  var LinkedHashMap_init_$Create$_0 = kotlin_kotlin.$_$.y;
  var KtMap = kotlin_kotlin.$_$.r5;
  var isInterface = kotlin_kotlin.$_$.tb;
  var IllegalArgumentException_init_$Init$ = kotlin_kotlin.$_$.t1;
  var captureStack = kotlin_kotlin.$_$.pa;
  var IllegalArgumentException_init_$Init$_0 = kotlin_kotlin.$_$.v1;
  var IllegalArgumentException_init_$Init$_1 = kotlin_kotlin.$_$.x1;
  var IllegalArgumentException = kotlin_kotlin.$_$.og;
  var listOf = kotlin_kotlin.$_$.u7;
  var collectionSizeOrDefault = kotlin_kotlin.$_$.e6;
  var ArrayList_init_$Create$ = kotlin_kotlin.$_$.p;
  var KClass = kotlin_kotlin.$_$.dd;
  var Triple = kotlin_kotlin.$_$.xg;
  var getKClass = kotlin_kotlin.$_$.g;
  var Pair = kotlin_kotlin.$_$.sg;
  var Entry = kotlin_kotlin.$_$.q5;
  var KtMutableMap = kotlin_kotlin.$_$.t5;
  var LinkedHashMap = kotlin_kotlin.$_$.n5;
  var HashMap = kotlin_kotlin.$_$.l5;
  var KtSet = kotlin_kotlin.$_$.v5;
  var KtMutableSet = kotlin_kotlin.$_$.u5;
  var LinkedHashSet = kotlin_kotlin.$_$.o5;
  var HashSet = kotlin_kotlin.$_$.m5;
  var Collection = kotlin_kotlin.$_$.k5;
  var KtList = kotlin_kotlin.$_$.p5;
  var KtMutableList = kotlin_kotlin.$_$.s5;
  var ArrayList = kotlin_kotlin.$_$.j5;
  var copyToArray = kotlin_kotlin.$_$.s6;
  var _Result___get_value__impl__bjfvqg = kotlin_kotlin.$_$.c3;
  var _Result___get_isFailure__impl__jpiriv = kotlin_kotlin.$_$.a3;
  var Result = kotlin_kotlin.$_$.tg;
  var ensureNotNull = kotlin_kotlin.$_$.nh;
  var equals = kotlin_kotlin.$_$.xa;
  var getStringHashCode = kotlin_kotlin.$_$.cb;
  var isBlank = kotlin_kotlin.$_$.de;
  var toList = kotlin_kotlin.$_$.e9;
  var ArrayList_init_$Create$_0 = kotlin_kotlin.$_$.q;
  var HashSet_init_$Create$ = kotlin_kotlin.$_$.w;
  var toHashSet = kotlin_kotlin.$_$.b9;
  var toBooleanArray = kotlin_kotlin.$_$.a9;
  var withIndex = kotlin_kotlin.$_$.l9;
  var to = kotlin_kotlin.$_$.bi;
  var lazy_0 = kotlin_kotlin.$_$.th;
  var contentEquals = kotlin_kotlin.$_$.g6;
  var until = kotlin_kotlin.$_$.cd;
  var joinToString = kotlin_kotlin.$_$.l7;
  var initMetadataForObject = kotlin_kotlin.$_$.kb;
  var Long = kotlin_kotlin.$_$.qg;
  var Char = kotlin_kotlin.$_$.gg;
  var Duration__toIsoString_impl_9h6wsm = kotlin_kotlin.$_$.p2;
  var Duration = kotlin_kotlin.$_$.dg;
  var Companion_getInstance = kotlin_kotlin.$_$.z4;
  var Uuid = kotlin_kotlin.$_$.eg;
  var Companion_getInstance_0 = kotlin_kotlin.$_$.a5;
  var toIntOrNull = kotlin_kotlin.$_$.jf;
  var hashCode = kotlin_kotlin.$_$.db;
  var ArrayList_init_$Create$_1 = kotlin_kotlin.$_$.r;
  var HashSet_init_$Create$_0 = kotlin_kotlin.$_$.x;
  var LinkedHashSet_init_$Create$ = kotlin_kotlin.$_$.b1;
  var LinkedHashSet_init_$Create$_0 = kotlin_kotlin.$_$.c1;
  var HashMap_init_$Create$ = kotlin_kotlin.$_$.t;
  var HashMap_init_$Create$_0 = kotlin_kotlin.$_$.u;
  var LinkedHashMap_init_$Create$_1 = kotlin_kotlin.$_$.a1;
  var isArray = kotlin_kotlin.$_$.lb;
  var arrayIterator = kotlin_kotlin.$_$.na;
  var step = kotlin_kotlin.$_$.bd;
  var getValue = kotlin_kotlin.$_$.g7;
  var longArray = kotlin_kotlin.$_$.ac;
  var initMetadataForCompanion = kotlin_kotlin.$_$.fb;
  var get_lastIndex = kotlin_kotlin.$_$.n7;
  var countTrailingZeroBits = kotlin_kotlin.$_$.lh;
  var getOrNull = kotlin_kotlin.$_$.e7;
  var indexOf = kotlin_kotlin.$_$.h7;
  var contentToString = kotlin_kotlin.$_$.i6;
  var Enum = kotlin_kotlin.$_$.lg;
  var HashSet_init_$Create$_1 = kotlin_kotlin.$_$.v;
  var toString_0 = kotlin_kotlin.$_$.ai;
  var KTypeParameter = kotlin_kotlin.$_$.id;
  var contentHashCode = kotlin_kotlin.$_$.h6;
  var booleanArray = kotlin_kotlin.$_$.oa;
  var emptyMap = kotlin_kotlin.$_$.x6;
  var Companion_getInstance_1 = kotlin_kotlin.$_$.b5;
  var isCharArray = kotlin_kotlin.$_$.ob;
  var charArray = kotlin_kotlin.$_$.ra;
  var DoubleCompanionObject_instance = kotlin_kotlin.$_$.r4;
  var isDoubleArray = kotlin_kotlin.$_$.qb;
  var FloatCompanionObject_instance = kotlin_kotlin.$_$.s4;
  var isFloatArray = kotlin_kotlin.$_$.rb;
  var Companion_getInstance_2 = kotlin_kotlin.$_$.c5;
  var isLongArray = kotlin_kotlin.$_$.ub;
  var Companion_getInstance_3 = kotlin_kotlin.$_$.g5;
  var _ULongArray___get_size__impl__ju6dtr = kotlin_kotlin.$_$.c4;
  var ULongArray = kotlin_kotlin.$_$.ch;
  var _ULongArray___init__impl__twm1l3 = kotlin_kotlin.$_$.y3;
  var _ULong___init__impl__c78o9k = kotlin_kotlin.$_$.v3;
  var ULongArray__get_impl_pr71q9 = kotlin_kotlin.$_$.a4;
  var _ULong___get_data__impl__fggpzb = kotlin_kotlin.$_$.w3;
  var IntCompanionObject_instance = kotlin_kotlin.$_$.t4;
  var isIntArray = kotlin_kotlin.$_$.sb;
  var Companion_getInstance_4 = kotlin_kotlin.$_$.f5;
  var _UIntArray___get_size__impl__r6l8ci = kotlin_kotlin.$_$.t3;
  var UIntArray = kotlin_kotlin.$_$.ah;
  var _UIntArray___init__impl__ghjpc6 = kotlin_kotlin.$_$.p3;
  var _UInt___init__impl__l7qpdl = kotlin_kotlin.$_$.m3;
  var UIntArray__get_impl_gp5kza = kotlin_kotlin.$_$.r3;
  var _UInt___get_data__impl__f0vqqw = kotlin_kotlin.$_$.n3;
  var ShortCompanionObject_instance = kotlin_kotlin.$_$.u4;
  var isShortArray = kotlin_kotlin.$_$.wb;
  var Companion_getInstance_5 = kotlin_kotlin.$_$.h5;
  var _UShortArray___get_size__impl__jqto1b = kotlin_kotlin.$_$.l4;
  var UShortArray = kotlin_kotlin.$_$.eh;
  var _UShortArray___init__impl__9b26ef = kotlin_kotlin.$_$.h4;
  var _UShort___init__impl__jigrne = kotlin_kotlin.$_$.e4;
  var UShortArray__get_impl_fnbhmx = kotlin_kotlin.$_$.j4;
  var _UShort___get_data__impl__g0245 = kotlin_kotlin.$_$.f4;
  var ByteCompanionObject_instance = kotlin_kotlin.$_$.q4;
  var isByteArray = kotlin_kotlin.$_$.nb;
  var Companion_getInstance_6 = kotlin_kotlin.$_$.e5;
  var _UByteArray___get_size__impl__h6pkdv = kotlin_kotlin.$_$.k3;
  var UByteArray = kotlin_kotlin.$_$.yg;
  var _UByteArray___init__impl__ip4y9n = kotlin_kotlin.$_$.h3;
  var _UByte___init__impl__g9hnc4 = kotlin_kotlin.$_$.d3;
  var UByteArray__get_impl_t5f3hv = kotlin_kotlin.$_$.i3;
  var _UByte___get_data__impl__jof9qr = kotlin_kotlin.$_$.e3;
  var BooleanCompanionObject_instance = kotlin_kotlin.$_$.p4;
  var isBooleanArray = kotlin_kotlin.$_$.mb;
  var coerceAtLeast = kotlin_kotlin.$_$.sc;
  var copyOf = kotlin_kotlin.$_$.m6;
  var copyOf_0 = kotlin_kotlin.$_$.o6;
  var copyOf_1 = kotlin_kotlin.$_$.p6;
  var copyOf_2 = kotlin_kotlin.$_$.k6;
  var _ULongArray___get_storage__impl__28e64j = kotlin_kotlin.$_$.d4;
  var _ULongArray___init__impl__twm1l3_0 = kotlin_kotlin.$_$.z3;
  var ULongArray__set_impl_z19mvh = kotlin_kotlin.$_$.b4;
  var copyOf_3 = kotlin_kotlin.$_$.r6;
  var _UIntArray___get_storage__impl__92a0v0 = kotlin_kotlin.$_$.u3;
  var _UIntArray___init__impl__ghjpc6_0 = kotlin_kotlin.$_$.q3;
  var UIntArray__set_impl_7f2zu2 = kotlin_kotlin.$_$.s3;
  var copyOf_4 = kotlin_kotlin.$_$.j6;
  var _UShortArray___get_storage__impl__t2jpv5 = kotlin_kotlin.$_$.m4;
  var _UShortArray___init__impl__9b26ef_0 = kotlin_kotlin.$_$.i4;
  var UShortArray__set_impl_6d8whp = kotlin_kotlin.$_$.k4;
  var copyOf_5 = kotlin_kotlin.$_$.n6;
  var _UByteArray___get_storage__impl__d4kctt = kotlin_kotlin.$_$.l3;
  var _UByteArray___init__impl__ip4y9n_0 = kotlin_kotlin.$_$.g3;
  var UByteArray__set_impl_jvcicn = kotlin_kotlin.$_$.j3;
  var copyOf_6 = kotlin_kotlin.$_$.l6;
  var Unit = kotlin_kotlin.$_$.gh;
  var trimIndent = kotlin_kotlin.$_$.xf;
  var charSequenceLength = kotlin_kotlin.$_$.ta;
  var last = kotlin_kotlin.$_$.q7;
  var lastOrNull = kotlin_kotlin.$_$.p7;
  var get_lastIndex_0 = kotlin_kotlin.$_$.o7;
  var ULong = kotlin_kotlin.$_$.dh;
  var UInt = kotlin_kotlin.$_$.bh;
  var UShort = kotlin_kotlin.$_$.fh;
  var UByte = kotlin_kotlin.$_$.zg;
  var noWhenBranchMatchedException = kotlin_kotlin.$_$.uh;
  var PrimitiveClasses_getInstance = kotlin_kotlin.$_$.x4;
  var mapOf = kotlin_kotlin.$_$.y7;
  var get_js = kotlin_kotlin.$_$.yb;
  var findAssociatedObject = kotlin_kotlin.$_$.e;
  var get_indices = kotlin_kotlin.$_$.j7;
  var IndexOutOfBoundsException_init_$Create$ = kotlin_kotlin.$_$.d2;
  var get_indices_0 = kotlin_kotlin.$_$.i7;
  var Companion_instance = kotlin_kotlin.$_$.d5;
  var _Result___init__impl__xyqfz8 = kotlin_kotlin.$_$.y2;
  var createFailure = kotlin_kotlin.$_$.mh;
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
    return deserializer.f1q(this);
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
    return $super === VOID ? this.y1t(descriptor, index, deserializer, previousValue) : $super.y1t.call(this, descriptor, index, deserializer, previousValue);
  }
  initMetadataForInterface(CompositeDecoder, 'CompositeDecoder');
  initMetadataForClass(AbstractDecoder, 'AbstractDecoder', VOID, VOID, [Decoder, CompositeDecoder]);
  function encodeNotNullMark() {
  }
  function beginCollection(descriptor, collectionSize) {
    return this.m1t(descriptor);
  }
  function encodeSerializableValue(serializer, value) {
    serializer.e1q(this, value);
  }
  function encodeNullableSerializableValue(serializer, value) {
    var isNullabilitySupported = serializer.d1q().m1r();
    if (isNullabilitySupported) {
      return this.e1v(isInterface(serializer, SerializationStrategy) ? serializer : THROW_CCE(), value);
    }
    if (value == null) {
      this.h1u();
    } else {
      this.h1v();
      this.e1v(serializer, value);
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
    return this.w2a(kClass, SerializersModuleCollector$contextual$lambda(serializer));
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
      $this$buildSerialDescriptor.o1q('type', serializer_1(StringCompanionObject_instance).d1q());
      $this$buildSerialDescriptor.o1q('value', buildSerialDescriptor('kotlinx.serialization.Polymorphic<' + this$0.p1q_1.za() + '>', CONTEXTUAL_getInstance(), []));
      $this$buildSerialDescriptor.i1q_1 = this$0.q1q_1;
      return Unit_instance;
    };
  }
  function PolymorphicSerializer$descriptor$delegate$lambda(this$0) {
    return function () {
      var tmp = OPEN_getInstance();
      return withContext(buildSerialDescriptor('kotlinx.serialization.Polymorphic', tmp, [], PolymorphicSerializer$descriptor$delegate$lambda$lambda(this$0)), this$0.p1q_1);
    };
  }
  function PolymorphicSerializer(baseClass) {
    AbstractPolymorphicSerializer.call(this);
    this.p1q_1 = baseClass;
    this.q1q_1 = emptyList();
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp.r1q_1 = lazy(tmp_0, PolymorphicSerializer$descriptor$delegate$lambda(this));
  }
  protoOf(PolymorphicSerializer).s1q = function () {
    return this.p1q_1;
  };
  protoOf(PolymorphicSerializer).d1q = function () {
    var tmp0 = this.r1q_1;
    // Inline function 'kotlin.getValue' call
    descriptor$factory();
    return tmp0.w();
  };
  protoOf(PolymorphicSerializer).toString = function () {
    return 'kotlinx.serialization.PolymorphicSerializer(baseClass: ' + toString(this.p1q_1) + ')';
  };
  function findPolymorphicSerializer(_this__u8e3s4, encoder, value) {
    var tmp0_elvis_lhs = _this__u8e3s4.v1q(encoder, value);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throwSubtypeNotRegistered(getKClassFromExpression(value), _this__u8e3s4.s1q());
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function findPolymorphicSerializer_0(_this__u8e3s4, decoder, klassName) {
    var tmp0_elvis_lhs = _this__u8e3s4.u1q(decoder, klassName);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throwSubtypeNotRegistered_0(klassName, _this__u8e3s4.s1q());
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function descriptor$factory() {
    return getPropertyCallableRef('descriptor', 1, KProperty1, function (receiver) {
      return receiver.d1q();
    }, null);
  }
  function SealedClassSerializer_init_$Init$(serialName, baseClass, subclasses, subclassSerializers, classAnnotations, $this) {
    SealedClassSerializer.call($this, serialName, baseClass, subclasses, subclassSerializers);
    $this.x1q_1 = asList(classAnnotations);
    return $this;
  }
  function SealedClassSerializer_init_$Create$(serialName, baseClass, subclasses, subclassSerializers, classAnnotations) {
    return SealedClassSerializer_init_$Init$(serialName, baseClass, subclasses, subclassSerializers, classAnnotations, objectCreate(protoOf(SealedClassSerializer)));
  }
  function SealedClassSerializer$descriptor$delegate$lambda$lambda$lambda(this$0) {
    return function ($this$buildSerialDescriptor) {
      // Inline function 'kotlin.collections.forEach' call
      // Inline function 'kotlin.collections.iterator' call
      var _iterator__ex2g4s = this$0.a1r_1.u().j();
      while (_iterator__ex2g4s.k()) {
        var element = _iterator__ex2g4s.l();
        // Inline function 'kotlin.collections.component1' call
        var name = element.v();
        // Inline function 'kotlin.collections.component2' call
        var serializer = element.w();
        $this$buildSerialDescriptor.o1q(name, serializer.d1q());
      }
      return Unit_instance;
    };
  }
  function SealedClassSerializer$descriptor$delegate$lambda$lambda(this$0) {
    return function ($this$buildSerialDescriptor) {
      $this$buildSerialDescriptor.o1q('type', serializer_1(StringCompanionObject_instance).d1q());
      var tmp = 'kotlinx.serialization.Sealed<' + this$0.w1q_1.za() + '>';
      var tmp_0 = CONTEXTUAL_getInstance();
      var elementDescriptor = buildSerialDescriptor(tmp, tmp_0, [], SealedClassSerializer$descriptor$delegate$lambda$lambda$lambda(this$0));
      $this$buildSerialDescriptor.o1q('value', elementDescriptor);
      $this$buildSerialDescriptor.i1q_1 = this$0.x1q_1;
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
    this.b1r_1 = $this;
  }
  protoOf(SealedClassSerializer$$inlined$groupingBy$1).c1r = function () {
    return this.b1r_1.j();
  };
  protoOf(SealedClassSerializer$$inlined$groupingBy$1).d1r = function (element) {
    return element.w().d1q().e1r();
  };
  protoOf(SealedClassSerializer$$inlined$groupingBy$1).f1r = function (element) {
    return this.d1r((element == null ? true : !(element == null)) ? element : THROW_CCE());
  };
  function SealedClassSerializer(serialName, baseClass, subclasses, subclassSerializers) {
    AbstractPolymorphicSerializer.call(this);
    this.w1q_1 = baseClass;
    this.x1q_1 = emptyList();
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp.y1q_1 = lazy(tmp_0, SealedClassSerializer$descriptor$delegate$lambda(serialName, this));
    if (!(subclasses.length === subclassSerializers.length)) {
      throw IllegalArgumentException_init_$Create$('All subclasses of sealed class ' + this.w1q_1.za() + ' should be marked @Serializable');
    }
    this.z1q_1 = toMap(zip(subclasses, subclassSerializers));
    var tmp_1 = this;
    // Inline function 'kotlin.collections.groupingBy' call
    var this_0 = this.z1q_1.u();
    // Inline function 'kotlin.collections.aggregate' call
    var tmp0 = new SealedClassSerializer$$inlined$groupingBy$1(this_0);
    // Inline function 'kotlin.collections.mutableMapOf' call
    // Inline function 'kotlin.collections.aggregateTo' call
    var destination = LinkedHashMap_init_$Create$();
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s = tmp0.c1r();
    while (_iterator__ex2g4s.k()) {
      var e = _iterator__ex2g4s.l();
      var key = tmp0.f1r(e);
      var accumulator = destination.j2(key);
      accumulator == null && !destination.h2(key);
      if (!(accumulator == null)) {
        // Inline function 'kotlin.error' call
        var message = "Multiple sealed subclasses of '" + toString(this.w1q_1) + "' have the same serial name '" + key + "':" + (" '" + toString(accumulator.v()) + "', '" + toString(e.v()) + "'");
        throw IllegalStateException_init_$Create$(toString(message));
      }
      // Inline function 'kotlin.collections.set' call
      destination.m2(key, e);
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
      destination_0.m2(tmp_2, tmp$ret$8);
    }
    tmp_1.a1r_1 = destination_0;
  }
  protoOf(SealedClassSerializer).s1q = function () {
    return this.w1q_1;
  };
  protoOf(SealedClassSerializer).d1q = function () {
    var tmp0 = this.y1q_1;
    // Inline function 'kotlin.getValue' call
    descriptor$factory_0();
    return tmp0.w();
  };
  protoOf(SealedClassSerializer).u1q = function (decoder, klassName) {
    // Inline function 'kotlin.collections.get' call
    var this_0 = this.a1r_1;
    var tmp0_elvis_lhs = (isInterface(this_0, KtMap) ? this_0 : THROW_CCE()).j2(klassName);
    return tmp0_elvis_lhs == null ? protoOf(AbstractPolymorphicSerializer).u1q.call(this, decoder, klassName) : tmp0_elvis_lhs;
  };
  protoOf(SealedClassSerializer).v1q = function (encoder, value) {
    var tmp0_elvis_lhs = this.z1q_1.j2(getKClassFromExpression(value));
    var tmp1_safe_receiver = tmp0_elvis_lhs == null ? protoOf(AbstractPolymorphicSerializer).v1q.call(this, encoder, value) : tmp0_elvis_lhs;
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
      return receiver.d1q();
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
    this.g1r_1 = missingFields;
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
      if (isInterface_0(rootClass) && !(_this__u8e3s4.i1r(rootClass) == null)) {
        tmp_0 = null;
      } else {
        tmp_0 = findCachedSerializer(rootClass, isNullable);
      }
      tmp = tmp_0;
    } else {
      var tmp_1;
      if (_this__u8e3s4.h1r()) {
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
      var tmp1_elvis_lhs = tmp0_elvis_lhs == null ? _this__u8e3s4.i1r(rootClass) : tmp0_elvis_lhs;
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
      var tmp4_elvis_lhs = tmp3_elvis_lhs == null ? _this__u8e3s4.j1r(rootClass, serializers) : tmp3_elvis_lhs;
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
      var tmp0_safe_receiver = get_SERIALIZERS_CACHE().k1r(clazz);
      var tmp_0;
      if (tmp0_safe_receiver == null) {
        tmp_0 = null;
      } else {
        // Inline function 'kotlinx.serialization.internal.cast' call
        tmp_0 = isInterface(tmp0_safe_receiver, KSerializer) ? tmp0_safe_receiver : THROW_CCE();
      }
      tmp = tmp_0;
    } else {
      tmp = get_SERIALIZERS_CACHE_NULLABLE().k1r(clazz);
    }
    return tmp;
  }
  function findParametrizedCachedSerializer(clazz, types, isNullable) {
    _init_properties_SerializersCache_kt__hgwi2p();
    var tmp;
    if (!isNullable) {
      var tmp_0 = get_PARAMETRIZED_SERIALIZERS_CACHE().l1r(clazz, types);
      tmp = new Result(tmp_0) instanceof Result ? tmp_0 : THROW_CCE();
    } else {
      tmp = get_PARAMETRIZED_SERIALIZERS_CACHE_NULLABLE().l1r(clazz, types);
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
    if (_this__u8e3s4.d1q().m1r()) {
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
    this.n1r_1 = original;
    this.o1r_1 = kClass;
    this.p1r_1 = this.n1r_1.e1r() + '<' + this.o1r_1.za() + '>';
  }
  protoOf(ContextDescriptor).e1r = function () {
    return this.p1r_1;
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
    return equals(this.n1r_1, another.n1r_1) && another.o1r_1.equals(this.o1r_1);
  };
  protoOf(ContextDescriptor).hashCode = function () {
    var result = this.o1r_1.hashCode();
    result = imul(31, result) + getStringHashCode(this.p1r_1) | 0;
    return result;
  };
  protoOf(ContextDescriptor).toString = function () {
    return 'ContextDescriptor(kClass: ' + toString(this.o1r_1) + ', original: ' + toString(this.n1r_1) + ')';
  };
  protoOf(ContextDescriptor).q1r = function () {
    return this.n1r_1.q1r();
  };
  protoOf(ContextDescriptor).m1r = function () {
    return this.n1r_1.m1r();
  };
  protoOf(ContextDescriptor).r1r = function () {
    return this.n1r_1.r1r();
  };
  protoOf(ContextDescriptor).s1r = function () {
    return this.n1r_1.s1r();
  };
  protoOf(ContextDescriptor).t1r = function () {
    return this.n1r_1.t1r();
  };
  protoOf(ContextDescriptor).u1r = function (index) {
    return this.n1r_1.u1r(index);
  };
  protoOf(ContextDescriptor).v1r = function (name) {
    return this.n1r_1.v1r(name);
  };
  protoOf(ContextDescriptor).w1r = function (index) {
    return this.n1r_1.w1r(index);
  };
  protoOf(ContextDescriptor).x1r = function (index) {
    return this.n1r_1.x1r(index);
  };
  protoOf(ContextDescriptor).y1r = function (index) {
    return this.n1r_1.y1r(index);
  };
  function getContextualDescriptor(_this__u8e3s4, descriptor) {
    var tmp0_safe_receiver = get_capturedKClass(descriptor);
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      var tmp0_safe_receiver_0 = _this__u8e3s4.i1r(tmp0_safe_receiver);
      tmp = tmp0_safe_receiver_0 == null ? null : tmp0_safe_receiver_0.d1q();
    }
    return tmp;
  }
  function get_capturedKClass(_this__u8e3s4) {
    var tmp;
    if (_this__u8e3s4 instanceof ContextDescriptor) {
      tmp = _this__u8e3s4.o1r_1;
    } else {
      if (_this__u8e3s4 instanceof SerialDescriptorForNullable) {
        tmp = get_capturedKClass(_this__u8e3s4.z1r_1);
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
    this.d1s_1 = $this_elementDescriptors;
    this.c1s_1 = $this_elementDescriptors.s1r();
  }
  protoOf(elementDescriptors$1).k = function () {
    return this.c1s_1 > 0;
  };
  protoOf(elementDescriptors$1).l = function () {
    var tmp = this.d1s_1.s1r();
    var _unary__edvuaz = this.c1s_1;
    this.c1s_1 = _unary__edvuaz - 1 | 0;
    return this.d1s_1.x1r(tmp - _unary__edvuaz | 0);
  };
  function elementDescriptors$$inlined$Iterable$1($this_elementDescriptors) {
    this.e1s_1 = $this_elementDescriptors;
  }
  protoOf(elementDescriptors$$inlined$Iterable$1).j = function () {
    return new elementDescriptors$1(this.e1s_1);
  };
  function elementNames$1($this_elementNames) {
    this.g1s_1 = $this_elementNames;
    this.f1s_1 = $this_elementNames.s1r();
  }
  protoOf(elementNames$1).k = function () {
    return this.f1s_1 > 0;
  };
  protoOf(elementNames$1).l = function () {
    var tmp = this.g1s_1.s1r();
    var _unary__edvuaz = this.f1s_1;
    this.f1s_1 = _unary__edvuaz - 1 | 0;
    return this.g1s_1.u1r(tmp - _unary__edvuaz | 0);
  };
  function elementNames$$inlined$Iterable$1($this_elementNames) {
    this.h1s_1 = $this_elementNames;
  }
  protoOf(elementNames$$inlined$Iterable$1).j = function () {
    return new elementNames$1(this.h1s_1);
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
    return new SerialDescriptorImpl(serialName, kind, sdBuilder.j1q_1.m(), toList(typeParameters), sdBuilder);
  }
  function ClassSerialDescriptorBuilder(serialName) {
    this.g1q_1 = serialName;
    this.h1q_1 = false;
    this.i1q_1 = emptyList();
    this.j1q_1 = ArrayList_init_$Create$_0();
    this.k1q_1 = HashSet_init_$Create$();
    this.l1q_1 = ArrayList_init_$Create$_0();
    this.m1q_1 = ArrayList_init_$Create$_0();
    this.n1q_1 = ArrayList_init_$Create$_0();
  }
  protoOf(ClassSerialDescriptorBuilder).i1s = function (elementName, descriptor, annotations, isOptional) {
    // Inline function 'kotlin.require' call
    if (!this.k1q_1.e(elementName)) {
      var message = "Element with name '" + elementName + "' is already registered in " + this.g1q_1;
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    // Inline function 'kotlin.collections.plusAssign' call
    this.j1q_1.e(elementName);
    // Inline function 'kotlin.collections.plusAssign' call
    this.l1q_1.e(descriptor);
    // Inline function 'kotlin.collections.plusAssign' call
    this.m1q_1.e(annotations);
    // Inline function 'kotlin.collections.plusAssign' call
    this.n1q_1.e(isOptional);
  };
  protoOf(ClassSerialDescriptorBuilder).o1q = function (elementName, descriptor, annotations, isOptional, $super) {
    annotations = annotations === VOID ? emptyList() : annotations;
    isOptional = isOptional === VOID ? false : isOptional;
    var tmp;
    if ($super === VOID) {
      this.i1s(elementName, descriptor, annotations, isOptional);
      tmp = Unit_instance;
    } else {
      tmp = $super.i1s.call(this, elementName, descriptor, annotations, isOptional);
    }
    return tmp;
  };
  function _get__hashCode__tgwhef($this) {
    var tmp0 = $this.u1s_1;
    // Inline function 'kotlin.getValue' call
    _hashCode$factory();
    return tmp0.w();
  }
  function SerialDescriptorImpl$_hashCode$delegate$lambda(this$0) {
    return function () {
      return hashCodeImpl(this$0, this$0.t1s_1);
    };
  }
  function SerialDescriptorImpl$toString$lambda(this$0) {
    return function (it) {
      return this$0.u1r(it) + ': ' + this$0.x1r(it).e1r();
    };
  }
  function SerialDescriptorImpl(serialName, kind, elementsCount, typeParameters, builder) {
    this.j1s_1 = serialName;
    this.k1s_1 = kind;
    this.l1s_1 = elementsCount;
    this.m1s_1 = builder.i1q_1;
    this.n1s_1 = toHashSet(builder.j1q_1);
    var tmp = this;
    // Inline function 'kotlin.collections.toTypedArray' call
    var this_0 = builder.j1q_1;
    tmp.o1s_1 = copyToArray(this_0);
    this.p1s_1 = compactArray(builder.l1q_1);
    var tmp_0 = this;
    // Inline function 'kotlin.collections.toTypedArray' call
    var this_1 = builder.m1q_1;
    tmp_0.q1s_1 = copyToArray(this_1);
    this.r1s_1 = toBooleanArray(builder.n1q_1);
    var tmp_1 = this;
    // Inline function 'kotlin.collections.map' call
    var this_2 = withIndex(this.o1s_1);
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$(collectionSizeOrDefault(this_2, 10));
    var _iterator__ex2g4s = this_2.j();
    while (_iterator__ex2g4s.k()) {
      var item = _iterator__ex2g4s.l();
      var tmp$ret$2 = to(item.kg_1, item.jg_1);
      destination.e(tmp$ret$2);
    }
    tmp_1.s1s_1 = toMap(destination);
    this.t1s_1 = compactArray(typeParameters);
    var tmp_2 = this;
    tmp_2.u1s_1 = lazy_0(SerialDescriptorImpl$_hashCode$delegate$lambda(this));
  }
  protoOf(SerialDescriptorImpl).e1r = function () {
    return this.j1s_1;
  };
  protoOf(SerialDescriptorImpl).q1r = function () {
    return this.k1s_1;
  };
  protoOf(SerialDescriptorImpl).s1r = function () {
    return this.l1s_1;
  };
  protoOf(SerialDescriptorImpl).t1r = function () {
    return this.m1s_1;
  };
  protoOf(SerialDescriptorImpl).v1s = function () {
    return this.n1s_1;
  };
  protoOf(SerialDescriptorImpl).u1r = function (index) {
    return getChecked(this.o1s_1, index);
  };
  protoOf(SerialDescriptorImpl).v1r = function (name) {
    var tmp0_elvis_lhs = this.s1s_1.j2(name);
    return tmp0_elvis_lhs == null ? -3 : tmp0_elvis_lhs;
  };
  protoOf(SerialDescriptorImpl).w1r = function (index) {
    return getChecked(this.q1s_1, index);
  };
  protoOf(SerialDescriptorImpl).x1r = function (index) {
    return getChecked(this.p1s_1, index);
  };
  protoOf(SerialDescriptorImpl).y1r = function (index) {
    return getChecked_0(this.r1s_1, index);
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
      if (!(this.e1r() === other.e1r())) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      if (!contentEquals(this.t1s_1, other.t1s_1)) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      if (!(this.s1r() === other.s1r())) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      var inductionVariable = 0;
      var last = this.s1r();
      if (inductionVariable < last)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          if (!(this.x1r(index).e1r() === other.x1r(index).e1r())) {
            tmp$ret$0 = false;
            break $l$block_5;
          }
          if (!equals(this.x1r(index).q1r(), other.x1r(index).q1r())) {
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
    var tmp = until(0, this.l1s_1);
    var tmp_0 = this.j1s_1 + '(';
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
    return new SerialDescriptorImpl(serialName, CLASS_getInstance(), sdBuilder.j1q_1.m(), toList(typeParameters), sdBuilder);
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
  protoOf(AbstractDecoder).w1s = function () {
    throw SerializationException_init_$Create$_0(toString(getKClassFromExpression(this)) + " can't retrieve untyped values");
  };
  protoOf(AbstractDecoder).x1s = function () {
    return true;
  };
  protoOf(AbstractDecoder).y1s = function () {
    return null;
  };
  protoOf(AbstractDecoder).z1s = function () {
    var tmp = this.w1s();
    return typeof tmp === 'boolean' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).a1t = function () {
    var tmp = this.w1s();
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).b1t = function () {
    var tmp = this.w1s();
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).c1t = function () {
    var tmp = this.w1s();
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).d1t = function () {
    var tmp = this.w1s();
    return tmp instanceof Long ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).e1t = function () {
    var tmp = this.w1s();
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).f1t = function () {
    var tmp = this.w1s();
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).g1t = function () {
    var tmp = this.w1s();
    return tmp instanceof Char ? tmp.o1_1 : THROW_CCE();
  };
  protoOf(AbstractDecoder).h1t = function () {
    var tmp = this.w1s();
    return typeof tmp === 'string' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).i1t = function (enumDescriptor) {
    var tmp = this.w1s();
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).j1t = function (descriptor) {
    return this;
  };
  protoOf(AbstractDecoder).k1t = function (deserializer, previousValue) {
    return this.l1t(deserializer);
  };
  protoOf(AbstractDecoder).m1t = function (descriptor) {
    return this;
  };
  protoOf(AbstractDecoder).n1t = function (descriptor) {
  };
  protoOf(AbstractDecoder).o1t = function (descriptor, index) {
    return this.z1s();
  };
  protoOf(AbstractDecoder).p1t = function (descriptor, index) {
    return this.a1t();
  };
  protoOf(AbstractDecoder).q1t = function (descriptor, index) {
    return this.b1t();
  };
  protoOf(AbstractDecoder).r1t = function (descriptor, index) {
    return this.c1t();
  };
  protoOf(AbstractDecoder).s1t = function (descriptor, index) {
    return this.d1t();
  };
  protoOf(AbstractDecoder).t1t = function (descriptor, index) {
    return this.e1t();
  };
  protoOf(AbstractDecoder).u1t = function (descriptor, index) {
    return this.f1t();
  };
  protoOf(AbstractDecoder).v1t = function (descriptor, index) {
    return this.g1t();
  };
  protoOf(AbstractDecoder).w1t = function (descriptor, index) {
    return this.h1t();
  };
  protoOf(AbstractDecoder).x1t = function (descriptor, index) {
    return this.j1t(descriptor.x1r(index));
  };
  protoOf(AbstractDecoder).y1t = function (descriptor, index, deserializer, previousValue) {
    return this.k1t(deserializer, previousValue);
  };
  protoOf(AbstractDecoder).a1u = function (descriptor, index, deserializer, previousValue) {
    // Inline function 'kotlinx.serialization.encoding.decodeIfNullable' call
    var isNullabilitySupported = deserializer.d1q().m1r();
    var tmp;
    if (isNullabilitySupported || this.x1s()) {
      tmp = this.k1t(deserializer, previousValue);
    } else {
      tmp = this.y1s();
    }
    return tmp;
  };
  function AbstractEncoder() {
  }
  protoOf(AbstractEncoder).m1t = function (descriptor) {
    return this;
  };
  protoOf(AbstractEncoder).n1t = function (descriptor) {
  };
  protoOf(AbstractEncoder).f1u = function (descriptor, index) {
    return true;
  };
  protoOf(AbstractEncoder).g1u = function (value) {
    throw SerializationException_init_$Create$_0('Non-serializable ' + toString(getKClassFromExpression(value)) + ' is not supported by ' + toString(getKClassFromExpression(this)) + ' encoder');
  };
  protoOf(AbstractEncoder).h1u = function () {
    throw SerializationException_init_$Create$_0("'null' is not supported by default");
  };
  protoOf(AbstractEncoder).i1u = function (value) {
    return this.g1u(value);
  };
  protoOf(AbstractEncoder).j1u = function (value) {
    return this.g1u(value);
  };
  protoOf(AbstractEncoder).k1u = function (value) {
    return this.g1u(value);
  };
  protoOf(AbstractEncoder).l1u = function (value) {
    return this.g1u(value);
  };
  protoOf(AbstractEncoder).m1u = function (value) {
    return this.g1u(value);
  };
  protoOf(AbstractEncoder).n1u = function (value) {
    return this.g1u(value);
  };
  protoOf(AbstractEncoder).o1u = function (value) {
    return this.g1u(value);
  };
  protoOf(AbstractEncoder).p1u = function (value) {
    return this.g1u(new Char(value));
  };
  protoOf(AbstractEncoder).q1u = function (value) {
    return this.g1u(value);
  };
  protoOf(AbstractEncoder).r1u = function (enumDescriptor, index) {
    return this.g1u(index);
  };
  protoOf(AbstractEncoder).s1u = function (descriptor) {
    return this;
  };
  protoOf(AbstractEncoder).t1u = function (descriptor, index, value) {
    if (this.f1u(descriptor, index)) {
      this.i1u(value);
    }
  };
  protoOf(AbstractEncoder).u1u = function (descriptor, index, value) {
    if (this.f1u(descriptor, index)) {
      this.j1u(value);
    }
  };
  protoOf(AbstractEncoder).v1u = function (descriptor, index, value) {
    if (this.f1u(descriptor, index)) {
      this.k1u(value);
    }
  };
  protoOf(AbstractEncoder).w1u = function (descriptor, index, value) {
    if (this.f1u(descriptor, index)) {
      this.l1u(value);
    }
  };
  protoOf(AbstractEncoder).x1u = function (descriptor, index, value) {
    if (this.f1u(descriptor, index)) {
      this.m1u(value);
    }
  };
  protoOf(AbstractEncoder).y1u = function (descriptor, index, value) {
    if (this.f1u(descriptor, index)) {
      this.n1u(value);
    }
  };
  protoOf(AbstractEncoder).z1u = function (descriptor, index, value) {
    if (this.f1u(descriptor, index)) {
      this.o1u(value);
    }
  };
  protoOf(AbstractEncoder).a1v = function (descriptor, index, value) {
    if (this.f1u(descriptor, index)) {
      this.p1u(value);
    }
  };
  protoOf(AbstractEncoder).b1v = function (descriptor, index, value) {
    if (this.f1u(descriptor, index)) {
      this.q1u(value);
    }
  };
  protoOf(AbstractEncoder).c1v = function (descriptor, index) {
    return this.f1u(descriptor, index) ? this.s1u(descriptor.x1r(index)) : NoOpEncoder_getInstance();
  };
  protoOf(AbstractEncoder).d1v = function (descriptor, index, serializer, value) {
    if (this.f1u(descriptor, index)) {
      this.e1v(serializer, value);
    }
  };
  protoOf(AbstractEncoder).f1v = function (descriptor, index, serializer, value) {
    if (this.f1u(descriptor, index)) {
      this.g1v(serializer, value);
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
    var klassName = compositeDecoder.w1t($this.d1q(), 0);
    var serializer = findPolymorphicSerializer_0($this, compositeDecoder, klassName);
    return compositeDecoder.z1t($this.d1q(), 1, serializer);
  }
  function AbstractPolymorphicSerializer() {
  }
  protoOf(AbstractPolymorphicSerializer).t1q = function (encoder, value) {
    var actualSerializer = findPolymorphicSerializer(this, encoder, value);
    // Inline function 'kotlinx.serialization.encoding.encodeStructure' call
    var descriptor = this.d1q();
    var composite = encoder.m1t(descriptor);
    composite.b1v(this.d1q(), 0, actualSerializer.d1q().e1r());
    var tmp = this.d1q();
    // Inline function 'kotlinx.serialization.internal.cast' call
    var tmp$ret$0 = isInterface(actualSerializer, SerializationStrategy) ? actualSerializer : THROW_CCE();
    composite.d1v(tmp, 1, tmp$ret$0, value);
    composite.n1t(descriptor);
  };
  protoOf(AbstractPolymorphicSerializer).e1q = function (encoder, value) {
    return this.t1q(encoder, !(value == null) ? value : THROW_CCE());
  };
  protoOf(AbstractPolymorphicSerializer).f1q = function (decoder) {
    // Inline function 'kotlinx.serialization.encoding.decodeStructure' call
    var descriptor = this.d1q();
    var composite = decoder.m1t(descriptor);
    var tmp$ret$0;
    $l$block: {
      var klassName = null;
      var value = null;
      if (composite.c1u()) {
        tmp$ret$0 = decodeSequentially_0(this, composite);
        break $l$block;
      }
      mainLoop: while (true) {
        var index = composite.d1u(this.d1q());
        switch (index) {
          case -1:
            break mainLoop;
          case 0:
            klassName = composite.w1t(this.d1q(), index);
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
            value = composite.z1t(this.d1q(), index, serializer);
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
    composite.n1t(descriptor);
    return result;
  };
  protoOf(AbstractPolymorphicSerializer).u1q = function (decoder, klassName) {
    return decoder.b1u().k1v(this.s1q(), klassName);
  };
  protoOf(AbstractPolymorphicSerializer).v1q = function (encoder, value) {
    return encoder.b1u().l1v(this.s1q(), value);
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
    this.m1v_1 = NothingSerialDescriptor_getInstance();
  }
  protoOf(NothingSerializer_0).d1q = function () {
    return this.m1v_1;
  };
  protoOf(NothingSerializer_0).n1v = function (encoder, value) {
    throw SerializationException_init_$Create$_0("'kotlin.Nothing' cannot be serialized");
  };
  protoOf(NothingSerializer_0).e1q = function (encoder, value) {
    var tmp;
    if (false) {
      tmp = value;
    } else {
      tmp = THROW_CCE();
    }
    return this.n1v(encoder, tmp);
  };
  protoOf(NothingSerializer_0).f1q = function (decoder) {
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
    this.o1v_1 = new PrimitiveSerialDescriptor_0('kotlin.time.Duration', STRING_getInstance());
  }
  protoOf(DurationSerializer).d1q = function () {
    return this.o1v_1;
  };
  protoOf(DurationSerializer).p1v = function (encoder, value) {
    encoder.q1u(Duration__toIsoString_impl_9h6wsm(value));
  };
  protoOf(DurationSerializer).e1q = function (encoder, value) {
    return this.p1v(encoder, value instanceof Duration ? value.ml_1 : THROW_CCE());
  };
  protoOf(DurationSerializer).q1v = function (decoder) {
    return Companion_getInstance().ll(decoder.h1t());
  };
  protoOf(DurationSerializer).f1q = function (decoder) {
    return new Duration(this.q1v(decoder));
  };
  var DurationSerializer_instance;
  function DurationSerializer_getInstance() {
    if (DurationSerializer_instance == null)
      new DurationSerializer();
    return DurationSerializer_instance;
  }
  function UuidSerializer() {
    UuidSerializer_instance = this;
    this.r1v_1 = new PrimitiveSerialDescriptor_0('kotlin.uuid.Uuid', STRING_getInstance());
  }
  protoOf(UuidSerializer).d1q = function () {
    return this.r1v_1;
  };
  protoOf(UuidSerializer).s1v = function (encoder, value) {
    encoder.q1u(value.toString());
  };
  protoOf(UuidSerializer).e1q = function (encoder, value) {
    return this.s1v(encoder, value instanceof Uuid ? value : THROW_CCE());
  };
  protoOf(UuidSerializer).f1q = function (decoder) {
    return Companion_getInstance_0().fm(decoder.h1t());
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
  protoOf(ArrayListClassDesc).e1r = function () {
    return 'kotlin.collections.ArrayList';
  };
  function HashSetClassDesc(elementDesc) {
    ListLikeDescriptor.call(this, elementDesc);
  }
  protoOf(HashSetClassDesc).e1r = function () {
    return 'kotlin.collections.HashSet';
  };
  function LinkedHashSetClassDesc(elementDesc) {
    ListLikeDescriptor.call(this, elementDesc);
  }
  protoOf(LinkedHashSetClassDesc).e1r = function () {
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
  protoOf(ArrayClassDesc).e1r = function () {
    return 'kotlin.Array';
  };
  function ListLikeDescriptor(elementDescriptor) {
    this.v1v_1 = elementDescriptor;
    this.w1v_1 = 1;
  }
  protoOf(ListLikeDescriptor).q1r = function () {
    return LIST_getInstance();
  };
  protoOf(ListLikeDescriptor).s1r = function () {
    return this.w1v_1;
  };
  protoOf(ListLikeDescriptor).u1r = function (index) {
    return index.toString();
  };
  protoOf(ListLikeDescriptor).v1r = function (name) {
    var tmp0_elvis_lhs = toIntOrNull(name);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throw IllegalArgumentException_init_$Create$(name + ' is not a valid list index');
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  };
  protoOf(ListLikeDescriptor).y1r = function (index) {
    // Inline function 'kotlin.require' call
    if (!(index >= 0)) {
      var message = 'Illegal index ' + index + ', ' + this.e1r() + ' expects only non-negative indices';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return false;
  };
  protoOf(ListLikeDescriptor).w1r = function (index) {
    // Inline function 'kotlin.require' call
    if (!(index >= 0)) {
      var message = 'Illegal index ' + index + ', ' + this.e1r() + ' expects only non-negative indices';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return emptyList();
  };
  protoOf(ListLikeDescriptor).x1r = function (index) {
    // Inline function 'kotlin.require' call
    if (!(index >= 0)) {
      var message = 'Illegal index ' + index + ', ' + this.e1r() + ' expects only non-negative indices';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return this.v1v_1;
  };
  protoOf(ListLikeDescriptor).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof ListLikeDescriptor))
      return false;
    if (equals(this.v1v_1, other.v1v_1) && this.e1r() === other.e1r())
      return true;
    return false;
  };
  protoOf(ListLikeDescriptor).hashCode = function () {
    return imul(hashCode(this.v1v_1), 31) + getStringHashCode(this.e1r()) | 0;
  };
  protoOf(ListLikeDescriptor).toString = function () {
    return this.e1r() + '(' + toString(this.v1v_1) + ')';
  };
  function MapLikeDescriptor(serialName, keyDescriptor, valueDescriptor) {
    this.b1w_1 = serialName;
    this.c1w_1 = keyDescriptor;
    this.d1w_1 = valueDescriptor;
    this.e1w_1 = 2;
  }
  protoOf(MapLikeDescriptor).e1r = function () {
    return this.b1w_1;
  };
  protoOf(MapLikeDescriptor).q1r = function () {
    return MAP_getInstance();
  };
  protoOf(MapLikeDescriptor).s1r = function () {
    return this.e1w_1;
  };
  protoOf(MapLikeDescriptor).u1r = function (index) {
    return index.toString();
  };
  protoOf(MapLikeDescriptor).v1r = function (name) {
    var tmp0_elvis_lhs = toIntOrNull(name);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throw IllegalArgumentException_init_$Create$(name + ' is not a valid map index');
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  };
  protoOf(MapLikeDescriptor).y1r = function (index) {
    // Inline function 'kotlin.require' call
    if (!(index >= 0)) {
      var message = 'Illegal index ' + index + ', ' + this.e1r() + ' expects only non-negative indices';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return false;
  };
  protoOf(MapLikeDescriptor).w1r = function (index) {
    // Inline function 'kotlin.require' call
    if (!(index >= 0)) {
      var message = 'Illegal index ' + index + ', ' + this.e1r() + ' expects only non-negative indices';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return emptyList();
  };
  protoOf(MapLikeDescriptor).x1r = function (index) {
    // Inline function 'kotlin.require' call
    if (!(index >= 0)) {
      var message = 'Illegal index ' + index + ', ' + this.e1r() + ' expects only non-negative indices';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    var tmp;
    switch (index % 2 | 0) {
      case 0:
        tmp = this.c1w_1;
        break;
      case 1:
        tmp = this.d1w_1;
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
    if (!(this.e1r() === other.e1r()))
      return false;
    if (!equals(this.c1w_1, other.c1w_1))
      return false;
    if (!equals(this.d1w_1, other.d1w_1))
      return false;
    return true;
  };
  protoOf(MapLikeDescriptor).hashCode = function () {
    var result = getStringHashCode(this.e1r());
    result = imul(31, result) + hashCode(this.c1w_1) | 0;
    result = imul(31, result) + hashCode(this.d1w_1) | 0;
    return result;
  };
  protoOf(MapLikeDescriptor).toString = function () {
    return this.e1r() + '(' + toString(this.c1w_1) + ', ' + toString(this.d1w_1) + ')';
  };
  function PrimitiveArrayDescriptor(primitive) {
    ListLikeDescriptor.call(this, primitive);
    this.j1w_1 = primitive.e1r() + 'Array';
  }
  protoOf(PrimitiveArrayDescriptor).e1r = function () {
    return this.j1w_1;
  };
  function ArrayListSerializer(element) {
    CollectionSerializer.call(this, element);
    this.l1w_1 = new ArrayListClassDesc(element.d1q());
  }
  protoOf(ArrayListSerializer).d1q = function () {
    return this.l1w_1;
  };
  protoOf(ArrayListSerializer).m1w = function () {
    // Inline function 'kotlin.collections.arrayListOf' call
    return ArrayList_init_$Create$_0();
  };
  protoOf(ArrayListSerializer).n1w = function (_this__u8e3s4) {
    return _this__u8e3s4.m();
  };
  protoOf(ArrayListSerializer).o1w = function (_this__u8e3s4) {
    return this.n1w(_this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ArrayListSerializer).p1w = function (_this__u8e3s4) {
    return _this__u8e3s4;
  };
  protoOf(ArrayListSerializer).q1w = function (_this__u8e3s4) {
    return this.p1w(_this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ArrayListSerializer).r1w = function (_this__u8e3s4) {
    var tmp0_elvis_lhs = _this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : null;
    return tmp0_elvis_lhs == null ? ArrayList_init_$Create$_1(_this__u8e3s4) : tmp0_elvis_lhs;
  };
  protoOf(ArrayListSerializer).s1w = function (_this__u8e3s4) {
    return this.r1w((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtList) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ArrayListSerializer).t1w = function (_this__u8e3s4, size) {
    return _this__u8e3s4.n5(size);
  };
  protoOf(ArrayListSerializer).u1w = function (_this__u8e3s4, size) {
    return this.t1w(_this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE(), size);
  };
  protoOf(ArrayListSerializer).v1w = function (_this__u8e3s4, index, element) {
    _this__u8e3s4.f2(index, element);
  };
  protoOf(ArrayListSerializer).w1w = function (_this__u8e3s4, index, element) {
    var tmp = _this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE();
    return this.v1w(tmp, index, (element == null ? true : !(element == null)) ? element : THROW_CCE());
  };
  function HashSetSerializer(eSerializer) {
    CollectionSerializer.call(this, eSerializer);
    this.h1x_1 = new HashSetClassDesc(eSerializer.d1q());
  }
  protoOf(HashSetSerializer).d1q = function () {
    return this.h1x_1;
  };
  protoOf(HashSetSerializer).m1w = function () {
    return HashSet_init_$Create$();
  };
  protoOf(HashSetSerializer).i1x = function (_this__u8e3s4) {
    return _this__u8e3s4.m();
  };
  protoOf(HashSetSerializer).o1w = function (_this__u8e3s4) {
    return this.i1x(_this__u8e3s4 instanceof HashSet ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(HashSetSerializer).j1x = function (_this__u8e3s4) {
    return _this__u8e3s4;
  };
  protoOf(HashSetSerializer).q1w = function (_this__u8e3s4) {
    return this.j1x(_this__u8e3s4 instanceof HashSet ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(HashSetSerializer).k1x = function (_this__u8e3s4) {
    var tmp0_elvis_lhs = _this__u8e3s4 instanceof HashSet ? _this__u8e3s4 : null;
    return tmp0_elvis_lhs == null ? HashSet_init_$Create$_0(_this__u8e3s4) : tmp0_elvis_lhs;
  };
  protoOf(HashSetSerializer).s1w = function (_this__u8e3s4) {
    return this.k1x((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtSet) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(HashSetSerializer).l1x = function (_this__u8e3s4, size) {
  };
  protoOf(HashSetSerializer).u1w = function (_this__u8e3s4, size) {
    return this.l1x(_this__u8e3s4 instanceof HashSet ? _this__u8e3s4 : THROW_CCE(), size);
  };
  protoOf(HashSetSerializer).m1x = function (_this__u8e3s4, index, element) {
    _this__u8e3s4.e(element);
  };
  protoOf(HashSetSerializer).w1w = function (_this__u8e3s4, index, element) {
    var tmp = _this__u8e3s4 instanceof HashSet ? _this__u8e3s4 : THROW_CCE();
    return this.m1x(tmp, index, (element == null ? true : !(element == null)) ? element : THROW_CCE());
  };
  function LinkedHashSetSerializer(eSerializer) {
    CollectionSerializer.call(this, eSerializer);
    this.o1x_1 = new LinkedHashSetClassDesc(eSerializer.d1q());
  }
  protoOf(LinkedHashSetSerializer).d1q = function () {
    return this.o1x_1;
  };
  protoOf(LinkedHashSetSerializer).m1w = function () {
    // Inline function 'kotlin.collections.linkedSetOf' call
    return LinkedHashSet_init_$Create$();
  };
  protoOf(LinkedHashSetSerializer).p1x = function (_this__u8e3s4) {
    return _this__u8e3s4.m();
  };
  protoOf(LinkedHashSetSerializer).o1w = function (_this__u8e3s4) {
    return this.p1x(_this__u8e3s4 instanceof LinkedHashSet ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashSetSerializer).q1x = function (_this__u8e3s4) {
    return _this__u8e3s4;
  };
  protoOf(LinkedHashSetSerializer).q1w = function (_this__u8e3s4) {
    return this.q1x(_this__u8e3s4 instanceof LinkedHashSet ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashSetSerializer).k1x = function (_this__u8e3s4) {
    var tmp0_elvis_lhs = _this__u8e3s4 instanceof LinkedHashSet ? _this__u8e3s4 : null;
    return tmp0_elvis_lhs == null ? LinkedHashSet_init_$Create$_0(_this__u8e3s4) : tmp0_elvis_lhs;
  };
  protoOf(LinkedHashSetSerializer).s1w = function (_this__u8e3s4) {
    return this.k1x((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtSet) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashSetSerializer).r1x = function (_this__u8e3s4, size) {
  };
  protoOf(LinkedHashSetSerializer).u1w = function (_this__u8e3s4, size) {
    return this.r1x(_this__u8e3s4 instanceof LinkedHashSet ? _this__u8e3s4 : THROW_CCE(), size);
  };
  protoOf(LinkedHashSetSerializer).s1x = function (_this__u8e3s4, index, element) {
    _this__u8e3s4.e(element);
  };
  protoOf(LinkedHashSetSerializer).w1w = function (_this__u8e3s4, index, element) {
    var tmp = _this__u8e3s4 instanceof LinkedHashSet ? _this__u8e3s4 : THROW_CCE();
    return this.s1x(tmp, index, (element == null ? true : !(element == null)) ? element : THROW_CCE());
  };
  function HashMapSerializer(kSerializer, vSerializer) {
    MapLikeSerializer.call(this, kSerializer, vSerializer);
    this.v1x_1 = new HashMapClassDesc(kSerializer.d1q(), vSerializer.d1q());
  }
  protoOf(HashMapSerializer).d1q = function () {
    return this.v1x_1;
  };
  protoOf(HashMapSerializer).w1x = function (_this__u8e3s4) {
    return _this__u8e3s4.m();
  };
  protoOf(HashMapSerializer).x1x = function (_this__u8e3s4) {
    return this.w1x((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtMap) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(HashMapSerializer).y1x = function (_this__u8e3s4) {
    // Inline function 'kotlin.collections.iterator' call
    return _this__u8e3s4.u().j();
  };
  protoOf(HashMapSerializer).z1x = function (_this__u8e3s4) {
    return this.y1x((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtMap) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(HashMapSerializer).m1w = function () {
    return HashMap_init_$Create$();
  };
  protoOf(HashMapSerializer).a1y = function (_this__u8e3s4) {
    return imul(_this__u8e3s4.m(), 2);
  };
  protoOf(HashMapSerializer).o1w = function (_this__u8e3s4) {
    return this.a1y(_this__u8e3s4 instanceof HashMap ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(HashMapSerializer).b1y = function (_this__u8e3s4) {
    return _this__u8e3s4;
  };
  protoOf(HashMapSerializer).q1w = function (_this__u8e3s4) {
    return this.b1y(_this__u8e3s4 instanceof HashMap ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(HashMapSerializer).c1y = function (_this__u8e3s4) {
    var tmp0_elvis_lhs = _this__u8e3s4 instanceof HashMap ? _this__u8e3s4 : null;
    return tmp0_elvis_lhs == null ? HashMap_init_$Create$_0(_this__u8e3s4) : tmp0_elvis_lhs;
  };
  protoOf(HashMapSerializer).s1w = function (_this__u8e3s4) {
    return this.c1y((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtMap) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(HashMapSerializer).d1y = function (_this__u8e3s4, size) {
  };
  protoOf(HashMapSerializer).u1w = function (_this__u8e3s4, size) {
    return this.d1y(_this__u8e3s4 instanceof HashMap ? _this__u8e3s4 : THROW_CCE(), size);
  };
  function LinkedHashMapSerializer(kSerializer, vSerializer) {
    MapLikeSerializer.call(this, kSerializer, vSerializer);
    this.k1y_1 = new LinkedHashMapClassDesc(kSerializer.d1q(), vSerializer.d1q());
  }
  protoOf(LinkedHashMapSerializer).d1q = function () {
    return this.k1y_1;
  };
  protoOf(LinkedHashMapSerializer).w1x = function (_this__u8e3s4) {
    return _this__u8e3s4.m();
  };
  protoOf(LinkedHashMapSerializer).x1x = function (_this__u8e3s4) {
    return this.w1x((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtMap) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashMapSerializer).y1x = function (_this__u8e3s4) {
    // Inline function 'kotlin.collections.iterator' call
    return _this__u8e3s4.u().j();
  };
  protoOf(LinkedHashMapSerializer).z1x = function (_this__u8e3s4) {
    return this.y1x((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtMap) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashMapSerializer).m1w = function () {
    return LinkedHashMap_init_$Create$();
  };
  protoOf(LinkedHashMapSerializer).l1y = function (_this__u8e3s4) {
    return imul(_this__u8e3s4.m(), 2);
  };
  protoOf(LinkedHashMapSerializer).o1w = function (_this__u8e3s4) {
    return this.l1y(_this__u8e3s4 instanceof LinkedHashMap ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashMapSerializer).m1y = function (_this__u8e3s4) {
    return _this__u8e3s4;
  };
  protoOf(LinkedHashMapSerializer).q1w = function (_this__u8e3s4) {
    return this.m1y(_this__u8e3s4 instanceof LinkedHashMap ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashMapSerializer).c1y = function (_this__u8e3s4) {
    var tmp0_elvis_lhs = _this__u8e3s4 instanceof LinkedHashMap ? _this__u8e3s4 : null;
    return tmp0_elvis_lhs == null ? LinkedHashMap_init_$Create$_1(_this__u8e3s4) : tmp0_elvis_lhs;
  };
  protoOf(LinkedHashMapSerializer).s1w = function (_this__u8e3s4) {
    return this.c1y((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtMap) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashMapSerializer).n1y = function (_this__u8e3s4, size) {
  };
  protoOf(LinkedHashMapSerializer).u1w = function (_this__u8e3s4, size) {
    return this.n1y(_this__u8e3s4 instanceof LinkedHashMap ? _this__u8e3s4 : THROW_CCE(), size);
  };
  function ReferenceArraySerializer(kClass, eSerializer) {
    CollectionLikeSerializer.call(this, eSerializer);
    this.p1y_1 = kClass;
    this.q1y_1 = new ArrayClassDesc(eSerializer.d1q());
  }
  protoOf(ReferenceArraySerializer).d1q = function () {
    return this.q1y_1;
  };
  protoOf(ReferenceArraySerializer).r1y = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(ReferenceArraySerializer).x1x = function (_this__u8e3s4) {
    return this.r1y((!(_this__u8e3s4 == null) ? isArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ReferenceArraySerializer).s1y = function (_this__u8e3s4) {
    return arrayIterator(_this__u8e3s4);
  };
  protoOf(ReferenceArraySerializer).z1x = function (_this__u8e3s4) {
    return this.s1y((!(_this__u8e3s4 == null) ? isArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ReferenceArraySerializer).m1w = function () {
    // Inline function 'kotlin.collections.arrayListOf' call
    return ArrayList_init_$Create$_0();
  };
  protoOf(ReferenceArraySerializer).t1y = function (_this__u8e3s4) {
    return _this__u8e3s4.m();
  };
  protoOf(ReferenceArraySerializer).o1w = function (_this__u8e3s4) {
    return this.t1y(_this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ReferenceArraySerializer).u1y = function (_this__u8e3s4) {
    return toNativeArrayImpl(_this__u8e3s4, this.p1y_1);
  };
  protoOf(ReferenceArraySerializer).q1w = function (_this__u8e3s4) {
    return this.u1y(_this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ReferenceArraySerializer).v1y = function (_this__u8e3s4) {
    return ArrayList_init_$Create$_1(asList(_this__u8e3s4));
  };
  protoOf(ReferenceArraySerializer).s1w = function (_this__u8e3s4) {
    return this.v1y((!(_this__u8e3s4 == null) ? isArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ReferenceArraySerializer).w1y = function (_this__u8e3s4, size) {
    return _this__u8e3s4.n5(size);
  };
  protoOf(ReferenceArraySerializer).u1w = function (_this__u8e3s4, size) {
    return this.w1y(_this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE(), size);
  };
  protoOf(ReferenceArraySerializer).x1y = function (_this__u8e3s4, index, element) {
    _this__u8e3s4.f2(index, element);
  };
  protoOf(ReferenceArraySerializer).w1w = function (_this__u8e3s4, index, element) {
    var tmp = _this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE();
    return this.x1y(tmp, index, (element == null ? true : !(element == null)) ? element : THROW_CCE());
  };
  function CollectionSerializer(element) {
    CollectionLikeSerializer.call(this, element);
  }
  protoOf(CollectionSerializer).y1w = function (_this__u8e3s4) {
    return _this__u8e3s4.m();
  };
  protoOf(CollectionSerializer).x1x = function (_this__u8e3s4) {
    return this.y1w((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, Collection) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(CollectionSerializer).z1w = function (_this__u8e3s4) {
    return _this__u8e3s4.j();
  };
  protoOf(CollectionSerializer).z1x = function (_this__u8e3s4) {
    return this.z1w((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, Collection) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  function MapLikeSerializer(keySerializer, valueSerializer) {
    AbstractCollectionSerializer.call(this);
    this.e1y_1 = keySerializer;
    this.f1y_1 = valueSerializer;
  }
  protoOf(MapLikeSerializer).g1y = function (decoder, builder, startIndex, size) {
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
        this.h1y(decoder, startIndex + index | 0, builder, false);
      }
       while (!(index === last));
  };
  protoOf(MapLikeSerializer).c1x = function (decoder, builder, startIndex, size) {
    return this.g1y(decoder, (!(builder == null) ? isInterface(builder, KtMutableMap) : false) ? builder : THROW_CCE(), startIndex, size);
  };
  protoOf(MapLikeSerializer).h1y = function (decoder, index, builder, checkIndex) {
    var key = decoder.z1t(this.d1q(), index, this.e1y_1);
    var tmp;
    if (checkIndex) {
      // Inline function 'kotlin.also' call
      var this_0 = decoder.d1u(this.d1q());
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
    if (builder.h2(key)) {
      var tmp_2 = this.f1y_1.d1q().q1r();
      tmp_1 = !(tmp_2 instanceof PrimitiveKind);
    } else {
      tmp_1 = false;
    }
    if (tmp_1) {
      tmp_0 = decoder.y1t(this.d1q(), vIndex, this.f1y_1, getValue(builder, key));
    } else {
      tmp_0 = decoder.z1t(this.d1q(), vIndex, this.f1y_1);
    }
    var value = tmp_0;
    // Inline function 'kotlin.collections.set' call
    builder.m2(key, value);
  };
  protoOf(MapLikeSerializer).d1x = function (decoder, index, builder, checkIndex) {
    return this.h1y(decoder, index, (!(builder == null) ? isInterface(builder, KtMutableMap) : false) ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(MapLikeSerializer).b1x = function (encoder, value) {
    var size = this.x1x(value);
    // Inline function 'kotlinx.serialization.encoding.encodeCollection' call
    var descriptor = this.d1q();
    var composite = encoder.i1v(descriptor, size);
    var iterator = this.z1x(value);
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
      var tmp = this.d1q();
      var _unary__edvuaz = index;
      index = _unary__edvuaz + 1 | 0;
      composite.d1v(tmp, _unary__edvuaz, this.e1y_1, k);
      var tmp_0 = this.d1q();
      var _unary__edvuaz_0 = index;
      index = _unary__edvuaz_0 + 1 | 0;
      composite.d1v(tmp_0, _unary__edvuaz_0, this.f1y_1, v);
    }
    composite.n1t(descriptor);
  };
  protoOf(MapLikeSerializer).e1q = function (encoder, value) {
    return this.b1x(encoder, (value == null ? true : !(value == null)) ? value : THROW_CCE());
  };
  function CollectionLikeSerializer(elementSerializer) {
    AbstractCollectionSerializer.call(this);
    this.a1x_1 = elementSerializer;
  }
  protoOf(CollectionLikeSerializer).b1x = function (encoder, value) {
    var size = this.x1x(value);
    // Inline function 'kotlinx.serialization.encoding.encodeCollection' call
    var descriptor = this.d1q();
    var composite = encoder.i1v(descriptor, size);
    var iterator = this.z1x(value);
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        composite.d1v(this.d1q(), index, this.a1x_1, iterator.l());
      }
       while (inductionVariable < size);
    composite.n1t(descriptor);
  };
  protoOf(CollectionLikeSerializer).e1q = function (encoder, value) {
    return this.b1x(encoder, (value == null ? true : !(value == null)) ? value : THROW_CCE());
  };
  protoOf(CollectionLikeSerializer).c1x = function (decoder, builder, startIndex, size) {
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
        this.d1x(decoder, startIndex + index | 0, builder, false);
      }
       while (inductionVariable < size);
  };
  protoOf(CollectionLikeSerializer).d1x = function (decoder, index, builder, checkIndex) {
    this.w1w(builder, index, decoder.z1t(this.d1q(), index, this.a1x_1));
  };
  function readSize($this, decoder, builder) {
    var size = decoder.e1u($this.d1q());
    $this.u1w(builder, size);
    return size;
  }
  function AbstractCollectionSerializer() {
  }
  protoOf(AbstractCollectionSerializer).f1x = function (decoder, previous) {
    var tmp1_elvis_lhs = previous == null ? null : this.s1w(previous);
    var builder = tmp1_elvis_lhs == null ? this.m1w() : tmp1_elvis_lhs;
    var startIndex = this.o1w(builder);
    var compositeDecoder = decoder.m1t(this.d1q());
    if (compositeDecoder.c1u()) {
      this.c1x(compositeDecoder, builder, startIndex, readSize(this, compositeDecoder, builder));
    } else {
      $l$loop: while (true) {
        var index = compositeDecoder.d1u(this.d1q());
        if (index === -1)
          break $l$loop;
        this.e1x(compositeDecoder, startIndex + index | 0, builder);
      }
    }
    compositeDecoder.n1t(this.d1q());
    return this.q1w(builder);
  };
  protoOf(AbstractCollectionSerializer).f1q = function (decoder) {
    return this.f1x(decoder, null);
  };
  protoOf(AbstractCollectionSerializer).e1x = function (decoder, index, builder, checkIndex, $super) {
    checkIndex = checkIndex === VOID ? true : checkIndex;
    var tmp;
    if ($super === VOID) {
      this.d1x(decoder, index, builder, checkIndex);
      tmp = Unit_instance;
    } else {
      tmp = $super.d1x.call(this, decoder, index, builder, checkIndex);
    }
    return tmp;
  };
  function PrimitiveArraySerializer(primitiveSerializer) {
    CollectionLikeSerializer.call(this, primitiveSerializer);
    this.z1y_1 = new PrimitiveArrayDescriptor(primitiveSerializer.d1q());
  }
  protoOf(PrimitiveArraySerializer).d1q = function () {
    return this.z1y_1;
  };
  protoOf(PrimitiveArraySerializer).a1z = function (_this__u8e3s4) {
    return _this__u8e3s4.b1z();
  };
  protoOf(PrimitiveArraySerializer).o1w = function (_this__u8e3s4) {
    return this.a1z(_this__u8e3s4 instanceof PrimitiveArrayBuilder ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(PrimitiveArraySerializer).c1z = function (_this__u8e3s4) {
    return _this__u8e3s4.d1z();
  };
  protoOf(PrimitiveArraySerializer).q1w = function (_this__u8e3s4) {
    return this.c1z(_this__u8e3s4 instanceof PrimitiveArrayBuilder ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(PrimitiveArraySerializer).e1z = function (_this__u8e3s4, size) {
    return _this__u8e3s4.f1z(size);
  };
  protoOf(PrimitiveArraySerializer).u1w = function (_this__u8e3s4, size) {
    return this.e1z(_this__u8e3s4 instanceof PrimitiveArrayBuilder ? _this__u8e3s4 : THROW_CCE(), size);
  };
  protoOf(PrimitiveArraySerializer).g1z = function (_this__u8e3s4) {
    var message = 'This method lead to boxing and must not be used, use writeContents instead';
    throw IllegalStateException_init_$Create$(toString(message));
  };
  protoOf(PrimitiveArraySerializer).z1x = function (_this__u8e3s4) {
    return this.g1z((_this__u8e3s4 == null ? true : !(_this__u8e3s4 == null)) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(PrimitiveArraySerializer).h1z = function (_this__u8e3s4, index, element) {
    var message = 'This method lead to boxing and must not be used, use Builder.append instead';
    throw IllegalStateException_init_$Create$(toString(message));
  };
  protoOf(PrimitiveArraySerializer).w1w = function (_this__u8e3s4, index, element) {
    var tmp = _this__u8e3s4 instanceof PrimitiveArrayBuilder ? _this__u8e3s4 : THROW_CCE();
    return this.h1z(tmp, index, (element == null ? true : !(element == null)) ? element : THROW_CCE());
  };
  protoOf(PrimitiveArraySerializer).m1w = function () {
    return this.s1w(this.i1z());
  };
  protoOf(PrimitiveArraySerializer).l1z = function (encoder, value) {
    var size = this.x1x(value);
    // Inline function 'kotlinx.serialization.encoding.encodeCollection' call
    var descriptor = this.z1y_1;
    var composite = encoder.i1v(descriptor, size);
    this.k1z(composite, value, size);
    composite.n1t(descriptor);
  };
  protoOf(PrimitiveArraySerializer).e1q = function (encoder, value) {
    return this.l1z(encoder, (value == null ? true : !(value == null)) ? value : THROW_CCE());
  };
  protoOf(PrimitiveArraySerializer).b1x = function (encoder, value) {
    return this.l1z(encoder, (value == null ? true : !(value == null)) ? value : THROW_CCE());
  };
  protoOf(PrimitiveArraySerializer).f1q = function (decoder) {
    return this.f1x(decoder, null);
  };
  function PrimitiveArrayBuilder() {
  }
  protoOf(PrimitiveArrayBuilder).m1z = function (requiredCapacity, $super) {
    requiredCapacity = requiredCapacity === VOID ? this.b1z() + 1 | 0 : requiredCapacity;
    var tmp;
    if ($super === VOID) {
      this.f1z(requiredCapacity);
      tmp = Unit_instance;
    } else {
      tmp = $super.f1z.call(this, requiredCapacity);
    }
    return tmp;
  };
  function Companion() {
    Companion_instance_0 = this;
    this.n1z_1 = longArray(0);
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
      highMarks[get_lastIndex(highMarks)] = (new Long(-1, -1)).f3(elementsCount);
    }
    return highMarks;
  }
  function markHigh($this, index) {
    var slot = (index >>> 6 | 0) - 1 | 0;
    var offsetInSlot = index & 63;
    $this.r1z_1[slot] = $this.r1z_1[slot].j3((new Long(1, 0)).f3(offsetInSlot));
  }
  function nextUnmarkedHighIndex($this) {
    var inductionVariable = 0;
    var last = $this.r1z_1.length - 1 | 0;
    if (inductionVariable <= last)
      do {
        var slot = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var slotOffset = imul(slot + 1 | 0, 64);
        var slotMarks = $this.r1z_1[slot];
        while (!slotMarks.equals(new Long(-1, -1))) {
          var indexInSlot = countTrailingZeroBits(slotMarks.e3());
          slotMarks = slotMarks.j3((new Long(1, 0)).f3(indexInSlot));
          var index = slotOffset + indexInSlot | 0;
          if ($this.p1z_1($this.o1z_1, index)) {
            $this.r1z_1[slot] = slotMarks;
            return index;
          }
        }
        $this.r1z_1[slot] = slotMarks;
      }
       while (inductionVariable <= last);
    return -1;
  }
  function ElementMarker(descriptor, readIfAbsent) {
    Companion_getInstance_7();
    this.o1z_1 = descriptor;
    this.p1z_1 = readIfAbsent;
    var elementsCount = this.o1z_1.s1r();
    if (elementsCount <= 64) {
      var tmp = this;
      var tmp_0;
      if (elementsCount === 64) {
        tmp_0 = new Long(0, 0);
      } else {
        tmp_0 = (new Long(-1, -1)).f3(elementsCount);
      }
      tmp.q1z_1 = tmp_0;
      this.r1z_1 = Companion_getInstance_7().n1z_1;
    } else {
      this.q1z_1 = new Long(0, 0);
      this.r1z_1 = prepareHighMarksArray(this, elementsCount);
    }
  }
  protoOf(ElementMarker).s1z = function (index) {
    if (index < 64) {
      this.q1z_1 = this.q1z_1.j3((new Long(1, 0)).f3(index));
    } else {
      markHigh(this, index);
    }
  };
  protoOf(ElementMarker).t1z = function () {
    var elementsCount = this.o1z_1.s1r();
    while (!this.q1z_1.equals(new Long(-1, -1))) {
      var index = countTrailingZeroBits(this.q1z_1.e3());
      this.q1z_1 = this.q1z_1.j3((new Long(1, 0)).f3(index));
      if (this.p1z_1(this.o1z_1, index)) {
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
        descriptor.g20(element);
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
      var elementName = tmp0_elvis_lhs == null ? item.p2_1 : tmp0_elvis_lhs;
      descriptor.h20(elementName);
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
          descriptor.i20(element_0);
        }
      }
    }
    return EnumSerializer_init_$Create$(serialName, values, descriptor);
  }
  function EnumSerializer_init_$Init$(serialName, values, descriptor, $this) {
    EnumSerializer.call($this, serialName, values);
    $this.k20_1 = descriptor;
    return $this;
  }
  function EnumSerializer_init_$Create$(serialName, values, descriptor) {
    return EnumSerializer_init_$Init$(serialName, values, descriptor, objectCreate(protoOf(EnumSerializer)));
  }
  function createUnmarkedDescriptor($this, serialName) {
    var d = new EnumDescriptor(serialName, $this.j20_1.length);
    // Inline function 'kotlin.collections.forEach' call
    var indexedObject = $this.j20_1;
    var inductionVariable = 0;
    var last = indexedObject.length;
    while (inductionVariable < last) {
      var element = indexedObject[inductionVariable];
      inductionVariable = inductionVariable + 1 | 0;
      d.h20(element.p2_1);
    }
    return d;
  }
  function EnumSerializer$descriptor$delegate$lambda(this$0, $serialName) {
    return function () {
      var tmp0_elvis_lhs = this$0.k20_1;
      return tmp0_elvis_lhs == null ? createUnmarkedDescriptor(this$0, $serialName) : tmp0_elvis_lhs;
    };
  }
  function EnumSerializer(serialName, values) {
    this.j20_1 = values;
    this.k20_1 = null;
    var tmp = this;
    tmp.l20_1 = lazy_0(EnumSerializer$descriptor$delegate$lambda(this, serialName));
  }
  protoOf(EnumSerializer).d1q = function () {
    var tmp0 = this.l20_1;
    // Inline function 'kotlin.getValue' call
    descriptor$factory_1();
    return tmp0.w();
  };
  protoOf(EnumSerializer).m20 = function (encoder, value) {
    var index = indexOf(this.j20_1, value);
    if (index === -1) {
      throw SerializationException_init_$Create$_0(toString(value) + ' is not a valid enum ' + this.d1q().e1r() + ', ' + ('must be one of ' + contentToString(this.j20_1)));
    }
    encoder.r1u(this.d1q(), index);
  };
  protoOf(EnumSerializer).e1q = function (encoder, value) {
    return this.m20(encoder, value instanceof Enum ? value : THROW_CCE());
  };
  protoOf(EnumSerializer).f1q = function (decoder) {
    var index = decoder.i1t(this.d1q());
    if (!(0 <= index ? index <= (this.j20_1.length - 1 | 0) : false)) {
      throw SerializationException_init_$Create$_0('' + index + ' is not among valid ' + this.d1q().e1r() + ' enum values, ' + ('values size is ' + this.j20_1.length));
    }
    return this.j20_1[index];
  };
  protoOf(EnumSerializer).toString = function () {
    return 'kotlinx.serialization.internal.EnumSerializer<' + this.d1q().e1r() + '>';
  };
  function _get_elementDescriptors__y23q9p($this) {
    var tmp0 = $this.a21_1;
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
        tmp_1[tmp_2] = buildSerialDescriptor($name + '.' + this$0.u1r(tmp_2), OBJECT_getInstance(), []);
        tmp = tmp + 1 | 0;
      }
      return tmp_1;
    };
  }
  function EnumDescriptor(name, elementsCount) {
    PluginGeneratedSerialDescriptor.call(this, name, VOID, elementsCount);
    this.z20_1 = ENUM_getInstance();
    var tmp = this;
    tmp.a21_1 = lazy_0(EnumDescriptor$elementDescriptors$delegate$lambda(elementsCount, name, this));
  }
  protoOf(EnumDescriptor).q1r = function () {
    return this.z20_1;
  };
  protoOf(EnumDescriptor).x1r = function (index) {
    return getChecked(_get_elementDescriptors__y23q9p(this), index);
  };
  protoOf(EnumDescriptor).equals = function (other) {
    if (this === other)
      return true;
    if (other == null)
      return false;
    if (!(!(other == null) ? isInterface(other, SerialDescriptor) : false))
      return false;
    if (!(other.q1r() === ENUM_getInstance()))
      return false;
    if (!(this.e1r() === other.e1r()))
      return false;
    if (!equals(cachedSerialNames(this), cachedSerialNames(other)))
      return false;
    return true;
  };
  protoOf(EnumDescriptor).toString = function () {
    return joinToString(get_elementNames(this), ', ', this.e1r() + '(', ')');
  };
  protoOf(EnumDescriptor).hashCode = function () {
    var result = getStringHashCode(this.e1r());
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
      return receiver.d1q();
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
    this.p21_1 = true;
  }
  protoOf(InlineClassDescriptor).r1r = function () {
    return this.p21_1;
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
      if (!(this.e1r() === other.e1r())) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      if (!(other.p21_1 && contentEquals(this.b21(), other.b21()))) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      if (!(this.s1r() === other.s1r())) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      var inductionVariable = 0;
      var last = this.s1r();
      if (inductionVariable < last)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          if (!(this.x1r(index).e1r() === other.x1r(index).e1r())) {
            tmp$ret$0 = false;
            break $l$block_5;
          }
          if (!equals(this.x1r(index).q1r(), other.x1r(index).q1r())) {
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
    this.q21_1 = $primitiveSerializer;
  }
  protoOf(InlinePrimitiveDescriptor$1).r21 = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [this.q21_1];
  };
  protoOf(InlinePrimitiveDescriptor$1).d1q = function () {
    var message = 'unsupported';
    throw IllegalStateException_init_$Create$(toString(message));
  };
  protoOf(InlinePrimitiveDescriptor$1).e1q = function (encoder, value) {
    // Inline function 'kotlin.error' call
    var message = 'unsupported';
    throw IllegalStateException_init_$Create$(toString(message));
  };
  protoOf(InlinePrimitiveDescriptor$1).f1q = function (decoder) {
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
    this.t21_1 = EmptySerializersModule_0();
  }
  protoOf(NoOpEncoder).b1u = function () {
    return this.t21_1;
  };
  protoOf(NoOpEncoder).g1u = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).h1u = function () {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).i1u = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).j1u = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).k1u = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).l1u = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).m1u = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).n1u = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).o1u = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).p1u = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).q1u = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).r1u = function (enumDescriptor, index) {
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
    this.u21_1 = OBJECT_getInstance();
    this.v21_1 = 'kotlin.Nothing';
  }
  protoOf(NothingSerialDescriptor).q1r = function () {
    return this.u21_1;
  };
  protoOf(NothingSerialDescriptor).e1r = function () {
    return this.v21_1;
  };
  protoOf(NothingSerialDescriptor).s1r = function () {
    return 0;
  };
  protoOf(NothingSerialDescriptor).u1r = function (index) {
    error(this);
  };
  protoOf(NothingSerialDescriptor).v1r = function (name) {
    error(this);
  };
  protoOf(NothingSerialDescriptor).y1r = function (index) {
    error(this);
  };
  protoOf(NothingSerialDescriptor).x1r = function (index) {
    error(this);
  };
  protoOf(NothingSerialDescriptor).w1r = function (index) {
    error(this);
  };
  protoOf(NothingSerialDescriptor).toString = function () {
    return 'NothingSerialDescriptor';
  };
  protoOf(NothingSerialDescriptor).equals = function (other) {
    return this === other;
  };
  protoOf(NothingSerialDescriptor).hashCode = function () {
    return getStringHashCode(this.v21_1) + imul(31, this.u21_1.hashCode()) | 0;
  };
  var NothingSerialDescriptor_instance;
  function NothingSerialDescriptor_getInstance() {
    if (NothingSerialDescriptor_instance == null)
      new NothingSerialDescriptor();
    return NothingSerialDescriptor_instance;
  }
  function NullableSerializer(serializer) {
    this.w21_1 = serializer;
    this.x21_1 = new SerialDescriptorForNullable(this.w21_1.d1q());
  }
  protoOf(NullableSerializer).d1q = function () {
    return this.x21_1;
  };
  protoOf(NullableSerializer).y21 = function (encoder, value) {
    if (!(value == null)) {
      encoder.h1v();
      encoder.e1v(this.w21_1, value);
    } else {
      encoder.h1u();
    }
  };
  protoOf(NullableSerializer).e1q = function (encoder, value) {
    return this.y21(encoder, (value == null ? true : !(value == null)) ? value : THROW_CCE());
  };
  protoOf(NullableSerializer).f1q = function (decoder) {
    return decoder.x1s() ? decoder.l1t(this.w21_1) : decoder.y1s();
  };
  protoOf(NullableSerializer).equals = function (other) {
    if (this === other)
      return true;
    if (other == null || !getKClassFromExpression(this).equals(getKClassFromExpression(other)))
      return false;
    if (!(other instanceof NullableSerializer))
      THROW_CCE();
    if (!equals(this.w21_1, other.w21_1))
      return false;
    return true;
  };
  protoOf(NullableSerializer).hashCode = function () {
    return hashCode(this.w21_1);
  };
  function SerialDescriptorForNullable(original) {
    this.z1r_1 = original;
    this.a1s_1 = this.z1r_1.e1r() + '?';
    this.b1s_1 = cachedSerialNames(this.z1r_1);
  }
  protoOf(SerialDescriptorForNullable).e1r = function () {
    return this.a1s_1;
  };
  protoOf(SerialDescriptorForNullable).v1s = function () {
    return this.b1s_1;
  };
  protoOf(SerialDescriptorForNullable).m1r = function () {
    return true;
  };
  protoOf(SerialDescriptorForNullable).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof SerialDescriptorForNullable))
      return false;
    if (!equals(this.z1r_1, other.z1r_1))
      return false;
    return true;
  };
  protoOf(SerialDescriptorForNullable).toString = function () {
    return toString(this.z1r_1) + '?';
  };
  protoOf(SerialDescriptorForNullable).hashCode = function () {
    return imul(hashCode(this.z1r_1), 31);
  };
  protoOf(SerialDescriptorForNullable).q1r = function () {
    return this.z1r_1.q1r();
  };
  protoOf(SerialDescriptorForNullable).r1r = function () {
    return this.z1r_1.r1r();
  };
  protoOf(SerialDescriptorForNullable).s1r = function () {
    return this.z1r_1.s1r();
  };
  protoOf(SerialDescriptorForNullable).t1r = function () {
    return this.z1r_1.t1r();
  };
  protoOf(SerialDescriptorForNullable).u1r = function (index) {
    return this.z1r_1.u1r(index);
  };
  protoOf(SerialDescriptorForNullable).v1r = function (name) {
    return this.z1r_1.v1r(name);
  };
  protoOf(SerialDescriptorForNullable).w1r = function (index) {
    return this.z1r_1.w1r(index);
  };
  protoOf(SerialDescriptorForNullable).x1r = function (index) {
    return this.z1r_1.x1r(index);
  };
  protoOf(SerialDescriptorForNullable).y1r = function (index) {
    return this.z1r_1.y1r(index);
  };
  function ObjectSerializer_init_$Init$(serialName, objectInstance, classAnnotations, $this) {
    ObjectSerializer.call($this, serialName, objectInstance);
    $this.a22_1 = asList(classAnnotations);
    return $this;
  }
  function ObjectSerializer_init_$Create$(serialName, objectInstance, classAnnotations) {
    return ObjectSerializer_init_$Init$(serialName, objectInstance, classAnnotations, objectCreate(protoOf(ObjectSerializer)));
  }
  function ObjectSerializer$descriptor$delegate$lambda$lambda(this$0) {
    return function ($this$buildSerialDescriptor) {
      $this$buildSerialDescriptor.i1q_1 = this$0.a22_1;
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
    this.z21_1 = objectInstance;
    this.a22_1 = emptyList();
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp.b22_1 = lazy(tmp_0, ObjectSerializer$descriptor$delegate$lambda(serialName, this));
  }
  protoOf(ObjectSerializer).d1q = function () {
    var tmp0 = this.b22_1;
    // Inline function 'kotlin.getValue' call
    descriptor$factory_2();
    return tmp0.w();
  };
  protoOf(ObjectSerializer).t1q = function (encoder, value) {
    encoder.m1t(this.d1q()).n1t(this.d1q());
  };
  protoOf(ObjectSerializer).e1q = function (encoder, value) {
    return this.t1q(encoder, !(value == null) ? value : THROW_CCE());
  };
  protoOf(ObjectSerializer).f1q = function (decoder) {
    // Inline function 'kotlinx.serialization.encoding.decodeStructure' call
    var descriptor = this.d1q();
    var composite = decoder.m1t(descriptor);
    var tmp$ret$0;
    $l$block_0: {
      if (composite.c1u()) {
        tmp$ret$0 = Unit_instance;
        break $l$block_0;
      }
      var index = composite.d1u(this.d1q());
      if (index === -1) {
        tmp$ret$0 = Unit_instance;
        break $l$block_0;
      } else
        throw SerializationException_init_$Create$_0('Unexpected index ' + index);
    }
    var result = tmp$ret$0;
    composite.n1t(descriptor);
    return this.z21_1;
  };
  function descriptor$factory_2() {
    return getPropertyCallableRef('descriptor', 1, KProperty1, function (receiver) {
      return receiver.d1q();
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
      return _this__u8e3s4.v1s();
    var result = HashSet_init_$Create$_1(_this__u8e3s4.s1r());
    var inductionVariable = 0;
    var last = _this__u8e3s4.s1r();
    if (inductionVariable < last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'kotlin.collections.plusAssign' call
        var element = _this__u8e3s4.u1r(i);
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
          var element = descriptor.u1r(i);
          missingFields.e(element);
        }
        missingFieldsBits = missingFieldsBits >>> 1 | 0;
      }
       while (inductionVariable < 32);
    throw MissingFieldException_init_$Create$(missingFields, descriptor.e1r());
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
                var element = descriptor.u1r(imul(maskSlot, 32) + i | 0);
                missingFields.e(element);
              }
              missingFieldsBits = missingFieldsBits >>> 1 | 0;
            }
             while (inductionVariable_0 < 32);
        }
      }
       while (inductionVariable <= last);
    throw MissingFieldException_init_$Create$(missingFields, descriptor.e1r());
  }
  function hashCodeImpl(_this__u8e3s4, typeParams) {
    var result = getStringHashCode(_this__u8e3s4.e1r());
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
      var tmp0_safe_receiver = element.e1r();
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
      var tmp0_safe_receiver_0 = element_0.q1r();
      var tmp1_elvis_lhs_0 = tmp0_safe_receiver_0 == null ? null : hashCode(tmp0_safe_receiver_0);
      accumulator_0 = tmp_0 + (tmp1_elvis_lhs_0 == null ? 0 : tmp1_elvis_lhs_0) | 0;
    }
    var kindHash = accumulator_0;
    result = imul(31, result) + namesHash | 0;
    result = imul(31, result) + kindHash | 0;
    return result;
  }
  function _get_childSerializers__7vnyfa($this) {
    var tmp0 = $this.d20_1;
    // Inline function 'kotlin.getValue' call
    childSerializers$factory();
    return tmp0.w();
  }
  function _get__hashCode__tgwhef_0($this) {
    var tmp0 = $this.f20_1;
    // Inline function 'kotlin.getValue' call
    _hashCode$factory_0();
    return tmp0.w();
  }
  function buildIndices($this) {
    var indices = HashMap_init_$Create$();
    var inductionVariable = 0;
    var last = $this.y1z_1.length - 1 | 0;
    if (inductionVariable <= last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'kotlin.collections.set' call
        var key = $this.y1z_1[i];
        indices.m2(key, i);
      }
       while (inductionVariable <= last);
    return indices;
  }
  function PluginGeneratedSerialDescriptor$childSerializers$delegate$lambda(this$0) {
    return function () {
      var tmp0_safe_receiver = this$0.v1z_1;
      var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.r21();
      return tmp1_elvis_lhs == null ? get_EMPTY_SERIALIZER_ARRAY() : tmp1_elvis_lhs;
    };
  }
  function PluginGeneratedSerialDescriptor$typeParameterDescriptors$delegate$lambda(this$0) {
    return function () {
      var tmp0_safe_receiver = this$0.v1z_1;
      var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.s21();
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
          var tmp$ret$0 = item.d1q();
          destination.e(tmp$ret$0);
        }
        tmp = destination;
      }
      return compactArray(tmp);
    };
  }
  function PluginGeneratedSerialDescriptor$_hashCode$delegate$lambda(this$0) {
    return function () {
      return hashCodeImpl(this$0, this$0.b21());
    };
  }
  function PluginGeneratedSerialDescriptor$toString$lambda(this$0) {
    return function (i) {
      return this$0.u1r(i) + ': ' + this$0.x1r(i).e1r();
    };
  }
  function PluginGeneratedSerialDescriptor(serialName, generatedSerializer, elementsCount) {
    generatedSerializer = generatedSerializer === VOID ? null : generatedSerializer;
    this.u1z_1 = serialName;
    this.v1z_1 = generatedSerializer;
    this.w1z_1 = elementsCount;
    this.x1z_1 = -1;
    var tmp = this;
    var tmp_0 = 0;
    var tmp_1 = this.w1z_1;
    // Inline function 'kotlin.arrayOfNulls' call
    var tmp_2 = Array(tmp_1);
    while (tmp_0 < tmp_1) {
      tmp_2[tmp_0] = '[UNINITIALIZED]';
      tmp_0 = tmp_0 + 1 | 0;
    }
    tmp.y1z_1 = tmp_2;
    var tmp_3 = this;
    // Inline function 'kotlin.arrayOfNulls' call
    var size = this.w1z_1;
    tmp_3.z1z_1 = Array(size);
    this.a20_1 = null;
    this.b20_1 = booleanArray(this.w1z_1);
    this.c20_1 = emptyMap();
    var tmp_4 = this;
    var tmp_5 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp_4.d20_1 = lazy(tmp_5, PluginGeneratedSerialDescriptor$childSerializers$delegate$lambda(this));
    var tmp_6 = this;
    var tmp_7 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp_6.e20_1 = lazy(tmp_7, PluginGeneratedSerialDescriptor$typeParameterDescriptors$delegate$lambda(this));
    var tmp_8 = this;
    var tmp_9 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp_8.f20_1 = lazy(tmp_9, PluginGeneratedSerialDescriptor$_hashCode$delegate$lambda(this));
  }
  protoOf(PluginGeneratedSerialDescriptor).e1r = function () {
    return this.u1z_1;
  };
  protoOf(PluginGeneratedSerialDescriptor).s1r = function () {
    return this.w1z_1;
  };
  protoOf(PluginGeneratedSerialDescriptor).q1r = function () {
    return CLASS_getInstance();
  };
  protoOf(PluginGeneratedSerialDescriptor).t1r = function () {
    var tmp0_elvis_lhs = this.a20_1;
    return tmp0_elvis_lhs == null ? emptyList() : tmp0_elvis_lhs;
  };
  protoOf(PluginGeneratedSerialDescriptor).v1s = function () {
    return this.c20_1.k2();
  };
  protoOf(PluginGeneratedSerialDescriptor).b21 = function () {
    var tmp0 = this.e20_1;
    // Inline function 'kotlin.getValue' call
    typeParameterDescriptors$factory();
    return tmp0.w();
  };
  protoOf(PluginGeneratedSerialDescriptor).c21 = function (name, isOptional) {
    this.x1z_1 = this.x1z_1 + 1 | 0;
    this.y1z_1[this.x1z_1] = name;
    this.b20_1[this.x1z_1] = isOptional;
    this.z1z_1[this.x1z_1] = null;
    if (this.x1z_1 === (this.w1z_1 - 1 | 0)) {
      this.c20_1 = buildIndices(this);
    }
  };
  protoOf(PluginGeneratedSerialDescriptor).h20 = function (name, isOptional, $super) {
    isOptional = isOptional === VOID ? false : isOptional;
    var tmp;
    if ($super === VOID) {
      this.c21(name, isOptional);
      tmp = Unit_instance;
    } else {
      tmp = $super.c21.call(this, name, isOptional);
    }
    return tmp;
  };
  protoOf(PluginGeneratedSerialDescriptor).i20 = function (annotation) {
    // Inline function 'kotlin.let' call
    var it = this.z1z_1[this.x1z_1];
    var tmp;
    if (it == null) {
      var result = ArrayList_init_$Create$(1);
      this.z1z_1[this.x1z_1] = result;
      tmp = result;
    } else {
      tmp = it;
    }
    var list = tmp;
    list.e(annotation);
  };
  protoOf(PluginGeneratedSerialDescriptor).g20 = function (a) {
    if (this.a20_1 == null) {
      this.a20_1 = ArrayList_init_$Create$(1);
    }
    ensureNotNull(this.a20_1).e(a);
  };
  protoOf(PluginGeneratedSerialDescriptor).x1r = function (index) {
    return getChecked(_get_childSerializers__7vnyfa(this), index).d1q();
  };
  protoOf(PluginGeneratedSerialDescriptor).y1r = function (index) {
    return getChecked_0(this.b20_1, index);
  };
  protoOf(PluginGeneratedSerialDescriptor).w1r = function (index) {
    var tmp0_elvis_lhs = getChecked(this.z1z_1, index);
    return tmp0_elvis_lhs == null ? emptyList() : tmp0_elvis_lhs;
  };
  protoOf(PluginGeneratedSerialDescriptor).u1r = function (index) {
    return getChecked(this.y1z_1, index);
  };
  protoOf(PluginGeneratedSerialDescriptor).v1r = function (name) {
    var tmp0_elvis_lhs = this.c20_1.j2(name);
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
      if (!(this.e1r() === other.e1r())) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      if (!contentEquals(this.b21(), other.b21())) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      if (!(this.s1r() === other.s1r())) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      var inductionVariable = 0;
      var last = this.s1r();
      if (inductionVariable < last)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          if (!(this.x1r(index).e1r() === other.x1r(index).e1r())) {
            tmp$ret$0 = false;
            break $l$block_5;
          }
          if (!equals(this.x1r(index).q1r(), other.x1r(index).q1r())) {
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
    var tmp = until(0, this.w1z_1);
    var tmp_0 = this.e1r() + '(';
    return joinToString(tmp, ', ', tmp_0, ')', VOID, VOID, PluginGeneratedSerialDescriptor$toString$lambda(this));
  };
  function childSerializers$factory() {
    return getPropertyCallableRef('childSerializers', 1, KProperty1, function (receiver) {
      return _get_childSerializers__7vnyfa(receiver);
    }, null);
  }
  function typeParameterDescriptors$factory() {
    return getPropertyCallableRef('typeParameterDescriptors', 1, KProperty1, function (receiver) {
      return receiver.b21();
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
  protoOf(CharArraySerializer_0).f22 = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(CharArraySerializer_0).x1x = function (_this__u8e3s4) {
    return this.f22((!(_this__u8e3s4 == null) ? isCharArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(CharArraySerializer_0).g22 = function (_this__u8e3s4) {
    return new CharArrayBuilder(_this__u8e3s4);
  };
  protoOf(CharArraySerializer_0).s1w = function (_this__u8e3s4) {
    return this.g22((!(_this__u8e3s4 == null) ? isCharArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(CharArraySerializer_0).i1z = function () {
    return charArray(0);
  };
  protoOf(CharArraySerializer_0).h22 = function (decoder, index, builder, checkIndex) {
    builder.k22(decoder.v1t(this.z1y_1, index));
  };
  protoOf(CharArraySerializer_0).d1x = function (decoder, index, builder, checkIndex) {
    return this.h22(decoder, index, builder instanceof CharArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(CharArraySerializer_0).j1z = function (decoder, index, builder, checkIndex) {
    return this.h22(decoder, index, builder instanceof CharArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(CharArraySerializer_0).l22 = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.a1v(this.z1y_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(CharArraySerializer_0).k1z = function (encoder, content, size) {
    return this.l22(encoder, (!(content == null) ? isCharArray(content) : false) ? content : THROW_CCE(), size);
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
  protoOf(DoubleArraySerializer_0).o22 = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(DoubleArraySerializer_0).x1x = function (_this__u8e3s4) {
    return this.o22((!(_this__u8e3s4 == null) ? isDoubleArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(DoubleArraySerializer_0).p22 = function (_this__u8e3s4) {
    return new DoubleArrayBuilder(_this__u8e3s4);
  };
  protoOf(DoubleArraySerializer_0).s1w = function (_this__u8e3s4) {
    return this.p22((!(_this__u8e3s4 == null) ? isDoubleArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(DoubleArraySerializer_0).i1z = function () {
    return new Float64Array(0);
  };
  protoOf(DoubleArraySerializer_0).q22 = function (decoder, index, builder, checkIndex) {
    builder.t22(decoder.u1t(this.z1y_1, index));
  };
  protoOf(DoubleArraySerializer_0).d1x = function (decoder, index, builder, checkIndex) {
    return this.q22(decoder, index, builder instanceof DoubleArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(DoubleArraySerializer_0).j1z = function (decoder, index, builder, checkIndex) {
    return this.q22(decoder, index, builder instanceof DoubleArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(DoubleArraySerializer_0).u22 = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.z1u(this.z1y_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(DoubleArraySerializer_0).k1z = function (encoder, content, size) {
    return this.u22(encoder, (!(content == null) ? isDoubleArray(content) : false) ? content : THROW_CCE(), size);
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
  protoOf(FloatArraySerializer_0).x22 = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(FloatArraySerializer_0).x1x = function (_this__u8e3s4) {
    return this.x22((!(_this__u8e3s4 == null) ? isFloatArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(FloatArraySerializer_0).y22 = function (_this__u8e3s4) {
    return new FloatArrayBuilder(_this__u8e3s4);
  };
  protoOf(FloatArraySerializer_0).s1w = function (_this__u8e3s4) {
    return this.y22((!(_this__u8e3s4 == null) ? isFloatArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(FloatArraySerializer_0).i1z = function () {
    return new Float32Array(0);
  };
  protoOf(FloatArraySerializer_0).z22 = function (decoder, index, builder, checkIndex) {
    builder.c23(decoder.t1t(this.z1y_1, index));
  };
  protoOf(FloatArraySerializer_0).d1x = function (decoder, index, builder, checkIndex) {
    return this.z22(decoder, index, builder instanceof FloatArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(FloatArraySerializer_0).j1z = function (decoder, index, builder, checkIndex) {
    return this.z22(decoder, index, builder instanceof FloatArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(FloatArraySerializer_0).d23 = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.y1u(this.z1y_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(FloatArraySerializer_0).k1z = function (encoder, content, size) {
    return this.d23(encoder, (!(content == null) ? isFloatArray(content) : false) ? content : THROW_CCE(), size);
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
  protoOf(LongArraySerializer_0).g23 = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(LongArraySerializer_0).x1x = function (_this__u8e3s4) {
    return this.g23((!(_this__u8e3s4 == null) ? isLongArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LongArraySerializer_0).h23 = function (_this__u8e3s4) {
    return new LongArrayBuilder(_this__u8e3s4);
  };
  protoOf(LongArraySerializer_0).s1w = function (_this__u8e3s4) {
    return this.h23((!(_this__u8e3s4 == null) ? isLongArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LongArraySerializer_0).i1z = function () {
    return longArray(0);
  };
  protoOf(LongArraySerializer_0).i23 = function (decoder, index, builder, checkIndex) {
    builder.l23(decoder.s1t(this.z1y_1, index));
  };
  protoOf(LongArraySerializer_0).d1x = function (decoder, index, builder, checkIndex) {
    return this.i23(decoder, index, builder instanceof LongArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(LongArraySerializer_0).j1z = function (decoder, index, builder, checkIndex) {
    return this.i23(decoder, index, builder instanceof LongArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(LongArraySerializer_0).m23 = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.x1u(this.z1y_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(LongArraySerializer_0).k1z = function (encoder, content, size) {
    return this.m23(encoder, (!(content == null) ? isLongArray(content) : false) ? content : THROW_CCE(), size);
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
  protoOf(ULongArraySerializer_0).p23 = function (_this__u8e3s4) {
    return _ULongArray___get_size__impl__ju6dtr(_this__u8e3s4);
  };
  protoOf(ULongArraySerializer_0).x1x = function (_this__u8e3s4) {
    return this.p23(_this__u8e3s4 instanceof ULongArray ? _this__u8e3s4.rn_1 : THROW_CCE());
  };
  protoOf(ULongArraySerializer_0).q23 = function (_this__u8e3s4) {
    return new ULongArrayBuilder(_this__u8e3s4);
  };
  protoOf(ULongArraySerializer_0).s1w = function (_this__u8e3s4) {
    return this.q23(_this__u8e3s4 instanceof ULongArray ? _this__u8e3s4.rn_1 : THROW_CCE());
  };
  protoOf(ULongArraySerializer_0).r23 = function () {
    return _ULongArray___init__impl__twm1l3(0);
  };
  protoOf(ULongArraySerializer_0).i1z = function () {
    return new ULongArray(this.r23());
  };
  protoOf(ULongArraySerializer_0).s23 = function (decoder, index, builder, checkIndex) {
    // Inline function 'kotlin.toULong' call
    var this_0 = decoder.x1t(this.z1y_1, index).d1t();
    var tmp$ret$0 = _ULong___init__impl__c78o9k(this_0);
    builder.v23(tmp$ret$0);
  };
  protoOf(ULongArraySerializer_0).d1x = function (decoder, index, builder, checkIndex) {
    return this.s23(decoder, index, builder instanceof ULongArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(ULongArraySerializer_0).j1z = function (decoder, index, builder, checkIndex) {
    return this.s23(decoder, index, builder instanceof ULongArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(ULongArraySerializer_0).w23 = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var tmp = encoder.c1v(this.z1y_1, i);
        // Inline function 'kotlin.ULong.toLong' call
        var this_0 = ULongArray__get_impl_pr71q9(content, i);
        var tmp$ret$0 = _ULong___get_data__impl__fggpzb(this_0);
        tmp.m1u(tmp$ret$0);
      }
       while (inductionVariable < size);
  };
  protoOf(ULongArraySerializer_0).k1z = function (encoder, content, size) {
    return this.w23(encoder, content instanceof ULongArray ? content.rn_1 : THROW_CCE(), size);
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
  protoOf(IntArraySerializer_0).z23 = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(IntArraySerializer_0).x1x = function (_this__u8e3s4) {
    return this.z23((!(_this__u8e3s4 == null) ? isIntArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(IntArraySerializer_0).a24 = function (_this__u8e3s4) {
    return new IntArrayBuilder(_this__u8e3s4);
  };
  protoOf(IntArraySerializer_0).s1w = function (_this__u8e3s4) {
    return this.a24((!(_this__u8e3s4 == null) ? isIntArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(IntArraySerializer_0).i1z = function () {
    return new Int32Array(0);
  };
  protoOf(IntArraySerializer_0).b24 = function (decoder, index, builder, checkIndex) {
    builder.e24(decoder.r1t(this.z1y_1, index));
  };
  protoOf(IntArraySerializer_0).d1x = function (decoder, index, builder, checkIndex) {
    return this.b24(decoder, index, builder instanceof IntArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(IntArraySerializer_0).j1z = function (decoder, index, builder, checkIndex) {
    return this.b24(decoder, index, builder instanceof IntArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(IntArraySerializer_0).f24 = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.w1u(this.z1y_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(IntArraySerializer_0).k1z = function (encoder, content, size) {
    return this.f24(encoder, (!(content == null) ? isIntArray(content) : false) ? content : THROW_CCE(), size);
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
  protoOf(UIntArraySerializer_0).i24 = function (_this__u8e3s4) {
    return _UIntArray___get_size__impl__r6l8ci(_this__u8e3s4);
  };
  protoOf(UIntArraySerializer_0).x1x = function (_this__u8e3s4) {
    return this.i24(_this__u8e3s4 instanceof UIntArray ? _this__u8e3s4.fn_1 : THROW_CCE());
  };
  protoOf(UIntArraySerializer_0).j24 = function (_this__u8e3s4) {
    return new UIntArrayBuilder(_this__u8e3s4);
  };
  protoOf(UIntArraySerializer_0).s1w = function (_this__u8e3s4) {
    return this.j24(_this__u8e3s4 instanceof UIntArray ? _this__u8e3s4.fn_1 : THROW_CCE());
  };
  protoOf(UIntArraySerializer_0).k24 = function () {
    return _UIntArray___init__impl__ghjpc6(0);
  };
  protoOf(UIntArraySerializer_0).i1z = function () {
    return new UIntArray(this.k24());
  };
  protoOf(UIntArraySerializer_0).l24 = function (decoder, index, builder, checkIndex) {
    // Inline function 'kotlin.toUInt' call
    var this_0 = decoder.x1t(this.z1y_1, index).c1t();
    var tmp$ret$0 = _UInt___init__impl__l7qpdl(this_0);
    builder.o24(tmp$ret$0);
  };
  protoOf(UIntArraySerializer_0).d1x = function (decoder, index, builder, checkIndex) {
    return this.l24(decoder, index, builder instanceof UIntArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(UIntArraySerializer_0).j1z = function (decoder, index, builder, checkIndex) {
    return this.l24(decoder, index, builder instanceof UIntArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(UIntArraySerializer_0).p24 = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var tmp = encoder.c1v(this.z1y_1, i);
        // Inline function 'kotlin.UInt.toInt' call
        var this_0 = UIntArray__get_impl_gp5kza(content, i);
        var tmp$ret$0 = _UInt___get_data__impl__f0vqqw(this_0);
        tmp.l1u(tmp$ret$0);
      }
       while (inductionVariable < size);
  };
  protoOf(UIntArraySerializer_0).k1z = function (encoder, content, size) {
    return this.p24(encoder, content instanceof UIntArray ? content.fn_1 : THROW_CCE(), size);
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
  protoOf(ShortArraySerializer_0).s24 = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(ShortArraySerializer_0).x1x = function (_this__u8e3s4) {
    return this.s24((!(_this__u8e3s4 == null) ? isShortArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ShortArraySerializer_0).t24 = function (_this__u8e3s4) {
    return new ShortArrayBuilder(_this__u8e3s4);
  };
  protoOf(ShortArraySerializer_0).s1w = function (_this__u8e3s4) {
    return this.t24((!(_this__u8e3s4 == null) ? isShortArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ShortArraySerializer_0).i1z = function () {
    return new Int16Array(0);
  };
  protoOf(ShortArraySerializer_0).u24 = function (decoder, index, builder, checkIndex) {
    builder.x24(decoder.q1t(this.z1y_1, index));
  };
  protoOf(ShortArraySerializer_0).d1x = function (decoder, index, builder, checkIndex) {
    return this.u24(decoder, index, builder instanceof ShortArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(ShortArraySerializer_0).j1z = function (decoder, index, builder, checkIndex) {
    return this.u24(decoder, index, builder instanceof ShortArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(ShortArraySerializer_0).y24 = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.v1u(this.z1y_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(ShortArraySerializer_0).k1z = function (encoder, content, size) {
    return this.y24(encoder, (!(content == null) ? isShortArray(content) : false) ? content : THROW_CCE(), size);
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
  protoOf(UShortArraySerializer_0).b25 = function (_this__u8e3s4) {
    return _UShortArray___get_size__impl__jqto1b(_this__u8e3s4);
  };
  protoOf(UShortArraySerializer_0).x1x = function (_this__u8e3s4) {
    return this.b25(_this__u8e3s4 instanceof UShortArray ? _this__u8e3s4.do_1 : THROW_CCE());
  };
  protoOf(UShortArraySerializer_0).c25 = function (_this__u8e3s4) {
    return new UShortArrayBuilder(_this__u8e3s4);
  };
  protoOf(UShortArraySerializer_0).s1w = function (_this__u8e3s4) {
    return this.c25(_this__u8e3s4 instanceof UShortArray ? _this__u8e3s4.do_1 : THROW_CCE());
  };
  protoOf(UShortArraySerializer_0).d25 = function () {
    return _UShortArray___init__impl__9b26ef(0);
  };
  protoOf(UShortArraySerializer_0).i1z = function () {
    return new UShortArray(this.d25());
  };
  protoOf(UShortArraySerializer_0).e25 = function (decoder, index, builder, checkIndex) {
    // Inline function 'kotlin.toUShort' call
    var this_0 = decoder.x1t(this.z1y_1, index).b1t();
    var tmp$ret$0 = _UShort___init__impl__jigrne(this_0);
    builder.h25(tmp$ret$0);
  };
  protoOf(UShortArraySerializer_0).d1x = function (decoder, index, builder, checkIndex) {
    return this.e25(decoder, index, builder instanceof UShortArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(UShortArraySerializer_0).j1z = function (decoder, index, builder, checkIndex) {
    return this.e25(decoder, index, builder instanceof UShortArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(UShortArraySerializer_0).i25 = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var tmp = encoder.c1v(this.z1y_1, i);
        // Inline function 'kotlin.UShort.toShort' call
        var this_0 = UShortArray__get_impl_fnbhmx(content, i);
        var tmp$ret$0 = _UShort___get_data__impl__g0245(this_0);
        tmp.k1u(tmp$ret$0);
      }
       while (inductionVariable < size);
  };
  protoOf(UShortArraySerializer_0).k1z = function (encoder, content, size) {
    return this.i25(encoder, content instanceof UShortArray ? content.do_1 : THROW_CCE(), size);
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
  protoOf(ByteArraySerializer_0).l25 = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(ByteArraySerializer_0).x1x = function (_this__u8e3s4) {
    return this.l25((!(_this__u8e3s4 == null) ? isByteArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ByteArraySerializer_0).m25 = function (_this__u8e3s4) {
    return new ByteArrayBuilder(_this__u8e3s4);
  };
  protoOf(ByteArraySerializer_0).s1w = function (_this__u8e3s4) {
    return this.m25((!(_this__u8e3s4 == null) ? isByteArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ByteArraySerializer_0).i1z = function () {
    return new Int8Array(0);
  };
  protoOf(ByteArraySerializer_0).n25 = function (decoder, index, builder, checkIndex) {
    builder.q25(decoder.p1t(this.z1y_1, index));
  };
  protoOf(ByteArraySerializer_0).d1x = function (decoder, index, builder, checkIndex) {
    return this.n25(decoder, index, builder instanceof ByteArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(ByteArraySerializer_0).j1z = function (decoder, index, builder, checkIndex) {
    return this.n25(decoder, index, builder instanceof ByteArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(ByteArraySerializer_0).r25 = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.u1u(this.z1y_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(ByteArraySerializer_0).k1z = function (encoder, content, size) {
    return this.r25(encoder, (!(content == null) ? isByteArray(content) : false) ? content : THROW_CCE(), size);
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
  protoOf(UByteArraySerializer_0).u25 = function (_this__u8e3s4) {
    return _UByteArray___get_size__impl__h6pkdv(_this__u8e3s4);
  };
  protoOf(UByteArraySerializer_0).x1x = function (_this__u8e3s4) {
    return this.u25(_this__u8e3s4 instanceof UByteArray ? _this__u8e3s4.tm_1 : THROW_CCE());
  };
  protoOf(UByteArraySerializer_0).v25 = function (_this__u8e3s4) {
    return new UByteArrayBuilder(_this__u8e3s4);
  };
  protoOf(UByteArraySerializer_0).s1w = function (_this__u8e3s4) {
    return this.v25(_this__u8e3s4 instanceof UByteArray ? _this__u8e3s4.tm_1 : THROW_CCE());
  };
  protoOf(UByteArraySerializer_0).w25 = function () {
    return _UByteArray___init__impl__ip4y9n(0);
  };
  protoOf(UByteArraySerializer_0).i1z = function () {
    return new UByteArray(this.w25());
  };
  protoOf(UByteArraySerializer_0).x25 = function (decoder, index, builder, checkIndex) {
    // Inline function 'kotlin.toUByte' call
    var this_0 = decoder.x1t(this.z1y_1, index).a1t();
    var tmp$ret$0 = _UByte___init__impl__g9hnc4(this_0);
    builder.a26(tmp$ret$0);
  };
  protoOf(UByteArraySerializer_0).d1x = function (decoder, index, builder, checkIndex) {
    return this.x25(decoder, index, builder instanceof UByteArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(UByteArraySerializer_0).j1z = function (decoder, index, builder, checkIndex) {
    return this.x25(decoder, index, builder instanceof UByteArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(UByteArraySerializer_0).b26 = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var tmp = encoder.c1v(this.z1y_1, i);
        // Inline function 'kotlin.UByte.toByte' call
        var this_0 = UByteArray__get_impl_t5f3hv(content, i);
        var tmp$ret$0 = _UByte___get_data__impl__jof9qr(this_0);
        tmp.j1u(tmp$ret$0);
      }
       while (inductionVariable < size);
  };
  protoOf(UByteArraySerializer_0).k1z = function (encoder, content, size) {
    return this.b26(encoder, content instanceof UByteArray ? content.tm_1 : THROW_CCE(), size);
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
  protoOf(BooleanArraySerializer_0).e26 = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(BooleanArraySerializer_0).x1x = function (_this__u8e3s4) {
    return this.e26((!(_this__u8e3s4 == null) ? isBooleanArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(BooleanArraySerializer_0).f26 = function (_this__u8e3s4) {
    return new BooleanArrayBuilder(_this__u8e3s4);
  };
  protoOf(BooleanArraySerializer_0).s1w = function (_this__u8e3s4) {
    return this.f26((!(_this__u8e3s4 == null) ? isBooleanArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(BooleanArraySerializer_0).i1z = function () {
    return booleanArray(0);
  };
  protoOf(BooleanArraySerializer_0).g26 = function (decoder, index, builder, checkIndex) {
    builder.j26(decoder.o1t(this.z1y_1, index));
  };
  protoOf(BooleanArraySerializer_0).d1x = function (decoder, index, builder, checkIndex) {
    return this.g26(decoder, index, builder instanceof BooleanArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(BooleanArraySerializer_0).j1z = function (decoder, index, builder, checkIndex) {
    return this.g26(decoder, index, builder instanceof BooleanArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(BooleanArraySerializer_0).k26 = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.t1u(this.z1y_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(BooleanArraySerializer_0).k1z = function (encoder, content, size) {
    return this.k26(encoder, (!(content == null) ? isBooleanArray(content) : false) ? content : THROW_CCE(), size);
  };
  var BooleanArraySerializer_instance;
  function BooleanArraySerializer_getInstance() {
    if (BooleanArraySerializer_instance == null)
      new BooleanArraySerializer_0();
    return BooleanArraySerializer_instance;
  }
  function CharArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.i22_1 = bufferWithData;
    this.j22_1 = bufferWithData.length;
    this.f1z(10);
  }
  protoOf(CharArrayBuilder).b1z = function () {
    return this.j22_1;
  };
  protoOf(CharArrayBuilder).f1z = function (requiredCapacity) {
    if (this.i22_1.length < requiredCapacity)
      this.i22_1 = copyOf(this.i22_1, coerceAtLeast(requiredCapacity, imul(this.i22_1.length, 2)));
  };
  protoOf(CharArrayBuilder).k22 = function (c) {
    this.m1z();
    var tmp = this.i22_1;
    var _unary__edvuaz = this.j22_1;
    this.j22_1 = _unary__edvuaz + 1 | 0;
    tmp[_unary__edvuaz] = c;
  };
  protoOf(CharArrayBuilder).d1z = function () {
    return copyOf(this.i22_1, this.j22_1);
  };
  function DoubleArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.r22_1 = bufferWithData;
    this.s22_1 = bufferWithData.length;
    this.f1z(10);
  }
  protoOf(DoubleArrayBuilder).b1z = function () {
    return this.s22_1;
  };
  protoOf(DoubleArrayBuilder).f1z = function (requiredCapacity) {
    if (this.r22_1.length < requiredCapacity)
      this.r22_1 = copyOf_0(this.r22_1, coerceAtLeast(requiredCapacity, imul(this.r22_1.length, 2)));
  };
  protoOf(DoubleArrayBuilder).t22 = function (c) {
    this.m1z();
    var tmp = this.r22_1;
    var _unary__edvuaz = this.s22_1;
    this.s22_1 = _unary__edvuaz + 1 | 0;
    tmp[_unary__edvuaz] = c;
  };
  protoOf(DoubleArrayBuilder).d1z = function () {
    return copyOf_0(this.r22_1, this.s22_1);
  };
  function FloatArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.a23_1 = bufferWithData;
    this.b23_1 = bufferWithData.length;
    this.f1z(10);
  }
  protoOf(FloatArrayBuilder).b1z = function () {
    return this.b23_1;
  };
  protoOf(FloatArrayBuilder).f1z = function (requiredCapacity) {
    if (this.a23_1.length < requiredCapacity)
      this.a23_1 = copyOf_1(this.a23_1, coerceAtLeast(requiredCapacity, imul(this.a23_1.length, 2)));
  };
  protoOf(FloatArrayBuilder).c23 = function (c) {
    this.m1z();
    var tmp = this.a23_1;
    var _unary__edvuaz = this.b23_1;
    this.b23_1 = _unary__edvuaz + 1 | 0;
    tmp[_unary__edvuaz] = c;
  };
  protoOf(FloatArrayBuilder).d1z = function () {
    return copyOf_1(this.a23_1, this.b23_1);
  };
  function LongArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.j23_1 = bufferWithData;
    this.k23_1 = bufferWithData.length;
    this.f1z(10);
  }
  protoOf(LongArrayBuilder).b1z = function () {
    return this.k23_1;
  };
  protoOf(LongArrayBuilder).f1z = function (requiredCapacity) {
    if (this.j23_1.length < requiredCapacity)
      this.j23_1 = copyOf_2(this.j23_1, coerceAtLeast(requiredCapacity, imul(this.j23_1.length, 2)));
  };
  protoOf(LongArrayBuilder).l23 = function (c) {
    this.m1z();
    var tmp = this.j23_1;
    var _unary__edvuaz = this.k23_1;
    this.k23_1 = _unary__edvuaz + 1 | 0;
    tmp[_unary__edvuaz] = c;
  };
  protoOf(LongArrayBuilder).d1z = function () {
    return copyOf_2(this.j23_1, this.k23_1);
  };
  function ULongArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.t23_1 = bufferWithData;
    this.u23_1 = _ULongArray___get_size__impl__ju6dtr(bufferWithData);
    this.f1z(10);
  }
  protoOf(ULongArrayBuilder).b1z = function () {
    return this.u23_1;
  };
  protoOf(ULongArrayBuilder).f1z = function (requiredCapacity) {
    if (_ULongArray___get_size__impl__ju6dtr(this.t23_1) < requiredCapacity) {
      var tmp = this;
      var tmp0 = this.t23_1;
      // Inline function 'kotlin.collections.copyOf' call
      var newSize = coerceAtLeast(requiredCapacity, imul(_ULongArray___get_size__impl__ju6dtr(this.t23_1), 2));
      tmp.t23_1 = _ULongArray___init__impl__twm1l3_0(copyOf_2(_ULongArray___get_storage__impl__28e64j(tmp0), newSize));
    }
  };
  protoOf(ULongArrayBuilder).v23 = function (c) {
    this.m1z();
    var tmp = this.t23_1;
    var _unary__edvuaz = this.u23_1;
    this.u23_1 = _unary__edvuaz + 1 | 0;
    ULongArray__set_impl_z19mvh(tmp, _unary__edvuaz, c);
  };
  protoOf(ULongArrayBuilder).l26 = function () {
    var tmp0 = this.t23_1;
    // Inline function 'kotlin.collections.copyOf' call
    var newSize = this.u23_1;
    return _ULongArray___init__impl__twm1l3_0(copyOf_2(_ULongArray___get_storage__impl__28e64j(tmp0), newSize));
  };
  protoOf(ULongArrayBuilder).d1z = function () {
    return new ULongArray(this.l26());
  };
  function IntArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.c24_1 = bufferWithData;
    this.d24_1 = bufferWithData.length;
    this.f1z(10);
  }
  protoOf(IntArrayBuilder).b1z = function () {
    return this.d24_1;
  };
  protoOf(IntArrayBuilder).f1z = function (requiredCapacity) {
    if (this.c24_1.length < requiredCapacity)
      this.c24_1 = copyOf_3(this.c24_1, coerceAtLeast(requiredCapacity, imul(this.c24_1.length, 2)));
  };
  protoOf(IntArrayBuilder).e24 = function (c) {
    this.m1z();
    var tmp = this.c24_1;
    var _unary__edvuaz = this.d24_1;
    this.d24_1 = _unary__edvuaz + 1 | 0;
    tmp[_unary__edvuaz] = c;
  };
  protoOf(IntArrayBuilder).d1z = function () {
    return copyOf_3(this.c24_1, this.d24_1);
  };
  function UIntArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.m24_1 = bufferWithData;
    this.n24_1 = _UIntArray___get_size__impl__r6l8ci(bufferWithData);
    this.f1z(10);
  }
  protoOf(UIntArrayBuilder).b1z = function () {
    return this.n24_1;
  };
  protoOf(UIntArrayBuilder).f1z = function (requiredCapacity) {
    if (_UIntArray___get_size__impl__r6l8ci(this.m24_1) < requiredCapacity) {
      var tmp = this;
      var tmp0 = this.m24_1;
      // Inline function 'kotlin.collections.copyOf' call
      var newSize = coerceAtLeast(requiredCapacity, imul(_UIntArray___get_size__impl__r6l8ci(this.m24_1), 2));
      tmp.m24_1 = _UIntArray___init__impl__ghjpc6_0(copyOf_3(_UIntArray___get_storage__impl__92a0v0(tmp0), newSize));
    }
  };
  protoOf(UIntArrayBuilder).o24 = function (c) {
    this.m1z();
    var tmp = this.m24_1;
    var _unary__edvuaz = this.n24_1;
    this.n24_1 = _unary__edvuaz + 1 | 0;
    UIntArray__set_impl_7f2zu2(tmp, _unary__edvuaz, c);
  };
  protoOf(UIntArrayBuilder).m26 = function () {
    var tmp0 = this.m24_1;
    // Inline function 'kotlin.collections.copyOf' call
    var newSize = this.n24_1;
    return _UIntArray___init__impl__ghjpc6_0(copyOf_3(_UIntArray___get_storage__impl__92a0v0(tmp0), newSize));
  };
  protoOf(UIntArrayBuilder).d1z = function () {
    return new UIntArray(this.m26());
  };
  function ShortArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.v24_1 = bufferWithData;
    this.w24_1 = bufferWithData.length;
    this.f1z(10);
  }
  protoOf(ShortArrayBuilder).b1z = function () {
    return this.w24_1;
  };
  protoOf(ShortArrayBuilder).f1z = function (requiredCapacity) {
    if (this.v24_1.length < requiredCapacity)
      this.v24_1 = copyOf_4(this.v24_1, coerceAtLeast(requiredCapacity, imul(this.v24_1.length, 2)));
  };
  protoOf(ShortArrayBuilder).x24 = function (c) {
    this.m1z();
    var tmp = this.v24_1;
    var _unary__edvuaz = this.w24_1;
    this.w24_1 = _unary__edvuaz + 1 | 0;
    tmp[_unary__edvuaz] = c;
  };
  protoOf(ShortArrayBuilder).d1z = function () {
    return copyOf_4(this.v24_1, this.w24_1);
  };
  function UShortArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.f25_1 = bufferWithData;
    this.g25_1 = _UShortArray___get_size__impl__jqto1b(bufferWithData);
    this.f1z(10);
  }
  protoOf(UShortArrayBuilder).b1z = function () {
    return this.g25_1;
  };
  protoOf(UShortArrayBuilder).f1z = function (requiredCapacity) {
    if (_UShortArray___get_size__impl__jqto1b(this.f25_1) < requiredCapacity) {
      var tmp = this;
      var tmp0 = this.f25_1;
      // Inline function 'kotlin.collections.copyOf' call
      var newSize = coerceAtLeast(requiredCapacity, imul(_UShortArray___get_size__impl__jqto1b(this.f25_1), 2));
      tmp.f25_1 = _UShortArray___init__impl__9b26ef_0(copyOf_4(_UShortArray___get_storage__impl__t2jpv5(tmp0), newSize));
    }
  };
  protoOf(UShortArrayBuilder).h25 = function (c) {
    this.m1z();
    var tmp = this.f25_1;
    var _unary__edvuaz = this.g25_1;
    this.g25_1 = _unary__edvuaz + 1 | 0;
    UShortArray__set_impl_6d8whp(tmp, _unary__edvuaz, c);
  };
  protoOf(UShortArrayBuilder).n26 = function () {
    var tmp0 = this.f25_1;
    // Inline function 'kotlin.collections.copyOf' call
    var newSize = this.g25_1;
    return _UShortArray___init__impl__9b26ef_0(copyOf_4(_UShortArray___get_storage__impl__t2jpv5(tmp0), newSize));
  };
  protoOf(UShortArrayBuilder).d1z = function () {
    return new UShortArray(this.n26());
  };
  function ByteArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.o25_1 = bufferWithData;
    this.p25_1 = bufferWithData.length;
    this.f1z(10);
  }
  protoOf(ByteArrayBuilder).b1z = function () {
    return this.p25_1;
  };
  protoOf(ByteArrayBuilder).f1z = function (requiredCapacity) {
    if (this.o25_1.length < requiredCapacity)
      this.o25_1 = copyOf_5(this.o25_1, coerceAtLeast(requiredCapacity, imul(this.o25_1.length, 2)));
  };
  protoOf(ByteArrayBuilder).q25 = function (c) {
    this.m1z();
    var tmp = this.o25_1;
    var _unary__edvuaz = this.p25_1;
    this.p25_1 = _unary__edvuaz + 1 | 0;
    tmp[_unary__edvuaz] = c;
  };
  protoOf(ByteArrayBuilder).d1z = function () {
    return copyOf_5(this.o25_1, this.p25_1);
  };
  function UByteArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.y25_1 = bufferWithData;
    this.z25_1 = _UByteArray___get_size__impl__h6pkdv(bufferWithData);
    this.f1z(10);
  }
  protoOf(UByteArrayBuilder).b1z = function () {
    return this.z25_1;
  };
  protoOf(UByteArrayBuilder).f1z = function (requiredCapacity) {
    if (_UByteArray___get_size__impl__h6pkdv(this.y25_1) < requiredCapacity) {
      var tmp = this;
      var tmp0 = this.y25_1;
      // Inline function 'kotlin.collections.copyOf' call
      var newSize = coerceAtLeast(requiredCapacity, imul(_UByteArray___get_size__impl__h6pkdv(this.y25_1), 2));
      tmp.y25_1 = _UByteArray___init__impl__ip4y9n_0(copyOf_5(_UByteArray___get_storage__impl__d4kctt(tmp0), newSize));
    }
  };
  protoOf(UByteArrayBuilder).a26 = function (c) {
    this.m1z();
    var tmp = this.y25_1;
    var _unary__edvuaz = this.z25_1;
    this.z25_1 = _unary__edvuaz + 1 | 0;
    UByteArray__set_impl_jvcicn(tmp, _unary__edvuaz, c);
  };
  protoOf(UByteArrayBuilder).o26 = function () {
    var tmp0 = this.y25_1;
    // Inline function 'kotlin.collections.copyOf' call
    var newSize = this.z25_1;
    return _UByteArray___init__impl__ip4y9n_0(copyOf_5(_UByteArray___get_storage__impl__d4kctt(tmp0), newSize));
  };
  protoOf(UByteArrayBuilder).d1z = function () {
    return new UByteArray(this.o26());
  };
  function BooleanArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.h26_1 = bufferWithData;
    this.i26_1 = bufferWithData.length;
    this.f1z(10);
  }
  protoOf(BooleanArrayBuilder).b1z = function () {
    return this.i26_1;
  };
  protoOf(BooleanArrayBuilder).f1z = function (requiredCapacity) {
    if (this.h26_1.length < requiredCapacity)
      this.h26_1 = copyOf_6(this.h26_1, coerceAtLeast(requiredCapacity, imul(this.h26_1.length, 2)));
  };
  protoOf(BooleanArrayBuilder).j26 = function (c) {
    this.m1z();
    var tmp = this.h26_1;
    var _unary__edvuaz = this.i26_1;
    this.i26_1 = _unary__edvuaz + 1 | 0;
    tmp[_unary__edvuaz] = c;
  };
  protoOf(BooleanArrayBuilder).d1z = function () {
    return copyOf_6(this.h26_1, this.i26_1);
  };
  function get_BUILTIN_SERIALIZERS() {
    _init_properties_Primitives_kt__k0eto4();
    return BUILTIN_SERIALIZERS;
  }
  var BUILTIN_SERIALIZERS;
  function builtinSerializerOrNull(_this__u8e3s4) {
    _init_properties_Primitives_kt__k0eto4();
    var tmp = get_BUILTIN_SERIALIZERS().j2(_this__u8e3s4);
    return (tmp == null ? true : isInterface(tmp, KSerializer)) ? tmp : THROW_CCE();
  }
  function StringSerializer() {
    StringSerializer_instance = this;
    this.p26_1 = new PrimitiveSerialDescriptor_0('kotlin.String', STRING_getInstance());
  }
  protoOf(StringSerializer).d1q = function () {
    return this.p26_1;
  };
  protoOf(StringSerializer).q26 = function (encoder, value) {
    return encoder.q1u(value);
  };
  protoOf(StringSerializer).e1q = function (encoder, value) {
    return this.q26(encoder, (!(value == null) ? typeof value === 'string' : false) ? value : THROW_CCE());
  };
  protoOf(StringSerializer).f1q = function (decoder) {
    return decoder.h1t();
  };
  var StringSerializer_instance;
  function StringSerializer_getInstance() {
    if (StringSerializer_instance == null)
      new StringSerializer();
    return StringSerializer_instance;
  }
  function CharSerializer() {
    CharSerializer_instance = this;
    this.r26_1 = new PrimitiveSerialDescriptor_0('kotlin.Char', CHAR_getInstance());
  }
  protoOf(CharSerializer).d1q = function () {
    return this.r26_1;
  };
  protoOf(CharSerializer).s26 = function (encoder, value) {
    return encoder.p1u(value);
  };
  protoOf(CharSerializer).e1q = function (encoder, value) {
    return this.s26(encoder, value instanceof Char ? value.o1_1 : THROW_CCE());
  };
  protoOf(CharSerializer).t26 = function (decoder) {
    return decoder.g1t();
  };
  protoOf(CharSerializer).f1q = function (decoder) {
    return new Char(this.t26(decoder));
  };
  var CharSerializer_instance;
  function CharSerializer_getInstance() {
    if (CharSerializer_instance == null)
      new CharSerializer();
    return CharSerializer_instance;
  }
  function DoubleSerializer() {
    DoubleSerializer_instance = this;
    this.u26_1 = new PrimitiveSerialDescriptor_0('kotlin.Double', DOUBLE_getInstance());
  }
  protoOf(DoubleSerializer).d1q = function () {
    return this.u26_1;
  };
  protoOf(DoubleSerializer).v26 = function (encoder, value) {
    return encoder.o1u(value);
  };
  protoOf(DoubleSerializer).e1q = function (encoder, value) {
    return this.v26(encoder, (!(value == null) ? typeof value === 'number' : false) ? value : THROW_CCE());
  };
  protoOf(DoubleSerializer).f1q = function (decoder) {
    return decoder.f1t();
  };
  var DoubleSerializer_instance;
  function DoubleSerializer_getInstance() {
    if (DoubleSerializer_instance == null)
      new DoubleSerializer();
    return DoubleSerializer_instance;
  }
  function FloatSerializer() {
    FloatSerializer_instance = this;
    this.w26_1 = new PrimitiveSerialDescriptor_0('kotlin.Float', FLOAT_getInstance());
  }
  protoOf(FloatSerializer).d1q = function () {
    return this.w26_1;
  };
  protoOf(FloatSerializer).x26 = function (encoder, value) {
    return encoder.n1u(value);
  };
  protoOf(FloatSerializer).e1q = function (encoder, value) {
    return this.x26(encoder, (!(value == null) ? typeof value === 'number' : false) ? value : THROW_CCE());
  };
  protoOf(FloatSerializer).f1q = function (decoder) {
    return decoder.e1t();
  };
  var FloatSerializer_instance;
  function FloatSerializer_getInstance() {
    if (FloatSerializer_instance == null)
      new FloatSerializer();
    return FloatSerializer_instance;
  }
  function LongSerializer() {
    LongSerializer_instance = this;
    this.y26_1 = new PrimitiveSerialDescriptor_0('kotlin.Long', LONG_getInstance());
  }
  protoOf(LongSerializer).d1q = function () {
    return this.y26_1;
  };
  protoOf(LongSerializer).z26 = function (encoder, value) {
    return encoder.m1u(value);
  };
  protoOf(LongSerializer).e1q = function (encoder, value) {
    return this.z26(encoder, value instanceof Long ? value : THROW_CCE());
  };
  protoOf(LongSerializer).f1q = function (decoder) {
    return decoder.d1t();
  };
  var LongSerializer_instance;
  function LongSerializer_getInstance() {
    if (LongSerializer_instance == null)
      new LongSerializer();
    return LongSerializer_instance;
  }
  function IntSerializer() {
    IntSerializer_instance = this;
    this.a27_1 = new PrimitiveSerialDescriptor_0('kotlin.Int', INT_getInstance());
  }
  protoOf(IntSerializer).d1q = function () {
    return this.a27_1;
  };
  protoOf(IntSerializer).b27 = function (encoder, value) {
    return encoder.l1u(value);
  };
  protoOf(IntSerializer).e1q = function (encoder, value) {
    return this.b27(encoder, (!(value == null) ? typeof value === 'number' : false) ? value : THROW_CCE());
  };
  protoOf(IntSerializer).f1q = function (decoder) {
    return decoder.c1t();
  };
  var IntSerializer_instance;
  function IntSerializer_getInstance() {
    if (IntSerializer_instance == null)
      new IntSerializer();
    return IntSerializer_instance;
  }
  function ShortSerializer() {
    ShortSerializer_instance = this;
    this.c27_1 = new PrimitiveSerialDescriptor_0('kotlin.Short', SHORT_getInstance());
  }
  protoOf(ShortSerializer).d1q = function () {
    return this.c27_1;
  };
  protoOf(ShortSerializer).d27 = function (encoder, value) {
    return encoder.k1u(value);
  };
  protoOf(ShortSerializer).e1q = function (encoder, value) {
    return this.d27(encoder, (!(value == null) ? typeof value === 'number' : false) ? value : THROW_CCE());
  };
  protoOf(ShortSerializer).f1q = function (decoder) {
    return decoder.b1t();
  };
  var ShortSerializer_instance;
  function ShortSerializer_getInstance() {
    if (ShortSerializer_instance == null)
      new ShortSerializer();
    return ShortSerializer_instance;
  }
  function ByteSerializer() {
    ByteSerializer_instance = this;
    this.e27_1 = new PrimitiveSerialDescriptor_0('kotlin.Byte', BYTE_getInstance());
  }
  protoOf(ByteSerializer).d1q = function () {
    return this.e27_1;
  };
  protoOf(ByteSerializer).f27 = function (encoder, value) {
    return encoder.j1u(value);
  };
  protoOf(ByteSerializer).e1q = function (encoder, value) {
    return this.f27(encoder, (!(value == null) ? typeof value === 'number' : false) ? value : THROW_CCE());
  };
  protoOf(ByteSerializer).f1q = function (decoder) {
    return decoder.a1t();
  };
  var ByteSerializer_instance;
  function ByteSerializer_getInstance() {
    if (ByteSerializer_instance == null)
      new ByteSerializer();
    return ByteSerializer_instance;
  }
  function BooleanSerializer() {
    BooleanSerializer_instance = this;
    this.g27_1 = new PrimitiveSerialDescriptor_0('kotlin.Boolean', BOOLEAN_getInstance());
  }
  protoOf(BooleanSerializer).d1q = function () {
    return this.g27_1;
  };
  protoOf(BooleanSerializer).h27 = function (encoder, value) {
    return encoder.i1u(value);
  };
  protoOf(BooleanSerializer).e1q = function (encoder, value) {
    return this.h27(encoder, (!(value == null) ? typeof value === 'boolean' : false) ? value : THROW_CCE());
  };
  protoOf(BooleanSerializer).f1q = function (decoder) {
    return decoder.z1s();
  };
  var BooleanSerializer_instance;
  function BooleanSerializer_getInstance() {
    if (BooleanSerializer_instance == null)
      new BooleanSerializer();
    return BooleanSerializer_instance;
  }
  function UnitSerializer() {
    UnitSerializer_instance = this;
    this.i27_1 = new ObjectSerializer('kotlin.Unit', Unit_instance);
  }
  protoOf(UnitSerializer).d1q = function () {
    return this.i27_1.d1q();
  };
  protoOf(UnitSerializer).j27 = function (encoder, value) {
    this.i27_1.t1q(encoder, Unit_instance);
  };
  protoOf(UnitSerializer).e1q = function (encoder, value) {
    return this.j27(encoder, value instanceof Unit ? value : THROW_CCE());
  };
  protoOf(UnitSerializer).k27 = function (decoder) {
    this.i27_1.f1q(decoder);
  };
  protoOf(UnitSerializer).f1q = function (decoder) {
    this.k27(decoder);
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
    this.l27_1 = serialName;
    this.m27_1 = kind;
  }
  protoOf(PrimitiveSerialDescriptor_0).e1r = function () {
    return this.l27_1;
  };
  protoOf(PrimitiveSerialDescriptor_0).q1r = function () {
    return this.m27_1;
  };
  protoOf(PrimitiveSerialDescriptor_0).s1r = function () {
    return 0;
  };
  protoOf(PrimitiveSerialDescriptor_0).u1r = function (index) {
    error_0(this);
  };
  protoOf(PrimitiveSerialDescriptor_0).v1r = function (name) {
    error_0(this);
  };
  protoOf(PrimitiveSerialDescriptor_0).y1r = function (index) {
    error_0(this);
  };
  protoOf(PrimitiveSerialDescriptor_0).x1r = function (index) {
    error_0(this);
  };
  protoOf(PrimitiveSerialDescriptor_0).w1r = function (index) {
    error_0(this);
  };
  protoOf(PrimitiveSerialDescriptor_0).toString = function () {
    return 'PrimitiveDescriptor(' + this.l27_1 + ')';
  };
  protoOf(PrimitiveSerialDescriptor_0).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof PrimitiveSerialDescriptor_0))
      return false;
    if (this.l27_1 === other.l27_1 && equals(this.m27_1, other.m27_1))
      return true;
    return false;
  };
  protoOf(PrimitiveSerialDescriptor_0).hashCode = function () {
    return getStringHashCode(this.l27_1) + imul(31, this.m27_1.hashCode()) | 0;
  };
  function PrimitiveDescriptorSafe(serialName, kind) {
    _init_properties_Primitives_kt__k0eto4();
    checkName(serialName);
    return new PrimitiveSerialDescriptor_0(serialName, kind);
  }
  function checkName(serialName) {
    _init_properties_Primitives_kt__k0eto4();
    var values = get_BUILTIN_SERIALIZERS().l2();
    var _iterator__ex2g4s = values.j();
    while (_iterator__ex2g4s.k()) {
      var primitive = _iterator__ex2g4s.l();
      var primitiveName = primitive.d1q().e1r();
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
  protoOf(NamedValueEncoder).o27 = function (_this__u8e3s4, index) {
    return this.q27(this.p27(_this__u8e3s4, index));
  };
  protoOf(NamedValueEncoder).q27 = function (nestedName) {
    var tmp0_elvis_lhs = this.s27();
    return this.t27(tmp0_elvis_lhs == null ? '' : tmp0_elvis_lhs, nestedName);
  };
  protoOf(NamedValueEncoder).p27 = function (descriptor, index) {
    return descriptor.u1r(index);
  };
  protoOf(NamedValueEncoder).t27 = function (parentName, childName) {
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
  protoOf(NamedValueDecoder).o27 = function (_this__u8e3s4, index) {
    return this.q27(this.p27(_this__u8e3s4, index));
  };
  protoOf(NamedValueDecoder).q27 = function (nestedName) {
    var tmp0_elvis_lhs = this.s27();
    return this.t27(tmp0_elvis_lhs == null ? '' : tmp0_elvis_lhs, nestedName);
  };
  protoOf(NamedValueDecoder).p27 = function (descriptor, index) {
    return descriptor.u1r(index);
  };
  protoOf(NamedValueDecoder).t27 = function (parentName, childName) {
    var tmp;
    // Inline function 'kotlin.text.isEmpty' call
    if (charSequenceLength(parentName) === 0) {
      tmp = childName;
    } else {
      tmp = parentName + '.' + childName;
    }
    return tmp;
  };
  protoOf(NamedValueDecoder).q28 = function () {
    return this.o28_1.p() ? '$' : joinToString(this.o28_1, '.', '$.');
  };
  function encodeElement($this, desc, index) {
    var tag = $this.o27(desc, index);
    $this.k28(tag);
    return true;
  }
  function TaggedEncoder() {
    var tmp = this;
    // Inline function 'kotlin.collections.arrayListOf' call
    tmp.r27_1 = ArrayList_init_$Create$_0();
  }
  protoOf(TaggedEncoder).b1u = function () {
    return EmptySerializersModule_0();
  };
  protoOf(TaggedEncoder).u27 = function (tag, value) {
    throw SerializationException_init_$Create$_0('Non-serializable ' + toString(getKClassFromExpression(value)) + ' is not supported by ' + toString(getKClassFromExpression(this)) + ' encoder');
  };
  protoOf(TaggedEncoder).v27 = function (tag) {
  };
  protoOf(TaggedEncoder).w27 = function (tag) {
    throw SerializationException_init_$Create$_0('null is not supported');
  };
  protoOf(TaggedEncoder).x27 = function (tag, value) {
    return this.u27(tag, value);
  };
  protoOf(TaggedEncoder).y27 = function (tag, value) {
    return this.u27(tag, value);
  };
  protoOf(TaggedEncoder).z27 = function (tag, value) {
    return this.u27(tag, value);
  };
  protoOf(TaggedEncoder).a28 = function (tag, value) {
    return this.u27(tag, value);
  };
  protoOf(TaggedEncoder).b28 = function (tag, value) {
    return this.u27(tag, value);
  };
  protoOf(TaggedEncoder).c28 = function (tag, value) {
    return this.u27(tag, value);
  };
  protoOf(TaggedEncoder).d28 = function (tag, value) {
    return this.u27(tag, value);
  };
  protoOf(TaggedEncoder).e28 = function (tag, value) {
    return this.u27(tag, new Char(value));
  };
  protoOf(TaggedEncoder).f28 = function (tag, value) {
    return this.u27(tag, value);
  };
  protoOf(TaggedEncoder).g28 = function (tag, enumDescriptor, ordinal) {
    return this.u27(tag, ordinal);
  };
  protoOf(TaggedEncoder).h28 = function (tag, inlineDescriptor) {
    // Inline function 'kotlin.apply' call
    this.k28(tag);
    return this;
  };
  protoOf(TaggedEncoder).s1u = function (descriptor) {
    return this.h28(this.l28(), descriptor);
  };
  protoOf(TaggedEncoder).h1v = function () {
    return this.v27(this.j28());
  };
  protoOf(TaggedEncoder).h1u = function () {
    return this.w27(this.l28());
  };
  protoOf(TaggedEncoder).i1u = function (value) {
    return this.d28(this.l28(), value);
  };
  protoOf(TaggedEncoder).j1u = function (value) {
    return this.y27(this.l28(), value);
  };
  protoOf(TaggedEncoder).k1u = function (value) {
    return this.z27(this.l28(), value);
  };
  protoOf(TaggedEncoder).l1u = function (value) {
    return this.x27(this.l28(), value);
  };
  protoOf(TaggedEncoder).m1u = function (value) {
    return this.a28(this.l28(), value);
  };
  protoOf(TaggedEncoder).n1u = function (value) {
    return this.b28(this.l28(), value);
  };
  protoOf(TaggedEncoder).o1u = function (value) {
    return this.c28(this.l28(), value);
  };
  protoOf(TaggedEncoder).p1u = function (value) {
    return this.e28(this.l28(), value);
  };
  protoOf(TaggedEncoder).q1u = function (value) {
    return this.f28(this.l28(), value);
  };
  protoOf(TaggedEncoder).r1u = function (enumDescriptor, index) {
    return this.g28(this.l28(), enumDescriptor, index);
  };
  protoOf(TaggedEncoder).m1t = function (descriptor) {
    return this;
  };
  protoOf(TaggedEncoder).n1t = function (descriptor) {
    // Inline function 'kotlin.collections.isNotEmpty' call
    if (!this.r27_1.p()) {
      this.l28();
    }
    this.i28(descriptor);
  };
  protoOf(TaggedEncoder).i28 = function (descriptor) {
  };
  protoOf(TaggedEncoder).t1u = function (descriptor, index, value) {
    return this.d28(this.o27(descriptor, index), value);
  };
  protoOf(TaggedEncoder).u1u = function (descriptor, index, value) {
    return this.y27(this.o27(descriptor, index), value);
  };
  protoOf(TaggedEncoder).v1u = function (descriptor, index, value) {
    return this.z27(this.o27(descriptor, index), value);
  };
  protoOf(TaggedEncoder).w1u = function (descriptor, index, value) {
    return this.x27(this.o27(descriptor, index), value);
  };
  protoOf(TaggedEncoder).x1u = function (descriptor, index, value) {
    return this.a28(this.o27(descriptor, index), value);
  };
  protoOf(TaggedEncoder).y1u = function (descriptor, index, value) {
    return this.b28(this.o27(descriptor, index), value);
  };
  protoOf(TaggedEncoder).z1u = function (descriptor, index, value) {
    return this.c28(this.o27(descriptor, index), value);
  };
  protoOf(TaggedEncoder).a1v = function (descriptor, index, value) {
    return this.e28(this.o27(descriptor, index), value);
  };
  protoOf(TaggedEncoder).b1v = function (descriptor, index, value) {
    return this.f28(this.o27(descriptor, index), value);
  };
  protoOf(TaggedEncoder).c1v = function (descriptor, index) {
    return this.h28(this.o27(descriptor, index), descriptor.x1r(index));
  };
  protoOf(TaggedEncoder).d1v = function (descriptor, index, serializer, value) {
    if (encodeElement(this, descriptor, index)) {
      this.e1v(serializer, value);
    }
  };
  protoOf(TaggedEncoder).f1v = function (descriptor, index, serializer, value) {
    if (encodeElement(this, descriptor, index)) {
      this.g1v(serializer, value);
    }
  };
  protoOf(TaggedEncoder).j28 = function () {
    return last(this.r27_1);
  };
  protoOf(TaggedEncoder).s27 = function () {
    return lastOrNull(this.r27_1);
  };
  protoOf(TaggedEncoder).k28 = function (name) {
    this.r27_1.e(name);
  };
  protoOf(TaggedEncoder).l28 = function () {
    var tmp;
    // Inline function 'kotlin.collections.isNotEmpty' call
    if (!this.r27_1.p()) {
      tmp = this.r27_1.g2(get_lastIndex_0(this.r27_1));
    } else {
      throw SerializationException_init_$Create$_0('No tag in stack for requested element');
    }
    return tmp;
  };
  function tagBlock($this, tag, block) {
    $this.k28(tag);
    var r = block();
    if (!$this.p28_1) {
      $this.l28();
    }
    $this.p28_1 = false;
    return r;
  }
  function TaggedDecoder$decodeSerializableElement$lambda(this$0, $deserializer, $previousValue) {
    return function () {
      return this$0.k1t($deserializer, $previousValue);
    };
  }
  function TaggedDecoder$decodeNullableSerializableElement$lambda(this$0, $deserializer, $previousValue) {
    return function () {
      var tmp0 = this$0;
      // Inline function 'kotlinx.serialization.encoding.decodeIfNullable' call
      var isNullabilitySupported = $deserializer.d1q().m1r();
      var tmp;
      if (isNullabilitySupported || tmp0.x1s()) {
        tmp = this$0.k1t($deserializer, $previousValue);
      } else {
        tmp = tmp0.y1s();
      }
      return tmp;
    };
  }
  function TaggedDecoder() {
    var tmp = this;
    // Inline function 'kotlin.collections.arrayListOf' call
    tmp.o28_1 = ArrayList_init_$Create$_0();
    this.p28_1 = false;
  }
  protoOf(TaggedDecoder).b1u = function () {
    return EmptySerializersModule_0();
  };
  protoOf(TaggedDecoder).r28 = function (tag) {
    throw SerializationException_init_$Create$_0(toString(getKClassFromExpression(this)) + " can't retrieve untyped values");
  };
  protoOf(TaggedDecoder).s28 = function (tag) {
    return true;
  };
  protoOf(TaggedDecoder).t28 = function (tag) {
    var tmp = this.r28(tag);
    return typeof tmp === 'boolean' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).u28 = function (tag) {
    var tmp = this.r28(tag);
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).v28 = function (tag) {
    var tmp = this.r28(tag);
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).w28 = function (tag) {
    var tmp = this.r28(tag);
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).x28 = function (tag) {
    var tmp = this.r28(tag);
    return tmp instanceof Long ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).y28 = function (tag) {
    var tmp = this.r28(tag);
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).z28 = function (tag) {
    var tmp = this.r28(tag);
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).a29 = function (tag) {
    var tmp = this.r28(tag);
    return tmp instanceof Char ? tmp.o1_1 : THROW_CCE();
  };
  protoOf(TaggedDecoder).b29 = function (tag) {
    var tmp = this.r28(tag);
    return typeof tmp === 'string' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).c29 = function (tag, enumDescriptor) {
    var tmp = this.r28(tag);
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).d29 = function (tag, inlineDescriptor) {
    // Inline function 'kotlin.apply' call
    this.k28(tag);
    return this;
  };
  protoOf(TaggedDecoder).k1t = function (deserializer, previousValue) {
    return this.l1t(deserializer);
  };
  protoOf(TaggedDecoder).j1t = function (descriptor) {
    return this.d29(this.l28(), descriptor);
  };
  protoOf(TaggedDecoder).x1s = function () {
    var tmp0_elvis_lhs = this.s27();
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return false;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var currentTag = tmp;
    return this.s28(currentTag);
  };
  protoOf(TaggedDecoder).y1s = function () {
    return null;
  };
  protoOf(TaggedDecoder).z1s = function () {
    return this.t28(this.l28());
  };
  protoOf(TaggedDecoder).a1t = function () {
    return this.u28(this.l28());
  };
  protoOf(TaggedDecoder).b1t = function () {
    return this.v28(this.l28());
  };
  protoOf(TaggedDecoder).c1t = function () {
    return this.w28(this.l28());
  };
  protoOf(TaggedDecoder).d1t = function () {
    return this.x28(this.l28());
  };
  protoOf(TaggedDecoder).e1t = function () {
    return this.y28(this.l28());
  };
  protoOf(TaggedDecoder).f1t = function () {
    return this.z28(this.l28());
  };
  protoOf(TaggedDecoder).g1t = function () {
    return this.a29(this.l28());
  };
  protoOf(TaggedDecoder).h1t = function () {
    return this.b29(this.l28());
  };
  protoOf(TaggedDecoder).i1t = function (enumDescriptor) {
    return this.c29(this.l28(), enumDescriptor);
  };
  protoOf(TaggedDecoder).m1t = function (descriptor) {
    return this;
  };
  protoOf(TaggedDecoder).n1t = function (descriptor) {
  };
  protoOf(TaggedDecoder).o1t = function (descriptor, index) {
    return this.t28(this.o27(descriptor, index));
  };
  protoOf(TaggedDecoder).p1t = function (descriptor, index) {
    return this.u28(this.o27(descriptor, index));
  };
  protoOf(TaggedDecoder).q1t = function (descriptor, index) {
    return this.v28(this.o27(descriptor, index));
  };
  protoOf(TaggedDecoder).r1t = function (descriptor, index) {
    return this.w28(this.o27(descriptor, index));
  };
  protoOf(TaggedDecoder).s1t = function (descriptor, index) {
    return this.x28(this.o27(descriptor, index));
  };
  protoOf(TaggedDecoder).t1t = function (descriptor, index) {
    return this.y28(this.o27(descriptor, index));
  };
  protoOf(TaggedDecoder).u1t = function (descriptor, index) {
    return this.z28(this.o27(descriptor, index));
  };
  protoOf(TaggedDecoder).v1t = function (descriptor, index) {
    return this.a29(this.o27(descriptor, index));
  };
  protoOf(TaggedDecoder).w1t = function (descriptor, index) {
    return this.b29(this.o27(descriptor, index));
  };
  protoOf(TaggedDecoder).x1t = function (descriptor, index) {
    return this.d29(this.o27(descriptor, index), descriptor.x1r(index));
  };
  protoOf(TaggedDecoder).y1t = function (descriptor, index, deserializer, previousValue) {
    var tmp = this.o27(descriptor, index);
    return tagBlock(this, tmp, TaggedDecoder$decodeSerializableElement$lambda(this, deserializer, previousValue));
  };
  protoOf(TaggedDecoder).a1u = function (descriptor, index, deserializer, previousValue) {
    var tmp = this.o27(descriptor, index);
    return tagBlock(this, tmp, TaggedDecoder$decodeNullableSerializableElement$lambda(this, deserializer, previousValue));
  };
  protoOf(TaggedDecoder).s27 = function () {
    return lastOrNull(this.o28_1);
  };
  protoOf(TaggedDecoder).k28 = function (name) {
    this.o28_1.e(name);
  };
  protoOf(TaggedDecoder).l28 = function () {
    var r = this.o28_1.g2(get_lastIndex_0(this.o28_1));
    this.p28_1 = true;
    return r;
  };
  function get_NULL() {
    _init_properties_Tuples_kt__dz0qyd();
    return NULL;
  }
  var NULL;
  function MapEntry(key, value) {
    this.e29_1 = key;
    this.f29_1 = value;
  }
  protoOf(MapEntry).v = function () {
    return this.e29_1;
  };
  protoOf(MapEntry).w = function () {
    return this.f29_1;
  };
  protoOf(MapEntry).toString = function () {
    return 'MapEntry(key=' + toString_0(this.e29_1) + ', value=' + toString_0(this.f29_1) + ')';
  };
  protoOf(MapEntry).hashCode = function () {
    var result = this.e29_1 == null ? 0 : hashCode(this.e29_1);
    result = imul(result, 31) + (this.f29_1 == null ? 0 : hashCode(this.f29_1)) | 0;
    return result;
  };
  protoOf(MapEntry).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof MapEntry))
      return false;
    var tmp0_other_with_cast = other instanceof MapEntry ? other : THROW_CCE();
    if (!equals(this.e29_1, tmp0_other_with_cast.e29_1))
      return false;
    if (!equals(this.f29_1, tmp0_other_with_cast.f29_1))
      return false;
    return true;
  };
  function MapEntrySerializer$descriptor$lambda($keySerializer, $valueSerializer) {
    return function ($this$buildSerialDescriptor) {
      $this$buildSerialDescriptor.o1q('key', $keySerializer.d1q());
      $this$buildSerialDescriptor.o1q('value', $valueSerializer.d1q());
      return Unit_instance;
    };
  }
  function MapEntrySerializer_0(keySerializer, valueSerializer) {
    KeyValueSerializer.call(this, keySerializer, valueSerializer);
    var tmp = this;
    var tmp_0 = MAP_getInstance();
    tmp.i29_1 = buildSerialDescriptor('kotlin.collections.Map.Entry', tmp_0, [], MapEntrySerializer$descriptor$lambda(keySerializer, valueSerializer));
  }
  protoOf(MapEntrySerializer_0).d1q = function () {
    return this.i29_1;
  };
  protoOf(MapEntrySerializer_0).j29 = function (_this__u8e3s4) {
    return _this__u8e3s4.v();
  };
  protoOf(MapEntrySerializer_0).k29 = function (_this__u8e3s4) {
    return this.j29((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, Entry) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(MapEntrySerializer_0).l29 = function (_this__u8e3s4) {
    return _this__u8e3s4.w();
  };
  protoOf(MapEntrySerializer_0).m29 = function (_this__u8e3s4) {
    return this.l29((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, Entry) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(MapEntrySerializer_0).n29 = function (key, value) {
    return new MapEntry(key, value);
  };
  function PairSerializer$descriptor$lambda($keySerializer, $valueSerializer) {
    return function ($this$buildClassSerialDescriptor) {
      $this$buildClassSerialDescriptor.o1q('first', $keySerializer.d1q());
      $this$buildClassSerialDescriptor.o1q('second', $valueSerializer.d1q());
      return Unit_instance;
    };
  }
  function PairSerializer_0(keySerializer, valueSerializer) {
    KeyValueSerializer.call(this, keySerializer, valueSerializer);
    var tmp = this;
    tmp.t29_1 = buildClassSerialDescriptor('kotlin.Pair', [], PairSerializer$descriptor$lambda(keySerializer, valueSerializer));
  }
  protoOf(PairSerializer_0).d1q = function () {
    return this.t29_1;
  };
  protoOf(PairSerializer_0).u29 = function (_this__u8e3s4) {
    return _this__u8e3s4.rg_1;
  };
  protoOf(PairSerializer_0).k29 = function (_this__u8e3s4) {
    return this.u29(_this__u8e3s4 instanceof Pair ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(PairSerializer_0).v29 = function (_this__u8e3s4) {
    return _this__u8e3s4.sg_1;
  };
  protoOf(PairSerializer_0).m29 = function (_this__u8e3s4) {
    return this.v29(_this__u8e3s4 instanceof Pair ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(PairSerializer_0).n29 = function (key, value) {
    return to(key, value);
  };
  function decodeSequentially_1($this, composite) {
    var a = composite.z1t($this.z29_1, 0, $this.w29_1);
    var b = composite.z1t($this.z29_1, 1, $this.x29_1);
    var c = composite.z1t($this.z29_1, 2, $this.y29_1);
    composite.n1t($this.z29_1);
    return new Triple(a, b, c);
  }
  function decodeStructure($this, composite) {
    var a = get_NULL();
    var b = get_NULL();
    var c = get_NULL();
    mainLoop: while (true) {
      var index = composite.d1u($this.z29_1);
      switch (index) {
        case -1:
          break mainLoop;
        case 0:
          a = composite.z1t($this.z29_1, 0, $this.w29_1);
          break;
        case 1:
          b = composite.z1t($this.z29_1, 1, $this.x29_1);
          break;
        case 2:
          c = composite.z1t($this.z29_1, 2, $this.y29_1);
          break;
        default:
          throw SerializationException_init_$Create$_0('Unexpected index ' + index);
      }
    }
    composite.n1t($this.z29_1);
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
      $this$buildClassSerialDescriptor.o1q('first', this$0.w29_1.d1q());
      $this$buildClassSerialDescriptor.o1q('second', this$0.x29_1.d1q());
      $this$buildClassSerialDescriptor.o1q('third', this$0.y29_1.d1q());
      return Unit_instance;
    };
  }
  function TripleSerializer_0(aSerializer, bSerializer, cSerializer) {
    this.w29_1 = aSerializer;
    this.x29_1 = bSerializer;
    this.y29_1 = cSerializer;
    var tmp = this;
    tmp.z29_1 = buildClassSerialDescriptor('kotlin.Triple', [], TripleSerializer$descriptor$lambda(this));
  }
  protoOf(TripleSerializer_0).d1q = function () {
    return this.z29_1;
  };
  protoOf(TripleSerializer_0).a2a = function (encoder, value) {
    var structuredEncoder = encoder.m1t(this.z29_1);
    structuredEncoder.d1v(this.z29_1, 0, this.w29_1, value.bm_1);
    structuredEncoder.d1v(this.z29_1, 1, this.x29_1, value.cm_1);
    structuredEncoder.d1v(this.z29_1, 2, this.y29_1, value.dm_1);
    structuredEncoder.n1t(this.z29_1);
  };
  protoOf(TripleSerializer_0).e1q = function (encoder, value) {
    return this.a2a(encoder, value instanceof Triple ? value : THROW_CCE());
  };
  protoOf(TripleSerializer_0).f1q = function (decoder) {
    var composite = decoder.m1t(this.z29_1);
    if (composite.c1u()) {
      return decodeSequentially_1(this, composite);
    }
    return decodeStructure(this, composite);
  };
  function KeyValueSerializer(keySerializer, valueSerializer) {
    this.o29_1 = keySerializer;
    this.p29_1 = valueSerializer;
  }
  protoOf(KeyValueSerializer).q29 = function (encoder, value) {
    var structuredEncoder = encoder.m1t(this.d1q());
    structuredEncoder.d1v(this.d1q(), 0, this.o29_1, this.k29(value));
    structuredEncoder.d1v(this.d1q(), 1, this.p29_1, this.m29(value));
    structuredEncoder.n1t(this.d1q());
  };
  protoOf(KeyValueSerializer).e1q = function (encoder, value) {
    return this.q29(encoder, (value == null ? true : !(value == null)) ? value : THROW_CCE());
  };
  protoOf(KeyValueSerializer).f1q = function (decoder) {
    // Inline function 'kotlinx.serialization.encoding.decodeStructure' call
    var descriptor = this.d1q();
    var composite = decoder.m1t(descriptor);
    var tmp$ret$0;
    $l$block: {
      if (composite.c1u()) {
        var key = composite.z1t(this.d1q(), 0, this.o29_1);
        var value = composite.z1t(this.d1q(), 1, this.p29_1);
        tmp$ret$0 = this.n29(key, value);
        break $l$block;
      }
      var key_0 = get_NULL();
      var value_0 = get_NULL();
      mainLoop: while (true) {
        var idx = composite.d1u(this.d1q());
        switch (idx) {
          case -1:
            break mainLoop;
          case 0:
            key_0 = composite.z1t(this.d1q(), 0, this.o29_1);
            break;
          case 1:
            value_0 = composite.z1t(this.d1q(), 1, this.p29_1);
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
      tmp$ret$0 = this.n29(tmp, (value_0 == null ? true : !(value_0 == null)) ? value_0 : THROW_CCE());
    }
    var result = tmp$ret$0;
    composite.n1t(descriptor);
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
    this.b2a_1 = InlinePrimitiveDescriptor('kotlin.ULong', serializer_5(Companion_getInstance_2()));
  }
  protoOf(ULongSerializer).d1q = function () {
    return this.b2a_1;
  };
  protoOf(ULongSerializer).c2a = function (encoder, value) {
    var tmp = encoder.s1u(this.b2a_1);
    // Inline function 'kotlin.ULong.toLong' call
    var tmp$ret$0 = _ULong___get_data__impl__fggpzb(value);
    tmp.m1u(tmp$ret$0);
  };
  protoOf(ULongSerializer).e1q = function (encoder, value) {
    return this.c2a(encoder, value instanceof ULong ? value.mn_1 : THROW_CCE());
  };
  protoOf(ULongSerializer).d2a = function (decoder) {
    // Inline function 'kotlin.toULong' call
    var this_0 = decoder.j1t(this.b2a_1).d1t();
    return _ULong___init__impl__c78o9k(this_0);
  };
  protoOf(ULongSerializer).f1q = function (decoder) {
    return new ULong(this.d2a(decoder));
  };
  var ULongSerializer_instance;
  function ULongSerializer_getInstance() {
    if (ULongSerializer_instance == null)
      new ULongSerializer();
    return ULongSerializer_instance;
  }
  function UIntSerializer() {
    UIntSerializer_instance = this;
    this.e2a_1 = InlinePrimitiveDescriptor('kotlin.UInt', serializer_7(IntCompanionObject_instance));
  }
  protoOf(UIntSerializer).d1q = function () {
    return this.e2a_1;
  };
  protoOf(UIntSerializer).f2a = function (encoder, value) {
    var tmp = encoder.s1u(this.e2a_1);
    // Inline function 'kotlin.UInt.toInt' call
    var tmp$ret$0 = _UInt___get_data__impl__f0vqqw(value);
    tmp.l1u(tmp$ret$0);
  };
  protoOf(UIntSerializer).e1q = function (encoder, value) {
    return this.f2a(encoder, value instanceof UInt ? value.an_1 : THROW_CCE());
  };
  protoOf(UIntSerializer).g2a = function (decoder) {
    // Inline function 'kotlin.toUInt' call
    var this_0 = decoder.j1t(this.e2a_1).c1t();
    return _UInt___init__impl__l7qpdl(this_0);
  };
  protoOf(UIntSerializer).f1q = function (decoder) {
    return new UInt(this.g2a(decoder));
  };
  var UIntSerializer_instance;
  function UIntSerializer_getInstance() {
    if (UIntSerializer_instance == null)
      new UIntSerializer();
    return UIntSerializer_instance;
  }
  function UShortSerializer() {
    UShortSerializer_instance = this;
    this.h2a_1 = InlinePrimitiveDescriptor('kotlin.UShort', serializer_9(ShortCompanionObject_instance));
  }
  protoOf(UShortSerializer).d1q = function () {
    return this.h2a_1;
  };
  protoOf(UShortSerializer).i2a = function (encoder, value) {
    var tmp = encoder.s1u(this.h2a_1);
    // Inline function 'kotlin.UShort.toShort' call
    var tmp$ret$0 = _UShort___get_data__impl__g0245(value);
    tmp.k1u(tmp$ret$0);
  };
  protoOf(UShortSerializer).e1q = function (encoder, value) {
    return this.i2a(encoder, value instanceof UShort ? value.yn_1 : THROW_CCE());
  };
  protoOf(UShortSerializer).j2a = function (decoder) {
    // Inline function 'kotlin.toUShort' call
    var this_0 = decoder.j1t(this.h2a_1).b1t();
    return _UShort___init__impl__jigrne(this_0);
  };
  protoOf(UShortSerializer).f1q = function (decoder) {
    return new UShort(this.j2a(decoder));
  };
  var UShortSerializer_instance;
  function UShortSerializer_getInstance() {
    if (UShortSerializer_instance == null)
      new UShortSerializer();
    return UShortSerializer_instance;
  }
  function UByteSerializer() {
    UByteSerializer_instance = this;
    this.k2a_1 = InlinePrimitiveDescriptor('kotlin.UByte', serializer_11(ByteCompanionObject_instance));
  }
  protoOf(UByteSerializer).d1q = function () {
    return this.k2a_1;
  };
  protoOf(UByteSerializer).l2a = function (encoder, value) {
    var tmp = encoder.s1u(this.k2a_1);
    // Inline function 'kotlin.UByte.toByte' call
    var tmp$ret$0 = _UByte___get_data__impl__jof9qr(value);
    tmp.j1u(tmp$ret$0);
  };
  protoOf(UByteSerializer).e1q = function (encoder, value) {
    return this.l2a(encoder, value instanceof UByte ? value.om_1 : THROW_CCE());
  };
  protoOf(UByteSerializer).m2a = function (decoder) {
    // Inline function 'kotlin.toUByte' call
    var this_0 = decoder.j1t(this.k2a_1).a1t();
    return _UByte___init__impl__g9hnc4(this_0);
  };
  protoOf(UByteSerializer).f1q = function (decoder) {
    return new UByte(this.m2a(decoder));
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
  protoOf(SerializersModule).i1r = function (kClass, typeArgumentsSerializers, $super) {
    typeArgumentsSerializers = typeArgumentsSerializers === VOID ? emptyList() : typeArgumentsSerializers;
    return $super === VOID ? this.j1r(kClass, typeArgumentsSerializers) : $super.j1r.call(this, kClass, typeArgumentsSerializers);
  };
  function SerialModuleImpl(class2ContextualFactory, polyBase2Serializers, polyBase2DefaultSerializerProvider, polyBase2NamedSerializers, polyBase2DefaultDeserializerProvider, hasInterfaceContextualSerializers) {
    SerializersModule.call(this);
    this.o2a_1 = class2ContextualFactory;
    this.p2a_1 = polyBase2Serializers;
    this.q2a_1 = polyBase2DefaultSerializerProvider;
    this.r2a_1 = polyBase2NamedSerializers;
    this.s2a_1 = polyBase2DefaultDeserializerProvider;
    this.t2a_1 = hasInterfaceContextualSerializers;
  }
  protoOf(SerialModuleImpl).h1r = function () {
    return this.t2a_1;
  };
  protoOf(SerialModuleImpl).l1v = function (baseClass, value) {
    if (!baseClass.ab(value))
      return null;
    var tmp0_safe_receiver = this.p2a_1.j2(baseClass);
    var tmp = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.j2(getKClassFromExpression(value));
    var registered = (!(tmp == null) ? isInterface(tmp, SerializationStrategy) : false) ? tmp : null;
    if (!(registered == null))
      return registered;
    var tmp_0 = this.q2a_1.j2(baseClass);
    var tmp1_safe_receiver = (!(tmp_0 == null) ? typeof tmp_0 === 'function' : false) ? tmp_0 : null;
    return tmp1_safe_receiver == null ? null : tmp1_safe_receiver(value);
  };
  protoOf(SerialModuleImpl).k1v = function (baseClass, serializedClassName) {
    var tmp0_safe_receiver = this.r2a_1.j2(baseClass);
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.collections.get' call
      tmp = (isInterface(tmp0_safe_receiver, KtMap) ? tmp0_safe_receiver : THROW_CCE()).j2(serializedClassName);
    }
    var tmp_0 = tmp;
    var registered = (!(tmp_0 == null) ? isInterface(tmp_0, KSerializer) : false) ? tmp_0 : null;
    if (!(registered == null))
      return registered;
    var tmp_1 = this.s2a_1.j2(baseClass);
    var tmp1_safe_receiver = (!(tmp_1 == null) ? typeof tmp_1 === 'function' : false) ? tmp_1 : null;
    return tmp1_safe_receiver == null ? null : tmp1_safe_receiver(serializedClassName);
  };
  protoOf(SerialModuleImpl).j1r = function (kClass, typeArgumentsSerializers) {
    var tmp0_safe_receiver = this.o2a_1.j2(kClass);
    var tmp = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.u2a(typeArgumentsSerializers);
    return (tmp == null ? true : isInterface(tmp, KSerializer)) ? tmp : null;
  };
  protoOf(SerialModuleImpl).n2a = function (collector) {
    // Inline function 'kotlin.collections.forEach' call
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s = this.o2a_1.u().j();
    while (_iterator__ex2g4s.k()) {
      var element = _iterator__ex2g4s.l();
      // Inline function 'kotlin.collections.component1' call
      var kclass = element.v();
      // Inline function 'kotlin.collections.component2' call
      var serial = element.w();
      if (serial instanceof Argless) {
        var tmp = isInterface(kclass, KClass) ? kclass : THROW_CCE();
        var tmp_0 = serial.x2a_1;
        collector.y2a(tmp, isInterface(tmp_0, KSerializer) ? tmp_0 : THROW_CCE());
      } else {
        if (serial instanceof WithTypeArguments) {
          collector.w2a(kclass, serial.v2a_1);
        } else {
          noWhenBranchMatchedException();
        }
      }
    }
    // Inline function 'kotlin.collections.forEach' call
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s_0 = this.p2a_1.u().j();
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
        collector.z2a(tmp_1, tmp_2, tmp$ret$11);
      }
    }
    // Inline function 'kotlin.collections.forEach' call
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s_2 = this.q2a_1.u().j();
    while (_iterator__ex2g4s_2.k()) {
      var element_2 = _iterator__ex2g4s_2.l();
      // Inline function 'kotlin.collections.component1' call
      var baseClass_0 = element_2.v();
      // Inline function 'kotlin.collections.component2' call
      var provider = element_2.w();
      var tmp_3 = isInterface(baseClass_0, KClass) ? baseClass_0 : THROW_CCE();
      collector.a2b(tmp_3, typeof provider === 'function' ? provider : THROW_CCE());
    }
    // Inline function 'kotlin.collections.forEach' call
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s_3 = this.s2a_1.u().j();
    while (_iterator__ex2g4s_3.k()) {
      var element_3 = _iterator__ex2g4s_3.l();
      // Inline function 'kotlin.collections.component1' call
      var baseClass_1 = element_3.v();
      // Inline function 'kotlin.collections.component2' call
      var provider_0 = element_3.w();
      var tmp_4 = isInterface(baseClass_1, KClass) ? baseClass_1 : THROW_CCE();
      collector.b2b(tmp_4, typeof provider_0 === 'function' ? provider_0 : THROW_CCE());
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
    this.c2b_1 = serializer;
  }
  protoOf(SerializableWith).equals = function (other) {
    if (!(other instanceof SerializableWith))
      return false;
    var tmp0_other_with_cast = other instanceof SerializableWith ? other : THROW_CCE();
    if (!this.c2b_1.equals(tmp0_other_with_cast.c2b_1))
      return false;
    return true;
  };
  protoOf(SerializableWith).hashCode = function () {
    return imul(getStringHashCode('serializer'), 127) ^ this.c2b_1.hashCode();
  };
  protoOf(SerializableWith).toString = function () {
    return '@kotlinx.serialization.SerializableWith(' + 'serializer=' + toString(this.c2b_1) + ')';
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
          var tmp_1 = assocObject.c22(args.slice());
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
    this.d2b_1 = $factory;
  }
  protoOf(createCache$1).k1r = function (key) {
    return this.d2b_1(key);
  };
  function createParametrizedCache$1($factory) {
    this.e2b_1 = $factory;
  }
  protoOf(createParametrizedCache$1).l1r = function (key, types) {
    // Inline function 'kotlin.runCatching' call
    var tmp;
    try {
      // Inline function 'kotlin.Companion.success' call
      var value = this.e2b_1(key, types);
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
  protoOf(SerialDescriptorImpl).m1r = get_isNullable;
  protoOf(SerialDescriptorImpl).r1r = get_isInline;
  protoOf(AbstractDecoder).z1t = decodeSerializableElement$default;
  protoOf(AbstractDecoder).l1t = decodeSerializableValue;
  protoOf(AbstractDecoder).c1u = decodeSequentially;
  protoOf(AbstractDecoder).e1u = decodeCollectionSize;
  protoOf(AbstractEncoder).h1v = encodeNotNullMark;
  protoOf(AbstractEncoder).i1v = beginCollection;
  protoOf(AbstractEncoder).e1v = encodeSerializableValue;
  protoOf(AbstractEncoder).g1v = encodeNullableSerializableValue;
  protoOf(AbstractEncoder).j1v = shouldEncodeElementDefault;
  protoOf(ListLikeDescriptor).m1r = get_isNullable;
  protoOf(ListLikeDescriptor).r1r = get_isInline;
  protoOf(ListLikeDescriptor).t1r = get_annotations;
  protoOf(MapLikeDescriptor).m1r = get_isNullable;
  protoOf(MapLikeDescriptor).r1r = get_isInline;
  protoOf(MapLikeDescriptor).t1r = get_annotations;
  protoOf(PluginGeneratedSerialDescriptor).m1r = get_isNullable;
  protoOf(PluginGeneratedSerialDescriptor).r1r = get_isInline;
  protoOf(InlinePrimitiveDescriptor$1).s21 = typeParametersSerializers;
  protoOf(NothingSerialDescriptor).m1r = get_isNullable;
  protoOf(NothingSerialDescriptor).r1r = get_isInline;
  protoOf(NothingSerialDescriptor).t1r = get_annotations;
  protoOf(PrimitiveSerialDescriptor_0).m1r = get_isNullable;
  protoOf(PrimitiveSerialDescriptor_0).r1r = get_isInline;
  protoOf(PrimitiveSerialDescriptor_0).t1r = get_annotations;
  protoOf(TaggedEncoder).i1v = beginCollection;
  protoOf(TaggedEncoder).e1v = encodeSerializableValue;
  protoOf(TaggedEncoder).g1v = encodeNullableSerializableValue;
  protoOf(TaggedEncoder).j1v = shouldEncodeElementDefault;
  protoOf(TaggedDecoder).z1t = decodeSerializableElement$default;
  protoOf(TaggedDecoder).l1t = decodeSerializableValue;
  protoOf(TaggedDecoder).c1u = decodeSequentially;
  protoOf(TaggedDecoder).e1u = decodeCollectionSize;
  //endregion
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = ObjectSerializer_init_$Create$;
  _.$_$.b = MissingFieldException_init_$Create$_0;
  _.$_$.c = SealedClassSerializer_init_$Create$;
  _.$_$.d = SerializationException_init_$Init$_0;
  _.$_$.e = SerializationException_init_$Create$_0;
  _.$_$.f = UnknownFieldException_init_$Create$;
  _.$_$.g = SEALED_getInstance;
  _.$_$.h = STRING_getInstance;
  _.$_$.i = CONTEXTUAL_getInstance;
  _.$_$.j = ENUM_getInstance;
  _.$_$.k = CLASS_getInstance;
  _.$_$.l = LIST_getInstance;
  _.$_$.m = MAP_getInstance;
  _.$_$.n = OBJECT_getInstance;
  _.$_$.o = BooleanSerializer_getInstance;
  _.$_$.p = DoubleSerializer_getInstance;
  _.$_$.q = FloatSerializer_getInstance;
  _.$_$.r = IntSerializer_getInstance;
  _.$_$.s = LongSerializer_getInstance;
  _.$_$.t = StringSerializer_getInstance;
  _.$_$.u = ListSerializer;
  _.$_$.v = MapSerializer;
  _.$_$.w = get_nullable;
  _.$_$.x = serializer_1;
  _.$_$.y = serializer_10;
  _.$_$.z = serializer_8;
  _.$_$.a1 = serializer_12;
  _.$_$.b1 = serializer_6;
  _.$_$.c1 = PolymorphicKind;
  _.$_$.d1 = PrimitiveKind;
  _.$_$.e1 = PrimitiveSerialDescriptor;
  _.$_$.f1 = get_annotations;
  _.$_$.g1 = get_isInline;
  _.$_$.h1 = get_isNullable;
  _.$_$.i1 = SerialDescriptor;
  _.$_$.j1 = ENUM;
  _.$_$.k1 = buildClassSerialDescriptor;
  _.$_$.l1 = buildSerialDescriptor;
  _.$_$.m1 = getContextualDescriptor;
  _.$_$.n1 = AbstractDecoder;
  _.$_$.o1 = AbstractEncoder;
  _.$_$.p1 = CompositeDecoder;
  _.$_$.q1 = CompositeEncoder;
  _.$_$.r1 = Decoder;
  _.$_$.s1 = Encoder;
  _.$_$.t1 = AbstractPolymorphicSerializer;
  _.$_$.u1 = ArrayListSerializer;
  _.$_$.v1 = ElementMarker;
  _.$_$.w1 = typeParametersSerializers;
  _.$_$.x1 = GeneratedSerializer;
  _.$_$.y1 = InlinePrimitiveDescriptor;
  _.$_$.z1 = LinkedHashMapSerializer;
  _.$_$.a2 = NamedValueDecoder;
  _.$_$.b2 = NamedValueEncoder;
  _.$_$.c2 = PluginGeneratedSerialDescriptor;
  _.$_$.d2 = SerializerFactory;
  _.$_$.e2 = createAnnotatedEnumSerializer;
  _.$_$.f2 = createSimpleEnumSerializer;
  _.$_$.g2 = jsonCachedSerialNames;
  _.$_$.h2 = throwArrayMissingFieldException;
  _.$_$.i2 = throwMissingFieldException;
  _.$_$.j2 = EmptySerializersModule_0;
  _.$_$.k2 = contextual;
  _.$_$.l2 = SerializersModuleCollector;
  _.$_$.m2 = DeserializationStrategy;
  _.$_$.n2 = KSerializer;
  _.$_$.o2 = MissingFieldException;
  _.$_$.p2 = SealedClassSerializer;
  _.$_$.q2 = SerializationException;
  _.$_$.r2 = SerializationStrategy;
  _.$_$.s2 = findPolymorphicSerializer_0;
  _.$_$.t2 = findPolymorphicSerializer;
  _.$_$.u2 = serializer_0;
  _.$_$.v2 = serializer;
  //endregion
  return _;
}));

//# sourceMappingURL=kotlinx-serialization-kotlinx-serialization-core.js.map
