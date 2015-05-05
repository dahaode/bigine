/**
 * 定义地图对象交互点标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('bigine/core/component').$namespace('.object.map', require('bigine/object/map'));

bigine.core.tag = require('bigine/core/tag');

/**
 * 地图对象交互点标签组件。
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.object.map.point}
 * @constructor
 * @extends {bigine.core.tag}
 */
bigine.object.map.point = bigine.core.component.$extends(bigine.core.tag, function(line, params, content) {
    bigine.core.tag.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.object.map.point';
    this.title = this.$content;
});

/** @inheritDoc */
bigine.object.map.point.prototype.$expectChildren = function() {
    return {
        'bigine.object.map.point.room': true,
        'bigine.object.map.point.hilite': true,
        'bigine.object.map.point.region': true
    };
};

/** @inheritDoc */
bigine.object.map.point.prototype.bind = function(episode) {
    bigine.core.tag.prototype.bind.call(this, episode);
    for (var ii = 0; ii < this.$children.length; ii++) {
        switch (this.$children[ii].$prototype) {
            case 'bigine.object.map.point.room':
                this.room = this.$children[ii].room;
                break;
            case 'bigine.object.map.point.hilite':
                this.image = this.$children[ii].image;
                break;
            case 'bigine.object.map.point.region':
                this.coords = this.$children[ii].coords;
                break;
        }
    }
    if (!this.room || !this.image || !this.coords) {
        throw new bigine.error('不完整地交互点“' + this.title + '”', this.$line);
    }
    return this;
};

module.exports = bigine.object.map.point;
