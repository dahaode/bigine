/**
 * 实现抽象动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/Action.ts
 */

/// <reference path="../Unknown.ts" />
/// <reference path="../IAction.ts" />

namespace Tag {
    'use strict';

    export class Action extends Unknown implements IAction {
        /**
         * 获取代号。
         */
        public $i(abstract?: boolean): number {
            return abstract ? -1 : super.$i(abstract);
        }

        /**
         * （执行）检查。
         */
        public t(states: Runtime.IStates): boolean {
            return false;
        }

        /**
         * 执行。
         */
        public p(runtime: Runtime.IRuntime): Runtime.IRuntime | Thenable<Runtime.IRuntime> {
            return runtime;
        }
    }
}
