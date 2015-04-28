/**
 * 定义房间对象使用地图标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('bigine/core/component').$namespace('.object.room', require('bigine/object/room'));

bigine.core.tag = require('bigine/core/tag');

/**
 * 房间对象使用地图标签组件。
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.object.room.map}
 * @constructor
 * @extends {bigine.core.tag}
 */
bigine.object.room.map = bigine.core.component.$extends(bigine.core.tag, function(line, params, content) {
    bigine.core.tag.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.object.room.map';
    this.map = this.$content;
});

/** @inheritDoc */
bigine.object.room.prototype.bind = function(episode) {
    this.map = episode.map(this.map);
    return bigine.tag.action.prototype.bind.call(this, episode);
};

module.exports = bigine.object.room.map;
