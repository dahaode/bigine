/**
 * 定义运行时组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('bigine/core/component').$namespace('.runtime'),
    $ = {};

bigine.core.episode = require('bigine/core/episode');
bigine.runtime.director = require('bigine/runtime/director');
bigine.runtime.director.factory = require('bigine/runtime/director/factory');
bigine.runtime.logger = require('bigine/runtime/logger');
bigine.runtime.resource = require('bigine/runtime/resource');
bigine.runtime.state = require('bigine/runtime/state');

/**
 * 运行时组件。
 *
 * @param  {bigine.core.tag} tags
 * @param  {bigine.runtime.director=} director
 * @return {bigine.runtime.runtime}
 * @constructor
 * @extends {bigine.core.component}
 */
bigine.runtime.runtime = bigine.core.component.$extends(bigine.core.component, function (tags, director) {
    /** @override */
    this.$prototype = 'bigine.runtime.runtime';
    $.episode = new bigine.core.episode(
        tags
    );
    $.state = new bigine.runtime.state();
    $.director = director instanceof bigine.runtime.director ?
        director :
        bigine.runtime.director.factory();
    $.logger = new bigine.runtime.logger(bigine.runtime.logger.LEVEL_DEBUG);
});

/**
 * 运行。
 *
 * @return {bigine.runtime.runtime}
 */
bigine.runtime.runtime.prototype.run = function() {
    $.director.init($.episode, {
        director: $.director,
        logger: $.logger,
        state: $.state
    });
    return this;
};

module.exports = bigine.runtime.runtime;
