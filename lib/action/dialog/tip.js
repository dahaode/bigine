/**
 * 定义提示事件动作组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 DaHao.de
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../../bigine').$namespace('.action.dialog')
    .$import('.tag.action')
    .$import('.util');

/**
 * 提示事件动作组件。
 *
 * - 参数：无
 * - 内容：文本
 * - 子项：无
 *
 * ```
 * {id, words}
 * ```
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.action.dialog.tip}
 * @constructor
 * @extends {bigine.tag.action}
 */
bigine.action.dialog.tip = bigine.$extends(bigine.tag.action, function (line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.action.dialog.tip';

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
});

/** @inheritDoc */
bigine.action.dialog.tip.prototype.$expectContent = function() {
    return true;
};

/** @inheritDoc */
bigine.action.dialog.tip.prototype.act = function(context) {
    context.logger.info(' [episode]', this.words);
    return context.director.tip(this, context);
};

module.exports = bigine.action.dialog.tip;
