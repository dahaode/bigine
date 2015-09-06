/**
 * 声明人物（定义）标签接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/IChar.ts
 */

/// <reference path="IEntity.ts" />
/// <reference path="../Runtime/IResource.ts" />

module Tag {
    export interface IChar extends IEntity {
        /**
         * 获取资源。
         */
        o(id?: string): Runtime.IResource;
    }
}
