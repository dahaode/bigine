/**
 * 定义人物离场事件动作组件。
 *
 * @author    郑煜宇 <zhengyuyu@kanshu.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

var bigine = {
    action: {
        char: {}
    },
    error: require('lib/error'),
    tag: {
        action: require('lib/tag/action')
    }
};

/**
 * 人物离场事件动作组件。
 *
 * @param  {Integer} line 在脚本源代码中地行号
 * @param  {Array} params 参数数组
 * @param  {String} content 内容
 * @return {bigine.action.char.out}
 * @constructs
 */
bigine.action.char.out = function(line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    this.$prototype = 'bigine.action.char.out';
};
bigine.action.char.out.prototype = new bigine.tag.action();

module.exports = bigine.action.char.out;
