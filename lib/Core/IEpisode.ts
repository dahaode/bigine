/**
 * 声明（运行时）作品接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Core/IEpisode.ts
 */

/// <reference path="_Event/IEmittable.ts" />
/// <reference path="ITag.ts" />

module Core {
    // IEmittable:addEventListener()
    // IEmittable:removeEventListener()
    // IEmittable:dispatchEvent()
    export interface IEpisode extends IEmittable {
        /**
         * 注册实体。
         */
        f(tag: ITag): IEpisode;

        /**
         * 查询实体。
         */
        q(id: string, type?: IEpisode.Entity): ITag;
    }

    export module IEpisode {
        /**
         * 实体类型。
         */
        export enum Entity {
            /**
             * 房间。
             */
            Room,
            /**
             * 角色。
             */
            Char,
            /**
             * 背景音乐。
             */
            BGM,
            /**
             * 音效。
             */
            SE,
            /**
             * 特写。
             */
            CG,
            /**
             * 地图。
             */
            Map,
            /**
             * 天气。
             */
            Weather
        }
    }
}
