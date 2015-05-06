/**
 * 定义当数据事件动作组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../../bigine').$namespace('.action.value')
    .$import('.tag.action');

/**
 * 当数据事件动作组件。
 *
 * - 参数：名称、预期值
 * - 内容：无
 * - 子项：无
 *
 * ```
 * {key, expected}
 * ```
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.action.value.assert}
 * @constructor
 * @extends {bigine.tag.action}
 */
bigine.action.value.assert = bigine.$extends(bigine.tag.action, function(line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.action.value.assert';

    /**
     * 名称。
     *
     * @type {String}
     */
    this.key = params[0];

    /**
     * 预期值。
     *
     * @type {String}
     */
    this.expected = params[1];
});

/** @inheritDoc */
bigine.action.value.assert.prototype.$expectParams = function() {
    return [2, 2];
};

/** @inheritDoc */
bigine.action.value.assert.prototype.test = function(state) {
    return state[this.key] == this.expected;
};

/** @inheritDoc */
bigine.action.value.assert.prototype.act = function(context) {
    context.state['$v'] = this.test(context.state);
    return context.director.oops(context);
};

module.exports = bigine.action.value.assert;
