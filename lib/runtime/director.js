/**
 * 定义运行时场面（视觉、听觉、交互）指挥器组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

/** @namespace */
var bigine = require('bigine/core/component').$namespace('.runtime'),
    $ = {};

bigine.util = {};
bigine.util.helper = require('bigine/util/helper');

/**
 * 运行时画面指挥器组件。
 *
 * @return {bigine.runtime.director}
 * @constructor
 * @extends {bigine.core.component}
 */
bigine.runtime.director = bigine.core.component.$extends(bigine.core.component, function() {
    /** @override */
    this.$prototype = 'bigine.runtime.director';
});

/**
 * 无画面变更。
 *
 * 此方法用于不涉及场面控制变化地游戏事件动作组件。
 *
 * @param  {{director:bigine.runtime.director, state:bigine.runtime.state}} context
 * @return {bigine.util.q.deferred.promise}
 */
bigine.runtime.director.prototype.oops = function(context) {
    return bigine.util.helper.promise.resolved(context);
};

/**
 * 设置房间。
 *
 * @param  {{director:bigine.runtime.director, state:bigine.runtime.state}} context
 * @param  {bigine.object.room=} room
 * @return {bigine.util.q.deferred.promise}
 */
bigine.runtime.director.prototype.room = function(context, room) {
    console.debug('@TODO bigine.runtime.director.prototype.room');
    return bigine.util.helper.promise.resolved(context);
};

/**
 * 设置房间时刻。
 *
 * @param  {{director:bigine.runtime.director, state:bigine.runtime.state}} context
 * @param  {String} layout
 * @return {bigine.util.q.deferred.promise}
 */
bigine.runtime.director.prototype.layout = function(context, layout) {
    console.debug('@TODO bigine.runtime.director.prototype.layout');
    return bigine.util.helper.promise.resolved(context);
};

/**
 * 设置天气。
 *
 * @param  {{director:bigine.runtime.director, state:bigine.runtime.state}} context
 * @param  {bigine.object.weather=} weather
 * @return {bigine.util.q.deferred.promise}
 */
bigine.runtime.director.prototype.weather = function(context, weather) {
    console.debug('@TODO bigine.runtime.director.prototype.weather');
    return bigine.util.helper.promise.resolved(context);
};

/**
 * 设置左侧站位人物。
 *
 * @param  {{director:bigine.runtime.director, state:bigine.runtime.state}} context
 * @param  {bigine.object.character=} character
 * @param  {Boolean=} animated
 * @return {bigine.util.q.deferred.promise}
 */
bigine.runtime.director.prototype.lchar = function(context, character, animated) {
    console.debug('@TODO bigine.runtime.director.prototype.lchar');
    return bigine.util.helper.promise.resolved(context);
};

/**
 * 设置中间站位人物。
 *
 * @param  {{director:bigine.runtime.director, state:bigine.runtime.state}} context
 * @param  {bigine.object.character=} character
 * @param  {Boolean=} animated
 * @return {bigine.util.q.deferred.promise}
 */
bigine.runtime.director.prototype.cchar = function(context, character, animated) {
    console.debug('@TODO bigine.runtime.director.prototype.cchar');
    return bigine.util.helper.promise.resolved(context);
};

/**
 * 设置右侧站位人物。
 *
 * @param  {{director:bigine.runtime.director, state:bigine.runtime.state}} context
 * @param  {bigine.object.character=} character
 * @param  {Boolean=} animated
 * @return {bigine.util.q.deferred.promise}
 */
bigine.runtime.director.prototype.rchar = function(context, character, animated) {
    console.debug('@TODO bigine.runtime.director.prototype.rchar');
    return bigine.util.helper.promise.resolved(context);
};

/**
 * 设置左侧站位人物姿态。
 *
 * @param  {{director:bigine.runtime.director, state:bigine.runtime.state}} context
 * @param  {String} pose
 * @return {bigine.util.q.deferred.promise}
 */
bigine.runtime.director.prototype.lpose = function(context, pose) {
    console.debug('@TODO bigine.runtime.director.prototype.lpos');
    return bigine.util.helper.promise.resolved(context);
};

/**
 * 设置中间站位人物姿态。
 *
 * @param  {{director:bigine.runtime.director, state:bigine.runtime.state}} context
 * @param  {String} pose
 * @return {bigine.util.q.deferred.promise}
 */
bigine.runtime.director.prototype.cpose = function(context, pose) {
    console.debug('@TODO bigine.runtime.director.prototype.cpos');
    return bigine.util.helper.promise.resolved(context);
};

