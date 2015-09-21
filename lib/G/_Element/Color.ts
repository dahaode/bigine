/**
 * 定义色块画面元素组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      G/_Element/Color.ts
 */

/// <reference path="../Element.ts" />
/// <reference path="../../Core/_G/IColorElement.ts" />

namespace G {
    'use strict';

    export class Color extends Element implements Core.IColorElement {
        /**
         * 颜色值。
         */
        private _d: string;

        /**
         * 构造函数。
         */
        constructor(x: number, y: number, w: number, h: number, color: string, absolute?: boolean);
        constructor(bounds: Core.IBounds, color: string, absolute?: boolean);
        constructor(x: any, y: any, w?: any, h?: any, color?: any, absolute?: boolean) {
            super(x, y, w, h, absolute);
            this._d = 'number' == typeof x ?
                color :
                y;
        }

        /**
         * 绘制。
         */
        public d(context: CanvasRenderingContext2D): CanvasRenderingContext2D | Thenable<CanvasRenderingContext2D> {
            if (this._r)
                context.rotate(this._r * Math.PI / 180);
            if (this._o) {
                context.globalAlpha = this._o;
                var bounds: Core.IBounds = this.gB();
                context.fillStyle = this._d;
                context.fillRect(bounds.x, bounds.y, bounds.w, bounds.h);
            }
            return super.d(context);
        }
    }
}
