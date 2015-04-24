/**
 * 定义入口组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

var bigine = {
    core: {
        tag: require('bigine/core/tag'),
        token: require('bigine/core/token')
    },
    runtime: {
        runtime: require('bigine/runtime/runtime')
    }
},
    $ = {};

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
 * 获取指定标签类。
 *
 * @param  {Integer|String} prototype
 * @return {bigine.core.tag}
 */
$.require = function(prototype) {
    if ('number' != typeof prototype || !bigine.bigine.$tags[prototype]) {
        return;
    }
    return function(id, line, params, content, children) {
        var tag = new (require(bigine.bigine.$tags[prototype].replace(/\./g, '/')))(line, params, content || '');
        tag.$id = id;
        tag.$children = children || [];
        return tag;
    };
};

/**
 * 入口函数。
 *
 * @param  {any} source
 * @return {any}
 */
bigine.bigine = function(source) {
    return $.runtime(source) || $.require(source) || $.parse(source);
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
    'bigine.object.room',
    'bigine.object.room.snap',
    'bigine.object.se',
    'bigine.object.weather',

    'bigine.tag.player',

    'bigine.tag.scene',
    'bigine.tag.scene.type',
    'bigine.tag.scene.assertion',
    'bigine.tag.scene.plot',

    'bigine.tag.action',
    'bigine.action.character.appear',
    'bigine.action.character.disappear',
    'bigine.action.character.place',
    'bigine.action.character.style',
    'bigine.action.dialog.monolog',
    'bigine.action.dialog.speak',
    'bigine.action.dialog.voiceover',
    'bigine.action.room.bgm',
    'bigine.action.room.cgoff',
    'bigine.action.room.cgon',
    'bigine.action.room.fake',
    'bigine.action.room.layout',
    'bigine.action.room.move',
    'bigine.action.room.sound',
    'bigine.action.room.weather',
    'bigine.action.sequence.otherwise',
    'bigine.action.sequence.when',
    'bigine.action.value.assert',
    'bigine.action.value.assign',
    'bigine.action.value.choose'
];

module.exports = bigine.bigine;
