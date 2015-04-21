/**
 * 定义助手工具组件。
 *
 * @author    郑煜宇 <zhengyuyu@kanshu.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

var bigine = {
    error: require('bigine/error'),
    util: {}
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
$.uuid = function(byte) {
    var rnd = 0 | 16 * Math.random(),
        value = 'x' == char ? rnd : 8 | 3 & rnd;
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

module.exports = bigine.util.helper;
