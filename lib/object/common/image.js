/**
 * 定义多对象共用地画面标签组件。
 *
 * @author    郑煜宇 <zhengyuyu@kanshu.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

var bigine = {
    core: {
        tag: require('bigine/core/tag')
    },
    object: {
        common: {}
    }
};

/**
 * 多对象共用地画面标签组件。
 *
 * @param  {Integer} line 在脚本源代码中地行号
 * @param  {Array} params 参数数组
 * @param  {String} content 内容
 * @return {bigine.object.common.image}
 * @constructs
 */
bigine.object.common.image = function(line, params, content) {
    bigine.core.tag.call(this, line, params, content);
    this.$prototype = 'bigine.object.common.image';
};
bigine.object.common.image.prototype = new bigine.core.tag();

module.exports = bigine.object.common.image;
