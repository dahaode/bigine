/**
 * 定义停止环境音乐动作标签组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Director/StopESM.ts
 */

/// <reference path="../../Action.ts" />

namespace Tag {
    export class StopESM extends Action {
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'StopESM';
        }

        /**
         * 执行。
         */
        public p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime> {
            runtime.gS().d('_e');
            return runtime.gD().playMusic(Core.IResource.Type.ESM);
        }
    }
}
