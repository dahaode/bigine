/**
 * 定义人物出场事件动作组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 DaHao.de
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../../bigine').$namespace('.action.character')
    .$import('.error')
    .$import('.tag.action')
    .$import('.runtime.director')
    .$import('.util.promise');

/**
 * 人物出场事件动作组件。
 *
 * - 参数：位置
 * - 内容：人物、姿态
 * - 子项：无
 *
 * ```
 * {position, character, pose}
 * ```
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.action.character.appear}
 * @constructor
 * @extends {bigine.tag.action}
 */
bigine.action.character.appear = bigine.$extends(bigine.tag.action, function (line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.action.character.appear';

    /**
     * 站位。
     *
     * @type {String}
     */
    this.position = params[0] || bigine.runtime.director.POS_MIDDLE;

    switch (this.position) {
        case bigine.runtime.director.POS_LEFT:
        case bigine.runtime.director.POS_MIDDLE:
        case bigine.runtime.director.POS_RIGHT:
            break;
        default:
            throw new bigine.error('无效的位置“' + this.position + '”', this.$line);
    }
    params = this.$splitContent(2);

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
    this.pose = params[1] || '';
});

/** @inheritDoc */
bigine.action.character.appear.prototype.$expectParams = function() {
    return [0, 1];
};

/** @inheritDoc */
bigine.action.character.appear.prototype.$expectContent = function() {
    return true;
};

/** @inheritDoc */
bigine.action.character.appear.prototype.$bind = function(episode) {
    this.character = episode.character(this.character);
    return bigine.tag.action.prototype.$bind.call(this, episode);
};

/** @inheritDoc */
bigine.action.character.appear.prototype.act = function(context) {
    if (this.character.position) {
        return bigine.util.promise.reject(new bigine.error('人物“' + this.character.title + '”已在场', this.$line));
    }
    context.logger.info(' [episode]', this.character.title, '（', this.pose, '） 出场');
    this.character.position = this.position;
    this.character.pose = this.pose;
    return context.director.charTowards(this, context);
};

module.exports = bigine.action.character.appear;
