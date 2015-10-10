/**
 * 定义旁白动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Text/VoiceOver.ts
 */

/// <reference path="../../Idable.ts" />

namespace Tag {
    export class VoiceOver extends Idable {
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'VoiceOver';
        }

        /**
         * 执行。
         */
        public p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime> {
            return Promise.resolve(super.p(runtime))
                .then(() => runtime.a(this).gD()
                    .words(runtime.gS().t(this._c), 'voiceover')
                );
        }
    }
}
