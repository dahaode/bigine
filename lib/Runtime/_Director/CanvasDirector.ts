/**
 * 定义基于 HTML Canvas 的（运行时）场效调度器组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/_Director/CanvasDirector.ts
 */

/// <reference path="Director.ts" />

namespace Runtime {
    'use strict';

    export class CanvasDirector extends Director {
        /**
         * DOM 事件绑定对象。
         */
        private _b: HTMLElement;

        /**
         * 画板。
         */
        private _c: HTMLCanvasElement;

        /**
         * 构造函数。
         */
        constructor(runtime: Core.IRuntime) {
            super(runtime);
        }
    }
}
