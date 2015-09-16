/**
 * 声明对象遍历函数接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Util/IObjectIterator.ts
 */

/// <reference path="IHashTable.ts" />

namespace Util {
    'use strict';

    export interface IObjectIterator<T, U> {
        (element: T, index?: string, object?: IHashTable<T>): U;
    }
}
