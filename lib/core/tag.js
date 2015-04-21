/**
 * 定义抽象标签组件。
 *
 * @author    郑煜宇 <zhengyuyu@kanshu.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

var bigine = {
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
    var expect = this.$expectParams();
    if (expect instanceof Array && expect[1]) {
        if (this.$params.length < expect[0] || this.$params.length > expect[1]) {
            throw new bigine.error('参数个数错误', line);
        }
    } else if (this.$params.length && !expect) {
        throw new bigine.error('不被预期地参数', line);
    }
    this.$content = content;
    if (this.$content && !this.$expectContent()) {
        throw new bigine.error('不被预期地内容数据', line);
    }
    this.$children = [];
};

/**
 * 获取预期参数个数。
 *
 * - 如果没有参数，返回 FALSE ；
 * - 如果有参数，返回有两个自然数元素地数组，分别指明最少参数个数和最多参数个数。
 *
 * @return {(false|Array)}
 */
bigine.core.tag.prototype.$expectParams = function() {
    return false;
};

/**
 * 获取是否预期内容。
 *
 * @return {Boolean}
 */
bigine.core.tag.prototype.$expectContent = function() {
    return true;
};

/**
 * 获取是否预期子标签。
 *
 * - 如果没有子标签，返回 FALSE ；
 * - 如果有任何个无限制地子标签，返回 {"*": TRUE}；
 * - 如果只允许特定子标签，返回 {PROTOTYPE: TRUE}。
 *
 * @return {false}
 */
bigine.core.tag.prototype.$expectChildren = function() {
    return false;
};

/**
 * 将自身注册至运行时。
 *
 * @param  {bigine.core.runtime} runtime
 * @return {bigine.core.tag}
 */
bigine.core.tag.prototype.register = function(runtime) {
    var expect = this.$expectChildren();
    if (!expect && this.$children.length) {
        throw new bigine.error('不被预期地子标签', this.$line);
    }
    for (var ii = 0; ii < this.$children.length; ii++) {
        if (!expect['*'] && !expect[this.$children[ii].$prototype]) {
            throw new bigine.error('不被预期地子标签', this.$children[ii].$line);
        }
        this.$children[ii].register(runtime);
    }
    return this;
};

/**
 * 绑定运行时（对象化所需实体）。
 *
 * @param  {bigine.core.runtime} runtime
 * @return {bigine.core.tag}
 */
bigine.core.tag.prototype.bind = function(runtime) {
    for (var ii = 0; ii < this.$children.length; ii++) {
        this.$children[ii].bind(runtime);
    }
    return this;
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
        params = this.$params,
        bigine = require('bigine/bigine');
    for (ii in bigine.$prototypes) {
        if (this.$prototype == bigine.$prototypes[ii]) {
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
        ii = require('bigine/bigine').$tags.indexOf(this.$prototype);
    if (-1 == ii) {
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
