/**
 * 定义游戏失败事件动作组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('bigine/core/component').$namespace('.action.game');

bigine.tag = {};
bigine.tag.action = require('bigine/tag/action');

/**
 * 游戏失败事件动作组件。
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.action.game.over}
 * @constructor
 * @extends {bigine.tag.action}
 */
bigine.action.game.over = bigine.core.component.$extends(bigine.tag.action, function(line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.action.game.over';
});

/** @inheritDoc */
bigine.action.game.over.prototype.act = function(context) {
    return context.director.oops(context);
};

module.exports = bigine.action.game.over;
