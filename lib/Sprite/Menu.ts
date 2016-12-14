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
/// <reference path="../Ev/_Sprite/MenuReplay.ts" />

namespace Sprite {
    import Util = __Bigine_Util;
    import G = __Bigine_C2D;

    export class Menu extends Sprite implements Core.IMenu {

        private _x: G.Button;
        /**
         * 构造函数。
         */
        constructor(theme: Util.IHashTable<Util.IHashTable<any>>, close: () => void, save: () => void, load: () => void, set: () => void, replay: () => void) {
            let raw: Core.IResource.Type = Core.IResource.Type.Raw,
                rr: typeof Resource.Resource = Resource.Resource,
                _close: Util.IHashTable<any> = theme['close'],
                _save: Util.IHashTable<any> = theme['save'],
                _load: Util.IHashTable<any> = theme['load'],
                _set: Util.IHashTable<any> = theme['set'],
                _replay: Util.IHashTable<any> = theme['replay'];
            super(theme);
            this._rr = [
                rr.g<HTMLImageElement>(_close['i'], raw),
                rr.g<HTMLImageElement>(_close['ih'], raw),
                rr.g<HTMLImageElement>(_save['i'], raw),
                rr.g<HTMLImageElement>(_save['ih'], raw),
                rr.g<HTMLImageElement>(_load['i'], raw),
                rr.g<HTMLImageElement>(_load['ih'], raw),
                rr.g<HTMLImageElement>(_set['i'], raw),
                rr.g<HTMLImageElement>(_set['ih'], raw),
                rr.g<HTMLImageElement>(_replay['i'], raw),
                rr.g<HTMLImageElement>(_replay['ih'], raw)
            ];
            this.addEventListener('menu.close', close)
                .addEventListener('menu.save', save)
                .addEventListener('menu.load', load)
                .addEventListener('menu.set', set)
                .addEventListener('menu.replay', replay);
        }

        protected pI(): Menu {
            if (this._pi) return this;
            let _close: Util.IHashTable<any> = this._tm['close'],
                _mask: Util.IHashTable<any> = this._tm['mask'],
                _save: Util.IHashTable<any> = this._tm['save'],
                _load: Util.IHashTable<any> = this._tm['load'],
                _set: Util.IHashTable<any> = this._tm['set'],
                _replay: Util.IHashTable<any> = this._tm['replay'];
            this.a(new G.Color(0, 0, 1280, 720, _mask['cb']).o(_mask['o']))
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
                ).a(this._x = new G.Button(<G.IBounds> _replay)
                    .b(() => {
                        this.dispatchEvent(new Ev.MenuReplay({ target: this }));
                    }, new G.Image(this._rr[9].o(), <G.IBounds> _replay, true), new G.Image(this._rr[8].o(), <G.IBounds> _replay, true))
                );
            return <Menu> super.pI();
        }

        public u(series: boolean): Menu {
            this.pI();
            series ? this._x.o(1) : this._x.o(0);
            return this;
        }
    }
}
