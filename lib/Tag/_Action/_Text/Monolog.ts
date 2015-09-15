/**
 * 定义独白动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Text/Monolog.ts
 */

/// <reference path="../Idable.ts" />
/// <reference path="../../_Definition/_Char/DefChar.ts" />

module Tag {
    export class Monolog extends Idable {
        /**
         * 主角。
         */
        private _mc: DefChar;

        /**
         * 获取标签名称。
         */
        gN(): string {
            return 'Monolog';
        }

        /**
         * 绑定（运行时）作品（实体）。
         */
        $b(ep: Runtime.IEpisode): void {
            this._mc = <DefChar> ep.q('', Core.IEpisode.Entity.Player);
        }

        /**
         * 执行。
         */
        p(runtime: Runtime.IRuntime): Runtime.IRuntime | Thenable<Runtime.IRuntime> {
            return runtime.gD().words(runtime.gS().t(this._c), runtime.gE().t('monolog'), this._mc.gI(), this._mc.o());
        }

        /**
         * 获取关联人物。
         */
        gC(): DefChar {
            return this._mc;
        }
    }
}
