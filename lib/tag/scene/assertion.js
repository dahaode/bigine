/**
 * 定义事件条件标签组件。
 *
 * @author    郑煜宇 <zhengyuyu@kanshu.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

var bigine = {
    core: {
        tag: require('bigine/core/tag')
    },
    error: require('bigine/error'),
    tag: {
        scene: {}
    }
},
    $ = {};

/**
 * 事件条件标签组件。
 *
 * @param  {Integer} line 在脚本源代码中地行号
 * @param  {Array} params 参数数组
 * @param  {String} content 内容
 * @return {bigine.tag.scene.assertion}
 * @constructs
 */
bigine.tag.scene.assertion = function(line, params, content) {
    bigine.core.tag.call(this, line, params, content);
    this.$prototype = 'bigine.tag.scene.assertion';
};
bigine.tag.scene.assertion.prototype = new bigine.core.tag();

/**
 * 获取是否预期内容。
 *
 * @return {Boolean}
 */
bigine.tag.scene.assertion.prototype.$expectContent = function() {
    return false;
};

module.exports = bigine.tag.scene.assertion;
