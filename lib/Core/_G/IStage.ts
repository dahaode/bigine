/**
 * 声明全画面舞台接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_G/IStage.ts
 */

/// <reference path="ISprite.ts" />

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
    // ISprite:a()
    // ISprite:i()
    // ISprite:e()
    export interface IStage extends ISprite {
        // constructor(context: CanvasRenderingContext2D);

        d(): Promise<CanvasRenderingContext2D>;

        /**
         * 绑定视图。
         */
        b(viewport: HTMLElement): IStage;
    }
}
