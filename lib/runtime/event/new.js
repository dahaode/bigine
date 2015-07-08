/**
 * 定义运行时新游戏事件组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 DaHao.de
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../../bigine').$namespace('.runtime.event');

/**
 * 运行时新游戏事件组件。
 *
 * @param  {Object=} metas
 * @return {bigine.runtime.event.new}
 * @constructor
 * @extends {bigine.core.component}
 */
bigine.runtime.event['new'] = bigine.$extends(bigine.runtime.event, function (metas) {
    bigine.runtime.event.call(this, metas);
    /** @override */
    this.$prototype = 'bigine.runtime.event.new';

    /**
     * 事件类型。
     *
     * @type {String}
     */
    this.type = 'new';
});

module.exports = bigine.runtime.event['new'];
