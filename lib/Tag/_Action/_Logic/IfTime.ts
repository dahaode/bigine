/**
 * 定义当时间动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Logic/IfTime.ts
 */

/// <reference path="../../Action.ts" />

namespace Tag {
    export class IfTime extends Action {
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'IfTime';
        }

        /**
         * （执行）检查。
         */
        public t(states: Core.IStates): boolean {
            var depth: number = states.g('$d'),
                ret: boolean = this._p[0] == states.g('_t');
            states.s('$v' + depth, ret)
                .s('$t' + depth, false);
            return ret;
        }

        /**
         * 执行。
         */
        public p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime> {
            this.t(runtime.gS());
            return runtime;
        }
    }
}
