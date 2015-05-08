/**
 * 定义地图实体组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../bigine').$namespace('.entity')
    .$import('.tag.entity');

/**
 * 地图实体组件。
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
     * 交互点集合。
     *
     * @type {bigine.entity.map.point}
     */
    this.points = {
        length: 0
    };
});

/** @inheritDoc */
bigine.entity.map.prototype.$expectChildren = function() {
    return {
        'bigine.entity.map.base': 'image',
        'bigine.entity.map.point': true
    };
};

/** @inheritDoc */
bigine.entity.map.prototype.$register = function(episode) {
    bigine.tag.entity.prototype.$register.call(this, episode);
    episode.map(this);
    return this;
};

/** @inheritDoc */
bigine.entity.map.prototype.$bind = function(episode) {
    bigine.tag.entity.prototype.$bind.call(this, episode);
    for (var ii = 0; ii < this.$children.length; ii++) {
        if ('bigine.entity.map.point' == this.$children[ii].$prototype) {
            this.points[this.$children[ii].title] = this.$children[ii];
            this.points.length++;
        }
    }
    return this;
};

module.exports = bigine.entity.map;
