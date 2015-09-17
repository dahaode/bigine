/**
 * 定义唯一标识标签抽象组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/Idable.ts
 */

/// <reference path="Action.ts" />
/// <reference path="../Core/_Tag/IIdableTag.ts" />

namespace Tag {
    'use strict';

    export class Idable extends Action implements Core.IIdableTag {
        /**
         * 唯一编号。
         */
        private _i: string;

        /**
         * 转化为运行时（Javascript）代码。
         */
        public toJsrn(): string {
            var clob: string = super.toJsrn();
            return clob.substr(0, clob.length - 1) + ',"' + this._i + '")';
        }

        /**
         * 获取编号。
         */
        public gI(): string {
            return this._i;
        }

        /**
         * 恢复编号。
         */
        public i(id: string): void {
            this._i = id;
        }
    }
}
