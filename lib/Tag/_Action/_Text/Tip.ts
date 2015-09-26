/**
 * 定义提示动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Text/Tip.ts
 */

/// <reference path="../../Action.ts" />

namespace Tag {
    export class Tip extends Action {
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'Tip';
        }

        /**
         * 执行。
         */
        public p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime> {
            return runtime.gD().words(runtime.gS().t(this._c), 'tip');
        }
    }
}
