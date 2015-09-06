/**
 * 定义独白动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Text/Monolog.ts
 */

/// <reference path="../Action.ts" />
/// <reference path="../../IIdable.ts" />
/// <reference path="../../_Definition/_Char/DefChar.ts" />

module Tag {
    export class Monolog extends Action implements IIdable {
        /**
         * 唯一编号。
         */
        private _i: string;

        /**
         * 主角。
         */
        private _mc: DefChar;

        /**
         * 构造函数。
         */
        constructor(params: string[], content: string, children: Unknown[], lineNo?: number) {
            super(params, content, children, lineNo);
        }

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
        p(runtime: Runtime.IRuntime): Util.Q<Runtime.IRuntime> {
            return runtime.gD().words(runtime.gS().t(this._c), runtime.gE().t('monolog'), this._mc.gI(), this._mc.o());
        }

        /**
         * 获取编号。
         */
        gI(): string {
            return this._i;
        }

        /**
         * 恢复编号。
         */
        i(id: string): void {
            this._i = id;
        }
    }
}
