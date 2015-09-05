/**
 * 声明根标签接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/IRoot.ts
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
    // ITag:gU()
    export interface IRoot extends ITag {
    }
}
