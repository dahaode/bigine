/**
 * 定义环境信息组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

var bigine = require('../bigine').$namespace('.runtime')
    .$import('.util'),
    ua = 'undefined' != typeof navigator ? navigator.userAgent.toLowerCase() : false;

/**
 * 环境信息组件。
 *
 * @type {Object}
 */
bigine.runtime.env = {};

/**
 * iOS 操作系统。
 *
 * @const {String}
 */
bigine.runtime.env.OS_IOS = "iOS";

/**
 * Android 操作系统。
 *
 * @const {String}
 */
bigine.runtime.env.OS_ANDROID = "Android";

/**
 * Windows 操作系统。
 *
 * @const {String}
 */
bigine.runtime.env.OS_WINDOWS = "Windows";

/**
 * Marmalade 平台。
 *
 * @const {String}
 */
bigine.runtime.env.OS_MARMALADE = "Marmalade";

/**
 * Unix 操作系统。
 *
 * @const {String}
 */
bigine.runtime.env.OS_UNIX = "Unix";

/**
 * Linux 操作系统。
 *
 * @const {String}
 */
bigine.runtime.env.OS_LINUX = "Linux";

/**
 * Bada 操作系统。
 *
 * @const {String}
 */
bigine.runtime.env.OS_BADA = "Bada";

/**
 * 黑莓操作系统。
 *
 * @const {String}
 */
bigine.runtime.env.OS_BLACKBERRY = "Blackberry";

/**
 * OS X 操作系统。
 *
 * @const {String}
 */
bigine.runtime.env.OS_OSX = "OS X";

/**
 * Windows 平板操作系统。
 *
 * @const {String}
 */
bigine.runtime.env.OS_WP8 = "WP8";

/**
 * Windows 平板操作系统。
 *
 * @const {String}
 */
bigine.runtime.env.OS_WINRT = "WINRT";

/**
 * 未知操作系统。
 *
 * @const {String}
 */
bigine.runtime.env.OS_UNKNOWN = "Unknown";

/**
 * 微信内嵌浏览器。
 *
 * @const {String}
 */
bigine.runtime.env.BROWSER_WECHAT = "wechat";

/**
 * Android 默认浏览器。
 *
 * @const {String}
 */
bigine.runtime.env.BROWSER_ANDROID = "androidbrowser";

/**
 * Windows 内嵌浏览器。
 *
 * @const {String}
 */
bigine.runtime.env.BROWSER_IE = "ie";

/**
 * QQ 浏览器。
 *
 * @const {String}
 */
bigine.runtime.env.BROWSER_QQ = "qqbrowser";

/**
 * QQ 内嵌浏览器。
 *
 * @const {String}
 */
bigine.runtime.env.BROWSER_MOBILE_QQ = "mqqbrowser";

/**
 * UC 浏览器。
 *
 * @const {String}
 */
bigine.runtime.env.BROWSER_UC = "ucbrowser";

/**
 * 360 浏览器。
 *
 * @const {String}
 */
bigine.runtime.env.BROWSER_360 = "360browser";

/**
 * 百度内嵌浏览器。
 *
 * @const {String}
 */
bigine.runtime.env.BROWSER_BAIDU_APP = "baiduboxapp";

/**
 * 百度浏览器。
 *
 * @const {String}
 */
bigine.runtime.env.BROWSER_BAIDU = "baidubrowser";

/**
 * Maxthon 浏览器。
 *
 * @const {String}
 */
bigine.runtime.env.BROWSER_MAXTHON = "maxthon";

/**
 * Opera 浏览器。
 *
 * @const {String}
 */
bigine.runtime.env.BROWSER_OPERA = "opera";

/**
 * Opera 中文版浏览器。
 *
 * @const {String}
 */
bigine.runtime.env.BROWSER_OUPENG = "oupeng";

/**
 * 小米内嵌浏览器。
 *
 * @const {String}
 */
bigine.runtime.env.BROWSER_MIUI = "miuibrowser";

/**
 * 火狐浏览器。
 *
 * @const {String}
 */
bigine.runtime.env.BROWSER_FIREFOX = "firefox";

/**
 * OS X 内嵌浏览器。
 *
 * @const {String}
 */
bigine.runtime.env.BROWSER_SAFARI = "safari";

/**
 * 谷歌 Chrome 浏览器。
 *
 * @const {String}
 */
bigine.runtime.env.BROWSER_CHROME = "chrome";

/**
 * 金山猎豹浏览器。
 *
 * @const {String}
 */
bigine.runtime.env.BROWSER_LIEBAO = "liebao";

/**
 * QZone 内嵌浏览器。
 *
 * @const {String}
 */
bigine.runtime.env.BROWSER_QZONE = "qzone";

/**
 * 搜狗浏览器。
 *
 * @const {String}
 */
bigine.runtime.env.BROWSER_SOUGOU = "sogou";

/**
 * 未知浏览器。
 *
 * @const {String}
 */
bigine.runtime.env.BROWSER_UNKNOWN = "unknown";

/**
 * 屏幕宽度。
 *
 * @type {Number}
 */
bigine.runtime.env.screen = {};
bigine.runtime.env.screen.width = 'undefined' != typeof screen && screen.width || 1920;

/**
 * 是否为移动设备。
 *
 * @type {Boolean}
 */
bigine.runtime.env.mobile = ua ? !!(-1 < ua.indexOf('mobile') || -1 < ua.indexOf('android')) : false;

/**
 * 是否为 Node.js 环境。
 *
 * @type {Boolean}
 */
bigine.runtime.env.node = {};
bigine.runtime.env.node.js = !!(process && process.version && process.arch);

/**
 * 是否为 NW.js 环境。
 *
 * @type {Boolean}
 */
bigine.runtime.env.node.webkit = bigine.runtime.env.node.js && !!process.versions['node-webkit'];

module.exports = bigine.runtime.env;
