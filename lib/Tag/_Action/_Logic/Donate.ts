/**
 * 定义打赏数据动作标签组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Logic/Donate.ts
 */

/// <reference path="../../Action.ts" />
/// <reference path="../../../Ev/_Runtime/Donate.ts" />
/// <reference path="../../../Ev/_Runtime/IDonateMetas.ts" />

namespace Tag {
    export class Donate extends Action {
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'Donate';
        }

        /**
         * 执行。
         */
        public p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime> {
            let amount: number = parseInt(this._p[0], 10) || 0,
                states: Core.IStates = runtime.gS(),
                depth: number = states.g('$d');
            return new Promise((resolve: (runtime: Core.IRuntime) => void) => {
                let suc: () => void = () => {
                        states.s('$v' + depth, true)
                            .s('$t' + depth, false);
                        resolve(runtime);
                    },
                    fail: () => void = () => {
                        states.s('$v' + depth, false)
                            .s('$t' + depth, false);
                        resolve(runtime);
                    };

                runtime.dispatchEvent(new Ev.Donate({
                    target: states,
                    amount: amount,
                    suc: suc,
                    fail: fail
                }));
            });
        }
    }
}
