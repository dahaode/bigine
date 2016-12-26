/**
 * 定义初始化加载界面组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Sprite/Init.ts
 */

/// <reference path="Sprite.ts" />

namespace Sprite {
    import G = __Bigine_C2D;

    export class Init extends Sprite {
        /**
         * [bar 动画、gif 动画]。
         */
        private _g: [G.Bar, G.Gif];

        /**
         * 构造函数。
         */
        constructor() {
            let raw: Core.IResource.Type = Core.IResource.Type.Raw,
                rr: typeof Resource.Resource = Resource.Resource;
            super({});
            this._g = [undefined, undefined];
            this._rr = [
                rr.g<HTMLImageElement>('_/logo.png', raw),
                rr.g<HTMLImageElement>('_/luobo/1.png', raw),
                rr.g<HTMLImageElement>('_/luobo/2.png', raw),
                rr.g<HTMLImageElement>('_/luobo/3.png', raw),
                rr.g<HTMLImageElement>('_/luobo/4.png', raw),
                rr.g<HTMLImageElement>('_/luobo/5.png', raw),
                rr.g<HTMLImageElement>('_/luobo/6.png', raw),
                rr.g<HTMLImageElement>('_/luobo/7.png', raw),
                rr.g<HTMLImageElement>('_/luobo/8.png', raw),
                rr.g<HTMLImageElement>('_/luobo/9.png', raw),
                rr.g<HTMLImageElement>('_/luobo/10.png', raw),
                rr.g<HTMLImageElement>('_/luobo/11.png', raw),
                rr.g<HTMLImageElement>('_/luobo/12.png', raw)
            ];
        }

        /**
         * 配置。
         */
        public u(): Init {
            let color: [string, number][] = [['#00FFC0', 0], ['#0080C0', 0], ['#00FFC0', 1]],
                bound: G.IBounds = {x: 592, y: 340, w: 96, h: 120},
                linear: G.ColorLinear;
            this.a(new G.Image(this._rr[0].o(), 438, 200, 404, 118))
                .a(linear = new G.ColorLinear(440, 500, 400, 8, color, 4))
                .o(1);
            linear.p(this._g[0] = new G.Bar(color));
            this.p(this._g[1] = new G.Gif(this._rr.slice(1), bound));
            return this;
        }

        /**
         * 隐藏。
         */
        public h(duration?: number): Promise<Full> {
            this._g[0].h();
            this._g[1].h();
            return super.h(duration);
        }
    }
}
