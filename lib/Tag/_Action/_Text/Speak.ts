/**
 * 定义对白动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Text/Speak.ts
 */

/// <reference path="../Idable.ts" />
/// <reference path="../../_Definition/_Char/DefChar.ts" />

module Tag {
    export class Speak extends Idable {
        /**
         * 发言者。
         */
        private _mc: DefChar;

        /**
         * 获取标签名称。
         */
        gN(): string {
            return 'Speak';
        }

        /**
         * 绑定（运行时）作品（实体）。
         */
        $b(ep: Runtime.IEpisode): void {
            this._mc = <DefChar> ep.q(this._p[0], Core.IEpisode.Entity.Chr);
        }

        /**
         * 执行。
         */
        p(runtime: Runtime.IRuntime): Util.Q<Runtime.IRuntime> {
            return runtime.gD().words(runtime.gS().t(this._c), runtime.gE().t('speak'), this._p[2] || this._mc.gI(), this._mc.o());
        }
    }
}
