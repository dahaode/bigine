/**
 * 定义展示特写事件动作组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 DaHao.de
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../../bigine').$namespace('.action.room')
    .$import('.tag.action');

/**
 * 展示特写事件动作组件。
 *
 * - 参数：名称
 * - 内容：无
 * - 子项：无
 *
 * ```
 * {cg}
 * ```
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.action.room.cgon}
 * @constructor
 * @extends {bigine.tag.action}
 */
bigine.action.room.cgon = bigine.$extends(bigine.tag.action, function (line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.action.room.cgon';

    /**
     * 特写实体。
     *
     * @type {bigine.entity.cg}
     */
    this.cg = params[0];
});

/** @inheritDoc */
bigine.action.room.cgon.prototype.$expectParams = function() {
    return [1, 1];
};

/** @inheritDoc */
bigine.action.room.cgon.prototype.$bind = function(episode) {
    this.cg = episode.cg(this.cg);
    return bigine.tag.action.prototype.$bind.call(this, episode);
};

/** @inheritDoc */
bigine.action.room.cgon.prototype.act = function(context) {
    context.logger.info(' [episode] 展示特写【', this.cg.title, '】');
    return context.director.showCG(this, context);
};

module.exports = bigine.action.room.cgon;
