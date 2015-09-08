/**
 * 声明（地图）交互点标签接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/IPoint.ts
 */

/// <reference path="IRoom.ts" />
/// <reference path="../Runtime/IButtonable.ts" />

module Tag {
    // Core.ITag:gL()
    // Core.ITag:gN()
    // Core.ITag:toString()
    // Core.ITag:toJsrn()
    // ITag:r()
    // ITag:b()
    // ITag:gU()
    // Runtime.IButtonable.p()
    export interface IPoint extends ITag, Runtime.IButtonable {
        /**
         * 获取唯一编号。
         */
        gI(): string;

        /**
         * 获取高亮图资源。
         */
        o(): Runtime.IResource;

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
        gR(): IRoom;
    }
}
