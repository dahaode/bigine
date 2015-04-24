/**
 * 定义播放音乐事件动作组件。
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
 * 播放音乐事件动作组件。
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.action.room.bgm}
 * @constructor
 * @extends {bigine.tag.action}
 */
bigine.action.room.bgm = bigine.core.component.$extends(bigine.tag.action, function(line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.action.room.bgm';
    this.bgm = this.$params[0];
});

/** @inheritDoc */
bigine.action.room.bgm.prototype.$expectParams = function() {
    return [1, 1];
};

/** @inheritDoc */
bigine.action.room.bgm.prototype.bind = function(episode) {
    this.bgm = episode.bgm(this.bgm);
    return bigine.tag.action.prototype.bind.call(this, episode);
};

/** @inheritDoc */
bigine.action.room.bgm.prototype.act = function(context) {
    return context.director.bgm(context, this.bgm);
};

module.exports = bigine.action.room.bgm;
