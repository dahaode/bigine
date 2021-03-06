/**
 * 定义人物离场动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Director/CharOff.ts
 */

/// <reference path="../../Action.ts" />

namespace Tag {
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
        public gN(): string {
            return 'CharOff';
        }

        /**
         * 绑定（运行时）作品（实体）。
         */
        public $b(ep: Core.IEpisode): void {
            ep.q(this._mc, Core.IEpisode.Entity.Chr, this._l);
        }

        /**
         * 执行。
         */
        public p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime> {
            var states: Core.IStates = runtime.gS(),
                kpos: string = '.p' + this._mc,
                pos: Core.IDirector.Position = <Core.IDirector.Position> states.g(kpos);
            if (!pos)
                throw new E(E.ACT_CHAR_NOT_ON, this._l);
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
