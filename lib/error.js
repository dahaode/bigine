/**
 * 定义基础异常类。
 *
 * @author    郑煜宇 <zhengyuyu@kanshu.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

var bigine = {};

/**
 * 基础异常类。
 *
 * @param  {String} reason
 * @param  {Int} line
 * @return {bigine.error}
 */
bigine.error = function(reason, line) {
    Error.call(this, '第 ' + line + ' 行' + reason + '。');
    this.lineNumber = line;
    this.name = 'BiGineError';
};
bigine.error.prototype = new Error();

module.exports = bigine.error;
