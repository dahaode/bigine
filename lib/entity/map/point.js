/**
 * 定义地图实体交互点标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../../bigine').$namespace('.entity.map')
    .$import('.core.tag');

/**
 * 地图实体交互点标签组件。
 *
 * - 参数：无
 * - 内容：名称
 * - 子项：房间、高亮图、座标区域
 *
 * ```
 * {
 *   title,
 *   target: {room},
 *   image: {src},
 *   region: {top, right, bottom, left}
 * }
 * ```
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.entity.map.point}
 * @constructor
 * @extends {bigine.core.tag}
 */
bigine.entity.map.point = bigine.$extends(bigine.core.tag, function(line, params, content) {
    bigine.core.tag.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.entity.map.point';

    /**
     * 名称。
     *
     * @type {String}
     */
    this.title = content;

    /**
     * 目标房间。
     *
     * @type {bigine.entity.map.point.room}
     */
    this.target =

    /**
     * 高亮图。
     *
     * @type {bigine.entity.map.point.hilite}
     */
    this.image =

    /**
     * 坐标区域。
     *
     * @type {bigine.entity.map.point.region}
     */
    this.region = undefined;
});

/** @inheritDoc */
bigine.entity.map.point.prototype.$expectChildren = function() {
    return {
        'bigine.entity.map.point.room': 'target',
        'bigine.entity.map.point.hilite': 'image',
        'bigine.entity.map.point.region': 'region'
    };
};

/** @inheritDoc */
bigine.entity.map.point.prototype.$bind = function(episode) {
    bigine.core.tag.prototype.$bind.call(this, episode);
    if (!this.target || !this.image || !this.region) {
        throw new bigine.error('不完整地交互点“' + this.title + '”', this.$line);
    }
    return this;
};

module.exports = bigine.entity.map.point;
