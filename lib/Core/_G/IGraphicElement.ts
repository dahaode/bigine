/**
 * 声明画面元素接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_G/IGraphicElement.ts
 */

/// <reference path="IBounds.ts" />
/// <reference path="../../Util/Q.ts" />
/// <reference path="IAnimation.ts" />

namespace Core {
    'use strict';

    export interface IGraphicElement {
        // constructor(x: number, y: number, w: number, h: number, absolute: boolean = false);
        // constructor(bounds: IBounds, absolute: boolean = false);

        /**
         * 获取区域信息。
         */
        gB(): IBounds;

        /**
         * 移动 X 轴座标。
         */
        x(distance: number): IGraphicElement;

        /**
         * 移动 Y 轴座标。
         */
        y(distance: number): IGraphicElement;

        /**
         * 缩放。
         */
        s(ratio: number): IGraphicElement;

        /**
         * 旋转。
         */
        r(degrees: number): IGraphicElement;

        /**
         * 透明度。
         */
        o(value: number): IGraphicElement;

        /**
         * 绘制。
         */
        d(context: CanvasRenderingContext2D): CanvasRenderingContext2D | Thenable<CanvasRenderingContext2D>;

        /**
         * 执行动画。
         */
        p(animation: IAnimation): Promise<IGraphicElement>;
    }
}
