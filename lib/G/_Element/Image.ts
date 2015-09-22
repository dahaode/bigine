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
    'use strict';

    export class Image extends Element implements Core.IImageElement {
        /**
         * 数据。
         */
        private _d: Core.IResource<HTMLImageElement>;

        /**
         * 构造函数。
         */
        constructor(image: Core.IResource<HTMLImageElement>, x?: number, y?: number, absolute?: boolean) {
            super(x || 0, y || 0, 0, 0, absolute);
            this._d = image;
            image.o().then((img: HTMLImageElement) => {
                this._b.w = img.width;
                this._b.h = img.height;
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
    }
}
