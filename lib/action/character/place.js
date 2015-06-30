/**
 * 定义设置人物事件动作组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 DaHao.de
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../../bigine').$namespace('.action.character')
    .$import('.error')
    .$import('.tag.action')
    .$import('.runtime.director');

/**
 * 设置人物事件动作组件。
 *
 * - 参数：位置
 * - 内容：人物、姿态
 * - 子项：无
 *
 * ```
 * {position, character, pose}
 * ```
 *
 * @param  {Number} line
 * @param  {!Array<String>} params
 * @param  {!String} content
 * @return {bigine.action.character.place}
 * @constructor
 * @extends {bigine.tag.action}
 */
bigine.action.character.place = bigine.$extends(bigine.tag.action, function (line, params, content) {
    bigine.tag.action.call(this, line, params, content);
    /** @override */
    this.$prototype = 'bigine.action.character.place';

    var self = this,
        $this = {},
        exParams = this.$splitContent(2);
    Object.defineProperties(this, {
        position: {
            get: function() {
                return $this.position;
            },
            set: function(value) {
                switch (value) {
                    case bigine.runtime.director.POS_LEFT:
                    case bigine.runtime.director.POS_MIDDLE:
                    case bigine.runtime.director.POS_RIGHT:
                        break;
                    default:
                        throw new bigine.error('无效的位置“' + this.position + '”', this);
                }
                $this.position = value;
                self.$params = [value];
            }
        },
        character: {
            get: function() {
                return $this.character;
            },
            set: function(value) {
                $this.character = value;
                exParams[0] = value.id || value;
                self.$content = exParams.join('，');
            }
        },
        pose: {
            get: function() {
                return $this.pose;
            },
            set: function(value) {
                $this.pose = value;
                exParams[1] = value;
                self.$content = exParams.join('，');
            }
        }
    });

    /**
     * 站位。
     *
     * @type {String}
     */
    $this.position = params[0] || bigine.runtime.director.POS_MIDDLE;

    /**
     * 人物。
     *
     * @type {bigine.entity.character}
     */
    $this.character = exParams[0];

    /**
     * 姿态。
     *
     * @type {String}
     */
    $this.pose = exParams[1] || '';
});

/** @inheritDoc */
bigine.action.character.place.prototype.$expectParams = function() {
    return [0, 1];
};

/** @inheritDoc */
bigine.action.character.place.prototype.$expectContent = function() {
    return true;
};

/** @inheritDoc */
bigine.action.character.place.prototype.$bind = function(episode) {
    this.character = episode.character(this.character);
    return bigine.tag.action.prototype.$bind.call(this, episode);
};

/** @inheritDoc */
bigine.action.character.place.prototype.act = function(context) {
    if (this.character.position) {
        return bigine.util.promise.reject(new bigine.error('人物“' + this.character.title + '”已在场', this));
    }
    context.logger.info(' [episode]', this.character.title, '（', this.pose, '）');
    this.character.position = this.position;
    this.character.pose = this.pose;
    return context.director.setChar(this, context);
};

module.exports = bigine.action.character.place;
