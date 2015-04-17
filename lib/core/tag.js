/**
 * 定义抽象标签组件。
 *
 * @author    郑煜宇 <zhengyuyu@kanshu.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

var bigine = {
    core: {},
    error: require('lib/error'),
    util: {
        uuid: require('node-uuid')
    }
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
    this.$id = bigine.util.uuid.v1();
    this.$prototype = 'bigine.core.tag';
    this.$line = line;
    this.$params = params || [];
    this.$content = content;
    this.$children = [];
};
bigine.core.tag.factory = require('lib/core/tag/factory');

/**
 * 转化为字符串。
 *
 * @param  {Integer} depth 可选。缩进深度
 * @return {String}
 */
bigine.core.tag.prototype.toString = function(depth) {
    depth = depth || 0;
    var clob = this.$prototype,
        ii;
    for (ii in bigine.core.tag.factory.map) {
        if (this.$prototype == bigine.core.tag.factory.map[ii]) {
            clob = ii;
            break;
        }
    }
    for (ii = 0; ii < depth; ii++) {
        clob = "\t" + clob;
    }
    if (this.$params.length) {
        clob += '（' + this.$params.join('，') + '）';
    }
    if (this.$content || this.$children.length) {
        clob += '：';
    }
    clob += (this.$content || '') + "\n";
    for (ii = 0; ii < this.$children.length; ii++) {
        clob += this.$children[ii].toString(1 + depth);
    }
    return clob;
};

module.exports = bigine.core.tag;
