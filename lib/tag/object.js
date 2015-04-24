/**
 * 定义实体对象抽象组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('bigine/core/component').$namespace('.tag');

bigine.core.tag = require('bigine/core/tag');

/**
 * 实体对象标签组件。
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.tag.object}
 * @constructor
 * @extends {bigine.core.tag}
 */
bigine.tag.object = bigine.core.component.$extends(bigine.core.tag, function(line, params, content) {
    bigine.core.tag.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.tag.object';
    this.id =
    this.title = content;
});

module.exports = bigine.tag.object;
