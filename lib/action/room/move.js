/**
 * 定义进入房间事件动作组件。
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
    },
    util: {
        helper: require('bigine/util/helper')
    }
};

/**
 * 进入房间事件动作组件。
 *
 * @param  {Integer} line 在脚本源代码中地行号
 * @param  {Array} params 参数数组
 * @param  {String} content 内容
 * @return {bigine.action.room.move}
 * @constructs
 */
bigine.action.room.move = function(line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    this.$prototype = 'bigine.action.room.move';
    this.room = this.$params[0];
};
bigine.action.room.move.prototype = new bigine.tag.action();

/**
 * 获取预期参数个数。
 *
 * @return {Array}
 */
bigine.action.room.move.prototype.$expectParams = function() {
    return [1, 1];
};

/**
 * 绑定运行时（对象化所需房间）。
 *
 * @param  {bigine.core.runtime} runtime
 * @return {bigine.action.room.move}
 */
bigine.action.room.move.prototype.bind = function(runtime) {
    this.room = runtime.room(this.room);
    return bigine.tag.action.prototype.bind.call(this, runtime);
};

/**
 * 执行。
 *
 * @param  {Object} context
 * @return {bigine.util.q.deferred.promise}
 */
bigine.action.room.move.prototype.act = function(context) {
    var promise = context.state['当前房间'] ?
        context.state['当前房间'].leave(context) :
        bigine.util.helper.promise.resolved(context),
        $this = this;
    return promise.then(function () {
        return context.director.room(context).then(function () {
            context.state['当前房间'] = $this.room;
            return context.director.room(context, $this.room);
        }).then(function () {
            return context.state['当前房间'].enter(context);
        });
    });
};

module.exports = bigine.action.room.move;
