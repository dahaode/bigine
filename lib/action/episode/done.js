/**
 * 定义剧情完结事件动作组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../../bigine').$namespace('.action.episode')
    .$import('.tag.action');

/**
 * 剧情完结事件动作组件。
 *
 * - 参数：无
 * - 内容：无
 * - 子项：无
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.action.episode.done}
 * @constructor
 * @extends {bigine.tag.action}
 */
bigine.action.episode.done = bigine.$extends(bigine.tag.action, function (line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.action.episode.done';
});

/** @inheritDoc */
bigine.action.episode.done.prototype.act = function(context) {
    context.episode.done(context);
    return bigine.util.promise.reject(bigine.error.halt());
};

module.exports = bigine.action.episode.done;
