/**
 * 定义循环中止动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Flow/LoopBreak.ts
 */

/// <reference path="../Action.ts" />

module Tag {
    export class LoopBreak extends Action {
        /**
         * 获取标签名称。
         */
        gN(): string {
            return 'LoopBreak';
        }

        /**
         * 执行。
         */
        p(runtime: Runtime.IRuntime): Runtime.IRuntime | Thenable<Runtime.IRuntime> {
            return Util.Q.doBreak<Runtime.IRuntime>();
        }
    }
}
