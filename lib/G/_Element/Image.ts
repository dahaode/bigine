/**
 * 定义图像画面元素组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      G/_Element/Image.ts
 */

/// <reference path="../Element.ts" />
/// <reference path="../../Core/_G/IImageElement.ts" />

namespace G {
    export class Image extends Element implements Core.IImageElement {
        /**
         * 数据。
         */
        private _d: Core.IResource<HTMLImageElement>;

        /**
         * 构造函数。
         */
        constructor(image: Core.IResource<HTMLImageElement>, x?: number, y?: number, w?: number, h?: number, absolute?: boolean);
        constructor(image: Core.IResource<HTMLImageElement>, bounds?: Core.IBounds, absolute?: boolean);
        constructor(image: Core.IResource<HTMLImageElement>, x?: any, y?: any, w?: any, h?: any, absolute?: any) {
            super(x, y, w, h, absolute);
            this._d = image;
            if (!this._b.w || !this._b.h)
                image.o().then((img: HTMLImageElement) => {
                    if (this._b.w) {
                        this._b.h = 0 | this._b.w * img.height / img.width;
                    } else if (this._b.h) {
                        this._b.w = 0 | this._b.h * img.width / img.height;
                    } else {
                        this._b.w = img.width;
                        this._b.h = img.height;
                    }
                });
        }

        /**
         * 绘制。
         */
        public d(context: CanvasRenderingContext2D): CanvasRenderingContext2D | Thenable<CanvasRenderingContext2D> {
            return this._d.o().then((img: HTMLImageElement) => {
                var o: number = this._o;
                if (o) {
                    if (1 != o) {
                        context.save();
                        context.globalAlpha = o;
                    }
                    var bounds: Core.IBounds = this.gB();
                    context.drawImage(img, bounds.x, bounds.y, bounds.w, bounds.h);
                    if (1 != o)
                        context.restore();
                }
                return super.d(context);
            });
        }

        /**
         * 获取需绘制地图片集合。
         */
        protected $r(): Promise<HTMLImageElement>[] {
            return [this._d.o()];
        }
    }
}
