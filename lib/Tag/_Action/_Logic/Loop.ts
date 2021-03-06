/**
 * 定义循环动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Logic/Loop.ts
 */

/// <reference path="../../_Action/_Director/AsRoom.ts" />
/// <reference path="../../_Action/_Director/CharOn.ts" />
/// <reference path="../../_Action/_Director/PlayBGM.ts" />
/// <reference path="../../_Action/_Director/PlayESM.ts" />
/// <reference path="../../_Action/_Director/PlaySE.ts" />
/// <reference path="../../_Action/_Director/ShowCG.ts" />
/// <reference path="../../_Action/_Text/Speak.ts" />
/// <reference path="../../../Core/_Tag/IBlock.ts" />

namespace Tag {
    import Util = __Bigine_Util;

    export class Loop extends Action implements Core.IBlock {
        /**
         * 记录设置房间。
         */
        private _room: DefRoom;

        /**
         * 记录设置时间。
         */
        private _time: string;

        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'Loop';
        }

        /**
         * （执行）检查。
         */
        public t(states: Core.IStates): boolean {
            return false;
        }

        /**
         * 执行。
         */
        public p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime> {
            var states: Core.IStates = runtime.gS(),
                logger: Util.ILogger = runtime.gL(),
                title: string = 'LOOP',
                kd: string = '$d',
                depth: number = states.g(kd),
                kid: string = '.a',
                ks: string = '.j',
                actions: Util.IHashTable<any> = {'Monolog': 1, 'Speak': 1, 'VoiceOver': 1, 'Tip': 1},
                id: string,
                loop: () => Promise<Core.IRuntime> = () => {
                    return Util.Q.every(<Action[]> this._s, (action: Action) => {
                        if (runtime.gH())
                            return E.doBreak<Core.IRuntime>();
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
                        if (states.g(ks) && action.gN() in actions) return runtime;
                        return action.p(runtime);
                    }).then(loop);
                };
            logger.o(title);
            states.s(kd, 1 + depth);
            return loop()['catch'](E.ignoreBreak)
                ['catch']((error?: E) => {
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
            var ids: string[] = [];
            Util.each(this._s, (action: Action) => {
                switch (action.gN()) {
                    case 'Monolog':
                    case 'Speak':
                    case 'VoiceOver':
                    case 'Tip':
                    case 'Unlock':
                    case 'Donate':
                        ids.push((<Speak> action).gI());
                        break;
                    case 'Loop':
                    case 'Otherwise':
                    case 'Then':
                    case 'When':
                    case 'WhenVar':
                        ids = ids.concat((<Loop> action).gA());
                        break;
                }
            });
            return ids;
        }

        /**
         * 获取使用资源列表。
         */
        public c(time?: string): Core.IResource<string | HTMLImageElement>[][] {
            var frame: Core.IResource<string | HTMLImageElement>[] = [],
                resources: Core.IResource<string | HTMLImageElement>[][] = [],
                pack: () => void = () => {
                    if (frame.length) {
                        resources.push(frame);
                        frame = [];
                    }
                };
            this._time = time;
            Util.each(this._s, (action: Action) => {
                switch (action.gN()) {
                    case 'AsTime':
                        frame = frame.concat((<AsTime> action).$d(this._room, this._time));
                        this._time = (<AsTime> action).gT();
                        break;
                    case 'AsRoom':
                        frame = frame.concat((<AsRoom> action).$d(this._time));
                        this._room = (<AsRoom> action).gR();
                        break;
                    case 'CharOn':
                    case 'CharPose':
                    case 'CharSet':
                    case 'PlayBGM':
                    case 'PlayESM':
                    case 'PlaySE':
                    case 'ShowCG':
                        frame = frame.concat(action.$d());
                        break;
                    case 'Monolog':
                    case 'Speak':
                        frame = frame.concat(action.$d());
                        pack();
                        break;
                    case 'VoiceOver':
                        pack();
                        break;
                    case 'Loop':
                    case 'Otherwise':
                    case 'Then':
                    case 'When':
                    case 'WhenVar':
                        pack();
                        resources = resources.concat((<Loop> action).c());
                        break;
                }
            });
            if (frame.length)
                resources.push(frame);
            return resources;
        }
    }
}
