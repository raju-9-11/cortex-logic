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
  var IndexOutOfBoundsException_init_$Create$ = kotlin_kotlin.$_$.d2;
  var Long = kotlin_kotlin.$_$.rg;
  var IllegalArgumentException_init_$Create$ = kotlin_kotlin.$_$.w1;
  var _Char___init__impl__6a9atx = kotlin_kotlin.$_$.q2;
  var charArrayOf = kotlin_kotlin.$_$.qa;
  var protoOf = kotlin_kotlin.$_$.ic;
  var toString = kotlin_kotlin.$_$.mc;
  var Unit_instance = kotlin_kotlin.$_$.i5;
  var toShort = kotlin_kotlin.$_$.lc;
  var ensureNotNull = kotlin_kotlin.$_$.oh;
  var toLong = kotlin_kotlin.$_$.kc;
  var StringBuilder_init_$Create$ = kotlin_kotlin.$_$.i1;
  var initMetadataForClass = kotlin_kotlin.$_$.eb;
  var VOID = kotlin_kotlin.$_$.i;
  var IllegalStateException_init_$Create$ = kotlin_kotlin.$_$.a2;
  var objectCreate = kotlin_kotlin.$_$.hc;
  var initMetadataForCompanion = kotlin_kotlin.$_$.fb;
  var arrayCopy = kotlin_kotlin.$_$.x5;
  var toByte = kotlin_kotlin.$_$.jc;
  var IllegalArgumentException_init_$Create$_0 = kotlin_kotlin.$_$.u1;
  var initMetadataForObject = kotlin_kotlin.$_$.kb;
  var initMetadataForInterface = kotlin_kotlin.$_$.ib;
  var charSequenceGet = kotlin_kotlin.$_$.sa;
  var Char__toInt_impl_vasixd = kotlin_kotlin.$_$.w2;
  var charArray = kotlin_kotlin.$_$.ra;
  var numberToChar = kotlin_kotlin.$_$.dc;
  var concatToString = kotlin_kotlin.$_$.pd;
  var Exception_init_$Init$ = kotlin_kotlin.$_$.n1;
  var captureStack = kotlin_kotlin.$_$.pa;
  var Exception_init_$Init$_0 = kotlin_kotlin.$_$.o1;
  var Exception_init_$Init$_1 = kotlin_kotlin.$_$.q1;
  var Exception = kotlin_kotlin.$_$.og;
  //endregion
  //region block: pre-declaration
  initMetadataForInterface(Source, 'Source');
  function write$default(source, startIndex, endIndex, $super) {
    startIndex = startIndex === VOID ? 0 : startIndex;
    endIndex = endIndex === VOID ? source.length : endIndex;
    var tmp;
    if ($super === VOID) {
      this.d1f(source, startIndex, endIndex);
      tmp = Unit_instance;
    } else {
      tmp = $super.d1f.call(this, source, startIndex, endIndex);
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
    if (offset.b1(new Long(0, 0)) < 0 || offset.b1(size) > 0 || size.x2(offset).b1(byteCount) < 0 || byteCount.b1(new Long(0, 0)) < 0) {
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
    throw EOFException_init_$Create$_0("Buffer doesn't contain required number of bytes (size: " + $this.m().toString() + ', required: ' + byteCount.toString() + ')');
  }
  function Buffer() {
    this.p1d_1 = null;
    this.q1d_1 = null;
    this.r1d_1 = new Long(0, 0);
  }
  protoOf(Buffer).m = function () {
    return this.r1d_1;
  };
  protoOf(Buffer).s1d = function () {
    return this;
  };
  protoOf(Buffer).t1d = function () {
    return this.m().equals(new Long(0, 0));
  };
  protoOf(Buffer).u1d = function (byteCount) {
    // Inline function 'kotlin.require' call
    if (!(byteCount.b1(new Long(0, 0)) >= 0)) {
      var message = 'byteCount: ' + byteCount.toString();
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    if (this.m().b1(byteCount) < 0) {
      throw EOFException_init_$Create$_0("Buffer doesn't contain required number of bytes (size: " + this.m().toString() + ', required: ' + byteCount.toString() + ')');
    }
  };
  protoOf(Buffer).v1d = function (byteCount) {
    // Inline function 'kotlin.require' call
    if (!(byteCount.b1(new Long(0, 0)) >= 0)) {
      var message = 'byteCount: ' + byteCount.toString() + ' < 0';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return this.m().b1(byteCount) >= 0;
  };
  protoOf(Buffer).w1d = function () {
    var tmp0_elvis_lhs = this.p1d_1;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throwEof(this, new Long(1, 0));
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var segment = tmp;
    var segmentSize = segment.e1e();
    if (segmentSize === 0) {
      this.f1e();
      return this.w1d();
    }
    var v = segment.g1e();
    this.r1d_1 = this.r1d_1.x2(new Long(1, 0));
    if (segmentSize === 1) {
      this.f1e();
    }
    return v;
  };
  protoOf(Buffer).h1e = function () {
    var tmp0_elvis_lhs = this.p1d_1;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throwEof(this, new Long(2, 0));
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var segment = tmp;
    var segmentSize = segment.e1e();
    if (segmentSize < 2) {
      this.u1d(new Long(2, 0));
      if (segmentSize === 0) {
        this.f1e();
        return this.h1e();
      }
      // Inline function 'kotlinx.io.and' call
      var tmp_0 = (this.w1d() & 255) << 8;
      // Inline function 'kotlinx.io.and' call
      var tmp$ret$1 = this.w1d() & 255;
      return toShort(tmp_0 | tmp$ret$1);
    }
    var v = segment.i1e();
    this.r1d_1 = this.r1d_1.x2(new Long(2, 0));
    if (segmentSize === 2) {
      this.f1e();
    }
    return v;
  };
  protoOf(Buffer).j1e = function () {
    return Unit_instance;
  };
  protoOf(Buffer).k1e = function (out, startIndex, endIndex) {
    checkBounds(this.m(), startIndex, endIndex);
    if (startIndex.equals(endIndex))
      return Unit_instance;
    var currentOffset = startIndex;
    var remainingByteCount = endIndex.x2(startIndex);
    out.r1d_1 = out.r1d_1.w2(remainingByteCount);
    var s = this.p1d_1;
    while (currentOffset.b1(toLong(ensureNotNull(s).z1d_1 - s.y1d_1 | 0)) >= 0) {
      currentOffset = currentOffset.x2(toLong(s.z1d_1 - s.y1d_1 | 0));
      s = s.c1e_1;
    }
    while (remainingByteCount.b1(new Long(0, 0)) > 0) {
      var copy = ensureNotNull(s).l1e();
      copy.y1d_1 = copy.y1d_1 + currentOffset.g1() | 0;
      var tmp = copy;
      var tmp0 = copy.y1d_1 + remainingByteCount.g1() | 0;
      // Inline function 'kotlin.comparisons.minOf' call
      var b = copy.z1d_1;
      tmp.z1d_1 = Math.min(tmp0, b);
      // Inline function 'kotlinx.io.Buffer.pushSegment' call
      if (out.p1d_1 == null) {
        out.p1d_1 = copy;
        out.q1d_1 = copy;
      } else if (false) {
        out.q1d_1 = ensureNotNull(out.q1d_1).m1e(copy).n1e();
        if (ensureNotNull(out.q1d_1).d1e_1 == null) {
          out.p1d_1 = out.q1d_1;
        }
      } else {
        out.q1d_1 = ensureNotNull(out.q1d_1).m1e(copy);
      }
      remainingByteCount = remainingByteCount.x2(toLong(copy.z1d_1 - copy.y1d_1 | 0));
      currentOffset = new Long(0, 0);
      s = s.c1e_1;
    }
  };
  protoOf(Buffer).o1e = function () {
    var result = this.m();
    if (result.equals(new Long(0, 0)))
      return new Long(0, 0);
    var tail = ensureNotNull(this.q1d_1);
    if (tail.z1d_1 < 8192 && tail.b1e_1) {
      result = result.x2(toLong(tail.z1d_1 - tail.y1d_1 | 0));
    }
    return result;
  };
  protoOf(Buffer).p1e = function (position) {
    if (position.b1(new Long(0, 0)) < 0 || position.b1(this.m()) >= 0) {
      throw IndexOutOfBoundsException_init_$Create$('position (' + position.toString() + ') is not within the range [0..size(' + this.m().toString() + '))');
    }
    if (position.equals(new Long(0, 0))) {
      return ensureNotNull(this.p1d_1).q1e(0);
    }
    // Inline function 'kotlinx.io.seek' call
    if (this.p1d_1 == null) {
      var offset = new Long(-1, -1);
      return ensureNotNull(null).q1e(position.x2(offset).g1());
    }
    if (this.m().x2(position).b1(position) < 0) {
      var s = this.q1d_1;
      var offset_0 = this.m();
      $l$loop: while (!(s == null) && offset_0.b1(position) > 0) {
        offset_0 = offset_0.x2(toLong(s.z1d_1 - s.y1d_1 | 0));
        if (offset_0.b1(position) <= 0)
          break $l$loop;
        s = s.d1e_1;
      }
      var tmp4 = s;
      var offset_1 = offset_0;
      return ensureNotNull(tmp4).q1e(position.x2(offset_1).g1());
    } else {
      var s_0 = this.p1d_1;
      var offset_2 = new Long(0, 0);
      $l$loop_0: while (!(s_0 == null)) {
        var tmp0 = offset_2;
        // Inline function 'kotlin.Long.plus' call
        var other = s_0.z1d_1 - s_0.y1d_1 | 0;
        var nextOffset = tmp0.w2(toLong(other));
        if (nextOffset.b1(position) > 0)
          break $l$loop_0;
        s_0 = s_0.c1e_1;
        offset_2 = nextOffset;
      }
      var tmp6 = s_0;
      var offset_3 = offset_2;
      return ensureNotNull(tmp6).q1e(position.x2(offset_3).g1());
    }
  };
  protoOf(Buffer).d2 = function () {
    return this.r1e(this.m());
  };
  protoOf(Buffer).r1e = function (byteCount) {
    // Inline function 'kotlinx.io.checkByteCount' call
    // Inline function 'kotlin.require' call
    if (!(byteCount.b1(new Long(0, 0)) >= 0)) {
      var message = 'byteCount (' + byteCount.toString() + ') < 0';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    var remainingByteCount = byteCount;
    while (remainingByteCount.b1(new Long(0, 0)) > 0) {
      var tmp0_elvis_lhs = this.p1d_1;
      var tmp;
      if (tmp0_elvis_lhs == null) {
        throw EOFException_init_$Create$_0('Buffer exhausted before skipping ' + byteCount.toString() + ' bytes.');
      } else {
        tmp = tmp0_elvis_lhs;
      }
      var head = tmp;
      var tmp1 = remainingByteCount;
      // Inline function 'kotlinx.io.minOf' call
      var b = head.z1d_1 - head.y1d_1 | 0;
      // Inline function 'kotlin.comparisons.minOf' call
      var b_0 = toLong(b);
      var toSkip = (tmp1.b1(b_0) <= 0 ? tmp1 : b_0).g1();
      this.r1d_1 = this.r1d_1.x2(toLong(toSkip));
      remainingByteCount = remainingByteCount.x2(toLong(toSkip));
      head.y1d_1 = head.y1d_1 + toSkip | 0;
      if (head.y1d_1 === head.z1d_1) {
        this.f1e();
      }
    }
  };
  protoOf(Buffer).s1e = function (sink, startIndex, endIndex) {
    // Inline function 'kotlinx.io.checkBounds' call
    var size = sink.length;
    checkBounds(toLong(size), toLong(startIndex), toLong(endIndex));
    var tmp0_elvis_lhs = this.p1d_1;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return -1;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var s = tmp;
    var tmp3 = endIndex - startIndex | 0;
    // Inline function 'kotlin.comparisons.minOf' call
    var b = s.e1e();
    var toCopy = Math.min(tmp3, b);
    s.t1e(sink, startIndex, startIndex + toCopy | 0);
    this.r1d_1 = this.r1d_1.x2(toLong(toCopy));
    if (isEmpty(s)) {
      this.f1e();
    }
    return toCopy;
  };
  protoOf(Buffer).u1e = function (sink, byteCount) {
    // Inline function 'kotlinx.io.checkByteCount' call
    // Inline function 'kotlin.require' call
    if (!(byteCount.b1(new Long(0, 0)) >= 0)) {
      var message = 'byteCount (' + byteCount.toString() + ') < 0';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    if (this.m().equals(new Long(0, 0)))
      return new Long(-1, -1);
    var bytesWritten = byteCount.b1(this.m()) > 0 ? this.m() : byteCount;
    sink.v1e(this, bytesWritten);
    return bytesWritten;
  };
  protoOf(Buffer).w1e = function (sink, byteCount) {
    // Inline function 'kotlinx.io.checkByteCount' call
    // Inline function 'kotlin.require' call
    if (!(byteCount.b1(new Long(0, 0)) >= 0)) {
      var message = 'byteCount (' + byteCount.toString() + ') < 0';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    if (this.m().b1(byteCount) < 0) {
      sink.v1e(this, this.m());
      throw EOFException_init_$Create$_0('Buffer exhausted before writing ' + byteCount.toString() + ' bytes. Only ' + this.m().toString() + ' bytes were written.');
    }
    sink.v1e(this, byteCount);
  };
  protoOf(Buffer).x1e = function (sink) {
    var byteCount = this.m();
    if (byteCount.b1(new Long(0, 0)) > 0) {
      sink.v1e(this, byteCount);
    }
    return byteCount;
  };
  protoOf(Buffer).y1e = function () {
    return buffered(new PeekSource(this));
  };
  protoOf(Buffer).z1e = function (minimumCapacity) {
    // Inline function 'kotlin.require' call
    if (!(minimumCapacity >= 1 && minimumCapacity <= 8192)) {
      var message = 'unexpected capacity';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    if (this.q1d_1 == null) {
      var result = SegmentPool_instance.c1f();
      this.p1d_1 = result;
      this.q1d_1 = result;
      return result;
    }
    var t = ensureNotNull(this.q1d_1);
    if ((t.z1d_1 + minimumCapacity | 0) > 8192 || !t.b1e_1) {
      var newTail = t.m1e(SegmentPool_instance.c1f());
      this.q1d_1 = newTail;
      return newTail;
    }
    return t;
  };
  protoOf(Buffer).d1f = function (source, startIndex, endIndex) {
    // Inline function 'kotlinx.io.checkBounds' call
    var size = source.length;
    checkBounds(toLong(size), toLong(startIndex), toLong(endIndex));
    var currentOffset = startIndex;
    while (currentOffset < endIndex) {
      var tail = this.z1e(1);
      var tmp3 = endIndex - currentOffset | 0;
      // Inline function 'kotlin.comparisons.minOf' call
      var b = tail.e1f();
      var toCopy = Math.min(tmp3, b);
      tail.f1f(source, currentOffset, currentOffset + toCopy | 0);
      currentOffset = currentOffset + toCopy | 0;
    }
    var tmp = this;
    var tmp5 = this.r1d_1;
    // Inline function 'kotlin.Long.plus' call
    var other = endIndex - startIndex | 0;
    tmp.r1d_1 = tmp5.w2(toLong(other));
  };
  protoOf(Buffer).v1e = function (source, byteCount) {
    // Inline function 'kotlin.require' call
    if (!!(source === this)) {
      var message = 'source == this';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    checkOffsetAndCount(source.r1d_1, new Long(0, 0), byteCount);
    var remainingByteCount = byteCount;
    while (remainingByteCount.b1(new Long(0, 0)) > 0) {
      if (remainingByteCount.b1(toLong(ensureNotNull(source.p1d_1).e1e())) < 0) {
        var tail = this.q1d_1;
        var tmp;
        if (!(tail == null) && tail.b1e_1) {
          var tmp1 = remainingByteCount;
          // Inline function 'kotlin.Long.plus' call
          var other = tail.z1d_1;
          var tmp3 = tmp1.w2(toLong(other));
          // Inline function 'kotlin.Long.minus' call
          var other_0 = tail.h1f() ? 0 : tail.y1d_1;
          tmp = tmp3.x2(toLong(other_0)).b1(new Long(8192, 0)) <= 0;
        } else {
          tmp = false;
        }
        if (tmp) {
          ensureNotNull(source.p1d_1).j1f(tail, remainingByteCount.g1());
          source.r1d_1 = source.r1d_1.x2(remainingByteCount);
          this.r1d_1 = this.r1d_1.w2(remainingByteCount);
          return Unit_instance;
        } else {
          source.p1d_1 = ensureNotNull(source.p1d_1).i1f(remainingByteCount.g1());
        }
      }
      var segmentToMove = ensureNotNull(source.p1d_1);
      var movedByteCount = toLong(segmentToMove.e1e());
      source.p1d_1 = segmentToMove.k1f();
      if (source.p1d_1 == null) {
        source.q1d_1 = null;
      }
      // Inline function 'kotlinx.io.Buffer.pushSegment' call
      if (this.p1d_1 == null) {
        this.p1d_1 = segmentToMove;
        this.q1d_1 = segmentToMove;
      } else if (true) {
        this.q1d_1 = ensureNotNull(this.q1d_1).m1e(segmentToMove).n1e();
        if (ensureNotNull(this.q1d_1).d1e_1 == null) {
          this.p1d_1 = this.q1d_1;
        }
      } else {
        this.q1d_1 = ensureNotNull(this.q1d_1).m1e(segmentToMove);
      }
      source.r1d_1 = source.r1d_1.x2(movedByteCount);
      this.r1d_1 = this.r1d_1.w2(movedByteCount);
      remainingByteCount = remainingByteCount.x2(movedByteCount);
    }
  };
  protoOf(Buffer).l1f = function (source) {
    var totalBytesRead = new Long(0, 0);
    $l$loop: while (true) {
      var readCount = source.u1e(this, new Long(8192, 0));
      if (readCount.equals(new Long(-1, -1)))
        break $l$loop;
      totalBytesRead = totalBytesRead.w2(readCount);
    }
    return totalBytesRead;
  };
  protoOf(Buffer).m1f = function (byte) {
    this.z1e(1).n1f(byte);
    this.r1d_1 = this.r1d_1.w2(new Long(1, 0));
  };
  protoOf(Buffer).o1f = function (short) {
    this.z1e(2).p1f(short);
    this.r1d_1 = this.r1d_1.w2(new Long(2, 0));
  };
  protoOf(Buffer).e4 = function () {
    return Unit_instance;
  };
  protoOf(Buffer).toString = function () {
    if (this.m().equals(new Long(0, 0)))
      return 'Buffer(size=0)';
    var maxPrintableBytes = 64;
    // Inline function 'kotlinx.io.minOf' call
    var b = this.m();
    // Inline function 'kotlin.comparisons.minOf' call
    var a = toLong(maxPrintableBytes);
    var len = (a.b1(b) <= 0 ? a : b).g1();
    var builder = StringBuilder_init_$Create$(imul(len, 2) + (this.m().b1(toLong(maxPrintableBytes)) > 0 ? 1 : 0) | 0);
    var bytesWritten = 0;
    // Inline function 'kotlinx.io.unsafe.UnsafeBufferOperations.forEachSegment' call
    var curr = this.p1d_1;
    while (!(curr == null)) {
      var tmp4 = get_SegmentReadContextImpl();
      var segment = curr;
      var idx = 0;
      while (bytesWritten < len && idx < segment.e1e()) {
        var _unary__edvuaz = idx;
        idx = _unary__edvuaz + 1 | 0;
        var b_0 = tmp4.q1f(segment, _unary__edvuaz);
        bytesWritten = bytesWritten + 1 | 0;
        var tmp = get_HEX_DIGIT_CHARS();
        // Inline function 'kotlinx.io.shr' call
        var tmp$ret$2 = b_0 >> 4;
        var tmp_0 = builder.h8(tmp[tmp$ret$2 & 15]);
        var tmp_1 = get_HEX_DIGIT_CHARS();
        // Inline function 'kotlinx.io.and' call
        var tmp$ret$3 = b_0 & 15;
        tmp_0.h8(tmp_1[tmp$ret$3]);
      }
      curr = curr.c1e_1;
    }
    if (this.m().b1(toLong(maxPrintableBytes)) > 0) {
      builder.h8(_Char___init__impl__6a9atx(8230));
    }
    return 'Buffer(size=' + this.m().toString() + ' hex=' + builder.toString() + ')';
  };
  protoOf(Buffer).f1e = function () {
    var oldHead = ensureNotNull(this.p1d_1);
    var nextHead = oldHead.c1e_1;
    this.p1d_1 = nextHead;
    if (nextHead == null) {
      this.q1d_1 = null;
    } else {
      nextHead.d1e_1 = null;
    }
    oldHead.c1e_1 = null;
    SegmentPool_instance.r1f(oldHead);
  };
  protoOf(Buffer).s1f = function () {
    var oldTail = ensureNotNull(this.q1d_1);
    var newTail = oldTail.d1e_1;
    this.q1d_1 = newTail;
    if (newTail == null) {
      this.p1d_1 = null;
    } else {
      newTail.c1e_1 = null;
    }
    oldTail.d1e_1 = null;
    SegmentPool_instance.r1f(oldTail);
  };
  function buffered(_this__u8e3s4) {
    return new RealSource(_this__u8e3s4);
  }
  function PeekSource(upstream) {
    this.t1f_1 = upstream;
    this.u1f_1 = this.t1f_1.s1d();
    this.v1f_1 = this.u1f_1.p1d_1;
    var tmp = this;
    var tmp0_safe_receiver = this.u1f_1.p1d_1;
    var tmp0_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.y1d_1;
    tmp.w1f_1 = tmp0_elvis_lhs == null ? -1 : tmp0_elvis_lhs;
    this.x1f_1 = false;
    this.y1f_1 = new Long(0, 0);
  }
  protoOf(PeekSource).u1e = function (sink, byteCount) {
    // Inline function 'kotlin.check' call
    if (!!this.x1f_1) {
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
    if (!(this.v1f_1 == null || (this.v1f_1 === this.u1f_1.p1d_1 && this.w1f_1 === ensureNotNull(this.u1f_1.p1d_1).y1d_1))) {
      var message_1 = 'Peek source is invalid because upstream source was used';
      throw IllegalStateException_init_$Create$(toString(message_1));
    }
    if (byteCount.equals(new Long(0, 0)))
      return new Long(0, 0);
    // Inline function 'kotlin.Long.plus' call
    var tmp$ret$7 = this.y1f_1.w2(toLong(1));
    if (!this.t1f_1.v1d(tmp$ret$7))
      return new Long(-1, -1);
    if (this.v1f_1 == null && !(this.u1f_1.p1d_1 == null)) {
      this.v1f_1 = this.u1f_1.p1d_1;
      this.w1f_1 = ensureNotNull(this.u1f_1.p1d_1).y1d_1;
    }
    // Inline function 'kotlin.comparisons.minOf' call
    var b = this.u1f_1.m().x2(this.y1f_1);
    var toCopy = byteCount.b1(b) <= 0 ? byteCount : b;
    this.u1f_1.k1e(sink, this.y1f_1, this.y1f_1.w2(toCopy));
    this.y1f_1 = this.y1f_1.w2(toCopy);
    return toCopy;
  };
  protoOf(PeekSource).e4 = function () {
    this.x1f_1 = true;
  };
  function RealSource(source) {
    this.z1f_1 = source;
    this.a1g_1 = false;
    this.b1g_1 = new Buffer();
  }
  protoOf(RealSource).s1d = function () {
    return this.b1g_1;
  };
  protoOf(RealSource).u1e = function (sink, byteCount) {
    // Inline function 'kotlinx.io.RealSource.checkNotClosed' call
    // Inline function 'kotlin.check' call
    if (!!this.a1g_1) {
      var message = 'Source is closed.';
      throw IllegalStateException_init_$Create$(toString(message));
    }
    // Inline function 'kotlin.require' call
    if (!(byteCount.b1(new Long(0, 0)) >= 0)) {
      var message_0 = 'byteCount: ' + byteCount.toString();
      throw IllegalArgumentException_init_$Create$(toString(message_0));
    }
    if (this.b1g_1.m().equals(new Long(0, 0))) {
      var read = this.z1f_1.u1e(this.b1g_1, new Long(8192, 0));
      if (read.equals(new Long(-1, -1)))
        return new Long(-1, -1);
    }
    // Inline function 'kotlin.comparisons.minOf' call
    var b = this.b1g_1.m();
    var toRead = byteCount.b1(b) <= 0 ? byteCount : b;
    return this.b1g_1.u1e(sink, toRead);
  };
  protoOf(RealSource).t1d = function () {
    // Inline function 'kotlinx.io.RealSource.checkNotClosed' call
    // Inline function 'kotlin.check' call
    if (!!this.a1g_1) {
      var message = 'Source is closed.';
      throw IllegalStateException_init_$Create$(toString(message));
    }
    return this.b1g_1.t1d() && this.z1f_1.u1e(this.b1g_1, new Long(8192, 0)).equals(new Long(-1, -1));
  };
  protoOf(RealSource).u1d = function (byteCount) {
    if (!this.v1d(byteCount))
      throw EOFException_init_$Create$_0("Source doesn't contain required number of bytes (" + byteCount.toString() + ').');
  };
  protoOf(RealSource).v1d = function (byteCount) {
    // Inline function 'kotlinx.io.RealSource.checkNotClosed' call
    // Inline function 'kotlin.check' call
    if (!!this.a1g_1) {
      var message = 'Source is closed.';
      throw IllegalStateException_init_$Create$(toString(message));
    }
    // Inline function 'kotlin.require' call
    if (!(byteCount.b1(new Long(0, 0)) >= 0)) {
      var message_0 = 'byteCount: ' + byteCount.toString();
      throw IllegalArgumentException_init_$Create$(toString(message_0));
    }
    while (this.b1g_1.m().b1(byteCount) < 0) {
      if (this.z1f_1.u1e(this.b1g_1, new Long(8192, 0)).equals(new Long(-1, -1)))
        return false;
    }
    return true;
  };
  protoOf(RealSource).w1d = function () {
    this.u1d(new Long(1, 0));
    return this.b1g_1.w1d();
  };
  protoOf(RealSource).s1e = function (sink, startIndex, endIndex) {
    // Inline function 'kotlinx.io.checkBounds' call
    var size = sink.length;
    checkBounds(toLong(size), toLong(startIndex), toLong(endIndex));
    if (this.b1g_1.m().equals(new Long(0, 0))) {
      var read = this.z1f_1.u1e(this.b1g_1, new Long(8192, 0));
      if (read.equals(new Long(-1, -1)))
        return -1;
    }
    var tmp3 = endIndex - startIndex | 0;
    // Inline function 'kotlinx.io.minOf' call
    var b = this.b1g_1.m();
    // Inline function 'kotlin.comparisons.minOf' call
    var a = toLong(tmp3);
    var toRead = (a.b1(b) <= 0 ? a : b).g1();
    return this.b1g_1.s1e(sink, startIndex, startIndex + toRead | 0);
  };
  protoOf(RealSource).w1e = function (sink, byteCount) {
    try {
      this.u1d(byteCount);
    } catch ($p) {
      if ($p instanceof EOFException) {
        var e = $p;
        sink.v1e(this.b1g_1, this.b1g_1.m());
        throw e;
      } else {
        throw $p;
      }
    }
    this.b1g_1.w1e(sink, byteCount);
  };
  protoOf(RealSource).x1e = function (sink) {
    var totalBytesWritten = new Long(0, 0);
    while (!this.z1f_1.u1e(this.b1g_1, new Long(8192, 0)).equals(new Long(-1, -1))) {
      var emitByteCount = this.b1g_1.o1e();
      if (emitByteCount.b1(new Long(0, 0)) > 0) {
        totalBytesWritten = totalBytesWritten.w2(emitByteCount);
        sink.v1e(this.b1g_1, emitByteCount);
      }
    }
    if (this.b1g_1.m().b1(new Long(0, 0)) > 0) {
      totalBytesWritten = totalBytesWritten.w2(this.b1g_1.m());
      sink.v1e(this.b1g_1, this.b1g_1.m());
    }
    return totalBytesWritten;
  };
  protoOf(RealSource).h1e = function () {
    this.u1d(new Long(2, 0));
    return this.b1g_1.h1e();
  };
  protoOf(RealSource).y1e = function () {
    // Inline function 'kotlinx.io.RealSource.checkNotClosed' call
    // Inline function 'kotlin.check' call
    if (!!this.a1g_1) {
      var message = 'Source is closed.';
      throw IllegalStateException_init_$Create$(toString(message));
    }
    return buffered(new PeekSource(this));
  };
  protoOf(RealSource).e4 = function () {
    if (this.a1g_1)
      return Unit_instance;
    this.a1g_1 = true;
    this.z1f_1.e4();
    this.b1g_1.d2();
  };
  protoOf(RealSource).toString = function () {
    return 'buffered(' + toString(this.z1f_1) + ')';
  };
  function Segment_init_$Init$($this) {
    Segment.call($this);
    $this.x1d_1 = new Int8Array(8192);
    $this.b1e_1 = true;
    $this.a1e_1 = null;
    return $this;
  }
  function Segment_init_$Create$() {
    return Segment_init_$Init$(objectCreate(protoOf(Segment)));
  }
  function Segment_init_$Init$_0(data, pos, limit, shareToken, owner, $this) {
    Segment.call($this);
    $this.x1d_1 = data;
    $this.y1d_1 = pos;
    $this.z1d_1 = limit;
    $this.a1e_1 = shareToken;
    $this.b1e_1 = owner;
    return $this;
  }
  function Segment_init_$Create$_0(data, pos, limit, shareToken, owner) {
    return Segment_init_$Init$_0(data, pos, limit, shareToken, owner, objectCreate(protoOf(Segment)));
  }
  function Companion() {
    this.c1g_1 = 8192;
    this.d1g_1 = 1024;
  }
  protoOf(Companion).e1g = function () {
    return Segment_init_$Create$();
  };
  var Companion_instance;
  function Companion_getInstance() {
    return Companion_instance;
  }
  protoOf(Segment).h1f = function () {
    var tmp1_safe_receiver = this.a1e_1;
    var tmp0_elvis_lhs = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.f1g();
    return tmp0_elvis_lhs == null ? false : tmp0_elvis_lhs;
  };
  protoOf(Segment).l1e = function () {
    var tmp0_elvis_lhs = this.a1e_1;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      // Inline function 'kotlin.also' call
      var this_0 = SegmentPool_instance.g1g();
      this.a1e_1 = this_0;
      tmp = this_0;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var t = tmp;
    var tmp_0 = this.y1d_1;
    var tmp_1 = this.z1d_1;
    // Inline function 'kotlin.also' call
    t.h1g();
    return Segment_init_$Create$_0(this.x1d_1, tmp_0, tmp_1, t, false);
  };
  protoOf(Segment).k1f = function () {
    var result = this.c1e_1;
    if (!(this.d1e_1 == null)) {
      ensureNotNull(this.d1e_1).c1e_1 = this.c1e_1;
    }
    if (!(this.c1e_1 == null)) {
      ensureNotNull(this.c1e_1).d1e_1 = this.d1e_1;
    }
    this.c1e_1 = null;
    this.d1e_1 = null;
    return result;
  };
  protoOf(Segment).m1e = function (segment) {
    segment.d1e_1 = this;
    segment.c1e_1 = this.c1e_1;
    if (!(this.c1e_1 == null)) {
      ensureNotNull(this.c1e_1).d1e_1 = segment;
    }
    this.c1e_1 = segment;
    return segment;
  };
  protoOf(Segment).i1f = function (byteCount) {
    // Inline function 'kotlin.require' call
    if (!(byteCount > 0 && byteCount <= (this.z1d_1 - this.y1d_1 | 0))) {
      var message = 'byteCount out of range';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    var prefix;
    if (byteCount >= 1024) {
      prefix = this.l1e();
    } else {
      prefix = SegmentPool_instance.c1f();
      var tmp1 = this.x1d_1;
      var tmp2 = prefix.x1d_1;
      var tmp3 = this.y1d_1;
      // Inline function 'kotlin.collections.copyInto' call
      var endIndex = this.y1d_1 + byteCount | 0;
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      var tmp = tmp1;
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      arrayCopy(tmp, tmp2, 0, tmp3, endIndex);
    }
    prefix.z1d_1 = prefix.y1d_1 + byteCount | 0;
    this.y1d_1 = this.y1d_1 + byteCount | 0;
    if (!(this.d1e_1 == null)) {
      ensureNotNull(this.d1e_1).m1e(prefix);
    } else {
      prefix.c1e_1 = this;
      this.d1e_1 = prefix;
    }
    return prefix;
  };
  protoOf(Segment).n1e = function () {
    // Inline function 'kotlin.check' call
    if (!!(this.d1e_1 == null)) {
      var message = 'cannot compact';
      throw IllegalStateException_init_$Create$(toString(message));
    }
    if (!ensureNotNull(this.d1e_1).b1e_1)
      return this;
    var byteCount = this.z1d_1 - this.y1d_1 | 0;
    var availableByteCount = (8192 - ensureNotNull(this.d1e_1).z1d_1 | 0) + (ensureNotNull(this.d1e_1).h1f() ? 0 : ensureNotNull(this.d1e_1).y1d_1) | 0;
    if (byteCount > availableByteCount)
      return this;
    var predecessor = this.d1e_1;
    this.j1f(ensureNotNull(predecessor), byteCount);
    var successor = this.k1f();
    // Inline function 'kotlin.check' call
    if (!(successor == null)) {
      throw IllegalStateException_init_$Create$('Check failed.');
    }
    SegmentPool_instance.r1f(this);
    return predecessor;
  };
  protoOf(Segment).n1f = function (byte) {
    var _unary__edvuaz = this.z1d_1;
    this.z1d_1 = _unary__edvuaz + 1 | 0;
    this.x1d_1[_unary__edvuaz] = byte;
  };
  protoOf(Segment).p1f = function (short) {
    var data = this.x1d_1;
    var limit = this.z1d_1;
    var _unary__edvuaz = limit;
    limit = _unary__edvuaz + 1 | 0;
    data[_unary__edvuaz] = toByte((short >>> 8 | 0) & 255);
    var _unary__edvuaz_0 = limit;
    limit = _unary__edvuaz_0 + 1 | 0;
    data[_unary__edvuaz_0] = toByte(short & 255);
    this.z1d_1 = limit;
  };
  protoOf(Segment).g1e = function () {
    var _unary__edvuaz = this.y1d_1;
    this.y1d_1 = _unary__edvuaz + 1 | 0;
    return this.x1d_1[_unary__edvuaz];
  };
  protoOf(Segment).i1e = function () {
    var data = this.x1d_1;
    var pos = this.y1d_1;
    var _unary__edvuaz = pos;
    pos = _unary__edvuaz + 1 | 0;
    // Inline function 'kotlinx.io.and' call
    var tmp = (data[_unary__edvuaz] & 255) << 8;
    var _unary__edvuaz_0 = pos;
    pos = _unary__edvuaz_0 + 1 | 0;
    // Inline function 'kotlinx.io.and' call
    var tmp$ret$1 = data[_unary__edvuaz_0] & 255;
    var s = toShort(tmp | tmp$ret$1);
    this.y1d_1 = pos;
    return s;
  };
  protoOf(Segment).j1f = function (sink, byteCount) {
    // Inline function 'kotlin.check' call
    if (!sink.b1e_1) {
      var message = 'only owner can write';
      throw IllegalStateException_init_$Create$(toString(message));
    }
    if ((sink.z1d_1 + byteCount | 0) > 8192) {
      if (sink.h1f())
        throw IllegalArgumentException_init_$Create$_0();
      if (((sink.z1d_1 + byteCount | 0) - sink.y1d_1 | 0) > 8192)
        throw IllegalArgumentException_init_$Create$_0();
      var tmp1 = sink.x1d_1;
      var tmp2 = sink.x1d_1;
      var tmp3 = sink.y1d_1;
      // Inline function 'kotlin.collections.copyInto' call
      var endIndex = sink.z1d_1;
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      var tmp = tmp1;
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      arrayCopy(tmp, tmp2, 0, tmp3, endIndex);
      sink.z1d_1 = sink.z1d_1 - sink.y1d_1 | 0;
      sink.y1d_1 = 0;
    }
    var tmp6 = this.x1d_1;
    var tmp7 = sink.x1d_1;
    var tmp8 = sink.z1d_1;
    var tmp9 = this.y1d_1;
    // Inline function 'kotlin.collections.copyInto' call
    var endIndex_0 = this.y1d_1 + byteCount | 0;
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp_0 = tmp6;
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    arrayCopy(tmp_0, tmp7, tmp8, tmp9, endIndex_0);
    sink.z1d_1 = sink.z1d_1 + byteCount | 0;
    this.y1d_1 = this.y1d_1 + byteCount | 0;
  };
  protoOf(Segment).t1e = function (dst, dstStartOffset, dstEndOffset) {
    var len = dstEndOffset - dstStartOffset | 0;
    var tmp0 = this.x1d_1;
    var tmp3 = this.y1d_1;
    // Inline function 'kotlin.collections.copyInto' call
    var endIndex = this.y1d_1 + len | 0;
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp = tmp0;
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    arrayCopy(tmp, dst, dstStartOffset, tmp3, endIndex);
    this.y1d_1 = this.y1d_1 + len | 0;
  };
  protoOf(Segment).f1f = function (src, srcStartOffset, srcEndOffset) {
    var tmp1 = this.x1d_1;
    // Inline function 'kotlin.collections.copyInto' call
    var destinationOffset = this.z1d_1;
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp = src;
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    arrayCopy(tmp, tmp1, destinationOffset, srcStartOffset, srcEndOffset);
    this.z1d_1 = this.z1d_1 + (srcEndOffset - srcStartOffset | 0) | 0;
  };
  protoOf(Segment).e1e = function () {
    return this.z1d_1 - this.y1d_1 | 0;
  };
  protoOf(Segment).e1f = function () {
    return this.x1d_1.length - this.z1d_1 | 0;
  };
  protoOf(Segment).i1g = function (readOnly) {
    return this.x1d_1;
  };
  protoOf(Segment).q1e = function (index) {
    return this.x1d_1[this.y1d_1 + index | 0];
  };
  protoOf(Segment).j1g = function (index, value) {
    this.x1d_1[this.z1d_1 + index | 0] = value;
  };
  protoOf(Segment).k1g = function (index, b0, b1) {
    var d = this.x1d_1;
    var l = this.z1d_1;
    d[l + index | 0] = b0;
    d[(l + index | 0) + 1 | 0] = b1;
  };
  protoOf(Segment).l1g = function (index, b0, b1, b2) {
    var d = this.x1d_1;
    var l = this.z1d_1;
    d[l + index | 0] = b0;
    d[(l + index | 0) + 1 | 0] = b1;
    d[(l + index | 0) + 2 | 0] = b2;
  };
  protoOf(Segment).m1g = function (index, b0, b1, b2, b3) {
    var d = this.x1d_1;
    var l = this.z1d_1;
    d[l + index | 0] = b0;
    d[(l + index | 0) + 1 | 0] = b1;
    d[(l + index | 0) + 2 | 0] = b2;
    d[(l + index | 0) + 3 | 0] = b3;
  };
  function Segment() {
    this.y1d_1 = 0;
    this.z1d_1 = 0;
    this.a1e_1 = null;
    this.b1e_1 = false;
    this.c1e_1 = null;
    this.d1e_1 = null;
  }
  function SegmentCopyTracker() {
  }
  function isEmpty(_this__u8e3s4) {
    return _this__u8e3s4.e1e() === 0;
  }
  function AlwaysSharedCopyTracker() {
    AlwaysSharedCopyTracker_instance = this;
    SegmentCopyTracker.call(this);
  }
  protoOf(AlwaysSharedCopyTracker).f1g = function () {
    return true;
  };
  protoOf(AlwaysSharedCopyTracker).h1g = function () {
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
      while (_this__u8e3s4.s1d().m().b1(new Long(2147483647, 0)) < 0 && _this__u8e3s4.v1d(fetchSize)) {
        // Inline function 'kotlin.Long.times' call
        fetchSize = fetchSize.y2(toLong(2));
      }
      // Inline function 'kotlin.check' call
      if (!(_this__u8e3s4.s1d().m().b1(new Long(2147483647, 0)) < 0)) {
        var message = "Can't create an array of size " + _this__u8e3s4.s1d().m().toString();
        throw IllegalStateException_init_$Create$(toString(message));
      }
      arraySize = _this__u8e3s4.s1d().m().g1();
    } else {
      _this__u8e3s4.u1d(toLong(size));
    }
    var array = new Int8Array(arraySize);
    readTo(_this__u8e3s4.s1d(), array);
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
      var bytesRead = _this__u8e3s4.s1e(sink, offset, endIndex);
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
    _this__u8e3s4.v1d(new Long(-1, 2147483647));
    return commonReadUtf8(_this__u8e3s4.s1d(), _this__u8e3s4.s1d().m());
  }
  function readString_0(_this__u8e3s4, byteCount) {
    _this__u8e3s4.u1d(byteCount);
    return commonReadUtf8(_this__u8e3s4.s1d(), byteCount);
  }
  function readString_1(_this__u8e3s4) {
    return commonReadUtf8(_this__u8e3s4, _this__u8e3s4.m());
  }
  function commonReadUtf8(_this__u8e3s4, byteCount) {
    if (byteCount.equals(new Long(0, 0)))
      return '';
    // Inline function 'kotlinx.io.unsafe.UnsafeBufferOperations.forEachSegment' call
    var curr = _this__u8e3s4.p1d_1;
    while (!(curr == null)) {
      get_SegmentReadContextImpl();
      if (toLong(curr.e1e()).b1(byteCount) >= 0) {
        var result = '';
        // Inline function 'kotlinx.io.unsafe.withData' call
        var tmp2 = curr.i1g(true);
        var tmp3 = curr.y1d_1;
        var tmp0 = curr.z1d_1;
        // Inline function 'kotlin.math.min' call
        var b = tmp3 + byteCount.g1() | 0;
        var tmp$ret$0 = Math.min(tmp0, b);
        result = commonToUtf8String(tmp2, tmp3, tmp$ret$0);
        _this__u8e3s4.r1e(byteCount);
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
    var this_0 = _this__u8e3s4.s1d();
    var i = startIndex;
    while (i < endIndex) {
      var p0 = i;
      // Inline function 'kotlin.code' call
      var this_1 = charSequenceGet(string, p0);
      var c = Char__toInt_impl_vasixd(this_1);
      if (c < 128) {
        $l$block_0: {
          // Inline function 'kotlinx.io.unsafe.UnsafeBufferOperations.writeToTail' call
          var tail = this_0.z1e(1);
          var ctx = get_SegmentWriteContextImpl();
          var segmentOffset = -i | 0;
          // Inline function 'kotlin.comparisons.minOf' call
          var b = i + tail.e1f() | 0;
          var runLimit = Math.min(endIndex, b);
          var _unary__edvuaz = i;
          i = _unary__edvuaz + 1 | 0;
          ctx.q1g(tail, segmentOffset + _unary__edvuaz | 0, toByte(c));
          $l$loop: while (i < runLimit) {
            var p0_0 = i;
            // Inline function 'kotlin.code' call
            var this_2 = charSequenceGet(string, p0_0);
            c = Char__toInt_impl_vasixd(this_2);
            if (c >= 128)
              break $l$loop;
            var _unary__edvuaz_0 = i;
            i = _unary__edvuaz_0 + 1 | 0;
            ctx.q1g(tail, segmentOffset + _unary__edvuaz_0 | 0, toByte(c));
          }
          var bytesWritten = i + segmentOffset | 0;
          if (bytesWritten === 1) {
            tail.z1d_1 = tail.z1d_1 + bytesWritten | 0;
            var tmp = this_0;
            // Inline function 'kotlin.Long.plus' call
            tmp.r1d_1 = this_0.r1d_1.w2(toLong(bytesWritten));
            break $l$block_0;
          }
          // Inline function 'kotlin.check' call
          if (!(0 <= bytesWritten ? bytesWritten <= tail.e1f() : false)) {
            var message = 'Invalid number of bytes written: ' + bytesWritten + '. Should be in 0..' + tail.e1f();
            throw IllegalStateException_init_$Create$(toString(message));
          }
          if (!(bytesWritten === 0)) {
            tail.z1d_1 = tail.z1d_1 + bytesWritten | 0;
            var tmp_0 = this_0;
            // Inline function 'kotlin.Long.plus' call
            tmp_0.r1d_1 = this_0.r1d_1.w2(toLong(bytesWritten));
            break $l$block_0;
          }
          if (isEmpty(tail)) {
            this_0.s1f();
          }
        }
      } else if (c < 2048) {
        $l$block_2: {
          // Inline function 'kotlinx.io.unsafe.UnsafeBufferOperations.writeToTail' call
          var tail_0 = this_0.z1e(2);
          get_SegmentWriteContextImpl().p1g(tail_0, 0, toByte(c >> 6 | 192), toByte(c & 63 | 128));
          var bytesWritten_0 = 2;
          if (bytesWritten_0 === 2) {
            tail_0.z1d_1 = tail_0.z1d_1 + bytesWritten_0 | 0;
            var tmp_1 = this_0;
            // Inline function 'kotlin.Long.plus' call
            tmp_1.r1d_1 = this_0.r1d_1.w2(toLong(bytesWritten_0));
            break $l$block_2;
          }
          // Inline function 'kotlin.check' call
          if (!(0 <= bytesWritten_0 ? bytesWritten_0 <= tail_0.e1f() : false)) {
            var message_0 = 'Invalid number of bytes written: ' + bytesWritten_0 + '. Should be in 0..' + tail_0.e1f();
            throw IllegalStateException_init_$Create$(toString(message_0));
          }
          if (!(bytesWritten_0 === 0)) {
            tail_0.z1d_1 = tail_0.z1d_1 + bytesWritten_0 | 0;
            var tmp_2 = this_0;
            // Inline function 'kotlin.Long.plus' call
            tmp_2.r1d_1 = this_0.r1d_1.w2(toLong(bytesWritten_0));
            break $l$block_2;
          }
          if (isEmpty(tail_0)) {
            this_0.s1f();
          }
        }
        i = i + 1 | 0;
      } else if (c < 55296 || c > 57343) {
        $l$block_4: {
          // Inline function 'kotlinx.io.unsafe.UnsafeBufferOperations.writeToTail' call
          var tail_1 = this_0.z1e(3);
          get_SegmentWriteContextImpl().o1g(tail_1, 0, toByte(c >> 12 | 224), toByte(c >> 6 & 63 | 128), toByte(c & 63 | 128));
          var bytesWritten_1 = 3;
          if (bytesWritten_1 === 3) {
            tail_1.z1d_1 = tail_1.z1d_1 + bytesWritten_1 | 0;
            var tmp_3 = this_0;
            // Inline function 'kotlin.Long.plus' call
            tmp_3.r1d_1 = this_0.r1d_1.w2(toLong(bytesWritten_1));
            break $l$block_4;
          }
          // Inline function 'kotlin.check' call
          if (!(0 <= bytesWritten_1 ? bytesWritten_1 <= tail_1.e1f() : false)) {
            var message_1 = 'Invalid number of bytes written: ' + bytesWritten_1 + '. Should be in 0..' + tail_1.e1f();
            throw IllegalStateException_init_$Create$(toString(message_1));
          }
          if (!(bytesWritten_1 === 0)) {
            tail_1.z1d_1 = tail_1.z1d_1 + bytesWritten_1 | 0;
            var tmp_4 = this_0;
            // Inline function 'kotlin.Long.plus' call
            tmp_4.r1d_1 = this_0.r1d_1.w2(toLong(bytesWritten_1));
            break $l$block_4;
          }
          if (isEmpty(tail_1)) {
            this_0.s1f();
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
          this_0.m1f(toByte(tmp$ret$26));
          i = i + 1 | 0;
        } else {
          var codePoint = 65536 + ((c & 1023) << 10 | low & 1023) | 0;
          $l$block_6: {
            // Inline function 'kotlinx.io.unsafe.UnsafeBufferOperations.writeToTail' call
            var tail_2 = this_0.z1e(4);
            get_SegmentWriteContextImpl().n1g(tail_2, 0, toByte(codePoint >> 18 | 240), toByte(codePoint >> 12 & 63 | 128), toByte(codePoint >> 6 & 63 | 128), toByte(codePoint & 63 | 128));
            var bytesWritten_2 = 4;
            if (bytesWritten_2 === 4) {
              tail_2.z1d_1 = tail_2.z1d_1 + bytesWritten_2 | 0;
              var tmp_6 = this_0;
              // Inline function 'kotlin.Long.plus' call
              tmp_6.r1d_1 = this_0.r1d_1.w2(toLong(bytesWritten_2));
              break $l$block_6;
            }
            // Inline function 'kotlin.check' call
            if (!(0 <= bytesWritten_2 ? bytesWritten_2 <= tail_2.e1f() : false)) {
              var message_2 = 'Invalid number of bytes written: ' + bytesWritten_2 + '. Should be in 0..' + tail_2.e1f();
              throw IllegalStateException_init_$Create$(toString(message_2));
            }
            if (!(bytesWritten_2 === 0)) {
              tail_2.z1d_1 = tail_2.z1d_1 + bytesWritten_2 | 0;
              var tmp_7 = this_0;
              // Inline function 'kotlin.Long.plus' call
              tmp_7.r1d_1 = this_0.r1d_1.w2(toLong(bytesWritten_2));
              break $l$block_6;
            }
            if (isEmpty(tail_2)) {
              this_0.s1f();
            }
          }
          i = i + 2 | 0;
        }
      }
    }
    _this__u8e3s4.j1e();
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
  protoOf(SegmentReadContextImpl$1).q1f = function (segment, offset) {
    return segment.q1e(offset);
  };
  function SegmentWriteContextImpl$1() {
  }
  protoOf(SegmentWriteContextImpl$1).q1g = function (segment, offset, value) {
    segment.j1g(offset, value);
  };
  protoOf(SegmentWriteContextImpl$1).p1g = function (segment, offset, b0, b1) {
    segment.k1g(offset, b0, b1);
  };
  protoOf(SegmentWriteContextImpl$1).o1g = function (segment, offset, b0, b1, b2) {
    segment.l1g(offset, b0, b1, b2);
  };
  protoOf(SegmentWriteContextImpl$1).n1g = function (segment, offset, b0, b1, b2, b3) {
    segment.m1g(offset, b0, b1, b2, b3);
  };
  function BufferIterationContextImpl$1() {
  }
  protoOf(BufferIterationContextImpl$1).q1f = function (segment, offset) {
    return get_SegmentReadContextImpl().q1f(segment, offset);
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
    this.a1f_1 = 0;
    this.b1f_1 = 0;
  }
  protoOf(SegmentPool).c1f = function () {
    return Companion_instance.e1g();
  };
  protoOf(SegmentPool).r1f = function (segment) {
  };
  protoOf(SegmentPool).g1g = function () {
    return AlwaysSharedCopyTracker_getInstance();
  };
  var SegmentPool_instance;
  function SegmentPool_getInstance() {
    return SegmentPool_instance;
  }
  //region block: post-declaration
  protoOf(Buffer).g1f = write$default;
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
