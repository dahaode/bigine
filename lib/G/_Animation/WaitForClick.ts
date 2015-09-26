/**
 * 定义等待点击动画组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      G/_Animation/WaitForClick.ts
 */

/// <reference path="../Animation.ts" />
/// <reference path="../Event/Click.ts" />

namespace G {
    'use strict';

    export class WaitForClick extends Animation {
        /**
         * 功能函数。
         */
        private _f: Core.IEventListener<Core.ISprite>;

        /**
         * 中止函数。
         */
        private _r: () => void;

        /**
         * 构造函数。
         */
        constructor(callback?: Core.IEventListener<Core.ISprite>) {
            super(0);
            this._f = callback;
        }

        /**
         * 执行。
         */
        public p(element: Core.ISprite): Promise<Core.ISprite> {
            var r: Promise<Core.ISprite> = Promise.resolve(element),
                counter: number = 0,
                type: string = '$click',
                once: () => Promise<Core.ISprite> = () => {
                    if (this._h)
                        return r;
                    return new Promise((resolve: (value: Core.ISprite) => void) => {
                        var listener: Core.IEventListener<Core.ISprite> = (event: Event.Click) => {
                            if (this._f)
                                this._f.call(undefined, event);
                            this._r();
                        };
                        this._r = () => {
                            element.removeEventListener(type, listener);
                            resolve(element);
                        };
                        element.addEventListener(type, listener);
                    }).then(() => {
                        if (!this._h && ++counter < this._l)
                            return once();
                        return element;
                    });
                },
                q: Promise<Core.ISprite>;
            if (this._p || this._h)
                return r;
            this._p = true;
            q = once();
            if (!this._c.length)
                return q;
            return q.then(() => Util.Q.every(this._c, (anime: Animation) => anime.p(element)));
        }

        /**
         * 中止。
         */
        public $h(): void {
            if (this._r)
                this._r();
        }
    }
}
