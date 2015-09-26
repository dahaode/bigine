/**
 * 定义文字画面元素组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      G/_Element/Text.ts
 */

/// <reference path="../Element.ts" />
/// <reference path="../../Core/_G/ITextElement.ts" />
/// <reference path="Phrase.ts" />

namespace G {
    export class Text extends Element implements Core.ITextElement {
        /**
         * 行高。
         */
        private _h: number;

        /**
         * 文本。
         */
        private _d: Core.ITextPhrase[];

        /**
         * 对齐方式。
         */
        private _l: Core.ITextElement.Align;

        /**
         * 构造函数。
         */
        constructor(x: number, y: number, w: number, h: number, lineHeight: number, align?: Core.ITextElement.Align, absolute?: boolean);
        constructor(bounds: Core.IBounds, lineHeight: number, align?: Core.ITextElement.Align, absolute?: boolean);
        constructor(x: any, y: any, w?: any, h?: any, lineHeight?: any, align?: any, absolute?: boolean) {
            super(x, y, w, h, absolute);
            if (!x || 'number' == typeof x) {
                this._h = lineHeight;
                this._l = align;
            } else {
                this._h = y;
                this._l = w;
            }
            this._h |= 0;
            var aligns: typeof Core.ITextElement.Align = Core.ITextElement.Align;
            switch (this._l) {
                case aligns.Left:
                case aligns.Center:
                case aligns.Right:
                    break;
                default:
                    this._l = aligns.Left;
            }
            this._d = [];
        }

        /**
         * 绘制。
         */
        public d(context: CanvasRenderingContext2D): CanvasRenderingContext2D | Thenable<CanvasRenderingContext2D> {
            var opacity: number = this.gO(),
                schedules: [number, Phrase, number, number][][] = [[]], // width, Phrase, offset, length
                line: [number, Phrase, number, number][] = schedules[0],
                aligns: typeof Core.ITextElement.Align = Core.ITextElement.Align,
                bounds: Core.IBounds = this.gB(),
                width: number = bounds.w,
                m: [number, number], // length, width
                offset: number;
            if (opacity && this._d.length) {
                Util.each(this._d, (phrase: Phrase) => {
                    offset = 0;
                    while (offset != phrase.gL()) {
                        m = phrase.m(context, width, offset);
                        if (m[0]) {
                            line.push([m[1], phrase, offset, m[0]]);
                            width -= m[1];
                            offset += m[0];
                        } else {
                            line = [];
                            schedules.push(line);
                            width = bounds.w;
                        }
                    }
                });
                if (1 != opacity) {
                    context.save();
                    context.globalAlpha = opacity;
                }
                Util.each(schedules, (line2: [number, Phrase, number, number][], index: number) => {
                    if (this._l != aligns.Left) {
                        width = 0;
                        Util.each(line2, (section: [number, Phrase, number, number]) => {
                            width += section[0];
                        });
                        offset = bounds.w - width;
                        if (this._l == aligns.Center)
                            offset = 0 | offset / 2;
                    } else
                        offset = 0; // x
                    offset += bounds.x;
                    width = bounds.y + this._h * (1 + index); // y
                    Util.each(line2, (section: [number, Phrase, number, number]) => {
                        section[1].d(context, offset, width - section[1].gF(), section[2], section[3]);
                        offset += section[0];
                    });
                });
                if (1 != opacity)
                    context.restore();
            }
            return super.d(context);
        }

        /**
         * 添加文字。
         */
        public a(text: Core.ITextPhrase): Text {
            this._d.push(text);
            return <Text> this.f();
        }

        /**
         * 获取文字。
         */
        public gT(): Phrase[] {
            return <Phrase[]> this._d;
        }

        /**
         * 清空所有已添加文字。
         */
        public c(): Text {
            this._d = [];
            return <Text> this.f();
        }
    }
}
