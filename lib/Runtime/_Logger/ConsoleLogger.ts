/**
 * 定义（运行时）控制台日志记录器组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/_Logger/ConsoleLogger.ts
 */

/// <reference path="../ILogger.ts" />

module Runtime {
    export class ConsoleLogger implements ILogger {
        /**
         * 日志级别。
         */
        private _l: ILogger.Level;

        /**
         * 构造函数。
         */
        constructor() {
            this._l = ILogger.Level.Error;
        }

        /**
         * 调试。
         */
        d(...parts: any[]): void {
            if (this._l > ILogger.Level.Debug) return;
            if ('undefined' != typeof console && 'function' == typeof console.log)
                (console.debug || console.log).apply(console, parts);
        }

        /**
         * 信息。
         */
        i(...parts: any[]): void {
            if (this._l > ILogger.Level.Info) return;
            if ('undefined' != typeof console && 'function' == typeof console.log)
                (console.info || console.log).apply(console, parts);
        }

        /**
         * 警告。
         */
        w(...parts: any[]): void {
            if (this._l > ILogger.Level.Warn) return;
            if ('undefined' != typeof console && 'function' == typeof console.log)
                (console.warn || console.log).apply(console, parts);
        }

        /**
         * 错误。
         */
        e(...parts: any[]): void {
            if ('undefined' != typeof console && 'function' == typeof console.error)
                console.error.apply(console, 1 < parts.length ? parts : [parts[0]['stack'] || parts[0]]);
        }

        /**
         * 设置日志等级。
         */
        l(level: ILogger.Level): ILogger {
            this._l = level;
            return this;
        }
    }
}
