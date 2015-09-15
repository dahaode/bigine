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

module Tag {
    export class Loop extends Action {
        /**
         * 获取标签名称。
         */
        gN(): string {
            return 'Loop';
        }

        /**
         * （执行）检查。
         */
        t(states: Runtime.IStates): boolean {
            return false;
        }

        /**
         * 执行。
         */
        p(runtime: Runtime.IRuntime): Runtime.IRuntime | Thenable<Runtime.IRuntime> {
            var states = runtime.gS(),
                kd = '$d',
                depth = states.g(kd),
                loop = function (): Promise<Runtime.IRuntime> {
                    return Util.Q.every(<Action[]> this._s, (action) => action.p(runtime))
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
        c(): Runtime.IResource[][] {
            var frame: Runtime.IResource[] = [],
                resources: Runtime.IResource[][] = [];
            Util.each(<Action[]> this._s, (action) => {
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
                    case 'VoiceOver':
                        if (frame.length) {
                            resources.push(frame);
                            frame = [];
                        }
                        break;
                    case 'Loop':
                    case 'Otherwise':
                    case 'Then':
                    case 'When':
                        if (frame.length) {
                            resources.push(frame);
                            frame = [];
                        }
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
