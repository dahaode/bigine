/**
 * 定义按键助手组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

var bigine = require('../bigine').$namespace('.util')
    .$import('.core.component'),
    $;

/**
 * 按键助手组件。
 *
 * @return {bigine.util.key}
 * @constructor
 * @extends {bigine.core.component}
 */
bigine.util.key = bigine.$extends(bigine.core.component, function () {
    /**
     * 事件绑定。
     *
     * @type {<String, Function(Event)[]>}
     */
    this.listeners = {};
});
$ = bigine.util.key;

/**
 * 派发事件。
 *
 * @param  {String} type
 * @param  {Event} event
 * @return {void}
 */
bigine.util.key.prototype.dispatch = function(type, event) {
    bigine.util.each(this.listeners[type] || [], function (listener) {
        listener(event);
    });
};

/**
 * 添加事件监听器。
 *
 * @param  {String} type
 * @param  {Function(Event)} handler
 * @return {void}
 */
bigine.util.key.prototype.addEventListener = function(type, handler) {
    this.listeners[type] = this.listeners[type] || [];
    var exists = bigine.util.some(this.listeners[type], function (listener) {
        return listener == handler;
    });
    if (!exists) {
        this.listeners[type].push(handler);
    }
};

/**
 * 删除事件监听器。
 *
 * @param  {String} type
 * @param  {Function(Event)} handler
 * @return {void}
 */
bigine.util.key.prototype.removeEventListener = function(type, handler) {
    if (!this.listeners[type]) {
        return;
    }
    var index = -1;
    bigine.util.some(this.listeners[type], function (listener) {
        index++;
        return listener == handler;
    });
    if (-1 != index && this.listeners[type].length != index) {
        this.listeners[type].splice(index, 1);
    }
};

/**
 * 获取唯一实例。
 *
 * @return {bigine.util.key}
 * @static
 */
bigine.util.key.singleton = function() {
    if (!$.$) {
        $.$ = new $();
        bigine.util.on(window.document.body, {
            keydown: function(event) {
                $.$.dispatch('down.' + event.keyCode, event);
            },
            keyup: function(event) {
                $.$.dispatch('up.' + event.keyCode, event);
            },
            keypress: function(event) {
                $.$.dispatch('press.' + event.keyCode, event);
            }
        });
    }
    return $.$;
};

module.exports = bigine.util.key;