/**
 * 设置右侧站位人物姿态。
 *
 * @param  {{director:bigine.runtime.director, state:bigine.runtime.state}} context
 * @param  {String} pose
 * @return {bigine.util.q.deferred.promise}
 */
bigine.runtime.director.prototype.rpose = function(context, pose) {
    console.debug('@TODO bigine.runtime.director.prototype.rpos');
    return bigine.util.helper.promise.resolved(context);
};

/**
 * 获取人物站位。
 *
 * @param  {bigine.object.character} character
 * @return {Number}
 */
bigine.runtime.director.prototype.charpos = function(character) {
    console.debug('@TODO bigine.runtime.director.prototype.charpos');
    return false;
};

/**
 * 设置特写。
 *
 * @param  {{director:bigine.runtime.director, state:bigine.runtime.state}} context
 * @param  {bigine.object.cg=} cg
 * @return {bigine.util.q.deferred.promise}
 */
bigine.runtime.director.prototype.cg = function(context, cg) {
    console.debug('@TODO bigine.runtime.director.prototype.cg');
    return bigine.util.helper.promise.resolved(context);
};

/**
 * 设置背景音乐。
 *
 * @param  {{director:bigine.runtime.director, state:bigine.runtime.state}} context
 * @param  {bigine.object.bgm=} bgm
 * @return {bigine.util.q.deferred.promise}
 */
bigine.runtime.director.prototype.bgm = function(context, bgm) {
    console.debug('@TODO bigine.runtime.director.prototype.bgm');
    return bigine.util.helper.promise.resolved(context);
};

/**
 * 播放音效。
 *
 * @param  {{director:bigine.runtime.director, state:bigine.runtime.state}} context
 * @param  {bigine.object.se=} sound
 * @return {bigine.util.q.deferred.promise}
 */
bigine.runtime.director.prototype.se = function(context, sound) {
    console.debug('@TODO bigine.runtime.director.prototype.se');
    return bigine.util.helper.promise.resolved(context);
};

/**
 * 选择。
 *
 * @param  {{director:bigine.runtime.director, state:bigine.runtime.state}} context
 * @param  {Object<String>} options
 * @return {bigine.util.q.deferred.promise}
 */
bigine.runtime.director.prototype.choose = function(context, options) {
    console.debug('@TODO bigine.runtime.director.prototype.choose');
    return bigine.util.helper.promise.resolved(context);
};

/**
 * 画外音。
 *
 * @param  {{director:bigine.runtime.director, state:bigine.runtime.state}} context
 * @param  {String} words
 * @return {bigine.util.q.deferred.promise}
 */
bigine.runtime.director.prototype.voiceover = function(context, words) {
    console.debug('@TODO bigine.runtime.director.prototype.voiceover');
    return bigine.util.helper.promise.resolved(context);
};

/**
 * 对话。
 *
 * @param  {{director:bigine.runtime.director, state:bigine.runtime.state}} context
 * @param  {bigine.object.character} who
 * @param  {String} words
 * @return {bigine.util.q.deferred.promise}
 */
bigine.runtime.director.prototype.say = function(context, who, words) {
    console.debug('@TODO bigine.runtime.director.prototype.say');
    return bigine.util.helper.promise.resolved(context);
};

/**
 * 获取图片最大尺寸。
 *
 * @return {Number}
 * @static
 */
bigine.runtime.director.getImageSize = function() {
    return screen ? screen.width : 1920;
};

/**
 * OS X 操作系统。
 *
 * @const {String}
 */
bigine.runtime.director.OS_OSX = 'OS X';

/**
 * Unix 操作系统。
 *
 * @const {String}
 */
bigine.runtime.director.OS_UNIX = 'UNIX';

/**
 * Linux 操作系统。
 *
 * @const {String}
 */
bigine.runtime.director.OS_LINUX = 'Linux';

/**
 * Windows 操作系统。
 *
 * @const {String}
 */
bigine.runtime.director.OS_WINDOWS = 'Windows';

/**
 * iOS 操作系统。
 *
 * @const {String}
 */
bigine.runtime.director.OS_IOS = 'iOS';

/**
 * Android 操作系统。
 *
 * @const {String}
 */
bigine.runtime.director.OS_ANDROID = 'Android';

/**
 * 未知操作系统。
 *
 * @const {String}
 */
bigine.runtime.director.OS_UNKNOWN = 'unknown';

/**
 * 微信浏览器。
 *
 * @const {String}
 */
bigine.runtime.director.BROWSER_WECHAT = 'wechat';

