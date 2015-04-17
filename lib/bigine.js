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
 * 将令牌转换成标签实例。
 *
 * @param  {bigine.core.token} token
 * @return {bigine.core.tag}
 * @private
 */
$.tag = function(token) {
    return new (require(token.$id.replace(/\./g, '/')))(token.$line, token.$params, token.$content);
};

$.parse = function(source) {
    return require('bigine/util/parser').parse(source);
};

bigine.bigine = function(source) {
    if (source instanceof bigine.core.token) {
        return $.tag(source);
    }
    return $.parse(source);
};

bigine.bigine.__BROWSERIFY_HACK__ = function() {
    require('bigine/core/tag');
    require('bigine/core/token');

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

bigine.bigine.$actions = {
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
