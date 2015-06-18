/**
 * 定义实体抽象组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 DaHao.de
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../bigine').$namespace('.tag')
    .$import('.core.tag');

/**
 * 实体抽象组件。
 *
 * - 参数：无
 * - 内容：有
 * - 子项：无
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.tag.entity}
 * @constructor
 * @extends {bigine.core.tag}
 */
bigine.tag.entity = bigine.$extends(bigine.core.tag, function (line, params, content) {
    bigine.core.tag.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.tag.entity';

    /**
     * 唯一编号。
     *
     * @type {String}
     */
    this.id =

    /**
     * 名称。
     *
     * @type {String}
     */
    this.title = content;
});

module.exports = bigine.tag.entity;
