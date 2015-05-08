/**
 * 定义播放音效事件动作组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../../bigine').$namespace('.action.room')
    .$import('.tag.action');

/**
 * 播放音效事件动作组件。
 *
 * - 参数：名称
 * - 内容：无
 * - 子项：无
 *
 * ```
 * {se}
 * ```
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.action.room.sound}
 * @constructor
 * @extends {bigine.tag.action}
 */
bigine.action.room.sound = bigine.$extends(bigine.tag.action, function (line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.action.room.sound';

    /**
     * 音效实体。
     *
     * @type {bigine.entity.se}
     */
    this.se = params[0];
});

/** @inheritDoc */
bigine.action.room.sound.prototype.$expectParams = function() {
    return [1, 1];
};

/** @inheritDoc */
bigine.action.room.sound.prototype.$bind = function(episode) {
    bigine.tag.action.prototype.$bind.call(this, episode);
    this.se = episode.se(this.se);
    return this;
};

/** @inheritDoc */
bigine.action.room.sound.prototype.act = function(context) {
    return context.director.se(context, this.se);
};

module.exports = bigine.action.room.sound;
