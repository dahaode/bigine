/**
 * 声明画面文字元素接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_G/ITextElement.ts
 */

/// <reference path="IGraphicElement.ts" />
/// <reference path="IGraphicText.ts" />

namespace Core {
    'use strict';

    // IGraphicElement:gB()
    // IGraphicElement:x()
    // IGraphicElement:y()
    // IGraphicElement:s()
    // IGraphicElement:r()
    // IGraphicElement:o()
    // IGraphicElement:d()
    // IGraphicElement:p()
    export interface ITextElement extends IGraphicElement {
        // constructor(x: number, y: number, w: number, h: number, absolute: boolean = false);
        // constructor(bounds: IBounds, absolute: boolean = false);

        /**
         * 添加文字。
         */
        a(text: IGraphicText): ITextElement;

        /**
         * 清空所有已添加文字。
         */
        c(): ITextElement;
    }
}
