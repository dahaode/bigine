/**
 * 定义画面调度常驻按钮栏组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Sprite/Start.ts
 */

/// <reference path="Sprite.ts" />
/// <reference path="../Resource/Resource.ts" />
/// <reference path="../Ev/_Sprite/TrayMenu.ts" />
/// <reference path="../Ev/_Sprite/TrayPanel.ts" />

namespace Sprite {
    import Util = __Bigine_Util;
    import G = __Bigine_C2D;

    export class Tray extends Sprite implements Core.ITray {
        /**
         * 面板按钮。
         */
        private _x: G.Button;

        /**
         * 构造函数。
         */
        constructor(id: string, theme: Util.IHashTable<Util.IHashTable<any>>) {
            let w: number = 1280,
                h: number = 720,
                raw: Core.IResource.Type = Core.IResource.Type.Raw,
                rr: typeof Resource.Resource = Resource.Resource,
                url: string = '//s.dahao.de/theme/' + id + '/',
                _menu: Util.IHashTable<any> = theme['menu'],
                _panel: Util.IHashTable<any> = theme['panel'];
            super(0, 0, w, h, true);
            this._rr = [
                rr.g<HTMLImageElement>(url + _menu['i'], raw),
                rr.g<HTMLImageElement>(url + _menu['ih'], raw),
                rr.g<HTMLImageElement>(url + _panel['i'], raw),
                rr.g<HTMLImageElement>(url + _panel['ih'], raw)
            ];
            (<Tray> this.o(0))
                .a(new G.Button(<G.IBounds> _menu)
                    .b(() => {
                        this.dispatchEvent(new Ev.TrayMenu({ target: this }));
                    }, new G.Image(this._rr[1].o(), <G.IBounds> _menu, true), new G.Image(this._rr[0].o(), <G.IBounds> _menu, true))
                ).a(this._x = new G.Button(<G.IBounds> _panel)
                    .b(() => {
                        this.dispatchEvent(new Ev.TrayPanel({ target: this }));
                    }, new G.Image(this._rr[3].o(), <G.IBounds> _panel, true), new G.Image(this._rr[2].o(), <G.IBounds> _panel, true))
                );
        }

        /**
         * 配置面板。
         */
        public u(panel: boolean): Tray {
            this._x.o(0 + <any> panel);
            return this;
        }
    }
}
