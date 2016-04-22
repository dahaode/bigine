/**
 * 定义画面调度功能菜单组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Sprite/Menu.ts
 */

/// <reference path="Sprite.ts" />
/// <reference path="../Resource/Resource.ts" />
/// <reference path="../Ev/_Sprite/MenuClose.ts" />
/// <reference path="../Ev/_Sprite/MenuSave.ts" />
/// <reference path="../Ev/_Sprite/MenuLoad.ts" />
/// <reference path="../Ev/_Sprite/MenuSet.ts" />

namespace Sprite {
    import Util = __Bigine_Util;
    import G = __Bigine_C2D;

    export class Menu extends Sprite implements Core.IMenu {
        /**
         * 构造函数。
         */
        constructor(id: string, theme: Util.IHashTable<Util.IHashTable<any>>) {
            let w: number = 1280,
                h: number = 720,
                raw: Core.IResource.Type = Core.IResource.Type.Raw,
                rr: typeof Resource.Resource = Resource.Resource,
                url: string = '//s.dahao.de/theme/',
                _close: Util.IHashTable<any> = theme['close'],
                _mask: Util.IHashTable<any> = theme['mask'],
                _save: Util.IHashTable<any> = theme['save'],
                _load: Util.IHashTable<any> = theme['load'],
                _set: Util.IHashTable<any> = theme['set'];
            super(0, 0, w, h);
            this._rr = [
                rr.g<HTMLImageElement>(url + _close['i'], raw),
                rr.g<HTMLImageElement>(url + _close['ih'], raw),
                rr.g<HTMLImageElement>(url + _save['i'], raw),
                rr.g<HTMLImageElement>(url + _save['ih'], raw),
                rr.g<HTMLImageElement>(url + _load['i'], raw),
                rr.g<HTMLImageElement>(url + _load['ih'], raw),
                rr.g<HTMLImageElement>(url + _set['i'], raw),
                rr.g<HTMLImageElement>(url + _set['ih'], raw)
            ];
            (<Menu> this.o(0))
                .a(new G.Color(0, 0, w, h, _mask['cb']).o(_mask['o']))
                .a(new G.Button(<G.IBounds> _close)
                    .b(() => {
                        this.dispatchEvent(new Ev.MenuClose({ target: this }));
                    }, new G.Image(this._rr[1].o(), <G.IBounds> _close, true), new G.Image(this._rr[0].o(), <G.IBounds> _close, true))
                ).a(new G.Button(<G.IBounds> _save)
                    .b(() => {
                        this.dispatchEvent(new Ev.MenuSave({ target: this }));
                    }, new G.Image(this._rr[3].o(), <G.IBounds> _save, true), new G.Image(this._rr[2].o(), <G.IBounds> _save, true))
                ).a(new G.Button(<G.IBounds> _load)
                    .b(() => {
                        this.dispatchEvent(new Ev.MenuLoad({ target: this }));
                    }, new G.Image(this._rr[5].o(), <G.IBounds> _load, true), new G.Image(this._rr[4].o(), <G.IBounds> _load, true))
                ).a(new G.Button(<G.IBounds> _set)
                    .b(() => {
                        this.dispatchEvent(new Ev.MenuSet({ target: this }));
                    }, new G.Image(this._rr[7].o(), <G.IBounds> _set, true), new G.Image(this._rr[6].o(), <G.IBounds> _set, true))
                );
        }
    }
}
