/**
 * 定义房间对象组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('bigine/core/component').$namespace('.object');

bigine.tag = {};
bigine.tag.object = require('bigine/tag/object');
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
});

/** @inheritDoc */
bigine.object.room.prototype.$expectChildren = function() {
    return {
        'bigine.object.room.map': true,
        'bigine.object.room.snap': true
    };
};

/**
 * 注册游戏事件。
 *
 * @param  {String} type
 * @param  {bigine.tag.scene} scene
 * @return {bigine.object.room}
 */
bigine.object.room.prototype.$on = function(type, scene) {
    this.scenes = this.scenes || {};
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
    context.state['$e'] = type;
    return bigine.util.helper.promise.sequence(this.scenes[type] || [], 'perform', context).fail(function (error) {
        console.error(error);
    });
};

/** @inheritDoc */
bigine.object.room.prototype.register = function(episode) {
    episode.room(this);
    return bigine.tag.object.prototype.register.call(this, episode);
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
