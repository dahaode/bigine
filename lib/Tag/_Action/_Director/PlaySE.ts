/**
 * 定义播放音效动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Director/PlaySE.ts
 */

/// <reference path="../Action.ts" />
/// <reference path="../../_Definition/DefSE.ts" />

module Tag {
    export class PlaySE extends Action {
        /**
         * 使用资源。
         */
        private _mo: Runtime.IResource;

        /**
         * 获取标签名称。
         */
        gN(): string {
            return 'PlaySE';
        }

        /**
         * 绑定（运行时）作品（实体）。
         */
        $b(ep: Runtime.IEpisode): void {
            this._mo = (<DefSE> ep.q(this._p[0], Core.IEpisode.Entity.SE)).o();
        }

        /**
         * 执行。
         */
        p(runtime: Runtime.IRuntime): Runtime.IRuntime | Thenable<Runtime.IRuntime> {
            return runtime.gD().playSE(this._mo);
        }
    }
}
