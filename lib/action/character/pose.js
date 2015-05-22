/**
 * 定义改变姿态事件动作组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../../bigine').$namespace('.action.character')
    .$import('.error')
    .$import('.tag.action')
    .$import('.util.promise');

/**
 * 改变姿态事件动作组件。
 *
 * - 参数：人物
 * - 内容：姿态
 * - 子项：无
 *
 * ```
 * {character, pose}
 * ```
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.action.character.pose}
 * @constructor
 * @extends {bigine.tag.action}
 */
bigine.action.character.pose = bigine.$extends(bigine.tag.action, function (line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.action.character.pose';

    /**
     * 人物。
     *
     * @type {bigine.entity.character}
     */
    this.character = params[0];
    /**
     * 姿态。
     *
     * @type {String}
     */
    this.pose = content;
});

/** @inheritDoc */
bigine.action.character.pose.prototype.$expectParams = function() {
    return [1, 1];
};

/** @inheritDoc */
bigine.action.character.pose.prototype.$expectContent = function() {
    return true;
};

/** @inheritDoc */
bigine.action.character.pose.prototype.$bind = function(episode) {
    this.character = episode.character(this.character);
    return bigine.tag.action.prototype.$bind.call(this, episode);
};

/** @inheritDoc */
bigine.action.character.pose.prototype.act = function(context) {
    if (!this.character.position) {
        return bigine.util.promise.reject(new bigine.error('人物“' + this.character.title + '”不在场', this.$line));
    }
    if (this.character.pose == this.pose) {
        return context.director.oops(context);
    }
    context.logger.info(' [episode]', this.character.title, this.pose);
    this.character.pose = this.pose;
    return context.director.changePose(this, context);
};

module.exports = bigine.action.character.pose;
