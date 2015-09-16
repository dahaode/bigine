/**
 * 声明可执行标签接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_Tag/IPerformableTag.ts
 */

/// <reference path="ITag.ts" />
/// <reference path="../_Runtime/IRuntime.ts" />
/// <reference path="../../Util/Q.ts" />

namespace Core {
    'use strict';

    // ITag:gL()
    // ITag:gN()
    // ITag:r()
    // ITag:b()
    // ITag:toString()
    // ITag:toJsrn()
    // ITag:gU()
    export interface IPerformableTag extends ITag {
        /**
         * 执行。
         */
        p(runtime: IRuntime): IRuntime | Thenable<IRuntime>;
    }
}
