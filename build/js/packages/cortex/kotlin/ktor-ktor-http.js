(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js', './ktor-ktor-io.js', './ktor-ktor-utils.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'), require('./ktor-ktor-io.js'), require('./ktor-ktor-utils.js'));
  else {
    if (typeof globalThis['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'ktor-ktor-http'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'ktor-ktor-http'.");
    }
    if (typeof globalThis['ktor-ktor-io'] === 'undefined') {
      throw new Error("Error loading module 'ktor-ktor-http'. Its dependency 'ktor-ktor-io' was not found. Please, check whether 'ktor-ktor-io' is loaded prior to 'ktor-ktor-http'.");
    }
    if (typeof globalThis['ktor-ktor-utils'] === 'undefined') {
      throw new Error("Error loading module 'ktor-ktor-http'. Its dependency 'ktor-ktor-utils' was not found. Please, check whether 'ktor-ktor-utils' is loaded prior to 'ktor-ktor-http'.");
    }
    globalThis['ktor-ktor-http'] = factory(typeof globalThis['ktor-ktor-http'] === 'undefined' ? {} : globalThis['ktor-ktor-http'], globalThis['kotlin-kotlin-stdlib'], globalThis['ktor-ktor-io'], globalThis['ktor-ktor-utils']);
  }
}(function (_, kotlin_kotlin, kotlin_io_ktor_ktor_io, kotlin_io_ktor_ktor_utils) {
  'use strict';
  //region block: imports
  var imul = Math.imul;
  var VOID = kotlin_kotlin.$_$.h;
  var StringBuilder_init_$Create$ = kotlin_kotlin.$_$.i1;
  var Charsets_getInstance = kotlin_io_ktor_ktor_io.$_$.i;
  var encode = kotlin_io_ktor_ktor_io.$_$.m;
  var Unit_instance = kotlin_kotlin.$_$.f5;
  var takeWhile = kotlin_io_ktor_ktor_io.$_$.t;
  var charArray = kotlin_kotlin.$_$.ga;
  var _Char___init__impl__6a9atx = kotlin_kotlin.$_$.o2;
  var concatToString = kotlin_kotlin.$_$.ad;
  var charSequenceGet = kotlin_kotlin.$_$.ha;
  var toString = kotlin_kotlin.$_$.bc;
  var Char = kotlin_kotlin.$_$.nf;
  var isSurrogate = kotlin_kotlin.$_$.qd;
  var Char__plus_impl_qi7pgj = kotlin_kotlin.$_$.s2;
  var Char__minus_impl_a2frrh = kotlin_kotlin.$_$.r2;
  var StringBuilder_init_$Create$_0 = kotlin_kotlin.$_$.h1;
  var charSequenceLength = kotlin_kotlin.$_$.ia;
  var charSequenceSubSequence = kotlin_kotlin.$_$.ja;
  var toString_0 = kotlin_kotlin.$_$.v2;
  var toByte = kotlin_kotlin.$_$.yb;
  var decodeToString = kotlin_kotlin.$_$.fd;
  var Exception = kotlin_kotlin.$_$.uf;
  var Exception_init_$Init$ = kotlin_kotlin.$_$.n1;
  var captureStack = kotlin_kotlin.$_$.ea;
  var protoOf = kotlin_kotlin.$_$.xb;
  var initMetadataForClass = kotlin_kotlin.$_$.ta;
  var Char__minus_impl_a2frrh_0 = kotlin_kotlin.$_$.q2;
  var Char__toInt_impl_vasixd = kotlin_kotlin.$_$.u2;
  var numberToChar = kotlin_kotlin.$_$.sb;
  var canRead = kotlin_io_ktor_ktor_io.$_$.r;
  var Char__rangeTo_impl_tkncvp = kotlin_kotlin.$_$.t2;
  var plus = kotlin_kotlin.$_$.z7;
  var plus_0 = kotlin_kotlin.$_$.a8;
  var collectionSizeOrDefault = kotlin_kotlin.$_$.b6;
  var ArrayList_init_$Create$ = kotlin_kotlin.$_$.o;
  var toSet = kotlin_kotlin.$_$.z8;
  var setOf = kotlin_kotlin.$_$.i8;
  var plus_1 = kotlin_kotlin.$_$.x7;
  var listOf = kotlin_kotlin.$_$.q7;
  var emptyList = kotlin_kotlin.$_$.t6;
  var objectCreate = kotlin_kotlin.$_$.wb;
  var equals = kotlin_kotlin.$_$.id;
  var Collection = kotlin_kotlin.$_$.h5;
  var isInterface = kotlin_kotlin.$_$.ib;
  var isBlank = kotlin_kotlin.$_$.od;
  var last = kotlin_kotlin.$_$.m7;
  var indexOf = kotlin_kotlin.$_$.nd;
  var THROW_CCE = kotlin_kotlin.$_$.cg;
  var isCharSequence = kotlin_kotlin.$_$.eb;
  var trim = kotlin_kotlin.$_$.if;
  var contains = kotlin_kotlin.$_$.dd;
  var initMetadataForCompanion = kotlin_kotlin.$_$.ua;
  var initMetadataForObject = kotlin_kotlin.$_$.za;
  var plus_2 = kotlin_kotlin.$_$.b8;
  var equals_0 = kotlin_kotlin.$_$.ma;
  var getStringHashCode = kotlin_kotlin.$_$.ra;
  var hashCode = kotlin_kotlin.$_$.sa;
  var forName = kotlin_io_ktor_ktor_io.$_$.n;
  var IllegalArgumentException = kotlin_kotlin.$_$.vf;
  var get_name = kotlin_io_ktor_ktor_io.$_$.o;
  var get_lastIndex = kotlin_kotlin.$_$.k7;
  var first = kotlin_kotlin.$_$.kd;
  var last_0 = kotlin_kotlin.$_$.vd;
  var get_lastIndex_0 = kotlin_kotlin.$_$.sd;
  var StringValuesBuilderImpl = kotlin_io_ktor_ktor_utils.$_$.q;
  var emptySet = kotlin_kotlin.$_$.v6;
  var get = kotlin_io_ktor_ktor_utils.$_$.p;
  var forEach = kotlin_io_ktor_ktor_utils.$_$.o;
  var StringValues = kotlin_io_ktor_ktor_utils.$_$.s;
  var StringValuesImpl = kotlin_io_ktor_ktor_utils.$_$.r;
  var emptyMap = kotlin_kotlin.$_$.u6;
  var toDoubleOrNull = kotlin_kotlin.$_$.pe;
  var LazyThreadSafetyMode_NONE_getInstance = kotlin_kotlin.$_$.k;
  var lazy = kotlin_kotlin.$_$.zg;
  var to = kotlin_kotlin.$_$.gh;
  var ArrayList_init_$Create$_0 = kotlin_kotlin.$_$.p;
  var asList = kotlin_kotlin.$_$.v5;
  var Char__compareTo_impl_ypi4mb = kotlin_kotlin.$_$.p2;
  var IllegalArgumentException_init_$Init$ = kotlin_kotlin.$_$.t1;
  var toLong = kotlin_kotlin.$_$.ve;
  var mapCapacity = kotlin_kotlin.$_$.r7;
  var coerceAtLeast = kotlin_kotlin.$_$.hc;
  var LinkedHashMap_init_$Create$ = kotlin_kotlin.$_$.x;
  var Comparable = kotlin_kotlin.$_$.of;
  var initMetadataForInterface = kotlin_kotlin.$_$.xa;
  var isWhitespace = kotlin_kotlin.$_$.rd;
  var IllegalArgumentException_init_$Create$ = kotlin_kotlin.$_$.u1;
  var startsWith = kotlin_kotlin.$_$.je;
  var charArrayOf = kotlin_kotlin.$_$.fa;
  var split = kotlin_kotlin.$_$.ge;
  var toMutableList = kotlin_kotlin.$_$.x8;
  var first_0 = kotlin_kotlin.$_$.y6;
  var joinToString = kotlin_kotlin.$_$.h7;
  var toCharArray = kotlin_io_ktor_ktor_utils.$_$.w;
  var indexOfAny = kotlin_kotlin.$_$.ld;
  var dropLast = kotlin_kotlin.$_$.r6;
  var IllegalStateException = kotlin_kotlin.$_$.wf;
  var IllegalStateException_init_$Init$ = kotlin_kotlin.$_$.z1;
  var indexOf_0 = kotlin_kotlin.$_$.md;
  var toInt = kotlin_kotlin.$_$.se;
  var listOf_0 = kotlin_kotlin.$_$.p7;
  var toLowerCasePreservingASCIIRules = kotlin_io_ktor_ktor_utils.$_$.x;
  var isLowerCase = kotlin_io_ktor_ktor_utils.$_$.u;
  var appendAll = kotlin_io_ktor_ktor_utils.$_$.t;
  var startsWith_0 = kotlin_kotlin.$_$.ie;
  var addAll = kotlin_kotlin.$_$.t5;
  var joinTo = kotlin_kotlin.$_$.i7;
  var toString_1 = kotlin_kotlin.$_$.fh;
  var lazy_0 = kotlin_kotlin.$_$.ah;
  var getKClassFromExpression = kotlin_kotlin.$_$.e;
  var KProperty1 = kotlin_kotlin.$_$.vc;
  var getPropertyCallableRef = kotlin_kotlin.$_$.qa;
  var toByteArray = kotlin_io_ktor_ktor_io.$_$.u;
  var toLong_0 = kotlin_kotlin.$_$.zb;
  var take = kotlin_kotlin.$_$.ne;
  var PlatformUtils_getInstance = kotlin_io_ktor_ktor_utils.$_$.a;
  //endregion
  //region block: pre-declaration
  initMetadataForClass(URLDecodeException, 'URLDecodeException', VOID, Exception);
  initMetadataForCompanion(Companion);
  initMetadataForObject(Application, 'Application');
  initMetadataForObject(Text, 'Text');
  initMetadataForClass(HeaderValueWithParameters, 'HeaderValueWithParameters');
  initMetadataForClass(ContentType, 'ContentType', VOID, HeaderValueWithParameters);
  initMetadataForClass(BadContentTypeFormatException, 'BadContentTypeFormatException', VOID, Exception);
  initMetadataForCompanion(Companion_0);
  initMetadataForCompanion(Companion_1);
  initMetadataForClass(HeadersBuilder, 'HeadersBuilder', HeadersBuilder, StringValuesBuilderImpl);
  initMetadataForObject(EmptyHeaders, 'EmptyHeaders', VOID, VOID, [StringValues]);
  initMetadataForClass(HeadersImpl, 'HeadersImpl', HeadersImpl, StringValuesImpl, [StringValues, StringValuesImpl]);
  initMetadataForClass(HeaderValueParam, 'HeaderValueParam');
  initMetadataForClass(HeaderValue, 'HeaderValue');
  initMetadataForObject(HttpHeaders, 'HttpHeaders');
  initMetadataForClass(IllegalHeaderNameException, 'IllegalHeaderNameException', VOID, IllegalArgumentException);
  initMetadataForClass(IllegalHeaderValueException, 'IllegalHeaderValueException', VOID, IllegalArgumentException);
  initMetadataForClass(UnsafeHeaderException, 'UnsafeHeaderException', VOID, IllegalArgumentException);
  initMetadataForCompanion(Companion_2);
  initMetadataForClass(HttpMethod, 'HttpMethod');
  initMetadataForCompanion(Companion_3);
  initMetadataForClass(HttpProtocolVersion, 'HttpProtocolVersion');
  initMetadataForCompanion(Companion_4);
  initMetadataForClass(HttpStatusCode, 'HttpStatusCode', VOID, VOID, [Comparable]);
  initMetadataForCompanion(Companion_5);
  initMetadataForInterface(Parameters, 'Parameters', VOID, VOID, [StringValues]);
  initMetadataForObject(EmptyParameters, 'EmptyParameters', VOID, VOID, [Parameters]);
  initMetadataForClass(ParametersBuilderImpl, 'ParametersBuilderImpl', ParametersBuilderImpl, StringValuesBuilderImpl);
  initMetadataForClass(ParametersImpl, 'ParametersImpl', ParametersImpl, StringValuesImpl, [Parameters, StringValuesImpl]);
  initMetadataForCompanion(Companion_6);
  initMetadataForClass(URLBuilder, 'URLBuilder', URLBuilder);
  initMetadataForClass(URLParserException, 'URLParserException', VOID, IllegalStateException);
  initMetadataForCompanion(Companion_7);
  initMetadataForClass(URLProtocol, 'URLProtocol');
  initMetadataForCompanion(Companion_8);
  initMetadataForClass(Url_0, 'Url');
  initMetadataForClass(UrlDecodedParametersBuilder, 'UrlDecodedParametersBuilder');
  initMetadataForClass(OutgoingContent, 'OutgoingContent');
  initMetadataForClass(NoContent, 'NoContent', VOID, OutgoingContent);
  initMetadataForClass(ReadChannelContent, 'ReadChannelContent', VOID, OutgoingContent);
  initMetadataForClass(WriteChannelContent, 'WriteChannelContent', VOID, OutgoingContent, VOID, [1]);
  initMetadataForClass(ByteArrayContent, 'ByteArrayContent', VOID, OutgoingContent);
  initMetadataForClass(ProtocolUpgrade, 'ProtocolUpgrade', VOID, OutgoingContent, VOID, [4]);
  initMetadataForClass(ContentWrapper, 'ContentWrapper', VOID, OutgoingContent);
  initMetadataForObject(NullBody, 'NullBody');
  initMetadataForClass(TextContent, 'TextContent', VOID, ByteArrayContent);
  //endregion
  function get_URL_ALPHABET() {
    _init_properties_Codecs_kt__fudxxf();
    return URL_ALPHABET;
  }
  var URL_ALPHABET;
  function get_URL_ALPHABET_CHARS() {
    _init_properties_Codecs_kt__fudxxf();
    return URL_ALPHABET_CHARS;
  }
  var URL_ALPHABET_CHARS;
  function get_HEX_ALPHABET() {
    _init_properties_Codecs_kt__fudxxf();
    return HEX_ALPHABET;
  }
  var HEX_ALPHABET;
  function get_URL_PROTOCOL_PART() {
    _init_properties_Codecs_kt__fudxxf();
    return URL_PROTOCOL_PART;
  }
  var URL_PROTOCOL_PART;
  function get_VALID_PATH_PART() {
    _init_properties_Codecs_kt__fudxxf();
    return VALID_PATH_PART;
  }
  var VALID_PATH_PART;
  var ATTRIBUTE_CHARACTERS;
  function get_SPECIAL_SYMBOLS() {
    _init_properties_Codecs_kt__fudxxf();
    return SPECIAL_SYMBOLS;
  }
  var SPECIAL_SYMBOLS;
  function encodeURLParameter(_this__u8e3s4, spaceToPlus) {
    spaceToPlus = spaceToPlus === VOID ? false : spaceToPlus;
    _init_properties_Codecs_kt__fudxxf();
    // Inline function 'kotlin.text.buildString' call
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$();
    var content = encode(Charsets_getInstance().n1j_1.r1j(), _this__u8e3s4);
    forEach_0(content, encodeURLParameter$lambda(this_0, spaceToPlus));
    return this_0.toString();
  }
  function decodeURLPart(_this__u8e3s4, start, end, charset) {
    start = start === VOID ? 0 : start;
    end = end === VOID ? _this__u8e3s4.length : end;
    charset = charset === VOID ? Charsets_getInstance().n1j_1 : charset;
    _init_properties_Codecs_kt__fudxxf();
    return decodeScan(_this__u8e3s4, start, end, false, charset);
  }
  function encodeURLQueryComponent(_this__u8e3s4, encodeFull, spaceToPlus, charset) {
    encodeFull = encodeFull === VOID ? false : encodeFull;
    spaceToPlus = spaceToPlus === VOID ? false : spaceToPlus;
    charset = charset === VOID ? Charsets_getInstance().n1j_1 : charset;
    _init_properties_Codecs_kt__fudxxf();
    // Inline function 'kotlin.text.buildString' call
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$();
    var content = encode(charset.r1j(), _this__u8e3s4);
    forEach_0(content, encodeURLQueryComponent$lambda(spaceToPlus, this_0, encodeFull));
    return this_0.toString();
  }
  function decodeURLQueryComponent(_this__u8e3s4, start, end, plusIsSpace, charset) {
    start = start === VOID ? 0 : start;
    end = end === VOID ? _this__u8e3s4.length : end;
    plusIsSpace = plusIsSpace === VOID ? false : plusIsSpace;
    charset = charset === VOID ? Charsets_getInstance().n1j_1 : charset;
    _init_properties_Codecs_kt__fudxxf();
    return decodeScan(_this__u8e3s4, start, end, plusIsSpace, charset);
  }
  function encodeURLPathPart(_this__u8e3s4) {
    _init_properties_Codecs_kt__fudxxf();
    return encodeURLPath(_this__u8e3s4, true);
  }
  function forEach_0(_this__u8e3s4, block) {
    _init_properties_Codecs_kt__fudxxf();
    takeWhile(_this__u8e3s4, forEach$lambda(block));
  }
  function percentEncode(_this__u8e3s4) {
    _init_properties_Codecs_kt__fudxxf();
    var code = _this__u8e3s4 & 255;
    var array = charArray(3);
    array[0] = _Char___init__impl__6a9atx(37);
    array[1] = hexDigitToChar(code >> 4);
    array[2] = hexDigitToChar(code & 15);
    return concatToString(array);
  }
  function decodeScan(_this__u8e3s4, start, end, plusIsSpace, charset) {
    _init_properties_Codecs_kt__fudxxf();
    var inductionVariable = start;
    if (inductionVariable < end)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var ch = charSequenceGet(_this__u8e3s4, index);
        if (ch === _Char___init__impl__6a9atx(37) || (plusIsSpace && ch === _Char___init__impl__6a9atx(43))) {
          return decodeImpl(_this__u8e3s4, start, end, index, plusIsSpace, charset);
        }
      }
       while (inductionVariable < end);
    var tmp;
    if (start === 0 && end === _this__u8e3s4.length) {
      tmp = toString(_this__u8e3s4);
    } else {
      // Inline function 'kotlin.text.substring' call
      // Inline function 'kotlin.js.asDynamic' call
      tmp = _this__u8e3s4.substring(start, end);
    }
    return tmp;
  }
  function encodeURLPath(_this__u8e3s4, encodeSlash, encodeEncoded) {
    encodeSlash = encodeSlash === VOID ? false : encodeSlash;
    encodeEncoded = encodeEncoded === VOID ? true : encodeEncoded;
    _init_properties_Codecs_kt__fudxxf();
    // Inline function 'kotlin.text.buildString' call
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$();
    var charset = Charsets_getInstance().n1j_1;
    var index = 0;
    $l$loop_0: while (index < _this__u8e3s4.length) {
      var current = charSequenceGet(_this__u8e3s4, index);
      if (!encodeSlash && current === _Char___init__impl__6a9atx(47) || get_URL_ALPHABET_CHARS().r(new Char(current)) || get_VALID_PATH_PART().r(new Char(current))) {
        this_0.a8(current);
        index = index + 1 | 0;
        continue $l$loop_0;
      }
      if (!encodeEncoded && current === _Char___init__impl__6a9atx(37) && (index + 2 | 0) < _this__u8e3s4.length && get_HEX_ALPHABET().r(new Char(charSequenceGet(_this__u8e3s4, index + 1 | 0))) && get_HEX_ALPHABET().r(new Char(charSequenceGet(_this__u8e3s4, index + 2 | 0)))) {
        this_0.a8(current);
        this_0.a8(charSequenceGet(_this__u8e3s4, index + 1 | 0));
        this_0.a8(charSequenceGet(_this__u8e3s4, index + 2 | 0));
        index = index + 3 | 0;
        continue $l$loop_0;
      }
      var symbolSize = isSurrogate(current) ? 2 : 1;
      var tmp = encode(charset.r1j(), _this__u8e3s4, index, index + symbolSize | 0);
      forEach_0(tmp, encodeURLPath$lambda(this_0));
      index = index + symbolSize | 0;
    }
    return this_0.toString();
  }
  function hexDigitToChar(digit) {
    _init_properties_Codecs_kt__fudxxf();
    return (0 <= digit ? digit <= 9 : false) ? Char__plus_impl_qi7pgj(_Char___init__impl__6a9atx(48), digit) : Char__minus_impl_a2frrh(Char__plus_impl_qi7pgj(_Char___init__impl__6a9atx(65), digit), 10);
  }
  function decodeImpl(_this__u8e3s4, start, end, prefixEnd, plusIsSpace, charset) {
    _init_properties_Codecs_kt__fudxxf();
    var length = end - start | 0;
    var sbSize = length > 255 ? length / 3 | 0 : length;
    var sb = StringBuilder_init_$Create$_0(sbSize);
    if (prefixEnd > start) {
      sb.kc(_this__u8e3s4, start, prefixEnd);
    }
    var index = prefixEnd;
    var bytes = null;
    while (index < end) {
      var c = charSequenceGet(_this__u8e3s4, index);
      if (plusIsSpace && c === _Char___init__impl__6a9atx(43)) {
        sb.a8(_Char___init__impl__6a9atx(32));
        index = index + 1 | 0;
      } else if (c === _Char___init__impl__6a9atx(37)) {
        if (bytes == null) {
          bytes = new Int8Array((end - index | 0) / 3 | 0);
        }
        var count = 0;
        while (index < end && charSequenceGet(_this__u8e3s4, index) === _Char___init__impl__6a9atx(37)) {
          if ((index + 2 | 0) >= end) {
            // Inline function 'kotlin.text.substring' call
            var startIndex = index;
            var endIndex = charSequenceLength(_this__u8e3s4);
            var tmp$ret$0 = toString(charSequenceSubSequence(_this__u8e3s4, startIndex, endIndex));
            throw new URLDecodeException('Incomplete trailing HEX escape: ' + tmp$ret$0 + ', in ' + toString(_this__u8e3s4) + ' at ' + index);
          }
          var digit1 = charToHexDigit(charSequenceGet(_this__u8e3s4, index + 1 | 0));
          var digit2 = charToHexDigit(charSequenceGet(_this__u8e3s4, index + 2 | 0));
          if (digit1 === -1 || digit2 === -1) {
            throw new URLDecodeException('Wrong HEX escape: %' + toString_0(charSequenceGet(_this__u8e3s4, index + 1 | 0)) + toString_0(charSequenceGet(_this__u8e3s4, index + 2 | 0)) + ', in ' + toString(_this__u8e3s4) + ', at ' + index);
          }
          var tmp = bytes;
          var _unary__edvuaz = count;
          count = _unary__edvuaz + 1 | 0;
          tmp[_unary__edvuaz] = toByte(imul(digit1, 16) + digit2 | 0);
          index = index + 3 | 0;
        }
        sb.z7(decodeToString(bytes, 0, 0 + count | 0));
      } else {
        sb.a8(c);
        index = index + 1 | 0;
      }
    }
    return sb.toString();
  }
  function URLDecodeException(message) {
    Exception_init_$Init$(message, this);
    captureStack(this, URLDecodeException);
  }
  function charToHexDigit(c2) {
    _init_properties_Codecs_kt__fudxxf();
    return (_Char___init__impl__6a9atx(48) <= c2 ? c2 <= _Char___init__impl__6a9atx(57) : false) ? Char__minus_impl_a2frrh_0(c2, _Char___init__impl__6a9atx(48)) : (_Char___init__impl__6a9atx(65) <= c2 ? c2 <= _Char___init__impl__6a9atx(70) : false) ? Char__minus_impl_a2frrh_0(c2, _Char___init__impl__6a9atx(65)) + 10 | 0 : (_Char___init__impl__6a9atx(97) <= c2 ? c2 <= _Char___init__impl__6a9atx(102) : false) ? Char__minus_impl_a2frrh_0(c2, _Char___init__impl__6a9atx(97)) + 10 | 0 : -1;
  }
  function encodeURLParameterValue(_this__u8e3s4) {
    _init_properties_Codecs_kt__fudxxf();
    return encodeURLParameter(_this__u8e3s4, true);
  }
  function encodeURLParameter$lambda($$this$buildString, $spaceToPlus) {
    return function (it) {
      if (get_URL_ALPHABET().r(it) || get_SPECIAL_SYMBOLS().r(it))
        $$this$buildString.a8(numberToChar(it));
      else {
        var tmp;
        if ($spaceToPlus) {
          var tmp_0 = it;
          // Inline function 'kotlin.code' call
          var this_0 = _Char___init__impl__6a9atx(32);
          var tmp$ret$0 = Char__toInt_impl_vasixd(this_0);
          tmp = tmp_0 === toByte(tmp$ret$0);
        } else {
          tmp = false;
        }
        if (tmp)
          $$this$buildString.a8(_Char___init__impl__6a9atx(43));
        else {
          $$this$buildString.z7(percentEncode(it));
        }
      }
      return Unit_instance;
    };
  }
  function encodeURLQueryComponent$lambda($spaceToPlus, $$this$buildString, $encodeFull) {
    return function (it) {
      var tmp = it;
      // Inline function 'kotlin.code' call
      var this_0 = _Char___init__impl__6a9atx(32);
      var tmp$ret$0 = Char__toInt_impl_vasixd(this_0);
      if (tmp === toByte(tmp$ret$0))
        if ($spaceToPlus)
          $$this$buildString.a8(_Char___init__impl__6a9atx(43));
        else
          $$this$buildString.z7('%20');
      else {
        if (get_URL_ALPHABET().r(it) || (!$encodeFull && get_URL_PROTOCOL_PART().r(it)))
          $$this$buildString.a8(numberToChar(it));
        else {
          $$this$buildString.z7(percentEncode(it));
        }
      }
      return Unit_instance;
    };
  }
  function forEach$lambda($block) {
    return function (buffer) {
      while (canRead(buffer)) {
        $block(buffer.g18());
      }
      return true;
    };
  }
  function encodeURLPath$lambda($$this$buildString) {
    return function (it) {
      $$this$buildString.z7(percentEncode(it));
      return Unit_instance;
    };
  }
  var properties_initialized_Codecs_kt_hkj9s1;
  function _init_properties_Codecs_kt__fudxxf() {
    if (!properties_initialized_Codecs_kt_hkj9s1) {
      properties_initialized_Codecs_kt_hkj9s1 = true;
      // Inline function 'kotlin.collections.map' call
      var this_0 = plus_0(plus(Char__rangeTo_impl_tkncvp(_Char___init__impl__6a9atx(97), _Char___init__impl__6a9atx(122)), Char__rangeTo_impl_tkncvp(_Char___init__impl__6a9atx(65), _Char___init__impl__6a9atx(90))), Char__rangeTo_impl_tkncvp(_Char___init__impl__6a9atx(48), _Char___init__impl__6a9atx(57)));
      // Inline function 'kotlin.collections.mapTo' call
      var destination = ArrayList_init_$Create$(collectionSizeOrDefault(this_0, 10));
      var _iterator__ex2g4s = this_0.g();
      while (_iterator__ex2g4s.h()) {
        var item = _iterator__ex2g4s.i();
        // Inline function 'kotlin.code' call
        var this_1 = item.k1_1;
        var tmp$ret$0 = Char__toInt_impl_vasixd(this_1);
        var tmp$ret$1 = toByte(tmp$ret$0);
        destination.e(tmp$ret$1);
      }
      URL_ALPHABET = toSet(destination);
      URL_ALPHABET_CHARS = toSet(plus_0(plus(Char__rangeTo_impl_tkncvp(_Char___init__impl__6a9atx(97), _Char___init__impl__6a9atx(122)), Char__rangeTo_impl_tkncvp(_Char___init__impl__6a9atx(65), _Char___init__impl__6a9atx(90))), Char__rangeTo_impl_tkncvp(_Char___init__impl__6a9atx(48), _Char___init__impl__6a9atx(57))));
      HEX_ALPHABET = toSet(plus_0(plus(Char__rangeTo_impl_tkncvp(_Char___init__impl__6a9atx(97), _Char___init__impl__6a9atx(102)), Char__rangeTo_impl_tkncvp(_Char___init__impl__6a9atx(65), _Char___init__impl__6a9atx(70))), Char__rangeTo_impl_tkncvp(_Char___init__impl__6a9atx(48), _Char___init__impl__6a9atx(57))));
      // Inline function 'kotlin.collections.map' call
      var this_2 = setOf([new Char(_Char___init__impl__6a9atx(58)), new Char(_Char___init__impl__6a9atx(47)), new Char(_Char___init__impl__6a9atx(63)), new Char(_Char___init__impl__6a9atx(35)), new Char(_Char___init__impl__6a9atx(91)), new Char(_Char___init__impl__6a9atx(93)), new Char(_Char___init__impl__6a9atx(64)), new Char(_Char___init__impl__6a9atx(33)), new Char(_Char___init__impl__6a9atx(36)), new Char(_Char___init__impl__6a9atx(38)), new Char(_Char___init__impl__6a9atx(39)), new Char(_Char___init__impl__6a9atx(40)), new Char(_Char___init__impl__6a9atx(41)), new Char(_Char___init__impl__6a9atx(42)), new Char(_Char___init__impl__6a9atx(44)), new Char(_Char___init__impl__6a9atx(59)), new Char(_Char___init__impl__6a9atx(61)), new Char(_Char___init__impl__6a9atx(45)), new Char(_Char___init__impl__6a9atx(46)), new Char(_Char___init__impl__6a9atx(95)), new Char(_Char___init__impl__6a9atx(126)), new Char(_Char___init__impl__6a9atx(43))]);
      // Inline function 'kotlin.collections.mapTo' call
      var destination_0 = ArrayList_init_$Create$(collectionSizeOrDefault(this_2, 10));
      var _iterator__ex2g4s_0 = this_2.g();
      while (_iterator__ex2g4s_0.h()) {
        var item_0 = _iterator__ex2g4s_0.i();
        // Inline function 'kotlin.code' call
        var this_3 = item_0.k1_1;
        var tmp$ret$0_0 = Char__toInt_impl_vasixd(this_3);
        var tmp$ret$1_0 = toByte(tmp$ret$0_0);
        destination_0.e(tmp$ret$1_0);
      }
      URL_PROTOCOL_PART = destination_0;
      VALID_PATH_PART = setOf([new Char(_Char___init__impl__6a9atx(58)), new Char(_Char___init__impl__6a9atx(64)), new Char(_Char___init__impl__6a9atx(33)), new Char(_Char___init__impl__6a9atx(36)), new Char(_Char___init__impl__6a9atx(38)), new Char(_Char___init__impl__6a9atx(39)), new Char(_Char___init__impl__6a9atx(40)), new Char(_Char___init__impl__6a9atx(41)), new Char(_Char___init__impl__6a9atx(42)), new Char(_Char___init__impl__6a9atx(43)), new Char(_Char___init__impl__6a9atx(44)), new Char(_Char___init__impl__6a9atx(59)), new Char(_Char___init__impl__6a9atx(61)), new Char(_Char___init__impl__6a9atx(45)), new Char(_Char___init__impl__6a9atx(46)), new Char(_Char___init__impl__6a9atx(95)), new Char(_Char___init__impl__6a9atx(126))]);
      ATTRIBUTE_CHARACTERS = plus_1(get_URL_ALPHABET_CHARS(), setOf([new Char(_Char___init__impl__6a9atx(33)), new Char(_Char___init__impl__6a9atx(35)), new Char(_Char___init__impl__6a9atx(36)), new Char(_Char___init__impl__6a9atx(38)), new Char(_Char___init__impl__6a9atx(43)), new Char(_Char___init__impl__6a9atx(45)), new Char(_Char___init__impl__6a9atx(46)), new Char(_Char___init__impl__6a9atx(94)), new Char(_Char___init__impl__6a9atx(95)), new Char(_Char___init__impl__6a9atx(96)), new Char(_Char___init__impl__6a9atx(124)), new Char(_Char___init__impl__6a9atx(126))]));
      // Inline function 'kotlin.collections.map' call
      var this_4 = listOf([new Char(_Char___init__impl__6a9atx(45)), new Char(_Char___init__impl__6a9atx(46)), new Char(_Char___init__impl__6a9atx(95)), new Char(_Char___init__impl__6a9atx(126))]);
      // Inline function 'kotlin.collections.mapTo' call
      var destination_1 = ArrayList_init_$Create$(collectionSizeOrDefault(this_4, 10));
      var _iterator__ex2g4s_1 = this_4.g();
      while (_iterator__ex2g4s_1.h()) {
        var item_1 = _iterator__ex2g4s_1.i();
        // Inline function 'kotlin.code' call
        var this_5 = item_1.k1_1;
        var tmp$ret$0_1 = Char__toInt_impl_vasixd(this_5);
        var tmp$ret$1_1 = toByte(tmp$ret$0_1);
        destination_1.e(tmp$ret$1_1);
      }
      SPECIAL_SYMBOLS = destination_1;
    }
  }
  function ContentType_init_$Init$(contentType, contentSubtype, parameters, $this) {
    parameters = parameters === VOID ? emptyList() : parameters;
    ContentType.call($this, contentType, contentSubtype, contentType + '/' + contentSubtype, parameters);
    return $this;
  }
  function ContentType_init_$Create$(contentType, contentSubtype, parameters) {
    return ContentType_init_$Init$(contentType, contentSubtype, parameters, objectCreate(protoOf(ContentType)));
  }
  function hasParameter($this, name, value) {
    var tmp;
    switch ($this.d2b_1.j()) {
      case 0:
        tmp = false;
        break;
      case 1:
        // Inline function 'kotlin.let' call

        var it = $this.d2b_1.o(0);
        tmp = (equals(it.e2b_1, name, true) && equals(it.f2b_1, value, true));
        break;
      default:
        var tmp2 = $this.d2b_1;
        var tmp$ret$2;
        $l$block_0: {
          // Inline function 'kotlin.collections.any' call
          var tmp_0;
          if (isInterface(tmp2, Collection)) {
            tmp_0 = tmp2.p();
          } else {
            tmp_0 = false;
          }
          if (tmp_0) {
            tmp$ret$2 = false;
            break $l$block_0;
          }
          var _iterator__ex2g4s = tmp2.g();
          while (_iterator__ex2g4s.h()) {
            var element = _iterator__ex2g4s.i();
            if (equals(element.e2b_1, name, true) && equals(element.f2b_1, value, true)) {
              tmp$ret$2 = true;
              break $l$block_0;
            }
          }
          tmp$ret$2 = false;
        }

        tmp = tmp$ret$2;
        break;
    }
    return tmp;
  }
  function Companion() {
    Companion_instance = this;
    this.h2b_1 = ContentType_init_$Create$('*', '*');
  }
  protoOf(Companion).zl = function (value) {
    if (isBlank(value))
      return this.h2b_1;
    // Inline function 'io.ktor.http.Companion.parse' call
    var headerValue = last(parseHeaderValue(value));
    var tmp2 = headerValue.i2b_1;
    var parameters = headerValue.j2b_1;
    var slash = indexOf(tmp2, _Char___init__impl__6a9atx(47));
    if (slash === -1) {
      // Inline function 'kotlin.text.trim' call
      if (toString(trim(isCharSequence(tmp2) ? tmp2 : THROW_CCE())) === '*')
        return Companion_getInstance().h2b_1;
      throw new BadContentTypeFormatException(value);
    }
    // Inline function 'kotlin.text.substring' call
    // Inline function 'kotlin.js.asDynamic' call
    // Inline function 'kotlin.text.trim' call
    var this_0 = tmp2.substring(0, slash);
    var type = toString(trim(isCharSequence(this_0) ? this_0 : THROW_CCE()));
    // Inline function 'kotlin.text.isEmpty' call
    if (charSequenceLength(type) === 0) {
      throw new BadContentTypeFormatException(value);
    }
    // Inline function 'kotlin.text.substring' call
    var startIndex = slash + 1 | 0;
    // Inline function 'kotlin.js.asDynamic' call
    // Inline function 'kotlin.text.trim' call
    var this_1 = tmp2.substring(startIndex);
    var subtype = toString(trim(isCharSequence(this_1) ? this_1 : THROW_CCE()));
    if (contains(type, _Char___init__impl__6a9atx(32)) || contains(subtype, _Char___init__impl__6a9atx(32))) {
      throw new BadContentTypeFormatException(value);
    }
    var tmp;
    // Inline function 'kotlin.text.isEmpty' call
    if (charSequenceLength(subtype) === 0) {
      tmp = true;
    } else {
      tmp = contains(subtype, _Char___init__impl__6a9atx(47));
    }
    if (tmp) {
      throw new BadContentTypeFormatException(value);
    }
    return ContentType_init_$Create$(type, subtype, parameters);
  };
  var Companion_instance;
  function Companion_getInstance() {
    if (Companion_instance == null)
      new Companion();
    return Companion_instance;
  }
  function Application() {
    Application_instance = this;
    this.l2b_1 = ContentType_init_$Create$('application', '*');
    this.m2b_1 = ContentType_init_$Create$('application', 'atom+xml');
    this.n2b_1 = ContentType_init_$Create$('application', 'cbor');
    this.o2b_1 = ContentType_init_$Create$('application', 'json');
    this.p2b_1 = ContentType_init_$Create$('application', 'hal+json');
    this.q2b_1 = ContentType_init_$Create$('application', 'javascript');
    this.r2b_1 = ContentType_init_$Create$('application', 'octet-stream');
    this.s2b_1 = ContentType_init_$Create$('application', 'rss+xml');
    this.t2b_1 = ContentType_init_$Create$('application', 'soap+xml');
    this.u2b_1 = ContentType_init_$Create$('application', 'xml');
    this.v2b_1 = ContentType_init_$Create$('application', 'xml-dtd');
    this.w2b_1 = ContentType_init_$Create$('application', 'zip');
    this.x2b_1 = ContentType_init_$Create$('application', 'gzip');
    this.y2b_1 = ContentType_init_$Create$('application', 'x-www-form-urlencoded');
    this.z2b_1 = ContentType_init_$Create$('application', 'pdf');
    this.a2c_1 = ContentType_init_$Create$('application', 'vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    this.b2c_1 = ContentType_init_$Create$('application', 'vnd.openxmlformats-officedocument.wordprocessingml.document');
    this.c2c_1 = ContentType_init_$Create$('application', 'vnd.openxmlformats-officedocument.presentationml.presentation');
    this.d2c_1 = ContentType_init_$Create$('application', 'protobuf');
    this.e2c_1 = ContentType_init_$Create$('application', 'wasm');
    this.f2c_1 = ContentType_init_$Create$('application', 'problem+json');
    this.g2c_1 = ContentType_init_$Create$('application', 'problem+xml');
  }
  var Application_instance;
  function Application_getInstance() {
    if (Application_instance == null)
      new Application();
    return Application_instance;
  }
  function Text() {
    Text_instance = this;
    this.h2c_1 = ContentType_init_$Create$('text', '*');
    this.i2c_1 = ContentType_init_$Create$('text', 'plain');
    this.j2c_1 = ContentType_init_$Create$('text', 'css');
    this.k2c_1 = ContentType_init_$Create$('text', 'csv');
    this.l2c_1 = ContentType_init_$Create$('text', 'html');
    this.m2c_1 = ContentType_init_$Create$('text', 'javascript');
    this.n2c_1 = ContentType_init_$Create$('text', 'vcard');
    this.o2c_1 = ContentType_init_$Create$('text', 'xml');
    this.p2c_1 = ContentType_init_$Create$('text', 'event-stream');
  }
  var Text_instance;
  function Text_getInstance() {
    if (Text_instance == null)
      new Text();
    return Text_instance;
  }
  function ContentType(contentType, contentSubtype, existingContent, parameters) {
    Companion_getInstance();
    parameters = parameters === VOID ? emptyList() : parameters;
    HeaderValueWithParameters.call(this, existingContent, parameters);
    this.s2c_1 = contentType;
    this.t2c_1 = contentSubtype;
  }
  protoOf(ContentType).u2c = function (name, value) {
    if (hasParameter(this, name, value))
      return this;
    return new ContentType(this.s2c_1, this.t2c_1, this.c2b_1, plus_2(this.d2b_1, HeaderValueParam_init_$Create$(name, value)));
  };
  protoOf(ContentType).equals = function (other) {
    var tmp;
    var tmp_0;
    var tmp_1;
    if (other instanceof ContentType) {
      tmp_1 = equals(this.s2c_1, other.s2c_1, true);
    } else {
      tmp_1 = false;
    }
    if (tmp_1) {
      tmp_0 = equals(this.t2c_1, other.t2c_1, true);
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      tmp = equals_0(this.d2b_1, other.d2b_1);
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(ContentType).hashCode = function () {
    // Inline function 'kotlin.text.lowercase' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp$ret$1 = this.s2c_1.toLowerCase();
    var result = getStringHashCode(tmp$ret$1);
    var tmp = result;
    var tmp_0 = imul(31, result);
    // Inline function 'kotlin.text.lowercase' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp$ret$3 = this.t2c_1.toLowerCase();
    result = tmp + (tmp_0 + getStringHashCode(tmp$ret$3) | 0) | 0;
    result = result + imul(31, hashCode(this.d2b_1)) | 0;
    return result;
  };
  function BadContentTypeFormatException(value) {
    Exception_init_$Init$('Bad Content-Type format: ' + value, this);
    captureStack(this, BadContentTypeFormatException);
  }
  function charset(_this__u8e3s4) {
    var tmp0_safe_receiver = _this__u8e3s4.v2c('charset');
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      var tmp_0;
      try {
        tmp_0 = forName(Charsets_getInstance(), tmp0_safe_receiver);
      } catch ($p) {
        var tmp_1;
        if ($p instanceof IllegalArgumentException) {
          var exception = $p;
          tmp_1 = null;
        } else {
          throw $p;
        }
        tmp_0 = tmp_1;
      }
      tmp = tmp_0;
    }
    return tmp;
  }
  function withCharset(_this__u8e3s4, charset) {
    return _this__u8e3s4.u2c('charset', get_name(charset));
  }
  function get_HeaderFieldValueSeparators() {
    _init_properties_HeaderValueWithParameters_kt__z6luvy();
    return HeaderFieldValueSeparators;
  }
  var HeaderFieldValueSeparators;
  function Companion_0() {
  }
  var Companion_instance_0;
  function Companion_getInstance_0() {
    return Companion_instance_0;
  }
  function HeaderValueWithParameters(content, parameters) {
    parameters = parameters === VOID ? emptyList() : parameters;
    this.c2b_1 = content;
    this.d2b_1 = parameters;
  }
  protoOf(HeaderValueWithParameters).v2c = function (name) {
    var inductionVariable = 0;
    var last = get_lastIndex(this.d2b_1);
    if (inductionVariable <= last)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var parameter = this.d2b_1.o(index);
        if (equals(parameter.e2b_1, name, true)) {
          return parameter.f2b_1;
        }
      }
       while (!(index === last));
    return null;
  };
  protoOf(HeaderValueWithParameters).toString = function () {
    var tmp;
    if (this.d2b_1.p()) {
      tmp = this.c2b_1;
    } else {
      var tmp_0 = this.c2b_1.length;
      // Inline function 'kotlin.collections.sumOf' call
      var sum = 0;
      var _iterator__ex2g4s = this.d2b_1.g();
      while (_iterator__ex2g4s.h()) {
        var element = _iterator__ex2g4s.i();
        var tmp_1 = sum;
        sum = tmp_1 + ((element.e2b_1.length + element.f2b_1.length | 0) + 3 | 0) | 0;
      }
      var size = tmp_0 + sum | 0;
      // Inline function 'kotlin.apply' call
      var this_0 = StringBuilder_init_$Create$_0(size);
      this_0.z7(this.c2b_1);
      var inductionVariable = 0;
      var last = get_lastIndex(this.d2b_1);
      if (inductionVariable <= last)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var element_0 = this.d2b_1.o(index);
          this_0.z7('; ');
          this_0.z7(element_0.e2b_1);
          this_0.z7('=');
          // Inline function 'io.ktor.http.escapeIfNeededTo' call
          var this_1 = element_0.f2b_1;
          if (needQuotes(this_1))
            this_0.z7(quote(this_1));
          else
            this_0.z7(this_1);
        }
         while (!(index === last));
      tmp = this_0.toString();
    }
    return tmp;
  };
  function needQuotes(_this__u8e3s4) {
    _init_properties_HeaderValueWithParameters_kt__z6luvy();
    // Inline function 'kotlin.text.isEmpty' call
    if (charSequenceLength(_this__u8e3s4) === 0)
      return true;
    if (isQuoted(_this__u8e3s4))
      return false;
    var inductionVariable = 0;
    var last = _this__u8e3s4.length;
    while (inductionVariable < last) {
      var element = charSequenceGet(_this__u8e3s4, inductionVariable);
      inductionVariable = inductionVariable + 1 | 0;
      if (get_HeaderFieldValueSeparators().r(new Char(element)))
        return true;
    }
    return false;
  }
  function quote(_this__u8e3s4) {
    _init_properties_HeaderValueWithParameters_kt__z6luvy();
    // Inline function 'kotlin.text.buildString' call
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$();
    quoteTo(_this__u8e3s4, this_0);
    return this_0.toString();
  }
  function isQuoted(_this__u8e3s4) {
    _init_properties_HeaderValueWithParameters_kt__z6luvy();
    if (_this__u8e3s4.length < 2) {
      return false;
    }
    if (!(first(_this__u8e3s4) === _Char___init__impl__6a9atx(34)) || !(last_0(_this__u8e3s4) === _Char___init__impl__6a9atx(34))) {
      return false;
    }
    var startIndex = 1;
    $l$loop: do {
      var index = indexOf(_this__u8e3s4, _Char___init__impl__6a9atx(34), startIndex);
      if (index === get_lastIndex_0(_this__u8e3s4)) {
        break $l$loop;
      }
      var slashesCount = 0;
      var slashIndex = index - 1 | 0;
      while (charSequenceGet(_this__u8e3s4, slashIndex) === _Char___init__impl__6a9atx(92)) {
        slashesCount = slashesCount + 1 | 0;
        slashIndex = slashIndex - 1 | 0;
      }
      if ((slashesCount % 2 | 0) === 0) {
        return false;
      }
      startIndex = index + 1 | 0;
    }
     while (startIndex < _this__u8e3s4.length);
    return true;
  }
  function quoteTo(_this__u8e3s4, out) {
    _init_properties_HeaderValueWithParameters_kt__z6luvy();
    out.z7('"');
    var inductionVariable = 0;
    var last = _this__u8e3s4.length;
    while (inductionVariable < last) {
      var element = charSequenceGet(_this__u8e3s4, inductionVariable);
      inductionVariable = inductionVariable + 1 | 0;
      var ch = element;
      if (ch === _Char___init__impl__6a9atx(92))
        out.z7('\\\\');
      else if (ch === _Char___init__impl__6a9atx(10))
        out.z7('\\n');
      else if (ch === _Char___init__impl__6a9atx(13))
        out.z7('\\r');
      else if (ch === _Char___init__impl__6a9atx(9))
        out.z7('\\t');
      else if (ch === _Char___init__impl__6a9atx(34))
        out.z7('\\"');
      else
        out.a8(ch);
    }
    out.z7('"');
  }
  var properties_initialized_HeaderValueWithParameters_kt_yu5xg;
  function _init_properties_HeaderValueWithParameters_kt__z6luvy() {
    if (!properties_initialized_HeaderValueWithParameters_kt_yu5xg) {
      properties_initialized_HeaderValueWithParameters_kt_yu5xg = true;
      HeaderFieldValueSeparators = setOf([new Char(_Char___init__impl__6a9atx(40)), new Char(_Char___init__impl__6a9atx(41)), new Char(_Char___init__impl__6a9atx(60)), new Char(_Char___init__impl__6a9atx(62)), new Char(_Char___init__impl__6a9atx(64)), new Char(_Char___init__impl__6a9atx(44)), new Char(_Char___init__impl__6a9atx(59)), new Char(_Char___init__impl__6a9atx(58)), new Char(_Char___init__impl__6a9atx(92)), new Char(_Char___init__impl__6a9atx(34)), new Char(_Char___init__impl__6a9atx(47)), new Char(_Char___init__impl__6a9atx(91)), new Char(_Char___init__impl__6a9atx(93)), new Char(_Char___init__impl__6a9atx(63)), new Char(_Char___init__impl__6a9atx(61)), new Char(_Char___init__impl__6a9atx(123)), new Char(_Char___init__impl__6a9atx(125)), new Char(_Char___init__impl__6a9atx(32)), new Char(_Char___init__impl__6a9atx(9)), new Char(_Char___init__impl__6a9atx(10)), new Char(_Char___init__impl__6a9atx(13))]);
    }
  }
  function Companion_1() {
    Companion_instance_1 = this;
    this.w2c_1 = EmptyHeaders_instance;
  }
  var Companion_instance_1;
  function Companion_getInstance_1() {
    if (Companion_instance_1 == null)
      new Companion_1();
    return Companion_instance_1;
  }
  function HeadersBuilder(size) {
    size = size === VOID ? 8 : size;
    StringValuesBuilderImpl.call(this, true, size);
  }
  protoOf(HeadersBuilder).z2c = function () {
    return new HeadersImpl(this.e27_1);
  };
  protoOf(HeadersBuilder).f27 = function (name) {
    protoOf(StringValuesBuilderImpl).f27.call(this, name);
    HttpHeaders_getInstance().w2g(name);
  };
  protoOf(HeadersBuilder).i27 = function (value) {
    protoOf(StringValuesBuilderImpl).i27.call(this, value);
    HttpHeaders_getInstance().x2g(value);
  };
  function EmptyHeaders() {
  }
  protoOf(EmptyHeaders).y26 = function () {
    return true;
  };
  protoOf(EmptyHeaders).z26 = function (name) {
    return null;
  };
  protoOf(EmptyHeaders).a27 = function () {
    return emptySet();
  };
  protoOf(EmptyHeaders).b27 = function () {
    return emptySet();
  };
  protoOf(EmptyHeaders).toString = function () {
    return 'Headers ' + toString(this.b27());
  };
  var EmptyHeaders_instance;
  function EmptyHeaders_getInstance() {
    return EmptyHeaders_instance;
  }
  function HeadersImpl(values) {
    values = values === VOID ? emptyMap() : values;
    StringValuesImpl.call(this, true, values);
  }
  protoOf(HeadersImpl).toString = function () {
    return 'Headers ' + toString(this.b27());
  };
  function HeaderValueParam_init_$Init$(name, value, $this) {
    HeaderValueParam.call($this, name, value, false);
    return $this;
  }
  function HeaderValueParam_init_$Create$(name, value) {
    return HeaderValueParam_init_$Init$(name, value, objectCreate(protoOf(HeaderValueParam)));
  }
  function HeaderValueParam(name, value, escapeValue) {
    this.e2b_1 = name;
    this.f2b_1 = value;
    this.g2b_1 = escapeValue;
  }
  protoOf(HeaderValueParam).equals = function (other) {
    var tmp;
    var tmp_0;
    if (other instanceof HeaderValueParam) {
      tmp_0 = equals(other.e2b_1, this.e2b_1, true);
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      tmp = equals(other.f2b_1, this.f2b_1, true);
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(HeaderValueParam).hashCode = function () {
    // Inline function 'kotlin.text.lowercase' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp$ret$1 = this.e2b_1.toLowerCase();
    var result = getStringHashCode(tmp$ret$1);
    var tmp = result;
    var tmp_0 = imul(31, result);
    // Inline function 'kotlin.text.lowercase' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp$ret$3 = this.f2b_1.toLowerCase();
    result = tmp + (tmp_0 + getStringHashCode(tmp$ret$3) | 0) | 0;
    return result;
  };
  protoOf(HeaderValueParam).toString = function () {
    return 'HeaderValueParam(name=' + this.e2b_1 + ', value=' + this.f2b_1 + ', escapeValue=' + this.g2b_1 + ')';
  };
  function HeaderValue(value, params) {
    params = params === VOID ? emptyList() : params;
    this.i2b_1 = value;
    this.j2b_1 = params;
    var tmp = this;
    var tmp0 = this.j2b_1;
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var _iterator__ex2g4s = tmp0.g();
      while (_iterator__ex2g4s.h()) {
        var element = _iterator__ex2g4s.i();
        if (element.e2b_1 === 'q') {
          tmp$ret$1 = element;
          break $l$block;
        }
      }
      tmp$ret$1 = null;
    }
    var tmp0_safe_receiver = tmp$ret$1;
    var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.f2b_1;
    var tmp2_safe_receiver = tmp1_safe_receiver == null ? null : toDoubleOrNull(tmp1_safe_receiver);
    var tmp_0;
    if (tmp2_safe_receiver == null) {
      tmp_0 = null;
    } else {
      // Inline function 'kotlin.takeIf' call
      var tmp_1;
      if (0.0 <= tmp2_safe_receiver ? tmp2_safe_receiver <= 1.0 : false) {
        tmp_1 = tmp2_safe_receiver;
      } else {
        tmp_1 = null;
      }
      tmp_0 = tmp_1;
    }
    var tmp3_elvis_lhs = tmp_0;
    tmp.k2b_1 = tmp3_elvis_lhs == null ? 1.0 : tmp3_elvis_lhs;
  }
  protoOf(HeaderValue).toString = function () {
    return 'HeaderValue(value=' + this.i2b_1 + ', params=' + toString(this.j2b_1) + ')';
  };
  protoOf(HeaderValue).hashCode = function () {
    var result = getStringHashCode(this.i2b_1);
    result = imul(result, 31) + hashCode(this.j2b_1) | 0;
    return result;
  };
  protoOf(HeaderValue).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof HeaderValue))
      return false;
    var tmp0_other_with_cast = other instanceof HeaderValue ? other : THROW_CCE();
    if (!(this.i2b_1 === tmp0_other_with_cast.i2b_1))
      return false;
    if (!equals_0(this.j2b_1, tmp0_other_with_cast.j2b_1))
      return false;
    return true;
  };
  function parseHeaderValue(text) {
    return parseHeaderValue_0(text, false);
  }
  function parseHeaderValue_0(text, parametersOnly) {
    if (text == null) {
      return emptyList();
    }
    var position = 0;
    var tmp = LazyThreadSafetyMode_NONE_getInstance();
    var items = lazy(tmp, parseHeaderValue$lambda);
    while (position <= get_lastIndex_0(text)) {
      position = parseHeaderValueItem(text, position, items, parametersOnly);
    }
    return valueOrEmpty(items);
  }
  function parseHeaderValueItem(text, start, items, parametersOnly) {
    var position = start;
    var tmp = LazyThreadSafetyMode_NONE_getInstance();
    var parameters = lazy(tmp, parseHeaderValueItem$lambda);
    var valueEnd = parametersOnly ? position : null;
    while (position <= get_lastIndex_0(text)) {
      var tmp0_subject = charSequenceGet(text, position);
      if (tmp0_subject === _Char___init__impl__6a9atx(44)) {
        var tmp_0 = items.w();
        var tmp1_elvis_lhs = valueEnd;
        tmp_0.e(new HeaderValue(subtrim(text, start, tmp1_elvis_lhs == null ? position : tmp1_elvis_lhs), valueOrEmpty(parameters)));
        return position + 1 | 0;
      } else if (tmp0_subject === _Char___init__impl__6a9atx(59)) {
        if (valueEnd == null)
          valueEnd = position;
        position = parseHeaderValueParameter(text, position + 1 | 0, parameters);
      } else {
        var tmp_1;
        if (parametersOnly) {
          tmp_1 = parseHeaderValueParameter(text, position, parameters);
        } else {
          tmp_1 = position + 1 | 0;
        }
        position = tmp_1;
      }
    }
    var tmp_2 = items.w();
    var tmp2_elvis_lhs = valueEnd;
    tmp_2.e(new HeaderValue(subtrim(text, start, tmp2_elvis_lhs == null ? position : tmp2_elvis_lhs), valueOrEmpty(parameters)));
    return position;
  }
  function valueOrEmpty(_this__u8e3s4) {
    return _this__u8e3s4.sl() ? _this__u8e3s4.w() : emptyList();
  }
  function subtrim(_this__u8e3s4, start, end) {
    // Inline function 'kotlin.text.substring' call
    // Inline function 'kotlin.js.asDynamic' call
    // Inline function 'kotlin.text.trim' call
    var this_0 = _this__u8e3s4.substring(start, end);
    return toString(trim(isCharSequence(this_0) ? this_0 : THROW_CCE()));
  }
  function parseHeaderValueParameter(text, start, parameters) {
    var position = start;
    while (position <= get_lastIndex_0(text)) {
      var tmp0_subject = charSequenceGet(text, position);
      if (tmp0_subject === _Char___init__impl__6a9atx(61)) {
        var _destruct__k2r9zo = parseHeaderValueParameterValue(text, position + 1 | 0);
        var paramEnd = _destruct__k2r9zo.gg();
        var paramValue = _destruct__k2r9zo.hg();
        parseHeaderValueParameter$addParam(parameters, text, start, position, paramValue);
        return paramEnd;
      } else if (tmp0_subject === _Char___init__impl__6a9atx(59) || tmp0_subject === _Char___init__impl__6a9atx(44)) {
        parseHeaderValueParameter$addParam(parameters, text, start, position, '');
        return position;
      } else {
        position = position + 1 | 0;
      }
    }
    parseHeaderValueParameter$addParam(parameters, text, start, position, '');
    return position;
  }
  function parseHeaderValueParameterValue(value, start) {
    if (value.length === start) {
      return to(start, '');
    }
    var position = start;
    if (charSequenceGet(value, start) === _Char___init__impl__6a9atx(34)) {
      return parseHeaderValueParameterValueQuoted(value, position + 1 | 0);
    }
    while (position <= get_lastIndex_0(value)) {
      var tmp0_subject = charSequenceGet(value, position);
      if (tmp0_subject === _Char___init__impl__6a9atx(59) || tmp0_subject === _Char___init__impl__6a9atx(44))
        return to(position, subtrim(value, start, position));
      else {
        position = position + 1 | 0;
      }
    }
    return to(position, subtrim(value, start, position));
  }
  function parseHeaderValueParameterValueQuoted(value, start) {
    var position = start;
    var builder = StringBuilder_init_$Create$();
    loop: while (position <= get_lastIndex_0(value)) {
      var currentChar = charSequenceGet(value, position);
      if (currentChar === _Char___init__impl__6a9atx(34) && nextIsSemicolonOrEnd(value, position)) {
        return to(position + 1 | 0, builder.toString());
      } else if (currentChar === _Char___init__impl__6a9atx(92) && position < (get_lastIndex_0(value) - 2 | 0)) {
        builder.a8(charSequenceGet(value, position + 1 | 0));
        position = position + 2 | 0;
        continue loop;
      }
      builder.a8(currentChar);
      position = position + 1 | 0;
    }
    var tmp = position;
    var tmp0 = _Char___init__impl__6a9atx(34);
    // Inline function 'kotlin.text.plus' call
    var other = builder.toString();
    var tmp$ret$0 = toString_0(tmp0) + other;
    return to(tmp, tmp$ret$0);
  }
  function nextIsSemicolonOrEnd(_this__u8e3s4, start) {
    var position = start + 1 | 0;
    loop: while (position < _this__u8e3s4.length && charSequenceGet(_this__u8e3s4, position) === _Char___init__impl__6a9atx(32)) {
      position = position + 1 | 0;
    }
    return position === _this__u8e3s4.length || charSequenceGet(_this__u8e3s4, position) === _Char___init__impl__6a9atx(59);
  }
  function parseHeaderValueParameter$addParam($parameters, text, start, end, value) {
    var name = subtrim(text, start, end);
    // Inline function 'kotlin.text.isEmpty' call
    if (charSequenceLength(name) === 0) {
      return Unit_instance;
    }
    $parameters.w().e(HeaderValueParam_init_$Create$(name, value));
  }
  function parseHeaderValue$lambda() {
    // Inline function 'kotlin.collections.arrayListOf' call
    return ArrayList_init_$Create$_0();
  }
  function parseHeaderValueItem$lambda() {
    // Inline function 'kotlin.collections.arrayListOf' call
    return ArrayList_init_$Create$_0();
  }
  function HttpHeaders() {
    HttpHeaders_instance = this;
    this.a2d_1 = 'Accept';
    this.b2d_1 = 'Accept-Charset';
    this.c2d_1 = 'Accept-Encoding';
    this.d2d_1 = 'Accept-Language';
    this.e2d_1 = 'Accept-Ranges';
    this.f2d_1 = 'Age';
    this.g2d_1 = 'Allow';
    this.h2d_1 = 'ALPN';
    this.i2d_1 = 'Authentication-Info';
    this.j2d_1 = 'Authorization';
    this.k2d_1 = 'Cache-Control';
    this.l2d_1 = 'Connection';
    this.m2d_1 = 'Content-Disposition';
    this.n2d_1 = 'Content-Encoding';
    this.o2d_1 = 'Content-Language';
    this.p2d_1 = 'Content-Length';
    this.q2d_1 = 'Content-Location';
    this.r2d_1 = 'Content-Range';
    this.s2d_1 = 'Content-Type';
    this.t2d_1 = 'Cookie';
    this.u2d_1 = 'DASL';
    this.v2d_1 = 'Date';
    this.w2d_1 = 'DAV';
    this.x2d_1 = 'Depth';
    this.y2d_1 = 'Destination';
    this.z2d_1 = 'ETag';
    this.a2e_1 = 'Expect';
    this.b2e_1 = 'Expires';
    this.c2e_1 = 'From';
    this.d2e_1 = 'Forwarded';
    this.e2e_1 = 'Host';
    this.f2e_1 = 'HTTP2-Settings';
    this.g2e_1 = 'If';
    this.h2e_1 = 'If-Match';
    this.i2e_1 = 'If-Modified-Since';
    this.j2e_1 = 'If-None-Match';
    this.k2e_1 = 'If-Range';
    this.l2e_1 = 'If-Schedule-Tag-Match';
    this.m2e_1 = 'If-Unmodified-Since';
    this.n2e_1 = 'Last-Modified';
    this.o2e_1 = 'Location';
    this.p2e_1 = 'Lock-Token';
    this.q2e_1 = 'Link';
    this.r2e_1 = 'Max-Forwards';
    this.s2e_1 = 'MIME-Version';
    this.t2e_1 = 'Ordering-Type';
    this.u2e_1 = 'Origin';
    this.v2e_1 = 'Overwrite';
    this.w2e_1 = 'Position';
    this.x2e_1 = 'Pragma';
    this.y2e_1 = 'Prefer';
    this.z2e_1 = 'Preference-Applied';
    this.a2f_1 = 'Proxy-Authenticate';
    this.b2f_1 = 'Proxy-Authentication-Info';
    this.c2f_1 = 'Proxy-Authorization';
    this.d2f_1 = 'Public-Key-Pins';
    this.e2f_1 = 'Public-Key-Pins-Report-Only';
    this.f2f_1 = 'Range';
    this.g2f_1 = 'Referer';
    this.h2f_1 = 'Retry-After';
    this.i2f_1 = 'Schedule-Reply';
    this.j2f_1 = 'Schedule-Tag';
    this.k2f_1 = 'Sec-WebSocket-Accept';
    this.l2f_1 = 'Sec-WebSocket-Extensions';
    this.m2f_1 = 'Sec-WebSocket-Key';
    this.n2f_1 = 'Sec-WebSocket-Protocol';
    this.o2f_1 = 'Sec-WebSocket-Version';
    this.p2f_1 = 'Server';
    this.q2f_1 = 'Set-Cookie';
    this.r2f_1 = 'SLUG';
    this.s2f_1 = 'Strict-Transport-Security';
    this.t2f_1 = 'TE';
    this.u2f_1 = 'Timeout';
    this.v2f_1 = 'Trailer';
    this.w2f_1 = 'Transfer-Encoding';
    this.x2f_1 = 'Upgrade';
    this.y2f_1 = 'User-Agent';
    this.z2f_1 = 'Vary';
    this.a2g_1 = 'Via';
    this.b2g_1 = 'Warning';
    this.c2g_1 = 'WWW-Authenticate';
    this.d2g_1 = 'Access-Control-Allow-Origin';
    this.e2g_1 = 'Access-Control-Allow-Methods';
    this.f2g_1 = 'Access-Control-Allow-Credentials';
    this.g2g_1 = 'Access-Control-Allow-Headers';
    this.h2g_1 = 'Access-Control-Request-Method';
    this.i2g_1 = 'Access-Control-Request-Headers';
    this.j2g_1 = 'Access-Control-Expose-Headers';
    this.k2g_1 = 'Access-Control-Max-Age';
    this.l2g_1 = 'X-Http-Method-Override';
    this.m2g_1 = 'X-Forwarded-Host';
    this.n2g_1 = 'X-Forwarded-Server';
    this.o2g_1 = 'X-Forwarded-Proto';
    this.p2g_1 = 'X-Forwarded-For';
    this.q2g_1 = 'X-Forwarded-Port';
    this.r2g_1 = 'X-Request-ID';
    this.s2g_1 = 'X-Correlation-ID';
    this.t2g_1 = 'X-Total-Count';
    var tmp = this;
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    tmp.u2g_1 = [this.w2f_1, this.x2f_1];
    this.v2g_1 = asList(this.u2g_1);
  }
  protoOf(HttpHeaders).w2g = function (name) {
    // Inline function 'kotlin.text.forEachIndexed' call
    var index = 0;
    var inductionVariable = 0;
    while (inductionVariable < charSequenceLength(name)) {
      var item = charSequenceGet(name, inductionVariable);
      inductionVariable = inductionVariable + 1 | 0;
      var _unary__edvuaz = index;
      index = _unary__edvuaz + 1 | 0;
      if (Char__compareTo_impl_ypi4mb(item, _Char___init__impl__6a9atx(32)) <= 0 || isDelimiter(item)) {
        throw new IllegalHeaderNameException(name, _unary__edvuaz);
      }
    }
  };
  protoOf(HttpHeaders).x2g = function (value) {
    // Inline function 'kotlin.text.forEachIndexed' call
    var index = 0;
    var inductionVariable = 0;
    while (inductionVariable < charSequenceLength(value)) {
      var item = charSequenceGet(value, inductionVariable);
      inductionVariable = inductionVariable + 1 | 0;
      var _unary__edvuaz = index;
      index = _unary__edvuaz + 1 | 0;
      if (Char__compareTo_impl_ypi4mb(item, _Char___init__impl__6a9atx(32)) < 0 && !(item === _Char___init__impl__6a9atx(9))) {
        throw new IllegalHeaderValueException(value, _unary__edvuaz);
      }
    }
  };
  var HttpHeaders_instance;
  function HttpHeaders_getInstance() {
    if (HttpHeaders_instance == null)
      new HttpHeaders();
    return HttpHeaders_instance;
  }
  function isDelimiter(ch) {
    return contains('"(),/:;<=>?@[\\]{}', ch);
  }
  function IllegalHeaderNameException(headerName, position) {
    var tmp = "Header name '" + headerName + "' contains illegal character '" + toString_0(charSequenceGet(headerName, position)) + "'";
    // Inline function 'kotlin.code' call
    var this_0 = charSequenceGet(headerName, position);
    var tmp$ret$0 = Char__toInt_impl_vasixd(this_0);
    IllegalArgumentException_init_$Init$(tmp + (' (code ' + (tmp$ret$0 & 255) + ')'), this);
    captureStack(this, IllegalHeaderNameException);
    this.y2g_1 = headerName;
    this.z2g_1 = position;
  }
  function IllegalHeaderValueException(headerValue, position) {
    var tmp = "Header value '" + headerValue + "' contains illegal character '" + toString_0(charSequenceGet(headerValue, position)) + "'";
    // Inline function 'kotlin.code' call
    var this_0 = charSequenceGet(headerValue, position);
    var tmp$ret$0 = Char__toInt_impl_vasixd(this_0);
    IllegalArgumentException_init_$Init$(tmp + (' (code ' + (tmp$ret$0 & 255) + ')'), this);
    captureStack(this, IllegalHeaderValueException);
    this.a2h_1 = headerValue;
    this.b2h_1 = position;
  }
  function UnsafeHeaderException(header) {
    IllegalArgumentException_init_$Init$('Header(s) ' + header + ' are controlled by the engine and ' + 'cannot be set explicitly', this);
    captureStack(this, UnsafeHeaderException);
  }
  function contentLength(_this__u8e3s4) {
    var tmp0_safe_receiver = _this__u8e3s4.c2h().yd(HttpHeaders_getInstance().p2d_1);
    return tmp0_safe_receiver == null ? null : toLong(tmp0_safe_receiver);
  }
  function charset_0(_this__u8e3s4) {
    var tmp0_safe_receiver = contentType_1(_this__u8e3s4);
    return tmp0_safe_receiver == null ? null : charset(tmp0_safe_receiver);
  }
  function contentType(_this__u8e3s4) {
    var tmp0_safe_receiver = _this__u8e3s4.c2h().yd(HttpHeaders_getInstance().s2d_1);
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      tmp = Companion_getInstance().zl(tmp0_safe_receiver);
    }
    return tmp;
  }
  function contentType_0(_this__u8e3s4, type) {
    return _this__u8e3s4.c2h().h27(HttpHeaders_getInstance().s2d_1, type.toString());
  }
  function contentType_1(_this__u8e3s4) {
    var tmp0_safe_receiver = _this__u8e3s4.c2h().yd(HttpHeaders_getInstance().s2d_1);
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      tmp = Companion_getInstance().zl(tmp0_safe_receiver);
    }
    return tmp;
  }
  function Companion_2() {
    Companion_instance_2 = this;
    this.d2h_1 = new HttpMethod('GET');
    this.e2h_1 = new HttpMethod('POST');
    this.f2h_1 = new HttpMethod('PUT');
    this.g2h_1 = new HttpMethod('PATCH');
    this.h2h_1 = new HttpMethod('DELETE');
    this.i2h_1 = new HttpMethod('HEAD');
    this.j2h_1 = new HttpMethod('OPTIONS');
    this.k2h_1 = listOf([this.d2h_1, this.e2h_1, this.f2h_1, this.g2h_1, this.h2h_1, this.i2h_1, this.j2h_1]);
  }
  var Companion_instance_2;
  function Companion_getInstance_2() {
    if (Companion_instance_2 == null)
      new Companion_2();
    return Companion_instance_2;
  }
  function HttpMethod(value) {
    Companion_getInstance_2();
    this.l2h_1 = value;
  }
  protoOf(HttpMethod).toString = function () {
    return 'HttpMethod(value=' + this.l2h_1 + ')';
  };
  protoOf(HttpMethod).hashCode = function () {
    return getStringHashCode(this.l2h_1);
  };
  protoOf(HttpMethod).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof HttpMethod))
      return false;
    var tmp0_other_with_cast = other instanceof HttpMethod ? other : THROW_CCE();
    if (!(this.l2h_1 === tmp0_other_with_cast.l2h_1))
      return false;
    return true;
  };
  function Companion_3() {
    Companion_instance_3 = this;
    this.m2h_1 = new HttpProtocolVersion('HTTP', 2, 0);
    this.n2h_1 = new HttpProtocolVersion('HTTP', 1, 1);
    this.o2h_1 = new HttpProtocolVersion('HTTP', 1, 0);
    this.p2h_1 = new HttpProtocolVersion('SPDY', 3, 0);
    this.q2h_1 = new HttpProtocolVersion('QUIC', 1, 0);
  }
  var Companion_instance_3;
  function Companion_getInstance_3() {
    if (Companion_instance_3 == null)
      new Companion_3();
    return Companion_instance_3;
  }
  function HttpProtocolVersion(name, major, minor) {
    Companion_getInstance_3();
    this.r2h_1 = name;
    this.s2h_1 = major;
    this.t2h_1 = minor;
  }
  protoOf(HttpProtocolVersion).toString = function () {
    return this.r2h_1 + '/' + this.s2h_1 + '.' + this.t2h_1;
  };
  protoOf(HttpProtocolVersion).hashCode = function () {
    var result = getStringHashCode(this.r2h_1);
    result = imul(result, 31) + this.s2h_1 | 0;
    result = imul(result, 31) + this.t2h_1 | 0;
    return result;
  };
  protoOf(HttpProtocolVersion).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof HttpProtocolVersion))
      return false;
    var tmp0_other_with_cast = other instanceof HttpProtocolVersion ? other : THROW_CCE();
    if (!(this.r2h_1 === tmp0_other_with_cast.r2h_1))
      return false;
    if (!(this.s2h_1 === tmp0_other_with_cast.s2h_1))
      return false;
    if (!(this.t2h_1 === tmp0_other_with_cast.t2h_1))
      return false;
    return true;
  };
  function Companion_4() {
    Companion_instance_4 = this;
    this.u2h_1 = new HttpStatusCode(100, 'Continue');
    this.v2h_1 = new HttpStatusCode(101, 'Switching Protocols');
    this.w2h_1 = new HttpStatusCode(102, 'Processing');
    this.x2h_1 = new HttpStatusCode(200, 'OK');
    this.y2h_1 = new HttpStatusCode(201, 'Created');
    this.z2h_1 = new HttpStatusCode(202, 'Accepted');
    this.a2i_1 = new HttpStatusCode(203, 'Non-Authoritative Information');
    this.b2i_1 = new HttpStatusCode(204, 'No Content');
    this.c2i_1 = new HttpStatusCode(205, 'Reset Content');
    this.d2i_1 = new HttpStatusCode(206, 'Partial Content');
    this.e2i_1 = new HttpStatusCode(207, 'Multi-Status');
    this.f2i_1 = new HttpStatusCode(300, 'Multiple Choices');
    this.g2i_1 = new HttpStatusCode(301, 'Moved Permanently');
    this.h2i_1 = new HttpStatusCode(302, 'Found');
    this.i2i_1 = new HttpStatusCode(303, 'See Other');
    this.j2i_1 = new HttpStatusCode(304, 'Not Modified');
    this.k2i_1 = new HttpStatusCode(305, 'Use Proxy');
    this.l2i_1 = new HttpStatusCode(306, 'Switch Proxy');
    this.m2i_1 = new HttpStatusCode(307, 'Temporary Redirect');
    this.n2i_1 = new HttpStatusCode(308, 'Permanent Redirect');
    this.o2i_1 = new HttpStatusCode(400, 'Bad Request');
    this.p2i_1 = new HttpStatusCode(401, 'Unauthorized');
    this.q2i_1 = new HttpStatusCode(402, 'Payment Required');
    this.r2i_1 = new HttpStatusCode(403, 'Forbidden');
    this.s2i_1 = new HttpStatusCode(404, 'Not Found');
    this.t2i_1 = new HttpStatusCode(405, 'Method Not Allowed');
    this.u2i_1 = new HttpStatusCode(406, 'Not Acceptable');
    this.v2i_1 = new HttpStatusCode(407, 'Proxy Authentication Required');
    this.w2i_1 = new HttpStatusCode(408, 'Request Timeout');
    this.x2i_1 = new HttpStatusCode(409, 'Conflict');
    this.y2i_1 = new HttpStatusCode(410, 'Gone');
    this.z2i_1 = new HttpStatusCode(411, 'Length Required');
    this.a2j_1 = new HttpStatusCode(412, 'Precondition Failed');
    this.b2j_1 = new HttpStatusCode(413, 'Payload Too Large');
    this.c2j_1 = new HttpStatusCode(414, 'Request-URI Too Long');
    this.d2j_1 = new HttpStatusCode(415, 'Unsupported Media Type');
    this.e2j_1 = new HttpStatusCode(416, 'Requested Range Not Satisfiable');
    this.f2j_1 = new HttpStatusCode(417, 'Expectation Failed');
    this.g2j_1 = new HttpStatusCode(422, 'Unprocessable Entity');
    this.h2j_1 = new HttpStatusCode(423, 'Locked');
    this.i2j_1 = new HttpStatusCode(424, 'Failed Dependency');
    this.j2j_1 = new HttpStatusCode(425, 'Too Early');
    this.k2j_1 = new HttpStatusCode(426, 'Upgrade Required');
    this.l2j_1 = new HttpStatusCode(429, 'Too Many Requests');
    this.m2j_1 = new HttpStatusCode(431, 'Request Header Fields Too Large');
    this.n2j_1 = new HttpStatusCode(500, 'Internal Server Error');
    this.o2j_1 = new HttpStatusCode(501, 'Not Implemented');
    this.p2j_1 = new HttpStatusCode(502, 'Bad Gateway');
    this.q2j_1 = new HttpStatusCode(503, 'Service Unavailable');
    this.r2j_1 = new HttpStatusCode(504, 'Gateway Timeout');
    this.s2j_1 = new HttpStatusCode(505, 'HTTP Version Not Supported');
    this.t2j_1 = new HttpStatusCode(506, 'Variant Also Negotiates');
    this.u2j_1 = new HttpStatusCode(507, 'Insufficient Storage');
    this.v2j_1 = allStatusCodes();
    var tmp = this;
    // Inline function 'kotlin.collections.associateBy' call
    var this_0 = this.v2j_1;
    var capacity = coerceAtLeast(mapCapacity(collectionSizeOrDefault(this_0, 10)), 16);
    // Inline function 'kotlin.collections.associateByTo' call
    var destination = LinkedHashMap_init_$Create$(capacity);
    var _iterator__ex2g4s = this_0.g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      var tmp$ret$0 = element.x2j_1;
      destination.h2(tmp$ret$0, element);
    }
    tmp.w2j_1 = destination;
  }
  var Companion_instance_4;
  function Companion_getInstance_4() {
    if (Companion_instance_4 == null)
      new Companion_4();
    return Companion_instance_4;
  }
  function HttpStatusCode(value, description) {
    Companion_getInstance_4();
    this.x2j_1 = value;
    this.y2j_1 = description;
  }
  protoOf(HttpStatusCode).toString = function () {
    return '' + this.x2j_1 + ' ' + this.y2j_1;
  };
  protoOf(HttpStatusCode).equals = function (other) {
    var tmp;
    if (other instanceof HttpStatusCode) {
      tmp = other.x2j_1 === this.x2j_1;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(HttpStatusCode).hashCode = function () {
    return this.x2j_1;
  };
  protoOf(HttpStatusCode).z2j = function (other) {
    return this.x2j_1 - other.x2j_1 | 0;
  };
  protoOf(HttpStatusCode).d = function (other) {
    return this.z2j(other instanceof HttpStatusCode ? other : THROW_CCE());
  };
  function allStatusCodes() {
    return listOf([Companion_getInstance_4().u2h_1, Companion_getInstance_4().v2h_1, Companion_getInstance_4().w2h_1, Companion_getInstance_4().x2h_1, Companion_getInstance_4().y2h_1, Companion_getInstance_4().z2h_1, Companion_getInstance_4().a2i_1, Companion_getInstance_4().b2i_1, Companion_getInstance_4().c2i_1, Companion_getInstance_4().d2i_1, Companion_getInstance_4().e2i_1, Companion_getInstance_4().f2i_1, Companion_getInstance_4().g2i_1, Companion_getInstance_4().h2i_1, Companion_getInstance_4().i2i_1, Companion_getInstance_4().j2i_1, Companion_getInstance_4().k2i_1, Companion_getInstance_4().l2i_1, Companion_getInstance_4().m2i_1, Companion_getInstance_4().n2i_1, Companion_getInstance_4().o2i_1, Companion_getInstance_4().p2i_1, Companion_getInstance_4().q2i_1, Companion_getInstance_4().r2i_1, Companion_getInstance_4().s2i_1, Companion_getInstance_4().t2i_1, Companion_getInstance_4().u2i_1, Companion_getInstance_4().v2i_1, Companion_getInstance_4().w2i_1, Companion_getInstance_4().x2i_1, Companion_getInstance_4().y2i_1, Companion_getInstance_4().z2i_1, Companion_getInstance_4().a2j_1, Companion_getInstance_4().b2j_1, Companion_getInstance_4().c2j_1, Companion_getInstance_4().d2j_1, Companion_getInstance_4().e2j_1, Companion_getInstance_4().f2j_1, Companion_getInstance_4().g2j_1, Companion_getInstance_4().h2j_1, Companion_getInstance_4().i2j_1, Companion_getInstance_4().j2j_1, Companion_getInstance_4().k2j_1, Companion_getInstance_4().l2j_1, Companion_getInstance_4().m2j_1, Companion_getInstance_4().n2j_1, Companion_getInstance_4().o2j_1, Companion_getInstance_4().p2j_1, Companion_getInstance_4().q2j_1, Companion_getInstance_4().r2j_1, Companion_getInstance_4().s2j_1, Companion_getInstance_4().t2j_1, Companion_getInstance_4().u2j_1]);
  }
  function Companion_5() {
    Companion_instance_5 = this;
    this.a2k_1 = EmptyParameters_instance;
  }
  var Companion_instance_5;
  function Companion_getInstance_5() {
    if (Companion_instance_5 == null)
      new Companion_5();
    return Companion_instance_5;
  }
  function Parameters() {
  }
  function EmptyParameters() {
  }
  protoOf(EmptyParameters).y26 = function () {
    return true;
  };
  protoOf(EmptyParameters).z26 = function (name) {
    return null;
  };
  protoOf(EmptyParameters).a27 = function () {
    return emptySet();
  };
  protoOf(EmptyParameters).b27 = function () {
    return emptySet();
  };
  protoOf(EmptyParameters).p = function () {
    return true;
  };
  protoOf(EmptyParameters).toString = function () {
    return 'Parameters ' + toString(this.b27());
  };
  protoOf(EmptyParameters).equals = function (other) {
    var tmp;
    if (!(other == null) ? isInterface(other, Parameters) : false) {
      tmp = other.p();
    } else {
      tmp = false;
    }
    return tmp;
  };
  var EmptyParameters_instance;
  function EmptyParameters_getInstance() {
    return EmptyParameters_instance;
  }
  function ParametersBuilder(size) {
    size = size === VOID ? 8 : size;
    return new ParametersBuilderImpl(size);
  }
  function ParametersBuilderImpl(size) {
    size = size === VOID ? 8 : size;
    StringValuesBuilderImpl.call(this, true, size);
  }
  protoOf(ParametersBuilderImpl).z2c = function () {
    return new ParametersImpl(this.e27_1);
  };
  function ParametersImpl(values) {
    values = values === VOID ? emptyMap() : values;
    StringValuesImpl.call(this, true, values);
  }
  protoOf(ParametersImpl).toString = function () {
    return 'Parameters ' + toString(this.b27());
  };
  function parseQueryString(query, startIndex, limit, decode) {
    startIndex = startIndex === VOID ? 0 : startIndex;
    limit = limit === VOID ? 1000 : limit;
    decode = decode === VOID ? true : decode;
    var tmp;
    if (startIndex > get_lastIndex_0(query)) {
      tmp = Companion_getInstance_5().a2k_1;
    } else {
      // Inline function 'io.ktor.http.Companion.build' call
      Companion_getInstance_5();
      // Inline function 'kotlin.apply' call
      var this_0 = ParametersBuilder();
      parse(this_0, query, startIndex, limit, decode);
      tmp = this_0.z2c();
    }
    return tmp;
  }
  function parse(_this__u8e3s4, query, startIndex, limit, decode) {
    var count = 0;
    var nameIndex = startIndex;
    var equalIndex = -1;
    var inductionVariable = startIndex;
    var last = get_lastIndex_0(query);
    if (inductionVariable <= last)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        if (count === limit) {
          return Unit_instance;
        }
        var tmp0_subject = charSequenceGet(query, index);
        if (tmp0_subject === _Char___init__impl__6a9atx(38)) {
          appendParam(_this__u8e3s4, query, nameIndex, equalIndex, index, decode);
          nameIndex = index + 1 | 0;
          equalIndex = -1;
          count = count + 1 | 0;
        } else if (tmp0_subject === _Char___init__impl__6a9atx(61)) {
          if (equalIndex === -1) {
            equalIndex = index;
          }
        }
      }
       while (!(index === last));
    if (count === limit) {
      return Unit_instance;
    }
    appendParam(_this__u8e3s4, query, nameIndex, equalIndex, query.length, decode);
  }
  function appendParam(_this__u8e3s4, query, nameIndex, equalIndex, endIndex, decode) {
    if (equalIndex === -1) {
      var spaceNameIndex = trimStart(nameIndex, endIndex, query);
      var spaceEndIndex = trimEnd(spaceNameIndex, endIndex, query);
      if (spaceEndIndex > spaceNameIndex) {
        var tmp;
        if (decode) {
          tmp = decodeURLQueryComponent(query, spaceNameIndex, spaceEndIndex);
        } else {
          // Inline function 'kotlin.text.substring' call
          // Inline function 'kotlin.js.asDynamic' call
          tmp = query.substring(spaceNameIndex, spaceEndIndex);
        }
        var name = tmp;
        _this__u8e3s4.g27(name, emptyList());
      }
      return Unit_instance;
    }
    var spaceNameIndex_0 = trimStart(nameIndex, equalIndex, query);
    var spaceEqualIndex = trimEnd(spaceNameIndex_0, equalIndex, query);
    if (spaceEqualIndex > spaceNameIndex_0) {
      var tmp_0;
      if (decode) {
        tmp_0 = decodeURLQueryComponent(query, spaceNameIndex_0, spaceEqualIndex);
      } else {
        // Inline function 'kotlin.text.substring' call
        // Inline function 'kotlin.js.asDynamic' call
        tmp_0 = query.substring(spaceNameIndex_0, spaceEqualIndex);
      }
      var name_0 = tmp_0;
      var spaceValueIndex = trimStart(equalIndex + 1 | 0, endIndex, query);
      var spaceEndIndex_0 = trimEnd(spaceValueIndex, endIndex, query);
      var tmp_1;
      if (decode) {
        tmp_1 = decodeURLQueryComponent(query, spaceValueIndex, spaceEndIndex_0, true);
      } else {
        // Inline function 'kotlin.text.substring' call
        // Inline function 'kotlin.js.asDynamic' call
        tmp_1 = query.substring(spaceValueIndex, spaceEndIndex_0);
      }
      var value = tmp_1;
      _this__u8e3s4.j27(name_0, value);
    }
  }
  function trimStart(start, end, query) {
    var spaceIndex = start;
    while (spaceIndex < end && isWhitespace(charSequenceGet(query, spaceIndex))) {
      spaceIndex = spaceIndex + 1 | 0;
    }
    return spaceIndex;
  }
  function trimEnd(start, end, text) {
    var spaceIndex = end;
    while (spaceIndex > start && isWhitespace(charSequenceGet(text, spaceIndex - 1 | 0))) {
      spaceIndex = spaceIndex - 1 | 0;
    }
    return spaceIndex;
  }
  function applyOrigin($this) {
    var tmp;
    // Inline function 'kotlin.text.isNotEmpty' call
    var this_0 = $this.d2k_1;
    if (charSequenceLength(this_0) > 0) {
      tmp = true;
    } else {
      tmp = $this.p2k().n2k_1 === 'file';
    }
    if (tmp)
      return Unit_instance;
    $this.d2k_1 = Companion_getInstance_6().j2l_1.q2k_1;
    if ($this.g2k_1 == null)
      $this.g2k_1 = Companion_getInstance_6().j2l_1.b2l_1;
    if ($this.f2k_1 === 0) {
      $this.l2l(Companion_getInstance_6().j2l_1.r2k_1);
    }
  }
  function Companion_6() {
    Companion_instance_6 = this;
    this.j2l_1 = Url(get_origin(this));
    this.k2l_1 = 256;
  }
  var Companion_instance_6;
  function Companion_getInstance_6() {
    if (Companion_instance_6 == null)
      new Companion_6();
    return Companion_instance_6;
  }
  function URLBuilder(protocol, host, port, user, password, pathSegments, parameters, fragment, trailingQuery) {
    Companion_getInstance_6();
    protocol = protocol === VOID ? null : protocol;
    host = host === VOID ? '' : host;
    port = port === VOID ? 0 : port;
    user = user === VOID ? null : user;
    password = password === VOID ? null : password;
    pathSegments = pathSegments === VOID ? emptyList() : pathSegments;
    parameters = parameters === VOID ? Companion_getInstance_5().a2k_1 : parameters;
    fragment = fragment === VOID ? '' : fragment;
    trailingQuery = trailingQuery === VOID ? false : trailingQuery;
    this.d2k_1 = host;
    this.e2k_1 = trailingQuery;
    this.f2k_1 = port;
    this.g2k_1 = protocol;
    var tmp = this;
    tmp.h2k_1 = user == null ? null : encodeURLParameter(user);
    var tmp_0 = this;
    tmp_0.i2k_1 = password == null ? null : encodeURLParameter(password);
    this.j2k_1 = encodeURLQueryComponent(fragment);
    var tmp_1 = this;
    // Inline function 'kotlin.collections.map' call
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$(collectionSizeOrDefault(pathSegments, 10));
    var _iterator__ex2g4s = pathSegments.g();
    while (_iterator__ex2g4s.h()) {
      var item = _iterator__ex2g4s.i();
      var tmp$ret$0 = encodeURLPathPart(item);
      destination.e(tmp$ret$0);
    }
    tmp_1.k2k_1 = destination;
    this.l2k_1 = encodeParameters(parameters);
    this.m2k_1 = new UrlDecodedParametersBuilder(this.l2k_1);
  }
  protoOf(URLBuilder).l2l = function (value) {
    // Inline function 'kotlin.require' call
    if (!(0 <= value ? value <= 65535 : false)) {
      var message = 'Port must be between 0 and 65535, or 0 if not set. Provided: ' + value;
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    this.f2k_1 = value;
  };
  protoOf(URLBuilder).m2l = function (value) {
    this.g2k_1 = value;
  };
  protoOf(URLBuilder).p2k = function () {
    var tmp0_elvis_lhs = this.g2k_1;
    return tmp0_elvis_lhs == null ? Companion_getInstance_7().n2l_1 : tmp0_elvis_lhs;
  };
  protoOf(URLBuilder).t2l = function (value) {
    var tmp = this;
    tmp.h2k_1 = value == null ? null : encodeURLParameter(value);
  };
  protoOf(URLBuilder).u2l = function () {
    var tmp0_safe_receiver = this.h2k_1;
    return tmp0_safe_receiver == null ? null : decodeURLPart(tmp0_safe_receiver);
  };
  protoOf(URLBuilder).v2l = function () {
    var tmp0_safe_receiver = this.i2k_1;
    return tmp0_safe_receiver == null ? null : decodeURLPart(tmp0_safe_receiver);
  };
  protoOf(URLBuilder).w2l = function () {
    return decodeURLQueryComponent(this.j2k_1);
  };
  protoOf(URLBuilder).x2l = function () {
    // Inline function 'kotlin.collections.map' call
    var this_0 = this.k2k_1;
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$(collectionSizeOrDefault(this_0, 10));
    var _iterator__ex2g4s = this_0.g();
    while (_iterator__ex2g4s.h()) {
      var item = _iterator__ex2g4s.i();
      var tmp$ret$0 = decodeURLPart(item);
      destination.e(tmp$ret$0);
    }
    return destination;
  };
  protoOf(URLBuilder).y2l = function (value) {
    this.l2k_1 = value;
    this.m2k_1 = new UrlDecodedParametersBuilder(value);
  };
  protoOf(URLBuilder).z2l = function () {
    applyOrigin(this);
    return appendTo(this, StringBuilder_init_$Create$_0(256)).toString();
  };
  protoOf(URLBuilder).toString = function () {
    return appendTo(this, StringBuilder_init_$Create$_0(256)).toString();
  };
  protoOf(URLBuilder).z2c = function () {
    applyOrigin(this);
    return new Url_0(this.g2k_1, this.d2k_1, this.f2k_1, this.x2l(), this.m2k_1.z2c(), this.w2l(), this.u2l(), this.v2l(), this.e2k_1, this.z2l());
  };
  function get_authority(_this__u8e3s4) {
    // Inline function 'kotlin.text.buildString' call
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$();
    this_0.z7(get_encodedUserAndPassword(_this__u8e3s4));
    this_0.z7(_this__u8e3s4.d2k_1);
    if (!(_this__u8e3s4.f2k_1 === 0) && !(_this__u8e3s4.f2k_1 === _this__u8e3s4.p2k().o2k_1)) {
      this_0.z7(':');
      this_0.z7(_this__u8e3s4.f2k_1.toString());
    }
    return this_0.toString();
  }
  function appendTo(_this__u8e3s4, out) {
    out.f(_this__u8e3s4.p2k().n2k_1);
    switch (_this__u8e3s4.p2k().n2k_1) {
      case 'file':
        appendFile(out, _this__u8e3s4.d2k_1, get_encodedPath(_this__u8e3s4));
        return out;
      case 'mailto':
        appendMailto(out, get_encodedUserAndPassword(_this__u8e3s4), _this__u8e3s4.d2k_1);
        return out;
      case 'about':
        appendAbout(out, _this__u8e3s4.d2k_1);
        return out;
    }
    out.f('://');
    out.f(get_authority(_this__u8e3s4));
    appendUrlFullPath(out, get_encodedPath(_this__u8e3s4), _this__u8e3s4.l2k_1, _this__u8e3s4.e2k_1);
    // Inline function 'kotlin.text.isNotEmpty' call
    var this_0 = _this__u8e3s4.j2k_1;
    if (charSequenceLength(this_0) > 0) {
      out.a8(_Char___init__impl__6a9atx(35));
      out.f(_this__u8e3s4.j2k_1);
    }
    return out;
  }
  function get_encodedUserAndPassword(_this__u8e3s4) {
    // Inline function 'kotlin.text.buildString' call
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$();
    appendUserAndPassword(this_0, _this__u8e3s4.h2k_1, _this__u8e3s4.i2k_1);
    return this_0.toString();
  }
  function appendFile(_this__u8e3s4, host, encodedPath) {
    _this__u8e3s4.f('://');
    _this__u8e3s4.f(host);
    if (!startsWith(encodedPath, _Char___init__impl__6a9atx(47))) {
      _this__u8e3s4.a8(_Char___init__impl__6a9atx(47));
    }
    _this__u8e3s4.f(encodedPath);
  }
  function set_encodedPath(_this__u8e3s4, value) {
    _this__u8e3s4.k2k_1 = isBlank(value) ? emptyList() : value === '/' ? get_ROOT_PATH() : toMutableList(split(value, charArrayOf([_Char___init__impl__6a9atx(47)])));
  }
  function get_encodedPath(_this__u8e3s4) {
    return joinPath(_this__u8e3s4.k2k_1);
  }
  function appendMailto(_this__u8e3s4, encodedUser, host) {
    _this__u8e3s4.f(':');
    _this__u8e3s4.f(encodedUser);
    _this__u8e3s4.f(host);
  }
  function appendAbout(_this__u8e3s4, host) {
    _this__u8e3s4.f(':');
    _this__u8e3s4.f(host);
  }
  function joinPath(_this__u8e3s4) {
    if (_this__u8e3s4.p())
      return '';
    if (_this__u8e3s4.j() === 1) {
      // Inline function 'kotlin.text.isEmpty' call
      var this_0 = first_0(_this__u8e3s4);
      if (charSequenceLength(this_0) === 0)
        return '/';
      return first_0(_this__u8e3s4);
    }
    return joinToString(_this__u8e3s4, '/');
  }
  function get_ROOT_PATH() {
    _init_properties_URLParser_kt__sf11to();
    return ROOT_PATH;
  }
  var ROOT_PATH;
  function takeFrom(_this__u8e3s4, urlString) {
    _init_properties_URLParser_kt__sf11to();
    if (isBlank(urlString))
      return _this__u8e3s4;
    var tmp;
    try {
      tmp = takeFromUnsafe(_this__u8e3s4, urlString);
    } catch ($p) {
      var tmp_0;
      if ($p instanceof Error) {
        var cause = $p;
        throw new URLParserException(urlString, cause);
      } else {
        throw $p;
      }
    }
    return tmp;
  }
  function takeFromUnsafe(_this__u8e3s4, urlString) {
    _init_properties_URLParser_kt__sf11to();
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlin.text.indexOfFirst' call
      var inductionVariable = 0;
      var last = charSequenceLength(urlString) - 1 | 0;
      if (inductionVariable <= last)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var it = charSequenceGet(urlString, index);
          if (!isWhitespace(it)) {
            tmp$ret$1 = index;
            break $l$block;
          }
        }
         while (inductionVariable <= last);
      tmp$ret$1 = -1;
    }
    var startIndex = tmp$ret$1;
    var tmp$ret$3;
    $l$block_0: {
      // Inline function 'kotlin.text.indexOfLast' call
      var inductionVariable_0 = charSequenceLength(urlString) - 1 | 0;
      if (0 <= inductionVariable_0)
        do {
          var index_0 = inductionVariable_0;
          inductionVariable_0 = inductionVariable_0 + -1 | 0;
          var it_0 = charSequenceGet(urlString, index_0);
          if (!isWhitespace(it_0)) {
            tmp$ret$3 = index_0;
            break $l$block_0;
          }
        }
         while (0 <= inductionVariable_0);
      tmp$ret$3 = -1;
    }
    var endIndex = tmp$ret$3 + 1 | 0;
    var schemeLength = findScheme(urlString, startIndex, endIndex);
    if (schemeLength > 0) {
      var tmp5 = startIndex;
      // Inline function 'kotlin.text.substring' call
      var endIndex_0 = startIndex + schemeLength | 0;
      // Inline function 'kotlin.js.asDynamic' call
      var scheme = urlString.substring(tmp5, endIndex_0);
      _this__u8e3s4.m2l(Companion_getInstance_7().a2m(scheme));
      startIndex = startIndex + (schemeLength + 1 | 0) | 0;
    }
    var slashCount = count(urlString, startIndex, endIndex, _Char___init__impl__6a9atx(47));
    startIndex = startIndex + slashCount | 0;
    if (_this__u8e3s4.p2k().n2k_1 === 'file') {
      parseFile(_this__u8e3s4, urlString, startIndex, endIndex, slashCount);
      return _this__u8e3s4;
    }
    if (_this__u8e3s4.p2k().n2k_1 === 'mailto') {
      // Inline function 'kotlin.require' call
      // Inline function 'kotlin.require' call
      if (!(slashCount === 0)) {
        var message = 'Failed requirement.';
        throw IllegalArgumentException_init_$Create$(toString(message));
      }
      parseMailto(_this__u8e3s4, urlString, startIndex, endIndex);
      return _this__u8e3s4;
    }
    if (_this__u8e3s4.p2k().n2k_1 === 'about') {
      // Inline function 'kotlin.require' call
      // Inline function 'kotlin.require' call
      if (!(slashCount === 0)) {
        var message_0 = 'Failed requirement.';
        throw IllegalArgumentException_init_$Create$(toString(message_0));
      }
      var tmp = _this__u8e3s4;
      // Inline function 'kotlin.text.substring' call
      var startIndex_0 = startIndex;
      // Inline function 'kotlin.js.asDynamic' call
      tmp.d2k_1 = urlString.substring(startIndex_0, endIndex);
      return _this__u8e3s4;
    }
    if (slashCount >= 2) {
      loop: while (true) {
        // Inline function 'kotlin.takeIf' call
        var this_0 = indexOfAny(urlString, toCharArray('@/\\?#'), startIndex);
        var tmp_0;
        if (this_0 > 0) {
          tmp_0 = this_0;
        } else {
          tmp_0 = null;
        }
        var tmp0_elvis_lhs = tmp_0;
        var delimiter = tmp0_elvis_lhs == null ? endIndex : tmp0_elvis_lhs;
        if (delimiter < endIndex && charSequenceGet(urlString, delimiter) === _Char___init__impl__6a9atx(64)) {
          var passwordIndex = indexOfColonInHostPort(urlString, startIndex, delimiter);
          if (!(passwordIndex === -1)) {
            var tmp_1 = _this__u8e3s4;
            // Inline function 'kotlin.text.substring' call
            var startIndex_1 = startIndex;
            // Inline function 'kotlin.js.asDynamic' call
            tmp_1.h2k_1 = urlString.substring(startIndex_1, passwordIndex);
            var tmp_2 = _this__u8e3s4;
            // Inline function 'kotlin.text.substring' call
            var startIndex_2 = passwordIndex + 1 | 0;
            // Inline function 'kotlin.js.asDynamic' call
            tmp_2.i2k_1 = urlString.substring(startIndex_2, delimiter);
          } else {
            var tmp_3 = _this__u8e3s4;
            // Inline function 'kotlin.text.substring' call
            var startIndex_3 = startIndex;
            // Inline function 'kotlin.js.asDynamic' call
            tmp_3.h2k_1 = urlString.substring(startIndex_3, delimiter);
          }
          startIndex = delimiter + 1 | 0;
        } else {
          fillHost(_this__u8e3s4, urlString, startIndex, delimiter);
          startIndex = delimiter;
          break loop;
        }
      }
    }
    if (startIndex >= endIndex) {
      _this__u8e3s4.k2k_1 = charSequenceGet(urlString, endIndex - 1 | 0) === _Char___init__impl__6a9atx(47) ? get_ROOT_PATH() : emptyList();
      return _this__u8e3s4;
    }
    var tmp_4 = _this__u8e3s4;
    var tmp_5;
    if (slashCount === 0) {
      tmp_5 = dropLast(_this__u8e3s4.k2k_1, 1);
    } else {
      tmp_5 = emptyList();
    }
    tmp_4.k2k_1 = tmp_5;
    // Inline function 'kotlin.takeIf' call
    var this_1 = indexOfAny(urlString, toCharArray('?#'), startIndex);
    var tmp_6;
    if (this_1 > 0) {
      tmp_6 = this_1;
    } else {
      tmp_6 = null;
    }
    var tmp1_elvis_lhs = tmp_6;
    var pathEnd = tmp1_elvis_lhs == null ? endIndex : tmp1_elvis_lhs;
    if (pathEnd > startIndex) {
      // Inline function 'kotlin.text.substring' call
      var startIndex_4 = startIndex;
      // Inline function 'kotlin.js.asDynamic' call
      var rawPath = urlString.substring(startIndex_4, pathEnd);
      var tmp_7;
      var tmp_8;
      if (_this__u8e3s4.k2k_1.j() === 1) {
        // Inline function 'kotlin.text.isEmpty' call
        var this_2 = first_0(_this__u8e3s4.k2k_1);
        tmp_8 = charSequenceLength(this_2) === 0;
      } else {
        tmp_8 = false;
      }
      if (tmp_8) {
        tmp_7 = emptyList();
      } else {
        tmp_7 = _this__u8e3s4.k2k_1;
      }
      var basePath = tmp_7;
      var rawChunks = rawPath === '/' ? get_ROOT_PATH() : split(rawPath, charArrayOf([_Char___init__impl__6a9atx(47)]));
      var relativePath = plus_0(slashCount === 1 ? get_ROOT_PATH() : emptyList(), rawChunks);
      _this__u8e3s4.k2k_1 = plus_0(basePath, relativePath);
      startIndex = pathEnd;
    }
    if (startIndex < endIndex && charSequenceGet(urlString, startIndex) === _Char___init__impl__6a9atx(63)) {
      startIndex = parseQuery(_this__u8e3s4, urlString, startIndex, endIndex);
    }
    parseFragment(_this__u8e3s4, urlString, startIndex, endIndex);
    return _this__u8e3s4;
  }
  function URLParserException(urlString, cause) {
    IllegalStateException_init_$Init$('Fail to parse url: ' + urlString, cause, this);
    captureStack(this, URLParserException);
  }
  function findScheme(urlString, startIndex, endIndex) {
    _init_properties_URLParser_kt__sf11to();
    var current = startIndex;
    var incorrectSchemePosition = -1;
    var firstChar = charSequenceGet(urlString, current);
    if (!(_Char___init__impl__6a9atx(97) <= firstChar ? firstChar <= _Char___init__impl__6a9atx(122) : false) && !(_Char___init__impl__6a9atx(65) <= firstChar ? firstChar <= _Char___init__impl__6a9atx(90) : false)) {
      incorrectSchemePosition = current;
    }
    while (current < endIndex) {
      var char = charSequenceGet(urlString, current);
      if (char === _Char___init__impl__6a9atx(58)) {
        if (!(incorrectSchemePosition === -1)) {
          throw IllegalArgumentException_init_$Create$('Illegal character in scheme at position ' + incorrectSchemePosition);
        }
        return current - startIndex | 0;
      }
      if (char === _Char___init__impl__6a9atx(47) || char === _Char___init__impl__6a9atx(63) || char === _Char___init__impl__6a9atx(35))
        return -1;
      if (incorrectSchemePosition === -1 && !(_Char___init__impl__6a9atx(97) <= char ? char <= _Char___init__impl__6a9atx(122) : false) && !(_Char___init__impl__6a9atx(65) <= char ? char <= _Char___init__impl__6a9atx(90) : false) && !(_Char___init__impl__6a9atx(48) <= char ? char <= _Char___init__impl__6a9atx(57) : false) && !(char === _Char___init__impl__6a9atx(46)) && !(char === _Char___init__impl__6a9atx(43)) && !(char === _Char___init__impl__6a9atx(45))) {
        incorrectSchemePosition = current;
      }
      current = current + 1 | 0;
    }
    return -1;
  }
  function count(urlString, startIndex, endIndex, char) {
    _init_properties_URLParser_kt__sf11to();
    var result = 0;
    $l$loop: while ((startIndex + result | 0) < endIndex && charSequenceGet(urlString, startIndex + result | 0) === char) {
      result = result + 1 | 0;
    }
    return result;
  }
  function parseFile(_this__u8e3s4, urlString, startIndex, endIndex, slashCount) {
    _init_properties_URLParser_kt__sf11to();
    switch (slashCount) {
      case 2:
        var nextSlash = indexOf(urlString, _Char___init__impl__6a9atx(47), startIndex);
        if (nextSlash === -1 || nextSlash === endIndex) {
          var tmp = _this__u8e3s4;
          // Inline function 'kotlin.text.substring' call
          // Inline function 'kotlin.js.asDynamic' call
          tmp.d2k_1 = urlString.substring(startIndex, endIndex);
          return Unit_instance;
        }

        var tmp_0 = _this__u8e3s4;
        // Inline function 'kotlin.text.substring' call

        // Inline function 'kotlin.js.asDynamic' call

        tmp_0.d2k_1 = urlString.substring(startIndex, nextSlash);
        // Inline function 'kotlin.text.substring' call

        // Inline function 'kotlin.js.asDynamic' call

        var tmp$ret$5 = urlString.substring(nextSlash, endIndex);
        set_encodedPath(_this__u8e3s4, tmp$ret$5);
        break;
      case 3:
        _this__u8e3s4.d2k_1 = '';
        // Inline function 'kotlin.text.substring' call

        // Inline function 'kotlin.js.asDynamic' call

        var tmp$ret$7 = urlString.substring(startIndex, endIndex);
        set_encodedPath(_this__u8e3s4, '/' + tmp$ret$7);
        break;
      default:
        throw IllegalArgumentException_init_$Create$('Invalid file url: ' + urlString);
    }
  }
  function parseMailto(_this__u8e3s4, urlString, startIndex, endIndex) {
    _init_properties_URLParser_kt__sf11to();
    var delimiter = indexOf_0(urlString, '@', startIndex);
    if (delimiter === -1) {
      throw IllegalArgumentException_init_$Create$('Invalid mailto url: ' + urlString + ", it should contain '@'.");
    }
    // Inline function 'kotlin.text.substring' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp$ret$1 = urlString.substring(startIndex, delimiter);
    _this__u8e3s4.t2l(decodeURLPart(tmp$ret$1));
    var tmp = _this__u8e3s4;
    // Inline function 'kotlin.text.substring' call
    var startIndex_0 = delimiter + 1 | 0;
    // Inline function 'kotlin.js.asDynamic' call
    tmp.d2k_1 = urlString.substring(startIndex_0, endIndex);
  }
  function indexOfColonInHostPort(_this__u8e3s4, startIndex, endIndex) {
    _init_properties_URLParser_kt__sf11to();
    var skip = false;
    var inductionVariable = startIndex;
    if (inductionVariable < endIndex)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var tmp0_subject = charSequenceGet(_this__u8e3s4, index);
        if (tmp0_subject === _Char___init__impl__6a9atx(91))
          skip = true;
        else if (tmp0_subject === _Char___init__impl__6a9atx(93))
          skip = false;
        else if (tmp0_subject === _Char___init__impl__6a9atx(58))
          if (!skip)
            return index;
      }
       while (inductionVariable < endIndex);
    return -1;
  }
  function fillHost(_this__u8e3s4, urlString, startIndex, endIndex) {
    _init_properties_URLParser_kt__sf11to();
    // Inline function 'kotlin.takeIf' call
    var this_0 = indexOfColonInHostPort(urlString, startIndex, endIndex);
    var tmp;
    if (this_0 > 0) {
      tmp = this_0;
    } else {
      tmp = null;
    }
    var tmp0_elvis_lhs = tmp;
    var colonIndex = tmp0_elvis_lhs == null ? endIndex : tmp0_elvis_lhs;
    var tmp_0 = _this__u8e3s4;
    // Inline function 'kotlin.text.substring' call
    // Inline function 'kotlin.js.asDynamic' call
    tmp_0.d2k_1 = urlString.substring(startIndex, colonIndex);
    var tmp_1;
    if ((colonIndex + 1 | 0) < endIndex) {
      // Inline function 'kotlin.text.substring' call
      var startIndex_0 = colonIndex + 1 | 0;
      // Inline function 'kotlin.js.asDynamic' call
      var tmp$ret$5 = urlString.substring(startIndex_0, endIndex);
      tmp_1 = toInt(tmp$ret$5);
    } else {
      tmp_1 = 0;
    }
    _this__u8e3s4.l2l(tmp_1);
  }
  function parseQuery(_this__u8e3s4, urlString, startIndex, endIndex) {
    _init_properties_URLParser_kt__sf11to();
    if ((startIndex + 1 | 0) === endIndex) {
      _this__u8e3s4.e2k_1 = true;
      return endIndex;
    }
    // Inline function 'kotlin.takeIf' call
    var this_0 = indexOf(urlString, _Char___init__impl__6a9atx(35), startIndex + 1 | 0);
    var tmp;
    if (this_0 > 0) {
      tmp = this_0;
    } else {
      tmp = null;
    }
    var tmp0_elvis_lhs = tmp;
    var fragmentStart = tmp0_elvis_lhs == null ? endIndex : tmp0_elvis_lhs;
    // Inline function 'kotlin.text.substring' call
    var startIndex_0 = startIndex + 1 | 0;
    // Inline function 'kotlin.js.asDynamic' call
    var tmp$ret$3 = urlString.substring(startIndex_0, fragmentStart);
    var rawParameters = parseQueryString(tmp$ret$3, VOID, VOID, false);
    rawParameters.c27(parseQuery$lambda(_this__u8e3s4));
    return fragmentStart;
  }
  function parseFragment(_this__u8e3s4, urlString, startIndex, endIndex) {
    _init_properties_URLParser_kt__sf11to();
    if (startIndex < endIndex && charSequenceGet(urlString, startIndex) === _Char___init__impl__6a9atx(35)) {
      var tmp = _this__u8e3s4;
      // Inline function 'kotlin.text.substring' call
      var startIndex_0 = startIndex + 1 | 0;
      // Inline function 'kotlin.js.asDynamic' call
      tmp.j2k_1 = urlString.substring(startIndex_0, endIndex);
    }
  }
  function parseQuery$lambda($this_parseQuery) {
    return function (key, values) {
      $this_parseQuery.l2k_1.g27(key, values);
      return Unit_instance;
    };
  }
  var properties_initialized_URLParser_kt_hd1g6a;
  function _init_properties_URLParser_kt__sf11to() {
    if (!properties_initialized_URLParser_kt_hd1g6a) {
      properties_initialized_URLParser_kt_hd1g6a = true;
      ROOT_PATH = listOf_0('');
    }
  }
  function Companion_7() {
    Companion_instance_7 = this;
    this.n2l_1 = new URLProtocol('http', 80);
    this.o2l_1 = new URLProtocol('https', 443);
    this.p2l_1 = new URLProtocol('ws', 80);
    this.q2l_1 = new URLProtocol('wss', 443);
    this.r2l_1 = new URLProtocol('socks', 1080);
    var tmp = this;
    // Inline function 'kotlin.collections.associateBy' call
    var this_0 = listOf([this.n2l_1, this.o2l_1, this.p2l_1, this.q2l_1, this.r2l_1]);
    var capacity = coerceAtLeast(mapCapacity(collectionSizeOrDefault(this_0, 10)), 16);
    // Inline function 'kotlin.collections.associateByTo' call
    var destination = LinkedHashMap_init_$Create$(capacity);
    var _iterator__ex2g4s = this_0.g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      var tmp$ret$0 = element.n2k_1;
      destination.h2(tmp$ret$0, element);
    }
    tmp.s2l_1 = destination;
  }
  protoOf(Companion_7).a2m = function (name) {
    // Inline function 'kotlin.let' call
    var it = toLowerCasePreservingASCIIRules(name);
    var tmp0_elvis_lhs = Companion_getInstance_7().s2l_1.e2(it);
    return tmp0_elvis_lhs == null ? new URLProtocol(it, 0) : tmp0_elvis_lhs;
  };
  var Companion_instance_7;
  function Companion_getInstance_7() {
    if (Companion_instance_7 == null)
      new Companion_7();
    return Companion_instance_7;
  }
  function URLProtocol(name, defaultPort) {
    Companion_getInstance_7();
    this.n2k_1 = name;
    this.o2k_1 = defaultPort;
    var tmp0 = this.n2k_1;
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlin.text.all' call
      var inductionVariable = 0;
      while (inductionVariable < charSequenceLength(tmp0)) {
        var element = charSequenceGet(tmp0, inductionVariable);
        inductionVariable = inductionVariable + 1 | 0;
        if (!isLowerCase(element)) {
          tmp$ret$1 = false;
          break $l$block;
        }
      }
      tmp$ret$1 = true;
    }
    // Inline function 'kotlin.require' call
    if (!tmp$ret$1) {
      var message = 'All characters should be lower case';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
  }
  protoOf(URLProtocol).toString = function () {
    return 'URLProtocol(name=' + this.n2k_1 + ', defaultPort=' + this.o2k_1 + ')';
  };
  protoOf(URLProtocol).hashCode = function () {
    var result = getStringHashCode(this.n2k_1);
    result = imul(result, 31) + this.o2k_1 | 0;
    return result;
  };
  protoOf(URLProtocol).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof URLProtocol))
      return false;
    var tmp0_other_with_cast = other instanceof URLProtocol ? other : THROW_CCE();
    if (!(this.n2k_1 === tmp0_other_with_cast.n2k_1))
      return false;
    if (!(this.o2k_1 === tmp0_other_with_cast.o2k_1))
      return false;
    return true;
  };
  function isSecure(_this__u8e3s4) {
    return _this__u8e3s4.n2k_1 === 'https' || _this__u8e3s4.n2k_1 === 'wss';
  }
  function takeFrom_0(_this__u8e3s4, url) {
    _this__u8e3s4.g2k_1 = url.g2k_1;
    _this__u8e3s4.d2k_1 = url.d2k_1;
    _this__u8e3s4.l2l(url.f2k_1);
    _this__u8e3s4.k2k_1 = url.k2k_1;
    _this__u8e3s4.h2k_1 = url.h2k_1;
    _this__u8e3s4.i2k_1 = url.i2k_1;
    // Inline function 'kotlin.apply' call
    var this_0 = ParametersBuilder();
    appendAll(this_0, url.l2k_1);
    _this__u8e3s4.y2l(this_0);
    _this__u8e3s4.j2k_1 = url.j2k_1;
    _this__u8e3s4.e2k_1 = url.e2k_1;
    return _this__u8e3s4;
  }
  function get_hostWithPortIfSpecified(_this__u8e3s4) {
    var tmp0_subject = _this__u8e3s4.r2k_1;
    return tmp0_subject === 0 || tmp0_subject === _this__u8e3s4.c2l_1.o2k_1 ? _this__u8e3s4.q2k_1 : get_hostWithPort(_this__u8e3s4);
  }
  function appendUserAndPassword(_this__u8e3s4, encodedUser, encodedPassword) {
    if (encodedUser == null) {
      return Unit_instance;
    }
    _this__u8e3s4.z7(encodedUser);
    if (!(encodedPassword == null)) {
      _this__u8e3s4.a8(_Char___init__impl__6a9atx(58));
      _this__u8e3s4.z7(encodedPassword);
    }
    _this__u8e3s4.z7('@');
  }
  function Url(urlString) {
    return URLBuilder_0(urlString).z2c();
  }
  function appendUrlFullPath(_this__u8e3s4, encodedPath, encodedQueryParameters, trailingQuery) {
    var tmp;
    // Inline function 'kotlin.text.isNotBlank' call
    if (!isBlank(encodedPath)) {
      tmp = !startsWith_0(encodedPath, '/');
    } else {
      tmp = false;
    }
    if (tmp) {
      _this__u8e3s4.a8(_Char___init__impl__6a9atx(47));
    }
    _this__u8e3s4.f(encodedPath);
    if (!encodedQueryParameters.p() || trailingQuery) {
      _this__u8e3s4.f('?');
    }
    // Inline function 'kotlin.collections.flatMap' call
    var tmp0 = encodedQueryParameters.b27();
    // Inline function 'kotlin.collections.flatMapTo' call
    var destination = ArrayList_init_$Create$_0();
    var _iterator__ex2g4s = tmp0.g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      // Inline function 'kotlin.collections.component1' call
      var key = element.v();
      // Inline function 'kotlin.collections.component2' call
      var value = element.w();
      var tmp_0;
      if (value.p()) {
        tmp_0 = listOf_0(to(key, null));
      } else {
        // Inline function 'kotlin.collections.map' call
        // Inline function 'kotlin.collections.mapTo' call
        var destination_0 = ArrayList_init_$Create$(collectionSizeOrDefault(value, 10));
        var _iterator__ex2g4s_0 = value.g();
        while (_iterator__ex2g4s_0.h()) {
          var item = _iterator__ex2g4s_0.i();
          var tmp$ret$3 = to(key, item);
          destination_0.e(tmp$ret$3);
        }
        tmp_0 = destination_0;
      }
      var list = tmp_0;
      addAll(destination, list);
    }
    var tmp_1 = destination;
    joinTo(tmp_1, _this__u8e3s4, '&', VOID, VOID, VOID, VOID, appendUrlFullPath$lambda);
  }
  function get_hostWithPort(_this__u8e3s4) {
    return _this__u8e3s4.q2k_1 + ':' + _this__u8e3s4.b2m();
  }
  function URLBuilder_0(urlString) {
    return takeFrom(new URLBuilder(), urlString);
  }
  function appendUrlFullPath$lambda(it) {
    var key = it.pg_1;
    var tmp;
    if (it.qg_1 == null) {
      tmp = key;
    } else {
      var value = toString_1(it.qg_1);
      tmp = key + '=' + value;
    }
    return tmp;
  }
  function Companion_8() {
  }
  var Companion_instance_8;
  function Companion_getInstance_8() {
    return Companion_instance_8;
  }
  function Url$segments$delegate$lambda($pathSegments) {
    return function () {
      var tmp;
      if ($pathSegments.p()) {
        return emptyList();
      }
      var tmp_0;
      var tmp_1;
      // Inline function 'kotlin.text.isEmpty' call
      var this_0 = first_0($pathSegments);
      if (charSequenceLength(this_0) === 0) {
        tmp_1 = $pathSegments.j() > 1;
      } else {
        tmp_1 = false;
      }
      if (tmp_1) {
        tmp_0 = 1;
      } else {
        tmp_0 = 0;
      }
      var start = tmp_0;
      var tmp_2;
      // Inline function 'kotlin.text.isEmpty' call
      var this_1 = last($pathSegments);
      if (charSequenceLength(this_1) === 0) {
        tmp_2 = get_lastIndex($pathSegments);
      } else {
        tmp_2 = get_lastIndex($pathSegments) + 1 | 0;
      }
      var end = tmp_2;
      return $pathSegments.x1(start, end);
    };
  }
  function Url$encodedPath$delegate$lambda($pathSegments, this$0) {
    return function () {
      var tmp;
      if ($pathSegments.p()) {
        return '';
      }
      var pathStartIndex = indexOf(this$0.x2k_1, _Char___init__impl__6a9atx(47), this$0.c2l_1.n2k_1.length + 3 | 0);
      var tmp_0;
      if (pathStartIndex === -1) {
        return '';
      }
      // Inline function 'kotlin.charArrayOf' call
      var tmp$ret$0 = charArrayOf([_Char___init__impl__6a9atx(63), _Char___init__impl__6a9atx(35)]);
      var pathEndIndex = indexOfAny(this$0.x2k_1, tmp$ret$0, pathStartIndex);
      var tmp_1;
      if (pathEndIndex === -1) {
        // Inline function 'kotlin.text.substring' call
        // Inline function 'kotlin.js.asDynamic' call
        return this$0.x2k_1.substring(pathStartIndex);
      }
      // Inline function 'kotlin.text.substring' call
      // Inline function 'kotlin.js.asDynamic' call
      return this$0.x2k_1.substring(pathStartIndex, pathEndIndex);
    };
  }
  function Url$encodedQuery$delegate$lambda(this$0) {
    return function () {
      var queryStart = indexOf(this$0.x2k_1, _Char___init__impl__6a9atx(63)) + 1 | 0;
      var tmp;
      if (queryStart === 0) {
        return '';
      }
      var queryEnd = indexOf(this$0.x2k_1, _Char___init__impl__6a9atx(35), queryStart);
      var tmp_0;
      if (queryEnd === -1) {
        // Inline function 'kotlin.text.substring' call
        // Inline function 'kotlin.js.asDynamic' call
        return this$0.x2k_1.substring(queryStart);
      }
      // Inline function 'kotlin.text.substring' call
      // Inline function 'kotlin.js.asDynamic' call
      return this$0.x2k_1.substring(queryStart, queryEnd);
    };
  }
  function Url$encodedPathAndQuery$delegate$lambda(this$0) {
    return function () {
      var pathStart = indexOf(this$0.x2k_1, _Char___init__impl__6a9atx(47), this$0.c2l_1.n2k_1.length + 3 | 0);
      var tmp;
      if (pathStart === -1) {
        return '';
      }
      var queryEnd = indexOf(this$0.x2k_1, _Char___init__impl__6a9atx(35), pathStart);
      var tmp_0;
      if (queryEnd === -1) {
        // Inline function 'kotlin.text.substring' call
        // Inline function 'kotlin.js.asDynamic' call
        return this$0.x2k_1.substring(pathStart);
      }
      // Inline function 'kotlin.text.substring' call
      // Inline function 'kotlin.js.asDynamic' call
      return this$0.x2k_1.substring(pathStart, queryEnd);
    };
  }
  function Url$encodedUser$delegate$lambda(this$0) {
    return function () {
      var tmp;
      if (this$0.u2k_1 == null) {
        return null;
      }
      var tmp_0;
      // Inline function 'kotlin.text.isEmpty' call
      var this_0 = this$0.u2k_1;
      if (charSequenceLength(this_0) === 0) {
        return '';
      }
      var usernameStart = this$0.c2l_1.n2k_1.length + 3 | 0;
      // Inline function 'kotlin.charArrayOf' call
      var tmp$ret$1 = charArrayOf([_Char___init__impl__6a9atx(58), _Char___init__impl__6a9atx(64)]);
      var usernameEnd = indexOfAny(this$0.x2k_1, tmp$ret$1, usernameStart);
      // Inline function 'kotlin.text.substring' call
      // Inline function 'kotlin.js.asDynamic' call
      return this$0.x2k_1.substring(usernameStart, usernameEnd);
    };
  }
  function Url$encodedPassword$delegate$lambda(this$0) {
    return function () {
      var tmp;
      if (this$0.v2k_1 == null) {
        return null;
      }
      var tmp_0;
      // Inline function 'kotlin.text.isEmpty' call
      var this_0 = this$0.v2k_1;
      if (charSequenceLength(this_0) === 0) {
        return '';
      }
      var passwordStart = indexOf(this$0.x2k_1, _Char___init__impl__6a9atx(58), this$0.c2l_1.n2k_1.length + 3 | 0) + 1 | 0;
      var passwordEnd = indexOf(this$0.x2k_1, _Char___init__impl__6a9atx(64));
      // Inline function 'kotlin.text.substring' call
      // Inline function 'kotlin.js.asDynamic' call
      return this$0.x2k_1.substring(passwordStart, passwordEnd);
    };
  }
  function Url$encodedFragment$delegate$lambda(this$0) {
    return function () {
      var fragmentStart = indexOf(this$0.x2k_1, _Char___init__impl__6a9atx(35)) + 1 | 0;
      var tmp;
      if (fragmentStart === 0) {
        return '';
      }
      // Inline function 'kotlin.text.substring' call
      // Inline function 'kotlin.js.asDynamic' call
      return this$0.x2k_1.substring(fragmentStart);
    };
  }
  function Url_0(protocol, host, specifiedPort, pathSegments, parameters, fragment, user, password, trailingQuery, urlString) {
    this.q2k_1 = host;
    this.r2k_1 = specifiedPort;
    this.s2k_1 = parameters;
    this.t2k_1 = fragment;
    this.u2k_1 = user;
    this.v2k_1 = password;
    this.w2k_1 = trailingQuery;
    this.x2k_1 = urlString;
    var containsArg = this.r2k_1;
    // Inline function 'kotlin.require' call
    if (!(0 <= containsArg ? containsArg <= 65535 : false)) {
      var message = 'Port must be between 0 and 65535, or 0 if not set. Provided: ' + this.r2k_1;
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    this.y2k_1 = pathSegments;
    this.z2k_1 = pathSegments;
    var tmp = this;
    tmp.a2l_1 = lazy_0(Url$segments$delegate$lambda(pathSegments));
    this.b2l_1 = protocol;
    var tmp_0 = this;
    var tmp0_elvis_lhs = this.b2l_1;
    tmp_0.c2l_1 = tmp0_elvis_lhs == null ? Companion_getInstance_7().n2l_1 : tmp0_elvis_lhs;
    var tmp_1 = this;
    tmp_1.d2l_1 = lazy_0(Url$encodedPath$delegate$lambda(pathSegments, this));
    var tmp_2 = this;
    tmp_2.e2l_1 = lazy_0(Url$encodedQuery$delegate$lambda(this));
    var tmp_3 = this;
    tmp_3.f2l_1 = lazy_0(Url$encodedPathAndQuery$delegate$lambda(this));
    var tmp_4 = this;
    tmp_4.g2l_1 = lazy_0(Url$encodedUser$delegate$lambda(this));
    var tmp_5 = this;
    tmp_5.h2l_1 = lazy_0(Url$encodedPassword$delegate$lambda(this));
    var tmp_6 = this;
    tmp_6.i2l_1 = lazy_0(Url$encodedFragment$delegate$lambda(this));
  }
  protoOf(Url_0).b2m = function () {
    // Inline function 'kotlin.takeUnless' call
    var this_0 = this.r2k_1;
    var tmp;
    if (!(this_0 === 0)) {
      tmp = this_0;
    } else {
      tmp = null;
    }
    var tmp0_elvis_lhs = tmp;
    return tmp0_elvis_lhs == null ? this.c2l_1.o2k_1 : tmp0_elvis_lhs;
  };
  protoOf(Url_0).c2m = function () {
    var tmp0 = this.g2l_1;
    // Inline function 'kotlin.getValue' call
    encodedUser$factory();
    return tmp0.w();
  };
  protoOf(Url_0).d2m = function () {
    var tmp0 = this.h2l_1;
    // Inline function 'kotlin.getValue' call
    encodedPassword$factory();
    return tmp0.w();
  };
  protoOf(Url_0).toString = function () {
    return this.x2k_1;
  };
  protoOf(Url_0).equals = function (other) {
    if (this === other)
      return true;
    if (other == null || !getKClassFromExpression(this).equals(getKClassFromExpression(other)))
      return false;
    if (!(other instanceof Url_0))
      THROW_CCE();
    return this.x2k_1 === other.x2k_1;
  };
  protoOf(Url_0).hashCode = function () {
    return getStringHashCode(this.x2k_1);
  };
  function get_authority_0(_this__u8e3s4) {
    // Inline function 'kotlin.text.buildString' call
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$();
    this_0.z7(get_encodedUserAndPassword_0(_this__u8e3s4));
    this_0.z7(get_hostWithPortIfSpecified(_this__u8e3s4));
    return this_0.toString();
  }
  function get_encodedUserAndPassword_0(_this__u8e3s4) {
    // Inline function 'kotlin.text.buildString' call
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$();
    appendUserAndPassword(this_0, _this__u8e3s4.c2m(), _this__u8e3s4.d2m());
    return this_0.toString();
  }
  function encodedUser$factory() {
    return getPropertyCallableRef('encodedUser', 1, KProperty1, function (receiver) {
      return receiver.c2m();
    }, null);
  }
  function encodedPassword$factory() {
    return getPropertyCallableRef('encodedPassword', 1, KProperty1, function (receiver) {
      return receiver.d2m();
    }, null);
  }
  function UrlDecodedParametersBuilder(encodedParametersBuilder) {
    this.e2m_1 = encodedParametersBuilder;
    this.f2m_1 = this.e2m_1.y26();
  }
  protoOf(UrlDecodedParametersBuilder).z2c = function () {
    return decodeParameters(this.e2m_1);
  };
  protoOf(UrlDecodedParametersBuilder).y26 = function () {
    return this.f2m_1;
  };
  protoOf(UrlDecodedParametersBuilder).z26 = function (name) {
    var tmp0_safe_receiver = this.e2m_1.z26(encodeURLParameter(name));
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.collections.map' call
      // Inline function 'kotlin.collections.mapTo' call
      var destination = ArrayList_init_$Create$(collectionSizeOrDefault(tmp0_safe_receiver, 10));
      var _iterator__ex2g4s = tmp0_safe_receiver.g();
      while (_iterator__ex2g4s.h()) {
        var item = _iterator__ex2g4s.i();
        var tmp$ret$0 = decodeURLQueryComponent(item, VOID, VOID, true);
        destination.e(tmp$ret$0);
      }
      tmp = destination;
    }
    return tmp;
  };
  protoOf(UrlDecodedParametersBuilder).a27 = function () {
    // Inline function 'kotlin.collections.map' call
    var this_0 = this.e2m_1.a27();
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$(collectionSizeOrDefault(this_0, 10));
    var _iterator__ex2g4s = this_0.g();
    while (_iterator__ex2g4s.h()) {
      var item = _iterator__ex2g4s.i();
      var tmp$ret$0 = decodeURLQueryComponent(item);
      destination.e(tmp$ret$0);
    }
    return toSet(destination);
  };
  protoOf(UrlDecodedParametersBuilder).p = function () {
    return this.e2m_1.p();
  };
  protoOf(UrlDecodedParametersBuilder).b27 = function () {
    return decodeParameters(this.e2m_1).b27();
  };
  protoOf(UrlDecodedParametersBuilder).j27 = function (name, value) {
    return this.e2m_1.j27(encodeURLParameter(name), encodeURLParameterValue(value));
  };
  protoOf(UrlDecodedParametersBuilder).g27 = function (name, values) {
    var tmp = encodeURLParameter(name);
    // Inline function 'kotlin.collections.map' call
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$(collectionSizeOrDefault(values, 10));
    var _iterator__ex2g4s = values.g();
    while (_iterator__ex2g4s.h()) {
      var item = _iterator__ex2g4s.i();
      var tmp$ret$0 = encodeURLParameterValue(item);
      destination.e(tmp$ret$0);
    }
    return this.e2m_1.g27(tmp, destination);
  };
  protoOf(UrlDecodedParametersBuilder).y1 = function () {
    return this.e2m_1.y1();
  };
  function encodeParameters(parameters) {
    // Inline function 'kotlin.apply' call
    var this_0 = ParametersBuilder();
    appendAllEncoded(this_0, parameters);
    return this_0;
  }
  function decodeParameters(parameters) {
    // Inline function 'kotlin.apply' call
    var this_0 = ParametersBuilder();
    appendAllDecoded(this_0, parameters);
    return this_0.z2c();
  }
  function appendAllEncoded(_this__u8e3s4, parameters) {
    // Inline function 'kotlin.collections.forEach' call
    var _iterator__ex2g4s = parameters.a27().g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      var tmp0_elvis_lhs = parameters.z26(element);
      var values = tmp0_elvis_lhs == null ? emptyList() : tmp0_elvis_lhs;
      var tmp = encodeURLParameter(element);
      // Inline function 'kotlin.collections.map' call
      // Inline function 'kotlin.collections.mapTo' call
      var destination = ArrayList_init_$Create$(collectionSizeOrDefault(values, 10));
      var _iterator__ex2g4s_0 = values.g();
      while (_iterator__ex2g4s_0.h()) {
        var item = _iterator__ex2g4s_0.i();
        var tmp$ret$0 = encodeURLParameterValue(item);
        destination.e(tmp$ret$0);
      }
      _this__u8e3s4.g27(tmp, destination);
    }
  }
  function appendAllDecoded(_this__u8e3s4, parameters) {
    // Inline function 'kotlin.collections.forEach' call
    var _iterator__ex2g4s = parameters.a27().g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      var tmp0_elvis_lhs = parameters.z26(element);
      var values = tmp0_elvis_lhs == null ? emptyList() : tmp0_elvis_lhs;
      var tmp = decodeURLQueryComponent(element);
      // Inline function 'kotlin.collections.map' call
      // Inline function 'kotlin.collections.mapTo' call
      var destination = ArrayList_init_$Create$(collectionSizeOrDefault(values, 10));
      var _iterator__ex2g4s_0 = values.g();
      while (_iterator__ex2g4s_0.h()) {
        var item = _iterator__ex2g4s_0.i();
        var tmp$ret$0 = decodeURLQueryComponent(item, VOID, VOID, true);
        destination.e(tmp$ret$0);
      }
      _this__u8e3s4.g27(tmp, destination);
    }
  }
  function NoContent() {
    OutgoingContent.call(this);
  }
  function ReadChannelContent() {
    OutgoingContent.call(this);
  }
  function WriteChannelContent() {
  }
  function ByteArrayContent() {
    OutgoingContent.call(this);
  }
  function ProtocolUpgrade() {
  }
  function ContentWrapper() {
  }
  protoOf(ContentWrapper).r2m = function () {
    return this.q2m_1;
  };
  function OutgoingContent() {
    this.g2m_1 = null;
  }
  protoOf(OutgoingContent).h2m = function () {
    return null;
  };
  protoOf(OutgoingContent).i2m = function () {
    return null;
  };
  protoOf(OutgoingContent).c2h = function () {
    return Companion_getInstance_1().w2c_1;
  };
  function NullBody() {
  }
  var NullBody_instance;
  function NullBody_getInstance() {
    return NullBody_instance;
  }
  function TextContent(text, contentType, status) {
    status = status === VOID ? null : status;
    ByteArrayContent.call(this);
    this.t2m_1 = text;
    this.u2m_1 = contentType;
    this.v2m_1 = status;
    var tmp = this;
    var tmp0_elvis_lhs = charset(this.u2m_1);
    tmp.w2m_1 = toByteArray(this.t2m_1, tmp0_elvis_lhs == null ? Charsets_getInstance().n1j_1 : tmp0_elvis_lhs);
  }
  protoOf(TextContent).h2m = function () {
    return this.u2m_1;
  };
  protoOf(TextContent).i2m = function () {
    return toLong_0(this.w2m_1.length);
  };
  protoOf(TextContent).o2m = function () {
    return this.w2m_1;
  };
  protoOf(TextContent).toString = function () {
    return 'TextContent[' + this.u2m_1.toString() + '] "' + take(this.t2m_1, 30) + '"';
  };
  function get_origin(_this__u8e3s4) {
    return PlatformUtils_getInstance().q26_1 ? locationOrigin() : 'http://localhost';
  }
  function locationOrigin() {
    return function () {
      var tmpLocation = null;
      if (typeof window !== 'undefined') {
        tmpLocation = window.location;
      } else if (typeof self !== 'undefined') {
        tmpLocation = self.location;
      }
      var origin = '';
      if (tmpLocation) {
        origin = tmpLocation.origin;
      }
      return origin && origin != 'null' ? origin : 'http://localhost';
    }();
  }
  //region block: post-declaration
  protoOf(EmptyHeaders).yd = get;
  protoOf(EmptyHeaders).c27 = forEach;
  protoOf(EmptyParameters).c27 = forEach;
  //endregion
  //region block: init
  Companion_instance_0 = new Companion_0();
  EmptyHeaders_instance = new EmptyHeaders();
  EmptyParameters_instance = new EmptyParameters();
  Companion_instance_8 = new Companion_8();
  NullBody_instance = new NullBody();
  //endregion
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = NullBody_instance;
  _.$_$.b = Application_getInstance;
  _.$_$.c = Text_getInstance;
  _.$_$.d = Companion_getInstance_1;
  _.$_$.e = HttpHeaders_getInstance;
  _.$_$.f = Companion_getInstance_2;
  _.$_$.g = Companion_getInstance_3;
  _.$_$.h = Companion_getInstance_4;
  _.$_$.i = NullBody;
  _.$_$.j = ByteArrayContent;
  _.$_$.k = ContentWrapper;
  _.$_$.l = NoContent;
  _.$_$.m = ProtocolUpgrade;
  _.$_$.n = ReadChannelContent;
  _.$_$.o = WriteChannelContent;
  _.$_$.p = OutgoingContent;
  _.$_$.q = TextContent;
  _.$_$.r = HeadersBuilder;
  _.$_$.s = HttpStatusCode;
  _.$_$.t = URLBuilder;
  _.$_$.u = UnsafeHeaderException;
  _.$_$.v = get_authority;
  _.$_$.w = get_authority_0;
  _.$_$.x = charset_0;
  _.$_$.y = charset;
  _.$_$.z = contentLength;
  _.$_$.a1 = contentType;
  _.$_$.b1 = contentType_0;
  _.$_$.c1 = isSecure;
  _.$_$.d1 = takeFrom_0;
  _.$_$.e1 = takeFrom;
  _.$_$.f1 = withCharset;
  //endregion
  return _;
}));

//# sourceMappingURL=ktor-ktor-http.js.map
