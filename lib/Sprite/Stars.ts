/**
 * 定义画面调度评分组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Sprite/Stars.ts
 */

/// <reference path="Sprite.ts" />

namespace Sprite {
    import G = __Bigine_C2D;
    import Util = __Bigine_Util;

    export class Stars extends Sprite {
        /**
         * 用户姓名。
         */
        private _nt: G.Text;
        /**
         * 数据值。
         */
        private _vt: G.Text;
        /**
         * 放置背景评分图片。
         */
        private _xs: G.Sprite;

        /**
         * 构造函数。
         */
        constructor(theme: Util.IHashTable<Util.IHashTable<any>>) {
            let raw: Core.IResource.Type = Core.IResource.Type.Raw,
                rr: typeof Resource.Resource = Resource.Resource,
                _pic: Util.IHashTable<any> = theme['pic'];
            super(theme);
            this._rr = [
                rr.g<HTMLImageElement>(_pic['1'], raw),
                rr.g<HTMLImageElement>(_pic['2'], raw),
                rr.g<HTMLImageElement>(_pic['3'], raw),
                rr.g<HTMLImageElement>(_pic['4'], raw),
                rr.g<HTMLImageElement>(_pic['5'], raw)
            ];
        }

        protected pI(): Stars {
            if (this._pi) return this;
            let _name: Util.IHashTable<any> = this._tm['name'],
                _value: Util.IHashTable<any> = this._tm['value'],
                center: G.Text.Align = G.Text.Align.Center;
            // 渲染评分初始样式
            this.a(this._xs = new G.Sprite(0, 0, 1280, 720))
                .a(this._nt = new G.Text(<G.IBounds> _name, _name['ff'], _name['s'], _name['lh'], center))
                .a(this._vt = new G.Text(<G.IBounds> _value, _value['ff'], _value['s'], _value['lh'], center));
            return <Stars> super.pI();
        }

        /**
         * 设置名称、数据值。
         */
        public u(key: number, name: string, value: string): Stars {
            this.pI();
            this._xs.c().a(new G.Image(this._rr[key].o(), { x: 0, y: 0, w: 1280, h: 720 }));
            this._nt.c().a(new G.TextPhrase(name));
            this._vt.c().a(new G.TextPhrase(value));
            return this;
        }
    }
}
