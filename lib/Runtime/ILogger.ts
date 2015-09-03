/**
 * 声明（运行时）日志接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/ILogger.ts
 */

module Runtime {
    export interface ILogger {
        /**
         * 调试。
         */
        debug(...parts: any[]): void;

        /**
         * 信息。
         */
        info(...parts: any[]): void;

        /**
         * 警告。
         */
        warn(...parts: any[]): void;

        /**
         * 错误。
         */
        error(...parts: any[]): void;
    }
}
