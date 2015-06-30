/**
 * 定义播放音乐事件动作组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 DaHao.de
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

    if (Object.defineProperties) {
        var self = this,
            $this = {};
        Object.defineProperties(this, {
            bgm: {
                get: function() {
                    return $this.bgm;
                },
                set: function(value) {
                    $this.bgm = value;
                    self.$params = [value.id || value];
                }
            }
        });
    }

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
    this.bgm = episode.bgm(this.bgm);
    return bigine.tag.action.prototype.$bind.call(this, episode);
};

/** @inheritDoc */
bigine.action.room.bgm.prototype.act = function(context) {
    context.logger.info(' [episode] 播放背景音乐【', this.bgm.title, '】');
    return context.director.playBGM(this, context);
};

module.exports = bigine.action.room.bgm;
