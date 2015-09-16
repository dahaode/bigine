/**
 * 定义播放音乐动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Director/PlayBGM.ts
 */

/// <reference path="../Action.ts" />
/// <reference path="../../_Definition/DefBGM.ts" />

namespace Tag {
    'use strict';

    export class PlayBGM extends Action {
        /**
         * 使用音乐。
         */
        private _mo: DefBGM;

        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'PlayBGM';
        }

        /**
         * 绑定（运行时）作品（实体）。
         */
        public $b(ep: Runtime.IEpisode): void {
            this._mo = (<DefBGM> ep.q(this._p[0], Core.IEpisode.Entity.BGM));
        }

        /**
         * 执行。
         */
        public p(runtime: Runtime.IRuntime): Runtime.IRuntime | Thenable<Runtime.IRuntime> {
            var states: Runtime.IStates = runtime.gS(),
                key: string = '_b',
                bgm: string = states.g(key);
            if (bgm == this._p[0])
                return runtime;
            states.s(key, this._p[0]);
            return runtime.gD().playBGM(this._mo.o());
        }

        /**
         * 获取关联音乐。
         */
        public gB(): DefBGM {
            return this._mo;
        }
    }
}
