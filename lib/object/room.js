/**
 * 定义房间对象组件。
 *
 * @author    郑煜宇 <zhengyuyu@kanshu.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

var bigine = {
    object: {},
    tag: {
        object: require('bigine/tag/object')
    }
};

/**
 * 房间对象组件。
 *
 * @param  {Integer} line 在脚本源代码中地行号
 * @param  {Array} params 参数数组
 * @param  {String} content 内容
 * @return {bigine.object.room}
 * @constructs
 */
bigine.object.room = function(line, params, content) {
    bigine.tag.object.call(this, line, params, content);
    this.$prototype = 'bigine.object.room';
};
bigine.object.room.prototype = new bigine.tag.object();

/**
 * 获取是否预期子标签。
 *
 * @return {Object}
 */
bigine.object.room.prototype.$expectChildren = function() {
    return {
        'bigine.object.room.snap': true
    };
};

/**
 * 注册游戏事件。
 *
 * @param  {String} id
 * @param  {bigine.tag.scene} event
 * @return {bigine.core.runtime}
 */
bigine.object.room.prototype.$on = function(id, event) {
    this.on = this.on || {};
    this.on[id] = this.on[id] || [];
    this.on[id].push(event);
    return this;
};

/**
 * 将自身注册至运行时。
 *
 * @param  {bigine.core.runtime} runtime
 * @return {bigine.object.room}
 */
bigine.object.room.prototype.register = function(runtime) {
    runtime.room(this);
    return bigine.tag.object.prototype.register.call(this, runtime);
};

module.exports = bigine.object.room;
