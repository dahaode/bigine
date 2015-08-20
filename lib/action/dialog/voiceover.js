/**
 * 定义旁白事件动作组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 DaHao.de
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../../bigine').$namespace('.action.dialog')
    .$import('.tag.action')
    .$import('.runtime.event.act')
    .$import('.util');

/**
 * 旁白事件动作组件。
 *
 * - 参数：无
 * - 内容：文本
 * - 子项：无
 *
 * ```
 * {id, words}
 * ```
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.action.dialog.voiceover}
 * @constructor
 * @extends {bigine.tag.action}
 */
bigine.action.dialog.voiceover = bigine.$extends(bigine.tag.action, function (line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.action.dialog.voiceover';

    if (Object.defineProperties) {
        var self = this,
            $this = {};
        Object.defineProperties(this, {
            words: {
                get: function() {
                    return $this.words;
                },
                set: function(value) {
                    $this.words =
                    self.$content = value;
                }
            }
        });
    }

    /**
     * 编号。
     *
     * @type {String}
     */
    this.id = bigine.util.uuid();

    /**
     * 文本。
     *
     * @type {String}
     */
    this.words = content;
});

/** @inheritDoc */
bigine.action.dialog.voiceover.prototype.$expectContent = function() {
    return true;
};

/** @inheritDoc */
bigine.action.dialog.voiceover.prototype.act = function(context) {
    context.logger.info(' [episode] 『' + this.words + '』');
    context.dispatch(new bigine.runtime.event.act({
        target: this,
        id: this.id,
        kind: 'voiceover'
    }));
    return context.director.voiceover(this, context);
};

module.exports = bigine.action.dialog.voiceover;
