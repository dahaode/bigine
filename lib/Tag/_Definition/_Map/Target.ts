/**
 * 定义（地图交互点）对应房间标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Definition/_Map/Target.ts
 */

/// <reference path="../../Unknown.ts" />
/// <reference path="../_Room/DefRoom.ts" />

namespace Tag {
    'use strict';

    export class Target extends Unknown {
        /**
         * 关联对象。
         */
        private _o: DefRoom;

        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'Target';
        }

        /**
         * 绑定（运行时）作品（实体）。
         */
        public $b(ep: Runtime.IEpisode): void {
            this._o = <DefRoom> ep.q(this._c, Core.IEpisode.Entity.Room);
        }

        /**
         * 获取关联对象。
         */
        public gR(): DefRoom {
            if (!this._b)
                throw new E(E.DEF_EPISODE_NOT_BINDED, this._l);
            return this._o;
        }
    }
}
