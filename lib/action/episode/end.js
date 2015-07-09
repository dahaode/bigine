/**
 * 定义完结动画事件动作组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 DaHao.de
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../../bigine').$namespace('.action.episode')
    .$import('.tag.action');

/**
 * 完结动画事件动作组件。
 *
 * - 参数：无
 * - 内容：无
 * - 子项：无
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.action.episode.end}
 * @constructor
 * @extends {bigine.tag.action}
 */
bigine.action.episode.end = bigine.$extends(bigine.tag.action, function (line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.action.episode.end';
});

/** @inheritDoc */
bigine.action.episode.end.prototype.act = function(context) {
    return context.director.end(context).then(function () {
        context.dispatch(new bigine.runtime.event.end());
    }).pass(context);
};

module.exports = bigine.action.episode.end;
