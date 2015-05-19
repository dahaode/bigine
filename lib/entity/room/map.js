/**
 * 定义房间实体使用地图标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../../bigine').$namespace('.entity.room')
    .$import('.core.tag');

/**
 * 房间实体使用地图标签组件。
 *
 * - 参数：无
 * - 内容：地图名称
 * - 子项：无
 *
 * ```
 * {map}
 * ```
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.entity.room.map}
 * @constructor
 * @extends {bigine.core.tag}
 */
bigine.entity.room.map = bigine.$extends(bigine.core.tag, function (line, params, content) {
    bigine.core.tag.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.entity.room.map';

    /**
     * 地图。
     *
     * @type {bigine.entity.map}
     */
    this.map = content;
});

/** @inheritDoc */
bigine.entity.room.map.prototype.$bind = function(episode) {
    this.map = episode.map(this.map);
    return bigine.core.tag.prototype.$bind.call(this, episode);
};

module.exports = bigine.entity.room.map;
