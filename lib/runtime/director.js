/**
 * 定义运行时场面（视觉、听觉、交互）指挥器组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 DaHao.de
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

    /**
     * 运行时。
     *
     * @type {bigine.runtime.runtime}
     */
    this.runtime =

    /**
     * 当前展示房间。
     *
     * @type {bigine.entity.room}
     */
    this.room =

    /**
     * 当前左位人物。
     *
     * @type {bigine.entity.character}
     */
    this.leftChar =

    /**
     * 当前中位人物。
     *
     * @type {bigine.entity.character}
     */
    this.middleChar =

    /**
     * 当前右位人物。
     *
     * @type {bigine.entity.character}
     */
    this.rightChar = undefined;

    /**
     * 当前幕帘状态。
     *
     * @type {Boolean}
     */
    this.curtain = true;

    /**
     * 当前时间。
     *
     * @type {String}
     */
    this.time = '午';
});

/**
 * 左位。
 *
 * @define {String}
 */
bigine.runtime.director.POS_LEFT = '左';

/**
 * 中位。
 *
 * @define {String}
 */
bigine.runtime.director.POS_MIDDLE = '中';

/**
 * 右位。
 *
 * @define {String}
 */
bigine.runtime.director.POS_RIGHT = '右';

/**
 * 初始化。
 *
 * @param  {bigine.runtime.runtime} runtime
 * @return {Boolean} 是否自动播放
 */
bigine.runtime.director.prototype.init = function(runtime) {
    context.logger.error('bigine.runtime.director#init(runtime)');
    return false;
};

/**
 * 播放。
 *
 * @return {bigine.runtime.director}
 */
bigine.runtime.director.prototype.play = function() {
    context.logger.error('bigine.runtime.director#play()');
    return this;
};

/**
 * 无画面变更。
 *
 * 此方法用于不涉及场面控制变化地游戏事件动作组件。
 *
 * @param  {Object} context
 * @return {bigine.util.promise}
 * @final
 */
bigine.runtime.director.prototype.oops = function(context) {
    return bigine.util.promise.resolve(context);
};

/**
 * 设置房间。
 *
 * @param  {{room}} metas
 * @param  {Object} context
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.setRoom = function(metas, context) {
    context.logger.error('bigine.runtime.director#setRoom(', metas, ', context)');
    return this.oops(context);
};


/**
 * 设置时间。
 *
 * @param  {{time}} metas
 * @param  {Object} context
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.setTime = function(metas, context) {
    context.logger.error('bigine.runtime.director#setTime(', metas, ', context)');
    return this.oops(context);
};

/**
 * 独白。
 *
 * @param  {{id, words}} metas
 * @param  {Object} context
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.voiceover = function(metas, context) {
    context.logger.error('bigine.runtime.director#voiceover(', metas, ', context)');
    return this.oops(context);
};

/**
 * 人物出场。
 *
 * @param  {{character, position, pose}} metas
 * @param  {Object} context
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.charTowards = function(metas, context) {
    context.logger.error('bigine.runtime.director#charTowards(', metas, ', context)');
    return this.oops(context);
};

/**
 * 对白。
 *
 * @param  {{id, words, from, to, nick}} metas
 * @param  {Object} context
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.speak = function(metas, context) {
    context.logger.error('bigine.runtime.director#speak(', metas, ', context)');
    return this.oops(context);
};

/**
 * 显示特写。
 *
 * @param  {{cg}} metas
 * @param  {Object} context
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.showCG = function(metas, context) {
    context.logger.error('bigine.runtime.director#showCG(', metas, ', context)');
    return this.oops(context);
};

/**
 * 对白。
 *
 * @param  {{id, words, player}} metas
 * @param  {Object} context
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.monolog = function(metas, context) {
    context.logger.error('bigine.runtime.director#monolog(', metas, ', context)');
    return this.oops(context);
};

/**
 * 关闭特写。
 *
 * @param  {Object} context
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.clearCG = function(context) {
    context.logger.error('bigine.runtime.director#clearCG(context)');
    return this.oops(context);
};

/**
 * 改变人物姿态。
 *
 * @param  {{chracter, pose}} metas
 * @param  {Object} context
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.changePose = function(metas, context) {
    context.logger.error('bigine.runtime.director#changePose(', metas, 'context)');
    return this.oops(context);
};

/**
 * 幕间休息。
 *
 * @param  {Object} context
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.rest = function(context) {
    context.logger.error('bigine.runtime.director#rest(context)');
    return this.oops(context);
};

/**
 * 进入自由模式。
 *
 * @param  {Object} context
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.free = function(context) {
    context.logger.error('bigine.runtime.director#free(context)');
    return this.oops(context);
};

/**
 * 提示。
 *
 * @param  {{words}} metas
 * @param  {Object} context
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.tip = function(metas, context) {
    context.logger.error('bigine.runtime.director#tip(', metas, ', context)');
    return this.oops(context);
};

/**
 * 人物离场。
 *
 * @param  {{character}} metas
 * @param  {Object} context
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.charAway = function(metas, context) {
    context.logger.error('bigine.runtime.director#charAway(', metas, ', context)');
    return this.oops(context);
};

/**
 * 设置人物。
 *
 * @param  {{character, position, pose}} metas
 * @param  {Object} context
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.setChar = function(metas, context) {
    context.logger.error('bigine.runtime.director#setChar(', metas, ', context)');
    return this.oops(context);
};

/**
 * 选择。
 *
 * @param  {{options}} metas
 * @param  {Object} context
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.choose = function(metas, context) {
    context.logger.error('bigine.runtime.director#choose(', metas, ', context)');
    return this.oops(context);
};

/**
 * 播放背景音乐。
 *
 * @param  {{bgm}} metas
 * @param  {Object} context
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.playBGM = function(metas, context) {
    context.logger.error('bigine.runtime.director#playBGM(', metas, ', context)');
    return this.oops(context);
};

/**
 * 播放音效。
 *
 * @param  {{se}} metas
 * @param  {Object} context
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.playSE = function(metas, context) {
    context.logger.error('bigine.runtime.director#playSE(', metas, ', context)');
    return this.oops(context);
};

/**
 * 播放 END 。
 *
 * @param  {Object} context
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.end = function(context) {
    context.logger.error('bigine.runtime.director#end(context)');
    return this.oops(context);
};

/**
 * 评分。
 *
 * @param  {{rank}} metas
 * @param  {Object} context
 * @return {bigine.util.promise}
 */
bigine.runtime.director.prototype.rank = function(metas, context) {
    context.logger.error('bigine.runtime.director#rank(', metas, ', context)');
    return this.oops(context);
};

/**
 * 销毁。
 *
 * @return {void}
 */
bigine.runtime.director.prototype.destory = function() {
    context.logger.error('bigine.runtime.director#destory()');
};

module.exports = bigine.runtime.director;
