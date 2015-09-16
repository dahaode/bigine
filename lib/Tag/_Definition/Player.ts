/**
 * 定义主角标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Definition/Player.ts
 */

/// <reference path="../Unknown.ts" />
/// <reference path="_Char/DefChar.ts" />

namespace Tag {
    'use strict';

    export class Player extends Unknown {
        /**
         * 关联对象。
         */
        private _o: DefChar;

        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'Player';
        }

        /**
         * 绑定（运行时）作品（实体）。
         */
        public $b(ep: Core.IEpisode): void {
            this._o = <DefChar> ep.q(this._c, Core.IEpisode.Entity.Chr);
            ep.f(this);
        }

        /**
         * 获取唯一编号。
         */
        public gI(): string {
            return '';
        }

        /**
         * 获取类型。
         */
        public gT(): Core.IEpisode.Entity {
            return Core.IEpisode.Entity.Player;
        }

        /**
         * 获取关联角色。
         */
        public gC(): DefChar {
            if (!this._b)
                throw new E(E.DEF_EPISODE_NOT_BINDED, this._l);
            return this._o;
        }
    }
}
