/**
 * 定义（作品事件）内容标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Structure/_Scene/Content.ts
 */

/// <reference path="../../_Action/_Logic/Loop.ts" />

namespace Tag {
    export class Content extends Unknown implements Core.IPerformableTag {
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'Content';
        }

        /**
         * 执行。
         */
        public p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime> {
            var director: Core.IDirector = runtime.gD(),
                states: Core.IStates = runtime.gS(),
                kid: string = '.a',
                id: string = states.g(kid);
            states.s('$d', 1);
            return director.c(<Core.IResource<string | HTMLImageElement>[][]> Loop.prototype.c.call(this))
                .then(() => Util.Q.every(this._s, (action: Action) => {
                    if (runtime.gH())
                        return Util.Q.doHalt<Core.IRuntime>();
                    if (id) {
                        if ('gI' in action) {
                            if ((<Speak> action).gI() != id)
                                return runtime;
                            states.d(kid);
                        } else if ('gA' in action) {
                            if (-1 == Util.indexOf((<Loop> action).gA(), id))
                                return runtime;
                        } else
                            return runtime;
                        id = undefined;
                    }
                    return action.p(runtime);
                }));
        }

        /**
         * 获取关键动作编号列表。
         */
        public gA(): string[] {
            return Loop.prototype.gA.call(this);
        }
    }
}
