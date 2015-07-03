/**
 * 定义运行时状态组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 DaHao.de
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../bigine').$namespace('.runtime')
    .$import('.core.component')
    .$import('.util.promise');

/**
 * 运行时状态组件。
 *
 * @return {bigine.runtime.state}
 * @constructor
 * @extends {bigine.core.component}
 */
bigine.runtime.state = bigine.$extends(bigine.core.component, function () {
    /** @override */
    this.$prototype = 'bigine.runtime.state';
});

/**
 * 转换文本中的变量内容。
 *
 * @param  {String} clob
 * @return {String}
 */
bigine.runtime.state.prototype.convert = function(clob) {
    var self = this;
    return clob.replace(/〈(.+)〉/g, function (match, p1) {
        if ('$' == p1[0]) {
            p1 = false;
        }
        return self[p1];
    });
};

/**
 * 存档。
 *
 * @param  {String} title
 * @param  {Boolean=} completed
 * @return {bigine.util.promise}
 */
bigine.runtime.state.prototype.save = function(title, completed) {
    var self = this;
    return new bigine.util.promise(function (resolve, reject) {
        var data = {};
        bigine.util.each(self, function (value, key) {
            if ('$' != key[0]) {
                data[key] = value;
            }
        });
        self.$save(title, JSON.stringify(data), !!completed, function (data) {
            resolve(data);
        }, function (error) {
            reject(error);
        });
    });
};

/**
 * 存档写入逻辑处理。
 *
 * @param  {String} title
 * @param  {String} data
 * @param  {Boolean=} completed
 * @param  {Function(String)=} onSuccess
 * @param  {Function(Error)=} onFailure
 * @return {void}
 */
bigine.runtime.state.prototype.$save = bigine.util.noop;

/**
 * 读档。
 *
 * @param  {Boolean=} completed
 * @return {bigine.util.promise}
 */
bigine.runtime.state.prototype.load = function(completed) {
    var self = this;
    return new bigine.util.promise(function (resolve, reject) {
        self.$load(!!completed, function (data) {
            bigine.util.each(JSON.parse(data) || {}, function (value, key) {
                self[key] = value;
            });
            resolve(self);
        }, function (error) {
            reject(error);
        });
    });
};

/**
 * 读档读取逻辑处理。
 *
 * @param  {String} data
 * @param  {Boolean=} completed
 * @param  {Function(String)=} onSuccess
 * @param  {Function(Error)=} onFailure
 * @return {void}
 */
bigine.runtime.state.prototype.$load = bigine.util.noop;

module.exports = bigine.runtime.state;
