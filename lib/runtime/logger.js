/**
 * 定义运行时日志组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 DaHao.de
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../bigine').$namespace('.runtime')
    .$import('.core.component'),
    $ = {};

/**
 * 运行时日志组件。
 *
 * @return {bigine.runtime.logger}
 * @constructor
 * @extends {bigine.core.component}
 */
bigine.runtime.logger = bigine.$extends(bigine.core.component, function (level) {
    /** @override */
    this.$prototype = 'bigine.runtime.logger';
    if (undefined === level) {
        $.level = bigine.runtime.logger.LEVEL_ERROR;
    } else {
        $.level = level;
    }
});

/**
 * 调试级别。
 *
 * @const {Number}
 */
bigine.runtime.logger.LEVEL_DEBUG = 0;

/**
 * 信息级别。
 *
 * @const {Number}
 */
bigine.runtime.logger.LEVEL_INFO = 1;

/**
 * 警告级别。
 *
 * @const {Number}
 */
bigine.runtime.logger.LEVEL_WARN = 2;

/**
 * 错误级别。
 *
 * @const {Number}
 */
bigine.runtime.logger.LEVEL_ERROR = 3;

/**
 * 全静默级别。
 *
 * @const {Number}
 */
bigine.runtime.logger.LEVEL_SILENT = 9;

/**
 * 设置或获取日志级别。
 *
 * @param  {Number=} level
 * @return {Number}
 */
bigine.runtime.logger.prototype.level = function(level) {
    if (undefined !== level) {
        $.level = level;
    }
    return $.level;
};

/**
 * 调试日志。
 *
 * @param  {...*} message
 * @return {Null}
 */
bigine.runtime.logger.prototype.debug = function(message) {
    if ($.level > bigine.runtime.logger.LEVEL_DEBUG) {
        return;
    }
    if (window.console) {
        if (console.log.apply) {
            (console.debug || console.log).apply(console, arguments);
        } else {
            (console.debug || console.log)(message);
        }
    }
};

/**
 * 信息日志。
 *
 * @param  {...*} message
 * @return {Null}
 */
bigine.runtime.logger.prototype.info =
bigine.runtime.logger.prototype.log = function(message) {
    if ($.level > bigine.runtime.logger.LEVEL_INFO) {
        return;
    }
    if (window.console) {
        if (console.log.apply) {
            console.info.apply(console, arguments);
        } else {
            console.info(message);
        }
    }
};

/**
 * 警告日志。
 *
 * @param  {...*} message
 * @return {Null}
 */
bigine.runtime.logger.prototype.warn = function(message) {
    if ($.level > bigine.runtime.logger.LEVEL_WARN) {
        return;
    }
    if (window.console) {
        if (console.warn.apply) {
            console.warn.apply(console, arguments);
        } else {
            console.warn(message);
        }
    }
};

/**
 * 错误日志。
 *
 * @param  {...*} message
 * @return {Null}
 */
bigine.runtime.logger.prototype.error = function(message) {
    if ($.level > bigine.runtime.logger.LEVEL_ERROR) {
        return;
    }
    message = message.stack || message;
    if (window.console) {
        if (console.error.apply) {
            console.error.apply(console, arguments);
        } else {
            console.error(message);
        }
    }
};

module.exports = bigine.runtime.logger;
