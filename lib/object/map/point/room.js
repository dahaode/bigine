/**
 * 定义地图对象交互点房间标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('bigine/core/component').$namespace('.object.map.point', require('bigine/object/map/point'));

bigine.core.tag = require('bigine/core/tag');

/**
 * 地图对象交互点房间标签组件。
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.object.map.point}
 * @constructor
 * @extends {bigine.core.tag}
 */
bigine.object.map.point.room = bigine.core.component.$extends(bigine.core.tag, function(line, params, content) {
    bigine.core.tag.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.object.map.point.room';
    this.room = this.$content;
});

/** @inheritDoc */
bigine.object.map.point.room.prototype.bind = function(episode) {
    this.room = episode.room(this.room);
    return bigine.tag.action.prototype.bind.call(this, episode);
};

module.exports = bigine.object.map.point.room;
