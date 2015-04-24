/**
 * 定义助手工具组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('bigine/core/component').$namespace('.util.helper'),
    $ = {};

bigine.util.q = require('q');

/**
 * 检查对象是否为字符串。
 *
 * @param  {*} object
 * @return {Boolean}
 */
bigine.util.helper.isString = function(object) {
    return 'string' == typeof object || object instanceof String;
};

/**
 * 检查对象是否为数组。
 *
 * @param  {*} object
 * @return {Boolean}
 */
bigine.util.helper.isArray = function(object) {
    return object instanceof Array;
};

/**
 * 检查对象是否为函数。
 *
 * @param  {*} object
 * @return {Boolean}
 */
bigine.util.helper.isFunction = function(object) {
    return !!(object && object.constructor && object.apply && object.call);
};

/**
 * 空函数。
 *
 * @return {void}
 */
bigine.util.helper.noop = function() {};

/**
 * 生成 UUID 其中单个字符。
 *
 * @param  {String} byte
 * @return {String}
 * @private
 */
$.uuid = function(symbol) {
    var rnd = 0 | 16 * Math.random(),
        value = 'x' == symbol ? rnd : 8 | 3 & rnd;
    return value.toString(16);
};

/**
 * 生成 UUID 。
 *
 * @return {String}
 */
bigine.util.helper.uuid = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, $.uuid);
};

/**
 * 生成 Promise 对象。
 *
 * @param  {Function(Function, Function, Function)} wrapper
 * @return {bigine.util.q.deferred.promise}
 */
bigine.util.helper.promise = function(wrapper) {
    var deferred = bigine.util.q.defer();
    try {
        wrapper(deferred.resolve, deferred.reject, deferred.notify);
    } catch (error) {
        deferred.reject(error);
    }
    return deferred.promise;
};

/**
 * 生成已处理地 Promise 对象。
 *
 * @param {?} options
 * @return {bigine.util.q.deferred.promise}
 */
bigine.util.helper.promise.resolved = function(options) {
    return bigine.util.helper.promise(function (resolve) {
        resolve(options);
    });
};

/**
 * 生成已中断地 Promise 对象。
 *
 * @param  {Error} reason
 * @return {bigine.util.q.deferred.promise}
 */
bigine.util.helper.promise.rejected = function(reason) {
    return bigine.util.q.reject(reason);
};

/**
 * 依次执行单元序列中每项的指定方法。
 *
 * @param  {Array<Object>} units
 * @param  {String} method
 * @param  {Object} data
 * @return {bigine.util.q.deferred.promise}
 */
bigine.util.helper.promise.sequence = function(units, method, data) {
    if (!units.length) {
        return bigine.util.helper.promise.resolved(data);
    }
    var next = function(index) {
        return function (data) {
            return units[index][method](data);
        };
    },
        promise;
    for (ii = 0; ii < units.length; ii++) {
        promise = ii ?
            promise.then(next(ii)) :
            units[0][method](data);
    }
    return promise;
};

module.exports = bigine.util.helper;
