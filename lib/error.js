/**
 * 定义基础异常类。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

var bigine = require('./bigine');

/**
 * 基础异常类。
 *
 * @param  {String} reason
 * @param  {Number=} line
 * @return {bigine.error}
 * @constructor
 * @extends {Error}
 */
bigine.error = bigine.$extends(Error, function (reason, line) {
    if (line) {
        reason = '第 ' + line + ' 行' + reason;
    }
    reason += '。';
    Error.call(this, reason);
    this.name = 'BiGineError';
    this.message = reason;
    this.lineNumber = line;
    if (Error.captureStackTrace) {
        Error.captureStackTrace(this, bigine.error);
    }
});

/**
 * 创建事件链中断信号异常。
 *
 * @return {bigine.error}
 * @static
 */
bigine.error.halt = function() {
    return new bigine.error('HALT', -1);
};

module.exports = bigine.error;
