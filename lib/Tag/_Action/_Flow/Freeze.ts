/**
 * 定义移动中止动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Flow/Freeze.ts
 */

/// <reference path="../../Action.ts" />

namespace Tag {
    export class Freeze extends Action {
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'Freeze';
        }

        /**
         * 执行。
         */
        public p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime> {
            return Util.Q.doHalt<Core.IRuntime>();
        }
    }
}
