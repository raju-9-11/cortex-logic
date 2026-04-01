(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js', './kotlinx-atomicfu.js', './kotlinx-coroutines-core.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'), require('./kotlinx-atomicfu.js'), require('./kotlinx-coroutines-core.js'));
  else {
    if (typeof globalThis['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'kotlinx-coroutines-test'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'kotlinx-coroutines-test'.");
    }
    if (typeof globalThis['kotlinx-atomicfu'] === 'undefined') {
      throw new Error("Error loading module 'kotlinx-coroutines-test'. Its dependency 'kotlinx-atomicfu' was not found. Please, check whether 'kotlinx-atomicfu' is loaded prior to 'kotlinx-coroutines-test'.");
    }
    if (typeof globalThis['kotlinx-coroutines-core'] === 'undefined') {
      throw new Error("Error loading module 'kotlinx-coroutines-test'. Its dependency 'kotlinx-coroutines-core' was not found. Please, check whether 'kotlinx-coroutines-core' is loaded prior to 'kotlinx-coroutines-test'.");
    }
    globalThis['kotlinx-coroutines-test'] = factory(typeof globalThis['kotlinx-coroutines-test'] === 'undefined' ? {} : globalThis['kotlinx-coroutines-test'], globalThis['kotlin-kotlin-stdlib'], globalThis['kotlinx-atomicfu'], globalThis['kotlinx-coroutines-core']);
  }
}(function (_, kotlin_kotlin, kotlin_org_jetbrains_kotlinx_atomicfu, kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core) {
  'use strict';
  //region block: imports
  var EmptyCoroutineContext_getInstance = kotlin_kotlin.$_$.k5;
  var VOID = kotlin_kotlin.$_$.h;
  var throwOnFailure = kotlin_kotlin.$_$.mk;
  var _Result___get_value__impl__bjfvqg = kotlin_kotlin.$_$.y3;
  var THROW_CCE = kotlin_kotlin.$_$.jj;
  var Unit_getInstance = kotlin_kotlin.$_$.f6;
  var toString = kotlin_kotlin.$_$.fe;
  var IllegalStateException_init_$Create$ = kotlin_kotlin.$_$.i2;
  var protoOf = kotlin_kotlin.$_$.be;
  var get = kotlin_kotlin.$_$.qb;
  var fold = kotlin_kotlin.$_$.pb;
  var minusKey = kotlin_kotlin.$_$.rb;
  var plus = kotlin_kotlin.$_$.ub;
  var Key = kotlin_kotlin.$_$.tb;
  var Element = kotlin_kotlin.$_$.sb;
  var initMetadataForObject = kotlin_kotlin.$_$.dd;
  var atomic$boolean$1 = kotlin_org_jetbrains_kotlinx_atomicfu.$_$.b;
  var initMetadataForClass = kotlin_kotlin.$_$.xc;
  var firstOrNull = kotlin_kotlin.$_$.m8;
  var drop = kotlin_kotlin.$_$.h8;
  var addSuppressed = kotlin_kotlin.$_$.wj;
  var Duration = kotlin_kotlin.$_$.ji;
  var get_isActive = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.t2;
  var filter = kotlin_kotlin.$_$.ff;
  var toList = kotlin_kotlin.$_$.jf;
  var Duration__toString_impl_8d916b = kotlin_kotlin.$_$.j3;
  var CancellationException_init_$Create$ = kotlin_kotlin.$_$.h1;
  var Job = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.h2;
  var isInterface = kotlin_kotlin.$_$.md;
  var ensureNotNull = kotlin_kotlin.$_$.bk;
  var TimeoutCancellationException = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.l2;
  var CoroutineImpl = kotlin_kotlin.$_$.vb;
  var yield_0 = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.k;
  var get_COROUTINE_SUSPENDED = kotlin_kotlin.$_$.eb;
  var initMetadataForLambda = kotlin_kotlin.$_$.cd;
  var CoroutineScope = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.a2;
  var get_job = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.u2;
  var cancelAndJoin = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.h;
  var CoroutineStart_UNDISPATCHED_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.a;
  var CoroutineName = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.y1;
  var launch = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.v2;
  var withTimeout = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.j;
  var cancel = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.n2;
  var KProperty1 = kotlin_kotlin.$_$.bf;
  var getPropertyCallableRef = kotlin_kotlin.$_$.uc;
  var Companion_getInstance = kotlin_kotlin.$_$.a6;
  var Companion_getInstance_0 = kotlin_kotlin.$_$.v5;
  var DurationUnit_SECONDS_getInstance = kotlin_kotlin.$_$.m;
  var toDuration = kotlin_kotlin.$_$.oi;
  var _Result___init__impl__xyqfz8 = kotlin_kotlin.$_$.v3;
  var createFailure = kotlin_kotlin.$_$.ak;
  var SuspendFunction1 = kotlin_kotlin.$_$.xb;
  var Key_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.q;
  var UnsupportedOperationException_init_$Create$ = kotlin_kotlin.$_$.y2;
  var Long = kotlin_kotlin.$_$.ej;
  var equals = kotlin_kotlin.$_$.qc;
  var FunctionAdapter = kotlin_kotlin.$_$.ec;
  var DisposableHandle = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.e2;
  var hashCode = kotlin_kotlin.$_$.wc;
  var AbstractLongTimeSource = kotlin_kotlin.$_$.ii;
  var DurationUnit_MILLISECONDS_getInstance = kotlin_kotlin.$_$.k;
  var AbstractCoroutineContextElement = kotlin_kotlin.$_$.jb;
  var ThreadSafeHeap = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.k1;
  var SynchronizedObject = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.i1;
  var atomic$long$1 = kotlin_org_jetbrains_kotlinx_atomicfu.$_$.c;
  var Channel = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.r;
  var IllegalArgumentException_init_$Create$ = kotlin_kotlin.$_$.d2;
  var toDuration_0 = kotlin_kotlin.$_$.ni;
  var Duration__isNegative_impl_pbysfa = kotlin_kotlin.$_$.e3;
  var _Duration___get_inWholeMilliseconds__impl__msfiry = kotlin_kotlin.$_$.c3;
  var compareValuesBy = kotlin_kotlin.$_$.bb;
  var Comparable = kotlin_kotlin.$_$.vi;
  var ThreadSafeHeapNode = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.j1;
  var CoroutineDispatcher = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.w1;
  var Runnable = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.j2;
  var disposeOnCancellation = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.r2;
  var delay = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.e;
  var Delay = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.d2;
  var DelayWithTimeoutDiagnostics = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.c2;
  var initMetadataForInterface = kotlin_kotlin.$_$.bd;
  var Key_getInstance_0 = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.m;
  var CancellationException = kotlin_kotlin.$_$.db;
  var AbstractCoroutine = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.q1;
  var ArrayList_init_$Create$ = kotlin_kotlin.$_$.t;
  var CoroutineScope_0 = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.z1;
  var ensurePlatformExceptionHandlerLoaded = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.l1;
  var unwrap = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.n1;
  var AssertionError = kotlin_kotlin.$_$.si;
  var AssertionError_init_$Init$ = kotlin_kotlin.$_$.p1;
  var captureStack = kotlin_kotlin.$_$.ic;
  var noWhenBranchMatchedException = kotlin_kotlin.$_$.ik;
  var Key_getInstance_1 = kotlin_kotlin.$_$.j5;
  var toString_0 = kotlin_kotlin.$_$.pk;
  var IllegalStateException = kotlin_kotlin.$_$.dj;
  var IllegalStateException_init_$Init$ = kotlin_kotlin.$_$.h2;
  var CoroutineExceptionHandler = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.x1;
  var LinkedHashMap_init_$Create$ = kotlin_kotlin.$_$.c1;
  var ExceptionSuccessfullyProcessed_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.l;
  var JobImpl = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.f2;
  var handleCoroutineException = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.s2;
  var IllegalStateException_init_$Create$_0 = kotlin_kotlin.$_$.k2;
  var get_DefaultDelay = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.b2;
  var Dispatchers_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.n;
  var initMetadataForCompanion = kotlin_kotlin.$_$.yc;
  var atomic$ref$1 = kotlin_org_jetbrains_kotlinx_atomicfu.$_$.d;
  var atomic$int$1 = kotlin_org_jetbrains_kotlinx_atomicfu.$_$.e;
  var newThrowable = kotlin_kotlin.$_$.ud;
  var MainCoroutineDispatcher = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.i2;
  var GlobalScope_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.o;
  var promise = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.w2;
  //endregion
  //region block: pre-declaration
  initMetadataForObject(RunningInRunTest, 'RunningInRunTest', VOID, VOID, [Key, Element]);
  initMetadataForClass(AtomicBoolean, 'AtomicBoolean');
  initMetadataForLambda(runTest$slambda$slambda, CoroutineImpl, [CoroutineImpl], [1]);
  initMetadataForLambda(runTest$slambda$slambda_1, CoroutineImpl, [CoroutineImpl], [1]);
  initMetadataForLambda(runTest$slambda$slambda_3, CoroutineImpl, [CoroutineImpl], [1]);
  initMetadataForLambda(runTest$slambda, CoroutineImpl, [CoroutineImpl], [1]);
  initMetadataForClass(TestDispatcher, 'TestDispatcher', VOID, CoroutineDispatcher, [CoroutineDispatcher, Delay, DelayWithTimeoutDiagnostics], [1]);
  initMetadataForClass(UnconfinedTestDispatcherImpl, 'UnconfinedTestDispatcherImpl', VOID, TestDispatcher, VOID, [1]);
  initMetadataForClass(StandardTestDispatcherImpl, 'StandardTestDispatcherImpl', StandardTestDispatcherImpl, TestDispatcher, VOID, [1]);
  initMetadataForObject(Key_0, 'Key', VOID, VOID, [Key]);
  initMetadataForClass(sam$kotlinx_coroutines_DisposableHandle$0, 'sam$kotlinx_coroutines_DisposableHandle$0', VOID, VOID, [DisposableHandle, FunctionAdapter]);
  initMetadataForClass(TestCoroutineScheduler$timeSource$1, VOID, VOID, AbstractLongTimeSource);
  initMetadataForClass(TestCoroutineScheduler, 'TestCoroutineScheduler', TestCoroutineScheduler, AbstractCoroutineContextElement, [AbstractCoroutineContextElement, Element], [0]);
  initMetadataForObject(BackgroundWork, 'BackgroundWork', VOID, VOID, [Key, Element]);
  initMetadataForClass(TestDispatchEvent, 'TestDispatchEvent', VOID, VOID, [Comparable, ThreadSafeHeapNode]);
  initMetadataForClass(CancellableContinuationRunnable, 'CancellableContinuationRunnable', VOID, VOID, [Runnable]);
  initMetadataForInterface(TestScope, 'TestScope', VOID, VOID, [CoroutineScope]);
  initMetadataForClass(TestScopeImpl, 'TestScopeImpl', VOID, AbstractCoroutine, [AbstractCoroutine, TestScope], [0]);
  initMetadataForClass(UncompletedCoroutinesError, 'UncompletedCoroutinesError', VOID, AssertionError);
  initMetadataForClass(UncaughtExceptionsBeforeTest, 'UncaughtExceptionsBeforeTest', UncaughtExceptionsBeforeTest, IllegalStateException);
  initMetadataForClass(TestScope$$inlined$CoroutineExceptionHandler$1, VOID, VOID, AbstractCoroutineContextElement, [AbstractCoroutineContextElement, CoroutineExceptionHandler]);
  initMetadataForObject(ExceptionCollector, 'ExceptionCollector', VOID, AbstractCoroutineContextElement, [AbstractCoroutineContextElement, CoroutineExceptionHandler]);
  initMetadataForClass(ExceptionCollectorAsService, 'ExceptionCollectorAsService', ExceptionCollectorAsService, VOID, [CoroutineExceptionHandler]);
  initMetadataForClass(ReportingSupervisorJob, 'ReportingSupervisorJob', VOID, JobImpl, VOID, [0]);
  initMetadataForCompanion(Companion);
  initMetadataForClass(NonConcurrentlyModifiable, 'NonConcurrentlyModifiable');
  initMetadataForClass(TestMainDispatcher, 'TestMainDispatcher', VOID, MainCoroutineDispatcher, [MainCoroutineDispatcher, Delay], [1]);
  initMetadataForLambda(createTestResult$slambda, CoroutineImpl, [CoroutineImpl], [1]);
  //endregion
  function get_DEFAULT_TIMEOUT() {
    _init_properties_TestBuilders_kt__o1twne();
    return DEFAULT_TIMEOUT;
  }
  var DEFAULT_TIMEOUT;
  function systemProperty(name, parse, default_0) {
    _init_properties_TestBuilders_kt__o1twne();
    var tmp0_elvis_lhs = systemPropertyImpl(name);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return default_0;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var value = tmp;
    return parse(value);
  }
  function runTest(context, timeout, testBody) {
    context = context === VOID ? EmptyCoroutineContext_getInstance() : context;
    var tmp;
    if (timeout === VOID) {
      // Inline function 'kotlin.getOrThrow' call
      var this_0 = get_DEFAULT_TIMEOUT();
      throwOnFailure(this_0);
      var tmp_0 = _Result___get_value__impl__bjfvqg(this_0);
      tmp = ((tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE()).rawValue_1;
    } else {
      tmp = timeout;
    }
    timeout = tmp;
    _init_properties_TestBuilders_kt__o1twne();
    // Inline function 'kotlin.check' call
    if (!(context.get_y2st91_k$(RunningInRunTest_getInstance()) == null)) {
      var message = "Calls to `runTest` can't be nested. Please read the docs on `TestResult` for details.";
      throw IllegalStateException_init_$Create$(toString(message));
    }
    return runTest_0(TestScope_0(context.plus_s13ygv_k$(RunningInRunTest_getInstance())), timeout, testBody);
  }
  function RunningInRunTest() {
    RunningInRunTest_instance = this;
  }
  protoOf(RunningInRunTest).get_key_18j28a_k$ = function () {
    return this;
  };
  protoOf(RunningInRunTest).toString = function () {
    return 'RunningInRunTest';
  };
  var RunningInRunTest_instance;
  function RunningInRunTest_getInstance() {
    if (RunningInRunTest_instance == null)
      new RunningInRunTest();
    return RunningInRunTest_instance;
  }
  function runTest_0(_this__u8e3s4, timeout, testBody) {
    var tmp;
    if (timeout === VOID) {
      // Inline function 'kotlin.getOrThrow' call
      var this_0 = get_DEFAULT_TIMEOUT();
      throwOnFailure(this_0);
      var tmp_0 = _Result___get_value__impl__bjfvqg(this_0);
      tmp = ((tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE()).rawValue_1;
    } else {
      tmp = timeout;
    }
    timeout = tmp;
    _init_properties_TestBuilders_kt__o1twne();
    // Inline function 'kotlin.let' call
    var scope = asSpecificImplementation(_this__u8e3s4);
    scope.enter_h49n20_k$();
    return createTestResult(runTest$slambda_0(scope, timeout, _this__u8e3s4, testBody, null));
  }
  function _get_container__j851cg($this) {
    return $this.container_1;
  }
  function AtomicBoolean(initial) {
    this.container_1 = atomic$boolean$1(initial);
  }
  protoOf(AtomicBoolean).set_value_70roch_k$ = function (value) {
    this.container_1.set_kotlinx$atomicfu$value_tm3k58_k$(value);
  };
  protoOf(AtomicBoolean).get_value_j01efc_k$ = function () {
    return this.container_1.get_kotlinx$atomicfu$value_vi2am5_k$();
  };
  function throwAll(head, other) {
    _init_properties_TestBuilders_kt__o1twne();
    if (!(head == null)) {
      // Inline function 'kotlin.collections.forEach' call
      var _iterator__ex2g4s = other.iterator_jk1svi_k$();
      while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
        var element = _iterator__ex2g4s.next_20eer_k$();
        addSuppressed(head, element);
      }
      throw head;
    } else {
      // Inline function 'kotlin.with' call
      var tmp2_safe_receiver = firstOrNull(other);
      var tmp;
      if (tmp2_safe_receiver == null) {
        tmp = null;
      } else {
        // Inline function 'kotlin.apply' call
        // Inline function 'kotlin.collections.forEach' call
        var _iterator__ex2g4s_0 = drop(other, 1).iterator_jk1svi_k$();
        while (_iterator__ex2g4s_0.hasNext_bitz1p_k$()) {
          var element_0 = _iterator__ex2g4s_0.next_20eer_k$();
          addSuppressed(tmp2_safe_receiver, element_0);
        }
        throw tmp2_safe_receiver;
      }
    }
  }
  function Duration$Companion$parse$ref($boundThis) {
    var l = function (p0) {
      return new Duration($boundThis.parse_8aqxct_k$(p0));
    };
    l.callableName = 'parse';
    return l;
  }
  function runTest$slambda$slambda$lambda($this_launch) {
    return function () {
      return !get_isActive($this_launch);
    };
  }
  function runTest$slambda$slambda$lambda_0($scope, $timeout, $testBodyFinished, $timeoutError, $cancellationException) {
    return function (exception) {
      var tmp;
      if (exception instanceof TimeoutCancellationException) {
        dumpCoroutines();
        var activeChildren = toList(filter($scope.get_children_4cwbp4_k$(), isActive$factory()));
        var tmp_0 = 'After waiting for ' + Duration__toString_impl_8d916b($timeout) + ', ';
        var tmp_1;
        var tmp_2;
        if ($testBodyFinished.get_value_j01efc_k$()) {
          // Inline function 'kotlin.collections.isNotEmpty' call
          tmp_2 = !activeChildren.isEmpty_y1axqb_k$();
        } else {
          tmp_2 = false;
        }
        if (tmp_2) {
          tmp_1 = 'there were active child jobs: ' + toString(activeChildren) + '. ' + 'Use `TestScope.backgroundScope` ' + 'to launch the coroutines that need to be cancelled when the test body finishes';
        } else {
          if ($testBodyFinished.get_value_j01efc_k$()) {
            tmp_1 = 'the test completed, but only after the timeout';
          } else {
            tmp_1 = 'the test body did not run to completion';
          }
        }
        var message = tmp_0 + tmp_1;
        $timeoutError._v = new UncompletedCoroutinesError(message);
        $cancellationException._v = CancellationException_init_$Create$('The test timed out');
        (isInterface($scope, Job) ? $scope : THROW_CCE()).cancel_hkmm2i_k$(ensureNotNull($cancellationException._v));
        tmp = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function runTest$slambda$slambda($testBody, $testBodyFinished, resultContinuation) {
    this.$testBody_1 = $testBody;
    this.$testBodyFinished_1 = $testBodyFinished;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(runTest$slambda$slambda).invoke_j80s0a_k$ = function ($this$start, $completion) {
    var tmp = this.create_zd393q_k$($this$start, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(runTest$slambda$slambda).invoke_qns8j1_k$ = function (p1, $completion) {
    return this.invoke_j80s0a_k$(p1 instanceof TestScopeImpl ? p1 : THROW_CCE(), $completion);
  };
  protoOf(runTest$slambda$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(6);
            this.set_state_rjd8d0_k$(1);
            suspendResult = yield_0(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.set_state_rjd8d0_k$(2);
            continue $sm;
          case 2:
            this.set_exceptionState_fex74n_k$(5);
            this.set_state_rjd8d0_k$(3);
            suspendResult = this.$testBody_1(this.$this$start_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 3:
            this.tmp$ret$00__1 = suspendResult;
            this.set_exceptionState_fex74n_k$(6);
            this.set_state_rjd8d0_k$(4);
            continue $sm;
          case 4:
            this.set_exceptionState_fex74n_k$(6);
            this.$testBodyFinished_1.set_value_70roch_k$(true);
            return Unit_getInstance();
          case 5:
            this.set_exceptionState_fex74n_k$(6);
            var t = this.get_exception_x0n6w6_k$();
            this.$testBodyFinished_1.set_value_70roch_k$(true);
            throw t;
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
  protoOf(runTest$slambda$slambda).create_zd393q_k$ = function ($this$start, completion) {
    var i = new runTest$slambda$slambda(this.$testBody_1, this.$testBodyFinished_1, completion);
    i.$this$start_1 = $this$start;
    return i;
  };
  protoOf(runTest$slambda$slambda).create_wyq9v6_k$ = function (value, completion) {
    return this.create_zd393q_k$(value instanceof TestScopeImpl ? value : THROW_CCE(), completion);
  };
  function runTest$slambda$slambda_0($testBody, $testBodyFinished, resultContinuation) {
    var i = new runTest$slambda$slambda($testBody, $testBodyFinished, resultContinuation);
    var l = function ($this$start, $completion) {
      return i.invoke_j80s0a_k$($this$start, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function runTest$slambda$slambda_1($this_runTest, resultContinuation) {
    this.$this_runTest_1 = $this_runTest;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(runTest$slambda$slambda_1).invoke_d9fzmj_k$ = function ($this$launch, $completion) {
    var tmp = this.create_rcuf4x_k$($this$launch, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(runTest$slambda$slambda_1).invoke_qns8j1_k$ = function (p1, $completion) {
    return this.invoke_d9fzmj_k$((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(runTest$slambda$slambda_1).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(5);
            this.set_state_rjd8d0_k$(1);
            continue $sm;
          case 1:
            if (!true) {
              this.set_state_rjd8d0_k$(6);
              continue $sm;
            }

            var tmp_0 = this;
            var tmp_1 = this.$this_runTest_1.get_testScheduler_77amg0_k$();
            tmp_0.executedSomething0__1 = tmp_1.tryRunNextTaskUnless_463vnb_k$(runTest$slambda$slambda$lambda(this.$this$launch_1));
            if (this.executedSomething0__1) {
              this.set_state_rjd8d0_k$(3);
              suspendResult = yield_0(this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.set_state_rjd8d0_k$(2);
              suspendResult = this.$this_runTest_1.get_testScheduler_77amg0_k$().receiveDispatchEvent_2tq1h6_k$(this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            }

          case 2:
            this.set_state_rjd8d0_k$(4);
            continue $sm;
          case 3:
            this.set_state_rjd8d0_k$(4);
            continue $sm;
          case 4:
            this.set_state_rjd8d0_k$(1);
            continue $sm;
          case 5:
            throw this.get_exception_x0n6w6_k$();
          case 6:
            return Unit_getInstance();
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
  protoOf(runTest$slambda$slambda_1).create_rcuf4x_k$ = function ($this$launch, completion) {
    var i = new runTest$slambda$slambda_1(this.$this_runTest_1, completion);
    i.$this$launch_1 = $this$launch;
    return i;
  };
  protoOf(runTest$slambda$slambda_1).create_wyq9v6_k$ = function (value, completion) {
    return this.create_rcuf4x_k$((!(value == null) ? isInterface(value, CoroutineScope) : false) ? value : THROW_CCE(), completion);
  };
  function runTest$slambda$slambda_2($this_runTest, resultContinuation) {
    var i = new runTest$slambda$slambda_1($this_runTest, resultContinuation);
    var l = function ($this$launch, $completion) {
      return i.invoke_d9fzmj_k$($this$launch, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function runTest$slambda$slambda_3($scope, $workRunner, $timeout, $testBodyFinished, $timeoutError, $cancellationException, resultContinuation) {
    this.$scope_1 = $scope;
    this.$workRunner_1 = $workRunner;
    this.$timeout_1 = $timeout;
    this.$testBodyFinished_1 = $testBodyFinished;
    this.$timeoutError_1 = $timeoutError;
    this.$cancellationException_1 = $cancellationException;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(runTest$slambda$slambda_3).invoke_d9fzmj_k$ = function ($this$withTimeout, $completion) {
    var tmp = this.create_rcuf4x_k$($this$withTimeout, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(runTest$slambda$slambda_3).invoke_qns8j1_k$ = function (p1, $completion) {
    return this.invoke_d9fzmj_k$((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(runTest$slambda$slambda_3).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(3);
            var tmp_0 = get_job(this.$this$withTimeout_1.get_coroutineContext_115oqo_k$());
            tmp_0.invokeOnCompletion$default_1v3utx_k$(true, VOID, runTest$slambda$slambda$lambda_0(this.$scope_1, this.$timeout_1, this.$testBodyFinished_1, this.$timeoutError_1, this.$cancellationException_1));
            this.set_state_rjd8d0_k$(1);
            suspendResult = this.$scope_1.join_o20dar_k$(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.set_state_rjd8d0_k$(2);
            suspendResult = cancelAndJoin(this.$workRunner_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

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
  protoOf(runTest$slambda$slambda_3).create_rcuf4x_k$ = function ($this$withTimeout, completion) {
    var i = new runTest$slambda$slambda_3(this.$scope_1, this.$workRunner_1, this.$timeout_1, this.$testBodyFinished_1, this.$timeoutError_1, this.$cancellationException_1, completion);
    i.$this$withTimeout_1 = $this$withTimeout;
    return i;
  };
  protoOf(runTest$slambda$slambda_3).create_wyq9v6_k$ = function (value, completion) {
    return this.create_rcuf4x_k$((!(value == null) ? isInterface(value, CoroutineScope) : false) ? value : THROW_CCE(), completion);
  };
  function runTest$slambda$slambda_4($scope, $workRunner, $timeout, $testBodyFinished, $timeoutError, $cancellationException, resultContinuation) {
    var i = new runTest$slambda$slambda_3($scope, $workRunner, $timeout, $testBodyFinished, $timeoutError, $cancellationException, resultContinuation);
    var l = function ($this$withTimeout, $completion) {
      return i.invoke_d9fzmj_k$($this$withTimeout, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function runTest$slambda$lambda() {
    return false;
  }
  function runTest$slambda($scope, $timeout, $this_runTest, $testBody, resultContinuation) {
    this.$scope_1 = $scope;
    this.$timeout_1 = $timeout;
    this.$this_runTest_1 = $this_runTest;
    this.$testBody_1 = $testBody;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(runTest$slambda).invoke_d9fzmj_k$ = function ($this$createTestResult, $completion) {
    var tmp = this.create_rcuf4x_k$($this$createTestResult, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(runTest$slambda).invoke_qns8j1_k$ = function (p1, $completion) {
    return this.invoke_d9fzmj_k$((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(runTest$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(8);
            this.testBodyFinished0__1 = new AtomicBoolean(false);
            var tmp_0 = CoroutineStart_UNDISPATCHED_getInstance();
            this.$scope_1.start_rn6v44_k$(tmp_0, this.$scope_1, runTest$slambda$slambda_0(this.$testBody_1, this.testBodyFinished0__1, null));
            this.timeoutError1__1 = {_v: null};
            this.cancellationException2__1 = {_v: null};
            var tmp_1 = this;
            var tmp_2 = new CoroutineName('kotlinx.coroutines.test runner');
            tmp_1.workRunner3__1 = launch(this.$this$createTestResult_1, tmp_2, VOID, runTest$slambda$slambda_2(this.$this_runTest_1, null));
            this.set_state_rjd8d0_k$(1);
            continue $sm;
          case 1:
            this.set_exceptionState_fex74n_k$(7);
            this.set_exceptionState_fex74n_k$(3);
            this.set_state_rjd8d0_k$(2);
            suspendResult = withTimeout(this.$timeout_1, runTest$slambda$slambda_4(this.$scope_1, this.workRunner3__1, this.$timeout_1, this.testBodyFinished0__1, this.timeoutError1__1, this.cancellationException2__1, null), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            this.tmp$ret$04__1 = suspendResult;
            this.set_exceptionState_fex74n_k$(8);
            this.set_state_rjd8d0_k$(6);
            continue $sm;
          case 3:
            this.set_exceptionState_fex74n_k$(7);
            var tmp_3 = this.get_exception_x0n6w6_k$();
            if (tmp_3 instanceof TimeoutCancellationException) {
              this._unused_var_5_x5dlkg_1 = this.get_exception_x0n6w6_k$();
              this.set_state_rjd8d0_k$(4);
              suspendResult = this.$scope_1.join_o20dar_k$(this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              throw this.get_exception_x0n6w6_k$();
            }

          case 4:
            this.completion6__1 = this.$scope_1.getCompletionExceptionOrNull_snuvbb_k$();
            if (!(this.completion6__1 == null) && !(this.completion6__1 === this.cancellationException2__1._v)) {
              addSuppressed(ensureNotNull(this.timeoutError1__1._v), this.completion6__1);
            }

            this.set_state_rjd8d0_k$(5);
            suspendResult = cancelAndJoin(this.workRunner3__1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 5:
            this.tmp$ret$04__1 = suspendResult;
            this.set_exceptionState_fex74n_k$(8);
            this.set_state_rjd8d0_k$(6);
            continue $sm;
          case 6:
            this.set_exceptionState_fex74n_k$(8);
            cancel(this.$this_runTest_1.get_backgroundScope_9rqckj_k$());
            var tmp_4 = this.$this_runTest_1.get_testScheduler_77amg0_k$();
            tmp_4.advanceUntilIdleOr_uf407m_k$(runTest$slambda$lambda);
            var uncaughtExceptions = this.$scope_1.leave_1p8cl3_k$();
            var tmp0_elvis_lhs = this.timeoutError1__1._v;
            throwAll(tmp0_elvis_lhs == null ? this.$scope_1.getCompletionExceptionOrNull_snuvbb_k$() : tmp0_elvis_lhs, uncaughtExceptions);
            return Unit_getInstance();
          case 7:
            this.set_exceptionState_fex74n_k$(8);
            var t = this.get_exception_x0n6w6_k$();
            cancel(this.$this_runTest_1.get_backgroundScope_9rqckj_k$());
            var tmp_5 = this.$this_runTest_1.get_testScheduler_77amg0_k$();
            tmp_5.advanceUntilIdleOr_uf407m_k$(runTest$slambda$lambda);
            var uncaughtExceptions_0 = this.$scope_1.leave_1p8cl3_k$();
            var tmp0_elvis_lhs_0 = this.timeoutError1__1._v;
            throwAll(tmp0_elvis_lhs_0 == null ? this.$scope_1.getCompletionExceptionOrNull_snuvbb_k$() : tmp0_elvis_lhs_0, uncaughtExceptions_0);
            throw t;
          case 8:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 8) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  protoOf(runTest$slambda).create_rcuf4x_k$ = function ($this$createTestResult, completion) {
    var i = new runTest$slambda(this.$scope_1, this.$timeout_1, this.$this_runTest_1, this.$testBody_1, completion);
    i.$this$createTestResult_1 = $this$createTestResult;
    return i;
  };
  protoOf(runTest$slambda).create_wyq9v6_k$ = function (value, completion) {
    return this.create_rcuf4x_k$((!(value == null) ? isInterface(value, CoroutineScope) : false) ? value : THROW_CCE(), completion);
  };
  function runTest$slambda_0($scope, $timeout, $this_runTest, $testBody, resultContinuation) {
    var i = new runTest$slambda($scope, $timeout, $this_runTest, $testBody, resultContinuation);
    var l = function ($this$createTestResult, $completion) {
      return i.invoke_d9fzmj_k$($this$createTestResult, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function isActive$factory() {
    return getPropertyCallableRef('isActive', 1, KProperty1, function (receiver) {
      return receiver.get_isActive_quafmh_k$();
    }, null);
  }
  var properties_initialized_TestBuilders_kt_4e1btg;
  function _init_properties_TestBuilders_kt__o1twne() {
    if (!properties_initialized_TestBuilders_kt_4e1btg) {
      properties_initialized_TestBuilders_kt_4e1btg = true;
      // Inline function 'kotlin.runCatching' call
      var tmp;
      try {
        Companion_getInstance();
        var tmp_0 = Duration$Companion$parse$ref(Companion_getInstance_0());
        // Inline function 'kotlin.time.Companion.seconds' call
        Companion_getInstance_0();
        var tmp$ret$0 = toDuration(60, DurationUnit_SECONDS_getInstance());
        // Inline function 'kotlin.Companion.success' call
        var value = systemProperty('kotlinx.coroutines.test.default_timeout', tmp_0, new Duration(tmp$ret$0));
        tmp = _Result___init__impl__xyqfz8(value);
      } catch ($p) {
        var tmp_1;
        if ($p instanceof Error) {
          var e = $p;
          // Inline function 'kotlin.Companion.failure' call
          Companion_getInstance();
          tmp_1 = _Result___init__impl__xyqfz8(createFailure(e));
        } else {
          throw $p;
        }
        tmp = tmp_1;
      }
      DEFAULT_TIMEOUT = tmp;
    }
  }
  function UnconfinedTestDispatcher(scheduler, name) {
    scheduler = scheduler === VOID ? null : scheduler;
    name = name === VOID ? null : name;
    var tmp1_elvis_lhs = scheduler == null ? Companion_getInstance_1().get_currentTestScheduler_5pq64f_k$() : scheduler;
    return new UnconfinedTestDispatcherImpl(tmp1_elvis_lhs == null ? new TestCoroutineScheduler() : tmp1_elvis_lhs, name);
  }
  function StandardTestDispatcher(scheduler, name) {
    scheduler = scheduler === VOID ? null : scheduler;
    name = name === VOID ? null : name;
    var tmp1_elvis_lhs = scheduler == null ? Companion_getInstance_1().get_currentTestScheduler_5pq64f_k$() : scheduler;
    return new StandardTestDispatcherImpl(tmp1_elvis_lhs == null ? new TestCoroutineScheduler() : tmp1_elvis_lhs, name);
  }
  function _get_name__das4rk($this) {
    return $this.name_1;
  }
  function UnconfinedTestDispatcherImpl(scheduler, name) {
    name = name === VOID ? null : name;
    TestDispatcher.call(this);
    this.scheduler_1 = scheduler;
    this.name_1 = name;
  }
  protoOf(UnconfinedTestDispatcherImpl).get_scheduler_5uu87m_k$ = function () {
    return this.scheduler_1;
  };
  protoOf(UnconfinedTestDispatcherImpl).isDispatchNeeded_ft82v4_k$ = function (context) {
    return false;
  };
  protoOf(UnconfinedTestDispatcherImpl).dispatch_qa3n0o_k$ = function (context, block) {
    checkSchedulerInContext(this.scheduler_1, context);
    this.scheduler_1.sendDispatchEvent_ye1q49_k$(context);
    var yieldContext = context.get_y2st91_k$(Key_getInstance());
    if (!(yieldContext === null)) {
      yieldContext.set_dispatcherWasUnconfined_dtzy9d_k$(true);
      return Unit_getInstance();
    }
    throw UnsupportedOperationException_init_$Create$('Function UnconfinedTestCoroutineDispatcher.dispatch can only be used by the yield function. If you wrap Unconfined dispatcher in your code, make sure you properly delegate isDispatchNeeded and dispatch calls.');
  };
  protoOf(UnconfinedTestDispatcherImpl).toString = function () {
    var tmp0_elvis_lhs = this.name_1;
    return (tmp0_elvis_lhs == null ? 'UnconfinedTestDispatcher' : tmp0_elvis_lhs) + '[scheduler=' + toString(this.scheduler_1) + ']';
  };
  function _get_name__das4rk_0($this) {
    return $this.name_1;
  }
  function StandardTestDispatcherImpl$dispatch$lambda(it) {
    return false;
  }
  function StandardTestDispatcherImpl(scheduler, name) {
    scheduler = scheduler === VOID ? new TestCoroutineScheduler() : scheduler;
    name = name === VOID ? null : name;
    TestDispatcher.call(this);
    this.scheduler_1 = scheduler;
    this.name_1 = name;
  }
  protoOf(StandardTestDispatcherImpl).get_scheduler_5uu87m_k$ = function () {
    return this.scheduler_1;
  };
  protoOf(StandardTestDispatcherImpl).dispatch_qa3n0o_k$ = function (context, block) {
    var tmp = new Long(0, 0);
    this.scheduler_1.registerEvent_m8gs5m_k$(this, tmp, block, context, StandardTestDispatcherImpl$dispatch$lambda);
  };
  protoOf(StandardTestDispatcherImpl).toString = function () {
    var tmp0_elvis_lhs = this.name_1;
    return (tmp0_elvis_lhs == null ? 'StandardTestDispatcher' : tmp0_elvis_lhs) + '[scheduler=' + toString(this.scheduler_1) + ']';
  };
  function Key_0() {
    Key_instance = this;
  }
  var Key_instance;
  function Key_getInstance_2() {
    if (Key_instance == null)
      new Key_0();
    return Key_instance;
  }
  function _get_events__f13j82($this) {
    return $this.events_1;
  }
  function _get_lock__d9xa4g($this) {
    return $this.lock_1;
  }
  function _get_count__iw3m8u($this) {
    return $this.count_1;
  }
  function _set_currentTime__l6rra7($this, _set____db54di) {
    $this.currentTime_1 = _set____db54di;
  }
  function _get_dispatchEventsForeground__ajml3f($this) {
    return $this.dispatchEventsForeground_1;
  }
  function _get_dispatchEvents__h7qhfs($this) {
    return $this.dispatchEvents_1;
  }
  function sam$kotlinx_coroutines_DisposableHandle$0(function_0) {
    this.function_1 = function_0;
  }
  protoOf(sam$kotlinx_coroutines_DisposableHandle$0).dispose_3nnxhr_k$ = function () {
    return this.function_1();
  };
  protoOf(sam$kotlinx_coroutines_DisposableHandle$0).getFunctionDelegate_jtodtf_k$ = function () {
    return this.function_1;
  };
  protoOf(sam$kotlinx_coroutines_DisposableHandle$0).equals = function (other) {
    var tmp;
    if (!(other == null) ? isInterface(other, DisposableHandle) : false) {
      var tmp_0;
      if (!(other == null) ? isInterface(other, FunctionAdapter) : false) {
        tmp_0 = equals(this.getFunctionDelegate_jtodtf_k$(), other.getFunctionDelegate_jtodtf_k$());
      } else {
        tmp_0 = false;
      }
      tmp = tmp_0;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(sam$kotlinx_coroutines_DisposableHandle$0).hashCode = function () {
    return hashCode(this.getFunctionDelegate_jtodtf_k$());
  };
  function TestCoroutineScheduler$registerEvent$lambda($isCancelled, $marker) {
    return function () {
      return $isCancelled($marker);
    };
  }
  function TestCoroutineScheduler$registerEvent$lambda_0(this$0, $event) {
    return function () {
      // Inline function 'kotlinx.coroutines.internal.synchronized' call
      // Inline function 'kotlinx.coroutines.internal.synchronizedImpl' call
      this$0.lock_1;
      this$0.events_1.remove_eovuyk_k$($event);
      return Unit_getInstance();
    };
  }
  function TestCoroutineScheduler$advanceUntilIdle$lambda(this$0) {
    return function () {
      return none(this$0.events_1, isForeground$factory());
    };
  }
  function TestCoroutineScheduler$isIdle$lambda(it) {
    return !it.isCancelled_1();
  }
  function TestCoroutineScheduler$timeSource$1(this$0) {
    this.this$0__1 = this$0;
    AbstractLongTimeSource.call(this, DurationUnit_MILLISECONDS_getInstance());
  }
  protoOf(TestCoroutineScheduler$timeSource$1).read_22xsm_k$ = function () {
    return this.this$0__1.get_currentTime_nu5t31_k$();
  };
  function TestCoroutineScheduler() {
    Key_getInstance_2();
    AbstractCoroutineContextElement.call(this, Key_getInstance_2());
    this.events_1 = new ThreadSafeHeap();
    this.lock_1 = new SynchronizedObject();
    this.count_1 = atomic$long$1(new Long(0, 0));
    this.currentTime_1 = new Long(0, 0);
    this.dispatchEventsForeground_1 = Channel(-1);
    this.dispatchEvents_1 = Channel(-1);
    var tmp = this;
    tmp.timeSource_1 = new TestCoroutineScheduler$timeSource$1(this);
  }
  protoOf(TestCoroutineScheduler).get_currentTime_nu5t31_k$ = function () {
    // Inline function 'kotlinx.coroutines.internal.synchronized' call
    // Inline function 'kotlinx.coroutines.internal.synchronizedImpl' call
    this.lock_1;
    return this.currentTime_1;
  };
  protoOf(TestCoroutineScheduler).registerEvent_m8gs5m_k$ = function (dispatcher, timeDeltaMillis, marker, context, isCancelled) {
    // Inline function 'kotlin.require' call
    if (!(timeDeltaMillis.compareTo_9jj042_k$(new Long(0, 0)) >= 0)) {
      var message = 'Attempted scheduling an event earlier in time (with the time delta ' + timeDeltaMillis.toString() + ')';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    checkSchedulerInContext(this, context);
    var count = this.count_1.atomicfu$getAndIncrement$long();
    var isForeground = context.get_y2st91_k$(BackgroundWork_getInstance()) === null;
    // Inline function 'kotlinx.coroutines.internal.synchronized' call
    // Inline function 'kotlinx.coroutines.internal.synchronizedImpl' call
    this.lock_1;
    var time = addClamping(this.get_currentTime_nu5t31_k$(), timeDeltaMillis);
    var tmp = !(marker == null) ? marker : THROW_CCE();
    var event = new TestDispatchEvent(dispatcher, count, time, tmp, isForeground, TestCoroutineScheduler$registerEvent$lambda(isCancelled, marker));
    this.events_1.addLast_xb00cf_k$(event);
    this.sendDispatchEvent_ye1q49_k$(context);
    var tmp_0 = TestCoroutineScheduler$registerEvent$lambda_0(this, event);
    return new sam$kotlinx_coroutines_DisposableHandle$0(tmp_0);
  };
  protoOf(TestCoroutineScheduler).tryRunNextTaskUnless_463vnb_k$ = function (condition) {
    // Inline function 'kotlinx.coroutines.internal.synchronized' call
    // Inline function 'kotlinx.coroutines.internal.synchronizedImpl' call
    this.lock_1;
    if (condition())
      return false;
    var tmp0_elvis_lhs = this.events_1.removeFirstOrNull_eges3a_k$();
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return false;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var event = tmp;
    if (this.get_currentTime_nu5t31_k$().compareTo_9jj042_k$(event.time_1) > 0) {
      currentTimeAheadOfEvents();
    }
    this.currentTime_1 = event.time_1;
    var event_0 = event;
    event_0.dispatcher_1.processEvent_53mmqp_k$(event_0.marker_1);
    return true;
  };
  protoOf(TestCoroutineScheduler).advanceUntilIdle_8tvggw_k$ = function () {
    return this.advanceUntilIdleOr_uf407m_k$(TestCoroutineScheduler$advanceUntilIdle$lambda(this));
  };
  protoOf(TestCoroutineScheduler).advanceUntilIdleOr_uf407m_k$ = function (condition) {
    while (true) {
      if (!this.tryRunNextTaskUnless_463vnb_k$(condition))
        return Unit_getInstance();
    }
  };
  protoOf(TestCoroutineScheduler).runCurrent_52uyci_k$ = function () {
    // Inline function 'kotlinx.coroutines.internal.synchronized' call
    // Inline function 'kotlinx.coroutines.internal.synchronizedImpl' call
    this.lock_1;
    var timeMark = this.get_currentTime_nu5t31_k$();
    while (true) {
      // Inline function 'kotlinx.coroutines.internal.synchronized' call
      // Inline function 'kotlinx.coroutines.internal.synchronizedImpl' call
      this.lock_1;
      var tmp0 = this.events_1;
      var tmp$ret$3;
      $l$block: {
        // Inline function 'kotlinx.coroutines.internal.ThreadSafeHeap.removeFirstIf' call
        // Inline function 'kotlinx.coroutines.internal.synchronized' call
        // Inline function 'kotlinx.coroutines.internal.synchronizedImpl' call
        var tmp0_elvis_lhs = tmp0.firstImpl_vmtgf1_k$();
        var tmp;
        if (tmp0_elvis_lhs == null) {
          tmp$ret$3 = null;
          break $l$block;
        } else {
          tmp = tmp0_elvis_lhs;
        }
        var first = tmp;
        var tmp_0;
        if (first.time_1.compareTo_9jj042_k$(timeMark) <= 0) {
          tmp_0 = tmp0.removeAtImpl_z3pjcy_k$(0);
        } else {
          tmp_0 = null;
        }
        tmp$ret$3 = tmp_0;
      }
      var tmp0_elvis_lhs_0 = tmp$ret$3;
      var tmp_1;
      if (tmp0_elvis_lhs_0 == null) {
        return Unit_getInstance();
      } else {
        tmp_1 = tmp0_elvis_lhs_0;
      }
      var event = tmp_1;
      event.dispatcher_1.processEvent_53mmqp_k$(event.marker_1);
    }
  };
  protoOf(TestCoroutineScheduler).advanceTimeBy_un16x4_k$ = function (delayTimeMillis) {
    // Inline function 'kotlin.time.Companion.milliseconds' call
    Companion_getInstance_0();
    var tmp$ret$0 = toDuration_0(delayTimeMillis, DurationUnit_MILLISECONDS_getInstance());
    return this.advanceTimeBy_s4cb4f_k$(tmp$ret$0);
  };
  protoOf(TestCoroutineScheduler).advanceTimeBy_s4cb4f_k$ = function (delayTime) {
    // Inline function 'kotlin.require' call
    if (!!Duration__isNegative_impl_pbysfa(delayTime)) {
      var message = 'Can not advance time by a negative delay: ' + Duration__toString_impl_8d916b(delayTime);
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    var startingTime = this.get_currentTime_nu5t31_k$();
    var targetTime = addClamping(startingTime, _Duration___get_inWholeMilliseconds__impl__msfiry(delayTime));
    while (true) {
      // Inline function 'kotlinx.coroutines.internal.synchronized' call
      // Inline function 'kotlinx.coroutines.internal.synchronizedImpl' call
      this.lock_1;
      var timeMark = this.get_currentTime_nu5t31_k$();
      var tmp0 = this.events_1;
      var tmp$ret$2;
      $l$block: {
        // Inline function 'kotlinx.coroutines.internal.ThreadSafeHeap.removeFirstIf' call
        // Inline function 'kotlinx.coroutines.internal.synchronized' call
        // Inline function 'kotlinx.coroutines.internal.synchronizedImpl' call
        var tmp0_elvis_lhs = tmp0.firstImpl_vmtgf1_k$();
        var tmp;
        if (tmp0_elvis_lhs == null) {
          tmp$ret$2 = null;
          break $l$block;
        } else {
          tmp = tmp0_elvis_lhs;
        }
        var first = tmp;
        var tmp_0;
        if (targetTime.compareTo_9jj042_k$(first.time_1) > 0) {
          tmp_0 = tmp0.removeAtImpl_z3pjcy_k$(0);
        } else {
          tmp_0 = null;
        }
        tmp$ret$2 = tmp_0;
      }
      var event = tmp$ret$2;
      var tmp_1;
      if (event == null) {
        this.currentTime_1 = targetTime;
        return Unit_getInstance();
      } else if (timeMark.compareTo_9jj042_k$(event.time_1) > 0) {
        currentTimeAheadOfEvents();
      } else {
        this.currentTime_1 = event.time_1;
        tmp_1 = event;
      }
      var event_0 = tmp_1;
      event_0.dispatcher_1.processEvent_53mmqp_k$(event_0.marker_1);
    }
  };
  protoOf(TestCoroutineScheduler).isIdle_3dr16f_k$ = function (strict) {
    // Inline function 'kotlinx.coroutines.internal.synchronized' call
    // Inline function 'kotlinx.coroutines.internal.synchronizedImpl' call
    this.lock_1;
    var tmp;
    if (strict) {
      tmp = this.events_1.get_isEmpty_zauvru_k$();
    } else {
      tmp = none(this.events_1, TestCoroutineScheduler$isIdle$lambda);
    }
    return tmp;
  };
  protoOf(TestCoroutineScheduler).isIdle$default_tnis21_k$ = function (strict, $super) {
    strict = strict === VOID ? true : strict;
    return $super === VOID ? this.isIdle_3dr16f_k$(strict) : $super.isIdle_3dr16f_k$.call(this, strict);
  };
  protoOf(TestCoroutineScheduler).sendDispatchEvent_ye1q49_k$ = function (context) {
    this.dispatchEvents_1.trySend_62dpg8_k$(Unit_getInstance());
    if (!(context.get_y2st91_k$(BackgroundWork_getInstance()) === BackgroundWork_getInstance())) {
      this.dispatchEventsForeground_1.trySend_62dpg8_k$(Unit_getInstance());
    }
  };
  protoOf(TestCoroutineScheduler).receiveDispatchEvent_2tq1h6_k$ = function ($completion) {
    return this.dispatchEvents_1.receive_awoumx_k$($completion);
  };
  protoOf(TestCoroutineScheduler).get_onDispatchEvent_odbwua_k$ = function () {
    return this.dispatchEvents_1.get_onReceive_mimw11_k$();
  };
  protoOf(TestCoroutineScheduler).get_onDispatchEventForeground_j022bl_k$ = function () {
    return this.dispatchEventsForeground_1.get_onReceive_mimw11_k$();
  };
  protoOf(TestCoroutineScheduler).get_timeSource_74n3n3_k$ = function () {
    return this.timeSource_1;
  };
  function BackgroundWork() {
    BackgroundWork_instance = this;
  }
  protoOf(BackgroundWork).get_key_18j28a_k$ = function () {
    return this;
  };
  protoOf(BackgroundWork).toString = function () {
    return 'BackgroundWork';
  };
  var BackgroundWork_instance;
  function BackgroundWork_getInstance() {
    if (BackgroundWork_instance == null)
      new BackgroundWork();
    return BackgroundWork_instance;
  }
  function checkSchedulerInContext(scheduler, context) {
    var tmp3_safe_receiver = context.get_y2st91_k$(Key_getInstance_2());
    if (tmp3_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.check' call
      if (!(tmp3_safe_receiver === scheduler)) {
        var message = 'Detected use of different schedulers. If you need to use several test coroutine dispatchers, create one `TestCoroutineScheduler` and pass it to each of them.';
        throw IllegalStateException_init_$Create$(toString(message));
      }
    }
  }
  function _get_count__iw3m8u_0($this) {
    return $this.count_1;
  }
  function TestDispatchEvent(dispatcher, count, time, marker, isForeground, isCancelled) {
    this.dispatcher_1 = dispatcher;
    this.count_1 = count;
    this.time_1 = time;
    this.marker_1 = marker;
    this.isForeground_1 = isForeground;
    this.isCancelled_1 = isCancelled;
    this.heap_1 = null;
    this.index_1 = 0;
  }
  protoOf(TestDispatchEvent).get_dispatcher_usy1bk_k$ = function () {
    return this.dispatcher_1;
  };
  protoOf(TestDispatchEvent).get_time_wouyhi_k$ = function () {
    return this.time_1;
  };
  protoOf(TestDispatchEvent).get_marker_gj00g3_k$ = function () {
    return this.marker_1;
  };
  protoOf(TestDispatchEvent).get_isForeground_28ny3a_k$ = function () {
    return this.isForeground_1;
  };
  protoOf(TestDispatchEvent).get_isCancelled_trk8pu_k$ = function () {
    return this.isCancelled_1;
  };
  protoOf(TestDispatchEvent).set_heap_4p1k8t_k$ = function (_set____db54di) {
    this.heap_1 = _set____db54di;
  };
  protoOf(TestDispatchEvent).get_heap_won7ed_k$ = function () {
    return this.heap_1;
  };
  protoOf(TestDispatchEvent).set_index_69f5xp_k$ = function (_set____db54di) {
    this.index_1 = _set____db54di;
  };
  protoOf(TestDispatchEvent).get_index_it478p_k$ = function () {
    return this.index_1;
  };
  protoOf(TestDispatchEvent).compareTo_6ikeiu_k$ = function (other) {
    return compareValuesBy(this, other, [time$factory(), count$factory()]);
  };
  protoOf(TestDispatchEvent).compareTo_hpufkf_k$ = function (other) {
    return this.compareTo_6ikeiu_k$(other instanceof TestDispatchEvent ? other : THROW_CCE());
  };
  protoOf(TestDispatchEvent).toString = function () {
    return 'TestDispatchEvent(time=' + this.time_1.toString() + ', dispatcher=' + this.dispatcher_1.toString() + (this.isForeground_1 ? '' : ', background') + ')';
  };
  function addClamping(a, b) {
    // Inline function 'kotlin.let' call
    var it = a.plus_r93sks_k$(b);
    return it.compareTo_9jj042_k$(new Long(0, 0)) >= 0 ? it : new Long(-1, 2147483647);
  }
  function currentTimeAheadOfEvents() {
    invalidSchedulerState();
  }
  function none(_this__u8e3s4, predicate) {
    return _this__u8e3s4.find_aasy2v_k$(predicate) == null;
  }
  function invalidSchedulerState() {
    throw IllegalStateException_init_$Create$('The test scheduler entered an invalid state. Please report this at https://github.com/Kotlin/kotlinx.coroutines/issues.');
  }
  function isForeground$factory() {
    return getPropertyCallableRef('isForeground', 1, KProperty1, function (receiver) {
      return receiver.isForeground_1;
    }, null);
  }
  function time$factory() {
    return getPropertyCallableRef('time', 1, KProperty1, function (receiver) {
      return receiver.time_1;
    }, null);
  }
  function count$factory() {
    return getPropertyCallableRef('count', 1, KProperty1, function (receiver) {
      return receiver.count_1;
    }, null);
  }
  function cancellableRunnableIsCancelled$ref() {
    var l = function (p0) {
      return cancellableRunnableIsCancelled(p0);
    };
    l.callableName = 'cancellableRunnableIsCancelled';
    return l;
  }
  function TestDispatcher$invokeOnTimeout$lambda(it) {
    return false;
  }
  function TestDispatcher() {
    CoroutineDispatcher.call(this);
  }
  protoOf(TestDispatcher).processEvent_53mmqp_k$ = function (marker) {
    // Inline function 'kotlin.check' call
    if (!isInterface(marker, Runnable)) {
      throw IllegalStateException_init_$Create$('Check failed.');
    }
    marker.run_mvkpxh_k$();
  };
  protoOf(TestDispatcher).scheduleResumeAfterDelay_ohc91i_k$ = function (timeMillis, continuation) {
    var timedRunnable = new CancellableContinuationRunnable(continuation, this);
    var tmp = this.get_scheduler_5uu87m_k$();
    var tmp_0 = continuation.get_context_h02k06_k$();
    var handle = tmp.registerEvent_m8gs5m_k$(this, timeMillis, timedRunnable, tmp_0, cancellableRunnableIsCancelled$ref());
    disposeOnCancellation(continuation, handle);
  };
  protoOf(TestDispatcher).invokeOnTimeout_x4e3ys_k$ = function (timeMillis, block, context) {
    var tmp = this.get_scheduler_5uu87m_k$();
    return tmp.registerEvent_m8gs5m_k$(this, timeMillis, block, context, TestDispatcher$invokeOnTimeout$lambda);
  };
  protoOf(TestDispatcher).timeoutMessage_txb273_k$ = function (timeout) {
    return 'Timed out after ' + Duration__toString_impl_8d916b(timeout) + ' of _virtual_ (kotlinx.coroutines.test) time. ' + "To use the real time, wrap 'withTimeout' in 'withContext(Dispatchers.Default.limitedParallelism(1))'";
  };
  function _get_dispatcher__dketks($this) {
    return $this.dispatcher_1;
  }
  function CancellableContinuationRunnable(continuation, dispatcher) {
    this.continuation_1 = continuation;
    this.dispatcher_1 = dispatcher;
  }
  protoOf(CancellableContinuationRunnable).get_continuation_7yron4_k$ = function () {
    return this.continuation_1;
  };
  protoOf(CancellableContinuationRunnable).run_mvkpxh_k$ = function () {
    // Inline function 'kotlin.with' call
    var $this$with = this.dispatcher_1;
    // Inline function 'kotlin.with' call
    this.continuation_1.resumeUndispatched_tyhwz7_k$($this$with, Unit_getInstance());
    return Unit_getInstance();
  };
  function cancellableRunnableIsCancelled(runnable) {
    return !runnable.continuation_1.get_isActive_quafmh_k$();
  }
  function set_catchNonTestRelatedExceptions(_set____db54di) {
    catchNonTestRelatedExceptions = _set____db54di;
  }
  function get_catchNonTestRelatedExceptions() {
    return catchNonTestRelatedExceptions;
  }
  var catchNonTestRelatedExceptions;
  function TestScope() {
  }
  function advanceUntilIdle(_this__u8e3s4) {
    return _this__u8e3s4.get_testScheduler_77amg0_k$().advanceUntilIdle_8tvggw_k$();
  }
  function TestScope_0(context) {
    context = context === VOID ? EmptyCoroutineContext_getInstance() : context;
    var ctxWithDispatcher = withDelaySkipping(context);
    var scope = {_v: null};
    var tmp;
    if (ctxWithDispatcher.get_y2st91_k$(Key_getInstance_0()) == null) {
      // Inline function 'kotlinx.coroutines.CoroutineExceptionHandler' call
      tmp = new TestScope$$inlined$CoroutineExceptionHandler$1(scope);
    } else {
      throw IllegalArgumentException_init_$Create$('A CoroutineExceptionHandler was passed to TestScope. Please pass it as an argument to a `launch` or `async` block on an already-created scope if uncaught exceptions require special treatment.');
    }
    var exceptionHandler = tmp;
    // Inline function 'kotlin.also' call
    var this_0 = new TestScopeImpl(ctxWithDispatcher.plus_s13ygv_k$(exceptionHandler));
    scope._v = this_0;
    return this_0;
  }
  function _set_entered__py7xta($this, _set____db54di) {
    $this.entered_1 = _set____db54di;
  }
  function _get_entered__bznga($this) {
    return $this.entered_1;
  }
  function _set_finished__nxw66z($this, _set____db54di) {
    $this.finished_1 = _set____db54di;
  }
  function _get_finished__yabkbd($this) {
    return $this.finished_1;
  }
  function _get_uncaughtExceptions__gr4qdq($this) {
    return $this.uncaughtExceptions_1;
  }
  function _get_lock__d9xa4g_0($this) {
    return $this.lock_1;
  }
  function TestScopeImpl$backgroundScope$lambda(this$0) {
    return function (it) {
      var tmp;
      if (!(it instanceof CancellationException)) {
        this$0.reportException_dss86c_k$(it);
        tmp = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function TestScopeImpl$reportException$ref($boundThis) {
    var l = function (p0) {
      $boundThis.reportException_dss86c_k$(p0);
      return Unit_getInstance();
    };
    l.callableName = 'reportException';
    return l;
  }
  function TestScopeImpl$legacyLeave$lambda(it) {
    return it.get_isActive_quafmh_k$();
  }
  function TestScopeImpl(context) {
    AbstractCoroutine.call(this, context, true, true);
    this.entered_1 = false;
    this.finished_1 = false;
    var tmp = this;
    // Inline function 'kotlin.collections.mutableListOf' call
    tmp.uncaughtExceptions_1 = ArrayList_init_$Create$();
    this.lock_1 = new SynchronizedObject();
    var tmp_0 = this;
    var tmp_1 = this.get_coroutineContext_115oqo_k$().plus_s13ygv_k$(BackgroundWork_getInstance());
    tmp_0.backgroundScope_1 = CoroutineScope_0(tmp_1.plus_s13ygv_k$(new ReportingSupervisorJob(VOID, TestScopeImpl$backgroundScope$lambda(this))));
  }
  protoOf(TestScopeImpl).get_testScheduler_77amg0_k$ = function () {
    return ensureNotNull(this.get_context_h02k06_k$().get_y2st91_k$(Key_getInstance_2()));
  };
  protoOf(TestScopeImpl).get_backgroundScope_9rqckj_k$ = function () {
    return this.backgroundScope_1;
  };
  protoOf(TestScopeImpl).enter_h49n20_k$ = function () {
    // Inline function 'kotlinx.coroutines.internal.synchronized' call
    // Inline function 'kotlinx.coroutines.internal.synchronizedImpl' call
    this.lock_1;
    if (this.entered_1)
      throw IllegalStateException_init_$Create$('Only a single call to `runTest` can be performed during one test.');
    this.entered_1 = true;
    // Inline function 'kotlin.check' call
    if (!!this.finished_1) {
      throw IllegalStateException_init_$Create$('Check failed.');
    }
    // Inline function 'kotlin.run' call
    ensurePlatformExceptionHandlerLoaded(ExceptionCollector_getInstance());
    if (catchNonTestRelatedExceptions) {
      var tmp = ExceptionCollector_getInstance();
      tmp.addOnExceptionCallback_vgcj0u_k$(this.lock_1, TestScopeImpl$reportException$ref(this));
    }
    var exceptions = this.uncaughtExceptions_1;
    // Inline function 'kotlin.collections.isNotEmpty' call
    if (!exceptions.isEmpty_y1axqb_k$()) {
      ExceptionCollector_getInstance().removeOnExceptionCallback_mt3km5_k$(this.lock_1);
      // Inline function 'kotlin.apply' call
      var this_0 = new UncaughtExceptionsBeforeTest();
      var _iterator__ex2g4s = exceptions.iterator_jk1svi_k$();
      while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
        var e = _iterator__ex2g4s.next_20eer_k$();
        addSuppressed(this_0, e);
      }
      throw this_0;
    }
  };
  protoOf(TestScopeImpl).leave_1p8cl3_k$ = function () {
    // Inline function 'kotlinx.coroutines.internal.synchronized' call
    // Inline function 'kotlinx.coroutines.internal.synchronizedImpl' call
    this.lock_1;
    // Inline function 'kotlin.check' call
    if (!(this.entered_1 && !this.finished_1)) {
      throw IllegalStateException_init_$Create$('Check failed.');
    }
    ExceptionCollector_getInstance().removeOnExceptionCallback_mt3km5_k$(this.lock_1);
    this.finished_1 = true;
    return this.uncaughtExceptions_1;
  };
  protoOf(TestScopeImpl).legacyLeave_yqilpq_k$ = function () {
    // Inline function 'kotlinx.coroutines.internal.synchronized' call
    // Inline function 'kotlinx.coroutines.internal.synchronizedImpl' call
    this.lock_1;
    // Inline function 'kotlin.check' call
    if (!(this.entered_1 && !this.finished_1)) {
      throw IllegalStateException_init_$Create$('Check failed.');
    }
    ExceptionCollector_getInstance().removeOnExceptionCallback_mt3km5_k$(this.lock_1);
    this.finished_1 = true;
    var exceptions = this.uncaughtExceptions_1;
    var tmp = this.get_children_4cwbp4_k$();
    var activeJobs = toList(filter(tmp, TestScopeImpl$legacyLeave$lambda));
    if (exceptions.isEmpty_y1axqb_k$()) {
      // Inline function 'kotlin.collections.isNotEmpty' call
      if (!activeJobs.isEmpty_y1axqb_k$())
        throw new UncompletedCoroutinesError('Active jobs found during the tear-down. Ensure that all coroutines are completed or cancelled by your test. ' + ('The active jobs: ' + toString(activeJobs)));
      if (!this.get_testScheduler_77amg0_k$().isIdle$default_tnis21_k$())
        throw new UncompletedCoroutinesError('Unfinished coroutines found during the tear-down. Ensure that all coroutines are completed or cancelled by your test.');
    }
    return exceptions;
  };
  protoOf(TestScopeImpl).reportException_dss86c_k$ = function (throwable) {
    // Inline function 'kotlinx.coroutines.internal.synchronized' call
    // Inline function 'kotlinx.coroutines.internal.synchronizedImpl' call
    this.lock_1;
    if (this.finished_1) {
      throw throwable;
    } else {
      var _iterator__ex2g4s = this.uncaughtExceptions_1.iterator_jk1svi_k$();
      while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
        var existingThrowable = _iterator__ex2g4s.next_20eer_k$();
        if (equals(unwrap(throwable), unwrap(existingThrowable)))
          return Unit_getInstance();
      }
      this.uncaughtExceptions_1.add_utx5q5_k$(throwable);
      if (!this.entered_1) {
        // Inline function 'kotlin.apply' call
        var this_0 = new UncaughtExceptionsBeforeTest();
        addSuppressed(this_0, throwable);
        throw this_0;
      }
    }
  };
  protoOf(TestScopeImpl).tryGetCompletionCause_o6y0xa_k$ = function () {
    return this.get_completionCause_bxx3i4_k$();
  };
  protoOf(TestScopeImpl).toString = function () {
    return 'TestScope[' + (this.finished_1 ? 'test ended' : this.entered_1 ? 'test started' : 'test not started') + ']';
  };
  function UncompletedCoroutinesError(message) {
    AssertionError_init_$Init$(message, this);
    captureStack(this, UncompletedCoroutinesError);
  }
  function asSpecificImplementation(_this__u8e3s4) {
    var tmp;
    if (_this__u8e3s4 instanceof TestScopeImpl) {
      tmp = _this__u8e3s4;
    } else {
      noWhenBranchMatchedException();
    }
    return tmp;
  }
  function withDelaySkipping(_this__u8e3s4) {
    var dispatcher = _this__u8e3s4.get_y2st91_k$(Key_getInstance_1());
    var tmp;
    if (dispatcher instanceof TestDispatcher) {
      var ctxScheduler = _this__u8e3s4.get_y2st91_k$(Key_getInstance_2());
      if (!(ctxScheduler == null)) {
        // Inline function 'kotlin.require' call
        if (!(dispatcher.get_scheduler_5uu87m_k$() === ctxScheduler)) {
          var message = 'Both a TestCoroutineScheduler ' + toString_0(ctxScheduler) + ' and TestDispatcher ' + dispatcher.toString() + ' linked to ' + 'another scheduler were passed.';
          throw IllegalArgumentException_init_$Create$(toString(message));
        }
      }
      tmp = dispatcher;
    } else {
      if (dispatcher == null) {
        tmp = StandardTestDispatcher(_this__u8e3s4.get_y2st91_k$(Key_getInstance_2()));
      } else {
        throw IllegalArgumentException_init_$Create$('Dispatcher must implement TestDispatcher: ' + toString_0(dispatcher));
      }
    }
    var dispatcher_0 = tmp;
    return _this__u8e3s4.plus_s13ygv_k$(dispatcher_0).plus_s13ygv_k$(dispatcher_0.get_scheduler_5uu87m_k$());
  }
  function UncaughtExceptionsBeforeTest() {
    IllegalStateException_init_$Init$('There were uncaught exceptions before the test started. Please avoid this, as such exceptions are also reported in a platform-dependent manner so that they are not lost.', this);
    captureStack(this, UncaughtExceptionsBeforeTest);
  }
  function TestScope$$inlined$CoroutineExceptionHandler$1($scope) {
    this.$scope_1 = $scope;
    AbstractCoroutineContextElement.call(this, Key_getInstance_0());
  }
  protoOf(TestScope$$inlined$CoroutineExceptionHandler$1).handleException_e679jj_k$ = function (context, exception) {
    ensureNotNull(this.$scope_1._v).reportException_dss86c_k$(exception);
    return Unit_getInstance();
  };
  function _get_lock__d9xa4g_1($this) {
    return $this.lock_1;
  }
  function _set_enabled__gwlwmc($this, _set____db54di) {
    $this.enabled_1 = _set____db54di;
  }
  function _get_enabled__8pmdqo($this) {
    return $this.enabled_1;
  }
  function _get_unprocessedExceptions__pqizt4($this) {
    return $this.unprocessedExceptions_1;
  }
  function _get_callbacks__bg494z($this) {
    return $this.callbacks_1;
  }
  function reportException($this, exception) {
    var executedACallback = false;
    var _iterator__ex2g4s = $this.callbacks_1.get_values_ksazhn_k$().iterator_jk1svi_k$();
    while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
      var callback = _iterator__ex2g4s.next_20eer_k$();
      callback(exception);
      executedACallback = true;
    }
    return executedACallback;
  }
  function ExceptionCollector() {
    ExceptionCollector_instance = this;
    AbstractCoroutineContextElement.call(this, Key_getInstance_0());
    this.lock_1 = new SynchronizedObject();
    this.enabled_1 = false;
    var tmp = this;
    // Inline function 'kotlin.collections.mutableListOf' call
    tmp.unprocessedExceptions_1 = ArrayList_init_$Create$();
    var tmp_0 = this;
    // Inline function 'kotlin.collections.mutableMapOf' call
    tmp_0.callbacks_1 = LinkedHashMap_init_$Create$();
  }
  protoOf(ExceptionCollector).addOnExceptionCallback_vgcj0u_k$ = function (owner, callback) {
    // Inline function 'kotlinx.coroutines.internal.synchronized' call
    // Inline function 'kotlinx.coroutines.internal.synchronizedImpl' call
    this.lock_1;
    ExceptionCollector_getInstance().enabled_1 = true;
    var previousValue = ExceptionCollector_getInstance().callbacks_1.put_4fpzoq_k$(owner, callback);
    // Inline function 'kotlin.check' call
    if (!(previousValue === null)) {
      throw IllegalStateException_init_$Create$('Check failed.');
    }
    // Inline function 'kotlin.collections.forEach' call
    var _iterator__ex2g4s = ExceptionCollector_getInstance().unprocessedExceptions_1.iterator_jk1svi_k$();
    while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
      var element = _iterator__ex2g4s.next_20eer_k$();
      reportException(ExceptionCollector_getInstance(), element);
    }
    ExceptionCollector_getInstance().unprocessedExceptions_1.clear_j9egeb_k$();
    return Unit_getInstance();
  };
  protoOf(ExceptionCollector).removeOnExceptionCallback_mt3km5_k$ = function (owner) {
    // Inline function 'kotlinx.coroutines.internal.synchronized' call
    // Inline function 'kotlinx.coroutines.internal.synchronizedImpl' call
    this.lock_1;
    if (ExceptionCollector_getInstance().enabled_1) {
      var existingValue = ExceptionCollector_getInstance().callbacks_1.remove_gppy8k_k$(owner);
      // Inline function 'kotlin.check' call
      if (!!(existingValue === null)) {
        throw IllegalStateException_init_$Create$('Check failed.');
      }
    }
    return Unit_getInstance();
  };
  protoOf(ExceptionCollector).handleException_16kmwo_k$ = function (exception) {
    // Inline function 'kotlinx.coroutines.internal.synchronized' call
    // Inline function 'kotlinx.coroutines.internal.synchronizedImpl' call
    this.lock_1;
    if (!ExceptionCollector_getInstance().enabled_1)
      return false;
    if (reportException(ExceptionCollector_getInstance(), exception))
      return true;
    ExceptionCollector_getInstance().unprocessedExceptions_1.add_utx5q5_k$(exception);
    return false;
  };
  protoOf(ExceptionCollector).handleException_e679jj_k$ = function (context, exception) {
    if (this.handleException_16kmwo_k$(exception)) {
      throw ExceptionSuccessfullyProcessed_getInstance();
    }
  };
  protoOf(ExceptionCollector).equals = function (other) {
    var tmp;
    if (other instanceof ExceptionCollector) {
      tmp = true;
    } else {
      tmp = other instanceof ExceptionCollectorAsService;
    }
    return tmp;
  };
  var ExceptionCollector_instance;
  function ExceptionCollector_getInstance() {
    if (ExceptionCollector_instance == null)
      new ExceptionCollector();
    return ExceptionCollector_instance;
  }
  function ExceptionCollectorAsService() {
    this.$$delegate_0__1 = ExceptionCollector_getInstance();
  }
  protoOf(ExceptionCollectorAsService).handleException_e679jj_k$ = function (context, exception) {
    this.$$delegate_0__1.handleException_e679jj_k$(context, exception);
  };
  protoOf(ExceptionCollectorAsService).fold_j2vaxd_k$ = function (initial, operation) {
    return this.$$delegate_0__1.fold_j2vaxd_k$(initial, operation);
  };
  protoOf(ExceptionCollectorAsService).get_y2st91_k$ = function (key) {
    return this.$$delegate_0__1.get_y2st91_k$(key);
  };
  protoOf(ExceptionCollectorAsService).minusKey_9i5ggf_k$ = function (key) {
    return this.$$delegate_0__1.minusKey_9i5ggf_k$(key);
  };
  protoOf(ExceptionCollectorAsService).plus_s13ygv_k$ = function (context) {
    return this.$$delegate_0__1.plus_s13ygv_k$(context);
  };
  protoOf(ExceptionCollectorAsService).get_key_18j28a_k$ = function () {
    return this.$$delegate_0__1.get_key_18j28a_k$();
  };
  protoOf(ExceptionCollectorAsService).equals = function (other) {
    var tmp;
    if (other instanceof ExceptionCollectorAsService) {
      tmp = true;
    } else {
      tmp = other instanceof ExceptionCollector;
    }
    return tmp;
  };
  protoOf(ExceptionCollectorAsService).hashCode = function () {
    return hashCode(ExceptionCollector_getInstance());
  };
  function ReportingSupervisorJob(parent, onChildCancellation) {
    parent = parent === VOID ? null : parent;
    JobImpl.call(this, parent);
    this.onChildCancellation_1 = onChildCancellation;
  }
  protoOf(ReportingSupervisorJob).get_onChildCancellation_4qnvlj_k$ = function () {
    return this.onChildCancellation_1;
  };
  protoOf(ReportingSupervisorJob).childCancelled_hsnipy_k$ = function (cause) {
    try {
      this.onChildCancellation_1(cause);
    } catch ($p) {
      if ($p instanceof Error) {
        var e = $p;
        addSuppressed(cause, e);
        handleCoroutineException(this, cause);
      } else {
        throw $p;
      }
    }
    // Inline function 'kotlin.let' call
    return false;
  };
  function _get_name__das4rk_1($this) {
    return $this.name_1;
  }
  function _get_reader__fd8dw8($this) {
    return $this.reader_1;
  }
  function _get_readers__ktkge9($this) {
    return $this.readers_1;
  }
  function _get_writer__6q3d3c($this) {
    return $this.writer_1;
  }
  function _get_exceptionWhenReading__jlv5a0($this) {
    return $this.exceptionWhenReading_1;
  }
  function _get__value__22ek2v($this) {
    return $this._value_1;
  }
  function concurrentWW($this, location) {
    return IllegalStateException_init_$Create$_0($this.name_1 + ' is modified concurrently', location);
  }
  function concurrentRW($this, location) {
    return IllegalStateException_init_$Create$_0($this.name_1 + ' is used concurrently with setting it', location);
  }
  function _get_mainDispatcher__sm5ex7($this) {
    return $this.mainDispatcher_1;
  }
  function _set_delegate__v6dc6q($this, _set____db54di) {
    $this.delegate_1 = _set____db54di;
  }
  function _get_delegate__idh0py($this) {
    return $this.delegate_1;
  }
  function _get_delay__ikpy6q($this) {
    var tmp = $this.delegate_1.get_value_j01efc_k$();
    var tmp0_elvis_lhs = isInterface(tmp, Delay) ? tmp : null;
    var tmp_0;
    if (tmp0_elvis_lhs == null) {
      // Inline function 'kotlinx.coroutines.test.internal.defaultDelay' call
      tmp_0 = get_DefaultDelay();
    } else {
      tmp_0 = tmp0_elvis_lhs;
    }
    return tmp_0;
  }
  function Companion() {
    Companion_instance = this;
  }
  protoOf(Companion).get_currentTestDispatcher_ltwub3_k$ = function () {
    var tmp = Dispatchers_getInstance().get_Main_wo5vz6_k$();
    var tmp7_safe_receiver = tmp instanceof TestMainDispatcher ? tmp : null;
    var tmp8_safe_receiver = tmp7_safe_receiver == null ? null : tmp7_safe_receiver.delegate_1;
    var tmp_0 = tmp8_safe_receiver == null ? null : tmp8_safe_receiver.get_value_j01efc_k$();
    return tmp_0 instanceof TestDispatcher ? tmp_0 : null;
  };
  protoOf(Companion).get_currentTestScheduler_5pq64f_k$ = function () {
    var tmp9_safe_receiver = this.get_currentTestDispatcher_ltwub3_k$();
    return tmp9_safe_receiver == null ? null : tmp9_safe_receiver.get_scheduler_5uu87m_k$();
  };
  var Companion_instance;
  function Companion_getInstance_1() {
    if (Companion_instance == null)
      new Companion();
    return Companion_instance;
  }
  function NonConcurrentlyModifiable(initialValue, name) {
    this.name_1 = name;
    this.reader_1 = atomic$ref$1(null);
    this.readers_1 = atomic$int$1(0);
    this.writer_1 = atomic$ref$1(null);
    this.exceptionWhenReading_1 = atomic$ref$1(null);
    this._value_1 = atomic$ref$1(initialValue);
  }
  protoOf(NonConcurrentlyModifiable).set_value_v1vabv_k$ = function (value) {
    var tmp11_safe_receiver = this.exceptionWhenReading_1.atomicfu$getAndSet(null);
    if (tmp11_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      throw tmp11_safe_receiver;
    }
    if (!(this.readers_1.get_kotlinx$atomicfu$value_vi2am5_k$() === 0)) {
      var tmp12_safe_receiver = this.reader_1.get_kotlinx$atomicfu$value_vi2am5_k$();
      if (tmp12_safe_receiver == null)
        null;
      else {
        // Inline function 'kotlin.let' call
        throw concurrentRW(this, tmp12_safe_receiver);
      }
    }
    var writerLocation = newThrowable('other writer location');
    var tmp13_safe_receiver = this.writer_1.atomicfu$getAndSet(writerLocation);
    if (tmp13_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      throw concurrentWW(this, tmp13_safe_receiver);
    }
    this._value_1.set_kotlinx$atomicfu$value_508e3y_k$(value);
    this.writer_1.atomicfu$compareAndSet(writerLocation, null);
    if (!(this.readers_1.get_kotlinx$atomicfu$value_vi2am5_k$() === 0)) {
      var tmp14_safe_receiver = this.reader_1.get_kotlinx$atomicfu$value_vi2am5_k$();
      if (tmp14_safe_receiver == null)
        null;
      else {
        // Inline function 'kotlin.let' call
        throw concurrentRW(this, tmp14_safe_receiver);
      }
    }
  };
  protoOf(NonConcurrentlyModifiable).get_value_j01efc_k$ = function () {
    this.reader_1.set_kotlinx$atomicfu$value_508e3y_k$(newThrowable('reader location'));
    this.readers_1.atomicfu$incrementAndGet();
    var tmp10_safe_receiver = this.writer_1.get_kotlinx$atomicfu$value_vi2am5_k$();
    if (tmp10_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      this.exceptionWhenReading_1.set_kotlinx$atomicfu$value_508e3y_k$(concurrentRW(this, tmp10_safe_receiver));
    }
    var result = this._value_1.get_kotlinx$atomicfu$value_vi2am5_k$();
    this.readers_1.atomicfu$decrementAndGet();
    return result;
  };
  function TestMainDispatcher(delegate) {
    Companion_getInstance_1();
    MainCoroutineDispatcher.call(this);
    this.mainDispatcher_1 = delegate;
    this.delegate_1 = new NonConcurrentlyModifiable(this.mainDispatcher_1, 'Dispatchers.Main');
  }
  protoOf(TestMainDispatcher).get_immediate_r3y8eg_k$ = function () {
    var tmp = this.delegate_1.get_value_j01efc_k$();
    var tmp6_safe_receiver = tmp instanceof MainCoroutineDispatcher ? tmp : null;
    var tmp0_elvis_lhs = tmp6_safe_receiver == null ? null : tmp6_safe_receiver.get_immediate_r3y8eg_k$();
    return tmp0_elvis_lhs == null ? this : tmp0_elvis_lhs;
  };
  protoOf(TestMainDispatcher).dispatch_qa3n0o_k$ = function (context, block) {
    return this.delegate_1.get_value_j01efc_k$().dispatch_qa3n0o_k$(context, block);
  };
  protoOf(TestMainDispatcher).isDispatchNeeded_ft82v4_k$ = function (context) {
    return this.delegate_1.get_value_j01efc_k$().isDispatchNeeded_ft82v4_k$(context);
  };
  protoOf(TestMainDispatcher).dispatchYield_t7bwip_k$ = function (context, block) {
    return this.delegate_1.get_value_j01efc_k$().dispatchYield_t7bwip_k$(context, block);
  };
  protoOf(TestMainDispatcher).setDispatcher_xex7l2_k$ = function (dispatcher) {
    this.delegate_1.set_value_v1vabv_k$(dispatcher);
  };
  protoOf(TestMainDispatcher).resetDispatcher_q10y2u_k$ = function () {
    this.delegate_1.set_value_v1vabv_k$(this.mainDispatcher_1);
  };
  protoOf(TestMainDispatcher).scheduleResumeAfterDelay_ohc91i_k$ = function (timeMillis, continuation) {
    return _get_delay__ikpy6q(this).scheduleResumeAfterDelay_ohc91i_k$(timeMillis, continuation);
  };
  protoOf(TestMainDispatcher).invokeOnTimeout_x4e3ys_k$ = function (timeMillis, block, context) {
    return _get_delay__ikpy6q(this).invokeOnTimeout_x4e3ys_k$(timeMillis, block, context);
  };
  function get_defaultDelay() {
    return get_DefaultDelay();
  }
  function systemPropertyImpl(name) {
    return null;
  }
  function createTestResult(testProcedure) {
    var tmp = GlobalScope_getInstance();
    var tmp_0 = promise(tmp, VOID, VOID, createTestResult$slambda_0(testProcedure, null));
    return tmp_0 instanceof Promise ? tmp_0 : THROW_CCE();
  }
  function dumpCoroutines() {
  }
  function createTestResult$slambda($testProcedure, resultContinuation) {
    this.$testProcedure_1 = $testProcedure;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(createTestResult$slambda).invoke_d9fzmj_k$ = function ($this$promise, $completion) {
    var tmp = this.create_rcuf4x_k$($this$promise, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(createTestResult$slambda).invoke_qns8j1_k$ = function (p1, $completion) {
    return this.invoke_d9fzmj_k$((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(createTestResult$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = this.$testProcedure_1(this.$this$promise_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            return Unit_getInstance();
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
  protoOf(createTestResult$slambda).create_rcuf4x_k$ = function ($this$promise, completion) {
    var i = new createTestResult$slambda(this.$testProcedure_1, completion);
    i.$this$promise_1 = $this$promise;
    return i;
  };
  protoOf(createTestResult$slambda).create_wyq9v6_k$ = function (value, completion) {
    return this.create_rcuf4x_k$((!(value == null) ? isInterface(value, CoroutineScope) : false) ? value : THROW_CCE(), completion);
  };
  function createTestResult$slambda_0($testProcedure, resultContinuation) {
    var i = new createTestResult$slambda($testProcedure, resultContinuation);
    var l = function ($this$promise, $completion) {
      return i.invoke_d9fzmj_k$($this$promise, $completion);
    };
    l.$arity = 1;
    return l;
  }
  //region block: post-declaration
  protoOf(RunningInRunTest).get_y2st91_k$ = get;
  protoOf(RunningInRunTest).fold_j2vaxd_k$ = fold;
  protoOf(RunningInRunTest).minusKey_9i5ggf_k$ = minusKey;
  protoOf(RunningInRunTest).plus_s13ygv_k$ = plus;
  protoOf(TestDispatcher).delay_xigjxo_k$ = delay;
  protoOf(BackgroundWork).get_y2st91_k$ = get;
  protoOf(BackgroundWork).fold_j2vaxd_k$ = fold;
  protoOf(BackgroundWork).minusKey_9i5ggf_k$ = minusKey;
  protoOf(BackgroundWork).plus_s13ygv_k$ = plus;
  protoOf(TestMainDispatcher).delay_xigjxo_k$ = delay;
  //endregion
  //region block: init
  catchNonTestRelatedExceptions = true;
  //endregion
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = TestScope_0;
  _.$_$.b = TestScope;
  _.$_$.c = UnconfinedTestDispatcher;
  _.$_$.d = advanceUntilIdle;
  _.$_$.e = runTest;
  //endregion
  return _;
}));

//# sourceMappingURL=kotlinx-coroutines-test.js.map
