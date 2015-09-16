/**
 * 定义设置时间动作标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/_Director/AsTime.ts
 */

/// <reference path="../../Action.ts" />
/// <reference path="../../_Definition/_Room/DefRoom.ts" />

namespace Tag {
    'use strict';

    export class AsTime extends Action {
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'AsTime';
        }

        /**
         * 执行。
         */
        public p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime> {
            var states: Core.IStates = runtime.gS(),
                ktime: string = '_t',
                time: string = states.g(ktime),
                room: DefRoom = <DefRoom> states.g('$rd');
            if (time == this._p[0] || !room)
                return runtime;
            states.s(ktime, this._p[0]);
            return runtime.gD().asRoom(room.o(this._p[0]));
        }

        /**
         * 获取时间。
         */
        public gT(): string {
            return this._p[0];
        }
    }
}
