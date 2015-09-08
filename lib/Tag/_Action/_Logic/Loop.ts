/**
 * 定义循环动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Logic/Loop.ts
 */

/// <reference path="../Action.ts" />

module Tag {
    export class Loop extends Action {
        /**
         * 获取标签名称。
         */
        gN(): string {
            return 'Loop';
        }

        /**
         * （执行）检查。
         */
        t(states: Runtime.IStates): boolean {
            return false;
        }

        /**
         * 执行。
         */
        p(runtime: Runtime.IRuntime): Runtime.IRuntime | Thenable<Runtime.IRuntime> {
            var states = runtime.gS(),
                kd = '$d',
                depth = states.g(kd),
                loop = function (): Promise<Runtime.IRuntime> {
                    return Util.Q.every(<Action[]> this._s, (action) => action.p(runtime))
                        .then(loop);
                };
            states.s(kd, 1 + depth);
            return loop()['catch'](Util.Q.ignoreBreak)
                .then(() => {
                    states.s(kd, depth);
                    return runtime;
                });
        }
    }
}
