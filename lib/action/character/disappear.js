/**
 * 定义人物离场事件动作组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 DaHao.de
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../../bigine').$namespace('.action.character')
    .$import('.error')
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
bigine.action.character.disappear = bigine.$extends(bigine.tag.action, function (line, params, content) {
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
    this.character = episode.character(this.character);
    return bigine.tag.action.prototype.$bind.call(this, episode);
};

/** @inheritDoc */
bigine.action.character.disappear.prototype.act = function(context) {
    if (!this.character.position) {
        return bigine.util.promise.reject(new bigine.error('人物“' + this.character.title + '”不在场', this.$line));
    }
    context.logger.info(' [episode]', this.character.title, '离场');
    var self = this;
    return context.director.charAway(this, context).then(function () {
        self.character.position = undefined;
        return context;
    });
};

module.exports = bigine.action.character.disappear;
