/**
 * 定义设置天气事件动作组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../../bigine').$namespace('.action.room')
    .$import('.tag.action');

/**
 * 设置天气事件动作组件。
 *
 * - 参数：名称
 * - 内容：无
 * - 子项：无
 *
 * ```
 * {weather}
 * ```
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.action.room.weather}
 * @constructor
 * @extends {bigine.tag.action}
 */
bigine.action.room.weather = bigine.$extends(bigine.tag.action, function(line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.action.room.weather';

    /**
     * 天气实体。
     *
     * @type {bigine.entity.weather}
     */
    this.weather = params[0];
});

/** @inheritDoc */
bigine.action.room.weather.prototype.$expectParams = function() {
    return [1, 1];
};

/** @inheritDoc */
bigine.action.room.weather.prototype.$bind = function(episode) {
    bigine.tag.action.prototype.$bind.call(this, episode);
    this.weather = episode.weather(this.weather);
    return this;
};

/** @inheritDoc */
bigine.action.room.weather.prototype.act = function(context) {
    return context.director.weather(context, this.weather);
};

module.exports = bigine.action.room.weather;
