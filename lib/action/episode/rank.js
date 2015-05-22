/**
 * 定义评分事件动作组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
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

    /**
     * 等级。
     *
     * @type {Number}
     */
    this.rank = 1;
    switch (params[0]) {
        case '完美':
            this.rank = 3;
            break;
        case '优秀':
            this.rank = 2;
            break;
        case '及格':
            break;
        default:
            throw new bigine.error('无效地评分等级“' + this.rank + '”', line);
    }
});

/** @inheritDoc */
bigine.action.episode.rank.prototype.$expectParams = function() {
    return [1, 1];
};

module.exports = bigine.action.episode.rank;
