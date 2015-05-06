/**
 * 定义运行时场面（视觉、听觉、交互）指挥器工厂组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../../bigine').$namespace('.runtime.director')
    .$import('.runtime.director.classic')
    .$import('.runtime.director.node');

/**
 * 运行时场面（视觉、听觉、交互）指挥器工厂组件。
 *
 * @return {bigine.runtime.director}
 * @static
 */
bigine.runtime.director.factory = function() {
    if (bigine.runtime.director.isNodeJS() && !bigine.runtime.director.isNodeWebkit()) {
        return new bigine.runtime.director.node();
    }
    var size = bigine.runtime.director.getImageSize();
    if (bigine.runtime.director.isMobile()) {
        if (size < 481) {
            return new bigine.runtime.director();
        }
        return new bigine.runtime.director();
    }
    if (bigine.runtime.director.BROWSER_IE == bigine.runtime.director.getBrowser() &&
        9 > parseInt(0 + bigine.runtime.director.getBrowserVersion(), 10)
    ) {
        return new bigine.runtime.director.classic();
    }
    return new bigine.runtime.director.classic();
};

module.exports = bigine.runtime.director.factory;
