/**
 * 定义运行时关键动作（弹幕）事件组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 DaHao.de
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../../bigine').$namespace('.runtime.event');

/**
 * 运行时事件变更事件组件。
 *
 * @param  {Object=} metas
 * @return {bigine.runtime.event.act}
 * @constructor
 * @extends {bigine.core.component}
 */
bigine.runtime.event.act = bigine.$extends(bigine.runtime.event, function (metas) {
    bigine.runtime.event.call(this, metas);
    /** @override */
    this.$prototype = 'bigine.runtime.event.act';

    /**
     * 事件类型。
     *
     * @type {String}
     */
    this.type = 'act';
});

module.exports = bigine.runtime.event.act;
