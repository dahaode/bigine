/**
 * 定义基础异常类。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 DaHao.de
 * @license   GPL-3.0+
 */

var bigine = require('./bigine');

/**
 * 基础异常类。
 *
 * @param  {String} reason
 * @param  {Object=} tag
 * @return {bigine.error}
 * @constructor
 * @extends {Error}
 */
bigine.error = bigine.$extends(Error, function (reason, tag) {
    if (tag.$line) {
        reason = '第 ' + tag.$line + ' 行' + reason;
    }
    reason += '。';
    Error.call(this, reason);
    this.name = 'BiGineError';
    this.message = reason;
    this.tag = tag;
    if (tag.$line) {
        this.lineNumber = tag.$line;
    }
    if (Error.captureStackTrace) {
        Error.captureStackTrace(this, bigine.error);
    }
});

/**
 * 中断信号。
 *
 * @const {Number}
 */
bigine.error.SIG_HALT = -1;

/**
 * 创建事件链中断信号异常。
 *
 * @return {bigine.error}
 * @static
 */
bigine.error.halt = function() {
    var err = new bigine.error();
    err.$signal = bigine.error.SIG_HALT;
    err.message = '';
    return err;
};

module.exports = bigine.error;
