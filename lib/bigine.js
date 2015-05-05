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
    'bigine.core.tag',

    'bigine.tag.root',

    'bigine.tag.object',
    'bigine.object.common.image',
    'bigine.object.common.audio',
    'bigine.object.bgm',
    'bigine.object.cg',
    'bigine.object.character',
    'bigine.object.character.avatar',
    'bigine.object.character.pose',
    'bigine.object.map',
    'bigine.object.map.base',
    'bigine.object.map.point',
    'bigine.object.map.point.hilite',
    'bigine.object.map.point.region',
    'bigine.object.map.point.room',
    'bigine.object.room',
    'bigine.object.room.map',
    'bigine.object.room.snap',
    'bigine.object.se',
    'bigine.object.weather',

    'bigine.tag.autostart',
    'bigine.tag.player',

    'bigine.tag.scene',
    'bigine.tag.scene.type',
    'bigine.tag.scene.assertion',
    'bigine.tag.scene.plot',

    'bigine.tag.action',
    'bigine.action.character.appear',
    'bigine.action.character.disappear',
    'bigine.action.character.place',
    'bigine.action.character.pose',
    'bigine.action.dialog.monolog',
    'bigine.action.dialog.speak',
    'bigine.action.dialog.voiceover',
    'bigine.action.episode.finish',
    'bigine.action.episode.over',
    'bigine.action.room.bgm',
    'bigine.action.room.cgoff',
    'bigine.action.room.cgon',
    'bigine.action.room.fake',
    'bigine.action.room.layout',
    'bigine.action.room.move',
    'bigine.action.room.sound',
    'bigine.action.room.weather',
    'bigine.action.sequence.or',
    'bigine.action.sequence.otherwise',
    'bigine.action.sequence.then',
    'bigine.action.sequence.when',
    'bigine.action.value.assert',
    'bigine.action.value.assign',
    'bigine.action.value.case',
    'bigine.action.value.choose'
];

module.exports = bigine.bigine;
