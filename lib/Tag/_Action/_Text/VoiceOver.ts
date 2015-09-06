/**
 * 定义旁白动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Text/VoiceOver.ts
 */

/// <reference path="../Idable.ts" />

module Tag {
    export class VoiceOver extends Idable {
        /**
         * 获取标签名称。
         */
        gN(): string {
            return 'VoiceOver';
        }

        /**
         * 执行。
         */
        p(runtime: Runtime.IRuntime): Runtime.IRuntime | Thenable<Runtime.IRuntime> {
            return runtime.gD().words(runtime.gS().t(this._c), runtime.gE().t('voiceover'));
        }
    }
}
