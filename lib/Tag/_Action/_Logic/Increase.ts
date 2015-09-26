/**
 * 定义设置数据动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Logic/Increase.ts
 */

/// <reference path="../../Action.ts" />

namespace Tag {
    export class Increase extends Action {
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'Increase';
        }

        /**
         * （执行）检查。
         */
        public t(states: Core.IStates): boolean {
            var value: number = states.g(this._p[0]),
                delta: number = <number> this.$v(this._c),
                depth: number = states.g('$d');
            if ('string' == typeof value)
                throw new E(E.ACT_STATE_NOT_NUMERIC, this._l);
            if ('string' == typeof delta)
                throw new E(E.ACT_DELTA_NOT_NUMERIC, this._l);
            states.s(this._p[0], value + delta)
                .c(this._p[0], '$v' + depth)
                .s('$t' + depth, false);
            return true;
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
