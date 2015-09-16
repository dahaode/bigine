/**
 * 声明（作品）事件标签接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_Tag/ISceneTag.ts
 */

/// <reference path="IIdableTag.ts" />
/// <reference path="IPerformableTag.ts" />

namespace Core {
    'use strict';

    // ITag:gL()
    // ITag:gN()
    // ITag:r()
    // ITag:b()
    // ITag:toString()
    // ITag:toJsrn()
    // ITag:gU()
    // IIdableTag:gI()
    // IIdableTag:i()
    // IPerformableTag:p()
    export interface ISceneTag extends IIdableTag, IPerformableTag {
        /**
         * 获取类型。
         */
        gT(): ISceneTag.Type;
    }

    export namespace ISceneTag {
        /**
         * 类型。
         */
        export enum Type {
            /**
             * 开始时。
             */
            Begin,
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
