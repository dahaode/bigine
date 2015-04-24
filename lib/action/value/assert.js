/**
 * 定义当数据事件动作组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('bigine/core/component').$namespace('.action.value');

bigine.tag = {};
bigine.tag.action = require('bigine/tag/action');

/**
 * 当数据事件动作组件。
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.action.value.assert}
 * @constructor
 * @extends {bigine.tag.action}
 */
bigine.action.value.assert = bigine.core.component.$extends(bigine.tag.action, function(line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.action.value.assert';
    this.key = this.$params[0];
    this.value = this.$params[1];
});

/** @inheritDoc */
bigine.action.value.assert.prototype.$expectParams = function() {
    return [2, 2];
};

/** @inheritDoc */
bigine.action.value.assert.prototype.test = function(state) {
    return state[this.key] == this.value;
};

module.exports = bigine.action.value.assert;
