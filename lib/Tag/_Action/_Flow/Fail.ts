/**
 * 定义游戏失败事件动作组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Flow/Fail.ts
 */

/// <reference path="../../Action.ts" />

namespace Tag {
    export class Fail extends Action {
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'Fail';
        }

        /**
         * 执行。
         */
        public p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime> {
            // runtime.gS().d('_rc')
            //     .d('_rd')
            //     .d('$rc')
            //     .d('$rd');
            runtime.t(() => runtime.gD().FAIL()
                .then(() => runtime.gE().p(Core.ISceneTag.Type.Fail, runtime))
            );
            return E.doHalt<Core.IRuntime>();
        }
    }
}
