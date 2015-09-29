/**
 * 声明（运行时）日志接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_Runtime/ILogger.ts
 */

namespace Core {
    export interface ILogger {
        /**
         * 调试。
         */
        d(...parts: any[]): void;

        /**
         * 信息。
         */
        i(...parts: any[]): void;

        /**
         * 警告。
         */
        w(...parts: any[]): void;

        /**
         * 错误。
         */
        e(...parts: any[]): void;

        /**
         * 分组。
         */
        o(title: string): void;

        /**
         * 分组结束。
         */
        c(title: string): void;

        /**
         * 设置日志等级。
         */
        l(level: ILogger.Level): ILogger;
    }

    export namespace ILogger {
        /**
         * 日志等级。
         */
        export enum Level {
            /**
             * 调试。
             */
            Debug,
            /**
             * 信息。
             */
            Info,
            /**
             * 警告。
             */
            Warn,
            /**
             * 错误。
             */
            Error
        }
    }
}
