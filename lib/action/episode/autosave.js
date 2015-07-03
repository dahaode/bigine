/**
 * 定义自动存档事件动作组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 DaHao.de
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../../bigine').$namespace('.action.episode')
    .$import('.tag.action');

/**
 * 自动存档事件动作组件。
 *
 * - 参数：无
 * - 内容：无
 * - 子项：无
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.action.episode.autosave}
 * @constructor
 * @extends {bigine.tag.action}
 */
bigine.action.episode.autosave = bigine.$extends(bigine.tag.action, function (line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.action.episode.autosave';
});

/** @inheritDoc */
bigine.action.episode.autosave.prototype.act = function(context) {
    context.logger.info(' [runtime] AUTOSAVE');
    context.state.save();
    return context.director.oops(context);
};

module.exports = bigine.action.episode.autosave;
