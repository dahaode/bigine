/**
 * 定义事件触发接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../bigine').$namespace('.core');

/**
 * 事件触发接口规范。
 *
 * @return {bigine.core.emittable}
 * @interface
 */
bigine.core.emittable = function() {};

/**
 * 剧情开始事件类型。
 *
 * @const {String}
 */
bigine.core.emittable.TYPE_EPISODE_BEGIN = 'begin';

/**
 * 剧情完结事件类型。
 *
 * @const {String}
 */
bigine.core.emittable.TYPE_EPISODE_DONE = 'done';

/**
 * 剧情失败事件类型。
 *
 * @const {String}
 */
bigine.core.emittable.TYPE_EPISODE_FAIL = 'fail';

/**
 * 进入房间前事件类型。
 *
 * @const {String}
 */
bigine.core.emittable.TYPE_ROOM_BEFORE_ENTER = 'pre-enter';

/**
 * 进入房间后事件类型。
 *
 * @const {String}
 */
bigine.core.emittable.TYPE_ROOM_AFTER_ENTER = 'post-enter';

/**
 * 离开房间前事件类型。
 *
 * @const {String}
 */
bigine.core.emittable.TYPE_ROOM_BEFORE_LEAVE = 'pre-leave';

/**
 * 离开房间后事件类型。
 *
 * @const {String}
 */
bigine.core.emittable.TYPE_ROOM_AFTER_LEAVE = 'post-leave';

/**
 * 注册单个事件。
 *
 * @param  {String} type
 * @param  {bigine.core.scene} scene
 * @return {bigine.core.emittable}
 */
bigine.core.emittable.prototype.$on = function(type, scene) {};

/**
 * 触发一类事件。
 *
 * @param  {String} type
 * @return {bigine.util.promise}
 */
bigine.core.emittable.prototype.$fire = function(type) {};

module.exports = bigine.core.emittable;
