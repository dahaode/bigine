/**
 * 定义地图实体交互点房间标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../../../bigine').$namespace('.entity.map.point')
    .$import('.core.tag');

/**
 * 地图实体交互点房间标签组件。
 *
 * - 参数：无
 * - 内容：房间名称
 * - 子项：无
 *
 * ```
 * {room}
 * ```
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.entity.map.point}
 * @constructor
 * @extends {bigine.core.tag}
 */
bigine.entity.map.point.room = bigine.$extends(bigine.core.tag, function (line, params, content) {
    bigine.core.tag.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.entity.map.point.room';

    /**
     * 房间。
     *
     * @type {bigine.entity.room}
     */
    this.room = content;
});

/** @inheritDoc */
bigine.entity.map.point.room.prototype.$bind = function(episode) {
    this.room = episode.room(this.room);
    return bigine.core.tag.prototype.$bind.call(this, episode);
};

module.exports = bigine.entity.map.point.room;
