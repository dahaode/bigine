/**
 * 定义脚本解析组件。
 *
 * @author    郑煜宇 <zhengyuyu@kanshu.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

module.exports = (function () {
    'use strict';

    var bigine = {
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
            grammar = /^(\t*)([^\s（：]+)(?:|：(.*)|（([^）]*)）(?:|：(.*)))$/,
            ii,
            jj,
            kk;
        for (ii = 0; ii < lines.length; ii++) {
            jj = grammar.exec(lines[ii]);
            if (!jj) {
                throw new Error('脚本第 ' + (1 + ii) + ' 行语法格式有误。');
            }
            if (!$.map[jj[2]]) {
                throw new Error('脚本第 ' + (1 + ii) + ' 行标签无法被识别。');
            }
            kk = {
                line: 1 + ii,
                depth: jj[1].length,
                id: $.map[jj[2]],
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
                throw new Error('脚本第 ' + tokens[ii].line + ' 行缩进深度有误。');
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
        return require('./lib/' + token.id.split('.').slice(1).join('/'))(token.line, token.params, token.content);
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
     * @param  {Object} map 标签映射表
     * @return {bigine.util.parser}
     */
    bigine.util.parser.parse = function(source, map) {
        $.map = map;
        return new bigine.util.parser('string' == typeof source ? source.split(/\n/) : source);
    };

    return bigine.util.parser;
})();
