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
            let w: number = 1280,
                h: number = 720,
                raw: Core.IResource.Type = Core.IResource.Type.Raw,
                rr: typeof Resource.Resource = Resource.Resource,
                _name: Util.IHashTable<any> = theme['name'],
                _value: Util.IHashTable<any> = theme['value'],
                _pic: Util.IHashTable<any> = theme['pic'],
                center: G.Text.Align = G.Text.Align.Center;
            super(0, 0, w, h);
            this._rr = [
                rr.g<HTMLImageElement>(_pic['1'], raw),
                rr.g<HTMLImageElement>(_pic['2'], raw),
                rr.g<HTMLImageElement>(_pic['3'], raw),
                rr.g<HTMLImageElement>(_pic['4'], raw),
                rr.g<HTMLImageElement>(_pic['5'], raw)
            ];
            // 渲染评分初始样式
            (<Stars> this.o(0))
                .a(this._xs = new G.Sprite(<G.IBounds> { x: 0, y: 0, w: w, h: h }))
                .a(this._nt = new G.Text(<G.IBounds> _name, _name['s'], _name['lh'], center))
                .a(this._vt = new G.Text(<G.IBounds> _value, _value['s'], _value['lh'], center));
        }

        /**
         * 设置名称、数据值。
         */
        public u(key: number, name: string, value: string): Stars {
            this._xs.c().a(new G.Image(this._rr[key].o(), { x: 0, y: 0, w: 1280, h: 720 }));
            this._nt.c().a(new G.TextPhrase(name));
            this._vt.c().a(new G.TextPhrase(value));
            return this;
        }
    }
}
