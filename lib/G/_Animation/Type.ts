/**
 * 定义打字效果动画组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      G/_Animation/Type.ts
 */

/// <reference path="../Animation.ts" />
/// <reference path="../../Core/_G/ITextElement.ts" />

namespace G {
    'use strict';

    export class Type extends Animation {
        /**
         * 速度（单位：帧／字）。
         */
        private _r: number;

        /**
         * 对象。
         */
        private _o: Core.ITextElement;

        /**
         * 文字集合。
         */
        private _t: Core.ITextPhrase[];

        /**
         * 构造函数。
         */
        constructor(rate?: number) {
            super(0);
            this._r = rate || 1;
            if (0 > this._r)
                this._r = 1;
        }

        /**
         * 执行。
         */
        public p(element: Core.ITextElement): Promise<Core.ITextElement> {
            if (this._p || this._h)
                return Promise.resolve(element);
            this._o = element;
            this._t = element.gT();
            var length: number = 0;
            Util.each(this._t, (phrase: Core.ITextPhrase) => {
                length += phrase.gL();
            });
            this._d = 0 | length * this._r;
            this._r = this._d / length;
            return super.p(element);
        }

        /**
         * 帧执行。
         */
        protected $p(element: Core.ITextElement, elpased: number): void {
            var length: number;
            elpased = 0 | elpased / this._r;
            element.c().o(1);
            Util.each(this._t, (phrase: Core.ITextPhrase) => {
                length = phrase.gL();
                if (length < elpased) {
                    element.a(phrase);
                    elpased -= length;
                } else if (elpased) {
                    element.a(phrase.a(elpased));
                    elpased = 0;
                }
            });
        }

        /**
         * 中止。
         */
        public h(): Type {
            if (this._h)
                return this;
            super.h();
            this._o.c();
            Util.each(this._t, (phrase: Core.ITextPhrase) => {
                this._o.a(phrase);
            });
            return this;
        }
    }
}
