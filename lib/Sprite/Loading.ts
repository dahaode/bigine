/**
 * 定义Loading信息组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Sprite/Loading.ts
 */

/// <reference path="Sprite.ts" />

namespace Sprite {
    import Util = __Bigine_Util;
    import G = __Bigine_C2D;

    export class Loading extends Sprite {
        /**
         * 底层信息组件。
         */
        private _x: G.TextPhrase;

        /**
         * 底层信息列表。
         */
        private _ws: Util.IHashTable<string>;

        /**
         * loading图片。
         */
        private _gi: G.Image;

        /**
         * setInterval的ID。
         */
        private _si: number;

        /**
         * 构造函数。
         */
        constructor(theme: Util.IHashTable<Util.IHashTable<any>>) {
            super(theme);
            this._rr = [
                Resource.Resource.g<HTMLImageElement>('_/loading.png', Core.IResource.Type.Raw)
            ];
            this._ws = theme['words'] || {};
            this._si = undefined;
        }

        protected pI(): Loading {
            if (this._pi) return this;
            let _text: Util.IHashTable<any> = this._tm['text'];
            this.a(this._gi = new G.Image(this._rr[0].o(), 0, 0, 1280, 720))
                .a(new G.Text(<G.IBounds> _text, _text['ff'], _text['s'], _text['h'], this.$a(_text['a']))
                    .tc(_text['c'])
                    .a(this._x = new G.TextPhrase(''))
                );
            return <Loading> super.pI();
        }

        /**
         * 设置底层信息。
         */
        public u(): Loading {
            this.pI();
            let speed: number = 0.05,
                time: number = 30,
                index: number = 1,
                max: number = 0;
            Util.each(this._ws, (word: string) => {
                max++;
            });
            index = 1 + Math.round(Math.random() * (max - 1));
            this._gi.o(1);
            this._si = setInterval(() => {
                let now: number = this._gi.gO();
                speed = (now >= 1 || now <= 0.4) ? (speed * -1) : speed;
                now += speed;
                this._gi.o(now);
                if (max > 0 && time >= 30) {
                    if (!this._ws[index]) index = 1;
                    this._x.t(this._ws[index]);
                    index++;
                    time = 0;
                }
                time++;
            }, 100);
            return this;
        }

        /**
         * 隐藏。
         */
        public h(duration?: number): Promise<Sprite> {
            if (this._si) {
                clearInterval(this._si);
                this._si = undefined;
            }
            return super.h(duration);
        }
    }
}
