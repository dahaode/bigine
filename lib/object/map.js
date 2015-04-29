/**
 * 定义地图对象组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('bigine/core/component').$namespace('.object');

bigine.tag = {};
bigine.tag.object = require('bigine/tag/object');
bigine.util = {};
bigine.util.helper = require('bigine/util/helper');

/**
 * 地图对象组件。
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.object.map}
 * @constructor
 * @extends {bigine.tag.object}
 */
bigine.object.map = bigine.core.component.$extends(bigine.tag.object, function(line, params, content) {
    bigine.tag.object.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.object.map';
});

/** @inheritDoc */
bigine.object.map.prototype.$expectChildren = function() {
    return {
        'bigine.object.map.base': true,
        'bigine.object.map.point': true
    };
};


/** @inheritDoc */
bigine.object.map.prototype.register = function(episode) {
    episode.map(this);
    return bigine.tag.object.prototype.register.call(this, episode);
};

module.exports = bigine.object.map;
