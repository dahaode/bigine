/**
 * 定义或事件动作组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../../bigine').$namespace('.action.value')
    .$import('.tag.action');

/**
 * 或事件动作组件。
 *
 * - 参数：无
 * - 内容：无
 * - 子项：动作集合
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.action.value.or}
 * @constructor
 * @extends {bigine.tag.action}
 */
bigine.action.value.or = bigine.$extends(bigine.tag.action, function(line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.action.value.or';
});

/** @inheritDoc */
bigine.action.value.or.prototype.$expectChildren = function() {
    return {
        '*': true
    };
};

/** @inheritDoc */
bigine.action.value.or.prototype.test = function(state) {
    for (var ii = 0, jj = false; ii < this.$children.length; ii++) {
        if (this.$children[ii].test(state)) {
            return true;
        }
    }
    return false;
};

/** @inheritDoc */
bigine.action.value.or.prototype.act = function(context) {
    context.state['$v'] = this.test(context.state);
    context.state['$c'] = false;
    return context.director.oops(context);
};

module.exports = bigine.action.value.or;
