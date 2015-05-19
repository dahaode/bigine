/**
 * 定义天气实体组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../bigine').$namespace('.entity')
    .$import('.tag.entity');

/**
 * 天气实体组件。
 *
 * - 参数：无
 * - 内容：名称
 * - 子项：图片
 *
 * ```
 * {
 *   id,
 *   title,
 *   image: {src}
 * }
 * ```
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.entity.weather}
 * @constructor
 * @extends {bigine.tag.entity}
 */
bigine.entity.weather = bigine.$extends(bigine.tag.entity, function (line, params, content) {
    bigine.tag.entity.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.entity.weather';

    /**
     * 图片。
     *
     * @type {bigine.entity.common.image}
     */
    this.image = undefined;
});

/** @inheritDoc */
bigine.entity.weather.prototype.$expectChildren = function() {
    return {
        'bigine.entity.common.image': 'image'
    };
};

/** @inheritDoc */
bigine.entity.weather.prototype.$register = function(episode) {
    episode.weather(this);
    return bigine.tag.entity.prototype.$register.call(this, episode);
};

module.exports = bigine.entity.weather;
