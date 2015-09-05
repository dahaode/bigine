/**
 * 声明可检查标签接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/IAssertable.ts
 */

/// <reference path="ITag.ts" />
/// <reference path="../Runtime/IStates.ts" />

module Tag {
    // Core.ITag:gL()
    // Core.ITag:gN()
    // Core.ITag:toString()
    // Core.ITag:toJsrn()
    // ITag:r()
    // ITag:b()
    // ITag:gU()
    export interface IAssertable extends ITag {
        /**
         * 检查。
         */
        t(states: Runtime.IStates): boolean;
    }
}
