/**
 * 定义地图实体交互点标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 DaHao.de
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../../bigine').$namespace('.entity.map')
    .$import('.error')
    .$import('.core.tag')
    .$import('.util.promise');

/**
 * 地图实体交互点标签组件。
 *
 * - 参数：模板交互点
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
bigine.entity.map.point = bigine.$extends(bigine.core.tag, function (line, params, content) {
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
     * 交互点模板。
     *
     * @type {bigine.entity.map.template.point}
     */
    this.template = params[0];

    /**
     * 地图模板。
     *
     * @type {bigine.entity.map.template}
     */
    this.mapt =

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
bigine.entity.map.point.prototype.$expectParams = function() {
    return [0, 1];
};

/** @inheritDoc */
bigine.entity.map.point.prototype.$expectChildren = function() {
    return {
        'bigine.entity.map.point.room': 'target',
        'bigine.entity.map.point.hilite': 'image',
        'bigine.entity.map.point.region': 'region'
    };
};

/** @inheritDoc */
bigine.entity.map.point.prototype.$register = function(episode) {
    try {
        var fault = 0;
        if (this.target) {
            if (this.template) {
                if (!this.mapt) {
                    throw new bigine.error('地图模板缺失', this.$line);
                }
                if (this.image || this.region) {
                    throw new bigine.error('无法重载地图模板交互点', this.$line);
                }
                if (!this.mapt.points[this.template]) {
                    throw new bigine.error('地图模板交互点“' + this.template + '”未定义', this.$line);
                }
                this.image = this.mapt.points[this.template].image;
                this.region = this.mapt.points[this.template].region;
            } else if (!this.image || !this.region) {
                fault = 1;
            }
        } else {
            fault = 1;
        }
        if (fault) {
            throw new bigine.error('交互点“' + this.title + '”信息不完整', this.$line);
        }
    } catch (error) {
        return bigine.util.promise.reject(error);
    }
    return bigine.core.tag.prototype.$register.call(this, episode);
};

module.exports = bigine.entity.map.point;
