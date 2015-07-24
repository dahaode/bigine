/**
 * 定义循环事件动作组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 DaHao.de
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../../bigine').$namespace('.action.value')
    .$import('.error')
    .$import('.tag.action')
    .$import('.tag.scene.plot')
    .$import('.util.promise');

/**
 * 循环事件动作组件。
 *
 * - 参数：无
 * - 内容：无
 * - 子项：动作集合
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.action.value.loop}
 * @constructor
 * @extends {bigine.tag.action}
 */
bigine.action.value.loop = bigine.$extends(bigine.tag.action, function (line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.action.value.loop';
});

/** @inheritDoc */
bigine.action.value.loop.prototype.$expectChildren = function() {
    return {
        '*': true
    };
};

/** @inheritDoc */
bigine.action.value.loop.prototype.act = function(context) {
    var self = this,
        loop = function() {
            return bigine.tag.scene.plot.prototype.play.call(self, context).then(loop);
        };
    return loop().fail(function (error) {
        if (bigine.error.SIG_BREAK == error.$signal) {
            return bigine.util.promise.resolve(context);
        }
        return bigine.util.promise.reject(error);
    });
};

module.exports = bigine.action.value.loop;
