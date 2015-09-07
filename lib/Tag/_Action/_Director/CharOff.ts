/**
 * 定义人物离场动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Director/CharOff.ts
 */

/// <reference path="../Action.ts" />

module Tag {
    export class CharOff extends Action {
        /**
         * 人物名称。
         */
        private _mc: string;

        /**
         * 构造函数。
         */
        constructor(params: string[], content: string, children: Unknown[], lineNo?: number) {
            super(params, content, children, lineNo);
            this._mc = params[0];
        }

        /**
         * 获取标签名称。
         */
        gN(): string {
            return 'CharOff';
        }

        /**
         * 绑定（运行时）作品（实体）。
         */
        $b(ep: Runtime.IEpisode): void {
            ep.q(this._mc, Core.IEpisode.Entity.Chr);
        }

        /**
         * 执行。
         */
        p(runtime: Runtime.IRuntime): Runtime.IRuntime | Thenable<Runtime.IRuntime> {
            var states = runtime.gS(),
                kpos = '.p' + this._mc,
                pos = <Runtime.IDirector.Position> states.g(kpos);
            if (!pos)
                return Promise.reject<Runtime.IRuntime>(new E(E.ACT_CHAR_NOT_ON, this._l));
            return runtime.gD().charOff(pos)
                .then(() => {
                    states.d(kpos);
                    states.d('_c' + pos);
                    states.d('_s' + pos);
                    return runtime;
                });
        }
    }
}
