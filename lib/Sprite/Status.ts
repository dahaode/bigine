/**
 * 定义画面调度状态信息组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Sprite/Status.ts
 */

/// <reference path="Sprite.ts" />
/// <reference path="../Resource/Resource.ts" />
/// <reference path="../Core/_Runtime/IRuntime.ts" />
/// <reference path="../Ev/_Runtime/State.ts" />

namespace Sprite {
    import Util = __Bigine_Util;
    import G = __Bigine_C2D;

    export class Status extends Sprite {
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
        constructor(theme: Util.IHashTable<Util.IHashTable<any>>) {
            let _back: Util.IHashTable<any> = theme['back'];
            super(theme, true);
            this._rr = [
                Resource.Resource.g<HTMLImageElement>(_back['i'], Core.IResource.Type.Raw)
            ];
            this._x = {};
            this._y = {};
        }

        protected pI(): Status {
            if (this._pi) return this;
            let left: G.Text.Align = G.Text.Align.Left,
                right: G.Text.Align = G.Text.Align.Right,
                _back: Util.IHashTable<any> = this._tm['back'],
                i: number = 1,
                j: Util.IHashTable<any>;
            this.a(new G.Image(this._rr[0].o(), <G.IBounds> _back));
            for (; i < 7; i++) {
                j = this._tm[i];
                let align: G.Text.Align = j['value']['a'] ? this.$a(j['value']['a']) : right;
                this.a(this._x[i + 't'] = <G.Text> new G.Text(<G.IBounds> j['title'], j['title']['ff'], j['title']['s'], j['title']['lh'], left)
                    .tc(j['title']['c'])
                    .o(0)
                ).a(this._x[i + 'v'] = <G.Text> new G.Text(<G.IBounds> j['value'], j['value']['ff'], j['value']['s'], j['value']['lh'], align)
                    .tc(j['value']['c'])
                    .o(0)
                );
            }
            return <Status> super.pI();
        }

        /**
         * 配置。
         */
        public u(sheet: [string, string][], runtime: Core.IRuntime): Status {
            this.pI();
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
            //this.o(1);
            return this;
        }

        /**
         * 显示。
         */
        public v(duration?: number): Promise<Status> {
            return this._pi ? super.v(duration) : super.h(duration);
        }
    }
}
