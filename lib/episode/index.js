/**
 * 定义标签索引表。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 DaHao.de
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../bigine').$namespace('.episode');

/**
 * 标签索引表。
 *
 * 本索引表用于运行脚本重建标签树。
 *
 * @type {Array<String>}
 */
bigine.episode.index = [
    'bigine.action.character.appear',
    'bigine.action.character.disappear',
    'bigine.action.character.place',
    'bigine.action.character.pose',
    'bigine.action.dialog.monolog',
    'bigine.action.dialog.speak',
    'bigine.action.dialog.tip',
    'bigine.action.dialog.voiceover',
    'bigine.action.episode.autosave',
    'bigine.action.episode.done',
    'bigine.action.episode.fail',
    'bigine.action.episode.rank',
    'bigine.action.room.bgm',
    'bigine.action.room.cgoff',
    'bigine.action.room.cgon',
    'bigine.action.room.fake',
    'bigine.action.room.halt',
    'bigine.action.room.layout',
    'bigine.action.room.move',
    'bigine.action.room.sound',
    'bigine.action.room.weather',
    'bigine.action.value.and',
    'bigine.action.value.assert',
    'bigine.action.value.assign',
    'bigine.action.value.test',
    'bigine.action.value.choose',
    'bigine.action.value.or',
    'bigine.action.value.otherwise',
    'bigine.action.value.then',
    'bigine.action.value.when',
    'bigine.action.value.xcrease',

    'bigine.entity.common.image',
    'bigine.entity.common.audio',
    'bigine.entity.bgm',
    'bigine.entity.cg',
    'bigine.entity.character',
    'bigine.entity.character.avatar',
    'bigine.entity.character.pose',
    'bigine.entity.map',
    'bigine.entity.map.base',
    'bigine.entity.map.point',
    'bigine.entity.map.point.hilite',
    'bigine.entity.map.point.region',
    'bigine.entity.map.point.room',
    'bigine.entity.room',
    'bigine.entity.room.map',
    'bigine.entity.room.snap',
    'bigine.entity.se',
    'bigine.entity.weather',

    'bigine.tag.scene',
    'bigine.tag.scene.type',
    'bigine.tag.scene.assertion',
    'bigine.tag.scene.plot',

    'bigine.core.tag',

    'bigine.tag.autostart',
    'bigine.tag.player',
    'bigine.tag.suite',
    'bigine.tag.theme',

    'bigine.action.value.loop',
    'bigine.action.value.break'
];

module.exports = bigine.episode.index;
