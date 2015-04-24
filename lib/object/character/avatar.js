/**
 * 定义人物对象头像标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('bigine/core/component').$namespace('.object.character', require('bigine/object/character'));

bigine.core.tag = require('bigine/core/tag');

/**
 * 人物对象头像标签组件。
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.object.character.avatar}
 * @constructor
 * @extends {bigine.core.tag}
 */
bigine.object.character.avatar = bigine.core.component.$extends(bigine.core.tag, function(line, params, content) {
    bigine.core.tag.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.object.character.avatar';
});

module.exports = bigine.object.character.avatar;
