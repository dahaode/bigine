/**
 * 定义设置数值事件动作组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 DaHao.de
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../../bigine').$namespace('.action.value')
    .$import('.tag.action');

/**
 * 设置数值事件动作组件。
 *
 * - 参数：名称
 * - 内容：值
 * - 子项：无
 *
 * ```
 * {key, value}
 * ```
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.action.value.assign}
 * @constructor
 * @extends {bigine.tag.action}
 */
bigine.action.value.assign = bigine.$extends(bigine.tag.action, function (line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.action.value.assign';

    var self = this,
        $this = {};
    Object.defineProperties(this, {
        key: {
            get: function() {
                return $this.key;
            },
            set: function(value) {
                $this.key = value;
                self.$params = [value];
            }
        },
        value: {
            get: function() {
                return $this.value;
            },
            set: function(value) {
                if (/^-?\d+$/.test(value)) {
                    value = parseInt(value, 10);
                }
                $this.value =
                self.$content = value;
            }
        }
    });

    /**
     * 名称。
     *
     * @type {String}
     */
    this.key = params[0];

    /**
     * 值。
     *
     * @type {String}
     */
    this.value = content;
});

/** @inheritDoc */
bigine.action.value.assign.prototype.$expectParams = function() {
    return [1, 1];
};

/** @inheritDoc */
bigine.action.value.assign.prototype.$expectContent = function() {
    return true;
};

/** @inheritDoc */
bigine.action.value.assign.prototype.act = function(context) {
    context.state[this.key] = this.value;
    context.logger.debug('   [state]', this.key, '=', this.value);
    return context.director.oops(context);
};

module.exports = bigine.action.value.assign;
