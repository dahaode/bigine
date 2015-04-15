/**
 * 定义事件条件标签组件。
 *
 * @author    郑煜宇 <zhengyuyu@kanshu.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

var bigine = {
    core: {
        tag: require('lib/core/tag')
    },
    error: require('lib/error'),
    tag: {
        event: {}
    }
},
    $ = {};

/**
 * 事件条件标签组件。
 *
 * @param  {Integer} line 在脚本源代码中地行号
 * @param  {Array} params 参数数组
 * @param  {String} content 内容
 * @return {bigine.tag.event.assertion}
 * @constructs
 */
bigine.tag.event.assertion = function(line, params, content) {
    bigine.core.tag.call(this, line, params, content);
    this.$id = 'bigine.tag.event.assertion';
};
bigine.tag.event.assertion.prototype = new bigine.core.tag();

module.exports = bigine.tag.event.assertion;
