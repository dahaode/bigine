/**
 * 定义人物离场事件动作组件。
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
 * 人物离场事件动作组件。
 *
 * @param  {Integer} line 在脚本源代码中地行号
 * @param  {Array} params 参数数组
 * @param  {String} content 内容
 * @return {bigine.action.char.out}
 * @constructs
 */
bigine.action.char.out = function(line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    this.$prototype = 'bigine.action.char.out';
    this.char = this.$params[0];
};
bigine.action.char.out.prototype = new bigine.tag.action();

/**
 * 获取预期参数个数。
 *
 * @return {Array}
 */
bigine.action.char.out.prototype.$expectParams = function() {
    return [1, 1];
};

/**
 * 绑定运行时（对象化所需人物）。
 *
 * @param  {bigine.core.runtime} runtime
 * @return {bigine.action.char.out}
 */
bigine.action.char.out.prototype.bind = function(runtime) {
    this.char = runtime.getChar(this.char);
    return bigine.tag.action.prototype.bind.call(this, runtime);
};

module.exports = bigine.action.char.out;
