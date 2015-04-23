/**
 * 定义否则事件动作组件。
 *
 * @author    郑煜宇 <zhengyuyu@kanshu.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

var bigine = {
    action: {
        sequence: {}
    },
    error: require('bigine/error'),
    tag: {
        action: require('bigine/tag/action')
    },
    util: {
        helper: require('bigine/util/helper')
    }
};

/**
 * 否则事件动作组件。
 *
 * @param  {Integer} line 在脚本源代码中地行号
 * @param  {Array} params 参数数组
 * @param  {String} content 内容
 * @return {bigine.action.sequence.otherwise}
 * @constructs
 */
bigine.action.sequence.otherwise = function(line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    this.$prototype = 'bigine.action.sequence.otherwise';
};
bigine.action.sequence.otherwise.prototype = new bigine.tag.action();

/**
 * 获取是否预期子标签。
 *
 * @return {Object}
 */
bigine.action.sequence.otherwise.prototype.$expectChildren = function() {
    return {
        '*': true
    };
};

/**
 * 执行。
 *
 * @param  {Object} context
 * @return {bigine.util.q.deferred.promise}
 */
bigine.action.sequence.otherwise.prototype.act = function(context) {
    if (context.state['$c']) {
        return context.director.oops(context);
    }
    context.state['$c'] = true;
    return bigine.util.helper.promise.sequence(this.$children, 'act', context);
};

module.exports = bigine.action.sequence.otherwise;
