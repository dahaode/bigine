/**
 * 定义脚本代码令牌组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../bigine').$namespace('.core')
    .$import('.error')
    .$import('.core.component');

/**
 * 脚本代码令牌组件。
 *
 * @param  {String} clob 脚本代码行
 * @param  {Number} line 行号
 * @return {bigine.core.token}
 * @constructor
 * @struct
 * @extends {bigine.core.component}
 */
bigine.core.token = bigine.$extends(bigine.core.component, function (clob, line) {
    /** @override */
    this.$prototype = 'bigine.core.token';
    var fields = /^(\t*)([^\s（：]+)(?:|（([^）]+)）)(?:|：(.*))$/.exec(clob);
    if (!fields) {
        throw new bigine.error('语法格式错误无法解析', line);
    }
    this.$name = fields[2];
    this.$depth = fields[1].length;
    this.$line = line;
    this.$params = fields[3] ? fields[3].split('，') : [];
    this.$content = fields[4];
});

module.exports = bigine.core.token;
