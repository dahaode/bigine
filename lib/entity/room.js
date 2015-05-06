/**
 * 定义房间实体组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../bigine').$namespace('.entity')
    .$import('.tag.entity')
    .$import('.core.emittable')
    .$import('.tag.scene')
    .$import('.tag.scene.type')
    .$import('.tag.scene.plot')
    .$import('.action.room.fallback')
    .$import('.util.promise');

/**
 * 房间实体组件。
 *
 * - 参数：无
 * - 内容：名称
 * - 子项：地图、时刻集合
 *
 * ```
 * {
 *   id,
 *   title,
 *   interactive: {map},
 *   snaps: {length, <TITLE>...}
 * }
 * ```
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.entity.room}
 * @constructor
 * @extends {bigine.tag.entity}
 * @implements {bigine.core.emittable}
 */
bigine.entity.room = bigine.$extends(bigine.tag.entity, function(line, params, content) {
    bigine.tag.entity.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.entity.room';
    this.$scenes = {
        fallback: new bigine.tag.scene(0, [], this.title + '-enter-after-fallback')
    };
    this.$scenes.fallback.type = new bigine.tag.scene.type(0, [], '进入（' + this.title + '）后');
    this.$scenes.fallback.type.id = 'enter.after';
    this.$scenes.fallback.type.kind = 'room';
    this.$scenes.fallback.type.reference = this;
    this.$scenes.fallback.plot = new bigine.tag.scene.plot();
    this.$scenes.fallback.plot.$children[0] = new bigine.action.room.fallback();

    /**
     * 绑定地图。
     *
     * @type {bigine.entity.room.map}
     */
    this.interactive =

    /**
     * 时刻集合。
     *
     * @type {bigine.entity.room.snap}
     */
    this.snaps = undefined;
});

/** @inheritDoc */
bigine.entity.room.prototype.$expectChildren = function() {
    return {
        'bigine.entity.room.map': 'interactive',
        'bigine.entity.room.snap': 'snaps'
    };
};

/** @inheritDoc */
bigine.entity.room.prototype.$register = function(episode) {
    bigine.tag.entity.prototype.$register.call(this, episode);
    episode.room(this);
    return this;
};

/** @inheritDoc */
bigine.entity.room.prototype.$on = function(type, scene) {
    this.$scenes[type] = this.$scenes[type] || [];
    this.$scenes[type].push(scene);
    return this;
};

/** @inheritDoc */
bigine.entity.room.prototype.$fire = function(type, context) {
    context.logger.debug('[emit]', this, type, 'fired');
    context.state['$e'] = type;
    context.logger.debug('[state] $e =', type);
    var fallback = [];
    if (bigine.core.emittable.TYPE_ROOM_AFTER_ENTER == type) {
        fallback.push(this.$scenes.fallback);
    }
    return bigine.util.promise.every(this.$scenes[type] || fallback, 'perform', context).fail(function (error) {
        context.logger.error(error);
    });
};

/**
 * 进入房间。
 *
 * @param  {{director, state}} context
 * @return {bigine.util.promise}
 */
bigine.entity.room.prototype.enter = function(context) {
    var self = this;
    return this.$fire(bigine.core.emittable.TYPE_ROOM_BEFORE_ENTER, context).then(function () {
        return self.$fire(bigine.core.emittable.TYPE_ROOM_AFTER_ENTER, context);
    });
};

/**
 * 离开房间。
 *
 * @param  {{director, state}} context
 * @return {bigine.util.promise}
 */
bigine.entity.room.prototype.leave = function(context) {
    var self = this;
    return this.$fire(bigine.core.emittable.TYPE_ROOM_BEFORE_LEAVE, context).then(function () {
        return self.$fire(bigine.core.emittable.TYPE_ROOM_AFTER_LEAVE, context);
    });
};

module.exports = bigine.entity.room;
