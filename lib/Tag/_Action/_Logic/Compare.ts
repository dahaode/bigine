/**
 * 定义对比数据动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Logic/Compare.ts
 */

/// <reference path="../Action.ts" />

module Tag {
    export class Compare extends Action {
        /**
         * 获取标签名称。
         */
        gN(): string {
            return 'Compare';
        }

        /**
         * （执行）检查。
         */
        t(states: Runtime.IStates): boolean {
            var depth = <string> states.g('$d');
            states.c(this._p[0], '$v' + depth)
                .s('$t' + depth, false);
            return true;
        }

        /**
         * 执行。
         */
        p(runtime: Runtime.IRuntime): Runtime.IRuntime | Thenable<Runtime.IRuntime> {
            this.t(runtime.gS());
            return runtime;
        }
    }
}
