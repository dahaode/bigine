/**
 * 定义画面组合元素组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      G/_Element/Sprite.ts
 */

/// <reference path="../Element.ts" />
/// <reference path="../../Core/_G/ISprite.ts" />

namespace G {
    export class Sprite extends Element implements Core.ISprite {
        /**
         * 子元素集。
         */
        protected _d: Element[];

        /**
         * 事件监听。
         */
        private _l: Util.IHashTable<Core.IEventListener<any>[]>;

        /**
         * 构造函数。
         */
        constructor(x: number, y: number, w: number, h: number, absolute?: boolean);
        constructor(bounds: Core.IBounds, absolute?: boolean);
        constructor(x: any, y?: any, w?: any, h?: any, absolute?: boolean) {
            super(x, y, w, h, absolute);
            this._d = [];
            this._f = false;
            this._l = {};
        }

        /**
         * 缩放。
         */
        public s(ratio: number): Sprite {
            Util.each(this._d, (el: Element) => {
                el.s(ratio);
            });
            return <Sprite> super.s(ratio);
        }

        /**
         * 旋转。
         */
        public r(degrees: number): Sprite {
            Util.each(this._d, (el: Element) => {
                el.r(degrees);
            });
            return <Sprite> super.r(degrees);
        }

        /**
         * 绘制。
         */
        public d(context: CanvasRenderingContext2D): CanvasRenderingContext2D | Thenable<CanvasRenderingContext2D> {
            var opacity: number = this.gO();
            if (opacity && this._d.length) {
                if (1 != opacity) {
                    context.save();
                    context.globalAlpha = opacity;
                }
                return Util.Q.every(this._d, (el: Element) => el.d(context))
                    .then(() => {
                        if (1 != opacity)
                            context.restore();
                        return super.d(context);
                    });
            }
            return super.d(context);
        }

        /**
         * 发生变更。
         */
        public f(child?: Element): Sprite {
            this._f = true;
            if (this._p)
                this._p.f(this);
            return this;
        }

        /**
         * 设置父元素。
         */
        public $p(parent?: Sprite): Sprite {
            if (!parent && this._p)
                return <Sprite> this._p;
            return <Sprite> super.$p(parent);
        }

        /**
         * 新增事件监听。
         */
        public addEventListener<T>(type: string, listener: Core.IEventListener<T>): Sprite {
            this._l[type] = this._l[type] || [];
            this._l[type].push(listener);
            return this;
        }

        /**
         * 取消事件监听。
         */
        public removeEventListener<T>(type: string, listener: Core.IEventListener<T>): Sprite {
            Util.some(this._l[type] || [], (reged: Core.IEventListener<any>, index: number) => {
                if (reged == listener) {
                    this._l[type].splice(index, 1);
                    return true;
                }
                return false;
            });
            return this;
        }

        /**
         * 发生事件。
         */
        public dispatchEvent<T>(event: Core.IEvent<T>): Sprite {
            var type: string = event.gT();
            Util.each(this._l[type] || [], (listener: Core.IEventListener<T>) => {
                listener.call(undefined, event);
            });
            return this;
        }

        /**
         * 添加元素。
         */
        public a(element: Element, before?: string): Sprite;
        public a(element: Element, before?: Element): Sprite;
        public a(element: Element, before?: any): Sprite {
            var index: number = -1;
            if ('string' == typeof before)
                before = this.q(before)[0];
            if (before)
                index = Util.indexOf(this._d, before);
            if (-1 == index)
                index = this._d.length;
            this._d.splice(index, 0, element.$p(this));
            if (!this.gO())
                return this;
            return <Sprite> this.f();
        }

        /**
         * 删除元素。
         */
        public e(element: Element): Sprite {
            var index: number = Util.indexOf(this._d, element);
            if (-1 != index)
                this._d.splice(index, 1);
            if (!this.gO())
                return this;
            return <Sprite> this.f();
        }

        /**
         * 删除所有元素。
         */
        public c(): Sprite {
            this._d = [];
            if (!this.gO())
                return this;
            return <Sprite> this.f();
        }

        /**
         * 根据编号查找元素。
         */
        public q(id: string): Element[] {
            var result: Element[] = [];
            Util.each(this._d, (element: Element) => {
                if ('q' in element)
                    result = result.concat((<Sprite> element).q(id));
                if (element.gI() == id)
                    result.push(element);
            });
            return result;
        }

        /**
         * 根据座标查找元素。
         */
        protected $m(x: number, y: number): Sprite[] {
            var els: Sprite[] = [],
                bounds: Core.IBounds;
            Util.some(Util.clone(this._d).reverse(), (element: Sprite) => {
                if (!('$m' in element) || !element.gO())
                    return false;
                bounds = element.gB();
                if (bounds.x > x || bounds.y > y || bounds.x + bounds.w < x || bounds.y + bounds.h < y)
                    return false;
                els = els.concat(element.$m(x, y));
                return true;
            });
            return els.concat(this);
        }

        /**
         * 获取需绘制地图片集合。
         */
        protected $r(): Promise<HTMLImageElement>[] {
            var resources: Promise<HTMLImageElement>[] = [];
            Util.each(this._d, (element: Element) => {
                if (!('$r' in element)) return;
                resources = resources.concat((<Sprite> element).$r());
            });
            return resources;
        }
    }
}
