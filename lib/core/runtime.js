/**
 * 定义运行时组件。
 *
 * @author    郑煜宇 <zhengyuyu@kanshu.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

var bigine = {
    core: {},
    error: require('bigine/error')
},
    $ = {};

/**
 * 运行时组件。
 *
 * @param  {bigine.core.tag} tags
 * @return {bigine.core.runtime}
 * @constructs
 */
bigine.core.runtime = function(tags) {
    if ($.this) {
        throw new bigine.error('多重运行时');
    }
    $.this = this;
    this.$root = tags;
    tags.register(this);
    tags.bind(this);
};

/**
 * 运行。
 *
 * @return {bigine.core.runtime}
 */
bigine.core.runtime.prototype.run = function() {
    return this;
};

module.exports = bigine.core.runtime;
