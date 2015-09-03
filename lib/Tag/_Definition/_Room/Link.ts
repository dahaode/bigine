/**
 * 定义（房间）使用地图标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Definition/_Room/Link.ts
 */

/// <reference path="../../Unknown.ts" />
/// <reference path="../_Map/DefMap.ts" />

module Tag {
    export class Link extends Unknown {
        /**
         * 关联对象。
         */
        private _o: DefMap;

        /**
         * 获取标签名称。
         */
        gN(): string {
            return SCHEMA.T['Link'];
        }

        /**
         * 绑定（运行时）作品（实体）。
         */
        $b(ep: Runtime.IEpisode): void {
            this._o = <DefMap> ep.q(this._c, Core.IEpisode.Entity.Map);
        }

        /**
         * 获取关联对象。
         */
        o(): DefMap {
            if (!this._b)
                throw new E(E.DEF_EPISODE_NOT_BINDED, this._l);
            return this._o;
        }
    }
}
