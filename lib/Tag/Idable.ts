/**
 * 定义唯一标识标签抽象组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/Idable.ts
 */

/// <reference path="Action.ts" />
/// <reference path="../Core/_Tag/IIdableTag.ts" />

namespace Tag {
    export class Idable extends Action implements Core.IIdableTag {
        /**
         * 唯一编号。
         */
        private _i: string;

        /**
         * 是否（在读档继续时）恢复人物和特写。
         */
        private _d: boolean;

        /**
         * 转化为运行时（Javascript）代码。
         */
        public toJsrn(): string {
            var clob: string = super.toJsrn();
            return clob.substr(0, clob.length - 1) + ',"' + this._i + '")';
        }

        /**
         * 执行。
         */
        public p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime> {
            if (!this._d)
                return runtime;
            var pos: typeof Core.IDirector.Position = Core.IDirector.Position,
                type: typeof Core.IEpisode.Entity = Core.IEpisode.Entity,
                states: Core.IStates = runtime.gS(),
                director: Core.IDirector = runtime.gD(),
                episode: Core.IEpisode = runtime.gE(),
                kid: string = '.c',
                kdata: string = '_c',
                kpose: string = '_s',
                kpos: string = '.p',
                kcmr: string = '.z',
                q: Promise<Core.IRuntime> = Promise.resolve(runtime),
                kroom: string = states.g('_rd'),
                kdo: string = '$rd',
                kcamera: string = '_z',
                camera: string = states.g(kcamera),
                bgm: string = states.g('_b'),
                cg: string = states.g(kid),
                cur: string = states.g('_ra'),
                exp: string = states.g('_rb'),
                ll: Core.IDirector.Position = pos.LLeft,
                llChar: string = states.g(kid + ll),
                l: Core.IDirector.Position = pos.Left,
                lChar: string = states.g(kid + l),
                cl: Core.IDirector.Position = pos.CLeft,
                clChar: string = states.g(kid + cl),
                c: Core.IDirector.Position = pos.Center,
                cChar: string = states.g(kid + c),
                cr: Core.IDirector.Position = pos.CRight,
                crChar: string = states.g(kid + cr),
                r: Core.IDirector.Position = pos.Right,
                rChar: string = states.g(kid + r),
                rr: Core.IDirector.Position = pos.RRight,
                rrChar: string = states.g(kid + rr),
                ctype: Core.IEpisode.Entity = type.Chr,
                room: DefRoom;
            if (bgm)
                q = q.then(() => {
                    var defbgm: DefBGM = <DefBGM> episode.q(bgm, type.BGM);
                    return director.playBGM(defbgm ? defbgm.o() : undefined);
                });
            if (cur)
                q = q.then(() =>
                    director.curtain(cur)
                );
            if (exp)
                q = q.then(() =>
                    director.expression(exp)
                );
            if (kroom && !states.g(kdo))
                q = q.then(() => {
                    states.s(kdo, room = <DefRoom> episode.q(kroom, type.Room));
                    return director.asRoom(room.o(states.g('_t')), false, room.gM() ? true : false)
                        .then(() => {  // 设置镜头状态
                            if (!camera)
                                return runtime;
                            var strArr: Array<string> = camera.split(','),
                                mx: number = parseFloat(strArr[0]),
                                my: number = parseFloat(strArr[1]);
                            states.s(kcmr, camera);
                            return director.cameraZoom(mx, my, 20, 1);
                        })
                        .then(() => room.gM() ? director.asMap(room.gM().gP()) : runtime);
                });
            if (cg)
                q = q.then(() => {
                    states.m(kid, kdata);
                    var defcg: Core.IEntityTag = episode.q(cg, type.CG),
                        rescg: Core.IResource<HTMLImageElement> = defcg ? (<DefCG> defcg).o() : undefined;
                    return director.setCG(rescg);
                });
            if (llChar)
                q = q.then(() => {
                    states.m(kid + ll, kdata + ll)
                        .s(kpos + llChar, ll);
                    return director.charSet((<DefChar> episode.q(llChar, ctype)).o(states.g(kpose + ll)), ll);
                });
            if (lChar)
                q = q.then(() => {
                    states.m(kid + l, kdata + l)
                        .s(kpos + lChar, l);
                    return director.charSet((<DefChar> episode.q(lChar, ctype)).o(states.g(kpose + l)), l);
                });
            if (clChar)
                q = q.then(() => {
                    states.m(kid + cl, kdata + cl)
                        .s(kpos + clChar, cl);
                    return director.charSet((<DefChar> episode.q(clChar, ctype)).o(states.g(kpose + cl)), cl);
                });
            if (cChar)
                q = q.then(() => {
                    states.m(kid + c, kdata + c)
                        .s(kpos + cChar, c);
                    return director.charSet((<DefChar> episode.q(cChar, ctype)).o(states.g(kpose + c)), c);
                });
            if (crChar)
                q = q.then(() => {
                    states.m(kid + cr, kdata + cr)
                        .s(kpos + crChar, cr);
                    return director.charSet((<DefChar> episode.q(crChar, ctype)).o(states.g(kpose + cr)), cr);
                });
            if (rChar)
                q = q.then(() => {
                    states.m(kid + r, kdata + r)
                        .s(kpos + rChar, r);
                    return director.charSet((<DefChar> episode.q(rChar, ctype)).o(states.g(kpose + r)), r);
                });
            if (rrChar)
                q = q.then(() => {
                    states.m(kid + rr, kdata + rr)
                        .s(kpos + rrChar, rr);
                    return director.charSet((<DefChar> episode.q(rrChar, ctype)).o(states.g(kpose + rr)), rr);
                });
            return q;
        }

        /**
         * 获取编号。
         */
        public gI(): string {
            return this._i;
        }

        /**
         * 恢复编号。
         */
        public i(id: string): void {
            this._i = id;
        }

        /**
         * 恢复人物和特写。
         */
        public d(): Idable {
            this._d = true;
            return this;
        }
    }
}
