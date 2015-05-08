/**
 * 定义播放音乐事件动作组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../../bigine').$namespace('.action.room')
    .$import('.tag.action');

/**
 * 播放音乐事件动作组件。
 *
 * - 参数：名称
 * - 内容：无
 * - 子项：无
 *
 * ```
 * {bgm}
 * ```
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.action.room.bgm}
 * @constructor
 * @extends {bigine.tag.action}
 */
bigine.action.room.bgm = bigine.$extends(bigine.tag.action, function (line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.action.room.bgm';

    /**
     * 音乐实体。
     *
     * @type {bigine.entity.bgm}
     */
    this.bgm = params[0];
});

/** @inheritDoc */
bigine.action.room.bgm.prototype.$expectParams = function() {
    return [1, 1];
};

/** @inheritDoc */
bigine.action.room.bgm.prototype.$bind = function(episode) {
    bigine.tag.action.prototype.$bind.call(this, episode);
    this.bgm = episode.bgm(this.bgm);
    return this;
};

/** @inheritDoc */
bigine.action.room.bgm.prototype.act = function(context) {
    return context.director.bgm(context, this.bgm);
};

module.exports = bigine.action.room.bgm;
