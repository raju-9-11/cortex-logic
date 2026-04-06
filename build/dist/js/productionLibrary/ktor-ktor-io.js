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
  var Companion_instance = kotlin_kotlin.$_$.a5;
  var Unit_instance = kotlin_kotlin.$_$.f5;
  var _Result___init__impl__xyqfz8 = kotlin_kotlin.$_$.w2;
  var protoOf = kotlin_kotlin.$_$.cc;
  var initMetadataForCompanion = kotlin_kotlin.$_$.za;
  var THROW_CCE = kotlin_kotlin.$_$.kg;
  var initMetadataForObject = kotlin_kotlin.$_$.eb;
  var toString = kotlin_kotlin.$_$.nh;
  var hashCode = kotlin_kotlin.$_$.xa;
  var equals = kotlin_kotlin.$_$.ra;
  var initMetadataForClass = kotlin_kotlin.$_$.ya;
  var createFailure = kotlin_kotlin.$_$.bh;
  var Result = kotlin_kotlin.$_$.ig;
  var initMetadataForInterface = kotlin_kotlin.$_$.cb;
  var toString_0 = kotlin_kotlin.$_$.df;
  var newThrowable = kotlin_kotlin.$_$.vb;
  var stackTraceToString = kotlin_kotlin.$_$.lh;
  var VOID = kotlin_kotlin.$_$.h;
  var isInterface = kotlin_kotlin.$_$.nb;
  var CoroutineImpl = kotlin_kotlin.$_$.ba;
  var toLong = kotlin_kotlin.$_$.ec;
  var numberToLong = kotlin_kotlin.$_$.ac;
  var intercepted = kotlin_kotlin.$_$.o9;
  var CancellableContinuationImpl = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.n;
  var noWhenBranchMatchedException = kotlin_kotlin.$_$.jh;
  var returnIfSuspended = kotlin_kotlin.$_$.m;
  var get_COROUTINE_SUSPENDED = kotlin_kotlin.$_$.l9;
  var Long = kotlin_kotlin.$_$.fg;
  var initMetadataForCoroutine = kotlin_kotlin.$_$.ab;
  var Buffer = kotlin_org_jetbrains_kotlinx_kotlinx_io_core.$_$.e;
  var atomic$ref$1 = kotlin_org_jetbrains_kotlinx_atomicfu.$_$.d;
  var IOException_init_$Create$ = kotlin_org_jetbrains_kotlinx_kotlinx_io_core.$_$.c;
  var IllegalStateException = kotlin_kotlin.$_$.eg;
  var IllegalStateException_init_$Init$ = kotlin_kotlin.$_$.z1;
  var captureStack = kotlin_kotlin.$_$.ja;
  var EOFException_init_$Create$ = kotlin_org_jetbrains_kotlinx_kotlinx_io_core.$_$.a;
  var StringBuilder_init_$Create$ = kotlin_kotlin.$_$.i1;
  var readString = kotlin_org_jetbrains_kotlinx_kotlinx_io_core.$_$.l;
  var closeFinally = kotlin_kotlin.$_$.zg;
  var EmptyCoroutineContext_getInstance = kotlin_kotlin.$_$.l4;
  var CoroutineScope = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.u;
  var launch = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.d1;
  var startCoroutineCancellable = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.m;
  var Continuation = kotlin_kotlin.$_$.v9;
  var initMetadataForFunctionReference = kotlin_kotlin.$_$.bb;
  var get_job = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.c1;
  var Job = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.v;
  var cancel = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.b1;
  var initMetadataForLambda = kotlin_kotlin.$_$.db;
  var CopyableThrowable = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.r;
  var IOException = kotlin_org_jetbrains_kotlinx_kotlinx_io_core.$_$.f;
  var IOException_init_$Create$_0 = kotlin_org_jetbrains_kotlinx_kotlinx_io_core.$_$.d;
  var CancellationException_init_$Create$ = kotlin_kotlin.$_$.e1;
  var CancellationException = kotlin_kotlin.$_$.k9;
  var readString_0 = kotlin_org_jetbrains_kotlinx_kotlinx_io_core.$_$.j;
  var StringBuilder_init_$Create$_0 = kotlin_kotlin.$_$.h1;
  var IllegalStateException_init_$Create$ = kotlin_kotlin.$_$.y1;
  var charSequenceLength = kotlin_kotlin.$_$.na;
  var readByteArray = kotlin_org_jetbrains_kotlinx_kotlinx_io_core.$_$.h;
  var readString_1 = kotlin_org_jetbrains_kotlinx_kotlinx_io_core.$_$.k;
  var encodeToByteArray = kotlin_kotlin.$_$.nd;
  var toString_1 = kotlin_kotlin.$_$.gc;
  var writeString = kotlin_org_jetbrains_kotlinx_kotlinx_io_core.$_$.m;
  var _Char___init__impl__6a9atx = kotlin_kotlin.$_$.o2;
  var replace = kotlin_kotlin.$_$.ke;
  var IllegalArgumentException_init_$Create$ = kotlin_kotlin.$_$.u1;
  var getStringHashCode = kotlin_kotlin.$_$.wa;
  var IOException_init_$Init$ = kotlin_org_jetbrains_kotlinx_kotlinx_io_core.$_$.b;
  var readByteArray_0 = kotlin_org_jetbrains_kotlinx_kotlinx_io_core.$_$.i;
  var charSequenceSubSequence = kotlin_kotlin.$_$.oa;
  var isCharSequence = kotlin_kotlin.$_$.jb;
  var trim = kotlin_kotlin.$_$.qf;
  var toByte = kotlin_kotlin.$_$.dc;
  var decodeToString = kotlin_kotlin.$_$.kd;
  var setOf = kotlin_kotlin.$_$.k8;
  var charSequenceGet = kotlin_kotlin.$_$.ma;
  var Char__toInt_impl_vasixd = kotlin_kotlin.$_$.u2;
  //endregion
  //region block: pre-declaration
  initMetadataForCompanion(Companion);
  initMetadataForObject(Empty, 'Empty');
  initMetadataForClass(Closed, 'Closed');
  function resume() {
    return this.m1b().k9(Companion_getInstance().j1b_1);
  }
  function resume_0(throwable) {
    var tmp = this.m1b();
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
    return tmp.k9(tmp1_elvis_lhs == null ? Companion_getInstance().j1b_1 : tmp1_elvis_lhs.am_1);
  }
  initMetadataForInterface(Task, 'Task');
  initMetadataForClass(Read, 'Read', VOID, VOID, [Task]);
  initMetadataForClass(Write, 'Write', VOID, VOID, [Task]);
  initMetadataForCoroutine($awaitContentCOROUTINE$0, CoroutineImpl);
  initMetadataForCoroutine($flushCOROUTINE$1, CoroutineImpl);
  initMetadataForCoroutine($flushAndCloseCOROUTINE$2, CoroutineImpl);
  function awaitContent$default(min, $completion, $super) {
    min = min === VOID ? 1 : min;
    return $super === VOID ? this.w1d(min, $completion) : $super.w1d.call(this, min, $completion);
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
    this.bs();
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
    this.i1b_1 = new Closed(null);
    var tmp = this;
    // Inline function 'kotlin.Companion.success' call
    tmp.j1b_1 = _Result___init__impl__xyqfz8(Unit_instance);
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
    this.k1b_1 = cause;
  }
  protoOf(Closed).toString = function () {
    return 'Closed(cause=' + toString(this.k1b_1) + ')';
  };
  protoOf(Closed).hashCode = function () {
    return this.k1b_1 == null ? 0 : hashCode(this.k1b_1);
  };
  protoOf(Closed).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Closed))
      return false;
    var tmp0_other_with_cast = other instanceof Closed ? other : THROW_CCE();
    if (!equals(this.k1b_1, tmp0_other_with_cast.k1b_1))
      return false;
    return true;
  };
  function Task() {
  }
  function Read(continuation) {
    this.q1b_1 = continuation;
    this.r1b_1 = null;
    if (get_DEVELOPMENT_MODE()) {
      var tmp = this;
      // Inline function 'kotlin.also' call
      var this_0 = newThrowable('ReadTask 0x' + toString_0(hashCode(this.q1b_1), 16));
      stackTraceToString(this_0);
      tmp.r1b_1 = this_0;
    }
  }
  protoOf(Read).m1b = function () {
    return this.q1b_1;
  };
  protoOf(Read).l1b = function () {
    return this.r1b_1;
  };
  protoOf(Read).n1b = function () {
    return 'read';
  };
  function Write(continuation) {
    this.s1b_1 = continuation;
    this.t1b_1 = null;
    if (get_DEVELOPMENT_MODE()) {
      var tmp = this;
      // Inline function 'kotlin.also' call
      var this_0 = newThrowable('WriteTask 0x' + toString_0(hashCode(this.s1b_1), 16));
      stackTraceToString(this_0);
      tmp.t1b_1 = this_0;
    }
  }
  protoOf(Write).m1b = function () {
    return this.s1b_1;
  };
  protoOf(Write).l1b = function () {
    return this.t1b_1;
  };
  protoOf(Write).n1b = function () {
    return 'write';
  };
  function moveFlushToReadBuffer($this) {
    // Inline function 'io.ktor.utils.io.locks.synchronized' call
    $this.x1b_1;
    $this.v1b_1.o19($this.z1b_1);
    $this.w1b_1 = 0;
    // Inline function 'io.ktor.utils.io.ByteChannel.resumeSlot' call
    var current = $this.y1b_1.kotlinx$atomicfu$value;
    var tmp;
    if (current instanceof Write) {
      tmp = $this.y1b_1.atomicfu$compareAndSet(current, Empty_instance);
    } else {
      tmp = false;
    }
    if (tmp) {
      current.o1b();
    }
  }
  function closeSlot($this, cause) {
    var closeContinuation = !(cause == null) ? new Closed(cause) : Companion_getInstance().i1b_1;
    var continuation = $this.y1b_1.atomicfu$getAndSet(closeContinuation);
    if (!isInterface(continuation, Task))
      return Unit_instance;
    continuation.p1b(cause);
  }
  function $awaitContentCOROUTINE$0(_this__u8e3s4, min, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.k1c_1 = _this__u8e3s4;
    this.l1c_1 = min;
  }
  protoOf($awaitContentCOROUTINE$0).h9 = function () {
    var suspendResult = this.b9_1;
    $sm: do
      try {
        var tmp = this.z8_1;
        switch (tmp) {
          case 0:
            this.a9_1 = 4;
            rethrowCloseCauseIfNeeded_1(this.k1c_1);
            if (this.k1c_1.z1b_1.m().b1(toLong(this.l1c_1)) >= 0)
              return true;
            var tmp_0 = this;
            tmp_0.m1c_1 = this.k1c_1;
            this.n1c_1 = this.m1c_1;
            this.z8_1 = 1;
            continue $sm;
          case 1:
            if (!(numberToLong(this.k1c_1.w1b_1).u2(this.k1c_1.z1b_1.m()).b1(toLong(this.l1c_1)) < 0 && this.k1c_1.b1c_1.kotlinx$atomicfu$value == null)) {
              this.z8_1 = 3;
              continue $sm;
            }

            this.z8_1 = 2;
            var cancellable = new CancellableContinuationImpl(intercepted(this), 1);
            cancellable.dt();
            var tmp0 = this.n1c_1;
            var tmp1 = new Read(cancellable);
            l$ret$1: do {
              var previous = tmp0.y1b_1.kotlinx$atomicfu$value;
              if (!(previous instanceof Closed)) {
                if (!tmp0.y1b_1.atomicfu$compareAndSet(previous, tmp1)) {
                  tmp1.o1b();
                  break l$ret$1;
                }
              }
              if (previous instanceof Read) {
                previous.p1b(new ConcurrentIOException(tmp1.n1b(), previous.l1b()));
              } else {
                if (isInterface(previous, Task)) {
                  previous.o1b();
                } else {
                  if (previous instanceof Closed) {
                    tmp1.p1b(previous.k1b_1);
                    break l$ret$1;
                  } else {
                    if (!equals(previous, Empty_instance)) {
                      noWhenBranchMatchedException();
                    }
                  }
                }
              }
              if (!(numberToLong(this.k1c_1.w1b_1).u2(this.k1c_1.z1b_1.m()).b1(toLong(this.l1c_1)) < 0 && this.k1c_1.b1c_1.kotlinx$atomicfu$value == null)) {
                var current = tmp0.y1b_1.kotlinx$atomicfu$value;
                var tmp_1;
                if (current instanceof Read) {
                  tmp_1 = tmp0.y1b_1.atomicfu$compareAndSet(current, Empty_instance);
                } else {
                  tmp_1 = false;
                }
                if (tmp_1) {
                  current.o1b();
                }
              }
            }
             while (false);
            suspendResult = returnIfSuspended(cancellable.lt(), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            this.z8_1 = 1;
            continue $sm;
          case 3:
            if (this.k1c_1.z1b_1.m().b1(new Long(1048576, 0)) < 0) {
              moveFlushToReadBuffer(this.k1c_1);
            }

            return this.k1c_1.z1b_1.m().b1(toLong(this.l1c_1)) >= 0;
          case 4:
            throw this.c9_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.a9_1 === 4) {
          throw e;
        } else {
          this.z8_1 = this.a9_1;
          this.c9_1 = e;
        }
      }
     while (true);
  };
  function $flushCOROUTINE$1(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.w1c_1 = _this__u8e3s4;
  }
  protoOf($flushCOROUTINE$1).h9 = function () {
    var suspendResult = this.b9_1;
    $sm: do
      try {
        var tmp = this.z8_1;
        switch (tmp) {
          case 0:
            this.a9_1 = 4;
            rethrowCloseCauseIfNeeded_1(this.w1c_1);
            this.w1c_1.z1c();
            if (this.w1c_1.w1b_1 < 1048576)
              return Unit_instance;
            var tmp_0 = this;
            tmp_0.x1c_1 = this.w1c_1;
            this.y1c_1 = this.x1c_1;
            this.z8_1 = 1;
            continue $sm;
          case 1:
            if (!(this.w1c_1.w1b_1 >= 1048576 && this.w1c_1.b1c_1.kotlinx$atomicfu$value == null)) {
              this.z8_1 = 3;
              continue $sm;
            }

            this.z8_1 = 2;
            var cancellable = new CancellableContinuationImpl(intercepted(this), 1);
            cancellable.dt();
            var tmp0 = this.y1c_1;
            var tmp1 = new Write(cancellable);
            l$ret$1: do {
              var previous = tmp0.y1b_1.kotlinx$atomicfu$value;
              if (!(previous instanceof Closed)) {
                if (!tmp0.y1b_1.atomicfu$compareAndSet(previous, tmp1)) {
                  tmp1.o1b();
                  break l$ret$1;
                }
              }
              if (previous instanceof Write) {
                previous.p1b(new ConcurrentIOException(tmp1.n1b(), previous.l1b()));
              } else {
                if (isInterface(previous, Task)) {
                  previous.o1b();
                } else {
                  if (previous instanceof Closed) {
                    tmp1.p1b(previous.k1b_1);
                    break l$ret$1;
                  } else {
                    if (!equals(previous, Empty_instance)) {
                      noWhenBranchMatchedException();
                    }
                  }
                }
              }
              if (!(this.w1c_1.w1b_1 >= 1048576 && this.w1c_1.b1c_1.kotlinx$atomicfu$value == null)) {
                var current = tmp0.y1b_1.kotlinx$atomicfu$value;
                var tmp_1;
                if (current instanceof Write) {
                  tmp_1 = tmp0.y1b_1.atomicfu$compareAndSet(current, Empty_instance);
                } else {
                  tmp_1 = false;
                }
                if (tmp_1) {
                  current.o1b();
                }
              }
            }
             while (false);
            suspendResult = returnIfSuspended(cancellable.lt(), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            this.z8_1 = 1;
            continue $sm;
          case 3:
            return Unit_instance;
          case 4:
            throw this.c9_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.a9_1 === 4) {
          throw e;
        } else {
          this.z8_1 = this.a9_1;
          this.c9_1 = e;
        }
      }
     while (true);
  };
  function $flushAndCloseCOROUTINE$2(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.i1d_1 = _this__u8e3s4;
  }
  protoOf($flushAndCloseCOROUTINE$2).h9 = function () {
    var suspendResult = this.b9_1;
    $sm: do
      try {
        var tmp = this.z8_1;
        switch (tmp) {
          case 0:
            this.a9_1 = 4;
            var tmp_0 = this;
            tmp_0.j1d_1 = this.i1d_1;
            this.k1d_1 = this.j1d_1;
            this.a9_1 = 2;
            var tmp_1 = this;
            tmp_1.m1d_1 = Companion_instance;
            var tmp_2 = this;
            tmp_2.n1d_1 = this.k1d_1;
            this.o1d_1 = this.n1d_1;
            this.z8_1 = 1;
            suspendResult = this.o1d_1.p1d(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var tmp_3 = this;
            this.m1d_1;
            tmp_3.l1d_1 = _Result___init__impl__xyqfz8(Unit_instance);
            this.a9_1 = 4;
            this.z8_1 = 3;
            continue $sm;
          case 2:
            this.a9_1 = 4;
            var tmp_4 = this.c9_1;
            if (tmp_4 instanceof Error) {
              var e = this.c9_1;
              var tmp_5 = this;
              tmp_5.l1d_1 = _Result___init__impl__xyqfz8(createFailure(e));
              this.z8_1 = 3;
              continue $sm;
            } else {
              throw this.c9_1;
            }

          case 3:
            this.a9_1 = 4;
            if (!this.i1d_1.b1c_1.atomicfu$compareAndSet(null, get_CLOSED()))
              return Unit_instance;
            closeSlot(this.i1d_1, null);
            return Unit_instance;
          case 4:
            throw this.c9_1;
        }
      } catch ($p) {
        var e_0 = $p;
        if (this.a9_1 === 4) {
          throw e_0;
        } else {
          this.z8_1 = this.a9_1;
          this.c9_1 = e_0;
        }
      }
     while (true);
  };
  function ByteChannel(autoFlush) {
    autoFlush = autoFlush === VOID ? false : autoFlush;
    this.u1b_1 = autoFlush;
    this.v1b_1 = new Buffer();
    this.w1b_1 = 0;
    this.x1b_1 = new Object();
    this.y1b_1 = atomic$ref$1(Empty_instance);
    this.z1b_1 = new Buffer();
    this.a1c_1 = new Buffer();
    this.b1c_1 = atomic$ref$1(null);
  }
  protoOf(ByteChannel).q1d = function () {
    var tmp0_safe_receiver = this.r1d();
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      throw tmp0_safe_receiver;
    }
    if (this.z1b_1.k18()) {
      moveFlushToReadBuffer(this);
    }
    return this.z1b_1;
  };
  protoOf(ByteChannel).s1d = function () {
    var tmp0_safe_receiver = this.r1d();
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      throw tmp0_safe_receiver;
    }
    if (this.t1d()) {
      throw IOException_init_$Create$('Channel is closed for write');
    }
    return this.a1c_1;
  };
  protoOf(ByteChannel).r1d = function () {
    var tmp0_safe_receiver = this.b1c_1.kotlinx$atomicfu$value;
    return tmp0_safe_receiver == null ? null : tmp0_safe_receiver.q9();
  };
  protoOf(ByteChannel).t1d = function () {
    return !(this.b1c_1.kotlinx$atomicfu$value == null);
  };
  protoOf(ByteChannel).v1d = function () {
    return !(this.r1d() == null) || (this.t1d() && this.w1b_1 === 0 && this.z1b_1.k18());
  };
  protoOf(ByteChannel).w1d = function (min, $completion) {
    var tmp = new $awaitContentCOROUTINE$0(this, min, $completion);
    tmp.b9_1 = Unit_instance;
    tmp.c9_1 = null;
    return tmp.h9();
  };
  protoOf(ByteChannel).p1d = function ($completion) {
    var tmp = new $flushCOROUTINE$1(this, $completion);
    tmp.b9_1 = Unit_instance;
    tmp.c9_1 = null;
    return tmp.h9();
  };
  protoOf(ByteChannel).z1c = function () {
    if (this.a1c_1.k18())
      return Unit_instance;
    // Inline function 'io.ktor.utils.io.locks.synchronized' call
    this.x1b_1;
    var count = this.a1c_1.m().g1();
    this.v1b_1.c1a(this.a1c_1);
    this.w1b_1 = this.w1b_1 + count | 0;
    // Inline function 'io.ktor.utils.io.ByteChannel.resumeSlot' call
    var current = this.y1b_1.kotlinx$atomicfu$value;
    var tmp;
    if (current instanceof Read) {
      tmp = this.y1b_1.atomicfu$compareAndSet(current, Empty_instance);
    } else {
      tmp = false;
    }
    if (tmp) {
      current.o1b();
    }
  };
  protoOf(ByteChannel).y1d = function ($completion) {
    var tmp = new $flushAndCloseCOROUTINE$2(this, $completion);
    tmp.b9_1 = Unit_instance;
    tmp.c9_1 = null;
    return tmp.h9();
  };
  protoOf(ByteChannel).z1d = function (cause) {
    if (!(this.b1c_1.kotlinx$atomicfu$value == null))
      return Unit_instance;
    var closedToken = new CloseToken(cause);
    this.b1c_1.atomicfu$compareAndSet(null, closedToken);
    var actualCause = closedToken.q9();
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
    this_0.u19(content, offset, offset + length | 0);
    var source = this_0;
    return ByteReadChannel_0(source);
  }
  function ByteReadChannel_0(source) {
    return new SourceByteReadChannel(source);
  }
  function ByteReadChannel$Companion$Empty$1() {
    this.a1e_1 = null;
    this.b1e_1 = new Buffer();
  }
  protoOf(ByteReadChannel$Companion$Empty$1).r1d = function () {
    return this.a1e_1;
  };
  protoOf(ByteReadChannel$Companion$Empty$1).v1d = function () {
    return true;
  };
  protoOf(ByteReadChannel$Companion$Empty$1).q1d = function () {
    return this.b1e_1;
  };
  protoOf(ByteReadChannel$Companion$Empty$1).w1d = function (min, $completion) {
    return false;
  };
  protoOf(ByteReadChannel$Companion$Empty$1).z1d = function (cause) {
  };
  function Companion_0() {
    Companion_instance_1 = this;
    var tmp = this;
    tmp.c1e_1 = new ByteReadChannel$Companion$Empty$1();
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
    _this__u8e3s4.z1d(IOException_init_$Create$('Channel was cancelled'));
  }
  function readRemaining(_this__u8e3s4, $completion) {
    var tmp = new $readRemainingCOROUTINE$3(_this__u8e3s4, $completion);
    tmp.b9_1 = Unit_instance;
    tmp.c9_1 = null;
    return tmp.h9();
  }
  function get_availableForRead(_this__u8e3s4) {
    return _this__u8e3s4.q1d().j18().m().g1();
  }
  function readPacket(_this__u8e3s4, packet, $completion) {
    var tmp = new $readPacketCOROUTINE$4(_this__u8e3s4, packet, $completion);
    tmp.b9_1 = Unit_instance;
    tmp.c9_1 = null;
    return tmp.h9();
  }
  function readAvailable(_this__u8e3s4, buffer, offset, length, $completion) {
    offset = offset === VOID ? 0 : offset;
    length = length === VOID ? buffer.length - offset | 0 : length;
    var tmp = new $readAvailableCOROUTINE$8(_this__u8e3s4, buffer, offset, length, $completion);
    tmp.b9_1 = Unit_instance;
    tmp.c9_1 = null;
    return tmp.h9();
  }
  function readUTF8Line(_this__u8e3s4, max, $completion) {
    max = max === VOID ? 2147483647 : max;
    var tmp = new $readUTF8LineCOROUTINE$9(_this__u8e3s4, max, $completion);
    tmp.b9_1 = Unit_instance;
    tmp.c9_1 = null;
    return tmp.h9();
  }
  function toByteArray(_this__u8e3s4, $completion) {
    var tmp = new $toByteArrayCOROUTINE$10(_this__u8e3s4, $completion);
    tmp.b9_1 = Unit_instance;
    tmp.c9_1 = null;
    return tmp.h9();
  }
  function copyTo(_this__u8e3s4, channel, limit, $completion) {
    var tmp = new $copyToCOROUTINE$11(_this__u8e3s4, channel, limit, $completion);
    tmp.b9_1 = Unit_instance;
    tmp.c9_1 = null;
    return tmp.h9();
  }
  function rethrowCloseCauseIfNeeded(_this__u8e3s4) {
    var tmp0_safe_receiver = _this__u8e3s4.r1d();
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
    tmp.b9_1 = Unit_instance;
    tmp.c9_1 = null;
    return tmp.h9();
  }
  function readBuffer(_this__u8e3s4, $completion) {
    var tmp = new $readBufferCOROUTINE$13(_this__u8e3s4, $completion);
    tmp.b9_1 = Unit_instance;
    tmp.c9_1 = null;
    return tmp.h9();
  }
  function rethrowCloseCauseIfNeeded_0(_this__u8e3s4) {
    var tmp0_safe_receiver = _this__u8e3s4.r1d();
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      throw tmp0_safe_receiver;
    }
  }
  function rethrowCloseCauseIfNeeded_1(_this__u8e3s4) {
    var tmp0_safe_receiver = _this__u8e3s4.r1d();
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      throw tmp0_safe_receiver;
    }
  }
  function $readRemainingCOROUTINE$3(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.l1e_1 = _this__u8e3s4;
  }
  protoOf($readRemainingCOROUTINE$3).h9 = function () {
    var suspendResult = this.b9_1;
    $sm: do
      try {
        var tmp = this.z8_1;
        switch (tmp) {
          case 0:
            this.a9_1 = 4;
            this.m1e_1 = BytePacketBuilder();
            this.z8_1 = 1;
            continue $sm;
          case 1:
            if (!!this.l1e_1.v1d()) {
              this.z8_1 = 3;
              continue $sm;
            }

            this.m1e_1.c1a(this.l1e_1.q1d());
            this.z8_1 = 2;
            suspendResult = this.l1e_1.x1d(VOID, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            this.z8_1 = 1;
            continue $sm;
          case 3:
            rethrowCloseCauseIfNeeded(this.l1e_1);
            return this.m1e_1.j18();
          case 4:
            throw this.c9_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.a9_1 === 4) {
          throw e;
        } else {
          this.z8_1 = this.a9_1;
          this.c9_1 = e;
        }
      }
     while (true);
  };
  function $readPacketCOROUTINE$4(_this__u8e3s4, packet, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.v1e_1 = _this__u8e3s4;
    this.w1e_1 = packet;
  }
  protoOf($readPacketCOROUTINE$4).h9 = function () {
    var suspendResult = this.b9_1;
    $sm: do
      try {
        var tmp = this.z8_1;
        switch (tmp) {
          case 0:
            this.a9_1 = 6;
            this.x1e_1 = new Buffer();
            this.z8_1 = 1;
            continue $sm;
          case 1:
            if (!(this.x1e_1.m().b1(toLong(this.w1e_1)) < 0)) {
              this.z8_1 = 5;
              continue $sm;
            }

            if (this.v1e_1.q1d().k18()) {
              this.z8_1 = 2;
              suspendResult = this.v1e_1.x1d(VOID, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.z8_1 = 3;
              continue $sm;
            }

          case 2:
            this.z8_1 = 3;
            continue $sm;
          case 3:
            if (this.v1e_1.v1d()) {
              this.z8_1 = 5;
              continue $sm;
            } else {
              this.z8_1 = 4;
              continue $sm;
            }

          case 4:
            if (get_remaining(this.v1e_1.q1d()).b1(numberToLong(this.w1e_1).v2(this.x1e_1.m())) > 0) {
              this.v1e_1.q1d().n19(this.x1e_1, numberToLong(this.w1e_1).v2(this.x1e_1.m()));
            } else {
              this.v1e_1.q1d().o19(this.x1e_1);
            }

            this.z8_1 = 1;
            continue $sm;
          case 5:
            if (this.x1e_1.m().b1(toLong(this.w1e_1)) < 0) {
              throw EOFException_init_$Create$('Not enough data available, required ' + this.w1e_1 + ' bytes but only ' + this.x1e_1.m().toString() + ' available');
            }

            return this.x1e_1;
          case 6:
            throw this.c9_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.a9_1 === 6) {
          throw e;
        } else {
          this.z8_1 = this.a9_1;
          this.c9_1 = e;
        }
      }
     while (true);
  };
  function $readAvailableCOROUTINE$8(_this__u8e3s4, buffer, offset, length, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.g1f_1 = _this__u8e3s4;
    this.h1f_1 = buffer;
    this.i1f_1 = offset;
    this.j1f_1 = length;
  }
  protoOf($readAvailableCOROUTINE$8).h9 = function () {
    var suspendResult = this.b9_1;
    $sm: do
      try {
        var tmp = this.z8_1;
        switch (tmp) {
          case 0:
            this.a9_1 = 3;
            if (this.g1f_1.v1d())
              return -1;
            if (this.g1f_1.q1d().k18()) {
              this.z8_1 = 1;
              suspendResult = this.g1f_1.x1d(VOID, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.z8_1 = 2;
              continue $sm;
            }

          case 1:
            this.z8_1 = 2;
            continue $sm;
          case 2:
            if (this.g1f_1.v1d())
              return -1;
            return readAvailable_0(this.g1f_1.q1d(), this.h1f_1, this.i1f_1, this.j1f_1);
          case 3:
            throw this.c9_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.a9_1 === 3) {
          throw e;
        } else {
          this.z8_1 = this.a9_1;
          this.c9_1 = e;
        }
      }
     while (true);
  };
  function $readUTF8LineCOROUTINE$9(_this__u8e3s4, max, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.s1f_1 = _this__u8e3s4;
    this.t1f_1 = max;
  }
  protoOf($readUTF8LineCOROUTINE$9).h9 = function () {
    var suspendResult = this.b9_1;
    $sm: do
      try {
        var tmp = this.z8_1;
        switch (tmp) {
          case 0:
            this.a9_1 = 2;
            this.u1f_1 = StringBuilder_init_$Create$();
            this.z8_1 = 1;
            suspendResult = readUTF8LineTo(this.s1f_1, this.u1f_1, this.t1f_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var completed = suspendResult;
            return !completed ? null : this.u1f_1.toString();
          case 2:
            throw this.c9_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.a9_1 === 2) {
          throw e;
        } else {
          this.z8_1 = this.a9_1;
          this.c9_1 = e;
        }
      }
     while (true);
  };
  function $toByteArrayCOROUTINE$10(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.d1g_1 = _this__u8e3s4;
  }
  protoOf($toByteArrayCOROUTINE$10).h9 = function () {
    var suspendResult = this.b9_1;
    $sm: do
      try {
        var tmp = this.z8_1;
        switch (tmp) {
          case 0:
            this.a9_1 = 2;
            this.z8_1 = 1;
            suspendResult = readBuffer(this.d1g_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var ARGUMENT = suspendResult;
            return readBytes(ARGUMENT);
          case 2:
            throw this.c9_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.a9_1 === 2) {
          throw e;
        } else {
          this.z8_1 = this.a9_1;
          this.c9_1 = e;
        }
      }
     while (true);
  };
  function $copyToCOROUTINE$11(_this__u8e3s4, channel, limit, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.m1g_1 = _this__u8e3s4;
    this.n1g_1 = channel;
    this.o1g_1 = limit;
  }
  protoOf($copyToCOROUTINE$11).h9 = function () {
    var suspendResult = this.b9_1;
    $sm: do
      try {
        var tmp = this.z8_1;
        switch (tmp) {
          case 0:
            this.a9_1 = 12;
            this.p1g_1 = this.o1g_1;
            this.z8_1 = 1;
            continue $sm;
          case 1:
            this.a9_1 = 8;
            this.a9_1 = 7;
            this.z8_1 = 2;
            continue $sm;
          case 2:
            if (!(!this.m1g_1.v1d() && this.p1g_1.b1(new Long(0, 0)) > 0)) {
              this.z8_1 = 6;
              continue $sm;
            }

            if (this.m1g_1.q1d().k18()) {
              this.z8_1 = 3;
              suspendResult = this.m1g_1.x1d(VOID, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.z8_1 = 4;
              continue $sm;
            }

          case 3:
            this.z8_1 = 4;
            continue $sm;
          case 4:
            var tmp_0 = this;
            var tmp0 = this.p1g_1;
            var b = get_remaining(this.m1g_1.q1d());
            tmp_0.r1g_1 = tmp0.b1(b) <= 0 ? tmp0 : b;
            this.m1g_1.q1d().n19(this.n1g_1.s1d(), this.r1g_1);
            this.p1g_1 = this.p1g_1.v2(this.r1g_1);
            this.z8_1 = 5;
            suspendResult = this.n1g_1.p1d(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 5:
            this.z8_1 = 2;
            continue $sm;
          case 6:
            this.q1g_1 = Unit_instance;
            this.a9_1 = 12;
            this.z8_1 = 10;
            continue $sm;
          case 7:
            this.a9_1 = 8;
            var tmp_1 = this.c9_1;
            if (tmp_1 instanceof Error) {
              this.s1g_1 = this.c9_1;
              var tmp_2 = this;
              this.m1g_1.z1d(this.s1g_1);
              close_0(this.n1g_1, this.s1g_1);
              throw this.s1g_1;
            } else {
              throw this.c9_1;
            }

          case 8:
            this.a9_1 = 12;
            this.t1g_1 = this.c9_1;
            this.z8_1 = 9;
            suspendResult = this.n1g_1.p1d(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 9:
            throw this.t1g_1;
          case 10:
            this.a9_1 = 12;
            this.z8_1 = 11;
            suspendResult = this.n1g_1.p1d(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 11:
            return this.o1g_1.v2(this.p1g_1);
          case 12:
            throw this.c9_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.a9_1 === 12) {
          throw e;
        } else {
          this.z8_1 = this.a9_1;
          this.c9_1 = e;
        }
      }
     while (true);
  };
  function $readUTF8LineToCOROUTINE$12(_this__u8e3s4, out, max, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.c1h_1 = _this__u8e3s4;
    this.d1h_1 = out;
    this.e1h_1 = max;
  }
  protoOf($readUTF8LineToCOROUTINE$12).h9 = function () {
    var suspendResult = this.b9_1;
    $sm: do
      try {
        var tmp = this.z8_1;
        switch (tmp) {
          case 0:
            this.a9_1 = 21;
            if (this.c1h_1.q1d().k18()) {
              this.z8_1 = 1;
              suspendResult = this.c1h_1.x1d(VOID, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.z8_1 = 2;
              continue $sm;
            }

          case 1:
            this.z8_1 = 2;
            continue $sm;
          case 2:
            if (this.c1h_1.v1d())
              return false;
            var tmp_0 = this;
            tmp_0.f1h_1 = new Buffer();
            this.z8_1 = 3;
            continue $sm;
          case 3:
            this.h1h_1 = this.f1h_1;
            this.i1h_1 = null;
            this.z8_1 = 4;
            continue $sm;
          case 4:
            this.z8_1 = 5;
            continue $sm;
          case 5:
            this.z8_1 = 6;
            continue $sm;
          case 6:
            this.a9_1 = 18;
            this.a9_1 = 17;
            var tmp_1 = this;
            tmp_1.k1h_1 = this.h1h_1;
            this.l1h_1 = this.k1h_1;
            this.z8_1 = 7;
            continue $sm;
          case 7:
            if (!!this.c1h_1.v1d()) {
              this.z8_1 = 14;
              continue $sm;
            }

            this.z8_1 = 8;
            continue $sm;
          case 8:
            if (!!this.c1h_1.q1d().k18()) {
              this.z8_1 = 12;
              continue $sm;
            }

            this.m1h_1 = this.c1h_1.q1d().n18();
            if (this.m1h_1 === 13) {
              if (this.c1h_1.q1d().k18()) {
                this.z8_1 = 10;
                suspendResult = this.c1h_1.x1d(VOID, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }
                continue $sm;
              } else {
                this.z8_1 = 11;
                continue $sm;
              }
            } else {
              if (this.m1h_1 === 10) {
                this.d1h_1.f(readString(this.l1h_1));
                this.j1h_1 = true;
                this.a9_1 = 21;
                this.z8_1 = 15;
                continue $sm;
              } else {
                this.l1h_1.d1a(this.m1h_1);
                this.z8_1 = 9;
                continue $sm;
              }
            }

          case 9:
            this.z8_1 = 8;
            continue $sm;
          case 10:
            this.z8_1 = 11;
            continue $sm;
          case 11:
            if (this.c1h_1.q1d().j18().g19(new Long(0, 0)) === 10) {
              discard(this.c1h_1.q1d(), new Long(1, 0));
            }

            this.d1h_1.f(readString(this.l1h_1));
            this.j1h_1 = true;
            this.a9_1 = 21;
            this.z8_1 = 15;
            continue $sm;
          case 12:
            if (this.l1h_1.m().b1(toLong(this.e1h_1)) >= 0) {
              throw new TooLongLineException('Line exceeds limit of ' + this.e1h_1 + ' characters');
            }

            this.z8_1 = 13;
            suspendResult = this.c1h_1.x1d(VOID, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 13:
            this.z8_1 = 7;
            continue $sm;
          case 14:
            var tmp_2 = this;
            var this_0 = this.l1h_1.m().b1(new Long(0, 0)) > 0;
            if (this_0) {
              this.d1h_1.f(readString(this.l1h_1));
            }

            tmp_2.j1h_1 = this_0;
            this.a9_1 = 21;
            this.z8_1 = 15;
            var tmp_3 = this;
            continue $sm;
          case 15:
            var tmp_4 = this.j1h_1;
            this.a9_1 = 21;
            closeFinally(this.h1h_1, this.i1h_1);
            return tmp_4;
          case 16:
            this.a9_1 = 21;
            var tmp_5 = this;
            closeFinally(this.h1h_1, this.i1h_1);
            tmp_5.g1h_1 = Unit_instance;
            this.z8_1 = 20;
            continue $sm;
          case 17:
            this.a9_1 = 18;
            var tmp_6 = this.c9_1;
            if (tmp_6 instanceof Error) {
              var e = this.c9_1;
              var tmp_7 = this;
              this.i1h_1 = e;
              throw e;
            } else {
              throw this.c9_1;
            }

          case 18:
            this.a9_1 = 21;
            var t = this.c9_1;
            closeFinally(this.h1h_1, this.i1h_1);
            throw t;
          case 19:
            this.a9_1 = 21;
            closeFinally(this.h1h_1, this.i1h_1);
            if (false) {
              this.z8_1 = 3;
              continue $sm;
            }

            this.z8_1 = 20;
            continue $sm;
          case 20:
            return Unit_instance;
          case 21:
            throw this.c9_1;
        }
      } catch ($p) {
        var e_0 = $p;
        if (this.a9_1 === 21) {
          throw e_0;
        } else {
          this.z8_1 = this.a9_1;
          this.c9_1 = e_0;
        }
      }
     while (true);
  };
  function $readBufferCOROUTINE$13(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.v1h_1 = _this__u8e3s4;
  }
  protoOf($readBufferCOROUTINE$13).h9 = function () {
    var suspendResult = this.b9_1;
    $sm: do
      try {
        var tmp = this.z8_1;
        switch (tmp) {
          case 0:
            this.a9_1 = 4;
            this.w1h_1 = new Buffer();
            this.z8_1 = 1;
            continue $sm;
          case 1:
            if (!!this.v1h_1.v1d()) {
              this.z8_1 = 3;
              continue $sm;
            }

            this.w1h_1.c1a(this.v1h_1.q1d());
            this.z8_1 = 2;
            suspendResult = this.v1h_1.x1d(VOID, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            this.z8_1 = 1;
            continue $sm;
          case 3:
            var tmp0_safe_receiver = this.v1h_1.r1d();
            if (tmp0_safe_receiver == null)
              null;
            else {
              throw tmp0_safe_receiver;
            }

            return this.w1h_1;
          case 4:
            throw this.c9_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.a9_1 === 4) {
          throw e;
        } else {
          this.z8_1 = this.a9_1;
          this.c9_1 = e;
        }
      }
     while (true);
  };
  function flushIfNeeded(_this__u8e3s4, $completion) {
    var tmp = new $flushIfNeededCOROUTINE$15(_this__u8e3s4, $completion);
    tmp.b9_1 = Unit_instance;
    tmp.c9_1 = null;
    return tmp.h9();
  }
  function $flushIfNeededCOROUTINE$15(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.f1i_1 = _this__u8e3s4;
  }
  protoOf($flushIfNeededCOROUTINE$15).h9 = function () {
    var suspendResult = this.b9_1;
    $sm: do
      try {
        var tmp = this.z8_1;
        switch (tmp) {
          case 0:
            this.a9_1 = 3;
            rethrowCloseCauseIfNeeded_0(this.f1i_1);
            var tmp_0;
            var tmp_1 = this.f1i_1;
            var tmp0_safe_receiver = tmp_1 instanceof ByteChannel ? tmp_1 : null;
            if ((tmp0_safe_receiver == null ? null : tmp0_safe_receiver.u1b_1) === true) {
              tmp_0 = true;
            } else {
              tmp_0 = get_size(this.f1i_1.s1d()) >= 1048576;
            }

            if (tmp_0) {
              this.z8_1 = 1;
              suspendResult = this.f1i_1.p1d(this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.z8_1 = 2;
              continue $sm;
            }

          case 1:
            this.z8_1 = 2;
            continue $sm;
          case 2:
            return Unit_instance;
          case 3:
            throw this.c9_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.a9_1 === 3) {
          throw e;
        } else {
          this.z8_1 = this.a9_1;
          this.c9_1 = e;
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
    this.g1i_1 = channel;
    this.h1i_1 = job;
  }
  protoOf(WriterJob).nu = function () {
    return this.h1i_1;
  };
  function writer(_this__u8e3s4, coroutineContext, autoFlush, block) {
    coroutineContext = coroutineContext === VOID ? EmptyCoroutineContext_getInstance() : coroutineContext;
    autoFlush = autoFlush === VOID ? false : autoFlush;
    _init_properties_ByteWriteChannelOperations_kt__i7slrs();
    return writer_0(_this__u8e3s4, coroutineContext, new ByteChannel(), block);
  }
  function WriterScope(channel, coroutineContext) {
    this.i1i_1 = channel;
    this.j1i_1 = coroutineContext;
  }
  protoOf(WriterScope).to = function () {
    return this.j1i_1;
  };
  function writeFully(_this__u8e3s4, value, startIndex, endIndex, $completion) {
    startIndex = startIndex === VOID ? 0 : startIndex;
    endIndex = endIndex === VOID ? value.length : endIndex;
    _this__u8e3s4.s1d().u19(value, startIndex, endIndex);
    return flushIfNeeded(_this__u8e3s4, $completion);
  }
  function writePacket(_this__u8e3s4, copy, $completion) {
    _this__u8e3s4.s1d().c1a(copy);
    return flushIfNeeded(_this__u8e3s4, $completion);
  }
  function get_isCompleted(_this__u8e3s4) {
    _init_properties_ByteWriteChannelOperations_kt__i7slrs();
    return _this__u8e3s4.nu().pp();
  }
  function close_0(_this__u8e3s4, cause) {
    _init_properties_ByteWriteChannelOperations_kt__i7slrs();
    if (cause == null) {
      fireAndForget(ByteWriteChannel$flushAndClose$ref_0(_this__u8e3s4));
    } else {
      _this__u8e3s4.z1d(cause);
    }
  }
  function invokeOnCompletion(_this__u8e3s4, block) {
    _init_properties_ByteWriteChannelOperations_kt__i7slrs();
    var tmp = _this__u8e3s4.nu();
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
    this.k1i_1 = EmptyCoroutineContext_getInstance();
  }
  protoOf(NO_CALLBACK$1).f9 = function () {
    return this.k1i_1;
  };
  protoOf(NO_CALLBACK$1).g9 = function (result) {
    return Unit_instance;
  };
  protoOf(NO_CALLBACK$1).k9 = function (result) {
    return this.g9(result);
  };
  function ByteWriteChannel$flushAndClose$ref($boundThis) {
    this.l1i_1 = $boundThis;
  }
  protoOf(ByteWriteChannel$flushAndClose$ref).m1i = function ($completion) {
    return this.l1i_1.y1d($completion);
  };
  protoOf(ByteWriteChannel$flushAndClose$ref).wa = function ($completion) {
    return this.m1i($completion);
  };
  function ByteWriteChannel$flushAndClose$ref_0($boundThis) {
    var i = new ByteWriteChannel$flushAndClose$ref($boundThis);
    var l = function ($completion) {
      return i.m1i($completion);
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
    this.v1i_1 = $block;
    this.w1i_1 = $channel;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(writer$slambda).q1j = function ($this$launch, $completion) {
    var tmp = this.r1j($this$launch, $completion);
    tmp.b9_1 = Unit_instance;
    tmp.c9_1 = null;
    return tmp.h9();
  };
  protoOf(writer$slambda).r9 = function (p1, $completion) {
    return this.q1j((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(writer$slambda).h9 = function () {
    var suspendResult = this.b9_1;
    $sm: do
      try {
        var tmp = this.z8_1;
        switch (tmp) {
          case 0:
            this.a9_1 = 14;
            this.y1i_1 = Job(get_job(this.x1i_1.to()));
            this.z8_1 = 1;
            continue $sm;
          case 1:
            this.a9_1 = 4;
            this.a9_1 = 3;
            this.z8_1 = 2;
            suspendResult = this.v1i_1(new WriterScope(this.w1i_1, this.x1i_1.to().ci(this.y1i_1)), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            this.y1i_1.jv();
            var tmp_0 = this;
            var tmp_1;
            if (get_job(this.x1i_1.to()).qp()) {
              this.w1i_1.z1d(get_job(this.x1i_1.to()).tp());
              tmp_1 = Unit_instance;
            }

            tmp_0.z1i_1 = tmp_1;
            this.a9_1 = 14;
            this.z8_1 = 9;
            continue $sm;
          case 3:
            this.a9_1 = 4;
            var tmp_2 = this.c9_1;
            if (tmp_2 instanceof Error) {
              this.a1j_1 = this.c9_1;
              var tmp_3 = this;
              cancel(this.y1i_1, 'Exception thrown while writing to channel', this.a1j_1);
              this.w1i_1.z1d(this.a1j_1);
              tmp_3.z1i_1 = Unit_instance;
              this.a9_1 = 14;
              this.z8_1 = 9;
              continue $sm;
            } else {
              throw this.c9_1;
            }

          case 4:
            this.a9_1 = 14;
            this.b1j_1 = this.c9_1;
            this.z8_1 = 5;
            suspendResult = this.y1i_1.kv(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 5:
            var tmp_4 = this;
            tmp_4.c1j_1 = this.x1i_1;
            this.d1j_1 = this.c1j_1;
            this.a9_1 = 7;
            var tmp_5 = this;
            tmp_5.f1j_1 = Companion_instance;
            var tmp_6 = this;
            tmp_6.g1j_1 = this.d1j_1;
            this.h1j_1 = this.g1j_1;
            this.z8_1 = 6;
            suspendResult = this.w1i_1.y1d(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 6:
            this.i1j_1 = Unit_instance;
            var tmp_7 = this;
            this.f1j_1;
            var value = this.i1j_1;
            tmp_7.e1j_1 = _Result___init__impl__xyqfz8(value);
            this.a9_1 = 14;
            this.z8_1 = 8;
            continue $sm;
          case 7:
            this.a9_1 = 14;
            var tmp_8 = this.c9_1;
            if (tmp_8 instanceof Error) {
              this.j1j_1 = this.c9_1;
              var tmp_9 = this;
              var exception = this.j1j_1;
              tmp_9.e1j_1 = _Result___init__impl__xyqfz8(createFailure(exception));
              this.z8_1 = 8;
              continue $sm;
            } else {
              throw this.c9_1;
            }

          case 8:
            this.a9_1 = 14;
            throw this.b1j_1;
          case 9:
            this.a9_1 = 14;
            this.z8_1 = 10;
            suspendResult = this.y1i_1.kv(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 10:
            var tmp_10 = this;
            tmp_10.k1j_1 = this.x1i_1;
            this.l1j_1 = this.k1j_1;
            this.a9_1 = 12;
            var tmp_11 = this;
            tmp_11.n1j_1 = Companion_instance;
            var tmp_12 = this;
            tmp_12.o1j_1 = this.l1j_1;
            this.p1j_1 = this.o1j_1;
            this.z8_1 = 11;
            suspendResult = this.w1i_1.y1d(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 11:
            var tmp_13 = this;
            this.n1j_1;
            tmp_13.m1j_1 = _Result___init__impl__xyqfz8(Unit_instance);
            this.a9_1 = 14;
            this.z8_1 = 13;
            continue $sm;
          case 12:
            this.a9_1 = 14;
            var tmp_14 = this.c9_1;
            if (tmp_14 instanceof Error) {
              var e = this.c9_1;
              var tmp_15 = this;
              tmp_15.m1j_1 = _Result___init__impl__xyqfz8(createFailure(e));
              this.z8_1 = 13;
              continue $sm;
            } else {
              throw this.c9_1;
            }

          case 13:
            this.a9_1 = 14;
            return Unit_instance;
          case 14:
            throw this.c9_1;
        }
      } catch ($p) {
        var e_0 = $p;
        if (this.a9_1 === 14) {
          throw e_0;
        } else {
          this.z8_1 = this.a9_1;
          this.c9_1 = e_0;
        }
      }
     while (true);
  };
  protoOf(writer$slambda).r1j = function ($this$launch, completion) {
    var i = new writer$slambda(this.v1i_1, this.w1i_1, completion);
    i.x1i_1 = $this$launch;
    return i;
  };
  function writer$slambda_0($block, $channel, resultContinuation) {
    var i = new writer$slambda($block, $channel, resultContinuation);
    var l = function ($this$launch, $completion) {
      return i.q1j($this$launch, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function writer$lambda($channel) {
    return function (it) {
      var tmp;
      if (!(it == null) && !$channel.t1d()) {
        $channel.z1d(it);
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
          tmp_1 = origin.sv();
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
          tmp_0 = origin.sv();
        } else {
          var tmp1_elvis_lhs = origin.message;
          tmp_0 = IOException_init_$Create$_0(tmp1_elvis_lhs == null ? 'Channel was closed' : tmp1_elvis_lhs, origin);
        }
      }
    }
    tmp.u1d_1 = tmp_0;
  }
  protoOf(CloseToken).q9 = function () {
    var tmp;
    if (this.u1d_1 == null) {
      tmp = null;
    } else {
      var tmp_0 = this.u1d_1;
      if (tmp_0 instanceof IOException) {
        var tmp_1;
        var tmp_2 = this.u1d_1;
        if (isInterface(tmp_2, CopyableThrowable)) {
          tmp_1 = this.u1d_1.sv();
        } else {
          tmp_1 = IOException_init_$Create$_0(this.u1d_1.message, this.u1d_1);
        }
        tmp = tmp_1;
      } else {
        var tmp_3 = this.u1d_1;
        if (!(tmp_3 == null) ? isInterface(tmp_3, CopyableThrowable) : false) {
          var tmp0_elvis_lhs = this.u1d_1.sv();
          tmp = tmp0_elvis_lhs == null ? CancellationException_init_$Create$(this.u1d_1.message, this.u1d_1) : tmp0_elvis_lhs;
        } else {
          tmp = CancellationException_init_$Create$(this.u1d_1.message, this.u1d_1);
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
    this.s1j_1 = source;
    this.t1j_1 = null;
  }
  protoOf(SourceByteReadChannel).r1d = function () {
    var tmp0_safe_receiver = this.t1j_1;
    return tmp0_safe_receiver == null ? null : tmp0_safe_receiver.q9();
  };
  protoOf(SourceByteReadChannel).v1d = function () {
    return this.s1j_1.k18();
  };
  protoOf(SourceByteReadChannel).q1d = function () {
    var tmp0_safe_receiver = this.r1d();
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      throw tmp0_safe_receiver;
    }
    return this.s1j_1;
  };
  protoOf(SourceByteReadChannel).w1d = function (min, $completion) {
    var tmp0_safe_receiver = this.r1d();
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      throw tmp0_safe_receiver;
    }
    return get_remaining(this.s1j_1).b1(toLong(min)) >= 0;
  };
  protoOf(SourceByteReadChannel).z1d = function (cause) {
    if (!(this.t1j_1 == null))
      return Unit_instance;
    this.s1j_1.c4();
    var tmp = this;
    var tmp1_elvis_lhs = cause == null ? null : cause.message;
    tmp.t1j_1 = new CloseToken(IOException_init_$Create$_0(tmp1_elvis_lhs == null ? 'Channel was cancelled' : tmp1_elvis_lhs, cause));
  };
  function decode(_this__u8e3s4, input, max) {
    max = max === VOID ? 2147483647 : max;
    var tmp0 = toLong(max);
    // Inline function 'kotlin.comparisons.minOf' call
    var b = input.j18().m();
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
    return !_this__u8e3s4.k18();
  }
  function readBytes(_this__u8e3s4, count) {
    count = count === VOID ? _this__u8e3s4.m().g1() : count;
    return readByteArray(_this__u8e3s4, count);
  }
  function BytePacketBuilder() {
    return new Buffer();
  }
  function writePacket_0(_this__u8e3s4, packet) {
    _this__u8e3s4.c1a(packet);
  }
  function build(_this__u8e3s4) {
    return _this__u8e3s4.j18();
  }
  function get_size(_this__u8e3s4) {
    return _this__u8e3s4.j18().m().g1();
  }
  function writeFully_0(_this__u8e3s4, buffer, offset, length) {
    offset = offset === VOID ? 0 : offset;
    length = length === VOID ? buffer.length - offset | 0 : length;
    _this__u8e3s4.u19(buffer, offset, offset + length | 0);
  }
  var ByteReadPacketEmpty;
  function get_remaining(_this__u8e3s4) {
    _init_properties_ByteReadPacket_kt__28475y();
    return _this__u8e3s4.j18().m();
  }
  function discard(_this__u8e3s4, count) {
    count = count === VOID ? new Long(-1, 2147483647) : count;
    _init_properties_ByteReadPacket_kt__28475y();
    _this__u8e3s4.m18(count);
    // Inline function 'kotlin.comparisons.minOf' call
    var b = get_remaining(_this__u8e3s4);
    var countToDiscard = count.b1(b) <= 0 ? count : b;
    _this__u8e3s4.j18().i19(countToDiscard);
    return countToDiscard;
  }
  function takeWhile(_this__u8e3s4, block) {
    _init_properties_ByteReadPacket_kt__28475y();
    while (!_this__u8e3s4.k18() && block(_this__u8e3s4.j18())) {
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
    var result = _this__u8e3s4.j19(buffer, offset, offset + length | 0);
    return result === -1 ? 0 : result;
  }
  function readText_0(_this__u8e3s4, charset, max) {
    charset = charset === VOID ? Charsets_getInstance().u1j_1 : charset;
    max = max === VOID ? 2147483647 : max;
    if (charset.equals(Charsets_getInstance().u1j_1)) {
      if (max === 2147483647)
        return readString_0(_this__u8e3s4);
      var tmp0 = _this__u8e3s4.j18().m();
      // Inline function 'kotlin.math.min' call
      var b = toLong(max);
      var count = tmp0.b1(b) <= 0 ? tmp0 : b;
      return readString_1(_this__u8e3s4, count);
    }
    return decode(charset.x1j(), _this__u8e3s4, max);
  }
  function toByteArray_0(_this__u8e3s4, charset) {
    charset = charset === VOID ? Charsets_getInstance().u1j_1 : charset;
    if (charset.equals(Charsets_getInstance().u1j_1))
      return encodeToByteArray(_this__u8e3s4, VOID, VOID, true);
    return encodeToByteArray_0(charset.y1j(), _this__u8e3s4, 0, _this__u8e3s4.length);
  }
  function writeText(_this__u8e3s4, text, fromIndex, toIndex, charset) {
    fromIndex = fromIndex === VOID ? 0 : fromIndex;
    toIndex = toIndex === VOID ? charSequenceLength(text) : toIndex;
    charset = charset === VOID ? Charsets_getInstance().u1j_1 : charset;
    if (charset === Charsets_getInstance().u1j_1) {
      return writeString(_this__u8e3s4, toString_1(text), fromIndex, toIndex);
    }
    encodeToImpl(charset.y1j(), _this__u8e3s4, text, fromIndex, toIndex);
  }
  function get_ByteArrayPool() {
    _init_properties_ByteArrayPool_kt__kfi3uj();
    return ByteArrayPool;
  }
  var ByteArrayPool;
  function ByteArrayPool$1() {
    DefaultPool.call(this, 128);
  }
  protoOf(ByteArrayPool$1).c1k = function () {
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
  protoOf(Companion_1).l1k = function (name) {
    switch (name) {
      case 'UTF-8':
      case 'utf-8':
      case 'UTF8':
      case 'utf8':
        return Charsets_getInstance().u1j_1;
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
      return Charsets_getInstance().v1j_1;
    }
    throw IllegalArgumentException_init_$Create$('Charset ' + name + ' is not supported');
  };
  var Companion_instance_2;
  function Companion_getInstance_1() {
    return Companion_instance_2;
  }
  function Charset(_name) {
    this.w1j_1 = _name;
  }
  protoOf(Charset).equals = function (other) {
    if (this === other)
      return true;
    if (other == null || !(this.constructor == other.constructor))
      return false;
    if (!(other instanceof Charset))
      THROW_CCE();
    return this.w1j_1 === other.w1j_1;
  };
  protoOf(Charset).hashCode = function () {
    return getStringHashCode(this.w1j_1);
  };
  protoOf(Charset).toString = function () {
    return this.w1j_1;
  };
  function get_name(_this__u8e3s4) {
    return _this__u8e3s4.w1j_1;
  }
  function Charsets() {
    Charsets_instance = this;
    this.u1j_1 = new CharsetImpl('UTF-8');
    this.v1j_1 = new CharsetImpl('ISO-8859-1');
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
    this.m1k_1 = _charset;
  }
  function CharsetEncoder(_charset) {
    this.n1k_1 = _charset;
  }
  function CharsetImpl(name) {
    Charset.call(this, name);
  }
  protoOf(CharsetImpl).y1j = function () {
    return new CharsetEncoderImpl(this);
  };
  protoOf(CharsetImpl).x1j = function () {
    return new CharsetDecoderImpl(this);
  };
  function CharsetEncoderImpl(charset) {
    CharsetEncoder.call(this, charset);
    this.q1k_1 = charset;
  }
  protoOf(CharsetEncoderImpl).toString = function () {
    return 'CharsetEncoderImpl(charset=' + this.q1k_1.toString() + ')';
  };
  protoOf(CharsetEncoderImpl).hashCode = function () {
    return this.q1k_1.hashCode();
  };
  protoOf(CharsetEncoderImpl).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof CharsetEncoderImpl))
      return false;
    var tmp0_other_with_cast = other instanceof CharsetEncoderImpl ? other : THROW_CCE();
    if (!this.q1k_1.equals(tmp0_other_with_cast.q1k_1))
      return false;
    return true;
  };
  function CharsetDecoderImpl(charset) {
    CharsetDecoder.call(this, charset);
    this.s1k_1 = charset;
  }
  protoOf(CharsetDecoderImpl).toString = function () {
    return 'CharsetDecoderImpl(charset=' + this.s1k_1.toString() + ')';
  };
  protoOf(CharsetDecoderImpl).hashCode = function () {
    return this.s1k_1.hashCode();
  };
  protoOf(CharsetDecoderImpl).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof CharsetDecoderImpl))
      return false;
    var tmp0_other_with_cast = other instanceof CharsetDecoderImpl ? other : THROW_CCE();
    if (!this.s1k_1.equals(tmp0_other_with_cast.s1k_1))
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
    var tmp0 = input.j18().m();
    // Inline function 'kotlin.comparisons.minOf' call
    var b = toLong(max);
    var count = tmp0.b1(b) <= 0 ? tmp0 : b;
    var tmp = readByteArray(input, count.g1());
    var array = tmp instanceof Int8Array ? tmp : THROW_CCE();
    var tmp_0;
    try {
      tmp_0 = decoder.t1k(array);
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
    return _this__u8e3s4.m1k_1;
  }
  function encodeImpl(_this__u8e3s4, input, fromIndex, toIndex, dst) {
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.require' call
    if (!(fromIndex <= toIndex)) {
      var message = 'Failed requirement.';
      throw IllegalArgumentException_init_$Create$(toString_1(message));
    }
    if (get_charset_0(_this__u8e3s4).equals(Charsets_getInstance().v1j_1)) {
      return encodeISO88591(input, fromIndex, toIndex, dst);
    }
    // Inline function 'kotlin.require' call
    if (!(get_charset_0(_this__u8e3s4) === Charsets_getInstance().u1j_1)) {
      var message_0 = 'Only UTF-8 encoding is supported in JS';
      throw IllegalArgumentException_init_$Create$(toString_1(message_0));
    }
    var encoder = new TextEncoder();
    // Inline function 'kotlin.text.substring' call
    var tmp$ret$5 = toString_1(charSequenceSubSequence(input, fromIndex, toIndex));
    var result = encoder.encode(tmp$ret$5);
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    dst.x19(result);
    return result.length;
  }
  function get_charset_0(_this__u8e3s4) {
    return _this__u8e3s4.n1k_1;
  }
  function forName(_this__u8e3s4, name) {
    return Companion_instance_2.l1k(name);
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
    this.u1k_1 = $this_toKtor;
  }
  protoOf(toKtor$1).t1k = function (buffer) {
    return this.u1k_1.decode(buffer);
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
    this.v1k_1 = fatal;
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
  protoOf(TextDecoderFallback).t1k = function (buffer) {
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
          if (!!this.v1k_1) {
            var message = 'Invalid character: ' + point;
            throw IllegalStateException_init_$Create$(toString_1(message));
          }
          writeFully_0(builder, get_REPLACEMENT());
          continue $l$loop;
        }
        if (point > 255) {
          builder.d1a(toByte(point >> 8));
        }
        builder.d1a(toByte(point & 255));
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
        dst.d1a(toByte(character));
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
    this.d1k_1 = capacity;
    var tmp = this;
    // Inline function 'kotlin.arrayOfNulls' call
    var size = this.d1k_1;
    tmp.e1k_1 = Array(size);
    this.f1k_1 = 0;
  }
  protoOf(DefaultPool).g1k = function (instance) {
  };
  protoOf(DefaultPool).h1k = function (instance) {
    return instance;
  };
  protoOf(DefaultPool).i1k = function (instance) {
  };
  protoOf(DefaultPool).j1k = function () {
    if (this.f1k_1 === 0)
      return this.c1k();
    this.f1k_1 = this.f1k_1 - 1 | 0;
    var idx = this.f1k_1;
    var tmp = this.e1k_1[idx];
    var instance = !(tmp == null) ? tmp : THROW_CCE();
    this.e1k_1[idx] = null;
    return this.h1k(instance);
  };
  protoOf(DefaultPool).k1k = function (instance) {
    this.i1k(instance);
    if (this.f1k_1 === this.d1k_1) {
      this.g1k(instance);
    } else {
      var _unary__edvuaz = this.f1k_1;
      this.f1k_1 = _unary__edvuaz + 1 | 0;
      this.e1k_1[_unary__edvuaz] = instance;
    }
  };
  protoOf(DefaultPool).bs = function () {
    var inductionVariable = 0;
    var last = this.f1k_1;
    if (inductionVariable < last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var tmp = this.e1k_1[i];
        var instance = !(tmp == null) ? tmp : THROW_CCE();
        this.e1k_1[i] = null;
        this.g1k(instance);
      }
       while (inductionVariable < last);
    this.f1k_1 = 0;
  };
  function get_DEVELOPMENT_MODE() {
    return false;
  }
  //region block: post-declaration
  protoOf(Read).o1b = resume;
  protoOf(Read).p1b = resume_0;
  protoOf(Write).o1b = resume;
  protoOf(Write).p1b = resume_0;
  protoOf(ByteChannel).x1d = awaitContent$default;
  protoOf(ByteReadChannel$Companion$Empty$1).x1d = awaitContent$default;
  protoOf(SourceByteReadChannel).x1d = awaitContent$default;
  protoOf(DefaultPool).c4 = close;
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
