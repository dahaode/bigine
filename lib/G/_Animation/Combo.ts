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
    export class Combo extends Animation implements Core.IComboAnimation {
        /**
         * 动画组合。
         */
        private _a: Animation[];

        /**
         * 构造函数。
         */
        constructor(animations: Animation[]) {
            super(0);
            this._a = animations;
        }

        /**
         * 执行。
         */
        public p(element: Core.IGraphicElement): Promise<Core.IGraphicElement> {
            var r: Promise<Core.IGraphicElement> = Promise.resolve(element),
                counter: number = 0,
                once: () => Promise<Core.IGraphicElement> = () => {
                    if (this._h)
                        return r;
                    var p: Promise<Core.IGraphicElement>[] = [];
                    Util.each(this._a, (anime: Animation) => {
                        p.push(anime.p(element));
                    });
                    return Promise.all(p).then(() => {
                        if (!this._h && ++counter < this._l)
                            return once().then(() => element);
                        return element;
                    });
                },
                q: Promise<Core.IGraphicElement>;
            if (this._p || this._h)
                return r;
            q = once();
            if (!this._c.length)
                return q;
            return q.then(() => Util.Q.every(this._c, (anime: Animation) => anime.p(element)));
        }

        /**
         * 中止。
         */
        public h(): Animation {
            Util.each(this._a, (anime: Animation) => {
                anime.h();
            });
            return super.h();
        }
    }
}
