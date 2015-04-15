/**
 * 定义抽象标签组件。
 *
 * @author    郑煜宇 <zhengyuyu@kanshu.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

var bigine = {
    core: {}
},
    $ = {};

/**
 * 抽象标签组件。
 *
 * @param  {Integer} line 在脚本源代码中地行号
 * @param  {Array} params 参数数组
 * @param  {String} content 内容
 * @return {bigine.core.tag}
 * @constructs
 */
bigine.core.tag = function(line, params, content) {
    this.$id = 'bigine.core.tag';
    this.$line = line;
    this.$params = params;
    this.$content = content;
    this.$children = [];
};

module.exports = bigine.core.tag;
