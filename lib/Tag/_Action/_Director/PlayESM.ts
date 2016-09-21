/**
 * 定义播放环境音乐动作标签组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Director/PlayESM.ts
 */

/// <reference path="../../Action.ts" />
/// <reference path="../../_Definition/DefBGM.ts" />

namespace Tag {
    export class PlayESM extends Action {
        /**
         * 使用音乐。
         */
        private _mo: DefBGM;

        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'PlayESM';
        }

        /**
         * 绑定（运行时）作品（实体）。
         */
        public $b(ep: Core.IEpisode): void {
            this._mo = <DefBGM> ep.q(this._p[0], Core.IEpisode.Entity.BGM, this._l);
        }

        /**
         * 执行。
         */
        public p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime> {
            var states: Core.IStates = runtime.gS(),
                key: string = '_e',
                vol: number = 0.01 * parseInt(this._p[1] || '100', 10),
                esm: Array<string> = states.g(key);
            if (esm && esm[0] == this._p[0])
                return runtime;
            states.s(key, this._p);
            return runtime.gD().playMusic(Core.IResource.Type.ESM, this._mo ? this._mo.o() : undefined, vol);
        }

        /**
         * 获取依赖素材资源列表。
         */
        public $d(): Core.IResource<string>[] {
            return this._mo ? [this._mo.o()] : [];
        }

        /**
         * 获取关联音乐。
         */
        public gB(): DefBGM {
            return this._mo;
        }
    }
}
