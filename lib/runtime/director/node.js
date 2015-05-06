/**
 * 定义 NodeJS 模式运行时场面（视觉、听觉、交互）指挥器组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../../bigine').$namespace('.runtime.director');

/**
 * NodeJS 模式运行时场面（视觉、听觉、交互）指挥器组件。
 *
 * @return {bigine.runtime.director.node}
 * @constructor
 * @extends {bigine.runtime.director}
 */
bigine.runtime.director.node = bigine.$extends(bigine.runtime.director, function() {
    this.$prototype = 'bigine.runtime.director.node';
});

/** @inheritDoc */
bigine.runtime.director.node.prototype.init = function(episode, context) {
    return this.oops(context);
};

/** @inheritDoc */
bigine.runtime.director.node.prototype.play = function(episode, context) {
    return this;
};

module.exports = bigine.runtime.director.node;
