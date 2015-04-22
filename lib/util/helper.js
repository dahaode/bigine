/**
 * 定义助手工具组件。
 *
 * @author    郑煜宇 <zhengyuyu@kanshu.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

var bigine = {
    error: require('bigine/error'),
    util: {
        q: require('q')
    }
},
    $ = {};

/**
 * 助手工具组件。
 *
 * @return {void}
 * @deprecated
 */
bigine.util.helper = function() {
    throw new bigine.error('助手工具无法实例化');
};

/**
 * 检查对象是否为字符串。
 *
 * @param  {mixed} object
 * @return {Boolean}
 */
bigine.util.helper.isString = function(object) {
    return 'string' == typeof object || object instanceof String;
};

/**
 * 检查对象是否为数组。
 *
 * @param  {mixed} object
 * @return {Boolean}
 */
bigine.util.helper.isArray = function(object) {
    return object instanceof Array;
};

/**
 * 检查对象是否为函数。
 *
 * @param  {mixed} object
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
bigine.util.helper.noop = function() {
};

/**
 * 生成 UUID 其中单个字符。
 *
 * @param  {String} byte
 * @return {String}
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
 * @param  {Function} job
 * @return {bigine.util.helper.q.deferred.promise}
 */
bigine.util.helper.promise = function(job) {
    var deferred = bigine.util.helper.q.defer();
    try {
        job(deferred.resolve, deferred.reject, deferred.notify);
    } catch (error) {
        deferred.reject(error);
    }
    return deferred.promise;
};

/**
 * 生成已处理地 Promise 对象。
 *
 * @return {bigine.util.helper.q.deferred.promise}
 */
bigine.util.helper.promise.resolved = function() {
    return bigine.util.helper.promise(function (resolve) {
        resolve();
    });
};

/**
 * 生成已中断地 Promise 对象。
 *
 * @param  {Error} reason
 * @return {bigine.util.helper.q.deferred.promise}
 */
bigine.util.helper.promise.rejected = function(reason) {
    return bigine.util.helper.q.reject(reason);
};

module.exports = bigine.util.helper;
