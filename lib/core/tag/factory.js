/**
 * 定义标签工厂组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('bigine/core/component').$namespace('.core.tag', require('bigine/core/tag')),
    $ = {};

/**
 * 标签工厂组件。
 *
 * @param  {bigine.core.token} token
 * @return {bigine.core.tag}
 * @static
 */
bigine.core.tag.factory = function(token) {
    if (!$.tags) {
        $.tags = [];
        for (var ii in bigine.core.tag.factory.$map) {
            $.tags.push(bigine.core.tag.factory.$map[ii]);
        }
    }
    var tag = bigine.core.tag.factory.$map[token.$name] || token.$name;
    if (-1 == $.tags.indexOf(tag)) {
        tag = new bigine.core.tag(token.$line, token.$params, token.$content);
        tag.$params.unshift(token.$name);
        return tag;
    }
    return new (require(tag.replace(/\./g, '/')))(token.$line, token.$params, token.$content);
};

/**
 * 标签中英文映射表。
 *
 * @enum {String}
 */
bigine.core.tag.factory.$map = {
    '音乐': 'bigine.object.bgm',
    '音源': 'bigine.object.common.audio',
    '画面': 'bigine.object.common.image',
    '特写': 'bigine.object.cg',
    '人物': 'bigine.object.character',
    '头像': 'bigine.object.character.avatar',
    '姿态': 'bigine.object.character.pose',
    '地图': 'bigine.object.map',
    '底图': 'bigine.object.map.base',
    '交互点': 'bigine.object.map.point',
    '高亮': 'bigine.object.map.point.hilite',
    '区域': 'bigine.object.map.point.region',
    '对应房间': 'bigine.object.map.point.room',
    '房间': 'bigine.object.room',
    '使用地图': 'bigine.object.room.map',
    '时刻': 'bigine.object.room.snap',
    '音效': 'bigine.object.se',
    '天气': 'bigine.object.weather',

    '自动播放': 'bigine.tag.autostart',
    '主角': 'bigine.tag.player',

    '事件': 'bigine.tag.scene',
    '类型': 'bigine.tag.scene.type',
    '条件': 'bigine.tag.scene.assertion',
    '内容': 'bigine.tag.scene.plot',

    '人物出场': 'bigine.action.character.appear',
    '人物离场': 'bigine.action.character.disappear',
    '设置人物': 'bigine.action.character.place',
    '改变神态': 'bigine.action.character.pose',

    '独白': 'bigine.action.dialog.monolog',
    '对白': 'bigine.action.dialog.speak',
    '旁白': 'bigine.action.dialog.voiceover',

    '游戏结束': 'bigine.action.game.finish',
    '游戏完结': 'bigine.action.game.finish',
    '游戏失败': 'bigine.action.game.over',

    '当数据': 'bigine.action.value.assert',
    '当线索': 'bigine.action.value.assert',
    '设置数据': 'bigine.action.value.assign',
    '设置线索': 'bigine.action.value.assign',
    '对比数据': 'bigine.action.value.case',
    '对比线索': 'bigine.action.value.case',
    '选择': 'bigine.action.value.choose',

    '或': 'bigine.action.sequence.or',
    '否则': 'bigine.action.sequence.otherwise',
    '那么': 'bigine.action.sequence.then',
    '如果': 'bigine.action.sequence.when',

    '播放音乐': 'bigine.action.room.bgm',
    '关闭特写': 'bigine.action.room.cgoff',
    '展示特写': 'bigine.action.room.cgon',
    '设置房间': 'bigine.action.room.fake',
    '设置时间': 'bigine.action.room.layout',
    '进入房间': 'bigine.action.room.move',
    '播放音效': 'bigine.action.room.sound',
    '设置天气': 'bigine.action.room.weather'
};

/**
 * Browserify HACK 函数。
 *
 * @return {null}
 * @ignore
 */
bigine.core.tag.factory.__BROWSERIFY_HACK__ = function() {
    require('bigine/tag/object');
    require('bigine/object/common/audio');
    require('bigine/object/common/image');
    require('bigine/object/bgm');
    require('bigine/object/cg');
    require('bigine/object/character');
    require('bigine/object/character/avatar');
    require('bigine/object/character/pose');
    require('bigine/object/map');
    require('bigine/object/map/base');
    require('bigine/object/map/point');
    require('bigine/object/map/point/hilite');
    require('bigine/object/map/point/region');
    require('bigine/object/map/point/room');
    require('bigine/object/room');
    require('bigine/object/room/map');
    require('bigine/object/room/snap');
    require('bigine/object/se');
    require('bigine/object/weather');

    require('bigine/tag/autostart');
    require('bigine/tag/player');

    require('bigine/tag/scene');
    require('bigine/tag/scene/type');
    require('bigine/tag/scene/assertion');
    require('bigine/tag/scene/plot');

    require('bigine/tag/action');
    require('bigine/action/character/appear');
    require('bigine/action/character/disappear');
    require('bigine/action/character/place');
    require('bigine/action/character/pose');
    require('bigine/action/dialog/monolog');
    require('bigine/action/dialog/speak');
    require('bigine/action/dialog/voiceover');
    require('bigine/action/game/finish');
    require('bigine/action/game/over');
    require('bigine/action/room/bgm');
    require('bigine/action/room/cgoff');
    require('bigine/action/room/cgon');
    require('bigine/action/room/fake');
    require('bigine/action/room/layout');
    require('bigine/action/room/move');
    require('bigine/action/room/sound');
    require('bigine/action/room/weather');
    require('bigine/action/sequence/or');
    require('bigine/action/sequence/otherwise');
    require('bigine/action/sequence/then');
    require('bigine/action/sequence/when');
    require('bigine/action/value/assert');
    require('bigine/action/value/assign');
    require('bigine/action/value/case');
    require('bigine/action/value/choose');
};

module.exports = bigine.core.tag.factory;
