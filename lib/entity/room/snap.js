/**
 * 定义房间实体时刻标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../../bigine').$namespace('.entity.room')
    .$import('.core.tag');

/**
 * 房间实体时刻标签组件。
 *
 * - 参数：无
 * - 内容：无
 * - 子项：时刻
 *
 * ```
 * {length, <TITLE>...}
 * ```
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.entity.room.snap}
 * @constructor
 * @extends {bigine.core.tag}
 */
bigine.entity.room.snap = bigine.$extends(bigine.core.tag, function(line, params, content) {
    bigine.core.tag.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.entity.room.snap';

    /**
     * 时刻数量。
     *
     * @type {Number}
     */
    this.length = 0;
});

/** @inheritDoc */
bigine.entity.room.snap.prototype.$expectContent = function() {
    return false;
};

/** @inheritDoc */
bigine.entity.room.snap.prototype.$expectChildren = function() {
    return {
        'bigine.core.tag': true
    };
};

/** @inheritDoc */
bigine.entity.room.snap.prototype.$bind = function(episode) {
    bigine.core.tag.prototype.$bind.call(this, episode);
    for (var ii = 0; ii < this.$children.length; ii++) {
        this[this.$children[ii].$params[0]] = this.$children[ii].$content;
    }
    this.length = this.$children.length;
    if (!this['午']) {
        for (ii in this) {
            if (this.hasOwnProperty(ii) && '$' != ii[0] && 'length' != ii) {
                this['午'] = this[ii];
                this.length++;
                break;
            }
        }
    }
    return this;
};

module.exports = bigine.entity.room.snap;
