(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', '@js-joda/core', './kotlin-kotlin-stdlib.js', './kotlinx-serialization-kotlinx-serialization-core.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('@js-joda/core'), require('./kotlin-kotlin-stdlib.js'), require('./kotlinx-serialization-kotlinx-serialization-core.js'));
  else {
    if (typeof globalThis['@js-joda/core'] === 'undefined') {
      throw new Error("Error loading module 'Kotlin-DateTime-library-kotlinx-datetime'. Its dependency '@js-joda/core' was not found. Please, check whether '@js-joda/core' is loaded prior to 'Kotlin-DateTime-library-kotlinx-datetime'.");
    }
    if (typeof globalThis['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'Kotlin-DateTime-library-kotlinx-datetime'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'Kotlin-DateTime-library-kotlinx-datetime'.");
    }
    if (typeof globalThis['kotlinx-serialization-kotlinx-serialization-core'] === 'undefined') {
      throw new Error("Error loading module 'Kotlin-DateTime-library-kotlinx-datetime'. Its dependency 'kotlinx-serialization-kotlinx-serialization-core' was not found. Please, check whether 'kotlinx-serialization-kotlinx-serialization-core' is loaded prior to 'Kotlin-DateTime-library-kotlinx-datetime'.");
    }
    globalThis['Kotlin-DateTime-library-kotlinx-datetime'] = factory(typeof globalThis['Kotlin-DateTime-library-kotlinx-datetime'] === 'undefined' ? {} : globalThis['Kotlin-DateTime-library-kotlinx-datetime'], globalThis['@js-joda/core'], globalThis['kotlin-kotlin-stdlib'], globalThis['kotlinx-serialization-kotlinx-serialization-core']);
  }
}(function (_, $module$_js_joda_core_gcv2k, kotlin_kotlin, kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core) {
  'use strict';
  //region block: imports
  var imul = Math.imul;
  var Instant = $module$_js_joda_core_gcv2k.Instant;
  var Clock = $module$_js_joda_core_gcv2k.Clock;
  var LocalDate = $module$_js_joda_core_gcv2k.LocalDate;
  var LocalDateTime = $module$_js_joda_core_gcv2k.LocalDateTime;
  var LocalTime = $module$_js_joda_core_gcv2k.LocalTime;
  var ZoneOffset = $module$_js_joda_core_gcv2k.ZoneOffset;
  var ZoneId = $module$_js_joda_core_gcv2k.ZoneId;
  var ChronoField = $module$_js_joda_core_gcv2k.ChronoField;
  var DateTimeFormatterBuilder = $module$_js_joda_core_gcv2k.DateTimeFormatterBuilder;
  var ResolverStyle = $module$_js_joda_core_gcv2k.ResolverStyle;
  var protoOf = kotlin_kotlin.$_$.dc;
  var initMetadataForObject = kotlin_kotlin.$_$.fb;
  var VOID = kotlin_kotlin.$_$.h;
  var objectCreate = kotlin_kotlin.$_$.cc;
  var initMetadataForCompanion = kotlin_kotlin.$_$.ab;
  var Long = kotlin_kotlin.$_$.ig;
  var initMetadataForClass = kotlin_kotlin.$_$.za;
  var toString = kotlin_kotlin.$_$.w2;
  var toLong = kotlin_kotlin.$_$.fc;
  var numberRangeToNumber = kotlin_kotlin.$_$.xb;
  var THROW_CCE = kotlin_kotlin.$_$.ng;
  var ClosedRange = kotlin_kotlin.$_$.mc;
  var isInterface = kotlin_kotlin.$_$.ob;
  var contains = kotlin_kotlin.$_$.tc;
  var charSequenceGet = kotlin_kotlin.$_$.na;
  var _Char___init__impl__6a9atx = kotlin_kotlin.$_$.p2;
  var Char__minus_impl_a2frrh = kotlin_kotlin.$_$.r2;
  var ArithmeticException = kotlin_kotlin.$_$.xf;
  var uppercaseChar = kotlin_kotlin.$_$.uf;
  var repeat = kotlin_kotlin.$_$.le;
  var toInt = kotlin_kotlin.$_$.df;
  var StringBuilder_init_$Create$ = kotlin_kotlin.$_$.i1;
  var Unit_instance = kotlin_kotlin.$_$.g5;
  var abs = kotlin_kotlin.$_$.ic;
  var padStart = kotlin_kotlin.$_$.he;
  var IllegalArgumentException_init_$Create$ = kotlin_kotlin.$_$.v1;
  var toString_0 = kotlin_kotlin.$_$.hc;
  var IllegalArgumentException_init_$Init$ = kotlin_kotlin.$_$.s1;
  var captureStack = kotlin_kotlin.$_$.ka;
  var IllegalArgumentException_init_$Init$_0 = kotlin_kotlin.$_$.u1;
  var IllegalArgumentException_init_$Init$_1 = kotlin_kotlin.$_$.q1;
  var IllegalArgumentException_init_$Init$_2 = kotlin_kotlin.$_$.w1;
  var IllegalArgumentException = kotlin_kotlin.$_$.gg;
  var RuntimeException_init_$Init$ = kotlin_kotlin.$_$.h2;
  var RuntimeException_init_$Init$_0 = kotlin_kotlin.$_$.g2;
  var RuntimeException_init_$Init$_1 = kotlin_kotlin.$_$.k2;
  var RuntimeException = kotlin_kotlin.$_$.mg;
  var getStringHashCode = kotlin_kotlin.$_$.xa;
  var ensureNotNull = kotlin_kotlin.$_$.fh;
  var KMutableProperty1 = kotlin_kotlin.$_$.zc;
  var getPropertyCallableRef = kotlin_kotlin.$_$.wa;
  var KMutableProperty0 = kotlin_kotlin.$_$.yc;
  var Enum = kotlin_kotlin.$_$.dg;
  var initMetadataForInterface = kotlin_kotlin.$_$.db;
  var IllegalStateException_init_$Create$ = kotlin_kotlin.$_$.z1;
  var isArray = kotlin_kotlin.$_$.gb;
  var ArrayList_init_$Create$ = kotlin_kotlin.$_$.o;
  var hashCode = kotlin_kotlin.$_$.ya;
  var listOf = kotlin_kotlin.$_$.r7;
  var get_indices = kotlin_kotlin.$_$.h7;
  var charSequenceLength = kotlin_kotlin.$_$.oa;
  var joinToString = kotlin_kotlin.$_$.i7;
  var equals = kotlin_kotlin.$_$.sa;
  var getBooleanHashCode = kotlin_kotlin.$_$.ua;
  var KProperty0 = kotlin_kotlin.$_$.ad;
  var lazy = kotlin_kotlin.$_$.lh;
  var ArrayList_init_$Create$_0 = kotlin_kotlin.$_$.p;
  var getOrNull = kotlin_kotlin.$_$.c7;
  var listOf_0 = kotlin_kotlin.$_$.q7;
  var emptyList = kotlin_kotlin.$_$.u6;
  var toString_1 = kotlin_kotlin.$_$.qh;
  var get_lastIndex = kotlin_kotlin.$_$.be;
  var toSet = kotlin_kotlin.$_$.e9;
  var collectionSizeOrDefault = kotlin_kotlin.$_$.c6;
  var distinct = kotlin_kotlin.$_$.r6;
  var to = kotlin_kotlin.$_$.rh;
  var single = kotlin_kotlin.$_$.n8;
  var Collection = kotlin_kotlin.$_$.i5;
  var charSequenceSubSequence = kotlin_kotlin.$_$.pa;
  var mutableListOf = kotlin_kotlin.$_$.w7;
  var removeLastOrNull = kotlin_kotlin.$_$.h8;
  var sortWith = kotlin_kotlin.$_$.o8;
  var FunctionAdapter = kotlin_kotlin.$_$.ga;
  var Comparator = kotlin_kotlin.$_$.ag;
  var compareValues = kotlin_kotlin.$_$.k9;
  var Exception = kotlin_kotlin.$_$.fg;
  var Exception_init_$Init$ = kotlin_kotlin.$_$.n1;
  var StringBuilder_init_$Create$_0 = kotlin_kotlin.$_$.h1;
  var joinTo = kotlin_kotlin.$_$.j7;
  var plus = kotlin_kotlin.$_$.d8;
  var toMutableList = kotlin_kotlin.$_$.c9;
  var addAll = kotlin_kotlin.$_$.u5;
  var firstOrNull = kotlin_kotlin.$_$.y6;
  var drop = kotlin_kotlin.$_$.t6;
  var sortedWith = kotlin_kotlin.$_$.q8;
  var binarySearch = kotlin_kotlin.$_$.z5;
  var startsWith = kotlin_kotlin.$_$.ue;
  var checkCountOverflow = kotlin_kotlin.$_$.a6;
  var compareTo = kotlin_kotlin.$_$.qa;
  var removePrefix = kotlin_kotlin.$_$.ie;
  var UnsupportedOperationException_init_$Create$ = kotlin_kotlin.$_$.n2;
  var Comparable = kotlin_kotlin.$_$.zf;
  var STRING_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.f;
  var PrimitiveSerialDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.c1;
  var SerializationException_init_$Create$ = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.c;
  var KSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.l2;
  var buildClassSerialDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.i1;
  var getKClass = kotlin_kotlin.$_$.f;
  var arrayOf = kotlin_kotlin.$_$.bh;
  var createKType = kotlin_kotlin.$_$.c;
  var serializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.s2;
  var LazyThreadSafetyMode_PUBLICATION_getInstance = kotlin_kotlin.$_$.l;
  var lazy_0 = kotlin_kotlin.$_$.kh;
  var MissingFieldException_init_$Create$ = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.a;
  var SealedClassSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.n2;
  var AbstractPolymorphicSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.r1;
  var PrimitiveClasses_getInstance = kotlin_kotlin.$_$.v4;
  var KProperty1 = kotlin_kotlin.$_$.bd;
  var enumEntries = kotlin_kotlin.$_$.ea;
  var numberToLong = kotlin_kotlin.$_$.bc;
  var numberToInt = kotlin_kotlin.$_$.ac;
  var IllegalArgumentException_init_$Create$_0 = kotlin_kotlin.$_$.r1;
  var noWhenBranchMatchedException = kotlin_kotlin.$_$.mh;
  var numberToDouble = kotlin_kotlin.$_$.zb;
  var ArithmeticException_init_$Create$ = kotlin_kotlin.$_$.j1;
  //endregion
  //region block: pre-declaration
  initMetadataForObject(System, 'System');
  initMetadataForCompanion(Companion);
  initMetadataForClass(DateTimePeriod, 'DateTimePeriod', VOID, VOID, VOID, VOID, VOID, {0: DateTimePeriodIso8601Serializer_getInstance});
  initMetadataForClass(DatePeriod, 'DatePeriod', DatePeriod_init_$Create$, DateTimePeriod, VOID, VOID, VOID, {0: DatePeriodIso8601Serializer_getInstance});
  initMetadataForCompanion(Companion_0);
  initMetadataForClass(DateTimePeriodImpl, 'DateTimePeriodImpl', VOID, DateTimePeriod);
  initMetadataForCompanion(Companion_1);
  initMetadataForCompanion(Companion_2);
  initMetadataForCompanion(Companion_3);
  initMetadataForCompanion(Companion_4);
  initMetadataForClass(DateTimeUnit, 'DateTimeUnit', VOID, VOID, VOID, VOID, VOID, {0: DateTimeUnitSerializer_getInstance});
  initMetadataForClass(TimeBased, 'TimeBased', VOID, DateTimeUnit, VOID, VOID, VOID, {0: TimeBasedDateTimeUnitSerializer_getInstance});
  initMetadataForClass(DateBased, 'DateBased', VOID, DateTimeUnit, VOID, VOID, VOID, {0: DateBasedDateTimeUnitSerializer_getInstance});
  initMetadataForClass(DayBased, 'DayBased', VOID, DateBased, VOID, VOID, VOID, {0: DayBasedDateTimeUnitSerializer_getInstance});
  initMetadataForClass(MonthBased, 'MonthBased', VOID, DateBased, VOID, VOID, VOID, {0: MonthBasedDateTimeUnitSerializer_getInstance});
  initMetadataForCompanion(Companion_5);
  initMetadataForClass(DateTimeFormatException, 'DateTimeFormatException', DateTimeFormatException_init_$Create$, IllegalArgumentException);
  initMetadataForClass(DateTimeArithmeticException, 'DateTimeArithmeticException', DateTimeArithmeticException_init_$Create$, RuntimeException);
  initMetadataForClass(IllegalTimeZoneException, 'IllegalTimeZoneException', IllegalTimeZoneException_init_$Create$, IllegalArgumentException);
  function set_fractionOfSecond(value) {
    this.i4a(value == null ? null : value.l4g(9));
  }
  function get_fractionOfSecond() {
    var tmp0_safe_receiver = this.j4a();
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      tmp = new DecimalFraction(tmp0_safe_receiver, 9);
    }
    return tmp;
  }
  initMetadataForInterface(TimeFieldContainer, 'TimeFieldContainer');
  initMetadataForInterface(UtcOffsetFieldContainer, 'UtcOffsetFieldContainer');
  initMetadataForClass(DateTimeComponentsContents, 'DateTimeComponentsContents', VOID, VOID, [TimeFieldContainer, UtcOffsetFieldContainer]);
  initMetadataForCompanion(Companion_6);
  initMetadataForObject(Formats, 'Formats');
  initMetadataForClass(DateTimeComponents, 'DateTimeComponents');
  function appendAlternativeParsingImpl(otherFormats, mainFormat) {
    // Inline function 'kotlin.collections.map' call
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$(otherFormats.length);
    var inductionVariable = 0;
    var last = otherFormats.length;
    while (inductionVariable < last) {
      var item = otherFormats[inductionVariable];
      inductionVariable = inductionVariable + 1 | 0;
      // Inline function 'kotlin.also' call
      var this_0 = this.a4d();
      item(this_0);
      var tmp$ret$2 = this_0.v4c().p2d();
      destination.e(tmp$ret$2);
    }
    var others = destination;
    // Inline function 'kotlin.also' call
    var this_1 = this.a4d();
    mainFormat(this_1);
    var main = this_1.v4c().p2d();
    this.v4c().y4c(new AlternativesParsingFormatStructure(main, others));
  }
  function appendOptionalImpl(onZero, format) {
    var tmp = this.v4c();
    // Inline function 'kotlin.also' call
    var this_0 = this.a4d();
    format(this_0);
    tmp.y4c(new OptionalFormatStructure(onZero, this_0.v4c().p2d()));
  }
  function chars(value) {
    return this.v4c().y4c(new ConstantFormatStructure(value));
  }
  function build() {
    return new CachedFormatStructure(this.v4c().p2d().d4e_1);
  }
  initMetadataForInterface(AbstractDateTimeFormatBuilder, 'AbstractDateTimeFormatBuilder');
  function year$default(padding, $super) {
    padding = padding === VOID ? Padding_ZERO_getInstance() : padding;
    var tmp;
    if ($super === VOID) {
      this.f4d(padding);
      tmp = Unit_instance;
    } else {
      tmp = $super.f4d.call(this, padding);
    }
    return tmp;
  }
  function monthNumber$default(padding, $super) {
    padding = padding === VOID ? Padding_ZERO_getInstance() : padding;
    var tmp;
    if ($super === VOID) {
      this.g4d(padding);
      tmp = Unit_instance;
    } else {
      tmp = $super.g4d.call(this, padding);
    }
    return tmp;
  }
  function dayOfMonth$default(padding, $super) {
    padding = padding === VOID ? Padding_ZERO_getInstance() : padding;
    var tmp;
    if ($super === VOID) {
      this.g4b(padding);
      tmp = Unit_instance;
    } else {
      tmp = $super.g4b.call(this, padding);
    }
    return tmp;
  }
  initMetadataForInterface(WithDate, 'WithDate');
  function year(padding) {
    return this.d4d(new BasicFormatStructure(new YearDirective(padding)));
  }
  function monthNumber(padding) {
    return this.d4d(new BasicFormatStructure(new MonthDirective(padding)));
  }
  function monthName(names) {
    return this.d4d(new BasicFormatStructure(new MonthNameDirective(names)));
  }
  function dayOfMonth(padding) {
    return this.d4d(new BasicFormatStructure(new DayDirective(padding)));
  }
  function dayOfWeek(names) {
    return this.d4d(new BasicFormatStructure(new DayOfWeekDirective(names)));
  }
  function date(format) {
    var tmp;
    if (format instanceof LocalDateFormat) {
      this.d4d(format.j4e_1);
      tmp = Unit_instance;
    }
    return tmp;
  }
  initMetadataForInterface(AbstractWithDateBuilder, 'AbstractWithDateBuilder', VOID, VOID, [WithDate]);
  function hour$default(padding, $super) {
    padding = padding === VOID ? Padding_ZERO_getInstance() : padding;
    var tmp;
    if ($super === VOID) {
      this.j4d(padding);
      tmp = Unit_instance;
    } else {
      tmp = $super.j4d.call(this, padding);
    }
    return tmp;
  }
  function minute$default(padding, $super) {
    padding = padding === VOID ? Padding_ZERO_getInstance() : padding;
    var tmp;
    if ($super === VOID) {
      this.k4d(padding);
      tmp = Unit_instance;
    } else {
      tmp = $super.k4d.call(this, padding);
    }
    return tmp;
  }
  function second$default(padding, $super) {
    padding = padding === VOID ? Padding_ZERO_getInstance() : padding;
    var tmp;
    if ($super === VOID) {
      this.l4d(padding);
      tmp = Unit_instance;
    } else {
      tmp = $super.l4d.call(this, padding);
    }
    return tmp;
  }
  initMetadataForInterface(WithTime, 'WithTime');
  function hour(padding) {
    return this.e4d(new BasicFormatStructure(new HourDirective(padding)));
  }
  function minute(padding) {
    return this.e4d(new BasicFormatStructure(new MinuteDirective(padding)));
  }
  function second(padding) {
    return this.e4d(new BasicFormatStructure(new SecondDirective(padding)));
  }
  function secondFraction(minLength, maxLength) {
    return this.e4d(new BasicFormatStructure(new FractionalSecondDirective(minLength, maxLength)));
  }
  function time(format) {
    var tmp;
    if (format instanceof LocalTimeFormat) {
      this.e4d(format.o4g_1);
      tmp = Unit_instance;
    }
    return tmp;
  }
  initMetadataForInterface(AbstractWithTimeBuilder, 'AbstractWithTimeBuilder', VOID, VOID, [WithTime]);
  function addFormatStructureForDate(structure) {
    this.w4c(structure);
  }
  function addFormatStructureForTime(structure) {
    this.w4c(structure);
  }
  initMetadataForInterface(AbstractWithDateTimeBuilder, 'AbstractWithDateTimeBuilder', VOID, VOID, [AbstractWithDateBuilder, AbstractWithTimeBuilder, WithDate, WithTime]);
  function offsetHours$default(padding, $super) {
    padding = padding === VOID ? Padding_ZERO_getInstance() : padding;
    var tmp;
    if ($super === VOID) {
      this.n4d(padding);
      tmp = Unit_instance;
    } else {
      tmp = $super.n4d.call(this, padding);
    }
    return tmp;
  }
  function offsetMinutesOfHour$default(padding, $super) {
    padding = padding === VOID ? Padding_ZERO_getInstance() : padding;
    var tmp;
    if ($super === VOID) {
      this.o4d(padding);
      tmp = Unit_instance;
    } else {
      tmp = $super.o4d.call(this, padding);
    }
    return tmp;
  }
  function offsetSecondsOfMinute$default(padding, $super) {
    padding = padding === VOID ? Padding_ZERO_getInstance() : padding;
    var tmp;
    if ($super === VOID) {
      this.q4d(padding);
      tmp = Unit_instance;
    } else {
      tmp = $super.q4d.call(this, padding);
    }
    return tmp;
  }
  initMetadataForInterface(WithUtcOffset, 'WithUtcOffset');
  function offsetHours(padding) {
    return this.z4c(new SignedFormatStructure(new BasicFormatStructure(new UtcOffsetWholeHoursDirective(padding)), true));
  }
  function offsetMinutesOfHour(padding) {
    return this.z4c(new BasicFormatStructure(new UtcOffsetMinuteOfHourDirective(padding)));
  }
  function offsetSecondsOfMinute(padding) {
    return this.z4c(new BasicFormatStructure(new UtcOffsetSecondOfMinuteDirective(padding)));
  }
  function offset(format) {
    var tmp;
    if (format instanceof UtcOffsetFormat) {
      this.z4c(format.i4i_1);
      tmp = Unit_instance;
    }
    return tmp;
  }
  initMetadataForInterface(AbstractWithOffsetBuilder, 'AbstractWithOffsetBuilder', VOID, VOID, [WithUtcOffset]);
  initMetadataForClass(Builder, 'Builder', VOID, VOID, [AbstractDateTimeFormatBuilder, AbstractWithDateTimeBuilder, AbstractWithOffsetBuilder, WithDate, WithTime, WithUtcOffset]);
  initMetadataForClass(AbstractDateTimeFormat, 'AbstractDateTimeFormat');
  initMetadataForClass(DateTimeComponentsFormat, 'DateTimeComponentsFormat', VOID, AbstractDateTimeFormat);
  initMetadataForClass(TwoDigitNumber, 'TwoDigitNumber');
  initMetadataForClass(Padding, 'Padding', VOID, Enum);
  initMetadataForClass(IncompleteLocalDate, 'IncompleteLocalDate', IncompleteLocalDate);
  initMetadataForCompanion(Companion_7);
  initMetadataForClass(MonthNames, 'MonthNames');
  initMetadataForCompanion(Companion_8);
  initMetadataForClass(DayOfWeekNames, 'DayOfWeekNames');
  initMetadataForCompanion(Companion_9);
  initMetadataForClass(Builder_0, 'Builder', VOID, VOID, [AbstractDateTimeFormatBuilder, AbstractWithDateBuilder]);
  initMetadataForClass(LocalDateFormat, 'LocalDateFormat', VOID, AbstractDateTimeFormat);
  initMetadataForClass(SignedIntFieldFormatDirective, 'SignedIntFieldFormatDirective');
  initMetadataForClass(YearDirective, 'YearDirective', VOID, SignedIntFieldFormatDirective);
  initMetadataForClass(UnsignedIntFieldFormatDirective, 'UnsignedIntFieldFormatDirective');
  initMetadataForClass(MonthDirective, 'MonthDirective', VOID, UnsignedIntFieldFormatDirective);
  initMetadataForClass(NamedUnsignedIntFieldFormatDirective, 'NamedUnsignedIntFieldFormatDirective');
  initMetadataForClass(MonthNameDirective, 'MonthNameDirective', VOID, NamedUnsignedIntFieldFormatDirective);
  initMetadataForClass(DayDirective, 'DayDirective', VOID, UnsignedIntFieldFormatDirective);
  initMetadataForClass(DayOfWeekDirective, 'DayOfWeekDirective', VOID, NamedUnsignedIntFieldFormatDirective);
  initMetadataForObject(DateFields, 'DateFields');
  initMetadataForCompanion(Companion_10);
  initMetadataForClass(Builder_1, 'Builder', VOID, VOID, [AbstractDateTimeFormatBuilder, AbstractWithDateTimeBuilder]);
  initMetadataForClass(LocalDateTimeFormat, 'LocalDateTimeFormat', VOID, AbstractDateTimeFormat);
  initMetadataForClass(IncompleteLocalDateTime, 'IncompleteLocalDateTime', IncompleteLocalDateTime, VOID, [TimeFieldContainer]);
  initMetadataForClass(IncompleteLocalTime, 'IncompleteLocalTime', IncompleteLocalTime, VOID, [TimeFieldContainer]);
  initMetadataForClass(AmPmMarker, 'AmPmMarker', VOID, Enum);
  initMetadataForCompanion(Companion_11);
  initMetadataForClass(Builder_2, 'Builder', VOID, VOID, [AbstractDateTimeFormatBuilder, AbstractWithTimeBuilder]);
  initMetadataForClass(LocalTimeFormat, 'LocalTimeFormat', VOID, AbstractDateTimeFormat);
  initMetadataForClass(HourDirective, 'HourDirective', VOID, UnsignedIntFieldFormatDirective);
  initMetadataForClass(MinuteDirective, 'MinuteDirective', VOID, UnsignedIntFieldFormatDirective);
  initMetadataForClass(SecondDirective, 'SecondDirective', VOID, UnsignedIntFieldFormatDirective);
  initMetadataForCompanion(Companion_12);
  initMetadataForClass(DecimalFractionFieldFormatDirective, 'DecimalFractionFieldFormatDirective');
  initMetadataForClass(FractionalSecondDirective, 'FractionalSecondDirective', VOID, DecimalFractionFieldFormatDirective);
  initMetadataForObject(TimeFields, 'TimeFields');
  initMetadataForClass(IncompleteUtcOffset, 'IncompleteUtcOffset', IncompleteUtcOffset, VOID, [UtcOffsetFieldContainer]);
  initMetadataForClass(UtcOffsetWholeHoursDirective, 'UtcOffsetWholeHoursDirective', VOID, UnsignedIntFieldFormatDirective);
  initMetadataForCompanion(Companion_13);
  initMetadataForClass(Builder_3, 'Builder', VOID, VOID, [AbstractDateTimeFormatBuilder, AbstractWithOffsetBuilder]);
  initMetadataForClass(UtcOffsetFormat, 'UtcOffsetFormat', VOID, AbstractDateTimeFormat);
  initMetadataForClass(OffsetFields$sign$1);
  initMetadataForObject(OffsetFields, 'OffsetFields');
  initMetadataForClass(UtcOffsetMinuteOfHourDirective, 'UtcOffsetMinuteOfHourDirective', VOID, UnsignedIntFieldFormatDirective);
  initMetadataForClass(UtcOffsetSecondOfMinuteDirective, 'UtcOffsetSecondOfMinuteDirective', VOID, UnsignedIntFieldFormatDirective);
  initMetadataForClass(AppendableFormatStructure, 'AppendableFormatStructure', AppendableFormatStructure);
  initMetadataForClass(AssignableString, 'AssignableString');
  initMetadataForClass(AbstractFieldSpec, 'AbstractFieldSpec');
  initMetadataForClass(GenericFieldSpec, 'GenericFieldSpec', VOID, AbstractFieldSpec);
  function getterNotNull(container) {
    var tmp0_elvis_lhs = this.s4j(container);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throw IllegalStateException_init_$Create$('Field ' + this.z4i() + ' is not set');
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  initMetadataForInterface(Accessor, 'Accessor');
  initMetadataForClass(PropertyAccessor, 'PropertyAccessor', VOID, VOID, [Accessor]);
  initMetadataForClass(UnsignedFieldSpec, 'UnsignedFieldSpec', VOID, AbstractFieldSpec);
  initMetadataForClass(ConcatenatedFormatStructure, 'ConcatenatedFormatStructure');
  initMetadataForClass(CachedFormatStructure, 'CachedFormatStructure', VOID, ConcatenatedFormatStructure);
  initMetadataForInterface(NonConcatenatedFormatStructure, 'NonConcatenatedFormatStructure');
  initMetadataForClass(BasicFormatStructure, 'BasicFormatStructure', VOID, VOID, [NonConcatenatedFormatStructure]);
  initMetadataForClass(ConstantFormatStructure, 'ConstantFormatStructure', VOID, VOID, [NonConcatenatedFormatStructure]);
  initMetadataForClass(SignedFormatStructure, 'SignedFormatStructure', VOID, VOID, [NonConcatenatedFormatStructure]);
  initMetadataForCompanion(Companion_14);
  initMetadataForClass(PropertyWithDefault, 'PropertyWithDefault');
  initMetadataForClass(OptionalFormatStructure, 'OptionalFormatStructure', VOID, VOID, [NonConcatenatedFormatStructure]);
  initMetadataForClass(AlternativesParsingFormatStructure, 'AlternativesParsingFormatStructure', VOID, VOID, [NonConcatenatedFormatStructure]);
  initMetadataForClass(ComparisonPredicate, 'ComparisonPredicate');
  initMetadataForObject(Truth, 'Truth');
  initMetadataForClass(ConjunctionPredicate, 'ConjunctionPredicate');
  initMetadataForClass(SpacePaddedFormatter, 'SpacePaddedFormatter');
  initMetadataForClass(SignedFormatter, 'SignedFormatter');
  initMetadataForClass(ConditionalFormatter, 'ConditionalFormatter');
  initMetadataForClass(ConcatenatedFormatter, 'ConcatenatedFormatter');
  initMetadataForClass(SignedIntFormatterStructure, 'SignedIntFormatterStructure');
  initMetadataForClass(UnsignedIntFormatterStructure, 'UnsignedIntFormatterStructure');
  initMetadataForClass(StringFormatterStructure, 'StringFormatterStructure');
  initMetadataForClass(DecimalFractionFormatterStructure, 'DecimalFractionFormatterStructure');
  initMetadataForClass(ConstantStringFormatterStructure, 'ConstantStringFormatterStructure');
  initMetadataForClass(NumberConsumer, 'NumberConsumer');
  initMetadataForClass(FractionPartConsumer, 'FractionPartConsumer', VOID, NumberConsumer);
  initMetadataForClass(ConstantNumberConsumer, 'ConstantNumberConsumer', VOID, NumberConsumer);
  initMetadataForObject(ExpectedInt, 'ExpectedInt');
  initMetadataForClass(TooManyDigits, 'TooManyDigits');
  initMetadataForClass(TooFewDigits, 'TooFewDigits');
  initMetadataForClass(WrongConstant, 'WrongConstant');
  initMetadataForClass(Conflicting, 'Conflicting');
  initMetadataForClass(UnsignedIntConsumer, 'UnsignedIntConsumer', VOID, NumberConsumer);
  initMetadataForClass(ParseError, 'ParseError');
  initMetadataForCompanion(Companion_15);
  initMetadataForClass(ParserState, 'ParserState');
  initMetadataForClass(sam$kotlin_Comparator$0, 'sam$kotlin_Comparator$0', VOID, VOID, [Comparator, FunctionAdapter]);
  initMetadataForClass(Parser, 'Parser');
  initMetadataForClass(ParserStructure, 'ParserStructure');
  initMetadataForClass(ParseException, 'ParseException', VOID, Exception);
  initMetadataForClass(TrieNode, 'TrieNode', TrieNode);
  initMetadataForClass(sam$kotlin_Comparator$0_0, 'sam$kotlin_Comparator$0', VOID, VOID, [Comparator, FunctionAdapter]);
  initMetadataForClass(StringSetParserOperation, 'StringSetParserOperation');
  initMetadataForClass(NumberSpanParserOperation, 'NumberSpanParserOperation');
  initMetadataForClass(PlainStringParserOperation, 'PlainStringParserOperation');
  initMetadataForClass(SignParser, 'SignParser');
  initMetadataForClass(UnconditionalModification, 'UnconditionalModification');
  initMetadataForClass(DecimalFraction, 'DecimalFraction', VOID, VOID, [Comparable]);
  initMetadataForObject(DatePeriodIso8601Serializer, 'DatePeriodIso8601Serializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(DateTimePeriodIso8601Serializer, 'DateTimePeriodIso8601Serializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(TimeBasedDateTimeUnitSerializer, 'TimeBasedDateTimeUnitSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(DateBasedDateTimeUnitSerializer, 'DateBasedDateTimeUnitSerializer', VOID, AbstractPolymorphicSerializer);
  initMetadataForObject(DayBasedDateTimeUnitSerializer, 'DayBasedDateTimeUnitSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(MonthBasedDateTimeUnitSerializer, 'MonthBasedDateTimeUnitSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(DateTimeUnitSerializer, 'DateTimeUnitSerializer', VOID, AbstractPolymorphicSerializer);
  initMetadataForObject(InstantIso8601Serializer, 'InstantIso8601Serializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(LocalDateIso8601Serializer, 'LocalDateIso8601Serializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(LocalDateTimeIso8601Serializer, 'LocalDateTimeIso8601Serializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(LocalTimeIso8601Serializer, 'LocalTimeIso8601Serializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(UtcOffsetSerializer, 'UtcOffsetSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(TimeZoneSerializer, 'TimeZoneSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(FixedOffsetTimeZoneSerializer, 'FixedOffsetTimeZoneSerializer', VOID, VOID, [KSerializer]);
  initMetadataForClass(DayOfWeek_0, 'DayOfWeek', VOID, Enum);
  initMetadataForCompanion(Companion_16);
  initMetadataForClass(Instant_0, 'Instant', VOID, VOID, [Comparable], VOID, VOID, {0: InstantIso8601Serializer_getInstance});
  initMetadataForCompanion(Companion_17);
  initMetadataForObject(Formats_0, 'Formats');
  initMetadataForClass(LocalDate_0, 'LocalDate', VOID, VOID, [Comparable], VOID, VOID, {0: LocalDateIso8601Serializer_getInstance});
  initMetadataForCompanion(Companion_18);
  initMetadataForObject(Formats_1, 'Formats');
  initMetadataForClass(LocalDateTime_0, 'LocalDateTime', VOID, VOID, [Comparable], VOID, VOID, {0: LocalDateTimeIso8601Serializer_getInstance});
  initMetadataForCompanion(Companion_19);
  initMetadataForObject(Formats_2, 'Formats');
  initMetadataForClass(LocalTime_0, 'LocalTime', VOID, VOID, [Comparable], VOID, VOID, {0: LocalTimeIso8601Serializer_getInstance});
  initMetadataForCompanion(Companion_20);
  initMetadataForClass(TimeZone, 'TimeZone', VOID, VOID, VOID, VOID, VOID, {0: TimeZoneSerializer_getInstance});
  initMetadataForCompanion(Companion_21);
  initMetadataForClass(FixedOffsetTimeZone, 'FixedOffsetTimeZone', VOID, TimeZone, VOID, VOID, VOID, {0: FixedOffsetTimeZoneSerializer_getInstance});
  initMetadataForCompanion(Companion_22);
  initMetadataForObject(Formats_3, 'Formats');
  initMetadataForClass(UtcOffset, 'UtcOffset', VOID, VOID, VOID, VOID, VOID, {0: UtcOffsetSerializer_getInstance});
  //endregion
  function System() {
  }
  protoOf(System).k47 = function () {
    return Companion_getInstance_16().k47();
  };
  var System_instance;
  function System_getInstance() {
    return System_instance;
  }
  function todayIn(_this__u8e3s4, timeZone) {
    return toLocalDateTime(_this__u8e3s4.k47(), timeZone).q47();
  }
  function DatePeriod_init_$Init$(years, months, days, $this) {
    years = years === VOID ? 0 : years;
    months = months === VOID ? 0 : months;
    days = days === VOID ? 0 : days;
    DatePeriod.call($this, totalMonths(years, months), days);
    return $this;
  }
  function DatePeriod_init_$Create$(years, months, days) {
    return DatePeriod_init_$Init$(years, months, days, objectCreate(protoOf(DatePeriod)));
  }
  function Companion() {
  }
  var Companion_instance;
  function Companion_getInstance() {
    return Companion_instance;
  }
  function DatePeriod(totalMonths, days) {
    DateTimePeriod.call(this);
    this.r47_1 = totalMonths;
    this.s47_1 = days;
  }
  protoOf(DatePeriod).t47 = function () {
    return this.r47_1;
  };
  protoOf(DatePeriod).u47 = function () {
    return this.s47_1;
  };
  protoOf(DatePeriod).v47 = function () {
    return 0;
  };
  protoOf(DatePeriod).w47 = function () {
    return 0;
  };
  protoOf(DatePeriod).x47 = function () {
    return 0;
  };
  protoOf(DatePeriod).y47 = function () {
    return 0;
  };
  protoOf(DatePeriod).z47 = function () {
    return new Long(0, 0);
  };
  function parse$parseException(message, position) {
    throw DateTimeFormatException_init_$Create$_0('Parse error at char ' + position + ': ' + message);
  }
  function parse$toIntThrowing(_this__u8e3s4, iStart, component) {
    if (_this__u8e3s4.b1(new Long(-2147483648, -1)) < 0 || _this__u8e3s4.b1(new Long(2147483647, 0)) > 0) {
      parse$parseException('Value ' + _this__u8e3s4.toString() + " does not fit into an Int, which is required for component '" + toString(component) + "'", iStart);
    }
    return _this__u8e3s4.g1();
  }
  function allNonpositive($this) {
    return $this.t47() <= 0 && $this.u47() <= 0 && $this.z47().b1(new Long(0, 0)) <= 0 && (!(($this.t47() | $this.u47()) === 0) || !$this.z47().equals(new Long(0, 0)));
  }
  function Companion_0() {
  }
  protoOf(Companion_0).fm = function (text) {
    var START = 0;
    var AFTER_P = 1;
    var AFTER_YEAR = 2;
    var AFTER_MONTH = 3;
    var AFTER_WEEK = 4;
    var AFTER_DAY = 5;
    var AFTER_T = 6;
    var AFTER_HOUR = 7;
    var AFTER_MINUTE = 8;
    var AFTER_SECOND_AND_NANO = 9;
    var state = START;
    var i = 0;
    var sign = 1;
    var years = 0;
    var months = 0;
    var weeks = 0;
    var days = 0;
    var hours = 0;
    var minutes = 0;
    var seconds = 0;
    var nanoseconds = 0;
    $l$loop_0: while (true) {
      if (i >= text.length) {
        if (state === START) {
          parse$parseException("Unexpected end of input; 'P' designator is required", i);
        }
        if (state === AFTER_T) {
          parse$parseException("Unexpected end of input; at least one time component is required after 'T'", i);
        }
        var tmp0 = toLong(days);
        // Inline function 'kotlin.Long.plus' call
        var other = imul(weeks, 7);
        var n = tmp0.u2(toLong(other));
        var tmp;
        // Inline function 'kotlin.ranges.contains' call
        var this_0 = numberRangeToNumber(-2147483648, 2147483647);
        if (contains(isInterface(this_0, ClosedRange) ? this_0 : THROW_CCE(), n)) {
          tmp = n.g1();
        } else {
          parse$parseException("The total number of days under 'D' and 'W' designators should fit into an Int", 0);
        }
        var daysTotal = tmp;
        return DateTimePeriod_0(years, months, daysTotal, hours, minutes, seconds, toLong(nanoseconds));
      }
      if (state === START) {
        if ((i + 1 | 0) >= text.length && (charSequenceGet(text, i) === _Char___init__impl__6a9atx(43) || charSequenceGet(text, i) === _Char___init__impl__6a9atx(45))) {
          parse$parseException("Unexpected end of string; 'P' designator is required", i);
        }
        var tmp0_subject = charSequenceGet(text, i);
        if (tmp0_subject === _Char___init__impl__6a9atx(43) ? true : tmp0_subject === _Char___init__impl__6a9atx(45)) {
          if (charSequenceGet(text, i) === _Char___init__impl__6a9atx(45))
            sign = -1;
          if (!(charSequenceGet(text, i + 1 | 0) === _Char___init__impl__6a9atx(80))) {
            parse$parseException("Expected 'P', got '" + toString(charSequenceGet(text, i + 1 | 0)) + "'", i + 1 | 0);
          }
          i = i + 2 | 0;
        } else if (tmp0_subject === _Char___init__impl__6a9atx(80)) {
          i = i + 1 | 0;
        } else {
          parse$parseException("Expected '+', '-', 'P', got '" + toString(charSequenceGet(text, i)) + "'", i);
        }
        state = AFTER_P;
        continue $l$loop_0;
      }
      var localSign = sign;
      var iStart = i;
      var tmp1_subject = charSequenceGet(text, i);
      if (tmp1_subject === _Char___init__impl__6a9atx(43) ? true : tmp1_subject === _Char___init__impl__6a9atx(45)) {
        if (charSequenceGet(text, i) === _Char___init__impl__6a9atx(45))
          localSign = imul(localSign, -1);
        i = i + 1 | 0;
        var tmp_0;
        if (i >= text.length) {
          tmp_0 = true;
        } else {
          var containsArg = charSequenceGet(text, i);
          tmp_0 = !(_Char___init__impl__6a9atx(48) <= containsArg ? containsArg <= _Char___init__impl__6a9atx(57) : false);
        }
        if (tmp_0) {
          parse$parseException("A number expected after '" + toString(charSequenceGet(text, i)) + "'", i);
        }
      } else if (!(_Char___init__impl__6a9atx(48) <= tmp1_subject ? tmp1_subject <= _Char___init__impl__6a9atx(57) : false))
        if (tmp1_subject === _Char___init__impl__6a9atx(84)) {
          if (state >= AFTER_T) {
            parse$parseException("Only one 'T' designator is allowed", i);
          }
          state = AFTER_T;
          i = i + 1 | 0;
          continue $l$loop_0;
        }
      var number = new Long(0, 0);
      $l$loop_1: while (true) {
        var tmp_1;
        if (i < text.length) {
          var containsArg_0 = charSequenceGet(text, i);
          tmp_1 = _Char___init__impl__6a9atx(48) <= containsArg_0 ? containsArg_0 <= _Char___init__impl__6a9atx(57) : false;
        } else {
          tmp_1 = false;
        }
        if (!tmp_1) {
          break $l$loop_1;
        }
        try {
          number = safeAdd(safeMultiply(number, new Long(10, 0)), toLong(Char__minus_impl_a2frrh(charSequenceGet(text, i), _Char___init__impl__6a9atx(48))));
        } catch ($p) {
          if ($p instanceof ArithmeticException) {
            var e = $p;
            parse$parseException('The number is too large', iStart);
          } else {
            throw $p;
          }
        }
        i = i + 1 | 0;
      }
      var tmp4 = number;
      // Inline function 'kotlin.Long.times' call
      var other_0 = localSign;
      number = tmp4.w2(toLong(other_0));
      if (i === text.length) {
        parse$parseException('Expected a designator after the numerical value', i);
      }
      var wrongOrder = "Wrong component order: should be 'Y', 'M', 'W', 'D', then designator 'T', then 'H', 'M', 'S'";
      var tmp2_subject = uppercaseChar(charSequenceGet(text, i));
      if (tmp2_subject === _Char___init__impl__6a9atx(89)) {
        if (state >= AFTER_YEAR) {
          parse$parseException(wrongOrder, i);
        }
        state = AFTER_YEAR;
        years = parse$toIntThrowing(number, iStart, _Char___init__impl__6a9atx(89));
      } else if (tmp2_subject === _Char___init__impl__6a9atx(77)) {
        if (state >= AFTER_T) {
          if (state >= AFTER_MINUTE) {
            parse$parseException(wrongOrder, i);
          }
          state = AFTER_MINUTE;
          minutes = parse$toIntThrowing(number, iStart, _Char___init__impl__6a9atx(77));
        } else {
          if (state >= AFTER_MONTH) {
            parse$parseException(wrongOrder, i);
          }
          state = AFTER_MONTH;
          months = parse$toIntThrowing(number, iStart, _Char___init__impl__6a9atx(77));
        }
      } else if (tmp2_subject === _Char___init__impl__6a9atx(87)) {
        if (state >= AFTER_WEEK) {
          parse$parseException(wrongOrder, i);
        }
        state = AFTER_WEEK;
        weeks = parse$toIntThrowing(number, iStart, _Char___init__impl__6a9atx(87));
      } else if (tmp2_subject === _Char___init__impl__6a9atx(68)) {
        if (state >= AFTER_DAY) {
          parse$parseException(wrongOrder, i);
        }
        state = AFTER_DAY;
        days = parse$toIntThrowing(number, iStart, _Char___init__impl__6a9atx(68));
      } else if (tmp2_subject === _Char___init__impl__6a9atx(72)) {
        if (state >= AFTER_HOUR || state < AFTER_T) {
          parse$parseException(wrongOrder, i);
        }
        state = AFTER_HOUR;
        hours = parse$toIntThrowing(number, iStart, _Char___init__impl__6a9atx(72));
      } else if (tmp2_subject === _Char___init__impl__6a9atx(83)) {
        if (state >= AFTER_SECOND_AND_NANO || state < AFTER_T) {
          parse$parseException(wrongOrder, i);
        }
        state = AFTER_SECOND_AND_NANO;
        seconds = parse$toIntThrowing(number, iStart, _Char___init__impl__6a9atx(83));
      } else if (tmp2_subject === _Char___init__impl__6a9atx(46) ? true : tmp2_subject === _Char___init__impl__6a9atx(44)) {
        i = i + 1 | 0;
        if (i >= text.length) {
          parse$parseException("Expected designator 'S' after " + toString(charSequenceGet(text, i - 1 | 0)), i);
        }
        var iStartFraction = i;
        $l$loop_2: while (true) {
          var tmp_2;
          if (i < text.length) {
            var containsArg_1 = charSequenceGet(text, i);
            tmp_2 = _Char___init__impl__6a9atx(48) <= containsArg_1 ? containsArg_1 <= _Char___init__impl__6a9atx(57) : false;
          } else {
            tmp_2 = false;
          }
          if (!tmp_2) {
            break $l$loop_2;
          }
          i = i + 1 | 0;
        }
        var fractionLength = i - iStartFraction | 0;
        if (fractionLength > 9) {
          parse$parseException('Only the nanosecond fractions of a second are supported', iStartFraction);
        }
        // Inline function 'kotlin.text.substring' call
        var endIndex = i;
        // Inline function 'kotlin.js.asDynamic' call
        var fractionalPart = text.substring(iStartFraction, endIndex) + repeat('0', 9 - fractionLength | 0);
        nanoseconds = imul(toInt(fractionalPart, 10), localSign);
        if (!(charSequenceGet(text, i) === _Char___init__impl__6a9atx(83))) {
          parse$parseException("Expected the 'S' designator after a fraction", i);
        }
        if (state >= AFTER_SECOND_AND_NANO || state < AFTER_T) {
          parse$parseException(wrongOrder, i);
        }
        state = AFTER_SECOND_AND_NANO;
        seconds = parse$toIntThrowing(number, iStart, _Char___init__impl__6a9atx(83));
      } else {
        parse$parseException('Expected a designator after the numerical value', i);
      }
      i = i + 1 | 0;
    }
  };
  var Companion_instance_0;
  function Companion_getInstance_0() {
    return Companion_instance_0;
  }
  function DateTimePeriod() {
  }
  protoOf(DateTimePeriod).a48 = function () {
    return this.t47() / 12 | 0;
  };
  protoOf(DateTimePeriod).b48 = function () {
    return this.t47() % 12 | 0;
  };
  protoOf(DateTimePeriod).v47 = function () {
    return this.z47().x2(new Long(817405952, 838)).g1();
  };
  protoOf(DateTimePeriod).w47 = function () {
    return this.z47().y2(new Long(817405952, 838)).x2(new Long(-129542144, 13)).g1();
  };
  protoOf(DateTimePeriod).x47 = function () {
    var tmp0 = this.z47().y2(new Long(-129542144, 13));
    // Inline function 'kotlin.Long.div' call
    var other = 1000000000;
    return tmp0.x2(toLong(other)).g1();
  };
  protoOf(DateTimePeriod).y47 = function () {
    var tmp0 = this.z47();
    // Inline function 'kotlin.Long.rem' call
    var other = 1000000000;
    return tmp0.y2(toLong(other)).g1();
  };
  protoOf(DateTimePeriod).toString = function () {
    // Inline function 'kotlin.text.buildString' call
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$();
    var tmp;
    if (allNonpositive(this)) {
      this_0.f8(_Char___init__impl__6a9atx(45));
      tmp = -1;
    } else {
      tmp = 1;
    }
    var sign = tmp;
    this_0.f8(_Char___init__impl__6a9atx(80));
    if (!(this.a48() === 0)) {
      this_0.sc(imul(this.a48(), sign)).f8(_Char___init__impl__6a9atx(89));
    }
    if (!(this.b48() === 0)) {
      this_0.sc(imul(this.b48(), sign)).f8(_Char___init__impl__6a9atx(77));
    }
    if (!(this.u47() === 0)) {
      this_0.sc(imul(this.u47(), sign)).f8(_Char___init__impl__6a9atx(68));
    }
    var t = 'T';
    if (!(this.v47() === 0)) {
      // Inline function 'kotlin.also' call
      this_0.e8(t).sc(imul(this.v47(), sign)).f8(_Char___init__impl__6a9atx(72));
      t = '';
    }
    if (!(this.w47() === 0)) {
      // Inline function 'kotlin.also' call
      this_0.e8(t).sc(imul(this.w47(), sign)).f8(_Char___init__impl__6a9atx(77));
      t = '';
    }
    if (!((this.x47() | this.y47()) === 0)) {
      this_0.e8(t);
      this_0.d8(!(this.x47() === 0) ? imul(this.x47(), sign) : imul(this.y47(), sign) < 0 ? '-0' : '0');
      if (!(this.y47() === 0)) {
        var tmp_0 = this_0.f8(_Char___init__impl__6a9atx(46));
        // Inline function 'kotlin.math.absoluteValue' call
        var this_1 = this.y47();
        var tmp$ret$4 = abs(this_1);
        tmp_0.e8(padStart(tmp$ret$4.toString(), 9, _Char___init__impl__6a9atx(48)));
      }
      this_0.f8(_Char___init__impl__6a9atx(83));
    }
    if (this_0.a() === 1) {
      this_0.e8('0D');
    }
    return this_0.toString();
  };
  protoOf(DateTimePeriod).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof DateTimePeriod))
      return false;
    if (!(this.t47() === other.t47()))
      return false;
    if (!(this.u47() === other.u47()))
      return false;
    if (!this.z47().equals(other.z47()))
      return false;
    return true;
  };
  protoOf(DateTimePeriod).hashCode = function () {
    var result = this.t47();
    result = imul(31, result) + this.u47() | 0;
    result = imul(31, result) + this.z47().hashCode() | 0;
    return result;
  };
  function totalMonths(years, months) {
    // Inline function 'kotlin.Long.times' call
    var totalMonths = toLong(years).w2(toLong(12)).u2(toLong(months));
    var tmp;
    // Inline function 'kotlin.ranges.contains' call
    var this_0 = numberRangeToNumber(-2147483648, 2147483647);
    if (contains(isInterface(this_0, ClosedRange) ? this_0 : THROW_CCE(), totalMonths)) {
      tmp = totalMonths.g1();
    } else {
      throw IllegalArgumentException_init_$Create$('The total number of months in ' + years + ' years and ' + months + ' months overflows an Int');
    }
    return tmp;
  }
  function DateTimePeriod_0(years, months, days, hours, minutes, seconds, nanoseconds) {
    years = years === VOID ? 0 : years;
    months = months === VOID ? 0 : months;
    days = days === VOID ? 0 : days;
    hours = hours === VOID ? 0 : hours;
    minutes = minutes === VOID ? 0 : minutes;
    seconds = seconds === VOID ? 0 : seconds;
    nanoseconds = nanoseconds === VOID ? new Long(0, 0) : nanoseconds;
    return buildDateTimePeriod(totalMonths(years, months), days, totalNanoseconds(hours, minutes, seconds, nanoseconds));
  }
  function buildDateTimePeriod(totalMonths, days, totalNanoseconds) {
    totalMonths = totalMonths === VOID ? 0 : totalMonths;
    days = days === VOID ? 0 : days;
    return !totalNanoseconds.equals(new Long(0, 0)) ? new DateTimePeriodImpl(totalMonths, days, totalNanoseconds) : new DatePeriod(totalMonths, days);
  }
  function totalNanoseconds(hours, minutes, seconds, nanoseconds) {
    // Inline function 'kotlin.Long.times' call
    // Inline function 'kotlin.Long.plus' call
    var totalMinutes = toLong(hours).w2(toLong(60)).u2(toLong(minutes));
    // Inline function 'kotlin.Long.times' call
    var totalMinutesAsSeconds = totalMinutes.w2(toLong(60));
    // Inline function 'kotlin.Long.div' call
    var other = 1000000000;
    var tmp$ret$3 = nanoseconds.x2(toLong(other));
    var minutesAndNanosecondsAsSeconds = totalMinutesAsSeconds.u2(tmp$ret$3);
    // Inline function 'kotlin.Long.plus' call
    var totalSeconds = minutesAndNanosecondsAsSeconds.u2(toLong(seconds));
    var tmp;
    try {
      var tmp_0 = new Long(1000000000, 0);
      // Inline function 'kotlin.Long.rem' call
      var other_0 = 1000000000;
      var tmp$ret$5 = nanoseconds.y2(toLong(other_0));
      tmp = multiplyAndAdd(totalSeconds, tmp_0, tmp$ret$5);
    } catch ($p) {
      var tmp_1;
      if ($p instanceof ArithmeticException) {
        var e = $p;
        throw IllegalArgumentException_init_$Create$('The total number of nanoseconds in ' + hours + ' hours, ' + minutes + ' minutes, ' + seconds + ' seconds, and ' + nanoseconds.toString() + ' nanoseconds overflows a Long');
      } else {
        throw $p;
      }
    }
    return tmp;
  }
  function DateTimePeriodImpl(totalMonths, days, totalNanoseconds) {
    DateTimePeriod.call(this);
    this.c48_1 = totalMonths;
    this.d48_1 = days;
    this.e48_1 = totalNanoseconds;
  }
  protoOf(DateTimePeriodImpl).t47 = function () {
    return this.c48_1;
  };
  protoOf(DateTimePeriodImpl).u47 = function () {
    return this.d48_1;
  };
  protoOf(DateTimePeriodImpl).z47 = function () {
    return this.e48_1;
  };
  function Companion_1() {
  }
  var Companion_instance_1;
  function Companion_getInstance_1() {
    return Companion_instance_1;
  }
  function Companion_2() {
  }
  var Companion_instance_2;
  function Companion_getInstance_2() {
    return Companion_instance_2;
  }
  function Companion_3() {
  }
  var Companion_instance_3;
  function Companion_getInstance_3() {
    return Companion_instance_3;
  }
  function Companion_4() {
  }
  var Companion_instance_4;
  function Companion_getInstance_4() {
    return Companion_instance_4;
  }
  function TimeBased(nanoseconds) {
    DateTimeUnit.call(this);
    this.f48_1 = nanoseconds;
    // Inline function 'kotlin.require' call
    if (!(this.f48_1.b1(new Long(0, 0)) > 0)) {
      var message = 'Unit duration must be positive, but was ' + this.f48_1.toString() + ' ns.';
      throw IllegalArgumentException_init_$Create$(toString_0(message));
    }
    if (this.f48_1.y2(new Long(817405952, 838)).equals(new Long(0, 0))) {
      this.g48_1 = 'HOUR';
      this.h48_1 = this.f48_1.x2(new Long(817405952, 838));
    } else {
      if (this.f48_1.y2(new Long(-129542144, 13)).equals(new Long(0, 0))) {
        this.g48_1 = 'MINUTE';
        this.h48_1 = this.f48_1.x2(new Long(-129542144, 13));
      } else {
        var tmp1 = this.f48_1;
        // Inline function 'kotlin.Long.rem' call
        var other = 1000000000;
        if (tmp1.y2(toLong(other)).equals(new Long(0, 0))) {
          this.g48_1 = 'SECOND';
          var tmp = this;
          var tmp3 = this.f48_1;
          // Inline function 'kotlin.Long.div' call
          var other_0 = 1000000000;
          tmp.h48_1 = tmp3.x2(toLong(other_0));
        } else {
          // Inline function 'kotlin.Long.rem' call
          if (this.f48_1.y2(toLong(1000000)).equals(new Long(0, 0))) {
            this.g48_1 = 'MILLISECOND';
            var tmp_0 = this;
            // Inline function 'kotlin.Long.div' call
            tmp_0.h48_1 = this.f48_1.x2(toLong(1000000));
          } else {
            // Inline function 'kotlin.Long.rem' call
            if (this.f48_1.y2(toLong(1000)).equals(new Long(0, 0))) {
              this.g48_1 = 'MICROSECOND';
              var tmp_1 = this;
              // Inline function 'kotlin.Long.div' call
              tmp_1.h48_1 = this.f48_1.x2(toLong(1000));
            } else {
              this.g48_1 = 'NANOSECOND';
              this.h48_1 = this.f48_1;
            }
          }
        }
      }
    }
  }
  protoOf(TimeBased).i48 = function (scalar) {
    return new TimeBased(safeMultiply(this.f48_1, toLong(scalar)));
  };
  protoOf(TimeBased).equals = function (other) {
    var tmp;
    if (this === other) {
      tmp = true;
    } else {
      var tmp_0;
      if (other instanceof TimeBased) {
        tmp_0 = this.f48_1.equals(other.f48_1);
      } else {
        tmp_0 = false;
      }
      tmp = tmp_0;
    }
    return tmp;
  };
  protoOf(TimeBased).hashCode = function () {
    return this.f48_1.g1() ^ this.f48_1.e3(32).g1();
  };
  protoOf(TimeBased).toString = function () {
    return this.j48(this.h48_1, this.g48_1);
  };
  function DateBased() {
    DateTimeUnit.call(this);
  }
  function DayBased(days) {
    DateBased.call(this);
    this.l48_1 = days;
    // Inline function 'kotlin.require' call
    if (!(this.l48_1 > 0)) {
      var message = 'Unit duration must be positive, but was ' + this.l48_1 + ' days.';
      throw IllegalArgumentException_init_$Create$(toString_0(message));
    }
  }
  protoOf(DayBased).i48 = function (scalar) {
    return new DayBased(safeMultiply_0(this.l48_1, scalar));
  };
  protoOf(DayBased).equals = function (other) {
    var tmp;
    if (this === other) {
      tmp = true;
    } else {
      var tmp_0;
      if (other instanceof DayBased) {
        tmp_0 = this.l48_1 === other.l48_1;
      } else {
        tmp_0 = false;
      }
      tmp = tmp_0;
    }
    return tmp;
  };
  protoOf(DayBased).hashCode = function () {
    return this.l48_1 ^ 65536;
  };
  protoOf(DayBased).toString = function () {
    return (this.l48_1 % 7 | 0) === 0 ? this.k48(this.l48_1 / 7 | 0, 'WEEK') : this.k48(this.l48_1, 'DAY');
  };
  function MonthBased(months) {
    DateBased.call(this);
    this.m48_1 = months;
    // Inline function 'kotlin.require' call
    if (!(this.m48_1 > 0)) {
      var message = 'Unit duration must be positive, but was ' + this.m48_1 + ' months.';
      throw IllegalArgumentException_init_$Create$(toString_0(message));
    }
  }
  protoOf(MonthBased).i48 = function (scalar) {
    return new MonthBased(safeMultiply_0(this.m48_1, scalar));
  };
  protoOf(MonthBased).equals = function (other) {
    var tmp;
    if (this === other) {
      tmp = true;
    } else {
      var tmp_0;
      if (other instanceof MonthBased) {
        tmp_0 = this.m48_1 === other.m48_1;
      } else {
        tmp_0 = false;
      }
      tmp = tmp_0;
    }
    return tmp;
  };
  protoOf(MonthBased).hashCode = function () {
    return this.m48_1 ^ 131072;
  };
  protoOf(MonthBased).toString = function () {
    return (this.m48_1 % 1200 | 0) === 0 ? this.k48(this.m48_1 / 1200 | 0, 'CENTURY') : (this.m48_1 % 12 | 0) === 0 ? this.k48(this.m48_1 / 12 | 0, 'YEAR') : (this.m48_1 % 3 | 0) === 0 ? this.k48(this.m48_1 / 3 | 0, 'QUARTER') : this.k48(this.m48_1, 'MONTH');
  };
  function Companion_5() {
    Companion_instance_5 = this;
    this.n48_1 = new TimeBased(new Long(1, 0));
    this.o48_1 = this.n48_1.i48(1000);
    this.p48_1 = this.o48_1.i48(1000);
    this.q48_1 = this.p48_1.i48(1000);
    this.r48_1 = this.q48_1.i48(60);
    this.s48_1 = this.r48_1.i48(60);
    this.t48_1 = new DayBased(1);
    this.u48_1 = this.t48_1.i48(7);
    this.v48_1 = new MonthBased(1);
    this.w48_1 = this.v48_1.i48(3);
    this.x48_1 = this.v48_1.i48(12);
    this.y48_1 = this.x48_1.i48(100);
  }
  var Companion_instance_5;
  function Companion_getInstance_5() {
    if (Companion_instance_5 == null)
      new Companion_5();
    return Companion_instance_5;
  }
  function DateTimeUnit() {
    Companion_getInstance_5();
  }
  protoOf(DateTimeUnit).k48 = function (value, unit) {
    return value === 1 ? unit : '' + value + '-' + unit;
  };
  protoOf(DateTimeUnit).j48 = function (value, unit) {
    return value.equals(new Long(1, 0)) ? unit : value.toString() + '-' + unit;
  };
  function get_isoDayNumber(_this__u8e3s4) {
    return _this__u8e3s4.o2_1 + 1 | 0;
  }
  function DayOfWeek(isoDayNumber) {
    // Inline function 'kotlin.require' call
    if (!(1 <= isoDayNumber ? isoDayNumber <= 7 : false)) {
      var message = 'Expected ISO day-of-week number in 1..7, got ' + isoDayNumber;
      throw IllegalArgumentException_init_$Create$(toString_0(message));
    }
    return get_entries().o(isoDayNumber - 1 | 0);
  }
  function DateTimeFormatException_init_$Init$($this) {
    IllegalArgumentException_init_$Init$($this);
    DateTimeFormatException.call($this);
    return $this;
  }
  function DateTimeFormatException_init_$Create$() {
    var tmp = DateTimeFormatException_init_$Init$(objectCreate(protoOf(DateTimeFormatException)));
    captureStack(tmp, DateTimeFormatException_init_$Create$);
    return tmp;
  }
  function DateTimeFormatException_init_$Init$_0(message, $this) {
    IllegalArgumentException_init_$Init$_0(message, $this);
    DateTimeFormatException.call($this);
    return $this;
  }
  function DateTimeFormatException_init_$Create$_0(message) {
    var tmp = DateTimeFormatException_init_$Init$_0(message, objectCreate(protoOf(DateTimeFormatException)));
    captureStack(tmp, DateTimeFormatException_init_$Create$_0);
    return tmp;
  }
  function DateTimeFormatException_init_$Init$_1(cause, $this) {
    IllegalArgumentException_init_$Init$_1(cause, $this);
    DateTimeFormatException.call($this);
    return $this;
  }
  function DateTimeFormatException_init_$Create$_1(cause) {
    var tmp = DateTimeFormatException_init_$Init$_1(cause, objectCreate(protoOf(DateTimeFormatException)));
    captureStack(tmp, DateTimeFormatException_init_$Create$_1);
    return tmp;
  }
  function DateTimeFormatException_init_$Init$_2(message, cause, $this) {
    IllegalArgumentException_init_$Init$_2(message, cause, $this);
    DateTimeFormatException.call($this);
    return $this;
  }
  function DateTimeFormatException_init_$Create$_2(message, cause) {
    var tmp = DateTimeFormatException_init_$Init$_2(message, cause, objectCreate(protoOf(DateTimeFormatException)));
    captureStack(tmp, DateTimeFormatException_init_$Create$_2);
    return tmp;
  }
  function DateTimeFormatException() {
    captureStack(this, DateTimeFormatException);
  }
  function DateTimeArithmeticException_init_$Init$($this) {
    RuntimeException_init_$Init$($this);
    DateTimeArithmeticException.call($this);
    return $this;
  }
  function DateTimeArithmeticException_init_$Create$() {
    var tmp = DateTimeArithmeticException_init_$Init$(objectCreate(protoOf(DateTimeArithmeticException)));
    captureStack(tmp, DateTimeArithmeticException_init_$Create$);
    return tmp;
  }
  function DateTimeArithmeticException_init_$Init$_0(cause, $this) {
    RuntimeException_init_$Init$_0(cause, $this);
    DateTimeArithmeticException.call($this);
    return $this;
  }
  function DateTimeArithmeticException_init_$Create$_0(cause) {
    var tmp = DateTimeArithmeticException_init_$Init$_0(cause, objectCreate(protoOf(DateTimeArithmeticException)));
    captureStack(tmp, DateTimeArithmeticException_init_$Create$_0);
    return tmp;
  }
  function DateTimeArithmeticException_init_$Init$_1(message, cause, $this) {
    RuntimeException_init_$Init$_1(message, cause, $this);
    DateTimeArithmeticException.call($this);
    return $this;
  }
  function DateTimeArithmeticException_init_$Create$_1(message, cause) {
    var tmp = DateTimeArithmeticException_init_$Init$_1(message, cause, objectCreate(protoOf(DateTimeArithmeticException)));
    captureStack(tmp, DateTimeArithmeticException_init_$Create$_1);
    return tmp;
  }
  function DateTimeArithmeticException() {
    captureStack(this, DateTimeArithmeticException);
  }
  function IllegalTimeZoneException_init_$Init$($this) {
    IllegalArgumentException_init_$Init$($this);
    IllegalTimeZoneException.call($this);
    return $this;
  }
  function IllegalTimeZoneException_init_$Create$() {
    var tmp = IllegalTimeZoneException_init_$Init$(objectCreate(protoOf(IllegalTimeZoneException)));
    captureStack(tmp, IllegalTimeZoneException_init_$Create$);
    return tmp;
  }
  function IllegalTimeZoneException_init_$Init$_0(cause, $this) {
    IllegalArgumentException_init_$Init$_1(cause, $this);
    IllegalTimeZoneException.call($this);
    return $this;
  }
  function IllegalTimeZoneException_init_$Create$_0(cause) {
    var tmp = IllegalTimeZoneException_init_$Init$_0(cause, objectCreate(protoOf(IllegalTimeZoneException)));
    captureStack(tmp, IllegalTimeZoneException_init_$Create$_0);
    return tmp;
  }
  function IllegalTimeZoneException() {
    captureStack(this, IllegalTimeZoneException);
  }
  function getIsoDateFormat() {
    return Formats_getInstance_0().a49();
  }
  function getIsoDateTimeFormat() {
    return Formats_getInstance_1().b49_1;
  }
  function getIsoTimeFormat() {
    return Formats_instance_2.a49();
  }
  function getIsoUtcOffsetFormat() {
    return Formats_instance_3.a49();
  }
  function asTimeZone(_this__u8e3s4) {
    return FixedOffsetTimeZone_init_$Create$(_this__u8e3s4);
  }
  var timeZoneField;
  function get_emptyDateTimeComponentsContents() {
    _init_properties_DateTimeComponents_kt__9iimb5();
    return emptyDateTimeComponentsContents;
  }
  var emptyDateTimeComponentsContents;
  function DateTimeComponentsContents(date, time, offset, timeZoneId) {
    date = date === VOID ? new IncompleteLocalDate() : date;
    time = time === VOID ? new IncompleteLocalTime() : time;
    offset = offset === VOID ? new IncompleteUtcOffset() : offset;
    timeZoneId = timeZoneId === VOID ? null : timeZoneId;
    this.c49_1 = date;
    this.d49_1 = time;
    this.e49_1 = offset;
    this.f49_1 = timeZoneId;
  }
  protoOf(DateTimeComponentsContents).g49 = function (_set____db54di) {
    this.c49_1.j49_1 = _set____db54di;
  };
  protoOf(DateTimeComponentsContents).l49 = function () {
    return this.c49_1.j49_1;
  };
  protoOf(DateTimeComponentsContents).m49 = function (_set____db54di) {
    this.c49_1.k49_1 = _set____db54di;
  };
  protoOf(DateTimeComponentsContents).n49 = function () {
    return this.c49_1.k49_1;
  };
  protoOf(DateTimeComponentsContents).o49 = function (_set____db54di) {
    this.c49_1.i49_1 = _set____db54di;
  };
  protoOf(DateTimeComponentsContents).p49 = function () {
    return this.c49_1.i49_1;
  };
  protoOf(DateTimeComponentsContents).q49 = function (_set____db54di) {
    this.c49_1.h49_1 = _set____db54di;
  };
  protoOf(DateTimeComponentsContents).r49 = function () {
    return this.c49_1.h49_1;
  };
  protoOf(DateTimeComponentsContents).s49 = function (_set____db54di) {
    this.d49_1.v49_1 = _set____db54di;
  };
  protoOf(DateTimeComponentsContents).z49 = function () {
    return this.d49_1.v49_1;
  };
  protoOf(DateTimeComponentsContents).a4a = function (value) {
    this.d49_1.a4a(value);
  };
  protoOf(DateTimeComponentsContents).b4a = function () {
    return this.d49_1.b4a();
  };
  protoOf(DateTimeComponentsContents).c4a = function (_set____db54di) {
    this.d49_1.t49_1 = _set____db54di;
  };
  protoOf(DateTimeComponentsContents).d4a = function () {
    return this.d49_1.t49_1;
  };
  protoOf(DateTimeComponentsContents).e4a = function (_set____db54di) {
    this.d49_1.u49_1 = _set____db54di;
  };
  protoOf(DateTimeComponentsContents).f4a = function () {
    return this.d49_1.u49_1;
  };
  protoOf(DateTimeComponentsContents).g4a = function (_set____db54di) {
    this.d49_1.w49_1 = _set____db54di;
  };
  protoOf(DateTimeComponentsContents).h4a = function () {
    return this.d49_1.w49_1;
  };
  protoOf(DateTimeComponentsContents).i4a = function (_set____db54di) {
    this.d49_1.y49_1 = _set____db54di;
  };
  protoOf(DateTimeComponentsContents).j4a = function () {
    return this.d49_1.y49_1;
  };
  protoOf(DateTimeComponentsContents).k4a = function (_set____db54di) {
    this.d49_1.x49_1 = _set____db54di;
  };
  protoOf(DateTimeComponentsContents).l4a = function () {
    return this.d49_1.x49_1;
  };
  protoOf(DateTimeComponentsContents).m4a = function (_set____db54di) {
    this.e49_1.n4a_1 = _set____db54di;
  };
  protoOf(DateTimeComponentsContents).r4a = function () {
    return this.e49_1.n4a_1;
  };
  protoOf(DateTimeComponentsContents).s4a = function (_set____db54di) {
    this.e49_1.p4a_1 = _set____db54di;
  };
  protoOf(DateTimeComponentsContents).t4a = function () {
    return this.e49_1.p4a_1;
  };
  protoOf(DateTimeComponentsContents).u4a = function (_set____db54di) {
    this.e49_1.q4a_1 = _set____db54di;
  };
  protoOf(DateTimeComponentsContents).v4a = function () {
    return this.e49_1.q4a_1;
  };
  protoOf(DateTimeComponentsContents).w4a = function (_set____db54di) {
    this.e49_1.o4a_1 = _set____db54di;
  };
  protoOf(DateTimeComponentsContents).x4a = function () {
    return this.e49_1.o4a_1;
  };
  protoOf(DateTimeComponentsContents).y4a = function () {
    return new DateTimeComponentsContents(this.c49_1.y4a(), this.d49_1.y4a(), this.e49_1.y4a(), this.f49_1);
  };
  protoOf(DateTimeComponentsContents).equals = function (other) {
    var tmp;
    var tmp_0;
    var tmp_1;
    var tmp_2;
    if (other instanceof DateTimeComponentsContents) {
      tmp_2 = other.c49_1.equals(this.c49_1);
    } else {
      tmp_2 = false;
    }
    if (tmp_2) {
      tmp_1 = other.d49_1.equals(this.d49_1);
    } else {
      tmp_1 = false;
    }
    if (tmp_1) {
      tmp_0 = other.e49_1.equals(this.e49_1);
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      tmp = other.f49_1 == this.f49_1;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(DateTimeComponentsContents).hashCode = function () {
    var tmp = this.c49_1.hashCode() ^ this.d49_1.hashCode() ^ this.e49_1.hashCode();
    var tmp0_safe_receiver = this.f49_1;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : getStringHashCode(tmp0_safe_receiver);
    return tmp ^ (tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs);
  };
  function DateTimeComponents$Formats$ISO_DATE_TIME_OFFSET$lambda($this$Format) {
    $this$Format.z4a(get_ISO_DATE());
    var tmp = [DateTimeComponents$Formats$ISO_DATE_TIME_OFFSET$lambda$lambda];
    alternativeParsing($this$Format, tmp, DateTimeComponents$Formats$ISO_DATE_TIME_OFFSET$lambda$lambda_0);
    $this$Format.a4b();
    char($this$Format, _Char___init__impl__6a9atx(58));
    $this$Format.b4b();
    char($this$Format, _Char___init__impl__6a9atx(58));
    $this$Format.c4b();
    optional($this$Format, VOID, DateTimeComponents$Formats$ISO_DATE_TIME_OFFSET$lambda$lambda_1);
    var tmp_0 = [DateTimeComponents$Formats$ISO_DATE_TIME_OFFSET$lambda$lambda_2];
    alternativeParsing($this$Format, tmp_0, DateTimeComponents$Formats$ISO_DATE_TIME_OFFSET$lambda$lambda_3);
    return Unit_instance;
  }
  function DateTimeComponents$Formats$ISO_DATE_TIME_OFFSET$lambda$lambda($this$alternativeParsing) {
    char($this$alternativeParsing, _Char___init__impl__6a9atx(116));
    return Unit_instance;
  }
  function DateTimeComponents$Formats$ISO_DATE_TIME_OFFSET$lambda$lambda_0($this$alternativeParsing) {
    char($this$alternativeParsing, _Char___init__impl__6a9atx(84));
    return Unit_instance;
  }
  function DateTimeComponents$Formats$ISO_DATE_TIME_OFFSET$lambda$lambda_1($this$optional) {
    char($this$optional, _Char___init__impl__6a9atx(46));
    $this$optional.d4b(1, 9);
    return Unit_instance;
  }
  function DateTimeComponents$Formats$ISO_DATE_TIME_OFFSET$lambda$lambda_2($this$alternativeParsing) {
    $this$alternativeParsing.e4b();
    return Unit_instance;
  }
  function DateTimeComponents$Formats$ISO_DATE_TIME_OFFSET$lambda$lambda_3($this$alternativeParsing) {
    $this$alternativeParsing.f4b(Formats_instance_3.a49());
    return Unit_instance;
  }
  function DateTimeComponents$Formats$RFC_1123$lambda($this$Format) {
    var tmp = [DateTimeComponents$Formats$RFC_1123$lambda$lambda];
    alternativeParsing($this$Format, tmp, DateTimeComponents$Formats$RFC_1123$lambda$lambda_0);
    $this$Format.g4b(Padding_NONE_getInstance());
    char($this$Format, _Char___init__impl__6a9atx(32));
    $this$Format.j4b(Companion_getInstance_7().i4b_1);
    char($this$Format, _Char___init__impl__6a9atx(32));
    $this$Format.k4b();
    char($this$Format, _Char___init__impl__6a9atx(32));
    $this$Format.a4b();
    char($this$Format, _Char___init__impl__6a9atx(58));
    $this$Format.b4b();
    optional($this$Format, VOID, DateTimeComponents$Formats$RFC_1123$lambda$lambda_1);
    $this$Format.l4b(' ');
    var tmp_0 = DateTimeComponents$Formats$RFC_1123$lambda$lambda_2;
    var tmp_1 = [tmp_0, DateTimeComponents$Formats$RFC_1123$lambda$lambda_3];
    alternativeParsing($this$Format, tmp_1, DateTimeComponents$Formats$RFC_1123$lambda$lambda_4);
    return Unit_instance;
  }
  function DateTimeComponents$Formats$RFC_1123$lambda$lambda($this$alternativeParsing) {
    return Unit_instance;
  }
  function DateTimeComponents$Formats$RFC_1123$lambda$lambda_0($this$alternativeParsing) {
    $this$alternativeParsing.o4b(Companion_getInstance_8().n4b_1);
    $this$alternativeParsing.l4b(', ');
    return Unit_instance;
  }
  function DateTimeComponents$Formats$RFC_1123$lambda$lambda_1($this$optional) {
    char($this$optional, _Char___init__impl__6a9atx(58));
    $this$optional.c4b();
    return Unit_instance;
  }
  function DateTimeComponents$Formats$RFC_1123$lambda$lambda_2($this$alternativeParsing) {
    $this$alternativeParsing.l4b('UT');
    return Unit_instance;
  }
  function DateTimeComponents$Formats$RFC_1123$lambda$lambda_3($this$alternativeParsing) {
    $this$alternativeParsing.l4b('Z');
    return Unit_instance;
  }
  function DateTimeComponents$Formats$RFC_1123$lambda$lambda_4($this$alternativeParsing) {
    optional($this$alternativeParsing, 'GMT', DateTimeComponents$Formats$RFC_1123$lambda$lambda$lambda);
    return Unit_instance;
  }
  function DateTimeComponents$Formats$RFC_1123$lambda$lambda$lambda($this$optional) {
    $this$optional.f4b(Formats_instance_3.p4b());
    return Unit_instance;
  }
  function Companion_6() {
  }
  protoOf(Companion_6).q4b = function (block) {
    var builder = new Builder(new AppendableFormatStructure());
    block(builder);
    return new DateTimeComponentsFormat(builder.p2d());
  };
  var Companion_instance_6;
  function Companion_getInstance_6() {
    return Companion_instance_6;
  }
  function Formats() {
    Formats_instance = this;
    var tmp = this;
    var tmp_0 = Companion_instance_6;
    tmp.r4b_1 = tmp_0.q4b(DateTimeComponents$Formats$ISO_DATE_TIME_OFFSET$lambda);
    var tmp_1 = this;
    var tmp_2 = Companion_instance_6;
    tmp_1.s4b_1 = tmp_2.q4b(DateTimeComponents$Formats$RFC_1123$lambda);
  }
  var Formats_instance;
  function Formats_getInstance() {
    if (Formats_instance == null)
      new Formats();
    return Formats_instance;
  }
  function DateTimeComponents(contents) {
    contents = contents === VOID ? new DateTimeComponentsContents() : contents;
    this.t4b_1 = contents;
    this.u4b_1 = year$factory(this.t4b_1.c49_1);
    this.v4b_1 = new TwoDigitNumber(monthNumber$factory(this.t4b_1.c49_1));
    this.w4b_1 = new TwoDigitNumber(dayOfMonth$factory(this.t4b_1.c49_1));
    this.x4b_1 = new TwoDigitNumber(hour$factory(this.t4b_1.d49_1));
    this.y4b_1 = new TwoDigitNumber(hourOfAmPm$factory(this.t4b_1.d49_1));
    this.z4b_1 = amPm$factory(this.t4b_1.d49_1);
    this.a4c_1 = new TwoDigitNumber(minute$factory(this.t4b_1.d49_1));
    this.b4c_1 = new TwoDigitNumber(second$factory(this.t4b_1.d49_1));
    this.c4c_1 = isNegative$factory(this.t4b_1.e49_1);
    this.d4c_1 = new TwoDigitNumber(totalHoursAbs$factory(this.t4b_1.e49_1));
    this.e4c_1 = new TwoDigitNumber(minutesOfHour$factory(this.t4b_1.e49_1));
    this.f4c_1 = new TwoDigitNumber(secondsOfMinute$factory(this.t4b_1.e49_1));
    this.g4c_1 = timeZoneId$factory_0(this.t4b_1);
  }
  protoOf(DateTimeComponents).q49 = function (_set____db54di) {
    var tmp0 = this.u4b_1;
    // Inline function 'kotlin.setValue' call
    year$factory_0();
    tmp0.set(_set____db54di);
    return Unit_instance;
  };
  protoOf(DateTimeComponents).r49 = function () {
    var tmp0 = this.u4b_1;
    // Inline function 'kotlin.getValue' call
    year$factory_1();
    return tmp0.get();
  };
  protoOf(DateTimeComponents).j4a = function () {
    return this.t4b_1.d49_1.y49_1;
  };
  protoOf(DateTimeComponents).h4c = function () {
    return this.t4b_1.e49_1.h4c();
  };
  protoOf(DateTimeComponents).i4c = function () {
    return this.t4b_1.d49_1.i4c();
  };
  protoOf(DateTimeComponents).j4c = function () {
    var offset = this.h4c();
    var time = this.i4c();
    var truncatedDate = this.t4b_1.c49_1.y4a();
    truncatedDate.h49_1 = requireParsedField(truncatedDate.h49_1, 'year') % 10000 | 0;
    var tmp;
    try {
      var secDelta = safeMultiply(toLong(ensureNotNull(this.r49()) / 10000 | 0), new Long(2036907392, 73));
      var epochDays = toLong(truncatedDate.k4c().m4c());
      // Inline function 'kotlin.Long.times' call
      var tmp2 = epochDays.w2(toLong(86400));
      // Inline function 'kotlin.Long.plus' call
      var other = time.o4c();
      var tmp4 = tmp2.u2(toLong(other));
      // Inline function 'kotlin.Long.minus' call
      var other_0 = offset.q4c();
      var tmp$ret$2 = tmp4.v2(toLong(other_0));
      tmp = safeAdd(secDelta, tmp$ret$2);
    } catch ($p) {
      var tmp_0;
      if ($p instanceof ArithmeticException) {
        var e = $p;
        throw DateTimeFormatException_init_$Create$_2('The parsed date is outside the range representable by Instant', e);
      } else {
        throw $p;
      }
    }
    var totalSeconds = tmp;
    if (totalSeconds.b1(Companion_getInstance_16().n47_1.s4c()) < 0 || totalSeconds.b1(Companion_getInstance_16().o47_1.s4c()) > 0)
      throw DateTimeFormatException_init_$Create$_0('The parsed date is outside the range representable by Instant');
    var tmp_1 = Companion_getInstance_16();
    var tmp0_elvis_lhs = this.j4a();
    return tmp_1.t4c(totalSeconds, tmp0_elvis_lhs == null ? 0 : tmp0_elvis_lhs);
  };
  function Builder(actualBuilder) {
    this.u4c_1 = actualBuilder;
  }
  protoOf(Builder).v4c = function () {
    return this.u4c_1;
  };
  protoOf(Builder).w4c = function (structure) {
    this.u4c_1.y4c(structure);
  };
  protoOf(Builder).z4c = function (structure) {
    this.u4c_1.y4c(structure);
  };
  protoOf(Builder).a4d = function () {
    return new Builder(new AppendableFormatStructure());
  };
  function DateTimeComponentsFormat(actualFormat) {
    AbstractDateTimeFormat.call(this);
    this.s4d_1 = actualFormat;
  }
  protoOf(DateTimeComponentsFormat).t4d = function () {
    return this.s4d_1;
  };
  protoOf(DateTimeComponentsFormat).u4d = function (intermediate) {
    return new DateTimeComponents(intermediate);
  };
  protoOf(DateTimeComponentsFormat).v4d = function (intermediate) {
    return this.u4d(intermediate instanceof DateTimeComponentsContents ? intermediate : THROW_CCE());
  };
  protoOf(DateTimeComponentsFormat).w4d = function () {
    return get_emptyDateTimeComponentsContents();
  };
  function TwoDigitNumber(reference) {
    this.y4d_1 = reference;
  }
  function timeZoneId$factory() {
    return getPropertyCallableRef('timeZoneId', 1, KMutableProperty1, function (receiver) {
      return receiver.f49_1;
    }, function (receiver, value) {
      receiver.f49_1 = value;
      return Unit_instance;
    });
  }
  function year$factory($b0) {
    return getPropertyCallableRef('year', 0, KMutableProperty0, function () {
      return $b0.h49_1;
    }, function (value) {
      $b0.h49_1 = value;
      return Unit_instance;
    });
  }
  function monthNumber$factory($b0) {
    return getPropertyCallableRef('monthNumber', 0, KMutableProperty0, function () {
      return $b0.i49_1;
    }, function (value) {
      $b0.i49_1 = value;
      return Unit_instance;
    });
  }
  function dayOfMonth$factory($b0) {
    return getPropertyCallableRef('dayOfMonth', 0, KMutableProperty0, function () {
      return $b0.j49_1;
    }, function (value) {
      $b0.j49_1 = value;
      return Unit_instance;
    });
  }
  function hour$factory($b0) {
    return getPropertyCallableRef('hour', 0, KMutableProperty0, function () {
      return $b0.t49_1;
    }, function (value) {
      $b0.t49_1 = value;
      return Unit_instance;
    });
  }
  function hourOfAmPm$factory($b0) {
    return getPropertyCallableRef('hourOfAmPm', 0, KMutableProperty0, function () {
      return $b0.u49_1;
    }, function (value) {
      $b0.u49_1 = value;
      return Unit_instance;
    });
  }
  function amPm$factory($b0) {
    return getPropertyCallableRef('amPm', 0, KMutableProperty0, function () {
      return $b0.v49_1;
    }, function (value) {
      $b0.v49_1 = value;
      return Unit_instance;
    });
  }
  function minute$factory($b0) {
    return getPropertyCallableRef('minute', 0, KMutableProperty0, function () {
      return $b0.w49_1;
    }, function (value) {
      $b0.w49_1 = value;
      return Unit_instance;
    });
  }
  function second$factory($b0) {
    return getPropertyCallableRef('second', 0, KMutableProperty0, function () {
      return $b0.x49_1;
    }, function (value) {
      $b0.x49_1 = value;
      return Unit_instance;
    });
  }
  function isNegative$factory($b0) {
    return getPropertyCallableRef('isNegative', 0, KMutableProperty0, function () {
      return $b0.n4a_1;
    }, function (value) {
      $b0.n4a_1 = value;
      return Unit_instance;
    });
  }
  function totalHoursAbs$factory($b0) {
    return getPropertyCallableRef('totalHoursAbs', 0, KMutableProperty0, function () {
      return $b0.o4a_1;
    }, function (value) {
      $b0.o4a_1 = value;
      return Unit_instance;
    });
  }
  function minutesOfHour$factory($b0) {
    return getPropertyCallableRef('minutesOfHour', 0, KMutableProperty0, function () {
      return $b0.p4a_1;
    }, function (value) {
      $b0.p4a_1 = value;
      return Unit_instance;
    });
  }
  function secondsOfMinute$factory($b0) {
    return getPropertyCallableRef('secondsOfMinute', 0, KMutableProperty0, function () {
      return $b0.q4a_1;
    }, function (value) {
      $b0.q4a_1 = value;
      return Unit_instance;
    });
  }
  function timeZoneId$factory_0($b0) {
    return getPropertyCallableRef('timeZoneId', 0, KMutableProperty0, function () {
      return $b0.f49_1;
    }, function (value) {
      $b0.f49_1 = value;
      return Unit_instance;
    });
  }
  function year$factory_0() {
    return getPropertyCallableRef('year', 1, KMutableProperty1, function (receiver) {
      return receiver.r49();
    }, function (receiver, value) {
      return receiver.q49(value);
    });
  }
  function year$factory_1() {
    return getPropertyCallableRef('year', 1, KMutableProperty1, function (receiver) {
      return receiver.r49();
    }, function (receiver, value) {
      return receiver.q49(value);
    });
  }
  var properties_initialized_DateTimeComponents_kt_io5e5;
  function _init_properties_DateTimeComponents_kt__9iimb5() {
    if (!properties_initialized_DateTimeComponents_kt_io5e5) {
      properties_initialized_DateTimeComponents_kt_io5e5 = true;
      timeZoneField = new GenericFieldSpec(new PropertyAccessor(timeZoneId$factory()));
      emptyDateTimeComponentsContents = new DateTimeComponentsContents();
    }
  }
  function AbstractDateTimeFormat() {
  }
  protoOf(AbstractDateTimeFormat).x4d = function (input) {
    var tmp;
    try {
      tmp = Parser__match$default_impl_x2xlti(_Parser___init__impl__gdyfby(this.t4d().c4e()), input, this.w4d());
    } catch ($p) {
      var tmp_0;
      if ($p instanceof ParseException) {
        var e = $p;
        throw DateTimeFormatException_init_$Create$_2("Failed to parse value from '" + toString_0(input) + "'", e);
      } else {
        throw $p;
      }
    }
    var matched = tmp;
    try {
      return this.v4d(matched);
    } catch ($p) {
      if ($p instanceof IllegalArgumentException) {
        var e_0 = $p;
        var message = e_0.message;
        throw DateTimeFormatException_init_$Create$_2(message == null ? "The value parsed from '" + toString_0(input) + "' is invalid" : '' + message + " (when parsing '" + toString_0(input) + "')", e_0);
      } else {
        throw $p;
      }
    }
  };
  var Padding_NONE_instance;
  var Padding_ZERO_instance;
  var Padding_SPACE_instance;
  var Padding_entriesInitialized;
  function Padding_initEntries() {
    if (Padding_entriesInitialized)
      return Unit_instance;
    Padding_entriesInitialized = true;
    Padding_NONE_instance = new Padding('NONE', 0);
    Padding_ZERO_instance = new Padding('ZERO', 1);
    Padding_SPACE_instance = new Padding('SPACE', 2);
  }
  function Padding(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function Padding_NONE_getInstance() {
    Padding_initEntries();
    return Padding_NONE_instance;
  }
  function Padding_ZERO_getInstance() {
    Padding_initEntries();
    return Padding_ZERO_instance;
  }
  function Padding_SPACE_getInstance() {
    Padding_initEntries();
    return Padding_SPACE_instance;
  }
  function WithDate() {
  }
  function WithTime() {
  }
  function WithUtcOffset() {
  }
  function char(_this__u8e3s4, value) {
    return _this__u8e3s4.l4b(toString(value));
  }
  function optional(_this__u8e3s4, ifZero, format) {
    ifZero = ifZero === VOID ? '' : ifZero;
    var tmp;
    if (isInterface(_this__u8e3s4, AbstractDateTimeFormatBuilder)) {
      _this__u8e3s4.c4d(ifZero, typeof format === 'function' ? format : THROW_CCE());
      tmp = Unit_instance;
    } else {
      throw IllegalStateException_init_$Create$('impossible');
    }
    return tmp;
  }
  function alternativeParsing(_this__u8e3s4, alternativeFormats, primaryFormat) {
    var tmp;
    if (isInterface(_this__u8e3s4, AbstractDateTimeFormatBuilder)) {
      var tmp_0 = (isArray(alternativeFormats) ? alternativeFormats : THROW_CCE()).slice();
      _this__u8e3s4.b4d(tmp_0, typeof primaryFormat === 'function' ? primaryFormat : THROW_CCE());
      tmp = Unit_instance;
    } else {
      throw IllegalStateException_init_$Create$('impossible');
    }
    return tmp;
  }
  function AbstractDateTimeFormatBuilder() {
  }
  function get_ISO_DATE() {
    _init_properties_LocalDateFormat_kt__k1uk9u();
    var tmp0 = ISO_DATE$delegate;
    // Inline function 'kotlin.getValue' call
    ISO_DATE$factory();
    return tmp0.w();
  }
  var ISO_DATE$delegate;
  function get_ISO_DATE_BASIC() {
    _init_properties_LocalDateFormat_kt__k1uk9u();
    var tmp0 = ISO_DATE_BASIC$delegate;
    // Inline function 'kotlin.getValue' call
    ISO_DATE_BASIC$factory();
    return tmp0.w();
  }
  var ISO_DATE_BASIC$delegate;
  function get_emptyIncompleteLocalDate() {
    _init_properties_LocalDateFormat_kt__k1uk9u();
    return emptyIncompleteLocalDate;
  }
  var emptyIncompleteLocalDate;
  function IncompleteLocalDate(year, monthNumber, dayOfMonth, isoDayOfWeek) {
    year = year === VOID ? null : year;
    monthNumber = monthNumber === VOID ? null : monthNumber;
    dayOfMonth = dayOfMonth === VOID ? null : dayOfMonth;
    isoDayOfWeek = isoDayOfWeek === VOID ? null : isoDayOfWeek;
    this.h49_1 = year;
    this.i49_1 = monthNumber;
    this.j49_1 = dayOfMonth;
    this.k49_1 = isoDayOfWeek;
  }
  protoOf(IncompleteLocalDate).q49 = function (_set____db54di) {
    this.h49_1 = _set____db54di;
  };
  protoOf(IncompleteLocalDate).r49 = function () {
    return this.h49_1;
  };
  protoOf(IncompleteLocalDate).o49 = function (_set____db54di) {
    this.i49_1 = _set____db54di;
  };
  protoOf(IncompleteLocalDate).p49 = function () {
    return this.i49_1;
  };
  protoOf(IncompleteLocalDate).g49 = function (_set____db54di) {
    this.j49_1 = _set____db54di;
  };
  protoOf(IncompleteLocalDate).l49 = function () {
    return this.j49_1;
  };
  protoOf(IncompleteLocalDate).m49 = function (_set____db54di) {
    this.k49_1 = _set____db54di;
  };
  protoOf(IncompleteLocalDate).n49 = function () {
    return this.k49_1;
  };
  protoOf(IncompleteLocalDate).k4c = function () {
    var date = LocalDate_init_$Create$(requireParsedField(this.h49_1, 'year'), requireParsedField(this.i49_1, 'monthNumber'), requireParsedField(this.j49_1, 'dayOfMonth'));
    var tmp0_safe_receiver = this.k49_1;
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      if (!(tmp0_safe_receiver === get_isoDayNumber(date.e4e()))) {
        throw DateTimeFormatException_init_$Create$_0('Can not create a LocalDate from the given input: ' + ('the day of week is ' + DayOfWeek(tmp0_safe_receiver).toString() + ' but the date is ' + date.toString() + ', which is a ' + date.e4e().toString()));
      }
    }
    return date;
  };
  protoOf(IncompleteLocalDate).y4a = function () {
    return new IncompleteLocalDate(this.h49_1, this.i49_1, this.j49_1, this.k49_1);
  };
  protoOf(IncompleteLocalDate).equals = function (other) {
    var tmp;
    var tmp_0;
    var tmp_1;
    var tmp_2;
    if (other instanceof IncompleteLocalDate) {
      tmp_2 = this.h49_1 == other.h49_1;
    } else {
      tmp_2 = false;
    }
    if (tmp_2) {
      tmp_1 = this.i49_1 == other.i49_1;
    } else {
      tmp_1 = false;
    }
    if (tmp_1) {
      tmp_0 = this.j49_1 == other.j49_1;
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      tmp = this.k49_1 == other.k49_1;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(IncompleteLocalDate).hashCode = function () {
    // Inline function 'kotlin.hashCode' call
    var tmp0_safe_receiver = this.h49_1;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : hashCode(tmp0_safe_receiver);
    var tmp$ret$0 = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
    var tmp = imul(tmp$ret$0, 31);
    // Inline function 'kotlin.hashCode' call
    var tmp0_safe_receiver_0 = this.i49_1;
    var tmp1_elvis_lhs_0 = tmp0_safe_receiver_0 == null ? null : hashCode(tmp0_safe_receiver_0);
    var tmp$ret$1 = tmp1_elvis_lhs_0 == null ? 0 : tmp1_elvis_lhs_0;
    var tmp_0 = tmp + imul(tmp$ret$1, 31) | 0;
    // Inline function 'kotlin.hashCode' call
    var tmp0_safe_receiver_1 = this.j49_1;
    var tmp1_elvis_lhs_1 = tmp0_safe_receiver_1 == null ? null : hashCode(tmp0_safe_receiver_1);
    var tmp$ret$2 = tmp1_elvis_lhs_1 == null ? 0 : tmp1_elvis_lhs_1;
    var tmp_1 = tmp_0 + imul(tmp$ret$2, 31) | 0;
    // Inline function 'kotlin.hashCode' call
    var tmp0_safe_receiver_2 = this.k49_1;
    var tmp1_elvis_lhs_2 = tmp0_safe_receiver_2 == null ? null : hashCode(tmp0_safe_receiver_2);
    var tmp$ret$3 = tmp1_elvis_lhs_2 == null ? 0 : tmp1_elvis_lhs_2;
    return tmp_1 + imul(tmp$ret$3, 31) | 0;
  };
  protoOf(IncompleteLocalDate).toString = function () {
    var tmp0_elvis_lhs = this.h49_1;
    var tmp = toString_0(tmp0_elvis_lhs == null ? '??' : tmp0_elvis_lhs);
    var tmp1_elvis_lhs = this.i49_1;
    var tmp_0 = toString_0(tmp1_elvis_lhs == null ? '??' : tmp1_elvis_lhs);
    var tmp2_elvis_lhs = this.j49_1;
    var tmp_1 = toString_0(tmp2_elvis_lhs == null ? '??' : tmp2_elvis_lhs);
    var tmp3_elvis_lhs = this.k49_1;
    return tmp + '-' + tmp_0 + '-' + tmp_1 + ' (day of week is ' + toString_0(tmp3_elvis_lhs == null ? '??' : tmp3_elvis_lhs) + ')';
  };
  function Companion_7() {
    Companion_instance_7 = this;
    this.h4b_1 = new MonthNames(listOf(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']));
    this.i4b_1 = new MonthNames(listOf(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']));
  }
  var Companion_instance_7;
  function Companion_getInstance_7() {
    if (Companion_instance_7 == null)
      new Companion_7();
    return Companion_instance_7;
  }
  function String$toString$ref() {
    var l = function (p0) {
      return toString_0(p0);
    };
    l.callableName = 'toString';
    return l;
  }
  function MonthNames(names) {
    Companion_getInstance_7();
    this.f4e_1 = names;
    // Inline function 'kotlin.require' call
    if (!(this.f4e_1.m() === 12)) {
      var message = 'Month names must contain exactly 12 elements';
      throw IllegalArgumentException_init_$Create$(toString_0(message));
    }
    // Inline function 'kotlin.collections.forEach' call
    var progression = get_indices(this.f4e_1);
    var inductionVariable = progression.c1_1;
    var last = progression.d1_1;
    if (inductionVariable <= last)
      do {
        var element = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var ix = element;
        // Inline function 'kotlin.text.isNotEmpty' call
        var this_0 = this.f4e_1.o(ix);
        // Inline function 'kotlin.require' call
        if (!(charSequenceLength(this_0) > 0)) {
          var message_0 = 'A month name can not be empty';
          throw IllegalArgumentException_init_$Create$(toString_0(message_0));
        }
        var inductionVariable_0 = 0;
        if (inductionVariable_0 < ix)
          do {
            var ix2 = inductionVariable_0;
            inductionVariable_0 = inductionVariable_0 + 1 | 0;
            // Inline function 'kotlin.require' call
            if (!!(this.f4e_1.o(ix) === this.f4e_1.o(ix2))) {
              var message_1 = "Month names must be unique, but '" + this.f4e_1.o(ix) + "' was repeated";
              throw IllegalArgumentException_init_$Create$(toString_0(message_1));
            }
          }
           while (inductionVariable_0 < ix);
      }
       while (!(element === last));
  }
  protoOf(MonthNames).toString = function () {
    return joinToString(this.f4e_1, ', ', 'MonthNames(', ')', VOID, VOID, String$toString$ref());
  };
  protoOf(MonthNames).equals = function (other) {
    var tmp;
    if (other instanceof MonthNames) {
      tmp = equals(this.f4e_1, other.f4e_1);
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(MonthNames).hashCode = function () {
    return hashCode(this.f4e_1);
  };
  function Companion_8() {
    Companion_instance_8 = this;
    this.m4b_1 = new DayOfWeekNames(listOf(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']));
    this.n4b_1 = new DayOfWeekNames(listOf(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']));
  }
  var Companion_instance_8;
  function Companion_getInstance_8() {
    if (Companion_instance_8 == null)
      new Companion_8();
    return Companion_instance_8;
  }
  function String$toString$ref_0() {
    var l = function (p0) {
      return toString_0(p0);
    };
    l.callableName = 'toString';
    return l;
  }
  function DayOfWeekNames(names) {
    Companion_getInstance_8();
    this.g4e_1 = names;
    // Inline function 'kotlin.require' call
    if (!(this.g4e_1.m() === 7)) {
      var message = 'Day of week names must contain exactly 7 elements';
      throw IllegalArgumentException_init_$Create$(toString_0(message));
    }
    // Inline function 'kotlin.collections.forEach' call
    var progression = get_indices(this.g4e_1);
    var inductionVariable = progression.c1_1;
    var last = progression.d1_1;
    if (inductionVariable <= last)
      do {
        var element = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var ix = element;
        // Inline function 'kotlin.text.isNotEmpty' call
        var this_0 = this.g4e_1.o(ix);
        // Inline function 'kotlin.require' call
        if (!(charSequenceLength(this_0) > 0)) {
          var message_0 = 'A day-of-week name can not be empty';
          throw IllegalArgumentException_init_$Create$(toString_0(message_0));
        }
        var inductionVariable_0 = 0;
        if (inductionVariable_0 < ix)
          do {
            var ix2 = inductionVariable_0;
            inductionVariable_0 = inductionVariable_0 + 1 | 0;
            // Inline function 'kotlin.require' call
            if (!!(this.g4e_1.o(ix) === this.g4e_1.o(ix2))) {
              var message_1 = "Day-of-week names must be unique, but '" + this.g4e_1.o(ix) + "' was repeated";
              throw IllegalArgumentException_init_$Create$(toString_0(message_1));
            }
          }
           while (inductionVariable_0 < ix);
      }
       while (!(element === last));
  }
  protoOf(DayOfWeekNames).toString = function () {
    return joinToString(this.g4e_1, ', ', 'DayOfWeekNames(', ')', VOID, VOID, String$toString$ref_0());
  };
  protoOf(DayOfWeekNames).equals = function (other) {
    var tmp;
    if (other instanceof DayOfWeekNames) {
      tmp = equals(this.g4e_1, other.g4e_1);
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(DayOfWeekNames).hashCode = function () {
    return hashCode(this.g4e_1);
  };
  function Companion_9() {
  }
  protoOf(Companion_9).h4e = function (block) {
    var builder = new Builder_0(new AppendableFormatStructure());
    block(builder);
    return new LocalDateFormat(builder.p2d());
  };
  var Companion_instance_9;
  function Companion_getInstance_9() {
    return Companion_instance_9;
  }
  function Builder_0(actualBuilder) {
    this.i4e_1 = actualBuilder;
  }
  protoOf(Builder_0).v4c = function () {
    return this.i4e_1;
  };
  protoOf(Builder_0).d4d = function (structure) {
    return this.i4e_1.y4c(structure);
  };
  protoOf(Builder_0).a4d = function () {
    return new Builder_0(new AppendableFormatStructure());
  };
  function LocalDateFormat(actualFormat) {
    AbstractDateTimeFormat.call(this);
    this.j4e_1 = actualFormat;
  }
  protoOf(LocalDateFormat).t4d = function () {
    return this.j4e_1;
  };
  protoOf(LocalDateFormat).k4e = function (intermediate) {
    return intermediate.k4c();
  };
  protoOf(LocalDateFormat).v4d = function (intermediate) {
    return this.k4e(intermediate instanceof IncompleteLocalDate ? intermediate : THROW_CCE());
  };
  protoOf(LocalDateFormat).w4d = function () {
    return get_emptyIncompleteLocalDate();
  };
  function requireParsedField(field, name) {
    _init_properties_LocalDateFormat_kt__k1uk9u();
    if (field == null) {
      throw DateTimeFormatException_init_$Create$_0('Can not create a ' + name + ' from the given input: the field ' + name + ' is missing');
    }
    return field;
  }
  function AbstractWithDateBuilder() {
  }
  function YearDirective(padding, isYearOfEra) {
    isYearOfEra = isYearOfEra === VOID ? false : isYearOfEra;
    var tmp = DateFields_getInstance().l4e_1;
    // Inline function 'kotlinx.datetime.format.minDigits' call
    var tmp_0 = padding.equals(Padding_ZERO_getInstance()) ? 4 : 1;
    // Inline function 'kotlinx.datetime.format.spaces' call
    var tmp$ret$1 = padding.equals(Padding_SPACE_getInstance()) ? 4 : null;
    SignedIntFieldFormatDirective.call(this, tmp, tmp_0, null, tmp$ret$1, 4);
    this.u4e_1 = padding;
    this.v4e_1 = isYearOfEra;
  }
  protoOf(YearDirective).equals = function (other) {
    var tmp;
    var tmp_0;
    if (other instanceof YearDirective) {
      tmp_0 = this.u4e_1.equals(other.u4e_1);
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      tmp = this.v4e_1 === other.v4e_1;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(YearDirective).hashCode = function () {
    return imul(this.u4e_1.hashCode(), 31) + getBooleanHashCode(this.v4e_1) | 0;
  };
  function MonthDirective(padding) {
    var tmp = DateFields_getInstance().m4e_1;
    // Inline function 'kotlinx.datetime.format.minDigits' call
    var tmp_0 = padding.equals(Padding_ZERO_getInstance()) ? 2 : 1;
    // Inline function 'kotlinx.datetime.format.spaces' call
    var tmp$ret$1 = padding.equals(Padding_SPACE_getInstance()) ? 2 : null;
    UnsignedIntFieldFormatDirective.call(this, tmp, tmp_0, tmp$ret$1);
    this.h4f_1 = padding;
  }
  protoOf(MonthDirective).equals = function (other) {
    var tmp;
    if (other instanceof MonthDirective) {
      tmp = this.h4f_1.equals(other.h4f_1);
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(MonthDirective).hashCode = function () {
    return this.h4f_1.hashCode();
  };
  function MonthNameDirective(names) {
    NamedUnsignedIntFieldFormatDirective.call(this, DateFields_getInstance().m4e_1, names.f4e_1, 'monthName');
    this.p4f_1 = names;
  }
  protoOf(MonthNameDirective).equals = function (other) {
    var tmp;
    if (other instanceof MonthNameDirective) {
      tmp = equals(this.p4f_1.f4e_1, other.p4f_1.f4e_1);
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(MonthNameDirective).hashCode = function () {
    return hashCode(this.p4f_1.f4e_1);
  };
  function DayDirective(padding) {
    var tmp = DateFields_getInstance().n4e_1;
    // Inline function 'kotlinx.datetime.format.minDigits' call
    var tmp_0 = padding.equals(Padding_ZERO_getInstance()) ? 2 : 1;
    // Inline function 'kotlinx.datetime.format.spaces' call
    var tmp$ret$1 = padding.equals(Padding_SPACE_getInstance()) ? 2 : null;
    UnsignedIntFieldFormatDirective.call(this, tmp, tmp_0, tmp$ret$1);
    this.x4f_1 = padding;
  }
  protoOf(DayDirective).equals = function (other) {
    var tmp;
    if (other instanceof DayDirective) {
      tmp = this.x4f_1.equals(other.x4f_1);
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(DayDirective).hashCode = function () {
    return this.x4f_1.hashCode();
  };
  function DayOfWeekDirective(names) {
    NamedUnsignedIntFieldFormatDirective.call(this, DateFields_getInstance().o4e_1, names.g4e_1, 'dayOfWeekName');
    this.b4g_1 = names;
  }
  protoOf(DayOfWeekDirective).equals = function (other) {
    var tmp;
    if (other instanceof DayOfWeekDirective) {
      tmp = equals(this.b4g_1.g4e_1, other.b4g_1.g4e_1);
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(DayOfWeekDirective).hashCode = function () {
    return hashCode(this.b4g_1.g4e_1);
  };
  function DateFields() {
    DateFields_instance = this;
    this.l4e_1 = new GenericFieldSpec(new PropertyAccessor(year$factory_2()));
    this.m4e_1 = new UnsignedFieldSpec(new PropertyAccessor(monthNumber$factory_0()), 1, 12);
    this.n4e_1 = new UnsignedFieldSpec(new PropertyAccessor(dayOfMonth$factory_0()), 1, 31);
    this.o4e_1 = new UnsignedFieldSpec(new PropertyAccessor(isoDayOfWeek$factory()), 1, 7);
  }
  var DateFields_instance;
  function DateFields_getInstance() {
    if (DateFields_instance == null)
      new DateFields();
    return DateFields_instance;
  }
  function ISO_DATE$delegate$lambda() {
    _init_properties_LocalDateFormat_kt__k1uk9u();
    var tmp = Companion_instance_9;
    return tmp.h4e(ISO_DATE$delegate$lambda$lambda);
  }
  function ISO_DATE$delegate$lambda$lambda($this$build) {
    _init_properties_LocalDateFormat_kt__k1uk9u();
    $this$build.k4b();
    char($this$build, _Char___init__impl__6a9atx(45));
    $this$build.h4d();
    char($this$build, _Char___init__impl__6a9atx(45));
    $this$build.i4d();
    return Unit_instance;
  }
  function ISO_DATE_BASIC$delegate$lambda() {
    _init_properties_LocalDateFormat_kt__k1uk9u();
    var tmp = Companion_instance_9;
    return tmp.h4e(ISO_DATE_BASIC$delegate$lambda$lambda);
  }
  function ISO_DATE_BASIC$delegate$lambda$lambda($this$build) {
    _init_properties_LocalDateFormat_kt__k1uk9u();
    $this$build.k4b();
    $this$build.h4d();
    $this$build.i4d();
    return Unit_instance;
  }
  function ISO_DATE$factory() {
    return getPropertyCallableRef('ISO_DATE', 0, KProperty0, function () {
      return get_ISO_DATE();
    }, null);
  }
  function ISO_DATE_BASIC$factory() {
    return getPropertyCallableRef('ISO_DATE_BASIC', 0, KProperty0, function () {
      return get_ISO_DATE_BASIC();
    }, null);
  }
  function year$factory_2() {
    return getPropertyCallableRef('year', 1, KMutableProperty1, function (receiver) {
      return receiver.r49();
    }, function (receiver, value) {
      return receiver.q49(value);
    });
  }
  function monthNumber$factory_0() {
    return getPropertyCallableRef('monthNumber', 1, KMutableProperty1, function (receiver) {
      return receiver.p49();
    }, function (receiver, value) {
      return receiver.o49(value);
    });
  }
  function dayOfMonth$factory_0() {
    return getPropertyCallableRef('dayOfMonth', 1, KMutableProperty1, function (receiver) {
      return receiver.l49();
    }, function (receiver, value) {
      return receiver.g49(value);
    });
  }
  function isoDayOfWeek$factory() {
    return getPropertyCallableRef('isoDayOfWeek', 1, KMutableProperty1, function (receiver) {
      return receiver.n49();
    }, function (receiver, value) {
      return receiver.m49(value);
    });
  }
  var properties_initialized_LocalDateFormat_kt_fmnlhc;
  function _init_properties_LocalDateFormat_kt__k1uk9u() {
    if (!properties_initialized_LocalDateFormat_kt_fmnlhc) {
      properties_initialized_LocalDateFormat_kt_fmnlhc = true;
      ISO_DATE$delegate = lazy(ISO_DATE$delegate$lambda);
      ISO_DATE_BASIC$delegate = lazy(ISO_DATE_BASIC$delegate$lambda);
      emptyIncompleteLocalDate = new IncompleteLocalDate();
    }
  }
  function get_ISO_DATETIME() {
    _init_properties_LocalDateTimeFormat_kt__aloigl();
    var tmp0 = ISO_DATETIME$delegate;
    // Inline function 'kotlin.getValue' call
    ISO_DATETIME$factory();
    return tmp0.w();
  }
  var ISO_DATETIME$delegate;
  function get_emptyIncompleteLocalDateTime() {
    _init_properties_LocalDateTimeFormat_kt__aloigl();
    return emptyIncompleteLocalDateTime;
  }
  var emptyIncompleteLocalDateTime;
  function Companion_10() {
  }
  protoOf(Companion_10).c4g = function (block) {
    var builder = new Builder_1(new AppendableFormatStructure());
    block(builder);
    return new LocalDateTimeFormat(builder.p2d());
  };
  var Companion_instance_10;
  function Companion_getInstance_10() {
    return Companion_instance_10;
  }
  function Builder_1(actualBuilder) {
    this.d4g_1 = actualBuilder;
  }
  protoOf(Builder_1).v4c = function () {
    return this.d4g_1;
  };
  protoOf(Builder_1).w4c = function (structure) {
    this.d4g_1.y4c(structure);
  };
  protoOf(Builder_1).a4d = function () {
    return new Builder_1(new AppendableFormatStructure());
  };
  function LocalDateTimeFormat(actualFormat) {
    AbstractDateTimeFormat.call(this);
    this.e4g_1 = actualFormat;
  }
  protoOf(LocalDateTimeFormat).t4d = function () {
    return this.e4g_1;
  };
  protoOf(LocalDateTimeFormat).f4g = function (intermediate) {
    return intermediate.i4g();
  };
  protoOf(LocalDateTimeFormat).v4d = function (intermediate) {
    return this.f4g(intermediate instanceof IncompleteLocalDateTime ? intermediate : THROW_CCE());
  };
  protoOf(LocalDateTimeFormat).w4d = function () {
    return get_emptyIncompleteLocalDateTime();
  };
  function IncompleteLocalDateTime(date, time) {
    date = date === VOID ? new IncompleteLocalDate() : date;
    time = time === VOID ? new IncompleteLocalTime() : time;
    this.g4g_1 = date;
    this.h4g_1 = time;
  }
  protoOf(IncompleteLocalDateTime).g49 = function (_set____db54di) {
    this.g4g_1.j49_1 = _set____db54di;
  };
  protoOf(IncompleteLocalDateTime).l49 = function () {
    return this.g4g_1.j49_1;
  };
  protoOf(IncompleteLocalDateTime).m49 = function (_set____db54di) {
    this.g4g_1.k49_1 = _set____db54di;
  };
  protoOf(IncompleteLocalDateTime).n49 = function () {
    return this.g4g_1.k49_1;
  };
  protoOf(IncompleteLocalDateTime).o49 = function (_set____db54di) {
    this.g4g_1.i49_1 = _set____db54di;
  };
  protoOf(IncompleteLocalDateTime).p49 = function () {
    return this.g4g_1.i49_1;
  };
  protoOf(IncompleteLocalDateTime).q49 = function (_set____db54di) {
    this.g4g_1.h49_1 = _set____db54di;
  };
  protoOf(IncompleteLocalDateTime).r49 = function () {
    return this.g4g_1.h49_1;
  };
  protoOf(IncompleteLocalDateTime).s49 = function (_set____db54di) {
    this.h4g_1.v49_1 = _set____db54di;
  };
  protoOf(IncompleteLocalDateTime).z49 = function () {
    return this.h4g_1.v49_1;
  };
  protoOf(IncompleteLocalDateTime).a4a = function (value) {
    this.h4g_1.a4a(value);
  };
  protoOf(IncompleteLocalDateTime).b4a = function () {
    return this.h4g_1.b4a();
  };
  protoOf(IncompleteLocalDateTime).c4a = function (_set____db54di) {
    this.h4g_1.t49_1 = _set____db54di;
  };
  protoOf(IncompleteLocalDateTime).d4a = function () {
    return this.h4g_1.t49_1;
  };
  protoOf(IncompleteLocalDateTime).e4a = function (_set____db54di) {
    this.h4g_1.u49_1 = _set____db54di;
  };
  protoOf(IncompleteLocalDateTime).f4a = function () {
    return this.h4g_1.u49_1;
  };
  protoOf(IncompleteLocalDateTime).g4a = function (_set____db54di) {
    this.h4g_1.w49_1 = _set____db54di;
  };
  protoOf(IncompleteLocalDateTime).h4a = function () {
    return this.h4g_1.w49_1;
  };
  protoOf(IncompleteLocalDateTime).i4a = function (_set____db54di) {
    this.h4g_1.y49_1 = _set____db54di;
  };
  protoOf(IncompleteLocalDateTime).j4a = function () {
    return this.h4g_1.y49_1;
  };
  protoOf(IncompleteLocalDateTime).k4a = function (_set____db54di) {
    this.h4g_1.x49_1 = _set____db54di;
  };
  protoOf(IncompleteLocalDateTime).l4a = function () {
    return this.h4g_1.x49_1;
  };
  protoOf(IncompleteLocalDateTime).i4g = function () {
    return LocalDateTime_init_$Create$(this.g4g_1.k4c(), this.h4g_1.i4c());
  };
  protoOf(IncompleteLocalDateTime).y4a = function () {
    return new IncompleteLocalDateTime(this.g4g_1.y4a(), this.h4g_1.y4a());
  };
  function AbstractWithDateTimeBuilder() {
  }
  function ISO_DATETIME$delegate$lambda() {
    _init_properties_LocalDateTimeFormat_kt__aloigl();
    var tmp = Companion_instance_10;
    return tmp.c4g(ISO_DATETIME$delegate$lambda$lambda);
  }
  function ISO_DATETIME$delegate$lambda$lambda($this$build) {
    _init_properties_LocalDateTimeFormat_kt__aloigl();
    $this$build.z4a(get_ISO_DATE());
    var tmp = [ISO_DATETIME$delegate$lambda$lambda$lambda];
    alternativeParsing($this$build, tmp, ISO_DATETIME$delegate$lambda$lambda$lambda_0);
    $this$build.m4d(get_ISO_TIME());
    return Unit_instance;
  }
  function ISO_DATETIME$delegate$lambda$lambda$lambda($this$alternativeParsing) {
    _init_properties_LocalDateTimeFormat_kt__aloigl();
    char($this$alternativeParsing, _Char___init__impl__6a9atx(116));
    return Unit_instance;
  }
  function ISO_DATETIME$delegate$lambda$lambda$lambda_0($this$alternativeParsing) {
    _init_properties_LocalDateTimeFormat_kt__aloigl();
    char($this$alternativeParsing, _Char___init__impl__6a9atx(84));
    return Unit_instance;
  }
  function ISO_DATETIME$factory() {
    return getPropertyCallableRef('ISO_DATETIME', 0, KProperty0, function () {
      return get_ISO_DATETIME();
    }, null);
  }
  var properties_initialized_LocalDateTimeFormat_kt_67ys6r;
  function _init_properties_LocalDateTimeFormat_kt__aloigl() {
    if (!properties_initialized_LocalDateTimeFormat_kt_67ys6r) {
      properties_initialized_LocalDateTimeFormat_kt_67ys6r = true;
      ISO_DATETIME$delegate = lazy(ISO_DATETIME$delegate$lambda);
      emptyIncompleteLocalDateTime = new IncompleteLocalDateTime();
    }
  }
  function get_ISO_TIME() {
    _init_properties_LocalTimeFormat_kt__5i3lfh();
    var tmp0 = ISO_TIME$delegate;
    // Inline function 'kotlin.getValue' call
    ISO_TIME$factory();
    return tmp0.w();
  }
  var ISO_TIME$delegate;
  function get_emptyIncompleteLocalTime() {
    _init_properties_LocalTimeFormat_kt__5i3lfh();
    return emptyIncompleteLocalTime;
  }
  var emptyIncompleteLocalTime;
  function TimeFieldContainer() {
  }
  function IncompleteLocalTime(hour, hourOfAmPm, amPm, minute, second, nanosecond) {
    hour = hour === VOID ? null : hour;
    hourOfAmPm = hourOfAmPm === VOID ? null : hourOfAmPm;
    amPm = amPm === VOID ? null : amPm;
    minute = minute === VOID ? null : minute;
    second = second === VOID ? null : second;
    nanosecond = nanosecond === VOID ? null : nanosecond;
    this.t49_1 = hour;
    this.u49_1 = hourOfAmPm;
    this.v49_1 = amPm;
    this.w49_1 = minute;
    this.x49_1 = second;
    this.y49_1 = nanosecond;
  }
  protoOf(IncompleteLocalTime).c4a = function (_set____db54di) {
    this.t49_1 = _set____db54di;
  };
  protoOf(IncompleteLocalTime).d4a = function () {
    return this.t49_1;
  };
  protoOf(IncompleteLocalTime).e4a = function (_set____db54di) {
    this.u49_1 = _set____db54di;
  };
  protoOf(IncompleteLocalTime).f4a = function () {
    return this.u49_1;
  };
  protoOf(IncompleteLocalTime).s49 = function (_set____db54di) {
    this.v49_1 = _set____db54di;
  };
  protoOf(IncompleteLocalTime).z49 = function () {
    return this.v49_1;
  };
  protoOf(IncompleteLocalTime).g4a = function (_set____db54di) {
    this.w49_1 = _set____db54di;
  };
  protoOf(IncompleteLocalTime).h4a = function () {
    return this.w49_1;
  };
  protoOf(IncompleteLocalTime).k4a = function (_set____db54di) {
    this.x49_1 = _set____db54di;
  };
  protoOf(IncompleteLocalTime).l4a = function () {
    return this.x49_1;
  };
  protoOf(IncompleteLocalTime).i4a = function (_set____db54di) {
    this.y49_1 = _set____db54di;
  };
  protoOf(IncompleteLocalTime).j4a = function () {
    return this.y49_1;
  };
  protoOf(IncompleteLocalTime).i4c = function () {
    var tmp0_safe_receiver = this.t49_1;
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      var tmp0_safe_receiver_0 = this.u49_1;
      if (tmp0_safe_receiver_0 == null)
        null;
      else {
        // Inline function 'kotlin.let' call
        // Inline function 'kotlin.require' call
        if (!((((tmp0_safe_receiver + 11 | 0) % 12 | 0) + 1 | 0) === tmp0_safe_receiver_0)) {
          var message = 'Inconsistent hour and hour-of-am-pm: hour is ' + tmp0_safe_receiver + ', but hour-of-am-pm is ' + tmp0_safe_receiver_0;
          throw IllegalArgumentException_init_$Create$(toString_0(message));
        }
      }
      var tmp1_safe_receiver = this.v49_1;
      if (tmp1_safe_receiver == null)
        null;
      else {
        // Inline function 'kotlin.let' call
        // Inline function 'kotlin.require' call
        if (!(tmp1_safe_receiver.equals(AmPmMarker_PM_getInstance()) === tmp0_safe_receiver >= 12)) {
          var message_0 = 'Inconsistent hour and the AM/PM marker: hour is ' + tmp0_safe_receiver + ', but the AM/PM marker is ' + tmp1_safe_receiver.toString();
          throw IllegalArgumentException_init_$Create$(toString_0(message_0));
        }
      }
      tmp = tmp0_safe_receiver;
    }
    var tmp2_elvis_lhs = tmp;
    var tmp_0;
    if (tmp2_elvis_lhs == null) {
      var tmp1_safe_receiver_0 = this.u49_1;
      var tmp_1;
      if (tmp1_safe_receiver_0 == null) {
        tmp_1 = null;
      } else {
        // Inline function 'kotlin.let' call
        var tmp0_safe_receiver_1 = this.v49_1;
        var tmp_2;
        if (tmp0_safe_receiver_1 == null) {
          tmp_2 = null;
        } else {
          // Inline function 'kotlin.let' call
          // Inline function 'kotlin.let' call
          tmp_2 = (tmp1_safe_receiver_0 === 12 ? 0 : tmp1_safe_receiver_0) + (tmp0_safe_receiver_1.equals(AmPmMarker_PM_getInstance()) ? 12 : 0) | 0;
        }
        tmp_1 = tmp_2;
      }
      tmp_0 = tmp_1;
    } else {
      tmp_0 = tmp2_elvis_lhs;
    }
    var tmp3_elvis_lhs = tmp_0;
    var tmp_3;
    if (tmp3_elvis_lhs == null) {
      throw DateTimeFormatException_init_$Create$_0('Incomplete time: missing hour');
    } else {
      tmp_3 = tmp3_elvis_lhs;
    }
    var hour = tmp_3;
    var tmp_4 = requireParsedField(this.w49_1, 'minute');
    var tmp4_elvis_lhs = this.x49_1;
    var tmp_5 = tmp4_elvis_lhs == null ? 0 : tmp4_elvis_lhs;
    var tmp5_elvis_lhs = this.y49_1;
    return LocalTime_init_$Create$(hour, tmp_4, tmp_5, tmp5_elvis_lhs == null ? 0 : tmp5_elvis_lhs);
  };
  protoOf(IncompleteLocalTime).y4a = function () {
    return new IncompleteLocalTime(this.t49_1, this.u49_1, this.v49_1, this.w49_1, this.x49_1, this.y49_1);
  };
  protoOf(IncompleteLocalTime).equals = function (other) {
    var tmp;
    var tmp_0;
    var tmp_1;
    var tmp_2;
    var tmp_3;
    var tmp_4;
    if (other instanceof IncompleteLocalTime) {
      tmp_4 = this.t49_1 == other.t49_1;
    } else {
      tmp_4 = false;
    }
    if (tmp_4) {
      tmp_3 = this.u49_1 == other.u49_1;
    } else {
      tmp_3 = false;
    }
    if (tmp_3) {
      tmp_2 = equals(this.v49_1, other.v49_1);
    } else {
      tmp_2 = false;
    }
    if (tmp_2) {
      tmp_1 = this.w49_1 == other.w49_1;
    } else {
      tmp_1 = false;
    }
    if (tmp_1) {
      tmp_0 = this.x49_1 == other.x49_1;
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      tmp = this.y49_1 == other.y49_1;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(IncompleteLocalTime).hashCode = function () {
    var tmp6_elvis_lhs = this.t49_1;
    var tmp = imul(tmp6_elvis_lhs == null ? 0 : tmp6_elvis_lhs, 31);
    var tmp5_elvis_lhs = this.u49_1;
    var tmp_0 = tmp + imul(tmp5_elvis_lhs == null ? 0 : tmp5_elvis_lhs, 31) | 0;
    var tmp3_safe_receiver = this.v49_1;
    var tmp4_elvis_lhs = tmp3_safe_receiver == null ? null : tmp3_safe_receiver.hashCode();
    var tmp_1 = tmp_0 + imul(tmp4_elvis_lhs == null ? 0 : tmp4_elvis_lhs, 31) | 0;
    var tmp2_elvis_lhs = this.w49_1;
    var tmp_2 = tmp_1 + imul(tmp2_elvis_lhs == null ? 0 : tmp2_elvis_lhs, 31) | 0;
    var tmp1_elvis_lhs = this.x49_1;
    var tmp_3 = tmp_2 + imul(tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs, 31) | 0;
    var tmp0_elvis_lhs = this.y49_1;
    return tmp_3 + (tmp0_elvis_lhs == null ? 0 : tmp0_elvis_lhs) | 0;
  };
  protoOf(IncompleteLocalTime).toString = function () {
    var tmp0_elvis_lhs = this.t49_1;
    var tmp = toString_0(tmp0_elvis_lhs == null ? '??' : tmp0_elvis_lhs);
    var tmp1_elvis_lhs = this.w49_1;
    var tmp_0 = toString_0(tmp1_elvis_lhs == null ? '??' : tmp1_elvis_lhs);
    var tmp2_elvis_lhs = this.x49_1;
    var tmp_1 = toString_0(tmp2_elvis_lhs == null ? '??' : tmp2_elvis_lhs);
    var tmp3_safe_receiver = this.y49_1;
    var tmp_2;
    if (tmp3_safe_receiver == null) {
      tmp_2 = null;
    } else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.let' call
      var it = tmp3_safe_receiver.toString();
      tmp_2 = padStart(it, 9 - it.length | 0, _Char___init__impl__6a9atx(48));
    }
    var tmp4_elvis_lhs = tmp_2;
    return tmp + ':' + tmp_0 + ':' + tmp_1 + '.' + (tmp4_elvis_lhs == null ? '???' : tmp4_elvis_lhs);
  };
  var AmPmMarker_AM_instance;
  var AmPmMarker_PM_instance;
  var AmPmMarker_entriesInitialized;
  function AmPmMarker_initEntries() {
    if (AmPmMarker_entriesInitialized)
      return Unit_instance;
    AmPmMarker_entriesInitialized = true;
    AmPmMarker_AM_instance = new AmPmMarker('AM', 0);
    AmPmMarker_PM_instance = new AmPmMarker('PM', 1);
  }
  function AmPmMarker(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function Companion_11() {
  }
  protoOf(Companion_11).m4g = function (block) {
    var builder = new Builder_2(new AppendableFormatStructure());
    block(builder);
    return new LocalTimeFormat(builder.p2d());
  };
  var Companion_instance_11;
  function Companion_getInstance_11() {
    return Companion_instance_11;
  }
  function Builder_2(actualBuilder) {
    this.n4g_1 = actualBuilder;
  }
  protoOf(Builder_2).v4c = function () {
    return this.n4g_1;
  };
  protoOf(Builder_2).e4d = function (structure) {
    this.n4g_1.y4c(structure);
  };
  protoOf(Builder_2).a4d = function () {
    return new Builder_2(new AppendableFormatStructure());
  };
  function LocalTimeFormat(actualFormat) {
    AbstractDateTimeFormat.call(this);
    this.o4g_1 = actualFormat;
  }
  protoOf(LocalTimeFormat).t4d = function () {
    return this.o4g_1;
  };
  protoOf(LocalTimeFormat).p4g = function (intermediate) {
    return intermediate.i4c();
  };
  protoOf(LocalTimeFormat).v4d = function (intermediate) {
    return this.p4g(intermediate instanceof IncompleteLocalTime ? intermediate : THROW_CCE());
  };
  protoOf(LocalTimeFormat).w4d = function () {
    return get_emptyIncompleteLocalTime();
  };
  function AbstractWithTimeBuilder() {
  }
  function HourDirective(padding) {
    var tmp = TimeFields_getInstance().q4g_1;
    // Inline function 'kotlinx.datetime.format.minDigits' call
    var tmp_0 = padding.equals(Padding_ZERO_getInstance()) ? 2 : 1;
    // Inline function 'kotlinx.datetime.format.spaces' call
    var tmp$ret$1 = padding.equals(Padding_SPACE_getInstance()) ? 2 : null;
    UnsignedIntFieldFormatDirective.call(this, tmp, tmp_0, tmp$ret$1);
    this.a4h_1 = padding;
  }
  protoOf(HourDirective).equals = function (other) {
    var tmp;
    if (other instanceof HourDirective) {
      tmp = this.a4h_1.equals(other.a4h_1);
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(HourDirective).hashCode = function () {
    return this.a4h_1.hashCode();
  };
  function MinuteDirective(padding) {
    var tmp = TimeFields_getInstance().r4g_1;
    // Inline function 'kotlinx.datetime.format.minDigits' call
    var tmp_0 = padding.equals(Padding_ZERO_getInstance()) ? 2 : 1;
    // Inline function 'kotlinx.datetime.format.spaces' call
    var tmp$ret$1 = padding.equals(Padding_SPACE_getInstance()) ? 2 : null;
    UnsignedIntFieldFormatDirective.call(this, tmp, tmp_0, tmp$ret$1);
    this.f4h_1 = padding;
  }
  protoOf(MinuteDirective).equals = function (other) {
    var tmp;
    if (other instanceof MinuteDirective) {
      tmp = this.f4h_1.equals(other.f4h_1);
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(MinuteDirective).hashCode = function () {
    return this.f4h_1.hashCode();
  };
  function SecondDirective(padding) {
    var tmp = TimeFields_getInstance().s4g_1;
    // Inline function 'kotlinx.datetime.format.minDigits' call
    var tmp_0 = padding.equals(Padding_ZERO_getInstance()) ? 2 : 1;
    // Inline function 'kotlinx.datetime.format.spaces' call
    var tmp$ret$1 = padding.equals(Padding_SPACE_getInstance()) ? 2 : null;
    UnsignedIntFieldFormatDirective.call(this, tmp, tmp_0, tmp$ret$1);
    this.k4h_1 = padding;
  }
  protoOf(SecondDirective).equals = function (other) {
    var tmp;
    if (other instanceof SecondDirective) {
      tmp = this.k4h_1.equals(other.k4h_1);
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(SecondDirective).hashCode = function () {
    return this.k4h_1.hashCode();
  };
  function Companion_12() {
    Companion_instance_12 = this;
    this.l4h_1 = listOf([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    this.m4h_1 = listOf([2, 1, 0, 2, 1, 0, 2, 1, 0]);
  }
  var Companion_instance_12;
  function Companion_getInstance_12() {
    if (Companion_instance_12 == null)
      new Companion_12();
    return Companion_instance_12;
  }
  function FractionalSecondDirective(minDigits, maxDigits, zerosToAdd) {
    Companion_getInstance_12();
    zerosToAdd = zerosToAdd === VOID ? Companion_getInstance_12().l4h_1 : zerosToAdd;
    DecimalFractionFieldFormatDirective.call(this, TimeFields_getInstance().t4g_1, minDigits, maxDigits, zerosToAdd);
    this.r4h_1 = minDigits;
    this.s4h_1 = maxDigits;
  }
  protoOf(FractionalSecondDirective).equals = function (other) {
    var tmp;
    var tmp_0;
    if (other instanceof FractionalSecondDirective) {
      tmp_0 = this.r4h_1 === other.r4h_1;
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      tmp = this.s4h_1 === other.s4h_1;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(FractionalSecondDirective).hashCode = function () {
    return imul(31, this.r4h_1) + this.s4h_1 | 0;
  };
  function TimeFields() {
    TimeFields_instance = this;
    this.q4g_1 = new UnsignedFieldSpec(new PropertyAccessor(hour$factory_0()), 0, 23);
    this.r4g_1 = new UnsignedFieldSpec(new PropertyAccessor(minute$factory_0()), 0, 59);
    this.s4g_1 = new UnsignedFieldSpec(new PropertyAccessor(second$factory_0()), 0, 59, VOID, 0);
    this.t4g_1 = new GenericFieldSpec(new PropertyAccessor(fractionOfSecond$factory()), VOID, new DecimalFraction(0, 9));
    this.u4g_1 = new GenericFieldSpec(new PropertyAccessor(amPm$factory_0()));
    this.v4g_1 = new UnsignedFieldSpec(new PropertyAccessor(hourOfAmPm$factory_0()), 1, 12);
  }
  var TimeFields_instance;
  function TimeFields_getInstance() {
    if (TimeFields_instance == null)
      new TimeFields();
    return TimeFields_instance;
  }
  function ISO_TIME$delegate$lambda() {
    _init_properties_LocalTimeFormat_kt__5i3lfh();
    var tmp = Companion_instance_11;
    return tmp.m4g(ISO_TIME$delegate$lambda$lambda);
  }
  function ISO_TIME$delegate$lambda$lambda($this$build) {
    _init_properties_LocalTimeFormat_kt__5i3lfh();
    $this$build.a4b();
    char($this$build, _Char___init__impl__6a9atx(58));
    $this$build.b4b();
    var tmp = [ISO_TIME$delegate$lambda$lambda$lambda];
    alternativeParsing($this$build, tmp, ISO_TIME$delegate$lambda$lambda$lambda_0);
    return Unit_instance;
  }
  function ISO_TIME$delegate$lambda$lambda$lambda($this$alternativeParsing) {
    _init_properties_LocalTimeFormat_kt__5i3lfh();
    return Unit_instance;
  }
  function ISO_TIME$delegate$lambda$lambda$lambda_0($this$alternativeParsing) {
    _init_properties_LocalTimeFormat_kt__5i3lfh();
    char($this$alternativeParsing, _Char___init__impl__6a9atx(58));
    $this$alternativeParsing.c4b();
    optional($this$alternativeParsing, VOID, ISO_TIME$delegate$lambda$lambda$lambda$lambda);
    return Unit_instance;
  }
  function ISO_TIME$delegate$lambda$lambda$lambda$lambda($this$optional) {
    _init_properties_LocalTimeFormat_kt__5i3lfh();
    char($this$optional, _Char___init__impl__6a9atx(46));
    $this$optional.d4b(1, 9);
    return Unit_instance;
  }
  function AmPmMarker_PM_getInstance() {
    AmPmMarker_initEntries();
    return AmPmMarker_PM_instance;
  }
  function ISO_TIME$factory() {
    return getPropertyCallableRef('ISO_TIME', 0, KProperty0, function () {
      return get_ISO_TIME();
    }, null);
  }
  function hour$factory_0() {
    return getPropertyCallableRef('hour', 1, KMutableProperty1, function (receiver) {
      return receiver.d4a();
    }, function (receiver, value) {
      return receiver.c4a(value);
    });
  }
  function minute$factory_0() {
    return getPropertyCallableRef('minute', 1, KMutableProperty1, function (receiver) {
      return receiver.h4a();
    }, function (receiver, value) {
      return receiver.g4a(value);
    });
  }
  function second$factory_0() {
    return getPropertyCallableRef('second', 1, KMutableProperty1, function (receiver) {
      return receiver.l4a();
    }, function (receiver, value) {
      return receiver.k4a(value);
    });
  }
  function fractionOfSecond$factory() {
    return getPropertyCallableRef('fractionOfSecond', 1, KMutableProperty1, function (receiver) {
      return receiver.b4a();
    }, function (receiver, value) {
      return receiver.a4a(value);
    });
  }
  function amPm$factory_0() {
    return getPropertyCallableRef('amPm', 1, KMutableProperty1, function (receiver) {
      return receiver.z49();
    }, function (receiver, value) {
      return receiver.s49(value);
    });
  }
  function hourOfAmPm$factory_0() {
    return getPropertyCallableRef('hourOfAmPm', 1, KMutableProperty1, function (receiver) {
      return receiver.f4a();
    }, function (receiver, value) {
      return receiver.e4a(value);
    });
  }
  var properties_initialized_LocalTimeFormat_kt_l1b0w1;
  function _init_properties_LocalTimeFormat_kt__5i3lfh() {
    if (!properties_initialized_LocalTimeFormat_kt_l1b0w1) {
      properties_initialized_LocalTimeFormat_kt_l1b0w1 = true;
      ISO_TIME$delegate = lazy(ISO_TIME$delegate$lambda);
      emptyIncompleteLocalTime = new IncompleteLocalTime();
    }
  }
  function get_ISO_OFFSET() {
    _init_properties_UtcOffsetFormat_kt__9r9ddw();
    var tmp0 = ISO_OFFSET$delegate;
    // Inline function 'kotlin.getValue' call
    ISO_OFFSET$factory();
    return tmp0.w();
  }
  var ISO_OFFSET$delegate;
  function get_ISO_OFFSET_BASIC() {
    _init_properties_UtcOffsetFormat_kt__9r9ddw();
    var tmp0 = ISO_OFFSET_BASIC$delegate;
    // Inline function 'kotlin.getValue' call
    ISO_OFFSET_BASIC$factory();
    return tmp0.w();
  }
  var ISO_OFFSET_BASIC$delegate;
  function get_FOUR_DIGIT_OFFSET() {
    _init_properties_UtcOffsetFormat_kt__9r9ddw();
    var tmp0 = FOUR_DIGIT_OFFSET$delegate;
    // Inline function 'kotlin.getValue' call
    FOUR_DIGIT_OFFSET$factory();
    return tmp0.w();
  }
  var FOUR_DIGIT_OFFSET$delegate;
  function get_emptyIncompleteUtcOffset() {
    _init_properties_UtcOffsetFormat_kt__9r9ddw();
    return emptyIncompleteUtcOffset;
  }
  var emptyIncompleteUtcOffset;
  function UtcOffsetFieldContainer() {
  }
  function IncompleteUtcOffset(isNegative, totalHoursAbs, minutesOfHour, secondsOfMinute) {
    isNegative = isNegative === VOID ? null : isNegative;
    totalHoursAbs = totalHoursAbs === VOID ? null : totalHoursAbs;
    minutesOfHour = minutesOfHour === VOID ? null : minutesOfHour;
    secondsOfMinute = secondsOfMinute === VOID ? null : secondsOfMinute;
    this.n4a_1 = isNegative;
    this.o4a_1 = totalHoursAbs;
    this.p4a_1 = minutesOfHour;
    this.q4a_1 = secondsOfMinute;
  }
  protoOf(IncompleteUtcOffset).m4a = function (_set____db54di) {
    this.n4a_1 = _set____db54di;
  };
  protoOf(IncompleteUtcOffset).r4a = function () {
    return this.n4a_1;
  };
  protoOf(IncompleteUtcOffset).w4a = function (_set____db54di) {
    this.o4a_1 = _set____db54di;
  };
  protoOf(IncompleteUtcOffset).x4a = function () {
    return this.o4a_1;
  };
  protoOf(IncompleteUtcOffset).s4a = function (_set____db54di) {
    this.p4a_1 = _set____db54di;
  };
  protoOf(IncompleteUtcOffset).t4a = function () {
    return this.p4a_1;
  };
  protoOf(IncompleteUtcOffset).u4a = function (_set____db54di) {
    this.q4a_1 = _set____db54di;
  };
  protoOf(IncompleteUtcOffset).v4a = function () {
    return this.q4a_1;
  };
  protoOf(IncompleteUtcOffset).h4c = function () {
    var sign = this.n4a_1 === true ? -1 : 1;
    var tmp0_safe_receiver = this.o4a_1;
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      tmp = imul(tmp0_safe_receiver, sign);
    }
    var tmp_0 = tmp;
    var tmp1_safe_receiver = this.p4a_1;
    var tmp_1;
    if (tmp1_safe_receiver == null) {
      tmp_1 = null;
    } else {
      // Inline function 'kotlin.let' call
      tmp_1 = imul(tmp1_safe_receiver, sign);
    }
    var tmp_2 = tmp_1;
    var tmp2_safe_receiver = this.q4a_1;
    var tmp_3;
    if (tmp2_safe_receiver == null) {
      tmp_3 = null;
    } else {
      // Inline function 'kotlin.let' call
      tmp_3 = imul(tmp2_safe_receiver, sign);
    }
    return UtcOffset_0(tmp_0, tmp_2, tmp_3);
  };
  protoOf(IncompleteUtcOffset).equals = function (other) {
    var tmp;
    var tmp_0;
    var tmp_1;
    var tmp_2;
    if (other instanceof IncompleteUtcOffset) {
      tmp_2 = this.n4a_1 == other.n4a_1;
    } else {
      tmp_2 = false;
    }
    if (tmp_2) {
      tmp_1 = this.o4a_1 == other.o4a_1;
    } else {
      tmp_1 = false;
    }
    if (tmp_1) {
      tmp_0 = this.p4a_1 == other.p4a_1;
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      tmp = this.q4a_1 == other.q4a_1;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(IncompleteUtcOffset).hashCode = function () {
    // Inline function 'kotlin.hashCode' call
    var tmp0_safe_receiver = this.n4a_1;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : hashCode(tmp0_safe_receiver);
    var tmp = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
    // Inline function 'kotlin.hashCode' call
    var tmp0_safe_receiver_0 = this.o4a_1;
    var tmp1_elvis_lhs_0 = tmp0_safe_receiver_0 == null ? null : hashCode(tmp0_safe_receiver_0);
    var tmp_0 = tmp + (tmp1_elvis_lhs_0 == null ? 0 : tmp1_elvis_lhs_0) | 0;
    // Inline function 'kotlin.hashCode' call
    var tmp0_safe_receiver_1 = this.p4a_1;
    var tmp1_elvis_lhs_1 = tmp0_safe_receiver_1 == null ? null : hashCode(tmp0_safe_receiver_1);
    var tmp_1 = tmp_0 + (tmp1_elvis_lhs_1 == null ? 0 : tmp1_elvis_lhs_1) | 0;
    // Inline function 'kotlin.hashCode' call
    var tmp0_safe_receiver_2 = this.q4a_1;
    var tmp1_elvis_lhs_2 = tmp0_safe_receiver_2 == null ? null : hashCode(tmp0_safe_receiver_2);
    return tmp_1 + (tmp1_elvis_lhs_2 == null ? 0 : tmp1_elvis_lhs_2) | 0;
  };
  protoOf(IncompleteUtcOffset).y4a = function () {
    return new IncompleteUtcOffset(this.n4a_1, this.o4a_1, this.p4a_1, this.q4a_1);
  };
  protoOf(IncompleteUtcOffset).toString = function () {
    var tmp0_safe_receiver = this.n4a_1;
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      tmp = tmp0_safe_receiver ? '-' : '+';
    }
    var tmp1_elvis_lhs = tmp;
    var tmp_0 = tmp1_elvis_lhs == null ? ' ' : tmp1_elvis_lhs;
    var tmp2_elvis_lhs = this.o4a_1;
    var tmp_1 = toString_0(tmp2_elvis_lhs == null ? '??' : tmp2_elvis_lhs);
    var tmp3_elvis_lhs = this.p4a_1;
    var tmp_2 = toString_0(tmp3_elvis_lhs == null ? '??' : tmp3_elvis_lhs);
    var tmp4_elvis_lhs = this.q4a_1;
    return tmp_0 + tmp_1 + ':' + tmp_2 + ':' + toString_0(tmp4_elvis_lhs == null ? '??' : tmp4_elvis_lhs);
  };
  function UtcOffsetWholeHoursDirective(padding) {
    var tmp = OffsetFields_getInstance().y4h_1;
    // Inline function 'kotlinx.datetime.format.minDigits' call
    var tmp_0 = padding.equals(Padding_ZERO_getInstance()) ? 2 : 1;
    // Inline function 'kotlinx.datetime.format.spaces' call
    var tmp$ret$1 = padding.equals(Padding_SPACE_getInstance()) ? 2 : null;
    UnsignedIntFieldFormatDirective.call(this, tmp, tmp_0, tmp$ret$1);
    this.f4i_1 = padding;
  }
  protoOf(UtcOffsetWholeHoursDirective).equals = function (other) {
    var tmp;
    if (other instanceof UtcOffsetWholeHoursDirective) {
      tmp = this.f4i_1.equals(other.f4i_1);
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(UtcOffsetWholeHoursDirective).hashCode = function () {
    return this.f4i_1.hashCode();
  };
  function Companion_13() {
  }
  protoOf(Companion_13).g4i = function (block) {
    var builder = new Builder_3(new AppendableFormatStructure());
    block(builder);
    return new UtcOffsetFormat(builder.p2d());
  };
  var Companion_instance_13;
  function Companion_getInstance_13() {
    return Companion_instance_13;
  }
  function Builder_3(actualBuilder) {
    this.h4i_1 = actualBuilder;
  }
  protoOf(Builder_3).v4c = function () {
    return this.h4i_1;
  };
  protoOf(Builder_3).z4c = function (structure) {
    this.h4i_1.y4c(structure);
  };
  protoOf(Builder_3).a4d = function () {
    return new Builder_3(new AppendableFormatStructure());
  };
  function UtcOffsetFormat(actualFormat) {
    AbstractDateTimeFormat.call(this);
    this.i4i_1 = actualFormat;
  }
  protoOf(UtcOffsetFormat).t4d = function () {
    return this.i4i_1;
  };
  protoOf(UtcOffsetFormat).j4i = function (intermediate) {
    return intermediate.h4c();
  };
  protoOf(UtcOffsetFormat).v4d = function (intermediate) {
    return this.j4i(intermediate instanceof IncompleteUtcOffset ? intermediate : THROW_CCE());
  };
  protoOf(UtcOffsetFormat).w4d = function () {
    return get_emptyIncompleteUtcOffset();
  };
  function OffsetFields$sign$1() {
    this.k4i_1 = new PropertyAccessor(isNegative$factory_0());
  }
  protoOf(OffsetFields$sign$1).r4a = function () {
    return this.k4i_1;
  };
  protoOf(OffsetFields$sign$1).l4i = function (obj) {
    var tmp;
    var tmp_0;
    var tmp0_elvis_lhs = obj.x4a();
    if ((tmp0_elvis_lhs == null ? 0 : tmp0_elvis_lhs) === 0) {
      var tmp1_elvis_lhs = obj.t4a();
      tmp_0 = (tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs) === 0;
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      var tmp2_elvis_lhs = obj.v4a();
      tmp = (tmp2_elvis_lhs == null ? 0 : tmp2_elvis_lhs) === 0;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(OffsetFields$sign$1).m4i = function (obj) {
    return this.l4i((!(obj == null) ? isInterface(obj, UtcOffsetFieldContainer) : false) ? obj : THROW_CCE());
  };
  function OffsetFields() {
    OffsetFields_instance = this;
    var tmp = this;
    tmp.x4h_1 = new OffsetFields$sign$1();
    var tmp_0 = this;
    var tmp0_accessor = new PropertyAccessor(totalHoursAbs$factory_0());
    var tmp1_sign = this.x4h_1;
    tmp_0.y4h_1 = new UnsignedFieldSpec(tmp0_accessor, 0, 18, VOID, 0, tmp1_sign);
    var tmp_1 = this;
    var tmp0_accessor_0 = new PropertyAccessor(minutesOfHour$factory_0());
    var tmp1_sign_0 = this.x4h_1;
    tmp_1.z4h_1 = new UnsignedFieldSpec(tmp0_accessor_0, 0, 59, VOID, 0, tmp1_sign_0);
    var tmp_2 = this;
    var tmp0_accessor_1 = new PropertyAccessor(secondsOfMinute$factory_0());
    var tmp1_sign_1 = this.x4h_1;
    tmp_2.a4i_1 = new UnsignedFieldSpec(tmp0_accessor_1, 0, 59, VOID, 0, tmp1_sign_1);
  }
  var OffsetFields_instance;
  function OffsetFields_getInstance() {
    if (OffsetFields_instance == null)
      new OffsetFields();
    return OffsetFields_instance;
  }
  function AbstractWithOffsetBuilder() {
  }
  function UtcOffsetMinuteOfHourDirective(padding) {
    var tmp = OffsetFields_getInstance().z4h_1;
    // Inline function 'kotlinx.datetime.format.minDigits' call
    var tmp_0 = padding.equals(Padding_ZERO_getInstance()) ? 2 : 1;
    // Inline function 'kotlinx.datetime.format.spaces' call
    var tmp$ret$1 = padding.equals(Padding_SPACE_getInstance()) ? 2 : null;
    UnsignedIntFieldFormatDirective.call(this, tmp, tmp_0, tmp$ret$1);
    this.r4i_1 = padding;
  }
  protoOf(UtcOffsetMinuteOfHourDirective).equals = function (other) {
    var tmp;
    if (other instanceof UtcOffsetMinuteOfHourDirective) {
      tmp = this.r4i_1.equals(other.r4i_1);
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(UtcOffsetMinuteOfHourDirective).hashCode = function () {
    return this.r4i_1.hashCode();
  };
  function UtcOffsetSecondOfMinuteDirective(padding) {
    var tmp = OffsetFields_getInstance().a4i_1;
    // Inline function 'kotlinx.datetime.format.minDigits' call
    var tmp_0 = padding.equals(Padding_ZERO_getInstance()) ? 2 : 1;
    // Inline function 'kotlinx.datetime.format.spaces' call
    var tmp$ret$1 = padding.equals(Padding_SPACE_getInstance()) ? 2 : null;
    UnsignedIntFieldFormatDirective.call(this, tmp, tmp_0, tmp$ret$1);
    this.w4i_1 = padding;
  }
  protoOf(UtcOffsetSecondOfMinuteDirective).equals = function (other) {
    var tmp;
    if (other instanceof UtcOffsetSecondOfMinuteDirective) {
      tmp = this.w4i_1.equals(other.w4i_1);
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(UtcOffsetSecondOfMinuteDirective).hashCode = function () {
    return this.w4i_1.hashCode();
  };
  function ISO_OFFSET$delegate$lambda() {
    _init_properties_UtcOffsetFormat_kt__9r9ddw();
    var tmp = Companion_instance_13;
    return tmp.g4i(ISO_OFFSET$delegate$lambda$lambda);
  }
  function ISO_OFFSET$delegate$lambda$lambda($this$build) {
    _init_properties_UtcOffsetFormat_kt__9r9ddw();
    var tmp = [ISO_OFFSET$delegate$lambda$lambda$lambda];
    alternativeParsing($this$build, tmp, ISO_OFFSET$delegate$lambda$lambda$lambda_0);
    return Unit_instance;
  }
  function ISO_OFFSET$delegate$lambda$lambda$lambda($this$alternativeParsing) {
    _init_properties_UtcOffsetFormat_kt__9r9ddw();
    $this$alternativeParsing.l4b('z');
    return Unit_instance;
  }
  function ISO_OFFSET$delegate$lambda$lambda$lambda_0($this$alternativeParsing) {
    _init_properties_UtcOffsetFormat_kt__9r9ddw();
    optional($this$alternativeParsing, 'Z', ISO_OFFSET$delegate$lambda$lambda$lambda$lambda);
    return Unit_instance;
  }
  function ISO_OFFSET$delegate$lambda$lambda$lambda$lambda($this$optional) {
    _init_properties_UtcOffsetFormat_kt__9r9ddw();
    $this$optional.e4b();
    char($this$optional, _Char___init__impl__6a9atx(58));
    $this$optional.p4d();
    optional($this$optional, VOID, ISO_OFFSET$delegate$lambda$lambda$lambda$lambda$lambda);
    return Unit_instance;
  }
  function ISO_OFFSET$delegate$lambda$lambda$lambda$lambda$lambda($this$optional) {
    _init_properties_UtcOffsetFormat_kt__9r9ddw();
    char($this$optional, _Char___init__impl__6a9atx(58));
    $this$optional.r4d();
    return Unit_instance;
  }
  function ISO_OFFSET_BASIC$delegate$lambda() {
    _init_properties_UtcOffsetFormat_kt__9r9ddw();
    var tmp = Companion_instance_13;
    return tmp.g4i(ISO_OFFSET_BASIC$delegate$lambda$lambda);
  }
  function ISO_OFFSET_BASIC$delegate$lambda$lambda($this$build) {
    _init_properties_UtcOffsetFormat_kt__9r9ddw();
    var tmp = [ISO_OFFSET_BASIC$delegate$lambda$lambda$lambda];
    alternativeParsing($this$build, tmp, ISO_OFFSET_BASIC$delegate$lambda$lambda$lambda_0);
    return Unit_instance;
  }
  function ISO_OFFSET_BASIC$delegate$lambda$lambda$lambda($this$alternativeParsing) {
    _init_properties_UtcOffsetFormat_kt__9r9ddw();
    $this$alternativeParsing.l4b('z');
    return Unit_instance;
  }
  function ISO_OFFSET_BASIC$delegate$lambda$lambda$lambda_0($this$alternativeParsing) {
    _init_properties_UtcOffsetFormat_kt__9r9ddw();
    optional($this$alternativeParsing, 'Z', ISO_OFFSET_BASIC$delegate$lambda$lambda$lambda$lambda);
    return Unit_instance;
  }
  function ISO_OFFSET_BASIC$delegate$lambda$lambda$lambda$lambda($this$optional) {
    _init_properties_UtcOffsetFormat_kt__9r9ddw();
    $this$optional.e4b();
    optional($this$optional, VOID, ISO_OFFSET_BASIC$delegate$lambda$lambda$lambda$lambda$lambda);
    return Unit_instance;
  }
  function ISO_OFFSET_BASIC$delegate$lambda$lambda$lambda$lambda$lambda($this$optional) {
    _init_properties_UtcOffsetFormat_kt__9r9ddw();
    $this$optional.p4d();
    optional($this$optional, VOID, ISO_OFFSET_BASIC$delegate$lambda$lambda$lambda$lambda$lambda$lambda);
    return Unit_instance;
  }
  function ISO_OFFSET_BASIC$delegate$lambda$lambda$lambda$lambda$lambda$lambda($this$optional) {
    _init_properties_UtcOffsetFormat_kt__9r9ddw();
    $this$optional.r4d();
    return Unit_instance;
  }
  function FOUR_DIGIT_OFFSET$delegate$lambda() {
    _init_properties_UtcOffsetFormat_kt__9r9ddw();
    var tmp = Companion_instance_13;
    return tmp.g4i(FOUR_DIGIT_OFFSET$delegate$lambda$lambda);
  }
  function FOUR_DIGIT_OFFSET$delegate$lambda$lambda($this$build) {
    _init_properties_UtcOffsetFormat_kt__9r9ddw();
    $this$build.e4b();
    $this$build.p4d();
    return Unit_instance;
  }
  function ISO_OFFSET$factory() {
    return getPropertyCallableRef('ISO_OFFSET', 0, KProperty0, function () {
      return get_ISO_OFFSET();
    }, null);
  }
  function ISO_OFFSET_BASIC$factory() {
    return getPropertyCallableRef('ISO_OFFSET_BASIC', 0, KProperty0, function () {
      return get_ISO_OFFSET_BASIC();
    }, null);
  }
  function FOUR_DIGIT_OFFSET$factory() {
    return getPropertyCallableRef('FOUR_DIGIT_OFFSET', 0, KProperty0, function () {
      return get_FOUR_DIGIT_OFFSET();
    }, null);
  }
  function totalHoursAbs$factory_0() {
    return getPropertyCallableRef('totalHoursAbs', 1, KMutableProperty1, function (receiver) {
      return receiver.x4a();
    }, function (receiver, value) {
      return receiver.w4a(value);
    });
  }
  function minutesOfHour$factory_0() {
    return getPropertyCallableRef('minutesOfHour', 1, KMutableProperty1, function (receiver) {
      return receiver.t4a();
    }, function (receiver, value) {
      return receiver.s4a(value);
    });
  }
  function secondsOfMinute$factory_0() {
    return getPropertyCallableRef('secondsOfMinute', 1, KMutableProperty1, function (receiver) {
      return receiver.v4a();
    }, function (receiver, value) {
      return receiver.u4a(value);
    });
  }
  function isNegative$factory_0() {
    return getPropertyCallableRef('isNegative', 1, KMutableProperty1, function (receiver) {
      return receiver.r4a();
    }, function (receiver, value) {
      return receiver.m4a(value);
    });
  }
  var properties_initialized_UtcOffsetFormat_kt_6y9jku;
  function _init_properties_UtcOffsetFormat_kt__9r9ddw() {
    if (!properties_initialized_UtcOffsetFormat_kt_6y9jku) {
      properties_initialized_UtcOffsetFormat_kt_6y9jku = true;
      ISO_OFFSET$delegate = lazy(ISO_OFFSET$delegate$lambda);
      ISO_OFFSET_BASIC$delegate = lazy(ISO_OFFSET_BASIC$delegate$lambda);
      FOUR_DIGIT_OFFSET$delegate = lazy(FOUR_DIGIT_OFFSET$delegate$lambda);
      emptyIncompleteUtcOffset = new IncompleteUtcOffset();
    }
  }
  function AppendableFormatStructure() {
    var tmp = this;
    // Inline function 'kotlin.collections.mutableListOf' call
    tmp.x4c_1 = ArrayList_init_$Create$_0();
  }
  protoOf(AppendableFormatStructure).p2d = function () {
    return new ConcatenatedFormatStructure(this.x4c_1);
  };
  protoOf(AppendableFormatStructure).y4c = function (format) {
    if (isInterface(format, NonConcatenatedFormatStructure)) {
      this.x4c_1.e(format);
    } else {
      if (format instanceof ConcatenatedFormatStructure) {
        // Inline function 'kotlin.collections.forEach' call
        var _iterator__ex2g4s = format.d4e_1.j();
        while (_iterator__ex2g4s.k()) {
          var element = _iterator__ex2g4s.l();
          this.x4c_1.e(element);
        }
      }
    }
  };
  function Accessor$getterNotNull$ref($boundThis) {
    var l = function (p0) {
      return $boundThis.x4i(p0);
    };
    l.callableName = 'getterNotNull';
    return l;
  }
  function SignedIntFieldFormatDirective(field, minDigits, maxDigits, spacePadding, outputPlusOnExceededWidth) {
    this.w4e_1 = field;
    this.x4e_1 = minDigits;
    this.y4e_1 = maxDigits;
    this.z4e_1 = spacePadding;
    this.a4f_1 = outputPlusOnExceededWidth;
    // Inline function 'kotlin.require' call
    if (!(this.x4e_1 == null || this.x4e_1 >= 0)) {
      var message = 'The minimum number of digits (' + this.x4e_1 + ') is negative';
      throw IllegalArgumentException_init_$Create$(toString_0(message));
    }
    // Inline function 'kotlin.require' call
    if (!(this.y4e_1 == null || this.x4e_1 == null || this.y4e_1 >= this.x4e_1)) {
      var message_0 = 'The maximum number of digits (' + this.y4e_1 + ') is less than the minimum number of digits (' + this.x4e_1 + ')';
      throw IllegalArgumentException_init_$Create$(toString_0(message_0));
    }
  }
  protoOf(SignedIntFieldFormatDirective).b4f = function () {
    return this.w4e_1;
  };
  protoOf(SignedIntFieldFormatDirective).c4f = function () {
    var tmp = Accessor$getterNotNull$ref(this.w4e_1.y4i());
    var tmp0_elvis_lhs = this.x4e_1;
    var formatter = new SignedIntFormatterStructure(tmp, tmp0_elvis_lhs == null ? 0 : tmp0_elvis_lhs, this.a4f_1);
    return !(this.z4e_1 == null) ? new SpacePaddedFormatter(formatter, this.z4e_1) : formatter;
  };
  protoOf(SignedIntFieldFormatDirective).c4e = function () {
    return SignedIntParser(this.x4e_1, this.y4e_1, this.z4e_1, this.w4e_1.y4i(), this.w4e_1.z4i(), this.a4f_1);
  };
  function Accessor$getterNotNull$ref_0($boundThis) {
    var l = function (p0) {
      return $boundThis.x4i(p0);
    };
    l.callableName = 'getterNotNull';
    return l;
  }
  function UnsignedIntFieldFormatDirective(field, minDigits, spacePadding) {
    this.i4f_1 = field;
    this.j4f_1 = minDigits;
    this.k4f_1 = spacePadding;
    this.l4f_1 = this.i4f_1.g4j_1;
    // Inline function 'kotlin.require' call
    if (!(this.j4f_1 >= 0)) {
      var message = 'The minimum number of digits (' + this.j4f_1 + ') is negative';
      throw IllegalArgumentException_init_$Create$(toString_0(message));
    }
    // Inline function 'kotlin.require' call
    if (!(this.l4f_1 >= this.j4f_1)) {
      var message_0 = 'The maximum number of digits (' + this.l4f_1 + ') is less than the minimum number of digits (' + this.j4f_1 + ')';
      throw IllegalArgumentException_init_$Create$(toString_0(message_0));
    }
    if (!(this.k4f_1 == null)) {
      // Inline function 'kotlin.require' call
      if (!(this.k4f_1 > this.j4f_1)) {
        var message_1 = 'The space padding (' + this.k4f_1 + ') should be more than the minimum number of digits (' + this.j4f_1 + ')';
        throw IllegalArgumentException_init_$Create$(toString_0(message_1));
      }
    }
  }
  protoOf(UnsignedIntFieldFormatDirective).b4f = function () {
    return this.i4f_1;
  };
  protoOf(UnsignedIntFieldFormatDirective).c4f = function () {
    var formatter = new UnsignedIntFormatterStructure(Accessor$getterNotNull$ref_0(this.i4f_1.a4j_1), this.j4f_1);
    return !(this.k4f_1 == null) ? new SpacePaddedFormatter(formatter, this.k4f_1) : formatter;
  };
  protoOf(UnsignedIntFieldFormatDirective).c4e = function () {
    return spaceAndZeroPaddedUnsignedInt(this.j4f_1, this.l4f_1, this.k4f_1, this.i4f_1.a4j_1, this.i4f_1.d4j_1);
  };
  function getStringValue($this, target) {
    // Inline function 'kotlin.let' call
    var it = $this.q4f_1.a4j_1.x4i(target);
    var tmp0_elvis_lhs = getOrNull($this.r4f_1, it - $this.q4f_1.b4j_1 | 0);
    return tmp0_elvis_lhs == null ? 'The value ' + it + ' of ' + $this.q4f_1.d4j_1 + ' does not have a corresponding string representation' : tmp0_elvis_lhs;
  }
  function AssignableString($outer) {
    this.h4j_1 = $outer;
  }
  protoOf(AssignableString).i4j = function (container, newValue) {
    var tmp0_safe_receiver = this.h4j_1.q4f_1.a4j_1.j4j(container, this.h4j_1.r4f_1.s(newValue) + this.h4j_1.q4f_1.b4j_1 | 0);
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      tmp = this.h4j_1.r4f_1.o(tmp0_safe_receiver - this.h4j_1.q4f_1.b4j_1 | 0);
    }
    return tmp;
  };
  protoOf(AssignableString).j4j = function (container, newValue) {
    var tmp = (container == null ? true : !(container == null)) ? container : THROW_CCE();
    return this.i4j(tmp, (!(newValue == null) ? typeof newValue === 'string' : false) ? newValue : THROW_CCE());
  };
  protoOf(AssignableString).z4i = function () {
    return this.h4j_1.s4f_1;
  };
  function NamedUnsignedIntFieldFormatDirective$getStringValue$ref($boundThis) {
    var l = function (p0) {
      return getStringValue($boundThis, p0);
    };
    l.callableName = 'getStringValue';
    return l;
  }
  function NamedUnsignedIntFieldFormatDirective(field, values, name) {
    this.q4f_1 = field;
    this.r4f_1 = values;
    this.s4f_1 = name;
    // Inline function 'kotlin.require' call
    if (!(this.r4f_1.m() === ((this.q4f_1.c4j_1 - this.q4f_1.b4j_1 | 0) + 1 | 0))) {
      var message = 'The number of values (' + this.r4f_1.m() + ') in ' + toString_0(this.r4f_1) + ' does not match the range of the field (' + ((this.q4f_1.c4j_1 - this.q4f_1.b4j_1 | 0) + 1 | 0) + ')';
      throw IllegalArgumentException_init_$Create$(toString_0(message));
    }
  }
  protoOf(NamedUnsignedIntFieldFormatDirective).b4f = function () {
    return this.q4f_1;
  };
  protoOf(NamedUnsignedIntFieldFormatDirective).c4f = function () {
    return new StringFormatterStructure(NamedUnsignedIntFieldFormatDirective$getStringValue$ref(this));
  };
  protoOf(NamedUnsignedIntFieldFormatDirective).c4e = function () {
    return new ParserStructure(listOf_0(new StringSetParserOperation(this.r4f_1, new AssignableString(this), 'one of ' + toString_0(this.r4f_1) + ' for ' + this.s4f_1)), emptyList());
  };
  function Accessor$getterNotNull$ref_1($boundThis) {
    var l = function (p0) {
      return $boundThis.x4i(p0);
    };
    l.callableName = 'getterNotNull';
    return l;
  }
  function DecimalFractionFieldFormatDirective(field, minDigits, maxDigits, zerosToAdd) {
    this.t4h_1 = field;
    this.u4h_1 = minDigits;
    this.v4h_1 = maxDigits;
    this.w4h_1 = zerosToAdd;
  }
  protoOf(DecimalFractionFieldFormatDirective).b4f = function () {
    return this.t4h_1;
  };
  protoOf(DecimalFractionFieldFormatDirective).c4f = function () {
    return new DecimalFractionFormatterStructure(Accessor$getterNotNull$ref_1(this.t4h_1.y4i()), this.u4h_1, this.v4h_1, this.w4h_1);
  };
  protoOf(DecimalFractionFieldFormatDirective).c4e = function () {
    return new ParserStructure(listOf_0(new NumberSpanParserOperation(listOf_0(new FractionPartConsumer(this.u4h_1, this.v4h_1, this.t4h_1.y4i(), this.t4h_1.z4i())))), emptyList());
  };
  function GenericFieldSpec(accessor, name, defaultValue, sign) {
    name = name === VOID ? accessor.z4i() : name;
    defaultValue = defaultValue === VOID ? null : defaultValue;
    sign = sign === VOID ? null : sign;
    AbstractFieldSpec.call(this);
    this.k4j_1 = accessor;
    this.l4j_1 = name;
    this.m4j_1 = defaultValue;
    this.n4j_1 = sign;
  }
  protoOf(GenericFieldSpec).y4i = function () {
    return this.k4j_1;
  };
  protoOf(GenericFieldSpec).z4i = function () {
    return this.l4j_1;
  };
  protoOf(GenericFieldSpec).o4j = function () {
    return this.m4j_1;
  };
  protoOf(GenericFieldSpec).p4j = function () {
    return this.n4j_1;
  };
  function PropertyAccessor(property) {
    this.q4j_1 = property;
  }
  protoOf(PropertyAccessor).z4i = function () {
    return this.q4j_1.callableName;
  };
  protoOf(PropertyAccessor).r4j = function (container, newValue) {
    var oldValue = this.q4j_1.get(container);
    var tmp;
    if (oldValue === null) {
      this.q4j_1.set(container, newValue);
      tmp = null;
    } else if (equals(oldValue, newValue)) {
      tmp = null;
    } else {
      tmp = oldValue;
    }
    return tmp;
  };
  protoOf(PropertyAccessor).j4j = function (container, newValue) {
    var tmp = (container == null ? true : !(container == null)) ? container : THROW_CCE();
    return this.r4j(tmp, (newValue == null ? true : !(newValue == null)) ? newValue : THROW_CCE());
  };
  protoOf(PropertyAccessor).s4j = function (container) {
    return this.q4j_1.get(container);
  };
  function UnsignedFieldSpec(accessor, minValue, maxValue, name, defaultValue, sign) {
    name = name === VOID ? accessor.z4i() : name;
    defaultValue = defaultValue === VOID ? null : defaultValue;
    sign = sign === VOID ? null : sign;
    AbstractFieldSpec.call(this);
    this.a4j_1 = accessor;
    this.b4j_1 = minValue;
    this.c4j_1 = maxValue;
    this.d4j_1 = name;
    this.e4j_1 = defaultValue;
    this.f4j_1 = sign;
    var tmp = this;
    var tmp_0;
    if (this.c4j_1 < 10) {
      tmp_0 = 1;
    } else if (this.c4j_1 < 100) {
      tmp_0 = 2;
    } else if (this.c4j_1 < 1000) {
      tmp_0 = 3;
    } else {
      throw IllegalArgumentException_init_$Create$('Max value ' + this.c4j_1 + ' is too large');
    }
    tmp.g4j_1 = tmp_0;
  }
  protoOf(UnsignedFieldSpec).y4i = function () {
    return this.a4j_1;
  };
  protoOf(UnsignedFieldSpec).z4i = function () {
    return this.d4j_1;
  };
  protoOf(UnsignedFieldSpec).o4j = function () {
    return this.e4j_1;
  };
  protoOf(UnsignedFieldSpec).p4j = function () {
    return this.f4j_1;
  };
  function Accessor() {
  }
  function AbstractFieldSpec() {
  }
  protoOf(AbstractFieldSpec).toString = function () {
    return 'The field ' + this.z4i() + ' (default value is ' + toString_1(this.o4j()) + ')';
  };
  function CachedFormatStructure(formats) {
    ConcatenatedFormatStructure.call(this, formats);
    this.a4e_1 = protoOf(ConcatenatedFormatStructure).c4f.call(this);
    this.b4e_1 = protoOf(ConcatenatedFormatStructure).c4e.call(this);
  }
  protoOf(CachedFormatStructure).c4f = function () {
    return this.a4e_1;
  };
  protoOf(CachedFormatStructure).c4e = function () {
    return this.b4e_1;
  };
  function BasicFormatStructure(directive) {
    this.t4j_1 = directive;
  }
  protoOf(BasicFormatStructure).toString = function () {
    return 'BasicFormatStructure(' + toString_0(this.t4j_1) + ')';
  };
  protoOf(BasicFormatStructure).equals = function (other) {
    var tmp;
    if (other instanceof BasicFormatStructure) {
      tmp = equals(this.t4j_1, other.t4j_1);
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(BasicFormatStructure).hashCode = function () {
    return hashCode(this.t4j_1);
  };
  protoOf(BasicFormatStructure).c4e = function () {
    return this.t4j_1.c4e();
  };
  protoOf(BasicFormatStructure).c4f = function () {
    return this.t4j_1.c4f();
  };
  function ConstantFormatStructure(string) {
    this.u4j_1 = string;
  }
  protoOf(ConstantFormatStructure).toString = function () {
    return 'ConstantFormatStructure(' + this.u4j_1 + ')';
  };
  protoOf(ConstantFormatStructure).equals = function (other) {
    var tmp;
    if (other instanceof ConstantFormatStructure) {
      tmp = this.u4j_1 === other.u4j_1;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(ConstantFormatStructure).hashCode = function () {
    return getStringHashCode(this.u4j_1);
  };
  protoOf(ConstantFormatStructure).c4e = function () {
    var tmp;
    // Inline function 'kotlin.text.isEmpty' call
    var this_0 = this.u4j_1;
    if (charSequenceLength(this_0) === 0) {
      tmp = emptyList();
    } else {
      // Inline function 'kotlin.collections.buildList' call
      // Inline function 'kotlin.collections.buildListInternal' call
      // Inline function 'kotlin.apply' call
      var this_1 = ArrayList_init_$Create$_0();
      var tmp_0;
      if (isAsciiDigit(charSequenceGet(this.u4j_1, 0))) {
        var tmp0 = this.u4j_1;
        var tmp$ret$4;
        $l$block: {
          // Inline function 'kotlin.text.takeWhile' call
          var inductionVariable = 0;
          var last = tmp0.length;
          if (inductionVariable < last)
            do {
              var index = inductionVariable;
              inductionVariable = inductionVariable + 1 | 0;
              var it = charSequenceGet(tmp0, index);
              if (!isAsciiDigit(it)) {
                // Inline function 'kotlin.text.substring' call
                // Inline function 'kotlin.js.asDynamic' call
                tmp$ret$4 = tmp0.substring(0, index);
                break $l$block;
              }
            }
             while (inductionVariable < last);
          tmp$ret$4 = tmp0;
        }
        this_1.e(new NumberSpanParserOperation(listOf_0(new ConstantNumberConsumer(tmp$ret$4))));
        var tmp2 = this.u4j_1;
        var tmp$ret$8;
        $l$block_0: {
          // Inline function 'kotlin.text.dropWhile' call
          var inductionVariable_0 = 0;
          var last_0 = charSequenceLength(tmp2) - 1 | 0;
          if (inductionVariable_0 <= last_0)
            do {
              var index_0 = inductionVariable_0;
              inductionVariable_0 = inductionVariable_0 + 1 | 0;
              var it_0 = charSequenceGet(tmp2, index_0);
              if (!isAsciiDigit(it_0)) {
                // Inline function 'kotlin.text.substring' call
                // Inline function 'kotlin.js.asDynamic' call
                tmp$ret$8 = tmp2.substring(index_0);
                break $l$block_0;
              }
            }
             while (inductionVariable_0 <= last_0);
          tmp$ret$8 = '';
        }
        tmp_0 = tmp$ret$8;
      } else {
        tmp_0 = this.u4j_1;
      }
      var suffix = tmp_0;
      // Inline function 'kotlin.text.isNotEmpty' call
      if (charSequenceLength(suffix) > 0) {
        if (isAsciiDigit(charSequenceGet(suffix, suffix.length - 1 | 0))) {
          var tmp$ret$13;
          $l$block_1: {
            // Inline function 'kotlin.text.dropLastWhile' call
            var inductionVariable_1 = get_lastIndex(suffix);
            if (0 <= inductionVariable_1)
              do {
                var index_1 = inductionVariable_1;
                inductionVariable_1 = inductionVariable_1 + -1 | 0;
                var it_1 = charSequenceGet(suffix, index_1);
                if (!isAsciiDigit(it_1)) {
                  // Inline function 'kotlin.text.substring' call
                  var endIndex = index_1 + 1 | 0;
                  // Inline function 'kotlin.js.asDynamic' call
                  tmp$ret$13 = suffix.substring(0, endIndex);
                  break $l$block_1;
                }
              }
               while (0 <= inductionVariable_1);
            tmp$ret$13 = '';
          }
          this_1.e(new PlainStringParserOperation(tmp$ret$13));
          var tmp$ret$17;
          $l$block_2: {
            // Inline function 'kotlin.text.takeLastWhile' call
            var inductionVariable_2 = get_lastIndex(suffix);
            if (0 <= inductionVariable_2)
              do {
                var index_2 = inductionVariable_2;
                inductionVariable_2 = inductionVariable_2 + -1 | 0;
                var it_2 = charSequenceGet(suffix, index_2);
                if (!isAsciiDigit(it_2)) {
                  // Inline function 'kotlin.text.substring' call
                  var startIndex = index_2 + 1 | 0;
                  // Inline function 'kotlin.js.asDynamic' call
                  tmp$ret$17 = suffix.substring(startIndex);
                  break $l$block_2;
                }
              }
               while (0 <= inductionVariable_2);
            tmp$ret$17 = suffix;
          }
          this_1.e(new NumberSpanParserOperation(listOf_0(new ConstantNumberConsumer(tmp$ret$17))));
        } else {
          this_1.e(new PlainStringParserOperation(suffix));
        }
      }
      tmp = this_1.k5();
    }
    return new ParserStructure(tmp, emptyList());
  };
  protoOf(ConstantFormatStructure).c4f = function () {
    return new ConstantStringFormatterStructure(this.u4j_1);
  };
  function formatter$checkIfAllNegative(this$0, value) {
    var seenNonZero = false;
    var tmp0_iterator = this$0.x4j_1.j();
    $l$loop: while (tmp0_iterator.k()) {
      var check = tmp0_iterator.l();
      if (check.r4a().s4j(value) === true)
        seenNonZero = true;
      else if (check.m4i(value))
        continue $l$loop;
      else
        return false;
    }
    return seenNonZero;
  }
  function SignedFormatStructure$parser$lambda(this$0) {
    return function (value, isNegative) {
      var tmp0_iterator = this$0.x4j_1.j();
      while (tmp0_iterator.k()) {
        var field = tmp0_iterator.l();
        var wasNegative = field.r4a().s4j(value) === true;
        field.r4a().j4j(value, !(isNegative === wasNegative));
      }
      return Unit_instance;
    };
  }
  function SignedFormatStructure$formatter$checkIfAllNegative$ref(this$0) {
    var l = function (p0) {
      return formatter$checkIfAllNegative(this$0, p0);
    };
    l.callableName = 'checkIfAllNegative';
    return l;
  }
  function SignedFormatStructure(format, withPlusSign) {
    this.v4j_1 = format;
    this.w4j_1 = withPlusSign;
    var tmp = this;
    // Inline function 'kotlin.collections.mapNotNull' call
    var tmp0 = basicFormats(this.v4j_1);
    // Inline function 'kotlin.collections.mapNotNullTo' call
    var destination = ArrayList_init_$Create$_0();
    // Inline function 'kotlin.collections.forEach' call
    var _iterator__ex2g4s = tmp0.j();
    while (_iterator__ex2g4s.k()) {
      var element = _iterator__ex2g4s.l();
      var tmp0_safe_receiver = element.b4f().p4j();
      if (tmp0_safe_receiver == null)
        null;
      else {
        // Inline function 'kotlin.let' call
        destination.e(tmp0_safe_receiver);
      }
    }
    tmp.x4j_1 = toSet(destination);
    // Inline function 'kotlin.collections.isNotEmpty' call
    // Inline function 'kotlin.require' call
    if (!!this.x4j_1.p()) {
      var message = 'Signed format must contain at least one field with a sign';
      throw IllegalArgumentException_init_$Create$(toString_0(message));
    }
  }
  protoOf(SignedFormatStructure).toString = function () {
    return 'SignedFormatStructure(' + toString_0(this.v4j_1) + ')';
  };
  protoOf(SignedFormatStructure).equals = function (other) {
    var tmp;
    var tmp_0;
    if (other instanceof SignedFormatStructure) {
      tmp_0 = equals(this.v4j_1, other.v4j_1);
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      tmp = this.w4j_1 === other.w4j_1;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(SignedFormatStructure).hashCode = function () {
    return imul(31, hashCode(this.v4j_1)) + getBooleanHashCode(this.w4j_1) | 0;
  };
  protoOf(SignedFormatStructure).c4e = function () {
    return concat(listOf([new ParserStructure(listOf_0(new SignParser(SignedFormatStructure$parser$lambda(this), this.w4j_1, 'sign for ' + toString_0(this.x4j_1))), emptyList()), this.v4j_1.c4e()]));
  };
  protoOf(SignedFormatStructure).c4f = function () {
    var innerFormat = this.v4j_1.c4f();
    return new SignedFormatter(innerFormat, SignedFormatStructure$formatter$checkIfAllNegative$ref(this), this.w4j_1);
  };
  function Companion_14() {
  }
  protoOf(Companion_14).y4j = function (field) {
    var default_0 = field.o4j();
    // Inline function 'kotlin.require' call
    if (!!(default_0 == null)) {
      var message = "The field '" + field.z4i() + "' does not define a default value";
      throw IllegalArgumentException_init_$Create$(toString_0(message));
    }
    return new PropertyWithDefault(field.y4i(), default_0);
  };
  var Companion_instance_14;
  function Companion_getInstance_14() {
    return Companion_instance_14;
  }
  function access$_get_accessor__yxxs4k($this) {
    return $this.z4j_1;
  }
  function access$_get_defaultValue__8tt04b($this) {
    return $this.a4k_1;
  }
  function PropertyWithDefault(accessor, defaultValue) {
    this.z4j_1 = accessor;
    this.a4k_1 = defaultValue;
  }
  function OptionalFormatStructure$parser$lambda(this$0) {
    return function (it) {
      var tmp0_iterator = this$0.d4k_1.j();
      while (tmp0_iterator.k()) {
        var field = tmp0_iterator.l();
        // Inline function 'kotlinx.datetime.internal.format.PropertyWithDefault.assignDefault' call
        access$_get_accessor__yxxs4k(field).j4j(it, access$_get_defaultValue__8tt04b(field));
      }
      return Unit_instance;
    };
  }
  function Accessor$getter$ref($boundThis) {
    var l = function (p0) {
      return $boundThis.s4j(p0);
    };
    l.callableName = 'getter';
    return l;
  }
  function Predicate$test$ref($boundThis) {
    var l = function (p0) {
      return $boundThis.e4k(p0);
    };
    l.callableName = 'test';
    return l;
  }
  function Truth$test$ref($boundThis) {
    var l = function (p0) {
      return $boundThis.f4k(p0);
    };
    l.callableName = 'test';
    return l;
  }
  function OptionalFormatStructure(onZero, format) {
    this.b4k_1 = onZero;
    this.c4k_1 = format;
    var tmp = this;
    // Inline function 'kotlin.collections.map' call
    var this_0 = basicFormats(this.c4k_1);
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$(collectionSizeOrDefault(this_0, 10));
    var _iterator__ex2g4s = this_0.j();
    while (_iterator__ex2g4s.k()) {
      var item = _iterator__ex2g4s.l();
      var tmp$ret$0 = item.b4f();
      destination.e(tmp$ret$0);
    }
    // Inline function 'kotlin.collections.map' call
    var this_1 = distinct(destination);
    // Inline function 'kotlin.collections.mapTo' call
    var destination_0 = ArrayList_init_$Create$(collectionSizeOrDefault(this_1, 10));
    var _iterator__ex2g4s_0 = this_1.j();
    while (_iterator__ex2g4s_0.k()) {
      var item_0 = _iterator__ex2g4s_0.l();
      var tmp$ret$3 = Companion_instance_14.y4j(item_0);
      destination_0.e(tmp$ret$3);
    }
    tmp.d4k_1 = destination_0;
  }
  protoOf(OptionalFormatStructure).toString = function () {
    return 'Optional(' + this.b4k_1 + ', ' + toString_0(this.c4k_1) + ')';
  };
  protoOf(OptionalFormatStructure).equals = function (other) {
    var tmp;
    var tmp_0;
    if (other instanceof OptionalFormatStructure) {
      tmp_0 = this.b4k_1 === other.b4k_1;
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      tmp = equals(this.c4k_1, other.c4k_1);
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(OptionalFormatStructure).hashCode = function () {
    return imul(31, getStringHashCode(this.b4k_1)) + hashCode(this.c4k_1) | 0;
  };
  protoOf(OptionalFormatStructure).c4e = function () {
    var tmp = emptyList();
    var tmp_0 = this.c4k_1.c4e();
    var tmp_1 = (new ConstantFormatStructure(this.b4k_1)).c4e();
    var tmp_2;
    if (this.d4k_1.p()) {
      tmp_2 = emptyList();
    } else {
      tmp_2 = listOf_0(new UnconditionalModification(OptionalFormatStructure$parser$lambda(this)));
    }
    return new ParserStructure(tmp, listOf([tmp_0, concat(listOf([tmp_1, new ParserStructure(tmp_2, emptyList())]))]));
  };
  protoOf(OptionalFormatStructure).c4f = function () {
    var formatter = this.c4k_1.c4f();
    // Inline function 'kotlin.collections.map' call
    var this_0 = this.d4k_1;
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$(collectionSizeOrDefault(this_0, 10));
    var _iterator__ex2g4s = this_0.j();
    while (_iterator__ex2g4s.k()) {
      var item = _iterator__ex2g4s.l();
      // Inline function 'kotlinx.datetime.internal.format.PropertyWithDefault.isDefaultComparisonPredicate' call
      var tmp = access$_get_defaultValue__8tt04b(item);
      var tmp$ret$1 = new ComparisonPredicate(tmp, Accessor$getter$ref(access$_get_accessor__yxxs4k(item)));
      destination.e(tmp$ret$1);
    }
    var predicate = conjunctionPredicate(destination);
    var tmp_0;
    if (predicate instanceof Truth) {
      tmp_0 = new ConstantStringFormatterStructure(this.b4k_1);
    } else {
      var tmp_1 = to(Predicate$test$ref(predicate), new ConstantStringFormatterStructure(this.b4k_1));
      tmp_0 = new ConditionalFormatter(listOf([tmp_1, to(Truth$test$ref(Truth_instance), formatter)]));
    }
    return tmp_0;
  };
  function AlternativesParsingFormatStructure(mainFormat, formats) {
    this.g4k_1 = mainFormat;
    this.h4k_1 = formats;
  }
  protoOf(AlternativesParsingFormatStructure).toString = function () {
    return 'AlternativesParsing(' + toString_0(this.h4k_1) + ')';
  };
  protoOf(AlternativesParsingFormatStructure).equals = function (other) {
    var tmp;
    var tmp_0;
    if (other instanceof AlternativesParsingFormatStructure) {
      tmp_0 = equals(this.g4k_1, other.g4k_1);
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      tmp = equals(this.h4k_1, other.h4k_1);
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(AlternativesParsingFormatStructure).hashCode = function () {
    return imul(31, hashCode(this.g4k_1)) + hashCode(this.h4k_1) | 0;
  };
  protoOf(AlternativesParsingFormatStructure).c4e = function () {
    var tmp = emptyList();
    // Inline function 'kotlin.collections.buildList' call
    // Inline function 'kotlin.collections.buildListInternal' call
    // Inline function 'kotlin.apply' call
    var this_0 = ArrayList_init_$Create$_0();
    this_0.e(this.g4k_1.c4e());
    var tmp0_iterator = this.h4k_1.j();
    while (tmp0_iterator.k()) {
      var format = tmp0_iterator.l();
      this_0.e(format.c4e());
    }
    var tmp$ret$3 = this_0.k5();
    return new ParserStructure(tmp, tmp$ret$3);
  };
  protoOf(AlternativesParsingFormatStructure).c4f = function () {
    return this.g4k_1.c4f();
  };
  function ConcatenatedFormatStructure(formats) {
    this.d4e_1 = formats;
  }
  protoOf(ConcatenatedFormatStructure).toString = function () {
    return 'ConcatenatedFormatStructure(' + joinToString(this.d4e_1, ', ') + ')';
  };
  protoOf(ConcatenatedFormatStructure).equals = function (other) {
    var tmp;
    if (other instanceof ConcatenatedFormatStructure) {
      tmp = equals(this.d4e_1, other.d4e_1);
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(ConcatenatedFormatStructure).hashCode = function () {
    return hashCode(this.d4e_1);
  };
  protoOf(ConcatenatedFormatStructure).c4e = function () {
    // Inline function 'kotlin.collections.map' call
    var this_0 = this.d4e_1;
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$(collectionSizeOrDefault(this_0, 10));
    var _iterator__ex2g4s = this_0.j();
    while (_iterator__ex2g4s.k()) {
      var item = _iterator__ex2g4s.l();
      var tmp$ret$0 = item.c4e();
      destination.e(tmp$ret$0);
    }
    return concat(destination);
  };
  protoOf(ConcatenatedFormatStructure).c4f = function () {
    // Inline function 'kotlin.collections.map' call
    var this_0 = this.d4e_1;
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$(collectionSizeOrDefault(this_0, 10));
    var _iterator__ex2g4s = this_0.j();
    while (_iterator__ex2g4s.k()) {
      var item = _iterator__ex2g4s.l();
      var tmp$ret$0 = item.c4f();
      destination.e(tmp$ret$0);
    }
    var formatters = destination;
    var tmp;
    if (formatters.m() === 1) {
      tmp = single(formatters);
    } else {
      tmp = new ConcatenatedFormatter(formatters);
    }
    return tmp;
  };
  function NonConcatenatedFormatStructure() {
  }
  function basicFormats(format) {
    // Inline function 'kotlin.collections.buildList' call
    // Inline function 'kotlin.collections.buildListInternal' call
    // Inline function 'kotlin.apply' call
    var this_0 = ArrayList_init_$Create$_0();
    basicFormats$_anonymous_$rec_hkf0lf(this_0, format);
    return this_0.k5();
  }
  function basicFormats$_anonymous_$rec_hkf0lf($this_buildList, format) {
    if (format instanceof BasicFormatStructure) {
      $this_buildList.e(format.t4j_1);
    } else {
      if (format instanceof ConcatenatedFormatStructure) {
        // Inline function 'kotlin.collections.forEach' call
        var _iterator__ex2g4s = format.d4e_1.j();
        while (_iterator__ex2g4s.k()) {
          var element = _iterator__ex2g4s.l();
          basicFormats$_anonymous_$rec_hkf0lf($this_buildList, element);
        }
      } else {
        if (!(format instanceof ConstantFormatStructure)) {
          if (format instanceof SignedFormatStructure) {
            basicFormats$_anonymous_$rec_hkf0lf($this_buildList, format.v4j_1);
          } else {
            if (format instanceof AlternativesParsingFormatStructure) {
              basicFormats$_anonymous_$rec_hkf0lf($this_buildList, format.g4k_1);
              // Inline function 'kotlin.collections.forEach' call
              var _iterator__ex2g4s_0 = format.h4k_1.j();
              while (_iterator__ex2g4s_0.k()) {
                var element_0 = _iterator__ex2g4s_0.l();
                basicFormats$_anonymous_$rec_hkf0lf($this_buildList, element_0);
              }
            } else {
              if (format instanceof OptionalFormatStructure) {
                basicFormats$_anonymous_$rec_hkf0lf($this_buildList, format.c4k_1);
              }
            }
          }
        }
      }
    }
  }
  function conjunctionPredicate(predicates) {
    return predicates.p() ? Truth_instance : predicates.m() === 1 ? single(predicates) : new ConjunctionPredicate(predicates);
  }
  function ComparisonPredicate(expectedValue, getter) {
    this.i4k_1 = expectedValue;
    this.j4k_1 = getter;
  }
  protoOf(ComparisonPredicate).e4k = function (value) {
    return equals(this.j4k_1(value), this.i4k_1);
  };
  function Truth() {
  }
  protoOf(Truth).f4k = function (value) {
    return true;
  };
  protoOf(Truth).e4k = function (value) {
    return this.f4k((value == null ? true : !(value == null)) ? value : THROW_CCE());
  };
  var Truth_instance;
  function Truth_getInstance() {
    return Truth_instance;
  }
  function ConjunctionPredicate(predicates) {
    this.k4k_1 = predicates;
  }
  protoOf(ConjunctionPredicate).e4k = function (value) {
    var tmp0 = this.k4k_1;
    var tmp$ret$0;
    $l$block_0: {
      // Inline function 'kotlin.collections.all' call
      var tmp;
      if (isInterface(tmp0, Collection)) {
        tmp = tmp0.p();
      } else {
        tmp = false;
      }
      if (tmp) {
        tmp$ret$0 = true;
        break $l$block_0;
      }
      var _iterator__ex2g4s = tmp0.j();
      while (_iterator__ex2g4s.k()) {
        var element = _iterator__ex2g4s.l();
        if (!element.e4k(value)) {
          tmp$ret$0 = false;
          break $l$block_0;
        }
      }
      tmp$ret$0 = true;
    }
    return tmp$ret$0;
  };
  function SpacePaddedFormatter(formatter, padding) {
    this.l4k_1 = formatter;
    this.m4k_1 = padding;
  }
  function SignedFormatter(formatter, allSubFormatsNegative, alwaysOutputSign) {
    this.n4k_1 = formatter;
    this.o4k_1 = allSubFormatsNegative;
    this.p4k_1 = alwaysOutputSign;
  }
  function ConditionalFormatter(formatters) {
    this.q4k_1 = formatters;
  }
  function ConcatenatedFormatter(formatters) {
    this.r4k_1 = formatters;
  }
  function SignedIntFormatterStructure(number, zeroPadding, outputPlusOnExceededWidth) {
    this.s4k_1 = number;
    this.t4k_1 = zeroPadding;
    this.u4k_1 = outputPlusOnExceededWidth;
    // Inline function 'kotlin.require' call
    if (!(this.t4k_1 >= 0)) {
      var message = 'The minimum number of digits (' + this.t4k_1 + ') is negative';
      throw IllegalArgumentException_init_$Create$(toString_0(message));
    }
    // Inline function 'kotlin.require' call
    if (!(this.t4k_1 <= 9)) {
      var message_0 = 'The minimum number of digits (' + this.t4k_1 + ') exceeds the length of an Int';
      throw IllegalArgumentException_init_$Create$(toString_0(message_0));
    }
  }
  function UnsignedIntFormatterStructure(number, zeroPadding) {
    this.v4k_1 = number;
    this.w4k_1 = zeroPadding;
    // Inline function 'kotlin.require' call
    if (!(this.w4k_1 >= 0)) {
      var message = 'The minimum number of digits (' + this.w4k_1 + ') is negative';
      throw IllegalArgumentException_init_$Create$(toString_0(message));
    }
    // Inline function 'kotlin.require' call
    if (!(this.w4k_1 <= 9)) {
      var message_0 = 'The minimum number of digits (' + this.w4k_1 + ') exceeds the length of an Int';
      throw IllegalArgumentException_init_$Create$(toString_0(message_0));
    }
  }
  function StringFormatterStructure(string) {
    this.x4k_1 = string;
  }
  function DecimalFractionFormatterStructure(number, minDigits, maxDigits, zerosToAdd) {
    this.y4k_1 = number;
    this.z4k_1 = minDigits;
    this.a4l_1 = maxDigits;
    this.b4l_1 = zerosToAdd;
    var containsArg = this.z4k_1;
    // Inline function 'kotlin.require' call
    if (!(1 <= containsArg ? containsArg <= 9 : false)) {
      var message = 'The minimum number of digits (' + this.z4k_1 + ') is not in range 1..9';
      throw IllegalArgumentException_init_$Create$(toString_0(message));
    }
    var containsLower = this.z4k_1;
    var containsArg_0 = this.a4l_1;
    // Inline function 'kotlin.require' call
    if (!(containsLower <= containsArg_0 ? containsArg_0 <= 9 : false)) {
      var message_0 = 'The maximum number of digits (' + this.a4l_1 + ') is not in range ' + this.z4k_1 + '..9';
      throw IllegalArgumentException_init_$Create$(toString_0(message_0));
    }
  }
  function ConstantStringFormatterStructure(string) {
    this.c4l_1 = string;
  }
  function FractionPartConsumer(minLength, maxLength, setter, name) {
    NumberConsumer.call(this, minLength === maxLength ? minLength : null, name);
    this.f4l_1 = minLength;
    this.g4l_1 = maxLength;
    this.h4l_1 = setter;
    var containsArg = this.f4l_1;
    // Inline function 'kotlin.require' call
    if (!(1 <= containsArg ? containsArg <= 9 : false)) {
      var message = 'Invalid minimum length ' + this.f4l_1 + ' for field ' + this.j4l_1 + ': expected 1..9';
      throw IllegalArgumentException_init_$Create$(toString_0(message));
    }
    var containsLower = this.f4l_1;
    var containsArg_0 = this.g4l_1;
    // Inline function 'kotlin.require' call
    if (!(containsLower <= containsArg_0 ? containsArg_0 <= 9 : false)) {
      var message_0 = 'Invalid maximum length ' + this.g4l_1 + ' for field ' + this.j4l_1 + ': expected ' + this.f4l_1 + '..9';
      throw IllegalArgumentException_init_$Create$(toString_0(message_0));
    }
  }
  protoOf(FractionPartConsumer).k4l = function (storage, input, start, end) {
    return (end - start | 0) < this.f4l_1 ? new TooFewDigits(this.f4l_1) : (end - start | 0) > this.g4l_1 ? new TooManyDigits(this.g4l_1) : setWithoutReassigning(this.h4l_1, storage, new DecimalFraction(parseAsciiInt(input, start, end), end - start | 0));
  };
  function ConstantNumberConsumer(expected) {
    NumberConsumer.call(this, expected.length, 'the predefined string ' + expected);
    this.n4l_1 = expected;
  }
  protoOf(ConstantNumberConsumer).k4l = function (storage, input, start, end) {
    var tmp;
    // Inline function 'kotlin.text.substring' call
    if (toString_0(charSequenceSubSequence(input, start, end)) === this.n4l_1) {
      tmp = null;
    } else {
      tmp = new WrongConstant(this.n4l_1);
    }
    return tmp;
  };
  function NumberConsumer(length, whatThisExpects) {
    this.i4l_1 = length;
    this.j4l_1 = whatThisExpects;
  }
  protoOf(NumberConsumer).a = function () {
    return this.i4l_1;
  };
  function ExpectedInt() {
  }
  protoOf(ExpectedInt).o4l = function () {
    return 'expected an Int value';
  };
  var ExpectedInt_instance;
  function ExpectedInt_getInstance() {
    return ExpectedInt_instance;
  }
  function TooManyDigits(maxDigits) {
    this.p4l_1 = maxDigits;
  }
  protoOf(TooManyDigits).o4l = function () {
    return 'expected at most ' + this.p4l_1 + ' digits';
  };
  function TooFewDigits(minDigits) {
    this.q4l_1 = minDigits;
  }
  protoOf(TooFewDigits).o4l = function () {
    return 'expected at least ' + this.q4l_1 + ' digits';
  };
  function WrongConstant(expected) {
    this.r4l_1 = expected;
  }
  protoOf(WrongConstant).o4l = function () {
    return "expected '" + this.r4l_1 + "'";
  };
  function Conflicting(conflicting) {
    this.s4l_1 = conflicting;
  }
  protoOf(Conflicting).o4l = function () {
    return "attempted to overwrite the existing value '" + toString_0(this.s4l_1) + "'";
  };
  function setWithoutReassigning(_this__u8e3s4, receiver, value) {
    var tmp0_elvis_lhs = _this__u8e3s4.j4j(receiver, value);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return null;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var conflictingValue = tmp;
    return new Conflicting(conflictingValue);
  }
  function parseAsciiInt(_this__u8e3s4, start, end) {
    var result = 0;
    var inductionVariable = start;
    if (inductionVariable < end)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var digit = charSequenceGet(_this__u8e3s4, i);
        result = imul(result, 10) + asciiDigitToInt(digit) | 0;
      }
       while (inductionVariable < end);
    return result;
  }
  function UnsignedIntConsumer(minLength, maxLength, setter, name, multiplyByMinus1) {
    multiplyByMinus1 = multiplyByMinus1 === VOID ? false : multiplyByMinus1;
    NumberConsumer.call(this, minLength == maxLength ? minLength : null, name);
    this.v4l_1 = minLength;
    this.w4l_1 = maxLength;
    this.x4l_1 = setter;
    this.y4l_1 = multiplyByMinus1;
    // Inline function 'kotlin.require' call
    if (!(this.a() == null || numberRangeToNumber(1, 9).wi(this.a()))) {
      var message = 'Invalid length for field ' + this.j4l_1 + ': ' + this.a();
      throw IllegalArgumentException_init_$Create$(toString_0(message));
    }
  }
  protoOf(UnsignedIntConsumer).k4l = function (storage, input, start, end) {
    var tmp;
    if (!(this.w4l_1 == null) && (end - start | 0) > this.w4l_1) {
      tmp = new TooManyDigits(this.w4l_1);
    } else if (!(this.v4l_1 == null) && (end - start | 0) < this.v4l_1) {
      tmp = new TooFewDigits(this.v4l_1);
    } else {
      var result = parseAsciiIntOrNull(input, start, end);
      tmp = result == null ? ExpectedInt_instance : setWithoutReassigning(this.x4l_1, storage, this.y4l_1 ? -result | 0 : result);
    }
    return tmp;
  };
  function parseAsciiIntOrNull(_this__u8e3s4, start, end) {
    var result = 0;
    var inductionVariable = start;
    if (inductionVariable < end)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var digit = charSequenceGet(_this__u8e3s4, i);
        result = imul(result, 10) + asciiDigitToInt(digit) | 0;
        if (result < 0)
          return null;
      }
       while (inductionVariable < end);
    return result;
  }
  function ParseError(position, message) {
    this.z4l_1 = position;
    this.a4m_1 = message;
  }
  function _ParseResult___init__impl__gvz3cn(value) {
    return value;
  }
  function _ParseResult___get_value__impl__86mnxf($this) {
    return $this;
  }
  function Companion_15() {
  }
  protoOf(Companion_15).b4m = function (indexOfNextUnparsed) {
    return _ParseResult___init__impl__gvz3cn(indexOfNextUnparsed);
  };
  protoOf(Companion_15).c4m = function (position, message) {
    return _ParseResult___init__impl__gvz3cn(new ParseError(position, message));
  };
  var Companion_instance_15;
  function Companion_getInstance_15() {
    return Companion_instance_15;
  }
  function _Parser___init__impl__gdyfby(commands) {
    return commands;
  }
  function _get_commands__a20n1($this) {
    return $this;
  }
  function Parser__match_impl_nzt83d($this, input, initialContainer, startIndex) {
    // Inline function 'kotlin.collections.mutableListOf' call
    var errors = ArrayList_init_$Create$_0();
    // Inline function 'kotlinx.datetime.internal.format.parser.Parser.parse' call
    var parseOptions = mutableListOf([new ParserState(initialContainer, _get_commands__a20n1($this), startIndex)]);
    iterate_over_alternatives: while (true) {
      var tmp0_elvis_lhs = removeLastOrNull(parseOptions);
      var tmp;
      if (tmp0_elvis_lhs == null) {
        break iterate_over_alternatives;
      } else {
        tmp = tmp0_elvis_lhs;
      }
      var state = tmp;
      var output = state.d4m_1.y4a();
      var inputPosition = state.f4m_1;
      var parserStructure = state.e4m_1;
      // Inline function 'kotlin.run' call
      $l$block: {
        var inductionVariable = 0;
        var last = parserStructure.h4m_1.m() - 1 | 0;
        if (inductionVariable <= last)
          do {
            var ix = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            // Inline function 'kotlinx.datetime.internal.format.parser.ParseResult.match' call
            var this_0 = parserStructure.h4m_1.o(ix).j4m(output, input, inputPosition);
            var tmp0_subject = _ParseResult___get_value__impl__86mnxf(this_0);
            if (typeof tmp0_subject === 'number') {
              inputPosition = _ParseResult___get_value__impl__86mnxf(this_0);
            } else {
              if (tmp0_subject instanceof ParseError) {
                var it = _ParseResult___get_value__impl__86mnxf(this_0);
                errors.e(it);
                break $l$block;
              } else {
                // Inline function 'kotlin.error' call
                var message = 'Unexpected parse result: ' + toString_0(_ParseResult___get_value__impl__86mnxf(this_0));
                throw IllegalStateException_init_$Create$(toString_0(message));
              }
            }
          }
           while (inductionVariable <= last);
        if (parserStructure.i4m_1.p()) {
          if (false || inputPosition === charSequenceLength(input)) {
            return output;
          } else {
            var tmp_0 = inputPosition;
            var it_0 = new ParseError(tmp_0, Parser$match$lambda);
            errors.e(it_0);
          }
        } else {
          var inductionVariable_0 = parserStructure.i4m_1.m() - 1 | 0;
          if (0 <= inductionVariable_0)
            do {
              var ix_0 = inductionVariable_0;
              inductionVariable_0 = inductionVariable_0 + -1 | 0;
              parseOptions.e(new ParserState(output, parserStructure.i4m_1.o(ix_0), inputPosition));
            }
             while (0 <= inductionVariable_0);
        }
      }
    }
    // Inline function 'kotlin.collections.sortByDescending' call
    if (errors.m() > 1) {
      // Inline function 'kotlin.comparisons.compareByDescending' call
      var tmp_1 = Parser$match$lambda_0;
      var tmp$ret$8 = new sam$kotlin_Comparator$0(tmp_1);
      sortWith(errors, tmp$ret$8);
    }
    throw new ParseException(errors);
  }
  function Parser__match$default_impl_x2xlti($this, input, initialContainer, startIndex, $super) {
    startIndex = startIndex === VOID ? 0 : startIndex;
    var tmp;
    if ($super === VOID) {
      tmp = Parser__match_impl_nzt83d($this, input, initialContainer, startIndex);
    } else {
      var tmp_0 = $super;
      tmp = (tmp_0 == null ? null : new Parser(tmp_0)).k4m.call(new Parser($this), input, initialContainer, startIndex);
    }
    return tmp;
  }
  function ParserState(output, parserStructure, inputPosition) {
    this.d4m_1 = output;
    this.e4m_1 = parserStructure;
    this.f4m_1 = inputPosition;
  }
  function Parser__toString_impl_x33iea($this) {
    return 'Parser(commands=' + $this.toString() + ')';
  }
  function Parser__hashCode_impl_bbxllf($this) {
    return hashCode($this);
  }
  function Parser__equals_impl_djxokv($this, other) {
    if (!(other instanceof Parser))
      return false;
    var tmp0_other_with_cast = other instanceof Parser ? other.g4m_1 : THROW_CCE();
    if (!equals($this, tmp0_other_with_cast))
      return false;
    return true;
  }
  function sam$kotlin_Comparator$0(function_0) {
    this.l4m_1 = function_0;
  }
  protoOf(sam$kotlin_Comparator$0).qe = function (a, b) {
    return this.l4m_1(a, b);
  };
  protoOf(sam$kotlin_Comparator$0).compare = function (a, b) {
    return this.qe(a, b);
  };
  protoOf(sam$kotlin_Comparator$0).m3 = function () {
    return this.l4m_1;
  };
  protoOf(sam$kotlin_Comparator$0).equals = function (other) {
    var tmp;
    if (!(other == null) ? isInterface(other, Comparator) : false) {
      var tmp_0;
      if (!(other == null) ? isInterface(other, FunctionAdapter) : false) {
        tmp_0 = equals(this.m3(), other.m3());
      } else {
        tmp_0 = false;
      }
      tmp = tmp_0;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(sam$kotlin_Comparator$0).hashCode = function () {
    return hashCode(this.m3());
  };
  function Parser$match$lambda() {
    return 'There is more input to consume';
  }
  function Parser$match$lambda_0(a, b) {
    // Inline function 'kotlin.comparisons.compareValuesBy' call
    var tmp = b.z4l_1;
    var tmp$ret$1 = a.z4l_1;
    return compareValues(tmp, tmp$ret$1);
  }
  function Parser(commands) {
    this.g4m_1 = commands;
  }
  protoOf(Parser).toString = function () {
    return Parser__toString_impl_x33iea(this.g4m_1);
  };
  protoOf(Parser).hashCode = function () {
    return Parser__hashCode_impl_bbxllf(this.g4m_1);
  };
  protoOf(Parser).equals = function (other) {
    return Parser__equals_impl_djxokv(this.g4m_1, other);
  };
  function ParserStructure(operations, followedBy) {
    this.h4m_1 = operations;
    this.i4m_1 = followedBy;
  }
  protoOf(ParserStructure).toString = function () {
    return joinToString(this.h4m_1, ', ') + '(' + joinToString(this.i4m_1, ';') + ')';
  };
  function ParseException(errors) {
    Exception_init_$Init$(formatError(errors), this);
    captureStack(this, ParseException);
  }
  function concat(_this__u8e3s4) {
    // Inline function 'kotlin.collections.foldRight' call
    var accumulator = new ParserStructure(emptyList(), emptyList());
    if (!_this__u8e3s4.p()) {
      var iterator = _this__u8e3s4.q(_this__u8e3s4.m());
      while (iterator.o4()) {
        var tmp2 = iterator.p4();
        var acc = accumulator;
        accumulator = concat$append(tmp2, acc);
      }
    }
    var naiveParser = accumulator;
    return concat$simplify(naiveParser, emptyList());
  }
  function formatError(errors) {
    if (errors.m() === 1) {
      return 'Position ' + errors.o(0).z4l_1 + ': ' + errors.o(0).a4m_1();
    }
    var averageMessageLength = 33;
    var tmp0_buffer = StringBuilder_init_$Create$_0(imul(averageMessageLength, errors.m()));
    return joinTo(errors, tmp0_buffer, ', ', 'Errors: ', VOID, VOID, VOID, formatError$lambda).toString();
  }
  function concat$append(_this__u8e3s4, other) {
    var tmp;
    if (_this__u8e3s4.i4m_1.p()) {
      tmp = new ParserStructure(plus(_this__u8e3s4.h4m_1, other.h4m_1), other.i4m_1);
    } else {
      // Inline function 'kotlin.collections.map' call
      var this_0 = _this__u8e3s4.i4m_1;
      // Inline function 'kotlin.collections.mapTo' call
      var destination = ArrayList_init_$Create$(collectionSizeOrDefault(this_0, 10));
      var _iterator__ex2g4s = this_0.j();
      while (_iterator__ex2g4s.k()) {
        var item = _iterator__ex2g4s.l();
        var tmp$ret$0 = concat$append(item, other);
        destination.e(tmp$ret$0);
      }
      tmp = new ParserStructure(_this__u8e3s4.h4m_1, destination);
    }
    return tmp;
  }
  function concat$simplify(_this__u8e3s4, unconditionalModifications) {
    // Inline function 'kotlin.collections.mutableListOf' call
    var newOperations = ArrayList_init_$Create$_0();
    var currentNumberSpan = null;
    var unconditionalModificationsForTails = toMutableList(unconditionalModifications);
    var tmp0_iterator = _this__u8e3s4.h4m_1.j();
    while (tmp0_iterator.k()) {
      var op = tmp0_iterator.l();
      if (op instanceof NumberSpanParserOperation) {
        if (!(currentNumberSpan == null)) {
          currentNumberSpan.n(op.m4m_1);
        } else {
          currentNumberSpan = toMutableList(op.m4m_1);
        }
      } else {
        if (op instanceof UnconditionalModification) {
          unconditionalModificationsForTails.e(op);
        } else {
          if (!(currentNumberSpan == null)) {
            newOperations.e(new NumberSpanParserOperation(currentNumberSpan));
            currentNumberSpan = null;
          }
          newOperations.e(op);
        }
      }
    }
    // Inline function 'kotlin.collections.flatMap' call
    var tmp0 = _this__u8e3s4.i4m_1;
    // Inline function 'kotlin.collections.flatMapTo' call
    var destination = ArrayList_init_$Create$_0();
    var _iterator__ex2g4s = tmp0.j();
    while (_iterator__ex2g4s.k()) {
      var element = _iterator__ex2g4s.l();
      var simplified = concat$simplify(element, unconditionalModificationsForTails);
      var tmp;
      if (simplified.h4m_1.p()) {
        // Inline function 'kotlin.collections.ifEmpty' call
        var this_0 = simplified.i4m_1;
        var tmp_0;
        if (this_0.p()) {
          tmp_0 = listOf_0(simplified);
        } else {
          tmp_0 = this_0;
        }
        tmp = tmp_0;
      } else {
        tmp = listOf_0(simplified);
      }
      var list = tmp;
      addAll(destination, list);
    }
    // Inline function 'kotlin.collections.ifEmpty' call
    var tmp_1;
    if (destination.p()) {
      tmp_1 = listOf_0(new ParserStructure(unconditionalModificationsForTails, emptyList()));
    } else {
      tmp_1 = destination;
    }
    var mergedTails = tmp_1;
    var tmp_2;
    if (currentNumberSpan == null) {
      tmp_2 = new ParserStructure(newOperations, mergedTails);
    } else {
      var tmp$ret$8;
      $l$block_0: {
        // Inline function 'kotlin.collections.none' call
        var tmp_3;
        if (isInterface(mergedTails, Collection)) {
          tmp_3 = mergedTails.p();
        } else {
          tmp_3 = false;
        }
        if (tmp_3) {
          tmp$ret$8 = true;
          break $l$block_0;
        }
        var _iterator__ex2g4s_0 = mergedTails.j();
        while (_iterator__ex2g4s_0.k()) {
          var element_0 = _iterator__ex2g4s_0.l();
          var tmp0_safe_receiver = firstOrNull(element_0.h4m_1);
          var tmp_4;
          if (tmp0_safe_receiver == null) {
            tmp_4 = null;
          } else {
            // Inline function 'kotlin.let' call
            tmp_4 = tmp0_safe_receiver instanceof NumberSpanParserOperation;
          }
          if (tmp_4 === true) {
            tmp$ret$8 = false;
            break $l$block_0;
          }
        }
        tmp$ret$8 = true;
      }
      if (tmp$ret$8) {
        newOperations.e(new NumberSpanParserOperation(currentNumberSpan));
        tmp_2 = new ParserStructure(newOperations, mergedTails);
      } else {
        // Inline function 'kotlin.collections.map' call
        // Inline function 'kotlin.collections.mapTo' call
        var destination_0 = ArrayList_init_$Create$(collectionSizeOrDefault(mergedTails, 10));
        var _iterator__ex2g4s_1 = mergedTails.j();
        while (_iterator__ex2g4s_1.k()) {
          var item = _iterator__ex2g4s_1.l();
          var firstOperation = firstOrNull(item.h4m_1);
          var tmp_5;
          if (firstOperation instanceof NumberSpanParserOperation) {
            tmp_5 = new ParserStructure(plus(listOf_0(new NumberSpanParserOperation(plus(currentNumberSpan, firstOperation.m4m_1))), drop(item.h4m_1, 1)), item.i4m_1);
          } else {
            if (firstOperation == null) {
              tmp_5 = new ParserStructure(listOf_0(new NumberSpanParserOperation(currentNumberSpan)), item.i4m_1);
            } else {
              tmp_5 = new ParserStructure(plus(listOf_0(new NumberSpanParserOperation(currentNumberSpan)), item.h4m_1), item.i4m_1);
            }
          }
          var tmp$ret$12 = tmp_5;
          destination_0.e(tmp$ret$12);
        }
        var newTails = destination_0;
        tmp_2 = new ParserStructure(newOperations, newTails);
      }
    }
    return tmp_2;
  }
  function formatError$lambda(it) {
    return 'position ' + it.z4l_1 + ": '" + it.a4m_1() + "'";
  }
  function SignedIntParser(minDigits, maxDigits, spacePadding, setter, name, plusOnExceedsWidth) {
    var parsers = mutableListOf([spaceAndZeroPaddedUnsignedInt(minDigits, maxDigits, spacePadding, setter, name, true)]);
    if (!(plusOnExceedsWidth == null)) {
      parsers.e(spaceAndZeroPaddedUnsignedInt(minDigits, plusOnExceedsWidth, spacePadding, setter, name));
      parsers.e(new ParserStructure(listOf([new PlainStringParserOperation('+'), new NumberSpanParserOperation(listOf_0(new UnsignedIntConsumer(plusOnExceedsWidth + 1 | 0, maxDigits, setter, name, false)))]), emptyList()));
    } else {
      parsers.e(spaceAndZeroPaddedUnsignedInt(minDigits, maxDigits, spacePadding, setter, name));
    }
    return new ParserStructure(emptyList(), parsers);
  }
  function spaceAndZeroPaddedUnsignedInt(minDigits, maxDigits, spacePadding, setter, name, withMinus) {
    withMinus = withMinus === VOID ? false : withMinus;
    var minNumberLength = (minDigits == null ? 1 : minDigits) + (withMinus ? 1 : 0) | 0;
    var tmp;
    if (maxDigits == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      tmp = withMinus ? maxDigits + 1 | 0 : maxDigits;
    }
    var tmp2_elvis_lhs = tmp;
    var maxNumberLength = tmp2_elvis_lhs == null ? 2147483647 : tmp2_elvis_lhs;
    var spacePadding_0 = spacePadding == null ? 0 : spacePadding;
    // Inline function 'kotlin.comparisons.minOf' call
    var maxPaddedNumberLength = Math.min(maxNumberLength, spacePadding_0);
    if (minNumberLength >= maxPaddedNumberLength)
      return spaceAndZeroPaddedUnsignedInt$numberOfRequiredLengths(withMinus, setter, name, minNumberLength, maxNumberLength);
    var accumulated = spaceAndZeroPaddedUnsignedInt$numberOfRequiredLengths(withMinus, setter, name, minNumberLength, minNumberLength);
    var inductionVariable = minNumberLength;
    if (inductionVariable < maxPaddedNumberLength)
      do {
        var accumulatedWidth = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        accumulated = new ParserStructure(emptyList(), listOf([spaceAndZeroPaddedUnsignedInt$numberOfRequiredLengths(withMinus, setter, name, accumulatedWidth + 1 | 0, accumulatedWidth + 1 | 0), concat(listOf([new ParserStructure(listOf_0(new PlainStringParserOperation(' ')), emptyList()), accumulated]))]));
      }
       while (inductionVariable < maxPaddedNumberLength);
    var tmp_0;
    if (spacePadding_0 > maxNumberLength) {
      var prepadding = new PlainStringParserOperation(repeat(' ', spacePadding_0 - maxNumberLength | 0));
      tmp_0 = concat(listOf([new ParserStructure(listOf_0(prepadding), emptyList()), accumulated]));
    } else if (spacePadding_0 === maxNumberLength) {
      tmp_0 = accumulated;
    } else {
      var r = new ParserStructure(emptyList(), listOf([spaceAndZeroPaddedUnsignedInt$numberOfRequiredLengths(withMinus, setter, name, spacePadding_0 + 1 | 0, maxNumberLength), accumulated]));
      tmp_0 = r;
    }
    return tmp_0;
  }
  function TrieNode(children, isTerminal) {
    var tmp;
    if (children === VOID) {
      // Inline function 'kotlin.collections.mutableListOf' call
      tmp = ArrayList_init_$Create$_0();
    } else {
      tmp = children;
    }
    children = tmp;
    isTerminal = isTerminal === VOID ? false : isTerminal;
    this.p4m_1 = children;
    this.q4m_1 = isTerminal;
  }
  function sam$kotlin_Comparator$0_0(function_0) {
    this.r4m_1 = function_0;
  }
  protoOf(sam$kotlin_Comparator$0_0).qe = function (a, b) {
    return this.r4m_1(a, b);
  };
  protoOf(sam$kotlin_Comparator$0_0).compare = function (a, b) {
    return this.qe(a, b);
  };
  protoOf(sam$kotlin_Comparator$0_0).m3 = function () {
    return this.r4m_1;
  };
  protoOf(sam$kotlin_Comparator$0_0).equals = function (other) {
    var tmp;
    if (!(other == null) ? isInterface(other, Comparator) : false) {
      var tmp_0;
      if (!(other == null) ? isInterface(other, FunctionAdapter) : false) {
        tmp_0 = equals(this.m3(), other.m3());
      } else {
        tmp_0 = false;
      }
      tmp = tmp_0;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(sam$kotlin_Comparator$0_0).hashCode = function () {
    return hashCode(this.m3());
  };
  function _init_$reduceTrie(trie) {
    var tmp0_iterator = trie.p4m_1.j();
    while (tmp0_iterator.k()) {
      var child = tmp0_iterator.l().mg();
      _init_$reduceTrie(child);
    }
    // Inline function 'kotlin.collections.mutableListOf' call
    var newChildren = ArrayList_init_$Create$_0();
    var tmp2_iterator = trie.p4m_1.j();
    while (tmp2_iterator.k()) {
      var tmp3_loop_parameter = tmp2_iterator.l();
      var key = tmp3_loop_parameter.lg();
      var child_0 = tmp3_loop_parameter.mg();
      if (!child_0.q4m_1 && child_0.p4m_1.m() === 1) {
        var tmp4_container = single(child_0.p4m_1);
        var grandChildKey = tmp4_container.lg();
        var grandChild = tmp4_container.mg();
        newChildren.e(to(key + grandChildKey, grandChild));
      } else {
        newChildren.e(to(key, child_0));
      }
    }
    trie.p4m_1.b2();
    // Inline function 'kotlin.collections.sortedBy' call
    // Inline function 'kotlin.comparisons.compareBy' call
    var tmp = StringSetParserOperation$reduceTrie$lambda;
    var tmp$ret$1 = new sam$kotlin_Comparator$0_0(tmp);
    var tmp$ret$2 = sortedWith(newChildren, tmp$ret$1);
    trie.p4m_1.n(tmp$ret$2);
  }
  function StringSetParserOperation$lambda($key) {
    return function (it) {
      var tmp$ret$0 = it.ug_1;
      return compareValues(tmp$ret$0, $key);
    };
  }
  function StringSetParserOperation$consume$lambda(this$0, $input, $startIndex, $index) {
    return function () {
      var tmp0 = $input;
      var tmp1 = $startIndex;
      // Inline function 'kotlin.text.substring' call
      var endIndex = $index._v;
      var tmp$ret$0 = toString_0(charSequenceSubSequence(tmp0, tmp1, endIndex));
      return 'Expected ' + this$0.t4m_1 + ' but got ' + tmp$ret$0;
    };
  }
  function StringSetParserOperation$reduceTrie$lambda(a, b) {
    // Inline function 'kotlin.comparisons.compareValuesBy' call
    var tmp = a.ug_1;
    var tmp$ret$1 = b.ug_1;
    return compareValues(tmp, tmp$ret$1);
  }
  function StringSetParserOperation(strings, setter, whatThisExpects) {
    this.s4m_1 = setter;
    this.t4m_1 = whatThisExpects;
    this.u4m_1 = new TrieNode();
    var tmp0_iterator = strings.j();
    while (tmp0_iterator.k()) {
      var string = tmp0_iterator.l();
      // Inline function 'kotlin.text.isNotEmpty' call
      // Inline function 'kotlin.require' call
      if (!(charSequenceLength(string) > 0)) {
        var message = 'Found an empty string in ' + this.t4m_1;
        throw IllegalArgumentException_init_$Create$(toString_0(message));
      }
      var node = this.u4m_1;
      var inductionVariable = 0;
      var last = string.length;
      while (inductionVariable < last) {
        var char = charSequenceGet(string, inductionVariable);
        inductionVariable = inductionVariable + 1 | 0;
        var tmp2 = node.p4m_1;
        // Inline function 'kotlin.collections.binarySearchBy' call
        var key = toString(char);
        var toIndex = tmp2.m();
        var searchResult = binarySearch(tmp2, 0, toIndex, StringSetParserOperation$lambda(key));
        var tmp;
        if (searchResult < 0) {
          // Inline function 'kotlin.also' call
          var this_0 = new TrieNode();
          node.p4m_1.d2((-searchResult | 0) - 1 | 0, to(toString(char), this_0));
          tmp = this_0;
        } else {
          tmp = node.p4m_1.o(searchResult).vg_1;
        }
        node = tmp;
      }
      // Inline function 'kotlin.require' call
      if (!!node.q4m_1) {
        var message_0 = "The string '" + string + "' was passed several times";
        throw IllegalArgumentException_init_$Create$(toString_0(message_0));
      }
      node.q4m_1 = true;
    }
    _init_$reduceTrie(this.u4m_1);
  }
  protoOf(StringSetParserOperation).j4m = function (storage, input, startIndex) {
    var node = this.u4m_1;
    var index = {_v: startIndex};
    var lastMatch = null;
    loop: while (index._v <= charSequenceLength(input)) {
      if (node.q4m_1)
        lastMatch = index._v;
      var tmp0_iterator = node.p4m_1.j();
      while (tmp0_iterator.k()) {
        var tmp1_loop_parameter = tmp0_iterator.l();
        var key = tmp1_loop_parameter.lg();
        var child = tmp1_loop_parameter.mg();
        if (startsWith(input, key, index._v)) {
          node = child;
          index._v = index._v + key.length | 0;
          continue loop;
        }
      }
      break loop;
    }
    var tmp;
    if (!(lastMatch == null)) {
      // Inline function 'kotlin.text.substring' call
      var endIndex = lastMatch;
      var tmp$ret$0 = toString_0(charSequenceSubSequence(input, startIndex, endIndex));
      tmp = setWithoutReassigning_0(this.s4m_1, storage, tmp$ret$0, startIndex, lastMatch);
    } else {
      var tmp_0 = Companion_instance_15;
      tmp = tmp_0.c4m(startIndex, StringSetParserOperation$consume$lambda(this, input, startIndex, index));
    }
    return tmp;
  };
  function _get_whatThisExpects__4pg11j($this) {
    // Inline function 'kotlin.collections.map' call
    var this_0 = $this.m4m_1;
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$(collectionSizeOrDefault(this_0, 10));
    var _iterator__ex2g4s = this_0.j();
    while (_iterator__ex2g4s.k()) {
      var item = _iterator__ex2g4s.l();
      var length = item.a();
      var tmp$ret$0 = (length == null ? 'at least one digit' : '' + length + ' digits') + (' for ' + item.j4l_1);
      destination.e(tmp$ret$0);
    }
    var consumerLengths = destination;
    var tmp;
    if ($this.o4m_1) {
      tmp = 'a number with at least ' + $this.n4m_1 + ' digits: ' + toString_0(consumerLengths);
    } else {
      tmp = 'a number with exactly ' + $this.n4m_1 + ' digits: ' + toString_0(consumerLengths);
    }
    return tmp;
  }
  function NumberSpanParserOperation$consume$lambda(this$0) {
    return function () {
      return 'Unexpected end of input: yet to parse ' + _get_whatThisExpects__4pg11j(this$0);
    };
  }
  function NumberSpanParserOperation$consume$lambda_0($digitsInRow, this$0) {
    return function () {
      return 'Only found ' + $digitsInRow._v + ' digits in a row, but need to parse ' + _get_whatThisExpects__4pg11j(this$0);
    };
  }
  function NumberSpanParserOperation$consume$lambda_1($numberString, this$0, $i, $error) {
    return function () {
      return "Can not interpret the string '" + $numberString + "' as " + this$0.m4m_1.o($i).j4l_1 + ': ' + $error.o4l();
    };
  }
  function NumberSpanParserOperation(consumers) {
    this.m4m_1 = consumers;
    var tmp = this;
    // Inline function 'kotlin.collections.sumOf' call
    var sum = 0;
    var _iterator__ex2g4s = this.m4m_1.j();
    while (_iterator__ex2g4s.k()) {
      var element = _iterator__ex2g4s.l();
      var tmp_0 = sum;
      var tmp0_elvis_lhs = element.a();
      sum = tmp_0 + (tmp0_elvis_lhs == null ? 1 : tmp0_elvis_lhs) | 0;
    }
    tmp.n4m_1 = sum;
    var tmp_1 = this;
    var tmp0 = this.m4m_1;
    var tmp$ret$2;
    $l$block_0: {
      // Inline function 'kotlin.collections.any' call
      var tmp_2;
      if (isInterface(tmp0, Collection)) {
        tmp_2 = tmp0.p();
      } else {
        tmp_2 = false;
      }
      if (tmp_2) {
        tmp$ret$2 = false;
        break $l$block_0;
      }
      var _iterator__ex2g4s_0 = tmp0.j();
      while (_iterator__ex2g4s_0.k()) {
        var element_0 = _iterator__ex2g4s_0.l();
        if (element_0.a() == null) {
          tmp$ret$2 = true;
          break $l$block_0;
        }
      }
      tmp$ret$2 = false;
    }
    tmp_1.o4m_1 = tmp$ret$2;
    var tmp0_0 = this.m4m_1;
    var tmp$ret$4;
    $l$block_2: {
      // Inline function 'kotlin.collections.all' call
      var tmp_3;
      if (isInterface(tmp0_0, Collection)) {
        tmp_3 = tmp0_0.p();
      } else {
        tmp_3 = false;
      }
      if (tmp_3) {
        tmp$ret$4 = true;
        break $l$block_2;
      }
      var _iterator__ex2g4s_1 = tmp0_0.j();
      while (_iterator__ex2g4s_1.k()) {
        var element_1 = _iterator__ex2g4s_1.l();
        var tmp0_elvis_lhs_0 = element_1.a();
        if (!((tmp0_elvis_lhs_0 == null ? 2147483647 : tmp0_elvis_lhs_0) > 0)) {
          tmp$ret$4 = false;
          break $l$block_2;
        }
      }
      tmp$ret$4 = true;
    }
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.require' call
    if (!tmp$ret$4) {
      var message = 'Failed requirement.';
      throw IllegalArgumentException_init_$Create$(toString_0(message));
    }
    var tmp3 = this.m4m_1;
    var tmp$ret$9;
    $l$block_3: {
      // Inline function 'kotlin.collections.count' call
      var tmp_4;
      if (isInterface(tmp3, Collection)) {
        tmp_4 = tmp3.p();
      } else {
        tmp_4 = false;
      }
      if (tmp_4) {
        tmp$ret$9 = 0;
        break $l$block_3;
      }
      var count = 0;
      var _iterator__ex2g4s_2 = tmp3.j();
      while (_iterator__ex2g4s_2.k()) {
        var element_2 = _iterator__ex2g4s_2.l();
        if (element_2.a() == null) {
          count = count + 1 | 0;
          checkCountOverflow(count);
        }
      }
      tmp$ret$9 = count;
    }
    // Inline function 'kotlin.require' call
    if (!(tmp$ret$9 <= 1)) {
      // Inline function 'kotlin.collections.filter' call
      var tmp0_1 = this.m4m_1;
      // Inline function 'kotlin.collections.filterTo' call
      var destination = ArrayList_init_$Create$_0();
      var _iterator__ex2g4s_3 = tmp0_1.j();
      while (_iterator__ex2g4s_3.k()) {
        var element_3 = _iterator__ex2g4s_3.l();
        if (element_3.a() == null) {
          destination.e(element_3);
        }
      }
      // Inline function 'kotlin.collections.map' call
      // Inline function 'kotlin.collections.mapTo' call
      var destination_0 = ArrayList_init_$Create$(collectionSizeOrDefault(destination, 10));
      var _iterator__ex2g4s_4 = destination.j();
      while (_iterator__ex2g4s_4.k()) {
        var item = _iterator__ex2g4s_4.l();
        var tmp$ret$14 = item.j4l_1;
        destination_0.e(tmp$ret$14);
      }
      var fieldNames = destination_0;
      var message_0 = 'At most one variable-length numeric field in a row is allowed, but got several: ' + toString_0(fieldNames) + '. ' + 'Parsing is undefined: for example, with variable-length month number ' + "and variable-length day of month, '111' can be parsed as Jan 11th or Nov 1st.";
      throw IllegalArgumentException_init_$Create$(toString_0(message_0));
    }
  }
  protoOf(NumberSpanParserOperation).j4m = function (storage, input, startIndex) {
    if ((startIndex + this.n4m_1 | 0) > charSequenceLength(input)) {
      var tmp = Companion_instance_15;
      return tmp.c4m(startIndex, NumberSpanParserOperation$consume$lambda(this));
    }
    var digitsInRow = {_v: 0};
    while ((startIndex + digitsInRow._v | 0) < charSequenceLength(input) && isAsciiDigit(charSequenceGet(input, startIndex + digitsInRow._v | 0))) {
      digitsInRow._v = digitsInRow._v + 1 | 0;
      digitsInRow._v;
    }
    if (digitsInRow._v < this.n4m_1) {
      var tmp_0 = Companion_instance_15;
      return tmp_0.c4m(startIndex, NumberSpanParserOperation$consume$lambda_0(digitsInRow, this));
    }
    var index = startIndex;
    var inductionVariable = 0;
    var last = this.m4m_1.m() - 1 | 0;
    if (inductionVariable <= last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var tmp1_elvis_lhs = this.m4m_1.o(i).a();
        var length = tmp1_elvis_lhs == null ? (digitsInRow._v - this.n4m_1 | 0) + 1 | 0 : tmp1_elvis_lhs;
        var error = this.m4m_1.o(i).k4l(storage, input, index, index + length | 0);
        if (!(error == null)) {
          var tmp1 = index;
          // Inline function 'kotlin.text.substring' call
          var endIndex = index + length | 0;
          var numberString = toString_0(charSequenceSubSequence(input, tmp1, endIndex));
          var tmp_1 = Companion_instance_15;
          var tmp_2 = index;
          return tmp_1.c4m(tmp_2, NumberSpanParserOperation$consume$lambda_1(numberString, this, i, error));
        }
        index = index + length | 0;
      }
       while (inductionVariable <= last);
    return Companion_instance_15.b4m(index);
  };
  protoOf(NumberSpanParserOperation).toString = function () {
    return _get_whatThisExpects__4pg11j(this);
  };
  function PlainStringParserOperation$consume$lambda(this$0) {
    return function () {
      return "Unexpected end of input: yet to parse '" + this$0.v4m_1 + "'";
    };
  }
  function PlainStringParserOperation$consume$lambda_0(this$0, $input, $startIndex, $i) {
    return function () {
      var tmp0 = $input;
      var tmp1 = $startIndex;
      // Inline function 'kotlin.text.substring' call
      var endIndex = ($startIndex + $i | 0) + 1 | 0;
      var tmp$ret$0 = toString_0(charSequenceSubSequence(tmp0, tmp1, endIndex));
      return 'Expected ' + this$0.v4m_1 + ' but got ' + tmp$ret$0;
    };
  }
  function PlainStringParserOperation(string) {
    this.v4m_1 = string;
    // Inline function 'kotlin.text.isNotEmpty' call
    var this_0 = this.v4m_1;
    // Inline function 'kotlin.require' call
    if (!(charSequenceLength(this_0) > 0)) {
      var message = 'Empty string is not allowed';
      throw IllegalArgumentException_init_$Create$(toString_0(message));
    }
    // Inline function 'kotlin.require' call
    if (!!isAsciiDigit(charSequenceGet(this.v4m_1, 0))) {
      var message_0 = "String '" + this.v4m_1 + "' starts with a digit";
      throw IllegalArgumentException_init_$Create$(toString_0(message_0));
    }
    // Inline function 'kotlin.require' call
    if (!!isAsciiDigit(charSequenceGet(this.v4m_1, this.v4m_1.length - 1 | 0))) {
      var message_1 = "String '" + this.v4m_1 + "' ends with a digit";
      throw IllegalArgumentException_init_$Create$(toString_0(message_1));
    }
  }
  protoOf(PlainStringParserOperation).j4m = function (storage, input, startIndex) {
    if ((startIndex + this.v4m_1.length | 0) > charSequenceLength(input)) {
      var tmp = Companion_instance_15;
      return tmp.c4m(startIndex, PlainStringParserOperation$consume$lambda(this));
    }
    var inductionVariable = 0;
    var last = charSequenceLength(this.v4m_1) - 1 | 0;
    if (inductionVariable <= last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        if (!(charSequenceGet(input, startIndex + i | 0) === charSequenceGet(this.v4m_1, i))) {
          var tmp_0 = Companion_instance_15;
          return tmp_0.c4m(startIndex, PlainStringParserOperation$consume$lambda_0(this, input, startIndex, i));
        }
      }
       while (inductionVariable <= last);
    return Companion_instance_15.b4m(startIndex + this.v4m_1.length | 0);
  };
  protoOf(PlainStringParserOperation).toString = function () {
    return "'" + this.v4m_1 + "'";
  };
  function SignParser$consume$lambda(this$0, $char) {
    return function () {
      return 'Expected ' + this$0.y4m_1 + ' but got ' + toString($char);
    };
  }
  function SignParser(isNegativeSetter, withPlusSign, whatThisExpects) {
    this.w4m_1 = isNegativeSetter;
    this.x4m_1 = withPlusSign;
    this.y4m_1 = whatThisExpects;
  }
  protoOf(SignParser).j4m = function (storage, input, startIndex) {
    if (startIndex >= charSequenceLength(input))
      return Companion_instance_15.b4m(startIndex);
    var char = charSequenceGet(input, startIndex);
    if (char === _Char___init__impl__6a9atx(45)) {
      this.w4m_1(storage, true);
      return Companion_instance_15.b4m(startIndex + 1 | 0);
    }
    if (char === _Char___init__impl__6a9atx(43) && this.x4m_1) {
      this.w4m_1(storage, false);
      return Companion_instance_15.b4m(startIndex + 1 | 0);
    }
    var tmp = Companion_instance_15;
    return tmp.c4m(startIndex, SignParser$consume$lambda(this, char));
  };
  protoOf(SignParser).toString = function () {
    return this.y4m_1;
  };
  function UnconditionalModification(operation) {
    this.z4m_1 = operation;
  }
  protoOf(UnconditionalModification).j4m = function (storage, input, startIndex) {
    this.z4m_1(storage);
    return Companion_instance_15.b4m(startIndex);
  };
  function setWithoutReassigning_0(_this__u8e3s4, receiver, value, position, nextIndex) {
    var conflictingValue = _this__u8e3s4.j4j(receiver, value);
    var tmp;
    if (conflictingValue === null) {
      tmp = Companion_instance_15.b4m(nextIndex);
    } else {
      var tmp_0 = Companion_instance_15;
      tmp = tmp_0.c4m(position, setWithoutReassigning$lambda(conflictingValue, value, _this__u8e3s4));
    }
    return tmp;
  }
  function spaceAndZeroPaddedUnsignedInt$numberOfRequiredLengths($withMinus, $setter, $name, minNumberLength, maxNumberLength) {
    // Inline function 'kotlin.check' call
    if (!(maxNumberLength >= (1 + ($withMinus ? 1 : 0) | 0))) {
      throw IllegalStateException_init_$Create$('Check failed.');
    }
    // Inline function 'kotlin.collections.buildList' call
    // Inline function 'kotlin.collections.buildListInternal' call
    // Inline function 'kotlin.apply' call
    var this_0 = ArrayList_init_$Create$_0();
    if ($withMinus) {
      this_0.e(new PlainStringParserOperation('-'));
    }
    this_0.e(new NumberSpanParserOperation(listOf_0(new UnsignedIntConsumer(minNumberLength - ($withMinus ? 1 : 0) | 0, maxNumberLength - ($withMinus ? 1 : 0) | 0, $setter, $name, $withMinus))));
    var tmp$ret$4 = this_0.k5();
    return new ParserStructure(tmp$ret$4, emptyList());
  }
  function setWithoutReassigning$lambda($conflictingValue, $value, $this_setWithoutReassigning) {
    return function () {
      return "Attempting to assign conflicting values '" + toString_1($conflictingValue) + "' and '" + toString_1($value) + "' to field '" + $this_setWithoutReassigning.z4i() + "'";
    };
  }
  function get_POWERS_OF_TEN() {
    _init_properties_math_kt__tgcmt4();
    return POWERS_OF_TEN;
  }
  var POWERS_OF_TEN;
  function DecimalFraction(fractionalPart, digits) {
    this.j4g_1 = fractionalPart;
    this.k4g_1 = digits;
    // Inline function 'kotlin.require' call
    if (!(this.k4g_1 >= 0)) {
      var message = 'Digits must be non-negative, but was ' + this.k4g_1;
      throw IllegalArgumentException_init_$Create$(toString_0(message));
    }
  }
  protoOf(DecimalFraction).l4g = function (newDigits) {
    return newDigits === this.k4g_1 ? this.j4g_1 : newDigits > this.k4g_1 ? imul(this.j4g_1, get_POWERS_OF_TEN()[newDigits - this.k4g_1 | 0]) : this.j4g_1 / get_POWERS_OF_TEN()[this.k4g_1 - newDigits | 0] | 0;
  };
  protoOf(DecimalFraction).a4n = function (other) {
    var tmp0 = this.k4g_1;
    // Inline function 'kotlin.comparisons.maxOf' call
    var b = other.k4g_1;
    // Inline function 'kotlin.let' call
    var maxPrecision = Math.max(tmp0, b);
    return compareTo(this.l4g(maxPrecision), other.l4g(maxPrecision));
  };
  protoOf(DecimalFraction).d = function (other) {
    return this.a4n(other instanceof DecimalFraction ? other : THROW_CCE());
  };
  protoOf(DecimalFraction).equals = function (other) {
    var tmp;
    if (other instanceof DecimalFraction) {
      tmp = this.a4n(other) === 0;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(DecimalFraction).toString = function () {
    // Inline function 'kotlin.text.buildString' call
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$();
    var denominator = get_POWERS_OF_TEN()[this.k4g_1];
    this_0.sc(this.j4g_1 / denominator | 0);
    this_0.f8(_Char___init__impl__6a9atx(46));
    this_0.e8(removePrefix((denominator + (this.j4g_1 % denominator | 0) | 0).toString(), '1'));
    return this_0.toString();
  };
  protoOf(DecimalFraction).hashCode = function () {
    throw UnsupportedOperationException_init_$Create$('DecimalFraction is not supposed to be used as a hash key');
  };
  function multiplyAndAdd(d, n, r) {
    _init_properties_math_kt__tgcmt4();
    var md = d;
    var mr = r;
    if (d.b1(new Long(0, 0)) > 0 && r.b1(new Long(0, 0)) < 0) {
      md = md.a3();
      mr = mr.u2(n);
    } else if (d.b1(new Long(0, 0)) < 0 && r.b1(new Long(0, 0)) > 0) {
      md = md.z2();
      mr = mr.v2(n);
    }
    return safeAdd(safeMultiply(md, n), mr);
  }
  var properties_initialized_math_kt_amm9wq;
  function _init_properties_math_kt__tgcmt4() {
    if (!properties_initialized_math_kt_amm9wq) {
      properties_initialized_math_kt_amm9wq = true;
      // Inline function 'kotlin.intArrayOf' call
      POWERS_OF_TEN = new Int32Array([1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000]);
    }
  }
  function isAsciiDigit(_this__u8e3s4) {
    return _Char___init__impl__6a9atx(48) <= _this__u8e3s4 ? _this__u8e3s4 <= _Char___init__impl__6a9atx(57) : false;
  }
  function asciiDigitToInt(_this__u8e3s4) {
    return Char__minus_impl_a2frrh(_this__u8e3s4, _Char___init__impl__6a9atx(48));
  }
  function DatePeriodIso8601Serializer() {
    DatePeriodIso8601Serializer_instance = this;
    this.b4n_1 = PrimitiveSerialDescriptor('kotlinx.datetime.DatePeriod', STRING_getInstance());
  }
  protoOf(DatePeriodIso8601Serializer).w1k = function () {
    return this.b4n_1;
  };
  protoOf(DatePeriodIso8601Serializer).y1k = function (decoder) {
    var period = Companion_instance_0.fm(decoder.a1o());
    var tmp;
    if (period instanceof DatePeriod) {
      tmp = period;
    } else {
      throw SerializationException_init_$Create$(period.toString() + ' is not a date-based period');
    }
    return tmp;
  };
  protoOf(DatePeriodIso8601Serializer).c4n = function (encoder, value) {
    encoder.j1p(value.toString());
  };
  protoOf(DatePeriodIso8601Serializer).x1k = function (encoder, value) {
    return this.c4n(encoder, value instanceof DatePeriod ? value : THROW_CCE());
  };
  var DatePeriodIso8601Serializer_instance;
  function DatePeriodIso8601Serializer_getInstance() {
    if (DatePeriodIso8601Serializer_instance == null)
      new DatePeriodIso8601Serializer();
    return DatePeriodIso8601Serializer_instance;
  }
  function DateTimePeriodIso8601Serializer() {
    DateTimePeriodIso8601Serializer_instance = this;
    this.d4n_1 = PrimitiveSerialDescriptor('kotlinx.datetime.DateTimePeriod', STRING_getInstance());
  }
  protoOf(DateTimePeriodIso8601Serializer).w1k = function () {
    return this.d4n_1;
  };
  protoOf(DateTimePeriodIso8601Serializer).y1k = function (decoder) {
    return Companion_instance_0.fm(decoder.a1o());
  };
  protoOf(DateTimePeriodIso8601Serializer).e4n = function (encoder, value) {
    encoder.j1p(value.toString());
  };
  protoOf(DateTimePeriodIso8601Serializer).x1k = function (encoder, value) {
    return this.e4n(encoder, value instanceof DateTimePeriod ? value : THROW_CCE());
  };
  var DateTimePeriodIso8601Serializer_instance;
  function DateTimePeriodIso8601Serializer_getInstance() {
    if (DateTimePeriodIso8601Serializer_instance == null)
      new DateTimePeriodIso8601Serializer();
    return DateTimePeriodIso8601Serializer_instance;
  }
  function TimeBasedDateTimeUnitSerializer$descriptor$delegate$lambda() {
    return buildClassSerialDescriptor('kotlinx.datetime.TimeBased', [], TimeBasedDateTimeUnitSerializer$descriptor$delegate$lambda$lambda);
  }
  function TimeBasedDateTimeUnitSerializer$descriptor$delegate$lambda$lambda($this$buildClassSerialDescriptor) {
    // Inline function 'kotlinx.serialization.descriptors.element' call
    var elementName = 'nanoseconds';
    var annotations = emptyList();
    // Inline function 'kotlinx.serialization.serializer' call
    // Inline function 'kotlinx.serialization.internal.cast' call
    var this_0 = serializer(createKType(getKClass(Long), arrayOf([]), false));
    var descriptor = (isInterface(this_0, KSerializer) ? this_0 : THROW_CCE()).w1k();
    $this$buildClassSerialDescriptor.b1n(elementName, descriptor, annotations, false);
    return Unit_instance;
  }
  function TimeBasedDateTimeUnitSerializer() {
    TimeBasedDateTimeUnitSerializer_instance = this;
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp.f4n_1 = lazy_0(tmp_0, TimeBasedDateTimeUnitSerializer$descriptor$delegate$lambda);
  }
  protoOf(TimeBasedDateTimeUnitSerializer).w1k = function () {
    var tmp0 = this.f4n_1;
    // Inline function 'kotlin.getValue' call
    descriptor$factory();
    return tmp0.w();
  };
  protoOf(TimeBasedDateTimeUnitSerializer).g4n = function (encoder, value) {
    // Inline function 'kotlinx.serialization.encoding.encodeStructure' call
    var descriptor = this.w1k();
    var composite = encoder.f1o(descriptor);
    composite.q1p(TimeBasedDateTimeUnitSerializer_getInstance().w1k(), 0, value.f48_1);
    composite.g1o(descriptor);
  };
  protoOf(TimeBasedDateTimeUnitSerializer).x1k = function (encoder, value) {
    return this.g4n(encoder, value instanceof TimeBased ? value : THROW_CCE());
  };
  protoOf(TimeBasedDateTimeUnitSerializer).y1k = function (decoder) {
    var seen = {_v: false};
    var nanoseconds = {_v: new Long(0, 0)};
    // Inline function 'kotlinx.serialization.encoding.decodeStructure' call
    var descriptor = this.w1k();
    var composite = decoder.f1o(descriptor);
    if (composite.v1o()) {
      nanoseconds._v = composite.l1o(TimeBasedDateTimeUnitSerializer_getInstance().w1k(), 0);
      seen._v = true;
    } else {
      loop: while (true) {
        var elementIndex = composite.w1o(TimeBasedDateTimeUnitSerializer_getInstance().w1k());
        switch (elementIndex) {
          case 0:
            nanoseconds._v = composite.l1o(TimeBasedDateTimeUnitSerializer_getInstance().w1k(), 0);
            seen._v = true;
            break;
          case -1:
            break loop;
          default:
            throwUnknownIndexException(elementIndex);
            break;
        }
      }
    }
    var result = Unit_instance;
    composite.g1o(descriptor);
    if (!seen._v)
      throw MissingFieldException_init_$Create$('nanoseconds', this.w1k().x1l());
    return new TimeBased(nanoseconds._v);
  };
  var TimeBasedDateTimeUnitSerializer_instance;
  function TimeBasedDateTimeUnitSerializer_getInstance() {
    if (TimeBasedDateTimeUnitSerializer_instance == null)
      new TimeBasedDateTimeUnitSerializer();
    return TimeBasedDateTimeUnitSerializer_instance;
  }
  function _get_impl__d88w17($this) {
    var tmp0 = $this.h4n_1;
    // Inline function 'kotlin.getValue' call
    impl$factory();
    return tmp0.w();
  }
  function DateBasedDateTimeUnitSerializer$impl$delegate$lambda() {
    var tmp = getKClass(DateBased);
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp_0 = [getKClass(DayBased), getKClass(MonthBased)];
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp$ret$5 = [DayBasedDateTimeUnitSerializer_getInstance(), MonthBasedDateTimeUnitSerializer_getInstance()];
    return new SealedClassSerializer('kotlinx.datetime.DateTimeUnit.DateBased', tmp, tmp_0, tmp$ret$5);
  }
  function DateBasedDateTimeUnitSerializer() {
    DateBasedDateTimeUnitSerializer_instance = this;
    AbstractPolymorphicSerializer.call(this);
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp.h4n_1 = lazy_0(tmp_0, DateBasedDateTimeUnitSerializer$impl$delegate$lambda);
  }
  protoOf(DateBasedDateTimeUnitSerializer).n1l = function (decoder, klassName) {
    return _get_impl__d88w17(this).n1l(decoder, klassName);
  };
  protoOf(DateBasedDateTimeUnitSerializer).i4n = function (encoder, value) {
    return _get_impl__d88w17(this).o1l(encoder, value);
  };
  protoOf(DateBasedDateTimeUnitSerializer).o1l = function (encoder, value) {
    return this.i4n(encoder, value instanceof DateBased ? value : THROW_CCE());
  };
  protoOf(DateBasedDateTimeUnitSerializer).l1l = function () {
    return getKClass(DateBased);
  };
  protoOf(DateBasedDateTimeUnitSerializer).w1k = function () {
    return _get_impl__d88w17(this).w1k();
  };
  var DateBasedDateTimeUnitSerializer_instance;
  function DateBasedDateTimeUnitSerializer_getInstance() {
    if (DateBasedDateTimeUnitSerializer_instance == null)
      new DateBasedDateTimeUnitSerializer();
    return DateBasedDateTimeUnitSerializer_instance;
  }
  function DayBasedDateTimeUnitSerializer$descriptor$delegate$lambda() {
    return buildClassSerialDescriptor('kotlinx.datetime.DayBased', [], DayBasedDateTimeUnitSerializer$descriptor$delegate$lambda$lambda);
  }
  function DayBasedDateTimeUnitSerializer$descriptor$delegate$lambda$lambda($this$buildClassSerialDescriptor) {
    // Inline function 'kotlinx.serialization.descriptors.element' call
    var annotations = emptyList();
    // Inline function 'kotlinx.serialization.serializer' call
    // Inline function 'kotlinx.serialization.internal.cast' call
    var this_0 = serializer(createKType(PrimitiveClasses_getInstance().bc(), arrayOf([]), false));
    var descriptor = (isInterface(this_0, KSerializer) ? this_0 : THROW_CCE()).w1k();
    $this$buildClassSerialDescriptor.b1n('days', descriptor, annotations, false);
    return Unit_instance;
  }
  function DayBasedDateTimeUnitSerializer() {
    DayBasedDateTimeUnitSerializer_instance = this;
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp.j4n_1 = lazy_0(tmp_0, DayBasedDateTimeUnitSerializer$descriptor$delegate$lambda);
  }
  protoOf(DayBasedDateTimeUnitSerializer).w1k = function () {
    var tmp0 = this.j4n_1;
    // Inline function 'kotlin.getValue' call
    descriptor$factory_0();
    return tmp0.w();
  };
  protoOf(DayBasedDateTimeUnitSerializer).k4n = function (encoder, value) {
    // Inline function 'kotlinx.serialization.encoding.encodeStructure' call
    var descriptor = this.w1k();
    var composite = encoder.f1o(descriptor);
    composite.p1p(DayBasedDateTimeUnitSerializer_getInstance().w1k(), 0, value.l48_1);
    composite.g1o(descriptor);
  };
  protoOf(DayBasedDateTimeUnitSerializer).x1k = function (encoder, value) {
    return this.k4n(encoder, value instanceof DayBased ? value : THROW_CCE());
  };
  protoOf(DayBasedDateTimeUnitSerializer).y1k = function (decoder) {
    var seen = {_v: false};
    var days = {_v: 0};
    // Inline function 'kotlinx.serialization.encoding.decodeStructure' call
    var descriptor = this.w1k();
    var composite = decoder.f1o(descriptor);
    if (composite.v1o()) {
      days._v = composite.k1o(DayBasedDateTimeUnitSerializer_getInstance().w1k(), 0);
      seen._v = true;
    } else {
      loop: while (true) {
        var elementIndex = composite.w1o(DayBasedDateTimeUnitSerializer_getInstance().w1k());
        switch (elementIndex) {
          case 0:
            days._v = composite.k1o(DayBasedDateTimeUnitSerializer_getInstance().w1k(), 0);
            seen._v = true;
            break;
          case -1:
            break loop;
          default:
            throwUnknownIndexException(elementIndex);
            break;
        }
      }
    }
    var result = Unit_instance;
    composite.g1o(descriptor);
    if (!seen._v)
      throw MissingFieldException_init_$Create$('days', this.w1k().x1l());
    return new DayBased(days._v);
  };
  var DayBasedDateTimeUnitSerializer_instance;
  function DayBasedDateTimeUnitSerializer_getInstance() {
    if (DayBasedDateTimeUnitSerializer_instance == null)
      new DayBasedDateTimeUnitSerializer();
    return DayBasedDateTimeUnitSerializer_instance;
  }
  function MonthBasedDateTimeUnitSerializer$descriptor$delegate$lambda() {
    return buildClassSerialDescriptor('kotlinx.datetime.MonthBased', [], MonthBasedDateTimeUnitSerializer$descriptor$delegate$lambda$lambda);
  }
  function MonthBasedDateTimeUnitSerializer$descriptor$delegate$lambda$lambda($this$buildClassSerialDescriptor) {
    // Inline function 'kotlinx.serialization.descriptors.element' call
    var annotations = emptyList();
    // Inline function 'kotlinx.serialization.serializer' call
    // Inline function 'kotlinx.serialization.internal.cast' call
    var this_0 = serializer(createKType(PrimitiveClasses_getInstance().bc(), arrayOf([]), false));
    var descriptor = (isInterface(this_0, KSerializer) ? this_0 : THROW_CCE()).w1k();
    $this$buildClassSerialDescriptor.b1n('months', descriptor, annotations, false);
    return Unit_instance;
  }
  function MonthBasedDateTimeUnitSerializer() {
    MonthBasedDateTimeUnitSerializer_instance = this;
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp.l4n_1 = lazy_0(tmp_0, MonthBasedDateTimeUnitSerializer$descriptor$delegate$lambda);
  }
  protoOf(MonthBasedDateTimeUnitSerializer).w1k = function () {
    var tmp0 = this.l4n_1;
    // Inline function 'kotlin.getValue' call
    descriptor$factory_1();
    return tmp0.w();
  };
  protoOf(MonthBasedDateTimeUnitSerializer).m4n = function (encoder, value) {
    // Inline function 'kotlinx.serialization.encoding.encodeStructure' call
    var descriptor = this.w1k();
    var composite = encoder.f1o(descriptor);
    composite.p1p(MonthBasedDateTimeUnitSerializer_getInstance().w1k(), 0, value.m48_1);
    composite.g1o(descriptor);
  };
  protoOf(MonthBasedDateTimeUnitSerializer).x1k = function (encoder, value) {
    return this.m4n(encoder, value instanceof MonthBased ? value : THROW_CCE());
  };
  protoOf(MonthBasedDateTimeUnitSerializer).y1k = function (decoder) {
    var seen = {_v: false};
    var months = {_v: 0};
    // Inline function 'kotlinx.serialization.encoding.decodeStructure' call
    var descriptor = this.w1k();
    var composite = decoder.f1o(descriptor);
    if (composite.v1o()) {
      months._v = composite.k1o(MonthBasedDateTimeUnitSerializer_getInstance().w1k(), 0);
      seen._v = true;
    } else {
      loop: while (true) {
        var elementIndex = composite.w1o(MonthBasedDateTimeUnitSerializer_getInstance().w1k());
        switch (elementIndex) {
          case 0:
            months._v = composite.k1o(MonthBasedDateTimeUnitSerializer_getInstance().w1k(), 0);
            seen._v = true;
            break;
          case -1:
            break loop;
          default:
            throwUnknownIndexException(elementIndex);
            break;
        }
      }
    }
    var result = Unit_instance;
    composite.g1o(descriptor);
    if (!seen._v)
      throw MissingFieldException_init_$Create$('months', this.w1k().x1l());
    return new MonthBased(months._v);
  };
  var MonthBasedDateTimeUnitSerializer_instance;
  function MonthBasedDateTimeUnitSerializer_getInstance() {
    if (MonthBasedDateTimeUnitSerializer_instance == null)
      new MonthBasedDateTimeUnitSerializer();
    return MonthBasedDateTimeUnitSerializer_instance;
  }
  function _get_impl__d88w17_0($this) {
    var tmp0 = $this.n4n_1;
    // Inline function 'kotlin.getValue' call
    impl$factory_0();
    return tmp0.w();
  }
  function DateTimeUnitSerializer$impl$delegate$lambda() {
    var tmp = getKClass(DateTimeUnit);
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp_0 = [getKClass(DayBased), getKClass(MonthBased), getKClass(TimeBased)];
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp$ret$5 = [DayBasedDateTimeUnitSerializer_getInstance(), MonthBasedDateTimeUnitSerializer_getInstance(), TimeBasedDateTimeUnitSerializer_getInstance()];
    return new SealedClassSerializer('kotlinx.datetime.DateTimeUnit', tmp, tmp_0, tmp$ret$5);
  }
  function DateTimeUnitSerializer() {
    DateTimeUnitSerializer_instance = this;
    AbstractPolymorphicSerializer.call(this);
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp.n4n_1 = lazy_0(tmp_0, DateTimeUnitSerializer$impl$delegate$lambda);
  }
  protoOf(DateTimeUnitSerializer).n1l = function (decoder, klassName) {
    return _get_impl__d88w17_0(this).n1l(decoder, klassName);
  };
  protoOf(DateTimeUnitSerializer).o4n = function (encoder, value) {
    return _get_impl__d88w17_0(this).o1l(encoder, value);
  };
  protoOf(DateTimeUnitSerializer).o1l = function (encoder, value) {
    return this.o4n(encoder, value instanceof DateTimeUnit ? value : THROW_CCE());
  };
  protoOf(DateTimeUnitSerializer).l1l = function () {
    return getKClass(DateTimeUnit);
  };
  protoOf(DateTimeUnitSerializer).w1k = function () {
    return _get_impl__d88w17_0(this).w1k();
  };
  var DateTimeUnitSerializer_instance;
  function DateTimeUnitSerializer_getInstance() {
    if (DateTimeUnitSerializer_instance == null)
      new DateTimeUnitSerializer();
    return DateTimeUnitSerializer_instance;
  }
  function throwUnknownIndexException(index) {
    throw SerializationException_init_$Create$('An unknown field for index ' + index);
  }
  function descriptor$factory() {
    return getPropertyCallableRef('descriptor', 1, KProperty1, function (receiver) {
      return receiver.w1k();
    }, null);
  }
  function impl$factory() {
    return getPropertyCallableRef('impl', 1, KProperty1, function (receiver) {
      return _get_impl__d88w17(receiver);
    }, null);
  }
  function descriptor$factory_0() {
    return getPropertyCallableRef('descriptor', 1, KProperty1, function (receiver) {
      return receiver.w1k();
    }, null);
  }
  function descriptor$factory_1() {
    return getPropertyCallableRef('descriptor', 1, KProperty1, function (receiver) {
      return receiver.w1k();
    }, null);
  }
  function impl$factory_0() {
    return getPropertyCallableRef('impl', 1, KProperty1, function (receiver) {
      return _get_impl__d88w17_0(receiver);
    }, null);
  }
  function InstantIso8601Serializer() {
    InstantIso8601Serializer_instance = this;
    this.p4n_1 = PrimitiveSerialDescriptor('kotlinx.datetime.Instant', STRING_getInstance());
  }
  protoOf(InstantIso8601Serializer).w1k = function () {
    return this.p4n_1;
  };
  protoOf(InstantIso8601Serializer).y1k = function (decoder) {
    return Companion_getInstance_16().q4n(decoder.a1o());
  };
  protoOf(InstantIso8601Serializer).r4n = function (encoder, value) {
    encoder.j1p(value.toString());
  };
  protoOf(InstantIso8601Serializer).x1k = function (encoder, value) {
    return this.r4n(encoder, value instanceof Instant_0 ? value : THROW_CCE());
  };
  var InstantIso8601Serializer_instance;
  function InstantIso8601Serializer_getInstance() {
    if (InstantIso8601Serializer_instance == null)
      new InstantIso8601Serializer();
    return InstantIso8601Serializer_instance;
  }
  function LocalDateIso8601Serializer() {
    LocalDateIso8601Serializer_instance = this;
    this.s4n_1 = PrimitiveSerialDescriptor('kotlinx.datetime.LocalDate', STRING_getInstance());
  }
  protoOf(LocalDateIso8601Serializer).w1k = function () {
    return this.s4n_1;
  };
  protoOf(LocalDateIso8601Serializer).y1k = function (decoder) {
    return Companion_getInstance_17().v4n(decoder.a1o());
  };
  protoOf(LocalDateIso8601Serializer).w4n = function (encoder, value) {
    encoder.j1p(value.toString());
  };
  protoOf(LocalDateIso8601Serializer).x1k = function (encoder, value) {
    return this.w4n(encoder, value instanceof LocalDate_0 ? value : THROW_CCE());
  };
  var LocalDateIso8601Serializer_instance;
  function LocalDateIso8601Serializer_getInstance() {
    if (LocalDateIso8601Serializer_instance == null)
      new LocalDateIso8601Serializer();
    return LocalDateIso8601Serializer_instance;
  }
  function LocalDateTimeIso8601Serializer() {
    LocalDateTimeIso8601Serializer_instance = this;
    this.x4n_1 = PrimitiveSerialDescriptor('kotlinx.datetime.LocalDateTime', STRING_getInstance());
  }
  protoOf(LocalDateTimeIso8601Serializer).w1k = function () {
    return this.x4n_1;
  };
  protoOf(LocalDateTimeIso8601Serializer).y1k = function (decoder) {
    return Companion_getInstance_18().a4o(decoder.a1o());
  };
  protoOf(LocalDateTimeIso8601Serializer).b4o = function (encoder, value) {
    encoder.j1p(value.toString());
  };
  protoOf(LocalDateTimeIso8601Serializer).x1k = function (encoder, value) {
    return this.b4o(encoder, value instanceof LocalDateTime_0 ? value : THROW_CCE());
  };
  var LocalDateTimeIso8601Serializer_instance;
  function LocalDateTimeIso8601Serializer_getInstance() {
    if (LocalDateTimeIso8601Serializer_instance == null)
      new LocalDateTimeIso8601Serializer();
    return LocalDateTimeIso8601Serializer_instance;
  }
  function LocalTimeIso8601Serializer() {
    LocalTimeIso8601Serializer_instance = this;
    this.c4o_1 = PrimitiveSerialDescriptor('kotlinx.datetime.LocalTime', STRING_getInstance());
  }
  protoOf(LocalTimeIso8601Serializer).w1k = function () {
    return this.c4o_1;
  };
  protoOf(LocalTimeIso8601Serializer).y1k = function (decoder) {
    return Companion_getInstance_19().f4o(decoder.a1o());
  };
  protoOf(LocalTimeIso8601Serializer).g4o = function (encoder, value) {
    encoder.j1p(value.toString());
  };
  protoOf(LocalTimeIso8601Serializer).x1k = function (encoder, value) {
    return this.g4o(encoder, value instanceof LocalTime_0 ? value : THROW_CCE());
  };
  var LocalTimeIso8601Serializer_instance;
  function LocalTimeIso8601Serializer_getInstance() {
    if (LocalTimeIso8601Serializer_instance == null)
      new LocalTimeIso8601Serializer();
    return LocalTimeIso8601Serializer_instance;
  }
  function UtcOffsetSerializer() {
    UtcOffsetSerializer_instance = this;
    this.h4o_1 = PrimitiveSerialDescriptor('kotlinx.datetime.UtcOffset', STRING_getInstance());
  }
  protoOf(UtcOffsetSerializer).w1k = function () {
    return this.h4o_1;
  };
  protoOf(UtcOffsetSerializer).y1k = function (decoder) {
    return Companion_getInstance_22().j4o(decoder.a1o());
  };
  protoOf(UtcOffsetSerializer).k4o = function (encoder, value) {
    encoder.j1p(value.toString());
  };
  protoOf(UtcOffsetSerializer).x1k = function (encoder, value) {
    return this.k4o(encoder, value instanceof UtcOffset ? value : THROW_CCE());
  };
  var UtcOffsetSerializer_instance;
  function UtcOffsetSerializer_getInstance() {
    if (UtcOffsetSerializer_instance == null)
      new UtcOffsetSerializer();
    return UtcOffsetSerializer_instance;
  }
  function TimeZoneSerializer() {
    TimeZoneSerializer_instance = this;
    this.l4o_1 = PrimitiveSerialDescriptor('kotlinx.datetime.TimeZone', STRING_getInstance());
  }
  protoOf(TimeZoneSerializer).w1k = function () {
    return this.l4o_1;
  };
  protoOf(TimeZoneSerializer).y1k = function (decoder) {
    return Companion_getInstance_20().n4o(decoder.a1o());
  };
  protoOf(TimeZoneSerializer).o4o = function (encoder, value) {
    encoder.j1p(value.q4o());
  };
  protoOf(TimeZoneSerializer).x1k = function (encoder, value) {
    return this.o4o(encoder, value instanceof TimeZone ? value : THROW_CCE());
  };
  var TimeZoneSerializer_instance;
  function TimeZoneSerializer_getInstance() {
    if (TimeZoneSerializer_instance == null)
      new TimeZoneSerializer();
    return TimeZoneSerializer_instance;
  }
  function FixedOffsetTimeZoneSerializer() {
    FixedOffsetTimeZoneSerializer_instance = this;
    this.r4o_1 = PrimitiveSerialDescriptor('kotlinx.datetime.FixedOffsetTimeZone', STRING_getInstance());
  }
  protoOf(FixedOffsetTimeZoneSerializer).w1k = function () {
    return this.r4o_1;
  };
  protoOf(FixedOffsetTimeZoneSerializer).y1k = function (decoder) {
    var zone = Companion_getInstance_20().n4o(decoder.a1o());
    if (zone instanceof FixedOffsetTimeZone) {
      return zone;
    } else {
      throw SerializationException_init_$Create$("Timezone identifier '" + zone.toString() + "' does not correspond to a fixed-offset timezone");
    }
  };
  protoOf(FixedOffsetTimeZoneSerializer).s4o = function (encoder, value) {
    encoder.j1p(value.q4o());
  };
  protoOf(FixedOffsetTimeZoneSerializer).x1k = function (encoder, value) {
    return this.s4o(encoder, value instanceof FixedOffsetTimeZone ? value : THROW_CCE());
  };
  var FixedOffsetTimeZoneSerializer_instance;
  function FixedOffsetTimeZoneSerializer_getInstance() {
    if (FixedOffsetTimeZoneSerializer_instance == null)
      new FixedOffsetTimeZoneSerializer();
    return FixedOffsetTimeZoneSerializer_instance;
  }
  var DayOfWeek_MONDAY_instance;
  var DayOfWeek_TUESDAY_instance;
  var DayOfWeek_WEDNESDAY_instance;
  var DayOfWeek_THURSDAY_instance;
  var DayOfWeek_FRIDAY_instance;
  var DayOfWeek_SATURDAY_instance;
  var DayOfWeek_SUNDAY_instance;
  function values() {
    return [DayOfWeek_MONDAY_getInstance(), DayOfWeek_TUESDAY_getInstance(), DayOfWeek_WEDNESDAY_getInstance(), DayOfWeek_THURSDAY_getInstance(), DayOfWeek_FRIDAY_getInstance(), DayOfWeek_SATURDAY_getInstance(), DayOfWeek_SUNDAY_getInstance()];
  }
  function get_entries() {
    if ($ENTRIES == null)
      $ENTRIES = enumEntries(values());
    return $ENTRIES;
  }
  var DayOfWeek_entriesInitialized;
  function DayOfWeek_initEntries() {
    if (DayOfWeek_entriesInitialized)
      return Unit_instance;
    DayOfWeek_entriesInitialized = true;
    DayOfWeek_MONDAY_instance = new DayOfWeek_0('MONDAY', 0);
    DayOfWeek_TUESDAY_instance = new DayOfWeek_0('TUESDAY', 1);
    DayOfWeek_WEDNESDAY_instance = new DayOfWeek_0('WEDNESDAY', 2);
    DayOfWeek_THURSDAY_instance = new DayOfWeek_0('THURSDAY', 3);
    DayOfWeek_FRIDAY_instance = new DayOfWeek_0('FRIDAY', 4);
    DayOfWeek_SATURDAY_instance = new DayOfWeek_0('SATURDAY', 5);
    DayOfWeek_SUNDAY_instance = new DayOfWeek_0('SUNDAY', 6);
  }
  var $ENTRIES;
  function DayOfWeek_0(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function toDayOfWeek(_this__u8e3s4) {
    return DayOfWeek(_this__u8e3s4.value());
  }
  function DayOfWeek_MONDAY_getInstance() {
    DayOfWeek_initEntries();
    return DayOfWeek_MONDAY_instance;
  }
  function DayOfWeek_TUESDAY_getInstance() {
    DayOfWeek_initEntries();
    return DayOfWeek_TUESDAY_instance;
  }
  function DayOfWeek_WEDNESDAY_getInstance() {
    DayOfWeek_initEntries();
    return DayOfWeek_WEDNESDAY_instance;
  }
  function DayOfWeek_THURSDAY_getInstance() {
    DayOfWeek_initEntries();
    return DayOfWeek_THURSDAY_instance;
  }
  function DayOfWeek_FRIDAY_getInstance() {
    DayOfWeek_initEntries();
    return DayOfWeek_FRIDAY_instance;
  }
  function DayOfWeek_SATURDAY_getInstance() {
    DayOfWeek_initEntries();
    return DayOfWeek_SATURDAY_instance;
  }
  function DayOfWeek_SUNDAY_getInstance() {
    DayOfWeek_initEntries();
    return DayOfWeek_SUNDAY_instance;
  }
  function Companion_16() {
    Companion_instance_16 = this;
    var tmp = this;
    // Inline function 'kotlinx.datetime.jsTry' call
    var tmp$ret$1 = Instant.ofEpochSecond((new Long(-931914497, -750)).l3(), 999999999);
    tmp.l47_1 = new Instant_0(tmp$ret$1);
    var tmp_0 = this;
    // Inline function 'kotlinx.datetime.jsTry' call
    var tmp$ret$3 = Instant.ofEpochSecond((new Long(1151527680, 720)).l3(), 0);
    tmp_0.m47_1 = new Instant_0(tmp$ret$3);
    this.n47_1 = new Instant_0(Instant.MIN);
    this.o47_1 = new Instant_0(Instant.MAX);
  }
  protoOf(Companion_16).k47 = function () {
    return new Instant_0(Clock.systemUTC().instant());
  };
  protoOf(Companion_16).t4o = function (input, format) {
    var tmp;
    try {
      tmp = format.x4d(input).j4c();
    } catch ($p) {
      var tmp_0;
      if ($p instanceof IllegalArgumentException) {
        var e = $p;
        throw DateTimeFormatException_init_$Create$_2("Failed to parse an instant from '" + toString_0(input) + "'", e);
      } else {
        throw $p;
      }
    }
    return tmp;
  };
  protoOf(Companion_16).q4n = function (input, format, $super) {
    format = format === VOID ? Formats_getInstance().r4b_1 : format;
    return $super === VOID ? this.t4o(input, format) : $super.t4o.call(this, input, format);
  };
  protoOf(Companion_16).t4c = function (epochSeconds, nanosecondAdjustment) {
    var tmp;
    try {
      // Inline function 'kotlinx.datetime.jsTry' call
      var tmp$ret$1 = Instant.ofEpochSecond(epochSeconds.l3(), nanosecondAdjustment);
      tmp = new Instant_0(tmp$ret$1);
    } catch ($p) {
      var tmp_0;
      if ($p instanceof Error) {
        var e = $p;
        if (!isJodaDateTimeException(e))
          throw e;
        tmp_0 = epochSeconds.b1(new Long(0, 0)) > 0 ? this.o47_1 : this.n47_1;
      } else {
        throw $p;
      }
      tmp = tmp_0;
    }
    return tmp;
  };
  var Companion_instance_16;
  function Companion_getInstance_16() {
    if (Companion_instance_16 == null)
      new Companion_16();
    return Companion_instance_16;
  }
  function Instant_0(value) {
    Companion_getInstance_16();
    this.r4c_1 = value;
  }
  protoOf(Instant_0).s4c = function () {
    return numberToLong(this.r4c_1.epochSecond());
  };
  protoOf(Instant_0).u4o = function () {
    return numberToInt(this.r4c_1.nano());
  };
  protoOf(Instant_0).v4o = function () {
    // Inline function 'kotlin.Long.times' call
    var tmp2 = this.s4c().w2(toLong(1000));
    // Inline function 'kotlin.Long.plus' call
    var other = this.u4o() / 1000000 | 0;
    return tmp2.u2(toLong(other));
  };
  protoOf(Instant_0).w4o = function (other) {
    return this.r4c_1.compareTo(other.r4c_1);
  };
  protoOf(Instant_0).d = function (other) {
    return this.w4o(other instanceof Instant_0 ? other : THROW_CCE());
  };
  protoOf(Instant_0).equals = function (other) {
    var tmp;
    if (this === other) {
      tmp = true;
    } else {
      var tmp_0;
      if (other instanceof Instant_0) {
        tmp_0 = this.r4c_1 === other.r4c_1 || this.r4c_1.equals(other.r4c_1);
      } else {
        tmp_0 = false;
      }
      tmp = tmp_0;
    }
    return tmp;
  };
  protoOf(Instant_0).hashCode = function () {
    return this.r4c_1.hashCode();
  };
  protoOf(Instant_0).toString = function () {
    return this.r4c_1.toString();
  };
  function isJodaDateTimeParseException(_this__u8e3s4) {
    return hasJsExceptionName(_this__u8e3s4, 'DateTimeParseException');
  }
  function isJodaDateTimeException(_this__u8e3s4) {
    return hasJsExceptionName(_this__u8e3s4, 'DateTimeException');
  }
  function isJodaArithmeticException(_this__u8e3s4) {
    return hasJsExceptionName(_this__u8e3s4, 'ArithmeticException');
  }
  function Companion_17() {
    Companion_instance_17 = this;
    this.t4n_1 = new LocalDate_0(LocalDate.MIN);
    this.u4n_1 = new LocalDate_0(LocalDate.MAX);
  }
  protoOf(Companion_17).x4o = function (input, format) {
    var tmp;
    if (format === Formats_getInstance_0().a49()) {
      var tmp_0;
      try {
        // Inline function 'kotlinx.datetime.jsTry' call
        // Inline function 'kotlin.let' call
        var p0 = LocalDate.parse(toString_0(input));
        tmp_0 = new LocalDate_0(p0);
      } catch ($p) {
        var tmp_1;
        if ($p instanceof Error) {
          var e = $p;
          if (isJodaDateTimeParseException(e))
            throw DateTimeFormatException_init_$Create$_1(e);
          throw e;
        } else {
          throw $p;
        }
      }
      tmp = tmp_0;
    } else {
      tmp = format.x4d(input);
    }
    return tmp;
  };
  protoOf(Companion_17).v4n = function (input, format, $super) {
    format = format === VOID ? getIsoDateFormat() : format;
    return $super === VOID ? this.x4o(input, format) : $super.x4o.call(this, input, format);
  };
  var Companion_instance_17;
  function Companion_getInstance_17() {
    if (Companion_instance_17 == null)
      new Companion_17();
    return Companion_instance_17;
  }
  function Formats_0() {
    Formats_instance_0 = this;
    this.z48_1 = get_ISO_DATE_BASIC();
  }
  protoOf(Formats_0).a49 = function () {
    return get_ISO_DATE();
  };
  var Formats_instance_0;
  function Formats_getInstance_0() {
    if (Formats_instance_0 == null)
      new Formats_0();
    return Formats_instance_0;
  }
  function LocalDate_init_$Init$(year, monthNumber, dayOfMonth, $this) {
    var tmp;
    try {
      // Inline function 'kotlinx.datetime.jsTry' call
      tmp = LocalDate.of(year, monthNumber, dayOfMonth);
    } catch ($p) {
      var tmp_0;
      if ($p instanceof Error) {
        var e = $p;
        if (isJodaDateTimeException(e))
          throw IllegalArgumentException_init_$Create$_0(e);
        throw e;
      } else {
        throw $p;
      }
    }
    LocalDate_0.call($this, tmp);
    return $this;
  }
  function LocalDate_init_$Create$(year, monthNumber, dayOfMonth) {
    return LocalDate_init_$Init$(year, monthNumber, dayOfMonth, objectCreate(protoOf(LocalDate_0)));
  }
  function LocalDate_0(value) {
    Companion_getInstance_17();
    this.l4c_1 = value;
  }
  protoOf(LocalDate_0).r49 = function () {
    return this.l4c_1.year();
  };
  protoOf(LocalDate_0).p49 = function () {
    return this.l4c_1.monthValue();
  };
  protoOf(LocalDate_0).e4e = function () {
    return toDayOfWeek(this.l4c_1.dayOfWeek());
  };
  protoOf(LocalDate_0).equals = function (other) {
    var tmp;
    if (this === other) {
      tmp = true;
    } else {
      var tmp_0;
      if (other instanceof LocalDate_0) {
        tmp_0 = this.l4c_1 === other.l4c_1 || this.l4c_1.equals(other.l4c_1);
      } else {
        tmp_0 = false;
      }
      tmp = tmp_0;
    }
    return tmp;
  };
  protoOf(LocalDate_0).hashCode = function () {
    return this.l4c_1.hashCode();
  };
  protoOf(LocalDate_0).toString = function () {
    return this.l4c_1.toString();
  };
  protoOf(LocalDate_0).y4o = function (other) {
    return this.l4c_1.compareTo(other.l4c_1);
  };
  protoOf(LocalDate_0).d = function (other) {
    return this.y4o(other instanceof LocalDate_0 ? other : THROW_CCE());
  };
  protoOf(LocalDate_0).m4c = function () {
    return numberToInt(this.l4c_1.toEpochDay());
  };
  function plus_0(_this__u8e3s4, value, unit) {
    return plusNumber(_this__u8e3s4, value, unit);
  }
  function plus_1(_this__u8e3s4, period) {
    var tmp;
    try {
      // Inline function 'kotlin.with' call
      // Inline function 'kotlin.run' call
      var $this$run = _this__u8e3s4.l4c_1;
      var tmp_0;
      if (!(period.r47_1 === 0)) {
        // Inline function 'kotlinx.datetime.jsTry' call
        tmp_0 = $this$run.plusMonths(period.r47_1);
      } else {
        tmp_0 = $this$run;
      }
      // Inline function 'kotlin.run' call
      var $this$run_0 = tmp_0;
      var tmp_1;
      if (!(period.s47_1 === 0)) {
        // Inline function 'kotlinx.datetime.jsTry' call
        tmp_1 = $this$run_0.plusDays(period.s47_1);
      } else {
        tmp_1 = $this$run_0;
      }
      // Inline function 'kotlin.let' call
      var p0 = tmp_1;
      tmp = new LocalDate_0(p0);
    } catch ($p) {
      var tmp_2;
      if ($p instanceof Error) {
        var e = $p;
        if (isJodaDateTimeException(e) || isJodaArithmeticException(e))
          throw DateTimeArithmeticException_init_$Create$_0(e);
        throw e;
      } else {
        throw $p;
      }
    }
    return tmp;
  }
  function plusNumber(_this__u8e3s4, value, unit) {
    var tmp;
    try {
      var tmp_0;
      if (unit instanceof DayBased) {
        // Inline function 'kotlinx.datetime.jsTry' call
        tmp_0 = _this__u8e3s4.l4c_1.plusDays(numberToInt(numberToDouble(value) * unit.l48_1));
      } else {
        if (unit instanceof MonthBased) {
          // Inline function 'kotlinx.datetime.jsTry' call
          tmp_0 = _this__u8e3s4.l4c_1.plusMonths(numberToInt(numberToDouble(value) * unit.m48_1));
        } else {
          noWhenBranchMatchedException();
        }
      }
      // Inline function 'kotlin.let' call
      var p0 = tmp_0;
      tmp = new LocalDate_0(p0);
    } catch ($p) {
      var tmp_1;
      if ($p instanceof Error) {
        var e = $p;
        if (!isJodaDateTimeException(e) && !isJodaArithmeticException(e))
          throw e;
        throw DateTimeArithmeticException_init_$Create$_1('The result of adding ' + toString_0(value) + ' of ' + toString_0(unit) + ' to ' + _this__u8e3s4.toString() + ' is out of LocalDate range.', e);
      } else {
        throw $p;
      }
    }
    return tmp;
  }
  function LocalDateTime_init_$Init$(date, time, $this) {
    // Inline function 'kotlinx.datetime.jsTry' call
    var tmp$ret$1 = LocalDateTime.of(date.l4c_1, time.n4c_1);
    LocalDateTime_0.call($this, tmp$ret$1);
    return $this;
  }
  function LocalDateTime_init_$Create$(date, time) {
    return LocalDateTime_init_$Init$(date, time, objectCreate(protoOf(LocalDateTime_0)));
  }
  function Companion_18() {
    Companion_instance_18 = this;
    this.y4n_1 = new LocalDateTime_0(LocalDateTime.MIN);
    this.z4n_1 = new LocalDateTime_0(LocalDateTime.MAX);
  }
  protoOf(Companion_18).z4o = function (input, format) {
    var tmp;
    if (format === Formats_getInstance_1().b49_1) {
      var tmp_0;
      try {
        // Inline function 'kotlinx.datetime.jsTry' call
        // Inline function 'kotlin.let' call
        var p0 = LocalDateTime.parse(toString_0(input));
        tmp_0 = new LocalDateTime_0(p0);
      } catch ($p) {
        var tmp_1;
        if ($p instanceof Error) {
          var e = $p;
          if (isJodaDateTimeParseException(e))
            throw DateTimeFormatException_init_$Create$_1(e);
          throw e;
        } else {
          throw $p;
        }
      }
      tmp = tmp_0;
    } else {
      tmp = format.x4d(input);
    }
    return tmp;
  };
  protoOf(Companion_18).a4o = function (input, format, $super) {
    format = format === VOID ? getIsoDateTimeFormat() : format;
    return $super === VOID ? this.z4o(input, format) : $super.z4o.call(this, input, format);
  };
  var Companion_instance_18;
  function Companion_getInstance_18() {
    if (Companion_instance_18 == null)
      new Companion_18();
    return Companion_instance_18;
  }
  function Formats_1() {
    Formats_instance_1 = this;
    this.b49_1 = get_ISO_DATETIME();
  }
  var Formats_instance_1;
  function Formats_getInstance_1() {
    if (Formats_instance_1 == null)
      new Formats_1();
    return Formats_instance_1;
  }
  function LocalDateTime_0(value) {
    Companion_getInstance_18();
    this.p47_1 = value;
  }
  protoOf(LocalDateTime_0).e4e = function () {
    return toDayOfWeek(this.p47_1.dayOfWeek());
  };
  protoOf(LocalDateTime_0).d4a = function () {
    return this.p47_1.hour();
  };
  protoOf(LocalDateTime_0).q47 = function () {
    return new LocalDate_0(this.p47_1.toLocalDate());
  };
  protoOf(LocalDateTime_0).equals = function (other) {
    var tmp;
    if (this === other) {
      tmp = true;
    } else {
      var tmp_0;
      if (other instanceof LocalDateTime_0) {
        tmp_0 = this.p47_1 === other.p47_1 || this.p47_1.equals(other.p47_1);
      } else {
        tmp_0 = false;
      }
      tmp = tmp_0;
    }
    return tmp;
  };
  protoOf(LocalDateTime_0).hashCode = function () {
    return this.p47_1.hashCode();
  };
  protoOf(LocalDateTime_0).toString = function () {
    return this.p47_1.toString();
  };
  protoOf(LocalDateTime_0).a4p = function (other) {
    return this.p47_1.compareTo(other.p47_1);
  };
  protoOf(LocalDateTime_0).d = function (other) {
    return this.a4p(other instanceof LocalDateTime_0 ? other : THROW_CCE());
  };
  function LocalTime_init_$Init$(hour, minute, second, nanosecond, $this) {
    second = second === VOID ? 0 : second;
    nanosecond = nanosecond === VOID ? 0 : nanosecond;
    var tmp;
    try {
      // Inline function 'kotlinx.datetime.jsTry' call
      tmp = LocalTime.of(hour, minute, second, nanosecond);
    } catch ($p) {
      var tmp_0;
      if ($p instanceof Error) {
        var e = $p;
        if (isJodaDateTimeException(e))
          throw IllegalArgumentException_init_$Create$_0(e);
        throw e;
      } else {
        throw $p;
      }
    }
    LocalTime_0.call($this, tmp);
    return $this;
  }
  function LocalTime_init_$Create$(hour, minute, second, nanosecond) {
    return LocalTime_init_$Init$(hour, minute, second, nanosecond, objectCreate(protoOf(LocalTime_0)));
  }
  function Companion_19() {
    Companion_instance_19 = this;
    this.d4o_1 = new LocalTime_0(LocalTime.MIN);
    this.e4o_1 = new LocalTime_0(LocalTime.MAX);
  }
  protoOf(Companion_19).b4p = function (input, format) {
    var tmp;
    if (format === Formats_instance_2.a49()) {
      var tmp_0;
      try {
        // Inline function 'kotlinx.datetime.jsTry' call
        // Inline function 'kotlin.let' call
        var p0 = LocalTime.parse(toString_0(input));
        tmp_0 = new LocalTime_0(p0);
      } catch ($p) {
        var tmp_1;
        if ($p instanceof Error) {
          var e = $p;
          if (isJodaDateTimeParseException(e))
            throw DateTimeFormatException_init_$Create$_1(e);
          throw e;
        } else {
          throw $p;
        }
      }
      tmp = tmp_0;
    } else {
      tmp = format.x4d(input);
    }
    return tmp;
  };
  protoOf(Companion_19).f4o = function (input, format, $super) {
    format = format === VOID ? getIsoTimeFormat() : format;
    return $super === VOID ? this.b4p(input, format) : $super.b4p.call(this, input, format);
  };
  var Companion_instance_19;
  function Companion_getInstance_19() {
    if (Companion_instance_19 == null)
      new Companion_19();
    return Companion_instance_19;
  }
  function Formats_2() {
  }
  protoOf(Formats_2).a49 = function () {
    return get_ISO_TIME();
  };
  var Formats_instance_2;
  function Formats_getInstance_2() {
    return Formats_instance_2;
  }
  function LocalTime_0(value) {
    Companion_getInstance_19();
    this.n4c_1 = value;
  }
  protoOf(LocalTime_0).o4c = function () {
    return this.n4c_1.toSecondOfDay();
  };
  protoOf(LocalTime_0).equals = function (other) {
    var tmp;
    if (this === other) {
      tmp = true;
    } else {
      var tmp_0;
      if (other instanceof LocalTime_0) {
        tmp_0 = this.n4c_1 === other.n4c_1 || this.n4c_1.equals(other.n4c_1);
      } else {
        tmp_0 = false;
      }
      tmp = tmp_0;
    }
    return tmp;
  };
  protoOf(LocalTime_0).hashCode = function () {
    return this.n4c_1.hashCode();
  };
  protoOf(LocalTime_0).toString = function () {
    return this.n4c_1.toString();
  };
  protoOf(LocalTime_0).c4p = function (other) {
    return this.n4c_1.compareTo(other.n4c_1);
  };
  protoOf(LocalTime_0).d = function (other) {
    return this.c4p(other instanceof LocalTime_0 ? other : THROW_CCE());
  };
  function ofZone($this, zoneId) {
    var tmp;
    if (zoneId instanceof ZoneOffset) {
      tmp = FixedOffsetTimeZone_init_$Create$(new UtcOffset(zoneId));
    } else {
      if (zoneId.rules().isFixedOffset()) {
        var tmp_0 = zoneId.normalized();
        tmp = new FixedOffsetTimeZone(new UtcOffset(tmp_0 instanceof ZoneOffset ? tmp_0 : THROW_CCE()), zoneId);
      } else {
        tmp = new TimeZone(zoneId);
      }
    }
    return tmp;
  }
  function Companion_20() {
    Companion_instance_20 = this;
    this.m4o_1 = asTimeZone(new UtcOffset(ZoneOffset.UTC));
  }
  protoOf(Companion_20).d4p = function () {
    return ofZone(this, ZoneId.systemDefault());
  };
  protoOf(Companion_20).n4o = function (zoneId) {
    var tmp;
    try {
      // Inline function 'kotlinx.datetime.jsTry' call
      var tmp$ret$1 = ZoneId.of(zoneId);
      tmp = ofZone(this, tmp$ret$1);
    } catch ($p) {
      var tmp_0;
      if ($p instanceof Error) {
        var e = $p;
        if (isJodaDateTimeException(e))
          throw IllegalTimeZoneException_init_$Create$_0(e);
        throw e;
      } else {
        throw $p;
      }
    }
    return tmp;
  };
  var Companion_instance_20;
  function Companion_getInstance_20() {
    if (Companion_instance_20 == null)
      new Companion_20();
    return Companion_instance_20;
  }
  function TimeZone(zoneId) {
    Companion_getInstance_20();
    this.p4o_1 = zoneId;
  }
  protoOf(TimeZone).q4o = function () {
    return this.p4o_1.id();
  };
  protoOf(TimeZone).equals = function (other) {
    var tmp;
    if (this === other) {
      tmp = true;
    } else {
      var tmp_0;
      if (other instanceof TimeZone) {
        tmp_0 = this.p4o_1 === other.p4o_1 || this.p4o_1.equals(other.p4o_1);
      } else {
        tmp_0 = false;
      }
      tmp = tmp_0;
    }
    return tmp;
  };
  protoOf(TimeZone).hashCode = function () {
    return this.p4o_1.hashCode();
  };
  protoOf(TimeZone).toString = function () {
    return this.p4o_1.toString();
  };
  function toLocalDateTime(_this__u8e3s4, timeZone) {
    var tmp;
    try {
      // Inline function 'kotlinx.datetime.jsTry' call
      // Inline function 'kotlin.let' call
      var p0 = LocalDateTime.ofInstant(_this__u8e3s4.r4c_1, timeZone.p4o_1);
      tmp = new LocalDateTime_0(p0);
    } catch ($p) {
      var tmp_0;
      if ($p instanceof Error) {
        var e = $p;
        if (isJodaDateTimeException(e))
          throw DateTimeArithmeticException_init_$Create$_0(e);
        throw e;
      } else {
        throw $p;
      }
    }
    return tmp;
  }
  function FixedOffsetTimeZone_init_$Init$(offset, $this) {
    FixedOffsetTimeZone.call($this, offset, offset.p4c_1);
    return $this;
  }
  function FixedOffsetTimeZone_init_$Create$(offset) {
    return FixedOffsetTimeZone_init_$Init$(offset, objectCreate(protoOf(FixedOffsetTimeZone)));
  }
  function Companion_21() {
  }
  var Companion_instance_21;
  function Companion_getInstance_21() {
    return Companion_instance_21;
  }
  function FixedOffsetTimeZone(offset, zoneId) {
    TimeZone.call(this, zoneId);
    this.f4p_1 = offset;
  }
  function atStartOfDayIn(_this__u8e3s4, timeZone) {
    // Inline function 'kotlin.let' call
    var p0 = _this__u8e3s4.l4c_1.atStartOfDay(timeZone.p4o_1).toInstant();
    return new Instant_0(p0);
  }
  function get_isoFormat() {
    _init_properties_UtcOffset_kt__93zod7();
    var tmp0 = isoFormat$delegate;
    // Inline function 'kotlin.getValue' call
    isoFormat$factory();
    return tmp0.w();
  }
  var isoFormat$delegate;
  function get_isoBasicFormat() {
    _init_properties_UtcOffset_kt__93zod7();
    var tmp0 = isoBasicFormat$delegate;
    // Inline function 'kotlin.getValue' call
    isoBasicFormat$factory();
    return tmp0.w();
  }
  var isoBasicFormat$delegate;
  function get_fourDigitsFormat() {
    _init_properties_UtcOffset_kt__93zod7();
    var tmp0 = fourDigitsFormat$delegate;
    // Inline function 'kotlin.getValue' call
    fourDigitsFormat$factory();
    return tmp0.w();
  }
  var fourDigitsFormat$delegate;
  function Companion_22() {
    Companion_instance_22 = this;
    this.i4o_1 = new UtcOffset(ZoneOffset.UTC);
  }
  protoOf(Companion_22).g4p = function (input, format) {
    return format === Formats_instance_3.a49() ? parseWithFormat(input, get_isoFormat()) : format === Formats_instance_3.h4p() ? parseWithFormat(input, get_isoBasicFormat()) : format === Formats_instance_3.p4b() ? parseWithFormat(input, get_fourDigitsFormat()) : format.x4d(input);
  };
  protoOf(Companion_22).j4o = function (input, format, $super) {
    format = format === VOID ? getIsoUtcOffsetFormat() : format;
    return $super === VOID ? this.g4p(input, format) : $super.g4p.call(this, input, format);
  };
  var Companion_instance_22;
  function Companion_getInstance_22() {
    if (Companion_instance_22 == null)
      new Companion_22();
    return Companion_instance_22;
  }
  function Formats_3() {
  }
  protoOf(Formats_3).a49 = function () {
    return get_ISO_OFFSET();
  };
  protoOf(Formats_3).h4p = function () {
    return get_ISO_OFFSET_BASIC();
  };
  protoOf(Formats_3).p4b = function () {
    return get_FOUR_DIGIT_OFFSET();
  };
  var Formats_instance_3;
  function Formats_getInstance_3() {
    return Formats_instance_3;
  }
  function UtcOffset(zoneOffset) {
    Companion_getInstance_22();
    this.p4c_1 = zoneOffset;
  }
  protoOf(UtcOffset).q4c = function () {
    return this.p4c_1.totalSeconds();
  };
  protoOf(UtcOffset).hashCode = function () {
    return this.p4c_1.hashCode();
  };
  protoOf(UtcOffset).equals = function (other) {
    var tmp;
    if (other instanceof UtcOffset) {
      tmp = this.p4c_1 === other.p4c_1 || this.p4c_1.equals(other.p4c_1);
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(UtcOffset).toString = function () {
    return this.p4c_1.toString();
  };
  function UtcOffset_0(hours, minutes, seconds) {
    hours = hours === VOID ? null : hours;
    minutes = minutes === VOID ? null : minutes;
    seconds = seconds === VOID ? null : seconds;
    _init_properties_UtcOffset_kt__93zod7();
    var tmp;
    try {
      var tmp_0;
      if (!(hours == null)) {
        // Inline function 'kotlinx.datetime.jsTry' call
        var tmp_1 = ZoneOffset;
        var tmp_2 = minutes == null ? 0 : minutes;
        var tmp$ret$1 = tmp_1.ofHoursMinutesSeconds(hours, tmp_2, seconds == null ? 0 : seconds);
        tmp_0 = new UtcOffset(tmp$ret$1);
      } else if (!(minutes == null)) {
        // Inline function 'kotlinx.datetime.jsTry' call
        var tmp_3 = ZoneOffset;
        var tmp_4 = minutes / 60 | 0;
        var tmp_5 = minutes % 60 | 0;
        var tmp$ret$3 = tmp_3.ofHoursMinutesSeconds(tmp_4, tmp_5, seconds == null ? 0 : seconds);
        tmp_0 = new UtcOffset(tmp$ret$3);
      } else {
        // Inline function 'kotlinx.datetime.jsTry' call
        var tmp_6 = ZoneOffset;
        var tmp$ret$5 = tmp_6.ofTotalSeconds(seconds == null ? 0 : seconds);
        tmp_0 = new UtcOffset(tmp$ret$5);
      }
      tmp = tmp_0;
    } catch ($p) {
      var tmp_7;
      if ($p instanceof Error) {
        var e = $p;
        var tmp_8;
        if (isJodaDateTimeException(e)) {
          throw IllegalArgumentException_init_$Create$_0(e);
        } else {
          throw e;
        }
      } else {
        throw $p;
      }
    }
    return tmp;
  }
  function parseWithFormat(input, format) {
    _init_properties_UtcOffset_kt__93zod7();
    var tmp;
    try {
      // Inline function 'kotlinx.datetime.jsTry' call
      tmp = format.parse(toString_0(input)).get(ChronoField.OFFSET_SECONDS);
    } catch ($p) {
      var tmp_0;
      if ($p instanceof Error) {
        var e = $p;
        if (isJodaDateTimeParseException(e))
          throw DateTimeFormatException_init_$Create$_1(e);
        if (isJodaDateTimeException(e))
          throw DateTimeFormatException_init_$Create$_1(e);
        throw e;
      } else {
        throw $p;
      }
    }
    return UtcOffset_0(VOID, VOID, tmp);
  }
  function isoFormat$delegate$lambda() {
    _init_properties_UtcOffset_kt__93zod7();
    return (new DateTimeFormatterBuilder()).parseCaseInsensitive().appendOffsetId().toFormatter(ResolverStyle.STRICT);
  }
  function isoBasicFormat$delegate$lambda() {
    _init_properties_UtcOffset_kt__93zod7();
    return (new DateTimeFormatterBuilder()).parseCaseInsensitive().appendOffset('+HHmmss', 'Z').toFormatter(ResolverStyle.STRICT);
  }
  function fourDigitsFormat$delegate$lambda() {
    _init_properties_UtcOffset_kt__93zod7();
    return (new DateTimeFormatterBuilder()).parseCaseInsensitive().appendOffset('+HHMM', '+0000').toFormatter(ResolverStyle.STRICT);
  }
  function isoFormat$factory() {
    return getPropertyCallableRef('isoFormat', 0, KProperty0, function () {
      return get_isoFormat();
    }, null);
  }
  function isoBasicFormat$factory() {
    return getPropertyCallableRef('isoBasicFormat', 0, KProperty0, function () {
      return get_isoBasicFormat();
    }, null);
  }
  function fourDigitsFormat$factory() {
    return getPropertyCallableRef('fourDigitsFormat', 0, KProperty0, function () {
      return get_fourDigitsFormat();
    }, null);
  }
  var properties_initialized_UtcOffset_kt_4gxffr;
  function _init_properties_UtcOffset_kt__93zod7() {
    if (!properties_initialized_UtcOffset_kt_4gxffr) {
      properties_initialized_UtcOffset_kt_4gxffr = true;
      isoFormat$delegate = lazy(isoFormat$delegate$lambda);
      isoBasicFormat$delegate = lazy(isoBasicFormat$delegate$lambda);
      fourDigitsFormat$delegate = lazy(fourDigitsFormat$delegate$lambda);
    }
  }
  function safeMultiply(a, b) {
    if (b.equals(new Long(-1, -1))) {
      if (a.equals(new Long(0, -2147483648))) {
        throw ArithmeticException_init_$Create$('Multiplication overflows a long: ' + a.toString() + ' * ' + b.toString());
      }
      return a.b3();
    } else if (b.equals(new Long(0, 0)))
      return new Long(0, 0);
    else if (b.equals(new Long(1, 0)))
      return a;
    var total = a.w2(b);
    if (!total.x2(b).equals(a)) {
      throw ArithmeticException_init_$Create$('Multiplication overflows a long: ' + a.toString() + ' * ' + b.toString());
    }
    return total;
  }
  function safeAdd(a, b) {
    var sum = a.u2(b);
    if (a.i3(sum).b1(new Long(0, 0)) < 0 && a.i3(b).b1(new Long(0, 0)) >= 0) {
      throw ArithmeticException_init_$Create$('Addition overflows a long: ' + a.toString() + ' + ' + b.toString());
    }
    return sum;
  }
  function safeMultiply_0(a, b) {
    // Inline function 'kotlin.Long.times' call
    var result = toLong(a).w2(toLong(b));
    if (result.b1(new Long(2147483647, 0)) > 0 || result.b1(new Long(-2147483648, -1)) < 0)
      throw ArithmeticException_init_$Create$('Multiplication overflows Int range: ' + a + ' * ' + b + '.');
    return result.g1();
  }
  function hasJsExceptionName(_this__u8e3s4, name) {
    // Inline function 'kotlin.js.asDynamic' call
    return _this__u8e3s4.name == name;
  }
  //region block: post-declaration
  protoOf(Builder).b4d = appendAlternativeParsingImpl;
  protoOf(Builder).c4d = appendOptionalImpl;
  protoOf(Builder).l4b = chars;
  protoOf(Builder).p2d = build;
  protoOf(Builder).d4d = addFormatStructureForDate;
  protoOf(Builder).e4d = addFormatStructureForTime;
  protoOf(Builder).f4d = year;
  protoOf(Builder).k4b = year$default;
  protoOf(Builder).g4d = monthNumber;
  protoOf(Builder).h4d = monthNumber$default;
  protoOf(Builder).j4b = monthName;
  protoOf(Builder).g4b = dayOfMonth;
  protoOf(Builder).i4d = dayOfMonth$default;
  protoOf(Builder).o4b = dayOfWeek;
  protoOf(Builder).z4a = date;
  protoOf(Builder).j4d = hour;
  protoOf(Builder).a4b = hour$default;
  protoOf(Builder).k4d = minute;
  protoOf(Builder).b4b = minute$default;
  protoOf(Builder).l4d = second;
  protoOf(Builder).c4b = second$default;
  protoOf(Builder).d4b = secondFraction;
  protoOf(Builder).m4d = time;
  protoOf(Builder).n4d = offsetHours;
  protoOf(Builder).e4b = offsetHours$default;
  protoOf(Builder).o4d = offsetMinutesOfHour;
  protoOf(Builder).p4d = offsetMinutesOfHour$default;
  protoOf(Builder).q4d = offsetSecondsOfMinute;
  protoOf(Builder).r4d = offsetSecondsOfMinute$default;
  protoOf(Builder).f4b = offset;
  protoOf(Builder_0).b4d = appendAlternativeParsingImpl;
  protoOf(Builder_0).c4d = appendOptionalImpl;
  protoOf(Builder_0).l4b = chars;
  protoOf(Builder_0).p2d = build;
  protoOf(Builder_0).f4d = year;
  protoOf(Builder_0).k4b = year$default;
  protoOf(Builder_0).g4d = monthNumber;
  protoOf(Builder_0).h4d = monthNumber$default;
  protoOf(Builder_0).g4b = dayOfMonth;
  protoOf(Builder_0).i4d = dayOfMonth$default;
  protoOf(Builder_1).b4d = appendAlternativeParsingImpl;
  protoOf(Builder_1).c4d = appendOptionalImpl;
  protoOf(Builder_1).l4b = chars;
  protoOf(Builder_1).p2d = build;
  protoOf(Builder_1).d4d = addFormatStructureForDate;
  protoOf(Builder_1).e4d = addFormatStructureForTime;
  protoOf(Builder_1).f4d = year;
  protoOf(Builder_1).k4b = year$default;
  protoOf(Builder_1).g4d = monthNumber;
  protoOf(Builder_1).h4d = monthNumber$default;
  protoOf(Builder_1).g4b = dayOfMonth;
  protoOf(Builder_1).i4d = dayOfMonth$default;
  protoOf(Builder_1).z4a = date;
  protoOf(Builder_1).j4d = hour;
  protoOf(Builder_1).a4b = hour$default;
  protoOf(Builder_1).k4d = minute;
  protoOf(Builder_1).b4b = minute$default;
  protoOf(Builder_1).l4d = second;
  protoOf(Builder_1).c4b = second$default;
  protoOf(Builder_1).d4b = secondFraction;
  protoOf(Builder_1).m4d = time;
  protoOf(IncompleteLocalTime).a4a = set_fractionOfSecond;
  protoOf(IncompleteLocalTime).b4a = get_fractionOfSecond;
  protoOf(Builder_2).b4d = appendAlternativeParsingImpl;
  protoOf(Builder_2).c4d = appendOptionalImpl;
  protoOf(Builder_2).l4b = chars;
  protoOf(Builder_2).p2d = build;
  protoOf(Builder_2).j4d = hour;
  protoOf(Builder_2).a4b = hour$default;
  protoOf(Builder_2).k4d = minute;
  protoOf(Builder_2).b4b = minute$default;
  protoOf(Builder_2).l4d = second;
  protoOf(Builder_2).c4b = second$default;
  protoOf(Builder_2).d4b = secondFraction;
  protoOf(Builder_3).b4d = appendAlternativeParsingImpl;
  protoOf(Builder_3).c4d = appendOptionalImpl;
  protoOf(Builder_3).l4b = chars;
  protoOf(Builder_3).p2d = build;
  protoOf(Builder_3).n4d = offsetHours;
  protoOf(Builder_3).e4b = offsetHours$default;
  protoOf(Builder_3).o4d = offsetMinutesOfHour;
  protoOf(Builder_3).p4d = offsetMinutesOfHour$default;
  protoOf(Builder_3).q4d = offsetSecondsOfMinute;
  protoOf(Builder_3).r4d = offsetSecondsOfMinute$default;
  protoOf(PropertyAccessor).x4i = getterNotNull;
  //endregion
  //region block: init
  System_instance = new System();
  Companion_instance = new Companion();
  Companion_instance_0 = new Companion_0();
  Companion_instance_1 = new Companion_1();
  Companion_instance_2 = new Companion_2();
  Companion_instance_3 = new Companion_3();
  Companion_instance_4 = new Companion_4();
  Companion_instance_6 = new Companion_6();
  Companion_instance_9 = new Companion_9();
  Companion_instance_10 = new Companion_10();
  Companion_instance_11 = new Companion_11();
  Companion_instance_13 = new Companion_13();
  Companion_instance_14 = new Companion_14();
  Truth_instance = new Truth();
  ExpectedInt_instance = new ExpectedInt();
  Companion_instance_15 = new Companion_15();
  Formats_instance_2 = new Formats_2();
  Companion_instance_21 = new Companion_21();
  Formats_instance_3 = new Formats_3();
  //endregion
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = DatePeriod_init_$Create$;
  _.$_$.b = System_instance;
  _.$_$.c = Companion_getInstance_5;
  _.$_$.d = Companion_getInstance_16;
  _.$_$.e = Companion_getInstance_17;
  _.$_$.f = Companion_getInstance_20;
  _.$_$.g = atStartOfDayIn;
  _.$_$.h = plus_1;
  _.$_$.i = plus_0;
  _.$_$.j = toLocalDateTime;
  _.$_$.k = todayIn;
  //endregion
  return _;
}));

//# sourceMappingURL=Kotlin-DateTime-library-kotlinx-datetime.js.map
