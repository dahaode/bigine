/**
 * 定义脚本解析组件。
 *
 * @author    郑煜宇 <zhengyuyu@kanshu.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

var bigine = {
    bigine: require('bigine/bigine'),
    core: {
        token: require('bigine/core/token')
    },
    error: require('bigine/error'),
    tag: {
        root: require('bigine/tag/root')
    },
    util: {}
},
    $ = {};

/**
 * 将脚本代码行转化为令牌。
 *
 * @param  {Array} lines 脚本源代码行数组
 * @return {Array}
 * @private
 */
$.tokenize = function(lines) {
    var tokens = [],
        blank = /^\s*$/,
        ii;
    for (ii = 0; ii < lines.length; ii++) {
        if (blank.test(lines[ii])) {
            continue;
        }
        tokens.push(new bigine.core.token(lines[ii], 1 + ii));
    }
    return tokens;
};

/**
 * 将令牌转化为层级化标签。
 *
 * @param  {Array} tokens 令牌数组
 * @return {Array}
 * @private
 */
$.hierarchize = function(root, tokens) {
    var hierarchy = [root],
        depth = 0,
        ii;
    for (ii = 0; ii < tokens.length; ii++) {
        if (tokens[ii].$depth > depth + 1) {
            throw new bigine.error('缩进深度有误', tokens[ii].$line);
        } else if (tokens[ii].$depth == depth + 1) {
            depth = tokens[ii].$depth;
        } else if (tokens[ii].$depth < depth) {
            depth = tokens[ii].$depth;
            hierarchy = hierarchy.slice(0, 1 + depth);
        }
        hierarchy[1 + depth] = $.instantiate(tokens[ii]);
        hierarchy[depth].$children.push(hierarchy[1 + depth]);
    }
    return hierarchy[0];
};

/**
 * 将令牌转化为标签。
 *
 * @param  {Array} token
 * @return {bigine.core.tag}
 */
$.instantiate = function(token) {
    var tag = bigine.bigine.tagize(token);
    if ('bigine.core.tag' == tag.$prototype) {
        tag.$params.unshift(token.$name);
    }
    return tag;
};

/**
 * 脚本解析组件。
 *
 * @param  {Array} lines 脚本源代码行数组
 * @return {bigine.util.parser}
 * @constructs
 */
bigine.util.parser = function(lines) {
    this.$tags = $.hierarchize(new bigine.tag.root(), $.tokenize(lines));
};

/**
 * 解析指定脚本字符串。
 *
 * @param  {String} source 脚本源代码字符串
 * @return {bigine.util.parser}
 */
bigine.util.parser.parse = function(source) {
    return new bigine.util.parser('string' == typeof source ? source.split(/\n/) : source);
};

module.exports = bigine.util.parser;
