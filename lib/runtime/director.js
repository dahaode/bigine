/**
 * 定义运行时场面（视觉、听觉、交互）指挥器组件。
 *
 * @author    郑煜宇 <zhengyuyu@kanshu.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

var bigine = {
    runtime: {},
    util: {
        helper: require('bigine/util/helper')
    }
};

/**
 * 运行时画面指挥器组件。
 *
 * @return {bigine.runtime.director}
 * @constructor
 */
bigine.runtime.director = function() {
};

/**
 * 无画面变更。
 *
 * 此方法用于不涉及场面控制变化地游戏事件动作组件。
 *
 * @param  {Object} context
 * @return {bigine.util.q.deferred.promise}
 */
bigine.runtime.director.prototype.noop = function(context) {
    return bigine.util.helper.promise.resolved(context);
};

module.exports = bigine.runtime.director;
