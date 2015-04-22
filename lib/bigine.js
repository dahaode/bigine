/**
 * 定义入口组件。
 *
 * @author    郑煜宇 <zhengyuyu@kanshu.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

var bigine = {
    core: {
        runtime: require('bigine/core/runtime'),
        tag: require('bigine/core/tag'),
        token: require('bigine/core/token')
    },
    runtime: {
        director: require('bigine/runtime/director'),
        state: require('bigine/runtime/state')
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
 * @return {bigine.core.runtime}
 */
$.runtime = function(root) {
    if (root instanceof bigine.core.tag) {
        return (new bigine.core.runtime(root)).run(
            new bigine.runtime.director(),
            new bigine.runtime.state()
        );
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
 * 将令牌转换成标签实例。
 *
 * @param  {bigine.core.token} token
 * @return {bigine.core.tag}
 * @private
 */
bigine.bigine.tagize = function(token) {
    var tag = bigine.bigine.$prototypes[token.$name] || 'bigine.core.tag';
    return new (require(tag.replace(/\./g, '/')))(token.$line, token.$params, token.$content);
};

/**
 * Browserify HACK 函数。
 *
 * @return {void}
 * @deprecated
 */
bigine.bigine.__BROWSERIFY_HACK__ = function() {
    require('bigine/tag/object');
    require('bigine/object/common/audio');
    require('bigine/object/common/image');
    require('bigine/object/bgm');
    require('bigine/object/cg');
    require('bigine/object/character');
    require('bigine/object/character/avatar');
    require('bigine/object/character/pose');
    require('bigine/object/room');
    require('bigine/object/room/snap');
    require('bigine/object/se');
    require('bigine/object/weather');

    require('bigine/tag/scene');
    require('bigine/tag/scene/type');
    require('bigine/tag/scene/assertion');
    require('bigine/tag/scene/plot');

    require('bigine/tag/action');
    require('bigine/action/character/appear');
    require('bigine/action/character/disappear');
    require('bigine/action/character/place');
    require('bigine/action/character/style');
    require('bigine/action/value/assert');
    require('bigine/action/value/assign');
    require('bigine/action/value/choose');
    require('bigine/action/sequence/otherwise');
    require('bigine/action/sequence/when');
    require('bigine/action/room/bgm');
    require('bigine/action/room/cgoff');
    require('bigine/action/room/cgon');
    require('bigine/action/room/fake');
    require('bigine/action/room/layout');
    require('bigine/action/room/move');
    require('bigine/action/room/sound');
    require('bigine/action/room/weather');
    require('bigine/action/dialog/monolog');
    require('bigine/action/dialog/speak');
    require('bigine/action/dialog/voiceover');
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

/**
 * 事件动作标签映射表。
 *
 * 用于编译游戏脚本时建立标签树。
 *
 * @type {Object}
 */
bigine.bigine.$prototypes = {
    '音乐': 'bigine.object.bgm',
    '音源': 'bigine.object.common.audio',
    '画面': 'bigine.object.common.image',
    '特写': 'bigine.object.cg',
    '人物': 'bigine.object.character',
    '头像': 'bigine.object.character.avatar',
    '姿态': 'bigine.object.character.pose',
    '房间': 'bigine.object.room',
    '时刻': 'bigine.object.room.snap',
    '音效': 'bigine.object.se',
    '天气': 'bigine.object.weather',

    '事件': 'bigine.tag.scene',
    '时间': 'bigine.tag.scene.type',
    '条件': 'bigine.tag.scene.assertion',
    '内容': 'bigine.tag.scene.plot',

    '人物出场': 'bigine.action.character.appear',
    '人物离场': 'bigine.action.character.disappear',
    '设置人物': 'bigine.action.character.place',
    '改变神态': 'bigine.action.character.style',

    '当数据': 'bigine.action.value.assert',
    '设置数据': 'bigine.action.value.assign',
    '选择': 'bigine.action.value.choose',

    '否则': 'bigine.action.sequence.otherwise',
    '如果': 'bigine.action.sequence.when',

    '播放音乐': 'bigine.action.room.bgm',
    '关闭特写': 'bigine.action.room.cgoff',
    '展示特写': 'bigine.action.room.cgon',
    '设置房间': 'bigine.action.room.fake',
    '设置时间': 'bigine.action.room.layout',
    '进入房间': 'bigine.action.room.move',
    '播放音效': 'bigine.action.room.sound',
    '设置天气': 'bigine.action.room.weather',

    '独白': 'bigine.action.dialog.monolog',
    '对白': 'bigine.action.dialog.speak',
    '旁白': 'bigine.action.dialog.voiceover'
};

module.exports = bigine.bigine;
