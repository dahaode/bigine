/**
 * 定义选择事件动作组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 DaHao.de
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../../bigine').$namespace('.action.value')
    .$import('.tag.action')
    .$import('.util')
    .$import('.core.tag');

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

    if (Object.defineProperties) {
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
            options: {
                get: function() {
                    return $this.options;
                },
                set: function(value) {
                    $this.options = value;
                    self.$children = [];
                    bigine.util.each(value, function (value, key) {
                        var option = new bigine.core.tag(0, [], value);
                        option.$params = [key];
                        this.$append(option);
                    }, self);
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
    for (var ii = 0; ii < this.$children.length; ii++) {
        this.options[this.$children[ii].$params[0]] = this.$children[ii].$content || this.$children[ii].$params[0];
    }
    return bigine.tag.action.prototype.$bind.call(this, episode);
};

/** @inheritDoc */
bigine.action.value.choose.prototype.act = function(context) {
    var self = this;
    return context.director.choose(this, context).then(function (value) {
        context.logger.info('  [player]', self.options[value]);
        context.state[self.key] = value;
        context.logger.debug('   [state]', self.key, '=', value);
        context.state['$v'] = value;
        context.logger.debug('   [state] $v =', value);
        return context;
    });
};

/**
 * 添加选项。
 *
 * @param  {String} title
 * @param  {String=} value
 * @return {bigine.action.value.choose}
 */
bigine.action.value.choose.prototype.addOption = function(title, value) {
    value = value || title;
    if (!this.options[value]) {
        var options = this.options;
        options[value] = title;
        this.options = options;
    }
    return this;
};

/**
 * 删除选项。
 *
 * @param  {String} value
 * @return {bigine.action.value.choose}
 */
bigine.action.value.choose.prototype.dropOption = function(value) {
    if (this.options[value]) {
        var options = this.options;
        delete options[value];
        this.options = options;
    }
    return this;
};

module.exports = bigine.action.value.choose;
