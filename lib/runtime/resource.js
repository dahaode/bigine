/**
 * 定义运行时资源加载器组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 DaHao.de
 * @license   GPL-3.0+
 */

 var bigine = require('../bigine').$namespace('.runtime')
    .$import('.core.component')
    .$import('.runtime.env')
    .$import('.util.resource')
    .$import('.util.promise');

/**
 * 运行时资源加载器组件。
 *
 * @return {bigine.runtime.resource}
 * @constructor
 * @extends {bigine.core.component}
 */
bigine.runtime.resource = bigine.$extends(bigine.core.component, function () {
    /** @override */
    this.$prototype = 'bigine.runtime.resource';

    /**
     * 加载资源对象集合。
     *
     * @type {Object}
     */
    this.$data = {};
});

/**
 * 注册资源对象。
 *
 * @param  {String} id
 * @param  {String} type
 * @return {bigine.runtime.resource}
 */
bigine.runtime.resource.prototype.register = function(id, type) {
    if (this.$data[id] || !bigine.util.isString(id)) return this;
    var env = bigine.runtime.env,
        url = env.mobile ?
            Math.min(env.screen.width, env.screen.height) :
            'origin';
    switch (type) {
        case 'snap':
        case 'cg':
            url += '.jpg';
            break;
        case 'avatar':
        case 'pose':
        case 'map':
            url += '.png';
            break;
        case 'bgm':
        case 'se':
            url = (env.mobile ? 64 : 128) + '.mp3';
            break;
        default:
            type = false;
    }
    url = type ? ('//a' + (parseInt(id[0], 16) % 8 + 1) + '.dahao.de/' + id + '/' + url) : id;
    this.$data[id] = bigine.util.resource.format(url);
    return this;
};

/**
 * 获取指定资源对象。
 *
 * @param  {String} id
 * @return {bigine.util.promise|String}
 */
bigine.runtime.resource.prototype.get = function(id) {
    if (!this.$data[id] || !bigine.util.isString(id)) return bigine.util.promise.resolve(id);
    if (/\.mp3\?/.test(this.$data[id])) return this.$data[id];
    var self = this;
    return new bigine.util.promise(function (resolve) {
        var img = new Image();
        bigine.util.on(img, 'load', function () {
            resolve(img);
        });
        img.crossOrigin = '';
        img.src = self.$data[id];
    });
};

module.exports = bigine.runtime.resource;
