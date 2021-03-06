/**
 * 定义人物出场动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Director/CharOn.ts
 */

/// <reference path="../../Action.ts" />
/// <reference path="../../_Definition/_Char/DefChar.ts" />

namespace Tag {
    export class CharOn extends Action {
        /**
         * 位置。
         */
        private _mp: Core.IDirector.Position;

        /**
         * 人物名称。
         */
        private _mc: string;

        /**
         * 人物神态。
         */
        private _ms: string;

        /**
         * 使用人物。
         */
        private _mo: DefChar;

        /**
         * 构造函数。
         */
        constructor(params: string[], content: string, children: Unknown[], lineNo?: number) {
            super(params, content, children, lineNo);
            var pos: typeof Core.IDirector.Position = Core.IDirector.Position,
                exp: string[] = content.split('，');
            switch (params[0]) {
                case '最左':
                    this._mp = pos.LLeft;
                    break;
                case '左':
                    this._mp = pos.Left;
                    break;
                case '左中':
                    this._mp = pos.CLeft;
                    break;
                case '最右':
                    this._mp = pos.RRight;
                    break;
                case '右':
                    this._mp = pos.Right;
                    break;
                case '右中':
                    this._mp = pos.CRight;
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
        public gN(): string {
            return 'CharOn';
        }

        /**
         * 绑定（运行时）作品（实体）。
         */
        public $b(ep: Core.IEpisode): void {
            this._mo = <DefChar> ep.q(this._mc, Core.IEpisode.Entity.Chr, this._l);
        }

        /**
         * 执行。
         */
        public p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime> {
            var states: Core.IStates = runtime.gS(),
                kpos: string = '.p' + this._mc,
                pos: Core.IDirector.Position = states.g(kpos);
            if (pos)
                throw new E(E.ACT_CHAR_ONSTAGE, this._l);
            states.s(kpos, this._mp);
            states.s('_c' + this._mp, this._mc);
            states.s('_s' + this._mp, this._ms);
            return runtime.gD().charOn(this._mo.o(this._ms), this._mp);
        }

        /**
         * 获取依赖素材资源列表。
         */
        public $d(): Core.IResource<HTMLImageElement>[] {
            return [this._mo.o(this._ms)];
        }

        /**
         * 获取关联人物。
         */
        public gC(): DefChar {
            return this._mo;
        }
    }
}
