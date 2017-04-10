/**
 * 定义抖动镜头动画动作标签组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Director/CameraShake.ts
 */

/// <reference path="Camera.ts" />

namespace Tag {
    export class CameraShake extends Camera {
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'CameraShake';
        }

        /**
         * 执行。
         */
        public p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime> {
            var offset: number = <any> (this._p[1] || 3) - 0;
            return runtime.gD().cameraShake(this._ms, offset);
        }
    }
}
