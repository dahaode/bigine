/**
 * 定义基础抽象组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = {
    core: {}
};

/**
 * 基础抽象组件。
 *
 * @return {bigine.core.component}
 * @constructor
 */
bigine.core.component = function() {
    this.$prototype = 'bigine.core.component';
};
bigine.core.component.prototype = {};
bigine.core.component.prototype.constructor = bigine.core.component;

/**
 * @override
 */
bigine.core.component.prototype.toString = function() {
    return this.$prototype;
};

/**
 * 声明组件继承关系。
 *
 * @param  {bigine.core.component} parent
 * @param  {Function} child
 * @return {bigine.core.component}
 * @static
 * @see https://github.com/google/closure-library/blob/master/closure/goog/base.js
 */
bigine.core.component.$extends = function(parent, child) {
    var proto = function() {};
    proto.prototype = parent.prototype;
    child.prototype = new proto();
    child.prototype.constructor = child;
    return child;
};

/**
 * 初始化命名空间。
 *
 * @param  {String} namespace
 * @param  {Object=} object
 * @return {Object}
 * @static
 */
bigine.core.component.$namespace = function(namespace, object) {
    var nodes = namespace.split('.');
    nodes[0] = nodes[0] || 'bigine';
    namespace = {};
    for (var ii = 0, jj = nodes.length, kk = namespace; ii < jj; ii++) {
        kk[nodes[ii]] = (1 + ii == jj) ? object || {} : {};
        kk = kk[nodes[ii]];
    }
    if ('bigine' == nodes[0]) {
        namespace['bigine']['error'] = require('bigine/error');
        namespace['bigine']['core'] = namespace['bigine']['core'] || {};
        namespace['bigine']['core']['component'] = bigine.core.component;
    }
    return namespace[nodes[0]];
};

module.exports = bigine.core.component;
