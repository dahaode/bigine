/**
 * 定义关闭特写事件动作组件。
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
 * 关闭特写事件动作组件。
 *
 * @param  {Integer} line 在脚本源代码中地行号
 * @param  {Array} params 参数数组
 * @param  {String} content 内容
 * @return {bigine.action.room.cgoff}
 * @constructs
 */
bigine.action.room.cgoff = function(line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    this.$prototype = 'bigine.action.room.cgoff';
};
bigine.action.room.cgoff.prototype = new bigine.tag.action();

/**
 * 执行。
 *
 * @param  {Object} context
 * @return {bigine.util.q.deferred.promise}
 */
bigine.action.room.cgoff.prototype.act = function(context) {
    return context.director.cg(context);
};

module.exports = bigine.action.room.cgoff;
