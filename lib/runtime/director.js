/**
 * 定义运行时场面（视觉、听觉、交互）指挥器组件。
 *
 * @author    郑煜宇 <zhengyuyu@kanshu.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

var bigine = {
    runtime: {},
    util: {
        helper: require('bigine/util/helper')
    }
};

/**
 * 运行时画面指挥器组件。
 *
 * @return {bigine.runtime.director}
 * @constructor
 */
bigine.runtime.director = function() {
};

/**
 * 无画面变更。
 *
 * 此方法用于不涉及场面控制变化地游戏事件动作组件。
 *
 * @param  {Object} context
 * @return {bigine.util.q.deferred.promise}
 */
bigine.runtime.director.prototype.oops = function(context) {
    return bigine.util.helper.promise.resolved(context);
};

/**
 * 设置房间。
 *
 * @param  {Object} context
 * @param {bigine.object.room} room
 * @return {bigine.util.q.deferred.promise}
 */
bigine.runtime.director.prototype.room = function(context, room) {
    console.debug('@TODO bigine.runtime.director.prototype.room');
    return bigine.util.helper.promise.resolved(context);
};

/**
 * 设置房间时刻。
 *
 * @param  {Object} context
 * @param {String} layout
 * @return {bigine.util.q.deferred.promise}
 */
bigine.runtime.director.prototype.layout = function(context, layout) {
    console.debug('@TODO bigine.runtime.director.prototype.layout');
    return bigine.util.helper.promise.resolved(context);
};

/**
 * 设置天气。
 *
 * @param  {Object} context
 * @param {bigine.object.weather} weather
 * @return {bigine.util.q.deferred.promise}
 */
bigine.runtime.director.prototype.weather = function(context, weather) {
    console.debug('@TODO bigine.runtime.director.prototype.weather');
    return bigine.util.helper.promise.resolved(context);
};

/**
 * 设置左侧站位人物。
 *
 * @param  {Object} context
 * @param {bigine.object.character} character
 * @param {Boolean} animated
 * @return {bigine.util.q.deferred.promise}
 */
bigine.runtime.director.prototype.lchar = function(context, character, animated) {
    console.debug('@TODO bigine.runtime.director.prototype.lchar');
    return bigine.util.helper.promise.resolved(context);
};

/**
 * 设置中间站位人物。
 *
 * @param  {Object} context
 * @param {bigine.object.character} character
 * @param {Boolean} animated
 * @return {bigine.util.q.deferred.promise}
 */
bigine.runtime.director.prototype.cchar = function(context, character, animated) {
    console.debug('@TODO bigine.runtime.director.prototype.cchar');
    return bigine.util.helper.promise.resolved(context);
};

/**
 * 设置右侧站位人物。
 *
 * @param  {Object} context
 * @param {bigine.object.character} character
 * @param {Boolean} animated
 * @return {bigine.util.q.deferred.promise}
 */
bigine.runtime.director.prototype.rchar = function(context, character, animated) {
    console.debug('@TODO bigine.runtime.director.prototype.rchar');
    return bigine.util.helper.promise.resolved(context);
};

/**
 * 设置左侧站位人物姿态。
 *
 * @param  {Object} context
 * @param {String} pose
 * @return {bigine.util.q.deferred.promise}
 */
bigine.runtime.director.prototype.lpose = function(context, pose) {
    console.debug('@TODO bigine.runtime.director.prototype.lpos');
    return bigine.util.helper.promise.resolved(context);
};

/**
 * 设置中间站位人物姿态。
 *
 * @param  {Object} context
 * @param {String} pose
 * @return {bigine.util.q.deferred.promise}
 */
bigine.runtime.director.prototype.cpose = function(context, pose) {
    console.debug('@TODO bigine.runtime.director.prototype.cpos');
    return bigine.util.helper.promise.resolved(context);
};

/**
 * 设置右侧站位人物姿态。
 *
 * @param  {Object} context
 * @param {String} pose
 * @return {bigine.util.q.deferred.promise}
 */
bigine.runtime.director.prototype.rpose = function(context, pose) {
    console.debug('@TODO bigine.runtime.director.prototype.rpos');
    return bigine.util.helper.promise.resolved(context);
};

/**
 * 获取人物站位。
 *
 * @param  {bigine.object.character} character
 * @return {false|Integer}
 */
bigine.runtime.director.prototype.charpos = function(character) {
    console.debug('@TODO bigine.runtime.director.prototype.charpos');
    return false;
};

/**
 * 设置特写。
 *
 * @param  {Object} context
 * @param {bigine.object.cg} cg
 * @return {bigine.util.q.deferred.promise}
 */
bigine.runtime.director.prototype.cg = function(context, cg) {
    console.debug('@TODO bigine.runtime.director.prototype.cg');
    return bigine.util.helper.promise.resolved(context);
};

/**
 * 设置背景音乐。
 *
 * @param  {Object} context
 * @param {bigine.object.bgm} bgm
 * @return {bigine.util.q.deferred.promise}
 */
bigine.runtime.director.prototype.bgm = function(context, bgm) {
    console.debug('@TODO bigine.runtime.director.prototype.bgm');
    return bigine.util.helper.promise.resolved(context);
};

/**
 * 播放音效。
 *
 * @param  {Object} context
 * @param {bigine.object.se} sound
 * @return {bigine.util.q.deferred.promise}
 */
bigine.runtime.director.prototype.se = function(context, sound) {
    console.debug('@TODO bigine.runtime.director.prototype.se');
    return bigine.util.helper.promise.resolved(context);
};

/**
 * 选择。
 *
 * @param  {Object} context
 * @param {Object} options
 * @return {bigine.util.q.deferred.promise}
 */
bigine.runtime.director.prototype.choose = function(context, options) {
    console.debug('@TODO bigine.runtime.director.prototype.choose');
    return bigine.util.helper.promise.resolved(context);
};

/**
 * 画外音。
 *
 * @param  {Object} context
 * @param {String} words
 * @return {bigine.util.q.deferred.promise}
 */
bigine.runtime.director.prototype.voiceover = function(context, words) {
    console.debug('@TODO bigine.runtime.director.prototype.voiceover');
    return bigine.util.helper.promise.resolved(context);
};

/**
 * 对话。
 *
 * @param  {Object} context
 * @param {bigine.object.character} who
 * @param {String} words
 * @return {bigine.util.q.deferred.promise}
 */
bigine.runtime.director.prototype.say = function(context, who, words) {
    console.debug('@TODO bigine.runtime.director.prototype.say');
    return bigine.util.helper.promise.resolved(context);
};

module.exports = bigine.runtime.director;
