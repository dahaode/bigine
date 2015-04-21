/**
 * 定义事件动作抽象组件。
 *
 * @author    郑煜宇 <zhengyuyu@kanshu.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

var bigine = {
    core: {
        tag: require('bigine/core/tag'),
    },
    error: require('bigine/error'),
    tag: {}
},
    $ = {};

/**
 * 事件动作抽象组件。
 *
 * @param  {Integer} line 在脚本源代码中地行号
 * @param  {Array} params 参数数组
 * @param  {String} content 内容
 * @return {bigine.tag.action}
 * @constructs
 */
bigine.tag.action = function(line, params, content) {
    bigine.core.tag.call(this, line, params, content);
};
bigine.tag.action.prototype = new bigine.core.tag();

/**
 * 获取是否预期内容。
 *
 * @return {Boolean}
 */
bigine.tag.action.prototype.$expectContent = function() {
    return false;
};

/**
 * 获取是否预期子标签。
 *
 * @return {false}
 */
bigine.tag.action.prototype.$expectChildren = function() {
    return false;
};

module.exports = bigine.tag.action;
