/**
 * 定义根标签组件。
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
 * 根标签组件
 *
 * @return {bigine.tag.root}
 * @constructs
 */
bigine.tag.root = function() {
    bigine.core.tag.call(this);
    this.$prototype = 'bigine.tag.root';
};
bigine.tag.root.prototype = new bigine.core.tag();

module.exports = bigine.tag.root;
