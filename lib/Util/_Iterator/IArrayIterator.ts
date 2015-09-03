/**
 * 声明数组遍历函数接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Util/_Iterator/IArrayIterator.ts
 */

module Util {
    export interface IArrayIterator<T, U> {
        (element: T, index?: number, array?: T[]): U;
    }
}
