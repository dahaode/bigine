/**
 * 定义事件类型（时间）标签组件。
 *
 * @author    郑煜宇 <zhengyuyu@kanshu.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

var bigine = {
    core: {
        tag: require('bigine/core/tag')
    },
    error: require('bigine/error'),
    tag: {
        scene: {}
    }
},
    $ = {};

/**
 * 事件类型（时间）标签组件。
 *
 * @param  {Integer} line 在脚本源代码中地行号
 * @param  {Array} params 参数数组
 * @param  {String} content 内容
 * @return {bigine.tag.scene.type}
 * @constructs
 */
bigine.tag.scene.type = function(line, params, content) {
    bigine.core.tag.call(this, line, params, content);
    this.$prototype = 'bigine.tag.scene.type';
    var grammar = /^([^（]+)(?:|（(\S+)）)$/,
        tokens = grammar.exec(content);
    switch (tokens[1]) {
        case '进入房间前':
        case '进入房间后':
        case '离开房间前':
        case '离开房间后':
            if (!tokens[2]) {
                throw new bigine.error('房间参数缺失', line);
            }
            break;
        case '游戏开始时':
        case '游戏结束时':
        case '游戏失败时':
            break;
        default:
            throw new bigine.error('无效地时间类型“' + tokens[1] + '”', line);
    }
    this.id = tokens[1];
    this.reference = tokens[2];
};
bigine.tag.scene.type.prototype = new bigine.core.tag();

/**
 * 获取是否预期子标签。
 *
 * @return {false}
 */
bigine.tag.scene.type.prototype.$expectChildren = function() {
    return false;
};

module.exports = bigine.tag.scene.type;
