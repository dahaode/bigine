/**
 * 定义设置时间事件动作组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../../bigine').$namespace('.action.room')
    .$import('.tag.action');

/**
 * 设置时间事件动作组件。
 *
 * - 参数：时刻
 * - 内容：无
 * - 子项：无
 *
 * ```
 * {snap}
 * ```
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.action.room.layout}
 * @constructor
 * @extends {bigine.tag.action}
 */
bigine.action.room.layout = bigine.$extends(bigine.tag.action, function(line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.action.room.layout';

    /**
     * 时刻。
     *
     * @type {String}
     */
    this.snap = params[0];
});

/** @inheritDoc */
bigine.action.room.layout.prototype.$expectParams = function() {
    return [1, 1];
};

/** @inheritDoc */
bigine.action.room.layout.prototype.act = function(context) {
    return context.director.layout(context, this.snap);
};

module.exports = bigine.action.room.layout;
