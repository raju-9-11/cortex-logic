(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'));
  else {
    if (typeof globalThis['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'Stately-stately-concurrent-collections'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'Stately-stately-concurrent-collections'.");
    }
    globalThis['Stately-stately-concurrent-collections'] = factory(typeof globalThis['Stately-stately-concurrent-collections'] === 'undefined' ? {} : globalThis['Stately-stately-concurrent-collections'], globalThis['kotlin-kotlin-stdlib']);
  }
}(function (_, kotlin_kotlin) {
  'use strict';
  //region block: imports
  var Unit_getInstance = kotlin_kotlin.$_$.f6;
  var VOID = kotlin_kotlin.$_$.h;
  var protoOf = kotlin_kotlin.$_$.be;
  var MutableCollection = kotlin_kotlin.$_$.t6;
  var initMetadataForClass = kotlin_kotlin.$_$.xc;
  var ensureNotNull = kotlin_kotlin.$_$.bk;
  var MutableIterator = kotlin_kotlin.$_$.u6;
  var LinkedHashMap_init_$Create$ = kotlin_kotlin.$_$.c1;
  var objectCreate = kotlin_kotlin.$_$.ae;
  var asJsMapView = kotlin_kotlin.$_$.x6;
  var asJsReadonlyMapView = kotlin_kotlin.$_$.r6;
  var KtMutableMap = kotlin_kotlin.$_$.y6;
  var LinkedHashSet_init_$Create$ = kotlin_kotlin.$_$.e1;
  var asJsSetView = kotlin_kotlin.$_$.z6;
  var asJsReadonlySetView = kotlin_kotlin.$_$.b7;
  var KtMutableSet = kotlin_kotlin.$_$.a7;
  //endregion
  //region block: pre-declaration
  initMetadataForClass(ConcurrentMutableCollection, 'ConcurrentMutableCollection', VOID, VOID, [MutableCollection]);
  initMetadataForClass(MutableCollectionWrapper, 'MutableCollectionWrapper', VOID, VOID, [MutableCollection]);
  initMetadataForClass(ConcurrentMutableIterator, 'ConcurrentMutableIterator', VOID, VOID, [MutableIterator]);
  initMetadataForClass(ConcurrentMutableMap, 'ConcurrentMutableMap', ConcurrentMutableMap_init_$Create$, VOID, [KtMutableMap]);
  initMetadataForClass(MutableMapWrapper, 'MutableMapWrapper', VOID, VOID, [KtMutableMap]);
  initMetadataForClass(ConcurrentMutableSet, 'ConcurrentMutableSet', ConcurrentMutableSet_init_$Create$, ConcurrentMutableCollection, [ConcurrentMutableCollection, KtMutableSet]);
  initMetadataForClass(MutableSetWrapper, 'MutableSetWrapper', VOID, MutableCollectionWrapper, [MutableCollectionWrapper, KtMutableSet]);
  //endregion
  function _get_del__e67012($this) {
    return $this.del_1;
  }
  function ConcurrentMutableCollection$_get_size_$lambda_dssf9y(this$0) {
    return function () {
      return this$0.del_1.get_size_woubt6_k$();
    };
  }
  function ConcurrentMutableCollection$contains$lambda(this$0, $element) {
    return function () {
      return this$0.del_1.contains_aljjnj_k$($element);
    };
  }
  function ConcurrentMutableCollection$containsAll$lambda(this$0, $elements) {
    return function () {
      return this$0.del_1.containsAll_xk45sd_k$($elements);
    };
  }
  function ConcurrentMutableCollection$isEmpty$lambda(this$0) {
    return function () {
      return this$0.del_1.isEmpty_y1axqb_k$();
    };
  }
  function ConcurrentMutableCollection$add$lambda(this$0, $element) {
    return function () {
      return this$0.del_1.add_utx5q5_k$($element);
    };
  }
  function ConcurrentMutableCollection$addAll$lambda(this$0, $elements) {
    return function () {
      return this$0.del_1.addAll_4lagoh_k$($elements);
    };
  }
  function ConcurrentMutableCollection$clear$lambda(this$0) {
    return function () {
      this$0.del_1.clear_j9egeb_k$();
      return Unit_getInstance();
    };
  }
  function ConcurrentMutableCollection$iterator$lambda(this$0) {
    return function () {
      return new ConcurrentMutableIterator(this$0.syncTarget_1, this$0.del_1.iterator_jk1svi_k$());
    };
  }
  function ConcurrentMutableCollection$remove$lambda(this$0, $element) {
    return function () {
      return this$0.del_1.remove_cedx0m_k$($element);
    };
  }
  function ConcurrentMutableCollection$removeAll$lambda(this$0, $elements) {
    return function () {
      return this$0.del_1.removeAll_y0z8pe_k$($elements);
    };
  }
  function ConcurrentMutableCollection$retainAll$lambda(this$0, $elements) {
    return function () {
      return this$0.del_1.retainAll_9fhiib_k$($elements);
    };
  }
  function ConcurrentMutableCollection$blockCollection$lambda(this$0, $f) {
    return function () {
      var wrapper = new MutableCollectionWrapper(this$0.del_1);
      var result = $f(wrapper);
      wrapper._coll_1 = null;
      return result;
    };
  }
  function ConcurrentMutableCollection(rootArg, del) {
    rootArg = rootArg === VOID ? null : rootArg;
    this.del_1 = del;
    var tmp = this;
    tmp.syncTarget_1 = rootArg == null ? this : rootArg;
  }
  protoOf(ConcurrentMutableCollection).get_syncTarget_y36csq_k$ = function () {
    return this.syncTarget_1;
  };
  protoOf(ConcurrentMutableCollection).get_size_woubt6_k$ = function () {
    this.syncTarget_1;
    // Inline function 'co.touchlab.stately.concurrency.synchronize' call
    return ConcurrentMutableCollection$_get_size_$lambda_dssf9y(this)();
  };
  protoOf(ConcurrentMutableCollection).contains_aljjnj_k$ = function (element) {
    this.syncTarget_1;
    // Inline function 'co.touchlab.stately.concurrency.synchronize' call
    return ConcurrentMutableCollection$contains$lambda(this, element)();
  };
  protoOf(ConcurrentMutableCollection).containsAll_xk45sd_k$ = function (elements) {
    this.syncTarget_1;
    // Inline function 'co.touchlab.stately.concurrency.synchronize' call
    return ConcurrentMutableCollection$containsAll$lambda(this, elements)();
  };
  protoOf(ConcurrentMutableCollection).isEmpty_y1axqb_k$ = function () {
    this.syncTarget_1;
    // Inline function 'co.touchlab.stately.concurrency.synchronize' call
    return ConcurrentMutableCollection$isEmpty$lambda(this)();
  };
  protoOf(ConcurrentMutableCollection).add_utx5q5_k$ = function (element) {
    this.syncTarget_1;
    // Inline function 'co.touchlab.stately.concurrency.synchronize' call
    return ConcurrentMutableCollection$add$lambda(this, element)();
  };
  protoOf(ConcurrentMutableCollection).addAll_4lagoh_k$ = function (elements) {
    this.syncTarget_1;
    // Inline function 'co.touchlab.stately.concurrency.synchronize' call
    return ConcurrentMutableCollection$addAll$lambda(this, elements)();
  };
  protoOf(ConcurrentMutableCollection).clear_j9egeb_k$ = function () {
    this.syncTarget_1;
    // Inline function 'co.touchlab.stately.concurrency.synchronize' call
    ConcurrentMutableCollection$clear$lambda(this)();
  };
  protoOf(ConcurrentMutableCollection).iterator_jk1svi_k$ = function () {
    this.syncTarget_1;
    // Inline function 'co.touchlab.stately.concurrency.synchronize' call
    return ConcurrentMutableCollection$iterator$lambda(this)();
  };
  protoOf(ConcurrentMutableCollection).remove_cedx0m_k$ = function (element) {
    this.syncTarget_1;
    // Inline function 'co.touchlab.stately.concurrency.synchronize' call
    return ConcurrentMutableCollection$remove$lambda(this, element)();
  };
  protoOf(ConcurrentMutableCollection).removeAll_y0z8pe_k$ = function (elements) {
    this.syncTarget_1;
    // Inline function 'co.touchlab.stately.concurrency.synchronize' call
    return ConcurrentMutableCollection$removeAll$lambda(this, elements)();
  };
  protoOf(ConcurrentMutableCollection).retainAll_9fhiib_k$ = function (elements) {
    this.syncTarget_1;
    // Inline function 'co.touchlab.stately.concurrency.synchronize' call
    return ConcurrentMutableCollection$retainAll$lambda(this, elements)();
  };
  protoOf(ConcurrentMutableCollection).blockCollection_qk78pp_k$ = function (f) {
    this.syncTarget_1;
    // Inline function 'co.touchlab.stately.concurrency.synchronize' call
    return ConcurrentMutableCollection$blockCollection$lambda(this, f)();
  };
  function _get_coll__d4zbhb($this) {
    return ensureNotNull($this._coll_1);
  }
  function MutableCollectionWrapper(_coll) {
    this._coll_1 = _coll;
  }
  protoOf(MutableCollectionWrapper).set__coll_66luua_k$ = function (_set____db54di) {
    this._coll_1 = _set____db54di;
  };
  protoOf(MutableCollectionWrapper).get__coll_eenyrn_k$ = function () {
    return this._coll_1;
  };
  protoOf(MutableCollectionWrapper).add_utx5q5_k$ = function (element) {
    return _get_coll__d4zbhb(this).add_utx5q5_k$(element);
  };
  protoOf(MutableCollectionWrapper).addAll_4lagoh_k$ = function (elements) {
    return _get_coll__d4zbhb(this).addAll_4lagoh_k$(elements);
  };
  protoOf(MutableCollectionWrapper).clear_j9egeb_k$ = function () {
    _get_coll__d4zbhb(this).clear_j9egeb_k$();
  };
  protoOf(MutableCollectionWrapper).iterator_jk1svi_k$ = function () {
    return _get_coll__d4zbhb(this).iterator_jk1svi_k$();
  };
  protoOf(MutableCollectionWrapper).remove_cedx0m_k$ = function (element) {
    return _get_coll__d4zbhb(this).remove_cedx0m_k$(element);
  };
  protoOf(MutableCollectionWrapper).removeAll_y0z8pe_k$ = function (elements) {
    return _get_coll__d4zbhb(this).removeAll_y0z8pe_k$(elements);
  };
  protoOf(MutableCollectionWrapper).retainAll_9fhiib_k$ = function (elements) {
    return _get_coll__d4zbhb(this).retainAll_9fhiib_k$(elements);
  };
  protoOf(MutableCollectionWrapper).get_size_woubt6_k$ = function () {
    return _get_coll__d4zbhb(this).get_size_woubt6_k$();
  };
  protoOf(MutableCollectionWrapper).contains_aljjnj_k$ = function (element) {
    return _get_coll__d4zbhb(this).contains_aljjnj_k$(element);
  };
  protoOf(MutableCollectionWrapper).containsAll_xk45sd_k$ = function (elements) {
    return _get_coll__d4zbhb(this).containsAll_xk45sd_k$(elements);
  };
  protoOf(MutableCollectionWrapper).isEmpty_y1axqb_k$ = function () {
    return _get_coll__d4zbhb(this).isEmpty_y1axqb_k$();
  };
  function _get_root__dd8asp($this) {
    return $this.root_1;
  }
  function _get_del__e67012_0($this) {
    return $this.del_1;
  }
  function ConcurrentMutableIterator$hasNext$lambda(this$0) {
    return function () {
      return this$0.del_1.hasNext_bitz1p_k$();
    };
  }
  function ConcurrentMutableIterator$next$lambda(this$0) {
    return function () {
      return this$0.del_1.next_20eer_k$();
    };
  }
  function ConcurrentMutableIterator$remove$lambda(this$0) {
    return function () {
      this$0.del_1.remove_ldkf9o_k$();
      return Unit_getInstance();
    };
  }
  function ConcurrentMutableIterator(root, del) {
    this.root_1 = root;
    this.del_1 = del;
  }
  protoOf(ConcurrentMutableIterator).hasNext_bitz1p_k$ = function () {
    this.root_1;
    // Inline function 'co.touchlab.stately.concurrency.synchronize' call
    return ConcurrentMutableIterator$hasNext$lambda(this)();
  };
  protoOf(ConcurrentMutableIterator).next_20eer_k$ = function () {
    this.root_1;
    // Inline function 'co.touchlab.stately.concurrency.synchronize' call
    return ConcurrentMutableIterator$next$lambda(this)();
  };
  protoOf(ConcurrentMutableIterator).remove_ldkf9o_k$ = function () {
    this.root_1;
    // Inline function 'co.touchlab.stately.concurrency.synchronize' call
    ConcurrentMutableIterator$remove$lambda(this)();
  };
  function _get_del__e67012_1($this) {
    return $this.del_1;
  }
  function ConcurrentMutableMap_init_$Init$($this) {
    // Inline function 'kotlin.collections.mutableMapOf' call
    var tmp$ret$0 = LinkedHashMap_init_$Create$();
    ConcurrentMutableMap.call($this, null, tmp$ret$0);
    return $this;
  }
  function ConcurrentMutableMap_init_$Create$() {
    return ConcurrentMutableMap_init_$Init$(objectCreate(protoOf(ConcurrentMutableMap)));
  }
  function _get_syncTarget__cr5eyp($this) {
    return $this.syncTarget_1;
  }
  function ConcurrentMutableMap$_get_size_$lambda_nuyc4q(this$0) {
    return function () {
      return this$0.del_1.get_size_woubt6_k$();
    };
  }
  function ConcurrentMutableMap$_get_entries_$lambda_dp7xtt(this$0) {
    return function () {
      return new ConcurrentMutableSet(this$0, this$0.del_1.get_entries_p20ztl_k$());
    };
  }
  function ConcurrentMutableMap$_get_keys_$lambda_5gjoyr(this$0) {
    return function () {
      return new ConcurrentMutableSet(this$0, this$0.del_1.get_keys_wop4xp_k$());
    };
  }
  function ConcurrentMutableMap$_get_values_$lambda_tyvlyt(this$0) {
    return function () {
      return new ConcurrentMutableCollection(this$0, this$0.del_1.get_values_ksazhn_k$());
    };
  }
  function ConcurrentMutableMap$containsKey$lambda(this$0, $key) {
    return function () {
      return this$0.del_1.containsKey_aw81wo_k$($key);
    };
  }
  function ConcurrentMutableMap$containsValue$lambda(this$0, $value) {
    return function () {
      return this$0.del_1.containsValue_yf2ykl_k$($value);
    };
  }
  function ConcurrentMutableMap$get$lambda(this$0, $key) {
    return function () {
      return this$0.del_1.get_wei43m_k$($key);
    };
  }
  function ConcurrentMutableMap$isEmpty$lambda(this$0) {
    return function () {
      return this$0.del_1.isEmpty_y1axqb_k$();
    };
  }
  function ConcurrentMutableMap$clear$lambda(this$0) {
    return function () {
      this$0.del_1.clear_j9egeb_k$();
      return Unit_getInstance();
    };
  }
  function ConcurrentMutableMap$computeIfAbsent$lambda(this$0, $key, $defaultValue) {
    return function () {
      var value = this$0.del_1.get_wei43m_k$($key);
      var tmp;
      if (value == null) {
        var newValue = $defaultValue($key);
        var tmp0 = this$0.del_1;
        // Inline function 'kotlin.collections.set' call
        var key = $key;
        tmp0.put_4fpzoq_k$(key, newValue);
        tmp = newValue;
      } else {
        tmp = value;
      }
      return tmp;
    };
  }
  function ConcurrentMutableMap$put$lambda(this$0, $key, $value) {
    return function () {
      return this$0.del_1.put_4fpzoq_k$($key, $value);
    };
  }
  function ConcurrentMutableMap$putAll$lambda(this$0, $from) {
    return function () {
      this$0.del_1.putAll_wgg6cj_k$($from);
      return Unit_getInstance();
    };
  }
  function ConcurrentMutableMap$remove$lambda(this$0, $key) {
    return function () {
      return this$0.del_1.remove_gppy8k_k$($key);
    };
  }
  function ConcurrentMutableMap$block$lambda(this$0, $f) {
    return function () {
      var wrapper = new MutableMapWrapper(this$0.del_1);
      var result = $f(wrapper);
      var tmp = wrapper;
      // Inline function 'kotlin.collections.mutableMapOf' call
      tmp.map_1 = LinkedHashMap_init_$Create$();
      return result;
    };
  }
  function ConcurrentMutableMap(rootArg, del) {
    rootArg = rootArg === VOID ? null : rootArg;
    this.del_1 = del;
    var tmp = this;
    tmp.syncTarget_1 = rootArg == null ? this : rootArg;
  }
  protoOf(ConcurrentMutableMap).get_size_woubt6_k$ = function () {
    this.syncTarget_1;
    // Inline function 'co.touchlab.stately.concurrency.synchronize' call
    return ConcurrentMutableMap$_get_size_$lambda_nuyc4q(this)();
  };
  protoOf(ConcurrentMutableMap).get_entries_p20ztl_k$ = function () {
    this.syncTarget_1;
    // Inline function 'co.touchlab.stately.concurrency.synchronize' call
    return ConcurrentMutableMap$_get_entries_$lambda_dp7xtt(this)();
  };
  protoOf(ConcurrentMutableMap).get_keys_wop4xp_k$ = function () {
    this.syncTarget_1;
    // Inline function 'co.touchlab.stately.concurrency.synchronize' call
    return ConcurrentMutableMap$_get_keys_$lambda_5gjoyr(this)();
  };
  protoOf(ConcurrentMutableMap).get_values_ksazhn_k$ = function () {
    this.syncTarget_1;
    // Inline function 'co.touchlab.stately.concurrency.synchronize' call
    return ConcurrentMutableMap$_get_values_$lambda_tyvlyt(this)();
  };
  protoOf(ConcurrentMutableMap).containsKey_aw81wo_k$ = function (key) {
    this.syncTarget_1;
    // Inline function 'co.touchlab.stately.concurrency.synchronize' call
    return ConcurrentMutableMap$containsKey$lambda(this, key)();
  };
  protoOf(ConcurrentMutableMap).containsValue_yf2ykl_k$ = function (value) {
    this.syncTarget_1;
    // Inline function 'co.touchlab.stately.concurrency.synchronize' call
    return ConcurrentMutableMap$containsValue$lambda(this, value)();
  };
  protoOf(ConcurrentMutableMap).get_wei43m_k$ = function (key) {
    this.syncTarget_1;
    // Inline function 'co.touchlab.stately.concurrency.synchronize' call
    return ConcurrentMutableMap$get$lambda(this, key)();
  };
  protoOf(ConcurrentMutableMap).isEmpty_y1axqb_k$ = function () {
    this.syncTarget_1;
    // Inline function 'co.touchlab.stately.concurrency.synchronize' call
    return ConcurrentMutableMap$isEmpty$lambda(this)();
  };
  protoOf(ConcurrentMutableMap).clear_j9egeb_k$ = function () {
    this.syncTarget_1;
    // Inline function 'co.touchlab.stately.concurrency.synchronize' call
    ConcurrentMutableMap$clear$lambda(this)();
  };
  protoOf(ConcurrentMutableMap).computeIfAbsent_jzk0a1_k$ = function (key, defaultValue) {
    this.syncTarget_1;
    // Inline function 'co.touchlab.stately.concurrency.synchronize' call
    return ConcurrentMutableMap$computeIfAbsent$lambda(this, key, defaultValue)();
  };
  protoOf(ConcurrentMutableMap).put_4fpzoq_k$ = function (key, value) {
    this.syncTarget_1;
    // Inline function 'co.touchlab.stately.concurrency.synchronize' call
    return ConcurrentMutableMap$put$lambda(this, key, value)();
  };
  protoOf(ConcurrentMutableMap).putAll_wgg6cj_k$ = function (from) {
    this.syncTarget_1;
    // Inline function 'co.touchlab.stately.concurrency.synchronize' call
    ConcurrentMutableMap$putAll$lambda(this, from)();
  };
  protoOf(ConcurrentMutableMap).remove_gppy8k_k$ = function (key) {
    this.syncTarget_1;
    // Inline function 'co.touchlab.stately.concurrency.synchronize' call
    return ConcurrentMutableMap$remove$lambda(this, key)();
  };
  protoOf(ConcurrentMutableMap).block_bci1ax_k$ = function (f) {
    this.syncTarget_1;
    // Inline function 'co.touchlab.stately.concurrency.synchronize' call
    return ConcurrentMutableMap$block$lambda(this, f)();
  };
  function MutableMapWrapper(map) {
    this.map_1 = map;
  }
  protoOf(MutableMapWrapper).set_map_cnz4wt_k$ = function (_set____db54di) {
    this.map_1 = _set____db54di;
  };
  protoOf(MutableMapWrapper).get_map_4urytw_k$ = function () {
    return this.map_1;
  };
  protoOf(MutableMapWrapper).get_size_woubt6_k$ = function () {
    return this.map_1.get_size_woubt6_k$();
  };
  protoOf(MutableMapWrapper).containsKey_aw81wo_k$ = function (key) {
    return this.map_1.containsKey_aw81wo_k$(key);
  };
  protoOf(MutableMapWrapper).containsValue_yf2ykl_k$ = function (value) {
    return this.map_1.containsValue_yf2ykl_k$(value);
  };
  protoOf(MutableMapWrapper).get_wei43m_k$ = function (key) {
    return this.map_1.get_wei43m_k$(key);
  };
  protoOf(MutableMapWrapper).isEmpty_y1axqb_k$ = function () {
    return this.map_1.isEmpty_y1axqb_k$();
  };
  protoOf(MutableMapWrapper).get_entries_p20ztl_k$ = function () {
    return this.map_1.get_entries_p20ztl_k$();
  };
  protoOf(MutableMapWrapper).get_keys_wop4xp_k$ = function () {
    return this.map_1.get_keys_wop4xp_k$();
  };
  protoOf(MutableMapWrapper).get_values_ksazhn_k$ = function () {
    return this.map_1.get_values_ksazhn_k$();
  };
  protoOf(MutableMapWrapper).clear_j9egeb_k$ = function () {
    this.map_1.clear_j9egeb_k$();
  };
  protoOf(MutableMapWrapper).put_4fpzoq_k$ = function (key, value) {
    return this.map_1.put_4fpzoq_k$(key, value);
  };
  protoOf(MutableMapWrapper).putAll_wgg6cj_k$ = function (from) {
    this.map_1.putAll_wgg6cj_k$(from);
  };
  protoOf(MutableMapWrapper).remove_gppy8k_k$ = function (key) {
    return this.map_1.remove_gppy8k_k$(key);
  };
  function _get_del__e67012_2($this) {
    return $this.del_2;
  }
  function ConcurrentMutableSet_init_$Init$($this) {
    // Inline function 'kotlin.collections.mutableSetOf' call
    var tmp$ret$0 = LinkedHashSet_init_$Create$();
    ConcurrentMutableSet.call($this, null, tmp$ret$0);
    return $this;
  }
  function ConcurrentMutableSet_init_$Create$() {
    return ConcurrentMutableSet_init_$Init$(objectCreate(protoOf(ConcurrentMutableSet)));
  }
  function ConcurrentMutableSet$block$lambda(this$0, $f) {
    return function () {
      var wrapper = new MutableSetWrapper(this$0.del_2);
      var result = $f(wrapper);
      var tmp = wrapper;
      // Inline function 'kotlin.collections.mutableSetOf' call
      tmp.set_1 = LinkedHashSet_init_$Create$();
      return result;
    };
  }
  function ConcurrentMutableSet(rootArg, del) {
    ConcurrentMutableCollection.call(this, rootArg, del);
    this.del_2 = del;
  }
  protoOf(ConcurrentMutableSet).block_xu3665_k$ = function (f) {
    this.get_syncTarget_y36csq_k$();
    // Inline function 'co.touchlab.stately.concurrency.synchronize' call
    return ConcurrentMutableSet$block$lambda(this, f)();
  };
  function MutableSetWrapper(set) {
    MutableCollectionWrapper.call(this, set);
    this.set_1 = set;
  }
  protoOf(MutableSetWrapper).set_set_8oh9lm_k$ = function (_set____db54di) {
    this.set_1 = _set____db54di;
  };
  protoOf(MutableSetWrapper).get_set_tudh5m_k$ = function () {
    return this.set_1;
  };
  //region block: post-declaration
  protoOf(ConcurrentMutableMap).asJsMapView_ii14sm_k$ = asJsMapView;
  protoOf(ConcurrentMutableMap).asJsReadonlyMapView_6h4p3w_k$ = asJsReadonlyMapView;
  protoOf(MutableMapWrapper).asJsMapView_ii14sm_k$ = asJsMapView;
  protoOf(MutableMapWrapper).asJsReadonlyMapView_6h4p3w_k$ = asJsReadonlyMapView;
  protoOf(ConcurrentMutableSet).asJsSetView_xjflv8_k$ = asJsSetView;
  protoOf(ConcurrentMutableSet).asJsReadonlySetView_ciim7e_k$ = asJsReadonlySetView;
  protoOf(MutableSetWrapper).asJsSetView_xjflv8_k$ = asJsSetView;
  protoOf(MutableSetWrapper).asJsReadonlySetView_ciim7e_k$ = asJsReadonlySetView;
  //endregion
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = ConcurrentMutableMap_init_$Create$;
  //endregion
  return _;
}));

//# sourceMappingURL=Stately-stately-concurrent-collections.js.map
