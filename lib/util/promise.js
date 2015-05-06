/**
 * 定义 Promise 组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../bigine').$namespace('.util')
    .$import('.error')
    .$import('.core.component');

/**
 * Promise 组件。
 *
 * @param  {Function(Function, Function)} task
 * @return {bigine.util.promise}
 * @constructor
 * @extends {Promise}
 */
bigine.util.promise = Promise || require('es6-promise').Promise;

/**
 * 捕获异常。
 *
 * @param  {Function(?)} onRejected
 * @return {bigine.util.promise}
 */
bigine.util.promise.prototype.fail = function(onRejected) {
    return this['catch'](onRejected);
};

/**
 * 生成等待点击地 Promise 对象。
 *
 * @param  {HTMLElement} element
 * @param  {?=} data
 * @return {bigine.util.promise}
 * @static
 */
bigine.util.promise.click = function(element, data) {
    return new bigine.util.promise(function (resolve) {
        bigine.util.once('click', element, function () {
            resolve(data);
        });
    });
};

/**
 * 生成延时 Promise 对象。
 *
 * @param  {Number} ms
 * @param  {?=} data
 * @return {bigine.util.promise}
 * @static
 */
bigine.util.promise.delay = function(ms, data) {
    return new bigine.util.promise(function (resolve) {
        setTimeout(function () {
            resolve(data);
        }, ms);
    });
};

/**
 * 生成变形 Promise 对象。
 *
 * @param  {Function(Function, Function)} callback
 * @param  {Number} tick
 * @return {bigine.util.promise}
 * @static
 */
bigine.util.promise.transform = function(callback, tick) {
    return new bigine.util.promise(function (resolve, reject) {
        var resolve2 = function(data) {
                clearInterval(tick);
                resolve(data);
            },
            reject2 = function(reason) {
                clearInterval(tick);
                reject(reason);
            };
        tick = setInterval(function () {
            try {
                callback(resolve2, reject2);
            } catch (error) {
                reject2(error);
            }
        }, tick);
    });
};

/**
 * 生成序列执行 Promise 对象。
 *
 * @param  {Array<Object>} objects
 * @param  {String} method
 * @param  {?=} data
 * @param  {?=} inspector
 * @return {bigine.util.promise}
 * @static
 */
bigine.util.promise.every = function(objects, method, data, inspector) {
    if (!objects.length) {
        return bigine.util.promise.resolve(data);
    }
    inspector = inspector || bigine.util.noop;
    var next = function(index) {
        return function (data) {
            try {
                inspector(objects[index]);
                var ret = objects[index][method](data);
                if (!(ret instanceof bigine.util.promise)) {
                    ret = bigine.util.promise.resolve(ret);
                }
                return ret;
            } catch (error) {
                return bigine.util.promise.reject(error);
            }
        };
    };
    for (var ii = 0, jj; ii < objects.length; ii++) {
        jj = jj ? jj.then(next(ii)) : (next(0))(data);
    }
    return jj;
};

module.exports = bigine.util.promise;
