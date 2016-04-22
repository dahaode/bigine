/**
 * 定义画面调度选择组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Sprite/Choose.ts
 */

/// <reference path="Sprite.ts" />
/// <reference path="../Resource/Resource.ts" />
/// <reference path="../Ev/_Sprite/Choose.ts" />

namespace Sprite {
    import Util = __Bigine_Util;
    import G = __Bigine_C2D;

    export class Choose extends Sprite implements Core.IChoose {
        /**
         * 配置。
         */
        private _c: Util.IHashTable<any>;

        /**
         * 构造函数。
         */
        constructor(id: string, theme: Util.IHashTable<any>) {
            let w: number = 1280,
                h: number = 720,
                raw: Core.IResource.Type = Core.IResource.Type.Raw,
                rr: typeof Resource.Resource = Resource.Resource,
                url: string = '//s.dahao.de/theme/';
            super(0, 0, w, h);
            this._rr = [
                rr.g<HTMLImageElement>(url + theme['back']['i'], raw),
                rr.g<HTMLImageElement>(url + theme['back']['ih'], raw)
            ];
            this._c = theme;
            this.o(0);
        }

        /**
         * 配置。
         */
        public u(options: Core.IOptionTag[]): Choose {
            let margin: number = this._c['m'],
                _back: Util.IHashTable<any> = this._c['back'],
                _text: Util.IHashTable<any> = this._c['text'],
                opts: Core.IOptionTag[] = options.slice(0, 6),
                x: number = 0 | (1280 - _back['w']) / 2,
                y: number = 0 | (720 - opts.length * _back['h'] - (opts.length - 1) * margin) / 2;
            this.c();
            Util.each(options.slice(0, 6), (option: Core.IOptionTag) => {
                let text: G.Text = new G.Text(x + _text['x'], y + _text['y'], _text['w'], _text['h'], _text['s'], _text['lh'], G.Text.Align.Center)
                    .tc(_text['c'])
                    .ts(_text['ss']);
                this.$w(text, option.gT(), _text['ch']);
                this.a(new G.Button(x, y, _back['w'], _back['h'])
                    .b(() => {
                        this.dispatchEvent(new Ev.Choose({
                            target: this,
                            choice: option
                        }));
                    }, new G.Image(this._rr[1].o(), x, y, _back['w'], _back['h'], true), new G.Image(this._rr[0].o(), x, y, _back['w'], _back['h'], true))
                ).a(text);
                y += _back['h'] + margin;
            });
            return this;
        }
    }
}
