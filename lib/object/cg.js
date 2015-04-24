/**
 * 定义特写对象组件。
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
 * 特写对象组件。
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.object.cg}
 * @constructor
 * @extends {bigine.tag.object}
 */
bigine.object.cg = bigine.core.component.$extends(bigine.tag.object, function(line, params, content) {
    bigine.tag.object.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.object.cg';
});

/** @inheritDoc */
bigine.object.cg.prototype.$expectChildren = function() {
    return {
        'bigine.object.common.image': true
    };
};


/** @inheritDoc */
bigine.object.cg.prototype.register = function(episode) {
    episode.cg(this);
    return bigine.tag.object.prototype.register.call(this, episode);
};

module.exports = bigine.object.cg;
