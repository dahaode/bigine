/**
 * 定义关闭特写动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Director/HideCG.ts
 */

/// <reference path="../Action.ts" />

module Tag {
    export class HideCG extends Action {
        /**
         * 获取标签名称。
         */
        gN(): string {
            return 'HideCG';
        }

        /**
         * 执行。
         */
        p(runtime: Runtime.IRuntime): Runtime.IRuntime | Thenable<Runtime.IRuntime> {
            var states = runtime.gS(),
                key = '_c',
                cg = states.g(key);
            if (!cg)
                return <Util.Q<Runtime.IRuntime>> Util.Q.reject(new E(E.ACT_CG_NOT_SHOWN, this._l));
            return runtime.gD().hideCG();
        }
    }
}
