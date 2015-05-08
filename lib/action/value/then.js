/**
 * 定义那么事件动作组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../../bigine').$namespace('.action.value')
    .$import('.tag.action')
    .$import('.util.promise');

/**
 * 那么事件动作组件。
 *
 * - 参数：无
 * - 内容：无
 * - 子项：动作集合
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.action.value.then}
 * @constructor
 * @extends {bigine.tag.action}
 */
bigine.action.value.then = bigine.$extends(bigine.tag.action, function (line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.action.value.then';
});

/** @inheritDoc */
bigine.action.value.then.prototype.$expectChildren = function() {
    return {
        '*': true
    };
};

/** @inheritDoc */
bigine.action.value.then.prototype.act = function(context) {
    if (true !== context.state['$v']) {
        return context.director.oops(context);
    }
    context.state['$c'] = true;
    return bigine.util.promise.every(this.$children, 'act', context);
};

module.exports = bigine.action.value.then;