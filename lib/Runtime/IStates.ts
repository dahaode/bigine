/**
 * 声明（运行时）数据状态接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/IStates.ts
 */

module Runtime {
    export interface IStates {
        /**
         * 设置值。
         */
        s<T>(key: string, value: T): T;

        /**
         * 获取值。
         */
        g(key: string): any;
    }
}
