/**
 * 定义事件动作抽象组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('bigine/core/component').$namespace('.tag');

bigine.core.tag = require('bigine/core/tag');

/**
 * 事件动作抽象组件。
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.tag.action}
 * @constructor
 * @extends {bigine.core.tag}
 */
bigine.tag.action = bigine.core.component.$extends(bigine.core.tag, function(line, params, content) {
    bigine.core.tag.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.tag.action';
});

/** @inheritDoc */
bigine.tag.action.prototype.$expectContent = function() {
    return false;
};

/**
 * 拆分内容为数组。
 *
 * @param  {Number=} max
 * @return {Array<String>}
 */
bigine.tag.action.prototype.$splitContent = function(max) {
    var params = this.$content ? this.$content.split('，') : [];
    if (max && params.length > max) {
        throw new bigine.error('内容扩展参数个数不匹配', this.$line);
    }
    return params;
};

/**
 * 检查状态是否满足自身要求。
 *
 * @param  {bigine.runtime.state} state
 * @return {Boolean}
 */
bigine.tag.action.prototype.test = function(state) {
    console.log(this);
    throw new bigine.error('动作“' + this.$prototype + '”无检查功能', this.$line);
};

/**
 * 执行。
 *
 * @param  {{director, state}} context
 * @return {bigine.util.q.deferred.promise}
 */
bigine.tag.action.prototype.act = function(context) {
    console.log(this);
    throw new bigine.error('动作“' + this.$prototype + '”无逻辑内容', this.$line);
};

module.exports = bigine.tag.action;
