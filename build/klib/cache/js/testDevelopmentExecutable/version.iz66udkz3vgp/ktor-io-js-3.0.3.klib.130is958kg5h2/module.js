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
  var protoOf = kotlin_kotlin.$_$.be;
  var THROW_CCE = kotlin_kotlin.$_$.jj;
  var Annotation = kotlin_kotlin.$_$.qi;
  var initMetadataForClass = kotlin_kotlin.$_$.xc;
  var VOID = kotlin_kotlin.$_$.h;
  var initMetadataForInterface = kotlin_kotlin.$_$.bd;
  var Companion_getInstance = kotlin_kotlin.$_$.a6;
  var Unit_getInstance = kotlin_kotlin.$_$.f6;
  var _Result___init__impl__xyqfz8 = kotlin_kotlin.$_$.v3;
  var initMetadataForCompanion = kotlin_kotlin.$_$.yc;
  var initMetadataForObject = kotlin_kotlin.$_$.dd;
  var toString = kotlin_kotlin.$_$.pk;
  var hashCode = kotlin_kotlin.$_$.wc;
  var equals = kotlin_kotlin.$_$.qc;
  var createFailure = kotlin_kotlin.$_$.ak;
  var Result = kotlin_kotlin.$_$.hj;
  var toString_0 = kotlin_kotlin.$_$.uh;
  var newThrowable = kotlin_kotlin.$_$.ud;
  var stackTraceToString = kotlin_kotlin.$_$.kk;
  var isInterface = kotlin_kotlin.$_$.md;
  var CoroutineImpl = kotlin_kotlin.$_$.vb;
  var toLong = kotlin_kotlin.$_$.de;
  var numberToLong = kotlin_kotlin.$_$.zd;
  var intercepted = kotlin_kotlin.$_$.hb;
  var CancellableContinuationImpl = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.r1;
  var noWhenBranchMatchedException = kotlin_kotlin.$_$.ik;
  var returnIfSuspended = kotlin_kotlin.$_$.p;
  var get_COROUTINE_SUSPENDED = kotlin_kotlin.$_$.eb;
  var Long = kotlin_kotlin.$_$.ej;
  var initMetadataForCoroutine = kotlin_kotlin.$_$.zc;
  var Buffer = kotlin_org_jetbrains_kotlinx_kotlinx_io_core.$_$.g;
  var atomic$ref$1 = kotlin_org_jetbrains_kotlinx_atomicfu.$_$.d;
  var IOException_init_$Create$ = kotlin_org_jetbrains_kotlinx_kotlinx_io_core.$_$.d;
  var IllegalStateException = kotlin_kotlin.$_$.dj;
  var IllegalStateException_init_$Init$ = kotlin_kotlin.$_$.j2;
  var captureStack = kotlin_kotlin.$_$.ic;
  var EOFException_init_$Create$ = kotlin_org_jetbrains_kotlinx_kotlinx_io_core.$_$.a;
  var readTo = kotlin_org_jetbrains_kotlinx_kotlinx_io_core.$_$.o;
  var StringBuilder_init_$Create$ = kotlin_kotlin.$_$.n1;
  var readString = kotlin_org_jetbrains_kotlinx_kotlinx_io_core.$_$.n;
  var closeFinally = kotlin_kotlin.$_$.yj;
  var EmptyCoroutineContext_getInstance = kotlin_kotlin.$_$.k5;
  var CoroutineScope = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.a2;
  var launch = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.v2;
  var startCoroutineCancellable = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.o1;
  var Continuation = kotlin_kotlin.$_$.ob;
  var initMetadataForFunctionReference = kotlin_kotlin.$_$.ad;
  var get_job = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.u2;
  var Job = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.g2;
  var cancel = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.q2;
  var initMetadataForLambda = kotlin_kotlin.$_$.cd;
  var KSuspendFunction0 = kotlin_kotlin.$_$.cf;
  var SuspendFunction0 = kotlin_kotlin.$_$.wb;
  var SuspendFunction1 = kotlin_kotlin.$_$.xb;
  var CopyableThrowable = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.v1;
  var IOException = kotlin_org_jetbrains_kotlinx_kotlinx_io_core.$_$.h;
  var IOException_init_$Create$_0 = kotlin_org_jetbrains_kotlinx_kotlinx_io_core.$_$.f;
  var CancellationException_init_$Create$ = kotlin_kotlin.$_$.j1;
  var CancellationException = kotlin_kotlin.$_$.db;
  var readString_0 = kotlin_org_jetbrains_kotlinx_kotlinx_io_core.$_$.l;
  var StringBuilder_init_$Create$_0 = kotlin_kotlin.$_$.m1;
  var IllegalStateException_init_$Create$ = kotlin_kotlin.$_$.i2;
  var charSequenceLength = kotlin_kotlin.$_$.mc;
  var readByteArray = kotlin_org_jetbrains_kotlinx_kotlinx_io_core.$_$.j;
  var readString_1 = kotlin_org_jetbrains_kotlinx_kotlinx_io_core.$_$.m;
  var encodeToByteArray = kotlin_kotlin.$_$.vf;
  var toString_1 = kotlin_kotlin.$_$.fe;
  var writeString = kotlin_org_jetbrains_kotlinx_kotlinx_io_core.$_$.p;
  var AutoCloseable = kotlin_kotlin.$_$.ti;
  var _Char___init__impl__6a9atx = kotlin_kotlin.$_$.n3;
  var replace = kotlin_kotlin.$_$.yg;
  var IllegalArgumentException_init_$Create$ = kotlin_kotlin.$_$.d2;
  var getStringHashCode = kotlin_kotlin.$_$.vc;
  var IOException_init_$Init$ = kotlin_org_jetbrains_kotlinx_kotlinx_io_core.$_$.c;
  var readByteArray_0 = kotlin_org_jetbrains_kotlinx_kotlinx_io_core.$_$.k;
  var charSequenceSubSequence = kotlin_kotlin.$_$.nc;
  var isCharSequence = kotlin_kotlin.$_$.id;
  var trim = kotlin_kotlin.$_$.gi;
  var toByte = kotlin_kotlin.$_$.ce;
  var decodeToString = kotlin_kotlin.$_$.rf;
  var setOf = kotlin_kotlin.$_$.ba;
  var charSequenceGet = kotlin_kotlin.$_$.lc;
  var Char__toInt_impl_vasixd = kotlin_kotlin.$_$.t3;
  //endregion
  //region block: pre-declaration
  initMetadataForClass(InternalAPI, 'InternalAPI', VOID, VOID, [Annotation]);
  initMetadataForClass(KtorDsl, 'KtorDsl', VOID, VOID, [Annotation]);
  initMetadataForInterface(ByteWriteChannel, 'ByteWriteChannel', VOID, VOID, VOID, [0]);
  initMetadataForInterface(BufferedByteWriteChannel, 'BufferedByteWriteChannel', VOID, VOID, [ByteWriteChannel], [0]);
  initMetadataForCompanion(Companion);
  initMetadataForInterface(Slot, 'Slot');
  initMetadataForObject(Empty, 'Empty', VOID, VOID, [Slot]);
  initMetadataForClass(Closed, 'Closed', VOID, VOID, [Slot]);
  function resume() {
    return this.get_continuation_7yron4_k$().resumeWith_dtxwbr_k$(Companion_getInstance_0().RESUME_1);
  }
  function resume_0(throwable) {
    var tmp = this.get_continuation_7yron4_k$();
    var tmp_0;
    if (throwable == null) {
      tmp_0 = null;
    } else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.Companion.failure' call
      Companion_getInstance();
      var tmp$ret$2 = _Result___init__impl__xyqfz8(createFailure(throwable));
      tmp_0 = new Result(tmp$ret$2);
    }
    var tmp1_elvis_lhs = tmp_0;
    return tmp.resumeWith_dtxwbr_k$(tmp1_elvis_lhs == null ? Companion_getInstance_0().RESUME_1 : tmp1_elvis_lhs.value_1);
  }
  function resume$default(throwable, $super) {
    throwable = throwable === VOID ? null : throwable;
    var tmp;
    if ($super === VOID) {
      this.resume_xzb95z_k$(throwable);
      tmp = Unit_getInstance();
    } else {
      resume_0(throwable);
      tmp = Unit_getInstance();
    }
    return tmp;
  }
  initMetadataForInterface(Task, 'Task', VOID, VOID, [Slot]);
  initMetadataForClass(Read, 'Read', VOID, VOID, [Task]);
  initMetadataForClass(Write, 'Write', VOID, VOID, [Task]);
  initMetadataForCoroutine($awaitContentCOROUTINE$0, CoroutineImpl);
  initMetadataForCoroutine($flushCOROUTINE$1, CoroutineImpl);
  initMetadataForCoroutine($flushAndCloseCOROUTINE$2, CoroutineImpl);
  function awaitContent$default(min, $completion, $super) {
    min = min === VOID ? 1 : min;
    return $super === VOID ? this.awaitContent_q7m0p7_k$(min, $completion) : $super.awaitContent_q7m0p7_k$.call(this, min, $completion);
  }
  initMetadataForInterface(ByteReadChannel_1, 'ByteReadChannel', VOID, VOID, VOID, [1]);
  initMetadataForClass(ByteChannel, 'ByteChannel', ByteChannel, VOID, [ByteReadChannel_1, BufferedByteWriteChannel], [1, 0]);
  initMetadataForClass(ConcurrentIOException, 'ConcurrentIOException', VOID, IllegalStateException);
  initMetadataForClass(ByteReadChannel$Companion$Empty$1, VOID, VOID, VOID, [ByteReadChannel_1], [1]);
  initMetadataForCompanion(Companion_0);
  initMetadataForCoroutine($readRemainingCOROUTINE$3, CoroutineImpl);
  initMetadataForCoroutine($readPacketCOROUTINE$4, CoroutineImpl);
  initMetadataForCoroutine($discardCOROUTINE$5, CoroutineImpl);
  initMetadataForCoroutine($copyAndCloseCOROUTINE$6, CoroutineImpl);
  initMetadataForCoroutine($readFullyCOROUTINE$7, CoroutineImpl);
  initMetadataForCoroutine($readAvailableCOROUTINE$8, CoroutineImpl);
  initMetadataForCoroutine($readUTF8LineCOROUTINE$9, CoroutineImpl);
  initMetadataForCoroutine($toByteArrayCOROUTINE$10, CoroutineImpl);
  initMetadataForCoroutine($copyToCOROUTINE$11, CoroutineImpl);
  initMetadataForCoroutine($readUTF8LineToCOROUTINE$12, CoroutineImpl);
  initMetadataForCoroutine($readBufferCOROUTINE$13, CoroutineImpl);
  initMetadataForCoroutine($readRemainingCOROUTINE$14, CoroutineImpl);
  initMetadataForCoroutine($flushIfNeededCOROUTINE$15, CoroutineImpl);
  initMetadataForInterface(ChannelJob, 'ChannelJob');
  initMetadataForClass(WriterJob, 'WriterJob', VOID, VOID, [ChannelJob]);
  initMetadataForClass(WriterScope, 'WriterScope', VOID, VOID, [CoroutineScope]);
  initMetadataForClass(NO_CALLBACK$1, VOID, VOID, VOID, [Continuation]);
  initMetadataForFunctionReference(ByteWriteChannel$flushAndClose$ref, VOID, VOID, [0]);
  initMetadataForLambda(writer$slambda, CoroutineImpl, [CoroutineImpl], [1]);
  initMetadataForClass(CloseToken, 'CloseToken');
  initMetadataForClass(SourceByteReadChannel, 'SourceByteReadChannel', VOID, VOID, [ByteReadChannel_1], [1]);
  initMetadataForClass(MalformedInputException, 'MalformedInputException', VOID, IOException);
  initMetadataForClass(TooLongLineException, 'TooLongLineException', VOID, MalformedInputException);
  function close() {
    this.dispose_3nnxhr_k$();
  }
  initMetadataForInterface(ObjectPool, 'ObjectPool', VOID, VOID, [AutoCloseable]);
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
  initMetadataForInterface(Decoder, 'Decoder');
  initMetadataForClass(toKtor$1, VOID, VOID, VOID, [Decoder]);
  initMetadataForClass(TextDecoderFallback, 'TextDecoderFallback', VOID, VOID, [Decoder]);
  initMetadataForInterface(Closeable, 'Closeable');
  initMetadataForClass(ReentrantLock, 'ReentrantLock', ReentrantLock);
  //endregion
  function InternalAPI() {
  }
  protoOf(InternalAPI).equals = function (other) {
    if (!(other instanceof InternalAPI))
      return false;
    other instanceof InternalAPI || THROW_CCE();
    return true;
  };
  protoOf(InternalAPI).hashCode = function () {
    return 0;
  };
  protoOf(InternalAPI).toString = function () {
    return '@io.ktor.utils.io.InternalAPI(' + ')';
  };
  function KtorDsl() {
  }
  protoOf(KtorDsl).equals = function (other) {
    if (!(other instanceof KtorDsl))
      return false;
    other instanceof KtorDsl || THROW_CCE();
    return true;
  };
  protoOf(KtorDsl).hashCode = function () {
    return 0;
  };
  protoOf(KtorDsl).toString = function () {
    return '@io.ktor.utils.io.KtorDsl(' + ')';
  };
  function BufferedByteWriteChannel() {
  }
  function Companion() {
    Companion_instance = this;
    this.CLOSED_1 = new Closed(null);
    var tmp = this;
    // Inline function 'kotlin.Companion.success' call
    Companion_getInstance();
    tmp.RESUME_1 = _Result___init__impl__xyqfz8(Unit_getInstance());
  }
  protoOf(Companion).get_CLOSED_3p2npn_k$ = function () {
    return this.CLOSED_1;
  };
  protoOf(Companion).get_RESUME_dsp8bb_k$ = function () {
    return this.RESUME_1;
  };
  var Companion_instance;
  function Companion_getInstance_0() {
    if (Companion_instance == null)
      new Companion();
    return Companion_instance;
  }
  function Empty() {
    Empty_instance = this;
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
    if (Empty_instance == null)
      new Empty();
    return Empty_instance;
  }
  function Closed(cause) {
    this.cause_1 = cause;
  }
  protoOf(Closed).get_cause_iplhs0_k$ = function () {
    return this.cause_1;
  };
  protoOf(Closed).component1_7eebsc_k$ = function () {
    return this.cause_1;
  };
  protoOf(Closed).copy_ci9aw1_k$ = function (cause) {
    return new Closed(cause);
  };
  protoOf(Closed).copy$default_lgf8ht_k$ = function (cause, $super) {
    cause = cause === VOID ? this.cause_1 : cause;
    return $super === VOID ? this.copy_ci9aw1_k$(cause) : $super.copy_ci9aw1_k$.call(this, cause);
  };
  protoOf(Closed).toString = function () {
    return 'Closed(cause=' + toString(this.cause_1) + ')';
  };
  protoOf(Closed).hashCode = function () {
    return this.cause_1 == null ? 0 : hashCode(this.cause_1);
  };
  protoOf(Closed).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Closed))
      return false;
    var tmp0_other_with_cast = other instanceof Closed ? other : THROW_CCE();
    if (!equals(this.cause_1, tmp0_other_with_cast.cause_1))
      return false;
    return true;
  };
  function Task() {
  }
  function Read(continuation) {
    this.continuation_1 = continuation;
    this.created_1 = null;
    if (get_DEVELOPMENT_MODE()) {
      var tmp = this;
      // Inline function 'kotlin.also' call
      var this_0 = newThrowable('ReadTask 0x' + toString_0(hashCode(this.continuation_1), 16));
      stackTraceToString(this_0);
      tmp.created_1 = this_0;
    }
  }
  protoOf(Read).get_continuation_7yron4_k$ = function () {
    return this.continuation_1;
  };
  protoOf(Read).set_created_hmp26d_k$ = function (_set____db54di) {
    this.created_1 = _set____db54di;
  };
  protoOf(Read).get_created_i9xfr3_k$ = function () {
    return this.created_1;
  };
  protoOf(Read).taskName_6sat74_k$ = function () {
    return 'read';
  };
  function Write(continuation) {
    this.continuation_1 = continuation;
    this.created_1 = null;
    if (get_DEVELOPMENT_MODE()) {
      var tmp = this;
      // Inline function 'kotlin.also' call
      var this_0 = newThrowable('WriteTask 0x' + toString_0(hashCode(this.continuation_1), 16));
      stackTraceToString(this_0);
      tmp.created_1 = this_0;
    }
  }
  protoOf(Write).get_continuation_7yron4_k$ = function () {
    return this.continuation_1;
  };
  protoOf(Write).set_created_hmp26d_k$ = function (_set____db54di) {
    this.created_1 = _set____db54di;
  };
  protoOf(Write).get_created_i9xfr3_k$ = function () {
    return this.created_1;
  };
  protoOf(Write).taskName_6sat74_k$ = function () {
    return 'write';
  };
  function _get_flushBuffer__b837ot($this) {
    return $this.flushBuffer_1;
  }
  function _set_flushBufferSize__cczs68($this, _set____db54di) {
    $this.flushBufferSize_1 = _set____db54di;
  }
  function _get_flushBufferSize__299kno($this) {
    return $this.flushBufferSize_1;
  }
  function _get_flushBufferMutex__1lwq4w($this) {
    return $this.flushBufferMutex_1;
  }
  function _get_suspensionSlot__z54oi8($this) {
    return $this.suspensionSlot_1;
  }
  function _get__readBuffer__8m0p3w($this) {
    return $this._readBuffer_1;
  }
  function _get__writeBuffer__9iscuj($this) {
    return $this._writeBuffer_1;
  }
  function _get__closedCause__8g8v4j($this) {
    return $this._closedCause_1;
  }
  function moveFlushToReadBuffer($this) {
    // Inline function 'io.ktor.utils.io.locks.synchronized' call
    $this.flushBufferMutex_1;
    $this.flushBuffer_1.transferTo_lu4ka2_k$($this._readBuffer_1);
    $this.flushBufferSize_1 = 0;
    // Inline function 'io.ktor.utils.io.ByteChannel.resumeSlot' call
    var current = $this.suspensionSlot_1.get_kotlinx$atomicfu$value_vi2am5_k$();
    var tmp;
    if (current instanceof Write) {
      tmp = $this.suspensionSlot_1.atomicfu$compareAndSet(current, Empty_getInstance());
    } else {
      tmp = false;
    }
    if (tmp) {
      current.resume_2o15jx_k$();
    }
  }
  function closeSlot($this, cause) {
    var closeContinuation = !(cause == null) ? new Closed(cause) : Companion_getInstance_0().CLOSED_1;
    var continuation = $this.suspensionSlot_1.atomicfu$getAndSet(closeContinuation);
    if (!isInterface(continuation, Task))
      return Unit_getInstance();
    continuation.resume_xzb95z_k$(cause);
  }
  function Slot() {
  }
  function $awaitContentCOROUTINE$0(_this__u8e3s4, min, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.min_1 = min;
  }
  protoOf($awaitContentCOROUTINE$0).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(4);
            rethrowCloseCauseIfNeeded_1(this._this__u8e3s4__1);
            if (this._this__u8e3s4__1._readBuffer_1.get_size_woubt6_k$().compareTo_9jj042_k$(toLong(this.min_1)) >= 0)
              return true;
            var tmp_0 = this;
            tmp_0.tmp00__1 = this._this__u8e3s4__1;
            this.this1__1 = this.tmp00__1;
            this.set_state_rjd8d0_k$(1);
            continue $sm;
          case 1:
            if (!(numberToLong(this._this__u8e3s4__1.flushBufferSize_1).plus_r93sks_k$(this._this__u8e3s4__1._readBuffer_1.get_size_woubt6_k$()).compareTo_9jj042_k$(toLong(this.min_1)) < 0 && this._this__u8e3s4__1._closedCause_1.get_kotlinx$atomicfu$value_vi2am5_k$() == null)) {
              this.set_state_rjd8d0_k$(3);
              continue $sm;
            }

            this.set_state_rjd8d0_k$(2);
            var cancellable = new CancellableContinuationImpl(intercepted(this), 1);
            cancellable.initCancellability_shqc60_k$();
            var tmp0 = this.this1__1;
            var tmp1 = new Read(cancellable);
            l$ret$1: do {
              var previous = tmp0.suspensionSlot_1.get_kotlinx$atomicfu$value_vi2am5_k$();
              if (!(previous instanceof Closed)) {
                if (!tmp0.suspensionSlot_1.atomicfu$compareAndSet(previous, tmp1)) {
                  tmp1.resume_2o15jx_k$();
                  break l$ret$1;
                }
              }
              if (previous instanceof Read) {
                previous.resume_xzb95z_k$(new ConcurrentIOException(tmp1.taskName_6sat74_k$(), previous.get_created_i9xfr3_k$()));
              } else {
                if (isInterface(previous, Task)) {
                  previous.resume_2o15jx_k$();
                } else {
                  if (previous instanceof Closed) {
                    tmp1.resume_xzb95z_k$(previous.cause_1);
                    break l$ret$1;
                  } else {
                    if (!equals(previous, Empty_getInstance())) {
                      noWhenBranchMatchedException();
                    }
                  }
                }
              }
              if (!(numberToLong(this._this__u8e3s4__1.flushBufferSize_1).plus_r93sks_k$(this._this__u8e3s4__1._readBuffer_1.get_size_woubt6_k$()).compareTo_9jj042_k$(toLong(this.min_1)) < 0 && this._this__u8e3s4__1._closedCause_1.get_kotlinx$atomicfu$value_vi2am5_k$() == null)) {
                var current = tmp0.suspensionSlot_1.get_kotlinx$atomicfu$value_vi2am5_k$();
                var tmp_1;
                if (current instanceof Read) {
                  tmp_1 = tmp0.suspensionSlot_1.atomicfu$compareAndSet(current, Empty_getInstance());
                } else {
                  tmp_1 = false;
                }
                if (tmp_1) {
                  current.resume_2o15jx_k$();
                }
              }
            }
             while (false);
            suspendResult = returnIfSuspended(cancellable.getResult_fck196_k$(), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            this.set_state_rjd8d0_k$(1);
            continue $sm;
          case 3:
            if (this._this__u8e3s4__1._readBuffer_1.get_size_woubt6_k$().compareTo_9jj042_k$(new Long(1048576, 0)) < 0) {
              moveFlushToReadBuffer(this._this__u8e3s4__1);
            }

            return this._this__u8e3s4__1._readBuffer_1.get_size_woubt6_k$().compareTo_9jj042_k$(toLong(this.min_1)) >= 0;
          case 4:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 4) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  function $flushCOROUTINE$1(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
  }
  protoOf($flushCOROUTINE$1).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(4);
            rethrowCloseCauseIfNeeded_1(this._this__u8e3s4__1);
            this._this__u8e3s4__1.flushWriteBuffer_z39w8l_k$();
            if (this._this__u8e3s4__1.flushBufferSize_1 < 1048576)
              return Unit_getInstance();
            var tmp_0 = this;
            tmp_0.tmp00__1 = this._this__u8e3s4__1;
            this.this1__1 = this.tmp00__1;
            this.set_state_rjd8d0_k$(1);
            continue $sm;
          case 1:
            if (!(this._this__u8e3s4__1.flushBufferSize_1 >= 1048576 && this._this__u8e3s4__1._closedCause_1.get_kotlinx$atomicfu$value_vi2am5_k$() == null)) {
              this.set_state_rjd8d0_k$(3);
              continue $sm;
            }

            this.set_state_rjd8d0_k$(2);
            var cancellable = new CancellableContinuationImpl(intercepted(this), 1);
            cancellable.initCancellability_shqc60_k$();
            var tmp0 = this.this1__1;
            var tmp1 = new Write(cancellable);
            l$ret$1: do {
              var previous = tmp0.suspensionSlot_1.get_kotlinx$atomicfu$value_vi2am5_k$();
              if (!(previous instanceof Closed)) {
                if (!tmp0.suspensionSlot_1.atomicfu$compareAndSet(previous, tmp1)) {
                  tmp1.resume_2o15jx_k$();
                  break l$ret$1;
                }
              }
              if (previous instanceof Write) {
                previous.resume_xzb95z_k$(new ConcurrentIOException(tmp1.taskName_6sat74_k$(), previous.get_created_i9xfr3_k$()));
              } else {
                if (isInterface(previous, Task)) {
                  previous.resume_2o15jx_k$();
                } else {
                  if (previous instanceof Closed) {
                    tmp1.resume_xzb95z_k$(previous.cause_1);
                    break l$ret$1;
                  } else {
                    if (!equals(previous, Empty_getInstance())) {
                      noWhenBranchMatchedException();
                    }
                  }
                }
              }
              if (!(this._this__u8e3s4__1.flushBufferSize_1 >= 1048576 && this._this__u8e3s4__1._closedCause_1.get_kotlinx$atomicfu$value_vi2am5_k$() == null)) {
                var current = tmp0.suspensionSlot_1.get_kotlinx$atomicfu$value_vi2am5_k$();
                var tmp_1;
                if (current instanceof Write) {
                  tmp_1 = tmp0.suspensionSlot_1.atomicfu$compareAndSet(current, Empty_getInstance());
                } else {
                  tmp_1 = false;
                }
                if (tmp_1) {
                  current.resume_2o15jx_k$();
                }
              }
            }
             while (false);
            suspendResult = returnIfSuspended(cancellable.getResult_fck196_k$(), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            this.set_state_rjd8d0_k$(1);
            continue $sm;
          case 3:
            return Unit_getInstance();
          case 4:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 4) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  function $flushAndCloseCOROUTINE$2(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
  }
  protoOf($flushAndCloseCOROUTINE$2).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(4);
            var tmp_0 = this;
            tmp_0.tmp00__1 = this._this__u8e3s4__1;
            this.this1__1 = this.tmp00__1;
            this.set_exceptionState_fex74n_k$(2);
            var tmp_1 = this;
            tmp_1.tmp03__1 = Companion_getInstance();
            var tmp_2 = this;
            tmp_2.tmp14__1 = this.this1__1;
            this.$this$runCatching5__1 = this.tmp14__1;
            this.set_state_rjd8d0_k$(1);
            suspendResult = this.$this$runCatching5__1.flush_4wsz1p_k$(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var tmp_3 = this;
            this.tmp03__1;
            tmp_3.TRY_RESULT2__1 = _Result___init__impl__xyqfz8(Unit_getInstance());
            this.set_exceptionState_fex74n_k$(4);
            this.set_state_rjd8d0_k$(3);
            continue $sm;
          case 2:
            this.set_exceptionState_fex74n_k$(4);
            var tmp_4 = this.get_exception_x0n6w6_k$();
            if (tmp_4 instanceof Error) {
              var e = this.get_exception_x0n6w6_k$();
              var tmp_5 = this;
              Companion_getInstance();
              tmp_5.TRY_RESULT2__1 = _Result___init__impl__xyqfz8(createFailure(e));
              this.set_state_rjd8d0_k$(3);
              continue $sm;
            } else {
              throw this.get_exception_x0n6w6_k$();
            }

          case 3:
            this.set_exceptionState_fex74n_k$(4);
            if (!this._this__u8e3s4__1._closedCause_1.atomicfu$compareAndSet(null, get_CLOSED()))
              return Unit_getInstance();
            closeSlot(this._this__u8e3s4__1, null);
            return Unit_getInstance();
          case 4:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e_0 = $p;
        if (this.get_exceptionState_wflpxn_k$() === 4) {
          throw e_0;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e_0);
        }
      }
     while (true);
  };
  function ByteChannel(autoFlush) {
    autoFlush = autoFlush === VOID ? false : autoFlush;
    this.autoFlush_1 = autoFlush;
    this.flushBuffer_1 = new Buffer();
    this.flushBufferSize_1 = 0;
    this.flushBufferMutex_1 = new Object();
    this.suspensionSlot_1 = atomic$ref$1(Empty_getInstance());
    this._readBuffer_1 = new Buffer();
    this._writeBuffer_1 = new Buffer();
    this._closedCause_1 = atomic$ref$1(null);
  }
  protoOf(ByteChannel).get_autoFlush_zfdl3o_k$ = function () {
    return this.autoFlush_1;
  };
  protoOf(ByteChannel).get_readBuffer_yjmj9b_k$ = function () {
    var tmp0_safe_receiver = this.get_closedCause_o1qcj8_k$();
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      throw tmp0_safe_receiver;
    }
    if (this._readBuffer_1.exhausted_p1jt55_k$()) {
      moveFlushToReadBuffer(this);
    }
    return this._readBuffer_1;
  };
  protoOf(ByteChannel).get_writeBuffer_t7kuc6_k$ = function () {
    var tmp0_safe_receiver = this.get_closedCause_o1qcj8_k$();
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      throw tmp0_safe_receiver;
    }
    if (this.get_isClosedForWrite_seyg5n_k$()) {
      throw IOException_init_$Create$('Channel is closed for write');
    }
    return this._writeBuffer_1;
  };
  protoOf(ByteChannel).get_closedCause_o1qcj8_k$ = function () {
    var tmp0_safe_receiver = this._closedCause_1.get_kotlinx$atomicfu$value_vi2am5_k$();
    return tmp0_safe_receiver == null ? null : tmp0_safe_receiver.get_cause_iplhs0_k$();
  };
  protoOf(ByteChannel).get_isClosedForWrite_seyg5n_k$ = function () {
    return !(this._closedCause_1.get_kotlinx$atomicfu$value_vi2am5_k$() == null);
  };
  protoOf(ByteChannel).get_isClosedForRead_ajcc1s_k$ = function () {
    return !(this.get_closedCause_o1qcj8_k$() == null) || (this.get_isClosedForWrite_seyg5n_k$() && this.flushBufferSize_1 === 0 && this._readBuffer_1.exhausted_p1jt55_k$());
  };
  protoOf(ByteChannel).awaitContent_q7m0p7_k$ = function (min, $completion) {
    var tmp = new $awaitContentCOROUTINE$0(this, min, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(ByteChannel).flush_4wsz1p_k$ = function ($completion) {
    var tmp = new $flushCOROUTINE$1(this, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(ByteChannel).flushWriteBuffer_z39w8l_k$ = function () {
    if (this._writeBuffer_1.exhausted_p1jt55_k$())
      return Unit_getInstance();
    // Inline function 'io.ktor.utils.io.locks.synchronized' call
    this.flushBufferMutex_1;
    var count = this._writeBuffer_1.get_size_woubt6_k$().toInt_1tsl84_k$();
    this.flushBuffer_1.transferFrom_v29myr_k$(this._writeBuffer_1);
    this.flushBufferSize_1 = this.flushBufferSize_1 + count | 0;
    // Inline function 'io.ktor.utils.io.ByteChannel.resumeSlot' call
    var current = this.suspensionSlot_1.get_kotlinx$atomicfu$value_vi2am5_k$();
    var tmp;
    if (current instanceof Read) {
      tmp = this.suspensionSlot_1.atomicfu$compareAndSet(current, Empty_getInstance());
    } else {
      tmp = false;
    }
    if (tmp) {
      current.resume_2o15jx_k$();
    }
  };
  protoOf(ByteChannel).close_yn9xrc_k$ = function () {
    this.flushWriteBuffer_z39w8l_k$();
    if (!this._closedCause_1.atomicfu$compareAndSet(null, get_CLOSED()))
      return Unit_getInstance();
    closeSlot(this, null);
  };
  protoOf(ByteChannel).flushAndClose_3zd2q_k$ = function ($completion) {
    var tmp = new $flushAndCloseCOROUTINE$2(this, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(ByteChannel).cancel_9i2dv0_k$ = function (cause) {
    if (!(this._closedCause_1.get_kotlinx$atomicfu$value_vi2am5_k$() == null))
      return Unit_getInstance();
    var closedToken = new CloseToken(cause);
    this._closedCause_1.atomicfu$compareAndSet(null, closedToken);
    var actualCause = closedToken.get_cause_iplhs0_k$();
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
    this_0.write_ti570x_k$(content, offset, offset + length | 0);
    var source = this_0;
    return ByteReadChannel_0(source);
  }
  function ByteReadChannel_0(source) {
    return new SourceByteReadChannel(source);
  }
  function ByteReadChannel$Companion$Empty$1() {
    this.closedCause_1 = null;
    this.readBuffer_1 = new Buffer();
  }
  protoOf(ByteReadChannel$Companion$Empty$1).get_closedCause_o1qcj8_k$ = function () {
    return this.closedCause_1;
  };
  protoOf(ByteReadChannel$Companion$Empty$1).get_isClosedForRead_ajcc1s_k$ = function () {
    return true;
  };
  protoOf(ByteReadChannel$Companion$Empty$1).get_readBuffer_yjmj9b_k$ = function () {
    return this.readBuffer_1;
  };
  protoOf(ByteReadChannel$Companion$Empty$1).awaitContent_q7m0p7_k$ = function (min, $completion) {
    return false;
  };
  protoOf(ByteReadChannel$Companion$Empty$1).cancel_9i2dv0_k$ = function (cause) {
  };
  function Companion_0() {
    Companion_instance_0 = this;
    var tmp = this;
    tmp.Empty_1 = new ByteReadChannel$Companion$Empty$1();
  }
  protoOf(Companion_0).get_Empty_i9b85g_k$ = function () {
    return this.Empty_1;
  };
  var Companion_instance_0;
  function Companion_getInstance_1() {
    if (Companion_instance_0 == null)
      new Companion_0();
    return Companion_instance_0;
  }
  function ByteReadChannel_1() {
  }
  function cancel_0(_this__u8e3s4) {
    _this__u8e3s4.cancel_9i2dv0_k$(IOException_init_$Create$('Channel was cancelled'));
  }
  function readRemaining(_this__u8e3s4, $completion) {
    var tmp = new $readRemainingCOROUTINE$3(_this__u8e3s4, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  }
  function get_availableForRead(_this__u8e3s4) {
    return _this__u8e3s4.get_readBuffer_yjmj9b_k$().get_buffer_bmaafd_k$().get_size_woubt6_k$().toInt_1tsl84_k$();
  }
  function readPacket(_this__u8e3s4, packet, $completion) {
    var tmp = new $readPacketCOROUTINE$4(_this__u8e3s4, packet, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  }
  function discard(_this__u8e3s4, max, $completion) {
    max = max === VOID ? new Long(-1, 2147483647) : max;
    var tmp = new $discardCOROUTINE$5(_this__u8e3s4, max, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  }
  function copyAndClose(_this__u8e3s4, channel, $completion) {
    var tmp = new $copyAndCloseCOROUTINE$6(_this__u8e3s4, channel, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  }
  function readFully(_this__u8e3s4, out, start, end, $completion) {
    start = start === VOID ? 0 : start;
    end = end === VOID ? out.length : end;
    var tmp = new $readFullyCOROUTINE$7(_this__u8e3s4, out, start, end, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  }
  function readAvailable(_this__u8e3s4, buffer, offset, length, $completion) {
    offset = offset === VOID ? 0 : offset;
    length = length === VOID ? buffer.length - offset | 0 : length;
    var tmp = new $readAvailableCOROUTINE$8(_this__u8e3s4, buffer, offset, length, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  }
  function readUTF8Line(_this__u8e3s4, max, $completion) {
    max = max === VOID ? 2147483647 : max;
    var tmp = new $readUTF8LineCOROUTINE$9(_this__u8e3s4, max, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  }
  function toByteArray(_this__u8e3s4, $completion) {
    var tmp = new $toByteArrayCOROUTINE$10(_this__u8e3s4, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  }
  function copyTo(_this__u8e3s4, channel, limit, $completion) {
    var tmp = new $copyToCOROUTINE$11(_this__u8e3s4, channel, limit, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  }
  function rethrowCloseCauseIfNeeded(_this__u8e3s4) {
    var tmp0_safe_receiver = _this__u8e3s4.get_closedCause_o1qcj8_k$();
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
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  }
  function readBuffer(_this__u8e3s4, $completion) {
    var tmp = new $readBufferCOROUTINE$13(_this__u8e3s4, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  }
  function rethrowCloseCauseIfNeeded_0(_this__u8e3s4) {
    var tmp0_safe_receiver = _this__u8e3s4.get_closedCause_o1qcj8_k$();
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      throw tmp0_safe_receiver;
    }
  }
  function rethrowCloseCauseIfNeeded_1(_this__u8e3s4) {
    var tmp0_safe_receiver = _this__u8e3s4.get_closedCause_o1qcj8_k$();
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      throw tmp0_safe_receiver;
    }
  }
  function readRemaining_0(_this__u8e3s4, max, $completion) {
    var tmp = new $readRemainingCOROUTINE$14(_this__u8e3s4, max, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  }
  function $readRemainingCOROUTINE$3(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
  }
  protoOf($readRemainingCOROUTINE$3).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(4);
            this.result0__1 = BytePacketBuilder();
            this.set_state_rjd8d0_k$(1);
            continue $sm;
          case 1:
            if (!!this._this__u8e3s4__1.get_isClosedForRead_ajcc1s_k$()) {
              this.set_state_rjd8d0_k$(3);
              continue $sm;
            }

            this.result0__1.transferFrom_v29myr_k$(this._this__u8e3s4__1.get_readBuffer_yjmj9b_k$());
            this.set_state_rjd8d0_k$(2);
            suspendResult = this._this__u8e3s4__1.awaitContent$default_rxihsg_k$(VOID, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            this.set_state_rjd8d0_k$(1);
            continue $sm;
          case 3:
            rethrowCloseCauseIfNeeded(this._this__u8e3s4__1);
            return this.result0__1.get_buffer_bmaafd_k$();
          case 4:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 4) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  function $readPacketCOROUTINE$4(_this__u8e3s4, packet, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.packet_1 = packet;
  }
  protoOf($readPacketCOROUTINE$4).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(6);
            this.result0__1 = new Buffer();
            this.set_state_rjd8d0_k$(1);
            continue $sm;
          case 1:
            if (!(this.result0__1.get_size_woubt6_k$().compareTo_9jj042_k$(toLong(this.packet_1)) < 0)) {
              this.set_state_rjd8d0_k$(5);
              continue $sm;
            }

            if (this._this__u8e3s4__1.get_readBuffer_yjmj9b_k$().exhausted_p1jt55_k$()) {
              this.set_state_rjd8d0_k$(2);
              suspendResult = this._this__u8e3s4__1.awaitContent$default_rxihsg_k$(VOID, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.set_state_rjd8d0_k$(3);
              continue $sm;
            }

          case 2:
            this.set_state_rjd8d0_k$(3);
            continue $sm;
          case 3:
            if (this._this__u8e3s4__1.get_isClosedForRead_ajcc1s_k$()) {
              this.set_state_rjd8d0_k$(5);
              continue $sm;
            } else {
              this.set_state_rjd8d0_k$(4);
              continue $sm;
            }

          case 4:
            if (get_remaining(this._this__u8e3s4__1.get_readBuffer_yjmj9b_k$()).compareTo_9jj042_k$(numberToLong(this.packet_1).minus_mfbszm_k$(this.result0__1.get_size_woubt6_k$())) > 0) {
              this._this__u8e3s4__1.get_readBuffer_yjmj9b_k$().readTo_rtq83_k$(this.result0__1, numberToLong(this.packet_1).minus_mfbszm_k$(this.result0__1.get_size_woubt6_k$()));
            } else {
              this._this__u8e3s4__1.get_readBuffer_yjmj9b_k$().transferTo_lu4ka2_k$(this.result0__1);
            }

            this.set_state_rjd8d0_k$(1);
            continue $sm;
          case 5:
            if (this.result0__1.get_size_woubt6_k$().compareTo_9jj042_k$(toLong(this.packet_1)) < 0) {
              throw EOFException_init_$Create$('Not enough data available, required ' + this.packet_1 + ' bytes but only ' + this.result0__1.get_size_woubt6_k$().toString() + ' available');
            }

            return this.result0__1;
          case 6:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 6) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  function $discardCOROUTINE$5(_this__u8e3s4, max, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.max_1 = max;
  }
  protoOf($discardCOROUTINE$5).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(5);
            this.remaining0__1 = this.max_1;
            this.set_state_rjd8d0_k$(1);
            continue $sm;
          case 1:
            if (!(this.remaining0__1.compareTo_9jj042_k$(new Long(0, 0)) > 0 && !this._this__u8e3s4__1.get_isClosedForRead_ajcc1s_k$())) {
              this.set_state_rjd8d0_k$(4);
              continue $sm;
            }

            if (get_availableForRead(this._this__u8e3s4__1) === 0) {
              this.set_state_rjd8d0_k$(2);
              suspendResult = this._this__u8e3s4__1.awaitContent$default_rxihsg_k$(VOID, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.set_state_rjd8d0_k$(3);
              continue $sm;
            }

          case 2:
            this.set_state_rjd8d0_k$(3);
            continue $sm;
          case 3:
            var tmp0 = this.remaining0__1;
            var b = get_remaining(this._this__u8e3s4__1.get_readBuffer_yjmj9b_k$());
            var count = tmp0.compareTo_9jj042_k$(b) <= 0 ? tmp0 : b;
            discard_0(this._this__u8e3s4__1.get_readBuffer_yjmj9b_k$(), count);
            this.remaining0__1 = this.remaining0__1.minus_mfbszm_k$(count);
            this.set_state_rjd8d0_k$(1);
            continue $sm;
          case 4:
            return this.max_1.minus_mfbszm_k$(this.remaining0__1);
          case 5:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 5) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  function $copyAndCloseCOROUTINE$6(_this__u8e3s4, channel, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.channel_1 = channel;
  }
  protoOf($copyAndCloseCOROUTINE$6).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(11);
            this.result0__1 = new Long(0, 0);
            this.set_state_rjd8d0_k$(1);
            continue $sm;
          case 1:
            this.set_exceptionState_fex74n_k$(7);
            this.set_exceptionState_fex74n_k$(6);
            this.set_state_rjd8d0_k$(2);
            continue $sm;
          case 2:
            if (!!this._this__u8e3s4__1.get_isClosedForRead_ajcc1s_k$()) {
              this.set_state_rjd8d0_k$(5);
              continue $sm;
            }

            this.result0__1 = this.result0__1.plus_r93sks_k$(this._this__u8e3s4__1.get_readBuffer_yjmj9b_k$().transferTo_lu4ka2_k$(this.channel_1.get_writeBuffer_t7kuc6_k$()));
            this.set_state_rjd8d0_k$(3);
            suspendResult = this.channel_1.flush_4wsz1p_k$(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 3:
            this.set_state_rjd8d0_k$(4);
            suspendResult = this._this__u8e3s4__1.awaitContent$default_rxihsg_k$(VOID, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 4:
            this.set_state_rjd8d0_k$(2);
            continue $sm;
          case 5:
            var tmp_0 = this;
            var tmp0_safe_receiver = this._this__u8e3s4__1.get_closedCause_o1qcj8_k$();
            var tmp_1;
            if (tmp0_safe_receiver == null) {
              tmp_1 = null;
            } else {
              throw tmp0_safe_receiver;
            }

            tmp_0.tmp$ret$01__1 = tmp_1;
            this.set_exceptionState_fex74n_k$(11);
            this.set_state_rjd8d0_k$(9);
            continue $sm;
          case 6:
            this.set_exceptionState_fex74n_k$(7);
            var tmp_2 = this.get_exception_x0n6w6_k$();
            if (tmp_2 instanceof Error) {
              this.cause2__1 = this.get_exception_x0n6w6_k$();
              var tmp_3 = this;
              this._this__u8e3s4__1.cancel_9i2dv0_k$(this.cause2__1);
              close_0(this.channel_1, this.cause2__1);
              throw this.cause2__1;
            } else {
              throw this.get_exception_x0n6w6_k$();
            }

          case 7:
            this.set_exceptionState_fex74n_k$(11);
            this.t3__1 = this.get_exception_x0n6w6_k$();
            this.set_state_rjd8d0_k$(8);
            suspendResult = this.channel_1.flushAndClose_3zd2q_k$(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 8:
            throw this.t3__1;
          case 9:
            this.tmp4__1 = this.tmp$ret$01__1;
            this.set_exceptionState_fex74n_k$(11);
            this.set_state_rjd8d0_k$(10);
            suspendResult = this.channel_1.flushAndClose_3zd2q_k$(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 10:
            return this.result0__1;
          case 11:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 11) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  function $readFullyCOROUTINE$7(_this__u8e3s4, out, start, end, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.out_1 = out;
    this.start_1 = start;
    this.end_1 = end;
  }
  protoOf($readFullyCOROUTINE$7).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(5);
            if (this._this__u8e3s4__1.get_isClosedForRead_ajcc1s_k$())
              throw EOFException_init_$Create$('Channel is already closed');
            this.offset0__1 = this.start_1;
            this.set_state_rjd8d0_k$(1);
            continue $sm;
          case 1:
            if (!(this.offset0__1 < this.end_1)) {
              this.set_state_rjd8d0_k$(4);
              continue $sm;
            }

            if (this._this__u8e3s4__1.get_readBuffer_yjmj9b_k$().exhausted_p1jt55_k$()) {
              this.set_state_rjd8d0_k$(2);
              suspendResult = this._this__u8e3s4__1.awaitContent$default_rxihsg_k$(VOID, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.set_state_rjd8d0_k$(3);
              continue $sm;
            }

          case 2:
            this.set_state_rjd8d0_k$(3);
            continue $sm;
          case 3:
            if (this._this__u8e3s4__1.get_isClosedForRead_ajcc1s_k$())
              throw EOFException_init_$Create$('Channel is already closed');
            var tmp0 = this.end_1 - this.offset0__1 | 0;
            var b = get_remaining(this._this__u8e3s4__1.get_readBuffer_yjmj9b_k$()).toInt_1tsl84_k$();
            var count = Math.min(tmp0, b);
            readTo(this._this__u8e3s4__1.get_readBuffer_yjmj9b_k$(), this.out_1, this.offset0__1, this.offset0__1 + count | 0);
            this.offset0__1 = this.offset0__1 + count | 0;
            this.set_state_rjd8d0_k$(1);
            continue $sm;
          case 4:
            return Unit_getInstance();
          case 5:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 5) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  function $readAvailableCOROUTINE$8(_this__u8e3s4, buffer, offset, length, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.buffer_1 = buffer;
    this.offset_1 = offset;
    this.length_1 = length;
  }
  protoOf($readAvailableCOROUTINE$8).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(3);
            if (this._this__u8e3s4__1.get_isClosedForRead_ajcc1s_k$())
              return -1;
            if (this._this__u8e3s4__1.get_readBuffer_yjmj9b_k$().exhausted_p1jt55_k$()) {
              this.set_state_rjd8d0_k$(1);
              suspendResult = this._this__u8e3s4__1.awaitContent$default_rxihsg_k$(VOID, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.set_state_rjd8d0_k$(2);
              continue $sm;
            }

          case 1:
            this.set_state_rjd8d0_k$(2);
            continue $sm;
          case 2:
            if (this._this__u8e3s4__1.get_isClosedForRead_ajcc1s_k$())
              return -1;
            return readAvailable_0(this._this__u8e3s4__1.get_readBuffer_yjmj9b_k$(), this.buffer_1, this.offset_1, this.length_1);
          case 3:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 3) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  function $readUTF8LineCOROUTINE$9(_this__u8e3s4, max, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.max_1 = max;
  }
  protoOf($readUTF8LineCOROUTINE$9).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.result0__1 = StringBuilder_init_$Create$();
            this.set_state_rjd8d0_k$(1);
            suspendResult = readUTF8LineTo(this._this__u8e3s4__1, this.result0__1, this.max_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var completed = suspendResult;
            return !completed ? null : this.result0__1.toString();
          case 2:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 2) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  function $toByteArrayCOROUTINE$10(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
  }
  protoOf($toByteArrayCOROUTINE$10).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = readBuffer(this._this__u8e3s4__1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var ARGUMENT = suspendResult;
            return readBytes(ARGUMENT);
          case 2:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 2) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  function $copyToCOROUTINE$11(_this__u8e3s4, channel, limit, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.channel_1 = channel;
    this.limit_1 = limit;
  }
  protoOf($copyToCOROUTINE$11).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(12);
            this.remaining0__1 = this.limit_1;
            this.set_state_rjd8d0_k$(1);
            continue $sm;
          case 1:
            this.set_exceptionState_fex74n_k$(8);
            this.set_exceptionState_fex74n_k$(7);
            this.set_state_rjd8d0_k$(2);
            continue $sm;
          case 2:
            if (!(!this._this__u8e3s4__1.get_isClosedForRead_ajcc1s_k$() && this.remaining0__1.compareTo_9jj042_k$(new Long(0, 0)) > 0)) {
              this.set_state_rjd8d0_k$(6);
              continue $sm;
            }

            if (this._this__u8e3s4__1.get_readBuffer_yjmj9b_k$().exhausted_p1jt55_k$()) {
              this.set_state_rjd8d0_k$(3);
              suspendResult = this._this__u8e3s4__1.awaitContent$default_rxihsg_k$(VOID, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.set_state_rjd8d0_k$(4);
              continue $sm;
            }

          case 3:
            this.set_state_rjd8d0_k$(4);
            continue $sm;
          case 4:
            var tmp_0 = this;
            var tmp0 = this.remaining0__1;
            var b = get_remaining(this._this__u8e3s4__1.get_readBuffer_yjmj9b_k$());
            tmp_0.count2__1 = tmp0.compareTo_9jj042_k$(b) <= 0 ? tmp0 : b;
            this._this__u8e3s4__1.get_readBuffer_yjmj9b_k$().readTo_rtq83_k$(this.channel_1.get_writeBuffer_t7kuc6_k$(), this.count2__1);
            this.remaining0__1 = this.remaining0__1.minus_mfbszm_k$(this.count2__1);
            this.set_state_rjd8d0_k$(5);
            suspendResult = this.channel_1.flush_4wsz1p_k$(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 5:
            this.set_state_rjd8d0_k$(2);
            continue $sm;
          case 6:
            this.tmp$ret$01__1 = Unit_getInstance();
            this.set_exceptionState_fex74n_k$(12);
            this.set_state_rjd8d0_k$(10);
            continue $sm;
          case 7:
            this.set_exceptionState_fex74n_k$(8);
            var tmp_1 = this.get_exception_x0n6w6_k$();
            if (tmp_1 instanceof Error) {
              this.cause3__1 = this.get_exception_x0n6w6_k$();
              var tmp_2 = this;
              this._this__u8e3s4__1.cancel_9i2dv0_k$(this.cause3__1);
              close_0(this.channel_1, this.cause3__1);
              throw this.cause3__1;
            } else {
              throw this.get_exception_x0n6w6_k$();
            }

          case 8:
            this.set_exceptionState_fex74n_k$(12);
            this.t4__1 = this.get_exception_x0n6w6_k$();
            this.set_state_rjd8d0_k$(9);
            suspendResult = this.channel_1.flush_4wsz1p_k$(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 9:
            throw this.t4__1;
          case 10:
            this.set_exceptionState_fex74n_k$(12);
            this.set_state_rjd8d0_k$(11);
            suspendResult = this.channel_1.flush_4wsz1p_k$(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 11:
            return this.limit_1.minus_mfbszm_k$(this.remaining0__1);
          case 12:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 12) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  function $readUTF8LineToCOROUTINE$12(_this__u8e3s4, out, max, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.out_1 = out;
    this.max_1 = max;
  }
  protoOf($readUTF8LineToCOROUTINE$12).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(21);
            if (this._this__u8e3s4__1.get_readBuffer_yjmj9b_k$().exhausted_p1jt55_k$()) {
              this.set_state_rjd8d0_k$(1);
              suspendResult = this._this__u8e3s4__1.awaitContent$default_rxihsg_k$(VOID, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.set_state_rjd8d0_k$(2);
              continue $sm;
            }

          case 1:
            this.set_state_rjd8d0_k$(2);
            continue $sm;
          case 2:
            if (this._this__u8e3s4__1.get_isClosedForRead_ajcc1s_k$())
              return false;
            var tmp_0 = this;
            tmp_0.tmp00__1 = new Buffer();
            this.set_state_rjd8d0_k$(3);
            continue $sm;
          case 3:
            this.this2__1 = this.tmp00__1;
            this.exception3__1 = null;
            this.set_state_rjd8d0_k$(4);
            continue $sm;
          case 4:
            this.set_state_rjd8d0_k$(5);
            continue $sm;
          case 5:
            this.set_state_rjd8d0_k$(6);
            continue $sm;
          case 6:
            this.set_exceptionState_fex74n_k$(18);
            this.set_exceptionState_fex74n_k$(17);
            var tmp_1 = this;
            tmp_1.tmp17__1 = this.this2__1;
            this.lineBuffer8__1 = this.tmp17__1;
            this.set_state_rjd8d0_k$(7);
            continue $sm;
          case 7:
            if (!!this._this__u8e3s4__1.get_isClosedForRead_ajcc1s_k$()) {
              this.set_state_rjd8d0_k$(14);
              continue $sm;
            }

            this.set_state_rjd8d0_k$(8);
            continue $sm;
          case 8:
            if (!!this._this__u8e3s4__1.get_readBuffer_yjmj9b_k$().exhausted_p1jt55_k$()) {
              this.set_state_rjd8d0_k$(12);
              continue $sm;
            }

            this.b9__1 = this._this__u8e3s4__1.get_readBuffer_yjmj9b_k$().readByte_ectjk2_k$();
            if (this.b9__1 === 13) {
              if (this._this__u8e3s4__1.get_readBuffer_yjmj9b_k$().exhausted_p1jt55_k$()) {
                this.set_state_rjd8d0_k$(10);
                suspendResult = this._this__u8e3s4__1.awaitContent$default_rxihsg_k$(VOID, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }
                continue $sm;
              } else {
                this.set_state_rjd8d0_k$(11);
                continue $sm;
              }
            } else {
              if (this.b9__1 === 10) {
                this.out_1.append_jgojdo_k$(readString(this.lineBuffer8__1));
                this.tmp$ret$06__1 = true;
                this.set_exceptionState_fex74n_k$(21);
                this.set_state_rjd8d0_k$(15);
                continue $sm;
              } else {
                this.lineBuffer8__1.writeByte_9ih3z3_k$(this.b9__1);
                this.set_state_rjd8d0_k$(9);
                continue $sm;
              }
            }

          case 9:
            this.set_state_rjd8d0_k$(8);
            continue $sm;
          case 10:
            this.set_state_rjd8d0_k$(11);
            continue $sm;
          case 11:
            if (this._this__u8e3s4__1.get_readBuffer_yjmj9b_k$().get_buffer_bmaafd_k$().get_ugtq3c_k$(new Long(0, 0)) === 10) {
              discard_0(this._this__u8e3s4__1.get_readBuffer_yjmj9b_k$(), new Long(1, 0));
            }

            this.out_1.append_jgojdo_k$(readString(this.lineBuffer8__1));
            this.tmp$ret$06__1 = true;
            this.set_exceptionState_fex74n_k$(21);
            this.set_state_rjd8d0_k$(15);
            continue $sm;
          case 12:
            if (this.lineBuffer8__1.get_size_woubt6_k$().compareTo_9jj042_k$(toLong(this.max_1)) >= 0) {
              throw new TooLongLineException('Line exceeds limit of ' + this.max_1 + ' characters');
            }

            this.set_state_rjd8d0_k$(13);
            suspendResult = this._this__u8e3s4__1.awaitContent$default_rxihsg_k$(VOID, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 13:
            this.set_state_rjd8d0_k$(7);
            continue $sm;
          case 14:
            var tmp_2 = this;
            var this_0 = this.lineBuffer8__1.get_size_woubt6_k$().compareTo_9jj042_k$(new Long(0, 0)) > 0;
            if (this_0) {
              this.out_1.append_jgojdo_k$(readString(this.lineBuffer8__1));
            }

            tmp_2.tmp$ret$06__1 = this_0;
            this.set_exceptionState_fex74n_k$(21);
            this.set_state_rjd8d0_k$(15);
            var tmp_3 = this;
            continue $sm;
          case 15:
            var tmp_4 = this.tmp$ret$06__1;
            this.set_exceptionState_fex74n_k$(21);
            closeFinally(this.this2__1, this.exception3__1);
            return tmp_4;
          case 16:
            this.set_exceptionState_fex74n_k$(21);
            var tmp_5 = this;
            closeFinally(this.this2__1, this.exception3__1);
            tmp_5.tmp$ret$61__1 = Unit_getInstance();
            this.set_state_rjd8d0_k$(20);
            continue $sm;
          case 17:
            this.set_exceptionState_fex74n_k$(18);
            var tmp_6 = this.get_exception_x0n6w6_k$();
            if (tmp_6 instanceof Error) {
              var e = this.get_exception_x0n6w6_k$();
              var tmp_7 = this;
              this.exception3__1 = e;
              throw e;
            } else {
              throw this.get_exception_x0n6w6_k$();
            }

          case 18:
            this.set_exceptionState_fex74n_k$(21);
            var t = this.get_exception_x0n6w6_k$();
            closeFinally(this.this2__1, this.exception3__1);
            throw t;
          case 19:
            this.set_exceptionState_fex74n_k$(21);
            closeFinally(this.this2__1, this.exception3__1);
            if (false) {
              this.set_state_rjd8d0_k$(3);
              continue $sm;
            }

            this.set_state_rjd8d0_k$(20);
            continue $sm;
          case 20:
            return Unit_getInstance();
          case 21:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e_0 = $p;
        if (this.get_exceptionState_wflpxn_k$() === 21) {
          throw e_0;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e_0);
        }
      }
     while (true);
  };
  function $readBufferCOROUTINE$13(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
  }
  protoOf($readBufferCOROUTINE$13).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(4);
            this.result0__1 = new Buffer();
            this.set_state_rjd8d0_k$(1);
            continue $sm;
          case 1:
            if (!!this._this__u8e3s4__1.get_isClosedForRead_ajcc1s_k$()) {
              this.set_state_rjd8d0_k$(3);
              continue $sm;
            }

            this.result0__1.transferFrom_v29myr_k$(this._this__u8e3s4__1.get_readBuffer_yjmj9b_k$());
            this.set_state_rjd8d0_k$(2);
            suspendResult = this._this__u8e3s4__1.awaitContent$default_rxihsg_k$(VOID, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            this.set_state_rjd8d0_k$(1);
            continue $sm;
          case 3:
            var tmp0_safe_receiver = this._this__u8e3s4__1.get_closedCause_o1qcj8_k$();
            if (tmp0_safe_receiver == null)
              null;
            else {
              throw tmp0_safe_receiver;
            }

            return this.result0__1;
          case 4:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 4) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  function $readRemainingCOROUTINE$14(_this__u8e3s4, max, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.max_1 = max;
  }
  protoOf($readRemainingCOROUTINE$14).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(4);
            this.result0__1 = BytePacketBuilder();
            this.remaining1__1 = this.max_1;
            this.set_state_rjd8d0_k$(1);
            continue $sm;
          case 1:
            if (!(!this._this__u8e3s4__1.get_isClosedForRead_ajcc1s_k$() && this.remaining1__1.compareTo_9jj042_k$(new Long(0, 0)) > 0)) {
              this.set_state_rjd8d0_k$(3);
              continue $sm;
            }

            if (this.remaining1__1.compareTo_9jj042_k$(get_remaining(this._this__u8e3s4__1.get_readBuffer_yjmj9b_k$())) >= 0) {
              this.remaining1__1 = this.remaining1__1.minus_mfbszm_k$(get_remaining(this._this__u8e3s4__1.get_readBuffer_yjmj9b_k$()));
              this._this__u8e3s4__1.get_readBuffer_yjmj9b_k$().transferTo_lu4ka2_k$(this.result0__1);
            } else {
              this._this__u8e3s4__1.get_readBuffer_yjmj9b_k$().readTo_rtq83_k$(this.result0__1, this.remaining1__1);
              this.remaining1__1 = new Long(0, 0);
            }

            this.set_state_rjd8d0_k$(2);
            suspendResult = this._this__u8e3s4__1.awaitContent$default_rxihsg_k$(VOID, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            this.set_state_rjd8d0_k$(1);
            continue $sm;
          case 3:
            return this.result0__1.get_buffer_bmaafd_k$();
          case 4:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 4) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  function ByteWriteChannel() {
  }
  function flushIfNeeded(_this__u8e3s4, $completion) {
    var tmp = new $flushIfNeededCOROUTINE$15(_this__u8e3s4, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  }
  function $flushIfNeededCOROUTINE$15(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
  }
  protoOf($flushIfNeededCOROUTINE$15).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(3);
            rethrowCloseCauseIfNeeded_0(this._this__u8e3s4__1);
            var tmp_0;
            var tmp_1 = this._this__u8e3s4__1;
            var tmp0_safe_receiver = tmp_1 instanceof ByteChannel ? tmp_1 : null;
            if ((tmp0_safe_receiver == null ? null : tmp0_safe_receiver.get_autoFlush_zfdl3o_k$()) === true) {
              tmp_0 = true;
            } else {
              tmp_0 = get_size(this._this__u8e3s4__1.get_writeBuffer_t7kuc6_k$()) >= 1048576;
            }

            if (tmp_0) {
              this.set_state_rjd8d0_k$(1);
              suspendResult = this._this__u8e3s4__1.flush_4wsz1p_k$(this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.set_state_rjd8d0_k$(2);
              continue $sm;
            }

          case 1:
            this.set_state_rjd8d0_k$(2);
            continue $sm;
          case 2:
            return Unit_getInstance();
          case 3:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 3) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
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
    this.channel_1 = channel;
    this.job_1 = job;
  }
  protoOf(WriterJob).get_channel_dhi7tm_k$ = function () {
    return this.channel_1;
  };
  protoOf(WriterJob).get_job_18j2r0_k$ = function () {
    return this.job_1;
  };
  function writer(_this__u8e3s4, coroutineContext, autoFlush, block) {
    coroutineContext = coroutineContext === VOID ? EmptyCoroutineContext_getInstance() : coroutineContext;
    autoFlush = autoFlush === VOID ? false : autoFlush;
    _init_properties_ByteWriteChannelOperations_kt__i7slrs();
    return writer_0(_this__u8e3s4, coroutineContext, new ByteChannel(), block);
  }
  function WriterScope(channel, coroutineContext) {
    this.channel_1 = channel;
    this.coroutineContext_1 = coroutineContext;
  }
  protoOf(WriterScope).get_channel_dhi7tm_k$ = function () {
    return this.channel_1;
  };
  protoOf(WriterScope).get_coroutineContext_115oqo_k$ = function () {
    return this.coroutineContext_1;
  };
  function writeFully(_this__u8e3s4, value, startIndex, endIndex, $completion) {
    startIndex = startIndex === VOID ? 0 : startIndex;
    endIndex = endIndex === VOID ? value.length : endIndex;
    _this__u8e3s4.get_writeBuffer_t7kuc6_k$().write_ti570x_k$(value, startIndex, endIndex);
    return flushIfNeeded(_this__u8e3s4, $completion);
  }
  function writePacket(_this__u8e3s4, copy, $completion) {
    _this__u8e3s4.get_writeBuffer_t7kuc6_k$().transferFrom_v29myr_k$(copy);
    return flushIfNeeded(_this__u8e3s4, $completion);
  }
  function get_isCompleted(_this__u8e3s4) {
    _init_properties_ByteWriteChannelOperations_kt__i7slrs();
    return _this__u8e3s4.get_job_18j2r0_k$().get_isCompleted_a6j6c8_k$();
  }
  function close_0(_this__u8e3s4, cause) {
    _init_properties_ByteWriteChannelOperations_kt__i7slrs();
    if (cause == null) {
      fireAndForget(ByteWriteChannel$flushAndClose$ref_0(_this__u8e3s4));
    } else {
      _this__u8e3s4.cancel_9i2dv0_k$(cause);
    }
  }
  function invokeOnCompletion(_this__u8e3s4, block) {
    _init_properties_ByteWriteChannelOperations_kt__i7slrs();
    var tmp = _this__u8e3s4.get_job_18j2r0_k$();
    tmp.invokeOnCompletion_n6cffu_k$(invokeOnCompletion$lambda(block));
  }
  function ChannelJob() {
  }
  function writer_0(_this__u8e3s4, coroutineContext, channel, block) {
    coroutineContext = coroutineContext === VOID ? EmptyCoroutineContext_getInstance() : coroutineContext;
    _init_properties_ByteWriteChannelOperations_kt__i7slrs();
    // Inline function 'kotlin.apply' call
    var this_0 = launch(_this__u8e3s4, coroutineContext, VOID, writer$slambda_0(block, channel, null));
    this_0.invokeOnCompletion_n6cffu_k$(writer$lambda(channel));
    var job = this_0;
    return new WriterJob(channel, job);
  }
  function fireAndForget(_this__u8e3s4) {
    _init_properties_ByteWriteChannelOperations_kt__i7slrs();
    startCoroutineCancellable(_this__u8e3s4, get_NO_CALLBACK());
  }
  function NO_CALLBACK$1() {
    this.context_1 = EmptyCoroutineContext_getInstance();
  }
  protoOf(NO_CALLBACK$1).get_context_h02k06_k$ = function () {
    return this.context_1;
  };
  protoOf(NO_CALLBACK$1).resumeWith_b9cu3x_k$ = function (result) {
    return Unit_getInstance();
  };
  protoOf(NO_CALLBACK$1).resumeWith_dtxwbr_k$ = function (result) {
    return this.resumeWith_b9cu3x_k$(result);
  };
  function ByteWriteChannel$flushAndClose$ref($boundThis) {
    this.$boundThis_1 = $boundThis;
  }
  protoOf(ByteWriteChannel$flushAndClose$ref).invoke_h7udsx_k$ = function ($completion) {
    return this.$boundThis_1.flushAndClose_3zd2q_k$($completion);
  };
  protoOf(ByteWriteChannel$flushAndClose$ref).invoke_ib42db_k$ = function ($completion) {
    return this.invoke_h7udsx_k$($completion);
  };
  protoOf(ByteWriteChannel$flushAndClose$ref).get_name_woqyms_k$ = function () {
    return 'flushAndClose';
  };
  function ByteWriteChannel$flushAndClose$ref_0($boundThis) {
    var i = new ByteWriteChannel$flushAndClose$ref($boundThis);
    var l = function ($completion) {
      return i.invoke_h7udsx_k$($completion);
    };
    l.callableName = 'flushAndClose';
    l.$arity = 0;
    return l;
  }
  function invokeOnCompletion$lambda($block) {
    return function (it) {
      $block();
      return Unit_getInstance();
    };
  }
  function writer$slambda($block, $channel, resultContinuation) {
    this.$block_1 = $block;
    this.$channel_1 = $channel;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(writer$slambda).invoke_d9fzmj_k$ = function ($this$launch, $completion) {
    var tmp = this.create_rcuf4x_k$($this$launch, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(writer$slambda).invoke_qns8j1_k$ = function (p1, $completion) {
    return this.invoke_d9fzmj_k$((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(writer$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(14);
            this.nested0__1 = Job(get_job(this.$this$launch_1.get_coroutineContext_115oqo_k$()));
            this.set_state_rjd8d0_k$(1);
            continue $sm;
          case 1:
            this.set_exceptionState_fex74n_k$(4);
            this.set_exceptionState_fex74n_k$(3);
            this.set_state_rjd8d0_k$(2);
            suspendResult = this.$block_1(new WriterScope(this.$channel_1, this.$this$launch_1.get_coroutineContext_115oqo_k$().plus_s13ygv_k$(this.nested0__1)), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            this.nested0__1.complete_9ww6vb_k$();
            var tmp_0 = this;
            var tmp_1;
            if (get_job(this.$this$launch_1.get_coroutineContext_115oqo_k$()).get_isCancelled_trk8pu_k$()) {
              this.$channel_1.cancel_9i2dv0_k$(get_job(this.$this$launch_1.get_coroutineContext_115oqo_k$()).getCancellationException_8i1q6u_k$());
              tmp_1 = Unit_getInstance();
            }

            tmp_0.tmp$ret$01__1 = tmp_1;
            this.set_exceptionState_fex74n_k$(14);
            this.set_state_rjd8d0_k$(9);
            continue $sm;
          case 3:
            this.set_exceptionState_fex74n_k$(4);
            var tmp_2 = this.get_exception_x0n6w6_k$();
            if (tmp_2 instanceof Error) {
              this.cause2__1 = this.get_exception_x0n6w6_k$();
              var tmp_3 = this;
              cancel(this.nested0__1, 'Exception thrown while writing to channel', this.cause2__1);
              this.$channel_1.cancel_9i2dv0_k$(this.cause2__1);
              tmp_3.tmp$ret$01__1 = Unit_getInstance();
              this.set_exceptionState_fex74n_k$(14);
              this.set_state_rjd8d0_k$(9);
              continue $sm;
            } else {
              throw this.get_exception_x0n6w6_k$();
            }

          case 4:
            this.set_exceptionState_fex74n_k$(14);
            this.t3__1 = this.get_exception_x0n6w6_k$();
            this.set_state_rjd8d0_k$(5);
            suspendResult = this.nested0__1.join_o20dar_k$(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 5:
            var tmp_4 = this;
            tmp_4.tmp04__1 = this.$this$launch_1;
            this.this5__1 = this.tmp04__1;
            this.set_exceptionState_fex74n_k$(7);
            var tmp_5 = this;
            tmp_5.tmp07__1 = Companion_getInstance();
            var tmp_6 = this;
            tmp_6.tmp18__1 = this.this5__1;
            this.$this$runCatching9__1 = this.tmp18__1;
            this.set_state_rjd8d0_k$(6);
            suspendResult = this.$channel_1.flushAndClose_3zd2q_k$(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 6:
            this.tmp110__1 = Unit_getInstance();
            var tmp_7 = this;
            this.tmp07__1;
            var value = this.tmp110__1;
            tmp_7.TRY_RESULT6__1 = _Result___init__impl__xyqfz8(value);
            this.set_exceptionState_fex74n_k$(14);
            this.set_state_rjd8d0_k$(8);
            continue $sm;
          case 7:
            this.set_exceptionState_fex74n_k$(14);
            var tmp_8 = this.get_exception_x0n6w6_k$();
            if (tmp_8 instanceof Error) {
              this.e11__1 = this.get_exception_x0n6w6_k$();
              var tmp_9 = this;
              Companion_getInstance();
              var exception = this.e11__1;
              tmp_9.TRY_RESULT6__1 = _Result___init__impl__xyqfz8(createFailure(exception));
              this.set_state_rjd8d0_k$(8);
              continue $sm;
            } else {
              throw this.get_exception_x0n6w6_k$();
            }

          case 8:
            this.set_exceptionState_fex74n_k$(14);
            throw this.t3__1;
          case 9:
            this.set_exceptionState_fex74n_k$(14);
            this.set_state_rjd8d0_k$(10);
            suspendResult = this.nested0__1.join_o20dar_k$(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 10:
            var tmp_10 = this;
            tmp_10.tmp012__1 = this.$this$launch_1;
            this.this13__1 = this.tmp012__1;
            this.set_exceptionState_fex74n_k$(12);
            var tmp_11 = this;
            tmp_11.tmp015__1 = Companion_getInstance();
            var tmp_12 = this;
            tmp_12.tmp116__1 = this.this13__1;
            this.$this$runCatching17__1 = this.tmp116__1;
            this.set_state_rjd8d0_k$(11);
            suspendResult = this.$channel_1.flushAndClose_3zd2q_k$(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 11:
            var tmp_13 = this;
            this.tmp015__1;
            tmp_13.TRY_RESULT14__1 = _Result___init__impl__xyqfz8(Unit_getInstance());
            this.set_exceptionState_fex74n_k$(14);
            this.set_state_rjd8d0_k$(13);
            continue $sm;
          case 12:
            this.set_exceptionState_fex74n_k$(14);
            var tmp_14 = this.get_exception_x0n6w6_k$();
            if (tmp_14 instanceof Error) {
              var e = this.get_exception_x0n6w6_k$();
              var tmp_15 = this;
              Companion_getInstance();
              tmp_15.TRY_RESULT14__1 = _Result___init__impl__xyqfz8(createFailure(e));
              this.set_state_rjd8d0_k$(13);
              continue $sm;
            } else {
              throw this.get_exception_x0n6w6_k$();
            }

          case 13:
            this.set_exceptionState_fex74n_k$(14);
            return Unit_getInstance();
          case 14:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e_0 = $p;
        if (this.get_exceptionState_wflpxn_k$() === 14) {
          throw e_0;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e_0);
        }
      }
     while (true);
  };
  protoOf(writer$slambda).create_rcuf4x_k$ = function ($this$launch, completion) {
    var i = new writer$slambda(this.$block_1, this.$channel_1, completion);
    i.$this$launch_1 = $this$launch;
    return i;
  };
  protoOf(writer$slambda).create_wyq9v6_k$ = function (value, completion) {
    return this.create_rcuf4x_k$((!(value == null) ? isInterface(value, CoroutineScope) : false) ? value : THROW_CCE(), completion);
  };
  function writer$slambda_0($block, $channel, resultContinuation) {
    var i = new writer$slambda($block, $channel, resultContinuation);
    var l = function ($this$launch, $completion) {
      return i.invoke_d9fzmj_k$($this$launch, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function writer$lambda($channel) {
    return function (it) {
      var tmp;
      if (!(it == null) && !$channel.get_isClosedForWrite_seyg5n_k$()) {
        $channel.cancel_9i2dv0_k$(it);
        tmp = Unit_getInstance();
      }
      return Unit_getInstance();
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
  function _get_closedException__827ui6($this) {
    return $this.closedException_1;
  }
  function CloseToken(origin) {
    var tmp = this;
    var tmp_0;
    if (origin == null) {
      tmp_0 = null;
    } else {
      if (origin instanceof CancellationException) {
        var tmp_1;
        if (isInterface(origin, CopyableThrowable)) {
          tmp_1 = origin.createCopy_mmw9ld_k$();
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
          tmp_0 = origin.createCopy_mmw9ld_k$();
        } else {
          var tmp1_elvis_lhs = origin.message;
          tmp_0 = IOException_init_$Create$_0(tmp1_elvis_lhs == null ? 'Channel was closed' : tmp1_elvis_lhs, origin);
        }
      }
    }
    tmp.closedException_1 = tmp_0;
  }
  protoOf(CloseToken).get_cause_iplhs0_k$ = function () {
    var tmp;
    if (this.closedException_1 == null) {
      tmp = null;
    } else {
      var tmp_0 = this.closedException_1;
      if (tmp_0 instanceof IOException) {
        var tmp_1;
        var tmp_2 = this.closedException_1;
        if (isInterface(tmp_2, CopyableThrowable)) {
          tmp_1 = this.closedException_1.createCopy_mmw9ld_k$();
        } else {
          tmp_1 = IOException_init_$Create$_0(this.closedException_1.message, this.closedException_1);
        }
        tmp = tmp_1;
      } else {
        var tmp_3 = this.closedException_1;
        if (!(tmp_3 == null) ? isInterface(tmp_3, CopyableThrowable) : false) {
          var tmp0_elvis_lhs = this.closedException_1.createCopy_mmw9ld_k$();
          tmp = tmp0_elvis_lhs == null ? CancellationException_init_$Create$(this.closedException_1.message, this.closedException_1) : tmp0_elvis_lhs;
        } else {
          tmp = CancellationException_init_$Create$(this.closedException_1.message, this.closedException_1);
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
  function _get_source__4cuw5s($this) {
    return $this.source_1;
  }
  function _set_closed__kdb0et($this, _set____db54di) {
    $this.closed_1 = _set____db54di;
  }
  function _get_closed__iwkfs1($this) {
    return $this.closed_1;
  }
  function SourceByteReadChannel(source) {
    this.source_1 = source;
    this.closed_1 = null;
  }
  protoOf(SourceByteReadChannel).get_closedCause_o1qcj8_k$ = function () {
    var tmp0_safe_receiver = this.closed_1;
    return tmp0_safe_receiver == null ? null : tmp0_safe_receiver.get_cause_iplhs0_k$();
  };
  protoOf(SourceByteReadChannel).get_isClosedForRead_ajcc1s_k$ = function () {
    return this.source_1.exhausted_p1jt55_k$();
  };
  protoOf(SourceByteReadChannel).get_readBuffer_yjmj9b_k$ = function () {
    var tmp0_safe_receiver = this.get_closedCause_o1qcj8_k$();
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      throw tmp0_safe_receiver;
    }
    return this.source_1;
  };
  protoOf(SourceByteReadChannel).awaitContent_q7m0p7_k$ = function (min, $completion) {
    var tmp0_safe_receiver = this.get_closedCause_o1qcj8_k$();
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      throw tmp0_safe_receiver;
    }
    return get_remaining(this.source_1).compareTo_9jj042_k$(toLong(min)) >= 0;
  };
  protoOf(SourceByteReadChannel).cancel_9i2dv0_k$ = function (cause) {
    if (!(this.closed_1 == null))
      return Unit_getInstance();
    this.source_1.close_yn9xrc_k$();
    var tmp = this;
    var tmp1_elvis_lhs = cause == null ? null : cause.message;
    tmp.closed_1 = new CloseToken(IOException_init_$Create$_0(tmp1_elvis_lhs == null ? 'Channel was cancelled' : tmp1_elvis_lhs, cause));
  };
  function decode(_this__u8e3s4, input, max) {
    max = max === VOID ? 2147483647 : max;
    var tmp0 = toLong(max);
    // Inline function 'kotlin.comparisons.minOf' call
    var b = input.get_buffer_bmaafd_k$().get_size_woubt6_k$();
    // Inline function 'kotlin.text.buildString' call
    var capacity = (tmp0.compareTo_9jj042_k$(b) <= 0 ? tmp0 : b).toInt_1tsl84_k$();
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
      return Unit_getInstance();
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
    return !_this__u8e3s4.exhausted_p1jt55_k$();
  }
  function readBytes(_this__u8e3s4, count) {
    count = count === VOID ? _this__u8e3s4.get_size_woubt6_k$().toInt_1tsl84_k$() : count;
    return readByteArray(_this__u8e3s4, count);
  }
  function buildPacket(block) {
    var builder = new Buffer();
    block(builder);
    return builder;
  }
  function BytePacketBuilder() {
    return new Buffer();
  }
  function writePacket_0(_this__u8e3s4, packet) {
    _this__u8e3s4.transferFrom_v29myr_k$(packet);
  }
  function build(_this__u8e3s4) {
    return _this__u8e3s4.get_buffer_bmaafd_k$();
  }
  function get_size(_this__u8e3s4) {
    return _this__u8e3s4.get_buffer_bmaafd_k$().get_size_woubt6_k$().toInt_1tsl84_k$();
  }
  function writeFully_0(_this__u8e3s4, buffer, offset, length) {
    offset = offset === VOID ? 0 : offset;
    length = length === VOID ? buffer.length - offset | 0 : length;
    _this__u8e3s4.write_ti570x_k$(buffer, offset, offset + length | 0);
  }
  function get_ByteReadPacketEmpty() {
    _init_properties_ByteReadPacket_kt__28475y();
    return ByteReadPacketEmpty;
  }
  var ByteReadPacketEmpty;
  function get_remaining(_this__u8e3s4) {
    _init_properties_ByteReadPacket_kt__28475y();
    return _this__u8e3s4.get_buffer_bmaafd_k$().get_size_woubt6_k$();
  }
  function discard_0(_this__u8e3s4, count) {
    count = count === VOID ? new Long(-1, 2147483647) : count;
    _init_properties_ByteReadPacket_kt__28475y();
    _this__u8e3s4.request_mpoy7z_k$(count);
    // Inline function 'kotlin.comparisons.minOf' call
    var b = get_remaining(_this__u8e3s4);
    var countToDiscard = count.compareTo_9jj042_k$(b) <= 0 ? count : b;
    _this__u8e3s4.get_buffer_bmaafd_k$().skip_bgd4sf_k$(countToDiscard);
    return countToDiscard;
  }
  function copy(_this__u8e3s4) {
    _init_properties_ByteReadPacket_kt__28475y();
    return _this__u8e3s4.get_buffer_bmaafd_k$().copy_1tks5_k$();
  }
  function takeWhile(_this__u8e3s4, block) {
    _init_properties_ByteReadPacket_kt__28475y();
    while (!_this__u8e3s4.exhausted_p1jt55_k$() && block(_this__u8e3s4.get_buffer_bmaafd_k$())) {
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
    var result = _this__u8e3s4.readAtMostTo_kub29z_k$(buffer, offset, offset + length | 0);
    return result === -1 ? 0 : result;
  }
  function readText_0(_this__u8e3s4, charset, max) {
    charset = charset === VOID ? Charsets_getInstance().get_UTF_8_ihn39z_k$() : charset;
    max = max === VOID ? 2147483647 : max;
    if (charset.equals(Charsets_getInstance().get_UTF_8_ihn39z_k$())) {
      if (max === 2147483647)
        return readString_0(_this__u8e3s4);
      var tmp0 = _this__u8e3s4.get_buffer_bmaafd_k$().get_size_woubt6_k$();
      // Inline function 'kotlin.math.min' call
      var b = toLong(max);
      var count = tmp0.compareTo_9jj042_k$(b) <= 0 ? tmp0 : b;
      return readString_1(_this__u8e3s4, count);
    }
    return decode(charset.newDecoder_zcettw_k$(), _this__u8e3s4, max);
  }
  function toByteArray_0(_this__u8e3s4, charset) {
    charset = charset === VOID ? Charsets_getInstance().get_UTF_8_ihn39z_k$() : charset;
    if (charset.equals(Charsets_getInstance().get_UTF_8_ihn39z_k$()))
      return encodeToByteArray(_this__u8e3s4, VOID, VOID, true);
    return encodeToByteArray_0(charset.newEncoder_gqwcdg_k$(), _this__u8e3s4, 0, _this__u8e3s4.length);
  }
  function writeText(_this__u8e3s4, text, fromIndex, toIndex, charset) {
    fromIndex = fromIndex === VOID ? 0 : fromIndex;
    toIndex = toIndex === VOID ? charSequenceLength(text) : toIndex;
    charset = charset === VOID ? Charsets_getInstance().get_UTF_8_ihn39z_k$() : charset;
    if (charset === Charsets_getInstance().get_UTF_8_ihn39z_k$()) {
      return writeString(_this__u8e3s4, toString_1(text), fromIndex, toIndex);
    }
    encodeToImpl(charset.newEncoder_gqwcdg_k$(), _this__u8e3s4, text, fromIndex, toIndex);
  }
  function get_ByteArrayPool() {
    _init_properties_ByteArrayPool_kt__kfi3uj();
    return ByteArrayPool;
  }
  var ByteArrayPool;
  function ByteArrayPool$1() {
    DefaultPool.call(this, 128);
  }
  protoOf(ByteArrayPool$1).produceInstance_xswihh_k$ = function () {
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
  function useInstance(_this__u8e3s4, block) {
    var instance = _this__u8e3s4.borrow_mvkpor_k$();
    try {
      return block(instance);
    }finally {
      _this__u8e3s4.recycle_d2xv5h_k$(instance);
    }
  }
  function Companion_1() {
    Companion_instance_1 = this;
  }
  protoOf(Companion_1).forName_etcah2_k$ = function (name) {
    switch (name) {
      case 'UTF-8':
      case 'utf-8':
      case 'UTF8':
      case 'utf8':
        return Charsets_getInstance().UTF_8__1;
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
      return Charsets_getInstance().ISO_8859_1__1;
    }
    throw IllegalArgumentException_init_$Create$('Charset ' + name + ' is not supported');
  };
  protoOf(Companion_1).isSupported_c9nas6_k$ = function (charset) {
    var tmp;
    switch (charset) {
      case 'UTF-8':
      case 'utf-8':
      case 'UTF8':
      case 'utf8':
        tmp = true;
        break;
      default:
        var tmp_0;
        var tmp_1;
        switch (charset) {
          case 'ISO-8859-1':
          case 'iso-8859-1':
            tmp_1 = true;
            break;
          default:
            // Inline function 'kotlin.let' call

            var it = replace(charset, _Char___init__impl__6a9atx(95), _Char___init__impl__6a9atx(45));
            var tmp_2;
            if (it === 'iso-8859-1') {
              tmp_2 = true;
            } else {
              // Inline function 'kotlin.text.lowercase' call
              // Inline function 'kotlin.js.asDynamic' call
              tmp_2 = it.toLowerCase() === 'iso-8859-1';
            }

            tmp_1 = tmp_2;
            break;
        }

        if (tmp_1) {
          tmp_0 = true;
        } else {
          tmp_0 = charset === 'latin1';
        }

        if (tmp_0) {
          tmp = true;
        } else {
          tmp = false;
        }

        break;
    }
    return tmp;
  };
  var Companion_instance_1;
  function Companion_getInstance_2() {
    if (Companion_instance_1 == null)
      new Companion_1();
    return Companion_instance_1;
  }
  function Charset(_name) {
    Companion_getInstance_2();
    this._name_1 = _name;
  }
  protoOf(Charset).get__name_srescf_k$ = function () {
    return this._name_1;
  };
  protoOf(Charset).equals = function (other) {
    if (this === other)
      return true;
    if (other == null || !(this.constructor == other.constructor))
      return false;
    if (!(other instanceof Charset))
      THROW_CCE();
    return this._name_1 === other._name_1;
  };
  protoOf(Charset).hashCode = function () {
    return getStringHashCode(this._name_1);
  };
  protoOf(Charset).toString = function () {
    return this._name_1;
  };
  function get_name(_this__u8e3s4) {
    return _this__u8e3s4._name_1;
  }
  function Charsets() {
    Charsets_instance = this;
    this.UTF_8__1 = new CharsetImpl('UTF-8');
    this.ISO_8859_1__1 = new CharsetImpl('ISO-8859-1');
  }
  protoOf(Charsets).get_UTF_8_ihn39z_k$ = function () {
    return this.UTF_8__1;
  };
  protoOf(Charsets).get_ISO_8859_1_y3qebr_k$ = function () {
    return this.ISO_8859_1__1;
  };
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
    this._charset_1 = _charset;
  }
  protoOf(CharsetDecoder).get__charset_c5gayc_k$ = function () {
    return this._charset_1;
  };
  function CharsetEncoder(_charset) {
    this._charset_1 = _charset;
  }
  protoOf(CharsetEncoder).get__charset_c5gayc_k$ = function () {
    return this._charset_1;
  };
  function CharsetImpl(name) {
    Charset.call(this, name);
  }
  protoOf(CharsetImpl).newEncoder_gqwcdg_k$ = function () {
    return new CharsetEncoderImpl(this);
  };
  protoOf(CharsetImpl).newDecoder_zcettw_k$ = function () {
    return new CharsetDecoderImpl(this);
  };
  function _get_charset__c43qgr($this) {
    return $this.charset_1;
  }
  function component1($this) {
    return $this.charset_1;
  }
  function CharsetEncoderImpl(charset) {
    CharsetEncoder.call(this, charset);
    this.charset_1 = charset;
  }
  protoOf(CharsetEncoderImpl).copy_2crzso_k$ = function (charset) {
    return new CharsetEncoderImpl(charset);
  };
  protoOf(CharsetEncoderImpl).copy$default_73mtqm_k$ = function (charset, $super) {
    charset = charset === VOID ? this.charset_1 : charset;
    return $super === VOID ? this.copy_2crzso_k$(charset) : $super.copy_2crzso_k$.call(this, charset);
  };
  protoOf(CharsetEncoderImpl).toString = function () {
    return 'CharsetEncoderImpl(charset=' + this.charset_1.toString() + ')';
  };
  protoOf(CharsetEncoderImpl).hashCode = function () {
    return this.charset_1.hashCode();
  };
  protoOf(CharsetEncoderImpl).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof CharsetEncoderImpl))
      return false;
    var tmp0_other_with_cast = other instanceof CharsetEncoderImpl ? other : THROW_CCE();
    if (!this.charset_1.equals(tmp0_other_with_cast.charset_1))
      return false;
    return true;
  };
  function _get_charset__c43qgr_0($this) {
    return $this.charset_1;
  }
  function component1_0($this) {
    return $this.charset_1;
  }
  function CharsetDecoderImpl(charset) {
    CharsetDecoder.call(this, charset);
    this.charset_1 = charset;
  }
  protoOf(CharsetDecoderImpl).copy_2crzso_k$ = function (charset) {
    return new CharsetDecoderImpl(charset);
  };
  protoOf(CharsetDecoderImpl).copy$default_ng4zhe_k$ = function (charset, $super) {
    charset = charset === VOID ? this.charset_1 : charset;
    return $super === VOID ? this.copy_2crzso_k$(charset) : $super.copy_2crzso_k$.call(this, charset);
  };
  protoOf(CharsetDecoderImpl).toString = function () {
    return 'CharsetDecoderImpl(charset=' + this.charset_1.toString() + ')';
  };
  protoOf(CharsetDecoderImpl).hashCode = function () {
    return this.charset_1.hashCode();
  };
  protoOf(CharsetDecoderImpl).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof CharsetDecoderImpl))
      return false;
    var tmp0_other_with_cast = other instanceof CharsetDecoderImpl ? other : THROW_CCE();
    if (!this.charset_1.equals(tmp0_other_with_cast.charset_1))
      return false;
    return true;
  };
  function encodeToByteArray_0(_this__u8e3s4, input, fromIndex, toIndex) {
    fromIndex = fromIndex === VOID ? 0 : fromIndex;
    toIndex = toIndex === VOID ? charSequenceLength(input) : toIndex;
    return encodeToByteArrayImpl(_this__u8e3s4, input, fromIndex, toIndex);
  }
  function decode_0(_this__u8e3s4, input, dst, max) {
    var decoder = Decoder_0(get_name(get_charset(_this__u8e3s4)), true);
    var tmp0 = input.get_buffer_bmaafd_k$().get_size_woubt6_k$();
    // Inline function 'kotlin.comparisons.minOf' call
    var b = toLong(max);
    var count = tmp0.compareTo_9jj042_k$(b) <= 0 ? tmp0 : b;
    var tmp = readByteArray(input, count.toInt_1tsl84_k$());
    var array = tmp instanceof Int8Array ? tmp : THROW_CCE();
    var tmp_0;
    try {
      tmp_0 = decoder.decode_hpap4q_k$(array);
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
    dst.append_jgojdo_k$(result);
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
    return _this__u8e3s4._charset_1;
  }
  function encodeImpl(_this__u8e3s4, input, fromIndex, toIndex, dst) {
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.require' call
    if (!(fromIndex <= toIndex)) {
      var message = 'Failed requirement.';
      throw IllegalArgumentException_init_$Create$(toString_1(message));
    }
    if (get_charset_0(_this__u8e3s4).equals(Charsets_getInstance().ISO_8859_1__1)) {
      return encodeISO88591(input, fromIndex, toIndex, dst);
    }
    // Inline function 'kotlin.require' call
    if (!(get_charset_0(_this__u8e3s4) === Charsets_getInstance().UTF_8__1)) {
      var message_0 = 'Only UTF-8 encoding is supported in JS';
      throw IllegalArgumentException_init_$Create$(toString_1(message_0));
    }
    var encoder = new TextEncoder();
    // Inline function 'kotlin.text.substring' call
    var tmp$ret$5 = toString_1(charSequenceSubSequence(input, fromIndex, toIndex));
    var result = encoder.encode(tmp$ret$5);
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    dst.write$default_h97jte_k$(result);
    return result.length;
  }
  function get_charset_0(_this__u8e3s4) {
    return _this__u8e3s4._charset_1;
  }
  function forName(_this__u8e3s4, name) {
    return Companion_getInstance_2().forName_etcah2_k$(name);
  }
  function isSupported(_this__u8e3s4, name) {
    return Companion_getInstance_2().isSupported_c9nas6_k$(name);
  }
  function Decoder() {
  }
  function Decoder_0(encoding, fatal) {
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
    this.$this_toKtor_1 = $this_toKtor;
  }
  protoOf(toKtor$1).decode_m3924y_k$ = function () {
    return this.$this_toKtor_1.decode();
  };
  protoOf(toKtor$1).decode_hpap4q_k$ = function (buffer) {
    return this.$this_toKtor_1.decode(buffer);
  };
  protoOf(toKtor$1).decode_mvpnei_k$ = function (buffer, options) {
    return this.$this_toKtor_1.decode(buffer, options);
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
    this.fatal_1 = fatal;
    // Inline function 'kotlin.text.trim' call
    // Inline function 'kotlin.text.lowercase' call
    // Inline function 'kotlin.js.asDynamic' call
    var requestedEncoding = toString_1(trim(isCharSequence(encoding) ? encoding : THROW_CCE())).toLowerCase();
    // Inline function 'kotlin.check' call
    if (!get_ENCODING_ALIASES().contains_aljjnj_k$(requestedEncoding)) {
      var message = encoding + ' is not supported.';
      throw IllegalStateException_init_$Create$(toString_1(message));
    }
  }
  protoOf(TextDecoderFallback).get_fatal_ir8ue3_k$ = function () {
    return this.fatal_1;
  };
  protoOf(TextDecoderFallback).decode_m3924y_k$ = function () {
    return '';
  };
  protoOf(TextDecoderFallback).decode_hpap4q_k$ = function (buffer) {
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
          if (!!this.fatal_1) {
            var message = 'Invalid character: ' + point;
            throw IllegalStateException_init_$Create$(toString_1(message));
          }
          writeFully_0(builder, get_REPLACEMENT());
          continue $l$loop;
        }
        if (point > 255) {
          builder.writeByte_9ih3z3_k$(toByte(point >> 8));
        }
        builder.writeByte_9ih3z3_k$(toByte(point & 255));
      }
       while (inductionVariable < last);
    return decodeToString(readByteArray_0(builder));
  };
  protoOf(TextDecoderFallback).decode_mvpnei_k$ = function (buffer, options) {
    return this.decode_hpap4q_k$(buffer);
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
  function Closeable() {
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
        dst.writeByte_9ih3z3_k$(toByte(character));
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
  function get_atomicfu$reentrantLock() {
    _init_properties_Synchronized_kt__f4zdjg();
    return Lock;
  }
  var Lock;
  function ReentrantLock() {
  }
  protoOf(ReentrantLock).lock_fp5s9n_k$ = function () {
  };
  protoOf(ReentrantLock).tryLock_hapj0a_k$ = function () {
    return true;
  };
  protoOf(ReentrantLock).unlock_85w96c_k$ = function () {
  };
  function synchronized(lock, block) {
    _init_properties_Synchronized_kt__f4zdjg();
    return block();
  }
  var properties_initialized_Synchronized_kt_8bwsba;
  function _init_properties_Synchronized_kt__f4zdjg() {
    if (!properties_initialized_Synchronized_kt_8bwsba) {
      properties_initialized_Synchronized_kt_8bwsba = true;
      Lock = new ReentrantLock();
    }
  }
  function _get_instances__6pklt9($this) {
    return $this.instances_1;
  }
  function _set_size__9twho6($this, _set____db54di) {
    $this.size_1 = _set____db54di;
  }
  function _get_size__ddoh9m($this) {
    return $this.size_1;
  }
  function DefaultPool(capacity) {
    this.capacity_1 = capacity;
    var tmp = this;
    // Inline function 'kotlin.arrayOfNulls' call
    var size = this.capacity_1;
    tmp.instances_1 = Array(size);
    this.size_1 = 0;
  }
  protoOf(DefaultPool).get_capacity_wxbgcd_k$ = function () {
    return this.capacity_1;
  };
  protoOf(DefaultPool).disposeInstance_6ek0a2_k$ = function (instance) {
  };
  protoOf(DefaultPool).clearInstance_nfz4jw_k$ = function (instance) {
    return instance;
  };
  protoOf(DefaultPool).validateInstance_6mwbhp_k$ = function (instance) {
  };
  protoOf(DefaultPool).borrow_mvkpor_k$ = function () {
    if (this.size_1 === 0)
      return this.produceInstance_xswihh_k$();
    this.size_1 = this.size_1 - 1 | 0;
    var idx = this.size_1;
    var tmp = this.instances_1[idx];
    var instance = !(tmp == null) ? tmp : THROW_CCE();
    this.instances_1[idx] = null;
    return this.clearInstance_nfz4jw_k$(instance);
  };
  protoOf(DefaultPool).recycle_d2xv5h_k$ = function (instance) {
    this.validateInstance_6mwbhp_k$(instance);
    if (this.size_1 === this.capacity_1) {
      this.disposeInstance_6ek0a2_k$(instance);
    } else {
      var _unary__edvuaz = this.size_1;
      this.size_1 = _unary__edvuaz + 1 | 0;
      this.instances_1[_unary__edvuaz] = instance;
    }
  };
  protoOf(DefaultPool).dispose_3nnxhr_k$ = function () {
    var inductionVariable = 0;
    var last = this.size_1;
    if (inductionVariable < last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var tmp = this.instances_1[i];
        var instance = !(tmp == null) ? tmp : THROW_CCE();
        this.instances_1[i] = null;
        this.disposeInstance_6ek0a2_k$(instance);
      }
       while (inductionVariable < last);
    this.size_1 = 0;
  };
  function get_DEVELOPMENT_MODE() {
    return false;
  }
  //region block: post-declaration
  protoOf(Read).resume_2o15jx_k$ = resume;
  protoOf(Read).resume_xzb95z_k$ = resume_0;
  protoOf(Read).resume$default_53elu8_k$ = resume$default;
  protoOf(Write).resume_2o15jx_k$ = resume;
  protoOf(Write).resume_xzb95z_k$ = resume_0;
  protoOf(Write).resume$default_53elu8_k$ = resume$default;
  protoOf(ByteChannel).awaitContent$default_rxihsg_k$ = awaitContent$default;
  protoOf(ByteReadChannel$Companion$Empty$1).awaitContent$default_rxihsg_k$ = awaitContent$default;
  protoOf(SourceByteReadChannel).awaitContent$default_rxihsg_k$ = awaitContent$default;
  protoOf(DefaultPool).close_yn9xrc_k$ = close;
  //endregion
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = copyAndClose;
  _.$_$.b = copyTo;
  _.$_$.c = discard;
  _.$_$.d = readAvailable;
  _.$_$.e = readFully;
  _.$_$.f = readPacket;
  _.$_$.g = readRemaining;
  _.$_$.h = readRemaining_0;
  _.$_$.i = readUTF8Line;
  _.$_$.j = toByteArray;
  _.$_$.k = writeFully;
  _.$_$.l = writePacket;
  _.$_$.m = Charsets_getInstance;
  _.$_$.n = Companion_getInstance_1;
  _.$_$.o = MalformedInputException;
  _.$_$.p = decode;
  _.$_$.q = encode;
  _.$_$.r = forName;
  _.$_$.s = isSupported;
  _.$_$.t = get_name;
  _.$_$.u = BytePacketBuilder;
  _.$_$.v = Closeable;
  _.$_$.w = build;
  _.$_$.x = canRead;
  _.$_$.y = copy;
  _.$_$.z = readText_0;
  _.$_$.a1 = takeWhile;
  _.$_$.b1 = toByteArray_0;
  _.$_$.c1 = writeFully_0;
  _.$_$.d1 = writePacket_0;
  _.$_$.e1 = writeText;
  _.$_$.f1 = get_ByteArrayPool;
  _.$_$.g1 = ByteChannel;
  _.$_$.h1 = ByteReadChannel;
  _.$_$.i1 = ByteReadChannel_1;
  _.$_$.j1 = WriterScope;
  _.$_$.k1 = get_availableForRead;
  _.$_$.l1 = cancel_0;
  _.$_$.m1 = close_0;
  _.$_$.n1 = invokeOnCompletion;
  _.$_$.o1 = get_isCompleted;
  _.$_$.p1 = readText;
  _.$_$.q1 = writer;
  //endregion
  return _;
}));
