/**
 * 定义根标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

var bigine = require('bigine/core/component').$namespace('.tag'),
    $ = {};

bigine.core.tag = require('bigine/core/tag');

/**
 * 根标签组件。
 *
 * @return {bigine.tag.root}
 * @constructor
 * @extends {bigine.core.tag}
 */
bigine.tag.root = bigine.core.component.$extends(bigine.core.tag, function() {
    bigine.core.tag.call(this);
    /** @override */
    this.$prototype = 'bigine.tag.root';
});

/** @inheritDoc */
bigine.tag.root.prototype.$expectContent = function() {
    return false;
};

/** @inheritDoc */
bigine.tag.root.prototype.$expectChildren = function() {
    return {
        'bigine.object.bgm': true,
        'bigine.object.cg': true,
        'bigine.object.character': true,
        'bigine.object.room': true,
        'bigine.object.se': true,
        'bigine.object.weather': true,
        'bigine.tag.player': true,
        'bigine.tag.scene': true
    };
};

/**
 * 追加注册主角信息。
 *
 * @param  {bigine.core.episode} episode
 * @return {bigine.tag.root}
 * @override
 */
bigine.tag.root.prototype.register = function(episode) {
    bigine.core.tag.prototype.register.call(this, episode);
    for (var ii = 0, jj = false; ii < this.$children.length; ii++) {
        if ('bigine.tag.player' == this.$children[ii].$prototype) {
            if (jj) {
                throw new bigine.error('重复声明主角', this.$children[ii].$line);
            }
            jj = true;
            this.$children[ii].bind(episode);
        }
    }
    return this;
};

/** @inheritDoc */
bigine.tag.root.prototype.toString = function() {
    var clob = '';
    for (ii = 0; ii < this.$children.length; ii++) {
        clob += this.$children[ii].toString();
    }
    return clob;
};

/** @inheritDoc */
bigine.tag.root.prototype.toScript = function() {
    var clob = '(function($){$(' +
        bigine.core.tag.prototype.toScript.call(this) +
        ')})(require("bigine"))';
    return clob;
};

module.exports = bigine.tag.root;
