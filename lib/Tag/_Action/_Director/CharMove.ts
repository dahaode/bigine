/**
 * 定义人物移动动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Director/CharMove.ts
 */

/// <reference path="../../Action.ts" />

namespace Tag {
    export class CharMove extends Action {
        /**
         * 人物名称。
         */
        private _mc: string;

        /**
         * 位置。
         */
        private _mp: Core.IDirector.Position;

        /**
         * 构造函数。
         */
        constructor(params: string[], content: string, children: Unknown[], lineNo?: number) {
            super(params, content, children, lineNo);
            this._mc = params[0];
            var pos: typeof Core.IDirector.Position = Core.IDirector.Position;
            switch (content) {
                case '左':
                    this._mp = pos.Left;
                    break;
                case '右':
                    this._mp = pos.Right;
                    break;
                case '中':
                case undefined:
                    this._mp = pos.Center;
                    break;
                default:
                    throw new E(E.ACT_ILLEGAL_POSITION, lineNo);
            }
        }

        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'CharMove';
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
            if (pos == this._mp)
                return runtime;
            return runtime.gD().charMove(pos, this._mp)
                .then(() => {
                    states.s(kpos, this._mp);
                    states.m('_c' + pos, '_c' + this._mp);
                    states.m('_s' + pos, '_s' + this._mp);
                    return runtime;
                });
        }
    }
}
