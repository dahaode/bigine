/**
 * 定义停止跳跃动作标签组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2017 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Flow/Stop.ts
 */

/// <reference path="../../Action.ts" />

namespace Tag {
    export class Stop extends Action {
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'Stop';
        }

        /**
         * 执行。
         */
        public p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime> {
            let states: Core.IStates = runtime.gS();
            if (!states.g('.lj')) return runtime;
            states.d('.j');
            return runtime;
        }
    }
}
