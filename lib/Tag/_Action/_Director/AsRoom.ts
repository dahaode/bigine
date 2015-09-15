/**
 * 定义设置房间动作组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Director/AsRoom.ts
 */

/// <reference path="../Action.ts" />
/// <reference path="../../_Definition/_Room/DefRoom.ts" />

module Tag {
    export class AsRoom extends Action {
        /**
         * 使用房间。
         */
        private _mo: DefRoom;

        /**
         * 获取标签名称。
         */
        gN(): string {
            return 'AsRoom';
        }

        /**
         * 绑定（运行时）作品（实体）。
         */
        $b(ep: Runtime.IEpisode): void {
            this._mo = <DefRoom> ep.q(this._p[0], Core.IEpisode.Entity.Room);
        }

        /**
         * 执行。
         */
        p(runtime: Runtime.IRuntime): Runtime.IRuntime | Thenable<Runtime.IRuntime> {
            var states = runtime.gS(),
                kroom = '_rd',
                room = states.g(kroom),
                ktime = '_t',
                time = states.g(ktime),
                director = runtime.gD(),
                map = this._mo.gM();
            if (!time) {
                time = '午';
                states.s(ktime, time);
            }
            if (room == this._p[0])
                return runtime;
            states.s(kroom, this._p[0]);
            states.s('$rd', this._mo);
            return director.asRoom(this._mo.o(time))
                .then(() => director.asMap(map ? map.gP() : {}));
        }

        /**
         * 获取关联房间。
         */
        gR(): DefRoom {
            return this._mo;
        }
    }
}
