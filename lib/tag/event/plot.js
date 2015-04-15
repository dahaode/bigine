/**
 * 定义事件情节（内容）标签组件。
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
 * 事件情节（内容）标签组件。
 *
 * @param  {Integer} line 在脚本源代码中地行号
 * @param  {Array} params 参数数组
 * @param  {String} content 内容
 * @return {bigine.tag.event.plot}
 * @constructs
 */
bigine.tag.event.plot = function(line, params, content) {
    bigine.core.tag.call(this, line, params, content);
    this.$id = 'bigine.tag.event.plot';
};
bigine.tag.event.plot.prototype = new bigine.core.tag();

module.exports = bigine.tag.event.plot;
