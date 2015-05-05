/**
 * 定义事件类型标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('bigine/core/component').$namespace('.tag.scene', require('bigine/tag/scene'));

bigine.core.tag = require('bigine/core/tag');

/**
 * 事件类型标签组件。
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
    var grammar = /^([^（]+)(?:|（(\S+)）(前|后))$/,
        tokens = grammar.exec(content);
    if (!tokens) {
        throw new bigine.error('无效地事件类型“' + content + '”', this.$line);
    }
    switch (tokens[1]) {
        case '进入':
            this.id = 'enter.';
            this.kind = 'room';
            break;
        case '离开':
            this.id = 'leave.';
            this.kind = 'room';
            break;
        case '开始时':
            this.id = 'start';
            this.kind = 'episode';
            break;
        case '完结时':
            this.id = 'finish';
            this.kind = 'episode';
            break;
        case '失败时':
            this.id = 'fail';
            this.kind = 'episode';
            break;
        default:
            throw new bigine.error('无效地事件类型“' + tokens[1] + '”', line);
    }
    if ('room' == this.kind) {
        if (!tokens[2]) {
            throw new bigine.error('房间参数缺失', this.$line);
        }
        this.reference = tokens[2];
        this.id += '前' == tokens[3] ? 'before' : 'after';
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
