/**
 * 定义脚本解析组件。
 *
 * @author    郑煜宇 <zhengyuyu@kanshu.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

var bigine = {
    core: {
        tag: {
            factory: require('lib/core/tag/factory')
        }
    },
    error: require('lib/error'),
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
        grammar = /^(\t*)(?:|([^\s（：]+)(?:|：(.*)|（([^）]*)）(?:|：(.*))))$/,
        ii,
        jj,
        kk;
    for (ii = 0; ii < lines.length; ii++) {
        jj = grammar.exec(lines[ii]);
        if (!jj) {
            throw new bigine.error('语法格式有误', 1 + ii);
        }
        if (!jj[2]) {
            continue;
        }
        kk = {
            line: 1 + ii,
            depth: jj[1].length,
            id: bigine.core.tag.factory.map[jj[2]] || 'bigine.core.tag',
            name: jj[2],
            params: [],
            content: jj[3] || jj[5]
        };
        if (jj[4]) {
            kk.params = jj[4].split('，');
        }
        tokens.push(kk);
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
$.hierarchize = function(tokens) {
    var hierarchy = [
        {
            $children: []
        }
    ],
        depth = 0,
        ii;
    for (ii = 0; ii < tokens.length; ii++) {
        if (tokens[ii].depth > depth + 1) {
            throw new bigine.error('缩进深度有误', tokens[ii].line);
        } else if (tokens[ii].depth == depth + 1) {
            depth = tokens[ii].depth;
        } else if (tokens[ii].depth < depth) {
            depth = tokens[ii].depth;
            hierarchy = hierarchy.slice(0, 1 + depth);
        }
        hierarchy[1 + depth] = $.instantiate(tokens[ii]);
        hierarchy[depth].$children.push(hierarchy[1 + depth]);
    }
    return hierarchy[0].$children;
};

/**
 * 将令牌转化为标签。
 *
 * @param  {Array} token
 * @return {bigine.core.tag}
 */
$.instantiate = function(token) {
    var tag = bigine.core.tag.factory(token);
    if ('bigine.core.tag' == tag.$id) {
        tag.$id = token.name;
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
    this.tags = $.hierarchize($.tokenize(lines));
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