/**
 * Android 内置浏览器。
 *
 * @const {String}
 */
bigine.runtime.director.BROWSER_ANDROID = 'androidbrowser';

/**
 * Internet Explorer 浏览器。
 *
 * @const {String}
 */
bigine.runtime.director.BROWSER_IE = 'ie';

/**
 * QQ 浏览器。
 *
 * @const {String}
 */
bigine.runtime.director.BROWSER_QQ = 'qqbrowser';

/**
 * QQ 手机版浏览器。
 *
 * @const {String}
 */
bigine.runtime.director.BROWSER_MOBILE_QQ = 'mqqbrowser';

/**
 * UC 浏览器。
 *
 * @const {String}
 */
bigine.runtime.director.BROWSER_UC = 'ucbrowser';

/**
 * 360 浏览器。
 *
 * @const {String}
 */
bigine.runtime.director.BROWSER_360 = '360browser';

/**
 * 百度盒子内置浏览器。
 *
 * @const {String}
 */
bigine.runtime.director.BROWSER_BAIDU_APP = 'baiduboxapp';

/**
 * 百度浏览器。
 *
 * @const {String}
 */
bigine.runtime.director.BROWSER_BAIDU = 'baidubrowser';

/**
 * Maxthon 浏览器。
 *
 * @const {String}
 */
bigine.runtime.director.BROWSER_MAXTHON = 'maxthon';

/**
 * Opera 浏览器。
 *
 * @const {String}
 */
bigine.runtime.director.BROWSER_OPERA = 'opera';

/**
 * Opera 中文浏览器。
 *
 * @const {String}
 */
bigine.runtime.director.BROWSER_OUPENG = 'oupeng';

/**
 * 小米内置浏览器。
 *
 * @const {String}
 */
bigine.runtime.director.BROWSER_MIUI = 'miuibrowser';

/**
 * Firefox 浏览器。
 *
 * @const {String}
 */
bigine.runtime.director.BROWSER_FIREFOX = 'firefox';

/**
 * Safari 浏览器。
 *
 * @const {String}
 */
bigine.runtime.director.BROWSER_SAFARI = 'safari';

/**
 * Google Chrome 浏览器。
 *
 * @const {String}
 */
bigine.runtime.director.BROWSER_CHROME = 'chrome';

/**
 * 猎豹浏览器。
 *
 * @const {String}
 */
bigine.runtime.director.BROWSER_LIEBAO = 'liebao';

/**
 * QZone 浏览器。
 *
 * @const {String}
 */
bigine.runtime.director.BROWSER_QZONE = 'qzone';

/**
 * 搜狗浏览器。
 *
 * @const {String}
 */
bigine.runtime.director.BROWSER_SOUGOU = 'sogou';

/**
 * 未知浏览器。
 *
 * @const {String}
 */
bigine.runtime.director.BROWSER_UNKNOWN = 'unknown';

/**
 * 判断是否为 NodeJS 环境。
 *
 * @return {Boolean}
 * @static
 */
bigine.runtime.director.isNodeJS = function() {
    if (undefined === $.nodejs) {
        $.nodejs = !!(process && process.version && process.arch);
    }
    return $.nodejs;
};

/**
 * 判断是否为 Node-Webkit 环境。
 *
 * @return {Boolean}
 * @static
 */
bigine.runtime.director.isNodeWebkit = function() {
    if (undefined === $.nodewebkit) {
        $.nodewebkit = bigine.runtime.director.isNodeJS() && !!process.versions['node-webkit'];
    }
    return $.nodewebkit;
};

/**
 * 判断是否为移动设备。
 *
 * @return {Boolean}
 * @static
 */
bigine.runtime.director.isMobile = function() {
    if (undefined === $.mobile) {
        if (!navigator) {
            $.mobile = false;
        } else {
            var ua = navigator.userAgent.toLowerCase();
            $.mobile = !!(-1 < ua.indexOf('mobile') || -1 < ua.indexOf('android'));
        }
    }
    return $.mobile;
};

/**
 * 获取操作系统类型。
 *
 * @return {String}
 * @static
 */
