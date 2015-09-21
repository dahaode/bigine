/**
 * 声明（地图）交互点标签接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_Tag/IPointTag.ts
 */

/// <reference path="IRoomTag.ts" />
/// <reference path="../_Runtime/IButtonable.ts" />
/// <reference path="../_Runtime/IResource.ts" />

namespace Core {
    'use strict';

    // ITag:gL()
    // ITag:gN()
    // ITag:r()
    // ITag:b()
    // ITag:toString()
    // ITag:toJsrn()
    // ITag:gU()
    // IButtonable:p()
    export interface IPointTag extends ITag, IButtonable {
        /**
         * 获取唯一编号。
         */
        gI(): string;

        /**
         * 获取高亮图资源。
         */
        o(): IResource<HTMLImageElement>;

        /**
         * 获取横轴座标值。
         */
        gX(): number;

        /**
         * 获取纵轴座标值。
         */
        gY(): number;

        /**
         * 获取深轴座标值。
         */
        gZ(): number;

        /**
         * 获取宽度值。
         */
        gW(): number;

        /**
         * 获取高度值。
         */
        gH(): number;

        /**
         * 获取相关房间。
         */
        gR(): IRoomTag;
    }
}
