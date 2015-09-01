/**
 * 定义房间实体组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 DaHao.de
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../bigine').$namespace('.entity')
    .$import('.error')
    .$import('.tag.entity')
    .$import('.core.emittable')
    .$import('.core.scene')
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
bigine.entity.room = bigine.$extends(bigine.tag.entity, function (line, params, content) {
    bigine.tag.entity.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.entity.room';

    this.$scenes = {};

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
    episode.room(this);
    return bigine.tag.entity.prototype.$register.call(this, episode);
};

/** @inheritDoc */
bigine.entity.room.prototype.$on = function(type, scene) {
    this.$scenes[type] = this.$scenes[type] || [];
    this.$scenes[type].push(scene);
    return this;
};

/** @inheritDoc */
bigine.entity.room.prototype.$fire = function(type, context) {
    context.logger.debug('    [emit]', type, '@', this, 'fire');
    context.state['当前类型'] = type;
    context.logger.debug('   [state] 当前类型 =', type);
    var self = this;
    return bigine.util.promise.every(this.$scenes[type] || [], 'perform', context).then(function () {
        context.logger.debug('    [emit]', type, '@', self, 'ok');
        return context.director.oops(context);
    }).fail(function (error) {
        if (bigine.error.SIG_HALT == error.$signal) {
            context.logger.debug('    [emit]', type, '@', self, 'halt');
        }
        return bigine.util.promise.reject(error);
    });
};

/**
 * 准备进入房间。
 *
 * @param  {Object} context
 * @return {bigine.util.promise}
 */
bigine.entity.room.prototype.preEnter = function(context) {
    return this.$fire(bigine.core.emittable.TYPE_ROOM_BEFORE_ENTER, context);
};

/**
 * 成功进入房间。
 *
 * @param  {Object} context
 * @return {bigine.util.promise}
 */
bigine.entity.room.prototype.postEnter = function(context) {
    return this.$fire(bigine.core.emittable.TYPE_ROOM_AFTER_ENTER, context).then(function () {
        return context.director.free(context);
    });
};

/**
 * 准备离开房间。
 *
 * @param  {Object} context
 * @return {bigine.util.promise}
 */
bigine.entity.room.prototype.preLeave = function(context) {
    return this.$fire(bigine.core.emittable.TYPE_ROOM_BEFORE_LEAVE, context);
};

/**
 * 成功离开房间。
 *
 * @param  {Object} context
 * @return {bigine.util.promise}
 */
bigine.entity.room.prototype.postLeave = function(context) {
    return this.$fire(bigine.core.emittable.TYPE_ROOM_AFTER_LEAVE, context);
};

/**
 * 进入房间。
 *
 * @param  {Object} context
 * @return {bigine.util.promise}
 */
bigine.entity.room.prototype.enter = function(context) {
    var from = context.state['当前房间'],
        to = this;
    if (from) {
        from = context.episode.room(from);
    } else {
        from = {};
        from.preLeave = from.postLeave = function(context) {
            return bigine.util.promise.resolve();
        };
    }
    context.state['目标房间'] = this.id;
    context.logger.debug('   [state] 目标房间 =', this.id);
    return from.preLeave(context).then(function () {
        return to.preEnter(context);
    }).then(function () {
        from.time = '';
        context.logger.info('    [move]', to.title);
        return context.director.rest(context);
    }).then(function () {
        return context.director.setRoom({room: to}, context);
    }).then(function () {
        return from.postLeave(context);
    }).then(function () {
        context.state['当前房间'] = to.id;
        context.logger.debug('   [state] 当前房间 = ', to.id);
        delete context.state['目标房间'];
        context.logger.debug('   [state] 目标房间 =');
        return to.postEnter(context);
    }).fail(function (error) {
        if (bigine.error.SIG_HALT == error.$signal) {
            return bigine.util.promise.resolve(context);
        }
        return bigine.util.promise.reject(error);
    });
};

/**
 * 预加载资源。
 *
 * @param  {bigine.runtime.resource} resource
 * @return {void}
 */
bigine.entity.room.prototype.$prefetch = function(resource) {
    if (this.interactive) {
        resource.register(this.interactive.map.image.src, 'snap');
        var targets = [];
        bigine.util.each(this.interactive.map.points, function (point, title) {
            if ('length' == title) return;
            resource.register(point.image.src, 'map');
            targets.push(point.target.room);
        });
        bigine.util.each(targets, function (room) {
            room.$prefetch(resource);
        });
    } else bigine.util.each(this.snaps, function (snap, title) {
        if ('length' == title || '$' == title[0]) return;
        resource.register(snap, 'snap');
    });
};

module.exports = bigine.entity.room;
