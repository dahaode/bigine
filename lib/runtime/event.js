/**
 * 定义运行时事件组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 DaHao.de
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../bigine').$namespace('.runtime')
    .$import('.core.component')
    .$import('.util');

/**
 * 运行时事件组件。
 *
 * @param  {Object=} metas
 * @return {bigine.runtime.event}
 * @constructor
 * @extends {bigine.core.component}
 */
bigine.runtime.event = bigine.$extends(bigine.core.component, function (metas) {
    /** @override */
    this.$prototype = 'bigine.runtime.event';

    bigine.util.each(metas || {}, function (value, key) {
        this[key] = value;
    }, this);

    /**
     * 事件类型。
     *
     * @type {String}
     */
    this.type = '';
});

module.exports = bigine.runtime.event;
