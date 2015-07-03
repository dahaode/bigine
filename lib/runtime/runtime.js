/**
 * 定义运行时组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 DaHao.de
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../bigine').$namespace('.runtime')
    .$import('.core.component')
    .$import('.core.episode')
    .$import('.runtime.state')
    .$import('.runtime.director.factory')
    .$import('.runtime.logger')
    .$import('.util');

/**
 * 运行时组件。
 *
 * @param  {bigine.core.tag} tags
 * @param  {Number=} level
 * @return {bigine.runtime.runtime}
 * @constructor
 * @extends {bigine.core.component}
 */
bigine.runtime.runtime = bigine.$extends(bigine.core.component, function (tags, level) {
    /** @override */
    this.$prototype = 'bigine.runtime.runtime';

    /**
     * 剧情实例。
     *
     * @type {bigine.core.episode}
     */
    this.episode = new bigine.core.episode(tags);

    /**
     * 状态实例。
     *
     * @type {bigine.runtime.state}
     */
    this.state = new bigine.runtime.state();

    /**
     * 画面调度实例。
     *
     * @type {bigine.runtime.director}
     */
    this.director = undefined;

    /**
     * 日志实例。
     *
     * @type {bigine.runtime.logger}
     */
    this.logger = new bigine.runtime.logger(level);
});

/**
 * 运行。
 *
 * @param  {bigine.runtime.director=} director
 * @return {bigine.runtime.runtime}
 */
bigine.runtime.runtime.prototype.setup = function(director) {
    this.director = director instanceof bigine.runtime.director ?
        director :
        bigine.runtime.director.factory();
    this.director.init(this);
    return this;
};

/**
 * 播放。
 *
 * @param  {Function=} onSave
 * @param  {Function=} onLoad
 * @return {bigine.runtime.runtime}
 */
bigine.runtime.runtime.prototype.play = function(onSave, onLoad) {
    this.play = bigine.util.noop;
    this.state.onSave = onSave || bigine.util.noop;
    this.state.onLoad = onLoad || bigine.util.noop;
    this.director.play();
    return this;
};

module.exports = bigine.runtime.runtime;
