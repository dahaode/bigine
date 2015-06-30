/**
 * 定义评分事件动作组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 DaHao.de
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../../bigine').$namespace('.action.episode')
    .$import('.error')
    .$import('.tag.action');

/**
 * 评分事件动作组件。
 *
 * - 参数：等级
 * - 内容：无
 * - 子项：无
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.action.episode.rank}
 * @constructor
 * @extends {bigine.tag.action}
 */
bigine.action.episode.rank = bigine.$extends(bigine.tag.action, function (line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.action.episode.rank';

    if (Object.defineProperties) {
        var self = this,
            $this = {};
        Object.defineProperties(this, {
            rank: {
                get: function() {
                    return $this.rank;
                },
                set: function(value) {
                    switch (value) {
                        case bigine.action.episode.rank.S:
                        case bigine.action.episode.rank.A:
                        case bigine.action.episode.rank.C:
                            break;
                        default:
                            throw new bigine.error('无效地评分等级“' + value + '”', this);
                    }
                    $this.rank = value;
                    self.$params = [value];
                }
            }
        });
    }

    /**
     * 等级。
     *
     * @type {Number}
     */
    this.rank = params[0];
});

/**
 * 完美评级。
 *
 * @const {String}
 */
bigine.action.episode.rank.S = '完美';

/**
 * 优秀评级。
 *
 * @const {String}
 */
bigine.action.episode.rank.A = '优秀';

/**
 * 及格评级。
 *
 * @const {String}
 */
bigine.action.episode.rank.C = '及格';

/** @inheritDoc */
bigine.action.episode.rank.prototype.$expectParams = function() {
    return [1, 1];
};

/** @inheritDoc */
bigine.action.episode.rank.prototype.act = function(context) {
    return context.director.rest(context);
};

module.exports = bigine.action.episode.rank;
