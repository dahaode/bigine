/**
 * 定义当数据事件动作组件。
 *
 * @author    郑煜宇 <zhengyuyu@kanshu.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

var bigine = {
    action: {
        value: {}
    },
    error: require('bigine/error'),
    tag: {
        action: require('bigine/tag/action')
    }
};

/**
 * 当数据事件动作组件。
 *
 * @param  {Integer} line 在脚本源代码中地行号
 * @param  {Array} params 参数数组
 * @param  {String} content 内容
 * @return {bigine.action.value.assert}
 * @constructs
 */
bigine.action.value.assert = function(line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    this.$prototype = 'bigine.action.value.assert';
    this.key = this.$params[0];
    this.value = this.$params[1];
};
bigine.action.value.assert.prototype = new bigine.tag.action();

/**
 * 获取预期参数个数。
 *
 * @return {Array}
 */
bigine.action.value.assert.prototype.$expectParams = function() {
    return [2, 2];
};

/**
 * 检查状态是否满足自身要求。
 *
 * @param  {bigine.runtime.state} state
 * @return {Boolean}
 */
bigine.action.value.assert.prototype.test = function(state) {
    return state[this.key] == this.value;
};

module.exports = bigine.action.value.assert;
