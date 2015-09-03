/**
 * 声明实体定义标签接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Definition/IEntity.ts
 */

/// <reference path="../ITag.ts" />

module Tag {
    // Core.ITag:gL()
    // Core.ITag:gN()
    // Core.ITag:gC()
    // Core.ITag:toString()
    // Core.ITag:toJsrn()
    // ITag:r()
    // ITag:b()
    export interface IEntity extends ITag {
        /**
         * 获取唯一编号。
         */
        gI(): string;

        /**
         * 获取类型。
         */
        gT(): Core.IEpisode.Entity;
    }
}
