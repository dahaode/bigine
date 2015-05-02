/**
 * 定义音乐对象组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('bigine/core/component').$namespace('.object');

bigine.tag = {};
bigine.tag.object = require('bigine/tag/object');

/**
 * 音乐对象组件。
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.object.bgm}
 * @constructor
 * @extends {bigine.tag.object}
 */
bigine.object.bgm = bigine.core.component.$extends(bigine.tag.object, function(line, params, content) {
    bigine.tag.object.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.object.bgm';
});

/** @inheritDoc */
bigine.object.bgm.prototype.$expectChildren = function() {
    return {
        'bigine.object.common.audio': true
    };
};

/** @inheritDoc */
bigine.object.bgm.prototype.register = function(episode) {
    episode.bgm(this);
    return bigine.tag.object.prototype.register.call(this, episode);
};

/** @inheritDoc */
bigine.object.bgm.prototype.bind = function(episode) {
    bigine.tag.object.prototype.bind.call(this, episode);
    this.audio = this.$children[0].$content;
    return this;
};

module.exports = bigine.object.bgm;
