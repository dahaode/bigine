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
    .$import('.core.scene')
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
bigine.entity.room = bigine.$extends(bigine.tag.entity, function (line, params, content) {
    bigine.tag.entity.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.entity.room';
    var fallback = new bigine.tag.scene(0, [], this.title + '-enter-after-fallback');
    fallback.type = new bigine.tag.scene.type(0, [], '进入（' + this.title + '）后');
    fallback.type.id = bigine.core.emittable.TYPE_ROOM_AFTER_ENTER;
    fallback.type.kind = bigine.core.scene.KIND_ROOM;
    fallback.type.reference = this;
    fallback.plot = new bigine.tag.scene.plot();
    fallback.plot.$append(new bigine.action.room.fallback());
    this.$scenes = {};
    this.$scenes[bigine.core.emittable.TYPE_ROOM_AFTER_ENTER] = [fallback];

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
    if (bigine.core.emittable.TYPE_ROOM_AFTER_ENTER == type) {
        this.$scenes[type].splice(this.$scenes[type] - 1, 0, scene);
    } else {
        this.$scenes[type].push(scene);
    }
    return this;
};

/** @inheritDoc */
bigine.entity.room.prototype.$fire = function(type, context) {
    context.logger.debug('    [emit]', type, '@', this, 'fire');
    context.state['$e'] = type;
    context.logger.debug('   [state] $e =', type);
    var self = this;
    return bigine.util.promise.every(this.$scenes[type] || [], 'perform', context).then(function () {
        context.logger.debug('    [emit]', type, '@', self, 'ok');
        return context.director.oops(context);
    }).fail(function (error) {
        if (-1 == error.lineNumber) {
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
    return this.$fire(bigine.core.emittable.TYPE_ROOM_AFTER_ENTER, context);
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
    var from = context.state['$r'],
        to = this;
    if (!from) {
        from = {};
        from.preLeave = from.postLeave = function(context) {
            return bigine.util.promise.resolve();
        };
    }
    context.state['$n'] = this; // room next
    context.logger.debug('   [state] $n =', this);
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
        context.state['$r'] = to; // room
        context.logger.debug('   [state] $r =', to);
        context.state['当前房间'] = to;
        context.logger.debug('   [state] 当前房间 = ', to);
        context.state['$n'] = undefined;
        context.logger.debug('   [state] $n =');
        return to.postEnter(context);
    }).fail(function (error) {
        if (-1 == error.lineNumber) {
            return bigine.util.promise.resolve(context);
        }
        return bigine.util.promise.reject(error);
    });
};

module.exports = bigine.entity.room;
