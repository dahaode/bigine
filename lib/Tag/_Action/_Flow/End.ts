/**
 * 定义游戏完结事件动作组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Flow/End.ts
 */

/// <reference path="../Action.ts" />

module Tag {
    export class End extends Action {
        /**
         * 获取标签名称。
         */
        gN(): string {
            return 'End';
        }

        /**
         * 执行。
         */
        p(runtime: Runtime.IRuntime): Runtime.IRuntime | Thenable<Runtime.IRuntime> {
            return runtime.gD().ED().then(() => runtime.gE().p(IScene.Type.End, runtime)).then(Util.Q.doHalt);
        }
    }
}
