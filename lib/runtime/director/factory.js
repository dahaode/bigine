/**
 * 定义运行时场面（视觉、听觉、交互）指挥器工厂组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../../bigine').$namespace('.runtime.director')
    .$import('.runtime.env')
    .$import('.runtime.director.classic')
    .$import('.runtime.director.node');

/**
 * 运行时场面（视觉、听觉、交互）指挥器工厂组件。
 *
 * @return {bigine.runtime.director}
 * @static
 */
bigine.runtime.director.factory = function() {
    if (bigine.runtime.env.node.js && !bigine.runtime.env.node.webkit) {
        return new bigine.runtime.director.node();
    }
    if (bigine.runtime.env.mobile) {
        if (bigine.runtime.env.screen.width < 481) {
            return new bigine.runtime.director();
        }
        return new bigine.runtime.director();
    }
    return new bigine.runtime.director.classic();
};

module.exports = bigine.runtime.director.factory;
