/**
 * 定义进入房间事件动作组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('bigine/core/component').$namespace('.action.room');

bigine.tag = {};
bigine.tag.action = require('bigine/tag/action');
bigine.util = {};
bigine.util.helper = require('bigine/util/helper');

/**
 * 进入房间事件动作组件。
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.action.room.move}
 * @constructor
 * @extends {bigine.tag.action}
 */
bigine.action.room.move = bigine.core.component.$extends(bigine.tag.action, function(line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.action.room.move';
    this.room = this.$params[0];
});

/** @inheritDoc */
bigine.action.room.move.prototype.$expectParams = function() {
    return [1, 1];
};

/** @inheritDoc */
bigine.action.room.move.prototype.bind = function(episode) {
    this.room = episode.room(this.room);
    return bigine.tag.action.prototype.bind.call(this, episode);
};

/** @inheritDoc */
bigine.action.room.move.prototype.act = function(context) {
    var promise = context.state['当前房间'] ?
        context.state['当前房间'].leave(context) :
        bigine.util.helper.promise.resolved(context),
        $this = this;
    return promise.then(function () {
        return context.director.room(context).then(function () {
            context.state['当前房间'] = $this.room;
            return context.director.room(context, $this.room);
        }).then(function () {
            return context.state['当前房间'].enter(context);
        });
    });
};

module.exports = bigine.action.room.move;
