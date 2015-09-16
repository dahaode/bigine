/**
 * 定义进入房间动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Flow/Enter.ts
 */

/// <reference path="../Action.ts" />
/// <reference path="../../_Definition/_Room/DefRoom.ts" />

namespace Tag {
    'use strict';

    export class Enter extends Action {
        /**
         * 使用房间。
         */
        private _mo: DefRoom;

        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'Enter';
        }

        /**
         * 绑定（运行时）作品（实体）。
         */
        public $b(ep: Runtime.IEpisode): void {
            this._mo = <DefRoom> ep.q(this._p[0], Core.IEpisode.Entity.Room);
        }

        /**
         * 执行。
         */
        public p(runtime: Runtime.IRuntime): Runtime.IRuntime | Thenable<Runtime.IRuntime> {
            var states: Runtime.IStates = runtime.gS(),
                kcn: string = '_rc',
                cn: string = states.g(kcn),
                kdn: string = '_rd',
                ktn: string = '_rt',
                kt: string = '_t',
                kco: string = '$rc',
                co: DefRoom = <DefRoom> states.g(kco),
                kdo: string = '$rd',
                kto: string = '$rt',
                director: Runtime.IDirector = runtime.gD();
            if (cn == this._p[0]) // 同房间二次进入，
                return director.lightOff()
                    .then(() => {
                        if (states.a(kcn, kdn)) // 未修改背景直接开灯。
                            return director.lightOn();
                        // 恢复房间默认背景后开灯。
                        states.c(kcn, kdn)
                            .c(kco, kdo);
                        return director.asRoom((<DefRoom> states.g(kdo)).o(states.g(kt)))
                            .then(() => director.lightOn());
                    });
            director.lightOff() // 新建时序流，
                .then(() => { // 播放当前房间离开前事件
                    states.s(ktn, this._p[0])
                        .s(kto, this._mo);
                    if (!cn)
                        return runtime;
                    return co.p(IScene.Type.PreLeave, runtime);
                })
                .then(() => this._mo.p(IScene.Type.PreEnter, runtime)) // 播放关联（目标）房间进入前事件
                .then(() => { // 播放当前房间离开后事件
                    states.d(kcn)
                        .d(kco)
                        .d(kdn)
                        .d(kdo);
                    if (!cn)
                        return runtime;
                    return co.p(IScene.Type.PostLeave, runtime);
                })
                .then(() => { // 播放关联房间（目标）房间进入后事件
                    states.m(kdn, kcn)
                        .m(kdo, kco)
                        .c(kcn, kdn)
                        .c(kco, kdo);
                    return this._mo.p(IScene.Type.PostEnter, runtime);
                });
            return Util.Q.doHalt<Runtime.IRuntime>(); // 中断原有时序流。
        }
    }
}
