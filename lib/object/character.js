/**
 * 定义人物对象组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('bigine/core/component').$namespace('.object');

bigine.tag = {};
bigine.tag.object = require('bigine/tag/object');

/**
 * 人物对象组件。
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.object.character}
 * @constructor
 * @extends {bigine.tag.object}
 */
bigine.object.character = bigine.core.component.$extends(bigine.tag.object, function(line, params, content) {
    bigine.tag.object.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.object.character';
});

/** @inheritDoc */
bigine.object.character.prototype.$expectChildren = function() {
    return {
        'bigine.object.character.avatar': true,
        'bigine.object.character.pose': true
    };
};


/** @inheritDoc */
bigine.object.character.prototype.register = function(episode) {
    episode.character(this);
    return bigine.tag.object.prototype.register.call(this, episode);
};

/** @inheritDoc */
bigine.object.character.prototype.bind = function(episode) {
    bigine.tag.object.prototype.bind.call(this, episode);
    this.poses = {};
    var ii, jj;
    for (ii = 0; ii < this.$children.length; ii++) {
        if ('bigine.object.character.avatar' == this.$children[ii].$prototype) {
            this.avatar = this.$children[ii].$content;
        } else if ('bigine.object.character.pose' == this.$children[ii].$prototype) {
            for (jj = 0; jj < this.$children[ii].$children.length; jj++) {
                this.poses[this.$children[ii].$children[jj].$params[0]] = this.$children[ii].$children[jj].$content;
            }
        }
    }
    return this;
};

module.exports = bigine.object.character;
