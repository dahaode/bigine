/**
 * 定义抽象画面元素组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      G/Element.ts
 */

/// <reference path="../Core/_G/ISprite.ts" />

namespace G {
    'use strict';

    export class Element implements Core.IGraphicElement {
        /**
         * 区域。
         */
        protected _b: Core.IBounds;

        /**
         * 是否绝对定位。
         */
        protected _a: boolean;

        /**
         * 缩放系数。
         */
        protected _s: number;

        /**
         * 旋转角度。
         */
        protected _r: number;

        /**
         * 透明度。
         */
        protected _o: number;

        /**
         * 发生变更。
         */
        protected _f: boolean;

        /**
         * 父元素。
         */
        protected _p: Core.ISprite;

        /**
         * 编号。
         */
        protected _i: string;

        /**
         * 构造函数。
         */
        constructor(x: number, y: number, w: number, h: number, absolute?: boolean);
        constructor(bounds: Core.IBounds, absolute?: boolean);
        constructor(x: any, ...args: any[]) {
            if (!x || 'number' == typeof x) {
                this._b = {
                    x: x,
                    y: args[0],
                    w: args[1],
                    h: args[2]
                };
                this._a = !!args[3];
            } else {
                this._b = x;
                this._a = !!args[0];
            }
            this._b.x |= 0;
            this._b.y |= 0;
            this._b.w |= 0;
            this._b.h |= 0;
            this._r = 0;
            this._s =
            this._o = 1;
            this._f = false;
            this._i = '';
        }

        /**
         * 获取区域信息。
         */
        public gB(): Core.IBounds {
            var bounds: Core.IBounds = Util.clone(this._b),
                r: number,
                w: number,
                h: number;
            if (0 && this._r) {
                r %= 180;
                if (0 > r)
                    r += 180;
                if (90 == r) {
                    r = bounds.x;
                    bounds.x = bounds.y;
                    bounds.y = r;
                    r = bounds.w;
                    bounds.w = bounds.h;
                    bounds.h = r;
                } else if (r) {
                    r *= Math.PI / 180;
                    w = (bounds.h / Math.abs(Math.tan(Math.PI / 2 - r)) + bounds.w) / 2 * Math.cos(r);
                    h = (bounds.h / Math.abs(Math.tan(r)) + bounds.w) / 2 * Math.sin(r);
                    bounds = {
                        x: bounds.x + bounds.w / 2 - w,
                        y: bounds.y + bounds.h / 2 - h,
                        w: 2 * w,
                        h: 2 * h
                    };
                }
            }
            if (!this._a) {
                if (!this._p)
                    throw new E(E.G_PARENT_NOT_FOUND);
                var bp: Core.IBounds = this._p.gB();
                bounds.x += bp.x;
                bounds.y += bp.y;
            }
            return bounds;
        }

        /**
         * 移动 X 轴座标。
         */
        public x(distance: number): Element {
            if (!distance)
                return this;
            this._b.x += distance;
            return this.$f();
        }

        /**
         * 移动 Y 轴座标。
         */
        public y(distance: number): Element {
            if (!distance)
                return this;
            this._b.y += distance;
            return this.$f();
        }

        /**
         * 缩放。
         */
        public s(ratio: number): Element {
            if (1 == ratio)
                return this;
            this._b.w *= ratio;
            this._b.h *= ratio;
            this._s *= ratio;
            return this.$f();
        }

        /**
         * 获取缩放系数。
         */
        public gS(): number {
            return this._s;
        }

        /**
         * 旋转。
         */
        public r(degrees: number): Element {
            if (this._r == degrees)
                return this;
            this._r = degrees % 360;
            if (0 > this._r)
                this._r += 360;
            return this.$f();
        }

        /**
         * 获取旋转度数。
         */
        public gR(): number {
            return this._r;
        }

        /**
         * 透明度。
         */
        public o(value: number): Element {
            if (this._o == value)
                return this;
            if (0 > value || 1 < value)
                throw new E(E.G_INVALID_OPACITY);
            this._o = value;
            return this.$f();
        }

        /**
         * 获取透明度。
         */
        public gO(): number {
            return this._o;
        }

        /**
         * 绘制。
         */
        public d(context: CanvasRenderingContext2D): CanvasRenderingContext2D | Thenable<CanvasRenderingContext2D> {
            this._f = false;
            return context;
        }

        /**
         * 执行动画。
         */
        public p(animation: Core.IAnimation): Promise<Element> {
            return animation.p(this);
        }

        /**
         * 设置编号。
         */
        public i(id: string): Element {
            this._i = id;
            return this;
        }

        /**
         * 获取编号。
         */
        public gI(): string {
            return this._i;
        }

        /**
         * 发生变更。
         */
        public $f(): Element {
            this._f = true;
            if (this._p)
                this._p.$f();
            return this;
        }

        /**
         * 设置父元素。
         */
        public $p(parent: Core.ISprite): Element {
            this._p = parent;
            return this;
        }
    }
}
