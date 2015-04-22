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
};

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

/**
 * 绑定运行时（关联至相应对象）。
 *
 * @param  {bigine.core.runtime} runtime
 * @return {bigine.tag.scene}
 */
bigine.tag.scene.prototype.bind = function(runtime) {
    for (var ii = 0; ii < this.$children.length; ii++) {
        switch (this.$children[ii].$prototype) {
            case 'bigine.tag.scene.type':
                if (this.type) {
                    throw new bigine.error('重复的事件时间定义', this.$children[ii].$line);
                }
                this.type = this.$children[ii];
                break;
            case 'bigine.tag.scene.assertion':
                if (this.assertion) {
                    throw new bigine.error('重复的事件条件定义', this.$children[ii].$line);
                }
                this.assertion = this.$children[ii];
                break;
            case 'bigine.tag.scene.plot':
                if (this.plot) {
                    throw new bigine.error('重复的事件内容定义', this.$children[ii].$line);
                }
                this.plot = this.$children[ii];
                break;
        }
    }
    if (!this.type) {
        throw new bigine.error('事件时间未定义', this.$line);
    }
    if (!this.plot) {
        throw new bigine.error('事件无内容', this.$line);
    }
    switch (this.type.kind) {
        case 'room':
            runtime.room(this.type.reference).$on(this.type.id, this);
            break;
        case 'runtime':
            runtime.$on(this.type.id, this);
    }
    return bigine.core.tag.prototype.bind.call(this, runtime);
};

/**
 * 执行。
 *
 * @param  {Object} context
 * @return {bigine.util.q.deferred.promise}
 */
bigine.tag.scene.prototype.perform = function(context) {
    if (this.type.id != context.state['$t'] || this.type.reference != context.state['$o'] ||
        this.assertion && !this.assertion.pass(context.state)
    ) {
        return context.director.noop(context);
    }
    return this.plot.play(context);
};

module.exports = bigine.tag.scene;
