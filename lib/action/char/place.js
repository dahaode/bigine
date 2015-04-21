/**
 * 定义设置人物事件动作组件。
 *
 * @author    郑煜宇 <zhengyuyu@kanshu.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

var bigine = {
    action: {
        char: {}
    },
    error: require('bigine/error'),
    tag: {
        action: require('bigine/tag/action')
    }
};

/**
 * 设置人物事件动作组件。
 *
 * @param  {Integer} line 在脚本源代码中地行号
 * @param  {Array} params 参数数组
 * @param  {String} content 内容
 * @return {bigine.action.char.place}
 * @constructs
 */
bigine.action.char.place = function(line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    this.$prototype = 'bigine.action.char.place';
    this.position = this.$params.length ? this.$params[0] : '中';
    if (-1 == ['左', '中', '右'].indexOf(this.position)) {
        throw new bigine.error('无效的位置“' + this.position + '”', this.$line);
    }
    params = this.$splitContent(2);
    this.char = params[0];
    this.style = params[1] || '';
};
bigine.action.char.place.prototype = new bigine.tag.action();

/**
 * 获取预期参数个数。
 *
 * @return {Array}
 */
bigine.action.char.place.prototype.$expectParams = function() {
    return [0, 1];
};

/**
 * 获取是否预期内容。
 *
 * @return {Boolean}
 */
bigine.action.char.place.prototype.$expectContent = function() {
    return true;
};

/**
 * 绑定运行时（对象化所需人物）。
 *
 * @param  {bigine.core.runtime} runtime
 * @return {bigine.action.char.place}
 */
bigine.action.char.place.prototype.bind = function(runtime) {
    this.char = runtime.getChar(this.char);
    return bigine.tag.action.prototype.bind.call(this, runtime);
};

module.exports = bigine.action.char.place;