/**
 * 声明实体定义标签接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_Tag/IEntityTag.ts
 */

/// <reference path="ITag.ts" />

namespace Core {
    // ITag:gL()
    // ITag:gN()
    // ITag:r()
    // ITag:b()
    // ITag:toString()
    // ITag:toJsrn()
    // ITag:gU()
    export interface IEntityTag extends ITag {
        /**
         * 获取唯一编号。
         */
        gI(): string;

        /**
         * 获取类型。
         */
        gT(): IEpisode.Entity;
    }
}
