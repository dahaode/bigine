/**
 * 定义剧情失败事件动作组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('bigine/core/component').$namespace('.action.episode');

bigine.tag = {};
bigine.tag.action = require('bigine/tag/action');

/**
 * 剧情失败事件动作组件。
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.action.episode.over}
 * @constructor
 * @extends {bigine.tag.action}
 */
bigine.action.episode.over = bigine.core.component.$extends(bigine.tag.action, function(line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.action.episode.over';
});

/** @inheritDoc */
bigine.action.episode.over.prototype.act = function(context) {
    return context.director.oops(context);
};

module.exports = bigine.action.episode.over;
