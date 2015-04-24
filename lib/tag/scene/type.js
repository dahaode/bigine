/**
 * 定义事件类型（时间）标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('bigine/core/component').$namespace('.tag.scene', require('bigine/tag/scene'));

bigine.core.tag = require('bigine/core/tag');

/**
 * 事件类型（时间）标签组件。
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.tag.scene.type}
 * @constructor
 * @extends {bigine.core.tag}
 */
bigine.tag.scene.type = bigine.core.component.$extends(bigine.core.tag, function(line, params, content) {
    bigine.core.tag.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.tag.scene.type';
    var grammar = /^([^（]+)(?:|（(\S+)）)$/,
        tokens = grammar.exec(content);
    switch (tokens[1]) {
        case '进入房间前':
            this.id = 'enter.before';
            this.kind = 'room';
            break;
        case '进入房间后':
            this.id = 'enter.after';
            this.kind = 'room';
            break;
        case '离开房间前':
            this.id = 'leave.before';
            this.kind = 'room';
            break;
        case '离开房间后':
            this.id = 'leave.after';
            this.kind = 'room';
            break;
        case '游戏开始时':
            this.id = 'start';
            this.kind = 'episode';
            break;
        case '游戏结束时':
            this.id = 'accomplish';
            this.kind = 'episode';
            break;
        case '游戏失败时':
            this.id = 'over';
            this.kind = 'episode';
            break;
        default:
            throw new bigine.error('无效地时间类型“' + tokens[1] + '”', line);
    }
    if ('room' == this.kind) {
        if (!tokens[2]) {
            throw new bigine.error('房间参数缺失', this.$line);
        }
        this.reference = tokens[2];
    }
});

/** @inheritDoc */
bigine.tag.scene.type.prototype.bind = function(episode) {
    if ('room' == this.kind) {
        this.reference = episode.room(this.reference);
    }
    return bigine.core.tag.prototype.bind.call(this, episode);
};

module.exports = bigine.tag.scene.type;
