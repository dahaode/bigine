/**
 * 声明画面色块元素接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_G/IColorElement.ts
 */

/// <reference path="IGraphicElement.ts" />

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
    export interface IColorElement extends IGraphicElement {
        // constructor(x: number, y: number, w: number, h: number, color: string, absolute?: boolean);
        // constructor(bounds: IBounds, color: string, absolute?: boolean);
    }
}
