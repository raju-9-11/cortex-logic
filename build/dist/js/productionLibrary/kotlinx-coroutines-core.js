(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js', './kotlinx-atomicfu.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'), require('./kotlinx-atomicfu.js'));
  else {
    if (typeof globalThis['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'kotlinx-coroutines-core'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'kotlinx-coroutines-core'.");
    }
    if (typeof globalThis['kotlinx-atomicfu'] === 'undefined') {
      throw new Error("Error loading module 'kotlinx-coroutines-core'. Its dependency 'kotlinx-atomicfu' was not found. Please, check whether 'kotlinx-atomicfu' is loaded prior to 'kotlinx-coroutines-core'.");
    }
    globalThis['kotlinx-coroutines-core'] = factory(typeof globalThis['kotlinx-coroutines-core'] === 'undefined' ? {} : globalThis['kotlinx-coroutines-core'], globalThis['kotlin-kotlin-stdlib'], globalThis['kotlinx-atomicfu']);
  }
}(function (_, kotlin_kotlin, kotlin_org_jetbrains_kotlinx_atomicfu) {
  'use strict';
  //region block: imports
  var imul = Math.imul;
  var Unit_instance = kotlin_kotlin.$_$.i5;
  var protoOf = kotlin_kotlin.$_$.ic;
  var THROW_CCE = kotlin_kotlin.$_$.wg;
  var Continuation = kotlin_kotlin.$_$.ba;
  var initMetadataForClass = kotlin_kotlin.$_$.eb;
  var VOID = kotlin_kotlin.$_$.i;
  var EmptyCoroutineContext_getInstance = kotlin_kotlin.$_$.o4;
  var createCoroutineUnintercepted = kotlin_kotlin.$_$.t9;
  var CoroutineImpl = kotlin_kotlin.$_$.ha;
  var get_COROUTINE_SUSPENDED = kotlin_kotlin.$_$.r9;
  var initMetadataForCoroutine = kotlin_kotlin.$_$.gb;
  var initMetadataForInterface = kotlin_kotlin.$_$.ib;
  var UnsupportedOperationException_init_$Create$ = kotlin_kotlin.$_$.o2;
  var toString = kotlin_kotlin.$_$.mc;
  var isInterface = kotlin_kotlin.$_$.tb;
  var IllegalStateException_init_$Create$ = kotlin_kotlin.$_$.a2;
  var toString_0 = kotlin_kotlin.$_$.bi;
  var atomic$int$1 = kotlin_org_jetbrains_kotlinx_atomicfu.$_$.e;
  var atomic$ref$1 = kotlin_org_jetbrains_kotlinx_atomicfu.$_$.d;
  var initMetadataForObject = kotlin_kotlin.$_$.kb;
  var hashCode = kotlin_kotlin.$_$.db;
  var equals = kotlin_kotlin.$_$.xa;
  var atomic$boolean$1 = kotlin_org_jetbrains_kotlinx_atomicfu.$_$.b;
  var CancellationException_init_$Create$ = kotlin_kotlin.$_$.d1;
  var Result__exceptionOrNull_impl_p6xea9 = kotlin_kotlin.$_$.z2;
  var _Result___get_value__impl__bjfvqg = kotlin_kotlin.$_$.c3;
  var AbstractCoroutineContextKey = kotlin_kotlin.$_$.x9;
  var Key_instance = kotlin_kotlin.$_$.n4;
  var AbstractCoroutineContextElement = kotlin_kotlin.$_$.w9;
  var get = kotlin_kotlin.$_$.y9;
  var minusKey = kotlin_kotlin.$_$.z9;
  var ContinuationInterceptor = kotlin_kotlin.$_$.aa;
  var RuntimeException_init_$Create$ = kotlin_kotlin.$_$.m2;
  var addSuppressed = kotlin_kotlin.$_$.jh;
  var getStringHashCode = kotlin_kotlin.$_$.cb;
  var Enum = kotlin_kotlin.$_$.mg;
  var startCoroutine = kotlin_kotlin.$_$.ia;
  var noWhenBranchMatchedException = kotlin_kotlin.$_$.vh;
  var Long = kotlin_kotlin.$_$.rg;
  var intercepted = kotlin_kotlin.$_$.u9;
  var ArrayDeque_init_$Create$ = kotlin_kotlin.$_$.o;
  var RuntimeException = kotlin_kotlin.$_$.vg;
  var RuntimeException_init_$Init$ = kotlin_kotlin.$_$.l2;
  var captureStack = kotlin_kotlin.$_$.pa;
  var Error_0 = kotlin_kotlin.$_$.ng;
  var Error_init_$Init$ = kotlin_kotlin.$_$.l1;
  var Element = kotlin_kotlin.$_$.fa;
  var StringBuilder_init_$Create$ = kotlin_kotlin.$_$.j1;
  var throwUninitializedPropertyAccessException = kotlin_kotlin.$_$.ai;
  var ArrayList_init_$Create$ = kotlin_kotlin.$_$.p;
  var CancellationException = kotlin_kotlin.$_$.q9;
  var ArrayList = kotlin_kotlin.$_$.j5;
  var IllegalStateException_init_$Create$_0 = kotlin_kotlin.$_$.c2;
  var plus = kotlin_kotlin.$_$.ga;
  var get_0 = kotlin_kotlin.$_$.da;
  var fold = kotlin_kotlin.$_$.ca;
  var minusKey_0 = kotlin_kotlin.$_$.ea;
  var anyToString = kotlin_kotlin.$_$.ma;
  var Companion_instance = kotlin_kotlin.$_$.d5;
  var _Result___init__impl__xyqfz8 = kotlin_kotlin.$_$.y2;
  var createFailure = kotlin_kotlin.$_$.nh;
  var UnsupportedOperationException = kotlin_kotlin.$_$.ih;
  var atomicfu$AtomicRefArray$ofNulls = kotlin_org_jetbrains_kotlinx_atomicfu.$_$.a;
  var ensureNotNull = kotlin_kotlin.$_$.oh;
  var toLong = kotlin_kotlin.$_$.kc;
  var IllegalArgumentException_init_$Create$ = kotlin_kotlin.$_$.w1;
  var atomic$long$1 = kotlin_org_jetbrains_kotlinx_atomicfu.$_$.c;
  var listOf = kotlin_kotlin.$_$.v7;
  var ArrayList_init_$Create$_0 = kotlin_kotlin.$_$.q;
  var NoSuchElementException_init_$Create$ = kotlin_kotlin.$_$.e2;
  var compareTo = kotlin_kotlin.$_$.va;
  var last = kotlin_kotlin.$_$.le;
  var _Char___init__impl__6a9atx = kotlin_kotlin.$_$.q2;
  var initMetadataForCompanion = kotlin_kotlin.$_$.fb;
  var IllegalStateException = kotlin_kotlin.$_$.qg;
  var IllegalStateException_init_$Init$ = kotlin_kotlin.$_$.z1;
  var NoSuchElementException = kotlin_kotlin.$_$.sg;
  var NoSuchElementException_init_$Init$ = kotlin_kotlin.$_$.f2;
  var getKClass = kotlin_kotlin.$_$.g;
  var copyOf = kotlin_kotlin.$_$.q6;
  var throwKotlinNothingValueException = kotlin_kotlin.$_$.yh;
  var FunctionAdapter = kotlin_kotlin.$_$.la;
  var initMetadataForLambda = kotlin_kotlin.$_$.jb;
  var Exception = kotlin_kotlin.$_$.og;
  var toLongOrNull = kotlin_kotlin.$_$.nf;
  var createCoroutineUnintercepted_0 = kotlin_kotlin.$_$.s9;
  var startCoroutineUninterceptedOrReturnNonGeneratorVersion = kotlin_kotlin.$_$.v9;
  var plus_0 = kotlin_kotlin.$_$.j8;
  var KtList = kotlin_kotlin.$_$.p5;
  var listOf_0 = kotlin_kotlin.$_$.u7;
  var getKClassFromExpression = kotlin_kotlin.$_$.f;
  var removeFirstOrNull = kotlin_kotlin.$_$.l8;
  var KtMutableList = kotlin_kotlin.$_$.s5;
  var coerceIn = kotlin_kotlin.$_$.zc;
  var CancellationException_init_$Init$ = kotlin_kotlin.$_$.e1;
  var CancellationException_init_$Create$_0 = kotlin_kotlin.$_$.f1;
  var HashSet_init_$Create$ = kotlin_kotlin.$_$.v;
  var RuntimeException_init_$Init$_0 = kotlin_kotlin.$_$.j2;
  var LinkedHashSet_init_$Create$ = kotlin_kotlin.$_$.b1;
  //endregion
  //region block: pre-declaration
  function cancel$default(cause, $super) {
    cause = cause === VOID ? null : cause;
    var tmp;
    if ($super === VOID) {
      this.cq(cause);
      tmp = Unit_instance;
    } else {
      tmp = $super.cq.call(this, cause);
    }
    return tmp;
  }
  function invokeOnCompletion$default(onCancelling, invokeImmediately, handler, $super) {
    onCancelling = onCancelling === VOID ? false : onCancelling;
    invokeImmediately = invokeImmediately === VOID ? true : invokeImmediately;
    return $super === VOID ? this.xp(onCancelling, invokeImmediately, handler) : $super.xp.call(this, onCancelling, invokeImmediately, handler);
  }
  initMetadataForInterface(Job, 'Job', VOID, VOID, [Element], [0]);
  initMetadataForInterface(ParentJob, 'ParentJob', VOID, VOID, [Job], [0]);
  initMetadataForClass(JobSupport, 'JobSupport', VOID, VOID, [Job, ParentJob], [0]);
  initMetadataForInterface(CoroutineScope, 'CoroutineScope');
  initMetadataForClass(AbstractCoroutine, 'AbstractCoroutine', VOID, JobSupport, [JobSupport, Job, Continuation, CoroutineScope], [0]);
  initMetadataForClass(StandaloneCoroutine, 'StandaloneCoroutine', VOID, AbstractCoroutine, VOID, [0]);
  initMetadataForClass(LazyStandaloneCoroutine, 'LazyStandaloneCoroutine', VOID, StandaloneCoroutine, VOID, [0]);
  initMetadataForCoroutine($awaitCOROUTINE$1, CoroutineImpl);
  initMetadataForClass(DeferredCoroutine, 'DeferredCoroutine', VOID, AbstractCoroutine, [AbstractCoroutine, Job], [0]);
  initMetadataForClass(LazyDeferredCoroutine, 'LazyDeferredCoroutine', VOID, DeferredCoroutine, VOID, [0]);
  initMetadataForInterface(CancellableContinuation, 'CancellableContinuation', VOID, VOID, [Continuation]);
  initMetadataForInterface(NotCompleted, 'NotCompleted');
  initMetadataForInterface(CancelHandler, 'CancelHandler', VOID, VOID, [NotCompleted]);
  initMetadataForClass(DisposeOnCancel, 'DisposeOnCancel', VOID, VOID, [CancelHandler]);
  initMetadataForInterface(Runnable, 'Runnable');
  initMetadataForClass(SchedulerTask, 'SchedulerTask', VOID, VOID, [Runnable]);
  initMetadataForClass(DispatchedTask, 'DispatchedTask', VOID, SchedulerTask);
  initMetadataForInterface(Waiter, 'Waiter');
  initMetadataForClass(CancellableContinuationImpl, 'CancellableContinuationImpl', VOID, DispatchedTask, [DispatchedTask, CancellableContinuation, Waiter]);
  initMetadataForClass(UserSupplied, 'UserSupplied', VOID, VOID, [CancelHandler]);
  initMetadataForObject(Active, 'Active', VOID, VOID, [NotCompleted]);
  initMetadataForClass(CompletedContinuation, 'CompletedContinuation');
  initMetadataForClass(LockFreeLinkedListNode, 'LockFreeLinkedListNode', LockFreeLinkedListNode);
  initMetadataForInterface(Incomplete, 'Incomplete');
  initMetadataForClass(JobNode, 'JobNode', VOID, LockFreeLinkedListNode, [LockFreeLinkedListNode, Incomplete]);
  initMetadataForClass(ChildContinuation, 'ChildContinuation', VOID, JobNode);
  initMetadataForCoroutine($awaitCOROUTINE$2, CoroutineImpl);
  initMetadataForClass(CompletableDeferredImpl, 'CompletableDeferredImpl', VOID, JobSupport, [JobSupport, Job], [0]);
  initMetadataForInterface(CompletableJob, 'CompletableJob', VOID, VOID, [Job], [0]);
  initMetadataForClass(CompletedExceptionally, 'CompletedExceptionally');
  initMetadataForClass(CancelledContinuation, 'CancelledContinuation', VOID, CompletedExceptionally);
  initMetadataForObject(Key, 'Key', VOID, AbstractCoroutineContextKey);
  initMetadataForClass(CoroutineDispatcher, 'CoroutineDispatcher', VOID, AbstractCoroutineContextElement, [AbstractCoroutineContextElement, ContinuationInterceptor]);
  initMetadataForObject(Key_0, 'Key');
  initMetadataForObject(Key_1, 'Key');
  initMetadataForClass(CoroutineName, 'CoroutineName', VOID, AbstractCoroutineContextElement);
  initMetadataForObject(GlobalScope, 'GlobalScope', VOID, VOID, [CoroutineScope]);
  initMetadataForClass(CoroutineStart, 'CoroutineStart', VOID, Enum);
  initMetadataForInterface(CopyableThrowable, 'CopyableThrowable');
  initMetadataForInterface(Delay, 'Delay', VOID, VOID, VOID, [1]);
  initMetadataForClass(EventLoop, 'EventLoop', VOID, CoroutineDispatcher);
  initMetadataForObject(ThreadLocalEventLoop, 'ThreadLocalEventLoop');
  initMetadataForClass(CompletionHandlerException, 'CompletionHandlerException', VOID, RuntimeException);
  initMetadataForClass(CoroutinesInternalError, 'CoroutinesInternalError', VOID, Error_0);
  initMetadataForObject(Key_2, 'Key');
  initMetadataForObject(NonDisposableHandle, 'NonDisposableHandle');
  initMetadataForClass(Empty, 'Empty', VOID, VOID, [Incomplete]);
  initMetadataForClass(LockFreeLinkedListHead, 'LockFreeLinkedListHead', LockFreeLinkedListHead, LockFreeLinkedListNode);
  initMetadataForClass(NodeList, 'NodeList', NodeList, LockFreeLinkedListHead, [LockFreeLinkedListHead, Incomplete]);
  initMetadataForClass(SynchronizedObject, 'SynchronizedObject', SynchronizedObject);
  initMetadataForClass(Finishing, 'Finishing', VOID, SynchronizedObject, [SynchronizedObject, Incomplete]);
  initMetadataForClass(ChildCompletion, 'ChildCompletion', VOID, JobNode);
  initMetadataForClass(AwaitContinuation, 'AwaitContinuation', VOID, CancellableContinuationImpl);
  initMetadataForClass(InactiveNodeList, 'InactiveNodeList', VOID, VOID, [Incomplete]);
  initMetadataForClass(InvokeOnCompletion, 'InvokeOnCompletion', VOID, JobNode);
  initMetadataForClass(InvokeOnCancelling, 'InvokeOnCancelling', VOID, JobNode);
  initMetadataForClass(ResumeOnCompletion, 'ResumeOnCompletion', VOID, JobNode);
  initMetadataForClass(ChildHandleNode, 'ChildHandleNode', VOID, JobNode);
  initMetadataForClass(ResumeAwaitOnCompletion, 'ResumeAwaitOnCompletion', VOID, JobNode);
  initMetadataForClass(IncompleteStateBox, 'IncompleteStateBox');
  initMetadataForClass(JobImpl, 'JobImpl', VOID, JobSupport, [JobSupport, CompletableJob], [0]);
  initMetadataForClass(MainCoroutineDispatcher, 'MainCoroutineDispatcher', VOID, CoroutineDispatcher);
  initMetadataForClass(SupervisorJobImpl, 'SupervisorJobImpl', VOID, JobImpl, VOID, [0]);
  initMetadataForClass(TimeoutCancellationException, 'TimeoutCancellationException', VOID, CancellationException, [CancellationException, CopyableThrowable]);
  initMetadataForObject(Unconfined, 'Unconfined', VOID, CoroutineDispatcher);
  initMetadataForObject(Key_3, 'Key');
  initMetadataForClass(BufferOverflow, 'BufferOverflow', VOID, Enum);
  initMetadataForClass(ConcurrentLinkedListNode, 'ConcurrentLinkedListNode');
  initMetadataForClass(Segment, 'Segment', VOID, ConcurrentLinkedListNode, [ConcurrentLinkedListNode, NotCompleted]);
  initMetadataForClass(ChannelSegment, 'ChannelSegment', VOID, Segment);
  initMetadataForCoroutine($hasNextCOROUTINE$6, CoroutineImpl);
  initMetadataForClass(SendBroadcast, 'SendBroadcast', VOID, VOID, [Waiter]);
  initMetadataForClass(BufferedChannelIterator, 'BufferedChannelIterator', VOID, VOID, [Waiter], [0, 3]);
  function cancel$default_0(cause, $super) {
    cause = cause === VOID ? null : cause;
    var tmp;
    if ($super === VOID) {
      this.cq(cause);
      tmp = Unit_instance;
    } else {
      tmp = $super.cq.call(this, cause);
    }
    return tmp;
  }
  initMetadataForInterface(ReceiveChannel, 'ReceiveChannel', VOID, VOID, VOID, [0]);
  function close$default(cause, $super) {
    cause = cause === VOID ? null : cause;
    return $super === VOID ? this.m13(cause) : $super.m13.call(this, cause);
  }
  initMetadataForInterface(SendChannel, 'SendChannel', VOID, VOID, VOID, [1]);
  initMetadataForClass(BufferedChannel, 'BufferedChannel', VOID, VOID, [ReceiveChannel, SendChannel], [1, 4, 0, 3]);
  initMetadataForClass(WaiterEB, 'WaiterEB');
  initMetadataForClass(ReceiveCatching, 'ReceiveCatching', VOID, VOID, [Waiter]);
  initMetadataForObject(Factory, 'Factory');
  initMetadataForClass(Failed, 'Failed', Failed);
  initMetadataForClass(Closed, 'Closed', VOID, Failed);
  initMetadataForCompanion(Companion);
  initMetadataForClass(ChannelResult, 'ChannelResult');
  initMetadataForClass(ClosedSendChannelException, 'ClosedSendChannelException', VOID, IllegalStateException);
  initMetadataForClass(ClosedReceiveChannelException, 'ClosedReceiveChannelException', VOID, NoSuchElementException);
  initMetadataForClass(ConflatedBufferedChannel, 'ConflatedBufferedChannel', VOID, BufferedChannel, VOID, [1, 0]);
  initMetadataForClass(AbstractFlow, 'AbstractFlow', VOID, VOID, VOID, [1]);
  initMetadataForClass(SafeFlow, 'SafeFlow', VOID, AbstractFlow, VOID, [1]);
  initMetadataForCoroutine($collectCOROUTINE$13, CoroutineImpl);
  initMetadataForInterface(FlowCollector, 'FlowCollector', VOID, VOID, VOID, [1]);
  initMetadataForClass(Emitter, 'Emitter');
  initMetadataForCoroutine($collectCOROUTINE$14, CoroutineImpl);
  initMetadataForClass(AbstractSharedFlow, 'AbstractSharedFlow', VOID, SynchronizedObject);
  initMetadataForClass(SharedFlowImpl, 'SharedFlowImpl', VOID, AbstractSharedFlow, [AbstractSharedFlow, FlowCollector], [1]);
  initMetadataForClass(AbstractSharedFlowSlot, 'AbstractSharedFlowSlot');
  initMetadataForClass(SharedFlowSlot, 'SharedFlowSlot', SharedFlowSlot, AbstractSharedFlowSlot);
  initMetadataForObject(NopCollector, 'NopCollector', VOID, VOID, [FlowCollector], [1]);
  initMetadataForClass(ThrowingCollector, 'ThrowingCollector', VOID, VOID, [FlowCollector], [1]);
  initMetadataForCoroutine($onSubscriptionCOROUTINE$20, CoroutineImpl);
  initMetadataForClass(SubscribedFlowCollector, 'SubscribedFlowCollector', VOID, VOID, [FlowCollector], [1, 0]);
  initMetadataForCoroutine($collectCOROUTINE$21, CoroutineImpl);
  initMetadataForClass(ReadonlySharedFlow, 'ReadonlySharedFlow', VOID, VOID, VOID, [1]);
  initMetadataForClass(sam$kotlinx_coroutines_flow_FlowCollector$0, 'sam$kotlinx_coroutines_flow_FlowCollector$0', VOID, VOID, [FlowCollector, FunctionAdapter], [1]);
  initMetadataForLambda(onEach$o$collect$slambda, CoroutineImpl, VOID, [1]);
  initMetadataForCoroutine($collectCOROUTINE$23, CoroutineImpl);
  initMetadataForClass(onEach$$inlined$unsafeTransform$1, VOID, VOID, VOID, VOID, [1]);
  initMetadataForLambda(launchIn$slambda, CoroutineImpl, VOID, [1]);
  initMetadataForClass(sam$kotlinx_coroutines_flow_FlowCollector$0_0, 'sam$kotlinx_coroutines_flow_FlowCollector$0', VOID, VOID, [FlowCollector, FunctionAdapter], [1]);
  initMetadataForLambda(toCollection$slambda, CoroutineImpl, VOID, [1]);
  initMetadataForCoroutine($toCollectionCOROUTINE$26, CoroutineImpl);
  initMetadataForClass(SegmentOrClosed, 'SegmentOrClosed');
  initMetadataForObject(ExceptionSuccessfullyProcessed, 'ExceptionSuccessfullyProcessed', VOID, Exception);
  initMetadataForClass(DispatchedContinuation, 'DispatchedContinuation', VOID, DispatchedTask, [DispatchedTask, Continuation]);
  initMetadataForClass(UndeliveredElementException, 'UndeliveredElementException', VOID, RuntimeException);
  initMetadataForClass(ContextScope, 'ContextScope', VOID, VOID, [CoroutineScope]);
  initMetadataForClass(ScopeCoroutine, 'ScopeCoroutine', VOID, AbstractCoroutine, VOID, [0]);
  initMetadataForClass(Symbol, 'Symbol');
  initMetadataForInterface(SelectInstance, 'SelectInstance');
  initMetadataForClass(ClauseData, 'ClauseData', VOID, VOID, VOID, [1]);
  initMetadataForClass(SelectImplementation, 'SelectImplementation', VOID, VOID, [CancelHandler, Waiter, SelectInstance], [0, 2]);
  initMetadataForClass(TrySelectDetailedResult, 'TrySelectDetailedResult', VOID, Enum);
  initMetadataForClass(SetTimeoutBasedDispatcher, 'SetTimeoutBasedDispatcher', VOID, CoroutineDispatcher, [CoroutineDispatcher, Delay], [1]);
  initMetadataForObject(NodeDispatcher, 'NodeDispatcher', VOID, SetTimeoutBasedDispatcher, VOID, [1]);
  initMetadataForClass(MessageQueue, 'MessageQueue', VOID, VOID, [KtMutableList]);
  initMetadataForClass(ScheduledMessageQueue, 'ScheduledMessageQueue', VOID, MessageQueue);
  initMetadataForClass(WindowMessageQueue, 'WindowMessageQueue', VOID, MessageQueue);
  initMetadataForClass(UnconfinedEventLoop, 'UnconfinedEventLoop', UnconfinedEventLoop, EventLoop);
  initMetadataForObject(SetTimeoutDispatcher, 'SetTimeoutDispatcher', VOID, SetTimeoutBasedDispatcher, VOID, [1]);
  initMetadataForClass(ClearTimeout, 'ClearTimeout', VOID, VOID, [CancelHandler]);
  initMetadataForClass(WindowClearTimeout, 'WindowClearTimeout', VOID, ClearTimeout);
  initMetadataForClass(WindowDispatcher, 'WindowDispatcher', VOID, CoroutineDispatcher, [CoroutineDispatcher, Delay], [1]);
  initMetadataForObject(Dispatchers, 'Dispatchers');
  initMetadataForClass(JsMainDispatcher, 'JsMainDispatcher', VOID, MainCoroutineDispatcher);
  initMetadataForClass(JobCancellationException, 'JobCancellationException', VOID, CancellationException);
  initMetadataForClass(SafeCollector, 'SafeCollector', VOID, VOID, [FlowCollector], [1]);
  initMetadataForClass(DiagnosticCoroutineContextException, 'DiagnosticCoroutineContextException', VOID, RuntimeException);
  initMetadataForClass(ListClosed, 'ListClosed', VOID, LockFreeLinkedListNode);
  initMetadataForClass(CommonThreadLocal, 'CommonThreadLocal', CommonThreadLocal);
  //endregion
  function AbstractCoroutine(parentContext, initParentJob, active) {
    JobSupport.call(this, active);
    if (initParentJob) {
      this.po(parentContext.o9(Key_instance_3));
    }
    this.so_1 = parentContext.ci(this);
  }
  protoOf(AbstractCoroutine).h9 = function () {
    return this.so_1;
  };
  protoOf(AbstractCoroutine).to = function () {
    return this.so_1;
  };
  protoOf(AbstractCoroutine).uo = function () {
    return protoOf(JobSupport).uo.call(this);
  };
  protoOf(AbstractCoroutine).vo = function (value) {
  };
  protoOf(AbstractCoroutine).wo = function (cause, handled) {
  };
  protoOf(AbstractCoroutine).xo = function () {
    return get_classSimpleName(this) + ' was cancelled';
  };
  protoOf(AbstractCoroutine).yo = function (state) {
    if (state instanceof CompletedExceptionally) {
      this.wo(state.zo_1, state.bp());
    } else {
      this.vo((state == null ? true : !(state == null)) ? state : THROW_CCE());
    }
  };
  protoOf(AbstractCoroutine).m9 = function (result) {
    var state = this.cp(toState_0(result));
    if (state === get_COMPLETING_WAITING_CHILDREN())
      return Unit_instance;
    this.dp(state);
  };
  protoOf(AbstractCoroutine).dp = function (state) {
    return this.ep(state);
  };
  protoOf(AbstractCoroutine).fp = function (exception) {
    handleCoroutineException(this.so_1, exception);
  };
  protoOf(AbstractCoroutine).gp = function () {
    var tmp0_elvis_lhs = get_coroutineName(this.so_1);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return protoOf(JobSupport).gp.call(this);
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var coroutineName = tmp;
    return '"' + coroutineName + '":' + protoOf(JobSupport).gp.call(this);
  };
  protoOf(AbstractCoroutine).hp = function (start, receiver, block) {
    start.kp(block, receiver, this);
  };
  function launch(_this__u8e3s4, context, start, block) {
    context = context === VOID ? EmptyCoroutineContext_getInstance() : context;
    start = start === VOID ? CoroutineStart_DEFAULT_getInstance() : start;
    var newContext = newCoroutineContext(_this__u8e3s4, context);
    var coroutine = start.qq() ? new LazyStandaloneCoroutine(newContext, block) : new StandaloneCoroutine(newContext, true);
    coroutine.hp(start, coroutine, block);
    return coroutine;
  }
  function async(_this__u8e3s4, context, start, block) {
    context = context === VOID ? EmptyCoroutineContext_getInstance() : context;
    start = start === VOID ? CoroutineStart_DEFAULT_getInstance() : start;
    var newContext = newCoroutineContext(_this__u8e3s4, context);
    var coroutine = start.qq() ? new LazyDeferredCoroutine(newContext, block) : new DeferredCoroutine(newContext, true);
    coroutine.hp(start, coroutine, block);
    return coroutine;
  }
  function StandaloneCoroutine(parentContext, active) {
    AbstractCoroutine.call(this, parentContext, true, active);
  }
  protoOf(StandaloneCoroutine).nq = function (exception) {
    handleCoroutineException(this.so_1, exception);
    return true;
  };
  function LazyStandaloneCoroutine(parentContext, block) {
    StandaloneCoroutine.call(this, parentContext, false);
    this.xq_1 = createCoroutineUnintercepted(block, this, this);
  }
  protoOf(LazyStandaloneCoroutine).sp = function () {
    startCoroutineCancellable(this.xq_1, this);
  };
  function $awaitCOROUTINE$1(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.gr_1 = _this__u8e3s4;
  }
  protoOf($awaitCOROUTINE$1).j9 = function () {
    var suspendResult = this.d9_1;
    $sm: do
      try {
        var tmp = this.b9_1;
        switch (tmp) {
          case 0:
            this.c9_1 = 2;
            this.b9_1 = 1;
            suspendResult = this.gr_1.pq(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            return (suspendResult == null ? true : !(suspendResult == null)) ? suspendResult : THROW_CCE();
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
  function DeferredCoroutine(parentContext, active) {
    AbstractCoroutine.call(this, parentContext, true, active);
  }
  protoOf(DeferredCoroutine).kr = function ($completion) {
    var tmp = new $awaitCOROUTINE$1(this, $completion);
    tmp.d9_1 = Unit_instance;
    tmp.e9_1 = null;
    return tmp.j9();
  };
  function LazyDeferredCoroutine(parentContext, block) {
    DeferredCoroutine.call(this, parentContext, false);
    this.or_1 = createCoroutineUnintercepted(block, this, this);
  }
  protoOf(LazyDeferredCoroutine).sp = function () {
    startCoroutineCancellable(this.or_1, this);
  };
  function CancellableContinuation() {
  }
  function disposeOnCancellation(_this__u8e3s4, handle) {
    return invokeOnCancellation(_this__u8e3s4, new DisposeOnCancel(handle));
  }
  function invokeOnCancellation(_this__u8e3s4, handler) {
    var tmp;
    if (_this__u8e3s4 instanceof CancellableContinuationImpl) {
      _this__u8e3s4.zr(handler);
      tmp = Unit_instance;
    } else {
      throw UnsupportedOperationException_init_$Create$('third-party implementation of CancellableContinuation is not supported');
    }
    return tmp;
  }
  function DisposeOnCancel(handle) {
    this.as_1 = handle;
  }
  protoOf(DisposeOnCancel).bs = function (cause) {
    return this.as_1.cs();
  };
  protoOf(DisposeOnCancel).toString = function () {
    return 'DisposeOnCancel[' + toString(this.as_1) + ']';
  };
  function getOrCreateCancellableContinuation(delegate) {
    if (!(delegate instanceof DispatchedContinuation)) {
      return new CancellableContinuationImpl(delegate, 1);
    }
    var tmp4_safe_receiver = delegate.js();
    var tmp;
    if (tmp4_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.takeIf' call
      var tmp_0;
      if (tmp4_safe_receiver.ks()) {
        tmp_0 = tmp4_safe_receiver;
      } else {
        tmp_0 = null;
      }
      tmp = tmp_0;
    }
    var tmp0_elvis_lhs = tmp;
    var tmp_1;
    if (tmp0_elvis_lhs == null) {
      return new CancellableContinuationImpl(delegate, 2);
    } else {
      tmp_1 = tmp0_elvis_lhs;
    }
    return tmp_1;
  }
  function get_RESUME_TOKEN() {
    _init_properties_CancellableContinuationImpl_kt__6rrtdd();
    return RESUME_TOKEN;
  }
  var RESUME_TOKEN;
  function _get_parentHandle__f8dcex($this) {
    return $this.yr_1.kotlinx$atomicfu$value;
  }
  function _get_stateDebugRepresentation__bf18u4($this) {
    var tmp5_subject = $this.op();
    var tmp;
    if (!(tmp5_subject == null) ? isInterface(tmp5_subject, NotCompleted) : false) {
      tmp = 'Active';
    } else {
      if (tmp5_subject instanceof CancelledContinuation) {
        tmp = 'Cancelled';
      } else {
        tmp = 'Completed';
      }
    }
    return tmp;
  }
  function isReusable($this) {
    var tmp;
    if (get_isReusableMode($this.ms_1)) {
      var tmp_0 = $this.ur_1;
      tmp = (tmp_0 instanceof DispatchedContinuation ? tmp_0 : THROW_CCE()).ls();
    } else {
      tmp = false;
    }
    return tmp;
  }
  function cancelLater($this, cause) {
    if (!isReusable($this))
      return false;
    var tmp = $this.ur_1;
    var dispatched = tmp instanceof DispatchedContinuation ? tmp : THROW_CCE();
    return dispatched.ns(cause);
  }
  function callSegmentOnCancellation($this, segment, cause) {
    // Inline function 'kotlinx.coroutines.index' call
    var index = $this.wr_1.kotlinx$atomicfu$value & 536870911;
    // Inline function 'kotlin.check' call
    if (!!(index === 536870911)) {
      var message = 'The index for Segment.onCancellation(..) is broken';
      throw IllegalStateException_init_$Create$(toString(message));
    }
    // Inline function 'kotlinx.coroutines.CancellableContinuationImpl.callCancelHandlerSafely' call
    try {
      segment.ss(index, cause, $this.h9());
    } catch ($p) {
      if ($p instanceof Error) {
        var ex = $p;
        handleCoroutineException($this.h9(), new CompletionHandlerException('Exception in invokeOnCancellation handler for ' + $this.toString(), ex));
      } else {
        throw $p;
      }
    }
  }
  function trySuspend($this) {
    // Inline function 'kotlinx.atomicfu.loop' call
    var this_0 = $this.wr_1;
    while (true) {
      var cur = this_0.kotlinx$atomicfu$value;
      // Inline function 'kotlinx.coroutines.decision' call
      switch (cur >> 29) {
        case 0:
          // Inline function 'kotlinx.coroutines.index' call

          // Inline function 'kotlinx.coroutines.decisionAndIndex' call

          var tmp$ret$2 = (1 << 29) + (cur & 536870911) | 0;
          if ($this.wr_1.atomicfu$compareAndSet(cur, tmp$ret$2))
            return true;
          break;
        case 2:
          return false;
        default:
          // Inline function 'kotlin.error' call

          var message = 'Already suspended';
          throw IllegalStateException_init_$Create$(toString(message));
      }
    }
  }
  function tryResume($this) {
    // Inline function 'kotlinx.atomicfu.loop' call
    var this_0 = $this.wr_1;
    while (true) {
      var cur = this_0.kotlinx$atomicfu$value;
      // Inline function 'kotlinx.coroutines.decision' call
      switch (cur >> 29) {
        case 0:
          // Inline function 'kotlinx.coroutines.index' call

          // Inline function 'kotlinx.coroutines.decisionAndIndex' call

          var tmp$ret$2 = (2 << 29) + (cur & 536870911) | 0;
          if ($this.wr_1.atomicfu$compareAndSet(cur, tmp$ret$2))
            return true;
          break;
        case 1:
          return false;
        default:
          // Inline function 'kotlin.error' call

          var message = 'Already resumed';
          throw IllegalStateException_init_$Create$(toString(message));
      }
    }
  }
  function installParentHandle($this) {
    var tmp0_elvis_lhs = $this.h9().o9(Key_instance_3);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return null;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var parent = tmp;
    var handle = invokeOnCompletion(parent, VOID, new ChildContinuation($this));
    $this.yr_1.atomicfu$compareAndSet(null, handle);
    return handle;
  }
  function invokeOnCancellationImpl($this, handler) {
    // Inline function 'kotlinx.coroutines.assert' call
    // Inline function 'kotlinx.atomicfu.loop' call
    var this_0 = $this.xr_1;
    while (true) {
      var state = this_0.kotlinx$atomicfu$value;
      if (state instanceof Active) {
        if ($this.xr_1.atomicfu$compareAndSet(state, handler))
          return Unit_instance;
      } else {
        var tmp;
        if (!(state == null) ? isInterface(state, CancelHandler) : false) {
          tmp = true;
        } else {
          tmp = state instanceof Segment;
        }
        if (tmp) {
          multipleHandlersError($this, handler, state);
        } else {
          if (state instanceof CompletedExceptionally) {
            if (!state.bt()) {
              multipleHandlersError($this, handler, state);
            }
            if (state instanceof CancelledContinuation) {
              var tmp13_safe_receiver = state instanceof CompletedExceptionally ? state : null;
              var cause = tmp13_safe_receiver == null ? null : tmp13_safe_receiver.zo_1;
              if (isInterface(handler, CancelHandler)) {
                $this.ys(handler, cause);
              } else {
                var segment = handler instanceof Segment ? handler : THROW_CCE();
                callSegmentOnCancellation($this, segment, cause);
              }
            }
            return Unit_instance;
          } else {
            if (state instanceof CompletedContinuation) {
              if (!(state.us_1 == null)) {
                multipleHandlersError($this, handler, state);
              }
              if (handler instanceof Segment)
                return Unit_instance;
              if (!isInterface(handler, CancelHandler))
                THROW_CCE();
              if (state.zs()) {
                $this.ys(handler, state.xs_1);
                return Unit_instance;
              }
              var update = state.at(VOID, handler);
              if ($this.xr_1.atomicfu$compareAndSet(state, update))
                return Unit_instance;
            } else {
              if (handler instanceof Segment)
                return Unit_instance;
              if (!isInterface(handler, CancelHandler))
                THROW_CCE();
              var update_0 = new CompletedContinuation(state, handler);
              if ($this.xr_1.atomicfu$compareAndSet(state, update_0))
                return Unit_instance;
            }
          }
        }
      }
    }
  }
  function multipleHandlersError($this, handler, state) {
    // Inline function 'kotlin.error' call
    var message = "It's prohibited to register multiple handlers, tried to register " + toString(handler) + ', already has ' + toString_0(state);
    throw IllegalStateException_init_$Create$(toString(message));
  }
  function dispatchResume($this, mode) {
    if (tryResume($this))
      return Unit_instance;
    dispatch($this, mode);
  }
  function resumedState($this, state, proposedUpdate, resumeMode, onCancellation, idempotent) {
    var tmp;
    if (proposedUpdate instanceof CompletedExceptionally) {
      // Inline function 'kotlinx.coroutines.assert' call
      // Inline function 'kotlinx.coroutines.assert' call
      tmp = proposedUpdate;
    } else {
      if (!get_isCancellableMode(resumeMode) && idempotent == null) {
        tmp = proposedUpdate;
      } else {
        var tmp_0;
        var tmp_1;
        if (!(onCancellation == null)) {
          tmp_1 = true;
        } else {
          tmp_1 = isInterface(state, CancelHandler);
        }
        if (tmp_1) {
          tmp_0 = true;
        } else {
          tmp_0 = !(idempotent == null);
        }
        if (tmp_0) {
          tmp = new CompletedContinuation(proposedUpdate, isInterface(state, CancelHandler) ? state : null, onCancellation, idempotent);
        } else {
          tmp = proposedUpdate;
        }
      }
    }
    return tmp;
  }
  function tryResumeImpl($this, proposedUpdate, idempotent, onCancellation) {
    // Inline function 'kotlinx.atomicfu.loop' call
    var this_0 = $this.xr_1;
    while (true) {
      var tmp1 = this_0.kotlinx$atomicfu$value;
      $l$block: {
        if (!(tmp1 == null) ? isInterface(tmp1, NotCompleted) : false) {
          var update = resumedState($this, tmp1, proposedUpdate, $this.ms_1, onCancellation, idempotent);
          if (!$this.xr_1.atomicfu$compareAndSet(tmp1, update)) {
            break $l$block;
          }
          detachChildIfNonResuable($this);
          return get_RESUME_TOKEN();
        } else {
          if (tmp1 instanceof CompletedContinuation) {
            var tmp;
            if (!(idempotent == null) && tmp1.ws_1 === idempotent) {
              // Inline function 'kotlinx.coroutines.assert' call
              tmp = get_RESUME_TOKEN();
            } else {
              tmp = null;
            }
            return tmp;
          } else {
            return null;
          }
        }
      }
    }
  }
  function alreadyResumedError($this, proposedUpdate) {
    // Inline function 'kotlin.error' call
    var message = 'Already resumed, but proposed with update ' + toString_0(proposedUpdate);
    throw IllegalStateException_init_$Create$(toString(message));
  }
  function detachChildIfNonResuable($this) {
    if (!isReusable($this)) {
      $this.ct();
    }
  }
  function CancellableContinuationImpl(delegate, resumeMode) {
    DispatchedTask.call(this, resumeMode);
    this.ur_1 = delegate;
    // Inline function 'kotlinx.coroutines.assert' call
    this.vr_1 = this.ur_1.h9();
    var tmp = this;
    // Inline function 'kotlinx.coroutines.decisionAndIndex' call
    var tmp$ret$1 = (0 << 29) + 536870911 | 0;
    tmp.wr_1 = atomic$int$1(tmp$ret$1);
    this.xr_1 = atomic$ref$1(Active_instance);
    this.yr_1 = atomic$ref$1(null);
  }
  protoOf(CancellableContinuationImpl).dt = function () {
    return this.ur_1;
  };
  protoOf(CancellableContinuationImpl).h9 = function () {
    return this.vr_1;
  };
  protoOf(CancellableContinuationImpl).op = function () {
    return this.xr_1.kotlinx$atomicfu$value;
  };
  protoOf(CancellableContinuationImpl).uo = function () {
    var tmp = this.op();
    return !(tmp == null) ? isInterface(tmp, NotCompleted) : false;
  };
  protoOf(CancellableContinuationImpl).pp = function () {
    var tmp = this.op();
    return !(!(tmp == null) ? isInterface(tmp, NotCompleted) : false);
  };
  protoOf(CancellableContinuationImpl).qp = function () {
    var tmp = this.op();
    return tmp instanceof CancelledContinuation;
  };
  protoOf(CancellableContinuationImpl).et = function () {
    var tmp0_elvis_lhs = installParentHandle(this);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return Unit_instance;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var handle = tmp;
    if (this.pp()) {
      handle.cs();
      this.yr_1.kotlinx$atomicfu$value = NonDisposableHandle_instance;
    }
  };
  protoOf(CancellableContinuationImpl).ks = function () {
    // Inline function 'kotlinx.coroutines.assert' call
    // Inline function 'kotlinx.coroutines.assert' call
    var state = this.xr_1.kotlinx$atomicfu$value;
    // Inline function 'kotlinx.coroutines.assert' call
    var tmp;
    if (state instanceof CompletedContinuation) {
      tmp = !(state.ws_1 == null);
    } else {
      tmp = false;
    }
    if (tmp) {
      this.ct();
      return false;
    }
    var tmp_0 = this.wr_1;
    // Inline function 'kotlinx.coroutines.decisionAndIndex' call
    tmp_0.kotlinx$atomicfu$value = (0 << 29) + 536870911 | 0;
    this.xr_1.kotlinx$atomicfu$value = Active_instance;
    return true;
  };
  protoOf(CancellableContinuationImpl).ft = function () {
    return this.op();
  };
  protoOf(CancellableContinuationImpl).gt = function (takenState, cause) {
    var this_0 = this.xr_1;
    while (true) {
      var state = this_0.kotlinx$atomicfu$value;
      if (!(state == null) ? isInterface(state, NotCompleted) : false) {
        // Inline function 'kotlin.error' call
        var message = 'Not completed';
        throw IllegalStateException_init_$Create$(toString(message));
      } else {
        if (state instanceof CompletedExceptionally)
          return Unit_instance;
        else {
          if (state instanceof CompletedContinuation) {
            // Inline function 'kotlin.check' call
            if (!!state.zs()) {
              var message_0 = 'Must be called at most once';
              throw IllegalStateException_init_$Create$(toString(message_0));
            }
            var update = state.at(VOID, VOID, VOID, VOID, cause);
            if (this.xr_1.atomicfu$compareAndSet(state, update)) {
              state.ht(this, cause);
              return Unit_instance;
            }
          } else {
            if (this.xr_1.atomicfu$compareAndSet(state, new CompletedContinuation(state, VOID, VOID, VOID, cause))) {
              return Unit_instance;
            }
          }
        }
      }
    }
    return Unit_instance;
  };
  protoOf(CancellableContinuationImpl).it = function (cause) {
    // Inline function 'kotlinx.atomicfu.loop' call
    var this_0 = this.xr_1;
    while (true) {
      var tmp1 = this_0.kotlinx$atomicfu$value;
      $l$block: {
        if (!(!(tmp1 == null) ? isInterface(tmp1, NotCompleted) : false))
          return false;
        var tmp;
        if (isInterface(tmp1, CancelHandler)) {
          tmp = true;
        } else {
          tmp = tmp1 instanceof Segment;
        }
        var update = new CancelledContinuation(this, cause, tmp);
        if (!this.xr_1.atomicfu$compareAndSet(tmp1, update)) {
          break $l$block;
        }
        if (isInterface(tmp1, CancelHandler)) {
          this.ys(tmp1, cause);
        } else {
          if (tmp1 instanceof Segment) {
            callSegmentOnCancellation(this, tmp1, cause);
          }
        }
        detachChildIfNonResuable(this);
        dispatchResume(this, this.ms_1);
        return true;
      }
    }
  };
  protoOf(CancellableContinuationImpl).jt = function (cause) {
    if (cancelLater(this, cause))
      return Unit_instance;
    this.it(cause);
    detachChildIfNonResuable(this);
  };
  protoOf(CancellableContinuationImpl).ys = function (handler, cause) {
    // Inline function 'kotlinx.coroutines.CancellableContinuationImpl.callCancelHandlerSafely' call
    try {
      handler.bs(cause);
    } catch ($p) {
      if ($p instanceof Error) {
        var ex = $p;
        handleCoroutineException(this.h9(), new CompletionHandlerException('Exception in invokeOnCancellation handler for ' + this.toString(), ex));
      } else {
        throw $p;
      }
    }
    return Unit_instance;
  };
  protoOf(CancellableContinuationImpl).kt = function (onCancellation, cause, value) {
    try {
      onCancellation(cause, value, this.h9());
    } catch ($p) {
      if ($p instanceof Error) {
        var ex = $p;
        handleCoroutineException(this.h9(), new CompletionHandlerException('Exception in resume onCancellation handler for ' + this.toString(), ex));
      } else {
        throw $p;
      }
    }
  };
  protoOf(CancellableContinuationImpl).lt = function (parent) {
    return parent.tp();
  };
  protoOf(CancellableContinuationImpl).mt = function () {
    var isReusable_0 = isReusable(this);
    if (trySuspend(this)) {
      if (_get_parentHandle__f8dcex(this) == null) {
        installParentHandle(this);
      }
      if (isReusable_0) {
        this.nt();
      }
      return get_COROUTINE_SUSPENDED();
    }
    if (isReusable_0) {
      this.nt();
    }
    var state = this.op();
    if (state instanceof CompletedExceptionally)
      throw recoverStackTrace(state.zo_1, this);
    if (get_isCancellableMode(this.ms_1)) {
      var job = this.h9().o9(Key_instance_3);
      if (!(job == null) && !job.uo()) {
        var cause = job.tp();
        this.gt(state, cause);
        throw recoverStackTrace(cause, this);
      }
    }
    return this.ot(state);
  };
  protoOf(CancellableContinuationImpl).nt = function () {
    var tmp = this.ur_1;
    var tmp10_safe_receiver = tmp instanceof DispatchedContinuation ? tmp : null;
    var tmp0_elvis_lhs = tmp10_safe_receiver == null ? null : tmp10_safe_receiver.pt(this);
    var tmp_0;
    if (tmp0_elvis_lhs == null) {
      return Unit_instance;
    } else {
      tmp_0 = tmp0_elvis_lhs;
    }
    var cancellationCause = tmp_0;
    this.ct();
    this.it(cancellationCause);
  };
  protoOf(CancellableContinuationImpl).m9 = function (result) {
    return this.qt(toState(result, this), this.ms_1);
  };
  protoOf(CancellableContinuationImpl).rt = function (value, onCancellation) {
    return this.st(value, this.ms_1, onCancellation);
  };
  protoOf(CancellableContinuationImpl).tt = function (segment, index) {
    var tmp0 = this.wr_1;
    $l$block: {
      // Inline function 'kotlinx.atomicfu.update' call
      while (true) {
        var cur = tmp0.kotlinx$atomicfu$value;
        // Inline function 'kotlinx.coroutines.index' call
        // Inline function 'kotlin.check' call
        if (!((cur & 536870911) === 536870911)) {
          var message = 'invokeOnCancellation should be called at most once';
          throw IllegalStateException_init_$Create$(toString(message));
        }
        // Inline function 'kotlinx.coroutines.decision' call
        // Inline function 'kotlinx.coroutines.decisionAndIndex' call
        var upd = (cur >> 29 << 29) + index | 0;
        if (tmp0.atomicfu$compareAndSet(cur, upd)) {
          break $l$block;
        }
      }
    }
    invokeOnCancellationImpl(this, segment);
  };
  protoOf(CancellableContinuationImpl).rr = function (handler) {
    return invokeOnCancellation(this, new UserSupplied(handler));
  };
  protoOf(CancellableContinuationImpl).zr = function (handler) {
    return invokeOnCancellationImpl(this, handler);
  };
  protoOf(CancellableContinuationImpl).st = function (proposedUpdate, resumeMode, onCancellation) {
    // Inline function 'kotlinx.atomicfu.loop' call
    var this_0 = this.xr_1;
    while (true) {
      var tmp1 = this_0.kotlinx$atomicfu$value;
      $l$block: {
        if (!(tmp1 == null) ? isInterface(tmp1, NotCompleted) : false) {
          var update = resumedState(this, tmp1, proposedUpdate, resumeMode, onCancellation, null);
          if (!this.xr_1.atomicfu$compareAndSet(tmp1, update)) {
            break $l$block;
          }
          detachChildIfNonResuable(this);
          dispatchResume(this, resumeMode);
          return Unit_instance;
        } else {
          if (tmp1 instanceof CancelledContinuation) {
            if (tmp1.xt()) {
              if (onCancellation == null)
                null;
              else {
                // Inline function 'kotlin.let' call
                this.kt(onCancellation, tmp1.zo_1, proposedUpdate);
              }
              return Unit_instance;
            }
          }
        }
        alreadyResumedError(this, proposedUpdate);
      }
    }
  };
  protoOf(CancellableContinuationImpl).qt = function (proposedUpdate, resumeMode, onCancellation, $super) {
    onCancellation = onCancellation === VOID ? null : onCancellation;
    var tmp;
    if ($super === VOID) {
      this.st(proposedUpdate, resumeMode, onCancellation);
      tmp = Unit_instance;
    } else {
      tmp = $super.st.call(this, proposedUpdate, resumeMode, onCancellation);
    }
    return tmp;
  };
  protoOf(CancellableContinuationImpl).ct = function () {
    var tmp0_elvis_lhs = _get_parentHandle__f8dcex(this);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return Unit_instance;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var handle = tmp;
    handle.cs();
    this.yr_1.kotlinx$atomicfu$value = NonDisposableHandle_instance;
  };
  protoOf(CancellableContinuationImpl).pr = function (value, idempotent, onCancellation) {
    return tryResumeImpl(this, value, idempotent, onCancellation);
  };
  protoOf(CancellableContinuationImpl).qr = function (token) {
    // Inline function 'kotlinx.coroutines.assert' call
    dispatchResume(this, this.ms_1);
  };
  protoOf(CancellableContinuationImpl).sr = function (_this__u8e3s4, value) {
    var tmp = this.ur_1;
    var dc = tmp instanceof DispatchedContinuation ? tmp : null;
    var tmp_0;
    if ((dc == null ? null : dc.es_1) === _this__u8e3s4) {
      tmp_0 = 4;
    } else {
      tmp_0 = this.ms_1;
    }
    this.qt(value, tmp_0);
  };
  protoOf(CancellableContinuationImpl).ot = function (state) {
    var tmp;
    if (state instanceof CompletedContinuation) {
      var tmp_0 = state.ts_1;
      tmp = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
    } else {
      tmp = (state == null ? true : !(state == null)) ? state : THROW_CCE();
    }
    return tmp;
  };
  protoOf(CancellableContinuationImpl).yt = function (state) {
    var tmp20_safe_receiver = protoOf(DispatchedTask).yt.call(this, state);
    var tmp;
    if (tmp20_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      tmp = recoverStackTrace(tmp20_safe_receiver, this.ur_1);
    }
    return tmp;
  };
  protoOf(CancellableContinuationImpl).toString = function () {
    return this.zt() + '(' + toDebugString(this.ur_1) + '){' + _get_stateDebugRepresentation__bf18u4(this) + '}@' + get_hexAddress(this);
  };
  protoOf(CancellableContinuationImpl).zt = function () {
    return 'CancellableContinuation';
  };
  function NotCompleted() {
  }
  function UserSupplied(handler) {
    this.cu_1 = handler;
  }
  protoOf(UserSupplied).bs = function (cause) {
    this.cu_1(cause);
  };
  protoOf(UserSupplied).toString = function () {
    return 'CancelHandler.UserSupplied[' + get_classSimpleName(this.cu_1) + '@' + get_hexAddress(this) + ']';
  };
  function CancelHandler() {
  }
  function Active() {
  }
  protoOf(Active).toString = function () {
    return 'Active';
  };
  var Active_instance;
  function Active_getInstance() {
    return Active_instance;
  }
  function CompletedContinuation(result, cancelHandler, onCancellation, idempotentResume, cancelCause) {
    cancelHandler = cancelHandler === VOID ? null : cancelHandler;
    onCancellation = onCancellation === VOID ? null : onCancellation;
    idempotentResume = idempotentResume === VOID ? null : idempotentResume;
    cancelCause = cancelCause === VOID ? null : cancelCause;
    this.ts_1 = result;
    this.us_1 = cancelHandler;
    this.vs_1 = onCancellation;
    this.ws_1 = idempotentResume;
    this.xs_1 = cancelCause;
  }
  protoOf(CompletedContinuation).zs = function () {
    return !(this.xs_1 == null);
  };
  protoOf(CompletedContinuation).ht = function (cont, cause) {
    var tmp21_safe_receiver = this.us_1;
    if (tmp21_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      cont.ys(tmp21_safe_receiver, cause);
    }
    var tmp22_safe_receiver = this.vs_1;
    if (tmp22_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      cont.kt(tmp22_safe_receiver, cause, this.ts_1);
    }
  };
  protoOf(CompletedContinuation).du = function (result, cancelHandler, onCancellation, idempotentResume, cancelCause) {
    return new CompletedContinuation(result, cancelHandler, onCancellation, idempotentResume, cancelCause);
  };
  protoOf(CompletedContinuation).at = function (result, cancelHandler, onCancellation, idempotentResume, cancelCause, $super) {
    result = result === VOID ? this.ts_1 : result;
    cancelHandler = cancelHandler === VOID ? this.us_1 : cancelHandler;
    onCancellation = onCancellation === VOID ? this.vs_1 : onCancellation;
    idempotentResume = idempotentResume === VOID ? this.ws_1 : idempotentResume;
    cancelCause = cancelCause === VOID ? this.xs_1 : cancelCause;
    return $super === VOID ? this.du(result, cancelHandler, onCancellation, idempotentResume, cancelCause) : $super.du.call(this, result, cancelHandler, onCancellation, idempotentResume, cancelCause);
  };
  protoOf(CompletedContinuation).toString = function () {
    return 'CompletedContinuation(result=' + toString_0(this.ts_1) + ', cancelHandler=' + toString_0(this.us_1) + ', onCancellation=' + toString_0(this.vs_1) + ', idempotentResume=' + toString_0(this.ws_1) + ', cancelCause=' + toString_0(this.xs_1) + ')';
  };
  protoOf(CompletedContinuation).hashCode = function () {
    var result = this.ts_1 == null ? 0 : hashCode(this.ts_1);
    result = imul(result, 31) + (this.us_1 == null ? 0 : hashCode(this.us_1)) | 0;
    result = imul(result, 31) + (this.vs_1 == null ? 0 : hashCode(this.vs_1)) | 0;
    result = imul(result, 31) + (this.ws_1 == null ? 0 : hashCode(this.ws_1)) | 0;
    result = imul(result, 31) + (this.xs_1 == null ? 0 : hashCode(this.xs_1)) | 0;
    return result;
  };
  protoOf(CompletedContinuation).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof CompletedContinuation))
      return false;
    var tmp0_other_with_cast = other instanceof CompletedContinuation ? other : THROW_CCE();
    if (!equals(this.ts_1, tmp0_other_with_cast.ts_1))
      return false;
    if (!equals(this.us_1, tmp0_other_with_cast.us_1))
      return false;
    if (!equals(this.vs_1, tmp0_other_with_cast.vs_1))
      return false;
    if (!equals(this.ws_1, tmp0_other_with_cast.ws_1))
      return false;
    if (!equals(this.xs_1, tmp0_other_with_cast.xs_1))
      return false;
    return true;
  };
  function ChildContinuation(child) {
    JobNode.call(this);
    this.iu_1 = child;
  }
  protoOf(ChildContinuation).ju = function () {
    return true;
  };
  protoOf(ChildContinuation).bs = function (cause) {
    this.iu_1.jt(this.iu_1.lt(this.ou()));
  };
  var properties_initialized_CancellableContinuationImpl_kt_xtzb03;
  function _init_properties_CancellableContinuationImpl_kt__6rrtdd() {
    if (!properties_initialized_CancellableContinuationImpl_kt_xtzb03) {
      properties_initialized_CancellableContinuationImpl_kt_xtzb03 = true;
      RESUME_TOKEN = new Symbol('RESUME_TOKEN');
    }
  }
  function CompletableDeferred(parent) {
    parent = parent === VOID ? null : parent;
    return new CompletableDeferredImpl(parent);
  }
  function $awaitCOROUTINE$2(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.ev_1 = _this__u8e3s4;
  }
  protoOf($awaitCOROUTINE$2).j9 = function () {
    var suspendResult = this.d9_1;
    $sm: do
      try {
        var tmp = this.b9_1;
        switch (tmp) {
          case 0:
            this.c9_1 = 2;
            this.b9_1 = 1;
            suspendResult = this.ev_1.pq(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            return (suspendResult == null ? true : !(suspendResult == null)) ? suspendResult : THROW_CCE();
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
  function CompletableDeferredImpl(parent) {
    JobSupport.call(this, true);
    this.po(parent);
  }
  protoOf(CompletableDeferredImpl).bq = function () {
    return true;
  };
  protoOf(CompletableDeferredImpl).kr = function ($completion) {
    var tmp = new $awaitCOROUTINE$2(this, $completion);
    tmp.d9_1 = Unit_instance;
    tmp.e9_1 = null;
    return tmp.j9();
  };
  protoOf(CompletableDeferredImpl).hv = function (value) {
    return this.iv(value);
  };
  protoOf(CompletableDeferredImpl).jv = function (exception) {
    return this.iv(new CompletedExceptionally(exception));
  };
  function CompletableJob() {
  }
  function CompletedExceptionally(cause, handled) {
    handled = handled === VOID ? false : handled;
    this.zo_1 = cause;
    this.ap_1 = atomic$boolean$1(handled);
  }
  protoOf(CompletedExceptionally).bp = function () {
    return this.ap_1.kotlinx$atomicfu$value;
  };
  protoOf(CompletedExceptionally).bt = function () {
    return this.ap_1.atomicfu$compareAndSet(false, true);
  };
  protoOf(CompletedExceptionally).toString = function () {
    return get_classSimpleName(this) + '[' + this.zo_1.toString() + ']';
  };
  function CancelledContinuation(continuation, cause, handled) {
    CompletedExceptionally.call(this, cause == null ? CancellationException_init_$Create$('Continuation ' + toString(continuation) + ' was cancelled normally') : cause, handled);
    this.wt_1 = atomic$boolean$1(false);
  }
  protoOf(CancelledContinuation).xt = function () {
    return this.wt_1.atomicfu$compareAndSet(false, true);
  };
  function toState(_this__u8e3s4, caller) {
    // Inline function 'kotlin.getOrElse' call
    var exception = Result__exceptionOrNull_impl_p6xea9(_this__u8e3s4);
    var tmp;
    if (exception == null) {
      var tmp_0 = _Result___get_value__impl__bjfvqg(_this__u8e3s4);
      tmp = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
    } else {
      tmp = new CompletedExceptionally(recoverStackTrace(exception, caller));
    }
    return tmp;
  }
  function toState_0(_this__u8e3s4) {
    // Inline function 'kotlin.getOrElse' call
    var exception = Result__exceptionOrNull_impl_p6xea9(_this__u8e3s4);
    var tmp;
    if (exception == null) {
      var tmp_0 = _Result___get_value__impl__bjfvqg(_this__u8e3s4);
      tmp = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
    } else {
      tmp = new CompletedExceptionally(exception);
    }
    return tmp;
  }
  function CoroutineDispatcher$Key$_init_$lambda_akl8b5(it) {
    return it instanceof CoroutineDispatcher ? it : null;
  }
  function Key() {
    Key_instance_0 = this;
    var tmp = Key_instance;
    AbstractCoroutineContextKey.call(this, tmp, CoroutineDispatcher$Key$_init_$lambda_akl8b5);
  }
  var Key_instance_0;
  function Key_getInstance() {
    if (Key_instance_0 == null)
      new Key();
    return Key_instance_0;
  }
  function CoroutineDispatcher() {
    Key_getInstance();
    AbstractCoroutineContextElement.call(this, Key_instance);
  }
  protoOf(CoroutineDispatcher).nv = function (context) {
    return true;
  };
  protoOf(CoroutineDispatcher).p9 = function (continuation) {
    return new DispatchedContinuation(this, continuation);
  };
  protoOf(CoroutineDispatcher).q9 = function (continuation) {
    var dispatched = continuation instanceof DispatchedContinuation ? continuation : THROW_CCE();
    dispatched.pv();
  };
  protoOf(CoroutineDispatcher).toString = function () {
    return get_classSimpleName(this) + '@' + get_hexAddress(this);
  };
  function handleCoroutineException(context, exception) {
    try {
      var tmp23_safe_receiver = context.o9(Key_instance_1);
      if (tmp23_safe_receiver == null)
        null;
      else {
        // Inline function 'kotlin.let' call
        tmp23_safe_receiver.qv(context, exception);
        return Unit_instance;
      }
    } catch ($p) {
      if ($p instanceof Error) {
        var t = $p;
        handleUncaughtCoroutineException(context, handlerException(exception, t));
        return Unit_instance;
      } else {
        throw $p;
      }
    }
    handleUncaughtCoroutineException(context, exception);
  }
  function Key_0() {
  }
  var Key_instance_1;
  function Key_getInstance_0() {
    return Key_instance_1;
  }
  function handlerException(originalException, thrownException) {
    if (originalException === thrownException)
      return originalException;
    // Inline function 'kotlin.apply' call
    var this_0 = RuntimeException_init_$Create$('Exception while trying to handle coroutine exception', thrownException);
    addSuppressed(this_0, originalException);
    return this_0;
  }
  function Key_1() {
  }
  var Key_instance_2;
  function Key_getInstance_1() {
    return Key_instance_2;
  }
  function CoroutineName(name) {
    AbstractCoroutineContextElement.call(this, Key_instance_2);
    this.sv_1 = name;
  }
  protoOf(CoroutineName).toString = function () {
    return 'CoroutineName(' + this.sv_1 + ')';
  };
  protoOf(CoroutineName).hashCode = function () {
    return getStringHashCode(this.sv_1);
  };
  protoOf(CoroutineName).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof CoroutineName))
      return false;
    var tmp0_other_with_cast = other instanceof CoroutineName ? other : THROW_CCE();
    if (!(this.sv_1 === tmp0_other_with_cast.sv_1))
      return false;
    return true;
  };
  function CoroutineScope() {
  }
  function GlobalScope() {
  }
  protoOf(GlobalScope).to = function () {
    return EmptyCoroutineContext_getInstance();
  };
  var GlobalScope_instance;
  function GlobalScope_getInstance() {
    return GlobalScope_instance;
  }
  function cancel(_this__u8e3s4, message, cause) {
    cause = cause === VOID ? null : cause;
    return cancel_0(_this__u8e3s4, CancellationException_0(message, cause));
  }
  function cancel_0(_this__u8e3s4, cause) {
    cause = cause === VOID ? null : cause;
    var tmp0_elvis_lhs = _this__u8e3s4.to().o9(Key_instance_3);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      var message = 'Scope cannot be cancelled because it does not have a job: ' + toString(_this__u8e3s4);
      throw IllegalStateException_init_$Create$(toString(message));
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var job = tmp;
    job.cq(cause);
  }
  function CoroutineScope_0(context) {
    return new ContextScope(!(context.o9(Key_instance_3) == null) ? context : context.ci(Job_0()));
  }
  function get_isActive(_this__u8e3s4) {
    var tmp24_safe_receiver = _this__u8e3s4.to().o9(Key_instance_3);
    var tmp0_elvis_lhs = tmp24_safe_receiver == null ? null : tmp24_safe_receiver.uo();
    return tmp0_elvis_lhs == null ? true : tmp0_elvis_lhs;
  }
  var CoroutineStart_DEFAULT_instance;
  var CoroutineStart_LAZY_instance;
  var CoroutineStart_ATOMIC_instance;
  var CoroutineStart_UNDISPATCHED_instance;
  var CoroutineStart_entriesInitialized;
  function CoroutineStart_initEntries() {
    if (CoroutineStart_entriesInitialized)
      return Unit_instance;
    CoroutineStart_entriesInitialized = true;
    CoroutineStart_DEFAULT_instance = new CoroutineStart('DEFAULT', 0);
    CoroutineStart_LAZY_instance = new CoroutineStart('LAZY', 1);
    CoroutineStart_ATOMIC_instance = new CoroutineStart('ATOMIC', 2);
    CoroutineStart_UNDISPATCHED_instance = new CoroutineStart('UNDISPATCHED', 3);
  }
  function CoroutineStart(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  protoOf(CoroutineStart).kp = function (block, receiver, completion) {
    var tmp;
    switch (this.q2_1) {
      case 0:
        startCoroutineCancellable_0(block, receiver, completion);
        tmp = Unit_instance;
        break;
      case 2:
        startCoroutine(block, receiver, completion);
        tmp = Unit_instance;
        break;
      case 3:
        startCoroutineUndispatched(block, receiver, completion);
        tmp = Unit_instance;
        break;
      case 1:
        tmp = Unit_instance;
        break;
      default:
        noWhenBranchMatchedException();
        break;
    }
    return tmp;
  };
  protoOf(CoroutineStart).qq = function () {
    return this === CoroutineStart_LAZY_getInstance();
  };
  function CoroutineStart_DEFAULT_getInstance() {
    CoroutineStart_initEntries();
    return CoroutineStart_DEFAULT_instance;
  }
  function CoroutineStart_LAZY_getInstance() {
    CoroutineStart_initEntries();
    return CoroutineStart_LAZY_instance;
  }
  function CopyableThrowable() {
  }
  function Delay() {
  }
  function get_delay(_this__u8e3s4) {
    var tmp = _this__u8e3s4.o9(Key_instance);
    var tmp0_elvis_lhs = (!(tmp == null) ? isInterface(tmp, Delay) : false) ? tmp : null;
    return tmp0_elvis_lhs == null ? get_DefaultDelay() : tmp0_elvis_lhs;
  }
  function delay(timeMillis, $completion) {
    if (timeMillis.b1(new Long(0, 0)) <= 0)
      return Unit_instance;
    var cancellable = new CancellableContinuationImpl(intercepted($completion), 1);
    cancellable.et();
    if (timeMillis.b1(new Long(-1, 2147483647)) < 0) {
      get_delay(cancellable.h9()).uv(timeMillis, cancellable);
    }
    return cancellable.mt();
  }
  function delta($this, unconfined) {
    return unconfined ? new Long(0, 1) : new Long(1, 0);
  }
  function EventLoop() {
    CoroutineDispatcher.call(this);
    this.wv_1 = new Long(0, 0);
    this.xv_1 = false;
    this.yv_1 = null;
  }
  protoOf(EventLoop).zv = function () {
    var tmp0_elvis_lhs = this.yv_1;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return false;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var queue = tmp;
    var tmp1_elvis_lhs = queue.yf();
    var tmp_0;
    if (tmp1_elvis_lhs == null) {
      return false;
    } else {
      tmp_0 = tmp1_elvis_lhs;
    }
    var task = tmp_0;
    task.au();
    return true;
  };
  protoOf(EventLoop).aw = function (task) {
    var tmp0_elvis_lhs = this.yv_1;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      // Inline function 'kotlin.also' call
      var this_0 = ArrayDeque_init_$Create$();
      this.yv_1 = this_0;
      tmp = this_0;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var queue = tmp;
    queue.wf(task);
  };
  protoOf(EventLoop).bw = function () {
    return this.wv_1.b1(delta(this, true)) >= 0;
  };
  protoOf(EventLoop).cw = function () {
    var tmp27_safe_receiver = this.yv_1;
    var tmp0_elvis_lhs = tmp27_safe_receiver == null ? null : tmp27_safe_receiver.p();
    return tmp0_elvis_lhs == null ? true : tmp0_elvis_lhs;
  };
  protoOf(EventLoop).dw = function (unconfined) {
    this.wv_1 = this.wv_1.w2(delta(this, unconfined));
    if (!unconfined)
      this.xv_1 = true;
  };
  protoOf(EventLoop).ew = function (unconfined) {
    this.wv_1 = this.wv_1.x2(delta(this, unconfined));
    if (this.wv_1.b1(new Long(0, 0)) > 0)
      return Unit_instance;
    // Inline function 'kotlinx.coroutines.assert' call
    if (this.xv_1) {
      this.fw();
    }
  };
  protoOf(EventLoop).fw = function () {
  };
  function ThreadLocalEventLoop() {
    ThreadLocalEventLoop_instance = this;
    this.gw_1 = commonThreadLocal(new Symbol('ThreadLocalEventLoop'));
  }
  protoOf(ThreadLocalEventLoop).hw = function () {
    var tmp0_elvis_lhs = this.gw_1.jw();
    var tmp;
    if (tmp0_elvis_lhs == null) {
      // Inline function 'kotlin.also' call
      var this_0 = createEventLoop();
      ThreadLocalEventLoop_getInstance().gw_1.kw(this_0);
      tmp = this_0;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  };
  var ThreadLocalEventLoop_instance;
  function ThreadLocalEventLoop_getInstance() {
    if (ThreadLocalEventLoop_instance == null)
      new ThreadLocalEventLoop();
    return ThreadLocalEventLoop_instance;
  }
  function CompletionHandlerException(message, cause) {
    RuntimeException_init_$Init$(message, cause, this);
    captureStack(this, CompletionHandlerException);
  }
  function CoroutinesInternalError(message, cause) {
    Error_init_$Init$(message, cause, this);
    captureStack(this, CoroutinesInternalError);
  }
  function Key_2() {
  }
  var Key_instance_3;
  function Key_getInstance_2() {
    return Key_instance_3;
  }
  function Job() {
  }
  function ParentJob() {
  }
  function NonDisposableHandle() {
  }
  protoOf(NonDisposableHandle).np = function () {
    return null;
  };
  protoOf(NonDisposableHandle).cs = function () {
  };
  protoOf(NonDisposableHandle).gq = function (cause) {
    return false;
  };
  protoOf(NonDisposableHandle).toString = function () {
    return 'NonDisposableHandle';
  };
  var NonDisposableHandle_instance;
  function NonDisposableHandle_getInstance() {
    return NonDisposableHandle_instance;
  }
  function ensureActive(_this__u8e3s4) {
    var tmp41_safe_receiver = _this__u8e3s4.o9(Key_instance_3);
    if (tmp41_safe_receiver == null)
      null;
    else {
      ensureActive_0(tmp41_safe_receiver);
    }
  }
  function invokeOnCompletion(_this__u8e3s4, invokeImmediately, handler) {
    invokeImmediately = invokeImmediately === VOID ? true : invokeImmediately;
    var tmp;
    if (_this__u8e3s4 instanceof JobSupport) {
      tmp = _this__u8e3s4.zp(invokeImmediately, handler);
    } else {
      var tmp_0 = handler.ju();
      tmp = _this__u8e3s4.xp(tmp_0, invokeImmediately, JobNode$invoke$ref(handler));
    }
    return tmp;
  }
  function ensureActive_0(_this__u8e3s4) {
    if (!_this__u8e3s4.uo())
      throw _this__u8e3s4.tp();
  }
  function cancel_1(_this__u8e3s4, message, cause) {
    cause = cause === VOID ? null : cause;
    return _this__u8e3s4.cq(CancellationException_0(message, cause));
  }
  function Job_0(parent) {
    parent = parent === VOID ? null : parent;
    return new JobImpl(parent);
  }
  function get_job(_this__u8e3s4) {
    var tmp0_elvis_lhs = _this__u8e3s4.o9(Key_instance_3);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      var message = "Current context doesn't contain Job in it: " + toString(_this__u8e3s4);
      throw IllegalStateException_init_$Create$(toString(message));
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function get_isActive_0(_this__u8e3s4) {
    var tmp39_safe_receiver = _this__u8e3s4.o9(Key_instance_3);
    var tmp0_elvis_lhs = tmp39_safe_receiver == null ? null : tmp39_safe_receiver.uo();
    return tmp0_elvis_lhs == null ? true : tmp0_elvis_lhs;
  }
  function cancel_2(_this__u8e3s4, cause) {
    cause = cause === VOID ? null : cause;
    var tmp40_safe_receiver = _this__u8e3s4.o9(Key_instance_3);
    if (tmp40_safe_receiver == null)
      null;
    else {
      tmp40_safe_receiver.cq(cause);
    }
  }
  function JobNode$invoke$ref($boundThis) {
    var l = function (p0) {
      $boundThis.bs(p0);
      return Unit_instance;
    };
    l.callableName = 'invoke';
    return l;
  }
  function get_COMPLETING_ALREADY() {
    _init_properties_JobSupport_kt__68f172();
    return COMPLETING_ALREADY;
  }
  var COMPLETING_ALREADY;
  function get_COMPLETING_WAITING_CHILDREN() {
    _init_properties_JobSupport_kt__68f172();
    return COMPLETING_WAITING_CHILDREN;
  }
  var COMPLETING_WAITING_CHILDREN;
  function get_COMPLETING_RETRY() {
    _init_properties_JobSupport_kt__68f172();
    return COMPLETING_RETRY;
  }
  var COMPLETING_RETRY;
  function get_TOO_LATE_TO_CANCEL() {
    _init_properties_JobSupport_kt__68f172();
    return TOO_LATE_TO_CANCEL;
  }
  var TOO_LATE_TO_CANCEL;
  function get_SEALED() {
    _init_properties_JobSupport_kt__68f172();
    return SEALED;
  }
  var SEALED;
  function get_EMPTY_NEW() {
    _init_properties_JobSupport_kt__68f172();
    return EMPTY_NEW;
  }
  var EMPTY_NEW;
  function get_EMPTY_ACTIVE() {
    _init_properties_JobSupport_kt__68f172();
    return EMPTY_ACTIVE;
  }
  var EMPTY_ACTIVE;
  function Empty(isActive) {
    this.lw_1 = isActive;
  }
  protoOf(Empty).uo = function () {
    return this.lw_1;
  };
  protoOf(Empty).pu = function () {
    return null;
  };
  protoOf(Empty).toString = function () {
    return 'Empty{' + (this.lw_1 ? 'Active' : 'New') + '}';
  };
  function Incomplete() {
  }
  function NodeList() {
    LockFreeLinkedListHead.call(this);
  }
  protoOf(NodeList).uo = function () {
    return true;
  };
  protoOf(NodeList).pu = function () {
    return this;
  };
  protoOf(NodeList).pw = function (state) {
    // Inline function 'kotlin.text.buildString' call
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$();
    this_0.g8('List{');
    this_0.g8(state);
    this_0.g8('}[');
    var first = true;
    // Inline function 'kotlinx.coroutines.internal.LockFreeLinkedListHead.forEach' call
    var cur = this.qu_1;
    while (!equals(cur, this)) {
      var node = cur;
      if (node instanceof JobNode) {
        if (first) {
          first = false;
        } else
          this_0.g8(', ');
        this_0.f8(node);
      }
      cur = cur.qu_1;
    }
    this_0.g8(']');
    return this_0.toString();
  };
  protoOf(NodeList).toString = function () {
    return get_DEBUG() ? this.pw('Active') : protoOf(LockFreeLinkedListHead).toString.call(this);
  };
  function JobNode() {
    LockFreeLinkedListNode.call(this);
  }
  protoOf(JobNode).ou = function () {
    var tmp = this.nu_1;
    if (!(tmp == null))
      return tmp;
    else {
      throwUninitializedPropertyAccessException('job');
    }
  };
  protoOf(JobNode).uo = function () {
    return true;
  };
  protoOf(JobNode).pu = function () {
    return null;
  };
  protoOf(JobNode).cs = function () {
    return this.ou().aq(this);
  };
  protoOf(JobNode).toString = function () {
    return get_classSimpleName(this) + '@' + get_hexAddress(this) + '[job@' + get_hexAddress(this.ou()) + ']';
  };
  function _set_exceptionsHolder__tqm22h($this, value) {
    $this.uw_1.kotlinx$atomicfu$value = value;
  }
  function _get_exceptionsHolder__nhszp($this) {
    return $this.uw_1.kotlinx$atomicfu$value;
  }
  function allocateList($this) {
    return ArrayList_init_$Create$(4);
  }
  function finalizeFinishingState($this, state, proposedUpdate) {
    // Inline function 'kotlinx.coroutines.assert' call
    // Inline function 'kotlinx.coroutines.assert' call
    // Inline function 'kotlinx.coroutines.assert' call
    var tmp46_safe_receiver = proposedUpdate instanceof CompletedExceptionally ? proposedUpdate : null;
    var proposedException = tmp46_safe_receiver == null ? null : tmp46_safe_receiver.zo_1;
    var wasCancelling;
    // Inline function 'kotlinx.coroutines.internal.synchronized' call
    // Inline function 'kotlinx.coroutines.internal.synchronizedImpl' call
    wasCancelling = state.vw();
    var exceptions = state.ww(proposedException);
    var finalCause = getFinalRootCause($this, state, exceptions);
    if (!(finalCause == null)) {
      addSuppressedExceptions($this, finalCause, exceptions);
    }
    var finalException = finalCause;
    var finalState = finalException == null ? proposedUpdate : finalException === proposedException ? proposedUpdate : new CompletedExceptionally(finalException);
    if (!(finalException == null)) {
      var handled = cancelParent($this, finalException) || $this.nq(finalException);
      if (handled) {
        (finalState instanceof CompletedExceptionally ? finalState : THROW_CCE()).bt();
      }
    }
    if (!wasCancelling) {
      $this.kq(finalException);
    }
    $this.yo(finalState);
    var casSuccess = $this.no_1.atomicfu$compareAndSet(state, boxIncomplete(finalState));
    // Inline function 'kotlinx.coroutines.assert' call
    completeStateFinalization($this, state, finalState);
    return finalState;
  }
  function getFinalRootCause($this, state, exceptions) {
    if (exceptions.p()) {
      if (state.vw()) {
        // Inline function 'kotlinx.coroutines.JobSupport.defaultCancellationException' call
        return new JobCancellationException(null == null ? $this.xo() : null, null, $this);
      }
      return null;
    }
    var tmp$ret$2;
    $l$block: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var _iterator__ex2g4s = exceptions.j();
      while (_iterator__ex2g4s.k()) {
        var element = _iterator__ex2g4s.l();
        if (!(element instanceof CancellationException)) {
          tmp$ret$2 = element;
          break $l$block;
        }
      }
      tmp$ret$2 = null;
    }
    var firstNonCancellation = tmp$ret$2;
    if (!(firstNonCancellation == null))
      return firstNonCancellation;
    var first = exceptions.o(0);
    if (first instanceof TimeoutCancellationException) {
      var tmp$ret$4;
      $l$block_0: {
        // Inline function 'kotlin.collections.firstOrNull' call
        var _iterator__ex2g4s_0 = exceptions.j();
        while (_iterator__ex2g4s_0.k()) {
          var element_0 = _iterator__ex2g4s_0.l();
          var tmp;
          if (!(element_0 === first)) {
            tmp = element_0 instanceof TimeoutCancellationException;
          } else {
            tmp = false;
          }
          if (tmp) {
            tmp$ret$4 = element_0;
            break $l$block_0;
          }
        }
        tmp$ret$4 = null;
      }
      var detailedTimeoutException = tmp$ret$4;
      if (!(detailedTimeoutException == null))
        return detailedTimeoutException;
    }
    return first;
  }
  function addSuppressedExceptions($this, rootCause, exceptions) {
    if (exceptions.m() <= 1)
      return Unit_instance;
    var seenExceptions = identitySet(exceptions.m());
    var unwrappedCause = unwrap(rootCause);
    var _iterator__ex2g4s = exceptions.j();
    while (_iterator__ex2g4s.k()) {
      var exception = _iterator__ex2g4s.l();
      var unwrapped = unwrap(exception);
      var tmp;
      var tmp_0;
      if (!(unwrapped === rootCause) && !(unwrapped === unwrappedCause)) {
        tmp_0 = !(unwrapped instanceof CancellationException);
      } else {
        tmp_0 = false;
      }
      if (tmp_0) {
        tmp = seenExceptions.e(unwrapped);
      } else {
        tmp = false;
      }
      if (tmp) {
        addSuppressed(rootCause, unwrapped);
      }
    }
  }
  function tryFinalizeSimpleState($this, state, update) {
    // Inline function 'kotlinx.coroutines.assert' call
    // Inline function 'kotlinx.coroutines.assert' call
    if (!$this.no_1.atomicfu$compareAndSet(state, boxIncomplete(update)))
      return false;
    $this.kq(null);
    $this.yo(update);
    completeStateFinalization($this, state, update);
    return true;
  }
  function completeStateFinalization($this, state, update) {
    var tmp47_safe_receiver = $this.mp();
    if (tmp47_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      tmp47_safe_receiver.cs();
      $this.lp(NonDisposableHandle_instance);
    }
    var tmp48_safe_receiver = update instanceof CompletedExceptionally ? update : null;
    var cause = tmp48_safe_receiver == null ? null : tmp48_safe_receiver.zo_1;
    if (state instanceof JobNode) {
      try {
        state.bs(cause);
      } catch ($p) {
        if ($p instanceof Error) {
          var ex = $p;
          $this.fp(new CompletionHandlerException('Exception in completion handler ' + state.toString() + ' for ' + $this.toString(), ex));
        } else {
          throw $p;
        }
      }
    } else {
      var tmp49_safe_receiver = state.pu();
      if (tmp49_safe_receiver == null)
        null;
      else {
        notifyCompletion($this, tmp49_safe_receiver, cause);
      }
    }
  }
  function notifyCancelling($this, list, cause) {
    $this.kq(cause);
    list.qw(4);
    // Inline function 'kotlinx.coroutines.JobSupport.notifyHandlers' call
    var exception = null;
    // Inline function 'kotlinx.coroutines.internal.LockFreeLinkedListHead.forEach' call
    var cur = list.qu_1;
    while (!equals(cur, list)) {
      var node = cur;
      var tmp;
      if (node instanceof JobNode) {
        tmp = node.ju();
      } else {
        tmp = false;
      }
      if (tmp) {
        try {
          node.bs(cause);
        } catch ($p) {
          if ($p instanceof Error) {
            var ex = $p;
            var tmp50_safe_receiver = exception;
            var tmp_0;
            if (tmp50_safe_receiver == null) {
              tmp_0 = null;
            } else {
              // Inline function 'kotlin.apply' call
              addSuppressed(tmp50_safe_receiver, ex);
              tmp_0 = tmp50_safe_receiver;
            }
            if (tmp_0 == null) {
              // Inline function 'kotlin.run' call
              exception = new CompletionHandlerException('Exception in completion handler ' + node.toString() + ' for ' + $this.toString(), ex);
            }
          } else {
            throw $p;
          }
        }
      }
      cur = cur.qu_1;
    }
    var tmp51_safe_receiver = exception;
    if (tmp51_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      $this.fp(tmp51_safe_receiver);
    }
    cancelParent($this, cause);
  }
  function cancelParent($this, cause) {
    if ($this.lq())
      return true;
    var isCancellation = cause instanceof CancellationException;
    var parent = $this.mp();
    if (parent === null || parent === NonDisposableHandle_instance) {
      return isCancellation;
    }
    return parent.gq(cause) || isCancellation;
  }
  function notifyCompletion($this, _this__u8e3s4, cause) {
    _this__u8e3s4.qw(1);
    // Inline function 'kotlinx.coroutines.JobSupport.notifyHandlers' call
    var exception = null;
    // Inline function 'kotlinx.coroutines.internal.LockFreeLinkedListHead.forEach' call
    var cur = _this__u8e3s4.qu_1;
    while (!equals(cur, _this__u8e3s4)) {
      var node = cur;
      var tmp;
      if (node instanceof JobNode) {
        tmp = true;
      } else {
        tmp = false;
      }
      if (tmp) {
        try {
          node.bs(cause);
        } catch ($p) {
          if ($p instanceof Error) {
            var ex = $p;
            var tmp50_safe_receiver = exception;
            var tmp_0;
            if (tmp50_safe_receiver == null) {
              tmp_0 = null;
            } else {
              // Inline function 'kotlin.apply' call
              addSuppressed(tmp50_safe_receiver, ex);
              tmp_0 = tmp50_safe_receiver;
            }
            if (tmp_0 == null) {
              // Inline function 'kotlin.run' call
              exception = new CompletionHandlerException('Exception in completion handler ' + node.toString() + ' for ' + $this.toString(), ex);
            }
          } else {
            throw $p;
          }
        }
      }
      cur = cur.qu_1;
    }
    var tmp51_safe_receiver = exception;
    if (tmp51_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      $this.fp(tmp51_safe_receiver);
    }
  }
  function startInternal($this, state) {
    if (state instanceof Empty) {
      if (state.lw_1)
        return 0;
      if (!$this.no_1.atomicfu$compareAndSet(state, get_EMPTY_ACTIVE()))
        return -1;
      $this.sp();
      return 1;
    } else {
      if (state instanceof InactiveNodeList) {
        if (!$this.no_1.atomicfu$compareAndSet(state, state.xw_1))
          return -1;
        $this.sp();
        return 1;
      } else {
        return 0;
      }
    }
  }
  function promoteEmptyToNodeList($this, state) {
    var list = new NodeList();
    var update = state.lw_1 ? list : new InactiveNodeList(list);
    $this.no_1.atomicfu$compareAndSet(state, update);
  }
  function promoteSingleToNodeList($this, state) {
    state.vu(new NodeList());
    // Inline function 'kotlinx.coroutines.internal.LockFreeLinkedListNode.nextNode' call
    var list = state.qu_1;
    $this.no_1.atomicfu$compareAndSet(state, list);
  }
  function joinInternal($this) {
    // Inline function 'kotlinx.coroutines.JobSupport.loopOnState' call
    while (true) {
      var state = $this.op();
      if (!(!(state == null) ? isInterface(state, Incomplete) : false))
        return false;
      if (startInternal($this, state) >= 0)
        return true;
    }
  }
  function joinSuspend($this, $completion) {
    var cancellable = new CancellableContinuationImpl(intercepted($completion), 1);
    cancellable.et();
    disposeOnCancellation(cancellable, invokeOnCompletion($this, VOID, new ResumeOnCompletion(cancellable)));
    return cancellable.mt();
  }
  function cancelMakeCompleting($this, cause) {
    // Inline function 'kotlinx.coroutines.JobSupport.loopOnState' call
    while (true) {
      var state = $this.op();
      var tmp;
      if (!(!(state == null) ? isInterface(state, Incomplete) : false)) {
        tmp = true;
      } else {
        var tmp_0;
        if (state instanceof Finishing) {
          tmp_0 = state.yw();
        } else {
          tmp_0 = false;
        }
        tmp = tmp_0;
      }
      if (tmp) {
        return get_COMPLETING_ALREADY();
      }
      var proposedUpdate = new CompletedExceptionally(createCauseException($this, cause));
      var finalState = tryMakeCompleting($this, state, proposedUpdate);
      if (!(finalState === get_COMPLETING_RETRY()))
        return finalState;
    }
  }
  function createCauseException($this, cause) {
    var tmp;
    if (cause == null ? true : cause instanceof Error) {
      var tmp_0;
      if (cause == null) {
        // Inline function 'kotlinx.coroutines.JobSupport.defaultCancellationException' call
        tmp_0 = new JobCancellationException(null == null ? $this.xo() : null, null, $this);
      } else {
        tmp_0 = cause;
      }
      tmp = tmp_0;
    } else {
      tmp = ((!(cause == null) ? isInterface(cause, ParentJob) : false) ? cause : THROW_CCE()).iq();
    }
    return tmp;
  }
  function makeCancelling($this, cause) {
    var causeExceptionCache = null;
    // Inline function 'kotlinx.coroutines.JobSupport.loopOnState' call
    while (true) {
      var tmp1 = $this.op();
      $l$block: {
        if (tmp1 instanceof Finishing) {
          // Inline function 'kotlinx.coroutines.internal.synchronized' call
          // Inline function 'kotlinx.coroutines.internal.synchronizedImpl' call
          if (tmp1.zw())
            return get_TOO_LATE_TO_CANCEL();
          var wasCancelling = tmp1.vw();
          if (!(cause == null) || !wasCancelling) {
            var tmp0_elvis_lhs = causeExceptionCache;
            var tmp;
            if (tmp0_elvis_lhs == null) {
              // Inline function 'kotlin.also' call
              var this_0 = createCauseException($this, cause);
              causeExceptionCache = this_0;
              tmp = this_0;
            } else {
              tmp = tmp0_elvis_lhs;
            }
            var causeException = tmp;
            tmp1.ax(causeException);
          }
          // Inline function 'kotlin.takeIf' call
          var this_1 = tmp1.bx();
          var tmp_0;
          if (!wasCancelling) {
            tmp_0 = this_1;
          } else {
            tmp_0 = null;
          }
          var notifyRootCause = tmp_0;
          if (notifyRootCause == null)
            null;
          else {
            // Inline function 'kotlin.let' call
            notifyCancelling($this, tmp1.rw_1, notifyRootCause);
          }
          return get_COMPLETING_ALREADY();
        } else {
          if (!(tmp1 == null) ? isInterface(tmp1, Incomplete) : false) {
            var tmp0_elvis_lhs_0 = causeExceptionCache;
            var tmp_1;
            if (tmp0_elvis_lhs_0 == null) {
              // Inline function 'kotlin.also' call
              var this_2 = createCauseException($this, cause);
              causeExceptionCache = this_2;
              tmp_1 = this_2;
            } else {
              tmp_1 = tmp0_elvis_lhs_0;
            }
            var causeException_0 = tmp_1;
            if (tmp1.uo()) {
              if (tryMakeCancelling($this, tmp1, causeException_0))
                return get_COMPLETING_ALREADY();
            } else {
              var finalState = tryMakeCompleting($this, tmp1, new CompletedExceptionally(causeException_0));
              if (finalState === get_COMPLETING_ALREADY()) {
                // Inline function 'kotlin.error' call
                var message = 'Cannot happen in ' + toString(tmp1);
                throw IllegalStateException_init_$Create$(toString(message));
              } else if (finalState === get_COMPLETING_RETRY()) {
                break $l$block;
              } else
                return finalState;
            }
          } else {
            return get_TOO_LATE_TO_CANCEL();
          }
        }
      }
    }
  }
  function getOrPromoteCancellingList($this, state) {
    var tmp0_elvis_lhs = state.pu();
    var tmp;
    if (tmp0_elvis_lhs == null) {
      var tmp_0;
      if (state instanceof Empty) {
        tmp_0 = new NodeList();
      } else {
        if (state instanceof JobNode) {
          promoteSingleToNodeList($this, state);
          tmp_0 = null;
        } else {
          var message = 'State should have list: ' + toString(state);
          throw IllegalStateException_init_$Create$(toString(message));
        }
      }
      tmp = tmp_0;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function tryMakeCancelling($this, state, rootCause) {
    // Inline function 'kotlinx.coroutines.assert' call
    // Inline function 'kotlinx.coroutines.assert' call
    var tmp0_elvis_lhs = getOrPromoteCancellingList($this, state);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return false;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var list = tmp;
    var cancelling = new Finishing(list, false, rootCause);
    if (!$this.no_1.atomicfu$compareAndSet(state, cancelling))
      return false;
    notifyCancelling($this, list, rootCause);
    return true;
  }
  function tryMakeCompleting($this, state, proposedUpdate) {
    if (!(!(state == null) ? isInterface(state, Incomplete) : false))
      return get_COMPLETING_ALREADY();
    var tmp;
    var tmp_0;
    var tmp_1;
    if (state instanceof Empty) {
      tmp_1 = true;
    } else {
      tmp_1 = state instanceof JobNode;
    }
    if (tmp_1) {
      tmp_0 = !(state instanceof ChildHandleNode);
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      tmp = !(proposedUpdate instanceof CompletedExceptionally);
    } else {
      tmp = false;
    }
    if (tmp) {
      if (tryFinalizeSimpleState($this, state, proposedUpdate)) {
        return proposedUpdate;
      }
      return get_COMPLETING_RETRY();
    }
    return tryMakeCompletingSlowPath($this, state, proposedUpdate);
  }
  function tryMakeCompletingSlowPath($this, state, proposedUpdate) {
    var tmp0_elvis_lhs = getOrPromoteCancellingList($this, state);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return get_COMPLETING_RETRY();
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var list = tmp;
    var tmp1_elvis_lhs = state instanceof Finishing ? state : null;
    var finishing = tmp1_elvis_lhs == null ? new Finishing(list, false, null) : tmp1_elvis_lhs;
    var notifyRootCause;
    // Inline function 'kotlinx.coroutines.internal.synchronized' call
    // Inline function 'kotlinx.coroutines.internal.synchronizedImpl' call
    if (finishing.yw())
      return get_COMPLETING_ALREADY();
    finishing.cx(true);
    if (!(finishing === state)) {
      if (!$this.no_1.atomicfu$compareAndSet(state, finishing))
        return get_COMPLETING_RETRY();
    }
    // Inline function 'kotlinx.coroutines.assert' call
    var wasCancelling = finishing.vw();
    var tmp65_safe_receiver = proposedUpdate instanceof CompletedExceptionally ? proposedUpdate : null;
    if (tmp65_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      finishing.ax(tmp65_safe_receiver.zo_1);
    }
    // Inline function 'kotlin.takeIf' call
    var this_0 = finishing.bx();
    var tmp_0;
    if (!wasCancelling) {
      tmp_0 = this_0;
    } else {
      tmp_0 = null;
    }
    notifyRootCause = tmp_0;
    if (notifyRootCause == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      notifyCancelling($this, list, notifyRootCause);
    }
    var child = nextChild($this, list);
    if (!(child == null) && tryWaitForChild($this, finishing, child, proposedUpdate))
      return get_COMPLETING_WAITING_CHILDREN();
    list.qw(2);
    var anotherChild = nextChild($this, list);
    if (!(anotherChild == null) && tryWaitForChild($this, finishing, anotherChild, proposedUpdate))
      return get_COMPLETING_WAITING_CHILDREN();
    return finalizeFinishingState($this, finishing, proposedUpdate);
  }
  function _get_exceptionOrNull__b3j7js($this, _this__u8e3s4) {
    var tmp67_safe_receiver = _this__u8e3s4 instanceof CompletedExceptionally ? _this__u8e3s4 : null;
    return tmp67_safe_receiver == null ? null : tmp67_safe_receiver.zo_1;
  }
  function tryWaitForChild($this, state, child, proposedUpdate) {
    var $this_0 = $this;
    var state_0 = state;
    var child_0 = child;
    var proposedUpdate_0 = proposedUpdate;
    $l$1: do {
      $l$0: do {
        var handle = invokeOnCompletion(child_0.hx_1, false, new ChildCompletion($this_0, state_0, child_0, proposedUpdate_0));
        if (!(handle === NonDisposableHandle_instance))
          return true;
        var tmp0_elvis_lhs = nextChild($this_0, child_0);
        var tmp;
        if (tmp0_elvis_lhs == null) {
          return false;
        } else {
          tmp = tmp0_elvis_lhs;
        }
        var nextChild_0 = tmp;
        var tmp0 = $this_0;
        var tmp1 = state_0;
        var tmp3 = proposedUpdate_0;
        $this_0 = tmp0;
        state_0 = tmp1;
        child_0 = nextChild_0;
        proposedUpdate_0 = tmp3;
        continue $l$0;
      }
       while (false);
    }
     while (true);
  }
  function continueCompleting($this, state, lastChild, proposedUpdate) {
    // Inline function 'kotlinx.coroutines.assert' call
    var waitChild = nextChild($this, lastChild);
    if (!(waitChild == null) && tryWaitForChild($this, state, waitChild, proposedUpdate))
      return Unit_instance;
    state.rw_1.qw(2);
    var waitChildAgain = nextChild($this, lastChild);
    if (!(waitChildAgain == null) && tryWaitForChild($this, state, waitChildAgain, proposedUpdate)) {
      return Unit_instance;
    }
    var finalState = finalizeFinishingState($this, state, proposedUpdate);
    $this.ep(finalState);
  }
  function nextChild($this, _this__u8e3s4) {
    var cur = _this__u8e3s4;
    $l$loop: while (true) {
      // Inline function 'kotlinx.coroutines.internal.LockFreeLinkedListNode.isRemoved' call
      if (!cur.su_1) {
        break $l$loop;
      }
      // Inline function 'kotlinx.coroutines.internal.LockFreeLinkedListNode.prevNode' call
      cur = cur.ru_1;
    }
    $l$loop_0: while (true) {
      // Inline function 'kotlinx.coroutines.internal.LockFreeLinkedListNode.nextNode' call
      cur = cur.qu_1;
      // Inline function 'kotlinx.coroutines.internal.LockFreeLinkedListNode.isRemoved' call
      if (cur.su_1)
        continue $l$loop_0;
      if (cur instanceof ChildHandleNode)
        return cur;
      if (cur instanceof NodeList)
        return null;
    }
  }
  function stateString($this, state) {
    var tmp;
    if (state instanceof Finishing) {
      tmp = state.vw() ? 'Cancelling' : state.yw() ? 'Completing' : 'Active';
    } else {
      if (!(state == null) ? isInterface(state, Incomplete) : false) {
        tmp = state.uo() ? 'Active' : 'New';
      } else {
        if (state instanceof CompletedExceptionally) {
          tmp = 'Cancelled';
        } else {
          tmp = 'Completed';
        }
      }
    }
    return tmp;
  }
  function Finishing(list, isCompleting, rootCause) {
    SynchronizedObject.call(this);
    this.rw_1 = list;
    this.sw_1 = atomic$boolean$1(isCompleting);
    this.tw_1 = atomic$ref$1(rootCause);
    this.uw_1 = atomic$ref$1(null);
  }
  protoOf(Finishing).pu = function () {
    return this.rw_1;
  };
  protoOf(Finishing).cx = function (value) {
    this.sw_1.kotlinx$atomicfu$value = value;
  };
  protoOf(Finishing).yw = function () {
    return this.sw_1.kotlinx$atomicfu$value;
  };
  protoOf(Finishing).ix = function (value) {
    this.tw_1.kotlinx$atomicfu$value = value;
  };
  protoOf(Finishing).bx = function () {
    return this.tw_1.kotlinx$atomicfu$value;
  };
  protoOf(Finishing).zw = function () {
    return _get_exceptionsHolder__nhszp(this) === get_SEALED();
  };
  protoOf(Finishing).vw = function () {
    return !(this.bx() == null);
  };
  protoOf(Finishing).uo = function () {
    return this.bx() == null;
  };
  protoOf(Finishing).ww = function (proposedException) {
    var eh = _get_exceptionsHolder__nhszp(this);
    var tmp;
    if (eh == null) {
      tmp = allocateList(this);
    } else {
      if (eh instanceof Error) {
        // Inline function 'kotlin.also' call
        var this_0 = allocateList(this);
        this_0.e(eh);
        tmp = this_0;
      } else {
        if (eh instanceof ArrayList) {
          tmp = eh instanceof ArrayList ? eh : THROW_CCE();
        } else {
          var message = 'State is ' + toString_0(eh);
          throw IllegalStateException_init_$Create$(toString(message));
        }
      }
    }
    var list = tmp;
    var rootCause = this.bx();
    if (rootCause == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      list.f2(0, rootCause);
    }
    if (!(proposedException == null) && !equals(proposedException, rootCause)) {
      list.e(proposedException);
    }
    _set_exceptionsHolder__tqm22h(this, get_SEALED());
    return list;
  };
  protoOf(Finishing).ax = function (exception) {
    var rootCause = this.bx();
    if (rootCause == null) {
      this.ix(exception);
      return Unit_instance;
    }
    if (exception === rootCause)
      return Unit_instance;
    var eh = _get_exceptionsHolder__nhszp(this);
    if (eh == null) {
      _set_exceptionsHolder__tqm22h(this, exception);
    } else {
      if (eh instanceof Error) {
        if (exception === eh)
          return Unit_instance;
        // Inline function 'kotlin.apply' call
        var this_0 = allocateList(this);
        this_0.e(eh);
        this_0.e(exception);
        _set_exceptionsHolder__tqm22h(this, this_0);
      } else {
        if (eh instanceof ArrayList) {
          (eh instanceof ArrayList ? eh : THROW_CCE()).e(exception);
        } else {
          // Inline function 'kotlin.error' call
          var message = 'State is ' + toString_0(eh);
          throw IllegalStateException_init_$Create$(toString(message));
        }
      }
    }
  };
  protoOf(Finishing).toString = function () {
    return 'Finishing[cancelling=' + this.vw() + ', completing=' + this.yw() + ', rootCause=' + toString_0(this.bx()) + ', exceptions=' + toString_0(_get_exceptionsHolder__nhszp(this)) + ', list=' + this.rw_1.toString() + ']';
  };
  function ChildCompletion(parent, state, child, proposedUpdate) {
    JobNode.call(this);
    this.nx_1 = parent;
    this.ox_1 = state;
    this.px_1 = child;
    this.qx_1 = proposedUpdate;
  }
  protoOf(ChildCompletion).ju = function () {
    return false;
  };
  protoOf(ChildCompletion).bs = function (cause) {
    continueCompleting(this.nx_1, this.ox_1, this.px_1, this.qx_1);
  };
  function AwaitContinuation(delegate, job) {
    CancellableContinuationImpl.call(this, delegate, 1);
    this.xx_1 = job;
  }
  protoOf(AwaitContinuation).lt = function (parent) {
    var state = this.xx_1.op();
    if (state instanceof Finishing) {
      var tmp73_safe_receiver = state.bx();
      if (tmp73_safe_receiver == null)
        null;
      else {
        // Inline function 'kotlin.let' call
        return tmp73_safe_receiver;
      }
    }
    if (state instanceof CompletedExceptionally)
      return state.zo_1;
    return parent.tp();
  };
  protoOf(AwaitContinuation).zt = function () {
    return 'AwaitContinuation';
  };
  function awaitSuspend($this, $completion) {
    var cont = new AwaitContinuation(intercepted($completion), $this);
    cont.et();
    disposeOnCancellation(cont, invokeOnCompletion($this, VOID, new ResumeAwaitOnCompletion(cont)));
    return cont.mt();
  }
  function JobSupport(active) {
    this.no_1 = atomic$ref$1(active ? get_EMPTY_ACTIVE() : get_EMPTY_NEW());
    this.oo_1 = atomic$ref$1(null);
  }
  protoOf(JobSupport).v = function () {
    return Key_instance_3;
  };
  protoOf(JobSupport).lp = function (value) {
    this.oo_1.kotlinx$atomicfu$value = value;
  };
  protoOf(JobSupport).mp = function () {
    return this.oo_1.kotlinx$atomicfu$value;
  };
  protoOf(JobSupport).np = function () {
    var tmp45_safe_receiver = this.mp();
    return tmp45_safe_receiver == null ? null : tmp45_safe_receiver.np();
  };
  protoOf(JobSupport).po = function (parent) {
    // Inline function 'kotlinx.coroutines.assert' call
    if (parent == null) {
      this.lp(NonDisposableHandle_instance);
      return Unit_instance;
    }
    parent.rp();
    var handle = parent.jq(this);
    this.lp(handle);
    if (this.pp()) {
      handle.cs();
      this.lp(NonDisposableHandle_instance);
    }
  };
  protoOf(JobSupport).op = function () {
    return this.no_1.kotlinx$atomicfu$value;
  };
  protoOf(JobSupport).uo = function () {
    var state = this.op();
    var tmp;
    if (!(state == null) ? isInterface(state, Incomplete) : false) {
      tmp = state.uo();
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(JobSupport).pp = function () {
    var tmp = this.op();
    return !(!(tmp == null) ? isInterface(tmp, Incomplete) : false);
  };
  protoOf(JobSupport).qp = function () {
    var state = this.op();
    var tmp;
    if (state instanceof CompletedExceptionally) {
      tmp = true;
    } else {
      var tmp_0;
      if (state instanceof Finishing) {
        tmp_0 = state.vw();
      } else {
        tmp_0 = false;
      }
      tmp = tmp_0;
    }
    return tmp;
  };
  protoOf(JobSupport).rp = function () {
    // Inline function 'kotlinx.coroutines.JobSupport.loopOnState' call
    while (true) {
      var state = this.op();
      var tmp52_subject = startInternal(this, state);
      if (tmp52_subject === 0)
        return false;
      else if (tmp52_subject === 1)
        return true;
    }
  };
  protoOf(JobSupport).sp = function () {
  };
  protoOf(JobSupport).tp = function () {
    var state = this.op();
    var tmp;
    if (state instanceof Finishing) {
      var tmp54_safe_receiver = state.bx();
      var tmp0_elvis_lhs = tmp54_safe_receiver == null ? null : this.up(tmp54_safe_receiver, get_classSimpleName(this) + ' is cancelling');
      var tmp_0;
      if (tmp0_elvis_lhs == null) {
        var message = 'Job is still new or active: ' + this.toString();
        throw IllegalStateException_init_$Create$(toString(message));
      } else {
        tmp_0 = tmp0_elvis_lhs;
      }
      tmp = tmp_0;
    } else {
      if (!(state == null) ? isInterface(state, Incomplete) : false) {
        var message_0 = 'Job is still new or active: ' + this.toString();
        throw IllegalStateException_init_$Create$(toString(message_0));
      } else {
        if (state instanceof CompletedExceptionally) {
          tmp = this.vp(state.zo_1);
        } else {
          tmp = new JobCancellationException(get_classSimpleName(this) + ' has completed normally', null, this);
        }
      }
    }
    return tmp;
  };
  protoOf(JobSupport).up = function (_this__u8e3s4, message) {
    var tmp0_elvis_lhs = _this__u8e3s4 instanceof CancellationException ? _this__u8e3s4 : null;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      // Inline function 'kotlinx.coroutines.JobSupport.defaultCancellationException' call
      tmp = new JobCancellationException(message == null ? this.xo() : message, _this__u8e3s4, this);
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  };
  protoOf(JobSupport).vp = function (_this__u8e3s4, message, $super) {
    message = message === VOID ? null : message;
    return $super === VOID ? this.up(_this__u8e3s4, message) : $super.up.call(this, _this__u8e3s4, message);
  };
  protoOf(JobSupport).wp = function (handler) {
    return this.zp(true, new InvokeOnCompletion(handler));
  };
  protoOf(JobSupport).xp = function (onCancelling, invokeImmediately, handler) {
    var tmp;
    if (onCancelling) {
      tmp = new InvokeOnCancelling(handler);
    } else {
      tmp = new InvokeOnCompletion(handler);
    }
    return this.zp(invokeImmediately, tmp);
  };
  protoOf(JobSupport).zp = function (invokeImmediately, node) {
    node.nu_1 = this;
    var tmp$ret$0;
    $l$block_1: {
      // Inline function 'kotlinx.coroutines.JobSupport.tryPutNodeIntoList' call
      // Inline function 'kotlinx.coroutines.JobSupport.loopOnState' call
      while (true) {
        var state = this.op();
        if (state instanceof Empty) {
          if (state.lw_1) {
            if (this.no_1.atomicfu$compareAndSet(state, node)) {
              tmp$ret$0 = true;
              break $l$block_1;
            }
          } else {
            promoteEmptyToNodeList(this, state);
          }
        } else {
          if (!(state == null) ? isInterface(state, Incomplete) : false) {
            var list = state.pu();
            if (list == null) {
              promoteSingleToNodeList(this, state instanceof JobNode ? state : THROW_CCE());
            } else {
              var tmp;
              if (node.ju()) {
                var tmp55_safe_receiver = state instanceof Finishing ? state : null;
                var rootCause = tmp55_safe_receiver == null ? null : tmp55_safe_receiver.bx();
                var tmp_0;
                if (rootCause == null) {
                  tmp_0 = list.tu(node, 5);
                } else {
                  if (invokeImmediately) {
                    node.bs(rootCause);
                  }
                  return NonDisposableHandle_instance;
                }
                tmp = tmp_0;
              } else {
                tmp = list.tu(node, 1);
              }
              if (tmp) {
                tmp$ret$0 = true;
                break $l$block_1;
              }
            }
          } else {
            tmp$ret$0 = false;
            break $l$block_1;
          }
        }
      }
    }
    var added = tmp$ret$0;
    if (added)
      return node;
    else if (invokeImmediately) {
      var tmp_1 = this.op();
      var tmp56_safe_receiver = tmp_1 instanceof CompletedExceptionally ? tmp_1 : null;
      node.bs(tmp56_safe_receiver == null ? null : tmp56_safe_receiver.zo_1);
    }
    return NonDisposableHandle_instance;
  };
  protoOf(JobSupport).lv = function ($completion) {
    if (!joinInternal(this)) {
      // Inline function 'kotlin.js.getCoroutineContext' call
      var tmp$ret$0 = $completion.h9();
      ensureActive(tmp$ret$0);
      return Unit_instance;
    }
    return joinSuspend(this, $completion);
  };
  protoOf(JobSupport).aq = function (node) {
    // Inline function 'kotlinx.coroutines.JobSupport.loopOnState' call
    while (true) {
      var state = this.op();
      if (state instanceof JobNode) {
        if (!(state === node))
          return Unit_instance;
        if (this.no_1.atomicfu$compareAndSet(state, get_EMPTY_ACTIVE()))
          return Unit_instance;
      } else {
        if (!(state == null) ? isInterface(state, Incomplete) : false) {
          if (!(state.pu() == null)) {
            node.uu();
          }
          return Unit_instance;
        } else {
          return Unit_instance;
        }
      }
    }
  };
  protoOf(JobSupport).bq = function () {
    return false;
  };
  protoOf(JobSupport).cq = function (cause) {
    var tmp;
    if (cause == null) {
      // Inline function 'kotlinx.coroutines.JobSupport.defaultCancellationException' call
      tmp = new JobCancellationException(null == null ? this.xo() : null, null, this);
    } else {
      tmp = cause;
    }
    this.eq(tmp);
  };
  protoOf(JobSupport).xo = function () {
    return 'Job was cancelled';
  };
  protoOf(JobSupport).eq = function (cause) {
    this.hq(cause);
  };
  protoOf(JobSupport).fq = function (parentJob) {
    this.hq(parentJob);
  };
  protoOf(JobSupport).gq = function (cause) {
    if (cause instanceof CancellationException)
      return true;
    return this.hq(cause) && this.mq();
  };
  protoOf(JobSupport).hq = function (cause) {
    var finalState = get_COMPLETING_ALREADY();
    if (this.bq()) {
      finalState = cancelMakeCompleting(this, cause);
      if (finalState === get_COMPLETING_WAITING_CHILDREN())
        return true;
    }
    if (finalState === get_COMPLETING_ALREADY()) {
      finalState = makeCancelling(this, cause);
    }
    var tmp;
    if (finalState === get_COMPLETING_ALREADY()) {
      tmp = true;
    } else if (finalState === get_COMPLETING_WAITING_CHILDREN()) {
      tmp = true;
    } else if (finalState === get_TOO_LATE_TO_CANCEL()) {
      tmp = false;
    } else {
      this.ep(finalState);
      tmp = true;
    }
    return tmp;
  };
  protoOf(JobSupport).iq = function () {
    var state = this.op();
    var tmp;
    if (state instanceof Finishing) {
      tmp = state.bx();
    } else {
      if (state instanceof CompletedExceptionally) {
        tmp = state.zo_1;
      } else {
        if (!(state == null) ? isInterface(state, Incomplete) : false) {
          var message = 'Cannot be cancelling child in this state: ' + toString(state);
          throw IllegalStateException_init_$Create$(toString(message));
        } else {
          tmp = null;
        }
      }
    }
    var rootCause = tmp;
    var tmp0_elvis_lhs = rootCause instanceof CancellationException ? rootCause : null;
    return tmp0_elvis_lhs == null ? new JobCancellationException('Parent job is ' + stateString(this, state), rootCause, this) : tmp0_elvis_lhs;
  };
  protoOf(JobSupport).iv = function (proposedUpdate) {
    // Inline function 'kotlinx.coroutines.JobSupport.loopOnState' call
    while (true) {
      var tmp1 = this.op();
      $l$block: {
        var finalState = tryMakeCompleting(this, tmp1, proposedUpdate);
        if (finalState === get_COMPLETING_ALREADY())
          return false;
        else if (finalState === get_COMPLETING_WAITING_CHILDREN())
          return true;
        else if (finalState === get_COMPLETING_RETRY()) {
          break $l$block;
        } else {
          this.ep(finalState);
          return true;
        }
      }
    }
  };
  protoOf(JobSupport).cp = function (proposedUpdate) {
    // Inline function 'kotlinx.coroutines.JobSupport.loopOnState' call
    while (true) {
      var tmp1 = this.op();
      $l$block: {
        var finalState = tryMakeCompleting(this, tmp1, proposedUpdate);
        if (finalState === get_COMPLETING_ALREADY())
          throw IllegalStateException_init_$Create$_0('Job ' + this.toString() + ' is already complete or completing, ' + ('but is being completed with ' + toString_0(proposedUpdate)), _get_exceptionOrNull__b3j7js(this, proposedUpdate));
        else if (finalState === get_COMPLETING_RETRY()) {
          break $l$block;
        } else
          return finalState;
      }
    }
  };
  protoOf(JobSupport).jq = function (child) {
    // Inline function 'kotlin.also' call
    var this_0 = new ChildHandleNode(child);
    this_0.nu_1 = this;
    var node = this_0;
    var tmp$ret$2;
    $l$block_1: {
      // Inline function 'kotlinx.coroutines.JobSupport.tryPutNodeIntoList' call
      // Inline function 'kotlinx.coroutines.JobSupport.loopOnState' call
      while (true) {
        var state = this.op();
        if (state instanceof Empty) {
          if (state.lw_1) {
            if (this.no_1.atomicfu$compareAndSet(state, node)) {
              tmp$ret$2 = true;
              break $l$block_1;
            }
          } else {
            promoteEmptyToNodeList(this, state);
          }
        } else {
          if (!(state == null) ? isInterface(state, Incomplete) : false) {
            var list = state.pu();
            if (list == null) {
              promoteSingleToNodeList(this, state instanceof JobNode ? state : THROW_CCE());
            } else {
              var addedBeforeCancellation = list.tu(node, 7);
              var tmp;
              if (addedBeforeCancellation) {
                tmp = true;
              } else {
                var addedBeforeCompletion = list.tu(node, 3);
                var latestState = this.op();
                var tmp_0;
                if (latestState instanceof Finishing) {
                  tmp_0 = latestState.bx();
                } else {
                  // Inline function 'kotlinx.coroutines.assert' call
                  var tmp69_safe_receiver = latestState instanceof CompletedExceptionally ? latestState : null;
                  tmp_0 = tmp69_safe_receiver == null ? null : tmp69_safe_receiver.zo_1;
                }
                var rootCause = tmp_0;
                node.bs(rootCause);
                var tmp_1;
                if (addedBeforeCompletion) {
                  // Inline function 'kotlinx.coroutines.assert' call
                  tmp_1 = true;
                } else {
                  return NonDisposableHandle_instance;
                }
                tmp = tmp_1;
              }
              if (tmp) {
                tmp$ret$2 = true;
                break $l$block_1;
              }
            }
          } else {
            tmp$ret$2 = false;
            break $l$block_1;
          }
        }
      }
    }
    var added = tmp$ret$2;
    if (added)
      return node;
    var tmp_2 = this.op();
    var tmp70_safe_receiver = tmp_2 instanceof CompletedExceptionally ? tmp_2 : null;
    node.bs(tmp70_safe_receiver == null ? null : tmp70_safe_receiver.zo_1);
    return NonDisposableHandle_instance;
  };
  protoOf(JobSupport).fp = function (exception) {
    throw exception;
  };
  protoOf(JobSupport).kq = function (cause) {
  };
  protoOf(JobSupport).lq = function () {
    return false;
  };
  protoOf(JobSupport).mq = function () {
    return true;
  };
  protoOf(JobSupport).nq = function (exception) {
    return false;
  };
  protoOf(JobSupport).yo = function (state) {
  };
  protoOf(JobSupport).ep = function (state) {
  };
  protoOf(JobSupport).toString = function () {
    return this.oq() + '@' + get_hexAddress(this);
  };
  protoOf(JobSupport).oq = function () {
    return this.gp() + '{' + stateString(this, this.op()) + '}';
  };
  protoOf(JobSupport).gp = function () {
    return get_classSimpleName(this);
  };
  protoOf(JobSupport).pq = function ($completion) {
    $l$loop: while (true) {
      var state = this.op();
      if (!(!(state == null) ? isInterface(state, Incomplete) : false)) {
        if (state instanceof CompletedExceptionally) {
          // Inline function 'kotlinx.coroutines.internal.recoverAndThrow' call
          throw state.zo_1;
        }
        return unboxState(state);
      }
      if (startInternal(this, state) >= 0)
        break $l$loop;
    }
    return awaitSuspend(this, $completion);
  };
  function boxIncomplete(_this__u8e3s4) {
    _init_properties_JobSupport_kt__68f172();
    var tmp;
    if (!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, Incomplete) : false) {
      tmp = new IncompleteStateBox(_this__u8e3s4);
    } else {
      tmp = _this__u8e3s4;
    }
    return tmp;
  }
  function InactiveNodeList(list) {
    this.xw_1 = list;
  }
  protoOf(InactiveNodeList).pu = function () {
    return this.xw_1;
  };
  protoOf(InactiveNodeList).uo = function () {
    return false;
  };
  protoOf(InactiveNodeList).toString = function () {
    return get_DEBUG() ? this.xw_1.pw('New') : anyToString(this);
  };
  function InvokeOnCompletion(handler) {
    JobNode.call(this);
    this.cy_1 = handler;
  }
  protoOf(InvokeOnCompletion).ju = function () {
    return false;
  };
  protoOf(InvokeOnCompletion).bs = function (cause) {
    return this.cy_1(cause);
  };
  function InvokeOnCancelling(handler) {
    JobNode.call(this);
    this.hy_1 = handler;
    this.iy_1 = atomic$boolean$1(false);
  }
  protoOf(InvokeOnCancelling).ju = function () {
    return true;
  };
  protoOf(InvokeOnCancelling).bs = function (cause) {
    if (this.iy_1.atomicfu$compareAndSet(false, true))
      this.hy_1(cause);
  };
  function ResumeOnCompletion(continuation) {
    JobNode.call(this);
    this.ny_1 = continuation;
  }
  protoOf(ResumeOnCompletion).ju = function () {
    return false;
  };
  protoOf(ResumeOnCompletion).bs = function (cause) {
    // Inline function 'kotlin.coroutines.resume' call
    var this_0 = this.ny_1;
    // Inline function 'kotlin.Companion.success' call
    var tmp$ret$0 = _Result___init__impl__xyqfz8(Unit_instance);
    this_0.m9(tmp$ret$0);
    return Unit_instance;
  };
  function ChildHandleNode(childJob) {
    JobNode.call(this);
    this.hx_1 = childJob;
  }
  protoOf(ChildHandleNode).np = function () {
    return this.ou();
  };
  protoOf(ChildHandleNode).ju = function () {
    return true;
  };
  protoOf(ChildHandleNode).bs = function (cause) {
    return this.hx_1.fq(this.ou());
  };
  protoOf(ChildHandleNode).gq = function (cause) {
    return this.ou().gq(cause);
  };
  function unboxState(_this__u8e3s4) {
    _init_properties_JobSupport_kt__68f172();
    var tmp74_safe_receiver = _this__u8e3s4 instanceof IncompleteStateBox ? _this__u8e3s4 : null;
    var tmp0_elvis_lhs = tmp74_safe_receiver == null ? null : tmp74_safe_receiver.oy_1;
    return tmp0_elvis_lhs == null ? _this__u8e3s4 : tmp0_elvis_lhs;
  }
  function ResumeAwaitOnCompletion(continuation) {
    JobNode.call(this);
    this.ty_1 = continuation;
  }
  protoOf(ResumeAwaitOnCompletion).ju = function () {
    return false;
  };
  protoOf(ResumeAwaitOnCompletion).bs = function (cause) {
    var state = this.ou().op();
    // Inline function 'kotlinx.coroutines.assert' call
    if (state instanceof CompletedExceptionally) {
      var tmp0 = this.ty_1;
      // Inline function 'kotlin.coroutines.resumeWithException' call
      // Inline function 'kotlin.Companion.failure' call
      var exception = state.zo_1;
      var tmp$ret$1 = _Result___init__impl__xyqfz8(createFailure(exception));
      tmp0.m9(tmp$ret$1);
    } else {
      var tmp2 = this.ty_1;
      var tmp = unboxState(state);
      // Inline function 'kotlin.coroutines.resume' call
      // Inline function 'kotlin.Companion.success' call
      var value = (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
      var tmp$ret$3 = _Result___init__impl__xyqfz8(value);
      tmp2.m9(tmp$ret$3);
    }
  };
  function IncompleteStateBox(state) {
    this.oy_1 = state;
  }
  function handlesExceptionF($this) {
    var tmp = $this.mp();
    var tmp75_safe_receiver = tmp instanceof ChildHandleNode ? tmp : null;
    var tmp0_elvis_lhs = tmp75_safe_receiver == null ? null : tmp75_safe_receiver.ou();
    var tmp_0;
    if (tmp0_elvis_lhs == null) {
      return false;
    } else {
      tmp_0 = tmp0_elvis_lhs;
    }
    var parentJob = tmp_0;
    while (true) {
      if (parentJob.mq())
        return true;
      var tmp_1 = parentJob.mp();
      var tmp76_safe_receiver = tmp_1 instanceof ChildHandleNode ? tmp_1 : null;
      var tmp1_elvis_lhs = tmp76_safe_receiver == null ? null : tmp76_safe_receiver.ou();
      var tmp_2;
      if (tmp1_elvis_lhs == null) {
        return false;
      } else {
        tmp_2 = tmp1_elvis_lhs;
      }
      parentJob = tmp_2;
    }
  }
  function JobImpl(parent) {
    JobSupport.call(this, true);
    this.po(parent);
    this.wy_1 = handlesExceptionF(this);
  }
  protoOf(JobImpl).bq = function () {
    return true;
  };
  protoOf(JobImpl).mq = function () {
    return this.wy_1;
  };
  protoOf(JobImpl).kv = function () {
    return this.iv(Unit_instance);
  };
  protoOf(JobImpl).jv = function (exception) {
    return this.iv(new CompletedExceptionally(exception));
  };
  var properties_initialized_JobSupport_kt_5iq8a4;
  function _init_properties_JobSupport_kt__68f172() {
    if (!properties_initialized_JobSupport_kt_5iq8a4) {
      properties_initialized_JobSupport_kt_5iq8a4 = true;
      COMPLETING_ALREADY = new Symbol('COMPLETING_ALREADY');
      COMPLETING_WAITING_CHILDREN = new Symbol('COMPLETING_WAITING_CHILDREN');
      COMPLETING_RETRY = new Symbol('COMPLETING_RETRY');
      TOO_LATE_TO_CANCEL = new Symbol('TOO_LATE_TO_CANCEL');
      SEALED = new Symbol('SEALED');
      EMPTY_NEW = new Empty(false);
      EMPTY_ACTIVE = new Empty(true);
    }
  }
  function MainCoroutineDispatcher() {
    CoroutineDispatcher.call(this);
  }
  protoOf(MainCoroutineDispatcher).toString = function () {
    var tmp0_elvis_lhs = this.zy();
    return tmp0_elvis_lhs == null ? get_classSimpleName(this) + '@' + get_hexAddress(this) : tmp0_elvis_lhs;
  };
  protoOf(MainCoroutineDispatcher).zy = function () {
    var main = Dispatchers_getInstance().ez();
    if (this === main)
      return 'Dispatchers.Main';
    var tmp;
    try {
      tmp = main.yy();
    } catch ($p) {
      var tmp_0;
      if ($p instanceof UnsupportedOperationException) {
        var e = $p;
        tmp_0 = null;
      } else {
        throw $p;
      }
      tmp = tmp_0;
    }
    var immediate = tmp;
    if (this === immediate)
      return 'Dispatchers.Main.immediate';
    return null;
  };
  function SupervisorJob(parent) {
    parent = parent === VOID ? null : parent;
    return new SupervisorJobImpl(parent);
  }
  function SupervisorJobImpl(parent) {
    JobImpl.call(this, parent);
  }
  protoOf(SupervisorJobImpl).gq = function (cause) {
    return false;
  };
  function TimeoutCancellationException() {
  }
  function Unconfined() {
    Unconfined_instance = this;
    CoroutineDispatcher.call(this);
  }
  protoOf(Unconfined).nv = function (context) {
    return false;
  };
  protoOf(Unconfined).ov = function (context, block) {
    var yieldContext = context.o9(Key_instance_4);
    if (!(yieldContext == null)) {
      yieldContext.kz_1 = true;
      return Unit_instance;
    }
    throw UnsupportedOperationException_init_$Create$('Dispatchers.Unconfined.dispatch function can only be used by the yield function. If you wrap Unconfined dispatcher in your code, make sure you properly delegate isDispatchNeeded and dispatch calls.');
  };
  protoOf(Unconfined).toString = function () {
    return 'Dispatchers.Unconfined';
  };
  var Unconfined_instance;
  function Unconfined_getInstance() {
    if (Unconfined_instance == null)
      new Unconfined();
    return Unconfined_instance;
  }
  function Key_3() {
  }
  var Key_instance_4;
  function Key_getInstance_3() {
    return Key_instance_4;
  }
  function Waiter() {
  }
  var BufferOverflow_SUSPEND_instance;
  var BufferOverflow_DROP_OLDEST_instance;
  var BufferOverflow_DROP_LATEST_instance;
  var BufferOverflow_entriesInitialized;
  function BufferOverflow_initEntries() {
    if (BufferOverflow_entriesInitialized)
      return Unit_instance;
    BufferOverflow_entriesInitialized = true;
    BufferOverflow_SUSPEND_instance = new BufferOverflow('SUSPEND', 0);
    BufferOverflow_DROP_OLDEST_instance = new BufferOverflow('DROP_OLDEST', 1);
    BufferOverflow_DROP_LATEST_instance = new BufferOverflow('DROP_LATEST', 2);
  }
  function BufferOverflow(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function BufferOverflow_SUSPEND_getInstance() {
    BufferOverflow_initEntries();
    return BufferOverflow_SUSPEND_instance;
  }
  function BufferOverflow_DROP_OLDEST_getInstance() {
    BufferOverflow_initEntries();
    return BufferOverflow_DROP_OLDEST_instance;
  }
  function BufferOverflow_DROP_LATEST_getInstance() {
    BufferOverflow_initEntries();
    return BufferOverflow_DROP_LATEST_instance;
  }
  function get_NULL_SEGMENT() {
    _init_properties_BufferedChannel_kt__d6uc4y();
    return NULL_SEGMENT;
  }
  var NULL_SEGMENT;
  function get_SEGMENT_SIZE() {
    _init_properties_BufferedChannel_kt__d6uc4y();
    return SEGMENT_SIZE;
  }
  var SEGMENT_SIZE;
  function get_EXPAND_BUFFER_COMPLETION_WAIT_ITERATIONS() {
    _init_properties_BufferedChannel_kt__d6uc4y();
    return EXPAND_BUFFER_COMPLETION_WAIT_ITERATIONS;
  }
  var EXPAND_BUFFER_COMPLETION_WAIT_ITERATIONS;
  function get_BUFFERED() {
    _init_properties_BufferedChannel_kt__d6uc4y();
    return BUFFERED;
  }
  var BUFFERED;
  function get_IN_BUFFER() {
    _init_properties_BufferedChannel_kt__d6uc4y();
    return IN_BUFFER;
  }
  var IN_BUFFER;
  function get_RESUMING_BY_RCV() {
    _init_properties_BufferedChannel_kt__d6uc4y();
    return RESUMING_BY_RCV;
  }
  var RESUMING_BY_RCV;
  function get_RESUMING_BY_EB() {
    _init_properties_BufferedChannel_kt__d6uc4y();
    return RESUMING_BY_EB;
  }
  var RESUMING_BY_EB;
  function get_POISONED() {
    _init_properties_BufferedChannel_kt__d6uc4y();
    return POISONED;
  }
  var POISONED;
  function get_DONE_RCV() {
    _init_properties_BufferedChannel_kt__d6uc4y();
    return DONE_RCV;
  }
  var DONE_RCV;
  function get_INTERRUPTED_SEND() {
    _init_properties_BufferedChannel_kt__d6uc4y();
    return INTERRUPTED_SEND;
  }
  var INTERRUPTED_SEND;
  function get_INTERRUPTED_RCV() {
    _init_properties_BufferedChannel_kt__d6uc4y();
    return INTERRUPTED_RCV;
  }
  var INTERRUPTED_RCV;
  function get_CHANNEL_CLOSED() {
    _init_properties_BufferedChannel_kt__d6uc4y();
    return CHANNEL_CLOSED;
  }
  var CHANNEL_CLOSED;
  function get_SUSPEND() {
    _init_properties_BufferedChannel_kt__d6uc4y();
    return SUSPEND;
  }
  var SUSPEND;
  function get_SUSPEND_NO_WAITER() {
    _init_properties_BufferedChannel_kt__d6uc4y();
    return SUSPEND_NO_WAITER;
  }
  var SUSPEND_NO_WAITER;
  function get_FAILED() {
    _init_properties_BufferedChannel_kt__d6uc4y();
    return FAILED;
  }
  var FAILED;
  function get_NO_RECEIVE_RESULT() {
    _init_properties_BufferedChannel_kt__d6uc4y();
    return NO_RECEIVE_RESULT;
  }
  var NO_RECEIVE_RESULT;
  function get_CLOSE_HANDLER_CLOSED() {
    _init_properties_BufferedChannel_kt__d6uc4y();
    return CLOSE_HANDLER_CLOSED;
  }
  var CLOSE_HANDLER_CLOSED;
  function get_CLOSE_HANDLER_INVOKED() {
    _init_properties_BufferedChannel_kt__d6uc4y();
    return CLOSE_HANDLER_INVOKED;
  }
  var CLOSE_HANDLER_INVOKED;
  function get_NO_CLOSE_CAUSE() {
    _init_properties_BufferedChannel_kt__d6uc4y();
    return NO_CLOSE_CAUSE;
  }
  var NO_CLOSE_CAUSE;
  function setElementLazy($this, index, value) {
    // Inline function 'kotlinx.atomicfu.AtomicRef.lazySet' call
    $this.qz_1.atomicfu$get(imul(index, 2)).kotlinx$atomicfu$value = value;
  }
  function ChannelSegment(id, prev, channel, pointers) {
    Segment.call(this, id, prev, pointers);
    this.pz_1 = channel;
    this.qz_1 = atomicfu$AtomicRefArray$ofNulls(imul(get_SEGMENT_SIZE(), 2));
  }
  protoOf(ChannelSegment).rz = function () {
    return ensureNotNull(this.pz_1);
  };
  protoOf(ChannelSegment).sz = function () {
    return get_SEGMENT_SIZE();
  };
  protoOf(ChannelSegment).tz = function (index, element) {
    setElementLazy(this, index, element);
  };
  protoOf(ChannelSegment).uz = function (index) {
    var tmp = this.qz_1.atomicfu$get(imul(index, 2)).kotlinx$atomicfu$value;
    return (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
  };
  protoOf(ChannelSegment).vz = function (index) {
    // Inline function 'kotlin.also' call
    var this_0 = this.uz(index);
    this.wz(index);
    return this_0;
  };
  protoOf(ChannelSegment).wz = function (index) {
    setElementLazy(this, index, null);
  };
  protoOf(ChannelSegment).xz = function (index) {
    return this.qz_1.atomicfu$get(imul(index, 2) + 1 | 0).kotlinx$atomicfu$value;
  };
  protoOf(ChannelSegment).yz = function (index, value) {
    this.qz_1.atomicfu$get(imul(index, 2) + 1 | 0).kotlinx$atomicfu$value = value;
  };
  protoOf(ChannelSegment).zz = function (index, from, to) {
    return this.qz_1.atomicfu$get(imul(index, 2) + 1 | 0).atomicfu$compareAndSet(from, to);
  };
  protoOf(ChannelSegment).a10 = function (index, update) {
    return this.qz_1.atomicfu$get(imul(index, 2) + 1 | 0).atomicfu$getAndSet(update);
  };
  protoOf(ChannelSegment).ss = function (index, cause, context) {
    var isSender = index >= get_SEGMENT_SIZE();
    var index_0 = isSender ? index - get_SEGMENT_SIZE() | 0 : index;
    var element = this.uz(index_0);
    $l$loop: while (true) {
      var cur = this.xz(index_0);
      var tmp;
      if (!(cur == null) ? isInterface(cur, Waiter) : false) {
        tmp = true;
      } else {
        tmp = cur instanceof WaiterEB;
      }
      if (tmp) {
        var update = isSender ? get_INTERRUPTED_SEND() : get_INTERRUPTED_RCV();
        if (this.zz(index_0, cur, update)) {
          this.wz(index_0);
          this.n10(index_0, !isSender);
          if (isSender) {
            var tmp109_safe_receiver = this.rz().c10_1;
            if (tmp109_safe_receiver == null)
              null;
            else {
              callUndeliveredElement(tmp109_safe_receiver, element, context);
            }
          }
          return Unit_instance;
        }
      } else {
        if (cur === get_INTERRUPTED_SEND() || cur === get_INTERRUPTED_RCV()) {
          this.wz(index_0);
          if (isSender) {
            var tmp110_safe_receiver = this.rz().c10_1;
            if (tmp110_safe_receiver == null)
              null;
            else {
              callUndeliveredElement(tmp110_safe_receiver, element, context);
            }
          }
          return Unit_instance;
        } else {
          if (cur === get_RESUMING_BY_EB() || cur === get_RESUMING_BY_RCV())
            continue $l$loop;
          else {
            if (cur === get_DONE_RCV() || cur === get_BUFFERED())
              return Unit_instance;
            else {
              if (cur === get_CHANNEL_CLOSED())
                return Unit_instance;
              else {
                // Inline function 'kotlin.error' call
                var message = 'unexpected state: ' + toString_0(cur);
                throw IllegalStateException_init_$Create$(toString(message));
              }
            }
          }
        }
      }
    }
  };
  protoOf(ChannelSegment).n10 = function (index, receiver) {
    if (receiver) {
      var tmp = this.rz();
      var tmp0 = this.qs_1;
      // Inline function 'kotlin.Long.times' call
      var other = get_SEGMENT_SIZE();
      // Inline function 'kotlin.Long.plus' call
      var tmp$ret$1 = tmp0.y2(toLong(other)).w2(toLong(index));
      tmp.o10(tmp$ret$1);
    }
    this.p10();
  };
  function onClosedHasNext($this) {
    $this.b11_1 = get_CHANNEL_CLOSED();
    var tmp0_elvis_lhs = $this.d11_1.e11();
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return false;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var cause = tmp;
    throw recoverStackTrace_0(cause);
  }
  function hasNextOnNoWaiterSuspend($this, segment, index, r, $completion) {
    var cancellable = getOrCreateCancellableContinuation(intercepted($completion));
    try {
      $this.c11_1 = cancellable;
      // Inline function 'kotlinx.coroutines.channels.BufferedChannel.receiveImplOnNoWaiter' call
      var this_0 = $this.d11_1;
      var updCellResult = updateCellReceive(this_0, segment, index, r, $this);
      if (updCellResult === get_SUSPEND()) {
        prepareReceiverForSuspension(this_0, $this, segment, index);
      } else if (updCellResult === get_FAILED()) {
        if (r.b1(this_0.f11()) < 0) {
          segment.z10();
        }
        $l$block_0: {
          // Inline function 'kotlinx.coroutines.channels.BufferedChannel.receiveImpl' call
          var segment_0 = this_0.i10_1.kotlinx$atomicfu$value;
          $l$loop_0: while (true) {
            if (this_0.g11()) {
              onClosedHasNextNoWaiterSuspend($this);
              break $l$block_0;
            }
            var r_0 = this_0.e10_1.atomicfu$getAndIncrement$long();
            // Inline function 'kotlin.Long.div' call
            var other = get_SEGMENT_SIZE();
            var id = r_0.z2(toLong(other));
            // Inline function 'kotlin.Long.rem' call
            var other_0 = get_SEGMENT_SIZE();
            var i = r_0.a3(toLong(other_0)).g1();
            if (!segment_0.qs_1.equals(id)) {
              var tmp0_elvis_lhs = findSegmentReceive(this_0, id, segment_0);
              var tmp;
              if (tmp0_elvis_lhs == null) {
                continue $l$loop_0;
              } else {
                tmp = tmp0_elvis_lhs;
              }
              segment_0 = tmp;
            }
            var updCellResult_0 = updateCellReceive(this_0, segment_0, i, r_0, $this);
            if (updCellResult_0 === get_SUSPEND()) {
              var tmp92_safe_receiver = (!($this == null) ? isInterface($this, Waiter) : false) ? $this : null;
              if (tmp92_safe_receiver == null)
                null;
              else {
                prepareReceiverForSuspension(this_0, tmp92_safe_receiver, segment_0, i);
              }
            } else if (updCellResult_0 === get_FAILED()) {
              if (r_0.b1(this_0.f11()) < 0) {
                segment_0.z10();
              }
              continue $l$loop_0;
            } else if (updCellResult_0 === get_SUSPEND_NO_WAITER()) {
              // Inline function 'kotlin.error' call
              var message = 'unexpected';
              throw IllegalStateException_init_$Create$(toString(message));
            } else {
              segment_0.z10();
              var element = (updCellResult_0 == null ? true : !(updCellResult_0 == null)) ? updCellResult_0 : THROW_CCE();
              $this.b11_1 = element;
              $this.c11_1 = null;
              var tmp96_safe_receiver = $this.d11_1.c10_1;
              cancellable.rt(true, tmp96_safe_receiver == null ? null : bindCancellationFun($this.d11_1, tmp96_safe_receiver, element));
            }
            break $l$block_0;
          }
        }
      } else {
        segment.z10();
        var element_0 = (updCellResult == null ? true : !(updCellResult == null)) ? updCellResult : THROW_CCE();
        $this.b11_1 = element_0;
        $this.c11_1 = null;
        var tmp96_safe_receiver_0 = $this.d11_1.c10_1;
        cancellable.rt(true, tmp96_safe_receiver_0 == null ? null : bindCancellationFun($this.d11_1, tmp96_safe_receiver_0, element_0));
      }
    } catch ($p) {
      if ($p instanceof Error) {
        var e = $p;
        cancellable.nt();
        throw e;
      } else {
        throw $p;
      }
    }
    return cancellable.mt();
  }
  function onClosedHasNextNoWaiterSuspend($this) {
    var cont = ensureNotNull($this.c11_1);
    $this.c11_1 = null;
    $this.b11_1 = get_CHANNEL_CLOSED();
    var cause = $this.d11_1.e11();
    if (cause == null) {
      // Inline function 'kotlin.coroutines.resume' call
      // Inline function 'kotlin.Companion.success' call
      var tmp$ret$0 = _Result___init__impl__xyqfz8(false);
      cont.m9(tmp$ret$0);
    } else {
      // Inline function 'kotlin.coroutines.resumeWithException' call
      // Inline function 'kotlin.Companion.failure' call
      var exception = recoverStackTrace(cause, cont);
      var tmp$ret$2 = _Result___init__impl__xyqfz8(createFailure(exception));
      cont.m9(tmp$ret$2);
    }
  }
  function $hasNextCOROUTINE$6(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.p11_1 = _this__u8e3s4;
  }
  protoOf($hasNextCOROUTINE$6).j9 = function () {
    var suspendResult = this.d9_1;
    $sm: do
      try {
        var tmp = this.b9_1;
        switch (tmp) {
          case 0:
            this.c9_1 = 8;
            if (!(this.p11_1.b11_1 === get_NO_RECEIVE_RESULT()) && !(this.p11_1.b11_1 === get_CHANNEL_CLOSED())) {
              var tmp_0 = this;
              tmp_0.q11_1 = true;
              this.b9_1 = 11;
              continue $sm;
            } else {
              var tmp_1 = this;
              tmp_1.r11_1 = this.p11_1.d11_1;
              var tmp_2 = this;
              tmp_2.s11_1 = null;
              this.b9_1 = 1;
              continue $sm;
            }

          case 1:
            this.u11_1 = this.r11_1;
            this.v11_1 = this.s11_1;
            this.w11_1 = this.u11_1.i10_1.kotlinx$atomicfu$value;
            this.b9_1 = 2;
            continue $sm;
          case 2:
            if (!true) {
              this.b9_1 = 9;
              continue $sm;
            }

            if (this.u11_1.g11()) {
              var tmp_3 = this;
              tmp_3.t11_1 = onClosedHasNext(this.p11_1);
              this.b9_1 = 10;
              continue $sm;
            } else {
              this.b9_1 = 3;
              continue $sm;
            }

          case 3:
            this.x11_1 = this.u11_1.e10_1.atomicfu$getAndIncrement$long();
            var tmp_4 = this;
            var tmp0 = this.x11_1;
            var other = get_SEGMENT_SIZE();
            tmp_4.y11_1 = tmp0.z2(toLong(other));
            var tmp_5 = this;
            var tmp2 = this.x11_1;
            var other_0 = get_SEGMENT_SIZE();
            tmp_5.z11_1 = tmp2.a3(toLong(other_0)).g1();
            if (!this.w11_1.qs_1.equals(this.y11_1)) {
              this.a12_1 = findSegmentReceive(this.u11_1, this.y11_1, this.w11_1);
              if (this.a12_1 == null) {
                this.b9_1 = 2;
                var tmp_6 = this;
                continue $sm;
              } else {
                this.b12_1 = this.a12_1;
                this.b9_1 = 4;
                continue $sm;
              }
            } else {
              this.b9_1 = 5;
              continue $sm;
            }

          case 4:
            this.w11_1 = this.b12_1;
            this.b9_1 = 5;
            continue $sm;
          case 5:
            this.c12_1 = updateCellReceive(this.u11_1, this.w11_1, this.z11_1, this.x11_1, this.v11_1);
            if (this.c12_1 === get_SUSPEND()) {
              var tmp_7 = this;
              var tmp_8 = this.v11_1;
              var tmp92_safe_receiver = (!(tmp_8 == null) ? isInterface(tmp_8, Waiter) : false) ? tmp_8 : null;
              if (tmp92_safe_receiver == null)
                null;
              else {
                prepareReceiverForSuspension(this.u11_1, tmp92_safe_receiver, this.w11_1, this.z11_1);
              }
              this.w11_1;
              this.z11_1;
              this.x11_1;
              var message = 'unreachable';
              throw IllegalStateException_init_$Create$(toString(message));
            } else {
              if (this.c12_1 === get_FAILED()) {
                if (this.x11_1.b1(this.u11_1.f11()) < 0) {
                  this.w11_1.z10();
                }
                this.b9_1 = 2;
                var tmp_9 = this;
                continue $sm;
              } else {
                if (this.c12_1 === get_SUSPEND_NO_WAITER()) {
                  var tmp_10 = this;
                  tmp_10.e12_1 = this.w11_1;
                  var tmp_11 = this;
                  tmp_11.f12_1 = this.z11_1;
                  var tmp_12 = this;
                  tmp_12.g12_1 = this.x11_1;
                  this.h12_1 = this.e12_1;
                  this.i12_1 = this.f12_1;
                  this.j12_1 = this.g12_1;
                  this.b9_1 = 6;
                  suspendResult = hasNextOnNoWaiterSuspend(this.p11_1, this.h12_1, this.i12_1, this.j12_1, this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  var tmp_13 = this;
                  this.w11_1.z10();
                  var tmp_14 = this.c12_1;
                  var element = (tmp_14 == null ? true : !(tmp_14 == null)) ? tmp_14 : THROW_CCE();
                  this.p11_1.b11_1 = element;
                  tmp_13.d12_1 = true;
                  this.b9_1 = 7;
                  continue $sm;
                }
              }
            }

          case 6:
            var tmp_15 = this;
            return suspendResult;
          case 7:
            this.t11_1 = this.d12_1;
            this.b9_1 = 10;
            continue $sm;
          case 8:
            throw this.e9_1;
          case 9:
            if (false) {
              this.b9_1 = 1;
              continue $sm;
            }

            this.b9_1 = 10;
            continue $sm;
          case 10:
            this.q11_1 = this.t11_1;
            this.b9_1 = 11;
            continue $sm;
          case 11:
            return this.q11_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.c9_1 === 8) {
          throw e;
        } else {
          this.b9_1 = this.c9_1;
          this.e9_1 = e;
        }
      }
     while (true);
  };
  function _get_bufferEndCounter__2d4hee($this) {
    return $this.f10_1.kotlinx$atomicfu$value;
  }
  function _get_isRendezvousOrUnlimited__3mdufi($this) {
    // Inline function 'kotlin.let' call
    var it = _get_bufferEndCounter__2d4hee($this);
    return it.equals(new Long(0, 0)) || it.equals(new Long(-1, 2147483647));
  }
  function prepareSenderForSuspension($this, _this__u8e3s4, segment, index) {
    _this__u8e3s4.tt(segment, index + get_SEGMENT_SIZE() | 0);
  }
  function SendBroadcast() {
  }
  function updateCellSend($this, segment, index, element, s, waiter, closed) {
    segment.tz(index, element);
    if (closed)
      return updateCellSendSlow($this, segment, index, element, s, waiter, closed);
    var state = segment.xz(index);
    if (state === null) {
      if (bufferOrRendezvousSend($this, s)) {
        if (segment.zz(index, null, get_BUFFERED())) {
          return 1;
        }
      } else {
        if (waiter == null) {
          return 3;
        } else {
          if (segment.zz(index, null, waiter))
            return 2;
        }
      }
    } else {
      if (!(state == null) ? isInterface(state, Waiter) : false) {
        segment.wz(index);
        var tmp;
        if (tryResumeReceiver($this, state, element)) {
          segment.yz(index, get_DONE_RCV());
          $this.k12();
          tmp = 0;
        } else {
          if (!(segment.a10(index, get_INTERRUPTED_RCV()) === get_INTERRUPTED_RCV())) {
            segment.n10(index, true);
          }
          tmp = 5;
        }
        return tmp;
      }
    }
    return updateCellSendSlow($this, segment, index, element, s, waiter, closed);
  }
  function updateCellSendSlow($this, segment, index, element, s, waiter, closed) {
    while (true) {
      var state = segment.xz(index);
      if (state === null) {
        if (bufferOrRendezvousSend($this, s) && !closed) {
          if (segment.zz(index, null, get_BUFFERED())) {
            return 1;
          }
        } else {
          if (closed) {
            if (segment.zz(index, null, get_INTERRUPTED_SEND())) {
              segment.n10(index, false);
              return 4;
            }
          } else if (waiter == null)
            return 3;
          else if (segment.zz(index, null, waiter))
            return 2;
        }
      } else if (state === get_IN_BUFFER()) {
        if (segment.zz(index, state, get_BUFFERED())) {
          return 1;
        }
      } else if (state === get_INTERRUPTED_RCV()) {
        segment.wz(index);
        return 5;
      } else if (state === get_POISONED()) {
        segment.wz(index);
        return 5;
      } else if (state === get_CHANNEL_CLOSED()) {
        segment.wz(index);
        completeCloseOrCancel($this);
        return 4;
      } else {
        // Inline function 'kotlinx.coroutines.assert' call
        segment.wz(index);
        var tmp;
        if (state instanceof WaiterEB) {
          tmp = state.l12_1;
        } else {
          tmp = state;
        }
        var receiver = tmp;
        var tmp_0;
        if (tryResumeReceiver($this, receiver, element)) {
          segment.yz(index, get_DONE_RCV());
          $this.k12();
          tmp_0 = 0;
        } else {
          if (!(segment.a10(index, get_INTERRUPTED_RCV()) === get_INTERRUPTED_RCV())) {
            segment.n10(index, true);
          }
          tmp_0 = 5;
        }
        return tmp_0;
      }
    }
  }
  function shouldSendSuspend0($this, curSendersAndCloseStatus) {
    if (_get_isClosedForSend0__kxgf9m($this, curSendersAndCloseStatus))
      return false;
    // Inline function 'kotlinx.coroutines.channels.sendersCounter' call
    var tmp$ret$0 = curSendersAndCloseStatus.i3(new Long(-1, 268435455));
    return !bufferOrRendezvousSend($this, tmp$ret$0);
  }
  function bufferOrRendezvousSend($this, curSenders) {
    var tmp;
    if (curSenders.b1(_get_bufferEndCounter__2d4hee($this)) < 0) {
      tmp = true;
    } else {
      var tmp0 = $this.m12();
      // Inline function 'kotlin.Long.plus' call
      var other = $this.b10_1;
      var tmp$ret$0 = tmp0.w2(toLong(other));
      tmp = curSenders.b1(tmp$ret$0) < 0;
    }
    return tmp;
  }
  function tryResumeReceiver($this, _this__u8e3s4, element) {
    var tmp;
    if (isInterface(_this__u8e3s4, SelectInstance)) {
      tmp = _this__u8e3s4.r12($this, element);
    } else {
      if (_this__u8e3s4 instanceof ReceiveCatching) {
        if (!(_this__u8e3s4 instanceof ReceiveCatching))
          THROW_CCE();
        var tmp_0 = Companion_getInstance().p12(element);
        var tmp86_safe_receiver = $this.c10_1;
        tmp = tryResume0(_this__u8e3s4.q12_1, new ChannelResult(tmp_0), tmp86_safe_receiver == null ? null : bindCancellationFunResult($this, tmp86_safe_receiver));
      } else {
        if (_this__u8e3s4 instanceof BufferedChannelIterator) {
          if (!(_this__u8e3s4 instanceof BufferedChannelIterator))
            THROW_CCE();
          tmp = _this__u8e3s4.n12(element);
        } else {
          if (isInterface(_this__u8e3s4, CancellableContinuation)) {
            if (!isInterface(_this__u8e3s4, CancellableContinuation))
              THROW_CCE();
            var tmp87_safe_receiver = $this.c10_1;
            tmp = tryResume0(_this__u8e3s4, element, tmp87_safe_receiver == null ? null : bindCancellationFun_0($this, tmp87_safe_receiver));
          } else {
            var message = 'Unexpected receiver type: ' + toString(_this__u8e3s4);
            throw IllegalStateException_init_$Create$(toString(message));
          }
        }
      }
    }
    return tmp;
  }
  function prepareReceiverForSuspension($this, _this__u8e3s4, segment, index) {
    $this.s12();
    _this__u8e3s4.tt(segment, index);
  }
  function updateCellReceive($this, segment, index, r, waiter) {
    var state = segment.xz(index);
    if (state === null) {
      // Inline function 'kotlinx.coroutines.channels.sendersCounter' call
      var senders = $this.d10_1.kotlinx$atomicfu$value.i3(new Long(-1, 268435455));
      if (r.b1(senders) >= 0) {
        if (waiter === null) {
          return get_SUSPEND_NO_WAITER();
        }
        if (segment.zz(index, state, waiter)) {
          expandBuffer($this);
          return get_SUSPEND();
        }
      }
    } else if (state === get_BUFFERED())
      if (segment.zz(index, state, get_DONE_RCV())) {
        expandBuffer($this);
        return segment.vz(index);
      }
    return updateCellReceiveSlow($this, segment, index, r, waiter);
  }
  function updateCellReceiveSlow($this, segment, index, r, waiter) {
    $l$loop: while (true) {
      var state = segment.xz(index);
      if (state === null || state === get_IN_BUFFER()) {
        // Inline function 'kotlinx.coroutines.channels.sendersCounter' call
        var senders = $this.d10_1.kotlinx$atomicfu$value.i3(new Long(-1, 268435455));
        if (r.b1(senders) < 0) {
          if (segment.zz(index, state, get_POISONED())) {
            expandBuffer($this);
            return get_FAILED();
          }
        } else {
          if (waiter === null) {
            return get_SUSPEND_NO_WAITER();
          }
          if (segment.zz(index, state, waiter)) {
            expandBuffer($this);
            return get_SUSPEND();
          }
        }
      } else if (state === get_BUFFERED()) {
        if (segment.zz(index, state, get_DONE_RCV())) {
          expandBuffer($this);
          return segment.vz(index);
        }
      } else if (state === get_INTERRUPTED_SEND())
        return get_FAILED();
      else if (state === get_POISONED())
        return get_FAILED();
      else if (state === get_CHANNEL_CLOSED()) {
        expandBuffer($this);
        return get_FAILED();
      } else if (state === get_RESUMING_BY_EB())
        continue $l$loop;
      else {
        if (segment.zz(index, state, get_RESUMING_BY_RCV())) {
          var helpExpandBuffer = state instanceof WaiterEB;
          var tmp;
          if (state instanceof WaiterEB) {
            tmp = state.l12_1;
          } else {
            tmp = state;
          }
          var sender = tmp;
          var tmp_0;
          if (tryResumeSender($this, sender, segment, index)) {
            segment.yz(index, get_DONE_RCV());
            expandBuffer($this);
            tmp_0 = segment.vz(index);
          } else {
            segment.yz(index, get_INTERRUPTED_SEND());
            segment.n10(index, false);
            if (helpExpandBuffer) {
              expandBuffer($this);
            }
            tmp_0 = get_FAILED();
          }
          return tmp_0;
        }
      }
    }
  }
  function tryResumeSender($this, _this__u8e3s4, segment, index) {
    var tmp;
    if (isInterface(_this__u8e3s4, CancellableContinuation)) {
      if (!isInterface(_this__u8e3s4, CancellableContinuation))
        THROW_CCE();
      tmp = tryResume0(_this__u8e3s4, Unit_instance);
    } else {
      if (isInterface(_this__u8e3s4, SelectInstance)) {
        if (!(_this__u8e3s4 instanceof SelectImplementation))
          THROW_CCE();
        var trySelectResult = _this__u8e3s4.x12($this, Unit_instance);
        if (trySelectResult === TrySelectDetailedResult_REREGISTER_getInstance()) {
          segment.wz(index);
        }
        tmp = trySelectResult === TrySelectDetailedResult_SUCCESSFUL_getInstance();
      } else {
        if (_this__u8e3s4 instanceof SendBroadcast) {
          tmp = tryResume0(_this__u8e3s4.t12_1, true);
        } else {
          var message = 'Unexpected waiter: ' + toString(_this__u8e3s4);
          throw IllegalStateException_init_$Create$(toString(message));
        }
      }
    }
    return tmp;
  }
  function expandBuffer($this) {
    if (_get_isRendezvousOrUnlimited__3mdufi($this))
      return Unit_instance;
    var segment = $this.j10_1.kotlinx$atomicfu$value;
    try_again: while (true) {
      var b = $this.f10_1.atomicfu$getAndIncrement$long();
      // Inline function 'kotlin.Long.div' call
      var other = get_SEGMENT_SIZE();
      var id = b.z2(toLong(other));
      var s = $this.f11();
      if (s.b1(b) <= 0) {
        if (segment.qs_1.b1(id) < 0 && !(segment.v10() == null)) {
          moveSegmentBufferEndToSpecifiedOrLast($this, id, segment);
        }
        incCompletedExpandBufferAttempts$default($this);
        return Unit_instance;
      }
      if (!segment.qs_1.equals(id)) {
        var tmp0_elvis_lhs = findSegmentBufferEnd($this, id, segment, b);
        var tmp;
        if (tmp0_elvis_lhs == null) {
          continue try_again;
        } else {
          tmp = tmp0_elvis_lhs;
        }
        segment = tmp;
      }
      // Inline function 'kotlin.Long.rem' call
      var other_0 = get_SEGMENT_SIZE();
      var i = b.a3(toLong(other_0)).g1();
      if (updateCellExpandBuffer($this, segment, i, b)) {
        incCompletedExpandBufferAttempts$default($this);
        return Unit_instance;
      } else {
        incCompletedExpandBufferAttempts$default($this);
        continue try_again;
      }
    }
  }
  function updateCellExpandBuffer($this, segment, index, b) {
    var state = segment.xz(index);
    if (!(state == null) ? isInterface(state, Waiter) : false) {
      if (b.b1($this.e10_1.kotlinx$atomicfu$value) >= 0) {
        if (segment.zz(index, state, get_RESUMING_BY_EB())) {
          var tmp;
          if (tryResumeSender($this, state, segment, index)) {
            segment.yz(index, get_BUFFERED());
            tmp = true;
          } else {
            segment.yz(index, get_INTERRUPTED_SEND());
            segment.n10(index, false);
            tmp = false;
          }
          return tmp;
        }
      }
    }
    return updateCellExpandBufferSlow($this, segment, index, b);
  }
  function updateCellExpandBufferSlow($this, segment, index, b) {
    $l$loop: while (true) {
      var state = segment.xz(index);
      if (!(state == null) ? isInterface(state, Waiter) : false) {
        if (b.b1($this.e10_1.kotlinx$atomicfu$value) < 0) {
          if (segment.zz(index, state, new WaiterEB(state)))
            return true;
        } else {
          if (segment.zz(index, state, get_RESUMING_BY_EB())) {
            var tmp;
            if (tryResumeSender($this, state, segment, index)) {
              segment.yz(index, get_BUFFERED());
              tmp = true;
            } else {
              segment.yz(index, get_INTERRUPTED_SEND());
              segment.n10(index, false);
              tmp = false;
            }
            return tmp;
          }
        }
      } else {
        if (state === get_INTERRUPTED_SEND())
          return false;
        else {
          if (state === null) {
            if (segment.zz(index, state, get_IN_BUFFER()))
              return true;
          } else {
            if (state === get_BUFFERED())
              return true;
            else {
              if (state === get_POISONED() || state === get_DONE_RCV() || state === get_INTERRUPTED_RCV())
                return true;
              else {
                if (state === get_CHANNEL_CLOSED())
                  return true;
                else {
                  if (state === get_RESUMING_BY_RCV())
                    continue $l$loop;
                  else {
                    // Inline function 'kotlin.error' call
                    var message = 'Unexpected cell state: ' + toString_0(state);
                    throw IllegalStateException_init_$Create$(toString(message));
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  function incCompletedExpandBufferAttempts($this, nAttempts) {
    // Inline function 'kotlin.also' call
    // Inline function 'kotlinx.coroutines.channels.ebPauseExpandBuffers' call
    if (!$this.g10_1.atomicfu$addAndGet$long(nAttempts).i3(new Long(0, 1073741824)).equals(new Long(0, 0))) {
      $l$loop: while (true) {
        // Inline function 'kotlinx.coroutines.channels.ebPauseExpandBuffers' call
        if (!!$this.g10_1.kotlinx$atomicfu$value.i3(new Long(0, 1073741824)).equals(new Long(0, 0))) {
          break $l$loop;
        }
      }
    }
  }
  function incCompletedExpandBufferAttempts$default($this, nAttempts, $super) {
    nAttempts = nAttempts === VOID ? new Long(1, 0) : nAttempts;
    return incCompletedExpandBufferAttempts($this, nAttempts);
  }
  function BufferedChannelIterator($outer) {
    this.d11_1 = $outer;
    this.b11_1 = get_NO_RECEIVE_RESULT();
    this.c11_1 = null;
  }
  protoOf(BufferedChannelIterator).y12 = function ($completion) {
    var tmp = new $hasNextCOROUTINE$6(this, $completion);
    tmp.d9_1 = Unit_instance;
    tmp.e9_1 = null;
    return tmp.j9();
  };
  protoOf(BufferedChannelIterator).tt = function (segment, index) {
    var tmp97_safe_receiver = this.c11_1;
    if (tmp97_safe_receiver == null)
      null;
    else {
      tmp97_safe_receiver.tt(segment, index);
    }
  };
  protoOf(BufferedChannelIterator).l = function () {
    var result = this.b11_1;
    // Inline function 'kotlin.check' call
    if (!!(result === get_NO_RECEIVE_RESULT())) {
      var message = '`hasNext()` has not been invoked';
      throw IllegalStateException_init_$Create$(toString(message));
    }
    this.b11_1 = get_NO_RECEIVE_RESULT();
    if (result === get_CHANNEL_CLOSED())
      throw recoverStackTrace_0(_get_receiveException__foorc1(this.d11_1));
    return (result == null ? true : !(result == null)) ? result : THROW_CCE();
  };
  protoOf(BufferedChannelIterator).n12 = function (element) {
    var cont = ensureNotNull(this.c11_1);
    this.c11_1 = null;
    this.b11_1 = element;
    var tmp98_safe_receiver = this.d11_1.c10_1;
    return tryResume0(cont, true, tmp98_safe_receiver == null ? null : bindCancellationFun(this.d11_1, tmp98_safe_receiver, element));
  };
  protoOf(BufferedChannelIterator).z12 = function () {
    var cont = ensureNotNull(this.c11_1);
    this.c11_1 = null;
    this.b11_1 = get_CHANNEL_CLOSED();
    var cause = this.d11_1.e11();
    if (cause == null) {
      // Inline function 'kotlin.coroutines.resume' call
      // Inline function 'kotlin.Companion.success' call
      var tmp$ret$0 = _Result___init__impl__xyqfz8(false);
      cont.m9(tmp$ret$0);
    } else {
      // Inline function 'kotlin.coroutines.resumeWithException' call
      // Inline function 'kotlin.Companion.failure' call
      var exception = recoverStackTrace(cause, cont);
      var tmp$ret$2 = _Result___init__impl__xyqfz8(createFailure(exception));
      cont.m9(tmp$ret$2);
    }
  };
  function _get_receiveException__foorc1($this) {
    var tmp0_elvis_lhs = $this.e11();
    return tmp0_elvis_lhs == null ? new ClosedReceiveChannelException('Channel was closed') : tmp0_elvis_lhs;
  }
  function invokeCloseHandler($this) {
    var tmp0 = $this.m10_1;
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlinx.atomicfu.getAndUpdate' call
      while (true) {
        var cur = tmp0.kotlinx$atomicfu$value;
        var tmp;
        if (cur === null) {
          tmp = get_CLOSE_HANDLER_CLOSED();
        } else {
          tmp = get_CLOSE_HANDLER_INVOKED();
        }
        var upd = tmp;
        if (tmp0.atomicfu$compareAndSet(cur, upd)) {
          tmp$ret$1 = cur;
          break $l$block;
        }
      }
    }
    var tmp0_elvis_lhs = tmp$ret$1;
    var tmp_0;
    if (tmp0_elvis_lhs == null) {
      return Unit_instance;
    } else {
      tmp_0 = tmp0_elvis_lhs;
    }
    var closeHandler = tmp_0;
    if (typeof closeHandler !== 'function')
      THROW_CCE();
    closeHandler($this.e11());
  }
  function markClosed($this) {
    var tmp0 = $this.d10_1;
    var tmp$ret$4;
    $l$block: {
      // Inline function 'kotlinx.atomicfu.update' call
      while (true) {
        var cur = tmp0.kotlinx$atomicfu$value;
        // Inline function 'kotlinx.coroutines.channels.sendersCloseStatus' call
        var tmp;
        switch (cur.g3(60).g1()) {
          case 0:
            // Inline function 'kotlinx.coroutines.channels.sendersCounter' call

            var tmp$ret$1 = cur.i3(new Long(-1, 268435455));
            tmp = constructSendersAndCloseStatus(tmp$ret$1, 2);
            break;
          case 1:
            // Inline function 'kotlinx.coroutines.channels.sendersCounter' call

            var tmp$ret$2 = cur.i3(new Long(-1, 268435455));
            tmp = constructSendersAndCloseStatus(tmp$ret$2, 3);
            break;
          default:
            return Unit_instance;
        }
        var upd = tmp;
        if (tmp0.atomicfu$compareAndSet(cur, upd)) {
          tmp$ret$4 = Unit_instance;
          break $l$block;
        }
      }
      tmp$ret$4 = Unit_instance;
    }
    return tmp$ret$4;
  }
  function markCancelled($this) {
    var tmp0 = $this.d10_1;
    var tmp$ret$2;
    $l$block: {
      // Inline function 'kotlinx.atomicfu.update' call
      while (true) {
        var cur = tmp0.kotlinx$atomicfu$value;
        // Inline function 'kotlinx.coroutines.channels.sendersCounter' call
        var tmp$ret$0 = cur.i3(new Long(-1, 268435455));
        var upd = constructSendersAndCloseStatus(tmp$ret$0, 3);
        if (tmp0.atomicfu$compareAndSet(cur, upd)) {
          tmp$ret$2 = Unit_instance;
          break $l$block;
        }
      }
      tmp$ret$2 = Unit_instance;
    }
    return tmp$ret$2;
  }
  function markCancellationStarted($this) {
    var tmp0 = $this.d10_1;
    var tmp$ret$3;
    $l$block: {
      // Inline function 'kotlinx.atomicfu.update' call
      while (true) {
        var cur = tmp0.kotlinx$atomicfu$value;
        var tmp;
        // Inline function 'kotlinx.coroutines.channels.sendersCloseStatus' call
        if (cur.g3(60).g1() === 0) {
          // Inline function 'kotlinx.coroutines.channels.sendersCounter' call
          var tmp$ret$1 = cur.i3(new Long(-1, 268435455));
          tmp = constructSendersAndCloseStatus(tmp$ret$1, 1);
        } else {
          return Unit_instance;
        }
        var upd = tmp;
        if (tmp0.atomicfu$compareAndSet(cur, upd)) {
          tmp$ret$3 = Unit_instance;
          break $l$block;
        }
      }
      tmp$ret$3 = Unit_instance;
    }
    return tmp$ret$3;
  }
  function completeCloseOrCancel($this) {
    $this.a13();
  }
  function completeClose($this, sendersCur) {
    var lastSegment = closeLinkedList($this);
    if ($this.c13()) {
      var lastBufferedCellGlobalIndex = markAllEmptyCellsAsClosed($this, lastSegment);
      if (!lastBufferedCellGlobalIndex.equals(new Long(-1, -1))) {
        $this.b13(lastBufferedCellGlobalIndex);
      }
    }
    cancelSuspendedReceiveRequests($this, lastSegment, sendersCur);
    return lastSegment;
  }
  function completeCancel($this, sendersCur) {
    var lastSegment = completeClose($this, sendersCur);
    removeUnprocessedElements($this, lastSegment);
  }
  function closeLinkedList($this) {
    var lastSegment = $this.j10_1.kotlinx$atomicfu$value;
    // Inline function 'kotlin.let' call
    var it = $this.h10_1.kotlinx$atomicfu$value;
    if (it.qs_1.b1(lastSegment.qs_1) > 0)
      lastSegment = it;
    // Inline function 'kotlin.let' call
    var it_0 = $this.i10_1.kotlinx$atomicfu$value;
    if (it_0.qs_1.b1(lastSegment.qs_1) > 0)
      lastSegment = it_0;
    return close(lastSegment);
  }
  function markAllEmptyCellsAsClosed($this, lastSegment) {
    var segment = lastSegment;
    while (true) {
      var inductionVariable = get_SEGMENT_SIZE() - 1 | 0;
      if (0 <= inductionVariable)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + -1 | 0;
          var tmp0 = segment.qs_1;
          // Inline function 'kotlin.Long.times' call
          var other = get_SEGMENT_SIZE();
          // Inline function 'kotlin.Long.plus' call
          var globalIndex = tmp0.y2(toLong(other)).w2(toLong(index));
          if (globalIndex.b1($this.m12()) < 0)
            return new Long(-1, -1);
          cell_update: while (true) {
            var state = segment.xz(index);
            if (state === null || state === get_IN_BUFFER()) {
              if (segment.zz(index, state, get_CHANNEL_CLOSED())) {
                segment.p10();
                break cell_update;
              }
            } else if (state === get_BUFFERED())
              return globalIndex;
            else
              break cell_update;
          }
        }
         while (0 <= inductionVariable);
      var tmp0_elvis_lhs = segment.y10();
      var tmp;
      if (tmp0_elvis_lhs == null) {
        return new Long(-1, -1);
      } else {
        tmp = tmp0_elvis_lhs;
      }
      segment = tmp;
    }
  }
  function removeUnprocessedElements($this, lastSegment) {
    var onUndeliveredElement = $this.c10_1;
    var undeliveredElementException = null;
    var suspendedSenders = _InlineList___init__impl__z8n56();
    var segment = lastSegment;
    process_segments: while (true) {
      var inductionVariable = get_SEGMENT_SIZE() - 1 | 0;
      if (0 <= inductionVariable)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + -1 | 0;
          var tmp0 = segment.qs_1;
          // Inline function 'kotlin.Long.times' call
          var other = get_SEGMENT_SIZE();
          // Inline function 'kotlin.Long.plus' call
          var globalIndex = tmp0.y2(toLong(other)).w2(toLong(index));
          update_cell: while (true) {
            var state = segment.xz(index);
            if (state === get_DONE_RCV())
              break process_segments;
            else {
              if (state === get_BUFFERED()) {
                if (globalIndex.b1($this.m12()) < 0)
                  break process_segments;
                if (segment.zz(index, state, get_CHANNEL_CLOSED())) {
                  if (!(onUndeliveredElement == null)) {
                    var element = segment.uz(index);
                    undeliveredElementException = callUndeliveredElementCatchingException(onUndeliveredElement, element, undeliveredElementException);
                  }
                  segment.wz(index);
                  segment.p10();
                  break update_cell;
                }
              } else {
                if (state === get_IN_BUFFER() || state === null) {
                  if (segment.zz(index, state, get_CHANNEL_CLOSED())) {
                    segment.p10();
                    break update_cell;
                  }
                } else {
                  var tmp;
                  if (!(state == null) ? isInterface(state, Waiter) : false) {
                    tmp = true;
                  } else {
                    tmp = state instanceof WaiterEB;
                  }
                  if (tmp) {
                    if (globalIndex.b1($this.m12()) < 0)
                      break process_segments;
                    var tmp_0;
                    if (state instanceof WaiterEB) {
                      tmp_0 = state.l12_1;
                    } else {
                      tmp_0 = (!(state == null) ? isInterface(state, Waiter) : false) ? state : THROW_CCE();
                    }
                    var sender = tmp_0;
                    if (segment.zz(index, state, get_CHANNEL_CLOSED())) {
                      if (!(onUndeliveredElement == null)) {
                        var element_0 = segment.uz(index);
                        undeliveredElementException = callUndeliveredElementCatchingException(onUndeliveredElement, element_0, undeliveredElementException);
                      }
                      suspendedSenders = InlineList__plus_impl_nuetvo(suspendedSenders, sender);
                      segment.wz(index);
                      segment.p10();
                      break update_cell;
                    }
                  } else {
                    if (state === get_RESUMING_BY_EB() || state === get_RESUMING_BY_RCV())
                      break process_segments;
                    else {
                      if (state === get_RESUMING_BY_EB())
                        continue update_cell;
                      else {
                        break update_cell;
                      }
                    }
                  }
                }
              }
            }
          }
        }
         while (0 <= inductionVariable);
      var tmp0_elvis_lhs = segment.y10();
      var tmp_1;
      if (tmp0_elvis_lhs == null) {
        break process_segments;
      } else {
        tmp_1 = tmp0_elvis_lhs;
      }
      segment = tmp_1;
    }
    var tmp4 = suspendedSenders;
    $l$block: {
      // Inline function 'kotlinx.coroutines.internal.InlineList.forEachReversed' call
      var tmp154_subject = access$_get_holder__kkflen(tmp4);
      if (tmp154_subject == null) {
        break $l$block;
      } else {
        if (!(tmp154_subject instanceof ArrayList)) {
          var tmp_2 = access$_get_holder__kkflen(tmp4);
          var it = (tmp_2 == null ? true : !(tmp_2 == null)) ? tmp_2 : THROW_CCE();
          resumeSenderOnCancelledChannel($this, it);
        } else {
          var tmp_3 = access$_get_holder__kkflen(tmp4);
          var list = tmp_3 instanceof ArrayList ? tmp_3 : THROW_CCE();
          var inductionVariable_0 = list.m() - 1 | 0;
          if (0 <= inductionVariable_0)
            do {
              var i = inductionVariable_0;
              inductionVariable_0 = inductionVariable_0 + -1 | 0;
              var it_0 = list.o(i);
              resumeSenderOnCancelledChannel($this, it_0);
            }
             while (0 <= inductionVariable_0);
        }
      }
    }
    var tmp100_safe_receiver = undeliveredElementException;
    if (tmp100_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      throw tmp100_safe_receiver;
    }
  }
  function cancelSuspendedReceiveRequests($this, lastSegment, sendersCounter) {
    var suspendedReceivers = _InlineList___init__impl__z8n56();
    var segment = lastSegment;
    process_segments: while (!(segment == null)) {
      var inductionVariable = get_SEGMENT_SIZE() - 1 | 0;
      if (0 <= inductionVariable)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + -1 | 0;
          var tmp0 = segment.qs_1;
          // Inline function 'kotlin.Long.times' call
          var other = get_SEGMENT_SIZE();
          // Inline function 'kotlin.Long.plus' call
          if (tmp0.y2(toLong(other)).w2(toLong(index)).b1(sendersCounter) < 0)
            break process_segments;
          cell_update: while (true) {
            var state = segment.xz(index);
            if (state === null || state === get_IN_BUFFER()) {
              if (segment.zz(index, state, get_CHANNEL_CLOSED())) {
                segment.p10();
                break cell_update;
              }
            } else {
              if (state instanceof WaiterEB) {
                if (segment.zz(index, state, get_CHANNEL_CLOSED())) {
                  suspendedReceivers = InlineList__plus_impl_nuetvo(suspendedReceivers, state.l12_1);
                  segment.n10(index, true);
                  break cell_update;
                }
              } else {
                if (!(state == null) ? isInterface(state, Waiter) : false) {
                  if (segment.zz(index, state, get_CHANNEL_CLOSED())) {
                    suspendedReceivers = InlineList__plus_impl_nuetvo(suspendedReceivers, state);
                    segment.n10(index, true);
                    break cell_update;
                  }
                } else {
                  break cell_update;
                }
              }
            }
          }
        }
         while (0 <= inductionVariable);
      segment = segment.y10();
    }
    var tmp4 = suspendedReceivers;
    $l$block: {
      // Inline function 'kotlinx.coroutines.internal.InlineList.forEachReversed' call
      var tmp154_subject = access$_get_holder__kkflen(tmp4);
      if (tmp154_subject == null) {
        break $l$block;
      } else {
        if (!(tmp154_subject instanceof ArrayList)) {
          var tmp = access$_get_holder__kkflen(tmp4);
          var it = (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
          resumeReceiverOnClosedChannel($this, it);
        } else {
          var tmp_0 = access$_get_holder__kkflen(tmp4);
          var list = tmp_0 instanceof ArrayList ? tmp_0 : THROW_CCE();
          var inductionVariable_0 = list.m() - 1 | 0;
          if (0 <= inductionVariable_0)
            do {
              var i = inductionVariable_0;
              inductionVariable_0 = inductionVariable_0 + -1 | 0;
              var it_0 = list.o(i);
              resumeReceiverOnClosedChannel($this, it_0);
            }
             while (0 <= inductionVariable_0);
        }
      }
    }
  }
  function resumeReceiverOnClosedChannel($this, _this__u8e3s4) {
    return resumeWaiterOnClosedChannel($this, _this__u8e3s4, true);
  }
  function resumeSenderOnCancelledChannel($this, _this__u8e3s4) {
    return resumeWaiterOnClosedChannel($this, _this__u8e3s4, false);
  }
  function resumeWaiterOnClosedChannel($this, _this__u8e3s4, receiver) {
    if (_this__u8e3s4 instanceof SendBroadcast) {
      // Inline function 'kotlin.coroutines.resume' call
      var this_0 = _this__u8e3s4.t12_1;
      // Inline function 'kotlin.Companion.success' call
      var tmp$ret$0 = _Result___init__impl__xyqfz8(false);
      this_0.m9(tmp$ret$0);
    } else {
      if (isInterface(_this__u8e3s4, CancellableContinuation)) {
        // Inline function 'kotlin.coroutines.resumeWithException' call
        // Inline function 'kotlin.Companion.failure' call
        var exception = receiver ? _get_receiveException__foorc1($this) : $this.e13();
        var tmp$ret$2 = _Result___init__impl__xyqfz8(createFailure(exception));
        _this__u8e3s4.m9(tmp$ret$2);
      } else {
        if (_this__u8e3s4 instanceof ReceiveCatching) {
          var tmp4 = _this__u8e3s4.q12_1;
          // Inline function 'kotlin.coroutines.resume' call
          // Inline function 'kotlin.Companion.success' call
          var value = new ChannelResult(Companion_getInstance().d13($this.e11()));
          var tmp$ret$4 = _Result___init__impl__xyqfz8(value);
          tmp4.m9(tmp$ret$4);
        } else {
          if (_this__u8e3s4 instanceof BufferedChannelIterator) {
            _this__u8e3s4.z12();
          } else {
            if (isInterface(_this__u8e3s4, SelectInstance))
              _this__u8e3s4.r12($this, get_CHANNEL_CLOSED());
            else {
              // Inline function 'kotlin.error' call
              var message = 'Unexpected waiter: ' + toString(_this__u8e3s4);
              throw IllegalStateException_init_$Create$(toString(message));
            }
          }
        }
      }
    }
  }
  function _get_isClosedForSend0__kxgf9m($this, _this__u8e3s4) {
    return isClosed($this, _this__u8e3s4, false);
  }
  function _get_isClosedForReceive0__f7qknl($this, _this__u8e3s4) {
    return isClosed($this, _this__u8e3s4, true);
  }
  function isClosed($this, sendersAndCloseStatusCur, isClosedForReceive) {
    // Inline function 'kotlinx.coroutines.channels.sendersCloseStatus' call
    var tmp;
    switch (sendersAndCloseStatusCur.g3(60).g1()) {
      case 0:
        tmp = false;
        break;
      case 1:
        tmp = false;
        break;
      case 2:
        // Inline function 'kotlinx.coroutines.channels.sendersCounter' call

        var tmp$ret$1 = sendersAndCloseStatusCur.i3(new Long(-1, 268435455));
        completeClose($this, tmp$ret$1);
        tmp = isClosedForReceive ? !$this.f13() : true;
        break;
      case 3:
        // Inline function 'kotlinx.coroutines.channels.sendersCounter' call

        var tmp$ret$2 = sendersAndCloseStatusCur.i3(new Long(-1, 268435455));
        completeCancel($this, tmp$ret$2);
        tmp = true;
        break;
      default:
        // Inline function 'kotlinx.coroutines.channels.sendersCloseStatus' call

        var message = 'unexpected close status: ' + sendersAndCloseStatusCur.g3(60).g1();
        throw IllegalStateException_init_$Create$(toString(message));
    }
    return tmp;
  }
  function isCellNonEmpty($this, segment, index, globalIndex) {
    while (true) {
      var state = segment.xz(index);
      if (state === null || state === get_IN_BUFFER()) {
        if (segment.zz(index, state, get_POISONED())) {
          expandBuffer($this);
          return false;
        }
      } else if (state === get_BUFFERED())
        return true;
      else if (state === get_INTERRUPTED_SEND())
        return false;
      else if (state === get_CHANNEL_CLOSED())
        return false;
      else if (state === get_DONE_RCV())
        return false;
      else if (state === get_POISONED())
        return false;
      else if (state === get_RESUMING_BY_EB())
        return true;
      else if (state === get_RESUMING_BY_RCV())
        return false;
      else
        return globalIndex.equals($this.m12());
    }
  }
  function findSegmentSend($this, id, startFrom) {
    var tmp0 = $this.h10_1;
    var tmp3 = createSegmentFunction();
    var tmp$ret$2;
    $l$block_2: {
      // Inline function 'kotlinx.coroutines.internal.findSegmentAndMoveForward' call
      while (true) {
        var s = findSegmentInternal(startFrom, id, tmp3);
        var tmp;
        if (_SegmentOrClosed___get_isClosed__impl__qmxmlo(s)) {
          tmp = true;
        } else {
          var tmp1 = _SegmentOrClosed___get_segment__impl__jvcr9l(s);
          var tmp$ret$0;
          $l$block_1: {
            // Inline function 'kotlinx.coroutines.internal.moveForward' call
            while (true) {
              var cur = tmp0.kotlinx$atomicfu$value;
              if (cur.qs_1.b1(tmp1.qs_1) >= 0) {
                tmp$ret$0 = true;
                break $l$block_1;
              }
              if (!tmp1.r10()) {
                tmp$ret$0 = false;
                break $l$block_1;
              }
              if (tmp0.atomicfu$compareAndSet(cur, tmp1)) {
                if (cur.s10()) {
                  cur.g4();
                }
                tmp$ret$0 = true;
                break $l$block_1;
              }
              if (tmp1.s10()) {
                tmp1.g4();
              }
            }
            tmp$ret$0 = Unit_instance;
          }
          tmp = tmp$ret$0;
        }
        if (tmp) {
          tmp$ret$2 = s;
          break $l$block_2;
        }
      }
    }
    // Inline function 'kotlin.let' call
    var it = tmp$ret$2;
    var tmp_0;
    if (_SegmentOrClosed___get_isClosed__impl__qmxmlo(it)) {
      completeCloseOrCancel($this);
      var tmp0_0 = startFrom.qs_1;
      // Inline function 'kotlin.Long.times' call
      var other = get_SEGMENT_SIZE();
      if (tmp0_0.y2(toLong(other)).b1($this.m12()) < 0) {
        startFrom.z10();
      }
      tmp_0 = null;
    } else {
      var segment = _SegmentOrClosed___get_segment__impl__jvcr9l(it);
      var tmp_1;
      if (segment.qs_1.b1(id) > 0) {
        var tmp2 = segment.qs_1;
        // Inline function 'kotlin.Long.times' call
        var other_0 = get_SEGMENT_SIZE();
        var tmp$ret$4 = tmp2.y2(toLong(other_0));
        updateSendersCounterIfLower($this, tmp$ret$4);
        var tmp4 = segment.qs_1;
        // Inline function 'kotlin.Long.times' call
        var other_1 = get_SEGMENT_SIZE();
        if (tmp4.y2(toLong(other_1)).b1($this.m12()) < 0) {
          segment.z10();
        }
        tmp_1 = null;
      } else {
        // Inline function 'kotlinx.coroutines.assert' call
        tmp_1 = segment;
      }
      tmp_0 = tmp_1;
    }
    return tmp_0;
  }
  function findSegmentReceive($this, id, startFrom) {
    var tmp0 = $this.i10_1;
    var tmp3 = createSegmentFunction();
    var tmp$ret$2;
    $l$block_2: {
      // Inline function 'kotlinx.coroutines.internal.findSegmentAndMoveForward' call
      while (true) {
        var s = findSegmentInternal(startFrom, id, tmp3);
        var tmp;
        if (_SegmentOrClosed___get_isClosed__impl__qmxmlo(s)) {
          tmp = true;
        } else {
          var tmp1 = _SegmentOrClosed___get_segment__impl__jvcr9l(s);
          var tmp$ret$0;
          $l$block_1: {
            // Inline function 'kotlinx.coroutines.internal.moveForward' call
            while (true) {
              var cur = tmp0.kotlinx$atomicfu$value;
              if (cur.qs_1.b1(tmp1.qs_1) >= 0) {
                tmp$ret$0 = true;
                break $l$block_1;
              }
              if (!tmp1.r10()) {
                tmp$ret$0 = false;
                break $l$block_1;
              }
              if (tmp0.atomicfu$compareAndSet(cur, tmp1)) {
                if (cur.s10()) {
                  cur.g4();
                }
                tmp$ret$0 = true;
                break $l$block_1;
              }
              if (tmp1.s10()) {
                tmp1.g4();
              }
            }
            tmp$ret$0 = Unit_instance;
          }
          tmp = tmp$ret$0;
        }
        if (tmp) {
          tmp$ret$2 = s;
          break $l$block_2;
        }
      }
    }
    // Inline function 'kotlin.let' call
    var it = tmp$ret$2;
    var tmp_0;
    if (_SegmentOrClosed___get_isClosed__impl__qmxmlo(it)) {
      completeCloseOrCancel($this);
      var tmp0_0 = startFrom.qs_1;
      // Inline function 'kotlin.Long.times' call
      var other = get_SEGMENT_SIZE();
      if (tmp0_0.y2(toLong(other)).b1($this.f11()) < 0) {
        startFrom.z10();
      }
      tmp_0 = null;
    } else {
      var segment = _SegmentOrClosed___get_segment__impl__jvcr9l(it);
      var tmp_1;
      if (!_get_isRendezvousOrUnlimited__3mdufi($this)) {
        var tmp2 = _get_bufferEndCounter__2d4hee($this);
        // Inline function 'kotlin.Long.div' call
        var other_0 = get_SEGMENT_SIZE();
        var tmp$ret$4 = tmp2.z2(toLong(other_0));
        tmp_1 = id.b1(tmp$ret$4) <= 0;
      } else {
        tmp_1 = false;
      }
      if (tmp_1) {
        var tmp4 = $this.j10_1;
        $l$block_5: {
          // Inline function 'kotlinx.coroutines.internal.moveForward' call
          while (true) {
            var cur_0 = tmp4.kotlinx$atomicfu$value;
            if (cur_0.qs_1.b1(segment.qs_1) >= 0) {
              break $l$block_5;
            }
            if (!segment.r10()) {
              break $l$block_5;
            }
            if (tmp4.atomicfu$compareAndSet(cur_0, segment)) {
              if (cur_0.s10()) {
                cur_0.g4();
              }
              break $l$block_5;
            }
            if (segment.s10()) {
              segment.g4();
            }
          }
        }
      }
      var tmp_2;
      if (segment.qs_1.b1(id) > 0) {
        var tmp6 = segment.qs_1;
        // Inline function 'kotlin.Long.times' call
        var other_1 = get_SEGMENT_SIZE();
        var tmp$ret$7 = tmp6.y2(toLong(other_1));
        updateReceiversCounterIfLower($this, tmp$ret$7);
        var tmp8 = segment.qs_1;
        // Inline function 'kotlin.Long.times' call
        var other_2 = get_SEGMENT_SIZE();
        if (tmp8.y2(toLong(other_2)).b1($this.f11()) < 0) {
          segment.z10();
        }
        tmp_2 = null;
      } else {
        // Inline function 'kotlinx.coroutines.assert' call
        tmp_2 = segment;
      }
      tmp_0 = tmp_2;
    }
    return tmp_0;
  }
  function findSegmentBufferEnd($this, id, startFrom, currentBufferEndCounter) {
    var tmp0 = $this.j10_1;
    var tmp3 = createSegmentFunction();
    var tmp$ret$2;
    $l$block_2: {
      // Inline function 'kotlinx.coroutines.internal.findSegmentAndMoveForward' call
      while (true) {
        var s = findSegmentInternal(startFrom, id, tmp3);
        var tmp;
        if (_SegmentOrClosed___get_isClosed__impl__qmxmlo(s)) {
          tmp = true;
        } else {
          var tmp1 = _SegmentOrClosed___get_segment__impl__jvcr9l(s);
          var tmp$ret$0;
          $l$block_1: {
            // Inline function 'kotlinx.coroutines.internal.moveForward' call
            while (true) {
              var cur = tmp0.kotlinx$atomicfu$value;
              if (cur.qs_1.b1(tmp1.qs_1) >= 0) {
                tmp$ret$0 = true;
                break $l$block_1;
              }
              if (!tmp1.r10()) {
                tmp$ret$0 = false;
                break $l$block_1;
              }
              if (tmp0.atomicfu$compareAndSet(cur, tmp1)) {
                if (cur.s10()) {
                  cur.g4();
                }
                tmp$ret$0 = true;
                break $l$block_1;
              }
              if (tmp1.s10()) {
                tmp1.g4();
              }
            }
            tmp$ret$0 = Unit_instance;
          }
          tmp = tmp$ret$0;
        }
        if (tmp) {
          tmp$ret$2 = s;
          break $l$block_2;
        }
      }
    }
    // Inline function 'kotlin.let' call
    var it = tmp$ret$2;
    var tmp_0;
    if (_SegmentOrClosed___get_isClosed__impl__qmxmlo(it)) {
      completeCloseOrCancel($this);
      moveSegmentBufferEndToSpecifiedOrLast($this, id, startFrom);
      incCompletedExpandBufferAttempts$default($this);
      tmp_0 = null;
    } else {
      var segment = _SegmentOrClosed___get_segment__impl__jvcr9l(it);
      var tmp_1;
      if (segment.qs_1.b1(id) > 0) {
        // Inline function 'kotlin.Long.plus' call
        var tmp_2 = currentBufferEndCounter.w2(toLong(1));
        var tmp2 = segment.qs_1;
        // Inline function 'kotlin.Long.times' call
        var other = get_SEGMENT_SIZE();
        var tmp$ret$4 = tmp2.y2(toLong(other));
        if ($this.f10_1.atomicfu$compareAndSet(tmp_2, tmp$ret$4)) {
          var tmp4 = segment.qs_1;
          // Inline function 'kotlin.Long.times' call
          var other_0 = get_SEGMENT_SIZE();
          var tmp$ret$5 = tmp4.y2(toLong(other_0));
          incCompletedExpandBufferAttempts($this, tmp$ret$5.x2(currentBufferEndCounter));
        } else {
          incCompletedExpandBufferAttempts$default($this);
        }
        tmp_1 = null;
      } else {
        // Inline function 'kotlinx.coroutines.assert' call
        tmp_1 = segment;
      }
      tmp_0 = tmp_1;
    }
    return tmp_0;
  }
  function moveSegmentBufferEndToSpecifiedOrLast($this, id, startFrom) {
    var segment = startFrom;
    $l$loop: while (segment.qs_1.b1(id) < 0) {
      var tmp0_elvis_lhs = segment.v10();
      var tmp;
      if (tmp0_elvis_lhs == null) {
        break $l$loop;
      } else {
        tmp = tmp0_elvis_lhs;
      }
      segment = tmp;
    }
    while (true) {
      $l$loop_0: while (segment.q10()) {
        var tmp1_elvis_lhs = segment.v10();
        var tmp_0;
        if (tmp1_elvis_lhs == null) {
          break $l$loop_0;
        } else {
          tmp_0 = tmp1_elvis_lhs;
        }
        segment = tmp_0;
      }
      var tmp0 = $this.j10_1;
      var tmp1 = segment;
      var tmp$ret$0;
      $l$block_1: {
        // Inline function 'kotlinx.coroutines.internal.moveForward' call
        while (true) {
          var cur = tmp0.kotlinx$atomicfu$value;
          if (cur.qs_1.b1(tmp1.qs_1) >= 0) {
            tmp$ret$0 = true;
            break $l$block_1;
          }
          if (!tmp1.r10()) {
            tmp$ret$0 = false;
            break $l$block_1;
          }
          if (tmp0.atomicfu$compareAndSet(cur, tmp1)) {
            if (cur.s10()) {
              cur.g4();
            }
            tmp$ret$0 = true;
            break $l$block_1;
          }
          if (tmp1.s10()) {
            tmp1.g4();
          }
        }
        tmp$ret$0 = Unit_instance;
      }
      if (tmp$ret$0)
        return Unit_instance;
    }
  }
  function updateSendersCounterIfLower($this, value) {
    var this_0 = $this.d10_1;
    while (true) {
      var cur = this_0.kotlinx$atomicfu$value;
      // Inline function 'kotlinx.coroutines.channels.sendersCounter' call
      var curCounter = cur.i3(new Long(-1, 268435455));
      if (curCounter.b1(value) >= 0)
        return Unit_instance;
      // Inline function 'kotlinx.coroutines.channels.sendersCloseStatus' call
      var tmp$ret$1 = cur.g3(60).g1();
      var update = constructSendersAndCloseStatus(curCounter, tmp$ret$1);
      if ($this.d10_1.atomicfu$compareAndSet(cur, update))
        return Unit_instance;
    }
    return Unit_instance;
  }
  function updateReceiversCounterIfLower($this, value) {
    var this_0 = $this.e10_1;
    while (true) {
      var cur = this_0.kotlinx$atomicfu$value;
      if (cur.b1(value) >= 0)
        return Unit_instance;
      if ($this.e10_1.atomicfu$compareAndSet(cur, value))
        return Unit_instance;
    }
    return Unit_instance;
  }
  function bindCancellationFunResult($this, _this__u8e3s4) {
    return BufferedChannel$onCancellationChannelResultImplDoNotCall$ref($this);
  }
  function onCancellationChannelResultImplDoNotCall($this, cause, element, context) {
    callUndeliveredElement(ensureNotNull($this.c10_1), ensureNotNull(ChannelResult__getOrNull_impl_f5e07h(element)), context);
  }
  function bindCancellationFun($this, _this__u8e3s4, element) {
    return BufferedChannel$bindCancellationFun$lambda(_this__u8e3s4, element);
  }
  function bindCancellationFun_0($this, _this__u8e3s4) {
    return BufferedChannel$onCancellationImplDoNotCall$ref($this);
  }
  function onCancellationImplDoNotCall($this, cause, element, context) {
    callUndeliveredElement(ensureNotNull($this.c10_1), element, context);
  }
  function BufferedChannel$onUndeliveredElementReceiveCancellationConstructor$lambda$lambda($element, this$0, $select) {
    return function (_unused_var__etf5q3, _unused_var__etf5q3_0, _unused_var__etf5q3_1) {
      var tmp;
      if (!($element === get_CHANNEL_CLOSED())) {
        callUndeliveredElement(this$0.c10_1, ($element == null ? true : !($element == null)) ? $element : THROW_CCE(), $select.h9());
        tmp = Unit_instance;
      }
      return Unit_instance;
    };
  }
  function BufferedChannel$onUndeliveredElementReceiveCancellationConstructor$lambda(this$0) {
    return function (select, _unused_var__etf5q3, element) {
      return BufferedChannel$onUndeliveredElementReceiveCancellationConstructor$lambda$lambda(element, this$0, select);
    };
  }
  function BufferedChannel$onCancellationChannelResultImplDoNotCall$ref($boundThis) {
    var l = function (p0, p1, p2) {
      onCancellationChannelResultImplDoNotCall($boundThis, p0, p1.h13_1, p2);
      return Unit_instance;
    };
    l.callableName = 'onCancellationChannelResultImplDoNotCall';
    return l;
  }
  function BufferedChannel$bindCancellationFun$lambda($this_bindCancellationFun, $element) {
    return function (_unused_var__etf5q3, _unused_var__etf5q3_0, context) {
      callUndeliveredElement($this_bindCancellationFun, $element, context);
      return Unit_instance;
    };
  }
  function BufferedChannel$onCancellationImplDoNotCall$ref($boundThis) {
    var l = function (p0, p1, p2) {
      onCancellationImplDoNotCall($boundThis, p0, p1, p2);
      return Unit_instance;
    };
    l.callableName = 'onCancellationImplDoNotCall';
    return l;
  }
  function BufferedChannel(capacity, onUndeliveredElement) {
    onUndeliveredElement = onUndeliveredElement === VOID ? null : onUndeliveredElement;
    this.b10_1 = capacity;
    this.c10_1 = onUndeliveredElement;
    // Inline function 'kotlin.require' call
    if (!(this.b10_1 >= 0)) {
      var message = 'Invalid channel capacity: ' + this.b10_1 + ', should be >=0';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    this.d10_1 = atomic$long$1(new Long(0, 0));
    this.e10_1 = atomic$long$1(new Long(0, 0));
    this.f10_1 = atomic$long$1(initialBufferEnd(this.b10_1));
    this.g10_1 = atomic$long$1(_get_bufferEndCounter__2d4hee(this));
    var firstSegment = new ChannelSegment(new Long(0, 0), null, this, 3);
    this.h10_1 = atomic$ref$1(firstSegment);
    this.i10_1 = atomic$ref$1(firstSegment);
    var tmp = this;
    var tmp_0;
    if (_get_isRendezvousOrUnlimited__3mdufi(this)) {
      var tmp_1 = get_NULL_SEGMENT();
      tmp_0 = tmp_1 instanceof ChannelSegment ? tmp_1 : THROW_CCE();
    } else {
      tmp_0 = firstSegment;
    }
    tmp.j10_1 = atomic$ref$1(tmp_0);
    var tmp_2 = this;
    var tmp_3;
    if (this.c10_1 == null) {
      tmp_3 = null;
    } else {
      // Inline function 'kotlin.let' call
      tmp_3 = BufferedChannel$onUndeliveredElementReceiveCancellationConstructor$lambda(this);
    }
    tmp_2.k10_1 = tmp_3;
    this.l10_1 = atomic$ref$1(get_NO_CLOSE_CAUSE());
    this.m10_1 = atomic$ref$1(null);
  }
  protoOf(BufferedChannel).f11 = function () {
    // Inline function 'kotlinx.coroutines.channels.sendersCounter' call
    return this.d10_1.kotlinx$atomicfu$value.i3(new Long(-1, 268435455));
  };
  protoOf(BufferedChannel).m12 = function () {
    return this.e10_1.kotlinx$atomicfu$value;
  };
  protoOf(BufferedChannel).i13 = function (element) {
    if (shouldSendSuspend0(this, this.d10_1.kotlinx$atomicfu$value))
      return Companion_getInstance().j13();
    var tmp2 = get_INTERRUPTED_SEND();
    var tmp$ret$4;
    $l$block_4: {
      // Inline function 'kotlinx.coroutines.channels.BufferedChannel.sendImpl' call
      var segment = this.h10_1.kotlinx$atomicfu$value;
      $l$loop_0: while (true) {
        var sendersAndCloseStatusCur = this.d10_1.atomicfu$getAndIncrement$long();
        // Inline function 'kotlinx.coroutines.channels.sendersCounter' call
        var s = sendersAndCloseStatusCur.i3(new Long(-1, 268435455));
        var closed = _get_isClosedForSend0__kxgf9m(this, sendersAndCloseStatusCur);
        // Inline function 'kotlin.Long.div' call
        var other = get_SEGMENT_SIZE();
        var id = s.z2(toLong(other));
        // Inline function 'kotlin.Long.rem' call
        var other_0 = get_SEGMENT_SIZE();
        var i = s.a3(toLong(other_0)).g1();
        if (!segment.qs_1.equals(id)) {
          var tmp0_elvis_lhs = findSegmentSend(this, id, segment);
          var tmp;
          if (tmp0_elvis_lhs == null) {
            var tmp_0;
            if (closed) {
              tmp$ret$4 = Companion_getInstance().d13(this.e13());
              break $l$block_4;
            } else {
              continue $l$loop_0;
            }
          } else {
            tmp = tmp0_elvis_lhs;
          }
          segment = tmp;
        }
        switch (updateCellSend(this, segment, i, element, s, tmp2, closed)) {
          case 0:
            segment.z10();
            tmp$ret$4 = Companion_getInstance().p12(Unit_instance);
            break $l$block_4;
          case 1:
            tmp$ret$4 = Companion_getInstance().p12(Unit_instance);
            break $l$block_4;
          case 2:
            if (closed) {
              segment.p10();
              tmp$ret$4 = Companion_getInstance().d13(this.e13());
              break $l$block_4;
            }

            var tmp83_safe_receiver = (!(tmp2 == null) ? isInterface(tmp2, Waiter) : false) ? tmp2 : null;
            if (tmp83_safe_receiver == null)
              null;
            else {
              prepareSenderForSuspension(this, tmp83_safe_receiver, segment, i);
            }

            segment.p10();
            tmp$ret$4 = Companion_getInstance().j13();
            break $l$block_4;
          case 4:
            if (s.b1(this.m12()) < 0) {
              segment.z10();
            }

            tmp$ret$4 = Companion_getInstance().d13(this.e13());
            break $l$block_4;
          case 5:
            segment.z10();
            continue $l$loop_0;
          case 3:
            var message = 'unexpected';
            throw IllegalStateException_init_$Create$(toString(message));
        }
      }
    }
    return tmp$ret$4;
  };
  protoOf(BufferedChannel).k13 = function (element) {
    var tmp$ret$3;
    // Inline function 'kotlinx.coroutines.channels.BufferedChannel.sendImpl' call
    var waiter = get_BUFFERED();
    var segment = this.h10_1.kotlinx$atomicfu$value;
    $l$loop_0: while (true) {
      var sendersAndCloseStatusCur = this.d10_1.atomicfu$getAndIncrement$long();
      // Inline function 'kotlinx.coroutines.channels.sendersCounter' call
      var s = sendersAndCloseStatusCur.i3(new Long(-1, 268435455));
      var closed = _get_isClosedForSend0__kxgf9m(this, sendersAndCloseStatusCur);
      // Inline function 'kotlin.Long.div' call
      var other = get_SEGMENT_SIZE();
      var id = s.z2(toLong(other));
      // Inline function 'kotlin.Long.rem' call
      var other_0 = get_SEGMENT_SIZE();
      var i = s.a3(toLong(other_0)).g1();
      if (!segment.qs_1.equals(id)) {
        var tmp0_elvis_lhs = findSegmentSend(this, id, segment);
        var tmp;
        if (tmp0_elvis_lhs == null) {
          var tmp_0;
          if (closed) {
            return Companion_getInstance().d13(this.e13());
          } else {
            continue $l$loop_0;
          }
        } else {
          tmp = tmp0_elvis_lhs;
        }
        segment = tmp;
      }
      switch (updateCellSend(this, segment, i, element, s, waiter, closed)) {
        case 0:
          segment.z10();
          return Companion_getInstance().p12(Unit_instance);
        case 1:
          return Companion_getInstance().p12(Unit_instance);
        case 2:
          if (closed) {
            segment.p10();
            return Companion_getInstance().d13(this.e13());
          }

          var tmp83_safe_receiver = (!(waiter == null) ? isInterface(waiter, Waiter) : false) ? waiter : null;
          if (tmp83_safe_receiver == null)
            null;
          else {
            prepareSenderForSuspension(this, tmp83_safe_receiver, segment, i);
          }

          var tmp4 = segment.qs_1;
          // Inline function 'kotlin.Long.times' call

          var other_1 = get_SEGMENT_SIZE();
          // Inline function 'kotlin.Long.plus' call

          var tmp$ret$5 = tmp4.y2(toLong(other_1)).w2(toLong(i));
          this.b13(tmp$ret$5);
          return Companion_getInstance().p12(Unit_instance);
        case 4:
          if (s.b1(this.m12()) < 0) {
            segment.z10();
          }

          return Companion_getInstance().d13(this.e13());
        case 5:
          segment.z10();
          continue $l$loop_0;
        case 3:
          var message = 'unexpected';
          throw IllegalStateException_init_$Create$(toString(message));
      }
    }
    return tmp$ret$3;
  };
  protoOf(BufferedChannel).s12 = function () {
  };
  protoOf(BufferedChannel).k12 = function () {
  };
  protoOf(BufferedChannel).b13 = function (globalCellIndex) {
    // Inline function 'kotlinx.coroutines.assert' call
    var segment = this.i10_1.kotlinx$atomicfu$value;
    $l$loop_0: while (true) {
      var r = this.e10_1.kotlinx$atomicfu$value;
      // Inline function 'kotlin.Long.plus' call
      var other = this.b10_1;
      var tmp2 = r.w2(toLong(other));
      // Inline function 'kotlin.math.max' call
      var b = _get_bufferEndCounter__2d4hee(this);
      var tmp$ret$2 = tmp2.b1(b) >= 0 ? tmp2 : b;
      if (globalCellIndex.b1(tmp$ret$2) < 0)
        return Unit_instance;
      // Inline function 'kotlin.Long.plus' call
      var tmp$ret$3 = r.w2(toLong(1));
      if (!this.e10_1.atomicfu$compareAndSet(r, tmp$ret$3))
        continue $l$loop_0;
      // Inline function 'kotlin.Long.div' call
      var other_0 = get_SEGMENT_SIZE();
      var id = r.z2(toLong(other_0));
      // Inline function 'kotlin.Long.rem' call
      var other_1 = get_SEGMENT_SIZE();
      var i = r.a3(toLong(other_1)).g1();
      if (!segment.qs_1.equals(id)) {
        var tmp0_elvis_lhs = findSegmentReceive(this, id, segment);
        var tmp;
        if (tmp0_elvis_lhs == null) {
          continue $l$loop_0;
        } else {
          tmp = tmp0_elvis_lhs;
        }
        segment = tmp;
      }
      var updCellResult = updateCellReceive(this, segment, i, r, null);
      if (updCellResult === get_FAILED()) {
        if (r.b1(this.f11()) < 0) {
          segment.z10();
        }
      } else {
        segment.z10();
        var tmp90_safe_receiver = this.c10_1;
        var tmp_0;
        if (tmp90_safe_receiver == null) {
          tmp_0 = null;
        } else {
          tmp_0 = callUndeliveredElementCatchingException(tmp90_safe_receiver, (updCellResult == null ? true : !(updCellResult == null)) ? updCellResult : THROW_CCE());
        }
        var tmp91_safe_receiver = tmp_0;
        if (tmp91_safe_receiver == null)
          null;
        else {
          // Inline function 'kotlin.let' call
          throw tmp91_safe_receiver;
        }
      }
    }
  };
  protoOf(BufferedChannel).o10 = function (globalIndex) {
    if (_get_isRendezvousOrUnlimited__3mdufi(this))
      return Unit_instance;
    while (_get_bufferEndCounter__2d4hee(this).b1(globalIndex) <= 0) {
    }
    // Inline function 'kotlin.repeat' call
    var times = get_EXPAND_BUFFER_COMPLETION_WAIT_ITERATIONS();
    var inductionVariable = 0;
    if (inductionVariable < times)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var b = _get_bufferEndCounter__2d4hee(this);
        // Inline function 'kotlinx.coroutines.channels.ebCompletedCounter' call
        var ebCompleted = this.g10_1.kotlinx$atomicfu$value.i3(new Long(-1, 1073741823));
        if (b.equals(ebCompleted) && b.equals(_get_bufferEndCounter__2d4hee(this)))
          return Unit_instance;
      }
       while (inductionVariable < times);
    var tmp2 = this.g10_1;
    $l$block: {
      // Inline function 'kotlinx.atomicfu.update' call
      while (true) {
        var cur = tmp2.kotlinx$atomicfu$value;
        // Inline function 'kotlinx.coroutines.channels.ebCompletedCounter' call
        var tmp$ret$3 = cur.i3(new Long(-1, 1073741823));
        var upd = constructEBCompletedAndPauseFlag(tmp$ret$3, true);
        if (tmp2.atomicfu$compareAndSet(cur, upd)) {
          break $l$block;
        }
      }
    }
    while (true) {
      var b_0 = _get_bufferEndCounter__2d4hee(this);
      var ebCompletedAndBit = this.g10_1.kotlinx$atomicfu$value;
      // Inline function 'kotlinx.coroutines.channels.ebCompletedCounter' call
      var ebCompleted_0 = ebCompletedAndBit.i3(new Long(-1, 1073741823));
      // Inline function 'kotlinx.coroutines.channels.ebPauseExpandBuffers' call
      var pauseExpandBuffers = !ebCompletedAndBit.i3(new Long(0, 1073741824)).equals(new Long(0, 0));
      if (b_0.equals(ebCompleted_0) && b_0.equals(_get_bufferEndCounter__2d4hee(this))) {
        var tmp4 = this.g10_1;
        $l$block_0: {
          // Inline function 'kotlinx.atomicfu.update' call
          while (true) {
            var cur_0 = tmp4.kotlinx$atomicfu$value;
            // Inline function 'kotlinx.coroutines.channels.ebCompletedCounter' call
            var tmp$ret$8 = cur_0.i3(new Long(-1, 1073741823));
            var upd_0 = constructEBCompletedAndPauseFlag(tmp$ret$8, false);
            if (tmp4.atomicfu$compareAndSet(cur_0, upd_0)) {
              break $l$block_0;
            }
          }
        }
        return Unit_instance;
      }
      if (!pauseExpandBuffers) {
        this.g10_1.atomicfu$compareAndSet(ebCompletedAndBit, constructEBCompletedAndPauseFlag(ebCompleted_0, true));
      }
    }
  };
  protoOf(BufferedChannel).j = function () {
    return new BufferedChannelIterator(this);
  };
  protoOf(BufferedChannel).e11 = function () {
    var tmp = this.l10_1.kotlinx$atomicfu$value;
    return (tmp == null ? true : tmp instanceof Error) ? tmp : THROW_CCE();
  };
  protoOf(BufferedChannel).e13 = function () {
    var tmp0_elvis_lhs = this.e11();
    return tmp0_elvis_lhs == null ? new ClosedSendChannelException('Channel was closed') : tmp0_elvis_lhs;
  };
  protoOf(BufferedChannel).l13 = function () {
  };
  protoOf(BufferedChannel).m13 = function (cause) {
    return this.n13(cause, false);
  };
  protoOf(BufferedChannel).cq = function (cause) {
    this.p13(cause);
  };
  protoOf(BufferedChannel).p13 = function (cause) {
    return this.n13(cause == null ? CancellationException_init_$Create$('Channel was cancelled') : cause, true);
  };
  protoOf(BufferedChannel).n13 = function (cause, cancel) {
    if (cancel) {
      markCancellationStarted(this);
    }
    var closedByThisOperation = this.l10_1.atomicfu$compareAndSet(get_NO_CLOSE_CAUSE(), cause);
    if (cancel) {
      markCancelled(this);
    } else {
      markClosed(this);
    }
    completeCloseOrCancel(this);
    // Inline function 'kotlin.also' call
    this.l13();
    if (closedByThisOperation) {
      invokeCloseHandler(this);
    }
    return closedByThisOperation;
  };
  protoOf(BufferedChannel).c13 = function () {
    return false;
  };
  protoOf(BufferedChannel).a13 = function () {
    return _get_isClosedForSend0__kxgf9m(this, this.d10_1.kotlinx$atomicfu$value);
  };
  protoOf(BufferedChannel).g11 = function () {
    return _get_isClosedForReceive0__f7qknl(this, this.d10_1.kotlinx$atomicfu$value);
  };
  protoOf(BufferedChannel).f13 = function () {
    $l$loop: while (true) {
      var segment = this.i10_1.kotlinx$atomicfu$value;
      var r = this.m12();
      var s = this.f11();
      if (s.b1(r) <= 0)
        return false;
      // Inline function 'kotlin.Long.div' call
      var other = get_SEGMENT_SIZE();
      var id = r.z2(toLong(other));
      if (!segment.qs_1.equals(id)) {
        var tmp0_elvis_lhs = findSegmentReceive(this, id, segment);
        var tmp;
        if (tmp0_elvis_lhs == null) {
          var tmp_0;
          if (this.i10_1.kotlinx$atomicfu$value.qs_1.b1(id) < 0) {
            return false;
          } else {
            continue $l$loop;
          }
        } else {
          tmp = tmp0_elvis_lhs;
        }
        segment = tmp;
      }
      segment.z10();
      // Inline function 'kotlin.Long.rem' call
      var other_0 = get_SEGMENT_SIZE();
      var i = r.a3(toLong(other_0)).g1();
      if (isCellNonEmpty(this, segment, i, r))
        return true;
      // Inline function 'kotlin.Long.plus' call
      var tmp$ret$2 = r.w2(toLong(1));
      this.e10_1.atomicfu$compareAndSet(r, tmp$ret$2);
    }
  };
  protoOf(BufferedChannel).toString = function () {
    var sb = StringBuilder_init_$Create$();
    // Inline function 'kotlinx.coroutines.channels.sendersCloseStatus' call
    var tmp103_subject = this.d10_1.kotlinx$atomicfu$value.g3(60).g1();
    if (tmp103_subject === 2) {
      sb.g8('closed,');
    } else if (tmp103_subject === 3) {
      sb.g8('cancelled,');
    }
    sb.g8('capacity=' + this.b10_1 + ',');
    sb.g8('data=[');
    // Inline function 'kotlin.collections.filter' call
    var tmp0 = listOf([this.i10_1.kotlinx$atomicfu$value, this.h10_1.kotlinx$atomicfu$value, this.j10_1.kotlinx$atomicfu$value]);
    // Inline function 'kotlin.collections.filterTo' call
    var destination = ArrayList_init_$Create$_0();
    var _iterator__ex2g4s = tmp0.j();
    while (_iterator__ex2g4s.k()) {
      var element = _iterator__ex2g4s.l();
      if (!(element === get_NULL_SEGMENT())) {
        destination.e(element);
      }
    }
    var tmp$ret$4;
    $l$block: {
      // Inline function 'kotlin.collections.minBy' call
      var iterator = destination.j();
      if (!iterator.k())
        throw NoSuchElementException_init_$Create$();
      var minElem = iterator.l();
      if (!iterator.k()) {
        tmp$ret$4 = minElem;
        break $l$block;
      }
      var minValue = minElem.qs_1;
      do {
        var e = iterator.l();
        var v = e.qs_1;
        if (compareTo(minValue, v) > 0) {
          minElem = e;
          minValue = v;
        }
      }
       while (iterator.k());
      tmp$ret$4 = minElem;
    }
    var firstSegment = tmp$ret$4;
    var r = this.m12();
    var s = this.f11();
    var segment = firstSegment;
    append_elements: while (true) {
      var inductionVariable = 0;
      var last_0 = get_SEGMENT_SIZE();
      if (inductionVariable < last_0)
        process_cell: do {
          var i = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var tmp5 = segment.qs_1;
          // Inline function 'kotlin.Long.times' call
          var other = get_SEGMENT_SIZE();
          // Inline function 'kotlin.Long.plus' call
          var globalCellIndex = tmp5.y2(toLong(other)).w2(toLong(i));
          if (globalCellIndex.b1(s) >= 0 && globalCellIndex.b1(r) >= 0)
            break append_elements;
          var cellState = segment.xz(i);
          var element_0 = segment.uz(i);
          var tmp;
          if (!(cellState == null) ? isInterface(cellState, CancellableContinuation) : false) {
            tmp = globalCellIndex.b1(r) < 0 && globalCellIndex.b1(s) >= 0 ? 'receive' : globalCellIndex.b1(s) < 0 && globalCellIndex.b1(r) >= 0 ? 'send' : 'cont';
          } else {
            if (!(cellState == null) ? isInterface(cellState, SelectInstance) : false) {
              tmp = globalCellIndex.b1(r) < 0 && globalCellIndex.b1(s) >= 0 ? 'onReceive' : globalCellIndex.b1(s) < 0 && globalCellIndex.b1(r) >= 0 ? 'onSend' : 'select';
            } else {
              if (cellState instanceof ReceiveCatching) {
                tmp = 'receiveCatching';
              } else {
                if (cellState instanceof SendBroadcast) {
                  tmp = 'sendBroadcast';
                } else {
                  if (cellState instanceof WaiterEB) {
                    tmp = 'EB(' + cellState.toString() + ')';
                  } else {
                    if (equals(cellState, get_RESUMING_BY_RCV()) || equals(cellState, get_RESUMING_BY_EB())) {
                      tmp = 'resuming_sender';
                    } else {
                      if (cellState == null || (equals(cellState, get_IN_BUFFER()) || equals(cellState, get_DONE_RCV())) || (equals(cellState, get_POISONED()) || equals(cellState, get_INTERRUPTED_RCV()) || (equals(cellState, get_INTERRUPTED_SEND()) || equals(cellState, get_CHANNEL_CLOSED())))) {
                        continue process_cell;
                      } else {
                        tmp = toString(cellState);
                      }
                    }
                  }
                }
              }
            }
          }
          var cellStateString = tmp;
          if (!(element_0 == null)) {
            sb.g8('(' + cellStateString + ',' + toString_0(element_0) + '),');
          } else {
            sb.g8(cellStateString + ',');
          }
        }
         while (inductionVariable < last_0);
      var tmp0_elvis_lhs = segment.v10();
      var tmp_0;
      if (tmp0_elvis_lhs == null) {
        break append_elements;
      } else {
        tmp_0 = tmp0_elvis_lhs;
      }
      segment = tmp_0;
    }
    if (last(sb) === _Char___init__impl__6a9atx(44)) {
      sb.xc(sb.a() - 1 | 0);
    }
    sb.g8(']');
    return sb.toString();
  };
  function WaiterEB(waiter) {
    this.l12_1 = waiter;
  }
  protoOf(WaiterEB).toString = function () {
    return 'WaiterEB(' + toString(this.l12_1) + ')';
  };
  function initialBufferEnd(capacity) {
    _init_properties_BufferedChannel_kt__d6uc4y();
    switch (capacity) {
      case 0:
        return new Long(0, 0);
      case 2147483647:
        return new Long(-1, 2147483647);
      default:
        return toLong(capacity);
    }
  }
  function ReceiveCatching() {
  }
  function tryResume0(_this__u8e3s4, value, onCancellation) {
    onCancellation = onCancellation === VOID ? null : onCancellation;
    _init_properties_BufferedChannel_kt__d6uc4y();
    // Inline function 'kotlin.let' call
    var token = _this__u8e3s4.pr(value, null, onCancellation);
    var tmp;
    if (!(token == null)) {
      _this__u8e3s4.qr(token);
      tmp = true;
    } else {
      tmp = false;
    }
    return tmp;
  }
  function constructEBCompletedAndPauseFlag(counter, pauseEB) {
    _init_properties_BufferedChannel_kt__d6uc4y();
    return (pauseEB ? new Long(0, 1073741824) : new Long(0, 0)).w2(counter);
  }
  function constructSendersAndCloseStatus(counter, closeStatus) {
    _init_properties_BufferedChannel_kt__d6uc4y();
    return toLong(closeStatus).f3(60).w2(counter);
  }
  function createSegmentFunction() {
    _init_properties_BufferedChannel_kt__d6uc4y();
    return createSegment$ref();
  }
  function createSegment(id, prev) {
    _init_properties_BufferedChannel_kt__d6uc4y();
    return new ChannelSegment(id, prev, prev.rz(), 0);
  }
  function createSegment$ref() {
    var l = function (p0, p1) {
      return createSegment(p0, p1);
    };
    l.callableName = 'createSegment';
    return l;
  }
  var properties_initialized_BufferedChannel_kt_58tjvw;
  function _init_properties_BufferedChannel_kt__d6uc4y() {
    if (!properties_initialized_BufferedChannel_kt_58tjvw) {
      properties_initialized_BufferedChannel_kt_58tjvw = true;
      NULL_SEGMENT = new ChannelSegment(new Long(-1, -1), null, null, 0);
      SEGMENT_SIZE = systemProp('kotlinx.coroutines.bufferedChannel.segmentSize', 32);
      EXPAND_BUFFER_COMPLETION_WAIT_ITERATIONS = systemProp('kotlinx.coroutines.bufferedChannel.expandBufferCompletionWaitIterations', 10000);
      BUFFERED = new Symbol('BUFFERED');
      IN_BUFFER = new Symbol('SHOULD_BUFFER');
      RESUMING_BY_RCV = new Symbol('S_RESUMING_BY_RCV');
      RESUMING_BY_EB = new Symbol('RESUMING_BY_EB');
      POISONED = new Symbol('POISONED');
      DONE_RCV = new Symbol('DONE_RCV');
      INTERRUPTED_SEND = new Symbol('INTERRUPTED_SEND');
      INTERRUPTED_RCV = new Symbol('INTERRUPTED_RCV');
      CHANNEL_CLOSED = new Symbol('CHANNEL_CLOSED');
      SUSPEND = new Symbol('SUSPEND');
      SUSPEND_NO_WAITER = new Symbol('SUSPEND_NO_WAITER');
      FAILED = new Symbol('FAILED');
      NO_RECEIVE_RESULT = new Symbol('NO_RECEIVE_RESULT');
      CLOSE_HANDLER_CLOSED = new Symbol('CLOSE_HANDLER_CLOSED');
      CLOSE_HANDLER_INVOKED = new Symbol('CLOSE_HANDLER_INVOKED');
      NO_CLOSE_CAUSE = new Symbol('NO_CLOSE_CAUSE');
    }
  }
  function Factory() {
    Factory_instance = this;
    this.r13_1 = 2147483647;
    this.s13_1 = 0;
    this.t13_1 = -1;
    this.u13_1 = -2;
    this.v13_1 = -3;
    this.w13_1 = 'kotlinx.coroutines.channels.defaultBuffer';
    this.x13_1 = systemProp('kotlinx.coroutines.channels.defaultBuffer', 64, 1, 2147483646);
  }
  var Factory_instance;
  function Factory_getInstance() {
    if (Factory_instance == null)
      new Factory();
    return Factory_instance;
  }
  function _ChannelResult___init__impl__siwsuf(holder) {
    return holder;
  }
  function _ChannelResult___get_holder__impl__pm9gzw($this) {
    return $this;
  }
  function _ChannelResult___get_isSuccess__impl__odq1z9($this) {
    var tmp = _ChannelResult___get_holder__impl__pm9gzw($this);
    return !(tmp instanceof Failed);
  }
  function _ChannelResult___get_isClosed__impl__mg7kuu($this) {
    var tmp = _ChannelResult___get_holder__impl__pm9gzw($this);
    return tmp instanceof Closed;
  }
  function ChannelResult__getOrNull_impl_f5e07h($this) {
    var tmp;
    var tmp_0 = _ChannelResult___get_holder__impl__pm9gzw($this);
    if (!(tmp_0 instanceof Failed)) {
      var tmp_1 = _ChannelResult___get_holder__impl__pm9gzw($this);
      tmp = (tmp_1 == null ? true : !(tmp_1 == null)) ? tmp_1 : THROW_CCE();
    } else {
      tmp = null;
    }
    return tmp;
  }
  function Failed() {
  }
  protoOf(Failed).toString = function () {
    return 'Failed';
  };
  function Closed(cause) {
    Failed.call(this);
    this.y13_1 = cause;
  }
  protoOf(Closed).equals = function (other) {
    var tmp;
    if (other instanceof Closed) {
      tmp = equals(this.y13_1, other.y13_1);
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(Closed).hashCode = function () {
    // Inline function 'kotlin.hashCode' call
    var tmp0_safe_receiver = this.y13_1;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : hashCode(tmp0_safe_receiver);
    return tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
  };
  protoOf(Closed).toString = function () {
    return 'Closed(' + toString_0(this.y13_1) + ')';
  };
  function Companion() {
    Companion_instance_0 = this;
    this.o12_1 = new Failed();
  }
  protoOf(Companion).p12 = function (value) {
    return _ChannelResult___init__impl__siwsuf(value);
  };
  protoOf(Companion).j13 = function () {
    return _ChannelResult___init__impl__siwsuf(this.o12_1);
  };
  protoOf(Companion).d13 = function (cause) {
    return _ChannelResult___init__impl__siwsuf(new Closed(cause));
  };
  var Companion_instance_0;
  function Companion_getInstance() {
    if (Companion_instance_0 == null)
      new Companion();
    return Companion_instance_0;
  }
  function ChannelResult__toString_impl_rrcqu7($this) {
    var tmp;
    if (_ChannelResult___get_holder__impl__pm9gzw($this) instanceof Closed) {
      tmp = _ChannelResult___get_holder__impl__pm9gzw($this).toString();
    } else {
      tmp = 'Value(' + toString_0(_ChannelResult___get_holder__impl__pm9gzw($this)) + ')';
    }
    return tmp;
  }
  function ChannelResult__hashCode_impl_lilec2($this) {
    return $this == null ? 0 : hashCode($this);
  }
  function ChannelResult__equals_impl_f471ri($this, other) {
    if (!(other instanceof ChannelResult))
      return false;
    var tmp0_other_with_cast = other instanceof ChannelResult ? other.h13_1 : THROW_CCE();
    if (!equals($this, tmp0_other_with_cast))
      return false;
    return true;
  }
  function ChannelResult(holder) {
    Companion_getInstance();
    this.h13_1 = holder;
  }
  protoOf(ChannelResult).toString = function () {
    return ChannelResult__toString_impl_rrcqu7(this.h13_1);
  };
  protoOf(ChannelResult).hashCode = function () {
    return ChannelResult__hashCode_impl_lilec2(this.h13_1);
  };
  protoOf(ChannelResult).equals = function (other) {
    return ChannelResult__equals_impl_f471ri(this.h13_1, other);
  };
  function ClosedSendChannelException(message) {
    IllegalStateException_init_$Init$(message, this);
    captureStack(this, ClosedSendChannelException);
  }
  function ClosedReceiveChannelException(message) {
    NoSuchElementException_init_$Init$(message, this);
    captureStack(this, ClosedReceiveChannelException);
  }
  function SendChannel() {
  }
  function ReceiveChannel() {
  }
  function Channel(capacity, onBufferOverflow, onUndeliveredElement) {
    capacity = capacity === VOID ? 0 : capacity;
    onBufferOverflow = onBufferOverflow === VOID ? BufferOverflow_SUSPEND_getInstance() : onBufferOverflow;
    onUndeliveredElement = onUndeliveredElement === VOID ? null : onUndeliveredElement;
    var tmp;
    switch (capacity) {
      case 0:
        tmp = onBufferOverflow.equals(BufferOverflow_SUSPEND_getInstance()) ? new BufferedChannel(0, onUndeliveredElement) : new ConflatedBufferedChannel(1, onBufferOverflow, onUndeliveredElement);
        break;
      case -1:
        // Inline function 'kotlin.require' call

        if (!onBufferOverflow.equals(BufferOverflow_SUSPEND_getInstance())) {
          var message = 'CONFLATED capacity cannot be used with non-default onBufferOverflow';
          throw IllegalArgumentException_init_$Create$(toString(message));
        }

        tmp = new ConflatedBufferedChannel(1, BufferOverflow_DROP_OLDEST_getInstance(), onUndeliveredElement);
        break;
      case 2147483647:
        tmp = new BufferedChannel(2147483647, onUndeliveredElement);
        break;
      case -2:
        tmp = onBufferOverflow.equals(BufferOverflow_SUSPEND_getInstance()) ? new BufferedChannel(Factory_getInstance().x13_1, onUndeliveredElement) : new ConflatedBufferedChannel(1, onBufferOverflow, onUndeliveredElement);
        break;
      default:
        tmp = onBufferOverflow === BufferOverflow_SUSPEND_getInstance() ? new BufferedChannel(capacity, onUndeliveredElement) : new ConflatedBufferedChannel(capacity, onBufferOverflow, onUndeliveredElement);
        break;
    }
    return tmp;
  }
  function cancelConsumed(_this__u8e3s4, cause) {
    var tmp;
    if (cause == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      var tmp0_elvis_lhs = cause instanceof CancellationException ? cause : null;
      tmp = tmp0_elvis_lhs == null ? CancellationException_0('Channel was consumed, consumer had failed', cause) : tmp0_elvis_lhs;
    }
    _this__u8e3s4.cq(tmp);
  }
  function trySendImpl($this, element, isSendOp) {
    return $this.m14_1 === BufferOverflow_DROP_LATEST_getInstance() ? trySendDropLatest($this, element, isSendOp) : $this.k13(element);
  }
  function trySendDropLatest($this, element, isSendOp) {
    var result = protoOf(BufferedChannel).i13.call($this, element);
    if (_ChannelResult___get_isSuccess__impl__odq1z9(result) || _ChannelResult___get_isClosed__impl__mg7kuu(result))
      return result;
    if (isSendOp) {
      var tmp118_safe_receiver = $this.c10_1;
      var tmp119_safe_receiver = tmp118_safe_receiver == null ? null : callUndeliveredElementCatchingException(tmp118_safe_receiver, element);
      if (tmp119_safe_receiver == null)
        null;
      else {
        // Inline function 'kotlin.let' call
        throw tmp119_safe_receiver;
      }
    }
    return Companion_getInstance().p12(Unit_instance);
  }
  function ConflatedBufferedChannel(capacity, onBufferOverflow, onUndeliveredElement) {
    onUndeliveredElement = onUndeliveredElement === VOID ? null : onUndeliveredElement;
    BufferedChannel.call(this, capacity, onUndeliveredElement);
    this.l14_1 = capacity;
    this.m14_1 = onBufferOverflow;
    // Inline function 'kotlin.require' call
    if (!!(this.m14_1 === BufferOverflow_SUSPEND_getInstance())) {
      var message = 'This implementation does not support suspension for senders, use ' + getKClass(BufferedChannel).za() + ' instead';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    // Inline function 'kotlin.require' call
    if (!(this.l14_1 >= 1)) {
      var message_0 = 'Buffered channel capacity must be at least 1, but ' + this.l14_1 + ' was specified';
      throw IllegalArgumentException_init_$Create$(toString(message_0));
    }
  }
  protoOf(ConflatedBufferedChannel).c13 = function () {
    return this.m14_1.equals(BufferOverflow_DROP_OLDEST_getInstance());
  };
  protoOf(ConflatedBufferedChannel).i13 = function (element) {
    return trySendImpl(this, element, false);
  };
  function flow(block) {
    return new SafeFlow(block);
  }
  function SafeFlow(block) {
    AbstractFlow.call(this);
    this.n14_1 = block;
  }
  protoOf(SafeFlow).o14 = function (collector, $completion) {
    return this.n14_1(collector, $completion);
  };
  function $collectCOROUTINE$13(_this__u8e3s4, collector, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.y14_1 = _this__u8e3s4;
    this.z14_1 = collector;
  }
  protoOf($collectCOROUTINE$13).j9 = function () {
    var suspendResult = this.d9_1;
    $sm: do
      try {
        var tmp = this.b9_1;
        switch (tmp) {
          case 0:
            this.c9_1 = 5;
            var tmp_0 = this;
            tmp_0.a15_1 = new SafeCollector(this.z14_1, this.h9());
            this.b9_1 = 1;
            continue $sm;
          case 1:
            this.c9_1 = 4;
            this.b9_1 = 2;
            suspendResult = this.y14_1.o14(this.a15_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            this.b15_1 = suspendResult;
            this.c9_1 = 5;
            this.b9_1 = 3;
            continue $sm;
          case 3:
            this.c9_1 = 5;
            this.a15_1.l9();
            return Unit_instance;
          case 4:
            this.c9_1 = 5;
            var t = this.e9_1;
            this.a15_1.l9();
            throw t;
          case 5:
            throw this.e9_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.c9_1 === 5) {
          throw e;
        } else {
          this.b9_1 = this.c9_1;
          this.e9_1 = e;
        }
      }
     while (true);
  };
  function AbstractFlow() {
  }
  protoOf(AbstractFlow).p14 = function (collector, $completion) {
    var tmp = new $collectCOROUTINE$13(this, collector, $completion);
    tmp.d9_1 = Unit_instance;
    tmp.e9_1 = null;
    return tmp.j9();
  };
  function FlowCollector() {
  }
  function get_NO_VALUE() {
    _init_properties_SharedFlow_kt__umasnn();
    return NO_VALUE;
  }
  var NO_VALUE;
  function MutableSharedFlow(replay, extraBufferCapacity, onBufferOverflow) {
    replay = replay === VOID ? 0 : replay;
    extraBufferCapacity = extraBufferCapacity === VOID ? 0 : extraBufferCapacity;
    onBufferOverflow = onBufferOverflow === VOID ? BufferOverflow_SUSPEND_getInstance() : onBufferOverflow;
    _init_properties_SharedFlow_kt__umasnn();
    // Inline function 'kotlin.require' call
    if (!(replay >= 0)) {
      var message = 'replay cannot be negative, but was ' + replay;
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    // Inline function 'kotlin.require' call
    if (!(extraBufferCapacity >= 0)) {
      var message_0 = 'extraBufferCapacity cannot be negative, but was ' + extraBufferCapacity;
      throw IllegalArgumentException_init_$Create$(toString(message_0));
    }
    // Inline function 'kotlin.require' call
    if (!(replay > 0 || extraBufferCapacity > 0 || onBufferOverflow.equals(BufferOverflow_SUSPEND_getInstance()))) {
      var message_1 = 'replay or extraBufferCapacity must be positive with non-default onBufferOverflow strategy ' + onBufferOverflow.toString();
      throw IllegalArgumentException_init_$Create$(toString(message_1));
    }
    var bufferCapacity0 = replay + extraBufferCapacity | 0;
    var bufferCapacity = bufferCapacity0 < 0 ? 2147483647 : bufferCapacity0;
    return new SharedFlowImpl(replay, bufferCapacity, onBufferOverflow);
  }
  function _get_head__d7jo8b($this) {
    var tmp0 = $this.q15_1;
    // Inline function 'kotlin.comparisons.minOf' call
    var b = $this.p15_1;
    return tmp0.b1(b) <= 0 ? tmp0 : b;
  }
  function _get_replaySize__dxgnb1($this) {
    var tmp0 = _get_head__d7jo8b($this);
    // Inline function 'kotlin.Long.plus' call
    var other = $this.r15_1;
    return tmp0.w2(toLong(other)).x2($this.p15_1).g1();
  }
  function _get_totalSize__xhdb3o($this) {
    return $this.r15_1 + $this.s15_1 | 0;
  }
  function _get_bufferEndIndex__d2rk18($this) {
    var tmp0 = _get_head__d7jo8b($this);
    // Inline function 'kotlin.Long.plus' call
    var other = $this.r15_1;
    return tmp0.w2(toLong(other));
  }
  function _get_queueEndIndex__4m025l($this) {
    var tmp0 = _get_head__d7jo8b($this);
    // Inline function 'kotlin.Long.plus' call
    var other = $this.r15_1;
    var tmp2 = tmp0.w2(toLong(other));
    // Inline function 'kotlin.Long.plus' call
    var other_0 = $this.s15_1;
    return tmp2.w2(toLong(other_0));
  }
  function tryEmitLocked($this, value) {
    if ($this.u15_1 === 0)
      return tryEmitNoCollectorsLocked($this, value);
    if ($this.r15_1 >= $this.m15_1 && $this.q15_1.b1($this.p15_1) <= 0) {
      switch ($this.n15_1.q2_1) {
        case 0:
          return false;
        case 2:
          return true;
        case 1:
          break;
        default:
          noWhenBranchMatchedException();
          break;
      }
    }
    enqueueLocked($this, value);
    $this.r15_1 = $this.r15_1 + 1 | 0;
    if ($this.r15_1 > $this.m15_1) {
      dropOldestLocked($this);
    }
    if (_get_replaySize__dxgnb1($this) > $this.l15_1) {
      // Inline function 'kotlin.Long.plus' call
      var tmp$ret$0 = $this.p15_1.w2(toLong(1));
      updateBufferLocked($this, tmp$ret$0, $this.q15_1, _get_bufferEndIndex__d2rk18($this), _get_queueEndIndex__4m025l($this));
    }
    return true;
  }
  function tryEmitNoCollectorsLocked($this, value) {
    // Inline function 'kotlinx.coroutines.assert' call
    if ($this.l15_1 === 0)
      return true;
    enqueueLocked($this, value);
    $this.r15_1 = $this.r15_1 + 1 | 0;
    if ($this.r15_1 > $this.l15_1) {
      dropOldestLocked($this);
    }
    var tmp = $this;
    var tmp0 = _get_head__d7jo8b($this);
    // Inline function 'kotlin.Long.plus' call
    var other = $this.r15_1;
    tmp.q15_1 = tmp0.w2(toLong(other));
    return true;
  }
  function dropOldestLocked($this) {
    setBufferAt(ensureNotNull($this.o15_1), _get_head__d7jo8b($this), null);
    $this.r15_1 = $this.r15_1 - 1 | 0;
    // Inline function 'kotlin.Long.plus' call
    var newHead = _get_head__d7jo8b($this).w2(toLong(1));
    if ($this.p15_1.b1(newHead) < 0)
      $this.p15_1 = newHead;
    if ($this.q15_1.b1(newHead) < 0) {
      correctCollectorIndexesOnDropOldest($this, newHead);
    }
    // Inline function 'kotlinx.coroutines.assert' call
  }
  function correctCollectorIndexesOnDropOldest($this, newHead) {
    $l$block: {
      // Inline function 'kotlinx.coroutines.flow.internal.AbstractSharedFlow.forEachSlotLocked' call
      if ($this.u15_1 === 0) {
        break $l$block;
      }
      var tmp133_safe_receiver = $this.t15_1;
      if (tmp133_safe_receiver == null)
        null;
      else {
        // Inline function 'kotlin.collections.forEach' call
        var inductionVariable = 0;
        var last = tmp133_safe_receiver.length;
        while (inductionVariable < last) {
          var element = tmp133_safe_receiver[inductionVariable];
          inductionVariable = inductionVariable + 1 | 0;
          if (!(element == null)) {
            if (element.x15_1.b1(new Long(0, 0)) >= 0 && element.x15_1.b1(newHead) < 0) {
              element.x15_1 = newHead;
            }
          }
        }
      }
    }
    $this.q15_1 = newHead;
  }
  function enqueueLocked($this, item) {
    var curSize = _get_totalSize__xhdb3o($this);
    var curBuffer = $this.o15_1;
    var buffer = curBuffer == null ? growBuffer($this, null, 0, 2) : curSize >= curBuffer.length ? growBuffer($this, curBuffer, curSize, imul(curBuffer.length, 2)) : curBuffer;
    // Inline function 'kotlin.Long.plus' call
    var tmp$ret$0 = _get_head__d7jo8b($this).w2(toLong(curSize));
    setBufferAt(buffer, tmp$ret$0, item);
  }
  function growBuffer($this, curBuffer, curSize, newSize) {
    // Inline function 'kotlin.check' call
    if (!(newSize > 0)) {
      var message = 'Buffer size overflow';
      throw IllegalStateException_init_$Create$(toString(message));
    }
    // Inline function 'kotlin.arrayOfNulls' call
    // Inline function 'kotlin.also' call
    var this_0 = Array(newSize);
    $this.o15_1 = this_0;
    var newBuffer = this_0;
    if (curBuffer == null)
      return newBuffer;
    var head = _get_head__d7jo8b($this);
    var inductionVariable = 0;
    if (inductionVariable < curSize)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'kotlin.Long.plus' call
        var tmp = head.w2(toLong(i));
        // Inline function 'kotlin.Long.plus' call
        var tmp$ret$6 = head.w2(toLong(i));
        setBufferAt(newBuffer, tmp, getBufferAt(curBuffer, tmp$ret$6));
      }
       while (inductionVariable < curSize);
    return newBuffer;
  }
  function emitSuspend($this, value, $completion) {
    var cancellable = new CancellableContinuationImpl(intercepted($completion), 1);
    cancellable.et();
    var resumes = get_EMPTY_RESUMES();
    // Inline function 'kotlinx.coroutines.internal.synchronized' call
    // Inline function 'kotlinx.coroutines.internal.synchronizedImpl' call
    var tmp$ret$2;
    $l$block: {
      if (tryEmitLocked($this, value)) {
        // Inline function 'kotlin.coroutines.resume' call
        // Inline function 'kotlin.Companion.success' call
        var tmp$ret$0 = _Result___init__impl__xyqfz8(Unit_instance);
        cancellable.m9(tmp$ret$0);
        resumes = findSlotsToResumeLocked($this, resumes);
        tmp$ret$2 = null;
        break $l$block;
      }
      var tmp2 = _get_head__d7jo8b($this);
      // Inline function 'kotlin.Long.plus' call
      var other = _get_totalSize__xhdb3o($this);
      var tmp$ret$3 = tmp2.w2(toLong(other));
      // Inline function 'kotlin.also' call
      var this_0 = new Emitter($this, tmp$ret$3, value, cancellable);
      enqueueLocked($this, this_0);
      $this.s15_1 = $this.s15_1 + 1 | 0;
      if ($this.m15_1 === 0)
        resumes = findSlotsToResumeLocked($this, resumes);
      tmp$ret$2 = this_0;
    }
    var emitter = tmp$ret$2;
    if (emitter == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      disposeOnCancellation(cancellable, emitter);
    }
    var indexedObject = resumes;
    var inductionVariable = 0;
    var last = indexedObject.length;
    while (inductionVariable < last) {
      var r = indexedObject[inductionVariable];
      inductionVariable = inductionVariable + 1 | 0;
      if (r == null)
        null;
      else {
        // Inline function 'kotlin.coroutines.resume' call
        // Inline function 'kotlin.Companion.success' call
        var tmp$ret$10 = _Result___init__impl__xyqfz8(Unit_instance);
        r.m9(tmp$ret$10);
      }
    }
    return cancellable.mt();
  }
  function cancelEmitter($this, emitter) {
    // Inline function 'kotlinx.coroutines.internal.synchronized' call
    // Inline function 'kotlinx.coroutines.internal.synchronizedImpl' call
    if (emitter.a16_1.b1(_get_head__d7jo8b($this)) < 0)
      return Unit_instance;
    var buffer = ensureNotNull($this.o15_1);
    if (!(getBufferAt(buffer, emitter.a16_1) === emitter))
      return Unit_instance;
    setBufferAt(buffer, emitter.a16_1, get_NO_VALUE());
    cleanupTailLocked($this);
    return Unit_instance;
  }
  function updateBufferLocked($this, newReplayIndex, newMinCollectorIndex, newBufferEndIndex, newQueueEndIndex) {
    // Inline function 'kotlin.comparisons.minOf' call
    var newHead = newMinCollectorIndex.b1(newReplayIndex) <= 0 ? newMinCollectorIndex : newReplayIndex;
    // Inline function 'kotlinx.coroutines.assert' call
    var inductionVariable = _get_head__d7jo8b($this);
    if (inductionVariable.b1(newHead) < 0)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable.w2(new Long(1, 0));
        setBufferAt(ensureNotNull($this.o15_1), index, null);
      }
       while (inductionVariable.b1(newHead) < 0);
    $this.p15_1 = newReplayIndex;
    $this.q15_1 = newMinCollectorIndex;
    $this.r15_1 = newBufferEndIndex.x2(newHead).g1();
    $this.s15_1 = newQueueEndIndex.x2(newBufferEndIndex).g1();
    // Inline function 'kotlinx.coroutines.assert' call
    // Inline function 'kotlinx.coroutines.assert' call
    // Inline function 'kotlinx.coroutines.assert' call
  }
  function cleanupTailLocked($this) {
    if ($this.m15_1 === 0 && $this.s15_1 <= 1)
      return Unit_instance;
    var buffer = ensureNotNull($this.o15_1);
    $l$loop: while (true) {
      var tmp;
      if ($this.s15_1 > 0) {
        var tmp0 = _get_head__d7jo8b($this);
        // Inline function 'kotlin.Long.plus' call
        var other = _get_totalSize__xhdb3o($this);
        // Inline function 'kotlin.Long.minus' call
        var tmp$ret$1 = tmp0.w2(toLong(other)).x2(toLong(1));
        tmp = getBufferAt(buffer, tmp$ret$1) === get_NO_VALUE();
      } else {
        tmp = false;
      }
      if (!tmp) {
        break $l$loop;
      }
      $this.s15_1 = $this.s15_1 - 1 | 0;
      var tmp4 = _get_head__d7jo8b($this);
      // Inline function 'kotlin.Long.plus' call
      var other_0 = _get_totalSize__xhdb3o($this);
      var tmp$ret$2 = tmp4.w2(toLong(other_0));
      setBufferAt(buffer, tmp$ret$2, null);
    }
  }
  function tryTakeValue($this, slot) {
    var resumes = get_EMPTY_RESUMES();
    // Inline function 'kotlinx.coroutines.internal.synchronized' call
    // Inline function 'kotlinx.coroutines.internal.synchronizedImpl' call
    var index = tryPeekLocked($this, slot);
    var tmp;
    if (index.b1(new Long(0, 0)) < 0) {
      tmp = get_NO_VALUE();
    } else {
      var oldIndex = slot.x15_1;
      var newValue = getPeekedValueLockedAt($this, index);
      var tmp_0 = slot;
      // Inline function 'kotlin.Long.plus' call
      tmp_0.x15_1 = index.w2(toLong(1));
      resumes = $this.d16(oldIndex);
      tmp = newValue;
    }
    var value = tmp;
    var indexedObject = resumes;
    var inductionVariable = 0;
    var last = indexedObject.length;
    while (inductionVariable < last) {
      var resume = indexedObject[inductionVariable];
      inductionVariable = inductionVariable + 1 | 0;
      if (resume == null)
        null;
      else {
        // Inline function 'kotlin.coroutines.resume' call
        // Inline function 'kotlin.Companion.success' call
        var tmp$ret$4 = _Result___init__impl__xyqfz8(Unit_instance);
        resume.m9(tmp$ret$4);
      }
    }
    return value;
  }
  function tryPeekLocked($this, slot) {
    var index = slot.x15_1;
    if (index.b1(_get_bufferEndIndex__d2rk18($this)) < 0)
      return index;
    if ($this.m15_1 > 0)
      return new Long(-1, -1);
    if (index.b1(_get_head__d7jo8b($this)) > 0)
      return new Long(-1, -1);
    if ($this.s15_1 === 0)
      return new Long(-1, -1);
    return index;
  }
  function getPeekedValueLockedAt($this, index) {
    var item = getBufferAt(ensureNotNull($this.o15_1), index);
    var tmp;
    if (item instanceof Emitter) {
      tmp = item.b16_1;
    } else {
      tmp = item;
    }
    return tmp;
  }
  function awaitValue($this, slot, $completion) {
    var cancellable = new CancellableContinuationImpl(intercepted($completion), 1);
    cancellable.et();
    // Inline function 'kotlinx.coroutines.internal.synchronized' call
    // Inline function 'kotlinx.coroutines.internal.synchronizedImpl' call
    $l$block: {
      var index = tryPeekLocked($this, slot);
      if (index.b1(new Long(0, 0)) < 0) {
        slot.y15_1 = cancellable;
      } else {
        // Inline function 'kotlin.coroutines.resume' call
        // Inline function 'kotlin.Companion.success' call
        var tmp$ret$0 = _Result___init__impl__xyqfz8(Unit_instance);
        cancellable.m9(tmp$ret$0);
        break $l$block;
      }
      slot.y15_1 = cancellable;
    }
    return cancellable.mt();
  }
  function findSlotsToResumeLocked($this, resumesIn) {
    var resumes = resumesIn;
    var resumeCount = resumesIn.length;
    $l$block: {
      // Inline function 'kotlinx.coroutines.flow.internal.AbstractSharedFlow.forEachSlotLocked' call
      if ($this.u15_1 === 0) {
        break $l$block;
      }
      var tmp133_safe_receiver = $this.t15_1;
      if (tmp133_safe_receiver == null)
        null;
      else {
        // Inline function 'kotlin.collections.forEach' call
        var inductionVariable = 0;
        var last = tmp133_safe_receiver.length;
        while (inductionVariable < last) {
          var element = tmp133_safe_receiver[inductionVariable];
          inductionVariable = inductionVariable + 1 | 0;
          if (!(element == null)) {
            $l$block_1: {
              var tmp0_elvis_lhs = element.y15_1;
              var tmp;
              if (tmp0_elvis_lhs == null) {
                break $l$block_1;
              } else {
                tmp = tmp0_elvis_lhs;
              }
              var cont = tmp;
              if (tryPeekLocked($this, element).b1(new Long(0, 0)) < 0) {
                break $l$block_1;
              }
              if (resumeCount >= resumes.length) {
                var tmp_0 = resumes;
                // Inline function 'kotlin.comparisons.maxOf' call
                var b = imul(2, resumes.length);
                var tmp$ret$2 = Math.max(2, b);
                resumes = copyOf(tmp_0, tmp$ret$2);
              }
              var tmp_1 = resumes;
              var _unary__edvuaz = resumeCount;
              resumeCount = _unary__edvuaz + 1 | 0;
              tmp_1[_unary__edvuaz] = cont;
              element.y15_1 = null;
            }
          }
        }
      }
    }
    return resumes;
  }
  function Emitter(flow, index, value, cont) {
    this.z15_1 = flow;
    this.a16_1 = index;
    this.b16_1 = value;
    this.c16_1 = cont;
  }
  protoOf(Emitter).cs = function () {
    return cancelEmitter(this.z15_1, this);
  };
  function $collectCOROUTINE$14(_this__u8e3s4, collector, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.m16_1 = _this__u8e3s4;
    this.n16_1 = collector;
  }
  protoOf($collectCOROUTINE$14).j9 = function () {
    var suspendResult = this.d9_1;
    $sm: do
      try {
        var tmp = this.b9_1;
        switch (tmp) {
          case 0:
            this.c9_1 = 13;
            this.o16_1 = this.m16_1.s16();
            this.b9_1 = 1;
            continue $sm;
          case 1:
            this.c9_1 = 12;
            var tmp_0 = this.n16_1;
            if (tmp_0 instanceof SubscribedFlowCollector) {
              this.b9_1 = 2;
              suspendResult = this.n16_1.v16(this);
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
            var tmp_1 = this;
            tmp_1.q16_1 = this.h9().o9(Key_instance_3);
            this.b9_1 = 4;
            continue $sm;
          case 4:
            if (!true) {
              this.b9_1 = 10;
              continue $sm;
            }

            this.b9_1 = 5;
            continue $sm;
          case 5:
            if (!true) {
              this.b9_1 = 8;
              continue $sm;
            }

            this.r16_1 = tryTakeValue(this.m16_1, this.o16_1);
            if (!(this.r16_1 === get_NO_VALUE())) {
              this.b9_1 = 8;
              continue $sm;
            } else {
              this.b9_1 = 6;
              continue $sm;
            }

          case 6:
            this.b9_1 = 7;
            suspendResult = awaitValue(this.m16_1, this.o16_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 7:
            this.b9_1 = 5;
            continue $sm;
          case 8:
            var tmp121_safe_receiver = this.q16_1;
            if (tmp121_safe_receiver == null)
              null;
            else {
              ensureActive_0(tmp121_safe_receiver);
            }

            this.b9_1 = 9;
            var tmp_2 = this.r16_1;
            suspendResult = this.n16_1.g15((tmp_2 == null ? true : !(tmp_2 == null)) ? tmp_2 : THROW_CCE(), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 9:
            this.b9_1 = 4;
            continue $sm;
          case 10:
            this.p16_1 = Unit_instance;
            this.c9_1 = 13;
            this.b9_1 = 11;
            continue $sm;
          case 11:
            this.c9_1 = 13;
            this.m16_1.w16(this.o16_1);
            return Unit_instance;
          case 12:
            this.c9_1 = 13;
            var t = this.e9_1;
            this.m16_1.w16(this.o16_1);
            throw t;
          case 13:
            throw this.e9_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.c9_1 === 13) {
          throw e;
        } else {
          this.b9_1 = this.c9_1;
          this.e9_1 = e;
        }
      }
     while (true);
  };
  function SharedFlowImpl(replay, bufferCapacity, onBufferOverflow) {
    AbstractSharedFlow.call(this);
    this.l15_1 = replay;
    this.m15_1 = bufferCapacity;
    this.n15_1 = onBufferOverflow;
    this.o15_1 = null;
    this.p15_1 = new Long(0, 0);
    this.q15_1 = new Long(0, 0);
    this.r15_1 = 0;
    this.s15_1 = 0;
  }
  protoOf(SharedFlowImpl).x16 = function () {
    var tmp = ensureNotNull(this.o15_1);
    var tmp0 = this.p15_1;
    // Inline function 'kotlin.Long.plus' call
    var other = _get_replaySize__dxgnb1(this);
    // Inline function 'kotlin.Long.minus' call
    var tmp$ret$1 = tmp0.w2(toLong(other)).x2(toLong(1));
    var tmp_0 = getBufferAt(tmp, tmp$ret$1);
    return (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
  };
  protoOf(SharedFlowImpl).y16 = function (collector, $completion) {
    var tmp = new $collectCOROUTINE$14(this, collector, $completion);
    tmp.d9_1 = Unit_instance;
    tmp.e9_1 = null;
    return tmp.j9();
  };
  protoOf(SharedFlowImpl).p14 = function (collector, $completion) {
    return this.y16(collector, $completion);
  };
  protoOf(SharedFlowImpl).z16 = function (value) {
    var resumes = get_EMPTY_RESUMES();
    // Inline function 'kotlinx.coroutines.internal.synchronized' call
    // Inline function 'kotlinx.coroutines.internal.synchronizedImpl' call
    var tmp;
    if (tryEmitLocked(this, value)) {
      resumes = findSlotsToResumeLocked(this, resumes);
      tmp = true;
    } else {
      tmp = false;
    }
    var emitted = tmp;
    var indexedObject = resumes;
    var inductionVariable = 0;
    var last = indexedObject.length;
    while (inductionVariable < last) {
      var cont = indexedObject[inductionVariable];
      inductionVariable = inductionVariable + 1 | 0;
      if (cont == null)
        null;
      else {
        // Inline function 'kotlin.coroutines.resume' call
        // Inline function 'kotlin.Companion.success' call
        var tmp$ret$3 = _Result___init__impl__xyqfz8(Unit_instance);
        cont.m9(tmp$ret$3);
      }
    }
    return emitted;
  };
  protoOf(SharedFlowImpl).g15 = function (value, $completion) {
    if (this.z16(value))
      return Unit_instance;
    return emitSuspend(this, value, $completion);
  };
  protoOf(SharedFlowImpl).a17 = function () {
    var index = this.p15_1;
    if (index.b1(this.q15_1) < 0)
      this.q15_1 = index;
    return index;
  };
  protoOf(SharedFlowImpl).d16 = function (oldIndex) {
    // Inline function 'kotlinx.coroutines.assert' call
    if (oldIndex.b1(this.q15_1) > 0)
      return get_EMPTY_RESUMES();
    var head = _get_head__d7jo8b(this);
    // Inline function 'kotlin.Long.plus' call
    var other = this.r15_1;
    var newMinCollectorIndex = head.w2(toLong(other));
    if (this.m15_1 === 0 && this.s15_1 > 0) {
      newMinCollectorIndex = newMinCollectorIndex.b3();
    }
    $l$block: {
      // Inline function 'kotlinx.coroutines.flow.internal.AbstractSharedFlow.forEachSlotLocked' call
      if (this.u15_1 === 0) {
        break $l$block;
      }
      var tmp133_safe_receiver = this.t15_1;
      if (tmp133_safe_receiver == null)
        null;
      else {
        // Inline function 'kotlin.collections.forEach' call
        var inductionVariable = 0;
        var last = tmp133_safe_receiver.length;
        while (inductionVariable < last) {
          var element = tmp133_safe_receiver[inductionVariable];
          inductionVariable = inductionVariable + 1 | 0;
          if (!(element == null)) {
            if (element.x15_1.b1(new Long(0, 0)) >= 0 && element.x15_1.b1(newMinCollectorIndex) < 0)
              newMinCollectorIndex = element.x15_1;
          }
        }
      }
    }
    // Inline function 'kotlinx.coroutines.assert' call
    if (newMinCollectorIndex.b1(this.q15_1) <= 0)
      return get_EMPTY_RESUMES();
    var newBufferEndIndex = _get_bufferEndIndex__d2rk18(this);
    var tmp;
    if (this.u15_1 > 0) {
      var newBufferSize0 = newBufferEndIndex.x2(newMinCollectorIndex).g1();
      var tmp4 = this.s15_1;
      // Inline function 'kotlin.comparisons.minOf' call
      var b = this.m15_1 - newBufferSize0 | 0;
      tmp = Math.min(tmp4, b);
    } else {
      tmp = this.s15_1;
    }
    var maxResumeCount = tmp;
    var resumes = get_EMPTY_RESUMES();
    var tmp6 = newBufferEndIndex;
    // Inline function 'kotlin.Long.plus' call
    var other_0 = this.s15_1;
    var newQueueEndIndex = tmp6.w2(toLong(other_0));
    if (maxResumeCount > 0) {
      // Inline function 'kotlin.arrayOfNulls' call
      resumes = Array(maxResumeCount);
      var resumeCount = 0;
      var buffer = ensureNotNull(this.o15_1);
      var inductionVariable_0 = newBufferEndIndex;
      if (inductionVariable_0.b1(newQueueEndIndex) < 0)
        $l$loop: do {
          var curEmitterIndex = inductionVariable_0;
          inductionVariable_0 = inductionVariable_0.w2(new Long(1, 0));
          var emitter = getBufferAt(buffer, curEmitterIndex);
          if (!(emitter === get_NO_VALUE())) {
            if (!(emitter instanceof Emitter))
              THROW_CCE();
            var tmp_0 = resumes;
            var _unary__edvuaz = resumeCount;
            resumeCount = _unary__edvuaz + 1 | 0;
            tmp_0[_unary__edvuaz] = emitter.c16_1;
            setBufferAt(buffer, curEmitterIndex, get_NO_VALUE());
            setBufferAt(buffer, newBufferEndIndex, emitter.b16_1);
            newBufferEndIndex = newBufferEndIndex.b3();
            if (resumeCount >= maxResumeCount)
              break $l$loop;
          }
        }
         while (inductionVariable_0.b1(newQueueEndIndex) < 0);
    }
    var newBufferSize1 = newBufferEndIndex.x2(head).g1();
    if (this.u15_1 === 0)
      newMinCollectorIndex = newBufferEndIndex;
    var tmp13 = this.p15_1;
    var tmp11 = newBufferEndIndex;
    // Inline function 'kotlin.comparisons.minOf' call
    var a = this.l15_1;
    // Inline function 'kotlin.Long.minus' call
    var other_1 = Math.min(a, newBufferSize1);
    // Inline function 'kotlin.comparisons.maxOf' call
    var b_0 = tmp11.x2(toLong(other_1));
    var newReplayIndex = tmp13.b1(b_0) >= 0 ? tmp13 : b_0;
    if (this.m15_1 === 0 && newReplayIndex.b1(newQueueEndIndex) < 0 && equals(getBufferAt(ensureNotNull(this.o15_1), newReplayIndex), get_NO_VALUE())) {
      newBufferEndIndex = newBufferEndIndex.b3();
      newReplayIndex = newReplayIndex.b3();
    }
    updateBufferLocked(this, newReplayIndex, newMinCollectorIndex, newBufferEndIndex, newQueueEndIndex);
    cleanupTailLocked(this);
    // Inline function 'kotlin.collections.isNotEmpty' call
    // Inline function 'kotlin.collections.isEmpty' call
    if (!(resumes.length === 0))
      resumes = findSlotsToResumeLocked(this, resumes);
    return resumes;
  };
  protoOf(SharedFlowImpl).b17 = function () {
    return new SharedFlowSlot();
  };
  protoOf(SharedFlowImpl).c17 = function (size) {
    // Inline function 'kotlin.arrayOfNulls' call
    return Array(size);
  };
  function SharedFlowSlot() {
    AbstractSharedFlowSlot.call(this);
    this.x15_1 = new Long(-1, -1);
    this.y15_1 = null;
  }
  protoOf(SharedFlowSlot).d17 = function (flow) {
    if (this.x15_1.b1(new Long(0, 0)) >= 0)
      return false;
    this.x15_1 = flow.a17();
    return true;
  };
  protoOf(SharedFlowSlot).e17 = function (flow) {
    return this.d17(flow instanceof SharedFlowImpl ? flow : THROW_CCE());
  };
  protoOf(SharedFlowSlot).f17 = function (flow) {
    // Inline function 'kotlinx.coroutines.assert' call
    var oldIndex = this.x15_1;
    this.x15_1 = new Long(-1, -1);
    this.y15_1 = null;
    return flow.d16(oldIndex);
  };
  protoOf(SharedFlowSlot).g17 = function (flow) {
    return this.f17(flow instanceof SharedFlowImpl ? flow : THROW_CCE());
  };
  function getBufferAt(_this__u8e3s4, index) {
    _init_properties_SharedFlow_kt__umasnn();
    return _this__u8e3s4[index.g1() & (_this__u8e3s4.length - 1 | 0)];
  }
  function setBufferAt(_this__u8e3s4, index, item) {
    _init_properties_SharedFlow_kt__umasnn();
    return _this__u8e3s4[index.g1() & (_this__u8e3s4.length - 1 | 0)] = item;
  }
  var properties_initialized_SharedFlow_kt_tmefor;
  function _init_properties_SharedFlow_kt__umasnn() {
    if (!properties_initialized_SharedFlow_kt_tmefor) {
      properties_initialized_SharedFlow_kt_tmefor = true;
      NO_VALUE = new Symbol('NO_VALUE');
    }
  }
  function get_EMPTY_RESUMES() {
    _init_properties_AbstractSharedFlow_kt__h2xygb();
    return EMPTY_RESUMES;
  }
  var EMPTY_RESUMES;
  function AbstractSharedFlow() {
    SynchronizedObject.call(this);
    this.t15_1 = null;
    this.u15_1 = 0;
    this.v15_1 = 0;
    this.w15_1 = null;
  }
  protoOf(AbstractSharedFlow).s16 = function () {
    var subscriptionCount;
    // Inline function 'kotlinx.coroutines.internal.synchronized' call
    // Inline function 'kotlinx.coroutines.internal.synchronizedImpl' call
    var curSlots = this.t15_1;
    var tmp;
    if (curSlots == null) {
      // Inline function 'kotlin.also' call
      var this_0 = this.c17(2);
      this.t15_1 = this_0;
      tmp = this_0;
    } else {
      var tmp_0;
      if (this.u15_1 >= curSlots.length) {
        // Inline function 'kotlin.also' call
        var this_1 = copyOf(curSlots, imul(2, curSlots.length));
        this.t15_1 = this_1;
        tmp_0 = this_1;
      } else {
        tmp_0 = curSlots;
      }
      tmp = tmp_0;
    }
    var slots = tmp;
    var index = this.v15_1;
    var slot;
    $l$loop: while (true) {
      var tmp0_elvis_lhs = slots[index];
      var tmp_1;
      if (tmp0_elvis_lhs == null) {
        // Inline function 'kotlin.also' call
        var this_2 = this.b17();
        slots[index] = this_2;
        tmp_1 = this_2;
      } else {
        tmp_1 = tmp0_elvis_lhs;
      }
      slot = tmp_1;
      index = index + 1 | 0;
      if (index >= slots.length)
        index = 0;
      if ((slot instanceof AbstractSharedFlowSlot ? slot : THROW_CCE()).e17(this))
        break $l$loop;
    }
    this.v15_1 = index;
    this.u15_1 = this.u15_1 + 1 | 0;
    subscriptionCount = this.w15_1;
    var slot_0 = slot;
    if (subscriptionCount == null)
      null;
    else
      subscriptionCount.t17(1);
    return slot_0;
  };
  protoOf(AbstractSharedFlow).w16 = function (slot) {
    var subscriptionCount;
    // Inline function 'kotlinx.coroutines.internal.synchronized' call
    // Inline function 'kotlinx.coroutines.internal.synchronizedImpl' call
    this.u15_1 = this.u15_1 - 1 | 0;
    subscriptionCount = this.w15_1;
    if (this.u15_1 === 0)
      this.v15_1 = 0;
    var resumes = (slot instanceof AbstractSharedFlowSlot ? slot : THROW_CCE()).g17(this);
    var inductionVariable = 0;
    var last = resumes.length;
    while (inductionVariable < last) {
      var cont = resumes[inductionVariable];
      inductionVariable = inductionVariable + 1 | 0;
      if (cont == null)
        null;
      else {
        // Inline function 'kotlin.coroutines.resume' call
        // Inline function 'kotlin.Companion.success' call
        var tmp$ret$3 = _Result___init__impl__xyqfz8(Unit_instance);
        cont.m9(tmp$ret$3);
      }
    }
    if (subscriptionCount == null)
      null;
    else
      subscriptionCount.t17(-1);
  };
  function AbstractSharedFlowSlot() {
  }
  var properties_initialized_AbstractSharedFlow_kt_2mpafr;
  function _init_properties_AbstractSharedFlow_kt__h2xygb() {
    if (!properties_initialized_AbstractSharedFlow_kt_2mpafr) {
      properties_initialized_AbstractSharedFlow_kt_2mpafr = true;
      // Inline function 'kotlin.arrayOfNulls' call
      EMPTY_RESUMES = Array(0);
    }
  }
  function NopCollector() {
  }
  protoOf(NopCollector).u17 = function (value, $completion) {
    return Unit_instance;
  };
  protoOf(NopCollector).g15 = function (value, $completion) {
    return this.u17((value == null ? true : !(value == null)) ? value : THROW_CCE(), $completion);
  };
  var NopCollector_instance;
  function NopCollector_getInstance() {
    return NopCollector_instance;
  }
  function checkContext(_this__u8e3s4, currentContext) {
    var result = currentContext.bi(0, checkContext$lambda(_this__u8e3s4));
    if (!(result === _this__u8e3s4.e15_1)) {
      // Inline function 'kotlin.error' call
      var message = 'Flow invariant is violated:\n' + ('\t\tFlow was collected in ' + toString(_this__u8e3s4.d15_1) + ',\n') + ('\t\tbut emission happened in ' + toString(currentContext) + '.\n') + "\t\tPlease refer to 'flow' documentation or use 'flowOn' instead";
      throw IllegalStateException_init_$Create$(toString(message));
    }
  }
  function transitiveCoroutineParent(_this__u8e3s4, collectJob) {
    var $this = _this__u8e3s4;
    var collectJob_0 = collectJob;
    $l$1: do {
      $l$0: do {
        if ($this === null)
          return null;
        if ($this === collectJob_0)
          return $this;
        if (!($this instanceof ScopeCoroutine))
          return $this;
        var tmp0 = $this.np();
        var tmp1 = collectJob_0;
        $this = tmp0;
        collectJob_0 = tmp1;
        continue $l$0;
      }
       while (false);
    }
     while (true);
  }
  function checkContext$lambda($this_checkContext) {
    return function (count, element) {
      var key = element.v();
      var collectElement = $this_checkContext.d15_1.o9(key);
      var tmp;
      if (!(key === Key_instance_3)) {
        return !(element === collectElement) ? -2147483648 : count + 1 | 0;
      }
      var collectJob = (collectElement == null ? true : isInterface(collectElement, Job)) ? collectElement : THROW_CCE();
      var emissionParentJob = transitiveCoroutineParent(isInterface(element, Job) ? element : THROW_CCE(), collectJob);
      var tmp_0;
      if (!(emissionParentJob === collectJob)) {
        var message = 'Flow invariant is violated:\n\t\tEmission from another coroutine is detected.\n' + ('\t\tChild of ' + toString_0(emissionParentJob) + ', expected child of ' + toString_0(collectJob) + '.\n') + '\t\tFlowCollector is not thread-safe and concurrent emissions are prohibited.\n' + "\t\tTo mitigate this restriction please use 'channelFlow' builder instead of 'flow'";
        throw IllegalStateException_init_$Create$(toString(message));
      }
      return collectJob == null ? count : count + 1 | 0;
    };
  }
  function ensureActive_1(_this__u8e3s4) {
    if (_this__u8e3s4 instanceof ThrowingCollector)
      throw _this__u8e3s4.v17_1;
  }
  function ThrowingCollector() {
  }
  function asSharedFlow(_this__u8e3s4) {
    return new ReadonlySharedFlow(_this__u8e3s4, null);
  }
  function $onSubscriptionCOROUTINE$20(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.e18_1 = _this__u8e3s4;
  }
  protoOf($onSubscriptionCOROUTINE$20).j9 = function () {
    var suspendResult = this.d9_1;
    $sm: do
      try {
        var tmp = this.b9_1;
        switch (tmp) {
          case 0:
            this.c9_1 = 7;
            var tmp_0 = this;
            tmp_0.f18_1 = new SafeCollector(this.e18_1.t16_1, this.h9());
            this.b9_1 = 1;
            continue $sm;
          case 1:
            this.c9_1 = 6;
            this.b9_1 = 2;
            suspendResult = this.e18_1.u16_1(this.f18_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            this.g18_1 = suspendResult;
            this.c9_1 = 7;
            this.b9_1 = 3;
            continue $sm;
          case 3:
            this.c9_1 = 7;
            this.f18_1.l9();
            var tmp_1 = this.e18_1.t16_1;
            if (tmp_1 instanceof SubscribedFlowCollector) {
              this.b9_1 = 4;
              suspendResult = this.e18_1.t16_1.v16(this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.b9_1 = 5;
              continue $sm;
            }

          case 4:
            this.b9_1 = 5;
            continue $sm;
          case 5:
            return Unit_instance;
          case 6:
            this.c9_1 = 7;
            var t = this.e9_1;
            this.f18_1.l9();
            throw t;
          case 7:
            throw this.e9_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.c9_1 === 7) {
          throw e;
        } else {
          this.b9_1 = this.c9_1;
          this.e9_1 = e;
        }
      }
     while (true);
  };
  function SubscribedFlowCollector() {
  }
  protoOf(SubscribedFlowCollector).v16 = function ($completion) {
    var tmp = new $onSubscriptionCOROUTINE$20(this, $completion);
    tmp.d9_1 = Unit_instance;
    tmp.e9_1 = null;
    return tmp.j9();
  };
  function $collectCOROUTINE$21(_this__u8e3s4, collector, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.p18_1 = _this__u8e3s4;
    this.q18_1 = collector;
  }
  protoOf($collectCOROUTINE$21).j9 = function () {
    var suspendResult = this.d9_1;
    $sm: do
      try {
        var tmp = this.b9_1;
        switch (tmp) {
          case 0:
            this.c9_1 = 2;
            this.b9_1 = 1;
            suspendResult = this.p18_1.r18_1.y16(this.q18_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            throwKotlinNothingValueException();
            break;
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
  function ReadonlySharedFlow(flow, job) {
    this.r18_1 = flow;
    this.s18_1 = job;
  }
  protoOf(ReadonlySharedFlow).y16 = function (collector, $completion) {
    var tmp = new $collectCOROUTINE$21(this, collector, $completion);
    tmp.d9_1 = Unit_instance;
    tmp.e9_1 = null;
    return tmp.j9();
  };
  protoOf(ReadonlySharedFlow).p14 = function (collector, $completion) {
    return this.y16(collector, $completion);
  };
  function onEach(_this__u8e3s4, action) {
    // Inline function 'kotlinx.coroutines.flow.unsafeTransform' call
    // Inline function 'kotlinx.coroutines.flow.internal.unsafeFlow' call
    return new onEach$$inlined$unsafeTransform$1(_this__u8e3s4, action);
  }
  function sam$kotlinx_coroutines_flow_FlowCollector$0(function_0) {
    this.t18_1 = function_0;
  }
  protoOf(sam$kotlinx_coroutines_flow_FlowCollector$0).g15 = function (value, $completion) {
    return this.t18_1(value, $completion);
  };
  protoOf(sam$kotlinx_coroutines_flow_FlowCollector$0).o3 = function () {
    return this.t18_1;
  };
  protoOf(sam$kotlinx_coroutines_flow_FlowCollector$0).equals = function (other) {
    var tmp;
    if (!(other == null) ? isInterface(other, FlowCollector) : false) {
      var tmp_0;
      if (!(other == null) ? isInterface(other, FunctionAdapter) : false) {
        tmp_0 = equals(this.o3(), other.o3());
      } else {
        tmp_0 = false;
      }
      tmp = tmp_0;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(sam$kotlinx_coroutines_flow_FlowCollector$0).hashCode = function () {
    return hashCode(this.o3());
  };
  function onEach$o$collect$slambda($$this$unsafeFlow, $action, resultContinuation) {
    this.c19_1 = $$this$unsafeFlow;
    this.d19_1 = $action;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(onEach$o$collect$slambda).j19 = function (value, $completion) {
    var tmp = this.k19(value, $completion);
    tmp.d9_1 = Unit_instance;
    tmp.e9_1 = null;
    return tmp.j9();
  };
  protoOf(onEach$o$collect$slambda).r9 = function (p1, $completion) {
    return this.j19((p1 == null ? true : !(p1 == null)) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(onEach$o$collect$slambda).j9 = function () {
    var suspendResult = this.d9_1;
    $sm: do
      try {
        var tmp = this.b9_1;
        switch (tmp) {
          case 0:
            this.c9_1 = 3;
            var tmp_0 = this;
            tmp_0.f19_1 = this.c19_1;
            var tmp_1 = this;
            tmp_1.g19_1 = this.e19_1;
            this.h19_1 = this.f19_1;
            this.i19_1 = this.g19_1;
            this.b9_1 = 1;
            suspendResult = this.d19_1(this.i19_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.b9_1 = 2;
            suspendResult = this.h19_1.g15(this.i19_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

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
  protoOf(onEach$o$collect$slambda).k19 = function (value, completion) {
    var i = new onEach$o$collect$slambda(this.c19_1, this.d19_1, completion);
    i.e19_1 = value;
    return i;
  };
  function onEach$o$collect$slambda_0($$this$unsafeFlow, $action, resultContinuation) {
    var i = new onEach$o$collect$slambda($$this$unsafeFlow, $action, resultContinuation);
    var l = function (value, $completion) {
      return i.j19(value, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function $collectCOROUTINE$23(_this__u8e3s4, collector, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.t19_1 = _this__u8e3s4;
    this.u19_1 = collector;
  }
  protoOf($collectCOROUTINE$23).j9 = function () {
    var suspendResult = this.d9_1;
    $sm: do
      try {
        var tmp = this.b9_1;
        switch (tmp) {
          case 0:
            this.c9_1 = 2;
            var tmp_0 = this;
            tmp_0.v19_1 = this.u19_1;
            this.w19_1 = this.v19_1;
            this.b9_1 = 1;
            var tmp_1 = onEach$o$collect$slambda_0(this.w19_1, this.t19_1.y19_1, null);
            suspendResult = this.t19_1.x19_1.p14(new sam$kotlinx_coroutines_flow_FlowCollector$0(tmp_1), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            return Unit_instance;
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
  function onEach$$inlined$unsafeTransform$1($this, $action) {
    this.x19_1 = $this;
    this.y19_1 = $action;
  }
  protoOf(onEach$$inlined$unsafeTransform$1).z19 = function (collector, $completion) {
    var tmp = new $collectCOROUTINE$23(this, collector, $completion);
    tmp.d9_1 = Unit_instance;
    tmp.e9_1 = null;
    return tmp.j9();
  };
  protoOf(onEach$$inlined$unsafeTransform$1).p14 = function (collector, $completion) {
    return this.z19(collector, $completion);
  };
  function launchIn(_this__u8e3s4, scope) {
    return launch(scope, VOID, VOID, launchIn$slambda_0(_this__u8e3s4, null));
  }
  function emitAll(_this__u8e3s4, flow, $completion) {
    ensureActive_1(_this__u8e3s4);
    return flow.p14(_this__u8e3s4, $completion);
  }
  function collect(_this__u8e3s4, $completion) {
    return _this__u8e3s4.p14(NopCollector_instance, $completion);
  }
  function launchIn$slambda($this_launchIn, resultContinuation) {
    this.i1a_1 = $this_launchIn;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(launchIn$slambda).k1a = function ($this$launch, $completion) {
    var tmp = this.l1a($this$launch, $completion);
    tmp.d9_1 = Unit_instance;
    tmp.e9_1 = null;
    return tmp.j9();
  };
  protoOf(launchIn$slambda).r9 = function (p1, $completion) {
    return this.k1a((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(launchIn$slambda).j9 = function () {
    var suspendResult = this.d9_1;
    $sm: do
      try {
        var tmp = this.b9_1;
        switch (tmp) {
          case 0:
            this.c9_1 = 2;
            this.b9_1 = 1;
            suspendResult = collect(this.i1a_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            return Unit_instance;
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
  protoOf(launchIn$slambda).l1a = function ($this$launch, completion) {
    var i = new launchIn$slambda(this.i1a_1, completion);
    i.j1a_1 = $this$launch;
    return i;
  };
  function launchIn$slambda_0($this_launchIn, resultContinuation) {
    var i = new launchIn$slambda($this_launchIn, resultContinuation);
    var l = function ($this$launch, $completion) {
      return i.k1a($this$launch, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function toList(_this__u8e3s4, destination, $completion) {
    destination = destination === VOID ? ArrayList_init_$Create$_0() : destination;
    return toCollection(_this__u8e3s4, destination, $completion);
  }
  function toCollection(_this__u8e3s4, destination, $completion) {
    var tmp = new $toCollectionCOROUTINE$26(_this__u8e3s4, destination, $completion);
    tmp.d9_1 = Unit_instance;
    tmp.e9_1 = null;
    return tmp.j9();
  }
  function sam$kotlinx_coroutines_flow_FlowCollector$0_0(function_0) {
    this.w1a_1 = function_0;
  }
  protoOf(sam$kotlinx_coroutines_flow_FlowCollector$0_0).g15 = function (value, $completion) {
    return this.w1a_1(value, $completion);
  };
  protoOf(sam$kotlinx_coroutines_flow_FlowCollector$0_0).o3 = function () {
    return this.w1a_1;
  };
  protoOf(sam$kotlinx_coroutines_flow_FlowCollector$0_0).equals = function (other) {
    var tmp;
    if (!(other == null) ? isInterface(other, FlowCollector) : false) {
      var tmp_0;
      if (!(other == null) ? isInterface(other, FunctionAdapter) : false) {
        tmp_0 = equals(this.o3(), other.o3());
      } else {
        tmp_0 = false;
      }
      tmp = tmp_0;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(sam$kotlinx_coroutines_flow_FlowCollector$0_0).hashCode = function () {
    return hashCode(this.o3());
  };
  function toCollection$slambda($destination, resultContinuation) {
    this.f1b_1 = $destination;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(toCollection$slambda).h1b = function (value, $completion) {
    var tmp = this.i1b(value, $completion);
    tmp.d9_1 = Unit_instance;
    tmp.e9_1 = null;
    return tmp.j9();
  };
  protoOf(toCollection$slambda).r9 = function (p1, $completion) {
    return this.h1b((p1 == null ? true : !(p1 == null)) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(toCollection$slambda).j9 = function () {
    var suspendResult = this.d9_1;
    $sm: do
      try {
        var tmp = this.b9_1;
        if (tmp === 0) {
          this.c9_1 = 1;
          this.f1b_1.e(this.g1b_1);
          return Unit_instance;
        } else if (tmp === 1) {
          throw this.e9_1;
        }
      } catch ($p) {
        var e = $p;
        throw e;
      }
     while (true);
  };
  protoOf(toCollection$slambda).i1b = function (value, completion) {
    var i = new toCollection$slambda(this.f1b_1, completion);
    i.g1b_1 = value;
    return i;
  };
  function toCollection$slambda_0($destination, resultContinuation) {
    var i = new toCollection$slambda($destination, resultContinuation);
    var l = function (value, $completion) {
      return i.h1b(value, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function $toCollectionCOROUTINE$26(_this__u8e3s4, destination, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.u1a_1 = _this__u8e3s4;
    this.v1a_1 = destination;
  }
  protoOf($toCollectionCOROUTINE$26).j9 = function () {
    var suspendResult = this.d9_1;
    $sm: do
      try {
        var tmp = this.b9_1;
        switch (tmp) {
          case 0:
            this.c9_1 = 2;
            this.b9_1 = 1;
            var tmp_0 = toCollection$slambda_0(this.v1a_1, null);
            suspendResult = this.u1a_1.p14(new sam$kotlinx_coroutines_flow_FlowCollector$0_0(tmp_0), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            return this.v1a_1;
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
  function get_CLOSED() {
    _init_properties_ConcurrentLinkedList_kt__5gcgzy();
    return CLOSED;
  }
  var CLOSED;
  function Segment(id, prev, pointers) {
    ConcurrentLinkedListNode.call(this, prev);
    this.qs_1 = id;
    this.rs_1 = atomic$int$1(pointers << 16);
  }
  protoOf(Segment).q10 = function () {
    return this.rs_1.kotlinx$atomicfu$value === this.sz() && !this.x10();
  };
  protoOf(Segment).r10 = function () {
    var tmp0 = this.rs_1;
    var tmp$ret$1;
    $l$block_0: {
      // Inline function 'kotlinx.coroutines.internal.addConditionally' call
      while (true) {
        var cur = tmp0.kotlinx$atomicfu$value;
        if (!(!(cur === this.sz()) || this.x10())) {
          tmp$ret$1 = false;
          break $l$block_0;
        }
        if (tmp0.atomicfu$compareAndSet(cur, cur + 65536 | 0)) {
          tmp$ret$1 = true;
          break $l$block_0;
        }
      }
    }
    return tmp$ret$1;
  };
  protoOf(Segment).s10 = function () {
    return this.rs_1.atomicfu$addAndGet(-65536) === this.sz() && !this.x10();
  };
  protoOf(Segment).p10 = function () {
    if (this.rs_1.atomicfu$incrementAndGet() === this.sz()) {
      this.g4();
    }
  };
  function close(_this__u8e3s4) {
    _init_properties_ConcurrentLinkedList_kt__5gcgzy();
    var cur = _this__u8e3s4;
    while (true) {
      // Inline function 'kotlinx.coroutines.internal.ConcurrentLinkedListNode.nextOrIfClosed' call
      var this_0 = cur;
      // Inline function 'kotlin.let' call
      var it = access$_get_nextOrClosed__ywzond(this_0);
      var tmp;
      if (it === access$_get_CLOSED_$tConcurrentLinkedListKt_wmtpdy()) {
        return cur;
      } else {
        tmp = (it == null ? true : it instanceof ConcurrentLinkedListNode) ? it : THROW_CCE();
      }
      var next = tmp;
      if (next === null) {
        if (cur.a11())
          return cur;
      } else {
        cur = next;
      }
    }
  }
  function _SegmentOrClosed___init__impl__jnexvb(value) {
    return value;
  }
  function _get_value__a43j40($this) {
    return $this;
  }
  function _SegmentOrClosed___get_isClosed__impl__qmxmlo($this) {
    return _get_value__a43j40($this) === get_CLOSED();
  }
  function _SegmentOrClosed___get_segment__impl__jvcr9l($this) {
    var tmp;
    if (_get_value__a43j40($this) === get_CLOSED()) {
      var message = 'Does not contain segment';
      throw IllegalStateException_init_$Create$(toString(message));
    } else {
      var tmp_0 = _get_value__a43j40($this);
      tmp = tmp_0 instanceof Segment ? tmp_0 : THROW_CCE();
    }
    return tmp;
  }
  function SegmentOrClosed__toString_impl_pzb2an($this) {
    return 'SegmentOrClosed(value=' + toString_0($this) + ')';
  }
  function SegmentOrClosed__hashCode_impl_4855hs($this) {
    return $this == null ? 0 : hashCode($this);
  }
  function SegmentOrClosed__equals_impl_6erq1g($this, other) {
    if (!(other instanceof SegmentOrClosed))
      return false;
    var tmp0_other_with_cast = other instanceof SegmentOrClosed ? other.g13_1 : THROW_CCE();
    if (!equals($this, tmp0_other_with_cast))
      return false;
    return true;
  }
  function SegmentOrClosed(value) {
    this.g13_1 = value;
  }
  protoOf(SegmentOrClosed).toString = function () {
    return SegmentOrClosed__toString_impl_pzb2an(this.g13_1);
  };
  protoOf(SegmentOrClosed).hashCode = function () {
    return SegmentOrClosed__hashCode_impl_4855hs(this.g13_1);
  };
  protoOf(SegmentOrClosed).equals = function (other) {
    return SegmentOrClosed__equals_impl_6erq1g(this.g13_1, other);
  };
  function _get_nextOrClosed__w0gmuv($this) {
    return $this.t10_1.kotlinx$atomicfu$value;
  }
  function _get_aliveSegmentLeft__mr4ndu($this) {
    var cur = $this.y10();
    while (!(cur === null) && cur.q10())
      cur = cur.u10_1.kotlinx$atomicfu$value;
    return cur;
  }
  function _get_aliveSegmentRight__7ulr0b($this) {
    // Inline function 'kotlinx.coroutines.assert' call
    var cur = ensureNotNull($this.v10());
    while (cur.q10()) {
      var tmp0_elvis_lhs = cur.v10();
      var tmp;
      if (tmp0_elvis_lhs == null) {
        return cur;
      } else {
        tmp = tmp0_elvis_lhs;
      }
      cur = tmp;
    }
    return cur;
  }
  function access$_get_nextOrClosed__ywzond($this) {
    return _get_nextOrClosed__w0gmuv($this);
  }
  function ConcurrentLinkedListNode(prev) {
    this.t10_1 = atomic$ref$1(null);
    this.u10_1 = atomic$ref$1(prev);
  }
  protoOf(ConcurrentLinkedListNode).v10 = function () {
    // Inline function 'kotlinx.coroutines.internal.ConcurrentLinkedListNode.nextOrIfClosed' call
    // Inline function 'kotlin.let' call
    var it = access$_get_nextOrClosed__ywzond(this);
    var tmp;
    if (it === access$_get_CLOSED_$tConcurrentLinkedListKt_wmtpdy()) {
      return null;
    } else {
      tmp = (it == null ? true : it instanceof ConcurrentLinkedListNode) ? it : THROW_CCE();
    }
    return tmp;
  };
  protoOf(ConcurrentLinkedListNode).w10 = function (value) {
    return this.t10_1.atomicfu$compareAndSet(null, value);
  };
  protoOf(ConcurrentLinkedListNode).x10 = function () {
    return this.v10() == null;
  };
  protoOf(ConcurrentLinkedListNode).y10 = function () {
    return this.u10_1.kotlinx$atomicfu$value;
  };
  protoOf(ConcurrentLinkedListNode).z10 = function () {
    // Inline function 'kotlinx.atomicfu.AtomicRef.lazySet' call
    this.u10_1.kotlinx$atomicfu$value = null;
  };
  protoOf(ConcurrentLinkedListNode).a11 = function () {
    return this.t10_1.atomicfu$compareAndSet(null, get_CLOSED());
  };
  protoOf(ConcurrentLinkedListNode).g4 = function () {
    // Inline function 'kotlinx.coroutines.assert' call
    if (this.x10())
      return Unit_instance;
    $l$loop_0: while (true) {
      var prev = _get_aliveSegmentLeft__mr4ndu(this);
      var next = _get_aliveSegmentRight__7ulr0b(this);
      var tmp0 = next.u10_1;
      $l$block: {
        // Inline function 'kotlinx.atomicfu.update' call
        while (true) {
          var cur = tmp0.kotlinx$atomicfu$value;
          var upd = cur === null ? null : prev;
          if (tmp0.atomicfu$compareAndSet(cur, upd)) {
            break $l$block;
          }
        }
      }
      if (!(prev === null))
        prev.t10_1.kotlinx$atomicfu$value = next;
      if (next.q10() && !next.x10())
        continue $l$loop_0;
      if (!(prev === null) && prev.q10())
        continue $l$loop_0;
      return Unit_instance;
    }
  };
  function findSegmentInternal(_this__u8e3s4, id, createNewSegment) {
    _init_properties_ConcurrentLinkedList_kt__5gcgzy();
    var cur = _this__u8e3s4;
    $l$loop: while (cur.qs_1.b1(id) < 0 || cur.q10()) {
      // Inline function 'kotlinx.coroutines.internal.ConcurrentLinkedListNode.nextOrIfClosed' call
      var this_0 = cur;
      // Inline function 'kotlin.let' call
      var it = access$_get_nextOrClosed__ywzond(this_0);
      var tmp;
      if (it === access$_get_CLOSED_$tConcurrentLinkedListKt_wmtpdy()) {
        return _SegmentOrClosed___init__impl__jnexvb(get_CLOSED());
      } else {
        tmp = (it == null ? true : it instanceof ConcurrentLinkedListNode) ? it : THROW_CCE();
      }
      var next = tmp;
      if (!(next == null)) {
        cur = next;
        continue $l$loop;
      }
      // Inline function 'kotlin.Long.plus' call
      var newTail = createNewSegment(cur.qs_1.w2(toLong(1)), cur);
      if (cur.w10(newTail)) {
        if (cur.q10()) {
          cur.g4();
        }
        cur = newTail;
      }
    }
    return _SegmentOrClosed___init__impl__jnexvb(cur);
  }
  function access$_get_CLOSED_$tConcurrentLinkedListKt_wmtpdy() {
    return get_CLOSED();
  }
  var properties_initialized_ConcurrentLinkedList_kt_kwt434;
  function _init_properties_ConcurrentLinkedList_kt__5gcgzy() {
    if (!properties_initialized_ConcurrentLinkedList_kt_kwt434) {
      properties_initialized_ConcurrentLinkedList_kt_kwt434 = true;
      CLOSED = new Symbol('CLOSED');
    }
  }
  function handleUncaughtCoroutineException(context, exception) {
    var _iterator__ex2g4s = get_platformExceptionHandlers().j();
    while (_iterator__ex2g4s.k()) {
      var handler = _iterator__ex2g4s.l();
      try {
        handler.qv(context, exception);
      } catch ($p) {
        if ($p instanceof ExceptionSuccessfullyProcessed) {
          var _unused_var__etf5q3 = $p;
          return Unit_instance;
        } else {
          if ($p instanceof Error) {
            var t = $p;
            propagateExceptionFinalResort(handlerException(exception, t));
          } else {
            throw $p;
          }
        }
      }
    }
    try {
      addSuppressed(exception, new DiagnosticCoroutineContextException(context));
    } catch ($p) {
      if ($p instanceof Error) {
        var e = $p;
      } else {
        throw $p;
      }
    }
    propagateExceptionFinalResort(exception);
  }
  function ExceptionSuccessfullyProcessed() {
  }
  function get_UNDEFINED() {
    _init_properties_DispatchedContinuation_kt__tnmqc0();
    return UNDEFINED;
  }
  var UNDEFINED;
  function get_REUSABLE_CLAIMED() {
    _init_properties_DispatchedContinuation_kt__tnmqc0();
    return REUSABLE_CLAIMED;
  }
  var REUSABLE_CLAIMED;
  function _get_reusableCancellableContinuation__9qex09($this) {
    var tmp = $this.is_1.kotlinx$atomicfu$value;
    return tmp instanceof CancellableContinuationImpl ? tmp : null;
  }
  function DispatchedContinuation(dispatcher, continuation) {
    DispatchedTask.call(this, -1);
    this.es_1 = dispatcher;
    this.fs_1 = continuation;
    this.gs_1 = get_UNDEFINED();
    this.hs_1 = threadContextElements(this.h9());
    this.is_1 = atomic$ref$1(null);
  }
  protoOf(DispatchedContinuation).h9 = function () {
    return this.fs_1.h9();
  };
  protoOf(DispatchedContinuation).ls = function () {
    return !(this.is_1.kotlinx$atomicfu$value == null);
  };
  protoOf(DispatchedContinuation).j1b = function () {
    // Inline function 'kotlinx.atomicfu.loop' call
    var this_0 = this.is_1;
    while (true) {
      if (!(this_0.kotlinx$atomicfu$value === get_REUSABLE_CLAIMED()))
        return Unit_instance;
    }
  };
  protoOf(DispatchedContinuation).pv = function () {
    this.j1b();
    var tmp148_safe_receiver = _get_reusableCancellableContinuation__9qex09(this);
    if (tmp148_safe_receiver == null)
      null;
    else {
      tmp148_safe_receiver.ct();
    }
  };
  protoOf(DispatchedContinuation).js = function () {
    // Inline function 'kotlinx.atomicfu.loop' call
    var this_0 = this.is_1;
    while (true) {
      var state = this_0.kotlinx$atomicfu$value;
      if (state === null) {
        this.is_1.kotlinx$atomicfu$value = get_REUSABLE_CLAIMED();
        return null;
      } else {
        if (state instanceof CancellableContinuationImpl) {
          if (this.is_1.atomicfu$compareAndSet(state, get_REUSABLE_CLAIMED())) {
            return state instanceof CancellableContinuationImpl ? state : THROW_CCE();
          }
        } else {
          if (state !== get_REUSABLE_CLAIMED()) {
            if (!(state instanceof Error)) {
              // Inline function 'kotlin.error' call
              var message = 'Inconsistent state ' + toString_0(state);
              throw IllegalStateException_init_$Create$(toString(message));
            }
          }
        }
      }
    }
  };
  protoOf(DispatchedContinuation).pt = function (continuation) {
    // Inline function 'kotlinx.atomicfu.loop' call
    var this_0 = this.is_1;
    while (true) {
      var state = this_0.kotlinx$atomicfu$value;
      if (state === get_REUSABLE_CLAIMED()) {
        if (this.is_1.atomicfu$compareAndSet(get_REUSABLE_CLAIMED(), continuation))
          return null;
      } else {
        if (state instanceof Error) {
          // Inline function 'kotlin.require' call
          // Inline function 'kotlin.require' call
          if (!this.is_1.atomicfu$compareAndSet(state, null)) {
            var message = 'Failed requirement.';
            throw IllegalArgumentException_init_$Create$(toString(message));
          }
          return state;
        } else {
          // Inline function 'kotlin.error' call
          var message_0 = 'Inconsistent state ' + toString_0(state);
          throw IllegalStateException_init_$Create$(toString(message_0));
        }
      }
    }
  };
  protoOf(DispatchedContinuation).ns = function (cause) {
    // Inline function 'kotlinx.atomicfu.loop' call
    var this_0 = this.is_1;
    while (true) {
      var state = this_0.kotlinx$atomicfu$value;
      if (equals(state, get_REUSABLE_CLAIMED())) {
        if (this.is_1.atomicfu$compareAndSet(get_REUSABLE_CLAIMED(), cause))
          return true;
      } else {
        if (state instanceof Error)
          return true;
        else {
          if (this.is_1.atomicfu$compareAndSet(state, null))
            return false;
        }
      }
    }
  };
  protoOf(DispatchedContinuation).ft = function () {
    var state = this.gs_1;
    // Inline function 'kotlinx.coroutines.assert' call
    this.gs_1 = get_UNDEFINED();
    return state;
  };
  protoOf(DispatchedContinuation).dt = function () {
    return this;
  };
  protoOf(DispatchedContinuation).m9 = function (result) {
    var state = toState_0(result);
    if (this.es_1.nv(this.h9())) {
      this.gs_1 = state;
      this.ms_1 = 0;
      this.es_1.ov(this.h9(), this);
    } else {
      $l$block: {
        // Inline function 'kotlinx.coroutines.internal.executeUnconfined' call
        // Inline function 'kotlinx.coroutines.assert' call
        var eventLoop = ThreadLocalEventLoop_getInstance().hw();
        if (false && eventLoop.cw()) {
          break $l$block;
        }
        var tmp;
        if (eventLoop.bw()) {
          this.gs_1 = state;
          this.ms_1 = 0;
          eventLoop.aw(this);
          tmp = true;
        } else {
          // Inline function 'kotlinx.coroutines.runUnconfinedEventLoop' call
          eventLoop.dw(true);
          try {
            this.h9();
            // Inline function 'kotlinx.coroutines.withCoroutineContext' call
            this.hs_1;
            this.fs_1.m9(result);
            $l$loop: while (eventLoop.zv()) {
            }
          } catch ($p) {
            if ($p instanceof Error) {
              var e = $p;
              this.bu(e);
            } else {
              throw $p;
            }
          }
          finally {
            eventLoop.ew(true);
          }
          tmp = false;
        }
      }
    }
  };
  protoOf(DispatchedContinuation).toString = function () {
    return 'DispatchedContinuation[' + this.es_1.toString() + ', ' + toDebugString(this.fs_1) + ']';
  };
  function resumeCancellableWith(_this__u8e3s4, result) {
    _init_properties_DispatchedContinuation_kt__tnmqc0();
    var tmp;
    if (_this__u8e3s4 instanceof DispatchedContinuation) {
      // Inline function 'kotlinx.coroutines.internal.DispatchedContinuation.resumeCancellableWith' call
      var state = toState_0(result);
      if (_this__u8e3s4.es_1.nv(_this__u8e3s4.h9())) {
        _this__u8e3s4.gs_1 = state;
        _this__u8e3s4.ms_1 = 1;
        _this__u8e3s4.es_1.ov(_this__u8e3s4.h9(), _this__u8e3s4);
      } else {
        $l$block: {
          // Inline function 'kotlinx.coroutines.internal.executeUnconfined' call
          // Inline function 'kotlinx.coroutines.assert' call
          var eventLoop = ThreadLocalEventLoop_getInstance().hw();
          if (false && eventLoop.cw()) {
            break $l$block;
          }
          var tmp_0;
          if (eventLoop.bw()) {
            _this__u8e3s4.gs_1 = state;
            _this__u8e3s4.ms_1 = 1;
            eventLoop.aw(_this__u8e3s4);
            tmp_0 = true;
          } else {
            // Inline function 'kotlinx.coroutines.runUnconfinedEventLoop' call
            eventLoop.dw(true);
            try {
              var tmp$ret$4;
              $l$block_0: {
                // Inline function 'kotlinx.coroutines.internal.DispatchedContinuation.resumeCancelled' call
                var job = _this__u8e3s4.h9().o9(Key_instance_3);
                if (!(job == null) && !job.uo()) {
                  var cause = job.tp();
                  _this__u8e3s4.gt(state, cause);
                  // Inline function 'kotlin.coroutines.resumeWithException' call
                  // Inline function 'kotlin.Companion.failure' call
                  var tmp$ret$2 = _Result___init__impl__xyqfz8(createFailure(cause));
                  _this__u8e3s4.m9(tmp$ret$2);
                  tmp$ret$4 = true;
                  break $l$block_0;
                }
                tmp$ret$4 = false;
              }
              if (!tmp$ret$4) {
                // Inline function 'kotlinx.coroutines.internal.DispatchedContinuation.resumeUndispatchedWith' call
                _this__u8e3s4.fs_1;
                // Inline function 'kotlinx.coroutines.withContinuationContext' call
                _this__u8e3s4.hs_1;
                _this__u8e3s4.fs_1.m9(result);
              }
              $l$loop: while (eventLoop.zv()) {
              }
            } catch ($p) {
              if ($p instanceof Error) {
                var e = $p;
                _this__u8e3s4.bu(e);
              } else {
                throw $p;
              }
            }
            finally {
              eventLoop.ew(true);
            }
            tmp_0 = false;
          }
        }
      }
      tmp = Unit_instance;
    } else {
      _this__u8e3s4.m9(result);
      tmp = Unit_instance;
    }
    return tmp;
  }
  var properties_initialized_DispatchedContinuation_kt_2siadq;
  function _init_properties_DispatchedContinuation_kt__tnmqc0() {
    if (!properties_initialized_DispatchedContinuation_kt_2siadq) {
      properties_initialized_DispatchedContinuation_kt_2siadq = true;
      UNDEFINED = new Symbol('UNDEFINED');
      REUSABLE_CLAIMED = new Symbol('REUSABLE_CLAIMED');
    }
  }
  function DispatchedTask(resumeMode) {
    SchedulerTask.call(this);
    this.ms_1 = resumeMode;
  }
  protoOf(DispatchedTask).gt = function (takenState, cause) {
  };
  protoOf(DispatchedTask).ot = function (state) {
    return (state == null ? true : !(state == null)) ? state : THROW_CCE();
  };
  protoOf(DispatchedTask).yt = function (state) {
    var tmp151_safe_receiver = state instanceof CompletedExceptionally ? state : null;
    return tmp151_safe_receiver == null ? null : tmp151_safe_receiver.zo_1;
  };
  protoOf(DispatchedTask).au = function () {
    // Inline function 'kotlinx.coroutines.assert' call
    var fatalException = null;
    try {
      var tmp = this.dt();
      var delegate = tmp instanceof DispatchedContinuation ? tmp : THROW_CCE();
      var continuation = delegate.fs_1;
      // Inline function 'kotlinx.coroutines.withContinuationContext' call
      delegate.hs_1;
      var context = continuation.h9();
      var state = this.ft();
      var exception = this.yt(state);
      var job = exception == null && get_isCancellableMode(this.ms_1) ? context.o9(Key_instance_3) : null;
      if (!(job == null) && !job.uo()) {
        var cause = job.tp();
        this.gt(state, cause);
        // Inline function 'kotlinx.coroutines.resumeWithStackTrace' call
        // Inline function 'kotlin.Companion.failure' call
        var exception_0 = recoverStackTrace(cause, continuation);
        var tmp$ret$1 = _Result___init__impl__xyqfz8(createFailure(exception_0));
        continuation.m9(tmp$ret$1);
      } else {
        if (!(exception == null)) {
          // Inline function 'kotlin.coroutines.resumeWithException' call
          // Inline function 'kotlin.Companion.failure' call
          var tmp$ret$3 = _Result___init__impl__xyqfz8(createFailure(exception));
          continuation.m9(tmp$ret$3);
        } else {
          // Inline function 'kotlin.coroutines.resume' call
          // Inline function 'kotlin.Companion.success' call
          var value = this.ot(state);
          var tmp$ret$5 = _Result___init__impl__xyqfz8(value);
          continuation.m9(tmp$ret$5);
        }
      }
    } catch ($p) {
      if ($p instanceof Error) {
        var e = $p;
        fatalException = e;
      } else {
        throw $p;
      }
    }
    finally {
      var tmp152_safe_receiver = fatalException;
      if (tmp152_safe_receiver == null)
        null;
      else {
        // Inline function 'kotlin.let' call
        this.bu(tmp152_safe_receiver);
      }
    }
  };
  protoOf(DispatchedTask).bu = function (exception) {
    var reason = new CoroutinesInternalError('Fatal exception in coroutines machinery for ' + toString(this) + '. ' + "Please read KDoc to 'handleFatalException' method and report this incident to maintainers", exception);
    handleCoroutineException(this.dt().h9(), reason);
  };
  function get_isReusableMode(_this__u8e3s4) {
    return _this__u8e3s4 === 2;
  }
  function get_isCancellableMode(_this__u8e3s4) {
    return _this__u8e3s4 === 1 || _this__u8e3s4 === 2;
  }
  function dispatch(_this__u8e3s4, mode) {
    // Inline function 'kotlinx.coroutines.assert' call
    var delegate = _this__u8e3s4.dt();
    var undispatched = mode === 4;
    var tmp;
    var tmp_0;
    if (!undispatched) {
      tmp_0 = delegate instanceof DispatchedContinuation;
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      tmp = get_isCancellableMode(mode) === get_isCancellableMode(_this__u8e3s4.ms_1);
    } else {
      tmp = false;
    }
    if (tmp) {
      var dispatcher = delegate.es_1;
      var context = delegate.h9();
      if (dispatcher.nv(context)) {
        dispatcher.ov(context, _this__u8e3s4);
      } else {
        resumeUnconfined(_this__u8e3s4);
      }
    } else {
      resume(_this__u8e3s4, delegate, undispatched);
    }
  }
  function resumeUnconfined(_this__u8e3s4) {
    var eventLoop = ThreadLocalEventLoop_getInstance().hw();
    if (eventLoop.bw()) {
      eventLoop.aw(_this__u8e3s4);
    } else {
      // Inline function 'kotlinx.coroutines.runUnconfinedEventLoop' call
      eventLoop.dw(true);
      try {
        resume(_this__u8e3s4, _this__u8e3s4.dt(), true);
        $l$loop: while (eventLoop.zv()) {
        }
      } catch ($p) {
        if ($p instanceof Error) {
          var e = $p;
          _this__u8e3s4.bu(e);
        } else {
          throw $p;
        }
      }
      finally {
        eventLoop.ew(true);
      }
    }
  }
  function resume(_this__u8e3s4, delegate, undispatched) {
    var state = _this__u8e3s4.ft();
    var exception = _this__u8e3s4.yt(state);
    var tmp;
    if (!(exception == null)) {
      // Inline function 'kotlin.Companion.failure' call
      tmp = _Result___init__impl__xyqfz8(createFailure(exception));
    } else {
      // Inline function 'kotlin.Companion.success' call
      var value = _this__u8e3s4.ot(state);
      tmp = _Result___init__impl__xyqfz8(value);
    }
    var result = tmp;
    if (undispatched) {
      // Inline function 'kotlinx.coroutines.internal.DispatchedContinuation.resumeUndispatchedWith' call
      var this_0 = delegate instanceof DispatchedContinuation ? delegate : THROW_CCE();
      this_0.fs_1;
      // Inline function 'kotlinx.coroutines.withContinuationContext' call
      this_0.hs_1;
      this_0.fs_1.m9(result);
    } else {
      delegate.m9(result);
    }
  }
  function _InlineList___init__impl__z8n56(holder) {
    holder = holder === VOID ? null : holder;
    return holder;
  }
  function _get_holder__f6h5pd($this) {
    return $this;
  }
  function InlineList__plus_impl_nuetvo($this, element) {
    // Inline function 'kotlinx.coroutines.assert' call
    var tmp153_subject = _get_holder__f6h5pd($this);
    var tmp;
    if (tmp153_subject == null) {
      tmp = _InlineList___init__impl__z8n56(element);
    } else {
      if (tmp153_subject instanceof ArrayList) {
        var tmp_0 = _get_holder__f6h5pd($this);
        (tmp_0 instanceof ArrayList ? tmp_0 : THROW_CCE()).e(element);
        tmp = _InlineList___init__impl__z8n56(_get_holder__f6h5pd($this));
      } else {
        var list = ArrayList_init_$Create$(4);
        var tmp_1 = _get_holder__f6h5pd($this);
        list.e((tmp_1 == null ? true : !(tmp_1 == null)) ? tmp_1 : THROW_CCE());
        list.e(element);
        tmp = _InlineList___init__impl__z8n56(list);
      }
    }
    return tmp;
  }
  function access$_get_holder__kkflen($this) {
    return _get_holder__f6h5pd($this);
  }
  function callUndeliveredElement(_this__u8e3s4, element, context) {
    var tmp156_safe_receiver = callUndeliveredElementCatchingException(_this__u8e3s4, element, null);
    if (tmp156_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      handleCoroutineException(context, tmp156_safe_receiver);
    }
  }
  function UndeliveredElementException(message, cause) {
    RuntimeException_init_$Init$(message, cause, this);
    captureStack(this, UndeliveredElementException);
  }
  function callUndeliveredElementCatchingException(_this__u8e3s4, element, undeliveredElementException) {
    undeliveredElementException = undeliveredElementException === VOID ? null : undeliveredElementException;
    try {
      _this__u8e3s4(element);
    } catch ($p) {
      if ($p instanceof Error) {
        var ex = $p;
        if (!(undeliveredElementException == null) && !(undeliveredElementException.cause === ex)) {
          addSuppressed(undeliveredElementException, ex);
        } else {
          return new UndeliveredElementException('Exception in undelivered element handler for ' + toString_0(element), ex);
        }
      } else {
        throw $p;
      }
    }
    return undeliveredElementException;
  }
  function ContextScope(context) {
    this.k1b_1 = context;
  }
  protoOf(ContextScope).to = function () {
    return this.k1b_1;
  };
  protoOf(ContextScope).toString = function () {
    return 'CoroutineScope(coroutineContext=' + toString(this.k1b_1) + ')';
  };
  function ScopeCoroutine() {
  }
  function Symbol(symbol) {
    this.l1b_1 = symbol;
  }
  protoOf(Symbol).toString = function () {
    return '<' + this.l1b_1 + '>';
  };
  function systemProp(propertyName, defaultValue, minValue, maxValue) {
    minValue = minValue === VOID ? 1 : minValue;
    maxValue = maxValue === VOID ? 2147483647 : maxValue;
    return systemProp_0(propertyName, toLong(defaultValue), toLong(minValue), toLong(maxValue)).g1();
  }
  function systemProp_0(propertyName, defaultValue, minValue, maxValue) {
    minValue = minValue === VOID ? new Long(1, 0) : minValue;
    maxValue = maxValue === VOID ? new Long(-1, 2147483647) : maxValue;
    var tmp0_elvis_lhs = systemProp_1(propertyName);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return defaultValue;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var value = tmp;
    var tmp1_elvis_lhs = toLongOrNull(value);
    var tmp_0;
    if (tmp1_elvis_lhs == null) {
      var message = "System property '" + propertyName + "' has unrecognized value '" + value + "'";
      throw IllegalStateException_init_$Create$(toString(message));
    } else {
      tmp_0 = tmp1_elvis_lhs;
    }
    var parsed = tmp_0;
    if (!(minValue.b1(parsed) <= 0 ? parsed.b1(maxValue) <= 0 : false)) {
      // Inline function 'kotlin.error' call
      var message_0 = "System property '" + propertyName + "' should be in range " + minValue.toString() + '..' + maxValue.toString() + ", but is '" + parsed.toString() + "'";
      throw IllegalStateException_init_$Create$(toString(message_0));
    }
    return parsed;
  }
  function startCoroutineCancellable(_this__u8e3s4, fatalCompletion) {
    // Inline function 'kotlinx.coroutines.intrinsics.runSafely' call
    try {
      var tmp = intercepted(_this__u8e3s4);
      // Inline function 'kotlin.Companion.success' call
      var tmp$ret$0 = _Result___init__impl__xyqfz8(Unit_instance);
      resumeCancellableWith(tmp, tmp$ret$0);
    } catch ($p) {
      if ($p instanceof Error) {
        var e = $p;
        dispatcherFailure(fatalCompletion, e);
      } else {
        throw $p;
      }
    }
    return Unit_instance;
  }
  function startCoroutineCancellable_0(_this__u8e3s4, receiver, completion) {
    // Inline function 'kotlinx.coroutines.intrinsics.runSafely' call
    try {
      var tmp = intercepted(createCoroutineUnintercepted(_this__u8e3s4, receiver, completion));
      // Inline function 'kotlin.Companion.success' call
      var tmp$ret$0 = _Result___init__impl__xyqfz8(Unit_instance);
      resumeCancellableWith(tmp, tmp$ret$0);
    } catch ($p) {
      if ($p instanceof Error) {
        var e = $p;
        dispatcherFailure(completion, e);
      } else {
        throw $p;
      }
    }
    return Unit_instance;
  }
  function dispatcherFailure(completion, e) {
    // Inline function 'kotlin.Companion.failure' call
    var tmp$ret$0 = _Result___init__impl__xyqfz8(createFailure(e));
    completion.m9(tmp$ret$0);
    throw e;
  }
  function startCoroutineCancellable_1(_this__u8e3s4, completion) {
    // Inline function 'kotlinx.coroutines.intrinsics.runSafely' call
    try {
      var tmp = intercepted(createCoroutineUnintercepted_0(_this__u8e3s4, completion));
      // Inline function 'kotlin.Companion.success' call
      var tmp$ret$0 = _Result___init__impl__xyqfz8(Unit_instance);
      resumeCancellableWith(tmp, tmp$ret$0);
    } catch ($p) {
      if ($p instanceof Error) {
        var e = $p;
        dispatcherFailure(completion, e);
      } else {
        throw $p;
      }
    }
    return Unit_instance;
  }
  function startCoroutineUndispatched(_this__u8e3s4, receiver, completion) {
    // Inline function 'kotlinx.coroutines.internal.probeCoroutineCreated' call
    var actualCompletion = completion;
    var tmp;
    try {
      // Inline function 'kotlinx.coroutines.withCoroutineContext' call
      actualCompletion.h9();
      // Inline function 'kotlinx.coroutines.internal.probeCoroutineResumed' call
      // Inline function 'kotlin.coroutines.intrinsics.startCoroutineUninterceptedOrReturn' call
      tmp = startCoroutineUninterceptedOrReturnNonGeneratorVersion(_this__u8e3s4, receiver, actualCompletion);
    } catch ($p) {
      var tmp_0;
      if ($p instanceof Error) {
        var e = $p;
        // Inline function 'kotlin.coroutines.resumeWithException' call
        // Inline function 'kotlin.Companion.failure' call
        var tmp$ret$5 = _Result___init__impl__xyqfz8(createFailure(e));
        actualCompletion.m9(tmp$ret$5);
        return Unit_instance;
      } else {
        throw $p;
      }
    }
    var value = tmp;
    if (!(value === get_COROUTINE_SUSPENDED())) {
      // Inline function 'kotlin.coroutines.resume' call
      // Inline function 'kotlin.Companion.success' call
      var value_0 = (value == null ? true : !(value == null)) ? value : THROW_CCE();
      var tmp$ret$7 = _Result___init__impl__xyqfz8(value_0);
      actualCompletion.m9(tmp$ret$7);
    }
  }
  var DUMMY_PROCESS_RESULT_FUNCTION;
  function get_STATE_REG() {
    _init_properties_Select_kt__zhm2jg();
    return STATE_REG;
  }
  var STATE_REG;
  function get_STATE_COMPLETED() {
    _init_properties_Select_kt__zhm2jg();
    return STATE_COMPLETED;
  }
  var STATE_COMPLETED;
  function get_STATE_CANCELLED() {
    _init_properties_Select_kt__zhm2jg();
    return STATE_CANCELLED;
  }
  var STATE_CANCELLED;
  function get_NO_RESULT() {
    _init_properties_Select_kt__zhm2jg();
    return NO_RESULT;
  }
  var NO_RESULT;
  var PARAM_CLAUSE_0;
  function SelectInstance() {
  }
  function trySelectInternal($this, clauseObject, internalResult) {
    $l$loop: while (true) {
      var curState = $this.u12_1.kotlinx$atomicfu$value;
      if (isInterface(curState, CancellableContinuation)) {
        var tmp0_elvis_lhs = findClause($this, clauseObject);
        var tmp;
        if (tmp0_elvis_lhs == null) {
          continue $l$loop;
        } else {
          tmp = tmp0_elvis_lhs;
        }
        var clause = tmp;
        var onCancellation = clause.p1b($this, internalResult);
        if ($this.u12_1.atomicfu$compareAndSet(curState, clause)) {
          var cont = isInterface(curState, CancellableContinuation) ? curState : THROW_CCE();
          $this.w12_1 = internalResult;
          if (tryResume_0(cont, onCancellation))
            return 0;
          $this.w12_1 = get_NO_RESULT();
          return 2;
        }
      } else {
        var tmp_0;
        if (equals(curState, get_STATE_COMPLETED())) {
          tmp_0 = true;
        } else {
          tmp_0 = curState instanceof ClauseData;
        }
        if (tmp_0)
          return 3;
        else {
          if (equals(curState, get_STATE_CANCELLED()))
            return 2;
          else {
            if (equals(curState, get_STATE_REG())) {
              if ($this.u12_1.atomicfu$compareAndSet(curState, listOf_0(clauseObject)))
                return 1;
            } else {
              if (isInterface(curState, KtList)) {
                if ($this.u12_1.atomicfu$compareAndSet(curState, plus_0(curState, clauseObject)))
                  return 1;
              } else {
                // Inline function 'kotlin.error' call
                var message = 'Unexpected state: ' + toString(curState);
                throw IllegalStateException_init_$Create$(toString(message));
              }
            }
          }
        }
      }
    }
  }
  function findClause($this, clauseObject) {
    var tmp0_elvis_lhs = $this.v12_1;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return null;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var clauses = tmp;
    // Inline function 'kotlin.collections.find' call
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var _iterator__ex2g4s = clauses.j();
      while (_iterator__ex2g4s.k()) {
        var element = _iterator__ex2g4s.l();
        if (element.m1b_1 === clauseObject) {
          tmp$ret$1 = element;
          break $l$block;
        }
      }
      tmp$ret$1 = null;
    }
    var tmp1_elvis_lhs = tmp$ret$1;
    var tmp_0;
    if (tmp1_elvis_lhs == null) {
      var message = 'Clause with object ' + toString(clauseObject) + ' is not found';
      throw IllegalStateException_init_$Create$(toString(message));
    } else {
      tmp_0 = tmp1_elvis_lhs;
    }
    return tmp_0;
  }
  function ClauseData() {
  }
  protoOf(ClauseData).p1b = function (select, internalResult) {
    var tmp161_safe_receiver = this.o1b_1;
    return tmp161_safe_receiver == null ? null : tmp161_safe_receiver(select, this.n1b_1, internalResult);
  };
  function SelectImplementation() {
  }
  protoOf(SelectImplementation).x12 = function (clauseObject, result) {
    return TrySelectDetailedResult_0(trySelectInternal(this, clauseObject, result));
  };
  var TrySelectDetailedResult_SUCCESSFUL_instance;
  var TrySelectDetailedResult_REREGISTER_instance;
  var TrySelectDetailedResult_CANCELLED_instance;
  var TrySelectDetailedResult_ALREADY_SELECTED_instance;
  var TrySelectDetailedResult_entriesInitialized;
  function TrySelectDetailedResult_initEntries() {
    if (TrySelectDetailedResult_entriesInitialized)
      return Unit_instance;
    TrySelectDetailedResult_entriesInitialized = true;
    TrySelectDetailedResult_SUCCESSFUL_instance = new TrySelectDetailedResult('SUCCESSFUL', 0);
    TrySelectDetailedResult_REREGISTER_instance = new TrySelectDetailedResult('REREGISTER', 1);
    TrySelectDetailedResult_CANCELLED_instance = new TrySelectDetailedResult('CANCELLED', 2);
    TrySelectDetailedResult_ALREADY_SELECTED_instance = new TrySelectDetailedResult('ALREADY_SELECTED', 3);
  }
  function TrySelectDetailedResult(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function TrySelectDetailedResult_0(trySelectInternalResult) {
    _init_properties_Select_kt__zhm2jg();
    var tmp;
    switch (trySelectInternalResult) {
      case 0:
        tmp = TrySelectDetailedResult_SUCCESSFUL_getInstance();
        break;
      case 1:
        tmp = TrySelectDetailedResult_REREGISTER_getInstance();
        break;
      case 2:
        tmp = TrySelectDetailedResult_CANCELLED_getInstance();
        break;
      case 3:
        tmp = TrySelectDetailedResult_ALREADY_SELECTED_getInstance();
        break;
      default:
        var message = 'Unexpected internal result: ' + trySelectInternalResult;
        throw IllegalStateException_init_$Create$(toString(message));
    }
    return tmp;
  }
  function tryResume_0(_this__u8e3s4, onCancellation) {
    _init_properties_Select_kt__zhm2jg();
    var tmp0_elvis_lhs = _this__u8e3s4.pr(Unit_instance, null, onCancellation);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return false;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var token = tmp;
    _this__u8e3s4.qr(token);
    return true;
  }
  function DUMMY_PROCESS_RESULT_FUNCTION$lambda(_unused_var__etf5q3, _unused_var__etf5q3_0, _unused_var__etf5q3_1) {
    _init_properties_Select_kt__zhm2jg();
    return null;
  }
  function TrySelectDetailedResult_SUCCESSFUL_getInstance() {
    TrySelectDetailedResult_initEntries();
    return TrySelectDetailedResult_SUCCESSFUL_instance;
  }
  function TrySelectDetailedResult_REREGISTER_getInstance() {
    TrySelectDetailedResult_initEntries();
    return TrySelectDetailedResult_REREGISTER_instance;
  }
  function TrySelectDetailedResult_CANCELLED_getInstance() {
    TrySelectDetailedResult_initEntries();
    return TrySelectDetailedResult_CANCELLED_instance;
  }
  function TrySelectDetailedResult_ALREADY_SELECTED_getInstance() {
    TrySelectDetailedResult_initEntries();
    return TrySelectDetailedResult_ALREADY_SELECTED_instance;
  }
  var properties_initialized_Select_kt_7rpl36;
  function _init_properties_Select_kt__zhm2jg() {
    if (!properties_initialized_Select_kt_7rpl36) {
      properties_initialized_Select_kt_7rpl36 = true;
      DUMMY_PROCESS_RESULT_FUNCTION = DUMMY_PROCESS_RESULT_FUNCTION$lambda;
      STATE_REG = new Symbol('STATE_REG');
      STATE_COMPLETED = new Symbol('STATE_COMPLETED');
      STATE_CANCELLED = new Symbol('STATE_CANCELLED');
      NO_RESULT = new Symbol('NO_RESULT');
      PARAM_CLAUSE_0 = new Symbol('PARAM_CLAUSE_0');
    }
  }
  function createDefaultDispatcher() {
    var tmp;
    if (isJsdom()) {
      tmp = NodeDispatcher_getInstance();
    } else {
      var tmp_0;
      var tmp_1;
      if (!(typeof window === 'undefined')) {
        // Inline function 'kotlin.js.asDynamic' call
        tmp_1 = window != null;
      } else {
        tmp_1 = false;
      }
      if (tmp_1) {
        // Inline function 'kotlin.js.asDynamic' call
        tmp_0 = !(typeof window.addEventListener === 'undefined');
      } else {
        tmp_0 = false;
      }
      if (tmp_0) {
        tmp = asCoroutineDispatcher(window);
      } else {
        if (typeof process === 'undefined' || typeof process.nextTick === 'undefined') {
          tmp = SetTimeoutDispatcher_getInstance();
        } else {
          tmp = NodeDispatcher_getInstance();
        }
      }
    }
    return tmp;
  }
  function isJsdom() {
    return !(typeof navigator === 'undefined') && navigator != null && navigator.userAgent != null && !(typeof navigator.userAgent === 'undefined') && !(typeof navigator.userAgent.match === 'undefined') && navigator.userAgent.match('\\bjsdom\\b');
  }
  var counter;
  function get_DEBUG() {
    return DEBUG;
  }
  var DEBUG;
  function get_classSimpleName(_this__u8e3s4) {
    var tmp0_elvis_lhs = getKClassFromExpression(_this__u8e3s4).za();
    return tmp0_elvis_lhs == null ? 'Unknown' : tmp0_elvis_lhs;
  }
  function get_hexAddress(_this__u8e3s4) {
    // Inline function 'kotlin.js.asDynamic' call
    var result = _this__u8e3s4.__debug_counter;
    if (!(typeof result === 'number')) {
      counter = counter + 1 | 0;
      result = counter;
      // Inline function 'kotlin.js.asDynamic' call
      _this__u8e3s4.__debug_counter = result;
    }
    return ((!(result == null) ? typeof result === 'number' : false) ? result : THROW_CCE()).toString();
  }
  function NodeDispatcher() {
    NodeDispatcher_instance = this;
    SetTimeoutBasedDispatcher.call(this);
  }
  protoOf(NodeDispatcher).s1b = function () {
    process.nextTick(this.z1b_1.x1b_1);
  };
  var NodeDispatcher_instance;
  function NodeDispatcher_getInstance() {
    if (NodeDispatcher_instance == null)
      new NodeDispatcher();
    return NodeDispatcher_instance;
  }
  function ScheduledMessageQueue$processQueue$lambda(this$0) {
    return function () {
      this$0.d1c();
      return Unit_instance;
    };
  }
  function ScheduledMessageQueue(dispatcher) {
    MessageQueue.call(this);
    this.w1b_1 = dispatcher;
    var tmp = this;
    tmp.x1b_1 = ScheduledMessageQueue$processQueue$lambda(this);
  }
  protoOf(ScheduledMessageQueue).e1c = function () {
    this.w1b_1.s1b();
  };
  protoOf(ScheduledMessageQueue).f1c = function () {
    setTimeout(this.x1b_1, 0);
  };
  protoOf(ScheduledMessageQueue).g1c = function (timeout) {
    setTimeout(this.x1b_1, timeout);
  };
  function w3cSetTimeout(handler, timeout) {
    return setTimeout(handler, timeout);
  }
  function WindowMessageQueue$lambda(this$0) {
    return function (event) {
      var tmp;
      if (event.source == this$0.s1c_1 && event.data == this$0.t1c_1) {
        event.stopPropagation();
        this$0.d1c();
        tmp = Unit_instance;
      }
      return Unit_instance;
    };
  }
  function WindowMessageQueue$schedule$lambda(this$0) {
    return function (it) {
      this$0.d1c();
      return Unit_instance;
    };
  }
  function WindowMessageQueue(window_0) {
    MessageQueue.call(this);
    this.s1c_1 = window_0;
    this.t1c_1 = 'dispatchCoroutine';
    this.s1c_1.addEventListener('message', WindowMessageQueue$lambda(this), true);
  }
  protoOf(WindowMessageQueue).e1c = function () {
    var tmp = Promise.resolve(Unit_instance);
    tmp.then(WindowMessageQueue$schedule$lambda(this));
  };
  protoOf(WindowMessageQueue).f1c = function () {
    this.s1c_1.postMessage(this.t1c_1, '*');
  };
  function w3cSetTimeout_0(window_0, handler, timeout) {
    return setTimeout_0(window_0, handler, timeout);
  }
  function w3cClearTimeout(window_0, handle) {
    return window_0.clearTimeout(handle);
  }
  function w3cClearTimeout_0(handle) {
    return clearTimeout(handle);
  }
  function setTimeout_0(window_0, handler, timeout) {
    return window_0.setTimeout(handler, timeout);
  }
  function await_0(_this__u8e3s4, $completion) {
    var cancellable = new CancellableContinuationImpl(intercepted($completion), 1);
    cancellable.et();
    var tmp = await$lambda(cancellable);
    _this__u8e3s4.then(tmp, await$lambda_0(cancellable));
    return cancellable.mt();
  }
  function await$lambda($cont) {
    return function (it) {
      // Inline function 'kotlin.coroutines.resume' call
      var this_0 = $cont;
      // Inline function 'kotlin.Companion.success' call
      var tmp$ret$0 = _Result___init__impl__xyqfz8(it);
      this_0.m9(tmp$ret$0);
      return Unit_instance;
    };
  }
  function await$lambda_0($cont) {
    return function (it) {
      // Inline function 'kotlin.coroutines.resumeWithException' call
      var this_0 = $cont;
      // Inline function 'kotlin.Companion.failure' call
      var tmp$ret$0 = _Result___init__impl__xyqfz8(createFailure(it));
      this_0.m9(tmp$ret$0);
      return Unit_instance;
    };
  }
  function asCoroutineDispatcher(_this__u8e3s4) {
    // Inline function 'kotlin.js.asDynamic' call
    var tmp0_elvis_lhs = _this__u8e3s4.coroutineDispatcher;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      // Inline function 'kotlin.also' call
      var this_0 = new WindowDispatcher(_this__u8e3s4);
      // Inline function 'kotlin.js.asDynamic' call
      _this__u8e3s4.coroutineDispatcher = this_0;
      tmp = this_0;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function propagateExceptionFinalResort(exception) {
    console.error(exception.toString());
  }
  function createEventLoop() {
    return new UnconfinedEventLoop();
  }
  function UnconfinedEventLoop() {
    EventLoop.call(this);
  }
  protoOf(UnconfinedEventLoop).ov = function (context, block) {
    unsupported();
  };
  function unsupported() {
    throw UnsupportedOperationException_init_$Create$('runBlocking event loop is not supported');
  }
  function SetTimeoutDispatcher() {
    SetTimeoutDispatcher_instance = this;
    SetTimeoutBasedDispatcher.call(this);
  }
  protoOf(SetTimeoutDispatcher).s1b = function () {
    this.z1b_1.g1c(0);
  };
  var SetTimeoutDispatcher_instance;
  function SetTimeoutDispatcher_getInstance() {
    if (SetTimeoutDispatcher_instance == null)
      new SetTimeoutDispatcher();
    return SetTimeoutDispatcher_instance;
  }
  function SetTimeoutBasedDispatcher$scheduleResumeAfterDelay$lambda($continuation, this$0) {
    return function () {
      // Inline function 'kotlin.with' call
      $continuation.sr(this$0, Unit_instance);
      return Unit_instance;
    };
  }
  function SetTimeoutBasedDispatcher() {
    CoroutineDispatcher.call(this);
    this.z1b_1 = new ScheduledMessageQueue(this);
  }
  protoOf(SetTimeoutBasedDispatcher).ov = function (context, block) {
    this.z1b_1.o1c(block);
  };
  protoOf(SetTimeoutBasedDispatcher).uv = function (timeMillis, continuation) {
    var handle = w3cSetTimeout(SetTimeoutBasedDispatcher$scheduleResumeAfterDelay$lambda(continuation, this), delayToInt(timeMillis));
    invokeOnCancellation(continuation, new ClearTimeout(handle));
  };
  function MessageQueue() {
    this.a1c_1 = ArrayDeque_init_$Create$();
    this.b1c_1 = 16;
    this.c1c_1 = false;
  }
  protoOf(MessageQueue).h1c = function (element) {
    return this.a1c_1.e(element);
  };
  protoOf(MessageQueue).e = function (element) {
    return this.h1c((!(element == null) ? isInterface(element, Runnable) : false) ? element : THROW_CCE());
  };
  protoOf(MessageQueue).i1c = function (index, element) {
    this.a1c_1.f2(index, element);
  };
  protoOf(MessageQueue).f2 = function (index, element) {
    return this.i1c(index, (!(element == null) ? isInterface(element, Runnable) : false) ? element : THROW_CCE());
  };
  protoOf(MessageQueue).j1c = function (elements) {
    return this.a1c_1.n(elements);
  };
  protoOf(MessageQueue).n = function (elements) {
    return this.j1c(elements);
  };
  protoOf(MessageQueue).d2 = function () {
    this.a1c_1.d2();
  };
  protoOf(MessageQueue).q = function (index) {
    return this.a1c_1.q(index);
  };
  protoOf(MessageQueue).g2 = function (index) {
    return this.a1c_1.g2(index);
  };
  protoOf(MessageQueue).k1c = function (index, element) {
    return this.a1c_1.e2(index, element);
  };
  protoOf(MessageQueue).e2 = function (index, element) {
    return this.k1c(index, (!(element == null) ? isInterface(element, Runnable) : false) ? element : THROW_CCE());
  };
  protoOf(MessageQueue).b2 = function (fromIndex, toIndex) {
    return this.a1c_1.b2(fromIndex, toIndex);
  };
  protoOf(MessageQueue).l1c = function (element) {
    return this.a1c_1.r(element);
  };
  protoOf(MessageQueue).r = function (element) {
    if (!(!(element == null) ? isInterface(element, Runnable) : false))
      return false;
    return this.l1c((!(element == null) ? isInterface(element, Runnable) : false) ? element : THROW_CCE());
  };
  protoOf(MessageQueue).m1c = function (elements) {
    return this.a1c_1.a2(elements);
  };
  protoOf(MessageQueue).a2 = function (elements) {
    return this.m1c(elements);
  };
  protoOf(MessageQueue).o = function (index) {
    return this.a1c_1.o(index);
  };
  protoOf(MessageQueue).n1c = function (element) {
    return this.a1c_1.s(element);
  };
  protoOf(MessageQueue).s = function (element) {
    if (!(!(element == null) ? isInterface(element, Runnable) : false))
      return -1;
    return this.n1c((!(element == null) ? isInterface(element, Runnable) : false) ? element : THROW_CCE());
  };
  protoOf(MessageQueue).p = function () {
    return this.a1c_1.p();
  };
  protoOf(MessageQueue).j = function () {
    return this.a1c_1.j();
  };
  protoOf(MessageQueue).m = function () {
    return this.a1c_1.sf_1;
  };
  protoOf(MessageQueue).o1c = function (element) {
    this.h1c(element);
    if (!this.c1c_1) {
      this.c1c_1 = true;
      this.e1c();
    }
  };
  protoOf(MessageQueue).d1c = function () {
    try {
      // Inline function 'kotlin.repeat' call
      var times = this.b1c_1;
      var inductionVariable = 0;
      if (inductionVariable < times)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var tmp0_elvis_lhs = removeFirstOrNull(this);
          var tmp;
          if (tmp0_elvis_lhs == null) {
            return Unit_instance;
          } else {
            tmp = tmp0_elvis_lhs;
          }
          var element = tmp;
          element.au();
        }
         while (inductionVariable < times);
    }finally {
      if (this.p()) {
        this.c1c_1 = false;
      } else {
        this.f1c();
      }
    }
  };
  function WindowClearTimeout($outer, handle) {
    this.b1d_1 = $outer;
    ClearTimeout.call(this, handle);
  }
  protoOf(WindowClearTimeout).cs = function () {
    w3cClearTimeout(this.b1d_1.d1d_1, this.f1d_1);
  };
  function WindowDispatcher$scheduleResumeAfterDelay$lambda($continuation, this$0) {
    return function () {
      // Inline function 'kotlin.with' call
      $continuation.sr(this$0, Unit_instance);
      return Unit_instance;
    };
  }
  function WindowDispatcher(window_0) {
    CoroutineDispatcher.call(this);
    this.d1d_1 = window_0;
    this.e1d_1 = new WindowMessageQueue(this.d1d_1);
  }
  protoOf(WindowDispatcher).ov = function (context, block) {
    return this.e1d_1.o1c(block);
  };
  protoOf(WindowDispatcher).uv = function (timeMillis, continuation) {
    var handle = w3cSetTimeout_0(this.d1d_1, WindowDispatcher$scheduleResumeAfterDelay$lambda(continuation, this), delayToInt(timeMillis));
    invokeOnCancellation(continuation, new WindowClearTimeout(this, handle));
  };
  function delayToInt(timeMillis) {
    return coerceIn(timeMillis, new Long(0, 0), new Long(2147483647, 0)).g1();
  }
  function ClearTimeout(handle) {
    this.f1d_1 = handle;
  }
  protoOf(ClearTimeout).cs = function () {
    w3cClearTimeout_0(this.f1d_1);
  };
  protoOf(ClearTimeout).bs = function (cause) {
    this.cs();
  };
  protoOf(ClearTimeout).toString = function () {
    return 'ClearTimeout[' + this.f1d_1 + ']';
  };
  function toDebugString(_this__u8e3s4) {
    return toString(_this__u8e3s4);
  }
  function get_DefaultDelay() {
    var tmp = Dispatchers_getInstance().az_1;
    return isInterface(tmp, Delay) ? tmp : THROW_CCE();
  }
  function newCoroutineContext(_this__u8e3s4, context) {
    var combined = _this__u8e3s4.to().ci(context);
    return !(combined === Dispatchers_getInstance().az_1) && combined.o9(Key_instance) == null ? combined.ci(Dispatchers_getInstance().az_1) : combined;
  }
  function get_coroutineName(_this__u8e3s4) {
    return null;
  }
  function Dispatchers() {
    Dispatchers_instance = this;
    this.az_1 = createDefaultDispatcher();
    this.bz_1 = Unconfined_getInstance();
    this.cz_1 = new JsMainDispatcher(this.az_1, false);
    this.dz_1 = null;
  }
  protoOf(Dispatchers).ez = function () {
    var tmp0_elvis_lhs = this.dz_1;
    return tmp0_elvis_lhs == null ? this.cz_1 : tmp0_elvis_lhs;
  };
  var Dispatchers_instance;
  function Dispatchers_getInstance() {
    if (Dispatchers_instance == null)
      new Dispatchers();
    return Dispatchers_instance;
  }
  function JsMainDispatcher(delegate, invokeImmediately) {
    MainCoroutineDispatcher.call(this);
    this.h1d_1 = delegate;
    this.i1d_1 = invokeImmediately;
    this.j1d_1 = this.i1d_1 ? this : new JsMainDispatcher(this.h1d_1, true);
  }
  protoOf(JsMainDispatcher).yy = function () {
    return this.j1d_1;
  };
  protoOf(JsMainDispatcher).nv = function (context) {
    return !this.i1d_1;
  };
  protoOf(JsMainDispatcher).ov = function (context, block) {
    return this.h1d_1.ov(context, block);
  };
  protoOf(JsMainDispatcher).toString = function () {
    var tmp0_elvis_lhs = this.zy();
    return tmp0_elvis_lhs == null ? this.h1d_1.toString() : tmp0_elvis_lhs;
  };
  function JobCancellationException(message, cause, job) {
    CancellationException_init_$Init$(message, cause, this);
    captureStack(this, JobCancellationException);
    this.k1d_1 = job;
  }
  protoOf(JobCancellationException).toString = function () {
    return protoOf(CancellationException).toString.call(this) + '; job=' + toString(this.k1d_1);
  };
  protoOf(JobCancellationException).equals = function (other) {
    var tmp;
    if (other === this) {
      tmp = true;
    } else {
      var tmp_0;
      var tmp_1;
      var tmp_2;
      if (other instanceof JobCancellationException) {
        tmp_2 = other.message == this.message;
      } else {
        tmp_2 = false;
      }
      if (tmp_2) {
        tmp_1 = equals(other.k1d_1, this.k1d_1);
      } else {
        tmp_1 = false;
      }
      if (tmp_1) {
        tmp_0 = equals(other.cause, this.cause);
      } else {
        tmp_0 = false;
      }
      tmp = tmp_0;
    }
    return tmp;
  };
  protoOf(JobCancellationException).hashCode = function () {
    var tmp = imul(imul(getStringHashCode(ensureNotNull(this.message)), 31) + hashCode(this.k1d_1) | 0, 31);
    var tmp0_safe_receiver = this.cause;
    var tmp0_elvis_lhs = tmp0_safe_receiver == null ? null : hashCode(tmp0_safe_receiver);
    return tmp + (tmp0_elvis_lhs == null ? 0 : tmp0_elvis_lhs) | 0;
  };
  function CancellationException_0(message, cause) {
    return CancellationException_init_$Create$_0(message, cause);
  }
  function Runnable() {
  }
  function SchedulerTask() {
  }
  function SafeCollector$collectContextSize$lambda(count, _unused_var__etf5q3) {
    return count + 1 | 0;
  }
  function SafeCollector(collector, collectContext) {
    this.c15_1 = collector;
    this.d15_1 = collectContext;
    var tmp = this;
    tmp.e15_1 = this.d15_1.bi(0, SafeCollector$collectContextSize$lambda);
    this.f15_1 = null;
  }
  protoOf(SafeCollector).g15 = function (value, $completion) {
    // Inline function 'kotlinx.coroutines.currentCoroutineContext' call
    // Inline function 'kotlin.js.getCoroutineContext' call
    var currentContext = $completion.h9();
    ensureActive(currentContext);
    if (!(this.f15_1 === currentContext)) {
      checkContext(this, currentContext);
      this.f15_1 = currentContext;
    }
    return this.c15_1.g15(value, $completion);
  };
  protoOf(SafeCollector).l9 = function () {
  };
  function identitySet(expectedSize) {
    return HashSet_init_$Create$(expectedSize);
  }
  function get_platformExceptionHandlers_() {
    _init_properties_CoroutineExceptionHandlerImpl_kt__37d7wf();
    return platformExceptionHandlers_;
  }
  var platformExceptionHandlers_;
  function get_platformExceptionHandlers() {
    _init_properties_CoroutineExceptionHandlerImpl_kt__37d7wf();
    return get_platformExceptionHandlers_();
  }
  function DiagnosticCoroutineContextException(context) {
    RuntimeException_init_$Init$_0(toString(context), this);
    captureStack(this, DiagnosticCoroutineContextException);
  }
  var properties_initialized_CoroutineExceptionHandlerImpl_kt_qhrgvx;
  function _init_properties_CoroutineExceptionHandlerImpl_kt__37d7wf() {
    if (!properties_initialized_CoroutineExceptionHandlerImpl_kt_qhrgvx) {
      properties_initialized_CoroutineExceptionHandlerImpl_kt_qhrgvx = true;
      // Inline function 'kotlin.collections.mutableSetOf' call
      platformExceptionHandlers_ = LinkedHashSet_init_$Create$();
    }
  }
  function LockFreeLinkedListHead() {
    LockFreeLinkedListNode.call(this);
  }
  function LockFreeLinkedListNode() {
    this.qu_1 = this;
    this.ru_1 = this;
    this.su_1 = false;
  }
  protoOf(LockFreeLinkedListNode).tu = function (node, permissionsBitmask) {
    var prev = this.ru_1;
    var tmp;
    if (prev instanceof ListClosed) {
      tmp = ((prev.o1d_1 & permissionsBitmask) === 0 && prev.tu(node, permissionsBitmask));
    } else {
      node.qu_1 = this;
      node.ru_1 = prev;
      prev.qu_1 = node;
      this.ru_1 = node;
      tmp = true;
    }
    return tmp;
  };
  protoOf(LockFreeLinkedListNode).qw = function (forbiddenElementsBit) {
    this.tu(new ListClosed(forbiddenElementsBit), forbiddenElementsBit);
  };
  protoOf(LockFreeLinkedListNode).uu = function () {
    if (this.su_1)
      return false;
    var prev = this.ru_1;
    var next = this.qu_1;
    prev.qu_1 = next;
    next.ru_1 = prev;
    this.su_1 = true;
    return true;
  };
  protoOf(LockFreeLinkedListNode).vu = function (node) {
    if (!(this.qu_1 === this))
      return false;
    this.tu(node, -2147483648);
    return true;
  };
  function ListClosed(forbiddenElementsBitmask) {
    LockFreeLinkedListNode.call(this);
    this.o1d_1 = forbiddenElementsBitmask;
  }
  function unwrap(exception) {
    return exception;
  }
  function recoverStackTrace(exception, continuation) {
    return exception;
  }
  function recoverStackTrace_0(exception) {
    return exception;
  }
  function SynchronizedObject() {
  }
  function systemProp_1(propertyName) {
    return null;
  }
  function threadContextElements(context) {
    return 0;
  }
  function CommonThreadLocal() {
    this.iw_1 = null;
  }
  protoOf(CommonThreadLocal).jw = function () {
    var tmp = this.iw_1;
    return (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
  };
  protoOf(CommonThreadLocal).kw = function (value) {
    this.iw_1 = value;
  };
  function commonThreadLocal(name) {
    return new CommonThreadLocal();
  }
  //region block: post-declaration
  protoOf(JobSupport).yp = invokeOnCompletion$default;
  protoOf(JobSupport).dq = cancel$default;
  protoOf(JobSupport).ci = plus;
  protoOf(JobSupport).o9 = get_0;
  protoOf(JobSupport).bi = fold;
  protoOf(JobSupport).ai = minusKey_0;
  protoOf(CoroutineDispatcher).o9 = get;
  protoOf(CoroutineDispatcher).ai = minusKey;
  protoOf(BufferedChannel).o13 = close$default;
  protoOf(BufferedChannel).q13 = cancel$default_0;
  //endregion
  //region block: init
  Active_instance = new Active();
  Key_instance_1 = new Key_0();
  Key_instance_2 = new Key_1();
  GlobalScope_instance = new GlobalScope();
  Key_instance_3 = new Key_2();
  NonDisposableHandle_instance = new NonDisposableHandle();
  Key_instance_4 = new Key_3();
  NopCollector_instance = new NopCollector();
  counter = 0;
  DEBUG = false;
  //endregion
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = emitAll;
  _.$_$.b = toList;
  _.$_$.c = await_0;
  _.$_$.d = delay;
  _.$_$.e = Key_instance_1;
  _.$_$.f = Dispatchers_getInstance;
  _.$_$.g = GlobalScope_instance;
  _.$_$.h = Key_instance_3;
  _.$_$.i = Channel;
  _.$_$.j = cancelConsumed;
  _.$_$.k = FlowCollector;
  _.$_$.l = MutableSharedFlow;
  _.$_$.m = asSharedFlow;
  _.$_$.n = flow;
  _.$_$.o = launchIn;
  _.$_$.p = onEach;
  _.$_$.q = recoverStackTrace;
  _.$_$.r = startCoroutineCancellable_1;
  _.$_$.s = CancellableContinuationImpl;
  _.$_$.t = CancellationException_0;
  _.$_$.u = CompletableDeferred;
  _.$_$.v = CompletableJob;
  _.$_$.w = CopyableThrowable;
  _.$_$.x = CoroutineName;
  _.$_$.y = CoroutineScope_0;
  _.$_$.z = CoroutineScope;
  _.$_$.a1 = Job_0;
  _.$_$.b1 = SupervisorJob;
  _.$_$.c1 = async;
  _.$_$.d1 = cancel_0;
  _.$_$.e1 = cancel_2;
  _.$_$.f1 = cancel;
  _.$_$.g1 = cancel_1;
  _.$_$.h1 = get_isActive_0;
  _.$_$.i1 = get_isActive;
  _.$_$.j1 = get_job;
  _.$_$.k1 = launch;
  //endregion
  return _;
}));

//# sourceMappingURL=kotlinx-coroutines-core.js.map
