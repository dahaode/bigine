/**
 * 声明根标签接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/IRoot.ts
 */

/// <reference path="ITag.ts" />
/// <reference path="../Util/ISuccessCallback.ts" />

module Tag {
    // Core.ITag:gLineNo()
    // Core.ITag:gTagName()
    // Core.ITag:gTagIndex()
    // Core.ITag:toString()
    // Core.ITag:toJsrn()
    // ITag:r()
    // ITag:b()
    // ITag:gU()
    export interface IRoot extends ITag {
        /**
         * 是否自动播放。
         */
        a(): boolean;

        /**
         * 加载资源包。
         */
        l(callback: Util.ISuccessCallback<IEntity>): boolean;

        /**
         * 加载主题。
         */
        t(callback: Util.ISuccessCallback<any>): void;
    }
}
