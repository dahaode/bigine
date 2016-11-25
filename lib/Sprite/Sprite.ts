/**
 * 定义画面调度抽象组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Sprite/Sprite.ts
 */

/// <reference path="../Core/_Sprite/ISprite.ts" />
/// <reference path="../Resource/Resource.ts" />

namespace Sprite {
    import G = __Bigine_C2D;

    export abstract class Sprite extends G.Component implements Core.ISprite {
        /**
         * 远端资源列表。
         */
        protected _rr: Resource.Resource<string | HTMLImageElement>[];

        /**
         * 显示动画时长。
         */
        protected _dv: number;

        /**
         * 隐藏动画时长。
         */
        protected _dh: number;

        /**
         * 显示。
         */
        public v(duration?: number): Promise<Sprite> {
            if (0 === duration)
                this.o(1);
            if (this._o)
                return Promise.resolve(this);
            return <Promise<Sprite>> this.p(new G.FadeIn(duration || 250));
        }

        /**
         * 隐藏。
         */
        public h(duration?: number): Promise<Sprite> {
            if (0 === duration)
                this.o(0);
            if (!this._o)
                return Promise.resolve(this);
            return <Promise<Sprite>> this.p(new G.FadeOut(duration || 250));
        }

        /**
         * 获取远端资源列表。
         */
        public l(): Resource.Resource<string | HTMLImageElement>[] {
            return this._rr || [];
        }

        /**
         * 识别文本对齐方式。
         */
        protected $a(desc: string): G.Text.Align {
            let aligns: typeof G.Text.Align = G.Text.Align;
            switch (desc) {
                case 'center':
                case 'middle':
                    return aligns.Center;
                case 'right':
                    return aligns.Right;
            }
            return aligns.Left;
        }

        /**
         * 处理文本高亮规则。
         */
        protected $w(element: G.Text, words: string, hiColor: string): Sprite {
            let buffer: string = '',
                color: string = '',
                hilite: boolean = false,
                ii: number;
            element.c();
            for (ii = 0; ii < words.length; ii++) {
                if ('【' == words[ii] && !hilite) {
                    element.a(new G.TextPhrase(buffer));
                    buffer = '';
                    color = words.substr(ii + 1, 7);
                    if (/^#[0-9a-fA-F]{6}$/.test(color)) {
                        ii += 7;
                    } else {
                        color = hiColor;
                    }
                    hilite = true;
                } else if ('】' == words[ii] && hilite) {
                    element.a(new G.TextPhrase(buffer, color));
                    buffer = color = '';
                    hilite = false;
                } else
                    buffer += words[ii];
            }
            if (buffer)
                element.a(new G.TextPhrase(buffer, hilite ? color : ''));
            return this;
        }
    }
}
