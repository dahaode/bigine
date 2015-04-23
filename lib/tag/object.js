/**
 * 定义实体对象抽象组件。
 *
 * @author    郑煜宇 <zhengyuyu@kanshu.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

var bigine = {
    core: {
        tag: require('bigine/core/tag')
    },
    error: require('bigine/error'),
    tag: {}
},
    $ = {};

/**
 * 实体对象标签组件。
 *
 * @param  {Integer} line 在脚本源代码中地行号
 * @param  {Array} params 参数数组
 * @param  {String} content 内容
 * @return {bigine.tag.object}
 * @constructs
 */
bigine.tag.object = function(line, params, content) {
    bigine.core.tag.call(this, line, params, content);
    this.$prototype = 'bigine.tag.object';
    this.id =
    this.title = content;
};
bigine.tag.object.prototype = new bigine.core.tag();

module.exports = bigine.tag.object;
