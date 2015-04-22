/**
 * 定义人物对象头像标签组件。
 *
 * @author    郑煜宇 <zhengyuyu@kanshu.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

var bigine = {
    core: {
        tag: require('bigine/core/tag')
    },
    object: {
        character: {}
    }
};

/**
 * 人物对象头像标签组件。
 *
 * @param  {Integer} line 在脚本源代码中地行号
 * @param  {Array} params 参数数组
 * @param  {String} content 内容
 * @return {bigine.object.character.avatar}
 * @constructs
 */
bigine.object.character.avatar = function(line, params, content) {
    bigine.core.tag.call(this, line, params, content);
    this.$prototype = 'bigine.object.character.avatar';
};
bigine.object.character.avatar.prototype = new bigine.core.tag();

module.exports = bigine.object.character.avatar;