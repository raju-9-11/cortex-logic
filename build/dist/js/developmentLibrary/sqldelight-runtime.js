(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'));
  else {
    if (typeof globalThis['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'sqldelight-runtime'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'sqldelight-runtime'.");
    }
    globalThis['sqldelight-runtime'] = factory(typeof globalThis['sqldelight-runtime'] === 'undefined' ? {} : globalThis['sqldelight-runtime'], globalThis['kotlin-kotlin-stdlib']);
  }
}(function (_, kotlin_kotlin) {
  'use strict';
  //region block: imports
  var protoOf = kotlin_kotlin.$_$.fe;
  var initMetadataForInterface = kotlin_kotlin.$_$.fd;
  var initMetadataForClass = kotlin_kotlin.$_$.bd;
  var VOID = kotlin_kotlin.$_$.i;
  var ArrayList_init_$Create$ = kotlin_kotlin.$_$.u;
  var toString = kotlin_kotlin.$_$.je;
  var IllegalStateException_init_$Create$ = kotlin_kotlin.$_$.i2;
  var Unit_getInstance = kotlin_kotlin.$_$.f6;
  var NullPointerException_init_$Create$ = kotlin_kotlin.$_$.o2;
  var LinkedHashSet_init_$Create$ = kotlin_kotlin.$_$.f1;
  var copyToArray = kotlin_kotlin.$_$.e8;
  var toString_0 = kotlin_kotlin.$_$.rk;
  var newThrowable = kotlin_kotlin.$_$.yd;
  var THROW_CCE = kotlin_kotlin.$_$.nj;
  var StringBuilder_init_$Create$ = kotlin_kotlin.$_$.n1;
  var _Char___init__impl__6a9atx = kotlin_kotlin.$_$.n3;
  var isInterface = kotlin_kotlin.$_$.qd;
  var extendThrowable = kotlin_kotlin.$_$.vc;
  var captureStack = kotlin_kotlin.$_$.mc;
  var hashCode = kotlin_kotlin.$_$.ad;
  var equals = kotlin_kotlin.$_$.uc;
  var initMetadataForCompanion = kotlin_kotlin.$_$.cd;
  var Long = kotlin_kotlin.$_$.ij;
  //endregion
  //region block: pre-declaration
  initMetadataForInterface(Listener, 'Listener');
  initMetadataForClass(ExecutableQuery, 'ExecutableQuery');
  initMetadataForClass(Query, 'Query', VOID, ExecutableQuery);
  initMetadataForClass(SimpleQuery, 'SimpleQuery', VOID, Query);
  initMetadataForClass(BaseTransacterImpl, 'BaseTransacterImpl');
  initMetadataForInterface(TransacterBase, 'TransacterBase');
  function transactionWithResult$default(noEnclosing, bodyWithReturn, $super) {
    noEnclosing = noEnclosing === VOID ? false : noEnclosing;
    return $super === VOID ? this.transactionWithResult_wv3ekp_k$(noEnclosing, bodyWithReturn) : $super.transactionWithResult_wv3ekp_k$.call(this, noEnclosing, bodyWithReturn);
  }
  function transaction$default(noEnclosing, body, $super) {
    noEnclosing = noEnclosing === VOID ? false : noEnclosing;
    var tmp;
    if ($super === VOID) {
      this.transaction_6996no_k$(noEnclosing, body);
      tmp = Unit_getInstance();
    } else {
      tmp = $super.transaction_6996no_k$.call(this, noEnclosing, body);
    }
    return tmp;
  }
  initMetadataForInterface(Transacter, 'Transacter', VOID, VOID, [TransacterBase]);
  initMetadataForClass(TransacterImpl, 'TransacterImpl', VOID, BaseTransacterImpl, [BaseTransacterImpl, Transacter]);
  initMetadataForInterface(TransactionCallbacks, 'TransactionCallbacks');
  initMetadataForClass(Transaction, 'Transaction', VOID, VOID, [TransactionCallbacks]);
  initMetadataForInterface(TransactionWithoutReturn, 'TransactionWithoutReturn', VOID, VOID, [TransactionCallbacks]);
  initMetadataForInterface(TransactionWithReturn, 'TransactionWithReturn', VOID, VOID, [TransactionCallbacks]);
  initMetadataForClass(TransactionWrapper, 'TransactionWrapper', VOID, VOID, [TransactionWithoutReturn, TransactionWithReturn]);
  initMetadataForClass(RollbackException, 'RollbackException', RollbackException, Error);
  function get_value() {
    throw IllegalStateException_init_$Create$('The driver used with SQLDelight is asynchronous, so SQLDelight should be configured for\nasynchronous usage:\n\nsqldelight {\n  databases {\n    MyDatabase {\n      generateAsync = true\n    }\n  }\n}');
  }
  initMetadataForInterface(QueryResult, 'QueryResult', VOID, VOID, VOID, [0]);
  initMetadataForClass(Value, 'Value', VOID, VOID, [QueryResult], [0]);
  initMetadataForClass(AsyncValue, 'AsyncValue', VOID, VOID, [QueryResult], [0]);
  initMetadataForCompanion(Companion);
  initMetadataForInterface(SqlCursor, 'SqlCursor');
  initMetadataForInterface(Closeable, 'Closeable');
  function executeQuery$default(identifier, sql, mapper, parameters, binders, $super) {
    binders = binders === VOID ? null : binders;
    return $super === VOID ? this.executeQuery_vhq7yt_k$(identifier, sql, mapper, parameters, binders) : $super.executeQuery_vhq7yt_k$.call(this, identifier, sql, mapper, parameters, binders);
  }
  function execute$default(identifier, sql, parameters, binders, $super) {
    binders = binders === VOID ? null : binders;
    return $super === VOID ? this.execute_umnm3_k$(identifier, sql, parameters, binders) : $super.execute_umnm3_k$.call(this, identifier, sql, parameters, binders);
  }
  initMetadataForInterface(SqlDriver, 'SqlDriver', VOID, VOID, [Closeable]);
  initMetadataForInterface(SqlPreparedStatement, 'SqlPreparedStatement');
  initMetadataForInterface(SqlSchema, 'SqlSchema');
  initMetadataForClass(AfterVersion, 'AfterVersion');
  //endregion
  function Listener() {
  }
  function Query(mapper) {
    ExecutableQuery.call(this, mapper);
  }
  function Query_0(identifier, queryKeys, driver, fileName, label, query, mapper) {
    return new SimpleQuery(identifier, queryKeys, driver, fileName, label, query, mapper);
  }
  function ExecutableQuery$executeAsList$lambda(this$0) {
    return function (cursor) {
      // Inline function 'kotlin.collections.mutableListOf' call
      var result = ArrayList_init_$Create$();
      while (cursor.next_20eer_k$().get_value_j01efc_k$()) {
        result.add_utx5q5_k$(this$0.mapper_1(cursor));
      }
      return new Value(_Value___init__impl__qy06ko(result));
    };
  }
  function ExecutableQuery$executeAsOneOrNull$lambda(this$0) {
    return function (cursor) {
      var tmp;
      if (!cursor.next_20eer_k$().get_value_j01efc_k$()) {
        return new Value(_Value___init__impl__qy06ko(null));
      }
      var value = this$0.mapper_1(cursor);
      // Inline function 'kotlin.check' call
      if (!!cursor.next_20eer_k$().get_value_j01efc_k$()) {
        var message = 'ResultSet returned more than 1 row for ' + toString(this$0);
        throw IllegalStateException_init_$Create$(toString(message));
      }
      return new Value(_Value___init__impl__qy06ko(value));
    };
  }
  function ExecutableQuery(mapper) {
    this.mapper_1 = mapper;
  }
  protoOf(ExecutableQuery).get_mapper_giyu6i_k$ = function () {
    return this.mapper_1;
  };
  protoOf(ExecutableQuery).executeAsList_5v14g5_k$ = function () {
    return this.execute_5yxup_k$(ExecutableQuery$executeAsList$lambda(this)).get_value_j01efc_k$();
  };
  protoOf(ExecutableQuery).executeAsOne_mq2d9d_k$ = function () {
    var tmp0_elvis_lhs = this.executeAsOneOrNull_e1g5vb_k$();
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throw NullPointerException_init_$Create$('ResultSet returned null for ' + toString(this));
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  };
  protoOf(ExecutableQuery).executeAsOneOrNull_e1g5vb_k$ = function () {
    return this.execute_5yxup_k$(ExecutableQuery$executeAsOneOrNull$lambda(this)).get_value_j01efc_k$();
  };
  function _get_identifier__8kgyke($this) {
    return $this.identifier_1;
  }
  function _get_queryKeys__opzdor($this) {
    return $this.queryKeys_1;
  }
  function _get_driver__1h59gd($this) {
    return $this.driver_1;
  }
  function _get_fileName__2gvtdw($this) {
    return $this.fileName_1;
  }
  function _get_label__euqgmb($this) {
    return $this.label_1;
  }
  function _get_query__c6g9vb($this) {
    return $this.query_1;
  }
  function SimpleQuery(identifier, queryKeys, driver, fileName, label, query, mapper) {
    Query.call(this, mapper);
    this.identifier_1 = identifier;
    this.queryKeys_1 = queryKeys;
    this.driver_1 = driver;
    this.fileName_1 = fileName;
    this.label_1 = label;
    this.query_1 = query;
  }
  protoOf(SimpleQuery).execute_5yxup_k$ = function (mapper) {
    return this.driver_1.executeQuery_vhq7yt_k$(this.identifier_1, this.query_1, mapper, 0, null);
  };
  protoOf(SimpleQuery).toString = function () {
    return this.fileName_1 + ':' + this.label_1;
  };
  protoOf(SimpleQuery).addListener_yk2ppn_k$ = function (listener) {
    this.driver_1.addListener_tkch91_k$(this.queryKeys_1.slice(), listener);
  };
  protoOf(SimpleQuery).removeListener_xnzt3c_k$ = function (listener) {
    this.driver_1.removeListener_kazay0_k$(this.queryKeys_1.slice(), listener);
  };
  function transactionWithWrapper($this, noEnclosing, wrapperBody) {
    var transaction = $this.driver_1.newTransaction_rarwf6_k$().get_value_j01efc_k$();
    var enclosing = transaction.enclosingTransaction_gcxzku_k$();
    // Inline function 'kotlin.check' call
    if (!(enclosing == null || !noEnclosing)) {
      var message = 'Already in a transaction';
      throw IllegalStateException_init_$Create$(toString(message));
    }
    var thrownException = null;
    var returnValue = null;
    try {
      transaction.transacter_1 = $this;
      returnValue = wrapperBody(new TransactionWrapper(transaction));
      transaction.successful_1 = true;
    } catch ($p) {
      if ($p instanceof Error) {
        var e = $p;
        thrownException = e;
      } else {
        throw $p;
      }
    }
    finally {
      transaction.endTransaction_njuw25_k$();
      return $this.postTransactionCleanup_52hlcr_k$(transaction, enclosing, thrownException, returnValue);
    }
  }
  function TransacterImpl(driver) {
    BaseTransacterImpl.call(this, driver);
  }
  protoOf(TransacterImpl).transaction_6996no_k$ = function (noEnclosing, body) {
    transactionWithWrapper(this, noEnclosing, body);
  };
  protoOf(TransacterImpl).transactionWithResult_wv3ekp_k$ = function (noEnclosing, bodyWithReturn) {
    return transactionWithWrapper(this, noEnclosing, bodyWithReturn);
  };
  function _get_ownerThreadId__9pu407($this) {
    return $this.ownerThreadId_1;
  }
  function Transaction() {
    this.ownerThreadId_1 = currentThreadId();
    var tmp = this;
    // Inline function 'kotlin.collections.mutableListOf' call
    tmp.postCommitHooks_1 = ArrayList_init_$Create$();
    var tmp_0 = this;
    // Inline function 'kotlin.collections.mutableListOf' call
    tmp_0.postRollbackHooks_1 = ArrayList_init_$Create$();
    var tmp_1 = this;
    // Inline function 'kotlin.collections.mutableSetOf' call
    tmp_1.registeredQueries_1 = LinkedHashSet_init_$Create$();
    var tmp_2 = this;
    // Inline function 'kotlin.collections.mutableSetOf' call
    tmp_2.pendingTables_1 = LinkedHashSet_init_$Create$();
    this.successful_1 = false;
    this.childrenSuccessful_1 = true;
    this.transacter_1 = null;
  }
  protoOf(Transaction).get_postCommitHooks_iklu8w_k$ = function () {
    return this.postCommitHooks_1;
  };
  protoOf(Transaction).get_postRollbackHooks_18e19v_k$ = function () {
    return this.postRollbackHooks_1;
  };
  protoOf(Transaction).get_registeredQueries_mfpde3_k$ = function () {
    return this.registeredQueries_1;
  };
  protoOf(Transaction).get_pendingTables_ww0gm5_k$ = function () {
    return this.pendingTables_1;
  };
  protoOf(Transaction).set_successful_n2jnlo_k$ = function (_set____db54di) {
    this.successful_1 = _set____db54di;
  };
  protoOf(Transaction).get_successful_xj8zhp_k$ = function () {
    return this.successful_1;
  };
  protoOf(Transaction).set_childrenSuccessful_b3a2at_k$ = function (_set____db54di) {
    this.childrenSuccessful_1 = _set____db54di;
  };
  protoOf(Transaction).get_childrenSuccessful_phgfyq_k$ = function () {
    return this.childrenSuccessful_1;
  };
  protoOf(Transaction).set_transacter_klms07_k$ = function (_set____db54di) {
    this.transacter_1 = _set____db54di;
  };
  protoOf(Transaction).get_transacter_et5qs0_k$ = function () {
    return this.transacter_1;
  };
  protoOf(Transaction).enclosingTransaction_gcxzku_k$ = function () {
    return this.get_enclosingTransaction_qzs6u3_k$();
  };
  protoOf(Transaction).endTransaction_njuw25_k$ = function () {
    this.checkThreadConfinement_5u0qjs_k$();
    return this.endTransaction_ejesci_k$(this.successful_1 && this.childrenSuccessful_1);
  };
  protoOf(Transaction).afterCommit_2evbqz_k$ = function (function_0) {
    this.checkThreadConfinement_5u0qjs_k$();
    this.postCommitHooks_1.add_utx5q5_k$(function_0);
  };
  protoOf(Transaction).afterRollback_6dje7s_k$ = function (function_0) {
    this.checkThreadConfinement_5u0qjs_k$();
    this.postRollbackHooks_1.add_utx5q5_k$(function_0);
  };
  protoOf(Transaction).checkThreadConfinement_5u0qjs_k$ = function () {
    // Inline function 'kotlin.check' call
    if (!this.ownerThreadId_1.equals(currentThreadId())) {
      var message = 'Transaction objects (`TransactionWithReturn` and `TransactionWithoutReturn`) must be used\nonly within the transaction lambda scope.';
      throw IllegalStateException_init_$Create$(toString(message));
    }
    return Unit_getInstance();
  };
  function Transacter() {
  }
  function BaseTransacterImpl$notifyQueries$lambda($transaction) {
    return function (it) {
      $transaction.pendingTables_1.add_utx5q5_k$(it);
      return Unit_getInstance();
    };
  }
  function BaseTransacterImpl$notifyQueries$lambda_0($tableKeys) {
    return function (it) {
      $tableKeys.add_utx5q5_k$(it);
      return Unit_getInstance();
    };
  }
  function BaseTransacterImpl(driver) {
    this.driver_1 = driver;
  }
  protoOf(BaseTransacterImpl).get_driver_cise9d_k$ = function () {
    return this.driver_1;
  };
  protoOf(BaseTransacterImpl).postTransactionCleanup_52hlcr_k$ = function (transaction, enclosing, thrownException, returnValue) {
    if (enclosing == null) {
      if (!transaction.successful_1 || !transaction.childrenSuccessful_1) {
        try {
          // Inline function 'kotlin.collections.forEach' call
          var _iterator__ex2g4s = transaction.postRollbackHooks_1.iterator_jk1svi_k$();
          while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
            var element = _iterator__ex2g4s.next_20eer_k$();
            element();
          }
        } catch ($p) {
          if ($p instanceof Error) {
            var rollbackException = $p;
            if (thrownException == null)
              null;
            else {
              // Inline function 'kotlin.let' call
              throw newThrowable('Exception while rolling back from an exception.\nOriginal exception: ' + toString_0(thrownException) + '\nwith cause ' + toString_0(thrownException.cause) + '\n\nRollback exception: ' + rollbackException.toString(), rollbackException);
            }
            throw rollbackException;
          } else {
            throw $p;
          }
        }
        transaction.postRollbackHooks_1.clear_j9egeb_k$();
      } else {
        // Inline function 'kotlin.collections.isNotEmpty' call
        if (!transaction.pendingTables_1.isEmpty_y1axqb_k$()) {
          // Inline function 'kotlin.collections.toTypedArray' call
          var this_0 = transaction.pendingTables_1;
          var tmp$ret$4 = copyToArray(this_0);
          this.driver_1.notifyListeners_1mddie_k$(tmp$ret$4.slice());
        }
        transaction.pendingTables_1.clear_j9egeb_k$();
        transaction.registeredQueries_1.clear_j9egeb_k$();
        // Inline function 'kotlin.collections.forEach' call
        var _iterator__ex2g4s_0 = transaction.postCommitHooks_1.iterator_jk1svi_k$();
        while (_iterator__ex2g4s_0.hasNext_bitz1p_k$()) {
          var element_0 = _iterator__ex2g4s_0.next_20eer_k$();
          element_0();
        }
        transaction.postCommitHooks_1.clear_j9egeb_k$();
      }
    } else {
      enclosing.childrenSuccessful_1 = (transaction.successful_1 && transaction.childrenSuccessful_1);
      enclosing.postCommitHooks_1.addAll_4lagoh_k$(transaction.postCommitHooks_1);
      enclosing.postRollbackHooks_1.addAll_4lagoh_k$(transaction.postRollbackHooks_1);
      enclosing.registeredQueries_1.addAll_4lagoh_k$(transaction.registeredQueries_1);
      enclosing.pendingTables_1.addAll_4lagoh_k$(transaction.pendingTables_1);
    }
    var tmp;
    if (enclosing == null) {
      tmp = thrownException instanceof RollbackException;
    } else {
      tmp = false;
    }
    if (tmp) {
      var tmp_0 = thrownException.value_1;
      return (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
    } else {
      if (!(thrownException == null)) {
        throw thrownException;
      } else {
        return (returnValue == null ? true : !(returnValue == null)) ? returnValue : THROW_CCE();
      }
    }
  };
  protoOf(BaseTransacterImpl).notifyQueries_ylabtp_k$ = function (identifier, tableProvider) {
    var transaction = this.driver_1.currentTransaction_mhmgth_k$();
    if (!(transaction == null)) {
      if (transaction.registeredQueries_1.add_utx5q5_k$(identifier)) {
        tableProvider(BaseTransacterImpl$notifyQueries$lambda(transaction));
      }
    } else {
      // Inline function 'kotlin.collections.mutableSetOf' call
      var tableKeys = LinkedHashSet_init_$Create$();
      tableProvider(BaseTransacterImpl$notifyQueries$lambda_0(tableKeys));
      // Inline function 'kotlin.collections.toTypedArray' call
      var tmp$ret$1 = copyToArray(tableKeys);
      this.driver_1.notifyListeners_1mddie_k$(tmp$ret$1.slice());
    }
  };
  protoOf(BaseTransacterImpl).createArguments_mzg8f6_k$ = function (count) {
    if (count === 0)
      return '()';
    // Inline function 'kotlin.text.buildString' call
    var capacity = count + 2 | 0;
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$(capacity);
    this_0.append_22ad7x_k$('(?');
    // Inline function 'kotlin.repeat' call
    var times = count - 1 | 0;
    var inductionVariable = 0;
    if (inductionVariable < times)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        this_0.append_22ad7x_k$(',?');
      }
       while (inductionVariable < times);
    this_0.append_am5a4z_k$(_Char___init__impl__6a9atx(41));
    return this_0.toString();
  };
  function TransactionWithoutReturn() {
  }
  function TransactionWithReturn() {
  }
  function TransactionWrapper(transaction) {
    this.transaction_1 = transaction;
  }
  protoOf(TransactionWrapper).get_transaction_lq2gzv_k$ = function () {
    return this.transaction_1;
  };
  protoOf(TransactionWrapper).rollback_4amot8_k$ = function () {
    this.transaction_1.checkThreadConfinement_5u0qjs_k$();
    throw new RollbackException();
  };
  protoOf(TransactionWrapper).rollback_p7dljn_k$ = function (returnValue) {
    this.transaction_1.checkThreadConfinement_5u0qjs_k$();
    throw new RollbackException(returnValue);
  };
  protoOf(TransactionWrapper).afterCommit_2evbqz_k$ = function (function_0) {
    this.transaction_1.afterCommit_2evbqz_k$(function_0);
  };
  protoOf(TransactionWrapper).afterRollback_6dje7s_k$ = function (function_0) {
    this.transaction_1.afterRollback_6dje7s_k$(function_0);
  };
  protoOf(TransactionWrapper).transaction_lg5ag3_k$ = function (body) {
    var tmp = this.transaction_1.transacter_1;
    ((!(tmp == null) ? isInterface(tmp, Transacter) : false) ? tmp : THROW_CCE()).transaction_6996no_k$(false, body);
  };
  protoOf(TransactionWrapper).transaction_89zl2n_k$ = function (body) {
    var tmp = this.transaction_1.transacter_1;
    return ((!(tmp == null) ? isInterface(tmp, Transacter) : false) ? tmp : THROW_CCE()).transactionWithResult_wv3ekp_k$(false, body);
  };
  function TransacterBase() {
  }
  function RollbackException(value) {
    value = value === VOID ? null : value;
    extendThrowable(this);
    captureStack(this, RollbackException);
    this.value_1 = value;
  }
  protoOf(RollbackException).get_value_j01efc_k$ = function () {
    return this.value_1;
  };
  function TransactionCallbacks() {
  }
  function _Value___init__impl__qy06ko(value) {
    return value;
  }
  function _Value___get_value__impl__eescu4($this) {
    return $this;
  }
  function Value__await_impl_guv754($this, $completion) {
    return _Value___get_value__impl__eescu4($this);
  }
  function Value__toString_impl_99l7rk($this) {
    return 'Value(value=' + toString_0($this) + ')';
  }
  function Value__hashCode_impl_chkp1b($this) {
    return $this == null ? 0 : hashCode($this);
  }
  function Value__equals_impl_6swhr1($this, other) {
    if (!(other instanceof Value))
      return false;
    var tmp0_other_with_cast = other instanceof Value ? other.value_1 : THROW_CCE();
    if (!equals($this, tmp0_other_with_cast))
      return false;
    return true;
  }
  function _AsyncValue___init__impl__ea5r6c(getter) {
    return getter;
  }
  function _get_getter__ygn3c0($this) {
    return $this;
  }
  function AsyncValue__await_impl_5ecyd0($this, $completion) {
    return _get_getter__ygn3c0($this)($completion);
  }
  function AsyncValue__toString_impl_pesl5g($this) {
    return 'AsyncValue(getter=' + toString($this) + ')';
  }
  function AsyncValue__hashCode_impl_nv5k0t($this) {
    return hashCode($this);
  }
  function AsyncValue__equals_impl_r60awp($this, other) {
    if (!(other instanceof AsyncValue))
      return false;
    var tmp0_other_with_cast = other instanceof AsyncValue ? other.getter_1 : THROW_CCE();
    if (!equals($this, tmp0_other_with_cast))
      return false;
    return true;
  }
  function Value(value) {
    this.value_1 = value;
  }
  protoOf(Value).get_value_j01efc_k$ = function () {
    return _Value___get_value__impl__eescu4(this.value_1);
  };
  protoOf(Value).await_4rdzbx_k$ = function ($completion) {
    return Value__await_impl_guv754(this.value_1, $completion);
  };
  protoOf(Value).toString = function () {
    return Value__toString_impl_99l7rk(this.value_1);
  };
  protoOf(Value).hashCode = function () {
    return Value__hashCode_impl_chkp1b(this.value_1);
  };
  protoOf(Value).equals = function (other) {
    return Value__equals_impl_6swhr1(this.value_1, other);
  };
  function AsyncValue(getter) {
    this.getter_1 = getter;
  }
  protoOf(AsyncValue).await_4rdzbx_k$ = function ($completion) {
    return AsyncValue__await_impl_5ecyd0(this.getter_1, $completion);
  };
  protoOf(AsyncValue).toString = function () {
    return AsyncValue__toString_impl_pesl5g(this.getter_1);
  };
  protoOf(AsyncValue).hashCode = function () {
    return AsyncValue__hashCode_impl_nv5k0t(this.getter_1);
  };
  protoOf(AsyncValue).equals = function (other) {
    return AsyncValue__equals_impl_r60awp(this.getter_1, other);
  };
  function Companion() {
    Companion_instance = this;
    this.Unit_1 = _Value___init__impl__qy06ko(Unit_getInstance());
  }
  protoOf(Companion).get_Unit_9bvdlq_k$ = function () {
    return this.Unit_1;
  };
  var Companion_instance;
  function Companion_getInstance() {
    if (Companion_instance == null)
      new Companion();
    return Companion_instance;
  }
  function QueryResult() {
  }
  function SqlCursor() {
  }
  function SqlDriver() {
  }
  function SqlPreparedStatement() {
  }
  function SqlSchema() {
  }
  function AfterVersion(afterVersion, block) {
    this.afterVersion_1 = afterVersion;
    this.block_1 = block;
  }
  protoOf(AfterVersion).get_afterVersion_foqisl_k$ = function () {
    return this.afterVersion_1;
  };
  protoOf(AfterVersion).get_block_ip8l7o_k$ = function () {
    return this.block_1;
  };
  function Closeable() {
  }
  function currentThreadId() {
    return new Long(0, 0);
  }
  //region block: post-declaration
  protoOf(TransacterImpl).transaction$default_3e9j37_k$ = transaction$default;
  protoOf(TransacterImpl).transactionWithResult$default_46m102_k$ = transactionWithResult$default;
  protoOf(AsyncValue).get_value_j01efc_k$ = get_value;
  //endregion
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = Value;
  _.$_$.b = SqlSchema;
  _.$_$.c = Query_0;
  _.$_$.d = Query;
  _.$_$.e = TransacterImpl;
  _.$_$.f = Transacter;
  _.$_$.g = Companion_getInstance;
  //endregion
  return _;
}));

//# sourceMappingURL=sqldelight-runtime.js.map
