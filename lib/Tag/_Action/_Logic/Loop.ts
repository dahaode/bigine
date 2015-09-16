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
/// <reference path="../../_Action/_Director/PlaySE.ts" />
/// <reference path="../../_Action/_Director/ShowCG.ts" />
/// <reference path="../../_Action/_Text/Speak.ts" />

namespace Tag {
    'use strict';

    export class Loop extends Action {
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
                kd: string = '$d',
                depth: number = states.g(kd),
                loop: () => Promise<Core.IRuntime> = function (): Promise<Core.IRuntime> {
                    return Util.Q.every(<Action[]> this._s, (action: Action) => action.p(runtime))
                        .then(loop);
                };
            states.s(kd, 1 + depth);
            return loop()['catch'](Util.Q.ignoreBreak)
                .then(() => {
                    states.s(kd, depth);
                    return runtime;
                });
        }

        /**
         * 获取使用资源列表。
         */
        public c(): Core.IResource[][] {
            var frame: Core.IResource[] = [],
                resources: Core.IResource[][] = [],
                pack: () => void = function(): void {
                    if (frame.length) {
                        resources.push(frame);
                        frame = [];
                    }
                };
            Util.each(this._s, (action: Action) => {
                switch (action.gN()) {
                    case 'AsRoom':
                        frame = frame.concat((<AsRoom> action).gR().d());
                        break;
                    case 'CharOn':
                    case 'CharSet':
                        frame = frame.concat((<CharOn> action).gC().d());
                        break;
                    case 'PlayBGM':
                        frame.push((<PlayBGM> action).gB().o());
                        break;
                    case 'PlaySE':
                        frame.push((<PlaySE> action).gS().o());
                        break;
                    case 'ShowCG':
                        frame.push((<ShowCG> action).gC().o());
                        break;
                    case 'Monolog':
                    case 'Speak':
                        frame.push((<Speak> action).gC().o());
                        pack();
                        break;
                    case 'VoiceOver':
                        pack();
                        break;
                    case 'Loop':
                    case 'Otherwise':
                    case 'Then':
                    case 'When':
                        pack();
                        resources.concat((<Loop> action).c());
                        break;
                }
            });
            if (frame.length)
                resources.push(frame);
            return resources;
        }
    }
}
