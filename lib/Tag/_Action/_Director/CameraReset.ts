/**
 * 定义复位镜头动画动作标签组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Director/CameraReset.ts
 */

/// <reference path="Camera.ts" />

namespace Tag {
    export class CameraReset extends Camera {
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'CameraReset';
        }

        /**
         * 执行。
         */
        public p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime> {
            var states: Core.IStates = runtime.gS(),
                camera: string = <string> states.g('.z'),
                strArr: Array<string>,
                mx: number,
                my: number;
            if (!camera)   // 当前为非镜头放大状态
                return runtime;
            strArr = camera.split(',');
            if (strArr.length !== 2)
                return runtime;
            mx = parseFloat(strArr[0]);
            my = parseFloat(strArr[1]);
            return runtime.gD().cameraZoom(mx, my, this._ms, -1)
                .then(() => {
                    states.d('.z');
                    states.d('_z');
                    return runtime;
                });
        }
    }
}
