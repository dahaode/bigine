/**
 * 定义（运行时）控制台日志记录器组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/_Logger/ConsoleLogger.ts
 */

/// <reference path="../../Core/_Runtime/ILogger.ts" />
/// <reference path="../../Util/_iterator.ts" />

namespace Runtime {
    export class ConsoleLogger implements Core.ILogger {
        /**
         * 日志级别。
         */
        private _l: Core.ILogger.Level;

        /**
         * 控制台。
         */
        private _c: Console;

        /**
         * 构造函数。
         */
        constructor() {
            this._l = Core.ILogger.Level.Error;
            this._c = 'undefined' != typeof console ?
                console :
                undefined;
        }

        /**
         * 调试。
         */
        public d(...parts: any[]): void {
            if (this._l > Core.ILogger.Level.Debug || !this._c) return;
            this.p(this._c.debug || this._c.log, parts);
        }

        /**
         * 信息。
         */
        public i(...parts: any[]): void {
            if (this._l > Core.ILogger.Level.Info || !this._c) return;
            this.p(this._c.info || this._c.log, parts);
        }

        /**
         * 警告。
         */
        public w(...parts: any[]): void {
            if (this._l > Core.ILogger.Level.Warn || !this._c) return;
            this.p(this._c.warn || this._c.log, parts);
        }

        /**
         * 错误。
         */
        public e(...parts: any[]): void {
            if (this._c)
                this.p(this._c.error, 1 < parts.length ? parts : [parts[0]['stack'] || parts[0]]);
        }

        /**
         * 分组。
         */
        public o(title: string): void {
            if (Core.ILogger.Level.Debug == this._l && this._c)
                this.p(this._c.group, [title]);
        }

        /**
         * 分组结束。
         */
        public c(title: string): void {
            if (Core.ILogger.Level.Debug == this._l && this._c)
                this.p(this._c.groupEnd, [title]);
        }

        /**
         * 设置日志等级。
         */
        public l(level: Core.ILogger.Level): ConsoleLogger {
            this._l = level;
            return this;
        }

        /**
         * 打印。
         */
        private p(method: typeof console.log, contents: any[]): void {
            if (!method) return;
            if ('apply' in method)
                return method.apply(this._c, contents);
            method(contents.join(' '));
        }
    }
}
