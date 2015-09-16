/**
 * 声明选项动作标签接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/IOption.ts
 */

/// <reference path="ITag.ts" />
/// <reference path="../Runtime/IButtonable.ts" />

namespace Tag {
    'use strict';

    // Core.ITag:gL()
    // Core.ITag:gN()
    // Core.ITag:toString()
    // Core.ITag:toJsrn()
    // ITag:r()
    // ITag:b()
    // ITag:gU()
    // Runtime.IButtonable.p()
    export interface IOption extends ITag, Runtime.IButtonable {
        /**
         * 获取描述文字。
         */
        gT(): string;
    }
}
