/**
 * 定义播放音效事件动作组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('bigine/core/component').$namespace('.action.room');

bigine.tag = {};
bigine.tag.action = require('bigine/tag/action');

/**
 * 播放音效事件动作组件。
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.action.room.sound}
 * @constructor
 * @extends {bigine.tag.action}
 */
bigine.action.room.sound = bigine.core.component.$extends(bigine.tag.action, function(line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.action.room.sound';
    this.se = this.$params[0];
});

/** @inheritDoc */
bigine.action.room.sound.prototype.$expectParams = function() {
    return [1, 1];
};

/** @inheritDoc */
bigine.action.room.sound.prototype.bind = function(episode) {
    this.se = episode.se(this.se);
    return bigine.tag.action.prototype.bind.call(this, episode);
};

/** @inheritDoc */
bigine.action.room.sound.prototype.act = function(context) {
    return context.director.se(context, this.se);
};

module.exports = bigine.action.room.sound;
