/**
 * 定义地图模板组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 DaHao.de
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../../bigine').$namespace('.entity.map.template')
    .$import('.tag.entity')
    .$import('.util'),
    $ = {};

/**
 * 地图模板组件。
 *
 * - 参数：无
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
 * @return {bigine.entity.map.template}
 * @constructor
 * @extends {bigine.tag.entity}
 */
bigine.entity.map.template = bigine.$extends(bigine.tag.entity, function (line, params, content) {
    bigine.tag.entity.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.entity.map.template';

    /**
     * 底图。
     *
     * @type {bigine.entity.map.template.base}
     */
    this.image = undefined;

    /**
     * 交互点集合。
     *
     * @type {bigine.entity.map.template.point}
     */
    this.points = {
        length: 0
    };
});

/** @inheritDoc */
bigine.entity.map.template.prototype.$expectChildren = function() {
    return {
        'bigine.entity.map.base': 'image',
        'bigine.entity.map.template.point': true
    };
};

/** @inheritDoc */
bigine.entity.map.template.prototype.$register = function(episode) {
    episode.mapt(this);
    bigine.util.each(this.$children, $.point, this);
    return bigine.tag.entity.prototype.$register.call(this, episode);
};

/**
 * 注册交互点。
 *
 * @param  {bigine.core.taag} item
 * @param  {Number} index
 * @return {void}
 * @this {bigine.entity.map.template}
 */
$.point = function(item, index) {
    if ('bigine.entity.map.template.point' == item.$prototype) {
        this.points[item.title] = item;
        this.points.length++;
    }
};

module.exports = bigine.entity.map.template;
