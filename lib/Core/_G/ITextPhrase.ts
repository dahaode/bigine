/**
 * 声明画面文字接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_G/ITextPhrase.ts
 */

/// <reference path="../../Util/Q.ts" />

namespace Core {
    'use strict';

    export interface ITextPhrase {
        /**
         * 设置文本内容。
         */
        t(clob: string): ITextPhrase;

        /**
         * 设置颜色。
         */
        c(color: string): ITextPhrase;

        /**
         * 设置字号。
         */
        f(size: number): ITextPhrase;

        /**
         * 获取字号。
         */
        gF(): number;

        /**
         * 设置阴影。
         */
        s(size: number, color?: string): ITextPhrase;

        /**
         * 绘制。
         */
        d(context: CanvasRenderingContext2D, x: number, y: number, maxWidth: number, offset?: number, length?: number): [number, number];

        /**
         * 获取长度。
         */
        gL(): number;

        /**
         * 截取。
         */
        a(length: number): ITextPhrase;
    }
}
