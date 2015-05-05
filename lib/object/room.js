/**
 * 定义房间对象组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('bigine/core/component').$namespace('.object');

bigine.action = {};
bigine.action.room = {};
bigine.action.room.fallback = require('bigine/action/room/fallback');
bigine.tag = {};
bigine.tag.object = require('bigine/tag/object');
bigine.tag.scene = require('bigine/tag/scene');
bigine.tag.scene.type = require('bigine/tag/scene/type');
bigine.tag.scene.plot = require('bigine/tag/scene/plot');
bigine.util = {};
bigine.util.helper = require('bigine/util/helper');

/**
 * 房间对象组件。
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.object.room}
 * @constructor
 * @extends {bigine.tag.object}
 */
bigine.object.room = bigine.core.component.$extends(bigine.tag.object, function(line, params, content) {
    bigine.tag.object.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.object.room';
    this.scenes = {
        fallback: new bigine.tag.scene(0, [], this.title + '-enter-after-fallback')
    };
    this.scenes.fallback.type = new bigine.tag.scene.type(0, [], '进入（' + this.title + '）后');
    this.scenes.fallback.type.id = 'enter.after';
    this.scenes.fallback.type.kind = 'room';
    this.scenes.fallback.type.reference = this;
    this.scenes.fallback.plot = new bigine.tag.scene.plot();
    this.scenes.fallback.plot.$children[0] = new bigine.action.room.fallback();
});

/** @inheritDoc */
bigine.object.room.prototype.$expectChildren = function() {
    return {
        'bigine.object.room.map': true,
        'bigine.object.room.snap': true
    };
};

/** @inheritDoc */
bigine.object.room.prototype.register = function(episode) {
    episode.room(this);
    return bigine.tag.object.prototype.register.call(this, episode);
};

/** @inheritDoc */
bigine.object.room.prototype.bind = function(episode) {
    bigine.tag.object.prototype.bind.call(this, episode);
    this.snaps = {};
    var ii, jj, kk;
    for (ii = 0; ii < this.$children.length; ii++) {
        if ('bigine.object.room.snap' == this.$children[ii].$prototype) {
            for (jj = 0; jj < this.$children[ii].$children.length; jj++) {
                kk = this.$children[ii].$children[jj].$params[0];
                this.snaps[kk] = this.$children[ii].$children[jj].$content;
            }
        }
    }
    if (!this.snaps['午']) {
        this.snaps['午'] = this.snaps[kk];
    }
    return this;
};

/**
 * 注册游戏事件。
 *
 * @param  {String} type
 * @param  {bigine.tag.scene} scene
 * @return {bigine.object.room}
 */
bigine.object.room.prototype.$on = function(type, scene) {
    this.scenes[type] = this.scenes[type] || [];
    this.scenes[type].push(scene);
    return this;
};

/**
 * 执行游戏事件。
 *
 * @param  {String} type
 * @param  {{director, state}} context
 * @return {bigine.util.q.deferred.promise}
 */
bigine.object.room.prototype.$fire = function(type, context) {
    context.logger.debug('[emit]', this, type, 'fired');
    context.state['$e'] = type;
    context.logger.debug('[state] $e =', type);
    var fallback = [];
    if ('enter.after' == type) {
        fallback.push(this.scenes.fallback);
    }
    return bigine.util.helper.promise.sequence(this.scenes[type] || fallback, 'perform', context).fail(function (error) {
        console.error(error);
    });
};

/**
 * 进入房间。
 *
 * @param  {{director, state}} context
 * @return {bigine.util.q.deferred.promise}
 */
bigine.object.room.prototype.enter = function(context) {
    var $this = this;
    return this.$fire('enter.before', context).then(function () {
        return $this.$fire('enter.after', context);
    });
};

/**
 * 离开房间。
 *
 * @param  {{director, state}} context
 * @return {bigine.util.q.deferred.promise}
 */
bigine.object.room.prototype.leave = function(context) {
    var $this = this;
    return this.$fire('leave.before', context).then(function () {
        return $this.$fire('leave.after', context);
    });
};

module.exports = bigine.object.room;
