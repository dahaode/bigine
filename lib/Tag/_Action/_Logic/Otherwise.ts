/**
 * 定义否则动作组件标签。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Logic/Otherwise.ts
 */

/// <reference path="Loop.ts" />

module Tag {
    export class Otherwise extends Action {
        /**
         * 获取标签名称。
         */
        gN(): string {
            return 'Otherwise';
        }

        /**
         * （执行）检查。
         */
        t(states: Runtime.IStates): boolean {
            var key = '$t' + states.g('$d');
            if (states.g(key))
                return true;
            states.s(key, true);
            return Util.every(this._s, (tag) => (<Action> tag).t(states));
        }

        /**
         * 执行。
         */
        p(runtime: Runtime.IRuntime): Runtime.IRuntime | Thenable<Runtime.IRuntime> {
            var states = runtime.gS(),
                kd = '$d',
                depth = states.g(kd),
                kt = '$t' + depth;
            if (states.g(kt))
                return runtime;
            states.s(kt, true)
                .s(kd, 1 + depth);
            return Util.Q.every(this._s, (tag) => (<Action> tag).p(runtime))
                .then(() => {
                    states.s(kd, depth);
                    return runtime;
                });
        }

        /**
         * 获取使用资源列表。
         */
        c(): Runtime.IResource[][] {
            return <Runtime.IResource[][]> Loop.prototype.c.call(this);
        }
    }
}
