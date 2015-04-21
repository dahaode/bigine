/**
 * 定义人物对象姿态标签组件。
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
        char: {}
    }
};

/**
 * 人物对象姿态标签组件。
 *
 * @param  {Integer} line 在脚本源代码中地行号
 * @param  {Array} params 参数数组
 * @param  {String} content 内容
 * @return {bigine.object.char.pose}
 * @constructs
 */
bigine.object.char.pose = function(line, params, content) {
    bigine.core.tag.call(this, line, params, content);
    this.$prototype = 'bigine.object.char.pose';
};
bigine.object.char.pose.prototype = new bigine.core.tag();

/**
 * 获取是否预期内容。
 *
 * @return {Boolean}
 */
bigine.object.char.pose.prototype.$expectContent = function() {
    return false;
};

/**
 * 获取是否预期子标签。
 *
 * @return {Object}
 */
bigine.object.char.pose.prototype.$expectChildren = function() {
    return {
        'bigine.core.tag': true
    };
};

module.exports = bigine.object.char.pose;
