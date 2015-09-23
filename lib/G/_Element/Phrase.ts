/**
 * 定义画面文字组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      G/_Element/Phrase.ts
 */

/// <reference path="../../Core/_G/ITextPhrase.ts" />

namespace G {
    'use strict';

    export class Phrase implements Core.ITextPhrase {
        /**
         * 字体。
         */
        public static FONT: string = '"Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", Arial, sans-serif';

        /**
         * 内容。
         */
        private _t: string;

        /**
         * 颜色。
         */
        private _c: string;

        /**
         * 字号。
         */
        private _f: number;

        /**
         * 阴影尺寸。
         */
        private _ss: number;

        /**
         * 阴影颜色。
         */
        private _sc: string;

        /**
         * 构造函数。
         */
        constructor() {
            this._t = '';
            this._c =
            this._sc = '#000';
            this._f = 16;
            this._ss = 0;
        }

        /**
         * 设置文本内容。
         */
        public t(clob: string): Phrase {
            this._t = clob;
            return this;
        }

        /**
         * 设置颜色。
         */
        public c(color: string): Phrase {
            this._c = color;
            return this;
        }

        /**
         * 设置字号。
         */
        public f(size: number): Phrase {
            this._f = size;
            return this;
        }

        /**
         * 获取字号。
         */
        public gF(): number {
            return this._f;
        }

        /**
         * 设置阴影。
         */
        public s(size: number, color?: string): Phrase {
            this._ss = size;
            this._sc = color || this._sc;
            return this;
        }

        /**
         * 绘制。
         */
        public d(context: CanvasRenderingContext2D, x: number, y: number, maxWidth: number, offset?: number, length?: number): [number, number] {
            var clob: string = this._t,
                width: number;
            offset = offset || 0;
            if (offset)
                clob = clob.substr(offset, length || clob.length);
            length = clob.length;
            if (!length)
                return [offset, 0];
            context.save();
            context.fillStyle = this._c;
            context.font = this._f + 'px ' + Phrase.FONT;
            context.textBaseline = 'top';
            if (this._ss) {
                context.shadowBlur =
                context.shadowOffsetX =
                context.shadowOffsetY = this._ss;
                context.shadowColor = this._sc;
            }
            for (; length > 0; length--) {
                width = context.measureText(clob.substr(0, length)).width;
                if (width <= maxWidth)
                    break;
            }
            if (!length)
                return [offset, 0];
            context.fillText(clob.substr(0, length), x, y);
            context.restore();
            return [offset + length, width];
        }

        /**
         * 获取长度。
         */
        public gL(): number {
            return this._t.length;
        }

        /**
         * 截取。
         */
        public a(length: number): Phrase {
            return (new Phrase())
                .t(this._t.substr(0, length))
                .c(this._c)
                .f(this._f)
                .s(this._ss, this._sc);
        }
    }
}
