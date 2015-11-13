/**
 * 定义抽象画面动画组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      G/Animation.ts
 */

/// <reference path="../Core/_G/IAnimation.ts" />
/// <reference path="../../include/_raf.d.ts" />
/// <reference path="../Util/ENV.ts" />

namespace G {
    export class Animation implements Core.IAnimation {
        /**
         * 动画时长（单位：帧）。
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
         * 对象。
         */
        protected _t: Core.IGraphicElement;

        /**
         * 暂停。
         */
        protected _w: boolean;

        /**
         * 构造函数。
         */
        constructor(duration: number, metas?: Util.IHashTable<any>) {
            this._d = Math.round(duration * 60 / 1000);
            this._m = metas || {};
            this._c = [];
            this._l = 1;
            this._p =
            this._h =
            this._w = false;
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
                        var index: number = 0,
                            done: () => void = () => {
                                resolve(element);
                            },
                            task: FrameRequestCallback = (time: number) => {
                                if (this._h || index >= this._d)
                                    return done();
                                if (!this._w)
                                    this.$p(element, ++index, done);
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
            this._p = true;
            this._t = element;
            q = once();
            if (!this._c.length)
                return q;
            return q.then(() => Util.Q.every(this._c, (anime: Animation) => anime.p(element)));
        }

        /**
         * 帧执行。
         */
        protected $p(element: Core.IGraphicElement, elpased: number, done: () => void): void {
            //
        }

        /**
         * 中止。
         */
        public h(): Animation {
            if (this._h)
                return this;
            this._h = true;
            this.$h();
            Util.each(this._c, (anime: Animation) => {
                anime.h();
            });
            return this;
        }

        /**
         * 中止处理。
         */
        protected $h(): void {
            //
        }

        /**
         * 暂停。
         */
        public w(): Animation {
            this._w = true;
            return this;
        }

        /**
         * 恢复播放。
         */
        public r(): Animation {
            this._w = false;
            return this;
        }

        /**
         * 获取暂停状态。
         */
        public gW(): boolean {
            return this._w;
        }
    }

    export namespace Animation {
        var jobs: FrameRequestCallback[] = [],
            raf: typeof window.requestAnimationFrame,
            proxy: FrameRequestCallback;

        if (Util.ENV.Window) {
            raf = window.requestAnimationFrame ||
                window.msRequestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame;
            if (raf) {
                proxy = (now: number) => {
                    if (jobs.length)
                        Util.each(jobs.splice(0, jobs.length), (job: FrameRequestCallback) => {
                            job(now);
                        });
                    raf.call(window, proxy);
                };
                raf.call(window, proxy);
            }
        } else
            raf = (callback: FrameRequestCallback) => 0;

        /**
         * 帧处理。
         */
        export function f(callback: FrameRequestCallback, draw?: boolean): void {
            if (draw) {
                jobs.unshift(callback);
            } else
                jobs.push(callback);
        }
    }
}
