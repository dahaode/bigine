/**
 * 定义放大镜头动画动作标签组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Director/CameraZoom.ts
 */

/// <reference path="Camera.ts" />

namespace Tag {
    export class CameraZoom extends Camera {
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'CameraZoom';
        }

        /**
         * 执行。
         */
        public p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime> {
            var states: Core.IStates = runtime.gS(),
                camera: string = <string> states.g('.z'),
                now: string = this._mx.toString() + ',' + this._my.toString();
            if (camera)   // 已经是放大状态
                return runtime;
            return runtime.gD().cameraZoom(this._mx, this._my, this._ms, 1)
                .then(() => {
                    states.s('.z', now);
                    states.s('_z', now);
                    return runtime;
                });
        }
    }
}
