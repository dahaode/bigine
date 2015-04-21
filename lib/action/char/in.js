/**
 * 定义人物出场事件动作组件。
 *
 * @author    郑煜宇 <zhengyuyu@kanshu.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

var bigine = {
    action: {
        char: {}
    },
    error: require('bigine/error'),
    tag: {
        action: require('bigine/tag/action')
    }
};

/**
 * 人物出场事件动作组件。
 *
 * @param  {Integer} line 在脚本源代码中地行号
 * @param  {Array} params 参数数组
 * @param  {String} content 内容
 * @return {bigine.action.char.in}
 * @constructs
 */
bigine.action.char.in = function(line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    this.$prototype = 'bigine.action.char.in';
};
bigine.action.char.in.prototype = new bigine.tag.action();

/**
 * 获取预期参数个数。
 *
 * @return {Array}
 */
bigine.action.char.in.prototype.$expectParams = function() {
    return [0, 1];
};

/**
 * 获取是否预期内容。
 *
 * @return {Boolean}
 */
bigine.action.char.in.prototype.$expectContent = function() {
    return true;
};

module.exports = bigine.action.char.in;
