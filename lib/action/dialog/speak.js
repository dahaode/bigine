/**
 * 定义对白事件动作组件。
 *
 * @author    郑煜宇 <zhengyuyu@kanshu.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

var bigine = {
    action: {
        dialog: {}
    },
    error: require('bigine/error'),
    tag: {
        action: require('bigine/tag/action')
    }
};

/**
 * 对白事件动作组件。
 *
 * @param  {Integer} line 在脚本源代码中地行号
 * @param  {Array} params 参数数组
 * @param  {String} content 内容
 * @return {bigine.action.dialog.speak}
 * @constructs
 */
bigine.action.dialog.speak = function(line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    this.$prototype = 'bigine.action.dialog.speak';
    this.from = this.$params[0];
    this.to = this.$params[1];
    this.nick = this.$params[2] || this.$params[0];
};
bigine.action.dialog.speak.prototype = new bigine.tag.action();

/**
 * 获取预期参数个数。
 *
 * @return {Array}
 */
bigine.action.dialog.speak.prototype.$expectParams = function() {
    return [2, 3];
};

/**
 * 获取是否预期内容。
 *
 * @return {Boolean}
 */
bigine.action.dialog.speak.prototype.$expectContent = function() {
    return true;
};

/**
 * 绑定运行时（对象化所需人物）。
 *
 * @param  {bigine.core.runtime} runtime
 * @return {bigine.action.dialog.speak}
 */
bigine.action.dialog.speak.prototype.bind = function(runtime) {
    this.from = runtime.char(this.from);
    this.to = runtime.char(this.to);
    return bigine.tag.action.prototype.bind.call(this, runtime);
};

module.exports = bigine.action.dialog.speak;
