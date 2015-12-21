/**
 * 定义当数据动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Logic/Assert.ts
 */

/// <reference path="../../Action.ts" />

namespace Tag {
    export class Assert extends Action {
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'Assert';
        }

        /**
         * （执行）检查。
         */
        public t(states: Core.IStates): boolean {
            var real: number | string = this.$v(<string> states.g(this._p[0])),
                expected: number | string = states.g(this._p[1]),
                depth: number = states.g('$d'),
                ret: boolean;
            expected = this.$v(undefined === expected ?
                this._p[1] :
                <string> expected);
            switch (this._p[2] || '等于') {
                case '等于':
                    this._p.splice(2);
                    ret = real == expected;
                    break;
                case '不等于':
                    ret = real != expected;
                    break;
                case '大于':
                    ret = real > expected;
                    break;
                case '不大于':
                    ret = real <= expected;
                    break;
                case '小于':
                    ret = real < expected;
                    break;
                case '不小于':
                    ret = real >= expected;
                    break;
                default:
                    throw new E(E.ACT_ILLEGAL_OP, this._l);
            }
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
