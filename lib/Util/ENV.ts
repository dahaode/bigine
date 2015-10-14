/**
 * 定义环境信息探测组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Util/Env.ts
 */

/// <reference path="../../include/tsd.d.ts" />
/// <reference path="../E.ts" />

namespace Util {
    export interface IEnvType {
        Window: boolean;
        Node: {
            JS: boolean,
            Webkit: boolean
        };
        Screen: {
            Width: number,
            Height: number
        };
        Protocol: string;
        Canvas: boolean;
        Mobile: boolean;
        MSIE: boolean;
    }

    export var ENV: IEnvType = {
        /**
         * 是否存在 Window 对象。
         */
        Window: 'undefined' !== typeof window,
        /**
         * 是否为 NodeJS 环境。
         */
        Node: {
            JS: !!('undefined' !== typeof process && process.version && process.arch),
            Webkit: false
        },
        /**
         * 屏幕信息。
         */
        Screen: {
            Width: 1920,
            Height: 1080
        },
        /**
         * 通信协议。
         */
        Protocol: 'http:',
        /**
         * 是否支持 Canvas 功能。
         */
        Canvas: false,
        /**
         * 是否为移动设备。
         */
        Mobile: false,
        /**
         * IE 浏览器。
         */
        MSIE: false
    };
    ((env: IEnvType) => {
        if (env.Node.JS)
            env.Node.Webkit = !!(('node-webkit' in process.versions) || ('atom-shell' in process.versions) || ('electron' in process.versions));
        var detect: () => [boolean, boolean] = () => {
            var ua: string = navigator.userAgent.toLowerCase(),
                pick: (pattern: RegExp) => string = (pattern: RegExp) => {
                    var match: string[] = ua.match(pattern);
                    return (match && 1 < match.length) ? match[1] : '';
                },
                ios: string = pick(/(ipod|iphone|ipad)/),
                android: boolean = /android/.test(ua) && !/like android/.test(ua),
                tablet: boolean = /tablet/.test(ua),
                mobile: boolean = !tablet && /[^-]mobi/.test(ua),
                osver: number = 0,
                msie: boolean = false;
            if (android)
                osver = parseInt(pick(/android[ \/-](\d+(\.\d+)*)/), 10);
            if ('ipad' == ios || (android && (3 == osver || (4 == osver && !mobile))) || /silk/.test(ua)) {
                tablet = true;
            } else if ('ipod' == ios || 'iphone' == ios || android || /blackberry|\bbb\d+/.test(ua) || /rim\stablet/.test(ua) || /(web|hpw)os/.test(ua) || /bada/i.test(ua))
                mobile = true;
            if (/windows phone/.test(ua)) {
                if (!/edge\/(\d+(\.\d+)?)/.test(ua))
                    msie = true;
            } else if (/msie|trident/.test(ua))
                msie = true;
            return [tablet || mobile, msie];
        };
        if (env.Window) {
            if ('https:' == location.protocol)
                env.Protocol = 'https:';
            env.Canvas = 'CanvasRenderingContext2D' in window;
            var desult: [boolean, boolean] = detect(),
                doc: HTMLElement = document.documentElement;
            env.Mobile = desult[0];
            env.MSIE = desult[1];
            // window.devicePixelRatio @?x
            env.Screen.Width = desult[0] ? doc.clientWidth : screen.width;
            env.Screen.Height = desult[0] ? doc.clientHeight : screen.height;
        }
    })(ENV);
}
