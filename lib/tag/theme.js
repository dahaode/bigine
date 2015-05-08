/**
 * 定义主题标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../bigine').$namespace('.tag')
    .$import('.core.tag')
    .$import('.util.resource');

/**
 * 主题标签组件。
 *
 * - 参数：无
 * - 内容：主题编号
 * - 子项：无
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.tag.theme}
 * @constructor
 * @extends {bigine.core.tag}
 */
bigine.tag.theme = bigine.$extends(bigine.core.tag, function (line, params, content) {
    bigine.core.tag.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.tag.theme';

    /**
     * 配置。
     *
     * @type {Object}
     * @dict
     */
    this.config = content;
});

/** @inheritDoc */
bigine.tag.theme.prototype.$register = function(episode) {
    bigine.core.tag.prototype.$register.call(this, episode);
    bigine.util.resource.get(this.config).then(function (data) {
        this.config = JSON.parse(data);
    });
    return this;
};

module.exports = bigine.tag.theme;