bigine.runtime.director.getOS = function() {
    if (undefined === $.os) {
        $.os = bigine.runtime.director.OS_UNKNOWN;
        if (navigator) {
            if (-1 < navigator.appVersion.indexOf('Win')) {
                $.os = bigine.runtime.director.OS_WINDOWS;
            } else if (navigator.userAgent.match(/(iPad|iPhone|iPod)/i)) {
                $.os = bigine.runtime.director.OS_IOS;
            } else if (-1 < navigator.appVersion.indexOf('Mac')) {
                $.os = bigine.runtime.director.OS_OSX;
            } else if (-1 < navigator.appVersion.indexOf('X11')) {
                $.os = bigine.runtime.director.OS_UNIX;
            } else if (navigator.userAgent.match(/android/i) || navigator.platform.match(/android/i)) {
                $.os = bigine.runtime.director.OS_ANDROID;
            } else if (-1 < navigator.appVersion.indexOf('Linux')) {
                $.os = bigine.runtime.director.OS_LINUX;
            }
        } else if (bigine.runtime.director.isNodeJS()) {
            switch (process.platform) {
                case 'darwin':
                    $.os = bigine.runtime.director.OS_OSX;
                    break;
                case 'freebsd':
                case 'sunos':
                    $.os = bigine.runtime.director.OS_UNIX;
                    break;
                case 'linux':
                    $.os = bigine.runtime.director.OS_LINUX;
                    break;
                case 'win32':
                    $.os = bigine.runtime.director.OS_WINDOWS;
                    break;
            }
        }
    }
    return $.os;
};

/**
 * 获取浏览器类型。
 *
 * @return {String}
 * @static
 */
bigine.runtime.director.getBrowser = function() {
    if (undefined === $.browser) {
        $.browser = bigine.runtime.director.BROWSER_UNKNOWN;
        if (bigine.runtime.director.isNodeWebkit()) {
            $.browser = bigine.runtime.director.BROWSER_CHROME;
        } else if (navigator) {
            var match = navigator.userAgent.match(/sogou|qzone|liebao|micromessenger|qqbrowser|ucbrowser|360 aphone|360browser|baiduboxapp|baidubrowser|maxthon|trident|oupeng|opera|miuibrowser|firefox/i) ||
                navigator.userAgent.match(/chrome|safari/i);
            if (match && match.length) {
                switch (match[0]) {
                    case 'micromessenger':
                        $.browser = bigine.runtime.director.BROWSER_WECHAT;
                        break;
                    case 'safari':
                        $.browser = match[0];
                        if (navigator.userAgent.match(/android.*applewebkit/)) {
                            $.browser = bigine.runtime.director.BROWSER_ANDROID;
                        }
                        break;
                    case 'trident':
                        $.browser = bigine.runtime.director.BROWSER_IE;
                        break;
                    case '360 aphone':
                        $.browser = bigine.runtime.director.BROWSER_360;
                        break;
                    default:
                        $.browser = match[0];
                }
            }
        }
    }
    return $.browser;
};

/**
 * 获取音频格式。
 *
 * @return {String}
 * @static
 */
