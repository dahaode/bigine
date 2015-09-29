/**
 * 声明（运行时）作品接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_Runtime/IEpisode.ts
 */

/// <reference path="../_Tag/ISceneHost.ts" />
/// <reference path="IRuntime.ts" />
/// <reference path="../_Tag/IEntityTag.ts" />
/// <reference path="IResource.ts" />

namespace Core {
    // ISceneHost:a()
    // ISceneHost:p()
    export interface IEpisode extends ISceneHost {
        // new (ep: Tag.IRoot, runtime: IRuntime): IEpisode;

        /**
         * 注册实体。
         */
        f(tag: IEntityTag): IEpisode;

        /**
         * 查询实体。
         */
        q(id: string, type?: IEpisode.Entity, lineNo?: number): IEntityTag;

        /**
         * 注册资源。
         */
        r(uri: string, type: IResource.Type): IResource<string | HTMLImageElement>;

        /**
         * 获取素材包名称。
         */
        gS(): string;

        /**
         * 获取主题名称。
         */
        gT(): string;
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
