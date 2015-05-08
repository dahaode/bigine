/**
 * 定义运行时场面（视觉、听觉、交互）指挥器组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../bigine').$namespace('.runtime')
    .$import('.core.component')
    .$import('.util.promise'),
    $ = {};

/**
 * 运行时画面指挥器组件。
 *
 * @return {bigine.runtime.director}
 * @constructor
 * @extends {bigine.core.component}
 */
bigine.runtime.director = bigine.$extends(bigine.core.component, function () {
    /** @override */
    this.$prototype = 'bigine.runtime.director';
});

/**
 * 初始化。
 *
 * @param  {bigine.core.episode} episode
 * @param  {Object} context
 * @return {bigine.runtime.director}
 */
bigine.runtime.director.prototype.init = function(episode, context) {
    context.logger.error('bigine.runtime.director#init(', episode, ', context)');
    return this;
};

/**
 * 播放。
 *
 * @param  {bigine.core.episode} episode
 * @param  {Object} context
 * @return {bigine.runtime.director}
 */
bigine.runtime.director.prototype.play = function(episode, context) {
    context.logger.error('bigine.runtime.director#play(', episode, ', context)');
    return this;
};

/**
 * 无画面变更。
 *
 * 此方法用于不涉及场面控制变化地游戏事件动作组件。
 *
 * @param  {Object} context
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.oops = function(context) {
    return bigine.util.promise.resolve(context);
};

/**
 * 启幕或落幕。
 *
 * @param  {Object} context
 * @param  {Boolean=} enable
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.curtain = function(context, enable) {
    context.logger.error('bigine.runtime.director#curtain(context,', enable, ')');
    return this.oops(context);
};

/**
 * 设置房间。
 *
 * @param  {Object} context
 * @param  {bigine.entity.room=} room
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.room = function(context, room) {
    context.logger.error('bigine.runtime.director#room(context,', room, ')');
    return this.oops(context);
};

/**
 * 设置房间时刻。
 *
 * @param  {Object} context
 * @param  {String} layout
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.layout = function(context, layout) {
    context.logger.error('bigine.runtime.director#layout(context,', layout, ')');
    return this.oops(context);
};

/**
 * 设置天气。
 *
 * @param  {Object} context
 * @param  {bigine.entity.weather=} weather
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.weather = function(context, weather) {
    context.logger.error('bigine.runtime.director#weather(context,', weather, ')');
    return this.oops(context);
};

/**
 * 设置左侧站位人物。
 *
 * @param  {Object} context
 * @param  {bigine.entity.character=} character
 * @param  {Boolean=} animated
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.lchar = function(context, character, animated) {
    context.logger.error('bigine.runtime.director#lchar(context,', character, ',', animated, ')');
    return this.oops(context);
};

/**
 * 设置中间站位人物。
 *
 * @param  {Object} context
 * @param  {bigine.entity.character=} character
 * @param  {Boolean=} animated
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.cchar = function(context, character, animated) {
    context.logger.error('bigine.runtime.director#cchar(context,', character, ',', animated, ')');
    return this.oops(context);
};

/**
 * 设置右侧站位人物。
 *
 * @param  {Object} context
 * @param  {bigine.entity.character=} character
 * @param  {Boolean=} animated
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.rchar = function(context, character, animated) {
    context.logger.error('bigine.runtime.director#rchar(context,', character, ',', animated, ')');
    return this.oops(context);
};

/**
 * 设置左侧站位人物姿态。
 *
 * @param  {Object} context
 * @param  {String} pose
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.lpose = function(context, pose) {
    context.logger.error('bigine.runtime.director#lpose(context,', pose, ')');
    return this.oops(context);
};

/**
 * 设置中间站位人物姿态。
 *
 * @param  {Object} context
 * @param  {String} pose
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.cpose = function(context, pose) {
    context.logger.error('bigine.runtime.director#cpose(context,', pose, ')');
    return this.oops(context);
};

/**
 * 设置右侧站位人物姿态。
 *
 * @param  {Object} context
 * @param  {String} pose
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.rpose = function(context, pose) {
    context.logger.error('bigine.runtime.director#rpose(context,', pose, ')');
    return this.oops(context);
};

/**
 * 获取人物站位。
 *
 * @param  {bigine.entity.character} character
 * @return {Number}
 */
bigine.runtime.director.prototype.charpos = function(character) {
    return false;
};

/**
 * 设置特写。
 *
 * @param  {Object} context
 * @param  {bigine.entity.cg=} cg
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.cg = function(context, cg) {
    context.logger.error('bigine.runtime.director#cg(context,', cg, ')');
    return this.oops(context);
};

/**
 * 设置背景音乐。
 *
 * @param  {Object} context
 * @param  {bigine.entity.bgm=} bgm
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.bgm = function(context, bgm) {
    context.logger.error('bigine.runtime.director#bgm(context,', bgm, ')');
    return this.oops(context);
};

/**
 * 播放音效。
 *
 * @param  {Object} context
 * @param  {bigine.entity.se=} sound
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.se = function(context, sound) {
    context.logger.error('bigine.runtime.director#se(context,', sound, ')');
    return this.oops(context);
};

/**
 * 选择。
 *
 * @param  {Object} context
 * @param  {Object<String>} options
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.choose = function(context, options) {
    context.logger.error('bigine.runtime.director#choose(context,', options, ')');
    return this.oops(context);
};

/**
 * 画外音。
 *
 * @param  {Object} context
 * @param  {String} words
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.voiceover = function(context, words) {
    context.logger.error('bigine.runtime.director#voiceover(context,', words, ')');
    return this.oops(context);
};

/**
 * 对话。
 *
 * @param  {Object} context
 * @param  {bigine.entity.character} who
 * @param  {String} words
 * @param  {String=} nick
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.say = function(context, who, words, nick) {
    context.logger.error('bigine.runtime.director#say(context,', who, ',', words, ')');
    return this.oops(context);
};

module.exports = bigine.runtime.director;
