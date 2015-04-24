/**
 * 定义设置数值事件动作组件。
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
 * 设置数值事件动作组件。
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.action.value.assign}
 * @constructor
 * @extends {bigine.tag.action}
 */
bigine.action.value.assign = bigine.core.component.$extends(bigine.tag.action, function(line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.action.value.assign';
    this.key = this.$params[0];
    this.value = this.$content;
});

/** @inheritDoc */
bigine.action.value.assign.prototype.$expectParams = function() {
    return [1, 1];
};

/** @inheritDoc */
bigine.action.value.assign.prototype.$expectContent = function() {
    return true;
};

/** @inheritDoc */
bigine.action.value.assign.prototype.act = function(context) {
    context.state[this.key] = this.value;
    return context.director.oops(context);
};

module.exports = bigine.action.value.assign;
