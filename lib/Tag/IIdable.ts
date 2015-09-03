/**
 * 声明带唯一标识标签接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/IIdable.ts
 */

/// <reference path="ITag.ts" />

module Tag {
    // Core.ITag:gLineNo()
    // Core.ITag:gTagName()
    // Core.ITag:gTagIndex()
    // Core.ITag:toString()
    // Core.ITag:toJsrn()
    // ITag:r()
    // ITag:b()
    export interface IIdable extends ITag {
        /**
         * 获取编号。
         */
        gId(): string;

        /**
         * 恢复编号。
         */
        i(id: string): IIdable;
    }
}
