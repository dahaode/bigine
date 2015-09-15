/**
 * 声明（运行时）作品接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/IEpisode.ts
 */

/// <reference path="../Core/IEpisode.ts" />
/// <reference path="../Tag/ISceneHost.ts" />
/// <reference path="../Tag/IRoot.ts" />
/// <reference path="../Tag/IEntity.ts" />
/// <reference path="IResource.ts" />

module Runtime {
    // Tag.ISceneHost:a()
    // Tag.ISceneHost:p()
    export interface IEpisode extends Core.IEpisode, Tag.ISceneHost {
        // new (ep: Tag.IRoot, runtime: IRuntime): IEpisode;

        /**
         * 注册实体。
         */
        f(tag: Tag.IEntity): IEpisode;

        /**
         * 查询实体。
         */
        q(id: string, type: Core.IEpisode.Entity): Tag.IEntity;

        /**
         * 注册资源。
         */
        r(uri: string, type: IResource.Type): IResource;

        /**
         * 获取主题信息。
         */
        t(category: string): Util.IHashTable<any>;

        /**
         * 预加载指定资源组。
         *
         * @param resources 一个（作品）事件所包含地所有资源
         */
        c(resources: IResource[][]): Promise<void>;
    }
}
