/**
 * 定义运行时组件。
 *
 * @author    郑煜宇 <zhengyuyu@kanshu.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

var bigine = {
    core: {},
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
 * 获取指定音乐对象。
 *
 * @param  {String} id
 * @return {bigine.object.bgm}
 */
bigine.core.runtime.prototype.getBGM = function(id) {
    if (!$.bgms[id]) {
        throw new bigine.error('未定义地音乐“' + id + '”');
    }
    return $.bgms[id];
};

/**
 * 获取指定特写对象。
 *
 * @param  {String} id
 * @return {bigine.object.cg}
 */
bigine.core.runtime.prototype.getCG = function(id) {
    if (!$.cgs[id]) {
        throw new bigine.error('未定义地特写“' + id + '”');
    }
    return $.cgs[id];
};

/**
 * 获取指定人物对象。
 *
 * @param  {String} id
 * @return {bigine.object.char}
 */
bigine.core.runtime.prototype.getChar = function(id) {
    if (!$.chars[id]) {
        throw new bigine.error('未定义地人物“' + id + '”');
    }
    return $.chars[id];
};

/**
 * 获取指定房间对象。
 *
 * @param  {String} id
 * @return {bigine.object.room}
 */
bigine.core.runtime.prototype.getRoom = function(id) {
    if (!$.rooms[id]) {
        throw new bigine.error('未定义地房间“' + id + '”');
    }
    return $.rooms[id];
};

/**
 * 获取指定音效对象。
 *
 * @param  {String} id
 * @return {bigine.object.se}
 */
bigine.core.runtime.prototype.getSE = function(id) {
    if (!$.ses[id]) {
        throw new bigine.error('未定义地音效“' + id + '”');
    }
    return $.ses[id];
};

/**
 * 获取指定天气对象。
 *
 * @param  {String} id
 * @return {bigine.object.weather}
 */
bigine.core.runtime.prototype.getWeather = function(id) {
    if (!$.weathers[id]) {
        throw new bigine.error('未定义地天气“' + id + '”');
    }
    return $.weathers[id];
};

module.exports = bigine.core.runtime;
