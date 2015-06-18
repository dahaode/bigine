/**
 * 定义 Promise 组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 DaHao.de
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../bigine').$namespace('.util')
    .$import('.error')
    .$import('.util.key'),
    $;

/**
 * Promise 组件。
 *
 * @param  {Function(Function, Function)} task
 * @return {bigine.util.promise}
 * @constructor
 * @extends {Promise}
 */
bigine.util.promise = Promise || require('es6-promise').Promise;
$ = bigine.util.promise;

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
 * 最迟并行任务。
 *
 * @param  {?} promises
 * @return {bigine.util.promise}
 */
bigine.util.promise.prototype.all = function(promises) {
    return this.then($.all(promises));
};

/**
 * 最早并行任务。
 *
 * @param  {?} promises
 * @return {bigine.util.promise}
 */
bigine.util.promise.prototype.race = function(promises) {
    return this.then($.race(promises));
};

/**
 * 替换传递值。
 *
 * @param  {?} data
 * @return {bigine.util.promise}
 */
bigine.util.promise.prototype.pass = function(data) {
    return this.then(function () {
        return data;
    });
};

/**
 * 等待按键。
 *
 * @param  {Number} code
 * @return {bigine.util.promise}
 */
bigine.util.promise.prototype.key = function(code) {
    return this.then(function () {
        return $.key(code);
    });
};

/**
 * 等待按键。
 *
 * @param  {Number} code
 * @return {bigine.util.promise}
 */
bigine.util.promise.key = function(code) {
    return new $(function (resolve) {
        bigine.util.once(bigine.util.key.singleton(), 'press.' + code, function () {
            resolve();
        });
    });
};

/**
 * 等待点击。
 *
 * @param  {HTMLElement} element
 * @param  {Number=} key
 * @return {bigine.util.promise}
 */
bigine.util.promise.prototype.click = function(element, key) {
    return this.then(function () {
        return $.click(element, key);
    });
};

/**
 * 等待点击。
 *
 * @param  {HTMLElement} element
 * @param  {Number=} key
 * @return {bigine.util.promise}
 * @static
 */
bigine.util.promise.click = function(element, key) {
    if (!element) {
        return $.resolve();
    }
    return new $(function (resolve) {
        if (key) {
            var sim = function () {
                    element.click();
                },
                keys = {};
            if (bigine.util.isArray(key)) {
                bigine.util.each(key, function (key) {
                    keys['press.' + key] = sim;
                });
            } else {
                keys['press.' + key] = sim;
            }
            bigine.util.once(bigine.util.key.singleton(), keys);
        }
        bigine.util.once(element, 'click', function () {
            resolve();
        });
    });
};

/**
 * 延时。
 *
 * @param  {Number} microseconds
 * @return {bigine.util.promise}
 */
bigine.util.promise.prototype.delay = function(microseconds) {
    return this.then(function () {
        return $.delay(microseconds);
    });
};

/**
 * 延时。
 *
 * @param  {Number} microseconds
 * @return {bigine.util.promise}
 * @static
 */
bigine.util.promise.delay = function(microseconds) {
    return new $(function (resolve) {
        window.setTimeout(resolve, microseconds);
    });
};

/**
 * 定时定次执行。（每秒 50 帧）
 *
 * @param  {Function} animate
 * @param  {Number} times
 * @return {bigine.util.promise}
 */
bigine.util.promise.tick = function(animate, times) {
    if (!bigine.util.isFunction(animate)) {
        animate = bigine.util.noop;
    }
    if (1 > times) {
        return $.reject(new bigine.error('次数“' + times + '”过小'));
    }
    var counter = 1,
        promise = $.resolve(),
        next = function(index) {
            return function () {
                animate(index, times);
            };
        };
    for (; counter <= times; counter++) {
        promise = promise.delay(20).then(next(counter));
    }
    return promise;
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
    inspector = inspector || bigine.util.noop;
    var index = 0,
        promise = $.resolve(data),
        next = function(index) {
            return function (data) {
                inspector(objects[index]);
                return objects[index][method](data);
            };
        };
    for (; index < objects.length; index++) {
        promise = promise.then(next(index));
    }
    return promise;
};

module.exports = bigine.util.promise;
