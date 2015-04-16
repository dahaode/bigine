/**
 * 定义脚本代码令牌组件。
 */

var bigine = {
    core: {
        tag: {
            factory: require('lib/core/tag/factory')
        }
    },
    error: require('lib/error')
};

/**
 * 脚本代码令牌组件。
 *
 * @param  {String} clob 脚本代码行
 * @param  {Integer} line 行号
 * @return {bigine.core.token}
 */
bigine.core.token = function(clob, line) {
    var fields = /^(\t*)([^\s（：]+)(?:|（([^）]+)）)(?:|：(.*))$/.exec(clob);
    if (!fields) {
        throw new bigine.error('语法格式有误', line);
    }
    this.$id = bigine.core.tag.factory.map[fields[2]] || 'bigine.core.tag';
    this.$name = fields[2];
    this.$depth = fields[1].length;
    this.$line = line;
    this.$params = fields[3] ? fields[3].split('，') : [];
    this.$content = fields[4];
};

module.exports = bigine.core.token;
