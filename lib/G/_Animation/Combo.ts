/**
 * 定义画面组合动画组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      G/_Animation/Combo.ts
 */

/// <reference path="../Animation.ts" />
/// <reference path="../../Core/_G/IComboAnimation.ts" />

namespace G {
    import Util = __Bigine_Util;

    export class Combo extends Animation implements Core.IComboAnimation {
        /**
         * 动画组合。
         */
        private _a: Animation[];

        /**
         * 构造函数。
         */
        constructor(animations: Animation[]) {
            super(Infinity);
            this._a = animations;
        }

        /**
         * 执行。
         */
        public $p(element: Core.IGraphicElement, elapsed: number, done: () => void): void {
            if (1 == elapsed) {
                var p: Promise<Core.IGraphicElement>[] = [];
                Util.each(this._a, (anime: Animation) => {
                    p.push(anime.p(element));
                });
                Promise.all(p).then(done);
            }
        }

        /**
         * 中止处理。
         */
        public $h(): void {
            Util.each(this._a, (anime: Animation) => {
                anime.h();
            });
        }
    }
}
