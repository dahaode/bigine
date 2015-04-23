/**
 * 定义运行时组件。
 *
 * @author    郑煜宇 <zhengyuyu@kanshu.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

var bigine = {
    core: {
        tag: require('bigine/core/tag')
    },
    error: require('bigine/error'),
    util: {
        helper: require('bigine/util/helper')
    }
},
    $ = {
        bgms: {},
        cgs: {},
        chars: {},
        rooms: {},
        ses: {},
        weathers: {},
        on: {}
    };

/**
 * 运行时组件。
 *
 * @param  {bigine.core.tag} tags
 * @return {bigine.core.runtime}
 * @constructs
 */
bigine.core.runtime = function(tags) {
    if ($.appliance) {
        throw new bigine.error('多重运行时');
    }
    $.appliance = this;
    this.$root = tags;
    tags.register(this);
    tags.bind(this);
};

/**
 * 注册游戏事件。
 *
 * @param  {String} id
 * @param  {bigine.tag.scene} event
 * @return {bigine.core.runtime}
 */
bigine.core.runtime.prototype.$on = function(id, event) {
    $.on[id] = $.on[id] || [];
    $.on[id].push(event);
    return this;
};

/**
 * 执行游戏事件。
 *
 * @param  {String} id
 * @return {bigine.util.q.deferred.promise}
 */
bigine.core.runtime.prototype.$fire = function(id) {
    var context = {
        director: $.director,
        state: $.state
    };
    $.state['$e'] = id;
    return bigine.util.helper.promise.sequence($.on[id] || [], 'perform', context).fail(function (error) {
        console.error(error);
    });
};

/**
 * 开始游戏。
 *
 * @return {bigine.core.runtime}
 */
bigine.core.runtime.prototype.start = function() {
    this.$fire('start');
    return this;
};

/**
 * 游戏失败。
 *
 * @return {bigine.core.runtime}
 */
bigine.core.runtime.prototype.over = function() {
    this.$fire('over');
    return this;
};

/**
 * 游戏结束。
 *
 * @return {bigine.core.runtime}
 */
bigine.core.runtime.prototype.accomplish = function() {
    this.$fire('accomplish');
    return this;
};

/**
 * 运行。
 *
 * @param {bigine.runtime.director} director
 * @param {bigine.runtime.state} state
 * @return {bigine.core.runtime}
 */
bigine.core.runtime.prototype.run = function(director, state) {
    $.director = director;
    $.state = state;
    return this.start();
};

/**
 * 注册实体对象。
 *
 * @param  {Object} ware
 * @param  {Object} object
 * @param  {String} title
 * @return {bigine.tag.object}
 */
$.reg = function(ware, object, title) {
    if (ware[object.id]) {
        throw new bigine.error(title + '“' + object.title + '”已存在');
    }
    ware[object.id] = object;
    return object;
};

/**
 * 获取实体对象。
 *
 * @param  {Object} ware
 * @param  {String} id
 * @param  {String} title
 * @return {bigine.tag.object}
 */
$.get = function(ware, id, title) {
    if (!ware[id]) {
        throw new bigine.error('未定义地' + title + '“' + id + '”');
    }
    return ware[id];
};

/**
 * 注册或获取实体对象。
 *
 * @param  {Object} ware
 * @param  {String|Object} id
 * @param  {String} title
 * @return {bigine.tag.object}
 */
$.$ = function(ware, id, title) {
    if (id instanceof bigine.core.tag) {
        return $.reg(ware, id, title);
    }
    return $.get(ware, id, title);
};

/**
 * 注册或获取音乐对象。
 *
 * @param  {String|bigine.object.bgm} id
 * @return {bigine.object.bgm}
 */
bigine.core.runtime.prototype.bgm = function(id) {
    return $.$($.bgms, id, '音乐');
};

/**
 * 注册或获取特写对象。
 *
 * @param  {String|bigine.object.cg} id
 * @return {bigine.object.cg}
 */
bigine.core.runtime.prototype.cg = function(id) {
    return $.$($.cgs, id, '特写');
};

/**
 * 注册或获取人物对象。
 *
 * @param  {String|bigine.object.character} id
 * @return {bigine.object.character}
 */
bigine.core.runtime.prototype.character = function(id) {
    return $.$($.chars, id, '人物');
};

/**
 * 注册或获取房间对象。
 *
 * @param  {String|bigine.object.room} id
 * @return {bigine.object.room}
 */
bigine.core.runtime.prototype.room = function(id) {
    return $.$($.rooms, id, '房间');
};

/**
 * 注册或获取音效对象。
 *
 * @param  {String|bigine.object.se} id
 * @return {bigine.object.se}
 */
bigine.core.runtime.prototype.se = function(id) {
    return $.$($.ses, id, '音效');
};

/**
 * 注册或获取天气对象。
 *
 * @param  {String|bigine.object.weather} id
 * @return {bigine.object.weather}
 */
bigine.core.runtime.prototype.weather = function(id) {
    return $.$($.weathers, id, '天气');
};

/**
 * 注册或获取主角人物对象。
 *
 * @param  {bigine.object.character|void} character
 * @return {bigine.object.character}
 */
bigine.core.runtime.prototype.player = function(character) {
    if (character) {
        $.player = character;
    } else if (!$.player) {
        throw new bigine.error('未定义地主角');
    }
    return $.player;
};

module.exports = bigine.core.runtime;
