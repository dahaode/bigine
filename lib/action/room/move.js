/**
 * 定义进入房间事件动作组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../../bigine').$namespace('.action.room')
    .$import('.error')
    .$import('.tag.action')
    .$import('.util.promise');

/**
 * 进入房间事件动作组件。
 *
 * - 参数：名称
 * - 内容：无
 * - 子项：无
 *
 * ```
 * {room}
 * ```
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.action.room.move}
 * @constructor
 * @extends {bigine.tag.action}
 */
bigine.action.room.move = bigine.$extends(bigine.tag.action, function (line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.action.room.move';

    /**
     * 房间实体。
     *
     * @type {bigine.entity.room}
     */
    this.room = params[0];
});

/** @inheritDoc */
bigine.action.room.move.prototype.$expectParams = function() {
    return [1, 1];
};

/** @inheritDoc */
bigine.action.room.move.prototype.$bind = function(episode) {
    this.room = episode.room(this.room);
    return bigine.tag.action.prototype.$bind.call(this, episode);
};

/** @inheritDoc */
bigine.action.room.move.prototype.act = function(context) {
    var self = this;
    return new bigine.util.promise(function (resolve, reject) {
        context.logger.debug('[promise] move began');
        (function () {
            context.state['$n'] = self.room; // room next
            context.logger.debug('[state] $n =', self.room);
            if (context.state['$r']) {
                return context.state['$r'].preLeave(context);
            }
            return context.director.oops(context);
        })().then(function () {
            return self.room.preEnter(context);
        }).then(function () {
            return context.director.room(context, context.state['$n']);
        }).then(function () {
            if (context.state['$r']) {
                return context.state['$r'].postLeave(context);
            }
            return context.director.oops(context);
        }).then(function () {
            context.state['$r'] = context.state['$n']; // room
            context.logger.debug('[state] $r =', context.state['$r']);
            context.state['当前房间'] = context.state['$r'];
            context.logger.debug('[state] 当前房间 = ', context.state['$r']);
            context.state['$n'] = undefined;
            context.logger.debug('[state] $n = undefined');
            return context.state['$r'].postEnter(context);
        }).then(function () {
            context.logger.debug('[promise] move done');
            resolve(context);
        }).fail(function (error) {
            if (-1 == error.lineNumber) {
                context.logger.debug('[promise] move done');
                return resolve(context);
            }
            reject(error);
        });
    });
};

module.exports = bigine.action.room.move;
