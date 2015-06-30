/**
 * 定义进入房间事件动作组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 DaHao.de
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../../bigine').$namespace('.action.room')
    .$import('.error')
    .$import('.tag.action')
    .$import('.util.promise');

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

    if (Object.defineProperties) {
        var self = this,
            $this = {};
        Object.defineProperties(this, {
            room: {
                get: function() {
                    return $this.room;
                },
                set: function(value) {
                    $this.room = value;
                    self.$params = [value.id || value];
                }
            }
        });
    }

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
    var self = this;
    if (context.state['$r'] == this.room) {
        return context.director.rest(context).then(function () {
            return context.director.free(context);
        });
    }
    this.room.enter(context).fail(function (error) {
        context.logger.error(error);
    });
    return bigine.util.promise.reject(bigine.error.halt());
};

module.exports = bigine.action.room.move;
