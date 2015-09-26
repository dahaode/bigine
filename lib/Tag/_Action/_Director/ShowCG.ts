/**
 * 定义展示特写动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Director/ShowCG.ts
 */

/// <reference path="../../Action.ts" />
/// <reference path="../../_Definition/DefCG.ts" />

namespace Tag {
    export class ShowCG extends Action {
        /**
         * 使用特写。
         */
        private _mo: DefCG;

        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'ShowCG';
        }

        /**
         * 绑定（运行时）作品（实体）。
         */
        public $b(ep: Core.IEpisode): void {
            this._mo = (<DefCG> ep.q(this._p[0], Core.IEpisode.Entity.CG));
        }

        /**
         * 执行。
         */
        public p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime> {
            var states: Core.IStates = runtime.gS(),
                key: string = '_c',
                cg: string = states.g(key);
            if (cg)
                throw new E(E.ACT_CG_ALREADY_SHOWN, this._l);
            states.s(key, this._p[0]);
            return runtime.gD().showCG(this._mo.o());
        }

        /**
         * 获取关联特写。
         */
        public gC(): DefCG {
            return this._mo;
        }
    }
}
