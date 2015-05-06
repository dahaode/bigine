/**
 * 定义人物实体姿态标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../../bigine').$namespace('.entity.character')
    .$import('.core.tag');

/**
 * 人物实体姿态标签组件。
 *
 * - 参数：无
 * - 内容：无
 * - 子项：姿态
 *
 * ```
 * {length, <TITLE>...}
 * ```
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.entity.character.pose}
 * @constructor
 * @extends {bigine.core.tag}
 */
bigine.entity.character.pose = bigine.$extends(bigine.core.tag, function(line, params, content) {
    bigine.core.tag.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.entity.character.pose';

    /**
     * 姿态总数。
     *
     * @type {Number}
     */
    this.length = 0;
});

/** @inheritDoc */
bigine.entity.character.pose.prototype.$expectContent = function() {
    return false;
};

/** @inheritDoc */
bigine.entity.character.pose.prototype.$expectChildren = function() {
    return {
        'bigine.core.tag': true
    };
};

/** @inheritDoc */
bigine.entity.character.pose.prototype.$bind = function(episode) {
    bigine.core.tag.prototype.$bind.call(this, episode);
    for (var ii = 0; ii < this.$children.length; ii++) {
        this[this.$children[ii].$params[0]] = this.$children[ii].$content;
    }
    this.length = this.$children.length;
    return this;
};

module.exports = bigine.entity.character.pose;
