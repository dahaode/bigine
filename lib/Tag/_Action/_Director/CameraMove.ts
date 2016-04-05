/**
 * 定义移动镜头动画动作标签组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Director/CameraMove.ts
 */

/// <reference path="Camera.ts" />

namespace Tag {
    export class CameraMove extends Camera {
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'CameraMove';
        }

        /**
         * 执行。
         */
        public p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime> {
            var states: Core.IStates = runtime.gS(),
                camera: string = <string> states.g('.z'),
                now: string = this._mx.toString() + ',' + this._my.toString();
            if (!camera || camera == now)   // 当前为非镜头放大状态，或移动前后位置相同
                return runtime;
            return runtime.gD().cameraMove(this._mx, this._my, this._ms)
                .then(() => {
                    states.s('.z', now);
                    states.s('_z', now);
                    return runtime;
                });
        }
    }
}
