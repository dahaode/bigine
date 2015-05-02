/**
 * 定义自动播放标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('bigine/core/component').$namespace('.tag');

bigine.core.tag = require('bigine/core/tag');

/**
 * 自动播放标签组件。
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.tag.autostart}
 * @constructor
 * @extends {bigine.core.tag}
 */
bigine.tag.autostart = bigine.core.component.$extends(bigine.core.tag, function(line, params, content) {
    bigine.core.tag.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.tag.autostart';
});

/** @inheritDoc */
bigine.tag.autostart.prototype.$expectContent = function() {
    return false;
};

/** @inheritDoc */
bigine.tag.autostart.prototype.register = function(episode) {
    episode.autostart(true);
    return this;
};

module.exports = bigine.tag.autostart;
