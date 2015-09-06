/**
 * 定义展示特写动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Director/ShowCG.ts
 */

/// <reference path="../Action.ts" />
/// <reference path="../../_Definition/DefCG.ts" />

module Tag {
    export class ShowCG extends Action {
        /**
         * 使用资源。
         */
        private _mo: Runtime.IResource;

        /**
         * 获取标签名称。
         */
        gN(): string {
            return 'ShowCG';
        }

        /**
         * 绑定（运行时）作品（实体）。
         */
        $b(ep: Runtime.IEpisode): void {
            this._mo = (<DefCG> ep.q(this._p[0], Core.IEpisode.Entity.CG)).o();
        }

        /**
         * 执行。
         */
        p(runtime: Runtime.IRuntime): Runtime.IRuntime | Thenable<Runtime.IRuntime> {
            var states = runtime.gS(),
                key = '_c',
                cg = states.g(key);
            if (cg)
                return Promise.reject<Runtime.IRuntime>(new E(E.ACT_CG_ALREADY_SHOWN, this._l));
            states.s(key, this._c);
            return runtime.gD().showCG(this._mo);
        }
    }
}
