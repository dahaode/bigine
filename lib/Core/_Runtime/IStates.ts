/**
 * 声明（运行时）数据状态接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_Runtime/IStates.ts
 */

/// <reference path="../../../include/tsd.d.ts" />

/**
 * 1. `_` 表明为场效相关信息，需要被存档记录；
 *     * `_a` - 动作编号 - Runtime
 *     * `_b` - 背景音乐名 - Tag
 *     * `_c` - 特写名 - Tag
 *     * `_c<站位>` - 人物名 - Tag
 *     * `_s<站位>` - 人物神态名 - Tag
 *     * `_rc` - （所在）房间名 - Tag
 *     * `_rd` - （显示）房间名 - Tag
 *     * `_rt` - （移动目标）房间名 - Tag
 *     * `_p` - 时序类型 - Runtime
 *     * `_s` - 事件编号 - Runtime
 *     * `_t` - 时刻名 - Tag
 *     * `_w` - 天气名 - Tag
 *     * `_z` -  房间状态 - Tag    // 添加镜头控制命令时所需记录的存档信息
 *     * `_ra` -  切幕动画 - Tag    // 添加切幕动画命令时所需记录的存档信息
 * 2. `.` 表明为会话持久信息，不能被存档记录；
 *     * `.p<人物名>` - 人物站位 - Runtime/Tag
 *     * `.a` - 动作编号 - Runtime/Tag
 *     * `.s` - 事件编号 - Runtime
 *     * `.c` - 特写名 - Tag
 *     * `.c<站位>` - 人物名 - Tag
 *     * `.z` -  房间状态 - Tag
 * 3. `$` 表明为注册对象，不能被存档记录；
 *     * `$c` - 人物数量 - Runtime
 *     * `$d` - 事件逻辑层深度 - Tag
 *     * `$rc` - （所在）房间对象 - Tag
 *     * `$rd` - （显示）房间对象 - Tag
 *     * `$rt` - （移动目标）房间对象 - Tag
 *     * `$t<深度>` - 比较是否完成 - Tag
 *     * `$v<深度>` - 当前比较值 - Tag
 *     * `$_<选项名>` - 选项定义 - Tag
 * 4. 其它为作品运行信息，需要被存档记录。
 */
namespace Core {
    import Util = __Bigine_Util;

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
         * 生成快照（以备存档）。
         */
        p(): IStates;

        /**
         * 导出数据（存档）。
         *
         * 此方法应触发 Save 事件。
         */
        e(manual: boolean, series?: boolean): Util.IHashTable<any>;

        /**
         * 导入数据。
         */
        i(data: Util.IHashTable<any>): IStates;

        /**
         * 查询档位信息。
         */
        q(index: string, type?: IStates.Save): [string, number];

        /**
         * 加载存档信息。
         */
        l(): Promise<IStates>;
    }

    export namespace IStates {
        /**
         * 存档类型。
         */
        export enum Save {
            /**
             * 作品内部存档。
             */
            Work,
            /**
             * 前一集连载存档。
             */
            Series,
            /**
             * 本集连载存档。
             */
            End
        }
    }
}
