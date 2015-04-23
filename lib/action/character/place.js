/**
 * 定义设置人物事件动作组件。
 *
 * @author    郑煜宇 <zhengyuyu@kanshu.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

var bigine = {
    action: {
        character: {}
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
 * @return {bigine.action.character.place}
 * @constructs
 */
bigine.action.character.place = function(line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    this.$prototype = 'bigine.action.character.place';
    switch (this.$params.length ? this.$params[0] : '中') {
        case '左':
            this.position = 'l';
            break;
        case '中':
            this.position = 'c';
            break;
        case '右':
            this.position = 'r';
            break;
        default:
            throw new bigine.error('无效的位置“' + this.position + '”', this.$line);
    }
    params = this.$splitContent(2);
    this.character = params[0];
    this.style = params[1] || '';
};
bigine.action.character.place.prototype = new bigine.tag.action();

/**
 * 获取预期参数个数。
 *
 * @return {Array}
 */
bigine.action.character.place.prototype.$expectParams = function() {
    return [0, 1];
};

/**
 * 获取是否预期内容。
 *
 * @return {Boolean}
 */
bigine.action.character.place.prototype.$expectContent = function() {
    return true;
};

/**
 * 绑定运行时（对象化所需人物）。
 *
 * @param  {bigine.core.runtime} runtime
 * @return {bigine.action.character.place}
 */
bigine.action.character.place.prototype.bind = function(runtime) {
    this.character = runtime.character(this.character);
    return bigine.tag.action.prototype.bind.call(this, runtime);
};

/**
 * 执行。
 *
 * @param  {Object} context
 * @return {bigine.util.q.deferred.promise}
 */
bigine.action.character.place.prototype.act = function(context) {
    this.character.style = this.style;
    return context.director[this.position + 'char'](context, this.character);
};

module.exports = bigine.action.character.place;
