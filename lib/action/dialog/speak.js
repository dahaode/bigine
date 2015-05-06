/**
 * 定义对白事件动作组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../../bigine').$namespace('.action.dialog')
    .$import('.tag.action')
    .$import('.util');

/**
 * 对白事件动作组件。
 *
 * - 参数：讲话人、听众、昵称
 * - 内容：文本
 * - 子项：无
 *
 * ```
 * {id, from, to, nick, words}
 * ```
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.action.dialog.speak}
 * @constructor
 * @extends {bigine.tag.action}
 */
bigine.action.dialog.speak = bigine.$extends(bigine.tag.action, function(line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.action.dialog.speak';

    /**
     * 编号。
     *
     * @type {String}
     */
    this.id = bigine.util.uuid();

    /**
     * 文本。
     *
     * @type {String}
     */
    this.words = content;

    /**
     * 讲话人。
     *
     * @type {bigine.entity.character}
     */
    this.from = params[0];

    /**
     * 听众。
     *
     * @type {bigine.entity.character}
     */
    this.to = params[1];

    /**
     * 昵称。
     *
     * @type {String}
     */
    this.nick = params[2];
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
bigine.action.dialog.speak.prototype.$bind = function(episode) {
    bigine.tag.action.prototype.$bind.call(this, episode);
    this.from = episode.character(this.from);
    this.to = episode.character(this.to);
    this.nick = this.nick || this.from.title;
    return this;
};

/** @inheritDoc */
bigine.action.dialog.speak.prototype.act = function(context) {
    return context.director.say(context, this.from, this.words.replace(/〈(.+)〉/g, function (match, p1) {
        return context.state[p1];
    }), this.nick);
};

module.exports = bigine.action.dialog.speak;
