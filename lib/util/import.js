/**
 * 定义标签系组件动态加载器组件。
 *
 * Browserify 无法处理及打包动态加载地模块（组件），因此需要这样一个组件来做 HACK 。
 *
 * @author    郑煜宇 <zhengyuyu@kanshu.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

var bigine = {
    util: {}
},
    $ = {};

$.__FUCK_BROWSERIFY__ = function() {
    require('lib/core/tag');
    require('lib/tag/event');
    require('lib/tag/event/type');
};

/**
 * 标签系组件动态加载器组件。
 *
 * @param  {String} namespace
 * @return {bigine.core.tag}
 */
bigine.util.import = function(namespace) {
    return require('lib/' + namespace.split('.').slice(1).join('/'));
};

module.exports = bigine.util.import;
