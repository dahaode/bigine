/**
 * 定义脚本解析组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('bigine/core/component').$namespace('.util'),
    $ = {};

bigine.core.token = require('bigine/core/token');
bigine.core.tag = require('bigine/core/tag');
bigine.core.tag.factory = require('bigine/core/tag/factory');
bigine.tag = {};
bigine.tag.root = require('bigine/tag/root');
bigine.util.helper = require('bigine/util/helper');

/**
 * 将脚本代码行转化为令牌。
 *
 * @param  {Array<String>} lines
 * @return {Array<bigine.core.token>}
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
 * @param  {bigine.tag.root} root
 * @param  {Array<bigine.core.token>} tokens
 * @return {bigine.tag.root}
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
 * @param  {bigine.core.token} token
 * @return {bigine.core.tag}
 * @private
 */
$.instantiate = function(token) {
    var tag = new (bigine.core.tag.factory(token.$name))(token.$line, token.$params, token.$content);
    if ('bigine.core.tag' == tag.$prototype) {
        tag.$params.unshift(token.$name);
    }
    return tag;
};

/**
 * 脚本解析组件。
 *
 * @param  {Array<string>} lines
 * @return {bigine.util.parser}
 * @constructor
 * @extends {bigine.core.component}
 */
bigine.util.parser = bigine.core.component.$extends(bigine.core.component, function(lines) {
    /** @override */
    this.$prototype = 'bigine.util.parser';
    $.tags = $.hierarchize(new bigine.tag.root(), $.tokenize(lines));
});

/**
 * 导出标签。
 *
 * @return {bigine.tag.root}
 */
bigine.util.parser.prototype.tags = function() {
    return $.tags;
};

/**
 * 转化为运行脚本。
 *
 * @return {String}
 * @override
 */
bigine.util.parser.prototype.toScript = function() {
    return $.tags.toScript();
};

/**
 * 解析指定脚本字符串。
 *
 * @param  {String} source
 * @return {bigine.util.parser}
 * @static
 */
bigine.util.parser.parse = function(source) {
    return new bigine.util.parser(bigine.util.helper.isString(source) ? source.split(/\n/) : source);
};

module.exports = bigine.util.parser;
