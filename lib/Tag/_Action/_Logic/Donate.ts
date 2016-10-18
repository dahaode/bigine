/**
 * 定义打赏数据动作标签组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Logic/Donate.ts
 */

/// <reference path="../../Idable.ts" />
/// <reference path="../../../Ev/_Runtime/Donate.ts" />

namespace Tag {
    export class Donate extends Idable {
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
            return Promise.resolve(super.p(runtime))
                .then(() => {
                    let amount: number = parseInt(this._p[0], 10) || 0,
                        states: Core.IStates = runtime.gS(),
                        id: string = this.gI(),
                        ktime: string = '_td',
                        td: number = states.g(ktime),
                        tn: number = new Date().getTime(),
                        depth: number = states.g('$d'),
                        yes: () => void = () => states.s('$v' + depth, true).s('$t' + depth, false),
                        no: () => void = () => states.s('$v' + depth, false).s('$t' + depth, false);
                    if (td && states.qp(id, td, true)) {
                        yes();
                        states.d(ktime);
                        return runtime;
                    } else {
                        return new Promise((resolve: (runtime: Core.IRuntime) => void) => {
                            let suc: () => void = () => {
                                    yes();
                                    resolve(runtime);
                                },
                                fail: () => void = () => {
                                    no();
                                    resolve(runtime);
                                };
                            states.s(ktime, tn);
                            runtime.a(this);
                            states.l().then(() => {
                                states.e('pay');
                                runtime.dispatchEvent(new Ev.Donate({
                                    target: states,
                                    amount: amount,
                                    id: id,
                                    suc: suc,
                                    fail: fail
                                }));
                            }).catch(() => {
                                no();
                                resolve(runtime);
                            });
                        });
                    }
                });
        }
    }
}
