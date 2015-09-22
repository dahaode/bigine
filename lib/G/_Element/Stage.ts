/**
 * 定义全画面舞台组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      G/_Element/Stage.ts
 */

/// <reference path="Sprite.ts" />
/// <reference path="../../Core/_G/IStage.ts" />
/// <reference path="../Event/Focus.ts" />
/// <reference path="../Event/Blur.ts" />
/// <reference path="../Event/MouseMove.ts" />
/// <reference path="../Event/Click.ts" />
/// <reference path="../_pack.ts" />

namespace G {
    'use strict';

    export class Stage extends Sprite implements Core.IStage {
        /**
         * 画板上下文。
         */
        private _c: CanvasRenderingContext2D;

        /**
         * 缩放比例（DOM 座标至内部座标转换系数）。
         */
        private _z: number;

        /**
         * 绑定视图。
         */
        private _v: HTMLElement;

        /**
         * DOM 事件处理函数集合。
         */
        private _h: ((event: MouseEvent) => void)[];

        /**
         * 构造函数。
         */
        constructor(context: CanvasRenderingContext2D) {
            var x0: number = 0,
                y0: number = 0,
                canvas: HTMLCanvasElement = context.canvas,
                autodraw: (time: number) => void = (time: number) => {
                    this.d().then(() => {
                        Animation.f(autodraw, true);
                    });
                },
                metas: Event.IMouseEventMetas;
            super(0, 0, canvas.width, canvas.height, true);
            this._c = context;
            this._z = canvas.width / canvas.scrollWidth;
            this._h = [
                (event: MouseEvent) => {
                    event.stopPropagation();
                    var x: number = event.offsetX * this._z,
                        y: number = event.offsetY * this._z,
                        els: Sprite[] = this.$m(x0, y0).slice(0, -1),
                        focused: Sprite[] = [],
                        blured: Sprite[] = [],
                        moved: Sprite[] = [],
                        ev: Event.MouseEvent;
                    Util.each(this.$m(x, y).slice(0, -1), (element: Sprite) => {
                        if (-1 == Util.indexOf(els, element)) {
                            focused.push(element);
                        } else
                            moved.push(element);
                    });
                    Util.each(els, (element: Sprite) => {
                        if (-1 == Util.indexOf(moved, element))
                            blured.push(element);
                    });
                    metas = {
                        target: focused[0] || moved[0],
                        x: x,
                        y: y,
                        from: blured[0] || moved[0],
                        fromX: x0,
                        fromY: y0
                    };
                    x0 = x;
                    y0 = y;
                    if (focused.length) {
                        ev = new Event.Focus(metas);
                        Util.each(focused, (element: Sprite) => {
                            element.dispatchEvent(ev);
                        });
                    }
                    if (blured.length) {
                        ev = new Event.Blur(metas);
                        Util.each(blured, (element: Sprite) => {
                            element.dispatchEvent(ev);
                        });
                    }
                    if (moved.length) {
                        ev = new Event.MouseMove(metas);
                        Util.each(moved, (element: Sprite) => {
                            element.dispatchEvent(ev);
                        });
                    }
                    return false;
                },
                (event: MouseEvent) => {
                    if (metas.target)
                        metas.target.dispatchEvent(new Event.Click(metas));
                }
            ];
            this.b(context.canvas);
            Animation.f(autodraw, true);
        }

        /**
         * 移动 X 轴座标。
         */
        public x(distance: number): Stage {
            return this;
        }

        /**
         * 移动 Y 轴座标。
         */
        public y(distance: number): Stage {
            return this;
        }

        /**
         * 缩放。
         */
        public s(ratio: number): Stage {
            return this;
        }

        /**
         * 旋转。
         */
        public r(degrees: number): Stage {
            return this;
        }

        /**
         * 绘制。
         */
        public d(): Promise<CanvasRenderingContext2D> {
            return new Promise((resolve: (value?: CanvasRenderingContext2D | Thenable<CanvasRenderingContext2D>) => void) => {
                if (!this._f)
                    return resolve(this._c);
                this._f = false;
                //this._c.clearRect(0, 0, this._b.w, this._b.h);
                resolve(super.d(this._c));
            });
        }

        /**
         * 绑定视图。
         */
        public b(viewport: HTMLElement): Stage {
            if (this._v) {
                this._v.removeEventListener('mousemove', this._h[0]);
                this._v.removeEventListener('click', this._h[1]);
            }
            this._v = viewport;
            this._v.addEventListener('mousemove', this._h[0]);
            this._v.addEventListener('click', this._h[1]);
            return this;
        }
    }
}
