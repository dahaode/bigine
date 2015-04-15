/**
 * 配置标签名称与组件的映射表。
 *
 * @author    郑煜宇 <zhengyuyu@kanshu.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

var bigine = {
    core: {
        tag: {}
    }
};

bigine.core.tag.map = {
    '事件': 'bigine.tag.event',
    '时间': 'bigine.tag.event.type'
};

module.exports = bigine.core.tag.map;
