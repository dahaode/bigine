/**
 * 定义循环中止事件动作组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 DaHao.de
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../../bigine').$namespace('.action.value')
    .$import('.error')
    .$import('.tag.action')
    .$import('.util.promise');

/**
 * 循环中止事件动作组件。
 *
 * - 参数：无
 * - 内容：无
 * - 子项：无
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.action.value.break}
 * @constructor
 * @extends {bigine.tag.action}
 */
bigine.action.value['break'] = bigine.$extends(bigine.tag.action, function (line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.action.value.break';
});

/** @inheritDoc */
bigine.action.value['break'].prototype.act = function(context) {
    return bigine.util.promise.reject(bigine.error['break']());
};

module.exports = bigine.action.value.break;
