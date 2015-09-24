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
    // IGraphicElement:gS()
    // IGraphicElement:r()
    // IGraphicElement:gR()
    // IGraphicElement:o()
    // IGraphicElement:gO()
    // IGraphicElement:d()
    // IGraphicElement:p()
    // IGraphicElement:i()
    // IGraphicElement:gI()
    // IEmittable:addEventListener()
    // IEmittable:removeEventListener()
    // IEmittable:dispatchEvent()
    // ISprite:a()
    // ISprite:e()
    // ISprite:q()
    export interface IStage extends ISprite {
        // constructor(context: CanvasRenderingContext2D);

        /**
         * 计算缩放比例。
         */
        z(): IStage;

        /**
         * 绘制。
         */
        d(): Promise<CanvasRenderingContext2D>;

        /**
         * 绑定视图。
         */
        b(viewport: HTMLElement): IStage;
    }
}
