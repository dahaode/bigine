/**
 * 定义循环中止动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Flow/LoopBreak.ts
 */

/// <reference path="../../Action.ts" />

namespace Tag {
    export class LoopBreak extends Action {
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'LoopBreak';
        }

        /**
         * 执行。
         */
        public p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime> {
            return Util.Q.doBreak<Core.IRuntime>();
        }
    }
}
