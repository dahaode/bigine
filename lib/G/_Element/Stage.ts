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
         * 鼠标事件元信息。
         */
        private _m: Event.IMouseEventMetas;

        /**
         * 鼠标座标对应组合元素树。
         */
        private _t: Sprite[];

        /**
         * 构造函数。
         */
        constructor(context: CanvasRenderingContext2D) {
            var canvas: HTMLCanvasElement = context.canvas,
                autodraw: (time: number) => void = (time: number) => {
                    this.d().then(() => {
                        Animation.f(autodraw, true);
                    });
                };
            super(0, 0, canvas.width, canvas.height, true);
            this._c = context;
            this.z();
            window.addEventListener('resize', () => {
                this.z();
            });
            this._m = <Event.IMouseEventMetas> {
                fromX: 0,
                fromY: 0,
                stage: <Core.IStage> this
            };
            this._h = [
                (event: MouseEvent) => {
                    event.stopPropagation();
                    var sprites: Sprite[][] = this.$s(event.offsetX * this._z, event.offsetY * this._z),
                        ev: Event.MouseEvent;
                    if (sprites[0].length) {
                        ev = new Event.Focus(this._m);
                        Util.each(sprites[0], (element: Sprite) => {
                            element.dispatchEvent(ev);
                        });
                    }
                    if (sprites[2].length) {
                        ev = new Event.Blur(this._m);
                        Util.each(sprites[2], (element: Sprite) => {
                            element.dispatchEvent(ev);
                        });
                    }
                    if (sprites[1].length) {
                        ev = new Event.MouseMove(this._m);
                        Util.each(sprites[1], (element: Sprite) => {
                            element.dispatchEvent(ev);
                        });
                    }
                    return false;
                },
                (event: MouseEvent) => {
                    this.$c();
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
         * 发生变更。
         */
        public f(): Element {
            this._f = true;
            var event: Event.Focus;
            Util.each(this.$s(this._m.x, this._m.y)[0], (element: Sprite) => {
                if (!event)
                    event = new Event.Focus(this._m);
                element.dispatchEvent(event);
            });
            return this;
        }

        /**
         * 计算缩放比例。
         */
        public z(): Stage {
            var canvas: HTMLCanvasElement = this._c.canvas;
            this._z = canvas.width / canvas.scrollWidth;
            return this;
        }

        /**
         * 绘制。
         */
        public d(): Promise<CanvasRenderingContext2D> {
            if (!this._f)
                return Promise.resolve(this._c);
            return Promise.all(this.$r())
                .then(() => {
                    this._f = false;
                    return super.d(this._c);
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

        /**
         * 模拟点击。
         */
        public t(x?: number, y?: number): Stage {
            x = x || this._m.x;
            y = y || this._m.y;
            var real: Event.IMouseEventMetas = this._m;
            if (x != this._m.x || y != this._m.y)
                this.$s(x, y);
            this.$c();
            this._m = real;
            return this;
        }

        /**
         * 根据座标查找元素。
         */
        protected $s(x: number, y: number): [Sprite[], Sprite[], Sprite[]] {
            x |= 0;
            y |= 0;
            var sprites: [Sprite[], Sprite[], Sprite[]] = [[], [], []],
                els: Sprite[] = this.$m(x, y).slice(0, -1), // 查找新座标点新树
                bounds: Core.IBounds,
                inside: boolean,
                out: boolean;
            Util.each(this._t, (element: Sprite) => {
                bounds = element.gB();
                inside = -1 != Util.indexOf(els, element);
                out = x < bounds.x || y < bounds.y || x > bounds.x + bounds.w || y > bounds.y + bounds.h;
                if (!inside && !out) {
                    inside = true;
                    els.push(element);
                }
                sprites[inside ? 1 : 2].push(element);
            });
            this._t = els;
            this._m.fromX = this._m.x;
            this._m.fromY = this._m.y;
            this._m.x = x;
            this._m.y = y;
            Util.each(els, (element: Sprite) => {
                if (-1 == Util.indexOf(sprites[1], element))
                    sprites[0].push(element);
            });
            this._m.target = sprites[0][0] || sprites[1][0];
            this._m.from = sprites[2][0];
            return sprites;
        }

        /**
         * 模拟点击。
         */
        protected $c(): void {
            if (!this._m.target) return;
            var sprites: Sprite[] = [<Sprite> this._m.target],
                parent: Sprite = sprites[0].$p(),
                ev: Event.Click = new Event.Click(this._m);
            while (parent && parent != this) {
                sprites.push(parent);
                parent = parent.$p();
            }
            Util.each(sprites, (element: Sprite) => {
                element.dispatchEvent(ev);
            });
        }
    }
}
