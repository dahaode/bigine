/**
 * 定义画面调度面板信息组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Sprite/Panel.ts
 */

/// <reference path="Sprite.ts" />
/// <reference path="../Resource/Resource.ts" />
/// <reference path="../Ev/_Sprite/PanelClose.ts" />
/// <reference path="../Ev/_Runtime/State.ts" />

namespace Sprite {
    import Util = __Bigine_Util;
    import G = __Bigine_C2D;

    export class Panel extends Sprite {
        /**
         * 文字元素集合。
         */
        private _x: Util.IHashTable<G.Text>;

        /**
         * 数据名称集合。
         */
        private _y: Util.IHashTable<[string, string]>;

        /**
         * 构造函数。
         */
        constructor(id: string, theme: Util.IHashTable<Util.IHashTable<any>>) {
            let w: number = 1280,
                h: number = 720,
                raw: Core.IResource.Type = Core.IResource.Type.Raw,
                rr: typeof Resource.Resource = Resource.Resource,
                url: string = '//s.dahao.de/theme/' + id + '/',
                left: G.Text.Align = G.Text.Align.Left,
                right: G.Text.Align = G.Text.Align.Right,
                _back: Util.IHashTable<any> = theme['back'],
                _close: Util.IHashTable<any> = theme['close'],
                i: number = 1,
                j: Util.IHashTable<any>;
            super(0, 0, w, h);
            this._rr = [
                rr.g<HTMLImageElement>(url + _back['i'], raw),
                rr.g<HTMLImageElement>(url + _close['i'], raw),
                rr.g<HTMLImageElement>(url + _close['ih'], raw)
            ];
            (<Panel> this.o(0))
                .a(new G.Image(this._rr[0].o(), <G.IBounds> _back))
                .a(new G.Button(<G.IBounds> _close)
                    .b(() => {
                        this.dispatchEvent(new Ev.PanelClose({ target: this }));
                    }, new G.Image(this._rr[2].o(), <G.IBounds> _close, true), new G.Image(this._rr[1].o(), <G.IBounds> _close, true))
                );
            this._x = {};
            this._y = {};
            for (; i < 13; i++) {
                j = theme[i];
                this.a(this._x[i + 't'] = <G.Text> new G.Text(<G.IBounds> j['title'], j['title']['s'], j['title']['lh'], left)
                    .tc(j['title']['c'])
                    .o(0)
                ).a(this._x[i + 'v'] = <G.Text> new G.Text(<G.IBounds> j['value'], j['value']['s'], j['value']['lh'], right)
                    .tc(j['value']['c'])
                    .o(0)
                );
            }
        }

        /**
         * 配置。
         */
        public u(sheet: [string, string][], runtime: Core.IRuntime): Panel {
            Util.each(sheet, (item: [string, string], index: number) => {
                if (!item[0]) return;
                (<G.Text> this._x[++index + 't'].o(1))
                    .c()
                    .a(new G.TextPhrase(item[0]));
                this._x[index + 'v'].o(1);
                this._y[item[1]] = [index + 'v', ''];
            });
            runtime.addEventListener('state', (ev: Ev.State) => {
                Util.each(this._y, (conf: [string, string], name: string) => {
                    let value: string = ev.data[name];
                    if (undefined === value) {
                        value = '';
                    } else
                        value = value.toString();
                    if (value == conf[1]) return;
                    this._y[name][1] = value;
                    this._x[conf[0]].c().a(new G.TextPhrase(value));
                });
            });
            return this;
        }
    }
}
