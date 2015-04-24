/**
 * 定义展示特写事件动作组件。
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
 * 展示特写事件动作组件。
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.action.room.cgon}
 * @constructor
 * @extends {bigine.tag.action}
 */
bigine.action.room.cgon = bigine.core.component.$extends(bigine.tag.action, function(line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.action.room.cgon';
    this.cg = this.$params[0];
});

/** @inheritDoc */
bigine.action.room.cgon.prototype.$expectParams = function() {
    return [1, 1];
};

/** @inheritDoc */
bigine.action.room.cgon.prototype.bind = function(episode) {
    this.cg = episode.cg(this.cg);
    return bigine.tag.action.prototype.bind.call(this, episode);
};

/** @inheritDoc */
bigine.action.room.cgon.prototype.act = function(context) {
    return context.director.cg(context, this.cg);
};

module.exports = bigine.action.room.cgon;
