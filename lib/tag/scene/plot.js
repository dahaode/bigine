/**
 * 定义事件情节（内容）标签组件。
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
    },
    util: {
        helper: require('bigine/util/helper')
    }
},
    $ = {};

/**
 * 事件情节（内容）标签组件。
 *
 * @param  {Integer} line 在脚本源代码中地行号
 * @param  {Array} params 参数数组
 * @param  {String} content 内容
 * @return {bigine.tag.scene.plot}
 * @constructs
 */
bigine.tag.scene.plot = function(line, params, content) {
    bigine.core.tag.call(this, line, params, content);
    this.$prototype = 'bigine.tag.scene.plot';
};
bigine.tag.scene.plot.prototype = new bigine.core.tag();

/**
 * 获取是否预期内容。
 *
 * @return {Boolean}
 */
bigine.tag.scene.plot.prototype.$expectContent = function() {
    return false;
};

/**
 * 获取是否预期子标签。
 *
 * @return {false}
 */
bigine.tag.scene.plot.prototype.$expectChildren = function() {
    return {
        '*': true
    };
};

/**
 * 执行。
 *
 * @param  {Object} context
 * @return {bigine.util.q.deferred.promise}
 */
bigine.tag.scene.plot.prototype.play = function(context) {
    var $this = this;
    if (!this.$children.length) {
        return bigine.util.helper.promise.resolved(context);
    }
    for (var ii = 0, jj; ii < this.$children.length; ii++) {
        jj = ii ?
            jj.then(this.$children[ii].act) :
            this.$children[ii].act(context);
    }
    return jj;
};

module.exports = bigine.tag.scene.plot;
