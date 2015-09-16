/**
 * 声明房间（定义）标签接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/IRoom.ts
 */

/// <reference path="IEntity.ts" />
/// <reference path="ISceneHost.ts" />
/// <reference path="IMap.ts" />

namespace Tag {
    'use strict';

    // Core.ITag:gL()
    // Core.ITag:gN()
    // Core.ITag:toString()
    // Core.ITag:toJsrn()
    // ITag:r()
    // ITag:b()
    // ITag:gU()
    // IEntity:gI()
    // IEntity:gT()
    // ISceneHost:a()
    // ISceneHost:p()
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
