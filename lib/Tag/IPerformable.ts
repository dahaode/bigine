/**
 * 声明可执行标签接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 */

/// <reference path="ITag.ts" />
/// <reference path="../Runtime/IRuntime.ts" />
/// <reference path="../Util/_Promise/Q.ts" />

module Tag {
    // ITag:b(), ITag:r()
    export interface IPerformable extends ITag {
        /**
         * 执行。
         */
        p(runtime: Runtime.IRuntime): Util.Q<Runtime.IRuntime>;
    }
}
