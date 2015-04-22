/**
 * 定义主角声明标签组件。
 *
 * @author    郑煜宇 <zhengyuyu@kanshu.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

var bigine = {
    core: {
        tag: require('bigine/core/tag')
    },
    tag: {}
};

/**
 * 主角声明标签组件。
 *
 * @param  {Integer} line 在脚本源代码中地行号
 * @param  {Array} params 参数数组
 * @param  {String} content 内容
 * @return {bigine.tag.player}
 * @constructs
 */
bigine.tag.player = function(line, params, content) {
    bigine.core.tag.call(this, line, params, content);
    this.$prototype = 'bigine.tag.player';
    this.player = this.$content;
};
bigine.tag.player.prototype = new bigine.core.tag();

/**
 * 绑定人物对象并注册自身至运行时。
 *
 * @param  {bigine.core.runtime} runtime
 * @return {bigine.tag.player}
 */
bigine.tag.player.prototype.bind = function(runtime) {
    if (!(this.player instanceof bigine.core.tag)) {
        this.player = runtime.character(this.player);
        runtime.player(this.player);
    }
    return this;
};

module.exports = bigine.tag.player;
