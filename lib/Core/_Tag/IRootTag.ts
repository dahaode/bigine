/**
 * 声明根标签接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_Tag/IRootTag.ts
 */

/// <reference path="../../../include/tsd.d.ts" />
/// <reference path="IEntityTag.ts" />

namespace Core {
    import Util = __Bigine_Util;

    // ITag:gL()
    // ITag:gN()
    // ITag:r()
    // ITag:b()
    // ITag:toString()
    // ITag:toJsrn()
    // ITag:gU()
    export interface IRootTag extends ITag {
        /**
         * 是否自动播放。
         */
        a(): boolean;

        /**
         * 加载资源包。
         */
        l(callback: Util.ISuccessCallback<Util.IHashTable<IEntityTag>>): boolean;

        /**
         * 获取资源包名称。
         */
        gS(): string;

        /**
         * 加载主题。
         */
        t(callback: Util.ISuccessCallback<Util.IHashTable<any>>): void;

        /**
         * 获取主题名称。
         */
        gT(): string;

        /**
         * 获取状态配置。
         */
        s(): [string, string][];
    }
}
