/**
 * 声明画面图片元素接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_G/IImageElement.ts
 */

/// <reference path="IGraphicElement.ts" />
/// <reference path="../_Runtime/IResource.ts" />

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
    // IGraphicElement:f()
    export interface IImageElement extends IGraphicElement {
        // constructor(image: IResource<HTMLImageElement>, x?: number, y?: number, w?: number, h?: number, absolute?: boolean);
        // constructor(image: IResource<HTMLImageElement>, bounds?: IBounds, absolute?: boolean);
    }
}
