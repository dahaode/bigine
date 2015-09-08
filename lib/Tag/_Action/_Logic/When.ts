/**
 * 定义如果动作组件标签。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Logic/When.ts
 */

/// <reference path="../Action.ts" />

module Tag {
    export class When extends Action {
        /**
         * 获取标签名称。
         */
        gN(): string {
            return 'When';
        }

        /**
         * （执行）检查。
         */
        t(states: Runtime.IStates): boolean {
            var depth = states.g('$d'),
                kt = '$t' + depth,
                kv = '$v' + depth;
            if (states.g(kt) || states.g(kv) != this.$v(this._p[0]))
                return true;
            states.s(kt, true);
            return Util.every(this._s, (tag) => (<Action> tag).t(states));
        }

        /**
         * 执行。
         */
        p(runtime: Runtime.IRuntime): Runtime.IRuntime | Thenable<Runtime.IRuntime> {
            var states = runtime.gS(),
                kd = '$d',
                depth = states.g(kd),
                kt = '$t' + depth,
                kv = '$v' + depth;
            if (states.g(kt) || states.g(kv) != this.$v(this._p[0]))
                return runtime;
            states.s(kt, true)
                .s(kd, 1 + depth);
            return Util.Q.every(this._s, (tag) => (<Action> tag).p(runtime))
                .then(() => {
                    states.s(kd, depth);
                    return runtime;
                });
        }
    }
}
