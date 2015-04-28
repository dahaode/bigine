/**
 * 定义地图对象底图标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('bigine/core/component').$namespace('.object.map', require('bigine/object/map'));

bigine.core.tag = require('bigine/core/tag');

/**
 * 地图对象底图标签组件。
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.object.map.base}
 * @constructor
 * @extends {bigine.core.tag}
 */
bigine.object.map.base = bigine.core.component.$extends(bigine.core.tag, function(line, params, content) {
    bigine.core.tag.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.object.map.base';
});

module.exports = bigine.object.map.base;
