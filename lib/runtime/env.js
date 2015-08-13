/**
 * 定义环境信息组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 DaHao.de
 * @license   GPL-3.0+
 */

var bigine = require('../bigine').$namespace('.runtime')
    .$import('.util');

/**
 * 环境信息组件。
 *
 * @type {Object}
 */
bigine.runtime.env = {};

/**
 * 浏览器信息。
 *
 * @type {String}
 */
bigine.runtime.env.browser = (function (ua) {
    var $ = function(regex) {
            if (!ua) return '';
            var match = ua.match(regex);
            return (match && 1 < match.length) ? match[1] : '';
        },
        ios = $(/(ipod|iphone|ipad)/i).toLowerCase(),
        android = /android/i.test(ua) && !/like android/i.test(ua),
        edgeVer = $(/edge\/(\d+(\.\d+)?)/i),
        version = $(/version\/(\d+(\.\d+)?)/i),
        tablet = /tablet/i.test(ua),
        mobile = !tablet && /[^-]mobi/i.test(ua),
        result;
    if (/opera|opr/i.test(ua)) {
        result = {
            name: 'Opera',
            opera: true,
            version: version || $(/(?:opera|opr)[\s\/](\d+(\.\d+)?)/i)
        };
    } else if (/windows phone/i.test(ua)) {
        result = {
            name: 'Windows Phone',
            windowsphone: true
        };
        if (edgeVer) {
            result.msedge = true;
            result.version = edgeVer;
        } else {
            result.msie = true;
            result.version = $(/iemobile\/(\d+(\.\d+)?)/i);
        }
    } else if (/msie|trident/i.test(ua)) {
        result = {
            name: 'Internet Explorer',
            msie: true,
            version: $(/(?:msie |rv:)(\d+(\.\d+)?)/i)
        };
    } else if (/chrome.+? edge/i.test(ua)) {
        result = {
            name: 'Microsoft Edge',
            msedge: true,
            version: edgeVer
        };
    } else if (/chrome|crios|crmo/i.test(ua)) {
        result = {
            name: 'Chrome',
            chrome: true,
            version: $(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
        };
    } else if (ios) {
        result = {
            name: 'iphone' == ios ? 'iPhone' : 'ipad' == ios ? 'iPad' : 'iPod'
        };
        if (version) result.version = version;
    } else if (/sailfish/i.test(ua)) {
        result = {
            name: 'Sailfish',
            sailfish: true,
            version: $(/sailfish\s?result\/(\d+(\.\d+)?)/i)
        };
    } else if (/seamonkey\//i.test(ua)) {
        result = {
            name: 'SeaMonkey',
            seamonkey: true,
            version: $(/seamonkey\/(\d+(\.\d+)?)/i)
        };
    } else if (/firefox|iceweasel/i.test(ua)) {
        result = {
            name: 'Firefox',
            firefox: true,
            version: $(/(?:firefox|iceweasel)[ \/](\d+(\.\d+)?)/i)
        };
        if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua)) result.firefoxos = true;
    } else if (/silk/i.test(ua)) {
        result = {
            name: 'Amazon Silk',
            silk: true,
            version: $(/silk\/(\d+(\.\d+)?)/i)
        };
    } else if (android) {
        result = {
            name: 'Android',
            version: version
        };
    } else if (/phantom/i.test(ua)) {
        result = {
            name: 'PhantomJS',
            phantom: true,
            version: $(/phantomjs\/(\d+(\.\d+)?)/i)
        };
    } else if (/blackberry|\bbb\d+/i.test(ua) || /rim\stablet/i.test(ua)) {
        result = {
            name: 'BlackBerry',
            blackberry: true,
            version: version || $(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
        };
    } else if (/(web|hpw)os/i.test(ua)) {
        result = {
            name: 'WebOS',
            webos: true,
            version: version || $(/w(?:eb)?osresult\/(\d+(\.\d+)?)/i)
        };
        if (/touchpad\//i.test(ua)) result.touchpad = true;
    } else if (/bada/i.test(ua)) {
        result = {
            name: 'Bada',
            bada: true,
            version: $(/dolfin\/(\d+(\.\d+)?)/i)
        };
    } else if (/tizen/i.test(ua)) {
        result = {
            name: 'Tizen',
            tizen: true,
            version: $(/(?:tizen\s?)?result\/(\d+(\.\d+)?)/i) || version
        };
    } else if (/safari/i.test(ua)) {
        result = {
            name: 'Safari',
            safari: true,
            version: version
        };
    } else {
        result = {
            name: $(/^(.*)\/.* /),
            version: $(/^.*\/(.*) /)
        };
    }
    if (!result.msedge && /(apple)?webkit/i.test(ua)) {
        result.name = result.name || 'Webkit';
        result.version = result.version || version;
        result.webkit = true;
    } else if (!result.opera && /gecko\//i.test(ua)) {
        result.name = result.name || 'Gecko';
        result.gecko = true;
        result.version = result.version || $(/gecko\/(\d+(\.\d+)?)/i);
    }
    if (!result.msedge && (android || result.silk)) {
        result.android = true;
    } else if (ios) {
        result[ios] = true;
        result.ios = true;
    }
    var osver = '';
    if (result.windowsphone) {
        osver = $(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
    } else if (ios) {
        osver = $(/os (\d+([_\s]\d+)*) like mac os x/i).replace(/[_\s]/g, '.');
    } else if (android) {
        osver = $(/android[ \/-](\d+(\.\d+)*)/i);
    } else if (result.webos) {
        osver = $(/(?:web|hpw)os\/(\d+(\.\d+)*)/i);
    } else if (result.blackberry) {
        osver = $(/rim\stablet\sos\s(\d+(\.\d+)*)/i);
    } else if (result.bada) {
        osver = $(/bada\/(\d+(\.\d+)*)/i);
    } else if (result.tizen) {
        osver = $(/tizen[\/\s](\d+(\.\d+)*)/i);
    }
    if (osver) result.osversion = osver;
    var osver0 = osver.split('.')[0];
    if (tablet || 'ipad' == ios || (android && (3 == osver0 || (4 == osver0 && !mobile))) || result.silk) {
        result.tablet = true;
    } else if (mobile || 'ipad' != ios || android || result.blackberry || result.webos || result.bada) {
        result.mobile = true;
    }
    return result;
})('undefined' != typeof navigator ? navigator.userAgent.toLowerCase() : false);

/**
 * 屏幕宽度。
 *
 * @type {Number}
 */
bigine.runtime.env.screen = {};
bigine.runtime.env.screen.width = 'undefined' != typeof screen && screen.width || 1920;

/**
 * 是否为 Node.js 环境。
 *
 * @type {Boolean}
 */
bigine.runtime.env.node = {};
bigine.runtime.env.node.js = !!(process && process.version && process.arch);

/**
 * 是否为 NW.js 或 Electron (Atom-Shell) 环境。
 *
 * @type {Boolean}
 */
bigine.runtime.env.node.webkit = (function () {
    if (!bigine.runtime.env.node.js) return false;
    return !!process.versions['node-webkit'] || !!process.versions['atom-shell'] || !!process.versions['electron'];
})();

/**
 * 是否为移动设备。
 *
 * @type {Boolean}
 */
bigine.runtime.env.mobile = bigine.runtime.env.browser.tablet || bigine.runtime.env.browser.mobile;

/**
 * 是否能够使用画步。
 *
 * @type {Boolean}
 */
bigine.runtime.env.canvas = !bigine.runtime.env.browser.msie || 9 < parseFloat(bigine.runtime.env.browser.version);

module.exports = bigine.runtime.env;
