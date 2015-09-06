/**
 * 声明房间（定义）标签接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Definition/_Room/IRoom.ts
 */

/// <reference path="../IEntity.ts" />
/// <reference path="../../_Structure/_Scene/ISceneHost.ts" />
/// <reference path="../_Map/IMap.ts" />

module Tag {
    export interface IRoom extends IEntity, ISceneHost {
        /**
         * 获取资源。
         */
        o(id?: string): Runtime.IResource;

        /**
         * 获取关联地图。
         */
        gM(): IMap;
    }
}
