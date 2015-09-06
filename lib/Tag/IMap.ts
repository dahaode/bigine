/**
 * 声明地图（定义）标签接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/IMap.ts
 */

/// <reference path="IEntity.ts" />
/// <reference path="IPoint.ts" />

module Tag {
    export interface IMap extends IEntity {
        /**
         * 获取资源。
         */
        o(): Runtime.IResource;

        /**
         * 获取交互点集合。
         */
        gP(): Util.IHashTable<IPoint>;
        gP(id: string): IPoint;
    }
}
