/**
 * 定义运行时作品组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../bigine').$namespace('.core')
    .$import('.error')
    .$import('.core.tag')
    .$import('.core.emittable')
    .$import('.util.promise'),
    $ = {
        ready: []
    };

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

    /**
     * 是否自动播放。
     *
     * @type {Boolean}
     */
    this.auto = !!tags.autostart;

    /**
     * 主题配置。
     *
     * @type {Object}
     */
    this.theme = undefined;

    /**
     * 房间集合。
     *
     * @type {Object<String, bigine.entity.room>}
     */
    this.rooms = {};

    /**
     * 人物集合。
     *
     * @type {Object<String, bigine.entity.character>}
     */
    this.chars = {};

    /**
     * 特写集合。
     *
     * @type {Object<String, bigine.entity.cg>}
     */
    this.cgs = {};

    /**
     * 地图集合。
     *
     * @type {Object<String, bigine.entity.map>}
     */
    this.maps = {};

    /**
     * 地图模板集合。
     *
     * @type {Object<String, bigine.entity.map.template>}
     */
    this.mapts = {};

    /**
     * 背景音乐集合。
     *
     * @type {Object<String, bigine.entity.bgm>}
     */
    this.bgms = {};

    /**
     * 音效集合。
     *
     * @type {Object<String, bigine.entity.se>}
     */
    this.ses = {};

    /**
     * 天气集合。
     *
     * @type {Object<String, bigine.entity.weather>}
     */
    this.weathers = {};
});

/**
 * 注册及绑定实体。
 *
 * @return {bigine.util.promise}
 */
bigine.core.episode.prototype.$ready = function() {
    if (this.theme) {
        return bigine.util.promise.resolve();
    }
    var self = this,
        jobs = [true];
    if ($.tags.suite) {
        jobs.push($.tags.suite.$fill(this).fail(function () {
            return bigine.util.promise.reject(new bigine.error('素材包获取失败'));
        }));
    }
    if ($.tags.theme) {
        jobs.push($.tags.theme.$fill(this).fail(function () {
            return bigine.util.promise.reject(new bigine.error('主题获取失败'));
        }));
    } else {
        this.theme = {};
    }
    return bigine.util.promise.all(jobs).then(function () {
        return $.tags.$register(self);
    }).then(function () {
        return $.tags.$bind(self);
    }).then(function () {
        bigine.util.each($.ready, function (callback) {
            callback({
                episode: self,
                promise: bigine.util.promise.resolve()
            });
        });
    });
};

/** @inheritDoc */
bigine.core.episode.prototype.$on = function(type, scene) {
    if ('ready' == type) {
        $.ready.push(scene);
    } else {
        this.$scenes[type] = this.$scenes[type] || [];
        this.$scenes[type].push(scene);
    }
    return this;
};

/** @inheritDoc */
bigine.core.episode.prototype.$fire = function(type, context) {
    context.logger.debug('    [emit]', type, '@episode fire');
    context.state['$e'] = type; // event
    context.logger.debug('   [state] $e =', type);
    return bigine.util.promise.every(this.$scenes[type] || [], 'perform', context).then(function () {
        context.logger.info('    [emit]', type, '@episode ok');
        return context;
    }).fail(function (error) {
        if (-1 == error.lineNumber) {
            context.logger.debug('    [emit]', type, '@episode halt');
            return bigine.util.promise.resolve(context);
        }
        return bigine.util.promise.reject(error);
    });
};

/**
 * 开始剧情播放。
 *
 * @param  {Object} context
 * @return {bigine.util.promise}
 */
bigine.core.episode.prototype.begin = function(context) {
    var self = this;
    return this.$ready().then(function () {
        return self.$fire(bigine.core.emittable.TYPE_EPISODE_BEGIN, context);
    });
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
 * 注册或获取地图模板。
 *
 * @param  {(String|bigine.entity.map.template)} id
 * @return {bigine.entity.map.template}
 */
bigine.core.episode.prototype.mapt = function(id) {
    return this.$object('mapt', id, '地图模板');
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
