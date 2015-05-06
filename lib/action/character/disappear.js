/**
 * 定义人物离场事件动作组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../../bigine').$namespace('.action.character')
    .$import('.tag.action');

/**
 * 人物离场事件动作组件。
 *
 * - 参数：人物
 * - 内容：无
 * - 子项：无
 *
 * ```
 * {character}
 * ```
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.action.character.disappear}
 * @constructor
 * @extends {bigine.tag.action}
 */
bigine.action.character.disappear = bigine.$extends(bigine.tag.action, function(line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.action.character.disappear';

    /**
     * 人物。
     *
     * @type {bigine.entity.character}
     */
    this.character = params[0];
});

/** @inheritDoc */
bigine.action.character.disappear.prototype.$expectParams = function() {
    return [1, 1];
};

/** @inheritDoc */
bigine.action.character.disappear.prototype.$bind = function(episode) {
    bigine.tag.action.prototype.$bind.call(this, episode);
    this.character = episode.character(this.character);
    return this;
};

/** @inheritDoc */
bigine.action.character.disappear.prototype.act = function(context) {
    var pos = context.director.charpos(this.character);
    if (0 > pos) {
        return context.director.oops(context);
    }
    pos = 'lcr'[pos] + 'char';
    return context.director[pos](context);
};

module.exports = bigine.action.character.disappear;
