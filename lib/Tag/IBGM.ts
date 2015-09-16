/**
 * 声明背景音乐（定义）标签接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/IBGM.ts
 */

/// <reference path="IEntity.ts" />
/// <reference path="../Runtime/IResource.ts" />

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
    export interface IBGM extends IEntity {
        /**
         * 获取资源。
         */
        o(): Runtime.IResource;
    }
}
