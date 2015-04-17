/**
 * 定义旁白事件动作组件。
 *
 * @author    郑煜宇 <zhengyuyu@kanshu.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

var bigine = {
    action: {
        dialog: {}
    },
    error: require('bigine/error'),
    tag: {
        action: require('bigine/tag/action')
    }
};

/**
 * 旁白事件动作组件。
 *
 * @param  {Integer} line 在脚本源代码中地行号
 * @param  {Array} params 参数数组
 * @param  {String} content 内容
 * @return {bigine.action.dialog.voiceover}
 * @constructs
 */
bigine.action.dialog.voiceover = function(line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    this.$prototype = 'bigine.action.dialog.voiceover';
};
bigine.action.dialog.voiceover.prototype = new bigine.tag.action();

module.exports = bigine.action.dialog.voiceover;
