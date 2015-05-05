/**
 * 定义剧情完结事件动作组件。
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
 * 剧情完结事件动作组件。
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.action.episode.finish}
 * @constructor
 * @extends {bigine.tag.action}
 */
bigine.action.episode.finish = bigine.core.component.$extends(bigine.tag.action, function(line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.action.episode.finish';
});

/** @inheritDoc */
bigine.action.episode.finish.prototype.act = function(context) {
    return context.director.oops(context);
};

module.exports = bigine.action.episode.finish;
