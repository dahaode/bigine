/**
 * 定义或事件动作组件。
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
 * 或事件动作组件。
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.action.sequence.or}
 * @constructor
 * @extends {bigine.tag.action}
 */
bigine.action.sequence.or = bigine.core.component.$extends(bigine.tag.action, function(line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.action.sequence.or';
});

/** @inheritDoc */
bigine.action.sequence.or.prototype.$expectChildren = function() {
    return {
        '*': true
    };
};

/** @inheritDoc */
bigine.action.sequence.or.prototype.act = function(context) {
    if (context.state['$c']) {
        return context.director.oops(context);
    }
    context.state['$c'] = true;
    return bigine.util.helper.promise.sequence(this.$children, 'act', context);
};

/** @inheritDoc */
bigine.action.sequence.or.prototype.test = function(state) {
    for (var ii = 0, jj = false; ii < this.$children.length; ii++) {
        if (this.$children[ii].test(state)) {
            return true;
        }
    }
    return false;
};

/** @inheritDoc */
bigine.action.sequence.or.prototype.act = function(context) {
    return context.director.oops(context);
};

module.exports = bigine.action.sequence.or;
