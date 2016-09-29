/**
 * 定义清除全屏文本动作标签组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Text/FullClean.ts
 */

/// <reference path="../../Action.ts" />

namespace Tag {
    export class FullClean extends Action {
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'FullClean';
        }

        /**
         * 执行。
         */
        public p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime> {
            let states: Core.IStates = runtime.gS(),
                kdir: string = '_f',
                dir: boolean = states.g(kdir);
            if (!dir)
                return runtime;
            return Promise.resolve(super.p(runtime)).then(() =>
                runtime.gD().fullClean()
            );
        }
    }
}
