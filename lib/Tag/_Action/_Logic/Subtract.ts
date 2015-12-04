/**
 * 定义数据差值动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Logic/Subtract.ts
 */

/// <reference path="../../Action.ts" />

namespace Tag {
    import Util = __Bigine_Util;

    export class Subtract extends Action {
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'Subtract';
        }

        /**
         * （执行）检查。
         */
        public t(states: Core.IStates): boolean {
            var value: number = states.g(this._p[1]),
                depth: number = states.g('$d');
            Util.each(this._s, (tag: Unknown) => {
                value -= states.g(tag.$p(0)) - 0 || 0;
            });
            states.s(this._p[0], value)
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
