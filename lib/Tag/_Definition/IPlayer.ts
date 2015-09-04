/**
 * 声明主角标签接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Definition/IPlayer.ts
 */

/// <reference path="IEntity.ts" />
/// <reference path="_Char/DefChar.ts" />

module Tag {
    // Core.ITag:gL()
    // Core.ITag:gN()
    // Core.ITag:gC()
    // Core.ITag:toString()
    // Core.ITag:toJsrn()
    // ITag:r()
    // ITag:b()
    // IEntity:gI()
    // IEntity:gT()
    export interface IPlayer extends IEntity {
        /**
         * 获取关联角色。
         */
        o(): DefChar;
    }
}
