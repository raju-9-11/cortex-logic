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
    return deserializer.r1k(this);
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
    return $super === VOID ? this.c1o(descriptor, index, deserializer, previousValue) : $super.c1o.call(this, descriptor, index, deserializer, previousValue);
  }
  initMetadataForInterface(CompositeDecoder, 'CompositeDecoder');
  initMetadataForClass(AbstractDecoder, 'AbstractDecoder', VOID, VOID, [Decoder, CompositeDecoder]);
  function encodeNotNullMark() {
  }
  function beginCollection(descriptor, collectionSize) {
    return this.q1n(descriptor);
  }
  function encodeSerializableValue(serializer, value) {
    serializer.q1k(this, value);
  }
  function encodeNullableSerializableValue(serializer, value) {
    var isNullabilitySupported = serializer.p1k().p1l();
    if (isNullabilitySupported) {
      return this.i1p(isInterface(serializer, SerializationStrategy) ? serializer : THROW_CCE(), value);
    }
    if (value == null) {
      this.l1o();
    } else {
      this.l1p();
      this.i1p(serializer, value);
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
    return this.a25(kClass, SerializersModuleCollector$contextual$lambda(serializer));
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
      $this$buildSerialDescriptor.a1l('type', serializer_0(StringCompanionObject_instance).p1k());
      $this$buildSerialDescriptor.a1l('value', buildSerialDescriptor('kotlinx.serialization.Polymorphic<' + this$0.b1l_1.ua() + '>', CONTEXTUAL_getInstance(), []));
      $this$buildSerialDescriptor.u1k_1 = this$0.c1l_1;
      return Unit_instance;
    };
  }
  function PolymorphicSerializer$descriptor$delegate$lambda(this$0) {
    return function () {
      var tmp = OPEN_getInstance();
      return withContext(buildSerialDescriptor('kotlinx.serialization.Polymorphic', tmp, [], PolymorphicSerializer$descriptor$delegate$lambda$lambda(this$0)), this$0.b1l_1);
    };
  }
  function PolymorphicSerializer(baseClass) {
    AbstractPolymorphicSerializer.call(this);
    this.b1l_1 = baseClass;
    this.c1l_1 = emptyList();
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp.d1l_1 = lazy(tmp_0, PolymorphicSerializer$descriptor$delegate$lambda(this));
  }
  protoOf(PolymorphicSerializer).e1l = function () {
    return this.b1l_1;
  };
  protoOf(PolymorphicSerializer).p1k = function () {
    var tmp0 = this.d1l_1;
    // Inline function 'kotlin.getValue' call
    descriptor$factory();
    return tmp0.w();
  };
  protoOf(PolymorphicSerializer).toString = function () {
    return 'kotlinx.serialization.PolymorphicSerializer(baseClass: ' + toString(this.b1l_1) + ')';
  };
  function findPolymorphicSerializer(_this__u8e3s4, encoder, value) {
    var tmp0_elvis_lhs = _this__u8e3s4.h1l(encoder, value);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throwSubtypeNotRegistered(getKClassFromExpression(value), _this__u8e3s4.e1l());
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function findPolymorphicSerializer_0(_this__u8e3s4, decoder, klassName) {
    var tmp0_elvis_lhs = _this__u8e3s4.g1l(decoder, klassName);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throwSubtypeNotRegistered_0(klassName, _this__u8e3s4.e1l());
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function descriptor$factory() {
    return getPropertyCallableRef('descriptor', 1, KProperty1, function (receiver) {
      return receiver.p1k();
    }, null);
  }
  function SealedClassSerializer() {
  }
  protoOf(SealedClassSerializer).p1k = function () {
    var tmp0 = this.i1l_1;
    // Inline function 'kotlin.getValue' call
    descriptor$factory_0();
    return tmp0.w();
  };
  function descriptor$factory_0() {
    return getPropertyCallableRef('descriptor', 1, KProperty1, function (receiver) {
      return receiver.p1k();
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
    this.j1l_1 = missingFields;
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
    var isNullable = type.lb();
    // Inline function 'kotlin.collections.map' call
    var this_0 = type.kb();
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
      if (isInterface_0(rootClass) && !(_this__u8e3s4.l1l(rootClass) == null)) {
        tmp_0 = null;
      } else {
        tmp_0 = findCachedSerializer(rootClass, isNullable);
      }
      tmp = tmp_0;
    } else {
      var tmp_1;
      if (_this__u8e3s4.k1l()) {
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
      var tmp1_elvis_lhs = tmp0_elvis_lhs == null ? _this__u8e3s4.l1l(rootClass) : tmp0_elvis_lhs;
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
      var tmp4_elvis_lhs = tmp3_elvis_lhs == null ? _this__u8e3s4.m1l(rootClass, serializers) : tmp3_elvis_lhs;
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
      return $typeArguments.o(0).jb();
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
      var tmp0_safe_receiver = get_SERIALIZERS_CACHE().n1l(clazz);
      var tmp_0;
      if (tmp0_safe_receiver == null) {
        tmp_0 = null;
      } else {
        // Inline function 'kotlinx.serialization.internal.cast' call
        tmp_0 = isInterface(tmp0_safe_receiver, KSerializer) ? tmp0_safe_receiver : THROW_CCE();
      }
      tmp = tmp_0;
    } else {
      tmp = get_SERIALIZERS_CACHE_NULLABLE().n1l(clazz);
    }
    return tmp;
  }
  function findParametrizedCachedSerializer(clazz, types, isNullable) {
    _init_properties_SerializersCache_kt__hgwi2p();
    var tmp;
    if (!isNullable) {
      var tmp_0 = get_PARAMETRIZED_SERIALIZERS_CACHE().o1l(clazz, types);
      tmp = new Result(tmp_0) instanceof Result ? tmp_0 : THROW_CCE();
    } else {
      tmp = get_PARAMETRIZED_SERIALIZERS_CACHE_NULLABLE().o1l(clazz, types);
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
      return $types.o(0).jb();
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
      return $types.o(0).jb();
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
    if (_this__u8e3s4.p1k().p1l()) {
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
    this.q1l_1 = original;
    this.r1l_1 = kClass;
    this.s1l_1 = this.q1l_1.t1l() + '<' + this.r1l_1.ua() + '>';
  }
  protoOf(ContextDescriptor).t1l = function () {
    return this.s1l_1;
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
    return equals(this.q1l_1, another.q1l_1) && another.r1l_1.equals(this.r1l_1);
  };
  protoOf(ContextDescriptor).hashCode = function () {
    var result = this.r1l_1.hashCode();
    result = imul(31, result) + getStringHashCode(this.s1l_1) | 0;
    return result;
  };
  protoOf(ContextDescriptor).toString = function () {
    return 'ContextDescriptor(kClass: ' + toString(this.r1l_1) + ', original: ' + toString(this.q1l_1) + ')';
  };
  protoOf(ContextDescriptor).u1l = function () {
    return this.q1l_1.u1l();
  };
  protoOf(ContextDescriptor).p1l = function () {
    return this.q1l_1.p1l();
  };
  protoOf(ContextDescriptor).v1l = function () {
    return this.q1l_1.v1l();
  };
  protoOf(ContextDescriptor).w1l = function () {
    return this.q1l_1.w1l();
  };
  protoOf(ContextDescriptor).x1l = function () {
    return this.q1l_1.x1l();
  };
  protoOf(ContextDescriptor).y1l = function (index) {
    return this.q1l_1.y1l(index);
  };
  protoOf(ContextDescriptor).z1l = function (name) {
    return this.q1l_1.z1l(name);
  };
  protoOf(ContextDescriptor).a1m = function (index) {
    return this.q1l_1.a1m(index);
  };
  protoOf(ContextDescriptor).b1m = function (index) {
    return this.q1l_1.b1m(index);
  };
  protoOf(ContextDescriptor).c1m = function (index) {
    return this.q1l_1.c1m(index);
  };
  function getContextualDescriptor(_this__u8e3s4, descriptor) {
    var tmp0_safe_receiver = get_capturedKClass(descriptor);
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      var tmp0_safe_receiver_0 = _this__u8e3s4.l1l(tmp0_safe_receiver);
      tmp = tmp0_safe_receiver_0 == null ? null : tmp0_safe_receiver_0.p1k();
    }
    return tmp;
  }
  function get_capturedKClass(_this__u8e3s4) {
    var tmp;
    if (_this__u8e3s4 instanceof ContextDescriptor) {
      tmp = _this__u8e3s4.r1l_1;
    } else {
      if (_this__u8e3s4 instanceof SerialDescriptorForNullable) {
        tmp = get_capturedKClass(_this__u8e3s4.d1m_1);
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
    this.h1m_1 = $this_elementDescriptors;
    this.g1m_1 = $this_elementDescriptors.w1l();
  }
  protoOf(elementDescriptors$1).h = function () {
    return this.g1m_1 > 0;
  };
  protoOf(elementDescriptors$1).i = function () {
    var tmp = this.h1m_1.w1l();
    var _unary__edvuaz = this.g1m_1;
    this.g1m_1 = _unary__edvuaz - 1 | 0;
    return this.h1m_1.b1m(tmp - _unary__edvuaz | 0);
  };
  function elementDescriptors$$inlined$Iterable$1($this_elementDescriptors) {
    this.i1m_1 = $this_elementDescriptors;
  }
  protoOf(elementDescriptors$$inlined$Iterable$1).g = function () {
    return new elementDescriptors$1(this.i1m_1);
  };
  function elementNames$1($this_elementNames) {
    this.k1m_1 = $this_elementNames;
    this.j1m_1 = $this_elementNames.w1l();
  }
  protoOf(elementNames$1).h = function () {
    return this.j1m_1 > 0;
  };
  protoOf(elementNames$1).i = function () {
    var tmp = this.k1m_1.w1l();
    var _unary__edvuaz = this.j1m_1;
    this.j1m_1 = _unary__edvuaz - 1 | 0;
    return this.k1m_1.y1l(tmp - _unary__edvuaz | 0);
  };
  function elementNames$$inlined$Iterable$1($this_elementNames) {
    this.l1m_1 = $this_elementNames;
  }
  protoOf(elementNames$$inlined$Iterable$1).g = function () {
    return new elementNames$1(this.l1m_1);
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
    return new SerialDescriptorImpl(serialName, kind, sdBuilder.v1k_1.j(), toList(typeParameters), sdBuilder);
  }
  function ClassSerialDescriptorBuilder(serialName) {
    this.s1k_1 = serialName;
    this.t1k_1 = false;
    this.u1k_1 = emptyList();
    this.v1k_1 = ArrayList_init_$Create$_0();
    this.w1k_1 = HashSet_init_$Create$();
    this.x1k_1 = ArrayList_init_$Create$_0();
    this.y1k_1 = ArrayList_init_$Create$_0();
    this.z1k_1 = ArrayList_init_$Create$_0();
  }
  protoOf(ClassSerialDescriptorBuilder).m1m = function (elementName, descriptor, annotations, isOptional) {
    // Inline function 'kotlin.require' call
    if (!this.w1k_1.e(elementName)) {
      var message = "Element with name '" + elementName + "' is already registered in " + this.s1k_1;
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    // Inline function 'kotlin.collections.plusAssign' call
    this.v1k_1.e(elementName);
    // Inline function 'kotlin.collections.plusAssign' call
    this.x1k_1.e(descriptor);
    // Inline function 'kotlin.collections.plusAssign' call
    this.y1k_1.e(annotations);
    // Inline function 'kotlin.collections.plusAssign' call
    this.z1k_1.e(isOptional);
  };
  protoOf(ClassSerialDescriptorBuilder).a1l = function (elementName, descriptor, annotations, isOptional, $super) {
    annotations = annotations === VOID ? emptyList() : annotations;
    isOptional = isOptional === VOID ? false : isOptional;
    var tmp;
    if ($super === VOID) {
      this.m1m(elementName, descriptor, annotations, isOptional);
      tmp = Unit_instance;
    } else {
      tmp = $super.m1m.call(this, elementName, descriptor, annotations, isOptional);
    }
    return tmp;
  };
  function _get__hashCode__tgwhef($this) {
    var tmp0 = $this.y1m_1;
    // Inline function 'kotlin.getValue' call
    _hashCode$factory();
    return tmp0.w();
  }
  function SerialDescriptorImpl$_hashCode$delegate$lambda(this$0) {
    return function () {
      return hashCodeImpl(this$0, this$0.x1m_1);
    };
  }
  function SerialDescriptorImpl$toString$lambda(this$0) {
    return function (it) {
      return this$0.y1l(it) + ': ' + this$0.b1m(it).t1l();
    };
  }
  function SerialDescriptorImpl(serialName, kind, elementsCount, typeParameters, builder) {
    this.n1m_1 = serialName;
    this.o1m_1 = kind;
    this.p1m_1 = elementsCount;
    this.q1m_1 = builder.u1k_1;
    this.r1m_1 = toHashSet(builder.v1k_1);
    var tmp = this;
    // Inline function 'kotlin.collections.toTypedArray' call
    var this_0 = builder.v1k_1;
    tmp.s1m_1 = copyToArray(this_0);
    this.t1m_1 = compactArray(builder.x1k_1);
    var tmp_0 = this;
    // Inline function 'kotlin.collections.toTypedArray' call
    var this_1 = builder.y1k_1;
    tmp_0.u1m_1 = copyToArray(this_1);
    this.v1m_1 = toBooleanArray(builder.z1k_1);
    var tmp_1 = this;
    // Inline function 'kotlin.collections.map' call
    var this_2 = withIndex(this.s1m_1);
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$(collectionSizeOrDefault(this_2, 10));
    var _iterator__ex2g4s = this_2.g();
    while (_iterator__ex2g4s.h()) {
      var item = _iterator__ex2g4s.i();
      var tmp$ret$2 = to(item.fg_1, item.eg_1);
      destination.e(tmp$ret$2);
    }
    tmp_1.w1m_1 = toMap(destination);
    this.x1m_1 = compactArray(typeParameters);
    var tmp_2 = this;
    tmp_2.y1m_1 = lazy_0(SerialDescriptorImpl$_hashCode$delegate$lambda(this));
  }
  protoOf(SerialDescriptorImpl).t1l = function () {
    return this.n1m_1;
  };
  protoOf(SerialDescriptorImpl).u1l = function () {
    return this.o1m_1;
  };
  protoOf(SerialDescriptorImpl).w1l = function () {
    return this.p1m_1;
  };
  protoOf(SerialDescriptorImpl).x1l = function () {
    return this.q1m_1;
  };
  protoOf(SerialDescriptorImpl).z1m = function () {
    return this.r1m_1;
  };
  protoOf(SerialDescriptorImpl).y1l = function (index) {
    return getChecked(this.s1m_1, index);
  };
  protoOf(SerialDescriptorImpl).z1l = function (name) {
    var tmp0_elvis_lhs = this.w1m_1.e2(name);
    return tmp0_elvis_lhs == null ? -3 : tmp0_elvis_lhs;
  };
  protoOf(SerialDescriptorImpl).a1m = function (index) {
    return getChecked(this.u1m_1, index);
  };
  protoOf(SerialDescriptorImpl).b1m = function (index) {
    return getChecked(this.t1m_1, index);
  };
  protoOf(SerialDescriptorImpl).c1m = function (index) {
    return getChecked_0(this.v1m_1, index);
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
      if (!(this.t1l() === other.t1l())) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      if (!contentEquals(this.x1m_1, other.x1m_1)) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      if (!(this.w1l() === other.w1l())) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      var inductionVariable = 0;
      var last = this.w1l();
      if (inductionVariable < last)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          if (!(this.b1m(index).t1l() === other.b1m(index).t1l())) {
            tmp$ret$0 = false;
            break $l$block_5;
          }
          if (!equals(this.b1m(index).u1l(), other.b1m(index).u1l())) {
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
    var tmp = until(0, this.p1m_1);
    var tmp_0 = this.n1m_1 + '(';
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
    return new SerialDescriptorImpl(serialName, CLASS_getInstance(), sdBuilder.v1k_1.j(), toList(typeParameters), sdBuilder);
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
    return ensureNotNull(getKClassFromExpression(this).ua());
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
  protoOf(AbstractDecoder).a1n = function () {
    throw SerializationException_init_$Create$_0(toString(getKClassFromExpression(this)) + " can't retrieve untyped values");
  };
  protoOf(AbstractDecoder).b1n = function () {
    return true;
  };
  protoOf(AbstractDecoder).c1n = function () {
    return null;
  };
  protoOf(AbstractDecoder).d1n = function () {
    var tmp = this.a1n();
    return typeof tmp === 'boolean' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).e1n = function () {
    var tmp = this.a1n();
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).f1n = function () {
    var tmp = this.a1n();
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).g1n = function () {
    var tmp = this.a1n();
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).h1n = function () {
    var tmp = this.a1n();
    return tmp instanceof Long ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).i1n = function () {
    var tmp = this.a1n();
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).j1n = function () {
    var tmp = this.a1n();
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).k1n = function () {
    var tmp = this.a1n();
    return tmp instanceof Char ? tmp.k1_1 : THROW_CCE();
  };
  protoOf(AbstractDecoder).l1n = function () {
    var tmp = this.a1n();
    return typeof tmp === 'string' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).m1n = function (enumDescriptor) {
    var tmp = this.a1n();
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).n1n = function (descriptor) {
    return this;
  };
  protoOf(AbstractDecoder).o1n = function (deserializer, previousValue) {
    return this.p1n(deserializer);
  };
  protoOf(AbstractDecoder).q1n = function (descriptor) {
    return this;
  };
  protoOf(AbstractDecoder).r1n = function (descriptor) {
  };
  protoOf(AbstractDecoder).s1n = function (descriptor, index) {
    return this.d1n();
  };
  protoOf(AbstractDecoder).t1n = function (descriptor, index) {
    return this.e1n();
  };
  protoOf(AbstractDecoder).u1n = function (descriptor, index) {
    return this.f1n();
  };
  protoOf(AbstractDecoder).v1n = function (descriptor, index) {
    return this.g1n();
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
    return this.n1n(descriptor.b1m(index));
  };
  protoOf(AbstractDecoder).c1o = function (descriptor, index, deserializer, previousValue) {
    return this.o1n(deserializer, previousValue);
  };
  protoOf(AbstractDecoder).e1o = function (descriptor, index, deserializer, previousValue) {
    // Inline function 'kotlinx.serialization.encoding.decodeIfNullable' call
    var isNullabilitySupported = deserializer.p1k().p1l();
    var tmp;
    if (isNullabilitySupported || this.b1n()) {
      tmp = this.o1n(deserializer, previousValue);
    } else {
      tmp = this.c1n();
    }
    return tmp;
  };
  function AbstractEncoder() {
  }
  protoOf(AbstractEncoder).q1n = function (descriptor) {
    return this;
  };
  protoOf(AbstractEncoder).r1n = function (descriptor) {
  };
  protoOf(AbstractEncoder).j1o = function (descriptor, index) {
    return true;
  };
  protoOf(AbstractEncoder).k1o = function (value) {
    throw SerializationException_init_$Create$_0('Non-serializable ' + toString(getKClassFromExpression(value)) + ' is not supported by ' + toString(getKClassFromExpression(this)) + ' encoder');
  };
  protoOf(AbstractEncoder).l1o = function () {
    throw SerializationException_init_$Create$_0("'null' is not supported by default");
  };
  protoOf(AbstractEncoder).m1o = function (value) {
    return this.k1o(value);
  };
  protoOf(AbstractEncoder).n1o = function (value) {
    return this.k1o(value);
  };
  protoOf(AbstractEncoder).o1o = function (value) {
    return this.k1o(value);
  };
  protoOf(AbstractEncoder).p1o = function (value) {
    return this.k1o(value);
  };
  protoOf(AbstractEncoder).q1o = function (value) {
    return this.k1o(value);
  };
  protoOf(AbstractEncoder).r1o = function (value) {
    return this.k1o(value);
  };
  protoOf(AbstractEncoder).s1o = function (value) {
    return this.k1o(value);
  };
  protoOf(AbstractEncoder).t1o = function (value) {
    return this.k1o(new Char(value));
  };
  protoOf(AbstractEncoder).u1o = function (value) {
    return this.k1o(value);
  };
  protoOf(AbstractEncoder).v1o = function (enumDescriptor, index) {
    return this.k1o(index);
  };
  protoOf(AbstractEncoder).w1o = function (descriptor) {
    return this;
  };
  protoOf(AbstractEncoder).x1o = function (descriptor, index, value) {
    if (this.j1o(descriptor, index)) {
      this.m1o(value);
    }
  };
  protoOf(AbstractEncoder).y1o = function (descriptor, index, value) {
    if (this.j1o(descriptor, index)) {
      this.n1o(value);
    }
  };
  protoOf(AbstractEncoder).z1o = function (descriptor, index, value) {
    if (this.j1o(descriptor, index)) {
      this.o1o(value);
    }
  };
  protoOf(AbstractEncoder).a1p = function (descriptor, index, value) {
    if (this.j1o(descriptor, index)) {
      this.p1o(value);
    }
  };
  protoOf(AbstractEncoder).b1p = function (descriptor, index, value) {
    if (this.j1o(descriptor, index)) {
      this.q1o(value);
    }
  };
  protoOf(AbstractEncoder).c1p = function (descriptor, index, value) {
    if (this.j1o(descriptor, index)) {
      this.r1o(value);
    }
  };
  protoOf(AbstractEncoder).d1p = function (descriptor, index, value) {
    if (this.j1o(descriptor, index)) {
      this.s1o(value);
    }
  };
  protoOf(AbstractEncoder).e1p = function (descriptor, index, value) {
    if (this.j1o(descriptor, index)) {
      this.t1o(value);
    }
  };
  protoOf(AbstractEncoder).f1p = function (descriptor, index, value) {
    if (this.j1o(descriptor, index)) {
      this.u1o(value);
    }
  };
  protoOf(AbstractEncoder).g1p = function (descriptor, index) {
    return this.j1o(descriptor, index) ? this.w1o(descriptor.b1m(index)) : NoOpEncoder_getInstance();
  };
  protoOf(AbstractEncoder).h1p = function (descriptor, index, serializer, value) {
    if (this.j1o(descriptor, index)) {
      this.i1p(serializer, value);
    }
  };
  protoOf(AbstractEncoder).j1p = function (descriptor, index, serializer, value) {
    if (this.j1o(descriptor, index)) {
      this.k1p(serializer, value);
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
    var klassName = compositeDecoder.a1o($this.p1k(), 0);
    var serializer = findPolymorphicSerializer_0($this, compositeDecoder, klassName);
    return compositeDecoder.d1o($this.p1k(), 1, serializer);
  }
  function AbstractPolymorphicSerializer() {
  }
  protoOf(AbstractPolymorphicSerializer).f1l = function (encoder, value) {
    var actualSerializer = findPolymorphicSerializer(this, encoder, value);
    // Inline function 'kotlinx.serialization.encoding.encodeStructure' call
    var descriptor = this.p1k();
    var composite = encoder.q1n(descriptor);
    composite.f1p(this.p1k(), 0, actualSerializer.p1k().t1l());
    var tmp = this.p1k();
    // Inline function 'kotlinx.serialization.internal.cast' call
    var tmp$ret$0 = isInterface(actualSerializer, SerializationStrategy) ? actualSerializer : THROW_CCE();
    composite.h1p(tmp, 1, tmp$ret$0, value);
    composite.r1n(descriptor);
  };
  protoOf(AbstractPolymorphicSerializer).q1k = function (encoder, value) {
    return this.f1l(encoder, !(value == null) ? value : THROW_CCE());
  };
  protoOf(AbstractPolymorphicSerializer).r1k = function (decoder) {
    // Inline function 'kotlinx.serialization.encoding.decodeStructure' call
    var descriptor = this.p1k();
    var composite = decoder.q1n(descriptor);
    var tmp$ret$0;
    $l$block: {
      var klassName = null;
      var value = null;
      if (composite.g1o()) {
        tmp$ret$0 = decodeSequentially_0(this, composite);
        break $l$block;
      }
      mainLoop: while (true) {
        var index = composite.h1o(this.p1k());
        switch (index) {
          case -1:
            break mainLoop;
          case 0:
            klassName = composite.a1o(this.p1k(), index);
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
            value = composite.d1o(this.p1k(), index, serializer);
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
    composite.r1n(descriptor);
    return result;
  };
  protoOf(AbstractPolymorphicSerializer).g1l = function (decoder, klassName) {
    return decoder.f1o().o1p(this.e1l(), klassName);
  };
  protoOf(AbstractPolymorphicSerializer).h1l = function (encoder, value) {
    return encoder.f1o().p1p(this.e1l(), value);
  };
  function throwSubtypeNotRegistered(subClass, baseClass) {
    var tmp0_elvis_lhs = subClass.ua();
    throwSubtypeNotRegistered_0(tmp0_elvis_lhs == null ? toString(subClass) : tmp0_elvis_lhs, baseClass);
  }
  function throwSubtypeNotRegistered_0(subClassName, baseClass) {
    var scope = "in the polymorphic scope of '" + baseClass.ua() + "'";
    throw SerializationException_init_$Create$_0(subClassName == null ? 'Class discriminator was missing and no default serializers were registered ' + scope + '.' : "Serializer for subclass '" + subClassName + "' is not found " + scope + '.\n' + ("Check if class with serial name '" + subClassName + "' exists and serializer is registered in a corresponding SerializersModule.\n") + ("To be registered automatically, class '" + subClassName + "' has to be '@Serializable', and the base class '" + baseClass.ua() + "' has to be sealed and '@Serializable'."));
  }
  function NothingSerializer_0() {
    NothingSerializer_instance = this;
    this.q1p_1 = NothingSerialDescriptor_getInstance();
  }
  protoOf(NothingSerializer_0).p1k = function () {
    return this.q1p_1;
  };
  protoOf(NothingSerializer_0).r1p = function (encoder, value) {
    throw SerializationException_init_$Create$_0("'kotlin.Nothing' cannot be serialized");
  };
  protoOf(NothingSerializer_0).q1k = function (encoder, value) {
    var tmp;
    if (false) {
      tmp = value;
    } else {
      tmp = THROW_CCE();
    }
    return this.r1p(encoder, tmp);
  };
  protoOf(NothingSerializer_0).r1k = function (decoder) {
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
    this.s1p_1 = new PrimitiveSerialDescriptor_0('kotlin.time.Duration', STRING_getInstance());
  }
  protoOf(DurationSerializer).p1k = function () {
    return this.s1p_1;
  };
  protoOf(DurationSerializer).t1p = function (encoder, value) {
    encoder.u1o(Duration__toIsoString_impl_9h6wsm(value));
  };
  protoOf(DurationSerializer).q1k = function (encoder, value) {
    return this.t1p(encoder, value instanceof Duration ? value.gl_1 : THROW_CCE());
  };
  protoOf(DurationSerializer).u1p = function (decoder) {
    return Companion_getInstance().fl(decoder.l1n());
  };
  protoOf(DurationSerializer).r1k = function (decoder) {
    return new Duration(this.u1p(decoder));
  };
  var DurationSerializer_instance;
  function DurationSerializer_getInstance() {
    if (DurationSerializer_instance == null)
      new DurationSerializer();
    return DurationSerializer_instance;
  }
  function UuidSerializer() {
    UuidSerializer_instance = this;
    this.v1p_1 = new PrimitiveSerialDescriptor_0('kotlin.uuid.Uuid', STRING_getInstance());
  }
  protoOf(UuidSerializer).p1k = function () {
    return this.v1p_1;
  };
  protoOf(UuidSerializer).w1p = function (encoder, value) {
    encoder.u1o(value.toString());
  };
  protoOf(UuidSerializer).q1k = function (encoder, value) {
    return this.w1p(encoder, value instanceof Uuid ? value : THROW_CCE());
  };
  protoOf(UuidSerializer).r1k = function (decoder) {
    return Companion_getInstance_0().zl(decoder.l1n());
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
  protoOf(ArrayListClassDesc).t1l = function () {
    return 'kotlin.collections.ArrayList';
  };
  function HashSetClassDesc(elementDesc) {
    ListLikeDescriptor.call(this, elementDesc);
  }
  protoOf(HashSetClassDesc).t1l = function () {
    return 'kotlin.collections.HashSet';
  };
  function LinkedHashSetClassDesc(elementDesc) {
    ListLikeDescriptor.call(this, elementDesc);
  }
  protoOf(LinkedHashSetClassDesc).t1l = function () {
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
  protoOf(ArrayClassDesc).t1l = function () {
    return 'kotlin.Array';
  };
  function ListLikeDescriptor(elementDescriptor) {
    this.z1p_1 = elementDescriptor;
    this.a1q_1 = 1;
  }
  protoOf(ListLikeDescriptor).u1l = function () {
    return LIST_getInstance();
  };
  protoOf(ListLikeDescriptor).w1l = function () {
    return this.a1q_1;
  };
  protoOf(ListLikeDescriptor).y1l = function (index) {
    return index.toString();
  };
  protoOf(ListLikeDescriptor).z1l = function (name) {
    var tmp0_elvis_lhs = toIntOrNull(name);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throw IllegalArgumentException_init_$Create$(name + ' is not a valid list index');
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  };
  protoOf(ListLikeDescriptor).c1m = function (index) {
    // Inline function 'kotlin.require' call
    if (!(index >= 0)) {
      var message = 'Illegal index ' + index + ', ' + this.t1l() + ' expects only non-negative indices';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return false;
  };
  protoOf(ListLikeDescriptor).a1m = function (index) {
    // Inline function 'kotlin.require' call
    if (!(index >= 0)) {
      var message = 'Illegal index ' + index + ', ' + this.t1l() + ' expects only non-negative indices';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return emptyList();
  };
  protoOf(ListLikeDescriptor).b1m = function (index) {
    // Inline function 'kotlin.require' call
    if (!(index >= 0)) {
      var message = 'Illegal index ' + index + ', ' + this.t1l() + ' expects only non-negative indices';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return this.z1p_1;
  };
  protoOf(ListLikeDescriptor).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof ListLikeDescriptor))
      return false;
    if (equals(this.z1p_1, other.z1p_1) && this.t1l() === other.t1l())
      return true;
    return false;
  };
  protoOf(ListLikeDescriptor).hashCode = function () {
    return imul(hashCode(this.z1p_1), 31) + getStringHashCode(this.t1l()) | 0;
  };
  protoOf(ListLikeDescriptor).toString = function () {
    return this.t1l() + '(' + toString(this.z1p_1) + ')';
  };
  function MapLikeDescriptor(serialName, keyDescriptor, valueDescriptor) {
    this.f1q_1 = serialName;
    this.g1q_1 = keyDescriptor;
    this.h1q_1 = valueDescriptor;
    this.i1q_1 = 2;
  }
  protoOf(MapLikeDescriptor).t1l = function () {
    return this.f1q_1;
  };
  protoOf(MapLikeDescriptor).u1l = function () {
    return MAP_getInstance();
  };
  protoOf(MapLikeDescriptor).w1l = function () {
    return this.i1q_1;
  };
  protoOf(MapLikeDescriptor).y1l = function (index) {
    return index.toString();
  };
  protoOf(MapLikeDescriptor).z1l = function (name) {
    var tmp0_elvis_lhs = toIntOrNull(name);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throw IllegalArgumentException_init_$Create$(name + ' is not a valid map index');
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  };
  protoOf(MapLikeDescriptor).c1m = function (index) {
    // Inline function 'kotlin.require' call
    if (!(index >= 0)) {
      var message = 'Illegal index ' + index + ', ' + this.t1l() + ' expects only non-negative indices';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return false;
  };
  protoOf(MapLikeDescriptor).a1m = function (index) {
    // Inline function 'kotlin.require' call
    if (!(index >= 0)) {
      var message = 'Illegal index ' + index + ', ' + this.t1l() + ' expects only non-negative indices';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return emptyList();
  };
  protoOf(MapLikeDescriptor).b1m = function (index) {
    // Inline function 'kotlin.require' call
    if (!(index >= 0)) {
      var message = 'Illegal index ' + index + ', ' + this.t1l() + ' expects only non-negative indices';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    var tmp;
    switch (index % 2 | 0) {
      case 0:
        tmp = this.g1q_1;
        break;
      case 1:
        tmp = this.h1q_1;
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
    if (!(this.t1l() === other.t1l()))
      return false;
    if (!equals(this.g1q_1, other.g1q_1))
      return false;
    if (!equals(this.h1q_1, other.h1q_1))
      return false;
    return true;
  };
  protoOf(MapLikeDescriptor).hashCode = function () {
    var result = getStringHashCode(this.t1l());
    result = imul(31, result) + hashCode(this.g1q_1) | 0;
    result = imul(31, result) + hashCode(this.h1q_1) | 0;
    return result;
  };
  protoOf(MapLikeDescriptor).toString = function () {
    return this.t1l() + '(' + toString(this.g1q_1) + ', ' + toString(this.h1q_1) + ')';
  };
  function PrimitiveArrayDescriptor(primitive) {
    ListLikeDescriptor.call(this, primitive);
    this.n1q_1 = primitive.t1l() + 'Array';
  }
  protoOf(PrimitiveArrayDescriptor).t1l = function () {
    return this.n1q_1;
  };
  function ArrayListSerializer(element) {
    CollectionSerializer.call(this, element);
    this.p1q_1 = new ArrayListClassDesc(element.p1k());
  }
  protoOf(ArrayListSerializer).p1k = function () {
    return this.p1q_1;
  };
  protoOf(ArrayListSerializer).q1q = function () {
    // Inline function 'kotlin.collections.arrayListOf' call
    return ArrayList_init_$Create$_0();
  };
  protoOf(ArrayListSerializer).r1q = function (_this__u8e3s4) {
    return _this__u8e3s4.j();
  };
  protoOf(ArrayListSerializer).s1q = function (_this__u8e3s4) {
    return this.r1q(_this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ArrayListSerializer).t1q = function (_this__u8e3s4) {
    return _this__u8e3s4;
  };
  protoOf(ArrayListSerializer).u1q = function (_this__u8e3s4) {
    return this.t1q(_this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ArrayListSerializer).v1q = function (_this__u8e3s4) {
    var tmp0_elvis_lhs = _this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : null;
    return tmp0_elvis_lhs == null ? ArrayList_init_$Create$_1(_this__u8e3s4) : tmp0_elvis_lhs;
  };
  protoOf(ArrayListSerializer).w1q = function (_this__u8e3s4) {
    return this.v1q((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtList) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ArrayListSerializer).x1q = function (_this__u8e3s4, size) {
    return _this__u8e3s4.i5(size);
  };
  protoOf(ArrayListSerializer).y1q = function (_this__u8e3s4, size) {
    return this.x1q(_this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE(), size);
  };
  protoOf(ArrayListSerializer).z1q = function (_this__u8e3s4, index, element) {
    _this__u8e3s4.a2(index, element);
  };
  protoOf(ArrayListSerializer).a1r = function (_this__u8e3s4, index, element) {
    var tmp = _this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE();
    return this.z1q(tmp, index, (element == null ? true : !(element == null)) ? element : THROW_CCE());
  };
  function HashSetSerializer(eSerializer) {
    CollectionSerializer.call(this, eSerializer);
    this.l1r_1 = new HashSetClassDesc(eSerializer.p1k());
  }
  protoOf(HashSetSerializer).p1k = function () {
    return this.l1r_1;
  };
  protoOf(HashSetSerializer).q1q = function () {
    return HashSet_init_$Create$();
  };
  protoOf(HashSetSerializer).m1r = function (_this__u8e3s4) {
    return _this__u8e3s4.j();
  };
  protoOf(HashSetSerializer).s1q = function (_this__u8e3s4) {
    return this.m1r(_this__u8e3s4 instanceof HashSet ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(HashSetSerializer).n1r = function (_this__u8e3s4) {
    return _this__u8e3s4;
  };
  protoOf(HashSetSerializer).u1q = function (_this__u8e3s4) {
    return this.n1r(_this__u8e3s4 instanceof HashSet ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(HashSetSerializer).o1r = function (_this__u8e3s4) {
    var tmp0_elvis_lhs = _this__u8e3s4 instanceof HashSet ? _this__u8e3s4 : null;
    return tmp0_elvis_lhs == null ? HashSet_init_$Create$_0(_this__u8e3s4) : tmp0_elvis_lhs;
  };
  protoOf(HashSetSerializer).w1q = function (_this__u8e3s4) {
    return this.o1r((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtSet) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(HashSetSerializer).p1r = function (_this__u8e3s4, size) {
  };
  protoOf(HashSetSerializer).y1q = function (_this__u8e3s4, size) {
    return this.p1r(_this__u8e3s4 instanceof HashSet ? _this__u8e3s4 : THROW_CCE(), size);
  };
  protoOf(HashSetSerializer).q1r = function (_this__u8e3s4, index, element) {
    _this__u8e3s4.e(element);
  };
  protoOf(HashSetSerializer).a1r = function (_this__u8e3s4, index, element) {
    var tmp = _this__u8e3s4 instanceof HashSet ? _this__u8e3s4 : THROW_CCE();
    return this.q1r(tmp, index, (element == null ? true : !(element == null)) ? element : THROW_CCE());
  };
  function LinkedHashSetSerializer(eSerializer) {
    CollectionSerializer.call(this, eSerializer);
    this.s1r_1 = new LinkedHashSetClassDesc(eSerializer.p1k());
  }
  protoOf(LinkedHashSetSerializer).p1k = function () {
    return this.s1r_1;
  };
  protoOf(LinkedHashSetSerializer).q1q = function () {
    // Inline function 'kotlin.collections.linkedSetOf' call
    return LinkedHashSet_init_$Create$();
  };
  protoOf(LinkedHashSetSerializer).t1r = function (_this__u8e3s4) {
    return _this__u8e3s4.j();
  };
  protoOf(LinkedHashSetSerializer).s1q = function (_this__u8e3s4) {
    return this.t1r(_this__u8e3s4 instanceof LinkedHashSet ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashSetSerializer).u1r = function (_this__u8e3s4) {
    return _this__u8e3s4;
  };
  protoOf(LinkedHashSetSerializer).u1q = function (_this__u8e3s4) {
    return this.u1r(_this__u8e3s4 instanceof LinkedHashSet ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashSetSerializer).o1r = function (_this__u8e3s4) {
    var tmp0_elvis_lhs = _this__u8e3s4 instanceof LinkedHashSet ? _this__u8e3s4 : null;
    return tmp0_elvis_lhs == null ? LinkedHashSet_init_$Create$_0(_this__u8e3s4) : tmp0_elvis_lhs;
  };
  protoOf(LinkedHashSetSerializer).w1q = function (_this__u8e3s4) {
    return this.o1r((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtSet) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashSetSerializer).v1r = function (_this__u8e3s4, size) {
  };
  protoOf(LinkedHashSetSerializer).y1q = function (_this__u8e3s4, size) {
    return this.v1r(_this__u8e3s4 instanceof LinkedHashSet ? _this__u8e3s4 : THROW_CCE(), size);
  };
  protoOf(LinkedHashSetSerializer).w1r = function (_this__u8e3s4, index, element) {
    _this__u8e3s4.e(element);
  };
  protoOf(LinkedHashSetSerializer).a1r = function (_this__u8e3s4, index, element) {
    var tmp = _this__u8e3s4 instanceof LinkedHashSet ? _this__u8e3s4 : THROW_CCE();
    return this.w1r(tmp, index, (element == null ? true : !(element == null)) ? element : THROW_CCE());
  };
  function HashMapSerializer(kSerializer, vSerializer) {
    MapLikeSerializer.call(this, kSerializer, vSerializer);
    this.z1r_1 = new HashMapClassDesc(kSerializer.p1k(), vSerializer.p1k());
  }
  protoOf(HashMapSerializer).p1k = function () {
    return this.z1r_1;
  };
  protoOf(HashMapSerializer).a1s = function (_this__u8e3s4) {
    return _this__u8e3s4.j();
  };
  protoOf(HashMapSerializer).b1s = function (_this__u8e3s4) {
    return this.a1s((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtMap) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(HashMapSerializer).c1s = function (_this__u8e3s4) {
    // Inline function 'kotlin.collections.iterator' call
    return _this__u8e3s4.u().g();
  };
  protoOf(HashMapSerializer).d1s = function (_this__u8e3s4) {
    return this.c1s((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtMap) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(HashMapSerializer).q1q = function () {
    return HashMap_init_$Create$();
  };
  protoOf(HashMapSerializer).e1s = function (_this__u8e3s4) {
    return imul(_this__u8e3s4.j(), 2);
  };
  protoOf(HashMapSerializer).s1q = function (_this__u8e3s4) {
    return this.e1s(_this__u8e3s4 instanceof HashMap ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(HashMapSerializer).f1s = function (_this__u8e3s4) {
    return _this__u8e3s4;
  };
  protoOf(HashMapSerializer).u1q = function (_this__u8e3s4) {
    return this.f1s(_this__u8e3s4 instanceof HashMap ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(HashMapSerializer).g1s = function (_this__u8e3s4) {
    var tmp0_elvis_lhs = _this__u8e3s4 instanceof HashMap ? _this__u8e3s4 : null;
    return tmp0_elvis_lhs == null ? HashMap_init_$Create$_0(_this__u8e3s4) : tmp0_elvis_lhs;
  };
  protoOf(HashMapSerializer).w1q = function (_this__u8e3s4) {
    return this.g1s((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtMap) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(HashMapSerializer).h1s = function (_this__u8e3s4, size) {
  };
  protoOf(HashMapSerializer).y1q = function (_this__u8e3s4, size) {
    return this.h1s(_this__u8e3s4 instanceof HashMap ? _this__u8e3s4 : THROW_CCE(), size);
  };
  function LinkedHashMapSerializer(kSerializer, vSerializer) {
    MapLikeSerializer.call(this, kSerializer, vSerializer);
    this.o1s_1 = new LinkedHashMapClassDesc(kSerializer.p1k(), vSerializer.p1k());
  }
  protoOf(LinkedHashMapSerializer).p1k = function () {
    return this.o1s_1;
  };
  protoOf(LinkedHashMapSerializer).a1s = function (_this__u8e3s4) {
    return _this__u8e3s4.j();
  };
  protoOf(LinkedHashMapSerializer).b1s = function (_this__u8e3s4) {
    return this.a1s((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtMap) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashMapSerializer).c1s = function (_this__u8e3s4) {
    // Inline function 'kotlin.collections.iterator' call
    return _this__u8e3s4.u().g();
  };
  protoOf(LinkedHashMapSerializer).d1s = function (_this__u8e3s4) {
    return this.c1s((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtMap) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashMapSerializer).q1q = function () {
    return LinkedHashMap_init_$Create$();
  };
  protoOf(LinkedHashMapSerializer).p1s = function (_this__u8e3s4) {
    return imul(_this__u8e3s4.j(), 2);
  };
  protoOf(LinkedHashMapSerializer).s1q = function (_this__u8e3s4) {
    return this.p1s(_this__u8e3s4 instanceof LinkedHashMap ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashMapSerializer).q1s = function (_this__u8e3s4) {
    return _this__u8e3s4;
  };
  protoOf(LinkedHashMapSerializer).u1q = function (_this__u8e3s4) {
    return this.q1s(_this__u8e3s4 instanceof LinkedHashMap ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashMapSerializer).g1s = function (_this__u8e3s4) {
    var tmp0_elvis_lhs = _this__u8e3s4 instanceof LinkedHashMap ? _this__u8e3s4 : null;
    return tmp0_elvis_lhs == null ? LinkedHashMap_init_$Create$_0(_this__u8e3s4) : tmp0_elvis_lhs;
  };
  protoOf(LinkedHashMapSerializer).w1q = function (_this__u8e3s4) {
    return this.g1s((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtMap) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashMapSerializer).r1s = function (_this__u8e3s4, size) {
  };
  protoOf(LinkedHashMapSerializer).y1q = function (_this__u8e3s4, size) {
    return this.r1s(_this__u8e3s4 instanceof LinkedHashMap ? _this__u8e3s4 : THROW_CCE(), size);
  };
  function ReferenceArraySerializer(kClass, eSerializer) {
    CollectionLikeSerializer.call(this, eSerializer);
    this.t1s_1 = kClass;
    this.u1s_1 = new ArrayClassDesc(eSerializer.p1k());
  }
  protoOf(ReferenceArraySerializer).p1k = function () {
    return this.u1s_1;
  };
  protoOf(ReferenceArraySerializer).v1s = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(ReferenceArraySerializer).b1s = function (_this__u8e3s4) {
    return this.v1s((!(_this__u8e3s4 == null) ? isArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ReferenceArraySerializer).w1s = function (_this__u8e3s4) {
    return arrayIterator(_this__u8e3s4);
  };
  protoOf(ReferenceArraySerializer).d1s = function (_this__u8e3s4) {
    return this.w1s((!(_this__u8e3s4 == null) ? isArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ReferenceArraySerializer).q1q = function () {
    // Inline function 'kotlin.collections.arrayListOf' call
    return ArrayList_init_$Create$_0();
  };
  protoOf(ReferenceArraySerializer).x1s = function (_this__u8e3s4) {
    return _this__u8e3s4.j();
  };
  protoOf(ReferenceArraySerializer).s1q = function (_this__u8e3s4) {
    return this.x1s(_this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ReferenceArraySerializer).y1s = function (_this__u8e3s4) {
    return toNativeArrayImpl(_this__u8e3s4, this.t1s_1);
  };
  protoOf(ReferenceArraySerializer).u1q = function (_this__u8e3s4) {
    return this.y1s(_this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ReferenceArraySerializer).z1s = function (_this__u8e3s4) {
    return ArrayList_init_$Create$_1(asList(_this__u8e3s4));
  };
  protoOf(ReferenceArraySerializer).w1q = function (_this__u8e3s4) {
    return this.z1s((!(_this__u8e3s4 == null) ? isArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ReferenceArraySerializer).a1t = function (_this__u8e3s4, size) {
    return _this__u8e3s4.i5(size);
  };
  protoOf(ReferenceArraySerializer).y1q = function (_this__u8e3s4, size) {
    return this.a1t(_this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE(), size);
  };
  protoOf(ReferenceArraySerializer).b1t = function (_this__u8e3s4, index, element) {
    _this__u8e3s4.a2(index, element);
  };
  protoOf(ReferenceArraySerializer).a1r = function (_this__u8e3s4, index, element) {
    var tmp = _this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE();
    return this.b1t(tmp, index, (element == null ? true : !(element == null)) ? element : THROW_CCE());
  };
  function CollectionSerializer(element) {
    CollectionLikeSerializer.call(this, element);
  }
  protoOf(CollectionSerializer).c1r = function (_this__u8e3s4) {
    return _this__u8e3s4.j();
  };
  protoOf(CollectionSerializer).b1s = function (_this__u8e3s4) {
    return this.c1r((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, Collection) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(CollectionSerializer).d1r = function (_this__u8e3s4) {
    return _this__u8e3s4.g();
  };
  protoOf(CollectionSerializer).d1s = function (_this__u8e3s4) {
    return this.d1r((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, Collection) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  function MapLikeSerializer(keySerializer, valueSerializer) {
    AbstractCollectionSerializer.call(this);
    this.i1s_1 = keySerializer;
    this.j1s_1 = valueSerializer;
  }
  protoOf(MapLikeSerializer).k1s = function (decoder, builder, startIndex, size) {
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
        this.l1s(decoder, startIndex + index | 0, builder, false);
      }
       while (!(index === last));
  };
  protoOf(MapLikeSerializer).g1r = function (decoder, builder, startIndex, size) {
    return this.k1s(decoder, (!(builder == null) ? isInterface(builder, KtMutableMap) : false) ? builder : THROW_CCE(), startIndex, size);
  };
  protoOf(MapLikeSerializer).l1s = function (decoder, index, builder, checkIndex) {
    var key = decoder.d1o(this.p1k(), index, this.i1s_1);
    var tmp;
    if (checkIndex) {
      // Inline function 'kotlin.also' call
      var this_0 = decoder.h1o(this.p1k());
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
    if (builder.c2(key)) {
      var tmp_2 = this.j1s_1.p1k().u1l();
      tmp_1 = !(tmp_2 instanceof PrimitiveKind);
    } else {
      tmp_1 = false;
    }
    if (tmp_1) {
      tmp_0 = decoder.c1o(this.p1k(), vIndex, this.j1s_1, getValue(builder, key));
    } else {
      tmp_0 = decoder.d1o(this.p1k(), vIndex, this.j1s_1);
    }
    var value = tmp_0;
    // Inline function 'kotlin.collections.set' call
    builder.h2(key, value);
  };
  protoOf(MapLikeSerializer).h1r = function (decoder, index, builder, checkIndex) {
    return this.l1s(decoder, index, (!(builder == null) ? isInterface(builder, KtMutableMap) : false) ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(MapLikeSerializer).f1r = function (encoder, value) {
    var size = this.b1s(value);
    // Inline function 'kotlinx.serialization.encoding.encodeCollection' call
    var descriptor = this.p1k();
    var composite = encoder.m1p(descriptor, size);
    var iterator = this.d1s(value);
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
      var tmp = this.p1k();
      var _unary__edvuaz = index;
      index = _unary__edvuaz + 1 | 0;
      composite.h1p(tmp, _unary__edvuaz, this.i1s_1, k);
      var tmp_0 = this.p1k();
      var _unary__edvuaz_0 = index;
      index = _unary__edvuaz_0 + 1 | 0;
      composite.h1p(tmp_0, _unary__edvuaz_0, this.j1s_1, v);
    }
    composite.r1n(descriptor);
  };
  protoOf(MapLikeSerializer).q1k = function (encoder, value) {
    return this.f1r(encoder, (value == null ? true : !(value == null)) ? value : THROW_CCE());
  };
  function CollectionLikeSerializer(elementSerializer) {
    AbstractCollectionSerializer.call(this);
    this.e1r_1 = elementSerializer;
  }
  protoOf(CollectionLikeSerializer).f1r = function (encoder, value) {
    var size = this.b1s(value);
    // Inline function 'kotlinx.serialization.encoding.encodeCollection' call
    var descriptor = this.p1k();
    var composite = encoder.m1p(descriptor, size);
    var iterator = this.d1s(value);
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        composite.h1p(this.p1k(), index, this.e1r_1, iterator.i());
      }
       while (inductionVariable < size);
    composite.r1n(descriptor);
  };
  protoOf(CollectionLikeSerializer).q1k = function (encoder, value) {
    return this.f1r(encoder, (value == null ? true : !(value == null)) ? value : THROW_CCE());
  };
  protoOf(CollectionLikeSerializer).g1r = function (decoder, builder, startIndex, size) {
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
        this.h1r(decoder, startIndex + index | 0, builder, false);
      }
       while (inductionVariable < size);
  };
  protoOf(CollectionLikeSerializer).h1r = function (decoder, index, builder, checkIndex) {
    this.a1r(builder, index, decoder.d1o(this.p1k(), index, this.e1r_1));
  };
  function readSize($this, decoder, builder) {
    var size = decoder.i1o($this.p1k());
    $this.y1q(builder, size);
    return size;
  }
  function AbstractCollectionSerializer() {
  }
  protoOf(AbstractCollectionSerializer).j1r = function (decoder, previous) {
    var tmp1_elvis_lhs = previous == null ? null : this.w1q(previous);
    var builder = tmp1_elvis_lhs == null ? this.q1q() : tmp1_elvis_lhs;
    var startIndex = this.s1q(builder);
    var compositeDecoder = decoder.q1n(this.p1k());
    if (compositeDecoder.g1o()) {
      this.g1r(compositeDecoder, builder, startIndex, readSize(this, compositeDecoder, builder));
    } else {
      $l$loop: while (true) {
        var index = compositeDecoder.h1o(this.p1k());
        if (index === -1)
          break $l$loop;
        this.i1r(compositeDecoder, startIndex + index | 0, builder);
      }
    }
    compositeDecoder.r1n(this.p1k());
    return this.u1q(builder);
  };
  protoOf(AbstractCollectionSerializer).r1k = function (decoder) {
    return this.j1r(decoder, null);
  };
  protoOf(AbstractCollectionSerializer).i1r = function (decoder, index, builder, checkIndex, $super) {
    checkIndex = checkIndex === VOID ? true : checkIndex;
    var tmp;
    if ($super === VOID) {
      this.h1r(decoder, index, builder, checkIndex);
      tmp = Unit_instance;
    } else {
      tmp = $super.h1r.call(this, decoder, index, builder, checkIndex);
    }
    return tmp;
  };
  function PrimitiveArraySerializer(primitiveSerializer) {
    CollectionLikeSerializer.call(this, primitiveSerializer);
    this.d1t_1 = new PrimitiveArrayDescriptor(primitiveSerializer.p1k());
  }
  protoOf(PrimitiveArraySerializer).p1k = function () {
    return this.d1t_1;
  };
  protoOf(PrimitiveArraySerializer).e1t = function (_this__u8e3s4) {
    return _this__u8e3s4.f1t();
  };
  protoOf(PrimitiveArraySerializer).s1q = function (_this__u8e3s4) {
    return this.e1t(_this__u8e3s4 instanceof PrimitiveArrayBuilder ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(PrimitiveArraySerializer).g1t = function (_this__u8e3s4) {
    return _this__u8e3s4.h1t();
  };
  protoOf(PrimitiveArraySerializer).u1q = function (_this__u8e3s4) {
    return this.g1t(_this__u8e3s4 instanceof PrimitiveArrayBuilder ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(PrimitiveArraySerializer).i1t = function (_this__u8e3s4, size) {
    return _this__u8e3s4.j1t(size);
  };
  protoOf(PrimitiveArraySerializer).y1q = function (_this__u8e3s4, size) {
    return this.i1t(_this__u8e3s4 instanceof PrimitiveArrayBuilder ? _this__u8e3s4 : THROW_CCE(), size);
  };
  protoOf(PrimitiveArraySerializer).k1t = function (_this__u8e3s4) {
    var message = 'This method lead to boxing and must not be used, use writeContents instead';
    throw IllegalStateException_init_$Create$(toString(message));
  };
  protoOf(PrimitiveArraySerializer).d1s = function (_this__u8e3s4) {
    return this.k1t((_this__u8e3s4 == null ? true : !(_this__u8e3s4 == null)) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(PrimitiveArraySerializer).l1t = function (_this__u8e3s4, index, element) {
    var message = 'This method lead to boxing and must not be used, use Builder.append instead';
    throw IllegalStateException_init_$Create$(toString(message));
  };
  protoOf(PrimitiveArraySerializer).a1r = function (_this__u8e3s4, index, element) {
    var tmp = _this__u8e3s4 instanceof PrimitiveArrayBuilder ? _this__u8e3s4 : THROW_CCE();
    return this.l1t(tmp, index, (element == null ? true : !(element == null)) ? element : THROW_CCE());
  };
  protoOf(PrimitiveArraySerializer).q1q = function () {
    return this.w1q(this.m1t());
  };
  protoOf(PrimitiveArraySerializer).p1t = function (encoder, value) {
    var size = this.b1s(value);
    // Inline function 'kotlinx.serialization.encoding.encodeCollection' call
    var descriptor = this.d1t_1;
    var composite = encoder.m1p(descriptor, size);
    this.o1t(composite, value, size);
    composite.r1n(descriptor);
  };
  protoOf(PrimitiveArraySerializer).q1k = function (encoder, value) {
    return this.p1t(encoder, (value == null ? true : !(value == null)) ? value : THROW_CCE());
  };
  protoOf(PrimitiveArraySerializer).f1r = function (encoder, value) {
    return this.p1t(encoder, (value == null ? true : !(value == null)) ? value : THROW_CCE());
  };
  protoOf(PrimitiveArraySerializer).r1k = function (decoder) {
    return this.j1r(decoder, null);
  };
  function PrimitiveArrayBuilder() {
  }
  protoOf(PrimitiveArrayBuilder).q1t = function (requiredCapacity, $super) {
    requiredCapacity = requiredCapacity === VOID ? this.f1t() + 1 | 0 : requiredCapacity;
    var tmp;
    if ($super === VOID) {
      this.j1t(requiredCapacity);
      tmp = Unit_instance;
    } else {
      tmp = $super.j1t.call(this, requiredCapacity);
    }
    return tmp;
  };
  function Companion() {
    Companion_instance_0 = this;
    this.r1t_1 = longArray(0);
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
      highMarks[get_lastIndex(highMarks)] = (new Long(-1, -1)).a3(elementsCount);
    }
    return highMarks;
  }
  function markHigh($this, index) {
    var slot = (index >>> 6 | 0) - 1 | 0;
    var offsetInSlot = index & 63;
    $this.v1t_1[slot] = $this.v1t_1[slot].e3((new Long(1, 0)).a3(offsetInSlot));
  }
  function nextUnmarkedHighIndex($this) {
    var inductionVariable = 0;
    var last = $this.v1t_1.length - 1 | 0;
    if (inductionVariable <= last)
      do {
        var slot = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var slotOffset = imul(slot + 1 | 0, 64);
        var slotMarks = $this.v1t_1[slot];
        while (!slotMarks.equals(new Long(-1, -1))) {
          var indexInSlot = countTrailingZeroBits(slotMarks.z2());
          slotMarks = slotMarks.e3((new Long(1, 0)).a3(indexInSlot));
          var index = slotOffset + indexInSlot | 0;
          if ($this.t1t_1($this.s1t_1, index)) {
            $this.v1t_1[slot] = slotMarks;
            return index;
          }
        }
        $this.v1t_1[slot] = slotMarks;
      }
       while (inductionVariable <= last);
    return -1;
  }
  function ElementMarker(descriptor, readIfAbsent) {
    Companion_getInstance_7();
    this.s1t_1 = descriptor;
    this.t1t_1 = readIfAbsent;
    var elementsCount = this.s1t_1.w1l();
    if (elementsCount <= 64) {
      var tmp = this;
      var tmp_0;
      if (elementsCount === 64) {
        tmp_0 = new Long(0, 0);
      } else {
        tmp_0 = (new Long(-1, -1)).a3(elementsCount);
      }
      tmp.u1t_1 = tmp_0;
      this.v1t_1 = Companion_getInstance_7().r1t_1;
    } else {
      this.u1t_1 = new Long(0, 0);
      this.v1t_1 = prepareHighMarksArray(this, elementsCount);
    }
  }
  protoOf(ElementMarker).w1t = function (index) {
    if (index < 64) {
      this.u1t_1 = this.u1t_1.e3((new Long(1, 0)).a3(index));
    } else {
      markHigh(this, index);
    }
  };
  protoOf(ElementMarker).x1t = function () {
    var elementsCount = this.s1t_1.w1l();
    while (!this.u1t_1.equals(new Long(-1, -1))) {
      var index = countTrailingZeroBits(this.u1t_1.z2());
      this.u1t_1 = this.u1t_1.e3((new Long(1, 0)).a3(index));
      if (this.t1t_1(this.s1t_1, index)) {
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
        descriptor.k1u(element);
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
      var elementName = tmp0_elvis_lhs == null ? item.k2_1 : tmp0_elvis_lhs;
      descriptor.l1u(elementName);
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
          descriptor.m1u(element_0);
        }
      }
    }
    return EnumSerializer_init_$Create$(serialName, values, descriptor);
  }
  function EnumSerializer_init_$Init$(serialName, values, descriptor, $this) {
    EnumSerializer.call($this, serialName, values);
    $this.o1u_1 = descriptor;
    return $this;
  }
  function EnumSerializer_init_$Create$(serialName, values, descriptor) {
    return EnumSerializer_init_$Init$(serialName, values, descriptor, objectCreate(protoOf(EnumSerializer)));
  }
  function createUnmarkedDescriptor($this, serialName) {
    var d = new EnumDescriptor(serialName, $this.n1u_1.length);
    // Inline function 'kotlin.collections.forEach' call
    var indexedObject = $this.n1u_1;
    var inductionVariable = 0;
    var last = indexedObject.length;
    while (inductionVariable < last) {
      var element = indexedObject[inductionVariable];
      inductionVariable = inductionVariable + 1 | 0;
      d.l1u(element.k2_1);
    }
    return d;
  }
  function EnumSerializer$descriptor$delegate$lambda(this$0, $serialName) {
    return function () {
      var tmp0_elvis_lhs = this$0.o1u_1;
      return tmp0_elvis_lhs == null ? createUnmarkedDescriptor(this$0, $serialName) : tmp0_elvis_lhs;
    };
  }
  function EnumSerializer(serialName, values) {
    this.n1u_1 = values;
    this.o1u_1 = null;
    var tmp = this;
    tmp.p1u_1 = lazy_0(EnumSerializer$descriptor$delegate$lambda(this, serialName));
  }
  protoOf(EnumSerializer).p1k = function () {
    var tmp0 = this.p1u_1;
    // Inline function 'kotlin.getValue' call
    descriptor$factory_1();
    return tmp0.w();
  };
  protoOf(EnumSerializer).q1u = function (encoder, value) {
    var index = indexOf(this.n1u_1, value);
    if (index === -1) {
      throw SerializationException_init_$Create$_0(toString(value) + ' is not a valid enum ' + this.p1k().t1l() + ', ' + ('must be one of ' + contentToString(this.n1u_1)));
    }
    encoder.v1o(this.p1k(), index);
  };
  protoOf(EnumSerializer).q1k = function (encoder, value) {
    return this.q1u(encoder, value instanceof Enum ? value : THROW_CCE());
  };
  protoOf(EnumSerializer).r1k = function (decoder) {
    var index = decoder.m1n(this.p1k());
    if (!(0 <= index ? index <= (this.n1u_1.length - 1 | 0) : false)) {
      throw SerializationException_init_$Create$_0('' + index + ' is not among valid ' + this.p1k().t1l() + ' enum values, ' + ('values size is ' + this.n1u_1.length));
    }
    return this.n1u_1[index];
  };
  protoOf(EnumSerializer).toString = function () {
    return 'kotlinx.serialization.internal.EnumSerializer<' + this.p1k().t1l() + '>';
  };
  function _get_elementDescriptors__y23q9p($this) {
    var tmp0 = $this.e1v_1;
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
        tmp_1[tmp_2] = buildSerialDescriptor($name + '.' + this$0.y1l(tmp_2), OBJECT_getInstance(), []);
        tmp = tmp + 1 | 0;
      }
      return tmp_1;
    };
  }
  function EnumDescriptor(name, elementsCount) {
    PluginGeneratedSerialDescriptor.call(this, name, VOID, elementsCount);
    this.d1v_1 = ENUM_getInstance();
    var tmp = this;
    tmp.e1v_1 = lazy_0(EnumDescriptor$elementDescriptors$delegate$lambda(elementsCount, name, this));
  }
  protoOf(EnumDescriptor).u1l = function () {
    return this.d1v_1;
  };
  protoOf(EnumDescriptor).b1m = function (index) {
    return getChecked(_get_elementDescriptors__y23q9p(this), index);
  };
  protoOf(EnumDescriptor).equals = function (other) {
    if (this === other)
      return true;
    if (other == null)
      return false;
    if (!(!(other == null) ? isInterface(other, SerialDescriptor) : false))
      return false;
    if (!(other.u1l() === ENUM_getInstance()))
      return false;
    if (!(this.t1l() === other.t1l()))
      return false;
    if (!equals(cachedSerialNames(this), cachedSerialNames(other)))
      return false;
    return true;
  };
  protoOf(EnumDescriptor).toString = function () {
    return joinToString(get_elementNames(this), ', ', this.t1l() + '(', ')');
  };
  protoOf(EnumDescriptor).hashCode = function () {
    var result = getStringHashCode(this.t1l());
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
      return receiver.p1k();
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
    this.t1v_1 = true;
  }
  protoOf(InlineClassDescriptor).v1l = function () {
    return this.t1v_1;
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
      if (!(this.t1l() === other.t1l())) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      if (!(other.t1v_1 && contentEquals(this.f1v(), other.f1v()))) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      if (!(this.w1l() === other.w1l())) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      var inductionVariable = 0;
      var last = this.w1l();
      if (inductionVariable < last)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          if (!(this.b1m(index).t1l() === other.b1m(index).t1l())) {
            tmp$ret$0 = false;
            break $l$block_5;
          }
          if (!equals(this.b1m(index).u1l(), other.b1m(index).u1l())) {
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
    this.u1v_1 = $primitiveSerializer;
  }
  protoOf(InlinePrimitiveDescriptor$1).v1v = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [this.u1v_1];
  };
  protoOf(InlinePrimitiveDescriptor$1).p1k = function () {
    var message = 'unsupported';
    throw IllegalStateException_init_$Create$(toString(message));
  };
  protoOf(InlinePrimitiveDescriptor$1).q1k = function (encoder, value) {
    // Inline function 'kotlin.error' call
    var message = 'unsupported';
    throw IllegalStateException_init_$Create$(toString(message));
  };
  protoOf(InlinePrimitiveDescriptor$1).r1k = function (decoder) {
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
    this.x1v_1 = EmptySerializersModule_0();
  }
  protoOf(NoOpEncoder).f1o = function () {
    return this.x1v_1;
  };
  protoOf(NoOpEncoder).k1o = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).l1o = function () {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).m1o = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).n1o = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).o1o = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).p1o = function (value) {
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
  protoOf(NoOpEncoder).v1o = function (enumDescriptor, index) {
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
    this.y1v_1 = OBJECT_getInstance();
    this.z1v_1 = 'kotlin.Nothing';
  }
  protoOf(NothingSerialDescriptor).u1l = function () {
    return this.y1v_1;
  };
  protoOf(NothingSerialDescriptor).t1l = function () {
    return this.z1v_1;
  };
  protoOf(NothingSerialDescriptor).w1l = function () {
    return 0;
  };
  protoOf(NothingSerialDescriptor).y1l = function (index) {
    error(this);
  };
  protoOf(NothingSerialDescriptor).z1l = function (name) {
    error(this);
  };
  protoOf(NothingSerialDescriptor).c1m = function (index) {
    error(this);
  };
  protoOf(NothingSerialDescriptor).b1m = function (index) {
    error(this);
  };
  protoOf(NothingSerialDescriptor).a1m = function (index) {
    error(this);
  };
  protoOf(NothingSerialDescriptor).toString = function () {
    return 'NothingSerialDescriptor';
  };
  protoOf(NothingSerialDescriptor).equals = function (other) {
    return this === other;
  };
  protoOf(NothingSerialDescriptor).hashCode = function () {
    return getStringHashCode(this.z1v_1) + imul(31, this.y1v_1.hashCode()) | 0;
  };
  var NothingSerialDescriptor_instance;
  function NothingSerialDescriptor_getInstance() {
    if (NothingSerialDescriptor_instance == null)
      new NothingSerialDescriptor();
    return NothingSerialDescriptor_instance;
  }
  function NullableSerializer(serializer) {
    this.a1w_1 = serializer;
    this.b1w_1 = new SerialDescriptorForNullable(this.a1w_1.p1k());
  }
  protoOf(NullableSerializer).p1k = function () {
    return this.b1w_1;
  };
  protoOf(NullableSerializer).c1w = function (encoder, value) {
    if (!(value == null)) {
      encoder.l1p();
      encoder.i1p(this.a1w_1, value);
    } else {
      encoder.l1o();
    }
  };
  protoOf(NullableSerializer).q1k = function (encoder, value) {
    return this.c1w(encoder, (value == null ? true : !(value == null)) ? value : THROW_CCE());
  };
  protoOf(NullableSerializer).r1k = function (decoder) {
    return decoder.b1n() ? decoder.p1n(this.a1w_1) : decoder.c1n();
  };
  protoOf(NullableSerializer).equals = function (other) {
    if (this === other)
      return true;
    if (other == null || !getKClassFromExpression(this).equals(getKClassFromExpression(other)))
      return false;
    if (!(other instanceof NullableSerializer))
      THROW_CCE();
    if (!equals(this.a1w_1, other.a1w_1))
      return false;
    return true;
  };
  protoOf(NullableSerializer).hashCode = function () {
    return hashCode(this.a1w_1);
  };
  function SerialDescriptorForNullable(original) {
    this.d1m_1 = original;
    this.e1m_1 = this.d1m_1.t1l() + '?';
    this.f1m_1 = cachedSerialNames(this.d1m_1);
  }
  protoOf(SerialDescriptorForNullable).t1l = function () {
    return this.e1m_1;
  };
  protoOf(SerialDescriptorForNullable).z1m = function () {
    return this.f1m_1;
  };
  protoOf(SerialDescriptorForNullable).p1l = function () {
    return true;
  };
  protoOf(SerialDescriptorForNullable).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof SerialDescriptorForNullable))
      return false;
    if (!equals(this.d1m_1, other.d1m_1))
      return false;
    return true;
  };
  protoOf(SerialDescriptorForNullable).toString = function () {
    return toString(this.d1m_1) + '?';
  };
  protoOf(SerialDescriptorForNullable).hashCode = function () {
    return imul(hashCode(this.d1m_1), 31);
  };
  protoOf(SerialDescriptorForNullable).u1l = function () {
    return this.d1m_1.u1l();
  };
  protoOf(SerialDescriptorForNullable).v1l = function () {
    return this.d1m_1.v1l();
  };
  protoOf(SerialDescriptorForNullable).w1l = function () {
    return this.d1m_1.w1l();
  };
  protoOf(SerialDescriptorForNullable).x1l = function () {
    return this.d1m_1.x1l();
  };
  protoOf(SerialDescriptorForNullable).y1l = function (index) {
    return this.d1m_1.y1l(index);
  };
  protoOf(SerialDescriptorForNullable).z1l = function (name) {
    return this.d1m_1.z1l(name);
  };
  protoOf(SerialDescriptorForNullable).a1m = function (index) {
    return this.d1m_1.a1m(index);
  };
  protoOf(SerialDescriptorForNullable).b1m = function (index) {
    return this.d1m_1.b1m(index);
  };
  protoOf(SerialDescriptorForNullable).c1m = function (index) {
    return this.d1m_1.c1m(index);
  };
  function ObjectSerializer$descriptor$delegate$lambda$lambda(this$0) {
    return function ($this$buildSerialDescriptor) {
      $this$buildSerialDescriptor.u1k_1 = this$0.e1w_1;
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
    this.d1w_1 = objectInstance;
    this.e1w_1 = emptyList();
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp.f1w_1 = lazy(tmp_0, ObjectSerializer$descriptor$delegate$lambda(serialName, this));
  }
  protoOf(ObjectSerializer).p1k = function () {
    var tmp0 = this.f1w_1;
    // Inline function 'kotlin.getValue' call
    descriptor$factory_2();
    return tmp0.w();
  };
  protoOf(ObjectSerializer).f1l = function (encoder, value) {
    encoder.q1n(this.p1k()).r1n(this.p1k());
  };
  protoOf(ObjectSerializer).q1k = function (encoder, value) {
    return this.f1l(encoder, !(value == null) ? value : THROW_CCE());
  };
  protoOf(ObjectSerializer).r1k = function (decoder) {
    // Inline function 'kotlinx.serialization.encoding.decodeStructure' call
    var descriptor = this.p1k();
    var composite = decoder.q1n(descriptor);
    var tmp$ret$0;
    $l$block_0: {
      if (composite.g1o()) {
        tmp$ret$0 = Unit_instance;
        break $l$block_0;
      }
      var index = composite.h1o(this.p1k());
      if (index === -1) {
        tmp$ret$0 = Unit_instance;
        break $l$block_0;
      } else
        throw SerializationException_init_$Create$_0('Unexpected index ' + index);
    }
    var result = tmp$ret$0;
    composite.r1n(descriptor);
    return this.d1w_1;
  };
  function descriptor$factory_2() {
    return getPropertyCallableRef('descriptor', 1, KProperty1, function (receiver) {
      return receiver.p1k();
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
      return _this__u8e3s4.z1m();
    var result = HashSet_init_$Create$_1(_this__u8e3s4.w1l());
    var inductionVariable = 0;
    var last = _this__u8e3s4.w1l();
    if (inductionVariable < last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'kotlin.collections.plusAssign' call
        var element = _this__u8e3s4.y1l(i);
        result.e(element);
      }
       while (inductionVariable < last);
    return result;
  }
  function kclass(_this__u8e3s4) {
    _init_properties_Platform_common_kt__3qzecs();
    var t = _this__u8e3s4.jb();
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
    var tmp0 = _this__u8e3s4.kj_1;
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlin.requireNotNull' call
      if (tmp0 == null) {
        var message = 'Star projections in type arguments are not allowed, but had ' + toString_0(_this__u8e3s4.kj_1);
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
    var tmp0_elvis_lhs = _this__u8e3s4.ua();
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
          var element = descriptor.y1l(i);
          missingFields.e(element);
        }
        missingFieldsBits = missingFieldsBits >>> 1 | 0;
      }
       while (inductionVariable < 32);
    throw MissingFieldException_init_$Create$(missingFields, descriptor.t1l());
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
                var element = descriptor.y1l(imul(maskSlot, 32) + i | 0);
                missingFields.e(element);
              }
              missingFieldsBits = missingFieldsBits >>> 1 | 0;
            }
             while (inductionVariable_0 < 32);
        }
      }
       while (inductionVariable <= last);
    throw MissingFieldException_init_$Create$(missingFields, descriptor.t1l());
  }
  function hashCodeImpl(_this__u8e3s4, typeParams) {
    var result = getStringHashCode(_this__u8e3s4.t1l());
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
      var tmp0_safe_receiver = element.t1l();
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
      var tmp0_safe_receiver_0 = element_0.u1l();
      var tmp1_elvis_lhs_0 = tmp0_safe_receiver_0 == null ? null : hashCode(tmp0_safe_receiver_0);
      accumulator_0 = tmp_0 + (tmp1_elvis_lhs_0 == null ? 0 : tmp1_elvis_lhs_0) | 0;
    }
    var kindHash = accumulator_0;
    result = imul(31, result) + namesHash | 0;
    result = imul(31, result) + kindHash | 0;
    return result;
  }
  function _get_childSerializers__7vnyfa($this) {
    var tmp0 = $this.h1u_1;
    // Inline function 'kotlin.getValue' call
    childSerializers$factory();
    return tmp0.w();
  }
  function _get__hashCode__tgwhef_0($this) {
    var tmp0 = $this.j1u_1;
    // Inline function 'kotlin.getValue' call
    _hashCode$factory_0();
    return tmp0.w();
  }
  function buildIndices($this) {
    var indices = HashMap_init_$Create$();
    var inductionVariable = 0;
    var last = $this.c1u_1.length - 1 | 0;
    if (inductionVariable <= last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'kotlin.collections.set' call
        var key = $this.c1u_1[i];
        indices.h2(key, i);
      }
       while (inductionVariable <= last);
    return indices;
  }
  function PluginGeneratedSerialDescriptor$childSerializers$delegate$lambda(this$0) {
    return function () {
      var tmp0_safe_receiver = this$0.z1t_1;
      var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.v1v();
      return tmp1_elvis_lhs == null ? get_EMPTY_SERIALIZER_ARRAY() : tmp1_elvis_lhs;
    };
  }
  function PluginGeneratedSerialDescriptor$typeParameterDescriptors$delegate$lambda(this$0) {
    return function () {
      var tmp0_safe_receiver = this$0.z1t_1;
      var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.w1v();
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
          var tmp$ret$0 = item.p1k();
          destination.e(tmp$ret$0);
        }
        tmp = destination;
      }
      return compactArray(tmp);
    };
  }
  function PluginGeneratedSerialDescriptor$_hashCode$delegate$lambda(this$0) {
    return function () {
      return hashCodeImpl(this$0, this$0.f1v());
    };
  }
  function PluginGeneratedSerialDescriptor$toString$lambda(this$0) {
    return function (i) {
      return this$0.y1l(i) + ': ' + this$0.b1m(i).t1l();
    };
  }
  function PluginGeneratedSerialDescriptor(serialName, generatedSerializer, elementsCount) {
    generatedSerializer = generatedSerializer === VOID ? null : generatedSerializer;
    this.y1t_1 = serialName;
    this.z1t_1 = generatedSerializer;
    this.a1u_1 = elementsCount;
    this.b1u_1 = -1;
    var tmp = this;
    var tmp_0 = 0;
    var tmp_1 = this.a1u_1;
    // Inline function 'kotlin.arrayOfNulls' call
    var tmp_2 = Array(tmp_1);
    while (tmp_0 < tmp_1) {
      tmp_2[tmp_0] = '[UNINITIALIZED]';
      tmp_0 = tmp_0 + 1 | 0;
    }
    tmp.c1u_1 = tmp_2;
    var tmp_3 = this;
    // Inline function 'kotlin.arrayOfNulls' call
    var size = this.a1u_1;
    tmp_3.d1u_1 = Array(size);
    this.e1u_1 = null;
    this.f1u_1 = booleanArray(this.a1u_1);
    this.g1u_1 = emptyMap();
    var tmp_4 = this;
    var tmp_5 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp_4.h1u_1 = lazy(tmp_5, PluginGeneratedSerialDescriptor$childSerializers$delegate$lambda(this));
    var tmp_6 = this;
    var tmp_7 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp_6.i1u_1 = lazy(tmp_7, PluginGeneratedSerialDescriptor$typeParameterDescriptors$delegate$lambda(this));
    var tmp_8 = this;
    var tmp_9 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp_8.j1u_1 = lazy(tmp_9, PluginGeneratedSerialDescriptor$_hashCode$delegate$lambda(this));
  }
  protoOf(PluginGeneratedSerialDescriptor).t1l = function () {
    return this.y1t_1;
  };
  protoOf(PluginGeneratedSerialDescriptor).w1l = function () {
    return this.a1u_1;
  };
  protoOf(PluginGeneratedSerialDescriptor).u1l = function () {
    return CLASS_getInstance();
  };
  protoOf(PluginGeneratedSerialDescriptor).x1l = function () {
    var tmp0_elvis_lhs = this.e1u_1;
    return tmp0_elvis_lhs == null ? emptyList() : tmp0_elvis_lhs;
  };
  protoOf(PluginGeneratedSerialDescriptor).z1m = function () {
    return this.g1u_1.f2();
  };
  protoOf(PluginGeneratedSerialDescriptor).f1v = function () {
    var tmp0 = this.i1u_1;
    // Inline function 'kotlin.getValue' call
    typeParameterDescriptors$factory();
    return tmp0.w();
  };
  protoOf(PluginGeneratedSerialDescriptor).g1v = function (name, isOptional) {
    this.b1u_1 = this.b1u_1 + 1 | 0;
    this.c1u_1[this.b1u_1] = name;
    this.f1u_1[this.b1u_1] = isOptional;
    this.d1u_1[this.b1u_1] = null;
    if (this.b1u_1 === (this.a1u_1 - 1 | 0)) {
      this.g1u_1 = buildIndices(this);
    }
  };
  protoOf(PluginGeneratedSerialDescriptor).l1u = function (name, isOptional, $super) {
    isOptional = isOptional === VOID ? false : isOptional;
    var tmp;
    if ($super === VOID) {
      this.g1v(name, isOptional);
      tmp = Unit_instance;
    } else {
      tmp = $super.g1v.call(this, name, isOptional);
    }
    return tmp;
  };
  protoOf(PluginGeneratedSerialDescriptor).m1u = function (annotation) {
    // Inline function 'kotlin.let' call
    var it = this.d1u_1[this.b1u_1];
    var tmp;
    if (it == null) {
      var result = ArrayList_init_$Create$(1);
      this.d1u_1[this.b1u_1] = result;
      tmp = result;
    } else {
      tmp = it;
    }
    var list = tmp;
    list.e(annotation);
  };
  protoOf(PluginGeneratedSerialDescriptor).k1u = function (a) {
    if (this.e1u_1 == null) {
      this.e1u_1 = ArrayList_init_$Create$(1);
    }
    ensureNotNull(this.e1u_1).e(a);
  };
  protoOf(PluginGeneratedSerialDescriptor).b1m = function (index) {
    return getChecked(_get_childSerializers__7vnyfa(this), index).p1k();
  };
  protoOf(PluginGeneratedSerialDescriptor).c1m = function (index) {
    return getChecked_0(this.f1u_1, index);
  };
  protoOf(PluginGeneratedSerialDescriptor).a1m = function (index) {
    var tmp0_elvis_lhs = getChecked(this.d1u_1, index);
    return tmp0_elvis_lhs == null ? emptyList() : tmp0_elvis_lhs;
  };
  protoOf(PluginGeneratedSerialDescriptor).y1l = function (index) {
    return getChecked(this.c1u_1, index);
  };
  protoOf(PluginGeneratedSerialDescriptor).z1l = function (name) {
    var tmp0_elvis_lhs = this.g1u_1.e2(name);
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
      if (!(this.t1l() === other.t1l())) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      if (!contentEquals(this.f1v(), other.f1v())) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      if (!(this.w1l() === other.w1l())) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      var inductionVariable = 0;
      var last = this.w1l();
      if (inductionVariable < last)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          if (!(this.b1m(index).t1l() === other.b1m(index).t1l())) {
            tmp$ret$0 = false;
            break $l$block_5;
          }
          if (!equals(this.b1m(index).u1l(), other.b1m(index).u1l())) {
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
    var tmp = until(0, this.a1u_1);
    var tmp_0 = this.t1l() + '(';
    return joinToString(tmp, ', ', tmp_0, ')', VOID, VOID, PluginGeneratedSerialDescriptor$toString$lambda(this));
  };
  function childSerializers$factory() {
    return getPropertyCallableRef('childSerializers', 1, KProperty1, function (receiver) {
      return _get_childSerializers__7vnyfa(receiver);
    }, null);
  }
  function typeParameterDescriptors$factory() {
    return getPropertyCallableRef('typeParameterDescriptors', 1, KProperty1, function (receiver) {
      return receiver.f1v();
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
  protoOf(CharArraySerializer_0).j1w = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(CharArraySerializer_0).b1s = function (_this__u8e3s4) {
    return this.j1w((!(_this__u8e3s4 == null) ? isCharArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(CharArraySerializer_0).k1w = function (_this__u8e3s4) {
    return new CharArrayBuilder(_this__u8e3s4);
  };
  protoOf(CharArraySerializer_0).w1q = function (_this__u8e3s4) {
    return this.k1w((!(_this__u8e3s4 == null) ? isCharArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(CharArraySerializer_0).m1t = function () {
    return charArray(0);
  };
  protoOf(CharArraySerializer_0).l1w = function (decoder, index, builder, checkIndex) {
    builder.o1w(decoder.z1n(this.d1t_1, index));
  };
  protoOf(CharArraySerializer_0).h1r = function (decoder, index, builder, checkIndex) {
    return this.l1w(decoder, index, builder instanceof CharArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(CharArraySerializer_0).n1t = function (decoder, index, builder, checkIndex) {
    return this.l1w(decoder, index, builder instanceof CharArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(CharArraySerializer_0).p1w = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.e1p(this.d1t_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(CharArraySerializer_0).o1t = function (encoder, content, size) {
    return this.p1w(encoder, (!(content == null) ? isCharArray(content) : false) ? content : THROW_CCE(), size);
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
  protoOf(DoubleArraySerializer_0).s1w = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(DoubleArraySerializer_0).b1s = function (_this__u8e3s4) {
    return this.s1w((!(_this__u8e3s4 == null) ? isDoubleArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(DoubleArraySerializer_0).t1w = function (_this__u8e3s4) {
    return new DoubleArrayBuilder(_this__u8e3s4);
  };
  protoOf(DoubleArraySerializer_0).w1q = function (_this__u8e3s4) {
    return this.t1w((!(_this__u8e3s4 == null) ? isDoubleArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(DoubleArraySerializer_0).m1t = function () {
    return new Float64Array(0);
  };
  protoOf(DoubleArraySerializer_0).u1w = function (decoder, index, builder, checkIndex) {
    builder.x1w(decoder.y1n(this.d1t_1, index));
  };
  protoOf(DoubleArraySerializer_0).h1r = function (decoder, index, builder, checkIndex) {
    return this.u1w(decoder, index, builder instanceof DoubleArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(DoubleArraySerializer_0).n1t = function (decoder, index, builder, checkIndex) {
    return this.u1w(decoder, index, builder instanceof DoubleArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(DoubleArraySerializer_0).y1w = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.d1p(this.d1t_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(DoubleArraySerializer_0).o1t = function (encoder, content, size) {
    return this.y1w(encoder, (!(content == null) ? isDoubleArray(content) : false) ? content : THROW_CCE(), size);
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
  protoOf(FloatArraySerializer_0).b1x = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(FloatArraySerializer_0).b1s = function (_this__u8e3s4) {
    return this.b1x((!(_this__u8e3s4 == null) ? isFloatArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(FloatArraySerializer_0).c1x = function (_this__u8e3s4) {
    return new FloatArrayBuilder(_this__u8e3s4);
  };
  protoOf(FloatArraySerializer_0).w1q = function (_this__u8e3s4) {
    return this.c1x((!(_this__u8e3s4 == null) ? isFloatArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(FloatArraySerializer_0).m1t = function () {
    return new Float32Array(0);
  };
  protoOf(FloatArraySerializer_0).d1x = function (decoder, index, builder, checkIndex) {
    builder.g1x(decoder.x1n(this.d1t_1, index));
  };
  protoOf(FloatArraySerializer_0).h1r = function (decoder, index, builder, checkIndex) {
    return this.d1x(decoder, index, builder instanceof FloatArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(FloatArraySerializer_0).n1t = function (decoder, index, builder, checkIndex) {
    return this.d1x(decoder, index, builder instanceof FloatArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(FloatArraySerializer_0).h1x = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.c1p(this.d1t_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(FloatArraySerializer_0).o1t = function (encoder, content, size) {
    return this.h1x(encoder, (!(content == null) ? isFloatArray(content) : false) ? content : THROW_CCE(), size);
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
  protoOf(LongArraySerializer_0).k1x = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(LongArraySerializer_0).b1s = function (_this__u8e3s4) {
    return this.k1x((!(_this__u8e3s4 == null) ? isLongArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LongArraySerializer_0).l1x = function (_this__u8e3s4) {
    return new LongArrayBuilder(_this__u8e3s4);
  };
  protoOf(LongArraySerializer_0).w1q = function (_this__u8e3s4) {
    return this.l1x((!(_this__u8e3s4 == null) ? isLongArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LongArraySerializer_0).m1t = function () {
    return longArray(0);
  };
  protoOf(LongArraySerializer_0).m1x = function (decoder, index, builder, checkIndex) {
    builder.p1x(decoder.w1n(this.d1t_1, index));
  };
  protoOf(LongArraySerializer_0).h1r = function (decoder, index, builder, checkIndex) {
    return this.m1x(decoder, index, builder instanceof LongArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(LongArraySerializer_0).n1t = function (decoder, index, builder, checkIndex) {
    return this.m1x(decoder, index, builder instanceof LongArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(LongArraySerializer_0).q1x = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.b1p(this.d1t_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(LongArraySerializer_0).o1t = function (encoder, content, size) {
    return this.q1x(encoder, (!(content == null) ? isLongArray(content) : false) ? content : THROW_CCE(), size);
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
  protoOf(ULongArraySerializer_0).t1x = function (_this__u8e3s4) {
    return _ULongArray___get_size__impl__ju6dtr(_this__u8e3s4);
  };
  protoOf(ULongArraySerializer_0).b1s = function (_this__u8e3s4) {
    return this.t1x(_this__u8e3s4 instanceof ULongArray ? _this__u8e3s4.ln_1 : THROW_CCE());
  };
  protoOf(ULongArraySerializer_0).u1x = function (_this__u8e3s4) {
    return new ULongArrayBuilder(_this__u8e3s4);
  };
  protoOf(ULongArraySerializer_0).w1q = function (_this__u8e3s4) {
    return this.u1x(_this__u8e3s4 instanceof ULongArray ? _this__u8e3s4.ln_1 : THROW_CCE());
  };
  protoOf(ULongArraySerializer_0).v1x = function () {
    return _ULongArray___init__impl__twm1l3(0);
  };
  protoOf(ULongArraySerializer_0).m1t = function () {
    return new ULongArray(this.v1x());
  };
  protoOf(ULongArraySerializer_0).w1x = function (decoder, index, builder, checkIndex) {
    // Inline function 'kotlin.toULong' call
    var this_0 = decoder.b1o(this.d1t_1, index).h1n();
    var tmp$ret$0 = _ULong___init__impl__c78o9k(this_0);
    builder.z1x(tmp$ret$0);
  };
  protoOf(ULongArraySerializer_0).h1r = function (decoder, index, builder, checkIndex) {
    return this.w1x(decoder, index, builder instanceof ULongArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(ULongArraySerializer_0).n1t = function (decoder, index, builder, checkIndex) {
    return this.w1x(decoder, index, builder instanceof ULongArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(ULongArraySerializer_0).a1y = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var tmp = encoder.g1p(this.d1t_1, i);
        // Inline function 'kotlin.ULong.toLong' call
        var this_0 = ULongArray__get_impl_pr71q9(content, i);
        var tmp$ret$0 = _ULong___get_data__impl__fggpzb(this_0);
        tmp.q1o(tmp$ret$0);
      }
       while (inductionVariable < size);
  };
  protoOf(ULongArraySerializer_0).o1t = function (encoder, content, size) {
    return this.a1y(encoder, content instanceof ULongArray ? content.ln_1 : THROW_CCE(), size);
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
  protoOf(IntArraySerializer_0).d1y = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(IntArraySerializer_0).b1s = function (_this__u8e3s4) {
    return this.d1y((!(_this__u8e3s4 == null) ? isIntArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(IntArraySerializer_0).e1y = function (_this__u8e3s4) {
    return new IntArrayBuilder(_this__u8e3s4);
  };
  protoOf(IntArraySerializer_0).w1q = function (_this__u8e3s4) {
    return this.e1y((!(_this__u8e3s4 == null) ? isIntArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(IntArraySerializer_0).m1t = function () {
    return new Int32Array(0);
  };
  protoOf(IntArraySerializer_0).f1y = function (decoder, index, builder, checkIndex) {
    builder.i1y(decoder.v1n(this.d1t_1, index));
  };
  protoOf(IntArraySerializer_0).h1r = function (decoder, index, builder, checkIndex) {
    return this.f1y(decoder, index, builder instanceof IntArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(IntArraySerializer_0).n1t = function (decoder, index, builder, checkIndex) {
    return this.f1y(decoder, index, builder instanceof IntArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(IntArraySerializer_0).j1y = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.a1p(this.d1t_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(IntArraySerializer_0).o1t = function (encoder, content, size) {
    return this.j1y(encoder, (!(content == null) ? isIntArray(content) : false) ? content : THROW_CCE(), size);
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
  protoOf(UIntArraySerializer_0).m1y = function (_this__u8e3s4) {
    return _UIntArray___get_size__impl__r6l8ci(_this__u8e3s4);
  };
  protoOf(UIntArraySerializer_0).b1s = function (_this__u8e3s4) {
    return this.m1y(_this__u8e3s4 instanceof UIntArray ? _this__u8e3s4.zm_1 : THROW_CCE());
  };
  protoOf(UIntArraySerializer_0).n1y = function (_this__u8e3s4) {
    return new UIntArrayBuilder(_this__u8e3s4);
  };
  protoOf(UIntArraySerializer_0).w1q = function (_this__u8e3s4) {
    return this.n1y(_this__u8e3s4 instanceof UIntArray ? _this__u8e3s4.zm_1 : THROW_CCE());
  };
  protoOf(UIntArraySerializer_0).o1y = function () {
    return _UIntArray___init__impl__ghjpc6(0);
  };
  protoOf(UIntArraySerializer_0).m1t = function () {
    return new UIntArray(this.o1y());
  };
  protoOf(UIntArraySerializer_0).p1y = function (decoder, index, builder, checkIndex) {
    // Inline function 'kotlin.toUInt' call
    var this_0 = decoder.b1o(this.d1t_1, index).g1n();
    var tmp$ret$0 = _UInt___init__impl__l7qpdl(this_0);
    builder.s1y(tmp$ret$0);
  };
  protoOf(UIntArraySerializer_0).h1r = function (decoder, index, builder, checkIndex) {
    return this.p1y(decoder, index, builder instanceof UIntArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(UIntArraySerializer_0).n1t = function (decoder, index, builder, checkIndex) {
    return this.p1y(decoder, index, builder instanceof UIntArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(UIntArraySerializer_0).t1y = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var tmp = encoder.g1p(this.d1t_1, i);
        // Inline function 'kotlin.UInt.toInt' call
        var this_0 = UIntArray__get_impl_gp5kza(content, i);
        var tmp$ret$0 = _UInt___get_data__impl__f0vqqw(this_0);
        tmp.p1o(tmp$ret$0);
      }
       while (inductionVariable < size);
  };
  protoOf(UIntArraySerializer_0).o1t = function (encoder, content, size) {
    return this.t1y(encoder, content instanceof UIntArray ? content.zm_1 : THROW_CCE(), size);
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
  protoOf(ShortArraySerializer_0).w1y = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(ShortArraySerializer_0).b1s = function (_this__u8e3s4) {
    return this.w1y((!(_this__u8e3s4 == null) ? isShortArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ShortArraySerializer_0).x1y = function (_this__u8e3s4) {
    return new ShortArrayBuilder(_this__u8e3s4);
  };
  protoOf(ShortArraySerializer_0).w1q = function (_this__u8e3s4) {
    return this.x1y((!(_this__u8e3s4 == null) ? isShortArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ShortArraySerializer_0).m1t = function () {
    return new Int16Array(0);
  };
  protoOf(ShortArraySerializer_0).y1y = function (decoder, index, builder, checkIndex) {
    builder.b1z(decoder.u1n(this.d1t_1, index));
  };
  protoOf(ShortArraySerializer_0).h1r = function (decoder, index, builder, checkIndex) {
    return this.y1y(decoder, index, builder instanceof ShortArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(ShortArraySerializer_0).n1t = function (decoder, index, builder, checkIndex) {
    return this.y1y(decoder, index, builder instanceof ShortArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(ShortArraySerializer_0).c1z = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.z1o(this.d1t_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(ShortArraySerializer_0).o1t = function (encoder, content, size) {
    return this.c1z(encoder, (!(content == null) ? isShortArray(content) : false) ? content : THROW_CCE(), size);
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
  protoOf(UShortArraySerializer_0).f1z = function (_this__u8e3s4) {
    return _UShortArray___get_size__impl__jqto1b(_this__u8e3s4);
  };
  protoOf(UShortArraySerializer_0).b1s = function (_this__u8e3s4) {
    return this.f1z(_this__u8e3s4 instanceof UShortArray ? _this__u8e3s4.xn_1 : THROW_CCE());
  };
  protoOf(UShortArraySerializer_0).g1z = function (_this__u8e3s4) {
    return new UShortArrayBuilder(_this__u8e3s4);
  };
  protoOf(UShortArraySerializer_0).w1q = function (_this__u8e3s4) {
    return this.g1z(_this__u8e3s4 instanceof UShortArray ? _this__u8e3s4.xn_1 : THROW_CCE());
  };
  protoOf(UShortArraySerializer_0).h1z = function () {
    return _UShortArray___init__impl__9b26ef(0);
  };
  protoOf(UShortArraySerializer_0).m1t = function () {
    return new UShortArray(this.h1z());
  };
  protoOf(UShortArraySerializer_0).i1z = function (decoder, index, builder, checkIndex) {
    // Inline function 'kotlin.toUShort' call
    var this_0 = decoder.b1o(this.d1t_1, index).f1n();
    var tmp$ret$0 = _UShort___init__impl__jigrne(this_0);
    builder.l1z(tmp$ret$0);
  };
  protoOf(UShortArraySerializer_0).h1r = function (decoder, index, builder, checkIndex) {
    return this.i1z(decoder, index, builder instanceof UShortArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(UShortArraySerializer_0).n1t = function (decoder, index, builder, checkIndex) {
    return this.i1z(decoder, index, builder instanceof UShortArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(UShortArraySerializer_0).m1z = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var tmp = encoder.g1p(this.d1t_1, i);
        // Inline function 'kotlin.UShort.toShort' call
        var this_0 = UShortArray__get_impl_fnbhmx(content, i);
        var tmp$ret$0 = _UShort___get_data__impl__g0245(this_0);
        tmp.o1o(tmp$ret$0);
      }
       while (inductionVariable < size);
  };
  protoOf(UShortArraySerializer_0).o1t = function (encoder, content, size) {
    return this.m1z(encoder, content instanceof UShortArray ? content.xn_1 : THROW_CCE(), size);
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
  protoOf(ByteArraySerializer_0).p1z = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(ByteArraySerializer_0).b1s = function (_this__u8e3s4) {
    return this.p1z((!(_this__u8e3s4 == null) ? isByteArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ByteArraySerializer_0).q1z = function (_this__u8e3s4) {
    return new ByteArrayBuilder(_this__u8e3s4);
  };
  protoOf(ByteArraySerializer_0).w1q = function (_this__u8e3s4) {
    return this.q1z((!(_this__u8e3s4 == null) ? isByteArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ByteArraySerializer_0).m1t = function () {
    return new Int8Array(0);
  };
  protoOf(ByteArraySerializer_0).r1z = function (decoder, index, builder, checkIndex) {
    builder.u1z(decoder.t1n(this.d1t_1, index));
  };
  protoOf(ByteArraySerializer_0).h1r = function (decoder, index, builder, checkIndex) {
    return this.r1z(decoder, index, builder instanceof ByteArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(ByteArraySerializer_0).n1t = function (decoder, index, builder, checkIndex) {
    return this.r1z(decoder, index, builder instanceof ByteArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(ByteArraySerializer_0).v1z = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.y1o(this.d1t_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(ByteArraySerializer_0).o1t = function (encoder, content, size) {
    return this.v1z(encoder, (!(content == null) ? isByteArray(content) : false) ? content : THROW_CCE(), size);
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
  protoOf(UByteArraySerializer_0).y1z = function (_this__u8e3s4) {
    return _UByteArray___get_size__impl__h6pkdv(_this__u8e3s4);
  };
  protoOf(UByteArraySerializer_0).b1s = function (_this__u8e3s4) {
    return this.y1z(_this__u8e3s4 instanceof UByteArray ? _this__u8e3s4.nm_1 : THROW_CCE());
  };
  protoOf(UByteArraySerializer_0).z1z = function (_this__u8e3s4) {
    return new UByteArrayBuilder(_this__u8e3s4);
  };
  protoOf(UByteArraySerializer_0).w1q = function (_this__u8e3s4) {
    return this.z1z(_this__u8e3s4 instanceof UByteArray ? _this__u8e3s4.nm_1 : THROW_CCE());
  };
  protoOf(UByteArraySerializer_0).a20 = function () {
    return _UByteArray___init__impl__ip4y9n(0);
  };
  protoOf(UByteArraySerializer_0).m1t = function () {
    return new UByteArray(this.a20());
  };
  protoOf(UByteArraySerializer_0).b20 = function (decoder, index, builder, checkIndex) {
    // Inline function 'kotlin.toUByte' call
    var this_0 = decoder.b1o(this.d1t_1, index).e1n();
    var tmp$ret$0 = _UByte___init__impl__g9hnc4(this_0);
    builder.e20(tmp$ret$0);
  };
  protoOf(UByteArraySerializer_0).h1r = function (decoder, index, builder, checkIndex) {
    return this.b20(decoder, index, builder instanceof UByteArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(UByteArraySerializer_0).n1t = function (decoder, index, builder, checkIndex) {
    return this.b20(decoder, index, builder instanceof UByteArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(UByteArraySerializer_0).f20 = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var tmp = encoder.g1p(this.d1t_1, i);
        // Inline function 'kotlin.UByte.toByte' call
        var this_0 = UByteArray__get_impl_t5f3hv(content, i);
        var tmp$ret$0 = _UByte___get_data__impl__jof9qr(this_0);
        tmp.n1o(tmp$ret$0);
      }
       while (inductionVariable < size);
  };
  protoOf(UByteArraySerializer_0).o1t = function (encoder, content, size) {
    return this.f20(encoder, content instanceof UByteArray ? content.nm_1 : THROW_CCE(), size);
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
  protoOf(BooleanArraySerializer_0).i20 = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(BooleanArraySerializer_0).b1s = function (_this__u8e3s4) {
    return this.i20((!(_this__u8e3s4 == null) ? isBooleanArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(BooleanArraySerializer_0).j20 = function (_this__u8e3s4) {
    return new BooleanArrayBuilder(_this__u8e3s4);
  };
  protoOf(BooleanArraySerializer_0).w1q = function (_this__u8e3s4) {
    return this.j20((!(_this__u8e3s4 == null) ? isBooleanArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(BooleanArraySerializer_0).m1t = function () {
    return booleanArray(0);
  };
  protoOf(BooleanArraySerializer_0).k20 = function (decoder, index, builder, checkIndex) {
    builder.n20(decoder.s1n(this.d1t_1, index));
  };
  protoOf(BooleanArraySerializer_0).h1r = function (decoder, index, builder, checkIndex) {
    return this.k20(decoder, index, builder instanceof BooleanArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(BooleanArraySerializer_0).n1t = function (decoder, index, builder, checkIndex) {
    return this.k20(decoder, index, builder instanceof BooleanArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(BooleanArraySerializer_0).o20 = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.x1o(this.d1t_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(BooleanArraySerializer_0).o1t = function (encoder, content, size) {
    return this.o20(encoder, (!(content == null) ? isBooleanArray(content) : false) ? content : THROW_CCE(), size);
  };
  var BooleanArraySerializer_instance;
  function BooleanArraySerializer_getInstance() {
    if (BooleanArraySerializer_instance == null)
      new BooleanArraySerializer_0();
    return BooleanArraySerializer_instance;
  }
  function CharArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.m1w_1 = bufferWithData;
    this.n1w_1 = bufferWithData.length;
    this.j1t(10);
  }
  protoOf(CharArrayBuilder).f1t = function () {
    return this.n1w_1;
  };
  protoOf(CharArrayBuilder).j1t = function (requiredCapacity) {
    if (this.m1w_1.length < requiredCapacity)
      this.m1w_1 = copyOf(this.m1w_1, coerceAtLeast(requiredCapacity, imul(this.m1w_1.length, 2)));
  };
  protoOf(CharArrayBuilder).o1w = function (c) {
    this.q1t();
    var tmp = this.m1w_1;
    var _unary__edvuaz = this.n1w_1;
    this.n1w_1 = _unary__edvuaz + 1 | 0;
    tmp[_unary__edvuaz] = c;
  };
  protoOf(CharArrayBuilder).h1t = function () {
    return copyOf(this.m1w_1, this.n1w_1);
  };
  function DoubleArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.v1w_1 = bufferWithData;
    this.w1w_1 = bufferWithData.length;
    this.j1t(10);
  }
  protoOf(DoubleArrayBuilder).f1t = function () {
    return this.w1w_1;
  };
  protoOf(DoubleArrayBuilder).j1t = function (requiredCapacity) {
    if (this.v1w_1.length < requiredCapacity)
      this.v1w_1 = copyOf_0(this.v1w_1, coerceAtLeast(requiredCapacity, imul(this.v1w_1.length, 2)));
  };
  protoOf(DoubleArrayBuilder).x1w = function (c) {
    this.q1t();
    var tmp = this.v1w_1;
    var _unary__edvuaz = this.w1w_1;
    this.w1w_1 = _unary__edvuaz + 1 | 0;
    tmp[_unary__edvuaz] = c;
  };
  protoOf(DoubleArrayBuilder).h1t = function () {
    return copyOf_0(this.v1w_1, this.w1w_1);
  };
  function FloatArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.e1x_1 = bufferWithData;
    this.f1x_1 = bufferWithData.length;
    this.j1t(10);
  }
  protoOf(FloatArrayBuilder).f1t = function () {
    return this.f1x_1;
  };
  protoOf(FloatArrayBuilder).j1t = function (requiredCapacity) {
    if (this.e1x_1.length < requiredCapacity)
      this.e1x_1 = copyOf_1(this.e1x_1, coerceAtLeast(requiredCapacity, imul(this.e1x_1.length, 2)));
  };
  protoOf(FloatArrayBuilder).g1x = function (c) {
    this.q1t();
    var tmp = this.e1x_1;
    var _unary__edvuaz = this.f1x_1;
    this.f1x_1 = _unary__edvuaz + 1 | 0;
    tmp[_unary__edvuaz] = c;
  };
  protoOf(FloatArrayBuilder).h1t = function () {
    return copyOf_1(this.e1x_1, this.f1x_1);
  };
  function LongArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.n1x_1 = bufferWithData;
    this.o1x_1 = bufferWithData.length;
    this.j1t(10);
  }
  protoOf(LongArrayBuilder).f1t = function () {
    return this.o1x_1;
  };
  protoOf(LongArrayBuilder).j1t = function (requiredCapacity) {
    if (this.n1x_1.length < requiredCapacity)
      this.n1x_1 = copyOf_2(this.n1x_1, coerceAtLeast(requiredCapacity, imul(this.n1x_1.length, 2)));
  };
  protoOf(LongArrayBuilder).p1x = function (c) {
    this.q1t();
    var tmp = this.n1x_1;
    var _unary__edvuaz = this.o1x_1;
    this.o1x_1 = _unary__edvuaz + 1 | 0;
    tmp[_unary__edvuaz] = c;
  };
  protoOf(LongArrayBuilder).h1t = function () {
    return copyOf_2(this.n1x_1, this.o1x_1);
  };
  function ULongArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.x1x_1 = bufferWithData;
    this.y1x_1 = _ULongArray___get_size__impl__ju6dtr(bufferWithData);
    this.j1t(10);
  }
  protoOf(ULongArrayBuilder).f1t = function () {
    return this.y1x_1;
  };
  protoOf(ULongArrayBuilder).j1t = function (requiredCapacity) {
    if (_ULongArray___get_size__impl__ju6dtr(this.x1x_1) < requiredCapacity) {
      var tmp = this;
      var tmp0 = this.x1x_1;
      // Inline function 'kotlin.collections.copyOf' call
      var newSize = coerceAtLeast(requiredCapacity, imul(_ULongArray___get_size__impl__ju6dtr(this.x1x_1), 2));
      tmp.x1x_1 = _ULongArray___init__impl__twm1l3_0(copyOf_2(_ULongArray___get_storage__impl__28e64j(tmp0), newSize));
    }
  };
  protoOf(ULongArrayBuilder).z1x = function (c) {
    this.q1t();
    var tmp = this.x1x_1;
    var _unary__edvuaz = this.y1x_1;
    this.y1x_1 = _unary__edvuaz + 1 | 0;
    ULongArray__set_impl_z19mvh(tmp, _unary__edvuaz, c);
  };
  protoOf(ULongArrayBuilder).p20 = function () {
    var tmp0 = this.x1x_1;
    // Inline function 'kotlin.collections.copyOf' call
    var newSize = this.y1x_1;
    return _ULongArray___init__impl__twm1l3_0(copyOf_2(_ULongArray___get_storage__impl__28e64j(tmp0), newSize));
  };
  protoOf(ULongArrayBuilder).h1t = function () {
    return new ULongArray(this.p20());
  };
  function IntArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.g1y_1 = bufferWithData;
    this.h1y_1 = bufferWithData.length;
    this.j1t(10);
  }
  protoOf(IntArrayBuilder).f1t = function () {
    return this.h1y_1;
  };
  protoOf(IntArrayBuilder).j1t = function (requiredCapacity) {
    if (this.g1y_1.length < requiredCapacity)
      this.g1y_1 = copyOf_3(this.g1y_1, coerceAtLeast(requiredCapacity, imul(this.g1y_1.length, 2)));
  };
  protoOf(IntArrayBuilder).i1y = function (c) {
    this.q1t();
    var tmp = this.g1y_1;
    var _unary__edvuaz = this.h1y_1;
    this.h1y_1 = _unary__edvuaz + 1 | 0;
    tmp[_unary__edvuaz] = c;
  };
  protoOf(IntArrayBuilder).h1t = function () {
    return copyOf_3(this.g1y_1, this.h1y_1);
  };
  function UIntArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.q1y_1 = bufferWithData;
    this.r1y_1 = _UIntArray___get_size__impl__r6l8ci(bufferWithData);
    this.j1t(10);
  }
  protoOf(UIntArrayBuilder).f1t = function () {
    return this.r1y_1;
  };
  protoOf(UIntArrayBuilder).j1t = function (requiredCapacity) {
    if (_UIntArray___get_size__impl__r6l8ci(this.q1y_1) < requiredCapacity) {
      var tmp = this;
      var tmp0 = this.q1y_1;
      // Inline function 'kotlin.collections.copyOf' call
      var newSize = coerceAtLeast(requiredCapacity, imul(_UIntArray___get_size__impl__r6l8ci(this.q1y_1), 2));
      tmp.q1y_1 = _UIntArray___init__impl__ghjpc6_0(copyOf_3(_UIntArray___get_storage__impl__92a0v0(tmp0), newSize));
    }
  };
  protoOf(UIntArrayBuilder).s1y = function (c) {
    this.q1t();
    var tmp = this.q1y_1;
    var _unary__edvuaz = this.r1y_1;
    this.r1y_1 = _unary__edvuaz + 1 | 0;
    UIntArray__set_impl_7f2zu2(tmp, _unary__edvuaz, c);
  };
  protoOf(UIntArrayBuilder).q20 = function () {
    var tmp0 = this.q1y_1;
    // Inline function 'kotlin.collections.copyOf' call
    var newSize = this.r1y_1;
    return _UIntArray___init__impl__ghjpc6_0(copyOf_3(_UIntArray___get_storage__impl__92a0v0(tmp0), newSize));
  };
  protoOf(UIntArrayBuilder).h1t = function () {
    return new UIntArray(this.q20());
  };
  function ShortArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.z1y_1 = bufferWithData;
    this.a1z_1 = bufferWithData.length;
    this.j1t(10);
  }
  protoOf(ShortArrayBuilder).f1t = function () {
    return this.a1z_1;
  };
  protoOf(ShortArrayBuilder).j1t = function (requiredCapacity) {
    if (this.z1y_1.length < requiredCapacity)
      this.z1y_1 = copyOf_4(this.z1y_1, coerceAtLeast(requiredCapacity, imul(this.z1y_1.length, 2)));
  };
  protoOf(ShortArrayBuilder).b1z = function (c) {
    this.q1t();
    var tmp = this.z1y_1;
    var _unary__edvuaz = this.a1z_1;
    this.a1z_1 = _unary__edvuaz + 1 | 0;
    tmp[_unary__edvuaz] = c;
  };
  protoOf(ShortArrayBuilder).h1t = function () {
    return copyOf_4(this.z1y_1, this.a1z_1);
  };
  function UShortArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.j1z_1 = bufferWithData;
    this.k1z_1 = _UShortArray___get_size__impl__jqto1b(bufferWithData);
    this.j1t(10);
  }
  protoOf(UShortArrayBuilder).f1t = function () {
    return this.k1z_1;
  };
  protoOf(UShortArrayBuilder).j1t = function (requiredCapacity) {
    if (_UShortArray___get_size__impl__jqto1b(this.j1z_1) < requiredCapacity) {
      var tmp = this;
      var tmp0 = this.j1z_1;
      // Inline function 'kotlin.collections.copyOf' call
      var newSize = coerceAtLeast(requiredCapacity, imul(_UShortArray___get_size__impl__jqto1b(this.j1z_1), 2));
      tmp.j1z_1 = _UShortArray___init__impl__9b26ef_0(copyOf_4(_UShortArray___get_storage__impl__t2jpv5(tmp0), newSize));
    }
  };
  protoOf(UShortArrayBuilder).l1z = function (c) {
    this.q1t();
    var tmp = this.j1z_1;
    var _unary__edvuaz = this.k1z_1;
    this.k1z_1 = _unary__edvuaz + 1 | 0;
    UShortArray__set_impl_6d8whp(tmp, _unary__edvuaz, c);
  };
  protoOf(UShortArrayBuilder).r20 = function () {
    var tmp0 = this.j1z_1;
    // Inline function 'kotlin.collections.copyOf' call
    var newSize = this.k1z_1;
    return _UShortArray___init__impl__9b26ef_0(copyOf_4(_UShortArray___get_storage__impl__t2jpv5(tmp0), newSize));
  };
  protoOf(UShortArrayBuilder).h1t = function () {
    return new UShortArray(this.r20());
  };
  function ByteArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.s1z_1 = bufferWithData;
    this.t1z_1 = bufferWithData.length;
    this.j1t(10);
  }
  protoOf(ByteArrayBuilder).f1t = function () {
    return this.t1z_1;
  };
  protoOf(ByteArrayBuilder).j1t = function (requiredCapacity) {
    if (this.s1z_1.length < requiredCapacity)
      this.s1z_1 = copyOf_5(this.s1z_1, coerceAtLeast(requiredCapacity, imul(this.s1z_1.length, 2)));
  };
  protoOf(ByteArrayBuilder).u1z = function (c) {
    this.q1t();
    var tmp = this.s1z_1;
    var _unary__edvuaz = this.t1z_1;
    this.t1z_1 = _unary__edvuaz + 1 | 0;
    tmp[_unary__edvuaz] = c;
  };
  protoOf(ByteArrayBuilder).h1t = function () {
    return copyOf_5(this.s1z_1, this.t1z_1);
  };
  function UByteArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.c20_1 = bufferWithData;
    this.d20_1 = _UByteArray___get_size__impl__h6pkdv(bufferWithData);
    this.j1t(10);
  }
  protoOf(UByteArrayBuilder).f1t = function () {
    return this.d20_1;
  };
  protoOf(UByteArrayBuilder).j1t = function (requiredCapacity) {
    if (_UByteArray___get_size__impl__h6pkdv(this.c20_1) < requiredCapacity) {
      var tmp = this;
      var tmp0 = this.c20_1;
      // Inline function 'kotlin.collections.copyOf' call
      var newSize = coerceAtLeast(requiredCapacity, imul(_UByteArray___get_size__impl__h6pkdv(this.c20_1), 2));
      tmp.c20_1 = _UByteArray___init__impl__ip4y9n_0(copyOf_5(_UByteArray___get_storage__impl__d4kctt(tmp0), newSize));
    }
  };
  protoOf(UByteArrayBuilder).e20 = function (c) {
    this.q1t();
    var tmp = this.c20_1;
    var _unary__edvuaz = this.d20_1;
    this.d20_1 = _unary__edvuaz + 1 | 0;
    UByteArray__set_impl_jvcicn(tmp, _unary__edvuaz, c);
  };
  protoOf(UByteArrayBuilder).s20 = function () {
    var tmp0 = this.c20_1;
    // Inline function 'kotlin.collections.copyOf' call
    var newSize = this.d20_1;
    return _UByteArray___init__impl__ip4y9n_0(copyOf_5(_UByteArray___get_storage__impl__d4kctt(tmp0), newSize));
  };
  protoOf(UByteArrayBuilder).h1t = function () {
    return new UByteArray(this.s20());
  };
  function BooleanArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.l20_1 = bufferWithData;
    this.m20_1 = bufferWithData.length;
    this.j1t(10);
  }
  protoOf(BooleanArrayBuilder).f1t = function () {
    return this.m20_1;
  };
  protoOf(BooleanArrayBuilder).j1t = function (requiredCapacity) {
    if (this.l20_1.length < requiredCapacity)
      this.l20_1 = copyOf_6(this.l20_1, coerceAtLeast(requiredCapacity, imul(this.l20_1.length, 2)));
  };
  protoOf(BooleanArrayBuilder).n20 = function (c) {
    this.q1t();
    var tmp = this.l20_1;
    var _unary__edvuaz = this.m20_1;
    this.m20_1 = _unary__edvuaz + 1 | 0;
    tmp[_unary__edvuaz] = c;
  };
  protoOf(BooleanArrayBuilder).h1t = function () {
    return copyOf_6(this.l20_1, this.m20_1);
  };
  function get_BUILTIN_SERIALIZERS() {
    _init_properties_Primitives_kt__k0eto4();
    return BUILTIN_SERIALIZERS;
  }
  var BUILTIN_SERIALIZERS;
  function builtinSerializerOrNull(_this__u8e3s4) {
    _init_properties_Primitives_kt__k0eto4();
    var tmp = get_BUILTIN_SERIALIZERS().e2(_this__u8e3s4);
    return (tmp == null ? true : isInterface(tmp, KSerializer)) ? tmp : THROW_CCE();
  }
  function StringSerializer() {
    StringSerializer_instance = this;
    this.t20_1 = new PrimitiveSerialDescriptor_0('kotlin.String', STRING_getInstance());
  }
  protoOf(StringSerializer).p1k = function () {
    return this.t20_1;
  };
  protoOf(StringSerializer).u20 = function (encoder, value) {
    return encoder.u1o(value);
  };
  protoOf(StringSerializer).q1k = function (encoder, value) {
    return this.u20(encoder, (!(value == null) ? typeof value === 'string' : false) ? value : THROW_CCE());
  };
  protoOf(StringSerializer).r1k = function (decoder) {
    return decoder.l1n();
  };
  var StringSerializer_instance;
  function StringSerializer_getInstance() {
    if (StringSerializer_instance == null)
      new StringSerializer();
    return StringSerializer_instance;
  }
  function CharSerializer() {
    CharSerializer_instance = this;
    this.v20_1 = new PrimitiveSerialDescriptor_0('kotlin.Char', CHAR_getInstance());
  }
  protoOf(CharSerializer).p1k = function () {
    return this.v20_1;
  };
  protoOf(CharSerializer).w20 = function (encoder, value) {
    return encoder.t1o(value);
  };
  protoOf(CharSerializer).q1k = function (encoder, value) {
    return this.w20(encoder, value instanceof Char ? value.k1_1 : THROW_CCE());
  };
  protoOf(CharSerializer).x20 = function (decoder) {
    return decoder.k1n();
  };
  protoOf(CharSerializer).r1k = function (decoder) {
    return new Char(this.x20(decoder));
  };
  var CharSerializer_instance;
  function CharSerializer_getInstance() {
    if (CharSerializer_instance == null)
      new CharSerializer();
    return CharSerializer_instance;
  }
  function DoubleSerializer() {
    DoubleSerializer_instance = this;
    this.y20_1 = new PrimitiveSerialDescriptor_0('kotlin.Double', DOUBLE_getInstance());
  }
  protoOf(DoubleSerializer).p1k = function () {
    return this.y20_1;
  };
  protoOf(DoubleSerializer).z20 = function (encoder, value) {
    return encoder.s1o(value);
  };
  protoOf(DoubleSerializer).q1k = function (encoder, value) {
    return this.z20(encoder, (!(value == null) ? typeof value === 'number' : false) ? value : THROW_CCE());
  };
  protoOf(DoubleSerializer).r1k = function (decoder) {
    return decoder.j1n();
  };
  var DoubleSerializer_instance;
  function DoubleSerializer_getInstance() {
    if (DoubleSerializer_instance == null)
      new DoubleSerializer();
    return DoubleSerializer_instance;
  }
  function FloatSerializer() {
    FloatSerializer_instance = this;
    this.a21_1 = new PrimitiveSerialDescriptor_0('kotlin.Float', FLOAT_getInstance());
  }
  protoOf(FloatSerializer).p1k = function () {
    return this.a21_1;
  };
  protoOf(FloatSerializer).b21 = function (encoder, value) {
    return encoder.r1o(value);
  };
  protoOf(FloatSerializer).q1k = function (encoder, value) {
    return this.b21(encoder, (!(value == null) ? typeof value === 'number' : false) ? value : THROW_CCE());
  };
  protoOf(FloatSerializer).r1k = function (decoder) {
    return decoder.i1n();
  };
  var FloatSerializer_instance;
  function FloatSerializer_getInstance() {
    if (FloatSerializer_instance == null)
      new FloatSerializer();
    return FloatSerializer_instance;
  }
  function LongSerializer() {
    LongSerializer_instance = this;
    this.c21_1 = new PrimitiveSerialDescriptor_0('kotlin.Long', LONG_getInstance());
  }
  protoOf(LongSerializer).p1k = function () {
    return this.c21_1;
  };
  protoOf(LongSerializer).d21 = function (encoder, value) {
    return encoder.q1o(value);
  };
  protoOf(LongSerializer).q1k = function (encoder, value) {
    return this.d21(encoder, value instanceof Long ? value : THROW_CCE());
  };
  protoOf(LongSerializer).r1k = function (decoder) {
    return decoder.h1n();
  };
  var LongSerializer_instance;
  function LongSerializer_getInstance() {
    if (LongSerializer_instance == null)
      new LongSerializer();
    return LongSerializer_instance;
  }
  function IntSerializer() {
    IntSerializer_instance = this;
    this.e21_1 = new PrimitiveSerialDescriptor_0('kotlin.Int', INT_getInstance());
  }
  protoOf(IntSerializer).p1k = function () {
    return this.e21_1;
  };
  protoOf(IntSerializer).f21 = function (encoder, value) {
    return encoder.p1o(value);
  };
  protoOf(IntSerializer).q1k = function (encoder, value) {
    return this.f21(encoder, (!(value == null) ? typeof value === 'number' : false) ? value : THROW_CCE());
  };
  protoOf(IntSerializer).r1k = function (decoder) {
    return decoder.g1n();
  };
  var IntSerializer_instance;
  function IntSerializer_getInstance() {
    if (IntSerializer_instance == null)
      new IntSerializer();
    return IntSerializer_instance;
  }
  function ShortSerializer() {
    ShortSerializer_instance = this;
    this.g21_1 = new PrimitiveSerialDescriptor_0('kotlin.Short', SHORT_getInstance());
  }
  protoOf(ShortSerializer).p1k = function () {
    return this.g21_1;
  };
  protoOf(ShortSerializer).h21 = function (encoder, value) {
    return encoder.o1o(value);
  };
  protoOf(ShortSerializer).q1k = function (encoder, value) {
    return this.h21(encoder, (!(value == null) ? typeof value === 'number' : false) ? value : THROW_CCE());
  };
  protoOf(ShortSerializer).r1k = function (decoder) {
    return decoder.f1n();
  };
  var ShortSerializer_instance;
  function ShortSerializer_getInstance() {
    if (ShortSerializer_instance == null)
      new ShortSerializer();
    return ShortSerializer_instance;
  }
  function ByteSerializer() {
    ByteSerializer_instance = this;
    this.i21_1 = new PrimitiveSerialDescriptor_0('kotlin.Byte', BYTE_getInstance());
  }
  protoOf(ByteSerializer).p1k = function () {
    return this.i21_1;
  };
  protoOf(ByteSerializer).j21 = function (encoder, value) {
    return encoder.n1o(value);
  };
  protoOf(ByteSerializer).q1k = function (encoder, value) {
    return this.j21(encoder, (!(value == null) ? typeof value === 'number' : false) ? value : THROW_CCE());
  };
  protoOf(ByteSerializer).r1k = function (decoder) {
    return decoder.e1n();
  };
  var ByteSerializer_instance;
  function ByteSerializer_getInstance() {
    if (ByteSerializer_instance == null)
      new ByteSerializer();
    return ByteSerializer_instance;
  }
  function BooleanSerializer() {
    BooleanSerializer_instance = this;
    this.k21_1 = new PrimitiveSerialDescriptor_0('kotlin.Boolean', BOOLEAN_getInstance());
  }
  protoOf(BooleanSerializer).p1k = function () {
    return this.k21_1;
  };
  protoOf(BooleanSerializer).l21 = function (encoder, value) {
    return encoder.m1o(value);
  };
  protoOf(BooleanSerializer).q1k = function (encoder, value) {
    return this.l21(encoder, (!(value == null) ? typeof value === 'boolean' : false) ? value : THROW_CCE());
  };
  protoOf(BooleanSerializer).r1k = function (decoder) {
    return decoder.d1n();
  };
  var BooleanSerializer_instance;
  function BooleanSerializer_getInstance() {
    if (BooleanSerializer_instance == null)
      new BooleanSerializer();
    return BooleanSerializer_instance;
  }
  function UnitSerializer() {
    UnitSerializer_instance = this;
    this.m21_1 = new ObjectSerializer('kotlin.Unit', Unit_instance);
  }
  protoOf(UnitSerializer).p1k = function () {
    return this.m21_1.p1k();
  };
  protoOf(UnitSerializer).n21 = function (encoder, value) {
    this.m21_1.f1l(encoder, Unit_instance);
  };
  protoOf(UnitSerializer).q1k = function (encoder, value) {
    return this.n21(encoder, value instanceof Unit ? value : THROW_CCE());
  };
  protoOf(UnitSerializer).o21 = function (decoder) {
    this.m21_1.r1k(decoder);
  };
  protoOf(UnitSerializer).r1k = function (decoder) {
    this.o21(decoder);
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
    this.p21_1 = serialName;
    this.q21_1 = kind;
  }
  protoOf(PrimitiveSerialDescriptor_0).t1l = function () {
    return this.p21_1;
  };
  protoOf(PrimitiveSerialDescriptor_0).u1l = function () {
    return this.q21_1;
  };
  protoOf(PrimitiveSerialDescriptor_0).w1l = function () {
    return 0;
  };
  protoOf(PrimitiveSerialDescriptor_0).y1l = function (index) {
    error_0(this);
  };
  protoOf(PrimitiveSerialDescriptor_0).z1l = function (name) {
    error_0(this);
  };
  protoOf(PrimitiveSerialDescriptor_0).c1m = function (index) {
    error_0(this);
  };
  protoOf(PrimitiveSerialDescriptor_0).b1m = function (index) {
    error_0(this);
  };
  protoOf(PrimitiveSerialDescriptor_0).a1m = function (index) {
    error_0(this);
  };
  protoOf(PrimitiveSerialDescriptor_0).toString = function () {
    return 'PrimitiveDescriptor(' + this.p21_1 + ')';
  };
  protoOf(PrimitiveSerialDescriptor_0).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof PrimitiveSerialDescriptor_0))
      return false;
    if (this.p21_1 === other.p21_1 && equals(this.q21_1, other.q21_1))
      return true;
    return false;
  };
  protoOf(PrimitiveSerialDescriptor_0).hashCode = function () {
    return getStringHashCode(this.p21_1) + imul(31, this.q21_1.hashCode()) | 0;
  };
  function PrimitiveDescriptorSafe(serialName, kind) {
    _init_properties_Primitives_kt__k0eto4();
    checkName(serialName);
    return new PrimitiveSerialDescriptor_0(serialName, kind);
  }
  function checkName(serialName) {
    _init_properties_Primitives_kt__k0eto4();
    var values = get_BUILTIN_SERIALIZERS().g2();
    var _iterator__ex2g4s = values.g();
    while (_iterator__ex2g4s.h()) {
      var primitive = _iterator__ex2g4s.i();
      var primitiveName = primitive.p1k().t1l();
      if (serialName === primitiveName) {
        throw IllegalArgumentException_init_$Create$(trimIndent('\n                The name of serial descriptor should uniquely identify associated serializer.\n                For serial name ' + serialName + ' there already exists ' + getKClassFromExpression(primitive).ua() + '.\n                Please refer to SerialDescriptor documentation for additional information.\n            '));
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
  protoOf(NamedValueEncoder).s21 = function (_this__u8e3s4, index) {
    return this.u21(this.t21(_this__u8e3s4, index));
  };
  protoOf(NamedValueEncoder).u21 = function (nestedName) {
    var tmp0_elvis_lhs = this.w21();
    return this.x21(tmp0_elvis_lhs == null ? '' : tmp0_elvis_lhs, nestedName);
  };
  protoOf(NamedValueEncoder).t21 = function (descriptor, index) {
    return descriptor.y1l(index);
  };
  protoOf(NamedValueEncoder).x21 = function (parentName, childName) {
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
  protoOf(NamedValueDecoder).s21 = function (_this__u8e3s4, index) {
    return this.u21(this.t21(_this__u8e3s4, index));
  };
  protoOf(NamedValueDecoder).u21 = function (nestedName) {
    var tmp0_elvis_lhs = this.w21();
    return this.x21(tmp0_elvis_lhs == null ? '' : tmp0_elvis_lhs, nestedName);
  };
  protoOf(NamedValueDecoder).t21 = function (descriptor, index) {
    return descriptor.y1l(index);
  };
  protoOf(NamedValueDecoder).x21 = function (parentName, childName) {
    var tmp;
    // Inline function 'kotlin.text.isEmpty' call
    if (charSequenceLength(parentName) === 0) {
      tmp = childName;
    } else {
      tmp = parentName + '.' + childName;
    }
    return tmp;
  };
  protoOf(NamedValueDecoder).u22 = function () {
    return this.s22_1.p() ? '$' : joinToString(this.s22_1, '.', '$.');
  };
  function encodeElement($this, desc, index) {
    var tag = $this.s21(desc, index);
    $this.o22(tag);
    return true;
  }
  function TaggedEncoder() {
    var tmp = this;
    // Inline function 'kotlin.collections.arrayListOf' call
    tmp.v21_1 = ArrayList_init_$Create$_0();
  }
  protoOf(TaggedEncoder).f1o = function () {
    return EmptySerializersModule_0();
  };
  protoOf(TaggedEncoder).y21 = function (tag, value) {
    throw SerializationException_init_$Create$_0('Non-serializable ' + toString(getKClassFromExpression(value)) + ' is not supported by ' + toString(getKClassFromExpression(this)) + ' encoder');
  };
  protoOf(TaggedEncoder).z21 = function (tag) {
  };
  protoOf(TaggedEncoder).a22 = function (tag) {
    throw SerializationException_init_$Create$_0('null is not supported');
  };
  protoOf(TaggedEncoder).b22 = function (tag, value) {
    return this.y21(tag, value);
  };
  protoOf(TaggedEncoder).c22 = function (tag, value) {
    return this.y21(tag, value);
  };
  protoOf(TaggedEncoder).d22 = function (tag, value) {
    return this.y21(tag, value);
  };
  protoOf(TaggedEncoder).e22 = function (tag, value) {
    return this.y21(tag, value);
  };
  protoOf(TaggedEncoder).f22 = function (tag, value) {
    return this.y21(tag, value);
  };
  protoOf(TaggedEncoder).g22 = function (tag, value) {
    return this.y21(tag, value);
  };
  protoOf(TaggedEncoder).h22 = function (tag, value) {
    return this.y21(tag, value);
  };
  protoOf(TaggedEncoder).i22 = function (tag, value) {
    return this.y21(tag, new Char(value));
  };
  protoOf(TaggedEncoder).j22 = function (tag, value) {
    return this.y21(tag, value);
  };
  protoOf(TaggedEncoder).k22 = function (tag, enumDescriptor, ordinal) {
    return this.y21(tag, ordinal);
  };
  protoOf(TaggedEncoder).l22 = function (tag, inlineDescriptor) {
    // Inline function 'kotlin.apply' call
    this.o22(tag);
    return this;
  };
  protoOf(TaggedEncoder).w1o = function (descriptor) {
    return this.l22(this.p22(), descriptor);
  };
  protoOf(TaggedEncoder).l1p = function () {
    return this.z21(this.n22());
  };
  protoOf(TaggedEncoder).l1o = function () {
    return this.a22(this.p22());
  };
  protoOf(TaggedEncoder).m1o = function (value) {
    return this.h22(this.p22(), value);
  };
  protoOf(TaggedEncoder).n1o = function (value) {
    return this.c22(this.p22(), value);
  };
  protoOf(TaggedEncoder).o1o = function (value) {
    return this.d22(this.p22(), value);
  };
  protoOf(TaggedEncoder).p1o = function (value) {
    return this.b22(this.p22(), value);
  };
  protoOf(TaggedEncoder).q1o = function (value) {
    return this.e22(this.p22(), value);
  };
  protoOf(TaggedEncoder).r1o = function (value) {
    return this.f22(this.p22(), value);
  };
  protoOf(TaggedEncoder).s1o = function (value) {
    return this.g22(this.p22(), value);
  };
  protoOf(TaggedEncoder).t1o = function (value) {
    return this.i22(this.p22(), value);
  };
  protoOf(TaggedEncoder).u1o = function (value) {
    return this.j22(this.p22(), value);
  };
  protoOf(TaggedEncoder).v1o = function (enumDescriptor, index) {
    return this.k22(this.p22(), enumDescriptor, index);
  };
  protoOf(TaggedEncoder).q1n = function (descriptor) {
    return this;
  };
  protoOf(TaggedEncoder).r1n = function (descriptor) {
    // Inline function 'kotlin.collections.isNotEmpty' call
    if (!this.v21_1.p()) {
      this.p22();
    }
    this.m22(descriptor);
  };
  protoOf(TaggedEncoder).m22 = function (descriptor) {
  };
  protoOf(TaggedEncoder).x1o = function (descriptor, index, value) {
    return this.h22(this.s21(descriptor, index), value);
  };
  protoOf(TaggedEncoder).y1o = function (descriptor, index, value) {
    return this.c22(this.s21(descriptor, index), value);
  };
  protoOf(TaggedEncoder).z1o = function (descriptor, index, value) {
    return this.d22(this.s21(descriptor, index), value);
  };
  protoOf(TaggedEncoder).a1p = function (descriptor, index, value) {
    return this.b22(this.s21(descriptor, index), value);
  };
  protoOf(TaggedEncoder).b1p = function (descriptor, index, value) {
    return this.e22(this.s21(descriptor, index), value);
  };
  protoOf(TaggedEncoder).c1p = function (descriptor, index, value) {
    return this.f22(this.s21(descriptor, index), value);
  };
  protoOf(TaggedEncoder).d1p = function (descriptor, index, value) {
    return this.g22(this.s21(descriptor, index), value);
  };
  protoOf(TaggedEncoder).e1p = function (descriptor, index, value) {
    return this.i22(this.s21(descriptor, index), value);
  };
  protoOf(TaggedEncoder).f1p = function (descriptor, index, value) {
    return this.j22(this.s21(descriptor, index), value);
  };
  protoOf(TaggedEncoder).g1p = function (descriptor, index) {
    return this.l22(this.s21(descriptor, index), descriptor.b1m(index));
  };
  protoOf(TaggedEncoder).h1p = function (descriptor, index, serializer, value) {
    if (encodeElement(this, descriptor, index)) {
      this.i1p(serializer, value);
    }
  };
  protoOf(TaggedEncoder).j1p = function (descriptor, index, serializer, value) {
    if (encodeElement(this, descriptor, index)) {
      this.k1p(serializer, value);
    }
  };
  protoOf(TaggedEncoder).n22 = function () {
    return last(this.v21_1);
  };
  protoOf(TaggedEncoder).w21 = function () {
    return lastOrNull(this.v21_1);
  };
  protoOf(TaggedEncoder).o22 = function (name) {
    this.v21_1.e(name);
  };
  protoOf(TaggedEncoder).p22 = function () {
    var tmp;
    // Inline function 'kotlin.collections.isNotEmpty' call
    if (!this.v21_1.p()) {
      tmp = this.v21_1.b2(get_lastIndex_0(this.v21_1));
    } else {
      throw SerializationException_init_$Create$_0('No tag in stack for requested element');
    }
    return tmp;
  };
  function tagBlock($this, tag, block) {
    $this.o22(tag);
    var r = block();
    if (!$this.t22_1) {
      $this.p22();
    }
    $this.t22_1 = false;
    return r;
  }
  function TaggedDecoder$decodeSerializableElement$lambda(this$0, $deserializer, $previousValue) {
    return function () {
      return this$0.o1n($deserializer, $previousValue);
    };
  }
  function TaggedDecoder$decodeNullableSerializableElement$lambda(this$0, $deserializer, $previousValue) {
    return function () {
      var tmp0 = this$0;
      // Inline function 'kotlinx.serialization.encoding.decodeIfNullable' call
      var isNullabilitySupported = $deserializer.p1k().p1l();
      var tmp;
      if (isNullabilitySupported || tmp0.b1n()) {
        tmp = this$0.o1n($deserializer, $previousValue);
      } else {
        tmp = tmp0.c1n();
      }
      return tmp;
    };
  }
  function TaggedDecoder() {
    var tmp = this;
    // Inline function 'kotlin.collections.arrayListOf' call
    tmp.s22_1 = ArrayList_init_$Create$_0();
    this.t22_1 = false;
  }
  protoOf(TaggedDecoder).f1o = function () {
    return EmptySerializersModule_0();
  };
  protoOf(TaggedDecoder).v22 = function (tag) {
    throw SerializationException_init_$Create$_0(toString(getKClassFromExpression(this)) + " can't retrieve untyped values");
  };
  protoOf(TaggedDecoder).w22 = function (tag) {
    return true;
  };
  protoOf(TaggedDecoder).x22 = function (tag) {
    var tmp = this.v22(tag);
    return typeof tmp === 'boolean' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).y22 = function (tag) {
    var tmp = this.v22(tag);
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).z22 = function (tag) {
    var tmp = this.v22(tag);
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).a23 = function (tag) {
    var tmp = this.v22(tag);
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).b23 = function (tag) {
    var tmp = this.v22(tag);
    return tmp instanceof Long ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).c23 = function (tag) {
    var tmp = this.v22(tag);
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).d23 = function (tag) {
    var tmp = this.v22(tag);
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).e23 = function (tag) {
    var tmp = this.v22(tag);
    return tmp instanceof Char ? tmp.k1_1 : THROW_CCE();
  };
  protoOf(TaggedDecoder).f23 = function (tag) {
    var tmp = this.v22(tag);
    return typeof tmp === 'string' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).g23 = function (tag, enumDescriptor) {
    var tmp = this.v22(tag);
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).h23 = function (tag, inlineDescriptor) {
    // Inline function 'kotlin.apply' call
    this.o22(tag);
    return this;
  };
  protoOf(TaggedDecoder).o1n = function (deserializer, previousValue) {
    return this.p1n(deserializer);
  };
  protoOf(TaggedDecoder).n1n = function (descriptor) {
    return this.h23(this.p22(), descriptor);
  };
  protoOf(TaggedDecoder).b1n = function () {
    var tmp0_elvis_lhs = this.w21();
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return false;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var currentTag = tmp;
    return this.w22(currentTag);
  };
  protoOf(TaggedDecoder).c1n = function () {
    return null;
  };
  protoOf(TaggedDecoder).d1n = function () {
    return this.x22(this.p22());
  };
  protoOf(TaggedDecoder).e1n = function () {
    return this.y22(this.p22());
  };
  protoOf(TaggedDecoder).f1n = function () {
    return this.z22(this.p22());
  };
  protoOf(TaggedDecoder).g1n = function () {
    return this.a23(this.p22());
  };
  protoOf(TaggedDecoder).h1n = function () {
    return this.b23(this.p22());
  };
  protoOf(TaggedDecoder).i1n = function () {
    return this.c23(this.p22());
  };
  protoOf(TaggedDecoder).j1n = function () {
    return this.d23(this.p22());
  };
  protoOf(TaggedDecoder).k1n = function () {
    return this.e23(this.p22());
  };
  protoOf(TaggedDecoder).l1n = function () {
    return this.f23(this.p22());
  };
  protoOf(TaggedDecoder).m1n = function (enumDescriptor) {
    return this.g23(this.p22(), enumDescriptor);
  };
  protoOf(TaggedDecoder).q1n = function (descriptor) {
    return this;
  };
  protoOf(TaggedDecoder).r1n = function (descriptor) {
  };
  protoOf(TaggedDecoder).s1n = function (descriptor, index) {
    return this.x22(this.s21(descriptor, index));
  };
  protoOf(TaggedDecoder).t1n = function (descriptor, index) {
    return this.y22(this.s21(descriptor, index));
  };
  protoOf(TaggedDecoder).u1n = function (descriptor, index) {
    return this.z22(this.s21(descriptor, index));
  };
  protoOf(TaggedDecoder).v1n = function (descriptor, index) {
    return this.a23(this.s21(descriptor, index));
  };
  protoOf(TaggedDecoder).w1n = function (descriptor, index) {
    return this.b23(this.s21(descriptor, index));
  };
  protoOf(TaggedDecoder).x1n = function (descriptor, index) {
    return this.c23(this.s21(descriptor, index));
  };
  protoOf(TaggedDecoder).y1n = function (descriptor, index) {
    return this.d23(this.s21(descriptor, index));
  };
  protoOf(TaggedDecoder).z1n = function (descriptor, index) {
    return this.e23(this.s21(descriptor, index));
  };
  protoOf(TaggedDecoder).a1o = function (descriptor, index) {
    return this.f23(this.s21(descriptor, index));
  };
  protoOf(TaggedDecoder).b1o = function (descriptor, index) {
    return this.h23(this.s21(descriptor, index), descriptor.b1m(index));
  };
  protoOf(TaggedDecoder).c1o = function (descriptor, index, deserializer, previousValue) {
    var tmp = this.s21(descriptor, index);
    return tagBlock(this, tmp, TaggedDecoder$decodeSerializableElement$lambda(this, deserializer, previousValue));
  };
  protoOf(TaggedDecoder).e1o = function (descriptor, index, deserializer, previousValue) {
    var tmp = this.s21(descriptor, index);
    return tagBlock(this, tmp, TaggedDecoder$decodeNullableSerializableElement$lambda(this, deserializer, previousValue));
  };
  protoOf(TaggedDecoder).w21 = function () {
    return lastOrNull(this.s22_1);
  };
  protoOf(TaggedDecoder).o22 = function (name) {
    this.s22_1.e(name);
  };
  protoOf(TaggedDecoder).p22 = function () {
    var r = this.s22_1.b2(get_lastIndex_0(this.s22_1));
    this.t22_1 = true;
    return r;
  };
  function get_NULL() {
    _init_properties_Tuples_kt__dz0qyd();
    return NULL;
  }
  var NULL;
  function MapEntry(key, value) {
    this.i23_1 = key;
    this.j23_1 = value;
  }
  protoOf(MapEntry).v = function () {
    return this.i23_1;
  };
  protoOf(MapEntry).w = function () {
    return this.j23_1;
  };
  protoOf(MapEntry).toString = function () {
    return 'MapEntry(key=' + toString_0(this.i23_1) + ', value=' + toString_0(this.j23_1) + ')';
  };
  protoOf(MapEntry).hashCode = function () {
    var result = this.i23_1 == null ? 0 : hashCode(this.i23_1);
    result = imul(result, 31) + (this.j23_1 == null ? 0 : hashCode(this.j23_1)) | 0;
    return result;
  };
  protoOf(MapEntry).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof MapEntry))
      return false;
    var tmp0_other_with_cast = other instanceof MapEntry ? other : THROW_CCE();
    if (!equals(this.i23_1, tmp0_other_with_cast.i23_1))
      return false;
    if (!equals(this.j23_1, tmp0_other_with_cast.j23_1))
      return false;
    return true;
  };
  function MapEntrySerializer$descriptor$lambda($keySerializer, $valueSerializer) {
    return function ($this$buildSerialDescriptor) {
      $this$buildSerialDescriptor.a1l('key', $keySerializer.p1k());
      $this$buildSerialDescriptor.a1l('value', $valueSerializer.p1k());
      return Unit_instance;
    };
  }
  function MapEntrySerializer_0(keySerializer, valueSerializer) {
    KeyValueSerializer.call(this, keySerializer, valueSerializer);
    var tmp = this;
    var tmp_0 = MAP_getInstance();
    tmp.m23_1 = buildSerialDescriptor('kotlin.collections.Map.Entry', tmp_0, [], MapEntrySerializer$descriptor$lambda(keySerializer, valueSerializer));
  }
  protoOf(MapEntrySerializer_0).p1k = function () {
    return this.m23_1;
  };
  protoOf(MapEntrySerializer_0).n23 = function (_this__u8e3s4) {
    return _this__u8e3s4.v();
  };
  protoOf(MapEntrySerializer_0).o23 = function (_this__u8e3s4) {
    return this.n23((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, Entry) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(MapEntrySerializer_0).p23 = function (_this__u8e3s4) {
    return _this__u8e3s4.w();
  };
  protoOf(MapEntrySerializer_0).q23 = function (_this__u8e3s4) {
    return this.p23((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, Entry) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(MapEntrySerializer_0).r23 = function (key, value) {
    return new MapEntry(key, value);
  };
  function PairSerializer$descriptor$lambda($keySerializer, $valueSerializer) {
    return function ($this$buildClassSerialDescriptor) {
      $this$buildClassSerialDescriptor.a1l('first', $keySerializer.p1k());
      $this$buildClassSerialDescriptor.a1l('second', $valueSerializer.p1k());
      return Unit_instance;
    };
  }
  function PairSerializer_0(keySerializer, valueSerializer) {
    KeyValueSerializer.call(this, keySerializer, valueSerializer);
    var tmp = this;
    tmp.x23_1 = buildClassSerialDescriptor('kotlin.Pair', [], PairSerializer$descriptor$lambda(keySerializer, valueSerializer));
  }
  protoOf(PairSerializer_0).p1k = function () {
    return this.x23_1;
  };
  protoOf(PairSerializer_0).y23 = function (_this__u8e3s4) {
    return _this__u8e3s4.pg_1;
  };
  protoOf(PairSerializer_0).o23 = function (_this__u8e3s4) {
    return this.y23(_this__u8e3s4 instanceof Pair ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(PairSerializer_0).z23 = function (_this__u8e3s4) {
    return _this__u8e3s4.qg_1;
  };
  protoOf(PairSerializer_0).q23 = function (_this__u8e3s4) {
    return this.z23(_this__u8e3s4 instanceof Pair ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(PairSerializer_0).r23 = function (key, value) {
    return to(key, value);
  };
  function decodeSequentially_1($this, composite) {
    var a = composite.d1o($this.d24_1, 0, $this.a24_1);
    var b = composite.d1o($this.d24_1, 1, $this.b24_1);
    var c = composite.d1o($this.d24_1, 2, $this.c24_1);
    composite.r1n($this.d24_1);
    return new Triple(a, b, c);
  }
  function decodeStructure($this, composite) {
    var a = get_NULL();
    var b = get_NULL();
    var c = get_NULL();
    mainLoop: while (true) {
      var index = composite.h1o($this.d24_1);
      switch (index) {
        case -1:
          break mainLoop;
        case 0:
          a = composite.d1o($this.d24_1, 0, $this.a24_1);
          break;
        case 1:
          b = composite.d1o($this.d24_1, 1, $this.b24_1);
          break;
        case 2:
          c = composite.d1o($this.d24_1, 2, $this.c24_1);
          break;
        default:
          throw SerializationException_init_$Create$_0('Unexpected index ' + index);
      }
    }
    composite.r1n($this.d24_1);
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
      $this$buildClassSerialDescriptor.a1l('first', this$0.a24_1.p1k());
      $this$buildClassSerialDescriptor.a1l('second', this$0.b24_1.p1k());
      $this$buildClassSerialDescriptor.a1l('third', this$0.c24_1.p1k());
      return Unit_instance;
    };
  }
  function TripleSerializer_0(aSerializer, bSerializer, cSerializer) {
    this.a24_1 = aSerializer;
    this.b24_1 = bSerializer;
    this.c24_1 = cSerializer;
    var tmp = this;
    tmp.d24_1 = buildClassSerialDescriptor('kotlin.Triple', [], TripleSerializer$descriptor$lambda(this));
  }
  protoOf(TripleSerializer_0).p1k = function () {
    return this.d24_1;
  };
  protoOf(TripleSerializer_0).e24 = function (encoder, value) {
    var structuredEncoder = encoder.q1n(this.d24_1);
    structuredEncoder.h1p(this.d24_1, 0, this.a24_1, value.vl_1);
    structuredEncoder.h1p(this.d24_1, 1, this.b24_1, value.wl_1);
    structuredEncoder.h1p(this.d24_1, 2, this.c24_1, value.xl_1);
    structuredEncoder.r1n(this.d24_1);
  };
  protoOf(TripleSerializer_0).q1k = function (encoder, value) {
    return this.e24(encoder, value instanceof Triple ? value : THROW_CCE());
  };
  protoOf(TripleSerializer_0).r1k = function (decoder) {
    var composite = decoder.q1n(this.d24_1);
    if (composite.g1o()) {
      return decodeSequentially_1(this, composite);
    }
    return decodeStructure(this, composite);
  };
  function KeyValueSerializer(keySerializer, valueSerializer) {
    this.s23_1 = keySerializer;
    this.t23_1 = valueSerializer;
  }
  protoOf(KeyValueSerializer).u23 = function (encoder, value) {
    var structuredEncoder = encoder.q1n(this.p1k());
    structuredEncoder.h1p(this.p1k(), 0, this.s23_1, this.o23(value));
    structuredEncoder.h1p(this.p1k(), 1, this.t23_1, this.q23(value));
    structuredEncoder.r1n(this.p1k());
  };
  protoOf(KeyValueSerializer).q1k = function (encoder, value) {
    return this.u23(encoder, (value == null ? true : !(value == null)) ? value : THROW_CCE());
  };
  protoOf(KeyValueSerializer).r1k = function (decoder) {
    // Inline function 'kotlinx.serialization.encoding.decodeStructure' call
    var descriptor = this.p1k();
    var composite = decoder.q1n(descriptor);
    var tmp$ret$0;
    $l$block: {
      if (composite.g1o()) {
        var key = composite.d1o(this.p1k(), 0, this.s23_1);
        var value = composite.d1o(this.p1k(), 1, this.t23_1);
        tmp$ret$0 = this.r23(key, value);
        break $l$block;
      }
      var key_0 = get_NULL();
      var value_0 = get_NULL();
      mainLoop: while (true) {
        var idx = composite.h1o(this.p1k());
        switch (idx) {
          case -1:
            break mainLoop;
          case 0:
            key_0 = composite.d1o(this.p1k(), 0, this.s23_1);
            break;
          case 1:
            value_0 = composite.d1o(this.p1k(), 1, this.t23_1);
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
      tmp$ret$0 = this.r23(tmp, (value_0 == null ? true : !(value_0 == null)) ? value_0 : THROW_CCE());
    }
    var result = tmp$ret$0;
    composite.r1n(descriptor);
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
    this.f24_1 = InlinePrimitiveDescriptor('kotlin.ULong', serializer_4(Companion_getInstance_2()));
  }
  protoOf(ULongSerializer).p1k = function () {
    return this.f24_1;
  };
  protoOf(ULongSerializer).g24 = function (encoder, value) {
    var tmp = encoder.w1o(this.f24_1);
    // Inline function 'kotlin.ULong.toLong' call
    var tmp$ret$0 = _ULong___get_data__impl__fggpzb(value);
    tmp.q1o(tmp$ret$0);
  };
  protoOf(ULongSerializer).q1k = function (encoder, value) {
    return this.g24(encoder, value instanceof ULong ? value.gn_1 : THROW_CCE());
  };
  protoOf(ULongSerializer).h24 = function (decoder) {
    // Inline function 'kotlin.toULong' call
    var this_0 = decoder.n1n(this.f24_1).h1n();
    return _ULong___init__impl__c78o9k(this_0);
  };
  protoOf(ULongSerializer).r1k = function (decoder) {
    return new ULong(this.h24(decoder));
  };
  var ULongSerializer_instance;
  function ULongSerializer_getInstance() {
    if (ULongSerializer_instance == null)
      new ULongSerializer();
    return ULongSerializer_instance;
  }
  function UIntSerializer() {
    UIntSerializer_instance = this;
    this.i24_1 = InlinePrimitiveDescriptor('kotlin.UInt', serializer_6(IntCompanionObject_instance));
  }
  protoOf(UIntSerializer).p1k = function () {
    return this.i24_1;
  };
  protoOf(UIntSerializer).j24 = function (encoder, value) {
    var tmp = encoder.w1o(this.i24_1);
    // Inline function 'kotlin.UInt.toInt' call
    var tmp$ret$0 = _UInt___get_data__impl__f0vqqw(value);
    tmp.p1o(tmp$ret$0);
  };
  protoOf(UIntSerializer).q1k = function (encoder, value) {
    return this.j24(encoder, value instanceof UInt ? value.um_1 : THROW_CCE());
  };
  protoOf(UIntSerializer).k24 = function (decoder) {
    // Inline function 'kotlin.toUInt' call
    var this_0 = decoder.n1n(this.i24_1).g1n();
    return _UInt___init__impl__l7qpdl(this_0);
  };
  protoOf(UIntSerializer).r1k = function (decoder) {
    return new UInt(this.k24(decoder));
  };
  var UIntSerializer_instance;
  function UIntSerializer_getInstance() {
    if (UIntSerializer_instance == null)
      new UIntSerializer();
    return UIntSerializer_instance;
  }
  function UShortSerializer() {
    UShortSerializer_instance = this;
    this.l24_1 = InlinePrimitiveDescriptor('kotlin.UShort', serializer_8(ShortCompanionObject_instance));
  }
  protoOf(UShortSerializer).p1k = function () {
    return this.l24_1;
  };
  protoOf(UShortSerializer).m24 = function (encoder, value) {
    var tmp = encoder.w1o(this.l24_1);
    // Inline function 'kotlin.UShort.toShort' call
    var tmp$ret$0 = _UShort___get_data__impl__g0245(value);
    tmp.o1o(tmp$ret$0);
  };
  protoOf(UShortSerializer).q1k = function (encoder, value) {
    return this.m24(encoder, value instanceof UShort ? value.sn_1 : THROW_CCE());
  };
  protoOf(UShortSerializer).n24 = function (decoder) {
    // Inline function 'kotlin.toUShort' call
    var this_0 = decoder.n1n(this.l24_1).f1n();
    return _UShort___init__impl__jigrne(this_0);
  };
  protoOf(UShortSerializer).r1k = function (decoder) {
    return new UShort(this.n24(decoder));
  };
  var UShortSerializer_instance;
  function UShortSerializer_getInstance() {
    if (UShortSerializer_instance == null)
      new UShortSerializer();
    return UShortSerializer_instance;
  }
  function UByteSerializer() {
    UByteSerializer_instance = this;
    this.o24_1 = InlinePrimitiveDescriptor('kotlin.UByte', serializer_10(ByteCompanionObject_instance));
  }
  protoOf(UByteSerializer).p1k = function () {
    return this.o24_1;
  };
  protoOf(UByteSerializer).p24 = function (encoder, value) {
    var tmp = encoder.w1o(this.o24_1);
    // Inline function 'kotlin.UByte.toByte' call
    var tmp$ret$0 = _UByte___get_data__impl__jof9qr(value);
    tmp.n1o(tmp$ret$0);
  };
  protoOf(UByteSerializer).q1k = function (encoder, value) {
    return this.p24(encoder, value instanceof UByte ? value.im_1 : THROW_CCE());
  };
  protoOf(UByteSerializer).q24 = function (decoder) {
    // Inline function 'kotlin.toUByte' call
    var this_0 = decoder.n1n(this.o24_1).e1n();
    return _UByte___init__impl__g9hnc4(this_0);
  };
  protoOf(UByteSerializer).r1k = function (decoder) {
    return new UByte(this.q24(decoder));
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
  protoOf(SerializersModule).l1l = function (kClass, typeArgumentsSerializers, $super) {
    typeArgumentsSerializers = typeArgumentsSerializers === VOID ? emptyList() : typeArgumentsSerializers;
    return $super === VOID ? this.m1l(kClass, typeArgumentsSerializers) : $super.m1l.call(this, kClass, typeArgumentsSerializers);
  };
  function SerialModuleImpl(class2ContextualFactory, polyBase2Serializers, polyBase2DefaultSerializerProvider, polyBase2NamedSerializers, polyBase2DefaultDeserializerProvider, hasInterfaceContextualSerializers) {
    SerializersModule.call(this);
    this.s24_1 = class2ContextualFactory;
    this.t24_1 = polyBase2Serializers;
    this.u24_1 = polyBase2DefaultSerializerProvider;
    this.v24_1 = polyBase2NamedSerializers;
    this.w24_1 = polyBase2DefaultDeserializerProvider;
    this.x24_1 = hasInterfaceContextualSerializers;
  }
  protoOf(SerialModuleImpl).k1l = function () {
    return this.x24_1;
  };
  protoOf(SerialModuleImpl).p1p = function (baseClass, value) {
    if (!baseClass.va(value))
      return null;
    var tmp0_safe_receiver = this.t24_1.e2(baseClass);
    var tmp = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.e2(getKClassFromExpression(value));
    var registered = (!(tmp == null) ? isInterface(tmp, SerializationStrategy) : false) ? tmp : null;
    if (!(registered == null))
      return registered;
    var tmp_0 = this.u24_1.e2(baseClass);
    var tmp1_safe_receiver = (!(tmp_0 == null) ? typeof tmp_0 === 'function' : false) ? tmp_0 : null;
    return tmp1_safe_receiver == null ? null : tmp1_safe_receiver(value);
  };
  protoOf(SerialModuleImpl).o1p = function (baseClass, serializedClassName) {
    var tmp0_safe_receiver = this.v24_1.e2(baseClass);
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.collections.get' call
      tmp = (isInterface(tmp0_safe_receiver, KtMap) ? tmp0_safe_receiver : THROW_CCE()).e2(serializedClassName);
    }
    var tmp_0 = tmp;
    var registered = (!(tmp_0 == null) ? isInterface(tmp_0, KSerializer) : false) ? tmp_0 : null;
    if (!(registered == null))
      return registered;
    var tmp_1 = this.w24_1.e2(baseClass);
    var tmp1_safe_receiver = (!(tmp_1 == null) ? typeof tmp_1 === 'function' : false) ? tmp_1 : null;
    return tmp1_safe_receiver == null ? null : tmp1_safe_receiver(serializedClassName);
  };
  protoOf(SerialModuleImpl).m1l = function (kClass, typeArgumentsSerializers) {
    var tmp0_safe_receiver = this.s24_1.e2(kClass);
    var tmp = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.y24(typeArgumentsSerializers);
    return (tmp == null ? true : isInterface(tmp, KSerializer)) ? tmp : null;
  };
  protoOf(SerialModuleImpl).r24 = function (collector) {
    // Inline function 'kotlin.collections.forEach' call
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s = this.s24_1.u().g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      // Inline function 'kotlin.collections.component1' call
      var kclass = element.v();
      // Inline function 'kotlin.collections.component2' call
      var serial = element.w();
      if (serial instanceof Argless) {
        var tmp = isInterface(kclass, KClass) ? kclass : THROW_CCE();
        var tmp_0 = serial.b25_1;
        collector.c25(tmp, isInterface(tmp_0, KSerializer) ? tmp_0 : THROW_CCE());
      } else {
        if (serial instanceof WithTypeArguments) {
          collector.a25(kclass, serial.z24_1);
        } else {
          noWhenBranchMatchedException();
        }
      }
    }
    // Inline function 'kotlin.collections.forEach' call
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s_0 = this.t24_1.u().g();
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
        collector.d25(tmp_1, tmp_2, tmp$ret$11);
      }
    }
    // Inline function 'kotlin.collections.forEach' call
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s_2 = this.u24_1.u().g();
    while (_iterator__ex2g4s_2.h()) {
      var element_2 = _iterator__ex2g4s_2.i();
      // Inline function 'kotlin.collections.component1' call
      var baseClass_0 = element_2.v();
      // Inline function 'kotlin.collections.component2' call
      var provider = element_2.w();
      var tmp_3 = isInterface(baseClass_0, KClass) ? baseClass_0 : THROW_CCE();
      collector.e25(tmp_3, typeof provider === 'function' ? provider : THROW_CCE());
    }
    // Inline function 'kotlin.collections.forEach' call
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s_3 = this.w24_1.u().g();
    while (_iterator__ex2g4s_3.h()) {
      var element_3 = _iterator__ex2g4s_3.i();
      // Inline function 'kotlin.collections.component1' call
      var baseClass_1 = element_3.v();
      // Inline function 'kotlin.collections.component2' call
      var provider_0 = element_3.w();
      var tmp_4 = isInterface(baseClass_1, KClass) ? baseClass_1 : THROW_CCE();
      collector.f25(tmp_4, typeof provider_0 === 'function' ? provider_0 : THROW_CCE());
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
    this.g25_1 = serializer;
  }
  protoOf(SerializableWith).equals = function (other) {
    if (!(other instanceof SerializableWith))
      return false;
    var tmp0_other_with_cast = other instanceof SerializableWith ? other : THROW_CCE();
    if (!this.g25_1.equals(tmp0_other_with_cast.g25_1))
      return false;
    return true;
  };
  protoOf(SerializableWith).hashCode = function () {
    return imul(getStringHashCode('serializer'), 127) ^ this.g25_1.hashCode();
  };
  protoOf(SerializableWith).toString = function () {
    return '@kotlinx.serialization.SerializableWith(' + 'serializer=' + toString(this.g25_1) + ')';
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
    return mapOf([to(PrimitiveClasses_getInstance().ac(), serializer_0(StringCompanionObject_instance)), to(getKClass(Char), serializer_1(Companion_getInstance_1())), to(PrimitiveClasses_getInstance().dc(), CharArraySerializer()), to(PrimitiveClasses_getInstance().yb(), serializer_2(DoubleCompanionObject_instance)), to(PrimitiveClasses_getInstance().jc(), DoubleArraySerializer()), to(PrimitiveClasses_getInstance().xb(), serializer_3(FloatCompanionObject_instance)), to(PrimitiveClasses_getInstance().ic(), FloatArraySerializer()), to(getKClass(Long), serializer_4(Companion_getInstance_2())), to(PrimitiveClasses_getInstance().hc(), LongArraySerializer()), to(getKClass(ULong), serializer_5(Companion_getInstance_3())), to(getKClass(ULongArray), ULongArraySerializer()), to(PrimitiveClasses_getInstance().wb(), serializer_6(IntCompanionObject_instance)), to(PrimitiveClasses_getInstance().gc(), IntArraySerializer()), to(getKClass(UInt), serializer_7(Companion_getInstance_4())), to(getKClass(UIntArray), UIntArraySerializer()), to(PrimitiveClasses_getInstance().vb(), serializer_8(ShortCompanionObject_instance)), to(PrimitiveClasses_getInstance().fc(), ShortArraySerializer()), to(getKClass(UShort), serializer_9(Companion_getInstance_5())), to(getKClass(UShortArray), UShortArraySerializer()), to(PrimitiveClasses_getInstance().ub(), serializer_10(ByteCompanionObject_instance)), to(PrimitiveClasses_getInstance().ec(), ByteArraySerializer()), to(getKClass(UByte), serializer_11(Companion_getInstance_6())), to(getKClass(UByteArray), UByteArraySerializer()), to(PrimitiveClasses_getInstance().tb(), serializer_12(BooleanCompanionObject_instance)), to(PrimitiveClasses_getInstance().cc(), BooleanArraySerializer()), to(getKClass(Unit), serializer_13(Unit_instance)), to(PrimitiveClasses_getInstance().sb(), NothingSerializer()), to(getKClass(Duration), serializer_14(Companion_getInstance())), to(getKClass(Uuid), serializer_15(Companion_getInstance_0()))]);
  }
  function get_isInterface(_this__u8e3s4) {
    if (_this__u8e3s4 === PrimitiveClasses_getInstance().sb())
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
      if (_this__u8e3s4 === PrimitiveClasses_getInstance().sb()) {
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
    return rootClass.equals(PrimitiveClasses_getInstance().zb());
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
          var tmp_1 = assocObject.g1w(args.slice());
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
    this.h25_1 = $factory;
  }
  protoOf(createCache$1).n1l = function (key) {
    return this.h25_1(key);
  };
  function createParametrizedCache$1($factory) {
    this.i25_1 = $factory;
  }
  protoOf(createParametrizedCache$1).o1l = function (key, types) {
    // Inline function 'kotlin.runCatching' call
    var tmp;
    try {
      // Inline function 'kotlin.Companion.success' call
      var value = this.i25_1(key, types);
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
  protoOf(SerialDescriptorImpl).p1l = get_isNullable;
  protoOf(SerialDescriptorImpl).v1l = get_isInline;
  protoOf(AbstractDecoder).d1o = decodeSerializableElement$default;
  protoOf(AbstractDecoder).p1n = decodeSerializableValue;
  protoOf(AbstractDecoder).g1o = decodeSequentially;
  protoOf(AbstractDecoder).i1o = decodeCollectionSize;
  protoOf(AbstractEncoder).l1p = encodeNotNullMark;
  protoOf(AbstractEncoder).m1p = beginCollection;
  protoOf(AbstractEncoder).i1p = encodeSerializableValue;
  protoOf(AbstractEncoder).k1p = encodeNullableSerializableValue;
  protoOf(AbstractEncoder).n1p = shouldEncodeElementDefault;
  protoOf(ListLikeDescriptor).p1l = get_isNullable;
  protoOf(ListLikeDescriptor).v1l = get_isInline;
  protoOf(ListLikeDescriptor).x1l = get_annotations;
  protoOf(MapLikeDescriptor).p1l = get_isNullable;
  protoOf(MapLikeDescriptor).v1l = get_isInline;
  protoOf(MapLikeDescriptor).x1l = get_annotations;
  protoOf(PluginGeneratedSerialDescriptor).p1l = get_isNullable;
  protoOf(PluginGeneratedSerialDescriptor).v1l = get_isInline;
  protoOf(InlinePrimitiveDescriptor$1).w1v = typeParametersSerializers;
  protoOf(NothingSerialDescriptor).p1l = get_isNullable;
  protoOf(NothingSerialDescriptor).v1l = get_isInline;
  protoOf(NothingSerialDescriptor).x1l = get_annotations;
  protoOf(PrimitiveSerialDescriptor_0).p1l = get_isNullable;
  protoOf(PrimitiveSerialDescriptor_0).v1l = get_isInline;
  protoOf(PrimitiveSerialDescriptor_0).x1l = get_annotations;
  protoOf(TaggedEncoder).m1p = beginCollection;
  protoOf(TaggedEncoder).i1p = encodeSerializableValue;
  protoOf(TaggedEncoder).k1p = encodeNullableSerializableValue;
  protoOf(TaggedEncoder).n1p = shouldEncodeElementDefault;
  protoOf(TaggedDecoder).d1o = decodeSerializableElement$default;
  protoOf(TaggedDecoder).p1n = decodeSerializableValue;
  protoOf(TaggedDecoder).g1o = decodeSequentially;
  protoOf(TaggedDecoder).i1o = decodeCollectionSize;
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
