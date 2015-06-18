/**
 * 定义事件动作抽象组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 DaHao.de
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../bigine').$namespace('.tag')
    .$import('.error')
    .$import('.core.tag');

/**
 * 事件动作抽象组件。
 *
 * - 参数：无
 * - 内容：无
 * - 子项：无
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.tag.action}
 * @constructor
 * @extends {bigine.core.tag}
 */
bigine.tag.action = bigine.$extends(bigine.core.tag, function (line, params, content) {
    bigine.core.tag.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.tag.action';
});

/** @inheritDoc */
bigine.tag.action.prototype.$expectContent = function() {
    return false;
};

/** @inheritDoc */
bigine.tag.action.prototype.toScript = function(lineNumber) {
    var clob = bigine.core.tag.prototype.toScript.call(this, lineNumber);
    if (this.id) {
        clob = clob.substr(0, clob.length - 1) + ',"' + this.id + '")';
    }
    return clob;
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
        throw new bigine.error('内容扩展参数个数超过 ' + max + ' 个', this.$line);
    }
    return params;
};

/**
 * 检查状态是否满足自身要求。
 *
 * @param  {bigine.runtime.state} state
 * @param  {bigine.runtime.logger} logger
 * @return {Boolean}
 */
bigine.tag.action.prototype.test = function(state, logger) {
    throw new bigine.error('动作“' + this.$prototype + '”检查功能逻辑未实现', this.$line);
};

/**
 * 执行。
 *
 * @param  {Object} context
 * @return {bigine.util.promise}
 */
bigine.tag.action.prototype.act = function(context) {
    context.logger.warn('    [todo]', this.$prototype, '#act(context)');
    return context.director.oops(context);
};

module.exports = bigine.tag.action;
