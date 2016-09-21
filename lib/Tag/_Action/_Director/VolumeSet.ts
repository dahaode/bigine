/**
 * 定义设置音量动作标签组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Director/VolumeSet.ts
 */

/// <reference path="../../Action.ts" />

namespace Tag {
    export class VolumeSet extends Action {
        /**
         * 音乐类型。
         */
        private _mt: Core.IResource.Type;

        /**
         * 构造函数。
         */
        constructor(params: string[], content: string, children: Unknown[], lineNo?: number) {
            super(params, content, children, lineNo);
            var type: typeof Core.IResource.Type = Core.IResource.Type;
            switch (params[0]) {
                case '音效':
                    this._mt = type.SE;
                    break;
                case '环境':
                    this._mt = type.ESM;
                    break;
                case '音乐':
                case undefined:
                    this._mt = type.BGM;
                    break;
            }
        }
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'VolumeSet';
        }

        /**
         * 执行。
         */
        public p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime> {
            return runtime.gD().volumeSet(this._mt, 0.01 * parseInt(this._p[1], 10) || 1);
        }
    }
}
