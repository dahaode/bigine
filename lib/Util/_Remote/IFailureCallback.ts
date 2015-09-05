/**
 * 声明失败回调函数接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Util/_Remote/IFailureCallback.ts
 */

module Util {
    export interface IFailureCallback {
        (error: Error, status?: number): void
    }
}
