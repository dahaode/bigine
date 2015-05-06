/**
 * 定义入口组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

var bigine = require('bigine/core/component').$namespace('.core.tag', require('bigine/core/tag')),
    $ = {};

bigine.core.tag.factory = require('bigine/core/tag/factory');
bigine.core.token = require('bigine/core/token');
bigine.runtime = {};
bigine.runtime.runtime = require('bigine/runtime/runtime');
bigine.tag = {};
bigine.tag.root = require('bigine/tag/root');

/**
 * 解析脚本源代码。
 *
 * @param  {String} source
 * @return {bigine.util.parser}
 */
$.parse = function(source) {
    return require('bigine/util/parser').parse(source);
};

/**
 * 转换标签为运行时。
 *
 * @param  {bigine.core.tag} root
 * @return {bigine.runtime.runtime}
 */
$.runtime = function(root) {
    if (root instanceof bigine.core.tag) {
        return (new bigine.runtime.runtime(root)).run();
    }
};

/**
 * 生成指定标签组件实例。
 *
 * @param  {Integer} index
 * @return {bigine.core.tag}
 */
$.instantiate = function(index, id, line, params, content, children) {
    if (6 != arguments.length || 'number' != typeof index || !bigine.bigine.$tags[index]) {
        return;
    }
    var tag;
    if ('bigine.tag.root' == bigine.bigine.$tags[index]) {
        tag = new bigine.tag.root();
        tag.$children = children || [];
        return tag;
    }
    var name;
    if ('bigine.core.tag' == bigine.bigine.$tags[index]) {
        name = params.shift();
    }
    tag = bigine.core.tag.factory({
        '$name': bigine.bigine.$tags[index],
        '$line': line,
        '$params': params || [],
        '$content': content || ''
    });
    tag.$id = id;
    tag.$children = children || [];
    if (name) {
        tag.$params[0] = name;
    }
    return tag;
};

/**
 * 入口函数。
 *
 * @param  {any} source
 * @return {any}
 */
bigine.bigine = function(source) {
    return $.runtime(source) || $.instantiate.apply($.instantiate, arguments) || $.parse(source);
};

/**
 * 标签表。
 *
 * 用于在运行游戏时重建标签树。
 *
 * @type {Array}
 */
bigine.bigine.$tags = [
];

module.exports = bigine.bigine;
