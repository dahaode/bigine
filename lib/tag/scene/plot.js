/**
 * 定义事件情节（内容）标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 DaHao.de
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../../bigine').$namespace('.tag.scene')
    .$import('.core.tag')
    .$import('.util.promise');

/**
 * 事件情节（内容）标签组件。
 *
 * - 参数：无
 * - 内容：无
 * - 子项：情节动作
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.tag.scene.plot}
 * @constructor
 * @extends {bigine.core.tag}
 */
bigine.tag.scene.plot = bigine.$extends(bigine.core.tag, function (line, params, content) {
    bigine.core.tag.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.tag.scene.plot';
});

/** @inheritDoc */
bigine.tag.scene.plot.prototype.$expectContent = function() {
    return false;
};

/** @inheritDoc */
bigine.tag.scene.plot.prototype.$expectChildren = function() {
    return {
        '*': true
    };
};

/**
 * 执行。
 *
 * @param  {Object} context
 * @return {bigine.util.promise}
 */
bigine.tag.scene.plot.prototype.play = function(context) {
    return bigine.util.promise.every(this.$children, 'act', context, function(action) {
        context.logger.debug('  [action]', action);
    });
};

module.exports = bigine.tag.scene.plot;
