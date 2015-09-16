/**
 * 定义设置数据动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Logic/Assign.ts
 */

/// <reference path="../Action.ts" />

namespace Tag {
    'use strict';

    export class Assign extends Action {
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'Assign';
        }

        /**
         * （执行）检查。
         */
        public t(states: Runtime.IStates): boolean {
            var depth: number = states.g('$d');
            states.s(this._p[0], this.$v(this._c))
                .c(this._p[0], '$v' + depth)
                .s('$t' + depth, false);
            return true;
        }

        /**
         * 执行。
         */
        public p(runtime: Runtime.IRuntime): Runtime.IRuntime | Thenable<Runtime.IRuntime> {
            this.t(runtime.gS());
            return runtime;
        }
    }
}
