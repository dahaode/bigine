/**
 * 定义展示特写事件动作组件。
 *
 * @author    郑煜宇 <zhengyuyu@kanshu.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

var bigine = {
    action: {
        room: {}
    },
    error: require('bigine/error'),
    tag: {
        action: require('bigine/tag/action')
    }
};

/**
 * 展示特写事件动作组件。
 *
 * @param  {Integer} line 在脚本源代码中地行号
 * @param  {Array} params 参数数组
 * @param  {String} content 内容
 * @return {bigine.action.room.cgon}
 * @constructs
 */
bigine.action.room.cgon = function(line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    this.$prototype = 'bigine.action.room.cgon';
    this.cg = this.$params[0];
};
bigine.action.room.cgon.prototype = new bigine.tag.action();

/**
 * 获取预期参数个数。
 *
 * @return {Array}
 */
bigine.action.room.cgon.prototype.$expectParams = function() {
    return [1, 1];
};

/**
 * 绑定运行时（对象化所需特写）。
 *
 * @param  {bigine.core.runtime} runtime
 * @return {bigine.action.room.cgon}
 */
bigine.action.room.cgon.prototype.bind = function(runtime) {
    this.cg = runtime.getCG(this.cg);
    return bigine.tag.action.prototype.bind.call(this, runtime);
};

module.exports = bigine.action.room.cgon;
