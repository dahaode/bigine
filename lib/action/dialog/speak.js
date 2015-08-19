/**
 * 定义对白事件动作组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 DaHao.de
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../../bigine').$namespace('.action.dialog')
    .$import('.tag.action')
    .$import('.util');

/**
 * 对白事件动作组件。
 *
 * - 参数：讲话人、听众、昵称
 * - 内容：文本
 * - 子项：无
 *
 * ```
 * {id, from, to, nick, words}
 * ```
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.action.dialog.speak}
 * @constructor
 * @extends {bigine.tag.action}
 */
bigine.action.dialog.speak = bigine.$extends(bigine.tag.action, function (line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.action.dialog.speak';

    if (Object.defineProperties) {
        var self = this,
            $this = {};
        Object.defineProperties(this, {
            words: {
                get: function() {
                    return $this.words;
                },
                set: function(value) {
                    $this.words =
                    self.$content = value;
                }
            },
            from: {
                get: function() {
                    return $this.from;
                },
                set: function(value) {
                    $this.from = value;
                    self.$params[0] = value.id || value;
                }
            },
            to: {
                get: function() {
                    return $this.to;
                },
                set: function(value) {
                    $this.to = value;
                    self.$params[1] = value.id || value;
                }
            },
            nick: {
                get: function() {
                    return $this.nick;
                },
                set: function(value) {
                    if (value) {
                        $this.nick = value;
                        self.$params[2] = value;
                    }
                }
            }
        });
    }

    /**
     * 编号。
     *
     * @type {String}
     */
    this.id = bigine.util.uuid();

    /**
     * 文本。
     *
     * @type {String}
     */
    this.words = content;

    /**
     * 讲话人。
     *
     * @type {bigine.entity.character}
     */
    this.from = params[0];

    /**
     * 听众。
     *
     * @type {bigine.entity.character}
     */
    this.to = params[1];

    /**
     * 昵称。
     *
     * @type {String}
     */
    this.nick = params[2];
});

/** @inheritDoc */
bigine.action.dialog.speak.prototype.$expectParams = function() {
    return [2, 3];
};

/** @inheritDoc */
bigine.action.dialog.speak.prototype.$expectContent = function() {
    return true;
};

/** @inheritDoc */
bigine.action.dialog.speak.prototype.$bind = function(episode) {
    this.from = episode.character(this.from);
    this.to = episode.character(this.to);
    return bigine.tag.action.prototype.$bind.call(this, episode);
};

/** @inheritDoc */
bigine.action.dialog.speak.prototype.act = function(context) {
    context.logger.info(' [episode]', (this.nick || this.from.title) + '：『' + this.words + '』');
    return context.director.speak(this, context);
};

/** @inheritDoc */
bigine.action.dialog.speak.prototype.$prefetch = function(resource) {
    if (this.from.avatar) resource.register(this.from.avatar.src, 'avatar');
};

module.exports = bigine.action.dialog.speak;
