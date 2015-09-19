/**
 * 声明画面文字接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_G/IGraphicText.ts
 */

/// <reference path="../../Util/Q.ts" />

namespace Core {
    'use strict';

    export interface IGraphicText {
        /**
         * 设置文本内容。
         */
        t(clob: string): IGraphicText;

        /**
         * 设置颜色。
         */
        c(color: string): IGraphicText;

        /**
         * 设置字号。
         */
        f(size: number): IGraphicText;

        /**
         * 设置阴影。
         */
        s(size: number, color?: string): IGraphicText;

        /**
         * 计算绘制宽度。
         */
        m(context: CanvasRenderingContext2D, index?: number): [number, number];

        /**
         * 绘制。
         */
        d(context: CanvasRenderingContext2D, x: number, y: number, index?: number): CanvasRenderingContext2D | Thenable<CanvasRenderingContext2D>;
    }
}
