/**
 * 声明动作标签接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/IAction.ts
 */

/// <reference path="../IAssertable.ts" />
/// <reference path="../IPerformable.ts" />

module Tag {
    // Core.ITag:gL()
    // Core.ITag:gN()
    // Core.ITag:toString()
    // Core.ITag:toJsrn()
    // ITag:r()
    // ITag:b()
    // ITag:gU()
    // IAssertable:t()
    // IPerformable:p()
    export interface IAction extends IAssertable, IPerformable {
    }

    export module IAction {
        /**
         * 位置。
         */
        export enum Position {
            /**
             * 左。
             */
            Left,
            /**
             * 中。
             */
            Center,
            /**
             * 右。
             */
            Right
        }
    }
}
