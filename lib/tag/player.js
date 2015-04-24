/**
 * 定义主角声明标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('bigine/core/component').$namespace('.tag');

bigine.core.tag = require('bigine/core/tag');

/**
 * 主角声明标签组件。
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.tag.player}
 * @constructor
 * @extends {bigine.core.tag}
 */
bigine.tag.player = bigine.core.component.$extends(bigine.core.tag, function(line, params, content) {
    bigine.core.tag.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.tag.player';
    this.player = this.$content;
});

/** @inheritDoc */
bigine.tag.player.prototype.bind = function(episode) {
    if (!(this.player instanceof bigine.core.tag)) {
        this.player = episode.character(this.player);
        episode.player(this.player);
    }
    return this;
};

module.exports = bigine.tag.player;
