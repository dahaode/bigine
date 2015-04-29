/**
 * 定义那么事件动作组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('bigine/core/component').$namespace('.action.sequence');

bigine.tag = {};
bigine.tag.action = require('bigine/tag/action');
bigine.util = {};
bigine.util.helper = require('bigine/util/helper');

/**
 * 那么事件动作组件。
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.action.sequence.then}
 * @constructor
 * @extends {bigine.tag.action}
 */
bigine.action.sequence.then = bigine.core.component.$extends(bigine.tag.action, function(line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.action.sequence.then';
});

/** @inheritDoc */
bigine.action.sequence.then.prototype.$expectChildren = function() {
    return {
        '*': true
    };
};

/** @inheritDoc */
bigine.action.sequence.then.prototype.act = function(context) {
    if (true !== context.state['$v']) {
        return context.director.oops(context);
    }
    context.state['$c'] = true;
    return bigine.util.helper.promise.sequence(this.$children, 'act', context);
};

module.exports = bigine.action.sequence.then;
