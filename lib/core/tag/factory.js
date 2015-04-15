/**
 * 定义标签抽象工厂组件。
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

/**
 * 标签抽象工厂组件。
 *
 * @param  {Object} token
 * @return {bigine.core.tag.factory}
 * @constructs
 */
bigine.core.tag.factory = function(token) {
    return new (require('lib/' + token.id.split('.').slice(1).join('/')))(token.line, token.params, token.content);
};

bigine.core.tag.factory.__BROWSERIFY_HACK__ = function() {
    require('lib/core/tag');
    require('lib/tag/event');
    require('lib/tag/event/type');
    require('lib/tag/event/assertion');
    require('lib/tag/event/plot');
};

bigine.core.tag.factory.map = {
    '事件': 'bigine.tag.event',
    '时间': 'bigine.tag.event.type',
    '条件': 'bigine.tag.event.assertion',
    '内容': 'bigine.tag.event.plot'
};

module.exports = bigine.core.tag.factory;
