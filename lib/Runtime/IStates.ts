/**
 * 声明（运行时）数据状态接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/IStates.ts
 */

/// <reference path="../Util/IHashTable.ts" />

/**
 * 1. `_` 表明为场效相关信息，需要被存档记录；
 *     * `_b` - 背景音乐名 - Tag
 *     * `_c` - 特写名 - Tag
 *     * `_c<站位>` - 人物名 - Tag
 *     * `_s<站位>` - 人物神态名 - Tag
 *     * `_rc` - （所在）房间名 - Tag
 *     * `_rd` - （显示）房间名 - Tag
 *     * `_rt` - （移动目标）房间名 - Tag
 *     * `_t` - 时刻名 - Tag
 *     * `_w` - 天气名 - Tag
 * 2. `.` 表明为会话持久信息，不能被存档记录；
 *     * `.p<人物名>` - 人物站位 - Tag
 * 3. `$` 表明为注册对象，不能被存档记录；
 *     * `$b` - 背景音乐资源对象 - Runtime
 *     * `$c` - 特写图片资源对象 - Runtime
 *     * `$c<站位>` - 人物神态资源对象 - Runtime
 *     * `$rc` - （所在）房间对象 - Tag
 *     * `$rd` - （显示）房间对象 - Tag
 *     * `$rt` - （移动目标）房间对象 - Tag
 *     * `$t` - 房间时刻资源对象 - Runtime
 * 4. 其它为作品运行信息，需要被存档记录。
 */
module Runtime {
    export interface IStates {
        /**
         * 设置值。
         */
        s(key: string, value: any): IStates;

        /**
         * 获取值。
         */
        g(key: string): any;

        /**
         * 删除值。
         */
        d(key: string): IStates;

        /**
         * 比较两个值是否一致。
         */
        a(key1: string, key2: string): boolean;

        /**
         * 复制值。
         */
        c(src: string, dest: string): IStates;

        /**
         * 移动值。
         */
        m(src: string, dest: string): IStates;

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
        i(data: Util.IHashTable<any>): IStates;
    }
}
