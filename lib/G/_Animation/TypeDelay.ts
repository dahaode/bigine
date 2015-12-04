/**
 * 定义打字延时动画组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      G/_Animation/TypeDelay.ts
 */

/// <reference path="Delay.ts" />
/// <reference path="../../Core/_G/ITextElement.ts" />

namespace G {
    import Util = __Bigine_Util;

    export class TypeDelay extends Delay {
        /**
         * 速度（单位：帧／字）。
         */
        private _r: number;

        /**
         * 构造函数。
         */
        constructor(rate?: number) {
            super(17);
            this._r = rate || 1;
            if (0 > this._r)
                this._r = 1;
        }

        /**
         * 执行。
         */
        public $p(element: Core.ITextElement, elapsed: number): void {
            if (1 == elapsed) {
                var length: number = 0;
                Util.each(element.gT(), (phrase: Core.ITextPhrase) => {
                    length += phrase.gL();
                });
                this._d = 0 | length * this._r;
            }
        }
    }
}
