/**
 * 定义地图实体底图标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../../bigine').$namespace('.entity.map')
    .$import('.core.tag');

/**
 * 地图实体底图标签组件。
 *
 * - 参数：无
 * - 内容：图片编号
 * - 子项：无
 *
 * ```
 * {src}
 * ```
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.entity.map.base}
 * @constructor
 * @extends {bigine.core.tag}
 */
bigine.entity.map.base = bigine.$extends(bigine.core.tag, function(line, params, content) {
    bigine.core.tag.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.entity.map.base';

    /**
     * 图片编号。
     *
     * @type {String}
     */
    this.src = content;
});

module.exports = bigine.entity.map.base;
