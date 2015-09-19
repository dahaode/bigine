/**
 * 声明画面组合元素接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_G/ISprite.ts
 */

/// <reference path="IGraphicElement.ts" />
/// <reference path="../_Event/IEmittable.ts" />

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
    // IEmittable:addEventListener()
    // IEmittable:removeEventListener()
    // IEmittable:dispatchEvent()
    export interface ISprite extends IGraphicElement, IEmittable {
        // constructor(x: number, y: number, w: number, h: number, absolute: boolean = false);
        // constructor(bounds: IBounds, absolute: boolean = false);

        /**
         * 追加元素。
         */
        a(element: IGraphicElement): ISprite;

        /**
         * 插入元素。
         */
        i(element: IGraphicElement, before: IGraphicElement): ISprite;

        /**
         * 删除元素。
         */
        e(element: IGraphicElement): ISprite;
    }
}
