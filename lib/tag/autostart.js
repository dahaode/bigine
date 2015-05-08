/**
 * 定义自动播放标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../bigine').$namespace('.tag')
    .$import('.core.tag');

/**
 * 自动播放标签组件。
 *
 * - 参数：无
 * - 内容：无
 * - 子项：无
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.tag.autostart}
 * @constructor
 * @extends {bigine.core.tag}
 */
bigine.tag.autostart = bigine.$extends(bigine.core.tag, function (line, params, content) {
    bigine.core.tag.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.tag.autostart';
});

/** @inheritDoc */
bigine.tag.autostart.prototype.$expectContent = function() {
    return false;
};

/** @inheritDoc */
bigine.tag.autostart.prototype.$register = function(episode) {
    bigine.core.tag.prototype.$register.call(this, episode);
    episode.autostart(true);
    return this;
};

module.exports = bigine.tag.autostart;
