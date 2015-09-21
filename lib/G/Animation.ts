/**
 * 定义抽象画面动画组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      G/Animation.ts
 */

/// <reference path="../Core/_G/IAnimation.ts" />
/// <reference path="../Util/_raf.d.ts" />

namespace G {
    'use strict';

    export class Animation implements Core.IAnimation {
        /**
         * 动画时长（单位：毫秒）。
         */
        protected _d: number;

        /**
         * 元信息。
         */
        protected _m: Util.IHashTable<any>;

        /**
         * 链。
         */
        protected _c: Animation[];

        /**
         * 循环次数。
         */
        protected _l: number;

        /**
         * 是否已播放。
         */
        protected _p: boolean;

        /**
         * 是否已中止。
         */
        protected _h: boolean;

        /**
         * 构造函数。
         */
        constructor(duration: number, metas?: Util.IHashTable<any>) {
            this._d = duration;
            this._m = metas || {};
            this._c = [];
            this._l = 1;
            this._p =
            this._h = false;
        }

        /**
         * 链式动画。
         */
        public c(next: Animation): Animation {
            this._c.push(next);
            return this;
        }

        /**
         * 循环。
         */
        public l(times?: number): Animation {
            this._l = times || Infinity;
            return this;
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
                    return new Promise((resolve: (value: Core.IGraphicElement) => void) => {
                        var time: number,
                            task: FrameRequestCallback = (now: number) => {
                                time = time || now;
                                if (this._h || time + this._d > now) {
                                    resolve(element);
                                    return;
                                }
                                this.$p(element, now - time);
                                Animation.f(task);
                            };
                        Animation.f(task);
                    }).then(() => {
                        if (!this._h && ++counter < this._l)
                            return once();
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
         * 帧执行。
         */
        protected $p(element: Core.IGraphicElement, elpased: number): void {
            //
        }

        /**
         * 中止。
         */
        public h(): Animation {
            this._h = true;
            Util.each(this._c, (anime: Animation) => {
                anime.h();
            });
            return this;
        }
    }

    export namespace Animation {
        'use strict';

        var raf: typeof window.requestAnimationFrame = window.requestAnimationFrame ||
            window.msRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame;

        if (!raf) {
            var jobs: FrameRequestCallback[] = [],
                start: number = + new Date(),
                counter: number = 0,
                now: number;
            window.setInterval(() => {
                if (counter++ % 3) return;
                if (100 == counter)
                    counter = 0;
                now = + new Date() - start;
                Util.each(jobs.splice(0, jobs.length), (job: FrameRequestCallback) => {
                    job(now);
                });
            }, 5);
            raf = (callback: FrameRequestCallback) => {
                jobs.push(callback);
                return now;
            };
        }

        /**
         * 帧处理。
         */
        export function f(callback: FrameRequestCallback): void {
            raf.call(window, callback);
        }
    }
}
