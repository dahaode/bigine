/**
 * 定义根标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 DaHao.de
 * @license   GPL-3.0+
 */

var bigine = require('../bigine').$namespace('.tag')
    .$import('.core.tag')
    .$import('.util.promise');

/**
 * 根标签组件。
 *
 * - 参数：无
 * - 内容：无
 * - 子项：实体、事件、声明性标签
 *
 * ```
 * {autostart, player, suite, theme}
 * ```
 *
 * @return {bigine.tag.root}
 * @constructor
 * @extends {bigine.core.tag}
 */
bigine.tag.root = bigine.$extends(bigine.core.tag, function () {
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
        'bigine.entity.bgm': true,
        'bigine.entity.cg': true,
        'bigine.entity.character': true,
        'bigine.entity.map': true,
        'bigine.entity.room': true,
        'bigine.entity.se': true,
        'bigine.entity.weather': true,
        'bigine.tag.autostart': 'autostart',
        'bigine.tag.player': 'player',
        'bigine.tag.scene': true,
        'bigine.tag.suite': 'suite',
        'bigine.tag.theme': 'theme'
    };
};

/**
 * 追加注册主角信息。
 *
 * @param  {bigine.core.episode} episode
 * @return {bigine.tag.root}
 * @override
 */
bigine.tag.root.prototype.$register = function(episode) {
    var self = this;
    return bigine.core.tag.prototype.$register.call(this, episode).then(function () {
        if (self.player) {
            self.player.$bind(episode);
        }
        return bigine.util.promise.resolve(episode);
    });
};

/** @inheritDoc */
bigine.tag.root.prototype.toScript = function() {
    var clob = '';
    for (ii = 0; ii < this.$children.length; ii++) {
        clob += this.$children[ii].toScript();
    }
    return clob;
};

/** @inheritDoc */
bigine.tag.root.prototype.toJsrn = function(lineNumber) {
    for (var ii = 0, jj = []; ii < this.$children.length; ii++) {
        jj.push(this.$children[ii].toJsrn(lineNumber));
    }
    return '[' + jj.join(',') + ']';
};

module.exports = bigine.tag.root;
