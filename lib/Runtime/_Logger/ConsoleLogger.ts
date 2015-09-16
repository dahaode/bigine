/**
 * 定义（运行时）控制台日志记录器组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/_Logger/ConsoleLogger.ts
 */

/// <reference path="../ILogger.ts" />

namespace Runtime {
    'use strict';

    export class ConsoleLogger implements ILogger {
        /**
         * 日志级别。
         */
        private _l: ILogger.Level;

        /**
         * 控制台。
         */
        private _c: Console;

        /**
         * 构造函数。
         */
        constructor() {
            this._l = ILogger.Level.Error;
            this._c = 'undefined' != typeof console ?
                console :
                undefined;
        }

        /**
         * 调试。
         */
        public d(...parts: any[]): void {
            if (this._l > ILogger.Level.Debug || !this._c) return;
            (this._c.debug || this._c.log).apply(this._c, parts);
        }

        /**
         * 信息。
         */
        public i(...parts: any[]): void {
            if (this._l > ILogger.Level.Info || !this._c) return;
            (this._c.info || this._c.log).apply(this._c, parts);
        }

        /**
         * 警告。
         */
        public w(...parts: any[]): void {
            if (this._l > ILogger.Level.Warn || !this._c) return;
            (this._c.warn || this._c.log).apply(this._c, parts);
        }

        /**
         * 错误。
         */
        public e(...parts: any[]): void {
            if (this._c && 'function' == typeof this._c.error)
                this._c.error.apply(this._c, 1 < parts.length ? parts : [parts[0]['stack'] || parts[0]]);
        }

        /**
         * 设置日志等级。
         */
        public l(level: ILogger.Level): ConsoleLogger {
            this._l = level;
            return this;
        }
    }
}
