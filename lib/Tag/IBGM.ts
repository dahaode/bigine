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

module Tag {
    export interface IBGM extends IEntity {
        /**
         * 获取资源。
         */
        o(): Runtime.IResource;
    }
}
