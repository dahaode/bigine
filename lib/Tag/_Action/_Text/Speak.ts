/**
 * 定义对白动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Text/Speak.ts
 */

/// <reference path="../../Idable.ts" />
/// <reference path="../../_Definition/_Char/DefChar.ts" />

namespace Tag {
    export class Speak extends Idable {
        /**
         * 发言者。
         */
        private _mc: DefChar;

        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'Speak';
        }

        /**
         * 绑定（运行时）作品（实体）。
         */
        public $b(ep: Core.IEpisode): void {
            this._mc = <DefChar> ep.q(this._p[0], Core.IEpisode.Entity.Chr, this._l);
        }

        /**
         * 执行。
         */
        public p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime> {
            return Promise.resolve(super.p(runtime))
                .then(() => runtime.a(this).gD()
                    .words(runtime.gS().t(this._c), 'speak', this._p[2] || this._mc.gI(), this._mc.o())
                );
        }

        /**
         * 获取依赖素材资源列表。
         */
        public $d(): Core.IResource<HTMLImageElement>[] {
            return [this._mc.o()];
        }

        /**
         * 获取关联人物。
         */
        public gC(): DefChar {
            return this._mc;
        }
    }
}
