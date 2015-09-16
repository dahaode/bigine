/**
 * 定义对比数据动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Logic/Compare.ts
 */

/// <reference path="../../Action.ts" />

namespace Tag {
    'use strict';

    export class Compare extends Action {
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'Compare';
        }

        /**
         * （执行）检查。
         */
        public t(states: Core.IStates): boolean {
            var depth: number = states.g('$d');
            states.c(this._p[0], '$v' + depth)
                .s('$t' + depth, false);
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
