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
    'use strict';

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
         * 构造函数。
         */
        constructor(x: number, y: number, w: number, h: number, lineHeight: number, absolute?: boolean);
        constructor(bounds: Core.IBounds, lineHeight: number, absolute?: boolean);
        constructor(x: any, y: any, w?: any, h?: any, lineHeight?: any, absolute?: boolean) {
            super(x, y, w, h, absolute);
            this._h = 0 | ('number' == typeof x ? lineHeight : y);
            this._d = [];
        }

        /**
         * 绘制。
         */
        public d(context: CanvasRenderingContext2D): CanvasRenderingContext2D | Thenable<CanvasRenderingContext2D> {
            if (this._o) {
                context.save();
                context.globalAlpha = this._o;
                var bounds: Core.IBounds = this.gB(),
                    x: number = bounds.x,
                    y: number = bounds.y,
                    w: number = bounds.w,
                    offset: number,
                    progress: [number, number] = [0, 0];
                Util.each(this._d, (phrase: Phrase) => {
                    offset = this._h - phrase.gF();
                    while (progress[0] != phrase.gL()) {
                        progress = phrase.d(context, x, y + offset, w, progress[0]);
                        if (!progress[1]) {
                            x = bounds.x;
                            y += this._h;
                            w = bounds.w;
                        } else {
                            x += progress[1];
                            w -= progress[1];
                        }
                    }
                    progress = [0, 0];
                });
                context.restore();
            }
            return super.d(context);
        }

        /**
         * 添加文字。
         */
        public a(text: Core.ITextPhrase): Text {
            this._d.push(text);
            return <Text> this.$f();
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
            return <Text> this.$f();
        }
    }
}
