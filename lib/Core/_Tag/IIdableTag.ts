/**
 * 声明带唯一标识标签接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_Tag/IIdableTag.ts
 */

/// <reference path="ITag.ts" />

namespace Core {
    'use strict';

    // ITag:gL()
    // ITag:gN()
    // ITag:r()
    // ITag:b()
    // ITag:toString()
    // ITag:toJsrn()
    // ITag:gU()
    export interface IIdableTag extends ITag {
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
