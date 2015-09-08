/**
 * 定义或动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Logic/Or.ts
 */

/// <reference path="../Action.ts" />

module Tag {
    export class Or extends Action {
        /**
         * 获取标签名称。
         */
        gN(): string {
            return 'Or';
        }

        /**
         * （执行）检查。
         */
        t(states: Runtime.IStates): boolean {
            var depth = <string> states.g('$d'),
                ret = Util.some(this._s, (tag) => (<Action> tag).t(states));
            states.s('$v' + depth, ret)
                .s('$t' + depth, false);
            return ret;
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
