/**
 * 定义素材包标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../bigine').$namespace('.tag')
    .$import('.core.tag')
    .$import('.entity.character.avatar')
    .$import('.entity.character.pose')
    .$import('.entity.room.snap')
    .$import('.entity.common.image')
    .$import('.entity.cg')
    .$import('.util.promise')
    .$import('.util.resource'),
    $ = {};

/**
 * 素材包标签组件。
 *
 * - 参数：无
 * - 内容：素材包编号
 * - 子项：无
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.tag.suite}
 * @constructor
 * @extends {bigine.core.tag}
 */
bigine.tag.suite = bigine.$extends(bigine.core.tag, function (line, params, content) {
    bigine.core.tag.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.tag.suite';

    /**
     * 配置。
     *
     * @type {Object}
     * @dict
     */
    this.entities = content;
});

/**
 * 加载数据。
 *
 * @param  {bigine.core.episode} episode
 * @return {bigine.util.promise}
 */
bigine.tag.suite.prototype.$fill = function(episode) {
    var self = this;
    return bigine.util.resource.getSuite(this.entities).then(function (data) {
        self.entities = data;
        try {
            bigine.util.each(data.rooms || {}, $.room, episode);
            bigine.util.each(data.chars || {}, $.character, episode);
            bigine.util.each(data.cgs || {}, $.cg, episode);
            bigine.util.each(data.maps || {}, $.map, episode);
        } catch (error) {
            return bigine.util.promise.reject(error);
        }
        return bigine.util.promise.resolve();
    });
};

/**
 * 导入房间。
 *
 * @param  {Object} item
 * @param  {String} index
 * @return {void}
 * @static
 */
$.room = function(item, index) {
    var room = new bigine.entity.room(0, [], item.title);
    if (item.snaps) {
        var snaps = new bigine.entity.room.snap();
        room.$append(snaps);
        bigine.util.each(item.snaps, function (item, index) {
            var snap = new bigine.core.tag(0, [], item);
            snap.$params.unshift(index);
            snaps.$append(snap);
        });
    }
    this.$import(room);
};

/**
 * 导入人物。
 *
 * @param  {Object} item
 * @param  {String} index
 * @return {void}
 * @static
 */
$.character = function (item, index) {
    var xpc = new bigine.entity.character(0, [], item.title);
    if (item.avatar) {
        xpc.$append(new bigine.entity.character.avatar(0, [], item.avatar));
    }
    if (item.poses) {
        var poses = new bigine.entity.character.pose();
        xpc.$append(poses);
        bigine.util.each(item.poses, function (item, index) {
            var pose = new bigine.core.tag(0, [], item);
            pose.$params.unshift(index);
            poses.$append(pose);
        });
    }
    this.$import(xpc);
};

/**
 * 导入特写。
 *
 * @param  {Object} item
 * @param  {String} index
 * @return {void}
 * @static
 */
$.cg = function (item, index) {
    var cg = new bigine.entity.cg(0, [], item.title);
    cg.$append(new bigine.entity.common.image(0, [], item.image));
    this.$import(cg);
};

/**
 * 导入地图。
 *
 * @param  {Object} item
 * @param  {String} index
 * @return {void}
 * @static
 */
$.map = function (item, index) {
    console.log(item);
};

module.exports = bigine.tag.suite;
