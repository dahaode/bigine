/**
 * 声明画面按钮元素接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_G/IButton.ts
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
    // IGraphicElement:f()
    // IEmittable:addEventListener()
    // IEmittable:removeEventListener()
    // IEmittable:dispatchEvent()
    // ISprite:a()
    // ISprite:e()
    // ISprite:c()
    // ISprite:q()
    export interface IButton extends ISprite {
        /**
         * 绑定功能。
         */
        b(callback: () => void, hover?: IGraphicElement, defaults?: IGraphicElement): IButton;
    }
}
