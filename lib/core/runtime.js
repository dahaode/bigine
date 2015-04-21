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
    error: require('bigine/error')
},
    $ = {
        bgms: {},
        cgs: {},
        chars: {},
        rooms: {},
        ses: {},
        weathers: {}
    };

/**
 * 运行时组件。
 *
 * @param  {bigine.core.tag} tags
 * @return {bigine.core.runtime}
 * @constructs
 */
bigine.core.runtime = function(tags) {
    if ($.this) {
        throw new bigine.error('多重运行时');
    }
    $.this = this;
    this.$root = tags;
    tags.register(this);
    tags.bind(this);
};

/**
 * 运行。
 *
 * @return {bigine.core.runtime}
 */
bigine.core.runtime.prototype.run = function() {
    return this;
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
 * @param  {String|Object} id
 * @return {bigine.object.bgm}
 */
bigine.core.runtime.prototype.bgm = function(id) {
    return $.$($.bgms, id, '音乐');
};

/**
 * 注册或获取特写对象。
 *
 * @param  {String|Object} id
 * @return {bigine.object.cg}
 */
bigine.core.runtime.prototype.cg = function(id) {
    return $.$($.cgs, id, '特写');
};

/**
 * 注册或获取人物对象。
 *
 * @param  {String|Object} id
 * @return {bigine.object.char}
 */
bigine.core.runtime.prototype.char = function(id) {
    return $.$($.chars, id, '人物');
};

/**
 * 注册或获取房间对象。
 *
 * @param  {String|Object} id
 * @return {bigine.object.room}
 */
bigine.core.runtime.prototype.room = function(id) {
    return $.$($.rooms, id, '房间');
};

/**
 * 注册或获取音效对象。
 *
 * @param  {String|Object} id
 * @return {bigine.object.se}
 */
bigine.core.runtime.prototype.se = function(id) {
    return $.$($.ses, id, '音效');
};

/**
 * 注册或获取天气对象。
 *
 * @param  {String|Object} id
 * @return {bigine.object.weather}
 */
bigine.core.runtime.prototype.weather = function(id) {
    return $.$($.weathers, id, '天气');
};

module.exports = bigine.core.runtime;
