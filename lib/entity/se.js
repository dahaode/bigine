/**
 * 定义音效实体组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../bigine').$namespace('.entity')
    .$import('.tag.entity');

/**
 * 音效实体组件。
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
 * @return {bigine.entity.se}
 * @constructor
 * @extends {bigine.tag.entity}
 */
bigine.entity.se = bigine.$extends(bigine.tag.entity, function (line, params, content) {
    bigine.tag.entity.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.entity.se';

    /**
     * 音源。
     *
     * @type {bigine.entity.common.audio}
     */
    this.audio = undefined;
});

/** @inheritDoc */
bigine.entity.se.prototype.$expectChildren = function() {
    return {
        'bigine.entity.common.audio': 'audio'
    };
};

/** @inheritDoc */
bigine.entity.se.prototype.$register = function(episode) {
    episode.se(this);
    return bigine.tag.entity.prototype.$register.call(this, episode);
};

module.exports = bigine.entity.se;
