/**
 * 定义游戏失败事件动作组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Flow/Fail.ts
 */

/// <reference path="../Action.ts" />

module Tag {
    export class Fail extends Action {
        /**
         * 获取标签名称。
         */
        gN(): string {
            return 'Fail';
        }

        /**
         * 执行。
         */
        p(runtime: Runtime.IRuntime): Runtime.IRuntime | Thenable<Runtime.IRuntime> {
            runtime.gD().FAIL()
                .then(() => runtime.gE().p(IScene.Type.Fail, runtime));
            return Util.Q.doHalt<Runtime.IRuntime>();
        }
    }
}
