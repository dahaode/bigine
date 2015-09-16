/**
 * 声明选项动作标签接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_Tag/IOptionTag.ts
 */

/// <reference path="ITag.ts" />
/// <reference path="../_Runtime/IButtonable.ts" />

namespace Core {
    'use strict';

    // ITag:gL()
    // ITag:gN()
    // ITag:r()
    // ITag:b()
    // ITag:toString()
    // ITag:toJsrn()
    // ITag:gU()
    // IButtonable:p()
    export interface IOptionTag extends ITag, IButtonable {
        /**
         * 获取描述文字。
         */
        gT(): string;
    }
}
