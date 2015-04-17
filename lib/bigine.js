/**
 * 定义入口组件。
 *
 * @author    郑煜宇 <zhengyuyu@kanshu.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

var bigine = {
    core: {
        token: require('bigine/core/token')
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
    return $.require(source) || $.parse(source);
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

bigine.bigine.__BROWSERIFY_HACK__ = function() {
    require('bigine/core/tag');
    require('bigine/core/token');

    require('bigine/tag/root');

    require('bigine/tag/scene');
    require('bigine/tag/scene/type');
    require('bigine/tag/scene/assertion');
    require('bigine/tag/scene/plot');

    require('bigine/tag/action');
    require('bigine/action/char/in');
    require('bigine/action/char/out');
    require('bigine/action/char/set');
    require('bigine/action/char/style');
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

    require('bigine/util/parser');
};

bigine.bigine.$tags = [
    'bigine.core.tag',
    'bigine.tag.root',
    'bigine.tag.scene',
    'bigine.tag.scene.type',
    'bigine.tag.scene.assertion',
    'bigine.tag.scene.plot',
    'bigine.tag.action',
    'bigine.action.char.in',
    'bigine.action.char.out',
    'bigine.action.char.set',
    'bigine.action.char.style',
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

bigine.bigine.$prototypes = {
    '事件': 'bigine.tag.scene',
    '时间': 'bigine.tag.scene.type',
    '条件': 'bigine.tag.scene.assertion',
    '内容': 'bigine.tag.scene.plot',

    '人物出场': 'bigine.action.char.in',
    '人物离场': 'bigine.action.char.out',
    '设置人物': 'bigine.action.char.set',
    '改变神态': 'bigine.action.char.style',

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
