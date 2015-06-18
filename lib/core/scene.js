/**
 * 定义剧情事件接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 DaHao.de
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('../bigine').$namespace('.core');

/**
 * 定义剧情事件接口规范。
 *
 * @return {bigine.core.scene}
 * @interface
 */
bigine.core.scene = function() {};

/**
 * 系统类事件。
 *
 * @const {String}
 */
bigine.core.scene.KIND_EPISODE = 'episode';

/**
 * 剧情类事件。
 *
 * @const {String}
 */
bigine.core.scene.KIND_ROOM = 'room';

/**
 * 表演剧情内容。
 *
 * @param  {Object} context
 * @return {bigine.util.promise}
 */
bigine.core.scene.prototype.perform = function(context) {};

module.exports = bigine.core.scene;
