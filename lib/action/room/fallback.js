/**
 * 定义显示房间事件动作组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../../bigine').$namespace('.action.room')
    .$import('.tag.action');

/**
 * 设置房间事件动作组件。
 *
 * - 参数：无
 * - 内容：无
 * - 子项：无
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.action.room.fallback}
 * @constructor
 * @extends {bigine.tag.action}
 */
bigine.action.room.fallback = bigine.$extends(bigine.tag.action, function (line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.action.room.fallback';
});

/** @inheritDoc */
bigine.action.room.fallback.prototype.act = function(context) {
    return context.director.curtain(context, false);
};

module.exports = bigine.action.room.fallback;