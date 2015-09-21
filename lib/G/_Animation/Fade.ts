/**
 * 定义透明度渐变动画组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      G/_Animation/Fade.ts
 */

/// <reference path="../Animation.ts" />
/// <reference path="IFadeMetas.ts" />

namespace G {
    'use strict';

    export class Fade extends Animation {
        /**
         * 原始透明度。
         */
        private _mo: number;

        /**
         * 构造函数。
         */
        constructor(duration: number, metas: IFadeMetas) {
            super(duration, metas);
        }

        /**
         * 帧执行。
         */
        protected $p(element: Core.IGraphicElement, elpased: number): void {
            if (!elpased)
                this._mo = element.gO();
            element.o(((<IFadeMetas> this._m).opacity - this._mo) * elpased / this._d + this._mo);
        }
    }
}
