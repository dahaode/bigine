/**
 * 实现抽象动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/Action.ts
 */

/// <reference path="Unknown.ts" />
/// <reference path="../Core/_Tag/IPerformableTag.ts" />

namespace Tag {
    'use strict';

    export class Action extends Unknown implements Core.IPerformableTag {
        /**
         * 获取代号。
         */
        public $i(abstract?: boolean): number {
            return abstract ? -1 : super.$i(abstract);
        }

        /**
         * （执行）检查。
         */
        public t(states: Core.IStates): boolean {
            return false;
        }

        /**
         * 执行。
         */
        public p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime> {
            return runtime;
        }
    }
}
