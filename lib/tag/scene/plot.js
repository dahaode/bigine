/**
 * 定义事件情节（内容）标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('bigine/core/component').$namespace('.tag.scene', require('bigine/tag/scene'));

bigine.core.tag = require('bigine/core/tag');
bigine.util = {};
bigine.util.helper = require('bigine/util/helper');

/**
 * 事件情节（内容）标签组件。
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.tag.scene.plot}
 * @constructor
 * @extends {bigine.core.tag}
 */
bigine.tag.scene.plot = bigine.core.component.$extends(bigine.core.tag, function(line, params, content) {
    bigine.core.tag.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.tag.scene.plot';
});

/** @inheritDoc */
bigine.tag.scene.plot.prototype.$expectContent = function() {
    return false;
};

/** @inheritDoc */
bigine.tag.scene.plot.prototype.$expectChildren = function() {
    return {
        '*': true
    };
};

/**
 * 执行。
 *
 * @param  {{director, state}} context
 * @return {bigine.util.q.deferred.promise}
 */
bigine.tag.scene.plot.prototype.play = function(context) {
    var $this = this;
    return bigine.util.helper.promise.sequence(this.$children, 'act', context, function(item) {
        context.logger.debug('[action]', item);
    });
};

module.exports = bigine.tag.scene.plot;
