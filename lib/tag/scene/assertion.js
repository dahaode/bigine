/**
 * 定义事件条件标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('bigine/core/component').$namespace('.tag.scene', require('bigine/tag/scene'));

bigine.core.tag = require('bigine/core/tag');

/**
 * 事件条件标签组件。
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.tag.scene.type}
 * @constructor
 * @extends {bigine.core.tag}
 */
bigine.tag.scene.assertion = bigine.core.component.$extends(bigine.core.tag, function(line, params, content) {
    bigine.core.tag.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.tag.scene.assertion';
});

/** @inheritDoc */
bigine.tag.scene.assertion.prototype.$expectContent = function() {
    return false;
};

/** @inheritDoc */
bigine.tag.scene.assertion.prototype.$expectChildren = function() {
    return {
        '*': true
    };
};

/**
 * 检查条件是否符合。
 *
 * @param  {bigine.runtime.state} state
 * @return {Boolean}
 */
bigine.tag.scene.assertion.prototype.test = function(state) {
    for (var ii = 0; ii < this.$children.length; ii++) {
        if (!this.$children[ii].test(state)) {
            return false;
        }
    }
    return true;
};

module.exports = bigine.tag.scene.assertion;
