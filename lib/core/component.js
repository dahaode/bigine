/**
 * 定义基础抽象组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 DaHao.de
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../bigine').$namespace('.core');

/**
 * 基础抽象组件。
 *
 * @return {bigine.core.component}
 * @constructor
 * @extends {Object}
 */
bigine.core.component = bigine.$extends(Object, function () {
    this.$prototype = 'bigine.core.component';
});

/**
 * @override
 */
bigine.core.component.prototype.toString = function() {
    return this.$prototype;
};

module.exports = bigine.core.component;
