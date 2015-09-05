/**
 * 声明标签接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/ITag.ts
 */

/// <reference path="../Core/ITag.ts" />
/// <reference path="../Runtime/IEpisode.ts" />

module Tag {
    // Core.ITag:gL()
    // Core.ITag:gN()
    // Core.ITag:toString()
    // Core.ITag:toJsrn()
    export interface ITag extends Core.ITag {
        /**
         * 注册（自身实体）至（运行时）作品。
         */
        r(ep: Runtime.IEpisode): void;

        /**
         * 绑定（运行时）作品（实体）。
         */
        b(ep: Runtime.IEpisode): void;

        /**
         * 获取父标签。
         */
        gU(): ITag;
    }
}
