/**
 * 定义改变神态事件动作组件。
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
 * 改变神态事件动作组件。
 *
 * @param  {Integer} line 在脚本源代码中地行号
 * @param  {Array} params 参数数组
 * @param  {String} content 内容
 * @return {bigine.action.char.style}
 * @constructs
 */
bigine.action.char.style = function(line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    this.$prototype = 'bigine.action.char.style';
    this.char = this.$params[0];
    this.style = this.$content;
};
bigine.action.char.style.prototype = new bigine.tag.action();

/**
 * 获取预期参数个数。
 *
 * @return {Array}
 */
bigine.action.char.style.prototype.$expectParams = function() {
    return [1, 1];
};

/**
 * 获取是否预期内容。
 *
 * @return {Boolean}
 */
bigine.action.char.style.prototype.$expectContent = function() {
    return true;
};

/**
 * 绑定运行时（对象化所需人物）。
 *
 * @param  {bigine.core.runtime} runtime
 * @return {bigine.action.char.style}
 */
bigine.action.char.style.prototype.bind = function(runtime) {
    this.char = runtime.char(this.char);
    return bigine.tag.action.prototype.bind.call(this, runtime);
};

module.exports = bigine.action.char.style;
