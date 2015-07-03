/**
 * 定义事件标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 DaHao.de
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../bigine').$namespace('.tag')
    .$import('.error')
    .$import('.core.tag')
    .$import('.core.scene')
    .$import('.core.emittable')
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
        return bigine.util.promise.reject(new bigine.error('事件类型未定义', this));
    }
    if (!this.plot) {
        return bigine.util.promise.reject(new bigine.error('事件内容不能为空', this));
    }
    var self = this;
    return bigine.core.tag.prototype.$bind.call(this, episode).then(function () {
        switch (self.type.kind) {
            case bigine.core.scene.KIND_ROOM:
                self.type.reference.$on(self.type.id, self);
                break;
            case bigine.core.scene.KIND_EPISODE:
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
    switch (true) {
        case this.type.id != context.state['当前类型']:
        case this.assertion && !this.assertion.test(context.state, context.logger):
        case bigine.core.emittable.TYPE_ROOM_BEFORE_ENTER == this.type.id && this.type.reference.id != context.state['目标房间']:
        case bigine.core.emittable.TYPE_ROOM_AFTER_ENTER == this.type.id && this.type.reference.id != context.state['当前房间']:
        case bigine.core.emittable.TYPE_ROOM_BEFORE_LEAVE == this.type.id && this.type.reference.id != context.state['当前房间']:
        case bigine.core.emittable.TYPE_ROOM_AFTER_LEAVE == this.type.id && this.type.reference.id != context.state['当前房间']:
            context.logger.debug('   [scene] skip', this);
            return context.director.oops(context);
    }
    if (context.state['$r']) {
        if (context.state['当前事件'] != this.title) {
            context.logger.debug('   [scene] skip', this);
            return context.director.oops(context);
        }
        delete context.state['$r'];
    }
    context.logger.info('   [scene]', this.title);
    context.state['当前事件'] = this.title;
    context.logger.debug('   [state] 当前事件 =', this.title);
    var promise = bigine.util.promise.resolve(),
        self = this;
    if (bigine.core.emittable.TYPE_ROOM_BEFORE_LEAVE == this.type.id ||
        bigine.core.emittable.TYPE_ROOM_AFTER_ENTER == this.type.id
    ) {
        promise = context.director.setRoom({room: this.type.reference}, context);
    }
    return promise.then(function () {
        return self.plot.play(context);
    });
};

module.exports = bigine.tag.scene;
