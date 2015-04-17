/**
 * 定义抽象标签组件。
 *
 * @author    郑煜宇 <zhengyuyu@kanshu.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

var bigine = {
    bigine: require('bigine/bigine'),
    core: {},
    error: require('bigine/error'),
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
    this.$id = '';
    this.$prototype = 'bigine.core.tag';
    this.$line = line;
    this.$params = params || [];
    this.$content = content;
    this.$children = [];
};

/**
 * 生成 UUID 。
 *
 * @return {String}
 */
bigine.core.tag.prototype.uuid = function() {
    this.$id = bigine.util.uuid.v1();
    return this;
};

/**
 * 转化为作品脚本。
 *
 * @param  {Integer} depth 可选。缩进深度
 * @return {String}
 */
bigine.core.tag.prototype.toString = function(depth) {
    depth = depth || 0;
    var clob = this.$prototype,
        ii,
        params = this.$params;
    for (ii in bigine.bigine.$prototypes) {
        if (this.$prototype == bigine.bigine.$prototypes[ii]) {
            clob = ii;
            break;
        }
    }
    if ('bigine.core.tag' == this.$prototype && params.length) {
        clob = params.shift();
    }
    for (ii = 0; ii < depth; ii++) {
        clob = "\t" + clob;
    }
    if (params.length) {
        clob += '（' + params.join('，') + '）';
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

/**
 * 转化为运行代码。
 *
 * @return {String}
 */
bigine.core.tag.prototype.toScript = function() {
    var clob = '$(',
        ii = bigine.bigine.$tags.indexOf(this.$prototype);
    if (-1 == ii) {
        console.log(this.$prototype);
        throw new bigine.error('未知标签“' + this.$prototype + '”', this.$line);
    }
    clob += ii + ')(' +
        (this.$id ? '"' + this.$id + '"' : 0) + ',' +
        (this.$line || 0) + ',' +
        (this.$params.length ? JSON.stringify(this.$params) : 0) + ',' +
        (this.$content ? JSON.stringify(this.$content) : 0) + ',';
    if (this.$children.length) {
        clob += '[';
        for (ii = 0; ii < this.$children.length; ii++) {
            clob += this.$children[ii].toScript();
            if (ii + 1 != this.$children.length) {
                clob += ',';
            }
        }
        clob += ']';
    } else {
        clob += '0';
    }
    clob += ')';
    return clob;
};

module.exports = bigine.core.tag;
