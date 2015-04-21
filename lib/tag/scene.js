/**
 * 定义事件标签组件。
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
    tag: {}
},
    $ = {};

/**
 * 事件标签组件。
 *
 * @param  {Integer} line 在脚本源代码中地行号
 * @param  {Array} params 参数数组
 * @param  {String} content 内容
 * @return {bigine.tag.scene}
 * @constructs
 */
bigine.tag.scene = function(line, params, content) {
    bigine.core.tag.call(this, line, params, content);
    this.$prototype = 'bigine.tag.scene';
    this.id =
    this.title = content;
};
bigine.tag.scene.prototype = new bigine.core.tag();

/**
 * 获取是否预期子标签。
 *
 * @return {Object}
 */
bigine.tag.scene.prototype.$expectChildren = function() {
    return {
        'bigine.tag.scene.type': true,
        'bigine.tag.scene.assertion': true,
        'bigine.tag.scene.plot': true
    };
};

module.exports = bigine.tag.scene;
