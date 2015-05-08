/**
 * 定义选择事件动作组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../../bigine').$namespace('.action.value')
    .$import('.tag.action');

/**
 * 选择事件动作组件。
 *
 * - 参数：名称
 * - 内容：无
 * - 子项：选项集合
 *
 * ```
 * {
 *   key,
 *   options: {<VALUE>...}
 * }
 * ```
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.action.value.choose}
 * @constructor
 * @extends {bigine.tag.action}
 */
bigine.action.value.choose = bigine.$extends(bigine.tag.action, function (line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.action.value.choose';

    /**
     * 名称。
     *
     * @type {String}
     */
    this.key = params[0];

    /**
     * 选项。
     *
     * @type {Object<String, String>}
     */
    this.options = {};
});

/** @inheritDoc */
bigine.action.value.choose.prototype.$expectParams = function() {
    return [1, 1];
};

/** @inheritDoc */
bigine.action.value.choose.prototype.$expectContent = function() {
    return false;
};

/** @inheritDoc */
bigine.action.value.choose.prototype.$expectChildren = function() {
    return {
        'bigine.core.tag': true
    };
};

/** @inheritDoc */
bigine.action.value.choose.prototype.$bind = function(episode) {
    bigine.tag.action.prototype.$bind.call(this, episode);
    for (var ii = 0; ii < this.$children.length; ii++) {
        this.options[this.$children[ii].$params[0]] = this.$children[ii].$content || this.$children[ii].$params[0];
    }
    return this;
};

/** @inheritDoc */
bigine.action.value.choose.prototype.act = function(context) {
    var self = this;
    return context.director.choose(context, this.options).then(function () {
        context.state[self.key] = context.state['$v'];
        context.state['$c'] = false;
        return context.director.oops(context);
    });
};

module.exports = bigine.action.value.choose;
