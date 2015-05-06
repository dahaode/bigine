/**
 * 定义音乐实体组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../bigine').$namespace('.entity')
    .$import('.tag.entity');

/**
 * 音乐实体组件。
 *
 * - 参数：无
 * - 内容：名称
 * - 子项：音源
 *
 * ```
 * {
 *   id,
 *   title,
 *   audio: {src}
 * }
 * ```
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.entity.bgm}
 * @constructor
 * @extends {bigine.tag.entity}
 */
bigine.entity.bgm = bigine.$extends(bigine.tag.entity, function(line, params, content) {
    bigine.tag.entity.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.entity.bgm';

    /**
     * 音源。
     *
     * @type {bigine.entity.common.audio}
     */
    this.audio = undefined;
});

/** @inheritDoc */
bigine.entity.bgm.prototype.$expectChildren = function() {
    return {
        'bigine.entity.common.audio': 'audio'
    };
};

/** @inheritDoc */
bigine.entity.bgm.prototype.$register = function(episode) {
    bigine.tag.entity.prototype.$register.call(this, episode);
    episode.bgm(this);
    return this;
};

module.exports = bigine.entity.bgm;
