/**
 * 定义独白事件动作组件。
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
 * 独白事件动作组件。
 *
 * @param  {Integer} line 在脚本源代码中地行号
 * @param  {Array} params 参数数组
 * @param  {String} content 内容
 * @return {bigine.action.dialog.monolog}
 * @constructs
 */
bigine.action.dialog.monolog = function(line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    this.uuid();
    this.$prototype = 'bigine.action.dialog.monolog';
    this.words = this.$content;
};
bigine.action.dialog.monolog.prototype = new bigine.tag.action();

/**
 * 获取是否预期内容。
 *
 * @return {Boolean}
 */
bigine.action.dialog.monolog.prototype.$expectContent = function() {
    return true;
};

/**
 * 绑定运行时（对象化所需人物）。
 *
 * @param  {bigine.core.runtime} runtime
 * @return {bigine.action.dialog.speak}
 */
bigine.action.dialog.monolog.prototype.bind = function(runtime) {
    this.player = runtime.player();
    return bigine.tag.action.prototype.bind.call(this, runtime);
};

/**
 * 执行。
 *
 * @param  {Object} context
 * @return {bigine.util.q.deferred.promise}
 */
bigine.action.dialog.monolog.prototype.act = function(context) {
    return context.director.say(context, this.player, this.words);
};

module.exports = bigine.action.dialog.monolog;
