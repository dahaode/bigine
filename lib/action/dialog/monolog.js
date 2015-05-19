/**
 * 定义独白事件动作组件。
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
 * 独白事件动作组件。
 *
 * - 参数：无
 * - 内容：文本
 * - 子项：无
 *
 * ```
 * {id, player, words}
 * ```
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.action.dialog.monolog}
 * @constructor
 * @extends {bigine.tag.action}
 */
bigine.action.dialog.monolog = bigine.$extends(bigine.tag.action, function (line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.action.dialog.monolog';

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
     * 主角。
     *
     * @type {bigine.entity.character}
     */
    this.player = undefined;
});

/** @inheritDoc */
bigine.action.dialog.monolog.prototype.$expectContent = function() {
    return true;
};

/** @inheritDoc */
bigine.action.dialog.monolog.prototype.$bind = function(episode) {
    this.player = episode.player();
    return bigine.tag.action.prototype.$bind.call(this, episode);
};

/** @inheritDoc */
bigine.action.dialog.monolog.prototype.act = function(context) {
    return context.director.say(context, this.player, this.words.replace(/〈(.+)〉/g, function (match, p1) {
        return context.state[p1];
    }));
};

module.exports = bigine.action.dialog.monolog;
