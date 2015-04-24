/**
 * 定义多对象共用地画面标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('bigine/core/component').$namespace('.object.common');

bigine.core.tag = require('bigine/core/tag');

/**
 * 多对象共用地画面标签组件。
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.object.common.image}
 * @constructor
 * @extends {bigine.core.tag}
 */
bigine.object.common.image = bigine.core.component.$extends(bigine.core.tag, function(line, params, content) {
    bigine.core.tag.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.object.common.image';
});

module.exports = bigine.object.common.image;
