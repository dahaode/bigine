/**
 * 定义事件标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../bigine').$namespace('.tag')
    .$import('.error')
    .$import('.core.tag')
    .$import('.core.scene')
    .$import('.util.promise');

/**
 * 事件标签组件。
 *
 * - 参数：无
 * - 内容：名称
 * - 子项：类型、条件、情节
 *
 * ```
 * {
 *   id,
 *   title,
 *   type: {id, kind, reference},
 *   assertion,
 *   plot
 * }
 * ```
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.tag.scene}
 * @constructor
 * @extends {bigine.core.tag}
 * @implements {bigine.core.scene}
 */
bigine.tag.scene = bigine.$extends(bigine.core.tag, function (line, params, content) {
    bigine.core.tag.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.tag.scene';

    /**
     * 编号。
     *
     * @type {String}
     */
    this.id =

    /**
     * 名称。
     *
     * @type {String}
     */
    this.title = content;

    /**
     * 类型。
     *
     * @type {bigine.tag.scene.type}
     */
    this.type =

    /**
     * 条件。
     *
     * @type {bigine.tag.scene.assertion}
     */
    this.assertion =

    /**
     * 情节。
     *
     * @type {bigine.tag.scene.plot}
     */
    this.plot = undefined;
});

/** @inheritDoc */
bigine.tag.scene.prototype.$expectChildren = function() {
    return {
        'bigine.tag.scene.type': 'type',
        'bigine.tag.scene.assertion': 'assertion',
        'bigine.tag.scene.plot': 'plot'
    };
};

/** @inheritDoc */
bigine.tag.scene.prototype.$bind = function(episode) {
    if (!this.type) {
        throw new bigine.error('事件类型未定义', this.$line);
    }
    if (!this.plot) {
        throw new bigine.error('事件内容不能为空', this.$line);
    }
    var self = this;
    return bigine.core.tag.prototype.$bind.call(this, episode).then(function () {
        switch (self.type.kind) {
            case 'room':
                self.type.reference.$on(self.type.id, self);
                break;
            case 'episode':
                episode.$on(self.type.id, self);
        }
        return bigine.util.promise.resolve(episode);
    });
};

/**
 * 执行。
 *
 * @param  {Object} context
 * @return {bigine.util.promise}
 */
bigine.tag.scene.prototype.perform = function(context) {
    if (this.type.id != context.state['$e'] ||
        'room' == this.type.kind && this.type.reference != context.state['当前房间'] ||
        this.assertion && !this.assertion.test(context.state)
    ) {
        context.logger.debug('[scene]', this, 'skipped');
        return context.director.oops(context);
    }
    context.logger.debug('[scene]', this, 'triggered');
    return this.plot.play(context);
};

module.exports = bigine.tag.scene;
