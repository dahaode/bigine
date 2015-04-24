/**
 * 定义基础异常类。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

var bigine = {};

/**
 * 基础异常类。
 *
 * @param  {String} reason
 * @param  {Number} line
 * @return {bigine.error}
 * @constructor
 */
bigine.error = function(reason, line) {
    if (line) {
        reason = '第 ' + line + ' 行' + reason;
    }
    reason += '。';
    Error.call(this, reason);
    this.name = 'BiGineError';
    this.message = reason;
    this.lineNumber = line;
};
/** @ignore */
var proto = function() {};
proto.prototype = Error.prototype;
bigine.error.prototype = new proto();
bigine.error.prototype.constructor = bigine.error;

module.exports = bigine.error;
