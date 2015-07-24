/**
 * 定义运行时组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 DaHao.de
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../bigine').$namespace('.runtime')
    .$import('.error')
    .$import('.core.component')
    .$import('.core.episode')
    .$import('.runtime.state')
    .$import('.runtime.director.factory')
    .$import('.runtime.logger')
    .$import('.runtime.event.new')
    .$import('.runtime.event.play')
    .$import('.runtime.event.ready')
    .$import('.util.promise');

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
    var self = this;
    this.episode.$on('ready', function () {
        self.dispatch(new bigine.runtime.event.ready());
    });
    this.addEventListener('new', function () {
        self.episode.begin(self).fail(function (error) {
            self.logger.error(error);
        });
    });
    this.addEventListener('continue', function () {
        self.state.load().fail(function (error) {
            self.dispatch(new bigine.runtime.event['new']());
            return bigine.util.promise.reject(error);
        }).then(function () {
            self.episode.resume(self).fail(function (error) {
                self.logger.error(error);
            });
        });
    });
    this.director = director instanceof bigine.runtime.director ?
        director :
        bigine.runtime.director.factory();
    if (this.director.init(this)) {
        this.logger.info(' [runtime] AUTOPLAY');
        this.play();
    }
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
    this.dispatch(new bigine.runtime.event.play());
    this.state.$save = onSave || function(title, data, completed, onSuccess, onFailure) {
        onSuccess(data);
    };
    this.state.$load = onLoad || function(completed, onSuccess, onFailure) {
        onFailure(new bigine.error('无法读取存档'));
    };
    this.director.play();
    return this;
};

/**
 * 监听事件。
 *
 * @param {String} type
 * @param {Function} handler
 * @return {void}
 */
bigine.runtime.runtime.prototype.addEventListener = function(type, handler) {
    this.$events = this.$events || {};
    this.$events[type] = this.$events[type] || [];
    this.$events[type].push(handler);
};

/**
 * 取消监听事件。
 *
 * @param  {String} type
 * @param  {Function} handler
 * @return {void}
 */
bigine.runtime.runtime.prototype.removeEventListener = function(type, handler) {
    this.$events = this.$events || {};
    this.$events[type] = this.$events[type] || [];
    var index = -1;
    bigine.util.some(this.$events[type], function (listener, offset) {
        if (listener == handler) {
            index = offset;
            return true;
        }
        return false;
    });
    if (-1 != index) {
        this.$events[type].splice(index, 1);
    }
};

/**
 * 触发事件。
 *
 * @param  {bigine.runtime.event} event
 * @return {void}
 */
bigine.runtime.runtime.prototype.dispatch = function(event) {
    this.logger.debug('   [event]', event);
    this.$events = this.$events || {};
    this.$events[event.type] = this.$events[event.type] || [];
    bigine.util.each(this.$events[event.type], function (handler) {
        handler(event);
    });
};

/**
 * 销毁运行时。
 *
 * @return {void}
 */
bigine.runtime.runtime.prototype.destroy = function() {
    this.director.destroy();
    this.episode =
    this.state =
    this.director =
    this.logger = undefined;
};

/**
 * 修正播放区域比例。
 *
 * @return {void}
 */
bigine.runtime.runtime.prototype.fix = function() {
    this.director.fix();
};

module.exports = bigine.runtime.runtime;
