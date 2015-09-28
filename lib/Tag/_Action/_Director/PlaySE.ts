/**
 * 定义播放音效动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Director/PlaySE.ts
 */

/// <reference path="../../Action.ts" />
/// <reference path="../../_Definition/DefSE.ts" />

namespace Tag {
    export class PlaySE extends Action {
        /**
         * 使用音效。
         */
        private _mo: DefSE;

        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'PlaySE';
        }

        /**
         * 绑定（运行时）作品（实体）。
         */
        public $b(ep: Core.IEpisode): void {
            this._mo = <DefSE> ep.q(this._p[0], Core.IEpisode.Entity.SE, this._l);
        }

        /**
         * 执行。
         */
        public p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime> {
            return runtime.gD().playSE(this._mo.o());
        }

        /**
         * 获取关联音效。
         */
        public gS(): DefSE {
            return this._mo;
        }
    }
}
