/**
 * 定义关闭特写动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Director/HideCG.ts
 */

/// <reference path="../Action.ts" />

namespace Tag {
    'use strict';

    export class HideCG extends Action {
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'HideCG';
        }

        /**
         * 执行。
         */
        public p(runtime: Runtime.IRuntime): Runtime.IRuntime | Thenable<Runtime.IRuntime> {
            var states: Runtime.IStates = runtime.gS(),
                key: string = '_c',
                cg: string = states.g(key);
            if (!cg)
                throw new E(E.ACT_CG_NOT_SHOWN, this._l);
            return runtime.gD().hideCG();
        }
    }
}
