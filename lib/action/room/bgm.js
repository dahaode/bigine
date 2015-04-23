/**
 * 定义播放音乐事件动作组件。
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
 * 播放音乐事件动作组件。
 *
 * @param  {Integer} line 在脚本源代码中地行号
 * @param  {Array} params 参数数组
 * @param  {String} content 内容
 * @return {bigine.action.room.bgm}
 * @constructs
 */
bigine.action.room.bgm = function(line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    this.$prototype = 'bigine.action.room.bgm';
    this.bgm = this.$params[0];
};
bigine.action.room.bgm.prototype = new bigine.tag.action();

/**
 * 获取预期参数个数。
 *
 * @return {Array}
 */
bigine.action.room.bgm.prototype.$expectParams = function() {
    return [1, 1];
};

/**
 * 绑定运行时（对象化所需音乐）。
 *
 * @param  {bigine.core.runtime} runtime
 * @return {bigine.action.room.bgm}
 */
bigine.action.room.bgm.prototype.bind = function(runtime) {
    this.bgm = runtime.bgm(this.bgm);
    return bigine.tag.action.prototype.bind.call(this, runtime);
};

/**
 * 执行。
 *
 * @param  {Object} context
 * @return {bigine.util.q.deferred.promise}
 */
bigine.action.room.bgm.prototype.act = function(context) {
    return context.director.bgm(context, this.bgm);
};

module.exports = bigine.action.room.bgm;
