/**
 * 定义如果事件动作组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 DaHao.de
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../../bigine').$namespace('.action.value')
    .$import('.tag.action')
    .$import('.util.promise');

/**
 * 如果事件动作组件。
 *
 * - 参数：数值
 * - 内容：无
 * - 子项：动作集合
 *
 * ```
 * {value}
 * ```
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.action.value.when}
 * @constructor
 * @extends {bigine.tag.action}
 */
bigine.action.value.when = bigine.$extends(bigine.tag.action, function (line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.action.value.when';

    /**
     * 数值。
     *
     * @type {String}
     */
    this.value = params[0];
});

/** @inheritDoc */
bigine.action.value.when.prototype.$expectParams = function() {
    return [1, 1];
};

/** @inheritDoc */
bigine.action.value.when.prototype.$expectChildren = function() {
    return {
        '*': true
    };
};

/** @inheritDoc */
bigine.action.value.when.prototype.act = function(context) {
    if (this.value !== context.state['$v']) {
        return context.director.oops(context);
    }
    context.state['$v'] = undefined;
    context.logger.debug('   [state] $v =');
    return bigine.tag.scene.plot.prototype.play.call(this, context);
};

module.exports = bigine.action.value.when;
