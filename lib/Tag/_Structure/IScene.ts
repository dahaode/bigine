/**
 * 声明（作品）事件标签接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 */

/// <reference path="../IIdable.ts" />
/// <reference path="../IPerformable.ts" />

module Tag {
    // ITag:b(), ITag:r(), IIdable:i(), IIdable:gId(), IPerformable:p()
    export interface IScene extends IIdable, IPerformable {
        /**
         * 获取类型。
         */
        gType(): IScene.Type;
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
