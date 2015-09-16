/**
 * 声明（运行时）作品接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Core/IEpisode.ts
 */

/// <reference path="ITag.ts" />

namespace Core {
    'use strict';

    export interface IEpisode {
        /**
         * 注册实体。
         */
        f(tag: ITag): IEpisode;

        /**
         * 查询实体。
         */
        q(id: string, type?: IEpisode.Entity): ITag;
    }

    export namespace IEpisode {
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
            Chr,
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
            Weather,
            /**
             * 主角（特殊类型）。
             */
            Player
        }
    }
}
