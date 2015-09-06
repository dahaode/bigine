/**
 * 声明（运行时）数据状态接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/IStates.ts
 */

/// <reference path="../Util/_Iterator/IHashTable.ts" />

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

        /**
         * 删除值。
         */
        d(key: string): void;

        /**
         * 转化文本中的变量名至实际值。
         */
        t(text: string): string;

        /**
         * 导出数据（存档）。
         *
         * 此方法应触发 Save 事件。
         */
        e(brief?: string): Util.IHashTable<any>;

        /**
         * 导入数据。
         */
        i(data: Util.IHashTable<any>): void;
    }
}
