/**
 * 定义对白事件动作组件。
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
 * 对白事件动作组件。
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.action.dialog.speak}
 * @constructor
 * @extends {bigine.tag.action}
 */
bigine.action.dialog.speak = bigine.core.component.$extends(bigine.tag.action, function(line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.action.dialog.speak';
    this.uuid();
    this.from = this.$params[0];
    this.to = this.$params[1];
    this.nick = this.$params[2] || this.$params[0];
    this.words = this.$content;
});

/** @inheritDoc */
bigine.action.dialog.speak.prototype.$expectParams = function() {
    return [2, 3];
};

/** @inheritDoc */
bigine.action.dialog.speak.prototype.$expectContent = function() {
    return true;
};

/** @inheritDoc */
bigine.action.dialog.speak.prototype.bind = function(episode) {
    this.from = episode.character(this.from);
    this.to = episode.character(this.to);
    return bigine.tag.action.prototype.bind.call(this, episode);
};

/** @inheritDoc */
bigine.action.dialog.speak.prototype.act = function(context) {
    return context.director.say(context, this.from, this.words.replace(/〈(.+)〉/g, function (match, p1) {
        return context.state[p1];
    }), this.nick);
};

module.exports = bigine.action.dialog.speak;
