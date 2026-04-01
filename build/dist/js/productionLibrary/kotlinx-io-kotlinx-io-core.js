(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'));
  else {
    if (typeof globalThis['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'kotlinx-io-kotlinx-io-core'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'kotlinx-io-kotlinx-io-core'.");
    }
    globalThis['kotlinx-io-kotlinx-io-core'] = factory(typeof globalThis['kotlinx-io-kotlinx-io-core'] === 'undefined' ? {} : globalThis['kotlinx-io-kotlinx-io-core'], globalThis['kotlin-kotlin-stdlib']);
  }
}(function (_, kotlin_kotlin) {
  'use strict';
  //region block: imports
  var imul = Math.imul;
  var IndexOutOfBoundsException_init_$Create$ = kotlin_kotlin.$_$.b2;
  var Long = kotlin_kotlin.$_$.xf;
  var IllegalArgumentException_init_$Create$ = kotlin_kotlin.$_$.u1;
  var _Char___init__impl__6a9atx = kotlin_kotlin.$_$.o2;
  var charArrayOf = kotlin_kotlin.$_$.fa;
  var protoOf = kotlin_kotlin.$_$.xb;
  var toString = kotlin_kotlin.$_$.bc;
  var Unit_instance = kotlin_kotlin.$_$.f5;
  var toShort = kotlin_kotlin.$_$.ac;
  var ensureNotNull = kotlin_kotlin.$_$.ug;
  var toLong = kotlin_kotlin.$_$.zb;
  var StringBuilder_init_$Create$ = kotlin_kotlin.$_$.h1;
  var initMetadataForClass = kotlin_kotlin.$_$.ta;
  var VOID = kotlin_kotlin.$_$.h;
  var IllegalStateException_init_$Create$ = kotlin_kotlin.$_$.y1;
  var objectCreate = kotlin_kotlin.$_$.wb;
  var initMetadataForCompanion = kotlin_kotlin.$_$.ua;
  var arrayCopy = kotlin_kotlin.$_$.u5;
  var toByte = kotlin_kotlin.$_$.yb;
  var IllegalArgumentException_init_$Create$_0 = kotlin_kotlin.$_$.s1;
  var initMetadataForObject = kotlin_kotlin.$_$.za;
  var initMetadataForInterface = kotlin_kotlin.$_$.xa;
  var charSequenceGet = kotlin_kotlin.$_$.ha;
  var Char__toInt_impl_vasixd = kotlin_kotlin.$_$.u2;
  var charArray = kotlin_kotlin.$_$.ga;
  var numberToChar = kotlin_kotlin.$_$.sb;
  var concatToString = kotlin_kotlin.$_$.bd;
  var Exception_init_$Init$ = kotlin_kotlin.$_$.m1;
  var captureStack = kotlin_kotlin.$_$.ea;
  var Exception_init_$Init$_0 = kotlin_kotlin.$_$.n1;
  var Exception_init_$Init$_1 = kotlin_kotlin.$_$.o1;
  var Exception = kotlin_kotlin.$_$.uf;
  //endregion
  //region block: pre-declaration
  initMetadataForInterface(Source, 'Source');
  function write$default(source, startIndex, endIndex, $super) {
    startIndex = startIndex === VOID ? 0 : startIndex;
    endIndex = endIndex === VOID ? source.length : endIndex;
    var tmp;
    if ($super === VOID) {
      this.n19(source, startIndex, endIndex);
      tmp = Unit_instance;
    } else {
      tmp = $super.n19.call(this, source, startIndex, endIndex);
    }
    return tmp;
  }
  initMetadataForInterface(Sink, 'Sink');
  initMetadataForClass(Buffer, 'Buffer', Buffer, VOID, [Source, Sink]);
  initMetadataForClass(PeekSource, 'PeekSource');
  initMetadataForClass(RealSource, 'RealSource', VOID, VOID, [Source]);
  initMetadataForCompanion(Companion);
  initMetadataForClass(Segment, 'Segment');
  initMetadataForClass(SegmentCopyTracker, 'SegmentCopyTracker');
  initMetadataForObject(AlwaysSharedCopyTracker, 'AlwaysSharedCopyTracker', VOID, SegmentCopyTracker);
  initMetadataForObject(UnsafeBufferOperations, 'UnsafeBufferOperations');
  initMetadataForClass(SegmentReadContextImpl$1);
  initMetadataForClass(SegmentWriteContextImpl$1);
  initMetadataForClass(BufferIterationContextImpl$1);
  initMetadataForClass(IOException, 'IOException', IOException_init_$Create$, Exception);
  initMetadataForClass(EOFException, 'EOFException', EOFException_init_$Create$, IOException);
  initMetadataForObject(SegmentPool, 'SegmentPool');
  //endregion
  function get_HEX_DIGIT_CHARS() {
    _init_properties__Util_kt__g8tcl9();
    return HEX_DIGIT_CHARS;
  }
  var HEX_DIGIT_CHARS;
  function checkBounds(size, startIndex, endIndex) {
    _init_properties__Util_kt__g8tcl9();
    if (startIndex.b1(new Long(0, 0)) < 0 || endIndex.b1(size) > 0) {
      throw IndexOutOfBoundsException_init_$Create$('startIndex (' + startIndex.toString() + ') and endIndex (' + endIndex.toString() + ') are not within the range [0..size(' + size.toString() + '))');
    }
    if (startIndex.b1(endIndex) > 0) {
      throw IllegalArgumentException_init_$Create$('startIndex (' + startIndex.toString() + ') > endIndex (' + endIndex.toString() + ')');
    }
  }
  function checkOffsetAndCount(size, offset, byteCount) {
    _init_properties__Util_kt__g8tcl9();
    if (offset.b1(new Long(0, 0)) < 0 || offset.b1(size) > 0 || size.s2(offset).b1(byteCount) < 0 || byteCount.b1(new Long(0, 0)) < 0) {
      throw IllegalArgumentException_init_$Create$('offset (' + offset.toString() + ') and byteCount (' + byteCount.toString() + ') are not within the range [0..size(' + size.toString() + '))');
    }
  }
  var properties_initialized__Util_kt_67kc5b;
  function _init_properties__Util_kt__g8tcl9() {
    if (!properties_initialized__Util_kt_67kc5b) {
      properties_initialized__Util_kt_67kc5b = true;
      // Inline function 'kotlin.charArrayOf' call
      HEX_DIGIT_CHARS = charArrayOf([_Char___init__impl__6a9atx(48), _Char___init__impl__6a9atx(49), _Char___init__impl__6a9atx(50), _Char___init__impl__6a9atx(51), _Char___init__impl__6a9atx(52), _Char___init__impl__6a9atx(53), _Char___init__impl__6a9atx(54), _Char___init__impl__6a9atx(55), _Char___init__impl__6a9atx(56), _Char___init__impl__6a9atx(57), _Char___init__impl__6a9atx(97), _Char___init__impl__6a9atx(98), _Char___init__impl__6a9atx(99), _Char___init__impl__6a9atx(100), _Char___init__impl__6a9atx(101), _Char___init__impl__6a9atx(102)]);
    }
  }
  function throwEof($this, byteCount) {
    throw EOFException_init_$Create$_0("Buffer doesn't contain required number of bytes (size: " + $this.j().toString() + ', required: ' + byteCount.toString() + ')');
  }
  function Buffer() {
    this.z17_1 = null;
    this.a18_1 = null;
    this.b18_1 = new Long(0, 0);
  }
  protoOf(Buffer).j = function () {
    return this.b18_1;
  };
  protoOf(Buffer).c18 = function () {
    return this;
  };
  protoOf(Buffer).d18 = function () {
    return this.j().equals(new Long(0, 0));
  };
  protoOf(Buffer).e18 = function (byteCount) {
    // Inline function 'kotlin.require' call
    if (!(byteCount.b1(new Long(0, 0)) >= 0)) {
      var message = 'byteCount: ' + byteCount.toString();
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    if (this.j().b1(byteCount) < 0) {
      throw EOFException_init_$Create$_0("Buffer doesn't contain required number of bytes (size: " + this.j().toString() + ', required: ' + byteCount.toString() + ')');
    }
  };
  protoOf(Buffer).f18 = function (byteCount) {
    // Inline function 'kotlin.require' call
    if (!(byteCount.b1(new Long(0, 0)) >= 0)) {
      var message = 'byteCount: ' + byteCount.toString() + ' < 0';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return this.j().b1(byteCount) >= 0;
  };
  protoOf(Buffer).g18 = function () {
    var tmp0_elvis_lhs = this.z17_1;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throwEof(this, new Long(1, 0));
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var segment = tmp;
    var segmentSize = segment.o18();
    if (segmentSize === 0) {
      this.p18();
      return this.g18();
    }
    var v = segment.q18();
    this.b18_1 = this.b18_1.s2(new Long(1, 0));
    if (segmentSize === 1) {
      this.p18();
    }
    return v;
  };
  protoOf(Buffer).r18 = function () {
    var tmp0_elvis_lhs = this.z17_1;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throwEof(this, new Long(2, 0));
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var segment = tmp;
    var segmentSize = segment.o18();
    if (segmentSize < 2) {
      this.e18(new Long(2, 0));
      if (segmentSize === 0) {
        this.p18();
        return this.r18();
      }
      // Inline function 'kotlinx.io.and' call
      var tmp_0 = (this.g18() & 255) << 8;
      // Inline function 'kotlinx.io.and' call
      var tmp$ret$1 = this.g18() & 255;
      return toShort(tmp_0 | tmp$ret$1);
    }
    var v = segment.s18();
    this.b18_1 = this.b18_1.s2(new Long(2, 0));
    if (segmentSize === 2) {
      this.p18();
    }
    return v;
  };
  protoOf(Buffer).t18 = function () {
    return Unit_instance;
  };
  protoOf(Buffer).u18 = function (out, startIndex, endIndex) {
    checkBounds(this.j(), startIndex, endIndex);
    if (startIndex.equals(endIndex))
      return Unit_instance;
    var currentOffset = startIndex;
    var remainingByteCount = endIndex.s2(startIndex);
    out.b18_1 = out.b18_1.r2(remainingByteCount);
    var s = this.z17_1;
    while (currentOffset.b1(toLong(ensureNotNull(s).j18_1 - s.i18_1 | 0)) >= 0) {
      currentOffset = currentOffset.s2(toLong(s.j18_1 - s.i18_1 | 0));
      s = s.m18_1;
    }
    while (remainingByteCount.b1(new Long(0, 0)) > 0) {
      var copy = ensureNotNull(s).v18();
      copy.i18_1 = copy.i18_1 + currentOffset.g1() | 0;
      var tmp = copy;
      var tmp0 = copy.i18_1 + remainingByteCount.g1() | 0;
      // Inline function 'kotlin.comparisons.minOf' call
      var b = copy.j18_1;
      tmp.j18_1 = Math.min(tmp0, b);
      // Inline function 'kotlinx.io.Buffer.pushSegment' call
      if (out.z17_1 == null) {
        out.z17_1 = copy;
        out.a18_1 = copy;
      } else if (false) {
        out.a18_1 = ensureNotNull(out.a18_1).w18(copy).x18();
        if (ensureNotNull(out.a18_1).n18_1 == null) {
          out.z17_1 = out.a18_1;
        }
      } else {
        out.a18_1 = ensureNotNull(out.a18_1).w18(copy);
      }
      remainingByteCount = remainingByteCount.s2(toLong(copy.j18_1 - copy.i18_1 | 0));
      currentOffset = new Long(0, 0);
      s = s.m18_1;
    }
  };
  protoOf(Buffer).y18 = function () {
    var result = this.j();
    if (result.equals(new Long(0, 0)))
      return new Long(0, 0);
    var tail = ensureNotNull(this.a18_1);
    if (tail.j18_1 < 8192 && tail.l18_1) {
      result = result.s2(toLong(tail.j18_1 - tail.i18_1 | 0));
    }
    return result;
  };
  protoOf(Buffer).z18 = function (position) {
    if (position.b1(new Long(0, 0)) < 0 || position.b1(this.j()) >= 0) {
      throw IndexOutOfBoundsException_init_$Create$('position (' + position.toString() + ') is not within the range [0..size(' + this.j().toString() + '))');
    }
    if (position.equals(new Long(0, 0))) {
      return ensureNotNull(this.z17_1).a19(0);
    }
    // Inline function 'kotlinx.io.seek' call
    if (this.z17_1 == null) {
      var offset = new Long(-1, -1);
      return ensureNotNull(null).a19(position.s2(offset).g1());
    }
    if (this.j().s2(position).b1(position) < 0) {
      var s = this.a18_1;
      var offset_0 = this.j();
      $l$loop: while (!(s == null) && offset_0.b1(position) > 0) {
        offset_0 = offset_0.s2(toLong(s.j18_1 - s.i18_1 | 0));
        if (offset_0.b1(position) <= 0)
          break $l$loop;
        s = s.n18_1;
      }
      var tmp4 = s;
      var offset_1 = offset_0;
      return ensureNotNull(tmp4).a19(position.s2(offset_1).g1());
    } else {
      var s_0 = this.z17_1;
      var offset_2 = new Long(0, 0);
      $l$loop_0: while (!(s_0 == null)) {
        var tmp0 = offset_2;
        // Inline function 'kotlin.Long.plus' call
        var other = s_0.j18_1 - s_0.i18_1 | 0;
        var nextOffset = tmp0.r2(toLong(other));
        if (nextOffset.b1(position) > 0)
          break $l$loop_0;
        s_0 = s_0.m18_1;
        offset_2 = nextOffset;
      }
      var tmp6 = s_0;
      var offset_3 = offset_2;
      return ensureNotNull(tmp6).a19(position.s2(offset_3).g1());
    }
  };
  protoOf(Buffer).y1 = function () {
    return this.b19(this.j());
  };
  protoOf(Buffer).b19 = function (byteCount) {
    // Inline function 'kotlinx.io.checkByteCount' call
    // Inline function 'kotlin.require' call
    if (!(byteCount.b1(new Long(0, 0)) >= 0)) {
      var message = 'byteCount (' + byteCount.toString() + ') < 0';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    var remainingByteCount = byteCount;
    while (remainingByteCount.b1(new Long(0, 0)) > 0) {
      var tmp0_elvis_lhs = this.z17_1;
      var tmp;
      if (tmp0_elvis_lhs == null) {
        throw EOFException_init_$Create$_0('Buffer exhausted before skipping ' + byteCount.toString() + ' bytes.');
      } else {
        tmp = tmp0_elvis_lhs;
      }
      var head = tmp;
      var tmp1 = remainingByteCount;
      // Inline function 'kotlinx.io.minOf' call
      var b = head.j18_1 - head.i18_1 | 0;
      // Inline function 'kotlin.comparisons.minOf' call
      var b_0 = toLong(b);
      var toSkip = (tmp1.b1(b_0) <= 0 ? tmp1 : b_0).g1();
      this.b18_1 = this.b18_1.s2(toLong(toSkip));
      remainingByteCount = remainingByteCount.s2(toLong(toSkip));
      head.i18_1 = head.i18_1 + toSkip | 0;
      if (head.i18_1 === head.j18_1) {
        this.p18();
      }
    }
  };
  protoOf(Buffer).c19 = function (sink, startIndex, endIndex) {
    // Inline function 'kotlinx.io.checkBounds' call
    var size = sink.length;
    checkBounds(toLong(size), toLong(startIndex), toLong(endIndex));
    var tmp0_elvis_lhs = this.z17_1;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return -1;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var s = tmp;
    var tmp3 = endIndex - startIndex | 0;
    // Inline function 'kotlin.comparisons.minOf' call
    var b = s.o18();
    var toCopy = Math.min(tmp3, b);
    s.d19(sink, startIndex, startIndex + toCopy | 0);
    this.b18_1 = this.b18_1.s2(toLong(toCopy));
    if (isEmpty(s)) {
      this.p18();
    }
    return toCopy;
  };
  protoOf(Buffer).e19 = function (sink, byteCount) {
    // Inline function 'kotlinx.io.checkByteCount' call
    // Inline function 'kotlin.require' call
    if (!(byteCount.b1(new Long(0, 0)) >= 0)) {
      var message = 'byteCount (' + byteCount.toString() + ') < 0';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    if (this.j().equals(new Long(0, 0)))
      return new Long(-1, -1);
    var bytesWritten = byteCount.b1(this.j()) > 0 ? this.j() : byteCount;
    sink.f19(this, bytesWritten);
    return bytesWritten;
  };
  protoOf(Buffer).g19 = function (sink, byteCount) {
    // Inline function 'kotlinx.io.checkByteCount' call
    // Inline function 'kotlin.require' call
    if (!(byteCount.b1(new Long(0, 0)) >= 0)) {
      var message = 'byteCount (' + byteCount.toString() + ') < 0';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    if (this.j().b1(byteCount) < 0) {
      sink.f19(this, this.j());
      throw EOFException_init_$Create$_0('Buffer exhausted before writing ' + byteCount.toString() + ' bytes. Only ' + this.j().toString() + ' bytes were written.');
    }
    sink.f19(this, byteCount);
  };
  protoOf(Buffer).h19 = function (sink) {
    var byteCount = this.j();
    if (byteCount.b1(new Long(0, 0)) > 0) {
      sink.f19(this, byteCount);
    }
    return byteCount;
  };
  protoOf(Buffer).i19 = function () {
    return buffered(new PeekSource(this));
  };
  protoOf(Buffer).j19 = function (minimumCapacity) {
    // Inline function 'kotlin.require' call
    if (!(minimumCapacity >= 1 && minimumCapacity <= 8192)) {
      var message = 'unexpected capacity';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    if (this.a18_1 == null) {
      var result = SegmentPool_instance.m19();
      this.z17_1 = result;
      this.a18_1 = result;
      return result;
    }
    var t = ensureNotNull(this.a18_1);
    if ((t.j18_1 + minimumCapacity | 0) > 8192 || !t.l18_1) {
      var newTail = t.w18(SegmentPool_instance.m19());
      this.a18_1 = newTail;
      return newTail;
    }
    return t;
  };
  protoOf(Buffer).n19 = function (source, startIndex, endIndex) {
    // Inline function 'kotlinx.io.checkBounds' call
    var size = source.length;
    checkBounds(toLong(size), toLong(startIndex), toLong(endIndex));
    var currentOffset = startIndex;
    while (currentOffset < endIndex) {
      var tail = this.j19(1);
      var tmp3 = endIndex - currentOffset | 0;
      // Inline function 'kotlin.comparisons.minOf' call
      var b = tail.o19();
      var toCopy = Math.min(tmp3, b);
      tail.p19(source, currentOffset, currentOffset + toCopy | 0);
      currentOffset = currentOffset + toCopy | 0;
    }
    var tmp = this;
    var tmp5 = this.b18_1;
    // Inline function 'kotlin.Long.plus' call
    var other = endIndex - startIndex | 0;
    tmp.b18_1 = tmp5.r2(toLong(other));
  };
  protoOf(Buffer).f19 = function (source, byteCount) {
    // Inline function 'kotlin.require' call
    if (!!(source === this)) {
      var message = 'source == this';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    checkOffsetAndCount(source.b18_1, new Long(0, 0), byteCount);
    var remainingByteCount = byteCount;
    while (remainingByteCount.b1(new Long(0, 0)) > 0) {
      if (remainingByteCount.b1(toLong(ensureNotNull(source.z17_1).o18())) < 0) {
        var tail = this.a18_1;
        var tmp;
        if (!(tail == null) && tail.l18_1) {
          var tmp1 = remainingByteCount;
          // Inline function 'kotlin.Long.plus' call
          var other = tail.j18_1;
          var tmp3 = tmp1.r2(toLong(other));
          // Inline function 'kotlin.Long.minus' call
          var other_0 = tail.r19() ? 0 : tail.i18_1;
          tmp = tmp3.s2(toLong(other_0)).b1(new Long(8192, 0)) <= 0;
        } else {
          tmp = false;
        }
        if (tmp) {
          ensureNotNull(source.z17_1).t19(tail, remainingByteCount.g1());
          source.b18_1 = source.b18_1.s2(remainingByteCount);
          this.b18_1 = this.b18_1.r2(remainingByteCount);
          return Unit_instance;
        } else {
          source.z17_1 = ensureNotNull(source.z17_1).s19(remainingByteCount.g1());
        }
      }
      var segmentToMove = ensureNotNull(source.z17_1);
      var movedByteCount = toLong(segmentToMove.o18());
      source.z17_1 = segmentToMove.u19();
      if (source.z17_1 == null) {
        source.a18_1 = null;
      }
      // Inline function 'kotlinx.io.Buffer.pushSegment' call
      if (this.z17_1 == null) {
        this.z17_1 = segmentToMove;
        this.a18_1 = segmentToMove;
      } else if (true) {
        this.a18_1 = ensureNotNull(this.a18_1).w18(segmentToMove).x18();
        if (ensureNotNull(this.a18_1).n18_1 == null) {
          this.z17_1 = this.a18_1;
        }
      } else {
        this.a18_1 = ensureNotNull(this.a18_1).w18(segmentToMove);
      }
      source.b18_1 = source.b18_1.s2(movedByteCount);
      this.b18_1 = this.b18_1.r2(movedByteCount);
      remainingByteCount = remainingByteCount.s2(movedByteCount);
    }
  };
  protoOf(Buffer).v19 = function (source) {
    var totalBytesRead = new Long(0, 0);
    $l$loop: while (true) {
      var readCount = source.e19(this, new Long(8192, 0));
      if (readCount.equals(new Long(-1, -1)))
        break $l$loop;
      totalBytesRead = totalBytesRead.r2(readCount);
    }
    return totalBytesRead;
  };
  protoOf(Buffer).w19 = function (byte) {
    this.j19(1).x19(byte);
    this.b18_1 = this.b18_1.r2(new Long(1, 0));
  };
  protoOf(Buffer).y19 = function (short) {
    this.j19(2).z19(short);
    this.b18_1 = this.b18_1.r2(new Long(2, 0));
  };
  protoOf(Buffer).z3 = function () {
    return Unit_instance;
  };
  protoOf(Buffer).toString = function () {
    if (this.j().equals(new Long(0, 0)))
      return 'Buffer(size=0)';
    var maxPrintableBytes = 64;
    // Inline function 'kotlinx.io.minOf' call
    var b = this.j();
    // Inline function 'kotlin.comparisons.minOf' call
    var a = toLong(maxPrintableBytes);
    var len = (a.b1(b) <= 0 ? a : b).g1();
    var builder = StringBuilder_init_$Create$(imul(len, 2) + (this.j().b1(toLong(maxPrintableBytes)) > 0 ? 1 : 0) | 0);
    var bytesWritten = 0;
    // Inline function 'kotlinx.io.unsafe.UnsafeBufferOperations.forEachSegment' call
    var curr = this.z17_1;
    while (!(curr == null)) {
      var tmp4 = get_SegmentReadContextImpl();
      var segment = curr;
      var idx = 0;
      while (bytesWritten < len && idx < segment.o18()) {
        var _unary__edvuaz = idx;
        idx = _unary__edvuaz + 1 | 0;
        var b_0 = tmp4.a1a(segment, _unary__edvuaz);
        bytesWritten = bytesWritten + 1 | 0;
        var tmp = get_HEX_DIGIT_CHARS();
        // Inline function 'kotlinx.io.shr' call
        var tmp$ret$2 = b_0 >> 4;
        var tmp_0 = builder.a8(tmp[tmp$ret$2 & 15]);
        var tmp_1 = get_HEX_DIGIT_CHARS();
        // Inline function 'kotlinx.io.and' call
        var tmp$ret$3 = b_0 & 15;
        tmp_0.a8(tmp_1[tmp$ret$3]);
      }
      curr = curr.m18_1;
    }
    if (this.j().b1(toLong(maxPrintableBytes)) > 0) {
      builder.a8(_Char___init__impl__6a9atx(8230));
    }
    return 'Buffer(size=' + this.j().toString() + ' hex=' + builder.toString() + ')';
  };
  protoOf(Buffer).p18 = function () {
    var oldHead = ensureNotNull(this.z17_1);
    var nextHead = oldHead.m18_1;
    this.z17_1 = nextHead;
    if (nextHead == null) {
      this.a18_1 = null;
    } else {
      nextHead.n18_1 = null;
    }
    oldHead.m18_1 = null;
    SegmentPool_instance.b1a(oldHead);
  };
  protoOf(Buffer).c1a = function () {
    var oldTail = ensureNotNull(this.a18_1);
    var newTail = oldTail.n18_1;
    this.a18_1 = newTail;
    if (newTail == null) {
      this.z17_1 = null;
    } else {
      newTail.m18_1 = null;
    }
    oldTail.n18_1 = null;
    SegmentPool_instance.b1a(oldTail);
  };
  function buffered(_this__u8e3s4) {
    return new RealSource(_this__u8e3s4);
  }
  function PeekSource(upstream) {
    this.d1a_1 = upstream;
    this.e1a_1 = this.d1a_1.c18();
    this.f1a_1 = this.e1a_1.z17_1;
    var tmp = this;
    var tmp0_safe_receiver = this.e1a_1.z17_1;
    var tmp0_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.i18_1;
    tmp.g1a_1 = tmp0_elvis_lhs == null ? -1 : tmp0_elvis_lhs;
    this.h1a_1 = false;
    this.i1a_1 = new Long(0, 0);
  }
  protoOf(PeekSource).e19 = function (sink, byteCount) {
    // Inline function 'kotlin.check' call
    if (!!this.h1a_1) {
      var message = 'Source is closed.';
      throw IllegalStateException_init_$Create$(toString(message));
    }
    // Inline function 'kotlinx.io.checkByteCount' call
    // Inline function 'kotlin.require' call
    if (!(byteCount.b1(new Long(0, 0)) >= 0)) {
      var message_0 = 'byteCount (' + byteCount.toString() + ') < 0';
      throw IllegalArgumentException_init_$Create$(toString(message_0));
    }
    // Inline function 'kotlin.check' call
    if (!(this.f1a_1 == null || (this.f1a_1 === this.e1a_1.z17_1 && this.g1a_1 === ensureNotNull(this.e1a_1.z17_1).i18_1))) {
      var message_1 = 'Peek source is invalid because upstream source was used';
      throw IllegalStateException_init_$Create$(toString(message_1));
    }
    if (byteCount.equals(new Long(0, 0)))
      return new Long(0, 0);
    // Inline function 'kotlin.Long.plus' call
    var tmp$ret$7 = this.i1a_1.r2(toLong(1));
    if (!this.d1a_1.f18(tmp$ret$7))
      return new Long(-1, -1);
    if (this.f1a_1 == null && !(this.e1a_1.z17_1 == null)) {
      this.f1a_1 = this.e1a_1.z17_1;
      this.g1a_1 = ensureNotNull(this.e1a_1.z17_1).i18_1;
    }
    // Inline function 'kotlin.comparisons.minOf' call
    var b = this.e1a_1.j().s2(this.i1a_1);
    var toCopy = byteCount.b1(b) <= 0 ? byteCount : b;
    this.e1a_1.u18(sink, this.i1a_1, this.i1a_1.r2(toCopy));
    this.i1a_1 = this.i1a_1.r2(toCopy);
    return toCopy;
  };
  protoOf(PeekSource).z3 = function () {
    this.h1a_1 = true;
  };
  function RealSource(source) {
    this.j1a_1 = source;
    this.k1a_1 = false;
    this.l1a_1 = new Buffer();
  }
  protoOf(RealSource).c18 = function () {
    return this.l1a_1;
  };
  protoOf(RealSource).e19 = function (sink, byteCount) {
    // Inline function 'kotlinx.io.RealSource.checkNotClosed' call
    // Inline function 'kotlin.check' call
    if (!!this.k1a_1) {
      var message = 'Source is closed.';
      throw IllegalStateException_init_$Create$(toString(message));
    }
    // Inline function 'kotlin.require' call
    if (!(byteCount.b1(new Long(0, 0)) >= 0)) {
      var message_0 = 'byteCount: ' + byteCount.toString();
      throw IllegalArgumentException_init_$Create$(toString(message_0));
    }
    if (this.l1a_1.j().equals(new Long(0, 0))) {
      var read = this.j1a_1.e19(this.l1a_1, new Long(8192, 0));
      if (read.equals(new Long(-1, -1)))
        return new Long(-1, -1);
    }
    // Inline function 'kotlin.comparisons.minOf' call
    var b = this.l1a_1.j();
    var toRead = byteCount.b1(b) <= 0 ? byteCount : b;
    return this.l1a_1.e19(sink, toRead);
  };
  protoOf(RealSource).d18 = function () {
    // Inline function 'kotlinx.io.RealSource.checkNotClosed' call
    // Inline function 'kotlin.check' call
    if (!!this.k1a_1) {
      var message = 'Source is closed.';
      throw IllegalStateException_init_$Create$(toString(message));
    }
    return this.l1a_1.d18() && this.j1a_1.e19(this.l1a_1, new Long(8192, 0)).equals(new Long(-1, -1));
  };
  protoOf(RealSource).e18 = function (byteCount) {
    if (!this.f18(byteCount))
      throw EOFException_init_$Create$_0("Source doesn't contain required number of bytes (" + byteCount.toString() + ').');
  };
  protoOf(RealSource).f18 = function (byteCount) {
    // Inline function 'kotlinx.io.RealSource.checkNotClosed' call
    // Inline function 'kotlin.check' call
    if (!!this.k1a_1) {
      var message = 'Source is closed.';
      throw IllegalStateException_init_$Create$(toString(message));
    }
    // Inline function 'kotlin.require' call
    if (!(byteCount.b1(new Long(0, 0)) >= 0)) {
      var message_0 = 'byteCount: ' + byteCount.toString();
      throw IllegalArgumentException_init_$Create$(toString(message_0));
    }
    while (this.l1a_1.j().b1(byteCount) < 0) {
      if (this.j1a_1.e19(this.l1a_1, new Long(8192, 0)).equals(new Long(-1, -1)))
        return false;
    }
    return true;
  };
  protoOf(RealSource).g18 = function () {
    this.e18(new Long(1, 0));
    return this.l1a_1.g18();
  };
  protoOf(RealSource).c19 = function (sink, startIndex, endIndex) {
    // Inline function 'kotlinx.io.checkBounds' call
    var size = sink.length;
    checkBounds(toLong(size), toLong(startIndex), toLong(endIndex));
    if (this.l1a_1.j().equals(new Long(0, 0))) {
      var read = this.j1a_1.e19(this.l1a_1, new Long(8192, 0));
      if (read.equals(new Long(-1, -1)))
        return -1;
    }
    var tmp3 = endIndex - startIndex | 0;
    // Inline function 'kotlinx.io.minOf' call
    var b = this.l1a_1.j();
    // Inline function 'kotlin.comparisons.minOf' call
    var a = toLong(tmp3);
    var toRead = (a.b1(b) <= 0 ? a : b).g1();
    return this.l1a_1.c19(sink, startIndex, startIndex + toRead | 0);
  };
  protoOf(RealSource).g19 = function (sink, byteCount) {
    try {
      this.e18(byteCount);
    } catch ($p) {
      if ($p instanceof EOFException) {
        var e = $p;
        sink.f19(this.l1a_1, this.l1a_1.j());
        throw e;
      } else {
        throw $p;
      }
    }
    this.l1a_1.g19(sink, byteCount);
  };
  protoOf(RealSource).h19 = function (sink) {
    var totalBytesWritten = new Long(0, 0);
    while (!this.j1a_1.e19(this.l1a_1, new Long(8192, 0)).equals(new Long(-1, -1))) {
      var emitByteCount = this.l1a_1.y18();
      if (emitByteCount.b1(new Long(0, 0)) > 0) {
        totalBytesWritten = totalBytesWritten.r2(emitByteCount);
        sink.f19(this.l1a_1, emitByteCount);
      }
    }
    if (this.l1a_1.j().b1(new Long(0, 0)) > 0) {
      totalBytesWritten = totalBytesWritten.r2(this.l1a_1.j());
      sink.f19(this.l1a_1, this.l1a_1.j());
    }
    return totalBytesWritten;
  };
  protoOf(RealSource).r18 = function () {
    this.e18(new Long(2, 0));
    return this.l1a_1.r18();
  };
  protoOf(RealSource).i19 = function () {
    // Inline function 'kotlinx.io.RealSource.checkNotClosed' call
    // Inline function 'kotlin.check' call
    if (!!this.k1a_1) {
      var message = 'Source is closed.';
      throw IllegalStateException_init_$Create$(toString(message));
    }
    return buffered(new PeekSource(this));
  };
  protoOf(RealSource).z3 = function () {
    if (this.k1a_1)
      return Unit_instance;
    this.k1a_1 = true;
    this.j1a_1.z3();
    this.l1a_1.y1();
  };
  protoOf(RealSource).toString = function () {
    return 'buffered(' + toString(this.j1a_1) + ')';
  };
  function Segment_init_$Init$($this) {
    Segment.call($this);
    $this.h18_1 = new Int8Array(8192);
    $this.l18_1 = true;
    $this.k18_1 = null;
    return $this;
  }
  function Segment_init_$Create$() {
    return Segment_init_$Init$(objectCreate(protoOf(Segment)));
  }
  function Segment_init_$Init$_0(data, pos, limit, shareToken, owner, $this) {
    Segment.call($this);
    $this.h18_1 = data;
    $this.i18_1 = pos;
    $this.j18_1 = limit;
    $this.k18_1 = shareToken;
    $this.l18_1 = owner;
    return $this;
  }
  function Segment_init_$Create$_0(data, pos, limit, shareToken, owner) {
    return Segment_init_$Init$_0(data, pos, limit, shareToken, owner, objectCreate(protoOf(Segment)));
  }
  function Companion() {
    this.m1a_1 = 8192;
    this.n1a_1 = 1024;
  }
  protoOf(Companion).o1a = function () {
    return Segment_init_$Create$();
  };
  var Companion_instance;
  function Companion_getInstance() {
    return Companion_instance;
  }
  protoOf(Segment).r19 = function () {
    var tmp1_safe_receiver = this.k18_1;
    var tmp0_elvis_lhs = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.p1a();
    return tmp0_elvis_lhs == null ? false : tmp0_elvis_lhs;
  };
  protoOf(Segment).v18 = function () {
    var tmp0_elvis_lhs = this.k18_1;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      // Inline function 'kotlin.also' call
      var this_0 = SegmentPool_instance.q1a();
      this.k18_1 = this_0;
      tmp = this_0;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var t = tmp;
    var tmp_0 = this.i18_1;
    var tmp_1 = this.j18_1;
    // Inline function 'kotlin.also' call
    t.r1a();
    return Segment_init_$Create$_0(this.h18_1, tmp_0, tmp_1, t, false);
  };
  protoOf(Segment).u19 = function () {
    var result = this.m18_1;
    if (!(this.n18_1 == null)) {
      ensureNotNull(this.n18_1).m18_1 = this.m18_1;
    }
    if (!(this.m18_1 == null)) {
      ensureNotNull(this.m18_1).n18_1 = this.n18_1;
    }
    this.m18_1 = null;
    this.n18_1 = null;
    return result;
  };
  protoOf(Segment).w18 = function (segment) {
    segment.n18_1 = this;
    segment.m18_1 = this.m18_1;
    if (!(this.m18_1 == null)) {
      ensureNotNull(this.m18_1).n18_1 = segment;
    }
    this.m18_1 = segment;
    return segment;
  };
  protoOf(Segment).s19 = function (byteCount) {
    // Inline function 'kotlin.require' call
    if (!(byteCount > 0 && byteCount <= (this.j18_1 - this.i18_1 | 0))) {
      var message = 'byteCount out of range';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    var prefix;
    if (byteCount >= 1024) {
      prefix = this.v18();
    } else {
      prefix = SegmentPool_instance.m19();
      var tmp1 = this.h18_1;
      var tmp2 = prefix.h18_1;
      var tmp3 = this.i18_1;
      // Inline function 'kotlin.collections.copyInto' call
      var endIndex = this.i18_1 + byteCount | 0;
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      var tmp = tmp1;
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      arrayCopy(tmp, tmp2, 0, tmp3, endIndex);
    }
    prefix.j18_1 = prefix.i18_1 + byteCount | 0;
    this.i18_1 = this.i18_1 + byteCount | 0;
    if (!(this.n18_1 == null)) {
      ensureNotNull(this.n18_1).w18(prefix);
    } else {
      prefix.m18_1 = this;
      this.n18_1 = prefix;
    }
    return prefix;
  };
  protoOf(Segment).x18 = function () {
    // Inline function 'kotlin.check' call
    if (!!(this.n18_1 == null)) {
      var message = 'cannot compact';
      throw IllegalStateException_init_$Create$(toString(message));
    }
    if (!ensureNotNull(this.n18_1).l18_1)
      return this;
    var byteCount = this.j18_1 - this.i18_1 | 0;
    var availableByteCount = (8192 - ensureNotNull(this.n18_1).j18_1 | 0) + (ensureNotNull(this.n18_1).r19() ? 0 : ensureNotNull(this.n18_1).i18_1) | 0;
    if (byteCount > availableByteCount)
      return this;
    var predecessor = this.n18_1;
    this.t19(ensureNotNull(predecessor), byteCount);
    var successor = this.u19();
    // Inline function 'kotlin.check' call
    if (!(successor == null)) {
      throw IllegalStateException_init_$Create$('Check failed.');
    }
    SegmentPool_instance.b1a(this);
    return predecessor;
  };
  protoOf(Segment).x19 = function (byte) {
    var _unary__edvuaz = this.j18_1;
    this.j18_1 = _unary__edvuaz + 1 | 0;
    this.h18_1[_unary__edvuaz] = byte;
  };
  protoOf(Segment).z19 = function (short) {
    var data = this.h18_1;
    var limit = this.j18_1;
    var _unary__edvuaz = limit;
    limit = _unary__edvuaz + 1 | 0;
    data[_unary__edvuaz] = toByte((short >>> 8 | 0) & 255);
    var _unary__edvuaz_0 = limit;
    limit = _unary__edvuaz_0 + 1 | 0;
    data[_unary__edvuaz_0] = toByte(short & 255);
    this.j18_1 = limit;
  };
  protoOf(Segment).q18 = function () {
    var _unary__edvuaz = this.i18_1;
    this.i18_1 = _unary__edvuaz + 1 | 0;
    return this.h18_1[_unary__edvuaz];
  };
  protoOf(Segment).s18 = function () {
    var data = this.h18_1;
    var pos = this.i18_1;
    var _unary__edvuaz = pos;
    pos = _unary__edvuaz + 1 | 0;
    // Inline function 'kotlinx.io.and' call
    var tmp = (data[_unary__edvuaz] & 255) << 8;
    var _unary__edvuaz_0 = pos;
    pos = _unary__edvuaz_0 + 1 | 0;
    // Inline function 'kotlinx.io.and' call
    var tmp$ret$1 = data[_unary__edvuaz_0] & 255;
    var s = toShort(tmp | tmp$ret$1);
    this.i18_1 = pos;
    return s;
  };
  protoOf(Segment).t19 = function (sink, byteCount) {
    // Inline function 'kotlin.check' call
    if (!sink.l18_1) {
      var message = 'only owner can write';
      throw IllegalStateException_init_$Create$(toString(message));
    }
    if ((sink.j18_1 + byteCount | 0) > 8192) {
      if (sink.r19())
        throw IllegalArgumentException_init_$Create$_0();
      if (((sink.j18_1 + byteCount | 0) - sink.i18_1 | 0) > 8192)
        throw IllegalArgumentException_init_$Create$_0();
      var tmp1 = sink.h18_1;
      var tmp2 = sink.h18_1;
      var tmp3 = sink.i18_1;
      // Inline function 'kotlin.collections.copyInto' call
      var endIndex = sink.j18_1;
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      var tmp = tmp1;
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      arrayCopy(tmp, tmp2, 0, tmp3, endIndex);
      sink.j18_1 = sink.j18_1 - sink.i18_1 | 0;
      sink.i18_1 = 0;
    }
    var tmp6 = this.h18_1;
    var tmp7 = sink.h18_1;
    var tmp8 = sink.j18_1;
    var tmp9 = this.i18_1;
    // Inline function 'kotlin.collections.copyInto' call
    var endIndex_0 = this.i18_1 + byteCount | 0;
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp_0 = tmp6;
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    arrayCopy(tmp_0, tmp7, tmp8, tmp9, endIndex_0);
    sink.j18_1 = sink.j18_1 + byteCount | 0;
    this.i18_1 = this.i18_1 + byteCount | 0;
  };
  protoOf(Segment).d19 = function (dst, dstStartOffset, dstEndOffset) {
    var len = dstEndOffset - dstStartOffset | 0;
    var tmp0 = this.h18_1;
    var tmp3 = this.i18_1;
    // Inline function 'kotlin.collections.copyInto' call
    var endIndex = this.i18_1 + len | 0;
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp = tmp0;
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    arrayCopy(tmp, dst, dstStartOffset, tmp3, endIndex);
    this.i18_1 = this.i18_1 + len | 0;
  };
  protoOf(Segment).p19 = function (src, srcStartOffset, srcEndOffset) {
    var tmp1 = this.h18_1;
    // Inline function 'kotlin.collections.copyInto' call
    var destinationOffset = this.j18_1;
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp = src;
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    arrayCopy(tmp, tmp1, destinationOffset, srcStartOffset, srcEndOffset);
    this.j18_1 = this.j18_1 + (srcEndOffset - srcStartOffset | 0) | 0;
  };
  protoOf(Segment).o18 = function () {
    return this.j18_1 - this.i18_1 | 0;
  };
  protoOf(Segment).o19 = function () {
    return this.h18_1.length - this.j18_1 | 0;
  };
  protoOf(Segment).s1a = function (readOnly) {
    return this.h18_1;
  };
  protoOf(Segment).a19 = function (index) {
    return this.h18_1[this.i18_1 + index | 0];
  };
  protoOf(Segment).t1a = function (index, value) {
    this.h18_1[this.j18_1 + index | 0] = value;
  };
  protoOf(Segment).u1a = function (index, b0, b1) {
    var d = this.h18_1;
    var l = this.j18_1;
    d[l + index | 0] = b0;
    d[(l + index | 0) + 1 | 0] = b1;
  };
  protoOf(Segment).v1a = function (index, b0, b1, b2) {
    var d = this.h18_1;
    var l = this.j18_1;
    d[l + index | 0] = b0;
    d[(l + index | 0) + 1 | 0] = b1;
    d[(l + index | 0) + 2 | 0] = b2;
  };
  protoOf(Segment).w1a = function (index, b0, b1, b2, b3) {
    var d = this.h18_1;
    var l = this.j18_1;
    d[l + index | 0] = b0;
    d[(l + index | 0) + 1 | 0] = b1;
    d[(l + index | 0) + 2 | 0] = b2;
    d[(l + index | 0) + 3 | 0] = b3;
  };
  function Segment() {
    this.i18_1 = 0;
    this.j18_1 = 0;
    this.k18_1 = null;
    this.l18_1 = false;
    this.m18_1 = null;
    this.n18_1 = null;
  }
  function SegmentCopyTracker() {
  }
  function isEmpty(_this__u8e3s4) {
    return _this__u8e3s4.o18() === 0;
  }
  function AlwaysSharedCopyTracker() {
    AlwaysSharedCopyTracker_instance = this;
    SegmentCopyTracker.call(this);
  }
  protoOf(AlwaysSharedCopyTracker).p1a = function () {
    return true;
  };
  protoOf(AlwaysSharedCopyTracker).r1a = function () {
    return Unit_instance;
  };
  var AlwaysSharedCopyTracker_instance;
  function AlwaysSharedCopyTracker_getInstance() {
    if (AlwaysSharedCopyTracker_instance == null)
      new AlwaysSharedCopyTracker();
    return AlwaysSharedCopyTracker_instance;
  }
  function Sink() {
  }
  function Source() {
  }
  function readByteArray(_this__u8e3s4) {
    return readByteArrayImpl(_this__u8e3s4, -1);
  }
  function readByteArrayImpl(_this__u8e3s4, size) {
    var arraySize = size;
    if (size === -1) {
      var fetchSize = new Long(2147483647, 0);
      while (_this__u8e3s4.c18().j().b1(new Long(2147483647, 0)) < 0 && _this__u8e3s4.f18(fetchSize)) {
        // Inline function 'kotlin.Long.times' call
        fetchSize = fetchSize.t2(toLong(2));
      }
      // Inline function 'kotlin.check' call
      if (!(_this__u8e3s4.c18().j().b1(new Long(2147483647, 0)) < 0)) {
        var message = "Can't create an array of size " + _this__u8e3s4.c18().j().toString();
        throw IllegalStateException_init_$Create$(toString(message));
      }
      arraySize = _this__u8e3s4.c18().j().g1();
    } else {
      _this__u8e3s4.e18(toLong(size));
    }
    var array = new Int8Array(arraySize);
    readTo(_this__u8e3s4.c18(), array);
    return array;
  }
  function readTo(_this__u8e3s4, sink, startIndex, endIndex) {
    startIndex = startIndex === VOID ? 0 : startIndex;
    endIndex = endIndex === VOID ? sink.length : endIndex;
    // Inline function 'kotlinx.io.checkBounds' call
    var size = sink.length;
    checkBounds(toLong(size), toLong(startIndex), toLong(endIndex));
    var offset = startIndex;
    while (offset < endIndex) {
      var bytesRead = _this__u8e3s4.c19(sink, offset, endIndex);
      if (bytesRead === -1) {
        throw EOFException_init_$Create$_0('Source exhausted before reading ' + (endIndex - startIndex | 0) + ' bytes. ' + ('Only ' + bytesRead + ' bytes were read.'));
      }
      offset = offset + bytesRead | 0;
    }
  }
  function readByteArray_0(_this__u8e3s4, byteCount) {
    // Inline function 'kotlinx.io.checkByteCount' call
    var byteCount_0 = toLong(byteCount);
    // Inline function 'kotlin.require' call
    if (!(byteCount_0.b1(new Long(0, 0)) >= 0)) {
      var message = 'byteCount (' + byteCount_0.toString() + ') < 0';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return readByteArrayImpl(_this__u8e3s4, byteCount);
  }
  function readString(_this__u8e3s4) {
    _this__u8e3s4.f18(new Long(-1, 2147483647));
    return commonReadUtf8(_this__u8e3s4.c18(), _this__u8e3s4.c18().j());
  }
  function readString_0(_this__u8e3s4, byteCount) {
    _this__u8e3s4.e18(byteCount);
    return commonReadUtf8(_this__u8e3s4.c18(), byteCount);
  }
  function readString_1(_this__u8e3s4) {
    return commonReadUtf8(_this__u8e3s4, _this__u8e3s4.j());
  }
  function commonReadUtf8(_this__u8e3s4, byteCount) {
    if (byteCount.equals(new Long(0, 0)))
      return '';
    // Inline function 'kotlinx.io.unsafe.UnsafeBufferOperations.forEachSegment' call
    var curr = _this__u8e3s4.z17_1;
    while (!(curr == null)) {
      get_SegmentReadContextImpl();
      if (toLong(curr.o18()).b1(byteCount) >= 0) {
        var result = '';
        // Inline function 'kotlinx.io.unsafe.withData' call
        var tmp2 = curr.s1a(true);
        var tmp3 = curr.i18_1;
        var tmp0 = curr.j18_1;
        // Inline function 'kotlin.math.min' call
        var b = tmp3 + byteCount.g1() | 0;
        var tmp$ret$0 = Math.min(tmp0, b);
        result = commonToUtf8String(tmp2, tmp3, tmp$ret$0);
        _this__u8e3s4.b19(byteCount);
        return result;
      }
      return commonToUtf8String(readByteArray_0(_this__u8e3s4, byteCount.g1()));
    }
    // Inline function 'kotlin.error' call
    var message = 'Unreacheable';
    throw IllegalStateException_init_$Create$(toString(message));
  }
  function writeString(_this__u8e3s4, string, startIndex, endIndex) {
    startIndex = startIndex === VOID ? 0 : startIndex;
    endIndex = endIndex === VOID ? string.length : endIndex;
    // Inline function 'kotlinx.io.checkBounds' call
    var size = string.length;
    checkBounds(toLong(size), toLong(startIndex), toLong(endIndex));
    // Inline function 'kotlinx.io.writeToInternalBuffer' call
    // Inline function 'kotlinx.io.commonWriteUtf8' call
    var this_0 = _this__u8e3s4.c18();
    var i = startIndex;
    while (i < endIndex) {
      var p0 = i;
      // Inline function 'kotlin.code' call
      var this_1 = charSequenceGet(string, p0);
      var c = Char__toInt_impl_vasixd(this_1);
      if (c < 128) {
        $l$block_0: {
          // Inline function 'kotlinx.io.unsafe.UnsafeBufferOperations.writeToTail' call
          var tail = this_0.j19(1);
          var ctx = get_SegmentWriteContextImpl();
          var segmentOffset = -i | 0;
          // Inline function 'kotlin.comparisons.minOf' call
          var b = i + tail.o19() | 0;
          var runLimit = Math.min(endIndex, b);
          var _unary__edvuaz = i;
          i = _unary__edvuaz + 1 | 0;
          ctx.a1b(tail, segmentOffset + _unary__edvuaz | 0, toByte(c));
          $l$loop: while (i < runLimit) {
            var p0_0 = i;
            // Inline function 'kotlin.code' call
            var this_2 = charSequenceGet(string, p0_0);
            c = Char__toInt_impl_vasixd(this_2);
            if (c >= 128)
              break $l$loop;
            var _unary__edvuaz_0 = i;
            i = _unary__edvuaz_0 + 1 | 0;
            ctx.a1b(tail, segmentOffset + _unary__edvuaz_0 | 0, toByte(c));
          }
          var bytesWritten = i + segmentOffset | 0;
          if (bytesWritten === 1) {
            tail.j18_1 = tail.j18_1 + bytesWritten | 0;
            var tmp = this_0;
            // Inline function 'kotlin.Long.plus' call
            tmp.b18_1 = this_0.b18_1.r2(toLong(bytesWritten));
            break $l$block_0;
          }
          // Inline function 'kotlin.check' call
          if (!(0 <= bytesWritten ? bytesWritten <= tail.o19() : false)) {
            var message = 'Invalid number of bytes written: ' + bytesWritten + '. Should be in 0..' + tail.o19();
            throw IllegalStateException_init_$Create$(toString(message));
          }
          if (!(bytesWritten === 0)) {
            tail.j18_1 = tail.j18_1 + bytesWritten | 0;
            var tmp_0 = this_0;
            // Inline function 'kotlin.Long.plus' call
            tmp_0.b18_1 = this_0.b18_1.r2(toLong(bytesWritten));
            break $l$block_0;
          }
          if (isEmpty(tail)) {
            this_0.c1a();
          }
        }
      } else if (c < 2048) {
        $l$block_2: {
          // Inline function 'kotlinx.io.unsafe.UnsafeBufferOperations.writeToTail' call
          var tail_0 = this_0.j19(2);
          get_SegmentWriteContextImpl().z1a(tail_0, 0, toByte(c >> 6 | 192), toByte(c & 63 | 128));
          var bytesWritten_0 = 2;
          if (bytesWritten_0 === 2) {
            tail_0.j18_1 = tail_0.j18_1 + bytesWritten_0 | 0;
            var tmp_1 = this_0;
            // Inline function 'kotlin.Long.plus' call
            tmp_1.b18_1 = this_0.b18_1.r2(toLong(bytesWritten_0));
            break $l$block_2;
          }
          // Inline function 'kotlin.check' call
          if (!(0 <= bytesWritten_0 ? bytesWritten_0 <= tail_0.o19() : false)) {
            var message_0 = 'Invalid number of bytes written: ' + bytesWritten_0 + '. Should be in 0..' + tail_0.o19();
            throw IllegalStateException_init_$Create$(toString(message_0));
          }
          if (!(bytesWritten_0 === 0)) {
            tail_0.j18_1 = tail_0.j18_1 + bytesWritten_0 | 0;
            var tmp_2 = this_0;
            // Inline function 'kotlin.Long.plus' call
            tmp_2.b18_1 = this_0.b18_1.r2(toLong(bytesWritten_0));
            break $l$block_2;
          }
          if (isEmpty(tail_0)) {
            this_0.c1a();
          }
        }
        i = i + 1 | 0;
      } else if (c < 55296 || c > 57343) {
        $l$block_4: {
          // Inline function 'kotlinx.io.unsafe.UnsafeBufferOperations.writeToTail' call
          var tail_1 = this_0.j19(3);
          get_SegmentWriteContextImpl().y1a(tail_1, 0, toByte(c >> 12 | 224), toByte(c >> 6 & 63 | 128), toByte(c & 63 | 128));
          var bytesWritten_1 = 3;
          if (bytesWritten_1 === 3) {
            tail_1.j18_1 = tail_1.j18_1 + bytesWritten_1 | 0;
            var tmp_3 = this_0;
            // Inline function 'kotlin.Long.plus' call
            tmp_3.b18_1 = this_0.b18_1.r2(toLong(bytesWritten_1));
            break $l$block_4;
          }
          // Inline function 'kotlin.check' call
          if (!(0 <= bytesWritten_1 ? bytesWritten_1 <= tail_1.o19() : false)) {
            var message_1 = 'Invalid number of bytes written: ' + bytesWritten_1 + '. Should be in 0..' + tail_1.o19();
            throw IllegalStateException_init_$Create$(toString(message_1));
          }
          if (!(bytesWritten_1 === 0)) {
            tail_1.j18_1 = tail_1.j18_1 + bytesWritten_1 | 0;
            var tmp_4 = this_0;
            // Inline function 'kotlin.Long.plus' call
            tmp_4.b18_1 = this_0.b18_1.r2(toLong(bytesWritten_1));
            break $l$block_4;
          }
          if (isEmpty(tail_1)) {
            this_0.c1a();
          }
        }
        i = i + 1 | 0;
      } else {
        var tmp_5;
        if ((i + 1 | 0) < endIndex) {
          var p0_1 = i + 1 | 0;
          // Inline function 'kotlin.code' call
          var this_3 = charSequenceGet(string, p0_1);
          tmp_5 = Char__toInt_impl_vasixd(this_3);
        } else {
          tmp_5 = 0;
        }
        var low = tmp_5;
        if (c > 56319 || !(56320 <= low ? low <= 57343 : false)) {
          // Inline function 'kotlin.code' call
          var this_4 = _Char___init__impl__6a9atx(63);
          var tmp$ret$26 = Char__toInt_impl_vasixd(this_4);
          this_0.w19(toByte(tmp$ret$26));
          i = i + 1 | 0;
        } else {
          var codePoint = 65536 + ((c & 1023) << 10 | low & 1023) | 0;
          $l$block_6: {
            // Inline function 'kotlinx.io.unsafe.UnsafeBufferOperations.writeToTail' call
            var tail_2 = this_0.j19(4);
            get_SegmentWriteContextImpl().x1a(tail_2, 0, toByte(codePoint >> 18 | 240), toByte(codePoint >> 12 & 63 | 128), toByte(codePoint >> 6 & 63 | 128), toByte(codePoint & 63 | 128));
            var bytesWritten_2 = 4;
            if (bytesWritten_2 === 4) {
              tail_2.j18_1 = tail_2.j18_1 + bytesWritten_2 | 0;
              var tmp_6 = this_0;
              // Inline function 'kotlin.Long.plus' call
              tmp_6.b18_1 = this_0.b18_1.r2(toLong(bytesWritten_2));
              break $l$block_6;
            }
            // Inline function 'kotlin.check' call
            if (!(0 <= bytesWritten_2 ? bytesWritten_2 <= tail_2.o19() : false)) {
              var message_2 = 'Invalid number of bytes written: ' + bytesWritten_2 + '. Should be in 0..' + tail_2.o19();
              throw IllegalStateException_init_$Create$(toString(message_2));
            }
            if (!(bytesWritten_2 === 0)) {
              tail_2.j18_1 = tail_2.j18_1 + bytesWritten_2 | 0;
              var tmp_7 = this_0;
              // Inline function 'kotlin.Long.plus' call
              tmp_7.b18_1 = this_0.b18_1.r2(toLong(bytesWritten_2));
              break $l$block_6;
            }
            if (isEmpty(tail_2)) {
              this_0.c1a();
            }
          }
          i = i + 2 | 0;
        }
      }
    }
    _this__u8e3s4.t18();
  }
  function commonToUtf8String(_this__u8e3s4, beginIndex, endIndex) {
    beginIndex = beginIndex === VOID ? 0 : beginIndex;
    endIndex = endIndex === VOID ? _this__u8e3s4.length : endIndex;
    if (beginIndex < 0 || endIndex > _this__u8e3s4.length || beginIndex > endIndex) {
      throw IndexOutOfBoundsException_init_$Create$('size=' + _this__u8e3s4.length + ' beginIndex=' + beginIndex + ' endIndex=' + endIndex);
    }
    var chars = charArray(endIndex - beginIndex | 0);
    var length = 0;
    // Inline function 'kotlinx.io.internal.processUtf16Chars' call
    var index = beginIndex;
    while (index < endIndex) {
      var b0 = _this__u8e3s4[index];
      if (b0 >= 0) {
        var c = numberToChar(b0);
        var _unary__edvuaz = length;
        length = _unary__edvuaz + 1 | 0;
        chars[_unary__edvuaz] = c;
        index = index + 1 | 0;
        while (index < endIndex && _this__u8e3s4[index] >= 0) {
          var _unary__edvuaz_0 = index;
          index = _unary__edvuaz_0 + 1 | 0;
          var c_0 = numberToChar(_this__u8e3s4[_unary__edvuaz_0]);
          var _unary__edvuaz_1 = length;
          length = _unary__edvuaz_1 + 1 | 0;
          chars[_unary__edvuaz_1] = c_0;
        }
      } else {
        // Inline function 'kotlinx.io.shr' call
        if (b0 >> 5 === -2) {
          var tmp = index;
          var tmp3 = index;
          var tmp$ret$5;
          $l$block_0: {
            // Inline function 'kotlinx.io.internal.process2Utf8Bytes' call
            if (endIndex <= (tmp3 + 1 | 0)) {
              var c_1 = numberToChar(65533);
              var _unary__edvuaz_2 = length;
              length = _unary__edvuaz_2 + 1 | 0;
              chars[_unary__edvuaz_2] = c_1;
              tmp$ret$5 = 1;
              break $l$block_0;
            }
            var b0_0 = _this__u8e3s4[tmp3];
            var b1 = _this__u8e3s4[tmp3 + 1 | 0];
            // Inline function 'kotlinx.io.internal.isUtf8Continuation' call
            // Inline function 'kotlinx.io.and' call
            if (!((b1 & 192) === 128)) {
              var c_2 = numberToChar(65533);
              var _unary__edvuaz_3 = length;
              length = _unary__edvuaz_3 + 1 | 0;
              chars[_unary__edvuaz_3] = c_2;
              tmp$ret$5 = 1;
              break $l$block_0;
            }
            var codePoint = 3968 ^ b1 ^ b0_0 << 6;
            if (codePoint < 128) {
              var c_3 = numberToChar(65533);
              var _unary__edvuaz_4 = length;
              length = _unary__edvuaz_4 + 1 | 0;
              chars[_unary__edvuaz_4] = c_3;
            } else {
              var c_4 = numberToChar(codePoint);
              var _unary__edvuaz_5 = length;
              length = _unary__edvuaz_5 + 1 | 0;
              chars[_unary__edvuaz_5] = c_4;
            }
            tmp$ret$5 = 2;
          }
          index = tmp + tmp$ret$5 | 0;
        } else {
          // Inline function 'kotlinx.io.shr' call
          if (b0 >> 4 === -2) {
            var tmp_0 = index;
            var tmp12 = index;
            var tmp$ret$19;
            $l$block_4: {
              // Inline function 'kotlinx.io.internal.process3Utf8Bytes' call
              if (endIndex <= (tmp12 + 2 | 0)) {
                var c_5 = numberToChar(65533);
                var _unary__edvuaz_6 = length;
                length = _unary__edvuaz_6 + 1 | 0;
                chars[_unary__edvuaz_6] = c_5;
                var tmp_1;
                if (endIndex <= (tmp12 + 1 | 0)) {
                  tmp_1 = true;
                } else {
                  // Inline function 'kotlinx.io.internal.isUtf8Continuation' call
                  // Inline function 'kotlinx.io.and' call
                  tmp_1 = !((_this__u8e3s4[tmp12 + 1 | 0] & 192) === 128);
                }
                if (tmp_1) {
                  tmp$ret$19 = 1;
                  break $l$block_4;
                } else {
                  tmp$ret$19 = 2;
                  break $l$block_4;
                }
              }
              var b0_1 = _this__u8e3s4[tmp12];
              var b1_0 = _this__u8e3s4[tmp12 + 1 | 0];
              // Inline function 'kotlinx.io.internal.isUtf8Continuation' call
              // Inline function 'kotlinx.io.and' call
              if (!((b1_0 & 192) === 128)) {
                var c_6 = numberToChar(65533);
                var _unary__edvuaz_7 = length;
                length = _unary__edvuaz_7 + 1 | 0;
                chars[_unary__edvuaz_7] = c_6;
                tmp$ret$19 = 1;
                break $l$block_4;
              }
              var b2 = _this__u8e3s4[tmp12 + 2 | 0];
              // Inline function 'kotlinx.io.internal.isUtf8Continuation' call
              // Inline function 'kotlinx.io.and' call
              if (!((b2 & 192) === 128)) {
                var c_7 = numberToChar(65533);
                var _unary__edvuaz_8 = length;
                length = _unary__edvuaz_8 + 1 | 0;
                chars[_unary__edvuaz_8] = c_7;
                tmp$ret$19 = 2;
                break $l$block_4;
              }
              var codePoint_0 = -123008 ^ b2 ^ b1_0 << 6 ^ b0_1 << 12;
              if (codePoint_0 < 2048) {
                var c_8 = numberToChar(65533);
                var _unary__edvuaz_9 = length;
                length = _unary__edvuaz_9 + 1 | 0;
                chars[_unary__edvuaz_9] = c_8;
              } else if (55296 <= codePoint_0 ? codePoint_0 <= 57343 : false) {
                var c_9 = numberToChar(65533);
                var _unary__edvuaz_10 = length;
                length = _unary__edvuaz_10 + 1 | 0;
                chars[_unary__edvuaz_10] = c_9;
              } else {
                var c_10 = numberToChar(codePoint_0);
                var _unary__edvuaz_11 = length;
                length = _unary__edvuaz_11 + 1 | 0;
                chars[_unary__edvuaz_11] = c_10;
              }
              tmp$ret$19 = 3;
            }
            index = tmp_0 + tmp$ret$19 | 0;
          } else {
            // Inline function 'kotlinx.io.shr' call
            if (b0 >> 3 === -2) {
              var tmp_2 = index;
              var tmp23 = index;
              var tmp$ret$41;
              $l$block_10: {
                // Inline function 'kotlinx.io.internal.process4Utf8Bytes' call
                if (endIndex <= (tmp23 + 3 | 0)) {
                  if (!(65533 === 65533)) {
                    var c_11 = numberToChar((65533 >>> 10 | 0) + 55232 | 0);
                    var _unary__edvuaz_12 = length;
                    length = _unary__edvuaz_12 + 1 | 0;
                    chars[_unary__edvuaz_12] = c_11;
                    var c_12 = numberToChar((65533 & 1023) + 56320 | 0);
                    var _unary__edvuaz_13 = length;
                    length = _unary__edvuaz_13 + 1 | 0;
                    chars[_unary__edvuaz_13] = c_12;
                  } else {
                    var c_13 = _Char___init__impl__6a9atx(65533);
                    var _unary__edvuaz_14 = length;
                    length = _unary__edvuaz_14 + 1 | 0;
                    chars[_unary__edvuaz_14] = c_13;
                  }
                  var tmp_3;
                  if (endIndex <= (tmp23 + 1 | 0)) {
                    tmp_3 = true;
                  } else {
                    // Inline function 'kotlinx.io.internal.isUtf8Continuation' call
                    // Inline function 'kotlinx.io.and' call
                    tmp_3 = !((_this__u8e3s4[tmp23 + 1 | 0] & 192) === 128);
                  }
                  if (tmp_3) {
                    tmp$ret$41 = 1;
                    break $l$block_10;
                  } else {
                    var tmp_4;
                    if (endIndex <= (tmp23 + 2 | 0)) {
                      tmp_4 = true;
                    } else {
                      // Inline function 'kotlinx.io.internal.isUtf8Continuation' call
                      // Inline function 'kotlinx.io.and' call
                      tmp_4 = !((_this__u8e3s4[tmp23 + 2 | 0] & 192) === 128);
                    }
                    if (tmp_4) {
                      tmp$ret$41 = 2;
                      break $l$block_10;
                    } else {
                      tmp$ret$41 = 3;
                      break $l$block_10;
                    }
                  }
                }
                var b0_2 = _this__u8e3s4[tmp23];
                var b1_1 = _this__u8e3s4[tmp23 + 1 | 0];
                // Inline function 'kotlinx.io.internal.isUtf8Continuation' call
                // Inline function 'kotlinx.io.and' call
                if (!((b1_1 & 192) === 128)) {
                  if (!(65533 === 65533)) {
                    var c_14 = numberToChar((65533 >>> 10 | 0) + 55232 | 0);
                    var _unary__edvuaz_15 = length;
                    length = _unary__edvuaz_15 + 1 | 0;
                    chars[_unary__edvuaz_15] = c_14;
                    var c_15 = numberToChar((65533 & 1023) + 56320 | 0);
                    var _unary__edvuaz_16 = length;
                    length = _unary__edvuaz_16 + 1 | 0;
                    chars[_unary__edvuaz_16] = c_15;
                  } else {
                    var c_16 = _Char___init__impl__6a9atx(65533);
                    var _unary__edvuaz_17 = length;
                    length = _unary__edvuaz_17 + 1 | 0;
                    chars[_unary__edvuaz_17] = c_16;
                  }
                  tmp$ret$41 = 1;
                  break $l$block_10;
                }
                var b2_0 = _this__u8e3s4[tmp23 + 2 | 0];
                // Inline function 'kotlinx.io.internal.isUtf8Continuation' call
                // Inline function 'kotlinx.io.and' call
                if (!((b2_0 & 192) === 128)) {
                  if (!(65533 === 65533)) {
                    var c_17 = numberToChar((65533 >>> 10 | 0) + 55232 | 0);
                    var _unary__edvuaz_18 = length;
                    length = _unary__edvuaz_18 + 1 | 0;
                    chars[_unary__edvuaz_18] = c_17;
                    var c_18 = numberToChar((65533 & 1023) + 56320 | 0);
                    var _unary__edvuaz_19 = length;
                    length = _unary__edvuaz_19 + 1 | 0;
                    chars[_unary__edvuaz_19] = c_18;
                  } else {
                    var c_19 = _Char___init__impl__6a9atx(65533);
                    var _unary__edvuaz_20 = length;
                    length = _unary__edvuaz_20 + 1 | 0;
                    chars[_unary__edvuaz_20] = c_19;
                  }
                  tmp$ret$41 = 2;
                  break $l$block_10;
                }
                var b3 = _this__u8e3s4[tmp23 + 3 | 0];
                // Inline function 'kotlinx.io.internal.isUtf8Continuation' call
                // Inline function 'kotlinx.io.and' call
                if (!((b3 & 192) === 128)) {
                  if (!(65533 === 65533)) {
                    var c_20 = numberToChar((65533 >>> 10 | 0) + 55232 | 0);
                    var _unary__edvuaz_21 = length;
                    length = _unary__edvuaz_21 + 1 | 0;
                    chars[_unary__edvuaz_21] = c_20;
                    var c_21 = numberToChar((65533 & 1023) + 56320 | 0);
                    var _unary__edvuaz_22 = length;
                    length = _unary__edvuaz_22 + 1 | 0;
                    chars[_unary__edvuaz_22] = c_21;
                  } else {
                    var c_22 = _Char___init__impl__6a9atx(65533);
                    var _unary__edvuaz_23 = length;
                    length = _unary__edvuaz_23 + 1 | 0;
                    chars[_unary__edvuaz_23] = c_22;
                  }
                  tmp$ret$41 = 3;
                  break $l$block_10;
                }
                var codePoint_1 = 3678080 ^ b3 ^ b2_0 << 6 ^ b1_1 << 12 ^ b0_2 << 18;
                if (codePoint_1 > 1114111) {
                  if (!(65533 === 65533)) {
                    var c_23 = numberToChar((65533 >>> 10 | 0) + 55232 | 0);
                    var _unary__edvuaz_24 = length;
                    length = _unary__edvuaz_24 + 1 | 0;
                    chars[_unary__edvuaz_24] = c_23;
                    var c_24 = numberToChar((65533 & 1023) + 56320 | 0);
                    var _unary__edvuaz_25 = length;
                    length = _unary__edvuaz_25 + 1 | 0;
                    chars[_unary__edvuaz_25] = c_24;
                  } else {
                    var c_25 = _Char___init__impl__6a9atx(65533);
                    var _unary__edvuaz_26 = length;
                    length = _unary__edvuaz_26 + 1 | 0;
                    chars[_unary__edvuaz_26] = c_25;
                  }
                } else if (55296 <= codePoint_1 ? codePoint_1 <= 57343 : false) {
                  if (!(65533 === 65533)) {
                    var c_26 = numberToChar((65533 >>> 10 | 0) + 55232 | 0);
                    var _unary__edvuaz_27 = length;
                    length = _unary__edvuaz_27 + 1 | 0;
                    chars[_unary__edvuaz_27] = c_26;
                    var c_27 = numberToChar((65533 & 1023) + 56320 | 0);
                    var _unary__edvuaz_28 = length;
                    length = _unary__edvuaz_28 + 1 | 0;
                    chars[_unary__edvuaz_28] = c_27;
                  } else {
                    var c_28 = _Char___init__impl__6a9atx(65533);
                    var _unary__edvuaz_29 = length;
                    length = _unary__edvuaz_29 + 1 | 0;
                    chars[_unary__edvuaz_29] = c_28;
                  }
                } else if (codePoint_1 < 65536) {
                  if (!(65533 === 65533)) {
                    var c_29 = numberToChar((65533 >>> 10 | 0) + 55232 | 0);
                    var _unary__edvuaz_30 = length;
                    length = _unary__edvuaz_30 + 1 | 0;
                    chars[_unary__edvuaz_30] = c_29;
                    var c_30 = numberToChar((65533 & 1023) + 56320 | 0);
                    var _unary__edvuaz_31 = length;
                    length = _unary__edvuaz_31 + 1 | 0;
                    chars[_unary__edvuaz_31] = c_30;
                  } else {
                    var c_31 = _Char___init__impl__6a9atx(65533);
                    var _unary__edvuaz_32 = length;
                    length = _unary__edvuaz_32 + 1 | 0;
                    chars[_unary__edvuaz_32] = c_31;
                  }
                } else {
                  if (!(codePoint_1 === 65533)) {
                    var c_32 = numberToChar((codePoint_1 >>> 10 | 0) + 55232 | 0);
                    var _unary__edvuaz_33 = length;
                    length = _unary__edvuaz_33 + 1 | 0;
                    chars[_unary__edvuaz_33] = c_32;
                    var c_33 = numberToChar((codePoint_1 & 1023) + 56320 | 0);
                    var _unary__edvuaz_34 = length;
                    length = _unary__edvuaz_34 + 1 | 0;
                    chars[_unary__edvuaz_34] = c_33;
                  } else {
                    var c_34 = _Char___init__impl__6a9atx(65533);
                    var _unary__edvuaz_35 = length;
                    length = _unary__edvuaz_35 + 1 | 0;
                    chars[_unary__edvuaz_35] = c_34;
                  }
                }
                tmp$ret$41 = 4;
              }
              index = tmp_2 + tmp$ret$41 | 0;
            } else {
              var c_35 = _Char___init__impl__6a9atx(65533);
              var _unary__edvuaz_36 = length;
              length = _unary__edvuaz_36 + 1 | 0;
              chars[_unary__edvuaz_36] = c_35;
              index = index + 1 | 0;
            }
          }
        }
      }
    }
    return concatToString(chars, 0, length);
  }
  function get_SegmentReadContextImpl() {
    _init_properties_UnsafeBufferOperations_kt__xw75gy();
    return SegmentReadContextImpl;
  }
  var SegmentReadContextImpl;
  function get_SegmentWriteContextImpl() {
    _init_properties_UnsafeBufferOperations_kt__xw75gy();
    return SegmentWriteContextImpl;
  }
  var SegmentWriteContextImpl;
  var BufferIterationContextImpl;
  function UnsafeBufferOperations() {
  }
  var UnsafeBufferOperations_instance;
  function UnsafeBufferOperations_getInstance() {
    return UnsafeBufferOperations_instance;
  }
  function SegmentReadContextImpl$1() {
  }
  protoOf(SegmentReadContextImpl$1).a1a = function (segment, offset) {
    return segment.a19(offset);
  };
  function SegmentWriteContextImpl$1() {
  }
  protoOf(SegmentWriteContextImpl$1).a1b = function (segment, offset, value) {
    segment.t1a(offset, value);
  };
  protoOf(SegmentWriteContextImpl$1).z1a = function (segment, offset, b0, b1) {
    segment.u1a(offset, b0, b1);
  };
  protoOf(SegmentWriteContextImpl$1).y1a = function (segment, offset, b0, b1, b2) {
    segment.v1a(offset, b0, b1, b2);
  };
  protoOf(SegmentWriteContextImpl$1).x1a = function (segment, offset, b0, b1, b2, b3) {
    segment.w1a(offset, b0, b1, b2, b3);
  };
  function BufferIterationContextImpl$1() {
  }
  protoOf(BufferIterationContextImpl$1).a1a = function (segment, offset) {
    return get_SegmentReadContextImpl().a1a(segment, offset);
  };
  var properties_initialized_UnsafeBufferOperations_kt_2xfgoc;
  function _init_properties_UnsafeBufferOperations_kt__xw75gy() {
    if (!properties_initialized_UnsafeBufferOperations_kt_2xfgoc) {
      properties_initialized_UnsafeBufferOperations_kt_2xfgoc = true;
      SegmentReadContextImpl = new SegmentReadContextImpl$1();
      SegmentWriteContextImpl = new SegmentWriteContextImpl$1();
      BufferIterationContextImpl = new BufferIterationContextImpl$1();
    }
  }
  function IOException_init_$Init$($this) {
    Exception_init_$Init$($this);
    IOException.call($this);
    return $this;
  }
  function IOException_init_$Create$() {
    var tmp = IOException_init_$Init$(objectCreate(protoOf(IOException)));
    captureStack(tmp, IOException_init_$Create$);
    return tmp;
  }
  function IOException_init_$Init$_0(message, $this) {
    Exception_init_$Init$_0(message, $this);
    IOException.call($this);
    return $this;
  }
  function IOException_init_$Create$_0(message) {
    var tmp = IOException_init_$Init$_0(message, objectCreate(protoOf(IOException)));
    captureStack(tmp, IOException_init_$Create$_0);
    return tmp;
  }
  function IOException_init_$Init$_1(message, cause, $this) {
    Exception_init_$Init$_1(message, cause, $this);
    IOException.call($this);
    return $this;
  }
  function IOException_init_$Create$_1(message, cause) {
    var tmp = IOException_init_$Init$_1(message, cause, objectCreate(protoOf(IOException)));
    captureStack(tmp, IOException_init_$Create$_1);
    return tmp;
  }
  function IOException() {
    captureStack(this, IOException);
  }
  function EOFException_init_$Init$($this) {
    IOException_init_$Init$($this);
    EOFException.call($this);
    return $this;
  }
  function EOFException_init_$Create$() {
    var tmp = EOFException_init_$Init$(objectCreate(protoOf(EOFException)));
    captureStack(tmp, EOFException_init_$Create$);
    return tmp;
  }
  function EOFException_init_$Init$_0(message, $this) {
    IOException_init_$Init$_0(message, $this);
    EOFException.call($this);
    return $this;
  }
  function EOFException_init_$Create$_0(message) {
    var tmp = EOFException_init_$Init$_0(message, objectCreate(protoOf(EOFException)));
    captureStack(tmp, EOFException_init_$Create$_0);
    return tmp;
  }
  function EOFException() {
    captureStack(this, EOFException);
  }
  function SegmentPool() {
    this.k19_1 = 0;
    this.l19_1 = 0;
  }
  protoOf(SegmentPool).m19 = function () {
    return Companion_instance.o1a();
  };
  protoOf(SegmentPool).b1a = function (segment) {
  };
  protoOf(SegmentPool).q1a = function () {
    return AlwaysSharedCopyTracker_getInstance();
  };
  var SegmentPool_instance;
  function SegmentPool_getInstance() {
    return SegmentPool_instance;
  }
  //region block: post-declaration
  protoOf(Buffer).q19 = write$default;
  //endregion
  //region block: init
  Companion_instance = new Companion();
  UnsafeBufferOperations_instance = new UnsafeBufferOperations();
  SegmentPool_instance = new SegmentPool();
  //endregion
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = EOFException_init_$Create$_0;
  _.$_$.b = IOException_init_$Init$_0;
  _.$_$.c = IOException_init_$Create$_0;
  _.$_$.d = IOException_init_$Create$_1;
  _.$_$.e = Buffer;
  _.$_$.f = IOException;
  _.$_$.g = Source;
  _.$_$.h = readByteArray_0;
  _.$_$.i = readByteArray;
  _.$_$.j = readString;
  _.$_$.k = readString_0;
  _.$_$.l = readString_1;
  _.$_$.m = writeString;
  //endregion
  return _;
}));

//# sourceMappingURL=kotlinx-io-kotlinx-io-core.js.map
