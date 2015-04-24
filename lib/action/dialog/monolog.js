/**
 * 定义独白事件动作组件。
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
 * 独白事件动作组件。
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.action.dialog.monolog}
 * @constructor
 * @extends {bigine.tag.action}
 */
bigine.action.dialog.monolog = bigine.core.component.$extends(bigine.tag.action, function(line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.action.dialog.monolog';
    this.uuid();
    this.words = this.$content;
});

/** @inheritDoc */
bigine.action.dialog.monolog.prototype.$expectContent = function() {
    return true;
};

/** @inheritDoc */
bigine.action.dialog.monolog.prototype.bind = function(episode) {
    this.player = episode.player();
    return bigine.tag.action.prototype.bind.call(this, episode);
};

/** @inheritDoc */
bigine.action.dialog.monolog.prototype.act = function(context) {
    return context.director.say(context, this.player, this.words);
};

module.exports = bigine.action.dialog.monolog;
