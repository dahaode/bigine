/**
 * 定义那么动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Logic/Then.ts
 */

/// <reference path="Loop.ts" />

namespace Tag {
    export class Then extends Action {
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'Then';
        }

        /**
         * （执行）检查。
         */
        public t(states: Core.IStates): boolean {
            var depth: number = states.g('$d'),
                kt: string = '$t' + depth,
                kv: string = '$v' + depth;
            if (states.g(kt) || !states.g(kv))
                return true;
            states.s(kt, true);
            return Util.every(this._s, (tag: Action) => tag.t(states));
        }

        /**
         * 执行。
         */
        public p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime> {
            var states: Core.IStates = runtime.gS(),
                logger: Core.ILogger = runtime.gL(),
                title: string = 'THEN',
                kd: string = '$d',
                depth: number = states.g(kd),
                kt: string = '$t' + depth,
                kv: string = '$v' + depth,
                kid: string = '.a',
                id: string = states.g(kid);
            if (!id && (states.g(kt) || !states.g(kv)))
                return runtime;
            logger.o(title);
            states.s(kt, true)
                .s(kd, 1 + depth);
            return Util.Q.every(this._s, (action: Action) => {
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
            })['catch']((error?: E) => {
                if (error && E.Signal.HALT == error.signal)
                    logger.c(title);
                throw error;
            }).then(() => {
                states.s(kd, depth);
                logger.c(title);
                return runtime;
            });
        }

        /**
         * 获取关键动作编号列表。
         */
        public gA(): string[] {
            return Loop.prototype.gA.call(this);
        }

        /**
         * 获取使用资源列表。
         */
        public c(): Core.IResource<string | HTMLImageElement>[][] {
            return <Core.IResource<string | HTMLImageElement>[][]> Loop.prototype.c.call(this);
        }
    }
}
