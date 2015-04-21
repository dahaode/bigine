/**
 * 定义根标签组件。
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
},
    $ = {};

/**
 * 根标签组件
 *
 * @return {bigine.tag.root}
 * @constructs
 */
bigine.tag.root = function() {
    bigine.core.tag.call(this);
    this.$prototype = 'bigine.tag.root';
};
bigine.tag.root.prototype = new bigine.core.tag();

/**
 * 获取是否预期内容。
 *
 * @return {Boolean}
 */
bigine.tag.root.prototype.$expectContent = function() {
    return false;
};

/**
 * 获取是否预期子标签。
 *
 * @return {Object}
 */
bigine.tag.root.prototype.$expectChildren = function() {
    return {
        'bigine.object.bgm': true,
        'bigine.object.cg': true,
        'bigine.object.char': true,
        'bigine.object.room': true,
        'bigine.object.se': true,
        'bigine.object.weather': true,
        'bigine.tag.scene': true
    };
};

/**
 * 转化为作品脚本。
 *
 * @return {String}
 */
bigine.tag.root.prototype.toString = function() {
    var clob = '';
    for (ii = 0; ii < this.$children.length; ii++) {
        clob += this.$children[ii].toString();
    }
    return clob;
};

/**
 * 转化为运行代码。
 *
 * @return {String}
 */
bigine.tag.root.prototype.toScript = function() {
    var clob = '(function($){$(' +
        bigine.core.tag.prototype.toScript.call(this) +
        ')})(require("bigine"))';
    return clob;
};

module.exports = bigine.tag.root;
