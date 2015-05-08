/**
 * 定义设置人物事件动作组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../../bigine').$namespace('.action.character')
    .$import('.tag.action');

/**
 * 设置人物事件动作组件。
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
 * @return {bigine.action.character.place}
 * @constructor
 * @extends {bigine.tag.action}
 */
bigine.action.character.place = bigine.$extends(bigine.tag.action, function (line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.action.character.place';

    /**
     * 站位。
     *
     * @type {String}
     */
    this.position = 'c';

    switch (params.length ? params[0] : '中') {
        case '左':
            this.position = 'l';
            break;
        case '中':
            this.position = 'c';
            break;
        case '右':
            this.position = 'r';
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
bigine.action.character.place.prototype.$expectParams = function() {
    return [0, 1];
};

/** @inheritDoc */
bigine.action.character.place.prototype.$expectContent = function() {
    return true;
};

/** @inheritDoc */
bigine.action.character.place.prototype.$bind = function(episode) {
    bigine.tag.action.prototype.$bind.call(this, episode);
    this.character = episode.character(this.character);
    return this;
};

/** @inheritDoc */
bigine.action.character.place.prototype.act = function(context) {
    this.character.pose = this.pose;
    return context.director[this.position + 'char'](context, this.character);
};

module.exports = bigine.action.character.place;
