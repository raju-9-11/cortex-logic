(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js', './kotlinx-coroutines-core.js', './kotlinx-io-kotlinx-io-core.js', './kotlinx-atomicfu.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'), require('./kotlinx-coroutines-core.js'), require('./kotlinx-io-kotlinx-io-core.js'), require('./kotlinx-atomicfu.js'));
  else {
    if (typeof globalThis['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'ktor-ktor-io'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'ktor-ktor-io'.");
    }
    if (typeof globalThis['kotlinx-coroutines-core'] === 'undefined') {
      throw new Error("Error loading module 'ktor-ktor-io'. Its dependency 'kotlinx-coroutines-core' was not found. Please, check whether 'kotlinx-coroutines-core' is loaded prior to 'ktor-ktor-io'.");
    }
    if (typeof globalThis['kotlinx-io-kotlinx-io-core'] === 'undefined') {
      throw new Error("Error loading module 'ktor-ktor-io'. Its dependency 'kotlinx-io-kotlinx-io-core' was not found. Please, check whether 'kotlinx-io-kotlinx-io-core' is loaded prior to 'ktor-ktor-io'.");
    }
    if (typeof globalThis['kotlinx-atomicfu'] === 'undefined') {
      throw new Error("Error loading module 'ktor-ktor-io'. Its dependency 'kotlinx-atomicfu' was not found. Please, check whether 'kotlinx-atomicfu' is loaded prior to 'ktor-ktor-io'.");
    }
    globalThis['ktor-ktor-io'] = factory(typeof globalThis['ktor-ktor-io'] === 'undefined' ? {} : globalThis['ktor-ktor-io'], globalThis['kotlin-kotlin-stdlib'], globalThis['kotlinx-coroutines-core'], globalThis['kotlinx-io-kotlinx-io-core'], globalThis['kotlinx-atomicfu']);
  }
}(function (_, kotlin_kotlin, kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core, kotlin_org_jetbrains_kotlinx_kotlinx_io_core, kotlin_org_jetbrains_kotlinx_atomicfu) {
  'use strict';
  //region block: imports
  var Companion_instance = kotlin_kotlin.$_$.d5;
  var Unit_instance = kotlin_kotlin.$_$.i5;
  var _Result___init__impl__xyqfz8 = kotlin_kotlin.$_$.y2;
  var protoOf = kotlin_kotlin.$_$.ic;
  var initMetadataForCompanion = kotlin_kotlin.$_$.fb;
  var THROW_CCE = kotlin_kotlin.$_$.wg;
  var initMetadataForObject = kotlin_kotlin.$_$.kb;
  var toString = kotlin_kotlin.$_$.bi;
  var hashCode = kotlin_kotlin.$_$.db;
  var equals = kotlin_kotlin.$_$.xa;
  var initMetadataForClass = kotlin_kotlin.$_$.eb;
  var createFailure = kotlin_kotlin.$_$.nh;
  var Result = kotlin_kotlin.$_$.ug;
  var initMetadataForInterface = kotlin_kotlin.$_$.ib;
  var toString_0 = kotlin_kotlin.$_$.pf;
  var newThrowable = kotlin_kotlin.$_$.bc;
  var stackTraceToString = kotlin_kotlin.$_$.xh;
  var VOID = kotlin_kotlin.$_$.i;
  var isInterface = kotlin_kotlin.$_$.tb;
  var CoroutineImpl = kotlin_kotlin.$_$.ha;
  var toLong = kotlin_kotlin.$_$.kc;
  var numberToLong = kotlin_kotlin.$_$.gc;
  var intercepted = kotlin_kotlin.$_$.u9;
  var CancellableContinuationImpl = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.s;
  var noWhenBranchMatchedException = kotlin_kotlin.$_$.vh;
  var returnIfSuspended = kotlin_kotlin.$_$.n;
  var get_COROUTINE_SUSPENDED = kotlin_kotlin.$_$.r9;
  var Long = kotlin_kotlin.$_$.rg;
  var initMetadataForCoroutine = kotlin_kotlin.$_$.gb;
  var Buffer = kotlin_org_jetbrains_kotlinx_kotlinx_io_core.$_$.e;
  var atomic$ref$1 = kotlin_org_jetbrains_kotlinx_atomicfu.$_$.d;
  var IOException_init_$Create$ = kotlin_org_jetbrains_kotlinx_kotlinx_io_core.$_$.c;
  var IllegalStateException = kotlin_kotlin.$_$.qg;
  var IllegalStateException_init_$Init$ = kotlin_kotlin.$_$.b2;
  var captureStack = kotlin_kotlin.$_$.pa;
  var EOFException_init_$Create$ = kotlin_org_jetbrains_kotlinx_kotlinx_io_core.$_$.a;
  var StringBuilder_init_$Create$ = kotlin_kotlin.$_$.j1;
  var readString = kotlin_org_jetbrains_kotlinx_kotlinx_io_core.$_$.l;
  var closeFinally = kotlin_kotlin.$_$.lh;
  var EmptyCoroutineContext_getInstance = kotlin_kotlin.$_$.o4;
  var CoroutineScope = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.z;
  var launch = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.k1;
  var startCoroutineCancellable = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.r;
  var Continuation = kotlin_kotlin.$_$.ba;
  var initMetadataForFunctionReference = kotlin_kotlin.$_$.hb;
  var get_job = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.j1;
  var Job = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.a1;
  var cancel = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.g1;
  var initMetadataForLambda = kotlin_kotlin.$_$.jb;
  var CopyableThrowable = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.w;
  var IOException = kotlin_org_jetbrains_kotlinx_kotlinx_io_core.$_$.f;
  var IOException_init_$Create$_0 = kotlin_org_jetbrains_kotlinx_kotlinx_io_core.$_$.d;
  var CancellationException_init_$Create$ = kotlin_kotlin.$_$.f1;
  var CancellationException = kotlin_kotlin.$_$.q9;
  var readString_0 = kotlin_org_jetbrains_kotlinx_kotlinx_io_core.$_$.j;
  var StringBuilder_init_$Create$_0 = kotlin_kotlin.$_$.i1;
  var IllegalStateException_init_$Create$ = kotlin_kotlin.$_$.a2;
  var charSequenceLength = kotlin_kotlin.$_$.ta;
  var readByteArray = kotlin_org_jetbrains_kotlinx_kotlinx_io_core.$_$.h;
  var readString_1 = kotlin_org_jetbrains_kotlinx_kotlinx_io_core.$_$.k;
  var encodeToByteArray = kotlin_kotlin.$_$.wd;
  var toString_1 = kotlin_kotlin.$_$.mc;
  var writeString = kotlin_org_jetbrains_kotlinx_kotlinx_io_core.$_$.m;
  var _Char___init__impl__6a9atx = kotlin_kotlin.$_$.q2;
  var replace = kotlin_kotlin.$_$.ue;
  var IllegalArgumentException_init_$Create$ = kotlin_kotlin.$_$.w1;
  var getStringHashCode = kotlin_kotlin.$_$.cb;
  var IOException_init_$Init$ = kotlin_org_jetbrains_kotlinx_kotlinx_io_core.$_$.b;
  var readByteArray_0 = kotlin_org_jetbrains_kotlinx_kotlinx_io_core.$_$.i;
  var charSequenceSubSequence = kotlin_kotlin.$_$.ua;
  var isCharSequence = kotlin_kotlin.$_$.pb;
  var trim = kotlin_kotlin.$_$.cg;
  var toByte = kotlin_kotlin.$_$.jc;
  var decodeToString = kotlin_kotlin.$_$.sd;
  var setOf = kotlin_kotlin.$_$.q8;
  var charSequenceGet = kotlin_kotlin.$_$.sa;
  var Char__toInt_impl_vasixd = kotlin_kotlin.$_$.w2;
  //endregion
  //region block: pre-declaration
  initMetadataForCompanion(Companion);
  initMetadataForObject(Empty, 'Empty');
  initMetadataForClass(Closed, 'Closed');
  function resume() {
    return this.v1g().m9(Companion_getInstance().s1g_1);
  }
  function resume_0(throwable) {
    var tmp = this.v1g();
    var tmp_0;
    if (throwable == null) {
      tmp_0 = null;
    } else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.Companion.failure' call
      var tmp$ret$2 = _Result___init__impl__xyqfz8(createFailure(throwable));
      tmp_0 = new Result(tmp$ret$2);
    }
    var tmp1_elvis_lhs = tmp_0;
    return tmp.m9(tmp1_elvis_lhs == null ? Companion_getInstance().s1g_1 : tmp1_elvis_lhs.am_1);
  }
  initMetadataForInterface(Task, 'Task');
  initMetadataForClass(Read, 'Read', VOID, VOID, [Task]);
  initMetadataForClass(Write, 'Write', VOID, VOID, [Task]);
  initMetadataForCoroutine($awaitContentCOROUTINE$0, CoroutineImpl);
  initMetadataForCoroutine($flushCOROUTINE$1, CoroutineImpl);
  initMetadataForCoroutine($flushAndCloseCOROUTINE$2, CoroutineImpl);
  function awaitContent$default(min, $completion, $super) {
    min = min === VOID ? 1 : min;
    return $super === VOID ? this.f1j(min, $completion) : $super.f1j.call(this, min, $completion);
  }
  initMetadataForInterface(ByteReadChannel_1, 'ByteReadChannel', VOID, VOID, VOID, [1]);
  initMetadataForClass(ByteChannel, 'ByteChannel', ByteChannel, VOID, [ByteReadChannel_1], [1, 0]);
  initMetadataForClass(ConcurrentIOException, 'ConcurrentIOException', VOID, IllegalStateException);
  initMetadataForClass(ByteReadChannel$Companion$Empty$1, VOID, VOID, VOID, [ByteReadChannel_1], [1]);
  initMetadataForCompanion(Companion_0);
  initMetadataForCoroutine($readRemainingCOROUTINE$3, CoroutineImpl);
  initMetadataForCoroutine($readPacketCOROUTINE$4, CoroutineImpl);
  initMetadataForCoroutine($readAvailableCOROUTINE$8, CoroutineImpl);
  initMetadataForCoroutine($readUTF8LineCOROUTINE$9, CoroutineImpl);
  initMetadataForCoroutine($toByteArrayCOROUTINE$10, CoroutineImpl);
  initMetadataForCoroutine($copyToCOROUTINE$11, CoroutineImpl);
  initMetadataForCoroutine($readUTF8LineToCOROUTINE$12, CoroutineImpl);
  initMetadataForCoroutine($readBufferCOROUTINE$13, CoroutineImpl);
  initMetadataForCoroutine($flushIfNeededCOROUTINE$15, CoroutineImpl);
  initMetadataForClass(WriterJob, 'WriterJob');
  initMetadataForClass(WriterScope, 'WriterScope', VOID, VOID, [CoroutineScope]);
  initMetadataForClass(NO_CALLBACK$1, VOID, VOID, VOID, [Continuation]);
  initMetadataForFunctionReference(ByteWriteChannel$flushAndClose$ref, VOID, VOID, [0]);
  initMetadataForLambda(writer$slambda, CoroutineImpl, VOID, [1]);
  initMetadataForClass(CloseToken, 'CloseToken');
  initMetadataForClass(SourceByteReadChannel, 'SourceByteReadChannel', VOID, VOID, [ByteReadChannel_1], [1]);
  initMetadataForClass(MalformedInputException, 'MalformedInputException', VOID, IOException);
  initMetadataForClass(TooLongLineException, 'TooLongLineException', VOID, MalformedInputException);
  function close() {
    this.cs();
  }
  initMetadataForInterface(ObjectPool, 'ObjectPool');
  initMetadataForClass(DefaultPool, 'DefaultPool', VOID, VOID, [ObjectPool]);
  initMetadataForClass(ByteArrayPool$1, VOID, VOID, DefaultPool);
  initMetadataForCompanion(Companion_1);
  initMetadataForClass(Charset, 'Charset');
  initMetadataForObject(Charsets, 'Charsets');
  initMetadataForClass(CharsetDecoder, 'CharsetDecoder');
  initMetadataForClass(CharsetEncoder, 'CharsetEncoder');
  initMetadataForClass(CharsetImpl, 'CharsetImpl', VOID, Charset);
  initMetadataForClass(CharsetEncoderImpl, 'CharsetEncoderImpl', VOID, CharsetEncoder);
  initMetadataForClass(CharsetDecoderImpl, 'CharsetDecoderImpl', VOID, CharsetDecoder);
  initMetadataForClass(toKtor$1);
  initMetadataForClass(TextDecoderFallback, 'TextDecoderFallback');
  //endregion
  function Companion() {
    Companion_instance_0 = this;
    this.r1g_1 = new Closed(null);
    var tmp = this;
    // Inline function 'kotlin.Companion.success' call
    tmp.s1g_1 = _Result___init__impl__xyqfz8(Unit_instance);
  }
  var Companion_instance_0;
  function Companion_getInstance() {
    if (Companion_instance_0 == null)
      new Companion();
    return Companion_instance_0;
  }
  function Empty() {
  }
  protoOf(Empty).toString = function () {
    return 'Empty';
  };
  protoOf(Empty).hashCode = function () {
    return -231472095;
  };
  protoOf(Empty).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Empty))
      return false;
    other instanceof Empty || THROW_CCE();
    return true;
  };
  var Empty_instance;
  function Empty_getInstance() {
    return Empty_instance;
  }
  function Closed(cause) {
    this.t1g_1 = cause;
  }
  protoOf(Closed).toString = function () {
    return 'Closed(cause=' + toString(this.t1g_1) + ')';
  };
  protoOf(Closed).hashCode = function () {
    return this.t1g_1 == null ? 0 : hashCode(this.t1g_1);
  };
  protoOf(Closed).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Closed))
      return false;
    var tmp0_other_with_cast = other instanceof Closed ? other : THROW_CCE();
    if (!equals(this.t1g_1, tmp0_other_with_cast.t1g_1))
      return false;
    return true;
  };
  function Task() {
  }
  function Read(continuation) {
    this.z1g_1 = continuation;
    this.a1h_1 = null;
    if (get_DEVELOPMENT_MODE()) {
      var tmp = this;
      // Inline function 'kotlin.also' call
      var this_0 = newThrowable('ReadTask 0x' + toString_0(hashCode(this.z1g_1), 16));
      stackTraceToString(this_0);
      tmp.a1h_1 = this_0;
    }
  }
  protoOf(Read).v1g = function () {
    return this.z1g_1;
  };
  protoOf(Read).u1g = function () {
    return this.a1h_1;
  };
  protoOf(Read).w1g = function () {
    return 'read';
  };
  function Write(continuation) {
    this.b1h_1 = continuation;
    this.c1h_1 = null;
    if (get_DEVELOPMENT_MODE()) {
      var tmp = this;
      // Inline function 'kotlin.also' call
      var this_0 = newThrowable('WriteTask 0x' + toString_0(hashCode(this.b1h_1), 16));
      stackTraceToString(this_0);
      tmp.c1h_1 = this_0;
    }
  }
  protoOf(Write).v1g = function () {
    return this.b1h_1;
  };
  protoOf(Write).u1g = function () {
    return this.c1h_1;
  };
  protoOf(Write).w1g = function () {
    return 'write';
  };
  function moveFlushToReadBuffer($this) {
    // Inline function 'io.ktor.utils.io.locks.synchronized' call
    $this.g1h_1;
    $this.e1h_1.x1e($this.i1h_1);
    $this.f1h_1 = 0;
    // Inline function 'io.ktor.utils.io.ByteChannel.resumeSlot' call
    var current = $this.h1h_1.kotlinx$atomicfu$value;
    var tmp;
    if (current instanceof Write) {
      tmp = $this.h1h_1.atomicfu$compareAndSet(current, Empty_instance);
    } else {
      tmp = false;
    }
    if (tmp) {
      current.x1g();
    }
  }
  function closeSlot($this, cause) {
    var closeContinuation = !(cause == null) ? new Closed(cause) : Companion_getInstance().r1g_1;
    var continuation = $this.h1h_1.atomicfu$getAndSet(closeContinuation);
    if (!isInterface(continuation, Task))
      return Unit_instance;
    continuation.y1g(cause);
  }
  function $awaitContentCOROUTINE$0(_this__u8e3s4, min, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.t1h_1 = _this__u8e3s4;
    this.u1h_1 = min;
  }
  protoOf($awaitContentCOROUTINE$0).j9 = function () {
    var suspendResult = this.d9_1;
    $sm: do
      try {
        var tmp = this.b9_1;
        switch (tmp) {
          case 0:
            this.c9_1 = 4;
            rethrowCloseCauseIfNeeded_1(this.t1h_1);
            if (this.t1h_1.i1h_1.m().b1(toLong(this.u1h_1)) >= 0)
              return true;
            var tmp_0 = this;
            tmp_0.v1h_1 = this.t1h_1;
            this.w1h_1 = this.v1h_1;
            this.b9_1 = 1;
            continue $sm;
          case 1:
            if (!(numberToLong(this.t1h_1.f1h_1).w2(this.t1h_1.i1h_1.m()).b1(toLong(this.u1h_1)) < 0 && this.t1h_1.k1h_1.kotlinx$atomicfu$value == null)) {
              this.b9_1 = 3;
              continue $sm;
            }

            this.b9_1 = 2;
            var cancellable = new CancellableContinuationImpl(intercepted(this), 1);
            cancellable.et();
            var tmp0 = this.w1h_1;
            var tmp1 = new Read(cancellable);
            l$ret$1: do {
              var previous = tmp0.h1h_1.kotlinx$atomicfu$value;
              if (!(previous instanceof Closed)) {
                if (!tmp0.h1h_1.atomicfu$compareAndSet(previous, tmp1)) {
                  tmp1.x1g();
                  break l$ret$1;
                }
              }
              if (previous instanceof Read) {
                previous.y1g(new ConcurrentIOException(tmp1.w1g(), previous.u1g()));
              } else {
                if (isInterface(previous, Task)) {
                  previous.x1g();
                } else {
                  if (previous instanceof Closed) {
                    tmp1.y1g(previous.t1g_1);
                    break l$ret$1;
                  } else {
                    if (!equals(previous, Empty_instance)) {
                      noWhenBranchMatchedException();
                    }
                  }
                }
              }
              if (!(numberToLong(this.t1h_1.f1h_1).w2(this.t1h_1.i1h_1.m()).b1(toLong(this.u1h_1)) < 0 && this.t1h_1.k1h_1.kotlinx$atomicfu$value == null)) {
                var current = tmp0.h1h_1.kotlinx$atomicfu$value;
                var tmp_1;
                if (current instanceof Read) {
                  tmp_1 = tmp0.h1h_1.atomicfu$compareAndSet(current, Empty_instance);
                } else {
                  tmp_1 = false;
                }
                if (tmp_1) {
                  current.x1g();
                }
              }
            }
             while (false);
            suspendResult = returnIfSuspended(cancellable.mt(), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            this.b9_1 = 1;
            continue $sm;
          case 3:
            if (this.t1h_1.i1h_1.m().b1(new Long(1048576, 0)) < 0) {
              moveFlushToReadBuffer(this.t1h_1);
            }

            return this.t1h_1.i1h_1.m().b1(toLong(this.u1h_1)) >= 0;
          case 4:
            throw this.e9_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.c9_1 === 4) {
          throw e;
        } else {
          this.b9_1 = this.c9_1;
          this.e9_1 = e;
        }
      }
     while (true);
  };
  function $flushCOROUTINE$1(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.f1i_1 = _this__u8e3s4;
  }
  protoOf($flushCOROUTINE$1).j9 = function () {
    var suspendResult = this.d9_1;
    $sm: do
      try {
        var tmp = this.b9_1;
        switch (tmp) {
          case 0:
            this.c9_1 = 4;
            rethrowCloseCauseIfNeeded_1(this.f1i_1);
            this.f1i_1.i1i();
            if (this.f1i_1.f1h_1 < 1048576)
              return Unit_instance;
            var tmp_0 = this;
            tmp_0.g1i_1 = this.f1i_1;
            this.h1i_1 = this.g1i_1;
            this.b9_1 = 1;
            continue $sm;
          case 1:
            if (!(this.f1i_1.f1h_1 >= 1048576 && this.f1i_1.k1h_1.kotlinx$atomicfu$value == null)) {
              this.b9_1 = 3;
              continue $sm;
            }

            this.b9_1 = 2;
            var cancellable = new CancellableContinuationImpl(intercepted(this), 1);
            cancellable.et();
            var tmp0 = this.h1i_1;
            var tmp1 = new Write(cancellable);
            l$ret$1: do {
              var previous = tmp0.h1h_1.kotlinx$atomicfu$value;
              if (!(previous instanceof Closed)) {
                if (!tmp0.h1h_1.atomicfu$compareAndSet(previous, tmp1)) {
                  tmp1.x1g();
                  break l$ret$1;
                }
              }
              if (previous instanceof Write) {
                previous.y1g(new ConcurrentIOException(tmp1.w1g(), previous.u1g()));
              } else {
                if (isInterface(previous, Task)) {
                  previous.x1g();
                } else {
                  if (previous instanceof Closed) {
                    tmp1.y1g(previous.t1g_1);
                    break l$ret$1;
                  } else {
                    if (!equals(previous, Empty_instance)) {
                      noWhenBranchMatchedException();
                    }
                  }
                }
              }
              if (!(this.f1i_1.f1h_1 >= 1048576 && this.f1i_1.k1h_1.kotlinx$atomicfu$value == null)) {
                var current = tmp0.h1h_1.kotlinx$atomicfu$value;
                var tmp_1;
                if (current instanceof Write) {
                  tmp_1 = tmp0.h1h_1.atomicfu$compareAndSet(current, Empty_instance);
                } else {
                  tmp_1 = false;
                }
                if (tmp_1) {
                  current.x1g();
                }
              }
            }
             while (false);
            suspendResult = returnIfSuspended(cancellable.mt(), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            this.b9_1 = 1;
            continue $sm;
          case 3:
            return Unit_instance;
          case 4:
            throw this.e9_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.c9_1 === 4) {
          throw e;
        } else {
          this.b9_1 = this.c9_1;
          this.e9_1 = e;
        }
      }
     while (true);
  };
  function $flushAndCloseCOROUTINE$2(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.r1i_1 = _this__u8e3s4;
  }
  protoOf($flushAndCloseCOROUTINE$2).j9 = function () {
    var suspendResult = this.d9_1;
    $sm: do
      try {
        var tmp = this.b9_1;
        switch (tmp) {
          case 0:
            this.c9_1 = 4;
            var tmp_0 = this;
            tmp_0.s1i_1 = this.r1i_1;
            this.t1i_1 = this.s1i_1;
            this.c9_1 = 2;
            var tmp_1 = this;
            tmp_1.v1i_1 = Companion_instance;
            var tmp_2 = this;
            tmp_2.w1i_1 = this.t1i_1;
            this.x1i_1 = this.w1i_1;
            this.b9_1 = 1;
            suspendResult = this.x1i_1.y1i(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var tmp_3 = this;
            this.v1i_1;
            tmp_3.u1i_1 = _Result___init__impl__xyqfz8(Unit_instance);
            this.c9_1 = 4;
            this.b9_1 = 3;
            continue $sm;
          case 2:
            this.c9_1 = 4;
            var tmp_4 = this.e9_1;
            if (tmp_4 instanceof Error) {
              var e = this.e9_1;
              var tmp_5 = this;
              tmp_5.u1i_1 = _Result___init__impl__xyqfz8(createFailure(e));
              this.b9_1 = 3;
              continue $sm;
            } else {
              throw this.e9_1;
            }

          case 3:
            this.c9_1 = 4;
            if (!this.r1i_1.k1h_1.atomicfu$compareAndSet(null, get_CLOSED()))
              return Unit_instance;
            closeSlot(this.r1i_1, null);
            return Unit_instance;
          case 4:
            throw this.e9_1;
        }
      } catch ($p) {
        var e_0 = $p;
        if (this.c9_1 === 4) {
          throw e_0;
        } else {
          this.b9_1 = this.c9_1;
          this.e9_1 = e_0;
        }
      }
     while (true);
  };
  function ByteChannel(autoFlush) {
    autoFlush = autoFlush === VOID ? false : autoFlush;
    this.d1h_1 = autoFlush;
    this.e1h_1 = new Buffer();
    this.f1h_1 = 0;
    this.g1h_1 = new Object();
    this.h1h_1 = atomic$ref$1(Empty_instance);
    this.i1h_1 = new Buffer();
    this.j1h_1 = new Buffer();
    this.k1h_1 = atomic$ref$1(null);
  }
  protoOf(ByteChannel).z1i = function () {
    var tmp0_safe_receiver = this.a1j();
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      throw tmp0_safe_receiver;
    }
    if (this.i1h_1.t1d()) {
      moveFlushToReadBuffer(this);
    }
    return this.i1h_1;
  };
  protoOf(ByteChannel).b1j = function () {
    var tmp0_safe_receiver = this.a1j();
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      throw tmp0_safe_receiver;
    }
    if (this.c1j()) {
      throw IOException_init_$Create$('Channel is closed for write');
    }
    return this.j1h_1;
  };
  protoOf(ByteChannel).a1j = function () {
    var tmp0_safe_receiver = this.k1h_1.kotlinx$atomicfu$value;
    return tmp0_safe_receiver == null ? null : tmp0_safe_receiver.n1();
  };
  protoOf(ByteChannel).c1j = function () {
    return !(this.k1h_1.kotlinx$atomicfu$value == null);
  };
  protoOf(ByteChannel).e1j = function () {
    return !(this.a1j() == null) || (this.c1j() && this.f1h_1 === 0 && this.i1h_1.t1d());
  };
  protoOf(ByteChannel).f1j = function (min, $completion) {
    var tmp = new $awaitContentCOROUTINE$0(this, min, $completion);
    tmp.d9_1 = Unit_instance;
    tmp.e9_1 = null;
    return tmp.j9();
  };
  protoOf(ByteChannel).y1i = function ($completion) {
    var tmp = new $flushCOROUTINE$1(this, $completion);
    tmp.d9_1 = Unit_instance;
    tmp.e9_1 = null;
    return tmp.j9();
  };
  protoOf(ByteChannel).i1i = function () {
    if (this.j1h_1.t1d())
      return Unit_instance;
    // Inline function 'io.ktor.utils.io.locks.synchronized' call
    this.g1h_1;
    var count = this.j1h_1.m().g1();
    this.e1h_1.l1f(this.j1h_1);
    this.f1h_1 = this.f1h_1 + count | 0;
    // Inline function 'io.ktor.utils.io.ByteChannel.resumeSlot' call
    var current = this.h1h_1.kotlinx$atomicfu$value;
    var tmp;
    if (current instanceof Read) {
      tmp = this.h1h_1.atomicfu$compareAndSet(current, Empty_instance);
    } else {
      tmp = false;
    }
    if (tmp) {
      current.x1g();
    }
  };
  protoOf(ByteChannel).h1j = function ($completion) {
    var tmp = new $flushAndCloseCOROUTINE$2(this, $completion);
    tmp.d9_1 = Unit_instance;
    tmp.e9_1 = null;
    return tmp.j9();
  };
  protoOf(ByteChannel).i1j = function (cause) {
    if (!(this.k1h_1.kotlinx$atomicfu$value == null))
      return Unit_instance;
    var closedToken = new CloseToken(cause);
    this.k1h_1.atomicfu$compareAndSet(null, closedToken);
    var actualCause = closedToken.n1();
    closeSlot(this, actualCause);
  };
  protoOf(ByteChannel).toString = function () {
    return 'ByteChannel[' + hashCode(this) + ']';
  };
  function ConcurrentIOException(taskName, cause) {
    cause = cause === VOID ? null : cause;
    IllegalStateException_init_$Init$('Concurrent ' + taskName + ' attempts', cause, this);
    captureStack(this, ConcurrentIOException);
  }
  function ByteReadChannel(content, offset, length) {
    offset = offset === VOID ? 0 : offset;
    length = length === VOID ? content.length : length;
    // Inline function 'kotlin.also' call
    var this_0 = new Buffer();
    this_0.d1f(content, offset, offset + length | 0);
    var source = this_0;
    return ByteReadChannel_0(source);
  }
  function ByteReadChannel_0(source) {
    return new SourceByteReadChannel(source);
  }
  function ByteReadChannel$Companion$Empty$1() {
    this.j1j_1 = null;
    this.k1j_1 = new Buffer();
  }
  protoOf(ByteReadChannel$Companion$Empty$1).a1j = function () {
    return this.j1j_1;
  };
  protoOf(ByteReadChannel$Companion$Empty$1).e1j = function () {
    return true;
  };
  protoOf(ByteReadChannel$Companion$Empty$1).z1i = function () {
    return this.k1j_1;
  };
  protoOf(ByteReadChannel$Companion$Empty$1).f1j = function (min, $completion) {
    return false;
  };
  protoOf(ByteReadChannel$Companion$Empty$1).i1j = function (cause) {
  };
  function Companion_0() {
    Companion_instance_1 = this;
    var tmp = this;
    tmp.l1j_1 = new ByteReadChannel$Companion$Empty$1();
  }
  var Companion_instance_1;
  function Companion_getInstance_0() {
    if (Companion_instance_1 == null)
      new Companion_0();
    return Companion_instance_1;
  }
  function ByteReadChannel_1() {
  }
  function cancel_0(_this__u8e3s4) {
    _this__u8e3s4.i1j(IOException_init_$Create$('Channel was cancelled'));
  }
  function readRemaining(_this__u8e3s4, $completion) {
    var tmp = new $readRemainingCOROUTINE$3(_this__u8e3s4, $completion);
    tmp.d9_1 = Unit_instance;
    tmp.e9_1 = null;
    return tmp.j9();
  }
  function get_availableForRead(_this__u8e3s4) {
    return _this__u8e3s4.z1i().s1d().m().g1();
  }
  function readPacket(_this__u8e3s4, packet, $completion) {
    var tmp = new $readPacketCOROUTINE$4(_this__u8e3s4, packet, $completion);
    tmp.d9_1 = Unit_instance;
    tmp.e9_1 = null;
    return tmp.j9();
  }
  function readAvailable(_this__u8e3s4, buffer, offset, length, $completion) {
    offset = offset === VOID ? 0 : offset;
    length = length === VOID ? buffer.length - offset | 0 : length;
    var tmp = new $readAvailableCOROUTINE$8(_this__u8e3s4, buffer, offset, length, $completion);
    tmp.d9_1 = Unit_instance;
    tmp.e9_1 = null;
    return tmp.j9();
  }
  function readUTF8Line(_this__u8e3s4, max, $completion) {
    max = max === VOID ? 2147483647 : max;
    var tmp = new $readUTF8LineCOROUTINE$9(_this__u8e3s4, max, $completion);
    tmp.d9_1 = Unit_instance;
    tmp.e9_1 = null;
    return tmp.j9();
  }
  function toByteArray(_this__u8e3s4, $completion) {
    var tmp = new $toByteArrayCOROUTINE$10(_this__u8e3s4, $completion);
    tmp.d9_1 = Unit_instance;
    tmp.e9_1 = null;
    return tmp.j9();
  }
  function copyTo(_this__u8e3s4, channel, limit, $completion) {
    var tmp = new $copyToCOROUTINE$11(_this__u8e3s4, channel, limit, $completion);
    tmp.d9_1 = Unit_instance;
    tmp.e9_1 = null;
    return tmp.j9();
  }
  function rethrowCloseCauseIfNeeded(_this__u8e3s4) {
    var tmp0_safe_receiver = _this__u8e3s4.a1j();
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      throw tmp0_safe_receiver;
    }
  }
  function readUTF8LineTo(_this__u8e3s4, out, max, $completion) {
    max = max === VOID ? 2147483647 : max;
    var tmp = new $readUTF8LineToCOROUTINE$12(_this__u8e3s4, out, max, $completion);
    tmp.d9_1 = Unit_instance;
    tmp.e9_1 = null;
    return tmp.j9();
  }
  function readBuffer(_this__u8e3s4, $completion) {
    var tmp = new $readBufferCOROUTINE$13(_this__u8e3s4, $completion);
    tmp.d9_1 = Unit_instance;
    tmp.e9_1 = null;
    return tmp.j9();
  }
  function rethrowCloseCauseIfNeeded_0(_this__u8e3s4) {
    var tmp0_safe_receiver = _this__u8e3s4.a1j();
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      throw tmp0_safe_receiver;
    }
  }
  function rethrowCloseCauseIfNeeded_1(_this__u8e3s4) {
    var tmp0_safe_receiver = _this__u8e3s4.a1j();
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      throw tmp0_safe_receiver;
    }
  }
  function $readRemainingCOROUTINE$3(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.u1j_1 = _this__u8e3s4;
  }
  protoOf($readRemainingCOROUTINE$3).j9 = function () {
    var suspendResult = this.d9_1;
    $sm: do
      try {
        var tmp = this.b9_1;
        switch (tmp) {
          case 0:
            this.c9_1 = 4;
            this.v1j_1 = BytePacketBuilder();
            this.b9_1 = 1;
            continue $sm;
          case 1:
            if (!!this.u1j_1.e1j()) {
              this.b9_1 = 3;
              continue $sm;
            }

            this.v1j_1.l1f(this.u1j_1.z1i());
            this.b9_1 = 2;
            suspendResult = this.u1j_1.g1j(VOID, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            this.b9_1 = 1;
            continue $sm;
          case 3:
            rethrowCloseCauseIfNeeded(this.u1j_1);
            return this.v1j_1.s1d();
          case 4:
            throw this.e9_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.c9_1 === 4) {
          throw e;
        } else {
          this.b9_1 = this.c9_1;
          this.e9_1 = e;
        }
      }
     while (true);
  };
  function $readPacketCOROUTINE$4(_this__u8e3s4, packet, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.e1k_1 = _this__u8e3s4;
    this.f1k_1 = packet;
  }
  protoOf($readPacketCOROUTINE$4).j9 = function () {
    var suspendResult = this.d9_1;
    $sm: do
      try {
        var tmp = this.b9_1;
        switch (tmp) {
          case 0:
            this.c9_1 = 6;
            this.g1k_1 = new Buffer();
            this.b9_1 = 1;
            continue $sm;
          case 1:
            if (!(this.g1k_1.m().b1(toLong(this.f1k_1)) < 0)) {
              this.b9_1 = 5;
              continue $sm;
            }

            if (this.e1k_1.z1i().t1d()) {
              this.b9_1 = 2;
              suspendResult = this.e1k_1.g1j(VOID, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.b9_1 = 3;
              continue $sm;
            }

          case 2:
            this.b9_1 = 3;
            continue $sm;
          case 3:
            if (this.e1k_1.e1j()) {
              this.b9_1 = 5;
              continue $sm;
            } else {
              this.b9_1 = 4;
              continue $sm;
            }

          case 4:
            if (get_remaining(this.e1k_1.z1i()).b1(numberToLong(this.f1k_1).x2(this.g1k_1.m())) > 0) {
              this.e1k_1.z1i().w1e(this.g1k_1, numberToLong(this.f1k_1).x2(this.g1k_1.m()));
            } else {
              this.e1k_1.z1i().x1e(this.g1k_1);
            }

            this.b9_1 = 1;
            continue $sm;
          case 5:
            if (this.g1k_1.m().b1(toLong(this.f1k_1)) < 0) {
              throw EOFException_init_$Create$('Not enough data available, required ' + this.f1k_1 + ' bytes but only ' + this.g1k_1.m().toString() + ' available');
            }

            return this.g1k_1;
          case 6:
            throw this.e9_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.c9_1 === 6) {
          throw e;
        } else {
          this.b9_1 = this.c9_1;
          this.e9_1 = e;
        }
      }
     while (true);
  };
  function $readAvailableCOROUTINE$8(_this__u8e3s4, buffer, offset, length, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.p1k_1 = _this__u8e3s4;
    this.q1k_1 = buffer;
    this.r1k_1 = offset;
    this.s1k_1 = length;
  }
  protoOf($readAvailableCOROUTINE$8).j9 = function () {
    var suspendResult = this.d9_1;
    $sm: do
      try {
        var tmp = this.b9_1;
        switch (tmp) {
          case 0:
            this.c9_1 = 3;
            if (this.p1k_1.e1j())
              return -1;
            if (this.p1k_1.z1i().t1d()) {
              this.b9_1 = 1;
              suspendResult = this.p1k_1.g1j(VOID, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.b9_1 = 2;
              continue $sm;
            }

          case 1:
            this.b9_1 = 2;
            continue $sm;
          case 2:
            if (this.p1k_1.e1j())
              return -1;
            return readAvailable_0(this.p1k_1.z1i(), this.q1k_1, this.r1k_1, this.s1k_1);
          case 3:
            throw this.e9_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.c9_1 === 3) {
          throw e;
        } else {
          this.b9_1 = this.c9_1;
          this.e9_1 = e;
        }
      }
     while (true);
  };
  function $readUTF8LineCOROUTINE$9(_this__u8e3s4, max, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.b1l_1 = _this__u8e3s4;
    this.c1l_1 = max;
  }
  protoOf($readUTF8LineCOROUTINE$9).j9 = function () {
    var suspendResult = this.d9_1;
    $sm: do
      try {
        var tmp = this.b9_1;
        switch (tmp) {
          case 0:
            this.c9_1 = 2;
            this.d1l_1 = StringBuilder_init_$Create$();
            this.b9_1 = 1;
            suspendResult = readUTF8LineTo(this.b1l_1, this.d1l_1, this.c1l_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var completed = suspendResult;
            return !completed ? null : this.d1l_1.toString();
          case 2:
            throw this.e9_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.c9_1 === 2) {
          throw e;
        } else {
          this.b9_1 = this.c9_1;
          this.e9_1 = e;
        }
      }
     while (true);
  };
  function $toByteArrayCOROUTINE$10(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.m1l_1 = _this__u8e3s4;
  }
  protoOf($toByteArrayCOROUTINE$10).j9 = function () {
    var suspendResult = this.d9_1;
    $sm: do
      try {
        var tmp = this.b9_1;
        switch (tmp) {
          case 0:
            this.c9_1 = 2;
            this.b9_1 = 1;
            suspendResult = readBuffer(this.m1l_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var ARGUMENT = suspendResult;
            return readBytes(ARGUMENT);
          case 2:
            throw this.e9_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.c9_1 === 2) {
          throw e;
        } else {
          this.b9_1 = this.c9_1;
          this.e9_1 = e;
        }
      }
     while (true);
  };
  function $copyToCOROUTINE$11(_this__u8e3s4, channel, limit, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.v1l_1 = _this__u8e3s4;
    this.w1l_1 = channel;
    this.x1l_1 = limit;
  }
  protoOf($copyToCOROUTINE$11).j9 = function () {
    var suspendResult = this.d9_1;
    $sm: do
      try {
        var tmp = this.b9_1;
        switch (tmp) {
          case 0:
            this.c9_1 = 12;
            this.y1l_1 = this.x1l_1;
            this.b9_1 = 1;
            continue $sm;
          case 1:
            this.c9_1 = 8;
            this.c9_1 = 7;
            this.b9_1 = 2;
            continue $sm;
          case 2:
            if (!(!this.v1l_1.e1j() && this.y1l_1.b1(new Long(0, 0)) > 0)) {
              this.b9_1 = 6;
              continue $sm;
            }

            if (this.v1l_1.z1i().t1d()) {
              this.b9_1 = 3;
              suspendResult = this.v1l_1.g1j(VOID, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.b9_1 = 4;
              continue $sm;
            }

          case 3:
            this.b9_1 = 4;
            continue $sm;
          case 4:
            var tmp_0 = this;
            var tmp0 = this.y1l_1;
            var b = get_remaining(this.v1l_1.z1i());
            tmp_0.a1m_1 = tmp0.b1(b) <= 0 ? tmp0 : b;
            this.v1l_1.z1i().w1e(this.w1l_1.b1j(), this.a1m_1);
            this.y1l_1 = this.y1l_1.x2(this.a1m_1);
            this.b9_1 = 5;
            suspendResult = this.w1l_1.y1i(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 5:
            this.b9_1 = 2;
            continue $sm;
          case 6:
            this.z1l_1 = Unit_instance;
            this.c9_1 = 12;
            this.b9_1 = 10;
            continue $sm;
          case 7:
            this.c9_1 = 8;
            var tmp_1 = this.e9_1;
            if (tmp_1 instanceof Error) {
              this.b1m_1 = this.e9_1;
              var tmp_2 = this;
              this.v1l_1.i1j(this.b1m_1);
              close_0(this.w1l_1, this.b1m_1);
              throw this.b1m_1;
            } else {
              throw this.e9_1;
            }

          case 8:
            this.c9_1 = 12;
            this.c1m_1 = this.e9_1;
            this.b9_1 = 9;
            suspendResult = this.w1l_1.y1i(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 9:
            throw this.c1m_1;
          case 10:
            this.c9_1 = 12;
            this.b9_1 = 11;
            suspendResult = this.w1l_1.y1i(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 11:
            return this.x1l_1.x2(this.y1l_1);
          case 12:
            throw this.e9_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.c9_1 === 12) {
          throw e;
        } else {
          this.b9_1 = this.c9_1;
          this.e9_1 = e;
        }
      }
     while (true);
  };
  function $readUTF8LineToCOROUTINE$12(_this__u8e3s4, out, max, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.l1m_1 = _this__u8e3s4;
    this.m1m_1 = out;
    this.n1m_1 = max;
  }
  protoOf($readUTF8LineToCOROUTINE$12).j9 = function () {
    var suspendResult = this.d9_1;
    $sm: do
      try {
        var tmp = this.b9_1;
        switch (tmp) {
          case 0:
            this.c9_1 = 21;
            if (this.l1m_1.z1i().t1d()) {
              this.b9_1 = 1;
              suspendResult = this.l1m_1.g1j(VOID, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.b9_1 = 2;
              continue $sm;
            }

          case 1:
            this.b9_1 = 2;
            continue $sm;
          case 2:
            if (this.l1m_1.e1j())
              return false;
            var tmp_0 = this;
            tmp_0.o1m_1 = new Buffer();
            this.b9_1 = 3;
            continue $sm;
          case 3:
            this.q1m_1 = this.o1m_1;
            this.r1m_1 = null;
            this.b9_1 = 4;
            continue $sm;
          case 4:
            this.b9_1 = 5;
            continue $sm;
          case 5:
            this.b9_1 = 6;
            continue $sm;
          case 6:
            this.c9_1 = 18;
            this.c9_1 = 17;
            var tmp_1 = this;
            tmp_1.t1m_1 = this.q1m_1;
            this.u1m_1 = this.t1m_1;
            this.b9_1 = 7;
            continue $sm;
          case 7:
            if (!!this.l1m_1.e1j()) {
              this.b9_1 = 14;
              continue $sm;
            }

            this.b9_1 = 8;
            continue $sm;
          case 8:
            if (!!this.l1m_1.z1i().t1d()) {
              this.b9_1 = 12;
              continue $sm;
            }

            this.v1m_1 = this.l1m_1.z1i().w1d();
            if (this.v1m_1 === 13) {
              if (this.l1m_1.z1i().t1d()) {
                this.b9_1 = 10;
                suspendResult = this.l1m_1.g1j(VOID, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }
                continue $sm;
              } else {
                this.b9_1 = 11;
                continue $sm;
              }
            } else {
              if (this.v1m_1 === 10) {
                this.m1m_1.f(readString(this.u1m_1));
                this.s1m_1 = true;
                this.c9_1 = 21;
                this.b9_1 = 15;
                continue $sm;
              } else {
                this.u1m_1.m1f(this.v1m_1);
                this.b9_1 = 9;
                continue $sm;
              }
            }

          case 9:
            this.b9_1 = 8;
            continue $sm;
          case 10:
            this.b9_1 = 11;
            continue $sm;
          case 11:
            if (this.l1m_1.z1i().s1d().p1e(new Long(0, 0)) === 10) {
              discard(this.l1m_1.z1i(), new Long(1, 0));
            }

            this.m1m_1.f(readString(this.u1m_1));
            this.s1m_1 = true;
            this.c9_1 = 21;
            this.b9_1 = 15;
            continue $sm;
          case 12:
            if (this.u1m_1.m().b1(toLong(this.n1m_1)) >= 0) {
              throw new TooLongLineException('Line exceeds limit of ' + this.n1m_1 + ' characters');
            }

            this.b9_1 = 13;
            suspendResult = this.l1m_1.g1j(VOID, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 13:
            this.b9_1 = 7;
            continue $sm;
          case 14:
            var tmp_2 = this;
            var this_0 = this.u1m_1.m().b1(new Long(0, 0)) > 0;
            if (this_0) {
              this.m1m_1.f(readString(this.u1m_1));
            }

            tmp_2.s1m_1 = this_0;
            this.c9_1 = 21;
            this.b9_1 = 15;
            var tmp_3 = this;
            continue $sm;
          case 15:
            var tmp_4 = this.s1m_1;
            this.c9_1 = 21;
            closeFinally(this.q1m_1, this.r1m_1);
            return tmp_4;
          case 16:
            this.c9_1 = 21;
            var tmp_5 = this;
            closeFinally(this.q1m_1, this.r1m_1);
            tmp_5.p1m_1 = Unit_instance;
            this.b9_1 = 20;
            continue $sm;
          case 17:
            this.c9_1 = 18;
            var tmp_6 = this.e9_1;
            if (tmp_6 instanceof Error) {
              var e = this.e9_1;
              var tmp_7 = this;
              this.r1m_1 = e;
              throw e;
            } else {
              throw this.e9_1;
            }

          case 18:
            this.c9_1 = 21;
            var t = this.e9_1;
            closeFinally(this.q1m_1, this.r1m_1);
            throw t;
          case 19:
            this.c9_1 = 21;
            closeFinally(this.q1m_1, this.r1m_1);
            if (false) {
              this.b9_1 = 3;
              continue $sm;
            }

            this.b9_1 = 20;
            continue $sm;
          case 20:
            return Unit_instance;
          case 21:
            throw this.e9_1;
        }
      } catch ($p) {
        var e_0 = $p;
        if (this.c9_1 === 21) {
          throw e_0;
        } else {
          this.b9_1 = this.c9_1;
          this.e9_1 = e_0;
        }
      }
     while (true);
  };
  function $readBufferCOROUTINE$13(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.e1n_1 = _this__u8e3s4;
  }
  protoOf($readBufferCOROUTINE$13).j9 = function () {
    var suspendResult = this.d9_1;
    $sm: do
      try {
        var tmp = this.b9_1;
        switch (tmp) {
          case 0:
            this.c9_1 = 4;
            this.f1n_1 = new Buffer();
            this.b9_1 = 1;
            continue $sm;
          case 1:
            if (!!this.e1n_1.e1j()) {
              this.b9_1 = 3;
              continue $sm;
            }

            this.f1n_1.l1f(this.e1n_1.z1i());
            this.b9_1 = 2;
            suspendResult = this.e1n_1.g1j(VOID, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            this.b9_1 = 1;
            continue $sm;
          case 3:
            var tmp0_safe_receiver = this.e1n_1.a1j();
            if (tmp0_safe_receiver == null)
              null;
            else {
              throw tmp0_safe_receiver;
            }

            return this.f1n_1;
          case 4:
            throw this.e9_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.c9_1 === 4) {
          throw e;
        } else {
          this.b9_1 = this.c9_1;
          this.e9_1 = e;
        }
      }
     while (true);
  };
  function flushIfNeeded(_this__u8e3s4, $completion) {
    var tmp = new $flushIfNeededCOROUTINE$15(_this__u8e3s4, $completion);
    tmp.d9_1 = Unit_instance;
    tmp.e9_1 = null;
    return tmp.j9();
  }
  function $flushIfNeededCOROUTINE$15(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.o1n_1 = _this__u8e3s4;
  }
  protoOf($flushIfNeededCOROUTINE$15).j9 = function () {
    var suspendResult = this.d9_1;
    $sm: do
      try {
        var tmp = this.b9_1;
        switch (tmp) {
          case 0:
            this.c9_1 = 3;
            rethrowCloseCauseIfNeeded_0(this.o1n_1);
            var tmp_0;
            var tmp_1 = this.o1n_1;
            var tmp0_safe_receiver = tmp_1 instanceof ByteChannel ? tmp_1 : null;
            if ((tmp0_safe_receiver == null ? null : tmp0_safe_receiver.d1h_1) === true) {
              tmp_0 = true;
            } else {
              tmp_0 = get_size(this.o1n_1.b1j()) >= 1048576;
            }

            if (tmp_0) {
              this.b9_1 = 1;
              suspendResult = this.o1n_1.y1i(this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.b9_1 = 2;
              continue $sm;
            }

          case 1:
            this.b9_1 = 2;
            continue $sm;
          case 2:
            return Unit_instance;
          case 3:
            throw this.e9_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.c9_1 === 3) {
          throw e;
        } else {
          this.b9_1 = this.c9_1;
          this.e9_1 = e;
        }
      }
     while (true);
  };
  function get_NO_CALLBACK() {
    _init_properties_ByteWriteChannelOperations_kt__i7slrs();
    return NO_CALLBACK;
  }
  var NO_CALLBACK;
  function WriterJob(channel, job) {
    this.p1n_1 = channel;
    this.q1n_1 = job;
  }
  protoOf(WriterJob).ou = function () {
    return this.q1n_1;
  };
  function writer(_this__u8e3s4, coroutineContext, autoFlush, block) {
    coroutineContext = coroutineContext === VOID ? EmptyCoroutineContext_getInstance() : coroutineContext;
    autoFlush = autoFlush === VOID ? false : autoFlush;
    _init_properties_ByteWriteChannelOperations_kt__i7slrs();
    return writer_0(_this__u8e3s4, coroutineContext, new ByteChannel(), block);
  }
  function WriterScope(channel, coroutineContext) {
    this.r1n_1 = channel;
    this.s1n_1 = coroutineContext;
  }
  protoOf(WriterScope).to = function () {
    return this.s1n_1;
  };
  function writeFully(_this__u8e3s4, value, startIndex, endIndex, $completion) {
    startIndex = startIndex === VOID ? 0 : startIndex;
    endIndex = endIndex === VOID ? value.length : endIndex;
    _this__u8e3s4.b1j().d1f(value, startIndex, endIndex);
    return flushIfNeeded(_this__u8e3s4, $completion);
  }
  function writePacket(_this__u8e3s4, copy, $completion) {
    _this__u8e3s4.b1j().l1f(copy);
    return flushIfNeeded(_this__u8e3s4, $completion);
  }
  function get_isCompleted(_this__u8e3s4) {
    _init_properties_ByteWriteChannelOperations_kt__i7slrs();
    return _this__u8e3s4.ou().pp();
  }
  function close_0(_this__u8e3s4, cause) {
    _init_properties_ByteWriteChannelOperations_kt__i7slrs();
    if (cause == null) {
      fireAndForget(ByteWriteChannel$flushAndClose$ref_0(_this__u8e3s4));
    } else {
      _this__u8e3s4.i1j(cause);
    }
  }
  function invokeOnCompletion(_this__u8e3s4, block) {
    _init_properties_ByteWriteChannelOperations_kt__i7slrs();
    var tmp = _this__u8e3s4.ou();
    tmp.wp(invokeOnCompletion$lambda(block));
  }
  function writer_0(_this__u8e3s4, coroutineContext, channel, block) {
    coroutineContext = coroutineContext === VOID ? EmptyCoroutineContext_getInstance() : coroutineContext;
    _init_properties_ByteWriteChannelOperations_kt__i7slrs();
    // Inline function 'kotlin.apply' call
    var this_0 = launch(_this__u8e3s4, coroutineContext, VOID, writer$slambda_0(block, channel, null));
    this_0.wp(writer$lambda(channel));
    var job = this_0;
    return new WriterJob(channel, job);
  }
  function fireAndForget(_this__u8e3s4) {
    _init_properties_ByteWriteChannelOperations_kt__i7slrs();
    startCoroutineCancellable(_this__u8e3s4, get_NO_CALLBACK());
  }
  function NO_CALLBACK$1() {
    this.t1n_1 = EmptyCoroutineContext_getInstance();
  }
  protoOf(NO_CALLBACK$1).h9 = function () {
    return this.t1n_1;
  };
  protoOf(NO_CALLBACK$1).i9 = function (result) {
    return Unit_instance;
  };
  protoOf(NO_CALLBACK$1).m9 = function (result) {
    return this.i9(result);
  };
  function ByteWriteChannel$flushAndClose$ref($boundThis) {
    this.u1n_1 = $boundThis;
  }
  protoOf(ByteWriteChannel$flushAndClose$ref).v1n = function ($completion) {
    return this.u1n_1.h1j($completion);
  };
  protoOf(ByteWriteChannel$flushAndClose$ref).wa = function ($completion) {
    return this.v1n($completion);
  };
  function ByteWriteChannel$flushAndClose$ref_0($boundThis) {
    var i = new ByteWriteChannel$flushAndClose$ref($boundThis);
    var l = function ($completion) {
      return i.v1n($completion);
    };
    l.callableName = 'flushAndClose';
    l.$arity = 0;
    return l;
  }
  function invokeOnCompletion$lambda($block) {
    return function (it) {
      $block();
      return Unit_instance;
    };
  }
  function writer$slambda($block, $channel, resultContinuation) {
    this.e1o_1 = $block;
    this.f1o_1 = $channel;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(writer$slambda).k1a = function ($this$launch, $completion) {
    var tmp = this.l1a($this$launch, $completion);
    tmp.d9_1 = Unit_instance;
    tmp.e9_1 = null;
    return tmp.j9();
  };
  protoOf(writer$slambda).r9 = function (p1, $completion) {
    return this.k1a((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(writer$slambda).j9 = function () {
    var suspendResult = this.d9_1;
    $sm: do
      try {
        var tmp = this.b9_1;
        switch (tmp) {
          case 0:
            this.c9_1 = 14;
            this.h1o_1 = Job(get_job(this.g1o_1.to()));
            this.b9_1 = 1;
            continue $sm;
          case 1:
            this.c9_1 = 4;
            this.c9_1 = 3;
            this.b9_1 = 2;
            suspendResult = this.e1o_1(new WriterScope(this.f1o_1, this.g1o_1.to().ci(this.h1o_1)), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            this.h1o_1.kv();
            var tmp_0 = this;
            var tmp_1;
            if (get_job(this.g1o_1.to()).qp()) {
              this.f1o_1.i1j(get_job(this.g1o_1.to()).tp());
              tmp_1 = Unit_instance;
            }

            tmp_0.i1o_1 = tmp_1;
            this.c9_1 = 14;
            this.b9_1 = 9;
            continue $sm;
          case 3:
            this.c9_1 = 4;
            var tmp_2 = this.e9_1;
            if (tmp_2 instanceof Error) {
              this.j1o_1 = this.e9_1;
              var tmp_3 = this;
              cancel(this.h1o_1, 'Exception thrown while writing to channel', this.j1o_1);
              this.f1o_1.i1j(this.j1o_1);
              tmp_3.i1o_1 = Unit_instance;
              this.c9_1 = 14;
              this.b9_1 = 9;
              continue $sm;
            } else {
              throw this.e9_1;
            }

          case 4:
            this.c9_1 = 14;
            this.k1o_1 = this.e9_1;
            this.b9_1 = 5;
            suspendResult = this.h1o_1.lv(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 5:
            var tmp_4 = this;
            tmp_4.l1o_1 = this.g1o_1;
            this.m1o_1 = this.l1o_1;
            this.c9_1 = 7;
            var tmp_5 = this;
            tmp_5.o1o_1 = Companion_instance;
            var tmp_6 = this;
            tmp_6.p1o_1 = this.m1o_1;
            this.q1o_1 = this.p1o_1;
            this.b9_1 = 6;
            suspendResult = this.f1o_1.h1j(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 6:
            this.r1o_1 = Unit_instance;
            var tmp_7 = this;
            this.o1o_1;
            var value = this.r1o_1;
            tmp_7.n1o_1 = _Result___init__impl__xyqfz8(value);
            this.c9_1 = 14;
            this.b9_1 = 8;
            continue $sm;
          case 7:
            this.c9_1 = 14;
            var tmp_8 = this.e9_1;
            if (tmp_8 instanceof Error) {
              this.s1o_1 = this.e9_1;
              var tmp_9 = this;
              var exception = this.s1o_1;
              tmp_9.n1o_1 = _Result___init__impl__xyqfz8(createFailure(exception));
              this.b9_1 = 8;
              continue $sm;
            } else {
              throw this.e9_1;
            }

          case 8:
            this.c9_1 = 14;
            throw this.k1o_1;
          case 9:
            this.c9_1 = 14;
            this.b9_1 = 10;
            suspendResult = this.h1o_1.lv(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 10:
            var tmp_10 = this;
            tmp_10.t1o_1 = this.g1o_1;
            this.u1o_1 = this.t1o_1;
            this.c9_1 = 12;
            var tmp_11 = this;
            tmp_11.w1o_1 = Companion_instance;
            var tmp_12 = this;
            tmp_12.x1o_1 = this.u1o_1;
            this.y1o_1 = this.x1o_1;
            this.b9_1 = 11;
            suspendResult = this.f1o_1.h1j(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 11:
            var tmp_13 = this;
            this.w1o_1;
            tmp_13.v1o_1 = _Result___init__impl__xyqfz8(Unit_instance);
            this.c9_1 = 14;
            this.b9_1 = 13;
            continue $sm;
          case 12:
            this.c9_1 = 14;
            var tmp_14 = this.e9_1;
            if (tmp_14 instanceof Error) {
              var e = this.e9_1;
              var tmp_15 = this;
              tmp_15.v1o_1 = _Result___init__impl__xyqfz8(createFailure(e));
              this.b9_1 = 13;
              continue $sm;
            } else {
              throw this.e9_1;
            }

          case 13:
            this.c9_1 = 14;
            return Unit_instance;
          case 14:
            throw this.e9_1;
        }
      } catch ($p) {
        var e_0 = $p;
        if (this.c9_1 === 14) {
          throw e_0;
        } else {
          this.b9_1 = this.c9_1;
          this.e9_1 = e_0;
        }
      }
     while (true);
  };
  protoOf(writer$slambda).l1a = function ($this$launch, completion) {
    var i = new writer$slambda(this.e1o_1, this.f1o_1, completion);
    i.g1o_1 = $this$launch;
    return i;
  };
  function writer$slambda_0($block, $channel, resultContinuation) {
    var i = new writer$slambda($block, $channel, resultContinuation);
    var l = function ($this$launch, $completion) {
      return i.k1a($this$launch, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function writer$lambda($channel) {
    return function (it) {
      var tmp;
      if (!(it == null) && !$channel.c1j()) {
        $channel.i1j(it);
        tmp = Unit_instance;
      }
      return Unit_instance;
    };
  }
  var properties_initialized_ByteWriteChannelOperations_kt_acrf6u;
  function _init_properties_ByteWriteChannelOperations_kt__i7slrs() {
    if (!properties_initialized_ByteWriteChannelOperations_kt_acrf6u) {
      properties_initialized_ByteWriteChannelOperations_kt_acrf6u = true;
      NO_CALLBACK = new NO_CALLBACK$1();
    }
  }
  function get_CLOSED() {
    _init_properties_CloseToken_kt__9ucr41();
    return CLOSED;
  }
  var CLOSED;
  function CloseToken(origin) {
    var tmp = this;
    var tmp_0;
    if (origin == null) {
      tmp_0 = null;
    } else {
      if (origin instanceof CancellationException) {
        var tmp_1;
        if (isInterface(origin, CopyableThrowable)) {
          tmp_1 = origin.tv();
        } else {
          var tmp0_elvis_lhs = origin.message;
          tmp_1 = CancellationException_init_$Create$(tmp0_elvis_lhs == null ? 'Channel was cancelled' : tmp0_elvis_lhs, origin);
        }
        tmp_0 = tmp_1;
      } else {
        var tmp_2;
        if (origin instanceof IOException) {
          tmp_2 = isInterface(origin, CopyableThrowable);
        } else {
          tmp_2 = false;
        }
        if (tmp_2) {
          tmp_0 = origin.tv();
        } else {
          var tmp1_elvis_lhs = origin.message;
          tmp_0 = IOException_init_$Create$_0(tmp1_elvis_lhs == null ? 'Channel was closed' : tmp1_elvis_lhs, origin);
        }
      }
    }
    tmp.d1j_1 = tmp_0;
  }
  protoOf(CloseToken).n1 = function () {
    var tmp;
    if (this.d1j_1 == null) {
      tmp = null;
    } else {
      var tmp_0 = this.d1j_1;
      if (tmp_0 instanceof IOException) {
        var tmp_1;
        var tmp_2 = this.d1j_1;
        if (isInterface(tmp_2, CopyableThrowable)) {
          tmp_1 = this.d1j_1.tv();
        } else {
          tmp_1 = IOException_init_$Create$_0(this.d1j_1.message, this.d1j_1);
        }
        tmp = tmp_1;
      } else {
        var tmp_3 = this.d1j_1;
        if (!(tmp_3 == null) ? isInterface(tmp_3, CopyableThrowable) : false) {
          var tmp0_elvis_lhs = this.d1j_1.tv();
          tmp = tmp0_elvis_lhs == null ? CancellationException_init_$Create$(this.d1j_1.message, this.d1j_1) : tmp0_elvis_lhs;
        } else {
          tmp = CancellationException_init_$Create$(this.d1j_1.message, this.d1j_1);
        }
      }
    }
    return tmp;
  };
  var properties_initialized_CloseToken_kt_lgg8zn;
  function _init_properties_CloseToken_kt__9ucr41() {
    if (!properties_initialized_CloseToken_kt_lgg8zn) {
      properties_initialized_CloseToken_kt_lgg8zn = true;
      CLOSED = new CloseToken(null);
    }
  }
  function readText(_this__u8e3s4) {
    return readString_0(_this__u8e3s4);
  }
  function SourceByteReadChannel(source) {
    this.z1o_1 = source;
    this.a1p_1 = null;
  }
  protoOf(SourceByteReadChannel).a1j = function () {
    var tmp0_safe_receiver = this.a1p_1;
    return tmp0_safe_receiver == null ? null : tmp0_safe_receiver.n1();
  };
  protoOf(SourceByteReadChannel).e1j = function () {
    return this.z1o_1.t1d();
  };
  protoOf(SourceByteReadChannel).z1i = function () {
    var tmp0_safe_receiver = this.a1j();
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      throw tmp0_safe_receiver;
    }
    return this.z1o_1;
  };
  protoOf(SourceByteReadChannel).f1j = function (min, $completion) {
    var tmp0_safe_receiver = this.a1j();
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      throw tmp0_safe_receiver;
    }
    return get_remaining(this.z1o_1).b1(toLong(min)) >= 0;
  };
  protoOf(SourceByteReadChannel).i1j = function (cause) {
    if (!(this.a1p_1 == null))
      return Unit_instance;
    this.z1o_1.e4();
    var tmp = this;
    var tmp1_elvis_lhs = cause == null ? null : cause.message;
    tmp.a1p_1 = new CloseToken(IOException_init_$Create$_0(tmp1_elvis_lhs == null ? 'Channel was cancelled' : tmp1_elvis_lhs, cause));
  };
  function decode(_this__u8e3s4, input, max) {
    max = max === VOID ? 2147483647 : max;
    var tmp0 = toLong(max);
    // Inline function 'kotlin.comparisons.minOf' call
    var b = input.s1d().m();
    // Inline function 'kotlin.text.buildString' call
    var capacity = (tmp0.b1(b) <= 0 ? tmp0 : b).g1();
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$_0(capacity);
    decode_0(_this__u8e3s4, input, this_0, max);
    return this_0.toString();
  }
  function TooLongLineException(message) {
    MalformedInputException.call(this, message);
    captureStack(this, TooLongLineException);
  }
  function encodeToImpl(_this__u8e3s4, destination, input, fromIndex, toIndex) {
    var start = fromIndex;
    if (start >= toIndex)
      return Unit_instance;
    $l$loop: while (true) {
      var rc = encodeImpl(_this__u8e3s4, input, start, toIndex, destination);
      // Inline function 'kotlin.check' call
      if (!(rc >= 0)) {
        throw IllegalStateException_init_$Create$('Check failed.');
      }
      start = start + rc | 0;
      if (start >= toIndex)
        break $l$loop;
    }
  }
  function encode(_this__u8e3s4, input, fromIndex, toIndex) {
    fromIndex = fromIndex === VOID ? 0 : fromIndex;
    toIndex = toIndex === VOID ? charSequenceLength(input) : toIndex;
    // Inline function 'io.ktor.utils.io.core.buildPacket' call
    var builder = new Buffer();
    encodeToImpl(_this__u8e3s4, builder, input, fromIndex, toIndex);
    return builder;
  }
  function canRead(_this__u8e3s4) {
    return !_this__u8e3s4.t1d();
  }
  function readBytes(_this__u8e3s4, count) {
    count = count === VOID ? _this__u8e3s4.m().g1() : count;
    return readByteArray(_this__u8e3s4, count);
  }
  function BytePacketBuilder() {
    return new Buffer();
  }
  function writePacket_0(_this__u8e3s4, packet) {
    _this__u8e3s4.l1f(packet);
  }
  function build(_this__u8e3s4) {
    return _this__u8e3s4.s1d();
  }
  function get_size(_this__u8e3s4) {
    return _this__u8e3s4.s1d().m().g1();
  }
  function writeFully_0(_this__u8e3s4, buffer, offset, length) {
    offset = offset === VOID ? 0 : offset;
    length = length === VOID ? buffer.length - offset | 0 : length;
    _this__u8e3s4.d1f(buffer, offset, offset + length | 0);
  }
  var ByteReadPacketEmpty;
  function get_remaining(_this__u8e3s4) {
    _init_properties_ByteReadPacket_kt__28475y();
    return _this__u8e3s4.s1d().m();
  }
  function discard(_this__u8e3s4, count) {
    count = count === VOID ? new Long(-1, 2147483647) : count;
    _init_properties_ByteReadPacket_kt__28475y();
    _this__u8e3s4.v1d(count);
    // Inline function 'kotlin.comparisons.minOf' call
    var b = get_remaining(_this__u8e3s4);
    var countToDiscard = count.b1(b) <= 0 ? count : b;
    _this__u8e3s4.s1d().r1e(countToDiscard);
    return countToDiscard;
  }
  function takeWhile(_this__u8e3s4, block) {
    _init_properties_ByteReadPacket_kt__28475y();
    while (!_this__u8e3s4.t1d() && block(_this__u8e3s4.s1d())) {
    }
  }
  var properties_initialized_ByteReadPacket_kt_hw4st4;
  function _init_properties_ByteReadPacket_kt__28475y() {
    if (!properties_initialized_ByteReadPacket_kt_hw4st4) {
      properties_initialized_ByteReadPacket_kt_hw4st4 = true;
      ByteReadPacketEmpty = new Buffer();
    }
  }
  function readAvailable_0(_this__u8e3s4, buffer, offset, length) {
    offset = offset === VOID ? 0 : offset;
    length = length === VOID ? buffer.length - offset | 0 : length;
    var result = _this__u8e3s4.s1e(buffer, offset, offset + length | 0);
    return result === -1 ? 0 : result;
  }
  function readText_0(_this__u8e3s4, charset, max) {
    charset = charset === VOID ? Charsets_getInstance().b1p_1 : charset;
    max = max === VOID ? 2147483647 : max;
    if (charset.equals(Charsets_getInstance().b1p_1)) {
      if (max === 2147483647)
        return readString_0(_this__u8e3s4);
      var tmp0 = _this__u8e3s4.s1d().m();
      // Inline function 'kotlin.math.min' call
      var b = toLong(max);
      var count = tmp0.b1(b) <= 0 ? tmp0 : b;
      return readString_1(_this__u8e3s4, count);
    }
    return decode(charset.e1p(), _this__u8e3s4, max);
  }
  function toByteArray_0(_this__u8e3s4, charset) {
    charset = charset === VOID ? Charsets_getInstance().b1p_1 : charset;
    if (charset.equals(Charsets_getInstance().b1p_1))
      return encodeToByteArray(_this__u8e3s4, VOID, VOID, true);
    return encodeToByteArray_0(charset.f1p(), _this__u8e3s4, 0, _this__u8e3s4.length);
  }
  function writeText(_this__u8e3s4, text, fromIndex, toIndex, charset) {
    fromIndex = fromIndex === VOID ? 0 : fromIndex;
    toIndex = toIndex === VOID ? charSequenceLength(text) : toIndex;
    charset = charset === VOID ? Charsets_getInstance().b1p_1 : charset;
    if (charset === Charsets_getInstance().b1p_1) {
      return writeString(_this__u8e3s4, toString_1(text), fromIndex, toIndex);
    }
    encodeToImpl(charset.f1p(), _this__u8e3s4, text, fromIndex, toIndex);
  }
  function get_ByteArrayPool() {
    _init_properties_ByteArrayPool_kt__kfi3uj();
    return ByteArrayPool;
  }
  var ByteArrayPool;
  function ByteArrayPool$1() {
    DefaultPool.call(this, 128);
  }
  protoOf(ByteArrayPool$1).j1p = function () {
    return new Int8Array(4096);
  };
  var properties_initialized_ByteArrayPool_kt_td6pfh;
  function _init_properties_ByteArrayPool_kt__kfi3uj() {
    if (!properties_initialized_ByteArrayPool_kt_td6pfh) {
      properties_initialized_ByteArrayPool_kt_td6pfh = true;
      ByteArrayPool = new ByteArrayPool$1();
    }
  }
  function ObjectPool() {
  }
  function Companion_1() {
  }
  protoOf(Companion_1).s1p = function (name) {
    switch (name) {
      case 'UTF-8':
      case 'utf-8':
      case 'UTF8':
      case 'utf8':
        return Charsets_getInstance().b1p_1;
    }
    var tmp;
    var tmp_0;
    switch (name) {
      case 'ISO-8859-1':
      case 'iso-8859-1':
        tmp_0 = true;
        break;
      default:
        // Inline function 'kotlin.let' call

        var it = replace(name, _Char___init__impl__6a9atx(95), _Char___init__impl__6a9atx(45));
        var tmp_1;
        if (it === 'iso-8859-1') {
          tmp_1 = true;
        } else {
          // Inline function 'kotlin.text.lowercase' call
          // Inline function 'kotlin.js.asDynamic' call
          tmp_1 = it.toLowerCase() === 'iso-8859-1';
        }

        tmp_0 = tmp_1;
        break;
    }
    if (tmp_0) {
      tmp = true;
    } else {
      tmp = name === 'latin1' || name === 'Latin1';
    }
    if (tmp) {
      return Charsets_getInstance().c1p_1;
    }
    throw IllegalArgumentException_init_$Create$('Charset ' + name + ' is not supported');
  };
  var Companion_instance_2;
  function Companion_getInstance_1() {
    return Companion_instance_2;
  }
  function Charset(_name) {
    this.d1p_1 = _name;
  }
  protoOf(Charset).equals = function (other) {
    if (this === other)
      return true;
    if (other == null || !(this.constructor == other.constructor))
      return false;
    if (!(other instanceof Charset))
      THROW_CCE();
    return this.d1p_1 === other.d1p_1;
  };
  protoOf(Charset).hashCode = function () {
    return getStringHashCode(this.d1p_1);
  };
  protoOf(Charset).toString = function () {
    return this.d1p_1;
  };
  function get_name(_this__u8e3s4) {
    return _this__u8e3s4.d1p_1;
  }
  function Charsets() {
    Charsets_instance = this;
    this.b1p_1 = new CharsetImpl('UTF-8');
    this.c1p_1 = new CharsetImpl('ISO-8859-1');
  }
  var Charsets_instance;
  function Charsets_getInstance() {
    if (Charsets_instance == null)
      new Charsets();
    return Charsets_instance;
  }
  function MalformedInputException(message) {
    IOException_init_$Init$(message, this);
    captureStack(this, MalformedInputException);
  }
  function CharsetDecoder(_charset) {
    this.t1p_1 = _charset;
  }
  function CharsetEncoder(_charset) {
    this.u1p_1 = _charset;
  }
  function CharsetImpl(name) {
    Charset.call(this, name);
  }
  protoOf(CharsetImpl).f1p = function () {
    return new CharsetEncoderImpl(this);
  };
  protoOf(CharsetImpl).e1p = function () {
    return new CharsetDecoderImpl(this);
  };
  function CharsetEncoderImpl(charset) {
    CharsetEncoder.call(this, charset);
    this.x1p_1 = charset;
  }
  protoOf(CharsetEncoderImpl).toString = function () {
    return 'CharsetEncoderImpl(charset=' + this.x1p_1.toString() + ')';
  };
  protoOf(CharsetEncoderImpl).hashCode = function () {
    return this.x1p_1.hashCode();
  };
  protoOf(CharsetEncoderImpl).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof CharsetEncoderImpl))
      return false;
    var tmp0_other_with_cast = other instanceof CharsetEncoderImpl ? other : THROW_CCE();
    if (!this.x1p_1.equals(tmp0_other_with_cast.x1p_1))
      return false;
    return true;
  };
  function CharsetDecoderImpl(charset) {
    CharsetDecoder.call(this, charset);
    this.z1p_1 = charset;
  }
  protoOf(CharsetDecoderImpl).toString = function () {
    return 'CharsetDecoderImpl(charset=' + this.z1p_1.toString() + ')';
  };
  protoOf(CharsetDecoderImpl).hashCode = function () {
    return this.z1p_1.hashCode();
  };
  protoOf(CharsetDecoderImpl).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof CharsetDecoderImpl))
      return false;
    var tmp0_other_with_cast = other instanceof CharsetDecoderImpl ? other : THROW_CCE();
    if (!this.z1p_1.equals(tmp0_other_with_cast.z1p_1))
      return false;
    return true;
  };
  function encodeToByteArray_0(_this__u8e3s4, input, fromIndex, toIndex) {
    fromIndex = fromIndex === VOID ? 0 : fromIndex;
    toIndex = toIndex === VOID ? charSequenceLength(input) : toIndex;
    return encodeToByteArrayImpl(_this__u8e3s4, input, fromIndex, toIndex);
  }
  function decode_0(_this__u8e3s4, input, dst, max) {
    var decoder = Decoder(get_name(get_charset(_this__u8e3s4)), true);
    var tmp0 = input.s1d().m();
    // Inline function 'kotlin.comparisons.minOf' call
    var b = toLong(max);
    var count = tmp0.b1(b) <= 0 ? tmp0 : b;
    var tmp = readByteArray(input, count.g1());
    var array = tmp instanceof Int8Array ? tmp : THROW_CCE();
    var tmp_0;
    try {
      tmp_0 = decoder.a1q(array);
    } catch ($p) {
      var tmp_1;
      if ($p instanceof Error) {
        var cause = $p;
        var tmp0_elvis_lhs = cause.message;
        throw new MalformedInputException('Failed to decode bytes: ' + (tmp0_elvis_lhs == null ? 'no cause provided' : tmp0_elvis_lhs));
      } else {
        throw $p;
      }
    }
    var result = tmp_0;
    dst.f(result);
    return result.length;
  }
  function encodeToByteArrayImpl(_this__u8e3s4, input, fromIndex, toIndex) {
    fromIndex = fromIndex === VOID ? 0 : fromIndex;
    toIndex = toIndex === VOID ? charSequenceLength(input) : toIndex;
    var start = fromIndex;
    if (start >= toIndex)
      return new Int8Array(0);
    var dst = new Buffer();
    var rc = encodeImpl(_this__u8e3s4, input, start, toIndex, dst);
    start = start + rc | 0;
    if (start === toIndex) {
      return readByteArray_0(dst);
    }
    encodeToImpl(_this__u8e3s4, dst, input, start, toIndex);
    return readByteArray_0(dst);
  }
  function get_charset(_this__u8e3s4) {
    return _this__u8e3s4.t1p_1;
  }
  function encodeImpl(_this__u8e3s4, input, fromIndex, toIndex, dst) {
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.require' call
    if (!(fromIndex <= toIndex)) {
      var message = 'Failed requirement.';
      throw IllegalArgumentException_init_$Create$(toString_1(message));
    }
    if (get_charset_0(_this__u8e3s4).equals(Charsets_getInstance().c1p_1)) {
      return encodeISO88591(input, fromIndex, toIndex, dst);
    }
    // Inline function 'kotlin.require' call
    if (!(get_charset_0(_this__u8e3s4) === Charsets_getInstance().b1p_1)) {
      var message_0 = 'Only UTF-8 encoding is supported in JS';
      throw IllegalArgumentException_init_$Create$(toString_1(message_0));
    }
    var encoder = new TextEncoder();
    // Inline function 'kotlin.text.substring' call
    var tmp$ret$5 = toString_1(charSequenceSubSequence(input, fromIndex, toIndex));
    var result = encoder.encode(tmp$ret$5);
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    dst.g1f(result);
    return result.length;
  }
  function get_charset_0(_this__u8e3s4) {
    return _this__u8e3s4.u1p_1;
  }
  function forName(_this__u8e3s4, name) {
    return Companion_instance_2.s1p(name);
  }
  function Decoder(encoding, fatal) {
    fatal = fatal === VOID ? true : fatal;
    var tmp;
    try {
      tmp = toKtor(new TextDecoder(encoding, textDecoderOptions(fatal)));
    } catch ($p) {
      var tmp_0;
      if ($p instanceof Error) {
        var cause = $p;
        tmp_0 = new TextDecoderFallback(encoding, fatal);
      } else {
        throw $p;
      }
      tmp = tmp_0;
    }
    return tmp;
  }
  function toKtor(_this__u8e3s4) {
    return new toKtor$1(_this__u8e3s4);
  }
  function textDecoderOptions(fatal) {
    fatal = fatal === VOID ? false : fatal;
    // Inline function 'kotlin.apply' call
    var this_0 = new Object();
    // Inline function 'kotlin.js.asDynamic' call
    // Inline function 'kotlin.with' call
    this_0.fatal = fatal;
    return this_0;
  }
  function toKtor$1($this_toKtor) {
    this.b1q_1 = $this_toKtor;
  }
  protoOf(toKtor$1).a1q = function (buffer) {
    return this.b1q_1.decode(buffer);
  };
  function get_ENCODING_ALIASES() {
    _init_properties_TextDecoderFallback_js_kt__an7r6m();
    return ENCODING_ALIASES;
  }
  var ENCODING_ALIASES;
  function get_REPLACEMENT() {
    _init_properties_TextDecoderFallback_js_kt__an7r6m();
    return REPLACEMENT;
  }
  var REPLACEMENT;
  function TextDecoderFallback(encoding, fatal) {
    this.c1q_1 = fatal;
    // Inline function 'kotlin.text.trim' call
    // Inline function 'kotlin.text.lowercase' call
    // Inline function 'kotlin.js.asDynamic' call
    var requestedEncoding = toString_1(trim(isCharSequence(encoding) ? encoding : THROW_CCE())).toLowerCase();
    // Inline function 'kotlin.check' call
    if (!get_ENCODING_ALIASES().r(requestedEncoding)) {
      var message = encoding + ' is not supported.';
      throw IllegalStateException_init_$Create$(toString_1(message));
    }
  }
  protoOf(TextDecoderFallback).a1q = function (buffer) {
    // Inline function 'io.ktor.utils.io.core.buildPacket' call
    var builder = new Buffer();
    var bytes = buffer instanceof Int8Array ? buffer : THROW_CCE();
    var inductionVariable = 0;
    var last = bytes.length;
    if (inductionVariable < last)
      $l$loop: do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'org.khronos.webgl.get' call
        // Inline function 'kotlin.js.asDynamic' call
        var byte = bytes[index];
        var point = toCodePoint(byte);
        if (point < 0) {
          // Inline function 'kotlin.check' call
          if (!!this.c1q_1) {
            var message = 'Invalid character: ' + point;
            throw IllegalStateException_init_$Create$(toString_1(message));
          }
          writeFully_0(builder, get_REPLACEMENT());
          continue $l$loop;
        }
        if (point > 255) {
          builder.m1f(toByte(point >> 8));
        }
        builder.m1f(toByte(point & 255));
      }
       while (inductionVariable < last);
    return decodeToString(readByteArray_0(builder));
  };
  function toCodePoint(_this__u8e3s4) {
    _init_properties_TextDecoderFallback_js_kt__an7r6m();
    var value = _this__u8e3s4 & 255;
    if (isASCII(value)) {
      return value;
    }
    return get_WIN1252_TABLE()[value - 128 | 0];
  }
  function isASCII(_this__u8e3s4) {
    _init_properties_TextDecoderFallback_js_kt__an7r6m();
    return 0 <= _this__u8e3s4 ? _this__u8e3s4 <= 127 : false;
  }
  var properties_initialized_TextDecoderFallback_js_kt_6rekzk;
  function _init_properties_TextDecoderFallback_js_kt__an7r6m() {
    if (!properties_initialized_TextDecoderFallback_js_kt_6rekzk) {
      properties_initialized_TextDecoderFallback_js_kt_6rekzk = true;
      ENCODING_ALIASES = setOf(['ansi_x3.4-1968', 'ascii', 'cp1252', 'cp819', 'csisolatin1', 'ibm819', 'iso-8859-1', 'iso-ir-100', 'iso8859-1', 'iso88591', 'iso_8859-1', 'iso_8859-1:1987', 'l1', 'latin1', 'us-ascii', 'windows-1252', 'x-cp1252']);
      // Inline function 'kotlin.byteArrayOf' call
      REPLACEMENT = new Int8Array([-17, -65, -67]);
    }
  }
  function encodeISO88591(input, fromIndex, toIndex, dst) {
    if (fromIndex >= toIndex)
      return 0;
    var inductionVariable = fromIndex;
    if (inductionVariable < toIndex)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'kotlin.code' call
        var this_0 = charSequenceGet(input, index);
        var character = Char__toInt_impl_vasixd(this_0);
        if (character > 255) {
          failedToMapError(character);
        }
        dst.m1f(toByte(character));
      }
       while (inductionVariable < toIndex);
    return toIndex - fromIndex | 0;
  }
  function failedToMapError(ch) {
    throw new MalformedInputException('The character with unicode point ' + ch + " couldn't be mapped to ISO-8859-1 character");
  }
  function get_WIN1252_TABLE() {
    _init_properties_Win1252Table_kt__tl0v64();
    return WIN1252_TABLE;
  }
  var WIN1252_TABLE;
  var properties_initialized_Win1252Table_kt_pkmjoq;
  function _init_properties_Win1252Table_kt__tl0v64() {
    if (!properties_initialized_Win1252Table_kt_pkmjoq) {
      properties_initialized_Win1252Table_kt_pkmjoq = true;
      // Inline function 'kotlin.intArrayOf' call
      WIN1252_TABLE = new Int32Array([8364, -1, 8218, 402, 8222, 8230, 8224, 8225, 710, 8240, 352, 8249, 338, -1, 381, -1, -1, 8216, 8217, 8220, 8221, 8226, 8211, 8212, 732, 8482, 353, 8250, 339, -1, 382, 376, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255]);
    }
  }
  function DefaultPool(capacity) {
    this.k1p_1 = capacity;
    var tmp = this;
    // Inline function 'kotlin.arrayOfNulls' call
    var size = this.k1p_1;
    tmp.l1p_1 = Array(size);
    this.m1p_1 = 0;
  }
  protoOf(DefaultPool).n1p = function (instance) {
  };
  protoOf(DefaultPool).o1p = function (instance) {
    return instance;
  };
  protoOf(DefaultPool).p1p = function (instance) {
  };
  protoOf(DefaultPool).q1p = function () {
    if (this.m1p_1 === 0)
      return this.j1p();
    this.m1p_1 = this.m1p_1 - 1 | 0;
    var idx = this.m1p_1;
    var tmp = this.l1p_1[idx];
    var instance = !(tmp == null) ? tmp : THROW_CCE();
    this.l1p_1[idx] = null;
    return this.o1p(instance);
  };
  protoOf(DefaultPool).r1p = function (instance) {
    this.p1p(instance);
    if (this.m1p_1 === this.k1p_1) {
      this.n1p(instance);
    } else {
      var _unary__edvuaz = this.m1p_1;
      this.m1p_1 = _unary__edvuaz + 1 | 0;
      this.l1p_1[_unary__edvuaz] = instance;
    }
  };
  protoOf(DefaultPool).cs = function () {
    var inductionVariable = 0;
    var last = this.m1p_1;
    if (inductionVariable < last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var tmp = this.l1p_1[i];
        var instance = !(tmp == null) ? tmp : THROW_CCE();
        this.l1p_1[i] = null;
        this.n1p(instance);
      }
       while (inductionVariable < last);
    this.m1p_1 = 0;
  };
  function get_DEVELOPMENT_MODE() {
    return false;
  }
  //region block: post-declaration
  protoOf(Read).x1g = resume;
  protoOf(Read).y1g = resume_0;
  protoOf(Write).x1g = resume;
  protoOf(Write).y1g = resume_0;
  protoOf(ByteChannel).g1j = awaitContent$default;
  protoOf(ByteReadChannel$Companion$Empty$1).g1j = awaitContent$default;
  protoOf(SourceByteReadChannel).g1j = awaitContent$default;
  protoOf(DefaultPool).e4 = close;
  //endregion
  //region block: init
  Empty_instance = new Empty();
  Companion_instance_2 = new Companion_1();
  //endregion
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = copyTo;
  _.$_$.b = readAvailable;
  _.$_$.c = readPacket;
  _.$_$.d = readRemaining;
  _.$_$.e = readUTF8Line;
  _.$_$.f = toByteArray;
  _.$_$.g = writeFully;
  _.$_$.h = writePacket;
  _.$_$.i = Charsets_getInstance;
  _.$_$.j = Companion_getInstance_0;
  _.$_$.k = MalformedInputException;
  _.$_$.l = decode;
  _.$_$.m = encode;
  _.$_$.n = forName;
  _.$_$.o = get_name;
  _.$_$.p = BytePacketBuilder;
  _.$_$.q = build;
  _.$_$.r = canRead;
  _.$_$.s = readText_0;
  _.$_$.t = takeWhile;
  _.$_$.u = toByteArray_0;
  _.$_$.v = writeFully_0;
  _.$_$.w = writePacket_0;
  _.$_$.x = writeText;
  _.$_$.y = get_ByteArrayPool;
  _.$_$.z = ByteReadChannel;
  _.$_$.a1 = ByteReadChannel_1;
  _.$_$.b1 = WriterScope;
  _.$_$.c1 = get_availableForRead;
  _.$_$.d1 = cancel_0;
  _.$_$.e1 = close_0;
  _.$_$.f1 = invokeOnCompletion;
  _.$_$.g1 = get_isCompleted;
  _.$_$.h1 = readText;
  _.$_$.i1 = writer;
  //endregion
  return _;
}));

//# sourceMappingURL=ktor-ktor-io.js.map
