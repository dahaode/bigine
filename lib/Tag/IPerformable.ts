/**
 * 声明可执行标签接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/IPerformable.ts
 */

/// <reference path="ITag.ts" />
/// <reference path="../Runtime/IRuntime.ts" />
/// <reference path="../Util/Q.ts" />

module Tag {
    // Core.ITag:gL()
    // Core.ITag:gN()
    // Core.ITag:toString()
    // Core.ITag:toJsrn()
    // ITag:r()
    // ITag:b()
    // ITag:gU()
    export interface IPerformable extends ITag {
        /**
         * 执行。
         */
        p(runtime: Runtime.IRuntime): Runtime.IRuntime | Thenable<Runtime.IRuntime>;
    }
}
