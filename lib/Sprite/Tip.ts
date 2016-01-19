/**
 * 定义画面调度提示组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Sprite/Tip.ts
 */

/// <reference path="Sprite.ts" />
/// <reference path="../Resource/Resource.ts" />

namespace Sprite {
    import Util = __Bigine_Util;
    import G = __Bigine_C2D;

    export class Tip extends Sprite {
        /**
         * 文字元素。
         */
        private _x: G.Text;

        /**
         * 文字高亮色。
         */
        private _c: string;

        /**
         * 构造函数。
         */
        constructor(id: string, theme: Util.IHashTable<Util.IHashTable<any>>) {
            let w: number = 1280,
                h: number = 720,
                raw: Core.IResource.Type = Core.IResource.Type.Raw,
                rr: typeof Resource.Resource = Resource.Resource,
                url: string = '//s.dahao.de/theme/' + id + '/',
                _back: Util.IHashTable<any> = theme['back'],
                _text: Util.IHashTable<any> = theme['text'];
            super(0, 0, w, h);
            this._rr = [
                rr.g<HTMLImageElement>(url + _back['i'], raw)
            ];
            this._c = _text['ch'];
            (<Tip> this.o(0))
                .a(new G.Image(this._rr[0].o(), <G.IBounds> _back))
                .a(this._x = new G.Text(<G.IBounds> _text, _text['s'], _text['lh'], G.Text.Align.Center)
                    .tc(_text['c'])
                    .ts(_text['ss'])
                );
        }

        /**
         * 更新文本。
         */
        public u(clob: string): Tip {
            return <Tip> this.$w(this._x, clob, this._c);
        }
    }
}
