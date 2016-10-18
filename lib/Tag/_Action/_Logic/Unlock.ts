/**
 * 定义购买数据动作标签组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Logic/Unlock.ts
 */

/// <reference path="../../Idable.ts" />
/// <reference path="../../../Ev/_Runtime/PayUnlock.ts" />

namespace Tag {
    export class Unlock extends Idable {
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'Unlock';
        }

        /**
         * 执行。
         */
        public p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime> {
            return Promise.resolve(super.p(runtime))
                .then(() => {
                    let amount: number = parseInt(this._p[0], 10) || 0,
                        states: Core.IStates = runtime.gS(),
                        kal: string = '.al',
                        autoload: boolean = states.g(kal),
                        depth: number = states.g('$d'),
                        id: string = this.gI(),
                        yes: () => void = () => states.s('$v' + depth, true).s('$t' + depth, false),
                        no: () => void = () => states.s('$v' + depth, false).s('$t' + depth, false);
                    if (states.qp(id, amount)) {
                        yes();
                        return runtime;
                    } else {
                        if (autoload) {
                            states.d(kal);
                            no();
                            return runtime;
                        }
                        return new Promise((resolve: (runtime: Core.IRuntime) => void) => {
                            let suc: () => void = () => {
                                    states.ep(id, amount);
                                    yes();
                                    resolve(runtime);
                                },
                                fail: () => void = () => {
                                    no();
                                    resolve(runtime);
                                };
                            runtime.a(this);
                            states.l().then(() => {
                                states.e('pay');
                                runtime.dispatchEvent(new Ev.PayUnlock({
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
