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
  var protoOf = kotlin_kotlin.$_$.xb;
  var initMetadataForObject = kotlin_kotlin.$_$.za;
  var VOID = kotlin_kotlin.$_$.h;
  var objectCreate = kotlin_kotlin.$_$.wb;
  var initMetadataForCompanion = kotlin_kotlin.$_$.ua;
  var Long = kotlin_kotlin.$_$.xf;
  var initMetadataForClass = kotlin_kotlin.$_$.ta;
  var toString = kotlin_kotlin.$_$.v2;
  var toLong = kotlin_kotlin.$_$.zb;
  var numberRangeToNumber = kotlin_kotlin.$_$.rb;
  var THROW_CCE = kotlin_kotlin.$_$.cg;
  var ClosedRange = kotlin_kotlin.$_$.gc;
  var isInterface = kotlin_kotlin.$_$.ib;
  var contains = kotlin_kotlin.$_$.nc;
  var charSequenceGet = kotlin_kotlin.$_$.ha;
  var _Char___init__impl__6a9atx = kotlin_kotlin.$_$.o2;
  var Char__minus_impl_a2frrh = kotlin_kotlin.$_$.q2;
  var ArithmeticException = kotlin_kotlin.$_$.mf;
  var uppercaseChar = kotlin_kotlin.$_$.jf;
  var repeat = kotlin_kotlin.$_$.ce;
  var toInt = kotlin_kotlin.$_$.te;
  var StringBuilder_init_$Create$ = kotlin_kotlin.$_$.i1;
  var Unit_instance = kotlin_kotlin.$_$.f5;
  var abs = kotlin_kotlin.$_$.cc;
  var padStart = kotlin_kotlin.$_$.yd;
  var IllegalArgumentException_init_$Create$ = kotlin_kotlin.$_$.u1;
  var toString_0 = kotlin_kotlin.$_$.bc;
  var IllegalArgumentException_init_$Init$ = kotlin_kotlin.$_$.r1;
  var captureStack = kotlin_kotlin.$_$.ea;
  var IllegalArgumentException_init_$Init$_0 = kotlin_kotlin.$_$.t1;
  var IllegalArgumentException_init_$Init$_1 = kotlin_kotlin.$_$.p1;
  var IllegalArgumentException_init_$Init$_2 = kotlin_kotlin.$_$.v1;
  var IllegalArgumentException = kotlin_kotlin.$_$.vf;
  var RuntimeException_init_$Init$ = kotlin_kotlin.$_$.g2;
  var RuntimeException_init_$Init$_0 = kotlin_kotlin.$_$.f2;
  var RuntimeException = kotlin_kotlin.$_$.bg;
  var getStringHashCode = kotlin_kotlin.$_$.ra;
  var ensureNotNull = kotlin_kotlin.$_$.ug;
  var KMutableProperty1 = kotlin_kotlin.$_$.tc;
  var getPropertyCallableRef = kotlin_kotlin.$_$.qa;
  var KMutableProperty0 = kotlin_kotlin.$_$.sc;
  var Enum = kotlin_kotlin.$_$.sf;
  var initMetadataForInterface = kotlin_kotlin.$_$.xa;
  var IllegalStateException_init_$Create$ = kotlin_kotlin.$_$.y1;
  var isArray = kotlin_kotlin.$_$.ab;
  var ArrayList_init_$Create$ = kotlin_kotlin.$_$.o;
  var hashCode = kotlin_kotlin.$_$.sa;
  var listOf = kotlin_kotlin.$_$.q7;
  var get_indices = kotlin_kotlin.$_$.g7;
  var charSequenceLength = kotlin_kotlin.$_$.ia;
  var joinToString = kotlin_kotlin.$_$.h7;
  var equals = kotlin_kotlin.$_$.ma;
  var getBooleanHashCode = kotlin_kotlin.$_$.oa;
  var KProperty0 = kotlin_kotlin.$_$.uc;
  var lazy = kotlin_kotlin.$_$.ah;
  var ArrayList_init_$Create$_0 = kotlin_kotlin.$_$.p;
  var getOrNull = kotlin_kotlin.$_$.b7;
  var listOf_0 = kotlin_kotlin.$_$.p7;
  var emptyList = kotlin_kotlin.$_$.t6;
  var toString_1 = kotlin_kotlin.$_$.fh;
  var get_lastIndex = kotlin_kotlin.$_$.sd;
  var toSet = kotlin_kotlin.$_$.z8;
  var collectionSizeOrDefault = kotlin_kotlin.$_$.b6;
  var distinct = kotlin_kotlin.$_$.q6;
  var to = kotlin_kotlin.$_$.gh;
  var single = kotlin_kotlin.$_$.k8;
  var Collection = kotlin_kotlin.$_$.h5;
  var charSequenceSubSequence = kotlin_kotlin.$_$.ja;
  var mutableListOf = kotlin_kotlin.$_$.u7;
  var removeLastOrNull = kotlin_kotlin.$_$.e8;
  var sortWith = kotlin_kotlin.$_$.l8;
  var FunctionAdapter = kotlin_kotlin.$_$.aa;
  var Comparator = kotlin_kotlin.$_$.pf;
  var compareValues = kotlin_kotlin.$_$.e9;
  var Exception = kotlin_kotlin.$_$.uf;
  var Exception_init_$Init$ = kotlin_kotlin.$_$.n1;
  var StringBuilder_init_$Create$_0 = kotlin_kotlin.$_$.h1;
  var joinTo = kotlin_kotlin.$_$.i7;
  var plus = kotlin_kotlin.$_$.a8;
  var toMutableList = kotlin_kotlin.$_$.x8;
  var addAll = kotlin_kotlin.$_$.t5;
  var firstOrNull = kotlin_kotlin.$_$.x6;
  var drop = kotlin_kotlin.$_$.s6;
  var sortedWith = kotlin_kotlin.$_$.m8;
  var binarySearch = kotlin_kotlin.$_$.y5;
  var startsWith = kotlin_kotlin.$_$.ke;
  var checkCountOverflow = kotlin_kotlin.$_$.z5;
  var compareTo = kotlin_kotlin.$_$.ka;
  var removePrefix = kotlin_kotlin.$_$.zd;
  var UnsupportedOperationException_init_$Create$ = kotlin_kotlin.$_$.m2;
  var Comparable = kotlin_kotlin.$_$.of;
  var STRING_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.e;
  var PrimitiveSerialDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.b1;
  var SerializationException_init_$Create$ = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.b;
  var KSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.j2;
  var enumEntries = kotlin_kotlin.$_$.y9;
  var numberToLong = kotlin_kotlin.$_$.vb;
  var numberToInt = kotlin_kotlin.$_$.ub;
  var IllegalArgumentException_init_$Create$_0 = kotlin_kotlin.$_$.q1;
  var ArithmeticException_init_$Create$ = kotlin_kotlin.$_$.j1;
  //endregion
  //region block: pre-declaration
  initMetadataForObject(System, 'System');
  initMetadataForCompanion(Companion);
  initMetadataForClass(DateTimePeriod, 'DateTimePeriod', VOID, VOID, VOID, VOID, VOID, {0: DateTimePeriodIso8601Serializer_getInstance});
  initMetadataForClass(DatePeriod, 'DatePeriod', DatePeriod_init_$Create$, DateTimePeriod, VOID, VOID, VOID, {0: DatePeriodIso8601Serializer_getInstance});
  initMetadataForCompanion(Companion_0);
  initMetadataForClass(DateTimePeriodImpl, 'DateTimePeriodImpl', VOID, DateTimePeriod);
  initMetadataForClass(DateTimeFormatException, 'DateTimeFormatException', DateTimeFormatException_init_$Create$, IllegalArgumentException);
  initMetadataForClass(DateTimeArithmeticException, 'DateTimeArithmeticException', DateTimeArithmeticException_init_$Create$, RuntimeException);
  initMetadataForClass(IllegalTimeZoneException, 'IllegalTimeZoneException', IllegalTimeZoneException_init_$Create$, IllegalArgumentException);
  function set_fractionOfSecond(value) {
    this.b49(value == null ? null : value.e4f(9));
  }
  function get_fractionOfSecond() {
    var tmp0_safe_receiver = this.c49();
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
  initMetadataForCompanion(Companion_1);
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
      var this_0 = this.t4b();
      item(this_0);
      var tmp$ret$2 = this_0.o4b().e2d();
      destination.e(tmp$ret$2);
    }
    var others = destination;
    // Inline function 'kotlin.also' call
    var this_1 = this.t4b();
    mainFormat(this_1);
    var main = this_1.o4b().e2d();
    this.o4b().r4b(new AlternativesParsingFormatStructure(main, others));
  }
  function appendOptionalImpl(onZero, format) {
    var tmp = this.o4b();
    // Inline function 'kotlin.also' call
    var this_0 = this.t4b();
    format(this_0);
    tmp.r4b(new OptionalFormatStructure(onZero, this_0.o4b().e2d()));
  }
  function chars(value) {
    return this.o4b().r4b(new ConstantFormatStructure(value));
  }
  function build() {
    return new CachedFormatStructure(this.o4b().e2d().w4c_1);
  }
  initMetadataForInterface(AbstractDateTimeFormatBuilder, 'AbstractDateTimeFormatBuilder');
  function year$default(padding, $super) {
    padding = padding === VOID ? Padding_ZERO_getInstance() : padding;
    var tmp;
    if ($super === VOID) {
      this.y4b(padding);
      tmp = Unit_instance;
    } else {
      tmp = $super.y4b.call(this, padding);
    }
    return tmp;
  }
  function monthNumber$default(padding, $super) {
    padding = padding === VOID ? Padding_ZERO_getInstance() : padding;
    var tmp;
    if ($super === VOID) {
      this.z4b(padding);
      tmp = Unit_instance;
    } else {
      tmp = $super.z4b.call(this, padding);
    }
    return tmp;
  }
  function dayOfMonth$default(padding, $super) {
    padding = padding === VOID ? Padding_ZERO_getInstance() : padding;
    var tmp;
    if ($super === VOID) {
      this.z49(padding);
      tmp = Unit_instance;
    } else {
      tmp = $super.z49.call(this, padding);
    }
    return tmp;
  }
  initMetadataForInterface(WithDate, 'WithDate');
  function year(padding) {
    return this.w4b(new BasicFormatStructure(new YearDirective(padding)));
  }
  function monthNumber(padding) {
    return this.w4b(new BasicFormatStructure(new MonthDirective(padding)));
  }
  function monthName(names) {
    return this.w4b(new BasicFormatStructure(new MonthNameDirective(names)));
  }
  function dayOfMonth(padding) {
    return this.w4b(new BasicFormatStructure(new DayDirective(padding)));
  }
  function dayOfWeek(names) {
    return this.w4b(new BasicFormatStructure(new DayOfWeekDirective(names)));
  }
  function date(format) {
    var tmp;
    if (format instanceof LocalDateFormat) {
      this.w4b(format.c4d_1);
      tmp = Unit_instance;
    }
    return tmp;
  }
  initMetadataForInterface(AbstractWithDateBuilder, 'AbstractWithDateBuilder', VOID, VOID, [WithDate]);
  function hour$default(padding, $super) {
    padding = padding === VOID ? Padding_ZERO_getInstance() : padding;
    var tmp;
    if ($super === VOID) {
      this.c4c(padding);
      tmp = Unit_instance;
    } else {
      tmp = $super.c4c.call(this, padding);
    }
    return tmp;
  }
  function minute$default(padding, $super) {
    padding = padding === VOID ? Padding_ZERO_getInstance() : padding;
    var tmp;
    if ($super === VOID) {
      this.d4c(padding);
      tmp = Unit_instance;
    } else {
      tmp = $super.d4c.call(this, padding);
    }
    return tmp;
  }
  function second$default(padding, $super) {
    padding = padding === VOID ? Padding_ZERO_getInstance() : padding;
    var tmp;
    if ($super === VOID) {
      this.e4c(padding);
      tmp = Unit_instance;
    } else {
      tmp = $super.e4c.call(this, padding);
    }
    return tmp;
  }
  initMetadataForInterface(WithTime, 'WithTime');
  function hour(padding) {
    return this.x4b(new BasicFormatStructure(new HourDirective(padding)));
  }
  function minute(padding) {
    return this.x4b(new BasicFormatStructure(new MinuteDirective(padding)));
  }
  function second(padding) {
    return this.x4b(new BasicFormatStructure(new SecondDirective(padding)));
  }
  function secondFraction(minLength, maxLength) {
    return this.x4b(new BasicFormatStructure(new FractionalSecondDirective(minLength, maxLength)));
  }
  function time(format) {
    var tmp;
    if (format instanceof LocalTimeFormat) {
      this.x4b(format.h4f_1);
      tmp = Unit_instance;
    }
    return tmp;
  }
  initMetadataForInterface(AbstractWithTimeBuilder, 'AbstractWithTimeBuilder', VOID, VOID, [WithTime]);
  function addFormatStructureForDate(structure) {
    this.p4b(structure);
  }
  function addFormatStructureForTime(structure) {
    this.p4b(structure);
  }
  initMetadataForInterface(AbstractWithDateTimeBuilder, 'AbstractWithDateTimeBuilder', VOID, VOID, [AbstractWithDateBuilder, AbstractWithTimeBuilder, WithTime, WithDate]);
  function offsetHours$default(padding, $super) {
    padding = padding === VOID ? Padding_ZERO_getInstance() : padding;
    var tmp;
    if ($super === VOID) {
      this.g4c(padding);
      tmp = Unit_instance;
    } else {
      tmp = $super.g4c.call(this, padding);
    }
    return tmp;
  }
  function offsetMinutesOfHour$default(padding, $super) {
    padding = padding === VOID ? Padding_ZERO_getInstance() : padding;
    var tmp;
    if ($super === VOID) {
      this.h4c(padding);
      tmp = Unit_instance;
    } else {
      tmp = $super.h4c.call(this, padding);
    }
    return tmp;
  }
  function offsetSecondsOfMinute$default(padding, $super) {
    padding = padding === VOID ? Padding_ZERO_getInstance() : padding;
    var tmp;
    if ($super === VOID) {
      this.j4c(padding);
      tmp = Unit_instance;
    } else {
      tmp = $super.j4c.call(this, padding);
    }
    return tmp;
  }
  initMetadataForInterface(WithUtcOffset, 'WithUtcOffset');
  function offsetHours(padding) {
    return this.s4b(new SignedFormatStructure(new BasicFormatStructure(new UtcOffsetWholeHoursDirective(padding)), true));
  }
  function offsetMinutesOfHour(padding) {
    return this.s4b(new BasicFormatStructure(new UtcOffsetMinuteOfHourDirective(padding)));
  }
  function offsetSecondsOfMinute(padding) {
    return this.s4b(new BasicFormatStructure(new UtcOffsetSecondOfMinuteDirective(padding)));
  }
  function offset(format) {
    var tmp;
    if (format instanceof UtcOffsetFormat) {
      this.s4b(format.b4h_1);
      tmp = Unit_instance;
    }
    return tmp;
  }
  initMetadataForInterface(AbstractWithOffsetBuilder, 'AbstractWithOffsetBuilder', VOID, VOID, [WithUtcOffset]);
  initMetadataForClass(Builder, 'Builder', VOID, VOID, [AbstractDateTimeFormatBuilder, AbstractWithDateTimeBuilder, AbstractWithOffsetBuilder, WithUtcOffset, WithTime, WithDate]);
  initMetadataForClass(AbstractDateTimeFormat, 'AbstractDateTimeFormat');
  initMetadataForClass(DateTimeComponentsFormat, 'DateTimeComponentsFormat', VOID, AbstractDateTimeFormat);
  initMetadataForClass(TwoDigitNumber, 'TwoDigitNumber');
  initMetadataForClass(Padding, 'Padding', VOID, Enum);
  initMetadataForClass(IncompleteLocalDate, 'IncompleteLocalDate', IncompleteLocalDate);
  initMetadataForCompanion(Companion_2);
  initMetadataForClass(MonthNames, 'MonthNames');
  initMetadataForCompanion(Companion_3);
  initMetadataForClass(DayOfWeekNames, 'DayOfWeekNames');
  initMetadataForCompanion(Companion_4);
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
  initMetadataForCompanion(Companion_5);
  initMetadataForClass(Builder_1, 'Builder', VOID, VOID, [AbstractDateTimeFormatBuilder, AbstractWithDateTimeBuilder]);
  initMetadataForClass(LocalDateTimeFormat, 'LocalDateTimeFormat', VOID, AbstractDateTimeFormat);
  initMetadataForClass(IncompleteLocalDateTime, 'IncompleteLocalDateTime', IncompleteLocalDateTime, VOID, [TimeFieldContainer]);
  initMetadataForClass(IncompleteLocalTime, 'IncompleteLocalTime', IncompleteLocalTime, VOID, [TimeFieldContainer]);
  initMetadataForClass(AmPmMarker, 'AmPmMarker', VOID, Enum);
  initMetadataForCompanion(Companion_6);
  initMetadataForClass(Builder_2, 'Builder', VOID, VOID, [AbstractDateTimeFormatBuilder, AbstractWithTimeBuilder]);
  initMetadataForClass(LocalTimeFormat, 'LocalTimeFormat', VOID, AbstractDateTimeFormat);
  initMetadataForClass(HourDirective, 'HourDirective', VOID, UnsignedIntFieldFormatDirective);
  initMetadataForClass(MinuteDirective, 'MinuteDirective', VOID, UnsignedIntFieldFormatDirective);
  initMetadataForClass(SecondDirective, 'SecondDirective', VOID, UnsignedIntFieldFormatDirective);
  initMetadataForCompanion(Companion_7);
  initMetadataForClass(DecimalFractionFieldFormatDirective, 'DecimalFractionFieldFormatDirective');
  initMetadataForClass(FractionalSecondDirective, 'FractionalSecondDirective', VOID, DecimalFractionFieldFormatDirective);
  initMetadataForObject(TimeFields, 'TimeFields');
  initMetadataForClass(IncompleteUtcOffset, 'IncompleteUtcOffset', IncompleteUtcOffset, VOID, [UtcOffsetFieldContainer]);
  initMetadataForClass(UtcOffsetWholeHoursDirective, 'UtcOffsetWholeHoursDirective', VOID, UnsignedIntFieldFormatDirective);
  initMetadataForCompanion(Companion_8);
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
    var tmp0_elvis_lhs = this.l4i(container);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throw IllegalStateException_init_$Create$('Field ' + this.s4h() + ' is not set');
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
  initMetadataForCompanion(Companion_9);
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
  initMetadataForCompanion(Companion_10);
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
  initMetadataForObject(InstantIso8601Serializer, 'InstantIso8601Serializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(LocalDateIso8601Serializer, 'LocalDateIso8601Serializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(LocalDateTimeIso8601Serializer, 'LocalDateTimeIso8601Serializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(LocalTimeIso8601Serializer, 'LocalTimeIso8601Serializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(UtcOffsetSerializer, 'UtcOffsetSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(TimeZoneSerializer, 'TimeZoneSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(FixedOffsetTimeZoneSerializer, 'FixedOffsetTimeZoneSerializer', VOID, VOID, [KSerializer]);
  initMetadataForClass(DayOfWeek_0, 'DayOfWeek', VOID, Enum);
  initMetadataForCompanion(Companion_11);
  initMetadataForClass(Instant_0, 'Instant', VOID, VOID, [Comparable], VOID, VOID, {0: InstantIso8601Serializer_getInstance});
  initMetadataForCompanion(Companion_12);
  initMetadataForObject(Formats_0, 'Formats');
  initMetadataForClass(LocalDate_0, 'LocalDate', VOID, VOID, [Comparable], VOID, VOID, {0: LocalDateIso8601Serializer_getInstance});
  initMetadataForCompanion(Companion_13);
  initMetadataForObject(Formats_1, 'Formats');
  initMetadataForClass(LocalDateTime_0, 'LocalDateTime', VOID, VOID, [Comparable], VOID, VOID, {0: LocalDateTimeIso8601Serializer_getInstance});
  initMetadataForCompanion(Companion_14);
  initMetadataForObject(Formats_2, 'Formats');
  initMetadataForClass(LocalTime_0, 'LocalTime', VOID, VOID, [Comparable], VOID, VOID, {0: LocalTimeIso8601Serializer_getInstance});
  initMetadataForCompanion(Companion_15);
  initMetadataForClass(TimeZone, 'TimeZone', VOID, VOID, VOID, VOID, VOID, {0: TimeZoneSerializer_getInstance});
  initMetadataForCompanion(Companion_16);
  initMetadataForClass(FixedOffsetTimeZone, 'FixedOffsetTimeZone', VOID, TimeZone, VOID, VOID, VOID, {0: FixedOffsetTimeZoneSerializer_getInstance});
  initMetadataForCompanion(Companion_17);
  initMetadataForObject(Formats_3, 'Formats');
  initMetadataForClass(UtcOffset, 'UtcOffset', VOID, VOID, VOID, VOID, VOID, {0: UtcOffsetSerializer_getInstance});
  //endregion
  function System() {
  }
  protoOf(System).z46 = function () {
    return Companion_getInstance_11().z46();
  };
  var System_instance;
  function System_getInstance() {
    return System_instance;
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
    this.e47_1 = totalMonths;
    this.f47_1 = days;
  }
  protoOf(DatePeriod).g47 = function () {
    return this.e47_1;
  };
  protoOf(DatePeriod).h47 = function () {
    return this.f47_1;
  };
  protoOf(DatePeriod).i47 = function () {
    return 0;
  };
  protoOf(DatePeriod).j47 = function () {
    return 0;
  };
  protoOf(DatePeriod).k47 = function () {
    return 0;
  };
  protoOf(DatePeriod).l47 = function () {
    return 0;
  };
  protoOf(DatePeriod).m47 = function () {
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
    return $this.g47() <= 0 && $this.h47() <= 0 && $this.m47().b1(new Long(0, 0)) <= 0 && (!(($this.g47() | $this.h47()) === 0) || !$this.m47().equals(new Long(0, 0)));
  }
  function Companion_0() {
  }
  protoOf(Companion_0).dm = function (text) {
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
        var n = tmp0.s2(toLong(other));
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
      number = tmp4.u2(toLong(other_0));
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
  protoOf(DateTimePeriod).n47 = function () {
    return this.g47() / 12 | 0;
  };
  protoOf(DateTimePeriod).o47 = function () {
    return this.g47() % 12 | 0;
  };
  protoOf(DateTimePeriod).i47 = function () {
    return this.m47().v2(new Long(817405952, 838)).g1();
  };
  protoOf(DateTimePeriod).j47 = function () {
    return this.m47().w2(new Long(817405952, 838)).v2(new Long(-129542144, 13)).g1();
  };
  protoOf(DateTimePeriod).k47 = function () {
    var tmp0 = this.m47().w2(new Long(-129542144, 13));
    // Inline function 'kotlin.Long.div' call
    var other = 1000000000;
    return tmp0.v2(toLong(other)).g1();
  };
  protoOf(DateTimePeriod).l47 = function () {
    var tmp0 = this.m47();
    // Inline function 'kotlin.Long.rem' call
    var other = 1000000000;
    return tmp0.w2(toLong(other)).g1();
  };
  protoOf(DateTimePeriod).toString = function () {
    // Inline function 'kotlin.text.buildString' call
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$();
    var tmp;
    if (allNonpositive(this)) {
      this_0.e8(_Char___init__impl__6a9atx(45));
      tmp = -1;
    } else {
      tmp = 1;
    }
    var sign = tmp;
    this_0.e8(_Char___init__impl__6a9atx(80));
    if (!(this.n47() === 0)) {
      this_0.rc(imul(this.n47(), sign)).e8(_Char___init__impl__6a9atx(89));
    }
    if (!(this.o47() === 0)) {
      this_0.rc(imul(this.o47(), sign)).e8(_Char___init__impl__6a9atx(77));
    }
    if (!(this.h47() === 0)) {
      this_0.rc(imul(this.h47(), sign)).e8(_Char___init__impl__6a9atx(68));
    }
    var t = 'T';
    if (!(this.i47() === 0)) {
      // Inline function 'kotlin.also' call
      this_0.d8(t).rc(imul(this.i47(), sign)).e8(_Char___init__impl__6a9atx(72));
      t = '';
    }
    if (!(this.j47() === 0)) {
      // Inline function 'kotlin.also' call
      this_0.d8(t).rc(imul(this.j47(), sign)).e8(_Char___init__impl__6a9atx(77));
      t = '';
    }
    if (!((this.k47() | this.l47()) === 0)) {
      this_0.d8(t);
      this_0.c8(!(this.k47() === 0) ? imul(this.k47(), sign) : imul(this.l47(), sign) < 0 ? '-0' : '0');
      if (!(this.l47() === 0)) {
        var tmp_0 = this_0.e8(_Char___init__impl__6a9atx(46));
        // Inline function 'kotlin.math.absoluteValue' call
        var this_1 = this.l47();
        var tmp$ret$4 = abs(this_1);
        tmp_0.d8(padStart(tmp$ret$4.toString(), 9, _Char___init__impl__6a9atx(48)));
      }
      this_0.e8(_Char___init__impl__6a9atx(83));
    }
    if (this_0.a() === 1) {
      this_0.d8('0D');
    }
    return this_0.toString();
  };
  protoOf(DateTimePeriod).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof DateTimePeriod))
      return false;
    if (!(this.g47() === other.g47()))
      return false;
    if (!(this.h47() === other.h47()))
      return false;
    if (!this.m47().equals(other.m47()))
      return false;
    return true;
  };
  protoOf(DateTimePeriod).hashCode = function () {
    var result = this.g47();
    result = imul(31, result) + this.h47() | 0;
    result = imul(31, result) + this.m47().hashCode() | 0;
    return result;
  };
  function totalMonths(years, months) {
    // Inline function 'kotlin.Long.times' call
    var totalMonths = toLong(years).u2(toLong(12)).s2(toLong(months));
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
    var totalMinutes = toLong(hours).u2(toLong(60)).s2(toLong(minutes));
    // Inline function 'kotlin.Long.times' call
    var totalMinutesAsSeconds = totalMinutes.u2(toLong(60));
    // Inline function 'kotlin.Long.div' call
    var other = 1000000000;
    var tmp$ret$3 = nanoseconds.v2(toLong(other));
    var minutesAndNanosecondsAsSeconds = totalMinutesAsSeconds.s2(tmp$ret$3);
    // Inline function 'kotlin.Long.plus' call
    var totalSeconds = minutesAndNanosecondsAsSeconds.s2(toLong(seconds));
    var tmp;
    try {
      var tmp_0 = new Long(1000000000, 0);
      // Inline function 'kotlin.Long.rem' call
      var other_0 = 1000000000;
      var tmp$ret$5 = nanoseconds.w2(toLong(other_0));
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
    this.p47_1 = totalMonths;
    this.q47_1 = days;
    this.r47_1 = totalNanoseconds;
  }
  protoOf(DateTimePeriodImpl).g47 = function () {
    return this.p47_1;
  };
  protoOf(DateTimePeriodImpl).h47 = function () {
    return this.q47_1;
  };
  protoOf(DateTimePeriodImpl).m47 = function () {
    return this.r47_1;
  };
  function get_isoDayNumber(_this__u8e3s4) {
    return _this__u8e3s4.m2_1 + 1 | 0;
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
    return Formats_getInstance_0().t47();
  }
  function getIsoDateTimeFormat() {
    return Formats_getInstance_1().u47_1;
  }
  function getIsoTimeFormat() {
    return Formats_instance_2.t47();
  }
  function getIsoUtcOffsetFormat() {
    return Formats_instance_3.t47();
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
    this.v47_1 = date;
    this.w47_1 = time;
    this.x47_1 = offset;
    this.y47_1 = timeZoneId;
  }
  protoOf(DateTimeComponentsContents).z47 = function (_set____db54di) {
    this.v47_1.c48_1 = _set____db54di;
  };
  protoOf(DateTimeComponentsContents).e48 = function () {
    return this.v47_1.c48_1;
  };
  protoOf(DateTimeComponentsContents).f48 = function (_set____db54di) {
    this.v47_1.d48_1 = _set____db54di;
  };
  protoOf(DateTimeComponentsContents).g48 = function () {
    return this.v47_1.d48_1;
  };
  protoOf(DateTimeComponentsContents).h48 = function (_set____db54di) {
    this.v47_1.b48_1 = _set____db54di;
  };
  protoOf(DateTimeComponentsContents).i48 = function () {
    return this.v47_1.b48_1;
  };
  protoOf(DateTimeComponentsContents).j48 = function (_set____db54di) {
    this.v47_1.a48_1 = _set____db54di;
  };
  protoOf(DateTimeComponentsContents).k48 = function () {
    return this.v47_1.a48_1;
  };
  protoOf(DateTimeComponentsContents).l48 = function (_set____db54di) {
    this.w47_1.o48_1 = _set____db54di;
  };
  protoOf(DateTimeComponentsContents).s48 = function () {
    return this.w47_1.o48_1;
  };
  protoOf(DateTimeComponentsContents).t48 = function (value) {
    this.w47_1.t48(value);
  };
  protoOf(DateTimeComponentsContents).u48 = function () {
    return this.w47_1.u48();
  };
  protoOf(DateTimeComponentsContents).v48 = function (_set____db54di) {
    this.w47_1.m48_1 = _set____db54di;
  };
  protoOf(DateTimeComponentsContents).w48 = function () {
    return this.w47_1.m48_1;
  };
  protoOf(DateTimeComponentsContents).x48 = function (_set____db54di) {
    this.w47_1.n48_1 = _set____db54di;
  };
  protoOf(DateTimeComponentsContents).y48 = function () {
    return this.w47_1.n48_1;
  };
  protoOf(DateTimeComponentsContents).z48 = function (_set____db54di) {
    this.w47_1.p48_1 = _set____db54di;
  };
  protoOf(DateTimeComponentsContents).a49 = function () {
    return this.w47_1.p48_1;
  };
  protoOf(DateTimeComponentsContents).b49 = function (_set____db54di) {
    this.w47_1.r48_1 = _set____db54di;
  };
  protoOf(DateTimeComponentsContents).c49 = function () {
    return this.w47_1.r48_1;
  };
  protoOf(DateTimeComponentsContents).d49 = function (_set____db54di) {
    this.w47_1.q48_1 = _set____db54di;
  };
  protoOf(DateTimeComponentsContents).e49 = function () {
    return this.w47_1.q48_1;
  };
  protoOf(DateTimeComponentsContents).f49 = function (_set____db54di) {
    this.x47_1.g49_1 = _set____db54di;
  };
  protoOf(DateTimeComponentsContents).k49 = function () {
    return this.x47_1.g49_1;
  };
  protoOf(DateTimeComponentsContents).l49 = function (_set____db54di) {
    this.x47_1.i49_1 = _set____db54di;
  };
  protoOf(DateTimeComponentsContents).m49 = function () {
    return this.x47_1.i49_1;
  };
  protoOf(DateTimeComponentsContents).n49 = function (_set____db54di) {
    this.x47_1.j49_1 = _set____db54di;
  };
  protoOf(DateTimeComponentsContents).o49 = function () {
    return this.x47_1.j49_1;
  };
  protoOf(DateTimeComponentsContents).p49 = function (_set____db54di) {
    this.x47_1.h49_1 = _set____db54di;
  };
  protoOf(DateTimeComponentsContents).q49 = function () {
    return this.x47_1.h49_1;
  };
  protoOf(DateTimeComponentsContents).r49 = function () {
    return new DateTimeComponentsContents(this.v47_1.r49(), this.w47_1.r49(), this.x47_1.r49(), this.y47_1);
  };
  protoOf(DateTimeComponentsContents).equals = function (other) {
    var tmp;
    var tmp_0;
    var tmp_1;
    var tmp_2;
    if (other instanceof DateTimeComponentsContents) {
      tmp_2 = other.v47_1.equals(this.v47_1);
    } else {
      tmp_2 = false;
    }
    if (tmp_2) {
      tmp_1 = other.w47_1.equals(this.w47_1);
    } else {
      tmp_1 = false;
    }
    if (tmp_1) {
      tmp_0 = other.x47_1.equals(this.x47_1);
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      tmp = other.y47_1 == this.y47_1;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(DateTimeComponentsContents).hashCode = function () {
    var tmp = this.v47_1.hashCode() ^ this.w47_1.hashCode() ^ this.x47_1.hashCode();
    var tmp0_safe_receiver = this.y47_1;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : getStringHashCode(tmp0_safe_receiver);
    return tmp ^ (tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs);
  };
  function DateTimeComponents$Formats$ISO_DATE_TIME_OFFSET$lambda($this$Format) {
    $this$Format.s49(get_ISO_DATE());
    var tmp = [DateTimeComponents$Formats$ISO_DATE_TIME_OFFSET$lambda$lambda];
    alternativeParsing($this$Format, tmp, DateTimeComponents$Formats$ISO_DATE_TIME_OFFSET$lambda$lambda_0);
    $this$Format.t49();
    char($this$Format, _Char___init__impl__6a9atx(58));
    $this$Format.u49();
    char($this$Format, _Char___init__impl__6a9atx(58));
    $this$Format.v49();
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
    $this$optional.w49(1, 9);
    return Unit_instance;
  }
  function DateTimeComponents$Formats$ISO_DATE_TIME_OFFSET$lambda$lambda_2($this$alternativeParsing) {
    $this$alternativeParsing.x49();
    return Unit_instance;
  }
  function DateTimeComponents$Formats$ISO_DATE_TIME_OFFSET$lambda$lambda_3($this$alternativeParsing) {
    $this$alternativeParsing.y49(Formats_instance_3.t47());
    return Unit_instance;
  }
  function DateTimeComponents$Formats$RFC_1123$lambda($this$Format) {
    var tmp = [DateTimeComponents$Formats$RFC_1123$lambda$lambda];
    alternativeParsing($this$Format, tmp, DateTimeComponents$Formats$RFC_1123$lambda$lambda_0);
    $this$Format.z49(Padding_NONE_getInstance());
    char($this$Format, _Char___init__impl__6a9atx(32));
    $this$Format.c4a(Companion_getInstance_2().b4a_1);
    char($this$Format, _Char___init__impl__6a9atx(32));
    $this$Format.d4a();
    char($this$Format, _Char___init__impl__6a9atx(32));
    $this$Format.t49();
    char($this$Format, _Char___init__impl__6a9atx(58));
    $this$Format.u49();
    optional($this$Format, VOID, DateTimeComponents$Formats$RFC_1123$lambda$lambda_1);
    $this$Format.e4a(' ');
    var tmp_0 = DateTimeComponents$Formats$RFC_1123$lambda$lambda_2;
    var tmp_1 = [tmp_0, DateTimeComponents$Formats$RFC_1123$lambda$lambda_3];
    alternativeParsing($this$Format, tmp_1, DateTimeComponents$Formats$RFC_1123$lambda$lambda_4);
    return Unit_instance;
  }
  function DateTimeComponents$Formats$RFC_1123$lambda$lambda($this$alternativeParsing) {
    return Unit_instance;
  }
  function DateTimeComponents$Formats$RFC_1123$lambda$lambda_0($this$alternativeParsing) {
    $this$alternativeParsing.h4a(Companion_getInstance_3().g4a_1);
    $this$alternativeParsing.e4a(', ');
    return Unit_instance;
  }
  function DateTimeComponents$Formats$RFC_1123$lambda$lambda_1($this$optional) {
    char($this$optional, _Char___init__impl__6a9atx(58));
    $this$optional.v49();
    return Unit_instance;
  }
  function DateTimeComponents$Formats$RFC_1123$lambda$lambda_2($this$alternativeParsing) {
    $this$alternativeParsing.e4a('UT');
    return Unit_instance;
  }
  function DateTimeComponents$Formats$RFC_1123$lambda$lambda_3($this$alternativeParsing) {
    $this$alternativeParsing.e4a('Z');
    return Unit_instance;
  }
  function DateTimeComponents$Formats$RFC_1123$lambda$lambda_4($this$alternativeParsing) {
    optional($this$alternativeParsing, 'GMT', DateTimeComponents$Formats$RFC_1123$lambda$lambda$lambda);
    return Unit_instance;
  }
  function DateTimeComponents$Formats$RFC_1123$lambda$lambda$lambda($this$optional) {
    $this$optional.y49(Formats_instance_3.i4a());
    return Unit_instance;
  }
  function Companion_1() {
  }
  protoOf(Companion_1).j4a = function (block) {
    var builder = new Builder(new AppendableFormatStructure());
    block(builder);
    return new DateTimeComponentsFormat(builder.e2d());
  };
  var Companion_instance_1;
  function Companion_getInstance_1() {
    return Companion_instance_1;
  }
  function Formats() {
    Formats_instance = this;
    var tmp = this;
    var tmp_0 = Companion_instance_1;
    tmp.k4a_1 = tmp_0.j4a(DateTimeComponents$Formats$ISO_DATE_TIME_OFFSET$lambda);
    var tmp_1 = this;
    var tmp_2 = Companion_instance_1;
    tmp_1.l4a_1 = tmp_2.j4a(DateTimeComponents$Formats$RFC_1123$lambda);
  }
  var Formats_instance;
  function Formats_getInstance() {
    if (Formats_instance == null)
      new Formats();
    return Formats_instance;
  }
  function DateTimeComponents(contents) {
    contents = contents === VOID ? new DateTimeComponentsContents() : contents;
    this.m4a_1 = contents;
    this.n4a_1 = year$factory(this.m4a_1.v47_1);
    this.o4a_1 = new TwoDigitNumber(monthNumber$factory(this.m4a_1.v47_1));
    this.p4a_1 = new TwoDigitNumber(dayOfMonth$factory(this.m4a_1.v47_1));
    this.q4a_1 = new TwoDigitNumber(hour$factory(this.m4a_1.w47_1));
    this.r4a_1 = new TwoDigitNumber(hourOfAmPm$factory(this.m4a_1.w47_1));
    this.s4a_1 = amPm$factory(this.m4a_1.w47_1);
    this.t4a_1 = new TwoDigitNumber(minute$factory(this.m4a_1.w47_1));
    this.u4a_1 = new TwoDigitNumber(second$factory(this.m4a_1.w47_1));
    this.v4a_1 = isNegative$factory(this.m4a_1.x47_1);
    this.w4a_1 = new TwoDigitNumber(totalHoursAbs$factory(this.m4a_1.x47_1));
    this.x4a_1 = new TwoDigitNumber(minutesOfHour$factory(this.m4a_1.x47_1));
    this.y4a_1 = new TwoDigitNumber(secondsOfMinute$factory(this.m4a_1.x47_1));
    this.z4a_1 = timeZoneId$factory_0(this.m4a_1);
  }
  protoOf(DateTimeComponents).j48 = function (_set____db54di) {
    var tmp0 = this.n4a_1;
    // Inline function 'kotlin.setValue' call
    year$factory_0();
    tmp0.set(_set____db54di);
    return Unit_instance;
  };
  protoOf(DateTimeComponents).k48 = function () {
    var tmp0 = this.n4a_1;
    // Inline function 'kotlin.getValue' call
    year$factory_1();
    return tmp0.get();
  };
  protoOf(DateTimeComponents).c49 = function () {
    return this.m4a_1.w47_1.r48_1;
  };
  protoOf(DateTimeComponents).a4b = function () {
    return this.m4a_1.x47_1.a4b();
  };
  protoOf(DateTimeComponents).b4b = function () {
    return this.m4a_1.w47_1.b4b();
  };
  protoOf(DateTimeComponents).c4b = function () {
    var offset = this.a4b();
    var time = this.b4b();
    var truncatedDate = this.m4a_1.v47_1.r49();
    truncatedDate.a48_1 = requireParsedField(truncatedDate.a48_1, 'year') % 10000 | 0;
    var tmp;
    try {
      var secDelta = safeMultiply(toLong(ensureNotNull(this.k48()) / 10000 | 0), new Long(2036907392, 73));
      var epochDays = toLong(truncatedDate.d4b().f4b());
      // Inline function 'kotlin.Long.times' call
      var tmp2 = epochDays.u2(toLong(86400));
      // Inline function 'kotlin.Long.plus' call
      var other = time.h4b();
      var tmp4 = tmp2.s2(toLong(other));
      // Inline function 'kotlin.Long.minus' call
      var other_0 = offset.j4b();
      var tmp$ret$2 = tmp4.t2(toLong(other_0));
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
    if (totalSeconds.b1(Companion_getInstance_11().c47_1.l4b()) < 0 || totalSeconds.b1(Companion_getInstance_11().d47_1.l4b()) > 0)
      throw DateTimeFormatException_init_$Create$_0('The parsed date is outside the range representable by Instant');
    var tmp_1 = Companion_getInstance_11();
    var tmp0_elvis_lhs = this.c49();
    return tmp_1.m4b(totalSeconds, tmp0_elvis_lhs == null ? 0 : tmp0_elvis_lhs);
  };
  function Builder(actualBuilder) {
    this.n4b_1 = actualBuilder;
  }
  protoOf(Builder).o4b = function () {
    return this.n4b_1;
  };
  protoOf(Builder).p4b = function (structure) {
    this.n4b_1.r4b(structure);
  };
  protoOf(Builder).s4b = function (structure) {
    this.n4b_1.r4b(structure);
  };
  protoOf(Builder).t4b = function () {
    return new Builder(new AppendableFormatStructure());
  };
  function DateTimeComponentsFormat(actualFormat) {
    AbstractDateTimeFormat.call(this);
    this.l4c_1 = actualFormat;
  }
  protoOf(DateTimeComponentsFormat).m4c = function () {
    return this.l4c_1;
  };
  protoOf(DateTimeComponentsFormat).n4c = function (intermediate) {
    return new DateTimeComponents(intermediate);
  };
  protoOf(DateTimeComponentsFormat).o4c = function (intermediate) {
    return this.n4c(intermediate instanceof DateTimeComponentsContents ? intermediate : THROW_CCE());
  };
  protoOf(DateTimeComponentsFormat).p4c = function () {
    return get_emptyDateTimeComponentsContents();
  };
  function TwoDigitNumber(reference) {
    this.r4c_1 = reference;
  }
  function timeZoneId$factory() {
    return getPropertyCallableRef('timeZoneId', 1, KMutableProperty1, function (receiver) {
      return receiver.y47_1;
    }, function (receiver, value) {
      receiver.y47_1 = value;
      return Unit_instance;
    });
  }
  function year$factory($b0) {
    return getPropertyCallableRef('year', 0, KMutableProperty0, function () {
      return $b0.a48_1;
    }, function (value) {
      $b0.a48_1 = value;
      return Unit_instance;
    });
  }
  function monthNumber$factory($b0) {
    return getPropertyCallableRef('monthNumber', 0, KMutableProperty0, function () {
      return $b0.b48_1;
    }, function (value) {
      $b0.b48_1 = value;
      return Unit_instance;
    });
  }
  function dayOfMonth$factory($b0) {
    return getPropertyCallableRef('dayOfMonth', 0, KMutableProperty0, function () {
      return $b0.c48_1;
    }, function (value) {
      $b0.c48_1 = value;
      return Unit_instance;
    });
  }
  function hour$factory($b0) {
    return getPropertyCallableRef('hour', 0, KMutableProperty0, function () {
      return $b0.m48_1;
    }, function (value) {
      $b0.m48_1 = value;
      return Unit_instance;
    });
  }
  function hourOfAmPm$factory($b0) {
    return getPropertyCallableRef('hourOfAmPm', 0, KMutableProperty0, function () {
      return $b0.n48_1;
    }, function (value) {
      $b0.n48_1 = value;
      return Unit_instance;
    });
  }
  function amPm$factory($b0) {
    return getPropertyCallableRef('amPm', 0, KMutableProperty0, function () {
      return $b0.o48_1;
    }, function (value) {
      $b0.o48_1 = value;
      return Unit_instance;
    });
  }
  function minute$factory($b0) {
    return getPropertyCallableRef('minute', 0, KMutableProperty0, function () {
      return $b0.p48_1;
    }, function (value) {
      $b0.p48_1 = value;
      return Unit_instance;
    });
  }
  function second$factory($b0) {
    return getPropertyCallableRef('second', 0, KMutableProperty0, function () {
      return $b0.q48_1;
    }, function (value) {
      $b0.q48_1 = value;
      return Unit_instance;
    });
  }
  function isNegative$factory($b0) {
    return getPropertyCallableRef('isNegative', 0, KMutableProperty0, function () {
      return $b0.g49_1;
    }, function (value) {
      $b0.g49_1 = value;
      return Unit_instance;
    });
  }
  function totalHoursAbs$factory($b0) {
    return getPropertyCallableRef('totalHoursAbs', 0, KMutableProperty0, function () {
      return $b0.h49_1;
    }, function (value) {
      $b0.h49_1 = value;
      return Unit_instance;
    });
  }
  function minutesOfHour$factory($b0) {
    return getPropertyCallableRef('minutesOfHour', 0, KMutableProperty0, function () {
      return $b0.i49_1;
    }, function (value) {
      $b0.i49_1 = value;
      return Unit_instance;
    });
  }
  function secondsOfMinute$factory($b0) {
    return getPropertyCallableRef('secondsOfMinute', 0, KMutableProperty0, function () {
      return $b0.j49_1;
    }, function (value) {
      $b0.j49_1 = value;
      return Unit_instance;
    });
  }
  function timeZoneId$factory_0($b0) {
    return getPropertyCallableRef('timeZoneId', 0, KMutableProperty0, function () {
      return $b0.y47_1;
    }, function (value) {
      $b0.y47_1 = value;
      return Unit_instance;
    });
  }
  function year$factory_0() {
    return getPropertyCallableRef('year', 1, KMutableProperty1, function (receiver) {
      return receiver.k48();
    }, function (receiver, value) {
      return receiver.j48(value);
    });
  }
  function year$factory_1() {
    return getPropertyCallableRef('year', 1, KMutableProperty1, function (receiver) {
      return receiver.k48();
    }, function (receiver, value) {
      return receiver.j48(value);
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
  protoOf(AbstractDateTimeFormat).q4c = function (input) {
    var tmp;
    try {
      tmp = Parser__match$default_impl_x2xlti(_Parser___init__impl__gdyfby(this.m4c().v4c()), input, this.p4c());
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
      return this.o4c(matched);
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
    return _this__u8e3s4.e4a(toString(value));
  }
  function optional(_this__u8e3s4, ifZero, format) {
    ifZero = ifZero === VOID ? '' : ifZero;
    var tmp;
    if (isInterface(_this__u8e3s4, AbstractDateTimeFormatBuilder)) {
      _this__u8e3s4.v4b(ifZero, typeof format === 'function' ? format : THROW_CCE());
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
      _this__u8e3s4.u4b(tmp_0, typeof primaryFormat === 'function' ? primaryFormat : THROW_CCE());
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
    this.a48_1 = year;
    this.b48_1 = monthNumber;
    this.c48_1 = dayOfMonth;
    this.d48_1 = isoDayOfWeek;
  }
  protoOf(IncompleteLocalDate).j48 = function (_set____db54di) {
    this.a48_1 = _set____db54di;
  };
  protoOf(IncompleteLocalDate).k48 = function () {
    return this.a48_1;
  };
  protoOf(IncompleteLocalDate).h48 = function (_set____db54di) {
    this.b48_1 = _set____db54di;
  };
  protoOf(IncompleteLocalDate).i48 = function () {
    return this.b48_1;
  };
  protoOf(IncompleteLocalDate).z47 = function (_set____db54di) {
    this.c48_1 = _set____db54di;
  };
  protoOf(IncompleteLocalDate).e48 = function () {
    return this.c48_1;
  };
  protoOf(IncompleteLocalDate).f48 = function (_set____db54di) {
    this.d48_1 = _set____db54di;
  };
  protoOf(IncompleteLocalDate).g48 = function () {
    return this.d48_1;
  };
  protoOf(IncompleteLocalDate).d4b = function () {
    var date = LocalDate_init_$Create$(requireParsedField(this.a48_1, 'year'), requireParsedField(this.b48_1, 'monthNumber'), requireParsedField(this.c48_1, 'dayOfMonth'));
    var tmp0_safe_receiver = this.d48_1;
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      if (!(tmp0_safe_receiver === get_isoDayNumber(date.x4c()))) {
        throw DateTimeFormatException_init_$Create$_0('Can not create a LocalDate from the given input: ' + ('the day of week is ' + DayOfWeek(tmp0_safe_receiver).toString() + ' but the date is ' + date.toString() + ', which is a ' + date.x4c().toString()));
      }
    }
    return date;
  };
  protoOf(IncompleteLocalDate).r49 = function () {
    return new IncompleteLocalDate(this.a48_1, this.b48_1, this.c48_1, this.d48_1);
  };
  protoOf(IncompleteLocalDate).equals = function (other) {
    var tmp;
    var tmp_0;
    var tmp_1;
    var tmp_2;
    if (other instanceof IncompleteLocalDate) {
      tmp_2 = this.a48_1 == other.a48_1;
    } else {
      tmp_2 = false;
    }
    if (tmp_2) {
      tmp_1 = this.b48_1 == other.b48_1;
    } else {
      tmp_1 = false;
    }
    if (tmp_1) {
      tmp_0 = this.c48_1 == other.c48_1;
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      tmp = this.d48_1 == other.d48_1;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(IncompleteLocalDate).hashCode = function () {
    // Inline function 'kotlin.hashCode' call
    var tmp0_safe_receiver = this.a48_1;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : hashCode(tmp0_safe_receiver);
    var tmp$ret$0 = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
    var tmp = imul(tmp$ret$0, 31);
    // Inline function 'kotlin.hashCode' call
    var tmp0_safe_receiver_0 = this.b48_1;
    var tmp1_elvis_lhs_0 = tmp0_safe_receiver_0 == null ? null : hashCode(tmp0_safe_receiver_0);
    var tmp$ret$1 = tmp1_elvis_lhs_0 == null ? 0 : tmp1_elvis_lhs_0;
    var tmp_0 = tmp + imul(tmp$ret$1, 31) | 0;
    // Inline function 'kotlin.hashCode' call
    var tmp0_safe_receiver_1 = this.c48_1;
    var tmp1_elvis_lhs_1 = tmp0_safe_receiver_1 == null ? null : hashCode(tmp0_safe_receiver_1);
    var tmp$ret$2 = tmp1_elvis_lhs_1 == null ? 0 : tmp1_elvis_lhs_1;
    var tmp_1 = tmp_0 + imul(tmp$ret$2, 31) | 0;
    // Inline function 'kotlin.hashCode' call
    var tmp0_safe_receiver_2 = this.d48_1;
    var tmp1_elvis_lhs_2 = tmp0_safe_receiver_2 == null ? null : hashCode(tmp0_safe_receiver_2);
    var tmp$ret$3 = tmp1_elvis_lhs_2 == null ? 0 : tmp1_elvis_lhs_2;
    return tmp_1 + imul(tmp$ret$3, 31) | 0;
  };
  protoOf(IncompleteLocalDate).toString = function () {
    var tmp0_elvis_lhs = this.a48_1;
    var tmp = toString_0(tmp0_elvis_lhs == null ? '??' : tmp0_elvis_lhs);
    var tmp1_elvis_lhs = this.b48_1;
    var tmp_0 = toString_0(tmp1_elvis_lhs == null ? '??' : tmp1_elvis_lhs);
    var tmp2_elvis_lhs = this.c48_1;
    var tmp_1 = toString_0(tmp2_elvis_lhs == null ? '??' : tmp2_elvis_lhs);
    var tmp3_elvis_lhs = this.d48_1;
    return tmp + '-' + tmp_0 + '-' + tmp_1 + ' (day of week is ' + toString_0(tmp3_elvis_lhs == null ? '??' : tmp3_elvis_lhs) + ')';
  };
  function Companion_2() {
    Companion_instance_2 = this;
    this.a4a_1 = new MonthNames(listOf(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']));
    this.b4a_1 = new MonthNames(listOf(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']));
  }
  var Companion_instance_2;
  function Companion_getInstance_2() {
    if (Companion_instance_2 == null)
      new Companion_2();
    return Companion_instance_2;
  }
  function String$toString$ref() {
    var l = function (p0) {
      return toString_0(p0);
    };
    l.callableName = 'toString';
    return l;
  }
  function MonthNames(names) {
    Companion_getInstance_2();
    this.y4c_1 = names;
    // Inline function 'kotlin.require' call
    if (!(this.y4c_1.j() === 12)) {
      var message = 'Month names must contain exactly 12 elements';
      throw IllegalArgumentException_init_$Create$(toString_0(message));
    }
    // Inline function 'kotlin.collections.forEach' call
    var progression = get_indices(this.y4c_1);
    var inductionVariable = progression.c1_1;
    var last = progression.d1_1;
    if (inductionVariable <= last)
      do {
        var element = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var ix = element;
        // Inline function 'kotlin.text.isNotEmpty' call
        var this_0 = this.y4c_1.o(ix);
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
            if (!!(this.y4c_1.o(ix) === this.y4c_1.o(ix2))) {
              var message_1 = "Month names must be unique, but '" + this.y4c_1.o(ix) + "' was repeated";
              throw IllegalArgumentException_init_$Create$(toString_0(message_1));
            }
          }
           while (inductionVariable_0 < ix);
      }
       while (!(element === last));
  }
  protoOf(MonthNames).toString = function () {
    return joinToString(this.y4c_1, ', ', 'MonthNames(', ')', VOID, VOID, String$toString$ref());
  };
  protoOf(MonthNames).equals = function (other) {
    var tmp;
    if (other instanceof MonthNames) {
      tmp = equals(this.y4c_1, other.y4c_1);
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(MonthNames).hashCode = function () {
    return hashCode(this.y4c_1);
  };
  function Companion_3() {
    Companion_instance_3 = this;
    this.f4a_1 = new DayOfWeekNames(listOf(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']));
    this.g4a_1 = new DayOfWeekNames(listOf(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']));
  }
  var Companion_instance_3;
  function Companion_getInstance_3() {
    if (Companion_instance_3 == null)
      new Companion_3();
    return Companion_instance_3;
  }
  function String$toString$ref_0() {
    var l = function (p0) {
      return toString_0(p0);
    };
    l.callableName = 'toString';
    return l;
  }
  function DayOfWeekNames(names) {
    Companion_getInstance_3();
    this.z4c_1 = names;
    // Inline function 'kotlin.require' call
    if (!(this.z4c_1.j() === 7)) {
      var message = 'Day of week names must contain exactly 7 elements';
      throw IllegalArgumentException_init_$Create$(toString_0(message));
    }
    // Inline function 'kotlin.collections.forEach' call
    var progression = get_indices(this.z4c_1);
    var inductionVariable = progression.c1_1;
    var last = progression.d1_1;
    if (inductionVariable <= last)
      do {
        var element = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var ix = element;
        // Inline function 'kotlin.text.isNotEmpty' call
        var this_0 = this.z4c_1.o(ix);
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
            if (!!(this.z4c_1.o(ix) === this.z4c_1.o(ix2))) {
              var message_1 = "Day-of-week names must be unique, but '" + this.z4c_1.o(ix) + "' was repeated";
              throw IllegalArgumentException_init_$Create$(toString_0(message_1));
            }
          }
           while (inductionVariable_0 < ix);
      }
       while (!(element === last));
  }
  protoOf(DayOfWeekNames).toString = function () {
    return joinToString(this.z4c_1, ', ', 'DayOfWeekNames(', ')', VOID, VOID, String$toString$ref_0());
  };
  protoOf(DayOfWeekNames).equals = function (other) {
    var tmp;
    if (other instanceof DayOfWeekNames) {
      tmp = equals(this.z4c_1, other.z4c_1);
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(DayOfWeekNames).hashCode = function () {
    return hashCode(this.z4c_1);
  };
  function Companion_4() {
  }
  protoOf(Companion_4).a4d = function (block) {
    var builder = new Builder_0(new AppendableFormatStructure());
    block(builder);
    return new LocalDateFormat(builder.e2d());
  };
  var Companion_instance_4;
  function Companion_getInstance_4() {
    return Companion_instance_4;
  }
  function Builder_0(actualBuilder) {
    this.b4d_1 = actualBuilder;
  }
  protoOf(Builder_0).o4b = function () {
    return this.b4d_1;
  };
  protoOf(Builder_0).w4b = function (structure) {
    return this.b4d_1.r4b(structure);
  };
  protoOf(Builder_0).t4b = function () {
    return new Builder_0(new AppendableFormatStructure());
  };
  function LocalDateFormat(actualFormat) {
    AbstractDateTimeFormat.call(this);
    this.c4d_1 = actualFormat;
  }
  protoOf(LocalDateFormat).m4c = function () {
    return this.c4d_1;
  };
  protoOf(LocalDateFormat).d4d = function (intermediate) {
    return intermediate.d4b();
  };
  protoOf(LocalDateFormat).o4c = function (intermediate) {
    return this.d4d(intermediate instanceof IncompleteLocalDate ? intermediate : THROW_CCE());
  };
  protoOf(LocalDateFormat).p4c = function () {
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
    var tmp = DateFields_getInstance().e4d_1;
    // Inline function 'kotlinx.datetime.format.minDigits' call
    var tmp_0 = padding.equals(Padding_ZERO_getInstance()) ? 4 : 1;
    // Inline function 'kotlinx.datetime.format.spaces' call
    var tmp$ret$1 = padding.equals(Padding_SPACE_getInstance()) ? 4 : null;
    SignedIntFieldFormatDirective.call(this, tmp, tmp_0, null, tmp$ret$1, 4);
    this.n4d_1 = padding;
    this.o4d_1 = isYearOfEra;
  }
  protoOf(YearDirective).equals = function (other) {
    var tmp;
    var tmp_0;
    if (other instanceof YearDirective) {
      tmp_0 = this.n4d_1.equals(other.n4d_1);
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      tmp = this.o4d_1 === other.o4d_1;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(YearDirective).hashCode = function () {
    return imul(this.n4d_1.hashCode(), 31) + getBooleanHashCode(this.o4d_1) | 0;
  };
  function MonthDirective(padding) {
    var tmp = DateFields_getInstance().f4d_1;
    // Inline function 'kotlinx.datetime.format.minDigits' call
    var tmp_0 = padding.equals(Padding_ZERO_getInstance()) ? 2 : 1;
    // Inline function 'kotlinx.datetime.format.spaces' call
    var tmp$ret$1 = padding.equals(Padding_SPACE_getInstance()) ? 2 : null;
    UnsignedIntFieldFormatDirective.call(this, tmp, tmp_0, tmp$ret$1);
    this.a4e_1 = padding;
  }
  protoOf(MonthDirective).equals = function (other) {
    var tmp;
    if (other instanceof MonthDirective) {
      tmp = this.a4e_1.equals(other.a4e_1);
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(MonthDirective).hashCode = function () {
    return this.a4e_1.hashCode();
  };
  function MonthNameDirective(names) {
    NamedUnsignedIntFieldFormatDirective.call(this, DateFields_getInstance().f4d_1, names.y4c_1, 'monthName');
    this.i4e_1 = names;
  }
  protoOf(MonthNameDirective).equals = function (other) {
    var tmp;
    if (other instanceof MonthNameDirective) {
      tmp = equals(this.i4e_1.y4c_1, other.i4e_1.y4c_1);
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(MonthNameDirective).hashCode = function () {
    return hashCode(this.i4e_1.y4c_1);
  };
  function DayDirective(padding) {
    var tmp = DateFields_getInstance().g4d_1;
    // Inline function 'kotlinx.datetime.format.minDigits' call
    var tmp_0 = padding.equals(Padding_ZERO_getInstance()) ? 2 : 1;
    // Inline function 'kotlinx.datetime.format.spaces' call
    var tmp$ret$1 = padding.equals(Padding_SPACE_getInstance()) ? 2 : null;
    UnsignedIntFieldFormatDirective.call(this, tmp, tmp_0, tmp$ret$1);
    this.q4e_1 = padding;
  }
  protoOf(DayDirective).equals = function (other) {
    var tmp;
    if (other instanceof DayDirective) {
      tmp = this.q4e_1.equals(other.q4e_1);
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(DayDirective).hashCode = function () {
    return this.q4e_1.hashCode();
  };
  function DayOfWeekDirective(names) {
    NamedUnsignedIntFieldFormatDirective.call(this, DateFields_getInstance().h4d_1, names.z4c_1, 'dayOfWeekName');
    this.u4e_1 = names;
  }
  protoOf(DayOfWeekDirective).equals = function (other) {
    var tmp;
    if (other instanceof DayOfWeekDirective) {
      tmp = equals(this.u4e_1.z4c_1, other.u4e_1.z4c_1);
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(DayOfWeekDirective).hashCode = function () {
    return hashCode(this.u4e_1.z4c_1);
  };
  function DateFields() {
    DateFields_instance = this;
    this.e4d_1 = new GenericFieldSpec(new PropertyAccessor(year$factory_2()));
    this.f4d_1 = new UnsignedFieldSpec(new PropertyAccessor(monthNumber$factory_0()), 1, 12);
    this.g4d_1 = new UnsignedFieldSpec(new PropertyAccessor(dayOfMonth$factory_0()), 1, 31);
    this.h4d_1 = new UnsignedFieldSpec(new PropertyAccessor(isoDayOfWeek$factory()), 1, 7);
  }
  var DateFields_instance;
  function DateFields_getInstance() {
    if (DateFields_instance == null)
      new DateFields();
    return DateFields_instance;
  }
  function ISO_DATE$delegate$lambda() {
    _init_properties_LocalDateFormat_kt__k1uk9u();
    var tmp = Companion_instance_4;
    return tmp.a4d(ISO_DATE$delegate$lambda$lambda);
  }
  function ISO_DATE$delegate$lambda$lambda($this$build) {
    _init_properties_LocalDateFormat_kt__k1uk9u();
    $this$build.d4a();
    char($this$build, _Char___init__impl__6a9atx(45));
    $this$build.a4c();
    char($this$build, _Char___init__impl__6a9atx(45));
    $this$build.b4c();
    return Unit_instance;
  }
  function ISO_DATE_BASIC$delegate$lambda() {
    _init_properties_LocalDateFormat_kt__k1uk9u();
    var tmp = Companion_instance_4;
    return tmp.a4d(ISO_DATE_BASIC$delegate$lambda$lambda);
  }
  function ISO_DATE_BASIC$delegate$lambda$lambda($this$build) {
    _init_properties_LocalDateFormat_kt__k1uk9u();
    $this$build.d4a();
    $this$build.a4c();
    $this$build.b4c();
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
      return receiver.k48();
    }, function (receiver, value) {
      return receiver.j48(value);
    });
  }
  function monthNumber$factory_0() {
    return getPropertyCallableRef('monthNumber', 1, KMutableProperty1, function (receiver) {
      return receiver.i48();
    }, function (receiver, value) {
      return receiver.h48(value);
    });
  }
  function dayOfMonth$factory_0() {
    return getPropertyCallableRef('dayOfMonth', 1, KMutableProperty1, function (receiver) {
      return receiver.e48();
    }, function (receiver, value) {
      return receiver.z47(value);
    });
  }
  function isoDayOfWeek$factory() {
    return getPropertyCallableRef('isoDayOfWeek', 1, KMutableProperty1, function (receiver) {
      return receiver.g48();
    }, function (receiver, value) {
      return receiver.f48(value);
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
  function Companion_5() {
  }
  protoOf(Companion_5).v4e = function (block) {
    var builder = new Builder_1(new AppendableFormatStructure());
    block(builder);
    return new LocalDateTimeFormat(builder.e2d());
  };
  var Companion_instance_5;
  function Companion_getInstance_5() {
    return Companion_instance_5;
  }
  function Builder_1(actualBuilder) {
    this.w4e_1 = actualBuilder;
  }
  protoOf(Builder_1).o4b = function () {
    return this.w4e_1;
  };
  protoOf(Builder_1).p4b = function (structure) {
    this.w4e_1.r4b(structure);
  };
  protoOf(Builder_1).t4b = function () {
    return new Builder_1(new AppendableFormatStructure());
  };
  function LocalDateTimeFormat(actualFormat) {
    AbstractDateTimeFormat.call(this);
    this.x4e_1 = actualFormat;
  }
  protoOf(LocalDateTimeFormat).m4c = function () {
    return this.x4e_1;
  };
  protoOf(LocalDateTimeFormat).y4e = function (intermediate) {
    return intermediate.b4f();
  };
  protoOf(LocalDateTimeFormat).o4c = function (intermediate) {
    return this.y4e(intermediate instanceof IncompleteLocalDateTime ? intermediate : THROW_CCE());
  };
  protoOf(LocalDateTimeFormat).p4c = function () {
    return get_emptyIncompleteLocalDateTime();
  };
  function IncompleteLocalDateTime(date, time) {
    date = date === VOID ? new IncompleteLocalDate() : date;
    time = time === VOID ? new IncompleteLocalTime() : time;
    this.z4e_1 = date;
    this.a4f_1 = time;
  }
  protoOf(IncompleteLocalDateTime).z47 = function (_set____db54di) {
    this.z4e_1.c48_1 = _set____db54di;
  };
  protoOf(IncompleteLocalDateTime).e48 = function () {
    return this.z4e_1.c48_1;
  };
  protoOf(IncompleteLocalDateTime).f48 = function (_set____db54di) {
    this.z4e_1.d48_1 = _set____db54di;
  };
  protoOf(IncompleteLocalDateTime).g48 = function () {
    return this.z4e_1.d48_1;
  };
  protoOf(IncompleteLocalDateTime).h48 = function (_set____db54di) {
    this.z4e_1.b48_1 = _set____db54di;
  };
  protoOf(IncompleteLocalDateTime).i48 = function () {
    return this.z4e_1.b48_1;
  };
  protoOf(IncompleteLocalDateTime).j48 = function (_set____db54di) {
    this.z4e_1.a48_1 = _set____db54di;
  };
  protoOf(IncompleteLocalDateTime).k48 = function () {
    return this.z4e_1.a48_1;
  };
  protoOf(IncompleteLocalDateTime).l48 = function (_set____db54di) {
    this.a4f_1.o48_1 = _set____db54di;
  };
  protoOf(IncompleteLocalDateTime).s48 = function () {
    return this.a4f_1.o48_1;
  };
  protoOf(IncompleteLocalDateTime).t48 = function (value) {
    this.a4f_1.t48(value);
  };
  protoOf(IncompleteLocalDateTime).u48 = function () {
    return this.a4f_1.u48();
  };
  protoOf(IncompleteLocalDateTime).v48 = function (_set____db54di) {
    this.a4f_1.m48_1 = _set____db54di;
  };
  protoOf(IncompleteLocalDateTime).w48 = function () {
    return this.a4f_1.m48_1;
  };
  protoOf(IncompleteLocalDateTime).x48 = function (_set____db54di) {
    this.a4f_1.n48_1 = _set____db54di;
  };
  protoOf(IncompleteLocalDateTime).y48 = function () {
    return this.a4f_1.n48_1;
  };
  protoOf(IncompleteLocalDateTime).z48 = function (_set____db54di) {
    this.a4f_1.p48_1 = _set____db54di;
  };
  protoOf(IncompleteLocalDateTime).a49 = function () {
    return this.a4f_1.p48_1;
  };
  protoOf(IncompleteLocalDateTime).b49 = function (_set____db54di) {
    this.a4f_1.r48_1 = _set____db54di;
  };
  protoOf(IncompleteLocalDateTime).c49 = function () {
    return this.a4f_1.r48_1;
  };
  protoOf(IncompleteLocalDateTime).d49 = function (_set____db54di) {
    this.a4f_1.q48_1 = _set____db54di;
  };
  protoOf(IncompleteLocalDateTime).e49 = function () {
    return this.a4f_1.q48_1;
  };
  protoOf(IncompleteLocalDateTime).b4f = function () {
    return LocalDateTime_init_$Create$(this.z4e_1.d4b(), this.a4f_1.b4b());
  };
  protoOf(IncompleteLocalDateTime).r49 = function () {
    return new IncompleteLocalDateTime(this.z4e_1.r49(), this.a4f_1.r49());
  };
  function AbstractWithDateTimeBuilder() {
  }
  function ISO_DATETIME$delegate$lambda() {
    _init_properties_LocalDateTimeFormat_kt__aloigl();
    var tmp = Companion_instance_5;
    return tmp.v4e(ISO_DATETIME$delegate$lambda$lambda);
  }
  function ISO_DATETIME$delegate$lambda$lambda($this$build) {
    _init_properties_LocalDateTimeFormat_kt__aloigl();
    $this$build.s49(get_ISO_DATE());
    var tmp = [ISO_DATETIME$delegate$lambda$lambda$lambda];
    alternativeParsing($this$build, tmp, ISO_DATETIME$delegate$lambda$lambda$lambda_0);
    $this$build.f4c(get_ISO_TIME());
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
    this.m48_1 = hour;
    this.n48_1 = hourOfAmPm;
    this.o48_1 = amPm;
    this.p48_1 = minute;
    this.q48_1 = second;
    this.r48_1 = nanosecond;
  }
  protoOf(IncompleteLocalTime).v48 = function (_set____db54di) {
    this.m48_1 = _set____db54di;
  };
  protoOf(IncompleteLocalTime).w48 = function () {
    return this.m48_1;
  };
  protoOf(IncompleteLocalTime).x48 = function (_set____db54di) {
    this.n48_1 = _set____db54di;
  };
  protoOf(IncompleteLocalTime).y48 = function () {
    return this.n48_1;
  };
  protoOf(IncompleteLocalTime).l48 = function (_set____db54di) {
    this.o48_1 = _set____db54di;
  };
  protoOf(IncompleteLocalTime).s48 = function () {
    return this.o48_1;
  };
  protoOf(IncompleteLocalTime).z48 = function (_set____db54di) {
    this.p48_1 = _set____db54di;
  };
  protoOf(IncompleteLocalTime).a49 = function () {
    return this.p48_1;
  };
  protoOf(IncompleteLocalTime).d49 = function (_set____db54di) {
    this.q48_1 = _set____db54di;
  };
  protoOf(IncompleteLocalTime).e49 = function () {
    return this.q48_1;
  };
  protoOf(IncompleteLocalTime).b49 = function (_set____db54di) {
    this.r48_1 = _set____db54di;
  };
  protoOf(IncompleteLocalTime).c49 = function () {
    return this.r48_1;
  };
  protoOf(IncompleteLocalTime).b4b = function () {
    var tmp0_safe_receiver = this.m48_1;
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      var tmp0_safe_receiver_0 = this.n48_1;
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
      var tmp1_safe_receiver = this.o48_1;
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
      var tmp1_safe_receiver_0 = this.n48_1;
      var tmp_1;
      if (tmp1_safe_receiver_0 == null) {
        tmp_1 = null;
      } else {
        // Inline function 'kotlin.let' call
        var tmp0_safe_receiver_1 = this.o48_1;
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
    var tmp_4 = requireParsedField(this.p48_1, 'minute');
    var tmp4_elvis_lhs = this.q48_1;
    var tmp_5 = tmp4_elvis_lhs == null ? 0 : tmp4_elvis_lhs;
    var tmp5_elvis_lhs = this.r48_1;
    return LocalTime_init_$Create$(hour, tmp_4, tmp_5, tmp5_elvis_lhs == null ? 0 : tmp5_elvis_lhs);
  };
  protoOf(IncompleteLocalTime).r49 = function () {
    return new IncompleteLocalTime(this.m48_1, this.n48_1, this.o48_1, this.p48_1, this.q48_1, this.r48_1);
  };
  protoOf(IncompleteLocalTime).equals = function (other) {
    var tmp;
    var tmp_0;
    var tmp_1;
    var tmp_2;
    var tmp_3;
    var tmp_4;
    if (other instanceof IncompleteLocalTime) {
      tmp_4 = this.m48_1 == other.m48_1;
    } else {
      tmp_4 = false;
    }
    if (tmp_4) {
      tmp_3 = this.n48_1 == other.n48_1;
    } else {
      tmp_3 = false;
    }
    if (tmp_3) {
      tmp_2 = equals(this.o48_1, other.o48_1);
    } else {
      tmp_2 = false;
    }
    if (tmp_2) {
      tmp_1 = this.p48_1 == other.p48_1;
    } else {
      tmp_1 = false;
    }
    if (tmp_1) {
      tmp_0 = this.q48_1 == other.q48_1;
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      tmp = this.r48_1 == other.r48_1;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(IncompleteLocalTime).hashCode = function () {
    var tmp6_elvis_lhs = this.m48_1;
    var tmp = imul(tmp6_elvis_lhs == null ? 0 : tmp6_elvis_lhs, 31);
    var tmp5_elvis_lhs = this.n48_1;
    var tmp_0 = tmp + imul(tmp5_elvis_lhs == null ? 0 : tmp5_elvis_lhs, 31) | 0;
    var tmp3_safe_receiver = this.o48_1;
    var tmp4_elvis_lhs = tmp3_safe_receiver == null ? null : tmp3_safe_receiver.hashCode();
    var tmp_1 = tmp_0 + imul(tmp4_elvis_lhs == null ? 0 : tmp4_elvis_lhs, 31) | 0;
    var tmp2_elvis_lhs = this.p48_1;
    var tmp_2 = tmp_1 + imul(tmp2_elvis_lhs == null ? 0 : tmp2_elvis_lhs, 31) | 0;
    var tmp1_elvis_lhs = this.q48_1;
    var tmp_3 = tmp_2 + imul(tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs, 31) | 0;
    var tmp0_elvis_lhs = this.r48_1;
    return tmp_3 + (tmp0_elvis_lhs == null ? 0 : tmp0_elvis_lhs) | 0;
  };
  protoOf(IncompleteLocalTime).toString = function () {
    var tmp0_elvis_lhs = this.m48_1;
    var tmp = toString_0(tmp0_elvis_lhs == null ? '??' : tmp0_elvis_lhs);
    var tmp1_elvis_lhs = this.p48_1;
    var tmp_0 = toString_0(tmp1_elvis_lhs == null ? '??' : tmp1_elvis_lhs);
    var tmp2_elvis_lhs = this.q48_1;
    var tmp_1 = toString_0(tmp2_elvis_lhs == null ? '??' : tmp2_elvis_lhs);
    var tmp3_safe_receiver = this.r48_1;
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
  function Companion_6() {
  }
  protoOf(Companion_6).f4f = function (block) {
    var builder = new Builder_2(new AppendableFormatStructure());
    block(builder);
    return new LocalTimeFormat(builder.e2d());
  };
  var Companion_instance_6;
  function Companion_getInstance_6() {
    return Companion_instance_6;
  }
  function Builder_2(actualBuilder) {
    this.g4f_1 = actualBuilder;
  }
  protoOf(Builder_2).o4b = function () {
    return this.g4f_1;
  };
  protoOf(Builder_2).x4b = function (structure) {
    this.g4f_1.r4b(structure);
  };
  protoOf(Builder_2).t4b = function () {
    return new Builder_2(new AppendableFormatStructure());
  };
  function LocalTimeFormat(actualFormat) {
    AbstractDateTimeFormat.call(this);
    this.h4f_1 = actualFormat;
  }
  protoOf(LocalTimeFormat).m4c = function () {
    return this.h4f_1;
  };
  protoOf(LocalTimeFormat).i4f = function (intermediate) {
    return intermediate.b4b();
  };
  protoOf(LocalTimeFormat).o4c = function (intermediate) {
    return this.i4f(intermediate instanceof IncompleteLocalTime ? intermediate : THROW_CCE());
  };
  protoOf(LocalTimeFormat).p4c = function () {
    return get_emptyIncompleteLocalTime();
  };
  function AbstractWithTimeBuilder() {
  }
  function HourDirective(padding) {
    var tmp = TimeFields_getInstance().j4f_1;
    // Inline function 'kotlinx.datetime.format.minDigits' call
    var tmp_0 = padding.equals(Padding_ZERO_getInstance()) ? 2 : 1;
    // Inline function 'kotlinx.datetime.format.spaces' call
    var tmp$ret$1 = padding.equals(Padding_SPACE_getInstance()) ? 2 : null;
    UnsignedIntFieldFormatDirective.call(this, tmp, tmp_0, tmp$ret$1);
    this.t4f_1 = padding;
  }
  protoOf(HourDirective).equals = function (other) {
    var tmp;
    if (other instanceof HourDirective) {
      tmp = this.t4f_1.equals(other.t4f_1);
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(HourDirective).hashCode = function () {
    return this.t4f_1.hashCode();
  };
  function MinuteDirective(padding) {
    var tmp = TimeFields_getInstance().k4f_1;
    // Inline function 'kotlinx.datetime.format.minDigits' call
    var tmp_0 = padding.equals(Padding_ZERO_getInstance()) ? 2 : 1;
    // Inline function 'kotlinx.datetime.format.spaces' call
    var tmp$ret$1 = padding.equals(Padding_SPACE_getInstance()) ? 2 : null;
    UnsignedIntFieldFormatDirective.call(this, tmp, tmp_0, tmp$ret$1);
    this.y4f_1 = padding;
  }
  protoOf(MinuteDirective).equals = function (other) {
    var tmp;
    if (other instanceof MinuteDirective) {
      tmp = this.y4f_1.equals(other.y4f_1);
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(MinuteDirective).hashCode = function () {
    return this.y4f_1.hashCode();
  };
  function SecondDirective(padding) {
    var tmp = TimeFields_getInstance().l4f_1;
    // Inline function 'kotlinx.datetime.format.minDigits' call
    var tmp_0 = padding.equals(Padding_ZERO_getInstance()) ? 2 : 1;
    // Inline function 'kotlinx.datetime.format.spaces' call
    var tmp$ret$1 = padding.equals(Padding_SPACE_getInstance()) ? 2 : null;
    UnsignedIntFieldFormatDirective.call(this, tmp, tmp_0, tmp$ret$1);
    this.d4g_1 = padding;
  }
  protoOf(SecondDirective).equals = function (other) {
    var tmp;
    if (other instanceof SecondDirective) {
      tmp = this.d4g_1.equals(other.d4g_1);
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(SecondDirective).hashCode = function () {
    return this.d4g_1.hashCode();
  };
  function Companion_7() {
    Companion_instance_7 = this;
    this.e4g_1 = listOf([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    this.f4g_1 = listOf([2, 1, 0, 2, 1, 0, 2, 1, 0]);
  }
  var Companion_instance_7;
  function Companion_getInstance_7() {
    if (Companion_instance_7 == null)
      new Companion_7();
    return Companion_instance_7;
  }
  function FractionalSecondDirective(minDigits, maxDigits, zerosToAdd) {
    Companion_getInstance_7();
    zerosToAdd = zerosToAdd === VOID ? Companion_getInstance_7().e4g_1 : zerosToAdd;
    DecimalFractionFieldFormatDirective.call(this, TimeFields_getInstance().m4f_1, minDigits, maxDigits, zerosToAdd);
    this.k4g_1 = minDigits;
    this.l4g_1 = maxDigits;
  }
  protoOf(FractionalSecondDirective).equals = function (other) {
    var tmp;
    var tmp_0;
    if (other instanceof FractionalSecondDirective) {
      tmp_0 = this.k4g_1 === other.k4g_1;
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      tmp = this.l4g_1 === other.l4g_1;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(FractionalSecondDirective).hashCode = function () {
    return imul(31, this.k4g_1) + this.l4g_1 | 0;
  };
  function TimeFields() {
    TimeFields_instance = this;
    this.j4f_1 = new UnsignedFieldSpec(new PropertyAccessor(hour$factory_0()), 0, 23);
    this.k4f_1 = new UnsignedFieldSpec(new PropertyAccessor(minute$factory_0()), 0, 59);
    this.l4f_1 = new UnsignedFieldSpec(new PropertyAccessor(second$factory_0()), 0, 59, VOID, 0);
    this.m4f_1 = new GenericFieldSpec(new PropertyAccessor(fractionOfSecond$factory()), VOID, new DecimalFraction(0, 9));
    this.n4f_1 = new GenericFieldSpec(new PropertyAccessor(amPm$factory_0()));
    this.o4f_1 = new UnsignedFieldSpec(new PropertyAccessor(hourOfAmPm$factory_0()), 1, 12);
  }
  var TimeFields_instance;
  function TimeFields_getInstance() {
    if (TimeFields_instance == null)
      new TimeFields();
    return TimeFields_instance;
  }
  function ISO_TIME$delegate$lambda() {
    _init_properties_LocalTimeFormat_kt__5i3lfh();
    var tmp = Companion_instance_6;
    return tmp.f4f(ISO_TIME$delegate$lambda$lambda);
  }
  function ISO_TIME$delegate$lambda$lambda($this$build) {
    _init_properties_LocalTimeFormat_kt__5i3lfh();
    $this$build.t49();
    char($this$build, _Char___init__impl__6a9atx(58));
    $this$build.u49();
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
    $this$alternativeParsing.v49();
    optional($this$alternativeParsing, VOID, ISO_TIME$delegate$lambda$lambda$lambda$lambda);
    return Unit_instance;
  }
  function ISO_TIME$delegate$lambda$lambda$lambda$lambda($this$optional) {
    _init_properties_LocalTimeFormat_kt__5i3lfh();
    char($this$optional, _Char___init__impl__6a9atx(46));
    $this$optional.w49(1, 9);
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
      return receiver.w48();
    }, function (receiver, value) {
      return receiver.v48(value);
    });
  }
  function minute$factory_0() {
    return getPropertyCallableRef('minute', 1, KMutableProperty1, function (receiver) {
      return receiver.a49();
    }, function (receiver, value) {
      return receiver.z48(value);
    });
  }
  function second$factory_0() {
    return getPropertyCallableRef('second', 1, KMutableProperty1, function (receiver) {
      return receiver.e49();
    }, function (receiver, value) {
      return receiver.d49(value);
    });
  }
  function fractionOfSecond$factory() {
    return getPropertyCallableRef('fractionOfSecond', 1, KMutableProperty1, function (receiver) {
      return receiver.u48();
    }, function (receiver, value) {
      return receiver.t48(value);
    });
  }
  function amPm$factory_0() {
    return getPropertyCallableRef('amPm', 1, KMutableProperty1, function (receiver) {
      return receiver.s48();
    }, function (receiver, value) {
      return receiver.l48(value);
    });
  }
  function hourOfAmPm$factory_0() {
    return getPropertyCallableRef('hourOfAmPm', 1, KMutableProperty1, function (receiver) {
      return receiver.y48();
    }, function (receiver, value) {
      return receiver.x48(value);
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
    this.g49_1 = isNegative;
    this.h49_1 = totalHoursAbs;
    this.i49_1 = minutesOfHour;
    this.j49_1 = secondsOfMinute;
  }
  protoOf(IncompleteUtcOffset).f49 = function (_set____db54di) {
    this.g49_1 = _set____db54di;
  };
  protoOf(IncompleteUtcOffset).k49 = function () {
    return this.g49_1;
  };
  protoOf(IncompleteUtcOffset).p49 = function (_set____db54di) {
    this.h49_1 = _set____db54di;
  };
  protoOf(IncompleteUtcOffset).q49 = function () {
    return this.h49_1;
  };
  protoOf(IncompleteUtcOffset).l49 = function (_set____db54di) {
    this.i49_1 = _set____db54di;
  };
  protoOf(IncompleteUtcOffset).m49 = function () {
    return this.i49_1;
  };
  protoOf(IncompleteUtcOffset).n49 = function (_set____db54di) {
    this.j49_1 = _set____db54di;
  };
  protoOf(IncompleteUtcOffset).o49 = function () {
    return this.j49_1;
  };
  protoOf(IncompleteUtcOffset).a4b = function () {
    var sign = this.g49_1 === true ? -1 : 1;
    var tmp0_safe_receiver = this.h49_1;
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      tmp = imul(tmp0_safe_receiver, sign);
    }
    var tmp_0 = tmp;
    var tmp1_safe_receiver = this.i49_1;
    var tmp_1;
    if (tmp1_safe_receiver == null) {
      tmp_1 = null;
    } else {
      // Inline function 'kotlin.let' call
      tmp_1 = imul(tmp1_safe_receiver, sign);
    }
    var tmp_2 = tmp_1;
    var tmp2_safe_receiver = this.j49_1;
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
      tmp_2 = this.g49_1 == other.g49_1;
    } else {
      tmp_2 = false;
    }
    if (tmp_2) {
      tmp_1 = this.h49_1 == other.h49_1;
    } else {
      tmp_1 = false;
    }
    if (tmp_1) {
      tmp_0 = this.i49_1 == other.i49_1;
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      tmp = this.j49_1 == other.j49_1;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(IncompleteUtcOffset).hashCode = function () {
    // Inline function 'kotlin.hashCode' call
    var tmp0_safe_receiver = this.g49_1;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : hashCode(tmp0_safe_receiver);
    var tmp = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
    // Inline function 'kotlin.hashCode' call
    var tmp0_safe_receiver_0 = this.h49_1;
    var tmp1_elvis_lhs_0 = tmp0_safe_receiver_0 == null ? null : hashCode(tmp0_safe_receiver_0);
    var tmp_0 = tmp + (tmp1_elvis_lhs_0 == null ? 0 : tmp1_elvis_lhs_0) | 0;
    // Inline function 'kotlin.hashCode' call
    var tmp0_safe_receiver_1 = this.i49_1;
    var tmp1_elvis_lhs_1 = tmp0_safe_receiver_1 == null ? null : hashCode(tmp0_safe_receiver_1);
    var tmp_1 = tmp_0 + (tmp1_elvis_lhs_1 == null ? 0 : tmp1_elvis_lhs_1) | 0;
    // Inline function 'kotlin.hashCode' call
    var tmp0_safe_receiver_2 = this.j49_1;
    var tmp1_elvis_lhs_2 = tmp0_safe_receiver_2 == null ? null : hashCode(tmp0_safe_receiver_2);
    return tmp_1 + (tmp1_elvis_lhs_2 == null ? 0 : tmp1_elvis_lhs_2) | 0;
  };
  protoOf(IncompleteUtcOffset).r49 = function () {
    return new IncompleteUtcOffset(this.g49_1, this.h49_1, this.i49_1, this.j49_1);
  };
  protoOf(IncompleteUtcOffset).toString = function () {
    var tmp0_safe_receiver = this.g49_1;
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      tmp = tmp0_safe_receiver ? '-' : '+';
    }
    var tmp1_elvis_lhs = tmp;
    var tmp_0 = tmp1_elvis_lhs == null ? ' ' : tmp1_elvis_lhs;
    var tmp2_elvis_lhs = this.h49_1;
    var tmp_1 = toString_0(tmp2_elvis_lhs == null ? '??' : tmp2_elvis_lhs);
    var tmp3_elvis_lhs = this.i49_1;
    var tmp_2 = toString_0(tmp3_elvis_lhs == null ? '??' : tmp3_elvis_lhs);
    var tmp4_elvis_lhs = this.j49_1;
    return tmp_0 + tmp_1 + ':' + tmp_2 + ':' + toString_0(tmp4_elvis_lhs == null ? '??' : tmp4_elvis_lhs);
  };
  function UtcOffsetWholeHoursDirective(padding) {
    var tmp = OffsetFields_getInstance().r4g_1;
    // Inline function 'kotlinx.datetime.format.minDigits' call
    var tmp_0 = padding.equals(Padding_ZERO_getInstance()) ? 2 : 1;
    // Inline function 'kotlinx.datetime.format.spaces' call
    var tmp$ret$1 = padding.equals(Padding_SPACE_getInstance()) ? 2 : null;
    UnsignedIntFieldFormatDirective.call(this, tmp, tmp_0, tmp$ret$1);
    this.y4g_1 = padding;
  }
  protoOf(UtcOffsetWholeHoursDirective).equals = function (other) {
    var tmp;
    if (other instanceof UtcOffsetWholeHoursDirective) {
      tmp = this.y4g_1.equals(other.y4g_1);
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(UtcOffsetWholeHoursDirective).hashCode = function () {
    return this.y4g_1.hashCode();
  };
  function Companion_8() {
  }
  protoOf(Companion_8).z4g = function (block) {
    var builder = new Builder_3(new AppendableFormatStructure());
    block(builder);
    return new UtcOffsetFormat(builder.e2d());
  };
  var Companion_instance_8;
  function Companion_getInstance_8() {
    return Companion_instance_8;
  }
  function Builder_3(actualBuilder) {
    this.a4h_1 = actualBuilder;
  }
  protoOf(Builder_3).o4b = function () {
    return this.a4h_1;
  };
  protoOf(Builder_3).s4b = function (structure) {
    this.a4h_1.r4b(structure);
  };
  protoOf(Builder_3).t4b = function () {
    return new Builder_3(new AppendableFormatStructure());
  };
  function UtcOffsetFormat(actualFormat) {
    AbstractDateTimeFormat.call(this);
    this.b4h_1 = actualFormat;
  }
  protoOf(UtcOffsetFormat).m4c = function () {
    return this.b4h_1;
  };
  protoOf(UtcOffsetFormat).c4h = function (intermediate) {
    return intermediate.a4b();
  };
  protoOf(UtcOffsetFormat).o4c = function (intermediate) {
    return this.c4h(intermediate instanceof IncompleteUtcOffset ? intermediate : THROW_CCE());
  };
  protoOf(UtcOffsetFormat).p4c = function () {
    return get_emptyIncompleteUtcOffset();
  };
  function OffsetFields$sign$1() {
    this.d4h_1 = new PropertyAccessor(isNegative$factory_0());
  }
  protoOf(OffsetFields$sign$1).k49 = function () {
    return this.d4h_1;
  };
  protoOf(OffsetFields$sign$1).e4h = function (obj) {
    var tmp;
    var tmp_0;
    var tmp0_elvis_lhs = obj.q49();
    if ((tmp0_elvis_lhs == null ? 0 : tmp0_elvis_lhs) === 0) {
      var tmp1_elvis_lhs = obj.m49();
      tmp_0 = (tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs) === 0;
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      var tmp2_elvis_lhs = obj.o49();
      tmp = (tmp2_elvis_lhs == null ? 0 : tmp2_elvis_lhs) === 0;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(OffsetFields$sign$1).f4h = function (obj) {
    return this.e4h((!(obj == null) ? isInterface(obj, UtcOffsetFieldContainer) : false) ? obj : THROW_CCE());
  };
  function OffsetFields() {
    OffsetFields_instance = this;
    var tmp = this;
    tmp.q4g_1 = new OffsetFields$sign$1();
    var tmp_0 = this;
    var tmp0_accessor = new PropertyAccessor(totalHoursAbs$factory_0());
    var tmp1_sign = this.q4g_1;
    tmp_0.r4g_1 = new UnsignedFieldSpec(tmp0_accessor, 0, 18, VOID, 0, tmp1_sign);
    var tmp_1 = this;
    var tmp0_accessor_0 = new PropertyAccessor(minutesOfHour$factory_0());
    var tmp1_sign_0 = this.q4g_1;
    tmp_1.s4g_1 = new UnsignedFieldSpec(tmp0_accessor_0, 0, 59, VOID, 0, tmp1_sign_0);
    var tmp_2 = this;
    var tmp0_accessor_1 = new PropertyAccessor(secondsOfMinute$factory_0());
    var tmp1_sign_1 = this.q4g_1;
    tmp_2.t4g_1 = new UnsignedFieldSpec(tmp0_accessor_1, 0, 59, VOID, 0, tmp1_sign_1);
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
    var tmp = OffsetFields_getInstance().s4g_1;
    // Inline function 'kotlinx.datetime.format.minDigits' call
    var tmp_0 = padding.equals(Padding_ZERO_getInstance()) ? 2 : 1;
    // Inline function 'kotlinx.datetime.format.spaces' call
    var tmp$ret$1 = padding.equals(Padding_SPACE_getInstance()) ? 2 : null;
    UnsignedIntFieldFormatDirective.call(this, tmp, tmp_0, tmp$ret$1);
    this.k4h_1 = padding;
  }
  protoOf(UtcOffsetMinuteOfHourDirective).equals = function (other) {
    var tmp;
    if (other instanceof UtcOffsetMinuteOfHourDirective) {
      tmp = this.k4h_1.equals(other.k4h_1);
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(UtcOffsetMinuteOfHourDirective).hashCode = function () {
    return this.k4h_1.hashCode();
  };
  function UtcOffsetSecondOfMinuteDirective(padding) {
    var tmp = OffsetFields_getInstance().t4g_1;
    // Inline function 'kotlinx.datetime.format.minDigits' call
    var tmp_0 = padding.equals(Padding_ZERO_getInstance()) ? 2 : 1;
    // Inline function 'kotlinx.datetime.format.spaces' call
    var tmp$ret$1 = padding.equals(Padding_SPACE_getInstance()) ? 2 : null;
    UnsignedIntFieldFormatDirective.call(this, tmp, tmp_0, tmp$ret$1);
    this.p4h_1 = padding;
  }
  protoOf(UtcOffsetSecondOfMinuteDirective).equals = function (other) {
    var tmp;
    if (other instanceof UtcOffsetSecondOfMinuteDirective) {
      tmp = this.p4h_1.equals(other.p4h_1);
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(UtcOffsetSecondOfMinuteDirective).hashCode = function () {
    return this.p4h_1.hashCode();
  };
  function ISO_OFFSET$delegate$lambda() {
    _init_properties_UtcOffsetFormat_kt__9r9ddw();
    var tmp = Companion_instance_8;
    return tmp.z4g(ISO_OFFSET$delegate$lambda$lambda);
  }
  function ISO_OFFSET$delegate$lambda$lambda($this$build) {
    _init_properties_UtcOffsetFormat_kt__9r9ddw();
    var tmp = [ISO_OFFSET$delegate$lambda$lambda$lambda];
    alternativeParsing($this$build, tmp, ISO_OFFSET$delegate$lambda$lambda$lambda_0);
    return Unit_instance;
  }
  function ISO_OFFSET$delegate$lambda$lambda$lambda($this$alternativeParsing) {
    _init_properties_UtcOffsetFormat_kt__9r9ddw();
    $this$alternativeParsing.e4a('z');
    return Unit_instance;
  }
  function ISO_OFFSET$delegate$lambda$lambda$lambda_0($this$alternativeParsing) {
    _init_properties_UtcOffsetFormat_kt__9r9ddw();
    optional($this$alternativeParsing, 'Z', ISO_OFFSET$delegate$lambda$lambda$lambda$lambda);
    return Unit_instance;
  }
  function ISO_OFFSET$delegate$lambda$lambda$lambda$lambda($this$optional) {
    _init_properties_UtcOffsetFormat_kt__9r9ddw();
    $this$optional.x49();
    char($this$optional, _Char___init__impl__6a9atx(58));
    $this$optional.i4c();
    optional($this$optional, VOID, ISO_OFFSET$delegate$lambda$lambda$lambda$lambda$lambda);
    return Unit_instance;
  }
  function ISO_OFFSET$delegate$lambda$lambda$lambda$lambda$lambda($this$optional) {
    _init_properties_UtcOffsetFormat_kt__9r9ddw();
    char($this$optional, _Char___init__impl__6a9atx(58));
    $this$optional.k4c();
    return Unit_instance;
  }
  function ISO_OFFSET_BASIC$delegate$lambda() {
    _init_properties_UtcOffsetFormat_kt__9r9ddw();
    var tmp = Companion_instance_8;
    return tmp.z4g(ISO_OFFSET_BASIC$delegate$lambda$lambda);
  }
  function ISO_OFFSET_BASIC$delegate$lambda$lambda($this$build) {
    _init_properties_UtcOffsetFormat_kt__9r9ddw();
    var tmp = [ISO_OFFSET_BASIC$delegate$lambda$lambda$lambda];
    alternativeParsing($this$build, tmp, ISO_OFFSET_BASIC$delegate$lambda$lambda$lambda_0);
    return Unit_instance;
  }
  function ISO_OFFSET_BASIC$delegate$lambda$lambda$lambda($this$alternativeParsing) {
    _init_properties_UtcOffsetFormat_kt__9r9ddw();
    $this$alternativeParsing.e4a('z');
    return Unit_instance;
  }
  function ISO_OFFSET_BASIC$delegate$lambda$lambda$lambda_0($this$alternativeParsing) {
    _init_properties_UtcOffsetFormat_kt__9r9ddw();
    optional($this$alternativeParsing, 'Z', ISO_OFFSET_BASIC$delegate$lambda$lambda$lambda$lambda);
    return Unit_instance;
  }
  function ISO_OFFSET_BASIC$delegate$lambda$lambda$lambda$lambda($this$optional) {
    _init_properties_UtcOffsetFormat_kt__9r9ddw();
    $this$optional.x49();
    optional($this$optional, VOID, ISO_OFFSET_BASIC$delegate$lambda$lambda$lambda$lambda$lambda);
    return Unit_instance;
  }
  function ISO_OFFSET_BASIC$delegate$lambda$lambda$lambda$lambda$lambda($this$optional) {
    _init_properties_UtcOffsetFormat_kt__9r9ddw();
    $this$optional.i4c();
    optional($this$optional, VOID, ISO_OFFSET_BASIC$delegate$lambda$lambda$lambda$lambda$lambda$lambda);
    return Unit_instance;
  }
  function ISO_OFFSET_BASIC$delegate$lambda$lambda$lambda$lambda$lambda$lambda($this$optional) {
    _init_properties_UtcOffsetFormat_kt__9r9ddw();
    $this$optional.k4c();
    return Unit_instance;
  }
  function FOUR_DIGIT_OFFSET$delegate$lambda() {
    _init_properties_UtcOffsetFormat_kt__9r9ddw();
    var tmp = Companion_instance_8;
    return tmp.z4g(FOUR_DIGIT_OFFSET$delegate$lambda$lambda);
  }
  function FOUR_DIGIT_OFFSET$delegate$lambda$lambda($this$build) {
    _init_properties_UtcOffsetFormat_kt__9r9ddw();
    $this$build.x49();
    $this$build.i4c();
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
      return receiver.q49();
    }, function (receiver, value) {
      return receiver.p49(value);
    });
  }
  function minutesOfHour$factory_0() {
    return getPropertyCallableRef('minutesOfHour', 1, KMutableProperty1, function (receiver) {
      return receiver.m49();
    }, function (receiver, value) {
      return receiver.l49(value);
    });
  }
  function secondsOfMinute$factory_0() {
    return getPropertyCallableRef('secondsOfMinute', 1, KMutableProperty1, function (receiver) {
      return receiver.o49();
    }, function (receiver, value) {
      return receiver.n49(value);
    });
  }
  function isNegative$factory_0() {
    return getPropertyCallableRef('isNegative', 1, KMutableProperty1, function (receiver) {
      return receiver.k49();
    }, function (receiver, value) {
      return receiver.f49(value);
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
    tmp.q4b_1 = ArrayList_init_$Create$_0();
  }
  protoOf(AppendableFormatStructure).e2d = function () {
    return new ConcatenatedFormatStructure(this.q4b_1);
  };
  protoOf(AppendableFormatStructure).r4b = function (format) {
    if (isInterface(format, NonConcatenatedFormatStructure)) {
      this.q4b_1.e(format);
    } else {
      if (format instanceof ConcatenatedFormatStructure) {
        // Inline function 'kotlin.collections.forEach' call
        var _iterator__ex2g4s = format.w4c_1.g();
        while (_iterator__ex2g4s.h()) {
          var element = _iterator__ex2g4s.i();
          this.q4b_1.e(element);
        }
      }
    }
  };
  function Accessor$getterNotNull$ref($boundThis) {
    var l = function (p0) {
      return $boundThis.q4h(p0);
    };
    l.callableName = 'getterNotNull';
    return l;
  }
  function SignedIntFieldFormatDirective(field, minDigits, maxDigits, spacePadding, outputPlusOnExceededWidth) {
    this.p4d_1 = field;
    this.q4d_1 = minDigits;
    this.r4d_1 = maxDigits;
    this.s4d_1 = spacePadding;
    this.t4d_1 = outputPlusOnExceededWidth;
    // Inline function 'kotlin.require' call
    if (!(this.q4d_1 == null || this.q4d_1 >= 0)) {
      var message = 'The minimum number of digits (' + this.q4d_1 + ') is negative';
      throw IllegalArgumentException_init_$Create$(toString_0(message));
    }
    // Inline function 'kotlin.require' call
    if (!(this.r4d_1 == null || this.q4d_1 == null || this.r4d_1 >= this.q4d_1)) {
      var message_0 = 'The maximum number of digits (' + this.r4d_1 + ') is less than the minimum number of digits (' + this.q4d_1 + ')';
      throw IllegalArgumentException_init_$Create$(toString_0(message_0));
    }
  }
  protoOf(SignedIntFieldFormatDirective).u4d = function () {
    return this.p4d_1;
  };
  protoOf(SignedIntFieldFormatDirective).v4d = function () {
    var tmp = Accessor$getterNotNull$ref(this.p4d_1.r4h());
    var tmp0_elvis_lhs = this.q4d_1;
    var formatter = new SignedIntFormatterStructure(tmp, tmp0_elvis_lhs == null ? 0 : tmp0_elvis_lhs, this.t4d_1);
    return !(this.s4d_1 == null) ? new SpacePaddedFormatter(formatter, this.s4d_1) : formatter;
  };
  protoOf(SignedIntFieldFormatDirective).v4c = function () {
    return SignedIntParser(this.q4d_1, this.r4d_1, this.s4d_1, this.p4d_1.r4h(), this.p4d_1.s4h(), this.t4d_1);
  };
  function Accessor$getterNotNull$ref_0($boundThis) {
    var l = function (p0) {
      return $boundThis.q4h(p0);
    };
    l.callableName = 'getterNotNull';
    return l;
  }
  function UnsignedIntFieldFormatDirective(field, minDigits, spacePadding) {
    this.b4e_1 = field;
    this.c4e_1 = minDigits;
    this.d4e_1 = spacePadding;
    this.e4e_1 = this.b4e_1.z4h_1;
    // Inline function 'kotlin.require' call
    if (!(this.c4e_1 >= 0)) {
      var message = 'The minimum number of digits (' + this.c4e_1 + ') is negative';
      throw IllegalArgumentException_init_$Create$(toString_0(message));
    }
    // Inline function 'kotlin.require' call
    if (!(this.e4e_1 >= this.c4e_1)) {
      var message_0 = 'The maximum number of digits (' + this.e4e_1 + ') is less than the minimum number of digits (' + this.c4e_1 + ')';
      throw IllegalArgumentException_init_$Create$(toString_0(message_0));
    }
    if (!(this.d4e_1 == null)) {
      // Inline function 'kotlin.require' call
      if (!(this.d4e_1 > this.c4e_1)) {
        var message_1 = 'The space padding (' + this.d4e_1 + ') should be more than the minimum number of digits (' + this.c4e_1 + ')';
        throw IllegalArgumentException_init_$Create$(toString_0(message_1));
      }
    }
  }
  protoOf(UnsignedIntFieldFormatDirective).u4d = function () {
    return this.b4e_1;
  };
  protoOf(UnsignedIntFieldFormatDirective).v4d = function () {
    var formatter = new UnsignedIntFormatterStructure(Accessor$getterNotNull$ref_0(this.b4e_1.t4h_1), this.c4e_1);
    return !(this.d4e_1 == null) ? new SpacePaddedFormatter(formatter, this.d4e_1) : formatter;
  };
  protoOf(UnsignedIntFieldFormatDirective).v4c = function () {
    return spaceAndZeroPaddedUnsignedInt(this.c4e_1, this.e4e_1, this.d4e_1, this.b4e_1.t4h_1, this.b4e_1.w4h_1);
  };
  function getStringValue($this, target) {
    // Inline function 'kotlin.let' call
    var it = $this.j4e_1.t4h_1.q4h(target);
    var tmp0_elvis_lhs = getOrNull($this.k4e_1, it - $this.j4e_1.u4h_1 | 0);
    return tmp0_elvis_lhs == null ? 'The value ' + it + ' of ' + $this.j4e_1.w4h_1 + ' does not have a corresponding string representation' : tmp0_elvis_lhs;
  }
  function AssignableString($outer) {
    this.a4i_1 = $outer;
  }
  protoOf(AssignableString).b4i = function (container, newValue) {
    var tmp0_safe_receiver = this.a4i_1.j4e_1.t4h_1.c4i(container, this.a4i_1.k4e_1.s(newValue) + this.a4i_1.j4e_1.u4h_1 | 0);
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      tmp = this.a4i_1.k4e_1.o(tmp0_safe_receiver - this.a4i_1.j4e_1.u4h_1 | 0);
    }
    return tmp;
  };
  protoOf(AssignableString).c4i = function (container, newValue) {
    var tmp = (container == null ? true : !(container == null)) ? container : THROW_CCE();
    return this.b4i(tmp, (!(newValue == null) ? typeof newValue === 'string' : false) ? newValue : THROW_CCE());
  };
  protoOf(AssignableString).s4h = function () {
    return this.a4i_1.l4e_1;
  };
  function NamedUnsignedIntFieldFormatDirective$getStringValue$ref($boundThis) {
    var l = function (p0) {
      return getStringValue($boundThis, p0);
    };
    l.callableName = 'getStringValue';
    return l;
  }
  function NamedUnsignedIntFieldFormatDirective(field, values, name) {
    this.j4e_1 = field;
    this.k4e_1 = values;
    this.l4e_1 = name;
    // Inline function 'kotlin.require' call
    if (!(this.k4e_1.j() === ((this.j4e_1.v4h_1 - this.j4e_1.u4h_1 | 0) + 1 | 0))) {
      var message = 'The number of values (' + this.k4e_1.j() + ') in ' + toString_0(this.k4e_1) + ' does not match the range of the field (' + ((this.j4e_1.v4h_1 - this.j4e_1.u4h_1 | 0) + 1 | 0) + ')';
      throw IllegalArgumentException_init_$Create$(toString_0(message));
    }
  }
  protoOf(NamedUnsignedIntFieldFormatDirective).u4d = function () {
    return this.j4e_1;
  };
  protoOf(NamedUnsignedIntFieldFormatDirective).v4d = function () {
    return new StringFormatterStructure(NamedUnsignedIntFieldFormatDirective$getStringValue$ref(this));
  };
  protoOf(NamedUnsignedIntFieldFormatDirective).v4c = function () {
    return new ParserStructure(listOf_0(new StringSetParserOperation(this.k4e_1, new AssignableString(this), 'one of ' + toString_0(this.k4e_1) + ' for ' + this.l4e_1)), emptyList());
  };
  function Accessor$getterNotNull$ref_1($boundThis) {
    var l = function (p0) {
      return $boundThis.q4h(p0);
    };
    l.callableName = 'getterNotNull';
    return l;
  }
  function DecimalFractionFieldFormatDirective(field, minDigits, maxDigits, zerosToAdd) {
    this.m4g_1 = field;
    this.n4g_1 = minDigits;
    this.o4g_1 = maxDigits;
    this.p4g_1 = zerosToAdd;
  }
  protoOf(DecimalFractionFieldFormatDirective).u4d = function () {
    return this.m4g_1;
  };
  protoOf(DecimalFractionFieldFormatDirective).v4d = function () {
    return new DecimalFractionFormatterStructure(Accessor$getterNotNull$ref_1(this.m4g_1.r4h()), this.n4g_1, this.o4g_1, this.p4g_1);
  };
  protoOf(DecimalFractionFieldFormatDirective).v4c = function () {
    return new ParserStructure(listOf_0(new NumberSpanParserOperation(listOf_0(new FractionPartConsumer(this.n4g_1, this.o4g_1, this.m4g_1.r4h(), this.m4g_1.s4h())))), emptyList());
  };
  function GenericFieldSpec(accessor, name, defaultValue, sign) {
    name = name === VOID ? accessor.s4h() : name;
    defaultValue = defaultValue === VOID ? null : defaultValue;
    sign = sign === VOID ? null : sign;
    AbstractFieldSpec.call(this);
    this.d4i_1 = accessor;
    this.e4i_1 = name;
    this.f4i_1 = defaultValue;
    this.g4i_1 = sign;
  }
  protoOf(GenericFieldSpec).r4h = function () {
    return this.d4i_1;
  };
  protoOf(GenericFieldSpec).s4h = function () {
    return this.e4i_1;
  };
  protoOf(GenericFieldSpec).h4i = function () {
    return this.f4i_1;
  };
  protoOf(GenericFieldSpec).i4i = function () {
    return this.g4i_1;
  };
  function PropertyAccessor(property) {
    this.j4i_1 = property;
  }
  protoOf(PropertyAccessor).s4h = function () {
    return this.j4i_1.callableName;
  };
  protoOf(PropertyAccessor).k4i = function (container, newValue) {
    var oldValue = this.j4i_1.get(container);
    var tmp;
    if (oldValue === null) {
      this.j4i_1.set(container, newValue);
      tmp = null;
    } else if (equals(oldValue, newValue)) {
      tmp = null;
    } else {
      tmp = oldValue;
    }
    return tmp;
  };
  protoOf(PropertyAccessor).c4i = function (container, newValue) {
    var tmp = (container == null ? true : !(container == null)) ? container : THROW_CCE();
    return this.k4i(tmp, (newValue == null ? true : !(newValue == null)) ? newValue : THROW_CCE());
  };
  protoOf(PropertyAccessor).l4i = function (container) {
    return this.j4i_1.get(container);
  };
  function UnsignedFieldSpec(accessor, minValue, maxValue, name, defaultValue, sign) {
    name = name === VOID ? accessor.s4h() : name;
    defaultValue = defaultValue === VOID ? null : defaultValue;
    sign = sign === VOID ? null : sign;
    AbstractFieldSpec.call(this);
    this.t4h_1 = accessor;
    this.u4h_1 = minValue;
    this.v4h_1 = maxValue;
    this.w4h_1 = name;
    this.x4h_1 = defaultValue;
    this.y4h_1 = sign;
    var tmp = this;
    var tmp_0;
    if (this.v4h_1 < 10) {
      tmp_0 = 1;
    } else if (this.v4h_1 < 100) {
      tmp_0 = 2;
    } else if (this.v4h_1 < 1000) {
      tmp_0 = 3;
    } else {
      throw IllegalArgumentException_init_$Create$('Max value ' + this.v4h_1 + ' is too large');
    }
    tmp.z4h_1 = tmp_0;
  }
  protoOf(UnsignedFieldSpec).r4h = function () {
    return this.t4h_1;
  };
  protoOf(UnsignedFieldSpec).s4h = function () {
    return this.w4h_1;
  };
  protoOf(UnsignedFieldSpec).h4i = function () {
    return this.x4h_1;
  };
  protoOf(UnsignedFieldSpec).i4i = function () {
    return this.y4h_1;
  };
  function Accessor() {
  }
  function AbstractFieldSpec() {
  }
  protoOf(AbstractFieldSpec).toString = function () {
    return 'The field ' + this.s4h() + ' (default value is ' + toString_1(this.h4i()) + ')';
  };
  function CachedFormatStructure(formats) {
    ConcatenatedFormatStructure.call(this, formats);
    this.t4c_1 = protoOf(ConcatenatedFormatStructure).v4d.call(this);
    this.u4c_1 = protoOf(ConcatenatedFormatStructure).v4c.call(this);
  }
  protoOf(CachedFormatStructure).v4d = function () {
    return this.t4c_1;
  };
  protoOf(CachedFormatStructure).v4c = function () {
    return this.u4c_1;
  };
  function BasicFormatStructure(directive) {
    this.m4i_1 = directive;
  }
  protoOf(BasicFormatStructure).toString = function () {
    return 'BasicFormatStructure(' + toString_0(this.m4i_1) + ')';
  };
  protoOf(BasicFormatStructure).equals = function (other) {
    var tmp;
    if (other instanceof BasicFormatStructure) {
      tmp = equals(this.m4i_1, other.m4i_1);
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(BasicFormatStructure).hashCode = function () {
    return hashCode(this.m4i_1);
  };
  protoOf(BasicFormatStructure).v4c = function () {
    return this.m4i_1.v4c();
  };
  protoOf(BasicFormatStructure).v4d = function () {
    return this.m4i_1.v4d();
  };
  function ConstantFormatStructure(string) {
    this.n4i_1 = string;
  }
  protoOf(ConstantFormatStructure).toString = function () {
    return 'ConstantFormatStructure(' + this.n4i_1 + ')';
  };
  protoOf(ConstantFormatStructure).equals = function (other) {
    var tmp;
    if (other instanceof ConstantFormatStructure) {
      tmp = this.n4i_1 === other.n4i_1;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(ConstantFormatStructure).hashCode = function () {
    return getStringHashCode(this.n4i_1);
  };
  protoOf(ConstantFormatStructure).v4c = function () {
    var tmp;
    // Inline function 'kotlin.text.isEmpty' call
    var this_0 = this.n4i_1;
    if (charSequenceLength(this_0) === 0) {
      tmp = emptyList();
    } else {
      // Inline function 'kotlin.collections.buildList' call
      // Inline function 'kotlin.collections.buildListInternal' call
      // Inline function 'kotlin.apply' call
      var this_1 = ArrayList_init_$Create$_0();
      var tmp_0;
      if (isAsciiDigit(charSequenceGet(this.n4i_1, 0))) {
        var tmp0 = this.n4i_1;
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
        var tmp2 = this.n4i_1;
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
        tmp_0 = this.n4i_1;
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
      tmp = this_1.i5();
    }
    return new ParserStructure(tmp, emptyList());
  };
  protoOf(ConstantFormatStructure).v4d = function () {
    return new ConstantStringFormatterStructure(this.n4i_1);
  };
  function formatter$checkIfAllNegative(this$0, value) {
    var seenNonZero = false;
    var tmp0_iterator = this$0.q4i_1.g();
    $l$loop: while (tmp0_iterator.h()) {
      var check = tmp0_iterator.i();
      if (check.k49().l4i(value) === true)
        seenNonZero = true;
      else if (check.f4h(value))
        continue $l$loop;
      else
        return false;
    }
    return seenNonZero;
  }
  function SignedFormatStructure$parser$lambda(this$0) {
    return function (value, isNegative) {
      var tmp0_iterator = this$0.q4i_1.g();
      while (tmp0_iterator.h()) {
        var field = tmp0_iterator.i();
        var wasNegative = field.k49().l4i(value) === true;
        field.k49().c4i(value, !(isNegative === wasNegative));
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
    this.o4i_1 = format;
    this.p4i_1 = withPlusSign;
    var tmp = this;
    // Inline function 'kotlin.collections.mapNotNull' call
    var tmp0 = basicFormats(this.o4i_1);
    // Inline function 'kotlin.collections.mapNotNullTo' call
    var destination = ArrayList_init_$Create$_0();
    // Inline function 'kotlin.collections.forEach' call
    var _iterator__ex2g4s = tmp0.g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      var tmp0_safe_receiver = element.u4d().i4i();
      if (tmp0_safe_receiver == null)
        null;
      else {
        // Inline function 'kotlin.let' call
        destination.e(tmp0_safe_receiver);
      }
    }
    tmp.q4i_1 = toSet(destination);
    // Inline function 'kotlin.collections.isNotEmpty' call
    // Inline function 'kotlin.require' call
    if (!!this.q4i_1.p()) {
      var message = 'Signed format must contain at least one field with a sign';
      throw IllegalArgumentException_init_$Create$(toString_0(message));
    }
  }
  protoOf(SignedFormatStructure).toString = function () {
    return 'SignedFormatStructure(' + toString_0(this.o4i_1) + ')';
  };
  protoOf(SignedFormatStructure).equals = function (other) {
    var tmp;
    var tmp_0;
    if (other instanceof SignedFormatStructure) {
      tmp_0 = equals(this.o4i_1, other.o4i_1);
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      tmp = this.p4i_1 === other.p4i_1;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(SignedFormatStructure).hashCode = function () {
    return imul(31, hashCode(this.o4i_1)) + getBooleanHashCode(this.p4i_1) | 0;
  };
  protoOf(SignedFormatStructure).v4c = function () {
    return concat(listOf([new ParserStructure(listOf_0(new SignParser(SignedFormatStructure$parser$lambda(this), this.p4i_1, 'sign for ' + toString_0(this.q4i_1))), emptyList()), this.o4i_1.v4c()]));
  };
  protoOf(SignedFormatStructure).v4d = function () {
    var innerFormat = this.o4i_1.v4d();
    return new SignedFormatter(innerFormat, SignedFormatStructure$formatter$checkIfAllNegative$ref(this), this.p4i_1);
  };
  function Companion_9() {
  }
  protoOf(Companion_9).r4i = function (field) {
    var default_0 = field.h4i();
    // Inline function 'kotlin.require' call
    if (!!(default_0 == null)) {
      var message = "The field '" + field.s4h() + "' does not define a default value";
      throw IllegalArgumentException_init_$Create$(toString_0(message));
    }
    return new PropertyWithDefault(field.r4h(), default_0);
  };
  var Companion_instance_9;
  function Companion_getInstance_9() {
    return Companion_instance_9;
  }
  function access$_get_accessor__yxxs4k($this) {
    return $this.s4i_1;
  }
  function access$_get_defaultValue__8tt04b($this) {
    return $this.t4i_1;
  }
  function PropertyWithDefault(accessor, defaultValue) {
    this.s4i_1 = accessor;
    this.t4i_1 = defaultValue;
  }
  function OptionalFormatStructure$parser$lambda(this$0) {
    return function (it) {
      var tmp0_iterator = this$0.w4i_1.g();
      while (tmp0_iterator.h()) {
        var field = tmp0_iterator.i();
        // Inline function 'kotlinx.datetime.internal.format.PropertyWithDefault.assignDefault' call
        access$_get_accessor__yxxs4k(field).c4i(it, access$_get_defaultValue__8tt04b(field));
      }
      return Unit_instance;
    };
  }
  function Accessor$getter$ref($boundThis) {
    var l = function (p0) {
      return $boundThis.l4i(p0);
    };
    l.callableName = 'getter';
    return l;
  }
  function Predicate$test$ref($boundThis) {
    var l = function (p0) {
      return $boundThis.x4i(p0);
    };
    l.callableName = 'test';
    return l;
  }
  function Truth$test$ref($boundThis) {
    var l = function (p0) {
      return $boundThis.y4i(p0);
    };
    l.callableName = 'test';
    return l;
  }
  function OptionalFormatStructure(onZero, format) {
    this.u4i_1 = onZero;
    this.v4i_1 = format;
    var tmp = this;
    // Inline function 'kotlin.collections.map' call
    var this_0 = basicFormats(this.v4i_1);
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$(collectionSizeOrDefault(this_0, 10));
    var _iterator__ex2g4s = this_0.g();
    while (_iterator__ex2g4s.h()) {
      var item = _iterator__ex2g4s.i();
      var tmp$ret$0 = item.u4d();
      destination.e(tmp$ret$0);
    }
    // Inline function 'kotlin.collections.map' call
    var this_1 = distinct(destination);
    // Inline function 'kotlin.collections.mapTo' call
    var destination_0 = ArrayList_init_$Create$(collectionSizeOrDefault(this_1, 10));
    var _iterator__ex2g4s_0 = this_1.g();
    while (_iterator__ex2g4s_0.h()) {
      var item_0 = _iterator__ex2g4s_0.i();
      var tmp$ret$3 = Companion_instance_9.r4i(item_0);
      destination_0.e(tmp$ret$3);
    }
    tmp.w4i_1 = destination_0;
  }
  protoOf(OptionalFormatStructure).toString = function () {
    return 'Optional(' + this.u4i_1 + ', ' + toString_0(this.v4i_1) + ')';
  };
  protoOf(OptionalFormatStructure).equals = function (other) {
    var tmp;
    var tmp_0;
    if (other instanceof OptionalFormatStructure) {
      tmp_0 = this.u4i_1 === other.u4i_1;
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      tmp = equals(this.v4i_1, other.v4i_1);
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(OptionalFormatStructure).hashCode = function () {
    return imul(31, getStringHashCode(this.u4i_1)) + hashCode(this.v4i_1) | 0;
  };
  protoOf(OptionalFormatStructure).v4c = function () {
    var tmp = emptyList();
    var tmp_0 = this.v4i_1.v4c();
    var tmp_1 = (new ConstantFormatStructure(this.u4i_1)).v4c();
    var tmp_2;
    if (this.w4i_1.p()) {
      tmp_2 = emptyList();
    } else {
      tmp_2 = listOf_0(new UnconditionalModification(OptionalFormatStructure$parser$lambda(this)));
    }
    return new ParserStructure(tmp, listOf([tmp_0, concat(listOf([tmp_1, new ParserStructure(tmp_2, emptyList())]))]));
  };
  protoOf(OptionalFormatStructure).v4d = function () {
    var formatter = this.v4i_1.v4d();
    // Inline function 'kotlin.collections.map' call
    var this_0 = this.w4i_1;
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$(collectionSizeOrDefault(this_0, 10));
    var _iterator__ex2g4s = this_0.g();
    while (_iterator__ex2g4s.h()) {
      var item = _iterator__ex2g4s.i();
      // Inline function 'kotlinx.datetime.internal.format.PropertyWithDefault.isDefaultComparisonPredicate' call
      var tmp = access$_get_defaultValue__8tt04b(item);
      var tmp$ret$1 = new ComparisonPredicate(tmp, Accessor$getter$ref(access$_get_accessor__yxxs4k(item)));
      destination.e(tmp$ret$1);
    }
    var predicate = conjunctionPredicate(destination);
    var tmp_0;
    if (predicate instanceof Truth) {
      tmp_0 = new ConstantStringFormatterStructure(this.u4i_1);
    } else {
      var tmp_1 = to(Predicate$test$ref(predicate), new ConstantStringFormatterStructure(this.u4i_1));
      tmp_0 = new ConditionalFormatter(listOf([tmp_1, to(Truth$test$ref(Truth_instance), formatter)]));
    }
    return tmp_0;
  };
  function AlternativesParsingFormatStructure(mainFormat, formats) {
    this.z4i_1 = mainFormat;
    this.a4j_1 = formats;
  }
  protoOf(AlternativesParsingFormatStructure).toString = function () {
    return 'AlternativesParsing(' + toString_0(this.a4j_1) + ')';
  };
  protoOf(AlternativesParsingFormatStructure).equals = function (other) {
    var tmp;
    var tmp_0;
    if (other instanceof AlternativesParsingFormatStructure) {
      tmp_0 = equals(this.z4i_1, other.z4i_1);
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      tmp = equals(this.a4j_1, other.a4j_1);
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(AlternativesParsingFormatStructure).hashCode = function () {
    return imul(31, hashCode(this.z4i_1)) + hashCode(this.a4j_1) | 0;
  };
  protoOf(AlternativesParsingFormatStructure).v4c = function () {
    var tmp = emptyList();
    // Inline function 'kotlin.collections.buildList' call
    // Inline function 'kotlin.collections.buildListInternal' call
    // Inline function 'kotlin.apply' call
    var this_0 = ArrayList_init_$Create$_0();
    this_0.e(this.z4i_1.v4c());
    var tmp0_iterator = this.a4j_1.g();
    while (tmp0_iterator.h()) {
      var format = tmp0_iterator.i();
      this_0.e(format.v4c());
    }
    var tmp$ret$3 = this_0.i5();
    return new ParserStructure(tmp, tmp$ret$3);
  };
  protoOf(AlternativesParsingFormatStructure).v4d = function () {
    return this.z4i_1.v4d();
  };
  function ConcatenatedFormatStructure(formats) {
    this.w4c_1 = formats;
  }
  protoOf(ConcatenatedFormatStructure).toString = function () {
    return 'ConcatenatedFormatStructure(' + joinToString(this.w4c_1, ', ') + ')';
  };
  protoOf(ConcatenatedFormatStructure).equals = function (other) {
    var tmp;
    if (other instanceof ConcatenatedFormatStructure) {
      tmp = equals(this.w4c_1, other.w4c_1);
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(ConcatenatedFormatStructure).hashCode = function () {
    return hashCode(this.w4c_1);
  };
  protoOf(ConcatenatedFormatStructure).v4c = function () {
    // Inline function 'kotlin.collections.map' call
    var this_0 = this.w4c_1;
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$(collectionSizeOrDefault(this_0, 10));
    var _iterator__ex2g4s = this_0.g();
    while (_iterator__ex2g4s.h()) {
      var item = _iterator__ex2g4s.i();
      var tmp$ret$0 = item.v4c();
      destination.e(tmp$ret$0);
    }
    return concat(destination);
  };
  protoOf(ConcatenatedFormatStructure).v4d = function () {
    // Inline function 'kotlin.collections.map' call
    var this_0 = this.w4c_1;
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$(collectionSizeOrDefault(this_0, 10));
    var _iterator__ex2g4s = this_0.g();
    while (_iterator__ex2g4s.h()) {
      var item = _iterator__ex2g4s.i();
      var tmp$ret$0 = item.v4d();
      destination.e(tmp$ret$0);
    }
    var formatters = destination;
    var tmp;
    if (formatters.j() === 1) {
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
    return this_0.i5();
  }
  function basicFormats$_anonymous_$rec_hkf0lf($this_buildList, format) {
    if (format instanceof BasicFormatStructure) {
      $this_buildList.e(format.m4i_1);
    } else {
      if (format instanceof ConcatenatedFormatStructure) {
        // Inline function 'kotlin.collections.forEach' call
        var _iterator__ex2g4s = format.w4c_1.g();
        while (_iterator__ex2g4s.h()) {
          var element = _iterator__ex2g4s.i();
          basicFormats$_anonymous_$rec_hkf0lf($this_buildList, element);
        }
      } else {
        if (!(format instanceof ConstantFormatStructure)) {
          if (format instanceof SignedFormatStructure) {
            basicFormats$_anonymous_$rec_hkf0lf($this_buildList, format.o4i_1);
          } else {
            if (format instanceof AlternativesParsingFormatStructure) {
              basicFormats$_anonymous_$rec_hkf0lf($this_buildList, format.z4i_1);
              // Inline function 'kotlin.collections.forEach' call
              var _iterator__ex2g4s_0 = format.a4j_1.g();
              while (_iterator__ex2g4s_0.h()) {
                var element_0 = _iterator__ex2g4s_0.i();
                basicFormats$_anonymous_$rec_hkf0lf($this_buildList, element_0);
              }
            } else {
              if (format instanceof OptionalFormatStructure) {
                basicFormats$_anonymous_$rec_hkf0lf($this_buildList, format.v4i_1);
              }
            }
          }
        }
      }
    }
  }
  function conjunctionPredicate(predicates) {
    return predicates.p() ? Truth_instance : predicates.j() === 1 ? single(predicates) : new ConjunctionPredicate(predicates);
  }
  function ComparisonPredicate(expectedValue, getter) {
    this.b4j_1 = expectedValue;
    this.c4j_1 = getter;
  }
  protoOf(ComparisonPredicate).x4i = function (value) {
    return equals(this.c4j_1(value), this.b4j_1);
  };
  function Truth() {
  }
  protoOf(Truth).y4i = function (value) {
    return true;
  };
  protoOf(Truth).x4i = function (value) {
    return this.y4i((value == null ? true : !(value == null)) ? value : THROW_CCE());
  };
  var Truth_instance;
  function Truth_getInstance() {
    return Truth_instance;
  }
  function ConjunctionPredicate(predicates) {
    this.d4j_1 = predicates;
  }
  protoOf(ConjunctionPredicate).x4i = function (value) {
    var tmp0 = this.d4j_1;
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
      var _iterator__ex2g4s = tmp0.g();
      while (_iterator__ex2g4s.h()) {
        var element = _iterator__ex2g4s.i();
        if (!element.x4i(value)) {
          tmp$ret$0 = false;
          break $l$block_0;
        }
      }
      tmp$ret$0 = true;
    }
    return tmp$ret$0;
  };
  function SpacePaddedFormatter(formatter, padding) {
    this.e4j_1 = formatter;
    this.f4j_1 = padding;
  }
  function SignedFormatter(formatter, allSubFormatsNegative, alwaysOutputSign) {
    this.g4j_1 = formatter;
    this.h4j_1 = allSubFormatsNegative;
    this.i4j_1 = alwaysOutputSign;
  }
  function ConditionalFormatter(formatters) {
    this.j4j_1 = formatters;
  }
  function ConcatenatedFormatter(formatters) {
    this.k4j_1 = formatters;
  }
  function SignedIntFormatterStructure(number, zeroPadding, outputPlusOnExceededWidth) {
    this.l4j_1 = number;
    this.m4j_1 = zeroPadding;
    this.n4j_1 = outputPlusOnExceededWidth;
    // Inline function 'kotlin.require' call
    if (!(this.m4j_1 >= 0)) {
      var message = 'The minimum number of digits (' + this.m4j_1 + ') is negative';
      throw IllegalArgumentException_init_$Create$(toString_0(message));
    }
    // Inline function 'kotlin.require' call
    if (!(this.m4j_1 <= 9)) {
      var message_0 = 'The minimum number of digits (' + this.m4j_1 + ') exceeds the length of an Int';
      throw IllegalArgumentException_init_$Create$(toString_0(message_0));
    }
  }
  function UnsignedIntFormatterStructure(number, zeroPadding) {
    this.o4j_1 = number;
    this.p4j_1 = zeroPadding;
    // Inline function 'kotlin.require' call
    if (!(this.p4j_1 >= 0)) {
      var message = 'The minimum number of digits (' + this.p4j_1 + ') is negative';
      throw IllegalArgumentException_init_$Create$(toString_0(message));
    }
    // Inline function 'kotlin.require' call
    if (!(this.p4j_1 <= 9)) {
      var message_0 = 'The minimum number of digits (' + this.p4j_1 + ') exceeds the length of an Int';
      throw IllegalArgumentException_init_$Create$(toString_0(message_0));
    }
  }
  function StringFormatterStructure(string) {
    this.q4j_1 = string;
  }
  function DecimalFractionFormatterStructure(number, minDigits, maxDigits, zerosToAdd) {
    this.r4j_1 = number;
    this.s4j_1 = minDigits;
    this.t4j_1 = maxDigits;
    this.u4j_1 = zerosToAdd;
    var containsArg = this.s4j_1;
    // Inline function 'kotlin.require' call
    if (!(1 <= containsArg ? containsArg <= 9 : false)) {
      var message = 'The minimum number of digits (' + this.s4j_1 + ') is not in range 1..9';
      throw IllegalArgumentException_init_$Create$(toString_0(message));
    }
    var containsLower = this.s4j_1;
    var containsArg_0 = this.t4j_1;
    // Inline function 'kotlin.require' call
    if (!(containsLower <= containsArg_0 ? containsArg_0 <= 9 : false)) {
      var message_0 = 'The maximum number of digits (' + this.t4j_1 + ') is not in range ' + this.s4j_1 + '..9';
      throw IllegalArgumentException_init_$Create$(toString_0(message_0));
    }
  }
  function ConstantStringFormatterStructure(string) {
    this.v4j_1 = string;
  }
  function FractionPartConsumer(minLength, maxLength, setter, name) {
    NumberConsumer.call(this, minLength === maxLength ? minLength : null, name);
    this.y4j_1 = minLength;
    this.z4j_1 = maxLength;
    this.a4k_1 = setter;
    var containsArg = this.y4j_1;
    // Inline function 'kotlin.require' call
    if (!(1 <= containsArg ? containsArg <= 9 : false)) {
      var message = 'Invalid minimum length ' + this.y4j_1 + ' for field ' + this.c4k_1 + ': expected 1..9';
      throw IllegalArgumentException_init_$Create$(toString_0(message));
    }
    var containsLower = this.y4j_1;
    var containsArg_0 = this.z4j_1;
    // Inline function 'kotlin.require' call
    if (!(containsLower <= containsArg_0 ? containsArg_0 <= 9 : false)) {
      var message_0 = 'Invalid maximum length ' + this.z4j_1 + ' for field ' + this.c4k_1 + ': expected ' + this.y4j_1 + '..9';
      throw IllegalArgumentException_init_$Create$(toString_0(message_0));
    }
  }
  protoOf(FractionPartConsumer).d4k = function (storage, input, start, end) {
    return (end - start | 0) < this.y4j_1 ? new TooFewDigits(this.y4j_1) : (end - start | 0) > this.z4j_1 ? new TooManyDigits(this.z4j_1) : setWithoutReassigning(this.a4k_1, storage, new DecimalFraction(parseAsciiInt(input, start, end), end - start | 0));
  };
  function ConstantNumberConsumer(expected) {
    NumberConsumer.call(this, expected.length, 'the predefined string ' + expected);
    this.g4k_1 = expected;
  }
  protoOf(ConstantNumberConsumer).d4k = function (storage, input, start, end) {
    var tmp;
    // Inline function 'kotlin.text.substring' call
    if (toString_0(charSequenceSubSequence(input, start, end)) === this.g4k_1) {
      tmp = null;
    } else {
      tmp = new WrongConstant(this.g4k_1);
    }
    return tmp;
  };
  function NumberConsumer(length, whatThisExpects) {
    this.b4k_1 = length;
    this.c4k_1 = whatThisExpects;
  }
  protoOf(NumberConsumer).a = function () {
    return this.b4k_1;
  };
  function ExpectedInt() {
  }
  protoOf(ExpectedInt).h4k = function () {
    return 'expected an Int value';
  };
  var ExpectedInt_instance;
  function ExpectedInt_getInstance() {
    return ExpectedInt_instance;
  }
  function TooManyDigits(maxDigits) {
    this.i4k_1 = maxDigits;
  }
  protoOf(TooManyDigits).h4k = function () {
    return 'expected at most ' + this.i4k_1 + ' digits';
  };
  function TooFewDigits(minDigits) {
    this.j4k_1 = minDigits;
  }
  protoOf(TooFewDigits).h4k = function () {
    return 'expected at least ' + this.j4k_1 + ' digits';
  };
  function WrongConstant(expected) {
    this.k4k_1 = expected;
  }
  protoOf(WrongConstant).h4k = function () {
    return "expected '" + this.k4k_1 + "'";
  };
  function Conflicting(conflicting) {
    this.l4k_1 = conflicting;
  }
  protoOf(Conflicting).h4k = function () {
    return "attempted to overwrite the existing value '" + toString_0(this.l4k_1) + "'";
  };
  function setWithoutReassigning(_this__u8e3s4, receiver, value) {
    var tmp0_elvis_lhs = _this__u8e3s4.c4i(receiver, value);
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
    this.o4k_1 = minLength;
    this.p4k_1 = maxLength;
    this.q4k_1 = setter;
    this.r4k_1 = multiplyByMinus1;
    // Inline function 'kotlin.require' call
    if (!(this.a() == null || numberRangeToNumber(1, 9).ui(this.a()))) {
      var message = 'Invalid length for field ' + this.c4k_1 + ': ' + this.a();
      throw IllegalArgumentException_init_$Create$(toString_0(message));
    }
  }
  protoOf(UnsignedIntConsumer).d4k = function (storage, input, start, end) {
    var tmp;
    if (!(this.p4k_1 == null) && (end - start | 0) > this.p4k_1) {
      tmp = new TooManyDigits(this.p4k_1);
    } else if (!(this.o4k_1 == null) && (end - start | 0) < this.o4k_1) {
      tmp = new TooFewDigits(this.o4k_1);
    } else {
      var result = parseAsciiIntOrNull(input, start, end);
      tmp = result == null ? ExpectedInt_instance : setWithoutReassigning(this.q4k_1, storage, this.r4k_1 ? -result | 0 : result);
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
    this.s4k_1 = position;
    this.t4k_1 = message;
  }
  function _ParseResult___init__impl__gvz3cn(value) {
    return value;
  }
  function _ParseResult___get_value__impl__86mnxf($this) {
    return $this;
  }
  function Companion_10() {
  }
  protoOf(Companion_10).u4k = function (indexOfNextUnparsed) {
    return _ParseResult___init__impl__gvz3cn(indexOfNextUnparsed);
  };
  protoOf(Companion_10).v4k = function (position, message) {
    return _ParseResult___init__impl__gvz3cn(new ParseError(position, message));
  };
  var Companion_instance_10;
  function Companion_getInstance_10() {
    return Companion_instance_10;
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
      var output = state.w4k_1.r49();
      var inputPosition = state.y4k_1;
      var parserStructure = state.x4k_1;
      // Inline function 'kotlin.run' call
      $l$block: {
        var inductionVariable = 0;
        var last = parserStructure.a4l_1.j() - 1 | 0;
        if (inductionVariable <= last)
          do {
            var ix = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            // Inline function 'kotlinx.datetime.internal.format.parser.ParseResult.match' call
            var this_0 = parserStructure.a4l_1.o(ix).c4l(output, input, inputPosition);
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
        if (parserStructure.b4l_1.p()) {
          if (false || inputPosition === charSequenceLength(input)) {
            return output;
          } else {
            var tmp_0 = inputPosition;
            var it_0 = new ParseError(tmp_0, Parser$match$lambda);
            errors.e(it_0);
          }
        } else {
          var inductionVariable_0 = parserStructure.b4l_1.j() - 1 | 0;
          if (0 <= inductionVariable_0)
            do {
              var ix_0 = inductionVariable_0;
              inductionVariable_0 = inductionVariable_0 + -1 | 0;
              parseOptions.e(new ParserState(output, parserStructure.b4l_1.o(ix_0), inputPosition));
            }
             while (0 <= inductionVariable_0);
        }
      }
    }
    // Inline function 'kotlin.collections.sortByDescending' call
    if (errors.j() > 1) {
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
      tmp = (tmp_0 == null ? null : new Parser(tmp_0)).d4l.call(new Parser($this), input, initialContainer, startIndex);
    }
    return tmp;
  }
  function ParserState(output, parserStructure, inputPosition) {
    this.w4k_1 = output;
    this.x4k_1 = parserStructure;
    this.y4k_1 = inputPosition;
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
    var tmp0_other_with_cast = other instanceof Parser ? other.z4k_1 : THROW_CCE();
    if (!equals($this, tmp0_other_with_cast))
      return false;
    return true;
  }
  function sam$kotlin_Comparator$0(function_0) {
    this.e4l_1 = function_0;
  }
  protoOf(sam$kotlin_Comparator$0).pe = function (a, b) {
    return this.e4l_1(a, b);
  };
  protoOf(sam$kotlin_Comparator$0).compare = function (a, b) {
    return this.pe(a, b);
  };
  protoOf(sam$kotlin_Comparator$0).k3 = function () {
    return this.e4l_1;
  };
  protoOf(sam$kotlin_Comparator$0).equals = function (other) {
    var tmp;
    if (!(other == null) ? isInterface(other, Comparator) : false) {
      var tmp_0;
      if (!(other == null) ? isInterface(other, FunctionAdapter) : false) {
        tmp_0 = equals(this.k3(), other.k3());
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
    return hashCode(this.k3());
  };
  function Parser$match$lambda() {
    return 'There is more input to consume';
  }
  function Parser$match$lambda_0(a, b) {
    // Inline function 'kotlin.comparisons.compareValuesBy' call
    var tmp = b.s4k_1;
    var tmp$ret$1 = a.s4k_1;
    return compareValues(tmp, tmp$ret$1);
  }
  function Parser(commands) {
    this.z4k_1 = commands;
  }
  protoOf(Parser).toString = function () {
    return Parser__toString_impl_x33iea(this.z4k_1);
  };
  protoOf(Parser).hashCode = function () {
    return Parser__hashCode_impl_bbxllf(this.z4k_1);
  };
  protoOf(Parser).equals = function (other) {
    return Parser__equals_impl_djxokv(this.z4k_1, other);
  };
  function ParserStructure(operations, followedBy) {
    this.a4l_1 = operations;
    this.b4l_1 = followedBy;
  }
  protoOf(ParserStructure).toString = function () {
    return joinToString(this.a4l_1, ', ') + '(' + joinToString(this.b4l_1, ';') + ')';
  };
  function ParseException(errors) {
    Exception_init_$Init$(formatError(errors), this);
    captureStack(this, ParseException);
  }
  function concat(_this__u8e3s4) {
    // Inline function 'kotlin.collections.foldRight' call
    var accumulator = new ParserStructure(emptyList(), emptyList());
    if (!_this__u8e3s4.p()) {
      var iterator = _this__u8e3s4.q(_this__u8e3s4.j());
      while (iterator.m4()) {
        var tmp2 = iterator.n4();
        var acc = accumulator;
        accumulator = concat$append(tmp2, acc);
      }
    }
    var naiveParser = accumulator;
    return concat$simplify(naiveParser, emptyList());
  }
  function formatError(errors) {
    if (errors.j() === 1) {
      return 'Position ' + errors.o(0).s4k_1 + ': ' + errors.o(0).t4k_1();
    }
    var averageMessageLength = 33;
    var tmp0_buffer = StringBuilder_init_$Create$_0(imul(averageMessageLength, errors.j()));
    return joinTo(errors, tmp0_buffer, ', ', 'Errors: ', VOID, VOID, VOID, formatError$lambda).toString();
  }
  function concat$append(_this__u8e3s4, other) {
    var tmp;
    if (_this__u8e3s4.b4l_1.p()) {
      tmp = new ParserStructure(plus(_this__u8e3s4.a4l_1, other.a4l_1), other.b4l_1);
    } else {
      // Inline function 'kotlin.collections.map' call
      var this_0 = _this__u8e3s4.b4l_1;
      // Inline function 'kotlin.collections.mapTo' call
      var destination = ArrayList_init_$Create$(collectionSizeOrDefault(this_0, 10));
      var _iterator__ex2g4s = this_0.g();
      while (_iterator__ex2g4s.h()) {
        var item = _iterator__ex2g4s.i();
        var tmp$ret$0 = concat$append(item, other);
        destination.e(tmp$ret$0);
      }
      tmp = new ParserStructure(_this__u8e3s4.a4l_1, destination);
    }
    return tmp;
  }
  function concat$simplify(_this__u8e3s4, unconditionalModifications) {
    // Inline function 'kotlin.collections.mutableListOf' call
    var newOperations = ArrayList_init_$Create$_0();
    var currentNumberSpan = null;
    var unconditionalModificationsForTails = toMutableList(unconditionalModifications);
    var tmp0_iterator = _this__u8e3s4.a4l_1.g();
    while (tmp0_iterator.h()) {
      var op = tmp0_iterator.i();
      if (op instanceof NumberSpanParserOperation) {
        if (!(currentNumberSpan == null)) {
          currentNumberSpan.n(op.f4l_1);
        } else {
          currentNumberSpan = toMutableList(op.f4l_1);
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
    var tmp0 = _this__u8e3s4.b4l_1;
    // Inline function 'kotlin.collections.flatMapTo' call
    var destination = ArrayList_init_$Create$_0();
    var _iterator__ex2g4s = tmp0.g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      var simplified = concat$simplify(element, unconditionalModificationsForTails);
      var tmp;
      if (simplified.a4l_1.p()) {
        // Inline function 'kotlin.collections.ifEmpty' call
        var this_0 = simplified.b4l_1;
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
        var _iterator__ex2g4s_0 = mergedTails.g();
        while (_iterator__ex2g4s_0.h()) {
          var element_0 = _iterator__ex2g4s_0.i();
          var tmp0_safe_receiver = firstOrNull(element_0.a4l_1);
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
        var _iterator__ex2g4s_1 = mergedTails.g();
        while (_iterator__ex2g4s_1.h()) {
          var item = _iterator__ex2g4s_1.i();
          var firstOperation = firstOrNull(item.a4l_1);
          var tmp_5;
          if (firstOperation instanceof NumberSpanParserOperation) {
            tmp_5 = new ParserStructure(plus(listOf_0(new NumberSpanParserOperation(plus(currentNumberSpan, firstOperation.f4l_1))), drop(item.a4l_1, 1)), item.b4l_1);
          } else {
            if (firstOperation == null) {
              tmp_5 = new ParserStructure(listOf_0(new NumberSpanParserOperation(currentNumberSpan)), item.b4l_1);
            } else {
              tmp_5 = new ParserStructure(plus(listOf_0(new NumberSpanParserOperation(currentNumberSpan)), item.a4l_1), item.b4l_1);
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
    return 'position ' + it.s4k_1 + ": '" + it.t4k_1() + "'";
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
    this.i4l_1 = children;
    this.j4l_1 = isTerminal;
  }
  function sam$kotlin_Comparator$0_0(function_0) {
    this.k4l_1 = function_0;
  }
  protoOf(sam$kotlin_Comparator$0_0).pe = function (a, b) {
    return this.k4l_1(a, b);
  };
  protoOf(sam$kotlin_Comparator$0_0).compare = function (a, b) {
    return this.pe(a, b);
  };
  protoOf(sam$kotlin_Comparator$0_0).k3 = function () {
    return this.k4l_1;
  };
  protoOf(sam$kotlin_Comparator$0_0).equals = function (other) {
    var tmp;
    if (!(other == null) ? isInterface(other, Comparator) : false) {
      var tmp_0;
      if (!(other == null) ? isInterface(other, FunctionAdapter) : false) {
        tmp_0 = equals(this.k3(), other.k3());
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
    return hashCode(this.k3());
  };
  function _init_$reduceTrie(trie) {
    var tmp0_iterator = trie.i4l_1.g();
    while (tmp0_iterator.h()) {
      var child = tmp0_iterator.i().lg();
      _init_$reduceTrie(child);
    }
    // Inline function 'kotlin.collections.mutableListOf' call
    var newChildren = ArrayList_init_$Create$_0();
    var tmp2_iterator = trie.i4l_1.g();
    while (tmp2_iterator.h()) {
      var tmp3_loop_parameter = tmp2_iterator.i();
      var key = tmp3_loop_parameter.kg();
      var child_0 = tmp3_loop_parameter.lg();
      if (!child_0.j4l_1 && child_0.i4l_1.j() === 1) {
        var tmp4_container = single(child_0.i4l_1);
        var grandChildKey = tmp4_container.kg();
        var grandChild = tmp4_container.lg();
        newChildren.e(to(key + grandChildKey, grandChild));
      } else {
        newChildren.e(to(key, child_0));
      }
    }
    trie.i4l_1.z1();
    // Inline function 'kotlin.collections.sortedBy' call
    // Inline function 'kotlin.comparisons.compareBy' call
    var tmp = StringSetParserOperation$reduceTrie$lambda;
    var tmp$ret$1 = new sam$kotlin_Comparator$0_0(tmp);
    var tmp$ret$2 = sortedWith(newChildren, tmp$ret$1);
    trie.i4l_1.n(tmp$ret$2);
  }
  function StringSetParserOperation$lambda($key) {
    return function (it) {
      var tmp$ret$0 = it.tg_1;
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
      return 'Expected ' + this$0.m4l_1 + ' but got ' + tmp$ret$0;
    };
  }
  function StringSetParserOperation$reduceTrie$lambda(a, b) {
    // Inline function 'kotlin.comparisons.compareValuesBy' call
    var tmp = a.tg_1;
    var tmp$ret$1 = b.tg_1;
    return compareValues(tmp, tmp$ret$1);
  }
  function StringSetParserOperation(strings, setter, whatThisExpects) {
    this.l4l_1 = setter;
    this.m4l_1 = whatThisExpects;
    this.n4l_1 = new TrieNode();
    var tmp0_iterator = strings.g();
    while (tmp0_iterator.h()) {
      var string = tmp0_iterator.i();
      // Inline function 'kotlin.text.isNotEmpty' call
      // Inline function 'kotlin.require' call
      if (!(charSequenceLength(string) > 0)) {
        var message = 'Found an empty string in ' + this.m4l_1;
        throw IllegalArgumentException_init_$Create$(toString_0(message));
      }
      var node = this.n4l_1;
      var inductionVariable = 0;
      var last = string.length;
      while (inductionVariable < last) {
        var char = charSequenceGet(string, inductionVariable);
        inductionVariable = inductionVariable + 1 | 0;
        var tmp2 = node.i4l_1;
        // Inline function 'kotlin.collections.binarySearchBy' call
        var key = toString(char);
        var toIndex = tmp2.j();
        var searchResult = binarySearch(tmp2, 0, toIndex, StringSetParserOperation$lambda(key));
        var tmp;
        if (searchResult < 0) {
          // Inline function 'kotlin.also' call
          var this_0 = new TrieNode();
          node.i4l_1.b2((-searchResult | 0) - 1 | 0, to(toString(char), this_0));
          tmp = this_0;
        } else {
          tmp = node.i4l_1.o(searchResult).ug_1;
        }
        node = tmp;
      }
      // Inline function 'kotlin.require' call
      if (!!node.j4l_1) {
        var message_0 = "The string '" + string + "' was passed several times";
        throw IllegalArgumentException_init_$Create$(toString_0(message_0));
      }
      node.j4l_1 = true;
    }
    _init_$reduceTrie(this.n4l_1);
  }
  protoOf(StringSetParserOperation).c4l = function (storage, input, startIndex) {
    var node = this.n4l_1;
    var index = {_v: startIndex};
    var lastMatch = null;
    loop: while (index._v <= charSequenceLength(input)) {
      if (node.j4l_1)
        lastMatch = index._v;
      var tmp0_iterator = node.i4l_1.g();
      while (tmp0_iterator.h()) {
        var tmp1_loop_parameter = tmp0_iterator.i();
        var key = tmp1_loop_parameter.kg();
        var child = tmp1_loop_parameter.lg();
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
      tmp = setWithoutReassigning_0(this.l4l_1, storage, tmp$ret$0, startIndex, lastMatch);
    } else {
      var tmp_0 = Companion_instance_10;
      tmp = tmp_0.v4k(startIndex, StringSetParserOperation$consume$lambda(this, input, startIndex, index));
    }
    return tmp;
  };
  function _get_whatThisExpects__4pg11j($this) {
    // Inline function 'kotlin.collections.map' call
    var this_0 = $this.f4l_1;
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$(collectionSizeOrDefault(this_0, 10));
    var _iterator__ex2g4s = this_0.g();
    while (_iterator__ex2g4s.h()) {
      var item = _iterator__ex2g4s.i();
      var length = item.a();
      var tmp$ret$0 = (length == null ? 'at least one digit' : '' + length + ' digits') + (' for ' + item.c4k_1);
      destination.e(tmp$ret$0);
    }
    var consumerLengths = destination;
    var tmp;
    if ($this.h4l_1) {
      tmp = 'a number with at least ' + $this.g4l_1 + ' digits: ' + toString_0(consumerLengths);
    } else {
      tmp = 'a number with exactly ' + $this.g4l_1 + ' digits: ' + toString_0(consumerLengths);
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
      return "Can not interpret the string '" + $numberString + "' as " + this$0.f4l_1.o($i).c4k_1 + ': ' + $error.h4k();
    };
  }
  function NumberSpanParserOperation(consumers) {
    this.f4l_1 = consumers;
    var tmp = this;
    // Inline function 'kotlin.collections.sumOf' call
    var sum = 0;
    var _iterator__ex2g4s = this.f4l_1.g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      var tmp_0 = sum;
      var tmp0_elvis_lhs = element.a();
      sum = tmp_0 + (tmp0_elvis_lhs == null ? 1 : tmp0_elvis_lhs) | 0;
    }
    tmp.g4l_1 = sum;
    var tmp_1 = this;
    var tmp0 = this.f4l_1;
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
      var _iterator__ex2g4s_0 = tmp0.g();
      while (_iterator__ex2g4s_0.h()) {
        var element_0 = _iterator__ex2g4s_0.i();
        if (element_0.a() == null) {
          tmp$ret$2 = true;
          break $l$block_0;
        }
      }
      tmp$ret$2 = false;
    }
    tmp_1.h4l_1 = tmp$ret$2;
    var tmp0_0 = this.f4l_1;
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
      var _iterator__ex2g4s_1 = tmp0_0.g();
      while (_iterator__ex2g4s_1.h()) {
        var element_1 = _iterator__ex2g4s_1.i();
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
    var tmp3 = this.f4l_1;
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
      var _iterator__ex2g4s_2 = tmp3.g();
      while (_iterator__ex2g4s_2.h()) {
        var element_2 = _iterator__ex2g4s_2.i();
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
      var tmp0_1 = this.f4l_1;
      // Inline function 'kotlin.collections.filterTo' call
      var destination = ArrayList_init_$Create$_0();
      var _iterator__ex2g4s_3 = tmp0_1.g();
      while (_iterator__ex2g4s_3.h()) {
        var element_3 = _iterator__ex2g4s_3.i();
        if (element_3.a() == null) {
          destination.e(element_3);
        }
      }
      // Inline function 'kotlin.collections.map' call
      // Inline function 'kotlin.collections.mapTo' call
      var destination_0 = ArrayList_init_$Create$(collectionSizeOrDefault(destination, 10));
      var _iterator__ex2g4s_4 = destination.g();
      while (_iterator__ex2g4s_4.h()) {
        var item = _iterator__ex2g4s_4.i();
        var tmp$ret$14 = item.c4k_1;
        destination_0.e(tmp$ret$14);
      }
      var fieldNames = destination_0;
      var message_0 = 'At most one variable-length numeric field in a row is allowed, but got several: ' + toString_0(fieldNames) + '. ' + 'Parsing is undefined: for example, with variable-length month number ' + "and variable-length day of month, '111' can be parsed as Jan 11th or Nov 1st.";
      throw IllegalArgumentException_init_$Create$(toString_0(message_0));
    }
  }
  protoOf(NumberSpanParserOperation).c4l = function (storage, input, startIndex) {
    if ((startIndex + this.g4l_1 | 0) > charSequenceLength(input)) {
      var tmp = Companion_instance_10;
      return tmp.v4k(startIndex, NumberSpanParserOperation$consume$lambda(this));
    }
    var digitsInRow = {_v: 0};
    while ((startIndex + digitsInRow._v | 0) < charSequenceLength(input) && isAsciiDigit(charSequenceGet(input, startIndex + digitsInRow._v | 0))) {
      digitsInRow._v = digitsInRow._v + 1 | 0;
      digitsInRow._v;
    }
    if (digitsInRow._v < this.g4l_1) {
      var tmp_0 = Companion_instance_10;
      return tmp_0.v4k(startIndex, NumberSpanParserOperation$consume$lambda_0(digitsInRow, this));
    }
    var index = startIndex;
    var inductionVariable = 0;
    var last = this.f4l_1.j() - 1 | 0;
    if (inductionVariable <= last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var tmp1_elvis_lhs = this.f4l_1.o(i).a();
        var length = tmp1_elvis_lhs == null ? (digitsInRow._v - this.g4l_1 | 0) + 1 | 0 : tmp1_elvis_lhs;
        var error = this.f4l_1.o(i).d4k(storage, input, index, index + length | 0);
        if (!(error == null)) {
          var tmp1 = index;
          // Inline function 'kotlin.text.substring' call
          var endIndex = index + length | 0;
          var numberString = toString_0(charSequenceSubSequence(input, tmp1, endIndex));
          var tmp_1 = Companion_instance_10;
          var tmp_2 = index;
          return tmp_1.v4k(tmp_2, NumberSpanParserOperation$consume$lambda_1(numberString, this, i, error));
        }
        index = index + length | 0;
      }
       while (inductionVariable <= last);
    return Companion_instance_10.u4k(index);
  };
  protoOf(NumberSpanParserOperation).toString = function () {
    return _get_whatThisExpects__4pg11j(this);
  };
  function PlainStringParserOperation$consume$lambda(this$0) {
    return function () {
      return "Unexpected end of input: yet to parse '" + this$0.o4l_1 + "'";
    };
  }
  function PlainStringParserOperation$consume$lambda_0(this$0, $input, $startIndex, $i) {
    return function () {
      var tmp0 = $input;
      var tmp1 = $startIndex;
      // Inline function 'kotlin.text.substring' call
      var endIndex = ($startIndex + $i | 0) + 1 | 0;
      var tmp$ret$0 = toString_0(charSequenceSubSequence(tmp0, tmp1, endIndex));
      return 'Expected ' + this$0.o4l_1 + ' but got ' + tmp$ret$0;
    };
  }
  function PlainStringParserOperation(string) {
    this.o4l_1 = string;
    // Inline function 'kotlin.text.isNotEmpty' call
    var this_0 = this.o4l_1;
    // Inline function 'kotlin.require' call
    if (!(charSequenceLength(this_0) > 0)) {
      var message = 'Empty string is not allowed';
      throw IllegalArgumentException_init_$Create$(toString_0(message));
    }
    // Inline function 'kotlin.require' call
    if (!!isAsciiDigit(charSequenceGet(this.o4l_1, 0))) {
      var message_0 = "String '" + this.o4l_1 + "' starts with a digit";
      throw IllegalArgumentException_init_$Create$(toString_0(message_0));
    }
    // Inline function 'kotlin.require' call
    if (!!isAsciiDigit(charSequenceGet(this.o4l_1, this.o4l_1.length - 1 | 0))) {
      var message_1 = "String '" + this.o4l_1 + "' ends with a digit";
      throw IllegalArgumentException_init_$Create$(toString_0(message_1));
    }
  }
  protoOf(PlainStringParserOperation).c4l = function (storage, input, startIndex) {
    if ((startIndex + this.o4l_1.length | 0) > charSequenceLength(input)) {
      var tmp = Companion_instance_10;
      return tmp.v4k(startIndex, PlainStringParserOperation$consume$lambda(this));
    }
    var inductionVariable = 0;
    var last = charSequenceLength(this.o4l_1) - 1 | 0;
    if (inductionVariable <= last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        if (!(charSequenceGet(input, startIndex + i | 0) === charSequenceGet(this.o4l_1, i))) {
          var tmp_0 = Companion_instance_10;
          return tmp_0.v4k(startIndex, PlainStringParserOperation$consume$lambda_0(this, input, startIndex, i));
        }
      }
       while (inductionVariable <= last);
    return Companion_instance_10.u4k(startIndex + this.o4l_1.length | 0);
  };
  protoOf(PlainStringParserOperation).toString = function () {
    return "'" + this.o4l_1 + "'";
  };
  function SignParser$consume$lambda(this$0, $char) {
    return function () {
      return 'Expected ' + this$0.r4l_1 + ' but got ' + toString($char);
    };
  }
  function SignParser(isNegativeSetter, withPlusSign, whatThisExpects) {
    this.p4l_1 = isNegativeSetter;
    this.q4l_1 = withPlusSign;
    this.r4l_1 = whatThisExpects;
  }
  protoOf(SignParser).c4l = function (storage, input, startIndex) {
    if (startIndex >= charSequenceLength(input))
      return Companion_instance_10.u4k(startIndex);
    var char = charSequenceGet(input, startIndex);
    if (char === _Char___init__impl__6a9atx(45)) {
      this.p4l_1(storage, true);
      return Companion_instance_10.u4k(startIndex + 1 | 0);
    }
    if (char === _Char___init__impl__6a9atx(43) && this.q4l_1) {
      this.p4l_1(storage, false);
      return Companion_instance_10.u4k(startIndex + 1 | 0);
    }
    var tmp = Companion_instance_10;
    return tmp.v4k(startIndex, SignParser$consume$lambda(this, char));
  };
  protoOf(SignParser).toString = function () {
    return this.r4l_1;
  };
  function UnconditionalModification(operation) {
    this.s4l_1 = operation;
  }
  protoOf(UnconditionalModification).c4l = function (storage, input, startIndex) {
    this.s4l_1(storage);
    return Companion_instance_10.u4k(startIndex);
  };
  function setWithoutReassigning_0(_this__u8e3s4, receiver, value, position, nextIndex) {
    var conflictingValue = _this__u8e3s4.c4i(receiver, value);
    var tmp;
    if (conflictingValue === null) {
      tmp = Companion_instance_10.u4k(nextIndex);
    } else {
      var tmp_0 = Companion_instance_10;
      tmp = tmp_0.v4k(position, setWithoutReassigning$lambda(conflictingValue, value, _this__u8e3s4));
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
    var tmp$ret$4 = this_0.i5();
    return new ParserStructure(tmp$ret$4, emptyList());
  }
  function setWithoutReassigning$lambda($conflictingValue, $value, $this_setWithoutReassigning) {
    return function () {
      return "Attempting to assign conflicting values '" + toString_1($conflictingValue) + "' and '" + toString_1($value) + "' to field '" + $this_setWithoutReassigning.s4h() + "'";
    };
  }
  function get_POWERS_OF_TEN() {
    _init_properties_math_kt__tgcmt4();
    return POWERS_OF_TEN;
  }
  var POWERS_OF_TEN;
  function DecimalFraction(fractionalPart, digits) {
    this.c4f_1 = fractionalPart;
    this.d4f_1 = digits;
    // Inline function 'kotlin.require' call
    if (!(this.d4f_1 >= 0)) {
      var message = 'Digits must be non-negative, but was ' + this.d4f_1;
      throw IllegalArgumentException_init_$Create$(toString_0(message));
    }
  }
  protoOf(DecimalFraction).e4f = function (newDigits) {
    return newDigits === this.d4f_1 ? this.c4f_1 : newDigits > this.d4f_1 ? imul(this.c4f_1, get_POWERS_OF_TEN()[newDigits - this.d4f_1 | 0]) : this.c4f_1 / get_POWERS_OF_TEN()[this.d4f_1 - newDigits | 0] | 0;
  };
  protoOf(DecimalFraction).t4l = function (other) {
    var tmp0 = this.d4f_1;
    // Inline function 'kotlin.comparisons.maxOf' call
    var b = other.d4f_1;
    // Inline function 'kotlin.let' call
    var maxPrecision = Math.max(tmp0, b);
    return compareTo(this.e4f(maxPrecision), other.e4f(maxPrecision));
  };
  protoOf(DecimalFraction).d = function (other) {
    return this.t4l(other instanceof DecimalFraction ? other : THROW_CCE());
  };
  protoOf(DecimalFraction).equals = function (other) {
    var tmp;
    if (other instanceof DecimalFraction) {
      tmp = this.t4l(other) === 0;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(DecimalFraction).toString = function () {
    // Inline function 'kotlin.text.buildString' call
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$();
    var denominator = get_POWERS_OF_TEN()[this.d4f_1];
    this_0.rc(this.c4f_1 / denominator | 0);
    this_0.e8(_Char___init__impl__6a9atx(46));
    this_0.d8(removePrefix((denominator + (this.c4f_1 % denominator | 0) | 0).toString(), '1'));
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
      md = md.y2();
      mr = mr.s2(n);
    } else if (d.b1(new Long(0, 0)) < 0 && r.b1(new Long(0, 0)) > 0) {
      md = md.x2();
      mr = mr.t2(n);
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
    this.u4l_1 = PrimitiveSerialDescriptor('kotlinx.datetime.DatePeriod', STRING_getInstance());
  }
  protoOf(DatePeriodIso8601Serializer).t1k = function () {
    return this.u4l_1;
  };
  protoOf(DatePeriodIso8601Serializer).v1k = function (decoder) {
    var period = Companion_instance_0.dm(decoder.p1n());
    var tmp;
    if (period instanceof DatePeriod) {
      tmp = period;
    } else {
      throw SerializationException_init_$Create$(period.toString() + ' is not a date-based period');
    }
    return tmp;
  };
  protoOf(DatePeriodIso8601Serializer).v4l = function (encoder, value) {
    encoder.y1o(value.toString());
  };
  protoOf(DatePeriodIso8601Serializer).u1k = function (encoder, value) {
    return this.v4l(encoder, value instanceof DatePeriod ? value : THROW_CCE());
  };
  var DatePeriodIso8601Serializer_instance;
  function DatePeriodIso8601Serializer_getInstance() {
    if (DatePeriodIso8601Serializer_instance == null)
      new DatePeriodIso8601Serializer();
    return DatePeriodIso8601Serializer_instance;
  }
  function DateTimePeriodIso8601Serializer() {
    DateTimePeriodIso8601Serializer_instance = this;
    this.w4l_1 = PrimitiveSerialDescriptor('kotlinx.datetime.DateTimePeriod', STRING_getInstance());
  }
  protoOf(DateTimePeriodIso8601Serializer).t1k = function () {
    return this.w4l_1;
  };
  protoOf(DateTimePeriodIso8601Serializer).v1k = function (decoder) {
    return Companion_instance_0.dm(decoder.p1n());
  };
  protoOf(DateTimePeriodIso8601Serializer).x4l = function (encoder, value) {
    encoder.y1o(value.toString());
  };
  protoOf(DateTimePeriodIso8601Serializer).u1k = function (encoder, value) {
    return this.x4l(encoder, value instanceof DateTimePeriod ? value : THROW_CCE());
  };
  var DateTimePeriodIso8601Serializer_instance;
  function DateTimePeriodIso8601Serializer_getInstance() {
    if (DateTimePeriodIso8601Serializer_instance == null)
      new DateTimePeriodIso8601Serializer();
    return DateTimePeriodIso8601Serializer_instance;
  }
  function InstantIso8601Serializer() {
    InstantIso8601Serializer_instance = this;
    this.y4l_1 = PrimitiveSerialDescriptor('kotlinx.datetime.Instant', STRING_getInstance());
  }
  protoOf(InstantIso8601Serializer).t1k = function () {
    return this.y4l_1;
  };
  protoOf(InstantIso8601Serializer).v1k = function (decoder) {
    return Companion_getInstance_11().z4l(decoder.p1n());
  };
  protoOf(InstantIso8601Serializer).a4m = function (encoder, value) {
    encoder.y1o(value.toString());
  };
  protoOf(InstantIso8601Serializer).u1k = function (encoder, value) {
    return this.a4m(encoder, value instanceof Instant_0 ? value : THROW_CCE());
  };
  var InstantIso8601Serializer_instance;
  function InstantIso8601Serializer_getInstance() {
    if (InstantIso8601Serializer_instance == null)
      new InstantIso8601Serializer();
    return InstantIso8601Serializer_instance;
  }
  function LocalDateIso8601Serializer() {
    LocalDateIso8601Serializer_instance = this;
    this.b4m_1 = PrimitiveSerialDescriptor('kotlinx.datetime.LocalDate', STRING_getInstance());
  }
  protoOf(LocalDateIso8601Serializer).t1k = function () {
    return this.b4m_1;
  };
  protoOf(LocalDateIso8601Serializer).v1k = function (decoder) {
    return Companion_getInstance_12().e4m(decoder.p1n());
  };
  protoOf(LocalDateIso8601Serializer).f4m = function (encoder, value) {
    encoder.y1o(value.toString());
  };
  protoOf(LocalDateIso8601Serializer).u1k = function (encoder, value) {
    return this.f4m(encoder, value instanceof LocalDate_0 ? value : THROW_CCE());
  };
  var LocalDateIso8601Serializer_instance;
  function LocalDateIso8601Serializer_getInstance() {
    if (LocalDateIso8601Serializer_instance == null)
      new LocalDateIso8601Serializer();
    return LocalDateIso8601Serializer_instance;
  }
  function LocalDateTimeIso8601Serializer() {
    LocalDateTimeIso8601Serializer_instance = this;
    this.g4m_1 = PrimitiveSerialDescriptor('kotlinx.datetime.LocalDateTime', STRING_getInstance());
  }
  protoOf(LocalDateTimeIso8601Serializer).t1k = function () {
    return this.g4m_1;
  };
  protoOf(LocalDateTimeIso8601Serializer).v1k = function (decoder) {
    return Companion_getInstance_13().j4m(decoder.p1n());
  };
  protoOf(LocalDateTimeIso8601Serializer).k4m = function (encoder, value) {
    encoder.y1o(value.toString());
  };
  protoOf(LocalDateTimeIso8601Serializer).u1k = function (encoder, value) {
    return this.k4m(encoder, value instanceof LocalDateTime_0 ? value : THROW_CCE());
  };
  var LocalDateTimeIso8601Serializer_instance;
  function LocalDateTimeIso8601Serializer_getInstance() {
    if (LocalDateTimeIso8601Serializer_instance == null)
      new LocalDateTimeIso8601Serializer();
    return LocalDateTimeIso8601Serializer_instance;
  }
  function LocalTimeIso8601Serializer() {
    LocalTimeIso8601Serializer_instance = this;
    this.l4m_1 = PrimitiveSerialDescriptor('kotlinx.datetime.LocalTime', STRING_getInstance());
  }
  protoOf(LocalTimeIso8601Serializer).t1k = function () {
    return this.l4m_1;
  };
  protoOf(LocalTimeIso8601Serializer).v1k = function (decoder) {
    return Companion_getInstance_14().o4m(decoder.p1n());
  };
  protoOf(LocalTimeIso8601Serializer).p4m = function (encoder, value) {
    encoder.y1o(value.toString());
  };
  protoOf(LocalTimeIso8601Serializer).u1k = function (encoder, value) {
    return this.p4m(encoder, value instanceof LocalTime_0 ? value : THROW_CCE());
  };
  var LocalTimeIso8601Serializer_instance;
  function LocalTimeIso8601Serializer_getInstance() {
    if (LocalTimeIso8601Serializer_instance == null)
      new LocalTimeIso8601Serializer();
    return LocalTimeIso8601Serializer_instance;
  }
  function UtcOffsetSerializer() {
    UtcOffsetSerializer_instance = this;
    this.q4m_1 = PrimitiveSerialDescriptor('kotlinx.datetime.UtcOffset', STRING_getInstance());
  }
  protoOf(UtcOffsetSerializer).t1k = function () {
    return this.q4m_1;
  };
  protoOf(UtcOffsetSerializer).v1k = function (decoder) {
    return Companion_getInstance_17().s4m(decoder.p1n());
  };
  protoOf(UtcOffsetSerializer).t4m = function (encoder, value) {
    encoder.y1o(value.toString());
  };
  protoOf(UtcOffsetSerializer).u1k = function (encoder, value) {
    return this.t4m(encoder, value instanceof UtcOffset ? value : THROW_CCE());
  };
  var UtcOffsetSerializer_instance;
  function UtcOffsetSerializer_getInstance() {
    if (UtcOffsetSerializer_instance == null)
      new UtcOffsetSerializer();
    return UtcOffsetSerializer_instance;
  }
  function TimeZoneSerializer() {
    TimeZoneSerializer_instance = this;
    this.u4m_1 = PrimitiveSerialDescriptor('kotlinx.datetime.TimeZone', STRING_getInstance());
  }
  protoOf(TimeZoneSerializer).t1k = function () {
    return this.u4m_1;
  };
  protoOf(TimeZoneSerializer).v1k = function (decoder) {
    return Companion_getInstance_15().w4m(decoder.p1n());
  };
  protoOf(TimeZoneSerializer).x4m = function (encoder, value) {
    encoder.y1o(value.z4m());
  };
  protoOf(TimeZoneSerializer).u1k = function (encoder, value) {
    return this.x4m(encoder, value instanceof TimeZone ? value : THROW_CCE());
  };
  var TimeZoneSerializer_instance;
  function TimeZoneSerializer_getInstance() {
    if (TimeZoneSerializer_instance == null)
      new TimeZoneSerializer();
    return TimeZoneSerializer_instance;
  }
  function FixedOffsetTimeZoneSerializer() {
    FixedOffsetTimeZoneSerializer_instance = this;
    this.a4n_1 = PrimitiveSerialDescriptor('kotlinx.datetime.FixedOffsetTimeZone', STRING_getInstance());
  }
  protoOf(FixedOffsetTimeZoneSerializer).t1k = function () {
    return this.a4n_1;
  };
  protoOf(FixedOffsetTimeZoneSerializer).v1k = function (decoder) {
    var zone = Companion_getInstance_15().w4m(decoder.p1n());
    if (zone instanceof FixedOffsetTimeZone) {
      return zone;
    } else {
      throw SerializationException_init_$Create$("Timezone identifier '" + zone.toString() + "' does not correspond to a fixed-offset timezone");
    }
  };
  protoOf(FixedOffsetTimeZoneSerializer).b4n = function (encoder, value) {
    encoder.y1o(value.z4m());
  };
  protoOf(FixedOffsetTimeZoneSerializer).u1k = function (encoder, value) {
    return this.b4n(encoder, value instanceof FixedOffsetTimeZone ? value : THROW_CCE());
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
  function Companion_11() {
    Companion_instance_11 = this;
    var tmp = this;
    // Inline function 'kotlinx.datetime.jsTry' call
    var tmp$ret$1 = Instant.ofEpochSecond((new Long(-931914497, -750)).j3(), 999999999);
    tmp.a47_1 = new Instant_0(tmp$ret$1);
    var tmp_0 = this;
    // Inline function 'kotlinx.datetime.jsTry' call
    var tmp$ret$3 = Instant.ofEpochSecond((new Long(1151527680, 720)).j3(), 0);
    tmp_0.b47_1 = new Instant_0(tmp$ret$3);
    this.c47_1 = new Instant_0(Instant.MIN);
    this.d47_1 = new Instant_0(Instant.MAX);
  }
  protoOf(Companion_11).z46 = function () {
    return new Instant_0(Clock.systemUTC().instant());
  };
  protoOf(Companion_11).c4n = function (input, format) {
    var tmp;
    try {
      tmp = format.q4c(input).c4b();
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
  protoOf(Companion_11).z4l = function (input, format, $super) {
    format = format === VOID ? Formats_getInstance().k4a_1 : format;
    return $super === VOID ? this.c4n(input, format) : $super.c4n.call(this, input, format);
  };
  protoOf(Companion_11).m4b = function (epochSeconds, nanosecondAdjustment) {
    var tmp;
    try {
      // Inline function 'kotlinx.datetime.jsTry' call
      var tmp$ret$1 = Instant.ofEpochSecond(epochSeconds.j3(), nanosecondAdjustment);
      tmp = new Instant_0(tmp$ret$1);
    } catch ($p) {
      var tmp_0;
      if ($p instanceof Error) {
        var e = $p;
        if (!isJodaDateTimeException(e))
          throw e;
        tmp_0 = epochSeconds.b1(new Long(0, 0)) > 0 ? this.d47_1 : this.c47_1;
      } else {
        throw $p;
      }
      tmp = tmp_0;
    }
    return tmp;
  };
  var Companion_instance_11;
  function Companion_getInstance_11() {
    if (Companion_instance_11 == null)
      new Companion_11();
    return Companion_instance_11;
  }
  function Instant_0(value) {
    Companion_getInstance_11();
    this.k4b_1 = value;
  }
  protoOf(Instant_0).l4b = function () {
    return numberToLong(this.k4b_1.epochSecond());
  };
  protoOf(Instant_0).d4n = function () {
    return numberToInt(this.k4b_1.nano());
  };
  protoOf(Instant_0).e4n = function () {
    // Inline function 'kotlin.Long.times' call
    var tmp2 = this.l4b().u2(toLong(1000));
    // Inline function 'kotlin.Long.plus' call
    var other = this.d4n() / 1000000 | 0;
    return tmp2.s2(toLong(other));
  };
  protoOf(Instant_0).f4n = function (other) {
    return this.k4b_1.compareTo(other.k4b_1);
  };
  protoOf(Instant_0).d = function (other) {
    return this.f4n(other instanceof Instant_0 ? other : THROW_CCE());
  };
  protoOf(Instant_0).equals = function (other) {
    var tmp;
    if (this === other) {
      tmp = true;
    } else {
      var tmp_0;
      if (other instanceof Instant_0) {
        tmp_0 = this.k4b_1 === other.k4b_1 || this.k4b_1.equals(other.k4b_1);
      } else {
        tmp_0 = false;
      }
      tmp = tmp_0;
    }
    return tmp;
  };
  protoOf(Instant_0).hashCode = function () {
    return this.k4b_1.hashCode();
  };
  protoOf(Instant_0).toString = function () {
    return this.k4b_1.toString();
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
  function Companion_12() {
    Companion_instance_12 = this;
    this.c4m_1 = new LocalDate_0(LocalDate.MIN);
    this.d4m_1 = new LocalDate_0(LocalDate.MAX);
  }
  protoOf(Companion_12).g4n = function (input, format) {
    var tmp;
    if (format === Formats_getInstance_0().t47()) {
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
      tmp = format.q4c(input);
    }
    return tmp;
  };
  protoOf(Companion_12).e4m = function (input, format, $super) {
    format = format === VOID ? getIsoDateFormat() : format;
    return $super === VOID ? this.g4n(input, format) : $super.g4n.call(this, input, format);
  };
  var Companion_instance_12;
  function Companion_getInstance_12() {
    if (Companion_instance_12 == null)
      new Companion_12();
    return Companion_instance_12;
  }
  function Formats_0() {
    Formats_instance_0 = this;
    this.s47_1 = get_ISO_DATE_BASIC();
  }
  protoOf(Formats_0).t47 = function () {
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
    Companion_getInstance_12();
    this.e4b_1 = value;
  }
  protoOf(LocalDate_0).x4c = function () {
    return toDayOfWeek(this.e4b_1.dayOfWeek());
  };
  protoOf(LocalDate_0).equals = function (other) {
    var tmp;
    if (this === other) {
      tmp = true;
    } else {
      var tmp_0;
      if (other instanceof LocalDate_0) {
        tmp_0 = this.e4b_1 === other.e4b_1 || this.e4b_1.equals(other.e4b_1);
      } else {
        tmp_0 = false;
      }
      tmp = tmp_0;
    }
    return tmp;
  };
  protoOf(LocalDate_0).hashCode = function () {
    return this.e4b_1.hashCode();
  };
  protoOf(LocalDate_0).toString = function () {
    return this.e4b_1.toString();
  };
  protoOf(LocalDate_0).h4n = function (other) {
    return this.e4b_1.compareTo(other.e4b_1);
  };
  protoOf(LocalDate_0).d = function (other) {
    return this.h4n(other instanceof LocalDate_0 ? other : THROW_CCE());
  };
  protoOf(LocalDate_0).f4b = function () {
    return numberToInt(this.e4b_1.toEpochDay());
  };
  function plus_0(_this__u8e3s4, period) {
    var tmp;
    try {
      // Inline function 'kotlin.with' call
      // Inline function 'kotlin.run' call
      var $this$run = _this__u8e3s4.e4b_1;
      var tmp_0;
      if (!(period.e47_1 === 0)) {
        // Inline function 'kotlinx.datetime.jsTry' call
        tmp_0 = $this$run.plusMonths(period.e47_1);
      } else {
        tmp_0 = $this$run;
      }
      // Inline function 'kotlin.run' call
      var $this$run_0 = tmp_0;
      var tmp_1;
      if (!(period.f47_1 === 0)) {
        // Inline function 'kotlinx.datetime.jsTry' call
        tmp_1 = $this$run_0.plusDays(period.f47_1);
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
  function LocalDateTime_init_$Init$(date, time, $this) {
    // Inline function 'kotlinx.datetime.jsTry' call
    var tmp$ret$1 = LocalDateTime.of(date.e4b_1, time.g4b_1);
    LocalDateTime_0.call($this, tmp$ret$1);
    return $this;
  }
  function LocalDateTime_init_$Create$(date, time) {
    return LocalDateTime_init_$Init$(date, time, objectCreate(protoOf(LocalDateTime_0)));
  }
  function Companion_13() {
    Companion_instance_13 = this;
    this.h4m_1 = new LocalDateTime_0(LocalDateTime.MIN);
    this.i4m_1 = new LocalDateTime_0(LocalDateTime.MAX);
  }
  protoOf(Companion_13).i4n = function (input, format) {
    var tmp;
    if (format === Formats_getInstance_1().u47_1) {
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
      tmp = format.q4c(input);
    }
    return tmp;
  };
  protoOf(Companion_13).j4m = function (input, format, $super) {
    format = format === VOID ? getIsoDateTimeFormat() : format;
    return $super === VOID ? this.i4n(input, format) : $super.i4n.call(this, input, format);
  };
  var Companion_instance_13;
  function Companion_getInstance_13() {
    if (Companion_instance_13 == null)
      new Companion_13();
    return Companion_instance_13;
  }
  function Formats_1() {
    Formats_instance_1 = this;
    this.u47_1 = get_ISO_DATETIME();
  }
  var Formats_instance_1;
  function Formats_getInstance_1() {
    if (Formats_instance_1 == null)
      new Formats_1();
    return Formats_instance_1;
  }
  function LocalDateTime_0(value) {
    Companion_getInstance_13();
    this.j4n_1 = value;
  }
  protoOf(LocalDateTime_0).k4n = function () {
    return new LocalDate_0(this.j4n_1.toLocalDate());
  };
  protoOf(LocalDateTime_0).equals = function (other) {
    var tmp;
    if (this === other) {
      tmp = true;
    } else {
      var tmp_0;
      if (other instanceof LocalDateTime_0) {
        tmp_0 = this.j4n_1 === other.j4n_1 || this.j4n_1.equals(other.j4n_1);
      } else {
        tmp_0 = false;
      }
      tmp = tmp_0;
    }
    return tmp;
  };
  protoOf(LocalDateTime_0).hashCode = function () {
    return this.j4n_1.hashCode();
  };
  protoOf(LocalDateTime_0).toString = function () {
    return this.j4n_1.toString();
  };
  protoOf(LocalDateTime_0).l4n = function (other) {
    return this.j4n_1.compareTo(other.j4n_1);
  };
  protoOf(LocalDateTime_0).d = function (other) {
    return this.l4n(other instanceof LocalDateTime_0 ? other : THROW_CCE());
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
  function Companion_14() {
    Companion_instance_14 = this;
    this.m4m_1 = new LocalTime_0(LocalTime.MIN);
    this.n4m_1 = new LocalTime_0(LocalTime.MAX);
  }
  protoOf(Companion_14).m4n = function (input, format) {
    var tmp;
    if (format === Formats_instance_2.t47()) {
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
      tmp = format.q4c(input);
    }
    return tmp;
  };
  protoOf(Companion_14).o4m = function (input, format, $super) {
    format = format === VOID ? getIsoTimeFormat() : format;
    return $super === VOID ? this.m4n(input, format) : $super.m4n.call(this, input, format);
  };
  var Companion_instance_14;
  function Companion_getInstance_14() {
    if (Companion_instance_14 == null)
      new Companion_14();
    return Companion_instance_14;
  }
  function Formats_2() {
  }
  protoOf(Formats_2).t47 = function () {
    return get_ISO_TIME();
  };
  var Formats_instance_2;
  function Formats_getInstance_2() {
    return Formats_instance_2;
  }
  function LocalTime_0(value) {
    Companion_getInstance_14();
    this.g4b_1 = value;
  }
  protoOf(LocalTime_0).h4b = function () {
    return this.g4b_1.toSecondOfDay();
  };
  protoOf(LocalTime_0).equals = function (other) {
    var tmp;
    if (this === other) {
      tmp = true;
    } else {
      var tmp_0;
      if (other instanceof LocalTime_0) {
        tmp_0 = this.g4b_1 === other.g4b_1 || this.g4b_1.equals(other.g4b_1);
      } else {
        tmp_0 = false;
      }
      tmp = tmp_0;
    }
    return tmp;
  };
  protoOf(LocalTime_0).hashCode = function () {
    return this.g4b_1.hashCode();
  };
  protoOf(LocalTime_0).toString = function () {
    return this.g4b_1.toString();
  };
  protoOf(LocalTime_0).n4n = function (other) {
    return this.g4b_1.compareTo(other.g4b_1);
  };
  protoOf(LocalTime_0).d = function (other) {
    return this.n4n(other instanceof LocalTime_0 ? other : THROW_CCE());
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
  function Companion_15() {
    Companion_instance_15 = this;
    this.v4m_1 = asTimeZone(new UtcOffset(ZoneOffset.UTC));
  }
  protoOf(Companion_15).o4n = function () {
    return ofZone(this, ZoneId.systemDefault());
  };
  protoOf(Companion_15).w4m = function (zoneId) {
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
  var Companion_instance_15;
  function Companion_getInstance_15() {
    if (Companion_instance_15 == null)
      new Companion_15();
    return Companion_instance_15;
  }
  function TimeZone(zoneId) {
    Companion_getInstance_15();
    this.y4m_1 = zoneId;
  }
  protoOf(TimeZone).z4m = function () {
    return this.y4m_1.id();
  };
  protoOf(TimeZone).equals = function (other) {
    var tmp;
    if (this === other) {
      tmp = true;
    } else {
      var tmp_0;
      if (other instanceof TimeZone) {
        tmp_0 = this.y4m_1 === other.y4m_1 || this.y4m_1.equals(other.y4m_1);
      } else {
        tmp_0 = false;
      }
      tmp = tmp_0;
    }
    return tmp;
  };
  protoOf(TimeZone).hashCode = function () {
    return this.y4m_1.hashCode();
  };
  protoOf(TimeZone).toString = function () {
    return this.y4m_1.toString();
  };
  function toLocalDateTime(_this__u8e3s4, timeZone) {
    var tmp;
    try {
      // Inline function 'kotlinx.datetime.jsTry' call
      // Inline function 'kotlin.let' call
      var p0 = LocalDateTime.ofInstant(_this__u8e3s4.k4b_1, timeZone.y4m_1);
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
    FixedOffsetTimeZone.call($this, offset, offset.i4b_1);
    return $this;
  }
  function FixedOffsetTimeZone_init_$Create$(offset) {
    return FixedOffsetTimeZone_init_$Init$(offset, objectCreate(protoOf(FixedOffsetTimeZone)));
  }
  function Companion_16() {
  }
  var Companion_instance_16;
  function Companion_getInstance_16() {
    return Companion_instance_16;
  }
  function FixedOffsetTimeZone(offset, zoneId) {
    TimeZone.call(this, zoneId);
    this.q4n_1 = offset;
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
  function Companion_17() {
    Companion_instance_17 = this;
    this.r4m_1 = new UtcOffset(ZoneOffset.UTC);
  }
  protoOf(Companion_17).r4n = function (input, format) {
    return format === Formats_instance_3.t47() ? parseWithFormat(input, get_isoFormat()) : format === Formats_instance_3.s4n() ? parseWithFormat(input, get_isoBasicFormat()) : format === Formats_instance_3.i4a() ? parseWithFormat(input, get_fourDigitsFormat()) : format.q4c(input);
  };
  protoOf(Companion_17).s4m = function (input, format, $super) {
    format = format === VOID ? getIsoUtcOffsetFormat() : format;
    return $super === VOID ? this.r4n(input, format) : $super.r4n.call(this, input, format);
  };
  var Companion_instance_17;
  function Companion_getInstance_17() {
    if (Companion_instance_17 == null)
      new Companion_17();
    return Companion_instance_17;
  }
  function Formats_3() {
  }
  protoOf(Formats_3).t47 = function () {
    return get_ISO_OFFSET();
  };
  protoOf(Formats_3).s4n = function () {
    return get_ISO_OFFSET_BASIC();
  };
  protoOf(Formats_3).i4a = function () {
    return get_FOUR_DIGIT_OFFSET();
  };
  var Formats_instance_3;
  function Formats_getInstance_3() {
    return Formats_instance_3;
  }
  function UtcOffset(zoneOffset) {
    Companion_getInstance_17();
    this.i4b_1 = zoneOffset;
  }
  protoOf(UtcOffset).j4b = function () {
    return this.i4b_1.totalSeconds();
  };
  protoOf(UtcOffset).hashCode = function () {
    return this.i4b_1.hashCode();
  };
  protoOf(UtcOffset).equals = function (other) {
    var tmp;
    if (other instanceof UtcOffset) {
      tmp = this.i4b_1 === other.i4b_1 || this.i4b_1.equals(other.i4b_1);
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(UtcOffset).toString = function () {
    return this.i4b_1.toString();
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
      return a.z2();
    } else if (b.equals(new Long(0, 0)))
      return new Long(0, 0);
    else if (b.equals(new Long(1, 0)))
      return a;
    var total = a.u2(b);
    if (!total.v2(b).equals(a)) {
      throw ArithmeticException_init_$Create$('Multiplication overflows a long: ' + a.toString() + ' * ' + b.toString());
    }
    return total;
  }
  function safeAdd(a, b) {
    var sum = a.s2(b);
    if (a.g3(sum).b1(new Long(0, 0)) < 0 && a.g3(b).b1(new Long(0, 0)) >= 0) {
      throw ArithmeticException_init_$Create$('Addition overflows a long: ' + a.toString() + ' + ' + b.toString());
    }
    return sum;
  }
  function hasJsExceptionName(_this__u8e3s4, name) {
    // Inline function 'kotlin.js.asDynamic' call
    return _this__u8e3s4.name == name;
  }
  //region block: post-declaration
  protoOf(Builder).u4b = appendAlternativeParsingImpl;
  protoOf(Builder).v4b = appendOptionalImpl;
  protoOf(Builder).e4a = chars;
  protoOf(Builder).e2d = build;
  protoOf(Builder).w4b = addFormatStructureForDate;
  protoOf(Builder).x4b = addFormatStructureForTime;
  protoOf(Builder).y4b = year;
  protoOf(Builder).d4a = year$default;
  protoOf(Builder).z4b = monthNumber;
  protoOf(Builder).a4c = monthNumber$default;
  protoOf(Builder).c4a = monthName;
  protoOf(Builder).z49 = dayOfMonth;
  protoOf(Builder).b4c = dayOfMonth$default;
  protoOf(Builder).h4a = dayOfWeek;
  protoOf(Builder).s49 = date;
  protoOf(Builder).c4c = hour;
  protoOf(Builder).t49 = hour$default;
  protoOf(Builder).d4c = minute;
  protoOf(Builder).u49 = minute$default;
  protoOf(Builder).e4c = second;
  protoOf(Builder).v49 = second$default;
  protoOf(Builder).w49 = secondFraction;
  protoOf(Builder).f4c = time;
  protoOf(Builder).g4c = offsetHours;
  protoOf(Builder).x49 = offsetHours$default;
  protoOf(Builder).h4c = offsetMinutesOfHour;
  protoOf(Builder).i4c = offsetMinutesOfHour$default;
  protoOf(Builder).j4c = offsetSecondsOfMinute;
  protoOf(Builder).k4c = offsetSecondsOfMinute$default;
  protoOf(Builder).y49 = offset;
  protoOf(Builder_0).u4b = appendAlternativeParsingImpl;
  protoOf(Builder_0).v4b = appendOptionalImpl;
  protoOf(Builder_0).e4a = chars;
  protoOf(Builder_0).e2d = build;
  protoOf(Builder_0).y4b = year;
  protoOf(Builder_0).d4a = year$default;
  protoOf(Builder_0).z4b = monthNumber;
  protoOf(Builder_0).a4c = monthNumber$default;
  protoOf(Builder_0).z49 = dayOfMonth;
  protoOf(Builder_0).b4c = dayOfMonth$default;
  protoOf(Builder_1).u4b = appendAlternativeParsingImpl;
  protoOf(Builder_1).v4b = appendOptionalImpl;
  protoOf(Builder_1).e4a = chars;
  protoOf(Builder_1).e2d = build;
  protoOf(Builder_1).w4b = addFormatStructureForDate;
  protoOf(Builder_1).x4b = addFormatStructureForTime;
  protoOf(Builder_1).y4b = year;
  protoOf(Builder_1).d4a = year$default;
  protoOf(Builder_1).z4b = monthNumber;
  protoOf(Builder_1).a4c = monthNumber$default;
  protoOf(Builder_1).z49 = dayOfMonth;
  protoOf(Builder_1).b4c = dayOfMonth$default;
  protoOf(Builder_1).s49 = date;
  protoOf(Builder_1).c4c = hour;
  protoOf(Builder_1).t49 = hour$default;
  protoOf(Builder_1).d4c = minute;
  protoOf(Builder_1).u49 = minute$default;
  protoOf(Builder_1).e4c = second;
  protoOf(Builder_1).v49 = second$default;
  protoOf(Builder_1).w49 = secondFraction;
  protoOf(Builder_1).f4c = time;
  protoOf(IncompleteLocalTime).t48 = set_fractionOfSecond;
  protoOf(IncompleteLocalTime).u48 = get_fractionOfSecond;
  protoOf(Builder_2).u4b = appendAlternativeParsingImpl;
  protoOf(Builder_2).v4b = appendOptionalImpl;
  protoOf(Builder_2).e4a = chars;
  protoOf(Builder_2).e2d = build;
  protoOf(Builder_2).c4c = hour;
  protoOf(Builder_2).t49 = hour$default;
  protoOf(Builder_2).d4c = minute;
  protoOf(Builder_2).u49 = minute$default;
  protoOf(Builder_2).e4c = second;
  protoOf(Builder_2).v49 = second$default;
  protoOf(Builder_2).w49 = secondFraction;
  protoOf(Builder_3).u4b = appendAlternativeParsingImpl;
  protoOf(Builder_3).v4b = appendOptionalImpl;
  protoOf(Builder_3).e4a = chars;
  protoOf(Builder_3).e2d = build;
  protoOf(Builder_3).g4c = offsetHours;
  protoOf(Builder_3).x49 = offsetHours$default;
  protoOf(Builder_3).h4c = offsetMinutesOfHour;
  protoOf(Builder_3).i4c = offsetMinutesOfHour$default;
  protoOf(Builder_3).j4c = offsetSecondsOfMinute;
  protoOf(Builder_3).k4c = offsetSecondsOfMinute$default;
  protoOf(PropertyAccessor).q4h = getterNotNull;
  //endregion
  //region block: init
  System_instance = new System();
  Companion_instance = new Companion();
  Companion_instance_0 = new Companion_0();
  Companion_instance_1 = new Companion_1();
  Companion_instance_4 = new Companion_4();
  Companion_instance_5 = new Companion_5();
  Companion_instance_6 = new Companion_6();
  Companion_instance_8 = new Companion_8();
  Companion_instance_9 = new Companion_9();
  Truth_instance = new Truth();
  ExpectedInt_instance = new ExpectedInt();
  Companion_instance_10 = new Companion_10();
  Formats_instance_2 = new Formats_2();
  Companion_instance_16 = new Companion_16();
  Formats_instance_3 = new Formats_3();
  //endregion
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = DatePeriod_init_$Create$;
  _.$_$.b = System_instance;
  _.$_$.c = Companion_getInstance_11;
  _.$_$.d = Companion_getInstance_12;
  _.$_$.e = Companion_getInstance_15;
  _.$_$.f = plus_0;
  _.$_$.g = toLocalDateTime;
  //endregion
  return _;
}));

//# sourceMappingURL=Kotlin-DateTime-library-kotlinx-datetime.js.map
