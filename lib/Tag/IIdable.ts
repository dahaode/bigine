/**
 * 声明带唯一标识标签接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/IIdable.ts
 */

/// <reference path="ITag.ts" />

namespace Tag {
    'use strict';

    // Core.ITag:gL()
    // Core.ITag:gN()
    // Core.ITag:toString()
    // Core.ITag:toJsrn()
    // ITag:r()
    // ITag:b()
    // ITag:gU()
    export interface IIdable extends ITag {
        /**
         * 获取编号。
         */
        gI(): string;

        /**
         * 恢复编号。
         */
        i(id: string): void;
    }
}
