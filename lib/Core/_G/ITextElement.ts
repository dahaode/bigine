/**
 * 声明画面文字元素接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_G/ITextElement.ts
 */

/// <reference path="IGraphicElement.ts" />
/// <reference path="ITextPhrase.ts" />

namespace Core {
    'use strict';

    // IGraphicElement:gB()
    // IGraphicElement:x()
    // IGraphicElement:y()
    // IGraphicElement:s()
    // IGraphicElement:gS()
    // IGraphicElement:r()
    // IGraphicElement:gR()
    // IGraphicElement:o()
    // IGraphicElement:gO()
    // IGraphicElement:d()
    // IGraphicElement:p()
    // IGraphicElement:i()
    // IGraphicElement:gI()
    export interface ITextElement extends IGraphicElement {
        // constructor(x: number, y: number, w: number, h: number, lineHeight: number, absolute?: boolean);
        // constructor(bounds: IBounds, lineHeight: number, absolute?: boolean);

        /**
         * 添加文字。
         */
        a(text: ITextPhrase): ITextElement;

        /**
         * 获取文字。
         */
        gT(): ITextPhrase[];

        /**
         * 清空所有已添加文字。
         */
        c(): ITextElement;
    }
}
