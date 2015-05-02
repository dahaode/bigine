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
 * @param  {?} data
 * @return {bigine.util.q.deferred.promise}
 */
bigine.util.helper.promise.resolved = function(data) {
    return bigine.util.helper.promise(function (resolve) {
        resolve(data);
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
 * 生成点击 Promise 对象。
 *
 * @param  {HTMLElement} element
 * @param  {?=} data
 * @return {bigine.util.q.deferred.promise}
 */
bigine.util.helper.promise.click = function(element, data) {
    return bigine.util.helper.promise(function (resolve) {
        var listener;
        if (element.addEventListener) {
            listener = function() {
                element.removeEventListener('click', listener, true);
                resolve(data);
            };
            element.addEventListener('click', listener, true);
        } else if (element.attachEvent) {
            listener = function() {
                element.detachEvent('onclick', listener);
                resolve(data);
            };
            element.attachEvent('onclick', listener);
        } else {
            element.onclick = function() {
                delete element.onclick;
                resolve(data);
            };
        }
    });
};

/**
 * 生成延时 Promise 对象。
 *
 * @param  {Number} microseconds
 * @param  {?=} data
 * @return {bigine.util.q.deferred.promise}
 */
bigine.util.helper.promise.delay = function(microseconds, data) {
    return bigine.util.helper.promise(function (resolve) {
        setTimeout(function () {
            resolve(data);
        }, microseconds);
    });
};

/**
 * 生成心跳 Promise 对象。
 *
 * @param  {Function(Function)} handler
 * @param  {Number} heartbeat
 * @param  {?=} data
 * @return {bigine.util.q.deferred.promise}
 */
bigine.util.helper.promise.heartbeat = function(handler, tick, data) {
    return bigine.util.helper.promise(function (resolve) {
        var task = function() {
                handler(resolve2);
            },
            resolve2 = function() {
                clearInterval(tick);
                resolve(data);
            };
        tick = setInterval(task, tick);
    });
};

/**
 * 依次执行单元序列中每项的指定方法。
 *
 * @param  {Array<Object>} units
 * @param  {String} method
 * @param  {Object} data
 * @param  {Function=} inject
 * @return {bigine.util.q.deferred.promise}
 */
bigine.util.helper.promise.sequence = function(units, method, data, inject) {
    if (!units.length) {
        return bigine.util.helper.promise.resolved(data);
    }
    inject = inject || bigine.util.helper.noop;
    var next = function(index) {
        return function (data) {
            inject(units[index]);
            return units[index][method](data);
        };
    },
        promise;
    for (ii = 0; ii < units.length; ii++) {
        if (ii) {
            promise = promise.then(next(ii));
        } else {
            inject(units[0]);
            promise = units[0][method](data);
        }
    }
    return promise;
};

module.exports = bigine.util.helper;
