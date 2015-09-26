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
    export interface IGraphicElement {
        // constructor(x: number, y: number, w: number, h: number, absolute?: boolean);
        // constructor(bounds: IBounds, absolute?: boolean);

        /**
         * 获取区域信息。
         */
        gB(): IBounds;

        /**
         * 移动 X 轴座标。
         */
        x(value: number): IGraphicElement;

        /**
         * 移动 Y 轴座标。
         */
        y(value: number): IGraphicElement;

        /**
         * 缩放。
         */
        s(ratio: number): IGraphicElement;

        /**
         * 获取缩放系数。
         */
        gS(): number;

        /**
         * 旋转。
         */
        r(degrees: number): IGraphicElement;

        /**
         * 获取旋转度数。
         */
        gR(): number;

        /**
         * 透明度。
         */
        o(value: number): IGraphicElement;

        /**
         * 获取透明度。
         */
        gO(): number;

        /**
         * 绘制。
         */
        d(context: CanvasRenderingContext2D): CanvasRenderingContext2D | Thenable<CanvasRenderingContext2D>;

        /**
         * 执行动画。
         */
        p(animation: IAnimation): Promise<IGraphicElement>;

        /**
         * 设置编号。
         */
        i(id: string): IGraphicElement;

        /**
         * 获取编号。
         */
        gI(): string;

        /**
         * 发生变更。
         */
        f(): IGraphicElement;
    }
}
