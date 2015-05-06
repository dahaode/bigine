/**
 * 定义主角声明标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../bigine').$namespace('.tag')
    .$import('.core.tag');

/**
 * 主角声明标签组件。
 *
 * - 参数：无
 * - 内容：主角名
 * - 子项：无
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.tag.player}
 * @constructor
 * @extends {bigine.core.tag}
 */
bigine.tag.player = bigine.$extends(bigine.core.tag, function(line, params, content) {
    bigine.core.tag.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.tag.player';

    /**
     * 主角。
     *
     * @type {bigine.entity.character}
     */
    this.player = content;
});

/** @inheritDoc */
bigine.tag.player.prototype.$bind = function(episode) {
    bigine.core.tag.prototype.$bind.call(this, episode);
    if (!(this.player instanceof bigine.core.tag)) {
        this.player = episode.character(this.player);
        episode.player(this.player);
    }
    return this;
};

module.exports = bigine.tag.player;
