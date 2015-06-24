/**
 * 定义脚本解析组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 DaHao.de
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../bigine').$namespace('.util')
    .$import('.error')
    .$import('.core.component')
    .$import('.core.token')
    .$import('.core.tag')
    .$import('.tag.root')
    .$import('.episode.game')
    .$import('.runtime.logger'),
    $ = {};

/**
 * 脚本解析组件。
 *
 * @param  {Array<string>} lines
 * @return {bigine.util.parser}
 * @constructor
 * @extends {bigine.core.component}
 */
bigine.util.parser = bigine.$extends(bigine.core.component, function (lines) {
    /** @override */
    this.$prototype = 'bigine.util.parser';

    /**
     * 根标签。
     *
     * @type {bigine.tag.root}
     */
    this.tags = $.hierarchize(new bigine.tag.root(), $.tokenize(lines));
});

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
            throw new bigine.error('缩进无法正确识别', tokens[ii]);
        } else if (tokens[ii].$depth == depth + 1) {
            depth = tokens[ii].$depth;
        } else if (tokens[ii].$depth < depth) {
            depth = tokens[ii].$depth;
            hierarchy = hierarchy.slice(0, 1 + depth);
        }
        hierarchy[1 + depth] = $.tag(tokens[ii]);
        hierarchy[depth].$append(hierarchy[1 + depth]);
    }
    return hierarchy[0];
};

/**
 * 生成标签。
 *
 * @param  {bigine.core.token} token
 * @return {bigine.core.tag}
 */
$.tag = function(token) {
    if (!bigine.episode.game[token.$name]) {
        var tag = new bigine.core.tag(token.$line, token.$params, token.$content);
        tag.$params.unshift(token.$name);
        return tag;
    }
    return new (bigine.$require(bigine.episode.game[token.$name]))(token.$line, token.$params, token.$content);
};

/**
 * 转化为运行脚本。
 *
 * @param  {Number=} level
 * @return {String}
 * @override
 */
bigine.util.parser.prototype.toScript = function(level) {
    if (!bigine.util.isDefined(level)) {
        level = bigine.runtime.logger.LEVEL_SILENT;
    }
    if (bigine.runtime.logger.LEVEL_SILENT == level) {
        level = '';
    } else {
        level = ',' + level;
    }
    return '(function($){return $(' + this.tags.toScript(',0' == level) + level + ')})(require("bigine"))';
};

/**
 * 解析指定脚本字符串。
 *
 * @param  {String} source
 * @return {bigine.util.parser}
 * @static
 */
bigine.util.parser.parse = function(source) {
    return new bigine.util.parser(bigine.util.isArray(source) ? source : source.split(/\r?\n/));
};

module.exports = bigine.util.parser;
