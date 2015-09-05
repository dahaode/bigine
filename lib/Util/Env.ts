/**
 * 定义环境信息探测组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Util/Env.ts
 */

/// <reference path="node.d.ts" />

module Util {
    export var Env = {
        /**
         * 是否存在 Window 对象。
         */
        Window: 'undefined' !== typeof window,
        /**
         * 是否为 NodeJS 环境。
         */
        Node: {
            JS: !!(process && process.version && process.arch),
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
        Mobile: false
    };
    ((env: typeof Env) => {
        if (env.Node.JS)
            env.Node.Webkit = !!(('node-webkit' in process.versions) || ('atom-shell' in process.versions) || ('electron' in process.versions));
        var detect = function (): boolean {
            var ua = navigator.userAgent.toLowerCase(),
                pick = function(pattern: RegExp): string {
                        var match = ua.match(pattern);
                        return (match && 1 < match.length) ? match[1] : '';
                    },
                ios = pick(/(ipod|iphone|ipad)/),
                android = /android/.test(ua) && !/like android/.test(ua),
                tablet = /tablet/.test(ua),
                mobile = !tablet && /[^-]mobi/.test(ua),
                osver = 0;
            if (android)
                osver = parseInt(pick(/android[ \/-](\d+(\.\d+)*)/));
            if ('ipad' == ios || (android && (3 == osver || (4 == osver && !mobile))) || /silk/.test(ua))
                tablet = true;
            else if ('ipod' == ios || 'iphone' == ios || android || /blackberry|\bbb\d+/.test(ua) || /rim\stablet/.test(ua) || /(web|hpw)os/.test(ua) || /bada/i.test(ua))
                mobile = true;
            return tablet || mobile;
        }
        if (env.Window) {
            env.Screen.Width = screen.width;
            env.Screen.Height = screen.height;
            if ('https:' == location.protocol)
                env.Protocol = 'https:';
            env.Canvas = 'CanvasRenderingContext2D' in window;
            env.Mobile = detect();
        }
    })(Env);
}
