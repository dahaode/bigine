/**
 * 定义人物对象组件。
 *
 * @author    郑煜宇 <zhengyuyu@kanshu.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

var bigine = {
    object: {},
    tag: {
        object: require('bigine/tag/object')
    }
};

/**
 * 人物对象组件。
 *
 * @param  {Integer} line 在脚本源代码中地行号
 * @param  {Array} params 参数数组
 * @param  {String} content 内容
 * @return {bigine.object.char}
 * @constructs
 */
bigine.object.char = function(line, params, content) {
    bigine.tag.object.call(this, line, params, content);
    this.$prototype = 'bigine.object.char';
};
bigine.object.char.prototype = new bigine.tag.object();

/**
 * 获取是否预期子标签。
 *
 * @return {Object}
 */
bigine.object.char.prototype.$expectChildren = function() {
    return {
        'bigine.object.char.avatar': true,
        'bigine.object.char.pose': true
    };
};


/**
 * 将自身注册至运行时。
 *
 * @param  {bigine.core.runtime} runtime
 * @return {bigine.object.char}
 */
bigine.object.char.prototype.register = function(runtime) {
    runtime.char(this);
    return bigine.tag.object.prototype.register.call(this, runtime);
};

module.exports = bigine.object.char;
