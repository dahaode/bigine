/**
 * 定义房间对象时刻标签组件。
 *
 * @author    郑煜宇 <zhengyuyu@kanshu.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

var bigine = {
    core: {
        tag: require('bigine/core/tag')
    },
    object: {
        room: {}
    }
};

/**
 * 房间对象时刻标签组件。
 *
 * @param  {Integer} line 在脚本源代码中地行号
 * @param  {Array} params 参数数组
 * @param  {String} content 内容
 * @return {bigine.object.room.snap}
 * @constructs
 */
bigine.object.room.snap = function(line, params, content) {
    bigine.core.tag.call(this, line, params, content);
    this.$prototype = 'bigine.object.room.snap';
};
bigine.object.room.snap.prototype = new bigine.core.tag();

/**
 * 获取是否预期内容。
 *
 * @return {Boolean}
 */
bigine.object.room.snap.prototype.$expectContent = function() {
    return false;
};

/**
 * 获取是否预期子标签。
 *
 * @return {Object}
 */
bigine.object.room.snap.prototype.$expectChildren = function() {
    return {
        'bigine.core.tag': true
    };
};

module.exports = bigine.object.room.snap;
