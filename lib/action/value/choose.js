/**
 * 定义选择事件动作组件。
 *
 * @author    郑煜宇 <zhengyuyu@kanshu.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

var bigine = {
    action: {
        value: {}
    },
    error: require('bigine/error'),
    tag: {
        action: require('bigine/tag/action')
    }
};

/**
 * 选择事件动作组件。
 *
 * @param  {Integer} line 在脚本源代码中地行号
 * @param  {Array} params 参数数组
 * @param  {String} content 内容
 * @return {bigine.action.value.choose}
 * @constructs
 */
bigine.action.value.choose = function(line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    this.$prototype = 'bigine.action.value.choose';
    this.key = this.$params[0];
};
bigine.action.value.choose.prototype = new bigine.tag.action();

/**
 * 获取预期参数个数。
 *
 * @return {Array}
 */
bigine.action.value.choose.prototype.$expectParams = function() {
    return [1, 1];
};

/**
 * 获取是否预期内容。
 *
 * @return {Boolean}
 */
bigine.action.value.choose.prototype.$expectContent = function() {
    return false;
};

/**
 * 获取是否预期子标签。
 *
 * @return {Object}
 */
bigine.action.value.choose.prototype.$expectChildren = function() {
    return {
        'bigine.core.tag': true
    };
};

/**
 * 绑定运行时。
 *
 * @param  {bigine.core.runtime} runtime
 * @return {bigine.action.value.choose}
 */
bigine.action.value.choose.prototype.bind = function(runtime) {
    this.options = {};
    for (var ii = 0; ii < this.$children.length; ii++) {
        this.options[this.$children[ii].$params[0]] = this.$children[ii].$content || this.$children[ii].$params[0];
    }
    return this;
};

/**
 * 执行。
 *
 * @param  {Object} context
 * @return {bigine.util.q.deferred.promise}
 */
bigine.action.value.choose.prototype.act = function(context) {
    var $this = this;
    return context.director.choose(context, this.options).then(function () {
        context.state[$this.key] = context.state['$v'];
        context.state['$c'] = false;
        return context.director.oops(context);
    });
};

module.exports = bigine.action.value.choose;
