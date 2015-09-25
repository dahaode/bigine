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
    // IEmittable:addEventListener()
    // IEmittable:removeEventListener()
    // IEmittable:dispatchEvent()
    export interface ISprite extends IGraphicElement, IEmittable {
        // constructor(x: number, y: number, w: number, h: number, absolute: boolean = false);
        // constructor(bounds: IBounds, absolute: boolean = false);

        /**
         * 添加元素。
         */
        a(element: IGraphicElement, before?: string): ISprite;
        a(element: IGraphicElement, before?: IGraphicElement): ISprite;

        /**
         * 删除元素。
         */
        e(element: IGraphicElement): ISprite;

        /**
         * 删除所有元素。
         */
        c(): ISprite;

        /**
         * 根据编号查找元素。
         */
        q(id: string): IGraphicElement[];
    }
}
