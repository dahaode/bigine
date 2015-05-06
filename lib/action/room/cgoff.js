/**
 * 定义关闭特写事件动作组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../../bigine').$namespace('.action.room')
    .$import('.tag.action');

/**
 * 关闭特写事件动作组件。
 *
 * - 参数：无
 * - 内容：无
 * - 子项：无
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.action.room.cgoff}
 * @constructor
 * @extends {bigine.tag.action}
 */
bigine.action.room.cgoff = bigine.$extends(bigine.tag.action, function(line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.action.room.cgoff';
});

/** @inheritDoc */
bigine.action.room.cgoff.prototype.act = function(context) {
    return context.director.cg(context);
};

module.exports = bigine.action.room.cgoff;
