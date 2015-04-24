/**
 * 定义房间对象时刻标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('bigine/core/component').$namespace('.object.room', require('bigine/object/room'));

bigine.core.tag = require('bigine/core/tag');

/**
 * 房间对象时刻标签组件。
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.object.room.snap}
 * @constructor
 * @extends {bigine.core.tag}
 */
bigine.object.room.snap = bigine.core.component.$extends(bigine.core.tag, function(line, params, content) {
    bigine.core.tag.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.object.room.snap';
});

/** @inheritDoc */
bigine.object.room.snap.prototype.$expectContent = function() {
    return false;
};

/** @inheritDoc */
bigine.object.room.snap.prototype.$expectChildren = function() {
    return {
        'bigine.core.tag': true
    };
};

module.exports = bigine.object.room.snap;
