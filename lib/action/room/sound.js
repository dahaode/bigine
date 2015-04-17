/**
 * 定义播放音效事件动作组件。
 *
 * @author    郑煜宇 <zhengyuyu@kanshu.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

var bigine = {
    action: {
        room: {}
    },
    error: require('lib/error'),
    tag: {
        action: require('lib/tag/action')
    }
};

/**
 * 播放音效事件动作组件。
 *
 * @param  {Integer} line 在脚本源代码中地行号
 * @param  {Array} params 参数数组
 * @param  {String} content 内容
 * @return {bigine.action.room.sound}
 * @constructs
 */
bigine.action.room.sound = function(line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    this.$prototype = 'bigine.action.room.sound';
};
bigine.action.room.sound.prototype = new bigine.tag.action();

module.exports = bigine.action.room.sound;