bigine.runtime.director.getAudioFormat = function() {
    if (!$.audio) {
        if (bigine.runtime.director.isNodeJS() && bigine.runtime.director.BROWSER_UNKNOWN == bigine.runtime.director.getBrowser()) {
            $.audio = {
                auto: false,
                ext: 'mp3',
                multiChannel: false,
                webAudio: false
            };
        } else {
            var features = {
                    common: {
                        auto: true,
                        multiChannel: true,
                        webAudio: !!(window.AudioContext || window.webkitAudioContext || window.mozAudioContext)
                    }
                },
                version;
            features[bigine.runtime.director.BROWSER_IE] = {
                auto: true,
                emptied: true,
                multiChannel: true,
                webAudio: features.common.webAudio
            };
            features[bigine.runtime.director.BROWSER_ANDROID] = {
                auto: false,
                multiChannel: false,
                webAudio: false
            };
            features[bigine.runtime.director.BROWSER_CHROME] = {
                auto: false,
                multiChannel: true,
                webAudio: true
            };
            features[bigine.runtime.director.BROWSER_FIREFOX] = {
                auto: true,
                multiChannel: true,
                webAudio: true
            };
            features[bigine.runtime.director.BROWSER_UC] = {
                auto: false,
                multiChannel: true,
                webAudio: false
            };
            features[bigine.runtime.director.BROWSER_QQ] = {
                auto: true,
                multiChannel: false,
                webAudio: false
            };
            features[bigine.runtime.director.BROWSER_OUPENG] = {
                auto: false,
                emptied: true,
                multiChannel: false,
                replay: true,
                webAudio: false
            };
            features[bigine.runtime.director.BROWSER_WECHAT] = {
                auto: false,
                emptied: true,
                multiChannel: false,
                replay: true,
                webAudio: false
            };
            features[bigine.runtime.director.BROWSER_360] = {
                auto: true,
                multiChannel: false,
                webAudio: false
            };
            features[bigine.runtime.director.BROWSER_MIUI] = {
                auto: true,
                multiChannel: false,
                webAudio: false
            };
            features[bigine.runtime.director.BROWSER_BAIDU] = {
                auto: true,
                emptied: true,
                multiChannel: false,
                webAudio: false
            };
            features[bigine.runtime.director.BROWSER_BAIDU_APP] = {
                auto: true,
                emptied: true,
                multiChannel: false,
                webAudio: false
            };
            features[bigine.runtime.director.BROWSER_LIEBAO] = {
                auto: false,
                emptied: true,
                multiChannel: false,
                replay: true,
                webAudio: false
            };
            features[bigine.runtime.director.BROWSER_SOUGOU] = {
                auto: false,
                emptied: true,
                multiChannel: false,
                replay: true,
                webAudio: false
            };
            features[bigine.runtime.director.BROWSER_SAFARI] = {
                auto: false,
                callback: function (url) {
                    document.createElement('audio').src = url;
                },
                multiChannel: true,
                webAudio: true
            };
            switch (bigine.runtime.director.getBrowser()) {
                case bigine.runtime.director.BROWSER_IE:
                    version = navigator.userAgent.match(/(msie |rv:)([\d.]+)/);
                    break;
                case bigine.runtime.director.BROWSER_FIREFOX:
                    version = navigator.userAgent.match(/(firefox\/|rv:)([\d.]+)/);
                    break;
                case bigine.runtime.director.BROWSER_CHROME:
                    version = navigator.userAgent.match(/chrome\/([\d.]+)/);
                    break;
                case bigine.runtime.director.BROWSER_BAIDU:
                    version = navigator.userAgent.match(/baidubrowser\/([\d.]+)/);
                    break;
                case bigine.runtime.director.BROWSER_UC:
                    version = navigator.userAgent.match(/ucbrowser\/([\d.]+)/);
                    break;
                case bigine.runtime.director.BROWSER_QQ:
                    version = navigator.userAgent.match(/qqbrowser\/([\d.]+)/);
                    break;
                case bigine.runtime.director.BROWSER_OUPENG:
                    version = navigator.userAgent.match(/oupeng\/([\d.]+)/);
                    break;
                case bigine.runtime.director.BROWSER_WECHAT:
                    version = navigator.userAgent.match(/micromessenger\/([\d.]+)/);
                    break;
                case bigine.runtime.director.BROWSER_SAFARI:
                    version = navigator.userAgent.match(/safari\/([\d.]+)/);
                    break;
                case bigine.runtime.director.BROWSER_MIUI:
                    version = navigator.userAgent.match(/miuibrowser\/([\d.]+)/);
                    break;
            }
            version = version ? version[1] : '';
            if (version) {
                switch (bigine.runtime.director.getBrowser()) {
                    case bigine.runtime.director.BROWSER_CHROME:
                        if (30 > parseInt(version, 10)) {
                            features[amgine.environment.BROWSER_CHROME].multiChannel = false;
                        }
                        break;
                    case bigine.runtime.director.BROWSER_MIUI:
                        version = version.match(/\d+/g);
                        if (2 > version[0] || (2 == version[0] && 0 === version[1] && 2 > version[2])) {
                            features[amgine.environment.BROWSER_MIUI].auto = false;
                        }
                        break;
                }
            }
            if (bigine.runtime.director.isMobile()) {
                if (bigine.runtime.director.OS_IOS == bigine.runtime.director.getOS()) {
                    $.audio = features[bigine.runtime.director.BROWSER_SAFARI];
                } else {
                    $.audio = features[bigine.runtime.director.getBrowser()] || features.common;
                }
            } else if (bigine.runtime.director.BROWSER_IE == bigine.runtime.director.getBrowser()) {
                $.audio = features[bigine.runtime.director.BROWSER_IE];
            } else {
                $.audio = features.common;
            }
            $.audio.ext = '.mp3';
            version = new Audio();
            if (version.canPlayType) {
                if (version.canPlayType('audio/x-m4a')) {
                    $.audio.ext = '.m4a';
                } else if (version.canPlayType('audio/mp4')) {
                    $.audio.ext = '.mp4';
                } else if (version.canPlayType('audio/ogg; codecs="vorbis"')) {
                    $.audio.ext = '.ogg';
                }
            }
        }
    }
    return '128.' + $.audio.ext;
};

module.exports = bigine.runtime.director;
