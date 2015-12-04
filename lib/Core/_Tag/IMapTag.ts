/**
 * 声明地图（定义）标签接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_Tag/IMapTag.ts
 */

/// <reference path="IEntityTag.ts" />
/// <reference path="IPointTag.ts" />

namespace Core {
    import Util = __Bigine_Util;

    // ITag:gL()
    // ITag:gN()
    // ITag:r()
    // ITag:b()
    // ITag:toString()
    // ITag:toJsrn()
    // ITag:gU()
    // IEntityTag:gI()
    // IEntityTag:gT()
    export interface IMapTag extends IEntityTag {
        /**
         * 获取资源。
         */
        o(): IResource<HTMLImageElement>;

        /**
         * 获取交互点集合。
         */
        gP(): Util.IHashTable<IPointTag>;
        gP(id: string): IPointTag;
    }
}
