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
    'use strict';

    export class Sprite extends Element implements Core.ISprite {
        /**
         * 子元素集。
         */
        private _d: Element[];

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
            if (this._r)
                context.rotate(this._r * Math.PI / 180);
            if (this._o) {
                context.globalAlpha = this._o;
                return Util.Q.every(this._d, (el: Element) => el.d(context))
                    .then(() => super.d(context));
            }
            return super.d(context);
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
            if (!(type in this._l))
                return this;
            Util.some(this._l[type], (reged: Core.IEventListener<any>, index: number) => {
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
            if (!(type in this._l))
                return this;
            Util.each(this._l[type], (listener: Core.IEventListener<T>) => {
                listener.call(this, event);
            });
            return this;
        }

        /**
         * 追加元素。
         */
        public a(element: Element): Sprite {
            this._d.push(element.$p(this));
            return this;
        }

        /**
         * 插入元素。
         */
        public i(element: Element, before: Element): Sprite {
            var index: number = Util.indexOf(this._d, before);
            if (-1 == index)
                index = this._d.length;
            this._d.splice(index, 0, element);
            return this;
        }

        /**
         * 删除元素。
         */
        public e(element: Element): Sprite {
            var index: number = Util.indexOf(this._d, element);
            if (-1 != index)
                this._d.splice(index, 1);
            return this;
        }
    }
}
