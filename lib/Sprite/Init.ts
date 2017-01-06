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
         * [gif 动画、bar 动画]。
         */
        private _g: [G.Gif, G.Bar];

        /**
         * 构造函数。
         */
        constructor() {
            super({});
            this._g = [undefined, undefined];
        }

        /**
         * 设置远端资源列表。
         */
        public sl(isWechat: boolean): Resource.Resource<string | HTMLImageElement>[] {
            let raw: Core.IResource.Type = Core.IResource.Type.Raw,
                rr: typeof Resource.Resource = Resource.Resource;
            if (isWechat) {
                this._rr = [
                    rr.g<HTMLImageElement>('_/wechat/bg.png', raw),
                    rr.g<HTMLImageElement>('_/wechat/01.png', raw),
                    rr.g<HTMLImageElement>('_/wechat/02.png', raw),
                    rr.g<HTMLImageElement>('_/wechat/03.png', raw),
                    rr.g<HTMLImageElement>('_/wechat/04.png', raw),
                    rr.g<HTMLImageElement>('_/wechat/05.png', raw),
                    rr.g<HTMLImageElement>('_/wechat/06.png', raw),
                    rr.g<HTMLImageElement>('_/wechat/07.png', raw),
                    rr.g<HTMLImageElement>('_/wechat/08.png', raw),
                    rr.g<HTMLImageElement>('_/wechat/09.png', raw)
                ];
            } else {
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
            return this._rr;
        }

        /**
         * 配置。
         */
        public u(isWechat: boolean): Init {
            let bound: G.IBounds;
            if (isWechat) {
                bound = {x: 950, y: 600, w: 267, h: 96};
                this.a(new G.Image(this._rr[0].o(), 0, 0, 1280, 720));
                this.p(this._g[0] = new G.Gif(this._rr.slice(1), {bound: bound, interval: 15}));
            } else {
                let color: [string, number][] = [['#00FFC0', 0], ['#0080C0', 0], ['#00FFC0', 1]],
                    linear: G.ColorLinear;
                bound = {x: 592, y: 340, w: 96, h: 120};
                this.a(new G.Image(this._rr[0].o(), 438, 200, 404, 118))
                    .a(linear = new G.ColorLinear(440, 500, 400, 8, color, 4));
                this.p(this._g[0] = new G.Gif(this._rr.slice(1), {bound: bound, interval: 3}));
                linear.p(this._g[1] = new G.Bar(color));
            }
            return <Init> this.o(1);
        }

        /**
         * 隐藏。
         */
        public h(duration?: number): Promise<Full> {
            if (this._g[0]) this._g[0].h();
            if (this._g[1]) this._g[1].h();
            return super.h(duration);
        }
    }
}
