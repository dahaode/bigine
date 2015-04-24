/**
 * 定义设置天气事件动作组件。
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
 * 设置天气事件动作组件。
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.action.room.weather}
 * @constructor
 * @extends {bigine.tag.action}
 */
bigine.action.room.weather = bigine.core.component.$extends(bigine.tag.action, function(line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.action.room.weather';
    this.weather = this.$params[0];
});

/** @inheritDoc */
bigine.action.room.weather.prototype.$expectParams = function() {
    return [1, 1];
};

/** @inheritDoc */
bigine.action.room.weather.prototype.bind = function(episode) {
    this.weather = episode.weather(this.weather);
    return bigine.tag.action.prototype.bind.call(this, episode);
};

/** @inheritDoc */
bigine.action.room.weather.prototype.act = function(context) {
    return context.director.weather(context, this.weather);
};

module.exports = bigine.action.room.weather;
