/**
 * 定义地图模板交互点标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 DaHao.de
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../../../bigine').$namespace('.entity.map.template')
    .$import('.error')
    .$import('.core.tag')
    .$import('.util.promise');

/**
 * 地图模板交互点标签组件。
 *
 * - 参数：无
 * - 内容：名称
 * - 子项：房间、高亮图、座标区域
 *
 * ```
 * {
 *   title,
 *   image: {src},
 *   region: {top, right, bottom, left}
 * }
 * ```
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.entity.map.template.point}
 * @constructor
 * @extends {bigine.core.tag}
 */
bigine.entity.map.template.point = bigine.$extends(bigine.core.tag, function (line, params, content) {
    bigine.core.tag.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.entity.map.template.point';

    /**
     * 名称。
     *
     * @type {String}
     */
    this.title = content;

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
bigine.entity.map.template.point.prototype.$expectChildren = function() {
    return {
        'bigine.entity.map.point.hilite': 'image',
        'bigine.entity.map.point.region': 'region'
    };
};

/** @inheritDoc */
bigine.entity.map.template.point.prototype.$register = function(episode) {
    if (!this.image || !this.region) {
        return bigine.util.promise.reject(new bigine.error('交互点“' + this.title + '”信息不完整', this.$line));
    }
    return bigine.core.tag.prototype.$register.call(this, episode);
};

module.exports = bigine.entity.map.template.point;
