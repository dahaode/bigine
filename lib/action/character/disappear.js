/**
 * 定义人物离场事件动作组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('bigine/core/component').$namespace('.action.character');

bigine.tag = {};
bigine.tag.action = require('bigine/tag/action');

/**
 * 人物离场事件动作组件。
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.action.character.disappear}
 * @constructor
 * @extends {bigine.tag.action}
 */
bigine.action.character.disappear = bigine.core.component.$extends(bigine.tag.action, function(line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.action.character.disappear';
    this.character = this.$params[0];
});

/** @inheritDoc */
bigine.action.character.disappear.prototype.$expectParams = function() {
    return [1, 1];
};

/** @inheritDoc */
bigine.action.character.disappear.prototype.bind = function(episode) {
    this.character = episode.character(this.character);
    return bigine.tag.action.prototype.bind.call(this, episode);
};

/** @inheritDoc */
bigine.action.character.disappear.prototype.act = function(context) {
    var pos = context.director.charpos(this.character);
    if (false === pos) {
        return context.director.oops(context);
    }
    pos = 'lcr'[pos] + 'char';
    return context.director[pos](context);
};

module.exports = bigine.action.character.disappear;
