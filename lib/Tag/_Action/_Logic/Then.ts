/**
 * 定义那么动作组件标签。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Logic/Then.ts
 */

/// <reference path="Loop.ts" />

namespace Tag {
    'use strict';

    export class Then extends Action {
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'Then';
        }

        /**
         * （执行）检查。
         */
        public t(states: Runtime.IStates): boolean {
            var depth: number = states.g('$d'),
                kt: string = '$t' + depth,
                kv: string = '$v' + depth;
            if (states.g(kt) || !states.g(kv))
                return true;
            states.s(kt, true);
            return Util.every(this._s, (tag: Action) => tag.t(states));
        }

        /**
         * 执行。
         */
        public p(runtime: Runtime.IRuntime): Runtime.IRuntime | Thenable<Runtime.IRuntime> {
            var states: Runtime.IStates = runtime.gS(),
                kd: string = '$d',
                depth: number = states.g(kd),
                kt: string = '$t' + depth,
                kv: string = '$v' + depth;
            if (states.g(kt) || !states.g(kv))
                return runtime;
            states.s(kt, true)
                .s(kd, 1 + depth);
            return Util.Q.every(this._s, (tag: Action) => tag.p(runtime))
                .then(() => {
                    states.s(kd, depth);
                    return runtime;
                });
        }

        /**
         * 获取使用资源列表。
         */
        public c(): Runtime.IResource[][] {
            return <Runtime.IResource[][]> Loop.prototype.c.call(this);
        }
    }
}
