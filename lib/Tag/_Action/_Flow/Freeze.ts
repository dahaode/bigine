/**
 * 定义移动中止动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Flow/Freeze.ts
 */

/// <reference path="../Action.ts" />

module Tag {
    export class Freeze extends Action {
        /**
         * 获取标签名称。
         */
        gN(): string {
            return 'Enter';
        }

        /**
         * 执行。
         */
        p(runtime: Runtime.IRuntime): Runtime.IRuntime | Thenable<Runtime.IRuntime> {
            return Util.Q.doHalt<Runtime.IRuntime>();
        }
    }
}
