/**
 * 定义运行时组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../bigine').$namespace('.runtime')
    .$import('.core.component')
    .$import('.core.episode')
    .$import('.runtime.state')
    .$import('.runtime.director.factory')
    .$import('.runtime.logger');

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
    this.director.init(this.episode, {
        episode: this.episode,
        director: this.director,
        logger: this.logger,
        state: this.state
    });
    return this;
};

module.exports = bigine.runtime.runtime;