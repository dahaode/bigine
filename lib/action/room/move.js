/**
 * 定义进入房间事件动作组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../../bigine').$namespace('.action.room')
    .$import('.tag.action');

/**
 * 进入房间事件动作组件。
 *
 * - 参数：名称
 * - 内容：无
 * - 子项：无
 *
 * ```
 * {room}
 * ```
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.action.room.move}
 * @constructor
 * @extends {bigine.tag.action}
 */
bigine.action.room.move = bigine.$extends(bigine.tag.action, function (line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.action.room.move';

    /**
     * 房间实体。
     *
     * @type {bigine.entity.room}
     */
    this.room = params[0];
});

/** @inheritDoc */
bigine.action.room.move.prototype.$expectParams = function() {
    return [1, 1];
};

/** @inheritDoc */
bigine.action.room.move.prototype.$bind = function(episode) {
    this.room = episode.room(this.room);
    return bigine.tag.action.prototype.$bind.call(this, episode);
};

/** @inheritDoc */
bigine.action.room.move.prototype.act = function(context) {
    var promise = context.state['当前房间'] ?
        context.state['当前房间'].leave(context) :
        context.director.oops(context),
        self = this;
    return promise.then(function () {
        return context.director.room(context);
    }).then(function () {
        context.logger.debug('[state] 当前房间 =', self.room);
        context.state['当前房间'] = self.room;
        return context.director.room(context, self.room);
    }).then(function () {
        return context.state['当前房间'].enter(context);
    });
};

module.exports = bigine.action.room.move;
