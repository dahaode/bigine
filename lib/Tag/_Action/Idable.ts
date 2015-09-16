/**
 * 定义唯一标识标签抽象组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Action/Idable.ts
 */

/// <reference path="Action.ts" />
/// <reference path="../IIdable.ts" />

namespace Tag {
    'use strict';

    export class Idable extends Action implements IIdable {
        /**
         * 唯一编号。
         */
        private _i: string;

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
