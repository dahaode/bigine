/**
 * 定义否则动作组件标签。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Logic/Otherwise.ts
 */

/// <reference path="Loop.ts" />

namespace Tag {
    'use strict';

    export class Otherwise extends Action {
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'Otherwise';
        }

        /**
         * （执行）检查。
         */
        public t(states: Core.IStates): boolean {
            var key: string = '$t' + states.g('$d');
            if (states.g(key))
                return true;
            states.s(key, true);
            return Util.every(this._s, (tag: Action) => tag.t(states));
        }

        /**
         * 执行。
         */
        public p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime> {
            var states: Core.IStates = runtime.gS(),
                kd: string = '$d',
                depth: number = states.g(kd),
                kt: string = '$t' + depth;
            if (states.g(kt))
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
        public c(): Core.IResource<string | HTMLImageElement>[][] {
            return <Core.IResource<string | HTMLImageElement>[][]> Loop.prototype.c.call(this);
        }
    }
}
