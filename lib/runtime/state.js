/**
 * 定义运行时状态组件。
 *
 * @author    郑煜宇 <zhengyuyu@kanshu.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

var bigine = {
    runtime: {}
},
    $ = {};

/**
 * 运行时状态组件。
 *
 * @return {bigine.runtime.state}
 * @constructor
 */
bigine.runtime.state = function() {
};

/**
 * 设置值。
 *
 * @param {String} key
 * @param {mixed} value
 * @return {void}
 */
bigine.runtime.state.prototype.set = function(key, value) {
    $[key] = value;
};

/**
 * 获取值。
 *
 * @param  {String} key
 * @return {mixed}
 */
bigine.runtime.state.prototype.get = function(key) {
    return $[key];
};

module.exports = bigine.runtime.state;
