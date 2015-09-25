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
         * 计算可绘制字符数。
         */
        public m(context: CanvasRenderingContext2D, maxWidth: number, offset?: number): [number, number] {
            var clob: string = offset ?
                    this._t.substr(offset) :
                    this._t,
                compare: (text: string, maxWidth2: number) => [number, number] = (text: string, maxWidth2: number) => {
                    var length: number = text.length,
                        result2: [number, number] = [length, context.measureText(text).width],
                        result3: [number, number];
                    if (result2[1] <= maxWidth2) // 可以完全绘制
                        return result2;
                    if (1 == length) // 完全无法绘制
                        return [0, 0];
                    length = 0 | length / 2; // 中分
                    result2 = compare(text.substr(0, length), maxWidth2);
                    if (length != result2[0]) // 前半段仍无法全部绘制
                        return result2;
                    result3 = compare(text.substr(length), maxWidth2 - result2[1]);
                    result2[0] += result3[0];
                    result2[1] += result3[1];
                    return result2;
                },
                result: [number, number];
            offset = clob.length;
            if (!offset)
                return [0, 0];
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
            if (context.measureText(clob[0]).width > maxWidth) {
                result = [0, 0];
            } else
                result = compare(clob, maxWidth);
            context.restore();
            return result;
        }

        /**
         * 绘制。
         */
        public d(context: CanvasRenderingContext2D, x: number, y: number, offset?: number, length?: number): void {
            var clob: string = this._t.substr(offset || 0, length || this._t.length);
            if (!clob.length) return;
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
            context.fillText(clob, Math.ceil(x), Math.ceil(y));
            context.restore();
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
