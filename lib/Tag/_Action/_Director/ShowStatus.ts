/**
 * 定义显示状态栏动作标签组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Director/ShowStatus.ts
 */

/// <reference path="../../Action.ts" />

namespace Tag {
    export class ShowStatus extends Action {
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'ShowStatus';
        }

        /**
         * 执行。
         */
        public p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime> {
            return runtime.gD().status(true);
        }
    }
}
