/**
 * 定义工具组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 DaHao.de
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('./bigine').$namespace('.util'),
    $ = {};

/**
 * 检查对象是否已定义。
 *
 * @param  {?} puzzle
 * @return {Boolean}
 */
bigine.util.isDefined = function(puzzle) {
    return 'undefined' !== typeof puzzle;
};

/**
 * 检查对象是否为数值。
 *
 * @param  {?} puzzle
 * @return {Boolean}
 */
bigine.util.isNumber = function(puzzle) {
    return "number" == typeof puzzle || puzzle instanceof Number;
};

/**
 * 检查对象是否为字符串。
 *
 * @param  {?} puzzle
 * @return {Boolean}
 */
bigine.util.isString = function(puzzle) {
    return 'string' == typeof puzzle || puzzle instanceof String;
};

/**
 * 检查对象是否为数组。
 *
 * @param  {?} puzzle
 * @return {Boolean}
 */
bigine.util.isArray = function(puzzle) {
    return '[object Array]' == Object.prototype.toString.call(puzzle) ||
        '[object Arguments]' == Object.prototype.toString.call(puzzle) ||
        puzzle instanceof Array;
};

/**
 * 检查对象是否为函数。
 *
 * @param  {?} puzzle
 * @return {Boolean}
 */
bigine.util.isFunction = function(puzzle) {
    return !!(puzzle && puzzle.constructor && puzzle.apply && puzzle.call);
};

/**
 * 空函数。
 *
 * @return {Null}
 */
bigine.util.noop = function() {};

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
bigine.util.uuid = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, $.uuid);
};

/**
 * 遍历集合。
 *
 * @param  {(Array|Object)} objects
 * @param  {Function} iterator
 * @param  {?=} context
 * @return {Null}
 */
bigine.util.each = function(objects, iterator, context) {
    var ii;
    if (this.isArray(objects)) {
        if (this.isDefined(Array.prototype.forEach)) {
            Array.prototype.forEach.call(objects, iterator, context);
        } else {
            for (ii = 0; ii < objects.length; ii++) {
                iterator.call(context || iterator, objects[ii], ii, objects);
            }
        }
    } else if (objects) {
        for (ii in objects) {
            iterator.call(context || iterator, objects[ii], ii, objects);
        }
    }
};

/**
 * 遍历集合。
 *
 * @param  {(Array|Object)} objects
 * @param  {Function} iterator
 * @param  {?=} context
 * @return {Boolean}
 */
bigine.util.every = function(objects, iterator, context) {
    var ii;
    if (this.isArray(objects)) {
        if (this.isDefined(Array.prototype.every)) {
            return Array.prototype.every.call(objects, iterator, context);
        }
        for (ii = 0; ii < objects.length; ii++) {
            if (!iterator.call(context || iterator, objects[ii], ii, objects)) {
                return false;
            }
        }
    }
    if (objects) {
        for (ii in objects) {
            if (!iterator.call(context || iterator, objects[ii], ii, objects)) {
                return false;
            }
        }
    }
    return true;
};

/**
 * 遍历集合。
 *
 * @param  {(Array|Object)} objects
 * @param  {Function} iterator
 * @param  {?=} context
 * @return {Boolean}
 */
bigine.util.some = function(objects, iterator, context) {
    var ii;
    if (this.isArray(objects)) {
        if (this.isDefined(Array.prototype.some)) {
            return Array.prototype.some.call(objects, iterator, context);
        }
        for (ii = 0; ii < objects.length; ii++) {
            if (iterator.call(context || iterator, objects[ii], ii, objects)) {
                return true;
            }
        }
    }
    if (objects) {
        for (ii in objects) {
            if (iterator.call(context || iterator, objects[ii], ii, objects)) {
                return true;
            }
        }
    }
    return false;
};

/**
 * 绑定 DOM 事件。
 *
 * @param  {HTMLElement} element
 * @param  {(String|Object<String, Function(Event)>)} event
 * @param  {Function(Event)=} handler
 * @return {HTMLElement}
 */
bigine.util.on = function(element, event, handler) {
    if (!handler) {
        this.each(event, function (handler, event) {
            bigine.util.on(element, event, handler);
        });
        return element;
    }
    if (element.addEventListener) {
        element.addEventListener(event, handler);
    } else if (element.attachEvent) {
        element.attachEvent('on' + event, handler);
    } else {
        element['on' + event] = handler;
    }
    return element;
};

/**
 * 绑定一次性 DOM 事件。
 *
 * @param  {HTMLElement} element
 * @param  {(String|Object<String, Function(Event)>)} event
 * @param  {Function(Event)=} handler
 * @return {HTMLElement}
 */
bigine.util.once = function(element, event, handler) {
    if (!handler) {
        this.each(event, function (handler, event) {
            bigine.util.once(element, event, handler);
        });
        return element;
    }
    var wrapper;
    if (element.addEventListener) {
        wrapper = function(ev) {
            element.removeEventListener(event, wrapper);
            return handler(ev);
        };
        element.addEventListener(event, wrapper);
    } else if (element.attachEvent) {
        wrapper = function(ev) {
            element.detachEvent('on' + event, wrapper);
            return handler(ev);
        };
        element.attachEvent('on' + event, wrapper);
    } else {
        element['on' + event] = function(ev) {
            delete element['on' + event];
            return handler(ev);
        };
    }
    return element;
};

module.exports = bigine.util;
