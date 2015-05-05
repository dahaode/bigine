/**
 * 定义地图对象交互点区域标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('bigine/core/component').$namespace('.object.map.point', require('bigine/object/map/point'));

bigine.core.tag = require('bigine/core/tag');

/**
 * 地图对象交互点区域标签组件。
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.object.map.point}
 * @constructor
 * @extends {bigine.core.tag}
 */
bigine.object.map.point.region = bigine.core.component.$extends(bigine.core.tag, function(line, params, content) {
    bigine.core.tag.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.object.map.point.region';
    this.coords = this.$content;
});

module.exports = bigine.object.map.point.region;
