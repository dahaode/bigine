/**
 * 定义标签抽象工厂组件。
 *
 * @author    郑煜宇 <zhengyuyu@kanshu.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

var bigine = {
    core: {
        tag: {}
    }
};

/**
 * 标签抽象工厂组件。
 *
 * @param  {Object} token
 * @return {bigine.core.tag.factory}
 * @constructs
 */
bigine.core.tag.factory = function(token) {
    return new (require('lib/' + token.id.split('.').slice(1).join('/')))(token.line, token.params, token.content);
};

bigine.core.tag.factory.__BROWSERIFY_HACK__ = function() {
    require('lib/core/tag');
    require('lib/tag/scene');
    require('lib/tag/scene/type');
    require('lib/tag/scene/assertion');
    require('lib/tag/scene/plot');

    require('lib/tag/action');
    require('lib/action/char/in');
    require('lib/action/char/out');
    require('lib/action/char/set');
    require('lib/action/char/style');
    require('lib/action/value/assert');
    require('lib/action/value/set');
    require('lib/action/room/bgm');
    require('lib/action/room/layout');
    require('lib/action/room/move');
    require('lib/action/room/set');
    require('lib/action/room/sound');
    require('lib/action/room/weather');
    require('lib/action/dialog/monolog');
    require('lib/action/dialog/speak');
    require('lib/action/dialog/voiceover');
};

bigine.core.tag.factory.map = {
    '事件': 'bigine.tag.scene',
    '时间': 'bigine.tag.scene.type',
    '条件': 'bigine.tag.scene.assertion',
    '内容': 'bigine.tag.scene.plot',

    '人物出场': 'bigine.action.char.in',
    '人物离场': 'bigine.action.char.out',
    '设置人物': 'bigine.action.char.set',
    '改变神态': 'bigine.action.char.style',

    '当数据': 'bigine.action.value.assert',
    '设置数据': 'bigine.action.value.set',

    '播放音乐': 'bigine.action.room.bgm',
    '设置时间': 'bigine.action.room.layout',
    '进入房间': 'bigine.action.room.move',
    '设置房间': 'bigine.action.room.set',
    '播放音效': 'bigine.action.room.sound',
    '设置天气': 'bigine.action.room.weather',

    '独白': 'bigine.action.dialog.monolog',
    '对白': 'bigine.action.dialog.speak',
    '旁白': 'bigine.action.dialog.voiceover'
};

module.exports = bigine.core.tag.factory;
