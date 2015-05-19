/**
 * 定义运行时作品组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../bigine').$namespace('.core')
    .$import('.core.tag')
    .$import('.core.emittable')
    .$import('.util.promise'),
    $ = {};

/**
 * 运行时作品组件。
 *
 * @param  {bigine.core.tag} tags
 * @param  {bigine.runtime.resource} resource
 * @return {bigine.core.episode}
 * @constructor
 * @extends {bigine.core.component}
 * @implements {bigine.core.emittable}
 */
bigine.core.episode = bigine.$extends(bigine.core.component, function (tags, resource) {
    /** @override */
    this.$prototype = 'bigine.core.episode';
    this.$scenes = {};
    this.$resource = resource;

    $.tags = tags;
});

/**
 * 注册及绑定实体。
 *
 * @return {bigine.util.promise}
 */
bigine.core.episode.prototype.$ready = function() {
    var self = this;
    return $.tags.$register(this).then(function () {
        return $.tags.$bind(self);
    });
};

/** @inheritDoc */
bigine.core.episode.prototype.$on = function(type, scene) {
    this.$scenes[type] = this.$scenes[type] || [];
    this.$scenes[type].push(scene);
    return this;
};

/** @inheritDoc */
bigine.core.episode.prototype.$fire = function(type, context) {
    context.logger.debug('[emit] episode', type, 'fired');
    context.state['$e'] = type; // event
    context.logger.debug('[state] $e =', type);
    return bigine.util.promise.every(this.$scenes[type] || [], 'perform', context).fail(function (error) {
        context.logger.error(error);
    });
};

/**
 * 开始剧情播放。
 *
 * @param  {Object} context
 * @return {bigine.util.promise}
 */
bigine.core.episode.prototype.begin = function(context) {
    return this.$fire(bigine.core.emittable.TYPE_EPISODE_BEGIN, context);
};

/**
 * 剧情完结。
 *
 * @param  {Object} context
 * @return {bigine.util.promise}
 */
bigine.core.episode.prototype.done = function(context) {
    return this.$fire(bigine.core.emittable.TYPE_EPISODE_DONE, context);
};

/**
 * 剧情中断。
 *
 * @param  {Object} context
 * @return {bigine.util.promise}
 */
bigine.core.episode.prototype.fail = function(context) {
    return this.$fire(bigine.core.emittable.TYPE_EPISODE_FAIL, context);
};

/**
 * 注册或获取实体。
 *
 * @param  {String} type
 * @param  {(String|bigine.tag.entity)} id
 * @param  {String} title
 * @return {bigine.tag.entity}
 */
bigine.core.episode.prototype.$object = function(type, id, title) {
    $[type] = $[type] || {};
    if (id instanceof bigine.core.tag) {
        if ($[type][id.id]) {
            throw new bigine.error(title + '“' + id.title + '”重复定义', id.$line);
        }
        $[type][id.id] = id;
        return id;
    } else if (!$[type][id]) {
        throw new bigine.error(title + '“' + id + '”未定义');
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
 * @param  {(String|bigine.entity.bgm)} id
 * @return {bigine.entity.bgm}
 */
bigine.core.episode.prototype.bgm = function(id) {
    return this.$object('bgm', id, '音乐');
};

/**
 * 注册或获取特写对象。
 *
 * @param  {(String|bigine.entity.cg)} id
 * @return {bigine.entity.cg}
 */
bigine.core.episode.prototype.cg = function(id) {
    return this.$object('cg', id, '特写');
};

/**
 * 注册或获取人物对象。
 *
 * @param  {(String|bigine.entity.character)} id
 * @return {bigine.entity.character}
 */
bigine.core.episode.prototype.character = function(id) {
    return this.$object('char', id, '人物');
};

/**
 * 注册或获取地图对象。
 *
 * @param  {(String|bigine.entity.map)} id
 * @return {bigine.entity.map}
 */
bigine.core.episode.prototype.map = function(id) {
    return this.$object('map', id, '地图');
};

/**
 * 注册或获取房间对象。
 *
 * @param  {(String|bigine.entity.room)} id
 * @return {bigine.entity.room}
 */
bigine.core.episode.prototype.room = function(id) {
    return this.$object('room', id, '房间');
};

/**
 * 注册或获取音效对象。
 *
 * @param  {(String|bigine.entity.se)} id
 * @return {bigine.entity.se}
 */
bigine.core.episode.prototype.se = function(id) {
    return this.$object('se', id, '音效');
};

/**
 * 注册或获取天气对象。
 *
 * @param  {(String|bigine.entity.weather)} id
 * @return {bigine.entity.weather}
 */
bigine.core.episode.prototype.weather = function(id) {
    return this.$object('weather', id, '天气');
};

/**
 * 注册或获取主角人物对象。
 *
 * @param  {bigine.entity.character=} character
 * @return {bigine.entity.character}
 */
bigine.core.episode.prototype.player = function(character) {
    if (character) {
        $.player = character;
    } else if (!$.player) {
        throw new bigine.error('主角未定义');
    }
    return $.player;
};

module.exports = bigine.core.episode;
