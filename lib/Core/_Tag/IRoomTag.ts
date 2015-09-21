/**
 * 声明房间（定义）标签接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_Tag/IRoomTag.ts
 */

/// <reference path="IMapTag.ts" />
/// <reference path="ISceneHost.ts" />
/// <reference path="../_Runtime/IResource.ts" />

namespace Core {
    'use strict';

    // ITag:gL()
    // ITag:gN()
    // ITag:r()
    // ITag:b()
    // ITag:toString()
    // ITag:toJsrn()
    // ITag:gU()
    // IEntityTag:gI()
    // IEntityTag:gT()
    // ISceneHost:a()
    // ISceneHost:p()
    export interface IRoomTag extends IEntityTag, ISceneHost {
        /**
         * 获取资源。
         */
        o(id?: string): IResource<HTMLImageElement>;

        /**
         * 获取关联地图。
         */
        gM(): IMapTag;
    }
}
