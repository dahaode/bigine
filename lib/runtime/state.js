/**
 * 定义运行时状态组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('bigine/core/component').$namespace('.runtime');

/**
 * 运行时状态组件。
 *
 * @return {bigine.runtime.state}
 * @constructor
 * @extends {bigine.core.component}
 */
bigine.runtime.state = bigine.core.component.$extends(bigine.core.component, function() {
    /** @override */
    this.$prototype = 'bigine.runtime.state';
});

module.exports = bigine.runtime.state;
