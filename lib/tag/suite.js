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
    .$import('.entity.map.base')
    .$import('.entity.map.point.hilite')
    .$import('.entity.map.point.region')
    .$import('.entity.map.template.point')
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
            bigine.util.each(data.maps || {}, $.mapt, episode);
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
 * @this {bigine.core.episode}
 */
$.room = function(item, index) {
    var room = new bigine.entity.room(0, [], item.title);
    if (item.snaps) {
        var snaps = new bigine.entity.room.snap();
        room.$append(snaps);
        bigine.util.each(item.snaps, $.room.snap, snaps);
    }
    room.$register(this);
};

/**
 * 导入房间时刻。
 *
 * @param  {String} item
 * @param  {String} index
 * @return {void}
 * @this {bigine.entity.room.snap}
 */
$.room.snap = function(item, index) {
    var snap = new bigine.core.tag(0, [], item);
    snap.$params.unshift(index);
    this.$append(snap);
};

/**
 * 导入人物。
 *
 * @param  {Object} item
 * @param  {String} index
 * @return {void}
 * @this {bigine.core.episode}
 */
$.character = function(item, index) {
    var xpc = new bigine.entity.character(0, [], item.title);
    if (item.avatar) {
        xpc.$append(new bigine.entity.character.avatar(0, [], item.avatar));
    }
    if (item.poses) {
        var poses = new bigine.entity.character.pose();
        xpc.$append(poses);
        bigine.util.each(item.poses, $.character.pose, poses);
    }
    xpc.$register(this);
};

/**
 * 导入人物姿态。
 *
 * @param  {String} item
 * @param  {String} index
 * @return {void}
 * @this {bigine.entity.character.pose}
 */
$.character.pose = function(item, index) {
    var pose = new bigine.core.tag(0, [], item);
    pose.$params.unshift(index);
    this.$append(pose);
};

/**
 * 导入特写。
 *
 * @param  {Object} item
 * @param  {String} index
 * @return {void}
 * @this {bigine.core.episode}
 */
$.cg = function(item, index) {
    var cg = new bigine.entity.cg(0, [], item.title);
    cg.$append(new bigine.entity.common.image(0, [], item.image));
    cg.$register(this);
};

/**
 * 导入地图模板。
 *
 * @param  {Object} item
 * @param  {String} index
 * @return {void}
 * @this {bigine.core.episode}
 */
$.mapt = function(item, index) {
    var mapt = new bigine.entity.map.template(0, [], item.title);
    mapt.$append(new bigine.entity.map.base(0, [], item.base));
    bigine.util.each(item.points || {}, $.mapt.point, mapt);
    mapt.$register(this);
};

/**
 * 导入地图模板交互点。
 *
 * @param  {Object} item
 * @param  {String} index
 * @return {void}
 * @this {bigine.entity.map.template}
 */
$.mapt.point = function(item, index) {
    var point = new bigine.entity.map.template.point(0, [], item.title);
    point.$append(new bigine.entity.map.point.hilite(0, [], item.hilite));
    var region = item.region.top + '，' + item.region.right + '，' + item.region.bottom + '，' + item.region.left;
    if (item.priority) {
        region += '，' + item.priority;
    }
    point.$append(new bigine.entity.map.point.region(0, [], region));
    this.$append(point);
};

module.exports = bigine.tag.suite;
