/**
 * 定义设置人物动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Director/CharSet.ts
 */

/// <reference path="../Action.ts" />
/// <reference path="../../_Definition/_Char/DefChar.ts" />

module Tag {
    export class CharSet extends Action {
        /**
         * 位置。
         */
        private _mp: Runtime.IDirector.Position;

        /**
         * 人物名称。
         */
        private _mc: string;

        /**
         * 人物神态。
         */
        private _ms: string;

        /**
         * 使用资源。
         */
        private _mo: Runtime.IResource;

        /**
         * 构造函数。
         */
        constructor(params: string[], content: string, children: Unknown[], lineNo?: number) {
            super(params, content, children, lineNo);
            var pos = Runtime.IDirector.Position,
                exp = content.split('，');
            switch (params[0]) {
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
            this._mc = exp[0];
            this._ms = exp[1] || '默认';
        }

        /**
         * 获取标签名称。
         */
        gN(): string {
            return 'CharSet';
        }

        /**
         * 绑定（运行时）作品（实体）。
         */
        $b(ep: Runtime.IEpisode): void {
            this._mo = (<DefChar> ep.q(this._mc, Core.IEpisode.Entity.Chr)).o(this._ms);
        }

        /**
         * 执行。
         */
        p(runtime: Runtime.IRuntime): Runtime.IRuntime | Thenable<Runtime.IRuntime> {
            var states = runtime.gS(),
                kpos = '.p' + this._mc,
                pos: Runtime.IDirector.Position = states.g(kpos);
            if (pos)
                return Util.Q.reject(new E(E.ACT_CHAR_ONSTAGE, this._l));
            states.s(kpos, this._mp);
            states.s('_c' + this._mp, this._mc);
            states.s('_s' + this._mp, this._ms);
            return runtime.gD().charSet(this._mo, this._mp);
        }
    }
}
