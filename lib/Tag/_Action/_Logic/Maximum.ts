/**
 * 定义最大数据动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Logic/Maximum.ts
 */

/// <reference path="../../Action.ts" />

namespace Tag {
    import Util = __Bigine_Util;

    export class Maximum extends Action {
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'Maximum';
        }

        /**
         * （执行）检查。
         */
        public t(states: Core.IStates): boolean {
            var max: number = 0,
                depth: number = states.g('$d'),
                value: number;
            Util.each(this._s, (tag: Unknown) => {
                value = states.g(tag.$p(0)) - 0 || 0;
                if (value > max)
                    max = value;
            });
            states.s('$v' + depth, max)
                .s('$t' + depth, false);
            if (this._p[0])
                states.s(this._p[0], max);
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
