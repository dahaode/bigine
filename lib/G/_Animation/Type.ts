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
        constructor() {
            super(0);
        }

        /**
         * 执行。
         */
        public p(element: Core.ITextElement): Promise<Core.ITextElement> {
            if (this._p || this._h)
                return Promise.resolve(element);
            this._o = element;
            this._t = element.gT();
            Util.each(this._t, (phrase: Core.ITextPhrase) => {
                this._d += phrase.gL();
            });
            return super.p(element);
        }

        /**
         * 帧执行。
         */
        protected $p(element: Core.ITextElement, elpased: number): void {
            var length: number;
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
