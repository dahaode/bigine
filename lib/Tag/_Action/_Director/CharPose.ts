/**
 * 定义改变神态动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Director/CharPose.ts
 */

/// <reference path="../../Action.ts" />
/// <reference path="../../_Definition/_Char/DefChar.ts" />

namespace Tag {
    'use strict';

    export class CharPose extends Action {
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
        private _mo: Core.IResource<HTMLImageElement>;

        /**
         * 构造函数。
         */
        constructor(params: string[], content: string, children: Unknown[], lineNo?: number) {
            super(params, content, children, lineNo);
            this._mc = params[0];
            this._ms = content;
        }

        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'CharPose';
        }

        /**
         * 绑定（运行时）作品（实体）。
         */
        public $b(ep: Core.IEpisode): void {
            this._mo = (<DefChar> ep.q(this._mc, Core.IEpisode.Entity.Chr)).o(this._ms);
        }

        /**
         * 执行。
         */
        public p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime> {
            var states: Core.IStates = runtime.gS(),
                kpos: string = '.p' + this._mc,
                pos: Core.IDirector.Position = states.g(kpos);
            if (!pos)
                throw new E(E.ACT_CHAR_NOT_ON, this._l);
            states.s('_s' + pos, this._ms);
            return runtime.gD().charSet(this._mo, pos);
        }
    }
}
