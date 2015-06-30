/**
 * 定义设置房间事件动作组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 DaHao.de
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../../bigine').$namespace('.action.room')
    .$import('.tag.action');

/**
 * 设置房间事件动作组件。
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
 * @return {bigine.action.room.fake}
 * @constructor
 * @extends {bigine.tag.action}
 */
bigine.action.room.fake = bigine.$extends(bigine.tag.action, function (line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.action.room.fake';

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
bigine.action.room.fake.prototype.$expectParams = function() {
    return [1, 1];
};

/** @inheritDoc */
bigine.action.room.fake.prototype.$bind = function(episode) {
    this.room = episode.room(this.room);
    return bigine.tag.action.prototype.$bind.call(this, episode);
};

/** @inheritDoc */
bigine.action.room.fake.prototype.act = function(context) {
    return context.director.setRoom(this, context);
};

module.exports = bigine.action.room.fake;
