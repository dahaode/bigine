/**
 * 定义画面调度开始菜单组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Sprite/Start.ts
 */

/// <reference path="Sprite.ts" />
/// <reference path="../Resource/Resource.ts" />
/// <reference path="../Ev/_Sprite/StartNew.ts" />
/// <reference path="../Ev/_Sprite/StartSeries.ts" />
/// <reference path="../Ev/_Sprite/StartLoad.ts" />

namespace Sprite {
    import Util = __Bigine_Util;
    import G = __Bigine_C2D;

    export class Start extends Sprite implements Core.IStart {
        /**
         * 名称对象。
         */
        private _x: G.TextPhrase;

        /**
         * 按钮集合。
         */
        private _y: Util.IHashTable<G.Button>;

        /**
         * 构造函数。
         */
        constructor(id: string, theme: Util.IHashTable<Util.IHashTable<any>>) {
            let w: number = 1280,
                h: number = 720,
                raw: Core.IResource.Type = Core.IResource.Type.Raw,
                rr: typeof Resource.Resource = Resource.Resource,
                url: string = '//s.dahao.de/theme/' + id + '/',
                _new: Util.IHashTable<any> = theme['new'],
                _series: Util.IHashTable<any> = theme['series'],
                _load: Util.IHashTable<any> = theme['load'],
                _title: Util.IHashTable<any> = theme['title'];
            super(0, 0, w, h);
            this._rr = [
                rr.g<HTMLImageElement>(url + theme['i'], raw),
                rr.g<HTMLImageElement>(url + _new['i'], raw),
                rr.g<HTMLImageElement>(url + _new['ih'], raw),
                rr.g<HTMLImageElement>(url + _series['i'], raw),
                rr.g<HTMLImageElement>(url + _series['ih'], raw),
                rr.g<HTMLImageElement>(url + _load['i'], raw),
                rr.g<HTMLImageElement>(url + _load['ih'], raw)
            ];
            this._y = {};
            (<Start> this.o(0))
                .a(new G.Image(this._rr[0].o(), 0, 0, w, h))
                .a(this._y['n'] = new G.Button(<G.IBounds> _new)
                    .b(() => {
                        this.dispatchEvent(new Ev.StartNew({ target: this }));
                    }, new G.Image(this._rr[2].o(), <G.IBounds> _new, true), new G.Image(this._rr[1].o(), <G.IBounds> _new, true))
                ).a(this._y['s'] = <G.Button> new G.Button(<G.IBounds> _series)
                    .b(() => {
                        this.dispatchEvent(new Ev.StartSeries({ target: this }));
                    }, new G.Image(this._rr[4].o(), <G.IBounds> _series, true), new G.Image(this._rr[3].o(), <G.IBounds> _series, true))
                    .o(0)
                ).a(new G.Button(<G.IBounds> _load)
                    .b(() => {
                        this.dispatchEvent(new Ev.StartLoad({ target: this }));
                    }, new G.Image(this._rr[6].o(), <G.IBounds> _load, true), new G.Image(this._rr[5].o(), <G.IBounds> _load, true))
                ).a(new G.Text(<G.IBounds> _title, _title['s'], _title['lh'], this.$a(_title['a']))
                    .tc(_title['c'])
                    .a(this._x = new G.TextPhrase())
                );
        }

        /**
         * 设置名称。
         */
        public u(title: string, series: boolean): Start {
            if (title)
                this._x.t(title);
            if (series) {
                this._y['n'].o(0);
                this._y['s'].o(1);
            }
            return this;
        }
    }
}
