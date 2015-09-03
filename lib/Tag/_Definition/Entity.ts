/**
 * 定义实体（定义）抽象组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Definition/Entity.ts
 */

/// <reference path="../Unknown.ts" />
/// <reference path="IEntity.ts" />

module Tag {
    export class Entity extends Unknown implements IEntity {
        /**
         * 注册（自身实体）至（运行时）作品。
         */
        $r(ep: Runtime.IEpisode): void {
            ep.f(this);
        }

        /**
         * 获取唯一编号。
         */
        gI(): string {
            return this._c;
        }

        /**
         * 获取类型。
         */
        gT(): Core.IEpisode.Entity {
            return Core.IEpisode.Entity.CG;
        }
    }
}
