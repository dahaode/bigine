/**
 * 定义人物对象组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../bigine').$namespace('.entity')
    .$import('.tag.entity');

/**
 * 人物对象组件。
 *
 * - 参数：无
 * - 内容：名称
 * - 子项：头像、姿态集合
 *
 * ```
 * {
 *   id,
 *   title,
 *   avatar: {src},
 *   poses: {length, <TITLE>...},
 *   pose
 * }
 * ```
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.entity.character}
 * @constructor
 * @extends {bigine.tag.entity}
 */
bigine.entity.character = bigine.$extends(bigine.tag.entity, function (line, params, content) {
    bigine.tag.entity.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.entity.character';

    /**
     * 头像。
     *
     * @type {bigine.entity.character.avatar}
     */
    this.avatar =

    /**
     * 姿态集合。
     *
     * @type {bigine.entity.character.pose}
     */
    this.poses = undefined;

    /**
     * 当前姿态。
     *
     * @type {String}
     * @see  bigine.action.character.appear#act
     */
    this.pose = '常态';
});

/** @inheritDoc */
bigine.entity.character.prototype.$expectChildren = function() {
    return {
        'bigine.entity.character.avatar': 'avatar',
        'bigine.entity.character.pose': 'poses'
    };
};


/** @inheritDoc */
bigine.entity.character.prototype.$register = function(episode) {
    episode.character(this);
    return bigine.tag.entity.prototype.$register.call(this, episode);
};

module.exports = bigine.entity.character;
