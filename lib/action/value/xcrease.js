/**
 * 定义增加数据事件动作组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 DaHao.de
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../../bigine').$namespace('.action.value')
    .$import('.tag.action');

/**
 * 增加数据事件动作组件。
 *
 * - 参数：名称
 * - 内容：值
 * - 子项：无
 *
 * ```
 * {key, value}
 * ```
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.action.value.xcrease}
 * @constructor
 * @extends {bigine.tag.action}
 */
bigine.action.value.xcrease = bigine.$extends(bigine.tag.action, function (line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.action.value.xcrease';

    /**
     * 名称。
     *
     * @type {String}
     */
    this.key = params[0];

    /**
     * 值。
     *
     * @type {String}
     */
    this.value = content;

    if (/^-?\d+$/.test(content)) {
        this.value = parseInt(content, 10);
    }
});

/** @inheritDoc */
bigine.action.value.xcrease.prototype.$expectParams = function() {
    return [1, 1];
};

/** @inheritDoc */
bigine.action.value.xcrease.prototype.$expectContent = function() {
    return true;
};

/** @inheritDoc */
bigine.action.value.xcrease.prototype.act = function(context) {
    if (!context.state[this.key]) {
        context.state[this.key] = this.value;
    } else {
        context.state[this.key] += this.value;
    }
    context.logger.debug('   [state]', this.key, '=', context.state[this.key]);
    return context.director.oops(context);
};

module.exports = bigine.action.value.xcrease;
