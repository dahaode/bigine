/**
 * 声明（运行时）作品接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 */

/// <reference path="../Core/IEpisode.ts" />
/// <reference path="../Tag/IRoot.ts" />
/// <reference path="../Tag/_Definition/IEntity.ts" />

module Runtime {
    export interface IEpisode extends Core.IEpisode {
        // new (ep: Tag.IRoot): IEpisode;

        /**
         * 注册实体。
         */
        f(tag: Tag.IEntity): IEpisode;

        /**
         * 查询实体。
         */
        q(id: string, type?: Core.IEpisode.Entity): Tag.IEntity;
    }
}
