/**
 * 定义游戏标签映射表。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 DaHao.de
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../bigine').$namespace('.episode');

/**
 * 游戏标签映射表。
 *
 * 本映射表用于解析源代码。
 *
 * @enum {String}
 */
bigine.episode.game = {
    '音乐': 'bigine.entity.bgm',
    '音源': 'bigine.entity.common.audio',
    '画面': 'bigine.entity.common.image',
    '特写': 'bigine.entity.cg',
    '人物': 'bigine.entity.character',
    '头像': 'bigine.entity.character.avatar',
    '姿态': 'bigine.entity.character.pose',
    '地图': 'bigine.entity.map',
    '底图': 'bigine.entity.map.base',
    '交互点': 'bigine.entity.map.point',
    '高亮': 'bigine.entity.map.point.hilite',
    '区域': 'bigine.entity.map.point.region',
    '对应房间': 'bigine.entity.map.point.room',
    '房间': 'bigine.entity.room',
    '使用地图': 'bigine.entity.room.map',
    '时刻': 'bigine.entity.room.snap',
    '音效': 'bigine.entity.se',
    '天气': 'bigine.entity.weather',

    '自动播放': 'bigine.tag.autostart',
    '主角': 'bigine.tag.player',
    '素材包': 'bigine.tag.suite',
    '主题': 'bigine.tag.theme',

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
    '提示': 'bigine.action.dialog.tip',
    '旁白': 'bigine.action.dialog.voiceover',

    '自动存档': 'bigine.action.episode.autosave',
    '游戏结束': 'bigine.action.episode.done',
    '游戏完结': 'bigine.action.episode.done',
    '游戏失败': 'bigine.action.episode.fail',
    '评分': 'bigine.action.episode.rank',

    '播放音乐': 'bigine.action.room.bgm',
    '关闭特写': 'bigine.action.room.cgoff',
    '展示特写': 'bigine.action.room.cgon',
    '设置房间': 'bigine.action.room.fake',
    '移动中止': 'bigine.action.room.halt',
    '设置时间': 'bigine.action.room.layout',
    '进入房间': 'bigine.action.room.move',
    '播放音效': 'bigine.action.room.sound',
    '设置天气': 'bigine.action.room.weather',

    '当数据': 'bigine.action.value.assert',
    '当线索': 'bigine.action.value.assert',
    '设置数据': 'bigine.action.value.assign',
    '设置线索': 'bigine.action.value.assign',
    '选择': 'bigine.action.value.choose',
    '对比数据': 'bigine.action.value.test',
    '对比线索': 'bigine.action.value.test',
    '增加数据': 'bigine.action.value.xcrease',
    '循环中止': 'bigine.action.value.break',

    '且': 'bigine.action.value.and',
    '或': 'bigine.action.value.or',
    '否则': 'bigine.action.value.otherwise',
    '那么': 'bigine.action.value.then',
    '如果': 'bigine.action.value.when',
    '循环': 'bigine.action.value.loop'
};

module.exports = bigine.episode.game;
