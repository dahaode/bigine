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
         * 构造函数。
         */
        constructor(theme: Util.IHashTable<Util.IHashTable<any>>) {
            super(theme);
            this._rr = [
                Resource.Resource.g<HTMLImageElement>(theme['back']['i'], Core.IResource.Type.Raw)
            ];
        }

        protected pI(): Tip {
            if (this._pi) return this;
            let _back: Util.IHashTable<any> = this._tm['back'],
                _text: Util.IHashTable<any> = this._tm['text'];
            (<Tip> this.o(0))
                .a(new G.Image(this._rr[0].o(), <G.IBounds> _back))
                .a(this._x = new G.Text(<G.IBounds> _text, _text['ff'], _text['s'], _text['lh'], G.Text.Align.Center)
                    .tc(_text['c'])
                    .ts(_text['ss'])
                );
            return <Tip> super.pI();
        }

        /**
         * 更新文本。
         */
        public u(clob: string): Tip {
            return <Tip> this.pI().$w(this._x, clob, this._tm['text']['ch']);
        }
    }
}
