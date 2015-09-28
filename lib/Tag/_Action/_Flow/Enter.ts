/**
 * 定义进入房间动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Flow/Enter.ts
 */

/// <reference path="../../Action.ts" />
/// <reference path="../../_Definition/_Room/DefRoom.ts" />

namespace Tag {
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
        public $b(ep: Core.IEpisode): void {
            this._mo = <DefRoom> ep.q(this._p[0], Core.IEpisode.Entity.Room, this._l);
        }

        /**
         * 执行。
         */
        public p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime> {
            var states: Core.IStates = runtime.gS(),
                kcn: string = '_rc',
                cn: string = states.g(kcn),
                kdn: string = '_rd',
                ktn: string = '_rt',
                kt: string = '_t',
                kco: string = '$rc',
                co: DefRoom = <DefRoom> states.g(kco),
                kdo: string = '$rd',
                kto: string = '$rt',
                director: Core.IDirector = runtime.gD(),
                type: typeof Core.ISceneTag.Type = Core.ISceneTag.Type;
            if (cn == this._p[0]) // 同房间二次进入，
                return director.lightOff()
                    .then(() => director.reset())
                    .then(() => {
                        if (states.a(kcn, kdn)) // 未修改背景直接开灯。
                            return director.lightOn();
                        // 恢复房间默认背景后开灯。
                        states.c(kcn, kdn)
                            .c(kco, kdo);
                        return director.asRoom((<DefRoom> states.g(kdo)).o(states.g(kt)))
                            .then(() => director.lightOn());
                    });
            runtime.t(Promise.resolve() // 新建时序流，
                .then(() => { // 播放当前房间离开前事件
                    states.s(ktn, this._p[0])
                        .s(kto, this._mo);
                    if (!cn)
                        return runtime;
                    return co.p(type.PreLeave, runtime);
                })
                .then(() => this._mo.p(type.PreEnter, runtime)) // 播放关联（目标）房间进入前事件
                .then(() => director.lightOff())
                .then(() => { // 播放当前房间离开后事件
                    states.d(kcn)
                        .d(kco)
                        .d(kdn)
                        .d(kdo);
                    if (!cn)
                        return runtime;
                    return co.p(type.PostLeave, runtime);
                })
                .then(() => { // 播放关联房间（目标）房间进入后事件
                    if (runtime.gH())
                        return Util.Q.doHalt<Core.IRuntime>();
                    states.m(ktn, kcn)
                        .m(kto, kco)
                        .c(kcn, kdn)
                        .c(kco, kdo);
                    director.c([this._mo.d()]);
                    var map: DefMap = this._mo.gM();
                    return director.lightOff()
                        .then(() => director.reset())
                        .then(() => director.asRoom(this._mo.o(states.g(kt))))
                        .then(() => director.asMap(map ? map.gP() : {}))
                        .then(() => this._mo.p(type.PostEnter, runtime));
                })
            );
            return Util.Q.doHalt<Core.IRuntime>(); // 中断原有时序流。
        }
    }
}
