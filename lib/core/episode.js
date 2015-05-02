/**
 * 定义运行时作品组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('bigine/core/component').$namespace('.core.tag', require('bigine/core/tag')),
    $ = {};

bigine.util = {};
bigine.util.helper = require('bigine/util/helper');

/**
 * 运行时作品组件。
 *
 * @param  {bigine.core.tag} tags
 * @param  {bigine.runtime.resource} resource
 * @return {bigine.core.episode}
 * @constructor
 * @extends {bigine.core.component}
 */
bigine.core.episode = bigine.core.component.$extends(bigine.core.component, function(tags, resource) {
    /** @override */
    this.$prototype = 'bigine.core.episode';
    this.$resource = resource;
    tags.register(this);
    tags.bind(this);
});

/**
 * 注册游戏事件。
 *
 * @param  {String} type
 * @param  {bigine.tag.scene} scene
 * @return {bigine.core.episode}
 */
bigine.core.episode.prototype.$on = function(type, scene) {
    $.scenes = $.scenes || {};
    $.scenes[type] = $.scenes[type] || [];
    $.scenes[type].push(scene);
    return this;
};

/**
 * 执行游戏事件。
 *
 * @param  {String} type
 * @param  {{director:bigine.runtime.director, state:bigine.runtime.state}} context
 * @return {bigine.util.q.deferred.promise}
 */
bigine.core.episode.prototype.$fire = function(type, context) {
    context.state['$e'] = type; // event
    return bigine.util.helper.promise.sequence($.scenes[type] || [], 'perform', context).fail(function (error) {
        console.error(error);
    });
};

/**
 * 开始游戏。
 *
 * @param  {{director:bigine.runtime.director, state:bigine.runtime.state}} context
 * @return {bigine.util.q.deferred.promise}
 */
bigine.core.episode.prototype.start = function(context) {
    return this.$fire('start', context);
};

/**
 * 游戏失败。
 *
 * @param  {{director:bigine.runtime.director, state:bigine.runtime.state}} context
 * @return {bigine.util.q.deferred.promise}
 */
bigine.core.episode.prototype.over = function(context) {
    return this.$fire('over', context);
};

/**
 * 游戏结束。
 *
 * @param  {{director:bigine.runtime.director, state:bigine.runtime.state}} context
 * @return {bigine.util.q.deferred.promise}
 */
bigine.core.episode.prototype.finish = function(context) {
    return this.$fire('finish', context);
};

/**
 * 注册或获取对象。
 *
 * @param  {String} type
 * @param  {(String|bigine.tag.object)} id
 * @param  {String} title
 * @return {bigine.tag.object}
 */
bigine.core.episode.prototype.$object = function(type, id, title) {
    $[type] = $[type] || {};
    if (id instanceof bigine.core.tag) {
        if ($[type][id.id]) {
            throw new bigine.error(title + '“' + id.title + '”已存在');
        }
        $[type][id.id] = id;
        return id;
    } else if (!$[type][id]) {
        throw new bigine.error('未定义地' + title + '“' + id + '”');
    }
    return $[type][id];
};

/**
 * 声明或获取自动播放状态。
 *
 * @param  {Boolean} flag
 * @return {Boolean}
 */
bigine.core.episode.prototype.autostart = function(flag) {
    if (flag) {
        $.autostart = !!flag;
    }
    return $.autostart || false;
};

/**
 * 注册或获取音乐对象。
 *
 * @param  {(String|bigine.object.bgm)} id
 * @return {bigine.object.bgm}
 */
bigine.core.episode.prototype.bgm = function(id) {
    return this.$object('bgm', id, '音乐');
};

/**
 * 注册或获取特写对象。
 *
 * @param  {(String|bigine.object.cg)} id
 * @return {bigine.object.cg}
 */
bigine.core.episode.prototype.cg = function(id) {
    return this.$object('cg', id, '特写');
};

/**
 * 注册或获取人物对象。
 *
 * @param  {(String|bigine.object.character)} id
 * @return {bigine.object.character}
 */
bigine.core.episode.prototype.character = function(id) {
    return this.$object('char', id, '人物');
};

/**
 * 注册或获取地图对象。
 *
 * @param  {(String|bigine.object.map)} id
 * @return {bigine.object.map}
 */
bigine.core.episode.prototype.map = function(id) {
    return this.$object('map', id, '地图');
};

/**
 * 注册或获取房间对象。
 *
 * @param  {(String|bigine.object.room)} id
 * @return {bigine.object.room}
 */
bigine.core.episode.prototype.room = function(id) {
    return this.$object('room', id, '房间');
};

/**
 * 注册或获取音效对象。
 *
 * @param  {(String|bigine.object.se)} id
 * @return {bigine.object.se}
 */
bigine.core.episode.prototype.se = function(id) {
    return this.$object('se', id, '音效');
};

/**
 * 注册或获取天气对象。
 *
 * @param  {(String|bigine.object.weather)} id
 * @return {bigine.object.weather}
 */
bigine.core.episode.prototype.weather = function(id) {
    return this.$object('weather', id, '天气');
};

/**
 * 注册或获取主角人物对象。
 *
 * @param  {bigine.object.character=} character
 * @return {bigine.object.character}
 */
bigine.core.episode.prototype.player = function(character) {
    if (character) {
        $.player = character;
    } else if (!$.player) {
        throw new bigine.error('未定义地主角');
    }
    return $.player;
};

module.exports = bigine.core.episode;
