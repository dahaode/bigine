/**
 * 定义当数据事件动作组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 DaHao.de
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../../bigine').$namespace('.action.value')
    .$import('.tag.action');

/**
 * 当数据事件动作组件。
 *
 * - 参数：名称、预期值、比较符
 * - 内容：无
 * - 子项：无
 *
 * ```
 * {key, expected}
 * ```
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.action.value.assert}
 * @constructor
 * @extends {bigine.tag.action}
 */
bigine.action.value.assert = bigine.$extends(bigine.tag.action, function (line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.action.value.assert';

    if (Object.defineProperties) {
        var self = this,
            $this = {};
        Object.defineProperties(this, {
            key: {
                get: function() {
                    return $this.key;
                },
                set: function(value) {
                    $this.key =
                    self.$params[0] = value;
                }
            },
            expected: {
                get: function() {
                    return $this.expected;
                },
                set: function(value) {
                    $this.expected =
                    self.$params[1] = value;
                }
            },
            op: {
                get: function() {
                    return $this.op;
                },
                set: function(value) {
                    $this.op =
                    self.$params[2] = value;
                }
            }
        });
    }

    /**
     * 名称。
     *
     * @type {String}
     */
    this.key = params[0];

    /**
     * 预期值。
     *
     * @type {String}
     */
    this.expected = params[1];

    /**
     * 比较符。
     *
     * @type {String}
     */
    this.op = params[2] || '等于';
});

/** @inheritDoc */
bigine.action.value.assert.prototype.$expectParams = function() {
    return [2, 3];
};

/** @inheritDoc */
bigine.action.value.assert.prototype.test = function(state, logger) {
    var ret;
    switch (this.op) {
        case '大于':
            ret = state[this.key] > this.expected;
            break;
        case '小于':
            ret = state[this.key] < this.expected;
            break;
        case '不等于':
            ret = state[this.key] != this.expected;
            break;
        case '不大于':
            ret = state[this.key] <= this.expected;
            break;
        case '不小于':
            ret = state[this.key] >= this.expected;
            break;
        default:
            ret = state[this.key] == this.expected;
    }
    if (!ret) {
        logger.debug('   [scene]', this.key, '(', state[this.key], ')', '!=', this.expected);
    }
    return ret;
};

/** @inheritDoc */
bigine.action.value.assert.prototype.act = function(context) {
    context.state['$v'] = this.test(context.state, context.logger);
    context.logger.debug('   [state] $v =', context.state['$v'] ? '真' : '伪');
    return context.director.oops(context);
};

module.exports = bigine.action.value.assert;
