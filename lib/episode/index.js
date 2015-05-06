/**
 * 定义标签索引表。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../bigine').$namespace('.episode');

/**
 * 标签索引表。
 *
 * @type {Array<String>}
 */
bigine.episode.index = [
    'bigine.core.tag',

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
    'bigine.action.episode.done',
    'bigine.action.episode.fail',
    'bigine.action.room.bgm',
    'bigine.action.room.cgoff',
    'bigine.action.room.cgon',
    'bigine.action.room.fake',
    'bigine.action.room.layout',
    'bigine.action.room.move',
    'bigine.action.room.sound',
    'bigine.action.room.weather',
    'bigine.action.value.assert',
    'bigine.action.value.assign',
    'bigine.action.value.case',
    'bigine.action.value.choose',
    'bigine.action.value.or',
    'bigine.action.value.otherwise',
    'bigine.action.value.then',
    'bigine.action.value.when'
];

module.exports = bigine.episode.index;
