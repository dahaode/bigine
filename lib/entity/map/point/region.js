/**
 * 定义地图对象交互点区域标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 DaHao.de
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../../../bigine').$namespace('.entity.map.point')
    .$import('.error')
    .$import('.core.tag');

/**
 * 地图对象交互点区域标签组件。
 *
 * - 参数：无
 * - 内容：上、右、下、左
 * - 子项：无
 *
 * ```
 * {top, right, bottom, left}
 * ```
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.entity.map.point}
 * @constructor
 * @extends {bigine.core.tag}
 */
bigine.entity.map.point.region = bigine.$extends(bigine.core.tag, function (line, params, content) {
    bigine.core.tag.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.entity.map.point.region';
    params = content.split('，');
    if (4 > params.length) {
        throw new bigine.error('坐标参数数量不匹配', this);
    }

    /**
     * 上边距。
     *
     * @type {Number}
     */
    this.top = parseInt(params[0], 10);

    /**
     * 右边距。
     *
     * @type {Number}
     */
    this.right = parseInt(params[1], 10);

    /**
     * 下边距。
     *
     * @type {Number}
     */
    this.bottom = parseInt(params[2], 10);

    /**
     * 左边距。
     *
     * @type {Number}
     */
    this.left = parseInt(params[3], 10);
});

module.exports = bigine.entity.map.point.region;
