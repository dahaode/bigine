/**
 * 定义停止音乐动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Director/StopBGM.ts
 */

/// <reference path="../../Action.ts" />

namespace Tag {
    export class StopBGM extends Action {
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'StopBGM';
        }

        /**
         * 执行。
         */
        public p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime> {
            runtime.gS().d('_b');
            return runtime.gD().playBGM();
        }
    }
}
