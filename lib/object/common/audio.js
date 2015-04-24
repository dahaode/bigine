/**
 * 定义多对象共用地音源标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('bigine/core/component').$namespace('.object.common');

bigine.core.tag = require('bigine/core/tag');

/**
 * 多对象共用地音源标签组件。
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.object.common.audio}
 * @constructor
 * @extends {bigine.core.tag}
 */
bigine.object.common.audio = bigine.core.component.$extends(bigine.core.tag, function(line, params, content) {
    bigine.core.tag.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.object.common.audio';
});

module.exports = bigine.object.common.audio;
