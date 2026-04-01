(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'));
  else {
    if (typeof globalThis['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'kotlin-kotlin-test'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'kotlin-kotlin-test'.");
    }
    globalThis['kotlin-kotlin-test'] = factory(typeof globalThis['kotlin-kotlin-test'] === 'undefined' ? {} : globalThis['kotlin-kotlin-test'], globalThis['kotlin-kotlin-stdlib']);
  }
}(function (_, kotlin_kotlin) {
  'use strict';
  //region block: imports
  var toString = kotlin_kotlin.$_$.pk;
  var protoOf = kotlin_kotlin.$_$.be;
  var equals = kotlin_kotlin.$_$.qc;
  var initMetadataForInterface = kotlin_kotlin.$_$.bd;
  var VOID = kotlin_kotlin.$_$.h;
  var ensureNotNull = kotlin_kotlin.$_$.bk;
  var toBits = kotlin_kotlin.$_$.ok;
  var toString_0 = kotlin_kotlin.$_$.fe;
  var IllegalArgumentException_init_$Create$ = kotlin_kotlin.$_$.d2;
  var Unit_getInstance = kotlin_kotlin.$_$.f6;
  var isNaN_0 = kotlin_kotlin.$_$.fk;
  var THROW_CCE = kotlin_kotlin.$_$.jj;
  var Annotation = kotlin_kotlin.$_$.qi;
  var initMetadataForClass = kotlin_kotlin.$_$.xc;
  var AssertionError_init_$Create$ = kotlin_kotlin.$_$.q1;
  var defineProp = kotlin_kotlin.$_$.pc;
  var initMetadataForObject = kotlin_kotlin.$_$.dd;
  var to = kotlin_kotlin.$_$.qk;
  var mapOf = kotlin_kotlin.$_$.j9;
  //endregion
  //region block: pre-declaration
  function assertTrue(lazyMessage, actual) {
    if (!actual) {
      this.fail_o3vfxl_k$(lazyMessage());
    }
  }
  function assertTrue_0(message, actual) {
    this.assertTrue_rpw5fg_k$(Asserter$assertTrue$lambda(message), actual);
  }
  function assertEquals(message, expected, actual) {
    this.assertTrue_rpw5fg_k$(Asserter$assertEquals$lambda(message, expected, actual), equals(actual, expected));
  }
  function assertNotEquals(message, illegal, actual) {
    this.assertTrue_rpw5fg_k$(Asserter$assertNotEquals$lambda(message, actual), !equals(actual, illegal));
  }
  function assertSame(message, expected, actual) {
    this.assertTrue_rpw5fg_k$(Asserter$assertSame$lambda(message, expected, actual), actual === expected);
  }
  function assertNotSame(message, illegal, actual) {
    this.assertTrue_rpw5fg_k$(Asserter$assertNotSame$lambda(message, actual), !(actual === illegal));
  }
  function assertNull(message, actual) {
    this.assertTrue_rpw5fg_k$(Asserter$assertNull$lambda(message, actual), actual == null);
  }
  function assertNotNull(message, actual) {
    this.assertTrue_rpw5fg_k$(Asserter$assertNotNull$lambda(message), !(actual == null));
  }
  initMetadataForInterface(Asserter, 'Asserter');
  initMetadataForClass(BeforeTest, 'BeforeTest', VOID, VOID, [Annotation]);
  initMetadataForClass(AfterTest, 'AfterTest', VOID, VOID, [Annotation]);
  initMetadataForClass(Test, 'Test', VOID, VOID, [Annotation]);
  initMetadataForClass(DefaultJsAsserter$invokeHook$1);
  initMetadataForObject(DefaultJsAsserter, 'DefaultJsAsserter', VOID, VOID, [Asserter]);
  initMetadataForClass(BareAdapter, 'BareAdapter', BareAdapter);
  initMetadataForClass(JasmineLikeAdapter, 'JasmineLikeAdapter', JasmineLikeAdapter);
  initMetadataForClass(QUnitAdapter, 'QUnitAdapter', QUnitAdapter);
  //endregion
  function set__asserter(_set____db54di) {
    _asserter = _set____db54di;
  }
  function get__asserter() {
    return _asserter;
  }
  var _asserter;
  function Asserter$assertTrue$lambda($message) {
    return function () {
      return $message;
    };
  }
  function Asserter$assertEquals$lambda($message, $expected, $actual) {
    return function () {
      return messagePrefix($message) + ('Expected <' + toString($expected) + '>, actual <' + toString($actual) + '>.');
    };
  }
  function Asserter$assertNotEquals$lambda($message, $actual) {
    return function () {
      return messagePrefix($message) + ('Illegal value: <' + toString($actual) + '>.');
    };
  }
  function Asserter$assertSame$lambda($message, $expected, $actual) {
    return function () {
      return messagePrefix($message) + ('Expected <' + toString($expected) + '>, actual <' + toString($actual) + '> is not same.');
    };
  }
  function Asserter$assertNotSame$lambda($message, $actual) {
    return function () {
      return messagePrefix($message) + ('Expected not same as <' + toString($actual) + '>.');
    };
  }
  function Asserter$assertNull$lambda($message, $actual) {
    return function () {
      return messagePrefix($message) + ('Expected value to be null, but was: <' + toString($actual) + '>.');
    };
  }
  function Asserter$assertNotNull$lambda($message) {
    return function () {
      return messagePrefix($message) + 'Expected value to be not null.';
    };
  }
  function Asserter() {
  }
  function assertTrue_1(actual, message) {
    message = message === VOID ? null : message;
    var tmp = get_asserter();
    return tmp.assertTrue_dqb114_k$(message == null ? 'Expected value to be true.' : message, actual);
  }
  function get_asserter() {
    var tmp0_elvis_lhs = _asserter;
    return tmp0_elvis_lhs == null ? lookupAsserter() : tmp0_elvis_lhs;
  }
  function assertEquals_0(expected, actual, message) {
    message = message === VOID ? null : message;
    get_asserter().assertEquals_ldumo_k$(message, expected, actual);
  }
  function assertTrue_2(message, block) {
    message = message === VOID ? null : message;
    assertTrue_1(block(), message);
  }
  function assertNotNull_0(actual, message) {
    message = message === VOID ? null : message;
    get_asserter().assertNotNull_i3opa6_k$(message, actual);
    return ensureNotNull(actual);
  }
  function assertFalse(actual, message) {
    message = message === VOID ? null : message;
    var tmp = get_asserter();
    return tmp.assertTrue_dqb114_k$(message == null ? 'Expected value to be false.' : message, !actual);
  }
  function assertEquals_1(expected, actual, absoluteTolerance, message) {
    message = message === VOID ? null : message;
    checkFloatsAreEqual(expected, actual, absoluteTolerance, message);
  }
  function messagePrefix(message) {
    return message == null ? '' : '' + message + '. ';
  }
  function checkFloatsAreEqual(expected, actual, absoluteTolerance, message, shouldFail) {
    shouldFail = shouldFail === VOID ? false : shouldFail;
    checkAbsoluteTolerance(absoluteTolerance);
    var tmp;
    if (toBits(expected) === toBits(actual)) {
      tmp = true;
    } else {
      // Inline function 'kotlin.math.abs' call
      var x = expected - actual;
      tmp = Math.abs(x) <= absoluteTolerance;
    }
    var equal = tmp;
    var tmp_0 = get_asserter();
    tmp_0.assertTrue_rpw5fg_k$(checkFloatsAreEqual$lambda(message, expected, absoluteTolerance, actual), !(equal === shouldFail));
  }
  function checkAbsoluteTolerance(absoluteTolerance) {
    // Inline function 'kotlin.require' call
    if (!(absoluteTolerance >= 0.0)) {
      var message = 'Illegal negative absolute tolerance <' + absoluteTolerance + '>.';
      throw IllegalArgumentException_init_$Create$(toString_0(message));
    }
    // Inline function 'kotlin.require' call
    if (!!isNaN_0(absoluteTolerance)) {
      var message_0 = 'Illegal NaN absolute tolerance <' + absoluteTolerance + '>.';
      throw IllegalArgumentException_init_$Create$(toString_0(message_0));
    }
  }
  function checkFloatsAreEqual$lambda($message, $expected, $absoluteTolerance, $actual) {
    return function () {
      return messagePrefix($message) + ('Expected <' + $expected + '> with absolute tolerance <' + $absoluteTolerance + '>, actual <' + $actual + '>.');
    };
  }
  function BeforeTest() {
  }
  protoOf(BeforeTest).equals = function (other) {
    if (!(other instanceof BeforeTest))
      return false;
    other instanceof BeforeTest || THROW_CCE();
    return true;
  };
  protoOf(BeforeTest).hashCode = function () {
    return 0;
  };
  protoOf(BeforeTest).toString = function () {
    return '@kotlin.test.BeforeTest(' + ')';
  };
  function AfterTest() {
  }
  protoOf(AfterTest).equals = function (other) {
    if (!(other instanceof AfterTest))
      return false;
    other instanceof AfterTest || THROW_CCE();
    return true;
  };
  protoOf(AfterTest).hashCode = function () {
    return 0;
  };
  protoOf(AfterTest).toString = function () {
    return '@kotlin.test.AfterTest(' + ')';
  };
  function Test() {
  }
  protoOf(Test).equals = function (other) {
    if (!(other instanceof Test))
      return false;
    other instanceof Test || THROW_CCE();
    return true;
  };
  protoOf(Test).hashCode = function () {
    return 0;
  };
  protoOf(Test).toString = function () {
    return '@kotlin.test.Test(' + ')';
  };
  function set_assertHook(_set____db54di) {
    _init_properties_DefaultJsAsserter_kt__dbqvm3();
    assertHook = _set____db54di;
  }
  function get_assertHook() {
    _init_properties_DefaultJsAsserter_kt__dbqvm3();
    return assertHook;
  }
  var assertHook;
  function _set_e__db55a8($this, _set____db54di) {
    $this.e_1 = _set____db54di;
  }
  function _get_e__7mlojw($this) {
    return $this.e_1;
  }
  function _set_a__db556s($this, _set____db54di) {
    $this.a_1 = _set____db54di;
  }
  function _get_a__7mlogg($this) {
    return $this.a_1;
  }
  function failWithMessage($this, lazyMessage, cause) {
    var message = lazyMessage();
    invokeHook($this, false, DefaultJsAsserter$failWithMessage$lambda(message));
    // Inline function 'kotlin.test.AssertionErrorWithCause' call
    throw AssertionError_init_$Create$(message, cause);
  }
  function invokeHook($this, result, lazyMessage) {
    try {
      var tmp = get_assertHook();
      tmp(new DefaultJsAsserter$invokeHook$1(result, lazyMessage));
    }finally {
      $this.e_1 = undefined;
      $this.a_1 = undefined;
    }
  }
  function DefaultJsAsserter$assertTrue$lambda($message) {
    return function () {
      return $message;
    };
  }
  function DefaultJsAsserter$assertTrue$lambda_0($message) {
    return function () {
      return $message;
    };
  }
  function DefaultJsAsserter$fail$lambda($message) {
    return function () {
      return $message;
    };
  }
  function DefaultJsAsserter$failWithMessage$lambda($message) {
    return function () {
      return $message;
    };
  }
  function DefaultJsAsserter$invokeHook$1($result, $lazyMessage) {
    this.result_1 = $result;
    this.expected_1 = DefaultJsAsserter_getInstance().e_1;
    this.actual_1 = DefaultJsAsserter_getInstance().a_1;
    this.lazyMessage_1 = $lazyMessage;
  }
  protoOf(DefaultJsAsserter$invokeHook$1).get_result_iyg5d2_k$ = function () {
    return this.result_1;
  };
  protoOf(DefaultJsAsserter$invokeHook$1).get_expected_77p56p_k$ = function () {
    return this.expected_1;
  };
  protoOf(DefaultJsAsserter$invokeHook$1).get_actual_avlm6v_k$ = function () {
    return this.actual_1;
  };
  protoOf(DefaultJsAsserter$invokeHook$1).get_lazyMessage_4a501i_k$ = function () {
    return this.lazyMessage_1;
  };
  function DefaultJsAsserter() {
    DefaultJsAsserter_instance = this;
    this.e_1 = undefined;
    this.a_1 = undefined;
  }
  protoOf(DefaultJsAsserter).assertEquals_ldumo_k$ = function (message, expected, actual) {
    this.e_1 = expected;
    this.a_1 = actual;
    assertEquals.call(this, message, expected, actual);
  };
  protoOf(DefaultJsAsserter).assertNotEquals_xv90xj_k$ = function (message, illegal, actual) {
    this.e_1 = illegal;
    this.a_1 = actual;
    assertNotEquals.call(this, message, illegal, actual);
  };
  protoOf(DefaultJsAsserter).assertSame_c5zpxl_k$ = function (message, expected, actual) {
    this.e_1 = expected;
    this.a_1 = actual;
    assertSame.call(this, message, expected, actual);
  };
  protoOf(DefaultJsAsserter).assertNotSame_yy9ia_k$ = function (message, illegal, actual) {
    this.e_1 = illegal;
    this.a_1 = actual;
    assertNotSame.call(this, message, illegal, actual);
  };
  protoOf(DefaultJsAsserter).assertNull_8hzwuv_k$ = function (message, actual) {
    this.a_1 = actual;
    assertNull.call(this, message, actual);
  };
  protoOf(DefaultJsAsserter).assertNotNull_i3opa6_k$ = function (message, actual) {
    this.a_1 = actual;
    assertNotNull.call(this, message, actual);
  };
  protoOf(DefaultJsAsserter).assertTrue_rpw5fg_k$ = function (lazyMessage, actual) {
    if (!actual) {
      // Inline function 'kotlin.test.DefaultJsAsserter.failWithMessage' call
      var message = lazyMessage();
      invokeHook(this, false, DefaultJsAsserter$assertTrue$lambda(message));
      // Inline function 'kotlin.test.AssertionErrorWithCause' call
      throw AssertionError_init_$Create$(message, null);
    } else {
      invokeHook(this, true, lazyMessage);
    }
  };
  protoOf(DefaultJsAsserter).assertTrue_dqb114_k$ = function (message, actual) {
    this.assertTrue_rpw5fg_k$(DefaultJsAsserter$assertTrue$lambda_0(message), actual);
  };
  protoOf(DefaultJsAsserter).fail_o3vfxl_k$ = function (message) {
    this.fail_zdvzi9_k$(message, null);
  };
  protoOf(DefaultJsAsserter).fail_zdvzi9_k$ = function (message, cause) {
    // Inline function 'kotlin.test.DefaultJsAsserter.failWithMessage' call
    var message_0 = message;
    invokeHook(this, false, DefaultJsAsserter$fail$lambda(message_0));
    // Inline function 'kotlin.test.AssertionErrorWithCause' call
    throw AssertionError_init_$Create$(message_0, cause);
  };
  var DefaultJsAsserter_instance;
  function DefaultJsAsserter_getInstance() {
    if (DefaultJsAsserter_instance == null)
      new DefaultJsAsserter();
    return DefaultJsAsserter_instance;
  }
  function assertHook$lambda(_unused_var__etf5q3) {
    _init_properties_DefaultJsAsserter_kt__dbqvm3();
    return Unit_getInstance();
  }
  var properties_initialized_DefaultJsAsserter_kt_jkw377;
  function _init_properties_DefaultJsAsserter_kt__dbqvm3() {
    if (!properties_initialized_DefaultJsAsserter_kt_jkw377) {
      properties_initialized_DefaultJsAsserter_kt_jkw377 = true;
      assertHook = assertHook$lambda;
    }
  }
  function lookupAsserter() {
    return DefaultJsAsserter_getInstance();
  }
  function AssertionErrorWithCause(message, cause) {
    return AssertionError_init_$Create$(message, cause);
  }
  function set_currentAdapter(_set____db54di) {
    _init_properties_TestApi_kt__c5696e();
    currentAdapter = _set____db54di;
  }
  function get_currentAdapter() {
    _init_properties_TestApi_kt__c5696e();
    return currentAdapter;
  }
  var currentAdapter;
  function get_NAME_TO_ADAPTER() {
    _init_properties_TestApi_kt__c5696e();
    return NAME_TO_ADAPTER;
  }
  var NAME_TO_ADAPTER;
  function detectAdapter() {
    _init_properties_TestApi_kt__c5696e();
    var frameworkAdapter = isQUnit() ? new QUnitAdapter() : isJasmine() ? new JasmineLikeAdapter() : new BareAdapter();
    var tmp;
    if (!(typeof kotlinTest === 'undefined')) {
      var adapterTransform = kotlinTest.adapterTransformer;
      var tmp_0;
      if (!(adapterTransform === null)) {
        tmp_0 = adapterTransform(frameworkAdapter);
      } else {
        tmp_0 = frameworkAdapter;
      }
      tmp = tmp_0;
    } else {
      tmp = frameworkAdapter;
    }
    return tmp;
  }
  function suite(name, ignored, suiteFn) {
    _init_properties_TestApi_kt__c5696e();
    adapter().suite(name, ignored, suiteFn);
  }
  function adapter() {
    _init_properties_TestApi_kt__c5696e();
    var tmp0_elvis_lhs = get_currentAdapter();
    var result = tmp0_elvis_lhs == null ? detectAdapter() : tmp0_elvis_lhs;
    set_currentAdapter(result);
    return result;
  }
  function test(name, ignored, testFn) {
    _init_properties_TestApi_kt__c5696e();
    adapter().test(name, ignored, testFn);
  }
  function QUnitAdapter$_init_$ref_3ho991() {
    var l = function () {
      return new QUnitAdapter();
    };
    l.callableName = '<init>';
    return l;
  }
  function JasmineLikeAdapter$_init_$ref_hb6pdw() {
    var l = function () {
      return new JasmineLikeAdapter();
    };
    l.callableName = '<init>';
    return l;
  }
  function JasmineLikeAdapter$_init_$ref_hb6pdw_0() {
    var l = function () {
      return new JasmineLikeAdapter();
    };
    l.callableName = '<init>';
    return l;
  }
  function JasmineLikeAdapter$_init_$ref_hb6pdw_1() {
    var l = function () {
      return new JasmineLikeAdapter();
    };
    l.callableName = '<init>';
    return l;
  }
  function detectAdapter$ref() {
    var l = function () {
      return detectAdapter();
    };
    l.callableName = 'detectAdapter';
    return l;
  }
  var properties_initialized_TestApi_kt_44md0o;
  function _init_properties_TestApi_kt__c5696e() {
    if (!properties_initialized_TestApi_kt_44md0o) {
      properties_initialized_TestApi_kt_44md0o = true;
      currentAdapter = null;
      var tmp = to('qunit', QUnitAdapter$_init_$ref_3ho991());
      var tmp_0 = to('jasmine', JasmineLikeAdapter$_init_$ref_hb6pdw());
      var tmp_1 = to('mocha', JasmineLikeAdapter$_init_$ref_hb6pdw_0());
      var tmp_2 = to('jest', JasmineLikeAdapter$_init_$ref_hb6pdw_1());
      NAME_TO_ADAPTER = mapOf([tmp, tmp_0, tmp_1, tmp_2, to('auto', detectAdapter$ref())]);
    }
  }
  function BareAdapter() {
  }
  protoOf(BareAdapter).suite_crp1m3_k$ = function (name, ignored, suiteFn) {
    if (!ignored) {
      suiteFn();
    }
  };
  protoOf(BareAdapter).suite = function (name, ignored, suiteFn) {
    return this.suite_crp1m3_k$(name, ignored, suiteFn);
  };
  protoOf(BareAdapter).test_sdoelz_k$ = function (name, ignored, testFn) {
    if (!ignored) {
      testFn();
    }
  };
  protoOf(BareAdapter).test = function (name, ignored, testFn) {
    return this.test_sdoelz_k$(name, ignored, testFn);
  };
  function isQUnit() {
    return typeof QUnit !== 'undefined';
  }
  function isJasmine() {
    return typeof describe === 'function' && typeof it === 'function';
  }
  function JasmineLikeAdapter() {
  }
  protoOf(JasmineLikeAdapter).suite_crp1m3_k$ = function (name, ignored, suiteFn) {
    if (ignored) {
      xdescribe(name, suiteFn);
    } else {
      describe(name, suiteFn);
    }
  };
  protoOf(JasmineLikeAdapter).suite = function (name, ignored, suiteFn) {
    return this.suite_crp1m3_k$(name, ignored, suiteFn);
  };
  protoOf(JasmineLikeAdapter).test_sdoelz_k$ = function (name, ignored, testFn) {
    if (ignored) {
      xit(name, testFn);
    } else {
      it(name, testFn);
    }
  };
  protoOf(JasmineLikeAdapter).test = function (name, ignored, testFn) {
    return this.test_sdoelz_k$(name, ignored, testFn);
  };
  function wrapTest($this, testFn) {
    return QUnitAdapter$wrapTest$lambda(testFn);
  }
  function QUnitAdapter$wrapTest$lambda$lambda($assertionsHappened, $assert) {
    return function (testResult) {
      $assertionsHappened._v = true;
      $assert.ok(testResult.result, testResult.lazyMessage());
      return Unit_getInstance();
    };
  }
  function QUnitAdapter$wrapTest$lambda($testFn) {
    return function (assert) {
      var assertionsHappened = {_v: false};
      set_assertHook(QUnitAdapter$wrapTest$lambda$lambda(assertionsHappened, assert));
      var possiblePromise = $testFn();
      var tmp;
      if (!assertionsHappened._v) {
        assertTrue_1(true, 'A test with no assertions is considered successful');
        tmp = Unit_getInstance();
      }
      return possiblePromise;
    };
  }
  function QUnitAdapter() {
    this.ignoredSuite_1 = false;
  }
  protoOf(QUnitAdapter).set_ignoredSuite_2oo8xe_k$ = function (_set____db54di) {
    this.ignoredSuite_1 = _set____db54di;
  };
  protoOf(QUnitAdapter).get_ignoredSuite_dvl2mn_k$ = function () {
    return this.ignoredSuite_1;
  };
  protoOf(QUnitAdapter).suite_crp1m3_k$ = function (name, ignored, suiteFn) {
    var prevIgnore = this.ignoredSuite_1;
    this.ignoredSuite_1 = !!(this.ignoredSuite_1 | ignored);
    QUnit.module(name, suiteFn);
    this.ignoredSuite_1 = prevIgnore;
  };
  protoOf(QUnitAdapter).suite = function (name, ignored, suiteFn) {
    return this.suite_crp1m3_k$(name, ignored, suiteFn);
  };
  protoOf(QUnitAdapter).test_sdoelz_k$ = function (name, ignored, testFn) {
    if (!!(ignored | this.ignoredSuite_1)) {
      QUnit.skip(name, wrapTest(this, testFn));
    } else {
      QUnit.test(name, wrapTest(this, testFn));
    }
  };
  protoOf(QUnitAdapter).test = function (name, ignored, testFn) {
    return this.test_sdoelz_k$(name, ignored, testFn);
  };
  //region block: post-declaration
  defineProp(protoOf(DefaultJsAsserter$invokeHook$1), 'result', function () {
    return this.get_result_iyg5d2_k$();
  });
  defineProp(protoOf(DefaultJsAsserter$invokeHook$1), 'expected', function () {
    return this.get_expected_77p56p_k$();
  });
  defineProp(protoOf(DefaultJsAsserter$invokeHook$1), 'actual', function () {
    return this.get_actual_avlm6v_k$();
  });
  defineProp(protoOf(DefaultJsAsserter$invokeHook$1), 'lazyMessage', function () {
    return this.get_lazyMessage_4a501i_k$();
  });
  //endregion
  //region block: init
  _asserter = null;
  //endregion
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = assertEquals_1;
  _.$_$.b = assertEquals_0;
  _.$_$.c = assertFalse;
  _.$_$.d = assertNotNull_0;
  _.$_$.e = assertTrue_1;
  _.$_$.f = suite;
  _.$_$.g = test;
  //endregion
  return _;
}));

//# sourceMappingURL=kotlin-kotlin-test.js.map
