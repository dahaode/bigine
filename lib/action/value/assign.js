/**
 * 定义设置数值事件动作组件。
 *
 * @author    郑煜宇 <zhengyuyu@kanshu.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

var bigine = {
    action: {
        value: {}
    },
    error: require('lib/error'),
    tag: {
        action: require('lib/tag/action')
    }
};

/**
 * 设置数值事件动作组件。
 *
 * @param  {Integer} line 在脚本源代码中地行号
 * @param  {Array} params 参数数组
 * @param  {String} content 内容
 * @return {bigine.action.value.assign}
 * @constructs
 */
bigine.action.value.assign = function(line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    this.$prototype = 'bigine.action.value.assign';
};
bigine.action.value.assign.prototype = new bigine.tag.action();

module.exports = bigine.action.value.assign;
