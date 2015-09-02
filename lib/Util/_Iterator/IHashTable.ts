/**
 * 声明哈希表接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 */

module Util {
    export interface IHashTable<T> {
        [index: string]: T;
    }
}
