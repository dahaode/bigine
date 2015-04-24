/**
 * 定义运行时场面（视觉、听觉、交互）指挥器工厂组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('bigine/core/component').$namespace('.runtime.director', require('bigine/runtime/director'));

/**
 * 运行时场面（视觉、听觉、交互）指挥器工厂组件。
 *
 * @return {bigine.runtime.director}
 * @static
 */
bigine.runtime.director.factory = function() {
    return new bigine.runtime.director();
};

module.exports = bigine.runtime.director.factory;
