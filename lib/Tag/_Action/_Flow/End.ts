/**
 * 定义游戏完结事件动作组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Flow/End.ts
 */

/// <reference path="../Action.ts" />

namespace Tag {
    'use strict';

    export class End extends Action {
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'End';
        }

        /**
         * 执行。
         */
        public p(runtime: Runtime.IRuntime): Runtime.IRuntime | Thenable<Runtime.IRuntime> {
            runtime.gD().ED();
            return Util.Q.doHalt<Runtime.IRuntime>();
        }
    }
}
