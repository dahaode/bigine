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
    require('lib/action/value/set');
    require('lib/action/room/set');
    require('lib/action/room/layout');
    require('lib/action/room/weather');
    require('lib/action/dialog/voiceover');
};

bigine.core.tag.factory.map = {
    '事件': 'bigine.tag.scene',
    '时间': 'bigine.tag.scene.type',
    '条件': 'bigine.tag.scene.assertion',
    '内容': 'bigine.tag.scene.plot',

    '设置数据': 'bigine.action.value.set',
    '设置房间': 'bigine.action.room.set',
    '设置时间': 'bigine.action.room.layout',
    '设置天气': 'bigine.action.room.weather',
    '旁白': 'bigine.action.dialog.voiceover'
};

module.exports = bigine.core.tag.factory;
