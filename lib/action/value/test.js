/**
 * 定义对比数据事件动作组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../../bigine').$namespace('.action.value')
    .$import('.tag.action');

/**
 * 对比数据事件动作组件。
 *
 * - 参数：名称
 * - 内容：无
 * - 子项：无
 *
 * ```
 * {key}
 * ```
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.action.value.test}
 * @constructor
 * @extends {bigine.tag.action}
 */
bigine.action.value.test = bigine.$extends(bigine.tag.action, function (line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.action.value.test';

    /**
     * 名称。
     *
     * @type {String}
     */
    this.key = params[0];
});

/** @inheritDoc */
bigine.action.value.test.prototype.$expectParams = function() {
    return [1, 1];
};

/** @inheritDoc */
bigine.action.value.test.prototype.$expectContent = function() {
    return false;
};

/** @inheritDoc */
bigine.action.value.test.prototype.act = function(context) {
    context.state['$v'] = context.state[this.key];
    context.logger.debug('   [state] $v =', context.state[this.key], '@', this.key);
    return context.director.oops(context);
};

module.exports = bigine.action.value.test;
