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
    import Util = __Bigine_Util;

    export class Content extends Unknown implements Core.IPerformableTag, Core.IBlock {
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
                logger: Util.ILogger = runtime.gL(),
                title: string = 'CONTENT',
                kid: string = '.a',
                kt: string = '_t',
                ks: string = '.j',
                id: string = states.g(kid),
                time: string = states.g(kt),
                actions: Array<string> = ['Monolog', 'Speak', 'VoiceOver', 'Tip', 'CameraSet', 'CameraZoom', 'CameraReset', 'CameraMove', 'CameraShake', 'Weather', 'Pause', 'FullClean', 'ShowCG', 'HideCG'],
                offline: boolean = Bigine.offline;
            logger.o(title);
            states.s('$d', 1);
            return director.c(offline ? [[]] : (<Core.IResource<string | HTMLImageElement>[][]> Loop.prototype.c.call(this, time)))
                .then(() => Util.Q.every(this._s, (action: Action) => {
                    if (runtime.gH())
                        return E.doHalt<Core.IRuntime>();
                    id = states.g(kid);
                    if (id) {
                        if ('gI' in action) {
                            if ((<Idable> action).gI() != id)
                                return runtime;
                            states.d(kid);
                            (<Idable> action).d();
                        } else if ('gA' in action) {
                            if (-1 == Util.indexOf((<Loop> action).gA(), id))
                                return runtime;
                        } else
                            return runtime;
                    }
                    if (states.g(ks) && actions.indexOf(action.gN()) > -1) return runtime;
                    return action.p(runtime);
                }))['catch']((error?: E) => {
                    if (error && E.Signal.HALT == error.signal)
                        logger.c(title);
                    throw error;
                }).then(() => {
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
    }
}
