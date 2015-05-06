/**
 * 定义事件类型标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../../bigine').$namespace('.tag.scene')
    .$import('.error')
    .$import('.core.tag')
    .$import('.core.emittable')
    .$import('.core.scene');

/**
 * 事件类型标签组件。
 *
 * - 参数：无
 * - 内容：分类、编号、关联实体
 * - 子项：无
 *
 * ```
 * {id, kind, reference}
 * ```
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.tag.scene.type}
 * @constructor
 * @extends {bigine.core.tag}
 */
bigine.tag.scene.type = bigine.$extends(bigine.core.tag, function(line, params, content) {
    bigine.core.tag.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.tag.scene.type';

    /**
     * 编号。
     *
     * @type {String}
     */
    this.id =

    /**
     * 类型。
     *
     * @type {String}
     */
    this.kind =

    /**
     * 关联实体。
     *
     * @type {bigine.core.emittable}
     */
    this.reference = undefined;

    var grammar = /^([^（]+)(?:|（(\S+)）(前|后))$/,
        tokens = grammar.exec(content);
    if (!tokens) {
        throw new bigine.error('无效地事件类型“' + content + '”', this.$line);
    }
    grammar = '前' == tokens[3];
    switch (tokens[1]) {
        case '进入':
            this.id = grammar ?
                bigine.core.emittable.TYPE_ROOM_BEFORE_ENTER :
                bigine.core.emittable.TYPE_ROOM_AFTER_ENTER;
            this.kind = bigine.core.scene.KIND_ROOM;
            break;
        case '离开':
            this.id = grammar ?
                bigine.core.emittable.TYPE_ROOM_BEFORE_LEAVE :
                bigine.core.emittable.TYPE_ROOM_AFTER_LEAVE;
            this.kind = bigine.core.scene.KIND_ROOM;
            break;
        case '开始时':
            this.id = bigine.core.emittable.TYPE_EPISODE_BEGIN;
            this.kind = bigine.core.scene.KIND_EPISODE;
            break;
        case '完结时':
            this.id = bigine.core.emittable.TYPE_EPISODE_DONE;
            this.kind = bigine.core.scene.KIND_EPISODE;
            break;
        case '失败时':
            this.id = bigine.core.emittable.TYPE_EPISODE_FAIL;
            this.kind = bigine.core.scene.KIND_EPISODE;
            break;
        default:
            throw new bigine.error('无效地事件类型“' + tokens[1] + '”', line);
    }
    if ('room' == this.kind) {
        if (!tokens[2]) {
            throw new bigine.error('房间参数缺失', this.$line);
        }
        this.reference = tokens[2];
    }
});

/** @inheritDoc */
bigine.tag.scene.type.prototype.$bind = function(episode) {
    bigine.core.tag.prototype.$bind.call(this, episode);
    if (bigine.core.scene.KIND_ROOM == this.kind) {
        this.reference = episode.room(this.reference);
    }
    return this;
};

module.exports = bigine.tag.scene.type;
