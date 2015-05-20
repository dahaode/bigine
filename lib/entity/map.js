/**
 * 定义地图实体组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../bigine').$namespace('.entity')
    .$import('.error')
    .$import('.tag.entity')
    .$import('.util.promise'),
    $ = {};

/**
 * 地图实体组件。
 *
 * - 参数：地图模板
 * - 内容：名称
 * - 子项：底图、交互点集合
 *
 * ```
 * {
 *   id,
 *   title,
 *   image: {src},
 *   points: {
 *     length,
 *     <TITLE>: {
 *       target: {room},
 *       image: {src},
 *       region: {top, right, bottom, left}
 *     }
 *   }
 * }
 * ```
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.entity.map}
 * @constructor
 * @extends {bigine.tag.entity}
 */
bigine.entity.map = bigine.$extends(bigine.tag.entity, function (line, params, content) {
    bigine.tag.entity.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.entity.map';

    /**
     * 底图。
     *
     * @type {bigine.entity.map.base}
     */
    this.image = undefined;

    /**
     * 模板。
     *
     * @type {bigine.entity.map.template}
     */
    this.template = params[0];

    /**
     * 交互点集合。
     *
     * @type {bigine.entity.map.point}
     */
    this.points = {
        length: 0
    };
});

/** @inheritDoc */
bigine.entity.map.prototype.$expectParams = function() {
    return [0, 1];
};

/** @inheritDoc */
bigine.entity.map.prototype.$expectChildren = function() {
    return {
        'bigine.entity.map.base': 'image',
        'bigine.entity.map.point': true
    };
};

/** @inheritDoc */
bigine.entity.map.prototype.$register = function(episode) {
    episode.map(this);
    if (this.template) {
        if (this.image) {
            return bigine.util.promise.reject(new bigine.error('无法重载地图模板的底图', this.$line));
        }
        this.template = episode.mapt(this.template);
    }
    bigine.util.each(this.$children, $.point, this);
    return bigine.tag.entity.prototype.$register.call(this, episode);
};

/**
 * 指定交互点依赖地图模板。
 *
 * @param  {bigine.entity.map.point} item
 * @param  {Number} index
 * @return {void}
 * @this {bigine.entity.map}
 */
$.point = function(item, index) {
    if ('bigine.entity.map.point' == item.$prototype) {
        item.mapt = this.template;
        this.points[item.title] = item;
        this.points.length++;
    }
};

module.exports = bigine.entity.map;
