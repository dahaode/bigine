/**
 * 定义运行时状态组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 DaHao.de
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../bigine').$namespace('.runtime')
    .$import('.core.component');

/**
 * 运行时状态组件。
 *
 * @return {bigine.runtime.state}
 * @constructor
 * @extends {bigine.core.component}
 */
bigine.runtime.state = bigine.$extends(bigine.core.component, function () {
    /** @override */
    this.$prototype = 'bigine.runtime.state';
});

/**
 * 转换文本中的变量内容。
 *
 * @param  {String} clob
 * @return {String}
 */
bigine.runtime.state.prototype.convert = function(clob) {
    var self = this;
    return clob.replace(/〈(.+)〉/g, function (match, p1) {
        if ('$' == p1[0]) {
            p1 = false;
        }
        return self[p1];
    });
};

module.exports = bigine.runtime.state;
