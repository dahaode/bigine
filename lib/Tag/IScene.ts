/**
 * 声明（作品）事件标签接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/IScene.ts
 */

/// <reference path="IIdable.ts" />
/// <reference path="IPerformable.ts" />

module Tag {
    // Core.ITag:gL()
    // Core.ITag:gN()
    // Core.ITag:toString()
    // Core.ITag:toJsrn()
    // ITag:r()
    // ITag:b()
    // ITag:gU()
    // IIdable:gI()
    // IIdable:i()
    // IPerformable:p()
    export interface IScene extends IIdable, IPerformable {
        /**
         * 获取类型。
         */
        gT(): IScene.Type;
    }

    export module IScene {
        /**
         * 类型。
         */
        export enum Type {
            /**
             * 开始时。
             */
            Start,
            /**
             * 失败时。
             */
            Fail,
            /**
             * 完结时。
             */
            End,
            /**
             * 离开房间前。
             */
            PreLeave,
            /**
             * 进入房间前。
             */
            PreEnter,
            /**
             * 离开房间后。
             */
            PostLeave,
            /**
             * 进入房间后。
             */
            PostEnter
        };
    }
}
