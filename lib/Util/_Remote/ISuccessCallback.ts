/**
 * 声明成功回调函数接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Util/_Remote/ISuccessCallback.ts
 */

/// <reference path="../_Iterator/IHashTable.ts" />

module Util {
    export interface ISuccessCallback {
        (data: IHashTable<any>): void;
    }
}
