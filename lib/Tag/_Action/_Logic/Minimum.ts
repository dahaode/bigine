/**
 * 定义最小数据动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Logic/Minimum.ts
 */

/// <reference path="../../Action.ts" />

namespace Tag {
    export class Minimum extends Action {
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'Minimum';
        }

        /**
         * （执行）检查。
         */
        public t(states: Core.IStates): boolean {
            var min: number = 0,
                depth: number = states.g('$d'),
                value: number;
            Util.each(this._s, (tag: Unknown) => {
                value = states.g(tag.$p(0)) - 0 || 0;
                if (value < min)
                    min = value;
            });
            states.s('$v' + depth, min)
                .s('$t' + depth, false);
            if (this._p[0])
                states.s(this._p[0], min);
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
