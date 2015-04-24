/**
 * 定义旁白事件动作组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('bigine/core/component').$namespace('.action.dialog');

bigine.tag = {};
bigine.tag.action = require('bigine/tag/action');

/**
 * 旁白事件动作组件。
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.action.dialog.voiceover}
 * @constructor
 * @extends {bigine.tag.action}
 */
bigine.action.dialog.voiceover = bigine.core.component.$extends(bigine.tag.action, function(line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.action.dialog.voiceover';
    this.uuid();
    this.words = this.$content;
});

/** @inheritDoc */
bigine.action.dialog.voiceover.prototype.$expectContent = function() {
    return true;
};

/** @inheritDoc */
bigine.action.dialog.voiceover.prototype.act = function(context) {
    return context.director.voiceover(context, this.words);
};

module.exports = bigine.action.dialog.voiceover;
